# Reranking

Reranking is the second stage of a multi-stage search pipeline: a cross-encoder or late-interaction model re-scores the top 50–200 candidates from fast retrieval to sharpen precision for the top results.

Reranking is the second stage of a multi-stage retrieval pipeline: after a fast first-stage retriever pulls a broad candidate set (typically 50–200 documents) from a [web index](/learn/web-index) or vector store, a slower, more expressive model re-scores every `(query, candidate)` pair and orders the final top-k results. It solves the core speed-versus-accuracy trade-off in search—letting you search billions of documents in milliseconds while still applying deep neural attention to the handful of passages that actually reach an LLM's [context window](/learn/context-window).

**Two-stage retrieve-and-rerank pipeline**

```text
Corpus (10M+ docs)
  │
  ▼ Stage 1: Fast Retrieval (BM25 + Dense Vectors, ~10–30 ms)
Top 100 Candidates
  │
  ▼ Stage 2: Neural Reranker (Cross-Encoder, ~40–120 ms)
┌──────────────────────────────────────────────────────────┐
│ Joint attention over [CLS] query [SEP] passage [SEP]     │
│ Scores exact relevance, negation, and multi-term intent  │
└────────────────────────────┬─────────────────────────────┘
                             ▼
                  Top 5–10 Grounded Excerpts
                             │
                             ▼
                    LLM / Agent Context
```

## Why first-stage retrievers need a reranker

First-stage retrievers achieve millisecond latency by precomputing document representations independently of the query:

- [**Lexical search**](/learn/lexical-search)** (BM25)** precomputes token frequencies in an [inverted index](/learn/inverted-index), so it cannot understand negation, word order, or paraphrases.
- **Dense bi-encoders** ([semantic search](/learn/semantic-search)) compress an entire passage into a single fixed-length vector before any query arrives. That information bottleneck loses fine-grained details—dates, numbers, conditional clauses, and entity bindings.

A **cross-encoder reranker** removes that bottleneck. Because it only runs on 50–100 candidates instead of the full corpus, it can concatenate the query and each candidate passage together and run full transformer self-attention across every token pair. Every query token attends directly to every document token, catching subtle distinctions like _"acquired by X"_ versus _"acquired X"_.

## Three reranker architectures

Production search systems generally choose among three reranking approaches depending on their latency budget:

| Architecture | How it scores `(query, doc)` | Latency (100 docs) | Strengths |
| --- | --- | --- | --- |
| Cross-encoder (pointwise) | Single transformer forward pass per `(query, passage)` pair | ~40–150 ms (GPU) | Highest single-passage precision; drop-in after [hybrid search](/learn/hybrid-search) |
| Late interaction (ColBERT) | Precomputes per-token embeddings; runs MaxSim at query time | ~10–30 ms | Near cross-encoder accuracy at much lower query compute |
| Listwise LLM reranker | Prompts an LLM with a window of candidates to output ranked IDs | ~300–1500 ms | Compares candidates against each other; handles complex instructions |

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

def retrieve_and_rerank(query: str, candidates: list[dict], top_k: int = 5) -> list[dict]:
    # candidates: top 50–100 passages from BM25 / hybrid search
    pairs = [(query, doc["text"]) for doc in candidates]
    scores = reranker.predict(pairs)

    ranked = sorted(
        zip(candidates, scores),
        key=lambda item: float(item[1]),
        reverse=True,
    )
    return [
        {**doc, "rerank_score": round(float(score), 4)}
        for doc, score in ranked[:top_k]
    ]
```

## Where reranking pays off for AI agents

In [RAG](/learn/rag-retrieval-augmented-generation) and [agentic search](/learn/agentic-search), feeding 30 loosely relevant chunks into a prompt wastes tokens and triggers attention degradation ("context rot"). Reranking lets you retrieve broadly (top 50–100 for high recall) while keeping the final payload sent to the LLM tightly pruned (top 5–8 high-signal excerpts).

Good [web search APIs](/learn/web-search-api)—including [Parallel Search](/products/search)—bake multi-stage reranking and excerpt selection directly into the search endpoint so an agent receives already-ranked, query-focused passages instead of having to fetch raw pages and rerank them client-side.

## Tuning recall vs. latency

- **Candidate depth (**`**top_n**`**):** Reranking cannot rescue a document that Stage 1 missed. Measure recall@50 and recall@100 first; only tune the reranker once the right document consistently enters the candidate pool.
- **Passage length:** Most cross-encoders have a 512–8,192 token input ceiling. Chunking or selecting dense passages before reranking keeps scores accurate and avoids silently truncating the answer at the bottom of a long page.
- **Score thresholds:** Pointwise rerankers output calibrated or sigmoid-mapped logits. Dropping candidates below a minimum relevance threshold stops an agent from hallucinating an answer out of irrelevant filler when the corpus has no match.

## Frequently asked questions

**What is the difference between a bi-encoder and a cross-encoder?**

A bi-encoder embeds the query and each document separately so document vectors can be indexed ahead of time for fast ANN search. A cross-encoder processes the query and document together in one forward pass, trading speed for full token-to-token attention.

**When should I skip reranking?**

Skip neural reranking if you have an ultra-tight latency ceiling (under ~20 ms end to end) or if exact lexical filters already isolate the exact record you need (such as looking up a document by primary key or exact error code).

**How is reranking quality measured?**

Standard ranking metrics include **MRR** (Mean Reciprocal Rank, how high the first relevant hit appears), **NDCG@k** (Normalized Discounted Cumulative Gain, rewarding graded relevance near the top), and **Precision@k**.

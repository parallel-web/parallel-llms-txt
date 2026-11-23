# Hybrid search

Hybrid search combines lexical retrieval (BM25) and semantic vector search over the same query, merging their ranked lists via Reciprocal Rank Fusion or score blending for higher recall.

Hybrid search runs two (or more) distinct retrieval methods against the same query—typically [lexical search](/learn/lexical-search) (BM25 over an [inverted index](/learn/inverted-index)) and [semantic search](/learn/semantic-search) (dense vector similarity)—then fuses their ranked lists into one unified candidate set. It exists because neither retriever dominates on its own: lexical engines nail exact strings and rare entities, while dense vectors recover paraphrases and conceptual matches.

**Hybrid search with Reciprocal Rank Fusion**

```text
                   ┌──────────────┐
                   │  User Query  │
                   └──────┬───────┘
             ┌────────────┴────────────┐
             ▼                         ▼
    ┌─────────────────┐       ┌─────────────────┐
    │ Lexical (BM25)  │       │ Semantic (ANN)  │
    │ Inverted Index  │       │ Vector Index    │
    └────────┬────────┘       └────────┬────────┘
             │ top-k lexical           │ top-k dense
             └────────────┬────────────┘
                          ▼
              ┌───────────────────────┐
              │  Score / Rank Fusion  │
              │ (RRF or alpha blend)  │
              └───────────┬───────────┘
                          ▼
              ┌───────────────────────┐
              │ Optional Reranker     │
              │ (cross-encoder top-n) │
              └───────────────────────┘
```

## Why single-retriever stacks drop recall

Every production query mix contains both exact-match lookups and conceptual questions:

- **Where lexical search fails:** A user asks `"how to stop an agent from hallucinating URLs"`, while the best page is titled `"Source grounding and citation verification"`. Zero overlapping content words means BM25 returns nothing.
- **Where semantic search fails:** A user searches for `"HTTP 529 Anthropic"` or `"SEC Form 10-K item 1A NVDA 2026"`. Embedding models compress rare codes, ticker symbols, and version numbers into coarse neighborhoods, often ranking generic explainers above the exact error or filing.

Running both retrievers in parallel adds almost zero wall-clock latency (both execute concurrently in milliseconds) and raises candidate recall before any downstream [reranking](/learn/reranking) or [RAG](/learn/rag-retrieval-augmented-generation) generation step.

## How score fusion works: RRF vs. linear blending

BM25 scores are unbounded positive floats (e.g., `0` to `40+`) that shift with query length, while cosine similarity lives in `[-1, 1]`. You cannot add raw scores directly without one retriever drowning out the other. Two fusion methods dominate in practice:

1. **Reciprocal Rank Fusion (RRF):** Introduced by [Cormack, Clarke, and Buettcher (2009)](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf), RRF ignores raw score magnitudes and sums `1 / (k + rank)` across every retriever list, with smoothing constant `k = 60` by convention. Documents ranked high by _both_ retrievers climb to the top; documents found strongly by only one still survive. RRF requires zero per-corpus calibration.
2. **Normalized linear combination (**`**alpha**`** blend):** Min-max or z-score normalize each retriever's scores into `[0, 1]`, then compute `alpha * dense_score + (1 - alpha) * bm25_score`. Linear blending can beat RRF when you have a labeled evaluation set to tune `alpha`, but breaks easily when score distributions drift across queries.

```python
from collections import defaultdict

def reciprocal_rank_fusion(
    ranked_lists: list[list[str]],
    k: int = 60,
    weights: list[float] | None = None,
) -> list[tuple[str, float]]:
    scores: dict[str, float] = defaultdict(float)
    list_weights = weights or [1.0] * len(ranked_lists)

    for weight, doc_ids in zip(list_weights, ranked_lists):
        for rank, doc_id in enumerate(doc_ids, start=1):
            scores[doc_id] += weight / (k + rank)

    return sorted(scores.items(), key=lambda item: item[1], reverse=True)

bm25_hits = ["doc_42", "doc_17", "doc_99"]
vector_hits = ["doc_99", "doc_08", "doc_42"]
fused = reciprocal_rank_fusion([bm25_hits, vector_hits], k=60)
# -> [("doc_42", 0.03200), ("doc_99", 0.03200), ("doc_17", 0.01613), ("doc_08", 0.01613)]
```

## Fusion vs. two-stage reranking

Fusion produces a high-recall merged candidate pool (say top 50–100 documents), but neither BM25 nor a bi-encoder inspects fine-grained token interactions between the query and each passage. For precision-sensitive [agentic search](/learn/agentic-search) and [web search APIs](/learn/web-search-api), teams typically feed the fused top-50 into a neural [reranker](/learn/reranking) that scores each `(query, passage)` pair jointly and returns the top 5–10 excerpts for the model's [context window](/learn/context-window).

| Fusion strategy | Calibration needed | Preserves score confidence | Best fit |
| --- | --- | --- | --- |
| Reciprocal Rank Fusion (`k = 60`) | None (rank-only) | No | Default baseline across heterogeneous retrievers |
| Weighted RRF | Light (per-retriever weights) | No | When one signal (e.g., exact IDs) matters more |
| Convex / `alpha` blend | High (normalization + eval set) | Yes | Mature domain corpora with stable score distributions |
| Learned fusion / [reranking](/learn/reranking) | Training or cross-encoder compute | Yes | Highest precision for RAG and agent retrieval |

## Frequently asked questions

**Why is **`**k = 60**`** the standard constant in Reciprocal Rank Fusion?**

In the original 2009 SIGIR paper, `k = 60` damped the outsized advantage of rank 1 over rank 2 while still rewarding top placements across systems. Smaller `k` values (e.g., `10`–`20`) concentrate weight on the very top ranks; larger values flatten rank differences.

**Does hybrid search double retrieval latency?**

No. Because lexical and vector lookups are independent, they run concurrently. Wall-clock latency is the slower of the two retrievers plus sub-millisecond fusion overhead.

**Do I still need a reranker if I use hybrid search?**

Hybrid search improves _recall_ (making sure the right document lands in the top 50). A [reranker](/learn/reranking) improves _precision at top-k_ (making sure the exact right 3–5 passages sit at the top of the prompt). Most production RAG and web-search stacks use both.

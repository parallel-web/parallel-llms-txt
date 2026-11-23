# Semantic search

Semantic search retrieves documents by matching query intent and meaning using dense vector embeddings and nearest-neighbor search rather than requiring exact keyword overlap.

Semantic search retrieves documents by comparing the _meaning_ of a query against the meaning of indexed passages rather than matching exact words. Under the hood, a neural bi-encoder maps both queries and documents into dense [vector embeddings](/learn/vector-embeddings), an Approximate Nearest Neighbor (ANN) index finds the closest vectors in milliseconds, and a [reranker](/learn/reranking) often refines the final order.

**Semantic search architecture (bi-encoder + ANN)**

```text
OFFLINE INGEST
  Docs ──▶ [Chunking] ──▶ [Embedding Model] ──▶ [ANN Vector Index]
                                                        │
ONLINE QUERY                                            ▼ cosine / dot
  Query ─▶ [Same Embedding Model] ──▶ Query Vector ─▶ Top-k Passages
                                                        │
                                                        ▼ (optional)
                                                [Cross-Encoder Rerank]
```

## How semantic search works step by step

1. **Chunking and encoding (offline):** Source documents are split via [document chunking](/learn/document-chunking) into focused 300–800 token passages so each vector represents one coherent idea. Every chunk passes through a bi-encoder transformer to produce a fixed-length vector (e.g., 768–3072 floats), stored in an HNSW or IVF-PQ index.
2. **Query encoding (online):** At search time, the exact same embedding model encodes the user's query into a vector in the same coordinate space.
3. **Nearest-neighbor retrieval:** The vector index returns the top-k passages with the highest cosine similarity or dot product, matching conceptually equivalent phrasing (`"reduce LLM latency"` -> `"prefix KV caching and TTFT optimization"`) with zero overlapping keywords.
4. **Reranking (recommended):** Because compressing a passage into one vector loses fine-grained word interactions, production stacks pass the top 50–100 hits to a cross-encoder [reranker](/learn/reranking) to pick the sharpest 5–10 results.

```python
import numpy as np

def semantic_search(query_vec: np.ndarray, doc_matrix: np.ndarray, doc_ids: list[str], k: int = 5):
    # Assume rows of doc_matrix and query_vec are L2-normalized
    scores = doc_matrix @ query_vec
    top_idx = np.argsort(scores)[::-1][:k]
    return [(doc_ids[i], round(float(scores[i]), 4)) for i in top_idx]
```

## Semantic search vs. lexical search vs. hybrid search

Pure semantic search is rarely optimal on its own. Dense embeddings shine on paraphrases, multilingual queries, and conceptual questions, while [lexical search](/learn/lexical-search) (BM25 over an [inverted index](/learn/inverted-index)) dominates exact identifiers, error codes, legal citations, and newly coined names. Combining both via [hybrid search](/learn/hybrid-search) consistently beats either retriever alone.

| Capability | [Lexical search](/learn/lexical-search) (BM25) | Semantic search (dense) | [Hybrid search](/learn/hybrid-search) |
| --- | --- | --- | --- |
| Paraphrases & intent matching | Weak without [query expansion](/learn/query-expansion) | Strong | Strong |
| Exact codes, SKUs, proper nouns | Strong | Weak (embedding drift) | Strong |
| Negation & subtle logic ("not X") | Weak | Weak (needs cross-encoder) | Strong with [reranking](/learn/reranking) |
| Zero-shot new jargon/entities | Works immediately | Degrades until model updates | Works immediately |
| Infrastructure cost | Low (CPU + compressed disk) | Higher (RAM-heavy vector index + GPU encode) | Moderate |

## Why semantic search matters for AI agents

An [AI agent](/learn/ai-agent) querying the live web or an enterprise knowledge base rarely knows the exact terminology an author used on the target page. Semantic retrieval lets a [web search API](/learn/web-search-api) like [Parallel Search](/products/search) accept a natural-language `objective`—combining dense semantic matching, lexical precision, and neural reranking over a live [web index](/learn/web-index)—and return compact, relevant excerpts sized for the agent's [context window](/learn/context-window).

## Frequently asked questions

**Is semantic search the same as RAG?**

No. Semantic search is a _retrieval_ technique (finding relevant passages via vector similarity). [RAG](/learn/rag-retrieval-augmented-generation) is the full retrieve-augment-generate pipeline that feeds retrieved passages into an LLM to generate a grounded answer.

**Why does semantic search sometimes return topically similar but wrong answers?**

Bi-encoders compress an entire passage into a single point in vector space. Two passages about `"Stripe pricing in 2024"` and `"Stripe pricing in 2026"` sit almost on top of each other geometrically. Adding metadata date filters, [hybrid search](/learn/hybrid-search), and a cross-encoder [reranker](/learn/reranking) fixes this.

**Can I run semantic search without a vector database?**

For small corpora under ~50,000 chunks, an in-memory NumPy matrix multiply or SQLite/Postgres (`pgvector`) handles exact search in milliseconds without a dedicated vector database. Dedicated ANN indexes (HNSW, IVF-PQ) pay off once corpora grow into millions of passages.

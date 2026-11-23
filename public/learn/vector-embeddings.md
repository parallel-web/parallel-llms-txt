# Vector embeddings

Vector embeddings are fixed-length numeric arrays produced by a neural encoder so texts with similar meaning sit close together in vector space, enabling semantic similarity search at scale.

Vector embeddings are fixed-length arrays of floating-point numbers produced by a neural encoder model so that texts with similar meaning land close together in geometric space. They are the storage and matching primitive behind [semantic search](/learn/semantic-search), dense [RAG](/learn/rag-retrieval-augmented-generation), and the vector branch of [hybrid search](/learn/hybrid-search)—allowing a search engine to match `"PostgreSQL failover"` to `"database outage recovery"` even when the two strings share zero words.

**From raw text to Approximate Nearest Neighbor (ANN) lookup**

```text
Documents ──▶ [Bi-Encoder] ──▶ [0.12, -0.44, ...] ──▶ ┌──────────────┐
                                                      │  ANN Index   │
Query     ──▶ [Bi-Encoder] ──▶ [0.15, -0.41, ...] ──▶ │ (HNSW / IVF) │
                                                      └──────┬───────┘
                                                             ▼
                                                   Top-k nearest IDs
```

## Similarity metrics: cosine, dot product, and L2

Once text is encoded into vectors of dimension `d` (commonly `768`, `1536`, or `3072`), similarity reduces to linear algebra:

- **Cosine similarity:** Measures the angle between two vectors (`dot(a, b) / (||a|| * ||b||)`), ignoring length. When all embeddings are L2-normalized to unit length at index time, cosine similarity equals the faster **dot product** (`dot(a, b)`).
- **Dot product (inner product):** Fastest instruction on modern SIMD/GPU hardware; used directly by unit-normalized embedding models and MIPS (Maximum Inner Product Search) setups.
- **Euclidean distance (L2):** Straight-line distance (`||a - b||`); gives identical top-k ranking to cosine similarity on unit-normalized vectors.

```python
import math

def l2_normalize(vec: list[float]) -> list[float]:
    norm = math.sqrt(sum(x * x for x in vec))
    return [x / norm for x in vec] if norm > 0 else vec

def dot(a: list[float], b: list[float]) -> float:
    return sum(x * y for x, y in zip(a, b))

def top_k_cosine(query_vec: list[float], corpus: list[tuple[str, list[float]]], k: int = 5):
    q = l2_normalize(query_vec)
    scored = [(doc_id, dot(q, l2_normalize(vec))) for doc_id, vec in corpus]
    return sorted(scored, key=lambda item: item[1], reverse=True)[:k]
```

## Scaling beyond brute force: HNSW, IVF, and quantization

Exact brute-force comparison scans every vector in the corpus (`O(N * d)`), which stays fast up to roughly 50K–100K passages but breaks down at millions of documents. Large vector indexes trade a small fraction of recall for sub-10ms latency using **Approximate Nearest Neighbor (ANN)** structures:

| Index / technique | How it narrows the search | Memory footprint | Typical trade-off |
| --- | --- | --- | --- |
| Flat (exact) | Scans every vector | High (`4 * d` bytes/vec in `fp32`) | 100% recall, linear latency growth |
| HNSW (graph) | Navigates layered proximity graphs greedily | High (vectors + graph edges in RAM) | Fast p99 and high recall; slow builds |
| IVF-PQ | Clusters into Voronoi cells + product quantization | Low (10x–30x compression) | Fits huge corpora in RAM; lower recall without oversampling |
| Binary / `int8` quantization | Compresses `fp32` dims to 8-bit or 1-bit + rescore | 4x–32x smaller | Minimal recall drop when paired with top-100 full-precision rescoring |

Many modern embedding models also support **Matryoshka Representation Learning (MRL)**—packing the highest-signal dimensions first so you can truncate a 3072-dim vector to 512 or 256 dimensions with modest accuracy loss.

## Where vector embeddings struggle

- **Exact identifiers and rare entities:** Error codes (`ECONNRESET`), product SKUs, and brand-new company names compress poorly into general embedding spaces—pair vectors with [lexical search](/learn/lexical-search) via [hybrid search](/learn/hybrid-search).
- **Single-vector bottleneck:** Compressing a 2,000-word article into one vector averages its topics together, which is why [document chunking](/learn/document-chunking) and second-stage [reranking](/learn/reranking) matter so much in production.
- **Model lock-in:** Vectors from two different embedding models live in incompatible coordinate spaces. Switching models requires re-embedding the entire corpus.

## Frequently asked questions

**Why must query and document vectors come from the same embedding model?**

Each embedding model learns its own arbitrary coordinate system during training. Comparing a query vector from Model A against document vectors from Model B produces meaningless distances.

**How much RAM does 1 million 1536-dim embeddings take?**

In `float32` (4 bytes per dimension), `1,000,000 * 1,536 * 4` bytes is roughly **6.1 GB** for raw vectors alone, plus ~30%–50% overhead for an HNSW graph. `int8` scalar quantization cuts raw vector memory by 4x (~1.5 GB).

**Are asymmetric query and document prefixes still needed?**

For many bi-encoder models, yes: short questions and long passages have different distributions, so models often expect distinct task prefixes or `input_type` flags (`query` vs. `document`) at encode time.

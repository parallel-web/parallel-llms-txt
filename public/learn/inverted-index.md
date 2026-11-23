# Inverted index

An inverted index maps every unique normalized term in a corpus to the sorted list of documents and token positions where it appears, turning full-corpus scans into millisecond lookups.

If you scan a billion web pages linearly for every query, a single search takes minutes. An inverted index flips the storage layout: instead of mapping each document to the words inside it, it maps every unique term to the sorted list of documents (and positions) where that term appears. That single data structure sits underneath every classical [web index](/learn/web-index), Lucene/Elasticsearch cluster, and [lexical search](/learn/lexical-search) engine.

**Forward index vs. inverted index**

```text
FORWARD INDEX (doc -> terms)
  doc 1: "web search for ai agents"
  doc 2: "ai agents call search api"
  doc 3: "web crawler builds web index"

INVERTED INDEX (term -> postings list)
  Term        DF    Postings  (doc_id: [positions])
  ──────────  ──    ─────────────────────────────────────────
  "agents"    2 ──▶ [1: [4],        2: [1]]
  "ai"        2 ──▶ [1: [3],        2: [0]]
  "api"       1 ──▶ [2: [4]]
  "crawler"   1 ──▶ [3: [1]]
  "search"    2 ──▶ [1: [1],        2: [3]]
  "web"       2 ──▶ [1: [0],        3: [0, 3]]
```

## Anatomy of an inverted index

An inverted index has two primary structures that stay separate on disk and in memory:

1. **The term dictionary (lexicon):** A compact lookup structure—often a Finite State Transducer (FST) or prefix trie—mapping each normalized token to its corpus document frequency (`df`) and a byte offset into the postings file. Keeping the dictionary small lets it live in RAM so term lookups take nanoseconds.
2. **Postings lists:** For each term, a sorted array of `doc_id` entries where the term occurs, optionally paired with:

  - **Term frequency (**`**tf**`**):** How many times the term appears in that document (needed for BM25).
  - **Positions:** Token offsets inside the document (needed for exact phrase queries like `"web search"` and proximity scoring).
  - **Field / impact metadata:** Whether the hit was in `<title>`, `<h1>`, anchor text, or body copy.

Because postings lists are sorted by ascending `doc_id`, evaluating a Boolean `AND` query (`"ai" AND "search"`) reduces to a linear merge-intersection across two sorted lists—or even faster, using skip pointers (`skip lists` / `Block-Max` blocks) to jump past millions of non-matching IDs in logarithmic hops.

## Compression: delta encoding and bit-packing

Uncompressed 64-bit document IDs would blow past memory budgets on web-scale corpora. Because every postings list is strictly increasing (`[104, 109, 112, 130]`), engines store **d-gaps** (deltas between consecutive IDs: `[104, 5, 3, 18]`). Small integers compress tightly with variable-byte encoding (`varint`) or SIMD-friendly block formats like **Frame-of-Reference (FOR)** and **SIMD-BP128**, often shrinking postings to a few bits per posting while decoding billions of integers per second.

```python
from collections import defaultdict
import re

class InvertedIndex:
    def __init__(self) -> None:
        # term -> {doc_id: [positions]}
        self.postings: dict[str, dict[int, list[int]]] = defaultdict(lambda: defaultdict(list))

    def add(self, doc_id: int, text: str) -> None:
        tokens = re.findall(r"[a-z0-9]+", text.lower())
        for pos, tok in enumerate(tokens):
            self.postings[tok][doc_id].append(pos)

    def search_and(self, terms: list[str]) -> set[int]:
        lists = [set(self.postings.get(t.lower(), {})) for t in terms]
        return set.intersection(*lists) if lists else set()

    def search_phrase(self, phrase: str) -> list[int]:
        terms = re.findall(r"[a-z0-9]+", phrase.lower())
        candidates = self.search_and(terms)
        matches = []
        for doc_id in sorted(candidates):
            # Check if position p in term[0] has p+1 in term[1], p+2 in term[2], ...
            first_positions = self.postings[terms[0]][doc_id]
            if any(
                all((p + offset) in self.postings[t][doc_id] for offset, t in enumerate(terms[1:], 1))
                for p in first_positions
            ):
                matches.append(doc_id)
        return matches
```

## Handling live updates: immutable segments and merges

Mutating compressed postings lists in place on every newly crawled page is prohibitively expensive. Production search engines borrow an **LSM-style immutable segment** model (documented in [Apache Lucene](https://lucene.apache.org/)):

- Incoming documents buffer in memory and flush periodically as small, read-only index segments.
- Deletes write to a lightweight tombstone bitset rather than rewriting postings.
- Background compaction merges smaller segments into larger sorted ones, dropping deleted `doc_id`s and keeping query fan-out bounded.

This design lets a [web crawler](/learn/web-crawler) ingest millions of updated pages per day while readers query consistent snapshots lock-free.

## Inverted index vs. vector index

Modern [hybrid search](/learn/hybrid-search) systems run an inverted index alongside a vector index (such as HNSW or IVF-PQ) because the two structures answer different questions.

| Property | Inverted index | Vector index (ANN / HNSW) |
| --- | --- | --- |
| Lookup key | Exact normalized token | High-dimensional dense embedding |
| Exact phrase and filter queries | Native and exact | Requires metadata pre-/post-filtering |
| Memory footprint | Compact (bit-packed d-gaps on disk + RAM) | High (float/quantized vectors in RAM) |
| Semantic synonym matching | None without query expansion | Native |
| Typical role in AI search | Candidate generation + exact identifier recall | Candidate generation for conceptual queries |

## Frequently asked questions

**Why is it called an "inverted" index?**

A document naturally maps `document -> terms` (a forward index). Inverting that mapping to `term -> documents` turns a full-corpus scan into an `O(1)` dictionary lookup plus a fast postings traversal.

**Does an inverted index work for semantic search?**

Not directly for dense embeddings, which use approximate nearest-neighbor graphs like HNSW. However, learned sparse retrieval models such as **SPLADE** expand documents into weighted vocabulary tokens so they can run directly inside a standard inverted index.

**How big is an inverted index compared to the raw text?**

Without positions, a well-compressed inverted index is typically 10%–20% of the raw text size; with full positional data for phrase search, it commonly runs 30%–50% of the source text.

# Lexical search

Lexical search retrieves documents by matching exact normalized query tokens against an inverted index, ranking results with corpus term statistics like TF-IDF and BM25.

Lexical search retrieves documents by matching the exact tokens in a query against the tokens stored in a text index. Unlike [semantic search](/learn/semantic-search), which maps text into dense vectors to compare meaning, lexical search operates directly on words, subwords, and their corpus statistics. That makes it fast, deterministic, and hard to beat whenever exact identifiers—error codes, product SKUs, function names, legal citations, or proper nouns—decide whether a result is right.

**Lexical search pipeline (BM25)**

```text
Query: "http 429 retry-after"
  │
  ▼ tokenize + normalize
["http", "429", "retry", "after"]
  │
  ▼ look up postings in inverted index
┌──────────────────────┐     ┌──────────────────────────────────┐
│ Candidate Doc IDs    │ ──▶ │ BM25 Scorer                      │
│ (union / top-k WAND) │     │  • TF saturation  (k1 ≈ 1.2)     │
└──────────────────────┘     │  • Rare-term IDF weight          │
                             │  • Doc length norm (b ≈ 0.75)    │
                             └────────────────┬─────────────────┘
                                              ▼
                                    Ranked document list
```

## From TF-IDF to BM25

Early lexical engines ranked documents with **TF-IDF** (term frequency times inverse document frequency): a term that appears often in one document and rarely across the corpus scores high. Raw TF-IDF has two well-known flaws: repeating a word 50 times inflates its score linearly, and long documents accumulate higher scores simply by containing more words.

**Okapi BM25**, introduced by Robertson and Walker in the 1990s and formalized in [Robertson & Zaragoza (2009)](https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf), fixes both with two tunable constants:

- **Term-frequency saturation (**`**k1**`**, typically **`**1.2**`**–**`**2.0**`**):** Additional occurrences of a query term yield diminishing returns and asymptotically flatten instead of growing unbounded.
- **Document-length normalization (**`**b**`**, typically **`**0.75**`**):** Scores are penalized when a document is much longer than the corpus average (`avgdl`), preventing long boilerplate pages from dominating concise matches.

```python
import math
from collections import Counter

def bm25_score(
    query_terms: list[str],
    doc_tokens: list[str],
    doc_freq: dict[str, int],
    num_docs: int,
    avgdl: float,
    k1: float = 1.2,
    b: float = 0.75,
) -> float:
    tf = Counter(doc_tokens)
    dl = len(doc_tokens)
    score = 0.0

    for term in query_terms:
        f = tf.get(term, 0)
        if f == 0:
            continue
        df = doc_freq.get(term, 0)
        idf = math.log((num_docs - df + 0.5) / (df + 0.5) + 1.0)
        denom = f + k1 * (1.0 - b + b * (dl / avgdl))
        score += idf * (f * (k1 + 1.0)) / denom

    return score
```

In production engines (Lucene, Elasticsearch, Tantivy, and large-scale [web indexes](/learn/web-index)), BM25 runs over an [inverted index](/learn/inverted-index) using dynamic pruning algorithms like **WAND** (Weak AND) or **Block-Max WAND**, which skip entire blocks of postings whose upper-bound score cannot enter the top-k heap. That keeps p99 query latency in single-digit milliseconds across millions of documents on CPU alone.

## Tokenization choices decide recall

Lexical search only matches what survives text analysis at index time and query time. Small analyzer choices change recall dramatically:

- **Case folding and punctuation splitting:** Turning `Retry-After` into `["retry", "after"]` catches prose variations, while splitting on dots or underscores can either help or break code identifiers (`err_conn_reset`, `v2.1.4`).
- **Stemming and lemmatization:** Mapping `crawling`, `crawled`, and `crawlers` to `crawl` improves recall on natural language, at the cost of occasional false matches.
- **Stopwords:** Dropping common words (`the`, `of`) shrinks the index, but hurts exact-phrase queries like `"to be or not to be"` or `"the who"`. Modern BM25 systems generally keep stopwords because IDF already down-weights them naturally.
- **N-grams and compound splitting:** Character n-grams recover typo tolerance and handle languages without whitespace word boundaries.

## Lexical search vs. semantic search vs. hybrid search

Lexical search fails on vocabulary mismatch: a query for `"database outage mitigation"` will not match a page that only says `"PostgreSQL failover playbook"`. That is why modern retrieval stacks pair lexical and dense retrieval in [hybrid search](/learn/hybrid-search), often followed by neural [reranking](/learn/reranking).

| Dimension | Lexical search (BM25) | [Semantic search](/learn/semantic-search) | [Hybrid search](/learn/hybrid-search) |
| --- | --- | --- | --- |
| Match signal | Exact tokens + IDF statistics | Dense vector similarity | Combined lexical + vector scores |
| Exact IDs, SKUs, error codes | Strong | Weak (often drifts to neighbors) | Strong |
| Synonyms and paraphrases | Weak without query expansion | Strong | Strong |
| Index hardware | CPU + RAM / SSD | GPU / vector index (HNSW, IVF) | Both |
| Interpretability | High (per-term score breakdown) | Low (cosine distance only) | Moderate |

## Why AI agents still rely on lexical search

When an [AI agent](/learn/ai-agent) debugs a stack trace, checks a regulation number (`17 CFR 240.10b-5`), or searches for a newly coined company name, lexical matching is often the deciding signal. Embedding models struggle with out-of-distribution strings and rare proper nouns, whereas an inverted index finds an exact string on day one without retraining. Production [web search APIs](/learn/web-search-api) and [agentic search](/learn/agentic-search) loops therefore combine lexical signals with semantic retrieval and neural reranking rather than replacing one with the other.

## Frequently asked questions

**Is lexical search the same as keyword search?**

Yes. "Keyword search" is the informal name for lexical search—matching discrete terms (tokens) against an [inverted index](/learn/inverted-index) using scoring functions such as TF-IDF or BM25.

**Why did BM25 replace raw TF-IDF?**

Raw TF-IDF lets repeated words dominate a document's score linearly and favors long pages. BM25 adds term-frequency saturation (`k1`) and length normalization (`b`), consistently improving precision across information-retrieval benchmarks.

**Can semantic search replace lexical search completely?**

Rarely in production. Dense embeddings excel at conceptual similarity and paraphrases, but lexical search remains faster on CPU and far more accurate for exact codes, numbers, version strings, and brand or entity names. Most production systems combine both via [hybrid search](/learn/hybrid-search).

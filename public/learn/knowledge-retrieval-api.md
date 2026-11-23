# Knowledge retrieval API

A knowledge retrieval API takes a query and returns ranked passages, relevance scores, and source provenance from an indexed corpus without running generative synthesis—separating retrieval quality from model choice.

A knowledge retrieval API accepts a natural-language query or structured filter and returns ranked passages, metadata, and source pointers from an indexed corpus—without running a generative LLM over the results. Separating retrieval from generation gives engineering teams independent control over corpus freshness, access permissions, latency, [reranking](/learn/reranking), and which model synthesizes the final answer.

**Knowledge retrieval API inside a RAG stack**

```text
┌──────────────────┐   POST /retrieve {query, top_k, filters}
│   Application /  │ ──────────────────────────────────────────▶
│    AI Agent      │
└────────┬─────────┘ ◀──────────────────────────────────────────
         │             [{text, score, source_uri, metadata}, ...]
         │
         ▼ inject top passages + system instructions
┌──────────────────┐   ┌────────────────────────────────────────┐
│   Any LLM API    │   │ Inside the Retrieval API               │
│ (model-agnostic) │   │  [Hybrid Search] ─▶ [Reranker] ─▶ ACLs │
└──────────────────┘   └────────────────────────────────────────┘
```

## What a knowledge retrieval API returns

Unlike an answer engine that hides its sources inside generated prose, a retrieval API exposes raw, inspectable evidence so your application can filter by score threshold, enforce tenant access controls, and pass exact excerpts into a [context window](/learn/context-window):

- **Ranked passages or excerpts:** Pre-chunked or query-focused slices of text sized for LLM prompts rather than full multi-megabyte documents.
- **Relevance scores:** Numeric scores (cosine similarity, BM25, or cross-encoder logits) allowing your code to abstain when `max_score < threshold`.
- **Source provenance:** Canonical URL, document ID, section title, or `publish_date` for [source grounding](/learn/source-grounding) and audit trails.
- **Metadata filters:** Hard pre- or post-filters by tenant ID, domain, document type, or date range so unauthorized or stale records never reach the model.

```json
{
  "request": {
    "query": "EU data residency retention window for audit logs",
    "top_k": 5,
    "filters": {
      "region": "eu",
      "doc_type": "policy"
    }
  },
  "results": [
    {
      "doc_id": "pol_eu_2026_04",
      "title": "EU Data Processing Addendum",
      "url": "https://example.com/legal/eu-dpa",
      "score": 0.914,
      "excerpt": "Audit logs for EU workspace traffic remain in Frankfurt (eu-central-1) for 90 days before automated deletion."
    }
  ]
}
```

## Internal knowledge retrieval vs. web knowledge retrieval

The same API contract serves two distinct corpora—and production [AI agents](/learn/ai-agent) often query both in the same turn:

| Dimension | Internal knowledge retrieval API | Web knowledge retrieval ([Web search API](/learn/web-search-api)) |
| --- | --- | --- |
| Backing corpus | Private docs, wikis, tickets, SQL/PDFs | Public live [web index](/learn/web-index) |
| Ingestion | Push webhooks, connectors, batch chunking | Continuous [web crawling](/learn/web-crawler) + deduplication |
| Access control | Row-/document-level ACLs per user/tenant | Public web + domain/date policies |
| Retrieval stack | [Hybrid search](/learn/hybrid-search) + [reranking](/learn/reranking) | Multi-stage web index + neural reranking + excerpting |
| Example use | Support bots, enterprise Q&A, code search | Live market research, [KYB](/learn/kyb), [agentic search](/learn/agentic-search) |

For the public web half of the stack, [Parallel Search](/products/search) exposes this retrieval-only pattern directly: you send an `objective` and `search_queries`, and get back ranked URLs and dense excerpts without being locked to a single LLM vendor.

## Why retrieval quality sets the ceiling for RAG

A [Stanford RegLab study on legal RAG](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf) demonstrated that even retrieval-augmented systems still hallucinate when retrieval returns wrong, incomplete, or misranked passages. In practice, improving retrieval recall and precision—via [hybrid search](/learn/hybrid-search), domain/date filtering, and [reranking](/learn/reranking)—moves end-to-end answer accuracy more reliably than swapping the generator model alone.

## Frequently asked questions

**How is a knowledge retrieval API different from RAG?**

A knowledge retrieval API is the _R_ (retrieval) step of [RAG](/learn/rag-retrieval-augmented-generation) exposed as a standalone service. You still pair it with an LLM (or [agentic search](/learn/agentic-search) loop) to synthesize an answer.

**Why not just query a vector database directly?**

A raw vector database only runs approximate nearest-neighbor lookup on embeddings you chunked and embedded yourself. A managed knowledge retrieval API bundles ingestion, chunking, [lexical search](/learn/lexical-search) + vector [hybrid search](/learn/hybrid-search), metadata filtering, and [reranking](/learn/reranking) behind one endpoint.

**When should you use a retrieval API instead of an end-to-end answer API?**

Use a retrieval API when you want control over the generator model, prompt template, multi-turn [tool calling](/learn/tool-calling), score-based abstention, or combining internal and live web evidence in one prompt.

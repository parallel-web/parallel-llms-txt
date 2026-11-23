# Query expansion

Query expansion rewrites, broadens, or decomposes a search query into additional queries before hitting an index, recovering relevant documents that use different vocabulary than the original prompt.

Query expansion rewrites, broadens, or decomposes a user's original search query into additional queries before hitting a search index, recovering relevant documents that use different phrasing than the initial input. It bridges the vocabulary gap in [lexical search](/learn/lexical-search) and helps [agentic search](/learn/agentic-search) loops turn vague or multi-part questions into high-recall lookups across a [web index](/learn/web-index).

**Multi-query expansion and rank fusion**

```text
                   "why did stripe buy bridge?"
                                 │
                                 ▼ expand / decompose
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
  ["Stripe Bridge         ["Bridge stablecoin     ["Stripe acquisition
    acquisition 2024"]     API announcement"]       Bridge rationale"]
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼ parallel search + RRF merge
                     Deduplicated, high-recall results
```

## Four query-expansion techniques

Query expansion evolved from statistical corpus heuristics to fast LLM-driven rewriting:

1. **Synonyms and stemming (classical IR):** Adding domain synonyms (`"k8s"` -> `"kubernetes"`, `"10-K"` -> `"annual report"`) or morphological stems at query time inside an [inverted index](/learn/inverted-index). Fast and deterministic, but requires curated dictionaries.
2. **Pseudo-Relevance Feedback (PRF / RM3):** Run the initial query, assume the top 5–10 returned documents are relevant, extract their highest-IDF terms, and issue a second expanded query. Strong in classic BM25 benchmarks, though it amplifies drift if the initial top hits are off-topic.
3. **LLM multi-query fan-out:** Generate 2–4 complementary keyword queries covering distinct angles, entity aliases, or primary-source terms (such as `"site:sec.gov"` or `"changelog"`), execute them in parallel, and merge results with Reciprocal Rank Fusion ([hybrid search](/learn/hybrid-search)).
4. **HyDE (Hypothetical Document Embeddings):** Prompt a lightweight model to draft a short hypothetical passage answering the question, embed that draft, and run [semantic search](/learn/semantic-search) with the resulting vector—aligning question phrasing with declarative document prose.

```python
import os
import requests

def expanded_web_search(objective: str, expanded_queries: list[str]) -> list[dict]:
    resp = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={
            "mode": "fast",
            "objective": objective,
            "search_queries": expanded_queries[:3],
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json().get("results", [])
```

## Query expansion vs. query decomposition

| Technique | Input shape | What it produces | Main risk |
| --- | --- | --- | --- |
| Query expansion (synonyms / fan-out) | Short or ambiguous single question | 2–4 paraphrases or lexical variants run in parallel | Topic drift if synonyms broaden meaning too far |
| Query decomposition | Multi-hop or compound question ("Compare X and Y's Q3 margin") | Independent sub-questions answered separately, then synthesized | Sequential dependencies still require multi-hop [agentic search](/learn/agentic-search) |
| HyDE | Natural-language question against dense vector index | Hypothetical answer embedded as the search vector | Hallucinated entities in the draft can pull wrong neighbors |

## Guardrails in production

- **Preserve exact identifiers:** Never let an LLM rewriter paraphrase error codes, stock tickers, contract numbers, or quoted phrases. Always include the user's raw exact terms alongside expanded queries.
- **Cap fan-out and fuse cleanly:** Expanding to 2–3 targeted queries captures most of the recall gain; issuing 12 redundant paraphrases wastes API quota and floods the [reranking](/learn/reranking) stage with near-duplicates.
- **Watch latency budgets:** Adding a slow LLM rewrite call before a 200ms search call can quadruple total latency. Either use a fast lightweight model, generate queries directly inside the agent's [tool calling](/learn/tool-calling) arguments (zero extra LLM hop), or pass a natural-language `objective` alongside keyword `search_queries` to a [web search API](/learn/web-search-api) that performs expansion internally.

## Frequently asked questions

**When does query expansion hurt precision?**

Expansion hurts when a query already specifies an exact identifier (a CVE number, function name, or exact title) and adding broader synonyms pulls generic articles ahead of the exact match.

**How does query expansion work inside an AI agent?**

Instead of a separate rewrite step, modern agents perform expansion directly when emitting `search_queries` inside a [tool call](/learn/tool-calling)—combining exact entities, date anchors, and primary-source keywords in one payload.

**Does semantic search eliminate the need for query expansion?**

No. Even dense [vector embeddings](/learn/vector-embeddings) miss multi-aspect queries and struggle when a single question implies two separate facts. Decomposing and expanding queries improves recall across lexical, semantic, and [hybrid search](/learn/hybrid-search) alike.

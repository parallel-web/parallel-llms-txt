# Agentic search

Agentic search is a retrieval loop in which a language model writes its own search queries, reads the returned evidence, identifies gaps or contradictions, and issues follow-up queries until it has enough grounded facts to answer.

Classic retrieval pipelines—like single-shot [RAG](/learn/rag-retrieval-augmented-generation)—run one fixed query against an index and pass the top-k chunks into one generation call. That breaks down whenever the answer depends on information you cannot name up front, spans multiple documents, or requires verifying a claim against a primary source. Agentic search turns retrieval into a control loop: the model plans queries, calls a [web search API](/learn/web-search-api) via [tool calling](/learn/tool-calling), inspects the returned evidence, and decides whether to rewrite the query, fetch a full page, or stop and synthesize a cited answer.

**Single-shot RAG vs. agentic search loop**

```text
SINGLE-SHOT RAG (1 fixed retrieval pass)
  [User Query] ──▶ [Retrieve top-k] ──▶ [Generate Answer]

AGENTIC SEARCH (iterative, model-directed loop)
  ┌─────────────┐  queries  ┌──────────────┐  excerpts
  │ Plan/Write  │ ────────▶ │ Web Search   │ ────────────┐
  │ Next Queries│           │ API / Index  │             │
  └─────────────┘           └──────────────┘             ▼
        ▲                                       ┌────────────────┐
        │    YES: refine / drill down           │ Inspect & Check│
        └───────────────────────────────────────┤ Evidence Gaps? │
                                                └───────┬────────┘
                                                        │ NO
                                                        ▼
                                                ┌────────────────┐
                                                │ Synthesize &   │
                                                │ Cite Sources   │
                                                └────────────────┘
```

Anthropic highlighted this shift in _[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)_: instead of executing a hard-coded retrieval script, capable agents generate their own queries and react to what comes back. On multi-hop question-answering benchmarks, iterative agent-directed retrieval consistently outperforms single-pass RAG because the agent can follow chains of newly discovered facts across turns.

## How the four-stage loop works

Every round of an agentic search loop passes through four operations, repeating until the evidence is sufficient or a step budget runs out:

1. **Decompose and plan:** The model breaks a compound question into sub-questions and writes targeted queries. For a multi-hop question ("Did the acquirer of Company X launch an EU endpoint this year?"), hop 1 resolves the acquirer's name before hop 2 searches that company's changelog and docs.
2. **Search and fan out:** The runtime executes one or more queries against a live [web index](/learn/web-index) or internal corpus—often issuing independent sub-queries in parallel to keep wall-clock latency low.
3. **Read and selectively fetch:** The model inspects ranked snippets or query-focused excerpts. When an excerpt confirms a lead but truncates the table or clause needed to verify it, the agent selectively fetches the underlying URL (for example via [Extract](/products/extract) or a [headless browser API](/learn/headless-browser-api)).
4. **Check stopping criteria and refine:** The model checks whether all sub-questions are answered, whether primary sources agree, and whether facts are current. If gaps or conflicts remain, it rewrites the query with tighter terms, domain filters, or date constraints and runs another hop.

## What an agentic search loop looks like in code

In practice, an agentic search loop is a bounded [agentic workflow](/learn/agentic-workflow) wired to a search endpoint that returns token-efficient excerpts rather than raw HTML. Passing full web pages on every hop exhausts the context window within a few turns; returning compressed, query-relevant excerpts (as in [Parallel Search](/products/search)) keeps each round lean enough for 5–10 hops.

```python
import os
import requests

def search_web(objective: str, search_queries: list[str], mode: str = "fast") -> list[dict]:
    resp = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={
            "mode": mode,
            "objective": objective,
            "search_queries": search_queries,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return [
        {
            "title": r["title"],
            "url": r["url"],
            "publish_date": r.get("publish_date"),
            "excerpts": r.get("excerpts", [])[:2],
        }
        for r in resp.json().get("results", [])[:5]
    ]
```

Wrap `search_web` inside a [tool-calling](/learn/tool-calling) loop with a `max_steps` ceiling and a `seen_queries` set. On hop 1, the model calls `search_web` to identify the entity or primary domain; on hop 2, it narrows `search_queries` to official filings, documentation, or recent announcements; once the evidence settles the question, it stops calling tools and writes a grounded answer citing the exact URLs returned in earlier observations.

## Single-shot RAG vs. agentic search vs. deep research

Agentic search sits between single-pass retrieval and long-running [deep research](/learn/deep-research) systems. Choosing the right tier is a latency-versus-recall trade-off.

| Pattern | Retrieval passes | Typical latency | Best fit | Main failure mode |
| --- | --- | --- | --- | --- |
| Single-shot [RAG](/learn/rag-retrieval-augmented-generation) | 1 fixed query | Sub-second to ~2s | Direct lookups over a known, clean corpus | Misses multi-hop facts or poorly phrased queries |
| Agentic search | 2–8 model-directed hops | 2–20s | Live Q&A, coding agents, support, entity verification | Looping on dead ends or blowing context budget |
| [Deep research](/learn/deep-research) | Dozens of queries + full-page synthesis | Minutes | Due diligence, market reports, exhaustive audits | Too slow and expensive for interactive turns |

## Production constraints and tuning

Running search inside a model loop exposes failure modes that single-shot retrieval hides:

- **Context budget:** Every search result appended to the transcript is re-read on every subsequent turn. Applying [context engineering](/learn/context-engineering)—limiting results per hop, capping excerpt length, and trimming stale raw pages—keeps both token cost and retrieval precision under control.
- **Latency compounding:** Sequential hops multiply search latency by LLM round-trip time. Pairing a low-latency search tier with parallel tool calls (issuing 2–4 sub-queries in one turn) cuts total wall-clock time sharply.
- **Source conflict and freshness:** Open-web results routinely disagree—for example, a stale blog post contradicting a current pricing page or SEC filing. Effective agent prompts instruct the model to prefer primary sources, check `publish_date`, and run a disambiguation query when two sources conflict.
- **Hard stopping rules:** Without a `max_hops` cap and duplicate-query guard, a model chasing an unanswerable fact will burn tokens spinning on slight paraphrases. Returning a bounded "not found" state is better than letting the loop run indefinitely.
- **Evaluation:** Static single-hop benchmarks under-test agentic loops. Multi-hop web evaluations such as BrowseComp and DeepSearchQA—tracked on [Parallel's benchmarks hub](/benchmarks)—measure whether an agent chains queries, verifies claims across pages, and preserves [source grounding](/learn/source-grounding).

## Frequently asked questions

**Is agentic search the same as RAG?**

No. Standard [RAG](/learn/rag-retrieval-augmented-generation) runs one deterministic retrieval step before generation. Agentic search puts the model inside the retrieval loop so it writes, inspects, and refines its own queries across multiple turns based on intermediate findings.

**Does agentic search require a reasoning model?**

No. Any model with reliable [tool calling](/learn/tool-calling) can execute a search-read-refine loop. Stronger reasoning models do improve query decomposition, conflict resolution, and knowing when to stop, especially on hard multi-hop questions.

**When is single-shot search better than an agentic loop?**

Use a single search call when the query is unambiguous, answerable from one page, and bound by a tight latency budget (such as autocomplete, quick fact lookups, or high-volume enrichment where a single well-formed query already achieves high recall).

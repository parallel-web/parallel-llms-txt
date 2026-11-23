# Deep research

Deep research is an asynchronous, long-horizon AI workflow that decomposes a complex question, executes dozens of iterative web searches and full-page reads, cross-checks conflicts, and returns a cited report or typed JSON.

Deep research is an asynchronous, long-horizon AI research architecture that decomposes a complex question into a structured plan, runs dozens of iterative web searches and full-page reads across primary sources, cross-checks conflicting evidence, and synthesizes a comprehensive report with claim-level citations. Where a chatbot answers in seconds from weights and a single-hop [web search API](/learn/web-search-api) answers in under 2 seconds, deep research trades minutes of compute and retrieval for breadth, verification, and synthesis across dozens of sources.

**Deep research plan-search-reason-report architecture**

```text
Complex Question + Optional Output Schema
  │
  ▼ 1. Plan & Decompose
┌────────────────────────────────────────────────────────┐
│ Sub-question A   │ Sub-question B   │ Sub-question C   │
└────────┬─────────┴────────┬─────────┴────────┬─────────┘
         ▼                  ▼                  ▼  2. Multi-hop Search
   [Web Search +      [Web Search +      [Web Search +
    Page Extract]      Page Extract]      Page Extract]
         └──────────────────┼──────────────────┘
                            ▼ 3. Cross-check & Resolve Conflicts
               Evidence Graph (claims + URLs + excerpts)
                            │
                            ▼ 4. Synthesize + Verify Citations
               Cited Report or Typed JSON + Basis
```

## How deep research differs from agentic search and RAG

The three retrieval patterns form a continuous latency-versus-depth ladder:

| Pattern | Sources inspected | Typical runtime | Output format | Best fit |
| --- | --- | --- | --- | --- |
| Single-shot [RAG](/learn/rag-retrieval-augmented-generation) | 3–10 passages (1 query) | <2 s | Short grounded reply | Known-corpus lookups and support |
| [Agentic search](/learn/agentic-search) | 10–30 excerpts (2–8 hops) | 2–20 s | Interactive cited answer | Coding agents, live Q&A, quick verification |
| Deep research | 30–200+ pages + full-page reads | 1–15 min | Long-form cited report or dense structured JSON | Due diligence, [company research](/learn/company-research), [KYB](/learn/kyb), competitive analysis |

## Inside the four-stage execution loop

1. **Research planning:** A planner breaks an open-ended prompt (_"Compare the unit economics, regulatory filings, and recent product launches of five European neobanks"_) into independent research tracks and explicit evidence targets.
2. **Parallel search and selective extraction:** Worker loops run [query expansion](/learn/query-expansion) against a [web index](/learn/web-index), score returned excerpts, and fetch full PDFs, filings, or HTML tables (via an extraction endpoint like [Parallel Extract](/products/extract)) whenever snippets truncate the numbers needed.
3. **Conflict resolution and gap checking:** Before drafting, the system compares findings across sources—preferring primary filings (`sec.gov`, official registries, changelogs) over secondary commentary—and triggers targeted follow-up searches for missing cells or contradictory dates.
4. **Grounded synthesis and attribution:** The synthesizer writes the final report or [structured output](/learn/structured-outputs) strictly from the evidence graph, attaching verifiable URLs, excerpts, and confidence levels ([source grounding](/learn/source-grounding) / [citations API](/learn/citations-api)).

```python
import os
import time
import requests

API = "https://api.parallel.ai/v1/tasks/runs"
HEADERS = {"x-api-key": os.environ["PARALLEL_API_KEY"]}

run = requests.post(
    API,
    headers=HEADERS,
    json={
        "input": "Summarize the latest EU AI Act enforcement milestones effective in 2026 with official EU sources.",
        "processor": "ultra",
    },
    timeout=30,
).json()

# Poll (or wait via webhook) until the asynchronous research run completes
while True:
    status = requests.get(f"{API}/{run['run_id']}", headers=HEADERS, timeout=30).json()
    if status["status"] in ("completed", "failed"):
        break
    time.sleep(5)

result = requests.get(f"{API}/{run['run_id']}/result", headers=HEADERS, timeout=30).json()
```

## Deep research surfaces: interactive UIs vs. APIs

Deep research is offered both in consumer chat interfaces and as programmable APIs:

- **Consumer/interactive deep research:** OpenAI Deep Research and Google Gemini Deep Research are designed for interactive human analysts who want a rich narrative report directly inside a chat UI.
- **Programmable deep research APIs:** Endpoints like Parallel's [Task API](/products/task) and Responses API are designed for production pipelines—supporting asynchronous batching, webhooks, arbitrary JSON output schemas, [data residency](/learn/data-residency) controls, and per-field [Basis citations](/blog/introducing-basis-with-calibrated-confidences) so software can consume results programmatically (see our comparison of [deep research APIs](/articles/best-deep-research-apis)).

## Production constraints: latency, cost, and verification

- **Asynchronous orchestration:** Because runs take minutes, never block an interactive HTTP request thread. Submit jobs asynchronously and deliver results via webhooks, queues, or polling.
- **Evidence auditing:** Long reports can still hide subtle misreads if you only check fluency. Spot-check primary citations and evaluate providers on multi-hop benchmarks like BrowseComp and DeepSearchQA ([Parallel Benchmarks](/benchmarks)).
- **Scope matching:** Match processor depth to question complexity—running an exhaustive 5-minute deep research tier on a fact answerable by a 200ms search call wastes both time and spend.

## Frequently asked questions

**Why does deep research take minutes instead of seconds?**

The system runs dozens of sequential and parallel retrieval hops, downloads and parses long primary documents (PDFs, filings, tables), cross-checks contradictions across sources, and verifies citations before drafting the final synthesis.

**Can deep research output structured JSON instead of a long prose report?**

Yes. API-native deep research systems like Parallel's [Task API](/products/task) accept an output JSON Schema and return typed fields paired with per-field URLs, excerpts, reasoning, and confidence scores.

**How do you evaluate a deep research system?**

Evaluate on multi-hop accuracy (whether every linked fact is right), citation faithfulness (whether cited URLs actually entail the claims), completeness across required fields, and cost/latency per completed task.

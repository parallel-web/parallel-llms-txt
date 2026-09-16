# Introducing the Parallel Responses API

Today we’re launching the [Parallel Responses API](https://docs.parallel.ai/responses-api/responses-quickstart), the newest addition to our Web Agent API suite. The Responses API is an OpenAI-compatible endpoint for agentic web research, ranging from simple fact-retrieval-style questions to deep research reports. It turns any question into a synthesized answer, grounded in the live web, in seconds.

---

![](https://cdn.sanity.io/images/5hzduz3y/production/3882f3ea9f178b59d83cd0aedd77c62a0783805a-1799x1080.png)

---

## High quality web research in seconds

Like the Task API, the Responses API returns synthesized answers to research or enrichment tasks with full citations and support for structured outputs. While Tasks are designed for asynchronous or background work, providing the best cost to quality ratio, the Responses API is purpose-built for latency sensitive use cases. It provides the same quality as the Task API but significantly faster.

---

| Responses | Task |
| --- | --- |
| low (5–10s, $10) | lite (10s – 60s, $5) |
| medium (15–20s, $50) | core (60s – 5min, $25) |
| high (30–60s, $250) | pro (2min – 10min, $100) |

---

## Use Responses as a web research subagent

One key use case we had in mind while building Responses was subagents. Increasingly, agent builders are handing off well-scoped work to specialized subagents rather than stretching a single context window across everything. Web research is the natural work to hand off: it's token-heavy, it parallelizes well, and the orchestrator doesn't need to see how an answer was found — just the answer. The Responses API is that subagent, available to your agent via a tool call.

```python
def web_research(query: str, effort: str = "low") -> dict:
   r = parallel.responses.create(
       model="parallel", input=query, reasoning={"effort": effort}
   )
   return {"answer": r.output_text}
```

---

Each `web_research` call is delegated to an autonomous researcher that runs its own multi-step searches, cross-checks sources, and returns a finished, cited answer — not raw results your agent has to read through. The division of labor pays off three ways:

- Context stays clean. Raw web results can run to tens of thousands of tokens on complex tasks. The orchestrator never sees them — each call returns just the answer, plus citations if you want them.
- Costs stay predictable. Orchestrators are usually the most capable models in the stack, which also makes them the most expensive place to process web content — every page pulled into context is billed at their rates, on every turn that follows. Research calls to the Responses API are a fixed price, however many pages the subagent reads.
- Research runs in parallel. Independent sub-questions fan out concurrently, so ten lookups take roughly the wall-clock time of one.

---

## OpenAI-compatible

The Responses API speaks the OpenAI Responses wire format. You can invoke Parallel’s Responses API using OpenAI’s Python or Typescript SDKs. Switching to Parallel is a 3-line diff:

![](https://cdn.sanity.io/images/5hzduz3y/production/c9921edc0b79749a21ffd14739434c4fc2bbf412-1284x856.png)

The Responses API supports three reasoning tiers which, per the OpenAI standard, are set through the `reasoning.effort` parameter: `low`, `medium`, `high`.

Furthermore, the Parallel Responses API has full support for [citations](https://docs.parallel.ai/responses-api/features/citations), [streaming via SSE](https://docs.parallel.ai/responses-api/features/streaming-events), and [stateful multi-turn conversations](https://docs.parallel.ai/responses-api/features/statefulness) through OpenAI’s response id parameter.

---

## Get started

The Responses API is available today.

- [Docs](https://docs.parallel.ai/responses-api/responses-quickstart)
- [Parallel CLI](https://docs.parallel.ai/integrations/cli)
- [Playground](https://platform.parallel.ai/play/responses)

Point your OpenAI SDK at `https://api.parallel.ai/v1`, set `model="parallel"`, and ask a research question.

```
Use curl to read parallel.ai/agents.md and perform the setup to install Parallel
```

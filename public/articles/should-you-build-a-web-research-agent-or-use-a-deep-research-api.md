# Should you build a web research agent or use a deep research API?

Build or integrate comes down to one question: is web research the capability your product sells, or an input to something else. This guide covers what a deep research API does, the nine components a home-built agent needs, the costs teams underestimate, a decision framework, and the hybrid path most builders should take.

If your moat is research quality and domain-specific reasoning, building makes sense. If your moat is workflow, UX, or vertical expertise, integrate an existing research stack rather than building one.

**Key takeaways**

- Building a production research agent requires at least nine distinct components, from search infrastructure to evaluation harnesses, and each adds ongoing maintenance cost.
- Deep research APIs like Parallel's Task API abstract that complexity into a single call with structured JSON, citations, and confidence scores.
- The practical choice depends on whether web research is your core moat or a commodity input to your product.
- A hybrid approach works best for most builders: use an API for search, extraction, and synthesis, then own orchestration, memory, and evaluation.
- Start with an API to validate your use case in days, then replace components as your requirements become clear.

## The build-vs-buy question developers face

You're building an AI agent that needs web research. Maybe it's a due diligence tool or a market intelligence platform. Before writing much code, you have to decide: do you wire together search APIs, extractors, rerankers, and LLM chains yourself, or do you call a deep research API and focus on the product layer above it?

A weekend prototype that chains a search API with an LLM feels close to production, which makes the research stack easy to underestimate. The gap between that prototype and a reliable, citation-backed, structured research pipeline is six months of engineering and a [full-time maintenance commitment](https://builder.aws.com/content/3An6w99vMTExrhqlMZiJ2YYtrkG/cost-to-build-an-ai-agent-a-complete-breakdown-guide).

## What a deep research API does

A _[deep research API](https://parallel.ai/articles/what-is-deep-research)_ accepts a complex question, plans sub-queries, searches the web, reasons across multiple sources, and returns a structured report with citations. That planning and cross-source reasoning is what separates it from a [search API](https://parallel.ai/articles/what-is-a-web-search-api).

A search API returns ranked links and snippets for a query. A deep research API takes a research objective, decomposes it into sub-queries, retrieves and extracts relevant pages, then resolves conflicts across sources and delivers structured JSON with per-field citations.

Several providers offer deep research capabilities today: OpenAI (deep research), Google (Gemini Deep Research), and Parallel ([Task API](https://parallel.ai/products/task)). Gemini Deep Research takes several minutes per report; Google's API docs say most tasks finish within 20 minutes. API-first providers like Parallel return results in seconds to minutes depending on complexity, returning structured JSON your application can parse.

Parallel's Task API follows a four-stage workflow: plan the research, search across a proprietary index of billions of pages, reason across sources, and deliver a structured report with per-field citations, reasoning traces, and confidence ratings through the **Basis** framework.

## What building your own research agent requires

A production research agent needs nine core components, and a missing one tends to cause a hard failure within weeks of launch.

1. **LLM planner.** Breaks complex questions into sub-queries, decides what to research next, and determines when evidence is sufficient. You'll evaluate frontier models and spend weeks tuning prompts for reliable query decomposition.
2. **Search layer.** Handles query reformulation, multiple search backends, freshness filtering, and deduplication. Most teams start with a single search API and discover they need two or three to cover edge cases.
3. **Browser and extractor.** Renders JavaScript-heavy pages, handles anti-bot protections, parses PDFs and tables, and extracts clean text from dynamic sites. Tools like [Playwright](https://playwright.dev/) or Browserbase handle rendering; you still need extraction logic.
4. **Reranker.** Filters and prioritizes results by relevance and source quality. Off-the-shelf options from [Cohere](https://cohere.com/rerank) or Jina handle the basics; domain-specific reranking requires custom training data.
5. **Memory and cache.** Stores intermediate findings, avoids redundant queries, and manages context windows. Without this layer, your agent re-searches the same ground on every sub-query.
6. **Citation engine.** Maps every claim in the final output back to a source URL and specific passage. Building reliable citation tracking across multiple retrieval steps is one of the harder engineering problems in the stack.
7. **Report synthesizer.** Combines findings from multiple sub-queries into coherent, structured output. Without it, your agent returns a pile of concatenated excerpts.
8. **Evaluation harness.** Measures accuracy against ground-truth datasets, catches regressions, and benchmarks against baselines. Tools like [LangSmith](https://www.langchain.com/langsmith) or [Braintrust](https://www.braintrust.dev/) provide scaffolding, but you still need domain-specific test sets.
9. **Observability stack.** Logging, cost tracking, latency monitoring, and error alerting. Without observability, you can't debug failures or control spend.

We built all nine layers to ship Parallel's Task API. In our experience, extraction failures and citation gaps cause more production incidents than LLM planning errors.

## The hidden costs most teams underestimate

Beyond the architecture, teams tend to underestimate five kinds of cost.

**Search quality is harder than it looks.** Raw search API results need query reformulation, iterative retrieval, freshness filters, and context compression before they're useful to an LLM. A single research question can require five to fifteen search calls with reformulated queries before the evidence is sufficient.

**Extraction pipelines require continuous maintenance.** Websites redesign, anti-bot systems change, and PDF formats vary across publishers. Teams that ship a working extractor in week one find themselves patching it every week after.

**Token costs compound fast.** A single research task can trigger dozens of LLM calls across planning, extraction, synthesis, and evaluation. Without budget controls, a complex query can run up a large token bill. [Simon Willison documented costs of $1.10 per query](https://til.simonwillison.net/llms/o4-mini-deep-research) for OpenAI's deep research, and that excludes the infrastructure to run it at scale in production.

**Research planning degrades with model updates.** Deciding what to search next, when evidence is sufficient, and how to resolve conflicting sources takes careful prompt engineering, and model updates shift planning behavior: what worked with GPT-5.6 may fail with GPT-6.

**Evaluation requires ongoing investment.** You need ground-truth datasets, automated regression tests, and human review workflows to maintain accuracy over time. Every model update and data source change demands new test sets and regression checks.

## What a deep research API gives you out of the box

A deep research API covers those nine components and most of those costs behind one integration.

**One API call replaces your orchestration stack.** You send a research objective and an output schema. The API handles planning, search, extraction, reranking, synthesis, and citation mapping, and returns structured JSON.

**Built-in search infrastructure.** Parallel maintains a [proprietary web-scale index](https://parallel.ai/products/search) with billions of pages and millions added daily. You skip the multi-provider search integration, freshness management, and deduplication.

**Structured outputs with citations.** Every field in the response includes source attribution. Parallel's Basis framework adds reasoning traces and a confidence rating (low, medium, or high) per field, so your application can surface provenance and flag low-confidence claims.

**Processor tiers for cost control.** You match compute to task complexity. A simple enrichment lookup runs on the Lite tier at $5 per 1,000 runs. A comprehensive competitive analysis runs on Pro at $100 per 1,000 runs.

**Production-ready delivery.** Async polling, server-sent events (SSE) streaming, and webhooks handle long-running research tasks without blocking your application.

**Benchmark-verified accuracy.** On [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (August 2026), Parallel's Task API Pro scores 83% on DeepSearchQA at $100 per 1,000 runs, where Gemini 3.1 Pro (high) scored 77% at $123.90 per 1,000. On BrowseComp, Core scores 91% at $25 per 1,000 runs and Ultra4x 94% at $1,200, against the 29.2% of problems OpenAI's human trainers solved.

A deep research call in practice:

```python
import requests

api_key = "your_parallel_api_key"

response = requests.post(
    "https://api.parallel.ai/v1/tasks",
    headers={"Authorization": f"Bearer {api_key}"},
    json={
        "question": "What are the key technical differences between vector databases and traditional databases for RAG applications?",
        "processor": "pro",
        "output_schema": {
            "type": "object",
            "properties": {
                "summary": {"type": "string"},
                "findings": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "sources": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    }
)

task = response.json()
print(task["id"])  # Use this ID to poll for results
```

That single call triggers the full research pipeline: query planning, web search, extraction, reasoning, synthesis, and citation mapping. Parallel returns structured JSON matching your schema, with per-field citations attached.

## A decision framework for your team

The build-vs-buy decision comes down to a few questions about your team.

| Factor | Use an API | Build your own |
| --- | --- | --- |
| Core moat | Workflow, UX, or vertical expertise | Research quality and domain-specific reasoning |
| Timeline | Production this quarter | 6+ month investment acceptable |
| Team size | Small to mid-size engineering team | Dedicated infrastructure team available |
| Stage | Validating a product concept | Proven product-market fit with known research requirements |
| Citation needs | Enterprise-grade citations needed now | Custom citation format or proprietary ranking required |
| Scale | Standard API volume | Massive scale with custom memory and evaluation systems |

**Common scenarios mapped:**

- **Due diligence tools, market research platforms, sales intelligence, analyst copilots:** If you're building for workflow and domain expertise, use an API.
- **Vertical AI companies, scientific research agents, proprietary intelligence platforms:** If research quality is your core value proposition, build custom components where you need control and use APIs for the rest.

If you have a dedicated infrastructure team and research quality is your core moat, invest in custom components. If research quality is not your core moat, starting with an API saves months and lets you replace components as your requirements sharpen.

## The middle path most teams should take

For most teams, the cleanest architecture pairs a deep research API with custom orchestration: the API handles search, extraction, and synthesis, and you build the product layer above it.

In practice, that means Parallel's Task API for research and your own orchestration layer, memory system, evaluation harness, and user interface. You get [production-quality research in days](https://parallel.ai/blog/case-study-profound) instead of months.

The stack looks like this:

- **Research layer:** Parallel Task API (search, extraction, deep research, and citations)
- **Orchestration:** Your own agent framework or a tool like [LangGraph](https://www.langchain.com/langgraph)
- **Memory and persistence:** Your own database and context management
- **Evaluation:** Your own ground-truth datasets and regression tests
- **User interface:** Your own product experience

Wrap the Task API in a custom orchestration loop:

```python
import requests
import time

api_key = "your_parallel_api_key"

def run_research(question, schema, processor="core"):
    """Run a deep research task and poll for results."""
    # Create the task
    create_response = requests.post(
        "https://api.parallel.ai/v1/tasks",
        headers={"Authorization": f"Bearer {api_key}"},
        json={
            "question": question,
            "processor": processor,
            "output_schema": schema
        }
    )
    task_id = create_response.json()["id"]

    # Poll for completion
    while True:
        status_response = requests.get(
            f"https://api.parallel.ai/v1/tasks/{task_id}",
            headers={"Authorization": f"Bearer {api_key}"}
        )
        result = status_response.json()
        if result["status"] == "completed":
            return result["output"]
        time.sleep(5)

# Use in your orchestration layer
findings = run_research(
    question="Analyze the competitive landscape for AI code review tools",
    schema={
        "type": "object",
        "properties": {
            "market_overview": {"type": "string"},
            "competitors": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "strengths": {"type": "array", "items": {"type": "string"}},
                        "weaknesses": {"type": "array", "items": {"type": "string"}}
                    }
                }
            },
            "sources": {"type": "array", "items": {"type": "string"}}
        }
    },
    processor="pro"
)

# Feed results into your own memory, evaluation, and UI layers
```

As your requirements become clear, you can replace components in a deliberate order. Replace report synthesis first, since you know your output format best. Planning comes next, because you understand your domain's query patterns, then search if you need proprietary sources, and extraction last if you have format-specific needs.

For most builders in 2026, the moat lives in workflow integration, proprietary data, memory, and evaluation, so buying the retrieval layer frees your engineers to work on those.

## Getting started with Parallel's Task API

Getting started takes five steps.

**Step 1: Get your API key.** Sign up at [platform.parallel.ai](https://platform.parallel.ai) and generate an API key.

**Step 2: Choose your processor tier.** Match the tier to your task complexity:

| Tier | Price | Best for |
| --- | --- | --- |
| Lite | $5 per 1,000 runs | Simple lookups and enrichment tasks |
| Core | $25 per 1,000 runs | Standard research with multiple sources |
| Pro | $100 per 1,000 runs | Comprehensive analysis with high accuracy |
| Ultra | $300 per 1,000 runs | Deep, multi-source synthesis for complex questions |

**Step 3: Define your output schema.** The Task API returns structured JSON matching the schema you provide. Define the exact fields your application needs.

**Step 4: Send your first task.**

```python
import requests

api_key = "your_parallel_api_key"

response = requests.post(
    "https://api.parallel.ai/v1/tasks",
    headers={"Authorization": f"Bearer {api_key}"},
    json={
        "question": "What are the leading deep research API providers in 2026, and how do they compare on accuracy, latency, and pricing?",
        "processor": "pro",
        "output_schema": {
            "type": "object",
            "properties": {
                "summary": {"type": "string"},
                "providers": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "accuracy_notes": {"type": "string"},
                            "pricing": {"type": "string"},
                            "latency": {"type": "string"}
                        }
                    }
                },
                "recommendation": {"type": "string"},
                "sources": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    }
)

task = response.json()
print(f"Task created: {task['id']}")
print(f"Status: {task['status']}")
```

**Step 5: Scale with Task Groups and webhooks.** For batch processing, use [Task Groups](https://parallel.ai/blog/parallel-task-api) to submit multiple research tasks in a single call. Configure webhooks to receive results as they complete, instead of polling.

Responses include Basis citations by default: per-field source URLs, reasoning traces, and confidence scores. Your application can surface provenance to end users and flag claims that need human review.

## FAQs

### What is the difference between a search API and a deep research API?

A search API returns ranked links and snippets for a single query. A deep research API plans a multi-step investigation, reasons across dozens of sources, and returns synthesized findings with per-field citations.

### How much does a deep research API cost?

Costs vary by provider and task complexity. Parallel's Task API ranges from [$5 to $2,400 per 1,000 runs](https://parallel.ai/pricing) depending on processor tier. A single OpenAI deep research query cost Simon Willison $1.10 in token and search fees.

### Can I use a deep research API with my existing agent framework?

Yes. Deep research APIs return structured JSON that any framework can consume. Parallel also offers an [MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp) for direct integration with agent harnesses like Claude Code, Cursor, and OpenAI Agents SDK.

### How accurate are deep research APIs compared to human researchers?

Parallel's Task API scores up to 94% on the BrowseComp benchmark (Ultra4x, per parallel.ai/benchmarks); OpenAI's human trainers solved 29.2% of BrowseComp problems. On DeepSearchQA, the Pro tier scores 83% at $100 per 1,000 runs.

Get your API key at platform.parallel.ai and run your first research task in under an hour.

[Start Building](https://docs.parallel.ai/home)

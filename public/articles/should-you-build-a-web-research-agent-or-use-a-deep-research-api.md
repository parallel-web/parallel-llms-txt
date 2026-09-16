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

You're building an AI agent that needs web research. Maybe it's a due diligence tool or a market intelligence platform. At some point, you open a blank file and face a question: do you wire together search APIs, extractors, rerankers, and LLM chains yourself, or do you call a deep research API and focus on the product layer above it?

The question matters because the research stack is deceptive. A weekend prototype that chains a search API with an LLM feels close to production. The gap between that prototype and a reliable, citation-backed, structured research pipeline is six months of engineering and a [full-time maintenance commitment](https://builder.aws.com/content/3An6w99vMTExrhqlMZiJ2YYtrkG/cost-to-build-an-ai-agent-a-complete-breakdown-guide).

## What a deep research API does

A _[deep research API](https://parallel.ai/articles/what-is-deep-research)_ accepts a complex question, plans sub-queries, searches the web, reasons across multiple sources, and returns a structured report with citations. The critical difference from a [search API](https://parallel.ai/articles/what-is-a-web-search-api): the deep research API plans sub-queries, reasons across multiple sources, and returns synthesized findings.

A search API returns ranked links and snippets. You send a query, you get ten blue links. A deep research API runs an autonomous investigation. You send a research objective, and the API decomposes it into sub-queries, retrieves and extracts relevant pages, then resolves conflicts across sources and delivers structured JSON with per-field citations.

Several providers offer deep research capabilities today: OpenAI (through o3/o4-mini deep research models), Google (Gemini Deep Research), and Parallel ([Task API](https://parallel.ai/products/task)). Consumer-facing tools like Gemini Deep Research take 10 to 30 minutes per query. API-first providers like Parallel return results in seconds to minutes depending on complexity, returning structured JSON your application can parse.

Parallel's Task API follows a four-stage workflow: plan the research, search across a proprietary index of billions of pages, reason across sources, and deliver a structured report with per-field citations, reasoning traces, and calibrated confidence scores through the **Basis** framework.

## What building your own research agent requires

A production research agent consists of nine core components. Missing any one surfaces a hard failure within weeks of launch.

1. **LLM planner.** Breaks complex questions into sub-queries, decides what to research next, and determines when evidence is sufficient. You'll evaluate frontier models and spend weeks tuning prompts for reliable query decomposition.
2. **Search layer.** Handles query reformulation, multiple search backends, freshness filtering, and deduplication. Most teams start with a single search API and discover they need two or three to cover edge cases.
3. **Browser and extractor.** Renders JavaScript-heavy pages, handles anti-bot protections, parses PDFs and tables, and extracts clean text from dynamic sites. Tools like [Playwright](https://playwright.dev/) or Browserbase handle rendering; you still need extraction logic.
4. **Reranker.** Filters and prioritizes results by relevance and source quality. Off-the-shelf options from [Cohere](https://cohere.com/rerank) or Jina handle the basics. Domain-specific reranking requires custom training data.
5. **Memory and cache.** Stores intermediate findings, avoids redundant queries, and manages context windows. Without this layer, your agent re-searches the same ground on every sub-query.
6. **Citation engine.** Maps every claim in the final output back to a source URL and specific passage. Building reliable citation tracking across multiple retrieval steps is one of the harder engineering problems in the stack.
7. **Report synthesizer.** Combines findings from multiple sub-queries into coherent, structured output. This component determines whether your agent produces a useful report or a pile of concatenated excerpts.
8. **Evaluation harness.** Measures accuracy against ground-truth datasets, catches regressions, and benchmarks against baselines. Tools like [LangSmith](https://www.langchain.com/langsmith) or [Braintrust](https://www.braintrust.dev/) provide scaffolding, but you still need domain-specific test sets.
9. **Observability stack.** Logging, cost tracking, latency monitoring, and error alerting. Without observability, you can't debug failures or control spend.

We built all nine layers to ship Parallel's Task API. The experience showed us that extraction failures and citation gaps cause more production incidents than LLM planning errors.

## The hidden costs most teams underestimate

Beyond the architecture, five cost categories will catch you off guard.

**Search quality is harder than it looks.** Raw search API results need query reformulation, iterative retrieval, freshness filters, and context compression before they're useful to an LLM. A single research question can require five to fifteen search calls with reformulated queries before the evidence is sufficient.

**Extraction pipelines require continuous maintenance.** Websites redesign, anti-bot systems evolve, PDF formats vary across publishers. Your extraction pipeline needs continuous maintenance. Teams that ship a working extractor in week one find themselves patching it every week after.

**Token costs compound fast.** A single research task can trigger dozens of LLM calls across planning, extraction, synthesis, and evaluation. Without budget controls, a complex query can cost $5 to $50 in tokens alone. [Simon Willison documented costs of $1.10 per query](https://til.simonwillison.net/llms/o4-mini-deep-research) for OpenAI's deep research, and that excludes the infrastructure to run it at scale in production.

**Research planning degrades with model updates.** Deciding what to search next, when evidence is sufficient, and how to resolve conflicting sources requires sophisticated prompt engineering. Model updates shift planning behavior. What worked with GPT-4 may fail with GPT-5.

**Evaluation requires ongoing investment.** You need ground-truth datasets, automated regression tests, and human review workflows to maintain accuracy over time. Every model update and data source change demands new test sets and regression checks.

## What a deep research API gives you out of the box

A deep research API compresses those nine components and five cost categories into a single integration point.

**One API call replaces your orchestration stack.** You send a research objective and an output schema. The API handles planning, search, extraction, reranking, synthesis, and citation mapping. You get structured JSON back.

**Built-in search infrastructure.** Parallel maintains a [proprietary web-scale index](https://parallel.ai/products/search) with billions of pages and millions added daily. You skip the multi-provider search integration, freshness management, and deduplication.

**Structured outputs with citations.** Every field in the response includes source attribution. Parallel's Basis framework adds reasoning traces and calibrated confidence scores per field, so your application can surface provenance and flag low-confidence claims.

**Processor tiers for cost control.** You match compute to task complexity. A simple enrichment lookup runs on the Lite tier at $5 per 1,000 runs. A comprehensive competitive analysis runs on Pro at $100 per 1,000 runs. You don't pay deep research prices for shallow questions.

**Production-ready delivery.** Async polling, server-sent events (SSE) streaming, and webhooks handle long-running research tasks without blocking your application.

**Benchmark-verified accuracy.** Parallel's Task API Pro achieves [62% accuracy on DeepSearchQA](https://parallel.ai/blog/deep-research) at $100 per 1,000 runs. Gemini Deep Research scores lower at $2,500 per 1,000 runs. On BrowseComp, the Task API reaches [58% accuracy](https://parallel.ai/blog/introducing-parallel) compared to a 25% human baseline.

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

The build-vs-buy decision maps to a small set of questions about your team's context.

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

The decision table above makes the tradeoffs explicit. If you have a dedicated infrastructure team and research quality is your core moat, invest in custom components. If research quality is not your core moat, starting with an API saves months and lets you replace components as your requirements sharpen.

## The middle path most teams should take

The cleanest architecture combines a deep research API with custom orchestration. This approach lets the API handle search, extraction, and synthesis while you build the product layer above it.

Start with Parallel's Task API for search, extraction, and synthesis. Build your own orchestration layer, memory system, evaluation harness, and user interface. This approach gives you [production-quality research in days](https://parallel.ai/blog/case-study-profound) instead of months.

The stack has five distinct layers:

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

As your requirements become clear, you can replace components in a deliberate order. Replace report synthesis first (you know your output format best). Then replace planning (you understand your domain's query patterns). Then search (if you need proprietary sources). Then extraction (if you have format-specific needs). Each replacement is a scoped investment with known tradeoffs.

For most builders in 2026, the moat lives in workflow integration, proprietary data, memory, and evaluation, which means purchasing the retrieval layer frees capacity for higher-value work.

## Getting started with Parallel's Task API

Starting with an API takes five steps.

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

Costs vary by provider and task complexity. Parallel's Task API ranges from [$5 to $2,400 per 1,000 runs](https://parallel.ai/pricing) depending on processor tier. A single OpenAI deep research query can cost $1 to $5 in token and search fees.

### Can I use a deep research API with my existing agent framework?

Yes. Deep research APIs return structured JSON that integrates with any framework. Parallel also offers an [MCP server](https://parallel.ai/blog/search-api-benchmark) for direct integration with agent harnesses like Claude Code, Cursor, and OpenAI Agents SDK.

### How accurate are deep research APIs compared to human researchers?

Parallel's Task API reaches 58% accuracy on the BrowseComp benchmark, compared to a 25% human baseline. On DeepSearchQA, the Pro tier achieves 62% accuracy at $100 per 1,000 runs.

Get your API key at platform.parallel.ai and run your first research task in under an hour.

[Start Building](https://docs.parallel.ai/home)

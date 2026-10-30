# Exa vs. Parallel: a platform comparison for AI developers

Exa and Parallel both build search infrastructure for agents, with SDKs, structured outputs, and agent-framework integrations, and their product suites diverge past the search endpoint. This comparison covers search, content extraction, deep research and structured output, monitoring, entity discovery, developer experience, pricing, and enterprise compliance.

## **The product suites**

Exa organizes its platform around search as the center of gravity. You get:

- Search API (six speed/quality modes, from ~200ms to 60s)
- Contents API (extracting clean text from URLs)
- Find Similar API (discovering related pages)
- Answer API (generates grounded responses with citations)
- Agent API (asynchronous deep research runs with structured outputs, launched June 2026; the older Research API was retired May 1, 2026 in favor of /search with type: "deep-reasoning")

Exa also offers Monitors for recurring searches delivered via webhook and Websets for building curated collections of web sources through a dashboard or API.

Parallel organizes its platform around a broader set of specialized tools:

- Search API (synchronous lookups, from ~200ms in Turbo mode to ~3s in Advanced)
- Extract API (pulls clean markdown from JavaScript-heavy pages and PDFs)
- Task API (asynchronous deep research and enrichment with structured output schemas)
- Responses API (OpenAI-compatible endpoint for agentic web research, returning synthesized, cited answers in seconds)
- FindAll API (discovers entities matching your criteria across the web)
- Entity Search API (real-time company search with structured results in seconds)
- Monitor API (tracks changes over time)

Both cover search and extraction. Parallel goes wider with dedicated endpoints for deep research, entity discovery, web-grounded answers, and monitoring. Exa goes deeper on search itself with more granular speed/quality controls and neural retrieval.

## **Search**

Exa's Search API offers six modes:

- Instant (~200ms)
- Fast (~450ms)
- Auto (~1s, default)
- Deep-lite (~2s to 10s)
- Deep (5s to 60s)
- Deep-reasoning (10s to 60s)

Instant, Fast, and Auto return ranked results with token-efficient highlights that condense full pages into the most relevant snippets. Deep-lite provides lightweight synthesized output at moderate latency. Deep runs multi-step reasoning and can return structured JSON via an output_schema. Deep-reasoning adds stronger reasoning for harder research tasks.

Exa also supports neural/embeddings-based search, giving it an advantage on semantic queries where keyword overlap falls short. You can filter results by category (company, people, research paper, news, personal site, financial report) to tap Exa's specialized indexes.

Parallel's Search API takes a natural-language objective as input and returns ranked URLs with compressed, LLM-optimized excerpts. You can tune excerpt length with max_chars_per_result and max_chars_total. Four modes are available: Turbo (~200ms median latency, for latency-sensitive, high-volume workloads), Fast (under a second, the best fit for most agent workloads), Basic (~1s, deeper excerpts per call), and Advanced (~3s, the default, for the highest-quality multi-hop results). A Source Policy lets you include/exclude specific domains and set a freshness date, and a Fetch Policy controls whether results come from the index or a live crawl.

Both produce compressed outputs (Exa calls them highlights; Parallel calls them excerpts) that reduce what your model needs to process.

Artificial Analysis’s latest Search Index data is dated September 22, 2026. Parallel Advanced scores 75 and Exa Auto 74; Parallel Basic scores 73 and Exa Instant 68. Parallel Advanced records $47.93 in search cost per 1,000 benchmark tasks versus $65.57 for Exa Auto, and Parallel Basic records $45.14 versus $72.23 for Exa Instant. These are search costs only, per 1,000 benchmark tasks, not prices per 1,000 API calls. Exa Instant completes tasks faster than Parallel Basic (18.7 versus 26.1 seconds), and Parallel Advanced takes longer than Exa Auto (41.2 versus 31.6 seconds). In AA’s September 8 data, Parallel Fast scored 73 at $8.41 and 15.8 seconds per task. Neither product leads the leaderboard: Perplexity Search (medium) is first at 80. [Artificial Analysis leaderboard](https://artificialanalysis.ai/agents/search-api)

Openbenchmarks’ independent boards split the two by task. On [multi-turn company search](https://openbenchmarks.com/multi-turn-company-search) (September 2026), Parallel Basic leads search-only at 50.2 F1 against Exa Deep’s 45.5, and Exa Deep leads once the agent can fetch pages, 49.2 against Parallel Advanced’s 43.8. On [company news lookups](https://openbenchmarks.com/company-news), Exa Fast is the most accurate API at 99.3% against Parallel Basic’s 93.3% and Fast’s 86.0%, while Parallel Fast costs $1.16 per 1,000 correct answers against about $7 for Exa’s fast modes.

### Finance benchmarks

We published four finance benchmarks with [Parallel for Finance](/blog/parallel-for-finance) in October 2026. Each search API runs inside the same agent loop with the same answer model and judge, so the search layer is the only variable, and cost per 1,000 questions covers the model's tokens plus every search and fetch call at list price. We make Parallel and ran these evaluations; the methodology is on [parallel.ai/benchmarks](/benchmarks).

| Benchmark | Exa Auto | Parallel Advanced | Parallel Fast |
| --- | --- | --- | --- |
| FinSearchComp T3 (accuracy) | 51.4% at $226.20 | 57.4% at $161.10 | 53.7% at $15.20 |
| FinSearchComp T2 (accuracy) | 77.9% at $69.90 | 79.9% at $35.10 | 77.5% at $3.30 |
| FrontierFinance (rubric score) | 47.2 at $376.30 | 46.8 at $234.20 | 46.0 at $201.50 |
| PWS-Finance (accuracy) | 75.9% at $197.60 | 84.3% at $125.50 | 83.0% at $110.30 |

The widest gap is on FinSearchComp T3, the tier of complex historical investigations, where Advanced leads Exa by 6.0 points at 1.4x lower cost. On PWS-Finance, our private set of 174 held-out questions, Advanced leads by 8.4 points. Exa posts the top FrontierFinance score, 0.4 ahead of Advanced in a single run, which is close enough to call a tie; Advanced costs 38% less there. On T2 the two are 2 points apart, so cost decides it: $35.10 against $69.90 per 1,000 questions. Every cell uses GPT-6 Sol as the answer model except Parallel Fast on FinSearchComp, which runs with GPT-6 Luna. The [FinSearchComp explainer](/articles/finsearchcomp-benchmark) and our guide to the [best search API for financial AI agents](/articles/best-search-api-for-financial-ai-agents) cover the benchmarks in detail.

## **Content extraction**

Exa's Contents API returns clean text, highlights, and LLM-generated summaries from any URL. It handles JavaScript-rendered pages, PDFs, and complex layouts. You can crawl linked subpages in a single request, control freshness with maxAgeHours, and adjust verbosity levels (compact, standard, full). Section-level filtering lets you include or exclude specific page sections like navigation, sidebars, or footers.

Parallel's Extract API converts URLs into clean markdown with focused excerpts aligned to your objective. It also handles JS-heavy pages and PDFs. You can request full page content or targeted excerpts.

Both solve the same problem. Exa adds subpage crawling, LLM summaries, and granular section filtering. Parallel aligns extraction to a research objective to point the LLMs towards specific information to retrieve.

## **Deep research and structured output**

Exa handles deep research through its Search API's deep, deep-lite, and deep-reasoning modes. You pass an output_schema and get structured JSON back with grounding and citations. The /answer endpoint generates grounded answers with streaming support. Exa also offered a standalone Research API (/research/v1) with three models (exa-research-fast, exa-research, exa-research-pro) for asynchronous multi-step research tasks, but retired it on May 1, 2026, moving its functionality into /search with type: "deep-reasoning". For asynchronous research runs, Exa now offers its Agent API, launched in June 2026.

Parallel built a dedicated Task API for deep research. You define an output schema with typed fields, pick a Processor tier (Lite through Ultra8x), and get back structured results with a Basis framework attached to each field:

- Citations linking to source URLs
- Reasoning explaining how the answer was derived
- Relevant excerpts from those sources
- A calibrated confidence score

Processor tiers let you trade cost and latency for depth. A Lite task runs in 10 seconds to 2 minutes. An Ultra8x task can take up to 2 hours for the most complex research.

Exa consolidates deep research into its search endpoint's deep modes and its Agent API. Parallel separates deep research into its own API with more granular control over how much compute you're willing to spend per task.

## **Monitoring**

Both platforms offer monitoring for recurring web searches.

Exa's Monitors run searches on a configurable schedule (durations like "1h", "6h", "1d", "7d") and deliver deduplicated results to a webhook. Each run uses date-based filtering and semantic deduplication to surface only new developments. Exa prices Monitors at **$15 per 1,000 requests**.

Parallel's Monitor API works similarly, with configurable frequency (hourly, daily, weekly) and per-execution pricing at **$3 per 1,000 executions**. Both let agents watch for changes without polling.

## **Entity discovery**

Parallel handles entity discovery with the FindAll API, which Exa approaches differently. You describe the type of entity you're looking for (companies, people, products, events, locations, legal cases, academic papers) and FindAll searches the web to build a list of matches. You can add enrichments to each match using Task API processors. Pricing uses a fixed cost plus per-match model, scaling with the generator tier you choose.

Exa's Websets feature covers adjacent ground. You can enrich items in a Webset with additional structured data, and the Websets dashboard provides a visual interface for managing collections, while the API supports the same workflows programmatically.

### **Workflow**

FindAll runs a three-stage pipeline per request: generate candidates from a web index, evaluate each against explicit match conditions, then optionally enrich matches. Candidates flow through generated, matched, or unmatched statuses. It's stateless per run; you get back a structured result set, not a persistent container.

Websets are event-driven and container-based. You create a Webset (a persistent container), and search agents discover items into it over time. Each item gets verified against your criteria with reasoning and references. You can run additional searches on the same Webset and export to CSV. Webhooks fire as items are found and enriched, so you can process results as they arrive.

### **Verification**

FindAll uses explicit match conditions: named, described rules that each candidate is evaluated against using multi-hop reasoning across web sources. Matched items get the full Basis framework: citations, reasoning, excerpts, and calibrated confidence scores.

Websets verifies each discovered item against your search criteria and provides reasoning and references explaining why it matched. Verification is baked into the search process; items only appear in your Webset if they pass.

### **Entity breadth**

Both handle companies and people. Parallel explicitly supports a broader range: events, locations, real estate properties, products, legal cases, and academic papers. Exa supports companies, people, research papers, news, personal sites, and financial reports through its category system, with a general framing of "any entity on the web."

## **Developer experience**

Both platforms ship Python and TypeScript SDKs. Parallel's setup:

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="turbo",
)
```

Both integrate with LangChain, offer MCP server support, and work with popular agent frameworks (CrewAI, LlamaIndex, Vercel AI SDK). Exa also offers OpenAI SDK compatibility for its Answer API and Research models (via /chat/completions and the Responses API), plus integrations with Google ADK, Google Sheets, Snowflake, Browserbase, and ElevenLabs. Parallel's Responses API is fully OpenAI SDK-compatible, so you can swap the base URL and API key from an existing OpenAI integration and set model="parallel".

## **Pricing**

Exa charges per request:

| Product | Price |
| --- | --- |
| Search | $7 per 1,000 requests (up to 10 results with contents included) |
| Deep Search | $12 per 1,000 requests |
| Deep-Reasoning Search | $15 per 1,000 requests |
| Contents (standalone) | $1 per 1,000 pages |
| Answer | $5 per 1,000 requests |
| Monitors | $15 per 1,000 requests |
| Additional results beyond 10 | $1 per 1,000 |
| AI page summaries | $1 per 1,000 pages |

Rate limits default to 10 QPS for search, findSimilar, and answer, and 100 QPS for contents. Exa's free tier gives you $10 in credits every month, plus a one-time $10 onboarding bonus.

Parallel charges per request with pricing tied to the product and tier:

| Product | Price |
| --- | --- |
| Search (Turbo) | $1 per 1,000 requests (~200ms median latency, 10 results included) |
| Search (Basic and Advanced) | $5 per 1,000 requests (10 results included) |
| Extract | $1 per 1,000 URLs |
| Task API | $5/1K (Lite) to $2,400/1K (Ultra8x) |
| Responses API | From $10/1K (low reasoning effort) |
| Monitor | $3 per 1,000 executions |
| FindAll | Fixed cost plus $0.03 to $1.00 per match depending on tier |

Rate limits are higher: 600/min for Search and Extract, 2,000/min for Tasks, 300/min for Monitor. Parallel offers $5 in free credits every month, applied automatically: enough for up to 5,000 Turbo search requests monthly.

_Check official documentation for current pricing._

## **Enterprise and compliance**

Exa offers Zero Data Retention on enterprise plans, along with custom rate limits, SLAs, MSAs, custom indexes, tailored moderation, and 1:1 onboarding support.

Parallel is SOC 2 Type 2 certified and offers a Data Processing Addendum. Under the standard [Customer Terms](https://parallel.ai/customer-terms), Parallel may use inputs and outputs, not linked to any individual, to train and improve the models behind its services. Enterprise plans with Zero Data Retention (ZDR) exclude that use. The platform maintains a public status page and trust center. Custom rate limits and enterprise plans are available.

## **When to use each**

Choose Exa when its retrieval options, category filters, or persistent Websets collections fit the workflow you want to build. Its search variants trade quality, cost, and latency. Evaluate the specific variant you intend to use: neither an advertised request latency nor one benchmark establishes a universal speed advantage. [Independent methodology](https://artificialanalysis.ai/methodology/search-api)

Choose Parallel when you need low-cost retrieval alongside structured research, database enrichment, entity discovery, and monitoring. Research Basis lets you inspect the supporting evidence for Task output fields. Search starts at $1 per 1,000 requests in Turbo or Fast, while Monitor costs $3 per 1,000 executions on Lite or $10 on Base. Choose the mode and processor against the accuracy and elapsed time your application requires. [Parallel pricing](https://docs.parallel.ai/getting-started/pricing)

Evaluate both providers on your own questions. Keep the answer model and harness fixed for a retrieval comparison, test relevant search variants, and grade final answers and source support. Include model tokens, extraction, retries, and failed requests in cost and latency measurements. Compare managed research products separately from retrieval tools. [How to evaluate Parallel Search](https://docs.parallel.ai/search/evaluating-search)

**Related reading: **[Switching from Exa to Parallel](https://parallel.ai/articles/exa-to-parallel-search-api) / [Tavily vs. Parallel](https://parallel.ai/compare/tavily-vs-parallel) / [Linkup vs. Parallel](https://parallel.ai/articles/linkup-vs-parallel).

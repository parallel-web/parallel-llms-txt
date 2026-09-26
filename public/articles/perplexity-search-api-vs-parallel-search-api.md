# Perplexity Search API vs. Parallel Search API: a head-to-head on the search layer

Perplexity's Search API is its raw retrieval endpoint, and with Sonar retiring on September 27, 2026, it sits beside the new Agent API as the Perplexity product that maps most directly onto Parallel's Search API. Both now sell a $1 tier and a $5 tier. This guide covers the parameter surfaces, result depth, pricing, latency and throughput, current benchmarks, the surrounding platforms, and compliance.

## **Two endpoints doing the same job**

Perplexity's POST /search returns a ranked results array where each entry carries a title, a URL, a snippet, and optional date and last_updated fields. The snippet is content pulled from the result page rather than a search engine's description line, and how much of it you get is a parameter you control. A search_type field picks standard web search (the default), [Fast Search](https://docs.perplexity.ai/docs/search/fast-search), which Perplexity recommends for tool calls inside agent loops, or people search.

Parallel's Search API takes a natural-language objective, optionally alongside explicit search queries, and returns ranked URLs with excerpts drawn from the page bodies and selected against that objective. Four modes set the latency and depth: Turbo at ~200ms and $1 per 1,000 requests, Fast at ~700ms and the same $1 per 1,000, Basic at ~1s and $5 per 1,000, and Advanced at ~3s and $5 per 1,000, which is the API default when no mode is set.

The main input difference is that Perplexity takes queries, while Parallel takes an objective that the retrieval is steered toward. Both accept multiple query strings in a single call. Perplexity's query field accepts an array, and Parallel's search_queries lets you supply variants alongside the objective.

## **The parameter surface**

The controls line up closely enough that porting between them is mostly renaming.

Perplexity gives you search_context_size at low, medium, or high (defaulting to high) for how much content comes back per page, or finer control through max_tokens across all results and max_tokens_per_page for each one. You can filter with search_domain_filter (up to 20 domains), search_language_filter (up to 20 ISO 639-1 codes), a country code, and last_updated_after_filter and last_updated_before_filter for recency.

Parallel gives you max_chars_per_result and max_chars_total for the same content budget, a Source Policy for domain inclusion, exclusion, and a freshness date, and a Fetch Policy that decides whether results come from the index or a live crawl. That last one has no Perplexity equivalent and matters when an agent needs a page that changed in the last few minutes.

Perplexity's language filter is the cleaner instrument if you work across locales; Parallel has no per-request language parameter, only a location setting under advanced settings, and turbo mode handles English and Japanese queries only.

## **Result depth**

Perplexity's max_results defaults to 10 and caps at 20 for both standard and Fast Search; only people search goes higher, to 50. Check that ceiling against your use case first: if you're running broad recall sweeps that want 50 or 100 sources per query, you'll need a different product.

Parallel includes 10 results and excerpts in the base price and sells additional results at $1 per 1,000 results, so depth is a cost decision rather than a hard limit. For the common case of ten results per call, the two behave identically.

## **Pricing**

Perplexity's Search API is a flat **$5 per 1,000 requests** for standard web search and **$1 per 1,000** with [Fast Search](https://docs.perplexity.ai/docs/getting-started/pricing), with no token charges layered on top, and a multi-query request bills as one request. That simplicity is a genuine virtue, and a contrast with the Agent API, where model tokens and every tool call the agent makes add up.

Parallel is **$1 per 1,000 requests** in Turbo or Fast and $5 per 1,000 in Basic and Advanced. At ten results per call the two price ladders now match: Perplexity Fast Search lines up with Parallel's Turbo and Fast, and standard Perplexity search with Basic and Advanced. So the choice turns on result depth, latency, and accuracy per dollar rather than list price.

Parallel applies $5 in free credits every month, automatically, which covers up to 5,000 searches in Turbo or Fast, or 1,000 on the higher modes.

_Note: For the latest pricing, always check official documentation._

## **Latency and throughput**

Parallel documents latencies per mode: roughly 200ms for Turbo, ~700ms for Fast, 1 second for Basic, and 3 seconds for Advanced. Its default rate limit is 600 requests per minute for Search and Extract, with GET polling excluded and custom limits on enterprise plans.

Perplexity doesn't publish a latency figure for either search type, but it does publish a [Search API rate limit](https://docs.perplexity.ai/docs/admin/rate-limits-usage-tiers): 50 query units per second on every usage tier, with a burst of 50, where each query in a multi-query request uses one unit. That's about 3,000 single-query requests per minute, well above Parallel's 600 default. [Openbenchmarks' independent speed boards](https://openbenchmarks.com/web-search/fastest-search-api) (September 2026) supply a latency number: Perplexity's low context setting measured 1.38s mean on factual lookup against 348ms for Parallel turbo, though on multi-hop search with fetch Perplexity's high setting came out ahead of turbo once time is divided by answer quality.

## **Accuracy on current benchmarks**

We run Perplexity's Search API against ours inside the same agent on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026), at two tiers: a GPT-5.6 Sol agent (frontier) with Parallel Basic or Advanced, and a GPT-5.6 Luna agent (low-cost) with Parallel Fast or Turbo. Perplexity ran search-only, and Parallel had search and extract. Costs are USD per 1,000 questions, including LLM tokens and tool calls.

| Benchmark | Perplexity, frontier | Parallel Advanced | Perplexity, low-cost | Parallel Fast |
| --- | --- | --- | --- | --- |
| SimpleQA Verified | 95% at $20.20 | 97% at $28.30 | 94% at $5.50 | 94% at $2.00 |
| BrowseComp | 74% at $275 | 74% at $399 | 46% at $37.10 | 44% at $11.80 |
| WideSearch (partial-credit score) | 53.5 at $547 | 57.6 at $692 | 47.0 at $24.80 | 45.5 at $10.50 |

Perplexity comes out ahead on BrowseComp: it ties Advanced at 74% for about two-thirds of the cost and edges Fast at the low-cost tier. It also edges Fast on WideSearch at that tier, its frontier runs cost less than Advanced on all three benchmarks, and Perplexity Search medium leads the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (September 2026) at 80, ahead of Parallel advanced at 75. Parallel leads SimpleQA Verified and WideSearch at the frontier tier, and at the low-cost tier Fast matches Perplexity on SimpleQA Verified for $2.00 per 1,000 against $5.50. These are our runs on our harness, so test both on your own queries.

## **What sits around each endpoint**

Few teams buy a search endpoint in isolation, so the surrounding platform usually decides it.

Around Perplexity's Search API sits the Agent API (POST /v1/agent), which [replaces the Sonar models](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview) when they retire on September 27, 2026. It routes to OpenAI, Anthropic, Google, xAI, and other models at their published token rates, offers presets from `fast` to `xhigh` plus `wide-research`, and bills web search at [$2.50 per 1,000 calls](https://docs.perplexity.ai/docs/getting-started/pricing) ($1 with Fast Search) and URL fetches at $0.50 per 1,000. That fetch rate undercuts Parallel Extract's $1 per 1,000, and the model marketplace has no Parallel counterpart.

Around Parallel's Search API sit Extract at $1 per 1,000 URLs, the Task API at $5 to $2,400 per 1,000 runs with typed schemas and a per-field Basis of citations, reasoning, excerpts, and confidence, the OpenAI-compatible Responses API at $10 to $250 per 1,000, FindAll for verified entity lists, Entity Search at $5 per 1,000, and Monitor at $3 per 1,000 executions. Change tracking has no Perplexity equivalent. For list-building, Perplexity's closest piece is the Agent API's `wide-research` preset, which writes cited records to a JSONL file.

## **Developer experience and compliance**

Both are a single POST with a bearer token and a JSON body. Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, and its Responses API is OpenAI SDK-compatible:

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="turbo",
)
```

Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention on Enterprise plans, and commits contractually to not training on customer data, with a public status page and trust center.

## **When to use each**

Choose Perplexity's Search API when you're already in the Perplexity ecosystem or want its retrieval behind your own model. Flat per-request pricing with no token maths is easy to reason about, the language and recency filters are clean, the published rate limit is generous, and its search quality leads the AA Search Index and ties or edges ours on BrowseComp. The Agent API alongside it lets you pair any frontier model with search and URL fetching at $0.0005 a call. If you're migrating off Sonar anyway, staying on one vendor has real operational value.

Choose Parallel's Search API when latency and per-call cost drive the design. Turbo at ~200ms and Fast at ~700ms both cost $1 per 1,000 requests, the same as Perplexity Fast Search, and in our low-cost agent runs Fast matched Perplexity's SimpleQA Verified accuracy for well under half the total cost. Basic and Advanced sit at Perplexity's standard $5 price point when you want more depth, and Advanced leads on SimpleQA Verified and WideSearch at the frontier tier. For most agent loops, Fast is the recommended starting point. Results aren't capped at 20, the Fetch Policy lets you force a live crawl, and the platform around it covers deep research, entity discovery, and monitoring.

These are the two closest products in this comparison set, and their price ladders now match at $1 and $5 per 1,000. The decision usually turns on whether you need results past 20, whether ~200ms buys you anything your product cares about, which benchmark profile looks like your queries, and which surrounding platform you'd rather standardise on.

**Related reading: **[Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel) · [Linkup vs. Parallel](https://parallel.ai/articles/linkup-vs-parallel) · [You.com vs. Parallel](https://parallel.ai/articles/you-com-vs-parallel).

# How to switch from Tavily to Parallel Search API

Tavily and Parallel agree closely on what a search response should contain, so this migration is short and the interesting part is the pricing model underneath. This guide covers what the two actually cost, how each parameter maps, the Tavily behavior that has no equivalent, the code change, and rate limits and compliance.

Tavily and Parallel solve the same problem: give an agent web content it can reason from, not just links. The migration is mostly a rename, because the two APIs agree on what a search response should contain. Where they differ is the billing unit (Tavily meters credits that vary by search depth, Parallel meters requests at a flat rate per mode) and a Tavily basic search costs **$5 to $8 per 1,000** depending on your plan, against **$1 per 1,000** for Parallel Search Turbo.

## **What the two cost**

Tavily sells credits. A basic search costs 1 credit and an advanced search costs 2, and the price per credit falls as you commit to a larger plan: $0.008 pay-as-you-go, $0.0075 on Project at $30 a month for 4,000 credits, down to $0.005 on Growth at $500 a month for 100,000. The free tier is 1,000 credits a month with no card. Extraction, crawling, and Tavily Research all draw on the same balance, with Research using dynamic pricing between 4 and 250 credits per request depending on the model.

Parallel charges per request at a flat rate per mode, with no plan and no credits:

| Workload | Tavily | Parallel |
| --- | --- | --- |
| Basic search, 1,000 requests | $5.00 to $8.00 | $1.00 (Turbo) |
| Advanced search, 1,000 requests | $10.00 to $16.00 | $5.00 (Advanced) |
| Extraction, 1,000 URLs | ~$4.00 | $1.00 |
| Free tier | 1,000 credits/month | $5/month credit (5,000 Turbo searches) |

One credit-model detail worth knowing before you compare: Tavily's auto_parameters flag can promote a search to advanced depth on its own, which doubles the credit cost of that request. If you have it enabled and have not explicitly pinned search_depth to basic, your real per-search cost is somewhere between the two rows above.

_Note: For the latest pricing, always check official documentation._

## **Parameter mapping**

| Tavily | Parallel |
| --- | --- |
| query | objective (natural language), optionally with search_queries |
| search_depth: "basic" | mode: "turbo" or "basic" |
| search_depth: "advanced" | mode: "advanced" (the default) |
| max_results | 10 results included; more billed at $1 per 1,000 results |
| include_domains / exclude_domains | source_policy include / exclude |
| time_range | source_policy freshness date |
| chunks_per_source, include_raw_content | excerpts.max_chars_per_result and max_chars_total |
| Tavily Extract | Extract API |
| Tavily Research | Task API (nine processors) or Responses API |

The one genuine shift in thinking: Tavily takes a query string, Parallel takes an objective. You get better results writing "find the current enterprise pricing and rate limits for vendor X" than pasting in the keywords you would have given a search engine. If you already have well-tuned keyword queries, pass them as search_queries alongside the objective rather than throwing them away.

## **What does not map**

- topic: "news" or "finance". Parallel has no topic switch. Use a Source Policy with a domain list, or an objective that states the domain of interest.
- include_answer. Parallel's Search API returns results, not a synthesized answer. Use the Responses API ($10 to $250 per 1,000 by reasoning effort) for that shape.
- include_images: no equivalent.
- exact_match, no direct equivalent; state the required phrase in the objective.
- Tavily Crawl. Parallel has no site crawler. Keep Tavily, or use a dedicated crawler, for that job.

Running the other way, Parallel adds a Fetch Policy that forces a live crawl instead of the index, a Task API with per-field citations, reasoning, and calibrated confidence scores, plus FindAll, Entity Search, and Monitor.

## **The code change**

```python
from tavily import TavilyClient

client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])

response = client.search(
    query="enterprise pricing for vendor X",
    search_depth="advanced",
    max_results=10,
    include_domains=["vendorx.com"],
)
```

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="find current enterprise pricing for vendor X",
    search_queries=["vendor X enterprise pricing"],
    mode="advanced",
    advanced_settings={"source_policy": {"include_domains": ["vendorx.com"]}},
)
```

## **Rate limits and compliance**

Parallel's defaults are 600 requests per minute for Search, Extract, and Entity Search, 300 for Monitor, and 300 per hour for FindAll runs, with GET polling excluded and custom limits available on enterprise plans. Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention, and commits contractually to not training on customer data.

## **Get started**

Start on Turbo and compare against your current Tavily basic searches on a sample of real production queries. Both return excerpts, so the comparison is like for like. If quality drops on multi-hop questions, move those calls to Advanced, which is still at or below Tavily's advanced rate on every plan. The $5 monthly free credit covers 5,000 Turbo searches, which is usually enough to run the evaluation before you change anything.

**Related reading: **[Tavily vs. Parallel](https://parallel.ai/articles/tavily-vs-parallel-search) · [Switching from Exa](https://parallel.ai/articles/exa-to-parallel-search-api) · [Switching from Firecrawl](https://parallel.ai/articles/firecrawl-to-parallel-search-api).

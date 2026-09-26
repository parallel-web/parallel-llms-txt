# How to switch from Firecrawl to Parallel Search API

Most of a Firecrawl-to-Parallel migration is a parameter rename, so the decision rests on billing shape and on what you need back from a search call. This guide covers what the two cost at comparable volume, how each search parameter maps, the Firecrawl behavior that has no equivalent, the code change, and rate limits.

Firecrawl and Parallel both return query-relevant excerpts from a search call, so the switch is mostly mechanical. The structural change is the billing model: Firecrawl sells monthly credit subscriptions that expire, Parallel sells requests. A Firecrawl search costs 2 credits per 10 results (roughly **$1.20 to $1.66 per 1,000** depending on plan) against **$1 per 1,000** for Parallel Search Turbo.

Those numbers are close; the gap opens when you need page content rather than highlights, and when your traffic is spiky enough that a monthly credit allowance stops fitting.

## **What the two cost**

Firecrawl's plans, billed yearly, run Free at 1,000 credits a month and 2 concurrent requests, Hobby at $16 for 5,000 and 5 concurrent, Standard at $83 for 100,000 and 50, Growth at $333 for 500,000 and 100, and Scale at $599 for 1,000,000 and 150. Credits do not roll over and there is no pay-as-you-go option.

Search costs 2 credits per 10 results. Scrape, crawl, map, and monitor cost 1 credit per page. JSON mode and enhanced proxy each add 4 credits per page. On Standard, a credit works out to $0.00083:

| Per 1,000 searches | Firecrawl (Standard plan) | Parallel |
| --- | --- | --- |
| Search, highlights only | ~$1.66 (2 credits) | $1.00 (Turbo) |
| Search + full page content, 10 results | ~$10.00 (12 credits) | $1.00 (excerpts included) |
| Search + JSON mode, 10 results | ~$43.00 (52 credits) | Task API from $5.00 per 1,000 runs |
| Extraction, 1,000 URLs | ~$0.83 (1 credit each) | $1.00 |
| Unused allowance | Expires monthly | No allowance to expire |

Plain extraction is a tie, and highlights-only search is close. The two rows that move the decision are search with content attached and the expiry column. Agent traffic is spiky by nature, so a quiet month on a subscription is money spent on nothing, and a spike past the allowance means upgrading a plan rather than paying an overage.

_Note: For the latest pricing, always check official documentation._

## **Parameter mapping**

| Firecrawl | Parallel |
| --- | --- |
| query | objective, optionally with search_queries |
| limit | 10 results included; more at $1 per 1,000 results |
| highlights (default true) | excerpts (returned by default) |
| scrapeOptions: { formats: ["markdown"] } | excerpts with a larger max_chars_per_result, or the Extract API |
| includeDomains / excludeDomains | source_policy include / exclude |
| tbs (qdr:d, qdr:w, qdr:m) | source_policy freshness date |
| /v2/scrape | Extract API |
| Agent endpoint (preview) | Task API (nine processors) or Responses API |
| Monitor | Monitor API |

## **What does not map**

Firecrawl does several things Parallel does not, and if you use them you are keeping both:

- Crawl: no site-wide crawler
- Map: no URL discovery endpoint
- Interact: no browser automation, so no clicking, form filling, or interstitials
- sources: ["news"] and ["images"], and the github, research, and pdf categories: use a Source Policy domain list instead
- location: no geo parameter
- Self-hosting: Firecrawl's core is open source; Parallel is hosted only

In the other direction, you gain a Fetch Policy that forces live crawling, the Task API with per-field citations, reasoning, excerpts, and confidence levels at nine fixed price tiers, plus FindAll and Entity Search.

## **The code change**

```python
from firecrawl import Firecrawl

firecrawl = Firecrawl(api_key=os.environ["FIRECRAWL_API_KEY"])

results = firecrawl.search(
    "what changed in the EU AI Act enforcement timeline",
    limit=10,
    scrape_options={"formats": ["markdown"]},
)
```

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="find what changed in the EU AI Act enforcement timeline",
    search_queries=["EU AI Act enforcement timeline"],
    mode="turbo",
)
```

The second version drops the scrape_options block. In the Firecrawl call that block is what turns a 2-credit search into a 12-credit one; in the Parallel call the excerpts are already there.

## **Rate limits**

The limit unit changes. Firecrawl caps concurrent requests, from 2 on Free to 150 on Scale. Parallel caps requests per minute: 600 for Search, Extract, and Entity Search, 300 for Monitor, and 25 per hour for FindAll runs, with GET polling excluded and custom limits available on enterprise plans. If your code is written around a concurrency semaphore, you will want a rate limiter instead.

Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention on Enterprise plans, and commits contractually to not training on customer data.

## **Get started**

Move the search calls first and leave crawl, map, and interact where they are. That split is usually permanent. Start with any call currently using scrapeOptions, since that is where the cost difference is largest, and check whether the excerpts alone answer your queries before reaching for Extract. The $5 monthly free credit covers 5,000 Turbo searches, which is enough to compare properly against your current pipeline.

**Related reading: **[Firecrawl vs. Parallel](https://parallel.ai/articles/firecrawl-vs-parallel) · [Switching from Tavily](https://parallel.ai/articles/tavily-to-parallel-search-api) · [Switching from Exa](https://parallel.ai/articles/exa-to-parallel-search-api).

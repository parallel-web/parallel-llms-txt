# TinyFish vs Parallel: operating websites or retrieving the web

TinyFish sells web agents that operate live websites and gives away the search and fetch calls underneath them, and since fall 2026 it also sells research, monitoring, and dataset products. Parallel sells retrieval and research priced per request. Which one you want depends on whether your agent has to act on a site or read the open web.

## **Quick answer**

TinyFish sells web agents that operate live websites, and TinySearch and TinyFetch on that platform cost $0.00 per call within daily limits, with a default of 30 searches per minute. Parallel sells retrieval and research priced per request, and none of its APIs click a button or hold a logged-in session. Since TinyFish's fall 2026 launches, the two also overlap on research, monitoring, and list building. Use TinyFish when the job is acting on a site. Use Parallel when the job is reading the open web at volume.

## **What TinyFish sells**

TinyFish came out of stealth in August 2025 with a $47 million Series A led by ICONIQ Growth. It was founded in 2024, sits in Palo Alto, and is run by Sudheesh Nair, previously president of Nutanix. At launch it was an enterprise web agent company with no self-serve product and no public price list, and that has since changed: today you can sign up, take a key, and call its APIs against a wallet balance.

TinyFish renamed its four core APIs in October 2026: TinyAgent, TinyBrowser, TinySearch, and TinyFetch. TinyAgent takes a natural-language goal and a starting URL, drives a real browser to completion, and streams back what it did over SSE or a webhook. TinyBrowser hands you the session itself, a cloud Chromium you drive over CDP with persistent profiles and residential proxy routing, while TinySearch and TinyFetch are the read-only primitives underneath: a keyword query returning ranked results, and a URL-to-content call that takes up to ten URLs at a time.

On top of the core APIs sit three products. TinyMonitor, launched in September 2026, checks a page or a search topic on a schedule and alerts you by email or webhook when a change matches a condition you write. TinyResearch and TinySet, launched in November 2026, turn a question into a cited report, or a prompt into a structured dataset assembled from many pages.

Mako, announced in July 2026, is TinyFish’s own web agent model, fine-tuned from a Qwen base on production run data and now the default behind TinyAgent. AgentQL, the natural-language query language that was the company’s original product, is still live on its own domain with its own billing and a $99 per month plan. TinyFish’s current marketing does not mention AgentQL, and no deprecation notice has been posted, so it remains available.

Parallel's surface is Search, Extract, Task, Responses, FindAll, Entity Search, and Monitor. All of it is retrieval and research for models. No Parallel API clicks a button, fills a form, or holds a logged-in session.

## **Where the overlap actually is**

TinySearch lines up against Parallel Search, and TinyFetch against Parallel Extract. Until September 2026 that was the whole overlap. Since then, TinyFish's three products have added three more pairs: TinyMonitor against Parallel Monitor, TinyResearch against the deep research processors of Parallel's Task API, and TinySet against FindAll with enrichment. TinyAgent and TinyBrowser still have no Parallel equivalent, and Parallel's Responses, Entity Search, and Decisions APIs have no TinyFish equivalent. The retrieval pair is the one TinyFish gives away; on research, monitoring, and datasets, both vendors charge.

## **Pricing: a free half and a metered half**

|  | TinyFish | Parallel |
| --- | --- | --- |
| Search | TinySearch: $0.00 per request, up to 12,000 a day | $1 per 1,000 (turbo, fast); $5 per 1,000 (basic, advanced) |
| Page content | TinyFetch: $0.00 per URL, up to 1,000 a day | $1 per 1,000 URLs (Extract) |
| Browser agent | TinyAgent: $0.016 per step | Not offered |
| Raw browser session | TinyBrowser: $0.002 per minute | Not offered |
| Deep research | TinyResearch: $2.00 per report, $3.00 in Max mode | Task: $5 to $2,400 per 1,000 runs; Responses: $10 to $250 per 1,000 |
| Monitoring | TinyMonitor: $0.005 per check | Monitor: $3 to $10 per 1,000 checks |
| Datasets and lists | TinySet: $0.10 per row | FindAll: fixed fee per run plus $0.03 to $1.00 per match |
| Billing | Wallet top-up, no subscription | Pay as you go, per request; Scale plan from $1,000 a month |
| Free entry | $8 in wallet funds at signup; account and API key required | Up to $80 at signup plus $5 a month with a card on file; Parallel MCP free with no account |

The zero is real, within limits. TinySearch is free up to 12,000 requests a day (500 an hour), and TinyFetch up to 1,000 URLs a day, at any wallet balance. Past the daily allowance, requests stop until the 00:00 UTC reset, or draw on the wallet if you turn wallet spending on. If your search and fetch volume fits inside those limits, nothing in the category beats that on price, Parallel's metered API included.

What the zero buys TinyFish is the paid meter: $0.016 per agent step, and now $2 to $3 per research report and $0.10 per dataset row. Free retrieval brings developers in, and its rate limits are sized for that funnel rather than for production throughput.

The homepage also runs a cost comparison, putting 10,000 agent steps at $24,000 on a competing stack against $160 on TinyFish. No comparator is named and no methodology is given, so there is no way to check the figure.

Parallel charges per request against one meter, with nothing prepaid. Search turbo and fast are **$1 per 1,000 requests** with 10 results and excerpts included, basic and advanced $5 per 1,000, and additional results $1 per 1,000. Extract is $1 per 1,000 URLs. Above that sit Task at $5 to $2,400 per 1,000 runs, Responses at $10 to $250 per 1,000 charged only on success, Monitor at $3 to $10 per 1,000 executions, Entity Search at $5 per 1,000 with 100 results, and FindAll at a fixed cost plus $0.03 to $1.00 per match.

On the products that now overlap, per-unit prices are close at the low end and diverge at the top. A TinyMonitor check costs $0.005, inside Parallel Monitor's range of $0.003 to $0.010. A TinyResearch report is a flat $2, or $3 in Max mode, while a Task run costs from $0.005 on the lightest processor to $2.40 on the heaviest, so Parallel is far cheaper for light enrichment at volume, and the two sit in the same range for deep reports. TinySet bills $0.10 per row, and FindAll a fixed fee per run plus $0.03 to $1.00 per match. Neither vendor publishes a head-to-head on these products, so test both on your own questions.

## **Rate limits and throughput**

TinySearch allows 30 requests per minute and 500 per hour, and TinyFetch allows 150 URLs per minute and 1,000 per day, at no more than ten per request. TinyAgent runs default to two concurrent, TinyBrowser to five concurrent sessions. Parallel's defaults on the pay-as-you-go Build plan are 600 requests per minute for Search and Extract (1,500 on the Scale plan), 300 per minute for Responses and Monitor, 2,000 per minute for Task, and 25 FindAll runs per hour.

One agent doing multi-hop research can spend 30 searches in well under a minute, so a single active user can saturate the TinyFish limit, and Parallel's default Search limit is twenty times higher. Both vendors raise limits on enterprise plans. TinyFish applies its limits per person, or per organization when you belong to one.

## **Developer experience**

Both are quick to start. TinyFish authenticates with an X-API-Key header, ships Python and TypeScript SDKs and a CLI, hosts an MCP server with OAuth 2.1, and publishes llms.txt alongside a documentation page written for coding agents. One design choice stands out: failed runs return HTTP 200 with a populated error object, split into system failures you should retry and agent failures you should fix by refining the input, which gives an agent more to work with than a generic 500 would.

```python
from tinyfish import TinyFish

client = TinyFish()

with client.agent.stream(
    url="https://scrapeme.live/shop",
    goal="Extract the first 2 product names and prices. Return JSON.",
) as stream:
    for event in stream:
        print(event)
```

Parallel ships Python and TypeScript SDKs, [Parallel MCP](https://parallel.ai/mcp), and a playground, and the Responses API is OpenAI SDK-compatible. Here the equivalent call is a search:

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ['PARALLEL_API_KEY'])

search = client.search(
    objective='your goal',
    search_queries=['your keyword query'],
    mode='turbo',
)
```

TinyFish takes a goal and a page to work on, then returns a stream of what the agent did. Parallel takes an objective and a set of queries, then returns ranked URLs with compressed excerpts sized for a model's context window.

The free entry points differ in shape as well as price. TinyFish's MCP server sits behind OAuth 2.1, so an account comes first even though the Search and Fetch calls themselves cost nothing. Parallel MCP at mcp.parallel.ai/mcp takes anonymous requests with no account and no key. Point a client at the URL and web_search, web_fetch, and web_decisions appear, backed by the Search, Extract, and Decisions APIs, with Search running in fast mode by default.

Anonymous traffic runs at lower rate limits. Passing an API key as a Bearer token raises them, adds web_research for cited single-question answers, and unlocks per-connection overrides in the x-parallel-mcp-config header, so you can pin a search mode, a location, a result count, or domain filters for every call on that connection. Connecting to mcp.parallel.ai/mcp?login signs in over OAuth instead and returns 401 to anonymous requests; use that route when every call has to be attributed to an account, as with Zero Data Retention or an organization-wide rollout.

## **Compliance**

TinyFish is ISO 27001:2022 certified with a public trust center, and its enterprise tier adds SSO, audit logs, VPC deployment, and a 99.99 percent uptime commitment. It also offers credential handling through a vault integration, so an agent can log into a site without the model seeing the secret. Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum, and runs a public status page and trust center. Under the standard [Customer Terms](https://parallel.ai/customer-terms), Parallel may use inputs and outputs, not linked to any individual, to train and improve the models behind its services. Enterprise plans with zero data retention exclude that use.

The two hold different certifications, and neither implies more rigor than the other. Match them against what your own procurement asks for, and if you need both, ask each vendor directly.

## **When to use each**

Choose TinyFish when the job requires acting on a site. Logging in, filling a form, holding a session, clicking through a booking flow, reading a price that only exists behind an interface: Parallel does none of that, and TinyFish has built real infrastructure for it. If your search and fetch volume fits inside 30 requests per minute and 12,000 a day, taking that for free alongside is a good deal.

Choose Parallel when the target is the open web and the consumer is a model. Retrieval is the product here rather than a feeder for one, and that shows up in the throughput defaults, in four search modes that trade latency against depth from 200ms to three seconds, and in the research layer sitting above search: Task for deep research and enrichment, Responses for cited answers, FindAll for list building, Entity Search for people and companies, and Monitor for tracking change over time. [Openbenchmarks' coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents) (last updated September 26, 2026) measured the gap: Parallel turbo had the lowest average search time at 333ms, against 2.15s for TinyFish Search. On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (November 2026 data), Parallel Fast scores 82 against 71 for TinyFish Search and takes 15.5 seconds per task against 57.7, while TinyFish's free search keeps its cost per 1,000 tasks lower, $8.62 against $14.03.

In practice the two combine more often than they compete. A reasonable architecture puts Parallel on the open-web research and monitoring path, where throughput and cost per request decide the shape, and puts TinyFish wherever the answer only exists on the far side of an interaction.

## **FAQ**

### Do TinyFish and Parallel compete?

On five pairs: TinySearch and Parallel Search, TinyFetch and Extract, TinyMonitor and Monitor, TinyResearch and the Task API, and TinySet and FindAll. TinyAgent and TinyBrowser have no Parallel equivalent. Parallel's Responses, Entity Search, and Decisions APIs have no TinyFish equivalent.

### Is TinySearch free?

Within limits, yes. TinySearch is $0.00 per request up to 12,000 a day and TinyFetch is $0.00 per URL up to 1,000 a day, at any wallet balance. The default caps are 30 searches per minute and 500 per hour, and 150 fetched URLs per minute. Past the daily allowance, requests stop until the 00:00 UTC reset unless you turn wallet spending on.

### Can I use both?

Yes. A common architecture puts Parallel on open-web research and monitoring, and TinyFish on anything that only exists on the far side of an interaction.

### Is Parallel a TinyFish alternative?

For reading the open web, yes: search, page extraction, deep research, monitoring, and list building, with higher default rate limits and per-request pricing. For acting on websites, no. Parallel has no equivalent to TinyAgent or TinyBrowser, so teams that need both often run them side by side.

**Related reading: **[Apify vs. Parallel](https://parallel.ai/articles/apify-vs-parallel) / [Firecrawl vs. Parallel](https://parallel.ai/compare/firecrawl-vs-parallel) / [AI data extraction at scale](https://parallel.ai/articles/ai-data-extraction-how-to-extract-structured-data-from-websites-at-scale) / [Keenable vs. Parallel](https://parallel.ai/articles/keenable-vs-parallel) / [The best free web search APIs](https://parallel.ai/articles/best-free-web-search-api).

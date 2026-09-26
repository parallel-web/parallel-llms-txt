# TinyFish vs Parallel: operating websites or retrieving the web

TinyFish sells web agents that operate live websites, and it gives away the search and fetch calls underneath them, while Parallel sells retrieval and research priced per request. Which one you want depends on whether your agent has to act on a site or read the open web.

## **Quick answer**

TinyFish sells web agents that operate live websites. Search and Fetch on that platform cost $0.00 per call, with a default of 30 searches per minute. Parallel sells retrieval and research priced per request, and none of its APIs click a button or hold a logged-in session. Use TinyFish when the job is acting on a site. Use Parallel when the job is reading the open web.

## **What TinyFish sells**

TinyFish came out of stealth in August 2025 with a $47 million Series A led by ICONIQ Growth. It was founded in 2024, sits in Palo Alto, and is run by Sudheesh Nair, previously president of Nutanix. At launch it was an enterprise web agent company with no self-serve product and no public price list, and that has since changed: today you can sign up, take a key, and call four APIs against a wallet balance.

The four are Agent, Browser, Search, and Fetch. Agent takes a natural-language goal and a starting URL, drives a real browser to completion, and streams back what it did over SSE or a webhook. Browser hands you the session itself, with persistent context profiles, stealth mode, and residential proxy routing, while Search and Fetch are the read-only primitives underneath: a keyword query returning ranked results, and a URL-to-content call that takes up to ten URLs at a time.

Mako, announced in July 2026, is TinyFish’s own web agent model, fine-tuned from a Qwen base on production run data and now the default behind Agent. AgentQL, the natural-language query language that was the company’s original product, is still live on its own domain with its own billing and a $99 per month plan. TinyFish’s current marketing does not mention AgentQL, and no deprecation notice has been posted, so it remains available.

Parallel's surface is Search, Extract, Task, Responses, FindAll, Entity Search, and Monitor. All of it is retrieval and research for models. No Parallel API clicks a button, fills a form, or holds a logged-in session.

## **Where the overlap actually is**

Only two of the four TinyFish products compete with anything Parallel sells: TinyFish Search lines up against Parallel Search, and TinyFish Fetch against Parallel Extract. Everything else is uncontested in both directions. Agent and Browser have no Parallel equivalent, and Task, Responses, FindAll, Entity Search, and Monitor have no TinyFish equivalent. The overlapping pair is also the pair TinyFish gives away.

## **Pricing: a free half and a metered half**

|  | TinyFish | Parallel |
| --- | --- | --- |
| Search | $0.00 per request | $1 per 1,000 (turbo, fast); $5 per 1,000 (basic, advanced) |
| Page content | $0.00 per URL | $1 per 1,000 URLs (Extract) |
| Browser agent | $0.016 per step | Not offered |
| Raw browser session | $0.002 per minute | Not offered |
| Research and enrichment | Not offered | Task $5 to $2,400 per 1,000 runs; Responses $10 to $250 per 1,000 |
| Billing | Wallet top-up, $10 minimum | Pay as you go, per request |
| Free entry | $8 in wallet funds at signup; account and API key required | $5 in credits every month, applied automatically; hosted Search MCP free with no account |

The zero is real: TinyFish Search and Fetch cost nothing per call, they do not draw down the wallet, and they keep working at a zero balance. If your workload is search and page fetching and it fits inside the rate limits, nothing in the category beats that on price, Parallel's metered API included.

What the zero buys TinyFish is the agent meter. Revenue is $0.016 per agent step, and an agent run is many steps. Free retrieval brings developers in, and its rate limits are sized for that funnel rather than for production throughput.

The homepage also runs a cost comparison, putting 10,000 agent steps at $24,000 on a competing stack against $160 on TinyFish. No comparator is named and no methodology is given, so there is no way to check the figure.

Parallel charges per request against one meter, with nothing prepaid. Search turbo and fast are **$1 per 1,000 requests** with 10 results and excerpts included, basic and advanced $5 per 1,000, and additional results $1 per 1,000. Extract is $1 per 1,000 URLs. Above that sit Task at $5 to $2,400 per 1,000 runs, Responses at $10 to $250 per 1,000 charged only on success, Monitor at $3 to $10 per 1,000 executions, Entity Search at $5 per 1,000 with 100 results, and FindAll at a fixed cost plus $0.03 to $1.00 per match.

## **Rate limits and throughput**

TinyFish Search allows 30 requests per minute per key, and Fetch allows 150 URLs per minute at no more than ten per request. Agent runs default to two concurrent, Browser to five concurrent sessions. Parallel's defaults are 600 requests per minute for Search and Extract, 300 per minute for Responses and Monitor, 2,000 per minute for Task, and 25 FindAll runs per hour.

One agent doing multi-hop research can spend 30 searches in well under a minute, so a single active user can saturate the TinyFish limit, and Parallel's default Search limit is twenty times higher. Both vendors raise limits on enterprise plans, and TinyFish’s cap is per key rather than per account.

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

Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, and the Responses API is OpenAI SDK-compatible. Here the equivalent call is a search:

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

The free entry points differ in shape as well as price. TinyFish's MCP server sits behind OAuth 2.1, so an account comes first even though the Search and Fetch calls themselves cost nothing. Parallel's hosted Search MCP at search.parallel.ai/mcp takes anonymous requests with no account and no key. Point a client at the URL and web_search and web_fetch appear, backed by the Search and Extract APIs, running Search in basic mode with excerpts capped at roughly 25,000 characters per call to fit typical MCP client limits.

Anonymous traffic runs at lower rate limits. Passing an API key as a Bearer token raises them and unlocks per-connection overrides, so you can pin fast mode, a location, or a result count for every call on that connection. A second endpoint at search.parallel.ai/mcp-oauth requires authentication and returns 401 to anonymous requests; use that one when every call has to be attributed to an account, as with Zero Data Retention or an organization-wide rollout.

## **Compliance**

TinyFish is ISO 27001:2022 certified with a public trust center, and its enterprise tier adds SSO, audit logs, VPC deployment, and a 99.99 percent uptime commitment. It also offers credential handling through a vault integration, so an agent can log into a site without the model seeing the secret. Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention, and commits contractually to not training on customer data. It runs a public status page and trust center.

The two hold different certifications, and neither implies more rigor than the other. Match them against what your own procurement asks for, and if you need both, ask each vendor directly.

## **When to use each**

Choose TinyFish when the job requires acting on a site. Logging in, filling a form, holding a session, clicking through a booking flow, reading a price that only exists behind an interface: Parallel does none of that, and TinyFish has built real infrastructure for it. If your search and fetch volume fits inside 30 requests per minute, taking that for free alongside is a good deal.

Choose Parallel when the target is the open web and the consumer is a model. Retrieval is the product here rather than a feeder for one, and that shows up in the throughput defaults, in four search modes that trade latency against depth from 200ms to three seconds, and in the research layer sitting above search: Task for deep research and enrichment, Responses for cited answers, FindAll for list building, Entity Search for people and companies, and Monitor for tracking change over time. [Openbenchmarks' independent speed boards](https://openbenchmarks.com/web-search/fastest-search-api) (September 2026) measured the gap: Parallel turbo had the lowest mean latency on factual lookup at 348ms and the lowest average search time on hard retrieval at 333ms, against 2.62s and 2.15s for TinyFish Search.

In practice the two combine more often than they compete. A reasonable architecture puts Parallel on the open-web research and monitoring path, where throughput and cost per request decide the shape, and puts TinyFish wherever the answer only exists on the far side of an interaction.

## **FAQ**

### Do TinyFish Search and Parallel Search compete?

Only Search and Fetch overlap. TinyFish Agent and Browser have no Parallel equivalent. Parallel Task, Responses, FindAll, Entity Search, and Monitor have no TinyFish equivalent.

### Is TinyFish Search free?

Per call, yes. Search is $0.00 per request and Fetch is $0.00 per URL. They do not draw down the wallet, and they keep working at a zero balance. The default cap is 30 Search requests per minute per key, and 150 Fetch URLs per minute.

### Can I use both?

Yes. A common architecture puts Parallel on open-web research and monitoring, and TinyFish on anything that only exists on the far side of an interaction.

**Related reading: **[Apify vs. Parallel](https://parallel.ai/articles/apify-vs-parallel) · [Firecrawl vs. Parallel](https://parallel.ai/articles/firecrawl-vs-parallel) · [AI data extraction at scale](https://parallel.ai/articles/ai-data-extraction-how-to-extract-structured-data-from-websites-at-scale).

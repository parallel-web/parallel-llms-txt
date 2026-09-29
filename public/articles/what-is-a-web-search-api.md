# What is a web search API, and when do AI agents need one?

A web search API is the piece of an AI agent’s stack that decides whether its answers reflect today’s web or last year’s training data, and picking one starts with knowing which kind you’re buying. This guide covers how search APIs work, the three product shapes on the market, when an agent needs live search and when it doesn’t, and what the options cost.

A web search API is an HTTP endpoint that takes a query and returns web results as structured data (URLs, titles, dates, and text) that code can read without rendering a page. AI agents call one to pull current, citable facts from the public web into a model’s context window at the moment they need them.

Developers used to reach for Google or Bing for this. Microsoft [retired the Bing Search APIs on August 11, 2025](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) and pointed customers to Grounding with Bing Search inside Azure AI Agents. Google’s [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) is closed to new customers, and existing customers have until January 1, 2027 to move off it. Both search giants now sell web grounding as a feature of their own agent platforms, so teams building agents on other models buy search from independent providers instead.

## How a web search API works

Every web search API runs five stages: crawl, index, retrieve, rank, and respond. Crawlers download pages and revisit them on a schedule. The indexer parses each page into text, metadata, and links, and stores it in structures that support fast lookup. At query time the retriever pulls candidate documents, a ranker orders them, and the response layer packages the top results as JSON.

The stage where providers differ most is the one you can’t see: whose index sits behind the endpoint. Some providers crawl and index the web themselves. Brave describes its API as [its own independent index](https://brave.com/search/api/) with its own ranking models, and we built the [Parallel Search API](https://parallel.ai/products/search) on our own index of billions of pages, with millions added daily. Others run no index at all. SERP APIs such as SerpApi send your query to Google or Bing, scrape the results page, and return it as JSON. Resellers wrap one of those upstream sources in a different interface.

Own-index providers control freshness, excerpt length, and ranking, so they can shape results for a model. SERP scrapers inherit whatever the upstream engine decides, add a network hop, and carry legal exposure: Google [sued SerpApi on December 19, 2025](https://blog.google/innovation-and-ai/technology/safety-security/serpapi-lawsuit/) for circumventing its anti-scraping measures, and our explainer on [whether scraping Google is legal](https://parallel.ai/articles/is-scraping-google-legal) covers the case. And only own-index providers can tell you what’s in their index and how often they recrawl it. Our guides to [what a web index is](https://parallel.ai/articles/what-is-a-web-index) and [what a web crawler does](https://parallel.ai/articles/what-is-a-web-crawler) cover the first two stages in depth.

## The three shapes of web search API

The market sells three products under one name. SERP APIs return what a human sees on a results page, AI-native search APIs return excerpts chosen for a model to read, and answer APIs run the search and the model for you and return finished text.

| Shape | What you get back | Examples | Best for |
| --- | --- | --- | --- |
| SERP API | Links, titles, and short snippets from a search engine results page | SerpApi, Serper, Bright Data SERP API | Rank tracking, SEO data, replicating what a human sees on Google |
| AI-native search API | Ranked URLs with multi-paragraph excerpts selected for the query | Parallel Search, Exa, Tavily, Brave Search | Agent tool calls and retrieval-augmented generation (RAG) where your own model reasons over the evidence |
| Answer or grounding API | Synthesized text with citations | Grounding with Google Search (Gemini), Grounding with Bing (Azure), Brave Answers, Parallel Responses API | Products that want a cited answer and don’t need to control the reasoning step |

SERP snippets run a sentence or two, which rarely holds the fact an agent needs. A pipeline built on them usually fetches each page, strips the navigation and ads, chunks the text, and reranks it before the model sees anything. AI-native APIs do that work server-side. In the live response below, our Fast mode returned 10 results with excerpts between about 450 and 2,950 characters each. Answer APIs hide the evidence behind prose, which is convenient until you need to check which source a sentence came from.

## When an AI agent needs one

An agent needs live search whenever the answer depends on something its model didn’t see in training or can’t be trusted to recall exactly.

**Anything after the knowledge cutoff.** Every model, Claude Opus 5.5 included, stops learning at a training cutoff, so this quarter’s earnings, last week’s library release, or yesterday’s regulation need retrieval.

**Facts that change.** Prices, headcounts, executive rosters, API rate limits, and store hours drift weekly. A model that memorized them a year ago will state the old value with full confidence.

**Citations and provenance.** Legal, finance, and healthcare teams need to trace each claim to a source. A search API returns the URL and the passage, so a reviewer can open the page and check it.

**The long tail.** Models recall popular facts well and obscure ones badly. The founding year of a regional logistics company or the pin-out of a niche sensor board sits on a handful of pages that a model saw once, if ever.

**Verifying generated claims.** Agents can draft first and then search to confirm each factual sentence, dropping or correcting the ones no source supports. This pattern catches hallucinated numbers before a user sees them.

## When an agent doesn’t need one

Live web search adds cost, latency, and a new failure mode, so skip it when it can’t help. A support bot answering from your product manual should query a vector index of your docs, since the public web knows less about your refund policy than your own help center does. Our comparison of [RAG with web search against vector databases](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-web-search-instead-of-vector-databases) covers where each fits.

Stable knowledge doesn’t need retrieval either. Unit conversions, the syntax of a Python list comprehension, and the plot of _Hamlet_ won’t change before your next deploy. Latency is the third case. A voice agent with a 300ms turn budget can’t wait on a ~3s deep search, though a ~200ms call like our Turbo mode fits some of those budgets. Many agents let the model decide per turn whether to call search, and cache repeated queries.

## What a request and response look like

A search call is one POST with your query and a few options. The Python below calls our Search API in Fast mode with a natural-language objective and two keyword queries. We ran it on September 28, 2026; it took about one second end to end.

```python
import os
import requests

resp = requests.post(
    "https://api.parallel.ai/v1/search",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json={
        "mode": "fast",
        "objective": "When does the Google Custom Search JSON API shut down for existing customers?",
        "search_queries": ["Custom Search JSON API discontinued", "Custom Search JSON API January 2027"],
    },
    timeout=30,
)
resp.raise_for_status()
data = resp.json()

for result in data["results"][:3]:
    print(result["title"], result["url"], result["publish_date"])
    print(result["excerpts"][0][:300], "\n")
```

The response came back with 10 results. Here is its shape, trimmed to the one result from Google’s own documentation:

```json
{
  "search_id": "search_eafa488c550b6ea4f08a91b7d9b49258",
  "results": [
    {
      "url": "https://developers.google.com/custom-search/v1/overview",
      "title": "Custom Search JSON API | Google for Developers",
      "publish_date": null,
      "excerpts": [
        "... Note: The Custom Search JSON API is closed to new customers. ... Existing Custom Search JSON API customers have until January 1, 2027 to transition to an alternative solution ..."
      ]
    }
  ],
  "warnings": null,
  "usage": [{ "name": "sku_search", "count": 1 }],
  "session_id": "session_eafa488c550b6ea4f08a91b7d9b49258"
}
```

The excerpt already contains the answer, so an agent can pass `results` straight into the model’s context and cite `url`. The `usage` field reports one billable request. Omit `mode` and the API defaults to `advanced` (~3s); our [search modes docs](https://docs.parallel.ai/search/modes) recommend starting with `fast`. The same call works from the `parallel-web` Python and TypeScript SDKs.

## How to evaluate one

Test candidates on your own queries, because published leaderboards measure someone else’s workload. Build a set of 100 to 200 real queries with known answers, run each API through the same agent and model, and score whether the agent got the answer right, what the whole run cost, and how long it took at the p50 and p95. Cost per correct answer beats cost per request as a metric, since an API with better excerpts often needs fewer calls.

We describe our own process in [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis), and our guide to [benchmarking web search APIs on your own queries](https://parallel.ai/articles/how-to-benchmark-web-search-apis) walks through the harness, the LLM judge, and the error bars. For a published baseline, the [Parallel benchmarks page](https://parallel.ai/benchmarks) lists our September 9, 2026 Search results with the agent model used for each run.

## Pricing models

Providers bill per request, per plan, per credit, or per request plus tokens, so headline numbers don’t always compare cleanly. These are list prices we checked on each provider’s pricing page on September 28, 2026.

| Model | How it bills | Examples (list price) |
| --- | --- | --- |
| Per request | A flat price per call, with a set number of results included | Parallel Search $1 per 1,000 (Turbo, Fast) or $5 per 1,000 (Basic, Advanced), 10 results included; Brave Search $5 per 1,000; Exa Search $7 per 1,000 |
| Monthly plan | A subscription buys a search quota | SerpApi Starter $25 a month for 1,000 searches; Developer $75 for 5,000 |
| Credits | Each call costs a variable number of credits | Tavily pay-as-you-go $0.008 per credit; a basic search costs 1 credit and an advanced search 2 |
| Per request plus tokens | A search fee plus model token charges | Grounding with Google Search on Gemini 3 models: 5,000 free search requests a month, then $14 per 1,000; Brave Answers $4 per 1,000 plus $5 per million tokens |

Per-request pricing is the easiest to forecast. Credit and plan pricing need a conversion: Tavily’s credit price works out to $8 per 1,000 basic searches, and SerpApi’s Starter plan to $25 per 1,000. Answer APIs bundle model tokens into the bill, so their per-request figure understates the total.

## How to start free

You can try live web search in an agent without an account. Our [Search MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp) at `https://search.parallel.ai/mcp` is free to use anonymously at lower rate limits: no signup and no API key. It exposes `web_search` and `web_fetch` tools and runs in `fast` mode. Add it to Cursor with one entry in `~/.cursor/mcp.json`, or to Codex with `codex mcp add parallel-search --url https://search.parallel.ai/mcp`.

When you want the raw API, sign up at [platform.parallel.ai](https://platform.parallel.ai). Accounts get $5 in free credits every month, which covers up to 5,000 Turbo or Fast searches. Passing that key to the MCP server as a Bearer token raises its rate limits. Our roundup of [free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp) compares the keyless options, and [adding free web search to a coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent) walks through the setup with both the MCP server and the Parallel CLI.

## Get started

Point your agent at `https://search.parallel.ai/mcp` to test search with no key, or create a key on [platform.parallel.ai](https://platform.parallel.ai) and run the Python example above. The [Search API quickstart](https://docs.parallel.ai/search/search-quickstart) covers the SDKs, modes, and source policies.

## Frequently asked questions

### What is a web search API?

A web search API is an endpoint that takes a query and returns web results as structured JSON (URLs, titles, dates, and text excerpts) instead of a rendered page. AI agents and applications use one to bring current information from the public web into their code or a model’s context.

### Is there a free web search API?

Yes. Parallel’s Search MCP server is free to use anonymously at lower rate limits, and a Parallel account includes $5 in free credits every month (up to 5,000 Turbo or Fast searches). Brave includes $5 in monthly credits, Tavily gives 1,000 free credits a month, and SerpApi’s free plan covers 250 searches a month.

### What replaced the Bing Search API?

Microsoft retired the Bing Search APIs on August 11, 2025 and directed customers to Grounding with Bing Search, which works only inside Azure AI Agents. Teams that need raw results outside Azure moved to independent providers such as Brave, Parallel, Exa, or Tavily.

### Is the Google Custom Search API shutting down?

Yes. Google’s Custom Search JSON API is closed to new customers, and existing customers have until January 1, 2027 to transition. Google points site search users to Vertex AI Search, which covers up to 50 domains.

### What’s the difference between a SERP API and an AI search API?

A SERP API scrapes a search engine’s results page and returns its links and short snippets. An AI search API queries its own index and returns longer excerpts selected for a model to read, so an agent can answer without fetching each page.

### Do AI agents always need a web search API?

No. Agents answering from your own documents, working with stable facts, or running under a tight latency budget often do better without one. Add search when answers depend on recent events, changing facts, long-tail details, or citations a user needs to check.

**Related reading: **[How we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) · [Best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp) · [How to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) · [The best Google Custom Search API alternative](https://parallel.ai/articles/the-best-google-custom-search-api-alternative-for-ai-agents)

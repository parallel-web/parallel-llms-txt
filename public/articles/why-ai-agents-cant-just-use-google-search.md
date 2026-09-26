# Why can’t AI agents just use Google Search?

Why can’t AI agents just use Google Search? Google doesn’t sell its results to developers, its grounding product restricts what you can do with the output, scraping google.com is blocked and in court, and a browser agent pays for every page in tokens and time. This guide covers each constraint with dates, prices, and sources, then what agent builders use instead.

## What changed in 2025 and 2026

Two years ago a developer who wanted web results for software had three mainstream choices: Google’s Custom Search JSON API, Microsoft’s Bing Search API, or a scraper pointed at google.com. By the end of 2026 the first is gone, the second is already gone, and the third is harder and riskier to run than at any point in the last decade. The dates below come from Google’s developer documentation, Microsoft’s lifecycle notices, and the court dockets.

| Date | What happened | What it means for agents |
| --- | --- | --- |
| January 2025 | Google deploys SearchGuard, a JavaScript challenge on Search | Most SERP scrapers broke and had to rebuild their bypasses |
| August 11, 2025 | Microsoft retires the Bing Search APIs | The last general-purpose raw results API from a big index closes |
| September 2, 2025 | Judge Mehta orders search remedies in U.S. v. Google | Syndication and index data go to “Qualified Competitors” only |
| September 2025 | Google stops honoring the num=100 parameter | Pulling 100 results now takes 10 requests |
| December 19, 2025 | Google sues SerpApi over scraping Search | Scraping Google becomes an active legal dispute |
| January 20, 2026 | Google sets the end date for the Custom Search JSON API and limits new engines to 50 domains | Whole-web queries through the official API end |
| July 20, 2026 | The court dismisses Google’s DMCA claims against SerpApi, with leave to amend | The first ruling goes against Google; the case continues |
| July 31, 2026 | Reddit’s DMCA claims against SerpApi and Perplexity survive dismissal | A buyer of scraped Google data is also a defendant |
| August 2026 | Google rolls out google.com/goto passthrough links | Every result link needs an extra resolution hop |
| September 9, 2026 | Google documents the partner-only Web Search Service API | Full-web results exist, behind a partner agreement |
| Around September 13, 2026 | Rank-tracking vendors report most Google fetches blocked | Even established SERP vendors lose data |
| January 1, 2027 | The Custom Search JSON API stops for existing customers | No self-serve Google results API remains |

## Google has no self-serve search API

The [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) was the closest thing Google offered. Google built it to power a search box on a website: you configured a Programmable Search Engine, called the API, and got titles, snippets, and URLs back as JSON. It cost $5 per 1,000 queries after 100 free queries a day, with a hard ceiling of 10,000 queries a day, and its rankings never matched google.com exactly.

Google’s documentation now says the API “is closed to new customers,” and existing customers have until January 1, 2027 to move. In the [January 20, 2026 announcement](https://programmablesearchengine.googleblog.com/2026/01/updates-to-our-web-search-products.html), Google also required every new engine to use the “Sites to search” feature, capped at 50 domains, which ended whole-web search for new projects. The suggested replacement, Vertex AI Search, also covers up to 50 domains. Anyone who needs the full index gets an interest form.

On September 9, 2026, Google published documentation for the [Web Search Service API](https://developers.google.com/web-search-service/overview), which does perform a full web search and returns JSON over REST or gRPC. Every request needs a client ID tied to a partner agreement, plus the end user’s IP address, and returns at most 20 results. [Search Engine Journal](https://www.searchenginejournal.com/google-documents-partner-only-api-for-full-web-search-results/589194) noted that the pages don’t explain how to become a partner, what the service costs, or what the query limits are. For a team building an agent today, there’s no signup button. Our [Google Custom Search API alternative guide](https://parallel.ai/articles/the-best-google-custom-search-api-alternative-for-ai-agents) covers the migration options in detail.

## Grounding with Google Search sells answers, with conditions attached

What Google does sell openly is Grounding with Google Search: Gemini runs Google searches on your behalf and writes an answer with citations. It’s the best index on the market behind a model, and for a chat product built on Gemini it can be the right choice. For an agent pipeline, the pricing and the terms both matter.

On Gemini 3 models, Google bills $14 per 1,000 search queries after 5,000 free queries a month. Gemini 2.5 billed $35 per 1,000 grounded prompts. The unit changed from prompts to queries, and the model decides how many queries a prompt triggers, so one question that fans out into four searches costs four units.

The [Gemini API terms](https://ai.google.dev/gemini-api/terms) restrict what you can do with the output. You may only show grounded results in an application you own and operate, to the end user who submitted the prompt, alongside Google’s Search Suggestions displayed exactly as provided. You agree not to “cache, frame, syndicate, resell, analyze, train on, or otherwise learn from” grounded results or suggestions, and not to intersperse other content with them. Vertex AI is looser on one point: its [pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) lets customers under 1 million grounded prompts a day skip the Search Suggestions display at standard pricing. It’s stricter on another, because the Google Search tool can’t be combined with function calling in the same request. Pages whose owners disallow Google-Extended in robots.txt are excluded from grounding entirely.

Agent systems tend to do exactly the things those terms rule out: they pass retrieved text to another model, log it for evaluation, cache it across users, and merge it with results from other tools. We compare the two approaches in [Gemini’s Google Search grounding vs. Parallel](https://parallel.ai/articles/gemini-google-search-grounding-vs-parallel).

Microsoft followed the same path. After the Bing Search APIs shut down, Microsoft pointed customers to Grounding with Bing Search inside Azure AI Foundry, now $14 per 1,000 transactions, and its [pricing page](https://www.microsoft.com/en-us/bing/apis/grounding-pricing) states that outputs “are not directly accessible for use in other applications or programs.” Both companies that run a full-scale web index now sell a model’s answer instead of the results. Our [Bing API alternatives comparison](https://parallel.ai/articles/bing-api-comparison) covers what replaced it.

## Scraping Google is blocked, and it’s in court

Without an API, the fallback is to scrape google.com, either directly or through a SERP API vendor that does it for you. Google has spent two years making that more expensive.

**The technical blocking keeps escalating.** In January 2025 Google deployed SearchGuard, which sends a JavaScript challenge to unrecognized clients and expects the browser to send back a solve. [Search Engine Land’s teardown](https://searchengineland.com/inside-google-searchguard-467676) describes it as the system that broke nearly every SERP scraper overnight. In September 2025 Google dropped the num=100 parameter, so a scraper that used to fetch 100 results in one request now needs ten. In August 2026 Google confirmed it was routing result links through google.com/goto passthrough URLs, which adds a resolution hop for every link on the page. Around September 13, 2026, [Search Engine Roundtable reported](https://www.seroundtable.com/google-blocking-scrapers-and-tracking-tools-42118.html) that Nozzle saw about an 80% drop in the Google data it could collect, with the same pattern at DataForSEO.

**The legal picture is unsettled.** Google sued SerpApi on December 19, 2025, alleging that it bypassed SearchGuard to scrape and resell search results at a scale of “hundreds of millions” of requests a day. On July 20, 2026, Chief Judge Yvonne Gonzalez Rogers dismissed the DMCA claims. The court found that Google had adequately alleged circumvention, but held that Section 1201 only protects measures guarding copyrighted works, and many search results contain none. Google refiled a narrower complaint on August 10, SerpApi moved to dismiss again, and a hearing is set for October 13, 2026.

A parallel case extends the question to buyers. Reddit sued SerpApi, Oxylabs, AWMProxy, and Perplexity in October 2025, alleging the scraping companies pulled nearly three billion Google results pages containing Reddit content in two weeks of July 2025, and that Perplexity used that data. On July 31, 2026, the court in the Southern District of New York largely denied the motions to dismiss, allowing DMCA claims against both SerpApi and Perplexity to proceed. Both rulings came at the pleading stage, and neither is a finding that anyone broke the law. Still, if you build on scraped Google results, the Reddit case suggests the vendor’s legal exposure can extend to customers. Our guide to [whether scraping Google is legal](https://parallel.ai/articles/is-scraping-google-legal) walks through each legal theory and both rulings. Our [SerpApi vs. Parallel comparison](https://parallel.ai/articles/serpapi-vs-parallel) covers where SERP APIs remain the right tool, and [web unlocker vs. scraper vs. fetch](https://parallel.ai/articles/web-unlocker-vs-scraper-vs-fetch) explains the unblocking layer these vendors run.

## A browser agent pays for every page in tokens and time

The other route is to let the agent drive a real browser: open google.com, type the query, read the results, click through. Browser agents work, and for logins, forms, and multi-step transactions they’re the right tool. As a way to retrieve information, they’re expensive.

Each browser step is a model call. The agent captures the page as a screenshot, a DOM snapshot, or an accessibility tree, sends it to the model, gets back an action, executes it, and repeats. A research question that takes a search, three result pages, and some scrolling becomes ten or twenty model calls, and each call carries the page state. A [2025 paper on browser agent architecture](https://arxiv.org/pdf/2511.19477) gives the arithmetic: at 10,000 tokens per accessibility-tree snapshot, a 20-action workflow accumulates more than 200,000 tokens of context unless the agent trims it.

Pages are large to begin with. An [analysis by DEJAN](https://dejan.ai/blog/how-long-are-web-pages) put the typical page around 3,000 tokens of text but found a 99th percentile near 140,000. Raw HTML is far worse than text: in [Firecrawl’s own benchmark](https://www.firecrawl.dev/blog/llm-tokenization-across-models) of 15 pages, the raw HTML came to 4.1 million tokens against 191,000 as cleaned markdown, and five pages were too large for a 200,000-token context window.

Time adds up the same way. On Online-Mind2Web, [Browser Use reports](https://browser-use.com/posts/speed-matters) its own agent averaging 68 seconds per task at about 3 seconds per step, against 225 to 330 seconds for Gemini 2.5 Computer Use, Claude Sonnet 4.5, and OpenAI’s computer-using model. Those are vendor numbers on the vendor’s harness, and they’re still measured in minutes. A single call to our Search API takes about 200ms in Turbo mode and about 700ms in Fast mode, and comes back with excerpts already extracted.

A browser agent on google.com also hits every defense described above. SearchGuard exists to separate automated clients from people, and an agent is an automated client. Bing started asking visitors to verify they’re human in September 2026 as well. See our Learn pages on the [browser agent](https://parallel.ai/learn/browser-agent) and the [headless browser API](https://parallel.ai/learn/headless-browser-api) for where browsers fit in an agent stack.

## Why an index is the efficient shape for retrieval

A [web index](https://parallel.ai/articles/what-is-a-web-index) moves the expensive work out of the request path. The crawler fetches, renders, cleans, and stores pages once, and every later query reads from that store. The cost of crawling gets spread across millions of queries instead of being paid again, by the agent, on every question.

The shape of the output matters as much as the cost. A Google results page is built for a person deciding what to click: ten ranked links, a snippet of one or two lines written to earn the click, and ads. An agent can’t answer from a snippet, so a SERP-based pipeline needs a second stage that fetches each page, strips the boilerplate, and picks the passages worth sending to the model. An index built for models can do that selection up front and return the relevant passages with each URL, sized to a token budget you set.

Freshness is the usual objection to an index, because a stored copy can lag the live page. We handle that with a fetch policy on each request, so an agent can accept the indexed copy or ask for a live crawl when recency matters.

## The antitrust ruling won’t open Google to agent builders

The remedies in U.S. v. Google do force Google to share. Judge Mehta’s September 2025 decision and the [December 5, 2025 final judgment](https://law.justia.com/cases/federal/district-courts/district-of-columbia/dcdce/1:2020cv03010/223205/1461) require Google to offer “Qualified Competitors” a five-year syndication license for ranked organic results through a real-time API, along with certain search index and user-interaction data. A technical committee, appointed in January 2026, decides who qualifies.

The judgment targets rival general search engines, describing syndication as a “bridge” until a competitor can run its own index. It bars Qualified Competitors from sub-syndicating the results to others, so a qualifying search engine can’t resell Google results to agent developers. Google filed its appeal on January 16, 2026, and the Justice Department cross-appealed for stronger remedies, so the terms could still change. None of this creates a Google results API an agent team can sign up for.

## What agent builders use instead

Three kinds of product fill the gap, and they solve different problems.

**SERP APIs** such as SerpApi, Serper, DataForSEO, and Bright Data return a structured copy of what Google showed. For rank tracking, ad monitoring, and Google’s verticals like Flights and Shopping, nothing else gives you that data. They also inherit the blocking and the litigation described above, and they return snippets, so an agent still needs a fetch-and-clean stage behind them.

**Independent indexes** such as Brave Search crawl the web themselves and sell API access to their own results, which avoids scraping anyone.

**AI-native search APIs** run their own index and shape the output for models. Our Search API takes a natural-language objective and returns ranked URLs with dense excerpts from each page, in four modes: Turbo at ~200ms, Fast at ~700ms, Basic at ~1s, and Advanced at ~3s. Turbo and Fast cost $1 per 1,000 requests, Basic and Advanced $5 per 1,000, each with 10 results included. Parallel Search (advanced) leads the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (August 2026) at 75, level with Brave’s LLM context mode. We apply $5 in free credits every month automatically, which covers up to 5,000 Fast or Turbo searches, and our hosted Search MCP server at search.parallel.ai/mcp works without an account or API key.

A request takes an objective and optional keyword queries:

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="When does Google's Custom Search JSON API stop working for existing customers?",
    search_queries=["Custom Search JSON API discontinued"],
    mode="fast",
)

for result in search.results:
    print(result.url)
    for excerpt in result.excerpts:
        print(excerpt)
```

The response holds everything the model needs to answer and cite, with no browser and no scraper in the loop. Parallel is SOC 2 Type 2 certified, offers zero data retention, and commits contractually to not training on customer data.

Note: For the latest pricing, always check official documentation.

## Frequently asked questions

### Does Google have a search API?

Not one you can sign up for. The Custom Search JSON API is closed to new customers and stops working for existing ones on January 1, 2027. The Web Search Service API returns full-web results but requires a partner agreement with Google. Grounding with Google Search is open to any Gemini developer, but it returns a Gemini answer under terms that bar caching, storing, or analyzing the results.

### Is it legal to scrape Google search results?

It’s unsettled. In July 2026 a federal court dismissed Google’s DMCA claims against SerpApi, finding that the DMCA doesn’t protect search results with no copyrighted content, but Google refiled and the case is ongoing. In a separate case, a New York court let Reddit’s DMCA claims proceed against both SerpApi and Perplexity. Automated scraping also conflicts with Google’s terms of service, and Google’s technical blocking has increased since January 2025.

### Can I use Gemini’s Google Search grounding in my own agent?

You can if the agent runs on Gemini and shows the grounded answer to the user who asked. The Gemini Developer API also requires Google’s Search Suggestions displayed as provided, while Vertex AI waives that display under 1 million grounded prompts a day. The Gemini API terms forbid caching, analyzing, or training on grounded results, so pipelines that store results, evaluate them offline, or pass them to other models need a different source.

### Why not let the agent browse google.com like a person?

Each page costs a model call carrying thousands to hundreds of thousands of tokens, and a multi-step lookup takes a minute or more. Google’s SearchGuard is designed to detect automated clients, so a browser agent on google.com also runs into challenges and blocks. Browser agents make sense for logins, forms, and transactions, not for retrieval.

### What happens to the Custom Search JSON API on January 1, 2027?

Google stops serving it to existing customers. For searches across 50 or fewer domains, Google recommends Vertex AI Search. For full-web search, Google asks developers to fill out an interest form.

**Related reading: **[The best Google Custom Search API alternative for AI agents](https://parallel.ai/articles/the-best-google-custom-search-api-alternative-for-ai-agents) · [SerpApi vs. Parallel](https://parallel.ai/articles/serpapi-vs-parallel) · [Web crawling vs. web scraping](https://parallel.ai/articles/web-crawling-vs-web-scraping) · [What is web scraping?](https://parallel.ai/articles/what-is-web-scraping)

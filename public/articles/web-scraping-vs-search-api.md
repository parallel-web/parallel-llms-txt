# Web scraping vs. search API for LLM apps

The web scraping vs API choice for an LLM app comes down to whether the app already knows which page it needs, or has to find the pages that answer a question first. This guide covers what we measured on five real pages, the pipeline each approach makes you own, list-price costs including model tokens, and when scraping still beats a search API.

Scraping answers “get me this page.” A search API answers “find me the pages that answer this.” If your app starts from a known URL and needs exact fields from it, scrape. If it starts from a question, use a search API, and add an extract step when the excerpts aren’t enough.

Most LLM apps end up with a mix. The rest of the decision is about how many tokens, how much plumbing, and how much access risk you’re willing to own, and those are measurable.

## What we measured on five real pages

On five public pages, raw HTML averaged about 47,600 tokens per page, full-page markdown from our Extract API averaged about 8,200, and objective-focused excerpts averaged about 1,600. That’s roughly a 30x cut from raw HTML to excerpts, with large swings by page type.

We picked one page of each kind: a Python docs page, a BBC news article, a Wikipedia article, the Y Combinator company directory (rendered in the browser with JavaScript), and the “Attention Is All You Need” PDF on arXiv. For each, we recorded four inputs you could hand a model:

1. **Raw HTML** from a plain `requests.get` (for the PDF, the text pypdf extracted from the downloaded file).
2. **Rendered text** from headless Chromium via Playwright, reading `innerText` after page load plus a fixed 2-second wait.
3. **Extract full content**, with `full_content` enabled.
4. **Extract excerpts**, with an objective written for each page (for example, “What BLEU score did the Transformer reach on WMT 2014 English-to-German translation?”).

We counted tokens with tiktoken’s `o200k_base` encoding. Claude and other models tokenize differently, so treat the counts as close estimates. Each Extract call ran twice; sizes were identical both times.

| Page | Raw HTML | Rendered text | Extract full content | Extract excerpts |
| --- | --- | --- | --- | --- |
| Python asyncio docs | 177,639 chars / 50,636 tokens | 46,344 / 9,987 | 56,199 / 13,669 | 12,243 / 2,903 |
| BBC news article | 271,848 / 93,149 | 6,197 / 1,250 | none returned | 376 / 77 |
| Wikipedia, “Web scraping” | 235,431 / 71,572 | 28,674 / 6,341 | 49,462 / 12,357 | 9,398 / 2,245 |
| YC company directory (JS) | 39,974 / 12,729 | 5,906 / 1,683 | 15,307 / 4,305 | 7,555 / 2,163 |
| arXiv PDF (2.2 MB) | 39,510 / 10,128 (pypdf) | n/a | 41,521 / 10,776 | 1,847 / 468 |

| Page | requests | Playwright | Extract excerpts | Extract full content |
| --- | --- | --- | --- | --- |
| Python asyncio docs | 0.09–0.26s | 2.2–2.4s | 0.39–0.87s | 0.41–0.66s |
| BBC news article | 0.39s | 2.8s | 0.43–0.60s | 0.35–0.48s |
| Wikipedia | 0.12–0.14s | 2.2–2.4s | 0.38–3.56s | 0.50–1.57s |
| YC directory | 0.42–0.62s | 3.9–5.6s | 0.46–0.82s | 0.46–0.76s |
| arXiv PDF | 0.32–1.25s plus 0.8–0.9s parse | n/a | 0.38–0.71s | 0.40–0.43s |

A few results cut against a clean story. The YC directory’s raw HTML has almost no listings (41 characters of visible text before JavaScript runs), which is why rendering matters. Its excerpts came out larger than Playwright’s rendered text, because Extract kept the markdown links for each company. Extract’s full content held 40 of the 6,257 companies the directory lists, and our Playwright run didn’t scroll either. The BBC article returned only a 376-character excerpt with its headline and a few lines, and no full content. The BBC’s robots.txt disallows GPTBot, ClaudeBot, CCBot, PerplexityBot, and other AI user agents, and an NBC News article we tried first behaved the same way. Headless Chromium got more text from the BBC page than Extract did. Extract latency is low partly because it serves indexed content by default; the docs say live fetches can take up to a minute. Playwright times include our fixed 2-second wait.

The excerpts kept the answers. The PDF excerpt contained the 28.4 BLEU figure, the asyncio excerpt covered `asyncio.timeout` and `wait_for`, and the Wikipedia excerpt named hiQ, Craigslist, eBay, and Facebook cases.

## The pipeline each approach implies

Scraping makes you own every stage from URL to prompt. A search API owns discovery and ranking, and search plus extract adds page depth without adding a parser.

| Stage | Scrape it yourself | Search API | Search + extract |
| --- | --- | --- | --- |
| Discovery | You supply URLs, a sitemap, or a crawl frontier | Query in, ranked URLs out | Same as search |
| Fetching | HTTP client or headless browser, proxies, retries | Handled | Handled for the URLs you pick |
| Parsing | Selectors or HTML-to-markdown per site | Excerpts arrive as markdown | Excerpts or full markdown |
| Chunking | You split pages to fit context | Excerpts sized to the objective | Excerpts sized to the objective |
| Ranking | Embeddings or a reranker you run | Handled | Search ranks; you choose which URLs to extract |
| Freshness | Your recrawl schedule | Provider’s index | Index by default, live fetch on request |
| Anti-bot | Your problem (or an unlocker’s) | Provider’s crawler and its limits | Same limits; no CAPTCHA solving |
| Maintenance | Selectors break when layouts change | API versioning only | API versioning only |

Everything in the scraping column is doable, and all of it is yours to run. A [web scraping API](https://parallel.ai/articles/web-scraping-api-how-to-choose-the-right-tool-for-ai-ready-data) takes fetching and rendering off your plate, and an unlocker adds anti-bot handling; our guide to [unlockers, scrapers, and fetch APIs](https://parallel.ai/articles/web-unlocker-vs-scraper-vs-fetch) covers where each layer stops. Discovery, chunking, and ranking still sit with you. For the basics of the scraping side, start with [what web scraping is](https://parallel.ai/articles/what-is-web-scraping); for crawling a whole site, see [web crawling vs. web scraping](https://parallel.ai/articles/web-crawling-vs-web-scraping).

## What each approach costs at list price

Per 1,000 pages, model input tokens usually cost more than the fetch itself, so the size of what you send the model decides most of the bill. Here are the fetch-side list prices we checked on September 28, 2026:

| Service | List price | What you get |
| --- | --- | --- |
| Parallel Search API, Fast or Turbo mode | $1 per 1,000 requests, 10 results each | Ranked URLs with excerpts |
| Parallel Extract API | $1 per 1,000 URLs | Excerpts or full markdown, JS pages and PDFs |
| Bright Data Web Unlocker | $1.50 per 1,000 requests, pay as you go | Unblocked HTML or JSON, pay per success |
| ScraperAPI Hobby | $49/month for 100,000 credits; 1 credit per plain page, 10 with render=true | About $0.49 per 1,000 plain pages, $4.90 rendered |
| Firecrawl Standard | $99/month (monthly billing) for 100,000 credits; 1 credit per basic page | About $0.99 per 1,000 pages |
| Zyte API, pay as you go | $0.13–$1.27 per 1,000 HTTP responses; $1.01–$16.08 browser-rendered, by site tier | Per successful response |

Scraping services fetch pages you already know about. If your app starts from a question, you also need a way to find the URLs, which a search API does in the same call.

Now the model side. Averaged over our five pages, sending raw HTML to Claude Sonnet 5.5 at $2 per million input tokens costs about $95 per 1,000 pages. Rendered text drops that to about $12. Extract excerpts cost about $3.14 in tokens plus $1 for the Extract call, or about $4.14. With GPT-6 Luna at $0.10 per million input tokens, raw HTML costs about $4.76 per 1,000 pages and excerpts about $0.16, so the $1 Extract fee is most of that total. On a cheap model, a well-cleaned scrape can come out cheaper than excerpts; on a frontier model, the token count dominates. Output tokens and prompt caching change the totals, and neither is included here.

## Access, terms, and legal context

Access to pages is narrowing for every automated client, scraper and search provider alike. Cloudflare switched new domains to blocking AI crawlers by default on [July 1, 2025](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/). On [September 15, 2026](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/), it added a Disallow AI Training setting, extended Block to mixed-use crawlers including Googlebot, Bingbot, and Applebot, deprecated the old Block AI Bots toggle, and started offering ad-supported new domains a preset that blocks agents on pages with ads.

On the legal side, Judge Edward Chen granted Bright Data summary judgment in [Meta v. Bright Data](https://www.govinfo.gov/app/details/USCOURTS-cand-3_23-cv-00077/USCOURTS-cand-3_23-cv-00077-7) on January 23, 2024, holding that Facebook’s and Instagram’s terms don’t bar logged-off scraping of public data. That’s a narrow ruling about one contract. Logged-in scraping, personal data, and search engine results carry different risks; our explainer on [whether scraping Google is legal](https://parallel.ai/articles/is-scraping-google-legal) covers the SERP case.

A search API doesn’t make these limits disappear. Our Extract API doesn’t solve CAPTCHAs or bypass anti-bot systems, and the BBC result above shows what happens when a publisher restricts automated access. What changes is who operates the crawler and keeps up with robots.txt and blocking rules: you, or your provider.

## When scraping still wins

Scrape when you need something only a browser session or a site-specific parser can give you, as in these cases:

- **Logged-in or interactive pages.** Dashboards, account pages, and flows that need clicks or form input sit outside any public index.
- **Exact DOM fields.** A price in a specific `span`, a SKU, or a table cell you’ll write straight to a database.
- **Full-site crawls.** Every page of a docs site or catalog, including deep pages no search result will surface.
- **Pages no index has.** New, obscure, or intranet sites.
- **Fixed-URL monitoring.** Price or stock checks on the same 500 product pages every hour.

In these cases the URL list is known and stable, and you want deterministic output more than relevance. Infinite-scroll pages like the YC directory are a good example: you’ll want a script that scrolls, not a single fetch.

## When a search API wins

Use a search API when the question comes first and the URLs don’t exist yet in your code. Open-ended questions, discovery across unfamiliar sources, freshness across many sites, and agent loops that call a tool dozens of times per task all fit here.

Agent loops show the difference most clearly. An agent that scrapes has to guess URLs, fetch whole pages, and spend context on navigation and footers. An agent with a search tool gets ranked sources and excerpts in one call. Our [Fast mode](https://parallel.ai/articles/parallel-search-fast-vs-turbo) is documented at about 700ms per call and Turbo at about 200ms, both $1 per 1,000 requests. For more on how these APIs work, see [what a web search API is](https://parallel.ai/articles/what-is-a-web-search-api).

## A hybrid pattern: search, then extract

Search first to find sources, then extract only the top URLs. Our docs recommend giving agents both tools for this reason. We ran this script against the live API on September 28, 2026; it took about 2 seconds end to end and cost two requests.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])
question = "What changed in Cloudflare's AI crawler controls on September 15, 2026?"

# 1. Discovery: ranked URLs with excerpts, $1 per 1,000 requests in fast mode
search = client.search(
    objective=question,
    search_queries=["Cloudflare AI crawler September 15 2026", "Cloudflare Disallow AI Training"],
    mode="fast",
)
for r in search.results[:5]:
    print(r.url, sum(len(e) for e in r.excerpts), "chars")

# 2. Depth: pull focused excerpts from the top 3 URLs, $1 per 1,000 URLs
top_urls = [r.url for r in search.results[:3]]
extract = client.extract(urls=top_urls, objective=question)

context = "\n\n".join(
    f"Source: {r.url}\n" + "\n".join(r.excerpts) for r in extract.results
)
for err in extract.errors:
    print("not returned:", err)
print(len(context), "chars of context ready for the model")
```

Our run returned Cloudflare’s developer docs and press release in the top results and about 7,500 characters of context from three URLs. Check `extract.errors` in production: URLs the API couldn’t return show up there, and those are the pages to route to a scraper or skip.

## Get started

Create a key at [platform.parallel.ai](https://platform.parallel.ai); every account gets $5 in free credits every month (up to 5,000 Turbo or Fast searches). The [Search API quickstart](https://docs.parallel.ai/search/search-quickstart) and [Extract API quickstart](https://docs.parallel.ai/extract/extract-quickstart) have SDK examples in Python and TypeScript. To try search in an agent without writing code, connect the free Search MCP at `https://search.parallel.ai/mcp`; it needs no account or key.

## Frequently asked questions

### Is web scraping better than an API for LLM apps?

It depends on whether you know the URL. Scraping is better for fixed pages and exact fields; a search API is better when the app starts from a question and needs to find sources.

### How many tokens does a web page use in an LLM prompt?

In our test, raw HTML ran from about 12,700 to 93,000 tokens per page. Clean excerpts for a specific question ran from under 100 to about 2,900 tokens.

### Can a search API replace a scraper?

For open-ended questions, often yes. For logged-in pages, full-site crawls, infinite-scroll pages, or pages a publisher blocks, keep a scraper.

### Does the Parallel Extract API bypass anti-bot protection?

No. Extract handles JavaScript-rendered pages and PDFs, but it doesn’t solve CAPTCHAs or bypass blocking, and it can return partial content from restricted sites.

### What does web scraping for LLMs cost compared with a search API?

Fetching is cheap either way, from about $0.13 to $16 per 1,000 pages on scraping APIs and $1 per 1,000 on our Search and Extract APIs. On a frontier model, the tokens you send usually cost more than either.

**Related reading: **[Web scraper vs. web extraction](https://parallel.ai/articles/web-scraper-vs-web-extraction) · [Web unlocker vs. scraper vs. fetch](https://parallel.ai/articles/web-unlocker-vs-scraper-vs-fetch) · [Firecrawl vs. Parallel](https://parallel.ai/articles/firecrawl-vs-parallel) · [What is a web search API?](https://parallel.ai/articles/what-is-a-web-search-api)

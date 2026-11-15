# The best web extraction APIs for LLMs in 2026

A web extraction API takes a URL and returns the page as clean markdown, text, or JSON that a model can read. This guide compares seven of them on price per 1,000 pages, free tiers, focused excerpts, structured JSON, and crawling, with every figure checked against the vendor's own pages on November 11, 2026.

## Which web extraction API should you use?

Pick by the job. If your agent already has the URLs and needs the parts of each page that answer a question, [Parallel Extract](https://parallel.ai/products/extract) returns ranked excerpts or full markdown for $1 per 1,000 URLs, up to 20 URLs per request. If you need to crawl whole sites, click through pages, or get schema-shaped JSON in one call, Firecrawl and Context.dev are the stronger picks. Jina Reader works with no API key at all, and Crawl4AI is the open-source option you run yourself.

Parallel makes one of the APIs on this list. Every price and limit below was checked against the vendor's own pricing or documentation page on November 11, 2026, and each one links to its source. We didn't run a head-to-head extraction benchmark for this guide, so treat it as a map of what each API offers, then test the shortlist on your own URLs.

## What is a web extraction API?

A web extraction API fetches a page you name, renders it if it needs JavaScript, strips navigation, ads, and other boilerplate, and returns the main content as markdown, text, or JSON that a model can read. It's a different job from a search API, which finds pages, and from a crawler, which discovers pages by following links. Most agent pipelines use search to find URLs and extraction to read them. [Web scraper vs. web extraction](https://parallel.ai/articles/web-scraper-vs-web-extraction) and [web crawling vs. web scraping](https://parallel.ai/articles/web-crawling-vs-web-scraping) cover the distinctions in more depth.

## What to compare before you pick one

### Do you need the full page or just the relevant parts?

Full-page markdown carries everything on the page, including sections your model doesn't need, and you pay for those tokens on every call. Several APIs take a question or objective and return only the matching passages: Parallel's objective and keyword queries, Tavily's query with chunks_per_source, Exa's highlights, Firecrawl's highlights and question formats, and Crawl4AI's BM25 filter. For indexing a corpus you usually want the full page. For an agent answering a question, focused excerpts keep the context window small.

### How is it billed?

Most APIs bill per page or URL (Parallel, Firecrawl, Context.dev, Exa). Tavily bills per batch of five successful URLs, and Jina bills by the tokens it returns. Extras change the math quickly: schema-based JSON costs 5 credits a page on Firecrawl and Context.dev, and Exa bills each content type you request separately.

### Does it handle JavaScript and PDFs?

Parallel, Firecrawl, Context.dev, and Jina all document JavaScript rendering and PDF support. Firecrawl charges 1 credit per PDF page, and Context.dev adds 1 credit for each page its OCR recovers. Results still vary by site, so test the pages you care about most: single-page apps, news sites, and heavily protected retailers are where APIs differ.

### Do you need crawling or browser actions?

If you need every page of a docs site, or need to click and fill forms before reading, look for crawl and actions endpoints. Firecrawl, Context.dev, Tavily, and Crawl4AI have crawl endpoints, and Exa Contents can crawl subpages. Parallel Extract reads only the URLs you pass in, so pair it with [Parallel Search](https://parallel.ai/products/search) to find them.

## The best web extraction APIs for LLMs in 2026

### 1. Parallel Extract

Parallel's [Extract API](https://docs.parallel.ai/extract/extract-quickstart) converts public URLs into LLM-ready markdown, including JavaScript-heavy pages and PDFs. Pass up to 20 URLs in one synchronous request. Add an objective in plain language, plus optional keyword queries, and it returns ranked excerpts aligned to that goal. Set full_content to true and you get the whole page as markdown from the top, or both in the same call. Each result carries the URL, title, publish date when one is available, and the date the content was acquired.

It costs $1 per 1,000 URLs, whether you ask for excerpts or full content, and requests return in 1 to 20 seconds. The default rate limit is 600 requests a minute, or 1,500 on the [Scale plan](https://parallel.ai/pricing). A fetch policy chooses between Parallel's cached index and a live fetch, so you can trade freshness for speed on each request. New accounts can earn up to $80 in credits at signup, and accounts with a card on file get $5 in credits every month. [Parallel MCP](https://parallel.ai/mcp) exposes the same capability as its free web_fetch tool, with no account or key.

Where it falls short: there's no crawl, map, or browser-actions endpoint, and Extract doesn't return schema-shaped JSON itself (the Task API does that, from $5 per 1,000 runs). It fits best when your agent already knows which URLs to read and wants only what matters on each page.

### 2. Firecrawl

Firecrawl's [Scrape endpoint](https://docs.firecrawl.dev/features/scrape) turns a URL into markdown, HTML, links, screenshots, or structured JSON, and handles JavaScript-rendered pages and PDFs. It's the broadest toolkit on this list: Crawl and Map for whole sites, Interact for clicking and filling forms, batch scraping, and an open-source core you can self-host. You can start without an API key at lower rate limits.

Each page costs 1 credit, JSON format adds 4, and PDFs cost 1 credit per page. According to [Firecrawl's pricing page](https://www.firecrawl.dev/pricing), the free plan gives 1,000 credits a month with no card and 2 concurrent requests. Hobby is $19 a month for 5,000 credits, Standard $99 for 100,000 (about $0.99 per 1,000 pages), Growth $399 for 500,000, and Scale $749 for 1,000,000. Zero data retention is on Enterprise and adds 1 credit per page. Firecrawl suits ingestion pipelines that need whole sites, rich formats, or browser control. See [Parallel vs. Firecrawl](https://parallel.ai/compare/firecrawl-vs-parallel) and [the best Firecrawl alternatives](https://parallel.ai/articles/firecrawl-alternatives) for more.

### 3. Context.dev

Context.dev's Scrape endpoint returns markdown, HTML, screenshots, images, or CSS-parsed fields in one call, alongside Map, Crawl (up to 500 pages a call, or 25,000 through Batches), Search, and an Answers endpoint. JavaScript rendering, anti-bot bypass, and proxies are included in the base price.

A standard scrape is 1 credit, browser actions raise that to 2, and successful JSON extraction adds 4, for 5 credits a page. Most failed requests aren't billed. Per [Context.dev's pricing page](https://www.context.dev/pricing), the free tier gives 1,000 credits a month with no card and 2 concurrent requests. Developer is $20 a month for 10,000 credits and Pro $90 for 100,000 (about $0.90 per 1,000 pages). It's a strong pick when you want scraping, crawling, and structured fields from one hosted API. [Context.dev vs. Parallel](https://parallel.ai/articles/context-dev-vs-parallel) compares the two in detail.

### 4. Jina Reader

[Jina Reader](https://jina.ai/reader) is the quickest way to try extraction: prepend https://r.jina.ai/ to any URL and you get LLM-friendly text back, with no key, at 20 requests a minute. A free API key raises that to 500 a minute and comes with 10 million free tokens, and a premium key allows 5,000. Reader reads PDFs, captions images with a vision model, and takes headers for CSS selectors, waiting for elements, and token budgets. It bills by output tokens, so short pages cost less than long ones, and Jina lists its average Reader latency at 7.9 seconds. [Jina AI Reader vs. Parallel](https://parallel.ai/articles/jina-ai-reader-vs-parallel) compares the two in detail.

### 5. Tavily Extract

[Tavily Extract](https://docs.tavily.com/documentation/api-reference/endpoint/extract) pulls content from up to 20 URLs in one request, as markdown or text. Give it a query and chunks_per_source, and it returns only the most relevant chunks of each page. Basic extraction costs 1 credit per 5 successful URLs, and advanced extraction, which picks up tables and embedded content, costs 2 credits per 5. Failed URLs aren't billed.

Per [Tavily's credits page](https://docs.tavily.com/documentation/api-credits), the free plan's 1,000 monthly credits cover up to 5,000 basic extractions with no card. Pay-as-you-go is $0.008 a credit, about $1.60 per 1,000 basic URLs, falling to $1.00 on the $500-a-month Growth plan. Tavily also has Map and Crawl endpoints, so it's a natural fit if you already use it for search. See [Parallel vs. Tavily](https://parallel.ai/compare/tavily-vs-parallel).

### 6. Exa Contents

Exa's Contents endpoint returns full page text, highlights, or AI summaries for URLs you already have, and can crawl subpages. It costs $1 per 1,000 pages per content type, so requesting text and highlights for one page counts as two. [Exa's pricing page](https://exa.ai/pricing) lists a free plan with $10 in credits a month plus a $10 onboarding bonus, with no payment method. It's the easy choice if your pipeline already runs on Exa search. See [Parallel vs. Exa](https://parallel.ai/compare/exa-vs-parallel).

### 7. Crawl4AI

[Crawl4AI](https://github.com/unclecode/crawl4ai) is an open-source Python crawler and scraper under the Apache 2.0 license. It generates markdown from each page, with a fit_markdown option that filters out menus and boilerplate or keeps only passages that match a query, plus CSS, XPath, and LLM-based extraction. You run the browsers, proxies, and scaling yourself, so there's no per-page fee and no vendor rate limit. A hosted Crawl4AI Cloud gives 1,000 free credits a month, with paid plans from $10 a month. [Crawl4AI vs. Parallel](https://parallel.ai/articles/crawl4ai-vs-parallel) covers the build-or-buy trade-off.

## Web extraction APIs side by side

Checked against each vendor's pricing and documentation pages on November 11, 2026. Price per 1,000 pages is the plain markdown rate.

| API | Price per 1,000 pages | Free tier | Focused excerpts | Structured JSON | Crawl |
| --- | --- | --- | --- | --- | --- |
| Parallel Extract | $1, pay as you go | Up to $80 at signup, $5/month with a card; free web_fetch in Parallel MCP | Yes, objective and keyword queries | Through the Task API | No |
| Firecrawl | $0.99 (Standard) to $3.80 (Hobby) | 1,000 credits/month, no card | Highlights and question formats (+4 credits) | Yes, +4 credits a page | Yes |
| Context.dev | $0.90 (Pro) to $2 (Developer) | 1,000 credits/month, no card | Highlights (+1 credit) | Yes, 5 credits a page | Yes, up to 500 pages a call |
| Jina Reader | Billed by output tokens | No key at 20/min; 10M tokens per new key | Not documented | Not covered here | No |
| Tavily Extract | $1.00 (Growth) to $1.60 (pay as you go), basic | 1,000 credits/month (up to 5,000 URLs), no card | Yes, query and chunks_per_source | No | Yes |
| Exa Contents | $1 per content type | $10/month plus $10 at signup, no card | Highlights | AI summaries | Subpages |
| Crawl4AI | Free to self-host; cloud from $10/month | Open source; cloud 1,000 credits/month | BM25 query filter | CSS, XPath, or LLM | Yes |

Check official documentation for current pricing.

## How to get clean markdown from a URL with Parallel

One request can return both the full page and the passages that matter for your question:

```sh
curl https://api.parallel.ai/v1/extract \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "urls": ["https://www.un.org/en/about-us/history-of-the-un"],
    "objective": "When was the United Nations established?",
    "advanced_settings": {"full_content": true}
  }'
```

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

extract = client.extract(
    urls=["https://www.un.org/en/about-us/history-of-the-un"],
    objective="When was the United Nations established?",
    advanced_settings={"full_content": True},
)

for result in extract.results:
    print(result.title, result.url)
    print(result.excerpts[0][:200])
```

Without an objective or keyword queries, Extract returns whole-page markdown. In any MCP client, the web_fetch tool on [Parallel MCP](https://parallel.ai/mcp) does the same with no key, and [how to add free web search to your coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent) walks through setup. The [Extract quickstart](https://docs.parallel.ai/extract/extract-quickstart) covers every parameter.

## Which extraction API fits your project?

- **Your agent has URLs and needs answers from them.** Parallel Extract with an objective, or Tavily Extract if you already use Tavily for search.
- **You're indexing whole sites for RAG.** Firecrawl or Context.dev, for their crawl and batch endpoints.
- **You need schema-shaped JSON from product or listing pages.** Firecrawl or Context.dev JSON extraction.
- **You're reading millions of pages a month.** Compare Context.dev Scale ($0.50 per 1,000) with Firecrawl Scale (about $0.75), and measure success rates on your own domains.
- **You want to try it in the next minute.** Jina Reader with no key, or the free web_fetch tool in Parallel MCP.
- **Data can't leave your infrastructure.** Self-hosted Crawl4AI.

## Frequently asked questions about web extraction APIs

### What is the best API to convert a URL to markdown?

It depends on what happens next. For an LLM that needs the relevant parts of a few pages, Parallel Extract returns ranked excerpts and full markdown for $1 per 1,000 URLs. For whole-site ingestion, Firecrawl and Context.dev add crawling and JSON output. To try it free with no key, prepend r.jina.ai to the URL.

### Is there a free web extraction API?

Several. Jina Reader works with no key at 20 requests a minute. Firecrawl and Context.dev each give 1,000 pages a month with no card, and Tavily's 1,000 monthly credits cover up to 5,000 basic extractions. Parallel MCP includes a free web_fetch tool, and the Parallel API gives $5 in credits a month with a card on file, enough for 5,000 URLs. Crawl4AI is free to self-host. [The best free web search APIs](https://parallel.ai/articles/best-free-web-search-api) covers the search side.

### What's the difference between a scraping API and an extraction API?

A scraping API focuses on getting the page past rendering and bot protection, and hands you HTML or markdown. An extraction API also decides what on the page matters, returning the main content, focused excerpts, or structured fields. Most products on this list do some of both. [Web scraping vs. search API for LLM apps](https://parallel.ai/articles/web-scraping-vs-search-api) explains where search fits in.

### Do extraction APIs work on JavaScript-heavy sites and PDFs?

Parallel, Firecrawl, Context.dev, and Jina all document JavaScript rendering and PDF support. Results still vary by site, so run a sample of your hardest URLs through each candidate before you commit.

### Which web extraction API is cheapest?

By list price per plain page at volume, Context.dev Scale is lowest here at $0.50 per 1,000, and Pro works out to about $0.90. Firecrawl is $0.99 on Standard and about $0.75 on Scale, both on monthly plans. Without a plan, Parallel and Exa are $1 per 1,000 pay as you go. Compare on cost per useful answer too: focused excerpts send fewer tokens to your model, and JSON extraction can multiply the per-page price by five or more.

Related reading: [The best Firecrawl alternatives](https://parallel.ai/articles/firecrawl-alternatives) / [Jina AI Reader vs. Parallel](https://parallel.ai/articles/jina-ai-reader-vs-parallel) / [Crawl4AI vs. Parallel](https://parallel.ai/articles/crawl4ai-vs-parallel) / [AI data extraction at scale](https://parallel.ai/articles/ai-data-extraction-how-to-extract-structured-data-from-websites-at-scale)

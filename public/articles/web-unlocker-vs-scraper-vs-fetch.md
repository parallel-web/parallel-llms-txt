# Web unlocker vs. scraper vs. fetch: which layer does your pipeline need?

Web unlocker, scraper, and fetch describe three different ways to get a web page into your code, and choosing the wrong one is how teams end up paying for proxies they do not need or parsing HTML they never wanted. This guide covers what each layer does, what it returns, how vendors price it, the 2026 compliance picture, and how AI agents change the choice.

## Three words for three jobs

Fetch means retrieving the bytes at a URL. A scraper fetches pages and parses data out of them, often after discovering the pages by crawling. A web unlocker is a fetch that is engineered to succeed against anti-bot defenses, and it hands back raw HTML for you to parse yourself.

Each layer exists because the one below it stopped working for someone. Plain fetch failed on JavaScript-heavy pages and on sites that block automated traffic. Scrapers grew rendering and proxy features to cope, then became products. Unlockers split the hardest part, getting a successful response from a protected site, into a service of its own. Knowing which failure you are actually hitting tells you which layer to buy.

## Fetch: the baseline

A fetch is an HTTP GET. Every language ships one, and the response is whatever the server returned: an HTML document, a JSON payload, a PDF. For a public page with server-rendered HTML and no bot protection, fetch is all you need, and it costs nothing beyond bandwidth.

Fetch breaks in three predictable ways. Pages that build their content with JavaScript return an empty shell, because no browser ran the scripts. Sites behind services like Cloudflare, DataDome, or PerimeterX return a challenge page or a 403 instead of content. And even when fetch succeeds, the response is full of navigation, ads, and script tags, so anyone feeding it to a model pays tokens for boilerplate.

For AI agents, "fetch" has taken on a second meaning. A `web_fetch` tool is the function an agent calls when it already knows the URL and needs the content. Whether a bare HTTP client or a managed API that renders, cleans, and trims the page sits behind that tool decides how much of the response is usable.

## Scraper: fetch plus parsing

A scraper adds two things to fetch. It parses the response into structured data with selectors or a model, and it usually manages the retrieval mechanics at scale: request scheduling, retries, browser rendering, and IP rotation. [Our web scraping guide](https://parallel.ai/articles/what-is-web-scraping) covers the mechanics. A scraper owns the whole path from URL to record.

Scraping APIs package this as a service. Send a URL, get back HTML, markdown, or JSON, with rendering and proxies handled on the vendor's side. Pricing is per request or per credit, and the credit cost climbs with difficulty. ScraperAPI's own documentation puts its minimum at $3 per 1,000 requests without rendering and $7 with rendered pages, and its credit multipliers add ten credits when a target sits behind bot protection. Firecrawl charges one credit per basic page and $99 per month for 100,000 credits on its Standard plan. Some of these vendors also sell search, crawling, and browser sessions under the same key. We compared several of them with Parallel, including [Firecrawl](https://parallel.ai/articles/firecrawl-vs-parallel), [ScrapingBee](https://parallel.ai/articles/scrapingbee-vs-parallel), and [Apify](https://parallel.ai/articles/apify-vs-parallel).

A scraper is the right layer when you need fields, not pages, and when the sites are yours to parse: known layouts, known schemas, recurring jobs.

## Web unlocker: fetch that gets through

A web unlocker is a service that takes a URL, routes the request through a proxy network, sets browser-like headers and fingerprints, renders JavaScript when needed, solves CAPTCHAs, and retries with different configurations until the site returns a real page. You get raw HTML back, and parsing is left to you. Our [web unlocker glossary entry](https://parallel.ai/learn/web-unlocker) has the short definition.

Vendors describe the product in nearly identical terms. Bright Data's docs say its Web Unlocker API unlocks any public web page in a single call with a 98 percent success rate and charges only for successful requests. Oxylabs calls its Web Unblocker an AI-powered proxy solution and states that it returns raw HTML only, with no parsing. Decodo's Site Unblocker integrates as a proxy and advertises browser fingerprinting and JavaScript rendering. Zyte API prices every request by the target site's difficulty tier and charges only for successful responses.

| Unlocker | Integration | Returns | Billing basis | Entry price |
| --- | --- | --- | --- | --- |
| Bright Data Web Unlocker | REST endpoint or proxy | HTML or JSON | Per successful request | $1.50 per 1K pay as you go; $1.30 per 1K on the $499 per month plan; 5K free per month |
| Oxylabs Web Unblocker | Proxy-like single entry node | Raw HTML | Per GB of traffic, successful only | $9.40 per GB list on the Micro plan; 1 GB free trial |
| Decodo Site Unblocker | Proxy-like | Raw HTML | Per request or per GB | From $0.95 per 1K requests or $10 per GB |
| Zyte API | REST endpoint | HTML body or browser-rendered | Per successful response, by site tier | $0.13 to $1.27 per 1K HTTP; $1.01 to $16.08 per 1K browser-rendered |

Prices are list prices from vendor pages in September 2026 and change often. Two patterns in the table matter more than the numbers. Every vendor bills on success, so you pay only for pages you actually got. And every vendor returns HTML, so an unlocker feeds a scraper rather than replacing one.

Independent measurements exist. AIMultiple's web unblocker benchmark ran roughly 40,000 requests against protected sites such as Amazon and ranks vendors on success rate and response time. In the response-time ranking, Zyte led at 1.75 seconds, followed by Bright Data at 2.38 seconds and Decodo at 3.43 seconds. Treat vendor success-rate claims of 98 to 100 percent as claims until you have run your own target list.

## The three layers compared

| Dimension | Fetch | Scraper | Web unlocker |
| --- | --- | --- | --- |
| Input | A URL | URLs, or a crawl that finds them | A URL |
| Output | Raw response | Parsed fields, markdown, or HTML | Raw HTML |
| Renders JavaScript | No | Usually, as an option | Yes, when needed |
| Gets past anti-bot defenses | No | Sometimes, at extra credit cost | Yes, by design |
| Who writes the parsing | You | Vendor or you | You |
| Cost basis | Bandwidth and compute | Per request or credit, scaled by difficulty | Per successful request or per GB |
| Best for | Public, static, unprotected pages | Recurring structured collection from known sites | Protected targets where you own the parser |

## What 100,000 pages cost at each layer

Take a job that needs 100,000 pages read once. At the fetch layer, the pages themselves are free, but someone has to build rendering, retries, and parsing, and the pages behind bot protection simply will not load. At the scraper-API layer, list prices put the same volume between $300 and $700 for a vendor like ScraperAPI depending on rendering, and around $99 on a Firecrawl Standard plan if every page is a basic scrape. At the unlocker layer, Bright Data's pay-as-you-go rate comes to $150, after which you hold 100,000 HTML documents and still need to parse them.

None of those numbers includes the thing an AI application actually pays for, which is tokens. Raw HTML for a typical article runs several times the token count of its clean text. If a model reads the pages, the cheapest layer on the invoice can be the most expensive one in the LLM bill.

## Compliance in 2026

The compliance picture differs by layer, and it changed this year.

On the legal side, the leading US precedent still favors collection of public data. In Meta v. Bright Data, Judge Edward Chen ruled on January 23, 2024 that Facebook's and Instagram's terms do not bar logged-off scraping of public data, and Meta later dismissed its remaining claim. X Corp.'s separate suit against Bright Data was dismissed in May 2024 as preempted by the Copyright Act, then partially revived. These cases turn on public versus logged-in data and on contract terms, and they do not bless every technique.

On the technical side, site owners have new defaults on their side. Cloudflare began blocking AI crawlers by default for new customers on July 1, 2025 and launched Pay Per Crawl the same day. On July 1, 2026 it announced Pay Per Use, and from September 15, 2026 new Cloudflare domains block bots classified as Training or Agent on pages that display ads, with mixed-purpose crawlers blocked outright. Cloudflare also says more than half of AI crawl traffic re-fetches pages that have not changed.

An unlocker is, by definition, a tool for getting a response a site tried not to give. That can be legitimate: price monitoring on public retail pages, or research on public records behind a rate limiter. It is also a decision your legal team should make on purpose, target by target, rather than a default setting in a fetch client. A fetch or extract API that honors site signals and serves cached content where it can sits on the easier side of that line.

## What agents actually need

Most agent workloads do not need a scraper's schema or an unlocker's proxy pool. They need the content of a known URL, rendered, cleaned, and trimmed to the part that answers the question, with a source URL attached so the answer can be cited.

The [Parallel Extract API](https://parallel.ai/products/extract) is built as that kind of fetch. It takes up to 20 URLs per request and an optional `objective`, renders JavaScript-heavy pages and PDFs, and returns clean markdown. With an objective, you get ranked excerpts focused on the goal. With `full_content: true`, you get the whole page. Pricing is $1 per 1,000 URLs, latency is roughly 1 to 20 seconds, and the default limit is 600 requests per minute. A `fetch_policy` setting chooses between cached content for speed and a live fetch for freshness, and the API defaults to a dynamic policy based on the URL and objective.

```bash
curl https://api.parallel.ai/v1/extract \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "urls": ["https://blog.cloudflare.com/introducing-pay-per-crawl/"],
    "objective": "What does Cloudflare charge AI crawlers for, and who sets the price?"
  }'
```

Extract is not an unlocker. It does not sell residential IPs, session persistence, or CAPTCHA solving, and it will not log into anything. If your target list is mostly protected retail or social pages and you own the parsers, an unlocker is the right layer. If your target list is the open web and the consumer is a model, Extract does the fetch, the rendering, and the trimming in one call, and pairs with the [Search API](https://parallel.ai/products/search) for finding the URLs in the first place.

## Decision guide

- **You know the URLs, the pages are public, and a model reads the result.** Use a managed fetch such as Extract with an objective. Skip the scraper and the proxy bill.
- **You need typed fields from the same sites every day.** Use a scraper, either your own or a scraping API. Add an unlocker behind it only for the targets that block you.
- **The target actively blocks you, and you have the parser and the legal sign-off.** Use an unlocker and budget for parsing on top.
- **You are not sure why pages fail.** Check whether the failure is rendering, blocking, or parsing before buying anything. Each has a different fix.

## FAQ

### Is a web unlocker the same as a proxy?

No. A proxy gives you a different IP address. An unlocker sits on top of a proxy network and adds fingerprinting, JavaScript rendering, CAPTCHA solving, and retries, and it typically bills only for successful responses.

### Is a web unlocker a scraper?

No. An unlocker returns raw HTML from hard-to-reach pages. A scraper parses pages into data. Many teams run an unlocker as the retrieval step inside a scraper.

### Can a fetch API replace a web unlocker?

For public pages, often yes, especially if the API renders JavaScript and serves cached content. For targets with aggressive anti-bot protection or logged-in content, no. That is what unlockers are for.

### What should an AI agent use to read a page?

A fetch layer that returns clean, objective-focused content with the source URL. Parallel Extract is one such layer at $1 per 1,000 URLs. Raw HTML from an unlocker or a plain fetch costs more in tokens than it saves in fees.

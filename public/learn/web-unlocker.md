# Web unlocker

A web unlocker is a service that retrieves pages from websites that block automated traffic. It routes each request through a proxy network, mimics a real browser, solves CAPTCHAs, and retries until the site returns a real page, then hands back the raw HTML.

A web unlocker is a managed service that fetches web pages from sites that block bots, and returns the raw HTML for you to parse.

## What is a web unlocker?

A web unlocker, also sold as a "web unblocker" or "site unblocker," is a fetch service built for one job: getting a successful response from a page that tries to refuse automated requests. You send a URL. The service picks a proxy, sets headers and a browser fingerprint that look like a real user, renders JavaScript if the page needs it, solves any CAPTCHA it meets, and retries with a different setup when a request fails. The page comes back as HTML.

The category grew out of the proxy business. Rotating IP addresses used to be enough to avoid blocks. Modern bot defenses such as Cloudflare, DataDome, and PerimeterX inspect TLS signatures, browser fingerprints, and behavior, so a bare proxy no longer gets through. Vendors bundled the whole evasion stack into a single endpoint and priced it per successful page.

## Key characteristics

- **Single request in, HTML out:** Bright Data's documentation describes its Web Unlocker API as unlocking a public web page in one call and returning HTML or JSON. Oxylabs states that its Web Unblocker returns raw HTML only, with no parsing.
- **Proxy rotation and fingerprinting:** The service chooses the proxy network for the target site and sets headers, cookies, and browser parameters to match real-user traffic.
- **JavaScript rendering and CAPTCHA solving:** Pages that build themselves in the browser are rendered before return, and CAPTCHAs are solved automatically as part of the request.
- **Pay per success:** Vendors bill only for requests that return a real page. Bright Data measures usage as the cost of 1,000 successful requests, and Oxylabs excludes failed attempts from traffic charges.
- **Not a parser:** An unlocker stops at retrieval. Extracting fields or clean text from the HTML is a separate step you build or buy.

List pricing in September 2026 ranges from about $0.95 per 1,000 requests at Decodo to $1.50 per 1,000 pay as you go at Bright Data, with Oxylabs billing per gigabyte of traffic and Zyte pricing each request by the target site's difficulty tier. Vendors advertise success rates between 98 and 100 percent. An independent benchmark from AIMultiple, based on roughly 40,000 requests against protected sites, ranked Zyte fastest at 1.75 seconds per response, with Bright Data at 2.38 seconds.

## Example

A price-monitoring team tracks 50,000 product pages on retail sites that block datacenter IPs. Its scraper used to spend most of its time on retries. The team routes every request through an unlocker instead, gets HTML back for nearly all of them, and keeps its own parsers to pull price and stock fields out of the pages. The unlocker replaced the retrieval layer and nothing else.

Compare that with an AI agent that needs to read a public news article or a documentation page. Nothing is blocking it. The agent needs the content rendered, stripped of boilerplate, and trimmed to the part that answers its question. That is a fetch problem, not an unblocking problem.

The [Parallel Extract API](https://parallel.ai/products/extract) is built for that second case. It turns any public URL, including JavaScript-rendered pages and PDFs, into clean markdown for $1 per 1,000 URLs, and returns objective-focused excerpts when you tell it what you are looking for. It is not an unlocker: it does not sell residential IPs or CAPTCHA solving. For the full comparison, see [web unlocker vs. scraper vs. fetch](https://parallel.ai/articles/web-unlocker-vs-scraper-vs-fetch).

## Related terms

- [web scraping](https://parallel.ai/articles/what-is-web-scraping): the wider process of collecting and parsing data from web pages.
- [headless browser API](https://parallel.ai/learn/headless-browser-api): the rendering technology unlockers use to load JavaScript-heavy pages.
- [web scraper vs. web extraction](https://parallel.ai/articles/web-scraper-vs-web-extraction): how retrieval and extraction differ.
- [web data API](https://parallel.ai/learn/web-data-api): getting structured data through an interface instead of a page.

## FAQ

**Is a web unlocker the same as a proxy?**

No. A proxy changes your IP address. An unlocker runs on top of a proxy network and adds fingerprinting, JavaScript rendering, CAPTCHA solving, and retries, and bills only for successful pages.

**Does a web unlocker return structured data?**

Usually not. Most unlockers return raw HTML. Parsing it into fields or clean text is a separate step.

**Is using a web unlocker legal?**

It depends on the target, the data, and your jurisdiction. US courts in Meta v. Bright Data held that logged-off collection of public data did not breach Meta's terms, but site operators are also tightening defaults, and Cloudflare now blocks AI training and agent bots on ad-supported pages for new domains. Get target-by-target legal review.

**[Start Building](https://docs.parallel.ai/home)**

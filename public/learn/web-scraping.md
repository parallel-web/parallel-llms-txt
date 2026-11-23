# Web scraping

Web scraping is the automated extraction of structured fields from public web pages by fetching HTML or rendered DOMs and parsing embedded JSON or selectors into typed records.

Web scraping is the automated extraction of structured data—prices, product specs, filings, listings, or article text—from public web pages by downloading their HTML (or rendered DOM) and parsing target fields into JSON, CSV, or a database. Unlike [web crawling](/learn/web-crawler), which discovers and indexes pages broadly across the internet, scraping targets known page layouts to pull specific records on demand.

**Three-stage web scraping pipeline**

```text
Target URLs ──▶ ┌─────────────────────┐
                │   1. Fetch Layer    │ (HTTP client, headless browser,
                │  (proxies / retries)│  or web unlocker)
                └──────────┬──────────┘
                           ▼ raw / hydrated HTML
                ┌─────────────────────┐
                │   2. Parse Layer    │ (CSS / XPath / embedded JSON
                │  (extract fields)   │  or HTML -> markdown)
                └──────────┬──────────┘
                           ▼ typed records
                ┌─────────────────────┐
                │ 3. Clean & Validate │ (dedup, schema check, store)
                └─────────────────────┘
```

## How scrapers parse pages under the hood

Most production scrapers avoid fragile regexes and rely on one of three extraction strategies, in order of reliability:

1. **Embedded JSON / hydration payloads:** Many modern sites embed their full structured state inside `<script id="__NEXT_DATA__" type="application/json">`, `<script type="application/ld+json">`, or an internal XHR endpoint. Parsing that JSON is faster and far less brittle than scraping visual HTML.
2. **DOM selectors (CSS / XPath):** Libraries such as BeautifulSoup, `lxml`, Cheerio, or Scrapy parse the HTML tree and extract text/attributes from semantic selectors (`[data-testid]`, table rows, headings).
3. **Headless browser rendering:** When data only appears after JavaScript runs or user clicks, scrapers run Playwright/Puppeteer or call a [headless browser API](/learn/headless-browser-api).

```python
import json
import requests
from bs4 import BeautifulSoup

def scrape_product_metadata(url: str) -> dict:
    resp = requests.get(url, headers={"User-Agent": "CatalogSync/1.0"}, timeout=15)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Prefer structured JSON-LD when the site publishes it
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            payload = json.loads(script.string or "")
        except json.JSONDecodeError:
            continue
        if isinstance(payload, dict) and payload.get("@type") == "Product":
            return {
                "name": payload.get("name"),
                "price": (payload.get("offers") or {}).get("price"),
                "currency": (payload.get("offers") or {}).get("priceCurrency"),
                "source_url": url,
            }

    # Fallback: minimal DOM extraction
    title = soup.find("h1")
    return {"name": title.get_text(strip=True) if title else None, "source_url": url}
```

## Web scraping vs. extraction APIs vs. web search APIs

Traditional scrapers break whenever a site redesigns its markup or tightens WAF rules. For [AI agents](/learn/ai-agent) that read arbitrary unfamiliar domains at runtime, writing per-site selectors is impossible (see [web scraper vs. web extraction](/articles/web-scraper-vs-web-extraction)).

| Approach | Needs per-site selectors? | Handles arbitrary new URLs? | Output shape | Best fit |
| --- | --- | --- | --- | --- |
| Custom scraper (Scrapy / Playwright) | Yes | No | Exact domain schema (CSV/DB) | High-volume monitoring of a small fixed list of sites |
| [Web unlocker](/learn/web-unlocker) | Yes (still returns raw HTML) | Partial | Raw HTML | Protected sites where you already maintain custom parsers |
| Web extraction API ([Parallel Extract](/products/extract)) | No | Yes | Clean markdown / query-focused excerpts | Feeding known URLs into LLMs and [RAG](/learn/rag-retrieval-augmented-generation) |
| [Web search API](/learn/web-search-api) | No | Yes (discovers URLs too) | Ranked URLs + excerpts | Open-web [agentic search](/learn/agentic-search) and [data enrichment](/learn/data-enrichment) |

## Anti-scraping defenses and legal boundaries

- **Common technical defenses:** Rate limiting (`429`), IP/ASN blocking against datacenter ranges, TLS/HTTP2 fingerprinting (`JA3`/`JA4`), JavaScript challenges, and honeypot links.
- **Legal and compliance landscape:** Public, logged-off factual data has generally fared better under US computer-access law (for example, _hiQ Labs v. LinkedIn_ and _Meta v. Bright Data_ on logged-off public pages), while bypassing authentication, violating copyright/database rights, harvesting personal data under GDPR/CCPA, or breaching contractual terms carry real legal risk. Always verify compliance with counsel, honor rate limits, and prefer official APIs or licensed web-data providers when available.

## Frequently asked questions

**What is the difference between web scraping and web crawling?**

[Web crawling](/learn/web-crawler) discovers and fetches pages broadly by following links to build an index. Web scraping targets specific pages to extract structured fields. Many pipelines crawl first to find URLs, then scrape each URL.

**Why do traditional web scrapers struggle in AI agent workflows?**

An AI agent rarely knows in advance which domains it will encounter, so pre-written CSS selectors cannot cover the open web—and raw scraped HTML floods the model's [context window](/learn/context-window) with boilerplate. Extraction and search APIs that output clean, query-focused excerpts solve both problems.

**When is a custom scraper still the right choice?**

When you pull millions of structured rows per week from a handful of known sites (such as your own suppliers or a fixed catalog) where maintaining a handful of dedicated parsers is cheaper than per-URL API pricing.

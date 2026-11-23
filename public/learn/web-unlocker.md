# Web unlocker

A web unlocker is a managed proxy and request-orchestration service that fetches public pages from anti-bot-protected sites by rotating residential IPs, impersonating browser TLS fingerprints, solving challenges, and returning raw HTML.

A web unlocker is a managed HTTP proxy and request-orchestration service built to fetch public web pages from sites protected by anti-bot defenses. You send a target URL to the unlocker's endpoint; behind the scenes, it rotates residential or ISP proxies, impersonates real browser TLS and HTTP/2 fingerprints, executes JavaScript challenges or solves CAPTCHAs when triggered, retries blocked attempts, and returns the raw HTML response for your parser to process.

**How a web unlocker sits between your scraper and a protected site**

```text
┌────────────┐  GET target URL   ┌─────────────────────────────────┐
│ Your App / │ ────────────────▶ │           Web Unlocker          │
│  Scraper   │                   │  1. Select geo / residential IP │
│            │ ◀──────────────── │  2. Spoof TLS (JA4) + HTTP/2    │
└────────────┘   200 OK (HTML)   │  3. Run JS / CAPTCHA if blocked │
                                 │  4. Retry on 403 / 429          │
                                 └────────────────┬────────────────┘
                                                  │ disguised request
                                                  ▼
                                        ┌───────────────────┐
                                        │  WAF / Bot Guard  │
                                        │  -> Origin Server │
                                        └───────────────────┘
```

## What anti-bot layers a web unlocker handles

Modern web application firewalls (Cloudflare, Akamai, DataDome, PerimeterX) inspect far more than the `User-Agent` header. A naive `requests.get()` fails at multiple layers that a web unlocker attempts to normalize:

- **IP reputation and ASN filtering:** Datacenter IP ranges (AWS, GCP, Hetzner) are immediately challenged or blocked with `403`. Unlockers route through rotating residential, mobile, or ISP IP pools matched to the target geography.
- **TLS and HTTP/2 fingerprinting (**`**JA3**`** / **`**JA4**`**):** Python's `urllib3` or Go's `net/http` produce distinct TLS cipher-suite handshakes and HTTP/2 frame settings compared to Chrome. Unlockers impersonate real browser TLS stacks at the socket layer.
- **Header ordering and Sec-Fetch metadata:** Real browsers emit deterministic header casing, ordering, and `Sec-Ch-Ua` / `Sec-Fetch-*` pairs.
- **JavaScript proof-of-work and CAPTCHA challenges:** When a site returns an interstitial challenge page instead of `200 OK` content, the unlocker escalates to a managed browser session or solver, caches the clearance cookie, and replays the request.

```python
import os
import requests

# Pattern A: Web unlocker proxy -> returns raw HTML (you parse selectors yourself)
resp = requests.get(
    "https://example.com/product/sku-42",
    proxies={"https": os.environ["UNLOCKER_PROXY_URL"]},
    timeout=60,
)
raw_html = resp.text  # Often 150 KB+ of HTML, scripts, and CSS

# Pattern B: Extraction API -> returns clean markdown / excerpts directly
extract_resp = requests.post(
    "https://api.parallel.ai/v1/extract",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json={"urls": ["https://example.com/product/sku-42"], "excerpts": True},
    timeout=30,
)
clean_excerpts = extract_resp.json()["results"][0]["excerpts"]
```

## Web unlocker vs. headless browser API vs. extraction API

Unlockers solve _access_ (getting a `200 OK` HTML document back), not _discovery_ or _LLM-ready formatting_. Choosing the wrong layer adds cost and latency quickly—especially for [AI agents](/learn/ai-agent) that pay per token in the [context window](/learn/context-window).

| Tool | What it solves | Typical output | Latency | Best fit |
| --- | --- | --- | --- | --- |
| Web unlocker | Anti-bot bypass, proxy rotation, CAPTCHAs | Raw HTML | 2–15 s | Large-scale [web scraping](/learn/web-scraping) on protected domains with custom parsers |
| [Headless browser API](/learn/headless-browser-api) | JS execution, DOM interaction, screenshots | Hydrated HTML / PNG / PDF | 1–5 s | Client-rendered SPAs, scripted clicks, visual QA |
| Web extraction API ([Parallel Extract](/products/extract)) | Fetching + JS rendering + boilerplate removal | Clean markdown / query excerpts | 1–4 s | Feeding known URLs directly into LLMs and [RAG](/learn/rag-retrieval-augmented-generation) |
| [Web search API](/learn/web-search-api) | Query-to-URL discovery + ranked excerpts | Ranked URLs + excerpts | ~200 ms–3 s | Open-web research when you do not know the URLs up front |

## Operational trade-offs and compliance

- **Unpredictable tail latency:** Escalating from a fast HTTP proxy to a JS-challenge solve and retry can push single-URL latency past 10–20 seconds, making unlockers a poor fit for synchronous user-facing turns.
- **Per-GB and per-success billing:** Residential proxy bandwidth and solver escalations cost significantly more per thousand pages than datacenter fetches or indexed search APIs.
- **Respecting site boundaries:** Unlockers are intended for public, unauthenticated pages where automated collection is lawful and permitted; they do not substitute for authorized credentials on private or paywalled portals, and production scrapers should respect `robots.txt`, rate limits, and applicable terms.

## Frequently asked questions

**Does a web unlocker return clean JSON or markdown for an LLM?**

Most web unlockers return raw HTML (some offer optional markdown conversion add-ons). If your downstream consumer is an LLM rather than a custom CSS/XPath parser, an extraction endpoint like [Parallel Extract](/products/extract) or a [web search API](/learn/web-search-api) avoids shipping raw HTML and maintaining parsers altogether.

**Why do unlockers cost more than standard proxies?**

Standard proxy services only lease IP addresses—you still handle TLS spoofing, cookie jars, retries, headless escalation, and CAPTCHA solving yourself. A web unlocker bundles that entire request-success pipeline and bills per successful request or bandwidth tier.

**When do you need a web unlocker instead of a headless browser API?**

Use a [headless browser API](/learn/headless-browser-api) when a site is friendly to crawlers but requires JavaScript to render the DOM. You only need a web unlocker when the site actively blocks datacenter IPs, inspects TLS fingerprints, or serves anti-bot challenges.

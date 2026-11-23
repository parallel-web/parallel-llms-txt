# Web crawler

A web crawler systematically discovers, downloads, and refreshes pages across the internet by following hyperlinks through a polite URL frontier so search engines can build and maintain a web index.

A web crawler (also called a spider or bot) is automated software that starts from a set of seed URLs, downloads pages over HTTP, extracts outbound links, and schedules newly discovered URLs in a loop so a search engine can build and refresh a [web index](/learn/web-index). Crawling is fundamentally about **discovery and freshness at scale**—deciding which of the web's billions of URLs to fetch, how politely to hit each host, and when to revisit pages that change.

**Web crawler architecture (frontier to index)**

```text
Seed URLs ──▶ ┌──────────────────────┐
              │    URL Frontier      │◀───────────────┐
              │ (priority + per-host │                │ new canonical
              │  politeness queues)  │                │ URLs (seen-set
              └──────────┬───────────┘                │ filtered)
                         ▼                            │
              ┌──────────────────────┐                │
              │  DNS + robots.txt +  │                │
              │  HTTP / JS Fetcher   │                │
              └──────────┬───────────┘                │
                         ▼                            │
              ┌──────────────────────┐                │
              │  Parse HTML & Links  │────────────────┘
              │  + Dedup (SimHash)   │
              └──────────┬───────────┘
                         ▼
               [Web Index / Storage]
```

## How a production crawler works end to end

Writing a toy crawler takes 30 lines of Python; running one across tens of millions of hosts is a distributed scheduling problem governed by five subsystems:

1. **URL frontier (priority + politeness):** Splits pending URLs into front queues (ordered by importance and refresh cadence) and back queues (one per hostname) so the crawler never hammers a single origin server with parallel bursts.
2. **DNS resolution and **`**robots.txt**`** cache:** Resolves hostnames through a local caching resolver and fetches `/robots.txt` per [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) before requesting any path on that host.
3. **Fetcher and selective JS rendering:** Downloads pages over HTTP/2 with conditional headers (`If-None-Match` / `ETag`, `If-Modified-Since`) to skip unchanged content (`304 Not Modified`), escalating to a [headless browser](/learn/headless-browser-api) only when a page requires JavaScript execution to populate its DOM.
4. **Canonicalization and deduplication:** Normalizes URLs (stripping tracking query params, resolving `rel="canonical"`), filters infinite calendar/facet traps, and hashes page content (using locality-sensitive hashes like **SimHash**) to avoid indexing duplicate mirrors.
5. **Revisit scheduler:** Predicts change frequency per URL so news homepages and changelogs are recrawled in minutes while archival PDFs are revisited monthly.

```python
import time
from collections import deque
from urllib.parse import urljoin, urldefrag, urlparse
from bs4 import BeautifulSoup
import requests

def crawl(seeds: list[str], max_pages: int = 50, delay_s: float = 0.5) -> dict[str, str]:
    queue = deque(seeds)
    seen: set[str] = set(seeds)
    last_hit: dict[str, float] = {}
    pages: dict[str, str] = {}

    while queue and len(pages) < max_pages:
        url = queue.popleft()
        host = urlparse(url).netloc
        wait = delay_s - (time.monotonic() - last_hit.get(host, 0.0))
        if wait > 0:
            time.sleep(wait)

        resp = requests.get(url, headers={"User-Agent": "ExampleBot/1.0"}, timeout=10)
        last_hit[host] = time.monotonic()
        if resp.status_code != 200 or "text/html" not in resp.headers.get("Content-Type", ""):
            continue

        pages[url] = resp.text
        soup = BeautifulSoup(resp.text, "html.parser")
        for a in soup.find_all("a", href=True):
            nxt, _ = urldefrag(urljoin(url, a["href"]))
            if urlparse(nxt).scheme in ("http", "https") and nxt not in seen:
                seen.add(nxt)
                queue.append(nxt)
    return pages
```

## Web crawling vs. web scraping

People often conflate crawling and [web scraping](/learn/web-scraping), but they solve different problems (see our full [crawling vs. scraping breakdown](/articles/web-crawling-vs-web-scraping)):

| Dimension | Web crawling | [Web scraping](/learn/web-scraping) |
| --- | --- | --- |
| Goal | Discover and index pages broadly by following links | Extract specific structured fields from known target pages |
| Scope | Whole domains or the open web | Bounded URL lists or site templates |
| Output | Raw/cleaned corpus feeding a [web index](/learn/web-index) | Tables, JSON records, CSVs, price feeds |
| Scheduling | Continuous freshness + crawl-budget optimization | One-off batch or fixed-interval polling |

## How sites govern crawler traffic

Website operators control crawler access using three standard mechanisms:

- `**robots.txt**`** (**[**RFC 9309**](https://www.rfc-editor.org/rfc/rfc9309)**):** Declares `User-agent`, `Allow`, and `Disallow` path rules at the domain root. Crawlers now commonly separate search/user-triggered bots from model-training bots under distinct user-agent tokens.
- `**sitemap.xml**`** and **`**<link rel="canonical">**`**:** Advertise authoritative URLs and `<lastmod>` timestamps so crawlers spend crawl budget on real updates instead of duplicate parameter URLs.
- **Meta robots and HTTP headers:** `<meta name="robots" content="noindex, nofollow">` or the `X-Robots-Tag` HTTP header controls indexing per page or binary file (such as PDFs). For AI-specific site maps, see [llms.txt](/learn/llms-txt).

## AI-native crawlers vs. classic SEO crawlers

Classic search crawlers optimize for ranking human-clickable blue links. Crawlers built for [AI agents](/learn/ai-agent) and [web search APIs](/learn/web-search-api)—like the crawling infrastructure behind [Parallel Search](/products/search) and [Extract](/products/extract)—optimize for clean content extraction, passage-level provenance, PDF/table preservation, and fresh retrieval of pages that agents query on demand.

## Frequently asked questions

**What is crawl budget?**

Crawl budget is the combination of a host's crawl capacity limit (how fast a crawler can fetch without degrading the server) and crawl demand (how important and frequently updated the URLs are). Duplicate URLs, faceted filters, and slow `5xx` responses waste crawl budget.

**Do web crawlers obey **`**robots.txt**`** automatically?**

Compliant search and AI crawlers parse and honor `robots.txt` by convention (RFC 9309), though `robots.txt` is an advisory protocol rather than a cryptographic access-control mechanism—sensitive resources should always require authentication.

**When should you build a crawler instead of calling a search API?**

Build your own crawler only when you need continuous coverage of a narrow set of niche domains with custom extraction logic. For general open-web discovery and freshness across billions of pages, calling a [web search API](/learn/web-search-api) avoids the infrastructure cost of distributed frontiers, JS rendering, and deduplication.

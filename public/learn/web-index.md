# Web index

A web index is the pre-built, queryable database a search engine constructs from crawled pages—combining inverted token indexes, vector indexes, and document metadata—so queries return in milliseconds.

A web index is the pre-built, queryable database a search engine maintains from crawled web pages so it can answer queries in milliseconds instead of fetching the live internet on every request. When an [AI agent](/learn/ai-agent) calls a [web search API](/learn/web-search-api), the index—not the live origin servers—determines which pages are discoverable, how fresh the facts are, and how fast results return.

**From raw crawled pages to a queryable web index**

```text
[Web Crawler] ──▶ Raw HTML / PDFs
                       │
                       ▼ parse + strip nav/ads + canonicalize + dedup
                 Clean Documents + Metadata (URL, date, links)
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌───────────────────┐     ┌───────────────────┐
│  Inverted Index   │     │   Vector Index    │
│ (BM25 / exact IDs)│     │ (dense semantics) │
└─────────┬─────────┘     └─────────┬─────────┘
          └────────────┬────────────┘
                       ▼
           [Hybrid Fusion + Reranker] ──▶ Ranked Results / Excerpts
```

_(Note: "web index" is also occasionally used to mean a site's default homepage file like _`_index.html_`_; this entry covers search-engine web indexes.)_

## What lives inside a modern web index

A production web index is not one giant table—it is a set of coordinated data structures sharded across hundreds or thousands of machines:

- **Token **[**inverted index**](/learn/inverted-index)**:** Maps every normalized word and phrase to compressed postings lists for millisecond [lexical search](/learn/lexical-search) (BM25) and exact identifier lookup.
- **Dense **[**vector index**](/learn/vector-embeddings)**:** Stores quantized embeddings (typically HNSW or IVF-PQ) for [semantic search](/learn/semantic-search) and [hybrid search](/learn/hybrid-search).
- **Forward / document store:** Holds compressed cleaned text, headings, structured tables, and metadata (`url`, `canonical_url`, `publish_date`, `crawl_timestamp`, `http_status`) used to build snippets and query-focused excerpts after ranking.
- **Link graph:** Tracks inbound/outbound hyperlinks and anchor text across hosts to estimate authority, detect spam farms, and prioritize recrawls.

## Why pages fail to enter (or stay fresh in) an index

Even a publicly reachable URL can be absent or stale in a web index for predictable technical reasons:

- **Crawl blocks or noindex directives:** A `Disallow` rule in `robots.txt`, a `<meta name="robots" content="noindex">` tag, or an `X-Robots-Tag: noindex` header excludes the page.
- **Client-side JS without SSR:** Pages that render empty HTML shells until multiple authenticated or slow XHR requests complete are often missed or indexed partially.
- **Canonical collisions and duplicate URLs:** Redirect chains, inconsistent trailing slashes, or conflicting `<link rel="canonical">` tags split signals and drop duplicate variants.
- **Freshness lag:** If a [web crawler](/learn/web-crawler) only revisits a pricing page every two weeks, the index serves a two-week-old price until the next recrawl—or until a live-fetch fallback refreshes it on demand.

```json
{
  "doc_id": 89140211,
  "url": "https://docs.example.com/api/rate-limits",
  "canonical_url": "https://docs.example.com/api/rate-limits",
  "http_status": 200,
  "content_hash": "sha256:9f84c2...",
  "publish_date": "2026-10-14",
  "crawled_at": "2026-11-22T01:12:04Z",
  "title": "API Rate Limits",
  "clean_text": "Default workspace limits are 600 requests/minute on /v1/search..."
}
```

## Independent web index vs. SERP wrapper

Not every search API owns its own web index. That architectural distinction directly affects latency, excerpt quality, and reliability:

| Architecture | Where results come from | Control over excerpts & freshness | Trade-offs |
| --- | --- | --- | --- |
| Independent web index (e.g., [Parallel Search](/products/search), Brave) | Proprietary crawler, inverted + vector indexes, and rankers | Full control over passage extraction, recrawl priority, and latency | Massive engineering effort to build and maintain |
| SERP wrapper / scraper | Scrapes another search engine's human results page | Limited to short ~160-char SEO snippets unless adding a second fetch | Extra network hop; inherits upstream ranking and legal risk |

## Index freshness vs. point-in-time snapshots

Most agent workloads want maximum freshness (combining a continuously updated index with live-fetch fallback when `max_age_seconds` expires). Evaluation and financial backtesting require the exact opposite: [point-in-time search](/learn/point-in-time-search), which freezes the index at a historical timestamp so future pages cannot leak into a benchmark or forecast test.

## Frequently asked questions

**How is a web index different from a web crawler?**

A [web crawler](/learn/web-crawler) is the fetching pipeline that discovers and downloads pages from the internet. A web index is the structured, compressed database built _from_ those crawled pages so queries execute in milliseconds.

**Why can't an AI agent just crawl the live web on every query?**

Fetching and parsing even 50 live pages per query takes tens of seconds and fails whenever origin servers throttle or time out. A web index pre-fetches, cleans, and indexes billions of pages ahead of time so an agent gets ranked evidence in ~200 ms–3 s.

**What determines how fast a new page gets indexed?**

Discovery paths (updated `sitemap.xml`, internal links from frequently crawled pages, IndexNow pings), server response speed (`200 OK` without heavy JS blockers), and how often the crawler's scheduler observes changes on that host.

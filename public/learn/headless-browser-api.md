# Headless browser API

A headless browser API gives your code remote programmatic control over a browser engine with no visible UI—executing JavaScript, resolving XHR/fetch calls, and returning the hydrated DOM, screenshot, or PDF.

A headless browser API gives your code remote programmatic access to a real web browser engine—typically Chromium—running without a visible window. You send a target URL (and optional wait rules, headers, or interaction steps) over HTTP, the service executes JavaScript, resolves network requests, and renders the DOM, then returns the finished HTML, extracted text, screenshot, or PDF.

**Raw HTTP fetch vs. headless browser API**

```text
PLAIN HTTP FETCH
  GET /pricing ──▶ Server ──▶ <div id="root"></div><script src="app.js">
                              (missing client-rendered content)

HEADLESS BROWSER API
  POST /render ──▶ ┌───────────────────────────────────────────┐
                   │ Managed Headless Chromium                 │
                   │ 1. Fetch HTML + JS/CSS + XHR/fetch calls  │
                   │ 2. Execute JS & wait for network/selector │
                   │ 3. Serialize hydrated DOM / PDF / PNG     │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                           Rendered HTML / Markdown / Screenshot
```

## When plain HTTP fails and headless rendering is required

Standard HTTP clients (`curl`, `requests`, `fetch`) download the initial server response without running JavaScript. That is fast and cheap for static or server-side-rendered pages, but misses content on:

- **Client-side single-page apps (SPAs):** React, Vue, or Angular shells that populate tables, prices, or listings via `fetch()`/`XHR` after load.
- **Infinite scroll and interactive tabs:** Content hidden behind click handlers, accordions, or lazy-loaded viewports.
- **Visual artifacts:** Pixel screenshots, layout regression checks, and print-to-PDF rendering.

Under the hood, most headless browser APIs wrap [Chrome Headless](https://developer.chrome.com/docs/automation-and-testing/headless), [Puppeteer](https://pptr.dev/), Playwright, or the W3C [WebDriver](https://www.w3.org/TR/webdriver2/) protocol behind a managed pool of isolated browser containers so your application does not have to manage memory leaks, zombie Chrome processes, or Chromium security patches.

```javascript
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Block heavy binary assets to cut render time and bandwidth
await page.route("**/*.{png,jpg,jpeg,woff2,mp4}", (route) => route.abort());

await page.goto("https://example.com/pricing", { waitUntil: "domcontentloaded" });
await page.waitForSelector("[data-testid='pricing-table']", { timeout: 10_000 });

const html = await page.content();
await browser.close();
```

## Headless browser API vs. extraction API vs. browser agent

Running a full browser is CPU- and RAM-intensive (~200–500 MB per instance, 1–5 seconds per page). For AI pipelines, raw rendered HTML also still carries navigation menus, footers, and markup noise that waste [context window](/learn/context-window) tokens.

| Tool | Runs JS | Output shape | Best fit |
| --- | --- | --- | --- |
| Plain HTTP fetch | No | Raw initial HTML | Static docs, RSS/XML feeds, JSON APIs |
| Headless browser API | Yes | Hydrated HTML, PNG, PDF, HAR | Custom DOM automation, screenshots, visual QA, [web scraping](/learn/web-scraping) |
| Web extraction API (e.g., [Parallel Extract](/products/extract)) | Yes (when needed) | Clean markdown / query-focused excerpts | Feeding specific URLs directly into LLMs and [RAG](/learn/rag-retrieval-augmented-generation) |
| [Browser agent](/learn/browser-agent) | Yes | Goal-driven multi-step UI actions | Multi-page logins and forms with no API |

## Operational gotchas to plan for

- **Waiting strategy:** `networkidle` frequently hangs on sites running persistent analytics pings or WebSockets. Prefer `domcontentloaded` plus `waitForSelector` on a real content element.
- **Resource blocking:** Aborting image, font, and video requests cuts latency and bandwidth sharply when you only need text or DOM structure.
- **Anti-bot detection:** Default headless Chrome exposes tells (`navigator.webdriver === true`, headless user agents, datacenter IPs). Sites behind aggressive WAFs often require a [web unlocker](/learn/web-unlocker) or proxy rotation layer.
- **Isolation:** Always run untrusted pages in fresh browser contexts (`browser.newContext()`) with strict navigation timeouts so one hostile script cannot leak cookies or stall worker pools.

## Frequently asked questions

**Is a headless browser API the same as a web scraping API?**

Not quite. A headless browser API focuses on executing and rendering pages in a real browser environment (often giving you a Playwright/CDP endpoint or raw HTML/screenshot). A full [web scraping](/learn/web-scraping) or extraction API layers proxy rotation, anti-bot handling, and HTML-to-markdown/JSON parsing on top.

**Why not run headless Chrome inside my own serverless function?**

Chromium binaries exceed many serverless size limits, cold starts are slow, and concurrent tabs spike RAM rapidly. Teams typically offload rendering to a managed headless browser API—or skip raw rendering entirely with an extraction endpoint like [Parallel Extract](/products/extract) when they only need clean page text for an agent.

**Does headless rendering work for AI agents that need to discover pages first?**

No—you need a URL before you can render it. Pair a [web search API](/learn/web-search-api) for discovery with targeted extraction or rendering only for the URLs that require full-page reading.

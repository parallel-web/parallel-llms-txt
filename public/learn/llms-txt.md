# llms.txt

llms.txt is a proposed markdown convention placed at /llms.txt that gives AI agents and coding assistants a curated, low-token table of contents linking directly to a site's most important documentation.

`llms.txt` is a proposed markdown convention—introduced by Jeremy Howard of Answer.AI in September 2024—that places a human- and LLM-readable index of a website's most important pages at `/llms.txt`. Instead of forcing an [AI agent](/learn/ai-agent) to parse complex HTML navigation menus, JavaScript bundles, and thousands of URLs from `sitemap.xml`, `/llms.txt` hands a model a single concise markdown outline pointing straight to clean documentation and markdown mirrors.

**How /robots.txt, /sitemap.xml, and /llms.txt divide roles**

```text
https://example.com/
├── robots.txt      ──▶ Crawler permissions (Allow / Disallow per bot)
├── sitemap.xml     ──▶ Exhaustive XML list of indexable URLs + lastmod
├── llms.txt        ──▶ Curated markdown map of key docs for LLMs/agents
└── llms-full.txt   ──▶ Optional single-file concatenation of full docs
```

## The `llms.txt` specification

The [proposed specification](https://llmstxt.org/) is intentionally minimal Markdown with four ordered elements:

1. `**# Site Name**`** (required H1):** The only mandatory element—identifies the project or organization.
2. `**> Summary**`** (optional blockquote):** A short one-to-two-sentence overview containing essential context for interpreting the rest of the file.
3. **Optional detail paragraphs:** Brief guidance (no headings) explaining how docs are organized or how to use the product.
4. `**## Section**`** link lists:** H2 sections containing bullet lists of `[Title](URL): concise description`. An optional `## Optional` section marks secondary links that an agent can safely drop when its [context window](/learn/context-window) is tight.

```markdown
# Parallel Web Systems

> Web search, extraction, and research APIs built for AI agents.

## Docs

- [Search API Quickstart](https://docs.parallel.ai/search/search-quickstart.md): Run web search queries returning ranked URLs and compact excerpts.
- [Extract API](https://docs.parallel.ai/extract/extract-quickstart.md): Turn target URLs and PDFs into clean markdown.
- [Task API](https://docs.parallel.ai/task-api/task-quickstart.md): Asynchronous structured web research with Basis citations.

## Optional

- [Changelog](https://docs.parallel.ai/resources/changelog.md): API release history and deprecations.
```

## `llms.txt` vs. `robots.txt` vs. `sitemap.xml`

| File | Primary consumer | Format | Role |
| --- | --- | --- | --- |
| `/robots.txt` | [Web crawlers](/learn/web-crawler) (RFC 9309) | Plain-text directives | Declares crawl allow/disallow rules per user-agent |
| `/sitemap.xml` | Search engine [web indexes](/learn/web-index) | XML | Exhaustive machine list of canonical URLs and `<lastmod>` |
| `/llms.txt` | AI agents, coding assistants, doc fetchers | Markdown | Curated, low-token table of contents for inference-time reading |
| `/llms-full.txt` | Long-context tools / local RAG | Markdown | Concatenated plain-text corpus of the entire docs site |

## Adoption reality and when it is worth adding

Adopting `llms.txt` is still a **judgment call**, not a universal requirement. Major search crawlers still rely primarily on standard HTML, `robots.txt`, and `sitemap.xml`—and publishing an `llms.txt` file does not override crawl directives or boost traditional search rankings on its own.

Where `llms.txt` _does_ pay off immediately is **developer documentation and API portals**:

- Coding agents (Claude Code, Cursor, Codex) and developers routinely fetch `/llms.txt` directly or point an agent at it when integrating a new SDK or API.
- Pairing `/llms.txt` with `.md` mirrors for individual pages (or HTTP `Accept: text/markdown` content negotiation) cuts token consumption by 5x–15x compared to fetching raw HTML documentation.
- Generating `/llms.txt` automatically in your docs build pipeline (Mintlify, Docusaurus, Fumadocs, Next.js route handlers) keeps it accurate with zero manual upkeep.

## Common mistakes to avoid

- **Dumping 2,000 URLs into **`**/llms.txt**`**:** Turning `/llms.txt` into a bloated copy of `sitemap.xml` defeats its purpose; keep it curated and put bulky full-text dumps in `/llms-full.txt`.
- **Hand-maintaining links until they 404:** Generate `/llms.txt` from your CMS or docs manifest during CI so renamed slugs never rot.
- **Blocking AI fetchers in **`**robots.txt**`** or WAF rules while publishing **`**/llms.txt**`**:** Verify with `curl -i https://yourdomain.com/llms.txt` that it returns `200 OK` with `text/plain` or `text/markdown` and no bot-challenge interstitial.

## Frequently asked questions

**What is the difference between **`**/llms.txt**`** and **`**/llms-full.txt**`**?**

`/llms.txt` is a compact index of titles, URLs, and one-line descriptions so an agent can pick which specific pages to read. `/llms-full.txt` bundles the entire documentation text into one file—useful for small docs sites, though often too large for a single prompt on large sites.

**Does **`**llms.txt**`** replace **`**robots.txt**`**?**

No. `robots.txt` governs crawl permissions; `llms.txt` is purely a discovery and navigation aid. Sites should maintain both when they want AI agents to navigate documentation cleanly.

**Do web search APIs require **`**llms.txt**`** to index my site?**

No. Search indexes and [web search APIs](/learn/web-search-api) index standard HTML, sitemaps, and markdown pages regardless of whether `/llms.txt` exists.

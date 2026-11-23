# Best Cursor plugins for research and competitive analysis (2026)

The best Cursor plugins for research combine live web retrieval with your team’s code, docs, and meeting decisions. This guide compares nine verified Cursor Marketplace plugins across web search, site crawling, library docs, and internal knowledge, with exact /add-plugin commands, authentication requirements, benchmark data, and three ready-to-use research stacks.

Cursor plugins package MCP servers, skills, rules, subagents, and slash commands into a single install. For research inside the editor, the shortlist comes down to three layers: public web retrieval, repository and library docs, and the internal specs or meeting notes your team already writes. Keep three to five plugins enabled at once so tool schemas don’t crowd the context window.

Disclosure: we make Parallel. It’s the first pick below, and we cite independent benchmark figures alongside real setup tradeoffs so you can evaluate it yourself. We checked every Cursor Marketplace listing and source repository below in November 2026.

## The shortlist at a glance

| Plugin | Best for | Install command | Runtime and auth |
| --- | --- | --- | --- |
| Parallel | Web search, extraction, deep research, enrichment, FindAll, monitoring | /add-plugin parallel | parallel-cli (login or API key) |
| Firecrawl | Site crawling, JS-heavy scraping, structured extraction, doc parsing | /add-plugin firecrawl | Hosted OAuth MCP |
| Exa | Neural web search and clean markdown page fetching | /add-plugin exa | Hosted MCP (keyless default) |
| Tavily | Search, site mapping, crawling, and entity enrichment | /add-plugin tavily | Hosted MCP (keyless search/extract; login for map/crawl/research) |
| Context7 | Version-pinned library docs and code examples | /add-plugin context7 | Hosted OAuth MCP + subagent |
| GitHub | Issues, pull requests, code search, and Actions logs | /add-plugin github | Hosted MCP (GITHUB_PERSONAL_ACCESS_TOKEN) |
| Notion | Team specs, wikis, and research databases | /add-plugin notion-workspace | Hosted OAuth MCP |
| Granola | Meeting decisions, transcripts, and action items | /add-plugin granola | Hosted OAuth MCP + subagent |
| Linear | Product issues, roadmaps, and project docs | /add-plugin linear | Hosted OAuth MCP |

## How Cursor plugins work (and when plain MCP is simpler)

Cursor supports two plugin formats side by side, as described in [Cursor’s plugin documentation](https://cursor.com/docs/plugins). Open Agent Plugins use a root `plugin.json` manifest to bundle portable skills and MCP servers. Cursor Plugins use `.cursor-plugin/plugin.json` and can also add rules, slash commands, subagents, and hooks. Both install the same way through **Customize** or `/add-plugin <name>` in chat, at user, workspace, or team scope. Every listing in the official marketplace is reviewed by hand before publication.

A plugin is worth installing when you want the workflow instructions alongside the connector: citation rules, routing skills that stop the agent from running expensive deep-research calls on simple lookups, or slash commands like `/parallel-enrich`. If you only want bare tool access with no extra skills or local CLI, a standalone MCP entry in `mcp.json` is lighter. We cover server-only configurations in our guide to the [best MCP servers for Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor).

## Web search, extraction, and deep research plugins

### 1. Parallel

The [Parallel plugin](https://cursor.com/marketplace/parallel) bundles six skills, nine slash commands, and a citation-standards rule on top of `parallel-cli`. It covers six research jobs: web search (`/parallel-search`), URL and PDF extraction (`/parallel-extract`), exhaustive deep research (`/parallel-research`), CSV or list enrichment (`/parallel-enrich`), entity discovery with FindAll (`/parallel-findall`), and recurring web monitors (`/parallel-monitor`). Because the skills enforce routing, Cursor defaults to fast web search for ordinary lookups and holds deep research for explicit requests, which keeps both latency and spend predictable.

On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (November 2026 data across 26 search API products), Parallel Search ranks #1 with advanced mode at 83 and fast mode at 82, ahead of Exa auto (80), Firecrawl (73.5), and Tavily basic (66). On Openbenchmarks’ [coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents) (100 documentation tickets, September 2026), Parallel fast resolved 66.7% of tickets from search alone, third of 14 behind Perplexity and Firecrawl, while turbo posted the fastest average search time at 333ms.

```shell
# In Cursor chat
/add-plugin parallel
/parallel-setup

# Example search and enrichment commands
/parallel-search Compare webhook retry policies for Stripe and Adyen from official docs
/parallel-enrich competitors.csv with pricing tiers, SOC 2 status, and latest changelog date
```

**Tradeoff and faster alternative:** The marketplace plugin runs through `parallel-cli` and does not bundle an MCP server, so you need the CLI installed and authenticated (see the [Cursor plugin docs](https://docs.parallel.ai/integrations/cursor-marketplace) for pipx and standalone install steps). New Parallel accounts include up to $80 in free credits plus $5 a month with a card on file. If you only want web search, page fetch, and typed decisions without installing a CLI or creating an account, connect hosted [Parallel MCP](https://parallel.ai/mcp) at `https://mcp.parallel.ai/mcp` instead; adding `?login` unlocks single-call `web_research` as well.

### 2. Firecrawl

The [Firecrawl plugin](https://cursor.com/marketplace/firecrawl) connects to Firecrawl’s hosted OAuth MCP server (`https://mcp.firecrawl.dev/v2/mcp-oauth`) with no local CLI or pasted API key, and packages 19 skills covering scraping, site mapping, multi-page crawling, live browser interaction, page monitoring, document parsing, and Firecrawl’s Alexandria data providers. Install it with `/add-plugin firecrawl` and finish sign-in in the browser.

Reach for Firecrawl when you already know the target domain and need to pull a bounded section of it into markdown, such as auditing a vendor’s entire `/docs` tree or interacting with a JavaScript-heavy pricing calculator. Always pass a path prefix and page cap before launching a crawl so the job does not burn credits or dump hundreds of pages into context. On Artificial Analysis (November 2026), Firecrawl’s search endpoint scores 73.5 compared with Parallel’s 83, so it is stronger as a crawler and scraper than as a primary open-web search layer.

### 3. Exa

The [Exa plugin](https://cursor.com/marketplace/exa) (`/add-plugin exa`) wraps Exa’s hosted MCP server with three skills (`exa-web-search`, `exa-fetch`, and `exa-best-practices`), three commands (`/exa-setup`, `/exa-search`, `/exa-fetch`), and an awareness rule that nudges Cursor toward Exa for live lookups. Its default hosted endpoint works without an API key, which makes it quick to test.

Exa auto scores 80 on the November 2026 Artificial Analysis Search Index, three points behind Parallel advanced, and its plugin stays deliberately narrow: search and page fetch only, with no built-in deep research, entity discovery, or list enrichment. If your team already bills against Exa or wants a small-footprint search plugin without installing a CLI, it is a clean alternative. See our full [Exa alternatives comparison](https://parallel.ai/articles/exa-alternatives) for API-level pricing and accuracy tradeoffs.

### 4. Tavily

The [Tavily plugin](https://cursor.com/marketplace/tavily) (`/add-plugin tavily`) pairs Tavily’s hosted MCP server (`https://mcp.tavily.com/mcp`) with six skills covering search, extraction, site mapping, crawling, deep research, and CRM entity enrichment, plus slash commands including `/search`, `/extract`, `/map`, and `/research`. Basic search and extract run keyless with rate limits; map, crawl, and research require signing in. The tradeoff is search accuracy: Tavily basic scores 66 on the November 2026 Artificial Analysis Search Index, well behind Parallel and Exa, so it makes the most sense if you already have Tavily credits or rely on its map-and-crawl flow.

## Technical documentation and repository research

### 5. Context7

General web search can pull outdated tutorials or mixed framework versions. Upstash’s [Context7 plugin](https://cursor.com/marketplace/context7) (`/add-plugin context7`) pulls version-pinned library documentation and code examples directly from source repositories over OAuth MCP. Its standout piece is the bundled `docs-researcher` subagent, which looks up API references in its own context window so long documentation pages don’t pollute your main chat thread. Context7 only covers indexed libraries, so pair it with Parallel when you need changelogs, blog announcements, or smaller packages.

### 6. GitHub

Public docs often lag behind real behavior. The official [GitHub plugin](https://cursor.com/marketplace/cursor/github) (`/add-plugin github`) connects Cursor to GitHub’s hosted MCP server for repositories, issues, pull requests, code search, and Actions logs. It is the fastest way to check whether a documented limitation has an open bug, a merged fix, or a tagged release before you commit to a dependency.

Two gotchas to plan for: Cursor’s plugin config expects a `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable rather than browser OAuth, and GitHub’s MCP exposes a wide tool surface. Specify the exact repo and version tag in your prompt so Cursor doesn’t cite unreleased commits on `main` as shipped behavior.

## Internal context, meetings, and product work

### 7. Notion

Competitive analysis without your own requirements turns into generic feature tables. The [Notion plugin](https://cursor.com/marketplace/notion) installs with `/add-plugin notion-workspace` (note the `-workspace` suffix) and bundles Notion’s hosted OAuth MCP server with skills for searching pages, querying databases, capturing research, and publishing structured briefs. Let Cursor read your PRD or positioning doc first, compare vendors against those criteria with Parallel, and show you the draft before writing back to a Notion database. Because Notion’s hosted server is OAuth only with no bearer-token option, it works in interactive Cursor sessions but not in headless agents.

### 8. Granola

Half of the context behind a vendor evaluation or roadmap tradeoff lives in call transcripts that never made it into Notion. The [Granola plugin](https://cursor.com/marketplace/granola) (`/add-plugin granola`) connects to Granola’s hosted MCP server and ships a `granola-engineer` subagent plus slash commands like `/granola-brief` and `/granola-gaps`. Use it to pull customer objections from discovery calls or surface what stakeholders actually agreed to before comparing external options.

### 9. Linear

The [Linear plugin](https://cursor.com/marketplace/linear) (`/add-plugin linear`) is a thin wrapper around Linear’s hosted streamable-HTTP MCP server for issues, projects, and documents. It shines when you want to cross-reference a competitor’s launch against open customer feature requests or check whether your team already scoped a workaround. Keep the first pass read-only and review proposed ticket updates before letting the agent edit Linear directly.

Larger organizations whose knowledge is split across Slack, Confluence, Drive, and email can swap Notion and Linear for the [Glean plugin](https://cursor.com/marketplace/glean/glean) (`/add-plugin glean`), which ships ten specialized subagents (including `enterprise-searcher` and `doc-reader`) behind one enterprise search connection. Teams running Jira and Confluence can use the [Atlassian plugin](https://cursor.com/marketplace/atlassian) (`/add-plugin atlassian`) in the same slot.

## Three research stacks that work well together

Installing every search plugin on the list creates tool overlap and makes Cursor guess which one to call. Pick one web plugin and pair it with the internal tools that hold your actual evidence:

- **API and architecture evaluation:** Parallel + Context7 + GitHub. Use Context7 for exact SDK signatures, GitHub for open issues and release tags, and Parallel for pricing, limits, and third-party benchmarks.
- **Competitive analysis and GTM briefs:** Parallel + Notion + Granola. Pull positioning and customer objections internally, verify competitor claims against live pages, and save a sourced comparison to the repo or Notion. Add Firecrawl only when you need a full crawl of a competitor’s docs tree.
- **Product discovery and roadmap triage:** Parallel + Linear + Granola. Check a competitor release against open feature requests and recent customer calls before scoping new work.

Whatever stack you choose, give Cursor a tight output contract so it separates verified facts from unknowns:

> **Sample Cursor prompt**
>
> Read [requirements doc] in Notion. Use Parallel to verify how [Vendor A] and [Vendor B] handle each requirement from official documentation, and check [GitHub repo] for open issues or unreleased fixes. Save a draft to research/vendor-comparison.md with a comparison table, a source URL and publication date for every factual claim, and a separate section for unresolved questions. Don’t edit Notion until I review the draft.

## Frequently asked questions

**How many Cursor plugins should I keep enabled?** Three to five at a time. Each enabled plugin registers MCP tools, skills, or rules that consume context on every agent turn, and overlapping web-search plugins cause inconsistent tool selection. Toggle plugins per workspace in [Customize](https://cursor.com/docs/customize-cursor) rather than keeping everything global.

**Should I install the Parallel plugin or Parallel MCP in Cursor?** Use the [Parallel plugin](https://cursor.com/marketplace/parallel) if you want deep research, CSV enrichment, FindAll entity discovery, recurring monitors, and slash commands via `parallel-cli`. Use hosted [Parallel MCP](https://parallel.ai/mcp) if you want free, keyless web search, URL fetch, and typed decisions in one click with no CLI install. You can upgrade the MCP URL with `?login` later for single-call `web_research`.

**Can teams standardize research plugins across engineers?** Yes. On Cursor Teams and Enterprise plans, admins can publish private team marketplaces under Dashboard > Plugins & MCPs and set each plugin to Default Off, Default On, or Required. For recurring research that runs on a schedule outside the editor, see our [Grok Bot competitive-research guide](https://parallel.ai/articles/grok-bot-competitive-research).

Start small: install [Parallel in the Cursor Marketplace](https://cursor.com/marketplace/parallel) (or connect keyless [Parallel MCP](https://parallel.ai/mcp)) alongside one internal source, then test the stack on a real vendor or architecture decision from your backlog.

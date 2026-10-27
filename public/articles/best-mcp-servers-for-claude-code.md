# The best Claude Code MCP servers in 2026, with setup commands

Claude Code MCP servers connect the agent to tools it doesn't ship with, from live web search to your database, issue tracker, and browser. This guide covers twelve servers worth installing in 2026, the exact claude mcp add command and auth for each, a side-by-side comparison, and how to keep the set small enough that it doesn't eat your context.

Claude Code is Anthropic’s agentic coding harness, and the [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) is its extension surface: one config entry connects the agent to a documentation index, your issue tracker, a browser, or the live web. Tool search now defers most tool definitions until Claude needs them, but every server still adds tool names to each session, results to the context window, and one more option for the agent to choose from. Out of the thousands that exist, the useful question is which ones earn their place.

Below are the twelve we’d consider, with the exact setup for each. Disclosure up front: we make Parallel, our search server is the first pick, and we cite the benchmark numbers so you can discount our bias.

## How MCP works in Claude Code

Servers are added with the `[claude mcp add](https://code.claude.com/docs/en/mcp)` command, which handles local stdio servers and remote HTTP servers alike. Config lives at three scopes: user-level for your personal setup, project-level in a `.mcp.json` checked into the repo so your whole team inherits it, and local. Inside a session, `/mcp` shows connection status and runs the browser OAuth flow for servers that need sign-in.

## The best MCP servers for Claude Code

### 1. Parallel Search MCP

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/quickstart) adds two tools: `web_search`, which returns ranked results with excerpts dense enough that the agent usually answers without a follow-up fetch, and `web_fetch`, which pulls token-efficient markdown from specific URLs, PDFs and JavaScript-rendered pages included. It's hosted, free, and needs no API key:

```bash
claude mcp add --transport http "Parallel-Search-MCP" https://mcp.parallel.ai/mcp
```

Claude Code has a built-in web search tool, and for casual lookups it's fine; we've written a direct [comparison of Claude's built-in search against Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) if you want the details. In brief, a dedicated engine returns denser, more complete context per call, and Parallel Search (advanced) scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products across 12 providers (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. On a coding-specific test, [Openbenchmarks’ web search for coding agents board](https://openbenchmarks.com/web-search-for-coding-agents) (100 tickets where an agent patches an API client against current vendor docs, September 2026) found the API’s fast mode completed 66.7% of tickets from search results alone, third of 14 behind Perplexity (77.3%) and Firecrawl (70.3%), and turbo [searched fastest](https://openbenchmarks.com/web-search-for-coding-agents/metric/avg-search-time-search-only) at 333ms.

**Best for:** researching libraries, errors, and APIs mid-task, and reading long docs pages without flooding the context window.

**Tradeoffs:** we’re the vendor. Anonymous use has lower rate limits and runs the `fast` search mode; a free API key passed as a Bearer token lifts the limits and lets you pin a different mode with a URL parameter such as `?mode=basic`.

### 2. Parallel Task MCP

The [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) gives Claude Code research subagents: asynchronous web agents that take a whole objective ("compare these five auth providers on pricing, SOC 2 status, and SDK quality"), fan out across sources on Parallel's side, and return a structured, cited result while your main session keeps coding. It needs an API key, but every account includes a [recurring $5 monthly free credit](https://parallel.ai/pricing), which covers a lot of per-request-priced research.

**Best for:** vendor evaluations, dependency audits, and any research too deep for a handful of search calls.** Tradeoffs:** results arrive in minutes, not seconds; use Search for quick lookups.

### 3. Context7

Context7 serves version-pinned library documentation on demand, which makes it the highest-impact fix for hallucinated APIs. When the agent is about to call a method that changed two majors ago, this is the server that catches it.

**Best for:** accurate, current API signatures for the exact versions in your lockfile.** Tradeoffs:** limited to libraries it indexes; pair it with web search for everything else.

### 4. GitHub MCP

GitHub’s official hosted server covers issues, pull requests, code search, and Actions logs. Claude Code’s [MCP docs](https://code.claude.com/docs/en/mcp) connect it at `https://api.githubcopilot.com/mcp/` with a fine-grained personal access token passed as an `Authorization: Bearer` header. One caveat: Claude Code already drives the `gh` CLI well through bash, so if your GitHub use is light, you may not need the server at all. It’s worth the weight when you work across many repos or want CI failures surfaced as structured context rather than parsed logs.

**Best for:** PR-heavy, multi-repo workflows.** Tradeoffs:** a large tool surface; limit toolsets so it doesn't crowd your context.

### 5. Playwright MCP

Microsoft's Playwright server gives Claude Code a real browser to click through the app it just changed: load the page, fill the form, screenshot the result. It closes the loop between "the diff looks right" and "the feature works," and by mid-2026 it's among the most-installed servers in the community.

**Best for:** verifying UI changes and reproducing frontend bugs.** Tradeoffs:** slower and heavier than API calls; for reading web pages, `web_fetch` is the cheaper tool.

### 6. Sentry MCP

Sentry's hosted OAuth server puts production errors, traces, and release health in the agent's reach, so it debugs from the actual stack trace and breadcrumbs instead of a pasted screenshot.

**Best for:** triaging and fixing production issues in context.** Tradeoffs:** designed for human-in-the-loop debugging rather than as a full Sentry API replacement.

### 7. Linear MCP

[Linear’s hosted server](https://linear.app/docs/mcp) lets Claude Code find, create, and update issues, projects, and comments, so the agent can read the ticket it’s working on and file follow-ups when it finds a second bug. It runs over Streamable HTTP with OAuth 2.1; after adding it, run `/mcp` inside a session to sign in:

```bash
claude mcp add --transport http linear https://mcp.linear.app/mcp
```

For read-only access, point at `https://mcp.linear.app/mcp/readonly` instead, which only ever exposes read tools. Headless setups can skip OAuth and pass a Linear API key as an `Authorization: Bearer` header.

**Best for:** teams that plan in Linear and want the agent to work from the issue, not a paraphrase of it.

**Tradeoffs:** each OAuth session is tied to one workspace, so multi-workspace users need separate auth contexts. Jira shops should look at Atlassian’s server instead.

### 8. Supabase MCP

The [Supabase MCP server](https://supabase.com/docs/guides/getting-started/mcp) gives the agent your database schema and logs: `list_tables`, `execute_sql`, `apply_migration`, `get_logs`, `get_advisors` for security and performance checks, and `generate_typescript_types`. It’s hosted at `mcp.supabase.com` with OAuth through dynamic client registration, so you don’t create a token by hand. Supabase’s own Claude Code command uses project scope; we’ve added `read_only=true`, which runs every query as a read-only Postgres user:

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?read_only=true"
```

Add `project_ref=<id>` to pin the server to one project, or `features=database,docs` to load only the tool groups you use.

**Best for:** schema-aware coding on Supabase projects: writing migrations, debugging RLS policies, and generating types that match the live database.

**Tradeoffs:** Supabase says the server is built for development and testing and warns against connecting it to production data. Keep it on a dev project or in read-only mode. On Neon, the equivalent is the hosted [Neon MCP server](https://neon.com/docs/ai/neon-mcp-server) at `mcp.neon.tech/mcp`.

### 9. Vercel MCP

[Vercel MCP](https://vercel.com/docs/mcp/vercel-mcp) is Vercel’s official remote server at `https://mcp.vercel.com`, using OAuth and Streamable HTTP. Its most-used tools list and inspect deployments, read runtime logs and grouped runtime errors, and fetch protected preview URLs, which lets Claude Code check why the last deploy failed without you copying logs out of the dashboard:

```bash
claude mcp add --transport http vercel https://mcp.vercel.com
```

**Best for:** debugging failed builds and runtime errors on projects deployed to Vercel.

**Tradeoffs:** the [tools reference](https://vercel.com/docs/agent-resources/vercel-mcp/tools) lists more than 200 tools across 28 categories, including domains, billing, and firewall config, and the connection carries the same access as your Vercel account. Claude Code’s tool search keeps the definitions out of context until they’re needed, but review write actions before approving them.

### 10. Chrome DevTools MCP

Google’s [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) drives a live Chrome instance through Puppeteer and exposes DevTools itself: performance traces with insights, Lighthouse audits, heap snapshots, network requests, and console messages with source-mapped stack traces. It runs locally over stdio:

```bash
claude mcp add --scope user chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

We ran version 1.10.1 on October 10, 2026: `tools/list` returned 30 tools totaling about 27,700 characters of definitions. Passing `--slim` cuts that to three tools (`navigate`, `evaluate`, `screenshot`). The New Stack [reported on October 5](https://thenewstack.io/pi-agent-mcp-codemode/) that Pi’s creator measured Chrome DevTools MCP at roughly 18,000 tokens of context before it did anything.

**Best for:** diagnosing slow pages, layout shifts, memory leaks, and failing network calls in the app you’re building.

**Tradeoffs:** heavy. Claude Code defers tool definitions by default, but page snapshots still land in context on every step. Usage statistics are on by default; add `--no-usage-statistics` to opt out. If you only need clicks and screenshots, Playwright is the lighter pick.

### 11. Figma MCP

[Figma’s remote server](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) at `https://mcp.figma.com/mcp` pulls design context from a frame link: variables, components, and layout data, plus Code Connect mappings so generated code reuses your real components. It can also write to the canvas and capture live UI back into Figma. Figma recommends its Claude Code plugin (`claude plugin install figma@claude-plugins-official`), which bundles skills; the manual MCP setup is one command, then `/mcp` to authenticate:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

**Best for:** implementing designs from Figma frames with the right tokens and components.

**Tradeoffs:** [rate limits](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/) follow your plan and seat. Starter plans and View or Collab seats get 20 tool calls a month; Dev and Full seats get 200 a day on Professional and Organization plans and 600 a day on Enterprise.

### 12. Notion MCP

[Notion MCP](https://developers.notion.com/docs/get-started-with-mcp) is Notion’s hosted server at `https://mcp.notion.com/mcp`. It gives Claude Code your specs, RFCs, and runbooks as context, and can write back, such as appending release notes or updating a status page after a change ships:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Notion also ships a [Claude Code plugin](https://github.com/makenotion/claude-code-notion-plugin) that bundles the server with skills and slash commands.

**Best for:** teams whose specs and decisions live in Notion rather than the repo.

**Tradeoffs:** OAuth only. Notion’s remote server doesn’t accept bearer tokens, so it won’t work in headless or CI runs, and the open-source local server that does take a token is no longer actively maintained.

## The picks side by side

| Server | What it adds | Auth | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | None required | Free; API key optional |
| Parallel Task MCP | Deep research subagents | API key | $5/month free credit, then per request |
| Context7 | Version-pinned library docs | Optional key | Free tier |
| GitHub MCP | Issues, PRs, Actions | Personal access token | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Sentry MCP | Production errors and traces | OAuth | Free with Sentry |
| Linear MCP | Issues, projects, comments | OAuth or API key | No separate MCP fee |
| Supabase MCP | SQL, migrations, logs, advisors | OAuth or access token | No separate MCP fee |
| Vercel MCP | Deployments, runtime logs and errors | OAuth | No separate MCP fee |
| Chrome DevTools MCP | Performance traces, network, console | Local install | Free, open source |
| Figma MCP | Design context, Code Connect | OAuth | Plan-based call limits |
| Notion MCP | Specs and docs, read and write | OAuth only | No separate MCP fee |

## Keep the set small, and share it through the repo

Nobody needs all twelve. Pick the three to six that match your stack: tool search keeps unused definitions out of context, but every extra server is one more set of tools for the agent to choose between and one more credential to manage. Put the team-relevant ones in the project’s `.mcp.json` so every clone of the repo gets the same capabilities, keep personal servers at user scope, and audit with `/mcp` occasionally to drop what you’ve stopped using. The `/context` command shows how many tokens each connected server is using.

## Frequently asked questions

**Does Claude Code need a search MCP when it has built-in web search?** You don't strictly need one, but the benefit is measurable: a dedicated engine returns denser excerpts and an explicit fetch tool, and the [head-to-head comparison](https://parallel.ai/articles/claude-web-search-vs-parallel) shows where the gap is. Since both options are free here, run your own queries and keep the winner.

**How do I share MCP servers with my team?** Add them at project scope so they land in `.mcp.json`, commit it, and every teammate's Claude Code picks them up, with a one-time approval prompt for safety.

**Are these servers free?** Parallel Search, Playwright, and Chrome DevTools cost nothing. GitHub, Linear, Supabase, Vercel, and Notion work with your existing account on each service, and none lists a separate MCP fee. Context7 and Sentry have free tiers, Figma caps tool calls by plan and seat, and the Task MCP runs on Parallel’s $5 recurring monthly free credit until your usage outgrows it.

**MCP server or CLI tool?** If a first-class CLI exists and the agent uses it well (`gh` is the canonical example), the CLI is cheaper in context. MCP wins for hosted services with OAuth, structured schemas, or state.

## One command to test it

Run the `claude mcp add` command above and ask Claude Code something that needs the current web. It asks for no key and no account, so the comparison against your existing setup is free to run. When you want higher limits or research subagents, [a free Parallel account](https://platform.parallel.ai/) includes $5 in credits every month.

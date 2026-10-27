# OpenClaw MCP: how to add MCP servers, and the 10 best to install in 2026

OpenClaw MCP support runs through the gateway config, so adding a server takes one openclaw mcp command. This guide covers how MCP works in OpenClaw, the ten servers worth installing, the free Parallel web search provider you can enable instead, and when a skill is the better choice.

OpenClaw is the open-source personal agent that lives in your messaging apps. You talk to it on WhatsApp, Telegram, Discord, or Slack, and it runs on your own machine with access to your files, your schedule, and your tools. That reach is exactly why the [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) matters here: MCP servers are how you hand OpenClaw new capabilities without writing an integration yourself.

This guide covers how MCP support works in OpenClaw, the servers that earn a place in its config, and the cases where OpenClaw's own skills system is the better tool. One disclosure up front: we make Parallel, and our search server is our first pick. We'll show the numbers and the tradeoffs so you can judge it on the merits.

## You may already be running the best web search server

Before you install anything, know that OpenClaw has a [free, LLM-optimized web search provider powered by the Parallel Search API](https://parallel.ai/blog/free-web-search-openclaw). It needs no API key or paid plan, but it isn’t on by default: install the plugin with `openclaw plugins install @openclaw/parallel-plugin`, then set `tools.web.search.provider` to `parallel-free`. OpenClaw never auto-selects a key-free provider, so without that setting it falls back to the first keyed provider it finds, starting with Brave.

So the direct answer to "what's the best web search MCP for OpenClaw" is that you probably have it already. Adding the Parallel Search MCP on top still makes sense in two cases: you want web page fetching exposed as an explicit tool alongside search, or you want to attach an API key for higher rate limits than the anonymous default.

## How MCP works in OpenClaw

OpenClaw stores MCP server definitions in `~/.openclaw/openclaw.json` under `mcp.servers`, and the [openclaw mcp CLI](https://docs.openclaw.ai/cli/mcp) manages them: `openclaw mcp add` builds a definition from flags, `openclaw mcp set` saves one as raw JSON, `openclaw mcp list` and `openclaw mcp show` print what’s saved, and `openclaw mcp status --verbose` reports state without starting any servers. If you prefer a browser, **Settings > MCP** in the Control UI edits the same entries.

Three details trip people up. First, set `"transport": "streamable-http"` for Streamable HTTP servers, because OpenClaw defaults to SSE when it’s omitted, and some hosted servers (Zapier’s, for one) don’t accept SSE. Second, CLI changes to saved servers (`add`, `set`, `configure`, `unset`) need the local Gateway stopped, and saving proves nothing about reachability: finish with `openclaw mcp doctor <name> --probe`, which connects and lists the server’s tools. Third, OAuth-protected servers (`"auth": "oauth"`) authenticate through `openclaw mcp login`, which stores tokens in a shared SQLite store so parallel OpenClaw processes don’t fight over refresh tokens.

```bash
openclaw mcp set parallel-search '{"url":"https://mcp.parallel.ai/mcp","transport":"streamable-http"}'

# or build the same entry from flags
openclaw mcp add parallel-search --url https://mcp.parallel.ai/mcp --transport streamable-http

# verify: connects and lists tools
openclaw mcp doctor parallel-search --probe
openclaw mcp status --verbose
```

> **Security note**
>
> OpenClaw reads inbound messages from your channels, which means every MCP tool you install is reachable by whatever lands in those channels, including prompt injection attempts. Keep per-server approval on prompt rather than approve for anything that can write or spend, and install only servers you trust.

## The best MCP servers for OpenClaw

### 1. Parallel Search MCP

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/quickstart) is a hosted server at `https://mcp.parallel.ai/mcp` that exposes two tools: `web_search`, which returns ranked results with token-dense excerpts an agent can usually answer from directly, and `web_fetch`, which pulls token-efficient markdown from specific URLs, including PDFs and JavaScript-heavy pages. It's free to use with no API key or account, and it runs on our own web-scale index rather than reselling another engine's results.

Parallel Search (advanced) scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), an independent benchmark of 26 search API products across 13 providers (October 2026), behind Perplexity Search (medium) at 80 and Octen Search at 77. OpenClaw also ships Parallel as a built-in search provider (paid, or a key-free Parallel Search (Free) option you select explicitly), so installing the MCP mainly buys you explicit fetching and, with an API key from `platform.parallel.ai` passed as a Bearer header, higher rate limits. Our notes on [getting maximum search accuracy out of OpenClaw](https://parallel.ai/articles/openclaw-best-practices-web-search) cover the prompting side.

**Best for:** grounding every OpenClaw answer in current web results, plus reading specific pages in depth, at zero cost.

**Tradeoffs:** we make it, so we’re biased. The keyless hosted MCP runs Search in its low-latency fast mode and caps excerpts at roughly 25,000 characters per call, so hour-long research jobs belong on the Task MCP below.

### 2. Parallel Task MCP

Search answers questions; sometimes you want OpenClaw to delegate a whole research job. The [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) exposes Parallel's web agents: asynchronous subagents that plan sub-queries, fan out across sources, and come back with a structured, cited result. That covers single deep-research reports and batch enrichment jobs, like researching every company on a list, without burning your main agent's context on dozens of round trips.

It needs an API key, but every Parallel account gets a recurring [$5 free monthly allowance](https://parallel.ai/pricing) plus a signup credit, and pricing is per request rather than per token, so a scheduled research brief costs the same whether the answer took ten pages or a hundred.

**Best for:** scheduled research briefs, competitive digests, and any job where OpenClaw should hand off to a subagent and report back.

**Tradeoffs:** results take minutes, not seconds, and past the free allowance it's a paid API.

### 3. GitHub MCP

GitHub's [official hosted MCP server](https://github.com/github/github-mcp-server) lets OpenClaw read and act on repositories, issues, pull requests, and Actions runs from wherever you're chatting. Asking your agent "what broke in CI overnight?" from your phone is the kind of thing it makes routine.

**Best for:** repo triage, PR review, and CI questions from chat.** Tradeoffs:** it registers a lot of tools, which costs context; limit toolsets to the ones you use, and keep write actions on approval.

### 4. Playwright MCP

Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp) gives OpenClaw a real browser: navigate, click, fill forms, take screenshots. For a personal agent, that's the fallback for every service that has no API, and by mid-2026 it's among the most-installed MCP servers in the community.

**Best for:** automating sites without APIs and visually verifying what the agent did.** Tradeoffs:** heavier and slower than an API call, and a browser acting on your logged-in sessions deserves sandboxing. For reading pages, `web_fetch` is faster and cheaper; save the browser for interaction.

### 5. Notion MCP

Notion's hosted, OAuth-secured MCP server connects OpenClaw to your notes, docs, and databases. For a personal assistant, that's where captured tasks, reading lists, and meeting notes live, and it turns "add this to my week" messages into actual database rows.

**Best for:** personal knowledge and task workflows.** Tradeoffs:** it writes to your workspace, so keep approval prompts on and scope the connection to the pages the agent actually needs.

### 6. Zapier MCP

OpenClaw has no first-party Gmail or Google Calendar server worth recommending yet: Google’s own [Workspace MCP servers](https://developers.google.com/workspace/guides/configure-mcp-servers) are still in Developer Preview and need program membership plus a Google Cloud project. [Zapier MCP](https://docs.zapier.com/mcp/overview/how-connections-work) fills that gap today. It’s a hosted Streamable HTTP server at `https://mcp.zapier.com/api/v1/connect` that runs actions through the apps already connected to your Zapier account, so “draft a reply to Sam and put Friday’s dinner on my calendar” becomes two tool calls.

```bash
openclaw mcp add zapier --url https://mcp.zapier.com/api/v1/connect --transport streamable-http --auth oauth
openclaw mcp login zapier
```

In our test, `openclaw mcp login zapier` registered a client and opened Zapier’s authorization page. If OAuth fails in your setup, Zapier’s docs cover a [connection token](https://docs.zapier.com/mcp/get-started/authentication) sent as a Bearer header for clients it doesn’t list.

**Best for:** email, calendar, and the long tail of SaaS apps that have no MCP server of their own.

**Tradeoffs:** each successful tool call uses [two tasks](https://docs.zapier.com/mcp/features/usage) from your Zapier plan’s allowance, and Zapier sits between your agent and every app, so you’re trusting a second company with those connections. Zapier MCP doesn’t accept SSE, which is one more reason to set the transport explicitly.

### 7. Todoist MCP

Doist runs an [official Todoist MCP server](https://github.com/Doist/todoist-ai) at `https://ai.todoist.net/mcp` over Streamable HTTP with OAuth. It reads and writes tasks, projects, and due dates, which suits the way most people use a messaging agent: firing off “remind me to renew the passport next Tuesday” from a phone and having it land in the right project.

```bash
openclaw mcp add todoist --url https://ai.todoist.net/mcp --transport streamable-http --auth oauth
openclaw mcp login todoist
```

We ran both commands against OpenClaw 2026.10.1 in a sandboxed config; `login` discovered Todoist’s OAuth endpoints and printed the authorization URL with no manual client setup.

**Best for:** capturing tasks from chat and asking “what’s due today?” each morning.

**Tradeoffs:** it has write access to your whole task list, so keep approval prompts on for deletes and bulk edits.

### 8. Home Assistant MCP

Home Assistant ships a [Model Context Protocol Server integration](https://www.home-assistant.io/integrations/mcp_server/) that lets an agent control your devices and read the current state of your home. Because OpenClaw usually runs on a machine inside your network, it can reach `http://homeassistant.local:8123/api/mcp` directly, without the internet exposure that cloud-hosted assistants need. Enable it under **Settings > System > AI**, create a long-lived access token under your profile’s **Security** tab, and keep it in an environment variable.

```bash
echo 'HA_TOKEN=<long-lived access token>' >> ~/.openclaw/.env
openclaw mcp set home-assistant '{"url":"http://homeassistant.local:8123/api/mcp","transport":"streamable-http","headers":{"Authorization":"Bearer ${HA_TOKEN}"}}'
openclaw mcp doctor home-assistant --probe
```

OpenClaw substitutes `${HA_TOKEN}` when it loads config, reading the process environment or `~/.openclaw/.env`, so the token stays out of `openclaw.json`. Home Assistant also supports OAuth 2.0 with PKCE if you’d rather sign in than manage a token.

**Best for:** “turn off the downstairs lights” and “is the garage door open?” from anywhere you can message OpenClaw.

**Tradeoffs:** the integration requires an administrator account by default and exposes whatever its LLM API can control, so scope the exposed entities in Home Assistant before you connect it. It supports tools, prompts, and the Assist context resource, but not sampling or notifications.

### 9. Linear MCP

[Linear’s remote MCP server](https://linear.app/docs/mcp) at `https://mcp.linear.app/mcp` uses Streamable HTTP and OAuth 2.1 with dynamic client registration, and it also accepts a Linear API key as a Bearer token. Its tools find, create, and update issues, projects, and comments, so you can file a bug from a Slack thread or ask what’s blocking this cycle without opening the app.

```bash
openclaw mcp add linear --url https://mcp.linear.app/mcp --transport streamable-http --auth oauth
openclaw mcp login linear
```

**Best for:** people who already run their work or side projects in Linear and want to triage from chat.

**Tradeoffs:** it overlaps with GitHub Issues if you use both; pick the one that holds your real backlog, or the agent will guess wrong about where a ticket belongs.

### 10. Context7

[Context7](https://github.com/upstash/context7), from Upstash, serves current documentation and code examples for libraries and frameworks. The hosted server at `https://mcp.context7.com/mcp` works without a key; a free key from the Context7 dashboard, sent as `Authorization: Bearer`, raises the rate limits. It’s the server OpenClaw’s own docs use in their examples, and when we probed it from OpenClaw it reported two tools, `resolve-library-id` and `query-docs`.

```bash
openclaw mcp add context7 --url https://mcp.context7.com/mcp --transport streamable-http
openclaw mcp probe context7
```

**Best for:** coding questions from your phone, where a stale API answer from training data would send you down the wrong path.

**Tradeoffs:** it covers library docs only; for anything else on the web, Parallel Search is the better tool, and the two don’t overlap much.

## The picks side by side

| Server | What it gives OpenClaw | Auth | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | None required | Free; API key optional for higher limits |
| Parallel Task MCP | Deep research subagents, batch enrichment | API key | $5/month free allowance, then per request |
| GitHub MCP | Repos, issues, PRs, CI from chat | OAuth | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Notion MCP | Notes, docs, and databases | OAuth | Free with a Notion plan |
| Zapier MCP | Gmail, Calendar, and other apps connected to your Zapier account | OAuth | 2 Zapier tasks per successful call |
| Todoist MCP | Tasks, projects, and due dates | OAuth | Free with a Todoist account |
| Home Assistant MCP | Smart home control and device state | Access token or OAuth | Free, self-hosted |
| Linear MCP | Issues, projects, and comments | OAuth or API key | Free with a Linear plan |
| Context7 | Current library and framework docs | None required | Free; API key optional for higher limits |

## When a skill beats an MCP server

OpenClaw grew out of the Pi harness, and it inherited Pi's shell-first instincts: for tools that are really just CLIs, a ClawHub skill is often lighter than an MCP server, because the agent shells out on demand instead of carrying tool schemas in context on every turn. Parallel works both ways; the [Parallel CLI ships as an OpenClaw skill](https://docs.parallel.ai/integrations/clawhub) if you'd rather skip MCP entirely.

As a rule of thumb, hosted services with OAuth and state (GitHub, Notion) fit MCP; local, composable, context-cheap tooling fits skills. And whichever route you pick, keep the total small. Every server adds tool definitions to the context window and another place for tool-name collisions, and three to five well-chosen servers reliably beat fifteen.

## Frequently asked questions

**Is MCP the best way to extend OpenClaw?** It's one of two good ways. MCP is the right fit for hosted, authenticated services; skills are the right fit for local CLI tooling. OpenClaw can also run as an MCP server itself via `openclaw mcp serve`, so other agents like Claude Code can read and send your channel conversations.

**Do I need to configure web search at all?** Once. OpenClaw uses a key-free provider only when you select it, so install the Parallel plugin and set `tools.web.search.provider` to `parallel-free` for free Parallel search with no API key. Add the Search MCP or an API key when you want explicit page fetching or higher rate limits.

**Are these servers free?** Parallel Search, GitHub, Playwright, Home Assistant, and Context7 cost nothing. The Task MCP is covered by Parallel’s $5 recurring monthly free credit until you outgrow it. Notion, Todoist, and Linear work with your existing account, and each successful Zapier MCP call uses two tasks from your Zapier plan.

**Why don’t new tools show up after I save a server?** Saving only writes config. Run `openclaw mcp doctor <name> --probe` to confirm the server connects and lists its tools, then start the Gateway again (CLI edits need it stopped) and send a new message; with hot reload on, changed servers are picked up on the next turn.

## Start with search

The one-line `openclaw mcp set` command above is the whole setup, and it never asks for an account, a key, or a card. If OpenClaw becomes the way you work, [create a free Parallel account](https://platform.parallel.ai/) for higher rate limits and the $5 monthly credit that covers the Task MCP's research subagents. Then test it on your own questions.

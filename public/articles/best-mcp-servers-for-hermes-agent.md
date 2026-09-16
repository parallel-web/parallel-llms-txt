# The best MCP servers for Hermes Agent in 2026

Hermes Agent treats MCP as a first-class feature, with a curated catalog and per-tool filtering. Here's how its MCP support works, the six servers worth installing, and where a bundled skill beats a server.

[Hermes Agent](https://hermes-agent.nousresearch.com/) is Nous Research's open-source personal agent. It lives on Telegram, Discord, Slack, WhatsApp, Signal, email, and the CLI, keeps persistent memory, learns skills, and lets you pick your model provider. It also treats the [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) as a first-class feature rather than an afterthought, with a curated catalog, OAuth support, and per-tool filtering built in.

This guide explains how Hermes handles MCP and which servers are worth your config space. Disclosure first: we make Parallel, our search server is our top pick, and we show the numbers so you can discount our bias accordingly.

## How MCP works in Hermes Agent

MCP support ships with the standard install. Servers are declared under `mcp_servers` in `~/.hermes/config.yaml`, and [Hermes supports both kinds](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp): local stdio servers it spawns as subprocesses, and remote HTTP servers, including OAuth 2.1 endpoints where Hermes handles discovery, client registration, PKCE, and token refresh for you. At startup it discovers each server's tools and registers them like native ones.

Two features set Hermes apart from most harnesses. First, the curated catalog: `hermes mcp` opens a picker of servers Nous staff has reviewed, and `hermes mcp install` <name> walks through credentials for you. Second, tool selection: at install time Hermes probes the server and shows a checklist, so you expose only the tools you actually want. That per-server filtering is the best defense against context bloat from tool-heavy servers.

```bash
# ~/.hermes/config.yaml
mcp_servers:
  parallel_search:
    url: "https://search.parallel.ai/mcp"

  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
```

Coming from Claude Code? `hermes import-agent claude-code` migrates the `mcpServers` block from `~/.claude.json`, along with skills and instructions, so you don't have to redo your setup by hand.

## The best MCP servers for Hermes Agent

### 1. Parallel Search MCP

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is the three-line yaml entry above. It's a hosted server, free to use with no API key, that gives Hermes two tools: `web_search` for ranked, LLM-ready results with excerpts dense enough to answer from directly, and `web_fetch` for pulling token-efficient markdown from specific URLs, PDFs and JavaScript-rendered pages included.

Hermes bundles its own web stack (search, extract, browse) through a Nous Portal subscription, and it's good. The case for the Parallel MCP is that it's free without any subscription, it works identically whichever model provider you point Hermes at, and the underlying Search API ranks first on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 15 search API products across 7 providers (August 2026). Since Hermes lets you run both side by side, the practical move is to try them on your own questions.

**Best for:** free, provider-neutral web search and page fetching for every Hermes surface, from CLI chats to Telegram.

**Tradeoffs:** we're the vendor, so we're biased. The free hosted tier runs in low-latency basic mode with anonymous rate limits; an API key lifts the limits, and long research jobs belong on the Task MCP.

### 2. Parallel Task MCP

The [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) hands Hermes a fleet of web research subagents. Instead of the main loop making thirty search calls, a task runs asynchronously on Parallel's side, fans out across sources, and returns a structured, cited result. Combined with Hermes's scheduling and messaging, that turns "research this properly and message me when it's done" into a working pattern; we've written about [always-on monitoring with Hermes](https://parallel.ai/blog/always-on-agents-monitor-api) built the same way.

**Best for:** deep research reports, batch enrichment over lists, and scheduled briefs.** Tradeoffs:** needs an API key and runs in minutes rather than seconds. Every account gets a [recurring $5 monthly free credit](https://parallel.ai/pricing), which comfortably covers personal use.

### 3. Linear MCP

Linear's remote OAuth server is in the Nous-reviewed catalog, so `hermes mcp install linear` handles the whole flow, and the install-time checklist lets you expose just `find_issues` and `get_issue` if read-only triage is all you want. For a messaging-native agent, filing and checking issues from any channel is a daily-use capability.

**Best for:** issue tracking from chat.** Tradeoffs:** write tools can create and edit real issues; start read-only and widen later.

### 4. n8n MCP

Also a catalog entry. n8n is the self-hostable automation platform, and its MCP server lets Hermes inspect and manage your workflows: check why a run failed, trigger a job, or wire a new automation. If Hermes is your front door to a homelab or a small team's ops, this is the connective tissue.

**Best for:** driving existing automations by conversation.** Tradeoffs:** an agent that can trigger workflows can trigger the wrong one; scope credentials narrowly.

### 5. Sentry MCP

Sentry's hosted OAuth server gives Hermes your production errors, traces, and release issues. Paired with persistent memory, "is this the same crash we saw last month?" becomes a question the agent can actually answer.

**Best for:** error triage and incident context from chat.** Tradeoffs:** it's built for human-in-the-loop debugging, not as a full Sentry API replacement.

### 6. Filesystem MCP

The reference stdio server from the official MCP repo, and the example in Hermes's own docs. Point it at a directory and Hermes can read and summarize what's there. Its virtue is the scoping: the agent sees exactly the paths you passed as arguments, nothing else.

**Best for:** scoped access to project folders.** Tradeoffs:** redundant if you already give Hermes shell access to the same paths.

### What about GitHub?

Deliberately absent. GitHub's hosted MCP requires each client to bring its own OAuth app, and Nous concluded that Hermes's bundled github skills driving the `gh` CLI are the more capable integration, so GitHub isn't in the catalog. It's a useful reminder that MCP isn't automatically the best transport for every tool; when a first-class CLI exists, a skill wrapping it can beat a server wrapping the same API.

## The picks side by side

| Server | What it gives Hermes | Install route | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | config.yaml, 3 lines | Free; API key optional |
| Parallel Task MCP | Deep research subagents | config.yaml + API key | $5/month free credit, then per request |
| Linear MCP | Issues and projects from chat | hermes mcp install linear | Free with Linear |
| n8n MCP | Inspect and drive automations | hermes mcp install n8n | Free, self-hosted |
| Sentry MCP | Errors and traces in context | Remote OAuth | Free with Sentry |
| Filesystem MCP | Scoped local file access | config.yaml stdio entry | Free |

## Catalog first, then config

When a server exists in the catalog, install it from there: the manifest has been reviewed by Nous, credentials are prompted for and stored properly, and the tool checklist runs automatically. Hermes's docs still advise reading a manifest's source and bootstrap commands before installing, which is good hygiene. For everything else, `config.yaml` takes any spec-compliant server, remote or stdio. Either way, resist hoarding: every enabled tool spends context on every turn, and a handful of servers you use daily beats a long tail you don't.

## Frequently asked questions

**Is MCP the best way to add web search to Hermes?** It's the best free way. Hermes's bundled web tools require a Nous Portal subscription; the Parallel Search MCP costs nothing, needs no key, and benchmarks at the top of its class. Run both on your own questions and keep the winner.

**Does Hermes support remote OAuth MCP servers?** Yes. Set `auth: oauth` on an HTTP server and Hermes handles registration, PKCE, token exchange, and refresh via the MCP SDK.

**Can I limit which tools a server exposes?** Yes, and you should. The install-time checklist and per-server filtering let you expose only the tools you want Hermes to see.

**Can I bring my MCP setup from Claude Code?** Yes. `hermes import-agent claude-code` migrates the `mcpServers` block from `~/.claude.json` automatically.

## Try it on your own questions

Add the three yaml lines, restart `hermes chat`, and ask something that needs the current web. That's the whole evaluation loop, and it's free. When you're ready for research subagents and higher limits, [a free Parallel account](https://platform.parallel.ai/) includes $5 in credits every month, so the Task MCP costs nothing to evaluate either.

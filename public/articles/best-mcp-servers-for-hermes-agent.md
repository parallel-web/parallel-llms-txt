# The best MCP servers for Hermes Agent in 2026

Hermes Agent treats MCP as a first-class feature, with a curated catalog and per-tool filtering. This guide covers how its MCP support works, the six servers worth installing, and where a bundled skill beats a server.

[Hermes Agent](https://hermes-agent.nousresearch.com/) is Nous Research's open-source personal agent. It lives on Telegram, Discord, Slack, WhatsApp, Signal, email, and the CLI, keeps persistent memory, learns skills, and lets you pick your model provider. It also treats the [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) as a first-class feature, with a curated catalog, OAuth support, and per-tool filtering built in.

This guide explains how Hermes handles MCP and which servers are worth your config space. Disclosure first: we make Parallel, our search server is our top pick, and we show the numbers so you can discount our bias accordingly.

## How MCP works in Hermes Agent

MCP support ships with the standard install. Servers are declared under `mcp_servers` in `~/.hermes/config.yaml`, and [Hermes supports both kinds](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp): local stdio servers it spawns as subprocesses, and remote HTTP servers, including OAuth 2.1 endpoints where Hermes handles discovery, client registration, PKCE, and token refresh for you. At startup it discovers each server's tools and registers them like native ones.

Hermes differs from most harnesses in two ways. First, the curated catalog: `hermes mcp` opens a picker of servers Nous staff has reviewed, and `hermes mcp install` <name> walks through credentials for you. Second, tool selection: at install time Hermes probes the server and shows a checklist, so you expose only the tools you want. That per-server filtering is the best defense against context bloat from tool-heavy servers.

```yaml
# ~/.hermes/config.yaml
mcp_servers:
  parallel:
    url: "https://mcp.parallel.ai/mcp"
    # optional: an API key adds web_research and higher rate limits
    # headers:
    #   Authorization: "Bearer ${PARALLEL_API_KEY}"

  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
```

```bash
hermes mcp                   # interactive picker of Nous-reviewed servers
hermes mcp catalog           # plain-text list
hermes mcp install linear    # install a catalog entry by name
```

Coming from Claude Code? `hermes import-agent claude-code`, from the agent-importers plugin, migrates the mcpServers block from ~/.claude.json, along with skills and instructions, so you don't have to redo your setup by hand.

## The best MCP servers for Hermes Agent

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) is the short yaml entry above, and the Parallel MCP page also has a one-click Hermes install. It's a hosted server that needs no account or API key for three tools: web_search for ranked, LLM-ready results with excerpts dense enough to answer from directly, web_fetch for reading up to 20 URLs per call as relevant excerpts or full markdown, PDFs and JavaScript-rendered pages included, and web_decisions for typed questions, like a probability or a pick among options, answered with sources. Add an API key as a Bearer header and a fourth tool, web_research, researches one question and returns a cited answer in the same call.

Hermes ships its own web tools. With no search credentials they rotate across the free tiers of Exa, Parallel, Firecrawl, and Keenable, and a paid Nous Portal subscription adds managed search through the Tool Gateway. The case for connecting the Parallel MCP directly is that the model writes a full objective plus several keyword queries for every search, the same provider answers every call, and it works identically whichever model provider you point Hermes at. Since Hermes lets you run both side by side, the practical move is to try them on your own questions.

**Best for:** free, provider-neutral web search and page fetching for every Hermes surface, from CLI chats to Telegram.

Tradeoffs: we're the vendor, so we're biased. Keyless calls run Search in its low-latency fast mode at lower rate limits; an API key lifts the limits and adds web_research, billed at the underlying API rates. With a key you can also add an x-parallel-mcp-config header to pin a search mode or include and exclude domains.

For the full setup, including a live connection test, restricting a session to the MCP, and adding an API key, see our [Hermes Agent web search guide](https://parallel.ai/articles/hermes-agent-web-search).

### 2. Notion MCP

Notion's hosted server at https://mcp.notion.com/mcp is in the Nous-reviewed catalog, so `hermes mcp install notion` runs the browser OAuth flow and the tool checklist for you. For an agent with persistent memory that you message from your phone, Notion is a natural place for what it produces: plans, reading lists, meeting notes, and research summaries land as pages and database rows you can find later, and Hermes can read what's already there before it answers.

Best for: getting Hermes's output into the workspace you already use. Tradeoffs: it can write to every page your Notion account can reach, so uncheck the write tools at install time if you only want it to read.

### 3. Linear MCP

Linear's remote OAuth server is in the Nous-reviewed catalog, so `hermes mcp install linear` handles the whole flow, and the install-time checklist lets you expose just `find_issues` and `get_issue` if read-only triage is all you want. For a messaging-native agent, filing and checking issues from any channel is something you will use daily.

**Best for:** issue tracking from chat.** Tradeoffs:** write tools can create and edit real issues; start read-only and widen later.

### 4. n8n MCP

Also a catalog entry. n8n is the self-hostable automation platform, and `hermes mcp install n8n-official` connects Hermes to n8n's official MCP server on your n8n Cloud or self-hosted instance over browser OAuth, with no local bridge or n8n API key. Once an n8n admin turns on instance-level MCP, Hermes can inspect and run the workflows you expose to it. If Hermes is your front door to a homelab or a small team's ops, this server connects it to the automations you already run.

**Best for:** driving existing automations by conversation.** Tradeoffs:** an agent that can trigger workflows can trigger the wrong one; scope credentials narrowly.

### 5. Sentry MCP

Sentry's hosted OAuth server is in the catalog as well, so `hermes mcp install sentry` connects it and gives Hermes your production errors, traces, and release issues. Paired with persistent memory, "is this the same crash we saw last month?" is a question the agent can answer.

**Best for:** error triage and incident context from chat.** Tradeoffs:** it's built for human-in-the-loop debugging, not as a full Sentry API replacement.

### 6. Filesystem MCP

The reference stdio server from the official MCP repo, and the example in Hermes's own docs. Point it at a directory and Hermes can read and summarize what's there. The agent sees only the paths you passed as arguments.

**Best for:** scoped access to project folders.** Tradeoffs:** redundant if you already give Hermes shell access to the same paths.

### What about GitHub?

Deliberately absent. GitHub's hosted MCP requires each client to bring its own OAuth app, and Nous concluded that Hermes's bundled github skills driving the `gh` CLI are the more capable integration, so GitHub isn't in the catalog. When a first-class CLI exists, a skill wrapping it can beat an MCP server wrapping the same API.

## The picks side by side

| Server | What it gives Hermes | Install route | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetching, typed decisions; research with a key | config.yaml, 3 lines | Free; API key optional |
| Notion MCP | Pages and databases from chat | hermes mcp install notion | Free with Notion |
| Linear MCP | Issues and projects from chat | hermes mcp install linear | Free with Linear |
| n8n MCP | Inspect and run automations | hermes mcp install n8n-official | Included with n8n |
| Sentry MCP | Errors and traces in context | hermes mcp install sentry | Free with Sentry |
| Filesystem MCP | Scoped local file access | config.yaml stdio entry | Free |

## Catalog first, then config

When a server exists in the catalog, install it from there: the manifest has been reviewed by Nous, credentials are prompted for and stored properly, and the tool checklist runs automatically. Hermes's docs still advise reading a manifest's source and bootstrap commands before installing, which is good hygiene. For everything else, `config.yaml` takes any spec-compliant server, remote or stdio. Either way, keep the list short: every enabled tool spends context on every turn, so enable the servers you use daily and leave the rest off.

## Frequently asked questions

**Is MCP the best way to add web search to Hermes?** It's the most controllable free way. Hermes's built-in web tools also work without a key, rotating across the free tiers of Exa, Parallel, Firecrawl, and Keenable, but each search goes out as a single query string. Parallel MCP costs nothing, needs no key, and lets the model send an objective plus several keyword queries. Run both on your own questions and keep the winner.

**Does Hermes support remote OAuth MCP servers?** Yes. Set `auth: oauth` on an HTTP server and Hermes handles registration, PKCE, token exchange, and refresh via the MCP SDK.

**Can I limit which tools a server exposes?** Yes, and you should. The install-time checklist and per-server filtering let you expose only the tools you want Hermes to see.

Can I bring my MCP setup from Claude Code? Yes. `hermes import-agent claude-code`, from the agent-importers plugin, migrates the mcpServers block from ~/.claude.json automatically.

## Try it on your own questions

Add the three yaml lines (or use the one-click Hermes install on [parallel.ai/mcp](https://parallel.ai/mcp)), restart hermes chat, and ask something that needs the current web; that evaluation costs nothing. When you want web_research and higher limits, [a free Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

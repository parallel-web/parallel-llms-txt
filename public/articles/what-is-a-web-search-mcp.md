# What is a web search MCP? How AI agents search the live web

A web search MCP is how an AI agent reaches the live web from Claude Code, Cursor, Codex, or any other MCP client, and the server you connect shapes what the model reads, what it costs, and how much context it uses. This guide covers how a web search MCP works, what a tool call returns, how five popular servers differ, and how to choose and install one.

A web search MCP is a Model Context Protocol (MCP) server that exposes web search, and usually page fetching, as tools an AI model can call. The client lists the server’s tools, the model decides when it needs current information, and the server runs the query and returns ranked results with text the model can read and cite.

MCP is the open standard underneath. Anthropic open-sourced it on November 25, 2024, and donated it to the [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), a directed fund under the Linux Foundation, on December 9, 2025. Because every client speaks the same protocol, one web search server works in Claude Code, Cursor, Codex, VS Code, Gemini CLI, and most other agent clients without any integration code. For the protocol itself, see [What is MCP](https://parallel.ai/articles/what-is-mcp).

## Why agents need web search

Every model stops learning at a training cutoff. A library released last month, a price changed last week, or a regulation published yesterday doesn’t exist for the model until something retrieves it. Long-tail facts are the other gap: a model may never have seen the changelog of a mid-sized open-source project, even if it predates the cutoff.

A web search MCP closes both gaps from inside the tools you already use. Ask a coding agent how to configure a library, and it can check the current docs before it writes code instead of waiting for you to paste them in. Web search is usually the first MCP server people add for that reason.

## How a web search MCP works

MCP defines three roles. The **host** is the application you use, such as Claude Code or Cursor. The **client** is the connector inside the host, one per server. The **server** is the search provider’s side, which turns tool calls into searches.

A search request moves through four steps:

1. **Discovery.** The client asks the server for its tools (`tools/list`). The server returns each tool’s name, description, and input schema, and the host adds them to the model’s context.
2. **Decision.** When the model decides it needs the web, it emits a tool call with arguments that match the schema.
3. **Execution.** The client sends a `tools/call` request as a JSON-RPC 2.0 message. The server queries its search index and returns the results as tool content.
4. **Reasoning.** The model reads the results, fetches a page if it needs more, and answers with citations.

### Transports: local and remote

The [current MCP specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports) defines two standard transports. With **stdio**, the client launches the server as a local subprocess and exchanges newline-delimited JSON-RPC over standard input and output. With **Streamable HTTP**, each message is an HTTP POST to a single endpoint, and replies come back as JSON or a server-sent event stream. Hosted web search servers use Streamable HTTP, so setup is a URL rather than a package install. The older HTTP+SSE transport has been deprecated since the 2025-03-26 revision.

The 2026-07-28 revision, the current one, made the protocol stateless. It [removed](https://modelcontextprotocol.io/specification/2026-07-28/changelog) the `initialize` handshake and protocol-level session IDs, and added a `server/discover` call that advertises a server’s versions and capabilities. Clients built for the new revision fall back to the handshake when they reach an older server, so existing search servers keep working. [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers the tradeoffs between the two transports.

## What a web search tool call looks like

We sent this request to [Parallel MCP](https://parallel.ai/mcp) on November 5, 2026, with no API key:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "web_search",
    "arguments": {
      "objective": "What changed in the 2026-07-28 revision of the Model Context Protocol specification",
      "search_queries": ["MCP 2026-07-28 changelog", "MCP stateless specification"]
    }
  }
}
```

The server returned a text block holding JSON. Here are two of the results, with the excerpts trimmed:

```json
{
  "search_id": "search_3e38f6db9994a51aac61883b469dd5eb",
  "results": [
    {
      "url": "https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/changelog.mdx",
      "title": "modelcontextprotocol/docs/specification/2026-07-28/changelog.mdx at main",
      "publish_date": "2026-07-28",
      "excerpts": ["... Make MCP stateless: remove the initialize/notifications/initialized handshake. Every request now carries its protocol version and client capabilities in _meta ..."]
    },
    {
      "url": "https://blog.modelcontextprotocol.io/posts/2026-07-28",
      "title": "The 2026-07-28 Specification",
      "publish_date": "2026-07-28",
      "excerpts": ["The 2026-07-28 Model Context Protocol specification is out, bringing a stateless protocol core, Multi Round-Trip Requests, header-based routing, cacheable list results ..."]
    }
  ],
  "session_id": "session_3e38f6db9994a51aac61883b469dd5eb"
}
```

The model gets multi-sentence excerpts chosen for the objective, which is often enough to answer without opening a single page. When it needs the full document, it calls `web_fetch` with the URL. The `session_id` lets later calls in the same conversation be grouped together. Parallel marks its tools `readOnlyHint: true` and `openWorldHint: true`, MCP tool annotations that tell the client the tools read from the open web and change nothing. Clients can use those hints when they decide which calls to auto-approve.

## What tools a web search MCP exposes

Most web search servers cover two jobs. A **search** tool takes a query and returns ranked results, and a **fetch** tool takes a URL and returns the page’s content. Some servers add crawling, browser interaction, or a research agent. Extra tools widen what the agent can do, but each schema also takes up context and gives the model one more option to choose from on every turn.

Here’s how the default tool sets of five widely used servers compare, per each provider’s documentation as of October 2026 (Parallel's row reflects the Parallel MCP release of November 5, 2026):

| Server | How you connect | Default tools | API key |
| --- | --- | --- | --- |
| Parallel MCP | Hosted: https://mcp.parallel.ai/mcp | web_search, web_fetch, web_decisions; web_research with sign-in or an API key | Optional; keyless use is free at lower rate limits |
| Exa MCP | Hosted: https://mcp.exa.ai/mcp | web_search_exa, web_fetch_exa; advanced search and agent_run are opt-in | Optional for search; agent_run needs an API key or OAuth |
| Firecrawl MCP | Hosted: https://mcp.firecrawl.dev/v2/mcp | firecrawl_search, firecrawl_scrape, firecrawl_parse on the keyless endpoint | Optional for those three; the full server adds crawl, interact, and research tools |
| Tavily MCP | Hosted: https://mcp.tavily.com/mcp/ | tavily-search, tavily-extract | Optional; keyless use needs the X-Tavily-Access-Mode: keyless header |
| Brave Search MCP | Self-hosted npm package (stdio by default) | brave_web_search, brave_local_search, plus news, image, video, and summarizer tools | Required (BRAVE_API_KEY) |

For a ranked comparison with benchmark results, see [The best web search MCP server in 2026](https://parallel.ai/articles/best-web-search-mcp). For the keyless options only, see [Best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp).

## Web search MCP vs. built-in search vs. a search API

You can give a model web access in three ways, and they suit different jobs:

| Approach | Where it works | Provider choice | Best for |
| --- | --- | --- | --- |
| Built-in model search (e.g., Claude’s or OpenAI’s web search tool) | Only that model provider’s API and apps | Fixed by the model provider | Quick grounding inside one provider’s stack |
| Web search MCP | Any MCP client: coding agents, desktop assistants, IDEs | Any provider; switching is a URL change | Interactive agents and tools you don’t control the code of |
| Search API called from your code | Your own application | Any provider | Production pipelines that need retries, caching, and cost control |

Use a web search MCP when the agent runs inside an MCP client you didn’t build, or when you want the same search provider across several clients. Call the API directly when you own the agent loop, such as a backend service or a batch job. You can also do both against one provider: the `web_search` tool in Parallel MCP runs on the same [Search API](https://parallel.ai/articles/what-is-a-web-search-api) that production code calls. [MCP servers vs. agent skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis) covers a fourth option, wrapping search in a command-line tool.

## How to choose a web search MCP

Once a server is installed, these are the differences that matter:

- **What comes back.** A server that returns query-relevant excerpts lets the model answer from search alone. One that returns short snippets forces a fetch per result, and each fetch costs a turn and more tokens.
- **Accuracy inside an agent.** Vendor claims vary in method, so check independent results and run your own queries through each server.
- Context cost. Every tool schema sits in the model’s context. Two focused tools cost less context than a dozen general ones, and some servers let you trim the list: Parallel’s takes a `?tools=` parameter, such as `https://mcp.parallel.ai/mcp?tools=web_search,web_fetch`.
- Access and limits. Keyless access is fine for trying a server. Production use needs an API key or OAuth for higher rate limits, and organization-wide deployments may need enforced sign-in. Parallel serves OAuth sign-in at `https://mcp.parallel.ai/mcp?login`, which also adds its `web_research` tool.
- Controls. Check whether you can restrict sources, set freshness, or pick a speed tier. Parallel MCP lets you fix the [search mode](https://docs.parallel.ai/search/modes) (turbo, fast, basic, or advanced), include or exclude domains, and cap max results for every call on a connection through [override settings](https://docs.parallel.ai/integrations/mcp/quickstart#override-settings) in the `x-parallel-mcp-config` header. Overrides need sign-in or an API key.

## Treat search results as untrusted input

A web search MCP pipes third-party text straight into the model’s context, and any page can carry instructions written for a model to follow. That’s prompt injection, and search tools are one of its main entry points.

A few habits reduce the risk. Keep search tools read-only and check their annotations. Be careful about giving one agent unattended write access, such as shell commands, email, or production credentials, alongside open web search; require approval for the write tools instead. Connect to the provider’s official endpoint rather than a third-party wrapper, and review an MCP server the way you’d review any dependency. The MCP project publishes [security best practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices) for client and server authors.

## How to add a web search MCP

Parallel MCP needs no account. [parallel.ai/mcp](https://parallel.ai/mcp) has one-click installs for Claude, ChatGPT, Cursor, VS Code, Grok Bot, Antigravity, OpenCode, and Hermes, plus a setup prompt you can paste into any other agent. From a terminal, in Claude Code, run:

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

In Codex CLI:

```bash
codex mcp add parallel --url https://mcp.parallel.ai/mcp
```

In Cursor, add the server to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "Parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Restart the client if it doesn’t pick up the change, then ask about something recent enough to fall after the model’s training cutoff. For `web_research` and higher rate limits, connect to `https://mcp.parallel.ai/mcp?login` to sign in, or create a key on the [Parallel Platform](https://platform.parallel.ai) and send it as an `Authorization: Bearer` header. Signed-in calls bill at Search API rates, $1 per 1,000 requests in the default fast mode, and new accounts get up to $80 in free credits plus $5 a month with a card on file. The [installation docs](https://docs.parallel.ai/integrations/mcp/installation) cover VS Code, Claude Desktop, Windsurf, Gemini CLI, Zed, and more than 20 other clients, including an mcp-remote bridge config for clients that only run local servers.

## Frequently asked questions

### What is a web search MCP?

A web search MCP is a Model Context Protocol server that gives an AI model tools to search the web and read pages. Any MCP-compatible client, such as Claude Code, Cursor, or Codex, can connect to it and call those tools when the model needs current information.

### Is there a free web search MCP?

Yes. Parallel, Exa, and Firecrawl run hosted web search MCP servers that work without an API key, at lower rate limits. Parallel’s keyless tools are `web_search`, `web_fetch`, and `web_decisions`, and calls past the free limit are rate limited rather than billed. Tavily’s hosted server also works keyless if the client sends the X-Tavily-Access-Mode: keyless header. Brave’s server requires an API key.

### What’s the difference between a web search MCP and a web search API?

A web search API is an HTTP endpoint your code calls directly. A web search MCP wraps search in the Model Context Protocol so an MCP client can discover and call it as a tool without custom code. Many providers, Parallel included, run the MCP server on top of the same API.

### Do I need a web search MCP if my model already has built-in search?

Not always. Built-in search works inside one provider’s API and apps. A web search MCP lets you pick the search provider, use it across clients from different vendors, and control settings like sources and speed.

### Is a web search MCP local or remote?

Either. Hosted servers such as Parallel’s, Exa’s, and Tavily’s run remotely over Streamable HTTP, so you connect with a URL. Others, like Brave’s, run on your machine as a local process over stdio.

## Get started

Add [Parallel MCP](https://parallel.ai/mcp) to your client in one click or with the command above, and try a question your model can’t answer from memory. The [launch post](https://parallel.ai/blog/parallel-mcp-2) covers what changed in the November 2026 release. When you’re ready to compare providers on results and cost, [The best web search MCP server in 2026](https://parallel.ai/articles/best-web-search-mcp) puts five of them side by side.

# MCP server

An MCP server is a local process or remote HTTP service that exposes tools, read-only resources, and prompt templates to AI clients over JSON-RPC 2.0 using the Model Context Protocol.

An MCP server is a process or remote HTTP service that exposes tools, read-only data resources, and prompt templates to AI clients over the [Model Context Protocol](/learn/model-context-protocol) (MCP). Instead of writing a bespoke integration for every combination of model client and external API, you implement one MCP server and any MCP-compatible host—Claude Code, Cursor, Codex, or your own [AI agent](/learn/ai-agent) runtime—discovers and invokes its capabilities over JSON-RPC 2.0.

**MCP client-server architecture**

```text
┌─────────────────────┐   JSON-RPC 2.0    ┌───────────────────────┐
│   Host / AI Agent   │  (stdio or HTTP)  │      MCP Server       │
│ ┌─────────────────┐ │ ────────────────▶ │ • tools/list & call   │
│ │   MCP Client    │ │                   │ • resources/read      │
│ └─────────────────┘ │ ◀──────────────── │ • prompts/get         │
└─────────────────────┘  structured data  └───────────┬───────────┘
                                                      │ auth & calls
                                                      ▼
                                            ┌───────────────────┐
                                            │ APIs / DBs / Web  │
                                            └───────────────────┘
```

Anthropic open-sourced MCP in November 2024 and later donated the protocol to the Linux Foundation's [Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), turning the `N x M` integration problem (every client wired to every service) into `N + M`.

## The three primitives an MCP server exposes

Every MCP server declares its capabilities during the `initialize` handshake. Most servers focus on **tools**, though the specification defines three distinct primitives:

1. **Tools (**`**tools/list**`**, **`**tools/call**`**):** Model-controlled actions backed by JSON Schema input definitions—identical in concept to native [tool calling](/learn/tool-calling), but discovered dynamically at runtime rather than hard-coded in the client.
2. **Resources (**`**resources/list**`**, **`**resources/read**`**):** Application-controlled, URI-addressed data objects (files, database rows, logs, API snapshots) that a host can attach to the [context window](/learn/context-window) without invoking an action.
3. **Prompts (**`**prompts/list**`**, **`**prompts/get**`**):** User-controlled instruction templates with named arguments, often surfaced as slash commands in coding agents.

```json
{
  "request": {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "web_search",
      "arguments": {
        "objective": "Find the latest MCP Streamable HTTP transport spec",
        "search_queries": ["modelcontextprotocol Streamable HTTP spec"]
      }
    }
  },
  "response": {
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
      "content": [
        {
          "type": "text",
          "text": "Streamable HTTP replaces legacy SSE with a single /mcp endpoint..."
        }
      ],
      "isError": false
    }
  }
}
```

## Local (`stdio`) vs. remote (`Streamable HTTP`) transports

MCP servers run in two deployment topologies:

| Transport | How it runs | Auth model | Best fit |
| --- | --- | --- | --- |
| `stdio` | Spawned as a local child process by the host; messages travel over `stdin`/`stdout` | Local env vars, OS keychain, filesystem permissions | Local repos, developer CLIs, private desktop tools |
| `Streamable HTTP` | Hosted remote endpoint (e.g., `https://mcp.parallel.ai/mcp`) supporting POST + optional SSE streaming | OAuth 2.1 or bearer / API-key headers (or keyless free tiers) | Shared SaaS tools, cloud agents, [web search MCP](/learn/web-search-mcp) servers |

For live web access, remote servers like [Parallel MCP](/mcp) eliminate local installs and credential plumbing—an agent connects to a single HTTPS endpoint and immediately gets ranked, excerpted search and page-extraction tools.

## Security and context trade-offs

- **Schema token tax:** Every tool returned by `tools/list` is injected into the model's system context on every turn. Connecting five verbose MCP servers can burn 15K+ tokens before the user types a word—a classic [context engineering](/learn/context-engineering) failure mode. Prefer focused servers with compact tool schemas.
- **Permission boundary:** An MCP server enforces its own authentication, scopes, and rate limits, while the host enforces user confirmation before destructive writes.
- **Untrusted tool outputs:** Any server that reads external web pages, tickets, or emails can return prompt-injection text inside tool results. Treat `tools/call` output as untrusted data, never as privileged instructions.

## Frequently asked questions

**What is the difference between an MCP server and a REST API?**

A REST API is built for human developers writing static client code against documented endpoints. An MCP server wraps one or more APIs (or local systems) in a self-describing JSON-RPC protocol so an LLM host can discover schemas via `tools/list` and call them dynamically.

**Can an MCP server run without an API key?**

Yes. Local `stdio` servers run directly against local files or tools, and some remote servers—including [Parallel MCP](/mcp)—expose rate-limited keyless search tools alongside authenticated tiers.

**How does an MCP server differ from an agent skill?**

An MCP server runs executable code and exposes live tools over JSON-RPC. An [agent skill](/learn/agent-skills) is a portable markdown file (`SKILL.md`) teaching an agent _how_ to combine tools for a specific workflow.

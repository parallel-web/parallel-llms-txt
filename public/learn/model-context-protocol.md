# Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open JSON-RPC 2.0 standard for connecting AI hosts to external tools, data resources, and prompt templates through local stdio or remote Streamable HTTP servers.

The Model Context Protocol (MCP) is an open JSON-RPC 2.0 protocol that standardizes how AI applications (hosts) discover and invoke external tools, read data resources, and load prompt templates from [MCP servers](/learn/mcp-server). Instead of writing custom integration code for every model client and SaaS API, MCP defines a single transport and capability-negotiation contract—allowing any MCP host to connect to any compliant server at runtime.

**MCP host, client, and server topology**

```text
┌────────────────────── AI Host (IDE / Agent) ──────────────────────┐
│  LLM + Runtime    [MCP Client A]             [MCP Client B]       │
└─────────────────────────┬──────────────────────────┬──────────────┘
                          │ stdio (local)            │ Streamable HTTP
                          ▼                          ▼ (remote + OAuth)
                ┌──────────────────┐       ┌────────────────────────┐
                │ Local MCP Server │       │  Remote MCP Server     │
                │ (git, filesystem)│       │  (e.g. Parallel MCP)   │
                └──────────────────┘       └────────────────────────┘
```

Introduced by [Anthropic in November 2024](https://www.anthropic.com/news/model-context-protocol) and later placed under the Linux Foundation's Agentic AI Foundation, MCP became the default extension interface across coding agents (Claude Code, Cursor, Codex, VS Code, Windsurf) and custom enterprise agent harnesses.

## Protocol architecture: host, client, server

MCP separates responsibilities cleanly across three roles:

- **Host:** The user-facing application or agent harness (e.g., an IDE, chat client, or backend orchestrator) that owns the LLM loop, security confirmations, and [context window](/learn/context-window) budget.
- **Client:** A lightweight protocol connector inside the host maintaining a dedicated 1:1 session with one server.
- **Server:** A standalone local process (`stdio`) or remote HTTPS service (`Streamable HTTP`) exposing **tools**, **resources**, and **prompts**.

## Lifecycle of an MCP session

Every MCP connection follows a deterministic JSON-RPC 2.0 lifecycle:

1. **Capability handshake (**`**initialize**`**):** Client and server negotiate protocol version and declare supported primitives (`tools`, `resources`, `prompts`, `sampling`, `roots`).
2. **Runtime discovery (**`**tools/list**`**):** The client fetches available tool names, descriptions, and JSON Schemas and passes selected definitions to the LLM via native [tool calling](/learn/tool-calling).
3. **Invocation (**`**tools/call**`**):** When the model emits a tool call, the host verifies permissions, sends a `tools/call` JSON-RPC request to the owning server, and injects the returned content blocks back into the model transcript.

```json
{
  "step_1_initialize": {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-06-18",
      "capabilities": {},
      "clientInfo": { "name": "research-agent", "version": "1.0.0" }
    }
  },
  "step_2_discover_tools": {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list",
    "params": {}
  }
}
```

## MCP vs. native tool calling vs. OpenAPI vs. WebMCP

| Standard | Layer it solves | Discovery | Primary transport |
| --- | --- | --- | --- |
| Native [tool calling](/learn/tool-calling) | Model-to-runtime structured function calls | Hard-coded in app code | Inside LLM provider API |
| MCP | Host-to-external-service tool & resource bridge | Dynamic (`tools/list`) | `stdio` or `Streamable HTTP` (JSON-RPC 2.0) |
| OpenAPI / REST | Developer-to-server HTTP API specification | Static spec file | HTTP/JSON |
| [WebMCP](/learn/webmcp) | In-browser website-to-agent tool exposure | Declared by the active web page | Browser JavaScript API |

## Security, context cost, and open challenges

- **Context overhead:** Loading schemas from many MCP servers inflates system tokens on every turn and hurts tool routing—manage active servers carefully as part of [context engineering](/learn/context-engineering) and [prompt caching](/learn/prompt-caching).
- **Prompt injection and tool poisoning:** Untrusted servers or web pages returned through a [web search MCP](/learn/web-search-mcp) can embed adversarial instructions inside descriptions or tool outputs. Hosts should isolate trust boundaries, display clear approval prompts for side effects, and pin trusted servers.
- **Auth and multi-tenancy:** Remote `Streamable HTTP` servers rely on OAuth 2.1 or scoped API tokens—or offer keyless rate-limited access for read-only public web search (as in [Parallel MCP](/mcp)).

## Frequently asked questions

**Does MCP replace native tool calling?**

No. The LLM still uses native [tool calling](/learn/tool-calling) to decide which tool to invoke. MCP standardizes how the host discovers those tool schemas from external servers and routes execution to them.

**What is the difference between MCP and an MCP server?**

MCP is the open protocol specification. An [MCP server](/learn/mcp-server) is a concrete program or remote endpoint that implements the server side of that specification (for example, exposing GitHub issues, Postgres queries, or [live web search](/learn/web-search-mcp)).

**Why did Streamable HTTP replace legacy HTTP+SSE in MCP?**

Legacy MCP required maintaining two separate endpoints (an SSE stream and a POST endpoint), complicating stateless serverless hosting and load balancers. `Streamable HTTP` unifies requests and optional streaming responses on a single `/mcp` HTTPS endpoint.

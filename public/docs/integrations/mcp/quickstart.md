> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Install and configure Parallel MCP servers for AI assistants like Cursor, VS Code, and Claude Desktop

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

## When to use Parallel MCPs?

Our MCP servers are the fastest way to explore what's possible with the Parallel APIs — you can use them without writing any code, and compare results across use cases before integrating at scale.

The Parallel MCP Servers expose Parallel APIs to AI assistants and large language model (LLM) workflows, delivering high-quality, relevant results from the web while optimizing for the price-performance balance your AI applications need at scale.

As can be seen in the following table, our MCPs can be useful for quick experimentation with deep research and task groups, or for daily use.

| Use Case                                                              | What                                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Agentic applications where low-latency search is a tool call          | **[Search MCP](/integrations/mcp/search-mcp)**                                        |
| Daily use for everyday deep-research tasks in chat-based clients      | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Enriching a dataset (eg. a CSV) with web data via chat-based clients  | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Running benchmarks on Parallel processors across a series of queries  | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Building high-scale production apps that integrate with Parallel APIs | **[Search MCP](/integrations/mcp/search-mcp) and [Tasks](/task-api/task-quickstart)** |

## Available MCP Servers

Parallel offers two MCP servers that can be installed in any MCP client. They can also be [used programmatically](/integrations/mcp/programmatic-use) by providing your Parallel API key in the Authorization header as a Bearer token.

<Note>
  Looking for help with Parallel documentation? Try our [Docs MCP](https://docs.parallel.ai/mcp) to get AI-assisted answers about Parallel's documentation. This is for navigating our docs only—it does not provide access to Parallel APIs.
</Note>

<Tip>
  **The Search MCP is free to use** — no API key required, great for exploration and light use. For production use cases or higher rate limits, [create a Parallel account](https://platform.parallel.ai) and pass your API key as a Bearer token in the `Authorization` header.
</Tip>

### [Search MCP](/integrations/mcp/search-mcp)

The Search MCP provides drop-in web search capabilities for any MCP-aware model. It invokes the [Search API](/search/search-quickstart) in [`basic` mode](/search/modes) — tuned for low-latency responses inside agent loops.

**Server URLs:**

* `https://search.parallel.ai/mcp` — default. Free anonymous; optional Bearer API key for higher limits. OAuth is not advertised here — clients that support OAuth sign-in will not prompt for it on this endpoint.
* `https://search.parallel.ai/mcp-oauth` — the OAuth-capable endpoint. Use this if you want OAuth instead of a Bearer key, or need enforced authentication (organization-wide deployments, Zero Data Retention, etc.). Anonymous requests return `401`.

[View Search MCP Documentation →](/integrations/mcp/search-mcp)

***

### [Task MCP](/integrations/mcp/task-mcp)

The Task MCP enables deep research tasks and data enrichment workflows. It provides access to the [Task API](/task-api/task-quickstart) for generating comprehensive reports and transforming datasets with web intelligence.

**Server URL:** `https://task-mcp.parallel.ai/mcp`

[View Task MCP Documentation →](/integrations/mcp/task-mcp)

***

## Quick Installation

Both MCPs can be installed in popular AI assistants and IDEs. For detailed installation instructions for your specific platform, visit:

* **[Search MCP Installation Guide →](/integrations/mcp/search-mcp#installation)**
* **[Task MCP Installation Guide →](/integrations/mcp/task-mcp#installation)**

### Let your agent install it for you

If you already have an agent like Claude Code, Cursor, or Codex in front of you, paste the prompt below and the agent will find the right config for your client and wire it up.

**Search MCP** (no API key required):

```text Search MCP install prompt theme={"system"}
Please install the Parallel Search MCP so that YOU (the coding agent I'm currently talking to) can call it.

- Server URL: https://search.parallel.ai/mcp
- Transport: Streamable HTTP
- Authentication: default to no auth — the server is free to use without an API key or OAuth. If I want higher rate limits I can create an account at https://platform.parallel.ai and either pass my API key as a Bearer token in the `Authorization` header OR point the config at https://search.parallel.ai/mcp-oauth (OAuth flow). Ask me which I prefer before wiring up auth; don't configure auth if I haven't opted in.

First, identify which MCP client harness you're running inside (Claude Code, Codex, Cursor, VS Code Copilot, etc.) — this is your *own* host, not a third-party tool. Then add the server to THAT client's MCP config, using the mechanism that host expects (e.g., `claude mcp add` for Claude Code, editing `~/.codex/config.toml` for Codex, editing `~/.cursor/mcp.json` for Cursor). Do not install it into a different client's config.

Finally, tell me whether the harness needs to be restarted for the new server to load (many clients pick up `mcp.json` changes only on restart), then confirm the server connects and list the tools it exposes.
```

**Task MCP** (requires an API key):

```text Task MCP install prompt theme={"system"}
Please install the Parallel Task MCP so that YOU (the coding agent I'm currently talking to) can call it.

- Server URL: https://task-mcp.parallel.ai/mcp
- Transport: Streamable HTTP
- Authentication: required. The server accepts OAuth and a Parallel API key (Bearer token) from https://platform.parallel.ai.

First, identify which MCP client harness you're running inside (Claude Code, Codex, Cursor, VS Code Copilot, etc.) — this is your *own* host, not a third-party tool. Then add the server to THAT client's MCP config. Do not install it into a different client's config.

Do NOT ask me to paste my API key into the chat, and do NOT write a literal key into any config file. Instead:

1. If your client supports OAuth for remote MCP (e.g., Claude Code's `claude mcp add --transport http` flow, Claude Desktop custom connectors), configure that path and let me complete the OAuth flow in my browser.
2. Otherwise, configure the client to read the key from the PARALLEL_API_KEY environment variable — use the client's env-var interpolation syntax (e.g. `${PARALLEL_API_KEY}`) if it supports one, or tell me to export the variable in my shell before launching the client. Never hardcode the key value.

After the config is in place, tell me exactly what I need to do on my end (complete OAuth, set the env var, etc.) and whether the harness needs to be restarted for the new server to load (many clients pick up `mcp.json` changes only on restart). Then confirm the server connects and lists `createDeepResearch`, `createTaskGroup`, `getStatus`, and `getResultMarkdown`.
```

### One-Click Install

Install in any of the following clients with a single click.

**Search MCP** (no API key required):

<CardGroup cols={2}>
  <Card title="Install in Cursor" icon="arrow-pointer" href="https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC5wYXJhbGxlbC5haS9tY3AifQ==">
    One-click install for Cursor.
  </Card>

  <Card title="Install in VS Code" icon="code" href="https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch.parallel.ai%2Fmcp%22%7D">
    One-click install for VS Code.
  </Card>

  <Card title="Install in LM Studio" icon="microchip" href="lmstudio://add_mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC5wYXJhbGxlbC5haS9tY3AifQ%3D%3D">
    One-click install for LM Studio.
  </Card>

  <Card title="Install in Goose" icon="feather" href="goose://extension?url=https%3A%2F%2Fsearch.parallel.ai%2Fmcp&type=streamable_http&timeout=300&id=parallel-search-mcp&name=Parallel%20Search%20MCP&description=Parallel%20Search%20MCP%20server">
    One-click install for Goose.
  </Card>
</CardGroup>

**Task MCP:**

<CardGroup cols={2}>
  <Card title="Install in Cursor" icon="arrow-pointer" href="https://cursor.com/en/install-mcp?name=Parallel%20Task%20MCP&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9">
    One-click install for Cursor.
  </Card>

  <Card title="Install in VS Code" icon="code" href="https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Task%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp%22%7D">
    One-click install for VS Code.
  </Card>

  <Card title="Install in LM Studio" icon="microchip" href="lmstudio://add_mcp?name=Parallel%20Task%20MCP&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9">
    One-click install for LM Studio.
  </Card>

  <Card title="Install in Goose" icon="feather" href="goose://extension?url=https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp&type=streamable_http&timeout=300&id=parallel-task-mcp&name=Parallel%20Task%20MCP&description=Parallel%20Task%20MCP%20server">
    One-click install for Goose.
  </Card>
</CardGroup>

<Note>
  **Other clients:** Claude Code, Codex CLI, Claude Desktop, Windsurf, Zed, Gemini CLI, Warp, and Kiro don't expose deep-link install URLs — they use CLI commands or a JSON config file instead. See the per-platform instructions on the [Search MCP](/integrations/mcp/search-mcp#installation) and [Task MCP](/integrations/mcp/task-mcp#installation) pages.
</Note>

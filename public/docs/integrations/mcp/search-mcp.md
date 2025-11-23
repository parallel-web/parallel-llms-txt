# Search MCP

> About the Parallel Search MCP

The Parallel Search MCP Server provides drop-in web search and content extraction capabilities for any MCP-aware model. The tools invoke the [Search API](/search/search-quickstart) endpoint but present a simpler interface to ensure effective use by agents. The tools use the Search API in `agentic` mode, which returns more concise results than the default `one-shot` mode.

The Search MCP comprises two tools:

* **web\_search** - Search the web for information and retrieve relevant results
* **web\_fetch** - Extract and retrieve content from specific URLs

## Use Cases

The Search MCP is suited for any application where real-world information is needed as part of an AI agent's reasoning loop. Below are some common use cases:

* Real-time fact checking and verification during conversations
* Gathering current information to answer user questions
* Researching topics that require recent or live data
* Retrieving content from specific URLs to analyze or summarize
* Competitive intelligence and market research

## Installation

The Search MCP can be installed in any MCP client. The server URL is:

**`https://search-mcp.parallel.ai/mcp`**

The Search MCP can also be [used programmatically](/integrations/mcp/programmatic-use) by providing your Parallel API key in the Authorization header as a Bearer token.

### Cursor

Add to `~/.cursor/mcp.json` or `.cursor/mcp.json` (project-specific):

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search-mcp.parallel.ai/mcp"
    }
  }
}
```

**Deep Link:** [🔗 Install Search MCP](https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP\&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC1tY3AucGFyYWxsZWwuYWkvbWNwIn0=)

***

### VS Code

Add to `settings.json` in VS Code:

```json  theme={"system"}
{
  "mcp": {
    "servers": {
      "Parallel Search MCP": {
        "type": "http",
        "url": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
}
```

**Deep Link:** [🔗 Install Search MCP](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP\&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch-mcp.parallel.ai%2Fmcp%22%7D)

***

### Claude Desktop / Claude.ai

Go to Settings → Connectors → Add Custom Connector, and fill in:

```text  theme={"system"}
Name: Parallel Search MCP
URL: https://search-mcp.parallel.ai/mcp
```

Please note that if you are part of an organization, you may not have access to custom connectors at this time. Contact your organization administrator.

If you are not an admin, then please go to Settings → Developer → Edit Config and include this JSON in the config, after retrieving your bearer token from [Platform](https://platform.parallel.ai):

```json  theme={"system"}
"Parallel Search MCP": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-remote",
    "https://search-mcp.parallel.ai/mcp",
    "--header", "authorization: Bearer YOUR-PARALLEL-API-KEY"
  ]
}
```

***

### Claude Code

Run this command in your terminal:

```bash  theme={"system"}
claude mcp add --transport http "Parallel-search-mcp" https://search-mcp.parallel.ai/mcp
```

***

### Windsurf

Add to your Windsurf MCP configuration:

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "serverUrl": "https://search-mcp.parallel.ai/mcp"
    }
  }
}
```

***

### Cline

Go to the MCP Servers section → Remote Servers → Edit Configuration:

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search-mcp.parallel.ai/mcp",
      "type": "streamableHttp"
    }
  }
}
```

***

### Gemini CLI

Add to `~/.gemini/settings.json`:

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "httpUrl": "https://search-mcp.parallel.ai/mcp"
    }
  }
}
```

***

### ChatGPT

**WARNING:** Please note that [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) must be enabled, and this feature may not be available to everyone. Additionally, MCPs in ChatGPT are experimental and may not work reliably.

First, go to Settings → Connectors → Advanced Settings, and turn on Developer Mode.

Then, in connector settings, click Create and fill in:

```text  theme={"system"}
Name: Parallel Search MCP
URL: https://search-mcp.parallel.ai/mcp
Authentication: OAuth
```

In a new chat, ensure Developer Mode is turned on with the connector(s) selected.

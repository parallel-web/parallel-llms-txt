# Getting started

> Get started using Parallel MCPs

## When to use Parallel MCPs?

Our MCP servers are the best way to explore what's possible with our APIs, as it using complex APIs without prior knowledge, and comparing results.

The Parallel MCP Servers expose Parallel APIs to AI assistants and large language model (LLM) workflows, delivering high-quality, relevant results from the web while optimizing for the price-performance balance your AI applications need at scale.

As can be seen in the following table, our MCPs (see installation instructions [here](#mcp-server-installation-guide)) can be useful for quick experimentation with deep research and task groups, or for daily use.

| Use Case                                                              | What                 |
| --------------------------------------------------------------------- | -------------------- |
| Agentic applications where low-latency search is a tool call          | **Search MCP**       |
| Daily use for everyday deep-research tasks in chat-based clients      | **Task MCP**         |
| Enriching a dataset (eg. a CSV) with web data via chat-based clients  | **Task MCP**         |
| Running benchmarks on Parallel processors across a series of queries  | **Task MCP**         |
| Building high-scale production apps that integrate with Parallel APIs | **Search and Tasks** |

## MCP Server Installation Guide

The following MCP servers can be [installed separately in any MCP client](#mcp-server-installation-guide).
They can also be [used programmatically](/integrations/mcp/programmatic-use) by providing your
Parallel API key in the Authorization header as a Bearer token.

* **Search MCP**: `https://search-mcp.parallel.ai/mcp`
* **Task MCP**: `https://task-mcp.parallel.ai/mcp`

### Cursor

Add to `~/.cursor/mcp.json` or `.cursor/mcp.json` (project-specific):

<CodeGroup>
  ```json Search MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "url": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  ```json Task MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "url": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```
</CodeGroup>

**Deep Links:**

* [🔗 Install Search MCP](https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP\&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC1tY3AucGFyYWxsZWwuYWkvbWNwIn0=)
* [🔗 Install Task MCP](https://cursor.com/en/install-mcp?name=Parallel%20Task%20MCP\&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9)

***

### VS Code

Add to `settings.json` in VS Code:

<CodeGroup>
  ```json Search MCP theme={"system"}
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

  ```json Task MCP theme={"system"}
  {
    "mcp": {
      "servers": {
        "Parallel Task MCP": {
          "type": "http",
          "url": "https://task-mcp.parallel.ai/mcp"
        }
      }
    }
  }
  ```
</CodeGroup>

**Deep Links:**

* [🔗 Install Search MCP](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP\&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch-mcp.parallel.ai%2Fmcp%22%7D)
* [🔗 Install Task MCP](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Task%20MCP\&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp%22%7D)

***

### Claude Desktop / Claude.ai

Go to Settings → Connectors → Add Custom Connector, and fill in:

<CodeGroup>
  ```text Search MCP theme={"system"}
  Name: Parallel Search MCP
  URL: https://search-mcp.parallel.ai/mcp
  ```

  ```text Task MCP theme={"system"}
  Name: Parallel Task MCP
  URL: https://task-mcp.parallel.ai/mcp
  ```
</CodeGroup>

Please note that if you are part of an organization, you may not have access to custom connectors at this time.
Contact your organization administrator.

***

### Claude Code

Run this command in your terminal:

<CodeGroup>
  ```bash Search MCP theme={"system"}
  claude mcp add --transport http "Parallel-search-mcp" https://search-mcp.parallel.ai/mcp
  ```

  ```bash Task MCP theme={"system"}
  claude mcp add --transport http "Parallel-Task-MCP" https://task-mcp.parallel.ai/mcp
  ```
</CodeGroup>

***

### Windsurf

Add to your Windsurf MCP configuration:

<CodeGroup>
  ```json Search MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "serverUrl": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  ```json Task MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "serverUrl": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```
</CodeGroup>

***

### Cline

Go to the MCP Servers section → Remote Servers → Edit Configuration:

<CodeGroup>
  ```json Search MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "url": "https://search-mcp.parallel.ai/mcp",
        "type": "streamableHttp"
      }
    }
  }
  ```

  ```json Task MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "url": "https://task-mcp.parallel.ai/mcp",
        "type": "streamableHttp"
      }
    }
  }
  ```
</CodeGroup>

***

### Gemini CLI

Add to `~/.gemini/settings.json`:

<CodeGroup>
  ```json Search MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "httpUrl": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  ```json Task MCP theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "httpUrl": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```
</CodeGroup>

***

### ChatGPT

**WARNING:** Please note that [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) must be enabled, and
this feature may not be available to everyone. Additionally, MCPs in ChatGPT are experimental and may not work reliably.

First, go to Settings → Connectors → Advanced Settings, and turn on Developer Mode.

Then, in connector settings, click Create and fill in:

<CodeGroup>
  ```text Search MCP theme={"system"}
  Name: Parallel Search MCP
  URL: https://search-mcp.parallel.ai/mcp
  Authentication: OAuth
  ```

  ```text Task MCP theme={"system"}
  Name: Parallel Task MCP
  URL: https://task-mcp.parallel.ai/mcp
  Authentication: OAuth
  ```
</CodeGroup>

In a new chat, ensure Developer Mode is turned on with the connector(s) selected.

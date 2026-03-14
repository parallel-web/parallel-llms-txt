> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search MCP

> Add real-time web search and content extraction to AI agents with the Parallel Search MCP Server

The Parallel Search MCP Server provides drop-in web search and content extraction capabilities for any MCP-aware model. The tools invoke the [Search API](/search/search-quickstart) endpoint but present a simpler interface to ensure effective use by agents. The tools use the Search API in `agentic` mode, which returns more concise results than the default `one-shot` mode.

The Search MCP comprises two tools:

* **web\_search** - Search the web for information and retrieve relevant results
* **web\_fetch** - Extract and retrieve content from specific URLs

## Use Cases

The Search MCP is suited for any application where real-world information is needed as part of an AI agent's reasoning loop. Common use cases include:

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

For more details, see the [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

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

For more details, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

***

### Claude Desktop / Claude.ai

Go to Settings → Connectors → Add Custom Connector, and fill in:

```text  theme={"system"}
Name: Parallel Search MCP
URL: https://search-mcp.parallel.ai/mcp
```

If you are part of an organization, you may not have access to custom connectors. Contact your organization administrator for assistance.

If you are not an admin, go to Settings → Developer → Edit Config and add the following JSON after retrieving your API key from [Platform](https://platform.parallel.ai):

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

For more details, see the [Claude remote MCP documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp).

***

### Claude Code

Run this command in your terminal:

```bash  theme={"system"}
claude mcp add --transport http "Parallel-Search-MCP" https://search-mcp.parallel.ai/mcp
```

In Claude code, use the command:

```
/mcp
```

Then follow the steps in your browser to login.

For more details, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers).

***

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "serverUrl": "https://search-mcp.parallel.ai/mcp"
    }
  }
}
```

For more details, see the [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp).

***

### Cline

Go to MCP Servers → Remote Servers → Edit Configuration:

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

For more details, see the [Cline MCP documentation](https://docs.cline.bot/mcp/configuring-mcp-servers).

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

For more details, see the [Gemini CLI MCP documentation](https://geminicli.com/docs/tools/mcp-server/).

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

For more details, see the [ChatGPT Developer Mode documentation](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta).

***

### OpenAI Codex CLI

Add to `~/.codex/config.toml`:

```toml  theme={"system"}
[mcp_servers.parallel-search]
url = "https://search-mcp.parallel.ai/mcp"
```

Alternatively, run this in your terminal. This should start the OAuth flow:

```bash  theme={"system"}
codex mcp add parallel-search --url https://search-mcp.parallel.ai/mcp
```

For more details, see the [Codex MCP documentation](https://developers.openai.com/codex/mcp/).

***

### Amp

Run this command in your terminal:

```bash  theme={"system"}
amp mcp add "Parallel-Search-MCP" https://search-mcp.parallel.ai/mcp
```

The OAuth flow will start when you start Amp.

For more details, see the [Amp MCP documentation](https://ampcode.com/manual#mcp-oauth).

***

### Kiro

Add to `.kiro/settings/mcp.json` (workspace) or `~/.kiro/settings/mcp.json` (global):

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search-mcp.parallel.ai/mcp"
    }
  }
}
```

For more details, see the [Kiro MCP documentation](https://kiro.dev/docs/mcp/configuration/).

***

### Google Antigravity

In the Antigravity Agent pane, click the menu (⋮) → MCP Servers → Manage MCP Servers → View raw config, then add:

```json  theme={"system"}
{
  "mcpServers": {
    "Parallel-Search-MCP": {
      "serverUrl": "https://search-mcp.parallel.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

For more details, see the [Antigravity MCP documentation](https://antigravity.google/docs/mcp).

***

## Best practices

### Filtering by date or domain

To filter search results by date or domain, include these constraints directly in your search query or objective rather than expecting separate parameters. For example:

* "Latest AI research papers from 2025"
* "News about climate change from nytimes.com"
* "Product announcements from apple.com in the last month"

If date or domain filtering is important for your task, prompt the agent explicitly to include these details when using the tool.

<Note>
  We have experimented with adding dedicated date and domain parameters to the Search MCP tools, but found they harm quality overall—LLMs tend to overuse them, which overconstrains search results.
</Note>

## Troubleshooting

### Common Installation Issues

<Accordion title="Cline: 'Authorization Error redirect_uri must be https'">
  This error occurs when Cline attempts OAuth authentication but the redirect URI isn't using HTTPS.

  **Solution:** Use the API key approach instead of OAuth:

  1. Get your API key from [platform.parallel.ai](https://platform.parallel.ai)
  2. Configure Cline with the bearer token method:

  ```json  theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "https://search-mcp.parallel.ai/mcp",
          "--header",
          "authorization: Bearer YOUR-PARALLEL-API-KEY"
        ]
      }
    }
  }
  ```

  Replace `YOUR-PARALLEL-API-KEY` with your actual API key.
</Accordion>

<Accordion title="Gemini CLI: Where to provide API key">
  Gemini CLI uses HTTP MCPs and authenticates via OAuth. If OAuth isn't working, you can provide your API key directly.

  **Solution:** Use environment variables or the `mcp-remote` proxy:

  ```json  theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "https://search-mcp.parallel.ai/mcp",
          "--header",
          "authorization: Bearer YOUR-PARALLEL-API-KEY"
        ]
      }
    }
  }
  ```

  Add this to `~/.gemini/settings.json` and replace `YOUR-PARALLEL-API-KEY` with your key from [platform.parallel.ai](https://platform.parallel.ai).
</Accordion>

<Accordion title="VS Code: Incorrect configuration format">
  VS Code requires a specific configuration format. Common mistakes include using the wrong property names.

  **Incorrect (Cursor format):**

  ```json  theme={"system"}
  {
    "mcpServers": {
      "parallel-search": {
        "url": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  **Correct (VS Code format):**

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

  Note: VS Code uses `mcp.servers` (not `mcpServers`) and requires the `type: "http"` field.
</Accordion>

<Accordion title="Windsurf: Configuration location and format">
  Windsurf uses a different configuration format than Cursor.

  **Correct Windsurf configuration:**

  ```json  theme={"system"}
  {
    "mcpServers": {
      "Parallel Search MCP": {
        "serverUrl": "https://search-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  Note: Windsurf uses `serverUrl` instead of `url`. Add this to your Windsurf MCP configuration file.
</Accordion>

<Accordion title="Connection timeout or 'server unavailable' errors">
  If you're getting connection errors:

  1. **Check your network:** Ensure you can reach `https://search-mcp.parallel.ai`
  2. **Verify API key:** Make sure your key is valid at [platform.parallel.ai](https://platform.parallel.ai)
  3. **Check balance:** A 402 error means insufficient credits—add funds to your account
  4. **Restart your IDE:** Some clients cache MCP connections
</Accordion>

<Accordion title="Tools not appearing in the IDE">
  If the MCP installs but tools don't show up:

  1. **Restart your IDE** completely (not just reload)
  2. **Check configuration syntax:** Ensure valid JSON with no trailing commas
  3. **Verify the server URL:** Must be exactly `https://search-mcp.parallel.ai/mcp`
  4. **Check IDE logs:** Look for MCP-related errors in your IDE's output/debug panel
</Accordion>

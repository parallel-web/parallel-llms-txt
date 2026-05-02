> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task MCP

> Enable deep research and data enrichment workflows in AI assistants with the Parallel Task MCP Server

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The Task MCP Server provides two core capabilities: deep research tasks that generate comprehensive reports, and enrichment tasks that transform existing datasets with web intelligence. Built on the same infrastructure that powers our [Task API](/task-api/task-quickstart), it delivers the highest quality at every price point while eliminating complex integration work.

The Task MCP comprises four tools:

* **`createDeepResearch`** — Initiates a [deep research](/task-api/examples/task-deep-research) task. Use for complex questions that need thorough multi-step research with citations, where depth matters more than latency.
* **`createTaskGroup`** — Initiates a [task group](/task-api/group-api) to enrich multiple items in parallel. Use for lists or tabular data (CSV uploads, company lists, entity tables) that need consistent web-sourced fields per row.
* **`getStatus`** — Lightweight status check for an in-flight task (\~50 tokens). Use this when polling instead of fetching the full result.
* **`getResultMarkdown`** — Retrieves the final output from a deep research or task group in an LLM-friendly markdown format. Call once the task is complete.

The Task MCP Server uses an async architecture that lets agents start research tasks and continue executing other work without blocking. This allows spawning any number of tasks in parallel while continuing the conversation. Due to current MCP and LLM client limitations, you need to request the result tool call in an additional turn after results are ready.

The Task MCP works best when following this process:

1. **Choose a data source** - See [Enrichment data sources and destinations](#enrichment-data-sources-and-destinations).
2. **Initiate your tasks** - After you have your initial data, the MCP can initiate deep research or task groups. See [Use cases](#use-cases) for inspiration.
3. **Analyze the results** - The LLM provides a link to view progress as results come in. After completion, prompt the LLM to analyze the results and answer your questions.

## One-Click Install

Install in any of the following clients with a single click.

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

The Task MCP requires an API key. After one-click install, add your key from [platform.parallel.ai](https://platform.parallel.ai) as a Bearer token in the `Authorization` header (configured in the client's MCP settings after install).

For Claude Code, Codex CLI, Claude Desktop, Windsurf, Zed, Gemini CLI, Warp, Kiro, and other clients, see the [Installation](#installation) section below — those clients use a CLI command or a JSON config file rather than deep-link URLs.

## Enrichment data sources and destinations

The task group tool can be used directly from LLM memory, but is often combined with a data source. The following data sources work well with the Task Group tool:

* **Upload tabular files** - Use the Task MCP with Excel sheets or CSVs. Some LLM clients (such as ChatGPT) allow uploading Excel or CSV files. Availability varies by client.
* **Connect with databases** - Several MCPs allow your LLM to retrieve data from your database, such as [Supabase MCP](https://supabase.com/docs/guides/getting-started/mcp) and [Neon MCP](https://neon.com/docs/ai/neon-mcp-server).
* **Connect with documents** - Documents may contain vital initial information to start a task group. See [Notion MCP](https://developers.notion.com/docs/mcp) and [Linear MCP](https://linear.app/docs/mcp).
* **Connect with web search data** - [Parallel Search MCP](/integrations/mcp/search-mcp) or other web tools can provide an initial list of items, which is often a great starting point for a task group.

## Use cases

The Task MCP serves two main purposes. First, it makes Parallel APIs accessible to anyone requiring reliable research or enrichment without coding skills. Second, it's a great tool for developers to experiment with different use cases and see output quality before writing code.

Below are examples of using the Task MCP (sometimes in combination with other MCPs):

**Day-to-day data enrichment and research:**

* [Sentiment analysis for ecommerce products](https://claude.ai/share/4ac5f253-e636-4009-8ade-7c6b08f7a135)
* [Improving product listings for a web store](https://claude.ai/share/f4d6e523-3c7c-4354-8577-1c953952a360)
* [Fact checking](https://claude.ai/share/9ec971ec-89dd-4d68-8515-2f037b88db38)
* [Deep research every major MCP client creating a Matrix of the results](https://claude.ai/share/0841e031-a8c4-408d-9201-e1b8a77ff6c9)
* [Reddit Sentiment analysis](https://claude.ai/share/39d98320-fc3e-4bbb-b4d5-da67abac44f2)

**Assisting development with Parallel APIs:**

* [Comparing the output quality between 2 processors](https://claude.ai/share/f4d6e523-3c7c-4354-8577-1c953952a360)
* [Testing and iterating on entity resolution for social media profiles](https://claude.ai/share/198db715-b0dd-4325-9e2a-1dfab531ba41)
* [Performing 100 deep researches and analyzing results quality](https://claude.ai/share/39d98320-fc3e-4bbb-b4d5-da67abac44f2)

This is just the tip of the iceberg. Share your most compelling use cases with us to grow this list and inspire others!

## Installation

The Task MCP can be installed in any MCP client. The server URL is:

**`https://task-mcp.parallel.ai/mcp`**

The Task MCP can also be [used programmatically](/integrations/mcp/programmatic-use) by providing your Parallel API key in the Authorization header as a Bearer token.

### Cursor

Add to `~/.cursor/mcp.json` or `.cursor/mcp.json` (project-specific):

```json theme={"system"}
{
  "mcpServers": {
    "Parallel Task MCP": {
      "url": "https://task-mcp.parallel.ai/mcp"
    }
  }
}
```

For more details, see the [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

***

### VS Code

Create `.vscode/mcp.json` in your workspace (or run the **MCP: Open User Configuration** command for a user-level `mcp.json`):

```json theme={"system"}
{
  "servers": {
    "Parallel Task MCP": {
      "type": "http",
      "url": "https://task-mcp.parallel.ai/mcp"
    }
  }
}
```

For more details, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

***

### Claude Desktop / Claude.ai

Go to Settings → Connectors → Add Custom Connector, and fill in:

```text theme={"system"}
Name: Parallel Task MCP
URL: https://task-mcp.parallel.ai/mcp
```

If you are part of an organization, you may not have access to custom connectors. Contact your organization administrator for assistance.

If you are not an admin, go to Settings → Developer → Edit Config and add the following JSON after retrieving your API key from [Platform](https://platform.parallel.ai):

```json theme={"system"}
"Parallel Task MCP": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-remote",
    "https://task-mcp.parallel.ai/mcp",
    "--header", "authorization: Bearer YOUR-PARALLEL-API-KEY"
  ]
}
```

For more details, see the [Claude remote MCP documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp).

***

### Claude Code

Run this command in your terminal:

```bash theme={"system"}
claude mcp add --transport http "Parallel-Task-MCP" https://task-mcp.parallel.ai/mcp
```

In Claude code, use the command:

```
/mcp
```

Then follow the steps in your browser to login.

For more details, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers).

***

### Codex CLI

The Task MCP always requires authentication. Choose one of:

```bash API key via environment variable theme={"system"}
# set PARALLEL_API_KEY in your environment first (key from platform.parallel.ai)
codex mcp add parallel-task --url https://task-mcp.parallel.ai/mcp \
  --bearer-token-env-var PARALLEL_API_KEY
```

```bash OAuth theme={"system"}
codex mcp add parallel-task --url https://task-mcp.parallel.ai/mcp
# complete the browser authorization when prompted
```

Each command writes the equivalent `[mcp_servers.parallel-task]` entry to `~/.codex/config.toml` — you can also hand-edit it if you prefer.

Restart Codex after adding the server. For more details, see the [Codex MCP documentation](https://developers.openai.com/codex/mcp/).

***

### Other Clients

<AccordionGroup>
  <Accordion title="Windsurf">
    Add to `~/.codeium/windsurf/mcp_config.json`:

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "serverUrl": "https://task-mcp.parallel.ai/mcp"
        }
      }
    }
    ```

    For more details, see the [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp).
  </Accordion>

  <Accordion title="Cline">
    Go to MCP Servers → Remote Servers → Edit Configuration:

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "url": "https://task-mcp.parallel.ai/mcp",
          "headers": {
            "Authorization": "Bearer YOUR-PARALLEL-API-KEY"
          }
        }
      }
    }
    ```

    For more details, see the [Cline MCP documentation](https://docs.cline.bot/mcp/adding-and-configuring-servers).
  </Accordion>

  <Accordion title="Gemini CLI">
    Add to `~/.gemini/settings.json`:

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "httpUrl": "https://task-mcp.parallel.ai/mcp"
        }
      }
    }
    ```

    For more details, see the [Gemini CLI MCP documentation](https://geminicli.com/docs/tools/mcp-server/).
  </Accordion>

  <Accordion title="ChatGPT">
    **Warning:** [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) must be enabled, and this feature may not be available to everyone. MCPs in ChatGPT are experimental and may not work reliably.

    First, go to Settings → Connectors → Advanced Settings, and turn on Developer Mode.

    Then, in connector settings, click Create and fill in:

    ```text theme={"system"}
    Name: Parallel Task MCP
    URL: https://task-mcp.parallel.ai/mcp
    Authentication: OAuth
    ```

    In a new chat, ensure Developer Mode is turned on with the connector(s) selected.

    For more details, see the [ChatGPT Developer Mode documentation](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta).
  </Accordion>

  <Accordion title="Amp">
    Run this command in your terminal:

    ```bash theme={"system"}
    amp mcp add "Parallel-Task-MCP" https://task-mcp.parallel.ai/mcp
    ```

    The OAuth flow will start when you start Amp.

    For more details, see the [Amp MCP documentation](https://ampcode.com/manual#mcp-oauth).
  </Accordion>

  <Accordion title="Kiro">
    Add to `.kiro/settings/mcp.json` (workspace) or `~/.kiro/settings/mcp.json` (global):

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "url": "https://task-mcp.parallel.ai/mcp"
        }
      }
    }
    ```

    For more details, see the [Kiro MCP documentation](https://kiro.dev/docs/mcp/configuration/).
  </Accordion>

  <Accordion title="Google Antigravity">
    In the Antigravity Agent pane, click the menu (⋮) → MCP Servers → Manage MCP Servers → View raw config, then add:

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel-Task-MCP": {
          "serverUrl": "https://task-mcp.parallel.ai/mcp",
          "headers": {
            "Authorization": "Bearer YOUR_API_KEY"
          }
        }
      }
    }
    ```

    For more details, see the [Antigravity MCP documentation](https://antigravity.google/docs/mcp).
  </Accordion>

  <Accordion title="OpenCode">
    Add to `opencode.json` (project) or `~/.config/opencode/opencode.json` (global):

    ```json theme={"system"}
    {
      "mcp": {
        "parallel-task": {
          "type": "remote",
          "url": "https://task-mcp.parallel.ai/mcp",
          "enabled": true,
          "headers": {
            "Authorization": "Bearer YOUR-PARALLEL-API-KEY"
          }
        }
      }
    }
    ```

    For more details, see the [OpenCode MCP documentation](https://opencode.ai/docs/mcp-servers/).
  </Accordion>

  <Accordion title="Roo Code">
    Add to `.roo/mcp.json` in your workspace (or edit the global `mcp_settings.json` from the Roo Code MCP settings view):

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "type": "streamable-http",
          "url": "https://task-mcp.parallel.ai/mcp",
          "headers": {
            "Authorization": "Bearer YOUR-PARALLEL-API-KEY"
          }
        }
      }
    }
    ```

    Project config takes precedence over global. For more details, see the [Roo Code MCP documentation](https://docs.roocode.com/features/mcp/using-mcp-in-roo).
  </Accordion>

  <Accordion title="OpenHands">
    Run this command in your terminal:

    ```bash theme={"system"}
    openhands mcp add parallel-task --transport http \
      --header "Authorization: Bearer YOUR-PARALLEL-API-KEY" \
      https://task-mcp.parallel.ai/mcp
    ```

    Inside an OpenHands conversation, use `/mcp` to verify the server is active. For more details, see the [OpenHands MCP documentation](https://docs.openhands.dev/openhands/usage/cli/mcp-servers).
  </Accordion>

  <Accordion title="Factory CLI (droid)">
    Run this command in your terminal:

    ```bash theme={"system"}
    droid mcp add parallel-task https://task-mcp.parallel.ai/mcp --type http \
      --header "Authorization: Bearer YOUR-PARALLEL-API-KEY"
    ```

    Inside droid, type `/mcp` to open the interactive manager and verify the server is connected. For more details, see the [Factory MCP documentation](https://docs.factory.ai/cli/configuration/mcp).
  </Accordion>

  <Accordion title="Pi">
    Pi ships without built-in MCP support, so install the [`pi-mcp-adapter`](https://github.com/nicobailon/pi-mcp-adapter) package first:

    ```bash theme={"system"}
    pi install npm:pi-mcp-adapter
    ```

    Restart Pi, then add the Task MCP to `.mcp.json` in your project (or `~/.config/mcp/mcp.json` for a user-global config). The Task MCP requires a Parallel API key:

    ```json theme={"system"}
    {
      "mcpServers": {
        "parallel-task": {
          "url": "https://task-mcp.parallel.ai/mcp",
          "auth": "bearer",
          "bearerTokenEnv": "PARALLEL_API_KEY",
          "directTools": true
        }
      }
    }
    ```

    Set `PARALLEL_API_KEY` in your environment with your key from [platform.parallel.ai](https://platform.parallel.ai). `directTools: true` registers `createDeepResearch`, `createTaskGroup`, `getStatus`, and `getResultMarkdown` alongside Pi's built-in tools instead of hiding them behind the adapter's `mcp` proxy. Run `/mcp` inside Pi to verify the server is detected. For more details, see the [pi-mcp-adapter README](https://github.com/nicobailon/pi-mcp-adapter).

    Alternatively, skip MCP entirely and use the [Parallel CLI](/integrations/cli) as a Pi skill — that's the same pattern as our [ClawHub / OpenClaw](/integrations/clawhub) integration.
  </Accordion>

  <Accordion title="OpenClaw">
    OpenClaw stores MCP server definitions in `~/.openclaw/openclaw.json` under `mcp.servers`. The Task MCP requires a Parallel API key — OpenClaw's remote MCP schema accepts it via the `headers` map, so avoid committing a literal key and pass it through an env-var or secret reference.

    Save via the `openclaw mcp set` CLI:

    ```bash theme={"system"}
    openclaw mcp set parallel-task '{"url":"https://task-mcp.parallel.ai/mcp","transport":"streamable-http","headers":{"Authorization":"Bearer YOUR-PARALLEL-API-KEY"}}'
    ```

    Or edit `~/.openclaw/openclaw.json` directly:

    ```json theme={"system"}
    {
      "mcp": {
        "servers": {
          "parallel-task": {
            "url": "https://task-mcp.parallel.ai/mcp",
            "transport": "streamable-http",
            "headers": {
              "Authorization": "Bearer YOUR-PARALLEL-API-KEY"
            }
          }
        }
      }
    }
    ```

    The `transport` field is required — OpenClaw defaults to SSE when it's omitted, but the Task MCP uses Streamable HTTP. Replace `YOUR-PARALLEL-API-KEY` with a key from [platform.parallel.ai](https://platform.parallel.ai). Sensitive values in `url` and `headers` are redacted in OpenClaw logs.

    `openclaw mcp set` only writes to config — it doesn't connect to the server or reload running agents. Start a new OpenClaw agent session (or restart your current one) for the tools to show up. Verify the saved definition with `openclaw mcp list` / `openclaw mcp show parallel-task`. For the full MCP CLI reference, see the [OpenClaw MCP docs](https://docs.openclaw.ai/cli/mcp).
  </Accordion>

  <Accordion title="Hermes Agent">
    Add to `~/.hermes/config.yaml`:

    ```yaml theme={"system"}
    mcp_servers:
      parallel_task:
        url: "https://task-mcp.parallel.ai/mcp"
        headers:
          Authorization: "Bearer YOUR-PARALLEL-API-KEY"
    ```

    For more details, see the [Hermes Agent MCP documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp).
  </Accordion>

  <Accordion title="Continue.dev">
    Add a file at `.continue/mcpServers/parallel-task.yaml` in your workspace:

    ```yaml theme={"system"}
    name: Parallel Task MCP
    version: 0.0.1
    schema: v1
    mcpServers:
      - name: Parallel Task MCP
        type: streamable-http
        url: https://task-mcp.parallel.ai/mcp
        requestOptions:
          headers:
            Authorization: Bearer YOUR-PARALLEL-API-KEY
    ```

    For more details, see the [Continue.dev MCP documentation](https://docs.continue.dev/customize/deep-dives/mcp).
  </Accordion>

  <Accordion title="Zed, Warp, Raycast (stdio-only clients)">
    These clients currently support only stdio-transport MCP servers — they can't connect directly to remote HTTP endpoints. Wrap the Task MCP with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), passing your API key as a Bearer header:

    ```json theme={"system"}
    {
      "mcpServers": {
        "Parallel Task MCP": {
          "command": "npx",
          "args": [
            "-y",
            "mcp-remote",
            "https://task-mcp.parallel.ai/mcp",
            "--header",
            "Authorization: Bearer YOUR-PARALLEL-API-KEY"
          ]
        }
      }
    }
    ```

    Placement differs per client — see the [Zed MCP docs](https://zed.dev/docs/ai/mcp), [Warp MCP docs](https://docs.warp.dev/university/how-warp-uses-warp/using-mcp-servers-with-warp), or [Raycast MCP docs](https://manual.raycast.com/ai/model-context-protocol) for the exact file location and wrapper format.
  </Accordion>
</AccordionGroup>

If your client isn't listed, most MCP clients accept the `mcpServers` format shown in the Cursor section. For clients that use a different wrapper (e.g., VS Code's `mcp.servers`, Windsurf's `serverUrl`), check the client's documentation for the correct field names.

## Best Practices

### Choose enabled MCPs carefully

Be careful which tools and features you have enabled in your MCP client. When using Parallel in combination with many other tools, the increased context window may cause degraded output quality. Additionally, the LLM may prefer standard web search or deep research over Parallel if both are enabled. Turn off other web or deep-research tools, or explicitly mention that you want to use Parallel MCPs.

### Limit data source context size

The Task MCP is a powerful tool for batch deep research, but it is constrained by the context window size and max output tokens of the LLM. Design your prompts and tool calls to avoid overflowing these limitations, or you may experience failures, degraded performance, or lower output quality. For large datasets, use the API or other no-code integrations. The Task MCP is designed for smaller parallel tasks and experimentation.

### Follow up on tasks

The Task MCP only initiates Deep Research and Task Groups—it does not wait for tasks to complete. Fetch the status or results using a follow-up tool call after research is complete. The asynchronous nature allows initiating several deep researches and task groups without overflowing the context window. To perform multiple tasks or batches in a workflow, reply each time to verify the task is complete and initiate the next step.

### Use with larger models only

While our Web [Search](/integrations/mcp/search-mcp) MCP works well with smaller models (such as GPT OSS 20B), the Task MCP requires strong reasoning capability. Use it with larger models only (such as GPT-5 or Claude Sonnet 4.5). Smaller models may result in degraded output quality.

***

## Troubleshooting

### Common Installation Issues

<Accordion title="Cline: 'Authorization Error redirect_uri must be https'">
  This error occurs when Cline attempts OAuth authentication but the redirect URI isn't using HTTPS.

  **Solution:** Use the API key approach instead of OAuth:

  1. Get your API key from [platform.parallel.ai](https://platform.parallel.ai)
  2. Configure Cline with the bearer token method:

  ```json theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "https://task-mcp.parallel.ai/mcp",
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

  ```json theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "https://task-mcp.parallel.ai/mcp",
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
  VS Code's `mcp.json` uses a different structure than Cursor's `mcp.json`. Common mistake: copying a Cursor-style config into VS Code.

  **Incorrect (Cursor format):**

  ```json theme={"system"}
  {
    "mcpServers": {
      "parallel-task": {
        "url": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  **Correct (VS Code format, `.vscode/mcp.json` or user-level `mcp.json`):**

  ```json theme={"system"}
  {
    "servers": {
      "Parallel Task MCP": {
        "type": "http",
        "url": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  Note: VS Code uses a top-level `servers` object (not `mcpServers`) and includes `type: "http"` for remote HTTP servers.
</Accordion>

<Accordion title="Windsurf: Configuration location and format">
  Windsurf uses a different configuration format than Cursor.

  **Correct Windsurf configuration:**

  ```json theme={"system"}
  {
    "mcpServers": {
      "Parallel Task MCP": {
        "serverUrl": "https://task-mcp.parallel.ai/mcp"
      }
    }
  }
  ```

  Note: Windsurf uses `serverUrl` instead of `url`. Add this to your Windsurf MCP configuration file.
</Accordion>

<Accordion title="Connection timeout or 'server unavailable' errors">
  If you're getting connection errors:

  1. **Check your network:** Ensure you can reach `https://task-mcp.parallel.ai`
  2. **Verify API key:** Make sure your key is valid at [platform.parallel.ai](https://platform.parallel.ai)
  3. **Check balance:** A 402 error means insufficient credits—add funds to your account
  4. **Restart your IDE:** Some clients cache MCP connections
</Accordion>

<Accordion title="Tools not appearing in the IDE">
  If the MCP installs but tools don't show up:

  1. **Restart your IDE** completely (not just reload)
  2. **Check configuration syntax:** Ensure valid JSON with no trailing commas
  3. **Verify the server URL:** Must be exactly `https://task-mcp.parallel.ai/mcp`
  4. **Check IDE logs:** Look for MCP-related errors in your IDE's output/debug panel
</Accordion>

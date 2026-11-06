# The best MCP servers for VS Code and GitHub Copilot in 2026

GitHub Copilot MCP setup in VS Code works differently since the Copilot harness became the default: servers can live in a portable file shared with Copilot CLI, and GitHub-managed connectors cover popular services with no config at all. This guide picks nine servers worth adding, gives the exact connector route or config for each, and explains the tool cap and org policies that decide what loads.

VS Code is the editor most closely tied to GitHub Copilot, and it's where Copilot's [MCP](https://parallel.ai/articles/what-is-mcp) support has the most moving parts. A server can reach your agent three ways: as a Copilot connector that GitHub hosts and authorizes for you, as an entry in a config file, or bundled inside an extension or agent plugin. Which route you pick decides whether the same server also shows up in Copilot CLI and on github.com, so it's worth choosing on purpose.

We make Parallel, and it's our first pick below. The other eight are servers we'd install in our own setup, with the connector or config route that VS Code's current docs recommend for each.

## How MCP works in VS Code

New chat sessions in VS Code now run on the **Copilot harness** by default, the agent runtime built on the Copilot SDK that VS Code shares with Copilot CLI and the GitHub Copilot app. The older **Local** harness is still in the Session Target dropdown. The harness matters for MCP because each one reads servers from different places. The [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration) describes two file formats:

- **Portable Copilot format**, with a top-level `mcpServers` object. Your personal file is `~/.copilot/mcp-config.json` (or `$COPILOT_HOME/mcp-config.json`), the same file Copilot CLI reads. For a team, commit a workspace-root `.mcp.json`. The Copilot harness reads these directly, and environment variables go in as `${NAME}`.
- **VS Code format**, with a top-level `servers` object, in `.vscode/mcp.json` or the user-profile `mcp.json`. This is the only format that supports `inputs` (prompted secrets), `envFile`, dev mode, and per-server sandboxing. VS Code forwards these servers to Copilot harness sessions unless they depend on an `${input:...}` variable, and the guided flow now labels these destinations deprecated.

One trap from the VS Code format still catches people: the user-profile `mcp.json` lives inside your VS Code profile folder, not at `~/.vscode/mcp.json`. Open it with **MCP: Open User Configuration**, because a file you create by hand at `~/.vscode/mcp.json` is ignored without an error.

You rarely need to edit JSON. Run **MCP: Add Server** from the Command Palette, choose **HTTP** for a URL or **Command (stdio)** for a local launch command, enter an ID, then pick **Global > Copilot Global** for a personal server. **Chat: Open Customizations > Browse** searches the Customization Marketplace (filter with `@type:mcp`) and lists **Copilot Connectors**, GitHub-managed servers you connect once with a browser sign-in and then reuse in VS Code, Copilot CLI, and the Copilot app. Connectors work with the Copilot harness on every Copilot plan; the [connector list](https://docs.github.com/en/copilot/reference/supported-connectors) includes Sentry, Linear, Figma, Notion, Slack, Vercel, Neon, Microsoft Learn Docs, and about 20 more.

Remote servers that use OAuth open a browser sign-in on first connection. Workspace configs inherit Workspace Trust, so a repo's `.mcp.json` can't start servers in Restricted Mode, while user-level servers from other sources ask for a separate trust decision. VS Code's [tools docs](https://code.visualstudio.com/docs/agents/run/tools) cap a chat request at 128 enabled tools; past that you'll see "Cannot have more than 128 tools per request" until you switch tools off in **Chat: Open Customizations > Tools**.

On Copilot Business and Enterprise, an admin has to turn on the **MCP servers in Copilot** policy, which [GitHub's MCP docs](https://docs.github.com/en/copilot/concepts/customizations/mcp) say is off by default. Connectors also need the **Editor preview features** policy while they're in preview. Enterprises can go further with a managed `allowedMcpServers` / `deniedMcpServers` list or a private MCP registry, and [VS Code's enterprise settings](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) note that local config can't override them. Copilot Free, Pro, Pro+, and Max accounts aren't governed by the org policy.

### Copilot CLI and the cloud agent

Copilot CLI reads the same `~/.copilot/mcp-config.json` and has the GitHub MCP server built in. The Copilot cloud agent on github.com is configured separately, in the repository's settings, with its own `mcpServers` JSON. It starts with the GitHub and Playwright servers, uses only MCP tools (not resources or prompts), calls tools without asking for approval, and doesn't support OAuth remote servers in that config, so keys go in as `COPILOT_MCP_`-prefixed secrets. Connectors don't reach sessions that run on GitHub Actions, such as an issue assigned to Copilot.

## The best MCP servers for VS Code and GitHub Copilot

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) gives Copilot live web search and page reading from one hosted endpoint. Without an account or key, it lists `web_search` (ranked results with excerpts dense enough to answer from, in the Search API's fast mode), `web_fetch` (up to 20 URLs per call, PDFs and JavaScript-heavy pages included), and `web_decisions` for typed questions such as a probability or a choice between options. Keyless calls are free at lower rate limits.

Add it with **MCP: Add Server > HTTP** and the URL `https://mcp.parallel.ai/mcp`, or put it in the Copilot Global file so Copilot CLI picks it up too:

```json
{
  "mcpServers": {
    "parallel": {
      "type": "http",
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Our [installation docs](https://docs.parallel.ai/integrations/mcp/installation) also cover the VS Code-format version for `.vscode/mcp.json`, and the Parallel MCP page has a one-click VS Code install. To add `web_research`, which researches one question and returns a cited answer in the same call, and to lift rate limits, add a `headers` entry of `"Authorization": "Bearer ${PARALLEL_API_KEY}"` and set the variable in your environment. Signing in instead through `https://mcp.parallel.ai/mcp?login` bills calls to your Parallel account. Either way, you can also add an `x-parallel-mcp-config` header to pin a search mode or include and exclude domains.

Why bother when Copilot can already fetch pages? For coding work the measurable part is search quality: on Openbenchmarks' [coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents), Parallel's fast mode completed 66.7% of 100 documentation tickets from search alone, third of 14 behind Perplexity and Firecrawl.

Best for: release notes, error messages, and API changes newer than the model. Tradeoffs: we're the vendor, and keyless use runs at personal-scale limits. If your org restricts MCP to a registry or allowlist, an admin has to add `mcp.parallel.ai` first.

### 2. GitHub MCP server

GitHub's own server covers issues, pull requests, code search, Actions runs, and Copilot cloud agent tasks. It's built into Copilot CLI and preconfigured for the cloud agent, but in VS Code you add it yourself: [GitHub's setup guide](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/extend-copilot-with-tools-and-context/set-up-the-github-mcp-server) installs it from the MCP gallery (search "github" in Customizations or `@mcp github` in the Extensions view), or point an HTTP entry at `https://api.githubcopilot.com/mcp/`. VS Code signs you in with OAuth, and a fine-grained PAT in an `Authorization` header works where OAuth is blocked.

Copilot in VS Code already has `#githubRepo` and `#githubTextSearch` for searching code, so the server earns its place when you want the agent reading PR review threads, triaging issues, or pulling a failed Actions log. It registers a large tool surface; switch off the toolsets you don't use so it doesn't eat into the 128-tool budget.

Best for: PR- and issue-heavy work across repos. Tradeoffs: the heaviest server on this list, and tools tied to paid features need the matching license.

### 3. Context7

[Context7](https://context7.com/docs/resources/all-clients) returns current, version-specific library docs through two tools, `resolve-library-id` and `query-docs`. VS Code's own MCP walkthrough uses it as the example remote server. Install the Context7 extension from the Visual Studio Marketplace, or add `https://mcp.context7.com/mcp` as an HTTP server. A free API key from the Context7 dashboard raises rate limits.

Best for: framework APIs that changed after the model's training. Tradeoffs: indexed libraries only; pair it with web search for the long tail.

### 4. Microsoft Learn MCP

The [Microsoft Learn MCP Server](https://learn.microsoft.com/en-us/training/support/mcp) searches and fetches official Microsoft and Azure documentation and code samples (`microsoft_docs_search`, `microsoft_docs_fetch`, `microsoft_code_sample_search`). It needs no sign-in and costs nothing. Connect it as the **Microsoft Learn Docs** connector, or add `https://learn.microsoft.com/api/mcp` as an HTTP server.

Best for: .NET, Azure, and Microsoft 365 work, where Learn is the source of truth. Tradeoffs: public docs only, with rate limits on the free endpoint.

### 5. Playwright MCP

Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp) server drives a real browser so the agent can click through the UI it just changed. VS Code now ships built-in browser tools and its docs suggest trying those first; Playwright is the pick when you want scripted multi-step flows, or the same browser tooling the cloud agent gets by default. It's a local server, so it needs Node.js 18 or newer:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "microsoft-learn": {
      "type": "http",
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

Committed at the workspace root, this file loads for teammates who trust the repo, and Copilot CLI reads it too.

Best for: verifying frontend fixes and reproducing UI bugs. Tradeoffs: slower and heavier than an API call, and for reading a page `web_fetch` is cheaper.

### 6. Sentry

Sentry's server brings issues, stack traces, and event details into the session, so Copilot fixes the error that's happening in production rather than one it guessed. The connector route is simplest: connect **Sentry** under Copilot Connectors and sign in. Without connectors, add Sentry's [remote server](https://docs.sentry.io/product/sentry-mcp/) at `https://mcp.sentry.dev/mcp` and complete the OAuth prompt.

Best for: debugging from a real Sentry issue URL. Tradeoffs: it sees whatever your Sentry user can see.

### 7. Linear

[Linear's server](https://linear.app/docs/mcp) finds, creates, and updates issues, projects, and comments. Linear's own VS Code instructions still route through `mcp-remote` as a stdio command, so the Linear connector is the cleaner path in VS Code: one OAuth sign-in, no local Node process. For read-only access outside the connector, Linear publishes `https://mcp.linear.app/mcp/readonly`.

Best for: teams that want Copilot working from the ticket itself. Tradeoffs: write access by default, and each OAuth session is tied to one workspace.

### 8. Figma

[Figma's remote server](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) gives the agent frames, components, variables, and layout data, so it builds from the design file instead of a screenshot. Figma's VS Code steps use a `servers` entry of type `http` at `https://mcp.figma.com/mcp`, then **Start** and **Allow access**; it's also a Copilot connector, and Figma publishes a plugin for GitHub Copilot that adds its skills.

Best for: turning designs into components that use your design tokens. Tradeoffs: tool-call limits depend on your Figma seat and plan.

### 9. Azure MCP Server

The [Azure MCP Server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started/tools/visual-studio-code) puts Azure resources in reach: list resource groups, query storage and Cosmos DB, check Key Vault, generate Bicep. Microsoft recommends the Azure MCP Server extension for VS Code (or GitHub Copilot for Azure, which includes it); it authenticates with the account you're already signed into through the Azure CLI or VS Code, and prompts for a browser sign-in otherwise.

Best for: teams deploying to Azure who want the agent to inspect live resources. Tradeoffs: it acts with your Azure permissions, and its tool count is large enough to need trimming.

## The picks side by side

| Server | What it adds | Best route in VS Code | Auth |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, research | HTTP config or one-click install | None, API key, or sign-in |
| GitHub MCP | Issues, PRs, Actions | MCP gallery or HTTP config | OAuth or PAT |
| Context7 | Version-specific library docs | Extension or HTTP config | Optional API key |
| Microsoft Learn | Microsoft and Azure docs | Connector or HTTP config | None |
| Playwright | Real browser automation | Workspace .mcp.json | Local install |
| Sentry | Production errors | Connector | OAuth |
| Linear | Issues and projects | Connector | OAuth |
| Figma | Design context | Connector or HTTP config | OAuth |
| Azure MCP | Live Azure resources | Extension | Azure sign-in |

## Frequently asked questions

Does GitHub Copilot support MCP in VS Code? Yes. Copilot agent sessions in VS Code can call tools from local stdio servers and remote HTTP or SSE servers, plus GitHub-managed connectors. On Copilot Business or Enterprise, an admin has to enable the MCP servers in Copilot policy first, and connectors also need the Editor preview features policy.

Should I use .vscode/mcp.json or the new .mcp.json? Use the portable files (`.mcp.json` in the repo, `~/.copilot/mcp-config.json` for yourself) for new setups, since the Copilot harness and Copilot CLI both read them. Keep `.vscode/mcp.json` for servers that need prompted `inputs`, an `envFile`, or sandboxing, and know that servers depending on `${input:...}` won't reach Copilot harness sessions.

How many MCP servers can Copilot use at once? There's no published server limit in VS Code, but a single chat request can carry at most 128 enabled tools. Three to six servers is a practical range; disable the rest per workspace rather than uninstalling them.

Do my VS Code MCP servers work in the Copilot cloud agent? No. The cloud agent reads MCP config from the repository's settings on github.com, and personal cloud servers are set up on your Copilot home page. Copilot connectors are the exception: connect once and they work in VS Code, Copilot CLI, the Copilot app, and cloud sandbox sessions.

## Try it in two minutes

Use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp), or run **MCP: Add Server**, choose **HTTP**, paste `https://mcp.parallel.ai/mcp`, and save it to Copilot Global. Then ask Copilot something that needs the current web, such as the latest breaking changes in a library you use, and expand the tool call to confirm `web_search` ran. No account or key is required. When you want `web_research` and higher limits, [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file. For the same picks in other editors, see our guides to the [best MCP servers for Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor) and [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code), or read [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) before you mix the two.

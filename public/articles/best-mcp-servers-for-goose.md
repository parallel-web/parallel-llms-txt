# The best MCP servers (extensions) for Goose in 2026

Goose MCP setup comes down to picking extensions, because every capability Goose has, from its shell tools to a hosted Notion connection, arrives as an MCP server. This guide covers how Goose loads and permissions extensions, how to stay under its recommended tool count, and the eight servers worth adding in 2026, with working config for each.

[Goose](https://goose-docs.ai/) is the open-source, general-purpose agent that Block created and donated to the [Agentic AI Foundation](https://goose-docs.ai/blog/2026/04/07/goose-moves-to-aaif) at the Linux Foundation in April 2026, where it now sits alongside the [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) and AGENTS.md. It runs as a desktop app, a CLI, and an API, works with whichever model provider you configure, and ships roughly weekly; v1.57.0 landed on October 28. Goose calls its add-ons "extensions," and each one is an MCP server, including the tools it ships with.

Disclosure: we make Parallel, and our server is pick #1. Read that section with the vendor in mind, and note that Goose's own directory also lists Exa, Tavily, and Firecrawl if you'd rather compare.

## How MCP works in Goose

Goose's built-ins are MCP servers in their own right. [Developer](https://goose-docs.ai/docs/mcp/developer-mcp) (file edits and shell commands) is on by default. Computer Controller (web scraping, file caching, automation), Memory (remembers your preferences), Tutorial, and Auto Visualiser are bundled and off until you toggle them. A second tier of platform extensions runs inside the agent process: Analyze, Extension Manager, Skills, and Summon are on by default, while Chat Recall, Todo, Top of Mind, Apps, and Code Mode are opt-in.

You can add third-party servers four ways, per Goose's [extensions guide](https://goose-docs.ai/docs/getting-started/using-extensions):

- **Extensions directory.** [goose-docs.ai/extensions](https://goose-docs.ai/extensions) lists servers with install buttons that fire `goose://extension?...` deeplinks into Goose Desktop. Any vendor can publish the same kind of link; stdio links use `cmd` and repeated `arg` parameters, remote ones use `url` and `type=streamable_http`.
- **Goose Desktop.** Open the sidebar, click **Extensions**, then **Add custom extension**. Pick the type, then fill in the ID, name, command or endpoint URL, environment variables or request headers, and a timeout.
- **Goose CLI.** Run `goose configure`, choose **Add Extension**, then **Built-in Extension**, **Command-line Extension**, or **Remote Extension (Streamable HTTP)**, and answer the prompts.
- **config.yaml.** Edit `~/.config/goose/config.yaml` on macOS and Linux, or `%APPDATA%\Block\goose\config\config.yaml` on Windows.

The [config file reference](https://goose-docs.ai/docs/guides/config-files) lists four extension types: `builtin`, `platform`, `stdio`, and `streamable_http`. SSE isn't supported, so an old SSE-only server needs a Streamable HTTP endpoint or a local bridge.

```yaml
extensions:
  parallel:
    type: streamable_http
    name: parallel
    enabled: true
    uri: https://mcp.parallel.ai/mcp
    headers: {}
    timeout: 300

  playwright:
    type: stdio
    name: playwright
    enabled: true
    cmd: npx
    args: ["@playwright/mcp@latest"]
    timeout: 300
```

**OAuth.** Remote extensions that require OAuth get a client ID automatically through Client ID Metadata Documents or Dynamic Client Registration. For servers that support neither, you set `client_id`, a `client_secret_key` that points at a stored secret, and `scopes` on the extension. The callback runs on `127.0.0.1` with an ephemeral port, and `GOOSE_OAUTH_CALLBACK_PORT` pins it if a provider only allows a fixed redirect URI.

**Tool budget.** Goose's [tool permissions guide](https://goose-docs.ai/docs/guides/managing-tools/tool-permissions) says it performs best with fewer than 25 tools enabled across all extensions. Developer and the default platform extensions already spend part of that, so the `available_tools` field, which loads only the tools you list from an extension, matters more here than in most clients. The Extension Manager can also turn an extension on mid-session when a task needs it; that change lasts only for the current session.

**Permissions.** Goose runs in Autonomous mode by default, which means it can call tools and edit files without asking. Switch with `/mode approve`, `/mode smart_approve`, or `/mode chat` in the CLI, or under **Settings > Chat** in Desktop. In Manual and Smart modes you can set each tool to Always Allow, Ask Before, or Never Allow.

**Admin and team controls.** Set `GOOSE_ALLOWLIST` to the URL of a YAML file of approved commands and Goose will refuse to install anything else ([allowlist guide](https://goose-docs.ai/docs/guides/allowlist)). Goose also checks external extensions for known malware before activating them. For shareable setups, a [recipe](https://goose-docs.ai/docs/guides/recipes/recipe-reference) declares its own `extensions` list in YAML; when a recipe names extensions explicitly, only those load, and required secrets are declared by name in `env_keys` and resolved from the environment or the keyring.

## The best MCP servers for Goose

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) is one hosted server at `https://mcp.parallel.ai/mcp`. With no account and no key, it gives Goose `web_search` (ranked results with excerpts dense enough to answer from, in the Search API's fast mode), `web_fetch` (reads up to 20 URLs per call and returns relevant excerpts or full-page markdown, PDFs and JavaScript-heavy pages included), and `web_decisions` (typed answers such as a probability, a pick among options, or a score, with sources). We ran `initialize`, `tools/list`, and a `web_search` call against the keyless endpoint today, with no key or account.

Our [installation docs](https://docs.parallel.ai/integrations/mcp/installation) have an **Add to Goose** deeplink that installs it as a Streamable HTTP extension in one click. The YAML above does the same by hand. Two upgrades are available. Put a key from [platform.parallel.ai](https://platform.parallel.ai/) in the `headers` field as `Authorization: Bearer <key>` to add `web_research`, which researches one question and returns a cited answer in the same call, plus higher rate limits. Or use `https://mcp.parallel.ai/mcp?login` to sign in with your Parallel account instead; that endpoint advertises Dynamic Client Registration, which is what Goose's OAuth flow uses.

Because of the 25-tool guidance, the URL parameter `?tools=web_search,web_fetch` is worth knowing: it trims the server to the two original tools. Goose's Computer Controller can already scrape pages, so the case for adding Parallel is search across the open web plus extraction that returns only what's relevant. Exa and Tavily are both in Goose's directory, so testing all three on your own tasks is a few minutes' work.

Best for: current facts, docs, and pages mid-task, with no signup. Tradeoffs: we're the vendor; keyless use runs at lower rate limits, and signed-in or keyed calls bill at the [Search and Extract API rates](https://parallel.ai/pricing).

### 2. Context7

[Context7](https://context7.com/docs/installation) serves current, version-specific library documentation so the model stops guessing at APIs. It's in Goose's directory as a stdio extension (`npx -y @upstash/context7-mcp`, which needs Node.js), and Goose's [Context7 tutorial](https://goose-docs.ai/docs/mcp/context7-mcp) has a one-click installer. If you'd rather not run Node locally, add the remote endpoint `https://mcp.context7.com/mcp` as a Streamable HTTP extension with an `Authorization: Bearer` API key, or use `https://mcp.context7.com/mcp/oauth` to sign in.

It's also cheap on the tool budget. Our `tools/list` call against the hosted server returned two tools, `resolve-library-id` and `query-docs`.

Best for: coding sessions with Developer enabled. Tradeoffs: covers indexed libraries only; web search handles the rest.

### 3. GitHub

GitHub's [official MCP server](https://github.com/github/github-mcp-server) is in Goose's directory as a remote extension at `https://api.githubcopilot.com/mcp/`. Goose's [GitHub tutorial](https://goose-docs.ai/docs/mcp/github-mcp) authenticates with a personal access token in an `Authorization: Bearer` request header rather than OAuth, since GitHub's authorization server doesn't advertise dynamic registration. A fine-grained token scoped to the repos you want Goose to touch is the sensible default.

Best for: issues, PRs, branches, and commits from a Goose session. Tradeoffs: it exposes many tools, so set `available_tools` to the handful you use or it will eat most of your 25-tool budget on its own.

### 4. Playwright

Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp) drives a real browser through accessibility snapshots, and its README lists Goose among supported clients. Install it from the directory or add a command-line extension with `npx @playwright/mcp@latest` (Node.js 18 or newer). Where Computer Controller handles scraping and simple automation, Playwright is for clicking through a flow, filling forms, and checking what your app actually renders.

Best for: UI verification and multi-step browser tasks. Tradeoffs: heavier and slower than fetching a page; for reading content, `web_fetch` or Computer Controller is cheaper.

### 5. Figma

Goose's directory entry for Figma points at the [desktop MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server), which the Figma desktop app runs at `http://127.0.0.1:3845/mcp` once you click **Enable desktop MCP server** in Dev Mode. Add it as a Streamable HTTP extension with that URL. The desktop server needs a Dev or Full seat on a paid plan, and it lets you select a frame in Figma and ask Goose to implement it.

Figma also runs a remote server at `https://mcp.figma.com/mcp` with features the desktop server lacks, such as writing to the canvas, but only clients listed in Figma's MCP catalog can connect to it. We couldn't confirm Goose is on that list today, which is why Goose documents the desktop route.

Best for: design-to-code work on files you already have open. Tradeoffs: the Figma desktop app must be running with a design file open.

### 6. Supabase

[Supabase's hosted server](https://supabase.com/docs/guides/getting-started/mcp) at `https://mcp.supabase.com/mcp` is in Goose's directory, and the first connection opens a browser window to sign in with OAuth. Scope it before you use it: append `?project_ref=<id>` to limit it to one project and `read_only=true` to run every query as a read-only Postgres user, for example `https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true`. Supabase says the server is meant for development and testing, not production data.

Best for: schema work, queries, migrations, and Edge Functions on a dev project. Tradeoffs: in Goose's default Autonomous mode, write tools run without asking, so pair it with read-only mode or Ask Before permissions.

### 7. Linear

[Linear's remote server](https://linear.app/docs/mcp) at `https://mcp.linear.app/mcp` isn't in Goose's directory, so add it as a remote extension through `goose configure` or Desktop. Its authorization server advertises both Dynamic Client Registration and Client ID Metadata Documents, the two methods Goose uses to sign in on its own. Linear also accepts an API key in an `Authorization: Bearer` header if you'd rather skip the browser flow.

Best for: finding, filing, and updating issues and projects from the same session that wrote the code. Tradeoffs: write tools create real issues; restrict `available_tools` to the read tools until you trust the workflow.

### 8. Notion

[Notion MCP](https://developers.notion.com/guides/mcp/get-started-with-mcp) at `https://mcp.notion.com/mcp` is the hosted server Notion maintains. Notion's setup guide tells any client it doesn't cover to add that URL as a remote Streamable HTTP server, and its OAuth endpoint supports dynamic registration, so Goose can sign in on its own. On Business and Enterprise plans, a workspace owner can issue an MCP token that Goose sends as a bearer header, with no browser sign-in, which suits recipes run on a schedule.

Best for: pulling specs, meeting notes, and docs into research or writing tasks, since Goose is used well beyond code. Tradeoffs: the server can see whatever your Notion account can; review what it may edit before leaving it in Autonomous mode.

## The picks side by side

| Server | What it adds | Goose type | Auth | In Goose's directory |
| --- | --- | --- | --- | --- |
| Parallel MCP | Web search, fetch, decisions, research | streamable_http | None, API key, or OAuth | No; deeplink in Parallel docs |
| Context7 | Version-specific library docs | stdio or streamable_http | Optional API key or OAuth | Yes |
| GitHub | Repos, issues, PRs | streamable_http | Personal access token | Yes |
| Playwright | Real browser automation | stdio | None | Yes |
| Figma | Design context from the desktop app | streamable_http (local) | Figma desktop sign-in | Yes |
| Supabase | Projects, SQL, migrations | streamable_http | OAuth | Yes |
| Linear | Issues and projects | streamable_http | OAuth or API key | No |
| Notion | Pages and databases | streamable_http | OAuth or MCP token | No |

## Frequently asked questions

Does Goose support MCP? Yes. Goose was one of the earliest MCP clients, and every extension, including built-ins like Developer and Computer Controller, is an MCP server. You can install anything from its extensions directory or add any other server as a stdio or Streamable HTTP extension.

Where is the Goose config file? On macOS and Linux it's `~/.config/goose/config.yaml`; on Windows it's `%APPDATA%\Block\goose\config\config.yaml`. Extensions live under the `extensions` key. Provider API keys don't belong there; Goose keeps them in the system keyring or `secrets.yaml`.

Does Goose support OAuth for remote MCP servers? Yes. For remote extensions it registers itself through Client ID Metadata Documents or Dynamic Client Registration and runs the browser sign-in for you. For servers that require a pre-registered client, set `client_id`, `client_secret_key`, and `scopes` on the extension.

How many extensions should I enable? Goose's docs recommend fewer than 25 tools in total across all enabled extensions. Count tools, not servers: one big server can cost more than three small ones. Use `available_tools` to trim large servers, and let the Extension Manager turn on rarely used ones only for the sessions that need them.

Can I test an extension without installing it? Yes. `goose session --with-streamable-http-extension "<url>"` adds a remote server for one session, and `--with-extension "<command>"` does the same for a local one. Neither changes your saved config.

## Try one session before you commit

The session flag means you can try Parallel MCP without touching `config.yaml`:

```bash
goose session --with-streamable-http-extension "https://mcp.parallel.ai/mcp"
```

Ask something that needs today's web, then compare it against the directory's other search extensions on the same prompt. If you keep it, add it permanently with the deeplink or YAML above. The [Parallel MCP page](https://parallel.ai/mcp) has the full tool list and settings. A [Parallel account](https://platform.parallel.ai/) adds `web_research` and higher limits, and comes with up to $80 in free credits plus $5 a month with a card on file. For how other agents handle the same servers, see our guides for [OpenCode](https://parallel.ai/articles/best-mcp-servers-for-opencode) and [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code), and our breakdown of [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers).

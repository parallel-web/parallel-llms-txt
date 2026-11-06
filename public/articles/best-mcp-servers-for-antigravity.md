# The best MCP servers for Google Antigravity in 2026

Antigravity MCP setup comes down to one file and a store: Google's agent-first platform installs servers from its MCP Store in a click and reads anything custom from mcp_config.json. This guide picks nine servers worth adding in 2026, from Parallel and Google's own Firebase, BigQuery, and Developer Knowledge servers to GitHub, Context7, Chrome DevTools, Supabase, and Linear, with the exact Antigravity config for each.

Google Antigravity is Google's agent-first development platform, and it now ships as a desktop App, an IDE, a CLI, and a Python SDK. The App's latest release, v2.29.0 (November 3, 2026), runs Gemini 4 Argon and Gemini 3.8 Flash, with Claude Opus 5.5 and Sonnet 5.5 available on paid Google AI Pro and Ultra plans. Out of the box it can already orchestrate several agents at once, hand background tasks to subagents in isolated Git worktrees, drive Chrome through its browser subagent, and search the web with built-in Google Search and URL reading tools. [MCP](https://parallel.ai/articles/what-is-mcp) is how you connect everything else: your databases, your issue tracker, your repos, and specialized data sources.

A note before the list: we make Parallel, and it's pick #1, so read that section knowing who wrote it. Everything else here is a server we'd install without a stake in it.

## How MCP works in Antigravity

All three surfaces read the same config format. Servers live in an `mcpServers` map in `mcp_config.json`, either globally at `~/.gemini/config/mcp_config.json` or per project at `.agents/mcp_config.json`, which you can commit so the team inherits it. Each entry takes exactly one transport: `command` (plus `args`, `env`, and `cwd`) for a local stdio server, or `serverUrl` for a remote Streamable HTTP server. Antigravity also accepts `url` as an alias, but `serverUrl` is what its docs and most vendor guides use, so stick with it.

Where you edit depends on the surface:

- **Antigravity App:** Customizations in the sidebar, then Installed, then the MCP Servers section. Add MCP Server (+) opens the searchable MCP Store, and Copy Config File Path takes you to the raw file.
- **Antigravity IDE:** the ⋮ menu at the top of the agent panel, then MCP Servers, then Manage MCP Servers, then View raw config.
- **Antigravity CLI:** type `/mcp` to open the MCP Manager, which shows live status and connection logs and reloads servers.

Authentication has three routes. Remote servers that support Dynamic Client Registration or Client ID Metadata Documents get OAuth with PKCE automatically: click Authenticate next to the server, finish sign-in in the browser, and paste the code back. Servers that need an API key take a `headers` object. Google and Google Cloud servers can use `"authProviderType": "google_credentials"`, which attaches your Application Default Credentials, so there's no key to manage.

A few controls matter once you have more than a handful of servers. `enabledTools` and `disabledTools` trim what each server exposes to the agent, tool calls time out after 3 minutes by default (`timeoutSeconds` changes that), and unconfigured MCP tools run in Ask mode until you allow them with permission rules like `mcp(github/*)`. The App's Plugin Marketplace also bundles MCP servers with skills and rules; partner plugins from Figma, Linear, Notion, and Stripe arrived on October 29. Full details are in [Antigravity's MCP docs](https://antigravity.google/docs/mcp).

## The best MCP servers for Antigravity

### 1. Parallel MCP

Antigravity's built-in Google Search is a strong default for quick lookups, with Google's index coverage and freshness behind it. [Parallel MCP](https://parallel.ai/mcp) is an additional option shaped for agent loops. `web_search` returns ranked results with excerpts dense enough to answer from without opening each page, which keeps long sessions from filling the context window. `web_fetch` reads up to 20 URLs per call and returns the relevant excerpts or full-page markdown, PDFs and JavaScript-heavy pages included. `web_decisions` answers typed questions (a probability, a choice among options you give, or a score) with sources; prompt it by name. The same server works in every MCP client you use, whatever model is behind it.

These three tools need no account and no key. The Parallel MCP page has a one-click Antigravity install, or add the entry yourself:

```json
{
  "mcpServers": {
    "parallel": {
      "serverUrl": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

To add `web_research`, which researches one question and returns a cited answer in the same call, and to raise rate limits, add a `headers` block with `"Authorization": "Bearer YOUR_API_KEY"` using a key from [platform.parallel.ai](https://platform.parallel.ai). New accounts get up to $80 in free credits plus $5 a month with a card on file. Parallel also offers OAuth sign-in at `https://mcp.parallel.ai/mcp?login`; its authorization server advertises dynamic client registration, which Antigravity's OAuth flow supports, but we haven't run that sign-in inside Antigravity yet, so the API key is the tested route. The MCP Store also lists Parallel Search; if your installed entry still points at the older `search.parallel.ai/mcp` endpoint, swap in the URL above.

Best for: answer-ready web context and reading specific URLs in long agent runs. Tradeoffs: we're the vendor, and keyless use runs at lower rate limits. With a key in the headers block you can also pin a search mode or include and exclude domains through an x-parallel-mcp-config header.

### 2. Google Developer Knowledge

The [Developer Knowledge server](https://developers.google.com/knowledge/mcp) searches and reads official Google developer documentation: Android, Firebase, Google Cloud, Google Maps Platform, Flutter, and Antigravity's own docs. It exposes `search_documents`, `get_documents`, and `answer_query`, so the agent checks the current API before writing against it. Install it from the MCP Store and it connects with your Google credentials, no key needed. For the CLI or a shared workspace file, Google's docs give a `serverUrl` of `https://developerknowledge.googleapis.com/mcp` with `google_credentials` auth and an `X-goog-user-project` header.

Best for: anyone building on Google's platforms. Tradeoffs: covers Google documentation only; pair it with Context7 for everything else.

### 3. Firebase MCP

The [Firebase MCP server](https://firebase.google.com/docs/ai-assistance/mcp-server) runs locally through the Firebase CLI and works on your projects with the same credentials the CLI uses: Authentication users, Firestore and Realtime Database data, security rules, Crashlytics issues, Cloud Functions logs, deploys, and Cloud Messaging. In the IDE, open MCP Servers from the agent panel menu and install Firebase, which writes this entry for you: `"command": "npx", "args": ["-y", "firebase-tools@latest", "mcp"]`. Add `--only auth,firestore` (or whichever feature groups you use) to the args to trim the tool list.

Best for: Firebase apps, where the agent can read rules and data instead of guessing at them. Tradeoffs: it acts with your CLI login, so review write actions before you approve them.

### 4. BigQuery and Google Cloud remote MCP servers

Google Cloud now runs managed remote MCP servers for its own products, including [BigQuery](https://cloud.google.com/bigquery/docs/use-bigquery-mcp), Cloud SQL, Spanner, AlloyDB, Bigtable, and GKE, all of which appear in the MCP Store. They come with IAM-based authorization, audit logging, and optional Model Armor screening. Antigravity has first-class support through Application Default Credentials: run `gcloud auth application-default login`, then add the endpoint.

```json
{
  "mcpServers": {
    "bigquery": {
      "serverUrl": "https://bigquery.googleapis.com/mcp",
      "authProviderType": "google_credentials"
    }
  }
}
```

If requests fail on quota, set a quota project with `gcloud auth application-default set-quota-project`. The BigQuery server is enabled whenever the BigQuery API is enabled on the project.

Best for: data work and analytics engineering where schemas and queries live in BigQuery. Tradeoffs: you still pay for the queries it runs, and IAM decides what it can touch, so start with a read-only role.

### 5. GitHub MCP

GitHub's hosted server covers repositories, issues, pull requests, code search, and Actions. GitHub's [Antigravity guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-antigravity.md) recommends connecting to the hosted remote server directly with a personal access token:

```json
{
  "mcpServers": {
    "github": {
      "serverUrl": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_GITHUB_PAT"
      }
    }
  }
}
```

It registers a lot of tools, so this is the server where `enabledTools` earns its keep. Best for: PR review and multi-repo work. Tradeoffs: the largest tool surface on this list, and a PAT to rotate.

### 6. Context7

[Context7](https://context7.com/docs/resources/all-clients) returns documentation for the library version you're actually using, which stops the agent from calling APIs that changed since its training data. It complements Developer Knowledge for the non-Google parts of your stack. Context7's Antigravity entry is a `serverUrl` of `https://mcp.context7.com/mcp` with an `Authorization: Bearer YOUR_API_KEY` header; a free key from the Context7 dashboard raises rate limits.

Best for: framework-heavy codebases. Tradeoffs: only indexed libraries are covered.

### 7. Chrome DevTools MCP

Antigravity's browser subagent already drives Chrome and integrates with Chrome DevTools MCP, and the server is in the MCP Store. Adding [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) yourself gives the main agent direct access to performance traces, network requests, and console output. The Chrome team's Antigravity config runs `npx -y chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222`, which attaches to the browser Antigravity is already using; drop the flag to let it launch its own Chrome.

Best for: debugging frontend performance and network issues. Tradeoffs: usage statistics are on by default (`--no-usage-statistics` turns them off).

### 8. Supabase MCP

The hosted [Supabase server](https://supabase.com/docs/guides/getting-started/mcp) at `https://mcp.supabase.com/mcp` gives the agent your tables, SQL, migrations, logs, and Supabase docs. It uses dynamic client registration, so a plain `serverUrl` entry gets the Authenticate button with no token. Add `?project_ref=YOUR_REF&read_only=true` to scope it to one project and run every query as a read-only Postgres user.

Best for: Supabase-backed apps. Tradeoffs: Supabase designs it for development and testing, so keep it away from production data.

### 9. Linear MCP

[Linear's hosted server](https://linear.app/docs/mcp) finds, creates, and updates issues, projects, and comments. The entry is `"serverUrl": "https://mcp.linear.app/mcp"`, and OAuth 2.1 with dynamic client registration handles sign-in; `/mcp/readonly` exposes only read tools. Linear is also one of the partner plugins in Antigravity's Marketplace, which is the quicker install in the App.

Best for: teams that plan in Linear and want "pick up ENG-123" to load the ticket. Tradeoffs: write access by default, and each workspace needs its own auth session.

## The picks side by side

| Server | What it adds | Auth in Antigravity | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, URL fetching, decisions, research | None, API key, or OAuth | Free keyless; key use billed per request |
| Developer Knowledge | Official Google developer docs | Google credentials | Free |
| Firebase | Firebase project data and rules | Firebase CLI login | Free with Firebase |
| BigQuery | Schemas and SQL on your datasets | Google credentials (ADC) | BigQuery query pricing |
| GitHub | Repos, issues, PRs, Actions | Personal access token | Free |
| Context7 | Version-specific library docs | Optional API key | Free tier |
| Chrome DevTools | Traces, network, console | Local install | Free |
| Supabase | Tables, SQL, migrations, logs | OAuth | Free with Supabase |
| Linear | Issues, projects, comments | OAuth | Free with Linear |

## Frequently asked questions

Does Google Antigravity support MCP? Yes. The Antigravity App, IDE, and CLI all read `mcp_config.json`, support local stdio and remote Streamable HTTP servers, and handle OAuth for servers with dynamic client registration or CIMD. The SDK connects stdio, SSE, and HTTP servers from the workspace's `.agents/mcp_config.json`.

Where is the Antigravity mcp_config.json file? Globally at `~/.gemini/config/mcp_config.json` and per project at `.agents/mcp_config.json`. Some older vendor guides still mention `~/.gemini/antigravity/mcp_config.json`; the App's Copy Config File Path button and the IDE's View raw config open whichever file your version uses.

Should I use `serverUrl` or `url`? Use `serverUrl`. Antigravity's docs define it as the remote transport property and note that `url` also works, but vendor guides written for earlier versions report an error with `url`, so `serverUrl` is the safe choice everywhere.

Do I need a web search MCP if Antigravity has Google Search built in? Not for most quick lookups; the built-in tools handle those well. Add Parallel when you want excerpts sized for long agent sessions, batch reads of specific URLs, typed decisions, or the same search tools across every client you use. Both are free to try, so run your own questions through each.

How many MCP servers should I enable? Antigravity's docs don't publish a hard cap, but every server's tool definitions take context on each turn. Enable the servers that match your stack, use `enabledTools` on the large ones like GitHub, and set `"disabled": true` on anything you only need occasionally.

## Try it in two minutes

Use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp), or open View raw config in the IDE (or Copy Config File Path in the App) and paste the Parallel block above, and ask the agent a question that needs today's web. No account, no key, and nothing billed. When you want `web_research` and higher limits, [create a Parallel account](https://platform.parallel.ai) and add your key as a header. For other clients, see our guides to the [best MCP servers for Gemini CLI](https://parallel.ai/articles/best-mcp-servers-for-gemini-cli), the [best web search MCP servers](https://parallel.ai/articles/best-web-search-mcp), and [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers).

# The best Cursor MCP servers in 2026, with mcp.json config

Cursor MCP servers live in mcp.json, and Cursor's Marketplace installs the popular ones in one click. Here are the eleven that earn their context cost in 2026, from web search and library docs to Linear, Sentry, Supabase, and Figma, plus the one server most lists recommend that Cursor doesn't need, with exact config for each.

Cursor made [MCP](https://parallel.ai/articles/what-is-mcp) mainstream for IDE users: servers install from a one-click deeplink or a few lines of `mcp.json`, and its agent uses them alongside the editor's own context. That convenience cuts both ways, because Cursor users accumulate servers fast, and every one of them spends context on every agent turn. This guide is the short list that earns the cost, plus the popular recommendation you can skip.

Disclosure: we make Parallel, Parallel MCP is the first pick, and we cite the benchmark numbers so you can discount our bias.

## How MCP works in Cursor

Config lives at ~/.cursor/mcp.json for your personal setup or .cursor/mcp.json in a repo for project-scoped, team-shared servers. Remote servers are a url entry (plus optional headers); local ones set "type": "stdio" with a command, args, and env. Values can pull from your shell with ${env:NAME}, so keys stay out of the repo. Cursor handles OAuth in-app for servers that need sign-in. The [Cursor Marketplace](https://cursor.com/marketplace) installs official plugins, many of which bundle an MCP server, in one click from Customize, which is also where you turn individual servers on and off; vendor deeplinks cover most of the rest without hand-editing JSON. On Enterprise, admins can allowlist which servers and tools the team may run. Put team-relevant servers in the project file and keep personal experiments out of it.

## The best MCP servers for Cursor

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) gives Cursor's agent three tools with no account or API key: web_search, returning ranked results with excerpts dense enough to answer from directly; web_fetch, which reads up to 20 URLs per call and returns relevant excerpts or full-page markdown, PDFs and JavaScript-heavy pages included; and web_decisions, which answers typed questions (a probability, a pick among options, a score) with sources. Sign in and it adds web_research, which researches one question and returns a cited answer in the same call. The Parallel MCP page has a one-click Cursor install, or add the keyless entry by hand:

```json
{
  "mcpServers": {
    "Parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

On Openbenchmarks' [coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents) (100 documentation tickets, September 2026), the underlying API's fast mode completed 66.7% from search alone, third of 14 behind Perplexity and Firecrawl. For an IDE agent the practical win is current documentation and error research without leaving the editor, and web_fetch keeps long docs pages from flooding the context window.

Best for: grounding Cursor in the current web at zero cost. Tradeoffs: we're the vendor. Keyless use has lower rate limits and runs the fast search mode. Switching the url to https://mcp.parallel.ai/mcp?login (Cursor runs the OAuth sign-in) or adding an API key as a headers entry, "Authorization": "Bearer ${env:PARALLEL_API_KEY}", adds web_research, raises the limits, and bills calls to your Parallel account at the underlying API rates. Signed-in or keyed connections can also pin a search mode or include and exclude domains with an x-parallel-mcp-config header, and ?tools= on the URL trims the tool list.

Parallel is also in the Cursor Marketplace as a [plugin](https://docs.parallel.ai/integrations/cursor-marketplace) (`/add-plugin parallel` in chat) that adds skills and slash commands such as /parallel-research and /parallel-enrich on top of the parallel-cli. It needs the CLI and a Parallel login or API key, so the mcp.json entry above is the quicker route if you only want search and fetch.

### 2. Context7

Version-pinned library documentation on demand, the standard fix for hallucinated APIs and the most-recommended companion server in Cursor setups. When the agent writes against a library that changed since training, Context7 is what catches it.

**Best for:** real signatures for the versions in your lockfile.** Tradeoffs:** indexed libraries only; pair with web search for the long tail.

### 3. GitHub MCP

GitHub's official hosted server at https://api.githubcopilot.com/mcp/ covers issues, PRs, code search, and Actions logs. GitHub's [Cursor install guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md) says the remote server currently needs a personal access token in Cursor, sent as an Authorization: Bearer header; reference it with ${env:GITHUB_PAT} rather than pasting it into mcp.json. In Cursor it's worth adding for PR review and for multi-repo context that the open project alone doesn't give you. It registers many tools, so limit its toolsets to what you actually use.

**Best for:** PR-heavy, multi-repo workflows.** Tradeoffs:** the heaviest tool surface on this list.

### 4. Playwright MCP

Microsoft's browser-automation server lets Cursor's agent verify its own frontend work: load the page, click the flow, screenshot the result. It's among the most-installed servers in the community, and it lets the agent confirm a fix instead of handing you a plausible diff.

**Best for:** UI verification and bug reproduction.** Tradeoffs:** heavier than API calls; for reading pages, `web_fetch` is cheaper.

### 5. Chrome DevTools MCP

Google's [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) lets the agent control and inspect a live Chrome browser with DevTools attached: performance traces, network requests, console messages, and screenshots. Playwright is the pick for clicking through a flow; this one is for when the page works but loads slowly, a request fails, or the console fills with errors. It runs locally, and the repo has a one-click Cursor install or the standard entry:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

Best for: diagnosing slow pages, failing network calls, and console errors in the app you're building. Tradeoffs: a large tool set; the --slim flag exposes a reduced set for basic browser tasks. Usage statistics are on by default, and --no-usage-statistics turns them off.

### 6. Linear MCP

[Linear’s hosted server](https://linear.app/docs/mcp) lets Cursor’s agent find, create, and update issues, projects, and comments, so you can say “pick up LIN-123” and have the ticket’s description in context before the first edit. It runs on Streamable HTTP with OAuth 2.1 and dynamic client registration, so Cursor opens the sign-in for you. Linear’s docs also publish a one-click Cursor deeplink, and the server is in the Cursor Marketplace.

```json
{
  "mcpServers": {
    "linear": {
      "url": "https://mcp.linear.app/mcp"
    }
  }
}
```

**Best for:** teams that plan in Linear and want tickets, specs, and status updates without switching windows. **Tradeoffs:** write access by default; point at `https://mcp.linear.app/mcp/readonly` if you only want the agent reading issues. Each workspace needs its own auth session.

### 7. Sentry MCP

[Sentry’s remote server](https://docs.sentry.io/product/sentry-mcp/) pulls production errors into the editor: paste a Sentry issue URL into Cursor’s chat and the agent fetches the issue’s stack trace and event details, then works on the fix against the real failure. Auth is OAuth through your Sentry account, and Sentry’s own Cursor instructions use the plain `url` entry below.

```json
{
  "mcpServers": {
    "sentry": {
      "url": "https://mcp.sentry.dev/mcp"
    }
  }
}
```

**Best for:** debugging production errors with the actual stack trace instead of a paraphrase. **Tradeoffs:** sees everything your Sentry user can see. Append `/your-org/your-project` to the URL path to scope the session to one project.

### 8. Supabase MCP

The [Supabase server](https://supabase.com/docs/guides/getting-started/mcp) gives the agent your schema, SQL, migrations, logs, and Supabase docs through tools like `list_tables`, `execute_sql`, `apply_migration`, and `get_logs`, which turns “why is this query slow” into something it can check. It’s hosted at `mcp.supabase.com` with OAuth via dynamic client registration; the old personal access token step is no longer required. Three URL parameters do the safety work: `project_ref` scopes it to one project, `read_only=true` runs every query as a read-only Postgres user, and `features` limits which tool groups load.

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=${env:SUPABASE_PROJECT_REF}&read_only=true&features=database,docs,debugging"
    }
  }
}
```

**Best for:** Supabase projects where the agent needs the real schema to write correct queries and migrations. **Tradeoffs:** Supabase says to keep it away from production data and to treat it as a development tool; use read-only mode and project scoping if you connect anything real.

### 9. Figma MCP

[Figma’s remote server](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) brings frames, components, variables, and layout data into Cursor, so the agent builds from the design file instead of a screenshot description. The remote server doesn’t need the Figma desktop app. Figma recommends its Cursor plugin, which bundles the MCP config with Agent Skills; the manual route is a deeplink or the entry below, followed by Connect and an OAuth approval.

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

**Best for:** turning designs into components that match your design system’s tokens. **Tradeoffs:** usage depends on your seat. Per [Figma’s rate-limit page](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/), View and Collab seats and Starter plans get up to 20 tool calls a month; Dev and Full seats on paid plans get up to 200 a day, or 600 on Enterprise.

### 10. Vercel MCP

[Vercel’s official server](https://vercel.com/docs/agent-resources/vercel-mcp) connects the agent to your projects, deployments, build and runtime logs, and Vercel’s docs. The useful loop in Cursor is “find the latest deployment and check its runtime errors,” which uses list_deployments, get_deployment, and get_runtime_errors together. After you add it, Cursor shows a “Needs login” prompt that starts the OAuth flow.

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

Best for: apps deployed on Vercel, where failed builds and runtime errors are the bugs you chase most. Tradeoffs: Vercel’s [tools reference](https://vercel.com/docs/agent-resources/vercel-mcp/tools) spans 27 categories, from deployments and logs to domains, billing, and firewall config, and the server acts with your full account permissions, so grant it only the teams you need during sign-in.

### 11. Notion MCP

[Notion’s hosted server](https://developers.notion.com/docs/get-started-with-mcp) lets the agent search your workspace and read or update pages and databases, which is where many teams keep the specs, RFCs, and runbooks that explain why the code looks the way it does. Notion’s Cursor instructions use the same one-line `url` entry, and the first Notion tool call triggers the OAuth flow.

```json
{
  "mcpServers": {
    "notion": {
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

**Best for:** pulling product specs and design docs into the coding session. **Tradeoffs:** OAuth only, with no bearer-token option on the hosted server, so it won’t work for headless Cursor agents. The older open-source `notion-mcp-server` takes a token but Notion says it’s no longer actively maintained.

## The one to skip: filesystem MCP

Generic best-MCP lists recommend the reference filesystem server everywhere, but Cursor already gives its agent sandboxed access to your open project. Adding the standalone server duplicates capability and pays double context for it. Reach for it only for cross-project file access outside the workspace.

## The picks side by side

| Server | What it adds | Auth | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, typed decisions, research | None; sign-in or API key adds web_research | Free keyless; API rates when signed in |
| Context7 | Version-pinned library docs | Optional key | Free tier |
| GitHub MCP | Issues, PRs, Actions | Personal access token | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Chrome DevTools MCP | Performance traces, network, console | Local install | Free, open source |
| Linear MCP | Issues, projects, comments | OAuth or API key | Free with Linear |
| Sentry MCP | Production errors and stack traces | OAuth | Free with Sentry |
| Supabase MCP | Schema, SQL, migrations, logs | OAuth | Free with Supabase |
| Figma MCP | Design context from Figma files | OAuth | Seat-based limits |
| Vercel MCP | Deployments, logs, runtime errors | OAuth | Free with Vercel |
| Notion MCP | Workspace pages and databases | OAuth | Free with Notion |

## Frequently asked questions

**How many MCP servers should Cursor have?** Three to six enabled at once, even though this list has eleven. Past that, tool schemas crowd the context, selection accuracy drops, and the agent gets slower. Pick the ones that match your stack (Supabase or Vercel only if you use them), toggle the rest off, and audit occasionally.

**Project or global config?** Team-relevant servers go in `.cursor/mcp.json` in the repo so everyone inherits them; personal ones stay in `~/.cursor/mcp.json`.

Are these free? The servers themselves cost nothing: Parallel MCP's keyless tools, GitHub, Playwright, Chrome DevTools, Linear, Sentry, Supabase, Vercel, and Notion run on your existing accounts and plans. Context7 has a free tier, and Figma’s limits depend on your seat (20 tool calls a month on View, Collab, and Starter). Parallel's web_research bills at API rates once you sign in, and a new account gets up to $80 in free credits plus $5 a month with a card on file.

## Six lines to test it

Use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp) or paste the mcp.json block above, reload Cursor, and ask the agent something that needs the current web. The keyless server never asks for a key or an account, and nothing gets billed. When you want web_research and higher limits, switch to the ?login URL; [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

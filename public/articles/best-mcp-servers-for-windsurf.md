# The best MCP servers for Windsurf in 2026

Windsurf's Cascade agent reads MCP servers from mcp_config.json, with a serverUrl format that trips up copy-pasters from Cursor. The five servers worth installing in 2026, with correct config for each.

Windsurf's Cascade agent supports [MCP](https://parallel.ai/articles/what-is-mcp) like every serious harness in 2026, with one recurring gotcha: its config format differs from Cursor's just enough that copy-pasted snippets fail silently. Remote servers in Windsurf use a `serverUrl` key, not url, in `~/.codeium/windsurf/mcp_config.json`. Get that right and everything below installs in a minute.

We make Parallel and our search server is the first pick here, so weigh that as you read; we link the benchmark numbers so you can check them yourself.

## The best MCP servers for Windsurf

### 1. Parallel Search MCP

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) gives Cascade two tools: `web_search` for ranked, token-dense results it can usually answer from directly, and `web_fetch` for clean markdown from specific URLs, PDFs and JavaScript-heavy pages included. It's hosted, free, and needs no API key:

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "serverUrl": "https://search.parallel.ai/mcp"
    }
  }
}
```

The underlying API ranks first on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 15 search API products (August 2026). For an IDE agent, the day-to-day value is current docs and error research in the flow of coding, with `web_fetch` keeping long pages from flooding context.

**Best for:** grounding Cascade in the current web at zero cost.** Tradeoffs:** we're the vendor; anonymous rate limits suit personal use, and a free API key lifts them.

### 2. Context7

Version-pinned library documentation on demand, the highest-impact fix for hallucinated APIs in any coding agent. Pair it with web search: Context7 for indexed libraries, search for everything else.

**Best for:** correct signatures for your lockfile's versions.** Tradeoffs:** coverage limited to indexed libraries.

### 3. GitHub MCP

The official hosted server for issues, PRs, code search, and Actions logs over OAuth. Scope its toolsets; it's the heaviest server on this list, and if your GitHub needs are light, the `gh` CLI through the terminal covers most of it for free context.

**Best for:** PR-heavy, multi-repo work.** Tradeoffs:** large tool surface.

### 4. Playwright MCP

Microsoft's browser server lets Cascade click through the app it just modified: load, interact, screenshot. That's how Cascade confirms a feature works instead of assuming the diff is right.

**Best for:** UI verification and bug reproduction.** Tradeoffs:** heavier than API calls.

### 5. Sentry MCP

Hosted, OAuth-secured access to production errors and traces. Debugging with the actual stack trace in context beats debugging from a description of it, and Windsurf's agent uses that context well.

**Best for:** production issue triage in the editor.** Tradeoffs:** only useful if you run Sentry.

## The picks side by side

| Server | What it adds | Auth | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | None required | Free; API key optional |
| Context7 | Version-pinned library docs | Optional key | Free tier |
| GitHub MCP | Issues, PRs, Actions | OAuth | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Sentry MCP | Production errors and traces | OAuth | Free with Sentry |

## Frequently asked questions

**Why doesn't my Cursor config work in Windsurf?** Remote servers need `serverUrl` in Windsurf where Cursor uses url. Same JSON shape otherwise; that one key is the usual culprit.

**How many servers should I run?** Three to six. Every connected server spends context on every Cascade turn.

**Are these free?** Parallel Search, GitHub, and Playwright cost nothing; Context7 and Sentry have free tiers.

## Test it in one edit

Paste the `mcp_config.json` block above, refresh Cascade's MCP list, and ask something that needs the current web. The server never asks for an account or a key; [a free Parallel account](https://platform.parallel.ai/) adds $5 in monthly credits when you want higher limits.

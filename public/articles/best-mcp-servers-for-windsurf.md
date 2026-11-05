# The best MCP servers for Windsurf (Devin Desktop) in 2026

Windsurf now ships as Devin Desktop, and MCP setup moved with it: the Devin Local agent reads servers from Devin CLI config files, and the old Windsurf file still gets imported. This guide covers the five MCP servers worth installing in 2026 and the exact config for each.

Windsurf has a new name. Cognition [renamed it Devin Desktop](https://cognition.com/blog/introducing-devin-desktop) on June 2, 2026, and the September 8 release [removed the Cascade agent](https://docs.devin.ai/desktop/changelog), leaving Devin Local as the only agent in the editor. [MCP](https://parallel.ai/articles/what-is-mcp) support came along, but it now lives in the Devin CLI config files, so a few habits from the Windsurf days need updating. The picks below are the ones we'd install either way, with setup that matches the current docs.

We make Parallel and our search server is the first pick here, so weigh that as you read; we link the benchmark numbers so you can check them yourself.

## How MCP works in Devin Desktop

Devin Local shares its agent harness with Devin CLI, so MCP servers live in the [Devin CLI config files](https://docs.devin.ai/cli/extensibility/mcp/configuration): `~/.config/devin/mcp_config.json` for every project, `.devin/mcp_config.json` for servers you commit to a repo, and `.devin/mcp_config.local.json` for personal keys, which stays out of git. Remote servers take a `url` and optional `headers`; the transport defaults to Streamable HTTP and falls back to SSE. `devin mcp add` writes the entry for you, and `devin mcp login` runs the OAuth flow for servers that need it.

Your Windsurf setup carries over. Devin Local [imports MCP servers](https://docs.devin.ai/cli/reference/configuration/read-config-from) from `~/.codeium/windsurf/mcp_config.json` by default, along with Cursor and Claude Code configs, and the Devin Local MCP list has a marketplace for one-click installs. Two things are new: Devin Local asks before it calls any MCP tool until you allow that tool or the whole server, for the session or permanently, and enterprise admins can replace the default marketplace with their own [MCP registry](https://docs.devin.ai/desktop/cascade/mcp) or allowlist specific servers.

## The best MCP servers for Windsurf

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) is one hosted server. With no account or key, it gives Devin Local `web_search` for ranked, token-dense results it can usually answer from directly, `web_fetch` for clean markdown from up to 20 URLs per call (PDFs and JavaScript-heavy pages included), and `web_decisions` for typed questions such as a probability or a pick among options. Signing in through `https://mcp.parallel.ai/mcp?login` or sending an API key adds `web_research`, which returns a cited answer to one question in a single call, along with higher rate limits:

```json
{
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Or run `devin mcp add -s user parallel https://mcp.parallel.ai/mcp`. If you added Parallel to the old Windsurf file with `serverUrl`, Devin Local imports that entry, so there's nothing to redo.

The underlying API's advanced mode scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. For an IDE agent, the day-to-day value is current docs and error research in the flow of coding, with `web_fetch` keeping long pages from flooding context.

Best for: grounding Devin Local in the current web at zero cost. Tradeoffs: we're the vendor; keyless rate limits suit personal use, and signing in or adding a key lifts them, with those calls billed at the underlying API rates. Those connections can also pin a search mode or include and exclude domains through an x-parallel-mcp-config header.

### 2. Context7

Version-pinned library documentation on demand, the highest-impact fix for hallucinated APIs in any coding agent. The hosted server at `https://mcp.context7.com/mcp` works without a key (we listed its tools today), and a free Context7 key raises the rate limits. Pair it with web search: Context7 for indexed libraries, search for everything else.

**Best for:** correct signatures for your lockfile's versions.** Tradeoffs:** coverage limited to indexed libraries.

### 3. GitHub MCP

GitHub's official server for issues, PRs, code search, and Actions logs, hosted at `https://api.githubcopilot.com/mcp/`. GitHub's [Windsurf install guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-windsurf.md) authenticates the remote server with a personal access token in an `Authorization` header, and Devin's docs note that GitHub doesn't support dynamic client registration, so OAuth needs a pre-registered client. Scope its toolsets; it's the heaviest server on this list, and if your GitHub needs are light, the gh CLI through the terminal covers most of it for free context.

**Best for:** PR-heavy, multi-repo work.** Tradeoffs:** large tool surface.

### 4. Playwright MCP

Microsoft's browser server lets Cascade click through the app it just modified (load, interact, screenshot) to confirm a feature works instead of assuming the diff is right.

**Best for:** UI verification and bug reproduction.** Tradeoffs:** heavier than API calls.

### 5. Sentry MCP

Hosted, OAuth-secured access to production errors and traces, so Cascade debugs from the actual stack trace instead of a description of it.

**Best for:** production issue triage in the editor.** Tradeoffs:** only useful if you run Sentry.

## The picks side by side

| Server | What it adds | Auth | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetching, typed decisions; research when signed in | None required; sign-in or API key optional | Free keyless; signed-in calls billed per request |
| Context7 | Version-pinned library docs | Optional key | Free tier |
| GitHub MCP | Issues, PRs, Actions | Personal access token | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Sentry MCP | Production errors and traces | OAuth | Free with Sentry |

## Frequently asked questions

Does my old Windsurf MCP config still work? Yes. Devin Local imports servers from `~/.codeium/windsurf/mcp_config.json` by default, and Devin Desktop accepts either `serverUrl` or `url` for remote servers. For new entries, use `url` in `~/.config/devin/mcp_config.json`; it's the standard key, so the same block also works in Cursor.

How many servers should I run? Three to six. Every connected server adds tool definitions the agent has to carry, and Devin Local prompts before each new MCP tool until you approve it.

Are these free? Parallel MCP's keyless tools, GitHub's server, and Playwright cost nothing; Context7 and Sentry have free tiers.

## Test it in one edit

Paste the mcp_config.json block above, check that the server shows as connected in the Devin Local MCP list, and ask something that needs the current web. The keyless tools never ask for an account or a key, and the [Parallel MCP page](https://parallel.ai/mcp) covers setup in other clients; [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file when you want `web_research` and higher limits.

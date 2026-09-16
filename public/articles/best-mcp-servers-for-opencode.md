# The best MCP servers for OpenCode in 2026

OpenCode configures MCP servers in opencode.json and can scope any server's tools to specific agents. Here are the five servers worth installing in 2026, including how the free Parallel Search MCP compares to OpenCode's built-in Exa-backed websearch.

OpenCode is the open-source, provider-agnostic coding agent that's become the default [alternative to Claude Code](https://parallel.ai/articles/opencode-vs-claude-code-a-2026-comparison-for-developers), and [MCP](https://parallel.ai/articles/what-is-mcp) is how you extend it. Its config has a feature worth knowing before you install anything: per-agent tool globs, which let you connect a heavy server but expose its tools only to the agents that need them.

This guide covers how MCP works in OpenCode, how the free Parallel Search MCP compares to OpenCode's built-in Exa-backed websearch tool, and the five servers we'd actually install. Disclosure: we make Parallel, so read our first pick knowing the vendor wrote it; the benchmark numbers are there so you don't have to take our word.

## How MCP works in OpenCode

Servers are declared in the [mcp block of ](https://opencode.ai/docs/mcp-servers/)`[opencode.json](https://opencode.ai/docs/mcp-servers/)`, either in the project root (checked into git, shared with your team) or globally at `~/.config/opencode/opencode.json`. Each entry is type remote (a hosted URL, with optional OAuth or bearer headers) or type local (a command OpenCode spawns). The tools block then enables or disables tools by glob, globally or per agent, using the `<server>_*` pattern.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "parallel-search": {
      "type": "remote",
      "url": "https://search.parallel.ai/mcp",
      "enabled": true
    }
  }
}
```

## The best MCP servers for OpenCode

### 1. Parallel Search MCP

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is the nine-line config above: a hosted server, free with no API key, exposing `web_search` for ranked, excerpt-dense results and `web_fetch` for token-efficient markdown from specific URLs, PDFs and JavaScript-rendered pages included.

OpenCode also has a built-in websearch tool backed by Exa's hosted service, and it's a fair question why you'd add another one. The answer is now third-party: on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 15 search API products (August 2026), Parallel Search (advanced) leads at 75, one point ahead of Exa (auto) at 74. The margin is thin, so [test on your own queries](https://parallel.ai/articles/best-web-search-api). Both options are free inside OpenCode, so the comparison costs you nothing but a config entry, and the Parallel server adds explicit page fetching either way.

**Best for:** current docs, errors, and library research mid-task, plus reading specific pages without flooding context.

**Tradeoffs:** we're the vendor. Anonymous use runs lower rate limits in the low-latency basic mode; add an Authorization Bearer header with a free API key from `platform.parallel.ai` to lift them.

### 2. Parallel Task MCP

The [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) gives OpenCode asynchronous research subagents: hand one a whole objective and it fans out across sources on Parallel's side, returning a structured, cited result while your session keeps coding. Paired with OpenCode's per-agent tool globs, you can expose it only to a research agent and keep your build agent lean. Every account includes a [recurring $5 monthly free credit](https://parallel.ai/pricing) that covers a lot of per-request research.

**Best for:** dependency audits, vendor comparisons, and background research.** Tradeoffs:** needs an API key and returns in minutes, not seconds.

### 3. Context7

Context7 serves version-pinned library documentation, the cheapest cure for hallucinated APIs. Since OpenCode runs whatever model you point it at, including smaller local ones, grounding API calls in real docs matters even more here than in single-vendor harnesses.

**Best for:** correct, current API signatures regardless of which model is driving.** Tradeoffs:** indexed libraries only; web search covers the rest.

### 4. GitHub MCP

GitHub's official hosted server brings issues, PRs, and Actions logs into OpenCode. Even GitHub's own OpenCode install guide warns that it can add a lot of tokens to your context, and recommends limiting toolsets. This is exactly what OpenCode's glob pattern is for: disable `github_*` globally and re-enable it only for the agent that does repo chores.

```json
{
  "tools": {
    "github_*": false
  },
  "agent": {
    "repo-helper": {
      "tools": { "github_*": true }
    }
  }
}
```

**Best for:** PR-heavy, multi-repo workflows.** Tradeoffs:** big tool surface; scope it as above, or just use the `gh` CLI through shell if your needs are light.

### 5. Playwright MCP

Microsoft's Playwright server lets OpenCode verify its own frontend work in a real browser: load the page, click the flow, screenshot the result. Among the most-installed MCP servers in the community by mid-2026.

**Best for:** UI verification and bug reproduction.** Tradeoffs:** heavier than API calls; for reading pages, `web_fetch` is cheaper.

## The picks side by side

| Server | What it adds | Type | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | Remote | Free; API key optional |
| Parallel Task MCP | Deep research subagents | Remote + API key | $5/month free credit, then per request |
| Context7 | Version-pinned library docs | Local or remote | Free tier |
| GitHub MCP | Issues, PRs, Actions | Remote + OAuth or PAT | Free |
| Playwright MCP | Real browser automation | Local | Free |

## Let the globs do the discipline

The standard advice, keep three to six servers, applies here too, but OpenCode softens it: with per-agent tool globs you can keep more servers configured while each agent sees only a lean slice. Put shared servers in the project's `opencode.json` so the whole team inherits them, keep personal ones in the global config, and default heavy servers to disabled.

## Frequently asked questions

**Does OpenCode have built-in web search?** Yes, a websearch tool backed by Exa's hosted service, available when using the OpenCode provider or by setting `OPENCODE_ENABLE_EXA`. It's a fine default. The Parallel Search MCP is the free upgrade path: higher benchmarked accuracy at lower per-request cost, plus an explicit fetch tool. Run both on your real queries and keep the winner.

**Can I share MCP config with my team?** Yes. Project-root `opencode.json` is designed to be checked into git and overrides the global config.

**How do I stop a server from bloating my context?** Disable its tools globally with a `<server>_*` glob and re-enable them for the specific agent that needs them, as in the GitHub example above.

**Are these servers free?** Parallel Search, GitHub, and Playwright cost nothing; Context7 has a free tier. The Task MCP runs on Parallel's $5 recurring monthly free credit until your usage outgrows it.

## Nine lines to test it

Paste the config block above into `opencode.json` and ask OpenCode something that needs the current web. You won't need a key or an account, and the built-in websearch gives you a baseline to compare against. When you want higher limits or research subagents, [a free Parallel account](https://platform.parallel.ai/) includes $5 in credits every month.

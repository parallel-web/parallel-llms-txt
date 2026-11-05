# The best MCP servers for OpenCode in 2026

OpenCode configures MCP servers in opencode.json and lets you scope any server's tools to specific agents. Here are the five servers worth installing in 2026, including how Parallel MCP fits next to OpenCode's built-in websearch tool, which can now run on Exa, Parallel, and other providers.

OpenCode is the open-source, provider-agnostic coding agent that's become the default [alternative to Claude Code](https://parallel.ai/articles/opencode-vs-claude-code-a-2026-comparison-for-developers), and [MCP](https://parallel.ai/articles/what-is-mcp) is how you extend it. Its config has a feature worth knowing before you install anything: per-agent tool patterns, which let you connect a heavy server but expose its tools only to the agents that need them.

This guide covers how MCP works in OpenCode, how Parallel MCP fits next to OpenCode's built-in websearch tool, and the five servers we'd actually install. Disclosure: we make Parallel, so read our first pick knowing the vendor wrote it; the benchmark numbers are there so you don't have to take our word.

## How MCP works in OpenCode

Servers are declared in the [mcp block of opencode.json](https://opencode.ai/docs/mcp-servers/), either in the project root (checked into git, shared with your team) or globally at ~/.config/opencode/opencode.json. Each entry is type remote (a hosted URL; OpenCode runs OAuth automatically when a server asks for it, or you send bearer headers) or type local (a command OpenCode spawns). The tools block then enables or disables tools by glob, globally or per agent, using the <server>_* pattern. [OpenCode v2](https://opencode.ai/v2/docs/mcp-servers) nests servers under `mcp.servers`, swaps `enabled` for `disabled`, moves tool rules into an ordered `permissions` array, and adds `opencode mcp add <name> --url <url>`, but it still [reads the v1 format](https://opencode.ai/v2/docs/migrate-v1) shown here.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "parallel": {
      "type": "remote",
      "url": "https://mcp.parallel.ai/mcp",
      "enabled": true
    }
  }
}
```

## The best MCP servers for OpenCode

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) is the config above, or a one-click OpenCode install from the Parallel MCP page: a hosted server whose keyless tools are `web_search` for ranked, excerpt-dense results, `web_fetch` for token-efficient markdown from up to 20 URLs per call (PDFs and JavaScript-rendered pages included), and `web_decisions` for typed questions such as a probability or a pick among options. Point the URL at `https://mcp.parallel.ai/mcp?login` to sign in through OpenCode's OAuth flow, or send an API key header, and you also get `web_research`, which returns a cited answer to one research question in a single call.

OpenCode also has a built-in websearch tool, and Parallel is now one of its backends. In v1 it runs on Exa or Parallel when you use the OpenCode provider or set `OPENCODE_ENABLE_EXA` or `OPENCODE_ENABLE_PARALLEL`; in [v2](https://opencode.ai/v2/docs/websearch) you pick from Exa, Firecrawl, Parallel, Tavily, and TinyFish and connect an account or key. On the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products (September 2026 data), Parallel Search (advanced) scores 75, one point ahead of Exa (auto) at 74, and both trail Perplexity Search (medium) at 80. The margin is thin, so [test on your own queries](https://parallel.ai/articles/best-web-search-api). The MCP server still earns its place next to the built-in tool: it adds Parallel's `web_fetch` extraction, `web_decisions`, and, once you sign in, `web_research`.

**Best for:** current docs, errors, and library research mid-task, plus reading specific pages without flooding context.

Tradeoffs: we're the vendor. Keyless use runs at lower rate limits with the Search API in fast mode; sign in, or add an `Authorization: Bearer` header with a key from platform.parallel.ai, to lift them, with those calls billed at the underlying API rates. Those connections can also fix the search mode or include and exclude domains with an x-parallel-mcp-config header.

### 2. Sentry MCP

Sentry's [hosted server](https://docs.sentry.io/product/sentry-mcp/) brings production errors, traces, and issue details into OpenCode, and it's one of the worked examples in OpenCode's own [MCP docs](https://opencode.ai/docs/mcp-servers/). Add a remote entry for `https://mcp.sentry.dev/mcp` with `"oauth": {}`, then run `opencode mcp auth sentry` to finish sign-in in the browser. Paired with OpenCode's per-agent patterns, you can expose it only to a debugging agent and keep your build agent lean.

Best for: fixing production bugs from the real stack trace. Tradeoffs: only useful if you run Sentry.

### 3. Context7

Context7 serves version-pinned library documentation, the cheapest cure for hallucinated APIs. Since OpenCode runs whatever model you point it at, including smaller local ones, grounding API calls in real docs matters even more here than in single-vendor harnesses.

**Best for:** correct, current API signatures regardless of which model is driving.** Tradeoffs:** indexed libraries only; web search covers the rest.

### 4. GitHub MCP

GitHub's official hosted server brings issues, PRs, and Actions logs into OpenCode; [GitHub's OpenCode guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-opencode.md) connects it with a personal access token header and `"oauth": false`. That guide also repeats OpenCode's warning that the server can add a lot of tokens to your context, and recommends limiting toolsets. OpenCode's glob pattern handles that: disable github_* globally and re-enable it only for the agent that does repo chores.

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

Best for: PR-heavy, multi-repo workflows. Tradeoffs: big tool surface; scope it as above, or just use the gh CLI through shell if your needs are light. In v2, the same scoping is a top-level `{ "action": "github_*", "resource": "*", "effect": "deny" }` rule plus a matching `allow` rule under `agents.repo-helper.permissions`.

### 5. Playwright MCP

Microsoft's Playwright server lets OpenCode verify its own frontend work in a real browser: load the page, click the flow, screenshot the result. It was among the most-installed MCP servers in the community by mid-2026.

**Best for:** UI verification and bug reproduction.** Tradeoffs:** heavier than API calls; for reading pages, `web_fetch` is cheaper.

## The picks side by side

| Server | What it adds | Type | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetching, typed decisions; research when signed in | Remote | Free keyless; signed-in calls billed per request |
| Sentry MCP | Production errors and traces | Remote + OAuth | Free with Sentry |
| Context7 | Version-pinned library docs | Local or remote | Free tier |
| GitHub MCP | Issues, PRs, Actions | Remote + PAT | Free |
| Playwright MCP | Real browser automation | Local | Free |

## Let the globs do the discipline

The standard advice, keep three to six servers, applies here too, but OpenCode softens it: with per-agent tool rules you can keep more servers configured while each agent sees only a lean slice, and v2's Code Mode keeps MCP tools off the native tool list by default, so agents reach them through the `execute` tool (set `codemode: false` on a server to list its tools directly). Put shared servers in the project's opencode.json so the whole team inherits them, keep personal ones in the global config, and default heavy servers to disabled.

## Frequently asked questions

Does OpenCode have built-in web search? Yes. In v1, the websearch tool runs on Exa or Parallel when you use the OpenCode provider or set `OPENCODE_ENABLE_EXA` or `OPENCODE_ENABLE_PARALLEL`; in v2 you choose a provider (Exa, Firecrawl, Parallel, Tavily, or TinyFish) in opencode.json or with /connect. Parallel MCP is worth adding alongside it for page fetching, typed decisions, and signed-in research. If you'd rather skip MCP on v1, the [Parallel OpenCode plugin](https://docs.parallel.ai/integrations/opencode-plugin) adds parallel-search and parallel-fetch tools instead.

**Can I share MCP config with my team?** Yes. Project-root `opencode.json` is designed to be checked into git and overrides the global config.

**How do I stop a server from bloating my context?** Disable its tools globally with a `<server>_*` glob and re-enable them for the specific agent that needs them, as in the GitHub example above.

Are these servers free? Parallel MCP's keyless tools, GitHub's server, and Playwright cost nothing; Context7 and Sentry have free tiers. Signed-in Parallel calls, including `web_research`, are billed per request.

## Test it with one config entry

Paste the config block above into opencode.json (or use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp)) and ask OpenCode something that needs the current web. You won't need a key or an account, and the built-in websearch gives you a baseline to compare against. When you want `web_research` or higher limits, [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

# The best MCP servers for Codex CLI in 2026

Codex CLI reads MCP servers from one config.toml shared with the IDE extension and desktop app. Here are the five servers worth that config space in 2026, with the exact codex mcp add command for each.

Codex CLI is OpenAI's terminal coding agent, and its [MCP](https://parallel.ai/articles/what-is-mcp) setup has a property the other harnesses don't: one config file, `~/.codex/config.toml`, is shared by the CLI, the IDE extension, and the ChatGPT desktop app. Configure a server once and it follows you across all three surfaces. The flip side is that a TOML syntax error breaks all three at once, so it pays to use the CLI commands rather than hand-editing.

Here are the five servers we'd give that config space to, with the exact command for each. Disclosure: we make Parallel, our search server is the first pick, and the benchmark numbers are cited so you can discount our bias.

## How MCP works in Codex CLI

Servers live under [`mcp_servers`.<name>] entries in `config.toml`, and `[codex mcp add](https://developers.openai.com/codex/mcp)` writes them for you, for both local stdio servers (pass the launch command) and remote HTTP servers (pass `--url`). `codex mcp list` shows what's configured, `codex mcp login` runs the OAuth flow for servers that support it, and `/mcp` inside the TUI shows what's active. You can also scope servers to a trusted project with a `.codex/config.toml` in the repo.

## The best MCP servers for Codex CLI

### 1. Parallel Search MCP

Web context is what coding agents most often lack: the error message that started appearing last month, the docs page for the version you actually installed, the changelog behind a breaking change. The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) closes that gap with two tools: `web_search`, returning ranked results with excerpts dense enough to answer from directly, and `web_fetch`, which pulls token-efficient markdown from specific URLs, PDFs and JavaScript-heavy pages included. It's hosted and free, with no API key required.

```bash
codex mcp add parallel-search --url https://search.parallel.ai/mcp
```

Parallel ranks first on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 15 search API products across 7 providers (August 2026). Restart Codex after adding the server and the tools appear.

**Best for:** grounding Codex in current docs, errors, and releases without leaving the terminal.

**Tradeoffs:** we're the vendor, so we're biased. Anonymous use has lower rate limits and runs the low-latency basic search mode; the API key and OAuth variants above lift the limits.

### 2. Parallel Task MCP

For research that's too deep for a few search calls, the [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) hands Codex asynchronous web research subagents: give one an objective, it fans out across sources on Parallel's side and returns a structured, cited result while your session keeps working. It needs an API key, but every account carries a [recurring $5 monthly free credit](https://parallel.ai/pricing), and pricing is per request, so costs are known before a job runs.

**Best for:** dependency audits, vendor comparisons, and background research.** Tradeoffs:** minutes, not seconds; keep Search for the quick lookups.

### 3. Context7

Context7 serves version-pinned library documentation, the highest-impact fix for hallucinated APIs. It's the example OpenAI's own MCP docs use, and the one-liner is:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

**Best for:** real API signatures for the versions in your lockfile.** Tradeoffs:** covers indexed libraries; pair with web search for the long tail.

### 4. GitHub MCP

GitHub's official hosted server brings issues, pull requests, code search, and Actions logs into Codex over OAuth (`codex mcp login github` after adding it). The usual caveat applies: it registers many tools, so limit toolsets to the ones you use, and if your GitHub workflow is light, the `gh` CLI through shell may be all you need.

**Best for:** multi-repo, PR-heavy work.** Tradeoffs:** large tool surface; scope it or it crowds your context.

### 5. Playwright MCP

Microsoft's Playwright server gives Codex a real browser to verify its own work: load the page it just changed, click through the flow, screenshot the result. By mid-2026 it's among the most-installed MCP servers in the community, and it turns a plausible-looking diff into a confirmed fix.

**Best for:** UI verification and frontend bug reproduction.** Tradeoffs:** heavier than API calls; for just reading pages, `web_fetch` is cheaper.

## The picks side by side

| Server | What it adds | Transport | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | Remote HTTP | Free; API key optional |
| Parallel Task MCP | Deep research subagents | Remote HTTP + API key | $5/month free credit, then per request |
| Context7 | Version-pinned library docs | Local stdio (npx) | Free tier |
| GitHub MCP | Issues, PRs, Actions | Remote HTTP + OAuth | Free |
| Playwright MCP | Real browser automation | Local stdio | Free |

## One config, three surfaces

Because the CLI, IDE extension, and desktop app share `config.toml`, your MCP setup is worth curating once and then leaving alone. Keep it to a handful of servers, prefer `codex mcp add` over hand edits (one malformed TOML line takes down every surface), and check `/mcp` in the TUI when something seems missing. Project-scoped `.codex/config.toml` files cover repo-specific servers without polluting your global set.

## Frequently asked questions

**Does Codex CLI support remote MCP servers?** Yes. Pass `--url` to `codex mcp add` for Streamable HTTP servers, and use `codex mcp login` for ones that authenticate with OAuth. Early Codex releases were stdio-only; that limitation is gone.

**Are these servers free?** Parallel Search, GitHub, and Playwright cost nothing; Context7 has a free tier. The Task MCP runs on Parallel's $5 recurring monthly free credit until you outgrow it.

**Why aren't my new tools showing up?** Restart Codex after adding a server; the config is read at startup. Then check `/mcp` in the TUI and `codex mcp list` from the shell.

**MCP server or shell tool?** When a first-class CLI exists and the agent drives it well, the CLI is cheaper in context. MCP earns its keep for hosted services with OAuth, structured schemas, or state.

## One command to test it

Run the anonymous `codex mcp add` command above, restart Codex, and ask it something that needs the current web. It costs nothing to compare against whatever you use today. When you want higher limits or research subagents, [a free Parallel account](https://platform.parallel.ai/) includes $5 in credits every month.

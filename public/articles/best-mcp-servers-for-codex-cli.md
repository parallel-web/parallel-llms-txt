# The best MCP servers for Codex CLI in 2026

Codex CLI reads MCP servers from one config.toml shared with the IDE extension and desktop app. Here are the five servers worth that config space in 2026, with the exact codex mcp add command for each.

Codex CLI is OpenAI's terminal coding agent, and its [MCP](https://parallel.ai/articles/what-is-mcp) setup has a property the other harnesses don't: one config file, `~/.codex/config.toml`, is shared by the CLI, the IDE extension, and the ChatGPT desktop app. Configure a server once and it follows you across all three surfaces. The flip side is that a TOML syntax error breaks all three at once, so it pays to use the CLI commands rather than hand-editing.

Here are the five servers we'd give that config space to, with the exact command for each. Disclosure: we make Parallel, Parallel MCP is the first pick, and the benchmark numbers are cited so you can discount our bias.

## How MCP works in Codex CLI

Servers live under [`mcp_servers`.<name>] entries in `config.toml`, and `[codex mcp add](https://developers.openai.com/codex/mcp)` writes them for you, for both local stdio servers (pass the launch command) and remote HTTP servers (pass `--url`). `codex mcp list` shows what's configured, `codex mcp login` runs the OAuth flow for servers that support it, and `/mcp` inside the TUI shows what's active. You can also scope servers to a trusted project with a `.codex/config.toml` in the repo.

## The best MCP servers for Codex CLI

### 1. Parallel MCP

Web context is what coding agents most often lack: the error message that started appearing last month, the docs page for the version you actually installed, the changelog behind a breaking change. [Parallel MCP](https://parallel.ai/mcp) closes that gap from one hosted server. Without a key it lists three tools: web_search, returning ranked results with excerpts dense enough to answer from directly; web_fetch, which reads up to 20 URLs per call and returns relevant excerpts or full-page markdown, PDFs and JavaScript-heavy pages included; and web_decisions, which answers typed questions (a probability, a pick among options, a score) with sources. Sign in or add an API key and you also get web_research, which researches one question and returns a cited answer in the same call. Pick one of the three setups:

```bash
# No key: web_search, web_fetch, web_decisions
codex mcp add parallel --url https://mcp.parallel.ai/mcp

# Sign in with OAuth (adds web_research); Codex opens the browser
codex mcp add parallel --url 'https://mcp.parallel.ai/mcp?login'

# Or use an API key from platform.parallel.ai, set as PARALLEL_API_KEY
codex mcp add parallel --url https://mcp.parallel.ai/mcp --bearer-token-env-var PARALLEL_API_KEY
```

Parallel Search (advanced) scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products across 12 providers (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. On Openbenchmarks' [coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents) (100 documentation tickets, September 2026), fast mode completed 66.7% from search alone, third of 14 behind Perplexity (77.3%) and Firecrawl (70.3%), and turbo had the fastest searches at 333ms. Restart Codex after adding the server and the tools appear.

**Best for:** grounding Codex in current docs, errors, and releases without leaving the terminal.

Tradeoffs: we're the vendor, so we're biased. Keyless use has lower rate limits and runs the low-latency fast search mode. The OAuth and API key variants add web_research, raise the limits, and bill calls to your Parallel account at the underlying API rates. Keyed or signed-in connections can also fix the search mode or include and exclude domains through an x-parallel-mcp-config header, and adding ?tools= to the URL limits which tools Codex loads.

### 2. Context7

Context7 serves version-pinned library documentation, the highest-impact fix for hallucinated APIs. It's the example OpenAI's own MCP docs use, and the one-liner is:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Best for: real API signatures for the versions in your lockfile. Tradeoffs: covers indexed libraries; pair with web search for the long tail. A free Context7 API key raises rate limits, and Context7 also publishes a Codex plugin that connects to its hosted server over OAuth.

### 3. GitHub MCP

GitHub's official hosted server brings issues, pull requests, code search, and Actions logs into Codex. GitHub's [Codex install guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md) authenticates the remote server with a personal access token read from an environment variable: `codex mcp add github --url https://api.githubcopilot.com/mcp/ --bearer-token-env-var GITHUB_PAT_TOKEN`. It registers many tools, so trim them with enabled_tools in config.toml, and if your GitHub workflow is light, the gh CLI through shell may be all you need.

**Best for:** multi-repo, PR-heavy work.** Tradeoffs:** large tool surface; scope it or it crowds your context.

### 4. Playwright MCP

Microsoft's Playwright server gives Codex a real browser to verify its own work: load the page it just changed, click through the flow, screenshot the result. It's one of the servers OpenAI's Codex docs list as a common choice, and it runs locally: `codex mcp add playwright -- npx @playwright/mcp@latest`.

Best for: UI verification and frontend bug reproduction. Tradeoffs: heavier than API calls, and for just reading pages, web_fetch is cheaper. Microsoft's README also suggests coding agents may do better with its Playwright CLI and skills than with the MCP server.

### 5. Sentry MCP

[Sentry's hosted server](https://docs.sentry.io/product/sentry-mcp/) pulls production errors, stack traces, and event details into the session, so Codex debugs from the real failure instead of your summary of it. Paste a Sentry issue URL and the agent fetches the issue before it touches the code.

```bash
codex mcp add sentry --url https://mcp.sentry.dev/mcp
```

The next time you run codex, it opens the OAuth flow to your Sentry account. Append /your-org/your-project to the URL to keep the session inside one project.

Best for: fixing production bugs with the actual trace in context. Tradeoffs: it sees whatever your Sentry user can see unless you scope the URL.

## The picks side by side

| Server | What it adds | Transport | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, typed decisions, research | Remote HTTP; sign-in or key for research | Free keyless; API rates when signed in |
| Context7 | Version-pinned library docs | Local stdio (npx) or remote | Free tier |
| GitHub MCP | Issues, PRs, Actions | Remote HTTP + personal access token | Free |
| Playwright MCP | Real browser automation | Local stdio | Free |
| Sentry MCP | Production errors and traces | Remote HTTP + OAuth | Free with Sentry |

## One config, three surfaces

Because the CLI, IDE extension, and desktop app share `config.toml`, your MCP setup is worth curating once and then leaving alone. Keep it to a handful of servers, prefer `codex mcp add` over hand edits (one malformed TOML line takes down every surface), and check `/mcp` in the TUI when something seems missing. Project-scoped `.codex/config.toml` files cover repo-specific servers without polluting your global set.

## Frequently asked questions

**Does Codex CLI support remote MCP servers?** Yes. Pass `--url` to `codex mcp add` for Streamable HTTP servers, and use `codex mcp login` for ones that authenticate with OAuth. Early Codex releases were stdio-only; that limitation is gone.

Are these servers free? Parallel MCP's keyless tools, GitHub, and Playwright cost nothing, Context7 has a free tier, and Sentry works with your existing Sentry account. Parallel's web_research bills at API rates once you sign in, and a new account gets up to $80 in free credits plus $5 a month with a card on file.

**Why aren't my new tools showing up?** Restart Codex after adding a server; the config is read at startup. Then check `/mcp` in the TUI and `codex mcp list` from the shell.

**MCP server or shell tool?** When a first-class CLI exists and the agent drives it well, the CLI is cheaper in context. MCP earns its keep for hosted services with OAuth, structured schemas, or state.

## One command to test it

Run the keyless codex mcp add command above, restart Codex, and ask it something that needs the current web. It costs nothing to compare against whatever you use today, and the [Parallel MCP page](https://parallel.ai/mcp) builds the Codex command with the tools and search settings you pick. When you want web_research and higher limits, use the OAuth variant; [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

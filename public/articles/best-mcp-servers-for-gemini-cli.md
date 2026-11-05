# The best MCP servers for Gemini CLI in 2026

Gemini CLI configures MCP servers in settings.json and ships with Google Search grounding built in. Here are the five servers worth adding anyway in 2026, with exact config, and when the built-in search is already enough.

Gemini CLI is Google's open-source terminal agent, and it arrives well equipped: Google Search grounding is built in, and [MCP](https://parallel.ai/articles/what-is-mcp) support handles everything else. Since June 18, 2026, Gemini CLI serves teams on Gemini Code Assist Standard or Enterprise licenses and developers on paid Gemini API or Gemini Enterprise Agent Platform keys, while Google [moved its free, Google AI Pro, and Ultra tiers to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) (our [Antigravity guide](https://parallel.ai/articles/best-mcp-servers-for-antigravity) covers that setup). For Gemini CLI itself, the useful question is what an agent that already has Google Search benefits from adding: excerpt-level web context for agent loops, current library docs, repo tooling, production error data, and a browser.

Disclosure: we make Parallel, our search server is the first pick, and we cite benchmark numbers so you can discount our bias and, better, test it free.

## How MCP works in Gemini CLI

Servers are declared under `mcpServers` in `~/.gemini/settings.json`, or `.gemini/settings.json` for one project. Remote Streamable HTTP servers use an `httpUrl` entry, `url` means SSE, and local stdio servers use `command` and `args`; `headers` works on both remote types, so API keys go straight into the config. `gemini mcp add --transport http` writes an entry for you (add `-s user` for the global file, since the default scope is the project). Gemini CLI handles OAuth for remote servers through automatic discovery and dynamic client registration, with `/mcp auth <server>` to sign in, and `includeTools` or `excludeTools` trims a server's tool list. [Extensions](https://geminicli.com/extensions/) bundle MCP servers with context and commands, and the gallery lists more than 2,000 of them. Use `/mcp` inside a session to check what's connected; the [Gemini CLI MCP docs](https://geminicli.com/docs/tools/mcp-server/) cover the rest.

## The best MCP servers for Gemini CLI

### 1. Parallel MCP

The built-in `google_web_search` tool is designed for grounded answers: the Gemini API processes the search results and hands the agent a [generated summary with source citations](https://geminicli.com/docs/tools/web-search/). [Parallel MCP](https://parallel.ai/mcp) takes a different shape. `web_search` returns ranked results with token-dense excerpts from the source pages, so the agent reads the evidence itself; `web_fetch` reads up to 20 URLs per call as clean markdown, PDFs included; and `web_decisions` answers typed questions like a probability or a pick among options. Those three are free with no API key:

```json
{
  "mcpServers": {
    "Parallel": {
      "httpUrl": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Or run `gemini mcp add -s user --transport http Parallel https://mcp.parallel.ai/mcp`.

The underlying API's advanced mode scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. Grounding is already part of your Gemini CLI setup and the keyless tools cost nothing, so run the same questions through both and keep whichever answers better.

Best for: excerpt-level web context and explicit page fetching in agent loops. Tradeoffs: we're the vendor, and keyless rate limits suit personal use. For `web_research` and higher limits, add `"headers": { "Authorization": "Bearer YOUR_PARALLEL_API_KEY" }` to the entry, or point `httpUrl` at `https://mcp.parallel.ai/mcp?login` and run `/mcp auth Parallel` to sign in through the browser. Signed-in and keyed calls are billed at the underlying API rates, and those connections can also send an x-parallel-mcp-config header to pin a search mode or include and exclude domains.

### 2. Context7

Context7 provides version-pinned library docs on demand. Search, even good search, retrieves pages about libraries; Context7 retrieves the documentation for the exact version you installed, so the generated code calls APIs that exist in that version. Upstash publishes it as a Gemini CLI extension (`gemini extensions install https://github.com/upstash/context7`), or you can point an `httpUrl` entry at `https://mcp.context7.com/mcp`.

**Best for:** killing hallucinated APIs.** Tradeoffs:** indexed libraries only.

### 3. GitHub MCP

GitHub's official hosted server covers issues, PRs, and Actions logs. GitHub's [Gemini CLI guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-gemini-cli.md) recommends its extension (`gemini extensions install https://github.com/github/github-mcp-server`), which reads a personal access token from `GITHUB_MCP_PAT`; an `httpUrl` entry for `https://api.githubcopilot.com/mcp/` with a Bearer header works too. It's tool-heavy, so scope its toolsets or use `includeTools`, and if your GitHub use is light, Gemini CLI drives the gh CLI through shell perfectly well without any server.

**Best for:** structured multi-repo workflows.** Tradeoffs:** large tool surface.

### 4. Playwright MCP

Playwright gives Gemini CLI a real browser for verifying frontend work and reproducing bugs. It's among the most-installed MCP servers in the community, and it suits a terminal agent that otherwise can't see the page it just changed.

**Best for:** UI verification.** Tradeoffs:** heavier than API calls; use `web_fetch` for plain reading.

### 5. Sentry MCP

Sentry's [hosted server](https://docs.sentry.io/product/sentry-mcp/) gives Gemini CLI production errors, traces, and issue details, so the agent debugs from the real stack trace instead of your paraphrase of it. Add an `httpUrl` entry for `https://mcp.sentry.dev/mcp`, restart, and run `/mcp auth sentry` to finish the OAuth flow in the browser. Append your organization and project slugs to the URL to keep a session scoped to one project.

Best for: production triage from the terminal. Tradeoffs: only useful if you run Sentry.

## The picks side by side

| Server | What it adds | Auth | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Excerpt-level web search, page fetching, typed decisions | None required; API key or sign-in optional | Free keyless; signed-in calls billed per request |
| Context7 | Version-pinned library docs | Optional key | Free tier |
| GitHub MCP | Issues, PRs, Actions | Personal access token | Free |
| Playwright MCP | Real browser automation | Local install | Free |
| Sentry MCP | Production errors and traces | OAuth | Free with Sentry |

## Frequently asked questions

Isn't built-in Google Search grounding enough? Often, yes. Grounding is built in, needs no setup, and returns a cited summary that's ready to use in the conversation. A search MCP fits when you want the agent to read source excerpts directly or fetch specific pages during a multi-step task. Since the keyless tools are free, measure both on your own questions rather than trusting either claim.

Should I use Antigravity CLI instead? It depends on your plan. Google moved free, Google AI Pro, and Google AI Ultra users to Antigravity CLI on June 18, 2026, and recommends it for the newest Gemini models; Gemini CLI stays available with Gemini Code Assist Standard or Enterprise licenses and paid API keys. Antigravity CLI reads MCP servers from `~/.gemini/config/mcp_config.json` and can import Gemini CLI extensions as plugins, so the servers on this list carry over. Our [Antigravity guide](https://parallel.ai/articles/best-mcp-servers-for-antigravity) has the setup.

How do I pass an API key for higher limits? Add a `headers` block with `Authorization: Bearer <key>` to the `httpUrl` entry, or pass `--header` to `gemini mcp add`. Gemini CLI sends custom headers on remote servers directly, so the old mcp-remote wrapper isn't needed.

Are these free? Parallel MCP's keyless tools, GitHub's server, and Playwright cost nothing; Context7 and Sentry have free tiers. Signed-in Parallel calls, including `web_research`, are billed per request.

## Run the comparison

Add the settings.json block above, restart Gemini CLI, and ask the same five questions with and without the server. Keep the setup that gets more of them right. Setup for other clients is on the [Parallel MCP page](https://parallel.ai/mcp). For `web_research` and higher limits, [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

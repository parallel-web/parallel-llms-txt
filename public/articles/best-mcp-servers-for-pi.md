# Does Pi support MCP? The best MCP servers for Pi in 2026

Pi added built-in MCP support in version 0.99, so the answer to the title question changed this fall. This guide covers both ways to connect servers, Pi's own pi mcp add and the pi-mcp-adapter extension, the four servers worth adding, and when a Pi skill or extension is the better answer.

[Pi](https://pi.dev/) is the minimal coding harness: a small, hackable agent you adapt to your workflows through extensions, skills, and packages, rather than a product that decides your workflow for you. It's also the harness underneath OpenClaw, which is a large part of why it's everywhere in 2026.

For most of Pi's life the answer to "does Pi support [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp)?" was no, by design. That changed with [Pi 0.99](https://pi.dev/changelog/releases/0.99.0) on September 29, 2026, which added MCP support, codemode, and tool search as built-in extensions. This guide covers how both MCP routes work today, which servers are worth connecting, and when Pi's native patterns serve you better. Disclosure: we make Parallel, one of the servers recommended below, and we'll show numbers rather than ask for trust.

## How Pi got MCP support

Pi's philosophy is that the harness stays small and everything else is a package. It launched without sub-agents, plan mode, or MCP; as [Armin Ronacher put it in his writeup of Pi](https://lucumr.pocoo.org/2026/1/31/pi), the omission was philosophical, and the ecosystem routed around it in two ways: bridging MCP servers to a plain CLI with [mcporter](https://github.com/steipete/mcporter), or installing pi-mcp-adapter, an extension that speaks MCP natively. Pi 0.99 kept the spirit of that design when it added [built-in MCP](https://pi.dev/docs/latest/mcp): MCP tools default to codemode exposure, so their definitions stay out of the model's context until a script looks them up, and you can switch the built-in off in `pi config`.

## How to add MCP to Pi

There are two routes. The built-in one ships with Pi: `pi mcp add <name> --url <url>` writes a server to `~/.pi/agent/mcp.json` (add `-l` for the project's `.pi/mcp.json`, which Pi reads only in trusted projects), `pi mcp login` handles OAuth, and `/mcp` inside a session shows status and lets you change each server's exposure. An `mcpServers` entry copied from Claude Code, Claude Desktop, or Cursor works as-is. The other route is [pi-mcp-adapter](https://pi.dev/packages/pi-mcp-adapter), which replaces the built-in when installed. It reads `.mcp.json` in your project, `~/.config/mcp/mcp.json`, and Pi's own mcp.json files, starts servers lazily and stops them after 10 idle minutes, and its `/mcp-adapter setup` flow imports configs from Cursor, Claude Code, Claude Desktop, Codex, VS Code, Windsurf, and OpenCode v1, previewing every file change before writing.

```bash
# Built-in (Pi 0.99 and later): add a remote server, then check it
pi mcp add context7 --url https://mcp.context7.com/mcp
pi mcp list

# Or install the adapter, which replaces the built-in
pi install npm:pi-mcp-adapter
# restart Pi, then inside a session:
/mcp-adapter setup
```

Before you pick servers, decide how tools should reach the model. The built-in defaults to `codemode` exposure, where the agent finds and calls MCP tools from a script, and `deferred` lets `tool_search` load them on demand. The adapter defaults to a single `mcp` proxy tool that searches, describes, and calls everything else. Either way Pi's context stays small no matter how many servers you connect. For the handful of tools you use constantly, promote them: `exposure: "direct"` in the built-in, or `directTools: true` on an adapter server, registers them alongside read, bash, and edit as first-class Pi tools.

## The best MCP servers for Pi

### 1. Parallel MCP

Pi has no built-in web search, so this is the gap most worth closing first. [Parallel MCP](https://parallel.ai/mcp) is a hosted server that needs no account or API key for three tools: `web_search`, which returns ranked results with excerpts dense enough to answer from directly; `web_fetch`, which pulls token-efficient markdown from up to 20 URLs per call, including PDFs and JavaScript-heavy pages; and `web_decisions`, which answers typed questions like a probability or a pick among options. Search and fetch earn constant use, so they're the textbook case for direct exposure:

```bash
pi mcp add parallel --url https://mcp.parallel.ai/mcp --exposure direct
```

```json
{
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp",
      "directTools": true
    }
  }
}
```

For `web_research` and higher limits, use `https://mcp.parallel.ai/mcp?login` as the URL and run `pi mcp login parallel`, or send your API key in an `Authorization` header.

The underlying Search API's advanced mode scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 25 search API products (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. And it fits Pi's zero-cost ethos: we've built a [fully free CLI agent from Pi, Ollama, Gemma 4, and Parallel](https://parallel.ai/blog/free-CLI-agent), with no API bill anywhere in the stack.

**Best for:** current docs, error messages, and library research mid-session, plus reading specific pages without blowing the context window.

Tradeoffs: it's ours, so we're biased. Keyless use runs at lower rate limits with the Search API in fast mode; signing in or adding a key lifts them and bills those calls at the underlying API rates. Signed-in or keyed connections can also pin a search mode or include and exclude domains through an x-parallel-mcp-config header.

### 2. Context7

Context7 serves version-pinned library documentation, which is the cheapest fix for hallucinated APIs in any coding agent. With the built-in, `pi mcp add context7 --url https://mcp.context7.com/mcp` is the whole setup (the hosted server answered without a key when we tested it today); with the adapter, it's one of the curated presets in `/mcp-adapter setup`, so adding it is a menu pick rather than a config edit.

**Best for:** getting the real signature instead of a plausible one.** Tradeoffs:** covers libraries it has indexed; for anything else, web search fills the gap.

### 3. GitHub MCP

GitHub's official server (also a preset in the adapter's setup flow) gives Pi issues, pull requests, and Actions context from its hosted endpoint at `https://api.githubcopilot.com/mcp/`. That said, Pi users tend to be shell-first people, and the gh CLI already does most of this through bash with zero context overhead. Install the MCP server if you want structured tools; stick with gh if you don't.

Best for: structured repo workflows across many repos. Tradeoffs: a big tool surface. Pi's own docs use GitHub as the example for mixing exposures: `deferred` for the server, `direct` for a tool like search_code, `hidden` for anything destructive. Behind the adapter's proxy it's manageable too, but don't promote all of it to directTools.

### 4. Chrome DevTools MCP

The adapter's own quick-start example, and the right browser server for Pi's audience: it attaches to Chrome with DevTools-grade access, so the agent can inspect console errors, network requests, and the DOM of the app you're building. For verifying frontend changes, that beats a generic automation browser.

**Best for:** debugging the running app, not just reading its code.** Tradeoffs:** local process, heavier than an API call, and it can act on whatever Chrome is logged into.

## The skill and extension route: skip MCP entirely

Pi's own answer to "how do I add a tool" is usually "wrap a CLI in a skill" or "install an extension." Both work here. The [Parallel CLI installs as a Pi skill](https://docs.parallel.ai/integrations/cli), the same pattern as our OpenClaw integration, and the [Parallel Pi extension](https://docs.parallel.ai/integrations/pi-extension) (`pi install npm:@parallel-web/pi-extension`) registers web_search, web_fetch, and web_research as native Pi tools once you run `/login parallel`. Skills cost almost nothing in context and compose with pipes and scripts; MCP buys you portability across harnesses, OAuth handling, and per-tool schemas.

## The picks side by side

| Server | What it gives Pi | Setup | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetching, typed decisions | Hosted URL, no key | Free keyless; signed-in calls billed per request |
| Context7 | Version-pinned library docs | pi mcp add or adapter preset | Free tier |
| GitHub MCP | Issues, PRs, Actions | pi mcp add or adapter preset | Free |
| Chrome DevTools MCP | Inspect the running app | Local npx command | Free |
| Parallel CLI or Pi extension (not MCP) | Search, fetch, and research | Pi skill or pi install | Billed per request; free credits to start |

## Frequently asked questions

Does Pi support MCP natively? Yes, since [Pi 0.99](https://pi.dev/changelog/releases/0.99.0) on September 29, 2026. The built-in support connects stdio and Streamable HTTP servers, handles OAuth, and is managed with `pi mcp` in the shell and `/mcp` in a session. pi-mcp-adapter remains an alternative, with lazy server startup and config imports, and it replaces the built-in when installed.

Is MCP the best way to add web search to Pi? It's one of three good ways. Parallel MCP gives you web_search, web_fetch, and web_decisions with no key; the Parallel Pi extension registers native tools, web_research included, once you log in; and the Parallel CLI as a skill gives you the same capability shell-first. MCP wins if you share config across harnesses; the skill wins if you want minimum context overhead.

Can I reuse my MCP config from Claude Code or Cursor? Yes. For the built-in, copy the `mcpServers` entry into `~/.pi/agent/mcp.json`; Pi's docs list the small conversions needed for VS Code, Codex, and OpenCode entries. With pi-mcp-adapter, run `/mcp-adapter setup` and it imports the entries you choose from Cursor, Claude Code, Claude Desktop, Codex, VS Code, Windsurf, and OpenCode v1.

Why do my MCP tools not show up as normal tools? Both routes keep them off the model's tool list by default to protect your context window: the built-in reaches them through codemode or tool_search, and the adapter routes them through one `mcp` proxy tool. Set `exposure: "direct"` (built-in) or `directTools: true` (adapter) on the servers whose tools you want registered directly.

## Try it in one session

Add Parallel with the one-line `pi mcp add` command above, or paste the .mcp.json block if you use the adapter, then run /reload and ask Pi something that needs today's web. You won't be asked for an account, a key, or a card. The [Parallel MCP page](https://parallel.ai/mcp) has the full tool list and setup for other clients. If you later want higher rate limits or `web_research`, [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

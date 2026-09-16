# Does Pi support MCP? The best MCP servers for Pi in 2026

Pi ships without built-in MCP support, and that's deliberate. Here's how to add MCP to the Pi coding agent with pi-mcp-adapter, the four servers worth connecting, and when a Pi skill is the better answer.

[Pi](https://pi.dev/) is the minimal coding harness: a small, hackable agent you adapt to your workflows through extensions, skills, and packages, rather than a product that decides your workflow for you. It's also the harness underneath OpenClaw, which is a large part of why it's everywhere in 2026.

So, the question this article exists to answer: Pi ships with no built-in [Model Context Protocol (MCP)](https://parallel.ai/articles/what-is-mcp) support at all. That's a design decision, not a missing feature. This guide covers what that decision means, how to add MCP when you want it, which servers are worth connecting, and when Pi's native patterns serve you better. Disclosure: we make Parallel, one of the servers recommended below, and we'll show numbers rather than ask for trust.

## Why Pi doesn't ship MCP support

Pi's philosophy is that the harness stays small and everything else is a package. It omits sub-agents, plan mode, and MCP on purpose; as [Armin Ronacher put it in his writeup of Pi](https://lucumr.pocoo.org/2026/1/31/pi), the omission is philosophical, and the ecosystem routes around it in two ways. You can bridge MCP servers to a plain CLI with [mcporter](https://github.com/steipete/mcporter), which is how OpenClaw's lineage handled it, or you can install a Pi extension that speaks MCP natively. In practice the extension route has won: `pi-mcp-adapter` is one of the most-downloaded packages in the Pi registry.

## How to add MCP to Pi

`[pi-mcp-adapter](https://pi.dev/packages/pi-mcp-adapter)` installs like any Pi package and reads the standard MCP config files you may already have: `.mcp.json` in your project, or `~/.config/mcp/mcp.json` for a user-global setup. If your servers currently live in Cursor, Claude Code, Codex, or OpenCode configs, running `/mcp setup` inside Pi detects them and imports the ones you pick, previewing the file changes before writing anything.

```bash
pi install npm:pi-mcp-adapter

# restart Pi, then verify inside a session
/mcp

# optional: import servers from Cursor, Claude Code, Codex, or OpenCode configs
/mcp setup
```

One detail worth understanding before you pick servers: by default the adapter exposes everything through a single mcp proxy tool. The agent searches for tools, reads their descriptions, and calls them through the proxy. That keeps Pi's context small no matter how many servers you connect, which is very much in Pi's spirit. For the handful of tools you use constantly, set `directTools: true` on a server and its tools register alongside read, bash, and edit as first-class Pi tools.

## The best MCP servers for Pi

### 1. Parallel Search MCP

Pi has no built-in web search, so this is the gap most worth closing first. The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is a hosted server, free with no API key, that adds two tools: `web_search`, which returns ranked results with excerpts dense enough to answer from directly, and `web_fetch`, which pulls token-efficient markdown from specific URLs, including PDFs and JavaScript-heavy pages. Because these two earn constant use, they're the textbook case for `directTools`:

```json
{
  "mcpServers": {
    "parallel-search": {
      "url": "https://search.parallel.ai/mcp",
      "directTools": true
    }
  }
}
```

The underlying Search API ranks first on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 15 search API products (August 2026). And it fits Pi's zero-cost ethos: we've built a [fully free CLI agent from Pi, Ollama, Gemma 4, and Parallel](https://parallel.ai/blog/free-CLI-agent), with no API bill anywhere in the stack.

**Best for:** current docs, error messages, and library research mid-session, plus reading specific pages without blowing the context window.

**Tradeoffs:** it's ours, so we're biased. The free tier runs anonymous rate limits and low-latency basic mode; an API key from `platform.parallel.ai` lifts the limits when you outgrow them.

### 2. Context7

Context7 serves version-pinned library documentation, which is the cheapest fix for hallucinated APIs in any coding agent. It's one of the curated known servers in the adapter's `/mcp setup` flow, so adding it is a menu pick rather than a config edit.

**Best for:** getting the real signature instead of a plausible one.** Tradeoffs:** covers libraries it has indexed; for anything else, web search fills the gap.

### 3. GitHub MCP

GitHub's official server (also in the curated setup list) gives Pi issues, pull requests, and Actions context. Worth saying plainly, though: Pi users tend to be shell-first people, and the `gh` CLI already does most of this through bash with zero context overhead. Install the MCP server if you want structured tools and OAuth; stick with `gh` if you don't.

**Best for:** structured repo workflows across many repos.** Tradeoffs:** a big tool surface; behind the adapter's proxy that's manageable, but don't promote all of it to `directTools`.

### 4. Chrome DevTools MCP

The adapter's own quick-start example, and the right browser server for Pi's audience: it attaches to Chrome with DevTools-grade access, so the agent can inspect console errors, network requests, and the DOM of the app you're building. For verifying frontend changes, that beats a generic automation browser.

**Best for:** debugging the running app, not just reading its code.** Tradeoffs:** local process, heavier than an API call, and it can act on whatever Chrome is logged into.

## The skill route: skip MCP entirely

Pi's own answer to "how do I add a tool" is usually "wrap a CLI in a skill." That option exists here too: the [Parallel CLI installs as a Pi skill](https://docs.parallel.ai/integrations/cli), the same pattern as our OpenClaw integration, and gives the agent search, fetching, and research tasks through plain shell commands. Skills cost almost nothing in context and compose with pipes and scripts; MCP buys you portability across harnesses, OAuth handling, and per-tool schemas. Pick per tool, not per ideology.

## The picks side by side

| Server | What it gives Pi | Setup | Cost |
| --- | --- | --- | --- |
| Parallel Search MCP | Web search + page fetching | Hosted URL, no key | Free; API key optional |
| Context7 | Version-pinned library docs | Curated pick in /mcp setup | Free tier |
| GitHub MCP | Issues, PRs, Actions | Curated pick in /mcp setup | Free |
| Chrome DevTools MCP | Inspect the running app | Local npx command | Free |
| Parallel CLI (skill, not MCP) | Search + research via shell | Pi skill install | Free tier; $5/month credit for APIs |

## Frequently asked questions

**Does Pi support MCP natively?** No, and it won't; the maintainers consider it out of scope for a minimal harness. The supported answer is an extension, and `pi-mcp-adapter` has become the standard one.

**Is MCP the best way to add web search to Pi?** It's one of two good ways, and both are free. The Search MCP through the adapter gives you first-class `web_search` and `web_fetch` tools; the Parallel CLI as a skill gives you the same capability shell-first. MCP wins if you share config across harnesses; the skill wins if you want minimum context overhead.

**Can I reuse my MCP config from Claude Code or Cursor?** Yes. Run `/mcp setup` after installing the adapter; it detects host-specific configs from Cursor, Claude Code, Claude Desktop, Codex, and OpenCode and imports the entries you choose.

**Why do my MCP tools not show up as normal tools?** By default the adapter routes everything through one mcp proxy tool to protect your context window. Set `directTools: true` on the servers whose tools you want registered directly.

## Try it in one session

Install the adapter, paste the six-line `.mcp.json` above, restart Pi, and ask it something that needs today's web. You won't be asked for an account, a key, or a card. If you later want higher rate limits or Parallel's research APIs, [a free account](https://platform.parallel.ai/) comes with $5 in credits every month.

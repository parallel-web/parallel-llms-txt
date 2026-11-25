# The best free MCP servers in 2026: 10 picks, and what free actually means

The best MCP servers in 2026 are mostly free to start: a keyless web search server, official hosted servers from GitHub, Notion, and Sentry, and open-source browser tools you run yourself. This guide covers ten free picks sorted by category and by what kind of free they are, how to install an MCP server, remote vs. local, and how to judge whether a server is safe.

"Free [MCP server](https://parallel.ai/learn/model-context-protocol)" hides three different deals, and knowing which one you're getting saves surprises later. Keyless-free means you paste a URL and it works, no account. Free-tier means it's free after signup, within limits. Free-software means the server costs nothing because you run it on your own machine. All three are legitimate, but each fails differently when you scale.

These are the ten servers we'd install, grouped by which kind of free they are. Disclosure: the first one is ours, and we explain exactly what its free tier is and isn't so you can hold us to the same standard as everyone else on the list.

## Best MCP servers by category

If you're scanning for one job, here is where each pick fits (servers checked November 22, 2026):

- Web search and page fetching: Parallel MCP
- Code and repository knowledge: GitHub MCP and DeepWiki
- Library and platform documentation: Context7 and Microsoft Learn MCP
- Browser automation and debugging: Playwright MCP and Chrome DevTools MCP
- Production errors: Sentry MCP
- Team docs, specs, and notes: Notion MCP
- Local files: Filesystem MCP

Database and design servers from Supabase and Figma are good, but we left them off a free list: Figma's Starter plan allows 20 tool calls a month ([Figma's limits](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/)), and Supabase's server runs with your developer permissions on real data, so it needs scoping before you use it. Our [Codex MCP list](https://parallel.ai/articles/best-mcp-servers-for-codex-cli) covers both.

## Keyless and hosted: paste a URL, done

### 1. Parallel MCP (web search, fetch, and research)

https://mcp.parallel.ai/mcp is [free with no API key and no account](https://parallel.ai/mcp): web_search for ranked, LLM-dense results and web_fetch for clean markdown from any URL, running on [Parallel's Search API](https://parallel.ai/products/search). That API ranks #1 on the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (November 2026 data): advanced mode scores 83 across 26 search API products, and fast mode 82. The same server adds web_decisions for typed questions with no key, and web_research, which answers one research question with citations in the same call, once you sign in at https://mcp.parallel.ai/mcp?login or send an API key. Free here means anonymous rate limits suited to personal and hobbyist use, with nothing billed when you hit them. Production scale needs an account, which comes with up to $80 in free credits plus $5 a month with a card on file; signed-in calls bill at Search API rates. [Parallel MCP](https://parallel.ai/mcp) has one-click installs for Claude, ChatGPT, Cursor, VS Code, and more.

The same endpoint also serves image_search, which returns image URLs with their source pages; without sign-in it runs in fast mode at no cost.

### 2. DeepWiki (open-source repo docs)

DeepWiki's hosted MCP answers questions about public GitHub repositories from generated documentation, keyless. It's one of the curated defaults in several harness setup flows, and for "how does this library actually work inside" questions it beats searching.

### 3. Microsoft Learn MCP (Microsoft and Azure docs)

Microsoft runs a hosted server at `https://learn.microsoft.com/api/mcp` that searches its official documentation, fetches full articles, and searches code samples. Per Microsoft's [overview](https://learn.microsoft.com/en-us/training/support/mcp), it needs no authentication, costs nothing, and its index gets a full refresh once a day. If you build on Azure, .NET, or Microsoft 365, it keeps the agent on the current docs instead of whatever it remembers from training.

## Free tier with an account

### 4. GitHub MCP

GitHub's official hosted server is free with any GitHub account over OAuth: issues, pull requests, code search, Actions logs. The real cost is context: it registers many tools, so scope its toolsets to what you use.

### 5. Context7 (library docs)

Version-pinned library documentation on demand, the standard cure for hallucinated APIs, with a free tier that covers individual development comfortably. Arguably the highest-impact free install for any coding agent after web search.

### 6. Sentry MCP

Hosted, OAuth-secured access to your errors and traces, free with Sentry's developer tier, which lists MCP access among its features ([Sentry pricing](https://sentry.io/pricing/), checked November 22, 2026). Only relevant if you use Sentry, but if you do, letting the agent read the actual stack trace is a permanent upgrade to debugging sessions.

### 7. Notion MCP (docs and notes)

Notion's hosted server at `https://mcp.notion.com/mcp` lets an agent search, read, create, and update the pages and databases your account can reach, after an OAuth sign-in. [Notion's developer docs](https://developers.notion.com/guides/mcp/get-started-with-mcp) say it works on every plan, Free included; Business and Enterprise add more search filters, higher request limits, and a few extra tools.

It's the one pick here that pays off outside engineering. Specs, meeting notes, and team wikis become context the agent reads directly. Keep in mind that the tools act with your full Notion permissions, so a workspace with sensitive pages deserves a dedicated account.

## Free software you run locally

### 8. Playwright MCP (browser automation)

Microsoft's open-source server gives your agent a real browser: navigate, click, fill, screenshot. Among the most-installed MCP servers in the community, completely free, and local by nature since the browser runs on your machine.

### 9. Chrome DevTools MCP (browser debugging)

The Chrome DevTools team's open-source server connects an agent to a live Chrome session with DevTools-level access: console messages, network requests, and performance traces. Where Playwright is built for clicking through flows, this one is built for finding out why a page is slow or which request failed. Add `npx -y chrome-devtools-mcp@latest` as a local command in any client; it needs Node.js LTS and a current Chrome ([README](https://github.com/ChromeDevTools/chrome-devtools-mcp)).

### 10. Filesystem MCP (reference server)

The official reference server for scoped file access: you pass the directories it may see as launch arguments, and nothing else is reachable. Free, tiny, and mostly useful in harnesses that don't already sandbox project files themselves.

## The list at a glance

| Server | What it does | Kind of free | Catch |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetching, decisions, research, image search | Keyless, hosted | Anonymous rate limits; sign-in for research and scale |
| DeepWiki | Answers about public repos | Keyless, hosted | Public repos only |
| Microsoft Learn MCP | Microsoft docs and code samples | Keyless, hosted | Microsoft docs only |
| GitHub MCP | Repos, PRs, Actions | Free with account (OAuth) | Heavy tool surface |
| Context7 | Version-pinned library docs | Free tier with account | Indexed libraries only |
| Sentry MCP | Errors and traces | Free with Sentry tier | Only useful with Sentry |
| Notion MCP | Pages, databases, notes | Free on every Notion plan | Acts with your full Notion permissions |
| Playwright MCP | Real browser control | Free software, local | Heavier than API calls |
| Chrome DevTools MCP | Console, network, and performance inspection | Free software, local | Needs Node.js and Chrome |
| Filesystem MCP | Scoped file access | Free software, local | Often redundant in modern harnesses |

## How to install an MCP server

Every client takes one of two kinds of entry: a URL for a hosted server, or a launch command for a local one. Only the syntax changes between clients:

| Client | Hosted server | Local server |
| --- | --- | --- |
| Claude Code | claude mcp add --transport http <name> <url> | claude mcp add <name> -- <command> |
| Codex | codex mcp add <name> --url <url> | codex mcp add <name> -- <command> |
| Cursor | A "url" entry in mcp.json | "command" and "args" in mcp.json |
| Claude and ChatGPT apps | Connector or plugin settings | Desktop app settings or config file |

Restart the client after adding a server, then check its server list to confirm the tools loaded. Our client guides have verified commands for every server above: [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code), [Codex](https://parallel.ai/articles/best-mcp-servers-for-codex-cli), and [Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor).

## Remote vs. local MCP servers

The three groups above map onto MCP's two transports. Remote servers (Parallel, DeepWiki, Microsoft Learn, GitHub, Sentry, Notion) run on the vendor's infrastructure over Streamable HTTP: you connect with a URL and usually an OAuth sign-in, updates arrive without you doing anything, and nothing executes on your machine.

Local servers (Playwright, Chrome DevTools, Filesystem) are programs your client launches as a subprocess and talks to over stdio. They can reach your files, your browser, and your network, which is the point, and the compute is yours, so they cost nothing to run. Context7 ships both ways.

A rule that holds up: remote for third-party services, local for anything that has to touch your machine. [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) goes further into latency, auth, and failure modes.

## Are MCP servers safe?

An MCP server can do whatever its credentials allow, and its tool descriptions go straight into the model's context. The [MCP specification's security best practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices) and [OWASP's MCP security cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html) describe the main risks: tool poisoning (instructions hidden in a tool's description), prompt injection through content a server returns, over-scoped tokens, and local servers running with full access to the host.

Four habits cover most of it:

- Start from the vendor's own docs or the [MCP Registry](https://registry.modelcontextprotocol.io/), which lists published servers, before you reach for a random repository.
- Give each server its own least-privilege credential. Several picks offer a narrower mode: Linear's read-only endpoint, Supabase's read_only flag, GitHub's fine-grained tokens.
- Keep write tools behind your client's approval prompt.
- Disconnect servers you've stopped using, since every connected server adds tool definitions to each turn.

## What didn't make the list, and why

Firecrawl's keyless tier is real but its daily limits are shared across everyone on your public IP, so on an office network or CI runner it can be exhausted before you touch it. Exa's free plan covers casual use and is a fine trial, though its stronger tools require auth. Both are covered properly in our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp). Across the whole category, thousands of free community servers exist, many abandoned or worse, so favor official servers from the vendor whose service they wrap, and read the source of anything unofficial before running it.

## Frequently asked questions

**Can I build a fully free agent stack?** Yes. A local model, a free harness, and the keyless servers above run end to end with no bill; we've published [a working example](https://parallel.ai/blog/free-CLI-agent) built on Pi, Ollama, Gemma, and Parallel.

**Why do vendors give MCP access away?** The unflattering answer, ours included: free tiers are how developer tools earn evaluation, and rate limits keep the economics sane. Judge a free tier by whether its limits fit your use.

**How many should I install?** Three to six total, free or not. Every connected server spends context on every turn.

**What is an MCP server?** A program that exposes tools and data to an AI client over the [Model Context Protocol](https://parallel.ai/learn/model-context-protocol), so the agent can call a search engine, a repository, or a browser without custom integration code. Our explainer on [what an MCP server is](https://parallel.ai/learn/mcp-server) covers how clients discover and call them.

**Where can I find more MCP servers?** The MCP Registry lists published servers, and the steering group's [reference servers repository](https://github.com/modelcontextprotocol/servers) keeps a small set of reference implementations such as Filesystem, Fetch, Git, and Memory. Community "awesome" lists are larger, but they don't mark which projects are abandoned.

**What are the best MCP servers for coding?** Start with Parallel MCP, Context7, GitHub, and Playwright, then add Sentry or Chrome DevTools when debugging calls for them. For search specifically, our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp) tests the main options side by side.

## Start with the keyless two

Add [Parallel MCP](https://parallel.ai/mcp) (`https://mcp.parallel.ai/mcp`) and DeepWiki, neither of which asks for an account, and see what your agent does with a live web and real library internals. Add the account-gated ones only when a task actually calls for them.

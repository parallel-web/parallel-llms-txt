# Remote vs. local MCP servers: which should your agent use?

MCP servers come in two shapes: local stdio processes your harness spawns, and remote Streamable HTTP endpoints it connects to. The choice affects setup, security, credentials, and where your agent can run. This guide covers what each type is, the differences that matter, a rule for choosing, and security notes for both.

Every [MCP server](https://parallel.ai/articles/what-is-mcp) you add to an agent is one of two things: a local process your harness spawns and talks to over stdio, or a remote endpoint it connects to over Streamable HTTP. The protocol is the same; almost everything operational about them differs. Picking wrong costs you either capability (a remote server can't touch your filesystem) or maintenance (a local server is another dependency to install, update, and secure on every machine).

## What each one is

**Local (stdio) servers** are programs on your machine, typically launched as `npx` or docker commands in your config. The harness starts the process and pipes JSON-RPC through stdin/stdout. Because they run as you, they can do anything you can: read files, drive a browser, run kubectl. The reference filesystem server, Playwright, and Chrome DevTools are the canonical examples.

**Remote (Streamable HTTP) servers** are hosted endpoints, a URL in your config and nothing to install. The vendor runs the code, ships updates without you reinstalling anything, and handles auth server-side: anonymous access, a Bearer API key, or a full OAuth 2.1 flow where the harness pops a browser and manages tokens for you. By 2026 most major services publish one: GitHub, Linear, Notion, Sentry, Stripe, and the web-data providers including Parallel.

## The differences that matter

|  | Local (stdio) | Remote (HTTP) |
| --- | --- | --- |
| Setup | Install runtime + package per machine | Paste a URL |
| Updates | You reinstall/upgrade | Vendor ships them invisibly |
| Machine access | Full (files, browser, shell) | None |
| Credentials | Env vars in your config | OAuth or Bearer, often none at all |
| Works in CI / cloud agents | Only if the image includes it | Yes, it's just HTTPS |
| Supply-chain risk | You run the code locally | You trust the endpoint |
| Data path | Stays on-machine (usually) | Goes to the vendor |

Headless environments show the biggest difference: cloud coding agents, CI jobs, and scheduled runs can use any remote server trivially, while every local server is a Dockerfile change, which is why remote became the 2026 default for anything that can be remote. Credentials differ too: a local server wants an API key in an environment variable; a remote server with OAuth never shows your harness a long-lived secret at all, and one with anonymous access needs nothing.

A few clients still speak only stdio (Zed, Warp, and Raycast among them). The standard bridge is the `mcp-remote` package, which wraps any remote URL in a local stdio process, so remote servers remain usable everywhere even when the client hasn't caught up.

## The decision rule

If the tool needs your machine (browsers, files, local databases, dev servers), it must be local. For everything else, choose remote and take the zero-install, auto-update, works-in-CI bundle. The exceptions run the other way only when data governance demands it: a team that can't send queries to a vendor runs the self-hosted or local variant and accepts the maintenance.

Web search is the cleanest case for remote: the index lives in the cloud regardless, so a local server would just be a proxy you have to maintain. It's why we ship the [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) as a hosted endpoint with three auth rungs: anonymous and free at `https://search.parallel.ai/mcp`, a Bearer API key for higher limits, and an OAuth endpoint (`/mcp-oauth`) for teams that need every request attributed to an account, for example under zero-data-retention agreements.

## Security notes for each

**For local servers:** you are executing someone's code with your permissions, so vet the package like any dependency, pin versions, and scope what you can (the filesystem server takes explicit directory arguments; give it the narrowest set that works).

**For remote servers:** you are evaluating the vendor: who sees the data, what's retained, is there SOC 2 or zero-data-retention on offer, and does the endpoint support OAuth so you can revoke access centrally? Prefer vendors that publish answers; ours are on the pricing and terms pages.

## Frequently asked questions

**Is remote slower?** There's a network hop, but for tools that call the internet anyway (search, SaaS APIs) the hop exists regardless of where the MCP process runs. Only machine-local tools see a real difference, and those should be local anyway.

**Can one server offer both modes?** Yes, and several do: Firecrawl ships an npm package alongside its hosted endpoint, and open-source servers often can be self-hosted as remote endpoints.

**What transport should I write a new server for?** Streamable HTTP for anything hosted; stdio only for machine-local capabilities. The spec supports both, and clients now expect remote-first.

## Try the remote path in one minute

Paste `https://search.parallel.ai/mcp` into any MCP client and you get the remote-server experience described above: no install, no key, tools available immediately. For how it compares to the other hosted search options, see our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp).

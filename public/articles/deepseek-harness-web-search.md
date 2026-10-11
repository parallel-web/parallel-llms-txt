# How to add better web search to DeepSeek Harness: plugins and MCP setup

DeepSeek Harness web search works from the first launch, but the default tool spends a full DeepSeek model call on every search and needs DeepSeek credentials, so it's worth knowing the alternatives. This guide covers the built-in providers, the main community search plugins, a tested setup for Parallel's free Search MCP, and how to add an API key for higher limits.

DeepSeek open-sourced [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) under the MIT license on August 13, 2026. It’s an agent harness built on Cordis, where every capability, from the model route to the file tools, is a plugin you can swap. The shipped profiles give the model a `web_search` tool backed by the `@deepseek-ai/dsh-web-search-deepseek` provider. Per [that package’s README](https://github.com/deepseek-ai/deepseek-harness/blob/main/packages/web/web-search-deepseek/README.md), each search is a full auxiliary Messages call to a DeepSeek model, with up to five server-side searches per request, and it needs either a DeepSeek account sign-in or a `DEEPSEEK_API_KEY`. The companion `web_fetch` tool downloads public pages anonymously over HTTP.

dsh is a developer preview, and the README warns that compatibility-breaking changes are coming. Everything below was tested on `@deepseek-ai/dsh@0.2.0-rc.2`, the `latest` tag on npm as of October 10, 2026.

## Three ways to give DeepSeek Harness web search

### The built-in web_search tool

The `web` service picks one search provider and one fetch provider. The repo ships three search providers: DeepSeek native search (the default, id `deepseek-official`), Exa, and Perplexity. The Exa and Perplexity providers read `EXA_API_KEY` and `PERPLEXITY_API_KEY` and are published to npm, but the shipped profiles don’t mount them, so you’d add them as patch rows yourself. The upside of the built-in route is that the model sees one stable `web_search` tool no matter which backend sits behind it.

The tradeoff with the default is cost and latency. DeepSeek exposes no dedicated search endpoint, so the provider README tells you to “expect one Messages call’s latency and generated tokens per search” and to avoid it “when per-search cost or latency dominates.” If you route chat through another provider, search still needs DeepSeek credentials.

### Community search plugins

Plugins install into a profile with `dsh plugin`, which forwards to pnpm. Three search plugins stand out on the [`dsh-plugin` GitHub topic](https://github.com/topics/dsh-plugin):

- **[ModSearch](https://github.com/liustack/modsearch)** (`@liustack/modsearch`, v5.10.6) calls itself “the strongest free web search plugin for DeepSeek Harness.” It defaults to Firecrawl’s keyless tier, which its README puts at 1,000 free credits a month, and fails over to Antigravity CLI, Tavily, Exa, Grok for X search, and a local engine.
- **[dsh-free-search](https://github.com/DDDMUC/dsh-free-search)** (v0.8.5) registers a provider on the same `ctx.web` seam and takes over `web_search` at runtime. It defaults to Bing and can fall back across more than 20 engines, including DuckDuckGo, SearXNG, Exa, Tavily, and Parallel’s anonymous MCP tier.
- **[AnySearch for DSH](https://github.com/anysearch-team/anysearch-dsh)** (`@anysearch/anysearch-dsh`, v0.1.8) replaces both the search and fetch providers and adds three AnySearch-specific tools. It runs on an anonymous quota, or 1,000 free calls a day with a key, according to its README.

Plugins are the right call when you want to keep the native `web_search` tool name, want automatic failover across engines, or need sources like X. They also run third-party code in-process inside the harness, so read the source before you install one.

### An MCP server

`@deepseek-ai/dsh-mcp-client` ships with dsh and connects any MCP server over stdio or Streamable HTTP. No server is enabled by default. Each server’s tools show up as `mcp__<serverName>__<tool>`, the same naming shape Claude Code and Codex use, and the server’s own instructions join the system prompt. An MCP server needs no plugin install and runs no third-party code in the harness process, and the same server works in every other MCP client you use.

|  | Built-in (DeepSeek native) | Community plugin | Parallel Search MCP |
| --- | --- | --- | --- |
| What backs search | A DeepSeek model call with server-side search | Firecrawl, Bing, AnySearch, or others, per plugin | Parallel’s search index |
| Credentials | DeepSeek account or DEEPSEEK_API_KEY | Varies; most have a keyless tier | None; optional Parallel API key |
| Setup | Already on | dsh plugin add, then restart | One YAML row |
| Code in the harness process | DeepSeek’s provider | Third-party plugin code | None; dsh’s own MCP client |
| Tools the model sees | web_search, web_fetch | web_search, web_fetch, plus plugin extras | mcp__parallel__web_search, mcp__parallel__web_fetch |
| Page reading | One URL per web_fetch call | Varies by plugin | Up to 20 URLs per web_fetch call |
| Cost per search | One model turn of tokens | Free tiers, then each vendor’s pricing | Free at anonymous rate limits; Search API rates with a key |

## Add Parallel’s free Search MCP to DeepSeek Harness

We make Parallel, so weigh our recommendation accordingly. The [Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) runs at `https://search.parallel.ai/mcp` over Streamable HTTP and needs no account or API key. It exposes two tools. `web_search` takes a natural-language `objective` plus a list of keyword `search_queries` and returns ranked URLs with excerpts. `web_fetch` takes up to 20 URLs and returns excerpts focused on an objective, or full page content when the model asks for it. Results are capped at about 25,000 characters per call.

### Step 1: Write the overlay

dsh composes its configuration from YAML patch layers. Save this as `parallel-search.cordis.yml`:

```yaml
# Parallel Search MCP for DeepSeek Harness (free, no API key)
- insert:
    - id: mcp-parallel-search
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: parallel
        transport: streamable-http
        url: https://search.parallel.ai/mcp
```

The `serverName` becomes the tool prefix, so this row produces `mcp__parallel__web_search` and `mcp__parallel__web_fetch`. It must match `[A-Za-z0-9_-]{1,32}`.

### Step 2: Launch dsh with the overlay

Pass the file with `--patch`. Put launcher flags like `--patch` before app flags like `--no-open`: in our test, `dsh web --no-open --patch ...` failed with `unknown option '--patch'`, while this order worked:

```bash
npx @deepseek-ai/dsh@0.2.0-rc.2 web --patch "$PWD/parallel-search.cordis.yml"

# Or answer one task from the terminal
npx @deepseek-ai/dsh@0.2.0-rc.2 headless --patch "$PWD/parallel-search.cordis.yml" \
  "What changed in the latest DeepSeek Harness release? Use the Parallel search tools."
```

To keep the server across runs, copy the `- insert:` block into your profile’s patch layer at `$DSH_HOME/profiles/web/cordis.patch.yml` (`DSH_HOME` defaults to `~/.dsh`). A new profile’s file contains only `[]`, so replace that line rather than appending under it. For every profile on the machine, use `$DSH_HOME/cordis.patch.yml` instead. Don’t overwrite either file if it already holds other patches; merge your block in.

### Step 3: Confirm the tools were discovered

The MCP client connects and lists tools before the first turn. You can confirm the overlay is part of the composed config without starting a session:

```bash
npx @deepseek-ai/dsh@0.2.0-rc.2 web --patch "$PWD/parallel-search.cordis.yml" --dump-config | grep -A4 mcp-parallel-search
```

We ran dsh 0.2.0-rc.2 in an isolated `HOME` and `DSH_HOME` on macOS with Node 22.23 and no DeepSeek key. The headless run stopped at the model call with `MISSING_CREDENTIAL`, but by then the request header in the session log already listed every tool dsh had registered:

```text
bash, edit, glob, grep, read, write, ...
list_mcp_resources, list_mcp_resource_templates, read_mcp_resource,
mcp__parallel__web_fetch, mcp__parallel__web_search,
web_fetch, web_search
```

The system message also carried a `### MCP server: parallel` section holding the server’s usage instructions, so the model knows when to search and when to fetch. Calling the same endpoint directly, a two-query `web_search` came back in 0.77 seconds, and the response metadata reported a usage cost of $0.001 for that search. Because we had no DeepSeek key, we didn’t watch a DeepSeek model call the tools end to end. In the Web UI, wait until the `mcp__parallel__` tools appear before your first prompt, then ask a question that needs fresh information and check that the trajectory shows `mcp__parallel__web_search`.

### Step 4 (optional): Turn off the built-in web_search

Both search tools stay registered side by side. If you don’t have DeepSeek credentials, the built-in tool will fail when the model picks it. In the headless profile, this patch removed `web_search` and kept `web_fetch` in our test:

```yaml
- id: tool-web
  config:
    search: false
    fetch: true
    searchTimeoutMs: 60000
```

An id-targeted patch replaces the whole config of that row, so restate every field you want to keep. The Web profile mounts `tool-web` inside each agent preset rather than at the top level, so this top-level patch doesn’t reach it; there, tell the model to prefer the Parallel tools in your instructions instead.

## Add a Parallel API key for higher limits

Anonymous calls run in Fast mode at shared rate limits. For steadier throughput, create a key at [platform.parallel.ai](https://platform.parallel.ai) and send it as a bearer token. dsh evaluates `!!js` expressions in config, so the key stays out of the YAML:

```yaml
- insert:
    - id: mcp-parallel-search
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: parallel
        transport: streamable-http
        url: https://search.parallel.ai/mcp
        headers: !!js >-
          process.env.PARALLEL_API_KEY
            ? { Authorization: `Bearer ${process.env.PARALLEL_API_KEY}` }
            : {}
```

Export `PARALLEL_API_KEY` in your shell, or put `PARALLEL_API_KEY=...` in `$DSH_HOME/.env`; dsh loaded it from that file in our test. The conditional sends no header when the variable is unset, so the server falls back to anonymous access. A one-line header that interpolates the variable directly also works, but when the variable is missing it sends `Bearer undefined`, and the server rejects that.

Keyed calls bill at Search API rates. Per the [Search modes docs](https://docs.parallel.ai/search/modes), Fast costs $1 per 1,000 requests and Basic and Advanced cost $5 per 1,000. With a key you can pin the mode for every call on the connection, for example `https://search.parallel.ai/mcp?mode=fast`, or send the same settings in an `x-parallel-search-config` header. The server ignores those settings on anonymous calls, which always run in Fast mode.

## Troubleshooting

- **The Parallel tools don’t appear.** A bad or missing key makes the server return 401, and dsh starts anyway with no `mcp__parallel__` tools. In our tests, nothing was printed to stderr when that happened. Set `failOnStartupError: true` in the row’s `config` while you debug so the failure is loud.
- **`unknown option '--patch'`.** Move `--patch` ahead of app flags such as `--no-open` or `--port`.
- **Tools vanish mid-session.** dsh retries a dropped connection with backoff from 500 ms to 30 s and removes the tools after 10 consecutive failures. Restart dsh or reload the config to reconnect.
- **Calls time out.** The default per-call timeout is 60,000 ms. Raise it with `toolCallTimeoutMs` in the row’s `config`.

## Other plugins worth knowing

We haven’t tested these, so treat them as leads. [dsh-mcp](https://github.com/ArvinQi/dsh-mcp) (npm `dsh-mcp`, v1.13.0) adds a Settings page for adding, testing, and toggling MCP servers, plus a tool-search mode that loads tools on demand. Its README says it was built and checked against dsh 0.1.6-alpha.2, so check compatibility before using it on 0.2. [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) is a curated list if you want to browse the wider ecosystem.

## Frequently asked questions

### Does DeepSeek Harness have built-in web search?

Yes. dsh ships `web_search` and `web_fetch` tools, and the default search provider runs DeepSeek’s native search as a full auxiliary model call. It needs a DeepSeek account sign-in or a `DEEPSEEK_API_KEY`, and each search costs one model turn of tokens and latency.

### Does DeepSeek Harness support MCP?

Yes. The bundled `@deepseek-ai/dsh-mcp-client` plugin connects MCP servers over stdio or Streamable HTTP, with optional request headers. You add one YAML row per server, and its tools appear as `mcp__<serverName>__<tool>`.

### Where does dsh store MCP server configuration?

In YAML patch layers. Use `$DSH_HOME/profiles/<profile>/cordis.patch.yml` for one profile or `$DSH_HOME/cordis.patch.yml` for all profiles, with `DSH_HOME` defaulting to `~/.dsh`. You can also pass a one-off file with `--patch`.

### Is Parallel’s Search MCP free in DeepSeek Harness?

Yes. `https://search.parallel.ai/mcp` works with no account or API key at anonymous rate limits. Adding a Parallel API key as a bearer header raises those limits.

### Should I use a search plugin or an MCP server in dsh?

Use a plugin if you want the native `web_search` tool name, multi-engine failover, or sources like X. Use an MCP server if you want one config row, no third-party code inside the harness, and a server you can reuse in other agents.

## Get started

Save the overlay above, run `npx @deepseek-ai/dsh@0.2.0-rc.2 web --patch "$PWD/parallel-search.cordis.yml"`, and ask your agent something that happened this week. For background on how MCP search servers work, read [What is a web search MCP?](https://parallel.ai/articles/what-is-a-web-search-mcp), and for other free options, see [the best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp).

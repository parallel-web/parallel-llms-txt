# How to get better web search in Hermes Agent with Parallel’s free Search MCP

Hermes Agent can search the web with no setup, but its keyless default rotates between providers and hands each a single query string, so you can get more out of every search by choosing the tool yourself. This guide covers adding Parallel’s free Search MCP with three lines of config.yaml, testing it, using it from chat and messaging platforms, and when to add an API key or switch to Hermes’s built-in Parallel backend.

Hermes Agent, the open-source agent from Nous Research, ships a built-in web toolset with `web_search` and `web_extract` tools. On a fresh install with no search credentials, those tools rotate across the free tiers of four vendors (Exa, Parallel, Firecrawl, and Keenable), so the agent can search from its first chat. Hermes also speaks the Model Context Protocol (MCP), which means you can connect a search server directly and give the model that server’s own tools.

## Why connect the Search MCP directly

Hermes’s keyless Parallel route already calls the same endpoint, `https://mcp.parallel.ai/mcp`, but it sends that endpoint less. In Hermes’s [keyless adapter](https://github.com/NousResearch/hermes-agent/blob/main/plugins/web/keyless_mcp.py), the agent’s single query string becomes both the objective and the only keyword query. Connect the server yourself and the model fills in the full `web_search` schema: a natural-language objective plus several keyword queries, which Parallel uses to pick the excerpts it returns.

Here’s a real call from our test. We asked Hermes what shipped in the latest release, and it sent this to the Search MCP:

```json
{
  "objective": "Find the most recent Nous Research Hermes Agent release and what it shipped",
  "search_queries": [
    "Nous Research Hermes Agent latest release",
    "Nous Research Hermes Agent new features 2026",
    "Hermes Agent release notes Nous Research"
  ]
}
```

You also get one provider on every call instead of a rotation, so results don’t change character from one session to the next. And you get `web_fetch`, which reads up to 20 URLs per call and returns excerpts focused on an objective, or the full page as markdown when the model asks for it.

|  | Built-in web toolset (keyless) | Parallel Search MCP |
| --- | --- | --- |
| Setup | None | Three lines in config.yaml |
| Provider | Rotates across Exa, Parallel, Firecrawl, and Keenable | Parallel on every call |
| What the model sends | One query string | An objective plus one or more keyword queries |
| Page reading | web_extract | web_fetch, up to 20 URLs per call |
| Tool names in Hermes | web_search, web_extract | mcp_parallel_search_web_search, mcp_parallel_search_web_fetch |
| Cost | Free, at each vendor’s rate limits | Free without a key; add a key for higher limits |

## Before you start

You need Hermes Agent installed. On macOS, Linux, or WSL2, the [official installer](https://hermes-agent.nousresearch.com/docs/getting-started/installation) is one line:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Install from hermes-agent.nousresearch.com or the [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) repository. Several “one-click installer” repositories on GitHub use the Hermes name but aren’t published by Nous Research.

You don’t need a Parallel account. We ran every step below on October 10, 2026, with Hermes Agent v0.17, and checked each config key against the current Hermes docs for v0.21.

## Step 1: add the server to config.yaml

Hermes reads MCP servers from `~/.hermes/config.yaml`. Add this block, or add the `parallel_search` entry under your existing `mcp_servers` key:

```yaml
mcp_servers:
  parallel_search:
    url: "https://mcp.parallel.ai/mcp"
    timeout: 120
```

The key you choose, `parallel_search` here, becomes part of every tool name. Hermes prefixes MCP tools as `mcp_<server>_<tool>`, so this entry registers `mcp_parallel_search_web_search` and `mcp_parallel_search_web_fetch`. The `timeout` value caps each tool call in seconds and is optional.

You can also use the CLI:

```bash
hermes mcp add parallel_search --url https://mcp.parallel.ai/mcp
```

In our test, the command asked whether the server requires authentication. Answer `n`, since the free endpoint takes no key, then press Enter to enable both tools.

## Step 2: test the connection

Before you open a chat, confirm that Hermes can reach the server and list its tools:

```bash
hermes mcp test parallel_search
```

Our run returned:

```text
Testing 'parallel_search'...
Transport: HTTP → https://mcp.parallel.ai/mcp
Auth: none
✓ Connected (396ms)
✓ Tools discovered: 2

  web_search    Purpose: Perform web searches and return LLM-friendly r...
  web_fetch     Purpose: Fetch and extract relevant content from specif...
```

## Step 3: search from a chat

A new session discovers the server at startup. If Hermes is already running, type `/reload-mcp` to load it without restarting. Then ask something recent enough to fall after your model’s training cutoff:

```bash
hermes chat -q "What changed in the latest Hermes Agent release? Search the web and cite your sources."
```

You don’t have to name the tool. Hermes sees `mcp_parallel_search_web_search` in its tool list and calls it when a question needs the web. In our test, the search call came back in 0.7 seconds.

Hermes registers each MCP server as its own toolset, named after the config key, so you can run a session where the Search MCP is the only web tool:

```bash
hermes chat -t "parallel_search,terminal"
```

To make that permanent for a platform, run `hermes tools` and turn off the built-in web toolset there. The MCP tools stay available because they come from `mcp_servers`, not from that toolset.

## Use it from Telegram, Discord, and Slack

The MCP server works on every surface Hermes runs on, not only the CLI. A running messaging gateway (`hermes gateway run`) watches `config.yaml` and connects a newly added `mcp_servers` entry within about a minute, so you can add the block above and keep the gateway running. Ask from your Telegram or Discord chat and the agent searches through Parallel the same way.

Hermes also wraps MCP results in an untrusted-content block and tells the model to treat them as data rather than instructions. Web pages can carry prompt injection, so that wrapper matters. If you give one agent both open web search and write access to email, shell, or production systems, keep approvals on for the write tools.

## Add an API key for higher limits

The free endpoint runs searches in Parallel’s `fast` mode at anonymous rate limits, which is enough for personal use. For a gateway that serves a team, or a scheduled job that searches all day, create a key on the [Parallel Platform](https://platform.parallel.ai) and store it in `~/.hermes/.env`:

```bash
PARALLEL_API_KEY=your-parallel-key
```

Then reference it from the server entry. Hermes resolves `${VAR}` placeholders in headers from your environment, so the key never sits in config.yaml:

```yaml
mcp_servers:
  parallel_search:
    url: "https://mcp.parallel.ai/mcp"
    timeout: 120
    headers:
      Authorization: "Bearer ${PARALLEL_API_KEY}"
```

With a key, you can also pin Search API settings for every call through the connection, such as a different [search mode](https://docs.parallel.ai/search/modes) or a source policy, by adding query parameters to the URL (for example `?mode=basic`). Parallel ignores those overrides on anonymous requests. Keyed calls bill against your account at Search API rates; see [pricing](https://parallel.ai/pricing).

## MCP or the built-in Parallel backend?

Hermes can also use Parallel as its native web backend. Set `web.backend: parallel` in config.yaml, or pick Parallel in `hermes tools`, and the built-in `web_search` and `web_extract` tools route through Parallel instead of rotating. The `hermes tools` menu can pin Parallel’s free tier so the route stays keyless even after you add a key elsewhere.

Choose the native backend if you want Hermes’s own tool names and its long-page handling for `web_extract`. Choose the MCP server if you want the model to write objectives and multiple queries, the same Parallel setup you use in Claude Code or Cursor, or a clean way to restrict a session to one search provider. You can run both: Hermes keeps the built-in tools and the MCP tools under different names.

## Troubleshooting

**The tools don’t appear.** Run `hermes mcp test parallel_search` first. If it connects, start a new session or run `/reload-mcp`, since a running session keeps the tool set it started with. Hermes also writes a startup line to `agent.log` naming every server that failed to register and why.

**You get a 401.** The `/mcp` endpoint accepts anonymous requests. A 401 means you’re pointing at `https://mcp.parallel.ai/mcp?login`, which requires a key or OAuth, or your Bearer header holds an invalid key.

**You hit rate limits.** Anonymous requests get lower rate limits than keyed ones. Add an API key as shown above.

**Searches time out.** Raise `timeout` on the server entry, or set `connect_timeout` if the first connection is slow on your network.

## Frequently asked questions

### Is web search in Hermes Agent free?

Yes. With no credentials, Hermes’s built-in web tools rotate across the free tiers of Exa, Parallel, Firecrawl, and Keenable. Parallel’s Search MCP is also free without an API key, at lower rate limits than keyed use.

### Do I need a Nous Portal subscription for web search?

No. A paid Nous Portal subscription adds managed web search through the Tool Gateway, but the keyless tiers and the Parallel Search MCP both work without one.

### Does the Search MCP work with any model in Hermes?

Yes. The server exposes standard MCP tools, so it works with any model provider you configure in Hermes that supports tool calling.

### Can I use OAuth instead of an API key?

Parallel serves an OAuth-capable endpoint at `https://mcp.parallel.ai/mcp?login`, and Hermes supports OAuth for remote MCP servers with `auth: oauth` on the server entry. For a single machine, the Bearer key in `~/.hermes/.env` is simpler.

### What’s the difference between web_search and web_fetch?

`web_search` takes an objective and keyword queries and returns ranked results with excerpts, often enough to answer without opening a page. `web_fetch` takes specific URLs and returns their relevant content, or the full page when the model asks for it.

## Get started

Add the three-line block to `~/.hermes/config.yaml`, run `hermes mcp test parallel_search`, and ask Hermes something that happened this week. For more servers worth adding, see [The best MCP servers for Hermes Agent](https://parallel.ai/articles/best-mcp-servers-for-hermes-agent). For the keyless options across other clients, see [Best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp).

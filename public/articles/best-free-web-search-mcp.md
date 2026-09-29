# Best free web search MCP servers for Claude, Cursor, and OpenClaw (2026)

A free web search MCP server gives Claude Code, Claude Desktop, Cursor, or OpenClaw live web access without a bill, but “free” means a different deal at almost every vendor. This guide covers the three kinds of free, eight servers ranked by what you can use at $0, the built-in tools they compete with, and exact Parallel Search MCP config for each client.

We tested the claim before writing it down. On September 28, 2026 we sent raw JSON-RPC requests to `https://search.parallel.ai/mcp` with no account, no key, and no auth header: `initialize`, then `tools/list`, then a `web_search` call. All three returned HTTP 200, and the search came back in 0.8 seconds with ten ranked results. That’s the bar for this list. Every server below either works for you at $0 today or tells you exactly what you have to hand over first.

## Three kinds of free

Vendors use one word for three different arrangements, and each one breaks in its own way.

**Keyless** means you paste a server URL into your client and it works, with no account. The vendor protects itself with anonymous rate limits, which it usually doesn’t publish as a number.

**A free tier with a signup key** means you create an account, copy a key, and get a fixed quota counted in requests, credits, or tokens. When the quota runs out, requests stop until the reset. Tavily’s pricing page says so directly.

**Free monthly credits** means you get a dollar balance applied against metered pricing. Brave, Exa, and Parallel all work this way. The balance refills each month, and once you add a card, usage past it becomes a bill.

Self-hosted servers sit outside the three. The software is free, and you pay in setup time and in whatever machine runs it.

## Free web search MCP servers compared

If you want zero setup and zero accounts, three hosted servers work keyless today: Parallel, Exa, and Firecrawl. Tavily joins them if you add one header. Everything else needs an account or your own infrastructure.

| Server | Kind of free | What you need | Transport | Tools exposed at $0 | Free limit as published | Paid upgrade |
| --- | --- | --- | --- | --- | --- | --- |
| Parallel Search MCP | Keyless; $5/month credits with an account | Nothing | Hosted, Streamable HTTP | web_search, web_fetch | “Lower rate limits” (no number published); runs in Fast mode | $1 per 1K requests (Fast, Turbo) |
| Exa MCP | Keyless; $10/month credits with an account | Nothing | Hosted, Streamable HTTP | web_search_exa, web_fetch_exa | “Covers casual use” (no number published) | $7 per 1K search requests |
| Tavily MCP | Keyless via header, or free key | A header, or an account with no card | Hosted, Streamable HTTP | tavily_search, tavily_extract | Keyless is “rate-limited”; free key gets 1,000 credits/month | $0.008 per credit |
| Firecrawl MCP | Keyless, or free key | Nothing | Hosted, Streamable HTTP | firecrawl_search, firecrawl_scrape, firecrawl_parse | Daily request and credit caps per IP; free key gets 1,000 credits/month | Hobby $19/month for 5,000 credits |
| Jina MCP | Free key | Account and key | Hosted, Streamable HTTP | search_web plus reader and reranker tools | 10M tokens per new key (one-time) | Prepaid token top-ups |
| Brave Search MCP | $5/month credits | Account, key, and a card | Local (stdio or HTTP) | Web, news, image, video, local, LLM context | $5 in credits every month | $5 per 1K requests |
| SearXNG MCP | Self-hosted | Your own SearXNG instance | Local | Web search, URL reader | Whatever your instance handles | Your hosting cost |
| DuckDuckGo MCP (community) | Keyless, local | uv installed | Local stdio | search, fetch_content | No published quota; built-in throttling | No paid tier |

Figures come from each vendor’s pricing page or docs on September 28, 2026. The keyless rows for Parallel, Exa, Tavily, and Firecrawl are ones we confirmed with live calls that day.

## The ranked list

### 1. Parallel Search MCP

We make this one, so weigh our ranking accordingly. The [Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is free to use anonymously with no account, and anonymous calls run in Fast mode, which the docs describe as the recommended default for most agents at about 700ms. `web_search` returns ranked results with dense excerpts, and `web_fetch` reads up to 20 URLs per call, including PDFs and JavaScript-heavy pages. Excerpts are capped at roughly 25,000 characters per call so they fit inside client output limits.

On [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026), at the low-cost tier with a GPT-5.6 Luna agent, Parallel Fast scored 94% on SimpleQA Verified and 44% on BrowseComp. Tavily tied on SimpleQA at 94%, Exa Auto scored 91% and 36%, and Perplexity edged Fast on BrowseComp at 46%. Those runs used the API with search and extract tools, and Fast is the same mode the keyless MCP uses.

**Where it wins:** the most capable tool pair you can use with nothing but a URL. **Where it doesn’t:** we don’t publish the anonymous rate limit, and mode and domain overrides only work once you authenticate.

### 2. Exa MCP

`https://mcp.exa.ai/mcp` answered our keyless `web_search_exa` call in about 1.7 seconds. Exa’s docs say the free plan “covers casual use” and tell you to add an `x-api-key` header when you hit the limit. An account adds $10 in credits every month plus a $10 onboarding bonus, with no payment method required. We keep a [head-to-head of the two MCP servers](https://parallel.ai/articles/parallel-search-mcp-vs-exa-mcp) if they’re your shortlist.

**Where it wins:** semantic, find-pages-like-this discovery, and the most generous monthly credit on this list. On the WideSearch low-cost tier at parallel.ai/benchmarks, Exa Auto scored 53.0 against Parallel Fast’s 45.5.

### 3. Tavily MCP

Tavily’s remote server returns a 401 to plain anonymous requests, but its [keyless mode](https://docs.tavily.com/documentation/keyless) works once you send `X-Tavily-Access-Mode: keyless`. We confirmed that on a live call. Keyless gives you `tavily_search` and `tavily_extract`; crawl, map, and research need a key. A free account gets 1,000 credits a month with no card, and Tavily stops requests when they run out instead of billing you.

**Where it wins:** teams already using Tavily in RAG pipelines, and the cleanest hard stop of any key-based tier here.

### 4. Firecrawl MCP

`https://mcp.firecrawl.dev/v2/mcp` works keyless with search, scrape, and parse. Firecrawl caps keyless use per IP address per day, by requests and by credits. Everyone behind the same office NAT or CI runner shares that cap. A free key raises it to 1,000 credits a month, and a search costs 2 credits per 10 results, so that’s about 500 searches.

**Where it wins:** scraping specific sites into clean markdown, with search as the supporting act.

### 5. Jina MCP

Jina’s official server at `https://mcp.jina.ai/v1` connected keyless, but its README marks `search_web` as key-required, and our keyless search call came back “Unauthorized.” A new Jina key comes with 10 million free tokens. That grant doesn’t refill, so budget it like a trial.

**Where it wins:** the widest toolbox here, with arXiv and SSRN search, screenshots, reranking, and deduplication behind one key.

### 6. Brave Search MCP

Brave’s [official MCP server](https://github.com/brave/brave-search-mcp-server) runs locally over stdio by default and requires `BRAVE_API_KEY`. Brave moved to a credit model: $5 per 1,000 requests with $5 in free credits every month. Its FAQ says a card is required even on free plans, as an anti-fraud check. Our [Brave comparison](https://parallel.ai/articles/brave-search-api-vs-parallel) covers the API itself.

**Where it wins:** its own independent index, plus a `brave_llm_context` tool that returns model-ready context.

### 7. SearXNG MCP (self-hosted)

[mcp-searxng](https://github.com/ihor-sokoliuk/mcp-searxng) connects your client to a SearXNG metasearch instance you run. It needs `SEARXNG_URL` and an instance with JSON output enabled, and no quota applies beyond your own hardware.

**Where it wins:** privacy and total control, if you already run infrastructure.

### 8. DuckDuckGo MCP (community)

[duckduckgo-mcp-server](https://github.com/nickclyde/duckduckgo-mcp-server) installs with `uvx duckduckgo-mcp-server` and needs no key. It doesn’t use an official API; it requests DuckDuckGo’s HTML results. The README itself notes that Cloudflare bot filtering can return an empty 202 page, which your agent sees as “no results.” OpenClaw’s docs describe its own DuckDuckGo provider the same way: unofficial and HTML-based.

**Where it wins:** a zero-account local fallback for light personal use. Don’t build anything you depend on around it.

## The built-in baseline

Every client here already ships some web search, so check whether you need a server at all.

Claude’s built-in web search costs $10 per 1,000 searches on the API, plus tokens for the results. In the Claude apps it counts toward your usage limits. Claude Code’s WebSearch tool isn’t available when you run Claude Code on Amazon Bedrock, which is the most common reason developers add a search MCP there. We compared the two in detail in [Claude’s web search vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel).

Cursor’s agent includes a Web tool that generates queries and searches without setup, so for occasional lookups you may not need anything else.

OpenClaw never routes searches to a key-free provider unless you pick one. Its [web search docs](https://docs.openclaw.ai/tools/web) list a key-free **Parallel Search (Free)** provider, id `parallel-free`, that routes through the same free Search MCP. Key-free providers never win OpenClaw’s auto-detection, so you install the plugin (`openclaw plugins install @openclaw/parallel-plugin`) and then select it explicitly with `tools.web.search.provider` or `openclaw configure --section web`.

## Set up Parallel Search MCP in each client

Each config below comes from our [Search MCP docs](https://docs.parallel.ai/integrations/mcp/search-mcp) or the client’s own docs, checked on September 28, 2026.

### Claude Code

```bash
claude mcp add --transport http "Parallel-Search-MCP" https://search.parallel.ai/mcp
```

Add `--scope user` to make it available in every project, then run `/mcp` inside a session to confirm it’s connected. For higher rate limits, add `--header "Authorization: Bearer $PARALLEL_API_KEY"` to the same command.

### Claude Desktop

The quickest path is Settings → Connectors → Add custom connector, with the URL `https://search.parallel.ai/mcp`. Organization accounts may not allow custom connectors; in that case, use Settings → Developer → Edit Config and add this entry, which needs Node.js for `npx`:

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://search.parallel.ai/mcp"]
    }
  }
}
```

To authenticate, append `"--header", "authorization: Bearer YOUR-PARALLEL-API-KEY"` to `args`, or point the connector at `https://search.parallel.ai/mcp-oauth` to sign in with OAuth.

### Cursor

Add this to `~/.cursor/mcp.json`, or to `.cursor/mcp.json` in a repo to share it with your team:

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search.parallel.ai/mcp"
    }
  }
}
```

For a key, add `"headers": {"Authorization": "Bearer ${env:PARALLEL_API_KEY}"}`; Cursor reads the variable from your environment.

### OpenClaw

As an MCP server, OpenClaw needs the `transport` field. It defaults to SSE when you leave it out, and the Search MCP speaks Streamable HTTP:

```bash
openclaw mcp set parallel-search '{"url":"https://search.parallel.ai/mcp","transport":"streamable-http"}'
```

`openclaw mcp set` only writes config, so start a new agent session before the tools appear. Add a `headers` map with `"Authorization": "Bearer YOUR-PARALLEL-API-KEY"` for higher limits. To use Parallel as OpenClaw’s own `web_search` provider instead, install `@openclaw/parallel-plugin` and set `tools.web.search.provider` to `parallel-free`, or to `parallel` with a `PARALLEL_API_KEY`.

### Test it without a client

This is the one-shot call we ran. It needs no key:

```bash
curl -s https://search.parallel.ai/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"web_search","arguments":{"objective":"Current Claude API web search tool price","search_queries":["Claude web search tool pricing"]}}}'
```

## When to add a key

Anonymous limits suit exploration and personal use. Once you hit them, [create a free account](https://platform.parallel.ai) and pass your key as a Bearer token. The account includes [$5 in free credits every month](https://parallel.ai/pricing), which covers up to 5,000 Turbo or Fast searches. Authenticated connections can also pin settings on the URL, such as `?mode=turbo` for about 200ms searches in English and Japanese; our [Fast vs. Turbo guide](https://parallel.ai/articles/parallel-search-fast-vs-turbo) covers that choice. For a wider look at free search APIs you call from code rather than through MCP, see [the best free web search APIs](https://parallel.ai/articles/best-free-web-search-api).

## Get started

Paste `https://search.parallel.ai/mcp` into whichever client you use, ask your agent something that happened this week, and check that it made a tool call. If you’d rather give a terminal agent search through a CLI, our [10-minute coding agent guide](https://parallel.ai/articles/add-free-web-search-to-coding-agent) covers both routes.

## Frequently asked questions

### Is there a web search MCP server that’s free with no API key?

Yes. Parallel Search MCP, Exa MCP, and Firecrawl MCP all work keyless at hosted URLs, and Tavily works keyless with one extra header. We confirmed all four with live calls on September 28, 2026.

### How do I add web search to Claude Code for free?

Run `claude mcp add --transport http "Parallel-Search-MCP" https://search.parallel.ai/mcp`, then start a session and run `/mcp` to confirm it’s connected. No account or key is needed.

### Does OpenClaw have free web search built in?

OpenClaw has a key-free Parallel Search (Free) provider, but it isn’t on by default. Install the plugin with `openclaw plugins install @openclaw/parallel-plugin`, restart the gateway, then set `tools.web.search.provider` to `parallel-free` or pick it in `openclaw configure --section web`.

### Does Cursor need a web search MCP server?

Not for occasional lookups, because Cursor’s agent has a built-in Web tool. Add a server when you want explicit page fetching or control over which search engine the agent uses.

### What happens when I hit the free rate limit?

It depends on the vendor. Parallel and Exa ask you to add a key, Tavily and Firecrawl stop until the next reset, and credit-based plans with a card on file bill for usage past the credit.

**Related reading: **[The best web search MCP server in 2026](https://parallel.ai/articles/best-web-search-mcp) · [The best free MCP servers in 2026](https://parallel.ai/articles/best-free-mcp-servers) · [The best MCP servers for OpenClaw](https://parallel.ai/articles/best-mcp-servers-for-openclaw) · [How to add free web search to your coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent)

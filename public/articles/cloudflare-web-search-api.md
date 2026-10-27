# Cloudflare Web Search API: providers, pricing, and how it compares

The Cloudflare Web Search API gives Workers and AI Gateway users a single search endpoint, but which provider should you pick, and when does it make sense to call a search API directly instead? This guide covers how the API works, Ceramic.ai, Exa, and Linkup side by side, the gateway's billing and logging trade-offs, and how Parallel compares.

Cloudflare launched the Web Search API in open beta on [October 2, 2026](https://developers.cloudflare.com/changelog/post/2026-10-02-introducing-web-search-api/). It’s a single endpoint that sends a query to one of three search providers (Ceramic.ai, Exa, or Linkup), normalizes the results into one format, and routes every call through AI Gateway, so searches show up in the same logs and draw down the same credit balance as your model calls. Ceramic.ai is the default at $0.25 per 1,000 requests, Linkup costs $5, and Exa costs $7. Each call returns at most 10 results, and the API covers search only: there’s no page fetch or extract endpoint.

We make Parallel, a web search API that isn’t one of Cloudflare’s three providers, so read our comparison with that in mind. We’ve tried to stick to what Cloudflare’s [docs](https://developers.cloudflare.com/web-search/) and each provider’s own pricing pages say, as of October 10, 2026.

## How the Cloudflare Web Search API works

A request names a query, an optional provider, a result limit, and the AI Gateway to route through. Cloudflare forwards the query to the provider, maps the response into a shared shape (URL, title, and an optional description, image, favicon, and last-modified date per result), and logs the request on your gateway, according to the [About page](https://developers.cloudflare.com/web-search/about/). Because the shape is shared, you switch providers by changing one string.

Every provider has also committed to Cloudflare’s [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) rules: the crawler identifies itself, respects `robots.txt`, and every result links to its source. If you care about how your search vendor treats publishers, Cloudflare has written that requirement into the program.

The request schema is small. These are all the parameters in the [How to use](https://developers.cloudflare.com/web-search/how-to-use/) reference:

| Parameter | Type | Notes |
| --- | --- | --- |
| query | string, required | 1 to 1,024 characters |
| provider | string | ceramic (default), exa, or linkup |
| limit | integer | 1 to 10, default 10 |
| byokAlias | string | Alias of a provider key stored on your gateway |
| options.gateway.id | string, required on REST | Gateway to route through (gatewayId in the binding) |

There’s no parameter for domain filters, date ranges, location, search depth, or excerpt length. Cloudflare picks those settings per provider.

## How to call it: REST and Workers

The REST endpoint lives under your account. Authenticate with a Cloudflare API token that has **Workers AI Read** and **AI Gateway Read** permissions. This is Cloudflare’s documented example; we don’t have Cloudflare credentials in our test environment, so we haven’t run it ourselves.

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/websearch/ \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "What are some fun things to do in Salt Lake City as fall approaches?",
    "provider": "ceramic",
    "limit": 5,
    "options": {
      "gateway": { "id": "default" }
    }
  }'
```

Inside a Worker, add an AI binding to your Wrangler config (`"ai": { "binding": "AI" }`) and call `env.AI.websearch()`. It returns a standard `Response`, so you call `.json()` on it.

```typescript
export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.AI.websearch({
      gatewayId: "default",
      query: "What are some fun things to do in Salt Lake City as fall approaches?",
      provider: "exa",
      limit: 5,
    });
    const results = await response.json();
    return Response.json(results);
  },
} satisfies ExportedHandler<Env>;
```

The response is an `items` array of results plus a `metadata` object with the query, a request ID, and `latencyMs`. Optional fields only appear when the provider returns them. Cloudflare’s docs also include a full tool-calling loop with a Workers AI model, where the model emits a `web_search` call and your Worker runs the search and feeds results back. The [launch post](https://blog.cloudflare.com/introducing-web-search-api/) says built-in “server tools” are coming, which would remove that orchestration step.

## Ceramic.ai vs Exa vs Linkup on Cloudflare

Cloudflare’s [Providers page](https://developers.cloudflare.com/web-search/providers/) lists the price, retention policy, and fixed search settings for each provider. Latency figures come from each provider’s own docs or pricing page, measured outside Cloudflare.

|  | Ceramic.ai | Exa | Linkup |
| --- | --- | --- | --- |
| provider value | ceramic | exa | linkup |
| Price on Cloudflare | $0.25 per 1K requests | $7.00 per 1K | $5.00 per 1K |
| Zero Data Retention via Cloudflare | Yes | No | Yes |
| Index | Own index, 40B+ pages | Own index, keyword plus embeddings | Not stated by Cloudflare |
| Search setting Cloudflare uses | Default | auto type | fast depth, raw results |
| What fills description | Long page text, up to 8,000 characters | Query-relevant highlights | Text snippets |
| Published latency | “As fast as 50ms” ([Ceramic](https://www.ceramic.ai/)) | ~1 second for auto ([Exa docs](https://exa.ai/docs/reference/search-api-guide-for-coding-agents)) | 1 to 3 seconds for search ([Linkup](https://www.linkup.so/pricing)) |

**Ceramic is lexical.** Its [best practices](https://docs.ceramic.ai/api/search/best-practices) say it matches exact keywords and doesn’t infer intent or synonyms, and it recommends having an LLM write several short keyword queries per question. Cloudflare’s sample query is a full natural-language sentence. If your agent passes the user’s question straight through, rewrite it into keywords first when you use Ceramic. Ceramic’s price makes the multi-query pattern cheap: 10 queries cost $0.0025.

**The prices match each provider’s list price, with one wrinkle.** Exa lists auto search at [$7 per 1,000 requests](https://exa.ai/pricing) and Linkup lists search from $0.005 per request, so those match. Ceramic’s homepage says $0.25 per 1,000 queries, while its [pricing page](https://ceramic.ai/pricing) currently shows a $0.05 pay-as-you-go rate with ZDR reserved for Enterprise. Check both if you’re comparing direct and Cloudflare-billed costs at volume.

**The ZDR column has a conflict.** The launch changelog says all three providers support Zero Data Retention through Cloudflare. The Providers page, updated the same day, lists Exa as “No”. Treat Exa as non-ZDR until Cloudflare reconciles the two. Linkup’s own pricing page says ZDR is Enterprise-only when you buy direct, so routing through Cloudflare is a way to get ZDR from Linkup without that plan.

**You can’t change the provider’s mode.** Exa always runs `auto`, so you can’t reach Exa’s cheaper `instant` type ($4 per 1K) or its `deep` types through Cloudflare. Linkup always runs `fast`. If you need those knobs, call the provider directly or through AI Gateway’s provider proxy.

## Billing, logging, caching, and limits in AI Gateway

**Billing.** You pay with AI Gateway credits at the provider’s list price, or store a provider key on the gateway (BYOK) and the provider bills you directly. If you set `byokAlias` and the key isn’t configured, the request fails with a 400 instead of falling back to credits. Cloudflare’s [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) page notes a 5% fee on credit purchases ($105 for $100 of credits), so “no markup” applies per search, not to the credits themselves.

**Logging.** Gateway logs are on by default and can include the request, response, provider, status, cost, and duration. The `cf-aig-collect-log` and `cf-aig-collect-log-payload` headers let you skip a log or keep metadata without the payload, per the [logging docs](https://developers.cloudflare.com/ai-gateway/observability/logging/). If you already watch model spend in AI Gateway, having search cost and latency on the same dashboard is a real benefit, and it’s the main reason to pick this API over calling a provider directly.

**Caching.** AI Gateway caching is off by default and keys on an exact match of the full request. The [caching docs](https://developers.cloudflare.com/ai-gateway/features/caching/) don’t say whether Web Search API responses are cacheable, so don’t count on cache hits for repeated queries until Cloudflare documents it.

**Rate limits.** The Web Search docs only list the 1,024-character query and 10-result caps. AI Gateway’s [limits page](https://developers.cloudflare.com/ai-gateway/reference/limits/) caps requests that use Cloudflare-managed credentials at 200 per 60 seconds per gateway, with a 429 when you exceed it, and says BYOK requests aren’t subject to that cap. Cloudflare doesn’t state whether web search counts toward it, so load test before you rely on credit billing for high-volume agents.

## Who it’s for, and the limitations

The Web Search API fits teams already on Workers and AI Gateway who want one bill, one log stream, and a quick way to try three providers. Ceramic’s $0.25 per 1K is a quarter of the price of Parallel’s cheapest modes ($1 per 1K for turbo and fast). For high-volume keyword lookups where you control the query, that price is hard to beat.

The limits come from the beta and the narrow schema:

- **Search only.** There’s no fetch or extract endpoint, so reading a full page means a separate tool.
- **10 results maximum** per call, with no pagination.
- **No filters.** No domain allow lists, date ranges, or location targeting.
- **Fixed provider settings.** Exa runs `auto` and Linkup runs `fast`, with no override.
- **One query per call.** There’s no field for an objective or multiple queries, so multi-query patterns mean multiple requests.
- **Beta.** The ZDR conflict and undocumented caching behavior suggest the docs are still settling.

## How Parallel compares

Parallel isn’t a Web Search API provider today. You can still use it from Cloudflare in two ways.

The first is AI Gateway’s existing [Parallel provider proxy](https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/), which forwards any Parallel path appended after `gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel` with your own Parallel API key. Cloudflare’s examples there still use our older `/v1beta/search` path; new integrations should use `/v1/search`. We haven’t tested the proxy route ourselves because we don’t have Cloudflare credentials in our test setup.

The second is calling the Search API directly from a Worker. Parallel’s request takes a natural-language `objective` plus several keyword `search_queries`, and returns ranked excerpts per result. We ran this handler’s logic in Node 22 (same `fetch`, `Request`, and `Response` APIs as Workers) against the live API on October 10, 2026:

```typescript
interface Env {
  PARALLEL_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const q = new URL(request.url).searchParams.get("q") ?? "Cloudflare Web Search API providers";
    const res = await fetch("https://api.parallel.ai/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.PARALLEL_API_KEY,
      },
      body: JSON.stringify({
        objective: q,
        search_queries: [q],
        mode: "fast",
        advanced_settings: { max_results: 5 },
      }),
    });
    if (!res.ok) return new Response(await res.text(), { status: res.status });
    const data: any = await res.json();
    return Response.json(
      data.results.map((r: any) => ({ url: r.url, title: r.title, excerpts: r.excerpts })),
    );
  },
};
```

Store the key with `wrangler secret put PARALLEL_API_KEY`. For the question “Which providers does the Cloudflare Web Search API support?”, the call returned 200 in 665ms (round trip from our machine) with five results, trimmed here:

```text
status 200 ms 665 n 5
https://developers.cloudflare.com/ai-search/api/search/rest-api/index.md | REST API
https://developers.cloudflare.com/ai-gateway/usage/web-search | Web Search · Cloudflare AI Gateway docs
https://imasters.com/news/cloudflare-launches-web-search-api-to-give-ai-agents-real-time-search | Cloudflare's Web Search API: search for AI agents - iMasters
```

If your agent speaks MCP, the [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/quickstart) at `https://mcp.parallel.ai/mcp` works without an API key and adds a `web_fetch` tool that reads up to 20 URLs per call, which covers the page-reading gap in Cloudflare’s API.

|  | Cloudflare Web Search API | Parallel Search API |
| --- | --- | --- |
| Price per 1K | $0.25 (Ceramic), $5 (Linkup), $7 (Exa) | $1 (turbo, fast), $5 (basic, advanced) |
| Latency | Varies by provider | ~200ms turbo, ~700ms fast, ~1s basic, ~3s advanced |
| Results per call | Up to 10 | Up to 20 |
| Input | One query string | Objective plus multiple keyword queries |
| Filters | None | Domains, after_date, location, excerpt length |
| Page fetch | No | Extract API ($1 per 1K URLs) and MCP web_fetch |
| Billing and logs | AI Gateway credits or BYOK, in gateway logs | Parallel billing; gateway logs via the provider proxy |

On quality, the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (October 2026) scores Parallel Search advanced at 75 and Exa auto, the setting Cloudflare uses, at 74. Ceramic and Linkup aren’t listed in the figures we checked, so we can’t compare them there.

You can use both. Ceramic through Cloudflare suits cheap, high-volume keyword lookups, and Parallel handles objective-driven searches, filtered searches, and page extraction.

## Frequently asked questions

### What is the Cloudflare Web Search API?

The Cloudflare Web Search API is a beta endpoint, launched October 2, 2026, that runs web searches through AI Gateway using Ceramic.ai, Exa, or Linkup. It returns up to 10 results per call in one normalized format and logs and bills each search on your gateway.

### Which search providers does Cloudflare’s Web Search API support?

It supports three providers: Ceramic.ai (the default, $0.25 per 1,000 requests), Linkup ($5 per 1,000), and Exa ($7 per 1,000). You pick one with the `provider` parameter, and Cloudflare fixes Exa to its `auto` type and Linkup to its `fast` depth.

### Does Cloudflare add a markup to web search?

No, each search is billed at the provider’s list price when you pay with AI Gateway credits. Cloudflare does charge a 5% fee when you buy credits, and you can avoid it by storing your own provider key on the gateway.

### Can the Cloudflare Web Search API fetch full page content?

No, it only returns search results with a URL, title, and optional description. Ceramic’s descriptions can run up to 8,000 characters, but for full pages you need a separate fetch or extract tool.

### Is Parallel available in Cloudflare’s Web Search API?

Not as one of the three Web Search API providers. You can route Parallel calls through AI Gateway’s Parallel provider proxy with your own key, or call `https://api.parallel.ai/v1/search` directly from a Worker.

## Get started

If you’re on Workers, try the Cloudflare Web Search API with Ceramic for keyword lookups and compare the results against Parallel on your own queries. Get a Parallel API key on [Platform](https://platform.parallel.ai), or connect the keyless Search MCP first. For more context, see our guide to [the best web search APIs](https://parallel.ai/articles/best-web-search-api) and [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis).

# The best free web search APIs for AI agents in 2026

Free tiers for web search APIs are not comparable: some are one-time credit grants, some refill monthly, some require a card, and rate limits usually bind long before credits do. This guide breaks down what nine providers actually give away in 2026, sets their free tiers side by side, and shows which option fits prototyping, hobby agents, or production traffic.

## **What "free" actually means for a search API**

"Free tier" covers at least four different arrangements, and which one you're being offered matters more than the headline number.

### **One-time credits vs. recurring credits**

A signup grant is a fixed amount you burn through once. A recurring monthly allowance refills, which is what you want if you're running a personal agent or a side project indefinitely. Several providers offer both, and marketing materials often blur the distinction. Most recurring allowances expire at month end rather than rolling over, so unused credit is gone.

### **Whether a card is required**

A hard-capped free tier with no card on file cannot generate a bill. A credit-based free tier with a card attached converts to metered billing the instant you exceed the credit, and some providers don't offer a spending cap. Neither model is wrong, but they behave very differently if your agent enters a retry loop at 3 a.m.

### **Rate limits, not credits, are usually the ceiling**

Free tiers are typically throttled well below paid tiers. A plan with 1,000 monthly credits and two concurrent requests will bottleneck on concurrency long before you spend the credits. If you're evaluating latency or building anything with parallel fan-out, check the requests-per-second figure before the credit figure.

### **Where the results come from**

Some providers run their own web index. Others scrape a consumer search engine and reformat the results as JSON. Scraped SERP data is cheap and often excellent, but it inherits legal and continuity risk from the engine being scraped. Google has litigated against SERP scrapers. That's irrelevant for a weekend project and worth weighing for anything you intend to run for years.

### **What the output is shaped for**

A free tier measured in requests tells you nothing about how many requests you'll need. APIs that return 20-word snippets built for human eyeballs force your model to fetch each page separately, so a single question can cost five calls. APIs that return dense, query-relevant excerpts often answer in one. Compare providers on cost per answer.

## **The best free web search APIs in 2026**

### **1. Parallel Search API**

We built the [**Parallel Search API**](https://parallel.ai/products/search) for AI agents rather than for humans reading a results page. It runs on our own web-scale index (billions of pages, millions added or updated daily) and returns ranked results with dense, token-efficient excerpts rather than snippets. There are three ways to use it for free, and they stack:

- **A free hosted MCP server.** Point any MCP client at [search.parallel.ai/mcp](https://docs.parallel.ai/integrations/mcp/search-mcp) and your agent has web search and page fetching immediately. No account, no API key, no credit card. It's intended for personal and hobbyist use, with rate limits set generously enough for a daily-driver coding agent.
- **A signup credit.** New accounts created at [platform.parallel.ai](https://platform.parallel.ai) receive a starting credit balance you can spend across any Parallel API: Search, Extract, Task, Responses, FindAll, Entity Search, or Monitor.
- **$5 in free credits every month.** Eligible organizations with a card on file receive [$5 in credits automatically each month](https://parallel.ai/blog/free-tier-parallel), usable across Parallel products. Free credit applies before a paid balance, so you only pay once you've used it up. Unused balance expires at the end of the month, one credit per organization, and marketplace and postpaid organizations aren't eligible.

The Search API offers [four modes](https://docs.parallel.ai/search/modes): Turbo (~200ms median latency, $1 per 1,000 requests), Fast (under a second, also $1 per 1,000), Basic (~1s, $5 per 1,000), and Advanced (~3s, $5 per 1,000, the API default). If you're shopping on price, look at Turbo and Fast: at $1 per 1,000 requests they're the cheapest modes we offer, and in the independent Artificial Analysis Search Index's September 8, 2026 data, Fast recorded $8.41 in search cost per 1,000 benchmark tasks, among the lowest measured, while scoring 73 against advanced's 75. In this category, cheap and fast usually costs more accuracy than that.

Every response includes source attribution. We hold SOC 2 Type 2 certification, and zero data retention is available on Enterprise plans. The [Search API quickstart](https://docs.parallel.ai/search/search-quickstart) takes about five minutes end to end.

### **2. Tavily**

Tavily's free plan gives 1,000 API credits per month with no credit card required, covering both its search and extract endpoints. With no card involved, you can't accidentally generate a bill. Paid usage runs $0.008 per credit pay-as-you-go, with monthly plans bringing that down. Tavily also integrates tightly with agent frameworks like LangChain, which makes it a common first choice for developers already in that ecosystem. The trade-off is index scale: Tavily doesn't operate its own full web index.

### **3. Exa**

Exa gives new accounts a $10 onboarding bonus plus $10 in free credits every month, with no payment method required. Requests stop when your balance runs out, so the account cannot incur a charge. Exa runs its own embeddings-based index and pairs the API with prosumer tools like Websets, so it's a good fit if you want to explore interactively as well as programmatically. Its index is smaller and more specialized than providers running general web-scale crawls.

### **4. Firecrawl**

Firecrawl's free plan is 1,000 credits per month, no card required, refreshed monthly. Search costs 2 credits per 10 results, so the free tier stretches to roughly 5,000 search results, or 1,000 scraped pages at 1 credit each. The real constraint is 2 concurrent requests, which rules out anything with meaningful fan-out. Firecrawl is strongest when your problem is closer to crawling and extraction than to search, and it can be self-hosted, though the open-source build drops the proxy rotation and bot bypass that make the hosted version reliable.

### **5. Serper**

Serper offers 2,500 free queries with no credit card and no subscription, then charges from $0.30 per 1,000 queries: by a wide margin the cheapest paid rate here. What you get is real Google SERP data as structured JSON: organic results, knowledge graph, answer boxes, people-also-ask. If you specifically need Google's ranking, this is the value pick. Two caveats: the free grant is one-time rather than recurring, and the data depends on scraping Google, which carries continuity and legal risk that an owned index doesn't.

### **6. Linkup**

Linkup gives new accounts 4,000 free queries on signup and then tops accounts up to $5 in credits each month, so it covers both the one-time and recurring patterns. SOC 2 Type II and zero data retention are included on every plan, free tier included, which is rare at this price point and useful if you're prototyping something that will eventually need a compliance review. Linkup also open-sourced its benchmark harness, which is more transparency than most of this category offers.

### **7. Brave Search API**

Brave's free tier (2,000 queries per month since 2023, later raised to 5,000) was eliminated in February 2026 and replaced with $5 in monthly credits on metered plans. At $5 per 1,000 requests, that credit buys about 1,000 searches, after which the card Brave has required at signup since 2023 gets charged. Claiming the credit also requires attributing Brave Search in your project's website or about page. Brave remains one of the few independent Western operators of a full web index, which is a genuine technical advantage, but the free tier that made it the default choice for hobbyists no longer exists.

### **8. Google Custom Search JSON API**

The historical default for free web search (100 queries per day free, $5 per 1,000 beyond that, hard-capped at 10,000 per day) is closed to new customers and scheduled for discontinuation on January 1, 2027. If you already have a project on it, you have a migration deadline. If you don't, you can't sign up. Google points existing users toward Vertex AI Search, which is oriented to site search across a limited domain set rather than open web search and requires full Google Cloud setup. We include it only because it still ranks near the top of search results for this query.

### **9. Self-hosted SearXNG**

SearXNG is a self-hosted metasearch engine with no per-query cost at all. If "free" means "no invoice," this is the only entry that fully qualifies. You supply the server, and you own the operational reality: results come from aggregating public engines, so you inherit their rate limiting and blocking, and there's no SLA, no support, and no one to page when a source engine changes its markup. It's reasonable for privacy-sensitive internal tooling and for cost-sensitive experimentation where occasional failure is acceptable, but it can't carry a product.

## **Free tiers side by side**

| Provider | What's free | Card required | Refills |
| --- | --- | --- | --- |
| Parallel | Hosted MCP server (no account), signup credit, $5/month | Only for monthly credits | Monthly |
| Tavily | 1,000 credits/month | No | Monthly |
| Exa | $20 on signup, then $10/month | No | Monthly |
| Firecrawl | 1,000 credits/month, 2 concurrent requests | No | Monthly |
| Serper | 2,500 queries | No | One-time |
| Linkup | 4,000 queries on signup, then $5/month | No | Monthly |
| Brave | $5/month credits (~1,000 searches), attribution required | Yes | Monthly |
| Google Custom Search | 100 queries/day (closed to new customers, ends Jan 2027) | For overage | Daily |
| SearXNG | Unlimited, self-hosted | No | N/A |

_Check official documentation for current pricing._

## **The fastest free start: our hosted MCP server**

Every other entry on this list requires an account before your agent can run a single query. The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) doesn't. It's a hosted, streamable-HTTP MCP server at **https://search.parallel.ai/mcp**, free and usable anonymously, and it exposes two tools:

- **web_search**: real-time search returning ranked URLs with compressed, query-relevant excerpts, running the Search API in Fast mode.
- **web_fetch**: clean markdown from any public URL, including JavaScript-heavy pages and PDFs.

Results are capped at roughly 25,000 characters per call to stay inside typical MCP client output limits. For Claude Code, one command:

```sh
claude mcp add --transport http "Parallel-Search-MCP" https://search.parallel.ai/mcp
```

For clients configured through JSON (Cursor, Windsurf, Cline, Claude Desktop, and most others) the entry is three lines:

```json
{
  "mcpServers": {
    "parallel-search": {
      "type": "http",
      "url": "https://search.parallel.ai/mcp"
    }
  }
}
```

There are one-click installers for [Cursor](https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC5wYXJhbGxlbC5haS9tY3AifQ==) and [VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch.parallel.ai%2Fmcp%22%7D), plus setup instructions for 25+ clients in the [MCP quickstart](https://docs.parallel.ai/integrations/mcp/quickstart). It works with Claude and Claude Code, ChatGPT and Codex, Cursor, Cline, OpenClaw, Hermes Agent, OpenCode, Windsurf, Goose, LM Studio, and anything else that speaks MCP.

Anonymous use gets rate limits sized for hobby and personal agents; if you want higher limits and usage analytics, create an account at [platform.parallel.ai](https://platform.parallel.ai) and pass your API key as a Bearer token, or point your client at https://search.parallel.ai/mcp-oauth to authenticate over OAuth instead. For production traffic, call the Search API directly, which is where mode selection, result counts, and per-request cost control live.

## **Four modes, and why Turbo and Fast change the free-tier math**

Most search APIs sell one quality level at one price. We sell four, so you can match spend to what a given query is worth.

| Mode | Median latency | Price | Built for |
| --- | --- | --- | --- |
| Turbo | ~200ms | $1 / 1,000 requests | Chat, voice agents, RAG pre-filtering, high-volume lookups |
| Fast | ~700ms | $1 / 1,000 requests | Most agent loops (the docs' recommended starting mode) |
| Basic | ~1s | $5 / 1,000 requests | Agent workloads that need deeper context per call |
| Advanced | ~3s | $5 / 1,000 requests | Multi-hop background agents, deep research, code review |

[Turbo](https://parallel.ai/blog/parallel-search-turbo) and the newer Fast mode, both at $1 per 1,000, are the ones to look at if price brought you here. Turbo returns web grounding in about 200ms; Fast takes under a second, returns higher-quality results, and is the best fit for most agent loops. On [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026), with a GPT-5.6 Luna agent at the low-cost tier, Fast scored 94% on SimpleQA Verified and Turbo 91%, both at $2 per 1,000 questions including LLM tokens, against $5.50 for Perplexity (94%) and $17.40 for Tavily (94%). Both return dense excerpts directly rather than a list of links to go fetch, which keeps the total number of calls down.

On the independent Artificial Analysis Search Index (September 2026 data), which runs the same GPT-5.6 Luna agent against every provider and varies only the search API, Parallel Search (advanced) scores 75 of a possible 100, level with Brave's LLM context mode and behind Perplexity Search (medium) at 80 and Octen Search at 77, with You.com (highlights) and Exa (auto) at 74. Turbo, the mode the free tier stretches furthest, scored 67 at a measured $13.64 per 1,000 benchmark tasks in AA's August data, and Fast, at the same $1 per 1,000 list price, scored 73 at $8.41 in the September 8 data, among the lowest search costs measured.

One methodology note: unlike the vendor-run numbers that used to dominate this category (ours included), the figures above come from Artificial Analysis, an independent evaluator, using a fixed harness in which the search provider is the only variable. Still, run your own evaluation on your own queries before committing; an aggregate index can't predict your workload.

## **How far $5 a month actually goes**

Because Parallel prices per request rather than per token, the free monthly allowance converts to a number you can plan against. At current prices, $5 covers up to:

- 5,000 searches in Turbo or Fast mode, or 1,000 in Basic or Advanced
- 5,000 Extract API requests
- 1,000 Task API runs
- 1,666 Monitor API executions

Or any combination. 5,000 Turbo searches a month is around 165 a day, which is more than enough to run a personal research agent, a Slack bot, or a monitoring job continuously without ever paying. Failed runs aren't billed, so a broken query doesn't eat the allowance. And because free credit is spent before paid balance, adding a card doesn't make you pay sooner; it only decides what happens after the free credit is gone.

## **Which free option fits your project**

- **You want web search in your coding agent in the next 60 seconds.** Our hosted MCP server. No account, no key, one command.
- **You're prototyping and want to avoid an invoice.** Tavily or Exa. Both refill monthly with no card on file, so overage is impossible by construction.
- **You need Google's actual ranking.** Serper, at 2,500 free queries and $0.30 per 1,000 after. Accept the scraping dependency knowingly.
- **The free tier is a trial for something that goes to production.** Evaluate on the paid path, not the free one. Check the mode you'll ship and the rate limits you'll need, and whether SOC 2 and zero data retention are included or an enterprise upsell.
- **Volume is high and per-query cost decides the build.** Turbo or Fast at $1 per 1,000 requests, and measure cost per answer rather than cost per request: dense excerpts mean fewer calls per resolved question.
- **You cannot spend money and can run infrastructure.** Self-hosted SearXNG, with clear eyes about reliability.

## **Frequently asked questions about free web search APIs**

### **Is there a web search API that's free with no credit card and no signup?**

The Parallel Search MCP server at https://search.parallel.ai/mcp requires neither. Several providers (Tavily, Exa, Firecrawl, Serper) offer free tiers without a card but do require an account. Brave requires a card at signup.

### **Can I run a production application on a free tier?**

Rate limits rule out most production use before credit caps do. Free tiers are throttled: low concurrency, lower requests per second, and no SLA. They're built for evaluation and hobby use. Free credits that recur monthly can carry a low-volume production workload (a monitoring job, an internal bot) but anything user-facing will hit rate limits before it hits the credit ceiling.

### **What happened to the free Bing and Google search APIs?**

Microsoft deprecated the Bing Search API on August 11, 2025, directing developers to Azure AI Agents. Google's Custom Search JSON API is closed to new customers and discontinues on January 1, 2027. Both of the historical free defaults for web search are gone, which is most of why this category exists in its current form.

### **Do free credits roll over if I don't use them?**

Most providers do not allow rollover. Parallel's $5 monthly credit expires at the end of the month, as do Tavily's and Firecrawl's monthly credits. Signup grants generally persist until spent. Assume no rollover unless a provider says otherwise in writing.

### **What's the cheapest paid web search API once the free tier runs out?**

Serper is cheapest per query at $0.30 per 1,000, using scraped Google SERP data. Among APIs running their own index and returning LLM-ready excerpts, Parallel's Turbo and Fast modes at $1 per 1,000 requests are the lowest rate we're aware of. Compare on cost per resolved answer rather than per request: an API that needs four calls at $0.30 costs more than one that needs a single call at $1.

### **How do I move from the free MCP server to the API?**

Create an account, generate a key, and call the Search endpoint directly. The [quickstart](https://docs.parallel.ai/search/search-quickstart) covers it in a few minutes. You keep the same index and excerpt format, and gain mode selection, result-count control, higher rate limits, and usage analytics. Full rates are on the [pricing page](https://parallel.ai/pricing).

**Related reading: **[The honest 2026 comparison: web search APIs for AI agents](https://parallel.ai/articles/the-honest-2026-comparison-web-search-apis-for-ai-agents) · [Tavily vs. Parallel](https://parallel.ai/articles/tavily-vs-parallel-search) · [Exa vs. Parallel](https://parallel.ai/compare/exa-vs-parallel) · [Brave Search API vs. Parallel](https://parallel.ai/articles/brave-search-api-vs-parallel)

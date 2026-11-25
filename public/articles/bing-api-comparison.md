# Bing Search API: what replaced it and the best alternatives in 2026

The Bing Search API, including Bing Web Search v7, went offline on August 11, 2025, and developers now choose between Microsoft’s newer grounding and Web IQ products and independent search APIs. This guide covers the current status, how the old Bing parameters map to new endpoints, eight alternatives with prices checked November 22, 2026, and the migration problems to expect.

Microsoft’s [lifecycle notice](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) decommissioned every existing instance and closed signups, so no Bing Search endpoint takes new code. The successor Microsoft names is Grounding with Bing Search, a tool for agents in Microsoft Foundry that costs $14 per 1,000 transactions and hands results to your model rather than to your application. If you need raw results in your own code, Microsoft now sells Web IQ Web Search at $7 per 1,000 calls, and third-party APIs such as Brave, SerpApi, Serper, Exa, Tavily, You.com, Linkup, and Parallel cover the rest.

## Bing Search API status (checked November 22, 2026)

| Product | Status | Price | What your code receives |
| --- | --- | --- | --- |
| Bing Web Search API v7 and the other Bing Search APIs | Retired August 11, 2025 | None; signups closed | Nothing; instances were decommissioned |
| Grounding with Bing Search | Available in Foundry Agent Service and as a Web Knowledge Source in Azure AI Search and Foundry Knowledge | $14 per 1,000 transactions, up to 150 per second and 1 million per day | Results go to the model; Microsoft says outputs are not directly accessible to other applications |
| Grounding with Bing Custom Search | Same surfaces as above | $14 per 1,000 transactions | Grounding limited to the domains you configure |
| Microsoft Web IQ Web Search | Generally available | $7 per 1,000 calls | Up to 50 ranked results with query-focused passages; terms bar caching or storing them |

Grounding with Bing Search is designed for agents that run inside Microsoft Foundry. Each tool call in an agent run counts as one transaction. Microsoft’s [Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/bing-grounding) notes that the tool is governed by the Grounding with Bing terms of use rather than the Foundry Agent Service data processing terms, and that only the search query, tool parameters, and your resource key are sent to Bing. Prices are from Microsoft’s [Grounding with Bing pricing page](https://www.microsoft.com/en-us/bing/apis/grounding-pricing).

Web IQ is the closer match for developers who used the old API to get results into their own code. Its [Web Search endpoint](https://learn.microsoft.com/en-us/web-iq/reference/web-search) accepts a POST to `api.microsoft.ai/v3/search/web`, returns passages in place of snippets, and runs on a paid Azure subscription, at [$7 per 1,000 calls](https://learn.microsoft.com/en-us/web-iq/resources/pricing). The [Web IQ FAQ](https://learn.microsoft.com/en-us/web-iq/resources/faq) says its terms prohibit caching or storing result content outside narrow exceptions such as per-user chat history, so a pipeline that keeps a copy of results needs a provider whose terms allow that. In Foundry itself, Microsoft’s docs now list a Web Search tool powered by Web IQ as the recommended option for general web grounding.

## **Why the Bing Search API was discontinued**

Microsoft deprecated the Bing Search API on August 11, 2025 and directed developers toward Azure AI Agents and enterprise products. That decision removed the low-cost, general-purpose search endpoint many applications used. Teams that relied on Bing now need a new source of independent web data.

Grounding with Bing Search, the successor Microsoft recommends, is designed for agents running in Azure and Microsoft Foundry. It costs $14 per 1,000 transactions, and Microsoft’s [pricing page](https://www.microsoft.com/en-us/bing/apis/grounding-pricing) says its outputs “are not directly accessible for use in other applications or programs.” Google’s Custom Search JSON API is closed to new customers and ends for existing ones on January 1, 2027; our guide to [Google Custom Search API alternatives for AI agents](https://parallel.ai/articles/the-best-google-custom-search-api-alternative-for-ai-agents) covers the options.

## **What features to look for in search API alternatives**

### **Data accuracy and freshness**

Data freshness refers to how recently the API's index was updated. For AI agents that reason over current information, stale data leads to hallucinations and outdated responses. Look for APIs that provide structured outputs with source citations, allowing your application to verify claims and maintain transparency.

### **Pricing models and cost efficiency**

Search APIs typically charge per query, through subscription tiers, or via token-based billing. Predictable pricing helps with budget planning, especially when scaling. Some providers offer tiered plans that let you balance cost against quality and speed, which proves useful when different queries have different requirements.

### **API performance and latency**

Latency refers to the time between sending a request and receiving results. The fastest AI-native modes now return results in a few hundred milliseconds, base tiers often return results in 1–3 seconds, and premium tiers prioritizing quality might take 15–60 seconds. The trade-off between speed and result quality depends on whether you're building real-time chat experiences or background research agents.

### **Enterprise security and compliance**

For production deployments, look for SOC 2 Type 2 certification, GDPR compliance, and data residency options. Enterprise customers often require SLA guarantees and dedicated support channels before committing to a vendor.

## **Best Bing API alternatives for AI applications**

### **Parallel Search API**

We built the [Parallel Search API](https://parallel.ai/products/search) specifically for AI agents to reason over web data. Backed by our own proprietary web-scale index (billions of pages, with millions added daily), it returns ranked results with optional dense webpage excerpts, offering far more context than typical snippet-based alternatives. Four modes address different priorities: Turbo (~200ms median latency at $1 per 1,000 requests, built for real-time, high-volume workloads), Fast (under a second at the same $1 per 1,000, the best fit for most agent workloads), Basic (~1s, for deeper excerpts per call), and Advanced (~3s, for the highest-quality multi-hop results), with Basic and Advanced priced at $5 per 1,000 requests.

Every response includes source attribution, so your application can verify claims. We hold SOC 2 Type 2 certification, offer zero data retention on Scale (Hybrid ZDR, once a signed agreement is in place) and Enterprise plans, and keep pricing predictable across tiers.

For developers building multi-hop reasoning agents or long-horizon research tasks, our token-efficient excerpts and large language model (LLM)-ready outputs give the model denser, more relevant context on the first call, so it needs fewer round trips and fewer reasoning steps to reach a final answer. On [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026), Advanced scored 97% on SimpleQA Verified and 74% on BrowseComp with a GPT-5.6 Sol agent, level with Perplexity on BrowseComp and ahead of Exa and Tavily. For latency-sensitive workloads like voice agents and consumer chat, Turbo mode delivers web grounding in about 200ms at $1 per 1,000 requests. On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (November 2026), Parallel Search (advanced) ranks #1 of 26 search API products at 83, and fast mode scores 82 while taking 15.5 seconds per task, the quickest of any product scoring 80 or higher.

### **Exa AI**

Exa positions itself as an AI-native search solution with products catering to prosumer users through their platform, including web sets and a semantic search engine. The approach works well for developers who want both API access and interactive tools for exploration. Exa runs its own independent index; as of August 2026, it says the index tracks 1.4 trillion URLs and serves 100 billion pages.

### **SerpAPI**

SerpAPI takes a different approach: it scrapes search engine results pages (SERPs) from Google, Bing, and other engines, then returns structured JSON. This works well if you specifically want SERP data rather than raw web content. The trade-off is an extra layer of abstraction: you get search engine results rather than direct web access.

### **Bright Data SERP API**

Bright Data offers enterprise-grade web scraping infrastructure backed by a global proxy network. The service handles JavaScript rendering, CAPTCHAs, and geographic targeting automatically. Costs run higher than developer-focused alternatives, but reliability and coverage justify the premium for large-scale operations.

### **Tavily Search API**

Tavily focuses on AI-powered search with built-in summarization capabilities. The API integrates well with agent frameworks like LangChain, making it popular for conversational AI applications. If your use case involves generating summaries rather than retrieving raw content, Tavily's approach reduces post-processing work.

### Brave Search API

Brave runs its own independent index and, per its [API page](https://brave.com/search/api/), never falls back to Google or Bing results. Its query parameters (`q`, `count`, `offset`, `country`, `freshness`, `safesearch`) follow a Bing-like shape, which keeps a v7 port small. The Search plan costs $5 per 1,000 requests at up to 50 queries per second, and an Answers plan returns summarized answers at $4 per 1,000 requests plus $5 per million tokens. For a closer look, see [Brave Search API vs. Parallel](https://parallel.ai/compare/brave-vs-parallel).

## Bing Search API alternatives compared

The table lists each API’s lowest published rate for one basic search request, read from each vendor’s pricing page on November 22, 2026. Deeper modes cost more, and our roundup of the [best web search APIs](https://parallel.ai/articles/best-web-search-api) covers quality differences in more depth.

| API | What it returns | Entry price per 1,000 searches | Free allowance |
| --- | --- | --- | --- |
| Microsoft Web IQ Web Search | Ranked results with passages from the Bing web index | $7 | None listed; needs a paid Azure subscription |
| Brave Search API | Results from Brave’s own index, plus extra snippets | $5 | Up to $20 in free calls a month |
| SerpApi | Parsed result pages from Google, Bing, and other engines | $25 on Starter ($25 for 1,000); $15 on Developer ($75 for 5,000) | 250 searches a month |
| Serper | Parsed Google result pages | $1.00 on the 50,000-credit pack, down to $0.30 at 12.5 million credits | 2,500 queries |
| Exa | Results from Exa’s own index, with text and highlights | $4 (Lite), $7 (Auto) | $10 in credits a month |
| Tavily | Results with content snippets and an optional answer | $8 pay as you go (1 credit per basic search); $7.50 on the $30 plan | 1,000 credits a month |
| You.com | Web and news results, up to 100 per call | $5 | Free MCP access, up to 100 queries a day |
| Linkup | Search results or a sourced answer | $5 to $6 ($0.005 to $0.006 per request) | 4,000 queries |
| Parallel Search API | Ranked URLs with dense excerpts from Parallel’s own index | $1 (Turbo, Fast); $5 (Basic, Advanced) | Up to $80 at signup plus $5 a month with a card on file |

Sources: [Web IQ](https://learn.microsoft.com/en-us/web-iq/resources/pricing), [Brave](https://brave.com/search/api/), [SerpApi](https://serpapi.com/pricing), [Serper](https://serper.dev/), [Exa](https://exa.ai/pricing), [Tavily](https://docs.tavily.com/documentation/api-credits), [You.com](https://you.com/docs/administration/billing), [Linkup](https://www.linkup.so/pricing), and [Parallel](https://docs.parallel.ai/getting-started/pricing). For more on free tiers, see our guide to the [best free web search APIs](https://parallel.ai/articles/best-free-web-search-api).

## **Parallel vs. Bing API direct comparison**

| Feature | Bing API | Parallel Search API |
| --- | --- | --- |
| Status | Retired August 11, 2025 | Active |
| Output | JSON | JSON |
| Pricing tiers | N/A (retired) | Simple & scalable |
| Starting price | N/A (retired) | $1 per 1,000 requests (Turbo mode) |
| Freshness controls | freshness parameter (Day, Week, Month, or a date range) | after_date source filter and fetch_policy max age |
| Enterprise support | Azure | Open, SOC 2 Type 2, ZDR on Scale and Enterprise plans |

The biggest difference is the output format. Bing returned brief snippets optimized for human readers. Parallel returns dense, token-efficient excerpts with enough context for AI agents to reason, reducing the need for follow-up requests and improving accuracy in multi-step tasks.

## Mapping Bing API parameters to replacement APIs

Most Bing Web Search v7 code used a handful of query parameters. The table maps each one to its closest equivalent in Web IQ, Brave, and Parallel, based on each provider’s API reference as of November 22, 2026.

| Bing Web Search v7 | Web IQ Web Search | Brave Search API | Parallel Search API |
| --- | --- | --- | --- |
| GET api.bing.microsoft.com/v7.0/search | POST api.microsoft.ai/v3/search/web | GET api.search.brave.com/res/v1/web/search | POST api.parallel.ai/v1/search |
| Ocp-Apim-Subscription-Key header | x-apikey header (or Microsoft Entra ID) | X-Subscription-Token header | x-api-key header |
| q | query | q | search_queries (array of short keyword queries), plus an optional objective sentence |
| count (default 10, max 50) | maxResults (default 10, max 50) | count (default 20, max 20) | advanced_settings.max_results (default 10, capped at 20) |
| offset | No offset parameter listed | offset (page index, max 9) | No offset; raise max_results or refine the queries |
| mkt or cc | region | country | advanced_settings.location (ISO country code) |
| setLang | language | search_lang and ui_lang | No separate parameter |
| freshness (Day, Week, Month, or a date range) | No date filter; Microsoft points news queries to its News API | freshness (pd, pw, pm, py, or a date range) | advanced_settings.source_policy.after_date |
| safeSearch (Off, Moderate, Strict) | safeSearch (off or strict; default strict) | safesearch (off, moderate, strict) | Not documented |
| site: operator inside q | site: and -site: inside query, or a named scope | site: inside q, or Goggles | source_policy.include_domains and exclude_domains |
| webPages.value[].snippet | webResults[].content (passages; no snippet field) | web.results[] | results[].excerpts |

Sources: Bing’s archived [v7 query parameters](https://learn.microsoft.com/en-us/previous-versions/bing/search-apis/bing-web-search/reference/query-parameters), the [Web IQ Web Search reference](https://learn.microsoft.com/en-us/web-iq/reference/web-search), Brave’s [Web Search docs](https://api-dashboard.search.brave.com/app/documentation/web-search/query), and Parallel’s [advanced search settings](https://docs.parallel.ai/search/advanced-search-settings).

The bigger change is query shape. Bing expected one keyword string per call and returned short snippets. Parallel’s Search API takes two or three short keyword queries plus an optional objective in one request and returns longer excerpts, so a migration is a good moment to let the model write those fields instead of passing the raw user question through. Our [web search API explainer](https://parallel.ai/learn/web-search-api) covers how these APIs differ from classic search endpoints.

## **Common migration challenges when switching from the Bing API**

Transitioning to a new search API involves more than swapping endpoints.

**Authentication changes.** Most alternatives use API keys rather than Azure credentials. Key management differs across providers, so review documentation for rotation policies and security practices.

**Response format adjustments.** JSON structures vary between providers. Field names, nesting patterns, and metadata differ from Bing's schema. Plan time for response parsing updates.

**Rate limiting.** Bing's rate limits may not match your new provider's thresholds. Test at expected query volumes before production deployment.

**Cost recalibration.** Pricing models differ. Run sample queries through your expected workload to estimate monthly costs accurately.

**Storage and display terms.** Check what each provider lets you keep. Web IQ’s terms bar caching or building a database from results, Grounding with Bing Search keeps outputs inside the agent, and SERP APIs pass through the terms of the engine they query. If your pipeline caches results or builds a dataset, confirm that the provider’s terms allow it before you switch.

Most migrations complete within a few days of focused work. The APIs serve similar functions, so the core integration logic remains intact.

## Which Bing Search API replacement should you choose?

- **You build agents in Microsoft Foundry and want Bing-backed answers:** use Grounding with Bing Search or the Foundry Web Search tool, and budget $14 per 1,000 transactions for Grounding.
- **You want Microsoft’s index as ranked results in your own code and don’t need to store them:** Web IQ Web Search at $7 per 1,000 calls is the nearest thing to the old API.
- **You need Google or Bing result pages as JSON for SEO or rank tracking:** SerpApi covers Bing as well as Google; Serper is the low-cost option for Google results.
- **You want an independent index with parameters close to Bing v7:** Brave Search API.
- **You feed an LLM or agent and care about cost per call and context quality:** Parallel Search API, from $1 per 1,000 requests in Turbo or Fast mode. Exa, Tavily, You.com, and Linkup target the same use case, so run your own queries through two or three of them before you commit.

## **Frequently asked questions about Bing API alternatives**

### **What is the exact deprecation date for the Bing Search API?**

Microsoft retired the Bing Search APIs on August 11, 2025. It decommissioned existing instances, closed new signups, and directed users toward Grounding with Bing Search in Azure AI Agents for continued Bing-powered functionality.

### **Can existing Bing API users get extended access after deprecation?**

Microsoft hasn't offered extended access beyond the deprecation date. Developers who haven't migrated have already lost service and need to move to an alternative now.

### What replaced the Bing Search API?

Microsoft’s named replacement is Grounding with Bing Search, which grounds agents in Microsoft Foundry and returns results to the model. Microsoft also offers Web IQ, a set of search APIs whose Web Search endpoint returns ranked results to your code. Outside Microsoft, Brave, SerpApi, Serper, Exa, Tavily, You.com, Linkup, and Parallel all sell search APIs that developers use in place of Bing.

### How much does Grounding with Bing Search cost?

Microsoft lists $14 per 1,000 transactions for both Grounding with Bing Search and Grounding with Bing Custom Search, with limits of 150 transactions per second and 1 million per day (checked November 22, 2026). Each tool call in an agent run counts as one transaction, and model usage is billed separately.

### Can I still call a Bing web search API directly?

Not under the Bing Search API name. The closest Microsoft option is Web IQ Web Search, which returns ranked results with passages at $7 per 1,000 calls. Its parameters differ from v7 (query, maxResults, region, language, safeSearch), and its terms bar storing results.

### **How do alternative search APIs handle rate limiting compared to Bing?**

Rate limits vary by provider and plan. As of November 22, 2026, Brave’s Search plan allows 50 queries per second, Serper’s 50,000-credit pack allows 50 per second, Web IQ starts production apps at 15 queries per second, and Parallel’s Build plan allows 600 Search requests per minute (1,500 on Scale). Grounding with Bing Search caps at 150 transactions per second. Test at your expected peak before switching.

### **Which Bing alternative offers the best free tier for developers?**

Serper gives 2,500 free queries, Linkup 4,000, Tavily 1,000 credits a month, Exa $10 in credits a month, Brave up to $20 in free calls a month, and Parallel up to $80 at signup plus $5 a month with a card on file (all checked November 22, 2026). Pick based on your expected volume and whether you need raw result pages or excerpts written for LLMs. Our [free search API comparison](https://parallel.ai/articles/best-free-web-search-api) covers each free tier in detail.

**Deeper comparisons: **[Brave Search API vs. Parallel](https://parallel.ai/compare/brave-vs-parallel) / [SerpApi vs. Parallel](https://parallel.ai/compare/serpapi-vs-parallel) / [Serper vs. Parallel](https://parallel.ai/articles/serper-vs-parallel) / [Parallel Search vs. SerpApi vs. Brave vs. Bing](https://parallel.ai/articles/parallel-vs-serpapi-vs-brave-vs-bing) / [Best web search APIs](https://parallel.ai/articles/best-web-search-api) / [What is a web search API?](https://parallel.ai/learn/web-search-api).

# The best free search APIs in 2026: web search and search engine APIs for AI agents

A free search API lets an app or AI agent query the web without a bill, but free tiers range from keyless MCP servers and monthly credits to one-time grants. This guide covers 14 free search engine APIs with limits checked November 22, 2026, the status of free Google and Bing search APIs, SERP versus index APIs, and which option fits each project.

## **Which free search API should you use?**

For an AI agent, the best free search API is usually one of these six. [Parallel MCP](https://parallel.ai/mcp) gives any MCP client web search and page fetch with no account, key, or card, and a Parallel API account with a card on file adds $5 in credits each month, enough for up to 5,000 Turbo or Fast searches. Keenable gives every organization 100,000 free requests a month on a free key. Tavily (1,000 credits a month), Exa ($10 a month plus a $10 signup bonus), and Linkup (topped back up to $20 a month) need no card at all. TinyFish makes search free up to its rate limits. If you want a search engine API that returns Google results as JSON, Serper and SerpApi have small free allowances. Google’s Custom Search JSON API is closed to new customers, and Microsoft retired the Bing Search APIs in August 2025.

Every free-tier figure below was checked against the vendor’s own pricing or documentation page on November 22, 2026, and each one links to its source.

## **What “free” actually means for a search API**

“Free tier” covers at least four different arrangements, and which one you’re offered matters more than the headline number.

### **Are the credits one-time or recurring?**

A signup grant is a fixed amount you use up once. A recurring monthly allowance refills, which is what you want for a personal agent or a side project that runs indefinitely. Several providers offer both, and pricing pages often blur the two. Most recurring allowances expire at month end rather than rolling over, so unused credit is gone.

### **Is a card required?**

A hard-capped free tier with no card on file can’t generate a bill. A credit-based free tier with a card attached can convert to metered billing the moment you pass the credit, and not every provider offers a spending cap that blocks requests. Parallel is one that doesn’t. Its [monthly spend limits](https://docs.parallel.ai/resources/faqs) email admins but never block requests. The two behave differently if your agent enters a retry loop at 3 a.m.

### **Which runs out first, credits or rate limits?**

Free tiers are usually throttled well below paid tiers. A plan with 1,000 monthly credits and two concurrent requests will bottleneck on concurrency long before you spend the credits. If you’re testing latency or building anything with parallel fan-out, check the rate limit before the credit figure. The table below lists both.

### **Where do the results come from?**

Some providers run their own web index. Others reformat a consumer search engine’s results as JSON. That SERP data is cheap and often excellent, but it depends on access to results that the search engine doesn’t offer through an official API, which adds continuity risk. That’s irrelevant for a weekend project and worth weighing for anything you plan to run for years.

### **What is the output shaped for?**

A free tier measured in requests tells you nothing about how many requests a question needs. APIs that return 20-word snippets built for people force your model to fetch each page separately, so one question can cost five calls. APIs that return dense, query-relevant excerpts often answer in one. Compare providers on cost per answer.

## **The 14 best free search engine APIs in 2026**

### **1. Parallel Search API**

The [Parallel Search API](https://parallel.ai/products/search) is built for AI agents rather than people reading a results page. It runs on Parallel’s own web index, which [holds billions of pages and adds or updates millions daily](https://parallel.ai/products/search), and returns ranked results with dense, query-relevant excerpts instead of short snippets. There are three ways to use it for free, and they stack:

- **A free hosted MCP server.** Point any MCP client at `https://mcp.parallel.ai/mcp` and [Parallel MCP](https://parallel.ai/mcp) gives your agent web search, page fetch, and typed-question answers right away. It needs no account, API key, or card, and anonymous use is free at lower rate limits.
- **A signup credit.** New accounts at [platform.parallel.ai](https://platform.parallel.ai) can [earn up to $80 in credits at signup](https://parallel.ai/pricing), which you can spend across Parallel’s APIs.
- **$5 in free credits every month.** Eligible organizations with a card on file get [$5 in credits each month](https://parallel.ai/blog/free-tier-parallel), spent before any paid balance. [Usage past the $5 is billed to that card at standard rates](https://parallel.ai/blog/free-tier-parallel). Unused credit expires at month end, it’s one credit per organization, and marketplace and postpaid organizations aren’t eligible.

The Search API has [four modes](https://docs.parallel.ai/search/modes): Turbo (about 200ms, $1 per 1,000 requests), Fast (about 700ms, $1 per 1,000, and the mode the docs suggest starting with), Basic (about 1s, $5 per 1,000), and Advanced (about 3s, $5 per 1,000, and the default). Each request includes 10 results, and [extra results cost $1 per 1,000](https://docs.parallel.ai/getting-started/pricing). Turbo supports English and Japanese only.

Parallel Web Systems is [SOC 2 Type II certified](https://docs.parallel.ai/resources/faqs), and zero data retention is included on the Scale plan (as Hybrid ZDR) and set per contract on Enterprise. The [Search API quickstart](https://docs.parallel.ai/search/search-quickstart) takes a few minutes end to end.

### **2. Tavily**

Tavily’s free Researcher plan gives [1,000 API credits a month with no credit card](https://www.tavily.com/pricing). A basic search costs 1 credit and an advanced search 2, so that’s 500 to 1,000 searches. [Credits reset on the first of each month](https://docs.tavily.com/documentation/api-credits), and requests stop when they run out. Development keys are limited to [100 requests per minute](https://docs.tavily.com/documentation/rate-limits). Paid usage costs $0.008 per credit pay-as-you-go, and monthly plans bring that down to between $0.0075 and $0.005.

### **3. Exa**

Exa gives new accounts a [$10 onboarding bonus plus $10 in credits every month, with no payment method required](https://exa.ai/pricing). The free plan allows 10 search queries per second. Exa lists Search at $4 per 1,000 requests in Lite and $7 in Auto, so $10 covers about 1,400 to 2,500 searches a month.

### **4. TinyFish**

TinyFish makes its [Search and Fetch APIs free](https://www.tinyfish.ai/pricing), with no card required. Search is limited to 30 requests a minute and 500 an hour, which matches the 12,000 free searches a day its docs list before requests need a wallet balance. Fetch is limited to 150 URLs a minute and 1,000 a day. Requests need an [API key](https://docs.tinyfish.ai/search-api), so you do sign up. On the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), TinyFish Search scores 71 at a measured search cost of $0. The rate limits are the main constraint for anything with fan-out. [TinyFish vs. Parallel](https://parallel.ai/articles/tinyfish-vs-parallel) compares the two in detail.

### **5. Keenable**

[Keenable](https://keenable.ai/pricing) runs search and fetch on its own index, and every organization with an API key gets 100,000 free requests a month. The free key needs no card, and past the allowance pay-as-you-go costs $4 per 1,000 requests. You can also skip the key: keyless calls are free at [1,000 requests an hour and 10 a second per IP address](https://docs.keenable.ai/rate-limits), and a key lifts the hourly cap and gives your organization 10 requests a second. [Keenable vs. Parallel](https://parallel.ai/articles/keenable-vs-parallel) covers where the two differ.

### **6. Firecrawl**

Firecrawl’s [free plan](https://www.firecrawl.dev/pricing) gives 1,000 credits a month with no card and 2 concurrent requests. Search costs 2 credits per 10 results, so the plan covers about 500 searches, or 1,000 scraped pages. On the free plan, [/search is limited to 10 requests a minute](https://docs.firecrawl.dev/rate-limits). Since June 2026 Firecrawl also offers [Keyless](https://www.firecrawl.dev/blog/firecrawl-keyless-launch): search and scrape with no account or key, capped per IP address per day. Firecrawl Search scores 73 on the Artificial Analysis Search Index.

### **7. Serper**

Serper gives [2,500 free queries with no credit card](https://serper.dev/). After that, credits come in prepaid packs that stay valid for six months. The $50 pack buys 50,000 queries ($1.00 per 1,000), and the rate falls to $0.30 per 1,000 only at the $3,750 pack of 12.5 million. What you get is Google results as JSON. The free grant is one-time, and like every Google SERP API, Serper depends on access to Google’s results that Google doesn’t offer through an official API, which adds continuity risk. For agent workloads, [Serper vs. Parallel](https://parallel.ai/articles/serper-vs-parallel) compares the two side by side.

### **8. Linkup**

Linkup [credits $20 when you sign up with a professional email and tops eligible accounts back up to $20 each month](https://docs.linkup.so/pages/documentation/development/pricing). Its pricing page frames that as [4,000 free queries](https://www.linkup.so/pricing), since standard search costs $5 per 1,000. SOC 2 Type II is included on all plans, and zero data retention is [available on request](https://docs.linkup.so/pages/security-and-privacy/data-processing-privacy). The default rate limit is [10 queries per second per organization](https://docs.linkup.so/pages/documentation/platform/rate-limits). Linkup also published [its SimpleQA evaluation script](https://github.com/LinkupPlatform/eval-simpleQA), so you can rerun its accuracy claim yourself.

### **9. Brave Search API**

In February 2026 Brave [replaced its free plan with $5 in monthly credits](https://brave.com/blog/most-powerful-search-api-for-ai/) on each plan. Its API page advertises up to $20 in free calls a month, which is $5 on each of four plans (Search, Answers, Spellcheck, and Autocomplete), and only the Search plan’s credit buys web results. To claim the credit, you attribute Brave Search API on your project’s website or about page. Brave [asks for a card at signup to prevent abuse](https://brave.com/search/api/) and sells prepaid credits, so you’re charged only for credits you choose to buy. Every result comes from Brave’s own independent index, with no fallback to another search engine. The Search plan costs $5 per 1,000 requests at up to 50 requests per second, so the credit covers about 1,000 searches a month.

### **10. SerpApi**

SerpApi’s [free plan](https://serpapi.com/pricing) gives 250 searches a month, with throughput of 50 searches an hour. It’s the smallest allowance here, enough to test the output format and a handful of real queries before you pay.

### **11. Jina Search**

Jina’s [s.jina.ai endpoint](https://jina.ai/reader/) searches the web and returns the results as LLM-friendly text. It needs an API key, and every new key comes with 10 million free tokens. Each search costs a fixed number of tokens, starting from 10,000, so the grant covers up to about 1,000 searches, at 100 requests a minute on a free key.

### **12. LangSearch**

LangSearch’s [free plan](https://langsearch.com/pricing) is its only plan: web search at $0 with a daily token allowance, up to 50 results per request, full page text, and date and domain filters, with no card required. Usage is counted in tokens (your query plus the returned content), so asking for full page text spends the allowance faster than snippets do. New accounts start at 5 requests per second, and the allowance resets at 00:00 UTC. The pricing page doesn’t print the daily token figure, so check your dashboard before you size a workload on it. It also runs a hosted MCP server that authenticates with your API key.

### **13. Google Custom Search JSON API**

The [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) was the historical default: 100 queries a day free, $5 per 1,000 after that, up to 10,000 a day. It’s closed to new customers, and existing customers have until January 1, 2027 to move. Google calls Vertex AI Search (since renamed Agent Search) “a favorable alternative for searching up to 50 domains” and asks teams that need full web search to contact it. If you don’t already have a key, you can’t use this one.

### **14. Self-hosted SearXNG**

[SearXNG](https://docs.searxng.org/dev/search_api.html) is a self-hosted metasearch engine with no per-query cost. If “free” means “no invoice,” it’s the only entry that fully qualifies. You run the server and own the reliability. Results come from public engines, so you inherit their rate limiting and blocking, and there’s no SLA or support. JSON output has to be enabled in settings.yml, or the API returns a 403, and many public instances leave it off. It suits privacy-sensitive internal tools and experiments that can tolerate failure.

## **Is there a free Google or Bing search API?**

Not as a general web search API for new projects, as of November 22, 2026. Google’s [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) is closed to new customers and ends for existing ones on January 1, 2027, and Microsoft [retired the Bing Search APIs on August 11, 2025](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement). Both companies now give developers live web results through grounding tools on their AI platforms, and Google offers site search through Agent Search. The details below come from Google’s and Microsoft’s own documentation.

### **Google’s search APIs in November 2026**

The [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) returns web and image results from a Programmable Search Engine as JSON, and for years it was the default free option: 100 queries a day free, then $5 per 1,000 up to 10,000 a day. Those terms now apply only to existing customers, until the service ends on January 1, 2027.

For searching your own sites, Google points to Agent Search, which it [renamed from Vertex AI Search](https://docs.cloud.google.com/generative-ai-app-builder/docs/release-notes) and describes as an alternative for up to 50 domains. [Agent Search pricing](https://cloud.google.com/generative-ai-app-builder/pricing) includes a free trial of 10,000 queries per account per month, then $1.50 per 1,000 queries on Standard Edition or $4.00 on Enterprise Edition, which adds generated answers. Teams that need full web search are asked to [contact Google](https://docs.google.com/forms/d/e/1FAIpQLSfYcIpOzj57MoetWyeFpJf9Cf4yezG5HDq3VsqbJhlngp5pXw/viewform).

For live web results inside a model call, [Grounding with Google Search](https://aistudio.google.com/docs/google-search) connects Gemini to Google Search. The model writes and runs the queries, then returns an answer with inline citations and search suggestions, drawing on Google’s index and freshness with one tool setting. On the Gemini Developer API paid tier, Gemini 3 and newer models share [5,000 free search requests a month](https://aistudio.google.com/docs/pricing), then $14 per 1,000, with a default cap of 1,500 a day per project. The free tier lists grounding as not available for Gemini 3 and newer models, while Gemini 2.5 Flash and Flash-Lite include 500 grounded requests a day. Because it returns a Gemini answer with citations, it fits best when Gemini is already your model.

### **What replaced the Bing Search APIs**

Microsoft [retired the Bing Search APIs on August 11, 2025](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) and decommissioned existing instances, so the standalone APIs are gone for new and existing projects alike. The retirement notice points developers to Grounding with Bing Search in Azure AI Agents, which lets agents use real-time public web data when they generate responses.

### **Free ways to get Google results as JSON**

Third-party SERP APIs return Google’s results page as JSON, and each has a free allowance: Serper gives 2,500 queries once, SerpApi 250 searches a month, and SearchApi [100 free requests at signup with no card](https://www.searchapi.io/pricing). These services collect results from Google’s public results pages without an official Google API behind them, so read each provider’s terms and legal coverage before you build on one. If you need web results for an AI agent rather than Google’s ranking specifically, free tiers from Parallel, Keenable, Tavily, Exa, TinyFish, and Firecrawl return content shaped for a model.

## **Free tiers side by side**

Checked against each vendor’s pricing and documentation pages on November 22, 2026.

| Provider | What’s free | Card required | Free rate limit | Refills |
| --- | --- | --- | --- | --- |
| Parallel | Hosted MCP server (no account), up to $80 to earn at signup, $5/month | Only for the monthly credit | Lower limits for anonymous MCP use. API: 600 Search requests/min (default for all accounts) | Monthly |
| Tavily | 1,000 credits/month | No | 100 requests/min (development key) | Monthly |
| Exa | $10 at signup, then $10/month | No | 10 queries/sec | Monthly |
| TinyFish | Search and Fetch | No (API key required) | Search: 30/min, 500/hour (12,000/day free) | Ongoing |
| Keenable | 100,000 requests/month with a free key, or keyless use | No | Keyless: 1,000/hour and 10/sec per IP. With a key: 10/sec | Monthly |
| Firecrawl | 1,000 credits/month, or Keyless with no account | No | 2 concurrent, /search 10/min | Monthly (Keyless daily) |
| Serper | 2,500 queries | No | Not stated for free queries (paid packs from 50/sec) | One-time |
| Linkup | $20 at signup, topped up to $20/month (about 4,000 searches) | No | 10 queries/sec | Monthly |
| Brave | $5/month credit per plan with attribution (about 1,000 searches on Search) | Yes, to prevent abuse (prepaid credits only) | 50 requests/sec | Monthly |
| SerpApi | 250 searches/month | Not stated | 50 searches/hour | Monthly |
| Jina (s.jina.ai) | 10 million tokens per new key (about 1,000 searches) | Not stated | 100 requests/min | One-time |
| LangSearch | Daily token allowance, all features | No | 5 requests/sec for new accounts, plus token limits | Daily |
| Google Custom Search | 100 queries/day, closed to new customers, ends January 1, 2027 | For overage | 10,000 queries/day | Daily |
| SearXNG | Unlimited, self-hosted | No | Set by you and upstream engines | N/A |

Check official documentation for current pricing.

## **Search engine API, SERP API, or AI search API: which kind do you need?**

“Search engine API” covers several different products, and the free tiers above mix them. A [web search API](https://parallel.ai/learn/web-search-api) built for agents returns pages and excerpts from the provider’s own index, a SERP API returns another engine’s results page as JSON, and a grounding tool returns a model-written answer with citations.

| Type | What a call returns | Examples in this guide | Fits |
| --- | --- | --- | --- |
| Index API for agents | Ranked URLs with excerpts or page text from the provider’s own index | Parallel, Keenable, Exa, Linkup, Brave | Agents and RAG that need content a model can read |
| SERP API | A search engine’s results page as JSON: titles, links, snippets, and SERP features | Serper, SerpApi, SearchApi | Rank tracking, SEO tools, and apps that need Google’s ranking |
| Grounding tool | A model-written answer with citations | Grounding with Google Search, Grounding with Bing Search | Apps already built on Gemini or Azure AI agents |
| Self-hosted metasearch | Aggregated results from public engines | SearXNG | Internal tools and experiments |

Billing units differ too. SerpApi counts one search per response whether it returns 100 results or none, while Parallel includes 10 results per request and charges $1 per 1,000 for extras, so compare what a single call returns before you compare allowances.

## **Rate limits, commercial use, and other terms to check**

A free allowance is only usable if its terms fit your project. These terms differ most between providers, as of November 22, 2026:

- **Attribution.** Brave’s monthly credit requires attributing Brave Search API on your project’s website or about page, per its [February 2026 announcement](https://brave.com/blog/most-powerful-search-api-for-ai/).
- **Display requirements.** Grounding with Google Search returns search suggestions with each grounded answer, and Google’s documentation points to the [Gemini API terms](https://aistudio.google.com/docs/terms) for how to show them.
- **Per-IP limits.** Firecrawl Keyless and Keenable limit keyless calls per IP address, so every agent behind one office network or CI runner shares one allowance. Parallel MCP runs keyless calls at lower limits, and [calls past the free limit are rate limited with nothing billed](https://parallel.ai/mcp).
- **Legal coverage for SERP data.** SerpApi’s U.S. Legal Shield covers up to $2 million for the scraping and parsing of search engine data on its [Production plan and up](https://serpapi.com/pricing), and SearchApi lists a Legal Protection Guarantee, backed by up to $2 million, on its [Production plan and up](https://www.searchapi.io/pricing). Neither free plan includes it.
- **Data retention.** Parallel includes Hybrid zero data retention on its [Scale plan](https://parallel.ai/pricing), Exa offers it on an Enterprise plan with a $12,000 annual commitment, and Linkup enables it on request.
- **Compliance scope.** Parallel’s SOC 2 Type II covers its Build, Scale, and Enterprise plans but not the keyless MCP tier, and Linkup includes SOC 2 Type II on all plans.

## **How do you add free web search to an agent without an API key?**

Three options on this list work with no account at all: Firecrawl Keyless, Keenable’s keyless tier, and [Parallel MCP](https://parallel.ai/mcp). The Parallel server is a hosted, streamable-HTTP MCP server at https://mcp.parallel.ai/mcp. Without a key it exposes four web tools, free at lower rate limits:

- **web_search** searches the web and returns excerpts that usually hold enough to answer the question. It runs the Search API in Fast mode by default.
- **web_fetch** reads specific URLs and returns the relevant parts of each page, or the full page as markdown.
- **web_decisions** answers typed questions (a probability, a pick among options, or a score) and cites its sources.
- **image_search** finds images on the web and returns direct image URLs with the page each appears on. Calls without a key use fast mode.

A fifth tool, web_research, answers a single question with citations in one call. It needs you to sign in or use an API key. For Claude Code or Codex, adding the server is one command:

```sh
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

```sh
codex mcp add parallel --url https://mcp.parallel.ai/mcp
```

For clients configured through JSON, the entry is a few lines:

```json
{
  "mcpServers": {
    "parallel": {
      "type": "http",
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

[parallel.ai/mcp](https://parallel.ai/mcp) has one-click installs for Claude, ChatGPT, Cursor, VS Code, Grok Bot, Antigravity, OpenCode, and Hermes, plus a setup prompt you can paste into any other agent. Cursor users can also add it from the [Cursor Marketplace](https://cursor.com/marketplace/parallel). The [installation docs](https://docs.parallel.ai/integrations/mcp/installation) cover other clients, including Gemini CLI, Windsurf, and Zed.

For higher rate limits, create an account at [platform.parallel.ai](https://platform.parallel.ai) and send your API key as a Bearer token, or connect to https://mcp.parallel.ai/mcp?login to sign in over OAuth. Signed-in calls are [billed at the same rates as the underlying API](https://docs.parallel.ai/integrations/mcp/quickstart), so they draw on your signup and monthly credits, and they can pin a search mode, a result count, or domain filters through the x-parallel-mcp-config header. For production traffic, call the Search API directly, where you choose the mode, the result count, and the cost per request.

## **How do Parallel’s four search modes change the free-tier math?**

Parallel sells four search modes at two prices, so spend can match what a query is worth.

| Mode | Latency | Price | Built for |
| --- | --- | --- | --- |
| Turbo | ~200ms | $1 / 1,000 requests | Chat, voice, RAG pre-filtering, high-volume lookups |
| Fast | ~700ms | $1 / 1,000 requests | Most agent loops (the docs’ recommended starting mode) |
| Basic | ~1s | $5 / 1,000 requests | Quick retrieval with longer excerpts per result |
| Advanced | ~3s | $5 / 1,000 requests | Highest-quality, multi-hop results (the default) |

If price brought you here, look at Turbo and Fast. On [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (evals run September 9, 2026), with a GPT-5.6 Luna agent at the low-cost tier, Fast scored 94% on a 100-question sample of SimpleQA Verified and Turbo 91%, both at a total cost of $2 per 1,000 questions, including model tokens and tool calls, against 94% at $5.50 for Perplexity and 94% at $17.40 for Tavily. Those are Parallel’s own runs, so run your own evaluation on your own queries before you commit.

The independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (latest data November 19, 2026) runs the same GPT-5.6 Luna answer model against every provider and changes only the search API. Parallel Search (advanced) ranks #1 at 83, and Fast scores 82, ahead of Exa (auto, dynamic highlights) and Perplexity Search (medium) at 80 and Octen at 77. Fast’s search cost was $4.63 per 1,000 benchmark tasks, the lowest of any paid provider measured, and TinyFish, which is free, measures $0. Counting the answer model’s tokens as well, Fast comes to about $14.03 per 1,000 tasks, against about $8.62 for TinyFish, which scores 71, and $23.57 for Octen. Firecrawl Search scores 73.

## **How far does $5 a month go on Parallel?**

Parallel prices per request, so the monthly credit turns into a number you can plan against. At [current prices](https://docs.parallel.ai/getting-started/pricing), $5 covers up to:

- 5,000 searches in Turbo or Fast mode, or 1,000 in Basic or Advanced
- 5,000 Extract API requests
- 1,000 Task API runs on the lite processor
- 1,666 Monitor API executions on the lite processor

Or any mix. 5,000 searches a month is about 165 a day, enough for a personal research agent, a Slack bot, or a monitoring job. You pay only for successful Task runs, so a broken query doesn’t eat the allowance. Free credit is spent before paid balance, so adding a card doesn’t make you pay sooner. It decides what happens once the free credit is gone. Usage past the $5 is billed to the card at standard rates, and Parallel’s monthly spend limits email admins but don’t block requests.

## **Which free option fits your project?**

- **You want web search in your coding agent in the next minute.** Parallel MCP, or Firecrawl Keyless. No key needed.
- **You’re prototyping and want to avoid an invoice.** Tavily, Exa, or TinyFish. None of them needs a card.
- **You need a large monthly volume without paying.** TinyFish, at up to 12,000 searches a day within its per-minute limits, or Keenable, at 100,000 requests a month on a free key.
- **You need Google’s ranking.** Serper, with 2,500 free queries and $1.00 per 1,000 on its $50 pack. It returns Google’s ranking as JSON, so check its terms for your use case.
- **The free tier is a trial for something headed to production.** Evaluate the paid path: the mode you’ll ship, the rate limits you’ll need, and whether SOC 2 and zero data retention are included or an enterprise add-on.
- **Volume is high and per-query cost decides the build.** Parallel Turbo or Fast at $1 per 1,000 requests. Measure cost per answer rather than cost per request.
- **You can’t spend money and can run infrastructure.** Self-hosted SearXNG, with clear eyes about reliability.

## **Frequently asked questions about free search APIs**

### **Is there a web search API that’s free with no credit card and no signup?**

Three. The Parallel MCP server at https://mcp.parallel.ai/mcp needs neither, Firecrawl Keyless is capped per IP address per day, and Keenable’s keyless tier allows 1,000 requests an hour per IP address. Tavily, Exa, TinyFish, Keenable (with a key), LangSearch, Linkup (with a professional email), Firecrawl’s free plan, and Serper need an account but no card. Brave asks for a card to prevent abuse and charges only for prepaid credits you choose to buy. Parallel’s $5 monthly credit needs a card on file.

### **Is there a free search engine API?**

Yes, several. Most search engine APIs built for AI agents have a free tier, including Parallel, Keenable, Tavily, Exa, TinyFish, Firecrawl, Linkup, and LangSearch, and Brave includes a $5 monthly credit. For Google’s results specifically, the free options are third-party SERP APIs with small allowances: Serper, SerpApi, and SearchApi. SearXNG is free to self-host if you run the server.

### **Can I run a production application on a free tier?**

Rate limits usually rule it out before credit caps do. Free tiers are throttled, with low concurrency and no SLA, because they’re built for evaluation and hobby use. Monthly credits can carry a low-volume production job, such as a monitoring task or an internal bot, but anything user-facing will hit the rate limit first.

### **What happened to the free Bing and Google search APIs?**

Microsoft [retired the Bing Search APIs on August 11, 2025](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) and points developers to Grounding with Bing Search in Azure AI Agents. Google’s [Custom Search JSON API](https://developers.google.com/custom-search/v1/overview) is closed to new customers and ends on January 1, 2027. Both historical free defaults for web search are gone.

### **Do free credits roll over if I don’t use them?**

Mostly not. Parallel’s $5 monthly credit expires at month end, and Tavily’s credits reset on the first of the month. Linkup tops your balance back up to $20 rather than adding $20 on top. Serper’s paid credits stay valid for six months. Assume no rollover unless a provider says otherwise in writing.

### **What’s the cheapest paid web search API once the free tier runs out?**

By list price per request, Parallel Turbo and Fast at $1 per 1,000 are the lowest paid rate in this guide among APIs that run their own index. Serper starts at $1.00 per 1,000 and reaches $0.30 only on its $3,750 pack. Cost per task is the better measure, because it also counts the model tokens each search adds, so compare providers on a sample of your own workload. The Artificial Analysis Search Index (latest data November 19, 2026) counts both. On that basis TinyFish’s free tier costs about $8.62 per 1,000 tasks, Parallel Fast about $14.03, Octen about $23.57, and Parallel Turbo about $25.42 in its August run. Serper isn’t on that index.

### **How do I move from the free MCP server to the API?**

Create an account, generate a key, and call the Search endpoint directly. The [quickstart](https://docs.parallel.ai/search/search-quickstart) covers it in a few minutes. You keep the same index and excerpt format, and gain mode selection, result-count control, and higher rate limits. Full rates are on the [pricing page](https://parallel.ai/pricing).

### **Can the OpenAI API search the web?**

Yes. OpenAI’s Responses API has a built-in web search tool, priced at [$10 per 1,000 calls plus search content tokens at model rates](https://platform.openai.com/docs/pricing) as of November 22, 2026, with no separate free allowance listed. Claude and Gemini have their own built-in search tools, and any model that supports tool calls or MCP can use one of the free search APIs in this guide instead.

**Related reading: **[The honest 2026 comparison: web search APIs for AI agents](https://parallel.ai/articles/the-honest-2026-comparison-web-search-apis-for-ai-agents) / [Tavily vs. Parallel](/compare/tavily-vs-parallel) / [Exa vs. Parallel](https://parallel.ai/compare/exa-vs-parallel) / [Brave Search API vs. Parallel](https://parallel.ai/compare/brave-vs-parallel) / [The best Exa alternatives](https://parallel.ai/articles/exa-alternatives) / [What is a web search API?](https://parallel.ai/learn/web-search-api) / [Keenable vs. Parallel](https://parallel.ai/articles/keenable-vs-parallel) / [SerpApi vs. Parallel](https://parallel.ai/compare/serpapi-vs-parallel)

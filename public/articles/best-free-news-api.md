# Best free news APIs for developers and AI agents in 2026

Picking a free news API comes down to four limits that pricing pages bury: how late articles arrive, how far back you can search, whether you can ship commercially, and how much text you get. This guide covers seven dedicated news APIs, what replaced Bing News Search, four web search APIs with date filters, and which one fits your project.

The best free news API depends on whether you're building a news product or giving an AI agent current information. For a structured headline feed, Currents and NewsData.io have the most usable free tiers as of November 2026, because both allow some commercial use. For an agent that needs recent, LLM-ready text from news sites and everywhere else, a web search API with date filters usually fits better.

## Free news API tiers compared (checked November 22, 2026)

Every number below comes from the provider's own pricing page or docs on November 22, 2026. Free tiers change often, so confirm before you build on one.

| Provider | Free allowance | Freshness on free | History on free | Commercial use on free | Card needed |
| --- | --- | --- | --- | --- | --- |
| [NewsAPI.org](https://newsapi.org/pricing) | 100 requests/day | 24-hour delay | Up to 1 month | No, development only | No |
| [GNews](https://gnews.io/pricing) | 100 requests/day, up to 10 articles each | 12-hour delay | Last 30 days | No | No |
| [NewsData.io](https://newsdata.io/pricing) | 200 credits/day, up to 10 articles each | 12-hour delay | Past 48 hours | Not restricted on the pricing page | No |
| [Currents](https://currentsapi.services/en/product/price) | 250 requests/day, 20 results each | No plan delay | Last 30 days | Yes, with attribution and a source link | No |
| [TheNewsAPI](https://www.thenewsapi.com/pricing) | 100 requests/day, 3 articles each | Real time listed | Historical listed | Not stated | No |
| [Mediastack](https://mediastack.com/pricing) | 100 calls/month | Delayed | Not included | No | Not stated |
| [NewsAPI.ai](https://newsapi.ai/free-news-api) (Event Registry) | 2,000 tokens, one time | Current (last 30 days) | Archive not included | Evaluation only | No |
| [Parallel Search](https://docs.parallel.ai/getting-started/pricing) | Up to $80 in credits plus $5/month (card on file) | Live web index | Date filter (`after_date`) | Standard API terms | For the monthly credit |
| [Exa](https://exa.ai/pricing) | $10/month plus $10 signup bonus | Live web index | Date filters | Standard API terms | No |
| [Tavily](https://www.tavily.com/pricing) | 1,000 credits/month | Live web index | Date filters | Standard API terms | No |
| [Brave Search API](https://brave.com/search/api/) | $5 in credits/month | Live news endpoint | Date filters | Standard API terms | Yes, to prevent abuse |

## What "free" means for a news API

A news API free tier is limited on four axes, and the request count is usually the least important.

**Delay.** NewsAPI.org's Developer plan serves articles 24 hours late. GNews and NewsData.io delay free results by 12 hours. If you're building alerts or giving an agent "what happened today," a delayed feed answers a different question than the one you asked.

**History.** Free tiers reach back between 48 hours (NewsData.io) and about a month (NewsAPI.org, GNews, Currents). Backtesting a model or studying how a story developed requires a paid archive on every dedicated news API in this list.

**Commercial terms.** This is the one that catches teams at launch. NewsAPI.org's free plan [may only be used](https://newsapi.org/pricing) in a development environment, not staging or production. GNews and Mediastack limit their free plans to non-commercial use. Currents allows commercial use on every self-service plan, including Free, with attribution and a link to the original article.

**Article text.** Most free tiers return a headline, a description, and a truncated snippet. GNews cuts free content to 250 characters, Currents returns a 300-character preview, and NewsAPI.org doesn't provide full content on any plan. For an LLM, that snippet is often too thin to answer from, so you end up fetching each article page yourself.

## The dedicated news APIs

### NewsAPI.org

NewsAPI.org is the one most tutorials use, and its Developer plan is fine for exactly that: 100 requests a day, live top headlines, and article search up to a month old, with a 24-hour delay on articles. It can't go to production. The next step up, Business, is $449 a month for 250,000 requests, real-time articles, and five years of search history.

### GNews

GNews covers 80,000+ sources and gives free accounts 100 requests a day with up to 10 articles each, a 12-hour delay, 30 days of history, and content cut to 250 characters. Its FAQ draws a clear line on commercial use: building and testing an integration that isn't live yet counts as non-commercial, and anything that earns revenue needs a paid plan. Essential costs €49.99 a month for 1,000 requests a day, real-time articles, full content, and history back to 2020, and each paid plan starts with a 10-day trial.

### NewsData.io

NewsData.io has the largest daily free allowance in article terms: 200 API credits a day, each returning up to 10 articles, so up to 2,000 articles a day. Free results are delayed 12 hours and reach back only 48 hours. The free plan includes AI tags and sentiment analysis, which few competitors offer at $0. Its pricing page doesn't limit the free plan to non-commercial use, though full article content and the archive start on paid plans at $199.99 a month.

### Currents

Currents has the most production-friendly free tier among dedicated news APIs. You get 250 requests a day with 20 results each and 30 days of history, and its pricing page says newly indexed stories reach every tier without an artificial plan delay. Commercial use is allowed on Free with attribution and a link to the source; AI summaries or republishing article text need separate terms. Two limits to plan around: free responses carry a 300-character text preview, and a single search can span at most 7 days. The Builder plan is $69 a month for 2,500 requests a day and six months of history.

### TheNewsAPI

TheNewsAPI's free plan allows 100 requests a day but returns only 3 articles per request, which makes it better for checking a few headlines than for building a feed. The pricing page lists real-time and historical data on the free tier. It doesn't state commercial terms for the free plan, so ask before you ship on it. Basic is $19 a month for 2,500 requests a day and 25 articles per request, the cheapest paid entry point here.

### Mediastack

Mediastack's free plan is the smallest: 100 calls a month, delayed news, 13 languages, and non-commercial use only. It's enough to try the response format. Standard, at $24.99 a month, adds live data, historical data, and commercial use for 10,000 calls.

### NewsAPI.ai (Event Registry)

NewsAPI.ai, run by Event Registry, takes a different approach to free access. Instead of a daily quota, you get a one-time grant of 2,000 tokens that doesn't expire. One search over the last 30 days costs one token and returns up to 100 articles. Its strength is structure: beyond articles it clusters coverage into events and offers entity, sentiment, and category annotations. The free plan is meant for evaluation, allows up to 5 simultaneous requests, and excludes the archive back to 2014. Paid plans start at $90 a month for 5,000 searches.

## What happened to the Bing news API?

Microsoft [retired all Bing Search APIs](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) on August 11, 2025, including the Bing News Search API. Existing instances were decommissioned and new signups closed. Microsoft points developers to Grounding with Bing Search in Azure AI Agents, which feeds web results into a model's answer rather than returning a raw news feed. If you're migrating an old Bing News integration, the closest drop-in shapes are Brave's news endpoint or one of the dedicated news APIs above.

## Web search APIs with date filters

A different route is to skip the news-only index and use a web search API with recency controls. You lose some of the structure (categories, country codes, sentiment tags) and gain coverage beyond news publishers: company blogs, press releases, regulatory filings, changelogs, and forum threads, which is often where a story starts. Results also come back shaped for a model, with longer excerpts rather than a one-line description.

### Parallel Search

[Parallel's Search API](https://parallel.ai/products/search) takes a natural-language `objective` plus short keyword `search_queries` and returns ranked URLs with excerpts written for an LLM's context window. For news work, two controls matter. The `source_policy` object, set inside `advanced_settings`, takes `include_domains` and `exclude_domains` (domains or domain/path prefixes, up to 200 entries combined) and `after_date`, the earliest publication date to return in `YYYY-MM-DD` format. Results include a `publish_date` field when one is detected. The [source policy docs](https://docs.parallel.ai/search/source-policy) cover the details.

```bash
curl https://api.parallel.ai/v1/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "objective": "Recent funding rounds and acquisitions announced by vector database companies",
    "search_queries": ["vector database funding", "vector database acquisition"],
    "mode": "fast",
    "advanced_settings": {
      "source_policy": {
        "include_domains": ["techcrunch.com", "reuters.com", "businesswire.com"],
        "after_date": "2026-11-01"
      }
    }
  }'
```

The docs suggest using domain filters only when you need them, and steering toward preferred sources in the `objective` otherwise, since a tight allowlist can hide relevant pages. Fast mode costs $1 per 1,000 requests with 10 results each. New accounts get up to $80 in free credits plus $5 a month with a card on file, and the [Parallel MCP](https://parallel.ai/mcp) server gives any MCP client web search and fetch for free with no API key. For recurring alerts, the Monitor API runs a natural-language query on a schedule (hourly, daily, or weekly) and posts new events with citations to a webhook, at $3 to $10 per 1,000 checks.

### Exa

Exa's search endpoint accepts `category: "news"` to focus on news content, plus `startPublishedDate` and `endPublishedDate` filters. The free plan gives $10 in credits every month on top of a $10 onboarding bonus, with no payment method required and 10 queries per second. Lite search costs $4 per 1,000 requests, so the monthly credit covers about 2,500 Lite searches. Exa also sells a separate Monitors product for scheduled searches with webhooks.

### Tavily

Tavily has a dedicated `topic: "news"` mode that Tavily describes as useful for real-time updates on politics, sports, and major current events from mainstream outlets. It supports `time_range` (day, week, month, year), `start_date` and `end_date`, and returns a `published_date` automatically in news mode. The free Researcher plan includes 1,000 API credits a month with no card required.

### Brave

Brave runs a separate [News Search endpoint](https://api-dashboard.search.brave.com/app/documentation/news-search/get-started) on its own independent index. The `freshness` parameter accepts the last 24 hours (`pd`), 7 days (`pw`), 31 days (`pm`), a year (`py`), or a custom date range. The Search plan includes $5 in free credits each month and costs $5 per 1,000 requests at up to 50 queries per second. Brave asks for a card at signup to prevent abuse and charges only for prepaid credits you choose to buy.

## News API vs. web search API

|  | Dedicated news API | Web search API with date filters |
| --- | --- | --- |
| Sources | Curated news publishers | Whole web, including blogs, filings, and press releases |
| Structure | Categories, countries, languages, sometimes sentiment and events | Title, URL, date, excerpts |
| Text returned on free tiers | Headline plus a short snippet | Longer excerpts sized for an LLM |
| Recency control | Built-in latest feeds | Date filters you set per request |
| Best for | Headline feeds, news apps, dashboards | Agents, research, company and market monitoring |

## Which should you choose?

**You're building a news app or headline widget and want to launch on a free tier.** Start with Currents. It allows commercial use with attribution, has no plan delay, and gives you 250 requests a day. NewsData.io is the alternative if you want more articles per day and can live with a 12-hour delay.

**You're prototyping and will pay once it works.** NewsAPI.org and GNews both have clean docs and plenty of examples. Budget for the jump: GNews starts at €49.99 a month and NewsAPI.org at $449.

**You need events, entities, or sentiment on top of articles.** NewsAPI.ai's event clustering and annotations are the most structured output here. NewsData.io includes sentiment on its free tier.

**Your AI agent needs current facts to answer questions.** Use a web search API with a date filter. News is one source among many for an agent, and excerpts sized for a model save a fetch per article. Parallel Search, Exa, Tavily, and Brave all have monthly free credits. Our comparison of [free web search APIs](https://parallel.ai/articles/best-free-web-search-api) covers their free tiers and rate limits in more depth.

**You want alerts on a company or topic.** A scheduled monitor beats polling a news endpoint. See our guides to [company news alerts that actually work](https://parallel.ai/articles/how-to-set-up-company-news-alerts-that-actually-work) and [tracking industry news automatically with AI](https://parallel.ai/articles/how-to-track-industry-news-automatically-using-ai).

**You need history going back years.** No free tier here covers it. NewsAPI.ai (back to 2014), GNews (since 2020), and NewsAPI.org (five years on Business) sell archives on paid plans.

## FAQ

### Is there a completely free news API?

Several have permanent free tiers that don't need a card, including Currents, NewsData.io, GNews, NewsAPI.org, and TheNewsAPI. All of them limit requests, history, or article text, and several limit commercial use. For a free option inside an AI assistant, the [Parallel MCP](https://parallel.ai/mcp) server provides web search and fetch with no account or key. Our list of [free MCP servers](https://parallel.ai/articles/best-free-mcp-servers) covers others.

### Can I use NewsAPI.org's free plan in production?

No. NewsAPI.org's Developer plan is limited to development and testing and can't be used in staging or production, including internal tools. Production use requires the Business plan or above.

### Which free news API allows commercial use?

As of November 22, 2026, Currents explicitly allows commercial use on its free plan with attribution and a link to the original article. NewsData.io's pricing page doesn't restrict its free plan to non-commercial use. NewsAPI.org, GNews, and Mediastack don't allow it on free plans. Web search APIs bill free credits the same way as paid usage, under each provider's standard API terms, so read those terms for rules on storing and displaying results.

### Does any free news API return full article text?

Not among the dedicated news APIs in this list. Free tiers return snippets of 250 to 300 characters or a short description, and full content starts on paid plans where it's offered at all. If you need the text, fetch the article URL yourself or use an extraction API on the links a news API returns.

### Is Bing's news search API still available?

No. Microsoft retired it with the rest of the Bing Search APIs on August 11, 2025, and points developers to Grounding with Bing Search in Azure AI Agents.

To give your agent current news alongside the rest of the web, start with up to $80 in free Parallel credits plus $5 a month with a card on file at [platform.parallel.ai](https://platform.parallel.ai), or connect the free [Parallel MCP](https://parallel.ai/mcp) server.

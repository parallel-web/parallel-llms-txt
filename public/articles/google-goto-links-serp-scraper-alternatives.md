# Google's /goto links and poisoned SERPs: the best alternatives to SERP scrapers

Google's /goto links, confirmed in August 2026, hide the destination of every search result behind a redirect, and since September rank-tracking vendors have reported Google serving them swapped results with no error attached. This guide covers how both changes work, what they cost companies that depend on scraped Google results, and which alternatives fit rank tracking, AI agents, and monitoring.

Google now routes every link on its results page through a google.com/goto redirect, so a scraper no longer gets the destination URL from the page it downloads. Combined with the end of 100-result pages, wider blocking, and results that some SEO vendors describe as poisoned, scraped Google data now costs more per keyword and is harder to trust. If you need what Google showed a searcher, keep a managed SERP API that validates its data and pair it with Search Console. If you need web results for an AI agent, an independent search API is cheaper and doesn't depend on Google's results page at all.

## What are Google's /goto links?

A /goto link is a redirect that Google now places in front of each search result. When you hover over a result, the link reads `google.com/goto?url=` followed by an encoded token instead of the page's address. Clicking it still takes you to the right page after one extra hop through Google.

Brodie Clark first reported the format on [July 2, 2026](https://searchenginewatch.com/google-google-com-goto-tracking-url-nears-full-rollout), and Google confirmed the rollout to [Search Engine Land on August 26, 2026](https://searchengineland.com/google-confirms-deploying-goto-url-redirects-to-search-results-links-485926). A Google spokesperson said: "We have a long history of deploying technical measures against evolving forms of abuse, and we regularly take steps to protect our services and users." The same day, Derek Perkins of Nozzle told [Search Engine Roundtable](https://www.seroundtable.com/google-search-goto-tracking-41957.html) he was seeing a near 100% rollout across several residential IP providers.

The token can't be decoded with a standard transformation. SerpApi [describes it](https://serpapi.com/blog/googles-new-goto-redirect-urls-resolution-in-progress) as the destination encrypted and packed into Protocol Buffers, and the reliable way to learn the destination is to follow the redirect. In a [test of 493 links](https://growtika.com/blog/google-goto-links-study) across organic results, videos, AI Overview sources, "People also ask," and ads, Growtika found that every one hid its destination.

For people searching, almost nothing changes. They land on the same page, and [Search Console](https://rankwises.com/blog-google-goto-links) still reports clicks, impressions, and position the same way. The visible result text, including the site name and the start of the path, also stays on the page, so a tool that only needs to know which domain ranks where can still read it.

## What /goto links mean for SERP scrapers

The change lands on anything that reads Google's results page with code and needs exact URLs: rank trackers, SEO platforms, citation extraction, competitor monitoring, and AI agents or RAG pipelines that use Google results as their search step.

- **Each link costs an extra request.** To recover the full URL, a scraper now has to resolve each link on the page. A page of results with ads, videos, and an AI Overview can carry dozens of links, and every extra request is another chance to be flagged and blocked.
- **Domain filters can fail silently.** If a pipeline treats the link as the destination, every result reads google.com. [DemandSphere](https://www.demandsphere.com/blog/google-goto-redirects) lists the symptoms: your own pages stop matching your domain, share of voice is calculated against the wrong sites, and historical series break on the rollout date.
- **SERP features lag behind organic results.** Vendors fixed organic links first. DemandSphere said it was still rolling its fix out to SERP feature links the day after Google confirmed the change, and AI Overview sources were the slowest to resolve.

The large SERP data providers adapted. SerpApi [said on September 5](https://serpapi.com/blog/we-have-resolved-the-google-goto-url-redirect-rollout) that it was returning direct destination URLs again, and DemandSphere said its ranking metrics continued to work. Teams that run their own scrapers have to build and maintain the same resolution logic themselves.

## Poisoned SERPs: the bigger problem since September

A few weeks after /goto, several rank-tracking vendors reported a harder problem. A poisoned SERP is a complete, normal-looking results page whose usual sites have been swapped for others, with no captcha or error to flag it. A blocked request tells a scraper to retry. A poisoned one gets stored as if it were real.

Each vendor measures this differently, so the figures aren't directly comparable:

| Source | What it reported | Date |
| --- | --- | --- |
| [Nozzle](https://nozzle.io/research/poisoned-google-serps) | 22.6% of SERPs judged on pages 1 and 2 poisoned since September 13, against 0.28% before; daily peak of 43.5% on September 30 | Data through October 21, 2026 |
| [AccuRanker](https://ppc.land/google-feeds-rank-trackers-swapped-results-on-8-of-pages-nozzle-finds) | 30.2% of desktop page-one checks flagged on September 25; below 1% after its validation changes | October 19, 2026 |
| [Ahrefs](https://ppc.land/ahrefs-says-google-poisons-5-to-20-of-results-served-to-seo-data-tools) | 5% to 20% of results affected, depending on the data provider | October 22, 2026 |
| [Semrush](https://searchengineland.com/semrush-confirms-poisoned-google-results-499199) | Confirmed the problem and called it industry-wide | October 27, 2026 |

Google hasn't commented on any of these reports. Nozzle also found that the sites swapped in were disproportionately social sites and forums, and that 67.9% of affected SERPs returned to their usual results within three days. That pattern explains why vendors now re-fetch suspicious pages and compare them against each keyword's recent history before storing a result.

For an SEO team, poisoning means a ranking drop in a report may never have happened. For an AI agent, the risk is worse, because the agent has no history to compare against. It reads whatever page it gets and answers from it.

## How Google has restricted SERP scraping since 2025

/goto links are one step in a sequence. Our explainer on [why AI agents can't just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search) covers the API side in more detail.

| Date | Change | Effect on scrapers |
| --- | --- | --- |
| January 2025 | JavaScript required to load results (SearchGuard) | Plain HTTP scrapers stopped working |
| September 2025 | `num=100` parameter removed | Ten requests to see the top 100 instead of one |
| December 19, 2025 | Google sues SerpApi | Legal risk for scraping vendors and their customers |
| January 2026 | Custom Search JSON API closed to new customers | The official full-web JSON option is ending |
| August 26, 2026 | /goto redirects confirmed | An extra hop for each link that needs its URL |
| September 2026 | Wider blocking, then poisoned SERPs | Stored data can be wrong with no error |

The lawsuit is unresolved. The court dismissed Google's original DMCA claims on July 20, 2026, with leave to amend. Google filed an amended complaint on August 10, and SerpApi moved to dismiss it on August 24. On October 5 the court [vacated the October 13 hearing](https://www.courtlistener.com/docket/72059948/google-llc-v-serpapi-llc/) and said the motion would be reset or decided on the papers. Both rulings so far came at the pleading stage, and SerpApi disputes the claims. Our guide to [whether scraping Google is legal](https://parallel.ai/articles/is-scraping-google-legal) covers the legal theories and the separate Reddit case.

## Do you need Google's results page, or web results?

Most decisions about a SERP scraper alternative come down to this question.

You need Google's results page itself if the job is to measure Google: rank tracking, share of voice, ad monitoring, local pack positions, Shopping prices, or what a searcher in a given city saw. No other source can tell you where you rank on Google.

You need web results if the job is to answer a question or ground a model: an agent's search tool call, RAG over fresh pages, lead enrichment, research, or monitoring news about a company. Here Google's page is only a means to find URLs, and you then still have to fetch and clean the pages. An independent search API returns ranked URLs with page text in one call, without depending on Google's markup, redirects, or blocking.

Many teams scrape Google for the second job because it was the default. That's the use case where switching costs the least and removes the most risk.

## Alternatives to SERP scrapers compared

Prices are list prices from each vendor's page, checked October 30, 2026.

| Option | What you get | Price | Best for | Limits |
| --- | --- | --- | --- | --- |
| [Google Search Console API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) | Clicks, impressions, CTR, and average position for your own site | Free | Your own rankings | Your verified properties only; up to 50,000 rows per day per search type |
| Managed SERP API (such as [SerpApi](https://parallel.ai/articles/serpapi-vs-parallel) or [DataForSEO](https://parallel.ai/articles/dataforseo-vs-parallel)) | Structured copy of Google's results page | SerpApi from $150 for 15,000 searches a month | Competitor rank tracking, ads, local, Shopping | Inherits /goto, blocking, and poisoning; ask how the vendor validates results |
| [Grounding with Google Search](https://parallel.ai/articles/gemini-google-search-grounding-vs-parallel) | Gemini answers grounded in Google results | $14 per 1,000 search queries (Gemini 3), 5,000 free a month | Gemini apps that only need a cited answer | Terms bar caching or storing grounded results |
| [Parallel Search API](https://docs.parallel.ai/search/search-quickstart) | Ranked URLs with excerpts from page bodies, from our own index | $1 per 1,000 (Turbo, Fast) or $5 per 1,000 (Basic, Advanced), 10 results included | AI agents, RAG, enrichment | No SERP features or Google rank data |
| [Brave Search API](https://api-dashboard.search.brave.com/documentation/pricing) | Web results and an LLM context endpoint from Brave's own index | $5 per 1,000 requests | Independent index with high burst capacity | Terms restrict storing results beyond transient use |
| [Exa](https://exa.ai/pricing) | Search results with optional page contents from Exa's index | $4 per 1,000 (Lite) to $7 per 1,000 (Auto), contents $1 per 1,000 pages | Semantic and research-style queries | Page text billed separately |
| [Parallel Monitor API](https://parallel.ai/pricing) | New events matching a query, on an hourly, daily, or weekly schedule | $3 to $10 per 1,000 requests | Replacing scheduled scrapes that watch for changes | Returns new events, not a results page |

Two Google options are missing from the table on purpose. The Custom Search JSON API no longer accepts new customers, and existing customers lose access on January 1, 2027. The Web Search Service API is available only through a partner agreement, with no public pricing or signup. Our [Custom Search API alternatives guide](https://parallel.ai/articles/the-best-google-custom-search-api-alternative-for-ai-agents) covers both.

### For SEO and rank tracking

Keep a managed SERP API for competitor and keyword-level data, because nothing else measures Google. Ask your vendor three questions: how it resolves /goto links in SERP features as well as organic results, how it detects poisoned pages before storing them, and whether it has reprocessed data from late September and October. Then use the Search Console API as the source of truth for your own site, since it isn't scraped and isn't affected by either change. Annotate reports from late August through October so nobody reads a data problem as a ranking event later.

### For AI agents and RAG

Replace the scraper with a search API built for models. You remove the redirect resolution, the blocking retries, the fetch-and-clean step, and the risk that a poisoned page feeds your model. With the Parallel Search API, one call returns ranked URLs with excerpts pulled from page bodies, and the Extract API returns a full page when the agent needs more. Our comparison of [web scraping and search APIs](https://parallel.ai/articles/web-scraping-vs-search-api) covers when each fits, and [Parallel vs. SerpApi vs. Brave vs. Bing](https://parallel.ai/articles/parallel-vs-serpapi-vs-brave-vs-bing) has a worked cost example.

### For monitoring

If you scrape Google on a schedule to catch news about competitors, customers, or regulations, a monitoring API does the job without the results page. You describe what to watch once, and it returns new events with sources when something changes.

## How to move an agent off a SERP scraper

1. List what your code reads from each result. If it uses only the URL, title, and snippet to decide what to fetch next, a search API replaces both the scraper and the fetcher.
2. Turn your Google query into keyword `search_queries` and add a one-sentence `objective` that says what the agent is trying to find.
3. Drop the fetch-and-clean stage for pages whose excerpts already answer the question, and call Extract only for pages that need full text.
4. Pick a mode per call: Fast for interactive agents, Turbo for high-volume lookups, Advanced for multi-hop research.
5. Run your old and new pipelines side by side on a sample of real queries and compare the answers as well as the URLs.

```python
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY

search = client.search(
    mode="fast",
    objective="Find the latest Search Console API row limits from Google's documentation",
    search_queries=["Search Console API row limit", "searchanalytics query rowLimit"],
)
for result in search.results:
    print(result.url)
    print(result.excerpts[0][:200] if result.excerpts else "")
```

## Frequently asked questions

**What is google.com/goto?**

It's a redirect Google places in front of search result links. The link carries an encoded token instead of the destination URL, and Google forwards the click to the real page. Google confirmed the rollout on August 26, 2026 and described it as a technical measure against abuse.

**Do /goto links affect my rankings or Search Console data?**

No. Google hasn't described /goto as a ranking change, visitors land on the same pages, and Search Console reports clicks, impressions, and position as before. The change affects tools that read Google's results page with code.

**Can you decode a Google /goto link?**

Not with a standard transformation such as base64. The destination is encrypted inside the token, so a tool has to follow the redirect to learn it. Large SERP API vendors say they resolve these links for you, with SERP features such as AI Overviews taking longer than organic results.

**What is a poisoned SERP?**

It's a results page that looks complete and normal but has most of its usual sites swapped for others, served to requests that look automated. Nozzle, AccuRanker, Ahrefs, and Semrush have all reported it since September 2026, at rates that vary by vendor and method. Google hasn't commented.

**What is the best SerpApi alternative?**

It depends on the job. For Google rank data, the alternatives are other managed SERP APIs plus the Search Console API for your own site. For AI agents that need web results rather than Google's page, an independent search API such as Parallel, Brave, or Exa is cheaper per call and returns page text directly.

## Start building

Create an API key on the [Parallel Platform](https://platform.parallel.ai/), which includes free credits, and follow the [Search quickstart](https://docs.parallel.ai/search/search-quickstart) to run your first query. The [Monitor API docs](https://docs.parallel.ai/) cover scheduled monitoring.

# SearXNG vs. Parallel: self-hosted metasearch against a hosted index

SearXNG is an open-source metasearch engine you host yourself, with no API key and no per-query fee, which makes it the first option most cost-conscious developers consider. This comparison covers how it works, what comes back, the problem that shows up at agent volume, the real cost comparison, and where self-hosting is simply the right answer.

## **How SearXNG works**

SearXNG has no index of its own. When a query arrives it fans out to configured upstream engines, merges what comes back, deduplicates, and returns a combined list. The API is simple: GET or POST to / or /search with a q parameter, plus optional categories, language, pageno, time_range, and safesearch. Set format=json and you get structured results.

One detail catches people out immediately: JSON output has to be enabled in settings.yml, and most public instances disable it. Requesting an unset format returns 403 Forbidden. If you are planning to point an agent at a public SearXNG instance, that is usually where the plan ends. You need your own deployment.

Parallel runs its own crawl and index. The Search API takes a natural-language objective and returns ranked URLs with excerpts pulled from the page bodies and selected against that objective, across four modes: Turbo at ~200ms and $1 per 1,000 requests, Fast at under a second and the same $1 per 1,000, Basic at ~1s and $5 per 1,000, and Advanced at ~3s and $5 per 1,000.

## **What comes back**

A SearXNG result is a title, a URL, and whatever snippet the upstream engine supplied: usually a line or two written to earn a click. There is no content extraction, because SearXNG never visits the pages. So the agent pipeline continues: fetch each URL, strip boilerplate, chunk, and choose what goes in the prompt. That is a separate component you build and run, along with the proxying and retry logic that comes with fetching pages at volume.

Parallel returns the relevant passage from the page body in the first response, with the budget under your control through max_chars_per_result and max_chars_total, and Extract at $1 per 1,000 URLs when an agent needs the whole page.

There is also no ranking model of SearXNG's own beyond merging upstream lists. Relevance is inherited from whichever engines you configured, which means result quality is a function of your engine mix rather than something you can tune directly.

## **The problem that shows up at agent volume**

SearXNG works by querying engines that did not agree to be queried programmatically. At human volume, that is unremarkable. At agent volume, thousands of queries an hour from one IP, those engines notice, and start rate-limiting, CAPTCHA-ing, or blocking. Individual engines fall out of your instance quietly, results degrade, and the failure mode is partial rather than loud.

Fixing that means proxies, rotation, and per-engine tuning, which is to say rebuilding the infrastructure that commercial providers charge for. That is the honest cost of the free option: not the software, but the arms race behind it.

There is also no SLA, no status page, and no one to call. Your search layer is as reliable as your own operational practice.

## **The cost comparison**

SearXNG's marginal cost is a small VPS, so call it $5 to $20 a month plus whatever your fetch-and-extract layer costs to run.

Parallel Turbo is $1 per 1,000 requests with 10 results and excerpts included, so 100,000 searches a month is $100 and a million is $1,000. Basic and Advanced are $5 per 1,000. Extract is $1 per 1,000 URLs. Above that sit the Task API at $5 to $2,400 per 1,000 runs, Responses at $10 to $250 per 1,000, Monitor at $3 per 1,000 executions, Entity Search at $5 per 1,000, and FindAll at a fixed cost plus per match. There is $5 in free credits every month, applied automatically, which covers up to 5,000 Turbo searches.

At 10,000 searches a month, Parallel Turbo costs $10 and SearXNG costs a VPS and some of your time. That is close to a wash, and the engineering time makes it a loss. At ten million searches a month, Turbo is $10,000 and self-hosting starts to look compelling, assuming you have solved the blocking problem and are willing to own it permanently.

_Note: For the latest pricing, always check official documentation._

## **Where SearXNG is simply right**

If your queries cannot leave your infrastructure, no hosted API solves that and SearXNG does. Some workloads carry that constraint absolutely: internal tooling over sensitive matters, classified environments, or products whose whole promise is that nothing is sent to a third party. Parallel offers zero data retention, a Data Processing Addendum, SOC 2 Type 2 certification, and a contractual commitment not to train on customer data, but the queries still go to Parallel.

There is also no vendor risk: an open-source project cannot raise prices, deprecate an endpoint, or change its terms in a way that breaks you.

## **Developer experience**

SearXNG is a Docker container and a settings file. The API surface is small and predictable, and the documentation is decent. There is no SDK, no MCP server, and no playground. You are wiring HTTP calls yourself.

Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, with the Responses API OpenAI SDK-compatible and default rate limits of 600 requests per minute on Search and Extract:

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="turbo",
)
```

## **When to use each**

Choose SearXNG when the requirement is absolute rather than economic. Queries that cannot leave your network, environments with no outbound vendor access, or a deliberate decision to own every layer are all cases where the trade-offs are worth it. It is also a perfectly sensible choice for hobby projects and internal tools where occasional degradation costs nothing.

Choose Parallel when you want search to be a solved problem. $1 per 1,000 requests at a 200ms median buys an index rather than a proxy to other indexes, excerpts rather than snippets, and someone else's on-call rotation for the blocking arms race. Extract, Task, Responses, FindAll, Entity Search, and Monitor cover the layers above search that a metasearch front end never touches.

The mistake to avoid is treating SearXNG as the cheap version of a search API. It is a different thing: a query router with no index and no content layer. If free is the appeal, price the fetch pipeline and the blocking maintenance before deciding, because that is where the real cost lives.

**Related reading: **[Crawl4AI vs. Parallel](https://parallel.ai/articles/crawl4ai-vs-parallel) · [Serper vs. Parallel](https://parallel.ai/articles/serper-vs-parallel) · [Brave Search API vs. Parallel](https://parallel.ai/articles/brave-search-api-vs-parallel).

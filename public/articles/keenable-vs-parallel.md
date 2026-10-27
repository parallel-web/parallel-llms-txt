# Keenable vs. Parallel: the fastest search call or the best agent result?

Choosing between Keenable and Parallel comes down to what you measure: the speed and price of a single search call, or the accuracy and total cost of the agent task built on top of it. This comparison covers both companies, independent and vendor-run benchmarks, pricing and free tiers, fetch and structured extraction, rate limits, developer experience, and compliance.

## Quick answer

Keenable has the fastest individual search call measured by Artificial Analysis and a recurring free allowance of 100,000 requests a month. Parallel scores higher on the same independent benchmark and, in Fast mode, completes agent tasks for less money and in less time, because each call returns more of what the model needs. Pick Keenable when per-call latency, a big free tier, or on-premises deployment decides the project. Pick Parallel when answer accuracy, total cost per task, and a research layer above search decide it.

## Who Keenable is

Keenable came out of stealth on August 25, 2026 with a [$26 million seed round led by Accel](https://techcrunch.com/2026/08/25/accel-backed-keenable-is-indexing-the-web-for-ai-agents/), with Conviction Partners participating. CEO Andrey Styskin previously ran search at Yandex and web infrastructure at Amazon AGI; Chief Scientist Matthias Petri built the web grounding service behind Alexa. TechCrunch put the team at 15 engineers across the US and Europe.

The company runs its own crawler and index, which it says holds more than 100 billion documents, and it sells to AI labs and inference platforms as well as agent builders. The public API launched in April 2026 with two endpoints, Search and Fetch, plus a CLI and an MCP server. Two newer products sit on the same index. SELECT is an SQL interface to the web, and Time Machine is point-in-time search, which is in early access as a product but already exposed through the `query_time` parameter on Search.

Parallel also runs its own index built only for agents, and sells seven APIs on top of it: Search, Extract, Task, Responses, FindAll, Entity Search, and Monitor. The overlap with Keenable is Search against Search, Extract against Fetch, and, more loosely, FindAll and Task against SELECT. Monitor, Responses, Entity Search, and Task's deep research processors have no Keenable equivalent.

## Search

Keenable Search takes a keyword query and returns ranked results with a title, URL, description, snippet, and published and acquired timestamps. There are two modes, `pro` (the default, deeper retrieval) and `realtime` (the fastest), and filters for a single site, published date, and acquisition date. Relative windows such as `7d` or `30min` work too. You can request up to 50 results and set the snippet length between 180 and 10,000 characters. On August 30 Keenable shipped [dynamic snippets](https://keenable.ai/blog/keenable-snippets-full-page-cost-reduction), which score every token of a long page against the query and keep only the passages that answer it. Keenable reports that this halved the size of production responses.

Parallel Search takes a natural-language objective alongside optional keyword queries, and returns ranked URLs with compressed excerpts sized for a context window. The objective carries intent that a keyword string drops, such as which entity you mean, what time period matters, and what kind of source you trust. Four modes trade latency against depth: Turbo at about 200ms, Fast at about 700ms, Basic at about 1s, and Advanced at about 3s. A source policy handles domain inclusion, exclusion, and freshness, and excerpt size is set with `max_chars_per_result` and `max_chars_total`.

Keenable's `query_time` has no Parallel equivalent. It rewinds both the corpus and the ranking to a past instant, which you need for backtesting, for building evaluation sets without answer leakage, and for training-data work. For those jobs, Keenable is the better fit.

## Accuracy and cost inside an agent loop

The [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) is the one independent benchmark that has tested both providers. It runs the same answer model, GPT-5.6 Luna (medium), through the same harness with only the search provider changed, and scores DeepSearchQA, BrowseComp, and AA-Omniscience. The figures below are from the leaderboard as published on October 19, 2026. Both providers' runs date from mid-August.

| Configuration | Index score | Search cost per 1K tasks | Model cost per 1K tasks | Time per task | Avg time per search call |
| --- | --- | --- | --- | --- | --- |
| Parallel Advanced | 75 | $47.93 | $11.29 | 40.8s | 2.66s |
| Parallel Fast | 73 | $8.41 | $18.96 | 17.9s | 0.90s |
| Parallel Turbo | 67 | $13.64 | $12.42 | 24.6s | 0.51s |
| Keenable pro | 67 | $23.69 | $19.05 | 28.0s | 1.11s |
| Keenable realtime | 67 | $26.87 | $15.94 | 20.2s | 0.34s |

Keenable realtime has the fastest individual search call in the comparison, at 0.34 seconds against 0.51 for Parallel Turbo and 0.90 for Parallel Fast. That gap matters for voice agents and other loops where every call sits on the critical path.

Per task, the ranking flips. Parallel Fast scores six points higher than either Keenable mode, finishes tasks faster (17.9 seconds against 20.2), and costs $27.37 per 1,000 tasks in search plus model tokens against $42.81 for Keenable realtime. The model answers in fewer calls when each call returns better evidence, so a slower call can still produce a faster and cheaper task. Fast leads Keenable on each of the three component benchmarks, including BrowseComp at 71.5% against 65.5% for Keenable pro. Parallel Turbo matches Keenable's score at a lower total cost per task.

AA measured both providers in mid-August, before Keenable's dynamic snippets shipped, and Keenable reports in its own harness that BrowseComp accuracy rose from 56.6% to 67.3% with the new snippets, so its score may move at the next run. Search cost is also AA's figure per 1,000 benchmark tasks at list price, not a per-request price. See the [methodology](https://artificialanalysis.ai/methodology/search-api) for the full harness settings.

## Keenable's NEEDLE benchmark

Keenable publishes [NEEDLE](https://keenableai.github.io/needle/), a live benchmark that regenerates its queries every hour for news and every day for scholar, finance, legal, and rare-entity lookups. The code, prompts, judgments, and raw results are public, and every run executes in GitHub Actions. Few vendor benchmarks in this category publish that much, and you can run it yourself.

On the [October 19 results](https://keenableai.github.io/needle/results/), Keenable leads overall at 74% of a pooled ceiling, ahead of Exa and Brave LLM Context at 67%. Parallel is at 61% and Parallel Turbo at 53%. Read those numbers with the protocol in mind:

- NEEDLE grades the top five titles and snippets for ranking quality. It does not ask an agent to answer a question, which is what the AA Index measures.
- Parallel runs in Basic mode with the query passed as a keyword list and no objective, so the input Parallel's ranking is built around is never sent. Fast and Advanced are not tested.
- Keenable operates the benchmark, and its own notes say the LLM judge has not yet had a human-agreement audit.
- The results table prices Keenable at $1 per 1,000 queries and labels that the lowest self-serve price. Keenable's own pricing page lists $1 only for dedicated capacity at 100 requests per second and up; self-serve is $4.

## Pricing and free tiers

|  | Keenable | Parallel |
| --- | --- | --- |
| Free allowance | 100,000 requests a month, recurring | Up to $80 in credits at signup, plus $5 a month with a card on file (5,000 Fast or Turbo searches) |
| Search, pay as you go | $4 per 1,000 requests, up to 50 results | $1 per 1,000 (Turbo, Fast); $5 per 1,000 (Basic, Advanced); 10 results included, $1 per 1,000 additional |
| High-volume search | $1 per 1,000 at 100+ requests per second, dedicated capacity, cloud or on-premises | Custom enterprise terms |
| Page content | 1 credit per fetch; live fetches billed as a separate SKU | Extract at $1 per 1,000 URLs |
| No-account access | Keyless endpoints (1,000 requests an hour per IP); x402 at $0.01 per request in USDC | Free hosted Search MCP, no account or key |

Keenable's free tier is a recurring allowance that resets every month, and it's unusually large for a metered search API. A project under 100,000 requests a month pays Keenable nothing.

Past the allowance, the per-request math favors Parallel. Keenable charges $4 per 1,000 self-serve, four times Parallel's Fast and Turbo price. Counting both free tiers, the monthly bills cross at roughly 132,000 requests. At 500,000 requests a month, Keenable costs $1,600 and Parallel Fast about $495. Keenable's $1 rate requires dedicated capacity at 100 requests per second or more.

Parallel prices everything else separately: Task at $5 to $2,400 per 1,000 runs across nine processors, Responses at $10 to $250 per 1,000, Monitor at $3 to $10 per 1,000 executions, Entity Search at $5 per 1,000, and FindAll at a fixed cost plus $0.03 to $1.00 per match.

Check official documentation for current pricing.

## Fetch and structured extraction

Keenable Fetch returns a page as Markdown with title, author, and published date. By default it serves only pages already in the index and errors on anything else; `live=true` fetches from the source. An optional `prompt` has an LLM read the page and return only what the instruction asks for. Parallel Extract takes URLs plus an optional objective and returns either focused excerpts or the full page, using cached content or a live crawl as needed.

SELECT is Keenable's most original product. An agent writes a read-only query in DuckDB SQL where `WEB_SEARCH()` and `WEB_FETCH()` are table functions and `SEM_EXTRACT`, `SEM_MATCH`, and `SEM_NORM` use an LLM to pull values out of pages, so thousands of pages become a table with a source URL on every row. It runs over its own MCP server and takes seconds to minutes per query. Keenable does not publish a per-query price for it.

Parallel reaches the same "turn the web into a table" job through two APIs. FindAll takes a plain-language description of the entities you want and returns every match, each with citations, reasoning, and a confidence score. The Task API takes your own rows and fills in the columns you define, with the same per-field basis. Neither asks the agent to write SQL. SELECT suits teams that want aggregation and grouping in a query language, and FindAll and Task suit pipelines that need per-field verification and a fixed price per match or per run.

## Rate limits

Keenable allows 10 requests per second per organization on an API key, which is 600 a minute, the same as Parallel's default for Search and Extract. Keyless Keenable traffic is capped at 1,000 requests an hour and 10 a second per IP, on a pool shared with everyone at the same egress address. Parallel's other defaults are 2,000 a minute for Task, 300 a minute for Responses and Monitor, and 25 FindAll runs an hour. Both vendors raise limits on enterprise plans.

## Developer experience

Keenable's integration list is long for a company its age. It is a keyless backend in Hermes Agent, LibreChat, SearXNG, Lightpanda, and AnythingLLM, a server-side tool on Baseten Model APIs, and it ships packages for LangChain, LlamaIndex, Mastra, and the Vercel AI SDK. Every authenticated MCP call reports its own credit cost in metadata, which makes per-call cost attribution simple.

```python
import os, requests

r = requests.post(
    "https://api.keenable.ai/v1/search",
    headers={"X-API-Key": os.environ["KEENABLE_API_KEY"]},
    json={"query": "your keyword query", "mode": "realtime"},
)
```

Parallel ships Python and TypeScript SDKs, an MCP server, a CLI, and a playground. The equivalent call adds an objective:

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="fast",
)
```

Both companies offer a hosted MCP server that works without an account. Keenable's is at api.keenable.ai/mcp and Parallel's at mcp.parallel.ai/mcp, which exposes `web_search` and `web_fetch` over the Search and Extract APIs with no key. Adding a Parallel API key as a Bearer token raises the limits and lets you pin a mode, location, or result count for the connection.

## Compliance

Keenable runs a [Vanta trust center](https://trust.keenable.ai/) that lists its security controls and subprocessors (Google Cloud, AWS, Supabase). As of October 21, 2026, it publishes no SOC 2 report or other attestation, and its documentation does not describe a zero data retention option. Its [privacy policy](https://keenable.ai/privacy) permits using usage data, including data collected on behalf of customers, for research and development, in de-identified form. On-premises deployment is available on the Frontier tier, which some procurement teams will value above any certification.

Parallel is SOC 2 Type 2 certified and offers a Data Processing Addendum. Under the standard [Customer Terms](https://parallel.ai/customer-terms), Parallel may use inputs and outputs, not linked to any individual, to train and improve the models behind its services. Enterprise plans with zero data retention exclude that use. Parallel runs a public status page and trust center.

## When to use each

Choose Keenable when the latency of each call is the constraint, as in voice agents and tight interactive loops, when your volume fits inside 100,000 free requests a month, when you need point-in-time search, or when you need the index deployed on your own infrastructure. SELECT is also worth a look if your agents already think in SQL.

Choose Parallel when the result of the agent task is what you are paying for. On the independent AA Index, Fast scores higher than Keenable at a lower total cost per task and finishes tasks sooner, and Advanced scores higher still. Above about 132,000 requests a month, Parallel is also cheaper per search at self-serve prices. Above search sits a research layer Keenable does not sell: Task for deep research and enrichment, Responses for cited answers, FindAll for list building, Entity Search for people and companies, and Monitor for tracking change. [Start building](https://platform.parallel.ai/).

To test on your own traffic, hold the model and harness fixed, run both providers' fastest and deepest modes, and count model tokens and calls per task as well as search cost. NEEDLE's open harness is a reasonable place to start, as long as you pass Parallel an objective.

## FAQ

### Is Keenable cheaper than Parallel?

Below 100,000 requests a month, yes: Keenable's free allowance covers it. Above that, Keenable's self-serve price is $4 per 1,000 against $1 per 1,000 for Parallel Fast and Turbo, and the bills cross at roughly 132,000 requests a month. Per benchmark task on the AA Index, Parallel Fast costs less in search plus model tokens than either Keenable mode.

### Is Keenable faster than Parallel?

Per search call, yes. Keenable realtime averaged 0.34 seconds per call on the AA Index against 0.51 for Parallel Turbo. Per task, Parallel Fast finished faster, at 17.9 seconds against 20.2, because the model needed fewer calls.

### Does Keenable have an equivalent to Parallel's Task or Monitor APIs?

No. Keenable sells Search, Fetch, SELECT, and point-in-time search. It has no deep research, cited-answer, entity search, or monitoring API.

Related reading: [Brave Search API vs. Parallel](https://parallel.ai/articles/brave-search-api-vs-parallel) · [Exa vs. Parallel](https://parallel.ai/articles/exa-vs-parallel) · [TinyFish vs. Parallel](https://parallel.ai/articles/tinyfish-vs-parallel) · [Fast vs. Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo)

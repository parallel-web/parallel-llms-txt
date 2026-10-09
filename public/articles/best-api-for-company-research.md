# The best API for company research in 2026: what an independent benchmark found

Which API is best for company research depends on whether you are discovering companies that match criteria, looking up facts about one you already know, or enriching a list, and vendors sell very different products under the same label. This guide covers the independent Openbenchmarks company search and enrichment results, the live web research APIs and firmographic databases behind them, pricing, and how to pick by job.

Ask ten vendors for "the best API for company research" and you get ten different products. People Data Labs will sell you a firmographic record keyed by domain. Crunchbase will sell you funding history. Exa and Parallel will sell you a web search endpoint that an agent calls a dozen times to assemble an answer from scratch. All three are reasonable answers, and you cannot swap one for another.

The job splits into three tasks that want different tools. Discovery means building a set of companies that satisfy criteria you specify, such as Series A fintechs headquartered in Berlin that went through an accelerator. Lookup means finding a fact about a company you already know, such as who led its last round or how many people it employs. Enrichment means filling a schema across a list you already have. Most buyers need two of the three, and the market has two kinds of vendor to match.

## Two kinds of company research API

The first kind is a database. People Data Labs, Crunchbase, Apollo, ZoomInfo, Coresignal, and Diffbot's Knowledge Graph each maintain a pre-compiled store of company records and sell lookups against it, keyed by domain or name and priced per record or per credit. A lookup returns in milliseconds and comes back in a fixed schema. The record is only as fresh as the vendor's last refresh, and it only holds fields the vendor decided to collect. If your question is "which of these 4,000 domains has more than 200 employees," a database answers it well and cheaply.

The second kind is a live web research API. Parallel, Exa, Linkup, Tavily, Firecrawl, and Brave each expose a search endpoint that an agent calls repeatedly, reading results and issuing new queries until it has evidence for every constraint. Nothing is precomputed: the agent assembles the answer from whatever the public web says today, which is the only approach that works when the criteria are unusual or the facts are recent. The cost is speed: one research question can take a minute of agent time and seven or eight model turns.

The second category got its first neutral measurement for company research in August 2026.

## What the Openbenchmarks company search benchmark measures

[Openbenchmarks](https://openbenchmarks.com/multi-turn-company-search) is an independent benchmark hub that publishes its harness, its scoring code, and every raw vendor response under a CC-BY license. Its multi-turn company search board, first published August 22, 2026 and last updated September 26, is the closest thing the category has to a controlled experiment.

Everything is held constant except the search provider. A fixed research agent (gpt-5.6-sol at medium reasoning effort) gets one of 45 hand-labelled questions. Each question combines three or four constraints drawn from investor backing, accelerator participation, headquarters geography, founding era, and funding history. The agent may take up to 8 model turns and 14 searches, two per turn, with 10 results per search, and must return a strict JSON set of companies with cited URLs. Its native web search is swapped for the vendor's API, and provider responses are normalized into the same title, URL, and snippet shape before the model sees them. Every provider runs each question three times in each mode, and the board now reports 5,536 completed agent runs across 20 configurations.

Scoring is deterministic: each returned company is resolved to a canonical identity and compared with a frozen gold set of 375 question-company memberships, between 2 and 37 valid companies per question. Precision is true positives over everything returned, recall is true positives over the gold set, and rows rank by F1. The model-only baseline is zero: with no search tool, the same model scored nothing on every question, so the ranking measures the search API rather than the model's memory.

Two boards are reported separately. In search-only mode the agent reads titles, URLs, and snippets and cannot open a page. In search-plus-fetch mode it can also fetch any URL a search returned, through the vendor's own extraction endpoint where one exists. Openbenchmarks calls search-only "the clean provider comparison" because fetch mixes page retrieval into the score.

## The results

On the search-only board, Parallel Search in basic mode ranks first with an F1 of 50.2, and it posts the highest precision on that board at 90.0. Exa deep is second at 45.5, Exa instant third at 43.6, and Parallel advanced fourth at 43.4. Tavily advanced, both Linkup depths, and Parallel fast sit between 39 and 42, with You.com and Perplexity just behind and Parallel turbo at 32.8. Firecrawl, Nimble, Brave, and TinyFish land between 24 and 31. Seltz, the one vendor on the board that markets a companies-specific search scope, scores 14.4, and a Google SERP feed through RapidAPI scores 0.4.

| Configuration | F1 | Precision | Recall | Median time | Cost per agent run |
| --- | --- | --- | --- | --- | --- |
| Parallel Search, basic | 50.2 | 90.0 | 38.4 | 69.1s | $1.180 |
| Exa, deep | 45.5 | 82.9 | 33.9 | 89.6s | $0.717 |
| Exa, instant | 43.6 | 81.9 | 32.5 | 49.4s | $0.627 |
| Parallel Search, advanced | 43.4 | 86.6 | 31.2 | 85.8s | $0.615 |
| Tavily, advanced | 42.0 | 84.6 | 30.6 | 92.1s | $1.032 |
| Linkup, fast | 41.3 | 82.7 | 30.4 | 63.8s | $0.923 |
| Linkup, standard | 40.8 | 83.8 | 30.0 | 72.4s | $0.941 |
| Parallel Search, fast | 39.0 | 81.6 | 27.9 | 54.8s | $0.469 |
| You.com, highlights | 38.6 | 79.3 | 28.3 | 48.2s | $0.971 |
| You.com, highlights + core | 38.1 | 80.9 | 27.4 | 47.6s | $0.895 |
| Perplexity, low context | 37.8 | 79.3 | 26.8 | 48.9s | $0.334 |
| Tavily, basic | 36.5 | 82.5 | 25.7 | 63.0s | $0.615 |
| Parallel Search, turbo | 32.8 | 76.7 | 22.9 | 47.0s | $0.420 |
| Firecrawl | 30.8 | 77.4 | 21.1 | 75.0s | $0.281 |
| Nimble, standard | 30.7 | 70.3 | 21.3 | 53.0s | $0.467 |
| Brave Search | 26.9 | 64.5 | 18.4 | 43.4s | $0.265 |
| TinyFish | 26.6 | 64.7 | 17.9 | 64.2s | $0.212 |
| Nimble, lite | 24.1 | 65.2 | 16.1 | 67.2s | $0.222 |
| Seltz, companies | 14.4 | 40.6 | 9.2 | 55.9s | $1.751 |
| Google SERP (RapidAPI) | 0.4 | 0.8 | 0.3 | 31.4s | $0.103 |

Source: Openbenchmarks multi-turn company search, search-only board, last updated September 26, 2026. F1, precision, and recall are three-trial means in percentage points; the trial-to-trial spread is one to four points for most rows. Cost per agent run is the median of model-token cost plus vendor list price.

The order changes once the agent has a fetch tool. On the search-plus-fetch board Exa deep leads at 49.2, Perplexity is second at 46.6, Exa instant third at 44.4, and Parallel advanced fourth at 43.8, while Parallel basic drops to seventh at 41.2. Linkup standard records the highest precision on that board at 90.3. The likely reading is that Exa's contents extraction adds more to Exa's search than a fetch step adds to ours, since our basic-mode excerpts already carry much of the page text the agent needs. If your agent fetches pages through the provider's own extraction endpoint, that is the board to read.

Cost goes the other way. Parallel basic was the most expensive configuration per agent run apart from Seltz, at $1.18 against Exa deep's $0.72. That figure bundles model tokens with search list price, and basic mode returns longer excerpts, which the agent then pays to read: $1.11 of the $1.18 is model tokens. Parallel fast delivers 39.0 F1 at $0.47 and turbo 32.8 at $0.42.

Recall is low for everyone: the best configuration finds under two-fifths of the gold companies on an average question, and no provider returned the exact set more than 7.5% of the time. The benchmark's own FAQ frames this as the hard part of company research: an answer can pad the set with companies that fail a constraint, or leave valid ones out, and F1 punishes both.

### Two related boards

The same hub runs two other measurements that touch company research. On the [company news factual lookup](https://openbenchmarks.com/company-news) board (300 questions about recent funding rounds, acquisitions, layoffs, and leadership changes, last run September 12, 2026), Exa fast answers 99.3% correctly, Exa instant 97.7%, and Perplexity 97.3%. Parallel basic answers 93.3%, and Parallel fast, at 86.0%, is the cheapest paid option per correct answer at $1.16 per 1,000. The strongest dedicated news index, Seltz's news scope, reaches 58.3% on the identical questions. On the [lookalike benchmark](https://openbenchmarks.com/lookalikes), which asks nine vendors for up to 100 similar companies per seed across 48 seeds, Seltz leads long-list precision at 63.4% Precision@100, ahead of Extruct at 61.1% and Ocean.io at 59.5%. Parallel is fourth at 56.9%, and PredictLeads leads top-of-list precision at 89.8% Precision@10.

The three boards agree with the hub's own FAQ that no single web search API is best across tasks. Exa fast is the accuracy leader for single-fact company news. Parallel basic is the leader for multi-constraint company discovery when the agent works from search results alone.

## The APIs, one by one

### Parallel

We built Parallel for agents, so the pieces relevant to company research are spread across several endpoints. The [Search API](https://parallel.ai/products/search) is what the benchmark measured. It takes a natural-language objective plus optional keyword queries and returns ranked URLs with excerpts compressed for a context window. Basic and advanced modes are $5 per 1,000 requests with 10 results included, fast returns in under a second, and turbo is $1 per 1,000 at roughly 200ms p50. On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (September 2026 data), advanced scores 75, level with Brave's LLM context mode and behind Perplexity Search (medium) at 80 and Octen Search at 77.

For discovery, [Entity Search](https://docs.parallel.ai/findall-api/entity-search) is the endpoint built for the job. You pass the entity type "companies" and an objective like "AI startups that raised Series A in 2024" and get back a ranked list of name, URL, and description in seconds. It costs $5 per 1,000 requests with 100 results included and supports up to 1,000 results per call. It is tuned for recall over precision, so treat the tail of the list as candidates still to be verified. Entity Search is in public beta.

[FindAll](https://docs.parallel.ai/findall-api/findall-quickstart) is the verified path. It runs asynchronously, converts your objective into explicit match conditions, evaluates each candidate against them, and attaches citations. Pricing is a fixed cost plus a per-match fee: the base generator is $0.25 plus $0.03 per match, and the pro generator is $10 plus $1 per match for rare or hard-to-find companies. The [Task API](https://docs.parallel.ai/task-api/examples/task-enrichment) handles enrichment over a list, priced per row from $5 per 1,000 for basic metadata to $2,400 per 1,000 for the deepest research tier, and charged only on completed runs. Default limits are 600 requests a minute for Search and Entity Search and 25 runs an hour for FindAll. Accounts get $5 in free credits every month, applied automatically.

**Best for:** multi-constraint company discovery, pipelines that go from a shortlist to a verified list to enriched rows without changing vendors, and teams that want an independent number behind the search layer.

**Tradeoffs:** we had the highest per-run cost on the search-only board apart from Seltz, we lose the search-plus-fetch board to Exa deep, and we hold no firmographic database, so a lookup by domain is a research task for us where a data vendor does a key-value read.

### Exa

Exa is the closest competitor on both company search boards and wins the search-plus-fetch board and the company news board. Its search endpoint is $7 per 1,000 requests, deep modes run $12 to $15 per 1,000 with latencies from about 4 to 40 seconds, and its contents endpoint pulls full page text at $1 per 1,000 pages. New accounts get $20 in credits and $10 more each month. Exa deep took first on search-plus-fetch at 49.2 F1, Exa fast leads the company news board at 99.3%, and Exa instant is the fastest accurate row on that board at 398ms.

Exa also sells list building. The Agent API does asynchronous research, list building, and enrichment, with fixed-effort runs from $0.012 to $1.00 per request and metered runs capped at $5 by default. Websets, the list-building product, has its own dashboard plans starting at $49 a month for 8,000 credits. Our [Websets vs. FindAll comparison](https://parallel.ai/articles/exa-vs-parallel-findall) goes deeper on that pair.

**Best for:** company news and single-fact lookups, agents that fetch pages through the provider's extraction, and teams already on Exa's index.

**Tradeoffs:** precision on the search-only board trails Parallel basic by seven points, and deep mode's median of 89.6 seconds per question was the slowest of the top four.

### Linkup

Linkup's standard depth posted the highest precision on the search-plus-fetch board, 90.3, while landing mid-table on F1 at 41.8. The fast tier hits 41.3 F1 on search-only. Pricing is per request at $0.001 to $0.005 depending on endpoint, with 4,000 free queries a month, and the company leans on European compliance and zero data retention in its enterprise positioning. If false positives are expensive in your workflow, for example when every returned company triggers a human review, Linkup's precision is worth a test. Our [Linkup vs. Parallel](https://parallel.ai/articles/linkup-vs-parallel) piece covers the rest.

### Tavily

Tavily advanced scores 42.0 F1 on search-only, fifth of 20, and was the slowest configuration on that board, at 92.1 seconds median per question and $1.03 per run. Framework integrations and a generous free tier have made it the default in a lot of RAG tutorials. For company research at volume, check the latency and cost numbers first. See [Tavily vs. Parallel](/compare/tavily-vs-parallel).

### Firecrawl and Brave

Both scored between 27 and 31 F1 and both were cheap per run, at $0.281 and $0.265. Firecrawl is a scraping platform with a search endpoint attached. Brave is a general web index with a privacy focus. Neither was designed for multi-hop company discovery, though either can serve as the fetch half of a pipeline.

### Seltz and SERP feeds

Seltz sells a companies-scoped search and scored 14.4 F1 at $1.751 per run, the most expensive row on the board. The Google SERP feed via RapidAPI scored 0.4 in search-only and 0.0 with fetch. Ranked links with thin snippets leave the agent little to reason over.

## The database APIs

None of the firmographic vendors appear on the Openbenchmarks company search board because they answer a different question. You cannot ask People Data Labs for "companies backed by Sequoia that went through Techstars and were founded after 2019" and get a set back; you filter their schema for whatever fields they hold. What you can do is look up a known domain in under a second and get a consistent record, which live web search cannot promise.

The databases do have their own board now. Openbenchmarks' [company enrichment benchmark](https://openbenchmarks.com/company-enrichment) sends the same 282 domains (large companies, long-tail firms, subsidiaries, and recent rebrands) to 11 providers and scores five fields against human-reviewed ground truth: HQ location, industry, headcount band, founded year, and LinkedIn URL. People Data Labs returns the most correct fields at 89.0%, Apollo is the most accurate on what it does return at 92.6%, and both answer in well under a second. Parallel, run through the Responses API, [filled the most fields](https://openbenchmarks.com/company-enrichment/metric/field-coverage) at 94.7% and got 86.0% right, third on that measure, but took a 21-second median per company. For keyed lookups on known domains, the database wins on speed.

| Vendor | What you get | Entry pricing | Notes |
| --- | --- | --- | --- |
| People Data Labs | Company Enrichment and Company Search APIs, fixed schema | Free tier of 100 records a month; Pro from about $100 a month | SOC 2 Type 2; built for domain-keyed enrichment |
| Crunchbase | Funding rounds, investors, acquisitions, people | API access comes with paid plans | Still the deepest single source for funding history |
| Apollo | Organization search and enrichment alongside a contact database | API on all plans; enrichment and org search consume credits when data returns | Free accounts need a work email for enrichment endpoints |
| Coresignal | Company, employee, and jobs records plus an Agentic Search API | Mini plan $49 a month for 2,500 credits; a company record is 10 to 20 credits | Agentic Search is 20 credits per call plus 20 per 20 results |
| Diffbot Knowledge Graph | Billions of entity records, queryable like a table | Free plan with 10,000 credits a month; Startup $299 a month; an entity record is 25 credits | Also sells Extract and Web Search endpoints |
| ZoomInfo | B2B contact and company data via its Enterprise API | Contract pricing | Sold on annual contracts to enterprise teams |
| Clay | Orchestration over 150-plus data partners with waterfall enrichment | HTTP API included from the Growth plan at $495 a month | Charges Data Credits for data and Actions for platform work |

Clay is the odd one out. It holds no data of its own but routes each row through a waterfall of providers, including several on this list, and that waterfall is why its match rates beat any single database. A March 2026 pricing change moved HTTP API calls from free to paid Actions and gated API access behind the Growth tier, so budget for the orchestration layer as its own line item.

## How to choose

1. **Discovering companies from criteria.** Start with Parallel Entity Search or Exa Websets for a fast candidate set, then verify with FindAll or an agent loop over Search basic if the list will drive spend. The search-only board above is the relevant evidence.
2. **Looking up a fact about one company.** If the fact is recent news, a web search API wins and Exa fast leads that board. If the fact is a stable firmographic field like employee count or headquarters, a database lookup is cheaper and returns in milliseconds.
3. **Enriching a list you already have.** For fields inside a vendor's schema, use the database. For fields no vendor collects, such as whether a company mentions SOC 2 on its security page, use the Task API or Exa's Agent API and pay per row.
4. **Monitoring companies over time.** Parallel Monitor and Exa Monitors both run scheduled searches, and the company news board is the closest evidence on which index catches events.

Then run the benchmark yourself. The Openbenchmarks harness is open source on GitHub and the public 10-question set is on Hugging Face, so you can swap in your own questions and providers in an afternoon. Our [guide to benchmarking web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) covers the method.

## A minimal company research call

Most teams start with Entity Search for the candidate set and Search in basic mode for evidence on each candidate.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

# 1. Candidate set in seconds (recall-first, beta)
candidates = client.beta.findall.entity_search(
    entity_type="companies",
    objective="Berlin fintechs that raised a Series A in 2025",
    match_limit=50,
)

# 2. Evidence for one constraint, in the mode that led the benchmark
for company in candidates.entities[:5]:
    search = client.search(
        objective=f"Confirm {company.name} raised a Series A in 2025 and name the lead investor",
        search_queries=[f"{company.name} Series A 2025"],
        mode="basic",
    )
    for result in search.results[:3]:
        print(company.name, result.url, result.excerpts[0][:160])
```

## Frequently asked questions

**What is the best API for company research?** For multi-constraint company discovery, the independent Openbenchmarks board ranks Parallel Search basic first on search-only F1 (50.2) and Exa deep first when the agent can also fetch pages (49.2). For single-fact company news, Exa fast leads at 99.3%. For domain-keyed firmographic lookups, a database is the right tool: on Openbenchmarks' enrichment board, People Data Labs returns the most correct fields (89.0%) and Apollo the fewest wrong ones.

**Is a company data API the same as a company research API?** No. A data API returns a stored record in a fixed schema. A research API searches the live web and assembles an answer, so it handles criteria the data vendor never anticipated and facts newer than the last database refresh, at higher latency and cost per question.

**Why is recall so low on the benchmark?** Each question has between 2 and 37 valid companies, and the agent gets at most 14 searches to find them all. The best configuration recovered under two-fifths. Under a fixed search budget, open-web company discovery misses most of the set, which is why verification steps like FindAll's match conditions exist.

**How much does company research cost per question?** On the benchmark, a full agent run cost between about $0.10 and $1.75 depending on provider, including model tokens. That is the cost of a whole research-agent run. A single search request runs from $1 to $16 per 1,000 across the vendors above.

**Do I need both a database and a research API?** Most production pipelines end up with both: the database for cheap, consistent fields on known companies, and the research API for discovery, recent events, and anything outside the schema.

_Note: For the latest pricing, always check official documentation._

**Related reading:** [Data enrichment API: how to choose, implement, and scale company intelligence](https://parallel.ai/articles/data-enrichment-api-how-to-choose-implement-and-scale-company-intelligence) · [Exa Websets vs. Parallel FindAll](https://parallel.ai/articles/exa-vs-parallel-findall) · [How to automate prospecting with AI search and research APIs](https://parallel.ai/articles/how-to-automate-prospecting-with-ai-search-and-research-apis) · [How investment firms use AI APIs for deal sourcing and research](https://parallel.ai/articles/how-investment-firms-use-ai-apis-for-deal-sourcing-and-research)

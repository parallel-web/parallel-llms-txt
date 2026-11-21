# Parallel vs. Exa

Parallel Search starts at $1 per 1,000 requests against $4 on Exa Lite, and every Task result carries per-field citations and confidence.

[Start building for free](https://platform.parallel.ai/) 

[Artificial Analysis Search Index, November 2026: 83 vs. 80](#accuracy) [Search, per 1,000 requests: $1 vs. $4](#cost) [BrowseComp, July 2026: 51% vs. 33.7%](#accuracy) [Search latency, BrowseComp p50, July 2026: 216ms vs. 361ms](#performance)

Last updated November 20, 2026

## What does Parallel do?

Parallel is one developer platform covering search, extraction, research, entity discovery, and monitoring. On the agentic endpoints, every field comes back with a citation and a confidence score.

* [At a glance](#at-a-glance)
* [Accuracy](#accuracy)
* [Cost](#cost)
* [EU residency](#eu-data-residency)
* [Features](#features)
* [Which to pick](#decision)

## Parallel vs. Exa at a glance

Published list prices and documented capabilities as of November 2026.

__Parallel and Exa compared at a glance__
| Dimension                                       | Parallel                                                                                  | Exa                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Artificial Analysis Search Index, November 2026 | 83 (Advanced), 82 (Fast) (Leads)                                                          | 80 (Auto), 79 (Lite)                                |
| Search list price, per 1,000 requests           | $1 (Turbo or Fast) (Leads)                                                                | $4 on Lite, $7 on Auto                              |
| Agentic multi-hop retrieval (BrowseComp)        | 51% (Turbo); 58% at the deepest Task tier (Leads)                                         | 33.7% (Instant)                                     |
| Field-level citations on agentic runs           | Research Basis on Task, FindAll, and Monitor: URL, excerpt, reasoning, confidence (Leads) | Grounding when a run emits it                       |
| Batch research orchestration                    | Task Groups over reusable Task Specs (Leads)                                              | No documented equivalent                            |
| Change monitoring, per 1,000 executions         | $3 to $10, event stream plus snapshot value diffs                                         | $2, recurring deduplicated search (Leads)           |
| People and company search                       | Responses and Task APIs                                                                   | Dedicated people and company indexes                |
| Framework ecosystem                             | Vercel AI SDK, n8n, LangChain, LlamaIndex, and more                                       | LangChain, LlamaIndex, CrewAI, and 25+ more (Leads) |

Sources: [Artificial Analysis search API benchmark](https://artificialanalysis.ai/agents/search-api), [Parallel pricing](https://parallel.ai/pricing), [Parallel Search Turbo benchmark run](https://parallel.ai/blog/parallel-search-turbo), [Research Basis docs](https://docs.parallel.ai/task-api/guides/access-research-basis), [Parallel Responses docs](https://docs.parallel.ai/responses-api/responses-quickstart), [Parallel Task docs](https://docs.parallel.ai/task-api/task-quickstart)

## #1 on Artificial Analysis in November 2026, and higher on BrowseComp

Parallel Search ranks #1 on the independent Artificial Analysis Search Index, in data dated November 19, 2026\. Artificial Analysis holds one model (GPT-5.6 Luna) and one harness fixed, swaps only the search API, and averages DeepSearchQA, BrowseComp, and AA-Omniscience across 26 search products. Parallel Advanced scores 83 and Parallel Fast 82, against 80 for Exa Auto and 79 for Exa Lite. In that November 2026 data, Parallel Advanced also had the highest DeepSearchQA (89) and AA-Omniscience (74) scores of any product tested.

Vals AI, an independent evaluator that grades agents on expert-written finance and legal research tasks, holds the model and harness fixed and swaps only the search tool. On its web search leaderboard, updated November 17, 2026, Claude Opus 5.5 with Parallel Search (fast) ranks first at 57.5% for $2.27 per task. With the same GPT-5.6 Sol model on both, Parallel Advanced scored 48.3% at $2.27 per task against 45.2% for Exa at $18.97\. Exa’s best result, 48.5% with Claude Fable 5 at $3.48, used a different model.

Openbenchmarks, an independent hub that publishes its harness and every raw vendor response, splits the two by task. On its multi-turn company search board, last run October 2, 2026, Parallel Basic leads search-only at 46.5 F1 against 45.4 for Exa deep. Exa deep leads once the agent can fetch pages, 48.2 against 42.3 for Parallel Basic. Parallel isn’t in Openbenchmarks’ October 21, 2026 run of its company news board, so this page leaves that board out.

Simple lookups are already answered from a model’s weights. The queries that reach a search API are the ones that need a chain of pages followed: find the announcement, open the filing, pull the figure. BrowseComp measures exactly that, and Parallel Turbo scores 51% where Exa Instant scores 33.7%.

The gap holds when you spend more compute. Parallel’s deepest Task tier reaches 58%, above the 57.7% that OpenAI Web Search scored in the same run. On single-hop SimpleQA the two platforms sit close together, which is the point: the harder the query, the wider the margin.

AIMultiple, an independent research publisher, ran one fixed agent (GPT-5.6 Luna) on 120 questions and swapped only the search configuration, 24 in all across six APIs. In its benchmark updated November 10, 2026, Parallel Advanced scored 87.0% answer accuracy and Exa Fast 82.6%, and AIMultiple notes that the two confidence intervals overlap. Parallel Fast scored 79.7% at $0.0063 per correct answer against $0.0193 for Exa Fast, while Exa Fast returned faster, at a 0.47 second median API latency against 0.78 for Parallel Fast. Parallel’s agent could call Extract to read pages, and Exa’s had search with highlights but no content tool.

That margin is why [Harvey](/ai/blog/case-study-harvey) runs its international legal research on Parallel, and why [Kepler](/ai/blog/case-study-kepler) built its finance research on it: work that professionals have to be able to trust.

Sources: [Artificial Analysis search API benchmark](https://artificialanalysis.ai/agents/search-api), [Parallel Search Turbo benchmark run](https://parallel.ai/blog/parallel-search-turbo), [Openbenchmarks multi-turn company search](https://openbenchmarks.com/multi-turn-company-search), [Openbenchmarks company news search](https://openbenchmarks.com/company-news), [Vals AI web search leaderboard](https://www.vals.ai/benchmarks/web%5Fsearch), [Parallel Task docs](https://docs.parallel.ai/task-api/task-quickstart), [Harvey case study](https://parallel.ai/blog/case-study-harvey), [Kepler case study](https://parallel.ai/blog/case-study-kepler), [AIMultiple agentic search benchmark](https://aimultiple.com/agentic-search)

+17.3 points on BrowseComp, Turbo against Instant

Artificial Analysis Search Index

Higher is better

Parallel: 83 (Advanced)

Exa: 80 (Auto)

Vals AI web search leaderboard, same GPT-5.6 Sol model

Higher is better

Parallel: 48.3% (Advanced)

Exa: 45.2%

BrowseComp, agentic multi-hop

Higher is better

Parallel: 51%

Exa: 33.7%

SimpleQA, single-hop factual

Higher is better

Parallel: 91%

Exa: 89.3%

Artificial Analysis row: Search Index data dated November 19, 2026 for Parallel and October 19, 2026 for Exa, a GPT-5.6 Luna (medium) agent with the same harness for every provider, the mean of DeepSearchQA F1, BrowseComp accuracy, and AA-Omniscience accuracy on a 0 to 100 scale. Vals AI row: web search leaderboard updated November 17, 2026, 450 finance and 208 legal tasks, GPT-5.6 Sol with each search tool. BrowseComp and SimpleQA rows: Parallel-run evaluation, July 2026, all 1,266 BrowseComp questions, a GPT-5.4 agent and grader, and up to 20 search and fetch calls per question, Parallel Turbo against Exa Instant in the same harness. Exa publishes its own runs with different configurations and results.

## Turbo and Fast search at a quarter of the Exa Lite price

Parallel Turbo lists at $1 per 1,000 requests, against $4 for Exa Lite and $7 for Exa Auto. Monitoring is cheaper on Exa, at $2 per 1,000 requests against $3 to $10 per 1,000 executions on Parallel.

Agents amplify that difference, because a single user request fans out into dozens of retrieval calls. Parallel prices each tier separately, so you can pin cheap retrieval to the broad sweep and reserve deep tiers for the queries that need them. [Nooks](/ai/blog/case-study-nooks) cut its web search costs 70.5% by switching.

Artificial Analysis measured search spend per 1,000 benchmark tasks. It was $4.63 for Parallel Fast and $23.00 for Parallel Advanced in runs from November 19, 2026, against $31.20 for Exa Lite and $53.17 for Exa Auto in runs from October 19\. Adding the model’s own token spend, 1,000 Parallel Fast tasks cost $14.03 against $42.15 for Exa Lite.

Sources: [Parallel pricing](https://parallel.ai/pricing), [Parallel Monitor docs](https://docs.parallel.ai/monitor-api/monitor-quickstart), [Artificial Analysis search API benchmark](https://artificialanalysis.ai/agents/search-api), [Nooks case study](https://parallel.ai/blog/case-study-nooks)

4× lower list price per 1,000 searches than Exa Lite

Search, per 1,000 requests

Lower is better

Parallel: $1

Exa: $4 (Lite)

Monitoring, per 1,000 executions

Lower is better

Parallel: $3 to $10

Exa: $2

Artificial Analysis search spend per 1,000 tasks

Lower is better

Parallel: $4.63 (Fast)

Exa: $31.20 (Lite)

Published list prices, November 3, 2026\. Exa Lite charges $4 per 1,000 requests with up to 10 results and $1 per 1,000 for each extra result. Artificial Analysis row: search spend only, Parallel Fast measured November 19, 2026, against Exa Lite measured October 19, 2026\. Enterprise pricing differs on both platforms.

## EU data residency for search, which Exa doesn’t document

Parallel serves its Search and Extract APIs from the EU at eu.parallel.ai, under an enterprise agreement. The API, SDKs, and keys are the same as api.parallel.ai, and only the base URL changes. Search runs in basic mode only, with up to 20 results per request, answered from the EU index with no live fetching. Extract takes up to 20 URLs per request. Queries, objectives, results, excerpts, and model inference stay in the EU, and request and response content is not retained.

The EU endpoint has limits. Billing, metrics, and edge logs, which contain no content, go to the US. Extract looks up each URL in Parallel’s cache of public web pages, which is hosted outside the EU. Only the URL is sent, and under zero data retention it isn’t saved. Extract is cache-only when advanced\_settings.fetch\_policy.timeout\_seconds is 0, and uncached URLs then return an error. Other Search modes, Task, FindAll, Monitor, Chat, Responses, and MCP aren’t served in the EU. They return an error and are never forwarded to the US. Our [guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency) compares every vendor’s documented option.

Exa doesn’t document an EU processing option. Its docs offer zero data retention on Enterprise plans, which controls whether data is stored, not where requests run. Exa’s position was read from its own documentation on October 16, 2026.

Sources: [Parallel privacy policy](https://parallel.ai/privacy-policy), [Parallel guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency)

## Feature by feature

Pricing, capabilities, performance, integrations, and enterprise readiness, side by side.

### Pricing and total cost

Parallel bills per request at the tier you pick. Exa mixes pay-as-you-go rates with Websets subscriptions, and charges per content type on extraction.

__Pricing and total cost: Parallel compared with Exa__
| Feature                          | Parallel                                        | Exa                                                              |
| -------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| Cheapest search, per 1,000       | $1 Turbo or Fast, $5 Basic or Advanced (Leads)  | $4 Lite, $7 Auto, $12 Deep                                       |
| Results included                 | 10, then $1 per 1,000 per extra result          | 10, then $1 per 1,000 per extra result                           |
| Extraction, per 1,000            | $1 per URL, excerpts and full markdown included | $1 per page, per content type                                    |
| Deep research, per 1,000 runs    | $5 to $2,400 across 9 fixed-price processors    | $12–$1,000, plus search tool calls and enrichment                |
| Monitoring, per 1,000 executions | $3 to $10                                       | $2, plus $1 per 1,000 results above 10 (Leads)                   |
| Pricing model                    | Pay per request per 1,000                       | Pay-as-you-go per 1,000 plus Websets plans at $49–$449 per month |
| Free tier                        | Up to $80 at signup, plus $5 every month        | $10 every month, plus a one-time $10 onboarding bonus            |

Sources: [Parallel pricing](https://parallel.ai/pricing), [Parallel pricing docs](https://docs.parallel.ai/getting-started/pricing)

### Core capabilities

Both platforms cover search, extraction, research, and monitoring. They diverge on how much task context retrieval receives and how evidence comes back.

__Core capabilities: Parallel compared with Exa__
| Feature                       | Parallel                                                                                           | Exa                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Search input                  | An objective plus up to five keyword queries (Leads)                                               | One query; deep tiers accept additional queries                |
| Citations on agentic runs     | Research Basis per field on Task, FindAll, and Monitor, with calibrated confidence (Leads)         | Grounding on text or fields when a run emits it                |
| Sources on search and extract | Ranked pages and excerpts with source URLs, no Basis                                               | Results and contents with source URLs and highlights           |
| AI summaries in search        | Not offered; Search returns ranked excerpts                                                        | LLM summaries available at extra cost (Leads)                  |
| Research tiers                | 9 fixed-price Task processors, Lite through Ultra8x                                                | 5 fixed effort levels, plus metered auto and ultra modes       |
| Batch orchestration           | Task Groups with group status and bulk retrieval (Leads)                                           | Not documented                                                 |
| Monitoring model              | Event stream, plus snapshot diffs on structured values                                             | Recurring search, deduplicated, delivered by webhook           |
| Entity discovery              | Entity Search for candidates; FindAll for verified sets                                            | Company and People Search; Websets workspace                   |
| Profile shape                 | The fields you ask for, to your own schema                                                         | Fixed profile records from its own indexes                     |
| Content type filters          | Entity Search API for specialized people and company search; additional types via natural language | Company, people, news, papers, financial reports at query time |
| Site crawl and map            | Crawler is internal to the index, not an endpoint                                                  | Subpage crawling within Contents (Leads)                       |

Sources: [Parallel Search docs](https://docs.parallel.ai/search/search-quickstart), [Parallel Extract docs](https://docs.parallel.ai/extract/extract-quickstart), [Parallel FindAll docs](https://docs.parallel.ai/findall-api/findall-quickstart), [Parallel Monitor docs](https://docs.parallel.ai/monitor-api/monitor-quickstart), [Exa vs. Parallel: a platform comparison for AI developers](https://parallel.ai/articles/exa-vs-parallel)

### Performance and scale

Exa now lists search latency of 450ms to 1s, depending on settings. In Parallel’s July 2026 run, Exa Instant, now a legacy search type, measured 335 to 361ms p50 across five suites against 216 to 240ms for Turbo. Both figures are client-side p50, best across runs, measured from us-central. Parallel also allows far more concurrent task throughput.

__Performance and scale: Parallel compared with Exa__
| Feature                                          | Parallel                                     | Exa                                                        |
| ------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------- |
| Search latency, advertised                       | 200ms p50 (Turbo)                            | 450ms to 1s on Search, 4 to 15s on Deep                    |
| Search latency, measured p50                     | 216–240ms (Turbo) across five suites (Leads) | 335–361ms (Instant) across the same five suites            |
| BrowseComp, Parallel’s July 2026 run             | 51% Turbo; 58% Task Ultra8x (Leads)          | 33.7% Instant                                              |
| SimpleQA, Parallel’s July 2026 run               | 91% Turbo                                    | 89.3%                                                      |
| Artificial Analysis time per task, November 2026 | 15.5s (Fast) (Leads)                         | 19.2s (Lite)                                               |
| Own web index                                    | Yes                                          | Yes                                                        |
| Search rate limit                                | 600 RPM                                      | 600 RPM                                                    |
| Research rate limit                              | 2,000 RPM (Leads)                            | 5 new Agent runs a second at the default 10 QPS, 50 active |

Sources: [Parallel Search Turbo benchmark run](https://parallel.ai/blog/parallel-search-turbo), [Artificial Analysis search API benchmark](https://artificialanalysis.ai/agents/search-api), [Parallel rate limits](https://docs.parallel.ai/getting-started/rate-limits)

### Integrations and ecosystem

Exa has the broader framework footprint: prebuilt wrappers that trade tuning for zero setup, the path of least effort if you don’t want to write anything. Parallel leans on OpenAI-compatible interfaces, a keyless MCP server, and warehouse connectors.

__Integrations and ecosystem: Parallel compared with Exa__
| Feature                 | Parallel                                                                           | Exa                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| SDKs                    | Python and TypeScript                                                              | Python and TypeScript                                          |
| CLI                     | Search, extraction, research, enrichment, and monitoring from the terminal (Leads) | Not documented                                                 |
| Framework coverage      | Vercel AI SDK, n8n, LangChain, LlamaIndex, and more                                | LangChain, LlamaIndex, CrewAI, Vercel AI SDK, 25+ more (Leads) |
| MCP                     | Free keyless hosted server, plus Parallel Skills (Leads)                           | MCP and Websets MCP; Agent and Connect in MCP                  |
| OpenAI-compatible route | Synchronous Responses API with streaming and follow-ups                            | /responses maps to the asynchronous Agent API                  |
| Warehouse connectors    | Snowflake, BigQuery, DuckDB                                                        | Exa Connect premium data partners                              |
| Agent-native payments   | x402                                                                               | x402                                                           |

Sources: [Parallel Responses docs](https://docs.parallel.ai/responses-api/responses-quickstart), [Parallel MCP docs](https://docs.parallel.ai/integrations/mcp/quickstart), [Parallel CLI docs](https://docs.parallel.ai/integrations/cli)

### Security, compliance, and support

The two platforms line up closely here. Neither publishes SLA numbers outside an enterprise contract.

__Security, compliance, and support: Parallel compared with Exa__
| Feature               | Parallel                                             | Exa                      |
| --------------------- | ---------------------------------------------------- | ------------------------ |
| SOC 2 Type II         | Yes                                                  | Yes                      |
| Zero data retention   | Enterprise                                           | Enterprise               |
| HIPAA compliance      | Yes                                                  | Yes                      |
| SSO and DPA           | Yes                                                  | Yes                      |
| Published SLA numbers | Enterprise contract only                             | Enterprise contract only |
| EU data residency     | Search (basic mode) and Extract (cache-only) (Leads) | Not documented           |

Sources: [Parallel pricing](https://parallel.ai/pricing), [Parallel Trust Center](https://trust.parallel.ai), [Parallel privacy policy](https://parallel.ai/privacy-policy), [Parallel guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency)

## Which one should you pick?

Both platforms are credible. Parallel is built for production agent workloads where accuracy, evidence, and unit cost decide. Exa is a good fit for independent apps and side projects.

### Pick Parallel when

* You want the lower search price, with Turbo and Fast at $1 per 1,000 requests.
* You want a single provider that covers basic web grounding, batch deep research, and web monitoring.
* You want the most intuitive experience for developers and engineers.
* You need verifiable source attribution on agentic outputs.
* You need consistent outputs at scale.
* You want more control over cost-to-research depth.

### Pick Exa when

* You’re building an independent app or side project where Exa’s broader framework coverage means less initial wiring.
* You want LLM summaries inline in search results and accept the extra cost per result.
* You want to crawl a site’s subpages through the API rather than query an index.

## Switching from Exa

Exa’s four core endpoints have direct Parallel counterparts. Answer and Websets land close by. Port the four first, then validate the results on your own query mix.

[Start your migration](https://platform.parallel.ai/) [Talk to our team](https://contact.parallel.ai/)

1. 01  
### Map the calls you already make  
Exa Search becomes Parallel Search, Contents becomes Extract, Agent becomes Task, and Monitors becomes Monitor. Add your objective alongside the keyword query to give ranking the task context it was missing.
2. 02  
### Keep your existing client  
Python and TypeScript SDKs, a free keyless MCP server, and an OpenAI Responses-compatible endpoint mean the switch is usually a client and parameter change rather than a rewrite.
3. 03  
### Validate before you commit  
New accounts earn up to $80 at signup plus $5 in credits every month, which covers a real evaluation on your own query mix before anything moves to production.

## FAQ

* **Is Parallel better than Exa?**  
For research pipelines where cost per search and evidence per field decide, yes. Parallel Search ranks #1 on Artificial Analysis (November 2026), 83 to Exa’s 80\. Parallel Search starts at $1 per 1,000 requests against $4 on Exa Lite, and every Task field returns its source, reasoning, and confidence. Run both on your own queries before you switch.
* **Parallel vs. Exa: which is cheaper?**  
Parallel on search, at published list prices. Search starts at $1 per 1,000 requests against $4 on Exa Lite and $7 on Exa Auto. Monitoring is cheaper on Exa, at $2 per 1,000 requests against $3 to $10\. Deep research tiers overlap, so price the specific tier your workload needs.
* **Can I migrate from Exa to Parallel?**  
Yes. Search maps to Search, Contents to Extract, Agent to Task, and Monitors to Monitor, with Python and TypeScript SDKs and an OpenAI Responses-compatible endpoint on the Parallel side. Answer and Websets map approximately, to Responses and FindAll, so budget validation time there.
* **Does Parallel have citations that Exa lacks?**  
On agentic runs, yes. Task, FindAll, and Monitor return a Research Basis per field: source URL, excerpt, reasoning, and calibrated confidence. Search and Extract return source URLs without Basis. Exa Agent emits grounding when a run produces it, covering the answer rather than guaranteeing provenance per value.
* **Is Parallel a good Exa alternative for agentic research?**  
Yes. Task Specs fix the input and output contract, Task Groups fan thousands of runs out across a dataset, and nine fixed-price processors let you match compute to query difficulty. Parallel accepts 2,000 task requests per minute by default.
* **Where does Exa still win?**  
Exa Monitors cost $2 per 1,000 requests against Parallel’s $3 to $10\. Exa adds paid per-result AI summaries, subpage crawling, and LangChain, LlamaIndex, CrewAI, and 25+ other integrations. On Openbenchmarks’ company search with page fetching, Exa deep scored 48.2 F1 to Parallel Basic’s 42.3.
* **Does Exa offer EU data residency?**  
Not as of October 16, 2026\. Exa’s documentation describes no EU processing option, though it offers zero data retention on Enterprise plans. Parallel’s EU endpoint serves Search (basic mode) and Extract (cache-only). Other APIs aren’t served there. Billing, metrics, and edge logs (no content) go to the US, and Extract sends only URLs to its page cache outside the EU.
* **How current is this comparison?**  
Parallel reviewed both providers’ docs and prices on November 3, 2026\. BrowseComp, SimpleQA, and latency come from Parallel’s July 2026 run, company search from Openbenchmarks’ October 2 board, and AIMultiple figures from its November 10 benchmark. Company news results are left out while that board is re-run. Artificial Analysis data is from November 19.

Trusted by

* Harvey
* Pfizer
* Dropbox
* Modal
* Opendoor
* Attio
* Granola
* Manus

## Where agents find answers

[Start building for free](https://platform.parallel.ai/) [Contact us](https://contact.parallel.ai/)

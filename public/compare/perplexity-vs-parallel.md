# Parallel vs. Perplexity

In Parallel’s August 2026 run, the Task API scored higher than Perplexity’s high preset on BrowseComp and DeepSearchQA for under a tenth of the measured cost. Parallel also adds per-field evidence, monitoring, and entity discovery on one platform.

[Start building for free](https://platform.parallel.ai/) 

[Multi-hop company search F1, search only: 46.5 vs. 37.8](#accuracy) [DeepSearchQA, deep research APIs: 76% vs. 68%](#research) [BrowseComp deep research, per 1,000 questions: $5 vs. $441.50](#research)

Last updated October 16, 2026

## What does Parallel do?

Parallel is one developer platform covering search, extraction, research, entity discovery, and monitoring. On the agentic endpoints, every field comes back with a citation and a confidence score.

* [At a glance](#at-a-glance)
* [Accuracy](#accuracy)
* [Research](#research)
* [Evidence](#evidence)
* [Monitor and FindAll](#monitoring)
* [EU residency](#eu-data-residency)
* [Features](#features)
* [Which to pick](#decision)

## Parallel vs. Perplexity at a glance

Published list prices, documented capabilities, and dated benchmark results as of October 2026.

__Parallel and Perplexity compared at a glance__
| Dimension                                                      | Parallel                                                              | Perplexity                                         |
| -------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| Deep research on BrowseComp, Parallel’s August 2026 run        | 88% at $5 per 1,000 (Lite), 91% at $25 (Core) (Leads)                 | 86% at $441.50 per 1,000 (high preset)             |
| Multi-hop company search F1, Openbenchmarks                    | 46.5 (Basic, search only) (Leads)                                     | 37.8 (search only)                                 |
| Citations on research output                                   | Research Basis per field: URL, excerpt, reasoning, confidence (Leads) | Inline citations in the answer                     |
| Monitoring and entity discovery                                | Monitor, FindAll, and Entity Search APIs (Leads)                      | No dedicated endpoints documented                  |
| Search list price, per 1,000 requests                          | $1 (Turbo or Fast), $5 (Basic or Advanced)                            | $1 (Fast Search), $5 (standard)                    |
| Artificial Analysis Search Index (independent, September 2026) | 75 advanced, 73 basic                                                 | 80 medium, 79 high (Leads)                         |
| Classification with probabilities                              | No equivalent endpoint                                                | Decisions API at $0.02 per 1M input tokens (Leads) |
| Search rate limit, default                                     | 600 requests per minute                                               | 50 queries per second on every tier (Leads)        |

Sources: [Parallel benchmarks, August and September 2026](https://parallel.ai/benchmarks), [Openbenchmarks Perplexity vs. Parallel](https://openbenchmarks.com/web-search/perplexity-vs-parallel), [Research Basis docs](https://docs.parallel.ai/task-api/guides/access-research-basis), [Parallel pricing](https://parallel.ai/pricing), [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), [Parallel rate limits](https://docs.parallel.ai/getting-started/rate-limits), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel)

## Higher F1 on multi-hop company search

Openbenchmarks is an independent hub that publishes its harness and every raw vendor response. Its October 2026 boards run both APIs on the same three jobs. On multi-turn company search, a fixed agent hunts for every company that matches three or four constraints. From search results alone, Parallel Basic scored 46.5 F1 against 37.8 for Perplexity. Its precision was 88.7 against 79.3, and its recall was 34.4 against 26.8.

Perplexity won the other two jobs. It answered single-fact company news lookups more accurately, 97.3% against 93.3% for Parallel Basic. It completed 77.7% of coding-agent documentation tickets against 77.0% for Parallel Advanced. When the company search agent could also fetch pages, Perplexity scored 46.6 F1 against 42.3 for Parallel Basic. Perplexity’s median search-only company task also cost less, $0.334 against $1.12.

Parallel’s own September 2026 search runs gave both providers the same agent. With a GPT-5.6 Sol agent, Parallel Advanced scored 57.6 on WideSearch against 53.5 and 97% on SimpleQA Verified against 95%. Both scored 74% on BrowseComp, and Perplexity spent less to get there, $275 per 1,000 questions against $399.

The independent Artificial Analysis Search Index scores Perplexity higher. In its September 28, 2026 data, Perplexity Search scored 80 on medium and 79 on high. Parallel advanced scored 75 and Parallel basic 73\. Perplexity medium and Parallel advanced both scored 81 on its DeepSearchQA F1 component.

OpenRouter’s August and September 2026 search benchmarks also favor Perplexity. Each run used a 25-turn search budget. With Claude Opus 5, Perplexity scored 89.0% on BrowseComp against 86.3% for Parallel, and 77.4% on Humanity’s Last Exam against 68.6%. With a GPT-5.6 Sol agent, it scored 84.0% on WideSearch against 80.6%. On DeepSearchQA the two were inside the margin of error, 77.0% for Parallel against 76.5%.

Sources: [Openbenchmarks Perplexity vs. Parallel](https://openbenchmarks.com/web-search/perplexity-vs-parallel), [Openbenchmarks multi-turn company search](https://openbenchmarks.com/multi-turn-company-search), [Openbenchmarks company news search](https://openbenchmarks.com/company-news), [Parallel benchmarks, August and September 2026](https://parallel.ai/benchmarks), [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), [OpenRouter search benchmarks](https://openrouter.ai/benchmarks)

+8.7 F1 points on multi-turn company search, search only

Multi-turn company search F1, search only

Higher is better

Parallel: 46.5

Perplexity: 37.8

WideSearch, frontier agent

Higher is better

Parallel: 57.6

Perplexity: 53.5

Company news lookup accuracy

Higher is better

Parallel: 93.3%

Perplexity: 97.3%

Artificial Analysis Search Index (independent)

Higher is better

Parallel: 75 (advanced)

Perplexity: 80 (medium)

Company search and news rows: Openbenchmarks, boards last updated October 2, 2026\. Company search is 45 questions over three runs, scored as mean F1\. Company news is 300 questions with up to 10 results each. WideSearch row: Parallel-run evaluation, September 9, 2026, a GPT-5.6 Sol agent on a 100-task sample with partial-credit scoring. Perplexity ran search only, and Parallel had search and extract. Artificial Analysis row: that firm’s live data as of September 28, 2026, with the search provider as the only variable.

## Deep research for under a tenth of the cost

Parallel ran its Task API and Perplexity’s Agent API on the same fixed 100-question subsets on August 26, 2026\. On BrowseComp, Task Lite scored 88% at $5 per 1,000 questions, and Task Core scored 91% at $25\. Perplexity’s high preset scored 86% at $441.50\. On DeepSearchQA, Task Lite scored 76% at $5 and Task Pro 83% at $100\. Perplexity high scored 68% at $371.90.

Perplexity publishes higher numbers from its own harness. It reports BrowseComp scores of 78.0 for high and 85.33 for xhigh. It reports DeepSearchQA F1 of 89.6 for high and 93.0 for xhigh. F1 gives partial credit, so it is a different measure from the accuracy in Parallel’s run.

Every Task processor has a fixed price, from $5 to $2,400 per 1,000 runs. You know the cost of a run before it starts. Perplexity’s Agent API bills model tokens plus each tool call. The cost of a run depends on how many searches and fetches the agent makes.

Sources: [Parallel benchmarks, August and September 2026](https://parallel.ai/benchmarks), [Parallel Task docs](https://docs.parallel.ai/task-api/task-quickstart), [Parallel pricing](https://parallel.ai/pricing), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel)

88× lower measured cost on BrowseComp, Task Lite against Perplexity high

BrowseComp accuracy, Task Lite against high preset

Higher is better

Parallel: 88%

Perplexity: 86%

BrowseComp cost, per 1,000 questions

Lower is better

Parallel: $5

Perplexity: $441.50

DeepSearchQA accuracy, Task Lite against high preset

Higher is better

Parallel: 76%

Perplexity: 68%

DeepSearchQA cost, per 1,000 questions

Lower is better

Parallel: $5

Perplexity: $371.90

Parallel-run evaluation, August 26, 2026, on fixed 100-question subsets of BrowseComp and DeepSearchQA held constant across every configuration. Cost is measured end-to-end spend per 1,000 questions. Perplexity ran through the Agent API high preset. Perplexity’s own figures come from its Agent API benchmarks page, on a different harness.

## A citation and a confidence score on every field

Both APIs return structured output against a JSON Schema. Parallel also returns a Research Basis for each field. It holds the source URLs, the supporting excerpts, the reasoning, and a confidence rating. A pipeline can send low-confidence values to review and accept the rest. Perplexity’s Agent API cites sources inline in the answer, with no per-field confidence.

Task Groups run thousands of rows over one Task Spec and stream progress as runs complete. A finished run can post to your webhook. Perplexity’s background mode runs long jobs asynchronously, and you poll or stream each response by its id. Perplexity lists completion webhooks on its roadmap.

Parallel accepts 2,000 Task runs per minute on every account by default. Perplexity’s Agent API allows 1 to 33 requests per second, set by lifetime spend. That is 60 per minute for a new account and 1,980 per minute after $1,000 in purchases.

Sources: [Research Basis docs](https://docs.parallel.ai/task-api/guides/access-research-basis), [Parallel Task Group docs](https://docs.parallel.ai/task-api/group-api), [Parallel Task webhook docs](https://docs.parallel.ai/task-api/webhooks), [Parallel rate limits](https://docs.parallel.ai/getting-started/rate-limits), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel)

33× more research runs per minute for a new account

Research runs per minute, new account

Higher is better

Parallel: 2,000

Perplexity: 60

Default limits from each provider’s documentation, October 2026\. Parallel counts Task runs created, and GET polling does not count. Perplexity counts Agent API requests per second per organization, from 1 at Tier 0 to 33 at Tier 4 and above.

## Monitoring and entity discovery as endpoints

Monitor runs a query on a schedule and posts new events to your webhook. You pick hourly, daily, or weekly checks. You define the query once and skip the cron jobs and deduplication. Monitor costs $3 to $10 per 1,000 checks. Perplexity documents no monitoring endpoint. Its cookbook builds a news monitor from repeated Search API calls.

FindAll turns a description into a verified, structured list of matching entities. Each run costs a fixed fee plus $0.03 to $1 per match, set by the generator you pick. Entity Search returns candidate entities in one call. Perplexity offers people search and finance search as Agent API tools. It has no endpoint that builds a verified entity list.

Sources: [Parallel Monitor docs](https://docs.parallel.ai/monitor-api/monitor-quickstart), [Parallel FindAll docs](https://docs.parallel.ai/findall-api/findall-quickstart), [Parallel Entity Search docs](https://docs.parallel.ai/findall-api/entity-search), [Parallel pricing](https://parallel.ai/pricing)

## EU data residency for search, which Perplexity doesn’t document

Parallel serves its Search and Extract APIs from the EU at eu.parallel.ai, under an enterprise agreement. The API, SDKs, and keys are the same as api.parallel.ai, and only the base URL changes. Search runs in basic mode only, with up to 20 results per request, answered from the EU index with no live fetching. Extract takes up to 20 URLs per request. Queries, objectives, results, excerpts, and model inference stay in the EU, and request and response content is not retained.

The EU endpoint has limits. Billing, metrics, and edge logs, which contain no content, go to the US. Extract looks up each URL in Parallel’s cache of public web pages, which is hosted outside the EU. Only the URL is sent, and under zero data retention it isn’t saved. Extract is cache-only when advanced\_settings.fetch\_policy.timeout\_seconds is 0, and uncached URLs then return an error. Other Search modes, Task, FindAll, Monitor, Chat, Responses, and MCP aren’t served in the EU. They return an error and are never forwarded to the US. Our [guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency) compares every vendor’s documented option.

Perplexity doesn’t document an EU processing option. Its API FAQ says compute is hosted on Amazon Web Services in North America. By default the API keeps no prompt data, so retention is covered but location isn’t. Perplexity’s position was read from its own documentation on October 16, 2026.

Sources: [Parallel privacy policy](https://parallel.ai/privacy-policy), [Parallel guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency)

## Feature by feature

Pricing, capabilities, performance, integrations, and enterprise readiness, side by side.

### Pricing and total cost

Search list prices match at $1 and $5 per 1,000\. Perplexity is cheaper for page fetches and short cited answers. Parallel prices deep research per processor, so you know the cost before a run starts.

__Pricing and total cost: Parallel compared with Perplexity__
| Feature                                 | Parallel                                         | Perplexity                                                 |
| --------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| Search, per 1,000 requests              | $1 Turbo or Fast, $5 Basic or Advanced           | $1 Fast Search, $5 standard                                |
| Results included per search             | 10, with more billed per result                  | Up to 20 at the same price (Leads)                         |
| Page fetch, per 1,000 URLs              | $1 with Extract, excerpts or full markdown       | $0.50 with fetch\_url, plus Agent API tokens (Leads)       |
| Short cited answers, per 1,000 requests | $10 to $250 with Responses                       | About $5.50 for a typical low preset run (Leads)           |
| Deep research, per 1,000 runs           | $5 to $2,400, fixed per processor (Leads)        | Model tokens plus tool calls, varies by run                |
| Free tier                               | Up to $80 at signup, plus $5 every month (Leads) | No API credit documented, Fast Search free in Hermes Agent |

Sources: [Parallel pricing](https://parallel.ai/pricing), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel)

### Core capabilities

Both platforms cover search, page fetching, cited answers, and agentic research. Perplexity adds probability-scored decisions, embeddings, and code execution. Parallel adds per-field evidence, batch orchestration, monitoring, and entity discovery.

__Core capabilities: Parallel compared with Perplexity__
| Feature                      | Parallel                                                        | Perplexity                                                  |
| ---------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| Search input                 | An objective plus up to five keyword queries                    | Up to five queries per request                              |
| Citations on research        | Research Basis per field, with confidence (Leads)               | Inline citations in the answer                              |
| Structured research output   | Task Specs with input and output schemas                        | JSON Schema on the Agent API                                |
| Batch orchestration          | Task Groups with streamed progress (Leads)                      | Not documented                                              |
| Completion webhooks          | Task, FindAll, and Monitor webhooks (Leads)                     | On Perplexity’s roadmap, poll or stream for now             |
| Monitoring                   | Monitor API with scheduled queries and webhooks (Leads)         | No dedicated endpoint documented                            |
| Entity discovery             | Entity Search for candidates, FindAll for verified sets (Leads) | People and finance search tools, no list builder            |
| Decisions with probabilities | No equivalent endpoint                                          | Decisions API: yes or no, choice, and rubric scores (Leads) |
| Embeddings                   | Not offered                                                     | Embeddings API from $0.004 per 1M tokens (Leads)            |
| Code execution               | Not offered                                                     | Sandbox tool at $0.03 per session (Leads)                   |

Sources: [Parallel Search docs](https://docs.parallel.ai/search/search-quickstart), [Parallel Extract docs](https://docs.parallel.ai/extract/extract-quickstart), [Research Basis docs](https://docs.parallel.ai/task-api/guides/access-research-basis), [Parallel Task Group docs](https://docs.parallel.ai/task-api/group-api), [Parallel Monitor docs](https://docs.parallel.ai/monitor-api/monitor-quickstart), [Parallel FindAll docs](https://docs.parallel.ai/findall-api/findall-quickstart), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel), [Perplexity Search API vs. Parallel Search API](https://parallel.ai/articles/perplexity-search-api-vs-parallel-search-api)

### Performance and scale

Openbenchmarks measured Parallel Turbo at a mean of 348ms on company news lookups against 1.38 seconds for Perplexity standard search. Perplexity Fast Search was not on that board. Perplexity allows far more search requests per minute. Parallel allows more research runs on a new account.

__Performance and scale: Parallel compared with Perplexity__
| Feature                                          | Parallel                          | Perplexity                                    |
| ------------------------------------------------ | --------------------------------- | --------------------------------------------- |
| Search latency, advertised                       | About 200ms (Turbo), 700ms (Fast) | 160ms median, 230ms p95 (Fast Search)         |
| Search latency, measured mean                    | 348ms (Turbo) (Leads)             | 1.38s (standard search)                       |
| Cost per 1,000 correct news answers              | $1.16 (Fast) (Leads)              | $5.14                                         |
| Artificial Analysis Search Index, September 2026 | 75 advanced, 73 basic             | 80 medium, 79 high (Leads)                    |
| Artificial Analysis time per task                | 25.6s basic, 40.7s advanced       | 26.9s medium, 27.6s high                      |
| Search rate limit                                | 600 per minute                    | 50 per second, about 3,000 per minute (Leads) |
| Research rate limit, new account                 | 2,000 per minute (Leads)          | 1 per second, rising to 33 with spend         |

Sources: [Openbenchmarks company news search](https://openbenchmarks.com/company-news), [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), [Parallel rate limits](https://docs.parallel.ai/getting-started/rate-limits), [Parallel pricing](https://parallel.ai/pricing)

### Integrations and ecosystem

Both ship Python and TypeScript SDKs, a hosted MCP server, and an OpenAI-compatible route. Perplexity lets you pick models from several labs behind one key. Parallel connects to data warehouses and spreadsheets for enrichment.

__Integrations and ecosystem: Parallel compared with Perplexity__
| Feature                      | Parallel                                                          | Perplexity                                                   |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| SDKs                         | Python and TypeScript                                             | Python and TypeScript                                        |
| Model choice                 | Parallel’s own processors                                         | Models from OpenAI, Anthropic, Google, xAI, and more (Leads) |
| OpenAI-compatible route      | Responses API with streaming and follow-ups                       | Agent API works with OpenAI SDKs                             |
| MCP                          | Free keyless hosted Search MCP, plus Task MCP                     | Hosted MCP server with OAuth or API key                      |
| Agent framework integrations | LangChain, Vercel, n8n, LiteLLM, Zapier, and more                 | LangChain, Vercel AI SDK, n8n, LiteLLM, Mastra, and more     |
| Data warehouse integrations  | Snowflake, BigQuery, Spark, DuckDB, Polars, Google Sheets (Leads) | Not documented                                               |

Sources: [Parallel Responses docs](https://docs.parallel.ai/responses-api/responses-quickstart), [Parallel MCP docs](https://docs.parallel.ai/integrations/mcp/quickstart), [Parallel integrations](https://docs.parallel.ai/integrations/developer-quickstart), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel)

### Security, compliance, and support

Both hold SOC 2 Type II. Parallel is HIPAA compliant. Perplexity lists a 2025 HIPAA gap assessment and states zero data retention for its Chat Completions API.

__Security, compliance, and support: Parallel compared with Perplexity__
| Feature                  | Parallel                                             | Perplexity                          |
| ------------------------ | ---------------------------------------------------- | ----------------------------------- |
| SOC 2 Type II            | Yes                                                  | Yes                                 |
| HIPAA compliance         | Yes (Leads)                                          | 2025 HIPAA gap assessment listed    |
| Zero data retention      | Enterprise                                           | Stated for the Chat Completions API |
| Data Processing Addendum | Yes                                                  | Not stated in API docs              |
| Cloud marketplaces       | AWS and Google Cloud                                 | AWS                                 |
| EU data residency        | Search (basic mode) and Extract (cache-only) (Leads) | Not documented                      |

Sources: [Parallel pricing](https://parallel.ai/pricing), [Parallel Trust Center](https://trust.parallel.ai), [Parallel integrations](https://docs.parallel.ai/integrations/developer-quickstart), [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel), [Parallel privacy policy](https://parallel.ai/privacy-policy), [Parallel guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency)

## Which one should you pick?

Parallel suits research pipelines where cost per run, evidence per field, and monitoring decide. Perplexity suits apps that want quick cited answers, model choice, and decisions with probabilities.

### Pick Parallel when

* You run deep research at volume and want a fixed price per run, known before it starts.
* You need a citation, reasoning, and a confidence score on every field of a research result.
* You want to monitor the web on a schedule and receive new events by webhook.
* You need verified lists of companies or people that match your criteria.
* You handle protected health information and need a HIPAA-compliant provider.

### Pick Perplexity when

* You need to classify, route, or grade content with probabilities, which the Decisions API returns.
* You want embeddings, code execution, and models from several labs behind one key.
* You serve quick cited answers at high volume and per-request cost matters most.
* You need more than 600 search requests per minute or 20 results per call.
* Single-fact lookup accuracy is your main benchmark.

## Switching from Perplexity

Search, page fetches, and agentic research have direct Parallel counterparts. The Decisions and Embeddings APIs do not, so keep Perplexity for those and port the rest.

[Start your migration](https://platform.parallel.ai/) [Talk to our team](https://contact.parallel.ai/)

1. 01  
### Map the calls you already make  
The Search API becomes Parallel Search, and fetch\_url becomes Extract. Agent API research runs become Task runs when you want a schema, or Responses calls when you want a chat-shaped answer. Sonar calls that moved to Agent API presets map the same way.
2. 02  
### Translate the parameters  
Fast Search maps to Turbo or Fast, and standard search to Basic or Advanced. Domain filters move into the source policy. Presets map to processors, from Lite for quick lookups to Pro and Ultra for exhaustive research.
3. 03  
### Validate before you commit  
New accounts earn up to $80 at signup plus $5 in credits every month. That covers a real evaluation on your own query mix before anything moves to production.

## FAQ

* **Is Parallel better than Perplexity?**  
For deep research and multi-hop search, yes. In Parallel’s August 2026 run, Task Lite scored higher than Perplexity’s high preset on BrowseComp and DeepSearchQA at $5 per 1,000 questions against $441.50 and $371.90\. On Openbenchmarks, Parallel scored 46.5 F1 on multi-hop company search against 37.8\. Perplexity scores higher on single-fact lookups and on several independent search indexes.
* **What is Perplexity’s Decisions API?**  
It is a classification model, not a web API. You send text, JSON, or images and ask yes or no, choice, or rubric questions. It returns a probability for each answer. It never fetches a URL. It costs $0.02 per million input tokens with free output, at 10 requests per second. Parallel has no equivalent.
* **What replaced Perplexity Sonar?**  
Perplexity ended Sonar Chat Completions support on September 27, 2026\. Synchronous Sonar calls are being reformulated as Agent API requests, and async calls must move to background mode. On Parallel, the closest counterparts are the Responses API for quick cited answers and the Task API for structured research.
* **Parallel vs. Perplexity: which is cheaper?**  
Search costs the same, $1 per 1,000 on the fast tiers and $5 on standard. Perplexity is cheaper for page fetches and short cited answers. Parallel was far cheaper on deep research in its August run, at $5 per 1,000 BrowseComp questions against $441.50, and its processors have fixed prices.
* **Where does Perplexity still win?**  
Perplexity scores higher on the Artificial Analysis Search Index, 80 against 75, and on OpenRouter’s BrowseComp, WideSearch, and HLE runs. It was more accurate on Openbenchmarks’ single-fact news lookups. It offers the Decisions API, embeddings, a code sandbox, and model choice. Its search rate limit is about 3,000 requests a minute against Parallel’s 600.
* **Does Perplexity offer EU data residency?**  
Not as of October 16, 2026\. Perplexity’s API FAQ says its compute is hosted on Amazon Web Services in North America. Parallel’s EU endpoint serves Search (basic mode) and Extract (cache-only). Other APIs aren’t served there. Billing, metrics, and edge logs (no content) go to the US, and Extract sends only URLs to its page cache outside the EU.
* **How current is this comparison?**  
Parallel reviewed Perplexity’s docs, pricing, and changelog on October 14, 2026\. Deep research figures come from Parallel’s August 26 run, search figures from its September 9 run, and the Openbenchmarks figures from its October 2 boards. Artificial Analysis data is from September 28, and OpenRouter runs from August and September. Check the linked sources for updates.

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

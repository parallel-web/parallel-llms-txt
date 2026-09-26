# Best deep research APIs in 2026: a benchmark report

We compared five deep research offerings on the same fixed 100-question subsets of DeepSearchQA and BrowseComp, using the August 2026 Task API results on parallel.ai/benchmarks. DeepSearchQA accuracy ranged from 65% to 86%, and cost per 1,000 questions ranged from $5 to about $1,500. The report ranks the offerings and shows how to run the same evaluation on your own queries.

Five deep research APIs all describe themselves the same way: multi-step web research, many sources, synthesized answers with citations. We put the same fixed question sets through each one. On DeepSearchQA, accuracy ran from 65% to 86%, a 21-point spread despite near-identical marketing copy, and cost per 1,000 questions ran from $5 to about $1,500.

The spread matters because agents chain research into downstream steps. One wrong fact early cascades into a wrong report, a wrong enrichment, or a wrong decision. If you're building on top of a deep research layer, accuracy on hard multi-hop questions is the number that predicts real-world reliability. To understand [what deep research means for agents](https://parallel.ai/articles/what-is-deep-research), start with how these systems reason across sources rather than retrieve single pages.

This guide evaluates one offering per vendor: the specific product it fields for deep research, tested on the same question subsets. For Parallel, we report each plotted Task API tier.

## The benchmark at a glance

The figures below come from the Task API benchmarks on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (August 2026). DeepSearchQA is a deep-research evaluation of multi-step questions, and [BrowseComp](https://openai.com/index/browsecomp/), created by OpenAI, tests persistent browsing for hard-to-find, entangled facts. Each ran on a fixed 100-question subset held constant across every Parallel configuration and every competitor.

Competitors ran in their highest-quality configurations: GPT-5.6 Sol PTC max, Gemini 3.1 Pro high, Perplexity high, and Exa Agent Max. Cost is reported as CPM: measured end-to-end spend for the run, divided by the number of questions and multiplied by 1,000.

| Vendor | Configuration | DeepSearchQA accuracy (%) | DeepSearchQA CPM | BrowseComp accuracy (%) | BrowseComp CPM |
| --- | --- | --- | --- | --- | --- |
| Parallel | Task API Lite | 76 | 5 | 88 | 5 |
| Parallel | Task API Base | 77 | 10 | Not plotted | Not plotted |
| Parallel | Task API Core | Not plotted | Not plotted | 91 | 25 |
| Parallel | Task API Core2x | 81 | 50 | Not plotted | Not plotted |
| Parallel | Task API Pro | 83 | 100 | Not plotted | Not plotted |
| Parallel | Task API Ultra | Not plotted | Not plotted | 92 | 300 |
| Parallel | Task API Ultra2x | 85 | 600 | 93 | 600 |
| Parallel | Task API Ultra4x | 86 | 1,200 | 94 | 1,200 |
| OpenAI | GPT-5.6 Sol PTC max | 85 | 1,047.8 | 85 | 791.1 |
| Google | Gemini 3.1 Pro high | 77 | 123.9 | 72 | 194.4 |
| Perplexity | Perplexity high | 68 | 371.9 | 86 | 441.5 |
| Exa | Exa Agent Max | 65 | 1,506.5 | 78 | 1,043.5 |

Parallel ran all testing on August 26, 2026. Not every Parallel tier is plotted on both benchmarks, so the table shows only published figures. Providers iterate quickly, so treat every figure as a snapshot of that day.

## The offerings, ranked by fully-correct accuracy

The entries below lead with Parallel, then follow the roster in order of DeepSearchQA accuracy. Each entry explains how the offering works, its measured cost and accuracy, the workload it fits, and its main tradeoff.

### 1. Parallel Task API

![](https://cdn.sanity.io/images/5hzduz3y/production/07c4e83bb204bd285604fb08636deb9ae11dbff9-3588x1800.png)

[Parallel's Task API](https://parallel.ai/products/task) combines large language model (LLM) inference with web search and live crawling to automate structured web research. You define what you need in plain language or a JSON schema, and the API handles research, synthesis, and structured output with citations and calibrated confidence. Processor tiers from lite through ultra8x match compute to task complexity, so you tune cost, latency, and depth per task. Delivery is asynchronous, and you can request [auto-structured output](https://parallel.ai/blog/task-api-auto-mode) when you'd rather let the system choose the schema. We back the whole pipeline with our own proprietary web-scale index rather than a third-party search provider.

On DeepSearchQA, Parallel posted the top score in the run: Ultra4x reached 86% at 1,200 CPM and Ultra2x 85% at 600 CPM. The lower tiers held up well: Pro scored 83% at 100 CPM, Core2x 81% at 50 CPM, and Lite 76% at 5 CPM. On BrowseComp, every plotted Parallel tier outscored every competitor, from Lite at 88% (5 CPM) to Ultra4x at 94% (1,200 CPM). The margin isn't uniform: GPT-5.6 Sol came within a point on DeepSearchQA, and Gemini 3.1 Pro high costs less than Parallel's Ultra tiers. For teams integrating over the Model Context Protocol, [the Task MCP Server](https://parallel.ai/blog/parallel-task-mcp-server) exposes the same processors as a tool.

**Best for:** production deep research and enrichment workflows that need verifiable, structured output at scale, including [legal research at scale](https://parallel.ai/blog/case-study-harvey), [financial research workflows](https://parallel.ai/blog/case-study-kepler), due diligence, and compliance checks.

**Tradeoffs:** we're a newer platform with a smaller ecosystem and community than the incumbent model providers. The Task API is asynchronous by design, with runs from 10 seconds to two hours, so it targets research depth rather than sub-second interactive latency.

### 2. GPT-5.6 Sol (PTC max)

![OpenAI Platform playground with the gpt-6-sol model selected](https://cdn.sanity.io/images/5hzduz3y/production/e64c0fb3c5b3793f25ca0b8f20b9a65954411c02-3600x1958.png)

GPT-5.6 Sol runs as a general-purpose model agent inside OpenAI's [agent harness](https://parallel.ai/articles/what-is-an-agent-harness), performing multi-step reasoning, web search, and tool calls to research and synthesize an answer. The benchmark ran it in its PTC max configuration (programmatic tool calling). Pricing flows through the provider's token and tool-call metering, which the benchmark expresses as a per-1,000-question CPM. OpenAI has since released GPT-6 Sol (September 22, 2026) at half GPT-5.6 Sol's token price, $2 input and $10 output per million tokens; the results below are for GPT-5.6 Sol as tested in August.

On DeepSearchQA, it reached 85% at 1,047.8 CPM, one point behind Parallel Ultra4x and level with Ultra2x at 600 CPM. On BrowseComp, it scored 85% at 791.1 CPM. It runs on a mature, widely adopted platform with a large developer ecosystem, strong tooling, and documentation.

**Best for:** teams already standardized on OpenAI's model stack that want general agentic research from the same provider.

**Tradeoffs:** it's the closest competitor on DeepSearchQA, but it cost more than Parallel tiers at the same accuracy, trailed every plotted Parallel tier on BrowseComp, and isn't a purpose-built research product with per-field citations and confidence.

### 3. Gemini 3.1 Pro (high)

![](https://cdn.sanity.io/images/5hzduz3y/production/ea6302114df0e9faec83c4c59ab31be20a024b15-3586x1814.png)

Gemini 3.1 Pro is Google's general-purpose model agent, running web search and tool calls inside its own agent harness to produce an answer or report. The benchmark ran it at high reasoning. Pricing is metered the same way as GPT-5.6 Sol's and expressed as CPM.

On DeepSearchQA, it reached 77% at 123.9 CPM, level with Parallel Base (10 CPM) and cheaper than Parallel's Ultra2x and Ultra4x tiers, though Pro scored 83% for less (100 CPM). On BrowseComp, it scored 72% at 194.4 CPM, the lowest score in the run. A very large context window suits it to synthesizing long source sets, it draws on Google-scale infrastructure and search heritage, and it brings broad multimodal capability.

**Best for:** teams in the Google and Gemini ecosystem that need broad multimodal reasoning alongside research.

**Tradeoffs:** accuracy trailed Parallel's higher tiers on both benchmarks, and Parallel Base matched its DeepSearchQA score at a fraction of the cost. It's a general-purpose harness rather than a structured research API with per-field citations and confidence.

### 4. Perplexity (high)

![](https://cdn.sanity.io/images/5hzduz3y/production/e69442037580bae87bd411e5218b9e5ecf6c9f1e-3600x1812.png)

Perplexity is a search-native offering, benchmarked through its API in its high configuration. It runs web search and synthesis to produce a cited answer. Pricing is per request, expressed as CPM.

On DeepSearchQA, it reached 68% at 371.9 CPM. BrowseComp was its stronger result: 86% at 441.5 CPM, behind every plotted Parallel tier but ahead of GPT-5.6 Sol, Exa, and Gemini. Its search-native design returns citation-backed answers, and it carries a familiar consumer-grade research experience into an API that's simple to adopt.

**Best for:** citation-backed research on hard-to-find facts, where exhaustive multi-answer coverage matters less.

**Tradeoffs:** on DeepSearchQA it trailed Parallel Lite (76% at 5 CPM) at more than 70 times the cost, and Parallel Lite also scored higher on BrowseComp (88%).

### 5. Exa Agent Max

Exa Agent Max is Exa's highest-quality agentic research configuration, built on Exa's neural search index. It runs multi-step search and synthesis to return a cited answer, and it's priced through Exa's usage-based metering, expressed here as CPM.

On DeepSearchQA, it reached 65% at 1,506.5 CPM, the lowest accuracy and the highest cost in the run. On BrowseComp, it scored 78% at 1,043.5 CPM, ahead of Gemini 3.1 Pro high.

**Best for:** teams already built on Exa's search index that want research running on the same retrieval layer.

**Tradeoffs:** it trailed every plotted Parallel tier on both benchmarks, and Parallel Lite outscored it on each at 5 CPM.

## Why the benchmark is only a starting point

A benchmark table, including the tables in this article, is a starting point. It tells you how a fixed set of offerings scored on held-out samples on one day. It doesn't tell you how any of them will perform on your workloads, your domains, and your query patterns, which differ from a research QA sample in ways that move results.

You should know we're biased. Parallel builds the Task API, and we want you to choose it. The only test that settles the question runs your real production queries head-to-head across the offerings you're considering and measures whether each one completes your end task correctly.

That's also how teams move to Parallel. They run their own queries against Parallel and their incumbent, compare end-task success and cost, and switch when the numbers hold up on their own data. The benchmark points you toward candidates worth testing, and your own evaluation decides which one gets production traffic. If your workload spans [legal research at scale](https://parallel.ai/blog/case-study-harvey) or something narrower, the test is the same.

## Run the test yourself in about a day

You can run a credible head-to-head evaluation in roughly a day. The steps below adapt our [benchmarking method for search and research APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) to deep research.

1. Sample real production queries. Pull 30 to 50 queries from your actual traffic or backlog, weighted toward the hard, multi-hop cases that break systems, rather than easy lookups that everything answers.
2. Run each offering head-to-head at its default configuration. Send the same queries to every candidate without hand-tuning, so you measure what your team will ship. To move quickly, [run tasks concurrently in batches](https://parallel.ai/blog/task-group-api) instead of one at a time.
3. Judge end-task success, not retrieval metrics. Score whether the final output does the job the query was meant to accomplish. Retrieval scores and citation counts don't tell you if the answer was right.
4. Measure cost and latency per successful task. A cheaper request that fails twice before succeeding costs more than one that lands the first time, so normalize on successful outcomes.
5. Rerun periodically. Providers change models, pricing, and harnesses often, and this benchmark will age. Schedule a rerun each quarter or when a provider ships a major update.

## Frequently asked questions about deep research APIs

### What is a deep research API?

A deep research API takes a question or a structured request, searches and reads across the live web, reasons over many sources, and returns a synthesized answer with citations. It automates the multi-step research a person would otherwise do by hand, and it exposes that work as a programmable endpoint your application can call.

### How does a deep research API differ from a search API?

A [web search API](https://parallel.ai/articles/what-is-a-web-search-api) returns ranked results and excerpts for a query, and your application decides what to do with them. A deep research API goes further: it runs multiple search and reasoning steps, reads across sources, and returns a synthesized answer rather than a list of links. Search suits single-hop lookups, and deep research suits complex questions that need synthesis across many pages.

### How should you evaluate deep research accuracy?

Evaluate on your own queries, and score fully-correct outcomes rather than partial matches. A response that's mostly right can still break a downstream workflow. Weight your test set toward the hard, multi-hop questions that separate offerings, and measure end-task success instead of retrieval proxies.

### How does pricing usually work?

Most offerings price per request or per completed run, often quoted as CPM, meaning USD per 1,000 requests. General-purpose model harnesses meter tokens and tool calls, so cost varies with how many calls a run makes. Purpose-built research APIs often bill per run at a fixed tier price, which makes cost per task easier to predict.

### What latency should you expect?

Deep research trades speed for depth. A synchronous search call returns in seconds, and a deep research run can take from tens of seconds to well over an hour, depending on the complexity and the tier. Asynchronous delivery through polling, streaming, or webhooks fits these workloads, so plan for research depth rather than interactive latency.

## Try it on your own queries

Run the evaluation on your own queries. You can start on Parallel's free tier, which includes $5 in free credits every month, send your hardest research questions through the Task API, and compare the results against whatever you run today. [Start Building](https://docs.parallel.ai/home).

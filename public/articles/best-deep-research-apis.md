# Best deep research APIs in 2026: a benchmark report

We ran the same 100 hard research questions through six deep research offerings. Fully-correct accuracy spanned a 54-point spread, from 28% to 82%, despite near-identical marketing copy. The report ranks the offerings and shows how to run the same evaluation on your own queries.

How different can six deep research APIs be? They all describe themselves the same way: multi-step web research, many sources, synthesized answers with citations. We put the same 100 hard questions through each one. Fully-correct accuracy ran from 28% to 82%, a 54-point spread despite near-identical marketing copy.

The spread matters because agents chain research into downstream steps. One wrong fact early cascades into a wrong report, a wrong enrichment, or a wrong decision. If you're building on top of a deep research layer, accuracy on hard multi-hop questions is the number that predicts real-world reliability. To understand [what deep research means for agents](https://parallel.ai/articles/what-is-deep-research), start with how these systems reason across sources rather than retrieve single pages.

This guide evaluates one offering per vendor: the specific product it fields for deep research, tested on the same 100 questions.

## The benchmark at a glance

The figures below come from DeepSearchQA, a deep-research evaluation run against a random 100-question subset held constant across every offering. Accuracy means fully correct: a response counts only when its answer set is semantically identical to the ground-truth set, identifying every correct answer while including zero incorrect ones. That standard is strict on purpose, because partial credit hides the errors that break agent workflows.

Every system ran in its highest-quality configuration with no budget constraints. The general-purpose models used their own agent harnesses with web browsing and code execution, and Perplexity ran through its Sonar Pro API. Cost is reported as CPM, meaning USD per 1,000 requests.

| Series | Model | Cost (CPM) | Fully-correct accuracy (%) | Architecture type | Strongest fit |
| --- | --- | --- | --- | --- | --- |
| Parallel | Task API Ultra8x | 2,400 | 82 | Purpose-built research API | Hardest multi-hop research |
| Parallel | Task API Ultra4x | 1,200 | 81 | Purpose-built research API | Difficult deep research |
| Parallel | Task API Ultra2x | 600 | 77 | Purpose-built research API | Balanced cost and depth |
| Parallel | Task API Ultra | 300 | 70 | Purpose-built research API | Cost-sensitive deep research |
| Others | GPT-5.4 with code execution | 701 | 63 | General-purpose model harness | General agentic research plus code |
| Others | Gemini 3.1 Pro with code execution | 707 | 62 | General-purpose model harness | Long-context multimodal research |
| Others | Opus 4-6 with PTC | 36,231 | 58 | General-purpose model harness | Claude-style reasoning at low volume |
| Others | Perplexity Sonar Deep Research | 883 | 28 | Search-native research offering | Fast, lighter citation-backed lookups |

Parallel ran all testing between April 1 and April 6, 2026. Providers iterate quickly, so treat every figure as a snapshot of that window.

## The offerings, ranked by fully-correct accuracy

The entries below lead with Parallel, then follow the roster in order of fully-correct accuracy. Each entry explains how the offering works, its sourced cost and accuracy, the workload it fits, and an honest tradeoff.

### 1. Parallel Task API

![](https://cdn.sanity.io/images/5hzduz3y/production/07c4e83bb204bd285604fb08636deb9ae11dbff9-3588x1800.png)

[Parallel's Task API](https://parallel.ai/products/task) combines large language model (LLM) inference with web search and live crawling to automate structured web research. You define what you need in plain language or a JSON schema, and the API handles research, synthesis, and structured output with citations and calibrated confidence. Processor tiers from lite through ultra8x match compute to task complexity, so you tune cost, latency, and depth per task. Delivery is asynchronous, and you can request [auto-structured output](https://parallel.ai/blog/task-api-auto-mode) when you'd rather let the system choose the schema. We back the whole pipeline with our own proprietary web-scale index rather than a third-party search provider.

On DeepSearchQA, our tiers posted the highest accuracy in the dataset: Ultra reached 70% at 300 CPM, Ultra2x 77% at 600 CPM, Ultra4x 81% at 1,200 CPM, and Ultra8x 82% at 2,400 CPM. Every Parallel tier outperformed the general-purpose harnesses on accuracy, and Ultra did so at 300 CPM, a lower cost than any competitor in the dataset. For teams integrating over the Model Context Protocol, [the Task MCP Server](https://parallel.ai/blog/parallel-task-mcp-server) exposes the same processors as a tool.

**Best for:** production deep research and enrichment workflows that need verifiable, structured output at scale, including [legal research at scale](https://parallel.ai/blog/case-study-harvey), [financial research workflows](https://parallel.ai/blog/case-study-kepler), due diligence, and compliance checks.

**Tradeoffs:** we're a newer platform with a smaller ecosystem and community than the incumbent model providers. The Task API is asynchronous by design, with runs from 10 seconds to two hours, so it targets research depth rather than sub-second interactive latency.

### 2. GPT-5.4 with code execution

![](https://cdn.sanity.io/images/5hzduz3y/production/c09b98ad3f7cbec56c6d2fdb42f4e16dae7b0096-3576x1938.png)

GPT-5.4 with code execution runs as a general-purpose model agent inside OpenAI's [agent harness](https://parallel.ai/articles/what-is-an-agent-harness), performing multi-step reasoning, web browsing, and code execution to research and synthesize an answer. Pricing flows through the provider's token and tool-call metering, which the benchmark expresses as a per-1,000-request CPM.

On DeepSearchQA, it reached 63% fully-correct accuracy at 701 CPM. It runs on a mature, widely adopted platform with a large developer ecosystem, strong tooling, and documentation, and the harness handles code execution alongside research.

**Best for:** teams already standardized on OpenAI's model stack that want general agentic research alongside code execution.

**Tradeoffs:** fully-correct accuracy trailed Parallel's Task API tiers on this dataset, at a higher cost than Parallel Ultra, and it isn't a purpose-built research product with per-field citations and confidence.

### 3. Gemini 3.1 Pro with code execution

![](https://cdn.sanity.io/images/5hzduz3y/production/ea6302114df0e9faec83c4c59ab31be20a024b15-3586x1814.png)

Gemini 3.1 Pro with code execution is Google's general-purpose model agent, running web browsing and code execution inside its own agent harness to produce an answer or report. Pricing follows the provider's token and tool-call model, expressed as CPM in the benchmark.

On DeepSearchQA, it reached 62% fully-correct accuracy at 707 CPM. A very large context window suits it to synthesizing long source sets, it draws on Google-scale infrastructure and search heritage, and it brings broad multimodal capability.

**Best for:** teams in the Google and Gemini ecosystem that need broad multimodal reasoning alongside research.

**Tradeoffs:** fully-correct accuracy on this dataset trailed Parallel's Task API tiers, at a cost comparable to or higher than Parallel Ultra. It's a general-purpose harness rather than a structured research API with calibrated confidence.

### 4. Opus 4-6 with PTC

![](https://cdn.sanity.io/images/5hzduz3y/production/0a88d2dc6c3f7f04b5fda19470340cc2954c8a7c-3596x1820.png)

Opus 4-6 with programmatic and parallel tool calling (PTC) runs Anthropic's Claude Opus inside an agent harness, issuing multiple tool calls to browse and reason across sources. PTC fans out those calls, which can reduce wall-clock latency versus strictly sequential calling. Pricing follows the provider's token and tool-call model, and PTC-heavy runs drive total tokens and cost up.

On DeepSearchQA, it reached 58% fully-correct accuracy at 36,231 CPM, by far the highest cost in the dataset. Reviewers rate Opus well for careful, instruction-following synthesis and strong reasoning on complex tasks.

**Best for:** teams that prioritize Claude's reasoning style and can absorb high per-task cost at lower volumes.

**Tradeoffs:** it carried the highest cost per 1,000 requests in the dataset by a wide margin, with the second-lowest accuracy. Cost scales sharply when PTC issues many tool calls.

### 5. Perplexity Sonar Deep Research

![](https://cdn.sanity.io/images/5hzduz3y/production/e69442037580bae87bd411e5218b9e5ecf6c9f1e-3600x1812.png)

Perplexity Sonar Deep Research is a search-native offering exposed through the Sonar API. It runs iterative web search and synthesis to produce a cited answer and was benchmarked using the Sonar Pro API. Pricing is per-request Sonar API pricing, expressed as CPM.

On DeepSearchQA, it reached 28% fully-correct accuracy at 883 CPM. Its search-native design returns fast, citation-backed answers, and it carries a familiar consumer-grade research experience into an API that's simple to adopt for straightforward lookups.

**Best for:** lighter, fast citation-backed research where the hardest multi-hop accuracy isn't the priority.

**Tradeoffs:** it posted the lowest fully-correct accuracy in the dataset on complex multi-hop research, at a cost above Parallel Ultra. It suits lighter research better than the hardest deep-research tasks.

## Why the benchmark is only a starting point

A benchmark table, including the DeepSearchQA table in this article, is a starting point. It tells you how a fixed set of offerings scored on one held-out sample in one week. It doesn't tell you how any of them will perform on your workloads, your domains, and your query patterns, which differ from a research QA sample in ways that move results.

You should know we're biased. Parallel builds the Task API, and we want you to choose it. The only test that settles the question runs your real production queries head-to-head across the offerings you're considering and measures whether each one completes your end task correctly.

That's also how teams move to Parallel. They run their own queries against Parallel and their incumbent, compare end-task success and cost, and switch when the numbers hold up on their own data. The benchmark points you toward candidates worth testing. Your own evaluation decides which one earns production traffic. If your workload spans [legal research at scale](https://parallel.ai/blog/case-study-harvey) or something narrower, the test is the same.

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

## Closing invitation

Run the evaluation on your own queries. You can start on Parallel's free tier with no credit card required, send your hardest research questions through the Task API, and compare the results against whatever you run today. [Start Building](https://docs.parallel.ai/home).

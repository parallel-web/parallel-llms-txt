[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Search](/products/search) [Search](https://parallel.ai/products/search) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Parallel Search: the highest accuracy web search API engineered for AI

Web search, built from the ground up for AI

Tags: [Benchmarks](/blog?tag=benchmarks)

Reading time: 7 min

A second user has arrived on the web: AI. And it needs fundamentally different infrastructure than humans do.

The Parallel Search API, built on our proprietary web index, is now generally available. It's the only web search tool designed from the ground up for AI agents: engineered to deliver the most relevant, token-efficient web data at the lowest cost. The result is more accurate answers, fewer round-trips, and lower costs for every agent.

## \## Human search and AI search solve different problems

Traditional search engines were built for humans. They rank URLs, assuming someone will click through and navigate to a page. The search engine's job ends at the link. The system optimizes for keywords searches, click-through rates, and page layouts designed for browsing - done in milliseconds and as cheaply as possible.

The first wave of web search APIs used in AI-based search made this human search paradigm programmatically accessible, but failed to solve the underlying problem of how you design search for an AI agent’s needs.

AI search has to solve a different problem: **\*\* what tokens should go in an agent's context window to help it complete the task? We’re not ranking URLs for humans to click— we’re optimizing context and tokens for models to reason over. \*\***

This requires a fundamentally different search architecture:

* \- **\*\* Semantic objectives \*\*** that capture intent beyond keyword matching, so agents can specify what they need to accomplish rather than guessing at search terms
* \- **\*\* Token-relevance ranking \*\*** to prioritize webpages most directly relevant to the objective, not pages optimized for human engagement metrics
* \- **\*\* Information-dense excerpts \*\*** compressed and prioritized for reasoning quality, so LLMs have the highest-signal tokens in their context window
* \- **\*\* Single-call resolution \*\*** for complex queries that normally require multiple search hops

With this search architecture built from the ground up for AIs, agents get access to the most information-dense web tokens in their context. The result is fewer search calls, higher accuracy, lower cost, and lower end-to-end latency.

## \## On every benchmark that matters for real-world agent use cases, Parallel wins on accuracy

While most existing search systems are optimized for straightforward question answering, we believe the demand for more complex, multifaceted search will only continue to grow. Users and agents alike will increasingly seek answers that require synthesizing information across multiple sources, reasoning over complex objectives, and navigating harder-to-access content on the web.

To reflect this shift, we evaluated the performance of Parallel’s Search API across a range of benchmarks, from the most challenging multi-hop tasks (e.g., BrowseComp) to simple single-hop queries (e.g., SimpleQA).

### \### For complex searches, Parallel is the highest accuracy at the lowest cost

Parallel’s performance advantage is dramatic on challenging queries — those that span multiple topics, require deep comprehension of hard to crawl web content, or demand synthesis across scattered sources with multiple reasoning steps. On benchmarks specifically designed to test multi-hop reasoning (HLE, BrowseComp, WebWalker, FRAMES, Batched SimpleQA), Parallel not only achieves higher accuracy but also resolves queries through more efficient reasoning paths.

Traditional search APIs get less done in each pass. Agents perform too many sequential searches - compounding latency, inflating context windows, and increasing token costs with every iteration, and decreasing accuracy. Parallel, by contrast, can resolve more complex queries in a single call, resulting in the agent making fewer sequential calls and achieving higher accuracy, lower total cost, and lower end to end latency.

HLE BrowseComp WebWalker FRAMES Batched SimpleQA

[COST (CPM) ACCURACY (%) Loading chart...](https://parallel.ai/blog/introducing-parallel-search)

Parallel

Others

BrowseComp benchmark proving Parallel's enterprise deep research API delivers 48% accuracy vs GPT-4's 1% browsing capability. Performance comparison across Cost (CPM) and Accuracy (%) shows Parallel provides the best structured deep research API for ChatGPT, Claude, and AI agents. Enterprise AI agent deep research with structured data extraction delivering higher accuracy than OpenAI, Anthropic, Exa, and Perplexity.

### \### About this benchmark

This [benchmark](https://lastexam.ai/) [benchmark]($https://lastexam.ai/) consists of 2,500 questions developed by subject-matter experts across dozens of subjects (e.g. math, humanities, natural sciences). Each question has a known solution that is unambiguous and easily verifiable, but requires sophisticated web retrieval and reasoning. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### HLE Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 82          | 47           |
| Others    | exa          | 138         | 24           |
| Others    | tavily       | 190         | 21           |
| Others    | perplexity   | 126         | 30           |
| Others    | openai gpt-5 | 143         | 45           |
```

### \### About this benchmark

This [benchmark](https://lastexam.ai/) [benchmark]($https://lastexam.ai/) consists of 2,500 questions developed by subject-matter experts across dozens of subjects (e.g. math, humanities, natural sciences). Each question has a known solution that is unambiguous and easily verifiable, but requires sophisticated web retrieval and reasoning. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### BrowseComp Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 156         | 58           |
| Others    | exa          | 233         | 29           |
| Others    | tavily       | 314         | 23           |
| Others    | perplexity   | 256         | 22           |
| Others    | openai gpt-5 | 253         | 53           |
```

### \### About the benchmark

This [benchmark](https://openai.com/index/browsecomp/) [benchmark]($https://openai.com/index/browsecomp/) , created by OpenAI, contains 1,266 questions requiring multi-hop reasoning, creative search formulation, and synthesis of contextual clues across time periods. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### WebWalker-Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 42          | 81           |
| Others    | exa          | 107         | 48           |
| Others    | tavily       | 156         | 79           |
| Others    | perplexity   | 91          | 67           |
| Others    | openai gpt-5 | 88          | 73           |
```

### \### About this benchmark

This [benchmark](https://arxiv.org/abs/2501.07572) [benchmark]($https://arxiv.org/abs/2501.07572) is designed to assess the ability of LLMs to perform web traversal. To successfully answer the questions in the benchmark, it requires the ability to crawl and extract content from website subpages. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### FRAMES-Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 42          | 92           |
| Others    | exa          | 81          | 81           |
| Others    | tavily       | 122         | 87           |
| Others    | perplexity   | 95          | 83           |
| Others    | openai gpt-5 | 68          | 90           |
```

### \### About this benchmark

This [benchmark](https://huggingface.co/datasets/google/frames-benchmark) [benchmark]($https://huggingface.co/datasets/google/frames-benchmark) contains 824 challenging multi-hop questions designed to test factuality, retrieval accuracy, and reasoning. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### Batched SimpleQA - Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 50          | 90           |
| Others    | exa          | 119         | 71           |
| Others    | tavily       | 227         | 59           |
| Others    | perplexity   | 100         | 74           |
| Others    | openai gpt-5 | 91          | 88           |
```

### \### About this benchmark

This benchmark was created by batching 3 independent questions from the original [SimpleQA dataset](https://openai.com/index/introducing-simpleqa/) [SimpleQA dataset]($https://openai.com/index/introducing-simpleqa/) to create 100 composite, more complex, questions.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

Across these multi-hop benchmarks, agents using Parallel achieve state-of-the-art accuracy at ~50% of the cost, compared to workflows built on traditional search APIs.

### \### On simple searches, Parallel is the lowest cost with parity in accuracy

We also tested Parallel on single-hop benchmarks like SimpleQA that contain straightforward factual queries that benefit from web search. These benchmarks are saturated with limited room for further accuracy improvements.

SimpleQA

[COST (CPM) ACCURACY (%) Loading chart...](https://parallel.ai/blog/introducing-parallel-search)

Parallel

Others

BrowseComp benchmark proving Parallel's enterprise deep research API delivers 48% accuracy vs GPT-4's 1% browsing capability. Performance comparison across Cost (CPM) and Accuracy (%) shows Parallel provides the best structured deep research API for ChatGPT, Claude, and AI agents. Enterprise AI agent deep research with structured data extraction delivering higher accuracy than OpenAI, Anthropic, Exa, and Perplexity.

### \### About this benchmark

This [benchmark](https://openai.com/index/introducing-simpleqa/) [benchmark]($https://openai.com/index/introducing-simpleqa/) , created by OpenAI, contains 4,326 questions focused on short, fact-seeking queries across a variety of domains. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

## \### SimpleQA Search

```
| Series    | Model        | Cost  (CPM) | Accuracy (%) |
| --------- | ------------ | ----------- | ------------ |
| Parallel  | parallel     | 17          | 98           |
| Others    | exa          | 57          | 87           |
| Others    | tavily       | 110         | 93           |
| Others    | perplexity   | 52          | 92           |
| Others    | openai gpt-5 | 37          | 98           |
```

### \### About this benchmark

This [benchmark](https://openai.com/index/introducing-simpleqa/) [benchmark]($https://openai.com/index/introducing-simpleqa/) , created by OpenAI, contains 4,326 questions focused on short, fact-seeking queries across a variety of domains. Results are reported on a sample of 100 questions from this benchmark.

### \### Methodology

* \- **\*\* Evaluation \*\*** : Results are based on tests run using official Search MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).
* \- **\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.
* \- **\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

On SimpleQA, the Parallel Search API matches the accuracy of the leading alternative while delivering the lowest end-to-end cost per-query cost.

## \## These results are possible because we've built a proprietary web index and a vertically-integrated search stack from the ground up, designed for AIs

We are able to achieve state-of-the-art results because we have spent the last two years building the infrastructure to innovate across the full search stack, enabling optimization at every layer and feedback loops that continuously improve performance.

**\*\* Crawl: \*\*** Infrastructure that prioritizes the hard-to-crawl content on the web that isn’t included in pretraining data for models: multi-modal, lengthy PDFs, JavaScript-heavy sites. And optimizes recrawls to keep fast-changing data fresh while minimizing burden on website owners.

**\*\* Index: \*\*** One of the fastest-growing, freshest, deepest, and largest web indexes with 1B+ pages added or refreshed daily.

**\*\* Ranking: \*\*** We retrieve and rank with a different optimization objective than traditional search. Instead of ranking URLs for humans to click on, we identify the most relevant and authoritative tokens suitable for LLM reasoning. Our proprietary models and algorithms score based on token relevance, page and domain authority, context window efficiency, and cross-source validation, rather than click-through probability or engagement.

## \## Leading AI teams build on our Search API - and so do we

Today, the most sophisticated builders choose to create and deploy AI, with search powered by Parallel. These companies have tested alternatives and understand that the decisions their agents make, whether it’s Sourcegraph Amp’s coding agent solving bugs, _\_ Claygent \__ powering every GTM decision, Starbridge discovering government RFPs, or a Fortune 100 insurer underwriting claims better than human underwriters, all depend on the quality of their web data.

We use our own Search API as foundational infrastructure to power our Web Agents. For example, the Parallel Task API, our higher-level research API that serves complex, multi-step enrichment and deep research queries, is built using the Search API. Every Task API query that runs in production depends on the Search API performing flawlessly underneath.

This architectural decision forces us to hold ourselves to the highest standard. Every performance improvement, latency optimization, and quality enhancement in the Search API directly impacts our own production systems serving millions of queries daily. We feel every token of inefficiency and every accuracy gap immediately in our own products.

The result is infrastructure that's been battle-tested and continuously refined under the demands of real-world agent workloads.

## \## Give your agents access to Parallel Search

Maximizing signal and minimizing noise in an agent’s context window is the single most important factor in the ability of the agent to complete a task effectively. Give your agents the most accurate and compressed context from the web with the Parallel Search API.

[\### Sample Search Request ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 curl https://api.parallel.ai/v1beta/search \ -H "Content-Type: application/json" \ -H "x-api-key: $PARALLEL_API_KEY " \ -H "parallel-beta: search-extract-2025-10-10" \ -d '{ "objective": "When was the United Nations established? Prefer UN' \' 's websites.", "search_queries": [ "Founding year UN", "Year of founding United Nations" ], "max_results": 10, "excerpts": { "max_chars_per_result": 10000 } }' ``` curl https://api.parallel.ai/v1beta/search \ -H "Content-Type: application/json" \ -H "x-api-key: $PARALLEL_API_KEY" \ -H "parallel-beta: search-extract-2025-10-10" \ -d '{ "objective": "When was the United Nations established? Prefer UN'\''s websites.", "search_queries": [ "Founding year UN", "Year of founding United Nations" ], "max_results": 10, "excerpts": { "max_chars_per_result": 10000 } }' ``` ```]( )

Give your agents access to better search. Get started in our [Developer Platform](https://platform.parallel.ai/play/search) [Developer Platform]($https://platform.parallel.ai/play/search) or dive into the [documentation](https://docs.parallel.ai/search/search-quickstart) [documentation]($https://docs.parallel.ai/search/search-quickstart) .

## \## Notes on Methodology

**\*\* Benchmark Details \*\*** : Various search providers were evaluated against a wide set of benchmarks ranging from simple benchmarks (SimpleQA) to more complex benchmarks (HLE, BrowseComp, Batched SimpleQA, WebWalker, and Frames).

**\*\* Evaluation \*\*** : Results are based on tests run using official MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1).

**\*\* Cost Calculation \*\*** : Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.

**\*\* Testing Dates \*\*** : Testing was conducted from November 3rd to November 5th.

By Parallel

November 6, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Products

* [Search API](/products/search) [Search API](https://parallel.ai/products/search)
* [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Extract API](https://docs.parallel.ai/extract/extract-quickstart)
* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [Task API](https://docs.parallel.ai/task-api/task-quickstart)
* [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart)
* [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)
* [Monitor API](https://platform.parallel.ai/play/monitor) [Monitor API](https://platform.parallel.ai/play/monitor)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms of Service](/terms-of-service) [Terms of Service](https://parallel.ai/terms-of-service)
* [Customer Terms](/customer-terms) [Customer Terms](https://parallel.ai/customer-terms)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Acceptable Use](/acceptable-use-policy) [Acceptable Use](https://parallel.ai/acceptable-use-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2025

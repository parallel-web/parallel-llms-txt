[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Search](/products/search) [Search](https://parallel.ai/products/search) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Parallel Task API achieves state-of-the-art accuracy on DeepSearchQA

The Parallel Task API achieves industry-leading accuracy of 72.6% on the new DeepSearchQA benchmark from Google, surpassing their own Gemini Deep Research and OpenAI o1 Pro at up to 6x lower cost.

Tags: [Benchmarks](/blog?tag=benchmarks)

Reading time: 3 min

## \## About DeepSearchQA

Last week, Google released [DeepSearchQA](https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA_benchmark_paper.pdf) [DeepSearchQA]($https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA\_benchmark\_paper.pdf) , a new evaluation set for benchmarking 900 difficult multi-step deep research tasks across 17 fields of expertise. The release coincides with the launch of Google’s [Gemini Deep Research API](https://blog.google/technology/developers/deep-research-agent-gemini-api/) [Gemini Deep Research API]($https://blog.google/technology/developers/deep-research-agent-gemini-api/) , which, until the release of this post, led the market with a score of [66\.1%](https://www.kaggle.com/benchmarks/google/dsqa/leaderboard) [66.1%]($https://www.kaggle.com/benchmarks/google/dsqa/leaderboard) .

[]( )

![Parallel Task Ultra2x, Gemini Deep Research API, ChatGPT 5.2 Pro, Exa Research Pro, Perplexity Sonar Deep Research ](https://cdn.sanity.io/images/5hzduz3y/production/e4d91fc96d52ba10eeb5091a605f7747bb4931e3-5396x3240.jpg)

Research tasks are structured as part of a “causal-chain”, where answers to each step are dependent on successful resolution of the previous step. The benchmark is designed to address three key areas that have previously been under-evaluated:

1. Systematic collation of fragmented information from disparate sources
2. De-duplication and entity resolution to ensure precision
3. The ability to reason about stopping criteria within an open-ended search space

## \## Parallel scores state-of-the-art at one sixth the price of the next best alternative

DeepSearchQA

[COST (CPM) ACCURACY (%) Loading chart...]( )

CPM: USD per 1000 requests. Cost is shown on a Log scale.

Parallel

Others

BrowseComp benchmark analysis: CPM: USD per 1000 requests. Cost is shown on a Log scale. . Evaluation shows Parallel's enterprise deep research API for AI agents achieving up to 48% accuracy, outperforming GPT-4 browsing (1%), Claude search (6%), Exa (14%), and Perplexity (8%). Enterprise-grade structured deep research performance across Cost (CPM) and Accuracy (%). State-of-the-art enterprise deep research API with structured data extraction built for ChatGPT deep research and complex multi-hop AI agent workflows.

### \### Benchmark

This benchmark, created by researchers at Google, consists of 900 prompts for evaluating agents on difficult multi-step information-seeking tasks across 17 different fields.

### \### Methodology

Accuracy refers to answers that are “Fully Correct”: A response is fully correct if and only if the submitted set is semantically identical to the ground-truth set. The agent must identify all correct answers while including zero incorrect answers.

For Exa, Perplexity, GPT 5.2-pro, and Gemini Deep Research API, we evaluate them on their highest thinking and search context settings.

### \### Testing dates

December 15-18, 2025

## \### DeepSearchQA Task API

```
| Series   | Model                    | Cost (CPM) | Accuracy (%) |
| -------- | ------------------------ | ---------- | ------------ |
| Parallel | Pro                      | 100        | 62           |
| Parallel | Ultra                    | 300        | 68.5         |
| Parallel | Ultra2x                  | 600        | 72.6         |
| Others   | Gemini Deep Research     | 2500       | 64.3         |
| Others   | OpenAI GPT 5.2 Pro       | 1830       | 61           |
| Others   | Exa                      | 740        | 30           |
| Others   | Perplexity Deep Research | 1540       | 25           |
```

CPM: USD per 1000 requests. Cost is shown on a Log scale.

### \### Benchmark

This benchmark, created by researchers at Google, consists of 900 prompts for evaluating agents on difficult multi-step information-seeking tasks across 17 different fields.

### \### Methodology

Accuracy refers to answers that are “Fully Correct”: A response is fully correct if and only if the submitted set is semantically identical to the ground-truth set. The agent must identify all correct answers while including zero incorrect answers.

For Exa, Perplexity, GPT 5.2-pro, and Gemini Deep Research API, we evaluate them on their highest thinking and search context settings.

### \### Testing dates

December 15-18, 2025

In addition to setting the new standard for deep research ability, Ultra2x is up to six times cheaper than the second best, Gemini Deep Research API. Compared with deep research offerings outside OpenAI and Google, Parallel delivers both significantly higher accuracy and cost savings:

* \- Parallel Ultra2x is 91% more accurate and 21% cheaper than Exa Research Pro
* \- Parallel Ultra2x is 91% more accurate and 88% cheaper than Perplexity Sonar Deep Research

## \## How Parallel achieves state-of-the-art web research

**\*\* A web index with billions of pages \*\***

Our proprietary web index is growing rapidly, on pace to be among the largest in the world. The breadth and depth of our index mean that we can access information from pages not typically seen by traditional search engines.

**\*\* Token-efficient search made for LLMs \*\***

[Parallel Search](https://parallel.ai/products/search) [Parallel Search]($https://parallel.ai/products/search) , a key ingredient in the Task API, is purpose-built around the needs of LLMs. Our search ranks pages by content relevance, with an emphasis on token efficiency.

**\*\* Live crawling and extraction for fresh data \*\***

Our innovations in crawling and extraction enable us to access hard-to-reach pages and content like JavaScript heavy pages and PDFs.

## \## About the Parallel Task API

The Parallel Task API is a powerful, general-purpose web agent API that transforms manual workflows into programmable and repeatable operations at scale. It combines best-in-class web search with fine-tuned AI models to deliver outputs ranging from short text summaries to comprehensive reports and structured data. [Learn more about the Task API](https://docs.parallel.ai/task-api/task-quickstart) [Learn more about the Task API]($https://docs.parallel.ai/task-api/task-quickstart) .

## \## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel’s web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations. [Learn more about Parallel](https://parallel.ai/about) [Learn more about Parallel]($https://parallel.ai/about) .

By Parallel

December 17, 2025

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

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0) [GitHub](https://github.com/parallel-web) [GitHub] (https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2026

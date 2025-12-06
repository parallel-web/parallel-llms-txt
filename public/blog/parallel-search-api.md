[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing the Parallel Search API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Building AI agents and applications that access the web shouldn't require complex orchestration of searching, scraping, parsing, re-ranking, and filtering. The Parallel Search API handles this complexity for you, collapsing multi-step pipelines into a single fast API call.

## \## Why AIs Need a New Kind of Search

LLMs ingest tokens, not web pages. Mainstream search engines are engineered for human use—short, keyword queries, clickable titles, and ad yield—so they surface teaser snippets instead of the high‑density passages an agent needs to reason. Developers are forced to add scraping and summarization layers that increase latency, inflate token costs, and introduce brittle failure points that can corrupt reliability and downstream quality. An AI‑native retrieval layer must deliver the most information‑rich spans of text, with explicit controls for freshness and length, ready to slot directly into an LLM context window. These requirements shape the Parallel Search API.

![Search API Playground on the Parallel Developer Platform](https://cdn.sanity.io/images/5hzduz3y/production/7cb91842e91b65063cd8e35c4d3212309496a77c-1664x1080.gif) Search API Playground on the Parallel Developer Platform

## \## **\*\* _\_ The \__ Web Search Tool for AI Agents \*\***

Built on Parallel’s custom web crawler and index, the Search API takes flexible inputs (search objective and/or search queries) and returns LLM-ready ranked URLs with extended webpage excerpts. With granular control over output sizes, it largely reduces the need for additional scraping, making it the go-to search tool for your AI agent.

**\*\* Two tiers to match your needs: \*\***

* \- **\*\* Base \*\*** : Fast, cost-effective web access with extended webpage excerpts (2-5s)
* \- **\*\* Pro \*\*** : Best-in-class retrieval engine, prioritizing freshness and relevance. Built for long-horizon agents where quality matters over speed (15-60s)

\### Create a Search API Request

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

curl --request  POST  \
  --url  https : //api.parallel.ai/alpha/search \ 
  --header  "Content-Type: application/json"  \
  --header  "x-api-key: $PARALLEL_API_KEY"  \
  --data  '{
    "objective": "When was the United Nations established? Prefer UN' \ '' s websites. ",
    " search_queries ": [
      " Founding  year  UN ",
      " Year of  founding  United Nations "
    ],
    " processor ": " base ",
    " max_results ": 5,
    " max_chars_per_result ": 1500
  }' ```  curl --request POST \ --url https://api.parallel.ai/alpha/search \ --header "Content-Type: application/json" \ --header "x-api-key: $PARALLEL_API_KEY" \ --data '{ "objective": "When was the United Nations established? Prefer UN'\''s websites.", "search_queries": [ "Founding year UN", "Year of founding United Nations" ], "processor": "base", "max_results": 5, "max_chars_per_result": 1500 }' ```
```

The Parallel Search API delivers high-quality, relevant results while optimizing for the price-performance balance your AI applications need at scale. By providing a single, simple abstraction, our Search API reduces token spend and eliminates the need to orchestrate multiple tools. Our [Chat](https://parallel.ai/blog/chat-api) [Chat]($https://parallel.ai/blog/chat-api) and [Task APIs](https://parallel.ai/blog/parallel-task-api) [Task APIs]($https://parallel.ai/blog/parallel-task-api) utilize this same search technology as their underlying foundation.

## \## **\*\* Start Building \*\***

Get started in our [Developer Platform](https://platform.parallel.ai/play/search) [Developer Platform]($https://platform.parallel.ai/play/search) or dive into the [documentation](https://docs.parallel.ai/search-api/search-quickstart) [documentation]($https://docs.parallel.ai/search-api/search-quickstart) .

By Parallel

June 10, 2025

### \## Related Posts 27

[### \- [ How Lindy brings state-of-the-art web research to automation flows ] (https://parallel.ai/blog/case-study-lindy) Tags: [Case Study](/blog?tag=case-study) Reading time: 3 min](/blog/case-study-lindy)

[### \- [ Introducing the Parallel Task MCP Server ] (https://parallel.ai/blog/parallel-task-mcp-server) Tags: [Product Release](/blog?tag=product-release) Reading time: 4 min](/blog/parallel-task-mcp-server)

[### \- [ Introducing the Core2x Processor for improved compute control on the Task API ] (https://parallel.ai/blog/core2x-processor) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/core2x-processor)

[### \- [ How Day AI merges private and public data for business intelligence ] (https://parallel.ai/blog/case-study-day-ai) Tags: [Case Study](/blog?tag=case-study) Reading time: 4 min](/blog/case-study-day-ai)

[### \- [ Full Basis framework for all Task API Processors ] (https://parallel.ai/blog/full-basis-framework-for-task-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/full-basis-framework-for-task-api)

[### \- [ Building a real-time streaming task manager with Parallel ] (https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel) Tags: [Cookbook](/blog?tag=cookbook) Reading time: 5 min](/blog/cookbook-sse-task-manager-with-parallel)

[### \- [ How Gumloop built a new AI automation framework with web intelligence as a core node ] (https://parallel.ai/blog/case-study-gumloop) Tags: [Case Study](/blog?tag=case-study) Reading time: 3 min](/blog/case-study-gumloop)

[### \- [ Introducing the TypeScript SDK ] (https://parallel.ai/blog/typescript-sdk) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/typescript-sdk)

[### \- [ Building a serverless competitive intelligence platform with MCP + Task API ] (https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp) Tags: [Cookbook](/blog?tag=cookbook) Reading time: 6 min](/blog/cookbook-competitor-research-with-reddit-mcp)

[### \- [ Introducing Parallel Deep Research reports ] (https://parallel.ai/blog/deep-research-reports) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/deep-research-reports)

[### \- [ A new pareto-frontier for Deep Research price-performance ] (https://parallel.ai/blog/deep-research-benchmarks) Tags: [Benchmarks](/blog?tag=benchmarks) Reading time: 4 min](/blog/deep-research-benchmarks)

[### \- [ Building a Full-Stack Search Agent with Parallel and Cerebras ] (https://parallel.ai/blog/cookbook-search-agent) Tags: [Cookbook](/blog?tag=cookbook) Reading time: 5 min](/blog/cookbook-search-agent)

[### \- [ Webhooks for the Parallel Task API ] (https://parallel.ai/blog/webhooks) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/webhooks)

[### \- [ Introducing Parallel: Web Search Infrastructure for AIs ] (https://parallel.ai/blog/introducing-parallel) Tags: [Benchmarks](/blog?tag=benchmarks) , [Product Release](/blog?tag=product-release) Reading time: 6 min](/blog/introducing-parallel)

[### \- [ Introducing SSE for Task Runs ] (https://parallel.ai/blog/sse-for-tasks) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/sse-for-tasks)

[### \- [ A new line of advanced processors: Ultra2x, Ultra4x, and Ultra8x ] (https://parallel.ai/blog/new-advanced-processors) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/new-advanced-processors)

[### \- [ Introducing Auto Mode for the Parallel Task API ] (https://parallel.ai/blog/task-api-auto-mode) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/task-api-auto-mode)

[### \- [ A state-of-the-art search API purpose-built for agents ] (https://parallel.ai/blog/search-api-benchmark) Tags: [Benchmarks](/blog?tag=benchmarks) Reading time: 3 min](/blog/search-api-benchmark)

[### \- [ Parallel Search MCP Server in Devin ] (https://parallel.ai/blog/parallel-search-mcp-in-devin) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/parallel-search-mcp-in-devin)

[### \- [ Introducing Tool Calling via MCP Servers ] (https://parallel.ai/blog/mcp-tool-calling) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/mcp-tool-calling)

[### \- [ Introducing the Parallel Search MCP Server ] (https://parallel.ai/blog/search-mcp-server) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/search-mcp-server)

[### \- [ Introducing Source Policy ] (https://parallel.ai/blog/source-policy) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/source-policy)

[### \- [ The Parallel Task Group API ] (https://parallel.ai/blog/task-group-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/task-group-api)

[### \- [ State of the Art Deep Research APIs ] (https://parallel.ai/blog/deep-research) Tags: [Benchmarks](/blog?tag=benchmarks) Reading time: 3 min](/blog/deep-research)

[### \- [ Introducing the Parallel Chat API ] (https://parallel.ai/blog/chat-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/chat-api)

[### \- [ Introducing Basis with Calibrated Confidences ] (https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) Tags: [Product Release](/blog?tag=product-release) Reading time: 4 min](/blog/introducing-basis-with-calibrated-confidences)

[### \- [ Introducing the Parallel Task API ] (https://parallel.ai/blog/parallel-task-api) Tags: [Product Release](/blog?tag=product-release) , [Benchmarks](/blog?tag=benchmarks) Reading time: 4 min](/blog/parallel-task-api)

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service) [Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

Parallel Web Systems Inc. 2025

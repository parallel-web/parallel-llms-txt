Human Machine

# \# Introducing the Parallel CLI

Today we're releasing Parallel CLI, a standalone command-line tool that gives any terminal-based agent direct access to Parallel's web intelligence stack. One install, one login, and your agent can search the web, pull clean content from any URL, run multi-source deep research, and enrich structured datasets, all from the command line.

Tags: Product Release

Reading time: 3 min

[Agent Skills](https://github.com/parallel-web/parallel-web-tools)

## \## Why a CLI?

The most capable autonomous agents today operate in the terminal, from OpenClaw and Claude Code to custom pipelines built on tool-use frameworks. They reason, write code, execute commands, and iterate. When these agents need web data, they shouldn't have to drop into an SDK or construct HTTP requests. They should run a command.

Parallel CLI is built to be intuitive to agents. Every command accepts _\_ \--json \__ for structured output that agents can parse directly. Every long-running operation supports _\_ \--no-wait \__ for async execution with separate status polling. And every command works non-interactively, so agents can compose Parallel’s products together into multi-step pipelines without human intervention.

We developed the CLI alongside [Parallel Agent Skills](https://github.com/parallel-web/parallel-agent-skills) [[Parallel Agent Skills] (https://github.com/parallel-web/parallel-agent-skills)](https://github.com/parallel-web/parallel-agent-skills) , a set of structured skill definitions that teach agents when and how to use each command. Together, the CLI and Agent Skills give your agent a complete, self-contained web intelligence toolkit for finding anything on the web.

## \## Install in one line

\### Install Parallel CLI from your terminal

```
1

curl -fsSL https://parallel.ai/install.sh | bash ```  curl -fsSL https://parallel.ai/install.sh | bash ```
```

## \## What your agent can do

**\*\* Search the web in natural language \*\***

Parallel Search lets agents declare what they need instead of constructing keyword queries. Results come back as ranked URLs with compressed, token-efficient excerpts, optimized for LLM context windows.

\### Semantic search with natural language

```
1

parallel - cli  search  "Series B AI infrastructure companies founded after 2022"  --json ```  parallel-cli search "Series B AI infrastructure companies founded after 2022" --json ```
```

Every result includes dense, query-relevant excerpts. No raw HTML. No ads. No SEO noise.

**\*\* \*\***

**\*\* Extract clean content from any URL \*\***

The Extract command converts any public URL into focused, AI-ready markdown. It handles JavaScript-rendered pages, CAPTCHAs, and PDFs automatically.

\### Pull targeted content with an objective

```
1

parallel-cli extract https://www.tryprofound.com/pricing --objective  "Find plan tiers and plan costs"  --json ```  parallel-cli extract https://www.tryprofound.com/pricing --objective "Find plan tiers and plan costs" --json ```
```

This pairs naturally with Search. An agent can find the right pages with search, then pull exactly what it needs with _\_ Extract \__ .

**\*\* \*\***

**\*\* Run deep research on complex questions \*\***

For questions that require synthesizing multiple sources, the Research command handles the entire workflow: searching, reading, cross-referencing, and producing cited reports.

\### Async workflow for long-running research

```
1

parallel-cli research run  "Comprehensive analysis of US-Canada Uranium supply chains"  --no-wait --json ```  parallel-cli research run "Comprehensive analysis of US-Canada Uranium supply chains" --no-wait --json ```
```

Research outputs include citations, reasoning traces, and calibrated confidence scores through Parallel's Basis framework. Processor tiers range from _\_ lite \__ (quick lookups, seconds) to _\_ ultra \__ (deep multi-source synthesis, up to 25 minutes).

**\*\* Enrich structured data at scale \*\***

The Enrich command takes a CSV or JSON file and adds web-sourced fields to every row. Describe what you need in plain language, and Parallel handles the research for each record.

\### Enrich inline data without a file

```
1

2

3

4

parallel-cli enrich run \
    --data  '[{"company": "Anthropic"}, {"company": "Mistral"}, {"company": "Cohere"}]'  \
    --target output.csv \
    --intent  "Find headquarters location and employee count" ```  parallel-cli enrich run \ --data '[{"company": "Anthropic"}, {"company": "Mistral"}, {"company": "Cohere"}]' \ --target output.csv \ --intent "Find headquarters location and employee count" ```
```

Enrichment scales from two-field lookups on the lite processor to 20+ field deep research on ultra. Pricing is per row, not per field, so adding more output columns doesn't change the cost.

## \## Get started

Install the CLI, grab an API key from [platform.parallel.ai](https://platform.parallel.ai) [[platform.parallel.ai] (https://platform.parallel.ai)](https://platform.parallel.ai) , and run your first search:

\### Install and run your first query

```
1

2

3

curl -fsSL https://parallel.ai/install.sh | bash
 export  PARALLEL_API_KEY= "your_api_key" 
parallel-cli search  "your first query"  --json ```  curl -fsSL https://parallel.ai/install.sh | bash export PARALLEL_API_KEY="your_api_key" parallel-cli search "your first query" --json ```
```

For structured agent integration, check out [Agent Skills](https://github.com/parallel-web/parallel-agent-skills) [[Agent Skills] (https://github.com/parallel-web/parallel-agent-skills)](https://github.com/parallel-web/parallel-agent-skills) for pre-built skill definitions that teach agents how to use each command effectively.

Full documentation is at [docs.parallel.ai](https://docs.parallel.ai/integrations/cli) [[docs.parallel.ai] (https://docs.parallel.ai/integrations/cli)](https://docs.parallel.ai/integrations/cli) . The CLI source is open on [GitHub](https://github.com/parallel-web/parallel-web-tools) [[GitHub] (https://github.com/parallel-web/parallel-web-tools)](https://github.com/parallel-web/parallel-web-tools) .

By Parallel

March 10, 2026

### \## Related Posts 55

[### \- [ How Modal saves tens of thousands annually by building in-house GTM pipelines with Parallel ] (https://parallel.ai/blog/case-study-modal) Tags: Case Study Reading time: 4 min](/blog/case-study-modal)

[### \- [ How Opendoor uses Parallel as the enterprise grade web research layer powering its AI-native real estate operations ] (https://parallel.ai/blog/case-study-opendoor) Tags: Case Study Reading time: 6 min](/blog/case-study-opendoor)

[### \- [ Introducing stateful web research agents with multi-turn conversations ] (https://parallel.ai/blog/task-api-interactions) Tags: Product Release Reading time: 3 min](/blog/task-api-interactions)

[### \- [ Parallel is live on Tempo, now available natively to agents with the Machine Payments Protocol ] (https://parallel.ai/blog/tempo-stripe-mpp) Tags: Partnership Reading time: 4 min](/blog/tempo-stripe-mpp)

[### \- [ How Parallel helped Kepler build AI that finance professionals can actually trust ] (https://parallel.ai/blog/case-study-kepler) Tags: Case Study Reading time: 5 min](/blog/case-study-kepler)

[### \- [ How Profound helps brands win AI Search with high-quality web research and content creation powered by Parallel ] (https://parallel.ai/blog/case-study-profound) Tags: Case Study Reading time: 4 min](/blog/case-study-profound)

[### \- [ How Harvey is expanding legal AI internationally with Parallel ] (https://parallel.ai/blog/case-study-harvey) Tags: Case Study Reading time: 3 min](/blog/case-study-harvey)

[### \- [ How Tabstack by Mozilla enables agents to navigate the web with Parallel’s best-in-class web search ] (https://parallel.ai/blog/case-study-tabstack) Tags: Case Study Reading time: 5 min](/blog/case-study-tabstack)

[### \- [ Parallel Web Tools and Agents now available across Vercel AI Gateway, AI SDK, and Marketplace ] (https://parallel.ai/blog/vercel) Tags: Product Release Reading time: 3 min](/blog/vercel)

[### \- [ Authenticated page access for the Parallel Task API ] (https://parallel.ai/blog/authenticated-page-access) Tags: Product Release Reading time: 3 min](/blog/authenticated-page-access)

[### \- [ Introducing structured outputs for the Monitor API ] (https://parallel.ai/blog/structured-outputs-monitor) Tags: Product Release Reading time: 3 min](/blog/structured-outputs-monitor)

[### \- [ Introducing research models with Basis for the Parallel Chat API ] (https://parallel.ai/blog/research-models-chat) Tags: Product Release Reading time: 2 min](/blog/research-models-chat)

[### \- [ Build a real-time fact checker with Parallel and Cerebras ] (https://parallel.ai/blog/cerebras-fact-checker) Tags: Cookbook Reading time: 5 min](/blog/cerebras-fact-checker)

[### \- [ Parallel Task API achieves state-of-the-art accuracy on DeepSearchQA ] (https://parallel.ai/blog/deepsearch-qa) Tags: Benchmarks Reading time: 3 min](/blog/deepsearch-qa)

[### \- [ Introducing Granular Basis for the Task API ] (https://parallel.ai/blog/granular-basis-task-api) Tags: Product Release Reading time: 3 min](/blog/granular-basis-task-api)

[### \- [ How Amp’s coding agents build better software with Parallel Search ] (https://parallel.ai/blog/case-study-amp) Tags: Case Study Reading time: 3 min](/blog/case-study-amp)

[### \- [ Latency improvements on the Parallel Task API ] (https://parallel.ai/blog/task-api-latency) Tags: Product Release Reading time: 3 min](/blog/task-api-latency)

[### \- [ Introducing Parallel Extract ] (https://parallel.ai/blog/introducing-parallel-extract) Tags: Product Release Reading time: 2 min](/blog/introducing-parallel-extract)

[### \- [ Introducing Parallel FindAll ] (https://parallel.ai/blog/introducing-findall-api) Tags: Product Release , Benchmarks Reading time: 4 min](/blog/introducing-findall-api)

[### \- [ Introducing Parallel Monitor ] (https://parallel.ai/blog/monitor-api) Tags: Product Release Reading time: 3 min](/blog/monitor-api)

[### \- [ Parallel raises $100M Series A to build web infrastructure for agents ] (https://parallel.ai/blog/series-a) Tags: Fundraise Reading time: 3 min](/blog/series-a)

[### \- [ How Macroscope reduced code review false positives with Parallel ] (https://parallel.ai/blog/case-study-macroscope) Reading time: 2 min](/blog/case-study-macroscope)

[### \- [ Introducing Parallel Search ] (https://parallel.ai/blog/introducing-parallel-search) Tags: Benchmarks Reading time: 7 min](/blog/introducing-parallel-search)

[### \- [ Parallel processors set new price-performance standard on SealQA benchmark ] (https://parallel.ai/blog/benchmarks-task-api-sealqa) Tags: Benchmarks Reading time: 3 min](/blog/benchmarks-task-api-sealqa)

[### \- [ Introducing LLMTEXT, an open source toolkit for the llms.txt standard ] (https://parallel.ai/blog/LLMTEXT-for-llmstxt) Tags: Product Release Reading time: 7 min](/blog/LLMTEXT-for-llmstxt)

[### \- [ How Starbridge powers public sector GTM with state-of-the-art web research ] (https://parallel.ai/blog/case-study-starbridge) Tags: Case Study Reading time: 4 min](/blog/case-study-starbridge)

[### \- [ Building a market research platform with Parallel Deep Research ] (https://parallel.ai/blog/cookbook-market-research-platform-with-parallel) Tags: Cookbook Reading time: 4 min](/blog/cookbook-market-research-platform-with-parallel)

[### \- [ How Lindy brings state-of-the-art web research to automation flows ] (https://parallel.ai/blog/case-study-lindy) Tags: Case Study Reading time: 3 min](/blog/case-study-lindy)

[### \- [ Introducing the Parallel Task MCP Server ] (https://parallel.ai/blog/parallel-task-mcp-server) Tags: Product Release Reading time: 4 min](/blog/parallel-task-mcp-server)

[### \- [ Introducing the Core2x Processor for improved compute control on the Task API ] (https://parallel.ai/blog/core2x-processor) Tags: Product Release Reading time: 2 min](/blog/core2x-processor)

[### \- [ How Day AI merges private and public data for business intelligence ] (https://parallel.ai/blog/case-study-day-ai) Tags: Case Study Reading time: 4 min](/blog/case-study-day-ai)

[### \- [ Full Basis framework for all Task API Processors ] (https://parallel.ai/blog/full-basis-framework-for-task-api) Tags: Product Release Reading time: 2 min](/blog/full-basis-framework-for-task-api)

[### \- [ Building a real-time streaming task manager with Parallel ] (https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel) Tags: Cookbook Reading time: 5 min](/blog/cookbook-sse-task-manager-with-parallel)

[### \- [ How Gumloop built a new AI automation framework with web intelligence as a core node ] (https://parallel.ai/blog/case-study-gumloop) Tags: Case Study Reading time: 3 min](/blog/case-study-gumloop)

[### \- [ Introducing the TypeScript SDK ] (https://parallel.ai/blog/typescript-sdk) Tags: Product Release Reading time: 1 min](/blog/typescript-sdk)

[### \- [ Building a serverless competitive intelligence platform with MCP + Task API ] (https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp) Tags: Cookbook Reading time: 6 min](/blog/cookbook-competitor-research-with-reddit-mcp)

[### \- [ Introducing Parallel Deep Research reports ] (https://parallel.ai/blog/deep-research-reports) Tags: Product Release Reading time: 2 min](/blog/deep-research-reports)

[### \- [ A new pareto-frontier for Deep Research price-performance ] (https://parallel.ai/blog/deep-research-benchmarks) Tags: Benchmarks Reading time: 4 min](/blog/deep-research-benchmarks)

[### \- [ Building a Full-Stack Search Agent with Parallel and Cerebras ] (https://parallel.ai/blog/cookbook-search-agent) Tags: Cookbook Reading time: 5 min](/blog/cookbook-search-agent)

[### \- [ Webhooks for the Parallel Task API ] (https://parallel.ai/blog/webhooks) Tags: Product Release Reading time: 2 min](/blog/webhooks)

[### \- [ Introducing Parallel: Web Search Infrastructure for AIs ] (https://parallel.ai/blog/introducing-parallel) Tags: Benchmarks , Product Release Reading time: 6 min](/blog/introducing-parallel)

[### \- [ Introducing SSE for Task Runs ] (https://parallel.ai/blog/sse-for-tasks) Tags: Product Release Reading time: 2 min](/blog/sse-for-tasks)

[### \- [ A new line of advanced Processors: Ultra2x, Ultra4x, and Ultra8x ] (https://parallel.ai/blog/new-advanced-processors) Tags: Product Release Reading time: 2 min](/blog/new-advanced-processors)

[### \- [ Introducing Auto Mode for the Parallel Task API ] (https://parallel.ai/blog/task-api-auto-mode) Tags: Product Release Reading time: 1 min](/blog/task-api-auto-mode)

[### \- [ A state-of-the-art search API purpose-built for agents ] (https://parallel.ai/blog/search-api-benchmark) Tags: Benchmarks Reading time: 3 min](/blog/search-api-benchmark)

[### \- [ Parallel Search MCP Server in Devin ] (https://parallel.ai/blog/parallel-search-mcp-in-devin) Tags: Product Release Reading time: 2 min](/blog/parallel-search-mcp-in-devin)

[### \- [ Introducing Tool Calling via MCP Servers ] (https://parallel.ai/blog/mcp-tool-calling) Tags: Product Release Reading time: 2 min](/blog/mcp-tool-calling)

[### \- [ Introducing the Parallel Search MCP Server ] (https://parallel.ai/blog/search-mcp-server) Tags: Product Release Reading time: 2 min](/blog/search-mcp-server)

[### \- [ Introducing Source Policy ] (https://parallel.ai/blog/source-policy) Tags: Product Release Reading time: 1 min](/blog/source-policy)

[### \- [ The Parallel Task Group API ] (https://parallel.ai/blog/task-group-api) Tags: Product Release Reading time: 1 min](/blog/task-group-api)

[### \- [ State of the Art Deep Research APIs ] (https://parallel.ai/blog/deep-research) Tags: Benchmarks Reading time: 3 min](/blog/deep-research)

[### \- [ Parallel Search API is now available in alpha ] (https://parallel.ai/blog/parallel-search-api) Tags: Product Release Reading time: 2 min](/blog/parallel-search-api)

[### \- [ Introducing the Parallel Chat API ] (https://parallel.ai/blog/chat-api) Tags: Product Release Reading time: 1 min](/blog/chat-api)

[### \- [ Introducing Basis with Calibrated Confidences ] (https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) Tags: Product Release Reading time: 4 min](/blog/introducing-basis-with-calibrated-confidences)

[### \- [ Introducing the Parallel Task API ] (https://parallel.ai/blog/parallel-task-api) Tags: Product Release , Benchmarks Reading time: 4 min](/blog/parallel-task-api)

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* hello@parallel.ai [[hello@parallel.ai] (mailto:hello@parallel.ai)](mailto:hello@parallel.ai)

### Products

* [Search API](https://docs.parallel.ai/search/search-quickstart) [[Search API] (https://docs.parallel.ai/search/search-quickstart)](https://docs.parallel.ai/search/search-quickstart)
* [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [[Extract API] (https://docs.parallel.ai/extract/extract-quickstart)](https://docs.parallel.ai/extract/extract-quickstart)
* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [[Task API] (https://docs.parallel.ai/task-api/task-quickstart)](https://docs.parallel.ai/task-api/task-quickstart)
* [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [[FindAll API] (https://docs.parallel.ai/findall-api/findall-quickstart)](https://docs.parallel.ai/findall-api/findall-quickstart)
* [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [[Chat API] (https://docs.parallel.ai/chat-api/chat-quickstart)](https://docs.parallel.ai/chat-api/chat-quickstart)
* [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) [[Monitor API] (https://docs.parallel.ai/monitor-api/monitor-quickstart)](https://docs.parallel.ai/monitor-api/monitor-quickstart)

### Resources

* About [[About] (https://parallel.ai/about)](/ai/about)
* Pricing [[Pricing] (https://parallel.ai/pricing)](/ai/pricing)
* [Docs](https://docs.parallel.ai) [[Docs] (https://docs.parallel.ai)](https://docs.parallel.ai)
* Blog [[Blog] (https://parallel.ai/blog)](/ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [[Changelog] (https://docs.parallel.ai/resources/changelog)](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [[Careers] (https://jobs.ashbyhq.com/parallel)](https://jobs.ashbyhq.com/parallel)

### Info

* Terms of Service [[Terms of Service] (https://parallel.ai/terms-of-service)](/ai/terms-of-service)
* Customer Terms [[Customer Terms] (https://parallel.ai/customer-terms)](/ai/customer-terms)
* Privacy [[Privacy] (https://parallel.ai/privacy-policy)](/ai/privacy-policy)
* Acceptable Use [[Acceptable Use] (https://parallel.ai/acceptable-use-policy)](/ai/acceptable-use-policy)
* [Trust Center](https://trust.parallel.ai/) [[Trust Center] (https://trust.parallel.ai/)](https://trust.parallel.ai/)
* Report Security Issue [[Report Security Issue] (mailto:security@parallel.ai)](mailto:security@parallel.ai)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [[LinkedIn] (https://www.linkedin.com/company/parallel-web/about/)](https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [[Twitter] (https://x.com/p0)](https://x.com/p0) [GitHub](https://github.com/parallel-web) [[GitHub] (https://github.com/parallel-web)](https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

Parallel Web Systems Inc. 2026
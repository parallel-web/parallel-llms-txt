[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Search](/products/search) [Search](https://parallel.ai/products/search) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Parallel Extract

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Today, we’re announcing the Parallel [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Extract API]($https://docs.parallel.ai/extract/extract-quickstart) in beta, joining the Parallel [Search API](https://docs.parallel.ai/search/search-quickstart) [Search API]($https://docs.parallel.ai/search/search-quickstart) as part of our Web Tools bundle. Parallel Extract accepts URLs and returns LLM-ready page extractions in markdown format.

By granting agents access to Parallel Extract, they gain the option to view entire page contents as needed when conducting research, or if explicitly requested by an end user.

[](https://cdn.sanity.io/images/5hzduz3y/production/54d49cae25e3bc4e13d48cf21897b8ca75285520-2756x1880.png?w=2000&fit=max&auto=format&dpr=2)

![](https://cdn.sanity.io/images/5hzduz3y/production/54d49cae25e3bc4e13d48cf21897b8ca75285520-2756x1880.png) Parallel Extract in Claude Desktop (via Parallel Search MCP)

## \## How Parallel Extract works

The Parallel Extract API operates in two modes:

**\*\* Compressed excerpts: \*\*** Excerpts from the webpage, extracted and compressed based on your semantic objective. You get dense excerpts that agents can efficiently reason on for higher end-to-end accuracy, lower cost, and lower latency.

**\*\* Full content extraction: \*\*** You get the entire contents of a page in markdown format.

## \## Leading accuracy web extraction backed by our proprietary web index

Extract leverages the same proprietary index and retrieval infrastructure that powers our Task and Search APIs. This enables extraction from the most challenging corners of the web, including JavaScript-rendered sites that only load after client-side execution and complex, multi-page PDFs with images.

[### Parallel Extract helps with a range of agentic tasks **\*\* Coding documentation extraction \*\*** : Pull complete API references, code examples, and implementation guides from documentation sites. **\*\* PDF research paper processing \*\*** : Extract methodology sections, results tables, or complete papers from academic PDFs. **\*\* News article summarization \*\*** : Retrieve article content without ads, navigation, or paywalls, returning clean text ready for summarization or sentiment analysis. **\*\* Financial filing analysis \*\*** : Extract specific sections from 10-Ks, earnings reports, or regulatory filings.]( )

## \## Built for compatibility with Parallel Search

Parallel Search and Extract form a powerful combination for AI agents. Agents can use the Search API to discover relevant webpages across the web with compressed excerpts, based on semantic objectives. Then, use the Extract API to retrieve full content or targeted excerpts for further analysis.

This workflow is especially effective through our MCP server integration, as agents can seamlessly move from searching to extraction in a single tool configuration.

[](https://cdn.sanity.io/images/5hzduz3y/production/3c5fed4bab0a2cfea3491346f7c8b17fba10cdb4-2914x1912.png?w=2000&fit=max&auto=format&dpr=2)

![](https://cdn.sanity.io/images/5hzduz3y/production/3c5fed4bab0a2cfea3491346f7c8b17fba10cdb4-2914x1912.png) Parallel Search and Extract together in Claude Desktop (via Parallel Search MCP)

* \- One-click install in [Cursor](https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC1tY3AucGFyYWxsZWwuYWkvbWNwIn0=) [Cursor]($https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC1tY3AucGFyYWxsZWwuYWkvbWNwIn0=)
* \- One-click install in [VSCode](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch-mcp.parallel.ai%2Fmcp%22%7D) [VSCode]($https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch-mcp.parallel.ai%2Fmcp%22%7D)
* \- [Instructions](https://docs.parallel.ai/integrations/mcp/search-mcp/-claude-ai) [Instructions]($https://docs.parallel.ai/integrations/mcp/search-mcp/-claude-ai) for Claude Desktop, Claude Code, Gemini CLI, Windsurf, Cline, ChatGPT, etc.

## \## Start building with Parallel Extract

[\### An example Python request ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 import os from parallel import Parallel client = Parallel(api_key=os.environ[ "PARALLEL_API_KEY" ]) extract = client.beta.extract( urls=[ "https://www.un.org/en/about-us/history-of-the-un" ], objective= "When was the United Nations established?" , excerpts= True , full_content= False , ) print (extract.results) ``` import os from parallel import Parallel client = Parallel(api_key=os.environ["PARALLEL_API_KEY"]) extract = client.beta.extract( urls=["https://www.un.org/en/about-us/history-of-the-un"], objective="When was the United Nations established?", excerpts=True, full_content=False, ) print(extract.results) ``` ```]( )

Get started in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or view the [documentation](https://docs.parallel.ai/extract) [documentation]($https://docs.parallel.ai/extract) .

## \## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of Web Search and Agent APIs is built on a rapidly growing proprietary index of the global internet. Our solutions transform human tasks that previously took weeks into agentic tasks that now take just minutes.

Fortune 100 companies in insurance, finance, and retail, as well as AI-first businesses like Clay, Starbridge, and Sourcegraph, use Parallel’s APIs to give their agents access to the best data from the web.

By Parallel

November 20, 2025

### \## Related Posts 39

[### \- [ How Amp’s coding agents build better software with Parallel Search ] (https://parallel.ai/blog/case-study-amp) Tags: [Case Study](/blog?tag=case-study) Reading time: 3 min](/blog/case-study-amp)

[### \- [ Latency improvements on the Parallel Task API ] (https://parallel.ai/blog/task-api-latency) Reading time: 3 min](/blog/task-api-latency)

[### \- [ Introducing Parallel FindAll ] (https://parallel.ai/blog/introducing-findall-api) Tags: [Product Release](/blog?tag=product-release) , [Benchmarks](/blog?tag=benchmarks) Reading time: 4 min](/blog/introducing-findall-api)

[### \- [ Introducing Parallel Monitor ] (https://parallel.ai/blog/monitor-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 3 min](/blog/monitor-api)

[### \- [ Parallel raises $100M Series A to build web infrastructure for agents ] (https://parallel.ai/blog/series-a) Tags: [Fundraise](/blog?tag=fundraise) Reading time: 3 min](/blog/series-a)

[### \- [ How Macroscope reduced code review false positives with Parallel ] (https://parallel.ai/blog/case-study-macroscope) Reading time: 2 min](/blog/case-study-macroscope)

[### \- [ Introducing Parallel Search: the highest accuracy web search API engineered for AI ] (https://parallel.ai/blog/introducing-parallel-search) Tags: [Benchmarks](/blog?tag=benchmarks) Reading time: 7 min](/blog/introducing-parallel-search)

[### \- [ Parallel processors set new price-performance standard on SealQA benchmark ] (https://parallel.ai/blog/benchmarks-task-api-sealqa) Tags: [Benchmarks](/blog?tag=benchmarks) Reading time: 3 min](/blog/benchmarks-task-api-sealqa)

[### \- [ Introducing LLMTEXT, an open source toolkit for the llms.txt standard ] (https://parallel.ai/blog/LLMTEXT-for-llmstxt) Tags: [Product Release](/blog?tag=product-release) Reading time: 7 min](/blog/LLMTEXT-for-llmstxt)

[### \- [ How Starbridge powers public sector GTM with state-of-the-art web research ] (https://parallel.ai/blog/case-study-starbridge) Tags: [Case Study](/blog?tag=case-study) Reading time: 4 min](/blog/case-study-starbridge)

[### \- [ Building a market research platform with Parallel Deep Research ] (https://parallel.ai/blog/cookbook-market-research-platform-with-parallel) Tags: [Cookbook](/blog?tag=cookbook) Reading time: 4 min](/blog/cookbook-market-research-platform-with-parallel)

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

[### \- [ Introducing the Parallel Search API ] (https://parallel.ai/blog/parallel-search-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 2 min](/blog/parallel-search-api)

[### \- [ Introducing the Parallel Chat API ] (https://parallel.ai/blog/chat-api) Tags: [Product Release](/blog?tag=product-release) Reading time: 1 min](/blog/chat-api)

[### \- [ Introducing Basis with Calibrated Confidences ] (https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) Tags: [Product Release](/blog?tag=product-release) Reading time: 4 min](/blog/introducing-basis-with-calibrated-confidences)

[### \- [ Introducing the Parallel Task API ] (https://parallel.ai/blog/parallel-task-api) Tags: [Product Release](/blog?tag=product-release) , [Benchmarks](/blog?tag=benchmarks) Reading time: 4 min](/blog/parallel-task-api)

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

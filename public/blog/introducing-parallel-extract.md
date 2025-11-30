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
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
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

Parallel Web Systems Inc. 2025

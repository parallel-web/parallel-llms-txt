[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing the Parallel Task MCP Server

The Parallel Task MCP Server is a first-of-its-kind tool for AIs to perform complex knowledge tasks over data from the open web. It introduces a new concept to the MCP standard: asynchronous tasks, which enables users to continue working in their MCP client while Parallel’s web search tasks run in the background.

Tags: [Product Release](/blog?tag=product-release)

Reading time: 4 min

## \## A quick primer on the Task API

Parallel’s Task API is a unique and powerful primitive for building repeatable tasks on the web. At its core, the Task API combines web data (URLs, ranking, experts, and page contents) with LLM reasoning to perform knowledge tasks. A way to think of this is like telling a human to go and research every car model made in the year 1960. It would take them a few hours to make all the necessary searches, create a spreadsheet, and then return the results to you. Parallel scales up those kinds of tasks programmatically using search and AI.

Under the hood, the API is making multiple web searches across multiple steps of reasoning to understand and shape the data for an output. Any information retrieval that can be done on the open web is in scope for the Task API.

#### \#### The API supports three levels of task complexity:

1. Simple query -> Simple output
2. Simple query -> Structured output
3. Structured query -> Structured output

Every task returns comprehensive [Basis outputs](https://docs.parallel.ai/task-api/basis-framework) [Basis outputs]($https://docs.parallel.ai/task-api/basis-framework) \- citations linking to source materials, detailed reasoning for each field, relevant excerpts, and calibrated confidence scores. This verification framework makes the Task MCP Server suitable for production workflows where accuracy and auditability matter.

## \## The Parallel Task MCP server

The Task MCP Server provides two core capabilities: deep research tasks that generate comprehensive reports, and enrichment tasks that transform existing datasets with web intelligence. Built on the same infrastructure that powers our Task API, it delivers the highest quality at every price point while eliminating complex integration work.

**\*\* Deep Research Tasks \*\*** \- Generate extensive, citation-backed reports on any topic. Whether conducting competitive intelligence, due diligence, or market research, agents can now delegate complex multi-hop research that previously required custom workflows.

#### An example of a Deep Research Task in the Parallel Playground

[]( )

![Wingstop Franchise Growth Analysis: U.S. Saturation and International Expansion Opportunities](https://cdn.sanity.io/images/5hzduz3y/production/fdfdcf7ad65d4c00551f3eb513b57573855b29ea-2328x1698.png)

**\*\* Enrichment Tasks \*\*** \- Transform existing datasets with structured web intelligence. Upload a CSV of companies, contacts, or entities, define what fields you need enriched, and receive back a complete dataset with citations and reasoning for every addition.

#### An example of an Enrichment Task in the Parallel Playground

[]( )

![](https://cdn.sanity.io/images/5hzduz3y/production/02544e9bfc4ac7bfbea52a40aa6d2b159d24fbe1-3264x1606.png)

## \## An new way to work with MCP

The Task MCP Server uses a first-of-its-kind async architecture that lets agents start research tasks and continue executing other work without blocking. This is critical for production agents handling complex workflows— start a deep research task on competitor analysis, move on to enriching a prospect list, then retrieve the research results when complete.

Long-running deep research tasks that might take minutes no longer freeze your agent's execution. The result is that agents can orchestrate multiple parallel research streams and maintain responsiveness while conducting thorough web intelligence gathering.

## \## When to use the Parallel Task MCP

The Task MCP excels in both daily power-user workflows and development experimentation scenarios.

**\*\* For professionals \*\*** who use tools like ChatGPT or Claude for work, the Task MCP comes in handy for research tasks requiring high confidence, like doing a market analysis of the leading web hosting platforms across dimensions such as price or server location.

#### A conversation in Claude Desktop where the user asks for a query to be rerun using a different Processor

[]( )

![](https://cdn.sanity.io/images/5hzduz3y/production/df39f563b9af089584b8df9e1177fa73e1fedddb-1760x1440.png)

**\*\* For developers \*\*** building their own applications with the Parallel Task API, the MCP server can be a great way to quickly conduct testing, for example comparing the same prompt.

#### An example in Claude Desktop where the user invokes the Parallel Task MCP to do a supplier analysis exercise

[]( )

![](https://cdn.sanity.io/images/5hzduz3y/production/73cc987bd18dc99351a34dc2a58655e4462b8be4-1754x1334.png)

## \## State-of-the-art performance across price points

The Task MCP Server provides access to our full Processor lineup - from Lite to Ultra8x - each optimized to deliver best in class performance at its price point. Our Processors achieve [state-of-the-art results](https://parallel.ai/blog/deep-research-benchmarks) [state-of-the-art results]($https://parallel.ai/blog/deep-research-benchmarks) on benchmarks like WISER-Atomic and BrowseComp, with our Ultra8x Processor reaching **\*\* 58% \*\*** accuracy on BrowseComp - higher than human expert performance.

That means your agent can dial up for critical research or dial down for routine enrichment, with transparent per-query pricing and no token-based billing complexity.

## \## How to get started

The Parallel Task MCP Server works with any MCP-compatible client, including:

* \- Cursor - [One-click installation](https://cursor.com/en/install-mcp?name=Parallel%20Task%20MCP&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9) [One-click installation]($https://cursor.com/en/install-mcp?name=Parallel%20Task%20MCP&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9)
* \- VS Code - [One-click installation](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Task%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp%22%7D) [One-click installation]($https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Task%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp%22%7D)
* \- Claude, Gemini, Windsurf, and other MCP clients - Custom connector setup
* \- Programmatic use - Direct API integration with [OpenAI](https://docs.parallel.ai/integrations/mcp/programmatic-use) [OpenAI]($https://docs.parallel.ai/integrations/mcp/programmatic-use) and [Anthropic](https://docs.parallel.ai/integrations/mcp/programmatic-use) [Anthropic]($https://docs.parallel.ai/integrations/mcp/programmatic-use) SDKs

For developers building production systems, the MCP can be integrated programmatically using your Parallel API key as a Bearer token, enabling seamless integration into existing agentic workflows. The Parallel Task MCP Server works with any MCP-compatible client.

To learn more, check out our [documentation](https://docs.parallel.ai/integrations/mcp/getting-started) [documentation]($https://docs.parallel.ai/integrations/mcp/getting-started) .

By Parallel

October 16, 2025

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

[Parallel](/)

Products

[Pricing](/pricing)

[Benchmarks](/benchmarks)

[Blog](/blog)

[Docs](https://docs.parallel.ai/home)

Products: [Search API](https://parallel.ai/products/search) [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Task API](https://parallel.ai/products/task) [FindAll API](https://parallel.ai/products/findall) [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)

[Pricing](https://parallel.ai/pricing) [Benchmarks](https://parallel.ai/benchmarks) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home)

[Contact C](https://form.fillout.com/t/rv6fubdwwuus) [Contact] (https://form.fillout.com/t/rv6fubdwwuus) [Log In / Sign Up P](https://platform.parallel.ai/) [Log In / Sign Up] (https://platform.parallel.ai/)

Menu [Menu]

Human Machine

# \# Authenticated page access for the Parallel Task API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 3 min

Starting today, the Parallel Task API can conduct research over private, login-protected data sources— extending its capabilities beyond the public web.

Critical information often resides behind login walls, including internal wikis, gated industry databases, protected documentation, proprietary research sources, and niche portals. Until now, these sources have remained out of reach for web enrichment and deep research workflows.

With authenticated page access, the [Task API](https://docs.parallel.ai/task-api/task-quickstart) [Task API]($https://docs.parallel.ai/task-api/task-quickstart) can now research across both public and private sources within a single workflow.

![](https://cdn.sanity.io/images/5hzduz3y/production/d96dcc45f833dad3cb54e40f8864dc2545d9f154-5396x3240.jpg)

## \## When to use authenticated page access

For third-party providers that offer out-of-the-box MCP servers or OAuth connectors (stay tuned for more on this), we recommend using those purpose-built integrations.

For the long tail of gated domains where no dedicated connector exists, connect Parallel with the [Browser Use MCP](https://docs.parallel.ai/integrations/browseruse) [Browser Use MCP]($https://docs.parallel.ai/integrations/browseruse) to authenticate into these private domains.

We only recommend using browser agents for authentication into a private domain when the domain allows for such authentication, and it complies with its Terms of Service. It's recommended to make these checks yourself before connecting Parallel with any browser agent MCP.

\### Sample query

```
1

Go  to  https: //www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series. ```  Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series. ```
```

![Before and after using Browser Use MCP](https://cdn.sanity.io/images/5hzduz3y/production/0c05c6cf9488eb22080a08a051b9d9b5802edf8a-5396x3240.jpg)

## \## How it works

When a browser agent is connected with Parallel, we orchestrate research by doing the following:

1. **\*\* Source discovery: \*\*** The Task API identifies relevant sources for your query, including any login-protected domains you’ve configured for private access.
2. **\*\* Authenticated retrieval: \*\*** When the Task API encounters a gated source, it delegates retrieval to the browser agent via MCP. The agent completes the login flow in a secure session and fetches the protected content.
3. **\*\* Cross-source synthesis: \*\*** The Task API synthesizes data from both public and private sources into a unified response with full Basis support, including citations, reasoning, excerpts, and confidence scores.

This architecture keeps credential management separate from Parallel’s infrastructure. Your authentication details remain with the browser agent service you configure, while Parallel handles research orchestration and synthesis.

\### Sample request with the Browser Use MCP

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

15

16

17

18

curl -X POST  "https://api.parallel.ai/v1/tasks/runs"  \
  -H  "x-api-key: $PARALLEL_API_KEY"  \
  -H  "Content-Type: application/json"  \
  -H  "parallel-beta: mcp-server-2025-07-17"  \
  --data  '{
  " input ": " Go to https: //www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.", "processor" :  "ultra" ,
   "mcp_servers" : [
    {
       "type" :  "url" ,
       "url" :  "https://api.browser-use.com/mcp" ,
       "name" :  "browseruse" ,
       "headers" : {
         "Authorization" :  "Bearer YOUR_BROWSERUSE_API_KEY" 
      }
    }
  ]
} ' ```  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \ -H "x-api-key: $PARALLEL_API_KEY" \ -H "Content-Type: application/json" \ -H "parallel-beta: mcp-server-2025-07-17" \ --data '{ "input": "Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.", "processor": "ultra", "mcp_servers": [ { "type": "url", "url": "https://api.browser-use.com/mcp", "name": "browseruse", "headers": { "Authorization": "Bearer YOUR_BROWSERUSE_API_KEY" } } ] }' ```
```

## \## Start building

Private data access is available today for all Task API processors. Get started in the [Developer Platform](https://platform.parallel.ai/login?redirectTo=%2F) [Developer Platform]($https://platform.parallel.ai/login?redirectTo=%2F) or dive into the [documentation](https://docs.parallel.ai/integrations/browseruse) [documentation]($https://docs.parallel.ai/integrations/browseruse) .

**\*\* \*\***

## \## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI businesses like Manus, Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

By Parallel

January 28, 2026

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

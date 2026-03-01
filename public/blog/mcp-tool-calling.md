[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Tool Calling via MCP Servers

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Starting today, the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) [Parallel Task API]($https://parallel.ai/blog/parallel-task-api) supports Tool Calling via MCP Servers in beta. With a single API call, you can now bring your own tools, data sources, and execution logic directly into web research workflows.

With Tool Calling support, developers can choose to expose tools hosted on external MCP-compatible servers and invoke them through the Task API. This allows Parallel agents to reach out to private databases, code execution sandboxes, or proprietary APIs - without custom orchestrators or standalone MCP clients.

## \## **\*\* Tool Calling features \*\***

* \- **\*\* Bring your own infrastructure \*\*** : Connect any internal infrastructure like private databases, financial modelers, RAG pipelines, or sandboxed code interpreters.
* \- **\*\* No custom orchestration \*\*** : Parallel Task API processors handle tool discovery and invocation, eliminating the need to write your own complex logic for determining when tools should be called.
* \- **\*\* Complete traceability \*\*** : Every Task API response returns all tool calls made, including arguments, responses, and errors.
* \- **\*\* Private by design \*\*** : Sensitive execution logic stays within your perimeter. You define what tools are called and how they're authenticated, down to the header level.

\### Sample Task API request with a Tool Call

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

19

curl -X POST  "https://api.parallel.ai/v1/tasks/runs"  \
 -H  "x-api-key: YOUR_API_KEY"  \
 -H  "content-type: application/json"  \
 -H  "parallel-beta: mcp-server-2025-07-17"  \
 --data  '{
   "input": "What is the latest in AI research?",
   "processor": "lite",
   "mcp_servers": [
     {
       "type": "url",
       "url": "https://your_mcp_server",
       "name": "your_mcp_server",
       "headers": {
         "x-api-key": "API_KEY"
       }
     }
   ]
 }' ```  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \ -H "x-api-key: YOUR_API_KEY" \ -H "content-type: application/json" \ -H "parallel-beta: mcp-server-2025-07-17" \ --data '{ "input": "What is the latest in AI research?", "processor": "lite", "mcp_servers": [ { "type": "url", "url": "https://your_mcp_server", "name": "your_mcp_server", "headers": { "x-api-key": "API_KEY" } } ] }'   ```
```

## \## **\*\* Start Building \*\***

Connect your preferred MCP server and start integrating your own tools, data sources, and execution logic into Parallel Task API requests. Get started by diving into our [documentation](https://docs.parallel.ai/features/mcp-tool-call) [documentation]($https://docs.parallel.ai/features/mcp-tool-call) .

By Parallel

July 28, 2025

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

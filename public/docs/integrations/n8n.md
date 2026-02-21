> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# n8n

> Use Parallel in n8n Automations

Integrate Parallel's AI-powered web research directly into your n8n workflows with our community node package.

## Installation

Install the community node directly in n8n through the Community Nodes section in your n8n settings.

**Links:**

* [NPM Package](https://www.npmjs.com/package/n8n-nodes-parallel)
* [n8n Integration Hub](https://n8n.io/integrations/parallel/)

## Available Nodes

| Node                                     | Operation            | Description                                               | Use Case                                                                                            |
| ---------------------------------------- | -------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Parallel Node**                        | Sync Web Enrichment  | Execute tasks synchronously (up to 5 minutes)             | Lead enrichment, competitive analysis, content research                                             |
| **Parallel Node**                        | Async Web Enrichment | Long-running research tasks (up to 30 minutes)            | Complex multi-source research, deep competitive intelligence                                        |
| **Parallel Node**                        | Web Search           | AI-powered web search with domain filtering               | Natural language search with structured results and citations                                       |
| **Parallel Node**                        | Web Chat             | Real-time web-informed AI responses (\< 5 seconds)        | Current events queries, fact-checking, research-backed conversations                                |
| **Parallel Task Run Completion Trigger** | Webhook Trigger      | Automatically trigger workflows when async tasks complete | Use with Async Web Enrichment - paste trigger webhook URL into the async node's "Webhook URL" field |

## Common Use Cases

* **Sales**: Lead scoring, account research, contact discovery
* **Marketing**: Content research, trend analysis, competitor monitoring
* **Operations**: Vendor research, risk assessment, due diligence
* **Support**: Real-time information lookup, documentation generation

For detailed configuration and advanced features, see the [Task API guide](../task-api/task-quickstart).

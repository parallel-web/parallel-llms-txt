> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Install and configure Parallel MCP servers for AI assistants like Cursor, VS Code, and Claude Desktop

## When to use Parallel MCPs?

Our MCP servers are the best way to explore what's possible with our APIs, as it using complex APIs without prior knowledge, and comparing results.

The Parallel MCP Servers expose Parallel APIs to AI assistants and large language model (LLM) workflows, delivering high-quality, relevant results from the web while optimizing for the price-performance balance your AI applications need at scale.

As can be seen in the following table, our MCPs can be useful for quick experimentation with deep research and task groups, or for daily use.

| Use Case                                                              | What                                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Agentic applications where low-latency search is a tool call          | **[Search MCP](/integrations/mcp/search-mcp)**                                        |
| Daily use for everyday deep-research tasks in chat-based clients      | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Enriching a dataset (eg. a CSV) with web data via chat-based clients  | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Running benchmarks on Parallel processors across a series of queries  | **[Task MCP](/integrations/mcp/task-mcp)**                                            |
| Building high-scale production apps that integrate with Parallel APIs | **[Search MCP](/integrations/mcp/search-mcp) and [Tasks](/task-api/task-quickstart)** |

## Available MCP Servers

Parallel offers two MCP servers that can be installed in any MCP client. They can also be [used programmatically](/integrations/mcp/programmatic-use) by providing your Parallel API key in the Authorization header as a Bearer token.

<Note>
  Looking for help with Parallel documentation? Try our [Docs MCP](https://docs.parallel.ai/mcp) to get AI-assisted answers about Parallel's documentation. This is for navigating our docs only—it does not provide access to Parallel APIs.
</Note>

### [Search MCP](/integrations/mcp/search-mcp)

The Search MCP provides drop-in web search capabilities for any MCP-aware model. It invokes the [Search API](/search/search-quickstart) endpoint with an `agentic` mode optimized for agent workflows.

**Server URL:** `https://search-mcp.parallel.ai/mcp`

[View Search MCP Documentation →](/integrations/mcp/search-mcp)

***

### [Task MCP](/integrations/mcp/task-mcp)

The Task MCP enables deep research tasks and data enrichment workflows. It provides access to the [Task API](/task-api/task-quickstart) for generating comprehensive reports and transforming datasets with web intelligence.

**Server URL:** `https://task-mcp.parallel.ai/mcp`

[View Task MCP Documentation →](/integrations/mcp/task-mcp)

***

## Quick Installation

Both MCPs can be installed in popular AI assistants and IDEs. For detailed installation instructions for your specific platform, visit:

* **[Search MCP Installation Guide →](/integrations/mcp/search-mcp#installation)**
* **[Task MCP Installation Guide →](/integrations/mcp/task-mcp#installation)**

### Quick Install Links

For Cursor and VS Code users, you can use these deep links for one-click installation:

**Cursor:**

* [🔗 Install Search MCP](https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP\&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC1tY3AucGFyYWxsZWwuYWkvbWNwIn0=)
* [🔗 Install Task MCP](https://cursor.com/en/install-mcp?name=Parallel%20Task%20MCP\&config=eyJ1cmwiOiJodHRwczovL3Rhc2stbWNwLnBhcmFsbGVsLmFpL21jcCJ9)

**VS Code:**

* [🔗 Install Search MCP](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP\&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch-mcp.parallel.ai%2Fmcp%22%7D)
* [🔗 Install Task MCP](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Task%20MCP\&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftask-mcp.parallel.ai%2Fmcp%22%7D)

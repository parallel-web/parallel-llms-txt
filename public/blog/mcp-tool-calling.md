# Introducing Tool Calling via MCP Servers

Starting today, the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) supports Tool Calling via MCP Servers in beta. With a single API call, you can now bring your own tools, data sources, and execution logic directly into web research workflows.

With Tool Calling support, developers can choose to expose tools hosted on external MCP-compatible servers and invoke them through the Task API. This allows Parallel agents to reach out to private databases, code execution sandboxes, or proprietary APIs - without custom orchestrators or standalone MCP clients.

## **Tool Calling features**

- **Bring your own infrastructure**: Connect any internal infrastructure like private databases, financial modelers, RAG pipelines, or sandboxed code interpreters.
- **No custom orchestration**: Parallel Task API processors handle tool discovery and invocation, eliminating the need to write your own complex logic for determining when tools should be called.
- **Complete traceability**: Every Task API response returns all tool calls made, including arguments, responses, and errors.
- **Private by design**: Sensitive execution logic stays within your perimeter. You define what tools are called and how they're authenticated, down to the header level.

```sh
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
 -H "x-api-key: YOUR_API_KEY" \
 -H "content-type: application/json" \
 --data '{
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
 }'

```

## **Start Building**

Connect your preferred MCP server and start integrating your own tools, data sources, and execution logic into Parallel Task API requests. Get started by diving into our [documentation](https://docs.parallel.ai/).

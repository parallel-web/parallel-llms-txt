> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP Tool Calling

> Using MCP servers for tool calls in Tasks

<Note>
  This feature is currently in beta and requires the
  <code>parallel-beta: mcp-server-2025-07-17</code> header when using the Task API.
</Note>

## Overview

The Parallel API allows you to specify remote MCP servers for Task API execution. This enables the model to access tools hosted on remote MCP servers without needing a separate MCP client.

### Specifying MCP Servers

MCP servers are specified using the `mcp_servers` field in the Task API call. Each request can include up to 10 MCP servers.

| Parameter       | Type                      | Description                                     |
| --------------- | ------------------------- | ----------------------------------------------- |
| `type`          | `string`                  | Always `url`.                                   |
| `url`           | `string`                  | The URL of the MCP server.                      |
| `name`          | `string`                  | A name for the MCP server.                      |
| `headers`       | `dict[string, string]`    | Headers for authenticating with the MCP server. |
| `allowed_tools` | `array[string]` or `null` | List of tools to allow, or null for all.        |

#### Sample Request

<CodeGroup>
  ```bash Task API theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -H "parallel-beta: mcp-server-2025-07-17" \
    --data '{
    "input": "What is the latest in AI research?",
    "processor": "lite",
    "mcp_servers": [
      {
          "type": "url",
          "url": "https://dummy_mcp_server",
          "name": "dummy_mcp_server",
          "headers": {"x-api-key": "API_KEY"}
      }
    ]
  }'
  ```
</CodeGroup>

#### Restrictions

* Only MCP servers with Streamable HTTP transport are currently supported.
* From the [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26), only tools are supported.
* For [MCP servers using OAuth](https://modelcontextprotocol.io/specification/draft/basic/authorization), you must generate the authorization token separately and include it as a bearer token in the headers.
* You can specify up to 10 MCP servers per request, but using fewer is recommended for optimal result quality.

## Using MCP Servers in the Task API

When you make a Task API request, the API first fetches the available tools from the specified MCP servers.
The processor will invoke tools from these servers if it determines they are useful for the task. The number of tool calls depends
on the [processor](/task-api/guides/choose-a-processor):

* For `lite` and `core`, at most one tool is invoked.
* For all other processors, multiple tool calls may be made.

## Response Content

The Task API response includes a list of tool calls made during execution. Each tool call entry contains:

| Parameter      | Type     | Description                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `tool_call_id` | `string` | Unique identifier for the tool call.                                                         |
| `server_name`  | `string` | Name of the MCP server, as provided in the input.                                            |
| `tool_name`    | `string` | Name of the tool invoked.                                                                    |
| `arguments`    | `string` | JSON-encoded string of the arguments used for the tool call.                                 |
| `content`      | `string` | Response from the MCP server.                                                                |
| `error`        | `string` | Error message if the tool call failed. Either `content` or `error` will always be populated. |

If there is an authentication issue with any MCP server, the top-level `warning` field in the Task Run output
will be populated.

<CodeGroup>
  ```bash Success theme={"system"}
  {
    "run": {
      "run_id": "trun_6eb64c73e4324b159fb4c63cc673cb73",
      "status": "completed",
      "is_active": false,
      "warnings": null,
      "error": null,
      "processor": "lite",
      "metadata": {},
      "taskgroup_id": null,
      "created_at": "2025-07-24T21:47:23.245857Z",
      "modified_at": "2025-07-24T21:47:41.874114Z"
    },
    "output": {
      "basis": [
        {
          "field": "output",
          "citations": [
            {
              "title": null,
              "url": "https://www.crescendo.ai/news/latest-ai-news-and-updates",
              "excerpts": []
            }
          ],
          "reasoning": "I used the provided search results to identify the latest AI research developments as of July 2025. I focused on extracting information about new AI models, applications, and ethical considerations from the search results to provide a comprehensive overview.",
          "confidence": ""
        }
      ],
      "mcp_tool_calls": [
        {
          "tool_call_id": "call_p1tBixLzgDAMoTrPIK9R6Gew",
          "server_name": "parallel_web_search",
          "tool_name": "web_search_parallel",
          "arguments": "{\"query\": \"latest AI research July 2025\", \"objective\": \"To find the most recent developments in AI research.\"}",
          "content": "{\n  \"search_id\": \"search_14c4ca29-5ae3-b74a-de65-dcb8506d9b20\",\n  \"results\": ...}",
          "error": ""
        }
      ],
      "type": "text",
      "content": "As of July 2025, ...."
    }
  }
  ```

  ```bash Failure authenticating to MCP server theme={"system"}
  {
    "run": {
      "run_id": "trun_6eb64c73e4324b15aa537bc630b8a9d9",
      "status": "completed",
      "is_active": false,
      "warnings": [
        {
          "type": "warning",
          "message": "Error listing tools from MCP server dummy_mcp_server. Reference ID: b0ac36f3-ceb6-4290-b7c9-c0bb4257ccf7",
          "detail": {}
        }
      ],
      "error": null,
      "processor": "lite",
      "metadata": {},
      "taskgroup_id": null,
      "created_at": "2025-07-24T21:41:19.103657Z",
      "modified_at": "2025-07-24T21:41:33.650738Z"
    },
    "output": {
      "basis": [
        {
          "field": "output",
          "citations": [
            {
              "title": null,
              "url": "https://www.crescendo.ai/news/latest-ai-news-and-updates",
              "excerpts": []
            }
          ],
          "reasoning": "The search results provide an overview of the latest AI research developments, including AI models mimicking human decision-making, AI applications in healthcare, and AI-driven automation across various industries. The response summarizes these key developments and cites the relevant articles.",
          "confidence": ""
        }
      ],
      "mcp_tool_calls": null,
      "type": "text",
      "content": "As of July 2025, ...."
    }
  }
  ```
</CodeGroup>

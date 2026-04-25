> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser Use

> Access private web data in Tasks using Browser Use MCP

Integrate Browser Use with the Parallel Task API to access authenticated web content and private data during task execution. The Browser Use MCP server enables Parallel to interact with websites through a browser that you configure, allowing access to content behind logins, paywalls, or other authentication barriers.

## Overview

By connecting the [Browser Use](https://browser-use.com) MCP server to your Parallel tasks, you can:

* **Access authenticated content**: Research data behind logins, such as internal dashboards, CRM systems, or subscription services
* **Interact with dynamic web applications**: Navigate SPAs and JavaScript-heavy sites that require browser rendering
* **Automate browser workflows**: Fill forms, click buttons, and navigate multi-step processes as part of research tasks
* **Extract private data**: Pull information from accounts and services that require authentication

## Prerequisites

* A Parallel API key from [Platform](https://platform.parallel.ai)
* A Browser Use API key from [Browser Use](https://browser-use.com)
* For authenticated content: A Browser Use profile with saved login sessions. Profiles are persistent storage containers that maintain your credentials and cookies across browser sessions. See the [Browser Use Profile Documentation](https://docs.cloud.browser-use.com/concepts/profile) for setup instructions.

<Note>
  The `browser_task` and `monitor_task` tools are required for basic browser functionality. To access authenticated content via profiles, `list_browser_profiles` must also be included in your `allowed_tools` configuration. Without it, the browser will function but cannot access your saved authenticated sessions.
</Note>

## Configuration

Add the Browser Use MCP server to your Task API requests using the `mcp_servers` field. See [MCP Tool Calling](/task-api/mcp-tool-call) for complete documentation on using MCP servers with the Task API.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -H "parallel-beta: mcp-server-2025-07-17" \
    --data '{
    "input": "Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.",
    "processor": "ultra",
    "mcp_servers": [
      {
        "type": "url",
        "url": "https://api.browser-use.com/mcp",
        "name": "browseruse",
        "headers": {
          "Authorization": "Bearer YOUR_BROWSERUSE_API_KEY"
        }
      }
    ]
  }'
  ```

  ```python Python theme={"system"}
  import requests

  response = requests.post(
      "https://api.parallel.ai/v1/tasks/runs",
      headers={
          "x-api-key": "YOUR_PARALLEL_API_KEY",
          "Content-Type": "application/json",
          "parallel-beta": "mcp-server-2025-07-17"
      },
      json={
          "input": "Go to https://www.nxp.com/products/K66_180 and extract only the "
                   "migration-related information for the K66-180 chip, specifically "
                   "documentation on Migration from Kinetis K Series to MCXNx4x Series.",
          "processor": "ultra",
          "mcp_servers": [
              {
                  "type": "url",
                  "url": "https://api.browser-use.com/mcp",
                  "name": "browseruse",
                  "headers": {
                      "Authorization": "Bearer YOUR_BROWSERUSE_API_KEY"
                  }
              }
          ]
      }
  )

  print(response.json())
  ```

  ```typescript TypeScript theme={"system"}
  const response = await fetch("https://api.parallel.ai/v1/tasks/runs", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PARALLEL_API_KEY,
      "Content-Type": "application/json",
      "parallel-beta": "mcp-server-2025-07-17",
    },
    body: JSON.stringify({
      input:
        "Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.",
      processor: "ultra",
      mcp_servers: [
        {
          type: "url",
          url: "https://api.browser-use.com/mcp",
          name: "browseruse",
          headers: {
            Authorization: `Bearer ${process.env.BROWSERUSE_API_KEY}`,
          },
        },
      ],
    }),
  });

  console.log(await response.json());
  ```
</CodeGroup>

## Best Practices

* **Use appropriate processors**: Browser interactions require `ultra` or higher processors that support multiple tool calls
* **Be specific with instructions**: Provide clear steps for authentication and navigation when the path is complex
* **Combine with web research**: Browser Use handles private data while Parallel's built-in capabilities handle public web research
* **Manage credentials securely**: Store your Browser Use API key securely and rotate it regularly

## Limitations

* The Browser Use MCP server requires the `parallel-beta: mcp-server-2025-07-17` header
* Browser interactions add latency compared to direct API calls
* Complex multi-step workflows may require higher-tier processors for optimal results

For more details on MCP server configuration and response handling, see the [MCP Tool Calling](/task-api/mcp-tool-call) documentation.

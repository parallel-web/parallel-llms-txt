> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Migration Guide

> Migrate from Alpha to Beta Search API (November 2025)

This guide helps you migrate from the Alpha Search API to the new Beta version.

<Note>
  Both the Alpha and Beta APIs continue to be supported. Using the Alpha API will result in warnings and no breaking errors in production. We will deprecate the Alpha API in December 2025.
</Note>

## What's New

1. **No more processors** - The Beta API removes the `base` and `pro` processor selection. The API now automatically optimizes search execution.

2. **Optional mode parameter** - Use `mode` to optimize results for your use case: `one-shot` (default, comprehensive results) or `agentic` (concise, token-efficient for multi-step workflows).

3. **Content freshness control** - New `fetch_policy` parameter lets you control whether to use cached or fresh content.

4. **MCP integration** - The Search API is now available through the [Parallel Search MCP](/integrations/mcp/search-mcp) for seamless integration with AI tools.

5. **Enhanced SDK support** - Full TypeScript and Python SDK support with better developer experience.

## Overview of Changes

| Component             | Alpha                                     | Beta                                                  |
| --------------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Endpoint**          | `/alpha/search`                           | `/v1beta/search`                                      |
| **Beta Header**       | Not required                              | `parallel-beta: search-extract-2025-10-10` (required) |
| **Processor**         | `processor: "base"` or `"pro"` (required) | **Removed**                                           |
| **Mode**              | Not available                             | `mode: "one-shot"` or `"agentic"` (optional)          |
| **Excerpt Config**    | `max_chars_per_result: 1500`              | `excerpts: { max_chars_per_result: 10000 }`           |
| **Freshness Control** | Not available                             | `fetch_policy: { max_age_seconds: 3600 }` (optional)  |
| **SDK Method**        | N/A                                       | `client.beta.search()`                                |

## Migration Example

### Before (Alpha)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request POST \
    --url https://api.parallel.ai/alpha/search \
    --header "Content-Type: application/json" \
    --header "x-api-key: $PARALLEL_API_KEY" \
    --data '{
      "objective": "When was the United Nations established?",
      "search_queries": ["Founding year UN"],
      "processor": "base",
      "max_results": 5,
      "max_chars_per_result": 1500
    }'
  ```

  ```python Python theme={"system"}
  import requests

  url = "https://api.parallel.ai/alpha/search"
  payload = {
      "objective": "When was the United Nations established?",
      "search_queries": ["Founding year UN"],
      "processor": "base",
      "max_results": 5,
      "max_chars_per_result": 1500
  }
  headers = {
      "x-api-key": "$PARALLEL_API_KEY",
      "Content-Type": "application/json"
  }

  response = requests.post(url, json=payload, headers=headers)
  ```
</CodeGroup>

### After (Beta)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1beta/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: search-extract-2025-10-10" \
    -d '{
      "objective": "When was the United Nations established?",
      "search_queries": ["Founding year UN"],
      "max_results": 5,
      "excerpts": {
        "max_chars_per_result": 10000
      }
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel
  import os

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  search = client.beta.search(
      objective="When was the United Nations established?",
      search_queries=["Founding year UN"],
      max_results=5,
      excerpts={"max_chars_per_result": 10000},
  )

  print(search.results)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const search = await client.beta.search({
      objective: "When was the United Nations established?",
      search_queries: ["Founding year UN"],
      max_results: 5,
      excerpts: { max_chars_per_result: 10000 },
  });

  console.log(search.results);
  ```
</CodeGroup>

## Additional Resources

* [Search Quickstart](/search/search-quickstart) - Get started with the Beta API
* [Best Practices](/search/best-practices) - Optimize your search requests
* [Search MCP](/integrations/mcp/search-mcp) - Use Search via Model Context Protocol
* [API Reference](/api-reference/search-beta/search) - Complete parameter specifications

Questions? Contact [support@parallel.ai](mailto:support@parallel.ai).

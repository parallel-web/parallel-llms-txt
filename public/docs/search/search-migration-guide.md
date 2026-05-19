> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Migration Guide: Beta to GA

> Migrate from Beta to GA (V1) Search API

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

This guide helps you migrate from the Beta Search API (`/v1beta`) to the GA version (`/v1`).

<Note>
  Both the Beta and V1 APIs continue to be supported. Using the Beta API will result in warnings and no breaking errors in production until at least June 2026. We recommend migrating to the V1 API for the latest features and improvements.
</Note>

## Highlights

1. **`search_queries` is now required** — At least one non-empty query must be provided. In Beta, only one of `objective` or `search_queries` was required.

2. **Settings reorganized under `advanced_settings`** — `source_policy`, `fetch_policy`, excerpt settings, and `max_results` are now nested under a single new `advanced_settings` object (previously top-level fields). See [Advanced Settings](/search/advanced-search-settings) for more details.

3. **New `location` field** — Set `advanced_settings.location` to an ISO 3166-1 alpha-2 country code (e.g., `"us"`, `"gb"`, `"de"`, `"jp"`) to geo-target search results. Only a subset of countries are currently supported; unsupported or invalid values are ignored with a warning.

4. **Simplified modes** — Modes are reduced from three (`fast`, `one-shot`, `agentic`) to two (`basic`, `advanced`), with `advanced` as the new default. For most use cases, map both `fast` and `one-shot` to `basic`, and map `agentic` to `advanced`.
   * **`basic`**: Offers lower latency and works best with 2-3 high-quality search\_queries. Best for real-time applications where speed is critical.
   * **`advanced`** (default): Provides higher quality with more advanced retrieval and compression. Best for complex queries where result quality matters more than latency.

## Overview of Changes

| Component                     | Beta                                                       | V1                                                                                                    |
| ----------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Endpoint**                  | `/v1beta/search`                                           | `/v1/search`                                                                                          |
| **Modes**                     | `fast`, `one-shot`, `agentic` (default `one-shot`)         | `basic`, `advanced` (default `advanced`)                                                              |
| **SDK method**                | `client.beta.search()`                                     | `client.search()`                                                                                     |
| **`search_queries`**          | Optional (one of `objective` or `search_queries` required) | Required (at least one non-empty query)                                                               |
| **`objective`**               | Required if `search_queries` omitted                       | Optional                                                                                              |
| **`max_chars_total`**         | Inside `excerpts` object                                   | Promoted to top-level request field                                                                   |
| **`client_model`** (new)      | —                                                          | Top-level field for model-specific optimizations                                                      |
| **`location`** (new)          | —                                                          | `advanced_settings.location` — ISO 3166-1 alpha-2 country code for geo-targeted results               |
| **`advanced_settings`** (new) | —                                                          | New object nesting `source_policy`, `fetch_policy`, `excerpt_settings`, `max_results`, and `location` |

## Migration Example

### Before (Beta)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1beta/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "objective": "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      "search_queries": ["Parallel Web Systems products", "Parallel Web Systems announcements"],
      "mode": "fast",
      "excerpts": {
        "max_chars_per_result": 10000,
        "max_chars_total": 50000
      }
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel
  import os

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  search = client.beta.search(
      objective="Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      search_queries=["Parallel Web Systems products", "Parallel Web Systems announcements"],
      mode="fast",
      excerpts={"max_chars_per_result": 10000, "max_chars_total": 50000},
  )

  print(search.results)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const search = await client.beta.search({
      objective: "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      search_queries: ["Parallel Web Systems products", "Parallel Web Systems announcements"],
      mode: "fast",
      excerpts: { max_chars_per_result: 10000, max_chars_total: 50000 },
  });

  console.log(search.results);
  ```
</CodeGroup>

### After (V1)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "objective": "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      "search_queries": ["Parallel Web Systems products", "Parallel Web Systems announcements"],
      "mode": "basic",
      "max_chars_total": 50000,
      "advanced_settings": {
        "excerpt_settings": {
          "max_chars_per_result": 10000
        }
      }
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel
  import os

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  search = client.search(
      objective="Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      search_queries=["Parallel Web Systems products", "Parallel Web Systems announcements"],
      mode="basic",
      max_chars_total=50000,
      advanced_settings={"excerpt_settings": {"max_chars_per_result": 10000}},
  )

  print(search.results)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const search = await client.search({
      objective: "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
      search_queries: ["Parallel Web Systems products", "Parallel Web Systems announcements"],
      mode: "basic",
      max_chars_total: 50000,
      advanced_settings: { excerpt_settings: { max_chars_per_result: 10000 } },
  });

  console.log(search.results);
  ```
</CodeGroup>

## Additional Resources

* [Search Quickstart](/search/search-quickstart) - Get started with the Search API
* [Best Practices](/search/best-practices) - Optimize your search requests
* [Search MCP](/integrations/mcp/search-mcp) - Use Search via Model Context Protocol
* [API Reference](/api-reference/search/search) - Complete parameter specifications

Questions? Contact [support@parallel.ai](mailto:support@parallel.ai).

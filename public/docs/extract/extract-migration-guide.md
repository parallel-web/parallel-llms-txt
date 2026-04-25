> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract Migration Guide: Beta to GA

> Migrate from Beta to GA (V1) Extract API

This guide helps you migrate from the Beta Extract API (`/v1beta`) to the GA version (`/v1`).

<Note>
  Both the Beta and V1 APIs continue to be supported. Using the Beta API will result in warnings and no breaking errors in production until at least June 2026. We recommend migrating to the V1 API for the latest features and improvements.
</Note>

## Highlights

1. **Excerpts are always returned** — The top-level `excerpts` field (bool or settings object) is removed. Excerpts are now always returned in the response; size is controlled via `advanced_settings.excerpt_settings.max_chars_per_result`. You can no longer disable excerpts by setting `excerpts: false`.

2. **Settings reorganized under `advanced_settings`** — `fetch_policy`, excerpt settings, and `full_content` are now nested under a single new `advanced_settings` wrapper object (previously top-level fields). See [Advanced Settings](/extract/advanced-extract-settings) for the full list.

3. **Larger request capacity** — `urls` now accepts up to **20 URLs per request**, and `objective` now accepts up to **5000 characters**.

## Overview of Changes

| Component                | Beta                                                                                           | V1                                                                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Endpoint**             | `/v1beta/extract`                                                                              | `/v1/extract`                                                                                                                                                  |
| **SDK method**           | `client.beta.extract()`                                                                        | `client.extract()`                                                                                                                                             |
| **`urls` limit**         | Up to 10 URLs per request                                                                      | Up to 20 URLs per request                                                                                                                                      |
| **`objective` limit**    | Up to 3000 characters                                                                          | Up to 5000 characters                                                                                                                                          |
| **Excerpts**             | Configurable via top-level `excerpts` (bool or object); can be disabled with `excerpts: false` | Always returned; size controlled via `advanced_settings.excerpt_settings.max_chars_per_result` (cannot be disabled)                                            |
| **`max_chars_total`**    | Inside `excerpts` object                                                                       | Promoted to top-level request field (controls total excerpt size; does not affect `full_content`)                                                              |
| **`client_model`** (new) | —                                                                                              | Top-level field for model-specific optimizations                                                                                                               |
| **`session_id`** (new)   | —                                                                                              | Top-level field for grouping related Search and Extract calls made by an agent as part of the same task. Server returns one on every response if not provided. |
| **`advanced_settings`**  | —                                                                                              | New object nesting `fetch_policy`, `excerpt_settings`, and `full_content`                                                                                      |

## Migration Example

### Before (Beta)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1beta/extract \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "urls": ["https://www.un.org/en/about-us/history-of-the-un"],
      "objective": "When was the United Nations established?",
      "excerpts": {
        "max_chars_per_result": 5000,
        "max_chars_total": 50000
      },
      "full_content": {
        "max_chars_per_result": 50000
      }
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel
  import os

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  extract = client.beta.extract(
      urls=["https://www.un.org/en/about-us/history-of-the-un"],
      objective="When was the United Nations established?",
      excerpts={"max_chars_per_result": 5000, "max_chars_total": 50000},
      full_content={"max_chars_per_result": 50000},
  )

  print(extract.results)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const extract = await client.beta.extract({
      urls: ["https://www.un.org/en/about-us/history-of-the-un"],
      objective: "When was the United Nations established?",
      excerpts: { max_chars_per_result: 5000, max_chars_total: 50000 },
      full_content: { max_chars_per_result: 50000 },
  });

  console.log(extract.results);
  ```
</CodeGroup>

### After (V1)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1/extract \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "urls": ["https://www.un.org/en/about-us/history-of-the-un"],
      "objective": "When was the United Nations established?",
      "max_chars_total": 50000,
      "advanced_settings": {
        "excerpt_settings": {
          "max_chars_per_result": 5000
        },
        "full_content": {
          "max_chars_per_result": 50000
        }
      }
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel
  import os

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  extract = client.extract(
      urls=["https://www.un.org/en/about-us/history-of-the-un"],
      objective="When was the United Nations established?",
      max_chars_total=50000,
      advanced_settings={
          "excerpt_settings": {"max_chars_per_result": 5000},
          "full_content": {"max_chars_per_result": 50000},
      },
  )

  print(extract.results)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const extract = await client.extract({
      urls: ["https://www.un.org/en/about-us/history-of-the-un"],
      objective: "When was the United Nations established?",
      max_chars_total: 50000,
      advanced_settings: {
          excerpt_settings: { max_chars_per_result: 5000 },
          full_content: { max_chars_per_result: 50000 },
      },
  });

  console.log(extract.results);
  ```
</CodeGroup>

## Additional Resources

* [Extract Quickstart](/extract/extract-quickstart) - Get started with the V1 Extract API
* [Best Practices](/extract/best-practices) - Optimize your extract requests
* [API Reference](/api-reference/extract/extract) - Complete parameter specifications

Questions? Contact [support@parallel.ai](mailto:support@parallel.ai).

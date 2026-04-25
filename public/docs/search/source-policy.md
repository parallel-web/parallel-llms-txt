> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Source Policy

> Control which sources are used in web research, including domain allow/deny lists and a freshness start date.

The Source Policy feature allows you to precisely control which domains Parallel processors can
access during web research and to apply a freshness constraint. It's available for both Tasks and
Web Tools and lets you tailor search results by specifying domains to include or exclude and by
setting a start date so results are limited to recent content.

<Warning>
  Source policies can significantly reduce result quality by excluding relevant pages from retrieval. Use `include_domains` and `exclude_domains` only when absolutely necessary — for compliance-bound corpora, tasks that require a single known publisher, or when specific sources must be blocked. When you only want to *prefer* certain sources, steer in the `objective` instead (e.g., "prefer official documentation").
</Warning>

## Configuration

You can configure source control by setting the following parameters:

| Parameter         | Type           | Supported            | Description                                                                                                                                                                             |
| ----------------- | -------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `include_domains` | array\[string] | Task API, Search API | List of domains to **allow**. Only sources from these domains will be included in results. The combined number of domains in `include_domains` and `exclude_domains` cannot exceed 200. |
| `exclude_domains` | array\[string] | Task API, Search API | List of domains to **block**. Sources from these domains will be excluded from results. The combined number of domains in `include_domains` and `exclude_domains` cannot exceed 200.    |
| `after_date`      | string\<date>  | Search API           | Optional start date for filtering results. Results are limited to content published on or after this date. Provided as an RFC 3339 date string (`YYYY-MM-DD`).                          |

Specifying an apex domain such as `example.com` will automatically include all its
subdomains (e.g., `www.example.com`, `blog.example.com`, `api.example.com`).

### Domain Limit

<Warning>
  **Hard limit: Combined total of 200 domains per request.** You can specify up to 200 domains in total across `include_domains` and `exclude_domains`. Exceeding this limit will raise a validation error.
</Warning>

## Example

<CodeGroup>
  ```bash Task API theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "input": "How many employees does Parallel Web Systems have?",
        "processor": "core",
        "source_policy": {
          "include_domains": ["linkedin.com"]
        }
      }'
  ```

  ```bash Search API theme={"system"}
  curl https://api.parallel.ai/v1/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "objective": "Which open source LLMs were released recently and how do they benchmark?",
      "search_queries": ["open source LLMs"],
      "advanced_settings": {
        "source_policy": {
          "exclude_domains": ["reddit.com"],
          "after_date": "2026-01-01"
        }
      }
    }'
  ```
</CodeGroup>

## Best Practices

* Use either `include_domains` or `exclude_domains` in a single query. Specifying `exclude_domains` is redundant when `include_domains` is set, as only `include_domains` will be applied.

* List each domain in its apex form (e.g., `example.com`). Do not include schemes (`http://`, `https://`) or subdomain prefixes (such as `www.`).

* Wildcards can be used in domain specifications, for example, to research only ".org" domains. However, paths, for example "example.com/blog", are not yet supported.

* Although there is a maximum limit of 200 domains, carefully using specific and targeted domains will give better results.

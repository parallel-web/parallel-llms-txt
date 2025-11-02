# Source Policy

> Configure which domains are included or excluded from your web research results.

The Source Policy feature allows you to precisely control which domains Parallel processors can
access during web research. It's available for both Tasks and WebTools and
lets you tailor search results by specifying domains to include or exclude,
ensuring more relevant and trustworthy information.

## Configuration

You can configure domain control by setting the following parameters:

| Parameter         | Type           | Description                                                                                |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `include_domains` | array\[string] | List of domains to **allow**. Only sources from these domains will be included in results. |
| `exclude_domains` | array\[string] | List of domains to **block**. Sources from these domains will be excluded from results.    |

Specifying an apex domain such as `example.com` will automatically include all its
subdomains (e.g., `www.example.com`, `blog.example.com`, `api.example.com`).

<Warning>You can specify up to 10 domains per request. Exceeding this limit will raise a validation error.</Warning>

## Example

<CodeGroup>
  ```bash Task API theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: PARALLEL_API_KEY" \
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
  curl -X POST "https://api.parallel.ai/v1beta/search" \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "objective": "Find the latest open source LLMs",
      "search_queries": ["open source LLMs"],
      "processor": "core",
      "source_policy": {
        "exclude_domains": ["reddit.com"]
      }
    }'
  ```
</CodeGroup>

## Best Practices

* Use either `include_domains` or `exclude_domains` in a single query.
  Specifying `exclude_domains` is redundant when `include_domains` is set, as only `include_domains` will be applied.
* List each domain in its apex form (e.g., `example.com`).
  Do not include schemes (`http://`, `https://`) or subdomain prefixes (such as `www.`).
* Wildcards cannot be used in domain specifications. Each domain must be explicitly listed.
* Although there is a maximum limit of 10 domains,
  carefully using specific and targeted domains will give better results.

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract API Best Practices

> Learn how to optimize web content extraction with objectives, search queries, and fetch policies for LLM-ready markdown output

The Extract API converts any public URL into clean, LLM-optimized markdown—handling
JavaScript-heavy pages and PDFs automatically. Extract focused excerpts aligned to your
objective or retrieve full page content as needed.

<Note>
  {" "} **Beta Notice**: This API is currently in beta and subject to change, and
  requires the <code>parallel-beta: search-extract-2025-10-10</code> header. Usage is
  limited to 600 requests per minute; for production access or higher capacity, contact
  [support@parallel.ai](mailto:support@parallel.ai).{" "}
</Note>

## Key Benefits

* Search with Natural Language: Describe what you're looking for in plain language and
  handle complex, multi-faceted queries in a single request—no need for multiple
  overlapping keyword searches.

* Intelligent Token Efficiency: Automatically include only the tokens necessary for the
  task at hand. Simple factual queries return concise excerpts; complex research
  objectives return comprehensive content. No wasted tokens on irrelevant information.

* Advanced Content Extraction: Extract clean, structured markdown from any web page—even
  those requiring JavaScript execution or PDF rendering. Focus extraction on your
  specific objective to get only relevant content, or retrieve full page content when
  needed.

* Speed: Reduce latency and improve quality by replacing multi-step pipelines with
  fewer, smarter API calls.

* Quality: Powered by Parallel's web-scale index with advanced ranking that prioritizes
  relevance, clarity, and source reliability.

## Request Fields

The Extract API accepts the following parameters. The `urls` field is required; all
other fields are optional. See the [API
Reference](/api-reference/extract-beta/extract) for complete parameter
specifications and constraints.

| Field           | Type           | Default  | Notes                                                                                                                                                                                           | Example                                                                                                      |
| --------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| urls            | string\[]      | -        | List of URLs to extract content from. Maximum 10 URLs per request.                                                                                                                              | \["[https://example.com/article](https://example.com/article)"]                                              |
| objective       | string         | optional | Natural-language description of what information you're looking for, including broader task context. When provided, focuses extracted content on relevant information. Maximum 3000 characters. | "I'm researching React performance optimization. Find best practices for preventing unnecessary re-renders." |
| search\_queries | string\[]      | optional | Optional keyword queries to focus extraction. Use with or without objective to emphasize specific terms.                                                                                        | \["React.memo", "useMemo", "useCallback"]                                                                    |
| fetch\_policy   | object         | dynamic  | Controls when to return indexed vs fresh content. If not provided, a dynamic policy will be used based on the search objective and url. See [Fetch Policy](#fetch-policy) below.                | `{"max_age_seconds": 3600}`                                                                                  |
| excerpts        | bool or object | true     | Return focused excerpts relevant to objective/queries. Set to `false` to disable or pass settings object.                                                                                       | `true` or `{"max_chars_per_result": 5000, "max_chars_total": 25000}`                                         |
| full\_content   | bool or object | false    | Return complete page content. Set to `true` to enable or pass settings object.                                                                                                                  | `false` or `{"max_chars_per_result": 50000}`                                                                 |

## Fetch Policy

The `fetch_policy` parameter controls when to return indexed content (faster) or fetch
fresh content from the source (fresher). Fetching fresh content may take up to a minute
and is subject to rate limits to manage the load on source websites.

| Field                    | Type   | Default | Notes                                                                                                                                                        |
| ------------------------ | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| max\_age\_seconds        | int    | dynamic | Maximum age of indexed content in seconds. If older, fetches live. Minimum 600 (10 minutes). If unspecified, uses dynamic policy based on URL and objective. |
| timeout\_seconds         | number | dynamic | Timeout for fetching live content. If unspecified, uses uses a dynamic timeout based on URL and content type (typically 15s-60s).                            |
| disable\_cache\_fallback | bool   | false   | If `true`, returns an error when live fetch fails. If `false`, falls back to older indexed content.                                                          |

## Excerpt and Full Content Settings

Both `excerpts` and `full_content` accept either a boolean or a settings object.

**Boolean usage:**

```json wrap theme={"system"}
{
  "excerpts": true,
  "full_content": false
}
```

**Settings object:**

```json wrap theme={"system"}
{
  "excerpts": {
    "max_chars_per_result": 5000
  },
  "full_content": {
    "max_chars_per_result": 50000
  }
}
```

**Notes:**

* When both `excerpts` and `full_content` are enabled, you'll receive both in the response
* Excerpts are always focused on relevance; full content always starts from the beginning
* Without `objective` or `search_queries`, excerpts will be redundant with full content

## Best Practices

See [Search Best Practices](/search/best-practices#best-practices) on using
objective and search queries effectively.

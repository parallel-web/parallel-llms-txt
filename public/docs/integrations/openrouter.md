> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouter

> Use Parallel as a web search engine on OpenRouter

Parallel is available as a web search engine on [OpenRouter](https://openrouter.ai), enabling any model to use Parallel-powered web search results. Select Parallel as the engine in the OpenRouter `web_search` server tool to ground AI responses with real-time web data.

Read OpenRouter's official documentation [here](https://openrouter.ai/docs/guides/features/server-tools/web-search).

## How it works

OpenRouter's `web_search` server tool lets the model decide when and how often to search the web. When you select Parallel as the engine, OpenRouter routes the search request through Parallel's Search API and returns the results as annotations on the model response.

This works with **any model** on OpenRouter, regardless of the provider.

<Note>OpenRouter's older `web` plugin is deprecated. New integrations should use the `openrouter:web_search` server tool shown below.</Note>

## Quick start

Set the `engine` to `"parallel"` in the `openrouter:web_search` server tool:

```json theme={"system"}
{
  "model": "openai/gpt-5.5",
  "messages": [
    {
      "role": "user",
      "content": "What are the latest developments in quantum computing?"
    }
  ],
  "tools": [
    {
      "type": "openrouter:web_search",
      "parameters": {
        "engine": "parallel"
      }
    }
  ]
}
```

## Configuration options

Customize the server tool with additional parameters:

```json theme={"system"}
{
  "model": "openai/gpt-5.5",
  "tools": [
    {
      "type": "openrouter:web_search",
      "parameters": {
        "engine": "parallel",
        "max_results": 5,
        "max_total_results": 20,
        "search_context_size": "medium",
        "allowed_domains": ["arxiv.org", "nature.com"]
      }
    }
  ]
}
```

| Parameter             | Type      | Default  | Description                                                                                         |
| --------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- |
| `engine`              | string    | —        | Set to `"parallel"` to use Parallel search                                                          |
| `max_results`         | integer   | 5        | Results per search call (range 1–25)                                                                |
| `max_total_results`   | integer   | —        | Cap on cumulative results across multiple searches in a single response                             |
| `search_context_size` | string    | `medium` | `low`, `medium`, or `high`. For Parallel, controls the total characters returned across all results |
| `allowed_domains`     | string\[] | —        | Only include results from these domains                                                             |
| `excluded_domains`    | string\[] | —        | Exclude results from these domains                                                                  |

<Note>`allowed_domains` and `excluded_domains` are mutually exclusive when using Parallel as the engine — you cannot use both in the same request.</Note>

## Domain filtering

Restrict which domains appear in search results:

```json theme={"system"}
{
  "model": "anthropic/claude-opus-4.7",
  "tools": [
    {
      "type": "openrouter:web_search",
      "parameters": {
        "engine": "parallel",
        "allowed_domains": ["arxiv.org", ".github.io"]
      }
    }
  ]
}
```

Both fields accept plain domains (e.g., `parallel.ai`) or bare domain extensions starting with a period (e.g., `.edu`, `.gov`).

## Parsing search results

Web search results are returned as annotations in the OpenAI Chat Completion format:

```json theme={"system"}
{
  "message": {
    "role": "assistant",
    "content": "Here's what I found: ...",
    "annotations": [
      {
        "type": "url_citation",
        "url_citation": {
          "url": "https://www.example.com/article",
          "title": "Article Title",
          "content": "Relevant content from the page",
          "start_index": 100,
          "end_index": 200
        }
      }
    ]
  }
}
```

## Pricing

When using Parallel as the engine on OpenRouter, pricing has two components:

1. **Parallel Search API costs** — see [Parallel pricing](/getting-started/pricing) for current rates
2. **LLM usage costs** — charged by OpenRouter for the additional prompt tokens from search results

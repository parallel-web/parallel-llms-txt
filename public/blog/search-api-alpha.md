# Parallel Search API is now available in alpha

Building AI agents and applications that access the web shouldn't require complex orchestration of searching, scraping, parsing, re-ranking, and filtering. The Parallel Search API handles this complexity for you, collapsing multi-step pipelines into a single fast API call.

## Why AIs Need a New Kind of Search

LLMs ingest tokens, not web pages. Mainstream search engines are engineered for human use—short, keyword queries, clickable titles, and ad yield—so they surface teaser snippets instead of the high‑density passages an agent needs to reason. Developers are forced to add scraping and summarization layers that increase latency, inflate token costs, and introduce brittle failure points that can corrupt reliability and downstream quality. An AI‑native retrieval layer must deliver the most information‑rich spans of text, with explicit controls for freshness and length, ready to slot directly into an LLM context window. These requirements shape the Parallel Search API. 

![Search API Playground on the Parallel Developer Platform](https://cdn.sanity.io/images/5hzduz3y/production/7cb91842e91b65063cd8e35c4d3212309496a77c-1664x1080.gif)

## _**The**_** Web Search Tool for AI Agents**

Built on Parallel’s custom web crawler and index, the Search API takes flexible inputs (search objective and/or search queries) and returns LLM-ready ranked URLs with extended webpage excerpts. With granular control over output sizes, it largely reduces the need for additional scraping, making it the go-to search tool for your AI agent.

**Two tiers to match your needs:**

- **Base**: Fast, cost-effective web access with extended webpage excerpts (2-5s)
- **Pro**: Best-in-class retrieval engine, prioritizing freshness and relevance. Built for long-horizon agents where quality matters over speed (15-60s)

```jsx
curl --request POST \
  --url https://api.parallel.ai/alpha/search \
  --header "Content-Type: application/json" \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "objective": "When was the United Nations established? Prefer UN'\''s websites.",
    "search_queries": [
      "Founding year UN",
      "Year of founding United Nations"
    ],
    "processor": "base",
    "max_results": 5,
    "max_chars_per_result": 1500
  }'
```

The Parallel Search API delivers high-quality, relevant results while optimizing for the price-performance balance your AI applications need at scale. By providing a single, simple abstraction, our Search API reduces token spend and eliminates the need to orchestrate multiple tools. Our [Chat](https://parallel.ai/blog/chat-api) and [Task APIs](https://parallel.ai/blog/parallel-task-api) utilize this same search technology as their underlying foundation.

## **Start Building**

Get started in our [Developer Platform](https://platform.parallel.ai/play/search) or dive into the [documentation](https://docs.parallel.ai/search-api/search-quickstart).

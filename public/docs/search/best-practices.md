> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search API Best Practices

> Using the Parallel Search API

The Search API returns ranked, LLM-optimized excerpts from web sources based on natural
language objectives or keyword queries. Results are designed to serve directly as model
input, enabling faster reasoning and higher-quality completions with minimal
post-processing.

## Key Benefits

* **Context engineering for token efficiency**: The API ranks and compresses web results based on reasoning utility rather than human engagement, delivering the most relevant tokens for each agent's specific objective.
* **Single-hop resolution of complex queries**: Where traditional search forces agents to make multiple sequential calls, accumulating latency and costs, Parallel resolves complex multi-topic queries in a single request.
* **Multi-hop efficiency**: For deep research workflows requiring multiple reasoning steps, agents using Parallel complete tasks in fewer tool calls while achieving higher accuracy and lower end-to-end latency.

## Request Fields

Note that at least one of `objective` or `search_queries` is required. The remaining
fields are optional. See the [API
Reference](https://docs.parallel.ai/api-reference/search-beta/search) for complete parameter
specifications and constraints.

| Field           | Type                                     | Notes                                                                                                                                                                                                                                                                                               | Example                                                         |
| --------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| mode            | string                                   | Presets for different use cases: `one-shot` (comprehensive results with longer excerpts for single-response answers), `agentic` (concise, token-efficient results for multi-step workflows), or `fast` (optimized for latency-sensitive use cases with \~1s response time). Defaults to `one-shot`. | "agentic"                                                       |
| objective       | string                                   | Natural-language description of the web research goal, including source or freshness guidance and broader context from the task. Maximum 5000 characters.                                                                                                                                           | "I want to know when the UN was founded. Prefer UN's websites." |
| search\_queries | string\[]                                | Optional search queries to supplement the objective. Maximum 200 characters per query.                                                                                                                                                                                                              | \["Founding year UN", "Year of founding United Nations"]        |
| max\_results    | int                                      | Maximum number of search results to return (1-20). Defaults to 10 if not provided.                                                                                                                                                                                                                  | 10                                                              |
| source\_policy  | [SourcePolicy](/resources/source-policy) | Controls your sources: include/exclude specific domains and optionally set a start date for freshness control via `after_date`. Use when you want stricter source control than objective text alone.                                                                                                | [Source policy example](/resources/source-policy#example)       |
| excerpts        | object                                   | Customize excerpt length.                                                                                                                                                                                                                                                                           | `{"max_chars_per_result": 10000, "max_chars_total": 50000}`     |
| fetch\_policy   | object                                   | Controls when to return indexed vs fresh content. Default is to disable live fetch and return cached content from the index.                                                                                                                                                                        | `{"max_age_seconds": 3600}`                                     |

## Mode: One-Shot, Agentic, and Fast

The `mode` parameter presets defaults for different use cases:

* **`one-shot`** (default): Returns comprehensive results with longer excerpts. Best for direct user queries, where only a single request will be made, or where lower latency is desired. This is the default mode for the Search API.

* **`agentic`**: Returns more concise, token-efficient results designed for multi-step agentic workflows. This is the mode used by the [Search MCP server](/integrations/mcp/search-mcp), and should be used when the search is part of a larger reasoning loop. Latency may be slightly higher than for `one-shot` due to additional processing to increase excerpt relevance.

* **`fast`**: Optimized for latency-sensitive use cases with expected response times of \~1s. Best for real-time applications where speed is critical.

Example using agentic mode:

```json  theme={"system"}
{
  "mode": "agentic",
  "objective": "Find recent research on quantum error correction",
  "search_queries": ["quantum error correction 2024", "QEC algorithms"],
  "max_results": 5
}
```

## Objective and Search Queries

**For best results, provide both `objective` and `search_queries`.** The objective should include context about your broader task or goal, while search queries ensure specific keywords are prioritized.

When writing objectives, be specific about preferred sources, include freshness requirements when relevant, and specify desired content types (e.g., technical documentation, peer-reviewed research, official announcements).

**Examples of effective objectives with search queries:**

```json  theme={"system"}
{
  "objective": "I'm helping a client decide whether to lease or buy an EV for their small business in California. Find information about federal and state tax credits, rebates, and how they apply to business vehicle purchases vs leases.",
  "search_queries": ["EV tax credit business", "California EV rebate lease", "federal EV incentive purchase vs lease"]
}
```

```json  theme={"system"}
{
  "objective": "I'm preparing Q1 2025 investor materials for a fintech startup. Find recent announcements (past 3 months) from the Federal Reserve and SEC about digital asset regulations and banking partnerships with crypto firms.",
  "search_queries": ["Federal Reserve crypto guidance 2025", "SEC digital asset policy", "bank crypto partnership regulations"]
}
```

```json  theme={"system"}
{
  "objective": "I'm designing a machine learning course for graduate students. Find technical documentation and API guides that explain how transformer attention mechanisms work, preferably from official framework documentation like PyTorch or Hugging Face.",
  "search_queries": ["transformer attention mechanism", "PyTorch attention documentation", "Hugging Face transformer guide"]
}
```

```json  theme={"system"}
{
  "objective": "I'm writing a literature review on Alzheimer's treatments for a medical journal. Find peer-reviewed research papers and clinical trial results from the past 2 years on amyloid-beta targeted therapies.",
  "search_queries": ["amyloid beta clinical trials", "Alzheimer's treatment research 2023-2025", "monoclonal antibody AD trials"]
}
```

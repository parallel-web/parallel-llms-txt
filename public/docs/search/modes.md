> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Modes

> Configure the Search API mode for your use case

The `mode` parameter presets defaults for different use cases:

* **`one-shot`** (default): Returns comprehensive results with longer excerpts. Best for direct user queries, where only a single request will be made, or where lower latency is desired. This is the default mode for the Search API.

* **`agentic`**: Returns more concise, token-efficient results designed for multi-step agentic workflows. This is the mode used by the [Search MCP server](/integrations/mcp/search-mcp), and should be used when the search is part of a larger reasoning loop. Latency may be slightly higher than for `one-shot` due to additional processing to increase excerpt relevance.

* **`fast`**: Optimized for latency-sensitive use cases with expected response times of \~1s. Best for real-time applications where speed is critical.

## Example

Using agentic mode:

```json  theme={"system"}
{
  "mode": "agentic",
  "objective": "Find recent research on quantum error correction",
  "search_queries": ["quantum error correction 2024", "QEC algorithms"],
  "max_results": 5
}
```

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Modes

> Configure the Search API mode for your use case

The `mode` parameter presets defaults for different use cases. Defaults to `advanced` if not specified.

* **`basic`**: Offers lower latency and works best with 2-3 high-quality search\_queries. Best for real-time applications where speed is critical, such as foreground agents where lower latency is important.

* **`advanced`** (default): Uses a more advanced retrieval and compression pipeline for higher-quality results. Best for complex queries where result quality matters more than latency, such as background agents.

## Example

Using basic mode:

```json theme={"system"}
{
  "mode": "basic",
  "objective": "What are the latest advances in quantum error correction?",
  "search_queries": ["quantum error correction 2026", "QEC algorithms"]
}
```

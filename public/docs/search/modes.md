> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Modes

> Configure the Search API mode for your use case

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

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

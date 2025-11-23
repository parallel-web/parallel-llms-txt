# Cancel

> Stop FindAll runs early to control costs

Stop a running FindAll search when you have enough matches or need to control costs. Results found before cancellation are preserved.

```bash cURL theme={"system"}
curl -X POST \
  https://api.parallel.ai/v1beta/findall/runs/{findall_id}/cancel \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "parallel-beta: findall-2025-09-15" \
  -H "Content-Type: application/json"
```

## How Cancellation Works

Cancellation is a **signal**, not instant:

* Active work units finish gracefully, no new work is scheduled
* Matches found so far are preserved and accessible
* You're charged for work completed during cancellation
* After cancellation, the run transitions to `cancelled` status (see **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**)

<Warning>
  Cancelled runs **cannot be extended or enriched**. Cancellation is irreversible—you'll need to create a new run to continue searching.
</Warning>

## Common Use Cases

* Control costs when a run takes longer than expected
* Stop after finding enough matches (monitor via [webhooks](/findall-api/features/findall-webhook) or [SSE](/findall-api/features/findall-sse))
* Iterate quickly with refined queries instead of waiting for completion

## Related Topics

* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[API Reference](https://docs.parallel.ai/api-reference/findall-api-beta/cancel-findall-run)**: Complete endpoint documentation

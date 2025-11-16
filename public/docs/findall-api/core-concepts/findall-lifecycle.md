# Run Lifecycle

> Understand FindAll run statuses, termination reasons, and how to cancel runs

## Run Statuses and Termination Reasons

FindAll runs progress from `queued` → `running` → terminal state (`completed`, `failed`, or `cancelled`).
A run is considered **active** when it has status `queued`, `running` and has active candidate generation, evaluation, and enrichments ongoing.

### Status Definitions

| Status      | Description                                  | Can Extend? | Can Enrich? |
| ----------- | -------------------------------------------- | ----------- | ----------- |
| `queued`    | Run is waiting to start processing           | N/A         | N/A         |
| `running`   | Run is actively evaluating candidates        | ❌ No        | ✅ Yes       |
| `completed` | Run finished (see termination reasons below) | Depends\*   | ✅ Yes       |
| `failed`    | Run encountered an error                     | ❌ No        | ❌ No        |
| `cancelled` | Run was cancelled by user                    | ❌ No        | ❌ No        |

\* See termination reasons below for extendability

### Termination Reasons

When a run reaches `completed` status, it will have one of these termination reasons:

| Termination Reason     | Description                                                                       | Can Extend?         |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------- |
| `match_limit_met`      | Successfully found the requested number of matches                                | ✅ Yes               |
| `cost_exceeded`        | Stopped due to low selectivity (too few matches relative to candidates evaluated) | ❌ No - refine query |
| `candidates_exhausted` | Evaluated all available candidates, search space fully explored                   | No - broaden query  |

For `failed` status:

| Termination Reason | Description                                |
| ------------------ | ------------------------------------------ |
| `error_occurred`   | Run encountered an error during processing |
| `timeout`          | Run exceeded maximum execution time        |

## Related Topics

* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Detailed pricing information and examples
* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[API Reference](https://docs.parallel.ai/api-reference/findall-api-beta/create-findall-run#response-status)**: Complete endpoint documentation

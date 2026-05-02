> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Events

> Understand monitor event types and how to retrieve them

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

Monitors produce a stream of events on each execution. Every event object has an `event_type` field that discriminates the variant:

| `event_type`   | Description                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `event_stream` | A new material change detected by an event\_stream monitor. See [Event Stream Quickstart](/monitor-api/monitor-quickstart).        |
| `snapshot`     | A change to the monitored task output detected by a snapshot monitor. See [Snapshot Quickstart](/monitor-api/quickstart-snapshot). |
| `completion`   | Execution completed with no new detections.                                                                                        |
| `error`        | Execution failed.                                                                                                                  |

<Note>
  A run maps to exactly one outcome. Runs with detected events do not also emit a `completion` event.
</Note>

## Event Stream Events (`event_type: "event_stream"`)

Emitted when an event\_stream monitor detects a new material change. Each event is an append-only entry in the monitor's log.

| Field            | Type             | Description                                                                                  |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `event_id`       | string           | Stable identifier. Safe to use for client-side deduplication across pagination and retries.  |
| `event_group_id` | string           | ID of the event group that owns this event.                                                  |
| `event_date`     | string \| null   | Date the event was produced (ISO 8601: `YYYY-MM-DD` or partial).                             |
| `event_type`     | `"event_stream"` | Discriminant.                                                                                |
| `output`         | object           | Text or JSON output describing the detected change. Includes `type`, `content`, and `basis`. |

## Snapshot Events (`event_type: "snapshot"`)

Emitted when a snapshot monitor detects that the monitored task output has changed. Contains both what changed and what it was before.

| Field             | Type           | Description                                                                                          |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `event_id`        | string         | Stable identifier. Safe to use for client-side deduplication.                                        |
| `event_group_id`  | string         | ID of the event group that owns this event.                                                          |
| `event_date`      | string \| null | Date the event was produced (ISO 8601).                                                              |
| `event_type`      | `"snapshot"`   | Discriminant.                                                                                        |
| `changed_output`  | object         | Partial output containing only the fields that changed, each with `basis` (reasoning and citations). |
| `previous_output` | object         | Full output from the prior run, for comparison.                                                      |

## Event Basis

Every detected event (`event_stream` and `snapshot`) includes a `basis` field in its output with citations, reasoning, and a confidence level—the same transparency framework used in Task API outputs. See [Research Basis](/task-api/guides/access-research-basis) for the full schema.

## Accessing Events

Events can be received via webhooks (recommended) or retrieved via the API.

### Webhooks (recommended)

Lowest latency, push-based delivery. Subscribe to `monitor.event.detected`, `monitor.execution.completed`, and `monitor.execution.failed`. See [Webhooks](./monitor-webhooks) for setup details.

### API

**List all events** for a monitor, newest first:

```
GET /v1/monitors/{monitor_id}/events
```

Returns up to the \~300 most recent executions. Use `next_cursor` for pagination. Pass `include_completions=true` to include no-change runs.

**Filter by execution** using the `event_group_id` query parameter:

```
GET /v1/monitors/{monitor_id}/events?event_group_id={event_group_id}
```

Use the `event_group_id` from the webhook payload directly as the query parameter to fetch all events from a specific execution.

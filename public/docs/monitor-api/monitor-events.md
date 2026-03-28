> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Events and Event Groups

> Understand monitor events, event groups, and how to retrieve them

Monitors produce a stream of events each time they run. These events capture:

* new results detected by your query (events)
* run completions
* errors (if a run fails)

Related events are grouped by an `event_group_id` so you can
fetch the full set of results that belong to the same discovery.

## Event Groups

<Note>
  Event groups are primarily relevant for webhook users. When a webhook fires
  with a `monitor.event.detected` event, it returns an `event_group_id` that you
  use to retrieve the complete set of results.
</Note>

Event groups collect related results under a single `event_group_id`.
When a monitor detects new results, it creates an event group. Subsequent runs can add
additional events to the same group if they're related to the same discovery.

Use event groups to present the full context of a discovery (multiple sources, follow‑up updates) as one
unit. To fetch the complete set of results for a discovery, use the [`GET` event group](/api-reference/monitor/retrieve-event-group) endpoint
with the `event_group_id` received in your webhook payload.

## Other Events

Besides events with new results, monitors emit:

* **Completion** (`type: "completion"`): indicates a run finished successfully.
* **Error** (`type: "error"`): indicates a run failed.

These are useful for sanity checks, alerting, and operational visibility (e.g., dashboards, retries).

<Note>
  Runs with non-empty events are not included in completions. This means that a
  run will correspond to only one of succesful event detection, completion or
  failure.
</Note>

## Accessing Events

You can receive events via webhooks (recommended) or retrieve them via endpoints.

* **Webhooks (recommended)**: lowest latency, push-based delivery.
  Subscribe to `monitor.event.detected`, `monitor.execution.completed`, and `monitor.execution.failed`.
  See [Monitor webhooks](./monitor-webhooks) for more details on setting up webhooks.

* **Endpoints (for history/backfill)**:
  * [`GET` monitor events](/api-reference/monitor/list-events) —
    list events for a monitor in reverse chronological order (up to recent \~300 runs).
    * This flattens out events, meaning that multiple events from the same event group
      will be listed as different events.
  * [`GET` event group](/api-reference/monitor/retrieve-event-group) -
    list all events given an `event_group_id`.

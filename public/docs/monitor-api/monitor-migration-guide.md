> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor Migration Guide: Alpha to GA

> Migrate from the Alpha Monitor API (/v1alpha) to the GA version (/v1)

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

This guide enumerates the contract differences between the Alpha Monitor API (`/v1alpha/monitors`) and the GA version (`/v1/monitors`), and outlines the steps required to migrate.

<Note>
  All ongoing development targets V1. The Alpha endpoints remain reachable but receive no new features:

  * Capabilities introduced after Alpha — `snapshot` monitors, structured `output` with `basis`, `advanced_settings.location`, and `processor` selection — are V1-only.
  * The Python and TypeScript SDKs expose typed bindings (`client.monitor.*`) only for V1. Alpha is reachable solely via the low-level HTTP client (`client.post("/v1alpha/monitors", ...)`).
  * The [Parallel CLI](/integrations/cli) targets V1 endpoints exclusively.
</Note>

## Highlights

* **Required `type` discriminant** — `"event_stream"` (default Alpha behavior) or new `"snapshot"`; determines the `settings` shape. See [Snapshot Quickstart](/monitor-api/quickstart-snapshot).
* **Nested `settings` / `advanced_settings`** — `query`, `output_schema`, `include_backfill` move under `settings`; `source_policy` and the new ISO 3166-1 `location` move under `settings.advanced_settings`. See [Advanced Settings](/monitor-api/monitor-quickstart#advanced-settings).
* **`processor` selection** — Top-level `"lite"` (default) or `"base"`. `base` increases recall and breadth for harder queries, at higher cost. See [Monitor Quickstart](/monitor-api/monitor-quickstart).
* **Endpoint renames** — Update → `POST /{id}/update`; Cancel → `POST /{id}/cancel`. New `POST /{id}/trigger` enqueues off-schedule one-off runs.
* **Unified events endpoint** — `GET /events` supersedes both Alpha endpoints with cursor pagination and an optional `event_group_id` filter. See [Events](/monitor-api/monitor-events).
* **Restructured event payload** — Stable `event_id`, `event_type` discriminator, and typed `output` with `basis` (citations, reasoning, confidence) replace the deprecated `output` string and the `result` object. See [Events](/monitor-api/monitor-events) and [Research Basis](/task-api/guides/access-research-basis).
* **V1-only SDKs and CLI** — Typed `client.monitor.*` bindings and the [Parallel CLI](/integrations/cli) target V1 exclusively.

## Overview of Changes

### Endpoints

| Operation                   | Alpha                                                              | V1                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Base path**               | `/v1alpha/monitors`                                                | `/v1/monitors`                                                                                                                 |
| **Create**                  | `POST /v1alpha/monitors`                                           | `POST /v1/monitors`                                                                                                            |
| **List (paginated)**        | `GET /v1alpha/monitors/list`                                       | `GET /v1/monitors`; cursor-paginated; supports `type` and `status` query filters                                               |
| **Retrieve**                | `GET /v1alpha/monitors/{monitor_id}`                               | `GET /v1/monitors/{monitor_id}`                                                                                                |
| **Update**                  | `POST /v1alpha/monitors/{monitor_id}`                              | `POST /v1/monitors/{monitor_id}/update`                                                                                        |
| **Cancel**                  | `DELETE /v1alpha/monitors/{monitor_id}`                            | `POST /v1/monitors/{monitor_id}/cancel`                                                                                        |
| **Trigger one-off run**     | —                                                                  | `POST /v1/monitors/{monitor_id}/trigger`                                                                                       |
| **List events**             | `GET /v1alpha/monitors/{monitor_id}/events?lookback_period=10d`    | `GET /v1/monitors/{monitor_id}/events?cursor=&limit=&include_completions=`                                                     |
| **Single execution events** | `GET /v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}` | `GET /v1/monitors/{monitor_id}/events?event_group_id=...`                                                                      |
| **Simulate event**          | `POST /v1alpha/monitors/{monitor_id}/simulate_event`               | Removed; closest analogue is `POST /{monitor_id}/trigger`, which executes a real run rather than dispatching a synthetic event |

### Create Request

| Concept                     | Alpha                                | V1                                                                              |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| **Monitor type**            | implicit; search-query monitors only | `type: "event_stream"` or `type: "snapshot"` (required)                         |
| **Search query**            | top-level `query`                    | `settings.query` (event\_stream only)                                           |
| **Output schema**           | top-level `output_schema`            | `settings.output_schema` (event\_stream only)                                   |
| **Backfill**                | top-level `include_backfill`         | `settings.include_backfill` (event\_stream only)                                |
| **Source policy**           | top-level `source_policy`            | `settings.advanced_settings.source_policy` (event\_stream only)                 |
| **Geo (`location`)** (new)  | —                                    | `settings.advanced_settings.location` (ISO 3166-1 alpha-2, e.g. `"us"`, `"gb"`) |
| **Snapshot baseline** (new) | —                                    | `settings.task_run_id` (snapshot only)                                          |
| **Processor** (new)         | —                                    | top-level `processor: "lite" \| "base"` (defaults to `"lite"`)                  |
| **Frequency**               | top-level `frequency` (`1h`–`30d`)   | unchanged                                                                       |
| **Webhook**                 | top-level `webhook`                  | unchanged                                                                       |
| **Metadata**                | top-level `metadata`                 | unchanged                                                                       |

### Response

| Field                    | Alpha                                            | V1                                                      |
| ------------------------ | ------------------------------------------------ | ------------------------------------------------------- |
| `type`                   | —                                                | new — `"event_stream"` or `"snapshot"`                  |
| `query`                  | top-level                                        | now at `settings.query`                                 |
| `output_schema`          | top-level                                        | now at `settings.output_schema`                         |
| `source_policy`          | top-level                                        | now at `settings.advanced_settings.source_policy`       |
| `include_backfill`       | top-level                                        | now at `settings.include_backfill`                      |
| `cadence`                | top-level (deprecated; `daily`/`weekly`/etc.)    | removed; use `frequency`                                |
| `status`                 | `"active"` \| `"canceled"` (single-`l` spelling) | `"active"` \| `"cancelled"` (double-`l` spelling)       |
| `last_run_at`            | present                                          | unchanged                                               |
| `output` (snapshot only) | —                                                | new; latest snapshot value for `type=snapshot` monitors |

### Events

V1 unifies the Alpha `MonitorEventDetail` shape into a single typed event with a stable `event_id`, a structured `output` object, and a `basis` array carrying per-field citations, reasoning, and confidence.

| Field                       | Alpha                    | V1                                                                                                                 |
| --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Discriminator               | `type: "event"`          | `event_type: "event_stream" \| "snapshot"`                                                                         |
| `event_id`                  | —                        | new; stable per-event identifier; safe for idempotent client-side dedup                                            |
| `event_group_id`            | present                  | unchanged                                                                                                          |
| `event_date`                | present                  | unchanged                                                                                                          |
| `output` (string)           | deprecated string field  | removed                                                                                                            |
| `result: { type, content }` | top-level (Text or JSON) | merged into `output: { type, content, basis }`                                                                     |
| `source_urls`               | top-level array          | removed; URLs surface via `output.basis[].citations[].url`                                                         |
| `basis`                     | —                        | new; per-field citations, reasoning, and confidence (see [Research Basis](/task-api/guides/access-research-basis)) |

Webhook event types (`monitor.event.detected`, `monitor.execution.completed`, `monitor.execution.failed`) are unchanged. The webhook payload still wraps an `event_group_id` to be resolved against the events endpoint.

### SDK and CLI Surface

V1 exposes typed bindings in both the Python and TypeScript SDKs and is the only version supported by the [Parallel CLI](/integrations/cli). Alpha has no typed or CLI surface — it is reachable only via the low-level HTTP client.

| Operation | Alpha (Python)                                     | V1 (Python)                              |
| --------- | -------------------------------------------------- | ---------------------------------------- |
| Create    | `client.post("/v1alpha/monitors", body=...)`       | `client.monitor.create(...)`             |
| List      | `client.get("/v1alpha/monitors/list", ...)`        | `client.monitor.list(...)`               |
| Retrieve  | `client.get("/v1alpha/monitors/{id}", ...)`        | `client.monitor.retrieve(monitor_id)`    |
| Update    | `client.post("/v1alpha/monitors/{id}", body=...)`  | `client.monitor.update(monitor_id, ...)` |
| Cancel    | `client.delete("/v1alpha/monitors/{id}", ...)`     | `client.monitor.cancel(monitor_id)`      |
| Trigger   | —                                                  | `client.monitor.trigger(monitor_id)`     |
| Events    | `client.get("/v1alpha/monitors/{id}/events", ...)` | `client.monitor.events(monitor_id, ...)` |

## Migration Example

### Before (Alpha)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1alpha/monitors \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "query": "AI startup funding announcements",
      "frequency": "1d",
      "include_backfill": false,
      "source_policy": {
        "include_domains": ["techcrunch.com", "bloomberg.com"]
      },
      "webhook": {
        "url": "https://example.com/webhook",
        "event_types": ["monitor.event.detected"]
      },
      "metadata": { "external_id": "acme-monitor-001" }
    }'
  ```

  ```python Python theme={"system"}
  import os
  from httpx import Response
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  monitor = client.post(
      "/v1alpha/monitors",
      cast_to=Response,
      body={
          "query": "AI startup funding announcements",
          "frequency": "1d",
          "include_backfill": False,
          "source_policy": {
              "include_domains": ["techcrunch.com", "bloomberg.com"],
          },
          "webhook": {
              "url": "https://example.com/webhook",
              "event_types": ["monitor.event.detected"],
          },
          "metadata": {"external_id": "acme-monitor-001"},
      },
  ).json()

  print(f"Monitor ID: {monitor['monitor_id']}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const monitor = (await client.post("/v1alpha/monitors", {
    body: {
      query: "AI startup funding announcements",
      frequency: "1d",
      include_backfill: false,
      source_policy: {
        include_domains: ["techcrunch.com", "bloomberg.com"],
      },
      webhook: {
        url: "https://example.com/webhook",
        event_types: ["monitor.event.detected"],
      },
      metadata: { external_id: "acme-monitor-001" },
    },
  })) as { monitor_id: string; status: string };

  console.log(`Monitor ID: ${monitor.monitor_id}`);
  ```
</CodeGroup>

### After (V1)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1/monitors \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "type": "event_stream",
      "frequency": "1d",
      "processor": "lite",
      "settings": {
        "query": "AI startup funding announcements",
        "include_backfill": false,
        "advanced_settings": {
          "source_policy": {
            "include_domains": ["techcrunch.com", "bloomberg.com"]
          },
          "location": "us"
        }
      },
      "webhook": {
        "url": "https://example.com/webhook",
        "event_types": ["monitor.event.detected"]
      },
      "metadata": { "external_id": "acme-monitor-001" }
    }'
  ```

  ```python Python theme={"system"}
  import os
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  monitor = client.monitor.create(
      type="event_stream",
      frequency="1d",
      processor="lite",
      settings={
          "query": "AI startup funding announcements",
          "include_backfill": False,
          "advanced_settings": {
              "source_policy": {
                  "include_domains": ["techcrunch.com", "bloomberg.com"],
              },
              "location": "us",
          },
      },
      webhook={
          "url": "https://example.com/webhook",
          "event_types": ["monitor.event.detected"],
      },
      metadata={"external_id": "acme-monitor-001"},
  )

  print(f"Monitor ID: {monitor.monitor_id}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const monitor = await client.monitor.create({
    type: "event_stream",
    frequency: "1d",
    processor: "lite",
    settings: {
      query: "AI startup funding announcements",
      include_backfill: false,
      advanced_settings: {
        source_policy: {
          include_domains: ["techcrunch.com", "bloomberg.com"],
        },
        location: "us",
      },
    },
    webhook: {
      url: "https://example.com/webhook",
      event_types: ["monitor.event.detected"],
    },
    metadata: { external_id: "acme-monitor-001" },
  });

  console.log(`Monitor ID: ${monitor.monitor_id}`);
  ```
</CodeGroup>

## Migration Checklist

### Required changes

* Update the base path from `/v1alpha/monitors` to `/v1/monitors`.
* Add the `type` discriminant (`"event_stream"` or `"snapshot"`) to every `CreateMonitorRequest`.
* Move `query`, `output_schema`, and `include_backfill` from top-level into `settings`.
* Move `source_policy` from top-level into `settings.advanced_settings.source_policy`.
* Migrate Update calls from `POST /{id}` to `POST /{id}/update`.
* Migrate Cancel calls from `DELETE /{id}` to `POST /{id}/cancel`.
* Replace `GET /{id}/event_groups/{event_group_id}` with `GET /{id}/events?event_group_id=...`.
* Replace the `lookback_period` query parameter with cursor-based pagination (`cursor`, `limit`).
* Update the status enum check from `"canceled"` to `"cancelled"` (double `l`).
* Replace reads of `result.content` and `source_urls` with `output.content` and `output.basis[].citations[].url`.
* Drop the deprecated top-level string `output` field on event records.

### Optional enhancements

* Set `processor: "base"` for harder queries that need higher recall and breadth.
* Set `settings.advanced_settings.location` to scope retrieval to a single country.
* Replace low-level `client.post(...)` calls with `client.monitor.*` SDK bindings.
* Use `event_id` for idempotent client-side dedup across pagination and webhook retries.
* Consume `output.basis` for per-field citations, reasoning, and confidence.
* Issue `POST /{id}/trigger` for off-schedule one-off executions.
* Pass `include_completions=true` to enumerate executions that produced no events (useful for audit traces).
* Adopt `type=snapshot` for field-level diffing of structured Task Run outputs (see [Snapshot Quickstart](/monitor-api/quickstart-snapshot)).

## Additional Resources

* [Monitor Quickstart](/monitor-api/monitor-quickstart) — V1 monitor lifecycle and webhook walkthrough
* [Snapshot Quickstart](/monitor-api/quickstart-snapshot) — `type=snapshot` walkthrough
* [Events](/monitor-api/monitor-events) — V1 event schemas and retrieval semantics
* [Webhooks](/monitor-api/monitor-webhooks) — payload schemas and HMAC verification
* [V1 API Reference](/api-reference/monitor/create-monitor) — generated from `public-openapi.json`
* [Legacy Alpha API Reference](/api-reference/legacy/monitor-alpha/create-monitor) — `/v1alpha/monitors` endpoint reference

Questions? Contact [support@parallel.ai](mailto:support@parallel.ai).

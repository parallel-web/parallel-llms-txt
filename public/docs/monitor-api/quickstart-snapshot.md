> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a Snapshot Monitor

> Monitor any task output for material changes on a schedule

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

A snapshot monitor watches the output of a Task Run on a schedule. Each execution re-runs the same task and compares the result against the previous snapshot. When the system detects a material change—new data, a removed field, a significant value shift—it fires a webhook.

Snapshot monitors work with **any** task output—text or structured JSON, `base`, `core`, `pro`, `ultra`, or any other processor. They are especially powerful for **structured enrichment tasks**, where the JSON schema acts as a stable template the monitor can diff field-by-field across runs, surfacing precisely which properties changed and why.

This gives you task cron with built-in deduplication and reasoning about what actually changed, at a fraction of the cost of running full Task API calls independently.

**Typical use cases:**

* Executive team or board changes at a company
* Competitor pricing or product page updates
* Regulatory filing status changes
* Job posting additions or removals
* Periodic deep-research briefs on a watchlist of companies, people, or topics

## Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai):

```bash theme={"system"}
export PARALLEL_API_KEY="PARALLEL_API_KEY"
```

***

## Step 1. Create a Task Run to establish a baseline

A snapshot monitor requires a completed Task Run as its starting point. The run's input, processor, and output schema become the template the monitor re-executes on each tick. Any Task Run works—free-form text outputs are diffed as a whole, while structured JSON outputs are diffed field-by-field for the most precise change detection.

The example below uses a **structured enrichment task** that extracts the executive team of a company. Structured outputs are recommended whenever you care about specific fields (prices, statuses, lists of entities) rather than narrative text:

```bash cURL theme={"system"}
curl --request POST \
  --url https://api.parallel.ai/v1/tasks/runs \
  --header 'Content-Type: application/json' \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "input": "Who are the current C-suite executives at Acme Corp (acme.com)?",
    "processor": "base",
    "output_schema": {
      "type": "json",
      "json_schema": {
        "type": "object",
        "properties": {
          "executives": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "title": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }'
```

**Response:**

```json theme={"system"}
{
  "run_id": "taskrun_a1b2c3d4e5f6",
  "status": "queued"
}
```

Wait for the run to complete (poll `GET /v1/tasks/runs/{run_id}` or use a webhook). Once `status` is `"completed"`, note the `run_id`—you'll use it in the next step.

See [Task API Quickstart](/task-api/examples/task-enrichment) for full details on creating and polling task runs.

## Step 2. Create a snapshot monitor

Create a snapshot monitor that re-runs the same task weekly and fires when the output changes:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request POST \
    --url https://api.parallel.ai/v1/monitors \
    --header 'Content-Type: application/json' \
    --header "x-api-key: $PARALLEL_API_KEY" \
    --data '{
      "type": "snapshot",
      "frequency": "1w",
      "processor": "lite",
      "settings": {
        "task_run_id": "taskrun_a1b2c3d4e5f6"
      },
      "webhook": {
        "url": "https://example.com/webhook",
        "event_types": ["monitor.event.detected"]
      },
      "metadata": { "external_id": "acme-snapshot-001" }
    }'
  ```

  ```python Python theme={"system"}
  import os
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  monitor = client.monitor.create(
      type="snapshot",
      frequency="1w",
      processor="lite",
      settings={"task_run_id": "taskrun_a1b2c3d4e5f6"},
      webhook={
          "url": "https://example.com/webhook",
          "event_types": ["monitor.event.detected"],
      },
      metadata={"external_id": "acme-snapshot-001"},
  )
  print(f"Monitor ID: {monitor.monitor_id}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const monitor = await client.monitor.create({
    type: "snapshot",
    frequency: "1w",
    processor: "lite",
    settings: { task_run_id: "taskrun_a1b2c3d4e5f6" },
    webhook: {
      url: "https://example.com/webhook",
      event_types: ["monitor.event.detected"],
    },
    metadata: { external_id: "acme-snapshot-001" },
  });

  console.log(`Monitor ID: ${monitor.monitor_id}`);
  ```
</CodeGroup>

**Response:**

```json theme={"system"}
{
  "monitor_id": "monitor_c3d4e5f6a1b2",
  "type": "snapshot",
  "status": "active",
  "frequency": "1w",
  "processor": "lite",
  "settings": {
    "task_run_id": "taskrun_a1b2c3d4e5f6"
  },
  "webhook": {
    "url": "https://example.com/webhook",
    "event_types": ["monitor.event.detected"]
  },
  "metadata": { "external_id": "acme-snapshot-001" },
  "created_at": "2025-04-23T20:21:48.037943Z"
}
```

## Step 3. Receive and retrieve events

When the monitor detects a material change, your webhook receives:

```json theme={"system"}
{
  "type": "monitor.event.detected",
  "timestamp": "2025-12-17T09:00:12.000000+00:00",
  "data": {
    "monitor_id": "monitor_c3d4e5f6a1b2",
    "event": {
      "event_group_id": "mevtgrp_9f8e7d6c5b4a3d2c1b0a"
    },
    "metadata": { "external_id": "acme-snapshot-001" }
  }
}
```

Fetch the events for that execution using the `event_group_id` as a query parameter:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request GET \
    --url "https://api.parallel.ai/v1/monitors/${MONITOR_ID}/events?event_group_id=${EVENT_GROUP_ID}" \
    --header "x-api-key: $PARALLEL_API_KEY"
  ```

  ```python Python theme={"system"}
  import os
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  result = client.monitor.events(
      monitor_id,
      event_group_id=event_group_id,
  )
  for event in result.events:
      print(event.changed_output.content)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const result = await client.monitor.events(monitorId, {
    event_group_id: eventGroupId,
  });
  for (const event of result.events) {
    console.log(event.changed_output?.content);
  }
  ```
</CodeGroup>

**Response:**

```json theme={"system"}
{
  "events": [
    {
      "event_id": "evt_9f8e7d6c5b4a",
      "event_group_id": "mevtgrp_9f8e7d6c5b4a3d2c1b0a",
      "event_date": "2025-12-17",
      "event_type": "snapshot",
      "changed_output": {
        "type": "json",
        "content": {
          "executives": [{ "name": "Jane Smith", "title": "CFO" }]
        },
        "basis": [
          {
            "field": "executives",
            "citations": [{ "url": "https://acme.com/press/leadership-update" }],
            "reasoning": "Official press release confirms the CFO transition from John Doe to Jane Smith.",
            "confidence": "high"
          }
        ]
      },
      "previous_output": {
        "type": "json",
        "content": {
          "executives": [{ "name": "John Doe", "title": "CFO" }]
        }
      }
    }
  ]
}
```

* `changed_output` contains only the fields that changed, each with `basis` (citations and reasoning).
* `previous_output` contains the full output from the prior run for comparison.

See [Research Basis](/task-api/guides/access-research-basis) for the full basis schema.

## Next Steps

* **[Event Stream Quickstart](./monitor-quickstart)**: Track new events as they appear on the web.
* **[Events](./monitor-events)**: Full event model and retrieval options.
* **[Follow-up Tasks](./monitor-task)**: Trigger structured enrichment or deep research from a monitor event.
* **[API Reference](/api-reference/monitor/create-monitor)**: Complete endpoint documentation.

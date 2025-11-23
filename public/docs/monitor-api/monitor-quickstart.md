# Monitor API Quickstart

> Get started with the Monitor API

The Monitor API lets you continuously track the web for material changes relevant to a query,
on a schedule you control. Create a monitor with a natural-language query, choose a cadence
(hourly, daily, weekly) and receive webhook notifications.

<Note>
  **Alpha Notice**: The Monitor API is currently in public alpha. Endpoints and
  request/response formats are subject to change. For production access, contact
  [support@parallel.ai](mailto:support@parallel.ai).
</Note>

## Features and Use Cases

The Monitor API can be used to automate continuous research for any topic, including companies, products, or regulatory areas— without building complicated web monitoring infrastructure. Define a query once along with the desired schedule, and the service will detect relevant changes and deliver concise updates (with source links) to your systems via webhooks.

* **News tracking**: Alert when there's notable news about a company or product you're interested in
* **Competitive monitoring**: Detect when competitors launch new features or pricing changes
* **Regulatory updates**: Track new rules or guidance impacting your industry
* **Deal/research watchlists**: Surface material events about entities you care about
* **Tracking products**: Track modifications to a product listing

Monitor currently supports the following features:

* **Scheduling**: Set update cadence to Hourly, Daily, or Weekly
* **Webhooks**: Receive updates when events are detected or when monitors finish a scheduled run
* **Events history**: Retrieve updates from recent runs or via a lookback window (e.g., `10d`)
* **Lifecycle management**: Update cadence, webhook, or metadata; delete to stop future runs

## Getting Started

### Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai).

```bash  theme={"system"}
export PARALLEL_API_KEY="PARALLEL_API_KEY"
```

### Step 1. Create Monitor

For example, create a monitor to get the latest news on AI

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request POST \
    --url https://api.parallel.ai/v1alpha/monitors \
    --header 'Content-Type: application/json' \
    --header "x-api-key: $PARALLEL_API_KEY" \
    --data '{
      "query": "Extract recent news about quantum in AI",
      "cadence": "daily",
      "webhook": {
        "url": "https://example.com/webhook",
        "event_types": ["monitor.event.detected"]
      },
      "metadata": { "key": "value" }
    }'
  ```

  ```python Python theme={"system"}
  from httpx import Response
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  res = client.post(
  "/v1alpha/monitors",
  cast_to=Response,
  body={
  "query": "Extract recent news about AI",
  "cadence": "daily",
  "webhook": {
  "url": "https://example.com/webhook",
  "event_types": ["monitor.event.detected"],
  },
  "metadata": {"key": "value"},
  },
  ).json()

  print(res["monitor_id"])

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY! });

  async function create_monitor() {
    const monitor = await client.post("/v1alpha/monitors", {
      body: {
        query: "Extract recent news about AI",
        cadence: "daily",
        webhook: {
          url: "https://example.com/webhook",
          event_types: ["monitor.event.detected"],
        },
        metadata: { key: "value" },
      },
    });
    console.log(monitor.monitor_id);
  }

  create_monitor();
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
  "query": "Extract recent news about AI",
  "status": "active",
  "cadence": "daily",
  "metadata": { "key": "value" },
  "webhook": {
    "url": "https://example.com/webhook",
    "event_types": ["monitor.event.detected"]
  },
  "created_at": "2025-04-23T20:21:48.037943Z"
}
```

### Step 2. Retrieve Events for an Event group

After you receive a webhook with an `event_group_id` (for a detected material change),
fetch the full set of related events for that group:

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request GET \
    --url "https://api.parallel.ai/v1alpha/monitors/<monitor_id>/event_groups/<event_group_id>" \
    --header "x-api-key: $PARALLEL_API_KEY"
  ```

  ```python Python theme={"system"}
  from httpx import Response
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  group = client.get(
  f"/v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}",
  cast_to=Response,
  ).json()

  print(group["events"])

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY! });

  async function getEventGroup(monitorId: string, eventGroupId: string) {
    const res = (await client.get(
      `/v1alpha/monitors/${monitorId}/event_groups/${eventGroupId}`
    )) as any;
    console.log(res.events);
  }

  getEventGroup();
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "events": [
    {
      "type": "event",
      "event_group_id": "mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24",
      "output": "New product launch announced",
      "event_date": "2025-01-15",
      "source_urls": ["https://example.com/news"]
    }
  ]
}
```

To learn about the full event model, alternative ways to access events
(including listing all events), and best practices, see the [Events](./monitor-events) page.

## Lifecycle

The Monitor API follows a straightforward lifecycle:

1. **Create**: Define your `query`, `cadence`, and optional `webhook` and `metadata`.
2. **Update**: Change cadence, webhook, or metadata.
3. **Delete**: Delete a monitor and stop future executions.

At any point, you can retrieve the list of events for a monitor or events within a specific
event group.

## Pricing

The Monitor API is charged at 3 USD per 1,000 runs. Each run is billed individually. For example, a Monitor with a `daily` cadence will incur a cost of 0.03 USD in 10 days.

## Best Practices

1. **Scope your query**: Clear queries with explicit instructions lead to higher-quality event detection.
2. **Choose the right cadence**: Use `hourly` for fast-moving topics, `daily` for most news,
   `weekly` for slower changes.
3. **Use webhooks**: Prefer webhooks to avoid unnecessary polling and reduce latency to updates.
4. **Manage lifecycle**: Cancel monitors you no longer need to reduce your usage bills.

## Next Steps

* **[Events](./monitor-events)**: Understand events, when they are emitted and how to access them.
* **[Webhooks](./monitor-webhooks)**: Information on setting up webhooks and listening for push notifications.
* **[API Reference](https://docs.parallel.ai/api-reference/monitor)**: Complete endpoint documentation

## Rate Limits

See [Rate Limits](/resources/rate-limits) for default quotas and how to request higher limits.

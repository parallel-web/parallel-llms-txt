> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor API Quickstart

> Track web changes continuously with scheduled queries and webhook notifications using the Monitor API

The Monitor API lets you continuously track the web for changes relevant to a query, on a schedule you control. Create a monitor with a natural-language query, choose a cadence (hourly, daily, weekly), and receive webhook notifications.

<Note>
  **Alpha Notice**: The Monitor API is currently in public alpha. Endpoints and
  request/response formats are subject to change.
</Note>

## Features and Use Cases

The Monitor API can be used to automate continuous research for any topic, including companies, products, or regulatory areas— without building complicated web monitoring infrastructure. Define a query once along with the desired schedule, and the service will detect relevant changes and deliver concise updates (with source links) to your systems via webhooks.

* **News tracking**: Alert when there's notable news about a company or product you're interested in
* **Competitive monitoring**: Detect when competitors launch new features or pricing changes
* **Regulatory updates**: Track new rules or guidance impacting your industry
* **Deal/research watchlists**: Surface events about entities you care about
* **Tracking products**: Track modifications to a product listing

Monitor currently supports the following features:

* **Scheduling**: Set update cadence to Hourly, Daily, or Weekly
* **Webhooks**: Receive updates when events are detected or when monitors finish a scheduled run
* **Events history**: Retrieve updates from recent runs or via a lookback window (e.g., `10d`)
* **Lifecycle management**: Update cadence, webhook, or metadata; delete to stop future runs

## Getting Started

### Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai). Then, set up with the Python SDK, TypeScript SDK, or cURL:

<CodeGroup>
  ```bash cURL theme={"system"}
  echo "Install curl and jq via brew, apt, or your favorite package manager"
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash Python theme={"system"}
  pip install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash TypeScript theme={"system"}
  npm install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```
</CodeGroup>

<Note>
  **Python SDK**: The Monitor API uses low-level `client.post()` and `client.get()` methods in Python because high-level convenience methods are not yet available. The examples below show this pattern.
</Note>

### Step 1. Create a monitor

Create a monitor that gathers daily AI news:

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
  import os
  from httpx import Response
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

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

  async function createMonitor() {
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

  createMonitor();
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

### Step 2. Detecting and retrieving events via webhooks

When a change is detected, your webhook receives:

```json  theme={"system"}
{
  "type": "monitor.event.detected",
  "timestamp": "2025-12-10T19:00:36.199543+00:00",
  "data": {
    "event": {
      "event_group_id": "mevtgrp_35ab7d16b00f412b9d6b6c0eff1f49733b5cf0b02056a29c"
    },
    "metadata": { "key": "value" },
    "monitor_id": "monitor_35ab7d16b00f412bbc4d6accbe0fdb41"
  }
}
```

* Use `data.event.event_group_id` with the GET endpoint in Step 2 to fetch the full events.
* `data.monitor_id` tells you which monitor fired.
* `data.metadata` echoes what you set at creation, so you can route the webhook (e.g., to a Slack thread or ticket).

After you receive a webhook with an `event_group_id` (for a detected change),
fetch the full set of related events for that group:

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request GET \
    --url "https://api.parallel.ai/v1alpha/monitors/${MONITOR_ID}/event_groups/${EVENT_GROUP_ID}" \
    --header "x-api-key: $PARALLEL_API_KEY"
  ```

  ```python Python theme={"system"}
  import os
  from httpx import Response
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  group = client.get(
      f"/v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}",
      cast_to=Response,
  ).json()

  print(group["events"])
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY! });

  async function getEventGroup(monitorId: string, eventGroupId: string) {
    const res = (await client.get(
      `/v1alpha/monitors/${monitorId}/event_groups/${eventGroupId}`
    )) as any;
    console.log(res.events);
  }

  getEventGroup("monitor_xxx", "mevtgrp_xxx");
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

<Note>
  See [Pricing](/getting-started/pricing) for a detailed schedule of rates.
</Note>

## Best Practices

1. **Scope your query**: Clear queries with explicit instructions lead to higher-quality event detection.
2. **Choose the right cadence**: Use `hourly` for fast-moving topics, `daily` for most news,
   `weekly` for slower changes.
3. **Use webhooks**: Prefer webhooks to avoid unnecessary polling and reduce latency to updates.
4. **Manage lifecycle**: Cancel monitors you no longer need to reduce your usage bills.

Monitor is a versatile, general-purpose tool for tracking the web. It works best when you write queries in natural language that declare your intent.

### Event Tracking

Use Monitor to track when something happens on the web:

| Use Case              | Example Query                                                       |
| --------------------- | ------------------------------------------------------------------- |
| Brand mentions        | "Let me know when someone mentions Parallel Web Systems on the web" |
| News tracking         | "What is the latest AI funding news?"                               |
| Product announcements | "Alert me when Apple announces new MacBook models"                  |
| Regulatory updates    | "Notify me of any new FDA guidance on AI in medical devices"        |

### Change Tracking

Use Monitor to detect when something changes:

| Use Case           | Example Query                                              |
| ------------------ | ---------------------------------------------------------- |
| Price monitoring   | "Let me know when the price for AirPods drops below \$150" |
| Stock availability | "Alert me when the PS5 Pro is back in stock at Best Buy"   |
| Content updates    | "Notify me when the React documentation is updated"        |
| Policy changes     | "Track changes to OpenAI's terms of service"               |

### Writing Effective Queries

Monitor works best with natural language queries that clearly describe what you're looking for.

| ❌ Bad Query                                                                             | ✅ Good Query                                                   |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| "Parallel OR Parallel Web Systems OR Parallel AI AND Funding OR Launch OR Announcement" | "Parallel Web Systems (parallel.ai) launch or funding updates" |

Unlike a search engine, the query doesn't need to be keyword-heavy—it needs to be intent-heavy.

**Don't use for historical research**: Monitor is designed to track *new* updates as they happen, not to retrieve past news. Use [Deep Research](/task-api/task-deep-research) for historical queries.

| ❌ Bad Query                                      | ✅ Good Query                       |
| ------------------------------------------------ | ---------------------------------- |
| "Find all AI funding news from the last 2 years" | "AI startup funding announcements" |

**Don't include dates**: Monitor automatically tracks updates from when it's created. Adding specific dates to your query is unnecessary and can cause confusion.

| ❌ Bad Query                          | ✅ Good Query                   |
| ------------------------------------ | ------------------------------ |
| "Tesla news after December 12, 2025" | "Tesla news and announcements" |

Natural language queries help Monitor understand the context and intent behind your request, leading to more relevant and accurate event detection.

## Next Steps

* **[Events](./monitor-events)**: Understand events, when they are emitted and how to access them.
* **[Webhooks](./monitor-webhooks)**: Information on setting up webhooks and listening for push notifications.
* **[API Reference](/api-reference/monitor/create-monitor)**: Complete endpoint documentation

## Rate Limits

See [Rate Limits](/getting-started/rate-limits) for default quotas and how to request higher limits.

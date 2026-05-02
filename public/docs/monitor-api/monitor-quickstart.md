> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor API Quickstart

> Continuously track web changes with scheduled queries and webhook notifications using the Monitor API

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

Define a query once and Monitor continuously watches the web for new, relevant updates—surfacing only what changed and delivering it to your systems via webhook. No cron jobs, no manual polling, no custom deduplication pipelines.

**Use cases:**

* **Finance and investing**: Fund activity, M\&A signals, earnings releases, new investment announcements
* **People and companies**: Executive changes, hiring signals, office openings, competitive product launches
* **Sciences**: Clinical trial updates, regulatory submissions, drug pipeline changes, research publications
* **Legal and policy**: Regulatory rule changes, enforcement actions, compliance updates across jurisdictions
* **eCommerce**: Pricing changes, stock availability, product listing updates
* **Real estate**: Listing changes, zoning updates, market reports

## Best Practices

1. **Scope your query**: Intent-heavy natural language outperforms keyword strings. Describe what you're looking for, not how to find it.
2. **Choose the right frequency**: `"1h"` for fast-moving topics, `"1d"` for most news and signals, `"1w"` for slower changes.
3. **Use webhooks**: Push delivery is lower latency than polling and requires no infrastructure to maintain.
4. **Cancel unused monitors**: Reduces usage costs.
5. **Don't use for historical research**: Monitor tracks new updates from the time of creation. Use [Deep Research](/task-api/examples/task-deep-research) for retrospective queries.

### Writing Effective Queries

| ❌ Avoid                                            | ✅ Prefer                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `"Parallel OR Parallel AI AND Funding OR Launch"`  | `"Parallel Web Systems (parallel.ai) funding or launch announcements"` |
| `"Find all AI funding news from the last 2 years"` | `"AI startup funding announcements"`                                   |
| `"Tesla news after December 12, 2025"`             | `"Tesla news and announcements"`                                       |

## Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai). Python and TypeScript SDKs are also available (`pip install parallel-web` / `npm install parallel-web`).

```bash theme={"system"}
export PARALLEL_API_KEY="PARALLEL_API_KEY"
```

***

## Event Stream Quickstart

### Step 1. Create a monitor

Create a monitor that tracks daily AI funding news:

```bash cURL theme={"system"}
curl --request POST \
  --url https://api.parallel.ai/v1/monitors \
  --header 'Content-Type: application/json' \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "type": "event_stream",
    "frequency": "1d",
    "processor": "lite",
    "settings": {
      "query": "AI startup funding announcements"
    },
    "webhook": {
      "url": "https://example.com/webhook",
      "event_types": ["monitor.event.detected"]
    },
    "metadata": { "external_id": "acme-monitor-001" }
  }'
```

**Response:**

```json theme={"system"}
{
  "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
  "type": "event_stream",
  "status": "active",
  "frequency": "1d",
  "processor": "lite",
  "settings": {
    "query": "AI startup funding announcements"
  },
  "webhook": {
    "url": "https://example.com/webhook",
    "event_types": ["monitor.event.detected"]
  },
  "metadata": { "external_id": "acme-monitor-001" },
  "created_at": "2025-04-23T20:21:48.037943Z"
}
```

The monitor runs once immediately at creation, then continues on the configured schedule.

### Step 2. Receive and retrieve events

When a change is detected, your webhook receives:

```json theme={"system"}
{
  "type": "monitor.event.detected",
  "timestamp": "2025-12-10T19:00:36.199543+00:00",
  "data": {
    "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
    "event": {
      "event_group_id": "mevtgrp_35ab7d16b00f412b9d6b6c0eff1f49733b5cf0b02056a29c"
    },
    "metadata": { "external_id": "acme-monitor-001" }
  }
}
```

* `data.event.event_group_id` identifies the execution to fetch.
* `data.monitor_id` identifies which monitor fired.
* `data.metadata` echoes what you set at creation, useful for routing to a downstream system.

Fetch the events for that execution:

```bash cURL theme={"system"}
curl --request GET \
  --url "https://api.parallel.ai/v1/monitors/${MONITOR_ID}/events?event_group_id=${EVENT_GROUP_ID}" \
  --header "x-api-key: $PARALLEL_API_KEY"
```

**Response:**

```json theme={"system"}
{
  "events": [
    {
      "event_id": "evt_a1b2c3d4e5f6",
      "event_group_id": "mevtgrp_35ab7d16b00f412b9d6b6c0eff1f49733b5cf0b02056a29c",
      "event_date": "2025-01-15",
      "event_type": "event_stream",
      "output": {
        "type": "text",
        "content": "Acme AI raised a $50M Series B led by Example Ventures.",
        "basis": [
          {
            "field": "output",
            "citations": [{ "url": "https://techcrunch.com/2025/01/15/acme-ai-series-b" }],
            "reasoning": "TechCrunch article confirms the round size and lead investor.",
            "confidence": "high"
          }
        ]
      }
    }
  ]
}
```

<Note>
  Each event includes a `basis` field with citations, reasoning, and a confidence level—the same transparency available in Task API outputs. See [Research Basis](/task-api/guides/access-research-basis) for details.
</Note>

See the [Events](./monitor-events) page for the full event model and how to list all events across executions.

### Advanced Settings

Two retrieval controls are available via `advanced_settings` inside `settings`:

| Setting       | Field           | Description                                                                                                                                                                              |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source policy | `source_policy` | Restrict or prioritize specific domains. Useful when signal validity depends on source authority (e.g., SEC filings, government portals). See [Source Policy](/resources/source-policy). |
| Geo           | `location`      | Scope retrieval to a country (ISO 3166-1 alpha-2, e.g., `"DE"`). Surfaces regional sources.                                                                                              |

```json theme={"system"}
"settings": {
  "query": "AI startup funding announcements",
  "advanced_settings": {
    "source_policy": {
      "include_domains": ["techcrunch.com", "bloomberg.com"]
    },
    "location": "US"
  }
}
```

## Lifecycle

1. **Create**: Define `type`, `frequency`, `processor`, `settings`, and optional `webhook` and `metadata`.
2. **Update**: Change frequency, webhook, or metadata at any time.
3. **Cancel**: Cancel a monitor to stop future executions.

## Next Steps

* **[Snapshot Quickstart](./quickstart-snapshot)**: Monitor structured task outputs for material changes.
* **[Events](./monitor-events)**: Full event model, event types, and retrieval options.
* **[Webhooks](./monitor-webhooks)**: Webhook setup, payloads, and verification.
* **[Follow-up Tasks](./monitor-task)**: Trigger Task API enrichment or deep research from a monitor event.
* **[Pricing](/getting-started/pricing)**: Processor tiers and rate schedule.
* **[API Reference](/api-reference/monitor/create-monitor)**: Complete endpoint documentation.

## Rate Limits

See [Rate Limits](/getting-started/rate-limits) for default quotas and how to request higher limits.

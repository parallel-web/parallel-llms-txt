> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming Events

> Receive real-time updates on FindAll runs using Server-Sent Events (SSE)

## Overview

The `/v1beta/findall/runs/{findall_id}/events` endpoint provides real-time updates on candidates as they are discovered and evaluated using Server-Sent Events (SSE). Events are delivered in chronological order, each including `event_id`, `timestamp`, `type`, and `data`.

**Resumability**: Use `last_event_id` query parameter to resume from any point after disconnections. The `last_event_id` is included in each event and in the `/result` endpoint response—if null, the stream starts from the beginning.

**Duration**: Streams remain open while the run is active or until an optional `timeout` (seconds) is reached. A `findall.status` heartbeat is sent every 10 seconds to keep connections alive.

## Accessing the Event Stream

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -N -X GET "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f/events" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -H "Accept: text/event-stream" \
    -H "parallel-beta: findall-2025-09-15"
  ```

  ```python Python theme={"system"}
  import requests
  from sseclient import SSEClient

  base_url = "https://api.parallel.ai"
  findall_id = "findall_40e0ab8c10754be0b7a16477abb38a2f"
  headers = {
      "x-api-key": "${PARALLEL_API_KEY}",
      "Accept": "text/event-stream",
      "parallel-beta": "findall-2025-09-15"
  }

  events_url = f"{base_url}/v1beta/findall/runs/{findall_id}/events"

  print(f"Streaming events for FindAll run {findall_id}:")

  try:
      response = requests.get(events_url, headers=headers, stream=True, timeout=None)
      response.raise_for_status()
      client = SSEClient(response.iter_content())
      for event in client.events():
          if event.data.strip():
              print(f"Event [{event.event}]: {event.data}")
  except Exception as e:
      print(f"Streaming error: {e}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const findallId = "findall_40e0ab8c10754be0b7a16477abb38a2f";

  console.log(`Streaming events for FindAll run ${findallId}:`);

  const stream = await client.beta.findall.events(findallId, {
    // last_event_id: "some_previous_event_id",
    // timeout: 30.0,
  });

  for await (const event of stream) {
    // Events are already parsed JSON objects
    if ('type' in event) {
      console.log(`Event [${event.type}]: ${JSON.stringify(event)}`);
    }
  }
  ```
</CodeGroup>

## Event Types

The SSE endpoint emits the following event types:

| Event Type                    | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `findall.status`              | Heartbeat of FindAllRun object every 10 seconds, or when FindAll status changes |
| `findall.candidate.generated` | Emitted when a new candidate is discovered, before evaluation                   |
| `findall.candidate.matched`   | Emitted when a candidate successfully matches all match conditions              |
| `findall.candidate.unmatched` | Emitted when a candidate fails to match all conditions                          |
| `findall.candidate.enriched`  | Emitted when enrichment data has been extracted for a candidate                 |

<Note>
  For a complete guide to candidate object structure, states, and fields, see [Candidates](/findall-api/core-concepts/findall-candidates).
</Note>

## Event Payloads

**findall.status** — Heartbeat of FindAllRun object every 10 seconds, or when FindAll status changes.

```json  theme={"system"}
{
  "type": "findall.status",
  "timestamp":"2025-11-04T18:45:43.223633Z",
  "event_id": "641eebfb0d81f",
  "data": {
    "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
    "status": {
      "status": "running",
      "is_active": true,
      "metrics": {
        "generated_candidates_count": 4,
        "matched_candidates_count": 0
      },
      "termination_reason": null
    }
  }
}
```

**findall.candidate.\*** — Emitted as candidates are generated and evaluated:

<CodeGroup>
  ```json findall.candidate.generated [expandable] theme={"system"}
  {
    "type": "findall.candidate.generated",
    "timestamp":"2025-11-04T18:46:52.952095Z",
    "event_id": "641eebe8d11af",
    "data": {
      "candidate_id": "candidate_a062dd17-d77a-4b1b-ad0e-de113e82f838",
      "name": "Adept AI",
      "url": "https://adept.ai",
      "description": "Adept AI is a company founded in 2021...",
      "match_status": "generated",
      "output": null,
      "basis": null
    }
  }
  ```

  ```json findall.candidate.matched [expandable] theme={"system"}
  {
    "type": "findall.candidate.matched",
    "timestamp":"2025-11-04T18:48:22.366975Z",
    "event_id": "641eec0cb2ccf",
    "data": {
      "candidate_id": "candidate_ae13884c-dc93-4c62-81f2-1308a98e2621",
      "name": "Traba",
      "url": "https://traba.work/",
      "description": "Traba is a company founded in 2021...",
      "match_status": "matched",
      "output": {
        "founded_after_2020_check": {
          "value": "2021",
          "type": "match_condition",
          "is_matched": true
        }
      },
      "basis": [
        {
          "field": "founded_after_2020_check",
          "citations": [
            {
              "title": "Report: Traba Business Breakdown & Founding Story",
              "url": "https://research.contrary.com/company/traba",
              "excerpts": ["Traba, a labor marketplace founded in 2021..."]
            }
          ],
          "reasoning": "Multiple sources state that Traba was founded in 2021...",
          "confidence": "high"
        }
      ]
    }
  }
  ```

  ```json findall.candidate.unmatched [expandable] theme={"system"}
  {
    "type": "findall.candidate.unmatched",
    "timestamp":"2025-11-04T18:48:30.341999Z",
    "event_id": "641eebefb327f",
    "data": {
      "candidate_id": "candidate_76489c89-956e-4b5d-8784-e84a0abf3cbe",
      "name": "Twelve",
      "url": "https://www.capitaly.vc/blog/khosla-ventures-investment...",
      "description": "Twelve is a company that Khosla Ventures has invested in...",
      "match_status": "unmatched",
      "output": {
        "founded_after_2020_check": {
          "value": "2015",
          "type": "match_condition",
          "is_matched": false
        }
      },
      "basis": [
        {
          "field": "founded_after_2020_check",
          "citations": [...],
          "reasoning": "The search results consistently indicate that Twelve was founded in 2015...",
          "confidence": "high"
        }
      ]
    }
  }
  ```

  ```json findall.candidate.enriched [expandable] theme={"system"}
  {
    "type": "findall.candidate.enriched",
    "timestamp": "2025-11-04T18:49:14.474959Z",
    "event_id": "642c949cfbdcf",
    "data": {
      "candidate_id": "candidate_5e30951e-435f-4785-b253-4b29f85ded9d",
      "name": "Liquid AI",
      "url": "https://www.liquid.ai/",
      "description": "Liquid AI is an AI company that raised $250 million in a Series A funding round...",
      "match_status": "matched",
      "output": {
        "ceo_name": {
          "value": "Ramin Hasani",
          "type": "enrichment"
        },
        "cto_name": {
          "value": "Mathias Lechner",
          "type": "enrichment"
        }
      },
      "basis": [
        {
          "field": "ceo_name",
          "citations": [
            {
              "title": "Ramin Hasani",
              "url": "https://www.liquid.ai/team/ramin-hasani",
              "excerpts": ["Ramin Hasani is the Co-founder and CEO of Liquid AI..."]
            }
          ],
          "reasoning": "The search results consistently identify Ramin Hasani as the CEO of Liquid AI...",
          "confidence": "high"
        },
        {
          "field": "cto_name",
          "citations": [
            {
              "title": "Mathias Lechner",
              "url": "https://www.liquid.ai/team/mathias-lechner",
              "excerpts": ["Mathias Lechner", "Co-founder & CTO"]
            }
          ],
          "reasoning": "The search results consistently identify Mathias Lechner as the CTO of Liquid AI...",
          "confidence": "high"
        }
      ]
    }
  }
  ```

  ```json findall.schema.updated [expandable] theme={"system"}
  {
    "type": "findall.schema.updated",
    "timestamp": "2025-11-04T18:50:00.123456Z",
    "event_id": "642c94a12bcde",
    "data": {
      "enrichments": [],
      "generator": "core",
      "match_limit": 60,
      "entity_type": "companies",
      "objective": "Find all portfolio companies of Khosla Ventures",
      "match_conditions": [
        {
          "name": "khosla_ventures_portfolio_check",
          "description": "Company must be a portfolio company of Khosla Ventures."
        }
      ]
    }
  }
  ```
</CodeGroup>

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](/api-reference/findall-api-beta/stream-findall-events)**: Complete endpoint documentation

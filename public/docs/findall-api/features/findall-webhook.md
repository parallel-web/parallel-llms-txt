> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhooks

> Receive real-time notifications on FindAll runs and candidates using webhooks

<Note>
  **Prerequisites:** Before implementing FindAll webhooks, read **[Webhook Setup & Verification](/resources/webhook-setup)** for critical information on:

  * Recording your webhook secret
  * Verifying HMAC signatures
  * Security best practices
  * Retry policies

  This guide focuses on FindAll-specific webhook events and payloads.
</Note>

## Overview

Webhooks allow you to receive real-time notifications when candidates are discovered, evaluated, or when your FindAll runs complete, eliminating the need for constant polling—especially useful for long-running FindAll operations that may process many candidates over time.

## Setup

To register a webhook for a FindAll run, include a `webhook` parameter in your FindAll run creation request:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request POST \
    --url https://api.parallel.ai/v1beta/findall/runs \
    --header "Content-Type: application/json" \
    --header "x-api-key: $PARALLEL_API_KEY" \
    --header "parallel-beta: findall-2025-09-15" \
    --data '{
      "objective": "Find all portfolio companies of Khosla Ventures",
      "entity_type": "companies",
      "match_conditions": [
        {
          "name": "khosla_ventures_portfolio_check",
          "description": "Company must be a portfolio company of Khosla Ventures."
        }
      ],
      "generator": "core",
      "match_limit": 100,
      "webhook": {
        "url": "https://your-domain.com/webhooks/findall",
        "event_types": [
          "findall.candidate.generated",
          "findall.candidate.matched",
          "findall.candidate.unmatched",
          "findall.candidate.enriched",
          "findall.run.completed",
          "findall.run.cancelled",
          "findall.run.failed"
        ]
      }
    }
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  findall_run = client.beta.findall.create(
      objective="Find all portfolio companies of Khosla Ventures",
      entity_type="companies",
      match_conditions=[
          {
              "name": "khosla_ventures_portfolio_check",
              "description": "Company must be a portfolio company of Khosla Ventures."
          }
      ],
      generator="core",
      match_limit=100,
      webhook={
          "url": "https://your-domain.com/webhooks/findall",
          "event_types": [
              "findall.candidate.generated",
              "findall.candidate.matched",
              "findall.candidate.unmatched",
              "findall.candidate.enriched",
              "findall.run.completed",
              "findall.run.cancelled",
              "findall.run.failed"
          ]
      }
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const run = await client.beta.findall.create({
    objective: "Find all portfolio companies of Khosla Ventures",
    entity_type: "companies",
    match_conditions: [
      {
        name: "khosla_ventures_portfolio_check",
        description: "Company must be a portfolio company of Khosla Ventures."
      }
    ],
    generator: "core",
    match_limit: 100,
    webhook: {
      url: "https://your-domain.com/webhooks/findall",
      event_types: [
        "findall.candidate.generated",
        "findall.candidate.matched",
        "findall.candidate.unmatched",
        "findall.candidate.enriched",
        "findall.run.completed",
        "findall.run.cancelled",
        "findall.run.failed"
      ]
    }
  });
  ```
</CodeGroup>

### Webhook Parameters

| Parameter     | Type           | Required | Description                                                  |
| ------------- | -------------- | -------- | ------------------------------------------------------------ |
| `url`         | string         | Yes      | Your webhook endpoint URL. Can be any domain.                |
| `event_types` | array\[string] | Yes      | Array of event types to subscribe to. See Event Types below. |

## Event Types

FindAll supports the following webhook event types:

| Event Type                    | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `findall.candidate.generated` | Emitted when a new candidate is generated and queued for evaluation |
| `findall.candidate.matched`   | Emitted when a candidate successfully matches all match conditions  |
| `findall.candidate.unmatched` | Emitted when a candidate fails to match all conditions              |
| `findall.candidate.enriched`  | Emitted when enrichment data has been extracted for a candidate     |
| `findall.run.completed`       | Emitted when a FindAll run completes successfully                   |
| `findall.run.cancelled`       | Emitted when a FindAll run is cancelled                             |
| `findall.run.failed`          | Emitted when a FindAll run fails due to an error                    |

You can subscribe to any combination of these event types in your webhook configuration.

<Note>
  For a complete guide to candidate object structure, states, and fields, see [Candidates](/findall-api/core-concepts/findall-candidates).
</Note>

## Webhook Payload Structure

Each webhook payload contains:

* `timestamp`: ISO 8601 timestamp of when the event occurred
* `type`: Event type
* `data`: Event-specific payload (FindAll Candidate or Run object)

### Candidate Events

<CodeGroup>
  ```json findall.candidate.generated theme={"system"}
  {
    "type": "findall.candidate.generated",
    "timestamp": "2025-10-27T14:56:05.619331Z",
    "data": {
      "candidate_id": "candidate_2edf2301-f80d-46b9-b17a-7b4a9d577296",
      "name": "Anthropic",
      "url": "https://www.anthropic.com/",
      "description": "Anthropic is an AI safety and research company founded in 2021...",
      "match_status": "generated",
      "output": null,
      "basis": null
    }
  }
  ```

  ```json findall.candidate.matched theme={"system"}
  {
    "type": "findall.candidate.matched",
    "timestamp": "2025-10-27T14:57:15.421087Z",
    "data": {
      "candidate_id": "candidate_478fb5ca-4581-4411-9acb-6b78b4cb5bcf",
      "name": "Vivodyne",
      "url": "https://vivodyne.com/",
      "description": "Vivodyne is a biotechnology company...",
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
              "title": "Vivodyne - Crunchbase Company Profile & Funding",
              "url": "https://www.crunchbase.com/organization/vivodyne",
              "excerpts": ["Founded in 2021"]
            }
          ],
          "reasoning": "Multiple sources indicate that Vivodyne was founded in 2021...",
          "confidence": "high"
        }
      ]
    }
  }
  ```

  ```json findall.candidate.unmatched theme={"system"}
  {
    "type": "findall.candidate.unmatched",
    "timestamp": "2025-10-27T14:57:20.521203Z",
    "data": {
      "candidate_id": "candidate_abc123-def456-789",
      "name": "Example Company",
      "url": "https://example.com/",
      "description": "Example Company description...",
      "match_status": "unmatched",
      "output": {
        "founded_after_2020_check": {
          "value": "2018",
          "type": "match_condition",
          "is_matched": false
        }
      },
      "basis": [
        {
          "field": "founded_after_2020_check",
          "citations": [...],
          "reasoning": "The company was founded in 2018, which is before 2020...",
          "confidence": "high"
        }
      ]
    }
  }
  ```
</CodeGroup>

### Run Events

<CodeGroup>
  ```json findall.run.completed theme={"system"}
  {
    "type": "findall.run.completed",
    "timestamp": "2025-10-27T14:58:39.421087Z",
    "data": {
      "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
      "status": {
        "status": "completed",
        "is_active": false,
        "metrics": {
          "generated_candidates_count": 5,
          "matched_candidates_count": 1
        },
        "termination_reason": "match_limit_met"
      },
      "generator": "core",
      "metadata": {},
      "created_at": "2025-10-27T14:56:05.619331Z",
      "modified_at": "2025-10-27T14:58:39.421087Z"
    }
  }
  ```

  ```json findall.run.cancelled theme={"system"}
  {
    "type": "findall.run.cancelled",
    "timestamp": "2025-10-27T14:57:00.123456Z",
    "data": {
      "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
      "status": {
        "status": "cancelled",
        "is_active": false,
        "metrics": {
          "generated_candidates_count": 3,
          "matched_candidates_count": 0
        },
        "termination_reason": "user_cancelled"
      },
      "generator": "core",
      "metadata": {},
      "created_at": "2025-10-27T14:56:05.619331Z",
      "modified_at": "2025-10-27T14:57:00.123456Z"
    }
  }
  ```

  ```json findall.run.failed theme={"system"}
  {
    "type": "findall.run.failed",
    "timestamp": "2025-10-27T14:57:30.789012Z",
    "data": {
      "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
      "status": {
        "status": "failed",
        "is_active": false,
        "metrics": {
          "generated_candidates_count": 2,
          "matched_candidates_count": 0
        },
        "termination_reason": "error_occurred"
      },
      "generator": "core",
      "metadata": {},
      "created_at": "2025-10-27T14:56:05.619331Z",
      "modified_at": "2025-10-27T14:57:30.789012Z"
    }
  }
  ```
</CodeGroup>

## Security & Verification

For information on HMAC signature verification, including code examples in multiple languages, see the [Webhook Setup Guide - Security & Verification](/resources/webhook-setup#security--verification) section.

## Retry Policy

See the [Webhook Setup Guide - Retry Policy](/resources/webhook-setup#retry-policy) for details on webhook delivery retry configuration.

## Best Practices

For webhook implementation best practices, including signature verification, handling duplicates, and async processing, see the [Webhook Setup Guide - Best Practices](/resources/webhook-setup#best-practices) section.

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](/api-reference/findall-api-beta/create-findall-run#body-webhook)**: Complete endpoint documentation

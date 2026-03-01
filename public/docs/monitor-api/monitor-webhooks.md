> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhooks

> Receive real-time notifications for Monitor executions and detected events using webhooks

<Note>
  **Prerequisites:** Before implementing Monitor webhooks, read **[Webhook Setup & Verification](/resources/webhook-setup)** for critical information on:

  * Recording your webhook secret
  * Verifying HMAC signatures
  * Security best practices
  * Retry policies

  This guide focuses on Monitor-specific webhook events and payloads.
</Note>

## Overview

Webhooks allow you to receive real-time notifications when a Monitor execution completes, fails, or
when material events are detected, eliminating the need for polling.
This is especially useful for scheduled monitors that run at long gaps (hourly, daily, or weekly) and notify
your systems only when relevant changes occur.

## Setup

To register a webhook for a Monitor, include a `webhook` parameter when creating the monitor:

```bash  theme={"system"}
curl --request POST \
  --url https://api.parallel.ai/v1alpha/monitors \
  --header "Content-Type: application/json" \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "query": "Extract recent news about AI",
    "cadence": "daily",
    "webhook": {
      "url": "https://your-domain.com/webhooks/monitor",
      "event_types": [
        "monitor.event.detected",
        "monitor.execution.completed",
        "monitor.execution.failed"
      ]
    },
    "metadata": { "team": "research" }
  }'
```

### Webhook Parameters

| Parameter     | Type           | Required | Description                                               |
| ------------- | -------------- | -------- | --------------------------------------------------------- |
| `url`         | string         | Yes      | Your webhook endpoint URL. Can be any domain you control. |
| `event_types` | array\[string] | Yes      | Event types to subscribe to. See Event Types below.       |

## Event Types

Monitors support the following webhook event types:

| Event Type                    | Description                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `monitor.event.detected`      | Emitted when a run detects one or more material events.                      |
| `monitor.execution.completed` | Emitted when a Monitor run completes successfully (without detected events). |
| `monitor.execution.failed`    | Emitted when a Monitor run fails due to an error.                            |

You can subscribe to any combination of these event types in your webhook configuration.
Note that `monitor.event.detected` and `monitor.execution.completed` are mutually distinct and correspond to different
runs.

## Webhook Payload Structure

For Monitor webhooks, the `data` object contains:

* `monitor_id`: The unique ID of the Monitor
* `event`: The event record for this run.
* `metadata`: User-provided metadata from the Monitor (if any)

<CodeGroup>
  ```json monitor.event.detected theme={"system"}
  {
    "type": "monitor.event.detected",
    "timestamp": "2025-10-27T14:56:05.619331Z",
    "data": {
      "monitor_id": "monitor_0c9d7f7d5a7841a0b6c269b2b9b1e6aa",
      "event": {
        "event_group_id": "mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24"
      },
      "metadata": { "team": "research" }
    }
  }
  ```

  ```json monitor.execution.completed theme={"system"}
  {
    "type": "monitor.execution.completed",
    "timestamp": "2025-10-27T14:56:05.619331Z",
    "data": {
      "monitor_id": "monitor_0c9d7f7d5a7841a0b6c269b2b9b1e6aa",
      "event": {
        "type": "completion",
        "monitor_ts": "completed_2025-01-15T10:30:00Z"
      },
      "metadata": { "team": "research" }
    }
  }
  ```

  ```json monitor.execution.failed theme={"system"}
  {
    "type": "monitor.execution.failed",
    "timestamp": "2025-10-27T14:57:30.789012Z",
    "data": {
      "monitor_id": "monitor_0c9d7f7d5a7841a0b6c269b2b9b1e6aa",
      "event": {
        "type": "error",
        "error": "Error occurred while processing the event",
        "id": "error_2025-01-15T10:30:00Z",
        "date": "2025-01-15T10:30:00Z"
      },
      "metadata": { "team": "research" }
    }
  }
  ```
</CodeGroup>

## Security & Verification

For HMAC signature verification and language-specific examples, see the **[Webhook Setup Guide - Security & Verification](/resources/webhook-setup#security--verification)**.

## Retry Policy

See **[Webhook Setup Guide - Retry Policy](/resources/webhook-setup#retry-policy)** for delivery retries and backoff details.

## Best Practices

* **Scope your query**: Clear, explicit instructions lead to higher-quality event detection.
* **Choose the right cadence**: Use `hourly` for fast-moving topics, `daily` for most news, `weekly` for slower changes.
* **Use webhooks**: Prefer webhooks to avoid unnecessary polling and reduce latency.
* **Manage lifecycle**: Cancel monitors you no longer need to reduce usage.

## Related Topics

* **[Quickstart](/monitor-api/monitor-quickstart)**: Create, retrieve, update, and delete monitors
* **[Status and Errors](/resources/status)**: Status codes and error semantics
* **\[API Reference]**: See `POST /v1alpha/monitors` with `webhook` in request body

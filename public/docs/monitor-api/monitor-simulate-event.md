> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Simulate Event

> Test your webhook integration by simulating monitor events

The simulate event endpoint allows you to test your webhook integration without waiting for a scheduled monitor run.

## Endpoint

```
POST /v1alpha/monitors/{monitor_id}/simulate_event
```

### Query Parameters

| Parameter    | Type   | Default                  | Description                                                                                                         |
| ------------ | ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `event_type` | string | `monitor.event.detected` | Event type to simulate. One of: `monitor.event.detected`, `monitor.execution.completed`, `monitor.execution.failed` |

### Response

Returns `204 No Content` on success.

### Errors

| Status | Description                             |
| ------ | --------------------------------------- |
| 400    | Webhook not configured for this monitor |
| 404    | Monitor not found                       |

## Usage

```bash  theme={"system"}
curl --request POST \
  --url "https://api.parallel.ai/v1alpha/monitors/<monitor_id>/simulate_event?event_type=monitor.event.detected" \
  --header "x-api-key: $PARALLEL_API_KEY"
```

## Test Event Groups

When you simulate a `monitor.event.detected` event, the webhook payload includes a test `event_group_id`. You can retrieve this test event group using the standard endpoint:

```
GET /v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}
```

Test event group IDs return dummy event data, allowing you to verify your full webhook processing pipeline—from receiving the webhook to fetching event details.

```bash  theme={"system"}
curl --request GET \
  --url "https://api.parallel.ai/v1alpha/monitors/<monitor_id>/event_groups/<test_event_group_id>" \
  --header "x-api-key: $PARALLEL_API_KEY"
```

**Response:**

<CodeGroup>
  ```json No Structured Output theme={"system"}
  {
      "events": [
          {
              "type": "event",
              "event_group_id": "test_abc",
              "output": "",
              "event_date": "2025-12-05",
              "source_urls": [
                  "https://test.example.com"
              ],
              "result": {
                  "type": "text",
                  "content": "This is a test event."
              }
          }
      ]
  }
  ```

  ```json Structured Output theme={"system"}
  {
      "events": [
          {
              "type": "event",
              "event_group_id": "test_def",
              "output": "",
              "event_date": "2025-12-05",
              "source_urls": [
                  "https://test.example.com"
              ],
              "result": {
                  "type": "json",
                  "content": {
                      "sentiment": "",
                      "stock_ticker_symbol": "",
                      "description": ""
                  }
              }
          }
      ]
  }
  ```
</CodeGroup>

## Related Topics

* **[Webhooks](/monitor-api/monitor-webhooks)**: Configure webhooks and understand event payloads
* **[Events](/monitor-api/monitor-events)**: Event types and event groups

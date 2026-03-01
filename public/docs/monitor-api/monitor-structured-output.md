# Structured Output

> Return monitor events as structured JSON objects

Structured output enables you to define a JSON schema for monitor events. Each detected event conforms to the specified schema, returning data in a consistent, machine-readable format suitable for downstream processing in databases, analytics pipelines, or automation workflows.

<Note>
  **Schema Complexity**: Output schemas are currently limited to the complexity supported by the core processor. Use flat schemas with a small number of clearly defined fields.
</Note>

## Defining an Output Schema

Include an [`output_schema`](https://docs.parallel.ai/api-reference/monitor/create-monitor#body-output-schema-one-of-0) field when creating a monitor:

```bash  theme={"system"}
curl --request POST \
  --url https://api.parallel.ai/v1alpha/monitors \
  --header 'Content-Type: application/json' \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "query": "monitor ai news",
    "cadence": "daily",
    "output_schema": {
      "type": "json",
      "json_schema": {
        "type": "object",
        "properties": {
          "company_name": {
            "type": "string",
            "description": "Name of the company the news is about, NA if not company-specific"
          },
          "sentiment": {
            "type": "string",
            "description": "Sentiment of the news: positive or negative"
          },
          "description": {
            "type": "string",
            "description": "Brief description of the news"
          }
        }
      }
    }
  }'
```

**Response:**

```json  theme={"system"}
{
  "monitor_id": "monitor_da7460cdc958453ea092ce6bbbd7fd4b",
  "query": "monitor ai news",
  "status": "active",
  "cadence": "daily",
  "created_at": "2025-12-03T17:49:54.077782Z"
}
```

## Retrieving Structured Events

Events from monitors configured with structured output include a `result` field containing the parsed JSON object:

```bash  theme={"system"}
curl --request GET \
  --url "https://api.parallel.ai/v1alpha/monitors/<monitor_id>/events" \
  --header "x-api-key: $PARALLEL_API_KEY"
```

**Response:**

```json  theme={"system"}
{
  "events": [
    {
      "type": "event",
      "event_group_id": "mevtgrp_f9727e22dd4a42ba5e7fdcaa36b2b8ea2ef7c11f15fb4061",
      "event_date": "2025-12-02",
      "source_urls": [
        "https://www.cnbc.com/2025/12/02/youtube-ai-biometric-data-creator-deepfake.html"
      ],
      "result": {
        "type": "json",
        "content": {
          "company_name": "YouTube/Google",
          "sentiment": "negative",
          "description": "YouTube expanded a likeness detection deepfake tracking tool; experts warn the sign-up requires government ID and a biometric video."
        }
      }
    },
    {
      "type": "event",
      "event_group_id": "mevtgrp_f9727e22dd4a42ba5e7fdcaa36b2b8ea2ef7c11f15fb4061",
      "event_date": "2025-12-02",
      "source_urls": [
        "https://fox59.com/business/press-releases/globenewswire/9595236/kloudfuse-launches-kloudfuse-3-5"
      ],
      "result": {
        "type": "json",
        "content": {
          "company_name": "Kloudfuse",
          "sentiment": "positive",
          "description": "Kloudfuse announced version 3.5 with AI-native observability features including LLM observability integrated into APM."
        }
      }
    }
  ]
}
```

## Best Practices

* **Include property descriptions**: Provide clear `description` fields for each property to improve extraction accuracy
* **Use primitive types**: Limit properties to `string` and `enum` types for reliable parsing
* **Maintain flat schemas**: Use 3–5 properties with a single-level object structure
* **Define edge case handling**: Specify how missing or inapplicable values should be represented

## Related Topics

* **[Quickstart](/monitor-api/monitor-quickstart)**: Monitor API setup and configuration
* **[Events](/monitor-api/monitor-events)**: Event model and event groups
* **[Webhooks](/monitor-api/monitor-webhooks)**: Real-time notification delivery


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.parallel.ai/llms.txt
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Vertex AI

> Use Parallel with Google Vertex AI

The Parallel Search API is available in Google Vertex AI as an external grounding provider. Use it to ground Gemini model responses with up‑to‑date context from the public web.

Read Vertex AI's official documentation [here](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-parallel).

## Use cases

* Using web data for information completion or enrichment.
* Multi-hop agents that require deeper web searches for complex questions.
* Building APIs that integrate web search data.
* Employee-facing assistants for up-to-date analysis and reporting.
* Consumer apps (retail, travel) supporting informed purchase decisions.
* Automated agents (e.g., news analysis, KYC checks).
* Vertical agents (sales, coding, finance) fetching the latest context from the web.

## Example

Who won the 2025 Las Vegas F1 Grand Prix?

| Without Grounding                                                                                                                                                           | With Grounding                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The 2025 Las Vegas Grand Prix has not happened yet. The race is scheduled to take place on the weekend of November 20-22, 2025. Therefore, the winner is currently unknown. | The winner of the 2025 Las Vegas F1 Grand Prix was Max Verstappen of Red Bull Racing. The race took place on November 22, 2025. Sources: domain1.com, domain2.com, ... |

## Supported models

The following models support Grounding with Parallel web search:

* Gemini 3 Flash preview
* Gemini 3 Pro preview
* Gemini 3 Pro Image preview
* Gemini 2.5 Pro
* Gemini 2.5 Flash preview
* Gemini 2.5 Flash-Lite preview
* Gemini 2.5 Flash
* Gemini 2.5 Flash-Lite
* Gemini 2.5 Flash with Gemini Live API native audio
* Gemini 2.5 Flash with Live API native audio (Preview) preview
* Gemini 2.0 Flash with Live API preview
* Gemini 2.0 Flash

## Before you begin

Get a Parallel API key from [Platform](https://platform.parallel.ai). This API key is used in your request to Gemini.

## Ground Gemini responses with Parallel Search

Request grounded responses from Gemini using the REST API. For best performance, use default settings for optional parameters unless you strictly require non‑default values. For guidance on crafting objectives, queries, and modes, see [Search API Best Practices](/search/best-practices).

Set up an HTTP method and URL with the following fields:

* `LOCATION`: The region to process the request. To use the global endpoint, exclude the location from the endpoint name and configure the resource location to `global`.
* `PROJECT_ID`: Your Google Cloud project ID.
* `MODEL_ID`: The ID of the Gemini model to use.

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Create your Gemini request JSON body with a grounding call to Parallel Search:

```json  theme={"system"}
{
  "contents": [{
    "role": "user",
    "parts": [{
      "text": "MODEL_PROMPT_TEXT"
    }]
  }],
  "tools": [{
    "parallelAiSearch": {
      "api_key": "PARALLEL_API_KEY",
      "customConfigs": {
        "source_policy": {
          "exclude_domains": ["EXCLUDE_DOMAINS"],
          "include_domains": ["INCLUDE_DOMAINS"]
        },
        "excerpts": {
          "max_chars_per_result": MAX_CHARS_PER_RESULT,
          "max_chars_total": MAX_CHARS_TOTAL
        },
        "max_results": MAX_RESULTS
      }
    }
  }],
  "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}
```

Execute your request:

```bash  theme={"system"}
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

You should receive a JSON response with the model's grounded output and associated metadata.

<Tip>
  For a complete working example, see the [Vertex AI demo](https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/vertex_ai_demo) in the Parallel Cookbook.
</Tip>

## Quota

The default quota is 60 prompts per minute. If you need higher rate limits, contact `support@parallel.ai` and your Google account team with your use case and requirements.

## Billing

Using Gemini with Parallel incurs charges from both Gemini token consumption and use of [Parallel's Search API](/resources/pricing).

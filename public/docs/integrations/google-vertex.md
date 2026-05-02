> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Vertex AI

> Use Parallel as a grounding provider in Google Vertex AI

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The Parallel Search API is available in Google Vertex AI as an external grounding provider. Use it to ground Gemini model responses with up-to-date context from the public web.

There are two ways to get started:

|                    | Google Cloud Marketplace               | Bring Your Own Key (BYOK)                                             |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------- |
| **Setup**          | Subscribe via Google Cloud Marketplace | Get an API key from [Parallel Platform](https://platform.parallel.ai) |
| **Authentication** | Automatic — no API key needed          | API key passed in each request                                        |
| **Billing**        | Consolidated through Google Cloud      | Billed through Parallel                                               |
| **Quota**          | 200 prompts per minute                 | 200 prompts per minute                                                |

Read Google's official documentation [here](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-parallel).

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

* Gemini 3 Flash
* Gemini 3 Pro Image
* Gemini 2.5 Pro
* Gemini 2.5 Flash
* Gemini 2.5 Flash-Lite
* Gemini 2.5 Flash with Live API native audio
* Gemini 2.0 Flash with Live API
* Gemini 2.0 Flash

## Setup

<Tabs>
  <Tab title="Google Cloud Marketplace (Recommended)">
    The fastest way to get started is through the Google Cloud Marketplace. This approach requires no API key — authentication is handled automatically through your Google Cloud project.

    1. Go to the [Parallel Web Search listing](https://console.cloud.google.com/marketplace/product/parallel-web-systems-public/parallel-web-systems) on Google Cloud Marketplace.
    2. Click **Subscribe**.
    3. Review the pricing, accept the terms of service, and confirm your subscription.
    4. Ensure the subscription is active in the Google Cloud project you plan to use with Vertex AI.

    Once subscribed, you can start making grounded requests immediately — no API key is needed in your request body.
  </Tab>

  <Tab title="Bring Your Own Key">
    1. Sign up at [Parallel Platform](https://platform.parallel.ai).
    2. Create an API key from your dashboard.
    3. Include the API key in your Vertex AI requests.
  </Tab>
</Tabs>

## Vertex AI Studio

You can also use Parallel as a grounding source directly in the [Vertex AI Studio](https://console.cloud.google.com/vertex-ai/studio/multimodal;mode=prompt) UI — no code required. This requires an active Google Cloud Marketplace subscription.

<video autoPlay muted loop playsInline className="w-full aspect-video rounded-xl" src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/U-5zwrPvr0Z_JIAK/images/Parallel_VertexStudio.mp4?fit=max&auto=format&n=U-5zwrPvr0Z_JIAK&q=85&s=111ae13f29de4f508df7b47355704ce5" data-path="images/Parallel_VertexStudio.mp4" />

1. Open [Vertex AI Studio](https://console.cloud.google.com/vertex-ai/studio/multimodal;mode=prompt) in the Google Cloud Console.
2. Select a supported Gemini model.
3. In the grounding configuration, select **Parallel Web Search** as the grounding source.
4. Enter your prompt and send — the model response will be grounded with web results from Parallel.

<Tip>
  Vertex AI Studio is a great way to experiment with grounded responses before integrating via the API.
</Tip>

## Make a grounded request

Use the Vertex AI REST API to request grounded responses from Gemini:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

* `PROJECT_ID`: Your Google Cloud project ID.
* `LOCATION`: The region to process the request (e.g., `us-central1`). Omit from the endpoint to use the global endpoint.
* `MODEL_ID`: The Gemini model to use (e.g., `gemini-2.5-flash`).

<Tabs>
  <Tab title="Google Cloud Marketplace">
    No `api_key` field is needed when using the Marketplace subscription:

    ```json theme={"system"}
    {
      "contents": [{
        "role": "user",
        "parts": [{
          "text": "MODEL_PROMPT_TEXT"
        }]
      }],
      "tools": [{
        "parallelAiSearch": {
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
  </Tab>

  <Tab title="Bring Your Own Key">
    Include your API key in the `parallelAiSearch` object:

    ```json theme={"system"}
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
  </Tab>
</Tabs>

Execute the request:

```bash theme={"system"}
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

<Note>
  If both a Marketplace subscription and an API key are present in a request, the API key takes precedence.
</Note>

## Configuration options

All `customConfigs` fields are optional. For best performance, use defaults unless you have specific requirements.

| Parameter                       | Default | Range           | Description                                 |
| ------------------------------- | ------- | --------------- | ------------------------------------------- |
| `max_results`                   | 10      | 1–20            | Number of search results used for grounding |
| `excerpts.max_chars_per_result` | 30,000  | 1,000–100,000   | Maximum characters per excerpt              |
| `excerpts.max_chars_total`      | 100,000 | 1,000–1,000,000 | Maximum total excerpt characters            |
| `source_policy.include_domains` | —       | Up to 10        | Only return results from these domains      |
| `source_policy.exclude_domains` | —       | Up to 10        | Exclude results from these domains          |

For guidance on search queries and configuration, see [Search API Best Practices](/search/best-practices).

<Tip>
  For a complete working example, see the [Vertex AI demo](https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/vertex_ai_demo) in the Parallel Cookbook.
</Tip>

## Quota

The default quota is 200 prompts per minute. If you need higher rate limits, contact your Google account team (Marketplace) or `support@parallel.ai` (BYOK) with your use case and requirements.

## Billing

Using Gemini with Parallel incurs charges from both Gemini token consumption and use of Parallel's Search API.

* **Google Cloud Marketplace**: Search API charges are consolidated into your Google Cloud billing.
* **Bring Your Own Key**: Search API charges are billed through [Parallel's pricing](/resources/pricing).

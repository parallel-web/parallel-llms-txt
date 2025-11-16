# Reference Endpoints

> API Reference for the Alpha API

## 1. Ingest Query

Convert a natural language query into a structured FindAllSpec.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1beta/findall/ingest \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "query": "Find all AI companies that recently raised money and get their website, CEO name, and CTO name."
    }'
  ```

  ```python Python theme={"system"}
  import requests

  response = requests.post(
      "https://api.parallel.ai/v1beta/findall/ingest",
      headers={
          "x-api-key": "PARALLEL_API_KEY",
          "Content-Type": "application/json"
      },
      json={
          "query": "Find all AI companies that recently raised money and get their website, CEO name, and CTO name."
      }
  )

  findall_spec = response.json()
  ```

  ```typescript TypeScript theme={"system"}
  // Note: FindAll endpoints are not yet available in the SDK, using fetch
  const response = await fetch("https://api.parallel.ai/v1beta/findall/ingest", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PARALLEL_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        "Find all AI companies that recently raised money and get their website, CEO name, and CTO name.",
    }),
  });

  const findallSpec = await response.json();
  ```
</CodeGroup>

### Ingest Response Example

```json  theme={"system"}
{
  "name": "funded_companies",
  "columns": [
    {
      "name": "entity_name",
      "description": "Name of the funded company",
      "type": "enrichment",
      "order_direction": null
    },
    {
      "name": "website",
      "description": "Website of the funded company",
      "type": "enrichment",
      "order_direction": null
    },
    {
      "name": "ai_product_development_evidence",
      "description": "Evidence of AI product development: description of AI products/services, core AI technologies used, and target applications.",
      "type": "enrichment",
      "order_direction": null
    },
    {
      "name": "series_a_2024_funding_evidence",
      "description": "Evidence of Series A funding in 2024: funding amount in USD, date of funding (YYYY-MM-DD), lead investors, and total funding raised to date.",
      "type": "enrichment",
      "order_direction": null
    },
    {
      "name": "ai_product_development_check",
      "description": "Company must be developing products or services in the field of artificial intelligence (AI).",
      "type": "constraint",
      "order_direction": null
    },
    {
      "name": "series_a_2024_funding_check",
      "description": "Company must have received Series A funding in 2024.",
      "type": "constraint",
      "order_direction": null
    }
  ],
  "query": "Find all companies developing AI products that raised Series A funding in 2024",
  "title": "AI companies with 2024 Series A"
}
```

## 2. Run FindAll

Start a FindAll run using the structured query from the ingest step.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1beta/findall/runs \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "findall_spec": {
        "name": "funded_companies",
        "columns": [
          {"name": "entity_name", "description": "Name of the funded company", "type": "enrichment"},
          {"name": "website", "description": "Website of the funded company", "type": "enrichment"},
          {"name": "ai_product_development_check", "description": "Company develops AI products", "type": "constraint"},
          {"name": "series_a_2024_funding_check", "description": "Company raised Series A in 2024", "type": "constraint"}
        ]
      },
      "processor": "base",
      "result_limit": 200
    }'
  ```

  ```python Python theme={"system"}
  response = requests.post(
      "https://api.parallel.ai/v1beta/findall/runs",
      headers={
          "x-api-key": "PARALLEL_API_KEY",
          "Content-Type": "application/json"
      },
      json={
          "findall_spec": findall_spec,  # From previous ingest step
          "processor": "base",
          "result_limit": 200,
          "metadata": {
              "user_id": "usr_123",
              "request_source": "api_docs_example"
          }
      }
  )

  findall_id = response.json()["findall_id"]
  ```

  ```typescript TypeScript theme={"system"}
  // Note: FindAll endpoints are not yet available in the SDK, using fetch
  const response = await fetch("https://api.parallel.ai/v1beta/findall/runs", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PARALLEL_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      findall_spec: findallSpec, // From previous ingest step
      processor: "base",
      result_limit: 200,
      metadata: {
        user_id: "usr_123",
        request_source: "api_docs_example",
      },
    }),
  });

  const { findall_id } = await response.json();
  ```
</CodeGroup>

### Request Parameters

| Field         | Type        | Required | Description                                            |
| ------------- | ----------- | -------- | ------------------------------------------------------ |
| findall\_spec | FindAllSpec | Yes      | The structured query from ingest                       |
| candidates    | array       | No       | Optional seed entities to include                      |
| processor     | string      | No       | Quality/cost tradeoff: `base` or `pro` (default: base) |
| result\_limit | integer     | No       | Maximum results to return (default: 200)               |
| metadata      | object      | No       | Custom key-value pairs for tracking                    |

#### Run Response Example

```json  theme={"system"}
{
  "findall_id": "findall_de9bbbed-1021-48fe-af79-2faca7177230_339277cf-b70e-4b49-9711-5bd91f803cad",
  "status": "queued"
}
```

## 3. Poll for Results

Check the status of your FindAll run and retrieve results.

**Important**: A run is complete only when both `is_active` and `are_enrichments_active` are `false`.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X GET "https://api.parallel.ai/v1beta/findall/runs/YOUR_FINDALL_ID" \
    -H "x-api-key: PARALLEL_API_KEY"
  ```

  ```python Python theme={"system"}
  import time

  # Poll until complete
  while True:
      response = requests.get(
          f"https://api.parallel.ai/v1beta/findall/runs/{findall_id}",
          headers={"x-api-key": "PARALLEL_API_KEY"}
      )

      result = response.json()

      if not result["is_active"] and not result["are_enrichments_active"]:
          print(f"Run completed with status: {result['status']}")
          break

      print(f"Processing... {len(result['results'])} results so far")
      time.sleep(15)  # Poll every 15 seconds
  ```

  ```typescript TypeScript theme={"system"}
  // Note: FindAll endpoints are not yet available in the SDK, using fetch
  async function pollForResults(findallId: string) {
    while (true) {
      const response = await fetch(
        `https://api.parallel.ai/v1beta/findall/runs/${findallId}`,
        {
          headers: {
            "x-api-key": process.env.PARALLEL_API_KEY!,
          },
        }
      );

      const result = await response.json();

      if (!result.is_active && !result.are_enrichments_active) {
        console.log(`Run completed with status: ${result.status}`);
        return result;
      }

      console.log(`Processing... ${result.results.length} results so far`);
      await new Promise((resolve) => setTimeout(resolve, 15000)); // Poll every 15 seconds
    }
  }

  const finalResult = await pollForResults(findall_id);
  ```
</CodeGroup>

### Response Structure

```json  theme={"system"}
{
  "title": "AI companies with 2024 Series A",
  "query": "Find all companies developing AI products that raised Series A funding in 2024",
  "spec": {
    "name": "funded_companies",
    "columns": [
      {
        "name": "ai_product_development_check",
        "description": "Company must be developing products or services in the field of artificial intelligence AI.",
        "type": "constraint",
        "status": null
      },
      {
        "name": "series_a_2024_funding_check",
        "description": "Company must have received Series A funding in 2024.",
        "type": "constraint",
        "status": null
      }
    ]
  },
  "is_active": false,
  "are_enrichments_active": false,
  "status": "completed",
  "steps": [
    {
      "name": "understanding_question",
      "description": "Understand the question",
      "status": "done"
    },
    {
      "name": "gen_candidates_step",
      "description": "Generate candidates using Parallel Index",
      "status": "done"
    },
    {
      "name": "filter_candidates_step",
      "description": "Process candidates using Parallel Processors",
      "status": "done"
    }
  ],
  "filters": [
    {
      "name": "ai_product_development_check",
      "description": "Company must be developing products or services in the field of artificial intelligence AI.",
      "type": "filter",
      "status": "done"
    },
    {
      "name": "series_a_2024_funding_check",
      "description": "Company must have received Series A funding in 2024.",
      "type": "filter",
      "status": "done"
    }
  ],
  "enrichments": [
    {
      "name": "series_a_2024_funding_evidence",
      "description": "Evidence of Series A funding in 2024: funding amount in USD, date of funding (YYYY-MM-DD), lead investors, and total funding raised to date.",
      "type": "enrichment",
      "status": "done"
    },
    {
      "name": "ai_product_development_evidence",
      "description": "Evidence of AI product development: description of AI products/services, core AI technologies used, and target applications.",
      "type": "enrichment",
      "status": "done"
    }
  ],
  "results": [
    {
      "entity_id": "6d5f6411-9554-4168-b4ad-75b0439f03b7",
      "name": "Cognition AI",
      "url": "cognition.ai",
      "description": "",
      "filter_results": [
        {
          "key": "ai_product_development_check",
          "value": "yes",
          "reasoning": "Cognition AI is described as an applied AI lab that is building the future of software engineering and the makers of Devin, an AI software developer.",
          "citations": "https://cognition.ai/blog/introducing-devin, https://research.contrary.com/company/cognition",
          "confidence": "high"
        },
        {
          "key": "series_a_2024_funding_check",
          "value": "yes",
          "reasoning": "Multiple sources confirm that Cognition AI received Series A funding in 2024.",
          "citations": "https://www.crunchbase.com/funding_round/cognition-5bd7-series-a--d0b08732, https://techcrunch.com/2024/12/20/heres-the-full-list-of-49-us-ai-startups-that-have-raised-100m-or-more-in-2024/",
          "confidence": "high"
        }
      ],
      "enrichment_results": [],
      "score": 100.0
    }
  ],
  "candidates": [
    {
      "entity_id": "0b330c38-0034-4f37-b4fe-bdda3e1bdb5c",
      "name": "Abridge"
    },
    {
      "entity_id": "93fcc889-ed9a-4b45-8bd8-b48a79fd0717",
      "name": "Aurora AI"
    }
  ],
  "max_results": 20,
  "modified_at": "2025-08-06T22:31:56.473269Z",
  "created_at": "2025-08-06T22:31:10.025762",
  "pages_read": 307,
  "pages_considered": 1784,
  "billing_metrics": {
    "cost_mode": "base",
    "rows_processed": 6,
    "enrichment_cells": 8
  }
}
```

## 4. Additional Operations

### Cancel a Run

Stop a running FindAll operation:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1beta/findall/runs/cancel \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"findall_id": "YOUR_FINDALL_ID"}'
  ```

  ```typescript TypeScript theme={"system"}
  // Note: FindAll endpoints are not yet available in the SDK, using fetch
  const response = await fetch(
    "https://api.parallel.ai/v1beta/findall/runs/cancel",
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.PARALLEL_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        findall_id: "YOUR_FINDALL_ID",
      }),
    }
  );

  const result = await response.json();
  ```
</CodeGroup>

### Extend a Run

Add more entities to a completed run:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1beta/findall/runs/extend \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "findall_id": "YOUR_FINDALL_ID",
      "num_entities": 100
    }'
  ```
</CodeGroup>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# FindAll Migration Guide

> Guide for migrating from V0 to V1 FindAll API

<Note>
  **Timeline**: Both APIs are currently available. Include the `parallel-beta: "findall-2025-09-15"` header to use V1 API. Without this header, requests default to V0 API.
</Note>

## Why Migrate to V1?

V1 delivers significant improvements across pricing, performance, and capabilities:

1. **[Pay-per-Match Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Charges based on matches found, not candidates evaluated

2. **[Task-Powered Enrichments](/findall-api/features/findall-enrich)**: Flexible enrichments via Task API with expanded processor options

3. **Enhanced Capabilities:**
   * [Extend](/findall-api/features/findall-extend), [Cancel](/findall-api/features/findall-cancel), and [Preview](/findall-api/features/findall-preview) endpoints
   * [Real-time streaming](/findall-api/features/findall-sse) with incremental updates
   * [Exclude candidates](/findall-api/core-concepts/findall-candidates) from evaluation
   * Match conditions return both `value` and `is_matched` boolean
   * Increased `match_limit` from 200 to 1,000

4. **Better Performance**: Improved latency and match quality across all stages

<Warning>
  **Breaking Changes**: V1 is not backward compatible. V0 runs cannot be accessed via V1 endpoints. Parameter names, response schemas, and pricing have changed.
</Warning>

## Key Differences

### Request Structure

V0 used a nested `findall_spec` object. V1 flattens this structure:

| **Concept**         | **V0 API**                               | **V1 API**                            |
| ------------------- | ---------------------------------------- | ------------------------------------- |
| **Required Header** | None                                     | `parallel-beta: "findall-2025-09-15"` |
| **Search Goal**     | `query`                                  | `objective`                           |
| **Entity Type**     | `findall_spec.name`                      | `entity_type`                         |
| **Filter Criteria** | `findall_spec.columns` (type=constraint) | `match_conditions`                    |
| **Model Selection** | `processor`                              | `generator`                           |
| **Max Results**     | `result_limit` (max: 200)                | `match_limit` (max: 1,000)            |

### Response Structure

V0 included results in poll responses. V1 separates status and results:

| **Concept**         | **V0 API**                                             | **V1 API**                             |
| ------------------- | ------------------------------------------------------ | -------------------------------------- |
| **Status Check**    | `is_active` + `are_enrichments_active`                 | `status.is_active`                     |
| **Get Results**     | `GET /v1beta/findall/runs/{id}` (included in response) | `GET /v1beta/findall/runs/{id}/result` |
| **Results Array**   | `results`                                              | `candidates`                           |
| **Relevance Score** | `score`                                                | `relevance_score`                      |
| **Match Data**      | `filter_results` (array)                               | `output` (object)                      |
| **Field Access**    | Loop through array to find key                         | Direct: `output[field_name]["value"]`  |

### Enrichment Handling

V0 included enrichments in initial spec. V1 adds them via separate endpoint:

| **Aspect**            | **V0 API**                                | **V1 API**                                                  |
| --------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| **Definition**        | Part of `columns` array (type=enrichment) | Separate `POST /v1beta/findall/runs/{id}/enrich` call       |
| **Timing**            | At run creation only                      | Anytime after run creation (multiple enrichments supported) |
| **Output Format**     | Separate `enrichment_results` array       | Merged into `output` object with type=enrichment            |
| **Processor Options** | Limited to FindAll processors             | All Task API processors available                           |

## End-to-End Migration Example

This example shows the complete workflow migration, including enrichments:

<CodeGroup>
  ```python V0 API [expandable] theme={"system"}
  import requests
  import time

  API_KEY = "your_api_key"
  BASE_URL = "https://api.parallel.ai"

  # Step 1: Ingest query
  ingest_response = requests.post(
      f"{BASE_URL}/v1beta/findall/ingest",
      headers={"x-api-key": API_KEY},
      json={"query": "Find AI companies that raised Series A in 2024 and get CEO names"}
  )
  findall_spec = ingest_response.json()

  # Step 2: Create run (constraints + enrichments together)
  run_response = requests.post(
      f"{BASE_URL}/v1beta/findall/runs",
      headers={"x-api-key": API_KEY},
      json={
          "findall_spec": findall_spec,
          "processor": "core",
          "result_limit": 100
      }
  )
  findall_id = run_response.json()["findall_id"]

  # Step 3: Poll until both flags are false
  while True:
      poll_response = requests.get(
          f"{BASE_URL}/v1beta/findall/runs/{findall_id}",
          headers={"x-api-key": API_KEY}
      )
      result = poll_response.json()
      if not result["is_active"] and not result["are_enrichments_active"]:
          break
      time.sleep(15)

  # Step 4: Access results from poll response
  for entity in result["results"]:
      print(f"{entity['name']}: Score {entity['score']}")

      # Loop through arrays to find values
      for filter_result in entity["filter_results"]:
          print(f"  {filter_result['key']}: {filter_result['value']}")
      for enrichment in entity["enrichment_results"]:
          print(f"  {enrichment['key']}: {enrichment['value']}")
  ```

  ```python V1 API [expandable] theme={"system"}
  import requests
  import time

  API_KEY = "your_api_key"
  BASE_URL = "https://api.parallel.ai"
  headers = {
      "x-api-key": API_KEY,
      "parallel-beta": "findall-2025-09-15"
  }

  # Step 1: Ingest objective
  ingest_response = requests.post(
      f"{BASE_URL}/v1beta/findall/ingest",
      headers=headers,
      json={"objective": "Find AI companies that raised Series A in 2024 and get CEO names"}
  )
  ingest_data = ingest_response.json()

  # Step 2: Create run (constraints only, flattened)
  run_response = requests.post(
      f"{BASE_URL}/v1beta/findall/runs",
      headers=headers,
      json={
          "objective": ingest_data["objective"],
          "entity_type": ingest_data["entity_type"],
          "match_conditions": ingest_data["match_conditions"],
          "generator": "core",
          "match_limit": 50
      }
  )
  findall_id = run_response.json()["findall_id"]

  # Step 3: Add enrichments (separate call)
  time.sleep(5)
  requests.post(
      f"{BASE_URL}/v1beta/findall/runs/{findall_id}/enrich",
      headers=headers,
      json={
          "processor": "core",
          "output_schema": ingest_data.get("enrichments")[0]
      }
  )

  # Step 4: Poll until completed
  while True:
      status_response = requests.get(
          f"{BASE_URL}/v1beta/findall/runs/{findall_id}",
          headers=headers
      )
      if status_response.json()["status"]["status"] == "completed":
          break
      time.sleep(10)

  # Step 5: Fetch results from separate endpoint
  result_response = requests.get(
      f"{BASE_URL}/v1beta/findall/runs/{findall_id}/result",
      headers=headers
  )
  result = result_response.json()

  # Step 6: Access results with direct object access
  for candidate in result["candidates"]:
      if candidate["match_status"] == "matched":
          print(f"{candidate['name']}: Score {candidate['relevance_score']}")

          # Direct access to all fields (constraints + enrichments merged)
          for field_name, field_data in candidate["output"].items():
              print(f"  {field_name}: {field_data['value']}")
  ```
</CodeGroup>

## Migration Checklist

Complete these steps to migrate from V0 to V1:

### Core Changes

* Add `parallel-beta: "findall-2025-09-15"` header to all requests
* Change ingest parameter: `query` → `objective`
* Flatten run request: extract `objective`, `entity_type`, `match_conditions` from `findall_spec`
* Rename: `result_limit` → `match_limit`, `processor` → `generator`
* Update status check: `status.status == "completed"` instead of checking two flags
* Fetch results from separate `/result` endpoint
* Update result parsing: `results` → `candidates`, `score` → `relevance_score`
* Change field access: direct object access (`output[field]`) vs array iteration

### Enrichment Changes (if applicable)

* Move enrichments to separate `POST /enrich` call after run creation
* Convert enrichment columns to `output_schema` format (see [Task API](/task-api/guides/specify-a-task#output-schema))
* Update result access: enrichments now merged into `output` object

### Optional Enhancements

* Implement streaming via `/events` endpoint for real-time updates
* Add `exclude_list` to filter out specific candidates
* Use `preview: true` for testing queries before full runs
* Implement `/extend` endpoint to increase match limits dynamically
* Implement `/cancel` endpoint to stop runs early

### Testing

* Validate queries in development environment
* Review pricing impact with generator-based model
* Update error handling for new response schemas
* Monitor performance metrics

## Related Topics

### Core Concepts

* **[Quickstart](/findall-api/findall-quickstart)**: Get started with V1 FindAll API
* **[Candidates](/findall-api/core-concepts/findall-candidates)**: Understand candidate object structure and states
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and termination

### Features

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Cancel Runs](/findall-api/features/findall-cancel)**: Stop runs early to save costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches

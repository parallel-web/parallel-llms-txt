> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Refresh Runs

> Rerun the same FindAll query with exclude_list to discover net new entities over time

## Overview

Scheduled jobs allow you to run the same FindAll query on a regular basis to discover newly emerging entities and track changes to existing ones. This is ideal for ongoing monitoring use cases like market intelligence, lead generation, or competitive tracking.

Rather than manually re-running queries, you can programmatically create new FindAll runs using a previous run's schema, while excluding candidates you've already discovered.

## Use Cases

Scheduled FindAll jobs are particularly useful for:

* **Market monitoring**: Track new companies entering a market space over time
* **Lead generation**: Continuously discover new potential customers matching your criteria
* **Competitive intelligence**: Monitor emerging competitors and new funding announcements
* **Investment research**: Track new companies meeting specific investment criteria
* **Regulatory compliance**: Discover new entities that may require compliance review

## How It Works

Creating a scheduled FindAll job involves two steps:

1. **Retrieve the schema** from a previous successful run
2. **Create a new run** using that schema, with an exclude list of previously discovered candidates

This approach ensures:

* **Consistent criteria**: Use the exact same evaluation logic across runs
* **No duplicates**: Automatically exclude candidates from previous runs
* **Cost efficiency**: Only pay to evaluate net new candidates

## Step 1: Retrieve the Schema

Get the schema from a completed FindAll run to reuse its `entity_type`, `match_conditions`, and `enrichments`:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X GET "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f/schema" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15"
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  schema = client.beta.findall.schema(
      findall_id="findall_40e0ab8c10754be0b7a16477abb38a2f"
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const schema = await client.beta.findall.schema({
    findallId: "findall_40e0ab8c10754be0b7a16477abb38a2f"
  });
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "objective": "Find all portfolio companies of Khosla Ventures founded after 2020",
  "entity_type": "companies",
  "match_conditions": [
    {
      "name": "khosla_ventures_portfolio_check",
      "description": "Company must be a portfolio company of Khosla Ventures."
    },
    {
      "name": "founded_after_2020_check",
      "description": "Company must have been founded after 2020."
    }
  ],
  "enrichments": [
    {
      "name": "funding_amount",
      "description": "Total funding raised by the company in USD"
    }
  ],
  "generator": "core",
  "match_limit": 50
}
```

## Step 2: Create a New Run with `exclude_list`

Use the retrieved schema to create a new FindAll run, adding an `exclude_list` parameter to skip candidates you've already discovered:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1beta/findall/runs" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15" \
    -H "Content-Type: application/json" \
    -d '{
      "objective": "Find all portfolio companies of Khosla Ventures founded after 2020",
      "entity_type": "companies",
      "match_conditions": [
        {
          "name": "khosla_ventures_portfolio_check",
          "description": "Company must be a portfolio company of Khosla Ventures."
        },
        {
          "name": "founded_after_2020_check",
          "description": "Company must have been founded after 2020."
        }
      ],
      "enrichments": [
        {
          "name": "funding_amount",
          "description": "Total funding raised by the company in USD"
        }
      ],
      "generator": "core",
      "match_limit": 50,
      "exclude_list": [
        {
          "name": "Anthropic",
          "url": "https://www.anthropic.com/"
        },
        {
          "name": "Adept AI",
          "url": "https://adept.ai/"
        },
        {
          "name": "Liquid AI",
          "url": "https://www.liquid.ai/"
        }
      ]
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  findall_run = client.beta.findall.create(
      objective="Find all portfolio companies of Khosla Ventures founded after 2020",
      entity_type="companies",
      match_conditions=[
          {
              "name": "khosla_ventures_portfolio_check",
              "description": "Company must be a portfolio company of Khosla Ventures."
          },
          {
              "name": "founded_after_2020_check",
              "description": "Company must have been founded after 2020."
          }
      ],
      enrichments=[
          {
              "name": "funding_amount",
              "description": "Total funding raised by the company in USD"
          }
      ],
      generator="core",
      match_limit=50,
      exclude_list=[
          {
              "name": "Anthropic",
              "url": "https://www.anthropic.com/"
          },
          {
              "name": "Adept AI",
              "url": "https://adept.ai/"
          },
          {
              "name": "Liquid AI",
              "url": "https://www.liquid.ai/"
          }
      ]
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const run = await client.beta.findall.create({
    objective: "Find all portfolio companies of Khosla Ventures founded after 2020",
    entity_type: "companies",
    match_conditions: [
      {
        name: "khosla_ventures_portfolio_check",
        description: "Company must be a portfolio company of Khosla Ventures."
      },
      {
        name: "founded_after_2020_check",
        description: "Company must have been founded after 2020."
      }
    ],
    enrichments: [
      {
        name: "funding_amount",
        description: "Total funding raised by the company in USD"
      }
    ],
    generator: "core",
    match_limit: 50,
    exclude_list: [
      {
        name: "Anthropic",
        url: "https://www.anthropic.com/"
      },
      {
        name: "Adept AI",
        url: "https://adept.ai/"
      },
      {
        name: "Liquid AI",
        url: "https://www.liquid.ai/"
      }
    ]
  });
  ```
</CodeGroup>

### Exclude List Parameters

The `exclude_list` is an array of candidate objects to exclude. Each object contains:

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `name`    | string | Yes      | Name of the candidate to exclude |
| `url`     | string | Yes      | URL of the candidate to exclude  |

**How exclusions work:**

* Candidates matching any entry in the `exclude_list` will be skipped during generation
* This prevents re-evaluating entities you've already processed
* Exclusions are matched by URL—ensure URLs are normalized consistently across runs

## Building Your Exclude List

To construct the `exclude_list` from previous runs, retrieve the matched candidates and extract their `name` and `url` fields:

```bash cURL theme={"system"}
curl -X GET "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f/result" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "parallel-beta: findall-2025-09-15"
```

Extract the `name` and `url` fields from each matched candidate:

```json  theme={"system"}
{
  "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
  "candidates": [
    {
      "candidate_id": "candidate_abc123",
      "name": "Anthropic",
      "url": "https://www.anthropic.com/",
      "match_status": "matched",
      ...
    },
    {
      "candidate_id": "candidate_def456",
      "name": "Adept AI",
      "url": "https://adept.ai/",
      "match_status": "matched",
      ...
    }
  ]
}
```

Store these candidates and pass them as the `exclude_list` array in subsequent runs.

## Example: Weekly Scheduled Job

Here's a complete example showing how to set up a weekly FindAll job:

<CodeGroup>
  ```python Python theme={"system"}
  import requests
  import time
  from datetime import datetime

  PARALLEL_API_KEY = "your_api_key"
  BASE_URL = "https://api.parallel.ai/v1beta"
  HEADERS = {
      "x-api-key": PARALLEL_API_KEY,
      "parallel-beta": "findall-2025-09-15",
      "Content-Type": "application/json"
  }

  # Store the original findall_id from your first run
  ORIGINAL_FINDALL_ID = "findall_40e0ab8c10754be0b7a16477abb38a2f"

  # Keep track of all discovered candidates across runs
  all_discovered_candidates = []

  def get_schema(findall_id):
      """Retrieve schema from a previous run"""
      response = requests.get(
          f"{BASE_URL}/findall/runs/{findall_id}/schema",
          headers=HEADERS
      )
      response.raise_for_status()
      return response.json()

  def get_matched_candidates(findall_id):
      """Get all matched candidates from a run"""
      response = requests.get(
          f"{BASE_URL}/findall/runs/{findall_id}/result",
          headers=HEADERS
      )
      response.raise_for_status()
      candidates = response.json().get("candidates", [])
      return [c for c in candidates if c.get("match_status") == "matched"]

  def create_scheduled_run(schema, exclude_candidates):
      """Create a new FindAll run with exclusions"""
      payload = {
          **schema,
          "generator": "core",
          "match_limit": 50,
          "exclude_list": exclude_candidates
      }

      response = requests.post(
          f"{BASE_URL}/findall/runs",
          headers=HEADERS,
          json=payload
      )
      response.raise_for_status()
      return response.json()["findall_id"]

  def run_weekly_job():
      """Execute a scheduled FindAll job"""
      print(f"Starting scheduled job at {datetime.now()}")

      # Step 1: Get schema from original run
      schema = get_schema(ORIGINAL_FINDALL_ID)
      print(f"Retrieved schema: {schema['objective']}")

      # Step 2: Create new run with exclusions
      new_findall_id = create_scheduled_run(schema, all_discovered_candidates)
      print(f"Created new run: {new_findall_id}")

      # Step 3: Poll for completion (simplified)
      while True:
          response = requests.get(
              f"{BASE_URL}/findall/runs/{new_findall_id}",
              headers=HEADERS
          )
          status = response.json()["status"]["status"]

          if status in ["completed", "failed", "cancelled"]:
              break

          time.sleep(30)  # Poll every 30 seconds

      # Step 4: Get new matched candidates
      new_candidates = get_matched_candidates(new_findall_id)
      print(f"Found {len(new_candidates)} new candidates")

      # Step 5: Update exclude list for next run
      for candidate in new_candidates:
          all_discovered_candidates.append({
              "name": candidate["name"],
              "url": candidate["url"]
          })

      return new_candidates

  # Run the job
  if __name__ == "__main__":
      new_results = run_weekly_job()
  ```

  ```typescript TypeScript theme={"system"}
  import axios from 'axios';

  const PARALLEL_API_KEY = 'your_api_key';
  const BASE_URL = 'https://api.parallel.ai/v1beta';
  const HEADERS = {
    'x-api-key': PARALLEL_API_KEY,
    'parallel-beta': 'findall-2025-09-15',
    'Content-Type': 'application/json',
  };

  // Store the original findall_id from your first run
  const ORIGINAL_FINDALL_ID = 'findall_40e0ab8c10754be0b7a16477abb38a2f';

  // Keep track of all discovered candidates across runs
  let allDiscoveredCandidates: Array<{ name: string; url: string }> = [];

  async function getSchema(findallId: string) {
    const response = await axios.get(
      `${BASE_URL}/findall/runs/${findallId}/schema`,
      { headers: HEADERS }
    );
    return response.data;
  }

  async function getMatchedCandidates(findallId: string) {
    const response = await axios.get(
      `${BASE_URL}/findall/runs/${findallId}/result`,
      { headers: HEADERS }
    );
    const candidates = response.data.candidates || [];
    return candidates.filter((c: any) => c.match_status === "matched");
  }

  async function createScheduledRun(
    schema: any,
    excludeCandidates: Array<{ name: string; url: string }>
  ) {
    const payload = {
      ...schema,
      generator: 'core',
      match_limit: 50,
      exclude_list: excludeCandidates,
    };

    const response = await axios.post(
      `${BASE_URL}/findall/runs`,
      payload,
      { headers: HEADERS }
    );
    return response.data.findall_id;
  }

  async function runWeeklyJob() {
    console.log(`Starting scheduled job at ${new Date()}`);

    // Step 1: Get schema from original run
    const schema = await getSchema(ORIGINAL_FINDALL_ID);
    console.log(`Retrieved schema: ${schema.objective}`);

    // Step 2: Create new run with exclusions
    const newFindallId = await createScheduledRun(schema, allDiscoveredCandidates);
    console.log(`Created new run: ${newFindallId}`);

    // Step 3: Poll for completion
    let status = 'running';
    while (!['completed', 'failed', 'cancelled'].includes(status)) {
      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds

      const response = await axios.get(
        `${BASE_URL}/findall/runs/${newFindallId}`,
        { headers: HEADERS }
      );
      status = response.data.status.status;
    }

    // Step 4: Get new matched candidates
    const newCandidates = await getMatchedCandidates(newFindallId);
    console.log(`Found ${newCandidates.length} new candidates`);

    // Step 5: Update exclude list for next run
    newCandidates.forEach((candidate: any) => {
      allDiscoveredCandidates.push({
        name: candidate.name,
        url: candidate.url,
      });
    });

    return newCandidates;
  }

  // Run the job
  runWeeklyJob();
  ```
</CodeGroup>

## Best Practices

### Schema Modifications

While you should keep `match_conditions` consistent across runs, you can adjust:

* **`objective`**: Update to reflect the current time period (e.g., "founded in 2024" → "founded in 2025")
* **`enrichments`**: Add new enrichment fields without affecting matching logic
* **`match_limit`**: Adjust based on expected growth rate
* **`generator`**: Change generators if needed (though this may affect result quality)

### Exclude List Management

* **Persist candidates**: Store discovered candidate objects (name and URL) in a database or file for long-term tracking
* **Normalize URLs**: Ensure consistent URL formatting (trailing slashes, protocols, etc.) across runs
* **Periodic resets**: Consider occasionally running without exclusions to catch entities that may have changed
* **Monitor list size**: Very large exclude lists (>10,000 candidates) may impact performance

### Scheduling

* **Frequency**: Choose intervals based on your domain's update rate (daily, weekly, monthly)
* **Off-peak hours**: Schedule jobs during low-traffic periods if possible
* **Webhooks**: Use [webhooks](/findall-api/features/findall-webhook) to get notified when jobs complete
* **Error handling**: Implement retry logic for failed runs

### Cost Optimization

* **Start small**: Use lower `match_limit` values initially, then [extend](/findall-api/features/findall-extend) if needed
* **Preview first**: Test schema changes with [preview](/findall-api/features/findall-preview) before running full jobs
* **Monitor metrics**: Track `generated_candidates_count` vs `matched_candidates_count` to optimize criteria

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](/api-reference/findall-api-beta/get-findall-run-schema)**: Complete endpoint documentation

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# FindAll API Quickstart

> Discover and enrich entities from the web using natural language queries with the FindAll API

<Note>
  **Beta Notice**: Parallel FindAll is currently in public beta. Endpoints and request/response formats are subject to change. We will provide 30 days notice before any breaking changes. For production access, contact [support@parallel.ai](mailto:support@parallel.ai).
</Note>

## What is FindAll?

FindAll is a web-scale entity discovery system that turns natural language queries into structured, enriched databases. It answers questions like <u>"FindAll AI companies that raised Series A funding in the last 3 months"</u> by combining intelligent search, evaluation, and enrichment capabilities.

Unlike traditional search APIs that return a fixed set of results, FindAll generates candidates from web data, validates them against your criteria, and optionally enriches matches with additional structured information—all from a single natural language query.

## Key Features & Use Cases

FindAll excels at entity discovery and research tasks that require both breadth and depth:

* **Natural Language Input**: Express complex search criteria in plain English
* **Intelligent Entity Discovery**: Automatically generates and validates potential matches
* **Structured Enrichment**: Extract specific attributes for each discovered entity
* **Citation-backed Results**: Every data point includes reasoning and source citations
* **Asynchronous Processing**: Handle large-scale searches without blocking your application

## Pricing

<Note>
  See [Pricing](/getting-started/pricing) for a detailed schedule of rates.
</Note>

### Common Use Cases

* **Market Mapping**: <u>"FindAll fintech companies offering earned-wage access in Brazil."</u>
* **Competitive Intelligence**: <u>"FindAll AI infrastructure providers that raised Series B funding in the last 6 months."</u>
* **Lead Generation**: <u>"FindAll residential roofing companies in Charlotte, NC."</u>
* **Financial Research**: <u>"FindAll S\&P 500 stocks that dropped X% in last 30 days and listed tariffs as a key risk."</u>

### What Happens During a Run

When you create a FindAll run, the system executes three key stages:

1. **Generate Candidates from Web Data**: FindAll searches across the web to identify potential entities that might match your query. Each candidate enters the `generated` status.

2. **Evaluate Candidates Based on Match Conditions**: Each generated candidate is evaluated against your match conditions. Candidates that satisfy all conditions reach `matched` status and are included in your results. Those that don't become `unmatched`.

3. **Extract Enrichments for Matched Candidates**: For candidates that matched, FindAll uses the Task API to extract any additional enrichment fields you specified. This enrichment is orchestrated automatically by FindAll.

This three-stage approach ensures efficiency: you only pay to enrich candidates that actually match your criteria.

## Quick Example

Here's a complete example that finds portfolio companies. The workflow consists of four steps: converting natural language to a schema, starting the run, polling for completion, and retrieving results.

### The Basic Workflow

The FindAll API follows a simple four-step workflow:

1. **Ingest**: Convert your natural language query into a structured schema
2. **Run**: Start the findall run to discover and match candidates
3. **Poll**: Check status and retrieve results as they become available
4. **Fetch**: Retrieve the final list of matched candidates with reasoning and citations

```text  theme={"system"}
Natural Language Query → Structured Schema → findall_id → Matched Results
```

### Step 1: Ingest

**Purpose**: Converts your natural language query into a structured schema with `entity_type` and `match_conditions`.

The ingest endpoint automatically extracts:

* What type of entities to search for (companies, people, products, etc.)
* Match conditions that must be satisfied
* Optional enrichment suggestions

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1beta/findall/ingest" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15" \
    -H "Content-Type: application/json" \
    -d '{
      "objective": "FindAll portfolio companies of Khosla Ventures founded after 2020"
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  findall_run = client.beta.findall.ingest(
      objective="FindAll portfolio companies of Khosla Ventures founded after 2020"
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const run = await client.beta.findall.ingest({
    objective: "FindAll portfolio companies of Khosla Ventures founded after 2020"
  });
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "objective": "FindAll portfolio companies of Khosla Ventures founded after 2020",
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
  ]
}
```

### Customizing the ingest schema

The ingest endpoint generates a suggested schema, but you can (and should) review and modify it before creating a run. Common modifications include:

* **Relaxing temporal conditions**: Ingest may interpret phrases like "founded after 2023" strictly (e.g., "within the last 1 year"). You can broaden the description to be more inclusive.
* **Adjusting match condition descriptions**: Make descriptions more or less specific to control match rates.
* **Adding or removing match conditions**: Tailor the schema to your exact needs.
* **Changing the entity type**: Correct the entity type if ingest misidentified it.

For example, if ingest generated a strict condition like `"Company must have been founded within the last 1 year"`, you might change it to `"Company must have been founded in 2025 or later"` for more reliable matching.

<Tip>The ingest schema is a starting point, not a final answer. Editing `match_conditions` between the ingest and create steps is the recommended way to refine your query for better results.</Tip>

### Step 2: Create FindAll Run

**Purpose**: Starts the asynchronous findall process to generate and evaluate candidates.

You can use the schema from ingest directly, or modify it before passing it to the create endpoint. Key parameters:

* `generator`: Choose `preview`, `base`, `core`, or `pro` based on your needs (see [Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing))
* `match_limit`: Maximum number of matched candidates to return

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1beta/findall/runs" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15" \
    -H "Content-Type: application/json" \
    -d '{
      "objective": "FindAll portfolio companies of Khosla Ventures founded after 2020",
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
      "generator": "core",
      "match_limit": 5
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  findall_run = client.beta.findall.create(
      objective="FindAll portfolio companies of Khosla Ventures founded after 2020",
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
      generator="core",
      match_limit=5
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const run = await client.beta.findall.create({
    objective: "FindAll portfolio companies of Khosla Ventures founded after 2020",
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
    generator: "core",
    match_limit: 5
  });
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f"
}
```

### Step 3: Poll for Status

**Purpose**: Monitor progress and wait for completion.

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X GET "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15"
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  run_status = client.beta.findall.retrieve(
      findall_id="findall_40e0ab8c10754be0b7a16477abb38a2f"
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const runStatus = await client.beta.findall.retrieve({
    findallId: "findall_40e0ab8c10754be0b7a16477abb38a2f"
  });
  ```
</CodeGroup>

**Response:**

```json  theme={"system"}
{
  "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
  "status": {
    "status": "running",
    "is_active": true,
    "metrics": {
      "generated_candidates_count": 3,
      "matched_candidates_count": 1
    }
  },
  "generator": "core",
  "metadata": {},
  "created_at": "2025-11-03T20:47:21.580909Z",
  "modified_at": "2025-11-03T20:47:22.024269Z"
}
```

### Step 4: Get Results

**Purpose**: Retrieve the final list of candidates with match details, reasoning, and citations.

<Note>
  To understand the complete candidate object structure, see [Candidates](/findall-api/core-concepts/findall-candidates).
</Note>

**Request:**

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X GET "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f/result" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15"
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  result = client.beta.findall.result(
      findall_id="findall_40e0ab8c10754be0b7a16477abb38a2f",
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const result = await client.beta.findall.result({
    findallId: "findall_40e0ab8c10754be0b7a16477abb38a2f"
  });
  ```
</CodeGroup>

**Response:**

```json [expandable] theme={"system"}
{
  "findall_id": "findall_40e0ab8c10754be0b7a16477abb38a2f",
  "status": {
    "status": "completed",
    "is_active": false,
    "metrics": {
      "generated_candidates_count": 8,
      "matched_candidates_count": 5
    }
  },
  "candidates": [
    {
      "candidate_id": "candidate_a062dd17-d77a-4b1b-ad0e-de113e82f838",
      "name": "Figure AI",
      "url": "https://www.figure.ai",
      "description": "AI robotics company building general purpose humanoid robots",
      "match_status": "matched",
      "output": {
        "khosla_ventures_portfolio_check": {
          "value": "Khosla Ventures led the Series B round",
          "type": "match_condition",
          "is_matched": true
        },
        "founded_after_2020_check": {
          "value": "2022",
          "type": "match_condition",
          "is_matched": true
        }
      },
      "basis": [
        {
          "field": "khosla_ventures_portfolio_check",
          "citations": [
            {
              "title": "Figure AI raises $675M",
              "url": "https://techcrunch.com/2024/02/29/figure-ai-funding/",
              "excerpts": ["Khosla Ventures led the Series B round..."]
            }
          ],
          "reasoning": "Figure AI is backed by Khosla Ventures as confirmed by multiple funding announcements.",
          "confidence": "high"
        },
        {
          "field": "founded_after_2020_check",
          "citations": [
            {
              "title": "Figure AI - Company Profile",
              "url": "https://www.figure.ai/about",
              "excerpts": ["Founded in 2022 to build general purpose humanoid robots..."]
            }
          ],
          "reasoning": "Multiple sources confirm that Figure AI was founded in 2022, which is after 2020.",
          "confidence": "high"
        }
      ]
    }
    // ... additional candidates omitted for brevity ...
  ]
}
```

## Troubleshooting

<Accordion title="Run completed with 0 matched candidates">
  This typically happens when match conditions are too strict for the candidate pool. Try these fixes:

  1. **Relax match condition descriptions**: The ingest endpoint may generate overly strict conditions, especially for temporal queries. Edit condition descriptions to be more inclusive before creating the run.
  2. **Use a stronger generator**: `preview` evaluates \~10 candidates, `base` searches broadly, `core` searches deeper, and `pro` is the most thorough. A stronger generator evaluates more candidates, increasing the chance of finding matches.
  3. **Check temporal language**: Phrases like "founded after 2023" may be interpreted as "within the last year." Use explicit ranges (e.g., "founded in 2025 or later") for more predictable behavior.
  4. **Broaden your query**: If your criteria are very specific, consider starting broad and using [enrichments](/findall-api/features/findall-enrich) to filter results after matching.
  5. **Start with preview**: Always run with `generator: "preview"` first to validate your schema and see how conditions are being evaluated before committing to a full run.
</Accordion>

<Accordion title="Ingest generated unexpected conditions">
  The ingest endpoint interprets natural language heuristically. If the generated `match_conditions` don't match your intent:

  1. **Modify the conditions** before passing them to the create endpoint — see [Customizing the ingest schema](#customizing-the-ingest-schema) above.
  2. **Skip ingest entirely** and construct your own schema directly with `objective`, `entity_type`, and `match_conditions`.
  3. **Use the schema endpoint** on a completed run (`GET /v1beta/findall/runs/{findall_id}/schema`) to see what schema was used, then iterate on it.
</Accordion>

## Next Steps

* **[Candidates](/findall-api/core-concepts/findall-candidates)**: Understand candidate object structure, states, and exclusion
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[API Reference](/api-reference/findall-api-beta/create-findall-run)**: Complete endpoint documentation

## Rate Limits

See [Rate Limits](/getting-started/rate-limits) for default quotas and how to request higher limits.

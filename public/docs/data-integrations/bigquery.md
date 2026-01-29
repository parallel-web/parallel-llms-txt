> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Google BigQuery

> Enrich data at scale using Parallel's SQL-native remote functions for BigQuery

This integration is ideal for data engineers who need to enrich large datasets with web intelligence directly in their BigQuery pipelines—without leaving SQL or building custom API integrations.

Parallel provides SQL-native remote functions for Google BigQuery that enable data enrichment directly in your SQL queries. The integration uses Cloud Functions to securely connect BigQuery to the Parallel API.

<Tip>
  View the complete demo notebook:

  * [BigQuery Enrichment Demo](https://github.com/parallel-web/parallel-web-tools/blob/main/notebooks/bigquery_enrichment_demo.ipynb)
</Tip>

## Features

* **SQL-Native**: Use `parallel_enrich()` directly in BigQuery SQL queries
* **Secure**: API key stored in Secret Manager, accessed via Cloud Functions
* **Configurable Processors**: Choose from lite-fast to ultra for speed vs thoroughness tradeoffs
* **Structured Output**: Returns JSON that can be parsed with BigQuery's `JSON_EXTRACT_SCALAR()`

## Installation

```bash  theme={"system"}
pip install parallel-web-tools
```

<Note>
  The standalone `parallel-cli` binary does not include deployment commands. You must install via pip to deploy the BigQuery integration.
</Note>

## Deployment

Unlike Spark, the BigQuery integration requires a one-time deployment step to set up Cloud Functions and remote function definitions in your GCP project.

### Prerequisites

1. **Google Cloud Project** with billing enabled
2. **Parallel API Key** from [Parallel](https://platform.parallel.ai)
3. **Google Cloud SDK** installed and authenticated:

   ```bash  theme={"system"}
   gcloud auth login
   gcloud auth application-default login
   ```

### Deploy with CLI

```bash  theme={"system"}
parallel-cli enrich deploy --system bigquery \
    --project=your-gcp-project \
    --region=us-central1 \
    --api-key=your-parallel-api-key
```

This creates:

* Secret in Secret Manager for your API key
* Cloud Function (Gen2) that handles enrichment requests
* BigQuery Connection for remote function calls
* BigQuery Dataset (`parallel_functions`)
* Remote functions: `parallel_enrich()` and `parallel_enrich_company()`

<Info>
  For manual deployment options, troubleshooting, and cleanup instructions, see the [complete BigQuery setup guide](https://github.com/parallel-web/parallel-web-tools/blob/main/docs/bigquery-setup.md).
</Info>

## Basic Usage

Once deployed, use `parallel_enrich()` in any BigQuery SQL query:

```sql  theme={"system"}
SELECT
    name,
    `your-project.parallel_functions.parallel_enrich`(
        JSON_OBJECT('company_name', name, 'website', website),
        JSON_ARRAY('CEO name', 'Founding year', 'Brief description')
    ) as enriched_data
FROM your_dataset.companies
LIMIT 10;
```

Output:

```
+--------+----------------------------------------------------------------------------------------------------------------------+
| name   | enriched_data                                                                                                        |
+--------+----------------------------------------------------------------------------------------------------------------------+
| Google | {"ceo_name": "Sundar Pichai", "founding_year": "1998", "brief_description": "Google is an American...", "basis": []} |
| Apple  | {"ceo_name": "Tim Cook", "founding_year": "1976", "brief_description": "Apple Inc. is an American...", "basis": []}  |
+--------+----------------------------------------------------------------------------------------------------------------------+
```

### Function Parameters

| Parameter        | Type   | Description                                                   |
| ---------------- | ------ | ------------------------------------------------------------- |
| `input_data`     | `JSON` | JSON object with key-value pairs of input data for enrichment |
| `output_columns` | `JSON` | JSON array of descriptions for columns you want to enrich     |

### Parsing Results

The function returns JSON strings. Field names are converted to snake\_case (e.g., "CEO name" → `ceo_name`).

Use `JSON_EXTRACT_SCALAR()` to extract individual fields:

```sql  theme={"system"}
WITH enriched AS (
    SELECT
        name,
        `your-project.parallel_functions.parallel_enrich`(
            JSON_OBJECT('company_name', name),
            JSON_ARRAY('CEO name', 'Industry', 'Headquarters')
        ) as info
    FROM your_dataset.companies
)
SELECT
    name,
    JSON_EXTRACT_SCALAR(info, '$.ceo_name') as ceo,
    JSON_EXTRACT_SCALAR(info, '$.industry') as industry,
    JSON_EXTRACT_SCALAR(info, '$.headquarters') as hq
FROM enriched;
```

Output:

```
+--------+-------------+------------+---------------+
| name   | ceo         | industry   | hq            |
+--------+-------------+------------+---------------+
| Google | Sundar Pichai| Technology | Mountain View |
| Apple  | Tim Cook    | Technology | Cupertino     |
+--------+-------------+------------+---------------+
```

### Company Convenience Function

For common company enrichment use cases:

```sql  theme={"system"}
SELECT
    `your-project.parallel_functions.parallel_enrich_company`(
        'Google',
        'google.com',
        JSON_ARRAY('CEO name', 'Employee count', 'Stock ticker')
    ) as company_info;
```

## Processor Selection

Choose a processor based on your speed vs thoroughness requirements. See [Choose a Processor](/task-api/guides/choose-a-processor) for detailed guidance and [Pricing](/resources/pricing) for cost information.

To use a different processor, create a custom remote function with the desired processor in the `user_defined_context`:

```sql  theme={"system"}
CREATE OR REPLACE FUNCTION `your-project.parallel_functions.parallel_enrich_pro`(
    input_data STRING,
    output_columns STRING
)
RETURNS STRING
REMOTE WITH CONNECTION `your-project.us-central1.parallel-connection`
OPTIONS (
    endpoint = 'YOUR_FUNCTION_URL',
    user_defined_context = [("processor", "pro-fast")]
);
```

## Best Practices

<AccordionGroup>
  <Accordion title="Batch sizing">
    Process data in batches to manage costs and avoid timeouts:

    ```sql  theme={"system"}
    SELECT parallel_enrich(...) FROM companies LIMIT 100;
    ```
  </Accordion>

  <Accordion title="Error handling">
    Failed enrichments return JSON with an `error` field:

    ```json  theme={"system"}
    {"error": "error message here"}
    ```

    Filter these in your downstream processing.
  </Accordion>

  <Accordion title="Cost management">
    * Use `lite-fast` for high-volume, basic enrichments
    * Test with small batches before processing large tables
    * Store results to avoid re-enriching the same data
  </Accordion>
</AccordionGroup>

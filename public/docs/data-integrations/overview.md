> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Integrations

> Enrich your data with web intelligence directly in your favorite data tools

Parallel's data integrations let you enrich datasets with web intelligence without leaving your existing data workflows. Whether you're working with DataFrames in Python, SQL queries in a data warehouse, or analytics databases, there's an integration that fits your stack.

## How it works

All data integrations follow the same pattern:

1. **Define inputs**: Specify which columns contain the data to research (company name, website, etc.)
2. **Define outputs**: Describe what information you want to extract ("CEO name", "Founding year", etc.)
3. **Choose a processor**: Select speed vs thoroughness based on your needs
4. **Get enriched data**: Receive structured results with optional citations

## Available integrations

<CardGroup cols={2}>
  <Card title="Apache Spark" icon="bolt" href="/data-integrations/spark">
    Distributed enrichment for large-scale data processing with PySpark UDFs
  </Card>

  <Card title="Google BigQuery" icon="database" href="/data-integrations/bigquery">
    SQL-native remote functions for enrichment directly in BigQuery queries
  </Card>

  <Card title="Snowflake" icon="snowflake" href="/data-integrations/snowflake">
    SQL-native UDTF with batched processing via External Access Integration
  </Card>

  <Card title="DuckDB" icon="duck" href="/data-integrations/duckdb">
    Batch processing and SQL UDFs for local analytics databases
  </Card>

  <Card title="Polars" icon="table" href="/data-integrations/polars">
    DataFrame-native enrichment with batch processing and LazyFrame support
  </Card>

  <Card title="Supabase" icon="bolt" href="/data-integrations/supabase">
    Edge Functions for enrichment in Supabase applications
  </Card>
</CardGroup>

## Choosing an integration

| Integration   | Best for                            | Processing model                             |
| ------------- | ----------------------------------- | -------------------------------------------- |
| **Spark**     | Large-scale distributed processing  | UDF with concurrent processing per partition |
| **BigQuery**  | Google Cloud data warehouses        | Remote function with batched API calls       |
| **Snowflake** | Snowflake data warehouses           | Batched UDTF (partition-based)               |
| **DuckDB**    | Local analytics, embedded databases | Batch processing (recommended) or SQL UDF    |
| **Polars**    | Python DataFrame workflows          | Batch processing                             |
| **Supabase**  | PostgreSQL/Supabase applications    | Edge Function                                |

## Installation

All Python-based integrations are available via the `parallel-web-tools` package:

```bash  theme={"system"}
# Install with specific integration
pip install parallel-web-tools[polars]
pip install parallel-web-tools[duckdb]
pip install parallel-web-tools[spark]

# Install with all integrations
pip install parallel-web-tools[all]
```

For BigQuery and Snowflake, additional deployment steps are required to set up cloud functions and permissions. See the individual integration guides for details.

## Common patterns

### Input column mapping

All integrations use the same input mapping format—a dictionary where keys describe the data semantically and values reference your actual column names:

```python  theme={"system"}
input_columns = {
    "company_name": "name",      # "name" is the column in your data
    "website": "domain",         # "domain" is the column in your data
    "headquarters": "location",  # "location" is the column in your data
}
```

### Output column descriptions

Describe what you want to extract in plain language. Column names are automatically converted to valid identifiers:

```python  theme={"system"}
output_columns = [
    "CEO name",                           # → ceo_name
    "Founding year (YYYY format)",        # → founding_year
    "Annual revenue (USD, most recent)",  # → annual_revenue
]
```

## Next steps

<CardGroup cols={2}>
  <Card title="Choose a Processor" icon="microchip" href="/task-api/guides/choose-a-processor">
    Select the right processor based on speed vs thoroughness requirements
  </Card>

  <Card title="Task API" icon="rocket" href="/task-api/task-enrichment">
    Learn about the underlying Task API that powers all data integrations
  </Card>

  <Card title="Pricing" icon="dollar-sign" href="/resources/pricing">
    View detailed pricing for all processors and API endpoints
  </Card>
</CardGroup>

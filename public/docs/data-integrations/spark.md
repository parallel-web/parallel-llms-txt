> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Apache Spark

> Enrich data at scale using Parallel's SQL-native UDFs for Apache Spark

This integration is ideal for data engineers who need to enrich large datasets with web intelligence directly in their Spark pipelines—without leaving SQL or building custom API integrations.

Parallel provides SQL-native User Defined Functions (UDFs) for Apache Spark that enable data enrichment directly in your SQL queries. The UDFs process rows concurrently within each partition for optimal performance.

<Tip>
  View the complete demo notebooks:

  * [Spark Enrichment Demo](https://github.com/parallel-web/parallel-web-tools/blob/main/notebooks/spark_enrichment_demo.ipynb)
  * [Spark Streaming Demo](https://github.com/parallel-web/parallel-web-tools/blob/main/notebooks/spark_streaming_demo.ipynb)
</Tip>

## Features

* **SQL-Native**: Use `parallel_enrich()` directly in Spark SQL queries
* **Concurrent Processing**: All rows in each partition are processed concurrently using asyncio
* **Configurable Processors**: Choose from lite-fast to ultra for speed vs thoroughness tradeoffs
* **Structured Output**: Returns JSON that can be parsed with Spark's `from_json()`

## Installation

```bash  theme={"system"}
pip install parallel-web-tools[spark]
```

## Setup

1. Get your API key from [Parallel](https://platform.parallel.ai)
2. Register the UDFs with your Spark session:

```python  theme={"system"}
from pyspark.sql import SparkSession
from parallel_web_tools.integrations.spark import register_parallel_udfs

# Create Spark session
spark = SparkSession.builder.appName("parallel-enrichment").getOrCreate()

# Register UDFs (uses PARALLEL_API_KEY env var by default)
register_parallel_udfs(spark)

# Or pass API key explicitly
register_parallel_udfs(spark, api_key="your-api-key")
```

### Configuration Options

```python  theme={"system"}
register_parallel_udfs(
    spark,
    api_key="your-api-key",      # Optional: defaults to PARALLEL_API_KEY env var
    processor="lite-fast",        # Processor tier (default: lite-fast)
    timeout=300,                  # Timeout per API call in seconds (default: 300)
    include_basis=False,          # Include citations in response (default: False)
    udf_name="parallel_enrich",   # Custom UDF name (default: parallel_enrich)
)
```

## Basic Usage

Once registered, use `parallel_enrich()` in any SQL query:

```python  theme={"system"}
# Create sample data
spark.sql("""
    CREATE OR REPLACE TEMP VIEW companies AS
    SELECT 'Google' as company_name, 'https://google.com' as website
    UNION ALL
    SELECT 'Apple', 'https://apple.com'
""")

# Enrich with Parallel
result = spark.sql("""
    SELECT
        company_name,
        parallel_enrich(
            map('company_name', company_name, 'website', website),
            array('CEO name', 'company description', 'founding year')
        ) as enriched_data
    FROM companies
""")

result.show(truncate=False)
```

Output:

```
+------------+-------------------------------------------------------------------------------------------------------------+
|company_name|enriched_data                                                                                                |
+------------+-------------------------------------------------------------------------------------------------------------+
|Google      |{"ceo_name": "Sundar Pichai", "founding_year": "1998", "company_description": "Google is an American..."}    |
|Apple       |{"ceo_name": "Tim Cook", "founding_year": "1976", "company_description": "Apple Inc. is an American..."}     |
+------------+-------------------------------------------------------------------------------------------------------------+
```

### UDF Parameters

| Parameter        | Type                  | Description                                    |
| ---------------- | --------------------- | ---------------------------------------------- |
| `input_data`     | `map<string, string>` | Key-value pairs of input data for enrichment   |
| `output_columns` | `array<string>`       | Descriptions of the columns you want to enrich |

### Parsing Results

The UDF returns JSON strings. Field names are converted to snake\_case (e.g., "CEO name" → `ceo_name`).

Use `get_json_object()` to extract individual fields:

```python  theme={"system"}
from pyspark.sql.functions import get_json_object

result = spark.sql("""
    SELECT
        company_name,
        get_json_object(enriched_data, '$.ceo_name') as ceo,
        get_json_object(enriched_data, '$.founding_year') as founded
    FROM (
        SELECT
            company_name,
            parallel_enrich(
                map('company_name', company_name),
                array('CEO name', 'founding year')
            ) as enriched_data
        FROM companies
    )
""")

result.show()
```

Output:

```
+------------+-------------+-------+
|company_name|          ceo|founded|
+------------+-------------+-------+
|      Google|Sundar Pichai|   1998|
|       Apple|     Tim Cook|   1976|
+------------+-------------+-------+
```

Or use `from_json()` with a schema for structured parsing:

```python  theme={"system"}
from pyspark.sql.functions import col, from_json
from pyspark.sql.types import StructType, StructField, StringType

schema = StructType([
    StructField("ceo_name", StringType()),
    StructField("founding_year", StringType()),
])

parsed = result.withColumn("parsed", from_json(col("enriched_data"), schema))
parsed.select("company_name", "parsed.*").show()
```

Output:

```
+------------+-------------+-------------+
|company_name|     ceo_name|founding_year|
+------------+-------------+-------------+
|      Google|Sundar Pichai|         1998|
|       Apple|     Tim Cook|         1976|
+------------+-------------+-------------+
```

## Including Basis/Citations

To include source citations in your enrichment results, set `include_basis=True`:

```python  theme={"system"}
register_parallel_udfs(
    spark,
    include_basis=True,
    udf_name="parallel_enrich_with_basis",
)

result = spark.sql("""
    SELECT parallel_enrich_with_basis(
        map('company_name', company_name),
        array('CEO name')
    ) as enriched
    FROM companies
""")

result.show(truncate=False)
```

Output (truncated):

```
+---------------------------------------------------------------------------------------------+
|enriched                                                                                     |
+---------------------------------------------------------------------------------------------+
|{"ceo_name": "Sundar Pichai", "_basis": [{"field": "ceo_name", "citations": [...]}]}         |
|{"ceo_name": "Tim Cook", "_basis": [{"field": "ceo_name", "citations": [...]}]}              |
+---------------------------------------------------------------------------------------------+
```

When enabled, each result includes a `_basis` field with citations:

```json  theme={"system"}
{
  "ceo_name": "Sundar Pichai",
  "_basis": [
    {
      "field": "ceo_name",
      "citations": [
        {"url": "https://...", "excerpts": ["..."]}
      ]
    }
  ]
}
```

## Processor Selection

Choose a processor based on your speed vs thoroughness requirements. See [Choose a Processor](/task-api/guides/choose-a-processor) for detailed guidance and [Pricing](/resources/pricing) for cost information.

Use the `parallel_enrich_with_processor` UDF to override per query:

```sql  theme={"system"}
SELECT parallel_enrich_with_processor(
    map('company_name', company_name),
    array('CEO name'),
    'pro-fast'  -- Override processor
) as enriched
FROM companies
LIMIT 1
```

Output:

```
+-----------------------------+
|enriched                     |
+-----------------------------+
|{"ceo_name": "Sundar Pichai"}|
+-----------------------------+
```

## Best Practices

<AccordionGroup>
  <Accordion title="Partition sizing">
    The UDF processes all rows in a partition concurrently. For optimal performance:

    * Use `repartition()` to control partition sizes
    * Aim for 10-100 rows per partition for balanced concurrency
  </Accordion>

  <Accordion title="Error handling">
    Failed enrichments return JSON with an `error` field:

    ```json  theme={"system"}
    {"error": "error message here"}
    ```

    Filter these in your downstream processing.
  </Accordion>

  <Accordion title="Rate limits">
    Concurrent processing respects Parallel's rate limits. For large datasets, consider:

    * Reducing partition sizes
    * Using slower processors that have higher rate limits
  </Accordion>
</AccordionGroup>

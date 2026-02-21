> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Polars

> Enrich data at scale using Parallel's native Polars integration for DataFrames

This integration is ideal for data scientists and engineers who work with Polars DataFrames and need to enrich data with web intelligence directly in their Python workflows.

Parallel provides a native Polars integration that enables DataFrame-native data enrichment with batch processing for efficiency.

<Tip>
  View the complete demo notebook:

  * [Polars Enrichment Demo](https://github.com/parallel-web/parallel-web-tools/blob/main/notebooks/polars_enrichment_demo.ipynb)
</Tip>

## Features

* **DataFrame-Native**: Enriched columns added directly to your Polars DataFrame
* **Batch Processing**: All rows processed in a single API call for efficiency
* **LazyFrame Support**: Works with both eager and lazy DataFrames
* **Partial Results**: Failed rows return `None` without stopping the entire batch

## Installation

```bash  theme={"system"}
pip install parallel-web-tools[polars]
```

Or with all dependencies:

```bash  theme={"system"}
pip install parallel-web-tools[all]
```

## Basic Usage

```python  theme={"system"}
import polars as pl
from parallel_web_tools.integrations.polars import parallel_enrich

# Create a DataFrame
df = pl.DataFrame({
    "company": ["Google", "Microsoft", "Apple"],
    "website": ["google.com", "microsoft.com", "apple.com"],
})

# Enrich with company information
result = parallel_enrich(
    df,
    input_columns={
        "company_name": "company",
        "website": "website",
    },
    output_columns=[
        "CEO name",
        "Founding year",
        "Headquarters city",
    ],
)

# Access the enriched DataFrame
print(result.result)
print(f"Success: {result.success_count}, Errors: {result.error_count}")
```

Output:

| company   | website       | ceo\_name     | founding\_year | headquarters\_city |
| --------- | ------------- | ------------- | -------------- | ------------------ |
| Google    | google.com    | Sundar Pichai | 1998           | Mountain View      |
| Microsoft | microsoft.com | Satya Nadella | 1975           | Redmond            |
| Apple     | apple.com     | Tim Cook      | 1976           | Cupertino          |

### Function Parameters

| Parameter        | Type             | Default       | Description                                               |
| ---------------- | ---------------- | ------------- | --------------------------------------------------------- |
| `df`             | `pl.DataFrame`   | required      | DataFrame to enrich                                       |
| `input_columns`  | `dict[str, str]` | required      | Mapping of input descriptions to column names             |
| `output_columns` | `list[str]`      | required      | List of output column descriptions                        |
| `api_key`        | `str \| None`    | `None`        | API key (uses `PARALLEL_API_KEY` env var if not provided) |
| `processor`      | `str`            | `"lite-fast"` | Parallel processor to use                                 |
| `timeout`        | `int`            | `600`         | Timeout in seconds                                        |
| `include_basis`  | `bool`           | `False`       | Include citations in results                              |

### Return Value

The function returns an `EnrichmentResult` dataclass:

```python  theme={"system"}
@dataclass
class EnrichmentResult:
    result: pl.DataFrame      # Enriched DataFrame
    success_count: int        # Number of successful rows
    error_count: int          # Number of failed rows
    errors: list[dict]        # Error details with row index
    elapsed_time: float       # Processing time in seconds
```

### Column Name Mapping

Output column descriptions are automatically converted to valid Python identifiers. Field names are converted to snake\_case:

| Description              | Column Name      |
| ------------------------ | ---------------- |
| `"CEO name"`             | `ceo_name`       |
| `"Founding year (YYYY)"` | `founding_year`  |
| `"Annual revenue [USD]"` | `annual_revenue` |

## LazyFrame Support

Use `parallel_enrich_lazy()` to work with LazyFrames:

```python  theme={"system"}
from parallel_web_tools.integrations.polars import parallel_enrich_lazy

# Read from CSV lazily
lf = pl.scan_csv("companies.csv")

# Filter and select
lf = lf.filter(pl.col("active") == True).select(["name", "website"])

# Enrich (will collect the LazyFrame)
result = parallel_enrich_lazy(
    lf,
    input_columns={"company_name": "name", "website": "website"},
    output_columns=["CEO name"],
)
```

## Including Citations

```python  theme={"system"}
result = parallel_enrich(
    df,
    input_columns={"company_name": "company"},
    output_columns=["CEO name"],
    include_basis=True,
)

# Access citations in the _basis column
for row in result.result.iter_rows(named=True):
    print(f"CEO: {row['ceo_name']}")
    print(f"Sources: {row['_basis']}")
```

## Processor Selection

Choose a processor based on your speed vs thoroughness requirements. See [Choose a Processor](/task-api/guides/choose-a-processor) for detailed guidance and [Pricing](/resources/pricing) for cost information.

| Processor   | Speed   | Best For                    |
| ----------- | ------- | --------------------------- |
| `lite-fast` | Fastest | Basic metadata, high volume |
| `base-fast` | Fast    | Standard enrichments        |
| `core-fast` | Medium  | Cross-referenced data       |
| `pro-fast`  | Slower  | Deep research               |

## Best Practices

<AccordionGroup>
  <Accordion title="Use specific descriptions">
    Be specific in your output column descriptions for better results:

    ```python  theme={"system"}
    output_columns = [
        "CEO name (current CEO or equivalent leader)",
        "Founding year (YYYY format)",
        "Annual revenue (USD, most recent fiscal year)",
    ]
    ```
  </Accordion>

  <Accordion title="Handle errors gracefully">
    Errors don't stop processing - partial results are returned:

    ```python  theme={"system"}
    result = parallel_enrich(df, ...)

    if result.error_count > 0:
        print(f"Failed rows: {result.error_count}")
        for error in result.errors:
            print(f"  Row {error['row']}: {error['error']}")

    # Filter successful rows
    successful_df = result.result.filter(pl.col("ceo_name").is_not_null())
    ```
  </Accordion>

  <Accordion title="Batch large datasets">
    For very large datasets (1000+ rows), consider processing in batches:

    ```python  theme={"system"}
    def enrich_in_batches(df: pl.DataFrame, batch_size: int = 100):
        results = []
        for i in range(0, len(df), batch_size):
            batch = df.slice(i, batch_size)
            result = parallel_enrich(batch, ...)
            results.append(result.result)
        return pl.concat(results)
    ```
  </Accordion>

  <Accordion title="Cost management">
    * Use `lite-fast` for high-volume, basic enrichments
    * Test with small batches before processing large DataFrames
    * Store results to avoid re-enriching the same data
  </Accordion>
</AccordionGroup>

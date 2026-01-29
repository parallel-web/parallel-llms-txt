> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Snowflake

> Enrich data at scale using Parallel's SQL-native UDTF for Snowflake

This integration is ideal for data engineers who need to enrich large datasets with web intelligence directly in their Snowflake pipelines—without leaving SQL or building custom API integrations.

Parallel provides a SQL-native User Defined Table Function (UDTF) for Snowflake that enables data enrichment directly in your SQL queries. The integration uses Snowflake's External Access feature to securely connect to the Parallel API, and batches all rows in a partition into a single API call for efficient processing.

<Tip>
  View the complete demo notebook:

  * [Snowflake Enrichment Demo](https://github.com/parallel-web/parallel-web-tools/blob/main/notebooks/snowflake_enrichment_demo.ipynb)
</Tip>

## Features

* **SQL-Native**: Use `parallel_enrich()` directly in Snowflake SQL queries
* **Batched Processing**: All rows in a partition are sent in a single API call using `end_partition()`
* **Secure**: API key stored as Snowflake Secret, accessed via External Access Integration
* **Configurable Processors**: Choose from lite-fast to pro for speed vs thoroughness tradeoffs
* **Structured Output**: Returns VARIANT columns for input and enriched data

## Installation

```bash  theme={"system"}
pip install parallel-web-tools[snowflake]
```

<Note>
  The standalone `parallel-cli` binary does not include deployment commands. You must install via pip with the `[snowflake]` extra to deploy the Snowflake integration.
</Note>

## Deployment

The Snowflake integration requires a one-time deployment step to set up the External Access Integration, secrets, and UDTF in your Snowflake account.

### Prerequisites

1. **Snowflake Account** - Paid account required (trial accounts don't support External Access)
2. **ACCOUNTADMIN Role** - Required for creating External Access Integrations
3. **Parallel API Key** from [Parallel](https://platform.parallel.ai)

### Finding Your Account Identifier

Your Snowflake account identifier is in your Snowsight URL:

```
https://app.snowflake.com/ORGNAME/ACCOUNTNAME/worksheets
                         └───────┬───────────┘
                     Account: ORGNAME-ACCOUNTNAME
```

### Deploy with CLI

```bash  theme={"system"}
parallel-cli enrich deploy --system snowflake \
    --account ORGNAME-ACCOUNTNAME \
    --user your-username \
    --password "your-password" \
    --warehouse COMPUTE_WH
```

If your account requires MFA:

```bash  theme={"system"}
parallel-cli enrich deploy --system snowflake \
    --account ORGNAME-ACCOUNTNAME \
    --user your-username \
    --password "your-password" \
    --authenticator username_password_mfa \
    --passcode 123456 \
    --warehouse COMPUTE_WH
```

This creates:

* Database: `PARALLEL_INTEGRATION`
* Schema: `ENRICHMENT`
* Network rule for `api.parallel.ai`
* Secret with your API key
* External Access Integration
* `parallel_enrich()` UDTF (batched table function)
* Roles: `PARALLEL_DEVELOPER` and `PARALLEL_USER`

<Info>
  For manual deployment options (useful if you don't have ACCOUNTADMIN), troubleshooting, MFA setup, and cleanup instructions, see the [complete Snowflake setup guide](https://github.com/parallel-web/parallel-web-tools/blob/main/docs/snowflake-setup.md).
</Info>

## Basic Usage

The `parallel_enrich()` function is a table function (UDTF) that requires the `TABLE(...) OVER (PARTITION BY ...)` syntax:

```sql  theme={"system"}
WITH companies AS (
    SELECT * FROM (VALUES
        ('Google', 'google.com'),
        ('Anthropic', 'anthropic.com'),
        ('Apple', 'apple.com')
    ) AS t(company_name, website)
)
SELECT
    e.input:company_name::STRING AS company_name,
    e.input:website::STRING AS website,
    e.enriched:ceo_name::STRING AS ceo_name,
    e.enriched:founding_year::STRING AS founding_year
FROM companies t,
     TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
         TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name, 'website', t.website)),
         ARRAY_CONSTRUCT('CEO name', 'Founding year')
     ) OVER (PARTITION BY 1)) e;
```

Output:

| company\_name | website       | ceo\_name     | founding\_year |
| ------------- | ------------- | ------------- | -------------- |
| Google        | google.com    | Sundar Pichai | 1998           |
| Anthropic     | anthropic.com | Dario Amodei  | 2021           |
| Apple         | apple.com     | Tim Cook      | 1976           |

### Function Parameters

| Parameter        | Type      | Description                                          |
| ---------------- | --------- | ---------------------------------------------------- |
| `input_json`     | `VARCHAR` | JSON string via `TO_JSON(OBJECT_CONSTRUCT(...))`     |
| `output_columns` | `ARRAY`   | Array of descriptions for columns you want to enrich |
| `processor`      | `VARCHAR` | (Optional) Processor to use (default: `lite-fast`)   |

### Return Values

The function returns a table with two VARIANT columns:

| Column     | Description                                    |
| ---------- | ---------------------------------------------- |
| `input`    | Original input data as VARIANT                 |
| `enriched` | Enrichment results including `basis` citations |

The `enriched` column contains:

```json  theme={"system"}
{
  "ceo_name": "Sundar Pichai",
  "founding_year": "1998",
  "basis": [{"field": "ceo_name", "citations": [...], "confidence": "high"}]
}
```

Field names are automatically converted to snake\_case (e.g., "CEO name" → `ceo_name`).

### Custom Processor

Override the default processor by adding a third parameter:

```sql  theme={"system"}
SELECT
    e.input:company_name::STRING AS company_name,
    e.enriched:ceo_name::STRING AS ceo_name
FROM companies t,
     TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
         TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name)),
         ARRAY_CONSTRUCT('CEO name'),
         'base-fast'  -- processor option
     ) OVER (PARTITION BY 1)) e;
```

## Batching with PARTITION BY

The `PARTITION BY` clause controls how rows are batched into API calls. All rows in the same partition are sent together in a single API request.

### All Rows in One Batch

```sql  theme={"system"}
-- Single API call for all rows (fastest for small datasets)
TABLE(parallel_enrich(...) OVER (PARTITION BY 1))
```

### Batch by Column

```sql  theme={"system"}
-- One API call per region
SELECT
    e.input:company_name::STRING AS company_name,
    e.enriched:ceo_name::STRING AS ceo_name
FROM companies t,
     TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
         TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name, 'region', t.region)),
         ARRAY_CONSTRUCT('CEO name')
     ) OVER (PARTITION BY t.region)) e;
```

### Fixed Batch Sizes

```sql  theme={"system"}
-- Process in batches of 100 rows
WITH numbered AS (
    SELECT *, CEIL(ROW_NUMBER() OVER (ORDER BY company_name) / 100.0) AS batch_id
    FROM companies
)
SELECT
    e.input:company_name::STRING AS company_name,
    e.enriched:ceo_name::STRING AS ceo_name
FROM numbered t,
     TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
         TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name)),
         ARRAY_CONSTRUCT('CEO name')
     ) OVER (PARTITION BY t.batch_id)) e;
```

### Choosing a Partition Strategy

| Pattern                 | Use Case                                                  |
| ----------------------- | --------------------------------------------------------- |
| `PARTITION BY 1`        | Small datasets (under 1000 rows), fastest for few rows    |
| `PARTITION BY column`   | Large datasets, natural groupings, incremental processing |
| `PARTITION BY batch_id` | Fixed batch sizes for very large datasets                 |

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
  <Accordion title="Use PARTITION BY 1 for small datasets">
    For smaller datasets, batch all rows together for maximum efficiency:

    ```sql  theme={"system"}
    TABLE(parallel_enrich(...) OVER (PARTITION BY 1))
    ```
  </Accordion>

  <Accordion title="Use specific descriptions">
    Be specific in your output column descriptions for better results:

    ```sql  theme={"system"}
    ARRAY_CONSTRUCT(
        'CEO name (current CEO or equivalent leader)',
        'Founding year (YYYY format)'
    )
    ```
  </Accordion>

  <Accordion title="Cache results">
    Store enriched results in a table to avoid re-processing:

    ```sql  theme={"system"}
    CREATE TABLE enriched_companies AS
    SELECT
        e.input:company_name::STRING AS company_name,
        e.enriched:ceo_name::STRING AS ceo_name,
        e.enriched:founding_year::STRING AS founding_year
    FROM companies t,
         TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
             TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name)),
             ARRAY_CONSTRUCT('CEO name', 'Founding year')
         ) OVER (PARTITION BY 1)) e;
    ```
  </Accordion>

  <Accordion title="Incremental processing">
    Process new records daily using date partitioning:

    ```sql  theme={"system"}
    SELECT e.*
    FROM companies t,
         TABLE(PARALLEL_INTEGRATION.ENRICHMENT.parallel_enrich(
             TO_JSON(OBJECT_CONSTRUCT('company_name', t.company_name)),
             ARRAY_CONSTRUCT('CEO name')
         ) OVER (PARTITION BY DATE_TRUNC('day', t.created_at))) e
    WHERE t.created_at >= CURRENT_DATE;
    ```
  </Accordion>
</AccordionGroup>

## Security

The integration uses Snowflake's security features:

1. **Network Rule**: Only allows egress to `api.parallel.ai:443`
2. **Secret**: API key stored encrypted (not visible in SQL)
3. **External Access Integration**: Combines network rule and secret
4. **Roles**: `PARALLEL_USER` for query access, `PARALLEL_DEVELOPER` for UDF management

Grant access to users:

```sql  theme={"system"}
GRANT ROLE PARALLEL_USER TO USER analyst_user;
```

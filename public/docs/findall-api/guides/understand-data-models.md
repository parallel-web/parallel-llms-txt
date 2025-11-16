# Understand Data Models

> Descriptions and examples for each of the FindAll Data Models

### Column Types

FindAll uses two types of columns:

* **Constraint**: Boolean criteria that entities must satisfy (e.g., "is an AI company")
* **Enrichment**: Attributes to extract for matching entities (e.g., "CEO name")

### Constraint Results

Constraint results can have the following values:

* `yes`: Entity clearly meets the criteria
* `not_sure`: Insufficient information
* `no`: Entity does not meet criteria
* `skipped`: Constraint not evaluated

Each constraint result also includes:

* `confidence`: Level of confidence in the result (`high`, `medium`, `low`)
* `reasoning`: Detailed explanation of the decision
* `citations`: URLs supporting the reasoning

### Entity Scoring

Each result includes:

* **score**: Score to rank the results, higher means better match for constraints
* **pages\_read**: Number of web pages analyzed for this entity
* **pages\_considered**: Total pages evaluated for this entity

### Response Metadata

Poll responses include additional metadata:

* **pages\_read**: Total web pages analyzed across all entities
* **pages\_considered**: Total web pages evaluated across all entities
* **billing\_metrics**: Cost tracking information
  * `cost_mode`: Processor used (`base` or `pro`)
  * `rows_processed`: Number of entities processed
  * `enrichment_cells`: Number of enrichment fields populated
* **are\_enrichments\_active**: Whether enrichments are still running
* **filters**: Array of constraint definitions with status
* **enrichments**: Array of enrichment definitions with status

**Important**: When polling, check both `is_active` AND `are_enrichments_active` to determine if the run is truly complete. A run is finished only when both fields are `false`.

### Processing Steps

FindAll runs follow these steps:

1. **understanding\_question**: Parse and understand the natural language query
2. **gen\_candidates\_step**: Generate potential entity candidates using Parallel Index
3. **filter\_candidates\_step**: Process candidates using constraints and enrichments

Each step has a `status` field: `running`, `done`, or `failed`.

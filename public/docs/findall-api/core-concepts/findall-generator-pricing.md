# Generators and Pricing

> FindAll API pricing structure and generators

FindAll offers different generators that determine both the quality and cost of FindAll run result.

## Generators

| Generator | Fixed Cost | Per Match | Best For                                                  |
| --------- | ---------- | --------- | --------------------------------------------------------- |
| `base`    | \$0.25     | \$0.03    | Broad, common queries where you expect many matches       |
| `core`    | \$2.00     | \$0.15    | Specific queries with moderate expected matches           |
| `pro`     | \$10.00    | \$1.00    | Highly specific queries with rare or hard-to-find matches |
| `preview` | \$0.10     | \$0.00    | Testing queries (\~10 candidates)                         |

### Cost Formula

The total cost of a FindAll run includes the generator costs plus any enrichment costs:

<div align="right">
  $$
  \begin{aligned}
  \text{total cost} &= \text{fixed cost} + (\text{cost per match} \times \text{\# matches}) \\
                    &\quad + \sum (\text{enrichment processor cost} \times \text{\# matches})
  \end{aligned}
  $$
</div>

**Where:**

* **Fixed cost** and **cost per match** come from your chosen generator (`base`, `core`, or `pro`)
* **Enrichment processor cost** is determined by the [Task API processor](/task-api/guides/choose-a-processor) you select for each [enrichment](/findall-api/features/findall-enrich)
* The enrichment sum applies across all enrichments you add (you can add multiple enrichments using different processors)

### Examples

All examples assume 50 matches:

| FindAll Generator | Enrichment Processors | Generator Cost                  | Enrichment Cost                         | Total Cost  |
| ----------------- | --------------------- | ------------------------------- | --------------------------------------- | ----------- |
| `base`            | None                  | \$0.25 + (50 × \$0.03) = \$1.75 | \$0.00                                  | **\$1.75**  |
| `base`            | 1 `lite`              | \$0.25 + (50 × \$0.03) = \$1.75 | 50 × \$0.005 = \$0.25                   | **\$2.00**  |
| `core`            | None                  | \$2 + (50 × \$0.15) = \$9.50    | \$0.00                                  | **\$9.50**  |
| `core`            | 1 `base`, 1 `lite`    | \$2 + (50 × \$0.15) = \$9.50    | (50 × \$0.01) + (50 × \$0.005) = \$0.75 | **\$10.25** |
| `pro`             | None                  | \$10 + (50 × \$1.00) = \$60.00  | \$0.00                                  | **\$60.00** |
| `pro`             | 2 `core`              | \$10 + (50 × \$1.00) = \$60.00  | 2 × (50 × \$0.025) = \$2.50             | **\$62.50** |

## How to Choose

### 1. Start with Preview

Always test your query with `preview` first to validate your approach and get a sense of how many matches to expect. See [Preview](/findall-api/features/findall-preview).

### 2. Choosing the Right Generator

Based on your preview results and query characteristics:

**Choose `base` when:**

* You expect many matches (e.g., "companies in healthcare")
* Your query has broad criteria that are common
* You're searching for fewer than 20 matches where the low fixed cost matters most

**Choose `core` when:**

* You expect a moderate number of matches (e.g., "healthcare companies using AI for diagnostics")
* Your query is fairly specific but not extremely rare
* You need between 20-50 matches

**Choose `pro` when:**

* You expect few matches or very specific criteria (e.g., "Series A healthcare AI companies with FDA-approved products")
* Your query requires the most thorough and comprehensive search
* The higher per-match cost is acceptable for your use case

**Note:** For match counts above 50, the per-match cost becomes more significant than the fixed cost in your total bill. When using enrichments, consider that enrichment costs also scale with the number of matches.

## Enrichment Pricing Considerations

When adding [enrichments](/findall-api/features/findall-enrich) to extract additional data from your matches, each enrichment adds its own per-match cost based on the [Task API processor](/task-api/guides/choose-a-processor) you choose:

* **`lite` processor**: \$0.005 per match (best for simple data extraction)
* **`base` processor**: \$0.01 per match (reliable for standard enrichments)
* **`core` processor**: \$0.025 per match (for cross-referenced data)
* **`core2x` processor**: \$0.05 per match (for high-complexity cross-referenced data)
* **`pro` processor**: \$0.10 per match (for exploratory research)
* **`ultra` processor**: \$0.30 per match (for deep research)

Since enrichments run on every match and you can add multiple enrichments, they can significantly impact your total costs for high-match queries. Choose enrichment processors based on the complexity of data extraction needed.

## Additional Notes

* **[Extend Runs](/findall-api/features/findall-extend)**: Fixed cost is not charged again, only per-match costs for new matches. If enrichments are present, they also run on new matches at the same enrichment processor cost.
* **[Enrichments](/findall-api/features/findall-enrich)**: Enrichments are charged based on [Task API processor pricing](/task-api/guides/choose-a-processor) × number of matches. You can add multiple enrichments using different processors, and each enrichment's cost is calculated separately.
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: You're charged for work completed before cancellation, including any enrichments that finished.

**Tip:** If a run terminates early, consider using a more advanced generator (like `pro` instead of `base`) or refining your query criteria to be more achievable.

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Task API Processors](/task-api/guides/choose-a-processor)**: Understand processor options and pricing for enrichments
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](https://docs.parallel.ai/api-reference/findall-api-beta/create-findall-run#body-generator)**: Complete endpoint documentation

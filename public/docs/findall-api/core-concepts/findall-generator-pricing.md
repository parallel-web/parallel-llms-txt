# Generators

> Choose the right FindAll generator (preview, base, core, pro) based on query complexity and expected match volume

FindAll offers different generators that determine the quality and thoroughness of FindAll run results. See [Pricing](/pricing) for generator costs and all API rates.

## Generators

| Generator | Best For                                                  |
| --------- | --------------------------------------------------------- |
| `preview` | Testing queries (\~10 candidates)                         |
| `base`    | Broad, common queries where you expect many matches       |
| `core`    | Specific queries with moderate expected matches           |
| `pro`     | Highly specific queries with rare or hard-to-find matches |

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

## Enrichments

When adding [enrichments](/findall-api/features/findall-enrich) to extract additional data from your matches, each enrichment adds its own per-match cost based on the [Task API processor](/task-api/guides/choose-a-processor) you choose. Since enrichments run on every match and you can add multiple enrichments, they can significantly impact your total costs for high-match queries. Choose enrichment processors based on the complexity of data extraction needed.

## Additional Notes

* **[Extend Runs](/findall-api/features/findall-extend)**: Fixed cost is not charged again, only per-match costs for new matches. If enrichments are present, they also run on new matches at the same enrichment processor cost.
* **[Enrichments](/findall-api/features/findall-enrich)**: Enrichments are charged based on Task API processor pricing × number of matches. You can add multiple enrichments using different processors, and each enrichment's cost is calculated separately.
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: You're charged for work completed before cancellation, including any enrichments that finished.

**Tip:** If a run terminates early, consider using a more advanced generator (like `pro` instead of `base`) or refining your query criteria to be more achievable.

## Related Topics

* **[Pricing](/pricing)**: Consolidated pricing for all Parallel APIs
* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Task API Processors](/task-api/guides/choose-a-processor)**: Understand processor options for enrichments
* **[Extend Runs](/findall-api/features/findall-extend)**: Increase match limits without paying new fixed costs
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](https://docs.parallel.ai/api-reference/findall-api-beta/create-findall-run#body-generator)**: Complete endpoint documentation


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.parallel.ai/llms.txt
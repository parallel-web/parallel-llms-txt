# Extend

> Increase the match limit of existing FindAll runs to get more results without changing query criteria

## Overview

Extend allows you to increase the `match_limit` of an existing FindAll run to get more results using the same evaluation criteria—without paying the fixed cost again. Start with a small limit (10-20) to validate your criteria, then extend to get more matches.

```bash  theme={"system"}
curl -X POST "https://api.parallel.ai/v1beta/findall/runs/{findall_id}/extend" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "parallel-beta: findall-2025-09-15" \
  -H "Content-Type: application/json" \
  -d '{ "match_limit": 50 }'
``'
```

### How Extend Works

* **Increases match limit:** The `match_limit` you set is the **total** desired number of matches (not incremental). For example, to go from 10 to 50 matches, set `match_limit: 50`, not `40`.
* **Continues the same evaluation:** All other parameters—**processor**, **filters**, **enrichments**, and **match conditions**—stay exactly the same as the original run.
* **Handles run status automatically:**
  * If the run is *active*, it continues seamlessly up to the new match limit.
  * If the run is *completed*, it automatically "respawns" and resumes until reaching the new limit.
* **Pricing:** Extending has **no fixed cost—you only pay for the additional matches beyond the original run**. For example, extending from 10 to 100 matches means paying for 90 additional matches (plus evaluation costs).

### Limitations

* **Preview runs:** Cannot be extended. Use a full processor (`base`, `core`, or `pro`) if you plan to extend.
* **Fixed parameters:** Cannot modify processor, filters, enrichments, or match conditions. Start a new run to change criteria.
* **Candidate reuse:** May process previously evaluated candidates before finding new ones. Start a new run for time-sensitive searches.

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand processor options, pricing, and selectivity requirements
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](https://docs.parallel.ai/api-reference/findall-api-beta/extend-findall-run)**: Complete endpoint documentation

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Extend

> Increase the match limit of existing FindAll runs to get more results without changing query criteria

## Overview

Extend allows you to increase the `match_limit` of an existing FindAll run to get more results using the same evaluation criteria—without paying the fixed cost again. Start with a small limit (10-20) to validate your criteria, then extend to get more matches.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1beta/findall/runs/findall_40e0ab8c10754be0b7a16477abb38a2f/extend" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: findall-2025-09-15" \
    -H "Content-Type: application/json" \
    -d '{ "additional_match_limit": 40 }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  client.beta.findall.extend(
      findall_id="findall_40e0ab8c10754be0b7a16477abb38a2f",
      additional_match_limit=40
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  await client.beta.findall.extend({
    findallId: "findall_40e0ab8c10754be0b7a16477abb38a2f",
    additional_match_limit: 40
  });
  ```
</CodeGroup>

### How Extend Works

* **Increases match limit:** The `additional_match_limit` you set is the **incremental** number of matches to add (not the total). For example, to go from 10 to 50 matches, set `additional_match_limit: 40`, not `50`.
* **Continues the same evaluation:** All other parameters—**generator**, **filters**, **enrichments**, and **match conditions**—stay exactly the same as the original run.
* **Handles run status automatically:**
  * If the run is *active*, it continues seamlessly up to the new match limit.
  * If the run is *completed*, it automatically "respawns" and resumes until reaching the new limit.
* **Pricing:** Extending has **no fixed cost—you only pay for the additional matches beyond the original run**. For example, extending from 10 to 100 matches means paying for 90 additional matches (plus evaluation costs).

### Limitations

* **Preview runs:** Cannot be extended. Use a full generator (`base`, `core`, or `pro`) if you plan to extend.
* **Fixed parameters:** Cannot modify processor, filters, enrichments, or match conditions. Start a new run to change criteria.nerator
* **Candidate reuse:** May process previously evaluated candidates before finding new ones. Start a new run for time-sensitive searches.

## Related Topics

* **[Preview](/findall-api/features/findall-preview)**: Test queries with \~10 candidates before running full searches
* **[Generators and Pricing](/findall-api/core-concepts/findall-generator-pricing)**: Understand generator options and pricing
* **[Enrichments](/findall-api/features/findall-enrich)**: Extract additional structured data for matched candidates
* **[Streaming Events](/findall-api/features/findall-sse)**: Receive real-time updates via Server-Sent Events
* **[Webhooks](/findall-api/features/findall-webhook)**: Configure HTTP callbacks for run completion and matches
* **[Run Lifecycle](/findall-api/core-concepts/findall-lifecycle)**: Understand run statuses and how to cancel runs
* **[API Reference](/api-reference/findall-api-beta/extend-findall-run)**: Complete endpoint documentation

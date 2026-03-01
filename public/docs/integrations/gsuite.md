> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Sheets

> Use Parallel directly in Google Sheets with the PARALLEL_QUERY function

Parallel’s Google Sheets integration brings AI-powered web research and retrieval into your spreadsheets.
Ask a natural‑language question, optionally specify the data to target, and add contextual guidance—all from a single formula.

The integration is designed for creating and enriching datasets in Sheets (e.g., enrichment, summaries, classifications, and quick insights).

<img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=3499489ecf2b96a82152b1f3cc48ef23" data-og-width="1093" width="1093" data-og-height="859" height="859" data-path="images/sheets_example.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=280&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=ee7f5b2df54524f205de1e0f90d0ffb0 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=560&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=8e2eb1fb789f988590b19730de6dbcd4 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=840&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=c8d54872b0f8ba770ae370b558fd49eb 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=1100&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=9ffd4e825dff7ae51a48b482cdeea362 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=1650&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=b806e5630fae79b1b88e710e5e7aaf16 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/X5tandxFdaxBN_wG/images/sheets_example.png?w=2500&fit=max&auto=format&n=X5tandxFdaxBN_wG&q=85&s=375308b2f4ee9c2f3be393ff293fc7a6 2500w" />

## Prerequisites

* Get a Parallel API key from [Platform](https://platform.parallel.ai).

* Install the integration on Google Sheets directly from [here](https://workspace.google.com/marketplace/app/parallel_web_systems/528853648934)
  or follow these steps:

  * Go to `Extensions → Add-Ons → Get add-ons`
  * Search for Parallel
  * Click on the listing from Parallel Web Systems

* In Google Sheets, open `Extensions → Parallel → Open Sidebar → Paste your API Key → Click Save API Key`

<Tip>
  **For teams**: Admins can set an org-wide API key using Google Apps Script properties, so individual users
  don't need to configure their own keys. See the [Admin Setup](#admin-setup) section below.
</Tip>

## Function Reference

The integration exposes one function with the following signature:

```
=PARALLEL_QUERY(query, target_data, context)
```

It returns an answer to a query, with optional data targeting and contextual guidance.

* `query` (required): A question or instruction. Accepts either a plain query string or a JSON-encoded structured argument.
* `target_data` (optional, strongly recommended): A cell, range, or column reference to specify the extraction target.
* `context` (optional): Additional information—background, constraints, user intent, or preferences—to tailor the response.

Returns: A concise answer string. When provided, `target_data` and `context` are used to improve relevance and precision.

<Tip>
  **For precise results, include `target_data` to extract a specific field corresponding to the input data.**
</Tip>

## Usage Patterns

### Basic

Use `PARALLEL_QUERY` for general questions:

```none  theme={"system"}
=PARALLEL_QUERY("Trends in AI")
```

### Targeted data retrieval

Use `target_data` to power targeted enrichments in your sheet:

<CodeGroup>
  ```bash Text theme={"system"}
  =PARALLEL_QUERY("Parallel Web Systems", target_data="CEO")
  ```

  ```bash Cell Reference theme={"system"}
  =PARALLEL_QUERY(A2, target_data=B1)
  # where `A2` is the cell containing the entity you want to enrich and `B1` is the enrichment
  column
  ```
</CodeGroup>

Notes

* The function returns a single text value per call. Use `ARRAYFORMULA` to apply it over many rows.
* For long queries, narrow `target_data` to relevant cells/columns to improve speed and fidelity.

## Best Practices

1. Scope your query: Be explicit about the desired format and constraints.
2. Target the right data: Specify the exact data point you need to retrieve.
3. Provide context: If needed, add audience, tone, or decision criteria via `context`. Being verbose here is helpful.
4. Use cell references: Keep prompts and policies in cells for reuse and review.
5. Validate outputs: For downstream logic, pair insights with checks (e.g., thresholds).

## Viewing Basis

The sidebar displays the sources used to generate each response.

1. Go to `Extensions → Parallel Web Systems → Open Sidebar → Basis`
2. Click on any cell containing a `PARALLEL_QUERY` result to
   view the basis—the web pages and documents that informed the answer.
3. To refresh, click on the `Refresh` button in the basis tab

This helps you verify the accuracy of responses and trace information back to its original source.

## Caching

Results are cached for up to 6 hours. If you need fresh data, you can force a recalculation by editing the cell or
clearing the cache via the sidebar.

## Admin Setup

For organizations that want to deploy Parallel across multiple users, first install the app for your organization
by following the steps mentioned [here](https://support.google.com/a/answer/172482?hl=en)

To configure an API key for all users in your organization:

1. Open `Extensions → Apps Script` in your Google Sheet
2. Go to `Project Settings → Script Properties`
3. Add a property with the key `PARALLEL_API_KEY` and your API key as the value
4. Save the script properties

Once configured, all users in your organization will automatically use this API key.

## Troubleshooting

* API key issues
  * Make sure your Parallel API key is saved in the sidebar (or configured via script properties) and has not expired.
* Slow or incomplete responses
  * Avoid volatile formulas that trigger frequent recalculation.
  * Results are cached for up to 6 hours; force refresh if you need updated data.

## FAQ

* Can I return multiple fields?
  * No, each response is a single field. You can split one call with multiple output fields into multiple requests, each requesting one field.
    `ARRAYFORMULA` is especially useful for this.
* How do I keep prompts consistent across a team?
  * Store prompts and policies in reference cells or a “Prompts” sheet and reference them in formulas.

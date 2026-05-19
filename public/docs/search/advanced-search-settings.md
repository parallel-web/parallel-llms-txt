> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced Search Settings

> Advanced configuration for source policy, fetch policy, excerpt settings, location, and result count

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The `advanced_settings` object on the Search API lets you tune source selection, freshness, excerpt sizing, geo-targeting, and result count. Most callers don't need it — the defaults are chosen to produce the best results for typical requests, and setting these knobs unnecessarily can hurt quality or latency.

## Fields

| Field             | Type                                     | Notes                                                                                                                                                                                                                                                                                                  | Example                                                   |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| source\_policy    | [SourcePolicy](/resources/source-policy) | Controls your sources: include/exclude specific domains and optionally set a start date for freshness control via `after_date`. Can significantly reduce result quality by excluding relevant pages — use only when absolutely necessary. See [Using include\_domains](#using-include_domains) below.  | [Source policy example](/resources/source-policy#example) |
| fetch\_policy     | object                                   | Controls when to return indexed content (faster) vs fetching live content (fresher). Default is to use cached content from the index. Enabling live fetch significantly increases latency. For more info including field details, see [Fetch Policy](/extract/advanced-extract-settings#fetch-policy). | `{"max_age_seconds": 3600}`                               |
| excerpt\_settings | object                                   | Controls excerpt sizes. Provide `max_chars_per_result` for fine-grained control, or omit to use defaults.                                                                                                                                                                                              | `{"max_chars_per_result": 10000}`                         |
| location          | string                                   | ISO 3166-1 alpha-2 country code for geo-targeted search results. Only a subset of countries are currently supported; unsupported or invalid values (e.g., `"uk"`) are ignored with a warning.                                                                                                          | `"us"`, `"gb"`, `"de"`, `"jp"`                            |
| max\_results      | int                                      | Upper bound on the number of results to return. Defaults to 10 if not provided.                                                                                                                                                                                                                        | 10                                                        |

## Using include\_domains

<Warning>
  Source policies can significantly reduce result quality by excluding relevant pages from retrieval. Use `include_domains` and `exclude_domains` only when absolutely necessary — for compliance-bound corpora, tasks that require a single known publisher, or when specific sources must be blocked.
</Warning>

[`include_domains`](/resources/source-policy) restricts retrieval so that **only** those domains can appear in results—the rest of the web is not searched. Treat it as a hard allow list, not a soft preference.

**Best practice:** Set `include_domains` only when answers must come **exclusively** from those domains (for example, internal or compliance-bound corpora, or when the task truly requires a single known publisher). If the model or user might still need the open web, avoid `include_domains` and instead steer sources in the **`objective`** (e.g. "prefer official documentation") or use **`exclude_domains`** when you only need to block specific sites. Full parameter details: [Source policy](/resources/source-policy).

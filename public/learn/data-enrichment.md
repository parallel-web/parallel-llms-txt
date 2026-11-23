# Data enrichment

Data enrichment appends verified external attributes—firmographics, ownership, pricing, or compliance status—to sparse internal records using entity resolution, live web retrieval, and typed schemas.

Data enrichment is the pipeline step that appends verified external attributes—firmographics, ownership, funding, pricing, regulatory status, or contact metadata—to sparse internal records (such as a company name, domain, or SKU) so downstream systems can score, route, or act on them. In modern AI stacks, enrichment has shifted from static third-party vendor CSVs to live open-web pipelines that combine [entity matching](/learn/entity-matching), [agentic search](/learn/agentic-search), and [structured outputs](/learn/structured-outputs) with field-level citations.

**Modern web-grounded data enrichment pipeline**

```text
Sparse Row: {name: "Acme Labs", domain: "acmelabs.io"}
  │
  ▼ 1. Standardize & match canonical entity
Resolved Entity (domain, legal name, jurisdiction)
  │
  ▼ 2. Fetch external facts (registries, filings, live web API)
┌──────────────────────────────────────────────────────────┐
│ Typed Schema Extraction + Basis Citations                │
│  hq_country: "US"  |  soc2: true  |  confidence: "high"  │
└────────────────────────────┬─────────────────────────────┘
                             ▼ 3. Gate low-confidence rows
               Upsert to CRM / Warehouse (with provenance)
```

## Static vendor enrichment vs. live web enrichment

Traditional enrichment joins your rows by domain or DUNS number against a pre-built vendor database. That is fast for common B2B attributes (headcount bands, NAICS codes), but falls apart on long-tail companies, recent rebrands, acquisitions, and custom schema questions (e.g., _"Does this vendor publish a SOC 2 Type II report and EU data residency?"_).

| Dimension | Static vendor database | Live web enrichment API (e.g., [Parallel Task API](/products/task)) |
| --- | --- | --- |
| Coverage | High for large US/EU firms; sparse on startups and niche verticals | Open public web: registries, docs, press releases, PDFs |
| Freshness | Refreshed quarterly or monthly | Queried live at run time |
| Schema flexibility | Fixed vendor columns only | Arbitrary custom JSON Schema per run |
| Attribution | Rarely cites source URLs per field | Per-field URLs, verbatim excerpts, and calibrated confidence |
| Latency | Milliseconds | Seconds per row (run concurrently across batches) |

## The five stages of a reliable enrichment pipeline

1. **Normalize inputs:** Clean company names, strip legal suffixes (`Inc.`, `Ltd.`), canonicalize domains (`https://www.example.com/` -> `example.com`), and deduplicate rows before spending API calls.
2. **Resolve the entity:** Confirm you are enriching the right legal entity—especially when names collide across jurisdictions or parent/subsidiary trees (see [entity matching](/learn/entity-matching)).
3. **Define a strict nullable schema:** Declare exact types, `enum` values, and nullable fields (`null` when unverified) so [structured outputs](/learn/structured-outputs) never fabricate missing attributes.
4. **Enrich with provenance:** Store `source_url`, `supporting_excerpt`, `confidence`, and `enriched_at` alongside every populated column—not just the bare value.
5. **Gate and refresh on TTL:** Auto-write high-confidence rows to your CRM/warehouse, route low-confidence or conflicting rows to human review, and schedule periodic refreshes for volatile fields (pricing, leadership, compliance status).

```python
ENRICHMENT_SCHEMA = {
    "type": "object",
    "properties": {
        "has_soc2": {"type": ["boolean", "null"]},
        "eu_data_residency": {"type": ["boolean", "null"]},
        "pricing_model": {
            "type": ["string", "null"],
            "enum": ["usage_based", "seat_based", "enterprise_only", "open_source", None],
        },
        "latest_funding_round": {"type": ["string", "null"]},
    },
    "required": ["has_soc2", "eu_data_residency", "pricing_model", "latest_funding_round"],
    "additionalProperties": False,
}
```

## Data enrichment vs. data cleaning vs. data enhancement

- **Data cleaning (hygiene):** Fixes defects _inside_ your existing dataset—deduplicating rows, normalizing phone/date formats, fixing typos. No external information is added.
- **Data enrichment:** Appends net-new external attributes from third-party APIs, registries, or the open web.
- **Data enhancement:** Umbrella term covering both cleaning and enrichment, plus derived internal features (scoring, segmentation, aggregations).

## Frequently asked questions

**Why does provenance matter in data enrichment?**

Without `source_url` and `enriched_at` timestamps, downstream sales, underwriting, or [KYB](/learn/kyb) teams cannot tell whether a value came from a 2026 SEC filing or a stale 2021 blog post—or re-verify it during an audit.

**How do you enrich 10,000 rows without blowing latency or cost budgets?**

Use a tiered funnel: resolve easy rows with deterministic lookups or static data first, then run batch asynchronous live-web enrichment (such as Parallel's [Task API](/products/task) or [company research](/learn/company-research) pipelines) concurrently for high-value or missing fields.

**Can you enrich records that only have a company name and no domain?**

Yes, provided your pipeline includes a discovery and [entity matching](/learn/entity-matching) step first (using a [web search API](/learn/web-search-api) to verify the canonical domain before extracting downstream attributes).

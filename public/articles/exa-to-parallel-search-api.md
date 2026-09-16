# How to switch from Exa to Parallel Search API

Exa and Parallel are close substitutes at the search layer, which makes most of this migration a matter of mapping one parameter tree onto another. This guide covers what the two cost, how each parameter maps, the two places the models genuinely differ, the code change, and rate limits.

Exa and Parallel are the closest thing this category has to direct substitutes at the search layer: both run their own index, both return compressed excerpts rather than SERP snippets, and both expose speed tiers you pick per call. Exa charges **$7 per 1,000 searches** with contents included; Parallel charges **$1 per 1,000** on Turbo or Fast and $5 per 1,000 on Basic and Advanced.

Because the response shapes are so similar, most of the migration is mapping one parameter tree onto another.

## **What the two cost**

| Workload | Exa | Parallel |
| --- | --- | --- |
| Search, 1,000 requests | $7.00 (10 results, contents included) | $1.00 Turbo / $5.00 Basic or Advanced |
| Deep search, 1,000 requests | $12.00 | Task API from $5.00 per 1,000 runs |
| Deep-reasoning search, 1,000 | $15.00 | Task API up to $2,400 per 1,000 runs |
| Standalone contents, 1,000 pages | $1.00 | $1.00 (Extract) |
| Answer endpoint, 1,000 | $5.00 | $10.00 to $250.00 (Responses) / $5.00 (Chat) |
| Monitoring, 1,000 runs | $15.00 | $3.00 (lite) / $10.00 (base) |
| Additional results | $1.00 per 1,000 | $1.00 per 1,000 |

Extraction is identical at $1 per 1,000. The gaps are at the search layer, where Turbo and Fast are a seventh of Exa's rate, and on monitoring, where Parallel is a fifth of Exa's.

_Note: For the latest pricing, always check official documentation._

## **Parameter mapping**

| Exa | Parallel |
| --- | --- |
| query | objective, optionally with search_queries |
| type: "instant" | mode: "turbo" |
| type: "fast" or "auto" | mode: "basic" |
| type: "deep-lite", "deep", "deep-reasoning" | mode: "advanced", or the Task API for real depth |
| numResults | 10 included; more at $1 per 1,000 results |
| contents.highlights | excerpts (returned by default) |
| contents.highlights.maxCharacters | advanced_settings.excerpt_settings.max_chars_per_result |
| contents.text | Extract API |
| includeDomains / excludeDomains | source_policy include / exclude |
| startPublishedDate / endPublishedDate | source_policy.after_date (no end-date equivalent) |
| contents.maxAgeHours: 0 | fetch_policy set to live crawl |
| outputSchema | Task API output schema |
| Monitors | Monitor API |
| Websets | FindAll API |

A convenience note if you are moving Python code: Exa's SDK uses snake_case keys inside nested dicts while its JSON and JavaScript SDK use camelCase, which is a common source of silent bugs. Parallel's Python SDK is snake_case throughout.

## **The two real differences**

First, Exa supports neural and embeddings-based retrieval alongside keyword matching, plus category filters that tap specialised indexes for companies, people, research papers, news, personal sites, and financial reports. If your queries lean on semantic similarity where keyword overlap is poor, or you rely on those category filters, test carefully rather than assuming parity. Parallel steers retrieval through the objective instead, and the behaviour is not identical.

Second, Exa consolidates deep research into the search endpoint through its deep and deep-reasoning types, with output_schema for structured JSON. Parallel splits that out into the Task API, which gives you nine processor tiers from $5 to $2,400 per 1,000 runs and attaches a Basis to every field: citations, reasoning, source excerpts, and a calibrated confidence score. That is more surface area to learn and more granular control over what you spend per task.

Things you gain that Exa has no equivalent for: a Fetch Policy that forces live crawling per request, Entity Search for real-time company and people lookup at $5 per 1,000, and the OpenAI-compatible Responses API.

## **The code change**

```python
from exa_py import Exa

exa = Exa(os.environ["EXA_API_KEY"])

result = exa.search(
    "latest developments in LLM retrieval",
    type="instant",
    num_results=10,
    contents={"highlights": True},
)
```

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="find the latest developments in LLM retrieval",
    search_queries=["LLM retrieval developments", "retrieval augmented generation advances"],
    mode="turbo",
)
```

## **Rate limits**

This is a straightforward upgrade. Exa defaults to 10 requests per second on search and 100 on contents, with 15 concurrent research tasks. Parallel defaults to 600 requests per minute on Search, Extract, and Entity Search, 300 on Monitor, and 300 per hour on FindAll runs, with GET polling excluded and custom limits available on enterprise plans. Parallel is SOC 2 Type 2 certified, with a Data Processing Addendum, zero data retention, and a contractual commitment not to train on customer data.

## **Get started**

Map Instant to Turbo first, since that is the pairing where the price gap is largest and the behaviour closest, and map auto and fast to Parallel's fast mode, the best fit for most agent loops: on Artificial Analysis's August 2026 index it scored 73 against Exa fast's 68 at roughly a ninth of the measured search cost. Run both against a sample of production queries before switching anything. The $5 monthly free credit covers 5,000 Turbo searches. Move semantic-heavy queries last, and check those specifically, because neural retrieval is the one place Exa does something structurally different.

**Related reading: **[Exa vs. Parallel](https://parallel.ai/compare/exa-vs-parallel) · [Switching from Tavily](https://parallel.ai/articles/tavily-to-parallel-search-api) · [Switching from OpenAI web search](https://parallel.ai/articles/openai-to-parallel-search-api).

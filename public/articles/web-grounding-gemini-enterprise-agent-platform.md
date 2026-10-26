# Best web grounding for Gemini Enterprise Agent Platform (2026)

Web grounding for Gemini Enterprise Agent Platform decides where a Gemini agent's facts come from, what each answer costs, and what you may do with the results afterward. This guide covers the web grounding options on Google Cloud, how their prices and data terms compare, how to set up Parallel with Python and REST, and how to render citations.

Web grounding for Gemini Enterprise Agent Platform (formerly Vertex AI) connects a Gemini model to live web results at request time, so answers cite current sources instead of relying on training data alone. Google renamed Vertex AI to Gemini Enterprise Agent Platform at Google Cloud Next on April 22, 2026, and the platform now offers several web grounding sources: Grounding with Google Search, Web Grounding for Enterprise, Grounding with Parallel Web Search, and a bring-your-own search API option.

We make Parallel, a web search API for AI agents, and Parallel is one of the grounding options compared here, so read with that in mind. Google Cloud is also a partner of ours. We've tried to describe each option from Google's own documentation as of October 19, 2026.

## Web grounding options on Gemini Enterprise Agent Platform

Google's [grounding overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) lists grounding with Google Search, Google Maps, Parallel web search, Agent Search (formerly Vertex AI Search), RAG Engine, Elasticsearch, and "your search API." Maps, Agent Search, RAG Engine, and Elasticsearch ground on places or on your own data. For the public web, the choices are these:

- **Grounding with Google Search**, which Google's docs recommend for "the highest quality and freshness."
- **Web Grounding for Enterprise**, a curated subset of the Google index for regulated industries.
- **Grounding with Parallel Web Search**, a native grounding tool sold as a Separate Offering under your Google Cloud Agreement.
- **Grounding with your search API**, which calls any HTTP search endpoint you expose.

You can also skip the grounding feature entirely and give an agent built with the Agent Development Kit (ADK), or any function-calling Gemini app, a web search tool directly. That can be Parallel's Search API or Search MCP server, or another provider.

## Comparison table

Prices are Google's and Parallel's published list prices as of October 19, 2026. Gemini token charges apply on top of every row.

| Option | Index | Billing unit | List price | Data terms | Best for |
| --- | --- | --- | --- | --- | --- |
| Grounding with Google Search (Gemini 3 and 4) | Google Search | Per grounding query (each search Gemini issues) | 5,000 queries a month free, then $14 per 1,000 queries | Grounded Results can't be cached, syndicated, or used for training; storage only in narrow cases | Broadest coverage and freshest results in user-facing chat |
| Grounding with Google Search (Gemini 2.5) | Google Search | Per grounding prompt | Daily free allowance, then $35 per 1,000 prompts | Same as above | Existing Gemini 2.5 apps |
| Web Grounding for Enterprise | Curated subset of Google's index | Per query on Gemini 3 and 4, per prompt on 2.5 | $14 per 1,000 queries (Gemini 3 and 4), $45 per 1,000 prompts (2.5) | Same Grounded Results terms; no logging of customer data, VPC-SC | Regulated industries |
| Grounding with Parallel Web Search | Parallel's web index | Google grounding charge plus Parallel search usage | Google's page lists its "Grounding with your data" charge ($2.50 per 1,000 prompts); Parallel BYOK basic and advanced are $5 per 1,000 requests | Parallel's terms: you own outputs and may store, cache, modify, route to other models, and subsyndicate; no display requirements | Agents and pipelines that store or reuse results, multi-model stacks |
| Grounding with your search API | Whatever your endpoint searches | Google's "Grounding with your data" rate plus your API's cost | $2.50 per 1,000 prompts on Google's pricing page, plus your provider | Your provider's terms | Private data or a custom search service |
| ADK or function calling with a search tool | Any provider | That provider's pricing | Varies (Parallel Fast is $1 per 1,000 requests) | Provider's terms | Agents that need search alongside other tools |

## Grounding with Google Search

Google Search grounding has the largest index and the freshest coverage of any option here, and it needs no extra subscription. On Gemini 3 and Gemini 4 models, Google bills per grounding query, so a prompt that leads Gemini to run three searches is billed as three. The first 5,000 queries a month are free across Gemini 3 and 4, and input tokens from Google Search are not charged. On Gemini 2.5, billing is per grounding prompt at $35 per 1,000 after a daily free allowance.

The terms matter as much as the price. Under the Grounding with Google Search section of Google Cloud's [Service Specific Terms](https://cloud.google.com/terms/service-terms), customers may not "cache, frame, syndicate, resell, analyze, train on, or otherwise learn from Grounded Results or Search Suggestions." Storage is allowed in limited cases, such as an end user's chat history or for evaluating display, for up to two years. The grounding docs say Search Suggestions must be displayed in production, while the pricing page lets customers skip them at standard pricing below 1 million grounding prompts a day. Those rules fit a chat assistant that shows answers to the person who asked, but not a pipeline that writes web facts into a CRM.

Google's Search grounding page also says the Gemini API doesn't support combining search tools such as `googleSearch` with non-search tools such as function calling in the same `generateContent` request.

[Web Grounding for Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/web-grounding-enterprise) trades index breadth for compliance. Its index is a subset of Google Search selected for healthcare, finance, and public-sector needs, with fast-changing content refreshed every 6 hours and the whole index every 24 hours. It doesn't log customer data and supports VPC Service Controls, but it carries the same Grounded Results restrictions.

## Grounding with Parallel Web Search

Parallel and Google Cloud [announced the integration](https://parallel.ai/blog/google-cloud-partnership) on July 16, 2026. Parallel is callable in the Gemini Enterprise API as the `parallelAiSearch` tool, selectable as a grounding partner in Agent Studio, and available on Google Cloud Marketplace with usage on your Google Cloud invoice. Google's [Grounding with Parallel Web Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-parallel) page, last updated October 19, 2026, carries no Preview label.

> "AI agents will soon use the web far more than humans ever have, and need search infrastructure purpose-built for how they operate." (Parag Agrawal, Founder and CEO, Parallel)

The main reason to pick it over Google Search grounding is the output terms. The partnership post lists output ownership, programmatic and agentic access with no human in the loop, multi-model routing, the right to cache, store, and modify outputs, subsyndication into your own multi-tenant products, and no display or branding requirements. An agent that enriches a product catalog or passes grounded facts to a non-Gemini model downstream needs those rights.

The other reasons are control and context. `source_policy` restricts or excludes up to 200 domains, domain/path prefixes, or extensions such as `.gov`. `excerpts` sets how much page text reaches the model, up to 100,000 characters per result. `mode` picks `basic` (the default) or `advanced` for harder queries at higher latency. Gemini's grounding exposes only those two of Parallel's four Search modes.

Publishers can keep their pages out of Parallel grounding by disallowing ShapBot in robots.txt.

## Grounding with your search API, and the tool-calling path

[Grounding with your search API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-your-search-api) is meant for data that isn't public. You configure a `retrieval.externalApi` tool with `api_spec: "SIMPLE_SEARCH"`, an endpoint, and an API key that Gemini appends as `?key=`. Your endpoint receives a `query` and returns an array of `snippet` and `uri` objects, usually through a Cloud Function behind API Gateway. You could wrap a public web search API this way, but you'd run the adapter yourself, and Google lists only Gemini 3.5 Flash, 3.1 Pro (preview), and 3.1 Flash-Lite as supported.

The tool-calling path skips grounding. An ADK agent or a function-calling Gemini app gets a search function, calls it when needed, and reads the results like any other tool output. You get full control over queries, retries, and how many searches run, and you can mix search with other tools in one request. You also take on citation formatting. Parallel's [Search MCP](https://parallel.ai/articles/best-mcp-servers-for-gemini-cli) works with Gemini CLI, and our [Gemini enrichment cookbook](https://parallel.ai/blog/cookbook-gemini-parallel-enrichment) shows the API route.

## How to set up Parallel grounding

There are two setup paths, documented in [Parallel's integration guide](https://docs.parallel.ai/integrations/google-gemini-enterprise).

|  | Google Cloud Marketplace | Bring your own key (BYOK) |
| --- | --- | --- |
| Setup | Subscribe to the Parallel Web Search listing | Create a key at platform.parallel.ai |
| Authentication | Automatic through your Google Cloud project | Parallel key in each request |
| Billing | Consolidated on your Google Cloud invoice | Billed by Parallel |
| Zero data retention | Available through the separate "Parallel Web Search for Grounding - ZDR" listing | Not available |

Both paths share a default quota of 200 prompts per minute. If a request carries both a Marketplace subscription and an API key, the key takes precedence. A separate "Parallel Web Systems" Marketplace listing, [announced on August 25, 2026](https://parallel.ai/blog/gcp-marketplace-full-api-suite), covers Search, Extract, Task, FindAll, and Monitor, but it doesn't cover Gemini grounding.

To try it without code, open Agent Studio, go to **Model settings**, turn on **Partners** under **Grounding**, select **Parallel Web Search**, and click **Apply**. Agent Studio needs an active Marketplace subscription.

For code, authenticate with `gcloud auth application-default login` and set the environment variables the Google Gen AI SDK reads.

```bash
pip install --upgrade google-genai

export GOOGLE_CLOUD_PROJECT=PROJECT_ID
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

`GOOGLE_GENAI_USE_ENTERPRISE` sends the client to Gemini Enterprise Agent Platform instead of the Gemini Developer API. Use a region such as `us-central1` instead of `global` only if you have a data residency requirement.

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Who won the 2025 Las Vegas F1 Grand Prix?",
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                parallel_ai_search=types.ToolParallelAiSearch(
                    # Omit api_key when using a Marketplace subscription.
                    # api_key="PARALLEL_API_KEY",
                    custom_configs={
                        "mode": "basic",
                        "max_results": 10,
                        "source_policy": {
                            "include_domains": ["wikipedia.org"]
                        },
                    },
                )
            )
        ],
    ),
)

print(response.text)
print(response.candidates[0].grounding_metadata.grounding_chunks)
```

The same call over REST goes to `https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent` with a `gcloud auth print-access-token` bearer token. For the global endpoint, drop the region prefix from the hostname and use `global` in the path. This body uses the Marketplace path with zero data retention switched on:

```json
{
  "contents": [{
    "role": "user",
    "parts": [{ "text": "Summarize this week's ECB policy announcements." }]
  }],
  "tools": [{
    "parallelAiSearch": {
      "enable_zero_data_retention": true,
      "customConfigs": {
        "mode": "advanced",
        "location": "de",
        "max_results": 10,
        "source_policy": {
          "include_domains": ["ecb.europa.eu"]
        },
        "excerpts": {
          "max_chars_per_result": 30000,
          "max_chars_total": 100000
        }
      }
    }
  }],
  "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}
```

For BYOK, replace `enable_zero_data_retention` with `"api_key": "PARALLEL_API_KEY"`. ZDR requires the ZDR Marketplace subscription. Parallel's docs say the Gen AI SDKs don't expose the ZDR flag and point you to REST, while Google's newer samples show it on the SDK tool, so check your SDK version before relying on it.

| customConfigs field | Default | Range |
| --- | --- | --- |
| mode | basic | basic or advanced |
| max_results | 10 | 1 to 20 |
| excerpts.max_chars_per_result | 30,000 | 1,000 to 100,000 |
| excerpts.max_chars_total | 100,000 | 1,000 to 1,000,000 |
| source_policy.include_domains / exclude_domains | none | 200 entries combined |
| location | none | ISO 3166-1 alpha-2 country code |

Both Google and Parallel recommend the defaults unless you have a specific reason to change them.

## Reading the response and rendering citations

A grounded response carries `groundingMetadata` with three useful fields. `webSearchQueries` lists the queries Gemini sent to Parallel, `groundingChunks[].web` gives each source's `uri`, `title`, and `domain`, and `groundingSupports` maps segments of the answer to the chunks that back them.

Gemini decides whether to search at all. When it answers from its own knowledge, `groundingMetadata` is absent, so check for it before rendering anything.

Inline citation markers go wrong in two ways. The `startIndex` and `endIndex` values in each segment are byte offsets, not character positions, so slicing a Python string with them misplaces markers in any answer with non-ASCII text. They're also relative to a single `Part`, identified by `partIndex`, rather than to the whole answer. Encode each part to UTF-8, insert markers in byte space, and walk each part's supports from the end backward so earlier offsets stay valid. Parallel's integration guide includes a Python snippet that does this.

## What grounding with Parallel costs

A grounded request can incur three charges: Gemini tokens (prompt, thinking, and output), Google's grounding charge, and Parallel search usage. Google's Parallel page points to the line item "Gemini's Grounding with your data," which the Agent Platform [pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) lists at $2.50 per 1,000 prompts. On Marketplace, Parallel's usage is priced on the listing and billed through Google Cloud. With BYOK, Parallel bills directly at $5 per 1,000 requests for both basic and advanced mode.

Gemini may issue several searches for one prompt, so read `webSearchQueries` on a sample of real traffic before you estimate monthly volume. The same applies to Google Search grounding on Gemini 3 and 4, where each query is billed.

## How good is the search?

No published benchmark compares grounding providers inside Gemini Enterprise Agent Platform, and we haven't run one. The closest independent measure is the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), which holds the model and harness fixed and swaps only the search API. In its October 19, 2026 data, Parallel Search (advanced) scores 75, level with Brave's LLM context mode and behind Exa's auto mode and Perplexity Search (medium), which lead at 80. Google Search grounding isn't in that index, so it says nothing about Parallel versus Google inside Gemini.

Our own multi-step evals are on [parallel.ai/benchmarks](https://parallel.ai/benchmarks). For the questions your agent actually asks, the most reliable test is to run the same prompt set through each grounding tool in Agent Studio or the API and grade the answers. Our guide to [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) describes a setup you can copy.

## FAQ

### Is Vertex AI grounding the same as Gemini Enterprise Agent Platform grounding?

Yes. Google renamed Vertex AI to Gemini Enterprise Agent Platform on April 22, 2026, and Vertex AI Search became Agent Search. Grounding docs that used to sit under Vertex AI now live under the new name, and Google Search grounding works the same way.

### Can I use Parallel grounding without a Parallel account?

Yes. Subscribe to the Parallel Web Search listing on Google Cloud Marketplace and omit the API key. Billing goes to your Google Cloud invoice.

### Which models support grounding with Parallel?

Gemini 4 Argon, Gemini 3.8, 3.7, 3.6, and 3.5 Flash, 3.5 Flash-Lite, 3.1 Pro (preview), 3.1 Flash-Lite, and Gemini 2.5 Pro, Flash, and Flash-Lite, per Google's page on October 19, 2026.

### Can I store grounded answers in a database?

With Parallel grounding, yes; Parallel's terms allow storing, caching, and modifying outputs. With Grounding with Google Search or Web Grounding for Enterprise, Google's Service Specific Terms prohibit caching and allow storage only in limited cases such as chat history.

### Should I use grounding or give my agent a search tool?

Use grounding when you want Gemini to decide when to search and return citation metadata with no tool loop to manage. Use a search tool through ADK or function calling when the agent also calls other tools, needs to control each query, or runs on more than one model. For a deeper side-by-side, see [Gemini Google Search grounding vs. Parallel](https://parallel.ai/articles/gemini-google-search-grounding-vs-parallel).

**Related:** [Why AI agents can't just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search) · [Best MCP servers for Gemini CLI](https://parallel.ai/articles/best-mcp-servers-for-gemini-cli) · [What is a web search API?](https://parallel.ai/articles/what-is-a-web-search-api)

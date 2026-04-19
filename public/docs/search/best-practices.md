> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search API Best Practices

> Craft effective objectives and search queries for the Parallel Search API, including tool-calling agents and evals

The Search API returns ranked, LLM-optimized excerpts from web sources based on natural
language objectives or keyword queries. Results are designed to serve directly as model
input, enabling faster reasoning and higher-quality completions with minimal
post-processing.

The guidance below applies whether you call the API directly or your model fills **`objective`** and **`search_queries`** through function calling. For copy-paste tool schemas, handler patterns, and eval notes, see [Tool definition](/integrations/tool-definition) (including [Agent evaluations and benchmarks](/integrations/tool-definition#agent-evaluations-and-benchmarks)).

## Key Benefits

* **Context engineering for token efficiency**: The API ranks and compresses web results based on reasoning utility rather than human engagement, delivering the most relevant tokens for each agent's specific objective.
* **Single-hop resolution of complex queries**: Where traditional search forces agents to make multiple sequential calls, accumulating latency and costs, Parallel resolves complex multi-topic queries in a single request.
* **Multi-hop efficiency**: For deep research workflows requiring multiple reasoning steps, agents using Parallel complete tasks in fewer tool calls while achieving higher accuracy and lower end-to-end latency.

## Request Fields

Note that at least one of `objective` or `search_queries` is required. The remaining
fields are optional. See the [API
Reference](/api-reference/search/search) for complete parameter
specifications and constraints.

| Field           | Type                                     | Notes                                                                                                                                                                                                                                                            | Example                                                               |
| --------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| mode            | string                                   | Presets with varying trade-off profiles for different types of use cases. See [Modes](/search/modes) for details. Defaults to `one-shot`.                                                                                                                        | "fast"                                                                |
| objective       | string                                   | Natural-language description of the web research goal, including source or freshness guidance and broader context from the task. Maximum 5000 characters.                                                                                                        | "When was the United Nations founded? Prefer UN's official websites." |
| search\_queries | string\[]                                | Optional search queries to supplement the objective. Maximum 200 characters per query.                                                                                                                                                                           | \["Founding year UN", "Year of founding United Nations"]              |
| max\_results    | int                                      | Upper bound on the number of results to return (1-20). The actual number of results may be fewer depending on query specificity and available sources. Defaults to 10.                                                                                           | 10                                                                    |
| source\_policy  | [SourcePolicy](/resources/source-policy) | Controls your sources: include/exclude specific domains and optionally set a start date for freshness control via `after_date`. Use when you want stricter source control than objective text alone. See [Using include\_domains](#using-include_domains) below. | [Source policy example](/resources/source-policy#example)             |
| excerpts        | object                                   | Customize excerpt length.                                                                                                                                                                                                                                        | `{"max_chars_per_result": 10000, "max_chars_total": 50000}`           |
| fetch\_policy   | object                                   | Controls when to return indexed vs fresh content. Default is to disable live fetch and return cached content from the index.                                                                                                                                     | `{"max_age_seconds": 3600}`                                           |

## Tool schemas, evals, and optional parameters

If you are **designing a tool description** or **running an agent eval** against Search, prefer a minimal tool schema that only exposes **`objective`** and **`search_queries`** (aligned with [Tool definition](/integrations/tool-definition)). Do **not** add optional API fields to the tool—such as `max_results`, `max_chars_per_result`, `max_chars_total`, or similar—unless you have a concrete product reason. Models often set these without need, which shrinks the search space and hurts quality. Keep tuning and limits **server-side** in your tool handler instead. For the full rationale, see [Agent evaluations and benchmarks](/integrations/tool-definition#agent-evaluations-and-benchmarks) on the tool definition page.

When calling the HTTP API or SDK **directly** (no tool layer), optional fields remain useful; use them when you need explicit caps, excerpt sizing, fetch behavior, or [source policy](/resources/source-policy).

## Objective and Search Queries

In the recommended `search_web` tool on the [Tool definition](/integrations/tool-definition) page, the model supplies **`objective`** and **`search_queries`** exactly as in the JSON examples below—same names, same intent. **For best results, provide both.** The objective should include context about your broader task or goal, while search queries ensure specific keywords are prioritized.

When writing objectives, be specific about preferred sources, include freshness requirements when relevant, and specify desired content types (e.g., technical documentation, peer-reviewed research, official announcements).

**Examples of effective objectives with search queries:**

```json theme={"system"}
{
  "mode": "fast",
  "objective": "What EV tax credits and rebates apply to small businesses in California, and how do they differ for leasing vs buying?",
  "search_queries": ["EV tax credit business", "California EV rebate lease", "federal EV incentive purchase vs lease"]
}
```

```json theme={"system"}
{
  "mode": "fast",
  "objective": "What has the Federal Reserve and SEC announced about digital asset regulations and crypto-banking partnerships in the past 3 months?",
  "search_queries": ["Federal Reserve crypto guidance 2026", "SEC digital asset policy", "bank crypto partnership regulations"]
}
```

```json theme={"system"}
{
  "mode": "fast",
  "objective": "How do transformer attention mechanisms work in PyTorch and Hugging Face, based on their official documentation?",
  "search_queries": ["transformer attention mechanism", "PyTorch attention documentation", "Hugging Face transformer guide"]
}
```

```json theme={"system"}
{
  "mode": "fast",
  "objective": "What clinical trial results on amyloid-beta therapies for Alzheimer's have been published in the past 2 years?",
  "search_queries": ["amyloid beta clinical trials", "Alzheimer's treatment research 2024-2026", "monoclonal antibody AD trials"]
}
```

## Using include\_domains

[`include_domains`](/resources/source-policy) restricts retrieval so that **only** those domains can appear in results—the rest of the web is not searched. Treat it as a hard allow list, not a soft preference.

**Best practice:** Set `include_domains` only when answers must come **exclusively** from those domains (for example, internal or compliance-bound corpora, or when the task truly requires a single known publisher). If the model or user might still need the open web, avoid `include_domains` and instead steer sources in the **`objective`** (e.g. “prefer official documentation”) or use **`exclude_domains`** when you only need to block specific sites. Full parameter details: [Source policy](/resources/source-policy).

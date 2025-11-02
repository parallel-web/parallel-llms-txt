# Best Practices

> Using the Parallel Search API

The Search API returns ranked, LLM-optimized excerpts from web sources based on natural
language objectives or keyword queries. Results are designed to serve directly as model
input, enabling faster reasoning and higher-quality completions with minimal
post-processing.

<Note>
  {" "} **Beta Notice**: This API is currently in beta and subject to change, and
  requires the <code>parallel-beta: search-extract-2025-10-10</code> header. Usage is
  limited to 600 requests per minute; for production access or higher capacity, contact
  [support@parallel.ai](mailto:support@parallel.ai).{" "}
</Note>

## Key Benefits

Ideal for LLM workflows, agents, and retrieval-augmented tasks that use
web content.

* Search with Natural Language: Describe what you're looking for in plain language and
  handle complex, multi-faceted queries in a single request—no need for multiple
  overlapping keyword searches.

* Intelligent Token Efficiency: Automatically include only the tokens necessary for the
  task at hand. Simple factual queries return concise excerpts; complex research
  objectives return comprehensive content. No wasted tokens on irrelevant information.

* Speed: Reduce latency and improve quality by replacing multi-step pipelines with
  fewer, smarter API calls.

* Quality: Powered by Parallel's web-scale index with advanced ranking that prioritizes
  relevance, clarity, and source reliability.

## Request Fields

Note that at least one of `objective` or `search_queries` is required. The remaining
fields are optional. See the [API
Reference](https://docs.parallel.ai/api-reference/search-beta/search) for complete parameter
specifications and constraints.

| Field                   | Type                                     | Notes                                                                                                                                                     | Example                                                         |
| ----------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| objective               | string                                   | Natural-language description of the web research goal, including source or freshness guidance and broader context from the task. Maximum 5000 characters. | "I want to know when the UN was founded. Prefer UN's websites." |
| search\_queries         | string\[]                                | Optional search queries to supplement the objective. Maximum 200 characters per query.                                                                    | \["Founding year UN", "Year of founding United Nations"]        |
| max\_results            | int                                      | Maximum number of search results to return (1-20).                                                                                                        | 10                                                              |
| max\_chars\_per\_result | int                                      | Maximum characters per search result (100-\~30,000).                                                                                                      | 6000                                                            |
| source\_policy          | [SourcePolicy](/resources/source-policy) | Controls specific domains to include or exclude from search results. Use only when source guidance in the objective is insufficient.                      | [Source policy example](/resources/source-policy#example)       |

## Objective and Search Queries

**For best results, provide both `objective` and `search_queries`.** The objective should include context about your broader task or goal, while search queries ensure specific keywords are prioritized.

When writing objectives, be specific about preferred sources, include freshness requirements when relevant, and specify desired content types (e.g., technical documentation, peer-reviewed research, official announcements).

**Examples of effective objectives with search queries:**

```json  theme={"system"}
{
  "objective": "I'm helping a client decide whether to lease or buy an EV for their small business in California. Find information about federal and state tax credits, rebates, and how they apply to business vehicle purchases vs leases.",
  "search_queries": ["EV tax credit business", "California EV rebate lease", "federal EV incentive purchase vs lease"]
}
```

```json  theme={"system"}
{
  "objective": "I'm preparing Q1 2025 investor materials for a fintech startup. Find recent announcements (past 3 months) from the Federal Reserve and SEC about digital asset regulations and banking partnerships with crypto firms.",
  "search_queries": ["Federal Reserve crypto guidance 2025", "SEC digital asset policy", "bank crypto partnership regulations"]
}
```

```json  theme={"system"}
{
  "objective": "I'm designing a machine learning course for graduate students. Find technical documentation and API guides that explain how transformer attention mechanisms work, preferably from official framework documentation like PyTorch or Hugging Face.",
  "search_queries": ["transformer attention mechanism", "PyTorch attention documentation", "Hugging Face transformer guide"]
}
```

```json  theme={"system"}
{
  "objective": "I'm writing a literature review on Alzheimer's treatments for a medical journal. Find peer-reviewed research papers and clinical trial results from the past 2 years on amyloid-beta targeted therapies.",
  "search_queries": ["amyloid beta clinical trials", "Alzheimer's treatment research 2023-2025", "monoclonal antibody AD trials"]
}
```

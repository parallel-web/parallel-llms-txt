> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search API Best Practices

> Craft effective objectives and search queries for the Parallel Search API, including tool-calling agents and evals

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The Search API returns ranked, LLM-optimized excerpts from web sources based on natural
language objectives or keyword queries. Results are designed to serve directly as model
input, enabling faster reasoning and higher-quality completions with minimal
post-processing.

The guidance below applies whether you call the API directly or your model fills **`objective`** and **`search_queries`** through function calling. For the copy-paste tool schema, jump to [Search Tool Definition](#search-tool-definition) below.

## Key Benefits

* **Context engineering for token efficiency**: The API ranks and compresses web results based on reasoning utility rather than human engagement, delivering the most relevant tokens for each agent's specific objective.
* **Single-hop resolution of complex queries**: Where traditional search forces agents to make multiple sequential calls, accumulating latency and costs, Parallel resolves complex multi-topic queries in a single request.
* **Multi-hop efficiency**: For deep research workflows requiring multiple reasoning steps, agents using Parallel complete tasks in fewer tool calls while achieving higher accuracy and lower end-to-end latency.

## Request Fields

`search_queries` is required (at least one non-empty query). The remaining
fields are optional. See the [API
Reference](/api-reference/search/search) for complete parameter
specifications and constraints.

| Field              | Type      | Notes                                                                                                                                                                                                                                                                                                                                                                               | Example                                                                                                                    |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| search\_queries    | string\[] | Concise keyword search queries, 3-6 words each. At least one query is required; provide 2-3 for best results. Maximum 5 queries, 200 characters per query.                                                                                                                                                                                                                          | `["Parallel Web Systems products", "Parallel Web Systems announcements"]`                                                  |
| objective          | string    | Natural-language description of the web research goal, including source or freshness guidance and broader context from the task. Maximum 5000 characters.                                                                                                                                                                                                                           | "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements." |
| mode               | string    | Presets with varying trade-off profiles for different types of use cases. See [Modes](/search/modes) for details. Defaults to `advanced`.                                                                                                                                                                                                                                           | `"advanced"`                                                                                                               |
| max\_chars\_total  | int       | Upper bound on total characters across excerpts from all results. Default is dynamic based on search\_queries, objective, and client\_model.                                                                                                                                                                                                                                        | 50000                                                                                                                      |
| client\_model      | string    | The model generating this request and consuming the results. Enables optimizations tailored to the model's capabilities.                                                                                                                                                                                                                                                            | `"claude-opus-4-7"`, `"gpt-5.4"`, `"gemini-3.1-pro"`                                                                       |
| session\_id        | string    | Optional identifier for grouping related calls. Use the same `session_id` across search and extract calls that are part of the same task, and a new unique id for each new task. Any string works — use one meaningful in your app, or reuse a `session_id` returned by an earlier search or extract call. UUIDs work well — See [Session Identifiers](#session-identifiers) below. | `"session_<uuid>"` or `"company_search_<uuid>"`                                                                            |
| advanced\_settings | object    | Advanced configuration for source policy, fetch policy, excerpt settings, location, and result count. When omitted, excerpts are enabled by default. Setting these knobs may impact result quality and latency unless used carefully — see [Advanced Settings](/search/advanced-search-settings).                                                                                   | See [Advanced Settings](/search/advanced-search-settings)                                                                  |

**Use [Advanced Settings](/search/advanced-search-settings) only when strictly required:** restrictive parameters such as `source_policy`, `location` and `max_results` can unnecessarily limit results and reduce quality. Apply these only when there is a product need to search only within a particular domain, location or setting.

For best results, provide both objective and search queries.

**Examples of effective objectives with search queries:**

```json theme={"system"}
{
  "objective": "What EV tax credits and rebates apply to small businesses in California, and how do they differ for leasing vs buying?",
  "search_queries": ["EV tax credit business", "California EV rebate lease", "federal EV incentive purchase vs lease"]
}
```

```json theme={"system"}
{
  "objective": "What has the Federal Reserve and SEC announced about digital asset regulations and crypto-banking partnerships in the past 3 months?",
  "search_queries": ["Federal Reserve crypto guidance 2026", "SEC digital asset policy", "bank crypto partnership regulations"]
}
```

```json theme={"system"}
{
  "objective": "How do transformer attention mechanisms work in PyTorch and Hugging Face, based on their official documentation?",
  "search_queries": ["transformer attention mechanism", "PyTorch attention documentation", "Hugging Face transformer guide"]
}
```

```json theme={"system"}
{
  "objective": "What clinical trial results on amyloid-beta therapies for Alzheimer's have been published in the past 2 years?",
  "search_queries": ["amyloid beta clinical trials", "Alzheimer's treatment research 2024-2026", "monoclonal antibody AD trials"]
}
```

## Session Identifiers

Agents frequently make multiple Search and Extract calls to complete a single task. Passing the same `session_id` across those related calls helps Parallel treat them as one logical group. Use a new id for each new task to keep groups distinct.

Every Search and Extract response includes a `session_id`, matching the request when you provide one, otherwise one is server-generated and returned for you to reuse. Any string up to 1000 characters works. Use an identifier meaningful in your app, or reuse a `session_id` returned by an earlier call. Because each task should have a unique id, UUIDs (optionally with a descriptive prefix) work well, for example `"company_search_cd812136-9f81-484e-ab92-2ba0cb8b9ea8"`.

## Search Tool Definition

Copy this directly into your agent's tool/function list to give any LLM-powered agent real-time web search via Parallel Search. This works with any framework that supports function/tool calling — OpenAI, Anthropic, Google Gemini, Vercel AI SDK, LangChain, and others. We provide OpenAI, Anthropic, and Gemini formats below — the schema is identical, only the wrapper differs.

<Note>
  If you're using [MCP](/integrations/mcp/quickstart), the tool definition is provided automatically — you don't need to define it yourself.
</Note>

<Tabs>
  <Tab title="OpenAI">
    ```json theme={"system"}
    {
      "type": "function",
      "function": {
        "name": "search_web",
        "description": "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
        "parameters": {
          "type": "object",
          "properties": {
            "objective": {
              "type": "string",
              "description": "A concise, self-contained search query. Must include the key entity or topic being searched for."
            },
            "search_queries": {
              "type": "array",
              "description": "Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
              "items": { "type": "string" },
              "minItems": 3,
              "maxItems": 3
            }
          },
          "required": ["objective", "search_queries"]
        }
      }
    }
    ```
  </Tab>

  <Tab title="Anthropic">
    ```json theme={"system"}
    {
      "name": "search_web",
      "description": "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
      "input_schema": {
        "type": "object",
        "properties": {
          "objective": {
            "type": "string",
            "description": "A concise, self-contained search query. Must include the key entity or topic being searched for."
          },
          "search_queries": {
            "type": "array",
            "description": "Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
            "items": { "type": "string" },
            "minItems": 3,
            "maxItems": 3
          }
        },
        "required": ["objective", "search_queries"]
      }
    }
    ```
  </Tab>

  <Tab title="Gemini">
    ```python theme={"system"}
    import google.generativeai as genai

    SEARCH_WEB_SCHEMA = {
        "name": "search_web",
        "description": "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
        "parameters": {
            "type": "object",
            "properties": {
                "objective": {
                    "type": "string",
                    "description": "A concise, self-contained search query. Must include the key entity or topic being searched for.",
                },
                "search_queries": {
                    "type": "array",
                    "description": "Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
                    "items": {"type": "string"},
                    "minItems": 3,
                    "maxItems": 3,
                },
            },
            "required": ["objective", "search_queries"],
        },
    }

    genai.types.FunctionDeclaration(
        name=SEARCH_WEB_SCHEMA["name"],
        description=SEARCH_WEB_SCHEMA["description"],
        parameters=SEARCH_WEB_SCHEMA["parameters"],
    )

    ```
  </Tab>
</Tabs>

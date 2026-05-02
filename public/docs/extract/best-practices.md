> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract API Best Practices

> Learn how to optimize web content extraction with objectives, search queries, and fetch policies for LLM-ready markdown output

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The Extract API converts any public URL into clean, LLM-optimized markdown—handling JavaScript-heavy pages and PDFs automatically. Extract focused excerpts aligned to your objective, or retrieve full page content as needed.

The guidance below applies whether you call the API directly or your model fills **`urls`**, **`objective`**, and **`search_queries`** through function calling. For the copy-paste tool schema, jump to [Extract Tool Definition](#extract-tool-definition) below.

## Key Benefits

* **LLM-optimized markdown**: Extract returns clean markdown from any public URL — including JavaScript-heavy pages and PDFs — with headings, lists, and links preserved for direct use as model input.
* **Objective-focused excerpts**: When you supply `objective` and/or `search_queries`, Extract returns ranked excerpts aligned to the goal, skipping boilerplate and irrelevant sections.
* **Batch-friendly**: Submit a list of URLs in a single request to consolidate what would otherwise be multiple fetches into one round-trip.

## Request Fields

The Extract API accepts the following parameters. The `urls` field is required; all
other fields are optional. See the [API
Reference](/api-reference/extract/extract) for complete parameter
specifications and constraints.

| Field              | Type      | Notes                                                                                                                                                                                                                                                                                                                                                                               | Example                                                                                                      |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| urls               | string\[] | List of URLs to extract content from. Up to 20 URLs per request.                                                                                                                                                                                                                                                                                                                    | `["https://example.com/article"]`                                                                            |
| objective          | string    | Natural-language description of what information you're looking for, including broader task context. When provided, focuses extracted content on relevant information. Maximum 5000 characters.                                                                                                                                                                                     | "I'm researching React performance optimization. Find best practices for preventing unnecessary re-renders." |
| search\_queries    | string\[] | Optional keyword queries to focus extraction. Use with or without objective to emphasize specific terms. 2-3 queries is best practice; maximum 5 queries, 200 characters per query.                                                                                                                                                                                                 | `["React.memo", "useMemo", "useCallback"]`                                                                   |
| max\_chars\_total  | int       | Upper bound on total characters across excerpts from all results. Does not affect `full_content`. Default is dynamic based on urls, objective, and client\_model.                                                                                                                                                                                                                   | 50000                                                                                                        |
| client\_model      | string    | The model generating this request and consuming the results. Enables optimizations tailored to the model's capabilities.                                                                                                                                                                                                                                                            | `"claude-opus-4-7"`, `"gpt-5.4"`, `"gemini-3.1-pro"`                                                         |
| session\_id        | string    | Optional identifier for grouping related calls. Use the same `session_id` across search and extract calls that are part of the same task, and a new unique id for each new task. Any string works — use one meaningful in your app, or reuse a `session_id` returned by an earlier search or extract call. UUIDs work well — see [Session Identifiers](#session-identifiers) below. | `"session_<uuid>"` or `"company_search_<uuid>"`                                                              |
| advanced\_settings | object    | Advanced configuration for fetch policy, excerpt settings, and full content settings. When omitted, excerpts are enabled and full content is disabled by default. Setting these knobs may impact result quality and latency unless used carefully — see [Advanced Settings](/extract/advanced-extract-settings).                                                                    | See [Advanced Settings](/extract/advanced-extract-settings)                                                  |

## Objective and Search Queries

When you provide `objective` or `search_queries`, Extract returns ranked excerpts focused on the goal instead of raw page content. For best results, follow the same guidance as [Search Best Practices](/search/best-practices): keep `objective` self-contained and specific, and use 2-3 diverse `search_queries` (3-6 words each) when the objective alone may be ambiguous.

Without either field, Extract falls back to returning whole-page markdown (boilerplate included). If you enable `full_content` without providing `objective` or `search_queries`, excerpts will be redundant with full content, which means that the request still succeeds but may include a warning.

## Session Identifiers

Agents frequently make multiple Search and Extract calls to complete a single task. Passing the same `session_id` across those related calls helps Parallel treat them as one logical group.

Every Search and Extract response includes a `session_id`, matching the request when you provide one, otherwise one is server-generated and returned for you to reuse. Any string up to 1000 characters works. Use an identifier meaningful in your app, or reuse a `session_id` returned by an earlier call. Because each task should have a unique id, UUIDs (optionally with a descriptive prefix) work well, for example `"company_search_cd812136-9f81-484e-ab92-2ba0cb8b9ea8"`.

## Extract Tool Definition

Copy this directly into your agent's tool/function list to give any LLM-powered agent focused page content via Parallel Extract. This works with any framework that supports function/tool calling — OpenAI, Anthropic, Google Gemini, Vercel AI SDK, LangChain, and others. We provide OpenAI, Anthropic, and Gemini formats below — the schema is identical, only the wrapper differs.

When building with Parallel's Web Tools, we recommend exposing both the [Search API](/search/search-quickstart) and Extract API as tools for the agent. Search finds and ranks relevant URLs with focused excerpts; Extract then pulls deeper content from specific pages. With both tools available, the agent can search first, pick the most relevant results, and extract full detail only where needed, keeping total token usage low while still getting comprehensive information.

<Note>
  If you're using [MCP](/integrations/mcp/quickstart), the tool definition is provided automatically — you don't need to define it yourself.
</Note>

<Tabs>
  <Tab title="OpenAI">
    ```json theme={"system"}
    {
      "type": "function",
      "function": {
        "name": "web_fetch",
        "description": "Fetches content from the given URL, returning the content of the page, or if objective is provided, returns the content of the page that is most relevant to the objective. Use this to fetch content from any specific page on the web.",
        "parameters": {
          "type": "object",
          "properties": {
            "urls": {
              "type": "array",
              "description": "The URLs to fetch content from.",
              "items": { "type": "string" }
            },
            "objective": {
              "type": "string",
              "description": "Natural-language description of what to extract from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched."
            }
          },
          "required": ["urls"]
        }
      }
    }
    ```
  </Tab>

  <Tab title="Anthropic">
    ```json theme={"system"}
    {
      "name": "web_fetch",
      "description": "Fetches content from the given URL, returning the content of the page, or if objective is provided, returns the content of the page that is most relevant to the objective. Use this to fetch content from any specific page on the web.",
      "input_schema": {
        "type": "object",
        "properties": {
          "urls": {
            "type": "array",
            "description": "The URLs to fetch content from.",
            "items": { "type": "string" }
          },
          "objective": {
            "type": "string",
            "description": "Natural-language description of what to extract from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched."
          }
        },
        "required": ["urls"]
      }
    }
    ```
  </Tab>

  <Tab title="Gemini">
    ```python theme={"system"}
    import google.generativeai as genai

    WEB_FETCH_SCHEMA = {
        "name": "web_fetch",
        "description": "Fetches content from the given URL, returning the content of the page, or if objective is provided, returns the content of the page that is most relevant to the objective. Use this to fetch content from any specific page on the web.",
        "parameters": {
            "type": "object",
            "properties": {
                "urls": {
                    "type": "array",
                    "description": "The URLs to fetch content from.",
                    "items": {"type": "string"},
                },
                "objective": {
                    "type": "string",
                    "description": "Natural-language description of what to extract from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched.",
                },
            },
            "required": ["urls"],
        },
    }

    genai.types.FunctionDeclaration(
        name=WEB_FETCH_SCHEMA["name"],
        description=WEB_FETCH_SCHEMA["description"],
        parameters=WEB_FETCH_SCHEMA["parameters"],
    )

    ```
  </Tab>
</Tabs>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Tool Definition

> Copy-paste tool definitions for integrating Parallel Search and Extract into any AI agent

Use the tool definitions below to give any LLM-powered agent real-time web search via Parallel Search and focused page content via Parallel Extract. This works with any framework that supports function/tool calling — OpenAI, Anthropic, Google Gemini, Vercel AI SDK, LangChain, and others.

<Note>
  If you're using [MCP](/integrations/mcp/quickstart), the tool definition is provided automatically — you don't need to define it yourself.
</Note>

## Search tool definition (`search_web`)

Copy this directly into your agent's tool/function list. We provide OpenAI, Anthropic, and Gemini formats — the schema is identical, only the wrapper differs.

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

## Extract tool definition (`web_fetch`)

Use this alongside `search_web` when you want the model to pull token-efficient markdown for specific URLs (for example, after search results narrow down which pages matter).

<Tabs>
  <Tab title="OpenAI">
    ```json theme={"system"}
    {
      "type": "function",
      "function": {
        "name": "web_fetch",
        "description": "Fetches content from the given URL, returning the content of the page, or if target_content is provided, returns the content of the page that is most relevant to the target. Use this to fetch content from any specific page on the web.",
        "parameters": {
          "type": "object",
          "properties": {
            "urls": {
              "type": "array",
              "description": "The URLs to fetch content from.",
              "items": { "type": "string" }
            },
            "target_content": {
              "type": "string",
              "description": "The content to target from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched."
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
      "description": "Fetches content from the given URL, returning the content of the page, or if target_content is provided, returns the content of the page that is most relevant to the target. Use this to fetch content from any specific page on the web.",
      "input_schema": {
        "type": "object",
        "properties": {
          "urls": {
            "type": "array",
            "description": "The URLs to fetch content from.",
            "items": { "type": "string" }
          },
          "target_content": {
            "type": "string",
            "description": "The content to target from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched."
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
        "description": "Fetches content from the given URL, returning the content of the page, or if target_content is provided, returns the content of the page that is most relevant to the target. Use this to fetch content from any specific page on the web.",
        "parameters": {
            "type": "object",
            "properties": {
                "urls": {
                    "type": "array",
                    "description": "The URLs to fetch content from.",
                    "items": {"type": "string"},
                },
                "target_content": {
                    "type": "string",
                    "description": "The content to target from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched.",
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

In your tool handler, map `target_content` to the Extract API [`objective`](/api-reference/extract/extract) field when the model provides it. Omit `objective` (or pass `null`) when `target_content` is absent or empty for an unfocused full-page extract.

<Tip>
  If you assemble tools in Python, OpenAI expects `{"type": "function", "function": {"name": ..., "description": ..., "parameters": ...}}`. Anthropic expects the same JSON Schema under `input_schema` instead of `parameters` (see the tabs above). For Gemini, pass that schema as `parameters` on `genai.types.FunctionDeclaration` as in the Gemini tab.
</Tip>

## Agent evaluations and benchmarks

When you evaluate agents that call tools against our Search API, we do not recommend exposing extra Search request fields (such as `max_results`, `max_chars_total`, or similar) in the tool schema the model sees. Models often set these without need, which shrinks the search space and hurts quality. Keep tuning parameters server-side in your handler instead.

For realistic end-to-end benchmarks, we recommend evaluating **Search and Extract together**: Search finds relevant URLs and short snippets, and Extract returns concise, token-efficient markdown for the URLs the agent decides it needs to read in depth.

## Why the Descriptions Matter

The `description` fields in each schema are prompts for the LLM — they directly shape how the model constructs search and extract requests. The key guidance baked into `search_web` above:

* **`objective`**: Must be self-contained with the key entity or topic. This tells the model not to write vague objectives like "search for more information" — instead, it should include the specific subject.
* **`search_queries`**: Exactly 3 diverse keyword queries, 3-6 words each. This prevents the model from writing a single verbose query or repeating the same angle three times. The diversity constraint is critical — varying entity names, synonyms, and angles produces significantly better search coverage.

For more on writing effective objectives and queries, see [Search Best Practices](/search/best-practices#objective-and-search-queries).

For `web_fetch`, the optional `target_content` description steers the model toward concrete extraction goals (for example, a specific API or section); omit it when a full-page extract is enough.

## Handling the `search_web` tool call

When your LLM invokes `search_web`, forward the arguments to the [Search API](/api-reference/search/search):

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "objective": "Python 3.12 asyncio.TaskGroup exception propagation behavior",
      "search_queries": [
        "asyncio TaskGroup exception propagation",
        "python 3.12 TaskGroup error handling",
        "TaskGroup nested exception behavior docs"
      ]
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel()

  def handle_search_web(objective: str, search_queries: list[str]) -> dict:
      response = client.search(
          objective=objective,
          search_queries=search_queries,
      )
      return {
          "results": [
              {"url": r.url, "title": r.title, "excerpts": r.excerpts}
              for r in response.results
          ]
      }
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel();

  async function handleSearchWeb(objective: string, searchQueries: string[]) {
    const response = await client.search({
      objective,
      search_queries: searchQueries,
    });
    return {
      results: response.results.map((r) => ({
        url: r.url,
        title: r.title,
        excerpts: r.excerpts,
      })),
    };
  }
  ```
</CodeGroup>

Return the result as a JSON string in the tool response message back to the LLM.

<Note>
  These examples use the default `advanced` mode, which prioritizes result quality for tool use. For lower-latency responses inside tight agent loops, consider `"basic"` — see [Search Modes](/search/modes). You can also configure `max_chars_total`, `advanced_settings`, and other parameters server-side — see the [API Reference](/api-reference/search/search) for the full list.
</Note>

## Handling the `web_fetch` tool call

When your LLM invokes `web_fetch`, forward `urls` and map `target_content` to `objective` on the [Extract API](/api-reference/extract/extract). The examples below request excerpts (enabled by default) for token-efficient tool responses.

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST https://api.parallel.ai/v1/extract \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -d '{
      "urls": ["https://docs.python.org/3/library/asyncio-task.html"],
      "objective": "asyncio.TaskGroup exception propagation"
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel()


  def handle_web_fetch(urls: list[str], target_content: str | None = None) -> dict:
      response = client.extract(
          urls=urls,
          objective=(target_content.strip() if target_content else None),
      )
      return {
          "results": [
              {
                  "url": r.url,
                  "title": r.title,
                  "excerpts": r.excerpts,
              }
              for r in response.results
          ],
          "errors": [{"url": e.url, "error_type": e.error_type} for e in response.errors],
      }
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel();

  async function handleWebFetch(urls: string[], targetContent?: string) {
    const response = await client.extract({
      urls,
      objective: targetContent?.trim() || undefined,
    });
    return {
      results: response.results.map((r) => ({
        url: r.url,
        title: r.title,
        excerpts: r.excerpts,
      })),
      errors: response.errors.map((e) => ({
        url: e.url,
        error_type: e.error_type,
      })),
    };
  }
  ```
</CodeGroup>

Return the result as a JSON string in the tool response message back to the LLM.

## Framework Guides

For a full end-to-end integration walkthrough with a specific framework:

* [OpenAI Tool Calling](/integrations/openai-tool-calling) — complete example with GPT models
* [LangChain](/integrations/langchain) — integration with LangChain agents
* [MCP](/integrations/mcp/quickstart) — auto-provided tool definition, no setup needed

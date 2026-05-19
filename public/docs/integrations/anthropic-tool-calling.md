> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Anthropic Tool Calling

> Use Parallel Search as a tool with Anthropic's Claude models for real-time web access

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

Give your Claude-powered applications real-time web search by registering Parallel Search as a tool. This guide shows how to define Parallel Search using Anthropic's Messages API and handle the tool-call loop.

## Overview

Anthropic's [tool use](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview) lets Claude emit a structured `tool_use` block when it wants to call a function you've defined. Your application executes the function and returns a `tool_result` block in a follow-up `user` message. By registering Parallel Search as a tool, Claude can:

* Search the web for current information
* Access real-time news, research, and facts
* Cite sources with URLs in responses

<Note>
  The Anthropic SDKs also ship a higher-level [Tool Runner](https://docs.claude.com/en/docs/agents-and-tools/tool-use/tool-runner) helper (currently in beta) that runs the loop for you. The example below uses the manual loop so the request/response shapes are explicit; once you understand them, switch to Tool Runner for less boilerplate.
</Note>

## Prerequisites

1. Get your Parallel API key from [Platform](https://platform.parallel.ai)
2. Get your Anthropic API key from [Anthropic Console](https://console.anthropic.com/)
3. Install the required SDKs:

<CodeGroup>
  ```bash Python theme={"system"}
  pip install anthropic parallel-web
  export PARALLEL_API_KEY="your-parallel-api-key"
  export ANTHROPIC_API_KEY="your-anthropic-api-key"
  ```

  ```bash TypeScript theme={"system"}
  npm install @anthropic-ai/sdk parallel-web
  export PARALLEL_API_KEY="your-parallel-api-key"
  export ANTHROPIC_API_KEY="your-anthropic-api-key"
  ```
</CodeGroup>

## Define the Search Tool

Anthropic tool definitions use `name`, `description`, and `input_schema` (no outer `function` wrapper, and the schema field is `input_schema` rather than OpenAI's `parameters`). See [Search Tool Definition](/search/best-practices#search-tool-definition) for a framework-agnostic, copy-paste-ready version.

<CodeGroup>
  ```python Python theme={"system"}
  parallel_search_tool = {
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
                  "items": {"type": "string"},
                  "minItems": 3,
                  "maxItems": 3
              }
          },
          "required": ["objective", "search_queries"]
      }
  }
  ```

  ```typescript TypeScript theme={"system"}
  import Anthropic from "@anthropic-ai/sdk";

  const parallelSearchTool: Anthropic.Tool = {
    name: "search_web",
    description:
      "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
    input_schema: {
      type: "object",
      properties: {
        objective: {
          type: "string",
          description:
            "A concise, self-contained search query. Must include the key entity or topic being searched for.",
        },
        search_queries: {
          type: "array",
          description:
            "Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
          items: { type: "string" },
          minItems: 3,
          maxItems: 3,
        },
      },
      required: ["objective", "search_queries"],
    },
  };
  ```
</CodeGroup>

<Note>
  Add `"strict": true` to the tool definition to enable [strict tool use](https://docs.claude.com/en/docs/agents-and-tools/tool-use/strict-tool-use), which guarantees that Claude's tool inputs conform to your schema exactly.
</Note>

## Implement the Search Function

Create a function that calls the Parallel Search API when Claude requests it:

<CodeGroup>
  ```python Python theme={"system"}
  import os
  from parallel import Parallel

  parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  def search_web(objective: str, search_queries: list[str]) -> dict:
      """Execute a search using the Parallel Search API."""
      response = parallel_client.search(
          objective=objective,
          search_queries=search_queries,
      )
      return {
          "results": [
              {"url": r.url, "title": r.title, "excerpts": r.excerpts[:3] if r.excerpts else []}
              for r in response.results
          ]
      }
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const parallel = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  interface SearchParams {
    objective: string;
    search_queries: string[];
  }

  async function searchWeb(params: SearchParams) {
    const response = await parallel.search({
      objective: params.objective,
      search_queries: params.search_queries,
    });

    return {
      results: response.results.map((r) => ({
        url: r.url,
        title: r.title,
        excerpts: r.excerpts?.slice(0, 3) || [],
      })),
    };
  }
  ```
</CodeGroup>

## Process Tool Calls

Claude returns one or more `tool_use` blocks inside `response.content` whenever `stop_reason == "tool_use"`. Execute each call and reply with a `user` message whose content is a list of `tool_result` blocks:

<CodeGroup>
  ```python Python theme={"system"}
  import json

  def process_tool_calls(content_blocks):
      """Build tool_result blocks for every tool_use block in the response."""
      results = []
      for block in content_blocks:
          if block.type == "tool_use" and block.name == "search_web":
              result = search_web(
                  objective=block.input["objective"],
                  search_queries=block.input["search_queries"],
              )
              results.append({
                  "type": "tool_result",
                  "tool_use_id": block.id,
                  "content": json.dumps(result),
              })
      return results
  ```

  ```typescript TypeScript theme={"system"}
  async function processToolCalls(
    contentBlocks: Anthropic.ContentBlock[]
  ): Promise<Anthropic.ToolResultBlockParam[]> {
    const results: Anthropic.ToolResultBlockParam[] = [];

    for (const block of contentBlocks) {
      if (block.type === "tool_use" && block.name === "search_web") {
        const input = block.input as SearchParams;
        const result = await searchWeb(input);

        results.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }
    }

    return results;
  }
  ```
</CodeGroup>

<Note>
  Anthropic requires that `tool_result` blocks come **first** in the content array of the user message that follows a `tool_use` response — any free-form text must come after them.
</Note>

## Complete Example

End-to-end: a loop that lets Claude call `search_web` until it has enough information to answer.

<CodeGroup>
  ```python Python theme={"system"}
  import os
  import json
  from anthropic import Anthropic
  from parallel import Parallel

  anthropic_client = Anthropic()
  parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  parallel_search_tool = {
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
                  "items": {"type": "string"},
                  "minItems": 3,
                  "maxItems": 3
              }
          },
          "required": ["objective", "search_queries"]
      }
  }


  def search_web(objective: str, search_queries: list[str]) -> dict:
      response = parallel_client.search(
          objective=objective,
          search_queries=search_queries,
      )
      return {
          "results": [
              {"url": r.url, "title": r.title, "excerpts": r.excerpts[:3] if r.excerpts else []}
              for r in response.results
          ]
      }


  def chat_with_search(user_message: str, model: str = "claude-opus-4-7") -> str:
      messages = [{"role": "user", "content": user_message}]
      system = (
          "You are a helpful research assistant. Use the search_web tool to find "
          "current information. Always cite sources with URLs."
      )

      while True:
          response = anthropic_client.messages.create(
              model=model,
              max_tokens=4096,
              system=system,
              tools=[parallel_search_tool],
              messages=messages,
          )

          # Append the assistant turn verbatim so tool_use ids stay aligned.
          messages.append({"role": "assistant", "content": response.content})

          if response.stop_reason != "tool_use":
              return "".join(b.text for b in response.content if b.type == "text")

          tool_results = []
          for block in response.content:
              if block.type == "tool_use" and block.name == "search_web":
                  result = search_web(
                      objective=block.input["objective"],
                      search_queries=block.input["search_queries"],
                  )
                  tool_results.append({
                      "type": "tool_result",
                      "tool_use_id": block.id,
                      "content": json.dumps(result),
                  })

          messages.append({"role": "user", "content": tool_results})


  if __name__ == "__main__":
      print(chat_with_search("What are the latest developments in quantum computing?"))
  ```

  ```typescript TypeScript theme={"system"}
  import Anthropic from "@anthropic-ai/sdk";
  import Parallel from "parallel-web";

  const anthropic = new Anthropic();
  const parallel = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const parallelSearchTool: Anthropic.Tool = {
    name: "search_web",
    description:
      "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
    input_schema: {
      type: "object",
      properties: {
        objective: {
          type: "string",
          description:
            "A concise, self-contained search query. Must include the key entity or topic being searched for.",
        },
        search_queries: {
          type: "array",
          description:
            "Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
          items: { type: "string" },
          minItems: 3,
          maxItems: 3,
        },
      },
      required: ["objective", "search_queries"],
    },
  };

  interface SearchParams {
    objective: string;
    search_queries: string[];
  }

  async function searchWeb(params: SearchParams) {
    const response = await parallel.search({
      objective: params.objective,
      search_queries: params.search_queries,
    });
    return {
      results: response.results.map((r) => ({
        url: r.url,
        title: r.title,
        excerpts: r.excerpts?.slice(0, 3) || [],
      })),
    };
  }

  async function chatWithSearch(
    userMessage: string,
    model: string = "claude-opus-4-7"
  ): Promise<string> {
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: userMessage },
    ];
    const system =
      "You are a helpful research assistant. Use the search_web tool to find " +
      "current information. Always cite sources with URLs.";

    while (true) {
      const response = await anthropic.messages.create({
        model,
        max_tokens: 4096,
        system,
        tools: [parallelSearchTool],
        messages,
      });

      messages.push({ role: "assistant", content: response.content });

      if (response.stop_reason !== "tool_use") {
        return response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("");
      }

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === "tool_use" && block.name === "search_web") {
          const result = await searchWeb(block.input as SearchParams);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        }
      }

      messages.push({ role: "user", content: toolResults });
    }
  }

  async function main() {
    console.log(await chatWithSearch("What are the latest developments in quantum computing?"));
  }

  main().catch(console.error);
  ```
</CodeGroup>

## Tool Parameters

| Parameter        | Type      | Required | Description                                                                                                  |
| ---------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `objective`      | string    | Yes      | A concise, self-contained search query. Must include the key entity or topic being searched for.             |
| `search_queries` | string\[] | Yes      | Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. |

<Note>
  This example uses the default `advanced` mode, which prioritizes result quality for tool use. For lower-latency responses, consider `"basic"` — see [Search Modes](/search/modes).
</Note>

## Differences from the OpenAI Client

If you're porting from the [OpenAI Tool Calling](/integrations/openai-tool-calling) guide, the main shape changes are:

|                       | OpenAI client                                            | Anthropic client                                                         |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------ |
| Tool wrapper          | `{type: "function", function: {...}}`                    | Flat `{name, description, input_schema}`                                 |
| Schema field          | `parameters`                                             | `input_schema`                                                           |
| Tool call in response | `message.tool_calls[i].function.arguments` (JSON string) | `content[i]` block where `type == "tool_use"` (parsed dict)              |
| Tool result message   | `{role: "tool", tool_call_id, content}`                  | `{role: "user", content: [{type: "tool_result", tool_use_id, content}]}` |
| Tool-call signal      | `finish_reason == "tool_calls"`                          | `stop_reason == "tool_use"`                                              |

## Related Resources

* [OpenAI Tool Calling](/integrations/openai-tool-calling)
* [Search API Quickstart](/search/search-quickstart)
* [Search Best Practices](/search/best-practices)
* [Anthropic tool use overview](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)

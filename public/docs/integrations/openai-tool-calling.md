> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI Tool Calling

> Use Parallel Search as a tool with OpenAI's function calling to give GPT models real-time web access

Give your OpenAI-powered applications real-time web search capabilities by integrating Parallel Search as a tool. This guide shows how to define Parallel Search as an OpenAI function and handle tool calls in your application.

## Overview

OpenAI's [tool calling](https://platform.openai.com/docs/guides/function-calling) (formerly function calling) allows GPT models to output structured JSON indicating they want to call a function you've defined. Your application then executes the function and returns results to the model. By defining Parallel Search as a tool, your model can:

* Search the web for current information
* Access real-time news, research, and facts
* Cite sources with URLs in responses

## Prerequisites

1. Get your Parallel API key from [Platform](https://platform.parallel.ai)
2. Get your OpenAI API key from [OpenAI](https://platform.openai.com/api-keys)
3. Install the required SDKs:

<CodeGroup>
  ```bash Python theme={"system"}
  pip install openai parallel-web
  export PARALLEL_API_KEY="your-parallel-api-key"
  export OPENAI_API_KEY="your-openai-api-key"
  ```

  ```bash TypeScript theme={"system"}
  npm install openai parallel-web
  export PARALLEL_API_KEY="your-parallel-api-key"
  export OPENAI_API_KEY="your-openai-api-key"
  ```
</CodeGroup>

## Define the Search Tool

First, define the Parallel search tool using OpenAI's tool schema format. See [Search Tool Definition](/search/best-practices#search-tool-definition) for a framework-agnostic, copy-paste-ready version.

<CodeGroup>
  ```python Python theme={"system"}
  parallel_search_tool = {
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
                      "items": {"type": "string"},
                      "minItems": 3,
                      "maxItems": 3
                  }
              },
              "required": ["objective", "search_queries"]
          }
      }
  }
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";

  const parallelSearchTool: OpenAI.ChatCompletionTool = {
    type: "function",
    function: {
      name: "search_web",
      description:
        "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
      parameters: {
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
    },
  };
  ```
</CodeGroup>

## Implement the Search Function

Create a function that calls the Parallel Search API when the model requests it:

<CodeGroup>
  ```python Python theme={"system"}
  import os
  import json
  from parallel import Parallel

  parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  def search_web(
      objective: str = None,
      search_queries: list = None,
  ) -> dict:
      """Execute a search using the Parallel Search API."""
      response = parallel_client.search(
          objective=objective,
          search_queries=search_queries,
      )

      # Format results for the LLM
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
    objective?: string;
    search_queries?: string[];
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

Handle the tool calls returned by OpenAI:

<CodeGroup>
  ```python Python theme={"system"}
  def process_tool_calls(tool_calls):
      """Process tool calls from OpenAI and return results."""
      results = []
      for tool_call in tool_calls:
          if tool_call.function.name == "search_web":
              args = json.loads(tool_call.function.arguments)
              search_result = search_web(
                  objective=args.get("objective"),
                  search_queries=args.get("search_queries"),
              )
              results.append({
                  "tool_call_id": tool_call.id,
                  "role": "tool",
                  "content": json.dumps(search_result)
              })
      return results
  ```

  ```typescript TypeScript theme={"system"}
  async function processToolCalls(
    toolCalls: OpenAI.ChatCompletionMessageToolCall[]
  ) {
    const results: OpenAI.ChatCompletionToolMessageParam[] = [];

    for (const toolCall of toolCalls) {
      if (toolCall.function.name === "search_web") {
        const args = JSON.parse(toolCall.function.arguments) as SearchParams;
        const searchResult = await searchWeb(args);

        results.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(searchResult),
        });
      }
    }

    return results;
  }
  ```
</CodeGroup>

## Complete Example

Here's a complete example that ties everything together:

<CodeGroup>
  ```python Python theme={"system"}
  import os
  import json
  from openai import OpenAI
  from parallel import Parallel

  # Initialize clients
  openai_client = OpenAI()
  parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  # Tool definition
  parallel_search_tool = {
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
                      "items": {"type": "string"},
                      "minItems": 3,
                      "maxItems": 3
                  }
              },
              "required": ["objective", "search_queries"]
          }
      }
  }


  def search_web(objective=None, search_queries=None):
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


  def chat_with_search(user_message: str) -> str:
      messages = [
          {
              "role": "system",
              "content": "You are a helpful research assistant. Use the search_web tool to find current information. Always cite sources with URLs."
          },
          {"role": "user", "content": user_message}
      ]

      # First API call - may trigger tool use
      response = openai_client.chat.completions.create(
          model="gpt-4o",
          messages=messages,
          tools=[parallel_search_tool],
          tool_choice="auto"
      )

      assistant_message = response.choices[0].message

      # Check if the model wants to use tools
      if assistant_message.tool_calls:
          messages.append(assistant_message)

          # Process each tool call
          for tool_call in assistant_message.tool_calls:
              if tool_call.function.name == "search_web":
                  args = json.loads(tool_call.function.arguments)
                  result = search_web(
                      objective=args.get("objective"),
                      search_queries=args.get("search_queries"),
                  )
                  messages.append({
                      "role": "tool",
                      "tool_call_id": tool_call.id,
                      "content": json.dumps(result)
                  })

          # Second API call with search results
          response = openai_client.chat.completions.create(
              model="gpt-4o",
              messages=messages,
              tools=[parallel_search_tool],
              tool_choice="auto"
          )

      return response.choices[0].message.content


  # Example usage
  if __name__ == "__main__":
      answer = chat_with_search("What are the latest developments in quantum computing?")
      print(answer)
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";
  import Parallel from "parallel-web";

  const openai = new OpenAI();
  const parallel = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  // Tool definition
  const parallelSearchTool: OpenAI.ChatCompletionTool = {
    type: "function",
    function: {
      name: "search_web",
      description:
        "Searches the web for current and factual information, returning relevant results with titles, URLs, and content snippets.",
      parameters: {
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
    },
  };

  interface SearchArgs {
    objective?: string;
    search_queries?: string[];
  }

  async function searchWeb(args: SearchArgs) {
    const response = await parallel.search({
      objective: args.objective,
      search_queries: args.search_queries,
    });

    return {
      results: response.results.map((r) => ({
        url: r.url,
        title: r.title,
        excerpts: r.excerpts?.slice(0, 3) || [],
      })),
    };
  }

  async function chatWithSearch(userMessage: string): Promise<string | null> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are a helpful research assistant. Use the search_web tool to find current information. Always cite sources with URLs.",
      },
      { role: "user", content: userMessage },
    ];

    // First API call
    let response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: [parallelSearchTool],
      tool_choice: "auto",
    });

    let assistantMessage = response.choices[0].message;

    // Handle tool calls
    if (assistantMessage.tool_calls) {
      messages.push(assistantMessage);

      for (const toolCall of assistantMessage.tool_calls) {
        if (toolCall.function.name === "search_web") {
          const args = JSON.parse(toolCall.function.arguments) as SearchArgs;
          const result = await searchWeb(args);

          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }
      }

      // Second API call with results
      response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        tools: [parallelSearchTool],
        tool_choice: "auto",
      });
    }

    return response.choices[0].message.content;
  }

  // Example usage
  async function main() {
    const answer = await chatWithSearch("What are the latest developments in quantum computing?");
    console.log(answer);
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

## Related Resources

* [Search API Quickstart](/search/search-quickstart)
* [Search Best Practices](/search/best-practices)
* [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

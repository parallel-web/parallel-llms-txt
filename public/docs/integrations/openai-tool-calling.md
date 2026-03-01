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

First, define the Parallel search tool using OpenAI's tool schema format:

<CodeGroup>
  ```python Python theme={"system"}
  parallel_search_tool = {
      "type": "function",
      "function": {
          "name": "parallel_search",
          "description": "Search the web for current information using Parallel's AI-powered search. Returns relevant excerpts from web pages optimized for LLM consumption. Use this for finding up-to-date information, news, research, and facts. Provide at least one of objective or search_queries.",
          "parameters": {
              "type": "object",
              "properties": {
                  "objective": {
                      "type": "string",
                      "description": "A natural language description of what you're searching for. Be specific about your research goal."
                  },
                  "search_queries": {
                      "type": "array",
                      "items": {"type": "string"},
                      "description": "Specific search queries to execute. Use multiple queries to cover different angles of the search."
                  },
                  "max_chars_total": {
                      "type": "integer",
                      "description": "Maximum total characters across all excerpts. Default 50000."
                  }
              }
          }
      }
  }
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";

  const parallelSearchTool: OpenAI.ChatCompletionTool = {
    type: "function",
    function: {
      name: "parallel_search",
      description:
        "Search the web for current information using Parallel's AI-powered search. Returns relevant excerpts from web pages optimized for LLM consumption. Use this for finding up-to-date information, news, research, and facts. Provide at least one of objective or search_queries.",
      parameters: {
        type: "object",
        properties: {
          objective: {
            type: "string",
            description:
              "A natural language description of what you're searching for. Be specific about your research goal.",
          },
          search_queries: {
            type: "array",
            items: { type: "string" },
            description:
              "Specific search queries to execute. Use multiple queries to cover different angles of the search.",
          },
          max_chars_total: {
            type: "integer",
            description: "Maximum total characters across all excerpts. Default 50000.",
          },
        },
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

  def parallel_search(objective: str = None, search_queries: list = None, max_chars_total: int = 50000) -> dict:
      """Execute a search using the Parallel Search API."""
      response = parallel_client.beta.search(
          objective=objective,
          search_queries=search_queries,
          excerpts={"max_chars_per_result": 5000, "max_chars_total": max_chars_total}
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
    max_chars_total?: number;
  }

  async function parallelSearch(params: SearchParams) {
    const response = await parallel.beta.search({
      objective: params.objective,
      search_queries: params.search_queries,
      excerpts: { max_chars_per_result: 5000, max_chars_total: params.max_chars_total || 50000 },
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
          if tool_call.function.name == "parallel_search":
              args = json.loads(tool_call.function.arguments)
              search_result = parallel_search(
                  objective=args.get("objective"),
                  search_queries=args.get("search_queries"),
                  max_chars_total=args.get("max_chars_total", 50000)
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
      if (toolCall.function.name === "parallel_search") {
        const args = JSON.parse(toolCall.function.arguments) as SearchParams;
        const searchResult = await parallelSearch(args);

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
          "name": "parallel_search",
          "description": "Search the web for current information using Parallel's AI-powered search. Provide at least one of objective or search_queries.",
          "parameters": {
              "type": "object",
              "properties": {
                  "objective": {
                      "type": "string",
                      "description": "A natural language description of what you're searching for."
                  },
                  "search_queries": {
                      "type": "array",
                      "items": {"type": "string"},
                      "description": "Specific search queries to execute."
                  },
                  "max_results": {
                      "type": "integer",
                      "description": "Maximum results (1-20). Default 10."
                  },
                  "max_chars_total": {
                      "type": "integer",
                      "description": "Maximum total characters across all excerpts. Default 50000."
                  }
              }
          }
      }
  }


  def parallel_search(objective=None, search_queries=None, max_results=10, max_chars_total=50000):
      response = parallel_client.beta.search(
          objective=objective,
          search_queries=search_queries,
          max_results=max_results,
          excerpts={"max_chars_per_result": 5000, "max_chars_total": max_chars_total}
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
              "content": "You are a helpful research assistant. Use the parallel_search tool to find current information. Always cite sources with URLs."
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
              if tool_call.function.name == "parallel_search":
                  args = json.loads(tool_call.function.arguments)
                  result = parallel_search(
                      objective=args.get("objective"),
                      search_queries=args.get("search_queries"),
                      max_results=args.get("max_results", 10),
                      max_chars_total=args.get("max_chars_total", 50000)
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
      name: "parallel_search",
      description: "Search the web for current information using Parallel's AI-powered search. Provide at least one of objective or search_queries.",
      parameters: {
        type: "object",
        properties: {
          objective: {
            type: "string",
            description: "A natural language description of what you're searching for.",
          },
          search_queries: {
            type: "array",
            items: { type: "string" },
            description: "Specific search queries to execute.",
          },
          max_results: {
            type: "integer",
            description: "Maximum results (1-20). Default 10.",
          },
          max_chars_total: {
            type: "integer",
            description: "Maximum total characters across all excerpts. Default 50000.",
          },
        },
      },
    },
  };

  interface SearchArgs {
    objective?: string;
    search_queries?: string[];
    max_results?: number;
    max_chars_total?: number;
  }

  async function parallelSearch(args: SearchArgs) {
    const response = await parallel.beta.search({
      objective: args.objective,
      search_queries: args.search_queries,
      max_results: args.max_results || 10,
      excerpts: { max_chars_per_result: 5000, max_chars_total: args.max_chars_total || 50000 },
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
        content: "You are a helpful research assistant. Use the parallel_search tool to find current information. Always cite sources with URLs.",
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
        if (toolCall.function.name === "parallel_search") {
          const args = JSON.parse(toolCall.function.arguments) as SearchArgs;
          const result = await parallelSearch(args);

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

| Parameter         | Type      | Required | Description                                                  |
| ----------------- | --------- | -------- | ------------------------------------------------------------ |
| `objective`       | string    | No\*     | Natural language description of your search goal             |
| `search_queries`  | string\[] | No\*     | Specific search queries to execute                           |
| `max_chars_total` | integer   | No       | Maximum total characters across all excerpts (default 50000) |

\*At least one of `objective` or `search_queries` is required.

<Note>
  The complete example above shows additional optional parameters (`max_results`) that you can add to the tool definition for more control. See the [Search API documentation](/search/search-quickstart) for all available options.
</Note>

## Related Resources

* [Search API Quickstart](/search/search-quickstart)
* [Search Best Practices](/search/best-practices)
* [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

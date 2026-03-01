> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat API Quickstart

> Build low-latency web research applications with OpenAI-compatible streaming chat completions

Parallel Chat is a web research API that returns OpenAI ChatCompletions compatible streaming text and JSON.
The Chat API supports multiple models—from the `speed` model for low latency across a
broad range of use cases, to research models (`lite`, `base`, `core`) for deeper research-grade outputs
where you can afford to wait longer for even more comprehensive responses with full [research basis](/task-api/guides/access-research-basis) support.

<Note>
  {" "}

  **Beta Notice**: Parallel Chat is in beta. We provide a rate limit of 300 requests
  per minute for the Chat API out of the box. [Contact us](mailto:support@parallel.ai)
  for production capacity.{" "}
</Note>

## Choosing the Right Model

The Chat API supports both the `speed` model for
low latency applications and research models for deeper outputs.
Research models (`lite`, `base`, `core`) are Chat API wrappers over our [Task API processors](/task-api/guides/choose-a-processor),
providing the same research capabilities along with basis in an OpenAI-compatible interface.

| Model   | Best For                                      | Basis Support | Latency (TTFT) |
| ------- | --------------------------------------------- | ------------- | -------------- |
| `speed` | Low latency across a broad range of use cases | No            | \~3s           |
| `lite`  | Simple lookups, basic metadata                | Yes           | 10-60s         |
| `base`  | Standard enrichments, factual queries         | Yes           | 15-100s        |
| `core`  | Complex research, multi-source synthesis      | Yes           | 60s-5min       |

<Tip>Use `speed` for low latency across a broad range of use cases.
Use research models (`lite`, `base`, `core`) for more research-intensive workflows
where you can afford to wait longer for an even deeper response with citations,
reasoning, and confidence levels via the [research basis](/task-api/guides/access-research-basis).</Tip>

## 1. Set up Prerequisites

The Chat API is fully compatible with the OpenAI SDK — just swap the base URL and API key. Generate your API key on [Platform](https://platform.parallel.ai), then install the OpenAI SDK:

<CodeGroup>
  ```bash Python theme={"system"}
  pip install openai
  export PARALLEL_API_KEY="your-api-key"
  ```

  ```bash TypeScript theme={"system"}
  npm install openai
  export PARALLEL_API_KEY="your-api-key"
  ```

  ```bash cURL theme={"system"}
  export PARALLEL_API_KEY="your-api-key"
  ```
</CodeGroup>

## Performance and Rate Limits

Speed is optimized for interactive applications requiring low latency responses:

* **Performance**: With `stream=true`, achieves 3 second p50 TTFT (median time to first token)
* **Default Rate Limit**: 300 requests per minute
* **Use Cases**: Chat interfaces, interactive tools

For research based tasks where latency is not the primary concern, use one of the research models.

For production deployments requiring higher rate limits, [contact our team](https://www.parallel.ai).

## 2. Make Your First Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -N https://api.parallel.ai/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $PARALLEL_API_KEY" \
    -d '{
      "model": "speed",
      "messages": [
        { "role": "user", "content": "What does Parallel Web Systems do?" }
      ],
      "stream": false,
      "response_format": {
        "type": "json_schema",
        "json_schema": {
          "name": "reasoning_schema",
          "schema": {
            "type": "object",
            "properties": {
              "reasoning": {
                "type": "string",
                "description": "Think step by step to arrive at the answer"
              },
              "answer": {
                "type": "string",
                "description": "The direct answer to the question"
              },
              "citations": {
                "type": "array",
                "items": { "type": "string" },
                "description": "Sources cited to support the answer"
              }
            }
          }
        }
      }
    }'
  ```

  ```bash cURL (Streaming) theme={"system"}
  curl -N https://api.parallel.ai/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $PARALLEL_API_KEY" \
    -d '{
      "model": "speed",
      "messages": [
        { "role": "user", "content": "What does Parallel Web Systems do?" }
      ],
      "stream": true,
      "response_format": {
        "type": "json_schema",
        "json_schema": {
          "name": "reasoning_schema",
          "schema": {
            "type": "object",
            "properties": {
              "reasoning": {
                "type": "string",
                "description": "Think step by step to arrive at the answer"
              },
              "answer": {
                "type": "string",
                "description": "The direct answer to the question"
              },
              "citations": {
                "type": "array",
                "items": { "type": "string" },
                "description": "Sources cited to support the answer"
              }
            }
          }
        }
      }
    }'
  ```

  ```python Python theme={"system"}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["PARALLEL_API_KEY"],
      base_url="https://api.parallel.ai"  # Parallel's API endpoint
  )

  response = client.chat.completions.create(
      model="speed", # Parallel model name
      messages=[
          {"role": "user", "content": "What does Parallel Web Systems do?"}
      ],
      response_format={
          "type": "json_schema",
          "json_schema": {
              "name": "reasoning_schema",
              "schema": {
                  "type": "object",
                  "properties": {
                      "reasoning": {
                          "type": "string",
                          "description": "Think step by step to arrive at the answer",
                      },
                      "answer": {
                          "type": "string",
                          "description": "The direct answer to the question",
                      },
                      "citations": {
                          "type": "array",
                          "items": {"type": "string"},
                          "description": "Sources cited to support the answer",
                      },
                  },
              },
          },
      },
  )

  print(response.choices[0].message.content)
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";

  const client = new OpenAI({
    apiKey: process.env.PARALLEL_API_KEY,
    baseURL: "https://api.parallel.ai", // Parallel's API endpoint
  });

  async function main() {
    const response = await client.chat.completions.create({
      model: "speed", // Parallel model name
      messages: [{ role: "user", content: "What does Parallel Web Systems do?" }],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "reasoning_schema",
          schema: {
            type: "object",
            properties: {
              reasoning: {
                type: "string",
                description: "Think step by step to arrive at the answer",
              },
              answer: {
                type: "string",
                description: "The direct answer to the question",
              },
              citations: {
                type: "array",
                items: { type: "string" },
                description: "Sources cited to support the answer",
              },
            },
          },
        },
      },
    });

    console.log(response.choices[0].message.content);
  }

  main();
  ```

  ```python Python (Streaming) theme={"system"}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["PARALLEL_API_KEY"],
      base_url="https://api.parallel.ai"  # Parallel's API endpoint
  )

  stream = client.chat.completions.create(
      model="speed", # Parallel model name
      messages=[
          {"role": "user", "content": "What does Parallel Web Systems do?"}
      ],
      stream=True,
      response_format={
          "type": "json_schema",
          "json_schema": {
              "name": "reasoning_schema",
              "schema": {
                  "type": "object",
                  "properties": {
                      "reasoning": {
                          "type": "string",
                          "description": "Think step by step to arrive at the answer",
                      },
                      "answer": {
                          "type": "string",
                          "description": "The direct answer to the question",
                      },
                      "citations": {
                          "type": "array",
                          "items": {"type": "string"},
                          "description": "Sources cited to support the answer",
                      },
                  },
              },
          },
      },
  )

  for chunk in stream:
      if chunk.choices[0].delta.content is not None:
          print(chunk.choices[0].delta.content, end="", flush=True)

  print()
  ```

  ```typescript TypeScript (Streaming) theme={"system"}
  import OpenAI from "openai";

  const client = new OpenAI({
    apiKey: process.env.PARALLEL_API_KEY,
    baseURL: "https://api.parallel.ai", // Parallel's API endpoint
  });

  async function main() {
    const stream = await client.chat.completions.create({
      model: "speed", // Parallel model name
      messages: [{ role: "user", content: "What does Parallel Web Systems do?" }],
      stream: true,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "reasoning_schema",
          schema: {
            type: "object",
            properties: {
              reasoning: {
                type: "string",
                description: "Think step by step to arrive at the answer",
              },
              answer: {
                type: "string",
                description: "The direct answer to the question",
              },
              citations: {
                type: "array",
                items: { type: "string" },
                description: "Sources cited to support the answer",
              },
            },
          },
        },
      },
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    process.stdout.write("\\n");
  }

  main();
  ```
</CodeGroup>

## System Prompt

You can provide a custom system prompt to control the AI's behavior and response style by including it in the messages array with `"role": "system"` as the first message in your request.

## Using Research Models

When you use research models (`lite`, `base`, or `core`) instead of `speed`, the
Chat API provides research-grade outputs with
full [research basis](/task-api/guides/access-research-basis) support.
The basis includes citations, reasoning, and confidence levels for each response.

### Example with Research Model

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -N https://api.parallel.ai/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $PARALLEL_API_KEY" \
    -d '{
      "model": "base",
      "messages": [
        { "role": "user", "content": "What is the founding date and headquarters of Parallel Web Systems?" }
      ],
      "stream": false
    }'
  ```

  ```python Python theme={"system"}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["PARALLEL_API_KEY"],
      base_url="https://api.parallel.ai"  # Parallel's API endpoint
  )

  response = client.chat.completions.create(
      model="base",  # Research model for deeper output
      messages=[
          {"role": "user", "content": "What is the founding date and headquarters of Parallel Web Systems?"}
      ],
  )

  # Access the response content
  print(response.choices[0].message.content)

  # Access the research basis (citations, reasoning, confidence)
  print(response.basis)
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";

  const client = new OpenAI({
    apiKey: process.env.PARALLEL_API_KEY,
    baseURL: "https://api.parallel.ai", // Parallel's API endpoint
  });

  async function main() {
    const response = await client.chat.completions.create({
      model: "base", // Research model for deeper output
      messages: [
        {
          role: "user",
          content: "What is the founding date and headquarters of Parallel Web Systems?",
        },
      ],
    });

    // Access the response content
    console.log(response.choices[0].message.content);

    // Access the research basis (citations, reasoning, confidence)
    console.log((response as any).basis);
  }

  main();
  ```
</CodeGroup>

For complete details on the research basis structure, including per-element basis for arrays, see the [Basis documentation](/task-api/guides/access-research-basis).

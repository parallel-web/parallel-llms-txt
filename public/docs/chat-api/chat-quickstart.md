> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI ChatCompletions Compatibility

> Build low-latency web research applications with OpenAI-compatible streaming chat completions

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

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

## OpenAI SDK Compatibility

<Note>
  **Research Basis via OpenAI SDK**: When using task processors (`lite`, `base`, `core`) with the Chat API, the response includes a `basis` field with citations, reasoning, and confidence levels. Access it via `response.basis` in Python or `(response as any).basis` in TypeScript. See [Basis documentation](/task-api/guides/access-research-basis) for details.
</Note>

### Important OpenAI Compatibility Limitations

#### API Behavior

Here are the most substantial differences from using OpenAI:

* Multimodal input (images/audio) is not supported and will be ignored.
* Prompt caching is not supported.
* Most unsupported fields are silently ignored rather than producing errors. These are all documented below.

### Detailed OpenAI Compatible API Support

#### Request Fields

##### Simple Fields

| Field                   | Support Status                         |
| ----------------------- | -------------------------------------- |
| model                   | Use `speed`, `lite`, `base`, or `core` |
| response\_format        | Fully supported                        |
| stream                  | Fully supported                        |
| max\_tokens             | Ignored                                |
| max\_completion\_tokens | Ignored                                |
| stream\_options         | Ignored                                |
| top\_p                  | Ignored                                |
| parallel\_tool\_calls   | Ignored                                |
| stop                    | Ignored                                |
| temperature             | Ignored                                |
| n                       | Ignored                                |
| logprobs                | Ignored                                |
| metadata                | Ignored                                |
| prediction              | Ignored                                |
| presence\_penalty       | Ignored                                |
| frequency\_penalty      | Ignored                                |
| seed                    | Ignored                                |
| service\_tier           | Ignored                                |
| audio                   | Ignored                                |
| logit\_bias             | Ignored                                |
| store                   | Ignored                                |
| user                    | Ignored                                |
| modalities              | Ignored                                |
| top\_logprobs           | Ignored                                |
| reasoning\_effort       | Ignored                                |

##### Tools / Functions Fields

Tools are ignored.

##### Messages Array Fields

| Field                      | Support Status  |
| -------------------------- | --------------- |
| messages\[].role           | Fully supported |
| messages\[].content        | String only     |
| messages\[].name           | Fully supported |
| messages\[].tool\_calls    | Ignored         |
| messages\[].tool\_call\_id | Ignored         |
| messages\[].function\_call | Ignored         |
| messages\[].audio          | Ignored         |
| messages\[].modalities     | Ignored         |

<Note>
  The `content` field only supports string values. Structured content arrays (e.g., for multimodal inputs with text and image parts) are not supported.
</Note>

#### Response Fields

| Field                             | Support Status                 |
| --------------------------------- | ------------------------------ |
| id                                | Always empty                   |
| choices\[]                        | Will always have a length of 1 |
| choices\[].finish\_reason         | Always empty                   |
| choices\[].index                  | Fully supported                |
| choices\[].message.role           | Fully supported                |
| choices\[].message.content        | Fully supported                |
| choices\[].message.tool\_calls    | Always empty                   |
| object                            | Always empty                   |
| created                           | Fully supported                |
| model                             | Always empty                   |
| finish\_reason                    | Always empty                   |
| content                           | Fully supported                |
| usage.completion\_tokens          | Always empty                   |
| usage.prompt\_tokens              | Always empty                   |
| usage.total\_tokens               | Always empty                   |
| usage.completion\_tokens\_details | Always empty                   |
| usage.prompt\_tokens\_details     | Always empty                   |
| choices\[].message.refusal        | Always empty                   |
| choices\[].message.audio          | Always empty                   |
| logprobs                          | Always empty                   |
| service\_tier                     | Always empty                   |
| system\_fingerprint               | Always empty                   |

##### Parallel-Specific Response Fields

The following fields are Parallel extensions not present in the OpenAI API:

| Field | Support Status                                          |
| ----- | ------------------------------------------------------- |
| basis | Supported with task processors (`lite`, `base`, `core`) |

#### Error Message Compatibility

The compatibility layer maintains approximately the same error formats as the OpenAI API.

#### Header Compatibility

While the OpenAI SDK automatically manages headers, here is the complete list of headers supported by Parallel's API for developers who need to work with them directly.

| Field                          | Support Status  |
| ------------------------------ | --------------- |
| authorization                  | Fully supported |
| x-ratelimit-limit-requests     | Ignored         |
| x-ratelimit-limit-tokens       | Ignored         |
| x-ratelimit-remaining-requests | Ignored         |
| x-ratelimit-remaining-tokens   | Ignored         |
| x-ratelimit-reset-requests     | Ignored         |
| x-ratelimit-reset-tokens       | Ignored         |
| retry-after                    | Ignored         |
| x-request-id                   | Ignored         |
| openai-version                 | Ignored         |
| openai-processing-ms           | Ignored         |

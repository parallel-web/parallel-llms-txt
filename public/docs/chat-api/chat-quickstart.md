# Chat API Quickstart

> Get started with Parallel Chat

Parallel Chat is a low latency web research API that returns OpenAI ChatCompletions compatible streaming text and JSON. The Chat API is designed for interactive workflows where speed is paramount.

<Note>
  {" "}

  **Beta Notice**: Parallel Chat is in beta. We provide a rate limit of 300 requests
  per minute for the Chat API out of the box. [Contact us](mailto:support@parallel.ai)
  for production capacity.{" "}
</Note>

While the Chat API optimizes for latency, we recommend using Parallel Tasks for more complex research queries.

## Getting Started with the OpenAI SDK

To use the OpenAI SDK compatibility feature, you'll need to:

1. Use an official OpenAI SDK
2. Make these changes:
   * Update your base URL to point to Parallel's beta API endpoint
   * Replace your API key with a Parallel API key
   * Update your model name to "speed"
3. Review the documentation below for supported features

## Performance and Rate Limits

Speed is optimized for interactive applications requiring low latency responses:

* **Performance**: With `stream=true`, achieves 3 second p50 TTFT (median time to first token)
* **Default Rate Limit**: 300 requests per minute
* **Use Cases**: Chat interfaces, interactive tools

For production deployments requiring consistent performance at scale (reliable p99 latency) or higher throughput, [contact our team](https://www.parallel.ai).

## Example Execution

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
  from openai import OpenAI

  client = OpenAI(
      api_key="PARALLEL_API_KEY",  # Your Parallel API key
      base_url="https://api.parallel.ai"  # Parallel's API beta endpoint
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
    apiKey: "PARALLEL_API_KEY", // Your Parallel API key
    baseURL: "https://api.parallel.ai", // Parallel's API beta endpoint
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
  from openai import OpenAI

  client = OpenAI(
      api_key="PARALLEL_API_KEY",  # Your Parallel API key
      base_url="https://api.parallel.ai"  # Parallel's API beta endpoint
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
    apiKey: "PARALLEL_API_KEY", // Your Parallel API key
    baseURL: "https://api.parallel.ai", // Parallel's API beta endpoint
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

Users can provide a custom system prompt to control the AI's behavior and response style. If no custom system prompt is specified in your request, the following default system prompt will be automatically applied:

```markdown [expandable] theme={"system"}
Today's date is {datetime.now(timezone(timedelta(hours=-7))).strftime("%A, %B %d, %Y")} and \
the current time is {datetime.now(timezone(timedelta(hours=-7))).strftime("%I:%M %p PT")} (California time).
You are a helpful assistant with access to web search results and page content.
Base your answers on the provided context. If the answer isn't in the context,
say you don't know rather than making up information.

# Guidelines for answering questions

    Write your answer in markdown format, with well defined and numbered headers and subheaders. If possible, also summarize the answer at the end with a helpful table.
    When answering questions, aim to give a thorough and informative answer, even if doing so requires expanding beyond the specific inquiry from the user.
    If multiple possible answers are available in the sources, present all possible answers.
    If the question has multiple parts or covers various aspects, ensure that you answer them all to the best of your ability.
    If the question is time dependent, always reference the exact timestamp from the source and clearly indicate when the information was published or last updated. Format dates consistently as YYYY-MM-DD (e.g., "2024-05-15") or relative time references (e.g., "published 3 hours ago").
    If you are asked a question in a language other than English, try to answer the question in that language.
    ALWAYS cite all sources at the end of your answer. Every source used for the answer should be cited, along with the domain of the source. Add the timestamp to the citation if it is available.

Example:

# 1. London Bank sues UK Govt

[London Bank](londonbank.com) sues UK Govt as...

# Summary

| Date       | Event               | Details                                         | Source         |
| ---------- | ------------------- | ----------------------------------------------- | -------------- |
| 2024-05-15 | Initial Filing      | London Bank files lawsuit against UK Government | londonbank.com |
| 2024-05-16 | Government Response | UK Government issues initial response           | gov.uk         |
| 2024-05-18 | Press Conference    | London Bank CEO explains rationale for lawsuit  | londonbank.com |
| 2024-05-20 | Court Hearing       | Preliminary hearing scheduled                   | courts.gov.uk  |

Sources:

1. [London Bank sues UK Govt -- londonbank.com](https://www.londonbank.com/sues-govt)
2. [UK Govt response -- gov.uk](https://www.gov.uk/response)
3. [UK Govt press release -- gov.uk, 2024-05-15](https://www.gov.uk/press-release/2024-05-15)
```

To use a custom system prompt, include it in the messages array with "role": "system" as the first message in your request.

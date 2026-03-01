> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Programmatic Use

> How to use the MCP servers Programmatically

When building an agent or chat experiences that requires search, deep research, or batch task processing capabilities, it can be a good choice to integrate with our MCPs. When you desire more control over the reasoning and tool descriptions for niche use-cases (if the system prompt isn't sufficient) or want to limit or simplify the tools, it may be better to use the APIs directly to build your own tools, for example using the [AI SDK](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling). Using the [MCP-to-AI-SDK](https://github.com/vercel-labs/mcp-to-ai-sdk) is an excellent starting point in that case.

To use the Parallel MCP servers programmatically, you need to either perform the [OAuth flow](/integrations/oauth-provider) to provide an API key, or use your Parallel API key directly as a Bearer token in the Authorization header.

## OpenAI Integration

### Search MCP with OpenAI

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.openai.com/v1/responses \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-5",
      "tools": [
        {
          "type": "mcp",
          "server_label": "parallel_web_search",
          "server_url": "https://search-mcp.parallel.ai/mcp",
          "headers": {
            "Authorization": "Bearer YOUR_PARALLEL_API_KEY"
          },
          "require_approval": "never"
        }
      ],
      "input": "Who is the CEO of Apple?"
    }'
  ```

  ```python Python theme={"system"}
  from openai import OpenAI
  from openai.types import responses as openai_responses

  parallel_api_key = "PARALLEL_API_KEY"  # Your Parallel API key
  openai_api_key = "YOUR_OPENAI_API_KEY"  # Your OpenAI API key

  tools = [
      openai_responses.tool_param.Mcp(
          server_label="parallel_web_search",
          server_url="https://search-mcp.parallel.ai/mcp",
          headers={"Authorization": "Bearer " + parallel_api_key},
          type="mcp",
          require_approval="never",
      )
  ]

  response = OpenAI(
      api_key=openai_api_key
  ).responses.create(
      model="gpt-5",
      input="Who is the CEO of Apple?",
      tools=tools
  )

  print(response.output_text)
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";
  import { ResponseTool } from "openai/resources/responses";

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const parallelApiKey = process.env.PARALLEL_API_KEY;

  const response = await client.responses.create({
    model: "gpt-5",
    tools: [
      {
        type: "mcp",
        server_label: "parallel_web_search",
        server_url: "https://search-mcp.parallel.ai/mcp",
        headers: { Authorization: `Bearer ${parallelApiKey}` },
        require_approval: "never",
      } as ResponseTool.Mcp,
    ],
    input: "Who is the CEO of Apple?",
  });

  console.log(response.output_text);
  ```
</CodeGroup>

### Task MCP with OpenAI

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.openai.com/v1/responses \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-5",
      "tools": [
        {
          "type": "mcp",
          "server_label": "parallel_task",
          "server_url": "https://task-mcp.parallel.ai/mcp",
          "headers": {
            "Authorization": "Bearer YOUR_PARALLEL_API_KEY"
          },
          "require_approval": "never"
        }
      ],
      "input": "Create a deep research task about the latest developments in AI safety research"
    }'
  ```

  ```python Python theme={"system"}
  from openai import OpenAI
  from openai.types import responses as openai_responses

  parallel_api_key = "PARALLEL_API_KEY"  # Your Parallel API key
  openai_api_key = "YOUR_OPENAI_API_KEY"  # Your OpenAI API key

  tools = [
      openai_responses.tool_param.Mcp(
          server_label="parallel_task",
          server_url="https://task-mcp.parallel.ai/mcp",
          headers={"Authorization": "Bearer " + parallel_api_key},
          type="mcp",
          require_approval="never",
      )
  ]

  response = OpenAI(
      api_key=openai_api_key
  ).responses.create(
      model="gpt-5",
      input="Create a deep research task about the latest developments in AI safety research",
      tools=tools
  )

  print(response.output_text)
  ```

  ```typescript TypeScript theme={"system"}
  import OpenAI from "openai";
  import { ResponseTool } from "openai/resources/responses";

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const parallelApiKey = process.env.PARALLEL_API_KEY;

  const response = await client.responses.create({
    model: "gpt-5",
    tools: [
      {
        type: "mcp",
        server_label: "parallel_task",
        server_url: "https://task-mcp.parallel.ai/mcp",
        headers: { Authorization: `Bearer ${parallelApiKey}` },
        require_approval: "never",
      } as ResponseTool.Mcp,
    ],
    input:
      "Create a deep research task about the latest developments in AI safety research",
  });

  console.log(response.output_text);
  ```
</CodeGroup>

## Anthropic Integration

### Search MCP with Anthropic

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.anthropic.com/v1/messages \
    -H "Content-Type: application/json" \
    -H "X-API-Key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: mcp-client-2025-04-04" \
    -d '{
      "model": "claude-sonnet-4-5",
      "max_tokens": 8000,
      "messages": [
        {
          "role": "user",
          "content": "What is the latest in AI research?"
        }
      ],
      "mcp_servers": [
        {
          "type": "url",
          "url": "https://search-mcp.parallel.ai/mcp",
          "name": "parallel-web-search",
          "authorization_token": "YOUR_PARALLEL_API_KEY"
        }
      ]
    }'
  ```

  ```python Python theme={"system"}
  import anthropic

  client = anthropic.Anthropic(api_key="YOUR_ANTHROPIC_API_KEY")
  parallel_api_key = "PARALLEL_API_KEY"  # Your Parallel API key

  response = client.beta.messages.create(
      model="claude-sonnet-4-5",
      messages=[{
          "role": "user",
          "content": "What is the latest in AI research?"
      }],
      max_tokens=8000,
      mcp_servers=[{
          "type": "url",
          "url": "https://search-mcp.parallel.ai/mcp",
          "name": "parallel-web-search",
          "authorization_token": parallel_api_key
      }],
      betas=["mcp-client-2025-04-04"]
  )

  print(response)
  ```

  ```typescript TypeScript theme={"system"}
  import { Anthropic } from "@anthropic-ai/sdk";

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const parallelApiKey = process.env.PARALLEL_API_KEY;

  const response = await anthropic.beta.messages.create({
    model: "claude-sonnet-4-5",
    messages: [
      {
        role: "user",
        content: "What is the latest in AI research?",
      },
    ],
    max_tokens: 8000,
    mcp_servers: [
      {
        type: "url",
        url: "https://search-mcp.parallel.ai/mcp",
        name: "parallel-web-search",
        authorization_token: parallelApiKey,
      },
    ],
    betas: ["mcp-client-2025-04-04"],
  });

  console.log(response);
  ```
</CodeGroup>

### Task MCP with Anthropic

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.anthropic.com/v1/messages \
    -H "Content-Type: application/json" \
    -H "X-API-Key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: mcp-client-2025-04-04" \
    -d '{
      "model": "claude-sonnet-4-5",
      "max_tokens": 8000,
      "messages": [
        {
          "role": "user",
          "content": "Create a deep research task about the latest developments in AI safety research"
        }
      ],
      "mcp_servers": [
        {
          "type": "url",
          "url": "https://task-mcp.parallel.ai/mcp",
          "name": "parallel-task",
          "authorization_token": "YOUR_PARALLEL_API_KEY"
        }
      ]
    }'
  ```

  ```python Python theme={"system"}
  import anthropic

  client = anthropic.Anthropic(api_key="YOUR_ANTHROPIC_API_KEY")
  parallel_api_key = "PARALLEL_API_KEY"  # Your Parallel API key

  response = client.beta.messages.create(
      model="claude-sonnet-4-5",
      messages=[{
          "role": "user",
          "content": "Create a deep research task about the latest developments in AI safety research"
      }],
      max_tokens=8000,
      mcp_servers=[{
          "type": "url",
          "url": "https://task-mcp.parallel.ai/mcp",
          "name": "parallel-task",
          "authorization_token": parallel_api_key
      }],
      betas=["mcp-client-2025-04-04"]
  )

  print(response)
  ```

  ```typescript TypeScript theme={"system"}
  import { Anthropic } from "@anthropic-ai/sdk";

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const parallelApiKey = process.env.PARALLEL_API_KEY;

  const response = await anthropic.beta.messages.create({
    model: "claude-sonnet-4-5",
    messages: [
      {
        role: "user",
        content:
          "Create a deep research task about the latest developments in AI safety research",
      },
    ],
    max_tokens: 8000,
    mcp_servers: [
      {
        type: "url",
        url: "https://task-mcp.parallel.ai/mcp",
        name: "parallel-task",
        authorization_token: parallelApiKey,
      },
    ],
    betas: ["mcp-client-2025-04-04"],
  });

  console.log(response);
  ```
</CodeGroup>

## Limitations

### Context Window Constraints

The Task MCP is designed for smaller parallel tasks and experimentation, constrained by:

* **Context window size** - Large datasets may overflow the available context
* **Max output tokens** - Results must fit within model output limitations
* **Data source size** - Initial data should be appropriately sized for the model

For large-scale operations, consider using the Parallel APIs directly or other integration methods.

### Asynchronous Nature

Due to current MCP/LLM client limitations:

* Tasks run asynchronously but don't automatically wait for completion
* Users must explicitly request results in follow-up turns
* Multiple workflow steps require manual progression through conversation turns

### Model Requirements

* **Search MCP** - Works well with smaller models (GPT OSS 20B+)
* **Task MCP** - Requires larger models with strong reasoning capabilities (e.g. GPT-5, Claude Sonnet 4.5)
* Smaller models may result in degraded output quality for complex tasks

Reach out to be among the first to overcome current limitations as we continue improving the platform.

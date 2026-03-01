> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel

> Use Parallel with Vercel

Use Parallel Search in the Vercel AI SDK. Get started quickly by installing Parallel in the Vercel Agent Marketplace.

## Vercel AI Gateway

Parallel Search is available as a built-in tool in [Vercel AI Gateway](https://vercel.com/docs/ai-gateway). AI Gateway provides a unified API to access hundreds of models through a single endpoint, with built-in web search capabilities.

The `parallelSearch` tool can be used with any model regardless of the model provider. When the model needs current information, it calls the tool and AI Gateway routes the request to Parallel's Search API.

<CodeGroup>
  ```typescript streamText theme={"system"}
  import { gateway, streamText } from 'ai';

  export async function POST(request: Request) {
    const { prompt } = await request.json();

    const result = streamText({
      model: 'anthropic/claude-sonnet-4.5', // Works with any model
      prompt,
      tools: {
        parallel_search: gateway.tools.parallelSearch(),
      },
    });

    return result.toDataStreamResponse();
  }
  ```

  ```typescript generateText theme={"system"}
  import { gateway, generateText } from 'ai';

  export async function POST(request: Request) {
    const { prompt } = await request.json();

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.5', // Works with any model
      prompt,
      tools: {
        parallel_search: gateway.tools.parallelSearch(),
      },
    });

    return Response.json({ text });
  }
  ```
</CodeGroup>

You can configure additional parameters to tune the search behavior, such as `maxResults`, `country`, `searchDomainFilter`, and more. See the [Parallel parameters documentation](https://vercel.com/docs/ai-gateway/capabilities/web-search#parallel-parameters) for the full list of options.

For more details, see the [Vercel AI Gateway Web Search documentation](https://vercel.com/docs/ai-gateway/capabilities/web-search#using-parallel-search).

## Vercel AI SDK

Easily drop in Parallel Search API or Extract API with any Vercel AI SDK compatible model provider.

* **Search API**: Given a semantic search objective and optional keywords, Parallel returns ranked URLs with compressed excerpts
* **Extract API**: Given a URL and an optional objective, Parallel returns compressed excerpts or full page contents

**Links:**

* [NPM Package](https://www.npmjs.com/package/@parallel-web/ai-sdk-tools)
* [Vercel AI SDK Toolkit](https://ai-sdk.dev/docs/foundations/tools#ready-to-use-tool-packages)
* [Vercel AI SDK Web Search Agent Cookbook](https://ai-sdk.dev/cookbook/node/web-search-agent#parallel-web)

### Sample Code

Parallel search and extract tools can be used with any Vercel AI SDK compatible model provider.

<CodeGroup>
  ```Typescript Search theme={"system"}
  import { openai } from '@ai-sdk/openai';
  import { streamText, type Tool } from 'ai';
  import { searchTool } from '@parallel-web/ai-sdk-tools';

  const result = streamText({
    model: openai('gpt-5'),
    messages: [
      { role: 'user', content: 'What are the latest developments in AI?' }
    ],
    tools: {
      'web-search': searchTool as Tool,
    },
    toolChoice: 'auto',
  });

  // Stream the response
  return result.toUIMessageStreamResponse();
  ```

  ```Typescript Extract theme={"system"}
  import { openai } from '@ai-sdk/openai';
  import { streamText, type Tool } from 'ai';
  import { extractTool } from '@parallel-web/ai-sdk-tools';

  const result = streamText({
    model: openai('gpt-5'),
    messages: [
      { role: 'user', content: 'How should tools be used in the Vercel AI SDK based on https://vercel.com/docs/ai-sdk' }
    ],
    tools: {
      'web-extract': extractTool as Tool,
    },
    toolChoice: 'auto',
  });

  // Stream the response
  return result.toUIMessageStreamResponse();
  ```
</CodeGroup>

## Vercel Marketplace

Parallel is available on the [Vercel Marketplace](https://vercel.com/marketplace/parallel). Install the integration to get a Parallel API key that you can use directly in your Vercel apps, with billing managed through Vercel.

### Getting started

1. Install the [Parallel integration](https://vercel.com/marketplace/parallel) from the Vercel Marketplace
2. Once installed, you'll receive a Parallel API key automatically provisioned for your account
3. Use the API key in your Vercel applications to access Parallel Search and Extract APIs

### Example application

See the [Parallel Vercel Template](https://parallel-vercel-template-cookbook.vercel.app) for a working example, with source code available in the [cookbook repository](https://github.com/parallel-web/parallel-cookbook/tree/main/typescript-recipes/parallel-vercel-template).

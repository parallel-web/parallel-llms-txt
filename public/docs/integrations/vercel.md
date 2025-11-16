# Vercel

> Use Parallel with Vercel

Use Parallel Search in the Vercel AI SDK. Get started quickly by installing Parallel in the Vercel Agent Marketplace.

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
  return result.toDataStreamResponse();
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
  return result.toDataStreamResponse();
  ```
</CodeGroup>

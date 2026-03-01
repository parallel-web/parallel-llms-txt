Human Machine

# \# Parallel Web Tools and Agents now available across Vercel AI Gateway, AI SDK, and Marketplace

Tags: [Product Release](/blog?tag=product-release)

Reading time: 3 min

Parallel Web Tools and Agents are now available across the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway/capabilities/web-search) [[Vercel AI Gateway] (https://vercel.com/docs/ai-gateway/capabilities/web-search)](https://vercel.com/docs/ai-gateway/capabilities/web-search) , [Marketplace](https://vercel.com/marketplace) [[Marketplace] (https://vercel.com/marketplace)](https://vercel.com/marketplace) , and [AI SDK](https://ai-sdk.dev/cookbook/node/web-search-agent) [[AI SDK] (https://ai-sdk.dev/cookbook/node/web-search-agent)](https://ai-sdk.dev/cookbook/node/web-search-agent) , bringing the most accurate web search, deep research, monitoring, and enrichment to projects built on Vercel.

* \- **\*\* AI Gateway: \*\*** Parallel Search
* \- **\*\* AI SDK: \*\*** Parallel Search, Extract
* \- **\*\* Marketplace: \*\*** Parallel Search, Extract, Task, FindAll, Monitor

For more details on Parallel Web Tools and Agents, [visit our docs](https://docs.parallel.ai/home) [[visit our docs] (https://docs.parallel.ai/home)](https://docs.parallel.ai/home) .

![Parallel Search products are now available across Vercel AI Gateway, AI SDK, and Marketplace](https://cdn.sanity.io/images/5hzduz3y/production/79c84945a463cdbacc5d18e07f9ec0a42f60735b-5760x3456.jpg)

## \## Parallel Search in Vercel AI Gateway

[Vercel AI Gateway](https://vercel.com/docs/ai-gateway/capabilities/web-search) [[Vercel AI Gateway] (https://vercel.com/docs/ai-gateway/capabilities/web-search)](https://vercel.com/docs/ai-gateway/capabilities/web-search) is a unified API for managing AI models, tools, and observability across your applications.

With AI Gateway, you can access Parallel's best-in-class web search with just a few new lines of code, preserving the freedom to switch between AI models without reconfiguring web search. All billing is handled through Vercel— no need to worry about Parallel API keys.

_\_ “We’re excited to partner with Parallel to bring their high-accuracy web search to AI Gateway as a provider-agnostic tool. Developers have more options to pair web search with models all via one API key.” — Jerilyn Zheng, Product Manager, AI Gateway \__

\### Configuring a web search with AI Gateway

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

import  { gateway, streamText }  from 'ai' ;
 
 export async function POST ( request :  Request ) {
   const  { prompt } =  await  request. json ();
 
   const  result =  streamText ({
     model :  'anthropic/claude-sonnet-4.5' ,
    prompt,
     tools : {
       parallel_search : gateway. tools . parallelSearch ({
         mode :  'one-shot' ,
         maxResults :  5 ,
         includeDomains : [ 'arxiv.org' ,  'nature.com' ,  'science.org' ],
         afterDate :  '2025-01-01' ,
         maxCharsPerResult :  5000 ,
      }),
    },
  });
 
   return  result. toDataStreamResponse ();
} ```  import { gateway, streamText } from 'ai'; export async function POST(request: Request) { const { prompt } = await request.json(); const result = streamText({ model: 'anthropic/claude-sonnet-4.5', prompt, tools: { parallel_search: gateway.tools.parallelSearch({ mode: 'one-shot', maxResults: 5, includeDomains: ['arxiv.org', 'nature.com', 'science.org'], afterDate: '2025-01-01', maxCharsPerResult: 5000, }), }, }); return result.toDataStreamResponse(); } ```
```

## \## Parallel Web Tools in Vercel AI SDK

[Vercel AI SDK](https://ai-sdk.dev/cookbook/node/web-search-agent) [[Vercel AI SDK] (https://ai-sdk.dev/cookbook/node/web-search-agent)](https://ai-sdk.dev/cookbook/node/web-search-agent) is a free and open-source TypeScript toolkit that simplifies building AI-powered applications by providing abstractions for streaming responses, managing chat interfaces, and integrating with various LLM providers and tools.

The AI SDK supports the [Parallel Web Tools package](https://www.npmjs.com/package/@parallel-web/ai-sdk-tools) [[Parallel Web Tools package] (https://www.npmjs.com/package/@parallel-web/ai-sdk-tools)](https://www.npmjs.com/package/@parallel-web/ai-sdk-tools) :

\### Install the Parallel Web Tools package via npm

```
1

npm install @parallel-web/ai-sdk-tools ```  npm install @parallel-web/ai-sdk-tools ```
```

Use Parallel Search to find relevant links and text excerpts, and Parallel Extract to retrieve excerpts or full-page contents when given a URL.

\### Using the Parallel Search & Extract tools with AI SDK

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

import  { generateText, stepCountIs }  from 'ai' ;
 import  { openai }  from "@ai-sdk/openai" ;
 import  { searchTool, extractTool }  from '@parallel-web/ai-sdk-tools' ;

 const  { text } =  await generateText ({
   model :  openai ( "gpt-5-pro" ),
   prompt :  'what motherboard spec is neeeded for a 3080 graphics card' ,
   tools : {
     webSearch : searchTool,
     webExtract : extractTool,
  },
   stopWhen :  stepCountIs ( 3 ),
});

 console . log (text); ```  import { generateText, stepCountIs } from 'ai'; import { openai } from "@ai-sdk/openai"; import { searchTool, extractTool } from '@parallel-web/ai-sdk-tools';   const { text } = await generateText({ model: openai("gpt-5-pro"), prompt: 'what motherboard spec is neeeded for a 3080 graphics card', tools: { webSearch: searchTool, webExtract: extractTool, }, stopWhen: stepCountIs(3), });   console.log(text); ```
```

## \## Parallel Web Tools & Agents in Vercel Marketplace

Vercel Marketplace is a platform where Vercel users can discover and integrate third-party tools, services, and infrastructure to simplify the process of adding tools and features to their Vercel deployments.

The Parallel integration via Vercel marketplace gives your app access to an API key you can use for all Parallel products, including Search, Extract, Tasks, FindAll, and Monitoring. Billing is completely managed by Vercel.

[Get started with Parallel in Vercel Marketplace](https://vercel.com/marketplace/parallel) [[Get started with Parallel in Vercel Marketplace] (https://vercel.com/marketplace/parallel)](https://vercel.com/marketplace/parallel) .

## \## Why Parallel

Despite their impressive power, AI models and agents are limited without access to the open web. But not all web search is created equal. What matters for AI applications is end-to-end efficiency: how accurately can your agent answer questions, and at what total cost?

Parallel’s products are built atop our web index and Search API, both of which were designed for use by LLMs. On [benchmarks](https://parallel.ai/benchmarks) [[benchmarks] (/benchmarks)](/ai/benchmarks) ranging from simple factual queries to complex multi-hop reasoning tasks, Parallel achieves the highest accuracy at the lowest end-to-end cost.

While traditional search APIs return links and snippets ranked for human clicks, Parallel returns excerpts ranked for LLM consumption. Your agent thus resolves queries in fewer round-trips, which compounds into meaningful cost and latency savings.

## \## Get started with Vercel & Parallel

* \- [Get started with Vercel](http://vercel.com) [[Get started with Vercel] (http://vercel.com)](http://vercel.com)
* \- [Parallel Docs](https://docs.parallel.ai/home) [[Parallel Docs] (https://docs.parallel.ai/home)](https://docs.parallel.ai/home)
* \- [Parallel Developer Platform](https://platform.parallel.ai/home) [[Parallel Developer Platform] (https://platform.parallel.ai/home)](https://platform.parallel.ai/home)

## \## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI businesses like Manus, Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

By Parallel

February 4, 2026

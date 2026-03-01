Introducing a new set of tools for llms.txt that help you create and check llms.txt, or transform llms.txt files into MCP servers
Parallel Web Systems | Build the world wide web for AIs

[Parallel](/)[About](/about)[About](https://parallel.ai/about)[Pricing](/pricing)[Pricing](https://parallel.ai/pricing)[Careers](https://jobs.ashbyhq.com/parallel)[Careers](https://jobs.ashbyhq.com/parallel)[Blog](/blog)[Blog](https://parallel.ai/blog)[Docs](https://docs.parallel.ai/home)[Docs](https://docs.parallel.ai/home)

Start Building

P

[Start Building]

Menu[Menu]

HumanMachine

# Introducing LLMTEXT, an open source toolkit for the llms.txt standard
=======================================================================

TL;DR: We're launching LLMTEXT, an open source toolkit that helps developers create, validate, and use llms.txt files—making any website instantly accessible to AI agents through standardized markdown documentation and MCP servers.

Tags:[Product Release](/blog?tag=product-release)

Reading time: 7 min

[Visit LLMTEXT](https://llmtext.com/)[View Code](https://github.com/janwilmake/llmtext-mcp)

![Introducing LLMTEXT, an open source toolkit for the llms.txt standard](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F1ec01d0b6ac3df2318a073c11ec8e73bced61048-2142x1260.jpg&w=3840&q=75)

## The web wasn't built for AI agents.
--------------------------------------

Wikipedia [recently reported](https://flowingdata.com/2025/10/27/wikipedia-losing-human-views-to-ai-summaries/#:~:text=Topic,and%20a%20lot%20of%20bots)[recently reported]($https://flowingdata.com/2025/10/27/wikipedia-losing-human-views-to-ai-summaries/#:~:text=Topic,and%20a%20lot%20of%20bots) an 8% decline in human visitors, and [AI has overtaken humans](https://cpl.thalesgroup.com/blog/access-management/ai-bots-internet-traffic-imperva-2025-report)[AI has overtaken humans]($https://cpl.thalesgroup.com/blog/access-management/ai-bots-internet-traffic-imperva-2025-report) as the primary user of the web this year. As LLMs increasingly become the primary way people interact with online information, websites face a critical challenge: how do you serve both human visitors and AI agents effectively?

Today, we’re proud to support the launch of [LLMTEXT](http://llmtext.com)[LLMTEXT]($http://llmtext.com), an open source toolkit by [Jan Wilmake](https://x.com/janwilmake)[Jan Wilmake]($https://x.com/janwilmake) to help grow the llms.txt standard. With these tools, developers can more easily create llms.txt files for their websites, check their website’s existing llms.txt for validity, or turn any existing llms.txt into a dedicated MCP (Model Context Protocol) server.

## What is LLMTEXT, and why did we make it?
-------------------------------------------

[Jeremy Howard](https://x.com/jeremyphoward)[Jeremy Howard]($https://x.com/jeremyphoward) introduced the [llms.txt standard](https://llmstxt.org)[llms.txt standard]($https://llmstxt.org) to make websites more friendly for large-language models (LLMs) by giving them access to Markdown files that contain the site’s most important text, explicitly excluding distracting elements that otherwise fill up their context windows. The spec has already been adopted by companies like Anthropic, Cloudflare, Docker, HubSpot, and many others.

At Parallel, we believe that AIs will soon be the primary users of the web, which is why we support initiatives like llms.txt that introduce new standards and frameworks to embrace that future.

## What tools are available on LLMTEXT?
---------------------------------------

The three LLMTEXT tools we're releasing today serve two purposes. First, the **\*\*llms.txt MCP \*\***helps developers use projects without hallucination by getting a dedicated MCP for every library or API they use that supports llms.txt. On the other hand, the **\*\*Check tool\*\*** and **\*\*Create tool\*\*** aid websites to serve their users the best possible experience. Let's dive into each tool.

## llms.txt MCP tool
--------------------

The **\*\*llms.txt MCP \*\***turns any public llms.txt into a dedicated MCP server. You can think of this like Context7, but instead of one MCP server for all docs, it’s a narrowly-focused MCP server for a website, making it easier to get the right context for products you use often. It also works fundamentally differently: Where Context7 uses Vector search to determine what’s relevant, the **\*\*llms.txt MCP \*\***leverages the reasoning of the LLM based on the llms.txt overview to decide which documents to ingest into the context window.

#### An LLMTEXT MCP being used in Cursor

[![Build a terminal-style chat app using Parallel's llms.txt](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9963e0b2f7bfa3c72c4e5a9a2a2593029cc41e52-1276x1428.png&w=3840&q=75)](https://cdn.sanity.io/images/5hzduz3y/production/9963e0b2f7bfa3c72c4e5a9a2a2593029cc41e52-1276x1428.png?w=2000&fit=max&auto=format&dpr=2)

![Build a terminal-style chat app using Parallel's llms.txt](https://cdn.sanity.io/images/5hzduz3y/production/9963e0b2f7bfa3c72c4e5a9a2a2593029cc41e52-1276x1428.png)

Many developers have already been using llms.txt or the linked markdown files by manually copying them into their context window, but the llms.txt MCP smoothens this process by having one-click installation and providing the LLM with clear instructions on how to ingest the right context when needed. The MCP exposes two tools:

1. **\*\*get - \*\***explains what this llms.txt is about, will first retrieve the llms.txt itself, then be used again to retrieve multiple relevant contexts for any task
2. **\*\*leaderboard - \*\***shows the most active users of the MCP and other insights

The **\*\*llms.txt MCP \*\***can be installed for any llms.txt that follows [the standard](https://llmstxt.org)[the standard]($https://llmstxt.org).

## Check tool
-------------

When building the llms.txt MCP and trying it out on [some of the available MCPs](https://github.com/thedaviddias/llms-txt-hub)[some of the available MCPs]($https://github.com/thedaviddias/llms-txt-hub), many of them turned out to be incorrect according to the [llms.txt prescribed format](https://llmstxt.org/)[llms.txt prescribed format]($https://llmstxt.org/) for various reasons.

#### An example of validation for Docker's llms.txt

[![Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F862b6db697a44d5b5007850367bf503d74393f79-2098x1658.png&w=3840&q=75)](https://cdn.sanity.io/images/5hzduz3y/production/7249cdedd6fefaa518cac3c0e376ec1ffe08c855-1948x1288.png?w=2000&fit=max&auto=format&dpr=2)

![](https://cdn.sanity.io/images/5hzduz3y/production/862b6db697a44d5b5007850367bf503d74393f79-2098x1658.png)

The goal of your llms.txt should be to give LLMs the best possible overview: a table of contents to determine where to look for the right information. Or, as our Co-founder and Head of Product, [Travers](https://x.com/travers00/status/1975947045497344162)[Travers]($https://x.com/travers00/status/1975947045497344162), puts it, the goal is to retrieve the tokens that agents need to answer or make the next best decision in a loop. This means that you should have clear, distinct titles and descriptions of pages, and the individual results of pages shouldn't be too long.

To incentivize companies to fix their llms.txt and to provide only the best quality to our users, [LLMTEXT](http://llmtext.com)[LLMTEXT]($http://llmtext.com) only allows installing MCP servers that adhere to the spec fully. Here are the most common mistakes we found in llms.txt files, with examples from popular websites:

### ### Document Size

To get the most out of llms.txt, documents should be token-efficient. For example, <https://developers.cloudflare.com/llms.txt>[https://developers.cloudflare.com/llms.txt]($https://developers.cloudflare.com/llms.txt) is 36,000 tokens for just the table of contents, creating a very large minimum amount of tokens.

Another example is <https://docs.cursor.com/llms.txt>[https://docs.cursor.com/llms.txt]($https://docs.cursor.com/llms.txt), which serves links to several languages. This isn't succinct and creates unnecessary overhead to an LLM that knows most languages.

To make token usage efficient when wading through context, it's best if the llms.txt itself is not bigger than the pages being linked to. If it is, it becomes a significant addition to the context window every time you want to retrieve a piece of information.

Another example is <https://supabase.com/llms.txt>[https://supabase.com/llms.txt]($https://supabase.com/llms.txt), where the first document linked contains approximately 800,000 tokens, which is far too large for most LLMs to process. As a first rule, we recommend keeping both llms.txt and all linked documents under 10,000 tokens.

### ### Incorrect content-type

The llms.txt itself, as well as the links it refers to, must lead to a text/markdown or text/plain response. This is the most common mistake in llms.txt files today.

For example, <https://www.bitcoin.com/llms.txt>[https://www.bitcoin.com/llms.txt]($https://www.bitcoin.com/llms.txt) and <https://docs.docker.com/llms.txt>[https://docs.docker.com/llms.txt]($https://docs.docker.com/llms.txt) both return HTML for every document linked to, and while listed in some registries, <https://elevenlabs.io/llms.txt>[https://elevenlabs.io/llms.txt]($https://elevenlabs.io/llms.txt) responds with an HTML document.

In many cases, the content-type is text/plain or text/markdown, yet it can't be parsed according to [the spec](https://llmstxt.org/)[the spec]($https://llmstxt.org/). For example, <https://cursor.com/llms.txt>[https://cursor.com/llms.txt]($https://cursor.com/llms.txt) just lists raw URLs without markdown link format, <https://console.groq.com/llms.txt>[https://console.groq.com/llms.txt]($https://console.groq.com/llms.txt) does not present its links in an h2 markdown section (##), and <https://lmstudio.ai/llms.txt>[https://lmstudio.ai/llms.txt]($https://lmstudio.ai/llms.txt) returns all documents directly, concatenated.

### ### Not served at the root

Many companies ended up not serving their llms.txt at the root. For example, <https://www.mintlify.com/docs/llms.txt>[https://www.mintlify.com/docs/llms.txt]($https://www.mintlify.com/docs/llms.txt) and <https://nextjs.org/docs/llms.txt>[https://nextjs.org/docs/llms.txt]($https://nextjs.org/docs/llms.txt) are not hosted at the root, making it hard to find programmatically.

## Create tool
--------------

Most websites aren't adapted to the AI internet yet, and instead serve as HTML content intended for humans. Most CMS systems don't support the creation of a Markdown versions either. There are several llms.txt generators (hosted as well as libraries) found on the internet, but many are specific to a certain framework. And many tools to create llms.txt don’t actually follow the llms.txt spec.

For example, some tools just create the llms.txt file itself, but don't refer to plain text or markdown variants of the pages.

#### Parallel's llms.txt, created with the create tool from LLMTEXT

[![Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F22495cdfdcdd5ed45f81cd2c7e48f32236888d62-3850x2218.png&w=3840&q=75)](https://cdn.sanity.io/images/5hzduz3y/production/22495cdfdcdd5ed45f81cd2c7e48f32236888d62-3850x2218.png?w=2000&fit=max&auto=format&dpr=2)

![](https://cdn.sanity.io/images/5hzduz3y/production/22495cdfdcdd5ed45f81cd2c7e48f32236888d62-3850x2218.png)

The [extract-from-sitemap](https://github.com/janwilmake/llmtext-mcp/tree)[extract-from-sitemap]($https://github.com/janwilmake/llmtext-mcp/tree) tool is a framework-agnostic way to generate an llms.txt from multiple sources. It scrapes all needed pages and turns them into markdown, powered by the new [Parallel Extract API](https://docs.parallel.ai/api-reference/search-and-extract-api-beta/extract)[Parallel Extract API]($https://docs.parallel.ai/api-reference/search-and-extract-api-beta/extract) (beta). We used this library to create [our own llms.txt](https://parallel.ai/llms.txt)[our own llms.txt]($https://parallel.ai/llms.txt), which is also available through [this repo](https://github.com/parallel-web/parallel-llmtext)[this repo]($https://github.com/parallel-web/parallel-llmtext) as reference, and [installable as MCP](https://installthismcp.com/parallel-llmtext-mcp?url=https://mcp.llmtext.com/parallel.ai/mcp)[installable as MCP]($https://installthismcp.com/parallel-llmtext-mcp?url=https://mcp.llmtext.com/parallel.ai/mcp) for those building with Parallel's APIs.

## Plans for LLMTEXT
--------------------

This is just the beginning. We hope that the llms.txt standard thrives and evolves into a more valuable standard with many use-cases. We've already started improving the tooling and adding utilities, and hope to see the open source community contribute as well.

## About Jan Wilmake
--------------------

Jan has been an active OSS developer building dev tools in the AI context management space. His work includes [uithub.com](http://uithub.com)[uithub.com]($http://uithub.com), a context ingestion tool for GitHub, and the [openapi-mcp-server](https://github.com/janwilmake/openapi-mcp-server)[openapi-mcp-server]($https://github.com/janwilmake/openapi-mcp-server), which allows ingesting the full API specification of the operations you’re interested in, following a very similar pattern to how the llms.txt MCP works.

## About Parallel Web Systems
-----------------------------

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took weeks into agentic tasks that now take just minutes.

Fortune 100 companies use Parallel’s search and agent APIs in insurance, finance, and retail, as well as AI-first businesses like Clay, Starbridge, and Sourcegraph.

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

By Parallel

October 30, 2025

### ## Related Posts30

[![Starbridge + Parallel](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fab0e4460ae9420af31c5425a4a33091973aa5c1e-2400x1350.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [How Starbridge powers public sector GTM with state-of-the-art web research](https://parallel.ai/blog/case-study-starbridge)

Tags:[Case Study](/blog?tag=case-study)

Reading time: 4 min](/blog/case-study-starbridge)

[![Building a market research platform with Parallel Deep Research](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F7bb9b4a6de8eefb829ecb4a31975b62bd423b217-1409x908.jpg&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Building a market research platform with Parallel Deep Research](https://parallel.ai/blog/cookbook-market-research-platform-with-parallel)

Tags:[Cookbook](/blog?tag=cookbook)

Reading time: 4 min](/blog/cookbook-market-research-platform-with-parallel)

[![How Lindy brings state-of-the-art web research to automation flows](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F8862203d013fa5e48e4e53154f4d4f1a26df8c77-1200x675.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [How Lindy brings state-of-the-art web research to automation flows](https://parallel.ai/blog/case-study-lindy)

Tags:[Case Study](/blog?tag=case-study)

Reading time: 3 min](/blog/case-study-lindy)

[![Introducing the Parallel Task MCP Server](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Ffea8be5b5586b18fa7cbab2d3129f66dd3d41ba2-1200x675.jpg&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Parallel Task MCP Server](https://parallel.ai/blog/parallel-task-mcp-server)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 4 min](/blog/parallel-task-mcp-server)

[![Introducing the Core2x Processor for improved compute control on the Task API](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fbf1a848f15ec882fd849b26529605170de7c631f-1130x675.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Core2x Processor for improved compute control on the Task API](https://parallel.ai/blog/core2x-processor)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/core2x-processor)

[![How Day AI merges private and public data for business intelligence](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F5b93638fe38fdec380eee982f3c8e621e3df7f40-1200x675.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [How Day AI merges private and public data for business intelligence](https://parallel.ai/blog/case-study-day-ai)

Tags:[Case Study](/blog?tag=case-study)

Reading time: 4 min](/blog/case-study-day-ai)

[![Full Basis framework for all Task API Processors](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F6052afb7860f8109024c16cc7804023d3cda853b-1273x853.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Full Basis framework for all Task API Processors](https://parallel.ai/blog/full-basis-framework-for-task-api)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/full-basis-framework-for-task-api)

[![Building a real-time streaming task manager with Parallel](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Ff1ddb30b2f45506fc931810ff8a6e3b1b7616577-1440x920.jpg&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Building a real-time streaming task manager with Parallel](https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel)

Tags:[Cookbook](/blog?tag=cookbook)

Reading time: 5 min](/blog/cookbook-sse-task-manager-with-parallel)

[![How Gumloop built a new AI automation framework with web intelligence as a core node](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fee4b4a1ae1ee3abc405a5f3fce93436ce7c044d8-4800x2700.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [How Gumloop built a new AI automation framework with web intelligence as a core node](https://parallel.ai/blog/case-study-gumloop)

Tags:[Case Study](/blog?tag=case-study)

Reading time: 3 min](/blog/case-study-gumloop)

[![Introducing the TypeScript SDK](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F8ab362aa9a611786155d6fb73ece060357268c04-1600x896.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the TypeScript SDK](https://parallel.ai/blog/typescript-sdk)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 1 min](/blog/typescript-sdk)

[![Building a serverless competitive intelligence platform with MCP + Task API](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fa42ce908d0781acd042c47e6f77ef41f6a037aa7-1600x898.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Building a serverless competitive intelligence platform with MCP + Task API](https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp)

Tags:[Cookbook](/blog?tag=cookbook)

Reading time: 6 min](/blog/cookbook-competitor-research-with-reddit-mcp)

[![Introducing Parallel Deep Research reports](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fcfb8e43eff9c1062a2948bd09aedd344f82f9f25-1600x1010.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Parallel Deep Research reports](https://parallel.ai/blog/deep-research-reports)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/deep-research-reports)

[![A new pareto-frontier for Deep Research price-performance](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fba2d50586ee2d2fe4ff8e78ff905d602746be2e0-1600x896.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [A new pareto-frontier for Deep Research price-performance](https://parallel.ai/blog/deep-research-benchmarks)

Tags:[Benchmarks](/blog?tag=benchmarks)

Reading time: 4 min](/blog/deep-research-benchmarks)

[![Building a Full-Stack Search Agent with Parallel and Cerebras](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fba7f2d6949f62430e5365bca9bbe3474ef7ca2f3-1910x1074.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Building a Full-Stack Search Agent with Parallel and Cerebras](https://parallel.ai/blog/cookbook-search-agent)

Tags:[Cookbook](/blog?tag=cookbook)

Reading time: 5 min](/blog/cookbook-search-agent)

[![Webhooks for the Parallel Task API](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fbe30ce478eb784f29ca08ca1cc939dbd34bfc951-1600x1064.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Webhooks for the Parallel Task API](https://parallel.ai/blog/webhooks)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/webhooks)

[![Introducing Parallel: Web Search Infrastructure for AIs ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9001297713b1f9e3d39b9130235f30a6100c9776-5480x3128.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Parallel: Web Search Infrastructure for AIs ](https://parallel.ai/blog/introducing-parallel)

Tags:[Benchmarks](/blog?tag=benchmarks),[Product Release](/blog?tag=product-release)

Reading time: 6 min](/blog/introducing-parallel)

[![Introducing SSE for Task Runs](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fe47a46828ea04ffd621a767a2497488e8def9a34-1600x900.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing SSE for Task Runs](https://parallel.ai/blog/sse-for-tasks)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/sse-for-tasks)

[![A new line of advanced processors: Ultra2x, Ultra4x, and Ultra8x ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F42c2dfc4c4e230022ff73dd3c60793bc66e248e3-1600x1198.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [A new line of advanced processors: Ultra2x, Ultra4x, and Ultra8x ](https://parallel.ai/blog/new-advanced-processors)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/new-advanced-processors)

[![Introducing Auto Mode for the Parallel Task API](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F6ec2374cc27dfa09b078633bb9677271873cf1ed-1600x1600.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Auto Mode for the Parallel Task API](https://parallel.ai/blog/task-api-auto-mode)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 1 min](/blog/task-api-auto-mode)

[![A linear dithering of a search interface for agents](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fcf3d3b4112c8ab27af1a56442e549a6c9fb2b220-1600x1064.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [A state-of-the-art search API purpose-built for agents](https://parallel.ai/blog/search-api-benchmark)

Tags:[Benchmarks](/blog?tag=benchmarks)

Reading time: 3 min](/blog/search-api-benchmark)

[![Parallel Search MCP Server in Devin](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fdfc00df5061085ec771f28d263b231d4c53747c3-1600x1044.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Parallel Search MCP Server in Devin](https://parallel.ai/blog/parallel-search-mcp-in-devin)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/parallel-search-mcp-in-devin)

[![Introducing Tool Calling via MCP Servers](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fe220ba8a89dfaeb943f943fc92636629a0b9ba14-1600x1600.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Tool Calling via MCP Servers](https://parallel.ai/blog/mcp-tool-calling)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/mcp-tool-calling)

[![Introducing the Parallel Search MCP Server ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F32cf3f1026d452dbaed58e8df4d7b487166d423a-1972x1972.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Parallel Search MCP Server ](https://parallel.ai/blog/search-mcp-server)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/search-mcp-server)

[![Starting today, Source Policy is available for both the Parallel Task API and Search API - giving you granular control over which sources your AI agents access and how results are prioritized.](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9eec7c7314218135df8fd7a83b1c6d3b953eece9-1528x1016.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Source Policy](https://parallel.ai/blog/source-policy)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 1 min](/blog/source-policy)

[![The Parallel Task Group API](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F5b63138a650248d4454f306ba72d99dc1572e08a-1600x946.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [The Parallel Task Group API](https://parallel.ai/blog/task-group-api)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 1 min](/blog/task-group-api)

[![State of the Art Deep Research APIs](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F897a6d4a4d5caf5657b59cdc1dc99de0641c66df-1600x900.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [State of the Art Deep Research APIs](https://parallel.ai/blog/deep-research)

Tags:[Benchmarks](/blog?tag=benchmarks)

Reading time: 3 min](/blog/deep-research)

[![Introducing the Parallel Search API ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Ff61c8461515390c7e546ee3ac1b470a4f79084cc-2560x1704.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Parallel Search API ](https://parallel.ai/blog/parallel-search-api)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min](/blog/parallel-search-api)

[![Introducing the Parallel Chat API - a low latency web research API for web based LLM completions. The Parallel Chat API returns completions in text and structured JSON format, and is OpenAI Chat Completions compatible. ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F780ef9d2c09f2e3526a0d11a4bda9eb0a45ef391-2560x1704.jpg&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Parallel Chat API ](https://parallel.ai/blog/chat-api)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 1 min](/blog/chat-api)

[![Parallel Web Systems introduces Basis with calibrated confidences - a new verification framework for AI web research and search API outputs that sets a new industry standard for transparent and reliable deep research. ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F20273a28dbb0a5ee55784f4c9f7050427094f4eb-2672x1512.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing Basis with Calibrated Confidences ](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences)

Tags:[Product Release](/blog?tag=product-release)

Reading time: 4 min](/blog/introducing-basis-with-calibrated-confidences)

[![The Parallel Task API is a state-of-the-art system for automated web research that delivers the highest accuracy at every price point. ](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F96491c652ee4988fd9866d1b7619407582879e64-2576x1448.png&w=3840&q=75)

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

### - [Introducing the Parallel Task API](https://parallel.ai/blog/parallel-task-api)

Tags:[Product Release](/blog?tag=product-release),[Benchmarks](/blog?tag=benchmarks)

Reading time: 4 min](/blog/parallel-task-api)

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai)[hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about)[About](https://parallel.ai/about)
* [Pricing](/pricing)[Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai)[Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/)[Status](https://status.parallel.ai/)
* [Blog](/blog)[Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog)[Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel)[Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service)[Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy)[Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/)[Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/)[LinkedIn](https://www.linkedin.com/company/parallel-web/about/)[Twitter](https://x.com/p0)[Twitter](https://x.com/p0)

Parallel Web Systems Inc. 2025
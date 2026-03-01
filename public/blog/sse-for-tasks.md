Parallel builds web data and APIs for AI agents—turning web search and knowledge tasks into programmable, enterprise-ready infrastructure.
Parallel Web Systems | Build the world wide web for AIs

[Parallel](/)[About](/about)[About](https://parallel.ai/about)[Pricing](/pricing)[Pricing](https://parallel.ai/pricing)[Careers](https://jobs.ashbyhq.com/parallel)[Careers](https://jobs.ashbyhq.com/parallel)[Blog](/blog)[Blog](https://parallel.ai/blog)[Docs](https://docs.parallel.ai/home)[Docs](https://docs.parallel.ai/home)

Start Building

P

[Start Building]

Menu[Menu]

HumanMachine

# Introducing SSE for Task Runs
===============================

Stream live updates from the Parallel Task API

Tags:[Product Release](/blog?tag=product-release)

Reading time: 2 min

![Introducing SSE for Task Runs](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2Fe47a46828ea04ffd621a767a2497488e8def9a34-1600x900.png&w=3840&q=75)

Starting today, Server-Sent Events (SSE) for Task Runs is available in beta - bringing real-time visibility to long-running web research tasks through the [Parallel Task API](https://parallel.ai/blog/parallel-task-api)[Parallel Task API]($https://parallel.ai/blog/parallel-task-api).

SSE delivers live progress updates, model reasoning, and status changes as tasks execute. This eliminates polling overhead and enables responsive user interfaces for production applications. Whether you're building AI assistants, research dashboards, or interactive workflows, SSE provides the granular updates your users expect from modern AI applications.

## **\*\*Event streams for individual Tasks\*\***
-------------------------------------------------

We previously released SSE support for [Task Groups](https://parallel.ai/blog/task-group-api)[Task Groups]($https://parallel.ai/blog/task-group-api), enabling stream-level visibility into aggregate workflows. With today's update, SSE extends to the task run level, providing detailed updates for individual research tasks. This granular approach enables tighter feedback loops and more precise instrumentation for user-facing applications.

The result: users see exactly what's happening during complex web research operations instead of waiting for final outputs with no visibility.

## **\*\*Connecting to the Event Stream\*\***
---------------------------------------------

To receive live updates from a task run, establish an SSE connection using the run ID:

[### Establish an SSE connection

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

curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: YOUR_API_KEY" \
  -H 'content-type: application/json' \
  -H "parallel-beta: events-sse-2025-07-24" \
  --data '{
  "input": "What were the hiring plans of Google in 2024",
  "processor": "lite",
  "enable_events": true
}'``` 

curl -X POST "https://api.parallel.ai/v1/tasks/runs" \



-H "x-api-key: YOUR_API_KEY" \



-H 'content-type: application/json' \



-H "parallel-beta: events-sse-2025-07-24" \



--data '{



"input": "What were the hiring plans of Google in 2024",



"processor": "lite",



"enable_events": true



}'

```
```]( )

Once connected, you'll receive a continuous stream of JSON-formatted updates over an open HTTP connection. Each event provides structured data about task execution state, enabling precise UI updates on research progress.

## **\*\*What You'll Receive\*\***
----------------------------------

SSE streams deliver four categories of real-time updates:

1. **\*\*Progress Statistics\*\***: Live counts of sources scanned, selected, and processed during web research execution.
2. **\*\*Message Updates\*\***: Model reasoning and thought processes as the task progresses through complex multi-hop research.
3. **\*\*Status Changes\*\***: Clear signals when tasks start, complete, or encounter errors.
4. **\*\*Error Details\*\***: Specific error information when issues arise, enabling immediate debugging.

[### Sample Event Stream

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

event: task_run.state
data: {"type":"task_run.state","event_id":null,"input":null,"run":{"run_id":"trun_aa9c7a780c9d4d4b9aa0ca064f61a6f7","status":"running","is_active":true,"warnings":null,"error":null,"processor":"pro","metadata":{},"taskgroup_id":null,"created_at":"2025-08-06T00:52:58.619503Z","modified_at":"2025-08-06T00:52:59.495063Z"},"output":null}

event: task_run.progress_msg.exec_status
data: {"type":"task_run.progress_msg.exec_status","message":"Starting research","timestamp":"2025-08-06T00:52:59.786126Z"}

event: task_run.progress_msg.plan
data: {"type":"task_run.progress_msg.plan","message":"I'm working on gathering information about Google's hiring in 2024, including where most jobs were created and any official announcements. I'll review recent news, reports, and Google's own statements to provide a comprehensive answer.","timestamp":"2025-08-06T00:53:19.281306Z"}

event: task_run.progress_msg.tool
data: {"type":"task_run.progress_msg.tool","message":"I've looked into Google's hiring activity in 2024, focusing on locations and official statements. I'll compile the findings and share a clear update with you shortly.","timestamp":"2025-08-06T00:53:28.282905Z"}


event: task_run.progress_stats
data: {"type":"task_run.progress_stats","source_stats":{"num_sources_considered":223,"num_sources_read":22,"sources_read_sample":["http://stcloudlive.com/business/19-layoffs-coming-in-mid-march-at-st-cloud-arctic-cat-facility-company-says","http://snowgoer.com/snowmobiles/arctic-cat-sleds/putting-the-arctic-cat-layoffs-production-stop-in-context/32826","http://25newsnow.com/2024/07/26/cat-deere-cyclical-layoff-mode-say-industry-experts","http://citizen.org/article/big-tech-lobbying-update","http://businessalabama.com/women-in-tech-23-for-23","http://itif.org/publications/2019/10/28/policymakers-guide-techlash","http://distributech.com/","http://newyorker.com/magazine/2019/09/30/four-years-in-startups"]}}``` 

event: task_run.state



data: {"type":"task_run.state","event_id":null,"input":null,"run":{"run_id":"trun_aa9c7a780c9d4d4b9aa0ca064f61a6f7","status":"running","is_active":true,"warnings":null,"error":null,"processor":"pro","metadata":{},"taskgroup_id":null,"created_at":"2025-08-06T00:52:58.619503Z","modified_at":"2025-08-06T00:52:59.495063Z"},"output":null}



event: task_run.progress_msg.exec_status



data: {"type":"task_run.progress_msg.exec_status","message":"Starting research","timestamp":"2025-08-06T00:52:59.786126Z"}



event: task_run.progress_msg.plan



data: {"type":"task_run.progress_msg.plan","message":"I'm working on gathering information about Google's hiring in 2024, including where most jobs were created and any official announcements. I'll review recent news, reports, and Google's own statements to provide a comprehensive answer.","timestamp":"2025-08-06T00:53:19.281306Z"}



event: task_run.progress_msg.tool



data: {"type":"task_run.progress_msg.tool","message":"I've looked into Google's hiring activity in 2024, focusing on locations and official statements. I'll compile the findings and share a clear update with you shortly.","timestamp":"2025-08-06T00:53:28.282905Z"}



event: task_run.progress_stats



data: {"type":"task_run.progress_stats","source_stats":{"num_sources_considered":223,"num_sources_read":22,"sources_read_sample":["http://stcloudlive.com/business/19-layoffs-coming-in-mid-march-at-st-cloud-arctic-cat-facility-company-says","http://snowgoer.com/snowmobiles/arctic-cat-sleds/putting-the-arctic-cat-layoffs-production-stop-in-context/32826","http://25newsnow.com/2024/07/26/cat-deere-cyclical-layoff-mode-say-industry-experts","http://citizen.org/article/big-tech-lobbying-update","http://businessalabama.com/women-in-tech-23-for-23","http://itif.org/publications/2019/10/28/policymakers-guide-techlash","http://distributech.com/","http://newyorker.com/magazine/2019/09/30/four-years-in-startups"]}}

```
```]( )

Streams automatically open when tasks begin and close upon completion, with connections maintained for up to 570 seconds to accommodate extensive research operations.

## **\*\*Built for Production Applications\*\***
------------------------------------------------

SSE for Task Runs addresses a critical need in production AI applications: users expect transparency during long-running operations. Rather than displaying static loading states for research tasks, applications can now provide live updates about search progress, source evaluation, and reasoning steps.

The result is user interfaces that feel responsive and trustworthy, even during complex web research operations that require longer processing time.

## **\*\*Start Building\*\***
-----------------------------

SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/features/task-sse)[documentation]($https://docs.parallel.ai/task-api/features/task-sse) to integrate real-time streaming into your application.

![Parallel avatar](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5hzduz3y%2Fproduction%2F9a2c0f2e9634a95512da83f8354aef9d5bf400aa-128x128.png&w=64&q=75)

By Parallel

August 7, 2025

### ## Related Posts27

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
# Introducing SSE for Task Runs

Stream live updates from the Parallel Task API

Starting today, Server-Sent Events (SSE) for Task Runs is available in beta - bringing real-time visibility to long-running web research tasks through the [Parallel Task API](https://parallel.ai/products/task).

SSE delivers live progress updates, model reasoning, and status changes as tasks execute. This eliminates polling overhead and enables responsive user interfaces for production applications. Whether you're building AI assistants, research dashboards, or interactive workflows, SSE provides the granular updates your users expect from modern AI applications.

## **Event streams for individual Tasks**

We previously released SSE support for [Task Groups](https://docs.parallel.ai/task-api/group-api#task-groups), enabling stream-level visibility into aggregate workflows. With today's update, SSE extends to the task run level, providing detailed updates for individual research tasks. This granular approach enables tighter feedback loops and more precise instrumentation for user-facing applications.

The result: users see exactly what's happening during complex web research operations instead of waiting for final outputs with no visibility.

## **Connecting to the Event Stream**

To receive live updates from a task run, establish an SSE connection using the run ID:

```sh
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: YOUR_API_KEY" \
  -H 'content-type: application/json' \
  --data '{
  "input": "What were the hiring plans of Google in 2024",
  "processor": "lite",
  "enable_events": true
}'
```

Once connected, you'll receive a continuous stream of JSON-formatted updates over an open HTTP connection. Each event provides structured data about task execution state, enabling precise UI updates on research progress.

## **What You'll Receive**

SSE streams deliver four categories of real-time updates:

1. **Progress Statistics**: Live counts of sources scanned, selected, and processed during web research execution.
2. **Message Updates**: Model reasoning and thought processes as the task progresses through complex multi-hop research.
3. **Status Changes**: Clear signals when tasks start, complete, or encounter errors.
4. **Error Details**: Specific error information when issues arise, enabling immediate debugging.

```sh
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

Streams automatically open when tasks begin and close upon completion, with connections maintained for up to 570 seconds to accommodate extensive research operations.

## **Built for Production Applications**

SSE for Task Runs addresses a critical need in production AI applications: users expect transparency during long-running operations. Rather than displaying static loading states for research tasks, applications can now provide live updates about search progress, source evaluation, and reasoning steps.

The result is user interfaces that feel responsive and trustworthy, even during complex web research operations that require longer processing time.

## **Start Building**

SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application.

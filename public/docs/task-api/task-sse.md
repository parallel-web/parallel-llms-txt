> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming Events

> SSE for Task Runs

<Note>
  This feature is currently in beta and requires the
  <code>parallel-beta: events-sse-2025-07-24</code> header when using the Task API.
</Note>

## Overview

Task Runs support Server-Sent Events (SSE) at the run level, allowing you to receive real-time
updates on ongoing research conducted by our processors during execution.

For streaming events related to Task Groups, see the [streaming endpoints on the Task Group API](./group-api#stream-group-results).
Task Group events provide aggregate updates at the group level, while Task Run events represent updates for individual task runs.
For a more comprehensive list of differences, [see here.](#differences-between-task-group-events-and-task-run-events)

### Enabling Events Streaming

To enable periodic event publishing for a task run, set the `enable_events` flag to `true`
when creating the task run. If not specified, events may still be available, but frequent updates are not guaranteed.

Create a Task Run with events aggregation enabled explicitly:

<CodeGroup>
  ```bash Task API theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -H "Content-Type: application/json" \
    -H "parallel-beta: events-sse-2025-07-24" \
    --data '{
    "input": "What is the latest in AI research?",
    "processor": "lite",
    "enable_events": true
  }'
  ```
</CodeGroup>

To access the event stream for a specific run, use the `/v1beta/tasks/runs/{run_id}/events` endpoint:

<CodeGroup>
  ```bash Access event stream theme={"system"}

  curl -X GET "https://api.parallel.ai/v1beta/tasks/runs/trun_6eb64c73e4324b15af2a351bef6d0190/events"
  \ -H "x-api-key: ${PARALLEL_API_KEY}" \ -H "Content-Type: text/event-stream"
  ```
</CodeGroup>

This is what a sample stream looks like:

<CodeGroup>
  ```bash Event stream theme={"system"}

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

  ...

  ```
</CodeGroup>

**Notes:**

* All [Task API processors](/task-api/guides/choose-a-processor) starting from `pro` and above have event streaming enabled by default.
* Event streams remain open for 570 seconds. After this period, the stream is closed.

## Stream Behavior

When a stream is started, some earlier events are also re-sent in addition to new updates. This allows developers to build stateless applications more easily, since the API can be relied on without persisting every streamed update. It also supports scenarios where clients can disconnect and later reconnect without missing important events.

### For Running Tasks

When connecting to a stream for a task that is still running:

* **Complete reasoning trace:** You receive all reasoning messages (`task_run.progress_msg.*`) from the beginning of the task execution, regardless of when you connect to the stream
* **Latest progress stats:** You receive only the current aggregate state via `task_run.progress_stats` events, not historical progress snapshots
* **Real-time updates:** As the task continues, you'll receive new reasoning messages and updated progress statistics
* **Final result:** The stream concludes with a `task_run.state` event containing the complete task output when execution finishes

### For Completed Tasks

When connecting to a stream for a task that has already completed:

* **Complete reasoning trace:** You receive the full sequence of reasoning messages that occurred during the original execution
* **Final progress stats:** You receive the final aggregate statistics from when the task completed
* **Immediate result:** The stream ends with a `task_run.state` event that includes the complete task output in the `output` field. This is useful so you don't also need to use the result endpoint.

### Reconnection Behavior

* Event streams are **not resumable** - there are no sequence numbers or cursors to resume from a specific point

* If you disconnect and reconnect to the same task:

* **Running tasks:** You get the complete reasoning trace again plus current progress stats

* **Completed tasks:** You get the same complete sequence as the first connection

* Every connection starts with a `task_run.state` event indicating the current status

### Supported Events

Currently, four types of events are supported:

* **Run Status Events (`task_run.state`):** Indicate the current status of the run. These are sent at the beginning of every stream and when the run transitions to a non-active status.

* **Progress Statistics Events (`task_run.progress_stats`):** Provide point-in-time updates on the number of sources considered and other aggregate statistics. Only the current state is provided, not historical snapshots.

* **Message Events (`task_run.progress_msg.*`):** Communicate reasoning at various stages of task run execution. The complete sequence from the beginning of execution is always provided. Note that this might not be available for `lite` and `base` processors.

* **Error Events (`error`):** Report errors that occur during execution.

**Additional Notes:**

* Event streams always start with a status event and end with a status event (for completed tasks)
* The final status event for completed tasks always includes the complete output in the `output` field
* Events within the reasoning trace maintain their original timestamps, allowing you to understand the execution timeline
* After the event has completed, reasoning traces may not get streamed anymore.

For the full specification of each event, see the examples above.

### Differences Between Task Group Events and Task Run Events

Currently, the events returned by Task Groups is not a strict superset of events returned by Task Runs. See the list of differences below:

|                       | Task Run Events                                                   | Task Group Events                  |
| --------------------- | ----------------------------------------------------------------- | ---------------------------------- |
| **Purpose**           | Events for a single Task Run.                                     | Events for an entire Task Group.   |
| **Run-level events**  | Progress updates, messages, status changes.                       | Only run status changes.           |
| **Resumable streams** | No                                                                | Yes, using `event_id`.             |
| **Events supported**  | Progress updates, messages, status changes for an individual run. | Group status and run terminations. |
| **Reasoning trace**   | Complete trace always provided when connecting.                   | Not available.                     |
| **Final results**     | Always included in final status event.                            | Available through separate API.    |

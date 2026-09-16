# The Parallel Task Group API

[Parallel Tasks](https://docs.parallel.ai/task-api/guides/specify-a-task) are designed for large-scale workloads. When your pipeline needs to launch hundreds or thousands of independent web research calls, the new **Task Group API** wraps those operations into a single batch - giving you one identifier to create, monitor, and collect results from large parallel workloads.

```python
import httpx
from parallel.types import TaskRunCreateParams

client = httpx.Client(
    base_url="https://api.parallel.ai",
    headers={"x-api-key": "your-api-key"},
)

# 1. Create a task-group shell
group_resp = client.post("/v1/tasks/groups", json={}).json()
taskgroup_id = group_resp["taskgroup_id"]

# 2. Initiate runs in that group
questions = [
    "What is the capital of France?",
    "What is the capital of Germany?",
]
run_resp = client.post(
    f"/v1/tasks/groups/{taskgroup_id}/runs",
    json={
        "inputs": [
            TaskRunCreateParams(input=q, processor="lite")
            for q in questions
        ]
    },
).json()

print("Initial status:", run_resp["status"])

# 3. Stream live events for this run
events_url = f"/v1/tasks/groups/{taskgroup_id}/events"

with client.stream("GET", events_url) as stream:
    for chunk in stream.iter_text():
        if chunk.strip():  # ignore keep-alive blanks
            print("Event:", chunk)
```

## **Built for Production Scale**

Whether you're enriching thousands of CRM records, conducting bulk due diligence, or processing large-scale competitive intelligence workflows - the Task Group API makes running Parallel Tasks in batch seamless.

**Unified monitoring** — Track queued, running, completed, and failed counts through a single endpoint instead of polling hundreds of individual Tasks.

**Real-time results streaming** — Open one connection and receive each Task's structured output the moment it completes, eliminating the need to orchestrate multiple polling loops.

**Dynamic expansion** — Add new Tasks to active groups without restarting batches, supporting workflows that discover additional research targets mid-execution.

## **Start Building at Scale**

The Task Group API is available in public beta today. Get started in our [Developer Platform](https://platform.parallel.ai/) or dive directly into the [documentation](https://docs.parallel.ai/).

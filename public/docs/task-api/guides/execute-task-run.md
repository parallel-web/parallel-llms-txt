> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task Runs Lifecycle

> Understanding how Tasks Runs are created, processed, and returned

Task runs are stateful objects, which means that creating a Task Run and retrieving its results are separate calls to the API. Each Task Run is an independent instance that progresses through a series of states from `queued` to `completed`. This asynchronous design enables efficient scaling of web research operations.

### Task Run States

| Status      | Description                                        | Can Transition To     |
| ----------- | -------------------------------------------------- | --------------------- |
| `queued`    | Task created and waiting for processing            | `running`, `failed`   |
| `running`   | Task actively being processed                      | `completed`, `failed` |
| `completed` | Task successfully completed with results available | (Terminal state)      |
| `failed`    | Task encountered an error                          | (Terminal state)      |

**Note**: Running time varies by processor type and task complexity.

## Creating a Task Run

The basic requirements of a task run are:

* Input data (string or JSON object)
* A processor selection
* Output schema (optional but recommended)

Optionally, you can include:

* Input schema (optionally used to validate run input)
* Metadata (for tracking or organizing runs)

A Task Run, once created, can be identified by its `run_id`. A Task Run Result can be accessed once the Task Run status becomes `completed`.

## Rate Limits

The Task API enforces a limit of **2,000 requests per minute** per API key. This limit applies across all POST and GET requests and helps ensure consistent performance for all users.

When you exceed this limit, the API returns a `429 Too Many Requests` status code.

## Examples

### Completed Status Example

```json  theme={"system"}
{
  "run_id": "b0679f70-195e-4f42-8b8a-b8242a0c69c7",
  "status": "completed",
  "is_active": false,
  "result": {
    "population": "29.5 million (2022 estimate)",
    "growth_rate": "1.4% annually",
    "major_cities": [
      "Houston",
      "Dallas",
      "San Antonio"
    ]
  },
  "result_url": "https://api.parallel.ai/v1/tasks/runs/b0679f70-195e-4f42-8b8a-b8242a0c69c7/result",
  "warnings": null,
  "errors": null,
  "processor": "core",
  "metadata": null,
  "created_at": "2025-04-08T04:28:59.913464",
  "modified_at": "2025-04-08T04:29:32.651298"
}
```

### Failed Status Example

If a Task Run encounters an error, the status will be set to `failed` and details will be available in the `errors` field:

```json  theme={"system"}
{
  "run_id": "b0679f70-195e-4f42-8b8a-b8242a0c69c7",
  "status": "failed",
  "is_active": false,
  "result": null,
  "result_url": null,
  "warnings": null,
  "errors": [
    {
      "code": "processing_error",
      "message": "Unable to process task due to invalid input format",
      "details": {
        "field": "input",
        "reason": "Expected JSON object but received string"
      }
    }
  ],
  "processor": "core",
  "metadata": null,
  "created_at": "2025-04-08T04:28:59.913464",
  "modified_at": "2025-04-08T04:29:01.234567"
}
```

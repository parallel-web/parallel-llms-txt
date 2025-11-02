# Choose a Processor

Processors are the engines that execute Task Runs. The choice of Processor determines the performance profile and reasoning behavior used. Pricing is determined by which Processor you select, not by the Task Run itself. Any Task Run can be executed on any Processor.

<Tip> Choose a processor based on the complexity of your task. Use `lite` or `base` for simple enrichments, `core` for reliable accuracy on up to 10 output fields, and `pro` or `ultra` when reasoning depth is critical. </Tip>

Each processor varies in performance characteristics and supported features. Use the table below to compare latency, output type, basis features, and more.

| Processor | Input Type | Output Type  | Strengths                                    | Latency        | Cost (\$/1000) | Max Fields  | Basis Features                             |
| --------- | ---------- | ------------ | -------------------------------------------- | -------------- | -------------- | ----------- | ------------------------------------------ |
| `lite`    | Text, JSON | Text or JSON | Basic metadata, fallback, low latency        | 5s-60s         | 5              | \~2 fields  | Citations, Reasoning, Confidence, Excerpts |
| `base`    | Text, JSON | Text or JSON | Reliable standard enrichments                | 15s-100s       | 10             | \~5 fields  | Citations, Reasoning, Confidence, Excerpts |
| `core`    | Text, JSON | Text or JSON | Cross-referenced, moderately complex outputs | 60s - 5min     | 25             | \~10 fields | Citations, Reasoning, Confidence, Excerpts |
| `core2x`  | Text, JSON | Text or JSON | High complexity cross referenced outputs     | 2min - 5min    | 50             | \~10 fields | Citations, Reasoning, Confidence, Excerpts |
| `pro`     | Text, JSON | Text or JSON | Exploratory web research                     | 3 min - 9min   | 100            | \~20 fields | Citations, Reasoning, Confidence, Excerpts |
| `ultra`   | Text, JSON | Text or JSON | Advanced multi-source deep research          | 5 min - 25 min | 300            | \~20 fields | Citations, Reasoning, Confidence, Excerpts |
| `ultra2x` | Text, JSON | Text or JSON | Difficult deep research                      | 5 min - 25 min | 600            | \~25 fields | Citations, Reasoning, Confidence, Excerpts |
| `ultra4x` | Text, JSON | Text or JSON | Very difficult deep research                 | 8 min - 30 min | 1200           | \~25 fields | Citations, Reasoning, Confidence, Excerpts |
| `ultra8x` | Text, JSON | Text or JSON | The most difficult deep research             | 8 min - 30 min | 2400           | \~25 fields | Citations, Reasoning, Confidence, Excerpts |

<Tip> Cost is measured per 1000 Task Runs in USD. For example, 1 Task Run executed on the `lite` processor would cost \$0.005.</Tip>

## Examples

Processors can be used flexibly depending on the scope and structure of your task. The examples below show how to:

* Use a single processor (like `lite`, `base`, `core`, `pro`, or `ultra`) to handle specific types of input and reasoning depth.
* Chain processors together to combine fast lookups with deeper synthesis.

This structure enables flexibility across a variety of tasks—whether you're extracting metadata, enriching structured records, or generating analytical reports.

### Sample Task for each Processor

<CodeGroup>
  ```python lite theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date of the company in the format MM-YYYY"},
      processor="lite"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python base theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date and most recent product launch of the company"},
      processor="base"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python core theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date, founders, and most recent product launch of the company"},
      processor="core"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python pro theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date, founders, mission, benchmarked competitors and most recent product launch of the company"},
      processor="pro"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python ultra theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"A comprehensive analysis of the industry of the company, including growth factors and major competitors."},
      processor="ultra"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```
</CodeGroup>

### Multi-Processor Workflows

You can combine processors in sequence to support more advanced workflows.

Start by retrieving basic information with `base`:

```python  theme={"system"}
task_run_base = client.task_run.create(
    input="Pfizer",
    task_spec={"output_schema":"Who are the current executive leaders at Pfizer? Include their full name and title. Ensure that you retrieve this information from a reliable source, such as major news outlets or the company website."},
    processor="base"
)
print(f"Run ID: {task_run_base.run_id}")

base_result = client.task_run.result(task_run_base.run_id, api_timeout=3600)
print(base_result.output)
```

Then use the result as input to `core` to generate detailed background information:

```python  theme={"system"}
import json

task_run = client.task_run.create(
    input=json.dumps(base_result.output.content),
    task_spec={"output_schema":"For the executive provided, find their professional background tenure at their current company, and notable strategic responsibilities."},
    processor="pro"
)
print(f"Run ID: {task_run.run_id}")

run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
print(run_result.output)
```

This lets you use a fast processor for initial retrieval, then switch to a more capable one for analysis and context-building.

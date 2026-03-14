> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Processors

> Select the right Task API processor (lite, base, core, pro, ultra) based on task complexity and latency requirements

Processors are the engines that execute Task Runs. The choice of Processor determines the performance profile and reasoning behavior used. Any Task Run can be executed on any Processor.

<Tip> Choose a processor based on **task complexity** and **latency requirements**. Use `lite` or `base` for simple enrichments, `core` for reliable accuracy on up to 10 output fields, and `pro` or `ultra` when reasoning depth is critical. For latency-sensitive workflows, append `-fast` to any processor name. </Tip>

Each processor varies in performance characteristics and supported features. Use the tables below to compare standard and fast processors.

<Note>
  **About "Max Fields" (the `~` symbol):** The max fields column shows approximate limits because actual capacity depends on field complexity. Simple fields like dates or booleans use less capacity than complex fields requiring extensive research. A task with 5 complex analytical fields may require more processing than one with 15 simple lookup fields. Use these numbers as guidelines. If you're near the limit and seeing quality issues, try a higher-tier processor.
</Note>

<Tabs>
  <Tab title="Standard">
    | Processor | Latency      | Strengths                                    | Max Fields  |
    | --------- | ------------ | -------------------------------------------- | ----------- |
    | `lite`    | 10s - 60s    | Basic metadata, fallback, low latency        | \~2 fields  |
    | `base`    | 15s - 100s   | Reliable standard enrichments                | \~5 fields  |
    | `core`    | 60s - 5min   | Cross-referenced, moderately complex outputs | \~10 fields |
    | `core2x`  | 60s - 10min  | High complexity cross referenced outputs     | \~10 fields |
    | `pro`     | 2min - 10min | Exploratory web research                     | \~20 fields |
    | `ultra`   | 5min - 25min | Advanced multi-source deep research          | \~20 fields |
    | `ultra2x` | 5min - 50min | Difficult deep research                      | \~25 fields |
    | `ultra4x` | 5min - 90min | Very difficult deep research                 | \~25 fields |
    | `ultra8x` | 5min - 2hr   | The most difficult deep research             | \~25 fields |
  </Tab>

  <Tab title="Fast">
    | Processor      | Latency      | Strengths                                    | Max Fields  |
    | -------------- | ------------ | -------------------------------------------- | ----------- |
    | `lite-fast`    | 10s - 20s    | Basic metadata, fallback, lowest latency     | \~2 fields  |
    | `base-fast`    | 15s - 50s    | Reliable standard enrichments                | \~5 fields  |
    | `core-fast`    | 15s - 100s   | Cross-referenced, moderately complex outputs | \~10 fields |
    | `core2x-fast`  | 15s - 3min   | High complexity cross referenced outputs     | \~10 fields |
    | `pro-fast`     | 30s - 5min   | Exploratory web research                     | \~20 fields |
    | `ultra-fast`   | 1min - 10min | Advanced multi-source deep research          | \~20 fields |
    | `ultra2x-fast` | 1min - 20min | Difficult deep research                      | \~25 fields |
    | `ultra4x-fast` | 1min - 40min | Very difficult deep research                 | \~25 fields |
    | `ultra8x-fast` | 1min - 1hr   | The most difficult deep research             | \~25 fields |
  </Tab>
</Tabs>

<Note>
  See [Pricing](/getting-started/pricing) for processor costs and all API rates.
</Note>

## Standard vs Fast Processors

Each processor is available in two variants: **Standard** and **Fast**. They differ in how they balance speed versus data freshness.

To use a fast processor, append `-fast` to the processor name:

```python  theme={"system"}
task_run = client.task_run.create(
    input="Parallel Web Systems (parallel.ai)",
    task_spec={"output_schema": "The founding date of the company"},
    processor="core-fast"  # Fast processor
)
```

### What's the Trade-off?

| Aspect             | Standard Processors                       | Fast Processors                   |
| ------------------ | ----------------------------------------- | --------------------------------- |
| **Latency**        | Higher                                    | 2-5x faster                       |
| **Data Freshness** | Highest freshness (prioritizes live data) | Very fresh (optimized for speed)  |
| **Best For**       | Background jobs, accuracy-critical tasks  | Interactive apps, agent workflows |

The trade-off is simple: **fast processors optimize for speed, standard processors optimize for freshness**. Both maintain high accuracy—the difference is in how they prioritize when retrieving data.

### Why are Fast Processors Faster?

Fast processors are optimized for speed—they return results as quickly as possible while maintaining high accuracy. Standard processors prioritize data freshness and will wait longer to ensure the most up-to-date information when needed.

In practice, you can expect **2-5x faster response times** with fast processors compared to standard processors for the same tier. This makes fast processors ideal for interactive applications where users are waiting for results.

### How Fresh is the Data?

Both processor types access **very fresh data** sufficient for most use cases. Our data is continuously updated, so for the vast majority of queries—company information, product details, professional backgrounds, market research—both will return accurate, current results.

**When to prefer standard processors for freshness:**

* Real-time financial data (stock prices, exchange rates)
* Breaking news or events from the last few hours
* Rapidly changing information (live scores, election results)
* Any use case where absolute data freshness is more important than speed

### When to Use Each

<Tabs>
  <Tab title="Standard Processors">
    * **Accuracy is paramount** - When correctness matters much more than speed
    * **Real-time data required** - Stock prices, live scores, breaking news
    * **Background/async jobs** - Tasks running without user waiting
    * **Research-heavy tasks** - Deep research benefiting from live sources
    * **High-volume async enrichments** - Processing large datasets in the background
  </Tab>

  <Tab title="Fast Processors">
    * **Testing agents** - Rapid iteration during development
    * **Subagent calls** - A calling agent needs low-latency responses
    * **Interactive applications** - Table UIs where users actively run tasks
    * **Latency-sensitive workflows** - Any use case where speed is critical
  </Tab>
</Tabs>

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

### Sample Task for each Fast Processor

<CodeGroup>
  ```python lite-fast theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date of the company in the format MM-YYYY"},
      processor="lite-fast"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python base-fast theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date and most recent product launch of the company"},
      processor="base-fast"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python core-fast theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date, founders, and most recent product launch of the company"},
      processor="core-fast"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python pro-fast theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"The founding date, founders, mission, benchmarked competitors and most recent product launch of the company"},
      processor="pro-fast"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```python ultra-fast theme={"system"}
  task_run = client.task_run.create(
      input="Parallel Web Systems (parallel.ai)",
      task_spec={"output_schema":"A comprehensive analysis of the industry of the company, including growth factors and major competitors."},
      processor="ultra-fast"
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

This lets you use a lower compute processor for initial retrieval, then switch to a more capable one for analysis and context-building.

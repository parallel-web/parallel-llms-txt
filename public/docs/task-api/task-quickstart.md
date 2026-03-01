> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task API Quickstart

> Transform complex knowledge work into programmable, repeatable operations powered by AI web research

The **Task API** combines AI inference with web search and live crawling to turn complex research tasks into repeatable workflows. Define what you need in plain language or JSON, and the Task API handles the research, synthesis, and structured output—complete with citations and confidence levels.

<Note>
  See [Pricing](/getting-started/pricing) for a detailed schedule of rates.
</Note>

## What you can build

The Task API is designed for maximum extensibility. Create a task spec for any research need:

* **Data enrichment**: Enhance CRM records, company databases, or contact lists with web intelligence
* **Market research**: Generate comprehensive reports on industries, competitors, or trends
* **Due diligence**: Automate compliance checks, background research, and verification workflows
* **Content generation**: Create research-backed reports, summaries, and analyses

## Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai). Then, set up with the TypeScript SDK, Python SDK or with cURL:

<CodeGroup>
  ```bash cURL theme={"system"}
  echo "Install curl and jq via brew, apt, or your favorite package manager"
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash Python theme={"system"}
  pip install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash TypeScript theme={"system"}
  npm install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```
</CodeGroup>

## Quick start

Every Task API workflow follows three steps: **create** a task run, **wait** for completion, and **retrieve** the result.

```python  theme={"system"}
from parallel import Parallel

client = Parallel(api_key="PARALLEL_API_KEY")

# 1. Create a task run
task_run = client.task_run.create(
    input="Stripe",
    task_spec={"output_schema": "The founding year and total funding raised"},
    processor="base"
)

# 2-3. Retrieve the result (blocks until complete)
run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
print(run_result.output)
```

For complete end-to-end examples with all languages, polling, and response handling, see:

<CardGroup cols={2}>
  <Card title="Enrichment Quickstart" icon="table" href="/task-api/task-enrichment">
    Enrich structured data with web intelligence — includes cURL, Python, TypeScript, and async examples
  </Card>

  <Card title="Deep Research Quickstart" icon="magnifying-glass-chart" href="/task-api/task-deep-research">
    Generate comprehensive reports — includes polling, webhooks, and SSE approaches
  </Card>
</CardGroup>

## Core concepts

Before diving in, understand these key concepts:

<CardGroup cols={3}>
  <Card title="Task specs" icon="file-code" href="/task-api/guides/specify-a-task">
    Define your research task using input/output schemas in plain language or JSON
  </Card>

  <Card title="Processors" icon="microchip" href="/task-api/guides/choose-a-processor">
    Choose the right processor tier based on research depth and latency requirements
  </Card>

  <Card title="Research Basis" icon="quote-left" href="/task-api/guides/access-research-basis">
    Every output includes citations, reasoning, and confidence levels for verification
  </Card>
</CardGroup>

### Output schema types

The Task API supports four output schema types:

| Type            | Description                                                            | When to Use                                           |
| --------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| **Text string** | Plain text description (e.g., `"The founding date in MM-YYYY format"`) | Simple lookups, single-field answers                  |
| **JSON schema** | `{"type": "json", "json_schema": {...}}`                               | Structured enrichment with multiple typed fields      |
| **Text schema** | `{"type": "text"}` with optional `description`                         | Markdown reports with inline citations                |
| **Auto**        | `{"type": "auto"}`, or omit `task_spec` entirely                       | Let the processor determine the best output structure |

See [Specify a Task](/task-api/guides/specify-a-task) for schema best practices and [Processors](/task-api/guides/choose-a-processor) for choosing the right processor tier. For Python SDK users, these correspond to `TaskSpecParam`, `JsonSchemaParam`, and `TextSchemaParam` types from `parallel.types`.

## Input and output patterns

The Task API supports flexible input/output combinations to match your use case:

### Question in → Answer out

The simplest pattern: ask a question, get a researched answer.

```python  theme={"system"}
task_run = client.task_run.create(
    input="What is the founding date of the United Nations?",
    task_spec={"output_schema": "The founding date in MM-YYYY format"},
    processor="base"
)
# Output: "10-1945"
```

### Question in → Report out

Generate comprehensive markdown reports with inline citations.

```python  theme={"system"}
from parallel.types import TaskSpecParam, TextSchemaParam

task_run = client.task_run.create(
    input="Create a market research report on the HVAC industry in the USA",
    processor="ultra",
    task_spec=TaskSpecParam(output_schema=TextSchemaParam())
)
# Output: Multi-page markdown report with citations
```

### Question in → Auto-structured output

Let the processor automatically determine the best output structure.

```python  theme={"system"}
task_run = client.task_run.create(
    input="Research the top 5 AI infrastructure companies and their recent funding",
    processor="ultra"
)
# Output: Automatically structured JSON with company profiles, funding details, etc.
```

### Structured input → Structured output

Define explicit input and output schemas for precise control over data enrichment.

```python  theme={"system"}
task_run = client.task_run.create(
    input={"company_name": "Stripe", "website": "stripe.com"},
    task_spec={
        "input_schema": {
            "type": "json",
            "json_schema": {
                "type": "object",
                "properties": {
                    "company_name": {"type": "string"},
                    "website": {"type": "string"}
                }
            }
        },
        "output_schema": {
            "type": "json",
            "json_schema": {
                "type": "object",
                "properties": {
                    "founding_year": {"type": "string"},
                    "employee_count": {"type": "string"},
                    "total_funding": {"type": "string"}
                }
            }
        }
    },
    processor="core"
)
```

## Use cases

<CardGroup cols={2}>
  <Card title="Enrichment" icon="table" href="/task-api/task-enrichment">
    Enhance structured data with web intelligence. Start with a spreadsheet or database, add new columns with researched data.
  </Card>

  <Card title="Deep Research" icon="magnifying-glass-chart" href="/task-api/task-deep-research">
    Conduct open-ended research without structured input. Generate comprehensive reports on any topic.
  </Card>
</CardGroup>

## Next steps

* [**Enrichment quickstart:**](/task-api/task-enrichment) Learn how to enrich structured data at scale
* [**Deep Research quickstart:**](/task-api/task-deep-research) Generate comprehensive research reports
* [**Task Groups:**](/task-api/group-api) Run multiple tasks concurrently with batch tracking
* [**Streaming Events:**](/task-api/task-sse) Monitor long-running tasks with real-time progress updates
* [**Webhooks:**](/task-api/webhooks) Configure HTTP callbacks for task completion notifications
* [**API Reference:**](/api-reference/tasks-v1/create-task-run) Complete endpoint documentation

## Rate limits

See [Rate Limits](/resources/rate-limits) for default quotas and how to request higher limits.

# Deep Research

> Natural language to structured intelligence with auto schema

## Overview

Deep Research is an advanced feature of Parallel's [Task API](/task-api/guides/execute-task-run) that enables
comprehensive multi-step web exploration, targeted information retrieval, and sophisticated synthesis in a
single API call. This powerful capability compresses hours of manual research
into minutes, delivering high-quality intelligence at scale. Available exclusively with `pro` and
`ultra` [processor families](/task-api/guides/choose-a-processor), Deep Research transforms
natural language research queries into comprehensive, structured intelligence reports complete with inline
citations and verification.

When leveraging `pro` and `ultra` processors, Deep Research automatically interprets natural language
research intent and produces analyst-grade outputs tailored to your specific query. The system intelligently
determines the optimal output structure based on your research objectives, automatically generating appropriate
JSON schemas or formatted markdown reports.

## Key Features

* **Declarative Approach**: Users specify what intelligence they need. Our system handles the complex
  orchestration of all research components and structuring it in a way that makes the most sense given the input and
  research output.
* **Flexible Output Structure**: Users specify either `auto` or `text` schema mode, and receive optimally structured
  JSON output or markdown report.
* **Structured Intelligence with Verification**: Parallel delivers structured outputs with granular
  calibrated verification built into every response.

<Note>
  {" "}

  Long-Running Tasks: Deep Research can take up to 45 minutes to complete. Use [webhooks](/task-api/webhooks)
  or [server-sent events](/task-api/task-sse) for real-time updates.{" "}
</Note>

## Creating a Deep Research Task

Deep Research accepts any input schema as input, including plain-text strings.
The more specific and detailed your input, the better the research results would be.

<Note>
  **Input size restriction**: Deep Research is optimized for concise research
  prompts and is not meant for long context inputs. Keep your input under
  **15,000 characters** for optimal performance and results.
</Note>

Deep Research supports two output formats to meet different integration needs:

### Auto Schema

Specifying auto schema mode in the Task API output schema triggers Deep Research
and ensures well-structured outputs, without the need to specify a desired output structure.
The final schema type will follow a [JSONSchema](https://docs.parallel.ai/api-reference/task-api-v1/create-task-run#body-task-spec-output-schema)
format and will be determined by the processor automatically.

Auto schema mode is the default mode when using `pro` and `ultra` line of processors.
This format is ideal for programmatic processing, data analysis, and integration with other systems.

<CodeGroup>
  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  task_run = client.task_run.create(
      input="Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
      processor="ultra"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env["PARALLEL_API_KEY"],
  });

  const taskRun = await client.taskRun.create({
    input:
      "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
    processor: "ultra",
  });

  console.log(`Run ID: ${taskRun.run_id}`);

  // Poll for results with 25-second timeout, retry up to 144 times (1 hour total)
  let runResult;
  for (let i = 0; i < 144; i++) {
    try {
      runResult = await client.taskRun.result(taskRun.run_id, { timeout: 25 });
      break;
    } catch (error) {
      if (i === 143) throw error; // Last attempt failed
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(runResult.output);
  ```

  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H 'Content-Type: application/json' \
    --data-raw '{
    "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
    "processor": "ultra"
  }'
  ```
</CodeGroup>

### Text Schema

Specifying text schema mode in the Task API output schema triggers Deep Research with a markdown report output format.
The generated result will contain extensive research formatted into a markdown report with in-line citations.
This format is perfect for human-readable content as well as LLM ingestion.

To provide guidance on the output, use the description field when specifying text schema. This
allows users to steer the report generated towards a certain direction like control over the length or the content
of the report.

<CodeGroup>
  ```python Python theme={"system"}
  from parallel import Parallel
  from parallel.types import TaskSpecParam, TextSchemaParam

  client = Parallel(api_key="PARALLEL_API_KEY")

  task_run = client.task_run.create(
      input="Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
      processor="ultra",
      task_spec=TaskSpecParam(output_schema=TextSchemaParam())
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env["PARALLEL_API_KEY"],
  });

  const taskRun = await client.taskRun.create({
    input:
      "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
    processor: "ultra",
    task_spec: {
      output_schema: {
        type: "text",
      },
    },
  });

  console.log(`Run ID: ${taskRun.run_id}`);

  // Poll for results with 25-second timeout, retry up to 144 times (1 hour total)
  let runResult;
  for (let i = 0; i < 144; i++) {
    try {
      runResult = await client.taskRun.result(taskRun.run_id, { timeout: 25 });
      break;
    } catch (error) {
      if (i === 143) throw error; // Last attempt failed
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(runResult.output);
  ```

  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: PARALLEL_API_KEY" \
    -H 'Content-Type: application/json' \
    --data-raw '{
    "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
    "processor": "ultra",
    "task_spec": {
      "output_schema": {
        "type": "text"
      }
    }
  }'
  ```
</CodeGroup>

### Sample Response

<Note>
  **Important**: The response below shows the **final completed result** after
  Deep Research has finished. When you first create a task, you'll receive an
  immediate response with `"status": "running"`. You'll need to poll the task or
  use [webhooks](/task-api/webhooks) to get the final structured research output
  shown below.
</Note>

Below is a shortened sample response using the `auto` schema. The complete response contained 124 content fields, with 610 total citations for this Task.

```json [expandable] theme={"system"}
{
  "output": {
    "content": {
      "market_size_and_forecast": {
        "cagr": "6.9%",
        "market_segment": "U.S. HVAC Systems",
        "current_valuation": "USD 29.89 billion (2024)",
        "forecasted_valuation": "USD 54.02 billion",
        "forecast_period": "2025-2033"
      },
      "company_profiles": [
        {
          "company_name": "Carrier Global Corporation",
          "stock_ticker": "CARR",
          "revenue": "$22.5 billion (FY2024)",
          "market_capitalization": "$63.698 billion (July 1, 2025)",
          "market_position": "Global leader in intelligent climate and energy solutions",
          "recent_developments": "Acquisition of Viessmann Climate Solutions for $13 billion"
        },
        {
          "company_name": "Daikin Industries, Ltd.",
          "stock_ticker": "DKILY",
          "revenue": "¥4,752.3 billion (FY2024)",
          "market_position": "Japan's leading HVAC manufacturer and top global player",
          "recent_developments": "Multiple acquisitions to strengthen supply capabilities"
        }
      ],
      "recent_mergers_and_acquisitions": {
        "acquiring_company": "Carrier Ventures",
        "target_company": "ZutaCore",
        "deal_summary": "Strategic investment in liquid cooling systems for data centers",
        "date": "February 2025"
      },
      "growth_opportunities": "Data center cooling, building retrofits, electrification, healthcare applications, and enhanced aftermarket services",
      "market_segmentation_analysis": {
        "dominant_segment": "Residential",
        "dominant_segment_share": "39.8% (in 2024)",
        "fastest_growing_segment": "Commercial",
        "fastest_growing_segment_cagr": "7.4% (from 2025 to 2033)"
      },
      "publicly_traded_hvac_companies": [
        {
          "company_name": "Carrier Global Corporation",
          "stock_ticker": "CARR"
        },
        {
          "company_name": "Daikin Industries, Ltd.",
          "stock_ticker": "DKILY"
        },
        {
          "company_name": "Johnson Controls International plc",
          "stock_ticker": "JCI"
        }
      ]
    },
    "basis": [
      {
        "field": "market_size_and_forecast.current_valuation",
        "reasoning": "Market size data sourced from Grand View Research industry analysis report, which provides comprehensive market valuation for the U.S. HVAC systems market in 2024.",
        "citations": [
          {
            "url": "https://www.grandviewresearch.com/industry-analysis/us-hvac-systems-market",
            "excerpts": [
              "The U.S. HVAC systems market size was estimated at USD 29.89 billion in 2024"
            ],
            "title": "U.S. HVAC Systems Market Size, Share & Trends Analysis Report"
          }
        ],
        "confidence": "high"
      },
      {
        "field": "company_profiles.0.revenue",
        "reasoning": "Carrier Global Corporation's 2024 revenue figures are directly reported in their financial communications and investor relations materials.",
        "citations": [
          {
            "url": "https://monexa.ai/blog/carrier-global-corporation-strategic-climate-pivot-CARR-2025-07-02",
            "excerpts": [
              "Carrier reported **2024 revenues of $22.49 billion**, a modest increase of +1.76% year-over-year"
            ],
            "title": "Carrier Global Corporation: Strategic Climate Pivot"
          }
        ],
        "confidence": "high"
      },
      {
        "field": "recent_mergers_and_acquisitions",
        "reasoning": "Carrier Ventures' strategic investment in ZutaCore represents recent M&A activity focused on next-generation cooling technologies for data centers.",
        "citations": [
          {
            "url": "https://finance.yahoo.com/news/10-biggest-hvac-companies-usa-142547989.html",
            "excerpts": [
              "Strategic investment activity by Carrier Ventures in companies specializing in liquid cooling systems"
            ],
            "title": "10 Biggest HVAC Companies in the USA"
          }
        ],
        "confidence": "medium"
      }
    ],
    "run_id": "trun_646e167d826747e1b4690e58d2b9941e",
    "status": "completed",
    "created_at": "2025-01-30T20:12:18.123456Z",
    "completed_at": "2025-01-30T20:25:41.654321Z",
    "processor": "ultra",
    "warnings": null,
    "error": null,
    "taskgroup_id": null
  }
}
```

Deep Research returns a response which includes the `content` and the `basis`, as with other [Task API](/task-api/guides/execute-task-run) executions. The key difference is that the `basis` object in an `auto` mode output contains Nested FieldBasis.

### Nested FieldBasis

<Note>
  {" "}

  In `text` mode, FieldBasis is not nested. It contains a list of citations (with
  URLs and excerpts) for all sites visited during research. The most relevant citations
  are included at the base of the report itself, with inline references.{" "}
</Note>

In `auto` mode, the [Basis](/task-api/guides/access-research-basis) object maps each output field (including nested fields) with supporting evidence. This ensures that every output, including nested output fields, has citations, excerpts, confidence levels and reasoning.

For nested fields, the basis uses dot notation for indexing:

* `key_players.0` for the first item in a key players array
* `industry_overview.growth_cagr` for nested object fields
* `market_trends.2.description` for nested arrays with objects

## Example: Market Research Assistant

Here's how to build a market research tool with Deep Research, showing different approaches for handling the async nature of the Task API:

<CodeGroup>
  ```python Basic Implementation theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  # Execute research task (handles polling internally)
  task_run = client.task_run.create(
      input="Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
      processor="ultra"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)

  print(f"Research completed! Output has {len(run_result.output.basis)} structured fields")
  for field in run_result.output.basis[:3]:
      print(f"- {field.field}: {len(field.citations)} citations")
  ```

  ```typescript Basic Implementation theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env["PARALLEL_API_KEY"],
  });

  // Execute research task
  const taskRun = await client.taskRun.create({
    input:
      "Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
    processor: "ultra",
  });

  console.log(`Run ID: ${taskRun.run_id}`);

  // Poll for results with 25-second timeout, retry up to 144 times (1 hour total)
  let runResult;
  for (let i = 0; i < 144; i++) {
    try {
      runResult = await client.taskRun.result(taskRun.run_id, { timeout: 25 });
      break;
    } catch (error) {
      if (i === 143) throw error; // Last attempt failed
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(
    `Research completed! Output has ${runResult.output.basis.length} structured fields`
  );
  runResult.output.basis.slice(0, 3).forEach((field) => {
    console.log(`- ${field.field}: ${field.citations?.length || 0} citations`);
  });
  ```

  ```python With Polling theme={"system"}
  from parallel import Parallel
  import time

  client = Parallel(api_key="PARALLEL_API_KEY")

  # Create the research task (low-level API)
  task_run = client.task_run.create(
      input="Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
      processor="ultra"
  )

  print(f"Task created: {task_run.run_id}")
  print("Polling for completion...")

  # Manual polling for completion (Deep Research can take up to 15 minutes)
  while True:
      status = client.task_run.get(task_run.run_id)
      print(f"Status: {status.status}")

      if status.status == "completed":
          # Get the final results using the result() method
          run_result = client.task_run.result(task_run.run_id)
          print(f"Research completed! Output has {len(run_result.output.basis)} structured fields")

          # Display sample findings
          for field in run_result.output.basis[:3]:
              print(f"- {field.field}: {len(field.citations)} citations")
          break
      elif status.status == "failed":
          print("Task failed")
          break

      time.sleep(60)  # Check every 60 seconds
  ```

  ```typescript With Polling theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env["PARALLEL_API_KEY"],
  });

  // Create the research task (low-level API)
  const taskRun = await client.taskRun.create({
    input:
      "Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
    processor: "ultra",
  });

  console.log(`Task created: ${taskRun.run_id}`);
  console.log("Polling for completion...");

  // Manual polling for completion (Deep Research can take up to 1 hour)
  let attempts = 0;
  const maxAttempts = 144; // 144 * 25 seconds = 1 hour

  while (attempts < maxAttempts) {
    const status = await client.taskRun.retrieve(taskRun.run_id);
    console.log(
      `Status: ${status.status} (attempt ${attempts + 1}/${maxAttempts})`
    );

    if (status.status === "completed") {
      // Get the final results using the result() method
      const runResult = await client.taskRun.result(taskRun.run_id, {
        timeout: 25,
      });
      console.log(
        `Research completed! Output has ${runResult.output.basis.length} structured fields`
      );

      // Display sample findings
      runResult.output.basis.slice(0, 3).forEach((field) => {
        console.log(
          `- ${field.field}: ${field.citations?.length || 0} citations`
        );
      });
      break;
    } else if (status.status === "failed") {
      console.log("Task failed");
      break;
    }

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 25000)); // Check every 25 seconds
  }

  if (attempts >= maxAttempts) {
    console.log("Task timed out after 1 hour");
  }
  ```

  ```python With Webhooks theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  # Create task run with webhook
  task_run = client.task_run.create(
      input="Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
      processor="ultra",
      webhook={
          "url": "https://your-domain.com/webhooks/research-complete",
          "event_types": ["task_run.status"],
          "secret": "your-webhook-secret"
      }
  )

  print(f"Task created with webhook: {task_run.run_id}")
  print("You'll receive a webhook notification when research completes")

  # Your webhook endpoint should handle the completion:
  # POST /webhooks/research-complete
  # {
  #   "event_type": "task_run.status",
  #   "run_id": "trun_abc123",
  #   "status": "completed"
  # }
  #
  # Then fetch results:
  # run_result = client.task_run.result(run_id)
  ```

  ```typescript With Webhooks theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env["PARALLEL_API_KEY"],
  });

  // Note: Webhooks require the beta header
  const taskRun = await client.beta.taskRun.create({
    input:
      "Create a comprehensive market research report on the renewable energy storage market in Europe, focusing on battery technologies and policy impacts",
    processor: "ultra",
    webhook: {
      url: "https://your-domain.com/webhooks/research-complete",
      event_types: ["task_run.status"],
    },
    betas: ["webhook-2025-08-12"],
  });

  console.log(`Task created with webhook: ${taskRun.run_id}`);
  console.log("You'll receive a webhook notification when research completes");

  // Your webhook endpoint should handle the completion:
  // POST /webhooks/research-complete
  // {
  //   "event_type": "task_run.status",
  //   "run_id": "trun_abc123",
  //   "status": "completed"
  // }
  //
  // Then fetch results:
  // const runResult = await client.taskRun.result(runId, { timeout: 25 });
  ```
</CodeGroup>

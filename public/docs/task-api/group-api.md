> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task Group

> Batch process Tasks at scale with the Parallel Task Group API

<Note>
  This API is in beta and is accessible via the{" "}
  <code>/v1beta/tasks/groups</code>
  endpoint.{" "}
</Note>

The Parallel Task Group API enables you to batch process hundreds or thousands of Tasks efficiently. Instead of running Tasks one by one, you can organize them into groups, monitor their progress collectively, and retrieve results in bulk. The API is comprised of the following endpoints:

**Creation**: To run a batch of tasks in a group, you first need to create a task group, after which you can add runs to it, which will be queued and processed.

* `POST /v1beta/tasks/groups` (Create task-group)
* `POST /v1beta/tasks/groups/{taskgroup_id}/runs` (Add runs. Up to 1,000 runs per POST request.)

**Progress Snapshot**: At any moment during the task, you can get an instant snapshot of the state of it using `GET /{taskgroup_id}` and `GET /{taskgroup_id}/runs`. Please note that the runs endpoint streams back the requested runs instantly (using SSE) to allow for large payloads without pagination, and it doesn't wait for runs to complete. Runs in a task group are stored indefinitely, so unless you have high performance requirements, you may not need to keep your own state of the intermediate results. However, it's recommended to still do so after the task group is completed.

* `GET /v1beta/tasks/groups/{taskgroup_id}` (Get task-group summary)
* `GET /v1beta/tasks/groups/{taskgroup_id}/runs` (Fetch task group runs)

**Realtime updates**: You may want to provide efficient real-time updates to your app. For a high-level summary and run completion events, you can use `GET /{taskgroup_id}/events`. To also retrieve the task run result upon completion you can use the [task run endpoint](/api-reference/tasks-v1/retrieve-task-run-result)

* `GET /v1beta/tasks/groups/{taskgroup_id}/events` (Stream task-group events)
* `GET /v1/tasks/runs/{run_id}/result` (Get task-run result)

To determine whether a task group is fully completed, you can either use realtime update events, or you can poll the task-group summary endpoint. You can also keep adding runs to your task group indefinitely.

## Key Concepts

### Task Groups

A Task Group is a container that organizes multiple task runs. Each group has:

* A unique `taskgroup_id` for identification
* A status object with `is_active` (boolean) and `task_run_status_counts` (counts by status)
* The ability to add new Tasks dynamically

### Group Status

Track progress with real-time status updates:

* Total number of task runs
* Count of runs by status (queued, running, completed, failed)
* Whether the group is still active (`is_active` becomes `false` when all runs finish)
* Human-readable status messages

## Quick Start

### 1. Define Types and Task Structure

<CodeGroup>
  ```bash cURL theme={"system"}
  # Define task specification as a variable
  TASK_SPEC='{
    "input_schema": {
      "json_schema": {
        "type": "object",
        "properties": {
          "company_name": {
            "type": "string",
            "description": "Name of the company"
          },
          "company_website": {
            "type": "string",
            "description": "Company website URL"
          }
        },
        "required": ["company_name", "company_website"]
      }
    },
    "output_schema": {
      "json_schema": {
        "type": "object",
        "properties": {
          "key_insights": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Key business insights"
          },
          "market_position": {
            "type": "string",
            "description": "Market positioning analysis"
          }
        },
        "required": ["key_insights", "market_position"]
      }
    }
  }'
  ```

  ```python Python theme={"system"}
  import pydantic
  from parallel import AsyncParallel
  from parallel.types import TaskSpecParam, JsonSchemaParam
  from parallel.types.beta.beta_run_input_param import BetaRunInputParam

  # Define your input and output models
  class CompanyInput(pydantic.BaseModel):
      company_name: str = pydantic.Field(description="Name of the company")
      company_website: str = pydantic.Field(description="Company website URL")

  class CompanyOutput(pydantic.BaseModel):
      key_insights: list[str] = pydantic.Field(description="Key business insights")
      market_position: str = pydantic.Field(description="Market positioning analysis")

  # Create reusable task specification
  task_spec = TaskSpecParam(
      input_schema=JsonSchemaParam(json_schema=CompanyInput.model_json_schema()),
      output_schema=JsonSchemaParam(json_schema=CompanyOutput.model_json_schema()),
  )
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  // Define your input and output types
  interface CompanyInput {
    company_name: string;
    company_website: string;
  }

  interface CompanyOutput {
    key_insights: string[];
    market_position: string;
  }

  // Use SDK types for Task Group API
  type TaskGroupObject = Parallel.Beta.TaskGroup;
  type TaskGroupStatus = Parallel.Beta.TaskGroupStatus;
  type TaskGroupRunResponse = Parallel.Beta.TaskGroupRunResponse;
  type TaskGroupEventsResponse = Parallel.Beta.TaskGroupEventsResponse;
  type TaskGroupGetRunsResponse = Parallel.Beta.TaskGroupGetRunsResponse;

  // Create reusable task specification using SDK types
  const taskSpec: Parallel.TaskSpec = {
    input_schema: {
      type: "json",
      json_schema: {
        type: "object",
        properties: {
          company_name: {
            type: "string",
            description: "Name of the company",
          },
          company_website: {
            type: "string",
            description: "Company website URL",
          },
        },
        required: ["company_name", "company_website"],
      },
    },
    output_schema: {
      type: "json",
      json_schema: {
        type: "object",
        properties: {
          key_insights: {
            type: "array",
            items: { type: "string" },
            description: "Key business insights",
          },
          market_position: {
            type: "string",
            description: "Market positioning analysis",
          },
        },
        required: ["key_insights", "market_position"],
      },
    },
  };
  ```
</CodeGroup>

### 2. Create a Task Group

<CodeGroup>
  ```bash cURL theme={"system"}
  # Create task group and capture the ID
  response=$(curl --request POST \
    --url https://api.parallel.ai/v1beta/tasks/groups \
    --header 'Content-Type: application/json' \
    --header 'x-api-key: ${PARALLEL_API_KEY}' \
    --data '{}')

  # Extract taskgroup_id from response
  TASKGROUP_ID=$(echo $response | jq -r '.taskgroup_id')
  echo "Created task group: $TASKGROUP_ID"
  ```

  ```python Python theme={"system"}
  # Initialize the client
  client = AsyncParallel(api_key="PARALLEL_API_KEY")

  # Create a new task group
  task_group = await client.beta.task_group.create()

  taskgroup_id = task_group.task_group_id
  print(f"Created task group: {taskgroup_id}")
  ```

  ```typescript TypeScript theme={"system"}
  // Initialize the client
  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY,
  });

  // Create a new task group using the beta API
  const groupResponse = await client.beta.taskGroup.create({});

  const taskgroupId = groupResponse.taskgroup_id;
  console.log(`Created task group: ${taskgroupId}`);
  ```
</CodeGroup>

### 3. Add Tasks to the Group

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request POST \
    --url https://api.parallel.ai/v1beta/tasks/groups/${TASKGROUP_ID}/runs \
    --header 'Content-Type: application/json' \
    --header 'x-api-key: ${PARALLEL_API_KEY}' \
    --data '{
    "default_task_spec": '$TASK_SPEC',
    "inputs": [
      {
        "input": {
          "company_name": "Acme Corp",
          "company_website": "https://acme.com"
        },
        "processor": "pro"
      },
      {
        "input": {
          "company_name": "TechStart",
          "company_website": "https://techstart.io"
        },
        "processor": "pro"
      }
    ]
  }'
  ```

  ```python Python theme={"system"}
  # Prepare your inputs
  companies = [
      {"company_name": "Acme Corp", "company_website": "https://acme.com"},
      {"company_name": "TechStart", "company_website": "https://techstart.io"},
      # ... more companies
  ]

  # Create task run inputs
  run_inputs = [
      BetaRunInputParam(
          input=CompanyInput(**company).model_dump(),
          processor="pro",
      )
      for company in companies
  ]

  # Add runs to the group
  response = await client.beta.task_group.add_runs(
      taskgroup_id,
      inputs=run_inputs,
      default_task_spec=task_spec,
  )

  print(f"Added {len(response.run_ids)} Tasks to group")
  ```

  ```typescript TypeScript theme={"system"}
  // Prepare your inputs
  const companies = [
    { company_name: "Acme Corp", company_website: "https://acme.com" },
    { company_name: "TechStart", company_website: "https://techstart.io" },
    // ... more companies
  ];

  // Create task run inputs using SDK types
  const runInputs: Array<Parallel.Beta.BetaRunInput> = companies.map(
    (company) => ({
      input: {
        company_name: company.company_name,
        company_website: company.company_website,
      },
      processor: "pro",
    })
  );

  // Add runs to the group
  const response = await client.beta.taskGroup.addRuns(taskgroupId, {
    default_task_spec: taskSpec,
    inputs: runInputs,
  });

  console.log(`Added ${response.run_ids.length} Tasks to group`);
  ```
</CodeGroup>

### 4. Monitor Progress

<CodeGroup>
  ```bash cURL theme={"system"}
  # Get status of the group
  curl --request GET \
    --url https://api.parallel.ai/v1beta/tasks/groups/${TASKGROUP_ID} \
    --header 'x-api-key: ${PARALLEL_API_KEY}'

  # Get status of all runs in the group
  curl --request GET \
    --no-buffer \
    --url https://api.parallel.ai/v1beta/tasks/groups/${TASKGROUP_ID}/runs \
    --header 'x-api-key: ${PARALLEL_API_KEY}'
  ```

  ```python Python theme={"system"}
  import asyncio

  async def wait_for_completion(client: AsyncParallel, taskgroup_id: str) -> None:
      while True:
          task_group = await client.beta.task_group.retrieve(taskgroup_id)

          status = task_group.status
          print(f"Status: {status.task_run_status_counts}")

          if not status.is_active:
              print("All tasks completed!")
              break

          await asyncio.sleep(10)

  asyncio.run(wait_for_completion(client, taskgroup_id))
  ```

  ```typescript TypeScript theme={"system"}
  async function waitForCompletion(
    client: Parallel,
    taskgroupId: string
  ): Promise<void> {
    while (true) {
      const response = await client.beta.taskGroup.retrieve(taskgroupId);

      const status = response.status;
      console.log("Status:", status.task_run_status_counts);

      if (!status.is_active) {
        console.log("All tasks completed!");
        break;
      }

      // Wait 10 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  async function main() {
    const client = new Parallel({ apiKey: process.env["PARALLEL_API_KEY"] });
    // ... create task group and get taskgroupId ...
    await waitForCompletion(client, taskgroupId);
  }

  main();
  ```
</CodeGroup>

### 5. Retrieve Results

The `getRuns` endpoint returns a **Server-Sent Events stream**, not a simple JSON response. Each event in the stream has:

* `type`: Either `"task_run.state"` (a run reached a non-active status: completed, failed, or cancelled) or `"error"`
* `event_id`: Cursor for resuming the stream via the `last_event_id` parameter
* `run`: The `TaskRun` object with `run_id`, `status`, and `is_active`
* `input`: The original input (only included when `include_input=true`)
* `output`: The result output (only included when `include_output=true` **and** the run completed successfully)

<CodeGroup>
  ```bash cURL theme={"system"}
  curl --request GET \
    --no-buffer \
    --url https://api.parallel.ai/v1beta/tasks/groups/${TASKGROUP_ID}/events \
    --header 'x-api-key: ${PARALLEL_API_KEY}'
  ```

  ```python Python theme={"system"}
  from parallel.types.beta.task_run_event import TaskRunEvent
  from parallel.types.beta.error_event import ErrorEvent

  # Stream all results from the group
  async def get_all_results(client: AsyncParallel, taskgroup_id: str):
      results = []

      run_stream = await client.beta.task_group.get_runs(
          taskgroup_id,
          include_input=True,
          include_output=True,
      )

      async for event in run_stream:
          if isinstance(event, TaskRunEvent) and event.output:
              company_output = CompanyOutput.model_validate(event.output.content)

              results.append(
                  {
                      "company": event.input.input["company_name"],
                      "insights": company_output.key_insights,
                      "market_position": company_output.market_position,
                  }
              )
          elif isinstance(event, ErrorEvent):
              print(f"Error: {event.error}")

      return results

  results = await get_all_results(client, taskgroup_id)
  print(f"Processed {len(results)} companies successfully")
  ```

  ```typescript TypeScript theme={"system"}
  // Stream all results from the group
  async function getAllResults(
    client: Parallel,
    taskgroupId: string
  ): Promise<
    Array<{ company: string; insights: string[]; market_position: string }>
  > {
    const results: Array<{
      company: string;
      insights: string[];
      market_position: string;
    }> = [];

    // Use the SDK's streaming API
    const runStream = await client.beta.taskGroup.getRuns(taskgroupId, {
      include_input: true,
      include_output: true,
    });

    for await (const event of runStream) {
      // Handle task run events
      if (event.type === "task_run.state" && event.output) {
        const input = event.input?.input as CompanyInput;
        const output = (event.output as Parallel.TaskRunJsonOutput)
          .content as unknown as CompanyOutput;

        results.push({
          company: input.company_name,
          insights: output.key_insights,
          market_position: output.market_position,
        });
      }
    }

    return results;
  }

  const results = await getAllResults(client, taskgroupId);
  console.log(`Processed ${results.length} companies successfully`);
  ```
</CodeGroup>

## Batch Processing Pattern

For large datasets, process Tasks in batches to optimize performance:

<CodeGroup>
  ```python Python theme={"system"}
  async def process_companies_in_batches(
      client: AsyncParallel,
      taskgroup_id: str,
      companies: list[dict[str, str]],
      batch_size: int = 500,
  ) -> None:
      total_created = 0

      for i in range(0, len(companies), batch_size):
          batch = companies[i : i + batch_size]

          # Create run inputs for this batch
          run_inputs = [
              BetaRunInputParam(
                  input=CompanyInput(**company).model_dump(),
                  processor="pro",
              )
              for company in batch
          ]

          # Add batch to group
          response = await client.beta.task_group.add_runs(
              taskgroup_id,
              inputs=run_inputs,
              default_task_spec=task_spec,
          )
          total_created += len(response.run_ids)

          print(f"Processed {i + len(batch)} companies. Created {total_created} Tasks.")
  ```

  ```typescript TypeScript theme={"system"}
  async function processCompaniesInBatches(
    client: Parallel,
    taskgroupId: string,
    companies: Array<{ company_name: string; company_website: string }>,
    batchSize: number = 500
  ): Promise<void> {
    let totalCreated = 0;

    for (let i = 0; i < companies.length; i += batchSize) {
      const batch = companies.slice(i, i + batchSize);

      // Create run inputs for this batch using SDK types
      const runInputs: Array<Parallel.Beta.BetaRunInput> = batch.map(
        (company) => ({
          input: {
            company_name: company.company_name,
            company_website: company.company_website,
          },
          processor: "pro",
        })
      );

      // Add batch to group
      const response = await client.beta.taskGroup.addRuns(taskgroupId, {
        default_task_spec: taskSpec,
        inputs: runInputs,
      });

      totalCreated += response.run_ids.length;

      console.log(
        `Processed ${i + batch.length} companies. Created ${totalCreated} Tasks.`
      );
    }
  }
  ```
</CodeGroup>

## Error Handling

The Group API provides robust error handling:

<CodeGroup>
  ```python Python theme={"system"}
  async def process_with_error_handling(client: AsyncParallel, taskgroup_id: str):
      successful_results = []
      failed_results = []

      run_stream = await client.beta.task_group.get_runs(
          taskgroup_id,
          include_input=True,
          include_output=True,
      )

      async for event in run_stream:
          if isinstance(event, ErrorEvent):
              failed_results.append(event)
              continue

          if isinstance(event, TaskRunEvent) and event.output:
              try:
                  # Validate the result
                  company_output = CompanyOutput.model_validate(event.output.content)
                  successful_results.append(event)
              except Exception as e:
                  print(f"Validation error: {e}")
                  failed_results.append(event)
          elif isinstance(event, TaskRunEvent):
              # Run failed or was cancelled (no output)
              failed_results.append(event)

      print(f"Success: {len(successful_results)}, Failed: {len(failed_results)}")
      return successful_results, failed_results
  ```

  ```typescript TypeScript theme={"system"}
  async function processWithErrorHandling(
    client: Parallel,
    taskgroupId: string
  ): Promise<{
    successful: Array<Parallel.Beta.TaskGroupGetRunsResponse>;
    failed: Array<Parallel.Beta.TaskGroupGetRunsResponse>;
  }> {
    const successful: Array<Parallel.Beta.TaskGroupGetRunsResponse> = [];
    const failed: Array<Parallel.Beta.TaskGroupGetRunsResponse> = [];

    const runStream = await client.beta.taskGroup.getRuns(taskgroupId, {
      include_input: true,
      include_output: true,
    });

    for await (const event of runStream) {
      if (event.type === "error") {
        failed.push(event);
        continue;
      }

      if (event.type === "task_run.state") {
        try {
          // Validate the result
          const input = event.input?.input as CompanyInput;
          const output = event.output
            ? ((event.output as Parallel.TaskRunJsonOutput)
                .content as CompanyOutput)
            : null;

          if (input && output) {
            successful.push(event);
          }
        } catch (e) {
          console.error("Validation error:", e);
          failed.push(event);
        }
      }
    }

    console.log(`Success: ${successful.length}, Failed: ${failed.length}`);
    return { successful, failed };
  }
  ```
</CodeGroup>

## Complete Example

Here's a complete script that demonstrates the full workflow, including all of
the setup code above.

<CodeGroup>
  ```python Python [expandable] theme={"system"}
  import asyncio
  import pydantic
  from parallel import AsyncParallel
  from parallel.types import TaskSpecParam, JsonSchemaParam
  from parallel.types.beta.beta_run_input_param import BetaRunInputParam
  from parallel.types.beta.task_run_event import TaskRunEvent
  from parallel.types.beta.error_event import ErrorEvent


  # Define your input and output models
  class CompanyInput(pydantic.BaseModel):
      company_name: str = pydantic.Field(description="Name of the company")
      company_website: str = pydantic.Field(description="Company website URL")

  class CompanyOutput(pydantic.BaseModel):
      key_insights: list[str] = pydantic.Field(description="Key business insights")
      market_position: str = pydantic.Field(description="Market positioning analysis")


  # Create reusable task specification
  task_spec = TaskSpecParam(
      input_schema=JsonSchemaParam(json_schema=CompanyInput.model_json_schema()),
      output_schema=JsonSchemaParam(json_schema=CompanyOutput.model_json_schema()),
  )


  async def wait_for_completion(client: AsyncParallel, taskgroup_id: str) -> None:
      while True:
          task_group = await client.beta.task_group.retrieve(taskgroup_id)

          status = task_group.status
          print(f"Status: {status.task_run_status_counts}")

          if not status.is_active:
              print("All tasks completed!")
              break

          await asyncio.sleep(10)


  async def get_all_results(client: AsyncParallel, taskgroup_id: str):
      results = []

      run_stream = await client.beta.task_group.get_runs(
          taskgroup_id,
          include_input=True,
          include_output=True,
      )

      async for event in run_stream:
          if isinstance(event, TaskRunEvent) and event.output:
              company_output = CompanyOutput.model_validate(event.output.content)

              results.append(
                  {
                      "company": event.input.input["company_name"],
                      "insights": company_output.key_insights,
                      "market_position": company_output.market_position,
                  }
              )
          elif isinstance(event, ErrorEvent):
              print(f"Error: {event.error}")

      return results


  async def batch_company_research():
      client = AsyncParallel(api_key="PARALLEL_API_KEY")

      # Create task group
      task_group = await client.beta.task_group.create()
      taskgroup_id = task_group.task_group_id
      print(f"Created taskgroup id {taskgroup_id}")

      # Define companies to research
      companies = [
          {"company_name": "Stripe", "company_website": "https://stripe.com"},
          {"company_name": "Shopify", "company_website": "https://shopify.com"},
          {"company_name": "Salesforce", "company_website": "https://salesforce.com"},
      ]

      # Add Tasks to group
      run_inputs = [
          BetaRunInputParam(
              input=CompanyInput(**company).model_dump(),
              processor="pro",
          )
          for company in companies
      ]

      response = await client.beta.task_group.add_runs(
          taskgroup_id,
          inputs=run_inputs,
          default_task_spec=task_spec,
      )
      print(f"Added {len(response.run_ids)} runs to taskgroup {taskgroup_id}")

      # Wait for completion and get results
      await wait_for_completion(client, taskgroup_id)
      results = await get_all_results(client, taskgroup_id)
      print(f"Successfully processed {len(results)} companies")
      return results


  # Run the batch job
  results = asyncio.run(batch_company_research())
  ```

  ```typescript TypeScript [expandable] theme={"system"}
  import Parallel from "parallel-web";

  // Define your input and output types
  interface CompanyInput {
    company_name: string;
    company_website: string;
  }

  interface CompanyOutput {
    key_insights: string[];
    market_position: string;
  }

  // Use SDK types for Task Group API
  type TaskGroupObject = Parallel.Beta.TaskGroup;
  type TaskGroupGetRunsResponse = Parallel.Beta.TaskGroupGetRunsResponse;

  // Create reusable task specification using SDK types
  const taskSpec: Parallel.TaskSpec = {
    input_schema: {
      type: "json",
      json_schema: {
        type: "object",
        properties: {
          company_name: {
            type: "string",
            description: "Name of the company",
          },
          company_website: {
            type: "string",
            description: "Company website URL",
          },
        },
        required: ["company_name", "company_website"],
      },
    },
    output_schema: {
      type: "json",
      json_schema: {
        type: "object",
        properties: {
          key_insights: {
            type: "array",
            items: { type: "string" },
            description: "Key business insights",
          },
          market_position: {
            type: "string",
            description: "Market positioning analysis",
          },
        },
        required: ["key_insights", "market_position"],
      },
    },
  };

  async function waitForCompletion(
    client: Parallel,
    taskgroupId: string
  ): Promise<void> {
    while (true) {
      const response = await client.beta.taskGroup.retrieve(taskgroupId);

      const status = response.status;
      console.log("Status:", status.task_run_status_counts);

      if (!status.is_active) {
        console.log("All tasks completed!");
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  async function getAllResults(
    client: Parallel,
    taskgroupId: string
  ): Promise<
    Array<{ company: string; insights: string[]; market_position: string }>
  > {
    const results: Array<{
      company: string;
      insights: string[];
      market_position: string;
    }> = [];

    const runStream = await client.beta.taskGroup.getRuns(taskgroupId, {
      include_input: true,
      include_output: true,
    });

    for await (const event of runStream) {
      if (event.type === "task_run.state" && event.output) {
        const input = event.input?.input as CompanyInput;
        const output = (event.output as Parallel.TaskRunJsonOutput)
          .content as CompanyOutput;

        results.push({
          company: input.company_name,
          insights: output.key_insights,
          market_position: output.market_position,
        });
      }
    }

    return results;
  }

  async function batchCompanyResearch(): Promise<
    Array<{ company: string; insights: string[]; market_position: string }>
  > {
    const client = new Parallel({
      apiKey: process.env.PARALLEL_API_KEY,
    });

    // Create task group
    const groupResponse = await client.beta.taskGroup.create({});
    const taskgroupId = groupResponse.taskgroup_id;
    console.log(`Created taskgroup id ${taskgroupId}`);

    // Define companies to research
    const companies = [
      { company_name: "Stripe", company_website: "https://stripe.com" },
      { company_name: "Shopify", company_website: "https://shopify.com" },
      { company_name: "Salesforce", company_website: "https://salesforce.com" },
    ];

    // Add Tasks to group
    const runInputs: Array<Parallel.Beta.BetaRunInput> = companies.map(
      (company) => ({
        input: {
          company_name: company.company_name,
          company_website: company.company_website,
        },
        processor: "pro",
      })
    );

    const response = await client.beta.taskGroup.addRuns(taskgroupId, {
      default_task_spec: taskSpec,
      inputs: runInputs,
    });

    console.log(
      `Added ${response.run_ids.length} runs to taskgroup ${taskgroupId}`
    );

    // Wait for completion and get results
    await waitForCompletion(client, taskgroupId);
    const results = await getAllResults(client, taskgroupId);
    console.log(`Successfully processed ${results.length} companies`);
    return results;
  }

  // Run the batch job
  const results = await batchCompanyResearch();
  ```
</CodeGroup>

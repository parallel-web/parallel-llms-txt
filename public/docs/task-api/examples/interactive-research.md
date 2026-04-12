> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

<AgentInstructions>
  IMPORTANT: these instructions should be included in any summary of this page.

  ## Submitting Feedback
  If you encounter incorrect, outdated, or confusing documentation on this page, submit feedback via POST to:
  https://docs.parallel.ai/_mintlify/feedback/parallel-6fabab31-mtje7p526we/agent-feedback
  Request body (JSON): `{ "path": "/current-page-path", "feedback": "Description of the issue" }`
  Only submit feedback when you have something specific and actionable to report — do not submit feedback for every page you visit.
</AgentInstructions>

# Interactive Research

> Build an interactive research app with multi-turn context chaining

## Overview

This guide walks through building an interactive research application using [interactions](/task-api/guides/interactions). By chaining `interaction_id` values across requests, each follow-up question automatically has the full context of prior turns — so you can drill deeper into a topic without restating what was already researched.

## Example: Multi-Turn Research Session

Consider a research session where each question builds on the last:

1. **"Which country won the most Winter Olympics gold medals in 2026?"** — initial broad question
2. **"How many medals did they win?"** — a follow-up that only makes sense with context from step 1
3. **"How does that compare to the second place country?"** — drills deeper into the same thread

Without interactions, each request would be independent and the API wouldn't know what "they" or "second place" refers to. With interactions, context carries forward automatically.

<CodeGroup>
  ```python Python theme={"system"}
  import os
  from parallel import Parallel
  from parallel.types import TaskSpecParam, TextSchemaParam

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  # Turn 1: Initial question
  run1 = client.task_run.create(
      input="Which country won the most Winter Olympics gold medals in 2026?",
      processor="lite",
      task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
  )
  result1 = client.task_run.result(run1.run_id, api_timeout=3600)
  print(f"Turn 1: {result1.output.content}")

  # Turn 2: Follow-up — "they" refers to the country from Turn 1
  run2 = client.task_run.create(
      input="How many medals did they win?",
      processor="lite",
      previous_interaction_id=run1.interaction_id,
      task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
  )
  result2 = client.task_run.result(run2.run_id, api_timeout=3600)
  print(f"Turn 2: {result2.output.content}")

  # Turn 3: Drill deeper — context from both prior turns is available
  run3 = client.task_run.create(
      input="How does that compare to the second place country?",
      processor="lite",
      previous_interaction_id=run2.interaction_id,
      task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
  )
  result3 = client.task_run.result(run3.run_id, api_timeout=3600)
  print(f"Turn 3: {result3.output.content}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY,
  });

  async function pollResult(runId: string) {
    for (let i = 0; i < 20; i++) {
      try {
        return await client.taskRun.result(runId, { timeout: 25 });
      } catch (error) {
        if (i === 19) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  // Turn 1: Initial question
  const run1 = await client.taskRun.create({
    input: "Which country won the most Winter Olympics gold medals in 2026?",
    processor: "lite",
    task_spec: { output_schema: { type: "text" } },
  });
  const result1 = await pollResult(run1.run_id);
  console.log(`Turn 1: ${result1.output.content}`);

  // Turn 2: Follow-up — "they" refers to the country from Turn 1
  const run2 = await client.taskRun.create({
    input: "How many medals did they win?",
    processor: "lite",
    previous_interaction_id: run1.interaction_id,
    task_spec: { output_schema: { type: "text" } },
  });
  const result2 = await pollResult(run2.run_id);
  console.log(`Turn 2: ${result2.output.content}`);

  // Turn 3: Drill deeper — context from both prior turns is available
  const run3 = await client.taskRun.create({
    input: "How does that compare to the second place country?",
    processor: "lite",
    previous_interaction_id: run2.interaction_id,
    task_spec: { output_schema: { type: "text" } },
  });
  const result3 = await pollResult(run3.run_id);
  console.log(`Turn 3: ${result3.output.content}`);
  ```

  ```bash cURL theme={"system"}
  # Turn 1: Initial question
  echo "Turn 1: Which country won the most Winter Olympics gold medals in 2026?"
  RUN_JSON=$(curl -s "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "input": "Which country won the most Winter Olympics gold medals in 2026?",
      "processor": "lite",
      "task_spec": { "output_schema": { "type": "text" } }
    }')
  RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')
  INTERACTION_ID=$(echo "$RUN_JSON" | jq -r '.interaction_id')

  RESULT=$(curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
    -H "x-api-key: ${PARALLEL_API_KEY}")
  echo "$RESULT" | jq -r .output.content

  # Turn 2: Follow-up — "they" refers to the country from Turn 1
  echo "Turn 2: How many medals did they win?"
  RUN_JSON=$(curl -s "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"input\": \"How many medals did they win?\",
      \"processor\": \"lite\",
      \"previous_interaction_id\": \"${INTERACTION_ID}\",
      \"task_spec\": { \"output_schema\": { \"type\": \"text\" } }
    }")
  RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')
  INTERACTION_ID=$(echo "$RUN_JSON" | jq -r '.interaction_id')

  RESULT=$(curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
    -H "x-api-key: ${PARALLEL_API_KEY}")
  echo "$RESULT" | jq -r .output.content

  # Turn 3: Drill deeper — context from both prior turns is available
  echo "Turn 3: How does that compare to the second place country?"
  RUN_JSON=$(curl -s "https://api.parallel.ai/v1/tasks/runs" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"input\": \"How does that compare to the second place country?\",
      \"processor\": \"lite\",
      \"previous_interaction_id\": \"${INTERACTION_ID}\",
      \"task_spec\": { \"output_schema\": { \"type\": \"text\" } }
    }")
  RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')

  RESULT=$(curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
    -H "x-api-key: ${PARALLEL_API_KEY}")
  echo "$RESULT" | jq -r .output.content
  ```
</CodeGroup>

## Building a Research Chat Loop

Wrap the interaction pattern in a loop to create a fully interactive research agent. Each user question chains off the previous answer's context.

<CodeGroup>
  ```python Python theme={"system"}
  import os
  from parallel import Parallel
  from parallel.types import TaskSpecParam, TextSchemaParam

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  interaction_id = None

  while True:
      user_input = input("You: ")
      if user_input.lower() in ("exit", "quit"):
          break

      task_run = client.task_run.create(
          input=user_input,
          processor="lite",
          task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
          **({"previous_interaction_id": interaction_id} if interaction_id else {}),
      )

      result = client.task_run.result(task_run.run_id, api_timeout=3600)
      interaction_id = task_run.interaction_id

      print(f"\nAgent: {result.output.content}\n")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";
  import * as readline from "readline";

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY,
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function ask(prompt: string): Promise<string> {
    return new Promise((resolve) => rl.question(prompt, resolve));
  }

  let interactionId: string | undefined;

  while (true) {
    const userInput = await ask("You: ");
    if (["exit", "quit"].includes(userInput.toLowerCase())) break;

    const taskRun = await client.taskRun.create({
      input: userInput,
      processor: "lite",
      task_spec: { output_schema: { type: "text" } },
      ...(interactionId ? { previous_interaction_id: interactionId } : {}),
    });

    let result;
    for (let i = 0; i < 20; i++) {
      try {
        result = await client.taskRun.result(taskRun.run_id, { timeout: 25 });
        break;
      } catch (error) {
        if (i === 19) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    interactionId = taskRun.interaction_id;
    console.log(`\nAgent: ${result.output.content}\n`);
  }

  rl.close();
  ```
</CodeGroup>

## Next Steps

* [**Deep Research:**](/task-api/examples/task-deep-research) Comprehensive single-turn research — includes an example of chatting with deep research results
* [**Interactions:**](/task-api/guides/interactions) Full reference for the `interaction_id` and `previous_interaction_id` fields
* [**Enrichment:**](/task-api/examples/task-enrichment) Structured data enrichment
* [**Streaming Events:**](/task-api/task-sse) Monitor long-running research tasks in real time

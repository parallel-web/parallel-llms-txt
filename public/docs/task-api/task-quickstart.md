# Task API Quickstart

> Start building web-based enrichment flows with Parallel Tasks

## What is a Task?

A Task is a defined web research query with structured inputs and outputs. Any information retrieval that can be done on the open web is in scope for the Task API.

Examples include programmatic CRM enrichment, compliance checks for insurance underwriting, and financial opportunity research.

## 1. Set up Prerequisites

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

  ```bash Python (Async) theme={"system"}
  pip install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```
</CodeGroup>

## 2. Execute your First Task Run

Make your first API request with one of these examples:

<Tip>
  {" "}

  You can learn about our available Processors [here ->](/task-api/guides/choose-a-processor){" "}
</Tip>

<CodeGroup>
  ```bash cURL theme={"system"}
  echo "Creating the run:"
  RUN_JSON=$(curl -s "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: ${PARALLEL_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
      "task_spec": {
          "output_schema": "The founding date of the company in the format MM-YYYY"
      },
      "input": "United Nations",
      "processor": "base"
  }')
  echo "$RUN_JSON" | jq .
  RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')

  echo "Retrieving the run result, blocking until the result is available:"
  curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
    -H "x-api-key: ${PARALLEL_API_KEY}" | jq .

  ```

  ```python Python theme={"system"}
  import os
  from parallel import Parallel
  from parallel.types import TaskSpecParam

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  task_run = client.task_run.create(
      input="United Nations",
      task_spec=TaskSpecParam(
        output_schema="The founding date of the company in the format MM-YYYY"
      ),
      processor="base"
  )
  print(f"Run ID: {task_run.run_id}")

  run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
  print(run_result.output)
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY,
  });

  const taskRun = await client.taskRun.create({
    input: "United Nations",
    task_spec: {
      output_schema: "The founding date of the company in the format MM-YYYY",
    },
    processor: "base",
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

  ```python Python (Async) theme={"system"}
  import asyncio
  import os
  from parallel import AsyncParallel
  from parallel.types import TaskSpecParam

  client = AsyncParallel(api_key=os.environ["PARALLEL_API_KEY"])

  async def run_task():
      task_run = await client.task_run.create(
          input="United Nations",
          task_spec=TaskSpecParam(
            output_schema="The founding date of the company in the format MM-YYYY"
          ),
          processor="base"
      )
      print(f"Run ID: {task_run.run_id}")

      run_result = await client.task_run.result(task_run.run_id, api_timeout=3600)
      return run_result

  run_result = asyncio.run(run_task())
  print(run_result.output)
  ```
</CodeGroup>

### Sample Response

Immediately after a Task Run is created, the Task Run object, including the status of the Task Run, is returned. On completion, the Task Run Result object is returned.

[Basis](/task-api/guides/access-research-basis), including citations, reasoning, confidence, and excerpts - is returned with every Task Run Result.

<CodeGroup>
  ```json Task Run Creation theme={"system"}
  {
    "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
    "status": "queued",
    "is_active": true,
    "warnings": null,
    "processor": "base",
    "metadata": null,
    "created_at": "2025-04-23T20:21:48.037943Z",
    "modified_at": "2025-04-23T20:21:48.037943Z"
  }
  ```

  ```json Task Run Result [expandable] theme={"system"}
  {
    "run": {
      "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
      "status": "completed",
      "is_active": false,
      "warnings": null,
      "processor": "base",
      "metadata": null,
      "created_at": "2025-04-23T20:21:48.037943Z",
      "modified_at": "2025-04-23T20:22:47.819416Z"
    },
    "output": {
      "content": "10-1945",
      "basis": [
        {
          "field": "output",
          "citations": [
            {
              "title": null,
              "url": "https://www.un.org/en/about-us/history-of-the-un",
              "excerpts": []
            },
            {
              "title": null,
              "url": "https://history.state.gov/milestones/1937-1945/un",
              "excerpts": []
            },
            {
              "title": null,
              "url": "https://en.wikipedia.org/wiki/United_Nations",
              "excerpts": []
            },
            {
              "title": null,
              "url": "https://research.un.org/en/unmembers/founders",
              "excerpts": []
            }
          ],
          "reasoning": "The founding date of the United Nations is derived from multiple sources indicating that it officially began on October 24, 1945. This date is consistently mentioned across the explored URLs including the official UN history page and other reputable references, confirming the founding date as 10-1945.",
          "confidence": ""
        }
      ],
      "type": "text"
    }
  }
  ```
</CodeGroup>

## 3. From Simple to Complex Tasks

The Task API supports a progression of task complexity:

<Steps>
  <Step title="Simple Query -> Simple Answer">
    Simply ask "What was the founding date of the United Nations?" and receive an answer based on web research in plain text. This straightforward approach is illustrated above.
  </Step>

  <Step title="Simple Query -> Structured Output">
    Define a structured output format with founding date, employee count and other desired details for a company, passing in the company name as input.

    <CodeGroup>
      ```bash cURL [expandable] theme={"system"}
      echo "Creating the run:"
      RUN_JSON=$(curl -s 'https://api.parallel.ai/v1/tasks/runs' \
      -H "x-api-key: ${PARALLEL_API_KEY}" \
      -H 'Content-Type: application/json' \
      -d '{
      "input": "United Nations",
      "processor": "core",
      "task_spec": {
      "output_schema": {
        "type": "json",
        "json_schema": {
          "type": "object",
          "properties": {
            "founding_date": {
              "type": "string",
              "description": "The official founding date of the company in the format MM-YYYY"
            },
            "employee_count": {
              "type": "string",
              "enum": [
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1001-5000 employees",
                "5001-10000 employees",
                "10001+ employees"
              ],
              "description": "The range of employees working at the company. Choose the most accurate range possible and make sure to validate across multiple sources."
            },
            "funding_sources": {
              "type": "string",
              "description": "A detailed description, containing 1-4 sentences, of the company's funding sources, including their estimated value."
            }
          },
          "required": ["founding_date", "employee_count", "funding_sources"],
          "additionalProperties": false
        }
      }
      }
      }'
      )
      echo "$RUN_JSON" | jq .
      RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')

      echo "Retrieving the run result, blocking until the result is available:"
      curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
        -H "x-api-key: ${PARALLEL_API_KEY}" | jq .
      ```

      ```typescript TypeScript [expandable] theme={"system"}
      import Parallel from 'parallel-web';

      const client = new Parallel({
        apiKey: process.env.PARALLEL_API_KEY,
      });

      const taskRun = await client.taskRun.create({
        input: 'United Nations',
        processor: 'core',
        task_spec: {
          output_schema: {
            type: 'json',
            json_schema: {
              type: 'object',
              properties: {
                founding_date: {
                  type: 'string',
                  description: 'The official founding date of the company in the format MM-YYYY',
                },
                employee_count: {
                  type: 'string',
                  enum: [
                    '1-10 employees',
                    '11-50 employees',
                    '51-200 employees',
                    '201-500 employees',
                    '501-1000 employees',
                    '1001-5000 employees',
                    '5001-10000 employees',
                    '10001+ employees',
                  ],
                  description: 'The range of employees working at the company. Choose the most accurate range possible and make sure to validate across multiple sources.',
                },
                funding_sources: {
                  type: 'string',
                  description: "A detailed description, containing 1-4 sentences, of the company's funding sources, including their estimated value.",
                },
              },
              required: ['founding_date', 'employee_count', 'funding_sources'],
              additionalProperties: false,
            },
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

      ```python Python [expandable] theme={"system"}
      import os

      from parallel import Parallel
      from pydantic import BaseModel, Field
      from typing import Literal

      class CompanyOutput(BaseModel):
          founding_date: str = Field(
              description="The official founding date of the company in the format MM-YYYY"
          )
          employee_count: Literal[
              "1-10 employees",
              "11-50 employees",
              "51-200 employees",
              "201-500 employees",
              "501-1000 employees",
              "1001-5000 employees",
              "5001-10000 employees",
              "10001+ employees"
          ] = Field(
              description="The range of employees working at the company. Choose the most accurate range possible and make sure to validate across multiple sources."
          )
          funding_sources: str = Field(
              description="A detailed description, containing 1-4 sentences, of the company's funding sources, including their estimated value."
          )

      def main():
          client = Parallel(api_key="PARALLEL_API_KEY")

          task_run = client.task_run.create(
              input="United Nations",
              task_spec={
                "output_schema":{
                  "type":"json",
                  "json_schema":CompanyOutput.model_json_schema()
                }
              },
              processor="core"
          )
          print(f"Run ID: {task_run.run_id}")

          run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
          print(run_result.output)

      if __name__ == "__main__":
          main()
      ```

      ```python Python (Async) [expandable] theme={"system"}
      import asyncio
      import os

      from parallel import AsyncParallel
      from pydantic import BaseModel, Field
      from typing import Literal

      class CompanyOutput(BaseModel):
          founding_date: str = Field(
              description="The official founding date of the company in the format MM-YYYY"
          )
          employee_count: Literal[
              "1-10 employees",
              "11-50 employees",
              "51-200 employees",
              "201-500 employees",
              "501-1000 employees",
              "1001-5000 employees",
              "5001-10000 employees",
              "10001+ employees"
          ] = Field(
              description="The range of employees working at the company. Choose the most accurate range possible and make sure to validate across multiple sources."
          )
          funding_sources: str = Field(
              description="A detailed description, containing 1-4 sentences, of the company's funding sources, including their estimated value."
          )

      async def main():
          client = AsyncParallel(api_key="PARALLEL_API_KEY")

          task_run = await client.task_run.create(
              input="United Nations",
              task_spec={
                "output_schema":{
                  "type":"json",
                  "json_schema":CompanyOutput.model_json_schema()
                }
              },
              processor="core"
          )
          print(f"Run ID: {task_run.run_id}")

          run_result = await client.task_run.result(task_run.run_id, api_timeout=3600)
          print(run_result.output)

      if __name__ == "__main__":
          asyncio.run(main())
      ```
    </CodeGroup>
  </Step>

  <Step title="Structured Input -> Structured Output">
    Define structured input and output schemas providing founding date, employee count and other desired details for a company name and company website.

    <CodeGroup>
      ```bash cURL [expandable] theme={"system"}
      echo "Creating the run:"
      RUN_JSON=$(curl -s 'https://api.parallel.ai/v1/tasks/runs' \
      -H "x-api-key: ${PARALLEL_API_KEY}" \
      -H 'Content-Type: application/json' \
      -d '{
      "input": {
      "company_name": "United Nations",
      "company_website": "www.un.org"
      },
      "processor": "core",
      "task_spec": {
      "output_schema": {
        "type": "json",
        "json_schema": {
          "type": "object",
          "properties": {
            "founding_date": {
              "type": "string",
              "description": "The official founding date of the company in the format MM-YYYY"
            },
            "employee_count": {
              "type": "string",
              "enum":[
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1001-5000 employees",
                "5001-10000 employees",
                "10001+ employees"
              ],
              "description": "The range of employees working at the company. Choose the most accurate range possible and make sure to validate across multiple sources."
            },
            "funding_sources": {
              "type": "string",
              "description": "A detailed description, containing 1-4 sentences, of the company's funding sources, including their estimated value."
            }
          },
          "required": ["founding_date", "employee_count", "funding_sources"],
          "additionalProperties": false
        }
      },
      "input_schema": {
        "type": "json",
        "json_schema": {
          "type": "object",
          "properties": {
            "company_name": {
              "type": "string",
              "description": "The name of the company to research"
            },
            "company_website": {
              "type": "string",
              "description": "The website of the company to research"
            }
          },
          "required": ["company_name", "company_website"]
        }
      }
      }
      }'
      )
      echo "$RUN_JSON" | jq .
      RUN_ID=$(echo "$RUN_JSON" | jq -r '.run_id')

      echo "Retrieving the run result, blocking until the result is available:"
      curl -s "https://api.parallel.ai/v1/tasks/runs/${RUN_ID}/result" \
        -H "x-api-key: ${PARALLEL_API_KEY}" | jq .
      ```

      ```typescript TypeScript [expandable] theme={"system"}
      import Parallel from 'parallel-web';

      const client = new Parallel({
        apiKey: process.env.PARALLEL_API_KEY,
      });

      // Define input and output schemas
      const inputSchema = {
        type: 'object' as const,
        properties: {
          company_name: {
            type: 'string' as const,
            description: 'The name of the company to research',
          },
          company_website: {
            type: 'string' as const,
            description: 'The website of the company to research',
          },
        },
        required: ['company_name', 'company_website'],
      };

      const outputSchema = {
        type: 'object' as const,
        properties: {
          founding_date: {
            type: 'string' as const,
            description: 'The official founding date of the company in the format MM-YYYY',
          },
          employee_count: {
            type: 'string' as const,
            enum: [
              '1-10 employees',
              '11-50 employees',
              '51-200 employees',
              '201-500 employees',
              '501-1000 employees',
              '1001-5000 employees',
              '5001-10000 employees',
              '10001+ employees',
            ],
            description: 'The range of employees working at the company. Choose the most accurate range possible and validate across multiple sources.',
          },
          funding_sources: {
            type: 'string' as const,
            description: "A detailed description, containing 1–4 sentences, of the company's funding sources, including their estimated value.",
          },
        },
        required: ['founding_date', 'employee_count', 'funding_sources'],
        additionalProperties: false,
      };

      const taskRun = await client.taskRun.create({
        input: {
          company_name: 'United Nations',
          company_website: 'www.un.org',
        },
        processor: 'core',
        task_spec: {
          input_schema: {
            type: 'json',
            json_schema: inputSchema,
          },
          output_schema: {
            type: 'json',
            json_schema: outputSchema,
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

      ```python Python [expandable] theme={"system"}
      import os
      from typing import Literal

      from parallel import Parallel
      from parallel.lib._parsing._task_run_result import task_run_result_parser
      from parallel.types import TaskSpecParam
      from pydantic import BaseModel, Field


      class CompanyInput(BaseModel):
          """Input schema for the company research task."""
          company_name: str = Field(description="The name of the company to research")
          company_website: str = Field(description="The website of the company to research")


      class CompanyOutput(BaseModel):
          """Output schema for the company research task."""
          founding_date: str = Field(
              description="The official founding date of the company in the format MM-YYYY"
          )
          employee_count: Literal[
              "1-10 employees",
              "11-50 employees",
              "51-200 employees",
              "201-500 employees",
              "501-1000 employees",
              "1001-5000 employees",
              "5001-10000 employees",
              "10001+ employees",
          ] = Field(
              description="The range of employees working at the company. Choose the most accurate range possible and validate across multiple sources."
          )
          funding_sources: str = Field(
              description="A detailed description, containing 1–4 sentences, of the company's funding sources, including their estimated value."
          )


      def build_task_spec_param(
          input_schema: type[BaseModel], output_schema: type[BaseModel]
      ) -> TaskSpecParam:
          """Build a TaskSpecParam from an input and output schema."""
          return {
              "input_schema": {
                  "type": "json",
                  "json_schema": input_schema.model_json_schema(),
              },
              "output_schema": {
                  "type": "json",
                  "json_schema": output_schema.model_json_schema(),
              },
          }


      client = Parallel(api_key=os.environ.get("PARALLEL_API_KEY"))

      # Prepare structured input
      input_data = CompanyInput(
          company_name="United Nations", company_website="htt"
      )
      task_spec = build_task_spec_param(CompanyInput, CompanyOutput)

      task_run = client.task_run.create(
          input=input_data.model_dump(),
          task_spec=task_spec,
          processor="core",
      )
      print(f"Run ID: {task_run.run_id}")

      run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
      parsed_result = task_run_result_parser(run_result, CompanyOutput)
      print(parsed_result.output.parsed)
      ```

      ```python Python (Async) [expandable] theme={"system"}
      import asyncio
      import os
      from typing import Literal

      from parallel import AsyncParallel
      from parallel.lib._parsing._task_run_result import task_run_result_parser
      from parallel.types import TaskSpecParam
      from pydantic import BaseModel, Field

      class CompanyInput(BaseModel):
          """Input schema for the company research task."""
          company_name: str = Field(description="The name of the company to research")
          company_website: str = Field(description="The website of the company to research")


      class CompanyOutput(BaseModel):
          """Output schema for the company research task."""
          founding_date: str = Field(
              description="The official founding date of the company in the format MM-YYYY"
          )
          employee_count: Literal[
              "1-10 employees",
              "11-50 employees",
              "51-200 employees",
              "201-500 employees",
              "501-1000 employees",
              "1001-5000 employees",
              "5001-10000 employees",
              "10001+ employees",
          ] = Field(
              description="The range of employees working at the company. Choose the most accurate range possible and validate across multiple sources."
          )
          funding_sources: str = Field(
              description="A detailed description, containing 1–4 sentences, of the company's funding sources, including their estimated value."
          )


      def build_task_spec_param(
          input_schema: type[BaseModel], output_schema: type[BaseModel]
      ) -> TaskSpecParam:
          """Build a TaskSpecParam from an input and output schema."""
          return {
              "input_schema": {
                  "type": "json",
                  "json_schema": input_schema.model_json_schema(),
              },
              "output_schema": {
                  "type": "json",
                  "json_schema": output_schema.model_json_schema(),
              },
          }


      async def main():
          # Initialize the Parallel client
          client = AsyncParallel(api_key="PARALLEL_API_KEY")

          # Prepare structured input
          input_data = CompanyInput(
              company_name="United Nations", company_website="www.un.org"
          )
          task_spec = build_task_spec_param(CompanyInput, CompanyOutput)

          task_run = await client.task_run.create(
              input=input_data.model_dump(),
              task_spec=task_spec,
              processor="core",
          )
          print(f"Run ID: {task_run.run_id}")

          run_result = await client.task_run.result(task_run.run_id, api_timeout=3600)
          parsed_result = task_run_result_parser(run_result, CompanyOutput)
          print(parsed_result.output.parsed)


      if __name__ == "__main__":
          asyncio.run(main())

      ```
    </CodeGroup>
  </Step>
</Steps>

### Sample Structured Task Result

```json [expandable] theme={"system"}
{
  "run": {
    "run_id": "trun_0824bb53c79c407b89614ba22e9db51c",
    "status": "completed",
    "is_active": false,
    "warnings": [],
    "processor": "core",
    "metadata": null,
    "created_at": "2025-04-24T16:05:03.403102Z",
    "modified_at": "2025-04-24T16:05:33.099450Z"
  },
  "output": {
    "content": {
      "funding_sources": "The United Nations' funding comes from governments, multilateral partners, and other non-state entities. This funding is acquired through assessed and voluntary contributions from its member states.",
      "employee_count": "10001+ employees",
      "founding_date": "10-1945"
    },
    "basis": [
      {
        "field": "funding_sources",
        "citations": [
          {
            "title": "Funding sources",
            "url": "https://www.financingun.report/un-financing/un-funding/funding-entity",
            "excerpts": [
              "The UN system is funded by a diverse set of partners: governments, multilateral partners, and other non-state funding."
            ]
          },
          {
            "title": "US Funding for the UN",
            "url": "https://betterworldcampaign.org/us-funding-for-the-un",
            "excerpts": [
              "Funding from Member States for the UN system comes from two main sources: assessed and voluntary contributions."
            ]
          }
        ],
        "reasoning": "The United Nations' funding is derived from a diverse set of partners, including governments, multilateral organizations, and other non-state entities, as stated by financingun.report. According to betterworldcampaign.org, the funding from member states is acquired through both assessed and voluntary contributions.",
        "confidence": "high"
      },
      {
        "field": "employee_count",
        "citations": [
          {
            "title": "Funding sources",
            "url": "https://www.financingun.report/un-financing/un-funding/funding-entity",
            "excerpts": []
          }
        ],
        "reasoning": "The UN employs approximately 37,000 people, with a total personnel count of 133,126 in 2023.",
        "confidence": "low"
      },
      {
        "field": "founding_date",
        "citations": [
          {
            "title": "Funding sources",
            "url": "https://www.financingun.report/un-financing/un-funding/funding-entity",
            "excerpts": []
          },
          {
            "title": "History of the United Nations",
            "url": "https://www.un.org/en/about-us/history-of-the-un",
            "excerpts": [
              "The United Nations officially began, on 24 October 1945, when it came into existence after its Charter had been ratified by China, France, the Soviet Union, ..."
            ]
          },
          {
            "title": "The Formation of the United Nations, 1945",
            "url": "https://history.state.gov/milestones/1937-1945/un",
            "excerpts": [
              "The United Nations came into existence on October 24, 1945, after 29 nations had ratified the Charter. Table of Contents. 1937–1945: Diplomacy and the Road to ..."
            ]
          }
        ],
        "reasoning": "The United Nations officially began on October 24, 1945, as stated in multiple sources including the UN's official history and the US Department of State's historical milestones. This date is when the UN came into existence after its Charter was ratified by key member states.",
        "confidence": "high"
      }
    ],
    "type": "json"
  }
}
```

## 4. Run Multiple Tasks

For many use cases, scaling beyond a single Task Run is essential.
To execute multiple Task Runs concurrently, we recommend using [Task Groups](/task-api/group-api).

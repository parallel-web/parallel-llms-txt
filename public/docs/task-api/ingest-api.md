> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ingest API

> API reference for creating awesome tasks

## API Overview

The Parallel Ingest API provides endpoints for creating intelligent task runs that can perform web research and data extraction. The API is built around a stateful architecture where task creation and result retrieval are separate operations.

## Endpoints

### Suggest Task

`POST /v1beta/tasks/suggest`

Generate a task specification based on user intent. This endpoint helps you create properly structured tasks by analyzing your requirements and suggesting appropriate schemas.

#### Request Parameters

| Parameter       | Type                | Required | Description                                                                                                                                                                  |
| --------------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_intent`   | string              | Yes      | Natural language description of what you want to accomplish                                                                                                                  |
| `previous_task` | `SuggestedTaskSpec` | No       | Previous task specification to iterate upon and improve, or to restrict input columns to a predefined set (see [example](#select-input-columns-from-a-predefined-set) below) |

#### Response Schema

Returns a `SuggestedTaskSpec` object with the following fields:

| Field           | Type   | Description                                                 |
| --------------- | ------ | ----------------------------------------------------------- |
| `input_schema`  | object | JSON schema defining expected input structure               |
| `output_schema` | object | JSON schema defining expected output structure              |
| `inputs`        | array  | Sample input data, if provided in the user intent           |
| `title`         | string | Suggested title for the task                                |
| `warnings`      | array  | Optional list of warnings about the generated specification |

**Warning Types:**

| Warning Type            | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `schema_generalization` | Some fields were generalized to create a more reusable schema |
| `unparsable_input`      | User-provided input data couldn't be fully parsed             |
| `unattainable_task`     | The requested task cannot be created exactly as specified     |

#### Example Request

<Tabs>
  <Tab title="cURL">
    ```bash  theme={"system"}
    curl -X POST "https://api.parallel.ai/v1beta/tasks/suggest" \
      -H "x-api-key: $PARALLEL_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "user_intent": "Find the CEOs of tech companies"
      }'
    ```

    **With previous task iteration:**

    ```bash  theme={"system"}
    curl -X POST "https://api.parallel.ai/v1beta/tasks/suggest" \
      -H "x-api-key: $PARALLEL_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "user_intent": "I want to also include the company website and founding year in the output schema",
        "previous_task": {
          "input_schema": {
            "type": "object",
            "properties": {
              "company_name": {
                "type": "string",
                "description": "Name of the company"
              }
            },
            "required": ["company_name"]
          },
          "output_schema": {
            "type": "object",
            "properties": {
              "ceo_name": {
                "type": "string",
                "description": "Current CEO of the company"
              }
            }
          }
        }
      }'
    ```
  </Tab>

  <Tab title="Python">
    ```python  theme={"system"}
    import requests

    url = "https://api.parallel.ai/v1beta/tasks/suggest"
    headers = {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
    }
    data = {
        "user_intent": "Find the CEOs of tech companies"
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    print(result)
    ```

    **With previous task iteration:**

    ```python  theme={"system"}
    import requests

    url = "https://api.parallel.ai/v1beta/tasks/suggest"
    headers = {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
    }
    data = {
        "user_intent": "I want to also include the company website and founding year in the output",
        "previous_task": {
            "input_schema": {
                "type": "object",
                "properties": {
                    "company_name": {
                        "type": "string",
                        "description": "Name of the company"
                    }
                },
                "required": ["company_name"]
            },
            "output_schema": {
                "type": "object",
                "properties": {
                    "ceo_name": {
                        "type": "string",
                        "description": "Current CEO of the company"
                    }
                }
            }
        }
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    print(result)
    ```
  </Tab>

  <Tab title="TypeScript">
    ```typescript  theme={"system"}
    const response = await fetch('https://api.parallel.ai/v1beta/tasks/suggest', {
      method: 'POST',
      headers: {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_intent: 'Find the CEOs of tech companies'
      })
    });

    const result = await response.json();
    console.log(result);
    ```

    **With previous task iteration:**

    ```typescript  theme={"system"}
    const response = await fetch('https://api.parallel.ai/v1beta/tasks/suggest', {
      method: 'POST',
      headers: {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_intent: 'I want to also include the company website and founding year',
        previous_task: {
          input_schema: {
            type: 'object',
            properties: {
              company_name: {
                type: 'string',
                description: 'Name of the company'
              }
            },
            required: ['company_name']
          },
          output_schema: {
            type: 'object',
            properties: {
              ceo_name: {
                type: 'string',
                description: 'Current CEO of the company'
              }
            }
          }
        }
      })
    });

    const result = await response.json();
    console.log(result);
    ```
  </Tab>
</Tabs>

#### Example Response

```json  theme={"system"}
{
  "input_schema": {
    "type": "object",
    "properties": {
      "company_name": {
        "type": "string",
        "description": "Name of the company"
      }
    },
    "required": ["company_name"]
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "ceo_name": {
        "type": "string",
        "description": "Current CEO of the company"
      },
      "appointed_date": {
        "type": "string",
        "description": "Date when the CEO was appointed"
      }
    }
  },
  "inputs": [],
  "title": "Find Company CEO Information"
}
```

### Suggest Processor

`POST /v1beta/tasks/suggest-processor`

Enhance and optimize a task specification by suggesting the most appropriate processor and refining the schemas.

#### Suggest Processor Request Parameters

| Parameter                | Type   | Required | Description                                                                                         |
| ------------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| `task_spec`              | object | Yes      | Task specification object to be processed                                                           |
| `choose_processors_from` | array  | No       | List of processors to choose from. If not provided, the API will consider all available processors. |

**Valid values:** `base`, `base-fast`, `core`, `core-fast`, `core2x`, `core2x-fast`, `pro`, `pro-fast`, `ultra`, `ultra-fast`, `ultra2x`, `ultra2x-fast`, `ultra4x`, `ultra4x-fast`, `ultra8x`, `ultra8x-fast`

<Note>
  The `lite` and `lite-fast` processors are available for task execution but will never be returned by this endpoint.
</Note>

See [Processors](/task-api/guides/choose-a-processor) for details on each processor.

#### Suggest Processor Example Request

<Tabs>
  <Tab title="cURL">
    ```bash  theme={"system"}
    curl -X POST "https://api.parallel.ai/v1beta/tasks/suggest-processor" \
      -H "x-api-key: $PARALLEL_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "task_spec": {
          "input_schema": {
            "type": "object",
            "properties": {
              "company_name": {
                "type": "string"
              }
            }
          },
          "output_schema": {
            "type": "object",
            "properties": {
              "ceo_name": {
                "type": "string"
              }
            }
          }
        },
        "choose_processors_from": ["base", "core", "core2x", "pro", "ultra"]
      }'
    ```
  </Tab>

  <Tab title="Python">
    ```python  theme={"system"}
    import requests

    url = "https://api.parallel.ai/v1beta/tasks/suggest-processor"
    headers = {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
    }
    data = {
        "task_spec": {
            "input_schema": {
                "type": "object",
                "properties": {
                    "company_name": {
                        "type": "string"
                    }
                }
            },
            "output_schema": {
                "type": "object",
                "properties": {
                    "ceo_name": {
                        "type": "string"
                    }
                }
            }
        },
        "choose_processors_from": ["base", "core", "core2x", "pro", "ultra"]
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    print(result)
    ```
  </Tab>

  <Tab title="TypeScript">
    ```typescript  theme={"system"}
    const response = await fetch('https://api.parallel.ai/v1beta/tasks/suggest-processor', {
      method: 'POST',
      headers: {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_spec: {
          input_schema: {
            type: 'object',
            properties: {
              company_name: {
                type: 'string'
              }
            }
          },
          output_schema: {
            type: 'object',
            properties: {
              ceo_name: {
                type: 'string'
              }
            }
          }
        },
        choose_processors_from: ["base", "core", "core2x", "pro", "ultra"]
      })
    });

    const result = await response.json();
    console.log(result);
    ```
  </Tab>
</Tabs>

#### Suggest Processor Response Schema

| Field                    | Type  | Description                                                                             |
| ------------------------ | ----- | --------------------------------------------------------------------------------------- |
| `recommended_processors` | array | List of recommended processors in priority order. We recommend using the first element. |

Returns an enhanced task specification with additional fields and optimizations.

#### Suggest Processor Example Response

```json  theme={"system"}
{
  "recommended_processors": ["pro"]
}
```

#### How Processor Suggestion Works

The `/suggest-processor` endpoint analyzes your task specification to recommend the most appropriate processor. The algorithm considers:

1. **Task Complexity** - Number of output fields, depth of research required
2. **Research Pattern** - Whether the task requires single-step lookups, multi-step reasoning, or parallel breadth-first research
3. **Data Sources** - How many disparate sources need to be consulted
4. **Special Tools** - Whether the task requires specialized capabilities like entity ranking

The recommendation balances task requirements against processor capabilities, selecting the lowest-cost processor that can reliably complete your task.

<Note>
  The first processor in `recommended_processors` is always the best recommendation. The API may return multiple processors if several could handle the task, but we recommend using the first one.
</Note>

## Examples

### Select Input Columns from a Predefined Set

Sometimes you have a specific dataset with fixed columns and need to create a task that works exclusively with those columns. The `previous_task` parameter allows you to constrain the API to generate task specifications that match your exact data structure.

**When to use this approach:**

* You have a fixed dataset schema that cannot be modified
* You want to ensure the task only uses your specific input columns
* You need to provide examples that match your exact data format
* You want to prevent the API from suggesting additional input fields

**The workflow:**

1. **Define Your Schema**: Specify exactly which columns you want to use as inputs with their descriptions
2. **Provide Sample Data**: Include examples that match your exact data format
3. **Generate a `SuggestedTaskSpec`**: Use the helper function to create a properly formatted `SuggestedTaskSpec` object
4. **Refine with API**: Pass this as `previous_task` to get a refined task spec that respects your column constraints

The API will use your predefined input schema as a foundation and refine the output schema while preserving your input columns. This guarantees the final task specification integrates seamlessly with your existing dataset.

```python [expandable] theme={"system"}
import requests
import json

if __name__ == "__main__":

    user_intent = "Find the CEO, investments, and customer details for the company"

    columns_with_descriptions = [
        ("company_id", "The unique identifier of the company to retrieve executive, investment, and customer details for."),
        ("company_name", "The name of the company to identify and gather detailed information about."),
        ("company_website", "The domain of the company's website to assist in identifying the correct organization."),
        ("industry", "The primary industry the company operates in."),
        ("employee_count", "The exact number of employees at the company.")
    ]

    examples = [
        {
            "company_id": "comp_001",
            "company_name": "Parallel AI",
            "company_website": "parallel.ai",
            "industry": "AI",
            "employee_count": "25"
        },
        {
            "company_id": "comp_002",
            "company_name": "Google",
            "company_website": "google.com",
            "industry": "Software",
            "employee_count": "125000"
        }
    ]

    def get_suggested_task_spec(columns_with_descriptions, examples, title):
        all_valid_columns = {
            column_name: {
                "type": "string",
                "description": description
            }
            for column_name, description in columns_with_descriptions
        }

        return {
            "input_schema": {
                "type": "object",
                "properties": all_valid_columns
            },
            "output_schema": {
                "type": "object",
                "properties": {
                    "answer": {
                        "type": "string",
                        "description": "answer to the question"
                    }
                },
                "required": ["answer"],
            },
            "inputs": examples,
            "title": title
        }


    suggested_task_spec = get_suggested_task_spec(
        columns_with_descriptions=columns_with_descriptions,
        examples=examples,
        title="Company executive, investments, and customer details"
    )

    url = "https://api.parallel.ai/v1beta/tasks/suggest"
    headers = {
        "x-api-key": "PARALLEL_API_KEY",
        "Content-Type": "application/json"
    }
    data = {
        "user_intent": f"{user_intent}. Improve output_schema to include more descriptive fields, and only keep input fields that are relevant to answering the question.",
        "previous_task": suggested_task_spec
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    print(json.dumps(result, indent=2))
```

### End-to-End Ingest to Task Execution

The following Python script demonstrates the complete workflow of the Ingest API, from task suggestion to result retrieval:

```python [expandable] theme={"system"}
#!/usr/bin/env python3
"""
End-to-end test script for Parallel Ingest API

This script demonstrates the complete workflow:
1. Suggest a task based on user intent
2. Suggest a processor for the task
3. Create and run the task
4. Retrieve the results

Usage:
    python test_ingest_api.py

Make sure to set your PARALLEL_API_KEY environment variable or update the script directly.
"""

import os
import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration
API_KEY = "PARALLEL_API_KEY"
BASE_URL = "https://api.parallel.ai"

class IngestAPITester:
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json"
        }

    def suggest_task(self, user_intent: str) -> Optional[Dict[str, Any]]:
        """Step 1: Suggest a task based on user intent"""
        print(f"🔍 Step 1: Suggesting task for intent: '{user_intent}'")

        url = f"{self.base_url}/v1beta/tasks/suggest"
        data = {"user_intent": user_intent}

        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()

            result = response.json()
            print("✅ Task suggestion successful!")
            print(f"   Title: {result.get('title', 'N/A')}")
            print(f"   Input schema: {json.dumps(result.get('input_schema', {}), indent=2)}")
            print(f"   Output schema: {json.dumps(result.get('output_schema', {}), indent=2)}")
            print()

            return result

        except requests.exceptions.RequestException as e:
            print(f"❌ Error suggesting task: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"   Response: {e.response.text}")
            return None

    def suggest_processor(self, task_spec: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Step 2: Suggest a processor for the task"""
        print("🔧 Step 2: Suggesting processor for the task")

        url = f"{self.base_url}/v1beta/tasks/suggest-processor"
        data = {
            "task_spec": task_spec,
            "choose_processors_from": ["base", "core", "core2x", "pro", "ultra"]
        }

        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()

            result = response.json()
            print("✅ Processor suggestion successful!")

            # Extract the first recommended processor
            recommended_processors = result.get('recommended_processors', [])
            if recommended_processors:
                selected_processor = recommended_processors[0]
                print(f"   Recommended processors: {recommended_processors}")
                print(f"   Selected processor: {selected_processor}")
                result['selected_processor'] = selected_processor
            else:
                print("   ⚠️ No processors recommended, defaulting to 'core'")
                result['selected_processor'] = 'core'

            print(f"   Enhanced task spec received")
            print()

            return result

        except requests.exceptions.RequestException as e:
            print(f"❌ Error suggesting processor: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"   Response: {e.response.text}")
            return None

    def create_task_run(self, input_data: Any, processor: str = "core", task_spec: Optional[Dict] = None) -> Optional[str]:
        """Step 3: Create a task run"""
        print(f"🚀 Step 3: Creating task run with processor '{processor}'")

        url = f"{self.base_url}/v1/tasks/runs"
        data = {
            "input": input_data,
            "processor": processor
        }

        if task_spec:
            # Format the task_spec according to the documentation
            # Schemas need to be wrapped with type and json_schema fields
            formatted_task_spec = {}

            if "input_schema" in task_spec:
                formatted_task_spec["input_schema"] = {
                    "type": "json",
                    "json_schema": task_spec["input_schema"]
                }

            if "output_schema" in task_spec:
                formatted_task_spec["output_schema"] = {
                    "type": "json",
                    "json_schema": task_spec["output_schema"]
                }

            data["task_spec"] = formatted_task_spec

        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()

            result = response.json()
            run_id = result.get("run_id")
            status = result.get("status")

            print(f"✅ Task run created successfully!")
            print(f"   Run ID: {run_id}")
            print(f"   Status: {status}")
            print()

            return run_id

        except requests.exceptions.RequestException as e:
            print(f"❌ Error creating task run: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"   Response: {e.response.text}")
            return None

    def get_task_result(self, run_id: str, max_attempts: int = 30, wait_time: int = 10) -> Optional[Dict[str, Any]]:
        """Step 4: Get task results (with polling)"""
        print(f"📊 Step 4: Retrieving results for run {run_id}")

        url = f"{self.base_url}/v1/tasks/runs/{run_id}/result"
        headers = {"x-api-key": self.api_key}  # No Content-Type needed for GET

        for attempt in range(max_attempts):
            try:
                response = requests.get(url, headers=headers)

                if response.status_code == 200:
                    result = response.json()
                    status = result.get("run", {}).get("status")

                    if status == "completed":
                        print("✅ Task completed successfully!")
                        output = result.get("output", {})
                        print(f"   Content: {output.get('content', 'N/A')}")

                        # Show citations if available
                        citations = output.get("citations", [])
                        if citations:
                            print(f"   Citations: {len(citations)} sources")
                            for i, citation in enumerate(citations[:3], 1):  # Show first 3
                                print(f"     {i}. {citation}")

                        return result

                    elif status == "failed":
                        print("❌ Task failed!")
                        return result

                    else:
                        print(f"⏳ Task still {status}... (attempt {attempt + 1}/{max_attempts})")
                        time.sleep(wait_time)

                elif response.status_code == 404:
                    print(f"❌ Task run not found: {run_id}")
                    return None

                else:
                    response.raise_for_status()

            except requests.exceptions.RequestException as e:
                print(f"❌ Error getting task result: {e}")
                if hasattr(e, 'response') and e.response is not None:
                    print(f"   Response: {e.response.text}")
                return None

        print(f"⏰ Task did not complete within {max_attempts * wait_time} seconds")
        return None

    def run_end_to_end_test(self, user_intent: str, sample_input: Any):
        """Run the complete end-to-end test"""
        print("=" * 60)
        print("🧪 PARALLEL INGEST API - END-TO-END TEST")
        print("=" * 60)
        print()

        # Step 1: Suggest task
        task_suggestion = self.suggest_task(user_intent)
        if not task_suggestion:
            print("❌ Test failed at task suggestion step")
            return

        # Step 2: Suggest processor
        processor_suggestion = self.suggest_processor(task_suggestion)
        if not processor_suggestion:
            print("❌ Test failed at processor suggestion step")
            return

        # Step 3: Create task run
        selected_processor = processor_suggestion.get('selected_processor', 'core')
        run_id = self.create_task_run(
            input_data=sample_input,
            processor=selected_processor,
            task_spec=task_suggestion  # Use original task suggestion, not processor suggestion
        )
        if not run_id:
            print("❌ Test failed at task creation step")
            return

        # Step 4: Get results
        result = self.get_task_result(run_id)
        if result:
            print("🎉 End-to-end test completed successfully!")
        else:
            print("❌ Test failed at result retrieval step")


def main():
    """Main function to run the test"""

    # Check API key
    if API_KEY == "PARALLEL_API_KEY":
        print("⚠️  Please set your PARALLEL_API_KEY environment variable or update the script")
        print("   Example: export PARALLEL_API_KEY=your_actual_api_key")
        return

    # Initialize tester
    tester = IngestAPITester(API_KEY, BASE_URL)

    # Test configuration
    user_intent = "Given company_name and company_website, find the CEO information for technology companies"

    # Use object input that matches the expected schema
    sample_input = {
        "company_name": "Google",
        "company_website": "https://www.google.com"
    }

    # Run the test
    tester.run_end_to_end_test(user_intent, sample_input)


if __name__ == "__main__":
    main()
```

Running the Example

```bash  theme={"system"}
PARALLEL_API_KEY="PARALLEL_API_KEY" python3 ingest_script.py
```

This example demonstrates the complete workflow:

1. **Suggest Task**: Generate a task specification from natural language intent
2. **Suggest Processor**: Get processor recommendations and enhanced schemas
3. **Create Task Run**: Submit the task for processing with proper schema formatting
4. **Get Results**: Poll for completion and retrieve the final results

The script includes proper error handling, status polling, and demonstrates the correct format for task specifications required by the API.

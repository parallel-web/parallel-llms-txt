> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Task Spec

> Define structured research tasks with customizable input and output schemas. 

## Task Spec

A Task Specification ([Task Spec](/api-reference/tasks-v1/create-task-run#body-task-spec-output-schema)) is a declarative template that defines the structure and requirements for the outputs of a web research operation. While optional in each Task Run, Task Specs provide significant advantages when you need precise control over your research data.

Task Specs ensure consistent results by enforcing a specific output structure across multiple runs. They validate schema against expected formats and create reusable templates for common research patterns. By defining the expected outputs clearly, they also serve as self-documentation for your tasks, making them easier to understand and maintain.

| Component         | Required | Purpose                                               | Format              |
| ----------------- | -------- | ----------------------------------------------------- | ------------------- |
| **Output Schema** | Yes      | Defines the structure and fields of the task result   | JSON Schema or Text |
| **Input Schema**  | No       | Specifies expected input parameters and their formats | JSON Schema or Text |

## Task Spec Structure

A Task Spec consists of:

| Field    | Type                    | Required | Description                                     |
| -------- | ----------------------- | -------- | ----------------------------------------------- |
| `output` | Schema object or string | Yes      | Description and structure of the desired output |
| `input`  | Schema object or string | No       | Description and structure of input parameters   |

<Note>
  When providing a bare string for input or output, it's equivalent to a text schema with that string as the description.
</Note>

## Schema Types

Task Spec supports three schema formats:

<Tip> When using the [Python SDK](https://pypi.org/project/parallel-web/), Parallel Tasks also support Pydantic objects in Task Spec </Tip>
<Note> `auto` mode enables Deep Research style outputs only in processors `pro` and above. Read more about Deep Research [here](/task-api/task-deep-research). </Note>

<Tabs>
  <Tab title="JSON Schema">
    ```json  theme={"system"}
    {
      "json_schema": {
        "type": "object",
        "properties": {
          "population": {
            "type": "string",
            "description": "Current population with year of estimate"
          },
          "area": {
            "type": "string",
            "description": "Total area in square kilometers and square miles"
          }
        },
        "required": ["population", "area"]
      },
      "type": "json"
    }
    ```
  </Tab>

  <Tab title="Text Schema">
    ```json  theme={"system"}
    {
      "description": "Summary of the country's economic indicators for 2023",
      "type": "text"
    }
    ```
  </Tab>

  <Tab title="Auto Schema">
    ```json  theme={"system"}
    {
      "type": "auto"
    }
    ```
  </Tab>
</Tabs>

## Task Spec Best Practices

Define what entity you're researching (input) and what specific data points you need back (output). Keep both as flat-structured as possible.

<Note>
  **The `description` field is your primary tool for controlling output quality.** Field-level descriptions are the best way to include specific instructions for each output field. Think of the `description` as your "prompt" for that field—it's where you specify format requirements, data sources, fallback behavior, and any other instructions.
</Note>

<Steps>
  <Step title="Identify what schema your use case requires">
    * If executing a Deep Research style Task, use the Task Spec with `auto` schema
    * If control and specificity with regards to outputs are required, use Task Spec with a JSONSchema for inputs and outputs
    * In other cases, the Task Spec may not be necessary; the system in this case will output a plain text response
  </Step>

  <Step title="Define effective inputs">
    * When using only text based inputs, be as specific as possible about what you are expecting the system to return. Include any instructions and preferences in the input text.
    * When using JSON Schema inputs, use the minimum fields required to uniquely identify the entity you want to enrich. For example, include both the company\_name and company\_website, or both the person\_name and social\_url, to help the system disambiguate.
    * Avoid deeply nested structures and keep the input schema flat
  </Step>

  <Step title="Define effective outputs (relevant when using JSONSchema outputs)">
    **Use field-level `description` for all instructions.** The `description` field is the most effective way to control how each output field is populated. Include:

    * **Entity**: What are you researching?
    * **Action**: What do you want to find?
    * **Specifics**: Constraints, time periods, formatting requirements
    * **Error Handling**: What to return if data is unavailable (e.g., "If unavailable, return null")

    <Tip>
      **Example of a well-written description:**

      ```json  theme={"system"}
      "employee_count": {
        "type": "string",
        "description": "The current number of employees at the company. Use the most recent data available from LinkedIn, company website, or press releases. Format as a range (e.g., '501-1000') if exact count unavailable. If no data found, return 'Unknown'."
      }
      ```
    </Tip>

    * Use clear, descriptive field names
      * Use `ceo_name` instead of `name`
      * Use `headquarters_address`\*\* instead of `address`
      * Use `annual_revenue_2024`\*\* instead of `revenue`
    * Specify Data Formats
      * Always specify format for dates: `YYYY-MM-DD`
      * Use ranges for numerical values with units: `revenue_in_millions`, `employee_count`
      * Specify quantities for lists: `top_5_products`, `recent_3_acquisitions`
    * **Unnecessary Fields**: Don't include fields like `reasoning` or `confidence_score` as these are already included in the basis
  </Step>

  <Step title="Additional instructions">
    If there are additional requirements or instructions separate from individual fields, the top-level `description` field is available. For example:

    ```json  theme={"system"}
    {
      "type": "object",
      "description": "Extract all information only from well-known government sites.",
      "properties": {
        "latest_funding_amount": {
          "type": "string",
          "description": "Funding amount in millions USD format (e.g., '50M'). If unavailable, return null."
        },
        "funding_round_type": {
          "type": "string",
          "description": "Type of funding round (Series A, Series B, etc.). If unknown, return 'Type unknown'."
        },
        "funding_date": {
          "type": "string",
          "description": "Date of funding round in YYYY-MM-DD format. If partial date available, use YYYY-MM or YYYY."
        },
        "current_employee_count": {
          "type": "string",
          "description": "Current number of employees as approximate number or range. Allow estimates when precise counts unavailable."
        }
      }
    }
    ```
  </Step>
</Steps>

## Output Schema Validation Rules

The Task API enforces several restrictions on output schemas to ensure compatibility and performance:

### Schema Structure Rules

| Rule                               | Type    | Description                                               |
| ---------------------------------- | ------- | --------------------------------------------------------- |
| Root type must be object           | error   | The root schema must have `"type": "object"`              |
| Root must have properties          | error   | The root object must have a `properties` field            |
| Root cannot use anyOf              | error   | The root level cannot use `anyOf`                         |
| Standalone null type               | error   | `null` type is only allowed in union types or anyOf       |
| All fields must be required        | warning | All properties should be listed in the `required` array   |
| additionalProperties must be false | warning | All object types should set `additionalProperties: false` |

<Note>
  While all fields must be required in the schema, you can create optional parameters by using a union type with `null`. For example, `"type": ["string", "null"]` allows a field to be either a string or null, effectively making it optional while maintaining schema compliance.
</Note>

### Size and Complexity Limits

<Warning>
  **18,000 character limit:** The combined length of your task specification AND input data cannot exceed 18,000 characters. This includes:

  * All field names and descriptions in your schemas
  * The `objective` or `description` text
  * Your input data (the entity you're researching)

  If you hit this limit, simplify your schema descriptions or reduce input size. For large input data, consider splitting into multiple tasks.
</Warning>

| Rule                     | Type  | Limit            | Description                                                    |
| ------------------------ | ----- | ---------------- | -------------------------------------------------------------- |
| Nesting depth            | error | 5 levels         | Maximum nesting depth of objects and arrays                    |
| Total properties         | error | 100              | Maximum total number of properties across all levels           |
| Total string length      | error | 18,000 chars     | Maximum total string length for names and values               |
| Enum values              | error | 500              | Maximum number of enum values across all properties            |
| Large enum string length | error | 7,500 chars      | Maximum string length for enums with >250 values               |
| Task spec size           | error | 15,000 chars     | Maximum length of the task specification alone                 |
| **Total size**           | error | **18,000 chars** | **Maximum combined length of task specification + input data** |

### Unsupported Keywords

The following JSON Schema keywords are not supported in output schemas:

`contains`, `format`, `maxContains`, `maxItems`, `maxLength`, `maxProperties`, `maximum`, `minContains`, `minItems`, `minLength`, `minimum`, `minProperties`, `multipleOf`, `pattern`, `patternProperties`, `propertyNames`, `uniqueItems`, `unevaluatedItems`, `unevaluatedProperties`

irements: it has an object root type with properties, all fields are required, and `additionalProperties` is set to false.

### Common Schema Errors to Avoid

Here are examples of common schema errors and how to fix them:

<Tabs>
  <Tab title="Root Type Error">
    ```json  theme={"system"}
    {
      "type": "array",  // Error: Root type must be "object"
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" }
        }
      }
    }
    ```

    **Fix:** Change the root type to "object" and move array properties to a field:

    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" }
            },
            "required": ["name"]
          }
        }
      },
      "required": ["items"],
      "additionalProperties": false
    }
    ```
  </Tab>

  <Tab title="AnyOf Error">
    ```json  theme={"system"}
    {
      "type": "object",
      "anyOf": [  // Error: Root level cannot use anyOf
        {
          "properties": {
            "field1": { "type": "string" }
          }
        },
        {
          "properties": {
            "field2": { "type": "string" }
          }
        }
      ]
    }
    ```

    **Fix:** Combine the properties into a single object:

    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      },
      "required": ["field1", "field2"],
      "additionalProperties": false
    }
    ```
  </Tab>

  <Tab title="Missing Required">
    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      },
      "required": ["field1"]  // Warning: All fields should be required
    }
    ```

    **Fix:** Add all fields to the required array:

    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      },
      "required": ["field1", "field2"],
      "additionalProperties": false
    }
    ```
  </Tab>

  <Tab title="Additional Properties">
    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      },
      "required": ["field1", "field2"],
      "additionalProperties": true  // Warning: should be false
    }
    ```

    **Fix:** Set additionalProperties to false:

    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      },
      "required": ["field1", "field2"],
      "additionalProperties": false
    }
    ```
  </Tab>

  <Tab title="Unsupported Keywords">
    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": {
          "type": "string",
          "minLength": 5  // Error: Unsupported keyword
        }
      },
      "required": ["field1"],
      "additionalProperties": false
    }
    ```

    **Fix:** Remove unsupported keywords and use descriptions instead:

    ```json  theme={"system"}
    {
      "type": "object",
      "properties": {
        "field1": {
          "type": "string",
          "description": "A string with at least 5 characters"
        }
      },
      "required": ["field1"],
      "additionalProperties": false
    }
    ```
  </Tab>
</Tabs>

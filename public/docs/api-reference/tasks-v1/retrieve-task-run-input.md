> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve Task Run Input

> Retrieves the input of a run by run_id.



## OpenAPI

````yaml public-openapi.json get /v1/tasks/runs/{run_id}/input
openapi: 3.1.0
info:
  title: Parallel API
  description: Parallel API
  contact:
    name: Parallel Support
    url: https://parallel.ai
    email: support@parallel.ai
  version: 0.1.2
servers:
  - url: https://api.parallel.ai
    description: Parallel API
security:
  - ApiKeyAuth: []
tags:
  - name: Tasks v1
    description: >-
      The Task API executes web research and extraction tasks. Clients submit a
      natural-language objective with an optional input schema; the service
      plans retrieval, fetches relevant URLs, and returns outputs that conform
      to a provided or inferred JSON schema. Supports deep research style
      queries and can return rich structured JSON outputs. Processors trade-off
      between cost, latency, and quality. Each processor supports calibrated
      confidences.

      - Output metadata: citations, excerpts, reasoning, and confidence per
      field
  - name: Tasks (Beta)
    description: >-
      The Task Group API is currently in beta and enables batch execution of
      many independent Task runs with group-level monitoring and failure
      handling.

      - Submit hundreds or thousands of Tasks as a single group

      - Observe group progress and receive results as they complete

      - Real-time updates via Server-Sent Events (SSE)

      - Add tasks to an existing group while it is running

      - Group-level retry and error aggregation

      Status: beta and subject to change.
  - name: Search (Beta)
    description: >-
      Search returns ranked URLs with extended excerpts suitable for LLM
      consumption. Inputs are a natural-language objective and optional keyword
      queries. Source policies allow including or excluding specific domains and
      have configurable output sizes. The returned extended snippets contain
      dense, relevant information from relevant pages.

      - Result: ranked list with URL, title, and long text excerpts
  - name: Extract (Beta)
    description: >-
      Extract returns excerpts or full content from one or more URLs. Inputs are
      a list of URLs and an optional search objective and keyword queries. The
      returned excerpts or full content is formatted as markdown and suitable
      for LLM consumption.

      - Result: excerpts or full content from the URL formatted as markdown
  - name: FindAll API (Beta)
    description: >-
      The FindAll API discovers and evaluates entities that match complex
      criteria from natural language objectives. Submit a high-level goal and
      the service automatically generates structured match conditions, discovers
      relevant candidates, and evaluates each against the criteria. Returns
      comprehensive results with detailed reasoning, citations, and confidence
      scores for each match decision. Streaming events and webhooks are
      supported.
  - name: Chat API (Beta)
    description: >-
      The Chat API provides a programmatic chat-style text generation interface.
      It accepts a sequence of messages and returns model responses. Intended
      for assistant-like interactions and evaluation. Streaming responses are
      supported.
  - name: Monitor
    description: Monitor
paths:
  /v1/tasks/runs/{run_id}/input:
    get:
      tags:
        - Tasks v1
      summary: Retrieve Task Run Input
      description: Retrieves the input of a run by run_id.
      operationId: tasks_runs_input_get_v1_tasks_runs__run_id__input_get
      parameters:
        - name: run_id
          in: path
          required: true
          schema:
            type: string
            title: Run Id
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskRunInput'
              example:
                processor: core
                metadata:
                  my_key: my_value
                task_spec:
                  output_schema:
                    json_schema:
                      type: object
                      properties:
                        gdp:
                          type: string
                          description: >-
                            GDP in USD for the year, formatted like '$3.1
                            trillion (2023)'
                      required:
                        - gdp
                      additionalProperties: false
                    type: json
                  input_schema:
                    json_schema:
                      type: object
                      properties:
                        country:
                          type: string
                        year:
                          type: integer
                      required:
                        - country
                        - year
                      additionalProperties: false
                    type: json
                input:
                  country: France
                  year: 2023
        '401':
          description: 'Unauthorized: invalid or missing credentials'
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: 'Unauthorized: invalid or missing credentials'
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Run id not found
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: Run id not found
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '422':
          description: Request validation error
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: Request validation error
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    TaskRunInput:
      properties:
        processor:
          type: string
          title: Processor
          description: Processor to use for the task.
          examples:
            - base
        metadata:
          anyOf:
            - additionalProperties:
                anyOf:
                  - type: string
                  - type: integer
                  - type: number
                  - type: boolean
              type: object
            - type: 'null'
          title: Metadata
          description: >-
            User-provided metadata stored with the run. Keys and values must be
            strings with a maximum length of 16 and 512 characters respectively.
        source_policy:
          anyOf:
            - $ref: '#/components/schemas/SourcePolicy'
            - type: 'null'
          description: >-
            Optional source policy governing preferred and disallowed domains in
            web search results.
        task_spec:
          anyOf:
            - $ref: '#/components/schemas/TaskSpec'
            - type: 'null'
          description: Task specification. If unspecified, defaults to auto output schema.
        input:
          anyOf:
            - type: string
            - additionalProperties: true
              type: object
          title: Input
          description: Input to the task, either text or a JSON object.
          examples:
            - What was the GDP of France in 2023?
            - '{"country": "France", "year": 2023}'
        previous_interaction_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Previous Interaction Id
          description: Interaction ID to use as context for this request.
      type: object
      required:
        - processor
        - input
      title: TaskRunInput
      description: Request to run a task.
    ErrorResponse:
      properties:
        type:
          type: string
          const: error
          title: Type
          description: Always 'error'.
        error:
          $ref: '#/components/schemas/Error'
          description: Error.
      type: object
      required:
        - type
        - error
      title: ErrorResponse
      description: Response object used for non-200 status codes.
    SourcePolicy:
      properties:
        include_domains:
          items:
            type: string
          type: array
          title: Include Domains
          description: >-
            List of domains to restrict the results to. If specified, only
            sources from these domains will be included. Accepts plain domains
            (e.g., example.com, subdomain.example.gov) or bare domain extension
            starting with a period (e.g., .gov, .edu, .co.uk).
          examples:
            - - wikipedia.org
              - usa.gov
              - .edu
        exclude_domains:
          items:
            type: string
          type: array
          title: Exclude Domains
          description: >-
            List of domains to exclude from results. If specified, sources from
            these domains will be excluded. Accepts plain domains (e.g.,
            example.com, subdomain.example.gov) or bare domain extension
            starting with a period (e.g., .gov, .edu, .co.uk).
          examples:
            - - reddit.com
              - x.com
              - .ai
        after_date:
          anyOf:
            - type: string
              format: date
            - type: 'null'
          title: After Date
          description: >-
            Optional start date for filtering search results. Results will be
            limited to content published on or after this date. Provided as an
            RFC 3339 date string (YYYY-MM-DD).
          examples:
            - '2024-01-01'
      type: object
      title: SourcePolicy
      description: |-
        Source policy for web search results.

        This policy governs which sources are allowed/disallowed in results.
    TaskSpec:
      properties:
        output_schema:
          anyOf:
            - $ref: '#/components/schemas/JsonSchema'
            - $ref: '#/components/schemas/TextSchema'
            - $ref: '#/components/schemas/AutoSchema'
            - type: string
          title: Output Schema
          description: >-
            JSON schema or text fully describing the desired output from the
            task. Descriptions of output fields will determine the form and
            content of the response. A bare string is equivalent to a text
            schema with the same description.
        input_schema:
          anyOf:
            - type: string
            - $ref: '#/components/schemas/JsonSchema'
            - $ref: '#/components/schemas/TextSchema'
            - type: 'null'
          title: Input Schema
          description: >-
            Optional JSON schema or text description of expected input to the
            task. A bare string is equivalent to a text schema with the same
            description.
      type: object
      required:
        - output_schema
      title: TaskSpec
      description: >-
        Specification for a task.


        Auto output schemas can be specified by setting
        `output_schema={"type":"auto"}`. Not

        specifying a TaskSpec is the same as setting an auto output schema.


        For convenience bare strings are also accepted as input or output
        schemas.
    Error:
      properties:
        ref_id:
          type: string
          title: Reference ID
          description: Reference ID for the error.
        message:
          type: string
          title: Message
          description: Human-readable message.
        detail:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Detail
          description: Optional detail supporting the error.
      type: object
      required:
        - ref_id
        - message
      title: Error
      description: An error message.
    JsonSchema:
      properties:
        json_schema:
          additionalProperties: true
          type: object
          title: Json Schema
          description: A JSON Schema object. Only a subset of JSON Schema is supported.
          examples:
            - additionalProperties: false
              properties:
                gdp:
                  description: >-
                    GDP in USD for the year, formatted like '$3.1 trillion
                    (2023)'
                  type: string
              required:
                - gdp
              type: object
        type:
          type: string
          const: json
          title: Type
          description: The type of schema being defined. Always `json`.
          default: json
      type: object
      required:
        - json_schema
      title: JsonSchema
      description: JSON schema for a task input or output.
    TextSchema:
      properties:
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
          description: A text description of the desired output from the task.
          examples:
            - GDP in USD for the year, formatted like '$3.1 trillion (2023)'
        type:
          type: string
          const: text
          title: Type
          description: The type of schema being defined. Always `text`.
          default: text
      type: object
      title: TextSchema
      description: Text description for a task input or output.
    AutoSchema:
      properties:
        type:
          type: string
          const: auto
          title: Type
          description: The type of schema being defined. Always `auto`.
          default: auto
      type: object
      title: AutoSchema
      description: Auto schema for a task input or output.
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
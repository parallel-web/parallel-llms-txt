# Create Task Run

> Initiates a task run.

Returns immediately with a run object in status 'queued'.

Beta features can be enabled by setting the 'parallel-beta' header.

## OpenAPI

````yaml public-openapi.json post /v1/tasks/runs
paths:
  path: /v1/tasks/runs
  method: post
  servers:
    - url: https://api.parallel.ai
      description: Parallel API
  request:
    security:
      - title: ApiKeyAuth
        parameters:
          query: {}
          header:
            x-api-key:
              type: apiKey
          cookie: {}
    parameters:
      path: {}
      query: {}
      header:
        parallel-beta:
          schema:
            - type: string
              required: false
              title: Parallel-Beta
            - type: 'null'
              required: false
              title: Parallel-Beta
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              processor:
                allOf:
                  - type: string
                    title: Processor
                    description: Processor to use for the task.
                    examples:
                      - base
              metadata:
                allOf:
                  - anyOf:
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
                      User-provided metadata stored with the run. Keys and
                      values must be strings with a maximum length of 16 and 512
                      characters respectively.
              source_policy:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/SourcePolicy'
                      - type: 'null'
                    description: >-
                      Optional source policy governing preferred and disallowed
                      domains in web search results.
              task_spec:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/TaskSpec'
                      - type: 'null'
                    description: >-
                      Task specification. If unspecified, defaults to auto
                      output schema.
              input:
                allOf:
                  - anyOf:
                      - type: string
                      - additionalProperties: true
                        type: object
                    title: Input
                    description: Input to the task, either text or a JSON object.
                    examples:
                      - What was the GDP of France in 2023?
                      - '{"country": "France", "year": 2023}'
              mcp_servers:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/McpServer'
                        type: array
                      - type: 'null'
                    title: Mcp Servers
                    description: >-
                      Optional list of MCP servers to use for the run.

                      To enable this feature in your requests, specify
                      `mcp-server-2025-07-17` as one of the values in
                      `parallel-beta` header (for API calls) or `betas` param
                      (for the SDKs).
              enable_events:
                allOf:
                  - anyOf:
                      - type: boolean
                      - type: 'null'
                    title: Enable Events
                    description: >-
                      Controls tracking of task run execution progress. When set
                      to true, progress events are recorded and can be accessed
                      via the [Task Run
                      events](https://platform.parallel.ai/api-reference)
                      endpoint. When false, no progress events are tracked. Note
                      that progress tracking cannot be enabled after a run has
                      been created. The flag is set to true by default for
                      premium processors (pro and above).

                      To enable this feature in your requests, specify
                      `events-sse-2025-07-24` as one of the values in
                      `parallel-beta` header (for API calls) or `betas` param
                      (for the SDKs).
              webhook:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/Webhook'
                      - type: 'null'
                    description: >-
                      Callback URL (webhook endpoint) that will receive an HTTP
                      POST when the run completes. 

                      This feature is not available via the Python SDK. To
                      enable this feature in your API requests, specify the
                      `parallel-beta` header with `webhook-2025-08-12` value.
            required: true
            title: BetaTaskRunInput
            description: Task run input with additional beta fields.
            refIdentifier: '#/components/schemas/BetaTaskRunInput'
            requiredProperties:
              - processor
              - input
        examples:
          example:
            value:
              processor: base
              metadata: {}
              source_policy:
                include_domains:
                  - wikipedia.org
                  - usa.gov
                  - .edu
                exclude_domains:
                  - reddit.com
                  - x.com
                  - .ai
              task_spec:
                output_schema:
                  json_schema:
                    additionalProperties: false
                    properties:
                      gdp:
                        description: >-
                          GDP in USD for the year, formatted like '$3.1 trillion
                          (2023)'
                        type: string
                    required:
                      - gdp
                    type: object
                  type: json
                input_schema: <string>
              input: What was the GDP of France in 2023?
              mcp_servers:
                - type: url
                  url: <string>
                  headers: {}
                  name: <string>
                  allowed_tools:
                    - <string>
              enable_events: true
              webhook:
                url: <string>
                event_types: []
    codeSamples:
      - label: Beta params
        lang: Python
        source: |-
          from parallel import Parallel
          from parallel.types.beta import McpServerParam
          from parallel.types.beta.beta_run_input_param import BetaRunInputParam

          client = Parallel(api_key="API Key")

          task_run = client.beta.task_run.create(
              input="What was the GDP of France in 2023?",
              processor='base',
              enable_events=True,
              mcp_servers=[
                  McpServerParam(
                      type='url',
                      name='parallel_web_search',
                      url='https://mcp.parallel.ai/v1beta/search_mcp',
                      headers={'x-api-key': 'API Key'}
                  )
              ],
              betas=['events-sse-2025-07-24','mcp-server-2025-07-17']
          )
          print(task_run.run_id)
      - label: Beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const taskRun = await client.beta.taskRun.create({
              input: 'What was the GDP of France in 2023?',
              processor: 'base',
              enable_events: true,
              mcp_servers: [{
                      type: 'url',
                      name: 'parallel_web_search',
                      url: 'https://mcp.parallel.ai/v1beta/search_mcp',
                      headers: {'x-api-key': 'API Key'},
                  },
              ],
              betas: ['events-sse-2025-07-24','mcp-server-2025-07-17'],
          });
          console.log(taskRun.run_id);
      - label: Non-beta params
        lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          task_run = client.task_run.create(
              input="What was the GDP of France in 2023?",
              processor="base",
          )
          print(task_run.run_id)
      - label: Non-beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const taskRun = await client.taskRun.create({
              input: 'What was the GDP of France in 2023?',
              processor: 'base',
          });
          console.log(taskRun.run_id);
  response:
    '202':
      application/json:
        schemaArray:
          - type: object
            properties:
              run_id:
                allOf:
                  - type: string
                    title: Run ID
                    description: ID of the task run.
                    examples:
                      - trun_e0083b6aac0544eb8686e8d2a76533d2
              status:
                allOf:
                  - type: string
                    enum:
                      - queued
                      - action_required
                      - running
                      - completed
                      - failed
                      - cancelling
                      - cancelled
                    title: Status
                    description: Status of the run.
                    examples:
                      - queued
                      - action_required
                      - running
                      - completed
                      - failed
                      - cancelling
                      - cancelled
              is_active:
                allOf:
                  - type: boolean
                    title: Is Active
                    description: >-
                      Whether the run is currently active, i.e. status is one of
                      {'cancelling', 'queued', 'running'}.
              warnings:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/Warning'
                        type: array
                      - type: 'null'
                    title: Warnings
                    description: Warnings for the run, if any.
                    examples:
                      - []
              error:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/Error'
                      - type: 'null'
                    description: Error for the run, present only if status is 'failed'.
              processor:
                allOf:
                  - type: string
                    title: Processor
                    description: Processor used for the run.
                    examples:
                      - base
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties:
                          anyOf:
                            - type: string
                            - type: integer
                            - type: number
                            - type: boolean
                        type: object
                      - type: 'null'
                    title: Metadata
                    description: User-provided metadata stored with the run.
                    examples:
                      - {}
              taskgroup_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Taskgroup ID
                    description: ID of the taskgroup to which the run belongs.
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Created At
                    description: >-
                      Timestamp of the creation of the task, as an RFC 3339
                      string.
                    examples:
                      - '2025-04-24T18:56:22.513132Z'
              modified_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Modified At
                    description: >-
                      Timestamp of the last modification to the task, as an RFC
                      3339 string.
                    examples:
                      - '2025-04-24T18:56:22.513132Z'
            title: TaskRun
            description: Status of a task run.
            refIdentifier: '#/components/schemas/TaskRun'
            requiredProperties:
              - run_id
              - status
              - is_active
              - processor
              - created_at
              - modified_at
        examples:
          example:
            value:
              run_id: trun_9907962f83aa4d9d98fd7f4bf745d654
              status: queued
              is_active: true
              processor: core
              metadata:
                my_key: my_value
              created_at: '2025-04-23T20:21:48.037943Z'
              modified_at: '2025-04-23T20:21:48.037943Z'
        description: Successful Response
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - &ref_0
                    type: string
                    enum:
                      - error
                    const: error
                    title: Type
                    description: Always 'error'.
              error:
                allOf:
                  - &ref_1
                    allOf:
                      - $ref: '#/components/schemas/Error'
                    description: Error.
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties: &ref_2
              - type
              - error
        examples:
          example:
            value:
              type: error
              error:
                ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                message: 'Unauthorized: invalid or missing credentials'
        description: 'Unauthorized: invalid or missing credentials'
    '402':
      application/json:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties: *ref_2
        examples:
          example:
            value:
              type: error
              error:
                ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                message: 'Payment required: insufficient credit in account'
        description: 'Payment required: insufficient credit in account'
    '403':
      application/json:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties: *ref_2
        examples:
          example:
            value:
              type: error
              error:
                ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                message: 'Forbidden: invalid processor in request'
        description: 'Forbidden: invalid processor in request'
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties: *ref_2
        examples:
          example:
            value:
              type: error
              error:
                ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                message: 'Unprocessable content: request validation error'
        description: 'Unprocessable content: request validation error'
    '429':
      application/json:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties: *ref_2
        examples:
          example:
            value:
              type: error
              error:
                ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                message: 'Too many requests: quota temporarily exceeded'
        description: 'Too many requests: quota temporarily exceeded'
  deprecated: false
  type: path
components:
  schemas:
    AutoSchema:
      properties:
        type:
          type: string
          enum:
            - auto
          const: auto
          title: Type
          description: The type of schema being defined. Always `auto`.
          default: auto
      type: object
      title: AutoSchema
      description: Auto schema for a task input or output.
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
          enum:
            - json
          const: json
          title: Type
          description: The type of schema being defined. Always `json`.
          default: json
      type: object
      required:
        - json_schema
      title: JsonSchema
      description: JSON schema for a task input or output.
    McpServer:
      properties:
        type:
          type: string
          enum:
            - url
          const: url
          title: Type
          description: Type of MCP server being configured. Always `url`.
          default: url
        url:
          type: string
          title: Url
          description: URL of the MCP server.
        headers:
          anyOf:
            - additionalProperties:
                type: string
                format: password
                writeOnly: true
              type: object
            - type: 'null'
          title: Headers
          description: Headers for the MCP server.
        name:
          type: string
          title: Name
          description: Name of the MCP server.
        allowed_tools:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Allowed Tools
          description: List of allowed tools for the MCP server.
      type: object
      required:
        - url
        - name
      title: McpServer
      description: MCP server configuration.
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
          enum:
            - text
          const: text
          title: Type
          description: The type of schema being defined. Always `text`.
          default: text
      type: object
      title: TextSchema
      description: Text description for a task input or output.
    Warning:
      properties:
        type:
          type: string
          enum:
            - spec_validation_warning
            - input_validation_warning
            - warning
          title: Type
          description: >-
            Type of warning. Note that adding new warning types is considered a
            backward-compatible change.
          examples:
            - spec_validation_warning
            - input_validation_warning
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
          description: Optional detail supporting the warning.
      type: object
      required:
        - type
        - message
      title: Warning
      description: Human-readable message for a task.
    Webhook:
      properties:
        url:
          type: string
          title: Url
          description: URL for the webhook.
        event_types:
          items:
            type: string
            enum:
              - task_run.status
          type: array
          title: Event Types
          description: Event types to send the webhook notifications for.
          default: []
      type: object
      required:
        - url
      title: Webhook
      description: Webhooks for Task Runs.

````
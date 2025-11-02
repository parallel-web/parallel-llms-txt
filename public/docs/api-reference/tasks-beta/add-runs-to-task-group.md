# Add Runs to Task Group

> Initiates multiple task runs within a TaskGroup.

## OpenAPI

````yaml public-openapi.json post /v1beta/tasks/groups/{taskgroup_id}/runs
paths:
  path: /v1beta/tasks/groups/{taskgroup_id}/runs
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
      path:
        taskgroup_id:
          schema:
            - type: string
              required: true
              title: Taskgroup Id
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
              default_task_spec:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/TaskSpec'
                      - type: 'null'
                    description: >-
                      Default task spec to use for the runs. If task_spec is
                      specified in a run, it overrides this default.
              inputs:
                allOf:
                  - items:
                      $ref: '#/components/schemas/BetaTaskRunInput'
                    type: array
                    title: Inputs
                    description: List of task runs to execute.
            required: true
            title: TaskGroupRunRequest
            description: Request to initiate new task runs in a task group.
            refIdentifier: '#/components/schemas/TaskGroupRunRequest'
            requiredProperties:
              - inputs
        examples:
          example:
            value:
              default_task_spec:
                output_schema:
                  json_schema: &ref_0
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
              inputs:
                - processor: base
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
                      json_schema: *ref_0
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
        source: |
          from parallel import Parallel
          from parallel.types.beta import McpServerParam
          from parallel.types.beta.beta_run_input_param import BetaRunInputParam

          client = Parallel(api_key="API Key")
          group_status = client.beta.task_group.add_runs(
              "taskgroup_id",
              inputs=[
                  BetaRunInputParam(
                      input="What was the GDP of France in 2023?",
                      processor="base",
                      mcp_servers=[McpServerParam(
                          type="url",
                          name="parallel_web_search",
                          url="https://mcp.parallel.ai/v1beta/search_mcp",
                          headers={"x-api-key": "API Key"}
                      )]
                  )
              ],
              betas=["mcp-server-2025-07-17"]
          )
          print(group_status.status)
      - label: Non-beta params
        lang: Python
        source: |
          from parallel import Parallel
          from parallel.types.beta.beta_run_input_param import BetaRunInputParam

          client = Parallel(api_key="API Key")
          group_status = client.beta.task_group.add_runs(
              "taskgroup_id",
              inputs=[
                  BetaRunInputParam(
                      input="What was the GDP of France in 2023?",
                      processor="base"
                  )
              ]
          )
          print(group_status.status)
      - label: Beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const groupStatus = await client.beta.taskGroup.addRuns(
              'taskgroup_id',
              {
                  inputs: [
                      {
                          input: 'What was the GDP of France in 2023?',
                          processor: 'base',
                          mcp_servers: [{
                              type: 'url',
                              name: 'parallel_web_search',
                              url: 'https://mcp.parallel.ai/v1beta/search_mcp',
                              headers: {'x-api-key': 'API Key'}
                          }]
                      }
                  ],
                  betas: ['mcp-server-2025-07-17']
              }
          );
          console.log(groupStatus.status);
      - label: Non-beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const groupStatus = await client.beta.taskGroup.addRuns(
              'taskgroup_id',
              {
                  inputs: [
                      {
                          input: 'What was the GDP of France in 2023?',
                          processor: 'base',
                      }
                  ]
              }
          );
          console.log(groupStatus.status);
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              status:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskGroupStatus'
                    description: Status of the group.
              run_ids:
                allOf:
                  - items:
                      type: string
                    type: array
                    title: Run IDs
                    description: IDs of the newly created runs.
              run_cursor:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Cursor
                    description: >-
                      Cursor for these runs in the run stream at
                      taskgroup/runs?last_event_id=<run_cursor>. Empty for the
                      first runs in the group.
              event_cursor:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Event Cursor
                    description: >-
                      Cursor for these runs in the event stream at
                      taskgroup/events?last_event_id=<event_cursor>. Empty for
                      the first runs in the group.
            title: TaskGroupRunResponse
            description: Response from adding new task runs to a task group.
            refIdentifier: '#/components/schemas/TaskGroupRunResponse'
            requiredProperties:
              - status
              - run_ids
              - run_cursor
              - event_cursor
        examples:
          example:
            value:
              status:
                num_task_runs: 123
                task_run_status_counts: {}
                is_active: true
                status_message: <string>
                modified_at: '2025-04-24T18:56:22.513132Z'
              run_ids:
                - <string>
              run_cursor: <string>
              event_cursor: <string>
        description: Successful Response
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - items:
                      $ref: '#/components/schemas/ValidationError'
                    type: array
                    title: Detail
            title: HTTPValidationError
            refIdentifier: '#/components/schemas/HTTPValidationError'
        examples:
          example:
            value:
              detail:
                - loc:
                    - <string>
                  msg: <string>
                  type: <string>
        description: Validation Error
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
    BetaTaskRunInput:
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
        mcp_servers:
          anyOf:
            - items:
                $ref: '#/components/schemas/McpServer'
              type: array
            - type: 'null'
          title: Mcp Servers
          description: >-
            Optional list of MCP servers to use for the run.

            To enable this feature in your requests, specify
            `mcp-server-2025-07-17` as one of the values in `parallel-beta`
            header (for API calls) or `betas` param (for the SDKs).
        enable_events:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Enable Events
          description: >-
            Controls tracking of task run execution progress. When set to true,
            progress events are recorded and can be accessed via the [Task Run
            events](https://platform.parallel.ai/api-reference) endpoint. When
            false, no progress events are tracked. Note that progress tracking
            cannot be enabled after a run has been created. The flag is set to
            true by default for premium processors (pro and above).

            To enable this feature in your requests, specify
            `events-sse-2025-07-24` as one of the values in `parallel-beta`
            header (for API calls) or `betas` param (for the SDKs).
        webhook:
          anyOf:
            - $ref: '#/components/schemas/Webhook'
            - type: 'null'
          description: >-
            Callback URL (webhook endpoint) that will receive an HTTP POST when
            the run completes. 

            This feature is not available via the Python SDK. To enable this
            feature in your API requests, specify the `parallel-beta` header
            with `webhook-2025-08-12` value.
      type: object
      required:
        - processor
        - input
      title: BetaTaskRunInput
      description: Task run input with additional beta fields.
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
    TaskGroupStatus:
      properties:
        num_task_runs:
          type: integer
          title: Num Task Runs
          description: Number of task runs in the group.
        task_run_status_counts:
          additionalProperties:
            type: integer
          type: object
          title: Task Run Status Counts
          description: Number of task runs with each status.
        is_active:
          type: boolean
          title: Is Active
          description: >-
            True if at least one run in the group is currently active, i.e.
            status is one of {'cancelling', 'queued', 'running'}.
        status_message:
          anyOf:
            - type: string
            - type: 'null'
          title: Status Message
          description: Human-readable status message for the group.
        modified_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Modified At
          description: >-
            Timestamp of the last status update to the group, as an RFC 3339
            string.
          examples:
            - '2025-04-24T18:56:22.513132Z'
      type: object
      required:
        - num_task_runs
        - task_run_status_counts
        - is_active
        - status_message
        - modified_at
      title: TaskGroupStatus
      description: Status of a task group.
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
    ValidationError:
      properties:
        loc:
          items:
            anyOf:
              - type: string
              - type: integer
          type: array
          title: Location
        msg:
          type: string
          title: Message
        type:
          type: string
          title: Error Type
      type: object
      required:
        - loc
        - msg
        - type
      title: ValidationError
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
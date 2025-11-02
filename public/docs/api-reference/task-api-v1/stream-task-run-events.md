# Stream Task Run Events

> Streams events for a task run.

Returns a stream of events showing progress updates and state changes for the task
run.

For task runs that did not have enable_events set to true during creation, the
frequency of events will be reduced.

## OpenAPI

````yaml public-openapi.json get /v1beta/tasks/runs/{run_id}/events
paths:
  path: /v1beta/tasks/runs/{run_id}/events
  method: get
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
        run_id:
          schema:
            - type: string
              required: true
              title: Run Id
      query: {}
      header: {}
      cookie: {}
    body: {}
    codeSamples:
      - lang: Python
        source: |
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          events = client.beta.task_run.events(run_id="run_id")
          for event in events:
              print(event)
      - lang: TypeScript
        source: |
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const events = await client.beta.taskRun.events(
              'run_id',
          );
          for await (const event of events) {
              console.log(event);
          }
  response:
    '200':
      text/event-stream:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - task_run.progress_stats
                    const: task_run.progress_stats
                    title: Type
                    description: Event type; always 'task_run.progress_stats'.
              source_stats:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskRunSourceStats'
                    description: Source stats describing progress so far.
              progress_meter:
                allOf:
                  - type: number
                    title: Progress Meter
                    description: >-
                      Completion percentage of the task run. Ranges from 0 to
                      100 where 0 indicates no progress and 100 indicates
                      completion.
            title: TaskRunProgressStatsEvent
            description: A progress update for a task run.
            refIdentifier: '#/components/schemas/TaskRunProgressStatsEvent'
            requiredProperties:
              - type
              - source_stats
              - progress_meter
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - task_run.progress_msg.plan
                      - task_run.progress_msg.search
                      - task_run.progress_msg.result
                      - task_run.progress_msg.tool_call
                      - task_run.progress_msg.exec_status
                    title: Type
                    description: Event type; always starts with 'task_run.progress_msg'.
              message:
                allOf:
                  - type: string
                    title: Message
                    description: Progress update message.
              timestamp:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Timestamp
                    description: Timestamp of the message.
            title: TaskRunProgressMessageEvent
            description: A message for a task run progress update.
            refIdentifier: '#/components/schemas/TaskRunProgressMessageEvent'
            requiredProperties:
              - type
              - message
              - timestamp
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - task_run.state
                    const: task_run.state
                    title: Type
                    description: Event type; always 'task_run.state'.
              event_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Event ID
                    description: >-
                      Cursor to resume the event stream. Always empty for non
                      Task Group runs.
              input:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/BetaTaskRunInput'
                      - type: 'null'
                    description: Input to the run; included only if requested.
              run:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskRun'
                    description: Task run object.
              output:
                allOf:
                  - anyOf:
                      - oneOf:
                          - $ref: '#/components/schemas/TaskRunTextOutput'
                          - $ref: '#/components/schemas/TaskRunJsonOutput'
                        discriminator:
                          propertyName: type
                          mapping:
                            json: '#/components/schemas/TaskRunJsonOutput'
                            text: '#/components/schemas/TaskRunTextOutput'
                      - type: 'null'
                    title: Output
                    description: >-
                      Output from the run; included only if requested and if
                      status == `completed`.
            title: TaskRunEvent
            description: |-
              Event when a task run transitions to a non-active status.

              May indicate completion, cancellation, or failure.
            refIdentifier: '#/components/schemas/TaskRunEvent'
            requiredProperties:
              - type
              - event_id
              - run
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - error
                    const: error
                    title: Type
                    description: Event type; always 'error'.
              error:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/Error'
                    description: Error.
            title: ErrorEvent
            description: Event indicating an error.
            refIdentifier: '#/components/schemas/ErrorEvent'
            requiredProperties:
              - type
              - error
        examples:
          example:
            value:
              type: task_run.progress_msg.plan
              message: Planning task...
              timestamp: '2025-04-23T20:21:48.037943Z'
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
    '404':
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
                message: Run id not found
        description: Run id not found
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
                message: Request validation error
        description: Request validation error
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
    Citation:
      properties:
        title:
          anyOf:
            - type: string
            - type: 'null'
          title: Title
          description: Title of the citation.
        url:
          type: string
          title: Url
          description: URL of the citation.
        excerpts:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Excerpts
          description: >-
            Excerpts from the citation supporting the output. Only certain
            processors provide excerpts.
      type: object
      required:
        - url
      title: Citation
      description: A citation for a task output.
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
    FieldBasis:
      properties:
        field:
          type: string
          title: Field
          description: Name of the output field.
        citations:
          items:
            $ref: '#/components/schemas/Citation'
          type: array
          title: Citations
          description: List of citations supporting the output field.
          default: []
        reasoning:
          type: string
          title: Reasoning
          description: Reasoning for the output field.
        confidence:
          anyOf:
            - type: string
            - type: 'null'
          title: Confidence
          description: >-
            Confidence level for the output field. Only certain processors
            provide confidence levels.
          examples:
            - low
            - medium
            - high
      type: object
      required:
        - field
        - reasoning
      title: FieldBasis
      description: Citations and reasoning supporting one field of a task output.
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
    TaskRun:
      properties:
        run_id:
          type: string
          title: Run ID
          description: ID of the task run.
          examples:
            - trun_e0083b6aac0544eb8686e8d2a76533d2
        status:
          type: string
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
          type: boolean
          title: Is Active
          description: >-
            Whether the run is currently active, i.e. status is one of
            {'cancelling', 'queued', 'running'}.
        warnings:
          anyOf:
            - items:
                $ref: '#/components/schemas/Warning'
              type: array
            - type: 'null'
          title: Warnings
          description: Warnings for the run, if any.
          examples:
            - []
        error:
          anyOf:
            - $ref: '#/components/schemas/Error'
            - type: 'null'
          description: Error for the run, present only if status is 'failed'.
        processor:
          type: string
          title: Processor
          description: Processor used for the run.
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
          description: User-provided metadata stored with the run.
          examples:
            - {}
        taskgroup_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Taskgroup ID
          description: ID of the taskgroup to which the run belongs.
        created_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Created At
          description: Timestamp of the creation of the task, as an RFC 3339 string.
          examples:
            - '2025-04-24T18:56:22.513132Z'
        modified_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Modified At
          description: >-
            Timestamp of the last modification to the task, as an RFC 3339
            string.
          examples:
            - '2025-04-24T18:56:22.513132Z'
      type: object
      required:
        - run_id
        - status
        - is_active
        - processor
        - created_at
        - modified_at
      title: TaskRun
      description: Status of a task run.
    TaskRunJsonOutput:
      properties:
        basis:
          items:
            $ref: '#/components/schemas/FieldBasis'
          type: array
          title: Basis
          description: Basis for each top-level field in the JSON output.
        type:
          type: string
          enum:
            - json
          const: json
          title: Type
          description: >-
            The type of output being returned, as determined by the output
            schema of the task spec.
        beta_fields:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Beta Fields
          description: >-
            Additional fields from beta features used in this task run. When
            beta features are specified during both task run creation and result
            retrieval, this field will be empty and instead the relevant beta
            attributes will be directly included in the `BetaTaskRunJsonOutput`
            or corresponding output type. However, if beta features were
            specified during task run creation but not during result retrieval,
            this field will contain the dump of fields from those beta features.

            Each key represents the beta feature version (one amongst
            parallel-beta headers) and the values correspond to the beta feature
            attributes, if any. For now, only MCP server beta features have
            attributes. For example, `{mcp-server-2025-07-17:
            [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`
        content:
          additionalProperties: true
          type: object
          title: Content
          description: >-
            Output from the task as a native JSON object, as determined by the
            output schema of the task spec.
        output_schema:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Output Schema
          description: >-
            Output schema for the Task Run. Populated only if the task was
            executed with an auto schema.
      type: object
      required:
        - basis
        - type
        - content
      title: TaskRunJsonOutput
      description: Output from a task that returns JSON.
    TaskRunSourceStats:
      properties:
        num_sources_considered:
          anyOf:
            - type: integer
            - type: 'null'
          title: Num Sources Considered
          description: Number of sources considered in processing the task.
        num_sources_read:
          anyOf:
            - type: integer
            - type: 'null'
          title: Num Sources Read
          description: Number of sources read in processing the task.
        sources_read_sample:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Sources Read Sample
          description: A sample of URLs of sources read in processing the task.
      type: object
      required:
        - num_sources_considered
        - num_sources_read
        - sources_read_sample
      title: TaskRunSourceStats
      description: Source stats for a task run.
    TaskRunTextOutput:
      properties:
        basis:
          items:
            $ref: '#/components/schemas/FieldBasis'
          type: array
          title: Basis
          description: Basis for the output. The basis has a single field 'output'.
        type:
          type: string
          enum:
            - text
          const: text
          title: Type
          description: >-
            The type of output being returned, as determined by the output
            schema of the task spec.
        beta_fields:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Beta Fields
          description: >-
            Additional fields from beta features used in this task run. When
            beta features are specified during both task run creation and result
            retrieval, this field will be empty and instead the relevant beta
            attributes will be directly included in the `BetaTaskRunJsonOutput`
            or corresponding output type. However, if beta features were
            specified during task run creation but not during result retrieval,
            this field will contain the dump of fields from those beta features.

            Each key represents the beta feature version (one amongst
            parallel-beta headers) and the values correspond to the beta feature
            attributes, if any. For now, only MCP server beta features have
            attributes. For example, `{mcp-server-2025-07-17:
            [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`
        content:
          type: string
          title: Content
          description: Text output from the task.
      type: object
      required:
        - basis
        - type
        - content
      title: TaskRunTextOutput
      description: Output from a task that returns text.
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
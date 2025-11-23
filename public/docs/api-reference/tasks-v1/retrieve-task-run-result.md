# Retrieve Task Run Result

> Retrieves a run result by run_id, blocking until the run is completed.

## OpenAPI

````yaml public-openapi.json get /v1/tasks/runs/{run_id}/result
paths:
  path: /v1/tasks/runs/{run_id}/result
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
      query:
        timeout:
          schema:
            - type: integer
              required: false
              title: Timeout
              default: 600
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
    body: {}
    codeSamples:
      - label: Beta params
        lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          # If task run has beta output fields
          task_run_result = client.beta.task_run.result(
              run_id="run_id",
              betas=["mcp-server-2025-07-17"]
          )
          print(task_run_result.output)
      - label: Beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          // If taskRun has beta output fields
          const taskRunResult = await client.beta.taskRun.result(
              'run_id',
              {
                  betas: ['mcp-server-2025-07-17'],
              },
          );
          console.log(taskRunResult.output);
      - label: Non-beta params
        lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          task_run_result = client.task_run.result(run_id="run_id")
          print(task_run_result.output)
      - label: Non-beta params
        lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const taskRunResult = await client.taskRun.result('run_id');
          console.log(taskRunResult.output);
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              run:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskRun'
                    description: Task run object with status 'completed'.
              output:
                allOf:
                  - oneOf:
                      - $ref: '#/components/schemas/TaskRunTextOutput'
                      - $ref: '#/components/schemas/TaskRunJsonOutput'
                    title: Output
                    description: Output from the task conforming to the output schema.
                    discriminator:
                      propertyName: type
                      mapping:
                        json: '#/components/schemas/TaskRunJsonOutput'
                        text: '#/components/schemas/TaskRunTextOutput'
            title: TaskRunResult
            description: Result of a task run.
            refIdentifier: '#/components/schemas/TaskRunResult'
            requiredProperties:
              - run
              - output
          - type: object
            properties:
              run:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskRun'
                    description: Beta task run object with status 'completed'.
              output:
                allOf:
                  - oneOf:
                      - $ref: '#/components/schemas/BetaTaskRunTextOutput'
                      - $ref: '#/components/schemas/BetaTaskRunJsonOutput'
                    title: Output
                    description: Output from the task conforming to the output schema.
                    discriminator:
                      propertyName: type
                      mapping:
                        json: '#/components/schemas/BetaTaskRunJsonOutput'
                        text: '#/components/schemas/BetaTaskRunTextOutput'
            title: BetaTaskRunResult
            description: >-
              Result of a beta task run. Available only if beta headers are
              specified.
            refIdentifier: '#/components/schemas/BetaTaskRunResult'
            requiredProperties:
              - run
              - output
        examples:
          example:
            value:
              run:
                run_id: trun_9907962f83aa4d9d98fd7f4bf745d654
                status: completed
                is_active: false
                processor: core
                metadata:
                  my_key: my_value
                created_at: '2025-04-23T20:21:48.037943Z'
                modified_at: '2025-04-23T20:21:48.037943Z'
              output:
                basis: []
                type: json
                content:
                  gdp: $3.1 trillion (2023)
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
                message: Run failed or run id not found
        description: Run failed or run id not found
    '408':
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
                message: Request timed out; run still active
        description: Request timed out; run still active
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
    BetaTaskRunJsonOutput:
      properties:
        basis:
          items:
            $ref: '#/components/schemas/FieldBasis'
          type: array
          title: Basis
          description: Basis for the output.
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
          description: Always None.
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
        mcp_tool_calls:
          anyOf:
            - items:
                $ref: '#/components/schemas/McpToolCall'
              type: array
            - type: 'null'
          title: Mcp Tool Calls
          description: MCP tool calls made by the task.
      type: object
      required:
        - basis
        - type
        - content
      title: BetaTaskRunJsonOutput
      description: Output from a task that returns JSON.
    BetaTaskRunTextOutput:
      properties:
        basis:
          items:
            $ref: '#/components/schemas/FieldBasis'
          type: array
          title: Basis
          description: Basis for the output.
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
          description: Always None.
        content:
          type: string
          title: Content
          description: Text output from the task.
        mcp_tool_calls:
          anyOf:
            - items:
                $ref: '#/components/schemas/McpToolCall'
              type: array
            - type: 'null'
          title: Mcp Tool Calls
          description: MCP tool calls made by the task.
      type: object
      required:
        - basis
        - type
        - content
      title: BetaTaskRunTextOutput
      description: Output from a task that returns text.
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
    McpToolCall:
      properties:
        tool_call_id:
          type: string
          title: Tool Call ID
          description: Identifier for the tool call.
        server_name:
          type: string
          title: Server Name
          description: Name of the MCP server.
        tool_name:
          type: string
          title: Tool Name
          description: Name of the tool being called.
        arguments:
          type: string
          title: Arguments
          description: Arguments used to call the MCP tool.
        content:
          anyOf:
            - type: string
            - type: 'null'
          title: Content
          description: Output received from the tool call, if successful.
        error:
          anyOf:
            - type: string
            - type: 'null'
          title: Error
          description: Error message if the tool call failed.
      type: object
      required:
        - tool_call_id
        - server_name
        - tool_name
        - arguments
      title: McpToolCall
      description: Result of an MCP tool call.
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

````
# Retrieve Task Group Run

> Retrieves run status by run_id.

This endpiont is equivalent to fetching run status directly using the
`retrieve()` method or the `tasks/runs` GET endpoint.

The run result is available from the `/result` endpoint.

## OpenAPI

````yaml public-openapi.json get /v1beta/tasks/groups/{taskgroup_id}/runs/{run_id}
paths:
  path: /v1beta/tasks/groups/{taskgroup_id}/runs/{run_id}
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
        taskgroup_id:
          schema:
            - type: string
              required: true
              title: Taskgroup Id
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
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          task_run = client.task_run.retrieve("run_id")
          print(task_run.status)
      - lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const taskRun = await client.taskRun.retrieve('run_id');
          console.log(taskRun.status);
  response:
    '200':
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
              status: running
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
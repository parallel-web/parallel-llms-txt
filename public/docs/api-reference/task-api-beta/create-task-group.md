# Create Task Group

> Initiates a TaskGroup to group and track multiple runs.

## OpenAPI

````yaml public-openapi.json post /v1beta/tasks/groups
paths:
  path: /v1beta/tasks/groups
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
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
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
                    description: User-provided metadata stored with the task group.
            required: true
            title: CreateTaskGroupRequest
            description: Request to create a task group.
            refIdentifier: '#/components/schemas/CreateTaskGroupRequest'
        examples:
          example:
            value:
              metadata: {}
    codeSamples:
      - lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          task_group = client.beta.task_group.create(metadata={"key": "value"})
          print(task_group.task_group_id)
      - lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const taskGroup = await client.beta.taskGroup.create({
              metadata: {'key': 'value'},
          });
          console.log(taskGroup.taskgroup_id);
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              taskgroup_id:
                allOf:
                  - type: string
                    title: Taskgroup ID
                    description: ID of the group.
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
                    description: User-provided metadata stored with the group.
              status:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/TaskGroupStatus'
                    description: Status of the group.
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Created At
                    description: >-
                      Timestamp of the creation of the group, as an RFC 3339
                      string.
                    examples:
                      - '2025-04-24T18:56:22.513132Z'
            title: TaskGroupResponse
            description: >-
              Response object for a task group, including its status and
              metadata.
            refIdentifier: '#/components/schemas/TaskGroupResponse'
            requiredProperties:
              - taskgroup_id
              - status
              - created_at
        examples:
          example:
            value:
              taskgroup_id: <string>
              metadata: {}
              status:
                num_task_runs: 123
                task_run_status_counts: {}
                is_active: true
                status_message: <string>
                modified_at: '2025-04-24T18:56:22.513132Z'
              created_at: '2025-04-24T18:56:22.513132Z'
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

````
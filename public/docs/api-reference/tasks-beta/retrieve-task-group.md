> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve Task Group

> Retrieves aggregated status across runs in a TaskGroup.



## OpenAPI

````yaml public-openapi.json get /v1beta/tasks/groups/{taskgroup_id}
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
  /v1beta/tasks/groups/{taskgroup_id}:
    get:
      tags:
        - Tasks (Beta)
      summary: Retrieve Task Group
      description: Retrieves aggregated status across runs in a TaskGroup.
      operationId: tasks_taskgroups_get_v1beta_tasks_groups__taskgroup_id__get
      parameters:
        - name: taskgroup_id
          in: path
          required: true
          schema:
            type: string
            title: Taskgroup Id
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskGroupResponse'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-code-samples:
        - lang: Python
          source: |-
            from parallel import Parallel

            client = Parallel(api_key="API Key")

            task_group = client.beta.task_group.retrieve("taskgroup_id")
            print(task_group.status)
        - lang: TypeScript
          source: |-
            import Parallel from "parallel-web";

            const client = new Parallel({ apiKey: 'API Key' });

            const taskGroup = await client.beta.taskGroup.retrieve(
                'taskgroup_id',
            );
            console.log(taskGroup.status);
components:
  schemas:
    TaskGroupResponse:
      properties:
        taskgroup_id:
          type: string
          title: Taskgroup ID
          description: ID of the group.
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
          description: User-provided metadata stored with the group.
        status:
          $ref: '#/components/schemas/TaskGroupStatus'
          description: Status of the group.
        created_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Created At
          description: Timestamp of the creation of the group, as an RFC 3339 string.
          examples:
            - '2025-04-24T18:56:22.513132Z'
      type: object
      required:
        - taskgroup_id
        - status
        - created_at
      title: TaskGroupResponse
      description: Response object for a task group, including its status and metadata.
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    TaskGroupStatus:
      properties:
        num_task_runs:
          type: integer
          title: Num Task Runs
          description: Number of task runs in the group.
        task_run_status_counts:
          additionalProperties:
            type: integer
          propertyNames:
            enum:
              - queued
              - action_required
              - running
              - completed
              - failed
              - cancelling
              - cancelled
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
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
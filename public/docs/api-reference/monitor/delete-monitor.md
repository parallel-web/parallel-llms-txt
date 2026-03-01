> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Monitor

> Delete a monitor.

Deletes a monitor, stopping all future executions. Deleted monitors can no
longer be updated or retrieved.



## OpenAPI

````yaml public-openapi.json delete /v1alpha/monitors/{monitor_id}
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
  /v1alpha/monitors/{monitor_id}:
    delete:
      tags:
        - Monitor
      summary: Delete Monitor
      description: >-
        Delete a monitor.


        Deletes a monitor, stopping all future executions. Deleted monitors can
        no

        longer be updated or retrieved.
      operationId: delete_monitor_v1alpha_monitors__monitor_id__delete
      parameters:
        - name: monitor_id
          in: path
          required: true
          schema:
            type: string
            title: Monitor Id
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MonitorResponse'
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
          description: Schedule not found
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: Schedule not found
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
components:
  schemas:
    MonitorResponse:
      properties:
        monitor_id:
          type: string
          title: Monitor ID
          description: ID of the monitor.
        query:
          type: string
          title: Query
          description: The query being monitored.
          examples:
            - Recent news about LLM models.
        status:
          type: string
          enum:
            - active
            - canceled
          title: Status
          description: Status of the monitor.
          examples:
            - active
            - canceled
        cadence:
          type: string
          enum:
            - daily
            - weekly
            - hourly
            - every_two_weeks
          title: Cadence
          description: Cadence of the monitor.
          examples:
            - daily
            - weekly
            - hourly
            - every_two_weeks
        metadata:
          anyOf:
            - additionalProperties:
                type: string
              type: object
            - type: 'null'
          title: Metadata
          description: User-provided metadata stored with the monitor.
          examples:
            - key: value
        webhook:
          anyOf:
            - $ref: '#/components/schemas/MonitorWebhook'
            - type: 'null'
          description: Webhook configuration for the monitor.
        output_schema:
          anyOf:
            - $ref: '#/components/schemas/JsonSchema'
            - type: 'null'
          description: Output schema for the monitor event.
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Timestamp of the creation of the monitor.
          examples:
            - '2025-01-15T10:30:00Z'
        last_run_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Last Run At
          description: Timestamp of the last run for the monitor.
          examples:
            - '2025-01-15T10:30:00Z'
      type: object
      required:
        - monitor_id
        - query
        - status
        - cadence
        - created_at
      title: MonitorResponse
      description: >-
        Response object for a monitor, including its status, cadence and
        metadata.
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
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    MonitorWebhook:
      properties:
        url:
          type: string
          title: Url
          description: URL for the webhook.
          examples:
            - https://example.com/webhook
        event_types:
          items:
            type: string
            enum:
              - monitor.event.detected
              - monitor.execution.completed
              - monitor.execution.failed
          type: array
          title: Event Types
          description: Event types to send the webhook notifications for.
      type: object
      required:
        - url
      title: MonitorWebhook
      description: Webhook configuration for a monitor.
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
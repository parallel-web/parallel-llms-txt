> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# List Events

> List events for a monitor from up to the last 300 event groups.

Retrieves events from the monitor, including events with errors and
material changes. The endpoint checks up to the specified lookback period or the
previous 300 event groups, whichever is less.

Events will be returned in reverse chronological order, with the most recent event groups
first. All events from an event group will be flattened out into individual entries
in the list.



## OpenAPI

````yaml public-openapi.json get /v1alpha/monitors/{monitor_id}/events
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
  /v1alpha/monitors/{monitor_id}/events:
    get:
      tags:
        - Monitor
      summary: List Events
      description: >-
        List events for a monitor from up to the last 300 event groups.


        Retrieves events from the monitor, including events with errors and

        material changes. The endpoint checks up to the specified lookback
        period or the

        previous 300 event groups, whichever is less.


        Events will be returned in reverse chronological order, with the most
        recent event groups

        first. All events from an event group will be flattened out into
        individual entries

        in the list.
      operationId: list_monitor_events_v1alpha_monitors__monitor_id__events_get
      parameters:
        - name: monitor_id
          in: path
          required: true
          schema:
            type: string
            title: Monitor Id
        - name: lookback_period
          in: query
          required: false
          schema:
            type: string
            description: >-
              Lookback period to fetch events from. Sample values: `10d`, `1w`.
              A minimum of 1 day is supported and with one day increments. Use
              `d` for days, `w` for weeks.
            default: 10d
            title: Lookback Period
          description: >-
            Lookback period to fetch events from. Sample values: `10d`, `1w`. A
            minimum of 1 day is supported and with one day increments. Use `d`
            for days, `w` for weeks.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MonitorEventList'
              example:
                events:
                  - type: event
                    event_group_id: mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24
                    output: New product launch announced
                    event_date: '2025-01-15'
                    source_urls:
                      - https://example.com/news
                    result:
                      type: text
                      content: New product launch announced
                  - type: completion
                    monitor_ts: completed_2025-01-15T10:30:00Z
                  - type: error
                    error: Error occurred while processing the event
                    id: error_2025-01-15T10:30:00Z
                    date: '2025-01-15T10:30:00Z'
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
    MonitorEventList:
      properties:
        events:
          items:
            oneOf:
              - $ref: '#/components/schemas/MonitorEventDetail'
              - $ref: '#/components/schemas/MonitorExecutionError'
              - $ref: '#/components/schemas/MonitorCompletion'
            discriminator:
              propertyName: type
              mapping:
                completion:
                  $ref: '#/components/schemas/MonitorCompletion'
                error:
                  $ref: '#/components/schemas/MonitorExecutionError'
                event:
                  $ref: '#/components/schemas/MonitorEventDetail'
          type: array
          title: Events
          description: List of execution events for the monitor.
      type: object
      required:
        - events
      title: MonitorEventList
      description: Response containing monitor execution history.
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
    MonitorEventDetail:
      properties:
        type:
          type: string
          enum:
            - event
          const: event
          title: Type
          description: Type of the event.
          default: event
        event_group_id:
          type: string
          title: Event Group Id
          description: Event group ID.
        output:
          type: string
          title: Output
          description: 'Detected change or event. Deprecated: use ''result'' field instead.'
          deprecated: true
        event_date:
          anyOf:
            - type: string
            - type: 'null'
          title: Event Date
          description: Date when event occurred.
          examples:
            - '2025-01-15'
        source_urls:
          items:
            type: string
          type: array
          title: Source Urls
          description: List of source URLs supporting the event.
          examples:
            - - https://example.com/news
        result:
          oneOf:
            - $ref: '#/components/schemas/MonitorEventTextResult'
            - $ref: '#/components/schemas/MonitorEventJsonResult'
          title: Result
          description: Output from the event. Either Text or JSON output.
          discriminator:
            propertyName: type
            mapping:
              json:
                $ref: '#/components/schemas/MonitorEventJsonResult'
              text:
                $ref: '#/components/schemas/MonitorEventTextResult'
      type: object
      required:
        - event_group_id
        - output
        - source_urls
        - result
      title: MonitorEventDetail
      description: Event response for a material change detected by a monitor.
    MonitorExecutionError:
      properties:
        type:
          type: string
          enum:
            - error
          const: error
          title: Type
          description: Type of the event.
          default: error
        error:
          type: string
          title: Error
          description: Human-readable error message.
        id:
          type: string
          title: Id
          description: Identifier for the error event.
        date:
          type: string
          format: date-time
          title: Date
          description: Timestamp when the error occurred.
      type: object
      required:
        - error
        - id
        - date
      title: MonitorExecutionError
      description: Error event for a monitor run.
    MonitorCompletion:
      properties:
        type:
          type: string
          enum:
            - completion
          const: completion
          title: Type
          description: Type of the event.
          default: completion
        monitor_ts:
          type: string
          title: Monitor Ts
          description: Identifier for the completed event.
          examples:
            - completed_2025-01-15T10:30:00Z
      type: object
      required:
        - monitor_ts
      title: MonitorCompletion
      description: Completion event for a monitor run.
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
    MonitorEventTextResult:
      properties:
        type:
          type: string
          enum:
            - text
          const: text
          title: Type
          description: Type of the result.
          default: text
        content:
          type: string
          title: Content
          description: Text content of the result.
      type: object
      required:
        - content
      title: MonitorEventTextResult
      description: Text result for a monitor event.
    MonitorEventJsonResult:
      properties:
        type:
          type: string
          enum:
            - json
          const: json
          title: Type
          description: Type of the result.
          default: json
        content:
          additionalProperties: true
          type: object
          title: Content
          description: JSON content of the result.
      type: object
      required:
        - content
      title: MonitorEventJsonResult
      description: JSON result for a monitor event.
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
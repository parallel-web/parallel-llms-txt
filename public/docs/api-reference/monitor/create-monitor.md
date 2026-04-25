> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Monitor

> Create a web monitor.

Creates a monitor that periodically runs the specified query over the web at the
specified cadence (hourly, daily, weekly, or every two weeks). The monitor runs once at
creation and then continues according to the specified frequency.

Updates will be sent to the webhook if provided. Use the `executions` endpoint
to retrieve execution history for a monitor.



## OpenAPI

````yaml /public-openapi.json post /v1alpha/monitors
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
  - name: Search
    description: >-
      Search returns ranked URLs with extended excerpts suitable for LLM
      consumption. Inputs are a natural-language objective and optional keyword
      queries. Source policies allow including or excluding specific domains and
      have configurable output sizes. The returned extended snippets contain
      dense, relevant information from relevant pages.

      - Result: ranked list with URL, title, and long text excerpts
  - name: Extract
    description: >-
      Extract returns excerpts or full content from one or more URLs. Inputs are
      a list of URLs and an optional search objective and keyword queries. The
      returned excerpts or full content is formatted as markdown and suitable
      for LLM consumption.

      - Result: excerpts or full content from the URL formatted as markdown
  - name: Tasks
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


      Task Groups enable batch execution of many independent Task runs with
      group-level monitoring and failure handling.

      - Submit hundreds or thousands of Tasks as a single group

      - Observe group progress and receive results as they complete

      - Real-time updates via Server-Sent Events (SSE)

      - Add tasks to an existing group while it is running

      - Group-level retry and error aggregation
  - name: FindAll
    description: >-
      The FindAll API discovers and evaluates entities that match complex
      criteria from natural language objectives. Submit a high-level goal and
      the service automatically generates structured match conditions, discovers
      relevant candidates, and evaluates each against the criteria. Returns
      comprehensive results with detailed reasoning, citations, and confidence
      scores for each match decision. Streaming events and webhooks are
      supported.
  - name: Monitor
    description: >-
      The Monitor API enables continuous web monitoring for material changes.
      Define monitoring queries with scheduled cadences (hourly, daily, weekly);
      the service periodically searches the web, detects changes, deduplicates
      events, and delivers notifications via webhooks or Slack.

      - Create, update, and delete monitors with custom output schemas

      - Retrieve detected events and event groups

      - Simulate events for testing
  - name: Chat API (Beta)
    description: >-
      The Chat API provides a programmatic chat-style text generation interface.
      It accepts a sequence of messages and returns model responses. Intended
      for assistant-like interactions and evaluation. Streaming responses are
      supported.
paths:
  /v1alpha/monitors:
    post:
      tags:
        - Monitor
      summary: Create Monitor
      description: >-
        Create a web monitor.


        Creates a monitor that periodically runs the specified query over the
        web at the

        specified cadence (hourly, daily, weekly, or every two weeks). The
        monitor runs once at

        creation and then continues according to the specified frequency.


        Updates will be sent to the webhook if provided. Use the `executions`
        endpoint

        to retrieve execution history for a monitor.
      operationId: create_monitor_v1alpha_monitors_post
      requestBody:
        required: true
        content:
          application/json:
            schema:
              anyOf:
                - $ref: '#/components/schemas/CreateMonitorRequest'
                - $ref: '#/components/schemas/DeprecatedCreateMonitorRequest'
              title: Req
      responses:
        '201':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MonitorResponse'
              example:
                monitor_id: monitor_b0079f70195e4258a3b982c1b6d8bd3a
                query: Extract recent news about AI
                status: active
                frequency: 1d
                metadata:
                  key: value
                webhook:
                  url: https://example.com/webhook
                  event_types:
                    - monitor.event.detected
                created_at: '2025-04-23T20:21:48.037943Z'
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
        '422':
          description: 'Unprocessable content: request validation error'
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: 'Unprocessable content: request validation error'
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    CreateMonitorRequest:
      properties:
        query:
          type: string
          title: Query
          description: Search query to monitor for material changes.
          examples:
            - Extract recent news about AI
        webhook:
          anyOf:
            - $ref: '#/components/schemas/MonitorWebhook'
            - type: 'null'
          description: Webhook to receive notifications about the monitor's execution.
        metadata:
          anyOf:
            - additionalProperties:
                type: string
              type: object
            - type: 'null'
          title: Metadata
          description: >-
            User-provided metadata stored with the monitor. Returned in webhook
            notifications and GET requests, enabling you to map responses to
            corresponding objects in your application.
          examples:
            - slack_thread_id: '1234567890.123456'
              user_id: U123ABC
        output_schema:
          anyOf:
            - $ref: '#/components/schemas/JsonSchema'
            - type: 'null'
          description: Output schema for the monitor event.
        include_backfill:
          type: boolean
          title: Include Backfill
          description: >-
            If true, the first execution includes historical events matching the
            query. Subsequent executions return only new events since the
            previous run.
          default: false
        source_policy:
          anyOf:
            - $ref: '#/components/schemas/SourcePolicy'
            - type: 'null'
          description: >-
            Source policy governing preferred and disallowed domains in web
            search results.
          examples:
            - exclude_domains:
                - reddit.com
                - x.com
                - .ai
              include_domains:
                - wikipedia.org
                - usa.gov
                - .edu
        frequency:
          type: string
          title: Frequency
          description: >-
            Frequency of the monitor. Format: '<number><unit>' where unit is 'h'
            (hours), 'd' (days), or 'w' (weeks). Must be between 1h and 30d
            (inclusive).
          examples:
            - 1d
            - 1w
            - 1h
            - 2w
      type: object
      required:
        - query
        - frequency
      title: CreateMonitorRequest
      description: Request to create a monitor.
    DeprecatedCreateMonitorRequest:
      properties:
        query:
          type: string
          title: Query
          description: Search query to monitor for material changes.
          examples:
            - Extract recent news about AI
        webhook:
          anyOf:
            - $ref: '#/components/schemas/MonitorWebhook'
            - type: 'null'
          description: Webhook to receive notifications about the monitor's execution.
        metadata:
          anyOf:
            - additionalProperties:
                type: string
              type: object
            - type: 'null'
          title: Metadata
          description: >-
            User-provided metadata stored with the monitor. Returned in webhook
            notifications and GET requests, enabling you to map responses to
            corresponding objects in your application.
          examples:
            - slack_thread_id: '1234567890.123456'
              user_id: U123ABC
        output_schema:
          anyOf:
            - $ref: '#/components/schemas/JsonSchema'
            - type: 'null'
          description: Output schema for the monitor event.
        include_backfill:
          type: boolean
          title: Include Backfill
          description: >-
            If true, the first execution includes historical events matching the
            query. Subsequent executions return only new events since the
            previous run.
          default: false
        source_policy:
          anyOf:
            - $ref: '#/components/schemas/SourcePolicy'
            - type: 'null'
          description: >-
            Source policy governing preferred and disallowed domains in web
            search results.
          examples:
            - exclude_domains:
                - reddit.com
                - x.com
                - .ai
              include_domains:
                - wikipedia.org
                - usa.gov
                - .edu
        cadence:
          type: string
          enum:
            - daily
            - weekly
            - hourly
            - every_two_weeks
          title: Cadence
          description: 'Cadence of the monitor. Deprecated: use ''frequency'' field instead.'
          examples:
            - daily
            - weekly
            - hourly
            - every_two_weeks
      type: object
      required:
        - query
        - cadence
      title: DeprecatedCreateMonitorRequest
      description: Request to create a monitor.
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
          anyOf:
            - type: string
              enum:
                - daily
                - weekly
                - hourly
                - every_two_weeks
            - type: 'null'
          title: Cadence
          description: 'Deprecated: use ''frequency'' field instead.'
          deprecated: true
          examples:
            - daily
            - weekly
            - hourly
            - every_two_weeks
        frequency:
          type: string
          title: Frequency
          description: >-
            Frequency of the monitor. Format: '<number><unit>' where unit is 'h'
            (hours), 'd' (days), or 'w' (weeks). Must be between 1h and 30d
            (inclusive).
          examples:
            - 1d
            - 1w
            - 1h
            - 2w
        metadata:
          anyOf:
            - additionalProperties:
                type: string
              type: object
            - type: 'null'
          title: Metadata
          description: >-
            User-provided metadata stored with the monitor. Returned in webhook
            notifications and GET requests, enabling you to map responses to
            corresponding objects in your application.
          examples:
            - slack_thread_id: '1234567890.123456'
              user_id: U123ABC
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
        source_policy:
          anyOf:
            - $ref: '#/components/schemas/SourcePolicy'
            - type: 'null'
          description: >-
            Source policy governing preferred and disallowed domains in web
            search results.
          examples:
            - exclude_domains:
                - reddit.com
                - x.com
                - .ai
              include_domains:
                - wikipedia.org
                - usa.gov
                - .edu
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
        include_backfill:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Include Backfill
          description: >-
            If true, the first execution includes historical events matching the
            query. Subsequent executions return only new events since the
            previous run.
      type: object
      required:
        - monitor_id
        - query
        - status
        - frequency
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
            starting with a period (e.g., .gov, .edu, .co.uk). The combined
            number of domains in include_domains and exclude_domains cannot
            exceed 200.
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
            starting with a period (e.g., .gov, .edu, .co.uk). The combined
            number of domains in include_domains and exclude_domains cannot
            exceed 200.
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
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
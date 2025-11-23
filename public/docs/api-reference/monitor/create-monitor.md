# Create Monitor

> Create a web monitor.

Creates a monitor that periodically runs the specified query over the web at the
specified cadence (hourly, daily, or weekly). The monitor runs once at creation and
then continues according to the specified frequency.

Updates will be sent to the webhook if provided. Use the `executions` endpoint
to retrieve execution history for a monitor.

## OpenAPI

````yaml public-openapi.json post /v1alpha/monitors
paths:
  path: /v1alpha/monitors
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
              query:
                allOf:
                  - type: string
                    title: Query
                    description: Search query to monitor for material changes.
                    examples:
                      - Extract recent news about AI
              cadence:
                allOf:
                  - type: string
                    enum:
                      - daily
                      - weekly
                      - hourly
                    title: Cadence
                    description: Cadence of the monitor.
                    examples:
                      - daily
                      - weekly
                      - hourly
              webhook:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/MonitorWebhook'
                      - type: 'null'
                    description: >-
                      Webhook to receive notifications about the monitor's
                      execution.
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties:
                          type: string
                        type: object
                      - type: 'null'
                    title: Metadata
                    description: >-
                      User-provided metadata stored with the monitor. This field
                      is returned in webhook notifications and GET requests,
                      enabling you to map responses to corresponding objects in
                      your application. For example, if you are building a
                      Slackbot that monitors changes, you could store the Slack
                      thread ID here to properly route webhook responses back to
                      the correct conversation thread.
                    examples:
                      - slack_thread_id: '1234567890.123456'
                        user_id: U123ABC
            required: true
            title: CreateMonitorRequest
            description: Request to create a monitor.
            refIdentifier: '#/components/schemas/CreateMonitorRequest'
            requiredProperties:
              - query
              - cadence
        examples:
          example:
            value:
              query: Extract recent news about AI
              cadence: daily
              webhook:
                url: https://example.com/webhook
                event_types:
                  - monitor.event.detected
              metadata:
                slack_thread_id: '1234567890.123456'
                user_id: U123ABC
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              monitor_id:
                allOf:
                  - type: string
                    title: Monitor ID
                    description: ID of the monitor.
              query:
                allOf:
                  - type: string
                    title: Query
                    description: The query being monitored.
                    examples:
                      - Recent news about LLM models.
              status:
                allOf:
                  - type: string
                    enum:
                      - active
                      - canceled
                    title: Status
                    description: Status of the monitor.
                    examples:
                      - active
                      - canceled
              cadence:
                allOf:
                  - type: string
                    enum:
                      - daily
                      - weekly
                      - hourly
                    title: Cadence
                    description: Cadence of the monitor.
                    examples:
                      - daily
                      - weekly
                      - hourly
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties:
                          type: string
                        type: object
                      - type: 'null'
                    title: Metadata
                    description: User-provided metadata stored with the monitor.
                    examples:
                      - key: value
              webhook:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/MonitorWebhook'
                      - type: 'null'
                    description: Webhook configuration for the monitor.
              created_at:
                allOf:
                  - type: string
                    format: date-time
                    title: Created At
                    description: Timestamp of the creation of the monitor.
                    examples:
                      - '2025-01-15T10:30:00Z'
              last_run_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Last Run At
                    description: Timestamp of the last run for the monitor.
                    examples:
                      - '2025-01-15T10:30:00Z'
            title: MonitorResponse
            description: >-
              Response object for a monitor, including its status, cadence and
              metadata.
            refIdentifier: '#/components/schemas/MonitorResponse'
            requiredProperties:
              - monitor_id
              - query
              - status
              - cadence
              - created_at
        examples:
          example:
            value:
              monitor_id: monitor_b0079f70195e4258a3b982c1b6d8bd3a
              query: Extract recent news about AI
              status: active
              cadence: daily
              metadata:
                key: value
              webhook:
                url: https://example.com/webhook
                event_types:
                  - monitor.event.detected
              created_at: '2025-04-23T20:21:48.037943Z'
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

````
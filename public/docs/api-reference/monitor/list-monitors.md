# List Monitors

> List active monitors.

Returns all monitors for the user, regardless of status. Each list item
contains the monitor configuration and current status.

## OpenAPI

````yaml public-openapi.json get /v1alpha/monitors
paths:
  path: /v1alpha/monitors
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
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: array
            items:
              allOf:
                - $ref: '#/components/schemas/MonitorResponse'
            title: Response 200 List Monitors V1Alpha Monitors Get
        examples:
          example:
            value:
              - monitor_id: monitor_b0079f70195e4258a3b982c1b6d8bd3a
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
              - monitor_id: monitor_b0179f70195e4258a3b982c1b6d8bd3a
                query: Extract recent news about AI
                status: cancelled
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
                  - type: string
                    enum:
                      - error
                    const: error
                    title: Type
                    description: Always 'error'.
              error:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/Error'
                    description: Error.
            title: ErrorResponse
            description: Response object used for non-200 status codes.
            refIdentifier: '#/components/schemas/ErrorResponse'
            requiredProperties:
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
    MonitorResponse:
      properties:
        monitor_id:
          type: string
          title: Monitor ID
          description: ID of the monitor.
        query:
          type: string
          title: Query
          description: The original query being monitored.
          examples:
            - Extract recent news about AI
        status:
          type: string
          enum:
            - active
            - cancelled
          title: Status
          description: Status of the monitor.
          examples:
            - active
            - cancelled
        cadence:
          type: string
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
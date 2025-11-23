# Delete Monitor

> Delete a monitor.

Deletes a monitor, stopping all future executions. Deleted monitors can no
longer be updated or retrieved.

## OpenAPI

````yaml public-openapi.json delete /v1alpha/monitors/{monitor_id}
paths:
  path: /v1alpha/monitors/{monitor_id}
  method: delete
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
        monitor_id:
          schema:
            - type: string
              required: true
              title: Monitor Id
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
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
              monitor_id: <string>
              query: Recent news about LLM models.
              status: active
              cadence: daily
              metadata:
                key: value
              webhook:
                url: https://example.com/webhook
                event_types:
                  - monitor.event.detected
              created_at: '2025-01-15T10:30:00Z'
              last_run_at: '2025-01-15T10:30:00Z'
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
                message: Schedule not found
        description: Schedule not found
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
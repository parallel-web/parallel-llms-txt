# Retrieve Execution History

> Retrieve execution history for a monitor (up to 300 runs).

Retrieves successful execution events from monitor runs, including events with
material changes. The endpoint checks up to the specified lookback period or the
previous 300 runs, whichever is less.

Events will be returned in reverse chronological order, with the most recent runs
first. If an execution has a material change, outputs will also be included.

Args:
    lookback_period: Lookback period to fetch events from.
    Sample values: "10d", "1w". A minimum of 1 day is supported
    and with one day increments. Use "d" for days, "w" for weeks.

## OpenAPI

````yaml public-openapi.json get /v1alpha/monitors/{monitor_id}/executions
paths:
  path: /v1alpha/monitors/{monitor_id}/executions
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
        monitor_id:
          schema:
            - type: string
              required: true
              title: Monitor Id
      query:
        lookback_period:
          schema:
            - type: string
              required: false
              title: Lookback Period
              default: 10d
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              events:
                allOf:
                  - items:
                      anyOf:
                        - $ref: '#/components/schemas/MonitorEventUpdate'
                        - $ref: '#/components/schemas/MonitorExecutionError'
                        - $ref: '#/components/schemas/MonitorExecutionCompletion'
                    type: array
                    title: Events
                    description: List of execution events for the monitor.
            title: MonitorExecutionHistory
            description: Response containing monitor execution history.
            refIdentifier: '#/components/schemas/MonitorExecutionHistory'
            requiredProperties:
              - events
        examples:
          example:
            value:
              events:
                - monitor_run_id: event_2025-01-15T10:30:00Z
                  output: New product launch announced
                  event_date: '2025-01-15'
                  source_urls:
                    - https://example.com/news
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
    MonitorEventUpdate:
      properties:
        monitor_run_id:
          type: string
          title: Monitor Run Id
          description: Identifier for the monitor run producing this event.
          examples:
            - event_2025-01-15T10:30:00Z
        output:
          type: string
          title: Output
          description: Detected change or event.
        event_date:
          anyOf:
            - type: string
            - type: 'null'
          title: Event Date
          description: Date of execution.
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
      type: object
      required:
        - monitor_run_id
        - output
        - source_urls
      title: MonitorEventUpdate
      description: Event signalling a material update for a monitor run.
    MonitorExecutionCompletion:
      properties:
        monitor_run_id:
          type: string
          title: Monitor Run Id
          description: Identifier for the completed event.
          examples:
            - completed_2025-01-15T10:30:00Z
      type: object
      required:
        - monitor_run_id
      title: MonitorExecutionCompletion
      description: Completion event for a monitor run.
    MonitorExecutionError:
      properties:
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

````
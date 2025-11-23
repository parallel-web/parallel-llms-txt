# Retrieve Event Group

> Retrieve an event group for a monitor.

Each list item in the response will have type `event`.

## OpenAPI

````yaml public-openapi.json get /v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}
paths:
  path: /v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}
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
        event_group_id:
          schema:
            - type: string
              required: true
              title: Event Group Id
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
              events:
                allOf:
                  - items:
                      oneOf:
                        - $ref: '#/components/schemas/MonitorEventDetail'
                        - $ref: '#/components/schemas/MonitorExecutionError'
                        - $ref: '#/components/schemas/MonitorCompletion'
                      discriminator:
                        propertyName: type
                        mapping:
                          completion: '#/components/schemas/MonitorCompletion'
                          error: '#/components/schemas/MonitorExecutionError'
                          event: '#/components/schemas/MonitorEventDetail'
                    type: array
                    title: Events
                    description: List of execution events for the monitor.
            title: MonitorEventList
            description: Response containing monitor execution history.
            refIdentifier: '#/components/schemas/MonitorEventList'
            requiredProperties:
              - events
        examples:
          example:
            value:
              events:
                - type: event
                  event_group_id: mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24
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
                message: Event group not found
        description: Event group not found
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
          description: Detected change or event.
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
      type: object
      required:
        - event_group_id
        - output
        - source_urls
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

````
# Create FindAll Run

> Starts a FindAll run.

This endpoint immediately returns a FindAll run object with status set to 'queued'.
You can get the run result snapshot using the GET /v1beta/findall/runs/{findall_id}/result endpoint.
You can track the progress of the run by:
- Polling the status using the GET /v1beta/findall/runs/{findall_id} endpoint,
- Subscribing to real-time updates via the /v1beta/findall/runs/{findall_id}/events
endpoint,
- Or specifying a webhook with relevant event types during run creation to receive
notifications.

## OpenAPI

````yaml public-openapi.json post /v1beta/findall/runs
paths:
  path: /v1beta/findall/runs
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
      header:
        parallel-beta:
          schema:
            - type: string
              required: false
              title: Parallel-Beta
            - type: 'null'
              required: false
              title: Parallel-Beta
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              objective:
                allOf:
                  - type: string
                    title: Objective
                    description: Natural language objective of the FindAll run.
              entity_type:
                allOf:
                  - type: string
                    title: Entity Type
                    description: Type of the entity for the FindAll run.
              match_conditions:
                allOf:
                  - items:
                      $ref: '#/components/schemas/MatchCondition'
                    type: array
                    title: Match Conditions
                    description: List of match conditions for the FindAll run.
              generator:
                allOf:
                  - type: string
                    enum:
                      - base
                      - core
                      - pro
                      - preview
                    title: Generator
                    description: >-
                      Generator for the FindAll run. One of base, core, pro,
                      preview.
              match_limit:
                allOf:
                  - type: integer
                    title: Match Limit
                    description: >-
                      Maximum number of matches to find for this FindAll run.
                      Must be between 5 and 1000 (inclusive).
              exclude_list:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/ExcludeCandidate'
                        type: array
                      - type: 'null'
                    title: Exclude List
                    description: List of entity names/IDs to exclude from results.
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
                    description: Metadata for the FindAll run.
              webhook:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/Webhook'
                      - type: 'null'
                    description: Webhook for the FindAll run.
            required: true
            title: FindAllRunInput
            description: Input model for FindAll run.
            refIdentifier: '#/components/schemas/FindAllRunInput'
            requiredProperties:
              - objective
              - entity_type
              - match_conditions
              - generator
              - match_limit
        examples:
          example:
            value:
              objective: <string>
              entity_type: <string>
              match_conditions:
                - name: <string>
                  description: >-
                    Company must have SOC2 Type II certification (not Type I).
                    Look for evidence in: trust centers, security/compliance
                    pages, audit reports, or press releases specifically
                    mentioning 'SOC2 Type II'. If no explicit SOC2 Type II
                    mention is found, consider requirement not satisfied.
              generator: base
              match_limit: 123
              exclude_list:
                - name: <string>
                  url: <string>
              metadata: {}
              webhook:
                url: <string>
                event_types: []
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              findall_id:
                allOf:
                  - type: string
                    title: FindAll ID
                    description: ID of the FindAll run.
              status:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/FindAllRunStatus'
                    description: Status object for the FindAll run.
              generator:
                allOf:
                  - type: string
                    enum:
                      - base
                      - core
                      - pro
                      - preview
                    title: Generator
                    description: Generator for the FindAll run.
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
                    description: Metadata for the FindAll run.
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Created At
                    description: Timestamp of the creation of the run, in RFC 3339 format.
              modified_at:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Modified At
                    description: >-
                      Timestamp of the latest modification to the FindAll run
                      result, in RFC 3339 format.
            title: FindAllRun
            description: FindAll run object with status and metadata.
            refIdentifier: '#/components/schemas/FindAllRun'
            requiredProperties:
              - findall_id
              - status
              - generator
        examples:
          example:
            value:
              findall_id: findall_56ccc4d188fb41a0803a935cf485c774
              status:
                status: queued
                is_active: true
                metrics:
                  generated_candidates_count: 0
                  matched_candidates_count: 0
              generator: base
              metadata: {}
              created_at: '2025-09-10T21:02:08.626446Z'
              modified_at: '2025-09-10T21:02:08.627376Z'
        description: Successful Response
    '402':
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
                message: 'Payment required: insufficient credit in account'
        description: 'Payment required: insufficient credit in account'
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
    '429':
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
                message: 'Too many requests: quota temporarily exceeded'
        description: 'Too many requests: quota temporarily exceeded'
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
    ExcludeCandidate:
      properties:
        name:
          type: string
          title: Name
          description: Name of the entity to exclude from results.
        url:
          type: string
          title: Url
          description: URL of the entity to exclude from results.
      type: object
      required:
        - name
        - url
      title: ExcludeCandidate
      description: Exclude candidate input model for FindAll run.
    FindAllCandidateMetrics:
      properties:
        generated_candidates_count:
          type: integer
          title: Generated Candidates Count
          description: Number of candidates that were selected.
          default: 0
        matched_candidates_count:
          type: integer
          title: Matched Candidates Count
          description: Number of candidates that evaluated to matched.
          default: 0
      type: object
      title: FindAllCandidateMetrics
      description: Metrics object for FindAll run.
    FindAllRunStatus:
      properties:
        status:
          type: string
          enum:
            - queued
            - action_required
            - running
            - completed
            - failed
            - cancelling
            - cancelled
          title: Status
          description: Status of the FindAll run.
        is_active:
          type: boolean
          title: Is Active
          description: Whether the FindAll run is active
        metrics:
          allOf:
            - $ref: '#/components/schemas/FindAllCandidateMetrics'
          description: Candidate metrics for the FindAll run.
        termination_reason:
          anyOf:
            - type: string
              enum:
                - low_match_rate
                - match_limit_met
                - candidates_exhausted
                - user_cancelled
                - error_occurred
                - timeout
            - type: 'null'
          title: Termination Reason
          description: Reason for termination when FindAll run is in terminal status.
      type: object
      required:
        - status
        - is_active
        - metrics
      title: FindAllRunStatus
      description: Status object for FindAll run.
    MatchCondition:
      properties:
        name:
          type: string
          title: Name
          description: Name of the match condition.
        description:
          type: string
          title: Description
          description: >-
            Detailed description of the match condition. Include as much
            specific information as possible to help improve the quality and
            accuracy of Find All run results.
          examples:
            - >-
              Company must have SOC2 Type II certification (not Type I). Look
              for evidence in: trust centers, security/compliance pages, audit
              reports, or press releases specifically mentioning 'SOC2 Type II'.
              If no explicit SOC2 Type II mention is found, consider requirement
              not satisfied.
      type: object
      required:
        - name
        - description
      title: MatchCondition
      description: Match condition model for FindAll ingest.
    Webhook:
      properties:
        url:
          type: string
          title: Url
          description: URL for the webhook.
        event_types:
          items:
            type: string
            enum:
              - task_run.status
          type: array
          title: Event Types
          description: Event types to send the webhook notifications for.
          default: []
      type: object
      required:
        - url
      title: Webhook
      description: Webhooks for Task Runs.

````
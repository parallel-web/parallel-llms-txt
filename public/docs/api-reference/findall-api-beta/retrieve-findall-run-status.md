# Retrieve FindAll Run Status

> Retrieve a FindAll run.

## OpenAPI

````yaml public-openapi.json get /v1beta/findall/runs/{findall_id}
paths:
  path: /v1beta/findall/runs/{findall_id}
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
        findall_id:
          schema:
            - type: string
              required: true
              title: Findall Id
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
    body: {}
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
              findall_id: <string>
              status:
                status: queued
                is_active: true
                metrics:
                  generated_candidates_count: 0
                  matched_candidates_count: 0
                termination_reason: <string>
              generator: base
              metadata: {}
              created_at: <string>
              modified_at: <string>
        description: Successful Response
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
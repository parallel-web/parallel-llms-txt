# Stream FindAll Events

> Stream events from a FindAll run.

Args:
    request: The Shapi request
    findall_id: The FindAll run ID
    last_event_id: Optional event ID to resume from.
    timeout: Optional timeout in seconds. If None, keep connection alive
    as long as the run is going. If set, stop after specified duration.

## OpenAPI

````yaml public-openapi.json get /v1beta/findall/runs/{findall_id}/events
paths:
  path: /v1beta/findall/runs/{findall_id}/events
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
      query:
        last_event_id:
          schema:
            - type: string
              required: false
              title: Last Event Id
            - type: 'null'
              required: false
              title: Last Event Id
        timeout:
          schema:
            - type: number
              required: false
              title: Timeout
            - type: 'null'
              required: false
              title: Timeout
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      text/event-stream:
        schemaArray:
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - findall.schema.updated
                    const: findall.schema.updated
                    title: Type
                    description: Event type; always 'findall.schema.updated'.
              timestamp:
                allOf:
                  - type: string
                    format: date-time
                    title: Timestamp
                    description: Timestamp of the event.
              event_id:
                allOf:
                  - type: string
                    title: Event Id
                    description: Unique event identifier for the event.
              data:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/FindAllSchema'
                    description: Updated FindAll schema.
            title: FindAllSchemaUpdatedEvent
            description: Event containing full snapshot of FindAll run state.
            refIdentifier: '#/components/schemas/FindAllSchemaUpdatedEvent'
            requiredProperties:
              - type
              - timestamp
              - event_id
              - data
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - findall.status
                    const: findall.status
                    title: Type
                    description: Event type; always 'findall.status'.
              timestamp:
                allOf:
                  - type: string
                    format: date-time
                    title: Timestamp
                    description: Timestamp of the event.
              event_id:
                allOf:
                  - type: string
                    title: Event Id
                    description: Unique event identifier for the event.
              data:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/FindAllRun'
                    description: Updated FindAll run information.
            title: FindAllRunStatusEvent
            description: Event containing status update for FindAll run.
            refIdentifier: '#/components/schemas/FindAllRunStatusEvent'
            requiredProperties:
              - type
              - timestamp
              - event_id
              - data
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - findall.candidate.generated
                      - findall.candidate.matched
                      - findall.candidate.unmatched
                      - findall.candidate.discarded
                      - findall.candidate.enriched
                    title: Type
                    description: >-
                      Event type; one of findall.candidate.generated,
                      findall.candidate.matched, findall.candidate.unmatched,
                      findall.candidate.discarded, findall.candidate.enriched.
              timestamp:
                allOf:
                  - type: string
                    format: date-time
                    title: Timestamp
                    description: Timestamp of the event.
              event_id:
                allOf:
                  - type: string
                    title: Event Id
                    description: Unique event identifier for the event.
              data:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/FindAllCandidate'
                    description: The candidate whose match status has been updated.
            title: FindAllCandidateMatchStatusEvent
            description: Event containing a candidate whose match status has changed.
            refIdentifier: '#/components/schemas/FindAllCandidateMatchStatusEvent'
            requiredProperties:
              - type
              - timestamp
              - event_id
              - data
          - type: object
            properties:
              type:
                allOf:
                  - type: string
                    enum:
                      - error
                    const: error
                    title: Type
                    description: Event type; always 'error'.
              error:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/Error'
                    description: Error.
            title: ErrorEvent
            description: Event indicating an error.
            refIdentifier: '#/components/schemas/ErrorEvent'
            requiredProperties:
              - type
              - error
        examples:
          example:
            value:
              type: findall.candidate.generated
              timestamp: '2025-09-10T21:02:08.626446Z'
              event_id: 56cee734dbc84172bfc491327f2a0183
              data:
                candidate_id: candidate_52e1e30b-4e0a-49d8-82eb-79e64e0ed015
                name: Pika
                url: pika.art
                description: >-
                  Pika is an AI video generation platform that creates and edits
                  videos from text prompts or images.
                match_status: generated
        description: Successful Response
    '404':
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
                message: FindAll run not found
        description: FindAll run not found
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
    Citation:
      properties:
        title:
          anyOf:
            - type: string
            - type: 'null'
          title: Title
          description: Title of the citation.
        url:
          type: string
          title: Url
          description: URL of the citation.
        excerpts:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Excerpts
          description: >-
            Excerpts from the citation supporting the output. Only certain
            processors provide excerpts.
      type: object
      required:
        - url
      title: Citation
      description: A citation for a task output.
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
    FieldBasis:
      properties:
        field:
          type: string
          title: Field
          description: Name of the output field.
        citations:
          items:
            $ref: '#/components/schemas/Citation'
          type: array
          title: Citations
          description: List of citations supporting the output field.
          default: []
        reasoning:
          type: string
          title: Reasoning
          description: Reasoning for the output field.
        confidence:
          anyOf:
            - type: string
            - type: 'null'
          title: Confidence
          description: >-
            Confidence level for the output field. Only certain processors
            provide confidence levels.
          examples:
            - low
            - medium
            - high
      type: object
      required:
        - field
        - reasoning
      title: FieldBasis
      description: Citations and reasoning supporting one field of a task output.
    FindAllCandidate:
      properties:
        candidate_id:
          type: string
          title: Candidate ID
          description: ID of the candidate.
        name:
          type: string
          title: Name
          description: Name of the candidate.
        url:
          type: string
          title: Url
          description: >-
            URL that provides context or details of the entity for
            disambiguation.
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
          description: >-
            Brief description of the entity that can help answer whether entity
            satisfies the query.
        match_status:
          type: string
          enum:
            - generated
            - matched
            - unmatched
            - discarded
          title: Match Status
          description: >-
            Status of the candidate. One of generated, matched, unmatched,
            discarded.
        output:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Output
          description: >-
            Results of the match condition evaluations for this candidate. This
            object contains the structured output that determines whether the
            candidate matches the overall FindAll objective.
        basis:
          anyOf:
            - items:
                $ref: '#/components/schemas/FieldBasis'
              type: array
            - type: 'null'
          title: Basis
          description: List of FieldBasis objects supporting the output.
      type: object
      required:
        - candidate_id
        - name
        - url
        - match_status
      title: FindAllCandidate
      description: >-
        Candidate for a find all run that may end up as a match.


        Contains all the candidate's metadata and the output of the match
        conditions.

        A candidate is a match if all match conditions are satisfied.
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
    FindAllRun:
      properties:
        findall_id:
          type: string
          title: FindAll ID
          description: ID of the FindAll run.
        status:
          allOf:
            - $ref: '#/components/schemas/FindAllRunStatus'
          description: Status object for the FindAll run.
        generator:
          type: string
          enum:
            - base
            - core
            - pro
            - preview
          title: Generator
          description: Generator for the FindAll run.
        metadata:
          anyOf:
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
          anyOf:
            - type: string
            - type: 'null'
          title: Created At
          description: Timestamp of the creation of the run, in RFC 3339 format.
        modified_at:
          anyOf:
            - type: string
            - type: 'null'
          title: Modified At
          description: >-
            Timestamp of the latest modification to the FindAll run result, in
            RFC 3339 format.
      type: object
      required:
        - findall_id
        - status
        - generator
      title: FindAllRun
      description: FindAll run object with status and metadata.
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
    FindAllSchema:
      properties:
        objective:
          type: string
          title: Objective
          description: Natural language objective of the FindAll run.
          examples:
            - Find all AI companies that raised Series A funding in 2024
        entity_type:
          type: string
          title: Entity Type
          description: Type of the entity for the FindAll run.
        match_conditions:
          items:
            $ref: '#/components/schemas/MatchCondition'
          type: array
          title: Match Conditions
          description: List of match conditions for the FindAll run.
        enrichment_output_schema:
          anyOf:
            - $ref: '#/components/schemas/JsonSchema'
            - type: 'null'
          description: JSON schema for the enrichment output schema for the FindAll run.
      type: object
      required:
        - objective
        - entity_type
        - match_conditions
      title: FindAllSchema
      description: Response model for FindAll ingest.
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
          enum:
            - json
          const: json
          title: Type
          description: The type of schema being defined. Always `json`.
          default: json
      type: object
      required:
        - json_schema
      title: JsonSchema
      description: JSON schema for a task input or output.
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
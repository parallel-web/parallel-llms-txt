# FindAll Run Result

> Retrieve the FindAll run result at the time of the request.

## OpenAPI

````yaml public-openapi.json get /v1beta/findall/runs/{findall_id}/result
paths:
  path: /v1beta/findall/runs/{findall_id}/result
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
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              run:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/FindAllRun'
                    description: FindAll run object.
              candidates:
                allOf:
                  - items:
                      $ref: '#/components/schemas/FindAllCandidate'
                    type: array
                    title: Candidates
                    description: All evaluated candidates at the time of the snapshot.
              last_event_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Last Event Id
                    description: >-
                      ID of the last event of the run at the time of the
                      request. This can be used to resume streaming from the
                      last event.
            title: FindAllRunResult
            description: >-
              Complete FindAll search results.


              Represents a snapshot of a FindAll run, including run metadata and
              a list of

              candidate entities with their match status and details at the time
              the snapshot was

              taken.
            refIdentifier: '#/components/schemas/FindAllRunResult'
            requiredProperties:
              - run
              - candidates
        examples:
          example:
            value:
              run:
                findall_id: findall_56ccc4d188fb41a0803a935cf485c774
                status:
                  status: running
                  is_active: true
                  metrics:
                    generated_candidates_count: 1
                    matched_candidates_count: 1
                generator: base
                metadata: {}
                created_at: '2025-09-10T21:02:08.626446Z'
                modified_at: '2025-09-10T21:02:08.627376Z'
              candidates:
                - candidate_id: candidate_7594eb7c-4f4a-487f-9d0c-9d1e63ec240c
                  name: Cognition AI
                  url: cognition.ai
                  match_status: matched
                  output:
                    developing_ai_products_check: 'yes'
                    raised_series_a_2024_check: 'yes'
                  basis:
                    - field: developing_ai_products_check
                      citations:
                        - title: Cognition - Devin and Cognition AI
                          url: https://cognition.ai/
                          excerpts:
                            - >-
                              We're the makers of Devin, a collaborative AI
                              teammate that helps ambitious engineering teams
                              achieve more.
                            - >-
                              An applied AI lab building the future of software
                              engineering
                            - Cognition
                      reasoning: >-
                        The search results repeatedly state that Cognition AI is
                        an 'applied AI lab building the future of software
                        engineering' and that they developed 'Devin AI',
                        described as the 'world's first AI software engineer'.
                        This directly confirms they are developing AI products.
                      confidence: high
                    - field: raised_series_a_2024_check
                      citations:
                        - title: >-
                            Cognition Labs Raises $21 Million Series A to
                            Support AI Coding Products
                          url: >-
                            https://voicebot.ai/2024/04/25/cognition-labs-raises-21-million-series-a-to-support-ai-coding-products/
                          excerpts:
                            - >-
                              Cognition Labs Raises $21 Million Series A to
                              Support AI Coding Products
                      reasoning: >-
                        The article from voicebot.ai, dated April 25, 2024,
                        states that Founders Fund led a "$21 million Series A
                        investment" for Cognition Labs. This confirms that
                        Series A funding was raised in 2024.
                      confidence: low
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
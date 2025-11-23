# Add Enrichment to FindAll Run

> Add an enrichment to a FindAll run.

## OpenAPI

````yaml public-openapi.json post /v1beta/findall/runs/{findall_id}/enrich
paths:
  path: /v1beta/findall/runs/{findall_id}/enrich
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              processor:
                allOf:
                  - &ref_3
                    type: string
                    title: Processor
                    description: Processor to use for the task.
                    default: core
              output_schema:
                allOf:
                  - &ref_4
                    allOf:
                      - $ref: '#/components/schemas/JsonSchema'
                    description: >-
                      JSON schema for the enrichment output schema for the
                      FindAll run.
              mcp_servers:
                allOf:
                  - &ref_5
                    anyOf:
                      - items:
                          $ref: '#/components/schemas/McpServer'
                        type: array
                      - type: 'null'
                    title: Mcp Servers
                    description: List of MCP servers to use for the task.
            required: true
            title: FindAllEnrichInput
            description: Input model for FindAll enrich.
            refIdentifier: '#/components/schemas/FindAllEnrichInput'
            requiredProperties: &ref_6
              - output_schema
        examples:
          example:
            value:
              processor: core
              output_schema:
                json_schema:
                  additionalProperties: false
                  properties:
                    gdp:
                      description: >-
                        GDP in USD for the year, formatted like '$3.1 trillion
                        (2023)'
                      type: string
                  required:
                    - gdp
                  type: object
                type: json
              mcp_servers:
                - type: url
                  url: <string>
                  headers: {}
                  name: <string>
                  allowed_tools:
                    - <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              objective:
                allOf:
                  - type: string
                    title: Objective
                    description: Natural language objective of the FindAll run.
                    examples:
                      - >-
                        Find all AI companies that raised Series A funding in
                        2024
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
              enrichments:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/FindAllEnrichInput'
                        type: array
                      - type: 'null'
                    title: Enrichments
                    description: List of enrichment inputs for the FindAll run.
              generator:
                allOf:
                  - type: string
                    enum:
                      - base
                      - core
                      - pro
                      - preview
                    title: Generator
                    description: The generator of the FindAll run.
                    default: core
              match_limit:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Match Limit
                    description: Max number of candidates to evaluate
            title: FindAllSchema
            description: Response model for FindAll ingest.
            refIdentifier: '#/components/schemas/FindAllSchema'
            requiredProperties:
              - objective
              - entity_type
              - match_conditions
        examples:
          example:
            value:
              objective: Find all AI companies that raised Series A funding in 2024
              entity_type: companies
              match_conditions:
                - name: developing_ai_products_check
                  description: >-
                    Company must be developing artificial intelligence (AI)
                    products
              enrichments:
                - processor: core
                  output_schema:
                    json_schema:
                      type: object
                      properties:
                        ceo_name:
                          type: string
                          description: >-
                            Name of the current CEO of the company. If the CEO
                            is not publicly known, provide the name of the
                            highest-ranking executive or founder. If no
                            information is available, return null.
                    type: json
              generator: core
              match_limit: 50
        description: Successful Response
    '404':
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
                message: FindAll run not found
        description: FindAll run not found
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
                message: Validation error
        description: Validation error
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
    FindAllEnrichInput:
      properties:
        processor: *ref_3
        output_schema: *ref_4
        mcp_servers: *ref_5
      type: object
      required: *ref_6
      title: FindAllEnrichInput
      description: Input model for FindAll enrich.
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
    McpServer:
      properties:
        type:
          type: string
          enum:
            - url
          const: url
          title: Type
          description: Type of MCP server being configured. Always `url`.
          default: url
        url:
          type: string
          title: Url
          description: URL of the MCP server.
        headers:
          anyOf:
            - additionalProperties:
                type: string
                format: password
                writeOnly: true
              type: object
            - type: 'null'
          title: Headers
          description: Headers for the MCP server.
        name:
          type: string
          title: Name
          description: Name of the MCP server.
        allowed_tools:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Allowed Tools
          description: List of allowed tools for the MCP server.
      type: object
      required:
        - url
        - name
      title: McpServer
      description: MCP server configuration.

````
# Ingest FindAll Run

> Transforms a natural language search objective into a structured FindAll spec.

Note: Access to this endpoint requires the parallel-beta header.

The generated specification serves as a suggested starting point and can be further
customized by the user.

## OpenAPI

````yaml public-openapi.json post /v1beta/findall/ingest
paths:
  path: /v1beta/findall/ingest
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
                    description: Natural language objective to create a FindAll run spec.
                    examples:
                      - >-
                        Find all AI companies that raised Series A funding in
                        2024
            required: true
            title: IngestInput
            description: Input model for FindAll ingest.
            refIdentifier: '#/components/schemas/IngestInput'
            requiredProperties:
              - objective
        examples:
          example:
            value:
              objective: Find all AI companies that raised Series A funding in 2024
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
                - name: raised_series_a_2024_check
                  description: Company must have raised Series A funding in 2024
              generator: core
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
    FindAllEnrichInput:
      properties:
        processor:
          type: string
          title: Processor
          description: Processor to use for the task.
          default: core
        output_schema:
          allOf:
            - $ref: '#/components/schemas/JsonSchema'
          description: JSON schema for the enrichment output schema for the FindAll run.
        mcp_servers:
          anyOf:
            - items:
                $ref: '#/components/schemas/McpServer'
              type: array
            - type: 'null'
          title: Mcp Servers
          description: List of MCP servers to use for the task.
      type: object
      required:
        - output_schema
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
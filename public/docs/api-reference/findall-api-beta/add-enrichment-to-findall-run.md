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
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              processor:
                allOf:
                  - type: string
                    title: Processor
                    description: Processor to use for the task.
                    examples:
                      - base
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
                    description: >-
                      User-provided metadata stored with the run. Keys and
                      values must be strings with a maximum length of 16 and 512
                      characters respectively.
              source_policy:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/SourcePolicy'
                      - type: 'null'
                    description: >-
                      Optional source policy governing preferred and disallowed
                      domains in web search results.
              mcp_servers:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/McpServer'
                        type: array
                      - type: 'null'
                    title: Mcp Servers
                    description: >-
                      Optional list of MCP servers to use for the run.

                      To enable this feature in your requests, specify
                      `mcp-server-2025-07-17` as one of the values in
                      `parallel-beta` header (for API calls) or `betas` param
                      (for the SDKs).
              enable_events:
                allOf:
                  - anyOf:
                      - type: boolean
                      - type: 'null'
                    title: Enable Events
                    description: >-
                      Controls tracking of task run execution progress. When set
                      to true, progress events are recorded and can be accessed
                      via the [Task Run
                      events](https://platform.parallel.ai/api-reference)
                      endpoint. When false, no progress events are tracked. Note
                      that progress tracking cannot be enabled after a run has
                      been created. The flag is set to true by default for
                      premium processors (pro and above).

                      To enable this feature in your requests, specify
                      `events-sse-2025-07-24` as one of the values in
                      `parallel-beta` header (for API calls) or `betas` param
                      (for the SDKs).
              webhook:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/Webhook'
                      - type: 'null'
                    description: >-
                      Callback URL (webhook endpoint) that will receive an HTTP
                      POST when the run completes. 

                      This feature is not available via the Python SDK. To
                      enable this feature in your API requests, specify the
                      `parallel-beta` header with `webhook-2025-08-12` value.
              enrichment_output_schema:
                allOf:
                  - allOf:
                      - $ref: '#/components/schemas/JsonSchema'
                    description: >-
                      JSON schema for the enrichment output schema for the
                      FindAll run.
            required: true
            title: FindAllEnrichInput
            description: Input model for FindAll enrich.
            refIdentifier: '#/components/schemas/FindAllEnrichInput'
            requiredProperties:
              - processor
              - enrichment_output_schema
        examples:
          example:
            value:
              processor: base
              metadata: {}
              source_policy:
                include_domains:
                  - wikipedia.org
                  - usa.gov
                  - .edu
                exclude_domains:
                  - reddit.com
                  - x.com
                  - .ai
              mcp_servers:
                - type: url
                  url: <string>
                  headers: {}
                  name: <string>
                  allowed_tools:
                    - <string>
              enable_events: true
              webhook:
                url: <string>
                event_types: []
              enrichment_output_schema:
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
  response:
    '202':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
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
    SourcePolicy:
      properties:
        include_domains:
          items:
            type: string
          type: array
          title: Include Domains
          description: >-
            List of domains to restrict the results to. If specified, only
            sources from these domains will be included. Accepts plain domains
            (e.g., example.com, subdomain.example.gov) or bare domain extension
            starting with a period (e.g., .gov, .edu, .co.uk).
          examples:
            - - wikipedia.org
              - usa.gov
              - .edu
        exclude_domains:
          items:
            type: string
          type: array
          title: Exclude Domains
          description: >-
            List of domains to exclude from results. If specified, sources from
            these domains will be excluded. Accepts plain domains (e.g.,
            example.com, subdomain.example.gov) or bare domain extension
            starting with a period (e.g., .gov, .edu, .co.uk).
          examples:
            - - reddit.com
              - x.com
              - .ai
      type: object
      title: SourcePolicy
      description: |-
        Source policy for web search results.

        This policy governs which sources are allowed/disallowed in results.
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
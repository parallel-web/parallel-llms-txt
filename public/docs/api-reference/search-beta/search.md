# Search

> Searches the web.

To access this endpoint, pass the `parallel-beta` header with the value
`search-extract-2025-10-10`.

## OpenAPI

````yaml public-openapi.json post /v1beta/search
paths:
  path: /v1beta/search
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
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Objective
                    description: >-
                      Natural-language description of what the web search is
                      trying to find. May include guidance about preferred
                      sources or freshness. At least one of objective or
                      search_queries must be provided.
              search_queries:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Search Queries
                    description: >-
                      Optional list of traditional keyword search queries to
                      guide the search. May contain search operators. At least
                      one of objective or search_queries must be provided.
              processor:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Processor
                    description: Search processor.
                    hidden: true
              max_results:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Max Results
                    description: >-
                      Upper bound on the number of results to return. May be
                      limited by the processor. Defaults to 10 if not provided.
                    default: 10
              max_chars_per_result:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Max Chars Per Result
                    description: >-
                      Upper bound on the number of characters to include in
                      excerpts for each search result.
                    examples:
                      - 15000
              source_policy:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/SourcePolicy'
                      - type: 'null'
                    description: >-
                      Optional source policy governing preferred and disallowed
                      domains in search results.
            required: true
            title: SearchRequest
            description: Base class for search queries.
            refIdentifier: '#/components/schemas/SearchRequest'
        examples:
          example:
            value:
              objective: <string>
              search_queries:
                - <string>
              processor: <string>
              max_results: 123
              max_chars_per_result: 15000
              source_policy:
                include_domains:
                  - wikipedia.org
                  - usa.gov
                  - .edu
                exclude_domains:
                  - reddit.com
                  - x.com
                  - .ai
    codeSamples:
      - lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          search = client.beta.search(
              objective="What was the GDP of France in 2023?"
          )
          print(search.results)
      - lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const search = await client.beta.search({
              objective: "What was the GDP of France in 2023?"
          });
          console.log(search.results);
      - lang: cURL
        source: |-
          curl --request POST \
              --url https://api.parallel.ai/v1beta/search \
              --header 'Content-Type: application/json' \
              --header 'x-api-key: <api-key>' \
              --header 'parallel-beta: search-extract-2025-10-10' \
              --data '{
              "objective": "What was the GDP of France in 2023?"
          }'
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              search_id:
                allOf:
                  - type: string
                    title: Search Id
                    description: >-
                      Search ID. Example:
                      `search_cad0a6d2dec046bd95ae900527d880e7`
              results:
                allOf:
                  - items:
                      $ref: '#/components/schemas/WebSearchResult'
                    type: array
                    title: Results
                    description: >-
                      A list of WebSearchResult objects, ordered by decreasing
                      relevance.
              warnings:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/Warning'
                        type: array
                      - type: 'null'
                    title: Warnings
                    description: Warnings for the search request, if any.
                    examples:
                      - []
              usage:
                allOf:
                  - anyOf:
                      - items:
                          $ref: '#/components/schemas/UsageItem'
                        type: array
                      - type: 'null'
                    title: Usage
                    description: Usage metrics for the search request.
            title: SearchResponse
            description: Output for the Search API.
            refIdentifier: '#/components/schemas/SearchResponse'
            requiredProperties:
              - search_id
              - results
        examples:
          example:
            value:
              search_id: search_fcb2b4f3-c75e-4186-87bc-caa1a8381331
              results:
                - url: https://www.example.com
                  title: Sample webpage title
                  excerpts:
                    - Sample excerpt 1
                    - Sample excerpt 2
        description: Successful Response
    '422':
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
                ref_id: search_fcb2b4f3-c75e-4186-87bc-caa1a8381331
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
    UsageItem:
      properties:
        name:
          type: string
          title: Name
          description: Name of the SKU.
          examples:
            - sku_search_additional_results
            - sku_extract_excerpts
        count:
          type: integer
          title: Count
          description: Count of the SKU.
          examples:
            - 1
      type: object
      required:
        - name
        - count
      title: UsageItem
      description: Usage item for a single operation.
    Warning:
      properties:
        type:
          type: string
          enum:
            - spec_validation_warning
            - input_validation_warning
            - warning
          title: Type
          description: >-
            Type of warning. Note that adding new warning types is considered a
            backward-compatible change.
          examples:
            - spec_validation_warning
            - input_validation_warning
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
          description: Optional detail supporting the warning.
      type: object
      required:
        - type
        - message
      title: Warning
      description: Human-readable message for a task.
    WebSearchResult:
      properties:
        url:
          type: string
          title: Url
          description: URL associated with the search result.
        title:
          type: string
          title: Title
          description: Title of the search result.
        excerpts:
          items:
            type: string
          type: array
          title: Excerpts
          description: >-
            Text excerpts from the search result which are relevant to the
            request.
      type: object
      required:
        - url
        - title
        - excerpts
      title: WebSearchResult
      description: A single search result from the web search API.

````
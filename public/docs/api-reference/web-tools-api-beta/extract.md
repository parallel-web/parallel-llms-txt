# Extract

> Extracts relevant content from specific web URLs.

To access this endpoint, pass the `parallel-beta` header with the value
`search-extract-2025-10-10`.

## OpenAPI

````yaml public-openapi.json post /v1beta/extract
paths:
  path: /v1beta/extract
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
              required: true
              title: Parallel-Beta
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              urls:
                allOf:
                  - items:
                      type: string
                    type: array
                    title: Urls
              objective:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Objective
                    description: >-
                      If provided, focuses extracted content on the specified
                      search objective.
              search_queries:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Search Queries
                    description: >-
                      If provided, focuses extracted content on the specified
                      keyword search queries.
              fetch_policy:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/FetchPolicy'
                      - type: 'null'
                    description: >-
                      Fetch policy: determines when to return content from the
                      cache (faster) vs fetching live content (fresher). If not
                      provided, a dynamic policy will be used based on the
                      search objective and url.
              excerpts:
                allOf:
                  - anyOf:
                      - type: boolean
                      - $ref: '#/components/schemas/ExcerptSettings'
                    title: Excerpts
                    description: >-
                      Include excerpts from each URL relevant to the search
                      objective and queries. Note that if neither objective nor
                      search_queries is provided, excerpts are redundant with
                      full content.
                    default: true
              full_content:
                allOf:
                  - anyOf:
                      - type: boolean
                      - $ref: '#/components/schemas/FullContentSettings'
                    title: Full Content
                    description: >-
                      Include full content from each URL. Note that if neither
                      objective nor search_queries is provided, excerpts are
                      redundant with full content.
                    default: false
            required: true
            title: ExtractRequest
            description: Extract request.
            refIdentifier: '#/components/schemas/ExtractRequest'
            requiredProperties:
              - urls
        examples:
          example:
            value:
              urls:
                - <string>
              objective: <string>
              search_queries:
                - <string>
              fetch_policy:
                max_age_seconds: 123
                timeout_seconds: 123
                disable_cache_fallback: false
              excerpts: true
              full_content: true
    codeSamples:
      - lang: cURL
        source: |-
          curl --request POST \
              --url https://api.parallel.ai/v1beta/extract \
              --header 'Content-Type: application/json' \
              --header 'x-api-key: <api-key>' \
              --header 'parallel-beta: search-extract-2025-10-10' \
              --data '{
              "urls": ["https://www.example.com"],
              "excerpts": true,
              "full_content": true
          }'
      - lang: Python
        source: |-
          from parallel import Parallel

          client = Parallel(api_key="API Key")

          extract = client.beta.extract(
              urls=["https://www.example.com"],
              excerpts=True,
              full_content=True
          )
          print(extract.results)
      - lang: TypeScript
        source: |-
          import Parallel from "parallel-web";

          const client = new Parallel({ apiKey: 'API Key' });

          const extract = await client.beta.extract({
              urls: ["https://www.example.com"],
              excerpts: true,
              full_content: true
          });
          console.log(extract.results);
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              extract_id:
                allOf:
                  - type: string
                    title: Extract Id
                    description: >-
                      Extract request ID, e.g.
                      `extract_cad0a6d2dec046bd95ae900527d880e7`
              results:
                allOf:
                  - items:
                      $ref: '#/components/schemas/ExtractResult'
                    type: array
                    title: Results
                    description: Successful extract results.
              errors:
                allOf:
                  - items:
                      $ref: '#/components/schemas/ExtractError'
                    type: array
                    title: Errors
                    description: 'Extract errors: requested URLs not in the results.'
            title: ExtractResponse
            description: Fetch result.
            refIdentifier: '#/components/schemas/ExtractResponse'
            requiredProperties:
              - extract_id
              - results
              - errors
        examples:
          example:
            value:
              extract_id: extract_8a911eb27c7a4afaa20d0d9dc98d07c0
              results:
                - url: https://www.example.com
                  excerpts:
                    - Excerpted text ...
                  full_content: Full content ...
                  title: Example Title
              errors:
                - url: https://www.example.com
                  error_type: fetch_error
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
                ref_id: extract_8a911eb27c7a4afaa20d0d9dc98d07c0
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
    ExcerptSettings:
      properties:
        max_chars_per_result:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Chars Per Result
          description: >-
            Optional upper bound on the total number of characters to include
            across all excerpts for each url. Excerpts may contain fewer
            characters than this limit to maximize relevance and token
            efficiency.
      type: object
      title: ExcerptSettings
      description: Optional settings for returning relevant excerpts.
    ExtractError:
      properties:
        url:
          type: string
          title: Url
        error_type:
          type: string
          title: Error Type
          description: Error type.
        http_status_code:
          anyOf:
            - type: integer
            - type: 'null'
          title: Http Status Code
          description: HTTP status code, if available.
        content:
          anyOf:
            - type: string
            - type: 'null'
          title: Content
          description: Content returned for http client or server errors, if any.
      type: object
      required:
        - url
        - error_type
        - http_status_code
        - content
      title: ExtractError
      description: Extract error details.
    ExtractResult:
      properties:
        url:
          type: string
          title: Url
        excerpts:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Excerpts
          description: Relevant excerpted content from the URL, formatted as markdown.
        full_content:
          anyOf:
            - type: string
            - type: 'null'
          title: Full Content
          description: Full content from the URL formatted as markdown, if requested.
        title:
          anyOf:
            - type: string
            - type: 'null'
          title: Title
          description: Title of the webpage, if available.
        publish_date:
          anyOf:
            - type: string
            - type: 'null'
          title: Publish Date
          description: Publish date of the webpage in YYYY-MM-DD format, if available.
      type: object
      required:
        - url
        - excerpts
        - full_content
        - title
        - publish_date
      title: ExtractResult
      description: Extract result for a single URL.
    FetchPolicy:
      properties:
        max_age_seconds:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Age Seconds
          description: >-
            Maximum age of cached content in seconds to trigger a live fetch.
            Minimum value 600 seconds (10 minutes). If not provided, a dynamic
            age policy will be used based on the search objective and url.
        timeout_seconds:
          anyOf:
            - type: number
            - type: 'null'
          title: Timeout Seconds
          description: >-
            Timeout in seconds for fetching live content if unavailable in
            cache. If unspecified a dynamic timeout will be used based on the
            url, generally 15 seconds for simple pages and up to 60 seconds for
            complex pages requiring javascript or PDF rendering.
        disable_cache_fallback:
          type: boolean
          title: Disable Cache Fallback
          description: >-
            If false, fallback to cached content older than max-age if live
            fetch fails or times out. If true, returns an error instead.
          default: false
      type: object
      title: FetchPolicy
      description: >-
        Fetch policy.


        Determines when to return content from the cache (faster) vs fetching
        live content

        (fresher).
    FullContentSettings:
      properties:
        max_chars_per_result:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Chars Per Result
          description: >-
            Optional limit on the number of characters to include in the full
            content for each url. Full content always starts at the beginning of
            the page and is truncated at the limit if necessary.
      type: object
      title: FullContentSettings
      description: Optional settings for returning full content.

````
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract

> Extracts relevant content from specific web URLs.

To access this endpoint, pass the `parallel-beta` header with the value
`search-extract-2025-10-10`.



## OpenAPI

````yaml public-openapi.json post /v1beta/extract
openapi: 3.1.0
info:
  title: Parallel API
  description: Parallel API
  contact:
    name: Parallel Support
    url: https://parallel.ai
    email: support@parallel.ai
  version: 0.1.2
servers:
  - url: https://api.parallel.ai
    description: Parallel API
security:
  - ApiKeyAuth: []
tags:
  - name: Tasks v1
    description: >-
      The Task API executes web research and extraction tasks. Clients submit a
      natural-language objective with an optional input schema; the service
      plans retrieval, fetches relevant URLs, and returns outputs that conform
      to a provided or inferred JSON schema. Supports deep research style
      queries and can return rich structured JSON outputs. Processors trade-off
      between cost, latency, and quality. Each processor supports calibrated
      confidences.

      - Output metadata: citations, excerpts, reasoning, and confidence per
      field
  - name: Tasks (Beta)
    description: >-
      The Task Group API is currently in beta and enables batch execution of
      many independent Task runs with group-level monitoring and failure
      handling.

      - Submit hundreds or thousands of Tasks as a single group

      - Observe group progress and receive results as they complete

      - Real-time updates via Server-Sent Events (SSE)

      - Add tasks to an existing group while it is running

      - Group-level retry and error aggregation

      Status: beta and subject to change.
  - name: Search (Beta)
    description: >-
      Search returns ranked URLs with extended excerpts suitable for LLM
      consumption. Inputs are a natural-language objective and optional keyword
      queries. Source policies allow including or excluding specific domains and
      have configurable output sizes. The returned extended snippets contain
      dense, relevant information from relevant pages.

      - Result: ranked list with URL, title, and long text excerpts
  - name: Extract (Beta)
    description: >-
      Extract returns excerpts or full content from one or more URLs. Inputs are
      a list of URLs and an optional search objective and keyword queries. The
      returned excerpts or full content is formatted as markdown and suitable
      for LLM consumption.

      - Result: excerpts or full content from the URL formatted as markdown
  - name: FindAll API (Beta)
    description: >-
      The FindAll API discovers and evaluates entities that match complex
      criteria from natural language objectives. Submit a high-level goal and
      the service automatically generates structured match conditions, discovers
      relevant candidates, and evaluates each against the criteria. Returns
      comprehensive results with detailed reasoning, citations, and confidence
      scores for each match decision. Streaming events and webhooks are
      supported.
  - name: Chat API (Beta)
    description: >-
      The Chat API provides a programmatic chat-style text generation interface.
      It accepts a sequence of messages and returns model responses. Intended
      for assistant-like interactions and evaluation. Streaming responses are
      supported.
  - name: Monitor
    description: Monitor
paths:
  /v1beta/extract:
    post:
      tags:
        - Extract (Beta)
      summary: Extract
      description: |-
        Extracts relevant content from specific web URLs.

        To access this endpoint, pass the `parallel-beta` header with the value
        `search-extract-2025-10-10`.
      operationId: beta_extract_v1beta_extract_post
      parameters:
        - name: parallel-beta
          in: header
          required: false
          schema:
            type: string
            default: search-extract-2025-10-10
            title: Parallel-Beta
            x-stainless-override-schema:
              x-stainless-param: betas
              x-stainless-extend-default: true
              type: array
              description: Optional header to specify the beta version(s) to enable.
              items:
                $ref: '#/components/schemas/ParallelBeta'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ExtractRequest'
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExtractResponse'
              example:
                extract_id: extract_8a911eb27c7a4afaa20d0d9dc98d07c0
                results:
                  - url: https://www.example.com
                    title: Example Title
                    excerpts:
                      - Excerpted text ...
                    full_content: Full content ...
                errors:
                  - url: https://www.example.com
                    error_type: fetch_error
                    http_status_code: 500
                    content: Error fetching content from https://www.example.com
        '422':
          description: Request validation error
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: extract_8a911eb27c7a4afaa20d0d9dc98d07c0
                  message: Request validation error
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      x-code-samples:
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
components:
  schemas:
    ExtractRequest:
      properties:
        urls:
          items:
            type: string
          type: array
          title: Urls
        objective:
          anyOf:
            - type: string
            - type: 'null'
          title: Objective
          description: >-
            If provided, focuses extracted content on the specified search
            objective.
        search_queries:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Search Queries
          description: >-
            If provided, focuses extracted content on the specified keyword
            search queries.
        fetch_policy:
          anyOf:
            - $ref: '#/components/schemas/FetchPolicy'
            - type: 'null'
          description: >-
            Fetch policy: determines when to return cached content from the
            index (faster) vs fetching live content (fresher). Default is to use
            a dynamic policy based on the search objective and url.
        excerpts:
          anyOf:
            - type: boolean
            - $ref: '#/components/schemas/ExcerptSettings'
          title: Excerpts
          description: >-
            Include excerpts from each URL relevant to the search objective and
            queries. Note that if neither objective nor search_queries is
            provided, excerpts are redundant with full content.
          default: true
        full_content:
          anyOf:
            - type: boolean
            - $ref: '#/components/schemas/FullContentSettings'
          title: Full Content
          description: >-
            Include full content from each URL. Note that if neither objective
            nor search_queries is provided, excerpts are redundant with full
            content.
          default: false
      type: object
      required:
        - urls
      title: ExtractRequest
      description: Extract request.
    ExtractResponse:
      properties:
        extract_id:
          type: string
          title: Extract Id
          description: Extract request ID, e.g. `extract_cad0a6d2dec046bd95ae900527d880e7`
        results:
          items:
            $ref: '#/components/schemas/ExtractResult'
          type: array
          title: Results
          description: Successful extract results.
        errors:
          items:
            $ref: '#/components/schemas/ExtractError'
          type: array
          title: Errors
          description: 'Extract errors: requested URLs not in the results.'
        warnings:
          anyOf:
            - items:
                $ref: '#/components/schemas/Warning'
              type: array
            - type: 'null'
          title: Warnings
          description: Warnings for the extract request, if any.
        usage:
          anyOf:
            - items:
                $ref: '#/components/schemas/UsageItem'
              type: array
            - type: 'null'
          title: Usage
          description: Usage metrics for the extract request.
      type: object
      required:
        - extract_id
        - results
        - errors
      title: ExtractResponse
      description: Fetch result.
    ErrorResponse:
      properties:
        type:
          type: string
          const: error
          title: Type
          description: Always 'error'.
        error:
          $ref: '#/components/schemas/Error'
          description: Error.
      type: object
      required:
        - type
        - error
      title: ErrorResponse
      description: Response object used for non-200 status codes.
    FetchPolicy:
      properties:
        max_age_seconds:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Age Seconds
          description: >-
            Maximum age of cached content in seconds to trigger a live fetch.
            Minimum value 600 seconds (10 minutes).
          examples:
            - 86400
        timeout_seconds:
          anyOf:
            - type: number
            - type: 'null'
          title: Timeout Seconds
          description: >-
            Timeout in seconds for fetching live content if unavailable in
            cache.
          examples:
            - 60
        disable_cache_fallback:
          type: boolean
          title: Disable Cache Fallback
          description: >-
            If false, fallback to cached content older than max-age if live
            fetch fails or times out. If true, returns an error instead.
          default: false
      type: object
      title: FetchPolicy
      description: Policy for live fetching web results.
    ExcerptSettings:
      properties:
        max_chars_per_result:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Chars Per Result
          description: >-
            Optional upper bound on the total number of characters to include
            per url. Excerpts may contain fewer characters than this limit to
            maximize relevance and token efficiency. Values below 1000 will be
            automatically set to 1000.
        max_chars_total:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Chars Total
          description: >-
            Optional upper bound on the total number of characters to include
            across all urls. Results may contain fewer characters than this
            limit to maximize relevance and token efficiency. Values below 1000
            will be automatically set to 1000. This overall limit applies in
            addition to max_chars_per_result.
      type: object
      title: ExcerptSettings
      description: Optional settings for returning relevant excerpts.
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
    ExtractResult:
      properties:
        url:
          type: string
          title: Url
          description: URL associated with the search result.
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
      type: object
      required:
        - url
      title: ExtractResult
      description: Extract result for a single URL.
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
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
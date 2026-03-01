> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search

> Searches the web.



## OpenAPI

````yaml public-openapi.json post /v1beta/search
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
  /v1beta/search:
    post:
      tags:
        - Search (Beta)
      summary: Search
      description: Searches the web.
      operationId: web_search_v1beta_search_post
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchRequest'
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResponse'
              example:
                search_id: search_fcb2b4f3-c75e-4186-87bc-caa1a8381331
                results:
                  - url: https://www.example.com
                    title: Sample webpage title
                    publish_date: '2024-01-15'
                    excerpts:
                      - Sample excerpt 1
                      - Sample excerpt 2
        '422':
          description: Request validation error
          content:
            application/json:
              example:
                type: error
                error:
                  ref_id: search_fcb2b4f3-c75e-4186-87bc-caa1a8381331
                  message: Request validation error
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      x-code-samples:
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
components:
  schemas:
    SearchRequest:
      properties:
        mode:
          anyOf:
            - type: string
              enum:
                - one-shot
                - agentic
                - fast
            - type: 'null'
          title: Mode
          description: >-
            Presets default values for parameters for different use cases.
             - `one-shot` returns more comprehensive results and longer excerpts to answer questions from a single response
            - `agentic` returns more concise, token-efficient results for use in
            an agentic loop

            - `fast` trades some quality for lower latency, with best results
            when used with concise and high-quality objective and keyword
            queries
          default: one-shot
        objective:
          anyOf:
            - type: string
            - type: 'null'
          title: Objective
          description: >-
            Natural-language description of what the web search is trying to
            find. May include guidance about preferred sources or freshness. At
            least one of objective or search_queries must be provided.
        search_queries:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Search Queries
          description: >-
            Optional list of traditional keyword search queries to guide the
            search. May contain search operators. At least one of objective or
            search_queries must be provided.
        processor:
          anyOf:
            - type: string
              enum:
                - base
                - pro
            - type: 'null'
          title: Processor
          description: 'DEPRECATED: use `mode` instead.'
          deprecated: true
          hidden: true
        max_results:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Results
          description: >-
            Upper bound on the number of results to return. Defaults to 10 if
            not provided.
          default: 10
        max_chars_per_result:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Chars Per Result
          description: 'DEPRECATED: Use `excerpts.max_chars_per_result` instead.'
          deprecated: true
          hidden: true
        excerpts:
          $ref: '#/components/schemas/ExcerptSettings'
          description: Optional settings to configure excerpt generation.
        source_policy:
          anyOf:
            - $ref: '#/components/schemas/SourcePolicy'
            - type: 'null'
          description: >-
            Optional source policy governing domain and date preferences in
            search results.
        fetch_policy:
          anyOf:
            - $ref: '#/components/schemas/FetchPolicy'
            - type: 'null'
          description: >-
            Fetch policy: determines when to return cached content from the
            index (faster) vs fetching live content (fresher). Default is to
            disable live fetch and return cached content from the index.
      type: object
      title: SearchRequest
      description: Request to Search API.
    SearchResponse:
      properties:
        search_id:
          type: string
          title: Search Id
          description: 'Search ID. Example: `search_cad0a6d2dec046bd95ae900527d880e7`'
        results:
          items:
            $ref: '#/components/schemas/WebSearchResult'
          type: array
          title: Results
          description: A list of WebSearchResult objects, ordered by decreasing relevance.
        warnings:
          anyOf:
            - items:
                $ref: '#/components/schemas/Warning'
              type: array
            - type: 'null'
          title: Warnings
          description: Warnings for the search request, if any.
        usage:
          anyOf:
            - items:
                $ref: '#/components/schemas/UsageItem'
              type: array
            - type: 'null'
          title: Usage
          description: Usage metrics for the search request.
      type: object
      required:
        - search_id
        - results
      title: SearchResponse
      description: Output for the Search API.
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
        after_date:
          anyOf:
            - type: string
              format: date
            - type: 'null'
          title: After Date
          description: >-
            Optional start date for filtering search results. Results will be
            limited to content published on or after this date. Provided as an
            RFC 3339 date string (YYYY-MM-DD).
          examples:
            - '2024-01-01'
      type: object
      title: SourcePolicy
      description: |-
        Source policy for web search results.

        This policy governs which sources are allowed/disallowed in results.
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
    WebSearchResult:
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
      type: object
      required:
        - url
      title: WebSearchResult
      description: A single search result from the web search API.
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
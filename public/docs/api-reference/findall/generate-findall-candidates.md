> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate FindAll Candidates

> Return ranked entity candidates matching a natural language objective.

This endpoint performs a best-effort search optimised for low latency.
For comprehensive match evaluation and enrichment, use the
[FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart).



## OpenAPI

````yaml /public-openapi.json post /v1beta/findall/candidates
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
  - name: Search
    description: >-
      Search returns ranked URLs with extended excerpts suitable for LLM
      consumption. Inputs are a natural-language objective and optional keyword
      queries. Source policies allow including or excluding specific domains and
      have configurable output sizes. The returned extended snippets contain
      dense, relevant information from relevant pages.

      - Result: ranked list with URL, title, and long text excerpts
  - name: Extract
    description: >-
      Extract returns excerpts or full content from one or more URLs. Inputs are
      a list of URLs and an optional search objective and keyword queries. The
      returned excerpts or full content is formatted as markdown and suitable
      for LLM consumption.

      - Result: excerpts or full content from the URL formatted as markdown
  - name: Tasks
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


      Task Groups enable batch execution of many independent Task runs with
      group-level monitoring and failure handling.

      - Submit hundreds or thousands of Tasks as a single group

      - Observe group progress and receive results as they complete

      - Real-time updates via Server-Sent Events (SSE)

      - Add tasks to an existing group while it is running

      - Group-level retry and error aggregation
  - name: FindAll
    description: >-
      The FindAll API discovers and evaluates entities that match complex
      criteria from natural language objectives. Submit a high-level goal and
      the service automatically generates structured match conditions, discovers
      relevant candidates, and evaluates each against the criteria. Returns
      comprehensive results with detailed reasoning, citations, and confidence
      scores for each match decision. Streaming events and webhooks are
      supported.
  - name: Monitor
    description: >-
      The Monitor API enables continuous web monitoring for material changes.
      Define monitoring queries with scheduled cadences (hourly, daily, weekly);
      the service periodically searches the web, detects changes, deduplicates
      events, and delivers notifications via webhooks or Slack.

      - Create, update, and delete monitors with custom output schemas

      - Retrieve detected events and event groups

      - Simulate events for testing
  - name: Chat API (Beta)
    description: >-
      The Chat API provides a programmatic chat-style text generation interface.
      It accepts a sequence of messages and returns model responses. Intended
      for assistant-like interactions and evaluation. Streaming responses are
      supported.
paths:
  /v1beta/findall/candidates:
    post:
      tags:
        - FindAll
      summary: Generate FindAll Candidates
      description: |-
        Return ranked entity candidates matching a natural language objective.

        This endpoint performs a best-effort search optimised for low latency.
        For comprehensive match evaluation and enrichment, use the
        [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart).
      operationId: findall_candidates_v1beta_findall_candidates_post
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FindAllCandidatesRequest'
        required: true
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FindAllCandidatesResponse'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-code-samples:
        - lang: Python
          source: |-
            from parallel import Parallel

            client = Parallel()

            candidates = client.beta.findall.candidates(
                entity_type="company",
                objective="AI startups that raised Series A in 2024",
                match_limit=100,
            )

            for candidate in candidates.candidates:
                print(f"{candidate.name}: {candidate.url}")
        - lang: TypeScript
          source: |-
            import Parallel from "parallel-web";

            const client = new Parallel();

            const candidates = await client.beta.findall.candidates({
                entity_type: "company",
                objective: "AI startups that raised Series A in 2024",
                match_limit: 100,
            });

            for (const candidate of candidates.candidates) {
                console.log(`${candidate.name}: ${candidate.url}`);
            }
components:
  schemas:
    FindAllCandidatesRequest:
      properties:
        entity_type:
          type: string
          enum:
            - company
            - people
          title: Entity Type
          description: Type of entity to search for.
        objective:
          type: string
          title: Objective
          description: Natural language description of target entities.
        match_limit:
          type: integer
          maximum: 1000
          minimum: 5
          title: Match Limit
          description: >-
            Maximum number of candidates to return. Must be between 5 and 1000
            (inclusive). May return fewer results. Defaults to 100.
          default: 100
      type: object
      required:
        - entity_type
        - objective
      title: FindAllCandidatesRequest
    FindAllCandidatesResponse:
      properties:
        candidate_set_id:
          type: string
          title: Candidate Set Id
          description: >-
            Candidate set request ID. Example:
            `candidate_set_cad0a6d2dec046bd95ae900527d880e7`
        candidates:
          items:
            $ref: '#/components/schemas/CandidateItem'
          type: array
          title: Candidates
          description: Ranked list of entity candidates.
      type: object
      required:
        - candidate_set_id
        - candidates
      title: FindAllCandidatesResponse
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    CandidateItem:
      properties:
        name:
          type: string
          title: Name
          description: Entity name.
        url:
          type: string
          title: Url
          description: Canonical URL for the entity.
        description:
          type: string
          title: Description
          description: Descriptive text about the entity.
      type: object
      required:
        - name
        - url
        - description
      title: CandidateItem
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
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
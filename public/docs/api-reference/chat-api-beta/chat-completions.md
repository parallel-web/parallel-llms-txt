> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat Completions

> Chat completions.

This endpoint can be used to get realtime chat completions. It can also be used
with the Task API processors to get structured, research outputs via a chat
interface.



## OpenAPI

````yaml public-openapi.json post /v1beta/chat/completions
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
  /v1beta/chat/completions:
    post:
      tags:
        - Chat API (Beta)
      summary: Chat Completions
      description: >-
        Chat completions.


        This endpoint can be used to get realtime chat completions. It can also
        be used

        with the Task API processors to get structured, research outputs via a
        chat

        interface.
      operationId: chat_completions_v1beta_chat_completions_post
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatCompletionRequest'
        required: true
      responses:
        '200':
          description: >-
            Returns a ChatCompletion object for non-streaming requests
            (application/json), or a stream of ChatCompletionResponseChunk
            objects for streaming requests (text/event-stream) when
            `stream=true` is set in the request.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatCompletion'
            text/event-stream:
              schema:
                $ref: '#/components/schemas/ChatCompletionResponseChunk'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
components:
  schemas:
    ChatCompletionRequest:
      properties:
        model:
          type: string
          title: Model
          description: The model to use for chat completions.
        messages:
          items:
            $ref: '#/components/schemas/ChatMessage'
          type: array
          title: Messages
          description: The messages to use for chat completions.
        stream:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Stream
          description: Whether to stream the chat completions.
        response_format:
          anyOf:
            - $ref: '#/components/schemas/ResponseFormatText'
            - $ref: '#/components/schemas/ResponseFormatJSONSchema'
            - $ref: '#/components/schemas/ResponseFormatJSONObject'
            - type: 'null'
          title: Response Format
          description: The response format to use for chat completions. OpenAI compatible.
        max_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Tokens
          description: The maximum number of tokens to generate. Unsupported.
        temperature:
          anyOf:
            - type: number
            - type: 'null'
          title: Temperature
          description: The temperature to use for chat completions. Unsupported.
        top_p:
          anyOf:
            - type: number
            - type: 'null'
          title: Top P
          description: The top p to use for chat completions. Unsupported.
        'n':
          anyOf:
            - type: integer
            - type: 'null'
          title: 'N'
          description: The number of chat completions to generate. Unsupported.
        presence_penalty:
          anyOf:
            - type: number
            - type: 'null'
          title: Presence Penalty
          description: The presence penalty to use for chat completions. Unsupported.
        frequency_penalty:
          anyOf:
            - type: number
            - type: 'null'
          title: Frequency Penalty
          description: The frequency penalty to use for chat completions. Unsupported.
      type: object
      required:
        - model
        - messages
      title: ChatCompletionRequest
      description: >-
        Request for the chat completions endpoint.


        Note that all parameters except for `model`, `stream`, and
        `response_format`

        are ignored.
    ChatCompletion:
      properties:
        id:
          type: string
          title: Id
          description: The id of the chat completion.
        choices:
          items:
            $ref: '#/components/schemas/Choice'
          type: array
          title: Choices
        created:
          type: integer
          title: Created
        model:
          type: string
          title: Model
        object:
          type: string
          const: chat.completion
          title: Object
        service_tier:
          anyOf:
            - type: string
              enum:
                - auto
                - default
                - flex
                - scale
                - priority
            - type: 'null'
          title: Service Tier
        system_fingerprint:
          anyOf:
            - type: string
            - type: 'null'
          title: System Fingerprint
        usage:
          anyOf:
            - $ref: '#/components/schemas/CompletionUsage'
            - type: 'null'
        basis:
          items:
            $ref: '#/components/schemas/FieldBasis'
          type: array
          title: Basis
          description: >-
            Basis for the chat completion, including citations and reasoning
            supporting the output.
          default: []
      additionalProperties: true
      type: object
      required:
        - id
        - choices
        - created
        - model
        - object
      title: ChatCompletion
      description: Chat completion response.
    ChatCompletionResponseChunk:
      additionalProperties: true
      description: Chat completion response chunk.
      properties:
        type:
          const: chat.completion.chunk
          description: >-
            The type of the chat completion chunk. Always
            `chat.completion.chunk`.
          title: Type
          type: string
        id:
          description: The id of the chat completion response chunk.
          title: Id
          type: string
        choices:
          items:
            $ref: '#/components/schemas/Choice'
          type: array
          title: Choices
        created:
          type: integer
          title: Created
        model:
          type: string
          title: Model
        object:
          const: chat.completion.chunk
          title: Object
          type: string
        service_tier:
          anyOf:
            - type: string
              enum:
                - auto
                - default
                - flex
                - scale
                - priority
            - type: 'null'
          default: null
          title: Service Tier
        system_fingerprint:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: System Fingerprint
        usage:
          anyOf:
            - $ref: '#/components/schemas/CompletionUsage'
            - type: 'null'
          default: null
        basis:
          default: []
          description: >-
            Basis for the chat completion chunk, including citations and
            reasoning supporting the output.
          items:
            $ref: '#/components/schemas/FieldBasis'
          title: Basis
          type: array
      required:
        - type
        - id
        - choices
        - created
        - model
        - object
      title: ChatCompletionResponseChunk
      type: object
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    ChatMessage:
      properties:
        role:
          type: string
          enum:
            - system
            - user
            - assistant
          title: Role
          description: The role of the chat message.
        content:
          type: string
          title: Content
          description: The content of the chat message.
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
          description: >-
            An optional name for the participant. Provides the model information
            to differentiate between participants of the same role.
      type: object
      required:
        - role
        - content
      title: ChatMessage
      description: Chat message for OpenAI API.
    ResponseFormatText:
      properties:
        type:
          type: string
          const: text
          title: Type
      type: object
      required:
        - type
      title: ResponseFormatText
    ResponseFormatJSONSchema:
      properties:
        json_schema:
          $ref: '#/components/schemas/JSONSchema'
        type:
          type: string
          const: json_schema
          title: Type
      type: object
      required:
        - json_schema
        - type
      title: ResponseFormatJSONSchema
    ResponseFormatJSONObject:
      properties:
        type:
          type: string
          const: json_object
          title: Type
      type: object
      required:
        - type
      title: ResponseFormatJSONObject
    Choice:
      additionalProperties: true
      properties:
        delta:
          $ref: '#/components/schemas/ChoiceDelta'
        finish_reason:
          anyOf:
            - enum:
                - stop
                - length
                - tool_calls
                - content_filter
                - function_call
              type: string
            - type: 'null'
          default: null
          title: Finish Reason
        index:
          title: Index
          type: integer
        logprobs:
          anyOf:
            - $ref: '#/components/schemas/ChoiceLogprobs'
            - type: 'null'
          default: null
      required:
        - delta
        - index
      title: Choice
      type: object
    CompletionUsage:
      additionalProperties: true
      properties:
        completion_tokens:
          title: Completion Tokens
          type: integer
        prompt_tokens:
          title: Prompt Tokens
          type: integer
        total_tokens:
          title: Total Tokens
          type: integer
        completion_tokens_details:
          anyOf:
            - $ref: '#/components/schemas/CompletionTokensDetails'
            - type: 'null'
          default: null
        prompt_tokens_details:
          anyOf:
            - $ref: '#/components/schemas/PromptTokensDetails'
            - type: 'null'
          default: null
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      title: CompletionUsage
      type: object
    FieldBasis:
      description: Citations and reasoning supporting one field of a task output.
      properties:
        field:
          description: Name of the output field.
          title: Field
          type: string
        citations:
          default: []
          description: List of citations supporting the output field.
          items:
            $ref: '#/components/schemas/Citation'
          title: Citations
          type: array
        reasoning:
          description: Reasoning for the output field.
          title: Reasoning
          type: string
        confidence:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          description: >-
            Confidence level for the output field. Only certain processors
            provide confidence levels.
          examples:
            - low
            - medium
            - high
          title: Confidence
      required:
        - field
        - reasoning
      title: FieldBasis
      type: object
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
    JSONSchema:
      properties:
        name:
          type: string
          title: Name
        description:
          type: string
          title: Description
        schema:
          additionalProperties: false
          type: object
          title: Schema
        strict:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Strict
      type: object
      required:
        - name
      title: JSONSchema
    ChoiceDelta:
      additionalProperties: true
      properties:
        content:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Content
        function_call:
          anyOf:
            - $ref: '#/components/schemas/ChoiceDeltaFunctionCall'
            - type: 'null'
          default: null
        refusal:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Refusal
        role:
          anyOf:
            - enum:
                - developer
                - system
                - user
                - assistant
                - tool
              type: string
            - type: 'null'
          default: null
          title: Role
        tool_calls:
          anyOf:
            - items:
                $ref: '#/components/schemas/ChoiceDeltaToolCall'
              type: array
            - type: 'null'
          default: null
          title: Tool Calls
      title: ChoiceDelta
      type: object
    ChoiceLogprobs:
      additionalProperties: true
      properties:
        content:
          anyOf:
            - items:
                $ref: '#/components/schemas/ChatCompletionTokenLogprob'
              type: array
            - type: 'null'
          default: null
          title: Content
        refusal:
          anyOf:
            - items:
                $ref: '#/components/schemas/ChatCompletionTokenLogprob'
              type: array
            - type: 'null'
          default: null
          title: Refusal
      title: ChoiceLogprobs
      type: object
    CompletionTokensDetails:
      additionalProperties: true
      properties:
        accepted_prediction_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Accepted Prediction Tokens
        audio_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Audio Tokens
        reasoning_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Reasoning Tokens
        rejected_prediction_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Rejected Prediction Tokens
      title: CompletionTokensDetails
      type: object
    PromptTokensDetails:
      additionalProperties: true
      properties:
        audio_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Audio Tokens
        cached_tokens:
          anyOf:
            - type: integer
            - type: 'null'
          default: null
          title: Cached Tokens
      title: PromptTokensDetails
      type: object
    Citation:
      description: A citation for a task output.
      properties:
        title:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          description: Title of the citation.
          title: Title
        url:
          description: URL of the citation.
          title: Url
          type: string
        excerpts:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          default: null
          description: >-
            Excerpts from the citation supporting the output. Only certain
            processors provide excerpts.
          title: Excerpts
      required:
        - url
      title: Citation
      type: object
    ChoiceDeltaFunctionCall:
      additionalProperties: true
      properties:
        arguments:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Arguments
        name:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Name
      title: ChoiceDeltaFunctionCall
      type: object
    ChoiceDeltaToolCall:
      additionalProperties: true
      properties:
        index:
          title: Index
          type: integer
        id:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Id
        function:
          anyOf:
            - $ref: '#/components/schemas/ChoiceDeltaToolCallFunction'
            - type: 'null'
          default: null
        type:
          anyOf:
            - const: function
              type: string
            - type: 'null'
          default: null
          title: Type
      required:
        - index
      title: ChoiceDeltaToolCall
      type: object
    ChatCompletionTokenLogprob:
      additionalProperties: true
      properties:
        token:
          title: Token
          type: string
        bytes:
          anyOf:
            - items:
                type: integer
              type: array
            - type: 'null'
          default: null
          title: Bytes
        logprob:
          title: Logprob
          type: number
        top_logprobs:
          items:
            $ref: '#/components/schemas/TopLogprob'
          title: Top Logprobs
          type: array
      required:
        - token
        - logprob
        - top_logprobs
      title: ChatCompletionTokenLogprob
      type: object
    ChoiceDeltaToolCallFunction:
      additionalProperties: true
      properties:
        arguments:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Arguments
        name:
          anyOf:
            - type: string
            - type: 'null'
          default: null
          title: Name
      title: ChoiceDeltaToolCallFunction
      type: object
    TopLogprob:
      additionalProperties: true
      properties:
        token:
          title: Token
          type: string
        bytes:
          anyOf:
            - items:
                type: integer
              type: array
            - type: 'null'
          default: null
          title: Bytes
        logprob:
          title: Logprob
          type: number
      required:
        - token
        - logprob
      title: TopLogprob
      type: object
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

````
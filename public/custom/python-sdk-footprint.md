Below is a single, consolidated `parallel.pyi` stub that summarizes the SDK’s public footprint (clients, resources, key types, and helper utilities) in a way that’s useful to an LLM. I only copied docstrings **verbatim** where they exist on the public methods/properties (notably the resource methods). Many `BaseModel` classes in your code have *attribute docstrings* (triple-quoted strings immediately following attributes), which Python stub format (`.pyi`) cannot represent 1:1 as docstrings; those are omitted to keep the stub valid. Where the SDK had no function docstring, I did not invent one.

Save this as `parallel.pyi`.

```pyi
# parallel.pyi
# Consolidated stub for the `parallel` SDK (v0.4.0)
# Generated manually from repository snapshot. Intended for LLM/API-surface reading.

from __future__ import annotations

import httpx
import logging
from datetime import date, datetime
from typing import (
    Any,
    Callable,
    Coroutine,
    Dict,
    Generic,
    Iterable,
    Iterator,
    List,
    Mapping,
    Optional,
    Sequence,
    Tuple,
    Type,
    TypeVar,
    Union,
    overload,
)
from typing_extensions import (
    Annotated,
    Literal,
    Protocol,
    Required,
    Self,
    TypeAlias,
    TypedDict,
)

__title__: str
__version__: str

# ---------------------------------------------------------------------------
# Core exported sentinels / helper types
# ---------------------------------------------------------------------------

class NotGiven:
    def __bool__(self) -> Literal[False]: ...
    def __repr__(self) -> str: ...

not_given: NotGiven
NOT_GIVEN: NotGiven

class Omit:
    def __bool__(self) -> Literal[False]: ...

omit: Omit

NoneType: Type[None]

Transport = httpx.BaseTransport
ProxiesTypes: TypeAlias = Union[str, httpx.Proxy, Dict[Union[str, httpx.URL], Union[None, str, httpx.URL, httpx.Proxy]]]
Timeout = httpx.Timeout

# ---------------------------------------------------------------------------
# Exceptions
# ---------------------------------------------------------------------------

class ParallelError(Exception): ...
class APIError(ParallelError):
    message: str
    request: httpx.Request
    body: object | None

class APIResponseValidationError(APIError):
    response: httpx.Response
    status_code: int

class APIStatusError(APIError):
    """Raised when an API response has a status code of 4xx or 5xx."""
    response: httpx.Response
    status_code: int

class APIConnectionError(APIError): ...
class APITimeoutError(APIConnectionError): ...

class BadRequestError(APIStatusError): ...
class AuthenticationError(APIStatusError): ...
class PermissionDeniedError(APIStatusError): ...
class NotFoundError(APIStatusError): ...
class ConflictError(APIStatusError): ...
class UnprocessableEntityError(APIStatusError): ...
class RateLimitError(APIStatusError): ...
class InternalServerError(APIStatusError): ...

# ---------------------------------------------------------------------------
# BaseModel + GenericModel
# ---------------------------------------------------------------------------

class BaseModel(__import__("pydantic").BaseModel):
    def to_dict(
        self,
        *,
        mode: Literal["json", "python"] = "python",
        use_api_names: bool = True,
        exclude_unset: bool = True,
        exclude_defaults: bool = False,
        exclude_none: bool = False,
        warnings: bool = True,
    ) -> dict[str, object]: ...
    def to_json(
        self,
        *,
        indent: int | None = 2,
        use_api_names: bool = True,
        exclude_unset: bool = True,
        exclude_defaults: bool = False,
        exclude_none: bool = False,
        warnings: bool = True,
    ) -> str: ...

class GenericModel(BaseModel): ...

# ---------------------------------------------------------------------------
# Constants re-exported from parallel.__init__
# ---------------------------------------------------------------------------

DEFAULT_TIMEOUT: httpx.Timeout
DEFAULT_MAX_RETRIES: int
DEFAULT_CONNECTION_LIMITS: httpx.Limits

# ---------------------------------------------------------------------------
# Utility export
# ---------------------------------------------------------------------------

def file_from_path(path: str) -> Any: ...

# ---------------------------------------------------------------------------
# Response wrappers (re-export)
# ---------------------------------------------------------------------------

R = TypeVar("R")

class APIResponse(Generic[R]): ...
class AsyncAPIResponse(Generic[R]): ...

# ---------------------------------------------------------------------------
# Streams (SSE)
# ---------------------------------------------------------------------------

TStream = TypeVar("TStream")

class Stream(Generic[TStream]):
    response: httpx.Response
    def __iter__(self) -> Iterator[TStream]: ...
    def __next__(self) -> TStream: ...
    def close(self) -> None: ...
    def __enter__(self) -> Self: ...
    def __exit__(self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: Any) -> None: ...

class AsyncStream(Generic[TStream]):
    response: httpx.Response
    def __aiter__(self) -> Any: ...
    def __anext__(self) -> Coroutine[Any, Any, TStream]: ...
    async def close(self) -> None: ...
    async def __aenter__(self) -> Self: ...
    async def __aexit__(self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: Any) -> None: ...

# ---------------------------------------------------------------------------
# Shared / core type models and params
# ---------------------------------------------------------------------------

# ---- shared models ----

class ErrorObject(BaseModel):
    message: str
    ref_id: str
    detail: Optional[Dict[str, object]] = None

class ErrorResponse(BaseModel):
    error: ErrorObject
    type: Literal["error"]

class Warning(BaseModel):
    message: str
    type: Literal["spec_validation_warning", "input_validation_warning", "warning"]
    detail: Optional[Dict[str, object]] = None

class SourcePolicy(BaseModel):
    after_date: Optional[date] = None
    exclude_domains: Optional[List[str]] = None
    include_domains: Optional[List[str]] = None

# ---- shared params ----

class SourcePolicyParam(TypedDict, total=False):
    after_date: Annotated[Union[str, date, None], Any]
    exclude_domains: Sequence[str]
    include_domains: Sequence[str]

# ---------------------------------------------------------------------------
# Task schemas and specs
# ---------------------------------------------------------------------------

class AutoSchema(BaseModel):
    type: Optional[Literal["auto"]] = None

class TextSchema(BaseModel):
    description: Optional[str] = None
    type: Optional[Literal["text"]] = None

class JsonSchema(BaseModel):
    json_schema: Dict[str, object]
    type: Optional[Literal["json"]] = None

class AutoSchemaParam(TypedDict, total=False):
    """Auto schema for a task input or output."""
    type: Literal["auto"]

class TextSchemaParam(TypedDict, total=False):
    """Text description for a task input or output."""
    description: Optional[str]
    type: Literal["text"]

class JsonSchemaParam(TypedDict, total=False):
    """JSON schema for a task input or output."""
    json_schema: Required[Dict[str, object]]
    type: Literal["json"]

OutputSchema: TypeAlias = Union[JsonSchema, TextSchema, AutoSchema, str]
InputSchema: TypeAlias = Union[str, JsonSchema, TextSchema, None]

class TaskSpec(BaseModel):
    """Specification for a task.

    Auto output schemas can be specified by setting `output_schema={"type":"auto"}`. Not
    specifying a TaskSpec is the same as setting an auto output schema.

    For convenience bare strings are also accepted as input or output schemas.
    """
    output_schema: OutputSchema
    input_schema: Optional[InputSchema] = None

# Param forms
OutputSchemaParam: TypeAlias = Union[JsonSchemaParam, TextSchemaParam, AutoSchemaParam, str]
InputSchemaParam: TypeAlias = Union[str, JsonSchemaParam, TextSchemaParam]

class TaskSpecParam(TypedDict, total=False):
    """Specification for a task.

    Auto output schemas can be specified by setting `output_schema={"type":"auto"}`. Not
    specifying a TaskSpec is the same as setting an auto output schema.

    For convenience bare strings are also accepted as input or output schemas.
    """
    output_schema: Required[OutputSchemaParam]
    input_schema: Optional[InputSchemaParam]

# ---------------------------------------------------------------------------
# Citations / basis / outputs
# ---------------------------------------------------------------------------

class Citation(BaseModel):
    url: str
    excerpts: Optional[List[str]] = None
    title: Optional[str] = None

class FieldBasis(BaseModel):
    field: str
    reasoning: str
    citations: Optional[List[Citation]] = None
    confidence: Optional[str] = None

class TaskRunTextOutput(BaseModel):
    """Output from a task that returns text."""
    basis: List[FieldBasis]
    content: str
    type: Literal["text"]
    beta_fields: Optional[Dict[str, object]] = None

class TaskRunJsonOutput(BaseModel):
    """Output from a task that returns JSON."""
    basis: List[FieldBasis]
    content: Dict[str, object]
    type: Literal["json"]
    beta_fields: Optional[Dict[str, object]] = None
    output_schema: Optional[Dict[str, object]] = None

TaskRunOutput: TypeAlias = Annotated[Union[TaskRunTextOutput, TaskRunJsonOutput], Any]

# ---------------------------------------------------------------------------
# TaskRun and TaskRunResult
# ---------------------------------------------------------------------------

class TaskRun(BaseModel):
    """Status of a task run."""
    created_at: Optional[str] = None
    is_active: bool
    modified_at: Optional[str] = None
    processor: str
    run_id: str
    status: Literal["queued", "action_required", "running", "completed", "failed", "cancelling", "cancelled"]
    error: Optional[ErrorObject] = None
    metadata: Optional[Dict[str, Union[str, float, bool]]] = None
    task_group_id: Optional[str] = None
    warnings: Optional[List[Warning]] = None

class TaskRunResult(BaseModel):
    """Result of a task run."""
    output: TaskRunOutput
    run: TaskRun

# ---------------------------------------------------------------------------
# Parsed result helpers (execute(output=MyPydanticModel))
# ---------------------------------------------------------------------------

ContentType = TypeVar("ContentType", bound=__import__("pydantic").BaseModel)

class ParsedTaskRunTextOutput(TaskRunTextOutput, GenericModel, Generic[ContentType]):
    parsed: None

class ParsedTaskRunJsonOutput(TaskRunJsonOutput, GenericModel, Generic[ContentType]):
    parsed: Optional[ContentType] = None

class ParsedTaskRunResult(TaskRunResult, GenericModel, Generic[ContentType]):
    output: Union[ParsedTaskRunTextOutput[ContentType], ParsedTaskRunJsonOutput[ContentType]]

# ---------------------------------------------------------------------------
# Core endpoint param types
# ---------------------------------------------------------------------------

class TaskRunCreateParams(TypedDict, total=False):
    input: Required[Union[str, Dict[str, object]]]
    processor: Required[str]
    metadata: Optional[Dict[str, Union[str, float, bool]]]
    source_policy: Optional[SourcePolicyParam]
    task_spec: Optional[TaskSpecParam]

class TaskRunResultParams(TypedDict, total=False):
    api_timeout: Annotated[int, Any]  # alias "timeout" in implementation

# ---------------------------------------------------------------------------
# Beta types (subset: those used by resources)
# ---------------------------------------------------------------------------

ParallelBetaParam: TypeAlias = Union[
    Literal[
        "mcp-server-2025-07-17",
        "events-sse-2025-07-24",
        "webhook-2025-08-12",
        "findall-2025-09-15",
        "search-extract-2025-10-10",
        "field-basis-2025-11-25",
    ],
    str,
]

class UsageItem(BaseModel):
    """Usage item for a single operation."""
    count: int
    name: str

class Webhook(BaseModel):
    """Webhooks for Task Runs."""
    url: str
    event_types: Optional[List[Literal["task_run.status"]]] = None

class WebhookParam(TypedDict, total=False):
    """Webhooks for Task Runs."""
    url: Required[str]
    event_types: List[Literal["task_run.status"]]

class McpServer(BaseModel):
    """MCP server configuration."""
    name: str
    url: str
    allowed_tools: Optional[List[str]] = None
    headers: Optional[Dict[str, str]] = None
    type: Optional[Literal["url"]] = None

class McpServerParam(TypedDict, total=False):
    """MCP server configuration."""
    name: Required[str]
    url: Required[str]
    allowed_tools: Optional[Sequence[str]]
    headers: Optional[Dict[str, str]]
    type: Literal["url"]

class McpToolCall(BaseModel):
    """Result of an MCP tool call."""
    arguments: str
    server_name: str
    tool_call_id: str
    tool_name: str
    content: Optional[str] = None
    error: Optional[str] = None

# Beta TaskRun inputs/outputs/results

class BetaRunInput(BaseModel):
    """Task run input with additional beta fields."""
    input: Union[str, Dict[str, object]]
    processor: str
    enable_events: Optional[bool] = None
    mcp_servers: Optional[List[McpServer]] = None
    metadata: Optional[Dict[str, Union[str, float, bool]]] = None
    source_policy: Optional[SourcePolicy] = None
    task_spec: Optional[TaskSpec] = None
    webhook: Optional[Webhook] = None

class BetaRunInputParam(TypedDict, total=False):
    """Task run input with additional beta fields."""
    input: Required[Union[str, Dict[str, object]]]
    processor: Required[str]
    enable_events: Optional[bool]
    mcp_servers: Optional[Iterable[McpServerParam]]
    metadata: Optional[Dict[str, Union[str, float, bool]]]
    source_policy: Optional[SourcePolicyParam]
    task_spec: Optional[TaskSpecParam]
    webhook: Optional[WebhookParam]

class OutputBetaTaskRunTextOutput(BaseModel):
    """Output from a task that returns text."""
    basis: List[FieldBasis]
    content: str
    type: Literal["text"]
    beta_fields: Optional[Dict[str, object]] = None
    mcp_tool_calls: Optional[List[McpToolCall]] = None

class OutputBetaTaskRunJsonOutput(BaseModel):
    """Output from a task that returns JSON."""
    basis: List[FieldBasis]
    content: Dict[str, object]
    type: Literal["json"]
    beta_fields: Optional[Dict[str, object]] = None
    mcp_tool_calls: Optional[List[McpToolCall]] = None
    output_schema: Optional[Dict[str, object]] = None

BetaOutput: TypeAlias = Annotated[Union[OutputBetaTaskRunTextOutput, OutputBetaTaskRunJsonOutput], Any]

class BetaTaskRunResult(BaseModel):
    """Result of a beta task run. Available only if beta headers are specified."""
    output: BetaOutput
    run: TaskRun

class BetaTaskRunResultParams(TypedDict, total=False):
    api_timeout: Annotated[int, Any]
    betas: Annotated[List[ParallelBetaParam], Any]

# Events

class ErrorEvent(BaseModel):
    """Event indicating an error."""
    error: ErrorObject
    type: Literal["error"]

class TaskRunEvent(BaseModel):
    """Event when a task run transitions to a non-active status.

    May indicate completion, cancellation, or failure.
    """
    event_id: Optional[str] = None
    run: TaskRun
    type: Literal["task_run.state"]
    input: Optional[BetaRunInput] = None
    output: Optional[Annotated[Union[TaskRunTextOutput, TaskRunJsonOutput, None], Any]] = None

class TaskRunProgressStatsEventSourceStats(BaseModel):
    """Source stats describing progress so far."""
    num_sources_considered: Optional[int] = None
    num_sources_read: Optional[int] = None
    sources_read_sample: Optional[List[str]] = None

class TaskRunProgressStatsEvent(BaseModel):
    """A progress update for a task run."""
    progress_meter: float
    source_stats: TaskRunProgressStatsEventSourceStats
    type: Literal["task_run.progress_stats"]

class TaskRunProgressMessageEvent(BaseModel):
    """A message for a task run progress update."""
    message: str
    timestamp: Optional[str] = None
    type: Literal[
        "task_run.progress_msg.plan",
        "task_run.progress_msg.search",
        "task_run.progress_msg.result",
        "task_run.progress_msg.tool_call",
        "task_run.progress_msg.exec_status",
    ]

TaskRunEventsResponse: TypeAlias = Annotated[
    Union[TaskRunProgressStatsEvent, TaskRunProgressMessageEvent, TaskRunEvent, ErrorEvent],
    Any,
]

# Search / Extract beta endpoints

class FetchPolicyParam(TypedDict, total=False):
    """Policy for live fetching web results."""
    disable_cache_fallback: bool
    max_age_seconds: Optional[int]
    timeout_seconds: Optional[float]

class ExcerptSettingsParam(TypedDict, total=False):
    """Optional settings for returning relevant excerpts."""
    max_chars_per_result: Optional[int]
    max_chars_total: Optional[int]

class WebSearchResult(BaseModel):
    """A single search result from the web search API."""
    url: str
    excerpts: Optional[List[str]] = None
    publish_date: Optional[str] = None
    title: Optional[str] = None

class SearchResult(BaseModel):
    """Output for the Search API."""
    results: List[WebSearchResult]
    search_id: str
    usage: Optional[List[UsageItem]] = None
    warnings: Optional[List[Warning]] = None

class ExtractError(BaseModel):
    """Extract error details."""
    content: Optional[str] = None
    error_type: str
    http_status_code: Optional[int] = None
    url: str

class ExtractResult(BaseModel):
    """Extract result for a single URL."""
    url: str
    excerpts: Optional[List[str]] = None
    full_content: Optional[str] = None
    publish_date: Optional[str] = None
    title: Optional[str] = None

class ExtractResponse(BaseModel):
    """Fetch result."""
    errors: List[ExtractError]
    extract_id: str
    results: List[ExtractResult]
    usage: Optional[List[UsageItem]] = None
    warnings: Optional[List[Warning]] = None

class BetaSearchParams(TypedDict, total=False):
    excerpts: ExcerptSettingsParam
    fetch_policy: Optional[FetchPolicyParam]
    max_chars_per_result: Optional[int]
    max_results: Optional[int]
    mode: Optional[Literal["one-shot", "agentic"]]
    objective: Optional[str]
    processor: Optional[Literal["base", "pro"]]
    search_queries: Optional[Sequence[str]]
    source_policy: Optional[SourcePolicyParam]
    betas: Annotated[List[ParallelBetaParam], Any]

class FullContentFullContentSettings(TypedDict, total=False):
    """Optional settings for returning full content."""
    max_chars_per_result: Optional[int]

FullContent: TypeAlias = Union[bool, FullContentFullContentSettings]
Excerpts: TypeAlias = Union[bool, ExcerptSettingsParam]

class BetaExtractParams(TypedDict, total=False):
    urls: Required[Sequence[str]]
    betas: Required[Annotated[List[ParallelBetaParam], Any]]
    excerpts: Excerpts
    fetch_policy: Optional[FetchPolicyParam]
    full_content: FullContent
    objective: Optional[str]
    search_queries: Optional[Sequence[str]]

# TaskGroup beta

class TaskGroupStatus(BaseModel):
    """Status of a task group."""
    is_active: bool
    modified_at: Optional[str] = None
    num_task_runs: int
    status_message: Optional[str] = None
    task_run_status_counts: Dict[str, int]

class TaskGroup(BaseModel):
    """Response object for a task group, including its status and metadata."""
    created_at: Optional[str] = None
    status: TaskGroupStatus
    task_group_id: str
    metadata: Optional[Dict[str, Union[str, float, bool]]] = None

class TaskGroupCreateParams(TypedDict, total=False):
    metadata: Optional[Dict[str, Union[str, float, bool]]]

class TaskGroupAddRunsParams(TypedDict, total=False):
    inputs: Required[Iterable[BetaRunInputParam]]
    default_task_spec: Optional[TaskSpecParam]
    betas: Annotated[List[ParallelBetaParam], Any]

class TaskGroupRunResponse(BaseModel):
    """Response from adding new task runs to a task group."""
    event_cursor: Optional[str] = None
    run_cursor: Optional[str] = None
    run_ids: List[str]
    status: TaskGroupStatus

class TaskGroupEventsParams(TypedDict, total=False):
    last_event_id: Optional[str]
    api_timeout: Annotated[Optional[float], Any]

class TaskGroupGetRunsParams(TypedDict, total=False):
    include_input: bool
    include_output: bool
    last_event_id: Optional[str]
    status: Optional[Literal["queued", "action_required", "running", "completed", "failed", "cancelling", "cancelled"]]

class TaskGroupStatusEvent(BaseModel):
    """Event indicating an update to group status."""
    event_id: str
    status: TaskGroupStatus
    type: Literal["task_group_status"]

TaskGroupEventsResponse: TypeAlias = Annotated[Union[TaskGroupStatusEvent, TaskRunEvent, ErrorEvent], Any]
TaskGroupGetRunsResponse: TypeAlias = Annotated[Union[TaskRunEvent, ErrorEvent], Any]

# FindAll beta (main surfaces)

class FindAllSchema(BaseModel):
    """Response model for FindAll ingest."""
    entity_type: str
    match_conditions: List[Any]
    objective: str
    enrichments: Optional[List[Any]] = None
    generator: Optional[Literal["base", "core", "pro", "preview"]] = None
    match_limit: Optional[int] = None

class FindAllRun(BaseModel):
    """FindAll run object with status and metadata."""
    findall_id: str
    generator: Literal["base", "core", "pro", "preview"]
    status: Any
    created_at: Optional[str] = None
    metadata: Optional[Dict[str, Union[str, float, bool]]] = None
    modified_at: Optional[str] = None

class FindAllRunResult(BaseModel):
    """Complete FindAll search results."""
    candidates: List[Any]
    run: FindAllRun
    last_event_id: Optional[str] = None

FindAllEventsResponse: TypeAlias = Annotated[Union[Any, ErrorEvent], Any]

class FindAllCreateParams(TypedDict, total=False):
    entity_type: Required[str]
    generator: Required[Literal["base", "core", "pro", "preview"]]
    match_conditions: Required[Iterable[Any]]
    match_limit: Required[int]
    objective: Required[str]
    exclude_list: Optional[Iterable[Any]]
    metadata: Optional[Dict[str, Union[str, float, bool]]]
    webhook: Optional[WebhookParam]
    betas: Annotated[List[ParallelBetaParam], Any]

class FindAllIngestParams(TypedDict, total=False):
    objective: Required[str]
    betas: Annotated[List[ParallelBetaParam], Any]

class FindAllExtendParams(TypedDict, total=False):
    additional_match_limit: Required[int]
    betas: Annotated[List[ParallelBetaParam], Any]

class FindAllEnrichParams(TypedDict, total=False):
    output_schema: Required[JsonSchemaParam]
    mcp_servers: Optional[Iterable[McpServerParam]]
    processor: str
    betas: Annotated[List[ParallelBetaParam], Any]

class FindAllEventsParams(TypedDict, total=False):
    last_event_id: Optional[str]
    api_timeout: Annotated[Optional[float], Any]
    betas: Annotated[List[ParallelBetaParam], Any]

# ---------------------------------------------------------------------------
# resources: TaskRun (stable)
# ---------------------------------------------------------------------------

OutputT = TypeVar("OutputT", bound=__import__("pydantic").BaseModel)

class TaskRunResource:
    def with_raw_response(self) -> TaskRunResourceWithRawResponse: ...
    def with_streaming_response(self) -> TaskRunResourceWithStreamingResponse: ...

    def create(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        source_policy: Optional[SourcePolicyParam] | Omit = ...,
        task_spec: Optional[TaskSpecParam] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRun:
        """
        Initiates a task run.

        Returns immediately with a run object in status 'queued'.

        Beta features can be enabled by setting the 'parallel-beta' header.

        Args:
          input: Input to the task, either text or a JSON object.

          processor: Processor to use for the task.

          metadata: User-provided metadata stored with the run. Keys and values must be strings with
              a maximum length of 16 and 512 characters respectively.

          source_policy: Source policy for web search results.

              This policy governs which sources are allowed/disallowed in results.

          task_spec: Specification for a task.

              Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
              Not specifying a TaskSpec is the same as setting an auto output schema.

              For convenience bare strings are also accepted as input or output schemas.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def retrieve(
        self,
        run_id: str,
        *,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRun:
        """
        Retrieves run status by run_id.

        The run result is available from the `/result` endpoint.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def result(
        self,
        run_id: str,
        *,
        api_timeout: int | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRunResult:
        """
        Retrieves a run result by run_id, blocking until the run is completed.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    @overload
    def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Optional[OutputSchema] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRunResult: ...
    @overload
    def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Type[OutputT],
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> ParsedTaskRunResult[OutputT]: ...
    def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Optional[OutputSchema] | Type[OutputT] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]:
        """
        Convenience method to create and execute a task run in a single call.

        Awaits run completion. If the run is successful, a `ParsedTaskRunResult`
        is returned when a pydantic was specified in `output`. Otherwise, a
        `TaskRunResult` is returned.

        Possible errors:
        - `TimeoutError`: If the run does not finish within the specified timeout.
        - `APIStatusError`: If the API returns a non-200-range status code.
        - `APIConnectionError`: If the connection to the API fails.

        Args:
          input: Input to the task, either text or a JSON object.

          processor: Processor to use for the task.

          metadata: User-provided metadata stored with the run. Keys and values must be strings with
            a maximum length of 16 and 512 characters respectively.

          output: Optional output schema or pydantic type. If pydantic is provided,
            the response will have a parsed field.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds.
            If the result is not available within the timeout, a `TimeoutError` is raised.
        """

class AsyncTaskRunResource:
    def with_raw_response(self) -> AsyncTaskRunResourceWithRawResponse: ...
    def with_streaming_response(self) -> AsyncTaskRunResourceWithStreamingResponse: ...

    async def create(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        source_policy: Optional[SourcePolicyParam] | Omit = ...,
        task_spec: Optional[TaskSpecParam] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRun:
        """
        Initiates a task run.

        Returns immediately with a run object in status 'queued'.

        Beta features can be enabled by setting the 'parallel-beta' header.

        Args:
          input: Input to the task, either text or a JSON object.

          processor: Processor to use for the task.

          metadata: User-provided metadata stored with the run. Keys and values must be strings with
              a maximum length of 16 and 512 characters respectively.

          source_policy: Source policy for web search results.

              This policy governs which sources are allowed/disallowed in results.

          task_spec: Specification for a task.

              Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
              Not specifying a TaskSpec is the same as setting an auto output schema.

              For convenience bare strings are also accepted as input or output schemas.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    async def retrieve(
        self,
        run_id: str,
        *,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRun:
        """
        Retrieves run status by run_id.

        The run result is available from the `/result` endpoint.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    async def result(
        self,
        run_id: str,
        *,
        api_timeout: int | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRunResult:
        """
        Retrieves a run result by run_id, blocking until the run is completed.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    @overload
    async def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Optional[OutputSchema] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRunResult: ...
    @overload
    async def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Type[OutputT],
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> ParsedTaskRunResult[OutputT]: ...
    async def execute(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        output: Optional[OutputSchema] | Type[OutputT] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]:
        """
        Convenience method to create and execute a task run in a single call.

        Awaits run completion. If the run is successful, a `ParsedTaskRunResult`
        is returned when a pydantic was specified in `output`. Otherwise, a
        `TaskRunResult` is returned.

        Possible errors:
        - `TimeoutError`: If the run does not finish within the specified timeout.
        - `APIStatusError`: If the API returns a non-200-range status code.
        - `APIConnectionError`: If the connection to the API fails.

        Args:
          input: Input to the task, either text or a JSON object.

          processor: Processor to use for the task.

          metadata: User-provided metadata stored with the run. Keys and values must be strings with
            a maximum length of 16 and 512 characters respectively.

          output: Optional output schema or pydantic type. If pydantic is provided,
            the response will have a parsed field.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds.
            If the result is not available within the timeout, a `TimeoutError` is raised.
        """

# Raw/streaming response wrappers for TaskRunResource
class TaskRunResourceWithRawResponse:
    create: Callable[..., APIResponse[TaskRun]]
    retrieve: Callable[..., APIResponse[TaskRun]]
    result: Callable[..., APIResponse[TaskRunResult]]

class AsyncTaskRunResourceWithRawResponse:
    create: Callable[..., Coroutine[Any, Any, AsyncAPIResponse[TaskRun]]]
    retrieve: Callable[..., Coroutine[Any, Any, AsyncAPIResponse[TaskRun]]]
    result: Callable[..., Coroutine[Any, Any, AsyncAPIResponse[TaskRunResult]]]

class TaskRunResourceWithStreamingResponse:
    create: Callable[..., Any]
    retrieve: Callable[..., Any]
    result: Callable[..., Any]

class AsyncTaskRunResourceWithStreamingResponse:
    create: Callable[..., Any]
    retrieve: Callable[..., Any]
    result: Callable[..., Any]

# ---------------------------------------------------------------------------
# resources: Beta
# ---------------------------------------------------------------------------

class BetaTaskRunResource:
    def create(
        self,
        *,
        input: Union[str, Dict[str, object]],
        processor: str,
        enable_events: Optional[bool] | Omit = ...,
        mcp_servers: Optional[Iterable[McpServerParam]] | Omit = ...,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        source_policy: Optional[SourcePolicyParam] | Omit = ...,
        task_spec: Optional[TaskSpecParam] | Omit = ...,
        webhook: Optional[WebhookParam] | Omit = ...,
        betas: List[ParallelBetaParam] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskRun:
        """
        Initiates a task run.

        Returns immediately with a run object in status 'queued'.

        Beta features can be enabled by setting the 'parallel-beta' header.

        Args:
          input: Input to the task, either text or a JSON object.

          processor: Processor to use for the task.

          enable_events: Controls tracking of task run execution progress. When set to true, progress
              events are recorded and can be accessed via the
              [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When
              false, no progress events are tracked. Note that progress tracking cannot be
              enabled after a run has been created. The flag is set to true by default for
              premium processors (pro and above). To enable this feature in your requests,
              specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header
              (for API calls) or `betas` param (for the SDKs).

          mcp_servers: Optional list of MCP servers to use for the run. To enable this feature in your
              requests, specify `mcp-server-2025-07-17` as one of the values in
              `parallel-beta` header (for API calls) or `betas` param (for the SDKs).

          metadata: User-provided metadata stored with the run. Keys and values must be strings with
              a maximum length of 16 and 512 characters respectively.

          source_policy: Source policy for web search results.

              This policy governs which sources are allowed/disallowed in results.

          task_spec: Specification for a task.

              Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
              Not specifying a TaskSpec is the same as setting an auto output schema.

              For convenience bare strings are also accepted as input or output schemas.

          webhook: Webhooks for Task Runs.

          betas: Optional header to specify the beta version(s) to enable.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def events(
        self,
        run_id: str,
        *,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> Stream[TaskRunEventsResponse]:
        """
        Streams events for a task run.

        Returns a stream of events showing progress updates and state changes for the
        task run.

        For task runs that did not have enable_events set to true during creation, the
        frequency of events will be reduced.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def result(
        self,
        run_id: str,
        *,
        api_timeout: int | Omit = ...,
        betas: List[ParallelBetaParam] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> BetaTaskRunResult:
        """
        Retrieves a run result by run_id, blocking until the run is completed.

        Args:
          betas: Optional header to specify the beta version(s) to enable.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

class AsyncBetaTaskRunResource:
    async def create(self, **kwargs: Any) -> TaskRun: ...
    async def events(self, run_id: str, **kwargs: Any) -> AsyncStream[TaskRunEventsResponse]: ...
    async def result(self, run_id: str, **kwargs: Any) -> BetaTaskRunResult: ...

class BetaTaskGroupResource:
    def create(
        self,
        *,
        metadata: Optional[Dict[str, Union[str, float, bool]]] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> TaskGroup:
        """
        Initiates a TaskGroup to group and track multiple runs.

        Args:
          metadata: User-provided metadata stored with the task group.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def retrieve(self, task_group_id: str, **kwargs: Any) -> TaskGroup:
        """
        Retrieves aggregated status across runs in a TaskGroup.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def add_runs(self, task_group_id: str, **kwargs: Any) -> TaskGroupRunResponse:
        """
        Initiates multiple task runs within a TaskGroup.

        Args:
          inputs: List of task runs to execute.

          default_task_spec: Specification for a task.

              Auto output schemas can be specified by setting `output_schema={"type":"auto"}`.
              Not specifying a TaskSpec is the same as setting an auto output schema.

              For convenience bare strings are also accepted as input or output schemas.

          betas: Optional header to specify the beta version(s) to enable.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def events(self, task_group_id: str, **kwargs: Any) -> Stream[TaskGroupEventsResponse]:
        """
        Streams events from a TaskGroup: status updates and run completions.

        The connection will remain open for up to an hour as long as at least one run in
        the group is still active.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def get_runs(self, task_group_id: str, **kwargs: Any) -> Stream[TaskGroupGetRunsResponse]:
        """
        Retrieves task runs in a TaskGroup and optionally their inputs and outputs.

        All runs within a TaskGroup are returned as a stream. To get the inputs and/or
        outputs back in the stream, set the corresponding `include_input` and
        `include_output` parameters to `true`.

        The stream is resumable using the `event_id` as the cursor. To resume a stream,
        specify the `last_event_id` parameter with the `event_id` of the last event in
        the stream. The stream will resume from the next event after the
        `last_event_id`.

        Args:
          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

class AsyncBetaTaskGroupResource:
    async def create(self, **kwargs: Any) -> TaskGroup: ...
    async def retrieve(self, task_group_id: str, **kwargs: Any) -> TaskGroup: ...
    async def add_runs(self, task_group_id: str, **kwargs: Any) -> TaskGroupRunResponse: ...
    async def events(self, task_group_id: str, **kwargs: Any) -> AsyncStream[TaskGroupEventsResponse]: ...
    async def get_runs(self, task_group_id: str, **kwargs: Any) -> AsyncStream[TaskGroupGetRunsResponse]: ...

class FindAllResource:
    def create(self, **kwargs: Any) -> FindAllRun: ...
    def retrieve(self, findall_id: str, **kwargs: Any) -> FindAllRun: ...
    def cancel(self, findall_id: str, **kwargs: Any) -> object: ...
    def enrich(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...
    def events(self, findall_id: str, **kwargs: Any) -> Stream[FindAllEventsResponse]: ...
    def extend(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...
    def ingest(self, **kwargs: Any) -> FindAllSchema: ...
    def result(self, findall_id: str, **kwargs: Any) -> FindAllRunResult: ...
    def schema(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...

class AsyncFindAllResource:
    async def create(self, **kwargs: Any) -> FindAllRun: ...
    async def retrieve(self, findall_id: str, **kwargs: Any) -> FindAllRun: ...
    async def cancel(self, findall_id: str, **kwargs: Any) -> object: ...
    async def enrich(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...
    async def events(self, findall_id: str, **kwargs: Any) -> AsyncStream[FindAllEventsResponse]: ...
    async def extend(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...
    async def ingest(self, **kwargs: Any) -> FindAllSchema: ...
    async def result(self, findall_id: str, **kwargs: Any) -> FindAllRunResult: ...
    async def schema(self, findall_id: str, **kwargs: Any) -> FindAllSchema: ...

class BetaResource:
    task_run: BetaTaskRunResource
    task_group: BetaTaskGroupResource
    findall: FindAllResource

    def extract(
        self,
        *,
        urls: Sequence[str],
        betas: List[ParallelBetaParam],
        excerpts: Excerpts | Omit = ...,
        fetch_policy: Optional[FetchPolicyParam] | Omit = ...,
        full_content: FullContent | Omit = ...,
        objective: Optional[str] | Omit = ...,
        search_queries: Optional[Sequence[str]] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> ExtractResponse:
        """
        Extracts relevant content from specific web URLs.

        To access this endpoint, pass the `parallel-beta` header with the value
        `search-extract-2025-10-10`.

        Args:
          betas: Optional header to specify the beta version(s) to enable.

          excerpts: Include excerpts from each URL relevant to the search objective and queries.
              Note that if neither objective nor search_queries is provided, excerpts are
              redundant with full content.

          fetch_policy: Policy for live fetching web results.

          full_content: Include full content from each URL. Note that if neither objective nor
              search_queries is provided, excerpts are redundant with full content.

          objective: If provided, focuses extracted content on the specified search objective.

          search_queries: If provided, focuses extracted content on the specified keyword search queries.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

    def search(
        self,
        *,
        excerpts: ExcerptSettingsParam | Omit = ...,
        fetch_policy: Optional[FetchPolicyParam] | Omit = ...,
        max_chars_per_result: Optional[int] | Omit = ...,
        max_results: Optional[int] | Omit = ...,
        mode: Optional[Literal["one-shot", "agentic"]] | Omit = ...,
        objective: Optional[str] | Omit = ...,
        processor: Optional[Literal["base", "pro"]] | Omit = ...,
        search_queries: Optional[Sequence[str]] | Omit = ...,
        source_policy: Optional[SourcePolicyParam] | Omit = ...,
        betas: List[ParallelBetaParam] | Omit = ...,
        extra_headers: Mapping[str, Union[str, Omit]] | None = ...,
        extra_query: Mapping[str, object] | None = ...,
        extra_body: object | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
    ) -> SearchResult:
        """
        Searches the web.

        To access this endpoint, pass the `parallel-beta` header with the value
        `search-extract-2025-10-10`.

        Args:
          excerpts: Optional settings to configure excerpt generation.

          fetch_policy: Policy for live fetching web results.

          max_chars_per_result: DEPRECATED: Use `excerpts.max_chars_per_result` instead.

          max_results: Upper bound on the number of results to return. May be limited by the processor.
              Defaults to 10 if not provided.

          mode: Presets default values for parameters for different use cases. `one-shot`
              returns more comprehensive results and longer excerpts to answer questions from
              a single response, while `agentic` returns more concise, token-efficient results
              for use in an agentic loop.

          objective: Natural-language description of what the web search is trying to find. May
              include guidance about preferred sources or freshness. At least one of objective
              or search_queries must be provided.

          processor: DEPRECATED: use `mode` instead.

          search_queries: Optional list of traditional keyword search queries to guide the search. May
              contain search operators. At least one of objective or search_queries must be
              provided.

          source_policy: Source policy for web search results.

              This policy governs which sources are allowed/disallowed in results.

          betas: Optional header to specify the beta version(s) to enable.

          extra_headers: Send extra headers

          extra_query: Add additional query parameters to the request

          extra_body: Add additional JSON properties to the request

          timeout: Override the client-level default timeout for this request, in seconds
        """

class AsyncBetaResource:
    task_run: AsyncBetaTaskRunResource
    task_group: AsyncBetaTaskGroupResource
    findall: AsyncFindAllResource
    async def extract(self, **kwargs: Any) -> ExtractResponse: ...
    async def search(self, **kwargs: Any) -> SearchResult: ...

# ---------------------------------------------------------------------------
# Client
# ---------------------------------------------------------------------------

class RequestOptions(TypedDict, total=False):
    headers: Mapping[str, Union[str, Omit]]
    max_retries: int
    timeout: float | httpx.Timeout | None
    params: Mapping[str, object]
    extra_json: Mapping[str, object]
    idempotency_key: str
    follow_redirects: bool

Client = "Parallel"
AsyncClient = "AsyncParallel"

class Parallel:
    api_key: str
    task_run: TaskRunResource
    beta: BetaResource

    with_raw_response: ParallelWithRawResponse
    with_streaming_response: ParallelWithStreamedResponse

    def __init__(
        self,
        *,
        api_key: str | None = ...,
        base_url: str | httpx.URL | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
        max_retries: int = ...,
        default_headers: Mapping[str, str] | None = ...,
        default_query: Mapping[str, object] | None = ...,
        http_client: httpx.Client | None = ...,
        _strict_response_validation: bool = ...,
    ) -> None: ...

    def copy(
        self,
        *,
        api_key: str | None = ...,
        base_url: str | httpx.URL | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
        http_client: httpx.Client | None = ...,
        max_retries: int | NotGiven = ...,
        default_headers: Mapping[str, str] | None = ...,
        set_default_headers: Mapping[str, str] | None = ...,
        default_query: Mapping[str, object] | None = ...,
        set_default_query: Mapping[str, object] | None = ...,
        _extra_kwargs: Mapping[str, Any] = ...,
    ) -> Self: ...
    with_options: Callable[..., Self]

class AsyncParallel:
    api_key: str
    task_run: AsyncTaskRunResource
    beta: AsyncBetaResource

    with_raw_response: AsyncParallelWithRawResponse
    with_streaming_response: AsyncParallelWithStreamedResponse

    def __init__(
        self,
        *,
        api_key: str | None = ...,
        base_url: str | httpx.URL | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
        max_retries: int = ...,
        default_headers: Mapping[str, str] | None = ...,
        default_query: Mapping[str, object] | None = ...,
        http_client: httpx.AsyncClient | None = ...,
        _strict_response_validation: bool = ...,
    ) -> None: ...

    def copy(
        self,
        *,
        api_key: str | None = ...,
        base_url: str | httpx.URL | None = ...,
        timeout: float | httpx.Timeout | None | NotGiven = ...,
        http_client: httpx.AsyncClient | None = ...,
        max_retries: int | NotGiven = ...,
        default_headers: Mapping[str, str] | None = ...,
        set_default_headers: Mapping[str, str] | None = ...,
        default_query: Mapping[str, object] | None = ...,
        set_default_query: Mapping[str, object] | None = ...,
        _extra_kwargs: Mapping[str, Any] = ...,
    ) -> Self: ...
    with_options: Callable[..., Self]

class ParallelWithRawResponse:
    task_run: Any
    beta: Any

class AsyncParallelWithRawResponse:
    task_run: Any
    beta: Any

class ParallelWithStreamedResponse:
    task_run: Any
    beta: Any

class AsyncParallelWithStreamedResponse:
    task_run: Any
    beta: Any

# ---------------------------------------------------------------------------
# "resources" module proxy (parallel.resources) exists at runtime
# In stubs, expose it simply as a module-like attribute
# ---------------------------------------------------------------------------

resources: Any

# ---------------------------------------------------------------------------
# types submodule (exposed as parallel.types)
# ---------------------------------------------------------------------------

class _TypesModule(Protocol):
    Warning: Type[Warning]
    ErrorObject: Type[ErrorObject]
    SourcePolicy: Type[SourcePolicy]
    ErrorResponse: Type[ErrorResponse]

    Citation: Type[Citation]
    FieldBasis: Type[FieldBasis]

    TaskRun: Type[TaskRun]
    TaskRunResult: Type[TaskRunResult]
    ParsedTaskRunResult: Type[ParsedTaskRunResult[Any]]

    TaskSpec: Type[TaskSpec]
    TaskSpecParam: Type[TaskSpecParam]

    AutoSchema: Type[AutoSchema]
    TextSchema: Type[TextSchema]
    JsonSchema: Type[JsonSchema]
    AutoSchemaParam: Type[AutoSchemaParam]
    TextSchemaParam: Type[TextSchemaParam]
    JsonSchemaParam: Type[JsonSchemaParam]

    TaskRunCreateParams: Type[TaskRunCreateParams]
    TaskRunResultParams: Type[TaskRunResultParams]

    class beta(Protocol):
        ParallelBetaParam: Any
        BetaTaskRunResult: Type[BetaTaskRunResult]
        TaskRunEventsResponse: Any
        TaskRunEvent: Type[TaskRunEvent]
        ErrorEvent: Type[ErrorEvent]
        SearchResult: Type[SearchResult]
        ExtractResponse: Type[ExtractResponse]
        FindAllRun: Type[FindAllRun]
        FindAllSchema: Type[FindAllSchema]
        FindAllRunResult: Type[FindAllRunResult]

types: _TypesModule

# ---------------------------------------------------------------------------
# Logging helper (env controlled)
# ---------------------------------------------------------------------------

def setup_logging() -> None: ...
logger: logging.Logger
httpx_logger: logging.Logger
```

### Notes / limitations (so you aren’t surprised)
- This stub focuses on **public API surface** reachable from `import parallel`:
  - `Parallel` / `AsyncParallel`
  - `.task_run` and `.beta.*` resources
  - main response/data model types and parameter TypedDicts
  - streaming types and core exceptions
- I **copied resource method docstrings 1:1** as present in the repo.
- Many model field docstrings exist in the `.py` models as attribute docstrings; `.pyi` cannot encode those in a valid way, so they are omitted rather than paraphrased.
- I intentionally typed some complicated “FindAll” event unions and deeply nested models as `Any` to keep the stub readable; the repo has the full detail if you need a “maximal fidelity” version.

If you want, I can produce a second variant optimized specifically for LLM consumption (not necessarily valid `.pyi`), where I include *all* model field docstrings and union discriminators as comments.
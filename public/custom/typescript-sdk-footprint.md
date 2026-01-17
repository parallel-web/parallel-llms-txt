
Below is a \*\*single consolidated `index.d.ts`\*\* that summarizes the \*\*public footprint\*\* of the SDK you pasted (as exposed by `src/index.ts` and the exported resource modules). I’ve kept \*\*doc-comments copied 1:1\*\* where they exist in the provided sources. (Internal modules are intentionally not represented, per `internal/README.md` and because they’re not part of the public import surface.)
> Save as e.g. `parallel-sdk-footprint.d.ts`.
```ts
// parallel-sdk-footprint.d.ts
// Consolidated public TypeScript declarations (single-file) for the SDK footprint.
// Doc-comments are copied 1:1 from the provided source where available.
/\* ===========================
\* Core public exports (root)
\* =========================== \*/
/\*\* Exported by src/version.ts \*/
export declare const VERSION: '0.3.0'; // x-release-please-version
/\* ===========================
\* Errors (src/core/error.ts)
\* =========================== \*/
export declare class ParallelError extends Error {}
export declare class APIError<
TStatus extends number | undefined = number | undefined,
THeaders extends Headers | undefined = Headers | undefined,
TError extends Object | undefined = Object | undefined,
> extends ParallelError {
/\*\* HTTP status for the response that caused the error \*/
readonly status: TStatus;
/\*\* HTTP headers for the response that caused the error \*/
readonly headers: THeaders;
/\*\* JSON body of the response that caused the error \*/
readonly error: TError;
constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders);
static generate(
status: number | undefined,
errorResponse: Object | undefined,
message: string | undefined,
headers: Headers | undefined,
): APIError;
}
export declare class APIUserAbortError extends APIError {
constructor({ message }?: { message?: string });
}
export declare class APIConnectionError extends APIError {
constructor({ message, cause }?: { message?: string | undefined; cause?: Error | undefined });
}
export declare class APIConnectionTimeoutError extends APIConnectionError {
constructor({ message }?: { message?: string });
}
export declare class BadRequestError extends APIError<400, Headers> {}
export declare class AuthenticationError extends APIError<401, Headers> {}
export declare class PermissionDeniedError extends APIError<403, Headers> {}
export declare class NotFoundError extends APIError<404, Headers> {}
export declare class ConflictError extends APIError<409, Headers> {}
export declare class UnprocessableEntityError extends APIError<422, Headers> {}
export declare class RateLimitError extends APIError<429, Headers> {}
export declare class InternalServerError extends APIError {}
/\* ===========================
\* Uploads (src/core/uploads.ts)
\* =========================== \*/
export declare type Uploadable = File | Response | (AsyncIterable & { path: string | { toString(): string } }) | Blob;
/\*\* Input types supported by toFile() helper \*/
export declare type ToFileInput =
| Blob
| File
| Response
| Exclude
| AsyncIterable;
/\*\*
\* Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
\* @param value the raw content of the file. Can be an {@link Uploadable}, BlobLikePart, or AsyncIterable of BlobLikeParts
\* @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
\* @param {Object=} options additional properties
\* @param {string=} options.type the MIME type of the content
\* @param {number=} options.lastModified the last modified timestamp
\* @returns a {@link File} with the given properties
\*/
export declare function toFile(
value: ToFileInput | PromiseLike,
name?: string | null | undefined,
options?: { type?: string; lastModified?: number } | undefined,
): Promise;
/\* ===========================
\* Streaming (src/core/streaming.ts)
\* =========================== \*/
export declare type ServerSentEvent = {
event: string | null;
data: string;
raw: string[];
};
export declare class Stream implements AsyncIterable {
controller: AbortController;
constructor(iterator: () => AsyncIterator, controller: AbortController, client?: Parallel);
static fromSSEResponse(
response: Response,
controller: AbortController,
client?: Parallel,
): Stream;
/\*\*
\* Generates a Stream from a newline-separated ReadableStream
\* where each item is a JSON value.
\*/
static fromReadableStream(
readableStream: ReadableStream,
controller: AbortController,
client?: Parallel,
): Stream;
[Symbol.asyncIterator](): AsyncIterator;
/\*\*
\* Splits the stream into two streams which can be
\* independently read from at different speeds.
\*/
tee(): [Stream, Stream];
/\*\*
\* Converts this stream to a newline-separated ReadableStream of
\* JSON stringified values in the stream
\* which can be turned back into a Stream with `Stream.fromReadableStream()`.
\*/
toReadableStream(): ReadableStream;
}
/\* ===========================
\* APIPromise (src/core/api-promise.ts)
\* =========================== \*/
/\*\*
\* A subclass of `Promise` providing additional helper methods
\* for interacting with the SDK.
\*/
export declare class APIPromise extends Promise {
constructor(
client: Parallel,
responsePromise: Promise<{
response: Response;
options: Parallel.RequestOptions & { method: any; path: string };
controller: AbortController;
requestLogID: string;
retryOfRequestLogID: string | undefined;
startTime: number;
}>,
parseResponse?: (
client: Parallel,
props: {
response: Response;
options: Parallel.RequestOptions & { method: any; path: string };
controller: AbortController;
requestLogID: string;
retryOfRequestLogID: string | undefined;
startTime: number;
},
) => any,
);
/\*\*
\* Gets the raw `Response` instance instead of parsing the response
\* data.
\*
\* If you want to parse the response body but still get the `Response`
\* instance, you can use {@link withResponse()}.
\*
\* 👋 Getting the wrong TypeScript type for `Response`?
\* Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
\* to your `tsconfig.json`.
\*/
asResponse(): Promise;
/\*\*
\* Gets the parsed response data and the raw `Response` instance.
\*
\* If you just want to get the raw `Response` instance without parsing it,
\* you can use {@link asResponse()}.
\*
\* 👋 Getting the wrong TypeScript type for `Response`?
\* Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
\* to your `tsconfig.json`.
\*/
withResponse(): Promise<{ data: T; response: Response }>;
}
/\* ===========================
\* Shared resource types (src/resources/shared.ts)
\* =========================== \*/
/\*\*
\* An error message.
\*/
export interface ErrorObject {
/\*\*
\* Human-readable message.
\*/
message: string;
/\*\*
\* Reference ID for the error.
\*/
ref\_id: string;
/\*\*
\* Optional detail supporting the error.
\*/
detail?: { [key: string]: unknown } | null;
}
/\*\*
\* Response object used for non-200 status codes.
\*/
export interface ErrorResponse {
/\*\*
\* Error.
\*/
error: ErrorObject;
/\*\*
\* Always 'error'.
\*/
type: 'error';
}
/\*\*
\* Source policy for web search results.
\*
\* This policy governs which sources are allowed/disallowed in results.
\*/
export interface SourcePolicy {
/\*\*
\* Optional start date for filtering search results. Results will be limited to
\* content published on or after this date. Provided as an RFC 3339 date string
\* (YYYY-MM-DD).
\*/
after\_date?: string | null;
/\*\*
\* List of domains to exclude from results. If specified, sources from these
\* domains will be excluded. Accepts plain domains (e.g., example.com,
\* subdomain.example.gov) or bare domain extension starting with a period (e.g.,
\* .gov, .edu, .co.uk).
\*/
exclude\_domains?: Array;
/\*\*
\* List of domains to restrict the results to. If specified, only sources from
\* these domains will be included. Accepts plain domains (e.g., example.com,
\* subdomain.example.gov) or bare domain extension starting with a period (e.g.,
\* .gov, .edu, .co.uk).
\*/
include\_domains?: Array;
}
/\*\*
\* Human-readable message for a task.
\*/
export interface Warning {
/\*\*
\* Human-readable message.
\*/
message: string;
/\*\*
\* Type of warning. Note that adding new warning types is considered a
\* backward-compatible change.
\*/
type: 'spec\_validation\_warning' | 'input\_validation\_warning' | 'warning';
/\*\*
\* Optional detail supporting the warning.
\*/
detail?: { [key: string]: unknown } | null;
}
/\* ===========================
\* TaskRun resource (src/resources/task-run.ts)
\* =========================== \*/
export interface AutoSchema {
/\*\*
\* The type of schema being defined. Always `auto`.
\*/
type?: 'auto';
}
/\*\*
\* A citation for a task output.
\*/
export interface Citation {
/\*\*
\* URL of the citation.
\*/
url: string;
/\*\*
\* Excerpts from the citation supporting the output. Only certain processors
\* provide excerpts.
\*/
excerpts?: Array | null;
/\*\*
\* Title of the citation.
\*/
title?: string | null;
}
/\*\*
\* Citations and reasoning supporting one field of a task output.
\*/
export interface FieldBasis {
/\*\*
\* Name of the output field.
\*/
field: string;
/\*\*
\* Reasoning for the output field.
\*/
reasoning: string;
/\*\*
\* List of citations supporting the output field.
\*/
citations?: Array;
/\*\*
\* Confidence level for the output field. Only certain processors provide
\* confidence levels.
\*/
confidence?: string | null;
}
/\*\*
\* JSON schema for a task input or output.
\*/
export interface JsonSchema {
/\*\*
\* A JSON Schema object. Only a subset of JSON Schema is supported.
\*/
json\_schema: { [key: string]: unknown };
/\*\*
\* The type of schema being defined. Always `json`.
\*/
type?: 'json';
}
/\*\*
\* Request to run a task.
\*/
export interface RunInput {
/\*\*
\* Input to the task, either text or a JSON object.
\*/
input: string | { [key: string]: unknown };
/\*\*
\* Processor to use for the task.
\*/
processor: string;
/\*\*
\* User-provided metadata stored with the run. Keys and values must be strings with
\* a maximum length of 16 and 512 characters respectively.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* Source policy for web search results.
\*
\* This policy governs which sources are allowed/disallowed in results.
\*/
source\_policy?: SourcePolicy | null;
/\*\*
\* Specification for a task.
\*
\* Auto output schemas can be specified by setting `output\_schema={"type":"auto"}`.
\* Not specifying a TaskSpec is the same as setting an auto output schema.
\*
\* For convenience bare strings are also accepted as input or output schemas.
\*/
task\_spec?: TaskSpec | null;
}
/\*\*
\* Status of a task run.
\*/
export interface TaskRun {
/\*\*
\* Timestamp of the creation of the task, as an RFC 3339 string.
\*/
created\_at: string | null;
/\*\*
\* Whether the run is currently active, i.e. status is one of {'cancelling',
\* 'queued', 'running'}.
\*/
is\_active: boolean;
/\*\*
\* Timestamp of the last modification to the task, as an RFC 3339 string.
\*/
modified\_at: string | null;
/\*\*
\* Processor used for the run.
\*/
processor: string;
/\*\*
\* ID of the task run.
\*/
run\_id: string;
/\*\*
\* Status of the run.
\*/
status: 'queued' | 'action\_required' | 'running' | 'completed' | 'failed' | 'cancelling' | 'cancelled';
/\*\*
\* An error message.
\*/
error?: ErrorObject | null;
/\*\*
\* User-provided metadata stored with the run.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* ID of the taskgroup to which the run belongs.
\*/
taskgroup\_id?: string | null;
/\*\*
\* Warnings for the run, if any.
\*/
warnings?: Array | null;
}
/\*\*
\* Output from a task that returns JSON.
\*/
export interface TaskRunJsonOutput {
/\*\*
\* Basis for each top-level field in the JSON output. Per-list-element basis
\* entries are available only when the `parallel-beta: field-basis-2025-11-25`
\* header is supplied.
\*/
basis: Array;
/\*\*
\* Output from the task as a native JSON object, as determined by the output schema
\* of the task spec.
\*/
content: { [key: string]: unknown };
/\*\*
\* The type of output being returned, as determined by the output schema of the
\* task spec.
\*/
type: 'json';
/\*\*
\* Additional fields from beta features used in this task run. When beta features
\* are specified during both task run creation and result retrieval, this field
\* will be empty and instead the relevant beta attributes will be directly included
\* in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta
\* features were specified during task run creation but not during result
\* retrieval, this field will contain the dump of fields from those beta features.
\* Each key represents the beta feature version (one amongst parallel-beta headers)
\* and the values correspond to the beta feature attributes, if any. For now, only
\* MCP server beta features have attributes. For example,
\* `{mcp-server-2025-07-17: [{'server\_name':'mcp\_server', 'tool\_call\_id': 'tc\_123', ...}]}}`
\*/
beta\_fields?: { [key: string]: unknown } | null;
/\*\*
\* Output schema for the Task Run. Populated only if the task was executed with an
\* auto schema.
\*/
output\_schema?: { [key: string]: unknown } | null;
}
/\*\*
\* Output from a task that returns text.
\*/
export interface TaskRunTextOutput {
/\*\*
\* Basis for the output. The basis has a single field 'output'.
\*/
basis: Array;
/\*\*
\* Text output from the task.
\*/
content: string;
/\*\*
\* The type of output being returned, as determined by the output schema of the
\* task spec.
\*/
type: 'text';
/\*\*
\* Additional fields from beta features used in this task run. When beta features
\* are specified during both task run creation and result retrieval, this field
\* will be empty and instead the relevant beta attributes will be directly included
\* in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta
\* features were specified during task run creation but not during result
\* retrieval, this field will contain the dump of fields from those beta features.
\* Each key represents the beta feature version (one amongst parallel-beta headers)
\* and the values correspond to the beta feature attributes, if any. For now, only
\* MCP server beta features have attributes. For example,
\* `{mcp-server-2025-07-17: [{'server\_name':'mcp\_server', 'tool\_call\_id': 'tc\_123', ...}]}}`
\*/
beta\_fields?: { [key: string]: unknown } | null;
}
/\*\*
\* Result of a task run.
\*/
export interface TaskRunResult {
/\*\*
\* Output from the task conforming to the output schema.
\*/
output: TaskRunTextOutput | TaskRunJsonOutput;
/\*\*
\* Task run object with status 'completed'.
\*/
run: TaskRun;
}
/\*\*
\* Specification for a task.
\*
\* Auto output schemas can be specified by setting `output\_schema={"type":"auto"}`.
\* Not specifying a TaskSpec is the same as setting an auto output schema.
\*
\* For convenience bare strings are also accepted as input or output schemas.
\*/
export interface TaskSpec {
/\*\*
\* JSON schema or text fully describing the desired output from the task.
\* Descriptions of output fields will determine the form and content of the
\* response. A bare string is equivalent to a text schema with the same
\* description.
\*/
output\_schema: JsonSchema | TextSchema | AutoSchema | string;
/\*\*
\* Optional JSON schema or text description of expected input to the task. A bare
\* string is equivalent to a text schema with the same description.
\*/
input\_schema?: string | JsonSchema | TextSchema | null;
}
/\*\*
\* Text description for a task input or output.
\*/
export interface TextSchema {
/\*\*
\* A text description of the desired output from the task.
\*/
description?: string | null;
/\*\*
\* The type of schema being defined. Always `text`.
\*/
type?: 'text';
}
export interface TaskRunCreateParams {
/\*\*
\* Input to the task, either text or a JSON object.
\*/
input: string | { [key: string]: unknown };
/\*\*
\* Processor to use for the task.
\*/
processor: string;
/\*\*
\* User-provided metadata stored with the run. Keys and values must be strings with
\* a maximum length of 16 and 512 characters respectively.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* Source policy for web search results.
\*
\* This policy governs which sources are allowed/disallowed in results.
\*/
source\_policy?: SourcePolicy | null;
/\*\*
\* Specification for a task.
\*
\* Auto output schemas can be specified by setting `output\_schema={"type":"auto"}`.
\* Not specifying a TaskSpec is the same as setting an auto output schema.
\*
\* For convenience bare strings are also accepted as input or output schemas.
\*/
task\_spec?: TaskSpec | null;
}
export interface TaskRunResultParams {
timeout?: number;
}
/\* Resource class \*/
export declare class TaskRunResource {
protected \_client: Parallel;
constructor(client: Parallel);
/\*\*
\* Initiates a task run.
\*
\* Returns immediately with a run object in status 'queued'.
\*
\* Beta features can be enabled by setting the 'parallel-beta' header.
\*/
create(body: TaskRunCreateParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Retrieves run status by run\_id.
\*
\* The run result is available from the `/result` endpoint.
\*/
retrieve(runID: string, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Retrieves a run result by run\_id, blocking until the run is completed.
\*/
result(runID: string, query?: TaskRunResultParams | null | undefined, options?: Parallel.RequestOptions): APIPromise;
}
/\* ===========================
\* Beta resource (src/resources/beta/\*)
\* =========================== \*/
export declare type ParallelBeta =
| 'mcp-server-2025-07-17'
| 'events-sse-2025-07-24'
| 'webhook-2025-08-12'
| 'findall-2025-09-15'
| 'search-extract-2025-10-10'
| 'field-basis-2025-11-25'
| (string & {});
/\*\*
\* Optional settings for returning relevant excerpts.
\*/
export interface ExcerptSettings {
/\*\*
\* Optional upper bound on the total number of characters to include per url.
\* Excerpts may contain fewer characters than this limit to maximize relevance and
\* token efficiency, but will never contain fewer than 1000 characters per result.
\*/
max\_chars\_per\_result?: number | null;
/\*\*
\* Optional upper bound on the total number of characters to include across all
\* urls. Results may contain fewer characters than this limit to maximize relevance
\* and token efficiency, but will never contain fewer than 1000 characters per
\* result.This overall limit applies in addition to max\_chars\_per\_result.
\*/
max\_chars\_total?: number | null;
}
/\*\*
\* Extract error details.
\*/
export interface ExtractError {
/\*\*
\* Content returned for http client or server errors, if any.
\*/
content: string | null;
/\*\*
\* Error type.
\*/
error\_type: string;
/\*\*
\* HTTP status code, if available.
\*/
http\_status\_code: number | null;
url: string;
}
/\*\*
\* Extract result for a single URL.
\*/
export interface ExtractResult {
/\*\*
\* URL associated with the search result.
\*/
url: string;
/\*\*
\* Relevant excerpted content from the URL, formatted as markdown.
\*/
excerpts?: Array | null;
/\*\*
\* Full content from the URL formatted as markdown, if requested.
\*/
full\_content?: string | null;
/\*\*
\* Publish date of the webpage in YYYY-MM-DD format, if available.
\*/
publish\_date?: string | null;
/\*\*
\* Title of the webpage, if available.
\*/
title?: string | null;
}
/\*\*
\* Fetch result.
\*/
export interface ExtractResponse {
/\*\*
\* Extract errors: requested URLs not in the results.
\*/
errors: Array;
/\*\*
\* Extract request ID, e.g. `extract\_cad0a6d2dec046bd95ae900527d880e7`
\*/
extract\_id: string;
/\*\*
\* Successful extract results.
\*/
results: Array;
/\*\*
\* Usage metrics for the extract request.
\*/
usage?: Array | null;
/\*\*
\* Warnings for the extract request, if any.
\*/
warnings?: Array | null;
}
/\*\*
\* Policy for live fetching web results.
\*/
export interface FetchPolicy {
/\*\*
\* If false, fallback to cached content older than max-age if live fetch fails or
\* times out. If true, returns an error instead.
\*/
disable\_cache\_fallback?: boolean;
/\*\*
\* Maximum age of cached content in seconds to trigger a live fetch. Minimum value
\* 600 seconds (10 minutes).
\*/
max\_age\_seconds?: number | null;
/\*\*
\* Timeout in seconds for fetching live content if unavailable in cache.
\*/
timeout\_seconds?: number | null;
}
/\*\*
\* Usage item for a single operation.
\*/
export interface UsageItem {
/\*\*
\* Count of the SKU.
\*/
count: number;
/\*\*
\* Name of the SKU.
\*/
name: string;
}
/\*\*
\* A single search result from the web search API.
\*/
export interface WebSearchResult {
/\*\*
\* URL associated with the search result.
\*/
url: string;
/\*\*
\* Relevant excerpted content from the URL, formatted as markdown.
\*/
excerpts?: Array | null;
/\*\*
\* Publish date of the webpage in YYYY-MM-DD format, if available.
\*/
publish\_date?: string | null;
/\*\*
\* Title of the webpage, if available.
\*/
title?: string | null;
}
/\*\*
\* Output for the Search API.
\*/
export interface SearchResult {
/\*\*
\* A list of WebSearchResult objects, ordered by decreasing relevance.
\*/
results: Array;
/\*\*
\* Search ID. Example: `search\_cad0a6d2dec046bd95ae900527d880e7`
\*/
search\_id: string;
/\*\*
\* Usage metrics for the search request.
\*/
usage?: Array | null;
/\*\*
\* Warnings for the search request, if any.
\*/
warnings?: Array | null;
}
export interface BetaExtractParams {
/\*\* Body param: \*/
urls: Array;
/\*\* Header param: Optional header to specify the beta version(s) to enable. \*/
betas: Array;
/\*\*
\* Body param: Include excerpts from each URL relevant to the search objective and
\* queries. Note that if neither objective nor search\_queries is provided, excerpts
\* are redundant with full content.
\*/
excerpts?: boolean | ExcerptSettings;
/\*\*
\* Body param: Policy for live fetching web results.
\*/
fetch\_policy?: FetchPolicy | null;
/\*\*
\* Body param: Include full content from each URL. Note that if neither objective
\* nor search\_queries is provided, excerpts are redundant with full content.
\*/
full\_content?: boolean | { max\_chars\_per\_result?: number | null };
/\*\*
\* Body param: If provided, focuses extracted content on the specified search
\* objective.
\*/
objective?: string | null;
/\*\*
\* Body param: If provided, focuses extracted content on the specified keyword
\* search queries.
\*/
search\_queries?: Array | null;
}
export interface BetaSearchParams {
/\*\*
\* Body param: Optional settings to configure excerpt generation.
\*/
excerpts?: ExcerptSettings;
/\*\*
\* Body param: Policy for live fetching web results.
\*/
fetch\_policy?: FetchPolicy | null;
/\*\*
\* @deprecated Body param: DEPRECATED: Use `excerpts.max\_chars\_per\_result` instead.
\*/
max\_chars\_per\_result?: number | null;
/\*\*
\* Body param: Upper bound on the number of results to return. May be limited by
\* the processor. Defaults to 10 if not provided.
\*/
max\_results?: number | null;
/\*\*
\* Body param: Presets default values for parameters for different use cases.
\* `one-shot` returns more comprehensive results and longer excerpts to answer
\* questions from a single response, while `agentic` returns more concise,
\* token-efficient results for use in an agentic loop.
\*/
mode?: 'one-shot' | 'agentic' | null;
/\*\*
\* Body param: Natural-language description of what the web search is trying to
\* find. May include guidance about preferred sources or freshness. At least one of
\* objective or search\_queries must be provided.
\*/
objective?: string | null;
/\*\*
\* @deprecated Body param: DEPRECATED: use `mode` instead.
\*/
processor?: 'base' | 'pro' | null;
/\*\*
\* Body param: Optional list of traditional keyword search queries to guide the
\* search. May contain search operators. At least one of objective or
\* search\_queries must be provided.
\*/
search\_queries?: Array | null;
/\*\*
\* Body param: Source policy for web search results.
\*
\* This policy governs which sources are allowed/disallowed in results.
\*/
source\_policy?: SourcePolicy | null;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
/\* Beta TaskRun events/types (src/resources/beta/task-run.ts) \*/
export interface Webhook {
/\*\*
\* URL for the webhook.
\*/
url: string;
/\*\*
\* Event types to send the webhook notifications for.
\*/
event\_types?: Array<'task\_run.status'>;
}
/\*\*
\* MCP server configuration.
\*/
export interface McpServer {
/\*\*
\* Name of the MCP server.
\*/
name: string;
/\*\*
\* URL of the MCP server.
\*/
url: string;
/\*\*
\* List of allowed tools for the MCP server.
\*/
allowed\_tools?: Array | null;
/\*\*
\* Headers for the MCP server.
\*/
headers?: { [key: string]: string } | null;
/\*\*
\* Type of MCP server being configured. Always `url`.
\*/
type?: 'url';
}
/\*\*
\* Result of an MCP tool call.
\*/
export interface McpToolCall {
/\*\*
\* Arguments used to call the MCP tool.
\*/
arguments: string;
/\*\*
\* Name of the MCP server.
\*/
server\_name: string;
/\*\*
\* Identifier for the tool call.
\*/
tool\_call\_id: string;
/\*\*
\* Name of the tool being called.
\*/
tool\_name: string;
/\*\*
\* Output received from the tool call, if successful.
\*/
content?: string | null;
/\*\*
\* Error message if the tool call failed.
\*/
error?: string | null;
}
/\*\*
\* Task run input with additional beta fields.
\*/
export interface BetaRunInput {
/\*\*
\* Input to the task, either text or a JSON object.
\*/
input: string | { [key: string]: unknown };
/\*\*
\* Processor to use for the task.
\*/
processor: string;
/\*\*
\* Controls tracking of task run execution progress. When set to true, progress
\* events are recorded and can be accessed via the
\* [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When
\* false, no progress events are tracked. Note that progress tracking cannot be
\* enabled after a run has been created. The flag is set to true by default for
\* premium processors (pro and above). To enable this feature in your requests,
\* specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header
\* (for API calls) or `betas` param (for the SDKs).
\*/
enable\_events?: boolean | null;
/\*\*
\* Optional list of MCP servers to use for the run. To enable this feature in your
\* requests, specify `mcp-server-2025-07-17` as one of the values in
\* `parallel-beta` header (for API calls) or `betas` param (for the SDKs).
\*/
mcp\_servers?: Array | null;
/\*\*
\* User-provided metadata stored with the run. Keys and values must be strings with
\* a maximum length of 16 and 512 characters respectively.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* Source policy for web search results.
\*
\* This policy governs which sources are allowed/disallowed in results.
\*/
source\_policy?: SourcePolicy | null;
/\*\*
\* Specification for a task.
\*
\* Auto output schemas can be specified by setting `output\_schema={"type":"auto"}`.
\* Not specifying a TaskSpec is the same as setting an auto output schema.
\*
\* For convenience bare strings are also accepted as input or output schemas.
\*/
task\_spec?: TaskSpec | null;
/\*\*
\* Webhooks for Task Runs.
\*/
webhook?: Webhook | null;
}
/\*\*
\* Result of a beta task run. Available only if beta headers are specified.
\*/
export interface BetaTaskRunResult {
/\*\*
\* Output from the task conforming to the output schema.
\*/
output:
| (TaskRunTextOutput & { mcp\_tool\_calls?: Array | null })
| (TaskRunJsonOutput & { mcp\_tool\_calls?: Array | null });
/\*\*
\* Beta task run object with status 'completed'.
\*/
run: TaskRun;
}
/\*\*
\* Event indicating an error.
\*/
export interface ErrorEvent {
/\*\*
\* Error.
\*/
error: ErrorObject;
/\*\*
\* Event type; always 'error'.
\*/
type: 'error';
}
/\*\*
\* Event when a task run transitions to a non-active status.
\*
\* May indicate completion, cancellation, or failure.
\*/
export interface TaskRunEvent {
/\*\*
\* Cursor to resume the event stream. Always empty for non Task Group runs.
\*/
event\_id: string | null;
/\*\*
\* Task run object.
\*/
run: TaskRun;
/\*\*
\* Event type; always 'task\_run.state'.
\*/
type: 'task\_run.state';
/\*\*
\* Task run input with additional beta fields.
\*/
input?: BetaRunInput | null;
/\*\*
\* Output from the run; included only if requested and if status == `completed`.
\*/
output?: TaskRunTextOutput | TaskRunJsonOutput | null;
}
/\*\*
\* A progress update for a task run.
\*/
export type TaskRunEventsResponse =
| {
/\*\*
\* Completion percentage of the task run. Ranges from 0 to 100 where 0 indicates no
\* progress and 100 indicates completion.
\*/
progress\_meter: number;
/\*\*
\* Source stats describing progress so far.
\*/
source\_stats: {
/\*\*
\* Number of sources considered in processing the task.
\*/
num\_sources\_considered: number | null;
/\*\*
\* Number of sources read in processing the task.
\*/
num\_sources\_read: number | null;
/\*\*
\* A sample of URLs of sources read in processing the task.
\*/
sources\_read\_sample: Array | null;
};
/\*\*
\* Event type; always 'task\_run.progress\_stats'.
\*/
type: 'task\_run.progress\_stats';
}
| {
/\*\*
\* Progress update message.
\*/
message: string;
/\*\*
\* Timestamp of the message.
\*/
timestamp: string | null;
/\*\*
\* Event type; always starts with 'task\_run.progress\_msg'.
\*/
type:
| 'task\_run.progress\_msg.plan'
| 'task\_run.progress\_msg.search'
| 'task\_run.progress\_msg.result'
| 'task\_run.progress\_msg.tool\_call'
| 'task\_run.progress\_msg.exec\_status';
}
| TaskRunEvent
| ErrorEvent;
export interface BetaTaskRunCreateParams {
input: string | { [key: string]: unknown };
processor: string;
enable\_events?: boolean | null;
mcp\_servers?: Array | null;
metadata?: { [key: string]: string | number | boolean } | null;
source\_policy?: SourcePolicy | null;
task\_spec?: TaskSpec | null;
webhook?: Webhook | null;
/\*\* Header param: Optional header to specify the beta version(s) to enable. \*/
betas?: Array;
}
export interface BetaTaskRunResultParams {
/\*\* Query param: \*/
timeout?: number;
/\*\* Header param: Optional header to specify the beta version(s) to enable. \*/
betas?: Array;
}
export declare class BetaTaskRunResource {
protected \_client: Parallel;
constructor(client: Parallel);
/\*\*
\* Initiates a task run.
\*
\* Returns immediately with a run object in status 'queued'.
\*
\* Beta features can be enabled by setting the 'parallel-beta' header.
\*/
create(params: BetaTaskRunCreateParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Streams events for a task run.
\*
\* Returns a stream of events showing progress updates and state changes for the
\* task run.
\*
\* For task runs that did not have enable\_events set to true during creation, the
\* frequency of events will be reduced.
\*/
events(runID: string, options?: Parallel.RequestOptions): APIPromise>;
/\*\*
\* Retrieves a run result by run\_id, blocking until the run is completed.
\*/
result(
runID: string,
params?: BetaTaskRunResultParams | null | undefined,
options?: Parallel.RequestOptions,
): APIPromise;
}
/\* Beta TaskGroup (src/resources/beta/task-group.ts) \*/
export interface TaskGroup {
/\*\*
\* Timestamp of the creation of the group, as an RFC 3339 string.
\*/
created\_at: string | null;
/\*\*
\* Status of the group.
\*/
status: TaskGroupStatus;
/\*\*
\* ID of the group.
\*/
taskgroup\_id: string;
/\*\*
\* User-provided metadata stored with the group.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
}
/\*\*
\* Status of a task group.
\*/
export interface TaskGroupStatus {
/\*\*
\* True if at least one run in the group is currently active, i.e. status is one of
\* {'cancelling', 'queued', 'running'}.
\*/
is\_active: boolean;
/\*\*
\* Timestamp of the last status update to the group, as an RFC 3339 string.
\*/
modified\_at: string | null;
/\*\*
\* Number of task runs in the group.
\*/
num\_task\_runs: number;
/\*\*
\* Human-readable status message for the group.
\*/
status\_message: string | null;
/\*\*
\* Number of task runs with each status.
\*/
task\_run\_status\_counts: { [key: string]: number };
}
/\*\*
\* Response from adding new task runs to a task group.
\*/
export interface TaskGroupRunResponse {
/\*\*
\* Cursor for these runs in the event stream at
\* taskgroup/events?last\_event\_id=. Empty for the first runs in the
\* group.
\*/
event\_cursor: string | null;
/\*\*
\* Cursor for these runs in the run stream at
\* taskgroup/runs?last\_event\_id=. Empty for the first runs in the
\* group.
\*/
run\_cursor: string | null;
/\*\*
\* IDs of the newly created runs.
\*/
run\_ids: Array;
/\*\*
\* Status of the group.
\*/
status: TaskGroupStatus;
}
/\*\*
\* Event indicating an update to group status.
\*/
export type TaskGroupEventsResponse =
| {
/\*\*
\* Cursor to resume the event stream.
\*/
event\_id: string;
/\*\*
\* Task group status object.
\*/
status: TaskGroupStatus;
/\*\*
\* Event type; always 'task\_group\_status'.
\*/
type: 'task\_group\_status';
}
| TaskRunEvent
| ErrorEvent;
/\*\*
\* Event when a task run transitions to a non-active status.
\*
\* May indicate completion, cancellation, or failure.
\*/
export type TaskGroupGetRunsResponse = TaskRunEvent | ErrorEvent;
export interface TaskGroupCreateParams {
/\*\*
\* User-provided metadata stored with the task group.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
}
export interface TaskGroupAddRunsParams {
/\*\*
\* Body param: List of task runs to execute.
\*/
inputs: Array;
/\*\*
\* Body param: Specification for a task.
\*
\* Auto output schemas can be specified by setting `output\_schema={"type":"auto"}`.
\* Not specifying a TaskSpec is the same as setting an auto output schema.
\*
\* For convenience bare strings are also accepted as input or output schemas.
\*/
default\_task\_spec?: TaskSpec | null;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface TaskGroupEventsParams {
last\_event\_id?: string | null;
timeout?: number | null;
}
export interface TaskGroupGetRunsParams {
include\_input?: boolean;
include\_output?: boolean;
last\_event\_id?: string | null;
status?:
| 'queued'
| 'action\_required'
| 'running'
| 'completed'
| 'failed'
| 'cancelling'
| 'cancelled'
| null;
}
export declare class TaskGroupResource {
protected \_client: Parallel;
constructor(client: Parallel);
/\*\*
\* Initiates a TaskGroup to group and track multiple runs.
\*/
create(body: TaskGroupCreateParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Retrieves aggregated status across runs in a TaskGroup.
\*/
retrieve(taskGroupID: string, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Initiates multiple task runs within a TaskGroup.
\*/
addRuns(taskGroupID: string, params: TaskGroupAddRunsParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Streams events from a TaskGroup: status updates and run completions.
\*
\* The connection will remain open for up to an hour as long as at least one run in
\* the group is still active.
\*/
events(taskGroupID: string, query?: TaskGroupEventsParams | undefined, options?: Parallel.RequestOptions): APIPromise>;
/\*\*
\* Retrieves task runs in a TaskGroup and optionally their inputs and outputs.
\*
\* All runs within a TaskGroup are returned as a stream. To get the inputs and/or
\* outputs back in the stream, set the corresponding `include\_input` and
\* `include\_output` parameters to `true`.
\*
\* The stream is resumable using the `event\_id` as the cursor. To resume a stream,
\* specify the `last\_event\_id` parameter with the `event\_id` of the last event in
\* the stream. The stream will resume from the next event after the
\* `last\_event\_id`.
\*/
getRuns(taskGroupID: string, query?: TaskGroupGetRunsParams | undefined, options?: Parallel.RequestOptions): APIPromise>;
}
/\* Beta FindAll (src/resources/beta/findall.ts) \*/
export interface IngestInput {
/\*\*
\* Natural language objective to create a FindAll run spec.
\*/
objective: string;
}
/\*\*
\* Input model for FindAll enrich.
\*/
export interface FindAllEnrichInput {
/\*\*
\* JSON schema for the enrichment output schema for the FindAll run.
\*/
output\_schema: JsonSchema;
/\*\*
\* List of MCP servers to use for the task.
\*/
mcp\_servers?: Array | null;
/\*\*
\* Processor to use for the task.
\*/
processor?: string;
}
/\*\*
\* Input model for FindAll extend.
\*/
export interface FindAllExtendInput {
/\*\*
\* Additional number of matches to find for this FindAll run. This value will be
\* added to the current match limit to determine the new total match limit. Must be
\* greater than 0.
\*/
additional\_match\_limit: number;
}
/\*\*
\* FindAll run object with status and metadata.
\*/
export interface FindAllRun {
/\*\*
\* ID of the FindAll run.
\*/
findall\_id: string;
/\*\*
\* Generator for the FindAll run.
\*/
generator: 'base' | 'core' | 'pro' | 'preview';
/\*\*
\* Status object for the FindAll run.
\*/
status: {
/\*\*
\* Whether the FindAll run is active
\*/
is\_active: boolean;
/\*\*
\* Candidate metrics for the FindAll run.
\*/
metrics: {
/\*\*
\* Number of candidates that were selected.
\*/
generated\_candidates\_count?: number;
/\*\*
\* Number of candidates that evaluated to matched.
\*/
matched\_candidates\_count?: number;
};
/\*\*
\* Status of the FindAll run.
\*/
status: 'queued' | 'action\_required' | 'running' | 'completed' | 'failed' | 'cancelling' | 'cancelled';
/\*\*
\* Reason for termination when FindAll run is in terminal status.
\*/
termination\_reason?:
| 'low\_match\_rate'
| 'match\_limit\_met'
| 'candidates\_exhausted'
| 'user\_cancelled'
| 'error\_occurred'
| 'timeout'
| null;
};
/\*\*
\* Timestamp of the creation of the run, in RFC 3339 format.
\*/
created\_at?: string | null;
/\*\*
\* Metadata for the FindAll run.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* Timestamp of the latest modification to the FindAll run result, in RFC 3339
\* format.
\*/
modified\_at?: string | null;
}
/\*\*
\* Complete FindAll search results.
\*
\* Represents a snapshot of a FindAll run, including run metadata and a list of
\* candidate entities with their match status and details at the time the snapshot
\* was taken.
\*/
export interface FindAllRunResult {
/\*\*
\* All evaluated candidates at the time of the snapshot.
\*/
candidates: Array<{
/\*\*
\* ID of the candidate.
\*/
candidate\_id: string;
/\*\*
\* Status of the candidate. One of generated, matched, unmatched, discarded.
\*/
match\_status: 'generated' | 'matched' | 'unmatched' | 'discarded';
/\*\*
\* Name of the candidate.
\*/
name: string;
/\*\*
\* URL that provides context or details of the entity for disambiguation.
\*/
url: string;
/\*\*
\* List of FieldBasis objects supporting the output.
\*/
basis?: Array | null;
/\*\*
\* Brief description of the entity that can help answer whether entity satisfies
\* the query.
\*/
description?: string | null;
/\*\*
\* Results of the match condition evaluations for this candidate. This object
\* contains the structured output that determines whether the candidate matches the
\* overall FindAll objective.
\*/
output?: { [key: string]: unknown } | null;
}>;
/\*\*
\* FindAll run object.
\*/
run: FindAllRun;
/\*\*
\* ID of the last event of the run at the time of the request. This can be used to
\* resume streaming from the last event.
\*/
last\_event\_id?: string | null;
}
/\*\*
\* Response model for FindAll ingest.
\*/
export interface FindAllSchema {
/\*\*
\* Type of the entity for the FindAll run.
\*/
entity\_type: string;
/\*\*
\* List of match conditions for the FindAll run.
\*/
match\_conditions: Array<{
/\*\*
\* Detailed description of the match condition. Include as much specific
\* information as possible to help improve the quality and accuracy of Find All run
\* results.
\*/
description: string;
/\*\*
\* Name of the match condition.
\*/
name: string;
}>;
/\*\*
\* Natural language objective of the FindAll run.
\*/
objective: string;
/\*\*
\* List of enrichment inputs for the FindAll run.
\*/
enrichments?: Array | null;
/\*\*
\* The generator of the FindAll run.
\*/
generator?: 'base' | 'core' | 'pro' | 'preview';
/\*\*
\* Max number of candidates to evaluate
\*/
match\_limit?: number | null;
}
/\*\*
\* Event containing status update for FindAll run.
\*/
export interface FindAllRunStatusEvent {
/\*\*
\* Updated FindAll run information.
\*/
data: FindAllRun;
/\*\*
\* Unique event identifier for the event.
\*/
event\_id: string;
/\*\*
\* Timestamp of the event.
\*/
timestamp: string;
/\*\*
\* Event type; always 'findall.status'.
\*/
type: 'findall.status';
}
/\*\*
\* Event containing full snapshot of FindAll run state.
\*/
export interface FindAllSchemaUpdatedEvent {
/\*\*
\* Updated FindAll schema.
\*/
data: FindAllSchema;
/\*\*
\* Unique event identifier for the event.
\*/
event\_id: string;
/\*\*
\* Timestamp of the event.
\*/
timestamp: string;
/\*\*
\* Event type; always 'findall.schema.updated'.
\*/
type: 'findall.schema.updated';
}
/\*\*
\* Event containing a candidate whose match status has changed.
\*/
export interface FindAllCandidateMatchStatusEvent {
/\*\*
\* The candidate whose match status has been updated.
\*/
data: {
/\*\*
\* ID of the candidate.
\*/
candidate\_id: string;
/\*\*
\* Status of the candidate. One of generated, matched, unmatched, discarded.
\*/
match\_status: 'generated' | 'matched' | 'unmatched' | 'discarded';
/\*\*
\* Name of the candidate.
\*/
name: string;
/\*\*
\* URL that provides context or details of the entity for disambiguation.
\*/
url: string;
/\*\*
\* List of FieldBasis objects supporting the output.
\*/
basis?: Array | null;
/\*\*
\* Brief description of the entity that can help answer whether entity satisfies
\* the query.
\*/
description?: string | null;
/\*\*
\* Results of the match condition evaluations for this candidate. This object
\* contains the structured output that determines whether the candidate matches the
\* overall FindAll objective.
\*/
output?: { [key: string]: unknown } | null;
};
/\*\*
\* Unique event identifier for the event.
\*/
event\_id: string;
/\*\*
\* Timestamp of the event.
\*/
timestamp: string;
/\*\*
\* Event type; one of findall.candidate.generated, findall.candidate.matched,
\* findall.candidate.unmatched, findall.candidate.discarded,
\* findall.candidate.enriched.
\*/
type:
| 'findall.candidate.generated'
| 'findall.candidate.matched'
| 'findall.candidate.unmatched'
| 'findall.candidate.discarded'
| 'findall.candidate.enriched';
}
/\*\*
\* Event containing full snapshot of FindAll run state.
\*/
export type FindAllEventsResponse =
| FindAllSchemaUpdatedEvent
| FindAllRunStatusEvent
| FindAllCandidateMatchStatusEvent
| ErrorEvent;
export interface FindAllCreateParams {
/\*\*
\* Body param: Type of the entity for the FindAll run.
\*/
entity\_type: string;
/\*\*
\* Body param: Generator for the FindAll run. One of base, core, pro, preview.
\*/
generator: 'base' | 'core' | 'pro' | 'preview';
/\*\*
\* Body param: List of match conditions for the FindAll run.
\*/
match\_conditions: Array<{ description: string; name: string }>;
/\*\*
\* Body param: Maximum number of matches to find for this FindAll run. Must be
\* between 5 and 1000 (inclusive).
\*/
match\_limit: number;
/\*\*
\* Body param: Natural language objective of the FindAll run.
\*/
objective: string;
/\*\*
\* Body param: List of entity names/IDs to exclude from results.
\*/
exclude\_list?: Array<{ name: string; url: string }> | null;
/\*\*
\* Body param: Metadata for the FindAll run.
\*/
metadata?: { [key: string]: string | number | boolean } | null;
/\*\*
\* Body param: Webhooks for Task Runs.
\*/
webhook?: Webhook | null;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllRetrieveParams {
/\*\*
\* Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllCancelParams {
/\*\*
\* Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllEnrichParams {
/\*\*
\* Body param: JSON schema for the enrichment output schema for the FindAll run.
\*/
output\_schema: JsonSchema;
/\*\*
\* Body param: List of MCP servers to use for the task.
\*/
mcp\_servers?: Array | null;
/\*\*
\* Body param: Processor to use for the task.
\*/
processor?: string;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllEventsParams {
/\*\* Query param: \*/
last\_event\_id?: string | null;
/\*\* Query param: \*/
timeout?: number | null;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllExtendParams {
/\*\*
\* Body param: Additional number of matches to find for this FindAll run. This
\* value will be added to the current match limit to determine the new total match
\* limit. Must be greater than 0.
\*/
additional\_match\_limit: number;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllIngestParams {
/\*\*
\* Body param: Natural language objective to create a FindAll run spec.
\*/
objective: string;
/\*\*
\* Header param: Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllResultParams {
/\*\*
\* Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export interface FindAllSchemaParams {
/\*\*
\* Optional header to specify the beta version(s) to enable.
\*/
betas?: Array;
}
export declare class FindAllResource {
protected \_client: Parallel;
constructor(client: Parallel);
/\*\*
\* Starts a FindAll run.
\*
\* This endpoint immediately returns a FindAll run object with status set to
\* 'queued'. You can get the run result snapshot using the GET
\* /v1beta/findall/runs/{findall\_id}/result endpoint. You can track the progress of
\* the run by:
\*
\* - Polling the status using the GET /v1beta/findall/runs/{findall\_id} endpoint,
\* - Subscribing to real-time updates via the
\* /v1beta/findall/runs/{findall\_id}/events endpoint,
\* - Or specifying a webhook with relevant event types during run creation to
\* receive notifications.
\*/
create(params: FindAllCreateParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Retrieve a FindAll run.
\*/
retrieve(findallID: string, params?: FindAllRetrieveParams | null | undefined, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Cancel a FindAll run.
\*/
cancel(findallID: string, params?: FindAllCancelParams | null | undefined, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Add an enrichment to a FindAll run.
\*/
enrich(findallID: string, params: FindAllEnrichParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Stream events from a FindAll run.
\*
\* Args: request: The Shapi request findall\_id: The FindAll run ID last\_event\_id:
\* Optional event ID to resume from. timeout: Optional timeout in seconds. If None,
\* keep connection alive as long as the run is going. If set, stop after specified
\* duration.
\*/
events(findallID: string, params?: FindAllEventsParams | undefined, options?: Parallel.RequestOptions): APIPromise>;
/\*\*
\* Extend a FindAll run by adding additional matches to the current match limit.
\*/
extend(findallID: string, params: FindAllExtendParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Transforms a natural language search objective into a structured FindAll spec.
\*
\* Note: Access to this endpoint requires the parallel-beta header.
\*
\* The generated specification serves as a suggested starting point and can be
\* further customized by the user.
\*/
ingest(params: FindAllIngestParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Retrieve the FindAll run result at the time of the request.
\*/
result(findallID: string, params?: FindAllResultParams | null | undefined, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Get FindAll Run Schema
\*/
schema(findallID: string, params?: FindAllSchemaParams | null | undefined, options?: Parallel.RequestOptions): APIPromise;
}
/\* Beta root resource (src/resources/beta/beta.ts) \*/
export declare class BetaResource {
protected \_client: Parallel;
constructor(client: Parallel);
taskRun: BetaTaskRunResource;
taskGroup: TaskGroupResource;
findall: FindAllResource;
/\*\*
\* Extracts relevant content from specific web URLs.
\*
\* To access this endpoint, pass the `parallel-beta` header with the value
\* `search-extract-2025-10-10`.
\*/
extract(params: BetaExtractParams, options?: Parallel.RequestOptions): APIPromise;
/\*\*
\* Searches the web.
\*
\* To access this endpoint, pass the `parallel-beta` header with the value
\* `search-extract-2025-10-10`.
\*/
search(params: BetaSearchParams, options?: Parallel.RequestOptions): APIPromise;
}
/\* ===========================
\* Client (src/client.ts)
\* =========================== \*/
export declare type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';
export declare type Logger = {
error: (message: string, ...rest: unknown[]) => void;
warn: (message: string, ...rest: unknown[]) => void;
info: (message: string, ...rest: unknown[]) => void;
debug: (message: string, ...rest: unknown[]) => void;
};
export declare type HeadersLike =
| Headers
| readonly (readonly (string | undefined | null)[])[]
| Record
| undefined
| null
| any;
export interface ClientOptions {
/\*\*
\* Defaults to process.env['PARALLEL\_API\_KEY'].
\*/
apiKey?: string | undefined;
/\*\*
\* Override the default base URL for the API, e.g., "https://api.example.com/v2/"
\*
\* Defaults to process.env['PARALLEL\_BASE\_URL'].
\*/
baseURL?: string | null | undefined;
/\*\*
\* The maximum amount of time (in milliseconds) that the client should wait for a response
\* from the server before timing out a single request.
\*
\* Note that request timeouts are retried by default, so in a worst-case scenario you may wait
\* much longer than this timeout before the promise succeeds or fails.
\*
\* @unit milliseconds
\*/
timeout?: number | undefined;
/\*\*
\* Additional `RequestInit` options to be passed to `fetch` calls.
\* Properties will be overridden by per-request `fetchOptions`.
\*/
fetchOptions?: RequestInit | undefined;
/\*\*
\* Specify a custom `fetch` function implementation.
\*
\* If not provided, we expect that `fetch` is defined globally.
\*/
fetch?: (input: string | URL | Request, init?: RequestInit) => Promise;
/\*\*
\* The maximum number of times that the client will retry a request in case of a
\* temporary failure, like a network error or a 5XX error from the server.
\*
\* @default 2
\*/
maxRetries?: number | undefined;
/\*\*
\* Default headers to include with every request to the API.
\*
\* These can be removed in individual requests by explicitly setting the
\* header to `null` in request options.
\*/
defaultHeaders?: HeadersLike | undefined;
/\*\*
\* Default query parameters to include with every request to the API.
\*
\* These can be removed in individual requests by explicitly setting the
\* param to `undefined` in request options.
\*/
defaultQuery?: Record | undefined;
/\*\*
\* Set the log level.
\*
\* Defaults to process.env['PARALLEL\_LOG'] or 'warn' if it isn't set.
\*/
logLevel?: LogLevel | undefined;
/\*\*
\* Set the logger.
\*
\* Defaults to globalThis.console.
\*/
logger?: Logger | undefined;
}
export declare namespace Parallel {
export type RequestOptions = {
/\*\*
\* The HTTP method for the request (e.g., 'get', 'post', 'put', 'delete').
\*/
method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
/\*\*
\* The URL path for the request.
\*
\* @example "/v1/foo"
\*/
path?: string;
/\*\*
\* Query parameters to include in the request URL.
\*/
query?: object | undefined | null;
/\*\*
\* The request body. Can be a string, JSON object, FormData, or other supported types.
\*/
body?: unknown;
/\*\*
\* HTTP headers to include with the request. Can be a Headers object, plain object, or array of tuples.
\*/
headers?: HeadersLike;
/\*\*
\* The maximum number of times that the client will retry a request in case of a
\* temporary failure, like a network error or a 5XX error from the server.
\*
\* @default 2
\*/
maxRetries?: number;
stream?: boolean | undefined;
/\*\*
\* The maximum amount of time (in milliseconds) that the client should wait for a response
\* from the server before timing out a single request.
\*
\* @unit milliseconds
\*/
timeout?: number;
/\*\*
\* Additional `RequestInit` options to be passed to the underlying `fetch` call.
\* These options will be merged with the client's default fetch options.
\*/
fetchOptions?: RequestInit;
/\*\*
\* An AbortSignal that can be used to cancel the request.
\*/
signal?: AbortSignal | undefined | null;
/\*\*
\* A unique key for this request to enable idempotency.
\*/
idempotencyKey?: string;
/\*\*
\* Override the default base URL for this specific request.
\*/
defaultBaseURL?: string | undefined;
\_\_binaryResponse?: boolean | undefined;
\_\_streamClass?: any;
};
export type ErrorObject = import('./parallel-sdk-footprint').ErrorObject;
export type ErrorResponse = import('./parallel-sdk-footprint').ErrorResponse;
export type SourcePolicy = import('./parallel-sdk-footprint').SourcePolicy;
export type Warning = import('./parallel-sdk-footprint').Warning;
export type TaskRun = import('./parallel-sdk-footprint').TaskRun;
export type AutoSchema = import('./parallel-sdk-footprint').AutoSchema;
export type Citation = import('./parallel-sdk-footprint').Citation;
export type FieldBasis = import('./parallel-sdk-footprint').FieldBasis;
export type JsonSchema = import('./parallel-sdk-footprint').JsonSchema;
export type RunInput = import('./parallel-sdk-footprint').RunInput;
export type TaskRunJsonOutput = import('./parallel-sdk-footprint').TaskRunJsonOutput;
export type TaskRunResult = import('./parallel-sdk-footprint').TaskRunResult;
export type TaskRunTextOutput = import('./parallel-sdk-footprint').TaskRunTextOutput;
export type TaskSpec = import('./parallel-sdk-footprint').TaskSpec;
export type TextSchema = import('./parallel-sdk-footprint').TextSchema;
export type TaskRunCreateParams = import('./parallel-sdk-footprint').TaskRunCreateParams;
export type TaskRunResultParams = import('./parallel-sdk-footprint').TaskRunResultParams;
export type Beta = import('./parallel-sdk-footprint').BetaResource;
}
/\*\*
\* API Client for interfacing with the Parallel API.
\*/
export declare class Parallel {
apiKey: string;
baseURL: string;
maxRetries: number;
timeout: number;
logger: Logger;
logLevel: LogLevel | undefined;
fetchOptions: RequestInit | undefined;
/\*\*
\* API Client for interfacing with the Parallel API.
\*
\* @param {string | undefined} [opts.apiKey=process.env['PARALLEL\_API\_KEY'] ?? undefined]
\* @param {string} [opts.baseURL=process.env['PARALLEL\_BASE\_URL'] ?? https://api.parallel.ai] - Override the default base URL for the API.
\* @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
\* @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
\* @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
\* @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
\* @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
\* @param {Record} opts.defaultQuery - Default query parameters to include with every request to the API.
\*/
constructor(opts?: ClientOptions);
/\*\*
\* Create a new client instance re-using the same options given to the current client with optional overriding.
\*/
withOptions(options: Partial): this;
get(path: string, opts?: Promise | any): APIPromise;
post(path: string, opts?: Promise | any): APIPromise;
patch(path: string, opts?: Promise | any): APIPromise;
put(path: string, opts?: Promise | any): APIPromise;
delete(path: string, opts?: Promise | any): APIPromise;
request(options: Promise | any, remainingRetries?: number | null): APIPromise;
static DEFAULT\_TIMEOUT: number;
static Parallel: typeof Parallel;
static ParallelError: typeof ParallelError;
static APIError: typeof APIError;
static APIConnectionError: typeof APIConnectionError;
static APIConnectionTimeoutError: typeof APIConnectionTimeoutError;
static APIUserAbortError: typeof APIUserAbortError;
static NotFoundError: typeof NotFoundError;
static ConflictError: typeof ConflictError;
static RateLimitError: typeof RateLimitError;
static BadRequestError: typeof BadRequestError;
static AuthenticationError: typeof AuthenticationError;
static InternalServerError: typeof InternalServerError;
static PermissionDeniedError: typeof PermissionDeniedError;
static UnprocessableEntityError: typeof UnprocessableEntityError;
static toFile: typeof toFile;
taskRun: TaskRunResource;
beta: BetaResource;
}
/\* Root default export (src/index.ts): `export { Parallel as default }` \*/
export default Parallel;
```
If you want, I can also generate a \*\*“LLM-friendly” companion summary\*\* (human-readable) that describes:
- top-level client construction + auth env vars,
- resource trees (`client.taskRun.\*`, `client.beta.\*`),
- streaming semantics (`Stream` and `.controller.abort()`),
- retry/timeouts and the error taxonomy.
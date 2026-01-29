> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI SDK Compatibility

> OpenAI SDK compatibility features and limitations

<Note>
  **Research Basis via OpenAI SDK**: When using task processors (`lite`, `base`, `core`) with the Chat API, the response includes a `basis` field with citations, reasoning, and confidence levels. Access it via `response.basis` in Python or `(response as any).basis` in TypeScript. See [Basis documentation](/task-api/guides/access-research-basis) for details.
</Note>

## Important OpenAI Compatibility Limitations

### API Behavior

Here are the most substantial differences from using OpenAI:

* Multimodal input (images/audio) is not supported and will be ignored.
* Prompt caching is not supported.
* Most unsupported fields are silently ignored rather than producing errors. These are all documented below.

## Detailed OpenAI Compatible API Support

### Request Fields

#### Simple Fields

| Field                   | Support Status                         |
| ----------------------- | -------------------------------------- |
| model                   | Use `speed`, `lite`, `base`, or `core` |
| response\_format        | Fully supported                        |
| stream                  | Fully supported                        |
| max\_tokens             | Ignored                                |
| max\_completion\_tokens | Ignored                                |
| stream\_options         | Ignored                                |
| top\_p                  | Ignored                                |
| parallel\_tool\_calls   | Ignored                                |
| stop                    | Ignored                                |
| temperature             | Ignored                                |
| n                       | Ignored                                |
| logprobs                | Ignored                                |
| metadata                | Ignored                                |
| prediction              | Ignored                                |
| presence\_penalty       | Ignored                                |
| frequency\_penalty      | Ignored                                |
| seed                    | Ignored                                |
| service\_tier           | Ignored                                |
| audio                   | Ignored                                |
| logit\_bias             | Ignored                                |
| store                   | Ignored                                |
| user                    | Ignored                                |
| modalities              | Ignored                                |
| top\_logprobs           | Ignored                                |
| reasoning\_effort       | Ignored                                |

#### Tools / Functions Fields

Tools are ignored.

#### Messages Array Fields

| Field                      | Support Status  |
| -------------------------- | --------------- |
| messages\[].role           | Fully supported |
| messages\[].content        | String only     |
| messages\[].name           | Fully supported |
| messages\[].tool\_calls    | Ignored         |
| messages\[].tool\_call\_id | Ignored         |
| messages\[].function\_call | Ignored         |
| messages\[].audio          | Ignored         |
| messages\[].modalities     | Ignored         |

<Note>
  The `content` field only supports string values. Structured content arrays (e.g., for multimodal inputs with text and image parts) are not supported.
</Note>

### Response Fields

| Field                             | Support Status                 |
| --------------------------------- | ------------------------------ |
| id                                | Always empty                   |
| choices\[]                        | Will always have a length of 1 |
| choices\[].finish\_reason         | Always empty                   |
| choices\[].index                  | Fully supported                |
| choices\[].message.role           | Fully supported                |
| choices\[].message.content        | Fully supported                |
| choices\[].message.tool\_calls    | Always empty                   |
| object                            | Always empty                   |
| created                           | Fully supported                |
| model                             | Always empty                   |
| finish\_reason                    | Always empty                   |
| content                           | Fully supported                |
| usage.completion\_tokens          | Always empty                   |
| usage.prompt\_tokens              | Always empty                   |
| usage.total\_tokens               | Always empty                   |
| usage.completion\_tokens\_details | Always empty                   |
| usage.prompt\_tokens\_details     | Always empty                   |
| choices\[].message.refusal        | Always empty                   |
| choices\[].message.audio          | Always empty                   |
| logprobs                          | Always empty                   |
| service\_tier                     | Always empty                   |
| system\_fingerprint               | Always empty                   |

#### Parallel-Specific Response Fields

The following fields are Parallel extensions not present in the OpenAI API:

| Field | Support Status                                          |
| ----- | ------------------------------------------------------- |
| basis | Supported with task processors (`lite`, `base`, `core`) |

### Error Message Compatibility

The compatibility layer maintains approximately the same error formats as the OpenAI API.

### Header Compatibility

While the OpenAI SDK automatically manages headers, here is the complete list of headers supported by Parallel's API for developers who need to work with them directly.

| Field                          | Support Status  |
| ------------------------------ | --------------- |
| authorization                  | Fully supported |
| x-ratelimit-limit-requests     | Ignored         |
| x-ratelimit-limit-tokens       | Ignored         |
| x-ratelimit-remaining-requests | Ignored         |
| x-ratelimit-remaining-tokens   | Ignored         |
| x-ratelimit-reset-requests     | Ignored         |
| x-ratelimit-reset-tokens       | Ignored         |
| retry-after                    | Ignored         |
| x-request-id                   | Ignored         |
| openai-version                 | Ignored         |
| openai-processing-ms           | Ignored         |

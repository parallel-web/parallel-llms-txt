# Warnings and Errors

> Breakdown of warnings and errors

The Task API may return various warnings and errors during operation. This page documents the possible error types you might encounter when using the API.

## Errors

Errors result in a failure to process your request and are returned with appropriate HTTP status codes (4xx or 5xx).

| Error                          | Description                                                                                 | Resolution                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Invalid JSON Schema**        | The JSON schema provided in the task spec for input or output is invalid.                   | Review your schema against JSON Schema specifications and ensure it follows the required format.      |
| **Task Spec + Input Too Long** | The combined task specification and input exceeds 15,000 characters.                        | Reduce the size of your task spec or input data. Consider splitting into multiple tasks if necessary. |
| **Too-Complex Output Schema**  | The output schema exceeds allowed complexity in terms of nesting depth or number of fields. | Simplify your output schema by reducing nested levels to 3 or less.                                   |

## Warnings

Warnings indicate potential issues that don't prevent the request from being processed but may affect results.

| Warning                               | Description                                                            | Resolution                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Input Fails Validation**            | The provided input does not conform to the input schema.               | Verify your input against the schema requirements and make necessary adjustments. |
| **Task Spec + Input Over Size Limit** | The combined task specification and input exceeds the character limit. | Consider optimizing your input or task spec for better performance.               |
| **Too Many Output Fields**            | The number of requested output fields exceeds the recommended limit.   | Consider reducing the number of output fields.                                    |

## Warning Handling

The Task API uses a warning system to provide guidance without blocking execution. Warnings are generated during validation and can be handled in two ways:

### Basis Properties Warning

The following properties are provided by default through the task's run basis and should not be defined in the output schema:

* `citations`
* `confidence`
* `evidence`
* `reasoning`
* `source`
* `sources`
* `source_urls`

Including these in your output schema will trigger a warning, as it's recommended to use FieldBasis in the run output instead.

## Error Reference

| Status Code | Meaning               | Retry? | Description                     | Resolution Approach                               |
| ----------- | --------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| **401**     | Unauthorized          | No     | Invalid or missing credentials  | Verify API key and authentication headers         |
| **402**     | Payment Required      | No     | Insufficient credit in account  | Add credits to account                            |
| **403**     | Forbidden             | No     | Invalid processor in request    | Check processor availability and permissions      |
| **404**     | Not Found             | No     | Run ID or resource not found    | Verify run ID and resource existence              |
| **408**     | Request Timeout       | Yes    | Synchronous request timed out   | Use asynchronous polling                          |
| **422**     | Unprocessable Content | No     | Request validation failed       | Review error details and validate schema          |
| **429**     | Too Many Requests     | Yes    | Rate limited or quota exceeded  | Implement exponential backoff                     |
| **500**     | Internal Server Error | Yes    | Server-side processing error    | Retry with backoff, contact support if persistent |
| **502**     | Bad Gateway           | Yes    | Upstream service error          | Retry, usually temporary                          |
| **503**     | Service Unavailable   | Yes    | Service temporarily unavailable | Retry with backoff                                |

## Error Response Format

All errors return a consistent JSON structure:

```json  theme={"system"}
{
  "error": {
    "message": "Human-readable error description",
    "detail": {
      // Additional error-specific information
    }
  }
}
```

For validation errors (422), the `detail` field contains specific information about which fields failed validation and why.

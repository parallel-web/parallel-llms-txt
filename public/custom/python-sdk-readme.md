
# Parallel Python API library
[![PyPI version](https://img.shields.io/pypi/v/parallel-web.svg?label=pypi%20(stable))](https://pypi.org/project/parallel-web/)
The Parallel Python library provides convenient access to the Parallel REST API from any Python 3.9+
application. The library includes type definitions for all request params and response fields,
and offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).
It is strongly encouraged to use the asynchronous client for best performance.
It is generated with [Stainless](https://www.stainless.com/).
## Documentation
The REST API documentation can be found in our [docs](https://docs.parallel.ai).
The full API of this Python library can be found in [api.md](api.md).
## Installation
```sh
# install from PyPI
pip install parallel-web
```
## Usage
The full API of this library can be found in [api.md](api.md).
```python
import os
from parallel import Parallel
client = Parallel(
api\_key=os.environ.get("PARALLEL\_API\_KEY"), # This is the default and can be omitted
)
task\_run = client.task\_run.create(
input="France (2023)",
processor="core",
)
task\_run\_result = client.task\_run.result(run\_id=task\_run.run\_id)
print(task\_run\_result.output)
```
While you can provide an `api\_key` keyword argument,
we recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)
to add `PARALLEL\_API\_KEY="My API Key"` to your `.env` file
so that your API Key is not stored in source control.
The API also supports typed inputs and outputs via Pydantic objects. See the relevant
section on [convenience methods]().
For information on what tasks are and how to specify them, see [our docs](https://docs.parallel.ai/task-api/core-concepts/specify-a-task).
## Async usage
Simply import `AsyncParallel` instead of `Parallel` and use `await` with each API call:
```python
import os
import asyncio
from parallel import AsyncParallel
client = AsyncParallel(
api\_key=os.environ.get("PARALLEL\_API\_KEY"), # This is the default and can be omitted
)
async def main() -> None:
task\_run = await client.task\_run.create(input="France (2023)", processor="core")
run\_result = await client.task\_run.result(run\_id=task\_run.run\_id)
print(run\_result.output.content)
if \_\_name\_\_ == "\_\_main\_\_":
asyncio.run(main())
```
To get the best performance out of Parallel's API, we recommend
using the asynchronous client, especially for executing multiple Task Runs concurrently.
Functionality between the synchronous and asynchronous clients is identical, including
the convenience methods.
## Frequently Asked Questions
\*\*Does the Task API accept prompts or objectives?\*\*
No, there are no `objective` or `prompt` parameters that can be specified for calls to
the Task API. Instead, provide any directives or instructions via the schemas. For
more information, check [our docs](https://docs.parallel.ai/task-api/core-concepts/specify-a-task).
\*\*Can I access beta parameters or endpoints via the SDK?\*\*
Yes, the SDK supports both beta endpoints and beta header parameters for the Task API.
All beta parameters are accessible via the `client.beta` namespace in the SDK.
\*\*Can I specify a timeout for API calls?\*\*
Yes, all methods support a timeout. For more information, see [Timeouts]().
\*\*Can I specify retries via the SDK?\*\*
Yes, errors can be retried via the SDK — the default retry count is 2. The maximum number
of retries can be configured at the client level. For information on which errors
are automatically retried and how to configure retry settings, see [Retries]().
## Low‑level API access
The library also provides low‑level access to the Parallel API.
```python
from parallel import Parallel
from parallel.types import TaskSpecParam
client = Parallel()
task\_run = client.task\_run.create(
input={"country": "France", "year": 2023},
processor="core",
task\_spec={
"output\_schema": {
"json\_schema": {
"additionalProperties": False,
"properties": {
"gdp": {
"description": "GDP in USD for the year",
"type": "string",
}
},
"required": ["gdp"],
"type": "object",
},
"type": "json",
},
"input\_schema": {
"json\_schema": {
"additionalProperties": False,
"properties": {
"country": {
"description": "Name of the country to research",
"type": "string",
},
"year": {
"description": "Year for which to retrieve information",
"type": "integer",
},
},
"required": ["country", "year"],
"type": "object",
},
"type": "json",
},
},
)
run\_result = client.task\_run.result(task\_run.run\_id)
print(run\_result.output.content)
```
For more information, please check out the relevant section in our docs:
- [Task Spec](https://docs.parallel.ai/task-api/core-concepts/specify-a-task)
- [Task Runs](https://docs.parallel.ai/task-api/core-concepts/execute-task-run)
## Handling errors
When the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `parallel.APIConnectionError` is raised.
When the API returns a non-success status code (that is, 4xx or 5xx
response), a subclass of `parallel.APIStatusError` is raised, containing `status\_code` and `response` properties.
All errors inherit from `parallel.APIError`.
```python
import parallel
from parallel import Parallel
client = Parallel()
try:
client.task\_run.create(input="France (2023)", processor="core")
except parallel.APIConnectionError as e:
print("The server could not be reached")
print(e.\_\_cause\_\_) # an underlying Exception, likely raised within httpx.
except parallel.RateLimitError as e:
print("A 429 status code was received; we should back off a bit.")
except parallel.APIStatusError as e:
print("Another non-200-range status code was received")
print(e.status\_code)
print(e.response)
```
Error codes are as follows:
| Status Code | Error Type |
| ----------- | -------------------------- |
| 400 | `BadRequestError` |
| 401 | `AuthenticationError` |
| 403 | `PermissionDeniedError` |
| 404 | `NotFoundError` |
| 422 | `UnprocessableEntityError` |
| 429 | `RateLimitError` |
| >=500 | `InternalServerError` |
| N/A | `APIConnectionError` |
### Retries
Certain errors are automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors are all retried by default.
You can use the `max\_retries` option to configure or disable retry settings:
```python
from parallel import Parallel
# Configure the default for all requests:
client = Parallel(
# default is 2
max\_retries=0,
)
# Or, configure per-request:
client.with\_options(max\_retries=5).task\_run.create(input="France (2023)", processor="core")
```
### Timeouts
By default requests time out after 1 minute. You can configure this with a `timeout` option,
which accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/) object:
```python
from parallel import Parallel
# Configure the default for all requests:
client = Parallel(
# 20 seconds (default is 1 minute)
timeout=20.0,
)
# More granular control:
client = Parallel(
timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),
)
# Override per-request:
client.with\_options(timeout=5.0).task\_run.create(input="France (2023)", processor="core")
```
On timeout, an `APITimeoutError` is thrown.
Note that requests that time out are [retried twice by default]().
## Advanced
### Logging
We use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.
You can enable logging by setting the environment variable `PARALLEL\_LOG` to `info`.
```shell
$ export PARALLEL\_LOG=info
```
Or to `debug` for more verbose logging.
### How to tell whether `None` means `null` or missing
In an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model\_fields\_set`:
```py
if response.my\_field is None:
if 'my\_field' not in response.model\_fields\_set:
print('Got json like {}, without a "my\_field" key present at all.')
else:
print('Got json like {"my\_field": null}.')
```
### Accessing raw response data (e.g. headers)
The "raw" Response object can be accessed by prefixing `.with\_raw\_response.` to any HTTP method call, e.g.,
```py
from parallel import Parallel
client = Parallel()
response = client.task\_run.with\_raw\_response.create(
input="France (2023)",
processor="core",
)
print(response.headers.get('X-My-Header'))
task\_run = response.parse()
print(task\_run.run\_id)
```
These methods return an [`APIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/\_response.py) object.
The async client returns an [`AsyncAPIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/\_response.py) with the same structure, the only difference being `await`able methods for reading the response content.
#### `.with\_streaming\_response`
The above interface eagerly reads the full response body when you make the request, which may not always be what you want.
To stream the response body, use `.with\_streaming\_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter\_bytes()`, `.iter\_text()`, `.iter\_lines()` or `.parse()`. In the async client, these are async methods.
```python
with client.task\_run.with\_streaming\_response.create(
input="France (2023)", processor="core"
) as response:
print(response.headers.get("X-My-Header"))
for line in response.iter\_lines():
print(line)
```
The context manager is required so that the response will reliably be closed.
### Making custom/undocumented requests
This library is typed for convenient access to the documented API.
If you need to access undocumented endpoints, params, or response properties, the library can still be used.
#### Undocumented endpoints
To make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other
http verbs. Options on the client will be respected (such as retries) when making this request.
```py
import httpx
response = client.post(
"/foo",
cast\_to=httpx.Response,
body={"my\_param": True},
)
print(response.headers.get("x-foo"))
```
#### Undocumented request params
If you want to explicitly send an extra param, you can do so with the `extra\_query`, `extra\_body`, and `extra\_headers` request
options.
#### Undocumented response properties
To access undocumented response properties, you can access the extra fields like `response.unknown\_prop`. You
can also get all the extra fields on the Pydantic model as a dict with
[`response.model\_extra`](https://docs.pydantic.dev/latest/api/base\_model/.BaseModel.model\_extra).
### Configuring the HTTP client
You can directly override the [httpx client](https://www.python-httpx.org/api/) to customize it for your use case, including:
- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)
- Custom [transports](https://www.python-httpx.org/advanced/transports/)
- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality
```python
import httpx
from parallel import Parallel, DefaultHttpxClient
client = Parallel(
# Or use the `PARALLEL\_BASE\_URL` env var
base\_url="http://my.test.server.example.com:8083",
http\_client=DefaultHttpxClient(
proxy="http://my.test.proxy.example.com",
transport=httpx.HTTPTransport(local\_address="0.0.0.0"),
),
)
```
You can also customize the client on a per-request basis by using `with\_options()`:
```python
client.with\_options(http\_client=DefaultHttpxClient(...))
```
### Managing HTTP resources
By default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html.\_\_del\_\_). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.
```py
from parallel import Parallel
with Parallel() as client:
# make requests here
...
# HTTP client is now closed
```
## Versioning
This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:
1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. \_(Please open a GitHub issue to let us know if you are relying on such internals.)\_
3. Changes that we do not expect to impact the vast majority of users in practice.
We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.
We are keen for your feedback; please open an [issue](https://www.github.com/parallel-web/parallel-sdk-python/issues) with questions, bugs, or suggestions.
### Determining the installed version
If you've upgraded to the latest version but aren't seeing any new features you were expecting then your python environment is likely still using an older version.
You can determine the version that is being used at runtime with:
```py
import parallel
print(parallel.\_\_version\_\_)
```
## Requirements
Python 3.9 or higher.
## Contributing
See [the contributing documentation](./CONTRIBUTING.md).
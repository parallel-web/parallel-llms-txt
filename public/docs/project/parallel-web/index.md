Skip to main content Switch to mobile version

Search PyPI Search

Search PyPI Search

# parallel-web 0.4.1

pip install parallel-web Copy PIP instructions

Latest version

Released: Jan 29, 2026

The official Python library for the Parallel API

### Verified details

_These details have been [verified by PyPI](https://docs.pypi.org/project_metadata/)_

###### Maintainers

parallel-developers

### Unverified details

_These details have **not** been verified by PyPI_

###### Project links

* [Homepage](https://github.com/parallel-web/parallel-sdk-python)
* [Repository](https://github.com/parallel-web/parallel-sdk-python)

###### Meta

* **License:** MIT License (MIT)
* **Author:** Parallel
* **Requires:** Python >=3.9
* **Provides-Extra:** `aiohttp`

[](https://server.ethicalads.io/proxy/click/10181/019ca810-5148-74f2-a6b3-ff06bd2af35f/)

Vercel is a Maintaining sponsor of the Python Software Foundation.

_[PSF Sponsor](https://www.python.org/psf/sponsorship/?ref=ethicalads-placement) · [Served ethically](https://www.ethicalads.io/sponsorship-platform/?ref=psf)_

[Report project as malware](https://pypi.org/project/parallel-web/submit-malware-report/)

* Project description
* Project details
* Release history
* Download files

## Project description

# Parallel Python API library

[](https://pypi.org/project/parallel-web/)

The Parallel Python library provides convenient access to the Parallel REST API from any Python 3.9+
application. The library includes type definitions for all request params and response fields,
and offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx) .
It is strongly encouraged to use the asynchronous client for best performance.

It is generated with [Stainless](https://www.stainless.com/) .

## Documentation

The REST API documentation can be found in our [docs](https://docs.parallel.ai) .
The full API of this Python library can be found in [api.md](https://github.com/parallel-web/parallel-sdk-python/tree/main/api.md) .

## Installation

```
# install from PyPI 
pipinstallparallel-web
```

## Usage

The full API of this library can be found in [api.md](https://github.com/parallel-web/parallel-sdk-python/tree/main/api.md) .

```
import os 
 from parallel import Parallel 

 client = Parallel ( 
    api_key = os . environ . get ( "PARALLEL_API_KEY" ),  # This is the default and can be omitted 
 ) 

 task_run = client . task_run . create ( 
    input = "France (2023)" , 
    processor = "core" , 
 ) 
 task_run_result = client . task_run . result ( run_id = task_run . run_id ) 
 print ( task_run_result . output )
```

While you can provide an `api_key` keyword argument,
we recommend using [python-dotenv](https://pypi.org/project/python-dotenv/) to add `PARALLEL_API_KEY="My API Key"` to your `.env` file
so that your API Key is not stored in source control.

The API also supports typed inputs and outputs via Pydantic objects. See the relevant
section on [convenience methods](https://github.com/parallel-web/parallel-sdk-python/tree/main/) .

For information on what tasks are and how to specify them, see [our docs](https://docs.parallel.ai/task-api/core-concepts/specify-a-task) .

## Async usage

Simply import `AsyncParallel` instead of `Parallel` and use `await` with each API call:

```
import os 
 import asyncio 
 from parallel import AsyncParallel 

 client = AsyncParallel ( 
    api_key = os . environ . get ( "PARALLEL_API_KEY" ),  # This is the default and can be omitted 
 ) 

 async def main () -> None : 
    task_run = await client . task_run . create ( input = "France (2023)" , processor = "core" ) 
    run_result = await client . task_run . result ( run_id = task_run . run_id ) 
    print ( run_result . output . content ) 

 if __name__ == "__main__" : 
    asyncio . run ( main ())
```

To get the best performance out of Parallel's API, we recommend
using the asynchronous client, especially for executing multiple Task Runs concurrently.
Functionality between the synchronous and asynchronous clients is identical, including
the convenience methods.

## Frequently Asked Questions

**Does the Task API accept prompts or objectives?**

No, there are no `objective` or `prompt` parameters that can be specified for calls to
the Task API. Instead, provide any directives or instructions via the schemas. For
more information, check [our docs](https://docs.parallel.ai/task-api/core-concepts/specify-a-task) .

**Can I access beta parameters or endpoints via the SDK?**

Yes, the SDK supports both beta endpoints and beta header parameters for the Task API.
All beta parameters are accessible via the `client.beta` namespace in the SDK.

**Can I specify a timeout for API calls?**

Yes, all methods support a timeout. For more information, see [Timeouts](https://github.com/parallel-web/parallel-sdk-python/tree/main/) .

**Can I specify retries via the SDK?**

Yes, errors can be retried via the SDK — the default retry count is 2. The maximum number
of retries can be configured at the client level. For information on which errors
are automatically retried and how to configure retry settings, see [Retries](https://github.com/parallel-web/parallel-sdk-python/tree/main/) .

## Low‑level API access

The library also provides low‑level access to the Parallel API.

```
from parallel import Parallel 
 from parallel.types import TaskSpecParam 

 client = Parallel () 

 task_run = client . task_run . create ( 
    input = { "country" : "France" , "year" : 2023 }, 
    processor = "core" , 
    task_spec = { 
        "output_schema" : { 
            "json_schema" : { 
                "additionalProperties" : False , 
                "properties" : { 
                    "gdp" : { 
                        "description" : "GDP in USD for the year" , 
                        "type" : "string" , 
                    } 
                }, 
                "required" : [ "gdp" ], 
                "type" : "object" , 
            }, 
            "type" : "json" , 
        }, 
        "input_schema" : { 
            "json_schema" : { 
                "additionalProperties" : False , 
                "properties" : { 
                    "country" : { 
                        "description" : "Name of the country to research" , 
                        "type" : "string" , 
                    }, 
                    "year" : { 
                        "description" : "Year for which to retrieve information" , 
                        "type" : "integer" , 
                    }, 
                }, 
                "required" : [ "country" , "year" ], 
                "type" : "object" , 
            }, 
            "type" : "json" , 
        }, 
    }, 
 ) 

 run_result = client . task_run . result ( task_run . run_id ) 
 print ( run_result . output . content )
```

For more information, please check out the relevant section in our docs:

* [Task Spec](https://docs.parallel.ai/task-api/core-concepts/specify-a-task)
* [Task Runs](https://docs.parallel.ai/task-api/core-concepts/execute-task-run)

## Handling errors

When the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `parallel.APIConnectionError` is raised.

When the API returns a non-success status code (that is, 4xx or 5xx
response), a subclass of `parallel.APIStatusError` is raised, containing `status_code` and `response` properties.

All errors inherit from `parallel.APIError` .

```
import parallel 
 from parallel import Parallel 

 client = Parallel () 

 try : 
    client . task_run . create ( input = "France (2023)" , processor = "core" ) 
 except parallel . APIConnectionError as e : 
    print ( "The server could not be reached" ) 
    print ( e . __cause__ )  # an underlying Exception, likely raised within httpx. 
 except parallel . RateLimitError as e : 
    print ( "A 429 status code was received; we should back off a bit." ) 
 except parallel . APIStatusError as e : 
    print ( "Another non-200-range status code was received" ) 
    print ( e . status_code ) 
    print ( e . response )
```

Error codes are as follows:

|Status Code |Error Type |
| --- | --- |
|400 |`BadRequestError` |
|401 |`AuthenticationError` |
|403 |`PermissionDeniedError` |
|404 |`NotFoundError` |
|422 |`UnprocessableEntityError` |
|429 |`RateLimitError` |
|>=500 |`InternalServerError` |
|N/A |`APIConnectionError` |

### Retries

Certain errors are automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors are all retried by default.

You can use the `max_retries` option to configure or disable retry settings:

```
from parallel import Parallel 

 # Configure the default for all requests: 
 client = Parallel ( 
    # default is 2 
    max_retries = 0 , 
 ) 

 # Or, configure per-request: 
 client . with_options ( max_retries = 5 ) . task_run . create ( input = "France (2023)" , processor = "core" )
```

### Timeouts

By default requests time out after 1 minute. You can configure this with a `timeout` option,
which accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/) object:

```
from parallel import Parallel 

 # Configure the default for all requests: 
 client = Parallel ( 
    # 20 seconds (default is 1 minute) 
    timeout = 20.0 , 
 ) 

 # More granular control: 
 client = Parallel ( 
    timeout = httpx . Timeout ( 60.0 , read = 5.0 , write = 10.0 , connect = 2.0 ), 
 ) 

 # Override per-request: 
 client . with_options ( timeout = 5.0 ) . task_run . create ( input = "France (2023)" , processor = "core" )
```

On timeout, an `APITimeoutError` is thrown.

Note that requests that time out are [retried twice by default](https://github.com/parallel-web/parallel-sdk-python/tree/main/) .

## Advanced

### Logging

We use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.

You can enable logging by setting the environment variable `PARALLEL_LOG` to `info` .

```
$ export PARALLEL_LOG = info
```

Or to `debug` for more verbose logging.

### How to tell whether `None` means `null` or missing

In an API response, a field may be explicitly `null` , or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set` :

```
if response . my_field is None : 
  if 'my_field' not in response . model_fields_set : 
    print ( 'Got json like {} , without a "my_field" key present at all.' ) 
  else : 
    print ( 'Got json like {"my_field": null}.' )
```

### Accessing raw response data (e.g. headers)

The "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,

```
from parallel import Parallel 

 client = Parallel () 
 response = client . task_run . with_raw_response . create ( 
    input = "France (2023)" , 
    processor = "core" , 
 ) 
 print ( response . headers . get ( 'X-My-Header' )) 

 task_run = response . parse () 
 print ( task_run . run_id )
```

These methods return an [`APIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/_response.py) object.

The async client returns an [`AsyncAPIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/_response.py) with the same structure, the only difference being `await` able methods for reading the response content.

#### `.with_streaming_response`

The above interface eagerly reads the full response body when you make the request, which may not always be what you want.

To stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()` , `.text()` , `.json()` , `.iter_bytes()` , `.iter_text()` , `.iter_lines()` or `.parse()` . In the async client, these are async methods.

```
with client . task_run . with_streaming_response . create ( 
    input = "France (2023)" , processor = "core" 
 ) as response : 
    print ( response . headers . get ( "X-My-Header" )) 

    for line in response . iter_lines (): 
        print ( line )
```

The context manager is required so that the response will reliably be closed.

### Making custom/undocumented requests

This library is typed for convenient access to the documented API.

If you need to access undocumented endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can make requests using `client.get` , `client.post` , and other
http verbs. Options on the client will be respected (such as retries) when making this request.

```
import httpx 

 response = client . post ( 
    "/foo" , 
    cast_to = httpx . Response , 
    body = { "my_param" : True }, 
 ) 

 print ( response . headers . get ( "x-foo" ))
```

#### Undocumented request params

If you want to explicitly send an extra param, you can do so with the `extra_query` , `extra_body` , and `extra_headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you can access the extra fields like `response.unknown_prop` . You
can also get all the extra fields on the Pydantic model as a dict with [`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/.BaseModel.model_extra) .

### Configuring the HTTP client

You can directly override the [httpx client](https://www.python-httpx.org/api/) to customize it for your use case, including:

* Support for [proxies](https://www.python-httpx.org/advanced/proxies/)
* Custom [transports](https://www.python-httpx.org/advanced/transports/)
* Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality

```
import httpx 
 from parallel import Parallel , DefaultHttpxClient 

 client = Parallel ( 
    # Or use the `PARALLEL_BASE_URL` env var 
    base_url = "http://my.test.server.example.com:8083" , 
    http_client = DefaultHttpxClient ( 
        proxy = "http://my.test.proxy.example.com" , 
        transport = httpx . HTTPTransport ( local_address = "0.0.0.0" ), 
    ), 
 )
```

You can also customize the client on a per-request basis by using `with_options()` :

```
client . with_options ( http_client = DefaultHttpxClient ( ... ))
```

### Managing HTTP resources

By default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html.__del__) . You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.

```
from parallel import Parallel 

 with Parallel () as client : 
  # make requests here 
  ... 

 # HTTP client is now closed
```

## Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/parallel-web/parallel-sdk-python/issues) with questions, bugs, or suggestions.

### Determining the installed version

If you've upgraded to the latest version but aren't seeing any new features you were expecting then your python environment is likely still using an older version.

You can determine the version that is being used at runtime with:

```
import parallel 
 print ( parallel . __version__ )
```

## Requirements

Python 3.9 or higher.

## Contributing

See [the contributing documentation](https://github.com/parallel-web/parallel-sdk-python/tree/main/./CONTRIBUTING.md) .

## Project details

### Verified details

_These details have been [verified by PyPI](https://docs.pypi.org/project_metadata/)_

###### Maintainers

parallel-developers

### Unverified details

_These details have **not** been verified by PyPI_

###### Project links

* [Homepage](https://github.com/parallel-web/parallel-sdk-python)
* [Repository](https://github.com/parallel-web/parallel-sdk-python)

###### Meta

* **License:** MIT License (MIT)
* **Author:** Parallel
* **Requires:** Python >=3.9
* **Provides-Extra:** `aiohttp`

## Download files

Download the file for your platform. If you're not sure which to choose, learn more about [installing packages](https://packaging.python.org/tutorials/installing-packages/ "External link") .

### Source Distribution

[parallel\_web-0.4.1.tar.gz](https://files.pythonhosted.org/packages/26/80/7115d10c0d07235fc155e8c0d06908cc8a9b52d3ff3e45f59bac9546e49f/parallel_web-0.4.1.tar.gz) (135.3 kB view details )

Uploaded Jan 29, 2026 `Source`

### Built Distribution

Filter files by name, interpreter, ABI, and platform.

If you're not sure about the file name format, learn more about [wheel file names](https://packaging.python.org/en/latest/specifications/binary-distribution-format/ "External link") .

Copy a direct link to the current filters <https://pypi.org/project/parallel-web/> Copy

Showing 1 of 1 file.

File name

Interpreter Interpreter py3

ABI ABI none

Platform Platform any

[parallel\_web-0.4.1-py3-none-any.whl](https://files.pythonhosted.org/packages/14/c8/a423bfcfb8215bb495385020e025791ef45cc55d35cac36c4caed7627980/parallel_web-0.4.1-py3-none-any.whl) (139.5 kB view details )

Uploaded Jan 29, 2026 `Python 3`

## File details

Details for the file `parallel_web-0.4.1.tar.gz` .

### File metadata

* Download URL: [parallel\_web-0.4.1.tar.gz](https://files.pythonhosted.org/packages/26/80/7115d10c0d07235fc155e8c0d06908cc8a9b52d3ff3e45f59bac9546e49f/parallel_web-0.4.1.tar.gz)
* Upload date: Jan 29, 2026
* Size: 135.3 kB
* Tags: Source
* Uploaded using Trusted Publishing? No
* Uploaded via: twine/5.1.1 CPython/3.12.9

### File hashes

|Algorithm |Hash digest | |
| --- | --- | --- |
|SHA256 |`47519dc475fbf8156b3fb117ae018bca50a52c95a712c97999d79491083fc1c3` |Copy |
|MD5 |`80c56dc341fffe28317ecfce27d1e398` |Copy |
|BLAKE2b-256 |`26807115d10c0d07235fc155e8c0d06908cc8a9b52d3ff3e45f59bac9546e49f` |Copy |

[See more details on using hashes here.](https://pip.pypa.io/en/stable/topics/secure-installs/ "External link")

## File details

Details for the file `parallel_web-0.4.1-py3-none-any.whl` .

### File metadata

* Download URL: [parallel\_web-0.4.1-py3-none-any.whl](https://files.pythonhosted.org/packages/14/c8/a423bfcfb8215bb495385020e025791ef45cc55d35cac36c4caed7627980/parallel_web-0.4.1-py3-none-any.whl)
* Upload date: Jan 29, 2026
* Size: 139.5 kB
* Tags: Python 3
* Uploaded using Trusted Publishing? No
* Uploaded via: twine/5.1.1 CPython/3.12.9

### File hashes

|Algorithm |Hash digest | |
| --- | --- | --- |
|SHA256 |`f581c373382443720209f201d628a00b845bc4061aeef4774ae2ee8a7f9afd2d` |Copy |
|MD5 |`7380945c16e3a5fbd000f35ccf997960` |Copy |
|BLAKE2b-256 |`14c8a423bfcfb8215bb495385020e025791ef45cc55d35cac36c4caed7627980` |Copy |

[See more details on using hashes here.](https://pip.pypa.io/en/stable/topics/secure-installs/ "External link")

* * *

Status: [All Systems Operational](https://status.python.org/ "External link")

Developed and maintained by the Python community, for the Python community.  
[Donate today!](https://donate.pypi.org)

"PyPI", "Python Package Index", and the blocks logos are registered trademarks of the [Python Software Foundation](https://www.python.org/psf-landing) .

Site map

Switch to desktop version

* English
* español
* français
* 日本語
* português (Brasil)
* українська
* Ελληνικά
* Deutsch
* 中文 (简体)
* 中文 (繁體)
* русский
* עברית
* Esperanto
* 한국어

Supported by

[AWS Cloud computing and Security Sponsor](https://aws.amazon.com/) [Datadog Monitoring](https://www.datadoghq.com/) [Depot Continuous Integration](https://depot.dev) [Fastly CDN](https://www.fastly.com/) [Google Download Analytics](https://careers.google.com/) [Pingdom Monitoring](https://www.pingdom.com/) [Sentry Error logging](https://sentry.io/for/python/?utm_source=pypi&utm_medium=paid-community&utm_campaign=python-na-evergreen&utm_content=static-ad-pypi-sponsor-learnmore) [StatusPage Status page](https://statuspage.io)
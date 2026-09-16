Skip to main content Switch to mobile version

PyPI

Search PyPI Search

* Help
* [Docs](https://docs.pypi.org/)
* 
* 

* Help
* [Docs](https://docs.pypi.org/)
* 
* 

* Deutsch
* English
* español
* Esperanto
* français
* português (Brasil)
* Ελληνικά
* русский
* українська
* עברית
* 中文 (简体)
* 中文 (繁體)
* 日本語
* 한국어

Search PyPI Search

# parallel-web 1.3.3

The official Python library for the Parallel API

pip install parallel-web Copy PIP instructions

* Description
* Download files
* Release history

#  Parallel Python API library

[PyPI version](https://pypi.org/project/parallel-web/)

The Parallel Python library provides convenient access to the Parallel REST API from any Python 3.9+
application. The library includes type definitions for all request params and response fields,
and offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx) .

It is generated with [Stainless](https://www.stainless.com/) .

##  Documentation

The REST API documentation can be found on [docs.parallel.ai](https://docs.parallel.ai) . The full API of this library can be found in [api.md](https://github.com/parallel-web/parallel-sdk-python/tree/main/api.md) .

##  Installation

```
# install from PyPI 
pip install parallel-web
```

##  Usage

The full API of this library can be found in [api.md](https://github.com/parallel-web/parallel-sdk-python/tree/main/api.md) .

```
import os 
 from parallel import Parallel 

 client = Parallel ( 
    api_key = os . environ . get ( "PARALLEL_API_KEY" ),  # This is the default and can be omitted 
 ) 

 task_run = client . task_run . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
 ) 
 print ( task_run . interaction_id )
```

While you can provide an `api_key` keyword argument,
we recommend using [python-dotenv](https://pypi.org/project/python-dotenv/) to add `PARALLEL_API_KEY="My API Key"` to your `.env` file
so that your API Key is not stored in source control.

##  Async usage

Simply import `AsyncParallel` instead of `Parallel` and use `await` with each API call:

```
import os 
 import asyncio 
 from parallel import AsyncParallel 

 client = AsyncParallel ( 
    api_key = os . environ . get ( "PARALLEL_API_KEY" ),  # This is the default and can be omitted 
 ) 

 async def main () -> None : 
    task_run = await client . task_run . create ( 
        input = "What was the GDP of France in 2023?" , 
        processor = "base" , 
    ) 
    print ( task_run . interaction_id ) 

 asyncio . run ( main ())
```

Functionality between the synchronous and asynchronous clients is otherwise identical.

###  With aiohttp

By default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.

You can enable this by installing `aiohttp` :

```
# install from PyPI 
pip install parallel-web [ aiohttp ]
```

Then you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()` :

```
import os 
 import asyncio 
 from parallel import DefaultAioHttpClient 
 from parallel import AsyncParallel 

 async def main () -> None : 
    async with AsyncParallel ( 
        api_key = os . environ . get ( "PARALLEL_API_KEY" ),  # This is the default and can be omitted 
        http_client = DefaultAioHttpClient (), 
    ) as client : 
        task_run = await client . task_run . create ( 
            input = "What was the GDP of France in 2023?" , 
            processor = "base" , 
        ) 
        print ( task_run . interaction_id ) 

 asyncio . run ( main ())
```

##  Using types

Nested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html.TypedDict) . Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:

* Serializing back into JSON, `model.to_json()`
* Converting to a dictionary, `model.to_dict()`

Typed requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic` .

##  Nested params

Nested parameters are dictionaries, typed using `TypedDict` , for example:

```
from parallel import Parallel 

 client = Parallel () 

 task_run = client . task_run . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
    advanced_settings = {}, 
 ) 
 print ( task_run . advanced_settings )
```

##  Handling errors

When the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `parallel.APIConnectionError` is raised.

When the API returns a non-success status code (that is, 4xx or 5xx
response), a subclass of `parallel.APIStatusError` is raised, containing `status_code` and `response` properties.

All errors inherit from `parallel.APIError` .

```
import parallel 
 from parallel import Parallel 

 client = Parallel () 

 try : 
    client . task_run . create ( 
        input = "What was the GDP of France in 2023?" , 
        processor = "base" , 
    ) 
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

###  Retries

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
 client . with_options ( max_retries = 5 ) . task_run . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
 )
```

###  Timeouts

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
 client . with_options ( timeout = 5.0 ) . task_run . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
 )
```

On timeout, an `APITimeoutError` is thrown.

Note that requests that time out are [retried twice by default](https://github.com/parallel-web/parallel-sdk-python/tree/main/) .

##  Advanced

###  Logging

We use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.

You can enable logging by setting the environment variable `PARALLEL_LOG` to `info` .

```
$ export PARALLEL_LOG = info
```

Or to `debug` for more verbose logging.

###  How to tell whether `None` means `null` or missing

In an API response, a field may be explicitly `null` , or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set` :

```
if response . my_field is None : 
  if 'my_field' not in response . model_fields_set : 
    print ( 'Got json like {} , without a "my_field" key present at all.' ) 
  else : 
    print ( 'Got json like {"my_field": null}.' )
```

###  Accessing raw response data (e.g. headers)

The "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,

```
from parallel import Parallel 

 client = Parallel () 
 response = client . task_run . with_raw_response . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
 ) 
 print ( response . headers . get ( 'X-My-Header' )) 

 task_run = response . parse ()  # get the object that `task_run.create()` would have returned 
 print ( task_run . interaction_id )
```

These methods return an [`APIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/_response.py) object.

The async client returns an [`AsyncAPIResponse`](https://github.com/parallel-web/parallel-sdk-python/tree/main/src/parallel/_response.py) with the same structure, the only difference being `await` able methods for reading the response content.

####  `.with_streaming_response`

The above interface eagerly reads the full response body when you make the request, which may not always be what you want.

To stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()` , `.text()` , `.json()` , `.iter_bytes()` , `.iter_text()` , `.iter_lines()` or `.parse()` . In the async client, these are async methods.

```
with client . task_run . with_streaming_response . create ( 
    input = "What was the GDP of France in 2023?" , 
    processor = "base" , 
 ) as response : 
    print ( response . headers . get ( "X-My-Header" )) 

    for line in response . iter_lines (): 
        print ( line )
```

The context manager is required so that the response will reliably be closed.

###  Making custom/undocumented requests

This library is typed for convenient access to the documented API.

If you need to access undocumented endpoints, params, or response properties, the library can still be used.

####  Undocumented endpoints

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

####  Undocumented request params

If you want to explicitly send an extra param, you can do so with the `extra_query` , `extra_body` , and `extra_headers` request
options.

####  Undocumented response properties

To access undocumented response properties, you can access the extra fields like `response.unknown_prop` . You
can also get all the extra fields on the Pydantic model as a dict with [`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/.BaseModel.model_extra) .

###  Configuring the HTTP client

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

###  Managing HTTP resources

By default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html.__del__) . You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.

```
from parallel import Parallel 

 with Parallel () as client : 
  # make requests here 
  ... 

 # HTTP client is now closed
```

##  Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/parallel-web/parallel-sdk-python/issues) with questions, bugs, or suggestions.

###  Determining the installed version

If you've upgraded to the latest version but aren't seeing any new features you were expecting then your python environment is likely still using an older version.

You can determine the version that is being used at runtime with:

```
import parallel 
 print ( parallel . __version__ )
```

##  Requirements

Python 3.9 or higher.

##  Contributing

See [the contributing documentation](https://github.com/parallel-web/parallel-sdk-python/tree/main/./CONTRIBUTING.md) .

## Project links

* [Homepage](https://github.com/parallel-web/parallel-sdk-python)
* [Repository](https://github.com/parallel-web/parallel-sdk-python)

## Key dates

PyPI data

Data sourced directly from PyPI's database.

* **Released:** Sep 1, 2026

Latest release

## 1 maintainer

PyPI data

Data sourced directly from PyPI's database.

Avatar for parallel-developers from gravatar.com parallel-developers

## Credits

**Author:** [Parallel](mailto:support@parallel.ai)

## License

MIT License (MIT)

## Requires

**Python** >=3.9

## Provides Extra

`aiohttp`

## Classifiers

* Intended Audience
  
    + [Developers](https://pypi.org/search/?c=Intended+Audience+%3A%3A+Developers)
* License
  
    + [OSI Approved :: MIT License](https://pypi.org/search/?c=License+%3A%3A+OSI+Approved+%3A%3A+MIT+License)
* Operating System
  
    + [MacOS](https://pypi.org/search/?c=Operating+System+%3A%3A+MacOS)
    + [Microsoft :: Windows](https://pypi.org/search/?c=Operating+System+%3A%3A+Microsoft+%3A%3A+Windows)
    + [OS Independent](https://pypi.org/search/?c=Operating+System+%3A%3A+OS+Independent)
    + [POSIX](https://pypi.org/search/?c=Operating+System+%3A%3A+POSIX)
    + [POSIX :: Linux](https://pypi.org/search/?c=Operating+System+%3A%3A+POSIX+%3A%3A+Linux)
* Programming Language
  
    + [Python :: 3.9](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.9)
    + [Python :: 3.10](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.10)
    + [Python :: 3.11](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.11)
    + [Python :: 3.12](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.12)
    + [Python :: 3.13](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.13)
    + [Python :: 3.14](https://pypi.org/search/?c=Programming+Language+%3A%3A+Python+%3A%3A+3.14)
* Topic
  
    + [Software Development :: Libraries :: Python Modules](https://pypi.org/search/?c=Topic+%3A%3A+Software+Development+%3A%3A+Libraries+%3A%3A+Python+Modules)
* Typing
  
    + [Typed](https://pypi.org/search/?c=Typing+%3A%3A+Typed)

[Report project as malware](https://pypi.org/project/parallel-web/submit-malware-report/)

## Download files

Download the file for your platform. If you're not sure which to choose, learn more about [installing packages](https://packaging.python.org/tutorials/installing-packages/ "External link") .

### Source Distribution

[parallel\_web-1.3.3.tar.gz](https://files.pythonhosted.org/packages/7a/ab/5d55a9b0f41176129c2870bfe969a89d34449fc87f9cffab8cdf5011d5d1/parallel_web-1.3.3.tar.gz) (162.4 kB view details )

Uploaded Sep 1, 2026 `Source`

### Built Distribution

Filter files by name, interpreter, ABI, and platform.

If you're not sure about the file name format, learn more about [wheel file names](https://packaging.python.org/en/latest/specifications/binary-distribution-format/ "External link") .

Copy a direct link to the current filters [](https://pypi.org/project/parallel-web/) Copy

File name

Interpreter Interpreter py3

ABI ABI none

Platform Platform any

[parallel\_web-1.3.3-py3-none-any.whl](https://files.pythonhosted.org/packages/7c/2f/07dcdc7964fc9baf2b93cbc67aaf3530688bb11283148c9acf7246c51a9e/parallel_web-1.3.3-py3-none-any.whl) (176.2 kB view details )

Uploaded Sep 1, 2026 `Python 3`

## File details

Details for the file `parallel_web-1.3.3.tar.gz` .

### File metadata

* Download URL: [parallel\_web-1.3.3.tar.gz](https://files.pythonhosted.org/packages/7a/ab/5d55a9b0f41176129c2870bfe969a89d34449fc87f9cffab8cdf5011d5d1/parallel_web-1.3.3.tar.gz)
* Upload date: Sep 1, 2026
* Size: 162.4 kB
* Tags: Source
* Uploaded using Trusted Publishing? No
* Uploaded via: `twine/5.1.1 CPython/3.12.9`

### File hashes

|Algorithm |Hash digest | |
| --- | --- | --- |
|SHA256 |`ad2a699bf5463e1d269e79b70ffe32911a2917320e8f5b3cbd5a0cecd83a86a3` |Copy |
|MD5 |`60fc276f4f4b51389a72c22ee0955295` |Copy |
|BLAKE2b-256 |`7aab5d55a9b0f41176129c2870bfe969a89d34449fc87f9cffab8cdf5011d5d1` |Copy |

[See more details on using hashes here.](https://pip.pypa.io/en/stable/topics/secure-installs/ "External link")

## File details

Details for the file `parallel_web-1.3.3-py3-none-any.whl` .

### File metadata

* Download URL: [parallel\_web-1.3.3-py3-none-any.whl](https://files.pythonhosted.org/packages/7c/2f/07dcdc7964fc9baf2b93cbc67aaf3530688bb11283148c9acf7246c51a9e/parallel_web-1.3.3-py3-none-any.whl)
* Upload date: Sep 1, 2026
* Size: 176.2 kB
* Tags: Python 3
* Uploaded using Trusted Publishing? No
* Uploaded via: `twine/5.1.1 CPython/3.12.9`

### File hashes

|Algorithm |Hash digest | |
| --- | --- | --- |
|SHA256 |`5400231d091139259d09fd26cc379e5968340446eec389d0c8c5e347fa159b7d` |Copy |
|MD5 |`32a72181f4571b81cf91352d22dc2621` |Copy |
|BLAKE2b-256 |`7c2f07dcdc7964fc9baf2b93cbc67aaf3530688bb11283148c9acf7246c51a9e` |Copy |

[See more details on using hashes here.](https://pip.pypa.io/en/stable/topics/secure-installs/ "External link")

## Release history Release notifications | RSS feed

This release

1\.3.3 This release

Sep 1, 2026 2 files

1\.3.2

Aug 27, 2026 2 files

1\.3.1

Aug 27, 2026 2 files

1\.3.0

Aug 12, 2026 2 files

1\.2.0

Aug 10, 2026 2 files

1\.1.0

Jun 8, 2026 2 files

1\.0.1

Jun 3, 2026 2 files

1\.0.0

Jun 2, 2026 2 files

0\.6.0

May 6, 2026 2 files

0\.5.1

Apr 22, 2026 2 files

0\.5.0

Apr 21, 2026 2 files

0\.4.2

Mar 9, 2026 2 files

0\.4.1

Jan 29, 2026 2 files

0\.4.0

Jan 13, 2026 2 files

0\.3.4

Nov 13, 2025 2 files

0\.3.3

Nov 6, 2025 2 files

0\.3.2

Oct 22, 2025 2 files

0\.3.1

Oct 21, 2025 2 files

0\.3.0

Oct 21, 2025 2 files

0\.2.2

Oct 16, 2025 2 files

0\.2.1

Sep 15, 2025 2 files

0\.2.0

Sep 1, 2025 2 files

0\.1.3

Aug 9, 2025 2 files

0\.1.2

Jun 26, 2025 2 files

0\.1.1

Apr 25, 2025 2 files

0\.1.0

Apr 24, 2025 2 files

PyPI

Developed and maintained by the [Python Software Foundation](https://www.python.org/psf/ "External link") and Python community, for the Python community.

[Status: all systems operational](https://status.python.org/ "External link")

[Donate today!](https://donate.pypi.org)

Switch to desktop version

* "PyPI", "Python Package Index", and the blocks logos are registered trademarks of the [Python Software Foundation](https://www.python.org/psf-landing) .

* Site map
* Deployed from [`72bf763`](https://github.com/pypi/warehouse/commit/72bf763b1ae0a654a5c6930d5991e35bdd3469ac "External link")
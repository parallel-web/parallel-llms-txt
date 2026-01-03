
"""
Parallel SDK - Complete Usage Stub File
This file demonstrates the complete API surface and usage patterns for the Parallel SDK.
"""
from \_\_future\_\_ import annotations
import httpx
from datetime import datetime
from typing import Any, Dict, List, Optional, Union, Type, TypeVar, Generic, Literal, overload
from typing\_extensions import TypedDict, Annotated
# Core client imports
from parallel import (
Parallel,
AsyncParallel,
Client,
AsyncClient,
BaseModel,
NOT\_GIVEN,
NotGiven,
Timeout,
RequestOptions,
APIResponse,
AsyncAPIResponse,
ParallelError,
APIStatusError,
)
# Type definitions for better understanding
T = TypeVar('T', bound=BaseModel)
OutputT = TypeVar('OutputT')
# Schema definitions for task specifications
class JsonSchemaParam(TypedDict, total=False):
type: Literal["json"]
json\_schema: Dict[str, Any]
class TextSchemaParam(TypedDict, total=False):
type: Literal["text"]
description: str
class AutoSchemaParam(TypedDict, total=False):
type: Literal["auto"]
# Union types for schema parameters
InputSchema = Union[str, JsonSchemaParam, TextSchemaParam, AutoSchemaParam]
OutputSchema = Union[str, JsonSchemaParam, TextSchemaParam, AutoSchemaParam]
# Task specification parameter
class TaskSpecParam(TypedDict, total=False):
input\_schema: InputSchema
output\_schema: OutputSchema
# Core response models
class TaskRunJsonOutput(BaseModel):
content: str
type: Literal["json"]
class TaskRunTextOutput(BaseModel):
content: str
type: Literal["text"]
TaskRunOutput = Union[TaskRunJsonOutput, TaskRunTextOutput]
class TaskRunResult(BaseModel):
id: str
status: Literal["completed", "failed", "running", "pending"]
output: TaskRunOutput
created\_at: datetime
completed\_at: Optional[datetime]
error: Optional[str]
class ParsedTaskRunResult(BaseModel, Generic[OutputT]):
"""Parsed task run result with strongly typed output"""
id: str
status: Literal["completed", "failed", "running", "pending"]
output: ParsedOutput[OutputT]
created\_at: datetime
completed\_at: Optional[datetime]
error: Optional[str]
class ParsedOutput(BaseModel, Generic[OutputT]):
content: str
type: str
parsed: OutputT
# Request parameter types
class TaskRunCreateParams(TypedDict, total=False):
input: Union[str, Dict[str, Any]]
task\_spec: TaskSpecParam
timeout: Union[float, Timeout, None, NotGiven]
# Beta types for advanced features
class BetaRunInput(BaseModel):
input: Union[str, Dict[str, Any]]
task\_spec: Optional[TaskSpecParam]
class TaskGroup(BaseModel):
id: str
name: Optional[str]
status: str
created\_at: datetime
class TaskGroupCreateParams(TypedDict, total=False):
name: str
runs: List[BetaRunInput]
class TaskRunEvent(BaseModel):
type: str
data: Dict[str, Any]
timestamp: datetime
class TaskRunEventsResponse(BaseModel):
events: List[TaskRunEvent]
has\_more: bool
# Main client class definitions
class Parallel:
"""
Synchronous Parallel client for AI task execution.
Example usage:
```python
import parallel
client = parallel.Parallel(api\_key="your-api-key")
# Simple text completion
result = client.task\_run.create(
input="Write a haiku about coding",
timeout=30.0
)
# With structured output
class CodeReview(parallel.BaseModel):
rating: int
comments: List[str]
result = client.task\_run.create(
input="Review this Python code: def hello(): print('hi')",
output\_format=CodeReview,
timeout=60.0
)
```
"""
api\_key: str
task\_run: TaskRunResource
beta: BetaResource
def \_\_init\_\_(
self,
\*,
api\_key: Optional[str] = None,
base\_url: Optional[Union[str, httpx.URL]] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
max\_retries: int = 2,
default\_headers: Optional[Dict[str, str]] = None,
default\_query: Optional[Dict[str, Any]] = None,
http\_client: Optional[httpx.Client] = None,
\_strict\_response\_validation: bool = False,
) -> None: ...
def copy(self, \*\*kwargs: Any) -> Parallel: ...
def close(self) -> None: ...
def \_\_enter\_\_(self) -> Parallel: ...
def \_\_exit\_\_(self, \*args: Any) -> None: ...
class AsyncParallel:
"""
Asynchronous Parallel client for AI task execution.
Example usage:
```python
import parallel
import asyncio
async def main():
client = parallel.AsyncParallel(api\_key="your-api-key")
# Simple async task
result = await client.task\_run.create(
input="Generate a creative story",
timeout=45.0
)
# Batch processing with task groups
runs = [
{"input": f"Analyze sentiment: {text}"}
for text in ["Great product!", "Terrible service", "Okay experience"]
]
group = await client.beta.task\_group.create(
name="sentiment-analysis-batch",
runs=runs
)
await client.close()
asyncio.run(main())
```
"""
api\_key: str
task\_run: AsyncTaskRunResource
beta: AsyncBetaResource
def \_\_init\_\_(
self,
\*,
api\_key: Optional[str] = None,
base\_url: Optional[Union[str, httpx.URL]] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
max\_retries: int = 2,
default\_headers: Optional[Dict[str, str]] = None,
default\_query: Optional[Dict[str, Any]] = None,
http\_client: Optional[httpx.AsyncClient] = None,
\_strict\_response\_validation: bool = False,
) -> None: ...
def copy(self, \*\*kwargs: Any) -> AsyncParallel: ...
async def close(self) -> None: ...
async def \_\_aenter\_\_(self) -> AsyncParallel: ...
async def \_\_aexit\_\_(self, \*args: Any) -> None: ...
# Resource classes
class TaskRunResource:
"""
Synchronous task run operations.
Provides methods for creating, retrieving, and managing AI task executions.
"""
def create(
self,
\*,
input: Union[str, Dict[str, Any]],
output\_format: Optional[Union[OutputSchema, Type[OutputT]]] = None,
task\_spec: Optional[TaskSpecParam] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
extra\_headers: Optional[Dict[str, str]] = None,
extra\_query: Optional[Dict[str, Any]] = None,
) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]: ...
@overload
def create(
self,
\*,
input: Union[str, Dict[str, Any]],
output\_format: Type[OutputT],
\*\*kwargs: Any,
) -> ParsedTaskRunResult[OutputT]: ...
@overload
def create(
self,
\*,
input: Union[str, Dict[str, Any]],
output\_format: None = None,
\*\*kwargs: Any,
) -> TaskRunResult: ...
def retrieve(
self,
run\_id: str,
\*,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
) -> TaskRunResult: ...
def result(
self,
run\_id: str,
\*,
output\_format: Optional[Union[OutputSchema, Type[OutputT]]] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]: ...
class AsyncTaskRunResource:
"""
Asynchronous task run operations.
All methods are async versions of TaskRunResource.
"""
async def create(
self,
\*,
input: Union[str, Dict[str, Any]],
output\_format: Optional[Union[OutputSchema, Type[OutputT]]] = None,
task\_spec: Optional[TaskSpecParam] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
extra\_headers: Optional[Dict[str, str]] = None,
extra\_query: Optional[Dict[str, Any]] = None,
) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]: ...
async def retrieve(
self,
run\_id: str,
\*,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
) -> TaskRunResult: ...
async def result(
self,
run\_id: str,
\*,
output\_format: Optional[Union[OutputSchema, Type[OutputT]]] = None,
timeout: Union[float, Timeout, None, NotGiven] = NOT\_GIVEN,
) -> Union[TaskRunResult, ParsedTaskRunResult[OutputT]]: ...
# Beta resources for advanced features
class BetaResource:
"""Beta features and experimental functionality."""
task\_run: BetaTaskRunResource
task\_group: TaskGroupResource
class AsyncBetaResource:
"""Async beta features and experimental functionality."""
task\_run: AsyncBetaTaskRunResource
task\_group: AsyncTaskGroupResource
class TaskGroupResource:
"""
Task group operations for batch processing.
Example usage:
```python
# Create a group of related tasks
group = client.beta.task\_group.create(
name="data-processing-batch",
runs=[
{"input": "Process dataset A"},
{"input": "Process dataset B"},
{"input": "Process dataset C"},
]
)
# Monitor progress
status = client.beta.task\_group.retrieve(group.id)
# Get all results
results = client.beta.task\_group.get\_runs(group.id)
```
"""
def create(
self,
\*,
runs: List[BetaRunInput],
name: Optional[str] = None,
) -> TaskGroup: ...
def retrieve(self, group\_id: str) -> TaskGroup: ...
def get\_runs(
self,
group\_id: str,
\*,
limit: Optional[int] = None,
offset: Optional[int] = None,
) -> List[TaskRunResult]: ...
def add\_runs(
self,
group\_id: str,
\*,
runs: List[BetaRunInput],
) -> TaskGroup: ...
class AsyncTaskGroupResource:
"""Async version of TaskGroupResource."""
async def create(
self,
\*,
runs: List[BetaRunInput],
name: Optional[str] = None,
) -> TaskGroup: ...
async def retrieve(self, group\_id: str) -> TaskGroup: ...
async def get\_runs(
self,
group\_id: str,
\*,
limit: Optional[int] = None,
offset: Optional[int] = None,
) -> List[TaskRunResult]: ...
async def add\_runs(
self,
group\_id: str,
\*,
runs: List[BetaRunInput],
) -> TaskGroup: ...
class BetaTaskRunResource:
"""Beta task run features with advanced capabilities."""
def events(
self,
run\_id: str,
\*,
since: Optional[str] = None,
limit: Optional[int] = None,
) -> TaskRunEventsResponse: ...
class AsyncBetaTaskRunResource:
"""Async beta task run features."""
async def events(
self,
run\_id: str,
\*,
since: Optional[str] = None,
limit: Optional[int] = None,
) -> TaskRunEventsResponse: ...
# Client aliases for convenience
Client = Parallel
AsyncClient = AsyncParallel
# Usage examples and patterns
class UsageExamples:
"""
Complete usage examples for the Parallel SDK.
Basic Usage:
```python
import parallel
# Initialize client
client = parallel.Parallel(api\_key="your-api-key")
# Simple text generation
result = client.task\_run.create(
input="Write a Python function to calculate fibonacci numbers"
)
print(result.output.content)
```
Structured Output:
```python
class CodeAnalysis(parallel.BaseModel):
complexity: int
suggestions: List[str]
bugs: List[str]
result = client.task\_run.create(
input="def buggy\_func(x): return x / 0",
output\_format=CodeAnalysis
)
analysis = result.output.parsed # Type: CodeAnalysis
print(f"Complexity: {analysis.complexity}")
```
Batch Processing:
```python
# Process multiple items
inputs = ["Translate to French: Hello", "Translate to French: Goodbye"]
runs = [{"input": text} for text in inputs]
group = client.beta.task\_group.create(
name="translation-batch",
runs=runs
)
# Wait for completion and get results
results = client.beta.task\_group.get\_runs(group.id)
```
Error Handling:
```python
try:
result = client.task\_run.create(
input="Complex task",
timeout=30.0
)
except parallel.APITimeoutError:
print("Task timed out")
except parallel.APIStatusError as e:
print(f"API error: {e.status\_code} - {e.message}")
except parallel.ParallelError as e:
print(f"SDK error: {e}")
```
Async Usage:
```python
import asyncio
async def process\_tasks():
async with parallel.AsyncParallel(api\_key="your-api-key") as client:
tasks = [
client.task\_run.create(input=f"Task {i}")
for i in range(10)
]
results = await asyncio.gather(\*tasks)
return results
results = asyncio.run(process\_tasks())
```
Custom Schemas:
```python
# Define custom JSON schema
custom\_schema = {
"type": "json",
"json\_schema": {
"type": "object",
"properties": {
"summary": {"type": "string"},
"score": {"type": "number", "minimum": 0, "maximum": 10}
},
"required": ["summary", "score"],
"additionalProperties": False
}
}
result = client.task\_run.create(
input="Analyze this text: 'Great product, highly recommend!'",
task\_spec={"output\_schema": custom\_schema}
)
```
"""
pass
# Environment configuration
class Config:
"""
SDK configuration options.
Environment Variables:
- PARALLEL\_API\_KEY: Default API key
- PARALLEL\_BASE\_URL: Custom API base URL
- PARALLEL\_LOG: Logging level ("debug" or "info")
"""
pass
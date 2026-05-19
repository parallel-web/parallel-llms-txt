> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ollama Tool Calling

> Use Parallel Search as a tool with local Ollama models for real-time web access

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

Give locally-hosted models running under [Ollama](https://ollama.com) real-time web search by registering Parallel Search as a tool. This guide uses Ollama's native Python SDK, which derives the tool schema directly from your function signature and docstring.

## Overview

Modern Ollama models (Qwen 3.5, Gemma 4, Llama 3.1+) support [native tool calling](https://docs.ollama.com/capabilities/tool-calling): you pass `tools=[...]` on a chat call, the model emits structured `tool_calls`, your code executes them, and you feed results back in a follow-up turn. By registering Parallel Search as a tool, your local model can:

* Search the web for current information
* Access real-time news, research, and facts
* Cite sources with URLs in responses

<Note>
  This guide uses the native `ollama` Python SDK. If your application already speaks the OpenAI Chat Completions API — including TypeScript apps using `openai` — point your existing client at `http://localhost:11434/v1` and follow the [OpenAI Tool Calling](/integrations/openai-tool-calling) guide unchanged.
</Note>

## Prerequisites

1. Install [Ollama](https://ollama.com/download) and start the daemon (`ollama serve`)
2. Pull a tool-capable model (Qwen 3.5 has the most reliable tool calls)
3. Get your Parallel API key from [Platform](https://platform.parallel.ai)
4. Install the Python SDKs

```bash theme={"system"}
ollama pull qwen3.5:0.8b
pip install ollama parallel-web
export PARALLEL_API_KEY="your-parallel-api-key"
```

## Define the Search Tool

The Ollama Python SDK accepts plain Python functions as tools. It reads the parameter type hints and docstring (Google-style) to build the JSON schema automatically — no separate schema object required. See [Search Tool Definition](/search/best-practices#search-tool-definition) for the recommended objective + queries shape.

```python theme={"system"}
import os
from parallel import Parallel

parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

def search_web(objective: str, search_queries: list[str]) -> dict:
    """Searches the web for current and factual information using Parallel.

    Args:
      objective: A concise, self-contained search query. Must include the
        key entity or topic being searched for.
      search_queries: Exactly 3 keyword queries, each 3-6 words. Must be
        diverse — vary entity names, synonyms, and angles. Each query must
        include the key entity. Never write sentences or use site: operators.

    Returns:
      A dict with a `results` list, each containing url, title, and excerpts.
    """
    response = parallel_client.search(
        objective=objective,
        search_queries=search_queries,
    )
    return {
        "results": [
            {"url": r.url, "title": r.title, "excerpts": r.excerpts[:3] if r.excerpts else []}
            for r in response.results
        ]
    }
```

## Process Tool Calls

Pass the function directly in `tools`, then dispatch any returned calls and append the results as `role: "tool"` messages:

```python theme={"system"}
available_tools = {"search_web": search_web}

def process_tool_calls(tool_calls):
    """Execute each tool call and return tool-result messages."""
    results = []
    for call in tool_calls:
        fn = available_tools.get(call.function.name)
        if fn is None:
            continue
        # Ollama returns arguments as a parsed dict, not a JSON string.
        result = fn(**call.function.arguments)
        results.append({
            "role": "tool",
            "tool_name": call.function.name,
            "content": str(result),
        })
    return results
```

## Complete Example

End-to-end: a chat loop that lets the model decide when to search.

```python theme={"system"}
import os
from ollama import chat
from parallel import Parallel

parallel_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

def search_web(objective: str, search_queries: list[str]) -> dict:
    """Searches the web for current and factual information using Parallel.

    Args:
      objective: A concise, self-contained search query. Must include the
        key entity or topic being searched for.
      search_queries: Exactly 3 keyword queries, each 3-6 words. Must be
        diverse — vary entity names, synonyms, and angles. Each query must
        include the key entity. Never write sentences or use site: operators.
    """
    response = parallel_client.search(
        objective=objective,
        search_queries=search_queries,
    )
    return {
        "results": [
            {"url": r.url, "title": r.title, "excerpts": r.excerpts[:3] if r.excerpts else []}
            for r in response.results
        ]
    }

def chat_with_search(user_message: str, model: str = "qwen3.5:0.8b") -> str:
    messages = [
        {
            "role": "system",
            "content": "You are a helpful research assistant. Use search_web "
                       "for current information. Cite sources with URLs.",
        },
        {"role": "user", "content": user_message},
    ]
    available = {"search_web": search_web}

    while True:
        response = chat(model=model, messages=messages, tools=[search_web])
        messages.append(response.message)

        if not response.message.tool_calls:
            return response.message.content

        for call in response.message.tool_calls:
            fn = available.get(call.function.name)
            result = fn(**call.function.arguments) if fn else "unknown tool"
            messages.append({
                "role": "tool",
                "tool_name": call.function.name,
                "content": str(result),
            })

if __name__ == "__main__":
    print(chat_with_search("What's new with Parallel Web Systems?"))
```

## Tool Parameters

| Parameter        | Type      | Required | Description                                                                                                  |
| ---------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `objective`      | string    | Yes      | A concise, self-contained search query. Must include the key entity or topic being searched for.             |
| `search_queries` | string\[] | Yes      | Exactly 3 keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. |

## Choosing a Model

Tool calling reliability varies sharply by model. From most to least dependable for this workflow:

| Model                         | Notes                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `qwen3.5:0.8b` – `qwen3.5:9b` | Native tool calling across all sizes; the 0.8b runs on a laptop CPU. Recommended starting point. |
| `qwen3:8b` and up             | Stable tool calling, slightly older generation.                                                  |
| `gemma4:e4b`                  | Native function calling; good quality if already pulled.                                         |
| `llama3.1:8b`                 | Works but more prone to malformed arguments at smaller sizes.                                    |

Smaller models (under \~7B) occasionally hallucinate parameters or skip required fields. If you see flaky calls, jump up a size before tuning prompts.

## Differences from the OpenAI Client

If you're porting code from the [OpenAI Tool Calling](/integrations/openai-tool-calling) guide, three things change:

|                           | OpenAI client                              | Ollama native SDK                 |
| ------------------------- | ------------------------------------------ | --------------------------------- |
| Tool definition           | Manual JSON schema object                  | Pass the Python function directly |
| `tool_calls` arguments    | JSON-encoded **string** (use `json.loads`) | Parsed **dict**                   |
| Tool result message field | `tool_call_id`                             | `tool_name`                       |

The OpenAI-compatible endpoint at `http://localhost:11434/v1` follows the OpenAI conventions instead — useful if you want to keep one code path across providers. Note that `tool_choice` is not supported on that endpoint.

## Related Resources

* [OpenAI Tool Calling](/integrations/openai-tool-calling)
* [Search API Quickstart](/search/search-quickstart)
* [Search Best Practices](/search/best-practices)
* [Ollama tool calling documentation](https://docs.ollama.com/capabilities/tool-calling)

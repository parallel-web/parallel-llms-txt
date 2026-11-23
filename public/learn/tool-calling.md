# Tool calling

Tool calling (also called function calling) is the mechanism that lets a language model emit a structured request to invoke an external function, API, or local command. The model never executes the tool; the host runtime parses the arguments, runs the code, and feeds the result back into the context window.

Tool calling is what separates a text generator from an [AI agent](/learn/ai-agent). Left on its own, a language model can only sample tokens from its weights and whatever sits in its prompt. It cannot query a database, read a live web page, or trigger a webhook. Tool calling bridges that gap by letting the model output a structured function invocation—a tool name and typed JSON arguments—that your application validates, executes, and returns as an observation on the next turn.

**Tool calling round-trip**

```text
┌──────────────┐  1. messages + schemas  ┌──────────────┐
│ Host Runtime │ ──────────────────────▶ │     LLM      │
│  (your app / │                         │  (picks tool │
│  agent loop) │ ◀────────────────────── │  + JSON args)│
└──────┬───────┘  2. tool_call {name,    └──────────────┘
       │             args}                       ▲
       │ 3. validate & execute                   │ 5. append tool
       ▼                                         │    result & call
┌──────────────┐  4. JSON result                 │    model again
│ External API │ ────────────────────────────────┘
│  / Function  │
└──────────────┘
```

OpenAI popularized the pattern as "function calling" in [June 2023](https://openai.com/index/function-calling-and-other-api-updates/), shortly after Meta's [Toolformer paper](https://arxiv.org/abs/2302.04761) showed that teaching models to call external APIs more than doubled accuracy on math and QA benchmarks. Today every major model API exposes the same core contract, whether the provider names it `tools`, `tool_use`, or `function_calling`.

## How tool calling works on the wire

A single tool call spans three payloads across two model requests. Every step stays stateless from the model's perspective; your application owns the conversation state and execution boundary.

1. **Tool declaration:** You pass an array of tool definitions alongside the user message. Each tool carries a `name`, a natural-language `description`, and a JSON Schema (`parameters` or `input_schema`) describing its arguments and types.
2. **Model invocation (**`**tool_use**`** / **`**tool_calls**`**):** Instead of finishing with plain text, the model stops with a tool-call finish reason (`tool_calls` or `tool_use`) and emits one or more structured calls, each tagged with a unique call ID (for example `call_01`).
3. **Tool result (**`**tool_result**`**):** Your host runtime looks up the tool by `name`, validates the JSON arguments against the schema, runs the underlying function or HTTP request, and appends a tool-result message referencing the same `call_id`. You send the updated transcript back to the model, which either issues another call or writes the final answer.

```json
{
  "tool_declaration": {
    "name": "search_web",
    "description": "Search the live web and return ranked URLs with relevant excerpts.",
    "parameters": {
      "type": "object",
      "properties": {
        "objective": {
          "type": "string",
          "description": "What you are trying to find, in plain language."
        },
        "search_queries": {
          "type": "array",
          "items": { "type": "string" },
          "description": "2 to 3 concise keyword queries."
        }
      },
      "required": ["objective", "search_queries"],
      "additionalProperties": false
    }
  },
  "assistant_tool_call": {
    "id": "call_01",
    "name": "search_web",
    "arguments": {
      "objective": "Find the latest release date and changelog highlights for SQLite 3.50",
      "search_queries": ["SQLite 3.50 release notes", "sqlite.org releaselogs 3_50"]
    }
  },
  "tool_result": {
    "tool_call_id": "call_01",
    "content": "[{\"url\":\"https://sqlite.org/changes.html\",\"excerpts\":[\"...\"]}]"
  }
}
```

Many providers now support grammar-constrained decoding (often toggled via `strict: true`), which compiles the tool's JSON Schema into a finite-state mask during token sampling. That guarantees syntactically valid JSON conforming to the declared keys and types, though it does not guarantee the model picked the right tool or supplied factually valid values.

## Parallel calls and the action-observation loop

Single-turn tool calls handle simple lookups, but production agents usually run a multi-turn loop—often managed by an [agent harness](/articles/what-is-an-agent-harness)—until the model stops requesting tools or hits a step limit.

Modern models also emit **parallel tool calls** in a single assistant turn: for example, calling `search_web` with two independent queries and `get_account` against an internal CRM at the same time. The host runtime executes those calls concurrently and returns one `tool_result` per `tool_call_id`, collapsing wall-clock latency from the sum of tool runtimes to the slowest call in the batch.

```python
import json

def run_agent(client, user_prompt: str, tools: list[dict], dispatch: dict, max_steps: int = 8):
    messages = [{"role": "user", "content": user_prompt}]

    for _ in range(max_steps):
        resp = client.respond(messages=messages, tools=tools)
        messages.append(resp.assistant_message)

        if not resp.tool_calls:
            return resp.text

        for call in resp.tool_calls:
            fn = dispatch.get(call.name)
            try:
                args = json.loads(call.arguments)
                result = fn(**args) if fn else {"error": f"Unknown tool: {call.name}"}
            except Exception as exc:
                # Return errors as observations so the model can fix arguments or retry
                result = {"error": str(exc)}

            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": json.dumps(result),
            })

    raise RuntimeError(f"Exceeded max_steps={max_steps}")
```

Because the host runtime sits between the model and the outside world, it is the security boundary. Permissions, rate limits, argument validation, sandboxing, and human-in-the-loop approvals for write actions (sending email, mutating a database, placing an order) belong in host code, never solely in prompt instructions.

## Tool calling vs. MCP vs. agent skills

Tool calling is the low-level model primitive. Higher-level standards build on top of it to solve discovery, transport, and procedural packaging.

| Mechanism | What it defines | Where schemas live | Best fit |
| --- | --- | --- | --- |
| Native tool calling | JSON Schema declaration + structured invocation inside an LLM API | Hard-coded in your application code | Tightly coupled product backends with a small, fixed toolset |
| [MCP](/learn/model-context-protocol) | Client-server JSON-RPC protocol for discovering and invoking tools across processes | Exposed dynamically by an [MCP server](/learn/mcp-server) via `tools/list` | Connecting many clients to shared external tools without bespoke glue |
| [Agent skills](/learn/agent-skills) | Portable markdown instructions (`SKILL.md`) and scripts loaded on demand | Local or registry folders read by the agent harness | Teaching repeatable multi-step workflows that compose existing tools |

## Common failure modes in production

Most production reliability issues in tool-using agents trace back to schema design and context management rather than the model's raw reasoning:

- **Tool-set bloat and selection overlap:** Passing dozens of tools with similar names inflates input tokens on every turn and degrades routing accuracy. Multi-turn selection remains noticeably harder than single-turn calls on evaluations like the [Berkeley Function Calling Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html). Keep tool sets narrow, or load tools lazily as part of [context engineering](/learn/context-engineering).
- **Underspecified schemas:** The model reads `description` fields and parameter names the way an engineer reads API docs. Constraining values with `enum`, marking required fields explicitly, and documenting units or date formats (`YYYY-MM-DD`) eliminates most malformed calls.
- **Unbounded tool output:** Returning raw HTML or megabyte JSON payloads floods the context window and drowns out earlier instructions. Tools that read the live web—such as a [web search API](/learn/web-search-api) like [Parallel Search](/products/search) or [Extract](/products/extract)—work best when they return compact, query-relevant excerpts sized for multi-turn [agentic search](/learn/agentic-search) and [grounding](/learn/grounding-llm).
- **Crashing on bad arguments:** Treating a validation error as a fatal exception kills the run. Returning a concise error object in the `tool_result` lets the model inspect what failed and self-correct on the next turn.

## Frequently asked questions

**Is tool calling the same as function calling?**

Yes. "Function calling" was OpenAI's original API label in 2023, while Anthropic and newer specifications use "tool use" or "tool calling." Both describe the same contract: the model emits structured arguments against a JSON Schema and the host runtime executes the action.

**Does the language model execute the tool itself?**

No. The model only generates the tool name and JSON arguments as structured output tokens. Your host runtime—or a managed sandbox/server it talks to—runs the actual code and passes the serialized output back into the next model request.

**How many tools should you expose in one model call?**

There is no single hard cap across providers, but routing accuracy and latency both degrade as tool definitions grow. Most production harnesses keep the active set under roughly 15–20 well-separated tools per turn, or use dynamic discovery and [agent skills](/learn/agent-skills) to load specialized tools only when a task calls for them.

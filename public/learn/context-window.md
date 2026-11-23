# Context window

A context window is the maximum number of tokens a language model can hold in working memory on a single call, spanning instructions, tool schemas, history, retrieved evidence, and generated output.

A context window is the maximum number of tokens a language model can hold in working memory during a single inference call—covering system instructions, tool schemas, conversation history, retrieved documents, reasoning traces, and the tokens the model generates in response. It is not free disk space: every token in the window participates in attention, consumes GPU memory through the KV cache, adds latency to time-to-first-token (TTFT), and influences whether the model stays accurate or loses track of key facts.

**What shares an agent's context window on turn N**

```text
┌────────────────────────── Context Window ──────────────────────────┐
│ [System + Tools] [Turn History] [Tool / Search Results] [Output  ] │
│     ~4–15K          ~10–40K           ~15–80K            Reserve   │
└────────────────────────────────────────────────────────────────────┘
  ▲ fixed per turn  ▲ grows each    ▲ biggest bloat risk   ▲ needed
    (cacheable)       step            in web agents          for reply
```

## Tokens, KV cache, and why big windows still have limits

Models do not read characters or words; they read subword **tokens** (roughly 3.5–4 English characters per token on average, though dense JSON, HTML markup, and URLs tokenize much less efficiently). During inference, the transformer caches key and value tensors (**KV cache**) for every input token so it does not recompute past positions while generating each new output token.

Two physical realities follow directly from that architecture:

1. **Cost and prefill latency scale with context length:** Even when a model advertises a 200K–1M token window, feeding 150K tokens on every turn of a 10-step agent loop means processing over a million input tokens unless the static prefix hits prompt caching.
2. **Effective context is smaller than advertised context:** Research starting with Liu et al.'s _[Lost in the Middle](https://arxiv.org/abs/2307.03172)_ and later long-context needle/reasoning evaluations (often called **context rot**) shows that retrieval accuracy and instruction following degrade as irrelevant noise fills the window—especially when critical facts are buried between long tool outputs.

## Why web agents blow up context windows faster than chatbots

In a plain chat session, context grows slowly by a few hundred tokens per message. In an [AI agent](/learn/ai-agent) using [tool calling](/learn/tool-calling) and live web access, a single unfiltered tool call can inject tens of thousands of tokens at once:

- **Raw HTML pages** routinely run 50,000–250,000 characters of navigation bars, scripts, CSS classes, and cookie banners—burning 15K–60K tokens for two paragraphs of actual content.
- **Verbose JSON payloads** from APIs or large [MCP server](/learn/mcp-server) tool lists add thousands of schema and metadata tokens on _every_ turn of the loop.
- **Unpruned multi-hop traces** accumulate stale search snippets from earlier dead-end queries during [agentic search](/learn/agentic-search).

| Context consumer | Typical size per turn | Main risk | Mitigation |
| --- | --- | --- | --- |
| System prompt + tool schemas | 2K–20K tokens | Eats fixed budget on every turn; hurts tool routing | Keep active tools narrow; load [agent skills](/learn/agent-skills) on demand |
| Raw fetched web pages | 10K–60K tokens / page | Rapidly overflows window and degrades attention | Use a [web search API](/learn/web-search-api) returning dense excerpts ([Parallel Search](/products/search)) |
| Multi-turn conversation + tool logs | Grows linearly per hop | Context rot; rising latency and token bills | Compact old turns, drop raw payloads once summarized |
| Reasoning + output tokens | 1K–16K tokens | Output truncation if input leaves no headroom | Reserve explicit output budget before calling the model |

## Budgeting context in code

Managing what enters and exits the window is the core discipline of [context engineering](/learn/context-engineering). A simple token-budget check before each model call prevents surprise `context_length_exceeded` errors and forces older tool outputs to be trimmed or compacted cleanly.

```python
def estimate_tokens(text: str) -> int:
    # Conservative heuristic (~3.5 chars/token for mixed prose + JSON)
    return max(1, int(len(text) / 3.5))

def trim_tool_observations(
    messages: list[dict],
    max_input_tokens: int = 80_000,
    keep_recent: int = 6,
) -> list[dict]:
    total = sum(estimate_tokens(str(m.get("content", ""))) for m in messages)
    if total <= max_input_tokens:
        return messages

    # Preserve system prompt and most recent turns; replace older bulky tool outputs
    head = messages[:1]
    middle = messages[1:-keep_recent]
    tail = messages[-keep_recent:]

    compacted = []
    for msg in middle:
        if msg.get("role") == "tool" and len(str(msg.get("content", ""))) > 600:
            compacted.append({
                **msg,
                "content": "[omitted older tool output — re-query if needed]",
            })
        else:
            compacted.append(msg)

    return head + compacted + tail
```

## Context window vs. RAG vs. external memory

A larger context window does not eliminate the need for retrieval ([RAG](/learn/rag-retrieval-augmented-generation) or live search). Stuffing an entire repository or web dump into the prompt pays prefill compute on every request and still cannot reach facts published after you assembled the prompt. In practice, teams treat the context window like CPU cache—fast, precious, and scoped to the active step—while keeping large or changing knowledge behind [hybrid search](/learn/hybrid-search), [reranking](/learn/reranking), and live web APIs.

## Frequently asked questions

**Does the context window include output tokens?**

On most model APIs, yes: input tokens plus generated output (and internal reasoning tokens) must fit within the model's total context window, and models also enforce a separate `max_output_tokens` cap per response.

**Why does a model perform worse at 100K tokens than at 10K tokens even if its limit is 1M?**

Attention spreads across every token in the window. Irrelevant or contradictory passages dilute signal, making the model more likely to miss constraints, copy stale numbers, or pick the wrong tool—an effect often referred to as context rot.

**How do prompt caching and context windows interact?**

Prompt caching stores the computed KV cache for an unchanged leading prefix (such as your system prompt and tool definitions) across turns. Placing stable instructions first and dynamic search or tool results last maximizes cache hits and cuts both cost and TTFT in multi-turn loops.

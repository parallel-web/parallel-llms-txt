# Prompt caching

Prompt caching reuses computed transformer KV states for an unchanged leading prompt prefix across requests, cutting input token costs and time-to-first-token latency in multi-turn agent loops.

Prompt caching saves the computed transformer key-value (KV) states for the leading prefix of a prompt on the inference server so subsequent requests starting with the exact same tokens skip prefill recomputation. For multi-turn [AI agents](/learn/ai-agent) that resend the same system prompt, tool definitions, and conversation prefix 10–30 times in a single task, prompt caching cuts input token costs by roughly 50%–90% and slashes time-to-first-token (TTFT) latency.

**Prefix match (cache hit) vs. prefix mutation (cache miss)**

```text
CACHE HIT (stable prefix, append-only turns)
  Turn 1: [System + Tools + Static Docs] [User Q]              (write)
  Turn 2: [========= CACHED KV =========] [User Q] [Tool 1]    (HIT)
  Turn 3: [============ CACHED KV ============]    [T1] [T2]   (HIT)

CACHE MISS (dynamic value injected at top -> busts everything after)
  Turn 2: [System + time=12:01 + Tools + Docs] [User Q]        (MISS!)
                    ▲ 1 changed token invalidates all downstream KV
```

## How prefix-based KV caching works

Transformer attention is causal: token `i` attends only to tokens `0..i-1`. That means if Request B shares an identical token sequence with Request A from position `0` up to position `P`, the intermediate key and value matrices for positions `0..P` are mathematically identical and can be loaded straight from cache instead of recomputed through every transformer layer.

Because the match is strictly **prefix-based**, a single changed token at index 40 invalidates the cache for tokens `40..100,000`. That single rule dictates how you structure prompts in [context engineering](/learn/context-engineering):

1. **Put the most static tokens first:** System instructions, coding/house rules, and stable [tool calling](/learn/tool-calling) / [MCP server](/learn/mcp-server) schemas belong at the very top, serialized in deterministic key order.
2. **Place shared reference material next:** Repository summaries, long policy PDFs, or unchanging few-shot examples sit immediately after tools.
3. **Append dynamic state strictly at the end:** Current timestamps, user IDs, live [web search API](/learn/web-search-api) results, and new tool observations go at the tail of the message array.

```json
{
  "system": [
    {
      "type": "text",
      "text": "You are a research agent. Cite every factual claim with its exact source URL.",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "tools": [
    {
      "name": "search_web",
      "description": "Search the live web for current facts.",
      "input_schema": { "type": "object", "properties": { "objective": { "type": "string" } } },
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [
    { "role": "user", "content": "[Date: 2026-11-22] Verify whether Acme Corp filed a Q3 10-Q." }
  ]
}
```

## Automatic vs. explicit prompt caching

Providers expose prefix caching in two styles, with similar underlying mechanics:

| Caching style | How it activates | Typical TTL | Key consideration |
| --- | --- | --- | --- |
| Automatic (e.g., OpenAI, Gemini implicit) | Server hashes prefixes automatically above a minimum token threshold (e.g., 1,024 tokens) | ~5–10 min sliding (extended tiers available) | Zero markup needed, but silent prefix drift causes invisible misses |
| Explicit breakpoints (e.g., Anthropic `cache_control`, Gemini explicit) | Client marks specific blocks (`ephemeral` / named cache handle) | 5 min to 1 hour (sliding on hit) | Deterministic control over cache boundaries and write-cost accounting |

## Common mistakes that silently bust prompt caches

- **Dynamic timestamps or random UUIDs in the system prompt:** Putting `Current time: 2026-11-22T14:03:22Z` on line 1 of the system prompt guarantees a 0% cache hit rate. Pass date/time in the user message instead.
- **Re-sorting tool arrays between turns:** Serializing a Python `set` or dynamically toggling one tool in the middle of the `tools` array shifts every subsequent token position. Keep tool ordering deterministic and append-only.
- **Mutating earlier messages mid-loop:** Editing or pruning message #2 on every turn invalidates the cached KV state for turns #3–#15. Compact only at planned checkpoints when approaching [context window](/learn/context-window) limits.
- **Forgetting minimum cache thresholds:** Short prompts under ~1,024 tokens (varies by model) skip caching altogether.

## Frequently asked questions

**Does prompt caching change model outputs?**

No. Because cached KV tensors are mathematically identical to recomputing the same prefix, prompt caching preserves output quality while lowering input cost and TTFT.

**Does prompt caching share data between different customers?**

On major commercial LLM APIs, prompt caches are isolated per organization/workspace (or explicit cache handle) so one customer's prompt prefix is never exposed to another tenant.

**How does prompt caching help web search agents specifically?**

A multi-hop [agentic search](/learn/agentic-search) run often makes 6–12 model calls within 30 seconds. Keeping the system prompt, tool schemas, and prior search observations append-only lets turns 2 through 12 pay discounted cache-read rates for almost the entire transcript.

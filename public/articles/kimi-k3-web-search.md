# How to add web search to Kimi K3 and other open-weight models

Kimi K3 is losing its built-in web search tool, and most API-served open-weight models never had one, so how do you keep answers current? This guide covers which providers offer native search and what it costs, a Python function-calling loop that runs on Moonshot's API or OpenRouter, a keyless MCP option for agent clients, and the reasoning-message gotcha that breaks tool loops.

Moonshot AI launched [Kimi K3](https://huggingface.co/moonshotai/Kimi-K3) on July 16, 2026 and published the weights on July 27: a 2.8-trillion-parameter mixture-of-experts model with 104 billion active parameters, a 1-million-token context window, and native tool calling. Its built-in `$web_search` tool is on the way out. Moonshot’s docs say it [retires on October 20, 2026](https://platform.kimi.ai/docs/guide/use-web-search), and the [K3 quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart) already warns that web search “is being updated and is not recommended for production workflows in the near term.” If your Kimi K3 app needs current information, you’ll be wiring search in yourself. The same holds for most other API-served open-weight models, so one function-calling loop covers all of them.

We make Parallel, so the example below uses our Search API. The loop itself is provider-neutral: swap the body of `web_search()` and nothing else changes.

## Why open-weight models need an external search tool

Every model stops learning at a training cutoff. Reflection’s developer docs list a knowledge cutoff of [June 30, 2026](https://developers.reflection.ai/models) for Beam, a model announced on October 5, so it’s already three months behind on day one. Ask any of these models about a price, a version number, or a deprecation date, and they’ll answer from memory unless something hands them fresh text.

Closed APIs from OpenAI, Anthropic, and Google bundle a hosted search tool. With open-weight models, it depends on who serves them. Some first-party APIs include one, others don’t, and inference hosts that serve the same weights usually don’t expose the lab’s own search at all. Function calling works everywhere: you describe a `web_search` function, the model decides when to call it, your code runs the search, and the results go back as a tool message.

This article covers models you call over an API. If you run models on your own hardware, our guide to [web search for local AI agents](https://parallel.ai/articles/web-search-for-local-ai-agents) covers Ollama, LM Studio, Goose, and Pi.

## Which open-weight APIs include web search

We checked each provider’s docs on October 10, 2026.

| Model | Weights and license | Where to call it | Native web search and price | Tool calling |
| --- | --- | --- | --- | --- |
| Kimi K3 (Moonshot AI) | 2.8T total, 104B active; Kimi K3 License | api.moonshot.ai/v1 as kimi-k3; OpenRouter as moonshotai/kimi-k3 | $web_search builtin at $0.005/call plus result tokens, retiring Oct 20, 2026; standalone search endpoints from $0.002/call | Yes |
| GLM 5.3 (Z.ai) | On Hugging Face; glm-5.3 license | api.z.ai/api/paas/v4 as glm-5.3; OpenRouter as z-ai/glm-5.3 | Built-in web_search tool and Web Search API, $0.01/use | Yes |
| DeepSeek V4.1 Flash and V4 Pro | V4.1 Flash on Hugging Face; MIT | api.deepseek.com as deepseek-flash or deepseek-v4-pro | None listed in the API docs | Yes |
| Reflection Beam | 501B total, 23B active; Apache 2.0 promised, weights not yet released | api.reflection.ai/openai/v1 as Beam-501B-A23B (beta, waitlist) | None documented | Yes, up to 128 tools |

A few details behind the table:

- **Kimi K3.** Moonshot’s [pricing page](https://platform.kimi.ai/docs/pricing/chat) lists $3.00 per million input tokens ($0.30 on a cache hit) and $15.00 per million output tokens. The replacement for `$web_search` is three REST endpoints, [priced](https://platform.kimi.ai/docs/pricing/websearch) at $0.002 (Web Search Basic), $0.003 (Web Search Pro), and $0.002 (URL Fetch) per call. They’re plain APIs, so you still write the tool definition and the loop. The license is open with conditions: according to [The Indian Express](https://indianexpress.com/article/technology/artificial-intelligence/china-moonshot-ai-kimi-k3-model-weights-custom-licence-10807478/), hosting providers with more than $20 million in annual revenue need a separate agreement with Moonshot.
- **GLM 5.3.** Z.ai launched it on August 14, 2026. Its [pricing page](https://docs.z.ai/guides/overview/pricing) lists $1.4 input and $4.4 output per million tokens, and $0.01 per web search use. GLM 5.3 always reasons; the [model page](https://docs.z.ai/guides/llm/glm-5.3) says `thinking.type: "disabled"` now fails.
- **DeepSeek.** The [models and pricing page](https://api-docs.deepseek.com/quick_start/pricing) lists tool calls, JSON output, and an Anthropic-compatible endpoint, but no search tool. Peak rates for `deepseek-flash` are $0.30 input and $1.20 output per million tokens, and off-peak rates are half that.
- **Reflection Beam.** Reflection [announced Beam](https://reflection.ai/blog/introducing-beam) on October 5 and says the Apache 2.0 weights ship later this month. The API is an OpenAI-compatible beta with no published rate card yet, and Beam wasn’t in the OpenRouter catalog when we checked.

OpenRouter has its own option. Its [`openrouter:web_search` server tool](https://openrouter.ai/docs/guides/features/server-tools/web-search) runs searches on its side for any model. None of the four labs above appear on its native-search list, so the default engine for these models is Exa at $0.007 per request. If you want zero search code, set `engine` to `parallel` with `mode: "fast"` for $0.001 per request. Use the loop below when you want to control the queries, cap result size, or keep the same code across Moonshot, Z.ai, DeepSeek, and Reflection.

## Build a web search tool loop in Python

The script uses the OpenAI Python SDK against any chat-completions endpoint. It defaults to OpenRouter and Kimi K3. To call Moonshot directly, set `LLM_BASE_URL=https://api.moonshot.ai/v1` and `LLM_MODEL=kimi-k3`. The same two variables point it at Z.ai, DeepSeek, or Reflection.

```bash
pip install openai requests
export LLM_API_KEY="your-openrouter-or-moonshot-key"
export PARALLEL_API_KEY="your-parallel-key"
```

```python
import json
import os

import requests
from openai import OpenAI

# Works with any OpenAI-compatible endpoint. Defaults to OpenRouter.
# Moonshot direct: LLM_BASE_URL=https://api.moonshot.ai/v1  LLM_MODEL=kimi-k3
client = OpenAI(
    base_url=os.environ.get("LLM_BASE_URL", "https://openrouter.ai/api/v1"),
    api_key=os.environ["LLM_API_KEY"],
)
MODEL = os.environ.get("LLM_MODEL", "moonshotai/kimi-k3")

TOOLS = [{
    "type": "function",
    "function": {
        "name": "web_search",
        "description": "Search the live web. Use for anything recent, "
                       "versioned, priced, or otherwise likely to have "
                       "changed since your training cutoff.",
        "parameters": {
            "type": "object",
            "properties": {
                "objective": {
                    "type": "string",
                    "description": "One sentence: what you need to find out.",
                },
                "search_queries": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "2-3 keyword queries, 3-6 words each.",
                },
            },
            "required": ["objective", "search_queries"],
        },
    },
}]


def web_search(objective, search_queries):
    resp = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={
            "objective": objective,
            "search_queries": search_queries,
            "mode": "fast",
            "advanced_settings": {"max_results": 5},
        },
        timeout=30,
    )
    resp.raise_for_status()
    return json.dumps([
        {
            "url": r["url"],
            "title": r.get("title"),
            "published": r.get("publish_date"),
            "excerpts": r["excerpts"],
        }
        for r in resp.json()["results"]
    ])


def ask(question, max_turns=6):
    messages = [
        {"role": "system", "content": "Search before answering anything "
         "time-sensitive. Cite the URLs you used."},
        {"role": "user", "content": question},
    ]
    for _ in range(max_turns):
        reply = client.chat.completions.create(
            model=MODEL, messages=messages, tools=TOOLS,
        ).choices[0].message
        # Send the whole assistant message back, reasoning fields included.
        messages.append(reply.model_dump(exclude_none=True))
        if not reply.tool_calls:
            return reply.content
        for call in reply.tool_calls:
            args = json.loads(call.function.arguments)
            print(f"-> web_search({args['search_queries']})")
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": web_search(args["objective"], args["search_queries"]),
            })
    return "Stopped after max_turns without a final answer."


if __name__ == "__main__":
    print(ask("When does Moonshot retire the $web_search builtin, "
              "and what replaces it?"))
```

### What the script does

The tool schema mirrors the Search API’s own inputs: a natural-language `objective` plus two or three short `search_queries`. Models are good at filling both, and the objective helps the API pick excerpts that answer the question instead of returning generic page text. The request sets `mode` to `fast`, which our [Search modes docs](https://docs.parallel.ai/search/modes) list at about 700ms and $1 per 1,000 requests. Authentication is an `x-api-key` header on `POST https://api.parallel.ai/v1/search`.

The line that matters most is `reply.model_dump(exclude_none=True)`. Kimi K3, GLM 5.3, and DeepSeek’s thinking mode all return reasoning alongside tool calls, and Moonshot’s quickstart says to “return the complete assistant message unchanged in multi-turn conversations and tool calls.” Appending only `content` and `tool_calls` drops the reasoning field and can get the next request rejected. The OpenAI SDK keeps unknown response fields such as `reasoning_content`, so dumping the whole message preserves them.

### Keep the result payload small

Search results are input tokens on the next turn. In our test, five `fast` results came to about 8,700 characters, roughly 2,000 tokens. At Kimi K3’s $3.00 per million input tokens, that’s about $0.006 each time those results are sent, which is more than the $0.001 search. Cap `max_results`, return excerpts instead of full pages, and let context caching absorb repeat turns.

### What we ran

We don’t have Moonshot or OpenRouter keys for this test, so we didn’t call Kimi K3 itself. On October 10, 2026 we ran `web_search()` against the live Search API four times, and each call returned five results in 0.64 to 0.88 seconds. For a query about the `$web_search` retirement, the top result was Moonshot’s own `$web_search` page, and the five included its new `/v1/tools/search` and `search_pro` reference pages. We then ran the full `ask()` loop against a local stub server that mimics a reasoning model’s chat-completions responses, with a real Parallel search in the middle. The stub confirmed that the `reasoning_content` field made it back on the second request and that the tool result reached the model:

```text
-> web_search(['Moonshot $web_search deprecated', 'Kimi API tools search endpoint'])
[stub] reasoning_content echoed back: True; got 5 results; top: https://platform.kimi.ai/docs/guide/use-web-search
```

## The zero-key path: connect the free Search MCP

If you use Kimi K3 or GLM 5.3 inside an MCP-capable client instead of your own code, skip the script. The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/quickstart) at `https://mcp.parallel.ai/mcp` is free with no API key, uses Streamable HTTP, and exposes two tools: `web_search` and `web_fetch`. Anonymous calls run in `fast` mode with rate limits. Add an `Authorization: Bearer` header with your Parallel key for higher limits.

Kimi Code, Moonshot’s coding agent, reads remote servers from `~/.kimi-code/mcp.json`, and an entry with a `url` and no `transport` is treated as Streamable HTTP ([Kimi Code docs](https://www.kimi.com/code/docs/en/kimi-code-cli/customization/mcp.html)):

```json
{
  "mcpServers": {
    "parallel-search": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

OpenCode, which can drive GLM 5.3 or DeepSeek, adds the same server with one command ([OpenCode MCP docs](https://opencode.ai/v2/docs/mcp-servers)):

```bash
opencode mcp add parallel-search --url https://mcp.parallel.ai/mcp
```

We tested the endpoint directly with a JSON-RPC client and no key on October 10. `tools/list` returned `web_search` and `web_fetch`, and a `web_search` call returned about 13,000 characters of results in 0.97 seconds, with the Kimi K3 license file on Hugging Face as the top hit. The response metadata reported $0.001 for the search.

For more clients, see [the best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp) and [what a web search MCP is](https://parallel.ai/articles/what-is-a-web-search-mcp).

## Frequently asked questions

### Does the Kimi K3 API have built-in web search?

Yes, for now. Moonshot’s `$web_search` builtin costs $0.005 per call plus the tokens of the returned results, and it retires on October 20, 2026. Moonshot’s replacements are standalone REST endpoints at $0.002 to $0.003 per call that you call from your own tool code.

### Can I use Kimi K3 on OpenRouter with tools?

Yes. OpenRouter lists Kimi K3 as `moonshotai/kimi-k3` and accepts `tools` and `tool_choice` for it, so the same OpenAI-compatible function-calling loop works there. OpenRouter’s `openrouter:web_search` server tool is another option if you’d rather not run search code.

### Do GLM 5.3 and DeepSeek V4.1 include web search?

Z.ai’s API offers a built-in `web_search` tool and a Web Search API at $0.01 per use. DeepSeek’s API docs list tool calling but no search tool, so you supply one through function calling.

### Is Reflection Beam open weights?

Not yet. Reflection announced Beam on October 5, 2026 as a 501B-parameter model with 23B active parameters and says Apache 2.0 weights will ship later in October. Today it’s available through a waitlisted, OpenAI-compatible API beta that supports tool calling.

### Why does my Kimi K3 tool loop fail on the second request?

Kimi K3 always reasons, and Moonshot requires the complete assistant message, reasoning included, in the next request. Append the full message object returned by the API, for example with `model_dump()` in the OpenAI Python SDK, instead of rebuilding it from `content` and `tool_calls`.

## Get started

Create a key on the [Parallel Platform](https://platform.parallel.ai), drop it into `agent.py`, and point `LLM_BASE_URL` at the provider you use. The free tier covers up to 5,000 requests a month. To pick a mode for your latency budget, read [Parallel Search Fast vs Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo), and for a fuller agent setup see [how to build an agent harness with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search).

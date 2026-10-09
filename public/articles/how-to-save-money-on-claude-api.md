# How to save money on the Claude API in 2026

Claude API costs come from four places, input tokens, output and thinking tokens, cache writes, and server tool fees, and agents that search the web pay on all four. This guide covers what Claude’s web search tool really costs across a conversation, how much switching to Parallel Search saves, and the other levers that stack with it, from prompt caching and Batch to effort settings and model choice.

Claude’s web search tool costs $10 per 1,000 searches, and that’s the smaller part of what it costs you. Anthropic’s [pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) add that “web search results retrieved throughout a conversation are counted as input tokens, in search iterations executed during a single turn and in subsequent conversation turns.” A search on turn two is still on the bill at turn ten.

We sell a search API, so we’ll be specific about where switching saves money and where it doesn’t. The rest of the guide covers the levers that apply to any Claude workload, search or not.

## Where a Claude bill comes from

Anthropic bills input tokens, output tokens (thinking included), cache writes, cache reads, and server tool fees. Current prices per 1M tokens on the Claude API:

| Model | Input | Output | Cache reads | Cache writes (5 min / 1 hour) |
| --- | --- | --- | --- | --- |
| Claude Fable 5.1 | $10.00 | $50.00 | $0.25 | 1.25x / 2x input |
| Claude Opus 5.5 | $4.00 | $20.00 | $0.20 | 1.25x / 2x input |
| Claude Sonnet 5.5 | $2.00 | $10.00 | $0.10 | 1.25x / 2x input |
| Claude Haiku 5.5, prompts up to 100K tokens | $0.10 | $0.50 | $0.01 | 1.25x / 2x input |
| Claude Haiku 5.5, prompts over 100K tokens | $0.50 | $2.50 | $0.05 | 1.25x / 2x input |

Server tools carry their own fees. Web search is $10 per 1,000 searches plus the result tokens; each search counts once regardless of how many results it returns, and failed searches aren’t billed. Web fetch has no fee beyond the tokens of the page it reads, which can be large: a long PDF runs to six figures of tokens.

## 1. Replace Claude’s web search with Parallel Search

Parallel’s [Search API](https://docs.parallel.ai/search/modes) costs $1 per 1,000 requests in Turbo (~200ms) and Fast (~700ms) modes, with 10 results and excerpts included, and $5 per 1,000 in Basic and Advanced. On the fee line, moving from Claude’s tool to Fast or Turbo is a 90% cut. An agent making a million searches a month pays $10,000 in search fees on Claude’s tool and $1,000 on ours.

The token line moved more than the fee. On October 8, 2026 we ran the same 20 current-events and factual questions three times through Claude Haiku 5.5 and Claude Opus 5.5 at `low` effort: once with Claude’s web search tool (`web_search_20260209`, which runs dynamic filtering by default), once with Parallel Fast as a client tool using the code below, and once with Parallel Advanced. On Haiku we also ran the basic `web_search_20250305` tool. Costs come from each response’s `usage` at list prices, thinking tokens included.

| Per 1,000 questions | Claude web search | Parallel Fast | Parallel Advanced |
| --- | --- | --- | --- |
| Haiku 5.5, total cost | $15.58 (basic tool: $11.57) | $1.57 | $5.63 |
| Haiku 5.5, input tokens per question | 23,053 (basic: 13,749) | 3,924 | 4,730 |
| Opus 5.5, total cost | $98.38 | $22.01 | $28.11 |
| Opus 5.5, input tokens per question | 19,967 | 4,038 | 4,517 |
| Opus 5.5, median seconds per question | 10.9 | 6.4 | n/a |

Fast came in 90% cheaper than Claude’s tool on Haiku 5.5 and 78% cheaper on Opus 5.5. Advanced, at $5 per 1,000 requests, still saved 64% and 71%. The Advanced column comes from a single run; the others average three. Each Claude search added a median of roughly 13,000 to 20,000 input tokens across runs, against about 2,000 for a Parallel call capped with `max_chars_total=8000`. You set Parallel’s cap per request; Claude’s tool decides how much of its results enter the context.

Two findings cut the other way, and you should know them before you switch. First, freshness: on questions about releases from the previous one or two weeks (Rust 1.99.0, Python 3.14.8), Parallel Fast often returned the prior version, because its cached index hadn’t caught up. Claude’s tool and Parallel Advanced mostly got them right. Route questions that hinge on “latest“, “current“, or “this week” to Advanced, which is still half Claude’s per-search fee. Second, this is a cost test on 20 questions. We read the answers but didn’t grade them formally, so test on your own traffic.

Claude also has its own answer to token bloat. With `web_search_20260209` and later versions, Claude can run **dynamic filtering**: it writes code that filters results before they enter the context window, and Anthropic doesn’t charge for the code execution. Anthropic describes it as reducing tokens on search-heavy requests. On our short factual questions it went the other way: on Haiku 5.5, the dynamic-filtering tool averaged 23,053 input tokens per question against 13,749 for the basic tool, because the filtering step adds turns of its own. Test both on your workload. Dynamic filtering runs on Claude 4.6 and later models on the Claude API; Google Cloud supports only the basic tool, and web search isn’t available on Amazon Bedrock.

### The multi-turn multiplier

Every later turn resends the conversation, search results included. Take an illustrative agent session on Opus 5.5 that runs four searches of about 3,000 tokens each on its first turn, then continues for ten more turns. Those 12,000 tokens get read ten more times: 120,000 extra input tokens. Uncached at $4 per 1M, that’s $0.48 per session. With prompt caching on, the same rereads cost $0.20 per 1M, or $0.024. The fix for search-heavy conversations is to cap results at the source and keep caching on. Trimming old results out of the history later rewrites the cached prefix and forces a fresh cache write, so it saves less than it looks.

You add Parallel as a client tool. Claude still decides when to search, and you decide how much text it gets back:

```python
import os
from parallel import Parallel

parallel = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

def web_search(objective: str, queries: list[str]) -> str:
    """One Parallel search, returned as compact text with source URLs."""
    result = parallel.search(
        mode="fast",              # $1 per 1,000 requests
        objective=objective,
        search_queries=queries,
        max_chars_total=8000,     # caps the tokens your model has to read
    )
    return "\n\n".join(
        f"[{r.title}]({r.url})\n" + "\n".join(r.excerpts) for r in result.results
    )
```

```python
import anthropic
from search_tool import web_search

client = anthropic.Anthropic()

tools = [{
    "name": "web_search",
    "description": "Search the web for current information. Returns excerpts with source URLs.",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "objective": {"type": "string", "description": "What you need to find out"},
            "queries": {"type": "array", "items": {"type": "string"}, "description": "2-3 short keyword queries"},
        },
        "required": ["objective", "queries"],
        "additionalProperties": False,
    },
}]

def call(model, messages, **kwargs):
    return client.messages.create(
        model=model, max_tokens=4096, output_config={"effort": "low"},
        tools=tools, messages=messages, **kwargs,
    )

def ask(question: str, model: str = "claude-opus-5-5") -> str:
    messages = [{"role": "user", "content": question}]
    for _ in range(5):  # hard cap on search rounds
        response = call(model, messages)
        if response.stop_reason != "tool_use":
            break
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": [
            {
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": web_search(**block.input),
            }
            for block in response.content if block.type == "tool_use"
        ]})
    else:  # round cap reached: answer from what's been gathered, with tools off
        response = call(model, messages, tool_choice={"type": "none"})
    return "".join(block.text for block in response.content if block.type == "text")

print(ask("What did the Federal Reserve decide at its most recent meeting?"))
```

Append `response.content` back unchanged, as the loop does, so thinking blocks survive between turns. All tool results for one turn go in a single user message. This is the code behind the measurements above, run against the live Claude API with `anthropic` 1.12. Without the final tools-off call, a question that hits the round cap ends on a tool call and returns an empty answer. Because the tool runs in your code, it works the same on Amazon Bedrock, Google Cloud, and Microsoft Foundry, including where Claude’s built-in search is missing or limited.

If you’d rather keep a single line of config, our [comparison of Claude’s web search and Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) covers when the built-in tool is the better default.

## 2. Cache everything that repeats

Prompt caching is the largest token lever on Claude. A cache read costs 10% of the input price on most models, 5% on Opus 5.5 and Sonnet 5.5 ($0.20 and $0.10), and 2.5% on Fable 5.1 ($0.25 against $10). Writes cost 1.25x input for the five-minute cache and 2x for the one-hour cache, so a five-minute entry pays for itself on its second use.

- Keep the order stable: tools, then the system prompt, then messages. Any byte change in the prefix invalidates everything after it.
- Use top-level automatic caching (`cache_control: {"type": "ephemeral"}` on the request) for the growing conversation, plus an explicit breakpoint on the end of a large static system prompt.
- Watch the minimum cacheable length, which varies by model (512 tokens on recent Opus models, 4,096 on Haiku 4.5). A shorter prefix silently won’t cache.
- Pick the TTL by the gap between requests. Under five minutes apart, the five-minute cache refreshes itself on every hit and is strictly cheaper. Use one hour only when traffic pauses longer, such as an agent waiting on a person.
- Verify with `usage.cache_read_input_tokens`. If it stays at zero on repeated requests, something in your prefix is changing, often a timestamp or unsorted JSON in the system prompt.

## 3. Send background work through the Batch API

The [Message Batches API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) takes 50% off every token, and the discount stacks with caching. Evaluations, enrichment, backfills, and scheduled reports belong there. A batched request can’t wait on your own client-side tools between turns, so the cleanest fit is to search first with Parallel and send one batched request per item with the results inline. Claude’s own web search does run in Batches at the normal $10 per 1,000, but Anthropic throttles batch web searches per organization, so search-heavy batches can take longer.

## 4. Set effort per route

Effort controls how much Claude thinks and how many tokens it spends, and it’s set with `output_config: {"effort": ...}` from `low` to `max`. Opus 5.5 defaults to `medium`; Sonnet 5.5 defaults to `high`. Chat, classification, and lookup routes usually hold quality at `low`. Coding and long agentic tasks repay higher settings. Before building a cascade across models, test the strongest model at a lower effort: one model also means one cache, since caches don’t carry across models.

## 5. Choose the model per task

Claude Haiku 5.5, released October 7, 2026, costs a fortieth of Opus 5.5 per token, and Sonnet 5.5 costs half. Haiku 5.5’s low rate applies to prompts up to 100,000 tokens; above that, input and output cost five times as much, so long-running Haiku agents should cap their context. Judge them on cost per completed task, not cost per request. A cheaper model that needs extra turns or retries can cost more in total. Fast mode on Opus 5.5 runs the same model at up to 2.5x the output speed for twice the price ($8 and $40 per 1M), so keep it for latency-critical paths. US-only inference adds 10% to every token category.

## 6. Keep tool schemas and tool results small

Every tool definition is input on every request. If you connect several MCP servers, schemas can run past 10,000 tokens before the user says anything. Anthropic’s tool search lets you mark rarely used tools `defer_loading: true` so their definitions load only when Claude needs them; below roughly 10,000 schema tokens, the search step costs more than it saves. The same logic applies to results: return the fields Claude needs, not the full API response, and use `max_content_tokens` on web fetch to cap page size.

## How the levers stack

| Lever | What it cuts | Size of the cut | When it applies |
| --- | --- | --- | --- |
| Parallel Fast in place of web search | Search fees and result tokens | 90% (Haiku 5.5) and 78% (Opus 5.5) of total cost in our test | Any agent that searches; send freshness-critical questions to Advanced |
| Excerpt cap (max_chars_total) | Result tokens, every turn they stay in context | ~40% in our run | Opus and Fable, long conversations |
| Dynamic filtering (if staying on Claude’s tool) | Result tokens on search-heavy requests | Workload-dependent; raised tokens in our short-question test | Claude API, 4.6+ models |
| Prompt caching | Repeated input | 90% to 97.5% on cache reads | Stable prefixes, multi-turn agents |
| Message Batches | All tokens | 50%, stacks with caching | Nobody is waiting on the response |
| Lower effort | Thinking and output tokens | Workload-dependent | Simple routes |
| Smaller model | All tokens | 40x from Opus 5.5 to Haiku 5.5 (prompts up to 100K) | Routine traffic that holds quality |

## Get started

Create a key at [platform.parallel.ai](https://platform.parallel.ai). You get $5 in free credits every month, applied automatically, which covers up to 5,000 Fast or Turbo searches. Swap the tool in the code above, replay a sample of real conversations through both setups, and compare cost per completed task. For the same exercise on OpenAI, see [how to save money on OpenAI inference](https://parallel.ai/articles/how-to-save-money-on-openai-api).

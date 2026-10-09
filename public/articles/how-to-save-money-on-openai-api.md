# How to save money on OpenAI inference in 2026

If your OpenAI agents search the web, the built-in web search tool is often the biggest line on the bill, ahead of the tokens. This guide covers where an OpenAI bill comes from, how much switching to Parallel Search saves at $1 per 1,000 calls, and the other levers that stack with it: prompt caching, Batch and Flex, model routing, reasoning effort, and context limits.

On a cheap model, OpenAI’s web search fee costs more than the model. When Artificial Analysis added OpenAI Web Search to its [Search Index](https://artificialanalysis.ai/agents/search-api) (data as of September 28, 2026), it measured $40.19 in search fees and $9.40 in model tokens per 1,000 benchmark tasks with a GPT-5.6 Luna agent. That’s 81% of the bill going to search, at roughly four $0.01 search calls per task.

Most of this guide covers levers that apply to any OpenAI workload. We start with search because it’s where we see the largest single saving, and it’s what we sell, so we’ve been specific about where the numbers come from and where they stop.

## Where an OpenAI bill comes from

OpenAI bills each request on four lines: uncached input tokens, cached input tokens, output tokens (reasoning tokens bill as output), and built-in tool fees. The table shows the current GPT-6 rates from OpenAI’s [pricing page](https://developers.openai.com/api/docs/pricing), per 1M tokens, for prompts up to 272K tokens.

| Model | Input | Cached input | Cache writes | Output |
| --- | --- | --- | --- | --- |
| gpt-6-astra | $10.00 | $1.00 | $12.50 | $50.00 |
| gpt-6-sol | $2.00 | $0.20 | $2.50 | $10.00 |
| gpt-6.1-sol | $2.00 | $0.10 | $2.50 | $10.00 |
| gpt-6-luna | $0.10 | $0.01 | $0.125 | $0.50 |

The web search tool adds two charges of its own. The current `web_search` tool costs $10 per 1,000 calls on every model, plus “search content tokens billed at model rates,” meaning the pages it retrieves land in your input bill. On gpt-4o-mini and gpt-4.1-mini, OpenAI bills those content tokens as a fixed block of 8,000 input tokens per call. The legacy `web_search_preview` tool charges $25 per 1,000 calls on non-reasoning models with content tokens free.

Two details make the search line hard to predict. The model decides how many searches to run, so one request can produce several billable calls. And you get coarse control over how much content comes back: `search_context_size` takes `low`, `medium`, or `high`, and OpenAI’s [web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) says the setting “does not set an exact token count.” The newer `return_token_budget` accepts only `default` or `unlimited`.

## 1. Replace the built-in web search tool with Parallel Search

Parallel’s [Search API](https://docs.parallel.ai/search/modes) costs $1 per 1,000 requests in Turbo (~200ms) and Fast (~700ms) modes, with 10 results and their excerpts included. Basic and Advanced cost $5 per 1,000. There’s no token surcharge from us; you pay your model for whatever excerpt text you pass it, and you set that amount.

On the fee line alone, the switch is a 90% cut: $10 per 1,000 calls becomes $1. At one million searches a month, that’s $10,000 against $1,000. The bigger difference turned up when we measured what each search puts into the model’s context.

### What we measured

On October 8, 2026 we ran the same 20 current-events and factual questions through GPT-6 Luna and GPT-6 Sol three times each, once with OpenAI’s built-in `web_search` tool at default settings and once with Parallel Fast as a function tool, using the code below. We costed every request from its `usage` object at list prices, reasoning tokens included, and estimated injected search tokens by subtracting a no-tool baseline run of the same prompt.

| Per 1,000 questions | GPT-6 Luna, built-in search | GPT-6 Luna, Parallel Fast | GPT-6 Sol, built-in search | GPT-6 Sol, Parallel Fast |
| --- | --- | --- | --- | --- |
| Searches per question | 1.08 | 1.32 | 1.18 | 1.77 |
| Input tokens per question | 10,607 | 3,322 | 12,670 | 4,740 |
| Total cost, search fees and tokens | $11.61 | $1.67 | $31.67 | $10.35 |
| Saving |  | 86% |  | 67% |
| Total cost with Parallel Advanced instead (one run) |  | $7.45 |  | $15.81 |

Each built-in search added a median of about 8,600 input tokens on Luna and 9,700 to 10,600 on Sol, against roughly 2,000 for a Parallel call capped with `max_chars_total=8000`. On Luna the fee was most of the bill; on Sol the injected tokens were. The models made more searches with Parallel and still spent less, and median time per question was similar in both setups (about 5 to 8 seconds).

The answers matched on most questions, and we didn’t run a formal accuracy grade, so read this as a cost measurement. The misses that did show up were about freshness. On questions about releases from the previous week or two, such as Rust 1.99.0, Parallel Fast often surfaced the prior version because its cached index hadn’t caught up, and Luna with Fast cited an older Rust release in all three runs. In a spot check, Parallel Advanced returned the current version for all three recent-release questions we tried, and the Advanced run above still cost 36% less than built-in search on Luna and 50% less on Sol. Send questions that hinge on “latest“, “current“, or “this week” to Advanced. Twenty questions is a small sample, so run your own traffic before you switch.

Our per-call payload measurement from October 7, on the same questions, tokenized with OpenAI’s o200k tokenizer:

| Parallel configuration | Median tokens per call | Median latency (one Mac) |
| --- | --- | --- |
| Fast, default settings | 3,532 | 0.93s |
| Fast, max_chars_total=8000 | 2,091 | 0.81s |
| Turbo, default settings | 3,929 | 0.46s |
| Advanced, default settings | 3,555 | 3.75s |

The independent data is consistent on fees but more mixed on totals. Artificial Analysis’s [Search Index](https://artificialanalysis.ai/agents/search-api) recorded $8.41 in search cost per 1,000 tasks for Parallel Fast (September 8 data, score 73) against $40.19 for OpenAI Web Search (September 28 data, score 74), both with a GPT-5.6 Luna agent. On that board, OpenAI’s tool used about 40,000 input tokens per task, fewer than any external API in AA’s harness, which passes page text through its own fetch step. Parallel Advanced costs more per task than OpenAI’s tool there ($47.93 in search fees per 1,000 tasks), so the savings come from Fast and Turbo. Use Advanced where its extra depth earns the price, such as multi-hop background research.

You wire Parallel in as a function tool. The model still decides when to search; your code makes the call:

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
import json
from openai import OpenAI
from search_tool import web_search

client = OpenAI()

tools = [{
    "type": "function",
    "name": "web_search",
    "description": "Search the web for current information. Returns excerpts with source URLs.",
    "strict": True,
    "parameters": {
        "type": "object",
        "properties": {
            "objective": {"type": "string", "description": "What you need to find out"},
            "queries": {"type": "array", "items": {"type": "string"}, "description": "2-3 short keyword queries"},
        },
        "required": ["objective", "queries"],
        "additionalProperties": False,
    },
}]

def ask(question: str, model: str = "gpt-6-sol") -> str:
    history = [{"role": "user", "content": question}]
    for _ in range(5):  # hard cap on search rounds
        response = client.responses.create(model=model, input=history, tools=tools)
        calls = [item for item in response.output if item.type == "function_call"]
        if not calls:
            return response.output_text
        history += response.output
        for call in calls:
            args = json.loads(call.arguments)
            history.append({
                "type": "function_call_output",
                "call_id": call.call_id,
                "output": web_search(args["objective"], args["queries"]),
            })
    # Round cap reached: answer from what's been gathered, with tools off
    response = client.responses.create(model=model, input=history, tools=tools, tool_choice="none")
    return response.output_text

print(ask("What did the Federal Reserve decide at its most recent meeting?"))
```

The loop cap is a cost control in its own right: with the built-in tool, only the model decides how many searches to run. This is the code behind the measurements above, run against the live OpenAI API with `openai` 3.26. Without the final no-tools call, a question that hits the round cap returns an empty answer; we hit that once before adding it. For a full before-and-after migration, see [how to switch from OpenAI web search to Parallel](https://parallel.ai/articles/openai-to-parallel-search-api).

## 2. Search before the model call when you know you’ll need it

A tool loop costs more than its searches. Each round resends the conversation so far, so a task with three search rounds pays for the original prompt at least four times. When the question always needs fresh data, such as a support bot answering about order status or a daily news brief, search first and make one model call with the results inline.

```python
from openai import OpenAI
from search_tool import web_search

client = OpenAI()

question = "What is the latest stable Python release, and when did it ship?"
sources = web_search(question, ["latest Python release", "Python release date"])

response = client.responses.create(
    model="gpt-6-luna",
    service_tier="flex",  # Batch-rate pricing; slower, occasionally unavailable
    instructions="Answer only from the sources provided. Cite URLs.",
    input=f"Sources:\n{sources}\n\nQuestion: {question}",
)
print(response.output_text)
```

A request with no tools also fits the cheaper processing tiers in the next section, which a multi-turn tool loop can’t use as easily.

## 3. Run background work on Batch or Flex

OpenAI’s [Batch API](https://developers.openai.com/api/docs/guides/batch) halves every token price in exchange for asynchronous completion within 24 hours. [Flex processing](https://developers.openai.com/api/docs/guides/flex-processing) charges the same Batch rates on ordinary Responses or Chat Completions calls when you set `service_tier="flex"`, in exchange for slower responses and occasional resource unavailability. Both apply to the GPT-6 models: Flex and Batch list gpt-6-sol at $1 input and $5 output per 1M tokens.

Evaluations, enrichment jobs, nightly reports, and backfills rarely need a reply in seconds. Moving them off the standard tier is a 50% cut with no change to the prompt. Going the other way, Fast mode (called Priority processing until July 30, 2026) doubles the price, so reserve it for traffic where a person is waiting.

## 4. Get prompt caching to actually hit

GPT-6 bills cached input at 10% of the normal input price, and gpt-6.1-sol at 5%. Caching works on prefixes: OpenAI reuses the longest stable start of your prompt, so anything that changes between requests should come after everything that doesn’t.

- Put the system prompt, tool definitions, and few-shot examples first, and keep them byte-identical across requests. A timestamp at the top of a system prompt silently disables caching for everything after it.
- Put search results, user questions, and other per-request content last.
- Use explicit cache breakpoints when you want to control where the cached prefix ends. OpenAI says that on GPT-6, changing reasoning effort or the tool list mid-conversation no longer breaks the cache.

Cache writes on GPT-6 cost 1.25x the input price ($2.50 per 1M on gpt-6-sol), so a prefix you use once costs slightly more than an uncached one. Caching pays off from the second hit onward. Check `usage.input_tokens_details.cached_tokens` on real traffic rather than assuming it works.

## 5. Route each request to the smallest model that holds quality

GPT-6 Luna costs a twentieth of Sol per token and a hundredth of Astra. Classification, extraction, summarization, and most single-hop lookups don’t need the frontier model. A common pattern is to send routine traffic to Luna, escalate to Sol when a cheap check fails (a schema validation, a confidence score, a judge call), and reserve Astra for the hardest tasks.

Search quality matters more on a small model, because a small model can’t reason its way past weak results. Parallel’s [Fast mode launch](https://parallel.ai/blog/parallel-search-fast) was built around this pairing, and on our [benchmarks](https://parallel.ai/benchmarks) at the low-cost tier (a GPT-5.6 Luna agent, run September 9, 2026), Fast answered 94% of SimpleQA Verified correctly at $2.00 per 1,000 questions, including search and tokens.

## 6. Lower reasoning effort and cap output

Reasoning tokens bill at the output rate, which is five times the input rate on every GPT-6 model. Set `reasoning.effort` per route rather than globally: `low` for lookups and formatting, higher only where measured quality improves. Set `max_output_tokens` so a runaway response can’t produce an unbounded bill, and ask for structured output when you need fields, since JSON with a schema is usually shorter than prose.

## 7. Stay under the long-context threshold

Above 272K input tokens, GPT-6 input and output prices step up: gpt-6-sol goes from $2 to $4 per 1M input tokens and from $10 to $15 output. Agents that append every tool result to an ever-growing history cross that line without anyone deciding to. Cap what each tool returns, summarize old turns, and start a fresh context for a new subtask. Search excerpts sized with `max_chars_total` keep a long-running agent from hitting the threshold on search alone.

## How the levers stack

| Lever | What it cuts | Size of the cut | When it applies |
| --- | --- | --- | --- |
| Parallel Fast in place of web_search | Search fees and injected tokens | 86% (Luna) and 67% (Sol) of total cost in our test | Any agent that searches; send freshness-critical questions to Advanced |
| Excerpt cap (max_chars_total) | Search content tokens | ~40% in our run (3,532 to 2,091 tokens per call) | Expensive models, long loops |
| Search before the model call | Repeated context per tool round | Depends on rounds removed | Questions that always need fresh data |
| Batch or Flex | All tokens | 50% | Nobody is waiting on the response |
| Prompt caching | Repeated input | 90% on cached tokens (95% on gpt-6.1-sol) | Stable prefixes reused within the cache window |
| Smaller model | All tokens | 20x from Sol to Luna | Routine traffic that holds quality |
| Lower effort, output caps | Reasoning and output tokens | Workload-dependent | Simple routes |

The search swap and the token levers multiply rather than overlap: the fee cut applies per call, and caching, Batch, and routing apply to whatever tokens remain.

## Get started

Create a key at [platform.parallel.ai](https://platform.parallel.ai). You get $5 in free credits every month, applied automatically, which covers up to 5,000 Fast or Turbo searches. Swap the tool in the code above, run a few hundred of your own queries through both setups, and compare cost per completed task, not cost per call. For the Anthropic side of the same question, see [how to save money on the Claude API](https://parallel.ai/articles/how-to-save-money-on-claude-api).

# How to build an agent harness with Parallel Search

An agent harness is the code that turns a model into a working agent, and a production-shaped one for web research fits in about 300 lines of Python. This guide covers the tool loop and its stop conditions, Parallel-backed search and fetch tools, context and cost budgets, and the retry, citation, tracing, and eval code you need to tune it.

We’ll build a research agent that answers from the live web, cites every claim, and stops when it runs out of steps or money. Claude Opus 5.5 drives it through Messages API tool use, with two tools: `web_search` calls the Parallel [Search API](https://docs.parallel.ai/search/search-quickstart) and `web_fetch` calls the [Extract API](https://docs.parallel.ai/extract/extract-quickstart).

The harness is everything around the model: the loop that runs tools, the rules for what enters the context window, and the checks that decide when a run is finished. [What is an agent harness?](https://parallel.ai/articles/what-is-an-agent-harness) covers the concept; this guide builds one.

## What the harness contains

Each piece gets its own section below; the snippets are excerpts from the full script.

| Piece | Job | Prevents |
| --- | --- | --- |
| Loop and stop conditions | Call the model, run tools, stop | Runaway loops |
| Tool dispatch | Route calls, return results or errors | Crashed runs |
| Context budget | Cap excerpts, clear stale results | Context bloat |
| Cost ledger | Track spend against a cap | Surprise bills |
| Retries | Retry transient failures | Flaky calls killing runs |
| Citations | Check the answer cites real sources | Unsupported claims |
| Traces and evals | Log steps, score fixed questions | Tuning by feel |

You need Python 3.10+, `pip install "anthropic>=1.0" requests`, an `ANTHROPIC_API_KEY`, and a `PARALLEL_API_KEY` from [platform.parallel.ai](https://platform.parallel.ai).

## The loop and its stop conditions

The loop calls Claude, runs the tools it asks for, returns the results, and repeats until the model answers or a budget runs out. Every exit sets an explicit status.

```python
def run(question, client, ledger, trace):
    tools = Tools(ledger, trace, session_id=f"harness-{trace.run_id}")
    messages = [{"role": "user", "content": question}]
    status, answer, nudged = "step_limit", "", False

    while ledger.steps < ledger.max_steps:
        if ledger.usd >= ledger.max_usd:
            status = "budget"
            break
        ledger.steps += 1
        resp = client.beta.messages.create(
            model="claude-opus-5-5", max_tokens=16000, system=SYSTEM,
            tools=TOOLS, messages=messages, output_config={"effort": "medium"},
            context_management=CONTEXT_MANAGEMENT, fallbacks="default",
            betas=["context-management-2025-06-27", "server-side-fallback-2026-07-01"],
        )
        ledger.charge_llm(resp.usage)
        trace.log("model", step=ledger.steps, stop=resp.stop_reason, usd=round(ledger.usd, 4))
        messages.append({"role": "assistant", "content": resp.content})  # append-only

        if resp.stop_reason in ("refusal", "max_tokens"):
            status = resp.stop_reason
            break
        calls = [b for b in resp.content if b.type == "tool_use"]
        if calls:
            results = [tools.dispatch(b) for b in calls]
            if ledger.steps == ledger.max_steps - 1:
                results.append({"type": "text", "text": "One step left: answer now, with citations."})
            messages.append({"role": "user", "content": results})
            continue

        answer = "".join(b.text for b in resp.content if b.type == "text")
        ok, unknown = check_citations(answer, tools.sources)
        if (ok and not unknown) or nudged:
            status = "done" if ok and not unknown else "uncited"
            break
        nudged = True
        messages.append({"role": "user", "content":
            f"Your answer cites unknown IDs {sorted(unknown)} or none. Cite only {sorted(tools.sources)}."})
    return {"status": status, "answer": answer, "usd": round(ledger.usd, 4), "steps": ledger.steps}
```

A run ends as `done`, `uncited`, `step_limit`, `budget`, `refusal`, or `max_tokens`, and your eval should count each.

On Claude Opus 5.5, thinking is always on and effort defaults to `medium`, so we set effort explicitly and tune it later. Forced `tool_choice` returns a 400 on this model, so the system prompt steers tool use. The history stays append-only: we append `resp.content` unchanged and never rewrite a turn, which keeps thinking blocks valid and the cache warm. `fallbacks="default"` retries a declined request on a fallback model.

## Tool definitions and dispatch

Each tool is a JSON Schema with `strict: true`, so Claude’s arguments always match it. The description is where you steer behavior, including when a search is worth more money.

```python
TOOLS = [{
    "name": "web_search",
    "description": ("Search the web. Returns ranked results with source IDs like [S3] and "
                    "query-relevant excerpts. Use mode 'fast' by default. Use 'advanced' only "
                    "for hard multi-hop questions where fast results were insufficient."),
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "objective": {"type": "string"},
            "search_queries": {"type": "array", "items": {"type": "string"}},
            "mode": {"type": "string", "enum": ["fast", "advanced"]},
        },
        "required": ["objective", "search_queries", "mode"],
        "additionalProperties": False,
    },
}]  # web_fetch has the same shape, with "urls" and "objective"
```

Dispatch turns each `tool_use` block into a `tool_result` and never raises. An unknown tool, bad argument, or failed API call returns with `is_error: true`, so Claude can correct course next turn. Simultaneous calls all go back in one user message.

```python
def dispatch(self, block):
    fn = {"web_search": self.web_search, "web_fetch": self.web_fetch}.get(block.name)
    try:
        if fn is None:
            raise ToolError(f"unknown tool {block.name!r}; use web_search or web_fetch")
        content, is_error = fn(**block.input), False
    except (ToolError, TypeError, KeyError) as e:
        content, is_error = f"Error: {e}", True
    self.trace.log("tool", name=block.name, input=block.input, error=is_error, chars=len(content))
    return {"type": "tool_result", "tool_use_id": block.id, "content": content, "is_error": is_error}
```

### Choosing a search mode

Always set `mode`, because the Search API defaults to `advanced` when it’s missing. Parallel’s [mode docs](https://docs.parallel.ai/search/modes) list `fast` at about 700ms and $1 per 1,000 requests as the recommended default for most agents, and `advanced` at about 3 seconds and $5 per 1,000 for multi-hop work. This harness defaults to `fast` and caps `advanced` at two calls per run. [Fast vs. Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo) covers when `turbo` or `basic` fits better.

## Context budgeting

Cap what each tool call returns, then let the API clear results the model has used. Search takes `max_chars_total`, plus `max_results` and `excerpt_settings.max_chars_per_result` under `advanced_settings`; Extract takes the same character caps.

```python
data = parallel_post("/search", {
    "objective": objective, "search_queries": search_queries[:3], "mode": mode,
    "max_chars_total": 6000,
    "advanced_settings": {"max_results": 6, "excerpt_settings": {"max_chars_per_result": 1500}},
    "session_id": self.session_id, "client_model": "claude-opus-5-5",
}, timeout=30 if mode == "advanced" else 15)
```

We ran this live in `fast` mode for “When did the Hubble Space Telescope launch?” One call returned six results, 2,441 excerpt characters in total, in 714ms. Trimmed:

```json
{
  "search_id": "search_1deba64322691443cf64f0ff0e33c3be",
  "results": [
    {"url": "https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/deployment",
     "title": "Deployment - NASA Science",
     "excerpts": ["Launched on April 24, 1990 aboard Space Shuttle Discovery, NASA's Hubble Space Telescope ..."]}
  ],
  "usage": [{"name": "sku_search", "count": 1}],
  "session_id": "harness-test"
}
```

The second layer is server-side context editing: past 40,000 input tokens, the API clears the oldest tool results and keeps the four newest.

```python
CONTEXT_MANAGEMENT = {"edits": [{
    "type": "clear_tool_uses_20250919",
    "trigger": {"type": "input_tokens", "value": 40000},
    "keep": {"type": "tool_uses", "value": 4},
    "clear_at_least": {"type": "input_tokens", "value": 8000},
}]}
```

Don’t truncate old tool results in your own `messages` list. Anthropic’s [context editing docs](https://platform.claude.com/docs/en/build-with-claude/context-editing) say server-side context management never invalidates thinking blocks on Claude Opus 5.5, while client-side edits to earlier turns can, and for accounts created on or after August 31, 2026, the API rejects a request that replays an invalidated block. Each clear resets the prompt cache, so `clear_at_least` makes every clear worth it.

## Step and cost budgets

A per-run ledger records every charge and checks each paid call against the cap. Parallel calls are priced per request at list price; Claude calls are priced from each response’s `usage`.

```python
SEARCH_PRICE = {"fast": 0.001, "advanced": 0.005}  # USD per request
EXTRACT_PRICE_PER_URL = 0.001
LLM_PRICE = {"input": 4.00, "cache_write": 5.00, "cache_read": 0.20, "output": 20.00}  # per MTok

class Ledger:
    def __init__(self, max_usd=0.50, max_steps=12, max_advanced=2):
        self.max_usd, self.max_steps, self.max_advanced = max_usd, max_steps, max_advanced
        self.usd, self.steps, self.advanced_calls, self.lines = 0.0, 0, 0, []

    def charge(self, item, usd):
        self.usd += usd
        self.lines.append((item, round(usd, 6)))

    def charge_llm(self, u):
        self.charge("claude", (u.input_tokens * LLM_PRICE["input"]
            + (u.cache_creation_input_tokens or 0) * LLM_PRICE["cache_write"]
            + (u.cache_read_input_tokens or 0) * LLM_PRICE["cache_read"]
            + u.output_tokens * LLM_PRICE["output"]) / 1e6)

    def can_spend(self, usd, reserve=0.2):  # tools get 80%; the answer keeps 20%
        return self.usd + usd <= self.max_usd * (1 - reserve)
```

When a search would cross 80% of the cap, the tool returns a “budget exhausted” error and the model answers from what it has. The prices come from Parallel’s [pricing docs](https://docs.parallel.ai/getting-started/pricing) ($1 per 1,000 Extract URLs) and Anthropic’s [pricing page](https://platform.claude.com/docs/en/about-claude/pricing) ($4 input and $20 output per million tokens for Opus 5.5). Tokens usually dominate: one Opus 5.5 step reading 10,000 input tokens costs $0.04, the same as 40 `fast` searches. The ledger charges every requested Extract URL, so it errs slightly high when one fails.

## Retries, timeouts, and error surfacing

Retry what a second attempt can fix and report everything else to the model. Rate limits (429) and 5xx errors get exponential backoff; other 4xx errors fail at once, because resending a malformed request won’t help.

```python
def parallel_post(path, body, timeout, attempts=3):
    headers = {"x-api-key": os.environ["PARALLEL_API_KEY"]}
    for i in range(attempts):
        try:
            r = requests.post(f"https://api.parallel.ai/v1{path}", json=body,
                              headers=headers, timeout=timeout)
        except (requests.Timeout, requests.ConnectionError) as e:
            err = f"network error: {type(e).__name__}"
        else:
            if r.status_code == 200:
                return r.json()
            err = f"HTTP {r.status_code}: {r.text[:300]}"
            if r.status_code not in (429, 500, 502, 503, 504):
                raise ToolError(err)
        time.sleep(2 ** i)
    raise ToolError(f"gave up after {attempts} attempts; last error {err}")
```

Extract reports failures per URL in an `errors` array, which the harness turns into lines like `FAILED https://example.invalid/nope: connect_error` so the model picks another source. The Anthropic SDK already retries connection errors, 408, 409, 429, and 5xx; we set `max_retries=3`. Parallel lists 600 requests per minute for Search and for Extract.

## Citations

Every result gets a stable source ID, and the harness keeps its own map from ID to URL and excerpt. After the API clears an old result, the harness still knows what `[S2]` pointed to.

```python
def _cite(self, url, title, excerpts):
    sid = self.by_url.get(url)
    if sid is None:
        sid = f"S{len(self.sources) + 1}"
        self.by_url[url] = sid
        self.sources[sid] = {"url": url, "title": title, "excerpt": ""}
    src = self.sources[sid]
    src["excerpt"] = (src["excerpt"] + "\n" + "\n".join(excerpts)).strip()[:2000]
    return f"[{sid}] {title or url}\n{url}\n" + "\n".join(excerpts)

def check_citations(text, sources):
    cited = set(re.findall(r"\[(S\d+)\]", text))
    return cited & sources.keys(), cited - sources.keys()
```

The system prompt requires a source ID on every factual sentence. If an answer cites nothing, or cites an ID no tool returned, the loop appends one correction. A second miss ends the run as `uncited`, so a bad answer never counts as `done`. The run returns the cited URLs with the answer, ready to render as footnotes.

## Logging and traces

The `Trace` class appends one JSON line per model or tool call, tagged with a run ID. With `grep` and `jq` you can see which query found nothing, which step blew the budget, and how long each call took. A tool line from our test run:

```json
{"run": "fbfd4db69501", "event": "tool", "name": "web_search", "input": {"objective": "When did Hubble launch?", "search_queries": ["Hubble launch date", "STS-31 Hubble"], "mode": "fast"}, "error": false, "ms": 609, "chars": 3306}
```

Keep field names stable so eval scripts can still read old traces after you ship them to a log store.

## A 10-question eval loop

Ten questions with known answers catch regressions when you change effort, mode caps, or excerpt limits.

```python
EVAL = [
    ("What mode does the Parallel Search API use when mode is omitted?", "advanced"),
    ("How many URLs can one Parallel Extract API request take?", "20"),
    ("In what year was the Hubble Space Telescope launched?", "1990"),
    # ...seven more
]

def norm(s):
    return re.sub(r"[^a-z0-9.\-]", "", s.lower())

def judge(client, question, expected, answer):  # for answers exact match can't grade
    r = client.messages.create(model="claude-sonnet-5-5", max_tokens=1000,
        output_config={"effort": "low"}, messages=[{"role": "user", "content":
        f"Question: {question}\nReference: {expected}\nCandidate: {answer}\n"
        "Reply with exactly CORRECT or INCORRECT."}])
    return "INCORRECT" not in "".join(b.text for b in r.content if b.type == "text")

def run_eval(client, use_judge=False):
    rows = []
    for q, expected in EVAL:
        res = run(q, client, Ledger(max_usd=0.25, max_steps=8), Trace())
        hit = norm(expected) in norm(res["answer"]) or (use_judge and judge(client, q, expected, res["answer"]))
        rows.append((hit, res["usd"], res["steps"], res["status"] == "done"))
    n = len(rows)
    print(f"accuracy {sum(r[0] for r in rows)}/{n}  $/question {sum(r[1] for r in rows)/n:.4f}  "
          f"steps {sum(r[2] for r in rows)/n:.1f}  done {sum(r[3] for r in rows)}/{n}")
```

Exact match grades short answers for free; the judge, on Claude Sonnet 5.5 at low effort, catches correct answers phrased differently. Swap our samples for questions from your own traffic, including a few multi-hop ones that test the `advanced` cap. [How we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) covers building a question set that doesn’t flatter your system.

## Test the harness without spending tokens

You can exercise every code path without a model key. We pointed the real Anthropic SDK at a local HTTP server that replays scripted `tool_use` responses while the Parallel calls ran live: a fast search, then an `advanced` search, a fetch with one dead link, and a nonexistent tool in one turn, then an answer citing a bogus `[S99]`, then a correct one. The test asserts the history only grows, the bogus tool returns `is_error`, the citation correction fires, and the run ends `done`. It took about 12 seconds and under a cent, so it fits in CI.

## The MCP alternative

You can skip the tool code by connecting Claude to the [Parallel Search MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp), which exposes `web_search` and `web_fetch`. With the Anthropic MCP connector, Anthropic’s servers make the MCP calls:

```python
response = client.beta.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    betas=["mcp-client-2025-11-20"],
    mcp_servers=[{
        "type": "url",
        "url": "https://search.parallel.ai/mcp",
        "name": "parallel-search",
        "authorization_token": os.environ["PARALLEL_API_KEY"],  # optional
    }],
    tools=[{"type": "mcp_toolset", "mcp_server_name": "parallel-search"}],
    messages=[{"role": "user", "content": "When did Hubble launch? Cite sources."}],
)
```

In the Claude Agent SDK, the server is one `mcp_servers` entry:

```python
options = ClaudeAgentOptions(
    model="claude-opus-5-5",
    mcp_servers={"parallel-search": {"type": "http", "url": "https://search.parallel.ai/mcp"}},
    allowed_tools=["mcp__parallel-search__*"],
)
```

The Search MCP is free without a key at lower rate limits; anonymous calls run in `fast` mode with excerpts capped around 25,000 characters per call. A Bearer key raises limits and lets you pin the mode. Prefer MCP for prototypes and Agent SDK agents, where the harness already exists. Prefer the direct API when you need per-call mode choice, your own excerpt caps, a ledger that sees every request, or citation IDs you control. [What is MCP?](https://parallel.ai/articles/what-is-mcp) explains the protocol, and [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers deployment.

## Get started

Create a key at [platform.parallel.ai](https://platform.parallel.ai), which includes $5 in free credits every month (up to 5,000 Turbo or Fast searches). The [Search](https://docs.parallel.ai/search/search-quickstart) and [Extract](https://docs.parallel.ai/extract/extract-quickstart) quickstarts document every parameter used here, and `https://search.parallel.ai/mcp` works in any MCP client with no account.

## Frequently asked questions

### What is an agent harness?

An agent harness is the software around a model that runs its tool loop, manages its context, and decides when it’s done. [What is an agent harness?](https://parallel.ai/articles/what-is-an-agent-harness) covers the concept in depth.

### How do I add web search to a Claude agent?

Define a `web_search` tool, call the Parallel Search API when Claude returns a matching `tool_use` block, and send the excerpts back as a `tool_result`. Or connect the Parallel Search MCP server and skip the tool code.

### Which Parallel Search mode should an agent harness use?

Start with `fast`, which Parallel’s docs recommend for most agents at about 700ms and $1 per 1,000 requests. Allow `advanced` for hard multi-hop questions and cap how often the model can call it.

### Should I truncate old tool results myself?

Not on Claude Opus 5.5. Use server-side context editing (`clear_tool_uses_20250919`), which Anthropic’s docs say never invalidates thinking blocks; editing earlier turns yourself can.

### How much does one agent run cost?

Mostly model tokens. A `fast` search costs $0.001 and an `advanced` search $0.005, while one Opus 5.5 step with 10,000 input tokens costs $0.04 at list price.

### Can I get an agent harness without writing the loop?

Yes. The Anthropic SDK’s Tool Runner loops over tools you define, the Claude Agent SDK ships a full harness, and Claude Managed Agents hosts the loop and a sandbox. Each trades away some control over budgets and context.

**Related reading: **[What is an agent harness?](https://parallel.ai/articles/what-is-an-agent-harness) · [Fast vs. Turbo: choosing a Parallel Search mode](https://parallel.ai/articles/parallel-search-fast-vs-turbo) · [How we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) · [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers)

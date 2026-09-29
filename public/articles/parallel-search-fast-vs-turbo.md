# Fast vs. Turbo: choosing a Parallel Search mode for agent loops

Parallel Search Fast versus Turbo is a choice between roughly 700ms and 200ms per call at the same $1 per 1,000 requests, and the right pick depends on how many searches your agent makes and how hard its questions are. This guide covers the four Search modes, the current benchmark evidence, the latency math for loops of 1 to 15 calls, and how to set the mode in the API, CLI, and MCP.

Turbo and Fast cost exactly the same, $1 per 1,000 requests with 10 results included, so the decision comes down to about 500ms per call against accuracy on harder questions. That trade compounds inside an agent loop: an agent that searches 15 times pays the latency gap 15 times, and a wrong answer on a multi-hop question costs more than the seconds you saved. Our [roundup of fast search APIs](https://parallel.ai/articles/best-fast-search-apis) compares vendors against each other. This guide stays inside Parallel and helps you pick a mode per workload, and per call.

## The four Parallel Search modes

Parallel Search has four modes, ordered by latency: Turbo (~200ms), Fast (~700ms), Basic (~1s), and Advanced (~3s). Our [Search modes docs](https://docs.parallel.ai/search/modes) recommend starting with Fast, and a request with no `mode` set runs in Advanced.

| Mode | Documented latency | Price per 1,000 requests | Best for (per the docs) | Constraints |
| --- | --- | --- | --- | --- |
| Turbo | ~200ms | $1 | Voice, chat, web search tools, RAG pre-filtering, high-volume lookups | English and Japanese queries only; no domain/path prefixes in source policy |
| Fast | ~700ms | $1 | Most agents: interactive assistants and tool-calling loops | Recommended starting point |
| Basic | ~1s | $5 | Longer excerpts per source in a single call; works best with 2 or 3 search_queries | None beyond the defaults |
| Advanced | ~3s | $5 | Multi-hop background agents, code review agents, deep research | API default when mode is unset |

Turbo currently supports English and Japanese queries. For broader multilingual coverage, the docs point to Basic or Advanced. Turbo also ignores path-level source filtering: the docs say domain/path prefixes in `include_domains` and `exclude_domains` require Fast, Basic, or Advanced.

We don’t publish much about the internals. The docs describe Turbo as the lowest-latency, lowest-cost mode “built to ground every call,” Fast as “high-quality search with sub-second latency,” and Advanced as using “a more advanced retrieval and compression pipeline.” The [Turbo launch post](https://parallel.ai/blog/parallel-search-turbo) (July 2026) frames Turbo around workloads where a user is waiting, such as voice agents and consumer chat, and the [Fast launch post](https://parallel.ai/blog/parallel-search-fast) (August 2026) positions Fast for most agent workflows, support assistants, and factual Q&A. Beyond that, treat the modes as a black box and measure them.

## What the benchmarks say about Fast and Turbo quality

On simple lookups, Fast and Turbo land within a few points of each other; on hard multi-hop questions, Fast pulls clearly ahead. Our [benchmarks](https://parallel.ai/benchmarks) (evals run September 9, 2026) test both modes at the low-cost tier, where a GPT-5.6 Luna agent at low reasoning effort calls the provider’s search tool plus its extract tool where one exists.

| Benchmark (low-cost tier) | Fast | Turbo | Fast cost per 1,000 | Turbo cost per 1,000 |
| --- | --- | --- | --- | --- |
| SimpleQA Verified (100 questions) | 94% | 91% | $2.00 | $2.00 |
| BrowseComp (50 questions) | 44% | 32% | $11.80 | $13.20 |
| WideSearch (100 tasks, partial credit) | 45.5 | 44.0 | $10.50 | $10.10 |

Cost here covers LLM tokens plus tool calls per 1,000 questions, so it isn’t the search price alone. On BrowseComp, Turbo cost more per question than Fast even though both modes charge the same per request, which means the agent spent more on tokens or extra calls per question. Other providers win some of these rows: at the same tier, Perplexity scored 46% on BrowseComp and Exa Auto scored 53.0 on WideSearch.

Openbenchmarks runs an independent check with its own client and reports mean latency. On its [fastest-search-API board](https://openbenchmarks.com/web-search/fastest-search-api) (last measured September 12, 2026), Parallel Turbo had the lowest mean latency on factual lookup at 348ms (315ms median) but answered 71.3% of the 300 questions correctly from its results; Fast measured 942ms mean at 86.0%, and Exa Instant measured 398ms at 97.7%. On the board’s 100-question developer search set, Turbo averaged 333ms per search with 64.7% task completion and a 19s median task, against Fast’s 953ms, 66.7%, and 22s. On the multi-search company-discovery set, Exa Instant ranked first on time per unit of task quality, ahead of Turbo and Fast.

The [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (data as of September 22, 2026) currently lists Parallel Advanced at 75 and Basic at 73, and doesn’t include Fast or Turbo, so it can’t settle this particular choice.

## The agent-loop math

At documented latencies, Fast adds about 0.5s per sequential call over Turbo, and both cost $0.001 per call. The table below multiplies that out for tasks that make 1, 5, or 15 sequential searches, counting search time only.

| Searches per task | Turbo | Fast | Basic | Advanced |
| --- | --- | --- | --- | --- |
| 1 | 0.2s, $0.001 | 0.7s, $0.001 | 1s, $0.005 | 3s, $0.005 |
| 5 | 1s, $0.005 | 3.5s, $0.005 | 5s, $0.025 | 15s, $0.025 |
| 15 | 3s, $0.015 | 10.5s, $0.015 | 15s, $0.075 | 45s, $0.075 |

At 1,000 tasks of 15 searches each, Turbo and Fast both cost $15 in search fees, and Basic and Advanced both cost $75. The 7.5s gap between Turbo and Fast at 15 calls only shows up if the calls run one after another. When your agent fires several searches in the same turn, they overlap, and the turn waits for the slowest one.

Model time also hides part of the gap. A loop’s wall time is roughly N × (model time per step + search time per step), and model time is often the bigger term. Artificial Analysis shows the scale: its model-only baseline, which runs no searches at all, takes 19.8s per task, and every search provider on its current board lands between 15.1s and 60.4s per task. AA’s methodology note adds that a provider can be fast per call and still add total time if the model searches against it more often. That matches the Openbenchmarks developer set above, where Turbo’s 620ms-per-search advantage over Fast shrank to a 3s gap in median task time.

Escalation changes the cost picture too. A 15-call Fast loop that retries its 3 hardest sub-questions in Advanced costs $0.030 and about 19.5s of search time, against $0.075 and 45s for running every call in Advanced.

## Our own timing run

We ran 20 sequential calls per mode on September 28, 2026 from a single Mac, using the Python SDK (`parallel-web` 1.3.4), 10 short factual questions asked twice, with Turbo and Fast interleaved. Turbo’s median was 396ms (range 336ms to 803ms) and Fast’s was 732ms (range 518ms to 1,552ms). Those numbers include the network round trip and client overhead from one location, so treat them as illustrative. The docs’ ~200ms Turbo figure is a p50 spec, and Openbenchmarks’ figures are means from a different client, so none of the three lines up exactly. Measure from your own region before you set timeouts.

## Decision rules for picking a mode

Pick the mode per call rather than per application. These rules follow the docs’ guidance and the evidence above:

- **Voice agents, realtime chat, and high-QPS single lookups:** Turbo, when queries are in English or Japanese. Our [realtime voice agent walkthrough](https://parallel.ai/blog/gpt-realtime-parallel-turbo) pairs Turbo with GPT-Realtime-2.1 and treats Turbo as a fast grounding step, sending multi-hop questions to a deeper mode.
- **Interactive tool-calling agents:** Fast. It holds up better than Turbo on BrowseComp (44% vs. 32%) at the same per-request price.
- **One call that needs longer excerpts per source:** Basic, with 2 or 3 well-formed `search_queries`.
- **Background multi-hop research:** Advanced, which scored 74% on BrowseComp at the frontier tier of our benchmarks with a GPT-5.6 Sol agent.
- **Loops with a mix of easy and hard steps:** start in Fast and retry the sub-questions that come back thin or contradictory in Advanced.

If you’re wiring these rules into a larger agent, our guide to [building an agent harness with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search) shows where the mode choice sits in the tool layer.

## How to set the mode in the API, CLI, and MCP

Mode is a single parameter in all three surfaces. In the Python SDK, pass `mode` to `client.search`:

```python
import os
import time
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

def search(question: str, mode: str = "fast"):
    start = time.perf_counter()
    result = client.search(
        mode=mode,  # "turbo", "fast", "basic", or "advanced"
        objective=question,
        search_queries=[question],
    )
    elapsed_ms = (time.perf_counter() - start) * 1000
    return result, elapsed_ms

for mode in ("turbo", "fast"):
    result, ms = search("Who is the current CEO of Airbus?", mode=mode)
    top = result.results[0]
    print(f"{mode:5} {ms:5.0f}ms  {len(result.results)} results  top: {top.url}")
```

Our single run from the same Mac printed 532ms for Turbo and 739ms for Fast, each with 10 results. One call is noise, so run it in a loop before drawing conclusions. The SDK calls `POST https://api.parallel.ai/v1/search`, which is the endpoint to use for new code.

The [Parallel CLI](https://docs.parallel.ai/integrations/cli) takes a `--mode` flag. Its default is Basic, so set the mode explicitly:

```bash
parallel-cli search "Who is the current CEO of Airbus?" --mode turbo --json
parallel-cli search "Who is the current CEO of Airbus?" --mode fast --json
```

Use `parallel-cli` 0.9.2 or later. Version 0.8.x treats `--mode fast` as a deprecated Beta alias, prints a warning, and runs the search in Basic at $5 per 1,000 requests; 0.9.3 accepted both modes without a warning in our test.

The free [Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) at `https://search.parallel.ai/mcp` runs anonymous calls in Fast mode with server-managed settings, and it ignores mode overrides from anonymous clients. To pin Turbo, authenticate with a Bearer API key and add `?mode=turbo` to the URL, or send the setting in an `x-parallel-search-config` header. In Codex:

```bash
codex mcp add parallel-search-turbo \
  --url "https://search.parallel.ai/mcp?mode=turbo" \
  --bearer-token-env-var PARALLEL_API_KEY
```

The server validates the mode at the MCP handshake, and an unknown value returns HTTP 400. If you want OAuth instead of a key, use `https://search.parallel.ai/mcp-oauth`.

## Get started

You get $5 in free credits every month, enough for up to 5,000 Turbo or Fast searches. Create a key on [platform.parallel.ai](https://platform.parallel.ai), run the snippet above in both modes against 20 or so of your own queries, and score end-task accuracy alongside latency. If you’d rather not create an account yet, the keyless Search MCP already runs Fast. For a fuller test plan, see [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) and our guide to [benchmarking search APIs on your own queries](https://parallel.ai/articles/how-to-benchmark-web-search-apis).

## Frequently asked questions

### Is Parallel Search Turbo faster than Fast?

Yes. The docs list Turbo at about 200ms and Fast at about 700ms per request, and Openbenchmarks measured means of 348ms and 942ms from its own client in September 2026.

### Do Turbo and Fast cost the same?

Yes. Both cost $1 per 1,000 requests with 10 results included, and each additional 1,000 results costs $1. Basic and Advanced cost $5 per 1,000 requests.

### Is Turbo less accurate than Fast?

On our September 2026 benchmarks with a GPT-5.6 Luna agent, Turbo scored 91% on SimpleQA Verified against Fast’s 94%, and 32% on BrowseComp against 44%. The gap is small on simple lookups and larger on multi-hop questions.

### Which mode does the free Parallel Search MCP use?

Anonymous calls to `https://search.parallel.ai/mcp` run in Fast mode. To use Turbo, authenticate with an API key and add `?mode=turbo` to the server URL.

### Which languages does Parallel Search Turbo support?

Turbo supports English and Japanese queries. For broader multilingual coverage, the docs recommend Basic or Advanced.

### What mode does the Search API use by default?

The API runs Advanced when `mode` is unset. The CLI defaults to Basic, and the docs recommend Fast as the starting point for most agents.

### What is the best search API mode for voice agents?

Turbo, for English or Japanese conversations, because a user is waiting on every call. Keep Fast or Advanced available for follow-ups that need multi-hop retrieval.

**Related reading: **[Best fast search APIs in 2026](https://parallel.ai/articles/best-fast-search-apis) · [Introducing Turbo mode for Parallel Search](https://parallel.ai/blog/parallel-search-turbo) · [Introducing Fast mode for Parallel Search](https://parallel.ai/blog/parallel-search-fast) · [How to build an agent harness with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search)

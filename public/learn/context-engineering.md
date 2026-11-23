# Context engineering

Context engineering is how AI agent builders control what a model sees on every call, from tool definitions to live web search results. This guide covers how it differs from prompt engineering, what goes into an agent’s context, the ways a context window breaks down, and the techniques that keep it lean, including how search results should enter the window.

Context engineering is the practice of deciding which tokens a language model sees on each call: the instructions, tool definitions, retrieved documents, memory, conversation history, and tool results that fill its context window. Anthropic defines it as “the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference.” For an agent that runs dozens of model calls in a loop, that curation happens again on every turn, and it decides more about output quality than the wording of any single prompt.

**Anatomy of an agent's per-turn context window**

```text
┌────────────────── Context Window (per turn) ──────────────────┐
│ [STABLE PREFIX - cacheable]                                   │
│   System Prompt  │  Selected Tool Schemas  │  Active Skills   │
├───────────────────────────────────────────────────────────────┤
│ [DYNAMIC WORKING STATE - curated every turn]                  │
│   Compacted History │ Retrieved Excerpts │ Memory │ Last Call │
└───────────────────────────────────────────────────────────────┘
   Controls: retrieve on demand / compact old turns / isolate
             sub-agents / bound excerpt size
```

## Context engineering vs. prompt engineering

Anthropic calls context engineering “the natural progression of prompt engineering.” Prompt engineering is about writing and organizing instructions. Context engineering covers everything else that lands in the window, and it repeats on every turn of an agent loop instead of happening once.

|  | Prompt engineering | Context engineering |
| --- | --- | --- |
| Unit of work | One prompt or system message | Everything in the context window on each model call |
| When it happens | Written once, revised between versions | Recomputed every turn as the agent runs |
| Main inputs | Instructions, phrasing, few-shot examples | Instructions plus tools, retrieval, memory, history, and tool results |
| Typical failure | Ambiguous or poorly worded instructions | Missing facts, stale results, bloated tool lists, contradictions |
| Main levers | Wording, structure, examples | Selection, compression, ordering, isolation, persistence |
| Who owns it | Whoever writes the prompt | Whoever builds the agent harness |

The two don’t compete. A well-written system prompt is still part of good context, as one input among several.

## What goes into an agent’s context

Each model call in an agent loop assembles its window from the same set of parts. The [agent harness](https://parallel.ai/articles/what-is-an-agent-harness) is the code that decides how much room each part gets.

| Component | What it is | Main context risk |
| --- | --- | --- |
| System instructions | Role, rules, output format, tool guidance | Too vague to steer, or so long it buries the task |
| Tool definitions | Names, descriptions, and JSON schemas for every callable tool | Loaded every turn whether used or not |
| Retrieved documents | Search results, files, database rows pulled in for this task | Full pages where a few passages would do |
| Memory | Notes, preferences, and facts persisted across turns or sessions | Stale or unverified entries read back as truth |
| Conversation history | Prior user and assistant messages | Grows without bound in long sessions |
| Tool results | Output of each call the agent has made | Old results linger long after they’re useful |

Anthropic’s guide sets the target for all of them: “the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.”

## How context fails

A bigger window doesn’t fix bad context. Chroma’s report found that models handle input unevenly as it grows, even on simple retrieval tasks, and Anthropic’s post adopted the name **context rot** for this: “as the number of tokens in the context window increases, the model’s ability to accurately recall information from that context decreases.” It treats context as a finite “attention budget” with diminishing returns.

Breunig’s taxonomy names four specific ways the content goes wrong:

- **Context poisoning:** a hallucination or error enters the context and gets referenced again and again. His example is a Pokémon-playing Gemini agent from the Gemini 2.5 technical report.
- **Context distraction:** the context grows so long that the model over-focuses on it and neglects what it learned in training.
- **Context confusion:** superfluous information, such as irrelevant tools, pulls the response off course.
- **Context clash:** new information or tools conflict with what’s already in the window.

**Tool-schema bloat** is the most common version of confusion in 2026, because every connected tool’s definition rides along on every call. On October 5, 2026, The New Stack [reported](https://thenewstack.io/pi-agent-mcp-codemode/) that when Pi creator Mario Zechner measured browser-automation MCP servers, Chrome DevTools MCP alone took roughly 18,000 tokens, about 9% of a 200,000-token window, “before the agent had done anything useful.” Playwright MCP needed about 13,700 tokens for 21 tools. Anthropic’s [advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use) post gives a larger example: five common MCP servers with 58 tools consumed about 55,000 tokens before the conversation started, and Anthropic says it has seen tool definitions reach 134,000 tokens internally before optimization.

## Context engineering techniques

Most techniques fall into LangChain’s four verbs: write context somewhere outside the window, select what comes back in, compress what stays, and isolate work that would flood the main thread.

### Retrieve context at runtime

Instead of loading everything up front, the agent keeps lightweight references (file paths, URLs, stored queries) and pulls content in with tools when it needs it. Anthropic describes Claude Code working this way: project instruction files load at the start, while glob and grep fetch files on demand. You pay for this in speed, since runtime exploration is slower than reading pre-computed data.

### Compact the history

Compaction summarizes a conversation nearing its limit and restarts with the summary. Anthropic calls it “the first lever in context engineering” for long tasks and warns that “overly aggressive compaction can result in the loss of subtle but critical context.” The lightest form is clearing old tool results. In Anthropic’s announcement, context editing cut token consumption by 84% in a 100-turn web search evaluation.

### Delegate to sub-agents

A sub-agent explores in its own clean window and returns a summary. Anthropic notes that each sub-agent “might explore extensively, using tens of thousands of tokens or more, but returns only a condensed, distilled summary of its work (often 1,000-2,000 tokens).” Cognition’s June 2025 post argues the other side: sub-agents that can’t see each other’s decisions produce inconsistent work, so isolation suits read-heavy research better than parallel writing.

### Load tools on demand

Tool search keeps definitions out of the window until the model asks for them. With Anthropic’s tool search tool, you mark tools `defer_loading: true` and the model searches the catalog when it needs a capability; Anthropic reports an 85% reduction in token usage on its example tool library. [Agent skills](https://parallel.ai/learn/agent-skills) use a related pattern, progressive disclosure, where only a short description loads until the skill is needed.

### Take structured notes and keep memory

The agent writes progress to a file or memory store outside the window and reads it back later. Anthropic’s examples include a to-do list, a `NOTES.md` file, and its file-based memory tool. ACE pushes this further: its curator merges small, itemized updates into the playbook instead of rewriting it, which the authors say prevents “context collapse, where iterative rewriting erodes details over time.”

## Where live web retrieval fits

For research agents, web results are often the largest and least predictable block in the window. A raw page carries navigation, boilerplate, and paragraphs unrelated to the question. The context engineering question for search is how many tokens of evidence you get per token spent.

Agent-oriented search APIs answer that by returning query-relevant excerpts instead of pages. We build one, so weigh this accordingly: Parallel’s [Search API](https://docs.parallel.ai/search/best-practices) “ranks and compresses” results against a natural-language objective and returns dense excerpts, with `max_chars_total` and `max_chars_per_result` settings to cap the size. [Parallel MCP](https://parallel.ai/mcp) exposes the same search free as `web_search`, and signed-in connections can set `max_chars_total` or a maximum result count in the `x-parallel-mcp-config` header so a single search can’t flood an MCP client. Other providers make different trade-offs; our [web search API guide](https://parallel.ai/articles/best-web-search-api) compares them.

You can measure the difference yourself. This script calls Parallel MCP without a key, totals the excerpt characters across ten results, then fetches the top result as full page markdown for comparison. It uses the rough rule of four characters per token.

```python
import json, requests

MCP = "https://mcp.parallel.ai/mcp"  # free, no API key
HEADERS = {"Content-Type": "application/json",
           "Accept": "application/json, text/event-stream",
           "User-Agent": "context-budget-demo/1.0"}

def rpc(method, params, session=None):
    headers = dict(HEADERS, **({"Mcp-Session-Id": session} if session else {}))
    r = requests.post(MCP, headers=headers, timeout=60,
                      json={"jsonrpc": "2.0", "id": 1, "method": method, "params": params})
    r.raise_for_status()
    body = r.text
    if r.headers.get("Content-Type", "").startswith("text/event-stream"):  # Streamable HTTP may answer as SSE
        body = [l[5:] for l in body.splitlines() if l.startswith("data:")][-1]
    return json.loads(body), r.headers.get("Mcp-Session-Id", session)

def tool(name, args, session):
    res, _ = rpc("tools/call", {"name": name, "arguments": args}, session)
    return json.loads(res["result"]["content"][0]["text"])

_, session = rpc("initialize", {"protocolVersion": "2025-06-18", "capabilities": {},
                 "clientInfo": {"name": "demo", "version": "1.0"}})

search = tool("web_search", {
    "objective": "What did Anthropic recommend in its 2025 post on context engineering for AI agents?",
    "search_queries": ["Anthropic effective context engineering", "context engineering compaction sub-agents"],
}, session)
excerpt_chars = sum(len(e) for r in search["results"] for e in r["excerpts"])
print(f"{len(search['results'])} results, excerpts total {excerpt_chars:,} chars (~{excerpt_chars // 4:,} tokens)")

page = tool("web_fetch", {"urls": [search["results"][0]["url"]], "full_content": True}, session)
page_chars = len(page["results"][0]["full_content"])
print(f"1 full page: {page_chars:,} chars (~{page_chars // 4:,} tokens)")
```

We ran it on November 5, 2026. Your numbers will vary by query and run.

```text
10 results, excerpts total 21,051 chars (~5,262 tokens)
1 full page: 23,925 chars (~5,981 tokens)
```

Excerpts from ten sources came in smaller than the single full page for the top result, which was Anthropic’s own context engineering post.

## Frequently asked questions

### What is context engineering in AI?

Context engineering is the practice of choosing and managing everything a language model sees on each call, including instructions, tool definitions, retrieved documents, memory, conversation history, and tool results. Anthropic defines it as curating “the optimal set of tokens” during inference.

### What is the difference between context engineering and prompt engineering?

Prompt engineering focuses on writing and structuring instructions, usually once. Context engineering covers the whole context window and repeats on every turn of an agent loop, deciding what to retrieve, compress, clear, or delegate.

### Who coined the term context engineering?

No single person coined it. Cognition’s Walden Yan used it in a June 12, 2025 post, and Shopify CEO Tobi Lütke (June 19, 2025) and Andrej Karpathy (June 25, 2025) popularized it on X.

### What is agentic context engineering?

Agentic Context Engineering (ACE) is a framework from an October 2025 paper by Zhang et al., published at ICLR 2026, that treats an agent’s context as an evolving playbook. The agent generates, reflects on, and curates strategies through incremental updates, which the authors say avoids brevity bias and context collapse.

### What is context rot?

Context rot is the drop in a model’s ability to use information as its input grows longer, even when the window isn’t full. Chroma documented it across 18 models in July 2025, and Anthropic cites it as the reason to treat context as a finite budget.

### How does web search affect an agent’s context?

Search results are often the largest block in a research agent’s context. Returning query-relevant excerpts instead of full pages keeps more of the window free for reasoning, history, and later turns.

## Get started

Connect [Parallel MCP](https://parallel.ai/mcp) at `https://mcp.parallel.ai/mcp` (no API key needed) and run the script above against your own queries to see what your agent’s search results cost in tokens. For the surrounding loop, read [what an agent harness is](https://parallel.ai/articles/what-is-an-agent-harness) and our walkthrough on [building one with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search).

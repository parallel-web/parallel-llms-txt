# What is context engineering? A guide for AI agent builders

Context engineering is how AI agent builders control what a model sees on every call, from tool definitions to live web search results. This guide covers where the term came from, how it differs from prompt engineering, the ways a context window breaks down, and the techniques that keep it lean, including how search results should enter the window.

Context engineering is the practice of deciding which tokens a language model sees on each call: the instructions, tool definitions, retrieved documents, memory, conversation history, and tool results that fill its context window. Anthropic defines it as “the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference.” For an agent that runs dozens of model calls in a loop, that curation happens again on every turn, and it decides more about output quality than the wording of any single prompt.

## Where the term came from

The phrase had been in use among agent builders before it went mainstream. On June 12, 2025, Walden Yan of Cognition wrote in [Don’t Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents) that context engineering “is effectively the #1 job of engineers building AI agents,” describing it as prompt engineering done “automatically in a dynamic system.”

A week later, on June 19, 2025, Shopify CEO Tobi Lütke [posted on X](https://x.com/tobi/status/1935533422589399127) that he preferred “context engineering” over prompt engineering because it “describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM.” Andrej Karpathy [followed on June 25](https://x.com/karpathy/status/1937902205765607626), calling it “the delicate art and science of filling the context window” with the right information for the next step. Too little and the model lacks what it needs; too much, he wrote, and “costs might go up and performance might come down.”

The vocabulary filled in over the next few months. Drew Breunig published [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) on June 22, naming four failure modes. LangChain’s [Context Engineering](https://www.langchain.com/blog/context-engineering-for-agents) post on July 2 grouped techniques into write, select, compress, and isolate. Chroma’s [Context Rot](https://research.trychroma.com/context-rot) report on July 14 tested 18 models and found that performance “grows increasingly unreliable as input length grows.” Anthropic’s [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), published September 29, 2025, pulled these threads into the most cited guide on the subject.

The term then picked up an academic branch and a product layer. The paper [Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models](https://arxiv.org/abs/2510.04618) (Zhang et al., first posted October 6, 2025, and published at ICLR 2026) introduced ACE, a framework that treats an agent’s context as an “evolving playbook” that improves through generation, reflection, and curation instead of weight updates. It reported gains of 10.6% on agent benchmarks and 8.6% on finance tasks over strong baselines. On the product side, Anthropic shipped context editing and a memory tool on [September 29, 2025](https://www.anthropic.com/news/context-management), a [tool search tool](https://www.anthropic.com/engineering/advanced-tool-use) on November 24, 2025, and server-side [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) in 2026. A March 20, 2026 [cookbook](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools) shows how they compose.

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

Tool search keeps definitions out of the window until the model asks for them. With Anthropic’s tool search tool, you mark tools `defer_loading: true` and the model searches the catalog when it needs a capability; Anthropic reports an 85% reduction in token usage on its example tool library. [Agent skills](https://parallel.ai/articles/what-are-agent-skills) use a related pattern, progressive disclosure, where only a short description loads until the skill is needed.

### Take structured notes and keep memory

The agent writes progress to a file or memory store outside the window and reads it back later. Anthropic’s examples include a to-do list, a `NOTES.md` file, and its file-based memory tool. ACE pushes this further: its curator merges small, itemized updates into the playbook instead of rewriting it, which the authors say prevents “context collapse, where iterative rewriting erodes details over time.”

## Where live web retrieval fits

For research agents, web results are often the largest and least predictable block in the window. A raw page carries navigation, boilerplate, and paragraphs unrelated to the question. The context engineering question for search is how many tokens of evidence you get per token spent.

Agent-oriented search APIs answer that by returning query-relevant excerpts instead of pages. We build one, so weigh this accordingly: Parallel’s [Search API](https://docs.parallel.ai/search/best-practices) “ranks and compresses” results against a natural-language objective and returns dense excerpts, with `max_chars_total` and `max_chars_per_result` settings to cap the size. The free [Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) caps excerpts at roughly 25,000 characters per tool call so a single search can’t flood an MCP client. Other providers make different trade-offs; our [web search API guide](https://parallel.ai/articles/best-web-search-api) compares them.

You can measure the difference yourself. This script calls the keyless Search MCP, totals the excerpt characters across ten results, then fetches the top result as full page markdown for comparison. It uses the rough rule of four characters per token.

```python
import json, requests

MCP = "https://search.parallel.ai/mcp"  # free, no API key
HEADERS = {"Content-Type": "application/json",
           "Accept": "application/json, text/event-stream",
           "User-Agent": "context-budget-demo/1.0"}

def rpc(method, params, session=None):
    headers = dict(HEADERS, **({"Mcp-Session-Id": session} if session else {}))
    r = requests.post(MCP, headers=headers, timeout=60,
                      json={"jsonrpc": "2.0", "id": 1, "method": method, "params": params})
    r.raise_for_status()
    body = r.text
    if "data:" in body[:20]:  # Streamable HTTP may answer as SSE
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

We ran it on October 10, 2026. Your numbers will vary by query and run.

```text
10 results, excerpts total 13,227 chars (~3,306 tokens)
1 full page: 22,951 chars (~5,737 tokens)
```

Excerpts from ten sources came in smaller than the single full page for the top result, which was Anthropic’s own context engineering post.

### Example: a context budget for one research turn

The table below is **illustrative**, not a benchmark. It sketches how a web research agent might allot a 200,000-token window on one turn. Only the search row comes from a measurement (the run above); the other rows are round planning numbers.

| Block | Tokens (illustrative) | How it’s controlled |
| --- | --- | --- |
| System instructions | 2,000 | Short, sectioned prompt |
| Tool definitions | 3,000 | Search and fetch loaded; other tools deferred behind tool search |
| Memory and notes | 1,500 | NOTES.md read back at turn start |
| Conversation history | 8,000 | Compacted summary plus the last few turns |
| Earlier tool results | 0 | Cleared after their findings went into notes |
| This turn’s search results | about 3,300 | Ten results as excerpts (measured above) |
| Reserved for reasoning and answer | 16,000 | Headroom for thinking and output |
| Total in use | about 33,800 | Leaves room for several more search turns |

Swap the search row for ten full pages and it grows by an order of magnitude. If each were the size of the page we measured, that’s roughly 57,000 tokens on one turn, before the agent has read anything twice. Over a long session, uncleared tool results and an uncompacted history do the same damage more slowly.

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

Connect the free Parallel Search MCP at `https://search.parallel.ai/mcp` (no API key needed) and run the script above against your own queries to see what your agent’s search results cost in tokens. For the surrounding loop, read [what an agent harness is](https://parallel.ai/articles/what-is-an-agent-harness) and our walkthrough on [building one with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search).

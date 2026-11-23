# AI agent

An AI agent is a software system where a language model drives a multi-step feedback loop—choosing tools, reading live observations, maintaining state, and iterating inside a harness until a goal is met.

An AI agent is a software system in which a language model acts as the decision controller inside a feedback loop—observing state, selecting external actions via [tool calling](/learn/tool-calling), reading tool results, and iterating until it reaches a goal or hits a budget limit. Unlike a single-turn chatbot that maps one prompt to one reply, an AI agent maintains control across multiple steps and interacts directly with live software environments, files, APIs, and the open web.

**Core AI agent architecture (ReAct loop)**

```text
User Goal ──▶ ┌─────────────────────────────────────────────────┐
              │                 Agent Harness                   │
              │  ┌──────────────┐   action    ┌──────────────┐  │
              │  │  LLM Policy  │ ──────────▶ │ Tool Runtime │  │
              │  │ (+ Memory &  │             │ (search, API,│  │
              │  │   Context)   │ ◀────────── │  code, MCP)  │  │
              │  └──────────────┘ observation └──────────────┘  │
              └────────────────────────┬────────────────────────┘
                                       │ stop condition met
                                       ▼
                             Grounded Answer / Action
```

## Five building blocks of a production AI agent

Every reliable agent—whether a coding agent, support resolver, or financial researcher—combines the same five components:

1. **Reasoning model (policy):** Selects the next action, writes queries, interprets observations, and decides when to stop.
2. **Tools and protocols:** Executable functions declared via [tool calling](/learn/tool-calling) or discovered dynamically through [MCP](/learn/model-context-protocol), giving the model hands to search the web, run code, or query databases.
3. **Working context and memory:** The active [context window](/learn/context-window) curated via [context engineering](/learn/context-engineering), backed by external [agent memory](/learn/agent-memory) and [prompt caching](/learn/prompt-caching) for multi-turn efficiency.
4. **Control loop (harness):** The deterministic outer runtime ([agent harness](/articles/what-is-an-agent-harness)) enforcing `max_steps`, timeouts, retries, sandboxing, and human approval gates.
5. **Grounding and verification:** Live evidence from [web search APIs](/learn/web-search-api) or internal retrieval plus [structured outputs](/learn/structured-outputs) and deterministic checks (unit tests, schema validation, [source grounding](/learn/source-grounding)).

The canonical academic formulation of this interleaved thought-action-observation loop is **ReAct** ([Yao et al., 2022](https://arxiv.org/abs/2210.03629)), which showed that grounding reasoning traces in live search observations sharply reduces hallucination compared to chain-of-thought prompting alone.

```python
def run_react_agent(llm, goal: str, tools: dict, max_steps: int = 10) -> str:
    transcript = [{"role": "user", "content": goal}]
    for step in range(max_steps):
        turn = llm.generate(messages=transcript, tool_schemas=list(tools.keys()))
        transcript.append(turn.message)
        if not turn.tool_calls:
            return turn.text  # Model chose to finish
        for call in turn.tool_calls:
            fn = tools.get(call.name)
            output = fn(**call.args) if fn else {"error": f"Unknown tool: {call.name}"}
            transcript.append({"role": "tool", "tool_call_id": call.id, "content": str(output)})
    return "Stopped: reached max_steps without a grounded final answer."
```

## AI agent vs. chatbot vs. fixed workflow

| System | Control flow | Tool execution | Best fit |
| --- | --- | --- | --- |
| Chatbot | Single prompt -> single reply | None (or single hard-coded lookup) | Q&A, drafting, brainstorming |
| Fixed [AI workflow](/learn/agentic-workflow) | Deterministic DAG written in code | Fixed sequence of calls | Predictable ETL, batch pipelines, compliance checklists |
| AI agent | Dynamic model-directed loop | Chooses tools, arguments, and hop count at runtime | Open-ended coding, [agentic search](/learn/agentic-search), triage, [deep research](/learn/deep-research) |

## Practical risks and failure modes

- **Latency and token compounding:** Each step re-reads prior context; combine [prompt caching](/learn/prompt-caching) with compact search excerpts ([Parallel Search](/products/search)) instead of raw HTML to keep 10-step runs fast and affordable.
- **Prompt injection across trust boundaries:** External pages, emails, or tickets read by an agent can contain adversarial instructions. Keep read-only data untrusted and enforce permissions in host code.
- **Over-engineering simple tasks:** If a fixed 2-step script or single [RAG](/learn/rag-retrieval-augmented-generation) call solves the problem deterministically, an open-ended agent loop adds latency and variance without improving accuracy.

## Frequently asked questions

**What is the difference between an AI agent and an autonomous agent?**

They describe the same architecture. "[Autonomous agent](/learn/autonomous-agent)" emphasizes longer-horizon, unsupervised execution with minimal human checkpoints between steps.

**Why do AI agents need specialized web search APIs?**

Human search pages and raw HTML waste tens of thousands of tokens per hop. A purpose-built [web search API](/learn/web-search-api) returns ranked, query-focused excerpts and URLs directly inside the agent's tool-call budget.

**When should I use a deterministic workflow instead of an AI agent?**

Use a deterministic [agentic workflow](/learn/agentic-workflow) when the steps are known in advance and auditability/repeatability matter more than flexible exploration. Reach for a full agent loop when the path depends on intermediate discoveries.

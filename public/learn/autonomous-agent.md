# Autonomous agent

An autonomous agent is an AI system that pursues a high-level goal across multiple steps without human prompting on each turn—planning actions, calling tools, verifying results, and stopping or escalating at defined boundaries.

An autonomous agent is an [AI agent](/learn/ai-agent) engineered to pursue a high-level objective across many steps without a human prompting each turn. Given a goal, a set of tools, and guardrails, it decomposes the task into sub-goals, calls external systems via [tool calling](/learn/tool-calling), evaluates whether each action moved it closer to completion, recovers from errors, and stops once its termination condition is satisfied—or escalates to a human when it hits an approval boundary.

**Autonomous agent control loop**

```text
                    ┌──────────────────────┐
     Goal / Trigger │   Planner (LLM)      │◀─────────────────┐
     ──────────────▶│ decompose + decide   │                  │
                    └──────────┬───────────┘                  │
                               ▼                              │
                    ┌──────────────────────┐                  │
                    │  Policy / Approval   │ (high-stakes     │
                    │  Gate (Host Runtime) │  -> pause/ask)   │
                    └──────────┬───────────┘                  │
                               ▼                              │
                    ┌──────────────────────┐                  │
                    │  Tool / Environment  │                  │
                    │  (search, code, API) │                  │
                    └──────────┬───────────┘                  │
                               ▼                              │
                    ┌──────────────────────┐   not done       │
                    │  Verify & Update     │──────────────────┘
                    │  State / Memory      │
                    └──────────┬───────────┘
                               │ goal met / budget hit
                               ▼
                      Final Output + Trace
```

## What makes an agent "autonomous"

Autonomy is a spectrum, not a binary switch. Three architectural properties distinguish an autonomous agent from a scripted [agentic workflow](/learn/agentic-workflow) or single-turn assistant:

1. **Dynamic planning:** The control flow is not fixed in a static DAG. The model chooses how many steps to run, which tools to combine, and when to branch based on intermediate tool outputs.
2. **Closed-loop error recovery:** When an API returns `404`, a unit test fails, or an [agentic search](/learn/agentic-search) query misses, the agent reads the error observation, revises its plan, and retries instead of halting.
3. **Persistent state across steps:** The runtime tracks working state, artifacts, and checkpoints—often compacting older observations to fit inside the [context window](/learn/context-window)—so long-running tasks (such as [deep research](/learn/deep-research) or repository refactors) survive dozens of turns.

## Bounded autonomy in code

Unbounded autonomy fails quickly in production: loops spin on ambiguous goals, burn token budgets, or take unintended side effects. Reliable harnesses enforce explicit **budgets** (`max_steps`, `max_cost_usd`), **action policies** (auto-approve reads, gate writes), and **verifiable exit criteria**.

```python
READ_ONLY_TOOLS = {"search_web", "extract_url", "read_file"}

def step_policy(tool_name: str, args: dict) -> str:
    if tool_name in READ_ONLY_TOOLS:
        return "allow"
    if tool_name == "send_email" or tool_name == "update_crm":
        return "require_approval"
    return "deny"

def run_bounded_agent(goal: str, max_steps: int = 15, max_usd: float = 0.50):
    state = {"steps": 0, "spend_usd": 0.0, "done": False}
    while not state["done"] and state["steps"] < max_steps and state["spend_usd"] < max_usd:
        action = plan_next_action(goal, state)
        decision = step_policy(action.name, action.args)
        if decision == "require_approval":
            return {"status": "awaiting_human", "pending_action": action}
        if decision == "deny":
            record_observation(state, {"error": f"Tool {action.name} not permitted"})
            continue
        obs, cost = execute_tool(action)
        state["steps"] += 1
        state["spend_usd"] += cost
        state["done"] = verify_goal(goal, obs, state)
    return state
```

## Autonomy spectrum: workflow vs. copilot vs. autonomous agent

| Level | Who decides the next step | Human involvement | Typical use cases |
| --- | --- | --- | --- |
| Fixed pipeline | Deterministic code / DAG | None at runtime | ETL, scheduled alerts, static [RAG](/learn/rag-retrieval-augmented-generation) |
| Human-in-the-loop copilot | Model proposes; human triggers each turn | Every turn | Interactive chat, inline code completion |
| Bounded autonomous agent | Model plans & loops within host guardrails | At trigger + high-stakes approval gates | [Deep research](/learn/deep-research), automated [KYB](/learn/kyb) checks, coding agents, incident triage |

## Why autonomous agent projects fail in production

Analyst forecasts highlight the gap between demos and deployment—Gartner projected in June 2025 that [over 40% of agentic AI projects](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) could be canceled by 2027 due to unclear ROI and weak controls. In engineering terms, failures cluster around four causes:

- **Compounding error rates:** A 95% per-step success rate drops to 60% over 10 sequential steps (`0.95^10`) unless intermediate steps have deterministic checks (schema validation, tests, citation verification).
- **Stale or ungrounded inputs:** An agent reasoning over hallucinated facts compounds errors across every downstream step. Grounding web lookups with a dedicated [web search API](/learn/web-search-api) like [Parallel Search](/products/search) keeps each observation attributable.
- **Missing observability:** Without step-level traces (prompts, tool args, latency, token spend), debugging why an agent took a wrong branch on step 11 is guesswork.
- **Over-broad permissions:** Granting write credentials before read-only reliability is proven turns a prompt-injection bug into a production incident.

## Frequently asked questions

**What is the difference between an AI agent and an autonomous agent?**

Every autonomous agent is an [AI agent](/learn/ai-agent), but "autonomous" emphasizes multi-step independence: the system plans, invokes tools, checks intermediate outputs, and runs to completion without waiting for a human prompt between steps.

**Do autonomous agents eliminate human oversight?**

No. Production deployments use _bounded_ autonomy—running read-only research, drafting, and verification autonomously while routing irreversible or regulated actions (payments, legal sign-off, customer outreach) to a human reviewer with a cited audit trail.

**What is an agent harness?**

An [agent harness](/articles/what-is-an-agent-harness) is the outer software runtime around the model that manages the loop, [context engineering](/learn/context-engineering), tool dispatch, retries, sandboxing, and approval gates.

# Agent memory

Agent memory is the storage and retrieval layer that lets a stateless LLM persist working state, past run episodes, user/workspace facts, and procedural rules across turns and sessions.

Agent memory is the set of storage and retrieval mechanisms that allow an [AI agent](/learn/ai-agent) to retain facts, user preferences, task state, and lessons across turns and across separate sessions. Because LLM inference itself is stateless—the model only sees the tokens inside the current [context window](/learn/context-window)—anything an agent "remembers" beyond one API call must be written to external state and selectively retrieved back into future prompts.

**Four-tier memory hierarchy for AI agents**

```text
┌────────────────────────────────────────────────────────────────┐
│ Working Memory  (Active Context Window: current turn + state)  │
└───────────────┬───────────────────────┬────────────────────────┘
                │ write / compact       │ retrieve on demand
     ┌──────────┴─────────┐  ┌──────────┴─────────┐  ┌──────────┐
     ▼                    ▼  ▼                    ▼  ▼          │
┌──────────────┐   ┌────────────────┐   ┌────────────────────┐  │
│   Episodic   │   │    Semantic    │   │     Procedural     │  │
│ past runs &  │   │ user/org facts │   │ system rules, code │  │
│ tool traces  │   │ & preferences  │   │ & SKILL.md files   │  │
└──────────────┘   └────────────────┘   └────────────────────┘  │
                                            (loaded via harness)┘
```

## The four types of agent memory

Borrowing from cognitive science and popularized in agent frameworks (including LangGraph and MemGPT/Letta), production systems separate memory by lifespan and access pattern:

| Memory tier | What it stores | Where it lives | How it enters context |
| --- | --- | --- | --- |
| Working memory | Active task plan, recent turns, live tool outputs | Current [context window](/learn/context-window) | Always present; compacted when full |
| Episodic memory | Past session transcripts, run outcomes, errors solved | Append-only DB / log store | Retrieved via [hybrid search](/learn/hybrid-search) when a similar task recurs |
| Semantic memory | Stable user/org facts ("prefers Python", "EU residency required") | Key-value / structured DB + vector index | Injected into system prompt or fetched on demand |
| Procedural memory | Reusable workflows, house rules, tool-use playbooks | Versioned files (`CLAUDE.md`, [agent skills](/learn/agent-skills) `SKILL.md`) | Loaded by the harness when a matching task triggers |

## Read, write, and forget: the memory lifecycle

Naively appending every past conversation to a vector database creates noisy, contradictory recall within weeks. Reliable memory systems manage three explicit operations:

1. **Selective write (extraction & upsert):** Only persist durable facts, decisions, or corrections—not transient chatter. Store `updated_at`, `source_session_id`, and `scope` (`user`, `workspace`, `project`) so newer facts overwrite stale ones instead of duplicating them.
2. **Targeted retrieval:** Pull only top-k relevant memories for the current goal using metadata filters (`user_id`, `project_id`) plus [hybrid search](/learn/hybrid-search) and [reranking](/learn/reranking) so unrelated past sessions do not pollute [context engineering](/learn/context-engineering).
3. **Decay and invalidation:** Facts expire—pricing changes, people switch teams, endpoints deprecate. Never cache volatile external web facts permanently in agent memory when a live [web search API](/learn/web-search-api) can fetch ground truth in ~200–700 ms.

```python
from datetime import datetime, timezone

class ScopedMemoryStore:
    def __init__(self) -> None:
        self.records: dict[tuple[str, str], dict] = {}

    def upsert(self, scope: str, key: str, value: str, source: str) -> None:
        self.records[(scope, key)] = {
            "value": value,
            "source": source,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }

    def read_scope(self, scope: str) -> list[dict]:
        return [
            {"key": k, **v}
            for (s, k), v in self.records.items()
            if s == scope
        ]
```

## Security risk: memory poisoning

Persistent memory introduces a subtle attack vector: **delayed prompt injection**. If an agent reads a malicious web page or untrusted email during session 1 and saves an instruction from it into long-term semantic memory, that payload can execute with elevated trust in session 20. Guard against memory poisoning by:

- Never letting untrusted web or tool outputs write directly to procedural or high-privilege instruction memory without verification.
- Separating _untrusted retrieved data_ from _user-confirmed preferences_.
- Logging provenance (`source`) on every memory write so bad entries can be audited and purged.

## Frequently asked questions

**Is agent memory the same as RAG?**

They share the same retrieval machinery ([vector embeddings](/learn/vector-embeddings), [hybrid search](/learn/hybrid-search), [reranking](/learn/reranking)), but differ in who writes the store. [RAG](/learn/rag-retrieval-augmented-generation) queries a static or externally maintained knowledge base; agent memory is read-write—the agent itself creates, updates, and invalidates entries over time.

**Should an agent store web search results in long-term memory?**

Usually no, or only with a strict TTL and source URL. Caching external web facts in memory causes silent staleness; keep volatile public facts behind live [agentic search](/learn/agentic-search) and reserve memory for user preferences, workspace context, and verified internal state.

**How does agent memory differ from prompt caching?**

[Prompt caching](/learn/prompt-caching) is an inference-time GPU optimization that reuses KV tensors for an identical prompt prefix over minutes. Agent memory is application-level persistence that survives across hours, days, and separate conversations.

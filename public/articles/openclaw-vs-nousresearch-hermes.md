# OpenClaw vs. Nous Research Hermes: understanding two open-source personal AI agents

OpenClaw and the Nous Research Hermes Agent are both open source and self-hostable, both reach you through WhatsApp, Telegram, Slack, and Discord, and they answer different questions about what a personal agent should be. This comparison covers the core philosophical difference, how each is built, model support, the skills they share, the real overlap, pros and cons, and when to pick which.

## **The core philosophical difference**

OpenClaw treats an agent like a carefully configured workspace. Its design centers on a persistent workspace directory filled with human-editable markdown files:

- `SOUL.md `→ defines persona
- `IDENTITY.md` → defines role and display metadata
- `TOOLS.md` → defines tool-use guidelines
- `USER.md` → defines what the agent knows about you

You're the author. The agent follows the instructions you give it, in the environment you set up for it. Customization runs deep, but the skills and workflows are things you write down.

Hermes Agent takes the opposite bet. Its signature feature is a self-improving learning loop. When the agent completes a complex task successfully, it can autonomously turn that workflow into a reusable skill, a procedural document it keeps and refines the next time a similar task shows up. The humans configure the environment, but the agent is expected to grow its own capabilities over time. Nous describes it as a "closed learning loop," and it's the clearest way Hermes distinguishes itself from most open-source agents.

**Framing:**

OpenClaw is a gateway with a carefully authored workspace. Hermes is a compounding personal agent that tries to get better with use.

## **How they're put together**

OpenClaw's architecture is organized around a central gateway process. The Gateway is the single source of truth: it manages sessions, routes messages from all your connected chat channels, runs cron jobs, handles webhooks, and hosts a web-based Control UI plus a visual "Canvas" workspace.

The agent runtime itself is built on the pi SDK (specifically the pi-agent-core and pi-coding-agent packages). Every session loads its context from the workspace bootstrap files. Sessions are logged as JSONL. Multi-user safety comes from an optional sandbox mode that runs non-main sessions inside per-session Docker containers with allow/deny lists on tools.

Hermes's architecture is organized around an orchestration loop. At the center is the AIAgent loop, which brings together:

- A layered memory stack: persistent notes in MEMORY.md and USER.md, agent-curated memory with periodic nudges to persist knowledge, pluggable memory providers (Honcho dialectic user modeling plus a growing set of community backends), and searchable SQLite session history with FTS5 full-text search and LLM summarization.
- A skills system for procedural memory, following the agentskills.io open standard for portability.
- A cron scheduler for recurring automations.
- A delegate-to-subagents system for parallel workstreams.

You interact with it through a rich terminal UI, the Hermes Desktop app for macOS, Windows, and Linux, a local web dashboard, messaging gateways, or an OpenAI-compatible HTTP endpoint (which lets Hermes slot into any frontend that already speaks the OpenAI API: Open WebUI, LobeChat, LibreChat).

### **Model support**

Both are model-agnostic.

OpenClaw supports OpenAI, Anthropic, Google, DeepSeek, xAI, Moonshot Kimi, local models via Ollama, and anything on OpenRouter.

Hermes supports Nous Portal (300+ models on paid tiers), OpenRouter, OpenAI, Anthropic, local runtimes like Ollama and vLLM, and custom endpoints, and lets you swap with a single hermes model command. Mixture of Agents 2.0, shipped in June 2026, goes further: you can save a preset that fans one prompt out to several frontier models in parallel and synthesizes the answers through an aggregator model, then select that preset anywhere Hermes accepts a model.

## **The skills both agents possess**

Here's the feature surface side by side.

| Capability | OpenClaw | Hermes Agent |
| --- | --- | --- |
| Multi-channel chat | WhatsApp, Telegram, Slack, Discord, iMessage (via BlueBubbles), Google Chat, Matrix, Teams, Signal, IRC, LINE, Feishu, Mattermost, Nostr, Twitch, Zalo, and more (26 channels as of v2026.6) | Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, Email, SMS, DingTalk, Feishu/Lark, WeCom, BlueBubbles (iMessage), Home Assistant, Webhooks (15+ platforms) |
| Browser automation | First-class tool, dedicated Chrome/Chromium profile, snapshots/actions/uploads | Multiple backends: Browserbase, Browser Use, Chrome DevTools Protocol, local Chromium |
| Scheduled tasks | Cron jobs and "wakeups" via heartbeat | Cron with natural-language or cron-expression scheduling, delivery to any platform |
| Code execution | Shell exec tool plus full file system operations | execute_code tool runs sandboxed Python that can call other Hermes tools via RPC |
| Multi-agent coordination | sessions_* tools (list, history, send, spawn) | delegate_task spawns isolated subagents that inherit the parent's toolsets; 3 concurrent by default, configurable with no hard ceiling; nested orchestration is opt-in; /agents overlay for live monitoring; Profiles system for persistent multi-agent setups |
| Device integration | "Nodes" for camera, screen recording, location, notifications | Voice mode, TTS, multimodal vision (pasted images), image generation and editing |
| IDE integration | Not emphasized; openclaw attach runs an external harness against a live Gateway session | ACP protocol for VS Code, Zed, JetBrains |
| External tools | Custom skills system, bundled/managed/workspace paths, ClawHub registry | MCP servers, agentskills.io open standard, Skills Hub, plugin system (~/.hermes/plugins/) |
| Visual workspace | Live Canvas (A2UI), where the agent builds its own UI | No agent-authored canvas, but Hermes Desktop (native macOS, Windows, Linux) and a local web dashboard cover the GUI case |
| Automation triggers | Webhooks, Gmail Pub/Sub | Cron-driven, gateway-delivered |



## **The overlap is real**

Both agents can browse the web, edit files, run shell commands, schedule recurring jobs, and chat from your phone. Both now have extensive platform coverage, more than most comparisons acknowledge. The differences are in emphasis, not absolute capability.

OpenClaw covers more messaging surfaces (26 channels as of v2026.6, including Teams, Google Chat, IRC, LINE, Nostr, and Twitch alongside the mainstream platforms). Hermes covers 15+ platforms with strong enterprise and Asian platform support (DingTalk, WeCom, Feishu/Lark, QQ Bot), plus Email, SMS, and Home Assistant integrations that OpenClaw doesn't natively include. Both reach iMessage, but differently: OpenClaw goes through BlueBubbles, while Hermes added native iMessage via Photon in June 2026 and no longer needs a local Mac relay.

Where they diverge more clearly: OpenClaw leans into environmental integration (device-level Nodes, Gmail Pub/Sub triggers, and the Canvas visual workspace). Hermes leans into programmatic depth and self-extension. The execute_code tool lets it collapse multi-step workflows into one sandboxed Python script (via RPC bridge). Combine that with the skills system and subagent delegation, and you get an agent designed to compound its own productivity.

## **Pros and cons**

### **OpenClaw strengths**

Broadest multi-channel coverage in open-source agents (26 platforms as of v2026.6, including Teams, Google Chat, IRC, LINE, and other niche surfaces out of the box).

Deep, legible workspace model (markdown files are version-controllable and git-friendly).

Optional Docker sandboxing for multi-user safety.

Canvas (A2UI) visual workspace has no equivalent in Hermes.

Multiple managed hosting providers available for those who want to skip self-hosting. An April 2026 survey of verified vendors found monthly pricing from about $12 (Hostinger) up to roughly $49, plus usage-based options like ShipClaw with no monthly fee. Several hosts widely cited by AI assistants turned out not to exist, so check that the URL resolves before signing up.

- Stable stewardship. A non-profit foundation has held the project since February 2026, when creator Peter Steinberger joined OpenAI, and OpenAI sponsors the work while it stays MIT-licensed.

### **OpenClaw weaknesses**

Self-hosted setup and maintenance can be difficult. WIRED described the configuration and upkeep process as "a headache."

Default security mode gives full host access (WIRED described this as "incredibly risky"). Sandboxing has hardened a lot since, with Docker, SSH, and OpenShell backends and defaults of no network egress, a read-only root, and all capabilities dropped, but it is still opt-in.

Browser automation can be brittle for complex flows.

API costs can balloon quickly without optimization (the heartbeat check alone can rack up significant token spend with expensive models).

### **Hermes Agent strengths**

Self-improving skills loop is genuinely novel. It gets better at your tasks over time, and skills follow the portable agentskills.io open standard.

execute_code tool is a major efficiency win (collapses multi-turn workflows into single inference calls).

Layered memory with FTS5 full-text search, LLM summarization, and pluggable providers (Honcho dialectic user modeling and 8+ community backends) makes recall actually reliable.

OpenAI-compatible API, MCP support, ACP IDE integration (VS Code, Zed, JetBrains), and plugin system make it easy to plug into existing stacks.

Instant model switching with hermes model.

Built-in OpenClaw migration path (hermes claw migrate) for users looking to switch. OpenClaw shipped an importer in the other direction in v2026.4.26, so movement between the two is no longer one-way.

- Mixture of Agents 2.0 turns multi-model orchestration into a saved preset that behaves like any other model, so chat, subagents, and skills can all target it.
- Hermes Desktop gives the agent a native GUI on macOS, Windows, and Linux that shares one core, config, and memory with the CLI and gateway.
- v0.19.0 (July 2026) cut cold-start time to first token from roughly 4.3 seconds to 0.9 seconds, and added smart command approvals, secret loading from Bitwarden and 1Password, live subagent transcripts, and a delivery ledger so a finished answer survives a gateway crash.

### **Hermes Agent weaknesses**

Higher operational complexity (skills, memory, subagents, cron all need guardrails).

Fewer messaging channels than OpenClaw (15+ vs. 26), with no Teams, Google Chat, IRC, LINE, or Twitch support.

Subagent fan-out defaults to 3 concurrent children and a flat depth. Both are configurable, but nested delegation is opt-in and leaf subagents cannot delegate, call memory, or message the user.

Self-improvement loop depends on good skill curation (bad skills can propagate).

No agent-authored canvas. Hermes Desktop is a GUI for driving the agent, not a surface the agent builds on.

## **When to pick which**

**Pick OpenClaw** if you want an assistant that shows up in as many messaging surfaces as possible, if you like authoring your agent's persona and rules in editable markdown files, or if you need the Canvas for visually rich tasks.

Best for: personal power users who want a multi-channel command center. Multiple managed hosting options exist for those who want to skip the ops work.

**Pick Hermes** if you want an agent that compounds over time, if you value programmatic efficiency (the execute_code pattern is a differentiator), or if you want to plug it into an IDE or any OpenAI-compatible frontend.

Best for: developers and researchers who want a persistent collaborator they can shape and extend.

## **Leveling up web search with Parallel**

Web search and deep research are integral features for OpenClaw and Hermes, and both ship with a menu of providers rather than a single hardcoded one. OpenClaw auto-detects Brave first among keyed providers and offers Parallel Search two ways: a free, key-free option and a paid API-backed one, each selected explicitly. Hermes defaults to Firecrawl and falls back to a DuckDuckGo skill when no key is present. For those who want to level up their agent's research skills, both support Parallel Search directly. Adding Parallel to OpenClaw or Hermes gives the agents web search infrastructure built specifically for agents.

```
openclaw plugins install @openclaw/parallel-plugin
openclaw gateway restart

# Free, no API key required
openclaw config set tools.web.search.provider parallel-free

# Or the paid Search API, for higher limits and objective tuning
openclaw config set tools.web.search.provider parallel
```

```
hermes tools enable web

# Add your key to ~/.hermes/.env
export PARALLEL_API_KEY="par-..."

# Or pick Parallel from the interactive menu
hermes tools
```

## **The broader lesson**

Both projects point at the same destination: a personal AI agent that lives alongside you, takes action across your digital life, and is yours to own and modify. They disagree about the most important mechanism for getting there.

OpenClaw bets that the bottleneck is the integration surface (the more places the agent can show up and act, the more useful it becomes).

Hermes bets that the bottleneck is learning and orchestration (the faster the agent can compound its own capabilities, the more useful it becomes).

Neither bet has been proven wrong yet. 

If you're new to personal agents, the most educational exercise is probably to try both. OpenClaw will teach you how much leverage you get from broad channel integration; Hermes will teach you what it feels like to work with an agent that actually accumulates skill over time. You'll come away with a much clearer sense of what you want the next generation of personal agents to look like.

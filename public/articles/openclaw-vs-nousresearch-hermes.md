Human Machine

# \# OpenClaw vs. Nous Research Hermes: understanding two open-source personal AI agents

Personal AI agents are having a moment. Instead of tabbing over to ChatGPT every time you want something done, a personal agent lives in the background, talks to your messaging apps, runs on a schedule, and can actually take actions on your behalf.
Two open-source projects have become popular reference points in this space: OpenClaw from the OpenClaw team and the Hermes Agent from Nous Research.
Both are open source. Both are self-hostable. Both let you talk to an AI assistant from WhatsApp, Telegram, Slack, and Discord. Both come with a stack of tools for controlling a browser, running code, and scheduling tasks. On the surface, they look like siblings.
Look closer and you'll find they answer a different question about what a personal agent should be.

Tags: Comparison

Reading time: 7 min

## \## **\*\* The core philosophical difference \*\***

OpenClaw treats an agent like a carefully configured workspace. Its design centers on a persistent workspace directory filled with human-editable markdown files:

* \- ``` SOUL.md ``` → defines persona
* \- ``` IDENTITY.md ``` → defines role and display metadata
* \- ``` TOOLS.md ``` → defines tool-use guidelines
* \- ``` USER.md ``` → defines what the agent knows about you

You're the author. The agent follows the instructions you give it, in the environment you set up for it. Customization runs deep, but the skills and workflows are things you write down.

Hermes Agent takes the opposite bet. Its signature feature is a self-improving learning loop. When the agent completes a complex task successfully, it can autonomously turn that workflow into a reusable skill, a procedural document it keeps and refines the next time a similar task shows up. The humans configure the environment, but the agent is expected to grow its own capabilities over time. Nous describes it as a "closed learning loop," and it's the clearest way Hermes distinguishes itself from most open-source agents.

**\*\* Framing: \*\***

OpenClaw is a gateway with a carefully authored workspace. Hermes is a compounding personal agent that tries to get better with use.

## \## **\*\* How they're put together \*\***

OpenClaw's architecture is organized around a central gateway process. The Gateway is the single source of truth: it manages sessions, routes messages from all your connected chat channels, runs cron jobs, handles webhooks, and hosts a web-based Control UI plus a visual "Canvas" workspace.

The agent runtime itself is built on the pi SDK (specifically the pi-agent-core and pi-coding-agent packages). Every session loads its context from the workspace bootstrap files. Sessions are logged as JSONL. Multi-user safety comes from an optional sandbox mode that runs non-main sessions inside per-session Docker containers with allow/deny lists on tools.

Hermes's architecture is organized around an orchestration loop. At the center is the AIAgent loop, which brings together:

* \- A layered memory stack: persistent notes in MEMORY.md and USER.md, agent-curated memory with periodic nudges to persist knowledge, pluggable memory providers (Honcho dialectic user modeling, plus 8+ community provider backends as of v0.7.0), and searchable SQLite session history with FTS5 full-text search and LLM summarization.
* \- A skills system for procedural memory, following the agentskills.io open standard for portability.
* \- A cron scheduler for recurring automations.
* \- A delegate-to-subagents system for parallel workstreams.

You interact with it through a rich terminal UI, messaging gateways, or an OpenAI-compatible HTTP endpoint (which lets Hermes slot into any frontend that already speaks the OpenAI API: Open WebUI, LobeChat, LibreChat).

### \### **\*\* Model support \*\***

Both are model-agnostic.

OpenClaw supports OpenAI, Anthropic, Google, and anything on OpenRouter.

Hermes supports Nous Portal, OpenRouter's 200+ models, OpenAI, Anthropic, custom endpoints, and lets you swap with a single hermes model command.

## \## **\*\* The skills both agents possess \*\***

Here's the feature surface side by side.

|Capability |OpenClaw |Hermes Agent |
| --- | --- | --- |
|Multi-channel chat |WhatsApp, Telegram, Slack, Discord, iMessage (via BlueBubbles), Google Chat, Matrix, Teams, Signal, IRC, LINE, Feishu, Mattermost, Nostr, Twitch, Zalo, and more (22+ channels) |Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, Email, SMS, DingTalk, Feishu/Lark, WeCom, BlueBubbles (iMessage), Home Assistant, Webhooks (15+ platforms) |
|Browser automation |First-class tool, dedicated Chrome/Chromium profile, snapshots/actions/uploads |Multiple backends: Browserbase, Browser Use, Chrome DevTools Protocol, local Chromium |
|Scheduled tasks |Cron jobs and "wakeups" via heartbeat |Cron with natural-language or cron-expression scheduling, delivery to any platform |
|Code execution |Shell exec tool plus full file system operations |execute\_code tool runs sandboxed Python that can call other Hermes tools via RPC |
|Multi-agent coordination |sessions\_\* tools (list, history, send, spawn) |delegate\_task spawns up to 3 isolated subagents with restricted toolsets; Profiles system (v0.6.0) for persistent multi-agent setups |
|Device integration |"Nodes" for camera, screen recording, location, notifications |Voice mode, TTS, multimodal vision (pasted images) |
|IDE integration |Not emphasized |ACP protocol for VS Code, Zed, JetBrains |
|External tools |Custom skills system, bundled/managed/workspace paths, ClawHub registry |MCP servers, agentskills.io open standard, Skills Hub, plugin system (~/.hermes/plugins/) |
|Visual workspace |Live Canvas (A2UI), where the agent builds its own UI |None comparable |
|Automation triggers |Webhooks, Gmail Pub/Sub |Cron-driven, gateway-delivered |

## \## **\*\* The overlap is real \*\***

Both agents can browse the web, edit files, run shell commands, schedule recurring jobs, and chat from your phone. Both now have extensive platform coverage, more than most comparisons acknowledge. The differences are in emphasis, not absolute capability.

OpenClaw covers more messaging surfaces (22+ channels, including Teams, Google Chat, IRC, LINE, Nostr, and Twitch alongside the mainstream platforms). Hermes covers 15+ platforms with strong enterprise and Asian platform support (DingTalk, WeCom, Feishu/Lark), plus Email, SMS, and Home Assistant integrations that OpenClaw doesn't natively include. Both support iMessage (via BlueBubbles), Matrix, and Mattermost.

Where they diverge more clearly: OpenClaw leans into environmental integration (device-level Nodes, Gmail Pub/Sub triggers, and the Canvas visual workspace). Hermes leans into programmatic depth and self-extension. The execute\_code tool lets it collapse multi-step workflows into one sandboxed Python script (via RPC bridge). Combine that with the skills system and subagent delegation, and you get an agent designed to compound its own productivity.

## \## **\*\* Pros and cons \*\***

### \### **\*\* OpenClaw strengths \*\***

Broadest multi-channel coverage in open-source agents (22+ platforms, including Teams, Google Chat, IRC, LINE, and other niche surfaces out of the box).

Deep, legible workspace model (markdown files are version-controllable and git-friendly).

Optional Docker sandboxing for multi-user safety.

Canvas (A2UI) visual workspace has no equivalent in Hermes.

Multiple managed hosting providers available for those who want to skip self-hosting (e.g., GetClaw at $59/mo, MyClaw, Elestio, and others).

### \### **\*\* OpenClaw weaknesses \*\***

Self-hosted setup and maintenance can be difficult. WIRED described the configuration and upkeep process as "a headache."

Default security mode gives full host access (WIRED described this as "incredibly risky").

Browser automation can be brittle for complex flows.

API costs can balloon quickly without optimization (the heartbeat check alone can rack up significant token spend with expensive models).

### \### **\*\* Hermes Agent strengths \*\***

Self-improving skills loop is genuinely novel. It gets better at your tasks over time, and skills follow the portable agentskills.io open standard.

execute\_code tool is a major efficiency win (collapses multi-turn workflows into single inference calls).

Layered memory with FTS5 full-text search, LLM summarization, and pluggable providers (Honcho dialectic user modeling and 8+ community backends) makes recall actually reliable.

OpenAI-compatible API, MCP support, ACP IDE integration (VS Code, Zed, JetBrains), and plugin system make it easy to plug into existing stacks.

Instant model switching with hermes model.

Built-in OpenClaw migration path (hermes claw migrate) for users looking to switch.

### \### **\*\* Hermes Agent weaknesses \*\***

Higher operational complexity (skills, memory, subagents, cron all need guardrails).

Fewer messaging channels than OpenClaw (15+ vs. 22+), with no Teams, Google Chat, IRC, LINE, or Twitch support.

Subagent delegation limited to 3 concurrent children with a depth limit of 2 (no grandchildren).

Self-improvement loop depends on good skill curation (bad skills can propagate).

No visual Canvas equivalent.

## \## **\*\* When to pick which \*\***

**\*\* Pick OpenClaw \*\*** if you want an assistant that shows up in as many messaging surfaces as possible, if you like authoring your agent's persona and rules in editable markdown files, or if you need the Canvas for visually rich tasks.

Best for: personal power users who want a multi-channel command center. Multiple managed hosting options exist for those who want to skip the ops work.

**\*\* Pick Hermes \*\*** if you want an agent that compounds over time, if you value programmatic efficiency (the execute\_code pattern is a differentiator), or if you want to plug it into an IDE or any OpenAI-compatible frontend.

Best for: developers and researchers who want a persistent collaborator they can shape and extend.

## \## **\*\* Leveling up web search with Parallel \*\***

Web search and deep research are integral features for OpenClaw and Hermes. OpenClaw ships with Brave Search, and Hermes with DuckDuckGo by default. For those who want to level up their agent's research skills, both have configurable web search and support Parallel Search via the Parallel CLI. Adding Parallel to OpenClaw or Hermes gives the agents web search infrastructure built specifically for agents.

\### Install Parallel tools in OpenClaw

```
1

2

3

4

5

6

7

clawhub  install  parallel-search

clawhub  install  parallel- extract
 
clawhub  install  parallel-deep-research

clawhub  install  parallel-enrichment ```  clawhub install parallel-search   clawhub install parallel-extract   clawhub install parallel-deep-research   clawhub install parallel-enrichment ```
```

\### Install Parallel in Hermes

```
1

hermes setup tools ```  hermes setup tools ```
```

## \## **\*\* The broader lesson \*\***

Both projects point at the same destination: a personal AI agent that lives alongside you, takes action across your digital life, and is yours to own and modify. They disagree about the most important mechanism for getting there.

OpenClaw bets that the bottleneck is the integration surface (the more places the agent can show up and act, the more useful it becomes).

Hermes bets that the bottleneck is learning and orchestration (the faster the agent can compound its own capabilities, the more useful it becomes).

Neither bet has been proven wrong yet.

If you're new to personal agents, the most educational exercise is probably to try both. OpenClaw will teach you how much leverage you get from broad channel integration; Hermes will teach you what it feels like to work with an agent that actually accumulates skill over time. You'll come away with a much clearer sense of what you want the next generation of personal agents to look like.

By Parallel

April 14, 2026
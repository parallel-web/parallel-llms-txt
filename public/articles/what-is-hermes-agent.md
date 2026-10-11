# What is Hermes Agent? Nous Research's open-source personal agent explained

What is Hermes Agent, and is it worth running as your own always-on assistant? This guide covers how Nous Research's agent handles models, memory, skills, messaging, and scheduled jobs, the official ways to install it (including Docker), what it costs, common use cases, how it stacks up against OpenClaw, the security risks to know about, and how to give it better web search.

Hermes Agent is an open-source personal AI agent from [Nous Research](https://nousresearch.com/), released under the MIT license. It runs on your own machine or server, works with whichever model provider you point it at, remembers what it learns across sessions, and reaches you through a terminal, a desktop app, or chat apps like Telegram and Slack. The first public release, v0.2.0, shipped on March 12, 2026. The latest tagged release is v0.21.6 from October 8, 2026, and the [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) repository had 252,576 GitHub stars when we checked on October 10, 2026.

## What Hermes Agent is

Nous calls Hermes “the agent that grows with you.” In practice that means a long-running process with three parts: a model of your choice, a set of tools it can call (shell, files, browser, web search, code execution, and more), and a memory layer that persists between conversations. The docs list more than 60 built-in tools, grouped into toolsets you can switch on or off per platform with `hermes tools`.

What sets it apart from a chat window is that it keeps working when you close the window. A messaging gateway keeps it reachable from your phone, a built-in scheduler runs tasks while you sleep, and its skills system means a workflow it figured out on Monday is a saved procedure by Tuesday.

## How Hermes Agent works

### Model-agnostic providers

Hermes doesn’t ship with a model. You connect one: [Nous Portal](https://portal.nousresearch.com/), OpenRouter, OpenAI, Anthropic, or any OpenAI-compatible endpoint, including local servers like Ollama, vLLM, and llama.cpp. You can switch providers mid-session with `/model`, and your memory and skills carry over. Local models need at least 64,000 tokens of context, per the [provider docs](https://hermes-agent.nousresearch.com/docs/integrations/providers), because the system prompt and tool schemas take up a lot of room.

### Persistent memory

Two small files sit in every system prompt: `MEMORY.md` for the agent’s own notes (capped at 2,200 characters) and `USER.md` for your preferences (capped at 1,375 characters). The caps are deliberate: when memory fills up, the agent has to consolidate entries instead of piling them up. Older conversations live in a SQLite session store with full-text search, so Hermes can look up what you discussed weeks ago without loading all of it. You can plug in an external memory provider such as Honcho or Mem0 instead, and you can require approval for every memory write with `memory.write_approval`.

### Skills it writes for itself

[Skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) are Hermes’s procedural memory. When the agent works out a non-trivial workflow, it can save the steps as a `SKILL.md` file with its `skill_manage` tool and load it the next time a similar task comes up. You can also install skills from the Skills Hub, GitHub, or any site that follows the [agentskills.io](https://agentskills.io/) standard. Hub installs pass through a security scanner, and `skills.write_approval: true` makes the agent ask before it creates or edits a skill.

### Messaging gateway

The gateway connects one agent, with one memory, to more than 20 platforms: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, email, SMS, Microsoft Teams, Google Chat, Home Assistant, and several Chinese platforms including DingTalk, Feishu, and WeCom. Strangers can’t talk to your agent by default; you approve users with allowlists or one-hour DM pairing codes.

### Cron scheduling

Hermes has a built-in scheduler that accepts plain intervals (`every 2h`), relative times (`in 30m`), or standard cron expressions, and delivers results to any connected platform. We created this job with Hermes v0.17 in a scratch home directory:

```bash
hermes cron create "0 8 * * 1-5" \
  "Search the web for news about my top three competitors from the last 24 hours and send me a five-bullet summary with links." \
  --name morning-brief --deliver telegram
```

```text
Created job: f92d965e0660
  Name: morning-brief
  Schedule: 0 8 * * 1-5
  Next run: 2026-10-12T08:00:00-07:00
```

Jobs fire only while the gateway runs, and `hermes cron list` warns you if it isn’t. Cron jobs also deny dangerous shell commands by default, since no one is around to approve them.

### MCP support and a curated catalog

Hermes is an MCP client. Add any server under `mcp_servers` in `~/.hermes/config.yaml`, or browse the Nous-reviewed catalog with `hermes mcp catalog` and install an entry with `hermes mcp install <name>`. The repository’s `optional-mcps` directory held 65 entries on October 10, 2026, including Linear, Notion, Stripe, Sentry, and Vercel. Presence in that directory means Nous merged it after review, and catalog servers stay disabled until you install them. Hermes can also run as an MCP server itself (`hermes mcp serve`) so other agents can read and send its conversations.

### Sandboxed execution

Commands can run on the host or in one of seven terminal backends: local, Docker, SSH, Daytona, Singularity, Modal, and Vercel Sandbox. An approval layer screens risky shell commands, using a secondary model to auto-approve low-risk ones and escalate the rest to you.

## How to install Hermes Agent

All official installs come from [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/getting-started/installation) or the NousResearch GitHub repository.

| Method | Platforms | Command or download |
| --- | --- | --- |
| Terminal installer | Linux, macOS, WSL2 | install.sh one-liner (below) |
| PowerShell installer | Native Windows | iex (irm https://hermes-agent.nousresearch.com/install.ps1) |
| Desktop app | macOS 12+ on Apple Silicon, Windows 10/11 | DMG or App Installer from the Hermes website |
| Docker | Any Docker host | nousresearch/hermes-agent image |
| Termux APT | Android, aarch64 only | pkg install hermes-agent after adding the signed repo |

The terminal installer is the most common path. It clones the source, installs pinned Python, Node.js, ripgrep, and FFmpeg, and adds a `hermes` command to `~/.local/bin`:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc   # or ~/.zshrc
hermes setup
```

The macOS desktop app and installer support Apple Silicon only; Nous lists Intel Macs as unsupported.

### Hermes Agent on Docker

The [Docker guide](https://hermes-agent.nousresearch.com/docs/user-guide/docker) keeps all state (config, keys, sessions, skills, memories) in one host directory mounted at `/opt/data`, so you can pull a new image without losing anything. Run the setup wizard once, then start the gateway as a background service:

```bash
mkdir -p ~/.hermes
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup

docker run -d --name hermes --restart unless-stopped \
  -v ~/.hermes:/opt/data -p 8642:8642 \
  nousresearch/hermes-agent gateway run
```

The `:stable` tag tracks tested releases. Add `--shm-size=1g` if you use browser tools. If you enable the web dashboard on anything other than localhost, Hermes now requires authentication; the docs say an unauthenticated public dashboard was the entry point for a June 2026 campaign that planted SSH-key backdoors through exposed agents.

### Hermes Agent on Android

The [Termux guide](https://hermes-agent.nousresearch.com/docs/getting-started/termux) uses a signed APT repository. Verify the key fingerprint it lists before you add the repo, then run `pkg install hermes-agent`. The Termux package has no local browser or Docker, and you run the gateway with `hermes gateway run` in a Termux session.

## Hermes Agent pricing

Hermes Agent itself is free under the MIT license. Your costs come from the model provider you connect and any paid tool APIs. A local model costs nothing beyond hardware; a hosted frontier model bills per token at that provider’s rates.

Nous sells an optional [Nous Portal](https://hermes-agent.nousresearch.com/) subscription that bundles model access with a Tool Gateway for web search, image generation, text-to-speech, and a cloud browser, set up with one command (`hermes setup --portal`). Prices as listed on October 10, 2026:

| Plan | Price | Monthly credits | Rollover cap |
| --- | --- | --- | --- |
| Free | $0 | $0 (free models only) | None |
| Plus | $20/month | $22 | $10 |
| Super | $100/month | $110 | $50 |
| Ultra | $200/month | $220 | $100 |

Paid tiers include access to more than 200 models and hosted tool usage. Nous also runs [Hermes Cloud](https://portal.nousresearch.com/cloud), a hosted always-on agent that needs a $2 minimum credit balance or an active subscription to deploy.

## Hermes Agent use cases

- **A personal assistant in your pocket.** Run the gateway on a home server or a small VPS and message Hermes from Telegram or Signal to check calendars, draft replies, or look things up.
- **Scheduled briefings and reports.** Cron jobs that search the web, summarize, and post to Slack or email every morning.
- **Server and homelab watchdogs.** `hermes cron create --script ... --no-agent` runs a script on a schedule and forwards its output without calling a model, which suits disk and uptime alerts.
- **Coding help.** Hermes speaks the Agent Client Protocol, so it works inside VS Code, Zed, and JetBrains editors, and subagents can work in separate git worktrees.
- **Research tasks.** Subagents fan out across sources in parallel, and `execute_code` lets one Python script call several tools in a single step.
- **Team bots.** Bot Mode gives each named bot its own model, memory, and skills, and they can work together in group chats.

## Hermes Agent vs. OpenClaw

[OpenClaw](https://github.com/openclaw/openclaw) is the other big open-source personal agent, with 391,638 GitHub stars on October 10, 2026, and also MIT-licensed. Both self-host, connect to the same chat apps, and run cron jobs. The difference is philosophy: OpenClaw treats the agent as a workspace of human-edited markdown files with a central gateway and a visual Canvas, while Hermes bets on a learning loop where the agent writes and refines its own skills. OpenClaw leans toward device integration; Hermes leans toward programmatic depth with subagents and `execute_code`. Hermes ships a `hermes claw` command for migrating from OpenClaw. Our [full OpenClaw vs. Hermes comparison](https://parallel.ai/articles/openclaw-vs-nousresearch-hermes) goes through architecture, channels, and when to choose which.

## Is Hermes Agent safe?

Hermes is legitimate, widely used software, but an agent with shell access and your API keys deserves care.

- **Install only from official sources.** Lookalike “one-click installer” repositories such as `hermesagent-nousresearch/hermes-agent` and `hermes-agent-nousresearch/hermes-agent` appeared on GitHub in 2026 offering Windows executables. Nous didn’t publish them, and both returned 404 when we checked on October 10, 2026, but new ones keep appearing.
- **Treat web content as untrusted.** Any page, email, or file the agent reads can carry prompt-injection instructions. Hermes scans memory writes, context files, skills, and cron prompts for injection patterns, but no scanner catches everything. Keep approvals on `smart` or `manual`, and avoid `--yolo` on machines with sensitive data.
- **Lock down the gateway.** Set explicit user allowlists, never `GATEWAY_ALLOW_ALL_USERS=true` in production, and run commands in a container backend.
- **Never expose Docker without authentication.** On September 28, 2026, [The Hacker News reported](https://thehackernews.com/2026/09/carbonato-botnet-compromises-docker.html) on Carbonato, a botnet documented by [ThreatDown](https://www.threatdown.com/blog/carbonato/) that breaks into Docker daemons left open on port 2375, installs an unmodified copy of Hermes Agent, and overwrites its `SOUL.md` persona so operators can send it tasks over Telegram, including collecting API keys and SSH credentials. Hermes wasn’t the vulnerability; the open Docker API was. ThreatDown’s detection advice is to look for a `SOUL.md` containing “GH0ST” or a `.env` with `CARBONATO_API_KEY`.

## Giving Hermes Agent better web search

Web search is the tool Hermes calls most for current information, and Hermes gives you 11 backends to choose from, including Firecrawl, SearXNG, Brave, DuckDuckGo, Exa, Tavily, Perplexity, and Parallel. With no credentials at all, [Hermes rotates](https://hermes-agent.nousresearch.com/docs/user-guide/features/web-search) between the free tiers of Exa, Parallel, Firecrawl, and Keenable, so results vary from call to call.

We make Parallel, and our free Search MCP server is one way to pin a single provider. It needs no API key and lets the model send a natural-language objective plus several keyword queries per search. Add it to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  parallel_search:
    url: "https://search.parallel.ai/mcp"
    timeout: 120
```

Then confirm Hermes can reach it. We ran this on October 10, 2026, in a scratch `HERMES_HOME`:

```text
Testing 'parallel_search'...
Transport: HTTP → https://search.parallel.ai/mcp
Auth: none
✓ Connected (349ms)
✓ Tools discovered: 2
```

Our [Hermes Agent web search guide](https://parallel.ai/articles/hermes-agent-web-search) covers the full setup, API keys for higher limits, and when to use Hermes’s built-in Parallel backend instead. For other servers worth adding, see [the best MCP servers for Hermes Agent](https://parallel.ai/articles/best-mcp-servers-for-hermes-agent).

## Frequently asked questions

### What is Hermes Agent?

Hermes Agent is a free, open-source, self-hosted AI agent from Nous Research, released under the MIT license. It works with any model provider, keeps persistent memory, writes reusable skills for itself, and connects to Telegram, Discord, Slack, WhatsApp, Signal, email, and more than a dozen other platforms.

### Is Hermes Agent free?

Yes. The software is free and MIT-licensed, and you pay only for the model provider and any paid tool APIs you connect. Nous Portal plans from $20 to $200 a month are optional and bundle model credits with hosted tools.

### How do I install Hermes Agent?

On Linux, macOS, or WSL2, run `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`, then `hermes setup`. Windows users can run the PowerShell installer or the desktop app, and Docker and Android (Termux) installs are also supported.

### Can I run Hermes Agent in Docker?

Yes. Nous publishes the `nousresearch/hermes-agent` image; run `setup` once with `~/.hermes` mounted at `/opt/data`, then run `gateway run` as a detached container. All state lives in the mounted directory, so image upgrades keep your config, memory, and skills.

### Who makes Hermes Agent?

Nous Research, the AI lab behind the Hermes family of open models. The official code lives at github.com/NousResearch/hermes-agent and the docs at hermes-agent.nousresearch.com.

### Does Hermes Agent work with local models?

Yes. Hermes supports Ollama, vLLM, llama.cpp, and any OpenAI-compatible endpoint, as long as the model offers at least 64,000 tokens of context and supports tool calling.

## Get started

Install Hermes with the official one-liner, run `hermes setup` to connect a model, and pair it with Telegram so you can message it from anywhere. Then add the free Parallel Search MCP following our [Hermes Agent web search guide](https://parallel.ai/articles/hermes-agent-web-search), and read [what an agent harness is](https://parallel.ai/articles/what-is-an-agent-harness) for the concepts behind tools like Hermes.

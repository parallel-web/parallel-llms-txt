# Cline vs. Claude Code: which coding agent belongs in your editor?

Cline vs. Claude Code comes down to how much oversight you want inside your editor: a free, bring-your-own-model extension that prompts at every step, or Anthropic's managed agent that runs with fewer interruptions on Claude. This guide covers the surfaces each runs on, approvals and checkpoints, pricing paths, and MCP setup, including live web search.

Most people searching for Cline vs. Claude Code are in VS Code with a sidebar open, deciding which agent should live there. That's a fair way to frame it, because the two tools now overlap in more places than they used to. Cline started as a VS Code extension and added a CLI, a desktop app, and a JetBrains plugin. Claude Code started in the terminal and added a VS Code extension, a JetBrains plugin, a desktop app, and a web version.

What still separates them is the working style. Cline shows you each action and asks before it reads, writes, or runs anything unless you've said otherwise, and it lets you bring any model, including a Claude subscription. Claude Code is Anthropic's own agent, tuned for Claude models, and in current versions it starts in an auto mode that runs actions without stopping to ask, with safety checks in the background.

Facts below were checked against each vendor's docs and pricing pages on November 22, 2026.

## Where each one runs

| Surface | Cline | Claude Code |
| --- | --- | --- |
| VS Code | Original extension (also runs in Cursor and other VS Code forks) | Extension with inline diffs |
| JetBrains | Plugin on JetBrains Marketplace; listed under Enterprise on the pricing page | Plugin |
| Terminal | Cline CLI (`npm i -g cline`), interactive or headless | The original, full-featured CLI |
| Desktop app | Yes | Yes |
| Browser | No | Claude Code on the web |
| Other editors | Zed and Neovim via ACP mode | Through the terminal |
| SDK | Cline SDK (the agent core) | Claude Agent SDK |

Cline's [docs](https://docs.cline.bot/) list VS Code, Cursor, Windsurf, JetBrains, Antigravity, Zed, and Neovim as supported editors. Its latest VS Code release is v4.1.27 and its CLI is at v3.0.75, both published November 21, 2026 on [GitHub](https://github.com/cline/cline/releases), where the Apache-2.0 repo has about 72,000 stars. Claude Code's [overview](https://code.claude.com/docs/en/overview) describes the terminal, IDE, desktop, and web surfaces as one engine, so a repo's `CLAUDE.md`, settings, and MCP servers follow you between them.

If you live in a JetBrains IDE or a VS Code fork, both work. If you want to start a task in a browser and finish it in the terminal, that's a Claude Code feature.

## Approvals: how much you see and when

This is the biggest day-to-day difference.

Cline's default is visible, step-by-step approval. Every file read outside what you've allowed, every edit, every terminal command, and every MCP tool call shows up in the sidebar for you to approve. [Auto Approve](https://docs.cline.bot/features/auto-approve) loosens that one category at a time: read project files, read all files, edit project files, edit all files, run "safe" commands, run all commands, use the browser, use MCP servers. Cline's own recommendation is to enable only "Read project files" until you have a reason to open more. YOLO mode at the far end approves everything, including Plan-to-Act transitions.

Claude Code uses [permission modes](https://code.claude.com/docs/en/permission-modes) instead of per-category toggles. Since v2.1.283, interactive terminal and VS Code sessions start in auto mode, where a classifier model reviews each action and Claude Code proceeds without prompting unless something looks risky. You can switch to manual mode (asks before edits and commands), accept-edits mode (edits and basic file operations run, other commands still ask), or plan mode. Permission rules let you allow or deny specific tools, commands, or domains per repository.

The practical effect: Cline makes the agent's work visible by default and asks you to opt into speed. Claude Code optimizes for flow by default and asks you to opt into more prompts. Neither is wrong. If you're new to coding agents, or working in a repo where a stray `rm` would hurt, Cline's defaults are easier to trust. If you already know what you want the agent to do, Claude Code's auto mode gets out of the way.

## Planning before acting

Both tools separate thinking from doing.

Cline's [Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act) mode is a toggle. In Plan mode, Cline can read the codebase, search, and discuss strategy, but can't modify files or run commands. Switch to Act and it executes. You can assign a different model to each mode, for example a stronger reasoning model for planning and a cheaper one for implementation. For larger work, the `/deep-planning` command writes a detailed implementation plan Cline refers back to across sessions.

Claude Code's plan mode blocks edits until you approve the plan it proposes. It doesn't have a separate per-mode model setting, but you can switch models with `/model`, and subagents can run with their own model and instructions.

## Undo: two kinds of checkpoints

Cline's [checkpoints](https://docs.cline.bot/core-workflows/checkpoints) snapshot your project every time it modifies a file or runs a command, and they work outside your git history, so they capture untracked files too. Each step in the task has Compare and Restore buttons, and Restore gives three choices: files only, task (conversation) only, or both.

Claude Code's [checkpoints](https://code.claude.com/docs/en/checkpointing) are created per prompt. `/rewind`, or Esc twice, opens a menu to restore code, conversation, or both, and can also summarize part of the conversation to free context. It keeps snapshots for the 100 most recent checkpoints in a session.

The two are close in practice. Cline's are finer-grained (per action) and visible in the sidebar; Claude Code's are per turn and live in a menu.

## What each costs

Cline's [pricing page](https://cline.bot/pricing) lists two tiers, checked November 22, 2026:

- **Open Source (free):** VS Code extension, CLI, MCP Marketplace, and inference either bought at cost through the Cline provider or with your own API keys
- **Enterprise (custom pricing):** adds the JetBrains extension, SSO, SLA, centralized billing, team management, role-based access control, provider restrictions, and authentication logs

There's also [ClinePass](https://docs.cline.bot/getting-started/clinepass), an optional $9.99 a month subscription for a curated set of open coding models (DeepSeek, GLM, Kimi, Qwen, MiniMax, MiMo, and others) with 2–5x the usage of standard API rates.

Cline can also use a Claude subscription. Its [Anthropic provider docs](https://docs.cline.bot/provider-config/anthropic) describe a "Claude Code" provider that routes through an installed, signed-in `claude` CLI and draws on your Pro or Max limits instead of API billing.

Claude Code is included in every paid [Claude plan](https://claude.com/pricing): Pro at $20 a month ($17 billed annually), Max at $100 a month with 5x Pro usage, and Ultra at $200 a month with 10x Pro weekly usage. Max and Ultra also include $100 and $200 a month in Claude Platform API credits. Enterprise is $20 per seat per month plus usage at API rates. You can also run Claude Code on pay-as-you-go API billing through a Console account.

| If you want to pay... | Cline | Claude Code |
| --- | --- | --- |
| Nothing for the tool | Yes, free and open source | Requires a paid plan or API billing |
| Per token on your own key | Any supported provider | Anthropic API (Console) |
| A flat monthly fee | ClinePass ($9.99, open models) or a Claude plan via the Claude Code provider | Pro, Max, or Ultra |
| Per seat for a company | Enterprise, custom quote | Team or Enterprise |

## Models

Cline is model-agnostic. Bring keys for Anthropic, OpenAI, Gemini, OpenRouter, DeepSeek, and others, point it at a local runtime, sign in with an OpenAI Codex plan, or use the Cline provider's catalog, which includes some models marked free. Because Plan and Act can use different models, you can mix providers inside one task.

Claude Code runs Claude models: Opus 5.5 and Sonnet 5.5 for most coding, Haiku 5.5 for fast, cheap work, and Fable, which is included on Max and Ultra. Anthropic tunes the harness and the models together, which is a large part of why it needs so little setup.

If you mostly use Claude anyway, the model gap matters less than it looks. Cline with Claude Sonnet 5.5 and Claude Code with Sonnet 5.5 call the same model; the difference is the harness around it.

## MCP: marketplace vs. command line

Both clients support MCP well, with different front doors.

Cline has a built-in [MCP Marketplace](https://docs.cline.bot/mcp/mcp-marketplace). Click the Extensions icon, browse servers by category, and click Install; if a server needs an API key, Cline walks you through where to get it and adds the entry to your settings. For anything not listed, or for full control, you edit `cline_mcp_settings.json`. In the IDE, open it from the MCP Servers icon, then Configure, then Configure MCP Servers. The CLI reads `~/.cline/data/settings/cline_mcp_settings.json` (override it with `CLINE_MCP_SETTINGS_PATH`) and has a `cline mcp` wizard for adding, editing, toggling, and authorizing servers. One detail from Cline's [MCP configuration docs](https://docs.cline.bot/mcp/configuring-mcp-servers): remote servers default to the legacy SSE transport unless you set `"type": "streamableHttp"`.

Claude Code adds servers with `claude mcp add`. Its [MCP docs](https://code.claude.com/docs/en/mcp) define three scopes: local (just you, this project), project (shared with the team through a checked-in `.mcp.json`), and user (you, every project). It also loads tools on demand through tool search, so a long list of servers doesn't fill the context window up front.

If you want to browse and click, Cline's marketplace is friendlier. If you want MCP config checked into the repo for the whole team, Claude Code's project scope is built for that. Our roundups of [MCP servers for VS Code](https://parallel.ai/articles/best-mcp-servers-for-vs-code) and [MCP servers for Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) cover what's worth installing in each.

## Adding live web search to Cline and Claude Code

Cline has a browser tool for fetching and searching, and Claude Code ships WebSearch and WebFetch. A dedicated search server gives either agent ranked, current results with excerpts sized for a context window, which is what you want when it's checking an API that changed last month.

Parallel MCP works in both without an API key. The default endpoint gives the agent `web_search` and `web_fetch`.

In Cline, add this under `mcpServers` in `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "Parallel": {
      "type": "streamableHttp",
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

If Cline reports a "redirect_uri must be https" error, Parallel's [install docs](https://docs.parallel.ai/integrations/mcp/installation) suggest wrapping the URL with `npx -y mcp-remote https://mcp.parallel.ai/mcp` as a local stdio server instead.

In Claude Code, it's one command, then `/mcp` to confirm it connected:

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

For `web_research` and higher rate limits, use `https://mcp.parallel.ai/mcp?login` and sign in, or send a Parallel API key as a Bearer header. To check it works, ask the agent something its training data can't know, such as the breaking changes in a framework release from the last few weeks, and have it cite the URLs it used. The full walkthrough, including a CLI option, is in [how to add free web search to your coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent).

## Which should you choose?

**You want to see and approve each step.** Cline. Per-action approvals in the sidebar, granular auto-approve, and per-action checkpoints make it easy to understand exactly what the agent did.

**You want to delegate a task and come back to a result.** Claude Code. Auto mode, subagents, and the ability to move a session between terminal, desktop, web, and phone suit longer, hands-off work.

**You want to use non-Anthropic models, or pay as little as possible.** Cline. It's free, takes any provider key, and ClinePass gives flat-rate access to open coding models at $9.99 a month.

**You already pay for Claude Pro or Max.** Either works. Claude Code uses the plan natively, and Cline can use it through its Claude Code provider if you prefer Cline's interface.

**You're rolling out to a team.** Claude Code if you want project-scoped MCP config and settings in the repo plus Anthropic's Team or Enterprise admin controls. Cline Enterprise if you need to restrict which inference providers people can use or want centralized billing across many model vendors.

Many developers run both: Cline in the editor for changes they want to watch, and Claude Code in a terminal for the long ones.

## FAQ

### Is Cline better than Claude Code?

Neither wins everywhere. Cline is free, open source, model-agnostic, and shows each action for approval. Claude Code is tuned for Claude models, defaults to autonomous auto mode, and runs across terminal, IDE, desktop, and web. Choose on approval style and model needs.

### Can Cline use my Claude Pro or Max subscription?

Yes. Cline has a Claude Code provider that routes requests through an installed, signed-in Claude Code CLI, so usage counts against your Claude plan limits instead of API token billing. Set the provider to Claude Code in Cline settings and point it at the `claude` binary.

### Is Cline free?

The Cline extension, CLI, and desktop app are free and open source under Apache-2.0. You pay for model inference, either with your own API keys, through the Cline provider at cost, or with the optional $9.99 a month ClinePass. Enterprise features are priced on request.

### Where is cline_mcp_settings.json?

In the VS Code extension, open it from the MCP Servers icon in the Cline panel, then Configure, then Configure MCP Servers. For the Cline CLI, it's at `~/.cline/data/settings/cline_mcp_settings.json`, and you can change the path with the `CLINE_MCP_SETTINGS_PATH` environment variable.

### Can you use Claude Code inside VS Code?

Yes. Claude Code has a VS Code extension that shows proposed changes as inline diffs, along with a JetBrains plugin. It uses the same settings, `CLAUDE.md` files, and MCP servers as the terminal version, so you can move between them.

Give Cline or Claude Code current web results in under a minute with [Parallel MCP](https://parallel.ai/mcp).

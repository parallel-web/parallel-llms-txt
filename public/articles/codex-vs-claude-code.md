# Codex vs. Claude Code: which coding agent should you use in 2026?

Codex vs. Claude Code comes down to which model family, subscription, and safety defaults you want behind an agent that edits your repo from the terminal, IDE, desktop, or cloud. This guide covers pricing and plan limits, default models, sandboxing and approvals, MCP and extensibility, open source status, GitHub integration, built-in web search, and how to add Parallel MCP to both.

## The short answer

Codex and Claude Code are now the same shape of product: an agent that reads your repository, edits files, runs commands, and hands back a diff, available in a terminal, an editor, a desktop app, and the cloud. The differences sit underneath. Codex runs OpenAI's GPT-6 family, ships an Apache-2.0 CLI, sandboxes every local command by default, and is included on every ChatGPT plan down to Free. Claude Code runs Anthropic's Claude models, is proprietary, defaults to Opus 5.5 on paid plans, and starts at Claude Pro.

If you already pay for one of the two subscriptions, the cheapest good answer is usually to try the agent that comes with it first. The rest of this guide explains where the two diverge, so you can tell whether a switch, or a second subscription, is worth it. Everything below was checked against OpenAI's and Anthropic's own docs and pricing pages on November 22, 2026.

## Codex vs. Claude Code at a glance

|  | OpenAI Codex | Anthropic Claude Code |
| --- | --- | --- |
| Surfaces | Codex CLI, IDE extension, Codex inside the ChatGPT desktop app, web, iOS, Codex cloud | Terminal CLI, VS Code and JetBrains extensions, Claude desktop app, claude.ai/code, Claude mobile app |
| Default model | GPT-6.2 Sol in the CLI catalog (as of CLI 0.171.0) | Opus 5.5 on Pro, Max, Ultra, Team, Enterprise, and the API |
| Other models | GPT-6.2 Astra, GPT-6.1 Sol and Terra, GPT-6 Luna; local models via `--oss` | Fable, Sonnet, Haiku via aliases; Claude models only |
| Cheapest plan with the CLI | ChatGPT Plus, $20/month | Claude Pro, $20/month ($17 billed annually) |
| Free option | GPT-6 Luna in the desktop app on Free and Go | None for Claude Code |
| Local sandbox | On by default: workspace writes only, no network | Opt-in OS sandbox for shell commands, plus permission modes |
| Instructions file | AGENTS.md | CLAUDE.md, or AGENTS.md when no CLAUDE.md exists |
| Source | Apache-2.0 on GitHub | Proprietary, under Anthropic's Commercial Terms |
| Built-in web search | Cached OpenAI index by default, live on request | WebSearch (titles and URLs) plus WebFetch |
| MCP config | `~/.codex/config.toml`, shared by CLI, IDE, and desktop app | `claude mcp add`, with local, project, and user scopes |

## What each product includes in November 2026

### Codex

"Codex" covers one agent with several front ends. The [Codex CLI](https://developers.openai.com/codex/cli) is a Rust binary installed with a shell script, npm, or Homebrew. The [IDE extension](https://developers.openai.com/codex/ide) runs in VS Code and editors built on it, such as Cursor. The standalone Codex app was folded into the ChatGPT desktop app on July 9, 2026, per OpenAI's [changelog](https://learn.chatgpt.com/docs/changelog), where Codex is now a view you can set as the default on macOS and Windows, with a Linux preview since August. Codex cloud runs tasks in OpenAI-hosted environments while your laptop is closed, and it powers the GitHub, Slack, and Linear integrations.

The CLI, IDE extension, and desktop app all read the same `config.toml`, so a model choice or MCP server configured once applies everywhere. OpenAI ships CLI releases several times a week; version 0.171.0 landed on November 20.

### Claude Code

Claude Code started as a terminal tool and now runs on the same set of surfaces. Anthropic's [overview](https://code.claude.com/docs/en/overview) lists the CLI, a VS Code extension (which also installs in Cursor), a JetBrains plugin, the Code tab in the Claude desktop app for macOS and Windows (Linux in beta), and cloud sessions at claude.ai/code and in the Claude mobile app. Each surface shares one engine, so your CLAUDE.md files, settings, and MCP servers carry across.

Claude Code leans into moving work between those surfaces. `claude --cloud` sends a task to a cloud VM, `claude --teleport` pulls a cloud session back into your terminal, `/desktop` hands a terminal session to the desktop app for visual diff review, and Remote Control lets you steer a local session from your phone.

## Pricing and plan limits

Both companies bundle their coding agent into a consumer subscription and meter it with a rolling five-hour window plus weekly caps. Prices below are from [OpenAI's Codex pricing page](https://developers.openai.com/codex/pricing), the [ChatGPT Pro tiers article](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-plans), and [Claude's pricing page](https://claude.com/pricing), checked November 22, 2026.

| Tier | ChatGPT (Codex) | Claude (Claude Code) |
| --- | --- | --- |
| Free | $0, GPT-6 Luna in the desktop app, subject to rollout | $0, no Claude Code |
| Entry | Go, $8/month, same Luna access as Free | none |
| Standard | Plus, $20/month: CLI, IDE, web, iOS, cloud, code review | Pro, $20/month or $17/month billed annually |
| Heavy | Pro 100, $100/month | Max, $100/month, 5x Pro usage |
| Heavier | Pro 200, $200/month | Ultra, $200/month, 10x Pro weekly usage |
| Top | Pro 500, $500/month, adds Ultrafast | none |
| Pay as you go | API key at API rates (CLI, SDK, IDE only) | Console API key at API rates |

A few details change the math. OpenAI publishes rough local-message estimates for Plus: 15–160 messages per five hours on GPT-6.1 Sol and 350–3,000 on GPT-6 Luna, and says Pro plans currently have no five-hour limit. Fast mode draws your allowance at 2.5x the Standard rate. Anthropic doesn't publish message counts. Pro gets at least 5x Free's usage per session, Max gets 5x Pro, and Ultra removes the five-hour limit for verified accounts while capping weekly usage at 10x Pro. Max and Ultra also include $100 and $200 a month in API credits.

On both sides, your coding agent shares one pool with everything else in the subscription. Long chats in ChatGPT or Claude eat into the same allowance your terminal sessions use.

For teams, ChatGPT Business and Enterprise include Codex with admin controls, and Claude Enterprise is priced at $20 per seat per month plus usage at API rates. An OpenAI API key unlocks the CLI, SDK, and IDE extension but leaves out cloud features such as GitHub code review and Slack.

## Models

Codex runs OpenAI models. GPT-6.2 Astra and GPT-6.2 Sol arrived in Codex on November 17, with OpenAI positioning Astra for the hardest projects and Sol for everyday coding; CLI 0.171.0 made GPT-6.2 Sol the default catalog selection. GPT-6 Luna is the efficient option and the only model on Free and Go. Codex can also point at local models through `codex --oss` with Ollama or LM Studio, at Amazon Bedrock, or at a custom Responses-compatible provider in `config.toml`.

Claude Code runs Claude models only, but on more clouds. The [model configuration docs](https://code.claude.com/docs/en/model-config) list the `default` model as Opus 5.5 for Pro, Max, Ultra, Team, Enterprise, and API users, with `sonnet`, `haiku`, and `fable` aliases for switching. Fable is billed from usage credits on Pro and can use up to half the weekly limit on Max and Ultra. The `opusplan` alias plans with Opus and executes with Sonnet. You can route Claude Code through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry if your company buys model access there.

## Agent loop, sandboxing, and approvals

This is the clearest design difference.

Codex sandboxes by default. Per OpenAI's [approvals and security docs](https://developers.openai.com/codex/agent-approvals-security), the CLI and IDE extension start in `workspace-write` mode with network access off, enforced by Seatbelt on macOS, bubblewrap plus seccomp on Linux, and MXC on Windows. The default approval policy, `on-request`, lets Codex edit and run commands inside the workspace and asks before it writes elsewhere or touches the network. You can drop to `read-only`, route approvals through an auto-review agent, or remove the sandbox with `--yolo`, which OpenAI labels elevated risk.

Claude Code starts from permissions instead. Its [permission modes](https://code.claude.com/docs/en/permissions) run from Manual (prompts before most edits, shell commands, and network requests) through `acceptEdits` and `plan` to `auto`, where a background classifier checks each action against your request, and `bypassPermissions`. The OS-level [Bash sandbox](https://code.claude.com/docs/en/sandboxing), using Seatbelt on macOS and bubblewrap on Linux and WSL2, is something you turn on with `/sandbox`; once enabled, it can auto-approve shell commands that stay inside the file and domain boundaries you set.

In practice, Codex is safer out of the box for someone who never reads the settings, and Claude Code's auto mode is the smoother experience for someone who wants fewer prompts without granting full access. Both support subagents for splitting work and plan-first workflows.

## Local vs. cloud execution

Both agents run locally by default and offer a hosted option for long tasks. Codex cloud runs in OpenAI-managed containers; the legacy environments separate a networked setup phase from an agent phase that runs offline unless you allow internet access. Cloud tasks count against your plan and may use more of it than local messages.

Claude Code's cloud sessions run in Anthropic-managed VMs with limited network access by default, keep git credentials outside the sandbox behind a proxy, and carry no separate VM charge beyond plan usage. They're available on Pro and above, and Team and Enterprise admins can route them to a self-hosted environment.

## Extensibility: MCP, skills, hooks, and instruction files

The two products have converged here, which makes switching cheaper than it used to be.

- **Instruction files.** Codex reads AGENTS.md, and `/init` generates one. Claude Code reads CLAUDE.md, and since v2.1.277 it also reads AGENTS.md when no CLAUDE.md is present, with a setting to load both. A repository set up with AGENTS.md now works in either agent without edits.
- **Skills.** Both use SKILL.md folders built on the open agent skills format. Codex looks in `.agents/skills`; Claude Code uses `.claude/skills`. Both package skills, MCP servers, and hooks into installable plugins.
- **Hooks.** Codex hooks live in `hooks.json` or `config.toml` and cover events such as PreToolUse, PostToolUse, SessionStart, and Stop, with a trust review before any new hook runs. Claude Code hooks run shell commands around tool calls and session events, and they can approve or block actions.
- **MCP.** Both support local stdio servers and remote Streamable HTTP servers with OAuth. Codex stores servers in `config.toml`; Claude Code scopes them per project, per repo (a shared `.mcp.json`), or per user, and defers MCP tool loading through tool search so large tool sets don't fill the context window.

Our roundups of the [best MCP servers for Codex CLI](https://parallel.ai/articles/best-mcp-servers-for-codex-cli) and the [best MCP servers for Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) have the exact commands for each server.

## Open source status

The Codex CLI is open source under the Apache-2.0 license in the [openai/codex](https://github.com/openai/codex) repository, so you can read the agent loop, audit the sandbox, build from source, or fork it. The models stay closed, and the desktop app and cloud service are OpenAI products.

Claude Code is proprietary. The [anthropics/claude-code](https://github.com/anthropics/claude-code) repository hosts the changelog, plugins, and issue tracker, and its license reads "All rights reserved," with use governed by Anthropic's Commercial Terms. If an inspectable, forkable agent matters to you and you want Claude models, our [OpenCode vs. Claude Code comparison](https://parallel.ai/articles/opencode-vs-claude-code-a-2026-comparison-for-developers) covers that route.

## IDE and GitHub integration

Codex's IDE extension brings open files and selections into the prompt and shows edits in place. On GitHub, you connect a repository in Codex settings, then comment `@codex review` on a pull request; Codex posts a review flagging only P0 and P1 issues and follows a "Code Review Rules" section in your AGENTS.md. Automatic reviews and a deeper `@codex security review` are available too.

Claude Code's VS Code extension offers inline diffs, @-mentions, and plan review, and the JetBrains plugin covers IntelliJ, PyCharm, and WebStorm. On GitHub, running `/install-github-app` sets up the [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) workflow, after which `@claude` in an issue or PR comment can implement changes and push commits. Anthropic also sells automatic Code Review and Auto-fix for pull requests through the Claude GitHub App. If you're weighing an editor-first tool instead, see [Claude Code vs. Cursor](https://parallel.ai/articles/claude-code-vs-cursor-how-to-choose-your-ai-coding-tool-in-2026).

## Built-in web search

Both agents can search the web without any setup, and they do it differently.

Codex's [web search](https://developers.openai.com/codex/web-search) is a hosted tool that defaults to cached mode: results come from an OpenAI-maintained index instead of live page fetches, which OpenAI notes lowers prompt-injection risk. `codex --search` or `web_search = "live"` switches to live results, and full-access mode defaults to live. Search runs outside the command sandbox, so it works with network access off, and hooks don't fire on it.

Claude Code has two tools, described in its [tools reference](https://code.claude.com/docs/en/tools-reference). WebSearch queries Anthropic's search backend and returns titles and URLs only. WebFetch then reads a page; on claude.ai accounts a Haiku-based subagent reads it and answers Claude's question about it, and WebFetch caches pages for 15 minutes. WebSearch isn't available on Amazon Bedrock. We've compared the built-in tool against a dedicated engine in [Claude web search vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel).

For quick lookups, both built-ins are fine. They're weakest when a task needs a lot of current text in one pass, such as a changelog plus three docs pages for the exact version in your lockfile, because the cached index may lag and a titles-and-URLs result needs extra fetches.

## Adding Parallel MCP to Codex and Claude Code

A dedicated search tool over MCP gives both agents the same web layer, which also makes a side-by-side trial of the two agents fairer. [Parallel MCP](https://parallel.ai/mcp) is a hosted server at `https://mcp.parallel.ai/mcp`. Without an account or key it exposes `web_search`, `web_fetch` (up to 20 URLs per call, PDFs and JavaScript-heavy pages included), and `web_decisions`. Signing in or adding an API key adds `web_research` and higher rate limits, billed at Search API rates of $1 per 1,000 requests for fast and turbo modes.

In Codex, add it with the CLI, which writes the entry to `~/.codex/config.toml`:

```bash
# Keyless: web_search, web_fetch, web_decisions
codex mcp add parallel --url https://mcp.parallel.ai/mcp

# Sign in with OAuth to add web_research
codex mcp add parallel-login --url 'https://mcp.parallel.ai/mcp?login'
codex mcp login parallel-login
```

To use an API key instead, edit `config.toml` directly and read the key from an environment variable:

```toml
[mcp_servers.parallel]
url = "https://mcp.parallel.ai/mcp"
bearer_token_env_var = "PARALLEL_API_KEY"
```

In Claude Code, use the HTTP transport:

```bash
# Keyless
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp

# With an API key
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp \
  --header "Authorization: Bearer $PARALLEL_API_KEY"
```

For the OAuth route in Claude Code, use `'https://mcp.parallel.ai/mcp?login'` as the URL, then run `/mcp` and finish sign-in in the browser. Restart Codex after adding a server, since it reads config at startup, and check `/mcp` in either agent to confirm the tools loaded. A Parallel account comes with up to $80 in free credits plus $5 a month with a card on file. Our guide to [adding free web search to a coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent) covers other clients.

## Which should you choose?

- **You already pay for ChatGPT Plus or Pro.** Start with Codex. The CLI, IDE extension, cloud tasks, and PR review are included, and the default sandbox means you can let it run in a repo with little setup.
- **You already pay for Claude Pro, Max, or Ultra.** Start with Claude Code. Opus 5.5 is the default, and the plan's usage pool covers terminal, desktop, and cloud sessions alike.
- **You want to spend nothing.** Codex on ChatGPT Free or Go gives you GPT-6 Luna in the desktop app. Claude Code has no free tier.
- **You need to audit or fork the agent.** Codex's CLI is Apache-2.0. Claude Code isn't open source.
- **Your company standardizes on Bedrock, Foundry, or Google Cloud.** Claude Code has the widest first-party cloud routing for Claude models; Codex supports Bedrock and custom providers for OpenAI-compatible endpoints.
- **You want long unattended runs with minimal prompting.** Both work. Claude Code's auto mode reviews each action with a classifier; Codex's auto-review routes only escalation requests to a reviewer agent and keeps the sandbox in place.
- **You want to try both.** Put shared instructions in AGENTS.md and give both agents the same MCP servers, then run the same tickets through each for a week.

For another angle on terminal agents, our [Gemini CLI vs. Claude Code comparison](https://parallel.ai/articles/gemini-cli-vs-claude-code-which-terminal-coding-agent-should-you-use) covers Google's option.

## FAQ

### Is Codex better than Claude Code?

Neither wins across the board. Codex is open source, sandboxed by default, and included on every ChatGPT plan. Claude Code runs Opus 5.5 by default, offers more ways to move sessions between devices, and routes through more cloud providers. The better choice usually follows the subscription and model family you already prefer.

### Is Codex CLI free?

The CLI itself is free and Apache-2.0 licensed, but it needs a model. Signing in with ChatGPT Plus ($20/month) or higher gives you the CLI with plan usage, and an OpenAI API key bills per token. ChatGPT Free and Go include Codex only in the desktop app with GPT-6 Luna, subject to rollout.

### Can Claude Code use OpenAI models, or Codex use Claude?

Not as a supported setup. Claude Code runs Claude models, whether through Anthropic or a cloud provider such as Bedrock. Codex runs OpenAI models by default and supports local models and custom providers that speak OpenAI's Responses API.

### Does Claude Code read AGENTS.md?

Yes. Since v2.1.277, Claude Code reads AGENTS.md as project instructions when there's no CLAUDE.md in the working directory or above it. A setting lets it load both files.

### Do Codex and Claude Code share usage with ChatGPT and Claude chat?

Yes. Codex usage shares limits with ChatGPT Work on your plan, and Claude Code draws from the same pool as Claude on web, desktop, and mobile. Heavy chat use leaves less for coding.

### How do I add web search to Codex or Claude Code?

Both have built-in search. For denser results and a separate fetch tool, add an MCP server: `codex mcp add parallel --url https://mcp.parallel.ai/mcp` in Codex, or `claude mcp add --transport http parallel https://mcp.parallel.ai/mcp` in Claude Code. Both work without an API key.

Give whichever agent you choose current web context with [Parallel MCP](https://parallel.ai/mcp): one command, no key, and the same tools in both.

# GitHub Copilot CLI vs. Claude Code: what Copilot CLI is and how it compares in 2026

Copilot CLI is GitHub's terminal coding agent, and picking between it and Claude Code mostly depends on how you want to pay, which models you want, and how close to GitHub your work lives. This guide covers what Copilot CLI does today, pricing and limits, models and permissions, MCP and context files, GitHub workflows, and adding live web search to both agents.

## What GitHub Copilot CLI is in 2026

GitHub Copilot CLI is GitHub's agentic coding tool for the terminal. You run `copilot` inside a project folder, describe a task in plain language, and the agent reads files, edits code, runs shell commands, and works with issues and pull requests on GitHub.com. Tutorials that mention `gh copilot suggest` describe the older GitHub CLI extension, a separate tool from the standalone `copilot` agent.

GitHub's [overview page](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) lists Linux, macOS, and Windows (PowerShell and WSL) as supported platforms. There are two ways to use it: an interactive session you steer turn by turn, and a programmatic mode (`copilot -p "..."`) that completes one prompt and exits, which is what you use in scripts and CI.

### Installing and signing in

The [install guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) offers npm (Node.js 22 or later), Homebrew, WinGet, and an install script. Any one of these works:

```bash
npm install -g @github/copilot
brew install --cask copilot-cli
winget install GitHub.Copilot
curl -fsSL gh.io/copilot-install | bash
```

Then start a session with `copilot` and run `/login`, or run `copilot login` first. On first launch in a folder, Copilot asks you to confirm that you trust the files there, because it may read, modify, and execute anything in and below that directory. For CI, the docs describe a fine-grained personal access token with the Copilot Requests permission.

### Which plans include it, and how usage is billed

Copilot CLI is included in every Copilot plan, including Free, according to GitHub's [plans page](https://github.com/features/copilot/plans) (pricing checked November 22, 2026). Organization users also need their admin to leave the CLI policy enabled.

The billing model changed this year. Before June 1, 2026, Copilot counted premium requests, with a multiplier per model. Since then, [usage-based billing](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans) applies to all plans: every interaction consumes GitHub AI Credits based on the tokens processed and the model used, at 1 credit = $0.01. Each CLI prompt draws from the same monthly pool as Copilot Chat, the cloud agent, and code review. Only some Pro and Pro+ subscribers on older annual plans remain on [legacy premium-request billing](https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/what-changed-with-billing) until their term ends.

Inside a session, `/usage` shows how many credits the session has consumed, and `/context` breaks down where your context window is going.

### Models

The [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) lists `claude-sonnet-5.5` as the default model for general-purpose coding. You can switch with `/model` mid-session, set a default with `/config model`, or pass `--model` on the command line. The list as of November 2026 includes Claude Opus 5.5 and Haiku 5.5, several GPT-6 models (Sol, Terra, Astra, Luna), GPT-5.3-Codex, and Gemini 3.8 Flash for fast responses, plus `auto`, which picks a model for you, and Copilot Fusion, which routes each prompt across models at a chosen effort tier.

What you can pick depends on the plan. Free and Student accounts get [auto model selection only](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing). Pro adds model selection, and the plans page lists Opus among the premium models included from Pro+ upward. You can also point the CLI at your own provider (any OpenAI-compatible endpoint, Azure OpenAI, Anthropic, or a local Ollama model) through environment variables.

### Agent modes, custom agents, and delegation

Press Shift+Tab in a session to switch between the default mode, which asks before risky actions, and plan mode, which asks clarifying questions and writes a plan before touching code. Autopilot (`--mode autopilot`) keeps working toward the goal without waiting for you between steps, and `--plan --mode autopilot` plans first and then runs.

Copilot CLI ships with built-in agents it delegates to on its own, such as Explore for codebase questions and Task for running tests and builds. You can write your own as Markdown agent profiles in `~/.copilot/agents` (all projects), `.github/agents` (one repository), or the `/agents` folder of an organization's `.github-private` repository, per the [usage guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview).

For work you don't want to watch, `/delegate` (or a prompt prefixed with `&`) hands the task to Copilot cloud agent on GitHub. It commits your unstaged changes to a new branch, opens a draft pull request, keeps working in the background, and requests your review when done, as described in the [delegation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca).

### MCP support

The CLI comes with the GitHub MCP server already configured, which is how it lists your pull requests, files issues, and merges PRs. You add more servers with `/mcp add` inside a session, with the `copilot mcp add` subcommand, or by editing `~/.copilot/mcp-config.json`. Project-level servers can live in `.mcp.json` or `.github/mcp.json` and load only after you trust the folder, per the [MCP guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers). One plan detail matters here: GitHub's plans table lists MCP server integration, custom instructions, and custom agents for Pro and above.

## Claude Code in brief

Claude Code is Anthropic's terminal coding agent, and most readers comparing the two already know it. It runs only Claude models, starts each session on Claude Opus 5.5 by default on paid plans according to the [model configuration docs](https://code.claude.com/docs/en/model-config), and works through the same loop of reading, editing, running commands, and asking permission. The rest of this guide puts the two side by side.

## Copilot CLI vs. Claude Code at a glance

|  | GitHub Copilot CLI | Claude Code |
| --- | --- | --- |
| Entry price | Free plan includes the CLI; Pro $10/month | Pro $20/month ($17 billed annually); no free tier for Claude Code |
| How usage is metered | GitHub AI Credits by tokens and model; $15 to $200 of credits a month on individual plans | Shared 5-hour and weekly limits across Claude chat and Claude Code |
| Default model | Claude Sonnet 5.5 | Claude Opus 5.5 |
| Model choice | Claude, GPT, and Gemini models, Auto, Fusion, or your own provider | Claude models (Opus, Sonnet, Haiku, Fable) |
| Modes | Default, plan, autopilot | Manual, accept edits, plan, auto, bypass |
| MCP config | `copilot mcp add`, `~/.copilot/mcp-config.json`, `.mcp.json`, `.github/mcp.json` | `claude mcp add`, `~/.claude.json`, `.mcp.json` |
| Instruction files read | `copilot-instructions.md`, `*.instructions.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | `CLAUDE.md`, or `AGENTS.md` when no `CLAUDE.md` exists |
| GitHub integration | Built-in GitHub MCP server, `/delegate` to cloud agent, `/pr` | `gh` CLI or GitHub's MCP server, Claude Code GitHub Actions |
| Web built-ins | `web_fetch`, `web_search` | `WebFetch`, `WebSearch` |

## Pricing and usage limits

Copilot's individual plans as of November 22, 2026: Free at $0 with a limited allowance, Pro at $10 a month with $15 of included credits, Pro+ at $39 with $70, and Max at $100 with $200. Part of each allowance is a "flex allotment" that GitHub says may change over time; the base credits match the subscription price. Business is $19 per user per month with 1,900 credits and Enterprise $39 with 3,900, pooled across the organization, per GitHub's [plan guide for enterprises](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan). When credits run out, you can set a dollar budget and keep going at $0.01 a credit, switch to a cheaper model, or wait for the reset on the first of the month.

Claude Code is included in every paid Claude plan listed on Anthropic's [pricing page](https://claude.com/pricing): Pro at $20 a month ($17 with annual billing), Max at $100 with 5x Pro usage, and Ultra at $200 with 10x Pro weekly usage and no 5-hour limit for verified accounts. Enterprise is $20 per seat plus usage at API rates. The free Claude plan does not include Claude Code. Limits reset on a rolling 5-hour window plus a weekly cap, and your terminal sessions share that pool with Claude chat. You can also run Claude Code on pay-as-you-go API credits, Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.

The practical difference is predictability. Copilot shows a running dollar figure, so a long Opus session visibly costs more than a quick Haiku question, and you can cap overage with a budget. Claude Code's subscription doesn't bill per token, so heavy users on Max or Ultra pay a fixed monthly amount and plan around the 5-hour and weekly limits instead of a dollar meter.

## Models

This is where Copilot CLI has the wider menu. A single Copilot subscription gives you Claude Sonnet 5.5 and Opus 5.5 next to OpenAI's GPT-6 family and Google's Gemini models, and you can switch per session or assign a model to a custom agent. Gemini 3.8 Flash is a fast option for lightweight work.

Claude Code stays within the Claude family, which is the point for many of its users. You get Opus 5.5 by default, `sonnet` or `haiku` for cheaper subagents, and `fable` for the hardest problems (paid with usage credits on Pro, and up to half your weekly limit on Max and Ultra). If you mainly want Claude models in a terminal agent, both tools give you that; Copilot just lets you mix in others.

## Permissions and approvals

Both tools ask before running anything that changes files or executes commands, and both let you widen that.

In Copilot CLI, an approval prompt offers three choices: yes once, yes for the rest of the session, or no with feedback. Flags set policy up front: `--allow-tool='shell(git)'`, `--deny-tool='shell(rm)'`, `--allow-tool='write'`, or `--allow-all-tools`, with deny rules winning. In a session, `/permissions assisted` lets a model approve requests it judges safe, `/yolo` approves everything, and `/sandbox enable` restricts filesystem and network access. `copilot --cloud` runs the whole session in a GitHub-hosted sandbox you can follow from other Copilot clients. The [security section of the overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) covers each option.

Claude Code uses modes plus rules. The [permissions docs](https://code.claude.com/docs/en/permissions) list Manual (prompt on first use of each tool), accept edits, plan, auto (approves tool calls after background safety checks), and bypass. Allow, ask, and deny rules go in `settings.json`, deny rules hold in every mode, and a sandbox can confine shell commands on macOS, Linux, and WSL2.

The two designs land in similar places. Copilot's flags are convenient for one-off scripted runs, while Claude Code's checked-in settings files make it easier to share one policy across a team.

## MCP configuration

Both agents support remote HTTP and local stdio MCP servers with nearly identical commands. Copilot writes user servers to `~/.copilot/mcp-config.json` and reads project servers from `.mcp.json` or `.github/mcp.json`. Claude Code stores local and user servers in `~/.claude.json` and project servers in a committed `.mcp.json`, chosen with `--scope local`, `project`, or `user`, per its [MCP docs](https://code.claude.com/docs/en/mcp).

Because both read a project-root `.mcp.json` with an `mcpServers` object, a team that commits one file gets the same servers in both tools. The difference out of the box is GitHub: Copilot has the GitHub MCP server preconfigured, while Claude Code users add GitHub's remote server with a personal access token. For server picks, see [the best Claude Code MCP servers](https://parallel.ai/articles/best-mcp-servers-for-claude-code) and [the best MCP servers for VS Code and GitHub Copilot](https://parallel.ai/articles/best-mcp-servers-for-vs-code), whose config also works in Copilot CLI.

## Context files: AGENTS.md, copilot-instructions.md, and CLAUDE.md

Copilot CLI accepts several instruction formats. Per its [custom instructions guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), it loads `.github/copilot-instructions.md`, path-scoped `.github/instructions/**/*.instructions.md` files, `AGENTS.md`, `CLAUDE.md` (including `.claude/CLAUDE.md`), `GEMINI.md`, and user-level files in `~/.copilot`. It combines all of them rather than picking one, so conflicting instructions are your problem to avoid. `/instructions` shows which files loaded.

Claude Code's primary file is `CLAUDE.md` at the managed, user, or project level. According to its [memory docs](https://code.claude.com/docs/en/memory), it reads `AGENTS.md` when there's no `CLAUDE.md` in your working directory or above it, and a Project instructions setting can load both. You can also put `@AGENTS.md` inside `CLAUDE.md` to import it.

If your team uses both tools, keep shared rules in `AGENTS.md`. Copilot reads it directly, and Claude Code reads it either by default or through the import.

## GitHub integration

This is Copilot CLI's home ground. With the GitHub MCP server built in, you can ask it to list your open PRs, review a pull request by URL, file an issue, or create a GitHub Actions workflow and open the PR, and it acts as you. `/pr` manages the current branch's pull request, including `auto`, which keeps working until checks pass. `/delegate` moves long tasks to the cloud agent so your terminal stays free.

Claude Code reaches GitHub through the `gh` CLI or GitHub's MCP server, which covers the same day-to-day operations once set up. Its distinct strength is [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions): the `anthropics/claude-code-action` workflow runs Claude on pull request events, schedules, or `@claude` mentions, with the same CLI arguments you use locally.

## Web search and fetch

Both tools can read the web without extra setup. Copilot CLI has a `web_fetch` tool that returns pages as Markdown, governed by `allowed_urls` and `denied_urls` patterns, and a `web_search` tool; the [tool access docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools) show how to exclude both. Claude Code has `WebSearch` and `WebFetch`, each requiring approval except for a built-in list of documentation domains.

Built-in tools are fine for checking a doc page. For coding agents that research often (current library versions, changelogs, error messages that appeared last week), you may want one search backend shared across every tool you use, with results already compressed for a model's context.

## Giving both agents live web access with Parallel MCP

The [Parallel MCP](https://parallel.ai/mcp) server at `https://mcp.parallel.ai/mcp` gives any MCP client `web_search`, `web_fetch`, and `web_decisions` tools with no API key or sign-in. Sign in through `https://mcp.parallel.ai/mcp?login` to add `web_research` for multi-step questions. Since both agents speak MCP over HTTP, the setup is one command each.

Copilot CLI:

```bash
copilot mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

Or add it to `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "parallel": {
      "type": "http",
      "url": "https://mcp.parallel.ai/mcp",
      "tools": ["*"]
    }
  }
}
```

To skip approval prompts for its tools in a scripted run, add `--allow-tool='parallel'`.

Claude Code:

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

Add `--scope project` to write it into `.mcp.json` for your team, which Copilot CLI will also pick up. Run `/mcp` in either tool to confirm the server shows as connected. The [free web search setup guide](https://parallel.ai/articles/add-free-web-search-to-coding-agent) covers a test prompt and the common errors.

## Which should you choose?

- **You already pay for Copilot or work mostly in GitHub.** Start with Copilot CLI. It's included in your plan, the GitHub MCP server is preconfigured, and `/delegate` turns a terminal prompt into a draft PR.
- **You want Claude models with a predictable monthly bill for heavy use.** Claude Code on Max or Ultra gives you Opus 5.5 by default under a fixed subscription instead of a per-token meter.
- **You want to compare models from different vendors on the same task.** Copilot CLI, because one subscription covers Claude, GPT-6, and Gemini models and `/model` switches in place.
- **You want to try a terminal agent for $0.** Copilot Free includes the CLI with auto model selection. Claude Code needs a paid plan or API credits.
- **You automate review and maintenance in CI.** Both work. Claude Code GitHub Actions is a ready-made workflow, and Copilot CLI's `-p` mode with `--allow-tool` flags drops into any CI script.
- **Your team uses both.** Commit one `AGENTS.md` and one `.mcp.json`, and both agents pick up the same instructions and servers.

For more head-to-heads, see [Gemini CLI vs. Claude Code](https://parallel.ai/articles/gemini-cli-vs-claude-code-which-terminal-coding-agent-should-you-use) and [OpenCode vs. Claude Code](https://parallel.ai/articles/opencode-vs-claude-code-a-2026-comparison-for-developers).

## FAQ

### Is GitHub Copilot CLI free?

Yes, with limits. The Copilot Free plan includes the CLI with a limited monthly AI Credits allowance and auto model selection only. Paid plans start at $10 a month for Pro, which adds model choice, MCP server integration, and custom agents (pricing checked November 22, 2026).

### Does Copilot CLI still use premium requests?

No, for most users. Since June 1, 2026, Copilot bills every plan in GitHub AI Credits based on tokens and model, at $0.01 per credit. Only some Pro and Pro+ subscribers on older annual plans stay on premium requests until their term ends.

### Can Copilot CLI use Claude models?

Yes. Claude Sonnet 5.5 is the CLI's default model, and Opus 5.5 and Haiku 5.5 are in the `/model` list, with Opus available from Pro+ upward. Usage is billed in AI Credits at each model's rate.

### Does Claude Code read AGENTS.md, and does Copilot CLI read CLAUDE.md?

Both do. Claude Code reads `AGENTS.md` when no `CLAUDE.md` exists, or alongside it if you change the Project instructions setting. Copilot CLI reads `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, and its own `copilot-instructions.md` files and combines them.

### How do I add an MCP server to Copilot CLI?

Run `copilot mcp add --transport http NAME URL` from your shell, use `/mcp add` inside a session, or edit `~/.copilot/mcp-config.json`. For a repository-wide setup, commit a `.github/mcp.json` or `.mcp.json` file.

### Can I use Claude Code through a GitHub Copilot subscription?

GitHub's plans page lists access to third-party agents, including Claude Code and Codex, from Copilot Pro upward, and that usage draws on your AI Credits. Running Claude Code as a standalone terminal tool still needs a Claude plan or API account.

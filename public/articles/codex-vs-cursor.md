# Codex vs. Cursor: agent or AI editor in 2026?

Codex versus Cursor is a choice between OpenAI's coding agent, which you hand tasks to from a terminal, app, or pull request, and an AI-native editor you work inside while its agent edits next to you. This guide covers how each one works, pricing and limits as of November 2026, models, review and cloud features, MCP and privacy settings, and how to give both live web access.

## The short answer

Pick Cursor if most of your day happens inside an editor and you want to watch and steer every change. Pick Codex if you'd rather describe a task, let an agent run it in a sandbox or in the cloud, and review the diff afterward. Plenty of developers end up with both, and OpenAI makes that easy: the Codex extension installs in Cursor the same way it installs in VS Code.

Both products moved a lot in 2026. Codex now lives inside the ChatGPT desktop app, runs on the GPT-6 family, and shares its usage pool with ChatGPT Work. Cursor became part of SpaceX in August and has been sold through The X Subscription since October 12, with Grok and Composer models in the included pool and third-party models billed at API list price.

## What each one is

**Cursor** is an AI-native code editor built on the VS Code codebase. The AI sits in the editing loop: Tab completion predicts your next edit, the Agent panel plans and edits across files while you watch the diffs land, and Plan and Ask modes let you think before anything changes. Over the past year Cursor has grown outward from the editor with [Cloud Agents](https://cursor.com/help/ai-features/background-agents) (formerly Background Agents), a terminal agent called [Cursor CLI](https://cursor.com/docs/cli/overview), the Bugbot PR reviewer, and a Slack integration. The editor is still the center of gravity.

**Codex** is OpenAI's coding agent, and it has no editor of its own. It reaches you through several front doors that share one configuration file: the Codex CLI in your terminal, the [IDE extension](https://developers.openai.com/codex/ide) for VS Code, Cursor, Windsurf, and VS Code Insiders (Xcode and JetBrains IDEs have their own integrations), the Codex view in the ChatGPT desktop app on macOS and Windows, Codex cloud for tasks that run on OpenAI's machines, and code review on GitHub. You describe an outcome and Codex reads the repo, edits, runs commands inside a sandbox, and reports back.

Cursor assumes you're at the keyboard. Codex assumes you might not be.

## Codex vs. Cursor at a glance

|  | Codex | Cursor |
| --- | --- | --- |
| What it is | Coding agent with CLI, IDE extension, desktop app, cloud, and GitHub surfaces | AI-native editor (VS Code-based) plus CLI and Cloud Agents |
| Cheapest paid plan | ChatGPT Plus, $20/month | Plus, $8/month (Cursor models only) |
| Plan that unlocks cloud agents and PR review | Plus ($20) | Premium ($30) |
| Top individual plan | Pro at $100, $200, or $500/month | Ultra, $200/month |
| Models | OpenAI only (GPT-6.2 Sol and Astra, GPT-6.1 Sol and Terra, GPT-6 Luna, and others) | Grok 4.7/4.6/4.5 and Composer 2.5 in the pool; Claude, GPT, Gemini, and others at API list price on Premium and up |
| Usage meter | Five-hour windows plus possible weekly limits on Plus; no five-hour limit on Pro | One weekly pool shared across editor, CLI, Cloud Agents, and Grok apps |
| PR review | Codex code review (`@codex review`, automatic reviews) | Bugbot (`cursor review` or `bugbot run`, Autofix) |
| MCP config | `config.toml` or `codex mcp add` | `mcp.json` or one-click install from the Marketplace |
| Built-in web search | Cached index by default; live with `--search` | Web tool in Agent |
| Training opt-out | Data controls toggle on personal plans; off by default on Business and Enterprise | Privacy Mode; on by default for teams |

Pricing checked November 22, 2026.

## Pricing and usage limits

### Codex

Codex has no separate subscription. It's included with ChatGPT plans, and according to [OpenAI's Codex pricing page](https://developers.openai.com/codex/pricing), ChatGPT Work and Codex draw from the same usage, credits, and limits.

- **Free ($0) and Go ($8/month):** GPT-6 Luna at Standard speed in the desktop app, subject to rollout.
- **Plus ($20/month):** Codex on the web, in the CLI, in the IDE extension, and on iOS, plus cloud integrations such as automatic code review and Slack. GPT-6.1 Sol and GPT-6 Luna are included, and you can extend usage with ChatGPT credits.
- **Pro ($100, $200, or $500/month):** everything in Plus, with Ultrafast mode on the $500 tier. OpenAI says Pro plans "currently have no five-hour limit," though a weekly limit can still apply.
- **API key:** Codex in the CLI, SDK, and IDE extension at [API token prices](https://developers.openai.com/api/docs/pricing), with no cloud features such as GitHub review or Slack.

Plus limits are estimates per five-hour window, and they depend on the model: 15–160 local messages on GPT-6.1 Sol, 35–285 on GPT-6.1 Terra, and 350–3,000 on GPT-6 Luna. Cloud tasks can use more of the allowance than local messages. Fast mode draws included usage at 2.5x the Standard rate.

### Cursor

Cursor's [pricing page](https://cursor.com/pricing) and [Models & Pricing docs](https://cursor.com/docs/models-and-pricing) list The X Subscription tiers, which also bundle Grok and X Premium features:

- **Free ($0):** Agent and Chat with limited usage.
- **Plus ($8/month):** Cursor's own models (Grok 4.7, 4.6, 4.5, and Composer 2.5) at fixed settings, with Fast off and medium effort. No Auto, Cloud Agents, Automations, Bugbot, third-party models, or your own API keys.
- **Premium ($30/month):** 4x Plus usage, plus Cloud Agents and Automations, Bugbot, Origin code hosting, and third-party models at API list price from prepaid credit.
- **Super ($100/month)** and **Ultra ($200/month):** 15x and 50x Plus usage.
- **Teams:** $30, $100, or $200 per seat per month, matching the individual tiers.

The included pool refreshes weekly and is shared across Agent in the editor, the CLI, Cloud Agents, Grok Bot, and the Grok apps. Third-party model calls sit outside that pool and are charged per token. Bugbot also moved to usage-based billing in 2026; Cursor's [May announcement](https://cursor.com/blog/may-2026-bugbot-changes) put the average run at $1.00 to $1.50. Existing Pro, Pro+, and Ultra subscribers can keep their legacy plans.

The two meters reward different habits. On Cursor, staying on Grok and Composer keeps you inside a flat fee, and reaching for Claude or GPT models turns into metered spend. On Codex every model is included, and the cost of a heavier model shows up as fewer messages per window.

## Models

Codex runs OpenAI models only. As of November 2026 the [Codex models page](https://developers.openai.com/codex/models) recommends Astra for the hardest end-to-end work, GPT-6.1 Sol for long-running work at lower cost, GPT-6.1 Terra for fast writing and visual tasks, and Luna for focused, high-volume jobs. On November 17 the [changelog](https://developers.openai.com/codex/changelog) added GPT-6.2 Astra and GPT-6.2 Sol, and OpenAI says GPT-6.2 Sol completes more tasks on the same paid plan than GPT-6.1 Sol. You switch with `/model` in the CLI, `codex -m`, or a `model` entry in `config.toml`. API-key sessions can use whatever models your key has access to.

Cursor is multi-model. Its own Grok and Composer models make up the included pool, and Grok 4.7 was trained jointly by Cursor and SpaceXAI. On Premium and above you can also select models from Anthropic, OpenAI, Google, Moonshot, Meta, and others at their API list prices. That helps when you want to compare two models on the same task without leaving the editor. One limit on the cheaper tier is spelled out in the docs: Plus doesn't include third-party models at all.

## Workflow: steering in the editor or delegating a task

Cursor's loop is short. You type, Tab suggests, you accept or ignore. When you ask the Agent for something larger, it edits files in place and you review inline diffs as they appear, which keeps you close to the code and makes it easy to catch a wrong turn early. For work you want off your machine, you can hand a conversation to a Cloud Agent, including from the CLI by prefixing a message with `&`.

Codex starts from the other end. In the CLI or desktop app you write a task, and the agent works through it under a sandbox and approval policy you choose: read-only, workspace-write, or full access. The desktop app adds Git worktrees so several tasks can run side by side without stepping on each other, and Codex cloud runs tasks on OpenAI's machines while your laptop is closed. You come back to a diff, a summary, and often a pull request.

A UI tweak you can see is quicker in Cursor because the feedback loop is a keystroke. A dependency upgrade across forty files is often quicker to delegate.

Both tools read `AGENTS.md`. Codex uses it for project instructions and review rules, and the [Cursor CLI](https://cursor.com/docs/cli/using) applies `AGENTS.md` and `CLAUDE.md` alongside `.cursor/rules`. A team running both can keep one instruction file.

## Cloud agents, code review, and pull requests

Cursor's [Cloud Agents](https://cursor.com/for/cloud-agents) run on their own machines with a full copy of the repo. They test their changes, attach screenshots and videos to the PR, and can be started from the editor, the CLI, cursor.com/agents, mobile, or Slack by mentioning `@cursor`. They need Premium or higher.

[Bugbot](https://cursor.com/docs/bugbot) is Cursor's PR reviewer. It runs on every PR update or when someone comments `cursor review` or `bugbot run`, and follows project rules in `.cursor/BUGBOT.md`. Autofix can spawn a Cloud Agent to push a fix to a new branch or to the PR branch. Bugbot works with GitHub, GitLab, Bitbucket, Azure DevOps, and Cursor's own Origin hosting, and you can run it locally with `/review-bugbot` before pushing.

Codex's [GitHub code review](https://developers.openai.com/codex/third-party/github) is included from Plus up. Comment `@codex review` on a PR, or turn on automatic reviews so every new PR gets one. On GitHub, Codex flags only P0 and P1 issues to keep comments focused, and you can add a `## Code Review Rules` section to the nearest `AGENTS.md`. GitLab merge request support is in preview. Locally, `/review` in the CLI checks your working tree before you commit.

The difference here is mostly packaging. Codex review comes with the ChatGPT plan you already pay for. Bugbot is billed per run from your Cursor usage, has more repository hosts, and can fix what it finds without you opening the editor.

## MCP support and configuration

Both tools support local stdio servers and remote Streamable HTTP servers with OAuth.

Codex keeps MCP servers in `~/.codex/config.toml`, or in `.codex/config.toml` for a trusted project, under `[mcp_servers.<name>]` tables. The [Codex MCP docs](https://developers.openai.com/codex/mcp) note that the desktop app, CLI, and IDE extension share this file, so one setup covers all three. `codex mcp add` writes the entry for you, `codex mcp login <name>` runs OAuth, and per-server options include `bearer_token_env_var`, `enabled_tools`, and timeouts.

Cursor reads `~/.cursor/mcp.json` globally or `.cursor/mcp.json` per project, with `command` entries for stdio and `url` entries for remote servers. The [Cursor MCP docs](https://cursor.com/docs/context/mcp) cover one-click installs from the Cursor Marketplace, `${env:NAME}` interpolation, and static OAuth credentials. The CLI uses the same `mcp.json`, and Enterprise admins can allowlist which servers and tools the team may run.

One quirk matters if you use both: the Codex extension inside Cursor reads `config.toml`, while Cursor's own Agent reads `mcp.json`. Configure a server in both places if you want both agents to have it. For server picks, see our lists of the [best MCP servers for Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor) and the [best MCP servers for Codex CLI](https://parallel.ai/articles/best-mcp-servers-for-codex-cli).

## Privacy and data controls

Cursor's [Privacy Mode](https://cursor.com/data-use) keeps your code out of training by Cursor and its model providers, and Cursor says it holds zero data retention agreements with providers when the mode is on. Privacy Mode is on by default for team members, and admins can enforce it so members can't turn it off. With Privacy Mode off, Cursor may use codebase data and prompts to improve its features and train its models.

For Codex, it depends on how you sign in. OpenAI's [data controls article](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) says data sharing is on by default for personal Free, Plus, and Pro accounts; you turn it off with **Improve the model for everyone** under Settings > Data controls, and that setting covers Codex conversations. ChatGPT Business, Enterprise, and Edu workspaces and the API are excluded from training by default, per OpenAI's [business data page](https://openai.com/business-data).

## Web search and docs lookup

Both agents can search the web, but they handle it differently.

Codex enables web search by default for local work and serves results from a cached, OpenAI-maintained index instead of fetching live pages. The [config docs](https://developers.openai.com/codex/config-file/config-basic) say this reduces exposure to prompt injection from arbitrary pages. For fresh results, start Codex with `--search` or set `web_search = "live"`; full-access sandbox modes default to live. In Codex cloud, agents have no internet access while they run unless an admin turns it on, optionally with a domain allowlist.

Cursor's Agent has a [Web tool](https://cursor.com/docs/agent/overview) that writes search queries and runs them, alongside a browser tool for checking UI changes. In the CLI, web searches ask for approval unless you turn on the Auto-Accept Web Search permission, which is off by default.

Built-in search covers a lot. When you want results shaped for an agent's context window, full-page fetches of docs and changelogs, or the same web source in every tool your team uses, an MCP server is the usual route.

## Adding Parallel MCP to Codex and Cursor

[Parallel MCP](https://parallel.ai/mcp) is a hosted server at `https://mcp.parallel.ai/mcp`. Without a key or sign-in it gives an agent `web_search`, `web_fetch`, and `web_decisions` for free. Signing in with OAuth (or using an API key) adds `web_research` for longer, multi-source questions. Disclosure: we make it.

In Codex, one command registers it for the CLI, the IDE extension, and the desktop app:

```bash
# Keyless: web_search, web_fetch, web_decisions
codex mcp add parallel --url https://mcp.parallel.ai/mcp

# Sign in with OAuth to add web_research
codex mcp add parallel --url 'https://mcp.parallel.ai/mcp?login'
```

If you prefer to edit the file directly, the same entry in `~/.codex/config.toml` looks like this:

```toml
[mcp_servers.parallel]
url = "https://mcp.parallel.ai/mcp"
```

In Cursor, add it to `~/.cursor/mcp.json` (or `.cursor/mcp.json` for one project). The Cursor CLI picks it up from the same file:

```json
{
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Restart the agent, then ask it something that needs current information, such as the breaking changes in the latest release of a library you depend on. Running Codex inside Cursor? Add both entries so each agent sees the same tools. For more research-oriented setups in the editor, see our guide to [Cursor plugins for research](https://parallel.ai/articles/best-cursor-plugins-for-research).

## Which should you choose

- **You live in the editor and want fast, visible edits:** Cursor. Tab completion and inline agent diffs are its core, and nothing in Codex replaces them.
- **You already pay for ChatGPT Plus or Pro:** start with Codex. CLI, IDE extension, cloud tasks, and GitHub review come with the plan, with no second subscription.
- **You want to compare Claude, GPT, and Gemini models in one tool:** Cursor Premium or above, budgeting for per-token third-party spend.
- **You want to hand off long tasks and come back to a PR:** Codex cloud or Cursor Cloud Agents both do this. Choose Codex if your team is on ChatGPT Business or Enterprise; choose Cursor if you want Slack-triggered agents that attach screenshots and videos to PRs.
- **You need PR review across GitLab, Bitbucket, or Azure DevOps:** Bugbot covers more hosts today. Codex review is generally available on GitHub, with GitLab in preview.
- **You're on a tight budget:** Cursor Plus at $8 gets you an agent on Cursor's own models. Codex Free and Go give limited GPT-6 Luna access in the desktop app.
- **You want both:** install the Codex extension in Cursor, share one `AGENTS.md`, and point both at the same MCP servers. Our [Claude Code vs. Cursor comparison](https://parallel.ai/articles/claude-code-vs-cursor-how-to-choose-your-ai-coding-tool-in-2026) covers the same editor-or-agent question from Anthropic's side.

## FAQ

### Is Codex better than Cursor?

Neither is better across the board. Cursor is the stronger choice for interactive editing with Tab completion and inline diffs, plus a choice of model providers. Codex is the stronger choice for delegating tasks to a sandboxed or cloud agent, and it comes included with ChatGPT plans.

### Can I use Codex inside Cursor?

Yes. OpenAI's Codex IDE extension lists Cursor as a supported editor alongside VS Code and Windsurf. It signs in with your ChatGPT account or an API key and reads the same `~/.codex/config.toml` as the Codex CLI.

### Does Cursor support OpenAI models?

Yes, on Premium ($30/month) and higher. Third-party models, including OpenAI's, are billed at API list price from prepaid credit rather than coming out of the included pool. The $8 Plus plan includes only Cursor's Grok and Composer models.

### Is Codex free?

Partly. As of November 2026, ChatGPT Free and Go include GPT-6 Luna in the desktop app, subject to rollout. The CLI, IDE extension, cloud tasks, and GitHub review start at ChatGPT Plus for $20 a month, or you can use the CLI and IDE extension with an API key at per-token prices.

### Which is cheaper, Codex or Cursor?

At the entry level Cursor Plus ($8) costs less than ChatGPT Plus ($20), but it excludes cloud agents, Bugbot, and third-party models. The comparable tiers for cloud agents and PR review are ChatGPT Plus at $20 and Cursor Premium at $30, and Cursor's third-party model usage is billed on top.

### Do Codex and Cursor support MCP servers?

Both do. Codex stores servers in `config.toml` and adds them with `codex mcp add`. Cursor uses `mcp.json` and offers one-click installs from its Marketplace.

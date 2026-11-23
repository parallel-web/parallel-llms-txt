# Windsurf (now Devin Desktop) vs. Cursor vs. Claude Code: which to choose in 2026

Picking between Windsurf (now Devin Desktop), Cursor, and Claude Code looks different in late 2026: Windsurf ships under a new name with a new built-in agent, Cursor is sold through The X Subscription, and Claude Code defaults to Opus 5.5. This guide covers the Windsurf transition, pricing and models, agents and MCP setup, and privacy and best fit.

People still search for Windsurf, so this guide uses both names; the product Cognition sells today is Devin Desktop. If you're choosing among the three tools for the first time, skip to the comparison table; if you're an existing Windsurf user, start with the next section.

## What happened to Windsurf

On [June 2, 2026, Cognition renamed Windsurf to Devin Desktop](https://devin.ai/blog/windsurf-is-now-devin-desktop) and shipped it as a regular over-the-air update. The editor, extensions, keybindings, and language servers stayed in place. What moved to the front is the Agent Command Center, a Kanban board where you start and track local and cloud agent sessions side by side.

The bigger break came three months later. The [September 8 release (v3.9.19)](https://docs.devin.ai/desktop/changelog) removed Cascade, leaving Devin Local as the only built-in agent. Devin Local shares its harness with Devin CLI, supports subagents, and has a plan mode that, per the changelog, now works like Cascade's: it researches with read-only commands, writes a Markdown plan to `~/.devin/plans/`, and asks before implementing.

Here is what that means if you were paying for Windsurf:

- **Your plan and price.** The [Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq) says your current plan "continues to work exactly as it does today," including legacy Windsurf Enterprise plans, and you don't need to move to Cognition's ACU billing. If you were on prompt-based credits, Devin Local keeps you on them.
- **Your settings.** On first launch, **Migrate from Windsurf** copies settings, keybindings, snippets, workspace state, and extensions to the new Devin paths. A **Reset migration from Windsurf** command in the palette lets you run it again.
- **Your Cascade history.** A **Continue in Devin Local** prompt moves existing conversations to the new agent, and a separate command migrates Windsurf hooks into Devin hooks. Shared Cascade conversation links no longer work.
- **Your rules.** `.windsurfrules` and `.windsurf/rules/` are still read. New rules belong in `.devin/rules/`, which takes precedence, and Devin Local replaces Cascade's memories and workflows with rules and skills.
- **Your terminal habits.** `surf` is now `devin-desktop`, and the legacy command still ships for backward compatibility.
- **JetBrains.** The Windsurf JetBrains plugin is in maintenance mode, and Cognition recommends running Devin in JetBrains over the Agent Client Protocol (ACP) instead.
- **IT.** The app is now `Devin.app` / `Devin.exe`, so device-management allowlists that name "Windsurf" need the new name.

MCP moved too, which we cover below. The short version: new servers go in `~/.config/devin/mcp_config.json` with a `url` key, and Devin Local still imports the old Windsurf file by default.

## The three tools in one paragraph each

**Devin Desktop** is a VS Code-based IDE with an agent manager built in. You can run Devin Local on your machine, hand work to Devin Cloud, and watch both from the same board.

**Cursor** is also a VS Code fork, and its Agents Window offers a similar multi-agent view: parallel agents across repos, cloud agents on their own VMs, and a diffs view for reviewing and committing. Its distinguishing traits are tab completion, a wide model menu, and its own Composer and Grok models in the included usage pool. Cursor is now sold as part of [The X Subscription](https://cursor.com/help/account-and-billing/pricing), one plan covering Grok, Cursor, and X.

**Claude Code** started in the terminal and now runs in VS Code, JetBrains, a desktop app, and the browser at claude.ai/code. It runs only Claude models, and it leans hardest into delegation: subagents, background agents, hooks, skills, scheduled cloud tasks, GitHub Actions, and an Agent SDK for building your own agents on the same harness. Our [Claude Code vs. Cursor guide](https://parallel.ai/articles/claude-code-vs-cursor-how-to-choose-your-ai-coding-tool-in-2026) goes deeper on that two-way split.

## Windsurf vs. Cursor vs. Claude Code at a glance

Prices are list prices in US dollars before tax, checked November 22, 2026.

|  | Devin Desktop (formerly Windsurf) | Cursor | Claude Code |
| --- | --- | --- | --- |
| Form factor | IDE with Agent Command Center | IDE with Agents Window, plus CLI | Terminal, IDE extensions, desktop app, web |
| Free tier | Yes: light agent quota, unlimited Tab | Yes: limited agent and chat, Cursor models only | No; Claude Free doesn't include Claude Code |
| Entry paid plan | Pro $20/mo | Plus $8/mo (Grok models only); Premium $30/mo | Pro $20/mo ($17/mo billed annually) |
| Heavy-use plans | Max $200/mo | Super $100/mo, Ultra $200/mo | Max $100/mo, Ultra $200/mo |
| Teams | Teams $80/mo, paid in as shared credits, up to 100 users | $30, $100, or $200 per seat/mo | $25 standard / $125 premium per seat/mo (monthly billing) |
| Usage model | Daily and weekly quota, then on-demand credits at API pricing | Weekly pool for Cursor models; third-party models at API list price | 5-hour and weekly limits shared with Claude chat; usage credits after |
| Models | SWE-2 plus Claude, GPT, Gemini, and others | Grok 4.7, Composer 2.5, plus Claude, GPT, Gemini on Premium and up | Claude only (Opus 5.5 default) |
| MCP config | `~/.config/devin/mcp_config.json`, `url` key | `~/.cursor/mcp.json`, `url` key | `claude mcp add --transport http` |
| Training default | Self-serve data may be used; paid plans can opt out | Off with Privacy Mode (default for teams) | Consumer plans: your choice; Team, Enterprise, API: not trained |

## Pricing and limits

All three now meter usage, so the sticker price tells you less than it used to.

[Devin's pricing](https://devin.ai/pricing) puts one quota across Devin Cloud, Devin CLI, and Devin Desktop. Pro ($20) has daily and weekly allowances; Max ($200) has a larger weekly allowance with no daily cap; Teams is a flat $80 a month that lands in a shared pool of on-demand credits, with SAML/OIDC SSO and per-member usage tiers. Past the quota you buy credits at API pricing, and purchased credits [roll over without expiring](https://docs.devin.ai/admin/billing/self-serve). Two details worth knowing: Cognition's SWE-2 model is free for self-serve plans in Devin Desktop and Devin CLI through November 30, 2026, per the [models page](https://docs.devin.ai/desktop/models), and an eligible ChatGPT subscription can pay for GPT usage so it doesn't draw down your Devin quota.

Cursor changed its plans when it joined The X Subscription. [The current plans](https://cursor.com/help/account-and-billing/pricing) are Free, Plus ($8), Premium ($30), Super ($100), and Ultra ($200), with usage at 4x, 15x, and 50x Plus for the top three. Each paid plan includes a weekly pool for Cursor's own models (Grok 4.7, 4.6, 4.5, and Composer 2.5). Claude, GPT, and Gemini aren't in that pool: on Premium and above they bill at the model's API list price from prepaid credit, and Plus doesn't offer them at all. If you subscribed before the change, your legacy Pro ($20), Pro+ ($60), or Ultra ($200) plan keeps working, and switching is optional but permanent.

Claude Code comes with every paid [Claude plan](https://claude.com/pricing) and shares limits with Claude chat. Pro is $20 a month; Max is $100 for 5x Pro usage; Ultra is $200 for 10x Pro's weekly usage with no 5-hour limit on verified accounts, and Max and Ultra include $100 and $200 a month in API credits. Team seats are $25 standard or $125 premium per month ($20 and $100 billed annually), and Enterprise is $20 a seat plus usage at API rates. You can also run it on pay-as-you-go API billing.

For a solo developer who wants frontier Claude or GPT models, all three start around $20 to $30; the difference is that Cursor bills those models on top of the plan, while Devin and Claude Code draw them from the plan's quota.

## Models

This is where the tools differ most.

Devin Desktop mixes Cognition's in-house SWE family (SWE-2 and SWE-2 Flash, each in Medium, High, and Max effort) with frontier models from OpenAI, Anthropic, Google, and SpaceXAI. The November model list includes GPT-5.6 Sol and Gemini 4 Argon, with Claude Fable 5.2 rolling out on paid plans; the model selector shows what your plan can use.

Cursor's default experience runs on its own models: Composer 2.5 and the Grok 4.x line, including Grok 4.7, which Cursor trained jointly with SpaceXAI. On Premium and above you can pick Claude Opus 5.5, GPT-5.6 Terra, Gemini 4 models, and others at their API list prices, per Cursor's [models and pricing page](https://cursor.com/docs/models-and-pricing). Auto mode routes requests for you.

Claude Code is single-vendor by design. Every paid plan [defaults to Opus 5.5](https://code.claude.com/docs/en/model-config), and `/model` switches to Sonnet 5.5, Haiku 5.5, or Fable 5.2. Max and Ultra include Fable for up to half the weekly limit; Pro pays for it with usage credits. Enterprises can also run Claude Code through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.

## Agent capabilities

All three can plan, edit across files, run commands, and split work into subagents. The differences are in where the agent runs and how you supervise it.

### Devin Desktop

The Agent Command Center is the home screen. Devin Local runs in your workspace or in a git worktree (with a Merge button to bring changes back), and the same board shows your Devin Cloud sessions. Spaces group sessions, PRs, files, and context so agents can share them. Because Devin Desktop speaks ACP, you can also run other ACP-compatible agents inside it.

### Cursor

Cursor's Agents Window works across repos and environments: local, cloud, and remote SSH. Cloud agents get their own VM, open a pull request by default, and can be started from Slack, GitHub, Linear, or your phone; `/in-cloud` hands the next task to a cloud subagent while you keep working locally. Plan mode, Bugbot code review, and a CLI with the same modes round it out.

### Claude Code

Claude Code is the most scriptable. `claude -p` runs it headless in pipes and CI, hooks fire shell commands before or after any action, skills package repeatable workflows, and background agents let you run several full sessions and watch them from one view. Cloud scheduled tasks keep running when your laptop is closed and can trigger on GitHub events.

## MCP setup in each tool

All three speak the Model Context Protocol, and two of them use the same JSON shape.

**Devin Desktop.** Servers live in Devin CLI's [config files](https://docs.devin.ai/cli/extensibility/mcp/configuration): `~/.config/devin/mcp_config.json` for every project (`%APPDATA%\devin\mcp_config.json` on Windows), `.devin/mcp_config.json` for servers you commit, and `.devin/mcp_config.local.json` for personal keys, which is gitignored. Remote servers take `url` and optional `headers`. `devin mcp add` writes the entry for you, and `devin mcp login` handles OAuth. Devin Local [imports MCP servers](https://docs.devin.ai/cli/reference/configuration/read-config-from) from `~/.codeium/windsurf/mcp_config.json`, Cursor's `.cursor/mcp.json`, and Claude Code's config files by default, so an existing setup usually carries over. It also asks before every MCP tool call until you allow the tool or server.

**Cursor.** Put servers in `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project), using `url` for remote servers, or install from the Cursor Marketplace in one click. Enterprise admins get repository, model, and MCP access controls.

**Claude Code.** Use `claude mcp add --transport http <name> <url>`, with `--scope user` for every project or `--scope project` to write a shared `.mcp.json`. If you paste JSON instead, remote entries need `"type": "http"`, because Claude Code reads an entry without a type as a local stdio server.

For server recommendations, see our lists for [Windsurf (Devin Desktop)](https://parallel.ai/articles/best-mcp-servers-for-windsurf), [Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor), and [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code).

## Privacy and enterprise controls

Cognition's [security page](https://docs.devin.ai/admin/security) says self-serve data may be used for training by default. Paid users can turn on **Disable training** in Settings, which also enables zero data retention with model providers; on Teams, only an admin can make that choice. Cognition has been SOC 2 Type II certified since September 2024, and Enterprise adds SCIM, role-based access, VPC deployment, and a dedicated deployment option.

Cursor's [Privacy Mode](https://cursor.com/privacy-overview) means your code isn't used for training by Cursor or its model providers, under zero-retention agreements; it's on by default for teams. Teams seats add SAML/OIDC SSO and team-wide privacy settings, and Enterprise adds SCIM, audit logs, auto-run and network controls, and MCP access controls.

Anthropic's [Claude Code data policy](https://code.claude.com/docs/en/data-usage) splits by plan type. On consumer plans (Free, Pro, Max, Ultra) you choose whether your data can train future models. Under commercial terms (Team, Enterprise, API, and cloud platforms), Anthropic doesn't train on Claude Code prompts or code. Zero data retention is available to qualified Enterprise accounts, set up per organization.

## Giving all three live web access with Parallel MCP

Each agent eventually needs something newer than its training data: a library's latest release notes, a changed API signature, an error someone posted last week. A dedicated search tool returns ranked, query-relevant excerpts instead of whole pages, which keeps the agent's context small.

[Parallel MCP](https://parallel.ai/mcp) is one hosted server at `https://mcp.parallel.ai/mcp`. With no key or sign-in, it gives the agent `web_search`, `web_fetch` (clean markdown from URLs, including PDFs and JavaScript-heavy pages), and `web_decisions` for typed questions such as a probability or a pick among options. Signing in through `https://mcp.parallel.ai/mcp?login`, or sending an API key, adds `web_research` for cited answers to a single question and raises rate limits. Because all three tools read the same `url`, you can point them at one server and get the same answers in each.

In Devin Desktop, add it to `~/.config/devin/mcp_config.json`:

```json
{
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Or run `devin mcp add -s user parallel https://mcp.parallel.ai/mcp`. Devin Local asks before its first call to each tool; choose to allow every tool on the `parallel` server, for the session or permanently, so searches don't stop for approval. If you added Parallel to the old Windsurf file, Devin Local's import picks it up, but `url` in the new file is the format to use going forward.

In Cursor, the same block goes in `~/.cursor/mcp.json` (or `.cursor/mcp.json` for one project). In Claude Code, one command does it:

```bash
claude mcp add --transport http --scope user parallel https://mcp.parallel.ai/mcp
```

Then ask each agent about the newest release of a dependency in your lockfile and check that it calls `web_search`.

## Which should you choose?

- **You're an existing Windsurf user who's happy with the editor.** Stay on Devin Desktop. Your plan and price carried over, and the main adjustment is learning Devin Local and moving rules and MCP config to the `.devin/` paths at your own pace.
- **You want to supervise several agents, local and cloud, from one board.** Devin Desktop and Cursor both do this now. Pick Devin Desktop if you also want Devin Cloud and Cognition's SWE models in the same quota; pick Cursor if you prefer its Tab completion and editor feel.
- **You live in the editor and want the widest model menu.** Cursor, on Premium or above, so Claude, GPT, and Gemini are available. Budget for third-party model spend on top of the plan.
- **You want an agent you can script, schedule, and put in CI.** Claude Code. Headless mode, hooks, GitHub Actions, and the Agent SDK make it the easiest to fold into existing automation.
- **Your team has standardized on Claude.** Claude Code on Team or Enterprise gives you commercial no-training terms and Opus 5.5 by default, and it runs in VS Code or JetBrains for people who don't want a terminal.
- **You're budget-first.** Cursor Plus at $8 is the cheapest paid entry if Grok and Composer models cover your work. Devin's Free plan includes unlimited Tab completions.

Many teams run two: an IDE for interactive work and Claude Code for delegated jobs, with the same MCP servers in both.

## FAQ

### Is Windsurf still available?

Not under that name. Windsurf became Devin Desktop on June 2, 2026, through a normal update, and existing plans kept their price. Old Windsurf builds can still be downloaded, but Cognition treats every release except the latest as deprecated.

### What replaced Cascade in Devin Desktop?

Devin Local, the agent Devin Desktop shares with Devin CLI. Cascade was removed on September 8, 2026, and a "Continue in Devin Local" prompt moves your existing Cascade conversations over.

### Is Windsurf better than Cursor?

They've converged on the same idea: a VS Code-based editor with a multi-agent view and cloud agents. Devin Desktop bundles third-party models and Devin Cloud into one quota, while Cursor's plans center on its own Grok and Composer models and bill Claude, GPT, and Gemini at API list price.

### Windsurf vs. Claude Code: which is better for large refactors?

Both handle multi-file work with subagents and plan modes. Claude Code is easier to run unattended, headless, or on a schedule, while Devin Desktop is better if you want to watch and review several agents from inside an IDE.

### Do my Windsurf MCP servers still work in Devin Desktop?

Usually, yes. Devin Local imports servers from `~/.codeium/windsurf/mcp_config.json` by default. For new servers, use `~/.config/devin/mcp_config.json` with a `url` key, the same format Cursor uses.

### Can I use Claude models in Cursor and Devin Desktop?

Yes. Cursor offers Claude models on Premium and above at API list price, and Devin Desktop includes Claude models, with Fable 5.2 rolling out on paid plans. Claude Code runs only Claude models.

Parallel MCP's keyless tools are free to try in all three; when you want `web_research` and higher limits, a Parallel account comes with up to $80 in free credits plus $5 a month with a card on file. [Set it up from parallel.ai/mcp](https://parallel.ai/mcp).

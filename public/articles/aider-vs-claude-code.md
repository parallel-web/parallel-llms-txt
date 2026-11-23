# Aider vs. Claude Code: git-native pair programming or an autonomous agent?

Aider or Claude Code comes down to a choice between a lean, model-agnostic pair programmer that commits every edit to git and a managed agent that plans and finishes whole tasks on Claude models. This guide covers how each works in a session, git workflow and undo, BYOK token spend versus Claude plans, and how to add live web search to both.

Aider and Claude Code both run in a terminal and both edit real files in a real repo, so they get compared constantly. They come from opposite design philosophies, though. Aider is a small, open-source pair programmer that does exactly what you ask, commits it to git, and lets you plug in nearly any model. Claude Code is Anthropic's agent: it plans, runs commands, calls tools, and keeps going until a task is finished, on Claude models.

That difference matters more than any feature checklist. Below is what each tool does in practice, what it costs, and how to pick, with facts checked as of November 22, 2026.

## The short answer

Pick Aider if you want a minimal tool that turns each request into a reviewable git commit, and you care most about choosing (and swapping) the model, including local ones. Pick Claude Code if you want an agent that can take a multi-step task, run your tests, use MCP tools, and finish without you driving every step.

There is one more input to the decision this year. Aider's development has slowed, and that changes how much you should build on it. We cover that first.

## Where Aider stands in November 2026

Aider is Apache-2.0 licensed, has about 50,000 GitHub stars, and is still installed widely. The [aider-chat package on PyPI](https://pypi.org/project/aider-chat/) lists 0.86.2, uploaded February 12, 2026, as the newest release. The [GitHub Releases page](https://github.com/Aider-AI/aider/releases) still shows v0.86.0 from August 9, 2025 as "Latest," so trust PyPI for what `pip install` gives you.

The last commit to the main branch landed on May 22, 2026, and the repository is not archived. No maintainer has announced an end to the project. It works, people use it daily, and it is in a quiet period.

For a solo developer, that's fine. Pin a version and it will keep doing what it does today. For a team standardizing on a tool for the next two years, it's worth weighing, because new model families and protocol changes won't get first-party support until development picks up again.

## How each one works in a session

Aider is built around a chat where you choose the files in play. You `/add` the files you want edited, describe the change, and Aider sends the request along with a [repository map](https://aider.chat/docs/repomap.html): a compact summary of the classes, functions, and signatures across your repo, ranked by how often other code references them. The map defaults to a 1,000-token budget and grows when Aider needs a wider view. That keeps prompts small and predictable.

Aider has four [chat modes](https://aider.chat/docs/usage/modes.html). Code mode edits files. Ask mode discusses code without touching it. Help mode answers questions about Aider itself. Architect mode splits the work between two models: an architect model proposes the change, and a separate editor model turns that proposal into exact file edits. It costs two requests per turn, and it lets you pair a strong reasoning model with a cheaper, precise editing model.

There's also a `--watch-files` mode. Write a comment ending in `AI!` in any editor, save, and Aider makes the change. `AI?` asks a question instead. It's a lightweight way to use Aider from VS Code, Neovim, or anything else without a plugin.

Claude Code works at a different altitude. You describe an outcome ("fix the flaky auth test and make CI green"), and it reads files, searches the codebase, runs shell commands, edits, reruns tests, and iterates. It runs in the terminal, in [VS Code and JetBrains, in a desktop app, and on the web](https://code.claude.com/docs/en/overview), and the same `CLAUDE.md`, settings, and MCP servers apply across all of them. It adds subagents for parallel work, skills for reusable procedures, and hooks that run your own commands before or after its actions.

Aider waits for you between steps. Claude Code is designed to keep going until it's done or needs a decision.

## Git workflow: a commit per change vs. checkpoints

This is where Aider has the most distinctive design. Per its [git docs](https://aider.chat/docs/git.html), every time Aider edits a file it commits the change with a descriptive message, written by your configured "weak" model in Conventional Commits style. If you have uncommitted work in a file, Aider commits your changes first so its edits stay separate from yours.

The result is a history you can read, bisect, and revert with normal git tools. `/undo` drops Aider's last commit, `/diff` shows what changed since your last message, and `/git` runs raw git commands. If you prefer to commit yourself, `--no-auto-commits` turns it off. One detail to know: Aider's commits skip pre-commit hooks unless you pass `--git-commit-verify`.

Claude Code doesn't commit after each edit. It tracks its own file edits with [checkpoints](https://code.claude.com/docs/en/checkpointing): every prompt creates one, and `/rewind` (or pressing Esc twice) lets you restore the code, the conversation, or both to an earlier point. Snapshots for the 100 most recent checkpoints in a session are kept and survive a resumed session. When you want commits, branches, or a pull request, you ask Claude Code to make them, and it runs git like any other command.

Both approaches give you a safe undo. Aider's leaves a permanent, granular trail in git; Claude Code's keeps your history clean until you decide what to commit.

## What you pay

Aider is free. You pay your model provider directly, per token, with your own API key. With Anthropic models, that means setting `ANTHROPIC_API_KEY` and paying [Anthropic API rates](https://platform.claude.com/docs/en/about-claude/pricing): as of November 22, 2026, Claude Sonnet 5.5 is $2 per million input tokens and $10 per million output tokens, and Claude Opus 5.5 is $4 and $20. Cache hits on both cost 5% of the input price, which helps Aider because the repo map and file context repeat across turns. Point Aider at a local model through Ollama and the token bill goes to zero.

Claude Code is included in every paid [Claude plan](https://claude.com/pricing) (pricing checked November 22, 2026):

- **Pro:** $20 a month, or $17 a month billed annually
- **Max:** $100 a month, 5x Pro usage, plus $100 a month in Claude Platform API credits
- **Ultra:** $200 a month, 10x Pro weekly usage with no 5-hour limit for verified accounts, plus $200 a month in API credits

Claude Code shares usage limits with the rest of your Claude plan, and you can switch to pay-as-you-go API billing through a Console account for heavy sessions.

The trade-off is the usual one between metered and flat pricing. Aider's cost tracks exactly what you send, and its file-scoped context keeps requests small. Claude Code's plans give you a predictable monthly number for an agent that tends to read more and run longer per task. If you're on Max or Ultra already, the included API credits are worth checking before you top up a separate API balance for Aider.

## Models

Model freedom is Aider's clearest advantage. Its [LLM docs](https://aider.chat/docs/llms.html) cover OpenAI, Anthropic, Gemini, DeepSeek, xAI, Groq, Cohere, Azure, Amazon Bedrock, Vertex AI, OpenRouter, GitHub Copilot, LM Studio, Ollama, and any OpenAI-compatible endpoint. You can switch mid-session with `/model`, and architect mode lets two different providers share one task.

One practical note: Aider's built-in model settings were last updated in its February 2026 release. Models released since then, such as Claude Sonnet 5.5 (released September 28, 2026), work when you pass their full name, but you may want to add their edit format and limits in `.aider.model.settings.yml` and `.aider.model.metadata.json` per the [advanced model settings docs](https://aider.chat/docs/config/adv-model-settings.html).

Claude Code is built for Claude models: Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable (included on Max and Ultra, paid with usage credits on Pro). Anthropic tunes the harness and the models together, so you get strong defaults with little configuration. If you need GPT-class or open-weight models in a terminal agent, look at Aider or at OpenCode, which we compared in [OpenCode vs. Claude Code](https://parallel.ai/articles/opencode-vs-claude-code-a-2026-comparison-for-developers).

## Aider vs. Claude Code at a glance

| Dimension | Aider | Claude Code | What it means for you |
| --- | --- | --- | --- |
| Design | Pair programmer; you pick files and approve each step | Autonomous agent; plans, runs commands, iterates | Aider for tight control, Claude Code for delegation |
| Models | Most providers plus local models via Ollama or LM Studio | Claude models (Opus, Sonnet, Haiku, Fable) | Aider if model choice is the priority |
| Pricing | Free tool; you pay per token on your own key | Included in Pro ($20), Max ($100), Ultra ($200), or API billing | Metered vs. predictable monthly |
| Git | Auto-commit per change, `/undo`, Conventional Commits | Checkpoints with `/rewind`; commits when asked | Aider leaves a granular history by default |
| Context | Repo map plus files you `/add` | Agentic search across the repo | Aider keeps prompts small |
| Extensibility | No native MCP; `/run`, `/web`, scripting | MCP, subagents, skills, hooks, plugins | Claude Code connects to more tools |
| Surfaces | Terminal, browser GUI, any editor via watch mode | Terminal, VS Code, JetBrains, desktop, web | Both fit most setups |
| Maintenance | Last release Feb 12, 2026; last commit May 22, 2026 | Active, frequent releases | Weigh long-term support for team rollouts |

## Extensibility and web access

Claude Code speaks MCP natively. You add servers with `claude mcp add`, scope them to yourself or share them with the team through a project `.mcp.json`, and the agent calls their tools mid-task. It also ships built-in WebSearch and WebFetch tools. Our list of the [best MCP servers for Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) covers the common picks.

Aider doesn't support MCP in any released version. The request is one of its most upvoted issues ([#3314](https://github.com/Aider-AI/aider/issues/3314), 196 thumbs up), and a community pull request adding MCP client support ([#5539](https://github.com/Aider-AI/aider/pull/5539)) has been open since August 8, 2026 without being merged.

Aider has two built-in ways to bring outside information in instead. `/web <url>` scrapes a page, converts it to markdown, and adds it to the chat. It uses httpx by default and works on more sites, including JavaScript-heavy ones, if you install Playwright's Chromium (`playwright install --with-deps chromium`), per the [optional install steps](https://aider.chat/docs/install/optional.html). `/run` executes any shell command and offers to add its output to the chat. That second one is the flexible path, because any command-line tool becomes a source of context.

## Giving Aider and Claude Code live web search

Both tools hit the same wall eventually: the model's training data is older than the library you're upgrading. The fix is a search tool the agent can call when it needs current docs, changelogs, or release notes.

For Claude Code, add Parallel MCP with one command. The default endpoint needs no API key or sign-in and gives the agent `web_search` and `web_fetch`:

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

Run `/mcp` inside Claude Code to confirm it connected. To use `web_research` and higher rate limits, add `https://mcp.parallel.ai/mcp?login` instead and sign in through the browser, or send a Parallel API key as a Bearer header.

For Aider, there's no MCP slot, so use the Parallel CLI through `/run`. Install it once, log in, and Aider can pull search results or a cleaned-up page straight into the chat:

```bash
pipx install "parallel-web-tools[cli]" && pipx ensurepath
parallel-cli login
```

Then, inside an Aider session:

```bash
/run parallel-cli search "Breaking changes in the latest Pydantic release" --mode fast --json
/run parallel-cli extract https://docs.pydantic.dev/latest/migration/ --objective "List the breaking changes"
```

Aider asks whether to add the output to the chat; say yes, and your next `/code` request works from the current docs. Search runs on the [Parallel Search API](https://docs.parallel.ai), and Fast mode returns results in under a second. Our guide to [adding free web search to a coding agent](https://parallel.ai/articles/add-free-web-search-to-coding-agent) walks through both the CLI and MCP setups, and if you run Aider against local models, [web search for local AI agents](https://parallel.ai/articles/web-search-for-local-ai-agents) covers that setup.

## Which should you choose?

**You review every diff and want clean git history.** Aider. Commit-per-change plus `/undo` is the most auditable workflow either tool offers, and file-scoped context keeps the model focused on what you chose.

**You want to try new models the week they ship, or run fully local.** Aider, with the caveat about adding settings for models newer than its last release. Architect mode pairing a strong reasoner with a cheap editor model is still a good cost trick.

**You hand off whole tasks: debug, run tests, fix, repeat.** Claude Code. That loop is what it's designed for, and permission modes let you choose how often it stops to ask.

**Your work depends on tools outside the repo.** Claude Code. Issue trackers, databases, browsers, and web search all plug in through MCP, and Aider has no native equivalent today.

**You're choosing a standard for a team.** Claude Code is the lower-risk default given active development, shared project config, and admin controls on Team and Enterprise plans. Aider still works well as a personal tool alongside it.

Plenty of developers use both: Aider for small, surgical edits where they want a commit per change, and Claude Code for anything that needs an agent.

## FAQ

### Is Aider still maintained in 2026?

Aider isn't archived, but development has slowed. As of November 22, 2026, the newest PyPI release is 0.86.2 from February 12, 2026, and the last commit to the main branch was May 22, 2026. The current version works with most providers; newer models may need manual settings.

### Does Aider support MCP?

No released version of Aider supports MCP. A community pull request adding MCP client support has been open since August 2026 but isn't merged. To give Aider outside tools, use `/run` to execute a CLI and add its output to the chat, or `/web` to scrape a specific page.

### Can I use my Claude subscription with Aider?

Aider connects to Anthropic with an API key set in `ANTHROPIC_API_KEY`, billed per token through the Claude Platform. That billing is separate from the usage included in a Claude Pro, Max, or Ultra subscription, although Max and Ultra plans now include monthly API credits.

### Is Aider cheaper than Claude Code?

It depends on volume. Aider is free and you pay only for tokens, which can be very little for small, file-scoped edits or nothing with local models. Claude Code starts at $20 a month on Pro. Heavy daily use of top Claude models via API can exceed a flat plan.

### Which is better for large codebases?

Claude Code handles large codebases by searching and reading files as it works, so you don't need to know which files matter. Aider's repo map gives the model a ranked summary of the whole repo, but you still choose which files it can edit, which works best when you already know where the change goes.

Give either tool current web context in a minute with [Parallel MCP](https://parallel.ai/mcp).

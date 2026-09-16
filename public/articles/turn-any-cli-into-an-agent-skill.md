# Turn any CLI into an agent skill

The most popular agent skills are one-page SKILL.md files that teach an agent an existing CLI. This tutorial builds one end to end, using the Parallel CLI as the worked example, and covers what makes a CLI agent-friendly in the first place.

Look at the [most-installed agent skills](https://parallel.ai/articles/best-clawhub-skills-for-openclaw) and a pattern repeats: the skill is a page of markdown teaching the agent an existing CLI. Gog wraps a Google Workspace CLI, Wacli wraps WhatsApp, the GitHub skill drives `gh`. The CLI carries the capability; the [skill](https://parallel.ai/articles/what-are-agent-skills) tells the agent when and how to use it. This tutorial builds one end to end, using our own Parallel CLI as the example, and the pattern transfers to any tool you want your agent to master.

## Why this pattern wins

A skill costs almost nothing in context until used (only its one-line description is always loaded), runs through the shell so the agent can compose it with pipes and scripts, and, since `SKILL.md` became an open standard, works unchanged across Claude Code, Codex CLI, Cursor, OpenCode, OpenClaw, and Hermes. The tradeoffs against MCP servers are covered in our [decision framework](https://parallel.ai/articles/mcp-vs-skills-vs-clis); the short version is that local, composable, CLI-shaped capabilities belong in skills.

## Step 1: make sure the CLI is agent-friendly

Agents are a demanding audience: they can't answer interactive prompts, they parse output programmatically, and they decide what to do next from exit codes. Before writing the skill, check the CLI against four properties, and if you're building the CLI too, design them in:

- **Non-interactive operation.** Every action reachable via flags, nothing that blocks on a prompt.
- **Structured output.** A `--json` flag on every command; pretty output is for humans.
- **Meaningful exit codes.** Distinct codes for bad input vs. auth failure vs. service error let the agent recover intelligently instead of retrying blindly.
- **Stdin support.** Reading input from a pipe makes the tool composable with everything else in the shell.

The [Parallel CLI](https://docs.parallel.ai/integrations/cli) was built to this spec, which is why it makes a clean example: every command takes `--json`, exit codes distinguish bad input (2), auth errors (3), API errors (4), and timeouts (5), and queries pipe in via stdin. We built it that way because agents were always the intended driver.

## Step 2: write the `SKILL.md`

A good CLI skill has four parts: frontmatter that tells the agent when to reach for it, setup instructions it can verify, the commands with real examples, and guidance on interpreting results. Here's a complete, working example:

```bash
---
name: parallel-web-research
description: Search the live web, read URLs, and run deep research when a task needs current information beyond the training cutoff.
---

# Web research with the Parallel CLI

## Setup check
Run `parallel-cli auth`. If it fails: `pipx install "parallel-web-tools[cli]"`,
then `parallel-cli login` (or set PARALLEL_API_KEY).

## Commands
- Search: `parallel-cli search "<natural-language objective>" --json`
  - Restrict sources: `--include-domains sec.gov` · freshness: `--after-date 2026-01-01`
- Read a URL: `parallel-cli extract <url> --objective "<what to find>" --json`
- Deep research (minutes, costs credits):
  `parallel-cli research run "<question>" --json`
  - Long jobs: add `--no-wait`, then `parallel-cli research poll <run_id> --json`

## Guidance
- Prefer search excerpts; extract full pages only when excerpts fall short.
- Exit codes: 2 bad input, 3 auth (re-run login), 4 API error, 5 timeout.
- Cite result URLs in your answer.
```

Notice what the skill does not do: it doesn't paste the CLI's full help output, enumerate every flag, or explain what web search is. The agent can run `--help` itself; the skill's job is judgment, which command for which situation, and the sharp edges (costs, exit codes, async patterns) the help text won't prioritize.

## Step 3: test it like an adversary

Drop the folder into your harness's skills directory and probe three things. Triggering: does a task phrased naturally ("what changed in React this month?") activate the skill, and do unrelated tasks leave it dormant? Degraded paths: uninstall the CLI or log out, and check the agent follows your setup instructions instead of flailing. Composition: ask something requiring search plus extraction plus synthesis and watch whether the guidance section actually shapes behavior. Every failure is a sentence to add or sharpen; skills are prompts, and they respond to editing like prompts.

## Step 4: ship it

Distribution options, cheapest first: commit it to your repo so your team's harnesses pick it up; share it as a git URL or raw `SKILL.md` link (Hermes installs directly from HTTP URLs); or publish to a registry like ClawHub for reach. If you publish, two courtesies matter: document the exact skill name somewhere authoritative so users can dodge typosquats, and prefer install instructions that avoid curl-piped-to-bash, which some registries rightly flag; pipx or Homebrew reads better in a security review.

## Frequently asked questions

**Should the skill install the CLI itself?** Give the agent verified install instructions and let it run them with the user's approval, as the example does. Auto-installing silently is how registries get a bad reputation.

**One big skill or several small ones?** Split when the triggers differ. Search-and-read belongs together; bulk enrichment triggers on different tasks and deserves its own description line. That's why we ship four ClawHub skills, not one.

**When is a wrapper script better than instructions?** When a workflow is long but fixed, bundle a script in the skill folder and have the instructions call it. Keep judgment in the markdown, mechanics in the script.

## Build one this afternoon

Copy the example above, swap in your CLI's commands, and test the three failure modes. If you want to start with ours, the [Parallel CLI installs in one line](https://docs.parallel.ai/integrations/cli) and its free tier means the skill works before you've spent anything.

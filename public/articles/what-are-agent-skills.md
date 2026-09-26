# What are agent skills? SKILL.md and the portable-capability standard, explained

Agent skills are folders of markdown instructions an AI agent loads on demand, standardized as SKILL.md and now portable across Claude Code, OpenClaw, Hermes, Cursor, and more. What they are, how they work, where to get them, and how to install them safely.

An agent skill is a folder of instructions an AI agent loads when a task calls for them: a markdown file that teaches the agent how to do something specific, optionally bundled with scripts, templates, and reference material. If the agent is a smartphone, skills are its apps, except the apps are plain text you can read before installing.

Skills went from a Claude feature to ecosystem infrastructure in about a year, and the turning point was standardization: one file format that every major harness reads. This guide covers the format, how loading works, where skills are distributed, how they relate to MCP servers, and the security lessons the ecosystem learned the hard way.

## The `SKILL.md` standard

Anthropic introduced skills for Claude ([the reference repo](https://github.com/anthropics/skills) is one of the most-starred agent projects on GitHub) and then published the format as an open standard at `[agentskills.io](https://agentskills.io)`. A skill is a directory whose `SKILL.md` file has two parts: YAML frontmatter with at minimum a name and a description, and a markdown body containing the actual instructions. The folder can also carry scripts, examples, and templates the instructions reference.

```bash
---
name: web-research
description: Search the live web and read pages when a task needs current information.
---

# Web research

When a task needs current information from the web, use the `parallel-cli` tool:

- Search: `parallel-cli search "<objective>" --json`
- Read a page: `parallel-cli extract <url> --objective "<what to find>" --json`

Prefer search excerpts when they answer the question; fetch full pages only when needed.
```

Before the standard, every harness had its own format: `.cursorrules` here, custom instructions there, per-agent system prompts everywhere, and zero portability between them. With `SKILL.md`, one skill runs unchanged in Claude Code, Codex CLI, Cursor, OpenCode, OpenClaw, and Hermes Agent, so you can switch harnesses and keep your setup.

## How loading actually works

The design's core trick is progressive disclosure. The harness keeps only each skill's name and description in context, a line or two per skill, and loads the full body only when the model decides a task matches. That's what makes skills cheap in a way always-loaded tool schemas are not, and it's the heart of the [skills-versus-MCP tradeoff](https://parallel.ai/articles/mcp-vs-skills-vs-clis): an installed-but-unused skill costs almost nothing, while an installed-but-unused MCP server pays schema rent on every turn.

A skill grants knowledge, not access. The instructions can only direct capabilities the agent already has, usually the shell. That's why so many top skills are thin wrappers that teach the agent an existing CLI: the CLI does the work, the skill supplies the know-how, and the agent composes both with pipes and scripts.

## Where skills live

**ClawHub** (`hub.openclaw.ai`) is the largest registry, with over 67,000 skills for OpenClaw installed via `clawhub install` <name>; we keep a [ranked guide to the best of them](https://parallel.ai/articles/best-clawhub-skills-for-openclaw). **Hermes's skills hub** federates tens of thousands of skills across registries, installed with `hermes skills install`, and runs a security scan during installation. **Anthropic's skills repo** carries first-party skills for Claude, and curated community lists fill the gaps. Skills also travel fine with no registry at all: a git URL or a raw `SKILL.md` link is a valid distribution channel.

## Skills vs. MCP servers

|  | Skill | MCP server |
| --- | --- | --- |
| What it is | Instructions + optional files | A program exposing typed tools |
| Context cost | Metadata only until used | Tool schemas on every turn |
| Auth | Inherits the shell | OAuth and headers built in |
| Best at | Local know-how, CLI workflows | Hosted, stateful, authenticated services |
| Inspectable before install | Fully (plain text) | Partially (code or a remote endpoint) |

The two complement each other, and vendors increasingly ship both. We do: Parallel publishes [official skills on ClawHub](https://docs.parallel.ai/integrations/clawhub) (search, extract, deep research, enrichment, all wrapping the Parallel CLI) and a [free hosted MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp) for harnesses where remote tools fit better.

## The security lesson: read before you install

A skill runs with your agent's permissions, which usually means your shell. The ecosystem learned what that implies in early 2026, when security researchers uncovered the ClawHavoc campaign: attackers published typosquatted skills on ClawHub, misspellings of popular names, that installed backdoors stealing SSH keys, API tokens, and browser session cookies. ClawHub removed over 2,400 suspicious skills and now scans every published skill against VirusTotal.

The registry defenses improved, but the durable protections are habits. Read the `SKILL.md` source before installing; it's plain text, and that inspectability is the format's real security feature. Check the skill's scan report where the registry provides one. Favor skills with meaningful install counts and history over fresh uploads with familiar-sounding names. And prefer skills that wrap documented CLIs, because you can run the same commands yourself and see exactly what the skill does.

## Frequently asked questions

**Do skills work in every AI agent?** Every major coding and personal-agent harness reads `SKILL.md` as of 2026: Claude Code, Codex CLI, Cursor, OpenCode, OpenClaw, Hermes, and more. Chat-only products without shell access generally don't.

**Can a skill add a genuinely new capability?** Only by directing something executable, typically a CLI it asks you to install, or scripts bundled in the skill folder. Instructions alone can't grant access the agent lacks.

**How do I write one?** Frontmatter, instructions, test, publish. Our [tutorial on turning a CLI into a skill](https://parallel.ai/articles/turn-any-cli-into-an-agent-skill) walks through a complete working example.

**Are skills the same as plugins?** No. Plugins and extensions are code that hooks into a specific harness's internals; skills are portable instructions. Registries like ClawHub distribute both, under separate tabs.

## Try one

The fastest way to understand skills is to install one and read it. `[clawhub install parallel-search](https://docs.parallel.ai/integrations/clawhub)` gives an OpenClaw agent web search through the Parallel CLI; open the `SKILL.md` it installs and you'll see the whole mechanism, frontmatter to commands, in under a page.

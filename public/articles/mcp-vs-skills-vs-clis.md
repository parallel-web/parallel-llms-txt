# MCP servers vs. agent skills vs. CLIs: how to give your AI agent tools

Every agent capability ships one of three ways: an MCP server, a skill, or a plain CLI. The harnesses themselves disagree about which is best, and they're all right for different tools. Here's the decision framework, with real cases from Hermes, Pi, and OpenClaw.

Every capability you give an AI agent arrives through one of three mechanisms. An MCP server exposes typed tools over a protocol. A skill hands the agent instructions it loads when relevant. A CLI is just a program the agent runs through its shell. All three can accomplish the same job, and the harness builders themselves disagree about which is best: Hermes Agent treats MCP as first-class but deliberately kept GitHub out of its MCP catalog, Pi refuses to ship MCP at all, and OpenClaw's most-installed extensions are skills that wrap CLIs.

They're all making reasonable choices, because the right mechanism depends on the tool. This guide is the decision framework, built from how the major harnesses actually behave in 2026. Disclosure: we make Parallel and ship web search through all three mechanisms, which is partly why we care about getting this comparison right rather than declaring a winner.

## The three mechanisms in one paragraph each

**MCP servers.** The [Model Context Protocol](https://parallel.ai/articles/what-is-mcp) is an open standard for connecting agents to tools: a server declares typed tools with JSON schemas, the client discovers them, and the model calls them like native functions. Servers run locally over stdio or remotely over HTTP, and remote servers can handle OAuth so the agent never touches your credentials.

**Agent skills.** A [skill](https://parallel.ai/articles/what-are-agent-skills) is a folder with a `SKILL.md` file: YAML frontmatter naming the capability, then markdown instructions, often plus scripts or templates. The agent scans the metadata cheaply and loads the full instructions only when a task calls for them. Anthropic published the format as an open standard, and Claude Code, Codex CLI, Cursor, OpenCode, OpenClaw, and Hermes all read it.

**CLIs.** Any command-line program the agent can invoke through bash. No protocol, no manifest; the agent reads `--help` or gets told the commands in its instructions. Skills and CLIs pair naturally: many of the most popular skills are a page of instructions teaching the agent an existing CLI.

## The real differences

### Context cost

This is the difference practitioners feel first. Every connected MCP server injects its tool schemas into the context window on every turn, whether or not the tools get used; GitHub's server is the notorious example, and even GitHub's own install guides warn about it. Skills are lazier: only the one-line metadata is always present, and the body loads on demand. CLIs cost almost nothing until invoked. The ecosystem has built workarounds that concede the point, such as `pi-mcp-adapter` hiding every MCP tool behind a single proxy tool, and OpenCode letting you disable a server's tools per agent with globs. If a tool is used rarely, the always-loaded schema is pure overhead.

### Portability

MCP's original selling point was one server, every client, and it delivers: the same hosted URL drops into Claude Code, Cursor, Codex, OpenCode, and the rest with a config entry each. Skills caught up when `SKILL.md` became an open standard; one skill file now runs unchanged across the major harnesses, and registries like ClawHub (67,000+ skills) and the Hermes skills hub distribute them. CLIs were always portable; the only per-harness work is telling the agent they exist.

### Auth, state, and safety rails

Here MCP earns its complexity. Remote servers handle OAuth flows, token refresh, and per-tool approval prompts inside the harness, so the agent acts on your Linear or Notion account without a credential ever landing in a config file. Typed schemas also give the harness something to gate on: it can distinguish a read tool from a write tool and prompt accordingly. A CLI gets whatever permissions your shell has, all or nothing, and a skill inherits the same. That's fine for local tooling and unacceptable for a hosted service holding your production data.

### Composability

CLIs win this one outright: pipes, xargs, exit codes, and scripts let an agent chain operations in a single bash call instead of a round trip per tool call. An agent that can run `parallel-cli search "query" --json | jq` is doing in one invocation what would take several MCP calls. Skills inherit this because they run through the shell. MCP calls compose only through the model, one call at a time.

## The decision table

| Dimension | MCP server | Skill | CLI |
| --- | --- | --- | --- |
| Context cost | Schemas loaded every turn | Metadata only; body on demand | Near zero until invoked |
| Portability | Any MCP client | Any SKILL.md-aware harness | Anything with a shell |
| OAuth / hosted auth | Built in | None (inherits shell) | None (inherits shell) |
| Typed inputs/outputs | Yes, JSON schemas | No | No (JSON flags help) |
| Per-tool approval gating | Yes, in most harnesses | Shell-level only | Shell-level only |
| Composability | One call at a time | Full shell | Full shell |
| Works without local install | Yes (remote servers) | No | No |

## Three case studies from the harnesses themselves

**Hermes and GitHub.** Hermes Agent has excellent MCP support, yet Nous keeps GitHub out of its [curated MCP catalog](https://parallel.ai/articles/best-mcp-servers-for-hermes-agent) on purpose: GitHub's hosted server requires each client to bring its own OAuth app, and Hermes's bundled skills driving the `gh` CLI are simply the more capable integration. Same service, and the skill won on merit.

**Pi and the proxy pattern.** [Pi ships no MCP support at all](https://parallel.ai/articles/best-mcp-servers-for-pi), on philosophical grounds. The community's answer, `pi-mcp-adapter`, is telling: it defaults to exposing every MCP tool behind one proxy tool to protect the context window, and only tools you explicitly promote become first-class. Even where MCP was bolted on, the context economics shaped the design.

**OpenClaw's skill charts.** Look at [ClawHub's most-installed skills](https://parallel.ai/articles/best-clawhub-skills-for-openclaw) and a pattern jumps out: Gog is a Google Workspace CLI, Wacli is a WhatsApp CLI, the GitHub skill drives `gh`. The winning distribution format for local capabilities is a skill teaching the agent a CLI, which is exactly the combination the table above predicts.

## The rule of thumb

Pick MCP when the tool is a hosted service: it needs OAuth, holds state on someone else's server, benefits from typed schemas and approval gating, or must work in a harness without shell access. Pick a skill wrapping a CLI when the tool is local, composable, or used only occasionally: you get near-zero context cost and full shell composition. Pick a bare CLI when the agent is already shell-first and the tool's `--help` is self-explanatory.

Web search is a useful worked example because it's the one tool nearly every agent needs. We ship it as a [free hosted MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp) (right answer for Claude Code, Cursor, OpenCode: remote, no install, no key) and as a [CLI that installs as a skill](https://docs.parallel.ai/integrations/cli) (right answer for OpenClaw and Pi: shell-first, composable, context-cheap). Same API underneath; the mechanism follows the harness.

## Frequently asked questions

**Is MCP replacing skills, or the other way around?** Neither. They're converging on a division of labor: MCP for hosted, authenticated, typed services; skills for local know-how and CLI orchestration. Every major harness now supports both.

**Why not expose everything as MCP for consistency?** Context cost. Tool schemas are paid on every turn, and tool-selection accuracy degrades as the tool list grows. Consistency isn't worth a slower, dumber agent.

**Can a skill call an MCP server?** Indirectly: tools like mcporter expose MCP servers as CLIs, which a skill can then drive. That's how OpenClaw's lineage handled MCP before native support.

**What about plain API calls?** If you're writing the agent yourself rather than configuring a harness, call APIs directly and skip all three mechanisms; they exist to add tools to agents you don't control the code of.

## Try the same tool both ways

The cheapest way to internalize the tradeoffs is to run one capability through two mechanisms. Add the free Parallel Search MCP to your harness, install the Parallel CLI as a skill in a shell-first agent, and notice where each feels right. Our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp) covers the hosted side in depth.

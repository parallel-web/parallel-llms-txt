# How to add free web search to your coding agent in 10 minutes (CLI and MCP)

You can add web search to Claude Code, Cursor, Codex CLI, or OpenClaw for $0 by pointing the agent at Parallel’s keyless Search MCP, then add the Parallel CLI and Agent Skills when you want scripting and research. This guide covers the two-minute MCP setup, the eight-minute CLI setup, a test prompt, and fixes for the usual errors.

Coding agents guess when they can’t read the web. They’ll write against a deprecated API, cite a flag that was renamed two releases ago, or miss the migration note that explains your build error. Web search fixes that, and you can wire it up in about 10 minutes without paying anything.

We tested every command below on September 28, 2026 against the live service, with Parallel CLI 0.9.3 and Claude Code 2.1.284. There are two paths. The first takes about two minutes and needs no account. The second takes about eight more, uses the free monthly credits on a Parallel account, and gives the agent a command-line tool it can script.

## The 10-minute checklist

Do Path 1 first; it works on its own. Path 2 is optional and adds capabilities rather than replacing Path 1.

1. (0:00) Add the keyless Search MCP to your agent with one command or one JSON block.
2. (1:30) Restart the session and paste the test prompt from the verify section.
3. (2:00) Install the Parallel CLI with pipx or Homebrew.
4. (3:30) Run `parallel-cli login` and approve the device code in your browser.
5. (5:00) Run your first `parallel-cli search` and `parallel-cli extract`.
6. (7:00) Install the Agent Skills with `parallel-cli skills install`.
7. (9:00) Ask the agent to use the skill and confirm it runs the CLI.

## Path 1: the keyless Search MCP (about 2 minutes, $0)

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is a hosted server at `https://search.parallel.ai/mcp`. It’s free to use anonymously at lower rate limits, with no account and no API key. It exposes two tools: `web_search`, which takes an objective plus a few keyword queries and returns ranked URLs with excerpts, and `web_fetch`, which returns markdown from up to 20 URLs. Anonymous calls run in Fast mode, and each call’s excerpts are capped at roughly 25,000 characters so they fit inside typical MCP client output limits.

### Claude Code

Run this in your terminal:

```bash
claude mcp add --transport http "Parallel-Search-MCP" https://search.parallel.ai/mcp
```

Start a new session and run `/mcp` to confirm the server shows as connected. The `/mcp` endpoint doesn’t ask for a login. If you want the config checked into a repo so teammates get it too, add `--scope project`; Claude Code then writes a `.mcp.json` file in the project root with `"type": "http"` and the URL.

### Cursor

Add this to `~/.cursor/mcp.json`, or to `.cursor/mcp.json` for one project:

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search.parallel.ai/mcp"
    }
  }
}
```

### Codex CLI

```bash
codex mcp add parallel-search --url https://search.parallel.ai/mcp
```

The command writes a `[mcp_servers.parallel-search]` entry to `~/.codex/config.toml`. Restart Codex afterward.

### OpenClaw

```bash
openclaw mcp set parallel-search '{"url":"https://search.parallel.ai/mcp","transport":"streamable-http"}'
```

Keep the `transport` field. OpenClaw treats a server without it as SSE, and the Search MCP speaks Streamable HTTP, so the connection fails. `openclaw mcp set` only writes config; start a new agent session for the tools to appear. Our [OpenClaw web search best practices](https://parallel.ai/articles/openclaw-best-practices-web-search) guide covers prompting and accuracy once it’s connected.

Other clients (Windsurf, Gemini CLI, VS Code, Zed, Claude Desktop) use slightly different field names; the [Search MCP docs](https://docs.parallel.ai/integrations/mcp/search-mcp) list each one. For a wider look at what else is free, see our roundup of the [best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp).

## Verify it works

Paste a prompt that the model can’t answer from training data and that forces a lookup:

```text
Search the web for the breaking changes in the Next.js 16 upgrade guide.
Cite the URLs you used, and quote the minimum Node.js version.
```

You should see the agent call `web_search` from the Parallel server with an `objective` and two or three `search_queries`, something like `["Next.js 16 breaking changes", "Next.js 16 upgrade guide"]`. We sent that exact call to the keyless endpoint over raw JSON-RPC with no credentials. It returned 10 results in 0.96 seconds, led by the Next.js 16 release post and the official upgrade guide, and the first excerpt already included the Node.js 20.9 minimum. If the agent answers without a tool call, it’s relying on memory; ask again with “use web_search” in the prompt.

## Path 2: the Parallel CLI and agent skills (about 8 minutes, free credits)

The [Parallel CLI](https://docs.parallel.ai/integrations/cli) gives the agent a shell command instead of a protocol. It needs an account, since it isn’t keyless like the MCP, but every account gets $5 in free credits every month (up to 5,000 Turbo or Fast searches) per the [pricing page](https://parallel.ai/pricing).

### Install and log in

```bash
pipx install "parallel-web-tools[cli]" && pipx ensurepath
# or: brew install parallel-web/tap/parallel-cli
parallel-cli --version
```

Use version 0.9.2 or later. In 0.8.x, `--mode fast` maps to Basic and prints a deprecation warning, so you’d pay the Basic price without getting Fast. Run `pipx upgrade parallel-web-tools` (or `brew upgrade parallel-cli`) if you’re behind. The docs also list npm, uv, and a curl installer, but skill registries flag the `curl | bash` pattern, so prefer pipx or Homebrew if you plan to install skills.

```bash
parallel-cli login
parallel-cli auth
```

`login` runs a device OAuth flow: it opens your browser, you approve, and the CLI stores the credentials. `auth` confirms which credential is active. Setting `PARALLEL_API_KEY` works too, and it overrides the stored login when both exist.

### First search and extract

```bash
parallel-cli search "Breaking changes in the latest Next.js major release" \
  -q "Next.js 16 breaking changes" -q "Next.js upgrade guide" \
  --mode fast --json

parallel-cli extract https://nextjs.org/docs/app/guides/upgrading/version-16 \
  --objective "List the breaking changes" --json
```

Pass `--mode fast` on purpose. The CLI defaults to Basic, which costs $5 per 1,000 requests; Fast costs $1 per 1,000 and is the mode our [search modes docs](https://docs.parallel.ai/search/modes) recommend starting with. Use `--mode turbo` (about 200ms, English and Japanese queries only) for simple lookups; our sibling guide on [Fast vs. Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo) covers that choice in agent loops.

Because every command takes `--json`, the agent can chain calls in one shell invocation. This pipeline searches, keeps the top three URLs, and extracts all of them:

```bash
parallel-cli search "Next.js 16 upgrade guide breaking changes" \
  --mode fast --max-results 3 --json \
  | jq -r '.results[].url' \
  | xargs parallel-cli extract --objective "List the breaking changes" --json
```

### Install the skills

```bash
parallel-cli skills install            # global: ~/.agents/skills (+ .claude/skills if Claude Code is present)
parallel-cli skills install --project  # this repo only
```

In our test repo, `--project` installed 14 skills into `.agents/skills` and `.claude/skills`, including `parallel-web-search`, `parallel-web-extract`, `parallel-deep-research`, `parallel-data-enrichment`, and `parallel-findall`. Each skill is a `SKILL.md` file that teaches the agent the right CLI invocation. To verify, ask the agent to “use the parallel-web-search skill” on the Next.js prompt above; you should see it run `parallel-cli search ... --json` through its shell tool. The search skill’s default command doesn’t set a mode, so those calls run in Basic unless you tell the agent to add `--mode fast`.

## When to prefer the CLI over the MCP

Use the MCP when you want zero setup and the agent only needs search and fetch. Move to the CLI when the agent needs to script, save results, or reach beyond search.

Context cost is the argument you’ll hear first. The Search MCP’s `tools/list` response is about 13,000 characters of schema for its two tools, and in clients that load MCP schemas up front, that sits in context every turn. A skill loads only its short description until the agent invokes it; the `parallel-web-search` description is about 400 characters. The gap is smaller in Claude Code than it used to be, since Claude Code now [defers MCP tool schemas by default](https://code.claude.com/docs/en/mcp) through tool search. Our [MCP vs. skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis) decision framework covers where each mechanism wins, including where MCP’s typed schemas and per-tool approvals help.

The stronger reasons are practical. The CLI composes with pipes, `jq`, and scripts, so one bash call does what would take several MCP round trips. `--json` output and stdin input (`parallel-cli search -`) make it safe to run non-interactively in CI. You can pick any search mode, where anonymous MCP calls always run Fast. The CLI also reaches the rest of the platform: `research run` for deep research, `enrich` for adding web-sourced columns to a CSV, `findall` for building entity lists, and `monitor` for recurring checks. If you want to wrap other tools the same way, [turn any CLI into an agent skill](https://parallel.ai/articles/turn-any-cli-into-an-agent-skill) walks through the pattern.

|  | Search MCP (keyless) | Parallel CLI + skills |
| --- | --- | --- |
| Setup time | About 2 minutes | About 8 minutes |
| Account needed | No | Yes (login or API key) |
| Cost | $0 anonymous; paid per request with a key | $5 free credits per month, then per request |
| Search modes | Fast only when anonymous; any mode with a key | Turbo, Fast, Basic, Advanced |
| Other APIs | Search and fetch only | Extract, research, enrich, FindAll, Monitor |
| Best for | Interactive coding sessions, quick lookups | Scripts, CI, piping, research tasks |

You can run both: keep the MCP for everyday lookups and let the agent reach for the CLI skill when it needs deep research or saved JSON.

## Troubleshooting

**OpenClaw connects but no tools appear.** Check that the config includes `"transport": "streamable-http"`, since OpenClaw defaults to SSE, and start a new session. `openclaw mcp show parallel-search` prints the saved definition.

**Searches get rate limited.** Anonymous access runs at lower rate limits, and we don’t publish a fixed number for it. Create a key at [platform.parallel.ai](https://platform.parallel.ai) and send it as a Bearer token. In Claude Code, add `--header "Authorization: Bearer $PARALLEL_API_KEY"` to the `claude mcp add` command; in Codex, add `--bearer-token-env-var PARALLEL_API_KEY`. Authenticated calls count against your credits, and a 402 error means the balance is empty.

`**parallel-cli: command not found**`**.** pipx installed it outside your PATH. Run `pipx ensurepath` and open a new terminal.

**Login on a server or in a container.** Run `parallel-cli login --no-browser`, open the printed URL on any device, and enter the code. For CI, set `PARALLEL_API_KEY` instead. Older docs mention `login --device`; neither 0.8.2 nor 0.9.3 accepts that flag, because `login` already uses the device flow.

**The CLI warns that **`**--mode fast**`** is deprecated.** You’re on 0.8.x. Upgrade to 0.9.2 or later.

## Get started

Add the [free Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) now; it takes one command. When you want scripting and research, create an account at [platform.parallel.ai](https://platform.parallel.ai), install the [Parallel CLI](https://parallel.ai/blog/parallel-cli), and run `parallel-cli skills install`. For picking other servers to pair with it, see the [best MCP servers for Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code).

## Frequently asked questions

### How do I add web search to Claude Code?

Run `claude mcp add --transport http "Parallel-Search-MCP" https://search.parallel.ai/mcp`, then start a new session. The server is free and needs no API key.

### Is there a free web search API for coding agents?

Yes. The Parallel Search MCP is free to use anonymously at lower rate limits, and a Parallel account adds $5 in free credits every month, which covers up to 5,000 Turbo or Fast searches through the API or CLI.

### Does Claude Code already have web search?

Yes, Claude Code has a built-in web search tool. A dedicated search server adds dense excerpts and a separate fetch tool; our [comparison of Claude’s built-in search with Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) covers the differences.

### Should I use an MCP server or a CLI for web search?

Use the MCP for the fastest setup and interactive sessions. Use the CLI with skills when the agent needs to pipe results, run in CI, choose a search mode, or call research, enrichment, or FindAll.

### Do I need an API key for the Parallel CLI?

Yes. The CLI needs either `parallel-cli login` or a `PARALLEL_API_KEY`. Only the hosted Search MCP works without one.

**Related reading: **[Best free web search MCP servers](https://parallel.ai/articles/best-free-web-search-mcp) · [Fast vs. Turbo: choosing a Parallel Search mode](https://parallel.ai/articles/parallel-search-fast-vs-turbo) · [What is a CLI, and why do AI agents like using them?](https://parallel.ai/articles/what-is-a-cli) · [MCP servers vs. agent skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis)

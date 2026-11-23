# Codex MCP: setup, config.toml, and the 10 best MCP servers for Codex in 2026

Codex MCP servers give OpenAI's coding agent tools it doesn't ship with: live web search, library docs, your issue tracker, a real browser, and production errors. This guide covers how MCP works across Codex's surfaces, ten servers worth installing in 2026 with a vendor-verified command for each, a comparison table, and fixes for servers that don't load.

To add an MCP server to Codex, run `codex mcp add <name> --url <server-url>` for a remote server or `codex mcp add <name> -- <command>` for a local one, then restart Codex and check `/mcp`. Codex is OpenAI's coding agent, and its [MCP](https://parallel.ai/learn/model-context-protocol) setup has a property the other harnesses don't: one config file, `~/.codex/config.toml`, is shared by the CLI, the IDE extension, and the ChatGPT desktop app. Configure a server once and it follows you across all three surfaces. The flip side is that a TOML syntax error breaks all three at once, so it pays to use the CLI commands rather than hand-editing.

Here are the ten servers we'd give that config space to, each checked against its vendor's Codex instructions on November 22, 2026, with the exact command for each. Disclosure: we make Parallel, Parallel MCP is the first pick, and the benchmark numbers are cited so you can discount our bias.

As of [Codex CLI 0.171.0](https://github.com/openai/codex/releases/tag/rust-v0.171.0), released November 20, 2026, GPT-6.2 Sol is the default model. Nothing below depends on that choice: MCP servers register the same way whichever model you run.

## How MCP works in Codex

Servers live under [`mcp_servers`.<name>] entries in `config.toml`, and `[codex mcp add](https://developers.openai.com/codex/mcp)` writes them for you, for both local stdio servers (pass the launch command) and remote HTTP servers (pass `--url`). `codex mcp list` shows what's configured, `codex mcp login` runs the OAuth flow for servers that support it, and `/mcp` inside the TUI shows what's active. You can also scope servers to a trusted project with a `.codex/config.toml` in the repo.

The ChatGPT desktop app has a form for the same thing: open Settings, select MCP servers, then Add server, pick STDIO or Streamable HTTP, enter the command or URL, save, and restart ([OpenAI's MCP docs](https://developers.openai.com/codex/mcp)). The entry is written to the shared config, so the CLI and IDE extension pick it up too.

### The config.toml options worth knowing

Each server is a `[mcp_servers.<name>]` table. Remote servers take `url`, plus `bearer_token_env_var` when they authenticate with a token from your environment; local servers take `command` and `args`. Four optional keys do most of the tuning. `enabled_tools` and `disabled_tools` trim a server's tool list. `default_tools_approval_mode` sets when Codex asks before calling a tool (`auto`, `prompt`, `writes`, or `approve`), and `writes` prompts only for tools that aren't marked read-only. `startup_timeout_sec` (default 10 seconds) rescues servers that start slowly, such as an npx package downloading on first run.

```bash
# Remote, no key
[mcp_servers.parallel]
url = "https://mcp.parallel.ai/mcp"

# Remote, token read from an environment variable; prompt before write tools
[mcp_servers.github]
url = "https://api.githubcopilot.com/mcp/"
bearer_token_env_var = "GITHUB_PAT_TOKEN"
default_tools_approval_mode = "writes"

# Remote, read-only endpoint
[mcp_servers.linear]
url = "https://mcp.linear.app/mcp/readonly"

# Local stdio server with a longer startup window
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
startup_timeout_sec = 20
```

Set `enabled = false` to park a server without deleting its table. If you're choosing between a hosted URL and a local command for the same service, [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers the tradeoffs.

## The best MCP servers for Codex

### 1. Parallel MCP

Web context is what coding agents most often lack: the error message that started appearing last month, the docs page for the version you actually installed, the changelog behind a breaking change. [Parallel MCP](https://parallel.ai/mcp) closes that gap from one hosted server. Without a key it lists three tools: web_search, returning ranked results with excerpts dense enough to answer from directly; web_fetch, which reads up to 20 URLs per call and returns relevant excerpts or full-page markdown, PDFs and JavaScript-heavy pages included; and web_decisions, which answers typed questions (a probability, a pick among options, a score) with sources. Sign in or add an API key and you also get web_research, which researches one question and returns a cited answer in the same call. Pick one of the three setups:

```bash
# No key: web_search, web_fetch, web_decisions
codex mcp add parallel --url https://mcp.parallel.ai/mcp

# Sign in with OAuth (adds web_research); Codex opens the browser
codex mcp add parallel --url 'https://mcp.parallel.ai/mcp?login'

# Or use an API key from platform.parallel.ai, set as PARALLEL_API_KEY
codex mcp add parallel --url https://mcp.parallel.ai/mcp --bearer-token-env-var PARALLEL_API_KEY
```

Parallel Search (advanced) ranks #1 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), the independent benchmark of 26 search API products across 14 providers (November 2026 data), at 83, and fast mode scores 82. On Openbenchmarks' [coding-agent board](https://openbenchmarks.com/web-search-for-coding-agents) (100 documentation tickets, September 2026), fast mode completed 66.7% from search alone, third of 14 behind Perplexity (77.3%) and Firecrawl (70.3%), and turbo had the fastest searches at 333ms. Restart Codex after adding the server and the tools appear.

**Best for:** grounding Codex in current docs, errors, and releases without leaving the terminal.

Tradeoffs: we're the vendor, so we're biased. Keyless use has lower rate limits and runs the low-latency fast search mode. The OAuth and API key variants add web_research, raise the limits, and bill calls to your Parallel account at the underlying API rates. Keyed or signed-in connections can also fix the search mode or include and exclude domains through an x-parallel-mcp-config header, and adding ?tools= to the URL limits which tools Codex loads.

### 2. Context7

Context7 serves version-pinned library documentation, the highest-impact fix for hallucinated APIs. It's the example OpenAI's own MCP docs use, and the one-liner is:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Best for: real API signatures for the versions in your lockfile. Tradeoffs: covers indexed libraries; pair with web search for the long tail. A free Context7 API key raises rate limits, and Context7 also publishes a Codex plugin that connects to its hosted server over OAuth.

### 3. GitHub MCP

GitHub's official hosted server brings issues, pull requests, code search, and Actions logs into Codex. GitHub's [Codex install guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md) authenticates the remote server with a personal access token read from an environment variable: `codex mcp add github --url https://api.githubcopilot.com/mcp/ --bearer-token-env-var GITHUB_PAT_TOKEN`. It registers many tools, so trim them with enabled_tools in config.toml, and if your GitHub workflow is light, the gh CLI through shell may be all you need.

**Best for:** multi-repo, PR-heavy work.** Tradeoffs:** large tool surface; scope it or it crowds your context.

### 4. Playwright MCP

Microsoft's Playwright server gives Codex a real browser to verify its own work: load the page it just changed, click through the flow, screenshot the result. It's one of the servers OpenAI's Codex docs list as a common choice, and it runs locally: `codex mcp add playwright -- npx @playwright/mcp@latest`.

Best for: UI verification and frontend bug reproduction. Tradeoffs: heavier than API calls, and for just reading pages, web_fetch is cheaper. Microsoft's README also suggests coding agents may do better with its Playwright CLI and skills than with the MCP server.

### 5. Sentry MCP

[Sentry's hosted server](https://docs.sentry.io/product/sentry-mcp/) pulls production errors, stack traces, and event details into the session, so Codex debugs from the real failure instead of your summary of it. Paste a Sentry issue URL and the agent fetches the issue before it touches the code.

```bash
codex mcp add sentry --url https://mcp.sentry.dev/mcp
```

The next time you run codex, it opens the OAuth flow to your Sentry account. Append /your-org/your-project to the URL to keep the session inside one project.

Best for: fixing production bugs with the actual trace in context. Tradeoffs: it sees whatever your Sentry user can see unless you scope the URL.

### 6. OpenAI Docs MCP

If you build on OpenAI's platform, this one is close to mandatory. OpenAI hosts a read-only server over its developer docs, platform docs, and the ChatGPT Learn site, so questions about the Responses API, the Agents SDK, or Codex's own config get answered from the current pages instead of the model's memory. It only searches and reads documentation; it never calls the OpenAI API for you, and it needs no key ([OpenAI Docs MCP](https://developers.openai.com/learn/docs-mcp)).

```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

OpenAI's page also suggests a short `AGENTS.md` instruction telling Codex to consult the server, because agents otherwise tend to answer OpenAI questions from training data.

### 7. Chrome DevTools MCP

Playwright drives a browser; [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) inspects one. It exposes a live Chrome session's console messages, network requests, and performance traces, which makes it the better choice for "why is this page slow" or "which request returns the 500". OpenAI's Codex docs list it among their example servers. It runs locally and needs Node.js LTS and a current Chrome:

```bash
codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

Best for: frontend performance and network debugging. Tradeoffs: for scripted end-to-end flows, Playwright is the more natural fit. The README documents a `--no-usage-statistics` flag if you want usage reporting off.

### 8. Linear MCP

Linear's hosted server finds, creates, and updates issues, projects, and comments, so Codex can read the acceptance criteria on a ticket and post a status update when the branch is ready. Run `codex mcp add linear --url https://mcp.linear.app/mcp` and Codex prompts you to sign in; [Linear's docs](https://linear.app/docs/mcp) note the steps are identical for the CLI and the IDE extension because the config is shared.

For an agent that should only read tickets, use `https://mcp.linear.app/mcp/readonly`, which exposes read tools and nothing else. Linear lists MCP access on every plan, Free included ([Linear pricing](https://linear.app/pricing), checked November 22, 2026).

### 9. Supabase MCP

Supabase's server gives Codex your tables, migrations, SQL execution, and project logs, which turns "the query is slow" into a session where the agent reads the schema and the logs itself. [Supabase's docs](https://supabase.com/docs/guides/ai-tools/mcp) give the Codex setup directly:

```bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp"
codex mcp login supabase
```

Run `/mcp` inside Codex afterward to confirm the login. The server acts with your developer permissions, so Supabase recommends scoping it before you point it at anything real: append `?project_ref=<id>` to limit it to one project and `read_only=true` to run every query as a read-only Postgres user.

Best for: schema-aware backend work on a Supabase project. Tradeoffs: write access by default, which is why the URL parameters matter.

### 10. Figma MCP

Frontend work from a mockup goes better when Codex reads the frame's actual components, variables, and layout rather than a screenshot. In the desktop app, Figma recommends installing its Codex plugin from the Plugins panel; in the CLI, add the remote server and sign in when prompted ([Figma's Codex guide](https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server)):

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

Check your seat before you plan around it. Per [Figma's rate limits page](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/) (checked November 22, 2026), Starter plans and View or Collab seats get up to 20 read tool calls a month, while Dev and Full seats on paid plans get 200 to 600 a day depending on the plan.

Two more official servers we verified for Codex but left off the ten: Vercel (`codex mcp add vercel --url https://mcp.vercel.com`, which opens Vercel's OAuth flow; see [Vercel's MCP docs](https://vercel.com/docs/agent-resources/vercel-mcp)) and Notion (add a `[mcp_servers.notion]` table with `url = "https://mcp.notion.com/mcp"`, then run `codex mcp login notion`; see [Notion's setup guide](https://developers.notion.com/guides/mcp/get-started-with-mcp)). Add them if deploys or specs are where your context lives.

## The picks side by side

| Server | What it adds | Transport | Cost |
| --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, typed decisions, research | Remote HTTP; sign-in or key for research | Free keyless; API rates when signed in |
| Context7 | Version-pinned library docs | Local stdio (npx) or remote | Free tier |
| GitHub MCP | Issues, PRs, Actions | Remote HTTP + personal access token | Free |
| Playwright MCP | Real browser automation | Local stdio | Free |
| Sentry MCP | Production errors and traces | Remote HTTP + OAuth | Free with Sentry |
| OpenAI Docs MCP | OpenAI developer documentation | Remote HTTP, no auth | Free |
| Chrome DevTools MCP | Console, network, and performance inspection | Local stdio | Free |
| Linear MCP | Issues, projects, comments | Remote HTTP + OAuth; read-only endpoint | Included on every Linear plan |
| Supabase MCP | Tables, SQL, migrations, logs | Remote HTTP + OAuth | Free with a Supabase account |
| Figma MCP | Design context from Figma files | Remote HTTP + OAuth | 20 calls/month on Starter; more with Dev or Full seats |

## One config, three surfaces

Because the CLI, IDE extension, and desktop app share `config.toml`, your MCP setup is worth curating once and then leaving alone. Keep it to a handful of servers, prefer `codex mcp add` over hand edits (one malformed TOML line takes down every surface), and check `/mcp` in the TUI when something seems missing. Project-scoped `.codex/config.toml` files cover repo-specific servers without polluting your global set.

## When a server doesn't load

Most failures come from four causes, all covered in [OpenAI's MCP docs](https://developers.openai.com/codex/mcp):

- `bearer_token_env_var` takes the name of an environment variable, not the token. Export the variable in the shell that launches Codex, or the server connects without credentials.
- A first-run `npx` download can outlast the 10-second startup window. Raise `startup_timeout_sec` for that server.
- A project-scoped `.codex/config.toml` only loads in a trusted project, so a server defined there can be invisible in a fresh clone until you trust the directory.
- On a remote machine without a browser, run `codex mcp login <name> --no-browser`, open the printed URL elsewhere, and paste the full redirect URL back into the terminal.

Still choosing an agent? See [Codex vs. Claude Code](https://parallel.ai/articles/codex-vs-claude-code) and [Codex vs. Cursor](https://parallel.ai/articles/codex-vs-cursor) for pricing, models, and how each handles MCP.

## Frequently asked questions

**Does Codex CLI support remote MCP servers?** Yes. Pass `--url` to `codex mcp add` for Streamable HTTP servers, and use `codex mcp login` for ones that authenticate with OAuth. Early Codex releases were stdio-only; that limitation is gone.

Are these servers free? Parallel MCP's keyless tools, OpenAI Docs MCP, GitHub, Playwright, and Chrome DevTools cost nothing. Context7 has a free tier, Linear includes MCP on its Free plan, Sentry's free Developer plan includes MCP access, Supabase works with a free account, and Figma's Starter plan allows 20 tool calls a month. Parallel's web_research bills at API rates once you sign in, and a new account gets up to $80 in free credits plus $5 a month with a card on file.

**Why aren't my new tools showing up?** Restart Codex after adding a server; the config is read at startup. Then check `/mcp` in the TUI and `codex mcp list` from the shell.

**MCP server or shell tool?** When a first-class CLI exists and the agent drives it well, the CLI is cheaper in context. MCP earns its keep for hosted services with OAuth, structured schemas, or state. We compare the options in [MCP vs. skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis).

**Can Codex run as an MCP server?** Not anymore. OpenAI deprecated `codex mcp-server` on August 24, 2026 and removed it on September 5, 2026. Its replacement, `codex app-server`, speaks its own JSON-RPC protocol rather than MCP and is marked experimental ([OpenAI's migration note](https://learn.chatgpt.com/docs/mcp-server)). Codex as an MCP client, everything in this guide, is unaffected.

**Plugin or MCP server?** Some vendors ship Codex plugins that bundle their MCP server with sign-in, and Context7's also adds a documentation-lookup skill. Plugins suit the desktop app; `codex mcp add` suits headless machines, CI, and anyone who wants the server without the extras.

**Do these servers work in Claude Code or Cursor?** Yes. They're standard MCP servers, so only the config format changes. Our [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) and [Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor) lists have the commands for those clients.

## One command to test it

Run the keyless codex mcp add command above, restart Codex, and ask it something that needs the current web. It costs nothing to compare against whatever you use today, and the [Parallel MCP page](https://parallel.ai/mcp) builds the Codex command with the tools and search settings you pick. When you want web_research and higher limits, use the OAuth variant; [a Parallel account](https://platform.parallel.ai/) comes with up to $80 in free credits plus $5 a month with a card on file.

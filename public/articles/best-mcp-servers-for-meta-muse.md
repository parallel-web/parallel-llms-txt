# The best MCP servers and connectors for Meta Muse in 2026

Meta's Muse AI agent has no MCP menu, but it can build a client for any MCP server and save it as a reusable skill, which makes the question of the best MCP servers for Muse a real one two weeks after launch. This guide covers the built-in connectors to turn on first, six MCP servers worth adding, the prompt that sets each one up, and when the browser is the better tool.

Meta Muse launched on September 8, 2026 with a curated list of connectors and no way to add a third-party one from a store. It can still use MCP servers. Muse runs on its own Linux virtual machine in Meta's cloud, it can write and run code there, and Meta documents a Custom Connector feature for any service with a public API or CLI. When we handed it an MCP server URL, it built a client, tested the tools, and saved the result as a skill in one exchange.

Disclosure up front: we make Parallel, and our search server is our first pick. The rest of the list is chosen for what a personal agent actually does all day, which is closer to calendars, tasks, notes, and the house than to code.

## How MCP works in Muse

There is no MCP menu. You describe the server to Muse and it builds a bridge on its VM using the official [Model Context Protocol](https://parallel.ai/articles/what-is-mcp) SDK, connects over streamable HTTP, and calls the server's tools as needed. It will ask whether the server is reachable at a URL or runs as a command, and whether it needs a key. Credentials go into Muse's Secure Credentials Store through a prompt separate from the chat, and every outbound request passes through Sentinel, the approval agent on the same machine.

Remote servers are the easy case. A server that only runs on your laptop is out of reach, because the VM is not on your home network. Our companion guide on [how to create custom integrations with Meta Muse](https://parallel.ai/articles/meta-muse-custom-integrations) walks through the whole flow, including what Muse said when we asked it to install a server.

## Turn on the built-in connectors first

Before adding anything, enable the connectors Meta already ships. They were built with the providers, come with skills Meta tuned, and run with stronger credential isolation than a custom connector gets. Go to Settings and then Connectors, or ask Muse to connect a service by name.

| Connector | What it lets Muse do | Worth knowing |
| --- | --- | --- |
| Gmail and Google Calendar | Search mail, draft and send, read and change your schedule | You choose read-only or send; approvals default on for sending |
| Google Workspace | Work with Docs, Sheets, and Drive files | Covered by Google's Limited Use policy |
| Ticketmaster | Find events and buy tickets | Launch partner; purchases always require approval |
| OpenTable | Find and book restaurant tables | Pairs well with calendar for planning |
| Spotify | Read listening history, build playlists | Read-only mode available |
| Apple Health, Peloton, Function Health | Read health, workout, and lab data | Access is managed in your device settings |
| Plaid | Read connected bank and card accounts | Read-only financial data for budgeting tasks |
| Facebook, Instagram, Threads | Read saved posts, messages, and feed | Connected automatically via Accounts Center |

The list is consumer-shaped by design. There is nothing for web research beyond Muse's own browser, nothing for notes or tasks outside Google, and nothing for the smart home yet.

## The best MCP servers for Meta Muse

### 1. Parallel Search MCP

Muse can browse the web, and browsing is the slow way to look something up. The browser sub-agent loads a results page, picks a link, reads the page, and repeats, and each step is a large chunk of context that counts against your usage meter. The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) replaces that loop with two tool calls: `web_search` returns ranked results with excerpts dense enough to answer from directly, and `web_fetch` returns any page, including PDFs, as compact markdown.

It is a hosted server at `https://search.parallel.ai/mcp`, free to use with no account or API key, and it runs on our own web-scale index. Parallel Search (advanced) scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), an independent benchmark of 25 search API products across 12 providers (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. This is the prompt we used, and Muse had both tools working and saved as a skill in under a minute:

```text
Build a custom integration to the Parallel Search MCP server at https://search.parallel.ai/mcp. It is a remote MCP server over streamable HTTP with two tools, web_search and web_fetch. No authentication is needed. Connect to it with the official MCP SDK, test both tools end to end, and save the integration as a reusable skill so you can use it for web research in any future conversation. If I later give you a Parallel API key, add it as an Authorization: Bearer header.
```

Muse offered on its own to add a Parallel API key as a bearer token for higher rate limits. A free account at [platform.parallel.ai](https://platform.parallel.ai) comes with $5 in credits every month, applied automatically, and the key can be handed over through Muse's credential prompt whenever you want it.

**Best for:** grounding anything Muse tells you in current web results, and reading specific pages without a browser session.

**Tradeoffs:** we make it, so we are biased. The anonymous endpoint runs Search in its fast mode and caps excerpts at roughly 25,000 characters per call, so long research jobs belong on the Task MCP.

### 2. Parallel Task MCP

Sometimes you want Muse to hand off an entire research job and come back later, which is the shape Muse itself was built for. The [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) at `https://task-mcp.parallel.ai/mcp` exposes Parallel's web agents: asynchronous subagents that plan sub-queries, read across many sources, and return a structured, cited result. That covers a single deep-research report and batch jobs like researching every school, contractor, or clinic on a list.

This one needs a Parallel API key from the start, entered through the credential flow. The setup prompt is the same as above with the URL changed and a line telling Muse the server requires an Authorization: Bearer header.

**Best for:** research that should run in the background while Muse does something else, and any list you want filled in with sourced facts.

**Tradeoffs:** jobs take minutes rather than seconds, and the deeper processors cost real money per run. Start with the cheaper tiers.

### 3. Notion MCP

Notion's hosted server at `https://mcp.notion.com/mcp` gives an agent read and write access to pages and databases, with tools built for agents, including editing pages in Markdown. For anyone whose plans, reading lists, and household notes live in Notion, it turns Muse's planning output into something that lands where you already look.

Notion's server uses OAuth rather than an API key, and Muse's custom connector flow is built around keys and headers. In our experience with other agents, OAuth-only remote servers add friction, and we have not verified the Notion flow end to end inside Muse. If it stalls, Notion's internal integration tokens, created in your workspace settings, are a fallback that fits the key-based path.

**Best for:** getting Muse's plans, research, and summaries into the workspace you use, and letting it read what is already there.

**Tradeoffs:** OAuth setup may take more than one message, and write access to your notes is the kind of permission worth holding to approval-required.

### 4. Todoist

Muse manages goals and tasks on its own, and many people already have a task system they trust. Todoist offers two agent surfaces: a hosted MCP server at `https://ai.todoist.net/mcp` that uses OAuth, and an official CLI, `@doist/todoist-cli`, that installs from npm and authenticates with a token. Meta says Muse Spark was trained on zero-shot tool calling through CLIs and that the VM can install packages, so the CLI is likely the shorter path here. Ask Muse to install the CLI, hand it a Todoist API token from Settings, Integrations, Developer through the credential prompt, and have it save a skill.

Todoist also supports a read-only login mode, which is a good default while you decide how much you want Muse rescheduling.

**Best for:** letting Muse capture, triage, and reschedule tasks in the list you already keep, instead of a second one inside Muse.

**Tradeoffs:** two surfaces means one more decision, and the MCP server's OAuth flow is the less certain of the two inside Muse.

### 5. Home Assistant MCP server

Meta lists the smart home among Muse's connector categories, but no home connector shipped at launch. Home Assistant fills the gap. Its official [MCP Server integration](https://www.home-assistant.io/integrations/mcp_server) exposes the same Assist API a voice assistant uses, so an agent can read the state of your exposed devices and control them. The URL is your own instance's external address followed by `/api/mcp`, and while OAuth is the default, Home Assistant also supports long-lived access tokens for clients that cannot do OAuth, which is the key-style auth Muse asks for.

Because Muse lives in Meta's cloud, your Home Assistant instance has to be reachable from the internet. Home Assistant Cloud gives you a stable public URL without a reverse proxy.

**Best for:** giving Muse a real hook into the house, so "turn the heating down when I leave" is a tool call rather than a suggestion.

**Tradeoffs:** exposing your home to a cloud agent is the biggest trust decision on this list. Expose only the entities you need, and keep approvals on for anything that opens or unlocks.

### 6. GitHub MCP

This one is for the developers among Muse's users. GitHub's hosted server at `https://api.githubcopilot.com/mcp/` lets an agent read repositories and files, manage issues and pull requests, and check workflow runs. It accepts either OAuth or a personal access token, and the token path fits Muse's credential flow directly.

**Best for:** asking Muse to summarize what changed in a repo, file an issue from a conversation, or keep an eye on a project you maintain.

**Tradeoffs:** Muse is not a coding agent. Meta ships Muse Code for that. Treat this as a way to read and track GitHub, and keep write scopes narrow.

## The picks side by side

| Server | URL or entry point | Auth | What it adds |
| --- | --- | --- | --- |
| Parallel Search MCP | https://search.parallel.ai/mcp | None; optional API key | Web search and page fetch in one call |
| Parallel Task MCP | https://task-mcp.parallel.ai/mcp | API key required | Background deep research and enrichment |
| Notion MCP | https://mcp.notion.com/mcp | OAuth | Read and write your Notion workspace |
| Todoist | https://ai.todoist.net/mcp or @doist/todoist-cli | OAuth, or API token via CLI | Tasks in the list you already keep |
| Home Assistant | https://<your-instance>/api/mcp | OAuth or long-lived token | Read and control your smart home |
| GitHub MCP | https://api.githubcopilot.com/mcp/ | OAuth or personal access token | Repos, issues, and pull requests |

## When the browser or a built-in connector is better

An MCP server is worth adding when Muse will use the capability often, when the service has no built-in connector, and when the API call is cheaper than a browser session. That describes web search, tasks, notes, and the home.

It is not worth adding when a built-in connector exists. Built-ins get skills Meta wrote and privilege separation the custom path does not, so use them for Google, Spotify, and the launch partners. And for a site you will touch once, the browser is fine. Muse already knows how to fill a form, and a one-off booking does not justify integration work.

## Frequently asked questions

**Does Meta Muse support MCP servers?** Not through a settings screen. Muse builds an MCP client on its own VM when you describe a server to it, and saves the integration as a skill. Remote servers over streamable HTTP are the reliable path; a server on your own computer is not reachable from Meta's cloud.

**What is the best MCP server for Meta Muse?** For most people, a web search server, because it replaces Muse's most expensive habit, browsing to answer factual questions, with a single tool call. The Parallel Search MCP is free and needs no key. After that, pick by where your tasks, notes, and home already live.

**Can I add a connector to the Muse connector store?** Meta has not published a way to submit one. Connector status is also not required. Any service with a public API, a CLI, or a hosted MCP server can be connected today as a custom connector.

**Is it safe to give Muse an API key?** Enter it through Muse's credential prompt rather than the chat. Meta stores it outside the agent's runtime and swaps a surrogate for the real key at the network boundary, so the agent never holds the secret. Meta does not review custom connectors, so only connect services you trust with the data involved.

**Will custom connectors use up my free tier?** Yes, they consume the same usage meter as everything else Muse does, which is a reason to prefer an API call over a browser session for anything you do regularly. Meta says most of what people need is free, with Power at $20 a month and Maximum at $100 a month above that.

## Start with search

The prompt in the first section is the whole setup for the Parallel Search MCP, and it never asks for an account or a key. If Muse becomes part of how you work, [create a free Parallel account](https://platform.parallel.ai/) for higher rate limits and the $5 monthly credit that also covers the Task MCP.

_Note: Muse is new and Meta is changing it quickly. Check Meta's Help Center for the current connector list and settings._

Related reading: [How to create custom integrations with Meta Muse](https://parallel.ai/articles/meta-muse-custom-integrations) · [The best web search MCP server in 2026](https://parallel.ai/articles/best-web-search-mcp) · [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) · [The best MCP servers for OpenClaw in 2026](https://parallel.ai/articles/best-mcp-servers-for-openclaw)

# The best MCP servers and connectors for Meta Muse in 2026

The best MCP servers for Meta Muse depend on how each service gets in: through a built-in connector, through a Custom Connector that Muse writes for itself, or through Muse Code's settings file. This guide covers the connectors Meta has added since launch, six services worth connecting and the right route for each, a one-message setup prompt for Parallel MCP, and when the browser is enough.

Meta Muse launched on September 8, 2026 with a curated list of connectors, and the list has grown quickly since. At Connect on September 24, Meta added work connectors for [Notion, Granola, GitHub, and Box](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/) alongside new shopping and travel partners, and the [Muse for Small Business launch](https://about.fb.com/news/2026/09/introducing-muse-small-business/) on September 29 added Slack, Asana, Dropbox, Canva, Figma, Stripe, and more. For services that aren't on the list, MCP still works. Muse runs on its own Linux virtual machine in Meta's cloud, it can write and run code there, and Meta documents a Custom Connector feature for any service with a public API or CLI. When we handed it an MCP server URL, it built a client, tested the tools, and saved the result as a skill in one exchange.

Disclosure up front: we make Parallel, and our search server is our first pick. The rest of the list is chosen for what a personal agent actually does all day, which is closer to calendars, tasks, notes, and the house than to code.

## How MCP works in Muse

There is no MCP menu. You describe the server to Muse and it builds a bridge on its VM using the official [Model Context Protocol](https://parallel.ai/articles/what-is-mcp) SDK, connects over streamable HTTP, and calls the server's tools as needed. It will ask whether the server is reachable at a URL or runs as a command, and whether it needs a key. Credentials go into Muse's Secure Credentials Store through a prompt separate from the chat, and every outbound request passes through Sentinel, the approval agent on the same machine.

Remote servers are the easy case. A server that only runs on your laptop is out of reach, because the VM is not on your home network. Our companion guide on [how to create custom integrations with Meta Muse](https://parallel.ai/articles/meta-muse-custom-integrations) walks through the whole flow, including what Muse said when we asked it to install a server.

Muse Code, Meta's terminal coding agent, is the other route, and it supports MCP directly. It reads servers from the mcpServers block of ~/.config/muse/settings.json, which must include "schema_version": 1. An entry with a url is a Streamable HTTP server, a headers object carries an API key, and `muse mcp login <server>` handles OAuth 2.1 sign-in for servers that need it. [Meta's docs](https://dev.meta.ai/docs/muse-code/extending) note that MCP tools run outside Muse Code's sandbox, so connect only servers you trust.

```json
{
  "schema_version": 1,
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

Developers who want a listed connector have a third path. Meta's [Muse Connector Platform](https://platform.muse.ai/) takes submissions of API and MCP connectors, reviews them for functional, security, and legal requirements with end-to-end testing, and lists approved ones in Settings > Connectors. That route is for the company that runs the service; as a user, you choose between the built-in list, a Custom Connector, and Muse Code.

## Turn on the built-in connectors first

Before adding anything, enable the connectors Meta already ships. They were built with the providers, come with skills Meta tuned, and run with stronger credential isolation than a custom connector gets. Go to Settings and then Connectors, or ask Muse to connect a service by name.

| Connector | What it lets Muse do | Worth knowing |
| --- | --- | --- |
| Gmail and Google Calendar | Search mail, draft and send, read and change your schedule | You choose read-only or send; approvals default on for sending |
| Google Workspace | Work with Docs, Sheets, and Drive files | Covered by Google's Limited Use policy |
| Notion, GitHub, Box, Granola | Work docs, repositories, files, and meeting notes | Announced at Connect on September 24 |
| Todoist | Find, add, and update tasks and projects | Asks for approval before important actions by default |
| Zapier | Run actions across the apps connected to your Zapier account | Zapier says rollout is staged |
| Slack, Asana, Dropbox, Canva, Figma, Stripe, and others | Business tools from the Muse for Small Business launch | Announced September 29 |
| Ticketmaster and OpenTable | Find events, buy tickets, and book tables | Purchases always require approval |
| Walmart, Best Buy, Sephora, Wayfair, Instacart | Shopping and groceries | Expedia for travel was announced as coming soon |
| Spotify | Read listening history, build playlists | Read-only mode available |
| Apple Health, Peloton, Function Health | Read health, workout, and lab data | Access is managed in your device settings |
| Plaid | Read connected bank and card accounts | Read-only financial data for budgeting tasks |
| Facebook, Instagram, Threads | Read saved posts, messages, and feed | Connected automatically via Accounts Center |

Connectors roll out in stages, so check Settings > Connectors for what your account has today. Two gaps matter for this guide: we found no built-in connector for web search beyond Muse's own browser, and none for the smart home.

## The best MCP servers for Meta Muse

### 1. Parallel MCP

Muse can browse the web, and browsing is the slow way to look something up. The browser sub-agent loads a results page, picks a link, reads the page, and repeats, and each step is a large chunk of context that counts against your usage meter. [Parallel MCP](https://parallel.ai/mcp) replaces that loop with direct tool calls: web_search returns ranked results with excerpts dense enough to answer from, web_fetch reads up to 20 URLs per call, PDFs included, and returns relevant excerpts or full markdown, and web_decisions answers typed questions, such as a probability or a pick among options, with sources.

It is a hosted server at https://mcp.parallel.ai/mcp, and its search, fetch, and decisions tools are free to use with no account or API key. It runs on our own web-scale index. Parallel Search (advanced) scores 75 on the [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), an independent benchmark of 25 search API products across 12 providers (September 2026 data), behind Perplexity Search (medium) at 80 and Octen Search at 77. Muse connects to it as a Custom Connector. When we tested this in September, with the earlier two-tool server, Muse had search and fetch working and saved as a skill in under a minute. This is the same prompt, updated for Parallel MCP:

```text
Build a custom integration to the Parallel MCP server at https://mcp.parallel.ai/mcp. It is a remote MCP server over streamable HTTP. Without authentication it offers three tools: web_search, web_fetch, and web_decisions. Connect to it with the official MCP SDK, test web_search and web_fetch end to end, and save the integration as a reusable skill so you can use it for web research in any future conversation. If I later give you a Parallel API key, add it as an Authorization: Bearer header; that also adds a fourth tool, web_research, for cited answers to harder questions.
```

Muse offered on its own to add a Parallel API key as a bearer token for higher rate limits. With a key, web_research becomes available too: it researches one question and returns a cited answer in the same call. A free account at [platform.parallel.ai](https://platform.parallel.ai) comes with up to $80 in free credits plus $5 a month with a card on file, and the key can be handed over through Muse's credential prompt whenever you want it.

**Best for:** grounding anything Muse tells you in current web results, and reading specific pages without a browser session.

Tradeoffs: we make it, so we are biased. Keyless calls run Search in its fast mode at lower rate limits, and web_research needs a key. Parallel MCP also offers OAuth sign-in at https://mcp.parallel.ai/mcp?login, but we haven't tested that flow inside Muse's Custom Connector, so the API key is the path we can vouch for.

### 2. Zapier

Zapier is now a built-in Muse connector, and it runs on [Zapier MCP](https://zapier.com/blog/zapier-connector-in-muse/): once you authorize it, Muse can run actions across the apps connected to your Zapier account, limited to the apps and actions you approve there. That makes it the quickest way to reach the long tail of tools that have no Muse connector of their own, from a CRM to a niche invoicing app. Zapier says the integration is staged for deployment, so if it isn't in your Settings > Connectors yet, it should arrive with Meta's rollout.

In Muse Code, add Zapier's hosted server at https://mcp.zapier.com/api/v1/connect and sign in with `muse mcp login zapier`.

Best for: email follow-ups, CRM updates, and any app that has no Muse connector, with permissions set per action in Zapier.

Tradeoffs: tool calls count against your Zapier plan's task allowance, and Zapier sits between Muse and every app, so you are trusting a second company with those connections.

### 3. Notion

Notion is now a [built-in Muse connector](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/), announced at Connect on September 24, so connect it under Settings > Connectors rather than building anything. For anyone whose plans, reading lists, and household notes live in Notion, it turns Muse's planning output into something that lands where you already look.

In Muse Code, use Notion's hosted MCP server at https://mcp.notion.com/mcp, which gives an agent read and write access to pages and databases. It uses OAuth, which `muse mcp login notion` handles.

**Best for:** getting Muse's plans, research, and summaries into the workspace you use, and letting it read what is already there.

Tradeoffs: write access to your notes is the kind of permission worth keeping on approval-required.

### 4. Todoist

Muse manages goals and tasks on its own, and many people already have a task system they trust. Todoist is now a [built-in Muse connector](https://www.todoist.com/help/todoist/todoist-and-ai/use-todoist-in-muse-SR2hRE3Ov) on every Todoist plan: go to Settings > Connectors, select Connect next to Todoist, and approve the permissions. Muse can then find, add, and update tasks and projects, and assign tasks in shared projects. In Muse Code, Todoist's hosted MCP server at https://ai.todoist.net/mcp uses OAuth.

**Best for:** letting Muse capture, triage, and reschedule tasks in the list you already keep, instead of a second one inside Muse.

Tradeoffs: the connector can read and change your whole task list. Todoist notes that Muse asks for approval before important actions by default, but it's worth checking each change before you confirm it.

### 5. Home Assistant MCP server

Meta lists the smart home among Muse's connector categories, but we found no home connector in its announcements through October. Home Assistant fills the gap. Its official [MCP Server integration](https://www.home-assistant.io/integrations/mcp_server) exposes the same Assist API a voice assistant uses, so an agent can read the state of your exposed devices and control them. The URL is your own instance's external address followed by /api/mcp, and while OAuth is the default, Home Assistant also supports long-lived access tokens for clients that cannot do OAuth, which is the key-style auth Muse asks for.

Because Muse lives in Meta's cloud, your Home Assistant instance has to be reachable from the internet. Home Assistant Cloud gives you a stable public URL without a reverse proxy.

**Best for:** giving Muse a real hook into the house, so "turn the heating down when I leave" is a tool call rather than a suggestion.

**Tradeoffs:** exposing your home to a cloud agent is the biggest trust decision on this list. Expose only the entities you need, and keep approvals on for anything that opens or unlocks.

### 6. GitHub

This one is for the developers among Muse's users. GitHub is now a [built-in Muse connector](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/), announced at Connect, so connect it from Settings > Connectors to have Muse summarize what changed in a repo or file an issue. GitHub's hosted MCP server at https://api.githubcopilot.com/mcp/ is the route for Muse Code, where it reads repositories and files, manages issues and pull requests, and checks workflow runs. It accepts OAuth or a personal access token sent as a header.

**Best for:** asking Muse to summarize what changed in a repo, file an issue from a conversation, or keep an eye on a project you maintain.

Tradeoffs: in consumer Muse, treat GitHub as something to read and track and keep write scopes narrow. For code changes, Muse Code with the MCP server is the better fit.

## The picks side by side

| Service | Best route in Muse | Auth | What it adds |
| --- | --- | --- | --- |
| Parallel MCP | Custom Connector, or https://mcp.parallel.ai/mcp in Muse Code | None; optional API key | Web search, page fetch, and typed decisions |
| Zapier | Built-in connector; https://mcp.zapier.com/api/v1/connect in Muse Code | OAuth | Actions across apps connected to Zapier |
| Notion | Built-in connector; https://mcp.notion.com/mcp in Muse Code | OAuth | Read and write your Notion workspace |
| Todoist | Built-in connector; https://ai.todoist.net/mcp in Muse Code | OAuth | Tasks in the list you already keep |
| Home Assistant | Custom Connector at https://<your-instance>/api/mcp | Long-lived token or OAuth | Read and control your smart home |
| GitHub | Built-in connector; https://api.githubcopilot.com/mcp/ in Muse Code | OAuth or personal access token | Repos, issues, and pull requests |

## When the browser or a built-in connector is better

An MCP server or Custom Connector is worth adding when Muse will use the capability often, when the service has no built-in connector, and when the API call is cheaper than a browser session. Today that describes web search and the home.

It is not worth adding when a built-in connector exists. Built-ins get skills Meta wrote and privilege separation the custom path does not, so use them for Google, Notion, Todoist, GitHub, and the rest of the list. And for a site you will touch once, the browser is fine. Muse already knows how to fill a form, and a one-off booking does not justify integration work.

## Frequently asked questions

Does Meta Muse support MCP servers? In the consumer app, not through a settings screen: Muse builds an MCP client on its own VM when you describe a server to it and saves the integration as a skill, and remote servers over streamable HTTP are the reliable path. Muse Code, Meta's coding agent, supports MCP servers directly in its settings file, including OAuth sign-in. A server on your own computer is not reachable from Meta's cloud, though Muse Code runs locally and can start local servers.

What is the best MCP server for Meta Muse? For most people, a web search server, because it replaces Muse's most expensive habit, browsing to answer factual questions, with a single tool call. Parallel MCP's search, fetch, and decisions tools are free and need no key. After that, check the built-in connectors before adding anything for tasks, notes, or code.

Can I add a connector to Muse's connector list? Developers can. Meta's [Muse Connector Platform](https://platform.muse.ai/) accepts API and MCP connectors, reviews each one, and lists approved connectors in Settings > Connectors. As a user you don't need a listing: any service with a public API, a CLI, or a hosted MCP server can be connected today as a Custom Connector.

**Is it safe to give Muse an API key?** Enter it through Muse's credential prompt rather than the chat. Meta stores it outside the agent's runtime and swaps a surrogate for the real key at the network boundary, so the agent never holds the secret. Meta does not review custom connectors, so only connect services you trust with the data involved.

**Will custom connectors use up my free tier?** Yes, they consume the same usage meter as everything else Muse does, which is a reason to prefer an API call over a browser session for anything you do regularly. Meta says most of what people need is free, with Power at $20 a month and Maximum at $100 a month above that.

## Start with search

The prompt in the first section is the whole setup for Parallel MCP, and it never asks for an account or a key; the [Parallel MCP page](https://parallel.ai/mcp) has the current tool list and a setup prompt for other agents. If Muse becomes part of how you work, [create a free Parallel account](https://platform.parallel.ai/) for higher rate limits and web_research, with up to $80 in free credits plus $5 a month with a card on file.

_Note: Muse is new and Meta is changing it quickly. Check Meta's Help Center for the current connector list and settings._

Related reading: [How to create custom integrations with Meta Muse](https://parallel.ai/articles/meta-muse-custom-integrations) / [The best web search MCP server in 2026](https://parallel.ai/articles/best-web-search-mcp) / [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) / [The best MCP servers for OpenClaw in 2026](https://parallel.ai/articles/best-mcp-servers-for-openclaw)

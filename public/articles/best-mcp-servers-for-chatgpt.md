# The best MCP servers for ChatGPT in 2026: plugins and custom connections

ChatGPT MCP support now runs through one place, the Plugins directory, where popular services install in a click and anything unlisted connects as a custom server URL. Which route works depends on the service, your plan, and your workspace admin. This guide covers both routes, nine servers worth connecting from web search to Stripe and Zapier, and the permission rules that decide what ChatGPT can change.

ChatGPT reaches outside services through [MCP](https://parallel.ai/articles/what-is-mcp), the Model Context Protocol, even when the interface never uses the word. On July 9, 2026, OpenAI moved its app directory into a Plugins directory. In OpenAI's current vocabulary an app is the connection to an external service, usually an MCP server, and a plugin is the installable package that holds one or more apps plus optional skills. Older guides say "connectors" or "apps" for the same plumbing.

Disclosure: we build Parallel, which is the first pick below. The other eight are official servers from the vendors themselves, picked for what people do in a chat assistant: documents, tickets, designs, payments, and automations.

## How MCP works in ChatGPT

There are two ways in, and both end up as an installed plugin you can call with @ in the composer.

**The Plugins directory.** Click Plugins in the sidebar on web, desktop, or mobile, open a listing, select Install plugin, and complete the provider's sign-in when prompted. OpenAI says the directory is visible on every ChatGPT plan, but whether you can install a given plugin depends on your plan, region, workspace, and role. Some listings carry a Desktop only label and run only in the ChatGPT desktop app.

**A custom MCP server.** For anything not in the directory, go to [Plugins](https://chatgpt.com/plugins), select the plus button, then Add custom MCP server. Enter a name, paste the server's public HTTPS endpoint under Connection, choose an authentication method, tick I understand and want to continue, and select Create as a plugin. OpenAI's [help article on custom MCP servers](https://help.openai.com/en/articles/12584461) says you no longer need to turn on Developer Mode first; you acknowledge a risk warning for each server instead.

The custom route has limits worth knowing before you start:

- **Plans.** OpenAI's help center lists custom MCP connections with full support, including write actions, for Business, Enterprise, and Edu on ChatGPT web. Pro users can connect custom servers with read and fetch permissions. OpenAI doesn't spell out Plus or Free on that page, though Zapier's ChatGPT guide lists Plus and Pro for creating your own plugin. If Add custom MCP server doesn't appear under the plus button, your plan or workspace doesn't allow it.
- **Surfaces.** Custom servers are web only. Installed directory plugins work on mobile too.
- **Remote only.** ChatGPT connects to public remote servers over Streamable HTTP. A server on your laptop or private network needs OpenAI's [Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels).
- **OAuth.** ChatGPT handles OAuth sign-in for servers that advertise it. Without refresh tokens (the offline_access scope), expect to reauthenticate when the first token expires.

**Read and write actions.** Each connected app has a permission setting: Always ask, Allow read actions, Allow low-risk actions, or, for eligible apps, Allow all actions. For writes, ChatGPT asks for confirmation based on that setting and the action's context, and it blocks some risky actions outright. Deep research can call custom apps for reads and fetches only.

**Admin controls.** In Business workspaces only admins and owners can create and publish custom MCP plugins. Enterprise and Edu admins can grant the Create plugins with MCPs permission by role (it's off by default on Enterprise), choose which groups see each app, and switch individual actions on or off before and after publishing. Published servers run from a frozen snapshot of their tools: new tools stay disabled until an admin refreshes and approves them.

The ChatGPT desktop app has one more door. Its Settings → MCP servers screen adds STDIO or Streamable HTTP servers for Codex in the desktop app and shares `~/.codex/config.toml` with Codex CLI, so local servers work there. That's a coding setup; our [Codex CLI guide](https://parallel.ai/articles/best-mcp-servers-for-codex-cli) covers it.

## The best MCP servers for ChatGPT

### 1. Parallel MCP

ChatGPT already searches the web, and for a conversational answer with a few citations it does that job well. [Parallel MCP](https://parallel.ai/mcp) gives it a different set of tools for heavier research. `web_search` returns ranked results with excerpts dense enough to answer from, so ChatGPT can compare a dozen sources without opening each. `web_fetch` reads up to 20 specific URLs per call, including PDFs and JavaScript-heavy pages, and returns the relevant excerpts or the full page as markdown. `web_decisions` answers typed questions, such as a probability, a pick among options you list, or a score on a scale, with sources; ask for it by name ("Use Parallel Decisions to..."). `web_research`, available when you sign in, researches one question and returns a cited answer in the same call.

There are two ways to add it. The quickest is the [Parallel Search listing](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) in the Plugins directory, published by Parallel Web Systems, which brings web search and page extraction: open it, select Install plugin, and you're done. To get every tool, use the one-click ChatGPT install on the Parallel MCP page or add it as a custom MCP server yourself:

```text
Name: Parallel
Connection: https://mcp.parallel.ai/mcp
Authentication: No authentication

# To add web_research and higher limits, sign in instead:
Connection: https://mcp.parallel.ai/mcp?login
Authentication: OAuth
```

The plain URL needs no account or key and gives you `web_search`, `web_fetch`, and `web_decisions` for free at lower rate limits. We ran initialize and tools/list against it today with no credentials, and a `web_search` call returned in 0.84 seconds. Every Parallel tool is annotated read-only, so ChatGPT treats them as reads, which matters on Pro, where custom servers get read and fetch permissions, and in deep research. The `?login` URL signs in with your Parallel account over OAuth and bills calls at API rates: $1 per 1,000 requests for the Search API's fast mode and $1 per 1,000 URLs for Extract. New accounts get up to $80 in free credits plus $5 a month with a card on file.

Best for: research-heavy chats that need many sources or a specific list of pages. Tradeoffs: we're the vendor, the custom route depends on your plan, and keyless use runs at personal-scale rate limits.

### 2. Notion

Notion is in the Plugins directory, and Notion's own [MCP setup guide](https://developers.notion.com/guides/mcp/get-started-with-mcp) says the easiest way to connect is through your assistant's plugin library. ChatGPT can then search your workspace, create pages, and update databases with your access. If your workspace hasn't enabled the listing, the hosted server at https://mcp.notion.com/mcp works as a custom server with OAuth. Notion Enterprise admins can use MCP Governance to approve which AI clients may connect at all.

Best for: turning a chat into a spec or project page. Tradeoffs: it can write anywhere your Notion account can, so keep its permission on Always ask at first.

### 3. Linear

Linear has a directory plugin for finding and referencing issues and projects. The custom route earns its place when you want a stricter scope. [Linear's MCP docs](https://linear.app/docs/mcp) offer https://mcp.linear.app/mcp for read-write access and https://mcp.linear.app/mcp/readonly, which only ever exposes read tools. Both use OAuth 2.1 with dynamic client registration, so ChatGPT opens Linear's sign-in for you.

Best for: product and engineering teams who want ChatGPT to draft issues from a conversation or summarize a project's status. Tradeoffs: each Linear workspace needs its own auth session, and the default endpoint can create and update issues.

### 4. Atlassian Rovo

Atlassian Rovo is in the directory and covers Jira and Confluence. Behind it sits Atlassian's [Rovo MCP Server](https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/), now at https://mcp.atlassian.com/v2/mcp, which also reaches Jira Service Management, Bitbucket, Loom, and Compass over OAuth 2.1 or an API token. Use the plugin first.

Best for: summarizing a sprint, drafting Confluence pages, or creating Jira work items from meeting notes. Tradeoffs: Atlassian says some tools consume Rovo credits, mostly 1–10 per call, and organizations with IP allowlisting need requests to come from allowed addresses.

### 5. GitHub

Use the built-in plugin. The GitHub listing is built by OpenAI and supports interactive views and write actions. Per [OpenAI's GitHub help article](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt), you connect from Settings → Plugins → GitHub, install the ChatGPT app on GitHub, and pick the repositories it can see; content is fetched on demand, and new repositories take about five minutes to appear. GitHub's hosted MCP server (https://api.githubcopilot.com/mcp/) targets coding clients, and GitHub's installation guide doesn't list ChatGPT.

Best for: PR summaries and code questions. Tradeoffs: organizations may need an admin to approve the ChatGPT app first.

### 6. Canva

Canva's plugin generates designs from a prompt, shows previews in the chat, and opens your pick in Canva for editing. It can also search, resize, copy, and translate existing designs. [Canva's help center](https://www.canva.com/help/chatgpt-templates) says it works with every Canva account, including Free and Education, and paid plans can search brand templates. There's no reason to add Canva as a custom server.

Best for: decks, social posts, and one-pagers that start from a ChatGPT outline. Tradeoffs: in Business and Enterprise workspaces an admin has to enable the app, and a Canva team admin may need to allow AI assistants too.

### 7. Figma

The Figma plugin turns prompts into FigJam diagrams and Figma Slides presentations, and [Figma's help article](https://help.figma.com/hc/en-us/articles/35326636109975-Use-ChatGPT-with-Figma) says it's available on any Figma plan. That page also says ChatGPT can't create files for Figma's other products, the integration isn't available in the EU yet, and Slides support is in beta with usage limits.

Best for: flowcharts from a PRD and quick presentation drafts. Tradeoffs: for design-to-code work against real Figma Design files, use Figma's remote MCP server from a coding agent; our [Cursor guide](https://parallel.ai/articles/best-mcp-servers-for-cursor) has the config.

### 8. Stripe

[Stripe's MCP docs](https://docs.stripe.com/mcp) point ChatGPT users to the official [Stripe plugin](https://chatgpt.com/plugins/plugin_connector_690ab09fa43c8191bca40280e4563238), which connects through OAuth to the server at https://mcp.stripe.com. On Stripe's consent page you choose which live accounts or sandboxes ChatGPT can reach, with separate permissions for each. The tools cover reads and writes across most of the Stripe API, plus docs search and an analytics tool in preview.

Best for: founders and finance teams who want answers from live revenue data without building a report. Tradeoffs: writes touch real customers and money. Grant sandbox access first and keep ChatGPT's permission on Always ask. Stripe admins can switch MCP access off for the whole team in the Dashboard.

### 9. Zapier

Zapier fills the gap for the thousands of tools with no plugin of their own: [Zapier MCP](https://zapier.com/mcp) exposes actions across more than 9,000 apps through one server. It's a custom connection, and [Zapier's ChatGPT guide](https://docs.zapier.com/mcp/get-started/connect/chatgpt) spells out the fields:

```text
Name: Zapier MCP
Connection: https://mcp.zapier.com/api/v1/connect
Authentication: OAuth
```

Sign in to Zapier when prompted, then pick which apps and actions to expose. On Business, Enterprise, and Edu, an admin can create the app once and set it to install for every member; Zapier's rollout guide says that path needs a Zapier Enterprise account.

Best for: reaching a CRM, spreadsheet, or internal tool that has no ChatGPT plugin. Tradeoffs: each successful tool call uses two tasks from your Zapier plan, and every app you expose widens what ChatGPT can change.

HubSpot, Box, Dropbox, Slack, Gmail, Google Drive, and many others have their own directory listings. Install those before reaching for a custom URL.

## The picks side by side

| Server | Best route in ChatGPT | Custom server URL | Auth | What it adds |
| --- | --- | --- | --- | --- |
| Parallel MCP | Directory listing, or custom URL for all tools | https://mcp.parallel.ai/mcp | None, or OAuth via ?login | Web search, page fetch, decisions, research |
| Notion | Directory plugin | https://mcp.notion.com/mcp | OAuth | Read and write pages and databases |
| Linear | Directory plugin, or custom for read-only | https://mcp.linear.app/mcp/readonly | OAuth | Issues, projects, comments |
| Atlassian Rovo | Directory plugin | https://mcp.atlassian.com/v2/mcp | OAuth or API token | Jira, Confluence, Bitbucket, Loom |
| GitHub | Directory plugin | None for ChatGPT | GitHub app install | Repos, PRs, issues |
| Canva | Directory plugin | None needed | Canva sign-in | Designs and decks |
| Figma | Directory plugin | None for ChatGPT | Figma sign-in | FigJam diagrams, Slides |
| Stripe | Directory plugin | https://mcp.stripe.com | OAuth | Payments, subscriptions, analytics |
| Zapier | Custom server | https://mcp.zapier.com/api/v1/connect | OAuth | Actions in 9,000+ apps |

## Frequently asked questions

Does ChatGPT support MCP? Yes. Every app in the Plugins directory connects through MCP, and eligible accounts can add any public remote MCP server from Plugins → + → Add custom MCP server.

Do I still need Developer Mode to add an MCP server to ChatGPT? No. OpenAI's help center says the current Plugins experience lets you add a custom MCP server directly; you confirm a risk warning for each server instead of flipping a global switch. Plan and workspace rules still decide whether the option appears.

Can I use custom MCP servers on ChatGPT Plus or Free? OpenAI documents custom servers with write actions for Business, Enterprise, and Edu, and read and fetch access for Pro. Zapier's guide also lists Plus for creating your own plugin, while Free isn't mentioned. Directory plugins are the dependable route on personal plans, and Parallel's listing works there without a custom connection.

Can ChatGPT connect to a local MCP server? Not on the web. ChatGPT connects to remote servers, and OpenAI's Secure MCP Tunnel bridges servers on a private network. The desktop app's Settings → MCP servers screen can run local STDIO servers for Codex.

Do custom MCP servers work in the ChatGPT mobile app? No, custom servers are web only. Plugins you install from the directory do work on mobile.

## Try it in one chat

Install the [Parallel Search listing](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5), use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp), or add https://mcp.parallel.ai/mcp as a custom server with No authentication, then ask ChatGPT a question that needs a dozen current sources. Nothing gets billed and no account is needed. When you want `web_research`, switch the URL to https://mcp.parallel.ai/mcp?login and sign in. The [installation docs](https://docs.parallel.ai/integrations/mcp/installation) cover the same server in more than 20 other clients.

Related reading: [The best MCP servers for Claude](https://parallel.ai/articles/best-mcp-servers-for-claude) / [The best web search MCP server](https://parallel.ai/articles/best-web-search-mcp) / [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers)

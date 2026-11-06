# The best Claude MCP servers in 2026: connectors for claude.ai, Desktop, and mobile

Claude MCP servers turn the chat app into a workspace that can search the web, file a Jira ticket, or pull last week's meeting notes. This guide picks nine worth connecting in claude.ai, Claude Desktop, and the mobile apps, with the directory or custom-connector route for each, the plan limits that apply, and a side-by-side table.

In Claude's apps, an [MCP](https://parallel.ai/articles/what-is-mcp) server is called a connector. You add it once to your Claude account, and it follows you from claude.ai to Claude Desktop to the iOS and Android apps, because Anthropic's cloud makes the connection rather than your laptop. That makes the choice of servers different from a coding agent's: chat users want their docs, tickets, designs, and meeting notes, plus a way to read the current web. If you work in the terminal, our [Claude Code list](https://parallel.ai/articles/best-mcp-servers-for-claude-code) covers that client instead.

We make Parallel, so the first pick is ours. Every other pick is a vendor's own hosted server that's listed in Claude's Connectors Directory.

## How MCP works in Claude

There are two routes for a remote server, and one extra route on the desktop.

**The Connectors Directory.** Anthropic's [Connectors Directory](https://claude.com/docs/connectors/directory) is one catalog for claude.ai, Claude Desktop, mobile, Claude Code, and Cowork. Open it from **Customize > Connectors** and the "+" button, or from the "+" menu in a chat under Connectors > Manage connectors. Each listing shows the vendor, the tools, and whether sign-in is required. Click Connect, finish the vendor's OAuth screen, and you're done. If a service is in the directory, start there.

**Custom connectors.** For anything else, go to **Customize > Connectors**, click Add, hover over Custom, and pick Web, then paste the server URL ([Anthropic's guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). Claude detects the auth settings and lets you change them: "Sign in now", "Sign in when needed", or "No sign in", plus an OAuth client choice ("Use Claude's published identity", "Register automatically", or your own client ID). Custom connectors are available on Free, Pro, Max, Ultra, Team, and Enterprise plans, and Free users are limited to one. Two details trip people up. Claude reaches your server from Anthropic's IP ranges, so a server on a VPN or private network won't connect even if your laptop can reach it. And you can't edit auth settings after saving; remove the connector and add it again. Vendor guides written earlier in the year often say Settings > Connectors, which is the older name for the same page.

API-key servers use the **Request headers** section of the same dialog: pick `authorization` or `x-api-key`, and type the full value, including the `Bearer ` prefix, because Claude sends exactly what you enter. Per [Claude's docs](https://claude.com/docs/connectors/custom/add-unlisted), request headers are in beta for a limited set of organizations, and you can add up to four.

**Team and Enterprise.** Only Owners and Primary Owners can add connectors on Team plans (Enterprise adds custom roles with library access), from **Organization settings > Connectors**. Members then connect with their own accounts, so Claude only sees what each person can see. Owners can set each tool to Always allow, Needs approval, or Blocked for the whole org, and members can click Request on a directory listing to ask for one (on by default for Team, off by default for Enterprise). [Enterprise-managed auth](https://support.claude.com/en/articles/15537633-auto-connect-your-organization-s-apps-to-claude) lets admins authorize supported connectors once through Okta or a Claude-issued identity (beta), so members skip the OAuth screen. Notion, Linear, Atlassian, Asana, Figma, and Granola are on that list.

**Claude Desktop's local servers.** Desktop can also run servers on your machine. The packaged way is a desktop extension (an `.mcpb` file): in the current settings layout, go to Settings > Desktop app and click Manage next to Extensions, then browse the directory or install a file ([local MCP guide](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)). The manual way is `claude_desktop_config.json`, opened from Settings > Developer > Edit Config, at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS and `%APPDATA%\Claude\claude_desktop_config.json` on Windows, per the [MCP docs](https://modelcontextprotocol.io/docs/develop/connect-local-servers). Local servers stay on that computer: they don't appear in claude.ai or on mobile. The config file is also the fallback when your org hasn't granted custom connectors, using the `mcp-remote` package to bridge a remote URL into a local process. Our [remote vs. local MCP explainer](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers the tradeoffs.

**Mobile and per-chat controls.** Connectors you've added appear in the iOS and Android apps without extra setup, interactive ones included. Anthropic says installing connectors on mobile is in beta and that web and Desktop remain the primary path for custom connectors, so add them on a computer first. In any chat, the "+" menu toggles connectors on or off per conversation, and Connectors > Tool access sets the loading mode: Auto (the default), Always available, or On demand. [Anthropic suggests](https://support.claude.com/en/articles/13730515-manage-claude-s-tool-access) On demand once you have 10 or more connectors.

## The best MCP servers for Claude

### 1. Parallel MCP

[Parallel MCP](https://parallel.ai/mcp) gives Claude a second web search engine and page reader, built for agents. One hosted server at `https://mcp.parallel.ai/mcp` exposes `web_search` (ranked results with excerpts dense enough to answer from, fast mode by default), `web_fetch` (reads up to 20 URLs per call, PDFs and JavaScript-heavy pages included), and `web_decisions` (an early-release tool that answers typed questions like a probability, a pick among options, or a score, with sources). Without an account or key, those three are free at lower rate limits. We ran an initialize and tools/list against the endpoint today, and a `web_search` call returned in 0.72 seconds with no key.

There are two ways in. The quickest is the **Parallel Search** listing in the directory: open [the listing](https://claude.com/marketplace/connectors/parallel-search), click Add to Claude, and you're connected with no sign-in. That listing still points at our original search server, which keeps running and exposes `web_search` and `web_fetch`. For the full set, use the one-click Claude install on the Parallel MCP page, or add Parallel as a custom connector yourself:

```text
Name: Parallel
URL:  https://mcp.parallel.ai/mcp

# Sign in with your Parallel account to add web_research and higher limits:
URL:  https://mcp.parallel.ai/mcp?login
```

The `?login` URL runs an OAuth sign-in when you connect and adds `web_research`, which researches one question and returns a cited answer in the same call, with `reasoning_effort` set to low, medium, high, or auto. Signed-in calls bill to your Parallel account at the underlying API rates (Search fast mode is $1 per 1,000 requests), and new accounts get up to $80 in free credits plus $5 a month with a card on file. Our [installation docs](https://docs.parallel.ai/integrations/mcp/installation) cover every client.

Claude already has web search built in, and for most everyday questions it does the job well. Teams that want web lookups to run through Parallel, for consistent sourcing or to attribute every call to one account, have an admin lever: web search is a workspace capability that Owners turn on or off in **Organization settings > Capabilities** ([Claude's web search guide](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)). Leave it off, add Parallel at the `?login` URL as an org connector, and web lookups go through Parallel. If you're a member without custom connector access, Desktop's config file works:

```json
{
  "mcpServers": {
    "Parallel": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.parallel.ai/mcp"]
    }
  }
}
```

Best for: research-heavy chats, reading long pages without pasting them, and Free-plan users, since the directory listing doesn't spend your one custom connector slot. Tradeoffs: we're the vendor, and keyless use runs at personal-scale rate limits. For a wider look at the category, see our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp).

### 2. Notion

[Notion MCP](https://developers.notion.com/docs/get-started-with-mcp) at `https://mcp.notion.com/mcp` lets Claude search your workspace, read and create pages, query databases, and comment. Connect it from the directory and approve the Notion OAuth screen.

Best for: teams whose specs, wikis, and meeting notes live in Notion. Tradeoffs: OAuth only; Notion's hosted server doesn't accept bearer tokens, and its older open-source server is no longer actively maintained.

### 3. Linear

[Linear's server](https://linear.app/docs/mcp) at `https://mcp.linear.app/mcp` finds, creates, and updates issues, projects, cycles, and comments. Want Claude reading issues but never changing them? Add `https://mcp.linear.app/mcp/readonly` as a custom connector instead of the directory listing. On Claude Team or Enterprise with a Linear Business or Enterprise plan, Linear supports Claude auto-connect (beta), so members skip the sign-in screen.

Best for: product and engineering teams planning in Linear. Tradeoffs: each OAuth session covers one Linear workspace.

### 4. Atlassian (Jira, Confluence, Loom)

Atlassian's Rovo MCP server at `https://mcp.atlassian.com/v2/mcp` ([setup guide](https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/)) covers Jira, Confluence, Loom, and Bitbucket. Claude sees a core set of Jira, Confluence, and search tools up front and discovers the rest on demand, which keeps the tool list short. Actions run with your existing Atlassian permissions, and per the directory listing, Jira delete and project-administration tools stay off unless an Atlassian admin turns them on.

Best for: Jira and Confluence shops. Tradeoffs: v1 users should move to the v2 URL; Atlassian says v1 connections switch to v2 tools on March 1, 2027.

### 5. Asana

[Asana's v2 server](https://developers.asana.com/docs/using-asanas-mcp-server) at `https://mcp.asana.com/v2/mcp` searches, creates, and updates tasks, projects, portfolios, and goals. It's one of Claude's interactive connectors, so a project question can open the Asana board inside the chat, where you check off tasks without switching tabs.

Best for: status checks and turning meeting outcomes into assigned tasks. Tradeoffs: Enterprise+ Asana admins can block MCP clients per app, so a failed sign-in may need an admin unblock.

### 6. Canva

The [Canva AI Connector](https://www.canva.dev/docs/connect/canva-mcp-server-setup/) at `https://mcp.canva.com/mcp` searches your designs, generates new ones, autofills templates, and exports to the formats Canva supports. It renders interactively in the chat.

Best for: marketers and anyone turning a Claude draft into a deck, social post, or one-pager. Tradeoffs: Canva's own docs describe the connector route as paid-plan only, which is narrower than Anthropic's all-plans wording; Free users may need the config-file route on Desktop.

### 7. Figma

[Figma's remote server](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) at `https://mcp.figma.com/mcp` brings design context into Claude: frames, variables, components, and FigJam boards, plus a `generate_diagram` tool that draws flowcharts and diagrams into Figma from a description.

Best for: product teams discussing designs and generating diagrams. Tradeoffs: per the directory listing, `get_screenshot` returns a description rather than an image in Claude, and [rate limits](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/) depend on your Figma plan and seat.

### 8. Zapier

[Zapier MCP](https://help.zapier.com/hc/en-us/articles/36265392843917-Use-Zapier-MCP-with-your-client) at `https://mcp.zapier.com/api/v1/connect` is the general-purpose option: one connector that reaches the apps you've already connected in Zapier, including the many that have no MCP server of their own. After sign-in, Zapier provisions your server and pre-enables actions for those apps.

Best for: covering the long tail without adding a connector per app. Tradeoffs: each successful tool call uses two tasks from your Zapier plan (failed calls don't count), so heavy use shows up on your Zapier bill.

### 9. Granola

[Granola's server](https://docs.granola.ai/help-center/sharing/integrations/mcp) at `https://mcp.granola.ai/mcp` lets Claude search your meeting notes and transcripts. Ask what a customer said about pricing across three calls, and Claude pulls the passages. On Granola's free Basic plan it reaches the last 30 days of notes, and some folder and transcript tools need a paid plan.

Best for: sales, recruiting, and anyone who runs on calls. Tradeoffs: individual OAuth only (no API key for MCP), and Granola puts rate limits around 100 requests per minute. If Claude shows "No tools available", Granola says to disconnect and reconnect from claude.ai's connector settings, even if you use Desktop.

For Gmail, Google Drive, Google Calendar, Slack, and Microsoft 365, Claude's directory already has Anthropic-verified connectors, and those are the straightforward way to connect each service, so we haven't listed separate servers for them.

## The picks side by side

| Server | What it adds | Server URL | Sign-in | In Claude's directory |
| --- | --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, decisions, research | mcp.parallel.ai/mcp | None, or OAuth via ?login | Yes, as Parallel Search |
| Notion | Pages, databases, comments | mcp.notion.com/mcp | OAuth | Yes |
| Linear | Issues, projects, cycles | mcp.linear.app/mcp | OAuth or API key | Yes |
| Atlassian | Jira, Confluence, Loom, Bitbucket | mcp.atlassian.com/v2/mcp | OAuth | Yes |
| Asana | Tasks, projects, goals (interactive) | mcp.asana.com/v2/mcp | OAuth | Yes |
| Canva | Design search, generation, export (interactive) | mcp.canva.com/mcp | OAuth | Yes |
| Figma | Design context, diagrams (interactive) | mcp.figma.com/mcp | OAuth | Yes |
| Zapier | Actions across your Zapier-connected apps | mcp.zapier.com/api/v1/connect | OAuth | Yes |
| Granola | Meeting notes and transcripts | mcp.granola.ai/mcp | OAuth | Yes |

## Frequently asked questions

Does Claude support MCP servers? Yes. Claude calls them connectors. Remote MCP servers work in claude.ai, Claude Desktop, Cowork, and the mobile apps, added from the Connectors Directory or as custom connectors under Customize > Connectors. Claude Desktop can also run local servers through desktop extensions or `claude_desktop_config.json`.

Can I use MCP on Claude's Free plan? Yes. Directory connectors are available to all users, and Free accounts can add one custom connector. If web search is what you want, the Parallel Search directory listing gets you `web_search` and `web_fetch` without using that slot.

What's the difference between a connector and a Claude Desktop MCP server? A connector is a remote server attached to your Claude account and reached from Anthropic's cloud, so it works everywhere you sign in. A local server in Claude Desktop runs on your computer, can reach local files and localhost, and only works in Desktop (and Claude Code).

Do connectors work in the Claude mobile app? Yes. Connectors you've added on the web or Desktop are available on iOS and Android, including interactive ones. Installing new connectors on mobile is in beta, so Anthropic recommends web or Desktop for custom connectors.

How many connectors should I turn on? As many as you use, with the right loading mode. Anthropic suggests Always available for fewer than 10 connectors you use constantly and On demand for 10 or more, which loads only the connectors a request needs.

## Try it in two minutes

Open [the Parallel Search listing](https://claude.com/marketplace/connectors/parallel-search) and click Add to Claude, use the one-click install on [parallel.ai/mcp](https://parallel.ai/mcp), or add `https://mcp.parallel.ai/mcp` as a custom connector, then ask Claude something that needs today's web. No account or key is required. For the same picks in other clients, see our guides to [ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt) and [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code).

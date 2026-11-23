# Lovable MCP: the best MCP servers and chat connectors for Lovable in 2026

Lovable MCP setup starts with one question: should a server help the agent while you build, or run inside the app you ship? This guide covers both routes and the reverse one, eight servers worth adding from Parallel to Notion, Linear, and Miro, what each plan allows, and a side-by-side table.

Lovable is an AI app builder: you describe an app in a chat, and Lovable writes, previews, and publishes it. It supports the Model Context Protocol (MCP) in three separate places, and most of the confusion about "Lovable MCP" comes from mixing them up. **Chat connectors** let the Lovable agent read your tools while you build. **App + chat connectors** ship inside the app you publish. And the **Lovable MCP server** lets other AI tools, like Claude or Cursor, drive Lovable from the outside.

This guide is about the first one, because that's where MCP servers plug in. Disclosure: we make Parallel, which is pick #1. The other seven are official, vendor-hosted servers that Lovable lists as prebuilt chat connectors, chosen for what people do in Lovable: turning specs, tickets, whiteboards, and meeting notes into working prototypes.

## How MCP works in Lovable

Lovable's docs call an MCP server a [chat connector](https://docs.lovable.dev/integrations/chat-connectors). You connect it with your own account, and Lovable can then look things up in that tool from the project chat and from Chats, its standalone chat view. Three properties shape everything else:

- **Personal.** Only you can use your connection. A teammate who wants the same Notion workspace connects their own account.
- **Build time only.** A chat connection never becomes part of the app you publish, and your app's visitors can't reach the tool through it.
- **Read first.** Lovable reads docs, issues, and diagrams, and where the server allows it, takes small actions like updating a ticket. Tools a server marks as read-only run without asking. Anything else shows an approval card, where you can pick **Always allow** for one tool or **Always allow all tools from this connection**.

If your published app needs a service while people use it, that's a different connection type. An [app + chat connector](https://docs.lovable.dev/integrations/introduction) runs on one shared account, works in the project chat too, and is available to the deployed app. An app user connector lets each end user sign in with their own account. Some services, Notion among them, offer more than one type, and the connector page's **More options** menu lists them.

**Prebuilt chat connectors.** Open [Connectors](https://lovable.dev/dashboard?connectors) from the dashboard sidebar or a project's sidebar, pick a service, and click **Connect** (or **More options → Chat connector** when the service also has an app connector). As of November 2026 the catalog lists Amplitude, Atlassian, Canva, Confidence, Excalidraw+, Granola, Hex, HeyGen, Linear, Loom, Miro, Notion, n8n, Polar, PostHog, Sanity, Sentry, Supermetrics, and Wispr Flow.

**Custom MCP servers.** For anything else, open Connectors, choose **Add custom → MCP server**, name it, and paste the URL. Lovable offers three auth choices: OAuth (the default), **Bearer token or API key**, and **No authentication** ([custom MCP guide](https://docs.lovable.dev/integrations/custom-mcp)). Lovable made custom servers available on every plan, Free included, on May 25, 2026, per its [changelog](https://lovable.dev/changelog). The one paid exception is **Lovable static IPs**, an Enterprise option that sends traffic from fixed ranges so you can reach a server behind an IP allowlist. Only remote servers work in the web app; the Lovable desktop app also runs local ones, under **Connectors → Local MCPs**, which is how it reaches Figma Desktop ([desktop app docs](https://docs.lovable.dev/integrations/desktop-app)).

**Admin controls.** On Business and Enterprise, workspace owners and admins can switch chat connectors off for the whole workspace, disable individual ones, or turn off the **Custom MCP** row ("Allow members to connect their own MCP servers") in **Connectors → Admin settings → Chat connectors**. If **MCP server** is grayed out in the Add custom menu, that setting is why. Admins can also add an MCP registry, a browsable directory of approved servers that members connect without typing URLs.

## The best MCP servers for Lovable

### 1. Parallel MCP

Parallel gives Lovable's agent a web search engine and page reader built for agents. In Lovable you can reach it two ways, and which one you want depends on whether the web access should ship with your app.

**As a custom chat connector (free, build time).** Add [Parallel MCP](https://parallel.ai/mcp) under **Add custom → MCP server**:

```text
Server name: Parallel
Server URL: https://mcp.parallel.ai/mcp
Authentication: No authentication
```

With no authentication you get `web_search` (ranked results with excerpts, fast mode by default), `web_fetch` (clean markdown from up to 20 URLs per call, PDFs and JavaScript-heavy pages included), `web_decisions` (answers a typed question like a probability or a pick among options, with sources), and `image_search`, at lower rate limits and with no sign-in. We sent an initialize call to the endpoint on November 22 and it answered without a key. To add `web_research`, which researches one question and returns a cited answer, switch the auth to **Bearer token or API key** and paste a key from [platform.parallel.ai](https://platform.parallel.ai), or use `https://mcp.parallel.ai/mcp?login` with OAuth. Signed-in calls bill to your Parallel account (Search in fast mode is $1 per 1,000 requests), and new accounts get up to $80 in free credits plus $5 a month with a card on file.

This route is useful when you want the agent to check a library's current docs, read a competitor's pricing page before cloning its layout, or ground a landing page in facts it looked up.

**As an app + chat connector (ships with the app).** Parallel is also in Lovable's catalog as an [app + chat connector](https://docs.lovable.dev/integrations/parallel), which we announced in [Connect Lovable apps to the live web with Parallel](https://parallel.ai/blog/lovable-parallel). Tag @parallel in the chat or pick Parallel in Connectors, and your published app can search the web, read pages, and run research tasks with citations. Choose **Managed by Lovable** and there's no Parallel account to create: usage spends workspace credits at 4 Lovable credits per US dollar of Parallel usage, or 2 on Business. Choose **Use your own credentials** and Parallel bills you directly, which also turns on the Monitor API for apps that watch the web for changes. Lovable's docs note that FindAll isn't available through the connector, and a workspace can hold one managed Parallel connection.

Since an app + chat connection also works in the project chat, you don't need both. Pick the custom MCP server for free personal research while you build, and the connector when the web is a feature of the app. Our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp) covers the wider category.

### 2. Notion

The Notion chat connector reads your PRDs, design specs, and briefs so Lovable builds from the document instead of your paraphrase of it. "Turn our Q4 campaign brief into a landing page" works because the agent reads the brief itself. It connects through Notion's hosted server with OAuth.

Notion is one of the services with two connection types, and the split matters here. If your published app should read or write Notion while people use it, say a public roadmap page fed by a database, Lovable points you to the separate Notion app + chat connector.

### 3. Linear

Lovable reads Linear issues, including descriptions and acceptance criteria, and builds prototypes against them. Ask it to "generate a prototype based on tickets in the current sprint" and it pulls the sprint from Linear. Lovable can also attach the resulting app back to the issue for review, which closes the loop for product managers who live in Linear. Linear's own server sits at `https://mcp.linear.app/mcp` and authenticates with OAuth; per [Linear's docs](https://linear.app/docs/mcp), each OAuth session covers one workspace.

### 4. Atlassian (Jira and Confluence) and Loom

Atlassian's connector gives Lovable Jira epics and Confluence pages. The common pattern is a spec in Confluence linked to a Jira epic: Lovable reads both, builds the prototype, and you embed the result back into the Confluence page for comments. Actions run with your existing Atlassian permissions.

Loom is a separate prebuilt connector that also signs in with your Atlassian account. It reads a video's transcript, AI summary, and comments, so you can paste a Loom link showing a bug and ask Lovable to fix what the video shows. For teams that already report bugs by recording their screen, that skips writing the bug up.

### 5. Miro

Miro is where designers and PMs sketch flows before anyone opens a builder, and the connector reads those boards directly: user flows, wireframes, and information architecture become scaffolded navigation and screens. Miro's server uses OAuth, and its admins can control who may use MCP and which tools agents can call. Expect to tidy the result; a whiteboard rarely specifies states and edge cases.

### 6. Granola

Granola turns meeting notes into build input. Lovable can search past meetings, pull out decisions and action items, and use them as context, which is how Lovable's own [MCP 101 post](https://lovable.dev/en/blog/mcp-101) suggests using it: connect Granola, then ask Lovable to update the app based on feedback from your latest customer call. Granola's free plan reaches the last 30 days of notes.

### 7. Canva

Canva is the one pick that writes as much as it reads. Lovable can create and edit Canva designs, search your brand assets and templates, and export finished designs as PDF, PNG, and other formats, so a launch page and its social graphics can come out of the same chat. Some features, such as brand kits, need a Canva plan that includes them.

### 8. n8n

n8n is for builders whose data already flows through automations. Connect your n8n instance and Lovable can call the workflows you expose, pulling data from tools like HubSpot, Google Sheets, or Slack to build user-facing apps on top of them. It takes two extra steps on the n8n side: an instance owner or admin turns on **Settings → MCP access → Enable MCP access**, and each workflow you want visible needs **Available in MCP** switched on in its own settings.

Sentry, PostHog, Hex, Sanity, and Amplitude are also in Lovable's prebuilt catalog and work well if your team uses them. We left them off the main list because they matter after an app has users, while the eight above shape what gets built. For a developer-tool view of the same ecosystem, see our [Cursor](https://parallel.ai/articles/best-mcp-servers-for-cursor) and [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) lists.

## Lovable's own MCP server

The reverse direction gets confused with all of the above. Lovable runs its own server at `mcp.lovable.dev`, and it lets an outside AI client create projects, send build requests, read files, and deploy apps ([Lovable MCP server docs](https://docs.lovable.dev/integrations/lovable-mcp-server)). Lovable documents setup for ChatGPT, Claude, Claude Code, Cursor, and VS Code, and any local client that supports OAuth can register on its own. Hosted clients need Lovable to approve their callback address first.

It became available on every plan, Free included, on August 7, 2026. Third-party client access is on by default for Free, Pro, and Business workspaces and off by default on Enterprise, where an admin enables it under **Privacy & security → Third-party MCP clients**. If you plan a requirements doc in Claude and want Lovable to build it, this is the server you add, in Claude. Our [Claude connectors guide](https://parallel.ai/articles/best-mcp-servers-for-claude) covers that side.

## The picks side by side

| Server | What Lovable gets | How you connect | Auth | Also available to the published app? |
| --- | --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, decisions, image search, research | Custom MCP server, or the Parallel app + chat connector | None, API key, or OAuth | Yes, through the app + chat connector |
| Notion | PRDs, specs, briefs | Prebuilt chat connector | OAuth | Yes, through the Notion app + chat connector |
| Linear | Issues and acceptance criteria | Prebuilt chat connector | OAuth | No |
| Atlassian | Jira epics, Confluence pages | Prebuilt chat connector | OAuth | No |
| Loom | Video transcripts, summaries, comments | Prebuilt chat connector | Atlassian account | No |
| Miro | Flows, wireframes, boards | Prebuilt chat connector | OAuth | No |
| Granola | Meeting notes, decisions, action items | Prebuilt chat connector | OAuth | No |
| Canva | Designs, brand assets, exports | Prebuilt chat connector | OAuth | No |
| n8n | Your exposed workflows | Prebuilt chat connector | n8n instance access | No |

## Which should you choose

Start with the tool where your requirements already live, because that's the connector that saves the most retyping.

- **You're a PM prototyping from tickets:** Linear or Atlassian, plus Granola if decisions happen in calls.
- **You're a designer or founder starting from a sketch:** Miro for the flow, Canva for the visual assets around the launch.
- **You're building something that depends on current facts**, like a market map, a competitor tracker, or a directory: Parallel MCP while you build, and the Parallel app + chat connector once the app itself needs to search.
- **Your team runs on automations:** n8n, so the app sits on workflows you already trust.
- **You're on a Business or Enterprise workspace and a connector won't connect:** check Admin settings before debugging the server; an admin may have disabled it or custom MCP as a whole.

Keep the list short. Each connection adds tools the agent has to consider, and Lovable asks for approval on any tool that isn't read-only, so two or three connectors you use every day beat ten you connected once.

Building with Replit Agent instead? Our [Replit MCP guide](https://parallel.ai/articles/best-mcp-servers-for-replit) covers which servers connect there and how.

## FAQ

### Does Lovable support MCP servers?

Yes. Lovable calls them chat connectors. You can connect prebuilt ones like Notion, Linear, Atlassian, and Miro from the Connectors catalog, or add any remote server by URL under Add custom → MCP server. They give the Lovable agent context in the project chat and in Chats.

### Can my published Lovable app use an MCP server?

Not through a chat connector. Chat connections are personal and stay out of the published app. For a service your app calls at runtime, use an app + chat connector (Parallel and Notion both have one), create a custom connector for the API, or ask Lovable to integrate the API directly.

### Do I need a paid Lovable plan to add a custom MCP server?

No. Custom MCP servers have been available on all plans, including Free, since May 25, 2026. Only the Lovable static IPs option, for servers behind an IP allowlist, requires Enterprise. Pro starts at $25 a month and Business at $50 a month on [Lovable's pricing page](https://lovable.dev/pricing), checked November 22, 2026.

### What is the Lovable MCP server at mcp.lovable.dev?

It's Lovable exposed as an MCP server for other clients. Add `mcp.lovable.dev` to ChatGPT, Claude, Claude Code, Cursor, or VS Code, sign in with your Lovable account, and that client can create, edit, and deploy Lovable projects. It's available on all plans.

### Can Lovable use a local MCP server?

In the Lovable desktop app, yes. Open Connectors → Local MCPs, click Custom MCP, and enter a command and arguments or a local URL. The web app only reaches remote servers.

### Why is "MCP server" grayed out in my Lovable workspace?

A workspace admin has turned off the Custom MCP setting in Connectors → Admin settings → Chat connectors, or switched off remote MCP connectors under Privacy & security. Ask an admin to check both.

## Try it in one prompt

Add `https://mcp.parallel.ai/mcp` as a custom MCP server with no authentication, then ask Lovable to research something before it builds, such as the current pricing tiers of three competitors for a comparison page. Setup details for every client are on [parallel.ai/mcp](https://parallel.ai/mcp), and our [free MCP servers list](https://parallel.ai/articles/best-free-mcp-servers) has more keyless options.

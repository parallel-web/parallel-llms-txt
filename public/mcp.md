Search MCP

# Upgrade web search anywhere you work

Free web search MCP for Claude, ChatGPT, Cursor, and any agent. No API key needed.

## Add it directly in Claude, ChatGPT, Cursor, or VS Code

These apps can add Parallel Search from a link, with no prompt to paste. Open the link, then confirm in the app.

* [Add to Claude](https://claude.com/marketplace/connectors/parallel-search)
* [Add to ChatGPT](https://chatgpt.com/plugins/plugin%5Fasdk%5Fapp%5F69fb9378663481919a68e8a2109644e5)
* [Add to Cursor](https://cursor.com/marketplace/parallel)
* [Add to VS Code](https://vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.parallel.ai%2Fmcp%22%7D)

Using a different app? Copy the setup prompt at the top of this page, or follow the [setup guide](https://docs.parallel.ai/integrations/mcp/installation).

## Setup details for agents

Server URL: https://mcp.parallel.ai/mcp (Streamable HTTP. No API key or OAuth required.)

Higher rate limits: Create an account at https://platform.parallel.ai/ and pass the API key as a Bearer token in the Authorization header, or connect to https://mcp.parallel.ai/mcp?login for OAuth.

### Tools

* web\_search: Takes an objective and a few keyword queries. Returns ranked URLs with the passages that answer them, capped at about 25,000 characters per call.
* web\_fetch: Returns clean markdown from up to 20 URLs per call, including JavaScript-heavy pages and PDFs.

### Setup prompt to paste into an agent

```text
Set up Parallel Search so that you, the agent I'm talking to right now, can use it for web search.

1. Identify the app you are running in, for example ChatGPT, Claude, Claude Code, Codex, Cursor, VS Code Copilot, Gemini CLI, OpenClaw, or Hermes Agent.

2. Look for Parallel's official plugin, connector, app, or extension for that app. Use your built-in web search with a query like "parallel web search <app name> plugin". In ChatGPT, for example, search "parallel web search ChatGPT plugin". Only trust results from parallel.ai, docs.parallel.ai, github.com/parallel-web, or the app's own official directory. Known ones:
- ChatGPT: https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5
- Claude and Claude Desktop: https://claude.com/marketplace/connectors/parallel-search
- Cursor: https://cursor.com/marketplace/parallel
- Gemini CLI: gemini extensions install https://github.com/parallel-web/search-mcp
- Hermes Agent: hermes plugins install parallel-search
If you find one, follow its official install steps. If I have to click Install or approve access myself, give me the direct link and the exact steps, then wait for me.

3. If your app has no official Parallel integration, add the Parallel Search MCP server to your own MCP config, not to another app's:
- Server name: parallel
- Server URL: https://mcp.parallel.ai/mcp
- Transport: Streamable HTTP
- Authentication: none. It is free without an API key.
Use the method your app expects, for example `claude mcp add --transport http parallel https://mcp.parallel.ai/mcp` in Claude Code or `codex mcp add parallel --url https://mcp.parallel.ai/mcp` in Codex. Steps for each app are at https://docs.parallel.ai/integrations/mcp/installation

4. Do not set up an API key or OAuth unless I ask. For higher rate limits I can create an account at https://platform.parallel.ai and use my API key as a Bearer token, or connect to https://mcp.parallel.ai/mcp?login (OAuth flow).

5. Tell me which option you chose and whether I need to restart the app. Once the tools load, confirm that web_search and web_fetch are available, run one test search, and give me a source link.
```

### Setup steps by client

* [Claude](https://docs.parallel.ai/integrations/mcp/installation#claude-desktop-%2F-claude-ai)
* [Claude Code](https://docs.parallel.ai/integrations/mcp/installation#claude-code)
* [ChatGPT](https://docs.parallel.ai/integrations/mcp/installation#chatgpt)
* [Codex](https://docs.parallel.ai/integrations/mcp/installation#codex-cli)
* [Cursor](https://docs.parallel.ai/integrations/mcp/installation#cursor)
* [VS Code](https://docs.parallel.ai/integrations/mcp/installation#vs-code)
* [Gemini CLI](https://docs.parallel.ai/integrations/mcp/installation#gemini-cli)
* [Windsurf](https://docs.parallel.ai/integrations/mcp/installation#windsurf)
* [Cline](https://docs.parallel.ai/integrations/mcp/installation#cline)
* [Zed](https://docs.parallel.ai/integrations/mcp/installation#zed)
* [Warp](https://docs.parallel.ai/integrations/mcp/installation#warp)
* [Raycast](https://docs.parallel.ai/integrations/mcp/installation#raycast)
* [LM Studio](https://docs.parallel.ai/integrations/mcp/installation#lm-studio)
* [Goose](https://docs.parallel.ai/integrations/mcp/installation#goose)
* [OpenCode](https://docs.parallel.ai/integrations/mcp/installation#opencode)
* [Amp](https://docs.parallel.ai/integrations/mcp/installation#amp)
* [Kiro](https://docs.parallel.ai/integrations/mcp/installation#kiro)
* [Google Antigravity](https://docs.parallel.ai/integrations/mcp/installation#google-antigravity)
* [Roo Code](https://docs.parallel.ai/integrations/mcp/installation#roo-code)
* [OpenHands](https://docs.parallel.ai/integrations/mcp/installation#openhands)
* [Factory](https://docs.parallel.ai/integrations/mcp/installation#factory-cli-droid)
* [Continue](https://docs.parallel.ai/integrations/mcp/installation#continue-dev)
* [OpenClaw](https://docs.parallel.ai/integrations/mcp/installation#openclaw)
* [Hermes Agent](https://docs.parallel.ai/integrations/mcp/installation#hermes-agent)
* [Pi](https://docs.parallel.ai/integrations/mcp/installation#pi)
* [fx](https://docs.parallel.ai/integrations/mcp/installation#fx-vercel)

Agents that prefer shell tools can use the [Parallel CLI](https://docs.parallel.ai/integrations/cli).

Signing in or adding an API key also adds web\_research, which answers research questions with citations. Setup is in the [MCP quickstart](https://docs.parallel.ai/integrations/mcp/quickstart).

To build web search into a product, use the [Search API](https://parallel.ai/products/search).

## Answers from today’s web

* ### Current information  
Your AI can check news, prices, opening hours, and anything else that changed after it was trained.  
Try asking: What time does the Louvre open on Sunday?
* ### Links you can check  
Answers come with links to the pages they came from, so you can read more or double-check.  
Try asking: Find three recent reviews of the Kindle Paperwhite and link them.
* ### Better help with code  
Coding agents read the latest documentation instead of guessing from what they learned in training.  
Try asking: Look up the latest setup steps for Next.js and follow them.

## FAQs

* **What is Parallel Search MCP?**  
Parallel Search MCP is a free add-on that lets your AI agent or app search the web and read web pages, using Parallel’s search engine. MCP is the common standard that AI apps use to connect to tools like this one.
* **Is Parallel Search MCP free? Do I need an API key?**  
Yes, it’s free, and you don’t need an account or an API key. Without an account there’s a limit on how much you can search. For higher limits, [create a Parallel account](https://platform.parallel.ai/) and follow the [setup guide](https://docs.parallel.ai/integrations/mcp/installation) to connect it. The [launch post](/blog/free-web-search-mcp) has more background.
* **Is Parallel Search free for agents via MCP?**  
Yes. The Search MCP at https://mcp.parallel.ai/mcp is free to use without an API key. It gives your agent two tools: web\_search and web\_fetch. For production use or higher rate limits, add your Parallel API key as a Bearer token.
* **How do I set it up?**  
Copy the setup prompt at the top of this page and paste it into your AI agent or app. The agent first looks up Parallel’s official add-on for your app, like the ones for Claude and ChatGPT, and gives you the link if you need to click Install yourself. If there isn’t one, it sets up Parallel Search directly. Either way, it tells you what it chose and whether it needs a restart, then runs a test search. In Claude, ChatGPT, Cursor, and VS Code, you can also add it straight from the links on this page. To do it yourself, follow the [setup guide](https://docs.parallel.ai/integrations/mcp/installation).
* **Which apps does it work with?**  
Most AI agents and apps that can connect to outside tools, including Claude, ChatGPT, Cursor, VS Code, Claude Code, Codex, Gemini CLI, and Windsurf. The [setup guide](https://docs.parallel.ai/integrations/mcp/installation) has steps for 26 apps.
* **How is it different from the web search built into Claude or ChatGPT?**  
It uses Parallel’s own search engine, which is built for AI. It pulls out the parts of each page that answer your question, so your AI finds what it needs in fewer searches. It also adds web search to apps that don’t have it.
* **Can I add Parallel’s search to my own app?**  
Yes. Developers can use the same search directly through the [Search API](/products/search).

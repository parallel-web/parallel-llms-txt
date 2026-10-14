Search MCP

# Upgrade web search anywhere you work

Free web search MCP for Claude, ChatGPT, Cursor, and any agent. No API key needed.

## Add it directly in Claude, ChatGPT, Cursor, or VS Code

These apps can add Parallel Search from a link, with no prompt to paste. Open the link, then confirm in the app.

* [Add to Claude](https://claude.ai/directory/fe70d12e-aad9-4b33-b5bf-47afede277a3)
* [Add to ChatGPT](https://chatgpt.com/plugins/parallel-search?open%5Fin%5Fapp)
* [Add to Cursor](https://cursor.com/marketplace/parallel)
* [Add to VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch.parallel.ai%2Fmcp%22%7D)

Using a different app? Copy the setup prompt at the top of this page, or follow the [setup guide](https://docs.parallel.ai/integrations/mcp/search-mcp).

## Setup details for agents

Server URL: https://search.parallel.ai/mcp (Streamable HTTP. No API key or OAuth required.)

Higher rate limits: Create an account at https://platform.parallel.ai/ and pass the API key as a Bearer token in the Authorization header, or connect to https://search.parallel.ai/mcp-oauth for OAuth.

### Tools

* web\_search: Takes an objective and a few keyword queries. Returns ranked URLs with the passages that answer them, capped at about 25,000 characters per call.
* web\_fetch: Returns clean markdown from up to 20 URLs per call, including JavaScript-heavy pages and PDFs.

### Setup prompt to paste into an agent

```text
Please install the Parallel Search MCP so that YOU (the agent I'm currently talking to) can call it, then use it for web search.

- Server URL: https://search.parallel.ai/mcp
- Transport: Streamable HTTP
- Authentication: default to no auth. The server is free to use without an API key or OAuth. If I want higher rate limits, I can create an account at https://platform.parallel.ai and either pass my API key as a Bearer token in the Authorization header OR point the config at https://search.parallel.ai/mcp-oauth (OAuth flow). Ask me which I prefer before wiring up auth; don't configure auth if I haven't opted in.

Before adding the MCP server, check whether your host already offers an official Parallel plugin, connector, or extension that provides the same web search and fetch tools (for example the Parallel Search connector in Claude or ChatGPT, or a Parallel plugin in the host's marketplace). If one exists and is better integrated than the universal MCP server, install that instead and tell me what you chose. Otherwise, add the MCP server as described below.

First, identify which MCP client harness you're running inside (Claude Code, Codex, Cursor, VS Code Copilot, OpenClaw, Hermes Agent, etc.). This is your own host, not a third-party tool. Then add the server to THAT client's MCP config, using the mechanism that host expects (for example `claude mcp add` for Claude Code, editing ~/.codex/config.toml for Codex, editing ~/.cursor/mcp.json for Cursor). Client-specific setup steps are at https://docs.parallel.ai/integrations/mcp/search-mcp. Do not install it into a different client's config.

Finally, tell me whether the host needs to be restarted for the new tools to load. Once they connect, confirm that Parallel's search tools are available (web_search and web_fetch on the MCP server), run one test search, and return a source link.
```

### Setup steps by client

* [Claude](https://docs.parallel.ai/integrations/mcp/search-mcp#claude-desktop-%2F-claude-ai)
* [Claude Code](https://docs.parallel.ai/integrations/mcp/search-mcp#claude-code)
* [ChatGPT](https://docs.parallel.ai/integrations/mcp/search-mcp#chatgpt)
* [Codex](https://docs.parallel.ai/integrations/mcp/search-mcp#codex-cli)
* [Cursor](https://docs.parallel.ai/integrations/mcp/search-mcp#cursor)
* [VS Code](https://docs.parallel.ai/integrations/mcp/search-mcp#vs-code)
* [Gemini CLI](https://docs.parallel.ai/integrations/mcp/search-mcp#gemini-cli)
* [Windsurf](https://docs.parallel.ai/integrations/mcp/search-mcp#windsurf)
* [Cline](https://docs.parallel.ai/integrations/mcp/search-mcp#cline)
* [Zed](https://docs.parallel.ai/integrations/mcp/search-mcp#zed-warp-raycast-stdio-only-clients)
* [Warp](https://docs.parallel.ai/integrations/mcp/search-mcp#zed-warp-raycast-stdio-only-clients)
* [Raycast](https://docs.parallel.ai/integrations/mcp/search-mcp#zed-warp-raycast-stdio-only-clients)
* [LM Studio](https://docs.parallel.ai/integrations/mcp/search-mcp#one-click-install)
* [Goose](https://docs.parallel.ai/integrations/mcp/search-mcp#one-click-install)
* [OpenCode](https://docs.parallel.ai/integrations/mcp/search-mcp#opencode)
* [Amp](https://docs.parallel.ai/integrations/mcp/search-mcp#amp)
* [Kiro](https://docs.parallel.ai/integrations/mcp/search-mcp#kiro)
* [Google Antigravity](https://docs.parallel.ai/integrations/mcp/search-mcp#google-antigravity)
* [Roo Code](https://docs.parallel.ai/integrations/mcp/search-mcp#roo-code)
* [OpenHands](https://docs.parallel.ai/integrations/mcp/search-mcp#openhands)
* [Factory](https://docs.parallel.ai/integrations/mcp/search-mcp#factory-cli-droid)
* [Continue](https://docs.parallel.ai/integrations/mcp/search-mcp#continue-dev)
* [OpenClaw](https://docs.parallel.ai/integrations/mcp/search-mcp#openclaw)
* [Hermes Agent](https://docs.parallel.ai/integrations/mcp/search-mcp#hermes-agent)
* [Pi](https://docs.parallel.ai/integrations/mcp/search-mcp#pi)
* [fx](https://docs.parallel.ai/integrations/mcp/search-mcp#fx-vercel)

Agents that prefer shell tools can use the [Parallel CLI](https://docs.parallel.ai/integrations/cli).

The Task MCP (deep research, needs an API key) is set up from the [MCP quickstart](https://docs.parallel.ai/integrations/mcp/quickstart).

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
Yes, it’s free, and you don’t need an account or an API key. Without an account there’s a limit on how much you can search. For higher limits, [create a Parallel account](https://platform.parallel.ai/) and follow the [setup guide](https://docs.parallel.ai/integrations/mcp/search-mcp) to connect it. The [launch post](/blog/free-web-search-mcp) has more background.
* **Is Parallel Search free for agents via MCP?**  
Yes. The Search MCP at https://search.parallel.ai/mcp is free to use without an API key. It gives your agent two tools: web\_search and web\_fetch. For production use or higher rate limits, add your Parallel API key as a Bearer token.
* **How do I set it up?**  
Copy the setup prompt at the top of this page and paste it into your AI agent or app. If your app has its own Parallel add-on, like the ones for Claude and ChatGPT, the agent installs that instead and tells you what it chose. Otherwise it sets up Parallel Search directly, runs a test search, and tells you if it needs a restart. In Claude, ChatGPT, Cursor, and VS Code, you can also add it straight from the links on this page. To do it yourself, follow the [setup guide](https://docs.parallel.ai/integrations/mcp/search-mcp).
* **Which apps does it work with?**  
Most AI agents and apps that can connect to outside tools, including Claude, ChatGPT, Cursor, VS Code, Claude Code, Codex, Gemini CLI, and Windsurf. The [setup guide](https://docs.parallel.ai/integrations/mcp/search-mcp) has steps for 26 apps.
* **How is it different from the web search built into Claude or ChatGPT?**  
It uses Parallel’s own search engine, which is built for AI. It pulls out the parts of each page that answer your question, so your AI finds what it needs in fewer searches. It also adds web search to apps that don’t have it.
* **Can I add Parallel’s search to my own app?**  
Yes. Developers can use the same search directly through the [Search API](/products/search).

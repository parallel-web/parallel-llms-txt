# The most configurable MCP for web research. Bring Parallel to everywhere you work

## Setup details for agents

Server URL: https://mcp.parallel.ai/mcp (Streamable HTTP. web\_search, web\_fetch, and web\_decisions need no API key or OAuth.)

Sign in or use an API key: Connect to https://mcp.parallel.ai/mcp?login to sign in with OAuth, or create an API key at https://platform.parallel.ai/ and send it as a Bearer token in the Authorization header (or in x-api-key). Either one adds web\_research and raises rate limits. Calls with a key are billed at API rates.

### Tools

* web\_search (Search API): Searches the web and returns ranked URLs with the excerpts that answer the objective. Runs in fast mode by default.
* web\_fetch (Extract API): Reads up to 20 URLs per call as focused excerpts or full markdown, including JavaScript-heavy pages and PDFs.
* web\_decisions (Decisions API): Answers typed questions from live web evidence, such as a yes or no probability, a choice from a list, or a score, with citations.
* web\_research (Responses API): Researches one question in depth and returns a cited answer in the same call. Requires OAuth sign-in or an API key.

### Choose tools and set arguments

Add ?tools= with a comma-separated list to choose the tools a client sees, for example https://mcp.parallel.ai/mcp?tools=web\_search,web\_fetch. To set arguments for every call, send JSON in the x-parallel-mcp-config header, keyed by tool name, with an override object and an optional model\_choice list. Overrides need an API key or OAuth and a client that can send headers.

```text
x-parallel-mcp-config: {"web_search":{"override":{"mode":"basic","advanced_settings":{"source_policy":{"exclude_domains":["reddit.com"]}}}}}
```

### Setup prompt to paste into an agent

```text
Set up Parallel so that you, the agent I'm talking to now, can use it for web search and research.

About Parallel MCP
- Server: https://mcp.parallel.ai/mcp (Streamable HTTP). Anonymous: web_search, web_fetch, web_decisions. Signed in through the browser at https://mcp.parallel.ai/mcp?login: adds web_research, higher rate limits, custom settings and free monthly credits.
- Install steps per app: https://docs.parallel.ai/integrations/mcp/installation. Settings and migration: https://docs.parallel.ai/integrations/mcp/quickstart

How to talk to me
- Work quietly: no progress updates, and don't mention steps or explain commands, files or your reasoning. Use the quoted messages below word for word, filling in <placeholders>.
- Anywhere else, write at most two short lines. Be explicit and professional: name things ("the server", "your settings", "Parallel MCP") instead of writing "it" or "they", say what an action will do ("This will replace the old server"), and avoid jargon such as OAuth, header or config unless I need the word to act.
- Ask one question at a time, with your question UI if you have one. If I answer one of your questions with just "yes" or "ok", take the first option.

Steps
1. ChatGPT, or the Claude app on the web or desktop (not Claude Code or Cowork): find Parallel in your app's directory so the app shows its own install option (ChatGPT: https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5, Claude: https://claude.com/marketplace/connectors/parallel-search). If "My Parallel settings" has content, first tell me "<app name> doesn't support custom settings." After I install Parallel, go to step 6, but in place of the "Now available" line and the sign-in note, tell me:
   "Parallel for <app name> is being updated to support all Parallel MCP features. For now, you can use search and extract. New features will be added automatically over the next few days."
2. Any other app: tell me "Setting up Parallel." Then check for Parallel servers with your app's MCP list command. Leave other servers alone, including task-mcp.parallel.ai.
   - If "My Parallel settings" at the end of this prompt has content: don't change, replace or remove any Parallel server I already have, including the old Search MCP. My settings go on a separate server named `parallel-mcp-custom`, so I can always tell which server is customized. If `parallel-mcp-custom` already exists, ask me before replacing it. Then go to step 3 and skip the rest of this step.
   - Already on mcp.parallel.ai: go to step 6.
   - On search.parallel.ai (the old Search MCP) with custom settings (an x-parallel-search-config header or URL parameters): don't change the old server. Ask whether to install Parallel MCP as a new server next to the old server, and link the migration guide: https://docs.parallel.ai/integrations/mcp/quickstart#migration-from-the-search-mcp-and-task-mcp. If yes, continue with step 3.
   - On search.parallel.ai otherwise: ask me
     "You have an older Parallel Search MCP installed in <app name>. This MCP will be discontinued in the future.

     Switch to the new Parallel MCP? More power, more tools, and better developer controls.
     1. Switch (recommended): replace the old server.
     2. Keep both: install the new server next to the old server. You'll have two sets of search tools."
     Switch: update the old entry, keeping its name, with your app's MCP commands (remove and add again) rather than editing files by hand. search.parallel.ai/mcp-oauth becomes mcp.parallel.ai/mcp?login, and search.parallel.ai/mcp becomes mcp.parallel.ai/mcp. Keep both: install as in step 4, with ?login if the old URL ends in /mcp-oauth. Either way, if the old URL ends in /mcp-oauth, tell me "You were signed in to the old Parallel server, so you'll keep the signed-in features. You may be asked to re-authenticate into Parallel." Then go to step 5.
3. New install:
   - If "My Parallel settings" at the end of this prompt has content, turn tool choices into a `tools` URL parameter (for example ?tools=web_search,web_fetch) and everything else into an x-parallel-mcp-config header, using https://docs.parallel.ai/integrations/mcp/quickstart#configuration. For example, "always use basic search" is {"web_search":{"override":{"mode":"basic"}}}. Name the server `parallel-mcp-custom`. Using header overrides requires the user to sign-in and an app that can send custom headers: if your app can do both, use the ?login OAuth flow; if not, apply only the tools list and tell me which settings couldn't be applied.
   - Otherwise, ask me
     "How would you like to use Parallel?
     1. Sign in (recommended): All tools, including research, at higher rate limits and free monthly credits.
     2. Anonymous: Free access to search, extract, and Parallel Decisions, lower rate limits, no research. You can always sign in later."
4. Install the server at user (global) scope with your app's method, named `parallel-mcp` (or `parallel-mcp-custom`). Sign in: https://mcp.parallel.ai/mcp?login; if your app can't sign in through the browser, install anonymously and say so. Anonymous: https://mcp.parallel.ai/mcp. Quote URLs that contain `?`. Check that the server connects; if a setting breaks the connection, fix or drop the setting and tell me. Never ask me to paste a key, and never write a key into a file.
5. If web_decisions is in your tool list, go to step 6. Otherwise, tell me:
   "To finish setting up Parallel:
   1. Exit <app name>, then run `<resume command>` to reopen this chat
   2. <sign-in step> to sign in
   3. Type: Use Parallel MCP to search today's top tech news"
   Drop line 2 if I'm not signing in. Claude Code: replace line 1 with "Run /reload-plugins", and replace lines 2 and 3 with "2. Type: Use Parallel MCP to search today's top tech news" and "3. Approve the Parallel login page I open in your browser" (drop line 3 if I'm not signing in). After the reload, if you have neither web_decisions nor an authenticate tool for the Parallel server, tell me to exit Claude Code and run `claude --continue`. Codex: sign in first with `codex mcp login <server name>`, then `codex resume --last`. Apps that load new servers without a restart (such as Cursor or VS Code): replace line 1 with how to turn the server on.
6. If I'm signing in and web_research isn't listed, sign me in first: open the Parallel login page in my browser, or if you can't, tell me how to sign in with your app (Claude Code: /mcp, select the server, Authenticate). Then run one web_search for today's top tech headline and tell me:
   "Parallel is installed<, and you're signed in>. Test search: <one-line summary> (<source URL>)
   Now available: <search, extract and Parallel Decisions | search, extract, Parallel Decisions and research>."
   Say "you're signed in" only if web_research is in your tool list. If I'm anonymous, add "Sign-in adds research, higher rate limits and free monthly credits. To sign in later, ask to switch Parallel to sign-in." If you replaced the old server or added a server next to the old server, add one line saying so. If you applied my settings, add "Your settings are on a separate server, parallel-mcp-custom<, next to your existing Parallel server>."
7. If something went wrong but setup worked in the end, and a Parallel feedback tool is listed, ask me "Setup is complete, but one issue came up: <one-line description>. Would you like me to send the Parallel team feedback using the Parallel MCP feedback tool?" Show me the note before sending it.
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

Full configuration reference is in the [MCP quickstart](https://docs.parallel.ai/integrations/mcp/quickstart).

To call the server from your own code, see [Programmatic use](https://docs.parallel.ai/integrations/mcp/programmatic-use).

Agents that prefer shell tools can use the [Parallel CLI](https://docs.parallel.ai/integrations/cli).

## Connect Parallel inside your app with 1 click

* [Claude](https://claude.com/marketplace/connectors/parallel-search)
* [ChatGPT](https://chatgpt.com/plugins/plugin%5Fasdk%5Fapp%5F69fb9378663481919a68e8a2109644e5)
* [Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=Parallel%20MCP&config=eyJ1cmwiOiJodHRwczovL21jcC5wYXJhbGxlbC5haS9tY3AifQ==)
* [VS Code](https://vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.parallel.ai%2Fmcp%22%7D)
* [Grok Bot](https://x.ai/bot/plugin/698)
* [Antigravity](https://github.com/parallel-web/parallel-antigravity-plugin#install)
* [OpenCode](https://docs.parallel.ai/integrations/opencode-plugin)
* [Hermes](https://hermes-agent.nousresearch.com/marketplace/parallel-search)

[All setup guides](https://docs.parallel.ai/integrations/mcp/installation)

## Every Parallel tool in a single MCP. Free to start, ready for enterprise

### The whole Parallel suite in one connection

Search, research, decisions and fetch behind a single URL. Every tool takes the same arguments as our API, so nothing is lost in translation.

### Free to start

Search the web, fetch any page and get decisions, all without an API key. Sign in for research and higher limits.

### Smart defaults, fully configurable

Every argument starts on auto. Turn any dial to fix it, like fast mode for free users or 20 results for list building.

### Choose your search mode

Turbo for speed, advanced for depth. Pin one for every call, or let the agent pick per query.

### Built for enterprise

Admins set the tools, domains and budget for the whole org. Cost on every call, SOC 2 compliant.

## Built for every kind of agent. Wherever your agent works, it works with the live web

* ### Personal agents  
Prices, hours, and anything that changed today  
Prompt (web\_search): Is the Ferry Building farmers market open this Saturday?
* ### Research agents  
Analyst-grade reports with citations, in one call  
Prompt (web\_research): Brief me on the EU battery supply chain, with sources
* ### Sales and GTM agents  
Qualify accounts with answers grounded in the live web  
Prompt (web\_decisions): Which of these 50 accounts sell to enterprise teams?
* ### Coding agents  
Current docs and changelogs, not training-data guesses  
Prompt (web\_fetch): Upgrade this app to Next.js 16 using the official migration guide

## FAQs

* **What is Parallel MCP?**  
Parallel MCP is a hosted MCP server at https://mcp.parallel.ai/mcp that gives any AI agent four web tools: web\_search, web\_fetch, web\_decisions, and web\_research. It works in Claude, ChatGPT, Codex, Cursor, VS Code, and any other MCP client that supports remote servers. For new setups, it replaces the Parallel Search MCP and handles single research questions that used to go to the Task MCP. Keep the Task MCP for asynchronous deep research and list enrichment.
* **Is it free? Do I need an API key?**  
You can start for free with no account and no API key. web\_search, web\_fetch, and web\_decisions are free at lower rate limits. Sign in with your Parallel account or add an [API key](https://platform.parallel.ai/) to unlock web\_research, raise your rate limits, and set your own defaults. Organizations with a card on file also get $5 in free credits each month.
* **Which tool should my agent call?**  
Each tool fits one kind of question, and most agents pick the right one on their own.

  * web\_search finds current pages and returns ranked excerpts, which are usually enough to answer directly.
  * web\_fetch reads up to 20 URLs per call and returns focused excerpts or full markdown. It handles PDFs and JavaScript-heavy pages.
  * web\_decisions answers typed questions from live web evidence, with citations. It can return a yes or no probability, a pick from a list, or a score against ordered criteria.
  * web\_research researches one question in depth and returns a cited answer in the same call. It needs sign-in or an API key.  
web\_decisions is new, so name it in your prompt when you want it, for example “Use Parallel Decisions to check which of these companies are hiring.” The [Decisions docs](https://docs.parallel.ai/decisions/decisions-quickstart) have more examples.
* **How do I sign in or use an API key?**  
To sign in, connect to https://mcp.parallel.ai/mcp?login from a client that supports MCP OAuth, such as Claude, ChatGPT, Claude Code, Codex, or Cursor. The client opens a browser window where you sign in with your Parallel account. To use an API key instead, create one on [Parallel Platform](https://platform.parallel.ai/) and send it to https://mcp.parallel.ai/mcp in an Authorization: Bearer header or an x-api-key header. The [quickstart](https://docs.parallel.ai/integrations/mcp/quickstart#authentication) has examples for each client.
* **How do I choose tools and set arguments?**  
Add a tools parameter to the URL to choose which tools your agent sees, for example https://mcp.parallel.ai/mcp?tools=web\_search,web\_fetch. This list replaces the default set, so include every tool you want. To fix arguments for every call, send a JSON object in the x-parallel-mcp-config header. For web\_search you can set the search mode, max results, and included or excluded domains. For web\_fetch you can turn on full page text. Each tool takes an override block, which the model can’t change, and a model\_choice list of fields the model may set per call. Overrides need sign-in or an API key, plus a client that can send custom headers. See [override settings](https://docs.parallel.ai/integrations/mcp/quickstart#override-settings).
* **Which search mode should I use?**  
web\_search runs in fast mode by default, which suits most agents. Choose turbo for the lowest latency in live, user-facing agents. Turbo currently supports English and Japanese queries only. Choose basic for longer excerpts per result in about one second, and advanced for the best results on hard queries. You can pin one mode for every call with an override, or let the model pick per query with model\_choice. The [search modes guide](https://docs.parallel.ai/search/modes) compares them.
* **What happens when my agent hits the free limit?**  
Calls without an account run at lower rate limits. Once your agent goes past the free limit, extra calls are rate limited and nothing is billed. For higher limits, sign in at https://mcp.parallel.ai/mcp?login or add an API key. Either way, your agent also gets web\_research.
* **How is usage billed?**  
Calls without an account are free. Calls made with OAuth sign-in or an API key are billed to your Parallel account at the same rates as the underlying API, so web\_search costs the same as the Search API. Fast and turbo searches cost $1 per 1,000 requests, and basic and advanced cost $5 per 1,000\. Each result reports its cost in the \_meta field, so you can track spend per call. See [pricing](/pricing) for current rates.
* **I use the Search MCP or Task MCP. What changes?**  
Both original servers keep working. For new setups, Parallel MCP replaces the Search MCP. To switch, change search.parallel.ai/mcp to mcp.parallel.ai/mcp and search.parallel.ai/mcp-oauth to mcp.parallel.ai/mcp?login. web\_search and web\_fetch keep their names. Move any settings from URL parameters or the x-parallel-search-config header to x-parallel-mcp-config. The new server ignores old URL parameters like ?mode=, so any setting you don’t move stops applying without an error. From the Task MCP, use web\_research for single research questions, and it returns the answer in the same call. For asynchronous deep research and list enrichment, keep using the Task MCP, the Task API, or the [Parallel CLI](https://docs.parallel.ai/integrations/cli).
* **Does it work with gateways like LiteLLM?**  
Yes. Parallel MCP is a standard remote MCP server over Streamable HTTP, so you can register it in gateways like LiteLLM next to your other tools. Pass your API key and any x-parallel-mcp-config settings as headers. Overrides are applied on Parallel’s servers, so an agent behind the gateway can’t change them.
* **Can I call it from my own code?**  
Yes. Any MCP client library can connect to https://mcp.parallel.ai/mcp. Model APIs with remote MCP support, like the OpenAI Responses API and the Anthropic Messages API, can call it directly with your API key in the headers. See [programmatic use](https://docs.parallel.ai/integrations/mcp/programmatic-use). To build a single capability into your product without MCP, call the [Search API](/products/search) or other Parallel APIs directly.
* **Why won’t my client connect?**  
Make sure the URL has no trailing slash, because https://mcp.parallel.ai/mcp/ returns a 404\. Check every name in the tools parameter, because an unknown tool name returns a 400\. Then restart your client after you add or change the server.
* **How do I get higher rate limits?**  
Sign in or add an API key. With an API key, the Search, Extract, and Decisions APIs each allow 600 requests per minute. If you need more, email support@parallel.ai.

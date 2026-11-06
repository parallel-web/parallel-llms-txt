# Introducing Parallel MCP 2.0: all-in-one web research tools for every agent

**Highlights of Parallel MCP 2.0:**

- Brings more of Parallel's best-in-class web research APIs into one agent-native package
- Introduces high degrees of configuration, making it suitable for enterprise-scale deployment
- Free and keyless by default, with optional authentication to access more tools and higher rate limits

Web search is one of the most important tools an agent has. Yet most built-in search and search MCPs offer the same two tools they did two years ago: **web search** and **web fetch.** But today's agents can do far more, so why limit them to just two tools?

**Parallel MCP** (2.0) is a single MCP server that gives every agent a rich set of web research tools: fast web [search](https://parallel.ai/products/search), page content [extraction](https://parallel.ai/products/extract), grounded [decisions](https://parallel.ai/blog/decisions-api), and deep [research](https://parallel.ai/products/task). More tools like [Monitors](https://parallel.ai/products/monitor) and [Data Connectors](https://parallel.ai/data-connectors) are coming soon. It's the most configurable web search MCP available.

Parallel MCP is free by default, with no keys or sign-up required. Sign in when you need more tools, higher usage limits, or controls like search modes and domain exclusion.

- **Free**, no sign-up: `https://mcp.parallel.ai/mcp`
- **Sign in for Research**, more configurability, and higher limits: `https://mcp.parallel.ai/mcp?login`

## All of Parallel's web research tools in one place

Parallel MCP 2.0 gives models a wider range of tools to choose from, and gives developers and admins full control when they want to go beyond our defaults: which tools the model sees, which search mode it uses, which domains are excluded across an organization, and more.

![Parallel MCP connected in an MCP client, showing web_search, web_fetch and web_decisions as free tools and web_research behind sign-in](https://cdn.sanity.io/images/5hzduz3y/production/00ae3e44352bd99483190b643bc0b44c56de1eda-2800x1750.png)

| Tool | Tool ID | What your agent can do with it | Access |
| --- | --- | --- | --- |
| Search | web_search | Find current web results, ranked and compressed for LLMs. Fast mode is the default. | Free, no account |
| Extract | web_fetch | Read the full content of any page, cleaned up and ready for the model's context. | Free, no account |
| Decisions | web_decisions | Ask a question about the live web and get a cited answer: a yes/no probability, a choice from a list, or a score against a rubric. | Free, no account |
| Research | web_research | Run multi-step research and get a cited report. | Sign in (billed usage) |

## The most powerful and configurable web research MCP

![Claude Code command adding Parallel MCP with a tools query parameter and an x-parallel-mcp-config header that overrides web_search settings](https://cdn.sanity.io/images/5hzduz3y/production/f92ec7675c130562424f9ee4f5f6a4e0108e6ac7-2048x1280.png)

Developers increasingly build products on top of MCP: agent harnesses, coding tools, and assistants that extend their capabilities through MCP. But different applications have different needs. Most MCP servers leave the developer two options: accept the defaults, or abandon MCP in favor of an API. Parallel MCP 2.0 lets developers keep the MCP and set the defaults themselves. Through request headers, a developer can choose which tools the model can access and set details like search mode and page freshness. Every user of the product then gets the exact capabilities the developer intended. Developer controls are available for signed-in users.

![Coding agents, a support assistant and an internal research app route through a gateway to Parallel MCP, which enforces an organization policy on tools, excluded domains and fixed arguments](https://cdn.sanity.io/images/5hzduz3y/production/86e4481bd51a368def9c6d2532aaa8019592ef15-2800x1750.png)

Enterprises now run agents across many teams and harnesses, and rely on gateways such as [LiteLLM](https://www.litellm.ai/) or [Kong](https://konghq.com/products/kong-gateway) to enforce policy and attribute spend. Parallel MCP lets IT teams decide which capabilities are available to their users. Companies can restrict or grant access to specific tools, exclude domains across the organization, and enforce specific tool behavior. Parallel MCP enforces each policy on the server, so an agent can't override a policy or raise its own budget.

## Parallel wherever you work

![An agent chat answering a funding question by calling Parallel web_search, web_fetch and web_decisions, with cited sources](https://cdn.sanity.io/images/5hzduz3y/production/ce75ea510d4b229723b70a44b8a7780c938d4f0c-2800x1750.png)

Parallel MCP works with any MCP-compatible client, including [Claude Code](https://code.claude.com/docs/en/mcp), [Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=app), [Cursor](https://cursor.com/docs/mcp), [VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers), and more.

Parallel is also available through official plugins and integrations for [ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5), [Claude](https://claude.com/marketplace/plugins/parallel), [Cursor](https://cursor.com/marketplace/parallel), and [Grok Bot](https://x.ai/bot/plugin/698). See the [full list of integrations](https://parallel.ai/integrations).

## Get started, or switch

![MCP config diff replacing the separate parallel-search and parallel-task servers with one parallel server at mcp.parallel.ai/mcp](https://cdn.sanity.io/images/5hzduz3y/production/f5e4d8b545674a1c815e6a4a03beb6fc39613b49-2800x1750.png)

**New, or haven't tried our MCP in a while?** Add `https://mcp.parallel.ai/mcp` to your MCP client and ask your agent to look something up. 

**Using the original Search MCP?** Replace your existing URL with `https://mcp.parallel.ai/mcp`.

- To keep only the original tools, use `https://mcp.parallel.ai/mcp?tools=web_search,web_fetch`. You still get mode selection and domain exclusion.
- If you use an API key, keep passing the key as before or sign in with OAuth when your client asks.

The original server will continue to work but will no longer receive new updates. No official sunset date is planned for the legacy Parallel Search MCP.

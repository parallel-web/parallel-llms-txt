# Parallel MCP vs. Exa MCP: a 2026 comparison

Parallel MCP and Exa MCP are the two most popular ways to give an agent web search over MCP. This comparison covers tools, free tiers, auth, configuration, index architecture, and when each is the better pick, written by Parallel with the receipts to check our bias.

If you're choosing a web search MCP server in 2026, your shortlist is probably these two. Both are hosted, both pair search with page fetching, both have free entry points, and both come from companies that build their own retrieval stacks rather than reselling a search engine. We make Parallel, so this comparison comes with an obvious bias; we'll keep the claims checkable and tell you exactly where Exa is the better pick.

## The short version

Parallel optimizes for answer-ready context: declarative objectives in, ranked token-dense excerpts out. Exa optimizes for semantic retrieval breadth: embeddings-based discovery, category and domain filters, code search, and an agent product on top. Fact-heavy agent loops favor Parallel; find-me-things-like-this discovery favors Exa.

## Tools and setup

[Parallel MCP](https://parallel.ai/mcp) (https://mcp.parallel.ai/mcp) exposes three tools with no key: web_search, web_fetch, and web_decisions, which answers typed questions (a probability, a pick among options, a score) with sources. Signing in or adding an API key adds web_research, which researches one question and returns a cited answer in the same call. Search runs in low-latency fast mode by default with excerpts capped around 25,000 characters per call, and fetch returns clean markdown from up to 20 URLs, including PDFs and JavaScript-rendered pages. If you want the original two-tool surface, ?tools=web_search,web_fetch keeps just those. The [quickstart](https://docs.parallel.ai/integrations/mcp/quickstart) has setup for each client.

**Exa** (`https://mcp.exa.ai/mcp`, open source) enables `web_search_exa` and `web_fetch_exa` by default, with more behind URL parameters: advanced search with category, domain, and date filters, code search over GitHub content, and the usage-based Exa Agent for multi-step research. The surface is wider, but you opt into each tool explicitly, and the heavier ones require authentication.

## Free tiers and auth

Both are usable without paying. Parallel's default endpoint is anonymous, no key or account, and web_search, web_fetch, and web_decisions are free at lower rate limits; calls past the limit are rate limited, not billed. Signing in at https://mcp.parallel.ai/mcp?login works in clients that support MCP OAuth, such as Claude, ChatGPT, Claude Code, Codex, and Cursor, and other clients can send an API key as a Bearer or x-api-key header. Either one adds web_research and higher limits, billed at API rates (fast and turbo search $1 per 1,000 requests, basic and advanced $5), and a new account comes with [up to $80 in free credits plus $5 a month with a card on file](https://parallel.ai/pricing). Exa's free plan covers casual use, with an x-api-key header to lift limits and auth required for the Agent tool. In practice, Parallel's entry point requires no signup at all, while Exa's heavier tools want an account sooner.

## Configuration

Both servers let you choose which tools a client sees with a tools URL parameter. Parallel also lets you fix settings for a whole connection: with sign-in or a key, the x-parallel-mcp-config header pins web_search's mode (turbo, fast, basic, or advanced), result count, location, and included or excluded domains, and a model_choice list decides which of those fields the model may set on its own. Enterprise admins can set tools, domains, and budgets for the whole organization, enforced on the server, and every signed-in result reports its cost in _meta. Exa puts its filters in web_search_advanced_exa, an opt-in tool where the model sets categories, domains, and date ranges per call.

## Architecture, briefly

Parallel runs a proprietary web-scale index built for agent consumption: ranking optimized for what helps a model's next reasoning step, and excerpt compression that trims noise from the context window, which means fewer round trips and fewer tokens. Exa's retrieval is embeddings-first, which is why it does well at "find pages like this" and category-constrained discovery that keyword-style objectives express poorly.

## Side by side

|  | Parallel MCP | Exa MCP |
| --- | --- | --- |
| Default tools | web_search, web_fetch, web_decisions | web_search_exa, web_fetch_exa |
| Extras | web_research with sign-in or a key; Task MCP (separate) for async deep research | Code search, advanced filters, Exa Agent (opt-in) |
| Free entry | Anonymous, no account | Free plan, casual use |
| Auth options | None / OAuth (?login) / Bearer or x-api-key header | x-api-key header / OAuth |
| Configuration | ?tools= plus x-parallel-mcp-config header (mode, domains, result count) | ?tools= URL parameter; filters in the advanced tool |
| Retrieval style | Own index, agent-dense excerpts | Embeddings-based semantic search |
| Notable adoption | OpenClaw's default web search | OpenCode's built-in websearch |

## When Exa is the right call

Choose Exa when your workload is semantic discovery: competitor mapping, similar-page hunting, and category-filtered research, where embeddings retrieval does well. Its code search is also a real differentiator for agents that live in GitHub. (For the adjacent list-building comparison, Exa Websets versus our FindAll API, we keep a [separate deep dive](https://parallel.ai/articles/exa-vs-parallel-findall).) Choose Parallel when the job is grounding an agent loop: fact lookups, docs, current events, research pipelines, anywhere accuracy compounds across thousands of calls.

## Frequently asked questions

**Can I run both?** Technically yes, but near-duplicate search tools degrade tool selection and waste context. Test both, keep one.

**Which works in my harness?** Both are Streamable HTTP servers and work in every major MCP client: Claude Code, Cursor, Codex, OpenCode, Windsurf, Gemini CLI, and the rest.

**How do I compare them fairly?** Same twenty real queries through each, count end-task success and retries, and rerun quarterly since both ship constantly. Our [benchmarking guide](https://parallel.ai/articles/how-to-benchmark-web-search-apis) has the full method.

## The test costs nothing

Both servers are free to try, which makes this the rare vendor comparison you can settle empirically in an afternoon. [Add ours](https://parallel.ai/mcp), add theirs, run your real queries, and keep whichever makes your agent right more often.

# How to add web search to the Claude Agent SDK (Python and TypeScript)

The Claude Agent SDK ships its own WebSearch tool, but you can't change the provider behind it, so your choice is whether to keep it or connect a search MCP server instead. This guide covers how the built-in tools work and what they cost, runnable Python and TypeScript examples with Parallel's free Search MCP, how to disable built-in search, and when each option fits.

The Claude Agent SDK is the library version of Claude Code: the same agent loop, built-in tools, permissions, and MCP client, driven from Python (`claude-agent-sdk`, v0.2.165 on PyPI as of October 8, 2026) or TypeScript (`@anthropic-ai/claude-agent-sdk`, v0.3.296 on npm as of October 9, 2026). It ships with two web tools, `WebSearch` and `WebFetch`, and Anthropic’s own [tools reference](https://code.claude.com/docs/en/tools-reference) says the search backend isn’t configurable: “To search with a different provider, add an MCP server that exposes a search tool.” That’s what this guide does, with working code in both languages.

## How the built-in WebSearch and WebFetch tools work

`WebSearch` runs queries against Anthropic’s [web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) backend and returns result titles and URLs. It doesn’t read the pages. Per the tools reference, one `WebSearch` call can issue up to eight backend searches as it refines the query. To read a result, Claude follows up with `WebFetch`, which fetches the page, converts it to Markdown, and runs a separate model call over it with a prompt Claude writes. Anthropic calls this “lossy by design”: Claude sees the answer to its prompt, not the page.

In our test runs, the SDK’s usage report billed the searches to a separate Claude Haiku 5.5 call, and each `WebSearch` result came back as a list of links plus a short summary. On three of three factual questions, Claude then called `WebFetch` on a result before answering.

Check these limits before you ship:

- **Price:** Anthropic charges $10 per 1,000 searches on the Claude API, plus tokens for the search content ([pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool#usage-and-pricing)).
- **Availability:** `WebSearch` works on the Claude API, Claude Platform on AWS, and Microsoft Foundry, and on Google Cloud’s Agent Platform with Claude 4 and later models. Amazon Bedrock doesn’t expose the server-side search tool.
- **Controls:** you can allow or deny `WebSearch` as a whole, and Claude can pass `allowed_domains` or `blocked_domains`. You can’t change the index, the ranking, or the result format.
- **Page reads:** `WebFetch` reads up to 100,000 characters per call and caches each response for 15 minutes.

## What changes when you add a search MCP server

An MCP server gives Claude its own tools, which the SDK names `mcp__<server-name>__<tool-name>`. Connect [Parallel’s Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) under the name `parallel` and the agent gets two tools:

- `mcp__parallel__web_search` takes a natural-language `objective` plus a list of short keyword `search_queries`, and returns ranked URLs with excerpts chosen for that objective, plus a publish date when we have one.
- `mcp__parallel__web_fetch` reads up to 20 URLs per call and returns excerpts focused on an objective, or the full page as Markdown with `full_content: true`.

The server is at `https://search.parallel.ai/mcp`, speaks Streamable HTTP, and is free with no API key in `fast` mode at anonymous rate limits. Add an `Authorization: Bearer` header with a [Parallel API key](https://platform.parallel.ai) for higher limits. We make Parallel, so weigh our description accordingly, and test both paths on your own prompts.

|  | Built-in WebSearch + WebFetch | Parallel Search MCP |
| --- | --- | --- |
| What a search returns | Titles and URLs, plus a model-written summary | URLs, titles, publish dates, and query-focused excerpts |
| Reading pages | WebFetch, one URL, filtered through a prompt | web_fetch, up to 20 URLs, excerpts or full Markdown |
| Search price | $10 per 1,000 searches, up to 8 per call | Free without a key; Search API rates ($1 to $5 per 1,000) with a key |
| Works on Bedrock | No | Yes, any provider the SDK supports |
| Backend configurable | No | Mode, location, and other Search API settings with a key |
| Setup | None | One mcp_servers entry |

## Install the SDK

You need Python 3.10+ or Node.js 18+. Both packages bundle a native Claude Code binary, so most installs don’t need a separate Claude Code install.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install claude-agent-sdk
```

```bash
npm init -y
npm pkg set type=module
npm install @anthropic-ai/claude-agent-sdk
npm install --save-dev tsx
```

Set `ANTHROPIC_API_KEY` from the [Claude Console](https://platform.claude.com/), or use Bedrock, Vertex, or Foundry credentials. Anthropic’s [quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) notes that third-party products built on the SDK can’t offer claude.ai login unless Anthropic has approved it, so use an API key for anything you ship.

## Python example: Claude Agent SDK with Parallel web search

This is the script we ran. It connects the Search MCP over HTTP, sends a Bearer key only if one is set, pre-approves both Parallel tools, and removes the built-in web tools so every search goes through Parallel.

```python
import asyncio
import os

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    TextBlock,
    ToolUseBlock,
    query,
)

# Free without a key. Set PARALLEL_API_KEY for higher rate limits.
headers = {}
if os.environ.get("PARALLEL_API_KEY"):
    headers["Authorization"] = f"Bearer {os.environ['PARALLEL_API_KEY']}"

options = ClaudeAgentOptions(
    mcp_servers={
        "parallel": {
            "type": "http",
            "url": "https://search.parallel.ai/mcp",
            "headers": headers,
        }
    },
    # Pre-approve both Parallel tools so the agent never stops to ask.
    allowed_tools=["mcp__parallel__web_search", "mcp__parallel__web_fetch"],
    # Remove the built-in web tools so every search goes through Parallel.
    disallowed_tools=["WebSearch", "WebFetch"],
    # Load only what this file passes: no ~/.claude settings or other MCP configs.
    setting_sources=[],
    strict_mcp_config=True,
    max_turns=6,
)


async def main():
    prompt = "Which company did Anthropic most recently announce an acquisition of, and when? Search the web and cite sources."
    async for message in query(prompt=prompt, options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, ToolUseBlock):
                    print(f"[tool] {block.name} {block.input}")
                elif isinstance(block, TextBlock):
                    print(block.text)
        elif isinstance(message, ResultMessage):
            print(f"[done] turns={message.num_turns} cost=${message.total_cost_usd:.4f}")


asyncio.run(main())
```

We ran it on October 10, 2026, with SDK v0.2.165 and no Parallel key. Here’s the trimmed output. Claude wrote its own objective and keyword queries, then filled in the optional `model_name` and `session_id` fields without being asked:

```text
[tool] ToolSearch {'query': 'select:mcp__parallel__web_search', 'max_results': 1}
[tool] mcp__parallel__web_search {'objective': "Find Anthropic's most recent announced acquisition of a company (as of October 2026), with announcement date. Prefer official Anthropic announcements and reputable news.", 'search_queries': ['Anthropic acquires', 'Anthropic acquisition 2026', 'Anthropic announces acquisition'], 'model_name': 'claude-opus-5-5', 'session_id': '7f3a9c2e...'}
[tool] mcp__parallel__web_search {'objective': 'Any Anthropic acquisition announced after May 2026 ...', 'search_queries': ['Anthropic acquires startup September 2026', ...]}
The most recent company Anthropic itself announced acquiring is **Stainless**, on **May 18, 2026**. ...
- Anthropic's announcement, "Anthropic acquires Stainless" (May 18, 2026): https://www.anthropic.com/news/anthropic-acquires-stainless
...
[done] turns=5 cost=$0.2521
```

The first line is the SDK’s tool search loading the MCP tool definitions on demand, which it does by default when built-in tools are present. The reported cost covers Claude’s tokens only, at list prices; the keyless Parallel calls were free.

## TypeScript example

The TypeScript options mirror the Python ones in camelCase: `mcpServers`, `allowedTools`, `disallowedTools`, `settingSources`, and `strictMcpConfig`.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

// Free without a key. Set PARALLEL_API_KEY for higher rate limits.
const headers: Record<string, string> = {};
if (process.env.PARALLEL_API_KEY) {
  headers.Authorization = `Bearer ${process.env.PARALLEL_API_KEY}`;
}

for await (const message of query({
  prompt: "What changed in the newest release of @anthropic-ai/claude-agent-sdk on npm? Cite sources.",
  options: {
    mcpServers: {
      parallel: { type: "http", url: "https://search.parallel.ai/mcp", headers },
    },
    allowedTools: ["mcp__parallel__web_search", "mcp__parallel__web_fetch"],
    disallowedTools: ["WebSearch", "WebFetch"],
    settingSources: [],
    strictMcpConfig: true,
    maxTurns: 6,
  },
})) {
  if (message.type === "assistant") {
    for (const block of message.message.content) {
      if (block.type === "tool_use") console.log(`[tool] ${block.name}`, JSON.stringify(block.input));
      if (block.type === "text") console.log(block.text);
    }
  } else if (message.type === "result") {
    console.log(`[done] turns=${message.num_turns} cost=$${message.total_cost_usd.toFixed(4)}`);
  }
}
```

Run it with `npx tsx agent.ts`. We ran it with v0.3.296 on Node 22. Claude called `mcp__parallel__web_fetch` on the npm registry entry and the package changelog, then answered correctly that 0.3.296 was the newest release and listed its three changes, in 4 turns for $0.2028.

In that run, Claude first tried `Bash`, to run `npm view`. The SDK’s default tool set includes Claude Code’s file and shell tools, and `allowedTools` only pre-approves tools without removing the rest.

## How to turn off built-in WebSearch

You have three options, depending on what else the agent needs:

- **Keep other built-in tools, drop web search:** `disallowed_tools=["WebSearch", "WebFetch"]` (`disallowedTools` in TypeScript) removes both from the model’s context. Use this for coding agents that still need `Read`, `Edit`, or `Bash`.
- **Research-only agent:** `tools=[]` (`tools: []`) disables every built-in tool, so Parallel’s two tools are all Claude has. This also skips the tool search step, because `ToolSearch` is a built-in tool.
- **Narrow pre-approval:** list exact tool names in `allowed_tools`, or use `"mcp__parallel__*"` to approve every tool on the server. Anthropic recommends this over `bypassPermissions`, which approves far more than MCP tools.

Also check the `system` init message for the server’s `status`. If it reads `failed` or `needs-auth`, the [MCP guide](https://code.claude.com/docs/en/agent-sdk/mcp#error-handling) warns that Claude can fall back to built-in tools, which is one more reason to disallow them when you want only Parallel.

## Cost in practice

Search fees are straightforward to compare. At two searches per task, 1,000 tasks cost $20 in Anthropic search fees, or more when one `WebSearch` call fans out into several backend searches. The same 1,000 tasks cost nothing on the keyless Search MCP; with an API key, calls bill at [Search API rates](https://docs.parallel.ai/search/modes), which run $1 to $5 per 1,000 requests depending on mode.

Token costs usually dominate, though, and they depend on how many turns the agent takes. In our test runs, the built-in path usually needed a `WebFetch` call after `WebSearch` before Claude could answer, which adds a turn. With the Search MCP, Claude often answered from the `web_search` excerpts alone. Measure turns and total cost on your own workload before you decide.

## When to use which

Use the built-in tools when you want zero setup, you’re on the Claude API, and a few cents per search doesn’t matter at your volume. Claude can scope searches with domain filters, and there’s no extra server to monitor.

Add the Parallel Search MCP when you’re on Bedrock, which has no server-side search; when you want excerpts the agent can answer from without an extra fetch turn; when you need to read many URLs in one call; or when search volume makes $10 per 1,000 add up. Our [Claude web search vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) comparison covers quality and pricing in more depth, and [best web search MCP](https://parallel.ai/articles/best-web-search-mcp) compares other servers you could plug into the same `mcp_servers` slot.

## Frequently asked questions

### Does the Claude Agent SDK support remote MCP servers?

Yes. Pass `{"type": "http", "url": ..., "headers": {...}}` in `mcp_servers` (Python) or `mcpServers` (TypeScript) for a Streamable HTTP server, or `"type": "sse"` for an SSE server. The SDK doesn’t run interactive OAuth, so pass tokens in `headers`.

### What are MCP tool names in the Claude Agent SDK?

MCP tools are named `mcp__<server-name>__<tool-name>`. A server you register as `parallel` exposes `mcp__parallel__web_search` and `mcp__parallel__web_fetch`, and those names are what you put in `allowed_tools` or `disallowed_tools`.

### Can I change the search provider behind the built-in WebSearch tool?

No. Anthropic’s tools reference says the WebSearch backend isn’t configurable and recommends adding an MCP server that exposes a search tool instead. You can then remove the built-in tool with `disallowed_tools=["WebSearch"]`.

### How much does web search cost in the Claude Agent SDK?

The built-in tool uses Anthropic’s web search, which costs $10 per 1,000 searches plus token costs, and one WebSearch call can run up to eight searches. Parallel’s Search MCP is free without a key and $1 per 1,000 searches in fast mode with one.

### Does WebSearch work with Claude on Amazon Bedrock?

No. Anthropic’s docs say Amazon Bedrock doesn’t expose the server-side web search tool. An MCP search server such as Parallel’s works with any model provider the SDK supports, because the SDK calls it directly.

### Do I need an API key for Parallel’s Search MCP?

No. `https://search.parallel.ai/mcp` works anonymously in fast mode at anonymous rate limits. Add `Authorization: Bearer <PARALLEL_API_KEY>` to the server’s headers for higher limits and to pin settings such as the search mode.

## Get started

Copy the Python or TypeScript example above, run it without a key, and check that the first tool call is `mcp__parallel__web_search`. When you need higher limits, create a key on the [Parallel Platform](https://platform.parallel.ai) and set `PARALLEL_API_KEY`. For the full tool reference and configuration options, see the [Search MCP docs](https://docs.parallel.ai/integrations/mcp/search-mcp), and for the bigger picture of how agents and tools fit together, read [what is an agent harness](https://parallel.ai/articles/what-is-an-agent-harness).

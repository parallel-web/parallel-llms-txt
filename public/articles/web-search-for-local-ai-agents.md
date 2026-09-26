# How to add web search to a local AI agent (Ollama, LM Studio, Pi, and Goose)

A local model has no idea what happened after its training cutoff, and most search APIs would put a bill back into your zero-cost stack. This guide covers adding free web search to agents running on Ollama and LM Studio, via LM Studio, Goose, Pi, and Cline, plus the privacy caveat.

Running a model locally solves cost, privacy, and control in one move, and creates a new problem in the same move: the agent's knowledge ends at its training cutoff, and a local machine has no web index. Ask a local Gemma or Llama about a library released last month and you get confident fiction. Web search fills that gap, provided you can add it without reintroducing the API bill your local stack exists to avoid.

The [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) is free with no API key or account, so a fully local agent gains real web search and page fetching for exactly $0. Disclosure: it's ours, which is why this guide uses it; the setup patterns below work with any hosted MCP server if you'd rather bring a different one.

## One caveat before setup

Adding web search punctures pure locality: your search queries and fetched URLs go to the search provider, even though your prompts, documents, and the model's reasoning stay on your machine. For most people that's the right trade, since a query is far less sensitive than a conversation. If your threat model forbids even queries leaving the machine, stop here; no hosted search fits, and a local crawler won't give you a web-scale index.

## LM Studio

LM Studio runs models locally and speaks MCP natively, with one-click install links (the `lmstudio://` deeplink on our docs page) or a manual entry in its `mcp.json`. Once added, any tool-capable local model can call `web_search` and `web_fetch` like any other tool.

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "url": "https://search.parallel.ai/mcp"
    }
  }
}
```

## Goose

Goose, Block's open-source agent, runs against local models and adds MCP servers as extensions. Use the one-click `goose://` install link from our docs, or add an extension manually with type `streamable_http` and the URL `https://search.parallel.ai/mcp`. It works without a key.

## Pi (with Ollama)

The Pi coding harness pointed at an Ollama model is the purest zero-cost stack, and we've published a complete walkthrough: [building a fully free CLI agent with Pi, Ollama, Gemma 4, and Parallel](https://parallel.ai/blog/free-CLI-agent). Pi has no built-in MCP support, so either install `pi-mcp-adapter` and add the server to `.mcp.json` (details in our [Pi MCP guide](https://parallel.ai/articles/best-mcp-servers-for-pi)), or skip MCP and install the Parallel CLI as a Pi skill, which suits Pi's shell-first design.

## Cline (with Ollama)

Cline in VS Code can drive Ollama-served models, and it treats remote MCP servers as stdio processes via the `mcp-remote` wrapper:

```json
{
  "mcpServers": {
    "Parallel Search MCP": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://search.parallel.ai/mcp"]
    }
  }
}
```

## Two tips for small local models

First, keep the tool count low. Small models degrade at tool selection much faster than frontier ones, so a local agent with two well-described tools (`web_search`, `web_fetch`) will outperform the same model juggling twenty. Second, lean on search excerpts. The Parallel server returns excerpts dense enough to answer from directly, which matters doubly when your model's context window is 8k or 32k rather than a million; teach your agent, via system prompt or skill, to fetch full pages only when the excerpts fall short.

## The zero-dollar stack, summarized

| Layer | Free option | Cost |
| --- | --- | --- |
| Model | Ollama or LM Studio (Gemma, Llama, Qwen) | $0 |
| Harness | Pi, Goose, Cline, or LM Studio's chat | $0 |
| Web search + fetching | Parallel Search MCP, keyless | $0 |
| Optional: deeper research | Parallel Task MCP with free account | $5/month free credit |

## Frequently asked questions

**Does Ollama support MCP directly?** Ollama serves models; the MCP connection belongs to the harness in front of it (Pi, Goose, Cline, LM Studio, and others). Point any of them at your Ollama endpoint and add the server there.

**Will a small local model use search tools well?** Recent small models handle tool calling fine when the tool count is low and descriptions are clear. When they stumble, the cause is usually too many tools rather than tool calling itself.

**Is the free tier really enough?** For personal use, yes; that's what the anonymous rate limits are sized for. If you outgrow them, a free account adds $5 in recurring monthly credits before anything costs money.

## Give your local model the internet

Pick your harness above, paste one config block, and ask your local model something that happened last week. The whole experiment is free, and the [Pi + Ollama walkthrough](https://parallel.ai/blog/free-CLI-agent) shows the complete build if you're starting from nothing.

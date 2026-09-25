# LangChain's Managed Deep Agents ships with built-in web search from Parallel

LangChain released Managed Deep Agents v0.8 today, a fully-managed service for building, deploying, and running mission-critical agents on LangSmith. Web search is critical for production agents, and belongs in every agent stack. With this release, Managed Deep Agents ship with Parallel Search built-in.

LangChain released [Managed Deep Agents v0.8](https://docs.langchain.com/langsmith/python/managed-deep-agents-overview) today, a fully-managed service for building, deploying, and running mission-critical agents on LangSmith. Web search is critical for production agents, and belongs in every agent stack. With this release, Managed Deep Agents ship with Parallel Search built-in.

Developers building on Managed Deep Agents can give an agent web search without creating a separate vendor account, managing another API key, or wiring up a search tool themselves.

> "Almost every agent our customers put into production needs to look something up on the web. That means search is one of the first pieces of infra teams have to wire up after deploying. Parallel enables us to add search as a native tool in Managed Deep Agents, so teams can access search results built for agents using the same API key they use across LangSmith."
>
> — Sam Crowder, Head of Product Management, LangChain

## What Managed Deep Agents does

Shipping an agent to production usually means building a lot of infrastructure first: durable execution, persistence, memory, auth, sandboxes, and observability. Managed Deep Agents manages all the infrastructure needed on Langsmith.

Developers define agent behavior, skills, and tools in Python or TypeScript, organized in a simple directory. LangChain's harness supplies opinionated defaults for everything else, so teams spend their time on domain logic, prompts, and evals. Running mda deploy compiles the code and triggers a LangSmith build. Each deployed agent includes memory, sandboxes, tool servers, channels, tracing, and evals from day one, and LangSmith scales it horizontally for bursty, long-running workloads.

This release also adds **connections**, so agents call tools with the right identity; **user-level memory**, so context is personalized to each person; and file transfer in Slack.

## How built-in search works

Add Parallel to the servers map in tools/mcp.py or tools/mcp.ts. You only define mcp once.

```python
from managed_deepagents import define_mcp

mcp = define_mcp(
    servers={
        "Parallel": {
            "transport": "http",
            "url": "https://api.smith.langchain.com/v1/managed-tools/servers/parallel/mcp",
        },
    },
)

```

LangSmith manages the Parallel credentials and executes the tool. Search calls, latency, and errors show up in LangSmith traces alongside the rest of the agent's run, so you can debug a bad answer back to the search that produced it.

When the agent searches, we return ranked URLs with compressed, query-relevant excerpts from our own web index. The excerpts give the agent dense context without filling its window with raw pages, and the source URLs give it something to cite.

Parallel Web Search runs with zero data retention and is free during the public beta of Managed Deep Agents.

## Get started

Managed Deep Agents is available now in public beta. Read LangChain's launch post and the [Managed Deep Agents docs](https://docs.langchain.com/langsmith/python/managed-deep-agents-overview) to deploy your first agent.

To learn more about how Parallel Search brings fresh context to your agents, see our [docs](https://docs.parallel.ai).

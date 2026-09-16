# Authenticated page access for the Parallel Task API

Starting today, the Parallel Task API can conduct research over private, login-protected data sources— extending its capabilities beyond the public web.



Critical information often resides behind login walls, including internal wikis, gated industry databases, protected documentation, proprietary research sources, and niche portals. Until now, these sources have remained out of reach for web enrichment and deep research workflows.



With authenticated page access, the [Task API](https://docs.parallel.ai/task-api/task-quickstart) can now research across both public and private sources within a single workflow.

![](https://cdn.sanity.io/images/5hzduz3y/production/d96dcc45f833dad3cb54e40f8864dc2545d9f154-5396x3240.jpg)

## When to use authenticated page access

For third-party providers that offer out-of-the-box MCP servers or OAuth connectors (stay tuned for more on this), we recommend using those purpose-built integrations.

For the long tail of gated domains where no dedicated connector exists, connect Parallel with the [Browser Use MCP](https://docs.parallel.ai/integrations/browseruse) to authenticate into these private domains.

We only recommend using browser agents for authentication into a private domain when the domain allows for such authentication, and it complies with its Terms of Service. It's recommended to make these checks yourself before connecting Parallel with any browser agent MCP.

```
Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.
```

![Before and after using Browser Use MCP](https://cdn.sanity.io/images/5hzduz3y/production/0c05c6cf9488eb22080a08a051b9d9b5802edf8a-5396x3240.jpg)

## How it works

When a browser agent is connected with Parallel, we orchestrate research by doing the following:

1. **Source discovery:** The Task API identifies relevant sources for your query, including any login-protected domains you’ve configured for private access.
2. **Authenticated retrieval:** When the Task API encounters a gated source, it delegates retrieval to the browser agent via MCP. The agent completes the login flow in a secure session and fetches the protected content.
3. **Cross-source synthesis:** The Task API synthesizes data from both public and private sources into a unified response with full Basis support, including citations, reasoning, excerpts, and confidence scores.

This architecture keeps credential management separate from Parallel’s infrastructure. Your authentication details remain with the browser agent service you configure, while Parallel handles research orchestration and synthesis.

```
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{
  "input": "Go to https://www.nxp.com/products/K66_180 and extract only the migration-related information for the K66-180 chip, specifically documentation on Migration from Kinetis K Series to MCXNx4x Series.",
  "processor": "ultra",
  "mcp_servers": [
    {
      "type": "url",
      "url": "https://api.browser-use.com/mcp",
      "name": "browseruse",
      "headers": {
        "Authorization": "Bearer YOUR_BROWSERUSE_API_KEY"
      }
    }
  ]
}'
```

## Start building

Private data access is available today for all Task API processors. Get started in the [Developer Platform](https://platform.parallel.ai/login?redirectTo=%2F) or dive into the [documentation](https://docs.parallel.ai/integrations/browseruse).

****

## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI businesses like Manus, Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

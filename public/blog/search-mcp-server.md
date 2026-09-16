# Introducing the Parallel Search MCP Server 

Last month, we unveiled the [Parallel Search API](https://parallel.ai/products/search) - a single endpoint purpose-built for AIs that takes in flexible search objectives and outputs high-density, LLM-ready search results with extended snippets. Today, we’re making that same capability available out of the box for any model that supports tool use, via the Parallel Search MCP Server.

The MCP Server exposes our Search API as a plug-and-play tool, giving LLMs instant access to real-time web knowledge with a simple configuration change. This replaces brittle, multi-step search stacks with a single, production-ready tool that delivers higher quality results at significantly lower cost.

![](https://cdn.sanity.io/images/5hzduz3y/production/520765597d48204a4b468d911ca4dc1fb9d617bb-1708x1080.gif)

## **MCP-Native Search**

The Search MCP server allows developers to easily integrate the Parallel Search API with any MCP-aware LLM, eliminating the complexity of custom API wrappers. The MCP Server delivers:

- **Seamless integration**: Plug-and-play with OpenAI, Anthropic, and other MCP-aware clients - no custom REST wiring.
- **Flexible search inputs**: Works with both natural language objectives and keyword queries, with precise controls for domains, freshness, and length.
- **Superior quality at lower cost**: Dense, citation-rich passages ranked for LLM reasoning, delivered for a fraction of typical search spend.
- **Production scale**: Built on Parallel's proprietary web crawler and index, the same infrastructure that powers our public Search API at scale.

## **A Quick Integration**

Adding Parallel Search to your LLM client is as simple as swapping in a simple tool definition:

```python
from openai import OpenAI
from openai.types import responses as openai_responses


PARALLEL_API_KEY = "your-api-key"


tools = [
   openai_responses.tool_param.Mcp(
       server_label="parallel_web_search",
       server_url="https://mcp.parallel.ai/alpha/search_mcp/",
       headers={"x-api-key": PARALLEL_API_KEY},
       type="mcp",
       require_approval="never",
   )
]


response = OpenAI(
    api_key="XXX"
).responses.create(
    model="gpt-4.1",
    input="Who is ceo of apple?",
    tools=tools,
    tool_choice="required",
)

print(response)

```

## **Start Building**

Connect to the Parallel Search MCP Server through your MCP-compatible client and start accessing real-time web knowledge instantly. Get started in our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/integrations/mcp/search-mcp).

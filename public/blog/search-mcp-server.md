[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing the Parallel Search MCP Server

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Last month, we unveiled the [Parallel Search API](https://parallel.ai/blog/parallel-search-api) [Parallel Search API]($https://parallel.ai/blog/parallel-search-api) \- a single endpoint purpose-built for AIs that takes in flexible search objectives and outputs high-density, LLM-ready search results with extended snippets. Today, we’re making that same capability available out of the box for any model that supports tool use, via the Parallel Search MCP Server.

The MCP Server exposes our Search API as a plug-and-play tool, giving LLMs instant access to real-time web knowledge with a simple configuration change. This replaces brittle, multi-step search stacks with a single, production-ready tool that delivers higher quality results at significantly lower cost.

[](mcp-server-in-claude)

![](https://cdn.sanity.io/images/5hzduz3y/production/520765597d48204a4b468d911ca4dc1fb9d617bb-1708x1080.gif) The Parallel Search MCP server in Claude

## \## **\*\* MCP-Native Search \*\***

The Search MCP server allows developers to easily integrate the Parallel Search API with any MCP-aware LLM, eliminating the complexity of custom API wrappers. The MCP Server delivers:

* \- **\*\* Seamless integration \*\*** : Plug-and-play with OpenAI, Anthropic, and other MCP-aware clients - no custom REST wiring.
* \- **\*\* Flexible search inputs \*\*** : Works with both natural language objectives and keyword queries, with precise controls for domains, freshness, and length.
* \- **\*\* Superior quality at lower cost \*\*** : Dense, citation-rich passages ranked for LLM reasoning, delivered for a fraction of typical search spend.
* \- **\*\* Production scale \*\*** : Built on Parallel's proprietary web crawler and index, the same infrastructure that powers our public Search API at scale.

## \## **\*\* A Quick Integration \*\***

Adding Parallel Search to your LLM client is as simple as swapping in a simple tool definition:

\### Add Parallel to your LLM client

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

from  openai  import  OpenAI
 from  openai.types  import  responses  as  openai_responses


PARALLEL_API_KEY =  "your-api-key" 


tools = [
   openai_responses.tool_param.Mcp(
       server_label= "parallel_web_search" ,
       server_url= "https://mcp.parallel.ai/alpha/search_mcp/" ,
       headers={ "x-api-key" : PARALLEL_API_KEY},
        type = "mcp" ,
       require_approval= "never" ,
   )
]


response = OpenAI(
    api_key= "XXX" 
).responses.create(
    model= "gpt-4.1" ,
     input = "Who is ceo of apple?" ,
    tools=tools,
    tool_choice= "required" ,
)

 print (response) ```  from openai import OpenAI from openai.types import responses as openai_responses     PARALLEL_API_KEY = "your-api-key"     tools = [ openai_responses.tool_param.Mcp( server_label="parallel_web_search", server_url="https://mcp.parallel.ai/alpha/search_mcp/", headers={"x-api-key": PARALLEL_API_KEY}, type="mcp", require_approval="never", ) ]     response = OpenAI( api_key="XXX" ).responses.create( model="gpt-4.1", input="Who is ceo of apple?", tools=tools, tool_choice="required", )   print(response)   ```
```

## \## **\*\* Start Building \*\***

Connect to the Parallel Search MCP Server through your MCP-compatible client and start accessing real-time web knowledge instantly. Get started in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/features/remote-mcp) [documentation]($https://docs.parallel.ai/features/remote-mcp) .

By Parallel

July 14, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service) [Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

Parallel Web Systems Inc. 2025

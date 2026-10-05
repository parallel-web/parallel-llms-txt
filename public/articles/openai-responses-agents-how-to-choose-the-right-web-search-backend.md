# OpenAI Responses agents: how to choose the right web search backend

OpenAI's Responses API includes hosted web search with domain filters, source visibility, and live-access controls. This guide compares its production trade-offs with a dedicated retrieval backend, explains custom function tools, and shows how to connect Parallel Search to a Responses API agent.

Hosted search is a convenient starting point. For production agents, compare retrieval quality, total task cost, and how much of the retrieval pipeline your application needs to own. The six options below support different trade-offs.

## How the Responses API changes agent development

The Responses API replaces both Chat Completions and the Assistants API as OpenAI's primary agent primitive. OpenAI designed it around one core loop: the model calls tools, processes results, and decides whether to call more tools or return a final response. OpenAI detailed this architecture in their [agent-building tools announcement](https://openai.com/index/new-tools-for-building-agents/).

Built-in tools that ship with the API include `web_search`, `file_search`, and `computer`, alongside code interpreter, image generation, shell, and remote MCP servers. Each one plugs into the agentic loop without any setup on your end. The model decides when to invoke a tool based on the user's query and your system instructions. The [Agents SDK documentation](https://developers.openai.com/api/docs/guides/agents) covers the orchestration layer in detail.

Custom function tools plug into that same loop. You define a function with a name, description, and JSON schema; when the model calls it, you execute whatever logic you want and return the result. The model treats your function's output the same way it treats built-in tool output. For teams migrating existing apps, OpenAI published a [migration guide](https://developers.openai.com/api/docs/guides/migrate-to-responses) covering the transition from Chat Completions. A [comprehensive community guide](https://github.com/Dicklesworthstone/guide_to_openai_response_api_and_agents_sdk) also covers the full API surface.

In this architecture, the model handles reasoning and orchestration, and you control the tools that feed it information. For [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) that need live web data, the tool that matters most is web search: the mechanism your agent uses to access current, real-world information. Understanding the [agent harness](https://parallel.ai/articles/what-is-an-agent-harness) pattern helps clarify how tool execution fits into the broader agent lifecycle.

## OpenAI's built-in web search: capabilities and constraints

Enabling built-in web search takes one addition to your tools array:

```python
from openai import OpenAI

client = OpenAI()
response = client.responses.create(
    model="gpt-6-sol",
    tools=[{"type": "web_search"}],
    input="What were Nvidia's Q1 2025 earnings?"
)
print(response.output_text)
```

The model now searches the web when it determines a query needs live information. OpenAI returns inline citations with source URLs and search context annotations. [OpenAI's web search documentation](https://developers.openai.com/api/docs/guides/tools-web-search) covers the full configuration surface.

Configuration includes `user_location` adjusts geo-targeting for location-sensitive queries. `search_context_size` controls how much search context the model ingests, with three options: `low`, `medium`, and `high`.

Capability check: October 4, 2026. Responses API web_search supports filters.allowed_domains or filters.blocked_domains (up to 100 each), complete consulted URLs through include=["web_search_call.action.sources"], and search queries in web_search_call.action when available. external_web_access selects live access (default) or cache-only mode. These controls do not apply uniformly to web_search_preview or Chat Completions search.

OpenAI charges $10 per 1,000 web search tool calls and bills the retrieved search content as input tokens at your model's rate. You pay that on top of your regular model token costs.

Built-in web search removes integration work and offers useful production controls. A dedicated backend such as Parallel gives your application a separate retrieval layer: you choose the provider, process its result payload before inference, and reuse it across model vendors.

## Five production trade-offs to evaluate

Evaluate these five concerns against your application’s requirements.

**Source control.** OpenAI supports domain allowlists and blocklists. Compare those controls with Parallel’s source policy and the specific source constraints your workload needs.

**Freshness guarantees.** OpenAI provides a live/cache-only switch; live access is not a guarantee of every source’s age. Check whether either provider’s freshness controls satisfy your workload.

**Token efficiency.** OpenAI exposes search_context_size and a returned-token budget control for supported reasoning models. A custom retrieval tool lets you inspect and transform the returned payload before passing it into your chosen model.

**Retrieval transparency.** Inspect the consulted URL list and available search actions when debugging. Queries are usually, but not always, returned; this is not a complete explanation of source ranking. A dedicated API also lets you log the retrieval payload independently.

**Volume pricing.** At 10,000 queries per day, you spend $100 a day on built-in web search call fees alone, before the search content tokens. Developers have raised [pricing concerns](https://community.openai.com/t/open-ai-charging-too-much-for-web-searches/1141592) in the OpenAI community forums. At scale, your search costs can exceed model inference costs.

## The custom backend option: how function tools work in the Responses API

In the Responses API, custom function tools and built-in tools behave the same way in the agentic loop. When you define a function tool, the model calls it the same way it calls `web_search`. You execute the search against your chosen backend and return the results.

The function tool definition for a custom search looks like this:

```python
search_tool = {
    "type": "function",
    "name": "web_search",
    "description": "Search the web for current information on a topic.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query or objective"
            }
        },
        "required": ["query"]
    }
}
```

Your code receives the model's query, calls your search API, and returns structured results. The model processes those results and either calls another tool or generates its final response.

This pattern gives you full control over the retrieval layer without touching the reasoning layer. You choose the search index, the output format, the source filters, and the cost structure. Your agent's prompt, logic, and orchestration code stay the same.

Remove `web_search` from the tools array, add your function tool definition, and write a handler that routes the model's search calls to your API.

## Comparing web search backends for Responses API agents

The table compares six [web search APIs](https://parallel.ai/articles/what-is-a-web-search-api) you can use with Responses API agents, each with a different set of trade-offs.

| Provider | Best for | Key strengths | Key consideration |
| --- | --- | --- | --- |
| OpenAI built-in web_search | Agents using OpenAI-hosted retrieval | Native integration, domain filters, source inspection | OpenAI-hosted retrieval; tool-call and content-token costs; less direct payload control |
| Parallel Search API | Production agents needing accuracy and control | Published benchmark results, from $1/1K requests (Turbo), token-dense excerpts, source filtering | Requires function tool integration |
| Tavily | Agent framework integrations | Pre-built connectors for LangChain, CrewAI | Accuracy trails on multi-hop benchmarks |
| Exa | Semantic and neural search use cases | Embedding-based retrieval, content filtering | Higher latency on complex queries |
| Brave Search API | Independent index, privacy-focused apps | Own index (not Google/Bing), competitive pricing | Results optimized for humans, not LLMs |
| SerpAPI | Google SERP scraping and structured extraction | Access to Google results, knowledge panels | Wrapper over Google, no LLM optimization |

**OpenAI built-in web_search** offers native integration, source controls, and inspection of available search activity. Evaluate a dedicated backend when you need model-independent retrieval, more direct result shaping, or different workload economics.

**Parallel Search API** runs on a proprietary web-scale index built for AI agents. It accepts natural-language objectives instead of keyword queries, returns token-dense compressed excerpts optimized for LLM context windows, and supports domain-level source inclusion and exclusion. Parallel publishes [benchmark results](https://parallel.ai/benchmarks) for each Search mode on SimpleQA Verified, BrowseComp, and WideSearch, against Exa, Tavily, and Perplexity, with accuracy and cost side by side. OpenAI's built-in tool isn't in those runs. We cover more options in our [Bing API alternatives](https://parallel.ai/articles/bing-api-comparison) comparison.

**Tavily** offers strong framework integrations and a developer-friendly API. Teams using LangChain or CrewAI often start here for the pre-built connectors.

**Exa** takes an embedding-based approach to search, which works well for semantic similarity use cases. It also supports content filtering.

**Brave Search API** provides an independent search index. Teams building privacy-focused applications value Brave's infrastructure independence from Google and Bing.

**SerpAPI** wraps Google Search results into structured JSON. Teams that need Google-specific features (knowledge panels, shopping results, local packs) use it as an extraction layer, though Google doesn't optimize those results for LLM consumption.

## Integrating Parallel Search API with the Responses API

Wiring Parallel's Search API into the Responses API takes four steps and under 30 lines of code.

**1. Get your API key.** Sign up at [platform.parallel.ai](https://platform.parallel.ai) and grab your key from the dashboard.

**2. Define the search function tool.** Use the same pattern from the function tools section, with a description that tells the model when to invoke it.

**3. Handle the tool call.** Each time the model calls your search function, pass the objective to Parallel's Search API.

**4. Return results to the model.** Format the search results as a string and pass them back through the Responses API.

A complete working example:

```python
import json
import requests
from openai import OpenAI

client = OpenAI()
PARALLEL_API_KEY = "your-parallel-api-key"

search_tool = {
    "type": "function",
    "name": "web_search",
    "description": "Search the web for current information.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Search objective"}
        },
        "required": ["query"]
    }
}

def parallel_search(query):
    resp = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": PARALLEL_API_KEY},
        json={"objective": query, "search_queries": [query],
              "advanced_settings": {"max_results": 5}}
    )
    results = resp.json().get("results", [])
    return "\n\n".join(
        f"[{r['title']}]({r['url']})\n" + "\n".join(r["excerpts"]) for r in results
    )

response = client.responses.create(
    model="gpt-6-sol",
    tools=[search_tool],
    input="What is Parallel's Search API and how does it compare to Bing?"
)

# Handle tool calls in the agentic loop
for item in response.output:
    if item.type == "function_call" and item.name == "web_search":
        search_results = parallel_search(json.loads(item.arguments)["query"])
        response = client.responses.create(
            model="gpt-6-sol",
            tools=[search_tool],
            input=[
                {"type": "function_call_output",
                 "call_id": item.call_id,
                 "output": search_results}
            ],
            previous_response_id=response.id
        )

print(response.output_text)
```

Parallel's Search API returns token-dense, compressed excerpts instead of raw web pages, so the model spends its context window on relevant facts rather than navigation menus and cookie banners. For tips on maximizing accuracy, see our guide on [best practices for web search accuracy](https://parallel.ai/articles/openclaw-best-practices-web-search).

Parallel's Search API also takes a natural-language objective. Instead of generating keyword queries, the model passes a full search objective, and Parallel's retrieval system returns results chosen for that intent.

## Choosing the right path for your use case

**Start with built-in web_search if** you want native integration and its documented controls meet your workload. Validate quality and total task cost before scaling.

**Switch to a custom backend if** you need model-independent retrieval, direct result shaping before inference, or a different cost/quality trade-off. Our [migration guide](https://parallel.ai/articles/openai-to-parallel-search-api) walks through the switch from OpenAI's web search to Parallel step by step.

**Run both.** You can include built-in web_search and a custom function tool in the same tools array. The model routes queries based on your system instructions. Use built-in search for simple lookups and route complex, high-stakes queries to a dedicated backend.

Swap the tool definition, add a function handler, and leave your system prompt, agent logic, and response handling code unchanged.

At high query volumes, the price gap is large. Built-in web search at $10 per 1,000 calls, plus search content tokens at your model's input rate, costs twice as much per call as Parallel's [Search API](https://parallel.ai/products/search) at $5 per 1,000 requests for Basic and Advanced, and 10 times as much as Turbo mode at $1 per 1,000. On call fees alone, a team running 50,000 agent queries daily saves about $7,500 monthly, or $13,500 with Turbo.

## Frequently asked questions

**Can I use both OpenAI's built-in web search and a custom search tool in the same agent?** Yes. Include both in the tools array, and use your system instructions to route specific query types to each tool.

**How much does OpenAI's web search cost compared to Parallel?** OpenAI charges $10 per 1,000 web search tool calls, plus search content tokens at the model's input rate; Parallel's Search API costs from $1 per 1,000 requests with Turbo mode and $5 per 1,000 for Basic and Advanced, a 2 to 10x difference on call fees alone that compounds at scale.

**Does switching search backends require changing my agent's prompts or logic?** No. You swap the tool definition and add a handler function. Your system prompt and agent logic stay the same.

**What accuracy benchmarks should I look at when evaluating search APIs?** Focus on SimpleQA Verified, [BrowseComp](https://openai.com/index/browsecomp/), and WideSearch, which measure the scenarios agents encounter: fact lookup, multi-hop research, and gathering many facts across sources. FRAMES and HLE add multi-source reasoning and expert-level questions.

## Key takeaways

- Responses API web_search offers source and live-access controls; dedicated retrieval gives your application more direct ownership of result handling.
- Custom search backends via function tools let you control retrieval quality, reduce cost, and optimize token usage at scale.
- Choose using workload quality, total task cost, model flexibility, and the retrieval controls your application needs.
- Parallel's Search API integrates with the Responses API in under 30 lines of Python, at 2 to 10x lower call fees than the built-in option.
- You can start with OpenAI's built-in search and swap to a custom backend later without changing your agent logic.

Give your Responses API agent a search backend built for production. [Start Building](https://docs.parallel.ai/home)

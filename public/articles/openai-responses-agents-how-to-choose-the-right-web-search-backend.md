# OpenAI Responses agents: how to choose the right web search backend

OpenAI's Responses API ships a built-in web search tool that costs one line of config and gives you no control over the index, the sources, the freshness policy, or the output format. This guide covers how the Responses API changes agent development, five production limits of the built-in tool, how custom function tools work, six search backends compared, and a Parallel integration in under 30 lines of Python.

For prototypes, that trade-off is acceptable for most indie devs or low-use apps. For production agents processing thousands of queries a day, you need to make a deliberate choice about which search backend powers your agent's access to live information. We compare six search options below, with working code and a decision framework to help you choose.

## How the Responses API changes agent development

The Responses API replaces both Chat Completions and the Assistants API as OpenAI's primary agent primitive. OpenAI designed it around one core loop: the model calls tools, processes results, and decides whether to call more tools or return a final response. OpenAI detailed this architecture in their [agent-building tools announcement](https://openai.com/index/new-tools-for-building-agents/).

Three built-in tools ship with the API: `web_search_preview`, `file_search`, and `computer_use`. Each one plugs into the agentic loop without any setup on your end. The model decides when to invoke a tool based on the user's query and your system instructions. The [Agents SDK documentation](https://developers.openai.com/api/docs/guides/agents) covers the orchestration layer in detail.

Custom function tools plug into that same loop. You define a function with a name, description, and JSON schema. The model calls it. You execute whatever logic you want and return the result. The model treats your function's output the same way it treats built-in tool output. For teams migrating existing apps, OpenAI published a [migration guide](https://developers.openai.com/api/docs/guides/migrate-to-responses) covering the transition from Chat Completions. A [comprehensive community guide](https://github.com/Dicklesworthstone/guide_to_openai_response_api_and_agents_sdk) also covers the full API surface.

This architecture makes the Responses API a framework, not a product. The model handles reasoning and orchestration. You control the tools that feed it information. For [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) that need live web data, the tool that matters most is web search: the mechanism your agent uses to access current, real-world information. Understanding the [agent harness](https://parallel.ai/articles/what-is-an-agent-harness) pattern helps clarify how tool execution fits into the broader agent lifecycle.

You shape every response your agent produces by choosing the right search backend. Accurate, source-controlled results give your agent a dependable basis for reasoning about current information.

## OpenAI's built-in web search: capabilities and constraints

Enabling built-in web search takes one addition to your tools array:

```python
from openai import OpenAI

client = OpenAI()
response = client.responses.create(
    model="gpt-4.1",
    tools=[{"type": "web_search_preview"}],
    input="What were Nvidia's Q1 2025 earnings?"
)
print(response.output_text)
```

The model now searches the web when it determines a query needs live information. OpenAI returns inline citations with source URLs and search context annotations. [OpenAI's web search documentation](https://developers.openai.com/api/docs/guides/tools-web-search) covers the full configuration surface.

You can configure two parameters. `user_location` adjusts geo-targeting for location-sensitive queries. `search_context_size` controls how much search context the model ingests, with three options: `low`, `medium`, and `high`.

OpenAI locks the index, the source filtering, the freshness policy, and the output format behind its implementation. You have no way to inspect what the model searched for or which results it evaluated before generating a response.

OpenAI charges $25 to $50 per 1,000 web search tool calls, depending on the search context size you select. You pay that on top of your model token costs.

For prototyping and low-volume applications, built-in web search removes friction. You skip the integration work and get a functional agent in minutes. But every production concern (accuracy, cost, source control, debuggability) lives behind a wall you can't see over.

## Five production limits of the built-in tool

Production agents need five capabilities that the built-in tool doesn't provide.

**Source control.** You can't include or exclude specific domains. A customer-facing agent might cite a competitor's marketing page, and you have no mechanism to prevent it.

**Freshness guarantees.** OpenAI doesn't publish how often its search index updates. Agents that monitor financial data or track regulatory changes face real risk when the refresh cadence stays opaque.

**Token efficiency.** OpenAI embeds search results as annotations in the model's output. You can't intercept, parse, or compress them before the model processes them. Raw web pages carry ads, navigation menus, and boilerplate that consume context window space without adding useful information.

**Retrieval transparency.** You can't see what queries the model generated, which results it found, or why it chose specific sources. When your agent produces a wrong answer, you can't tell whether a bad search result or a reasoning error caused the failure.

**Volume pricing.** At 10,000 queries per day, you spend $250 to $500 on built-in web search alone. Developers have raised [pricing concerns](https://community.openai.com/t/open-ai-charging-too-much-for-web-searches/1141592) in the OpenAI community forums. At scale, your search costs can exceed model inference costs.

## The custom backend option: how function tools work in the Responses API

In the Responses API, custom function tools and built-in tools behave the same way in the agentic loop. When you define a function tool, the model calls it the same way it calls `web_search_preview`. You execute the search against your chosen backend and return the results.

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

Remove `web_search_preview` from the tools array, add your function tool definition, and write a handler that routes the model's search calls to your API. Your system prompt and agent logic stay the same.

## Comparing web search backends for Responses API agents

Six [web search APIs](https://parallel.ai/articles/what-is-a-web-search-api) serve the Responses API agent ecosystem. Each targets a different set of trade-offs.

| Provider | Best for | Key strengths | Key consideration |
| --- | --- | --- | --- |
| OpenAI built-in web_search | Prototyping, low-volume agents | Zero setup, native integration | No source control, $25-50/1K calls, opaque index |
| Parallel Search API | Production agents needing accuracy and control | Highest benchmark accuracy, from $1/1K requests (Turbo), token-dense excerpts, source filtering | Requires function tool integration |
| Tavily | Agent framework integrations | Pre-built connectors for LangChain, CrewAI | Accuracy trails on multi-hop benchmarks |
| Exa | Semantic and neural search use cases | Embedding-based retrieval, content filtering | Higher latency on complex queries |
| Brave Search API | Independent index, privacy-focused apps | Own index (not Google/Bing), competitive pricing | Results optimized for humans, not LLMs |
| SerpAPI | Google SERP scraping and structured extraction | Access to Google results, knowledge panels | Wrapper over Google, no LLM optimization |

**OpenAI built-in web_search** works as a starting point. You trade control for convenience. At low volumes, the cost is manageable. At scale, the per-call pricing and lack of source control push teams toward dedicated backends.

**Parallel Search API** runs on a proprietary web-scale index built for AI agents. It accepts natural-language objectives instead of keyword queries, returns token-dense compressed excerpts optimized for LLM context windows, and supports domain-level source inclusion and exclusion. Parallel leads on accuracy across [benchmark results](https://parallel.ai/blog/search-api-benchmark) on HLE, BrowseComp, FRAMES, and SimpleQA, achieving the highest accuracy at the lowest cost per query compared to Exa, Tavily, Perplexity, and OpenAI. We cover more options in our [Bing API alternatives](https://parallel.ai/articles/bing-api-comparison) comparison.

**Tavily** offers strong framework integrations and a developer-friendly API. Teams using LangChain or CrewAI often start here for the pre-built connectors.

**Exa** takes an embedding-based approach to search, which works well for semantic similarity use cases. Content filtering adds flexibility for specific retrieval patterns.

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
    model="gpt-4.1",
    tools=[search_tool],
    input="What is Parallel's Search API and how does it compare to Bing?"
)

# Handle tool calls in the agentic loop
for item in response.output:
    if item.type == "function_call" and item.name == "web_search":
        search_results = parallel_search(json.loads(item.arguments)["query"])
        response = client.responses.create(
            model="gpt-4.1",
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

You see the key advantage in what the model receives. Parallel's Search API returns token-dense, compressed excerpts instead of raw web pages. Each excerpt packs maximum useful information into minimum tokens. The model spends its context window on relevant facts, not navigation menus and cookie banners. For tips on maximizing accuracy, see our guide on [best practices for web search accuracy](https://parallel.ai/articles/openclaw-best-practices-web-search).

Parallel's natural-language objective input changes the retrieval dynamic further. Instead of the model generating keyword queries, it passes a full search objective. Parallel's retrieval system interprets the intent and returns results optimized for that objective.

## Choosing the right path for your use case

**Start with built-in web_search if** you're prototyping, your query volume stays under 100 per day, and search quality isn't a differentiator for your product.

**Switch to a custom backend if** you need source control, accuracy matters for your use case, you process 1,000+ queries daily, or you need to optimize token costs. Our [migration guide](https://parallel.ai/articles/openai-to-parallel-search-api) walks through the switch from OpenAI's web search to Parallel step by step.

**Run both.** You can include built-in web_search and a custom function tool in the same tools array. The model routes queries based on your system instructions. Use built-in search for simple lookups and route complex, high-stakes queries to a dedicated backend.

Swap the tool definition, add a function handler, and leave your system prompt, agent logic, and response handling code unchanged. Most developers complete the transition in under an hour.

At scale, teams running high query volumes find dedicated backends far cheaper. Built-in web search at $25 to $50 per 1,000 calls costs 5 to 10 times more than Parallel's [Search API](https://parallel.ai/products/search) at $5 per 1,000 requests for Basic and Advanced, and 25 to 50 times more than Turbo mode at $1 per 1,000. A team running 50,000 agent queries daily saves $30,000 to $67,500 monthly, or $36,000 to $73,500 with Turbo.

## Frequently asked questions

**Can I use both OpenAI's built-in web search and a custom search tool in the same agent?** Yes. Include both in the tools array, and use your system instructions to route specific query types to each tool.

**How much does OpenAI's web search cost compared to Parallel?** OpenAI charges $25 to $50 per 1,000 web search tool calls; Parallel's Search API costs from $1 per 1,000 requests with Turbo mode and $5 per 1,000 for Basic and Advanced, a 5 to 50x difference that compounds at scale.

**Does switching search backends require changing my agent's prompts or logic?** No. You swap the tool definition and add a handler function. Your system prompt and agent logic stay the same.

**What accuracy benchmarks should I look at when evaluating search APIs?** Focus on HLE, [BrowseComp](https://openai.com/index/browsecomp/), FRAMES, and SimpleQA, which measure retrieval quality in the scenarios agents encounter: multi-hop reasoning, fact verification, and real-time information lookup.

## Key takeaways

- The Responses API's built-in web_search tool works for prototyping but gives you zero control over sources, freshness, or output format in production.
- Custom search backends via function tools let you control retrieval quality, reduce cost, and optimize token usage at scale.
- You choose based on accuracy requirements and cost at volume. Source control tips the scale as query counts grow.
- Parallel's Search API integrates with the Responses API in under 30 lines of Python and delivers higher benchmark accuracy at 5 to 50x lower cost than the built-in option.
- You can start with OpenAI's built-in search and swap to a custom backend later without changing your agent logic.

Give your Responses API agent a search backend built for production. [Start Building](https://docs.parallel.ai/home)

# How to add web search to your LangChain agent

Adding web search to a LangChain agent means wrapping a search API in the Tool interface, then letting tool calling or LangGraph drive the loop instead of the deprecated AgentExecutor. This guide covers why agents need live search, how the Tool interface works, how to compare search APIs on structured output and attribution, a step-by-step build, handling results in a RAG pipeline, and production concerns like caching and token budgets.

## Key takeaways

- LangChain agents need a web search tool to access information beyond the LLM's training data cutoff.
- The Tool interface is the standard abstraction for connecting any search API to your agent.
- Search API choice matters: compare on structured output, attribution, freshness, and cost.
- Modern LangChain patterns (tool calling, LangGraph) replace the deprecated AgentExecutor.
- Production deployments need caching, error handling, and token budget management.

## Why LangChain agents need web search

Large language models (LLMs) have a knowledge cutoff. They can tell you about events from their training data, but they know nothing about what happened last week. Ask about a recent security vulnerability, live pricing, or the current version of a library, and you'll get stale answers or hallucinated ones.

[Web search APIs](https://parallel.ai/articles/what-is-a-web-search-api) solve this by connecting your agent to real-time information during inference. The agent decides when it needs fresh data, issues a search query, receives results, and synthesizes them into its response.

This pattern shows up across production use cases. [Research agents](https://parallel.ai/articles/what-is-deep-research) pull multiple sources to answer complex questions. RAG pipelines augment retrieval with live search when the vector store doesn't have current data. Support bots reference up-to-date documentation instead of answering from a frozen snapshot.

LangChain's Tool abstraction handles the integration. A Tool has three components: a name the agent references, a description the LLM reads to decide when to call it, and a callable function that executes the search. You define the tool once, bind it to your agent, and the LLM decides when to call it.

If you're building production [AI agents](https://parallel.ai/articles/what-is-an-ai-agent), the search API behind your tool determines the quality of your agent's real-time knowledge, and picking it deserves the same attention you give to choosing your LLM provider.

## How the LangChain tool interface works

Tools in LangChain wrap external functions behind a standard interface ([LangChain's Tool interface](https://docs.langchain.com/oss/python/langchain/tools)). Each tool exposes a name, a description, an optional argument schema, and a `_run` method that executes the underlying logic. The agent's LLM reads tool descriptions at inference time and decides which tools to call based on the user's query.

A user submits a query. The LLM reasons about what information it needs. It selects one or more tools, specifies arguments, and returns a structured tool call. LangChain executes the tool, passes the result back to the LLM, and the LLM synthesizes a final response. For multi-step queries, this loop repeats until the agent has enough context to answer.

Tool descriptions carry a lot of weight: a vague one leads to missed tool calls or incorrect usage. Write descriptions that tell the LLM what the tool does, what inputs it accepts, and when to use it.

The simplest way to create a tool is the `@tool` decorator:

```python
from langchain_core.tools import tool

@tool
def web_search(query: str) -> str:
    """Search the web for current information about a topic."""
    # Your search API call here
    return search_results
```

This code defines a LangChain tool that the agent can invoke by name. The decorator converts the function into a Tool object, using the docstring as the description.

The LangChain team deprecated `initialize_agent` and `AgentExecutor` in LangChain 0.2+. Since LangChain 1.0, the current approach uses `create_agent` (which replaces LangGraph's deprecated create_react_agent) for simple agents or [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) for stateful, multi-step workflows. The tool definitions work with any agent framework.

## Choosing a search API for your agent

Different search APIs optimize for different things, and the right choice depends on whether you're prototyping or deploying to production.

Evaluate candidates across these criteria: structured output (parsed titles, excerpts, and source URLs vs. raw HTML you need to parse yourself), attribution (source URLs that trace back to the original content), freshness (how current the index is), rate limits, pricing, and [LangChain tool integration](https://docs.langchain.com/oss/python/integrations/tools) quality.

**Tavily** is the most common choice in LangChain tutorials. It offers a clean API with structured results and a free tier of 1,000 requests per month. For prototyping and learning, Tavily gets you running fast. The trade-off is limited customization and fewer controls for production workloads.

**SerpAPI** wraps Google Search results into a structured JSON response. You get the same results a human would see on Google, including featured snippets and knowledge panels. Paid plans start at $25/month for 1,000 searches, and 5,000 searches cost $75/month. The output is comprehensive but verbose, and you'll write parsing logic to extract the pieces your agent needs.

**Google Custom Search** gave direct access to Google's index through a programmable search engine, with 100 free queries per day, then $5 per 1,000 queries. Google has closed the JSON API to new customers and will cut off existing ones on January 1, 2027, and new engines can't search the whole web, so it isn't an option for a new agent.

**Brave Search API** serves privacy-conscious deployments. It maintains an independent index (not reselling Google results), offers structured JSON responses, and provides a free tier of 2,000 queries per month. Results are clean but the index is smaller than Google's.

**[Parallel Search API](https://docs.parallel.ai/search-api/search-quickstart)** is built for AI agents from the ground up. Instead of keyword queries, you describe a [search objective in natural language](https://docs.parallel.ai/search/search), and the API returns ranked URLs with compressed, token-dense excerpts optimized for LLM context windows. Pricing starts from $1 per 1,000 requests with Turbo mode (~200ms median latency), or $5 per 1,000 for Basic and Advanced (10 results included), with SOC 2 Type 2 certification and zero data retention. Parallel maintains its own proprietary web-scale index.

When SerpAPI returns a Google results page as JSON, you still need to extract, clean, and truncate the content before your agent can use it. APIs like Parallel and Tavily return pre-parsed titles, excerpts, and source URLs that you can pass to the LLM without additional processing. For production systems, that parsing step is a source of bugs and maintenance overhead.

Attribution is the other dimension most developers overlook during prototyping. If your agent generates a response citing a statistic, users will ask "where did that come from?" Search APIs that return source URLs alongside excerpts let you propagate citations through your pipeline. Parallel's excerpts include source attribution by default; with other APIs you may need additional extraction logic.

Match the API to your stage. Tavily gets a prototype running in minutes, SerpAPI makes sense if your use case needs Google's results specifically, and Parallel fits production LLM pipelines that need structured, attributed data.

## Building a web search agent step by step

This walkthrough builds a functional LangChain agent with web search using Parallel's official integration. The same architectural pattern applies regardless of which search API you choose.

**Prerequisites:**

1. Python 3.9 or later
2. Install dependencies:

```sh
pip install langchain langchain-openai langchain-parallel
```

1. Set your API keys:

```sh
export OPENAI_API_KEY="your-openai-key"
export PARALLEL_API_KEY="your-parallel-key"
```

**Step 1: Configure the search tool.**

The `langchain-parallel` package provides `ParallelWebSearchTool`, a LangChain-compatible tool that wraps Parallel's Search API.

```python
from langchain_parallel import ParallelWebSearchTool

search_tool = ParallelWebSearchTool()
```

You initialize the search tool with default settings. It reads the API key from the `PARALLEL_API_KEY` environment variable and returns up to 10 results per query with compressed excerpts.

**Step 2: Create the agent.**

Bind the search tool to a ReAct agent powered by an OpenAI model with tool-calling support.

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.agents import create_tool_calling_agent, AgentExecutor

llm = ChatOpenAI(model="gpt-6-sol", reasoning_effort="none")  # GPT-6 tool calling over Chat Completions needs reasoning_effort="none"
tools = [search_tool]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a research assistant. Use the search tool to find current information."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

You create a tool-calling agent using LangChain's [recommended pattern](https://docs.langchain.com/oss/python/langchain/agents). The `verbose=True` flag prints the agent's reasoning steps so you can see when and why it calls the search tool.

**Step 3: Run a query.**

```python
result = agent_executor.invoke({
    "input": "What are the latest LangChain 0.3 features?"
})
print(result["output"])
```

When you run this code, the agent recognizes the need for current information, calls the search tool with a relevant query, receives structured results with excerpts and source URLs, and synthesizes a response grounded in live web data. This follows the [ReAct pattern](https://arxiv.org/abs/2210.03629): reason, act, observe, repeat.

**Step 4: Inspect the output.**

With `verbose=True`, the console shows the agent's full reasoning chain: which tool it selected, the arguments it passed, the search results it received, and how it synthesized the final answer. Use this output to debug and validate agent behavior.

**Swapping providers:** If you want to test a different search API, or [switch from another provider](https://parallel.ai/articles/openai-to-parallel-search-api), you only need to change the tool definition. Replace `ParallelWebSearchTool()` with any other LangChain-compatible search tool. The agent, prompt, and execution logic stay identical.

## Handling search results in a RAG pipeline

The agent pattern shown above works well when the LLM decides whether to search. But some applications call for a different approach: search on every query as a retrieval step, feeding results into the LLM's context alongside (or instead of) vector store results.

In a RAG pipeline, you run a search, parse results into LangChain `Document` objects with metadata, and pass them to the LLM as context for generation. The LLM doesn't choose to search; your pipeline architecture makes that decision.

Converting search results to `Document` objects takes a few lines:

```python
from langchain_core.documents import Document

def search_to_documents(search_results):
    docs = []
    for result in search_results["results"]:
        doc = Document(
            page_content="\n".join(result.get("excerpts", [])),
            metadata={"source": result["url"], "title": result.get("title", "")}
        )
        docs.append(doc)
    return docs
```

You convert Parallel's structured search results into LangChain Document objects, preserving source URLs and titles in metadata for citation propagation.

Token budget is the main concern here. A single search returning 10 results with full excerpts can consume thousands of tokens. Before passing documents to the LLM, truncate or summarize content to fit your context window. Filter out low-relevance results. Set `max_results` on your search call to control the upper bound.

Citation propagation is the other consideration. When you store source URLs in document metadata, your generation chain can reference them in the final output. This gives users verifiable references instead of ungrounded claims. Parallel's search results arrive with source URLs, titles, and publish dates attached to every excerpt, so you don't need to extract or reconstruct attribution after the fact.

## Production considerations

**Caching.** Identical queries hitting your search API on every request waste money and add latency. Implement a cache layer that stores results by query string with a time-to-live (TTL) appropriate for your freshness requirements. LangChain provides built-in caching via `SQLiteCache` or `InMemoryCache`. For multi-instance deployments, use Redis.

**Error handling.** Search APIs fail, networks time out, and rate limits trigger. Wrap every tool call in retry logic with exponential backoff. LangChain's `ToolException` class lets you surface errors to the agent so it can attempt a different approach rather than crashing the entire chain.

**Rate limits and cost.** Each API has different constraints. Tavily's free tier caps at 1,000 requests per month, which is fine for development but runs out fast in production. SerpAPI pricing varies by plan, starting at $25/month. Parallel charges $0.001 per request with Turbo mode ($0.005 for Basic and Advanced) with no hard rate cap (600 requests/minute soft limit), and offers a free tier of $5 in credits each month (enough for up to 5,000 Turbo requests). Map your expected query volume to each provider's pricing model before committing.

**Token optimization.** Not every search result deserves space in your context window. Filter results by relevance score when available. Truncate long excerpts. Set `max_results` to the minimum number that gives your agent enough context. If you're using Parallel, the API returns compressed, information-dense excerpts by default, which reduces the token budget consumed per search.

**Monitoring.** Log every tool call with its arguments, response time, result count, and any errors. Track the ratio of queries that trigger search versus queries the LLM answers from its own knowledge. Monitor latency at the p50 and p99 levels. These metrics tell you when your agent's search behavior drifts or when an API is degrading.

**Fallback strategies.** If your primary search API is down, your agent should still give useful responses. Configure a secondary search tool or instruct the agent (via system prompt) to inform the user when real-time data is unavailable rather than hallucinating an answer.

## Frequently asked questions

### Does LangChain have built-in web search?

No. LangChain provides the Tool interface for connecting search APIs, but it doesn't include a search engine. You bring your own API key and choose which provider to integrate.

### Which search API is best for LangChain?

It depends on your stage and requirements. Tavily is the fastest path to a working prototype. Parallel Search API is purpose-built for production AI agents, with structured excerpts, source attribution, and a proprietary index optimized for LLM consumption.

### What is the difference between web search and web scraping in LangChain?

Web search returns a list of relevant results for a query, including titles, URLs, and excerpts. Web scraping extracts the full content of a specific URL. Use search to find pages; use scraping (or an [extraction API](https://docs.parallel.ai/extract/extract)) to pull complete content from pages you've identified.

### Can I use LangChain web search with open-source LLMs?

Yes. Any LLM that supports tool calling (function calling) works with LangChain's tool interface. Models like Llama 3, Mistral, and Command R support tool calling and can use web search tools.

### How do I handle rate limits on search APIs?

Implement retry logic with exponential backoff for rate limit errors, cache results for repeated queries, and set appropriate `max_results` values to reduce unnecessary API calls.

[Start Building](https://docs.parallel.ai/home)

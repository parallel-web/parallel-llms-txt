# How to build a conversational AI assistant with real-time web access

A conversational assistant that can answer questions about this morning needs live retrieval wired into the conversation loop, not a larger model. This guide covers the real-time data problem, what such an assistant requires, three approaches compared (static RAG, direct scraping, and external search APIs), the architecture and code for a working build, token efficiency, and production security.

## Key takeaways

- Conversational AI assistants need live web data to answer questions about current events, prices, news, and evolving topics.
- Static RAG pipelines fail when the knowledge cutoff matters: external search APIs provide real-time grounding.
- The Search API pattern (query in, ranked excerpts out) integrates cleanly with tool-calling frameworks like OpenAI [function calling](https://platform.openai.com/docs/guides/function-calling).
- **Token-dense excerpts** outperform raw HTML by fitting more relevant context into the LLM's context window.
- SOC 2 Type 2 certification and zero data retention address enterprise security requirements for production deployments.

## The real-time data problem

Your users ask about yesterday's earnings call, today's stock price, and the latest regulatory filing, and your LLM knows nothing about any of it.

Every large language model ships with a [knowledge cutoff](https://otterly.ai/blog/knowledge-cutoff/). Training data ends months before a model is deployed, whether it comes from OpenAI, Anthropic, or Google. The model can reason well about what it knows, but it has no record of what happened last week.

A user asks your assistant about a company's Q4 results. The model will either [hallucinate a plausible answer](https://sqmagazine.co.uk/llm-hallucination-statistics/) or refuse entirely. A [172-billion-token study](https://arxiv.org/html/2603.08274v1) confirmed that outdated training data directly increases fabrication rates, and [hallucination rates vary widely across models](https://github.com/vectara/hallucination-leaderboard).

Users expect an AI assistant to access current information. When they ask "What is Bitcoin trading at?" they want a number rather than an apology about knowledge cutoffs.

The usual workarounds fall short. Fine-tuning on recent data takes weeks, and the data ages immediately. Prompting the model to disclaim uncertainty doesn't give users the answers they came for. What's missing is a connection between the LLM's reasoning and the live web.

## What a conversational AI assistant needs

A working _conversational AI assistant_ has five components.

First, you need an LLM for reasoning. The model interprets user intent, synthesizes information, and generates coherent responses.

Second, you maintain a context window for conversation history. The assistant must track what the user said three turns ago and reference it appropriately.

Third, you connect a retrieval system for external knowledge. This system surfaces relevant information the model cannot access from its training data. An [AI agent](https://parallel.ai/articles/what-is-an-ai-agent) architecture provides a useful mental model for how these components interact.

Fourth, you implement [tool-calling capability](https://parallel.ai/articles/what-is-mcp). The LLM must decide when to search, formulate the right query, and incorporate results into its response.

Fifth, you format responses appropriately. Citations need URLs. Lists need structure.

Of the five, retrieval decides whether your assistant can answer questions about the real world.

## Three approaches to real-time data access

### Static RAG with periodic indexing

The most common pattern embeds your documents into a vector database and retrieves relevant chunks at query time. You convert your knowledge base into embeddings, store them in Pinecone or Chroma, and fetch the nearest neighbors when users ask questions.

This approach works well for stable content. Internal documentation, product manuals, and policy documents change infrequently enough that weekly or daily indexing keeps the system reasonably fresh.

Freshness breaks down when your content changes faster than your indexing cycle: stock prices shift by the second, news breaks hourly, and regulatory filings appear without warning. A static index cannot capture information that does not exist at indexing time.

You also carry infrastructure cost. Vector databases need hosting. Embedding pipelines need compute. The overhead scales with your corpus size.

**Best for:** internal documentation, product knowledge bases, and any corpus where staleness measured in days or weeks is acceptable.

### Direct web scraping

An alternative approach crawls web pages on demand. When a user asks about Apple's stock price, you fetch finance.yahoo.com, parse the HTML, and extract the number. Building your own [web crawler](https://parallel.ai/articles/what-is-a-web-crawler) for this purpose introduces significant complexity.

Latency is the first obstacle. A single page fetch takes two to ten seconds, JavaScript-rendered content requires headless browsers, and complex pages need multiple requests.

Reliability is the second. Websites deploy CAPTCHAs, rate limits, and bot detection. A scraper that works today fails tomorrow when the target site updates its defenses.

Token efficiency is the third. A typical web page contains navigation menus, advertisements, footers, and scripts. The actual content comprises perhaps 10% of the raw HTML, and the rest burns context window budget.

### External search APIs

A [search API](https://parallel.ai/articles/what-is-a-web-search-api) accepts a query and returns ranked URLs with token-dense excerpts. The pattern inverts the scraping model: instead of you maintaining crawling infrastructure, a specialized service continuously indexes the web and serves pre-processed results.

Latency drops: pre-indexed content returns in a few hundred milliseconds to a few seconds, because you skip the crawling, rendering, and parsing steps entirely.

Token use drops too, since you receive compressed excerpts instead of raw pages: the relevant paragraphs rather than the entire document.

Reliability shifts from your infrastructure to the API provider. They handle CAPTCHAs, rate limits, and site-specific parsing. You make a single API call.

Freshness depends on the provider's indexing velocity. Parallel maintains a web-scale index with millions of pages added daily, continuously updated to capture recent content.

We built the Search API specifically for this use case. You describe your search objective in natural language, and we return URLs ranked by relevance along with dense excerpts optimized for LLM consumption. **Declarative ****[semantic search](https://parallel.ai/articles/what-is-semantic-search)** means you state what you need and the API works out how to find it.

## Building the assistant: architecture and code

### Architecture overview

The flow moves in one direction: user query enters an orchestration layer that decides whether web search would help, calls the Search API if needed, passes the results to the LLM for synthesis, and returns a response with source citations.

A question like "What is the capital of France?" needs no search. A question like "What did Tesla announce yesterday?" requires fresh data. The orchestration layer has to tell these cases apart and route accordingly.

### Setting up the search tool

OpenAI's [function calling](https://platform.openai.com/docs/guides/function-calling) provides a clean interface for tool use. You define a schema describing what the tool does, and the model decides when to invoke it.

Here we define a search tool and implement the function that calls the Parallel Search API:

```python
import openai
import requests

PARALLEL_API_KEY = "your-parallel-api-key"

# Define the search tool for the LLM
search_tool = {
    "type": "function",
    "function": {
        "name": "web_search",
        "description": "Search the web for current information",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                }
            },
            "required": ["query"]
        }
    }
}

def search_web(query: str) -> str:
    response = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": PARALLEL_API_KEY},
        json={"query": query, "max_results": 5}
    )
    results = response.json()["results"]
    return "\n\n".join(
        f"Source: {r['url']}\n{r['excerpt']}"
        for r in results
    )
```

The tool definition tells the LLM what the function does and what parameters it accepts. The implementation makes a POST request to the Search API with your query and returns formatted results.

The `x-api-key` header authenticates your request. The `max_results` parameter controls how many results you receive. Each result includes a URL and a token-dense excerpt containing the most relevant content from that page.

### Orchestrating the conversation flow

The orchestration loop handles the back-and-forth between user, LLM, and tools. When the model decides to search, you execute that search and feed the results back for final synthesis. For a complete walkthrough, see our guide on [building a search agent](https://parallel.ai/blog/cookbook-search-agent).

```python
client = openai.OpenAI()

def chat(messages: list) -> str:
    response = client.chat.completions.create(
        model="gpt-6-sol",
        reasoning_effort="none",  # required for tool calling on GPT-6 over Chat Completions
        messages=messages,
        tools=[search_tool]
    )

    message = response.choices[0].message

    # Handle tool calls
    if message.tool_calls:
        messages.append(message)
        for tool_call in message.tool_calls:
            result = search_web(tool_call.function.arguments)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result
            })
        # Generate final response with search context
        response = client.chat.completions.create(
            model="gpt-6-sol",
            messages=messages
        )
        return response.choices[0].message.content

    return message.content
```

The `messages` list maintains conversation history. Each turn appends the user's input, any tool calls, tool results, and the assistant's response. This history enables multi-turn conversations where the assistant can reference earlier exchanges.

When the LLM returns a tool call, you detect it via `message.tool_calls`, execute the corresponding function, and append the results to the message history. The second LLM call synthesizes those results into a final response.

The model sees the search results as context and can cite sources, compare information across results, and acknowledge when results conflict or provide incomplete answers.

### Optimizing for token efficiency

Every token costs money and consumes context window space. A typical LLM context window holds 128,000 tokens. A typical web page might contain 50,000 tokens of raw HTML. You cannot fit many pages before exhausting your budget.

**Token-dense excerpts** solve this problem by compressing each page to its most relevant content. Instead of 50,000 tokens of HTML, you receive 500 tokens of focused text. You fit 100x more sources in the same context window.

We recommend limiting results to three to five per query. More results provide more coverage but consume more tokens and can overwhelm the model with information. Start with five results and adjust based on your specific use case.

Balance freshness against latency by using the Search API's freshness controls. For time-sensitive queries, you can trigger live crawls for the most current data. For evergreen topics, cached results return faster.

We optimize Parallel's excerpts for the LLM's next reasoning step rather than for human readability, so each token carries more useful context than raw scraped HTML.

## Security and data quality for production

We hold SOC 2 Type 2 certification. An independent auditor has verified our security controls over an extended observation period. Your compliance team can request the report.

We enforce zero data retention. Your queries and their results do not persist in our systems after the response completes. We do not train on customer data.

**Source control** gives you domain-level filtering. Include only trusted domains for compliance-sensitive applications. Exclude competitors or unreliable sources.

Build in error handling for production reliability. The search might fail due to network issues, rate limits, or transient errors. Your assistant should handle these gracefully:

```python
try:
    results = search_web(query)
except Exception:
    results = "Search unavailable. Answering from training data."
```

This fallback pattern keeps your assistant responsive even when the search layer encounters problems. Users receive an answer with appropriate caveats rather than an error message.

## Frequently asked questions

**How does a conversational AI assistant differ from a chatbot?**

A chatbot follows scripted flows or pattern matching. A conversational AI assistant uses LLMs for open-ended reasoning and can access external data to answer questions beyond its training data.

**Can I use multiple search APIs together?**

You can compose multiple data sources by defining separate tools for each API. Parallel's suite (Search, Extract, Task) covers different retrieval patterns you can wire into a single assistant. For complex multi-source workflows, explore [deep research](https://parallel.ai/articles/what-is-deep-research) capabilities.

**How fresh is the data from a search API?**

Our index adds millions of pages daily and supports freshness controls to trigger live crawls for time-sensitive queries.

**What latency should I expect?**

The Search API returns results in about 200ms on Turbo up to about 3 seconds on Advanced, depending on the mode, adding minimal delay compared to the LLM's inference time.

**How do I handle search API errors gracefully?**

Implement fallback logic: if the search call fails, your assistant can answer from training data while noting that the information may not reflect the latest changes.

## Start building with real-time web access

You now have the architecture and code to connect your conversational AI assistant to live web data.

Get your API key and start building today.

[Start Building](https://docs.parallel.ai/home)

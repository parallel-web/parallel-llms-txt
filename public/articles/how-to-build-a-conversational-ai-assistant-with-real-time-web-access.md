Human Machine

# \# How to build a conversational AI assistant with real-time web access

Your users ask questions about yesterday's earnings call. They want today's stock price. They need the latest regulatory filing. And your LLM knows nothing about any of it.

Tags: Guides

Reading time: 10 min

Conversational AI with current info

## \## Key takeaways

* \- Conversational AI assistants need live web data to answer questions about current events, prices, news, and evolving topics.
* \- Static RAG pipelines fail when the knowledge cutoff matters: external search APIs provide real-time grounding.
* \- The Search API pattern (query in, ranked excerpts out) integrates cleanly with tool-calling frameworks like OpenAI [function calling](https://platform.openai.com/docs/guides/function-calling) [[function calling] (https://platform.openai.com/docs/guides/function-calling)](https://platform.openai.com/docs/guides/function-calling) .
* \- **\*\* Token-dense excerpts \*\*** outperform raw HTML by fitting more relevant context into the LLM's context window.
* \- SOC 2 Type 2 certification and zero data retention address enterprise security requirements for production deployments.

## \## The real-time data problem

Your users ask questions about yesterday's earnings call. They want today's stock price. They need the latest regulatory filing. And your LLM knows nothing about any of it.

Every large language model ships with a [knowledge cutoff](https://otterly.ai/blog/knowledge-cutoff/) [[knowledge cutoff] (https://otterly.ai/blog/knowledge-cutoff/)](https://otterly.ai/blog/knowledge-cutoff/) . GPT-4o's training data ends months before deployment. Claude's knowledge has similar boundaries. The model can reason brilliantly about what it knows, but it cannot know what happened last week.

This gap creates real pain. A user asks your assistant about a company's Q4 results. The model either [hallucinate a plausible answer](https://sqmagazine.co.uk/llm-hallucination-statistics/) [[hallucinate a plausible answer] (https://sqmagazine.co.uk/llm-hallucination-statistics/)](https://sqmagazine.co.uk/llm-hallucination-statistics/) or refuses entirely. Neither outcome builds trust. A [172-billion-token study](https://arxiv.org/html/2603.08274v1) [[172-billion-token study] (https://arxiv.org/html/2603.08274v1)](https://arxiv.org/html/2603.08274v1) confirmed that outdated training data directly increases fabrication rates, and [hallucination rates vary widely across models](https://github.com/vectara/hallucination-leaderboard) [[hallucination rates vary widely across models] (https://github.com/vectara/hallucination-leaderboard)](https://github.com/vectara/hallucination-leaderboard) .

The disconnect between static training data and the live web frustrates users in predictable ways. They expect an AI assistant to access current information. When they ask "What is Bitcoin trading at?" they want a number, not an apology about knowledge cutoffs.

Traditional solutions fall short. You can fine-tune on recent data, but that process takes weeks and the data ages immediately. You can prompt the model to disclaim uncertainty, but users came for answers, not disclaimers. You need a bridge between the LLM's reasoning capabilities and the live web.

## \## What a conversational AI assistant needs

A working _\_ conversational AI assistant \__ combines five core components.

First, you need an LLM for reasoning. The model interprets user intent, synthesizes information, and generates coherent responses.

Second, you maintain a context window for conversation history. The assistant must track what the user said three turns ago and reference it appropriately.

Third, you connect a retrieval system for external knowledge. This system surfaces relevant information the model cannot access from its training data. An [AI agent](https://parallel.ai/articles/what-is-an-ai-agent) [[AI agent] (/articles/what-is-an-ai-agent)](/ai/articles/what-is-an-ai-agent) architecture provides a useful mental model for how these components interact.

Fourth, you implement [tool-calling capability](https://parallel.ai/articles/what-is-mcp) [[tool-calling capability] (/articles/what-is-mcp)](/ai/articles/what-is-mcp) . The LLM must decide when to search, formulate the right query, and incorporate results into its response.

Fifth, you format responses appropriately. Citations need URLs. Lists need structure. The output must serve the user's actual need.

The retrieval component determines whether your assistant can answer questions about the real world. Everything else enables reasoning about whatever information that component provides.

## \## Three approaches to real-time data access

### \### Static RAG with periodic indexing

The most common pattern embeds your documents into a vector database and retrieves relevant chunks at query time. You convert your knowledge base into embeddings, store them in Pinecone or Chroma, and fetch the nearest neighbors when users ask questions.

This approach works well for stable content. Internal documentation, product manuals, and policy documents change infrequently enough that weekly or daily indexing keeps the system reasonably fresh.

The freshness problem emerges when your content changes faster than your indexing cycle. Stock prices shift by the second. News breaks hourly. Regulatory filings appear without warning. A static index cannot capture information that does not exist at indexing time.

You also carry infrastructure cost. Vector databases need hosting. Embedding pipelines need compute. The overhead scales with your corpus size.

**\*\* Best for: \*\*** internal documentation, product knowledge bases, and any corpus where staleness measured in days or weeks is acceptable.

### \### Direct web scraping

An alternative approach crawls web pages on demand. When a user asks about Apple's stock price, you fetch finance.yahoo.com, parse the HTML, and extract the number. Building your own [web crawler](https://parallel.ai/articles/what-is-a-web-crawler) [[web crawler] (/articles/what-is-a-web-crawler)](/ai/articles/what-is-a-web-crawler) for this purpose introduces significant complexity.

Latency becomes the first obstacle. A single page fetch takes two to ten seconds. JavaScript-rendered content requires headless browsers. Complex pages need multiple requests. Your user waits while your scraper navigates the modern web's complexity.

Reliability creates the second obstacle. Websites deploy CAPTCHAs, rate limits, and bot detection. A scraper that works today fails tomorrow when the target site updates its defenses.

Token efficiency presents the third obstacle. A typical web page contains navigation menus, advertisements, footers, and scripts. The actual content comprises perhaps 10% of the raw HTML. You burn context window budget on noise.

### \### External search APIs

A [search API](https://parallel.ai/articles/what-is-a-web-search-api) [[search API] (/articles/what-is-a-web-search-api)](/ai/articles/what-is-a-web-search-api) accepts a query and returns ranked URLs with token-dense excerpts. The pattern inverts the scraping model: instead of you maintaining crawling infrastructure, a specialized service continuously indexes the web and serves pre-processed results.

Latency improves dramatically. Pre-indexed content returns in one to three seconds. You skip the crawling, rendering, and parsing steps entirely.

Token efficiency transforms when you receive compressed excerpts instead of raw pages. A search API returns the relevant paragraphs, not the entire document. Your context window fills with signal, not navigation menus.

Reliability shifts from your infrastructure to the API provider. They handle CAPTCHAs, rate limits, and site-specific parsing. You make a single API call.

Freshness depends on the provider's indexing velocity. Parallel maintains a web-scale index with millions of pages added daily, continuously updated to capture recent content.

We built the Search API specifically for this use case. You describe your search objective in natural language, and we return URLs ranked by relevance along with dense excerpts optimized for LLM consumption. **\*\* Declarative [semantic search](https://parallel.ai/articles/what-is-semantic-search) [[semantic search] (/articles/what-is-semantic-search)](/ai/articles/what-is-semantic-search) \*\*** means you state what you need, not how to find it.

## \## Building the assistant: architecture and code

### \### Architecture overview

The flow moves in one direction: user query enters an orchestration layer that decides whether web search would help, calls the Search API if needed, passes the results to the LLM for synthesis, and returns a response with source citations.

The orchestration layer matters. A question like "What is the capital of France?" needs no search. A question like "What did Tesla announce yesterday?" requires fresh data. Your assistant must distinguish between these cases and route accordingly.

### \### Setting up the search tool

OpenAI's [function calling](https://platform.openai.com/docs/guides/function-calling) [[function calling] (https://platform.openai.com/docs/guides/function-calling)](https://platform.openai.com/docs/guides/function-calling) provides a clean interface for tool use. You define a schema describing what the tool does, and the model decides when to invoke it.

Here we define a search tool and implement the function that calls the Parallel Search API:

\### Python

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

30

31

32

33

34

35

import  openai
 import  requests

PARALLEL_API_KEY =  "your-parallel-api-key" # Define the search tool for the LLM 
search_tool = {
     "type" :  "function" ,
     "function" : {
         "name" :  "web_search" ,
         "description" :  "Search the web for current information" ,
         "parameters" : {
             "type" :  "object" ,
             "properties" : {
                 "query" : {
                     "type" :  "string" ,
                     "description" :  "The search query" 
                }
            },
             "required" : [ "query" ]
        }
    }
}

 def search_web ( query:  str ) ->  str :
    response = requests.post(
         "https://api.parallel.ai/v1/search" ,
        headers={ "x-api-key" : PARALLEL_API_KEY},
        json={ "query" : query,  "max_results" :  5 }
    )
    results = response.json()[ "results" ]
     return "\n\n" .join(
         f"Source:  {r[ 'url' ]} \n {r[ 'excerpt' ]} " for  r  in  results
    ) ```  import openai import requests   PARALLEL_API_KEY = "your-parallel-api-key"   # Define the search tool for the LLM search_tool = { "type": "function", "function": { "name": "web_search", "description": "Search the web for current information", "parameters": { "type": "object", "properties": { "query": { "type": "string", "description": "The search query" } }, "required": ["query"] } } }   def search_web(query: str) -> str: response = requests.post( "https://api.parallel.ai/v1/search", headers={"x-api-key": PARALLEL_API_KEY}, json={"query": query, "max_results": 5} ) results = response.json()["results"] return "\n\n".join( f"Source: {r['url']}\n{r['excerpt']}" for r in results ) ```
```

The tool definition tells the LLM what the function does and what parameters it accepts. The implementation makes a POST request to the Search API with your query and returns formatted results.

The ``` x-api-key ``` header authenticates your request. The ``` max_results ``` parameter controls how many results you receive. Each result includes a URL and a token-dense excerpt containing the most relevant content from that page.

### \### Orchestrating the conversation flow

The orchestration loop handles the back-and-forth between user, LLM, and tools. When the model decides to search, you execute that search and feed the results back for final synthesis. For a complete walkthrough, see our guide on [building a search agent](https://parallel.ai/blog/cookbook-search-agent) [[building a search agent] (/blog/cookbook-search-agent)](/ai/blog/cookbook-search-agent) .

\### Python

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

client = openai.OpenAI()

 def chat ( messages:  list ) ->  str :
    response = client.chat.completions.create(
        model= "gpt-4o" ,
        messages=messages,
        tools=[search_tool]
    )

    message = response.choices[ 0 ].message

     # Handle tool calls if  message.tool_calls:
        messages.append(message)
         for  tool_call  in  message.tool_calls:
            result = search_web(tool_call.function.arguments)
            messages.append({
                 "role" :  "tool" ,
                 "tool_call_id" : tool_call. id ,
                 "content" : result
            })
         # Generate final response with search context 
        response = client.chat.completions.create(
            model= "gpt-4o" ,
            messages=messages
        )
         return  response.choices[ 0 ].message.content

     return  message.content ```  client = openai.OpenAI()   def chat(messages: list) -> str: response = client.chat.completions.create( model="gpt-4o", messages=messages, tools=[search_tool] )   message = response.choices[0].message   # Handle tool calls if message.tool_calls: messages.append(message) for tool_call in message.tool_calls: result = search_web(tool_call.function.arguments) messages.append({ "role": "tool", "tool_call_id": tool_call.id, "content": result }) # Generate final response with search context response = client.chat.completions.create( model="gpt-4o", messages=messages ) return response.choices[0].message.content   return message.content ```
```

The ``` messages ``` list maintains conversation history. Each turn appends the user's input, any tool calls, tool results, and the assistant's response. This history enables multi-turn conversations where the assistant can reference earlier exchanges.

When the LLM returns a tool call, you detect it via ``` message.tool_calls ``` , execute the corresponding function, and append the results to the message history. The second LLM call synthesizes those results into a final response.

The model sees the search results as context and can cite sources, compare information across results, and acknowledge when results conflict or provide incomplete answers.

### \### Optimizing for token efficiency

Every token costs money and consumes context window space. A typical LLM context window holds 128,000 tokens. A typical web page might contain 50,000 tokens of raw HTML. You cannot fit many pages before exhausting your budget.

**\*\* Token-dense excerpts \*\*** solve this problem by compressing each page to its most relevant content. Instead of 50,000 tokens of HTML, you receive 500 tokens of focused text. You fit 100x more sources in the same context window.

We recommend limiting results to three to five per query. More results provide more coverage but consume more tokens and can overwhelm the model with information. Start with five results and adjust based on your specific use case.

Balance freshness against latency by using the Search API's freshness controls. For time-sensitive queries, you can trigger live crawls for the most current data. For evergreen topics, cached results return faster.

Parallel's excerpts represent a core differentiator. We optimize every token for the LLM's next reasoning step, not for human readability. The result: more useful context per token than any raw scraping approach.

## \## Security and data quality for production

Enterprise deployments require security guarantees that development prototypes can ignore.

We hold SOC 2 Type 2 certification. An independent auditor has verified our security controls over an extended observation period. Your compliance team can request the report.

We enforce zero data retention. Your queries and their results do not persist in our systems after the response completes. We do not train on customer data. Your competitive research remains yours.

**\*\* Source control \*\*** gives you domain-level filtering. Include only trusted domains for compliance-sensitive applications. Exclude competitors or unreliable sources. You control what enters your assistant's context.

Build in error handling for production reliability. The search might fail due to network issues, rate limits, or transient errors. Your assistant should handle these gracefully:

\### Python

```
1

2

3

4

try :
    results = search_web(query)
 except  Exception:
    results =  "Search unavailable. Answering from training data." ```  try: results = search_web(query) except Exception: results = "Search unavailable. Answering from training data." ```
```

This fallback pattern keeps your assistant responsive even when the search layer encounters problems. Users receive an answer with appropriate caveats rather than an error message.

## \## Frequently asked questions

**\*\* How does a conversational AI assistant differ from a chatbot? \*\***

A chatbot follows scripted flows or pattern matching. A conversational AI assistant uses LLMs for open-ended reasoning and can access external data to answer questions beyond its training data.

**\*\* Can I use multiple search APIs together? \*\***

You can compose multiple data sources by defining separate tools for each API. Parallel's suite (Search, Extract, Task) covers different retrieval patterns you can wire into a single assistant. For complex multi-source workflows, explore [deep research](https://parallel.ai/articles/what-is-deep-research) [[deep research] (/articles/what-is-deep-research)](/ai/articles/what-is-deep-research) capabilities.

**\*\* How fresh is the data from a search API? \*\***

Our index adds millions of pages daily and supports freshness controls to trigger live crawls for time-sensitive queries.

**\*\* What latency should I expect? \*\***

The Search API returns results in one to three seconds, adding minimal delay compared to the LLM's inference time.

**\*\* How do I handle search API errors gracefully? \*\***

Implement fallback logic: if the search call fails, your assistant can answer from training data while noting that the information may not reflect the latest changes.

## \## Start building with real-time web access

You now have the architecture and code to connect your conversational AI assistant to live web data. The Search API bridges the gap between your LLM's reasoning capabilities and the information your users need.

Get your API key and start building today.

[Start Building](https://docs.parallel.ai/home) [[Start Building] (https://docs.parallel.ai/home)](https://docs.parallel.ai/home)

Parallel avatar

By Parallel

May 11, 2026
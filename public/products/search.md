Search API

# The best web search for your AI agent , model, IDE, chatbot, application, workflow

The highest accuracy web search API, built from the ground up for AIs

[Get Started ](https://platform.parallel.ai/)[Get a Demo](https://contact.parallel.ai/)

## Search modes for every job

Control latency and depth to optimize your agents

Each mode is powered by Parallel’s independent Index, returning high-quality ranked excerpts for grounded LLM reasoning.

### Turbo

Lowest latency and cost, for grounding each call.

Latency \~200ms. $1 per 1K requests. Best for voice, chat, and high-volume lookups.

### Fast

High-quality results in under a second.

Latency \~700ms. $1 per 1K requests. Best for interactive assistants and tool-calling loops.

### Basic

Longer excerpts per result, for more context in one call.

Latency \~1s. $5 per 1K requests. Best for agents that reason over longer source passages.

### Advanced

Multi-hop retrieval and compression, for the highest accuracy.

Latency \~3s. $5 per 1K requests. Best for background research and deep reasoning agents.

## Declare semantic objectives, not just keywords

AI tells Parallel Search exactly what it's looking for

## Get back URLs ranked for token relevancy 

Parallel surfaces the most information-dense pages for the agent's next action 

## Reason on compressed token efficient excerpts

Each URL is distilled into the highest-value tokens for optimal context windows

## We optimize every web search token in the context window

This means agent responses are more accurate and cost less

[Search Playground](https://platform.parallel.ai/)

## SimpleQA Verified (Search modes vs Exa/Tavily, Sep 2026)

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Parallel Fast       | 2          | 94           |
| Parallel | Parallel Turbo      | 2          | 91           |
| Parallel | Parallel Advanced   | 28.3       | 97           |
| Parallel | Parallel Basic      | 45         | 97           |
| Others   | Exa Auto (low-cost) | 7.9        | 91           |
| Others   | Tavily (low-cost)   | 17.4       | 94           |
| Others   | Exa Auto (frontier) | 35.7       | 91           |
| Others   | Tavily (frontier)   | 61.3       | 92           |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[SimpleQA Verified](https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified), created by Google DeepMind, is a 1,000-question refinement of OpenAI's SimpleQA with corrected labels and balanced topics, covering short, fact-seeking questions. Results are reported on a sample of 100 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

## BrowseComp (Search modes vs Exa/Tavily, Sep 2026)

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Parallel Fast       | 11.8       | 44           |
| Parallel | Parallel Turbo      | 13.2       | 32           |
| Parallel | Parallel Advanced   | 399        | 74           |
| Parallel | Parallel Basic      | 612        | 72           |
| Others   | Exa Auto (low-cost) | 53.4       | 36           |
| Others   | Tavily (low-cost)   | 176        | 32           |
| Others   | Tavily (frontier)   | 935        | 66           |
| Others   | Exa Auto (frontier) | 971        | 70           |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[BrowseComp](https://openai.com/index/browsecomp/), created by OpenAI, contains 1,266 questions that require persistent browsing to locate hard-to-find, entangled information on the web. Results are reported on a sample of 50 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

## WideSearch (Search modes vs Exa/Tavily, Sep 2026)

| Series   | Model               | Cost (CPM) | Score (%) |
| -------- | ------------------- | ---------- | --------- |
| Parallel | Parallel Turbo      | 10.1       | 44        |
| Parallel | Parallel Fast       | 10.5       | 45.5      |
| Parallel | Parallel Advanced   | 692        | 57.6      |
| Parallel | Parallel Basic      | 965        | 55.3      |
| Others   | Exa Auto (low-cost) | 41.2       | 53        |
| Others   | Tavily (low-cost)   | 107        | 47.9      |
| Others   | Exa Auto (frontier) | 1061       | 55.9      |
| Others   | Tavily (frontier)   | 1072       | 55.9      |

CPM: USD per 1000 requests, log scale. Score is item-level correctness averaged across tasks (partial credit). Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[WideSearch](https://arxiv.org/abs/2508.07999), created by ByteDance Seed, contains 200 broad information-seeking tasks that require collecting many verifiable facts from across the web and assembling them into a structured table. Results are reported on a sample of 100 tasks.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

WideSearch is scored with partial credit: each task's score reflects the share of required items collected correctly, averaged across tasks, so it is not directly comparable to the exact-match accuracy on the other benchmarks.

Cost includes LLM token costs and tool call costs, averaged per task and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

# Powered by our own proprietary web scale index 

With innovations in retrieval, crawling, indexing, and reasoning 

* Billions of pages covering the full depth and breadth of the public web
* Millions of pages added daily
* Intelligently recrawled to keep data fresh

# The knowledge of the entire public web

in a single tool call 

Integrated directly, or add our [MCP Server](https://docs.parallel.ai/integrations/mcp/programmatic-use) 

[Search Playground](https://platform.parallel.ai/)[Docs](https://docs.parallel.ai/search/search-quickstart)

## Scale with unmatched price-performance

Get started with up to 80,000 free search requests

$0.001 per request with 10 results + $0.001 per page extracted

[Get Started ](https://platform.parallel.ai/)[Calculate Savings](https://parallel.ai/products/search/calculator)

|                   | Search API                          |
| ----------------- | ----------------------------------- |
| Inputs            | Search objective, Keywords          |
| Outputs           | Ranked URLs, Compressed excerpts    |
| Best for          | Web search tool calls for AI agents |
| Latency           | 200ms - 3s, synchronous             |
| Basis             | —                                   |
| Rate limits       | 600 requests / min                  |
| Security          | SOC2                                |
| Price per request | $0.001 - $0.005 for 10 results      |

## Every control you need 

across any web page

Premium content extraction

Fetch content from PDFs and sites that are JS heavy or have CAPTCHAs

Freshness policies 

Set page age triggers for live crawls, with timeout thresholds to gaurantee latency 

LLM friendly outputs

Choose between dense snippets or full page contents, in markdown LLMs understand

Source control 

Pick which domains are included or excluded from your web search results

# Secure and trusted

Zero data retention

Soc 2 Type 2

No training

## FAQ

+−What is the Parallel Search API?

Parallel Search (API) is the highest accuracy AI search API. It allows developers to build AI apps, agents, and workflows that can search for and retrieve data from the web. It can be integrated into agent workflows for deep research across multiple steps, or for more basic single-hop queries.

+−What is declarative semantic search?

Declarative semantic search lets agents express intent in natural language rather than construct keyword queries. Instead of "Columbus" AND "corporate law" AND "disability", an agent specifies: "Columbus-based corporate law firms specializing in disability care." The Search API interprets meaning and context, not just keywords, making it natural to integrate into agent workflows where you already have rich context from previous reasoning steps.

+−What makes Parallel different from other search providers? 

Parallel is the only Search API built from the ground up for AI agents. This means that agents can specify declarative semantic objectives and Parallel returns URLs and compressed excerpts based on token relevancy. The result is extremely dense web tokens optimized to engineer your agent’s context for better reasoning at the next turn. Agents using Parallel search produce answers with higher accuracy, fewer round trips, and lower cost.

+−Where do search results come from? How fresh are they? 

We maintain a large web index containing billions of pages. Our crawling, retrieval, and ranking systems add and update millions of pages daily to keep the index fresh.

+−Does Parallel have a web crawler? 

Yes, Parallel operates a web crawler to support the quality and coverage of the index. Our crawler respects _\_robots.txt\__ and related crawling directives. [Learn more about Parallel’s crawler here](https://docs.parallel.ai/resources/crawler).

+−What are dense excerpts? 

Dense excerpts are the most query relevant content from a webpage, compressed to be extremely token efficient for an agent. These compressed excerpts reduce noise by engineering an agent’s context window to only have the most relevant tokens to reason on - leading to higher accuracy, fewer round trips, and less token use.

+−What does end-to-end latency mean?

End-to-end latency measures total time from agent input to final output, not single-search latency. Our semantic search architecture and dense snippets reduce the number of searches required to reach quality outputs. Two high-precision searches with Parallel beat three lower-quality attempts elsewhere—saving both time and tokens.

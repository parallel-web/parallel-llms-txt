# Introducing Parallel Search

The highest accuracy web search API engineered for AI.

A second user has arrived on the web: AI. And it needs fundamentally different infrastructure than humans do.

The Parallel Search API, built on our proprietary web index, is now generally available. It's the only web search tool designed from the ground up for AI agents: engineered to deliver the most relevant, token-efficient web data at the lowest cost. The result is more accurate answers, fewer round-trips, and lower costs for every agent.

## Human search and AI search solve different problems

Traditional search engines were built for humans. They rank URLs, assuming someone will click through and navigate to a page. The search engine's job ends at the link. The system optimizes for keywords searches, click-through rates, and page layouts designed for browsing - done in milliseconds and as cheaply as possible.

The first wave of web search APIs used in AI-based search made this human search paradigm programmatically accessible, but failed to solve the underlying problem of how you design search for an AI agent’s needs.

AI search has to solve a different problem: **what tokens should go in an agent's context window to help it complete the task? We’re not ranking URLs for humans to click— we’re optimizing context and tokens for models to reason over.**

This requires a fundamentally different search architecture:

- **Semantic objectives** that capture intent beyond keyword matching, so agents can specify what they need to accomplish rather than guessing at search terms
- **Token-relevance ranking** to prioritize webpages most directly relevant to the objective, not pages optimized for human engagement metrics
- **Information-dense excerpts** compressed and prioritized for reasoning quality, so LLMs have the highest-signal tokens in their context window
- **Single-call resolution** for complex queries that normally require multiple search hops



With this search architecture built from the ground up for AIs, agents get access to the most information-dense web tokens in their context. The result is fewer search calls, higher accuracy, lower cost, and lower end-to-end latency.

## On every benchmark that matters for real-world agent use cases, Parallel wins on accuracy

While most existing search systems are optimized for straightforward question answering, we believe the demand for more complex, multifaceted search will only continue to grow. Users and agents alike will increasingly seek answers that require synthesizing information across multiple sources, reasoning over complex objectives, and navigating harder-to-access content on the web.

To reflect this shift, we evaluated the performance of Parallel’s Search API across a range of benchmarks, from the most challenging multi-hop tasks (e.g., BrowseComp) to simple single-hop queries (e.g., SimpleQA).

### For complex searches, Parallel is the highest accuracy at the lowest cost

Parallel’s performance advantage is dramatic on challenging queries — those that span multiple topics, require deep comprehension of hard to crawl web content, or demand synthesis across scattered sources with multiple reasoning steps. On benchmarks specifically designed to test multi-hop reasoning (HLE, BrowseComp, WebWalker, FRAMES, Batched SimpleQA), Parallel not only achieves higher accuracy but also resolves queries through more efficient reasoning paths.

Traditional search APIs get less done in each pass. Agents perform too many sequential searches - compounding latency, inflating context windows, and increasing token costs with every iteration, and decreasing accuracy. Parallel, by contrast, can resolve more complex queries in a single call, resulting in the agent making fewer sequential calls and achieving higher accuracy, lower total cost, and lower end to end latency.

### HLE Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 82,
      "y": 47
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 138,
      "y": 24
    },
    {
      "label": "tavily", 
      "x": 190, 
      "y": 21
    }, 
    {
      "label": "perplexity", 
      "x": 126, 
      "y": 30
    }, 
    {
      "label": "openai gpt-5",
      "x": 143,
      "y": 45
    }
  ]
```

### BrowseComp Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 156,
      "y": 58
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 233,
      "y": 29
    },
    {
      "label": "tavily", 
      "x": 314, 
      "y": 23
    }, 
    {
      "label": "perplexity", 
      "x": 256, 
      "y": 22
    }, 
    {
      "label": "openai gpt-5",
      "x": 253,
      "y": 53
    }
  ]
```

### WebWalker-Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 42,
      "y": 81
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 107,
      "y": 48
    },
    {
      "label": "tavily", 
      "x": 156, 
      "y": 79
    }, 
    {
      "label": "perplexity", 
      "x": 91, 
      "y": 67
    }, 
    {
      "label": "openai gpt-5",
      "x": 88,
      "y": 73
    }
  ]
```

### FRAMES-Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 42,
      "y": 92
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 81,
      "y": 81
    },
    {
      "label": "tavily", 
      "x": 122, 
      "y": 87
    }, 
    {
      "label": "perplexity", 
      "x": 95, 
      "y": 83
    }, 
    {
      "label": "openai gpt-5",
      "x": 68,
      "y": 90
    }
  ]
```

### Batched SimpleQA - Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 50,
      "y": 90
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 119,
      "y": 71
    },
    {
      "label": "tavily", 
      "x": 227, 
      "y": 59
    }, 
    {
      "label": "perplexity", 
      "x": 100, 
      "y": 74
    }, 
    {
      "label": "openai gpt-5",
      "x": 91,
      "y": 88
    }
  ]
```

Across these multi-hop benchmarks, agents using Parallel achieve state-of-the-art accuracy at ~50% of the cost, compared to workflows built on traditional search APIs.

### On simple searches, Parallel is the lowest cost with parity in accuracy

We also tested Parallel on single-hop benchmarks like SimpleQA that contain straightforward factual queries that benefit from web search. These benchmarks are saturated with limited room for further accuracy improvements.

### SimpleQA Search

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "parallel",
      "x": 18,
      "xDisplay": 17,
      "y": 98
    }
  ]
```

```
[
    {
      "label": "exa",
      "x": 57,
      "y": 87
    },
    {
      "label": "tavily", 
      "x": 110, 
      "y": 93
    }, 
    {
      "label": "perplexity", 
      "x": 52, 
      "y": 92
    }, 
    {
      "label": "openai gpt-5",
      "x": 37,
      "y": 98
    } 
  ]
```

On SimpleQA, the Parallel Search API matches the accuracy of the leading alternative while delivering the lowest end-to-end cost per-query cost.

## These results are possible because we've built a proprietary web index and a vertically-integrated search stack from the ground up, designed for AIs

We are able to achieve state-of-the-art results because we have spent the last two years building the infrastructure to innovate across the full search stack, enabling optimization at every layer and feedback loops that continuously improve performance.

**Crawl:** Infrastructure that prioritizes the hard-to-crawl content on the web that isn’t included in pretraining data for models: multi-modal, lengthy PDFs, JavaScript-heavy sites. And optimizes recrawls to keep fast-changing data fresh while minimizing burden on website owners.

**Index:** One of the fastest-growing, freshest, deepest, and largest web indexes with 1B+ pages added or refreshed daily.

**Ranking:** We retrieve and rank with a different optimization objective than traditional search. Instead of ranking URLs for humans to click on, we identify the most relevant and authoritative tokens suitable for LLM reasoning. Our proprietary models and algorithms score based on token relevance, page and domain authority, context window efficiency, and cross-source validation, rather than click-through probability or engagement.

## Leading AI teams build on our Search API - and so do we

Today, the most sophisticated builders choose to create and deploy AI, with search powered by Parallel. These companies have tested alternatives and understand that the decisions their agents make, whether it’s Sourcegraph Amp’s coding agent solving bugs, _Claygent_ powering every GTM decision, Starbridge discovering government RFPs, or a Fortune 100 insurer underwriting claims better than human underwriters, all depend on the quality of their web data.

We use our own Search API as foundational infrastructure to power our Web Agents. For example, the Parallel Task API, our higher-level research API that serves complex, multi-step enrichment and deep research queries, is built using the Search API. Every Task API query that runs in production depends on the Search API performing flawlessly underneath.

This architectural decision forces us to hold ourselves to the highest standard. Every performance improvement, latency optimization, and quality enhancement in the Search API directly impacts our own production systems serving millions of queries daily. We feel every token of inefficiency and every accuracy gap immediately in our own products.

The result is infrastructure that's been battle-tested and continuously refined under the demands of real-world agent workloads.

## Give your agents access to Parallel Search

Maximizing signal and minimizing noise in an agent’s context window is the single most important factor in the ability of the agent to complete a task effectively. Give your agents the most accurate and compressed context from the web with the Parallel Search API.

```sh
curl https://api.parallel.ai/v1/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "objective": "When was the United Nations established? Prefer UN'\''s websites.",
    "search_queries": [
      "Founding year UN",
      "Year of founding United Nations"
    ],
    "advanced_settings": {
      "max_results": 10,
      "excerpt_settings": {"max_chars_per_result": 10000}
    }
  }'
```

Give your agents access to better search. Get started in our [Developer Platform](https://platform.parallel.ai/play/search) or dive into the [documentation](https://docs.parallel.ai/search/search-quickstart).



## Notes on Methodology

**Benchmark Details**: Various search providers were evaluated against a wide set of benchmarks ranging from simple benchmarks (SimpleQA) to more complex benchmarks (HLE, BrowseComp, Batched SimpleQA, WebWalker, and Frames).

**Evaluation**: Results are based on tests run using official MCP servers provided as an MCP tool to OpenAI's GPT-5 model using the Responses API. In all cases, the MCP tools were limited to only the appropriate web search tool. Answers were evaluated using an LLM as a judge (GPT 4.1). 

**Cost Calculation**: Cost reflects the average cost per query across all questions run. This cost includes both the search API call and LLM token cost.

**Testing Dates**: Testing was conducted from November 3rd to November 5th.

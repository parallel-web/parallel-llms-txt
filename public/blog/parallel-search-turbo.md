# Introducing Turbo mode for Parallel Search

Today, we're releasing **Turbo **mode for [Parallel Search](https://parallel.ai/products/search), the fastest and most affordable way to ground your agents in high-quality information from the web.

## Do 14x more research in 5x less time

With a median latency of 200ms (p50) and a price of just $1 per 1,000 requests, Turbo is in a class of its own. It’s up to 14x cheaper than the default search in frontier models, while maintaining similar or better accuracy. 

---

|  | Parallel Search Turbo | Fast Search APIs | Frontier Model Search | SERP APIs |
| --- | --- | --- | --- | --- |
| Cost / 1K Requests | $1 | $5-7 | $10-14 | $1 |
| Median Latency | 200ms | 200-350ms | ~1s | ~1s |
| Output | LLM-Ready Results | LLM-Ready Results | LLM-Ready Results | Raw Search Results |

---

## New use cases unlocked by low-latency, low-cost search

Turbo is built for the workloads where latency is core to the product experience: voice agents, chat, support, anywhere a user is waiting for an answer. 

Voice and chat apps have previously had to make compromises on search quality. Parallel Search Turbo eliminates the tradeoff with the added benefit of being highly cost-effective.

- **Voice AI:** Voice agents need to be low-latency to feel magical. Use Turbo with real-time voice models to add web grounding without introducing awkward pauses.
- **Deep Research: **Applications that use deep research for decision-making can now perform significantly more searches, broadening the surface in comprehensive fan-outs.
- **Consumer chat**: Consumer chat applications rely on heuristics to decide when web grounding can enhance a response. Apps can now use Turbo’s low latency and cost to offer grounded search as the default user experience.
- **Reinforcement learning**: Training models with web grounding depends on millions of live queries per rollout. Turbo cuts that latency so more of your compute budget goes to learning.
- **Small, local models: **Small models can answer harder questions with generous use of web search, making efficient local AI more viable.

### BrowseComp (Latency)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 216,
    "y": 51
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 361,
    "y": 33.7
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 357,
    "y": 19.3
  },
  {
    "label": "Brave Search",
    "x": 430,
    "y": 38.3
  },
  {
    "label": "SerpAPI",
    "x": 999,
    "y": 23.3
  }
]
```

### HLE (Latency)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 220,
    "y": 52.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 358,
    "y": 49.3
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 243,
    "y": 42
  },
  {
    "label": "Brave Search",
    "x": 563,
    "y": 47.7
  },
  {
    "label": "SerpAPI",
    "x": 865,
    "y": 40
  }
]
```

### WebWalker (Latency)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 217,
    "y": 75.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 336,
    "y": 65
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 240,
    "y": 63.7
  },
  {
    "label": "Brave Search",
    "x": 503,
    "y": 65.7
  },
  {
    "label": "SerpAPI",
    "x": 761,
    "y": 50.7
  }
]
```

### SimpleQA (Latency)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Search (Turbo)",
    "x": 240,
    "y": 91
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 335,
    "y": 89.3
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 150,
    "y": 72
  },
  {
    "label": "Brave Search",
    "x": 475,
    "y": 87
  },
  {
    "label": "SerpAPI",
    "x": 652,
    "y": 76.7
  }
]
```

### Coding (Latency)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 216,
    "y": 79.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 341,
    "y": 76.7
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 208,
    "y": 71.9
  },
  {
    "label": "Brave Search",
    "x": 514,
    "y": 64.3
  },
  {
    "label": "SerpAPI",
    "x": 683,
    "y": 54
  }
]
```

---

## Replace SERP APIs 

Turbo is especially well-suited for replacing workflows built on SERP APIs. While SERP calls are affordable, they require additional work to fetch and process information into model-ready context. By default, Turbo returns dense, relevant excerpts directly, so the model spends fewer input tokens on a better answer. 

Turbo is also highly cost-efficient on complex multi-hop benchmarks, outperforming other search APIs at a fraction of the total cost.

### BrowseComp

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 350,
    "y": 51
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 966,
    "y": 33.7
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 822,
    "y": 19.3
  },
  {
    "label": "Brave Search",
    "x": 336,
    "y": 38.3
  },
  {
    "label": "SerpAPI",
    "x": 296,
    "y": 23.3
  },
  {
    "label": "OpenAI Web Search",
    "x": 912,
    "y": 57.7
  }
]
```

### HLE

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 298,
    "y": 52.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 596,
    "y": 49.3
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 426,
    "y": 42
  },
  {
    "label": "Brave Search",
    "x": 311,
    "y": 47.7
  },
  {
    "label": "SerpAPI",
    "x": 250,
    "y": 40
  },
  {
    "label": "OpenAI Web Search",
    "x": 513,
    "y": 66
  }
]
```

### WebWalker (multi-hop) 

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 82,
    "y": 75.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 193,
    "y": 65
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 188,
    "y": 63.7
  },
  {
    "label": "Brave Search",
    "x": 143,
    "y": 65.7
  },
  {
    "label": "SerpAPI",
    "x": 124,
    "y": 50.7
  },
  {
    "label": "OpenAI Web Search",
    "x": 275,
    "y": 80.7
  }
]
```

### SimpleQA

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 8,
    "y": 91
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 20,
    "y": 89.3
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 23,
    "y": 72
  },
  {
    "label": "Brave Search",
    "x": 16,
    "y": 87
  },
  {
    "label": "SerpAPI",
    "x": 6,
    "y": 76.7
  }
]
```

### Coding (multi-hop)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Turbo",
    "x": 131,
    "y": 79.7
  }
]
```

```
[
  {
    "label": "Exa Instant",
    "x": 316,
    "y": 76.7
  },
  {
    "label": "Tavily Ultra Fast",
    "x": 314,
    "y": 71.9
  },
  {
    "label": "Brave Search",
    "x": 204,
    "y": 64.3
  },
  {
    "label": "SerpAPI",
    "x": 131,
    "y": 54
  },
  {
    "label": "OpenAI Web Search",
    "x": 475,
    "y": 76.7
  }
]
```

---

## New infrastructure for abundant web search

Agents change the shape of demand for web data. A typical person runs a handful of searches a day, but an agent runs thousands: inside loops, across tools, and often multiple times per question. Lowering the cost and latency of high-quality search expands where search can be offered.

At $1 per 1,000 requests, there is less need to ration search, and developers can run it in more scenarios than ever: from every chat request to every row in a batch job. With web search this fast and affordable, every piece of software can be grounded in the web.

Turbo is the first product powered by Parallel’s new search architecture: a re-engineered search stack with innovation across hardware, model training, and index design to bring the cost and speed of search closer to zero.

## Get started

- [Docs](https://docs.parallel.ai/search/modes)
- [Playground](https://platform.parallel.ai/play/search?mode=turbo)
- [Parallel CLI](https://docs.parallel.ai/integrations/cli)
- [Parallel MCP](https://docs.parallel.ai/integrations/mcp/quickstart)


```
Use curl to read parallel.ai/agents.md and perform the setup to install Parallel
```

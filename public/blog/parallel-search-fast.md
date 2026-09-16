# Introducing Fast mode for Parallel Search

As intelligent models get cheaper, web search needs to follow.

Today, we’re introducing **Fast mode** for Parallel Search: high-quality web search for AI at 10x lower price than the default search in frontier models. It’s the only web search that’s cheap, fast, and accurate enough to pair with the latest class of cost-effective models.

## Fast mode highlights

- $1 per 1,000 requests (10x cheaper than frontier labs, 5x cheaper than other APIs)
- ~700ms average latency (#1 on [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) for speed per task)
- #3 on [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) for intelligence (Parallel Search Advanced is SOTA)
- Pairs well with models like GPT 5.6 Luna, DeepSeek V4 Pro, and Qwen3.8 27B
- Best for most agent workflows, customer-support assistants, factual Q&A, and general-purpose search

![](https://cdn.sanity.io/images/5hzduz3y/production/4d28686b37e868cfbf8387f31b47856fd7b56b79-4512x2176.png)

In an [independent evaluation by Artificial Analysis](https://artificialanalysis.ai/agents/search-api), Parallel Fast achieved a Search Index score of 73 while delivering the lowest measured per-task cost across 12 products from seven providers. Just two points shy of #1, Parallel Search Advanced. Without search, the same model scored 33 on the index.

## The economics of the AI stack have changed

Capable models are getting much cheaper. Recently, OpenAI reduced the cost of GPT 5.6 Luna by 80%, dramatically shifting the price-performance frontier for high-volume agentic work. At the same time, models like DeepSeek V4, Qwen3.8 27B, and MiniMax M3 lead for usage on [OpenRouter](https://openrouter.ai/rankings) and [OpenCode](https://opencode.ai/data/).

![](https://cdn.sanity.io/images/5hzduz3y/production/9fa8ba5cba241a689c691b5bfdc538f0d510a5dc-4640x2416.png)

Over just a few months, cost-per-intelligence has dropped significantly:

- Cost for models scoring ≥ 60 Intelligence Index is **down 8.5x** (Fable 5 to GLM-5.3 Max)
- Cost for models scoring ≥ 50 Intelligence Index is down **12.5x** (GPT 5.4 xhigh to GPT 5.6 Luna Max)

![](https://cdn.sanity.io/images/5hzduz3y/production/088b59727ecbdb3439c41d61db98c1cce827c346-4512x2112.png)

## Better quality, and more than 2x work per dollar spent

Cheaper, more capable models encourage more use, but they also change the cost dynamics of end-to-end agentic work. For many use cases, web search takes up a large majority of the total agent cost — unless you use Parallel (less than 12% of the total cost):

![](https://cdn.sanity.io/images/5hzduz3y/production/96973e63589390d7cc2a8c73d33487271a7e0195-4640x1984.png)

- **2.2x** cheaper on end-to-end cost vs. Brave Search (48% total cost)
- **2.35x** cheaper on end-to-end cost vs. Exa Search Fast (48% total cost)
- **2.79x** cheaper on end-to-end cost vs. Tavily Search Basic (68% total cost)

As the cost of intelligence decreases, teams need search that works with efficient models and high-volume applications. Quality alone is no longer enough. The right measure is how much useful intelligence an agent gets for every dollar spent, and how many tasks they can do in a given period of time.

## When to use Fast mode for Parallel Search

---

| Mode | Features | Use it when | Typical fit |
| --- | --- | --- | --- |
| Turbo | ~250ms · $1 / 1,000 requests | Latency matters most | Voice/chat agents, autocomplete, simple lookups |
| Fast | ~700ms · $1 / 1,000 requests · #3 quality (73)* | You want the best balance of speed, cost, and quality | Most agents, customer support, factual Q&A, general search |
| Advanced | ~3s · $5 / 1,000 requests · #1 quality (75)* | Quality matters most | Background agents, investigations, code review, deep synthesis |

---

_*Score on Artificial Analysis Search Index_

## How to use Fast mode

Switching modes is a single parameter change. Set mode to "fast" in your [Search API](https://docs.parallel.ai/search/search-quickstart) request, and the rest of your request stays the same:

```bash
curl https://api.parallel.ai/v1/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "mode": "fast",
    "objective": "What is the current price of NVIDIA stock?",
    "search_queries": ["NVIDIA stock price", "NVDA quote today"]
  }'
```

## Get started with Parallel

- [Docs](https://docs.parallel.ai/search/modes)
- [Playground](https://platform.parallel.ai/play/search?mode=fast)
- [Parallel CLI](https://docs.parallel.ai/integrations/cli)
- [Parallel MCP](https://docs.parallel.ai/integrations/mcp/quickstart)

```
Use curl to read parallel.ai/agents.md and perform the setup to install Parallel
```

# How to switch from OpenAI web search to Parallel Search API

Switching from OpenAI's built-in web search to Parallel's Search API cuts the per-call search fee by 50% to 96%, depending on which OpenAI search tool you use and your Parallel mode, and the migration is a client and parameter change. This guide covers what 10,000 searches actually cost on each side, including the token fees and multi-call behavior that make OpenAI's bill higher than the sticker, and the code change in Python and TypeScript.

OpenAI charges **$10 per 1,000 web search calls** on its current web_search tool for every model, plus the search content tokens at the model's input rate; the legacy web_search_preview tool charges $25 per 1,000 calls on non-reasoning models like GPT-4o and GPT-4.1. Parallel's Search API costs **$5 per 1,000 requests**, with compressed excerpts included in every result, and the Turbo and Fast modes bring that down to $1 per 1,000, at ~200ms and sub-second median latency respectively. That's a 50% cut in the per-call fee against web_search and 80% against the $25 preview tier, reaching 90% and 96% with Turbo. OpenAI's built-in search isn't in our current benchmark runs, so the accuracy section below compares Parallel with Exa, Tavily, and Perplexity instead.


**What OpenAI charges for web search**

OpenAI's current web_search tool costs $10 per 1,000 calls on every model. The legacy web_search_preview tool still splits into two tiers based on the model you're calling:

| Model tier (web_search_preview) | Cost per 1,000 search calls |
| --- | --- |
| Non-reasoning (GPT-4o, GPT-4.1) | $25 (search content tokens free) |
| Reasoning (GPT-6, GPT-5, o-series) | $10 (plus search content tokens) |

Two details make the effective cost higher than it looks. First, OpenAI's model can trigger multiple search calls per API request, so a single /v1/responses call might generate two or three billable searches. Second, except on the preview tool's $25 non-reasoning tier, you pay for the search context tokens on top of the per-call fee (at the model's standard token rate).

OpenAI's developer pricing page lists all three rates: $10 per 1,000 calls for web_search on every model, and $10 or $25 per 1,000 for web_search_preview depending on whether the model is a reasoning model. Older write-ups that quote only $25 are describing the preview tool, which explains any conflicting numbers you may have seen.


**What Parallel charges**

Parallel's Search API costs **$5 per 1,000 requests** for the Basic and Advanced modes; the Turbo and Fast modes cost $1 per 1,000 requests, at ~200ms and sub-second latency respectively. For most agent workloads, Fast is the mode to reach for. Each request returns up to 10 results with compressed, query-relevant excerpts included at no extra charge. Additional results beyond 10 cost $1 per 1,000.

There are no token fees on top and no per-model pricing tiers, just one flat price per mode.

|  | OpenAI web_search (all models) | OpenAI web_search_preview (non-reasoning) | Parallel |
| --- | --- | --- | --- |
| Per 1,000 search calls | $10 | $25 | $1 (Turbo) to $5 (Basic, Advanced) |
| Excerpts/content included | Token fees apply | Included | Included |
| Rate limit | Varies | Varies | 600 req/min |

## What 10,000 searches actually cost

The table below prices a realistic monthly workload: an AI agent making 10,000 web search calls per month, using either GPT-6 Sol ($2/1M input, $10/1M output) or GPT-6 Luna ($0.10/1M input, $0.50/1M output) for reasoning. Each query retrieves roughly 4,000 tokens of search context through OpenAI's tool, or about 2,500 with Parallel's compressed excerpts, and generates a 500-token response.

|  | OpenAI web search + GPT-6 Sol | Parallel Search API + GPT-6 Sol | OpenAI web search + GPT-6 Luna | Parallel Search API + GPT-6 Luna |
| --- | --- | --- | --- | --- |
| Search calls | 10,000 × $0.01 = $100 | 10,000 × $0.005 = $50 (or $10 with Turbo) | 10,000 × $0.01 = $100 | 10,000 × $0.005 = $50 (or $10 with Turbo) |
| Search context tokens | 40M × $2/1M = $80 | 25M × $2/1M = $50 | 40M × $0.10/1M = $4 | 25M × $0.10/1M = $2.50 |
| Output tokens | 5M × $10/1M = $50 | 5M × $10/1M = $50 | 5M × $0.50/1M = $2.50 | 5M × $0.50/1M = $2.50 |
| Monthly total | $230 | $150 ($110 with Turbo) | $106.50 | $55 ($15 with Turbo) |

OpenAI's GA web search tool costs **$10 per 1,000 calls** on every model, including GPT-6 Sol and GPT-6 Luna. The search content tokens (web results injected into the model's context) get billed at the model's input rate on top of that. Only the legacy web_search_preview tool charges **$25 per 1,000**, on non-reasoning models, with the search content tokens free. Either way, you don't control how much content the model retrieves per search.

Parallel's Search API costs **$5 per 1,000 calls** for the Basic and Advanced modes, or $1 per 1,000 with Turbo or Fast, regardless of which LLM you pair it with. Excerpts are included. The search context column is lower (25M vs. 40M tokens) because Parallel returns compressed, query-relevant excerpts rather than raw page content. You set the excerpt length with max_chars_per_result, so you control exactly how many tokens reach your LLM.

On the same model, Parallel saves you **about 35% with GPT-6 Sol** and **about 48% with GPT-6 Luna**. The savings scale linearly: at 100,000 searches per month, the gap between OpenAI + GPT-6 Sol ($2,300) and Parallel + GPT-6 Sol ($1,500) is $800. Switching the search calls to Turbo or Fast at $0.001 per request widens the gap further.


**Why the cost gap reflects a design difference**

OpenAI treats web search as a tool bolted onto its language models. You send a prompt, the model decides whether to search, and the search results get injected into the model's context window as raw tokens you pay for. You don't control how many searches the model runs, what context it retrieves, or how many tokens it consumes.

Parallel built its Search API as standalone infrastructure. You call the endpoint, define your search objective in natural language, and get back structured JSON with ranked URLs and dense excerpts. You control what goes into your LLM's context window, how many results you retrieve, and how many characters each excerpt contains.


**How Parallel scores on current benchmarks**

OpenAI's built-in web search isn't in our current benchmark runs, so we don't have a current head-to-head against it. The closest current evidence is our September 9, 2026 Search API evaluation on [parallel.ai/benchmarks](https://parallel.ai/benchmarks), which compares Parallel with Exa, Tavily, and Perplexity. Every provider was paired with the same agent at two price tiers: a GPT-5.6 Sol agent (reasoning high) at the frontier tier and a GPT-5.6 Luna agent (reasoning low) at the low-cost tier. An LLM judge graded the answers. Cells show accuracy and total cost per 1,000 questions.

| Benchmark (agent tier) | Parallel | Perplexity | Tavily | Exa (auto) |
| --- | --- | --- | --- | --- |
| SimpleQA Verified (frontier) | 97% / $28.3 (Advanced) | 95% / $20.2 | 92% / $61.3 | 91% / $35.7 |
| SimpleQA Verified (low-cost) | 94% / $2.0 (Fast) | 94% / $5.5 | 94% / $17.4 | 91% / $7.9 |
| BrowseComp (frontier) | 74% / $399 (Advanced) | 74% / $275 | 66% / $935 | 70% / $971 |
| BrowseComp (low-cost) | 44% / $11.8 (Fast) | 46% / $37.1 | 32% / $176 | 36% / $53.4 |

_Note: Despite our best efforts, these figures may not always be up to date. For the latest benchmarks, visit our __[benchmarks hub](https://parallel.ai/benchmarks)__._

At the frontier tier, Parallel Advanced led SimpleQA Verified at 97% and tied Perplexity on BrowseComp at 74%, though Perplexity got there for less ($275 vs. $399 per 1,000 questions). At the low-cost tier, Parallel Fast matched the top SimpleQA Verified score (94%) at $2 per 1,000 questions, the lowest cost in the run, and Perplexity edged it on BrowseComp (46% vs. 44%). The cost figures include search fees and LLM tokens. Separately, the independent Artificial Analysis Search Index (September 2026 data) scores Parallel Search (advanced) at 75, level with Brave's LLM context mode and behind Perplexity Search (medium) at 80 and Octen Search at 77; OpenAI's built-in web search is not on its displayed leaderboard.

These benchmarks are self-reported. We've published the methodology, competitor configurations, and judge model for transparency, and we use standardized public benchmark question sets.

## Migrate from OpenAI's web search to Parallel's Search API

```python
pip install parallel-web
```

Get your API key at [platform.parallel.ai](https://platform.parallel.ai/). You get $5 in free credits every month, applied automatically: enough for up to 5,000 Turbo search requests monthly.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

results = client.beta.search(
    objective="Find the latest SEC rulings on digital asset custody, "
              "including rule numbers and effective dates.",
    search_queries=["SEC digital asset custody rules 2026"],
    mode="basic",
    max_results=5,
    excerpts={"max_chars_per_result": 3000},
)

for result in results.results:
    print(f"{result.title}")
    print(f"{result.url}")
    for excerpt in result.excerpts:
        print(excerpt)
```

With this approach, you don't control how many searches the model runs, what content it retrieves, or how many tokens it consumes.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

results = client.beta.search(
    objective="Find the latest SEC rulings on digital asset custody, "
              "including rule numbers and effective dates.",
    search_queries=["SEC digital asset custody rules 2026"],
    mode="fast",
    max_results=5,
    excerpts={"max_chars_per_result": 3000},
)

for result in results.results:
    print(f"{result.title}")
    print(f"{result.url}")
    for excerpt in result.excerpts:
        print(excerpt)
```

You now control the search objective, keyword queries, result count, and excerpt length. The response comes back as structured JSON with ranked URLs, page titles, publish dates, and compressed excerpts ready to inject into any LLM's context window.

```python
import os
from openai import OpenAI as OpenAIClient
from parallel import Parallel

parallel = Parallel(api_key=os.environ["PARALLEL_API_KEY"])
openai = OpenAIClient()

# Step 1: Search with Parallel
search = parallel.search(
    objective="Recent Federal Reserve statements on interest rate policy",
    search_queries=["Fed interest rate decision March 2026"],
    mode="basic",
    advanced_settings={"max_results": 5},
)

# Step 2: Build context from search results
context = "\n\n".join(
    f"Source: {r.title} ({r.url})\n{chr(10).join(r.excerpts)}"
    for r in search.results
)

# Step 3: Pass context to your LLM
response = openai.chat.completions.create(
    model="gpt-6-sol",
    messages=[
        {"role": "system", "content": "Answer using only the provided sources. "
                                       "Cite URLs for each claim."},
        {"role": "user", "content": f"Context:\n{context}\n\n"
                                     f"Question: What did the Fed announce about "
                                     f"interest rates this month?"},
    ],
)

print(response.choices[0].message.content)
```

Parallel's Search API is model-agnostic. You call it for search, then pass the results into whatever LLM you use for reasoning. A typical pattern:

You get Parallel's search accuracy and excerpt quality with your choice of LLM for reasoning. You also avoid paying OpenAI's $10 to $25 per 1,000 web search surcharge and its search content tokens, since the LLM call contains no search tool.

## Get started

1. Sign up at [platform.parallel.ai](https://platform.parallel.ai/). You'll get $5 in free credits every month, applied automatically.
2. Install the SDK: pip install parallel-web or npm install parallel-web.
3. Set your API key: export PARALLEL_API_KEY="your_key".
4. Run your first search or point your OpenAI SDK at the Responses API.

Full documentation is at [docs.parallel.ai](https://docs.parallel.ai/). If you have questions about migrating a production workload, reach out at support@parallel.ai.

**Related reading: **[OpenAI web search vs. Parallel vs. Exa vs. Tavily](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose) · [Switching from Tavily](https://parallel.ai/articles/tavily-to-parallel-search-api) · [Switching from Exa](https://parallel.ai/articles/exa-to-parallel-search-api).

# How to build an AI research assistant that can search the web

A research assistant needs verifiable, current sources behind every claim, and the architecture connecting the model to the web decides its accuracy, cost, and reliability. This guide covers why live web access is the requirement, the core architecture of a web research agent, how to choose a search API, a step-by-step build with tool calling and citations, production patterns, and common mistakes.

The gap between "can generate text" and "can do research" is live web access. A research assistant needs verifiable, current information with source attribution for every claim. Without it, your agent produces text that sounds authoritative but can't back up a single claim.

Most developers try to bridge this gap with multi-step pipelines: search, scrape, parse, chunk, re-rank, then feed to an LLM. Each step adds latency and failure points. A scraper breaks when a site redesigns, and token costs balloon when you ingest entire articles to extract two relevant paragraphs.

The architecture you choose for connecting your LLM to the web determines accuracy, cost, and reliability for everything downstream.

## Why your AI assistant needs live web access

Static LLMs produce plausible-sounding answers from training data that's months or years old. Ask about a company's current leadership, a recent policy change, or today's market conditions and the model will generate something that reads well but may be wrong.

Research demands verifiable sources and honest uncertainty. LLMs can't provide any of these on their own. Your research assistant should return an "insufficient evidence" signal when search results don't support a claim, rather than fabricate a confident answer.

The compounding problem matters most. An inaccurate search result feeds an inaccurate summary, which feeds an inaccurate report. Each layer of reasoning amplifies errors from the layer below. When your search layer returns irrelevant content, your LLM wastes tokens reasoning over noise and produces weaker outputs at higher cost.

You need a search layer, a [web search API](https://parallel.ai/articles/what-is-a-web-search-api) purpose-built for machines, that returns structured excerpts your model can consume in a single context window, not raw HTML or link lists.

## The core architecture of a web research agent

A research assistant breaks down into five layers: query planning, web search, content extraction, LLM reasoning, and output with citations. You can wire these together in two ways.

**The multi-step pipeline** chains separate services: a search API returns URLs, a scraper fetches pages, a parser strips boilerplate, a chunker splits content, and a re-ranker selects the best passages. You control every step but maintain five integration points. Each one can fail.

```sh
Query → Search API → Scraper → Parser → Chunker → Re-ranker → LLM → Response
```

**The AI-native approach** collapses search, extraction, and ranking into a single API call. You send a natural-language research objective, and the API returns structured excerpts with attribution, ready for your LLM to reason over.

```sh
Query → AI-Native Search API → LLM → Response with Citations
```

The AI-native approach cuts latency from 15-30 seconds to under 5 seconds, eliminates scraper maintenance, and reduces token consumption by 10-50x. You trade fine-grained control over each pipeline step for a single, optimized call that handles [web crawling](https://parallel.ai/articles/what-is-a-web-crawler) and excerpt generation in one step. This architecture pattern powers [deep research](https://parallel.ai/articles/what-is-deep-research) systems that synthesize information across dozens of sources into cited reports.

For production agents, the single-call approach reduces operational burden in two areas: infrastructure (no scraper fleet to maintain) and reliability (one integration point instead of five).

Parallel's [Search API](https://docs.parallel.ai/home) was built for this approach. You send a research objective in natural language, and the API returns token-dense excerpts from a proprietary web-scale index of billions of pages.

## Choosing your search API

The search layer is the most consequential infrastructure decision you'll make. The quality of context your LLM receives constrains reasoning accuracy and cost per query.

Evaluate search APIs on six criteria:

- **Excerpt quality:** Does the API return keyword-matched snippets or dense, LLM-optimized passages?
- **Freshness controls:** Can you filter for recent content or trigger live crawls?
- **Attribution:** Does the response include structured URLs, titles, and dates for citation?
- **Latency:** Synchronous response time per request
- **Cost:** Price per request at production volume
- **Index coverage:** Proprietary index or third-party search provider under the hood?

| Feature | Parallel Search API | Tavily | Exa | Google Custom Search |
| --- | --- | --- | --- | --- |
| Excerpt format | Token-dense compressed excerpts | Extracted content snippets | Neural search highlights | Short snippets |
| Built for LLMs | Yes, from the ground up | Yes | Yes ( semantic search ) | No (built for humans) |
| Freshness controls | Live crawl toggles, freshness policies | Basic recency filter | Date filtering | Date restrict parameter |
| Pricing | From $0.001/request (Turbo); $0.005/request for Basic/Advanced (10 results) | $0.001-0.004/request | $0.001-0.004/request | $5/1,000 queries |
| Free tier | $5 in credits monthly (up to 5,000 Turbo searches) | 1,000 requests/month | 1,000 requests/month | 100 queries/day |
| Index | Proprietary (billions of pages) | Third-party + crawling | Proprietary neural index | Google's web index |
| Ideal use case | Production AI agents, research systems | Quick prototyping, simple search | Semantic/similarity search | Traditional web search integration |

Parallel's Search API leads [accuracy benchmarks across WISER-Search, BrowseComp, FRAMES, and SimpleQA](https://parallel.ai/blog/search-api-benchmark), with up to 20% accuracy gains in agentic workflows compared to alternatives. The difference comes from the excerpt format: compressed passages maximize useful context per token rather than returning raw page content or short keyword snippets.

Practical selection guidance: if you're building a general-purpose research agent with production reliability requirements, an AI-native search API gives you the best accuracy-to-cost ratio. If you need academic or domain-specific search, combine a general web search API with a specialized index like [Semantic Scholar](https://api.semanticscholar.org/) or PubMed. If you're coming from OpenAI's built-in web search, you can [migrate to Parallel's Search API](https://parallel.ai/articles/openai-to-parallel-search-api) with minimal code changes.

## Building the research agent step by step

### Set up your environment

Install the Parallel SDK, your LLM SDK, and set your API keys. You can sign up for a free Parallel API key at the [Search API product page](https://parallel.ai/products/search).

**Python:**

```python
# Install dependencies
# pip install parallel-web openai

import os
from parallel_web import Parallel
from openai import OpenAI

parallel = Parallel(api_key=os.environ["PARALLEL_API_KEY"])
llm = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
```

**TypeScript:**

```typescript
// npm install parallel-web openai
import Parallel from "parallel-web";
import OpenAI from "openai";

const parallel = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });
const llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
```

Store API keys as environment variables. Never hardcode them.

### Connect the search tool

The Search API accepts an _objective_ parameter, a natural-language description of your research intent. The API interprets your research intent rather than matching individual keywords.

```python
def search_web(objective: str, num_results: int = 10) -> list:
    """Search the web using Parallel's Search API."""
    response = parallel.search.create(
        objective=objective,
        max_results=num_results,
        max_chars_per_result=1500,
    )
    return [
        {"url": r.url, "title": r.title, "excerpt": r.excerpt}
        for r in response.results
    ]

# Example: research a specific factual question
results = search_web(
    "Find the current executive leadership team at Stripe and their backgrounds"
)
```

Each result returns a URL, title, publish date, and a compressed excerpt. The excerpt is token-dense: it concentrates relevant information instead of returning the full page with navigation, ads, and boilerplate.

You control excerpt length with `max_chars_per_result`. Shorter excerpts (500-800 chars) work for quick lookups. Longer excerpts (1500-3000 chars) give the LLM more context for complex research questions.

### Wire up the LLM with tool calling

Your LLM needs to decide when to search and how to use the results. Use [function calling](https://platform.openai.com/docs/guides/function-calling) (or [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) in Anthropic's terminology) to give the model access to your search function as a callable tool.

```typescript
// Using the Vercel AI SDK (https://sdk.vercel.ai/docs/introduction)
import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const { text } = await generateText({
  model: openai("gpt-4o"),
  tools: {
    webSearch: tool({
      description: "Search the web for current information on any topic",
      parameters: z.object({
        objective: z.string().describe("Research objective in natural language"),
      }),
      execute: async ({ objective }) => {
        const response = await parallel.search.create({
          objective,
          maxResults: 10,
        });
        return response.results;
      },
    }),
  },
  maxSteps: 5,
  system: "You are a research assistant. Search the web to answer questions with cited sources.",
  prompt: "What are the latest developments in quantum error correction?",
});
```

The `maxSteps` parameter enables multi-step research. If the first search doesn't answer the question, the model can refine its objective and search again. This iterative pattern handles complex questions that require synthesizing information from multiple angles.

### Add citations to every response

Every factual claim in the output needs a source URL and supporting evidence.

Parallel's Search API returns structured results with URLs and excerpts already paired. Pass these as context and instruct the LLM to cite every claim:

```python
SYSTEM_PROMPT = """You are a research assistant. Follow these rules:

1. Use ONLY the provided search results to answer questions.
2. Cite every factual claim with [Source Title](URL) inline.
3. If the search results don't contain enough evidence, say so.
4. Never fabricate information or sources.
5. Synthesize across multiple sources when possible."""

def research(question: str) -> str:
    results = search_web(question)
    context = "\n\n".join(
        f"Source: {r['title']}\nURL: {r['url']}\n{r['excerpt']}"
        for r in results
    )
    response = llm.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Search results:\n{context}\n\nQuestion: {question}"},
        ],
    )
    return response.choices[0].message.content
```

The system prompt enforces grounding. The LLM can reason across multiple sources but cannot fabricate claims beyond what the search results contain. This grounding constraint prevents the LLM from fabricating claims beyond the retrieved evidence. [Stanford research on RAG hallucination rates](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf) in legal AI tools shows that retrieval-augmented systems hallucinate when grounding constraints are weak.

## Production patterns that matter

Prototype research agents work in demos. Production agents need to handle cost and latency at scale.

**Caching.** Store search results for identical or similar objectives. A support agent answering the same product question 50 times a day shouldn't make 50 search API calls. Implement a cache layer with TTL (time to live) based on how fast the underlying data changes: minutes for breaking news, days for reference material.

**Token management.** Match excerpt length to your task. Quick factual lookups need 500-800 characters per result. Deep research synthesis benefits from 1500-3000 characters. The `max_chars_per_result` parameter in Parallel's Search API gives you direct control. Shorter excerpts mean lower LLM inference costs.

**Error handling.** Search APIs can timeout, return empty results, or hit rate limits. Build fallback logic: retry with a rephrased objective, reduce result count, or report insufficient evidence to the user. When search fails, return an explicit insufficient-evidence signal rather than passing an empty context to the LLM.

**Cost math.** At $0.005 per request with Parallel, a research agent that makes three searches per query costs $0.015 for search, or $0.003 with Turbo mode at $0.001 per request. Add LLM inference ($0.01-0.05 for GPT-4o class models) and a typical research query runs $0.025-0.065. Compare this to scraping pipelines that consume 10-50x more tokens from ingesting full pages.

**Latency budget.** Each synchronous search call takes 2-5 seconds; Turbo mode cuts that to ~200ms at the median. For real-time applications, pipeline multiple search calls in parallel when the agent identifies sub-questions. Three parallel searches take the same time as one.

## Common mistakes to avoid

**Dumping full pages into context.** Scraping entire articles wastes tokens on navigation menus, ads, cookie banners, and boilerplate footers. A 10,000-token page might contain 500 tokens of relevant information. Use a search API that returns focused excerpts and your token bill drops by an order of magnitude.

**Single-query research.** Complex questions need multiple searches from different angles. "Compare the pricing models of major cloud providers" requires separate searches for each provider. Build iterative search into your agent loop with multi-step tool calling.

**No grounding constraints.** Without explicit instructions to cite sources and refuse when evidence is thin, the LLM will fill gaps with plausible fabrication. The system prompt constraint ("use ONLY the provided search results") prevents fabrication in every research use case.

**Ignoring freshness.** Research on fast-moving topics (earnings reports, policy changes, product launches) needs fresh data. Parallel's Search API provides freshness policies and live crawl toggles to ensure results reflect the current state of the web, not cached pages from weeks ago.

## Frequently asked questions

**The best search API for an AI research assistant**

The answer depends on your use case. For general web research with production reliability, Parallel's Search API leads accuracy benchmarks across WISER-Search, BrowseComp, and FRAMES. For academic papers, combine a general web search API with domain-specific indexes like Semantic Scholar or PubMed.

**Reducing hallucinations in AI research**

Ground every response in retrieved search results and enforce citations through your system prompt. Constrain the LLM to evidence from the search payload. If the evidence is insufficient, instruct the model to say so rather than guess.

**Can I build a research assistant without coding?**

Yes. Platforms like Relevance AI and LangFlow offer no-code and low-code agent builders with custom tool integrations. You trade flexibility for speed of setup.

**Cost of running an AI research agent**

Search costs range from $0.001-0.05 per request depending on the provider and plan. Combined with LLM inference ($0.01-0.10 per query for GPT-4o class models), a typical research query costs $0.03-0.15 total. Caching and excerpt length tuning can reduce costs by 50-70% in production.

## Start building

You can build a working AI research assistant in under an hour. Parallel's Search API gives you LLM-optimized excerpts and source attribution in a single API call.

Sign up for a free API key ($5 in free credits every month, enough for up to 5,000 Turbo searches) and follow the [quickstart guide](https://docs.parallel.ai/home) to connect your first agent. For a complete working example with frontend and streaming, see the [full search agent cookbook](https://parallel.ai/blog/cookbook-search-agent).

[Start Building](https://docs.parallel.ai/home)

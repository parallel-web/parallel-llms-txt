# LLM cost optimization for AI agents: where the money goes in 2026

LLM cost optimization for agents starts with finding which line of the bill is largest, and for agents that browse the web it’s often the search tool, not the model. This guide covers how agent costs break down across OpenAI, Anthropic, and Google, what independent benchmarks measured per task, and the order to apply the levers, from search fees and caching to batch tiers and model routing.

Token prices fell fast enough in 2026 that the per-call fees around the model now decide many agent bills. OpenAI’s GPT-6 Luna costs $0.10 per million input tokens. Its built-in web search costs $10 per thousand calls. An agent that searches four times per task spends $0.04 on search before it reads a single result, the same as Luna charges for 400,000 input tokens.

That changes where to look first. The usual advice (cache your prompts, batch your jobs, use a smaller model) still holds, but it acts on tokens. If the largest line is a tool fee, those levers barely move the total.

## How an agent’s bill breaks down

An agent task costs the sum of four things: input tokens on every model turn (and agents resend their context every turn), output and reasoning tokens, per-call fees for hosted tools such as web search, and any fixed charges for code execution or storage. The first two are well known. The third is where most surprises come from.

Each major model provider bundles a search tool with its own fee:

| Search option | Fee | Result tokens | Notes |
| --- | --- | --- | --- |
| OpenAI web_search | $10 per 1,000 calls | Billed at the model’s input rate | Fixed 8,000-token block per call on gpt-4o-mini and gpt-4.1-mini |
| OpenAI web_search_preview, non-reasoning models | $25 per 1,000 calls | Free | Legacy tool |
| Claude web search | $10 per 1,000 searches | Billed as input, on that turn and every later turn | Dynamic filtering on 4.6+ models trims results |
| Gemini 3 Grounding with Google Search | $14 per 1,000 search queries, after 5,000 free per month | Not charged as input on Google Cloud’s Agent Platform, per its pricing page | Billed per query the model runs; Gemini 2.5 is billed per prompt at $35 per 1,000 |
| Parallel Search, Turbo or Fast | $1 per 1,000 requests | You pay your model for what you pass it | 10 results with excerpts included; you cap size per call |
| Parallel Search, Basic or Advanced | $5 per 1,000 requests | Same | Deeper retrieval |

Prices are from each provider’s pricing page as of October 7, 2026: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google](https://ai.google.dev/gemini-api/docs/pricing), and [Parallel](https://docs.parallel.ai/getting-started/pricing). In every bundled option, the model decides how many searches a request runs. Google’s docs give the example of one prompt that triggers two queries and bills both.

## What independent benchmarks measured per task

The [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) runs the same GPT-5.6 Luna agent against each search provider and reports quality, search cost, and model cost per 1,000 tasks. It’s the only independent board we know of that puts a built-in search tool next to standalone search APIs. Selected rows from the September 28, 2026 data:

| Configuration | Index score | Search cost per 1,000 tasks | Model cost per 1,000 tasks | Total |
| --- | --- | --- | --- | --- |
| Perplexity Search (medium) | 80 | $62.30 | $8.04 | $70.34 |
| Octen Search (highlights) | 77 | $9.07 | $14.92 | $23.99 |
| Parallel Search (advanced) | 75 | $47.93 | $11.29 | $59.22 |
| OpenAI Web Search (medium) | 74 | $40.19 | $9.40 | $49.59 |
| Exa Search (auto) | 74 | $65.57 | $17.73 | $83.30 |
| Parallel Search (basic) | 73 | $45.14 | $21.65 | $66.79 |
| Model only, no search | 33 | n/a | $2.92 | $2.92 |

Three things stand out. Search adds at least 40 points to the index for every provider here, so dropping search to save money isn’t an option for questions that need current facts. Search fees are the larger cost line for most configurations on a cheap model. And our Advanced and Basic modes cost more per task than OpenAI’s tool on this board, so if cost is your goal, they’re the wrong modes to switch to.

The modes to compare are Turbo and Fast at $1 per 1,000. Fast isn’t on the current board, but in AA’s September 8 data it scored 73 with $8.41 in search cost per 1,000 tasks, about a fifth of OpenAI’s $40.19 search line in the later snapshot. We publish our own runs at the low-cost tier on [our benchmarks page](https://parallel.ai/benchmarks): with a GPT-5.6 Luna agent, Fast answered 94% of SimpleQA Verified at $2.00 per 1,000 questions, search and tokens included. Openbenchmarks measures the same trade on single-fact lookups: on its [company news board](https://openbenchmarks.com/company-news/metric/cost-per-1k-correct) (300 questions, September 2026), Fast answered 86.0% correctly and cost $1.16 per 1,000 correct answers, the cheapest paid option, against $7.05 for Exa Fast at 99.3% accuracy. Cheap per call isn’t always cheap per answer, so check accuracy beside price.

## The levers, in the order to apply them

### 1. Fix the per-call fees

If your agent searches, price the search line first. Moving from a $10 bundled tool to a $1 search API cuts that line by 90% at the same call count. The token side can move even more: when we ran 20 questions three times through each model on October 8, 2026, the same questions answered with Parallel Fast instead of the built-in tool cost 86% less on GPT-6 Luna, 67% less on GPT-6 Sol, 90% less on Claude Haiku 5.5, and 78% less on Claude Opus 5.5. Most of the gap was tokens: each built-in search added roughly 8,600 to 20,000 input tokens, against about 2,000 for a capped Parallel call. Fast’s cached index lagged on releases from the previous week or two, so send freshness-critical questions to Parallel Advanced, which still cost 36% to 71% less than built-in search across those four models. The switch is usually a small code change: register the search API as a function tool and keep the model’s decision about when to search. Our provider guides walk through the code for [OpenAI](https://parallel.ai/articles/how-to-save-money-on-openai-api) and [Claude](https://parallel.ai/articles/how-to-save-money-on-claude-api), and our [Gemini grounding comparison](https://parallel.ai/articles/gemini-google-search-grounding-vs-parallel) covers Google.

### 2. Cap what each tool returns

Every token a tool returns gets billed when the model reads it, and again on every later turn it stays in context. Set a size limit on every tool, not only search. On Parallel, `max_chars_total` does this: in our October 7, 2026 run across 20 questions, a cap of 8,000 characters cut Fast’s median payload from 3,532 to 2,091 tokens per call. On a frontier model at $10 per million input tokens, that’s about $14 saved per 1,000 searches on the first read alone.

### 3. Cache stable prefixes

All three providers discount cached input steeply: OpenAI’s GPT-6 models bill cached tokens at 10% of input (5% on gpt-6.1-sol), Anthropic at 10% on most models and as low as 2.5% on Claude Fable 5.1, and Google discounts cached context too. Caching is a prefix match, so keep system prompts and tool definitions byte-stable at the front and put per-request content, including search results, at the end. Then check the cached-token counts in your usage data; caching that silently misses is common.

### 4. Move unattended work to batch tiers

OpenAI’s Batch and Flex tiers and Anthropic’s Message Batches charge half the standard token rate, and the Gemini API has a discounted Batch tier too. Agent loops that wait on client-side tools fit these tiers poorly, so restructure where you can: retrieve first with a search call, then send one batched model request per item with the results inline.

### 5. Route by difficulty and tune effort

The spread between model tiers is large: GPT-6 Luna costs a twentieth of GPT-6 Sol, and Claude Haiku 5.5 a fortieth of Claude Opus 5.5 for prompts up to 100,000 tokens. Reasoning and thinking tokens bill at output rates, so a lower effort setting on simple routes cuts the most expensive tokens. Measure cost per completed task on your own traffic. A cheaper configuration that needs extra turns or retries can cost more in total.

### 6. Watch context growth

Long-running agents grow their context until they cross pricing thresholds (OpenAI’s GPT-6 rates step up above 272K input tokens) or the window limit. Cap tool output, summarize finished subtasks, and start fresh contexts for new ones. Load large tool schemas on demand where the provider supports it, as with Anthropic’s tool search.

## A quick audit for your own bill

Pull one week of usage and split it into four numbers: uncached input, cached input, output including reasoning, and tool fees. Then ask:

- **Is the tool-fee line larger than the token lines?** Switch the search provider first.
- **Is cached input small next to uncached input?** Find what changes at the start of your prompt.
- **Does a large share of traffic run where nobody waits?** Move it to a batch tier.
- **Is every route on the same model at the same effort?** Split the routine ones off.

## Get started

Create a key at [platform.parallel.ai](https://platform.parallel.ai). You get $5 in free credits every month, applied automatically, enough for up to 5,000 Fast or Turbo searches, which is plenty to replay a sample of your agent’s real tasks and compare cost per completed task against your current setup.

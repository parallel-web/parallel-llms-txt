# How we evaluate web search APIs for AI agents

A search API benchmark is only as informative as its harness: which agent ran, which tools it could call, how answers were graded, and what the cost column counts. This guide covers how we run the evals on parallel.ai/benchmarks, how we compute cost, where the current results show us losing, and how to read them next to Artificial Analysis and Openbenchmarks.

Every number on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) comes from an agent answering questions with a search provider’s tools, graded on the final answer. We make the [Parallel Search API](https://parallel.ai/products/search), so we’re a vendor grading our own product. This page documents the setup behind the Search API charts (evals run September 9, 2026) so you can judge the results yourself, and it says plainly which parts of the harness we haven’t published.

## Why we grade the agent’s final answer

We score whether the agent answered the question correctly, because that’s the outcome your application depends on. Retrieval metrics like recall@10 or nDCG ask whether a relevant page appeared in the results, which helps when you debug a failure. An agent can get a relevant page and still fail: the excerpt can miss the one sentence that matters, the result list can bury it under noise, or the model can need five extra searches to piece the answer together.

End-to-end grading captures those effects. It also captures cost, since a provider that returns thin results pushes the agent into more calls and more tokens. Our page describes the setup in one line: “Multi-step agentic evaluation at two price tiers.”

## The two-tier design

We run every provider twice, once with an expensive agent and once with a cheap one, because agents in production come in both shapes. Our methodology text reads: “In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Every competitor is run at both tiers with the same agent.”

Exa, Tavily, and Perplexity each appear twice on every chart, driven by the same agent as our modes at that tier. The tool set differs by provider, and the page states it: “The agent calls the provider’s search tool plus its extract tool where one exists (Parallel, Exa, Tavily); Perplexity is search-only.” That choice lets each provider use the page-reading tool it ships, and it means Perplexity competes without one.

OpenAI released GPT-6 Sol and GPT-6 Luna on September 22, 2026, after these runs. The charts keep the tested model names, GPT-5.6 Sol and GPT-5.6 Luna, because those are the models that produced the numbers. We haven’t rerun on GPT-6.

## The three suites and what each one stresses

Each suite tests a different kind of search work, and we report a sample of each rather than the full dataset.

**SimpleQA Verified** measures short factual lookups. Our page describes it as “a 1,000-question refinement of OpenAI’s SimpleQA with corrected labels and balanced topics,” created by Google DeepMind, and reports “a sample of 100 questions.” Every configuration scores 91% or higher, so it mostly separates cost and catches regressions.

**BrowseComp** measures persistence. OpenAI built it from “1,266 questions that require persistent browsing to locate hard-to-find, entangled information on the web,” and we report “a sample of 50 questions.” Its questions stack several constraints, so it rewards results the agent can chain across many hops.

**WideSearch** measures breadth. ByteDance Seed built “200 broad information-seeking tasks that require collecting many verifiable facts from across the web and assembling them into a structured table,” and we report “a sample of 100 tasks.” It uses partial credit, in the page’s words: “each task’s score reflects the share of required items collected correctly, averaged across tasks, so it is not directly comparable to the exact-match accuracy on the other benchmarks.” A WideSearch score of 57.6 means the agent collected about 58% of the required items correctly on average. It doesn’t mean it finished 58% of tasks.

## How we compute cost per 1,000 questions

Cost sits on the x-axis because the same accuracy at a tenth of the price is a different product decision. The methodology says: “Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.” We multiply that per-question average by 1,000 and label it CPM.

The search bill is only part of it. A provider with $1 per 1,000 requests list pricing can still produce an expensive run if its results make the agent search many more times and read long pages. That’s why Parallel Fast and Turbo cost $2.0 per 1,000 questions on SimpleQA Verified while the same modes cost $11.8 and $13.2 on BrowseComp: the agent works much harder per question. Our Search pricing (Turbo and Fast at $1 per 1,000 requests, Basic and Advanced at $5) is only one input.

## Current Search API results

Here are all three Search API suites from parallel.ai/benchmarks in one table, accuracy (or WideSearch score) followed by CPM.

| Configuration | Tier | SimpleQA Verified | BrowseComp | WideSearch |
| --- | --- | --- | --- | --- |
| Parallel Advanced | Frontier | 97% / $28.3 | 74% / $399 | 57.6 / $692 |
| Parallel Basic | Frontier | 97% / $45 | 72% / $612 | 55.3 / $965 |
| Perplexity | Frontier | 95% / $20.2 | 74% / $275 | 53.5 / $547 |
| Exa Auto | Frontier | 91% / $35.7 | 70% / $971 | 55.9 / $1,061 |
| Tavily | Frontier | 92% / $61.3 | 66% / $935 | 55.9 / $1,072 |
| Parallel Fast | Low-cost | 94% / $2.0 | 44% / $11.8 | 45.5 / $10.5 |
| Parallel Turbo | Low-cost | 91% / $2.0 | 32% / $13.2 | 44.0 / $10.1 |
| Perplexity | Low-cost | 94% / $5.5 | 46% / $37.1 | 47.0 / $24.8 |
| Exa Auto | Low-cost | 91% / $7.9 | 36% / $53.4 | 53.0 / $41.2 |
| Tavily | Low-cost | 94% / $17.4 | 32% / $176 | 47.9 / $107 |

At the low-cost tier, Fast and Turbo are the cheapest configuration on every suite. Fast matches the best low-cost SimpleQA Verified score (94%, tied with Perplexity and Tavily) at $2.0 against $5.5 and $17.4.

We lose in several places. On BrowseComp at the low-cost tier, Perplexity scores 46% to Fast’s 44%, and Turbo trails further at 32%, behind Exa Auto’s 36% as well. On WideSearch at the low-cost tier, Exa Auto scores 53.0 to Fast’s 45.5 at about four times Fast’s cost. At the frontier tier, Advanced ties Perplexity on BrowseComp at 74% and costs more to get there ($399 against $275).

Advanced has the top frontier score on SimpleQA Verified (97% against Perplexity’s 95%) and on WideSearch (57.6 against 55.9 for Exa and Tavily). Read those leads with the sample sizes in mind. On 50 BrowseComp questions, a 95% confidence interval around 45% spans roughly plus or minus 14 points, so 46 against 44 is a tie. The same arithmetic applies to 97 against 95 on 100 questions. Turbo’s 14-point BrowseComp gap to Perplexity and Exa’s 7.5-point WideSearch lead over Fast are large enough that we treat them as real.

The same page also carries Task API evals (August 26, 2026) on fixed 100-question subsets of DeepSearchQA and BrowseComp. Those compare deep research products and answer a different question from the Search charts. See the Task API tab on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) and our [deep research API benchmark report](https://parallel.ai/articles/best-deep-research-apis).

## What our page doesn’t publish yet

Several harness details that would let you reproduce these numbers aren’t on parallel.ai/benchmarks as of September 28, 2026. We don’t name the LLM judge model or publish its grading prompt; the page says only “Answers are graded by an LLM judge.” We don’t state a tool-call or turn budget for the agent. We don’t publish the sampled question IDs, the agent’s system prompt, the number of runs per configuration, or run-to-run variance. We don’t describe any contamination filtering for benchmark answers that have leaked onto the web. The WideSearch partial-credit rule is stated, but the item-matching rules behind it aren’t.

## Why we point to Artificial Analysis and Openbenchmarks

Independent referees control their own harness and don’t sell a search API, so check them before trusting ours.

The [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) fixes one agent and swaps only the provider. Its [methodology page](https://artificialanalysis.ai/methodology/search-api) lists GPT-5.6 Luna (medium) as both the candidate model and the grader, a 25-turn budget with unlimited tool calls, up to 10 results per search, provider-native payloads, and contamination filtering inside the search tools. Every provider gets the same `web_fetch` tool, AA’s own text extractor, so provider extract APIs play no part. The index is the equal-weighted mean of DeepSearchQA F1 (900 tasks), BrowseComp accuracy (a hard 200-question subset), and AA-Omniscience accuracy (600 private questions). In the September 22, 2026 data, Perplexity Search (medium) leads at 80, Perplexity (high) scores 79, and Octen scores 77. Parallel Search (advanced) scores 75, tied with Brave LLM context, and Parallel basic scores 73. On AA’s BrowseComp subset, Parallel advanced scores 77 against Perplexity medium’s 87.

[Openbenchmarks](https://openbenchmarks.com/web-search/fastest-search-api) publishes open-source code, a public dataset sample, and a held-out scoring set. Its fastest-search board, last measured September 12, 2026, sends 300 company-news questions to each API, one search per question with up to 10 results, and ranks by mean client-measured latency. Parallel turbo is fastest there at 348ms mean, with 71.3% accuracy; Exa instant measured 398ms at 97.7%, and Exa fast 652ms at 99.3%. Openbenchmarks notes that latency depends on “deployment region” among other conditions, so a vendor p50 spec and its mean aren’t the same statistic. Its [multi-turn company search board](https://openbenchmarks.com/multi-turn-company-search) (updated September 15, 2026) ranks Parallel basic first search-only at 46.5 F1 and Exa deep first with fetch at 48.2. We cover that board in [the best API for company research](https://parallel.ai/articles/best-api-for-company-research).

## Limits that apply to every search benchmark

Sample sizes are small everywhere: our 50 BrowseComp questions, Openbenchmarks’ 45 multi-hop questions, and AA’s 200-question BrowseComp subset all leave several points of noise. Vendor-run numbers, ours included, come from a party that picked the suites and the harness. Public benchmarks leak: BrowseComp and SimpleQA answers now appear on the open web and in training data, which is why AA filters them and Openbenchmarks builds lookups around facts dated after the model’s cutoff. Latency boards measure from wherever the benchmark client runs, under one concurrency profile, so your numbers from another region will differ. And every suite here uses an LLM grader, which can misjudge hedged or partially right answers in ways a human reviewer wouldn’t.

## Run it on your own queries

A public benchmark tells you how providers did on someone else’s task mix. Your production queries settle the choice. Our guide to [benchmarking web search APIs on your own queries](https://parallel.ai/articles/how-to-benchmark-web-search-apis) walks through building a query set with correctness criteria, a fixed harness, a judge you spot-check, and paired scoring with error bars. If you’re wiring the harness itself, [build an agent harness with Parallel Search](https://parallel.ai/articles/build-an-agent-harness-with-parallel-search) covers the loop, and [Fast vs. Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo) helps you pick which of our modes to test.

## Get started

Create an API key at [platform.parallel.ai](https://platform.parallel.ai). The free tier includes $5 in free credits every month (up to 5,000 Turbo or Fast searches), enough to run a first comparison. To try results before writing code, connect the free [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) at `https://search.parallel.ai/mcp` with no account.

## Frequently asked questions

### What is the best search API for AI agents?

It depends on your agent and budget. On parallel.ai/benchmarks (September 2026), Parallel Fast and Turbo are the cheapest low-cost configurations and Parallel Advanced leads or ties each frontier suite, while Perplexity and Exa beat Fast on low-cost BrowseComp and WideSearch; on the Artificial Analysis Search Index, Perplexity Search leads at 80.

### How does Parallel benchmark its Search API?

We run SimpleQA Verified, BrowseComp, and WideSearch samples with a GPT-5.6 Sol agent (frontier tier) and a GPT-5.6 Luna agent (low-cost tier), run every competitor with the same agents, and grade answers with an LLM judge. Cost includes LLM tokens and tool calls per 1,000 questions.

### What is BrowseComp?

BrowseComp is an OpenAI benchmark of 1,266 hard questions that require persistent multi-hop browsing. We report a 50-question sample; Artificial Analysis uses a hard 200-question subset.

### Where does Parallel rank on the Artificial Analysis Search Index?

In the September 22, 2026 data, Parallel Search (advanced) scores 75, tied with Brave LLM context and behind Perplexity Search (medium) at 80, Perplexity (high) at 79, and Octen at 77.

**Related reading: **[How to benchmark web search APIs on your own queries](https://parallel.ai/articles/how-to-benchmark-web-search-apis) · [Perplexity Search API vs. Parallel Search API](https://parallel.ai/articles/perplexity-search-api-vs-parallel-search-api) · [Exa vs. Parallel](https://parallel.ai/articles/exa-vs-parallel) · [Fast vs. Turbo](https://parallel.ai/articles/parallel-search-fast-vs-turbo)

# Parallel Quality Benchmarks

Give your AI the highest-quality web search tools available

Agents that act on web data need search that is accurate, cost-efficient, token-efficient, and fast. Accuracy comes first, because a wrong answer costs more than a slow one. These benchmarks compare web search APIs on accuracy against cost per request, running the same prompts for every provider. Parallel consistently leads on accuracy, often at a lower price.

## External evals

* [#1 on the Artificial Analysis Search Index (November 19, 2026 data)](https://artificialanalysis.ai/agents/search-api). Parallel Search scores 83.4, the highest of 26 search products. Updated November 19, 2026.
* [#1 on the Vals AI Web Search Index](https://www.vals.ai/benchmarks/web%5Fsearch). Claude Opus 5.5 with Parallel Search scores 57.54%, the top result. Updated November 17, 2026.
* [#1 on OB multi-turn company search (search-only)](https://openbenchmarks.com/multi-turn-company-search). Parallel leads the search-only board at 46.5 F1 across 45 questions. Updated October 2, 2026.

## Parallel Search API

### SimpleQA Verified

| Series   | Model                 | Cost (CPM) | Accuracy (%) |
| -------- | --------------------- | ---------- | ------------ |
| Parallel | Parallel Fast         | 2          | 94           |
| Parallel | Parallel Turbo        | 2          | 91           |
| Parallel | Parallel Advanced     | 28.3       | 97           |
| Parallel | Parallel Basic        | 45         | 97           |
| Others   | Perplexity (low-cost) | 5.5        | 94           |
| Others   | Exa Auto (low-cost)   | 7.9        | 91           |
| Others   | Tavily (low-cost)     | 17.4       | 94           |
| Others   | Perplexity (frontier) | 20.2       | 95           |
| Others   | Exa Auto (frontier)   | 35.7       | 91           |
| Others   | Tavily (frontier)     | 61.3       | 92           |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[SimpleQA Verified](https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified), created by Google DeepMind, is a 1,000-question refinement of OpenAI's SimpleQA with corrected labels and balanced topics, covering short, fact-seeking questions. Results are reported on a sample of 100 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Every competitor is run at both tiers with the same agent. The agent calls the provider's search tool plus its extract tool where one exists (Parallel, Exa, Tavily); Perplexity is search-only. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

### BrowseComp

| Series   | Model                 | Cost (CPM) | Accuracy (%) |
| -------- | --------------------- | ---------- | ------------ |
| Parallel | Parallel Fast         | 11.8       | 44           |
| Parallel | Parallel Turbo        | 13.2       | 32           |
| Parallel | Parallel Advanced     | 399        | 74           |
| Parallel | Parallel Basic        | 612        | 72           |
| Others   | Perplexity (low-cost) | 37.1       | 46           |
| Others   | Exa Auto (low-cost)   | 53.4       | 36           |
| Others   | Tavily (low-cost)     | 176        | 32           |
| Others   | Perplexity (frontier) | 275        | 74           |
| Others   | Tavily (frontier)     | 935        | 66           |
| Others   | Exa Auto (frontier)   | 971        | 70           |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[BrowseComp](https://openai.com/index/browsecomp/), created by OpenAI, contains 1,266 questions that require persistent browsing to locate hard-to-find, entangled information on the web. Results are reported on a sample of 50 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Every competitor is run at both tiers with the same agent. The agent calls the provider's search tool plus its extract tool where one exists (Parallel, Exa, Tavily); Perplexity is search-only. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

### WideSearch

| Series   | Model                 | Cost (CPM) | Score (%) |
| -------- | --------------------- | ---------- | --------- |
| Parallel | Parallel Turbo        | 10.1       | 44        |
| Parallel | Parallel Fast         | 10.5       | 45.5      |
| Parallel | Parallel Advanced     | 692        | 57.6      |
| Parallel | Parallel Basic        | 965        | 55.3      |
| Others   | Perplexity (low-cost) | 24.8       | 47        |
| Others   | Exa Auto (low-cost)   | 41.2       | 53        |
| Others   | Tavily (low-cost)     | 107        | 47.9      |
| Others   | Perplexity (frontier) | 547        | 53.5      |
| Others   | Exa Auto (frontier)   | 1061       | 55.9      |
| Others   | Tavily (frontier)     | 1072       | 55.9      |

CPM: USD per 1000 requests, log scale. Score is item-level correctness averaged across tasks (partial credit). Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[WideSearch](https://arxiv.org/abs/2508.07999), created by ByteDance Seed, contains 200 broad information-seeking tasks that require collecting many verifiable facts from across the web and assembling them into a structured table. Results are reported on a sample of 100 tasks.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Every competitor is run at both tiers with the same agent. The agent calls the provider's search tool plus its extract tool where one exists (Parallel, Exa, Tavily); Perplexity is search-only. Answers are graded by an LLM judge.

WideSearch is scored with partial credit: each task's score reflects the share of required items collected correctly, averaged across tasks, so it is not directly comparable to the exact-match accuracy on the other benchmarks.

Cost includes LLM token costs and tool call costs, averaged per task and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

## Parallel Task API

### BrowseComp

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Lite                | 5          | 88           |
| Parallel | Core                | 25         | 91           |
| Parallel | Ultra               | 300        | 92           |
| Parallel | Ultra2x             | 600        | 93           |
| Parallel | Ultra4x             | 1200       | 94           |
| Others   | Perplexity high     | 441.5      | 86           |
| Others   | Exa Agent Max       | 1043.5     | 78           |
| Others   | Gemini 3.1 Pro high | 194.4      | 72           |
| Others   | GPT-5.6 Sol PTC max | 791.1      | 85           |

CPM: USD per 1000 queries. Cost is shown on a log scale.

Methodology

**Evaluation sample**

We ran this benchmark on a fixed 100-question subset of BrowseComp. The same subset was held constant across every Parallel Task API configuration and every competitor.

**Cost**

Cost is reported as CPM: measured end-to-end spend for the run divided by the number of questions, multiplied by 1,000\. It is plotted on a log scale.

**Experiment setup**

The Parallel Task API is evaluated across nine configurations, from Task Lite through Task Ultra8x. Competitors are evaluated in their highest-quality configurations: Perplexity high, Perplexity xhigh, Exa Agent Max, Gemini 3.1 Pro high, GPT-5.6 Sol PTC max.

**Benchmark dates**

All testing was conducted on August 26, 2026.

### DeepSearchQA

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Lite                | 5          | 76           |
| Parallel | Base                | 10         | 77           |
| Parallel | Core2x              | 50         | 81           |
| Parallel | Pro                 | 100        | 83           |
| Parallel | Ultra2x             | 600        | 85           |
| Parallel | Ultra4x             | 1200       | 86           |
| Others   | Perplexity high     | 371.9      | 68           |
| Others   | Exa Agent Max       | 1506.5     | 65           |
| Others   | Gemini 3.1 Pro high | 123.9      | 77           |
| Others   | GPT-5.6 Sol PTC max | 1047.8     | 85           |

CPM: USD per 1000 queries. Cost is shown on a log scale.

Methodology

**Evaluation sample**

We ran this benchmark on a fixed 100-question subset of DeepSearchQA. The same subset was held constant across every Parallel Task API configuration and every competitor.

**Cost**

Cost is reported as CPM: measured end-to-end spend for the run divided by the number of questions, multiplied by 1,000\. It is plotted on a log scale.

**Experiment setup**

The Parallel Task API is evaluated across nine configurations, from Task Lite through Task Ultra8x. Competitors are evaluated in their highest-quality configurations: Perplexity high, Perplexity xhigh, Exa Agent Max, Gemini 3.1 Pro high, GPT-5.6 Sol PTC max.

**Benchmark dates**

All testing was conducted on August 26, 2026.

## Parallel Decisions API

### PWS-Decisions

| Series   | Model                  | Accuracy (%) |
| -------- | ---------------------- | ------------ |
| Parallel | Parallel Decisions API | 76.2         |
| Others   | Perplexity Decisions   | 50.9         |
| Others   | Baseten Mammoth        | 45           |
| Others   | OpenAI Decisions API   | 41.7         |
| Others   | TypeSafe Jev 1.14      | 33.4         |

Share of all 300 questions answered correctly (100 public + 200 private), mean of three runs.

**Dataset**

PWS-Decisions is Parallel's benchmark of 300 closed-ended decision questions whose answers depend on current, niche or scattered facts on the public web: qualifying accounts, checking product capabilities, confirming policy rules and tracking fast-moving events. Each question gives JSON state, a question scoped to a date or version, and 2–5 mutually exclusive choices. 100 questions are public on [Hugging Face](https://huggingface.co/datasets/parallel-web/pws-decisions-benchmark) and 200 are held private. The runner is on [GitHub](https://github.com/parallel-web/pws-decisions-benchmark).

**Evaluation methodology**

A prediction is correct only if it exactly matches the reference choice, so no LLM judge is involved. Refusals, invalid responses and errors count as incorrect. Parallel runs the Decisions API in its default fast mode. The other APIs use their native decision endpoints with the same state, instructions and choices, without supplied web context; Perplexity is accessed through OpenRouter. Scores are the mean of three runs. Uniform random guessing scores 42.4% on the full set.

On the 100 public questions alone: Parallel Decisions API 78.3%, Perplexity Decisions 51.0%, OpenAI Decisions API 42.0%, Baseten Mammoth 37.0%, TypeSafe Jev 1.14 33.3%.

**Testing dates**

Evals were run on October 29, 2026.

### Latency vs cost

| Series   | Model                                | Cost (CPM) | Median latency (s) |
| -------- | ------------------------------------ | ---------- | ------------------ |
| Parallel | Parallel Decisions API               | 1          | 0.56               |
| Others   | GPT-6 Luna + native web search       | 16.52      | 7.42               |
| Others   | Claude Haiku 5.5 + native web search | 28.11      | 6.38               |

CPM: USD per 1,000 requests, including tokens and native search charges. Latency is the median (p50) across the 300-question set. Haiku 5.5 is plotted at the midpoint of its $27.43–$28.79 cost range.

**Dataset**

The same 300 [PWS-Decisions](https://github.com/parallel-web/pws-decisions-benchmark) questions, each a closed-ended decision whose answer depends on current facts on the public web.

**Evaluation methodology**

Compares one Decisions API call with a low-cost model that runs its own built-in web search. GPT-6 Luna uses the OpenAI Responses API with web search required, medium reasoning and at most five tool calls. Claude Haiku 5.5 uses the Anthropic Messages API web search tool with a five-search budget. Both have an 8,192-token output cap. Cost includes token and native search charges. Latency is time to a complete answer; p95 is 0.71 s for the Decisions API, 19.17 s for Luna and 10.95 s for Haiku 5.5.

This chart measures speed and cost only. With a reasoning model and up to five searches per question, the two native-search configurations scored 97.3% (Luna) and 96.6% (Haiku 5.5) on the same 300 questions, against 76.2% for the Decisions API. All results are from three runs.

**Testing dates**

Evals were run on October 29, 2026.

### JevBench

| Series   | Model                  | Accuracy (%) |
| -------- | ---------------------- | ------------ |
| Parallel | Parallel Decisions API | 89.6         |
| Others   | OpenAI Decisions API   | 90           |
| Others   | TypeSafe Jev           | 88.3         |

Share of 231 JevBench questions answered correctly.

**Dataset**

231 JevBench questions: classic decision tasks that can be answered from the input alone, without looking anything up on the web.

**Evaluation methodology**

Shown for contrast with PWS-Decisions, as reported in the [PWS-Decisions launch post](/blog/pws-decisions-benchmark). On these self-contained tasks all three decision APIs score within two points of each other. The gap opens on PWS-Decisions, where answers depend on the live web: OpenAI Decisions drops from 90.0% to 41.7% and TypeSafe Jev from 88.3% to 33.4%, while the Parallel Decisions API scores 76.2%.

**Testing dates**

Results published in November 2026.

## Parallel for Finance

### FinSearchComp T3

| Series   | Model                    | Cost (CPM) | Accuracy (%) |
| -------- | ------------------------ | ---------- | ------------ |
| Parallel | Parallel Fast            | 15.2       | 53.7         |
| Parallel | Parallel Advanced        | 161.1      | 57.4         |
| Others   | Exa Auto                 | 226.2      | 51.4         |
| Others   | OpenAI native search     | 204.3      | 48.3         |
| Others   | Perplexity Finance + Web | 347        | 50           |
| Others   | Tavily                   | 481.8      | 43           |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

[FinSearchComp](https://arxiv.org/abs/2509.13160) has 635 questions, written by 70 financial experts, that reproduce analyst work across global and Greater China markets. T3 is the complex historical investigation tier, the hardest in the benchmark; results are reported on the 172 graded questions.

**Evaluation methodology**

Multi-step agentic evaluation: every search API runs in the same agent loop with the same questions and the same LLM judge, so the search layer is the only variable. The agent calls the provider's search tool plus its fetch tool where one exists. Parallel Advanced, Exa Auto, OpenAI native search, Perplexity and Tavily answer with GPT-6 Sol (reasoning: high); Parallel Fast runs as the low-latency stack with GPT-6 Luna (reasoning: high). Scores are the mean of three runs unless noted. The benchmark's answers are published online. For the other search APIs, our harness drops those copies before the model sees them. OpenAI native search answers that came from published copies count as wrong (OpenAI native search scores 64.0 before that adjustment). Tavily is a single run.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run on October 22, 2026 (Tavily on October 28, 2026).

### FinSearchComp T2

| Series   | Model                    | Cost (CPM) | Accuracy (%) |
| -------- | ------------------------ | ---------- | ------------ |
| Parallel | Parallel Fast            | 3.3        | 77.5         |
| Parallel | Parallel Advanced        | 35.1       | 79.9         |
| Others   | Exa Auto                 | 69.9       | 77.9         |
| Others   | OpenAI native search     | 70.2       | 77.9         |
| Others   | Perplexity Finance + Web | 104.6      | 79.7         |
| Others   | Tavily                   | 169        | 77.2         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

[FinSearchComp](https://arxiv.org/abs/2509.13160) has 635 questions, written by 70 financial experts, that reproduce analyst work across global and Greater China markets. T2 is the simple historical lookup tier; results are reported on the 219 graded questions.

**Evaluation methodology**

Multi-step agentic evaluation: every search API runs in the same agent loop with the same questions and the same LLM judge, so the search layer is the only variable. The agent calls the provider's search tool plus its fetch tool where one exists. Parallel Advanced, Exa Auto, OpenAI native search, Perplexity and Tavily answer with GPT-6 Sol (reasoning: high); Parallel Fast runs as the low-latency stack with GPT-6 Luna (reasoning: high). Scores are the mean of three runs unless noted. The benchmark's answers are published online. For the other search APIs, our harness drops those copies before the model sees them. OpenAI native search answers that came from published copies count as wrong (OpenAI native search scores 82.8 before that adjustment). Tavily is a single run.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run on October 22, 2026 (Tavily on October 28, 2026).

### FrontierFinance

| Series   | Model                 | Cost (CPM) | Score (%) |
| -------- | --------------------- | ---------- | --------- |
| Parallel | Parallel Fast         | 201.5      | 46        |
| Parallel | Parallel Advanced     | 234.2      | 46.8      |
| Others   | Exa Auto              | 376.3      | 47.2      |
| Others   | OpenAI native search  | 298.7      | 45        |
| Others   | Perplexity Search API | 254.3      | 44.3      |
| Others   | Tavily                | 470.3      | 42.1      |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

Samaya's [FrontierFinance](https://arxiv.org/abs/2608.11683) has 220 expert-written research queries covering the investment workflow from screening and company research to earnings, modeling and catalyst monitoring. Answers are long-form; a panel of three judges scores each one against expert rubrics, and the score is the rubric pass rate by judge majority.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same judges, with a budget of 20 tool calls per question. All arms, including Parallel Fast, answer with GPT-6 Sol (reasoning: high). Parallel runs through its hosted search and fetch tools; Exa, OpenAI and Tavily use search plus fetch; Perplexity is the Search API only, with no fetch tool. One run per arm.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run on October 27, 2026.

### PWS-Finance

| Series   | Model                 | Cost (CPM) | Accuracy (%) |
| -------- | --------------------- | ---------- | ------------ |
| Parallel | Parallel Fast         | 110.3      | 83           |
| Parallel | Parallel Advanced     | 125.5      | 84.3         |
| Others   | Exa Auto              | 197.6      | 75.9         |
| Others   | OpenAI native search  | 180.7      | 83.7         |
| Others   | Perplexity Search API | 121.9      | 74.3         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

PWS-Finance is Parallel's private finance benchmark: 174 held-out questions across eight finance workflows (company profiles, funding, deals, ownership, public financials, regulation, markets and macro, developments), each asking for specific facts about one entity as of one date. The questions and answers are not published anywhere online.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same LLM judge, with a budget of 20 tool calls per question. All arms, including Parallel Fast, answer with GPT-6 Sol (reasoning: high). Strict scoring: an answer is correct only if every required fact is right. Perplexity is the Search API only, not Finance + Web. Tavily is not plotted: it ran with the model's date filters on (98% of searches limited to the past year) and hit the 20-call cap on 77% of questions, so its 36.4% at $432.10 CPM is not comparable to the other arms. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run on October 27, 2026.

## Parallel for Healthcare

### PWS-Health

| Series   | Model                | Cost (CPM) | Accuracy (%) |
| -------- | -------------------- | ---------- | ------------ |
| Parallel | Parallel Fast        | 104        | 85.2         |
| Parallel | Parallel Advanced    | 85.3       | 83.7         |
| Others   | Exa                  | 124.6      | 82.5         |
| Others   | Perplexity           | 116.2      | 80.5         |
| Others   | Tavily               | 154.3      | 77.2         |
| Others   | Claude native search | 646        | 66.9         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

PWS-Health is Parallel's private healthcare benchmark: 133 held-out questions with verified answers. 83 are adapted from questions healthcare teams ask Parallel across 10 workflows, and 50 are drawn from recent open-access randomized trials and meta-analyses in PubMed Central. The questions and answers are not published anywhere online.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same LLM judge, so the search layer is the only variable. Every arm answers with Claude Opus 5.5 (high effort). Claude native search is Claude Opus 5.5's built-in web search. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run in November 2026.

### LitQA3

| Series   | Model                | Cost (CPM) | Accuracy (%) |
| -------- | -------------------- | ---------- | ------------ |
| Parallel | Parallel Fast        | 58.8       | 86.7         |
| Parallel | Parallel Advanced    | 48.8       | 86.7         |
| Others   | Exa                  | 126.3      | 81           |
| Others   | Tavily               | 117.7      | 79.2         |
| Others   | Perplexity           | 73.7       | 79           |
| Others   | Claude native search | 352.3      | 78.2         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

LitQA3 is part of FutureHouse's LAB-Bench 2\. Each of its 168 questions asks for a specific detail from a recent biomedical paper, such as an effect size in a results table or a step in a methods section, so the engine has to find the right paper and pinpoint the answer.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same grader, so the search layer is the only variable. Every arm answers with Claude Opus 5.5 (high effort). Claude native search is Claude Opus 5.5's built-in web search. The benchmark's own grader fails on some biology answers, so we re-graded those with the benchmark's prompt for every arm. Answers that reached a published answer key count as wrong. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run in November 2026.

### TrialQA

| Series   | Model                | Cost (CPM) | Accuracy (%) |
| -------- | -------------------- | ---------- | ------------ |
| Parallel | Parallel Fast        | 57.7       | 96.3         |
| Parallel | Parallel Advanced    | 46.9       | 95.2         |
| Others   | Perplexity           | 69.3       | 95.2         |
| Others   | Exa                  | 66.1       | 94.1         |
| Others   | Tavily               | 146.8      | 91.2         |
| Others   | Claude native search | 498.7      | 79.7         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

TrialQA, also from LAB-Bench 2, asks for details teams look up in the ClinicalTrials.gov registry, such as a study's control arm, primary endpoint or planned enrollment. Two answer keys no longer matched the registry, so we updated them; two ambiguous questions were set aside, leaving 118.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same grader, so the search layer is the only variable. Every arm answers with Claude Opus 5.5 (high effort). Claude native search is Claude Opus 5.5's built-in web search. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run in November 2026.

### MedBrowseComp

| Series   | Model                | Cost (CPM) | Accuracy (%) |
| -------- | -------------------- | ---------- | ------------ |
| Parallel | Parallel Fast        | 131.9      | 78.8         |
| Parallel | Parallel Advanced    | 107.9      | 79.3         |
| Others   | Perplexity           | 141.2      | 76.6         |
| Others   | Exa                  | 118.9      | 74.3         |
| Others   | Tavily               | 187.2      | 72.7         |
| Others   | Claude native search | 703.3      | 66.7         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

MedBrowseComp asks multi-hop questions about FDA drug approvals that take several searches across regulatory, clinical and corporate sources. Company questions were re-keyed against FDA records to accept either reading of "latest approval", and patent and exclusivity questions with more than one valid answer were set aside, leaving 363 questions.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same grader, so the search layer is the only variable. Every arm answers with Claude Opus 5.5 (high effort). Claude native search is Claude Opus 5.5's built-in web search; answers that reached the published answer file count as wrong. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions.

**Testing dates**

Evals were run in November 2026.

## Parallel for Legal

### PWS-Legal

| Series   | Model             | Cost (CPM) | Accuracy (%) |
| -------- | ----------------- | ---------- | ------------ |
| Parallel | Parallel Fast     | 230.1      | 85.4         |
| Parallel | Parallel Advanced | 194.2      | 83.1         |
| Others   | OpenAI            | 440.8      | 80.5         |
| Others   | Firecrawl         | 314.4      | 77.3         |
| Others   | Exa Auto          | 318.9      | 75.6         |
| Others   | Tavily            | 425.7      | 75.4         |
| Others   | Perplexity        | 248        | 73.4         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

PWS-Legal is Parallel's private legal benchmark: 238 held-out questions with verified answers. 98 cover the companies, laws, regulations and IP rights legal researchers look up (60 about jurisdictions outside the US, 33 in 12 languages other than English), and 140 cover court decisions and legal documents on sites that general web search reaches poorly. The questions and answers are not published anywhere online.

**Evaluation methodology**

Every search API runs in the same agent loop with the same questions and the same LLM judge, with a budget of 20 tool calls per question, so the search layer is the only variable. Every arm answers with GPT-6 Astra (reasoning: high). Each API uses its own published tool definition at default settings, with 10 results per search; Perplexity is the Search API only. Firecrawl uses Firecrawl's own MCP search and scrape tools. Strict scoring: an answer is correct only if every required fact is right. Scores are the mean of three runs (Firecrawl is a single run).

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions. Firecrawl is priced at Standard-plan credits at one credit per scraped page; PDFs bill per page, so its real cost is higher.

**Testing dates**

Evals were run in November 2026.

### Legal Hallucinations

| Series   | Model             | Cost (CPM) | Accuracy (%) |
| -------- | ----------------- | ---------- | ------------ |
| Parallel | Parallel Fast     | 20.01      | 96.5         |
| Parallel | Parallel Advanced | 21.69      | 96.8         |
| Others   | Exa Auto          | 28.12      | 96.8         |
| Others   | OpenAI            | 43.79      | 97.5         |
| Others   | Perplexity        | 20.11      | 94           |
| Others   | Firecrawl         | 22.47      | 95.4         |
| Others   | Tavily            | 86.64      | 90.1         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

Stanford RegLab's [Legal Hallucinations](https://arxiv.org/abs/2401.01301) dataset (Dahl et al., 2024) asks verifiable questions about real federal court cases, such as the citation, the court, the author, and whether the case exists. The original study found that LLMs answering without search hallucinated 58–88% of the time. Results are reported on a 284-question sample.

**Evaluation methodology**

Multi-step agentic evaluation: every search API runs in the same agent loop with the same questions and the same LLM judge, so the search layer is the only variable. The agent calls the provider's search tool plus its fetch tool as often as needed, and every arm answers with GPT-6 Sol (reasoning: high). Each API uses its own published tool definition at default settings, with 10 results per search; Exa runs in auto mode with an objective. Firecrawl uses Firecrawl's own MCP search tools, including its Government Index of US law. Results that copy the benchmark are removed before the model sees them; OpenAI native search can't be filtered this way, so its results were audited afterwards. Scores are from a single run.

Cost is end-to-end per answer at list price: the answer model's tokens plus every search and fetch the agent makes, shown per 1,000 questions. Firecrawl is priced at Standard-plan credits.

**Testing dates**

Evals were run in November 2026.

### LegalBench Citation

| Series   | Model             | Cost (CPM) | Accuracy (%) |
| -------- | ----------------- | ---------- | ------------ |
| Parallel | Parallel Fast     | 15.02      | 93.6         |
| Parallel | Parallel Advanced | 16.54      | 93.8         |
| Others   | Perplexity        | 16.52      | 87.2         |
| Others   | Exa Auto          | 23.17      | 79.7         |
| Others   | Tavily            | 27.92      | 74.7         |
| Others   | Firecrawl         | 8.05       | 63.1         |

CPM: USD per 1,000 questions, end to end (answer-model tokens plus search and fetch calls at list price).

**Dataset**

[LegalBench](https://arxiv.org/abs/2308.11462) (Guha et al., 2023) is a benchmark of 162 legal reasoning tasks designed by legal professionals at Stanford and other institutions. We ran the 161 questions in its citation tasks, which ask which case a federal appeals court cited for a legal proposition, and whether a given case supports it.

**Evaluation methodology**

One-search evaluation: every search API gets a single search call per question, then the model answers, with the same questions and the same LLM judge, so the search layer is the only variable. Every arm answers with GPT-6 Sol (reasoning: high). Each API uses its own published tool definition at default settings, with 10 results per search; Exa runs in auto mode with an objective. Firecrawl uses Firecrawl's own MCP search tools, including its Government Index of US law. Results that copy the benchmark are removed before the model sees them. Scores are the mean of three runs.

Cost is end-to-end per answer at list price: the answer model's tokens plus the search call, shown per 1,000 questions. Firecrawl is priced at Standard-plan credits.

**Testing dates**

Evals were run in November 2026.

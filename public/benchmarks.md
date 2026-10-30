# Parallel Quality Benchmarks

Give your AI the highest-quality web search tools available

When building applications that rely on web data to make decisions or answer questions, nothing matters more than accuracy. These benchmarks help to measure different web search offerings on their ability to answer prompts accurately. By obsessing over accuracy, we consistently lead the market with state-of-the-art quality. In addition to leading in accuracy, Parallel often leads in pricing. 

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

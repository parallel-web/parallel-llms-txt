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

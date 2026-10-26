# BrowseComp explained: what it measures and how search APIs compare

BrowseComp is OpenAI's benchmark for whether an AI agent can track down hard-to-find facts on the open web, and it has become the main stress test for search APIs that feed agents. This guide covers how the questions were built, how answers are graded, how search APIs and research agents score on it today, and how to run it yourself.

BrowseComp is a benchmark of 1,266 hard, fact-seeking questions that OpenAI released on April 10, 2025 to measure how well AI agents browse the web. Each question has one short answer that is easy to check but buried behind several linked constraints, so an agent has to search persistently, follow many leads, and combine clues from different pages before it can answer. The name is short for "Browsing Competition."

We make Parallel, a web search API for AI agents, and we publish BrowseComp results for our own products below, so read with that in mind. Where other providers score higher, the tables say so.

## What the BrowseComp benchmark measures

The paper ([arXiv 2504.12516](https://arxiv.org/abs/2504.12516), by Jason Wei, Zhiqing Sun, and eight co-authors at OpenAI) positions BrowseComp as the harder successor to SimpleQA. SimpleQA asks for isolated facts, and the authors note that models with fast browsing tools had already saturated it. BrowseComp asks for facts that are "hard-to-find" and "entangled": the answer only falls out after you combine several properties that each have a large search space.

The authors compare it to programming competitions for coding agents. A model that does well on Codeforces is probably a strong coder, but that isn't guaranteed to carry over to every coding task. In the same way, BrowseComp tests persistence, creative search strategy, and judgment about which web content is factual, and it deliberately skips long answers and ambiguous requests.

## How the questions were built

OpenAI's human trainers wrote the questions under rules borrowed from SimpleQA: a single, indisputable, short answer that won't change over time and is backed by evidence. What makes BrowseComp different is the construction method. Trainers were encouraged to start from a fact and write an "inverted" question, where the answer is hard to find but easy to verify. In practice a trainer picked a seed (a person, event, or artifact), listed several of its characteristics that each match many candidates, and asked for the thing that satisfies all of them at once.

Each question also had to pass difficulty checks:

1. GPT-4o (with and without browsing), o1, and an early version of OpenAI's deep research model could not solve it.
2. Five simple searches did not surface the answer on the first page of results.
3. Another person should not be able to solve it within ten minutes. This was spot-checked by a second trainer on a portion of questions, and trainers whose questions were solved more than 40% of the time were asked to revise them.

The inverted method has a known weakness, which the paper states directly. The question writer knows their reference answer is correct but cannot prove no other answer fits. Trainers were told to add constraints until they were confident the answer was unique.

## Example question types

OpenAI asks that examples from the dataset not be posted in plain text online, to limit leakage into training data, so we won't reproduce test items here. The exemplar OpenAI gave its trainers is public, though, and shows the shape well:

> Give me the title of the scientific paper published in the EMNLP conference between 2018-2023 where the first author did their undergrad at Dartmouth College and the fourth author did their undergrad at University of Pennsylvania.

Verifying a proposed answer takes a few searches. Finding it from scratch means scanning thousands of papers and checking author biographies. The paper's published examples follow the same pattern: a soccer match identified only by referee nationality, card counts, and substitution timing, or a fictional character identified by a cluster of traits and the run length of a TV show.

## How BrowseComp is scored

Scoring is plain accuracy. The model is prompted to return an explanation, an exact answer, and a confidence score from 0% to 100%. A grader model then compares the extracted answer with the reference answer for semantic equivalence, using the same judge prompt as Humanity's Last Exam. Numeric answers get a small margin of error; anything ambiguous or non-equivalent is marked wrong.

The paper also reports calibration error from those confidence scores. Browsing made calibration worse. GPT-4o with browsing had 82% calibration error versus 69% without, and Deep Research had 91%. Access to web tools seems to make models more confident in wrong answers.

The reference implementation lives in OpenAI's [simple-evals](https://github.com/openai/simple-evals) repository. Questions and answers in the CSV are XOR-encrypted with a per-row canary string, and the paper includes the canary GUID so training pipelines can filter the data out.

## Baseline results from the 2025 paper

These are the paper's own numbers from April 2025, on all 1,266 questions. They're useful as history but say little about current models.

| Model (April 2025) | Accuracy | Calibration error |
| --- | --- | --- |
| GPT-4o | 0.6% | 69% |
| GPT-4o with browsing | 1.9% | 82% |
| GPT-4.5 | 0.9% | 68% |
| OpenAI o1 | 9.9% | 65% |
| Deep Research | 51.5% | 91% |

OpenAI notes that Deep Research was trained on data that specifically teaches BrowseComp-style tasks. Humans did poorly too. Of 1,255 questions attempted in the verification campaign, trainers gave up on 888 (70.8%) after about two hours and solved 367 (29.2%). On the solved ones, the trainer's answer matched the reference 86.4% of the time.

Two findings from the paper still shape how people use the benchmark. Accuracy scales smoothly with test-time compute: more browsing effort per question produced higher scores. And sampling 64 answers per question, then picking one by majority vote, confidence-weighted vote, or best-of-N, improved performance by 15% to 25% over a single attempt, with best-of-N highest. Because answers are easy to verify once found, a model can often tell when it has the right one.

The paper also shows how uneven the questions are. Across 64 trials per question, Deep Research solved 16% of tasks every time and 14% never. BrowseComp originally had 1,287 questions; OpenAI removed 21 with bad or ambiguous labels after reviewing the ones Deep Research never solved, which is how it arrived at 1,266.

## Why the search tool matters more on BrowseComp

On a single-fact benchmark, one decent search usually finds the answer and the model does the rest. BrowseComp questions need many hops. Each hop narrows a candidate set (papers from a venue, then authors with a given background), and a weak result at any hop sends the agent down a dead end that costs tokens and time. The search layer shows up in the score in several ways:

- **Recall on narrow queries.** The agent issues dozens of specific queries. If the right page isn't in the top results, the agent never sees it.
- **Excerpt quality.** Agents read excerpts, not whole pages. Excerpts that contain the constraining detail (a birth year, an undergraduate school) let the agent confirm or discard a candidate without an extra fetch.
- **Cost per call.** Persistence means many calls, so search price and the tokens each result adds to context both multiply.

This is why BrowseComp separates search providers more than SimpleQA-style benchmarks do. In the Artificial Analysis Search Index, the same model scores 17 on BrowseComp with no search tool, and 73 to 87 with the providers listed below.

## How search APIs compare on BrowseComp

The three sets of numbers below measure different things, so don't compare across them.

### Search APIs in an agent loop (parallel.ai/benchmarks, September 9, 2026)

On our [benchmarks page](https://parallel.ai/benchmarks), we ran a 50-question BrowseComp sample at two price tiers. The frontier tier uses a GPT-5.6 Sol agent (high reasoning) with Parallel Basic and Advanced. The low-cost tier uses a GPT-5.6 Luna agent (low reasoning) with Parallel Fast and Turbo. Every competitor ran at both tiers with the same agent, calling its search tool plus its extract tool where one exists. An LLM judge graded answers. Cost is USD per 1,000 questions, including LLM tokens and tool calls.

| Provider and tier | BrowseComp accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced (frontier) | 74% | $399 |
| Perplexity (frontier) | 74% | $275 |
| Parallel Basic (frontier) | 72% | $612 |
| Exa Auto (frontier) | 70% | $971 |
| Tavily (frontier) | 66% | $935 |
| Perplexity (low-cost) | 46% | $37.1 |
| Parallel Fast (low-cost) | 44% | $11.8 |
| Exa Auto (low-cost) | 36% | $53.4 |
| Parallel Turbo (low-cost) | 32% | $13.2 |
| Tavily (low-cost) | 32% | $176 |

At the frontier tier, Parallel Advanced ties Perplexity at 74%, and Perplexity gets there for less. At the low-cost tier, Perplexity edges Parallel Fast, 46% to 44%, while Fast costs about a third as much. Turbo is tuned for latency and scores lowest of the Parallel modes on this many-hop task.

### Deep-research agents (Task API, August 26, 2026)

The Task API is a different product. It runs a full research agent behind one call rather than handing results to your agent, so compare it with other research agents, not with search endpoints. These runs used a fixed 100-question subset.

| System | BrowseComp accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Ultra4x | 94% | $1,200 |
| Parallel Ultra2x | 93% | $600 |
| Parallel Ultra | 92% | $300 |
| Parallel Core | 91% | $25 |
| Parallel Lite | 88% | $5 |
| Perplexity (high) | 86% | $441.5 |
| GPT-5.6 Sol PTC (max) | 85% | $791.1 |
| Exa Agent Max | 78% | $1,043.5 |
| Gemini 3.1 Pro (high) | 72% | $194.4 |

### Independent: Artificial Analysis Search Index (October 19, 2026 data)

[Artificial Analysis](https://artificialanalysis.ai/agents/search-api) holds the model, harness, and settings fixed and swaps only the search API. Its BrowseComp column uses a 200-question panel and feeds into a composite index alongside DeepSearchQA and AA-Omniscience.

| Search API (AA setting) | BrowseComp |
| --- | --- |
| Perplexity Search (medium) | 87 |
| Perplexity Search (high) | 86 |
| Octen Search (highlights) | 86 |
| Exa Search (auto, dynamic highlights) | 83 |
| Exa Search (lite, dynamic highlights) | 81 |
| Parallel Search (advanced) | 77 |
| Brave Search (LLM context) | 77 |
| You.com (highlights) | 77 |
| Nimble (standard) | 75 |
| OpenAI Web Search (medium) | 74 |
| Firecrawl | 74 |
| Parallel Search (basic) | 73 |
| No search (model only) | 17 |

On this board Perplexity medium leads BrowseComp at 87, ten points ahead of Parallel advanced at 77. On the overall index, Parallel Search (advanced) scores 75, level with Brave's LLM context mode and behind Exa's auto mode and Perplexity Search (medium), which lead at 80. For the full write-up of our runs, see [our BrowseComp benchmark report](https://parallel.ai/articles/most-powerful-search-api-for-ai).

### Read small samples with care

None of these runs uses all 1,266 questions. For a score near 70%, the standard error of an accuracy estimate is about 6.5 points at 50 questions, 4.6 points at 100, and 3.2 points at 200. A two-point gap on a 50-question sample (46% vs 44%) is well inside the noise, while the ten-point AA gap on 200 questions is large enough to take seriously. Different samples, agents, judges, and dates also explain why the same provider can score 74 in one table and 87 in another.

## Limitations, contamination, and saturation

**Contamination.** OpenAI encrypted the dataset and published a canary string, but questions still leak. When we ran the snippet below, the top results for the trainer exemplar included a tweet and a blog post quoting the question verbatim. Test-set items can leak the same way, and a search engine that indexes those pages can hand an agent the answer without any real browsing.

**Narrow scope.** BrowseComp measures finding one short fact. It says little about long-form synthesis, freshness, or ambiguous user requests. Pair it with [WideSearch](https://parallel.ai/articles/widesearch-benchmark) for breadth and [SimpleQA](https://parallel.ai/articles/simpleqa-benchmark) for single-hop accuracy.

**Saturation.** Deep Research scored 51.5% in April 2025. The best deep-research systems in the Task API table now score in the 90s on a 100-question subset, so the headroom at the top is shrinking. Search-endpoint scores at the low-cost tier sit in the 30s and 40s, so the benchmark still separates cheaper setups.

## Variants: BrowseComp-Plus and BrowseComp-ZH

**BrowseComp-Plus** ([arXiv 2508.06600](https://arxiv.org/abs/2508.06600), submitted August 8, 2025, by Zijian Chen, Xueguang Ma, and 18 co-authors including Jimmy Lin; accepted to ACL 2026) replaces the live web with a fixed corpus. It keeps 830 BrowseComp queries and pairs them with 100,195 documents: human-verified evidence documents plus mined hard negatives. Because the corpus is fixed, you can test a retriever and an agent separately and get reproducible results. In the paper, the open-source Search-R1 with a BM25 retriever scored 3.86%, GPT-5 scored 55.9%, and GPT-5 with the Qwen3-Embedding-8B retriever reached 70.1% with fewer search calls. It gives up some realism in exchange, since it tests retrieval over a 100K-document corpus rather than the open web.

**BrowseComp-ZH** ([arXiv 2504.19314](https://arxiv.org/abs/2504.19314), April 27, 2025) has 289 multi-hop questions written natively for the Chinese web, across 11 domains. In the original paper the best system, OpenAI's DeepResearch, reached 42.9%.

## How to run BrowseComp yourself

The reference harness is `browsecomp_eval.py` in [openai/simple-evals](https://github.com/openai/simple-evals). It downloads the encrypted CSV, decrypts each row with its canary, sends the question to your sampler with the explanation/answer/confidence template, and grades with a judge model. The `num_examples` argument draws a seeded random subset for a cheaper run.

To compare search providers, wrap each one as a tool, keep the agent model, reasoning effort, and turn limit fixed, and log cost per question along with accuracy. Our [evaluation methodology](https://parallel.ai/articles/how-we-evaluate-web-search-apis) and [guide to benchmarking search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) cover the harness choices that move scores most.

A single tool call inside such a loop looks like this. It uses the public trainer exemplar, not a test item, and turns the constraints into an objective plus a few narrow queries. One call rarely solves a BrowseComp question; the agent reads the excerpts, forms candidates, and searches again.

```python
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY

# One step of a BrowseComp-style loop: the agent has turned a multi-constraint
# question into an objective plus a few narrow keyword queries.
question = (
    "Title of the EMNLP paper (2018-2023) whose first author did their undergrad "
    "at Dartmouth College and whose fourth author did their undergrad at the "
    "University of Pennsylvania."
)

result = client.search(
    mode="advanced",  # or "fast" for the low-cost tier
    objective=question,
    search_queries=[
        "EMNLP paper first author Dartmouth undergraduate",
        "EMNLP authors Dartmouth undergrad Penn undergrad",
        "Dartmouth College alumni NLP researcher EMNLP",
    ],
)

for r in result.results[:5]:
    excerpt = " ".join(r.excerpts or [])[:200]
    print(r.url)
    print("  ", excerpt.replace("\n", " "), "\n")
```

Install the SDK with `pip install parallel-web`. Advanced mode costs $5 per 1,000 requests and Fast costs $1, with up to $80 in free credits to start.

## Frequently asked questions

### How many questions are in BrowseComp?

1,266. The set started at 1,287, and OpenAI removed 21 questions with incorrect or ambiguous labels before release.

### What is a good BrowseComp score?

It depends on the setup. In the 2025 paper, GPT-4o with browsing scored 1.9% and Deep Research 51.5%. In current agent-plus-search runs, frontier-tier setups score in the 70s and low-cost setups in the 30s and 40s, while dedicated deep-research systems range from 72% to 94% on a 100-question subset.

### What is the difference between BrowseComp and BrowseComp-Plus?

BrowseComp runs against the live web. BrowseComp-Plus uses 830 of its questions with a fixed corpus of about 100,000 documents, so retrievers and agents can be compared reproducibly.

### Can humans solve BrowseComp?

Mostly not within a few hours. OpenAI's trainers solved 29.2% of attempted questions and gave up on 70.8% after about two hours.

Related: [SimpleQA benchmark](https://parallel.ai/articles/simpleqa-benchmark), [WideSearch benchmark](https://parallel.ai/articles/widesearch-benchmark), [DeepSearchQA benchmark](https://parallel.ai/articles/deepsearchqa-benchmark), and [our BrowseComp benchmark report](https://parallel.ai/articles/most-powerful-search-api-for-ai).

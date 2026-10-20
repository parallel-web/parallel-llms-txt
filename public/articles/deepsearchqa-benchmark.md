# DeepSearchQA explained: how deep research agents are scored

DeepSearchQA is Google DeepMind's benchmark for deep research agents, and it asks whether an agent can return a complete, correct list of answers instead of one lucky fact. This guide covers how the 900 prompts are built, how set-based F1 and fully correct scoring work, the benchmark's known limits, and where Parallel and other providers land on it.

DeepSearchQA is a deep research benchmark from Google DeepMind, released on December 11, 2025 alongside the Gemini Deep Research agent. It contains 900 hand-written prompts across 17 fields, and most of them ask for a complete set of answers rather than a single fact. An agent scores well only if it finds every item on the list and adds nothing that doesn't belong.

We make Parallel, a web search and deep research API, and we publish our own DeepSearchQA results below, so read with that in mind. Where other providers score higher, the tables say so.

## What DeepSearchQA measures

The paper, [DeepSearchQA: Bridging the Comprehensiveness Gap for Deep Research Agents](https://arxiv.org/abs/2601.20975) (arXiv:2601.20975), names the problem it targets the "Comprehensiveness Gap." Earlier factuality benchmarks such as SimpleQA reward an agent for finding one correct answer. Many real research requests are lists: every company that meets a filing condition, every airport whose ranking moved, every country that clears a threshold. An agent tuned to stop at the first good hit will look strong on single-answer benchmarks and weak on these.

The authors say the benchmark is meant to test three skills:

- Collating fragmented information from many sources into one answer.
- De-duplicating and resolving entities so the same item isn't counted twice.
- Deciding when to stop searching in an open-ended space.

Each task is built as a "causal chain," where one step's result is needed to start the next. A prompt might require finding a dataset, filtering it by two conditions, and then looking up an attribute for every row that survives. Losing track of a constraint halfway through produces a wrong list even if every individual lookup was right.

## How the dataset is built

The public release on [Hugging Face](https://huggingface.co/datasets/google/deepsearchqa) and [Kaggle](https://www.kaggle.com/datasets/deepmind/deepsearchqa) is a single 900-row CSV under an Apache 2.0 license. Each row has four fields: the `problem`, a `problem_category`, the gold `answer`, and an `answer_type`. The dataset card says the answer type should not be shown to the model at inference time, since knowing whether a list is expected is part of the test.

Counting the CSV ourselves on October 19, 2026, 584 prompts are "Set Answer" and 316 are "Single Answer," which matches the card's statement that 65% are set answers. The largest categories are Politics & Government (148), Finance & Economics (132), Geography (95), Education (94), Health (92), and Science (90).

The paper splits answers into two types:

- **Single answer.** One entity or value, such as a date or a name. These still need deep research because the data is obscure or the web has conflicting versions.
- **Set answer.** A collection of items, either an enumeration (list everything matching a constraint) or a composite answer to several sub-questions.

Expert annotators wrote the prompts. Three reviewers independently researched each answer and compared it with the curator's, and ambiguous prompts were dropped. Every prompt is time-anchored or tied to a static source ("According to the 2020 Census...") so the ground truth doesn't drift as the web changes.

### Example prompts

The paper publishes a few full prompts in its failure-mode table. One asks for the IATA codes of US major airports, as classified by the Department of Transportation, whose On-Time Arrival ranking improved by at least one position from 2023 to 2024 and whose 2024 on-time percentage was between 77.0% and 81.5%, using Bureau of Transportation Statistics data. Another asks which EU country that doesn't touch the Mediterranean had the least annual goods transport in 2022 across air, sea, inland waterway, rail, and road, counting only countries that used all five modes.

The first is a set answer that needs one data source, two filters, and a code lookup for each survivor. The second is a single answer that still requires assembling a full table before ranking it. In the paper, GPT-5 Pro found an Excel file that appeared to hold the airport data, said it couldn't open it, and stopped. Gemini Deep Research Agent kept searching other sources and got the answer partially correct.

## How DeepSearchQA is scored

Scoring is outcome-based. The grader looks only at the final set of answers, not the search trajectory. For prompt _i_, let S be the set the agent submits and G the gold set.

- **Precision** is the share of submitted items that are correct: |S ∩ G| / |S|.
- **Recall** is the share of gold items the agent found: |S ∩ G| / |G|.
- **F1** is the harmonic mean of the two. It's computed per prompt and averaged across the set, and it's the primary ranking metric.

For single-answer prompts, F1 reduces to exact match, 1 or 0. For set answers, F1 gives partial credit but penalizes padding: an agent that lists twenty guesses to catch four true items pays for it in precision.

The paper also sorts every response into one of four categories:

| Category | Definition | What it usually means |
| --- | --- | --- |
| Fully correct | S = G | Every gold item found, no extras |
| Fully incorrect | S ∩ G is empty | No correct items at all |
| Partially correct | Some gold items found, but not all | Usually stopped too early (set answers only) |
| Correct with extraneous answers | All gold items found plus wrong ones | Hedging; treated as a failure on single-answer prompts |

Semantic equivalence between a submitted item and a gold item is judged by an LLM. The paper uses Gemini 2.5 Flash zero-shot with the prompt in its appendix, and the dataset card warns that a different autorater model or grading prompt will "likely result in statistically significant deviation in results."

The gap between F1 and fully correct is the paper's most useful finding. In its Kaggle-evaluated results table, Gemini Deep Research Agent scored 81.90 F1 but only 66.09% fully correct; GPT-5 Pro (high reasoning) scored 78.98 F1 and 65.18% fully correct. The authors call this roughly 15-point gap the "Last Mile Problem": agents get most of the list and then miss one item or include one too many. These are the paper's own numbers for models that have since been replaced.

## Why set answers reward recall and stopping criteria

A single-answer benchmark lets an agent stop the moment it finds a plausible answer. DeepSearchQA removes that shortcut for 65% of prompts. Stopping after three of four items caps recall at 0.75. Continuing to add borderline items to be safe lowers precision. In our toy example below, both mistakes land near 0.86 to 0.89 F1, and neither counts as fully correct.

For agent design, this means:

- **Search breadth has to be planned.** The agent needs to recognize when a question defines a population ("all airports that...") and go find the authoritative source for that population, not a handful of mentions.
- **Verification is a separate step.** Every candidate should be checked against every constraint before it goes in the answer. The paper's failure table includes a case where a top model failed to filter data points by the prompt's requirements, which it describes as a breakdown in stopping criteria.
- **Stopping should be explicit.** An agent that knows the expected size of a set (from a source table or a stated count) can stop with confidence. One that doesn't will either quit early or keep padding.
- **Deduplication matters.** "U.S. Department of Transportation" and "DOT" are one entity. Counting them twice costs precision.

The Gemini blog post adds that DeepSearchQA showed large gains from more "thinking time," and that pass@8 beat pass@1 on a 200-prompt subset. Spending more compute on exploration and cross-checking pays off on this benchmark more than on single-fact ones.

## Limitations

The dataset card lists two limitations. Because grading ignores the trajectory, a lucky guess and a careful derivation score the same. And although prompts are time-anchored, a gold answer can go stale if a source site is removed or rewritten, which requires periodic manual review.

Two more are worth adding. The full 900 prompts and answers are public on Hugging Face and Kaggle, so contamination is a real risk for models trained after December 2025. The public release has no held-out split. And because the LLM judge decides equivalence, scores are only comparable when the same grader and prompt are used. A run graded by a different model isn't the same number.

## How Parallel and other providers score on DeepSearchQA

Two different kinds of DeepSearchQA result exist for Parallel, and they measure different products. They shouldn't be compared with each other.

### Deep research agents (Task API)

The [Parallel benchmarks page](https://parallel.ai/benchmarks) reports Task API results on a fixed 100-question DeepSearchQA subset, all tested August 26, 2026. The Task API is a full deep research agent, so each row is an end-to-end system. Cost is measured spend per 1,000 questions.

| System (August 26, 2026, 100-question subset) | Accuracy | Cost per 1,000 queries |
| --- | --- | --- |
| Parallel Ultra4x | 86% | $1,200 |
| Parallel Ultra2x | 85% | $600 |
| GPT-5.6 Sol PTC (max) | 85% | $1,047.8 |
| Parallel Pro | 83% | $100 |
| Parallel Core2x | 81% | $50 |
| Parallel Base | 77% | $10 |
| Gemini 3.1 Pro (high) | 77% | $123.9 |
| Parallel Lite | 76% | $5 |
| Perplexity (high) | 68% | $371.9 |
| Exa Agent Max | 65% | $1,506.5 |

Parallel Ultra4x has the top score, but the margin over the best frontier model is small. GPT-5.6 Sol PTC at max settings reaches 85%, the same as Ultra2x, at $1,047.8 per 1,000 against $600. Gemini 3.1 Pro (high) reaches 77%, the same as Parallel Base, at $123.9 against $10. The clearer differences are on cost at a given accuracy, and against Perplexity and Exa's agent products, which land at 68% and 65%. For a broader comparison of these products see [best deep research APIs](https://parallel.ai/articles/best-deep-research-apis).

### Search APIs as a tool (Artificial Analysis)

The [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) tests something else. It gives the same model, harness, and settings to every provider and swaps only the search API. DeepSearchQA is one of its three components, run on the full 900-task public set and reported as F1. The other two are BrowseComp and AA-Omniscience.

| Search API (AA data, October 19, 2026) | DeepSearchQA F1 | Search Index |
| --- | --- | --- |
| Exa Search (auto, dynamic highlights) | 86 | 80 |
| Exa Search (lite, dynamic highlights) | 85 | 79 |
| Perplexity Search (medium) | 81 | 80 |
| Perplexity Search (high) | 81 | 79 |
| Parallel Search (advanced) | 81 | 75 |
| Octen Search (highlights) | 80 | 77 |
| Parallel Search (basic) | 79 | 73 |
| Brave Search (LLM context) | 78 | 75 |
| OpenAI Web Search (medium) | 78 | 74 |
| You.com (highlights) | 77 | 74 |
| Nimble (standard) | 76 | 74 |
| Firecrawl | 74 | 73 |
| Model only, no search | 45 | 33 |

Exa leads this column, with auto mode at 86 and lite at 85. Parallel Search advanced scores 81, tied with both Perplexity modes, and basic scores 79. Every search API lifts the model well above its no-search baseline of 45, which shows how much of DeepSearchQA depends on retrieval rather than recall from training data.

### Why the two tables can't be compared

- **Different sets.** The Task API table uses a fixed 100-question subset; AA uses all 900 public prompts.
- **Different metrics.** Our benchmarks page reports an accuracy percentage; AA reports mean F1, which gives partial credit on set answers.
- **Different systems.** The Task API rows are complete research agents with their own planning and verification. The AA rows are one shared model calling different search tools, so they isolate the search layer.

A Task API score of 85% and a Search API F1 of 81 don't describe the same thing, and neither implies the other.

## Running DeepSearchQA yourself

The data loads with standard tools, and the official starter notebook with the grading prompt is on [Kaggle](https://www.kaggle.com/code/andrewmingwang/deepsearchqa-starter-code). Use that notebook's autorater prompt with Gemini 2.5 Flash if you want numbers comparable to the paper or the Kaggle leaderboard.

The snippet below loads the CSV and implements the paper's per-prompt metrics with exact matching. The gold set is a placeholder, not a real DeepSearchQA answer; swap in an LLM judge for real equivalence checks.

```python
import csv, io, urllib.request
from collections import Counter

URL = "https://huggingface.co/datasets/google/deepsearchqa/resolve/main/DSQA-full.csv"
rows = list(csv.DictReader(io.StringIO(urllib.request.urlopen(URL).read().decode("utf-8"))))
print(len(rows), Counter(r["answer_type"] for r in rows))

def set_scores(submitted: set, gold: set) -> dict:
    """Per-prompt precision, recall, F1 and outcome class, as defined in the paper.
    Matching here is exact; the official grader uses an LLM judge for equivalence."""
    hits = len(submitted & gold)
    p = hits / len(submitted) if submitted else 0.0
    r = hits / len(gold) if gold else 0.0
    f1 = 2 * p * r / (p + r) if hits else 0.0
    if submitted == gold:
        outcome = "fully correct"
    elif hits == 0:
        outcome = "fully incorrect"
    elif gold < submitted:
        outcome = "correct with extraneous answers"
    else:
        outcome = "partially correct"
    return {"precision": p, "recall": r, "f1": round(f1, 3), "outcome": outcome}

gold = {"A", "B", "C", "D"}
print(set_scores({"A", "B", "C"}, gold))                # stopped early
print(set_scores({"A", "B", "C", "D", "E"}, gold))  # hedged
```

Running it prints 900 rows (584 set, 316 single), then an F1 of 0.857 for the early stop and 0.889 for the hedge. Neither is fully correct.

For your own evals, report F1 and fully correct side by side. The gap between them tells you whether your agent's problem is search coverage or answer discipline. If you sample, fix the subset and publish its IDs, and hold the judge model constant across every system you compare. Our [guide to benchmarking web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) covers harness design in more detail.

## FAQ

### Who created DeepSearchQA?

Google DeepMind, with collaborators from Google Search, Google Research, and Kaggle. It was released on December 11, 2025, and the paper was posted to arXiv on January 28, 2026.

### How many questions are in DeepSearchQA?

900 prompts across 17 fields. In the public CSV, 584 expect a set of answers and 316 expect a single answer.

### What is the main DeepSearchQA metric?

Mean per-prompt F1 over the answer set, which balances precision and recall. The paper also reports the share of responses that are fully correct, meaning an exact match with the gold set.

### Is DeepSearchQA the same as BrowseComp?

No. BrowseComp asks for one hard-to-find answer, so it rewards persistence on a single target. DeepSearchQA mostly asks for complete lists, so it rewards coverage, filtering, and knowing when the list is done.

### Is the DeepSearchQA test set public?

Yes. All 900 prompts and gold answers are on Hugging Face and Kaggle under Apache 2.0, which makes it easy to run and also exposes it to training-data contamination.

Related: [BrowseComp benchmark](https://parallel.ai/articles/browsecomp-benchmark), [WideSearch benchmark](https://parallel.ai/articles/widesearch-benchmark), [SimpleQA benchmark](https://parallel.ai/articles/simpleqa-benchmark), and [best deep research APIs](https://parallel.ai/articles/best-deep-research-apis).

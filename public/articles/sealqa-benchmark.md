# SealQA explained: testing search agents on conflicting and noisy results

SealQA asks what happens when an AI agent searches the web and the web disagrees with itself, returning conflicting, outdated, or unhelpful pages. This guide covers how its three question sets were curated, how answers are graded, why extra reasoning effort often failed to help in the paper's tests, and what the benchmark implies for anyone designing a search tool.

SealQA is a question-answering benchmark from researchers at Virginia Tech, first posted to arXiv on June 1, 2025 and published at ICLR 2026, that tests search-augmented language models on fact-seeking questions where web search returns conflicting, noisy, or unhelpful results. It ships in three flavors: Seal-0 (111 questions), Seal-Hard (254 questions), and LongSeal (254 questions in a "needle-in-a-haystack" format). Every question was written so that a naive search surfaces misleading evidence.

We make Parallel, a web search API for AI agents, so read with that in mind. This article explains the benchmark and what it implies for search tool design. It doesn't report any Parallel SealQA scores, for reasons covered below.

## What the SealQA benchmark measures

Most factual QA benchmarks reward an agent for finding the page that holds the answer. SealQA assumes that page is hard to tell apart from several others that look just as authoritative and say something different. The paper ([arXiv 2506.01062](https://arxiv.org/abs/2506.01062), by Thinh Pham, Nguyen Nguyen, Pratibha Zunjare, Weiyuan Chen, Yu-Min Tseng, and Tu Vu) describes it as a benchmark spanning factuality, reasoning, and retrieval at once. The name stands for SEarch-Augmented Language models.

The three flavors share a question pool but test different things:

| Flavor | Questions | What it tests |
| --- | --- | --- |
| Seal-0 (main) | 111 | The hardest core set; every question failed against several frontier chat models with and without browsing |
| Seal-Hard | 254 | Seal-0 plus other difficult questions that missed the strict 0% threshold |
| LongSeal | 254 | Seal-Hard questions paired with one gold document buried among up to 50 hard-negative documents |

The "0" in Seal-0 is literal. To curate it, the authors tested each question against GPT-4o, GPT-4.1, their mini variants, and Llama-4-Scout, with and without browsing, and kept only questions that every model got wrong across 10 to 15 attempts.

LongSeal moves the problem from retrieval to reading. It reuses the Seal-Hard questions but hands the model a fixed bundle of documents: one gold page from the annotators' sources and a set of hard negatives that look relevant but don't contain the answer. The negatives came from Google results for each question, including 10 pages restricted to pre-2023 content to add stale, conflicting versions. The full set contains more than 7,600 documents.

## How the questions were built

Six NLP researchers wrote and refined the questions over eight months. The paper says each question took more than an hour on average, roughly 45 minutes to draft plus review time, and many drafts were thrown out because they didn't trouble frontier models. The small size is deliberate.

Annotators followed rules that make grading possible:

- Each question has a single, unambiguous answer (for example, "on what date" rather than "when").
- Each answer is backed by one or more webpages, and questions about changing facts must cite regularly updated sources.
- Each question is labeled with its expected search behavior: **conflicting** (search returns a mix of correct and misleading answers) or **unhelpful** (search returns no correct answer).
- Each question carries a freshness label (never-changing, slow-changing, or fast-changing), the year the answer last changed, and a next review date.

Questions were then refined until they consistently caused multiple models to fail, and reviewed by two or more graduate-level annotators before expert approval. By the paper's count, 31.1% of questions are never-changing, 43.7% slow-changing, and 25.2% fast-changing; 22.0% reference 2025 events.

## Example question types

The paper groups questions into five categories, and a single question can belong to more than one:

1. **Advanced reasoning** (72.4% of questions): multi-hop reasoning, reading values off charts or tables in search results, counting, and calculation.
2. **Entity or event disambiguation** (58.3%): telling apart people, events, or products with similar names.
3. **Temporal tracking** (13.7%): identifying which version of an entity or record applies at a given time.
4. **Cross-lingual reasoning** (5.5%): an English question whose answer sits in non-English sources.
5. **False-premise detection** (4.3%): a question built on a wrong assumption that the model has to reject.

The paper's grading prompt gives a feel for the format with an illustrative counting question: how many NBA players have scored 60 or more points in a regular-season game since 2024. A response that states the right total but lists the wrong number of players counts as incorrect. Questions like this punish an agent that copies the first number it finds, because a count published last season is outdated.

## How SealQA is scored

Scoring reuses the SimpleQA approach. A GPT-4o mini auto-rater sees the question, the reference answer, and the model's response, and labels the response "correct", "incorrect", or "not attempted". The protocol is relaxed: it checks whether the main answer is factually correct and stays consistent throughout the response. Two authors hand-graded 100 answers to check the rater, and their combined human ratings agreed with it 98% of the time.

The headline metric is accuracy, the share of questions graded correct. The "not attempted" label matters for analysis: the paper found open-weight models such as Llama-4-Scout and DeepSeek-R1 declined to answer more often than proprietary models.

For LongSeal, the authors follow the "lost in the middle" setup from Liu et al. Each question comes with the gold document placed at a random position among k hard negatives, with k set to 12, 20, or 30. Average prompt lengths are 27.6K, 54.5K, and 70.1K tokens respectively.

## What the paper found

All of the scores below are the paper's own, measured on the models available at the time (v4 of the paper is dated April 9, 2026). Treat them as evidence about the benchmark's difficulty, not as a current leaderboard.

| Result (from the SealQA paper) | Score |
| --- | --- |
| GPT-4o, GPT-4.1, and their mini variants on Seal-0, with built-in search | 0.0% |
| o3 on Seal-0 with tools, at low / medium / high reasoning effort | 11.7% / 17.1% / 14.4% |
| o4-mini on Seal-0 with tools, at low / medium / high reasoning effort | 6.3% / 5.4% / 4.5% |
| GPT-5 on Seal-0 with tools, at its best reasoning effort | 43.2% |
| Humans with open Google search on 50 Seal-Hard questions (average / best) | 38.8% / 64.0% |
| o3-high on the same 50 Seal-Hard questions | 28.0% |

The findings that matter most for anyone building a search agent:

- **More reasoning doesn't reliably help.** Across GPT-5 and OpenAI's o-series, raising reasoning effort often plateaued or lowered accuracy. The authors suggest that longer chains of thought over noisy results can amplify misleading evidence instead of filtering it out.
- **Search can make answers worse.** GPT-4.1-mini dropped from 13.8% to 11.8% on Seal-Hard when given built-in search. DeepSeek-R1-671B fell from 22.4% to 11.0% when FreshPrompt injected search results into its prompt; the losses came from never-changing and pre-2024 questions (down 17.7 and 20.8 points), while fast-changing and 2025 questions improved slightly.
- **Unhelpful results hurt more than conflicting ones.** On Seal-Hard, models scored lower on questions where search returns no correct answer than on questions where correct and incorrect answers are mixed.
- **Fast-changing and recent questions are the weakest category.** Without search, GPT-4.1 scored 21.5% on never-changing Seal-Hard questions and 1.6% on fast-changing ones.
- **Finding the right document is the bottleneck.** On LongSeal, GPT-4o-mini's accuracy with the gold document in first position fell from 24.0% at k=12 to 3.9% at k=30. Even with only gold documents and no distractors, GPT-4.1 reached 48.0% and o3-mini 56.7%, so reasoning over clean evidence is also unsolved.

## What SealQA teaches about search tool design

**Source conflict is the normal case.** When two credible pages disagree, the agent needs enough context to decide which one wins: who published it, when, and whether it's a primary source or a summary of one. Returning the URL, title, and publish date with each excerpt gives the model something to weigh besides the text itself.

**Recency has to be explicit.** A quarter of SealQA questions are fast-changing, and LongSeal deliberately mixes in pre-2023 pages to create stale-versus-current conflicts. An agent can only prefer the newer source if the search results carry dates and the tool lets it filter by them. In the Parallel Search API, `advanced_settings.source_policy.after_date` limits results to content published on or after a given date, and each result includes a `publish_date` field when one is available.

**One right source beats many plausible ones.** LongSeal shows accuracy falling as hard negatives are added, even for models with large context windows. Dumping 30 loosely relevant pages into context is a retrieval strategy that SealQA penalizes directly. A search tool that ranks well and returns compact, query-relevant excerpts reduces the number of distractors the model has to reject.

**Domain control helps when the authority is known.** For questions where the answer lives with a specific publisher (a sports league's record book, a regulator's filings, an official results page), restricting search to that domain removes most of the noise. Parallel's `source_policy` supports `include_domains` and `exclude_domains`, though the docs warn that hard filters can cut out relevant pages and suggest steering in the `objective` when you only want to prefer certain sources.

**Abstention is a feature.** SealQA's grader separates "incorrect" from "not attempted". In production, a wrong confident answer usually costs more than a flagged gap. If your agent can say it found conflicting evidence and name the sources, measure that rate alongside accuracy.

## Where Parallel stands on SealQA

Parallel published SealQA results for its Task API in an earlier blog post, [Task API Sets Price-Performance Record on SealQA](https://parallel.ai/blog/benchmarks-task-api-sealqa). Those runs used processors and competitor versions from late 2025, and SealQA isn't on our current [benchmarks page](https://parallel.ai/benchmarks), so we don't cite those numbers here.

For current, dated comparisons, see the [BrowseComp](https://parallel.ai/articles/browsecomp-benchmark) and [DeepSearchQA](https://parallel.ai/articles/deepsearchqa-benchmark) explainers. The independent Artificial Analysis Search Index uses DeepSearchQA, BrowseComp, and AA-Omniscience, not SealQA.

## Limitations, contamination, and saturation

- **Small sample sizes.** Seal-0 has 111 questions, so one question is worth about 0.9 percentage points. Differences of a few points between systems are within noise unless you repeat runs.
- **Public answers.** The full dataset, answers included, is on Hugging Face under an Apache-2.0 license. The authors include a canary string (a superset of the BIG-bench canary) so model builders can filter it from training data, but nothing forces them to. The paper's own charts acknowledge "potential data contamination or direct access by agentic models."
- **Answers change.** Because many questions are slow- or fast-changing, the authors maintain the dataset and publish dated versions; the dataset card lists the next update as October 29, 2026 and links to older versions. Scores from different dataset versions aren't strictly comparable, so record which version you ran.
- **Adversarial selection bias.** Seal-0 was filtered against a specific set of OpenAI and Meta models available in 2025. Its difficulty is partly defined by what those models got wrong, which may not match where newer systems fail.

## How to run SealQA yourself

The dataset loads with the Hugging Face `datasets` library, and the authors provide a grading template in a [Colab notebook](https://colab.research.google.com/drive/1fJunutgxNaiU6-Met_wzyEdG-tXQLfrM?usp=sharing) linked from the [dataset card](https://huggingface.co/datasets/vtllms/sealqa). The snippet below pulls one Seal-0 question, prints its freshness and expected search-result labels, and runs a Parallel search that keeps the publish date next to each source.

```python
from datasets import load_dataset
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY

seal_0 = load_dataset("vtllms/sealqa", name="seal_0", split="test")
row = seal_0[0]
print(row["question"])
print("freshness:", row["freshness"], "| expected search results:", row["search_results"], "\n")

result = client.search(
    mode="fast",
    objective=row["question"] + " Prefer primary and official sources; note the date of each claim.",
    search_queries=[row["question"][:120]],
)

# Keep publish dates next to each source so the agent can reconcile conflicts
for r in result.results[:5]:
    print(r.publish_date or "no date", r.url)
```

When we ran this on October 19, 2026, the first Seal-0 question was labeled fast-changing and conflicting, and the top results mixed dated 2024 news articles with undated reference pages. That mix is the situation SealQA is built to test: the agent has to decide whether the dated articles are still current.

To turn this into an eval, wrap the search call in your agent loop, send the final answer to the authors' grader prompt, and report correct, incorrect, and not-attempted rates separately. Split results by the `freshness` and `search_results` fields; an aggregate score hides whether your stack fails on stale data or on conflicting sources. See our guide to [benchmarking web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) for sampling and judge setup.

## Frequently asked questions

### How many questions are in SealQA?

Seal-0 has 111 questions and Seal-Hard has 254, with Seal-0 as a subset of Seal-Hard. LongSeal reuses the 254 Seal-Hard questions with document bundles attached.

### What is the difference between Seal-0 and Seal-Hard?

Seal-0 contains only questions that GPT-4o, GPT-4.1, their mini variants, and Llama-4-Scout all failed across 10 to 15 attempts. Seal-Hard adds difficult questions that didn't meet that 0% threshold.

### Who created SealQA?

Thinh Pham, Nguyen Nguyen, Pratibha Zunjare, Weiyuan Chen, Yu-Min Tseng, and Tu Vu at Virginia Tech. The paper appeared at ICLR 2026.

### Does more reasoning help on SealQA?

Not reliably. In the paper, raising reasoning effort for GPT-5 and OpenAI's o-series often left accuracy flat or lower, which the authors attribute to longer reasoning over noisy search results.

### Does Parallel have a current SealQA score?

No. Parallel published Task API results from late-2025 test runs in a blog post, but SealQA isn't on the current parallel.ai/benchmarks page.

Related: [BrowseComp benchmark](https://parallel.ai/articles/browsecomp-benchmark), [DeepSearchQA benchmark](https://parallel.ai/articles/deepsearchqa-benchmark), [WideSearch benchmark](https://parallel.ai/articles/widesearch-benchmark), and [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis).

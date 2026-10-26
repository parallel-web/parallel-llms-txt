# SimpleQA and SimpleQA Verified explained: what they measure and how search APIs compare

SimpleQA is OpenAI's short-answer factuality benchmark, and its cleaned successor, SimpleQA Verified, is the version Google DeepMind now runs on a public Kaggle leaderboard. This guide covers how both datasets were built and graded, why search tools nearly saturate them, how search APIs compare on accuracy and cost, and how to run the benchmark in your own evals.

## What is SimpleQA?

SimpleQA is a factuality benchmark that OpenAI released on October 30, 2024, made up of 4,326 short, fact-seeking questions that each have a single, indisputable answer. It tests whether a language model can answer from its own trained knowledge, and whether it knows when to decline instead of guessing. SimpleQA Verified is a cleaned 1,000-prompt version that Google DeepMind and Google Research published on September 9, 2025.

Both versions were built to measure what a model knows without tools. Give an agent a web search API and the scores change, which is why the benchmark matters if you're choosing a search provider. We make Parallel, a web search API for AI agents, and we publish SimpleQA Verified results on our [benchmarks page](https://parallel.ai/benchmarks), so read the comparison sections with that in mind.

## How SimpleQA was built

OpenAI describes the dataset in the paper [Measuring short-form factuality in large language models](https://arxiv.org/abs/2411.04368) (arXiv 2411.04368, submitted November 7, 2024). AI trainers, meaning human annotators, browsed the web and wrote question and answer pairs that met strict criteria. Each question needed a single answer that would not change over time, and each had to be supported by sources.

The collection was adversarial. The paper says SimpleQA "is adversarially collected against GPT-4 responses": trainers checked their questions against GPT-4 models of various release dates, and late in the process one of those models was swapped for GPT-3.5 so the set would give some signal on smaller models. OpenAI's announcement adds that most questions had to induce a hallucination from GPT-4o or GPT-3.5 to make the cut.

Verification happened in two stages. A second trainer answered every question independently, and a question was kept only when both answers matched. OpenAI also required at least two distinct website domains among the sources the two trainers cited. As a final check, a third trainer answered a random sample of 1,000 questions and matched the agreed answer 94.4% of the time. After reviewing the disagreements, OpenAI estimates the dataset's own error rate at about 3%.

The most common topics were Science & Technology (858 questions), Politics (709), and Art (550). By answer type, 32.8% of answers are dates, 24.1% are people, 15.3% are numbers, 9.9% are places, and 18.0% are other.

### What a SimpleQA question looks like

The paper's own grading example is a fair picture of the style. The question asks which Dutch player scored an open-play goal in the 2022 Netherlands vs. Argentina match at the men's FIFA World Cup, and the reference answer is Wout Weghorst. The question is short, the answer is one name, and nothing about it changes with time.

A made-up question in the same spirit would be "Which US Navy ship laid the first transatlantic telegraph cable in 1858 together with HMS Agamemnon?" (USS Niagara). We use that one in the code sample below rather than quoting dataset items.

## How SimpleQA is scored

A prompted model grader reads the predicted answer and the reference answer and assigns one of three grades.

- **Correct**: the response fully contains the reference answer without contradicting it.
- **Incorrect**: the response contradicts the reference answer in any way, even if the contradiction is hedged. Naming two players when only one is right counts as incorrect.
- **Not attempted**: the reference answer isn't fully given, and nothing contradicts it. "I don't know" lands here.

From those grades the paper reports overall correct, correct given attempted, and an F-score, which is the harmonic mean of the two. The not-attempted category is what makes SimpleQA a calibration test. A model that answers fewer questions but rarely gets one wrong can match a model that answers everything. In the paper's results table, Claude 3.5 Sonnet got 28.9% correct and declined 35.0%, while GPT-4o got 38.2% correct and declined only 1.0%, and their F-scores (35.0 and 38.4) ended up close.

The paper is open about a weakness in that metric. Appendix B shows that the F-score rewards a model for guessing whenever it is at least 50% sure, so a model can raise its score by answering more aggressively.

OpenAI also measured calibration directly, by asking models to state their confidence and by asking the same question 100 times. Larger models were better calibrated, though the paper notes that models consistently overstate their stated confidence.

When the paper came out, the best model it tested was o1-preview at 42.7% correct (F-score 44.8). Those are October 2024 numbers for models answering from memory, with no browsing.

## What SimpleQA Verified changed

Google DeepMind's [SimpleQA Verified paper](https://arxiv.org/abs/2509.07968) (arXiv 2509.07968, by Lukas Haas, Gal Yona, Giovanni D'Antonio, Sasha Goldshtein, and Dipanjan Das) starts from the 4,326 original questions and cuts them to 1,000. The authors list three problems with the original: noisy and incorrect labels, topical biases, and question redundancy.

The filtering ran in stages, each logged in the paper.

1. **Unique sources.** Many questions shared the same reference URL. Keeping one per source took the set from 4,326 to 3,095.
2. **De-duplication.** Embedding similarity and then TF-IDF matching removed near-duplicates. One example from the paper is 119 questions (2.7% of the dataset) about the founding dates of Colombian municipalities. This step left 2,664.
3. **Publisher preferences.** Questions whose reference URLs belonged to publishers using robots.txt controls from Google, OpenAI, or Anthropic to limit AI use of their content were dropped, leaving 1,855.
4. **Balancing.** The set was resampled to even out answer types first and topics second, leaving 1,218.
5. **Source reconciliation.** Where sources disagreed, the authors checked them and fixed or removed the label. Numeric answers were rewritten with explicit acceptable ranges, so a grader knows whether "about 180" can pass for 200.
6. **Headroom.** A final adversarial cut kept the questions that frontier models found hardest, giving 1,000 prompts.

The grading scheme stays the same (correct, incorrect, not attempted, with F1 as the headline metric), but the autorater prompt was improved to handle answers that add extra detail, give approximate numbers, or hedge. The paper's results use gpt-4.1-2025-04-14 as the grader. At publication, Gemini 2.5 Pro led with an F1 of 55.6, ahead of GPT-5 at 52.3.

The dataset is on [Kaggle](https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified) (MIT license) and [Hugging Face](https://huggingface.co/datasets/google/simpleqa-verified), and Kaggle runs a live leaderboard of models answering without tools.

## Limitations, saturation, and contamination

For search users, the main limitation comes from the SimpleQA Verified paper itself. All models there were evaluated without tools, and the authors state that "Enabling tools on SimpleQA Verified results in near perfect performance, emphasizing that SimpleQA Verified should be employed for measuring parametric factuality only."

The result follows from how the questions were made. Every answer was found by a person browsing the web, and the original rules required at least two sources on different domains. A question that a trained annotator could answer with a few searches is usually one a search API can answer too. With retrieval, SimpleQA measures whether the search tool returns a page containing one well-documented fact.

Contamination is the second issue. Both datasets are public, and SimpleQA has been on GitHub since 2024. The questions, and in many cases the answers, now appear in papers, blog posts, leaderboards, and dataset mirrors. Newer models may have trained on the answers, and a search agent's query can land on a page that lists the benchmark item itself. Either way, a high score can reflect exposure to the benchmark rather than general skill.

The original paper also notes that SimpleQA only measures short answers with one verifiable fact, and whether that predicts accuracy in long-form writing is an open question.

## How search APIs compare on SimpleQA Verified

We run SimpleQA Verified as part of our Search API evaluation, and the numbers below come from the [benchmarks page](https://parallel.ai/benchmarks) for evals run on September 9, 2026. The setup is a multi-step agentic eval at two price tiers. At the low-cost tier, a GPT-5.6 Luna agent with low reasoning calls each provider's search tool. At the frontier tier, a GPT-5.6 Sol agent with high reasoning does the same. The agent also gets the provider's extract tool where one exists (Parallel, Exa, Tavily); Perplexity runs search-only. Answers are graded by an LLM judge on a sample of 100 questions, and cost is USD per 1,000 questions including LLM tokens and tool calls.

| Tier | Provider and mode | Accuracy | Cost per 1,000 questions |
| --- | --- | --- | --- |
| Low-cost | Parallel Fast | 94% | $2 |
| Low-cost | Parallel Turbo | 91% | $2 |
| Low-cost | Perplexity | 94% | $5.5 |
| Low-cost | Exa Auto | 91% | $7.9 |
| Low-cost | Tavily | 94% | $17.4 |
| Frontier | Parallel Advanced | 97% | $28.3 |
| Frontier | Parallel Basic | 97% | $45 |
| Frontier | Perplexity | 95% | $20.2 |
| Frontier | Exa Auto | 91% | $35.7 |
| Frontier | Tavily | 92% | $61.3 |

Every configuration lands between 91% and 97%. On a 100-question sample, the gap between 94% and 91% is three questions, so most of the accuracy differences here are small. At the low-cost tier, Parallel Fast, Perplexity, and Tavily tie at 94%. At the frontier tier, Parallel Advanced and Basic reach 97%, two points above Perplexity, but Perplexity gets to 95% at $20.2 per 1,000 questions, which is cheaper than either Parallel frontier mode.

The providers separate on cost. Parallel Fast reaches 94% at $2 per 1,000 questions, against $5.5 for Perplexity and $17.4 for Tavily at the same accuracy. With search enabled, SimpleQA Verified mostly shows what a simple factual lookup costs on each provider. It also works as a regression check, since a search tool that suddenly drops well below the 90s on single-fact questions has a retrieval problem. It says little about hard, multi-hop research. For that, look at [BrowseComp](https://parallel.ai/articles/browsecomp-benchmark), where the same agents spread from 32% to 74%, or at [DeepSearchQA](https://parallel.ai/articles/deepsearchqa-benchmark), which scores complete answer lists.

## How to run SimpleQA in your own evals

The original dataset and grader live in OpenAI's [simple-evals](https://github.com/openai/simple-evals) repository, and SimpleQA Verified is on Kaggle with a starter notebook. A search-enabled run needs an agent loop that calls your search tool and a grader prompt that compares the final answer to the reference. The setup choices below affect results.

- **Grader model and prompt.** The SimpleQA Verified grader prompt handles numeric ranges and hedged answers better than the original. Use the same grader for every provider you compare.
- **Sample size.** At 100 questions, each question is one point. If two providers are within a few points, run the full 1,000 or several samples before drawing conclusions.
- **Report cost.** Since accuracy saturates, cost per 1,000 questions and latency are usually the more useful columns.
- **Leakage filters.** Consider blocking domains that host the benchmark itself (dataset mirrors, Kaggle, GitHub) so the agent can't read the answer key.

Our article on [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis) covers the harness and judging in more detail, and [how to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) walks through building your own.

To see what a single SimpleQA-style lookup looks like, the snippet below sends our made-up question to the Parallel Search API in `fast` mode and checks whether the reference answer appears in the returned excerpts.

```python
# pip install parallel-web
import time
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY from the environment

question = (
    "Which US Navy ship laid the first transatlantic telegraph cable "
    "in 1858 together with HMS Agamemnon?"
)

start = time.perf_counter()
search = client.search(
    mode="fast",
    objective=question,
    search_queries=["1858 transatlantic telegraph cable ships", "HMS Agamemnon 1858 cable"],
)
elapsed = time.perf_counter() - start

print(f"{len(search.results)} results in {elapsed:.2f}s")
for r in search.results[:3]:
    print("-", r.title, r.url)

evidence = " ".join(" ".join(r.excerpts) for r in search.results)
print("Reference answer 'Niagara' in excerpts:", "Niagara" in evidence)
```

When we ran it on October 19, 2026, it returned 10 results in 0.80 seconds, and the reference answer appeared in the excerpts. In a full eval, an agent model would read those excerpts and write the answer, and the grader would score it.

## FAQ

### What is the difference between SimpleQA and SimpleQA Verified?

SimpleQA is OpenAI's original 4,326-question set from October 2024. SimpleQA Verified is Google DeepMind's 1,000-prompt subset from September 2025, with duplicates removed, topics and answer types rebalanced, conflicting labels reconciled, numeric answers given acceptable ranges, and an improved grader prompt.

### Is SimpleQA a good benchmark for web search APIs?

It's a useful sanity check and cost comparison, but it doesn't separate search APIs much on accuracy. With search enabled, every provider in our September 9, 2026 run scored between 91% and 97%. Use harder benchmarks such as BrowseComp to compare retrieval quality.

### How is SimpleQA scored?

A model grader labels each answer correct, incorrect, or not attempted. The headline metric is an F-score, the harmonic mean of overall correct and correct given attempted, so declining to answer is penalized less than answering wrong.

### Why do models score so much lower on SimpleQA without search?

The questions were chosen because strong models got them wrong from memory. When SimpleQA Verified was published, the best model without tools reached an F1 of 55.6. With a search tool, the answer is usually on a well-sourced web page.

Related: [BrowseComp benchmark explained](https://parallel.ai/articles/browsecomp-benchmark), [DeepSearchQA benchmark explained](https://parallel.ai/articles/deepsearchqa-benchmark), [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis), and [FRAMES benchmark explained](https://parallel.ai/articles/frames-benchmark).

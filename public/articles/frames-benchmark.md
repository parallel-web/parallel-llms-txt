# The FRAMES benchmark explained: multi-hop retrieval for RAG and search agents

The FRAMES benchmark asks something single-fact recall tests can't: whether a system can chain several lookups, a table read, and a calculation into one correct answer. This guide covers how the dataset is built, how answers are graded, what it does and doesn't reveal about web search APIs, and how to run it yourself with a Wikipedia-only source policy.

## What is the FRAMES benchmark?

The FRAMES benchmark (Factuality, Retrieval, And reasoning MEasurement Set) is a set of 824 hand-written multi-hop questions released by Google researchers in September 2024 to evaluate retrieval-augmented generation end to end. Each question needs facts from between 2 and 15 Wikipedia articles, and a system has to find those articles, pull the right facts out of them, and reason over them to produce one short answer. It tests factuality, retrieval, and reasoning in a single score instead of three separate ones.

The paper is "Fact, Fetch, and Reason: A Unified Evaluation of Retrieval-Augmented Generation" by Satyapriya Krishna, Kalpesh Krishna, Anhad Mohananey, Steven Schwarcz, Adam Stambler, Shyam Upadhyay, and Manaal Faruqui ([arXiv 2409.12941](https://arxiv.org/abs/2409.12941), first posted September 19, 2024, revised January 24, 2025). The dataset is public on Hugging Face as [google/frames-benchmark](https://huggingface.co/datasets/google/frames-benchmark).

We make Parallel, a web search API for AI agents, and we publish benchmark results for it, so read the comparison sections with that in mind.

## How FRAMES is built

The authors first tried generating questions synthetically with Gemini and found the output needed so much manual cleaning that they switched to human annotators. Vetted annotators wrote questions that could only be answered by combining information from several Wikipedia articles, and recorded the gold answer plus the list of articles they used.

Most questions are on the shorter end of that 2 to 15 range. The paper reports that about 36% need two articles, about 35% need three, and about 16% need four; a small tail needs 11 or more. Topics range across history, sports, science, animals, and health.

Annotators also tagged every question with one or more of five reasoning types. A single question often carries several tags.

| Reasoning type | What the question asks the system to do | Questions tagged (of 824) |
| --- | --- | --- |
| Multiple constraints | Find the one entity that satisfies several conditions at once | 549 |
| Numerical reasoning | Count, compare, or calculate | 293 |
| Temporal reasoning | Work through dates and timelines | 278 |
| Tabular reasoning | Read statistics from Wikipedia tables or infoboxes | 236 |
| Post-processing | Apply a final transformation after gathering the facts | 107 |

The counts come from the `reasoning_types` column of the Hugging Face file, which we tallied on October 19, 2026.

### Example question types

The paper's own illustrations (Table 2) show the flavor without exposing any test item:

- **Tabular:** "How many runs did the West Indies vice-captain score in the 1983 World Cup?" The answer sits in a table of top run scorers, after you work out who the vice-captain was.
- **Temporal:** "Leonardo DiCaprio once won an Oscar for best actor. Who won the award for best costume design sixteen years earlier?" Two lookups chained by date arithmetic.
- **Multiple constraints:** "I'm thinking of an airport near the intersection of US-52 and I-95. Can you remind me which one it is?"
- **Post-processing:** "What is five years after the founding of the largest country in North America in Roman numerals?" A lookup, an addition, then a format conversion.

None of these require obscure sources. They're hard because each hop depends on getting the previous one right, and a single wrong intermediate fact sinks the final answer.

## How FRAMES is scored

FRAMES uses accuracy: the share of questions where the model's response contains the gold answer. Because answers are short but phrasing varies ("140 years" vs "one hundred forty years old"), the authors grade with an LLM autorater that sees the question, the response, and the gold answer. They validated it against human judgments and report 0.96 accuracy and a Cohen's kappa of 0.889 when Gemini-Pro-1.5-0514 is the rater.

If you run FRAMES yourself, you supply your own judge model. Pin it, keep the prompt fixed, and spot-check a sample of its decisions by hand, since scores from different judges aren't directly comparable.

## What the paper found

The baselines are from the paper's 2024 experiments, mostly on Gemini-Pro-1.5-0514. Treat them as a historical reference point; current models score differently.

| Setup (Gemini-Pro-1.5-0514) | Accuracy |
| --- | --- |
| Naive prompt, no retrieval | 0.408 |
| BM25 retrieval, top 2 Wikipedia articles | 0.452 |
| BM25 retrieval, top 4 Wikipedia articles | 0.474 |
| Multi-step retrieval with search planning, 5 iterations | 0.66 |
| Oracle prompt, all gold articles in context | 0.729 |

Source: [Krishna et al., arXiv 2409.12941](https://arxiv.org/abs/2409.12941), Table 3 and Section 3.2.

Single-shot retrieval barely helped: four BM25 documents added under 7 points over no retrieval, because recall of the gold articles in context was only 0.12 to 0.15. Letting the model write its own queries over several rounds closed most of the gap to the oracle. Even with every gold article in context, the model still missed 27% of questions, roughly 80% of them in the numerical, tabular, and post-processing categories, so good retrieval alone doesn't fix arithmetic and table reading.

## What FRAMES does and doesn't tell you about web search

The source pool is Wikipedia only. The paper's multi-step pipeline deliberately used a fixed BM25 index over a Wikipedia dump instead of a live search engine, so the authors could measure the model's search planning while holding retrieval constant and keep results reproducible.

That design has consequences when you use FRAMES to compare web search APIs:

- **It tests multi-hop retrieval and reasoning, not freshness.** Every answer lives in encyclopedic pages that change slowly. A search API that is weak on news from last week can still do well here.
- **Wikipedia is the best-indexed site on the web.** Any serious search engine ranks it well, so FRAMES separates providers less on coverage and more on whether results surface the specific article and passage a hop needs.
- **Answers can drift.** Some questions pin a date (phrasing like "as of August 2024"), and others quietly assume the 2024 state of a page. Live Wikipedia edits since then can make a gold answer stale, which an open-web system will be marked wrong for.
- **Contamination is real.** The authors acknowledge that Wikipedia content is in pretraining data and tried to offset it by requiring reasoning beyond lookup. The no-retrieval baseline of 0.408 in 2024 shows how much a model already knew; newer models know more.

For RAG over a fixed corpus, FRAMES fits well: you can index the same Wikipedia articles and compare chunking, rerankers, and agent loops on equal footing. For open-web search agents, pair it with benchmarks built for the open web, such as [BrowseComp](https://parallel.ai/articles/browsecomp-benchmark) for hard-to-find facts and [SimpleQA](https://parallel.ai/articles/simpleqa-benchmark) for short factual recall.

## How search APIs compare on FRAMES

FRAMES isn't on our current [benchmarks page](https://parallel.ai/benchmarks), so we don't cite a Parallel FRAMES score here. Our current published Search API runs cover SimpleQA Verified, BrowseComp, and WideSearch.

The nearest published evidence is those runs, evaluated September 9, 2026 with a GPT-5.6 Luna agent at the low-cost tier. On BrowseComp (sample of 50), Parallel Fast scored 44% at $11.8 per 1,000 questions, behind Perplexity at 46% ($37.1) and ahead of Exa Auto at 36% ($53.4). On SimpleQA Verified (sample of 100), Parallel Fast scored 94% at $2, level with Perplexity and Tavily at 94% and ahead of Exa Auto at 91%. At the frontier tier, Parallel Advanced and Perplexity tied at 74% on BrowseComp. These are different benchmarks from FRAMES, so they indicate multi-step search quality in general, not FRAMES accuracy.

## How to run FRAMES yourself

The dataset is a single `test.tsv` file with 824 rows. The columns you need:

- `Prompt`: the question.
- `Answer`: the gold answer.
- `wiki_links`: a Python-style list of the gold Wikipedia URLs for that question. The same URLs are also spread across `wikipedia_link_1` through `wikipedia_link_11+`.
- `reasoning_types`: pipe-separated tags such as `Numerical reasoning | Temporal reasoning`.

In a minimal harness, your agent answers each `Prompt` using whatever retrieval you are testing. A judge model compares each response to `Answer` and returns correct or incorrect. Then you report accuracy overall and per reasoning type, since the per-type split tells you whether failures come from retrieval or from arithmetic.

The `wiki_links` column also lets you score retrieval on its own, without a judge. Compare the articles your search step returned with the gold list and you get recall per question. The paper's BM25 recall of 0.12 to 0.15 gives you a floor to beat.

To mimic the FRAMES setting with a web search API, restrict results to Wikipedia. With Parallel Search, put a source policy in `advanced_settings`. The script below runs one search per question for the first 10 questions and reports how many gold articles came back.

```python
import ast
import csv
import io
import urllib.request
from urllib.parse import unquote

from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY from the environment

URL = "https://huggingface.co/datasets/google/frames-benchmark/resolve/main/test.tsv"
rows = list(csv.DictReader(io.StringIO(urllib.request.urlopen(URL).read().decode()), delimiter="\t"))

def title(url: str) -> str:
    """Normalize a Wikipedia URL to a lowercase article title."""
    return unquote(url.split("/wiki/")[-1].split("#")[0]).replace("_", " ").lower()

hits = needed = 0
for row in rows[:10]:
    gold = {title(u) for u in ast.literal_eval(row["wiki_links"])}
    result = client.search(
        mode="fast",
        objective=row["Prompt"],
        search_queries=[row["Prompt"][:200]],
        advanced_settings={"source_policy": {"include_domains": ["en.wikipedia.org"]}},
    )
    found = {title(r.url) for r in result.results if "/wiki/" in r.url}
    hits += len(gold & found)
    needed += len(gold)
    print(f"{len(gold & found)}/{len(gold)} gold articles in {len(result.results)} results")

print(f"Gold-article recall, one search per question: {hits / needed:.0%}")
```

Install with `pip install parallel-web`. Using `en.wikipedia.org` rather than `wikipedia.org` keeps out Simple English Wikipedia, which the apex domain would match. Expect a single search to miss most of the later hops, since the query is the whole question and the second article often can't be named until the first is read. That is the gap the paper's multi-step pipeline closed. To reproduce it, let your agent issue new queries after reading each round of results, then judge the final answer. The [how to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) guide covers sampling, judge setup, and cost tracking for a full run.

Fast mode costs $1 per 1,000 requests, so a full 824-question pass at five searches per question is 4,120 requests, about $4 of search spend before LLM tokens.

## FAQ

### Who created the FRAMES benchmark?

A team of seven Google researchers; Satyapriya Krishna is the first author. The paper was posted to arXiv on September 19, 2024 (2409.12941), and the dataset is published as google/frames-benchmark on Hugging Face.

### How many questions are in FRAMES?

FRAMES has 824 questions. Each needs information from 2 to 15 Wikipedia articles, and each is tagged with one or more of five reasoning types.

### Is FRAMES a web search benchmark?

Partly. It was designed for RAG over Wikipedia, and the paper's pipeline used a fixed BM25 index. You can run it against a web search API by restricting results to Wikipedia, but it says little about freshness or coverage of the wider web.

### What is a good FRAMES score?

In the 2024 paper, Gemini-Pro-1.5-0514 scored 0.408 with no retrieval, 0.66 with multi-step retrieval, and 0.729 with every gold article in context. Those are dated baselines, so compare systems you run yourself under the same judge.

### Does Parallel publish a FRAMES result?

Not currently. Our published Search API runs cover SimpleQA Verified, BrowseComp, and WideSearch.

Related: [BrowseComp benchmark](https://parallel.ai/articles/browsecomp-benchmark), [SimpleQA benchmark](https://parallel.ai/articles/simpleqa-benchmark), [DeepSearchQA benchmark](https://parallel.ai/articles/deepsearchqa-benchmark), [How to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis).

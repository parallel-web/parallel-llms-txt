# WideSearch explained: benchmarking broad information collection for agents

WideSearch is ByteDance Seed's benchmark for wide information seeking, where an agent must gather hundreds of easy facts into one complete table instead of hunting down a single hidden answer. This guide covers how the 200 tasks are built and scored, what the original paper found, the benchmark's limits, and how search APIs compare on it today.

WideSearch is a benchmark from ByteDance Seed that tests whether an AI agent can collect a large set of easy-to-find facts from the web and return all of them, correctly, in one table. It has 200 tasks (100 in English, 100 in Chinese) drawn from real user queries across more than 15 domains, and it was released on arXiv on August 11, 2025. Each task names the rows and columns it wants, and the agent's table is checked cell by cell against a human-built answer table.

We make Parallel, a web search API for agents, and we publish our own WideSearch results on [parallel.ai/benchmarks](https://parallel.ai/benchmarks), so read the comparison section with that in mind.

## Wide search vs. deep search

Most agent search benchmarks are deep. [BrowseComp](https://parallel.ai/articles/browsecomp-benchmark) asks for one short answer that is buried behind several layers of clues, and the hard part is finding it at all. WideSearch flips that. The individual facts are usually sitting on a ranking page, a government statistics table, or a company's investor site, and a person could find any one of them in a minute. The difficulty is volume: dozens or hundreds of entities, several attributes each, and no tolerance for a missing row.

The authors frame it as the gap between "I can't find it" (deep search) and "I could do it, but the sheer volume is overwhelming" (wide search). Wide search rewards planning, bookkeeping of which cells are still empty, and restraint about guessing.

## How the WideSearch benchmark is built

Every task is a natural-language request that ends with an exact output spec: a Markdown table with named columns in a fixed order. The [Hugging Face dataset](https://huggingface.co/datasets/ByteDance-Seed/WideSearch) pairs each query with a gold CSV and an evaluation spec listing the key columns, required columns, and a scoring rule per column.

The tasks went through a five-stage quality process. Annotators had to be able to verify every cell from public web pages, answers had to be stable over time, and tasks had to be unanswerable from a model's memory alone. Any task a human annotator finished in under 10 minutes, or by consulting fewer than 10 unique web pages, was dropped as too easy. The project page reports an average human completion time of 2.3 hours and more than 44 pages consulted per task.

The resulting tables are large. Counting the 200 public gold CSVs ourselves on October 19, 2026, the median task expects 37 rows and 200 cells, the mean is 73.2 rows and 450 cells, and the largest table has 1,458 rows and 8,748 cells.

## Example WideSearch tasks

The paper and dataset card publish several tasks in full. Paraphrased:

- Build a table of the top five universities in each of five QS World University Rankings by Subject 2025 subject areas, with each university's overall QS and Times Higher Education 2025 rank, homepage, application deadline, and application fee.
- List the annual GDP growth rate for every sub-Saharan African country from 2022 to 2024, using World Bank data.
- List every feature-length animated film Walt Disney Animation Studios released in U.S. theaters from 2000 through 2024, with the official U.S. theatrical release date.
- For the Chinese half, an example asks for the top five domestic box-office films in China and the United States for each year from 2020 to 2024, with director, cumulative domestic gross, and genre.

The university task alone has a 25-row, nine-column gold table, pulled from ranking sites and individual admissions pages, and a single wrong deadline breaks a perfect score.

## How WideSearch is scored

Scoring starts by aligning the agent's rows with the gold rows using the key columns (for the university task, subject plus university). Each aligned cell is then checked with the rule its column specifies: exact match for strings like names, numeric tolerance for figures such as revenue or visitor counts, date normalization so "July 4th, 2024" matches "2024-07-04", URL normalization, and an LLM judge for free-text fields where wording varies. The authors report that this pipeline agreed with human graders more than 97.8% of the time across the judge models they tried.

Three metrics come out of that:

- **Success rate** is the headline. A task counts only if the whole table matches the gold table, content and structure. One extra, missing, or wrong cell is a failure.
- **Row-level F1** treats each row as a unit, so it measures how many complete and correct records the agent returned.
- **Item-level F1** treats each cell as a unit, so it gives partial credit for a table that is mostly right.

The paper runs every system four times per task and reports Avg@4 (the mean over four runs) alongside Pass@4 for success rate (solved in at least one run) and Max@4 for the F1 scores (best of four).

## What the WideSearch paper found

The results in the paper, from August 2025, were bleak on the strict metric. The authors tested more than 10 systems in three setups: single agents, a multi-agent framework where a lead agent splits the task across parallel sub-agents, and commercial end-to-end products used through their web interfaces. Most success rates were near zero. The best, OpenAI o3 in the multi-agent framework, reached 5.1% (Avg@4). Claude Sonnet 4 (Thinking) reached 3.6% and Gemini 2.5 Pro 2.0% in the same framework, and DeepSeek-R1 scored 0.4% as a single agent.

Item-level F1 tells a different story. The same systems scored between 41.3% and 62.2% item-level F1 (Avg@4), so they were finding most of the facts. In a test-time scaling run with Kimi K2, item-level F1 approached 80% with enough retries, while success rate stayed below 20% even at 128 attempts. Humans were not perfect either. On a 20-task sample, a single person working alone reached a 20% success rate, while teams of annotators cross-checking each other got close to 100%.

The error analysis traced the failures to four advanced-capability problems:

- **Incomplete query decomposition.** In the university example, an agent found the right schools but never issued the follow-up searches for deadlines and fees.
- **Lack of reflection.** When a search came back empty, as with the World Bank GDP task, agents gave up instead of rephrasing.
- **Failure in evidence utilization.** Agents retrieved a relevant page but grounded the answer in the wrong source.
- **Knowledge hallucination.** With no search result to lean on, models filled cells from memory.

The paper also lists basic failures, such as missing or malformed Markdown tables. The authors set aside several dedicated deep research products because they returned long reports with multiple tables instead of the single table the task asked for.

## Limitations

WideSearch is small. With 200 tasks, and many third-party runs using a 100-task sample, a few tasks can move a score by several points. The tasks are also uneven in size: the largest gold table has more cells than the smallest 50 tasks put together, so averaging per task and averaging per cell can rank systems differently.

The answers are public. The full gold tables have been public on Hugging Face since the August 2025 release, in the same repository as the queries, which makes contamination through training data or a lucky crawl plausible.

Ground truth also ages: pages move, and a 2025 application fee may no longer be on the page an agent finds today. LLM-judged cells add a little grader noise. Half the tasks are in Chinese, so results depend on a search provider's Chinese-language coverage as much as on the agent.

Finally, the metric choice changes the story. Success rate is close to zero for every system, which makes it hard to rank anything. Most published comparisons, including ours and OpenRouter's live board (which reports item-weighted F1 for WideSearch), use a partial-credit score instead. Those numbers are not comparable to the paper's success rates, or to each other unless the harness, model, and sample match.

## How search APIs compare on WideSearch

Our [benchmarks page](https://parallel.ai/benchmarks) runs WideSearch on a sample of 100 tasks as a multi-step agentic eval at two price tiers, with evals run on September 9, 2026. The frontier tier uses a GPT-5.6 Sol agent (reasoning high), the low-cost tier a GPT-5.6 Luna agent (reasoning low), and every provider runs at both tiers with the same agent. The agent calls the provider's search tool plus its extract tool where one exists (Parallel, Exa, Tavily); Perplexity is search-only. Cost is USD per 1,000 tasks (CPM), including LLM tokens and tool calls.

The score is a partial-credit item-level score: the share of required items collected correctly, averaged across tasks. It is not exact-match accuracy, and it is not the paper's success rate. Our methodology is written up in [how we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis).

| Tier | Provider | Score | Cost (CPM) |
| --- | --- | --- | --- |
| Low-cost | Parallel Turbo | 44 | $10.1 |
| Low-cost | Parallel Fast | 45.5 | $10.5 |
| Low-cost | Perplexity | 47 | $24.8 |
| Low-cost | Tavily | 47.9 | $107 |
| Low-cost | Exa Auto | 53 | $41.2 |
| Frontier | Perplexity | 53.5 | $547 |
| Frontier | Parallel Basic | 55.3 | $965 |
| Frontier | Exa Auto | 55.9 | $1,061 |
| Frontier | Tavily | 55.9 | $1,072 |
| Frontier | Parallel Advanced | 57.6 | $692 |

At the low-cost tier, Exa Auto is the clear leader at 53, well ahead of Parallel Fast at 45.5. Parallel Turbo and Fast are the cheapest runs on the board at about $10 per 1,000 tasks, but on this benchmark they trail every competitor at the same tier. At the frontier tier, Parallel Advanced scores highest at 57.6, and does so at a lower cost than Exa Auto or Tavily, though the spread from 53.5 to 57.6 is small for a 100-task sample.

The bigger pattern is that the stronger agent matters more than the provider. Every frontier run beats every low-cost run, and the frontier runs cost roughly 10 to 95 times as much per task. That fits the paper's error analysis, since much of WideSearch is planning and bookkeeping.

## When a table-filling job needs a different tool

WideSearch measures a general agent with a search tool building a table from scratch. In production you often don't have to do it that way. If the job is "find every entity that matches these conditions", Parallel's [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) takes a natural-language query, generates candidates from web data, checks each one against match conditions, and can enrich the matches with extra fields, with citations. If you already have the list of rows and need the same columns filled for each, the Task API runs one research task per row against a structured output schema. We haven't published WideSearch numbers for either, so this is a design point rather than a benchmark claim: splitting enumeration from enrichment removes two of the paper's failure modes (incomplete decomposition and losing track of empty cells) from the agent's loop.

## Running WideSearch yourself

The [GitHub repository](https://github.com/ByteDance-Seed/WideSearch) (MIT license) includes the inference and evaluation scripts. You plug a search tool into `src/agent/tools.py`, set model parameters in `src/utils/config.py`, and run `scripts/run_infer_and_eval_batching.py` with a trial count. The dataset loads directly from Hugging Face. The snippet below reads the public task file, prints one task's key and required columns, and makes the kind of Parallel Search call an agent would issue while filling that table.

```python
import json
import urllib.request

from parallel import Parallel

BASE = "https://huggingface.co/datasets/ByteDance-Seed/WideSearch/resolve/main"

# Load the 200 public WideSearch tasks
with urllib.request.urlopen(f"{BASE}/widesearch.jsonl") as f:
    tasks = [json.loads(line) for line in f.read().decode("utf-8").splitlines()]

task = next(t for t in tasks if t["language"] == "en")
spec = json.loads(task["evaluation"])
print(task["instance_id"], "| key columns:", spec["unique_columns"])
print("required columns:", spec["required"])

# One search call an agent might make while filling the table
client = Parallel()  # reads PARALLEL_API_KEY
result = client.search(
    mode="fast",
    objective=task["query"][:1000],
    search_queries=["QS World University Rankings by Subject 2025 top 5"],
)
for r in result.results[:5]:
    print(r.url)
```

For your own evals, state which metric you report, run each task more than once (the paper's Avg@4 and Pass@4 differ by a factor of two for some systems), and score the English half separately if your workload is English-only. See [how to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis) for sampling and cost accounting.

## FAQ

### Who created WideSearch?

ByteDance Seed. The paper, "WideSearch: Benchmarking Agentic Broad Info-Seeking" by Ryan Wong, Jiawei Wang, and 11 co-authors, was posted to arXiv (2508.07999) on August 11, 2025 and revised on August 28, 2025.

### How many tasks are in WideSearch?

200 tasks, split evenly between English and Chinese, from more than 15 domains (the project page counts 18 topics). The gold answer tables are public.

### What is a good WideSearch score?

It depends on the metric. On the paper's strict success rate, the best system in August 2025 scored 5.1%. On our partial-credit item-level score, September 9, 2026 runs range from 44 to 57.6.

### How is WideSearch different from BrowseComp?

BrowseComp asks for one hard-to-find answer per question. WideSearch asks for many easy-to-find facts per task and scores completeness. An agent can do well on one and poorly on the other.

### Is WideSearch contaminated?

Possibly. The gold tables have been downloadable since August 2025, so spot-check the sources in your agent's traces.

Related: [BrowseComp explained](https://parallel.ai/articles/browsecomp-benchmark), [DeepSearchQA explained](https://parallel.ai/articles/deepsearchqa-benchmark), [How we evaluate web search APIs](https://parallel.ai/articles/how-we-evaluate-web-search-apis).

# FinSearchComp explained: what it measures and how search APIs compare

Search APIs and research products now cite FinSearchComp, ByteDance Seed's finance benchmark, as evidence that they can handle analyst-grade data work, but their scores often measure different things. This guide covers the three task tiers, how expert-written answers are graded, how search APIs and research products score, and how to run it yourself.

FinSearchComp is an open benchmark of 635 finance questions that tests whether an AI agent can search for financial data and reason over it the way an analyst does. ByteDance Seed built it with 70 financial experts and an advisor from Columbia Business School. Questions fall into three tiers (live data, single historical facts, and multi-step historical investigations), and every answer is graded right or wrong against an expert-set tolerance.

We make Parallel, a web search API for AI agents, and we ran the search API evaluations reported below, so read with that in mind. The methodology is on our [benchmarks page](/benchmarks), and where research products publish higher end-to-end scores, this article says so.

## What FinSearchComp measures

The paper ([arXiv 2509.13160](https://arxiv.org/abs/2509.13160), first posted September 16, 2025, and an [ICLR 2026 poster](https://openreview.net/forum?id=8AJbbbe2ni)) argues that general browsing benchmarks such as [BrowseComp](/articles/browsecomp-benchmark) reward findability: one obscure fact with a short, verifiable answer. Finance asks for more. An analyst has to pick the right fiscal period, match units and currencies, handle restatements, and reconcile two sources that disagree. Older finance QA sets such as FinQA hand the model the documents, skipping search entirely.

FinSearchComp keeps the search step and makes every question require at least one external tool call. It also covers two markets: a Global subset (Western markets, questions in English) and a Greater China subset (questions in Chinese).

## The three FinSearchComp tasks

Counts come from the [released dataset](https://huggingface.co/datasets/ByteSeedXpert/FinSearchComp).

| Task | What it asks | Example from the paper | Global | Greater China | Total |
| --- | --- | --- | --- | --- | --- |
| T1 Time-Sensitive Data Fetching | A value that changes daily or intraday | IBM's latest close price | 134 | 110 | 244 |
| T2 Simple Historical Lookup | One fixed historical fact | Starbucks' total assets as of September 27, 2020 | 119 | 100 | 219 |
| T3 Complex Historical Investigation | A multi-period calculation across many data points | The month between January 2010 and April 2025 with the S&P 500's largest single-month gain | 84 | 88 | 172 |

**T1** tests freshness: latest closes, FX rates, gold prices. The answer changes every trading day, so the dataset stores a rubric describing what to fetch and how much error to allow, and the evaluators pull the real value from a market data API at grading time.

**T2** tests point-in-time accuracy. The hard parts are fiscal versus calendar years, restated figures, and units. A question about "NVIDIA's revenue in 2024" is ambiguous because NVIDIA's fiscal year doesn't match the calendar, so the annotation guide requires wording like "fiscal year 2024".

**T3** tests synthesis over long horizons. The S&P 500 example spans 184 months, and the paper's reference answer is April 2020 (12.68%, with ±0.1% allowed). Other items ask for every day in five years when London gold fell more than $80. The agent has to gather many numbers and compute without a single slip.

The paper reports that accuracy falls from T1 to T2 to T3 for nearly every system, which is the intended difficulty curve.

## How the questions were built and checked

The 70 experts split into a 50-person annotation panel and a 20-person senior review panel, all with at least a master's in finance and working at firms including Citadel, J.P. Morgan, Deutsche Bank, and CITIC Securities.

Annotators wrote questions from their own work and from financial-database tables, sourcing answers from filings, regulator and statistics-bureau sites, and professional databases. Quality control had several layers:

- **Cross-validation of sources.** Answers were checked against a second official source or database, which the authors say caught errors in some well-known databases.
- **Ambiguity rules.** Questions avoid metrics that providers calculate differently (adjusted stock prices, the "earnings" in P/E TTM, crypto prices that vary by exchange) and must name the accounting standard, currency, unit, and rounding.
- **Blind review.** One or two other experts solved each question without the key. Disagreements went to a senior expert, who revised or discarded the item.

## How FinSearchComp is graded

Scoring is binary. An LLM judge reads the question, the reference answer with its scoring criteria, and the model's response, then returns 1 or 0. The dataset ships the judge prompt with every question.

Most reference answers are ranges or tolerances rather than one exact number: "rounding errors are allowed" on a balance-sheet figure, or a fixed margin on a share count. For T1, the paper sets tolerances by asset class. Mainstream stocks and indices allow rounding differences only, other regional indices accept anything within the day's high-low range, and FX accepts the day's range plus a buffer.

To validate the judge, the authors had humans re-check roughly 400 graded responses for each part of the benchmark. The judge agreed with human labels about 95% of the time.

## Results in the FinSearchComp paper

The authors evaluated 21 models and products in August 2025, plus a human baseline of 50 separate financial experts using search tools.

| System (August 2025) | Global average | Global T3 | Greater China average | Greater China T3 |
| --- | --- | --- | --- | --- |
| Human experts | 75.0 | 51.4 | 88.3 | 76.7 |
| Grok 4 (web) | 68.9 | 51.2 | 51.9 | 23.9 |
| GPT-5-Thinking (web) | 63.9 | 47.6 | 46.4 | 15.9 |
| DouBao (web) | 39.1 | 22.6 | 54.2 | 11.4 |

Grok 4 (web) led the Global subset, 6.1 points behind human experts, and nearly matched them on Global T3. DouBao (web) led the Greater China subset, but every system there trailed humans by more than 34 points. Source: the paper's [appendix B](https://arxiv.org/html/2509.13160) and the [project leaderboard](https://randomtutu.github.io/FinSearchComp/).

The paper also shows how much the search layer matters. Turning on search raised scores by an average of 40.8 points on T1, 29.0 on T2, and 8.1 on T3, according to the paper. Its case study traces many failures to shallow search and stale or mis-dated evidence.

## How search APIs score on FinSearchComp

The paper compares whole products. To isolate the search API, we ran the two historical tiers on Oct 22, 2026 (Tavily on Oct 28): 172 graded T3 questions and 219 graded T2 questions, which is every T3 and T2 item in the release, in both languages.

- **One agent loop.** Every provider gets the same questions and the same LLM judge. The agent calls the provider's search tool, plus its fetch tool where one exists.
- **One answer model.** Every arm uses GPT-6 Sol (reasoning high), except Parallel Fast, which runs as our low-latency stack with GPT-6 Luna (reasoning high).
- **End-to-end cost** at list price: model tokens plus every search and fetch call, per 1,000 questions.
- **Three runs per arm**, averaged. Tavily is a single run.

FinSearchComp's reference answers are published online, which creates a contamination problem: a search engine can return a page that already contains the answer key. Our harness drops those copies before the model sees them for every search API it calls directly. OpenAI's native search runs inside OpenAI's API, so for that arm, answers that came from published copies count as wrong. Before that adjustment, OpenAI native search scores 82.8 on T2 and 64.0 on T3.

### FinSearchComp T3 (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 15.2, "y": 53.7},
  {"label": "Parallel Advanced", "x": 161.1, "y": 57.4}
]
```

```
[
  {"label": "Exa Auto", "x": 226.2, "y": 51.4},
  {"label": "OpenAI native search", "x": 204.3, "y": 48.3},
  {"label": "Perplexity Finance + Web", "x": 347.0, "y": 50.0},
  {"label": "Tavily", "x": 481.8, "y": 43.0}
]
```

### FinSearchComp T2 (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 3.3, "y": 77.5},
  {"label": "Parallel Advanced", "x": 35.1, "y": 79.9}
]
```

```
[
  {"label": "Exa Auto", "x": 69.9, "y": 77.9},
  {"label": "OpenAI native search", "x": 70.2, "y": 77.9},
  {"label": "Perplexity Finance + Web", "x": 104.6, "y": 79.7},
  {"label": "Tavily", "x": 169.0, "y": 77.2}
]
```

### T3: complex historical investigation

| Search API | T3 accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced | 57.4% | $161.10 |
| Parallel Fast | 53.7% | $15.20 |
| Exa Auto | 51.4% | $226.20 |
| Perplexity Finance + Web | 50.0% | $347.00 |
| OpenAI native search | 48.3% | $204.30 |
| Tavily | 43.0% | $481.80 |

On T3, Parallel Advanced is the most accurate search API in this agent loop. It leads Exa by 6.0 points, Perplexity by 7.4, OpenAI by 9.1, and Tavily by 14.4, and it costs less than every competitor, at 1.3x to 3x lower cost. Parallel Fast comes second at 53.7%, ahead of every competitor's accuracy at 13x to 32x lower cost. T3 is where search quality shows, because the agent makes many calls and each must return the right period's figure from a reliable source.

### T2: simple historical lookup

| Search API | T2 accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced | 79.9% | $35.10 |
| Perplexity Finance + Web | 79.7% | $104.60 |
| Exa Auto | 77.9% | $69.90 |
| OpenAI native search | 77.9% | $70.20 |
| Parallel Fast | 77.5% | $3.30 |
| Tavily | 77.2% | $169.00 |

T2 is close. Parallel Advanced posts the top score, but its margin over Perplexity is 0.2 points, and all six arms land within 2.7 points of each other. The difference on T2 is cost. Parallel Advanced runs at half the cost of the cheapest alternative (Exa, $69.90) and about a third of Perplexity's, and Parallel Fast comes within half a point of Exa and OpenAI at about 20x lower cost.

These scores aren't comparable to the paper's table, which graded consumer products in August 2025 with a different judge.

## Research API results from You.com and Linkup

Two vendors have published FinSearchComp results for research APIs, which return a finished answer using their own models and orchestration.

[You.com](https://you.com/resources/introducing-the-finance-research-api-agentic-research-no-infra-required) launched its Finance Research API on September 21, 2026. It reports 87.29% on T2 at $110 per 1,000 queries (Deep tier), which it describes as "more than 14 points ahead of the next best system", and 58.33% on T3 for the Deep tier. It ran English-only queries on T2 and T3. Its tables list Parallel's Task API (Ultra) at 73.11% on T2 and 46.43% on T3, Perplexity Finance at 72.27% and 55.95%, Exa Research Pro at 42.02% and 26.19%, and Tavily Research Pro at 40.34% and 36.90%. The harness is public at [youdotcom-oss/web-search-api-evals](https://github.com/youdotcom-oss/web-search-api-evals).

[Linkup](https://www.linkup.so/benchmarks) reports that "Linkup research is 1st on both tiers (T2 82.4% and T3 58.3%)", using each provider's best research or deep configuration. Its T2 list shows Parallel ultra at 73.1%, Perplexity at 72.3%, Exa research_pro at 42.0%, and Tavily research_pro at 40.3%. The [benchmark repository](https://github.com/LinkupPlatform/linkup-finance-benchmark) uses the Global subset only: 119 T2 and 84 T3 questions.

These numbers and ours answer different questions:

|  | Research API results (You.com, Linkup) | Search API results (parallel.ai/benchmarks) |
| --- | --- | --- |
| What's tested | A full research product: its model, orchestration, and search | The search layer only |
| Model | Each vendor's own | Fixed GPT-6 agent for every arm |
| Harness and judge | Each publisher's | One harness and judge for all arms |
| Questions | English or Global subset (119 T2, 84 T3) | All 219 T2 and 172 T3, both subsets |
| Question it answers | Which finished research product gets the most right? | Which search API should my own agent call? |

Both kinds of result are legitimate. If you want to hand off the whole question, the research-product tables are the relevant ones. If you're choosing what your own agent searches with, the search-layer tables are.

## Why most published results skip T1

T1 answers change by the minute. A score on "Nvidia's closing price yesterday" depends on the run date, the grading time, and the data feed used as ground truth, so nobody can reproduce it later. You.com says as much in its post, noting that "any published score would be outdated within hours."

T1 also rewards a different capability. The paper found that products with dedicated financial data plugins did best on it, and that equipping DeepSeek-R1 with a financial plugin on Tencent's YuanBao lifted its T1 score by 31.9 points on average. That makes T1 more a test of market-data access than of web search.

## FinSearchComp and FrontierFinance

FinSearchComp grades short answers. Much finance work is long-form, like an earnings preview or a comp set with reasoning. Samaya's FrontierFinance ([arXiv 2608.11683](https://arxiv.org/abs/2608.11683)) covers that side with 220 expert-written research queries graded against rubrics by three judges. Our results for it are in [our guide to the best search API for financial AI agents](/articles/best-search-api-for-financial-ai-agents) and the [Parallel for Finance launch post](/blog/parallel-for-finance).

## How to run FinSearchComp yourself

The dataset is on [Hugging Face](https://huggingface.co/datasets/ByteSeedXpert/FinSearchComp) under CC BY 4.0, as one JSON file of 635 records. Each record has the prompt, the reference answer with its scoring criteria, the judge's system prompt and template, and a label for tier and region. Run your agent on each prompt, fill the judge template with the prompt, reference, and response, and count the 1s.

A few choices change scores a lot:

1. **Filter the answer key.** The references are public, so drop pages that reproduce the dataset.
2. **Hold the model fixed** if you're comparing search providers, along with reasoning effort and the tool-call budget.
3. **Report by tier and subset.** A blended score hides the T2 versus T3 split, and English-only runs leave out Greater China.
4. **Log cost per question**, including every search and fetch call.

Our [guide to benchmarking web search APIs](/articles/how-to-benchmark-web-search-apis) covers harness design in more detail. Below is one T3-style step: it gathers one year of the data the S&P 500 example needs, and the agent then searches again for the other years.

```python
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY

result = client.search(
    mode="advanced",  # or "fast" for the low-cost stack
    objective=(
        "Monthly percentage change in the S&P 500 index for each month of 2020, "
        "based on month-end closing values. Prefer index-provider or exchange "
        "data over news articles."
    ),
    search_queries=[
        "S&P 500 monthly returns 2020",
        "S&P 500 month-end close 2020",
        "S&P 500 April 2020 monthly gain",
    ],
)

for r in result.results[:5]:
    print(r.title, r.url)
    for excerpt in (r.excerpts or [])[:1]:
        print("  ", excerpt[:200].replace("\n", " "))
```

Install the SDK with `pip install parallel-web`. Advanced mode costs $5 per 1,000 requests and Fast costs $1. For how finance teams use steps like this in production, see [AI agents in finance](/learn/ai-agents-in-finance); for another multi-step search benchmark, see [DeepSearchQA](/articles/deepsearchqa-benchmark).

## Frequently asked questions

**How many questions are in FinSearchComp?**

635: 244 time-sensitive (T1), 219 simple historical (T2), and 172 complex historical (T3). The Global subset has 337 questions in English and the Greater China subset has 298 in Chinese.

**What is a good FinSearchComp score?**

It depends on the tier and the setup. In the paper, human experts averaged 75.0 on the Global subset and 88.3 on Greater China, and the best product, Grok 4 (web), scored 68.9 on Global. In our search API runs with a fixed GPT-6 agent, T2 scores cluster between 77% and 80% while T3 ranges from 43.0% to 57.4%, so T3 separates providers more.

**Why do vendors report only T2 and T3?**

T1 answers are live market data, so a T1 score depends on the day and time it was run and can't be reproduced later. T2 and T3 have fixed reference answers.

**Can I compare You.com's or Linkup's FinSearchComp scores with Parallel's search API scores?**

Not directly. Their tables measure end-to-end research products in their own harnesses on the Global or English subset. Ours measure search APIs under one fixed agent on all T2 and T3 questions. Each answers a different question.

## Start building

Get an API key on [Parallel's platform](https://platform.parallel.ai/), with up to $80 in free credits, read the [Search API docs](https://docs.parallel.ai/), and see [Parallel for finance](/solutions/finance) for how banks and investment firms use it in production.

# The best web search API for financial AI agents (2026 benchmarks)

When search APIs run inside one shared agent loop, Parallel Search in advanced mode is the most accurate option for financial AI agents on FinSearchComp T3, and it costs less than every competitor we tested. This guide covers what finance agents need from search, results and costs on four finance benchmarks, and when Exa, Perplexity, OpenAI, Tavily, or a finance research API is the better pick.

For a financial AI agent that has to find exact, dated facts on the open web, Parallel Search in advanced mode was the strongest search layer in our tests. On FinSearchComp T3, the hardest tier, it scored 57.4% with every provider plugged into the same agent loop, 6.0 points ahead of the next search API, and it cost 1.3x to 3x less per answer than every competitor.

The other three benchmarks are closer. On FinSearchComp T2, Parallel Advanced posts the top score by 0.2 points over Perplexity, at half the cost of the cheapest alternative. On FrontierFinance, Exa Auto leads by 0.4 points in a single run, and Parallel is 38% cheaper. On PWS-Finance, our held-out benchmark, Parallel Advanced edges OpenAI's native search by 0.6 points at 30% lower cost. We make Parallel and ran these evaluations; the methodology and charts are on [/benchmarks](/benchmarks).

## What do finance agents need from a search API?

Finance questions punish approximate answers. A correct figure for the wrong fiscal year is still wrong.

- **Exact figures with an as-of date.** The agent needs the number for a specific period, plus the date that makes it true. Search results should carry publish dates and excerpts that contain the figure itself.
- **Sources outside licensed data.** Many of the facts that matter sit in regulator registers, local-exchange filings, central bank releases, and private-company announcements, not in the market data feed you already license. A [KYB check](/learn/kyb) often depends on a single register entry.
- **Non-US and private-company coverage.** Real research questions ask about ArcelorMittal Poland's subsidiaries or whether ADCB is on the FCA register, and both appear in PWS-Finance. FinSearchComp itself was built to cover global and Greater China markets.
- **Citations an auditor can follow.** Every figure should map back to a URL, so a reviewer can check it and a compliance team can file it.
- **Cost at agent scale.** An agent makes many search calls per question, and a research workflow runs thousands of questions a day. Per-answer cost, including the model tokens that search results add, decides whether a workflow is affordable.

Our guide to [AI agents in finance](/learn/ai-agents-in-finance) covers the workflows these requirements come from.

## How we tested

Every search API ran in the same agent loop, with the same questions and the same LLM judge (a panel of three judges for FrontierFinance). The search layer was the only variable. The agent called each provider's search tool, plus its fetch tool where the provider has one.

Cost is end to end per answer at list price: the answer model's tokens plus every search and fetch call, reported per 1,000 questions. On FinSearchComp, every arm answered with GPT-6 Sol (reasoning high), except Parallel Fast, which ran as a low-latency stack with GPT-6 Luna (reasoning high). On FrontierFinance and PWS-Finance, every arm, Parallel Fast included, answered with GPT-6 Sol (reasoning high) and a budget of 20 tool calls per question.

Parallel Advanced and Parallel Fast are Parallel Search in advanced and fast mode; OpenAI native search is the web search tool built into OpenAI's API. FinSearchComp ran on Oct 22, 2026 (Tavily on Oct 28), and FrontierFinance and PWS-Finance on Oct 27.

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

### FrontierFinance (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Fast",
    "x": 201.5,
    "y": 46.0
  },
  {
    "label": "Parallel Advanced",
    "x": 234.2,
    "y": 46.8
  }
]
```

```
[
  {
    "label": "Exa Auto",
    "x": 376.3,
    "y": 47.2
  },
  {
    "label": "OpenAI native search",
    "x": 298.7,
    "y": 45.0
  },
  {
    "label": "Perplexity Search API",
    "x": 254.3,
    "y": 44.3
  },
  {
    "label": "Tavily",
    "x": 470.3,
    "y": 42.1
  }
]
```

### PWS-Finance (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Fast",
    "x": 110.3,
    "y": 83.0
  },
  {
    "label": "Parallel Advanced",
    "x": 125.5,
    "y": 84.3
  }
]
```

```
[
  {
    "label": "Exa Auto",
    "x": 197.6,
    "y": 75.9
  },
  {
    "label": "OpenAI native search",
    "x": 180.7,
    "y": 83.7
  },
  {
    "label": "Perplexity Search API",
    "x": 121.9,
    "y": 74.3
  }
]
```

## FinSearchComp T3: complex historical investigation

[FinSearchComp](https://arxiv.org/abs/2509.13160) is a 635-question benchmark written by 70 financial experts. T3 is its hardest task: multi-step questions that need several sources and a calculation. We ran 172 graded T3 questions, and scores are the mean of three runs (Tavily is a single run). Our [FinSearchComp explainer](/articles/finsearchcomp-benchmark) covers the benchmark in detail.

| Search API | Accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced | 57.4% | $161.10 |
| Parallel Fast | 53.7% | $15.20 |
| Exa Auto | 51.4% | $226.20 |
| Perplexity Finance + Web | 50.0% | $347.00 |
| OpenAI native search | 48.3% | $204.30 |
| Tavily | 43.0% | $481.80 |

Parallel Advanced leads Exa by 6.0 points, Perplexity by 7.4, OpenAI by 9.1, and Tavily by 14.4. It's also the cheaper option in every pairing: 1.3x cheaper than OpenAI, 1.4x than Exa, 2.2x than Perplexity, and 3.0x than Tavily. Parallel Fast places second overall at 53.7%, ahead of every competitor's accuracy at 13x to 32x lower cost.

FinSearchComp's answers are published online, so our harness drops those copies before the model sees them for the other search APIs. OpenAI native-search answers that came from published copies count as wrong. Before that adjustment, OpenAI scores 82.8 on T2 and 64.0 on T3, so treat its FinSearchComp numbers with that rule in mind.

## FinSearchComp T2: simple historical lookup

T2 asks for a single historical fact, such as total assets on a given date. We ran 219 graded questions, three runs each.

| Search API | Accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced | 79.9% | $35.10 |
| Perplexity Finance + Web | 79.7% | $104.60 |
| Exa Auto | 77.9% | $69.90 |
| OpenAI native search | 77.9% | $70.20 |
| Parallel Fast | 77.5% | $3.30 |
| Tavily | 77.2% | $169.00 |

Every arm lands within 2.7 points of the others, so T2 is a cost comparison. Parallel Advanced posts the top score at half the cost of Exa, the cheapest alternative, and about a third of Perplexity's cost. Parallel Fast comes within half a point of Exa and OpenAI at about 20x lower cost, which makes it the sensible default for high-volume lookups.

## FrontierFinance: long-form investment research

[FrontierFinance](https://arxiv.org/abs/2608.11683), from Samaya, has 220 expert-written research queries that span the investment workflow, from screening and company research to earnings, modeling, and catalyst monitoring. Answers are long-form, and three judges score each against expert rubrics; the score is the rubric pass rate by judge majority. This is a single run per arm. Perplexity ran as the Search API only, without a fetch tool.

| Search API | Score | Cost per 1,000 questions |
| --- | --- | --- |
| Exa Auto | 47.2 | $376.30 |
| Parallel Advanced | 46.8 | $234.20 |
| Parallel Fast | 46.0 | $201.50 |
| OpenAI native search | 45.0 | $298.70 |
| Perplexity Search API | 44.3 | $254.30 |
| Tavily | 42.1 | $470.30 |

Exa takes the top score and Parallel ties it within 0.4 points, at 38% lower cost (1.6x cheaper). With one run per arm, treat a 0.4-point gap as a tie. Parallel beats OpenAI, Perplexity, and Tavily on both score and cost, and Parallel Fast is the cheapest arm overall.

## PWS-Finance: held-out questions about one entity on one date

PWS-Finance is Parallel's private benchmark: 174 held-out questions across eight workflows (company profiles, funding and investors, deals, ownership and leadership, public financials, regulation and compliance, markets and macro, and recent developments). Each question asks for specific facts about one entity as of one date, and the answers aren't published anywhere online. Scoring is strict: an answer counts only if every required fact is right. Scores are the mean of three runs.

Questions came from real research demand, and gold answers were labeled with each competitor's highest agentic mode plus our own research agents, then verified. Examples: is ADCB on the FCA register (no, it was dissolved on 2 Apr 2024); what were Rush Enterprises' 2025 acquisitions (Leeds Transit, June 16, 2025, $25.6M); and what was the Banque de France's August 2026 current account (-€1.5bn).

| Search API | Accuracy | Cost per 1,000 questions |
| --- | --- | --- |
| Parallel Advanced | 84.3% | $125.50 |
| OpenAI native search | 83.7% | $180.70 |
| Parallel Fast | 83.0% | $110.30 |
| Exa Auto | 75.9% | $197.60 |
| Perplexity Search API | 74.3% | $121.90 |

Parallel Advanced posts the top score, 0.6 points above OpenAI's native search at 30% lower cost, and 8.4 and 10.0 points above Exa and Perplexity. Parallel Fast comes within 0.7 of OpenAI at 39% lower cost. Tavily isn't in this table: it ran with date filters on and hit the 20-call cap on most questions, so its result isn't comparable.

## Results across all four benchmarks

Accuracy (or rubric score for FrontierFinance), with cost per 1,000 questions in parentheses.

| Search API | FinSearchComp T3 | FinSearchComp T2 | FrontierFinance | PWS-Finance |
| --- | --- | --- | --- | --- |
| Parallel Advanced | 57.4% ($161.10) | 79.9% ($35.10) | 46.8 ($234.20) | 84.3% ($125.50) |
| Parallel Fast | 53.7% ($15.20) | 77.5% ($3.30) | 46.0 ($201.50) | 83.0% ($110.30) |
| Exa Auto | 51.4% ($226.20) | 77.9% ($69.90) | 47.2 ($376.30) | 75.9% ($197.60) |
| OpenAI native search | 48.3% ($204.30) | 77.9% ($70.20) | 45.0 ($298.70) | 83.7% ($180.70) |
| Perplexity | 50.0% ($347.00) | 79.7% ($104.60) | 44.3 ($254.30) | 74.3% ($121.90) |
| Tavily | 43.0% ($481.80) | 77.2% ($169.00) | 42.1 ($470.30) | Not comparable* |

Perplexity ran as Perplexity Finance + Web on FinSearchComp and as the Search API only on FrontierFinance and PWS-Finance. *Tavily ran PWS-Finance with date filters on and hit the 20-call cap on most questions, so we don't report its score.

Across the rows, Parallel Advanced is first or within half a point of first on every benchmark, and it's never the most expensive arm. The clear accuracy gap shows up only on T3, where questions need several hops and a calculation.

## Which search API should a finance team choose?

### Parallel

Choose Parallel Advanced for multi-step research where accuracy decides the outcome: diligence, KYB, and analyst questions that chain several filings together. Choose Parallel Fast when volume and latency matter more, since it stays close to the leaders on T2, FrontierFinance, and PWS-Finance and costs $1 per 1,000 searches. [Parallel's search modes](https://docs.parallel.ai/search/modes) run from Turbo (~200ms, $1 per 1,000 requests) to Advanced (~3s, $5 per 1,000). Enterprise plans add zero data retention and [EU data residency](/learn/data-residency).

In production, [Rogo](https://parallel.ai/blog/case-study-rogo) uses Parallel as its primary web search provider for 60,000+ bankers and investors, and Kepler uses Parallel Search as the discovery layer for comp sets and supply-chain mapping. "Parallel's accuracy and coverage are what made it the only search API we trusted in that role," said Vinoo Ganesh, Kepler's CEO ([case study](https://parallel.ai/blog/case-study-kepler)).

### Exa

Exa Auto has the top FrontierFinance score, 0.4 points ahead of Parallel in a single run, and it placed third on T3. It's a reasonable pick for long-form research answers, especially if you already use Exa. Exa lists Auto search at [$7 per 1,000 requests](https://exa.ai/pricing) with up to 10 results, plus $1 per 1,000 pages for contents. In our runs it cost 1.4x to 1.6x more per answer than Parallel Advanced on T3 and FrontierFinance. See [Exa vs. Parallel](/articles/exa-vs-parallel) for a broader comparison.

### Perplexity

Perplexity Finance + Web scored 79.7% on T2, within 0.2 of the top, so for simple historical lookups it's essentially tied with Parallel Advanced. It cost about three times as much per answer there, and on T3 it trailed by 7.4 points at 2.2x the cost. Perplexity prices its [Search API](https://docs.perplexity.ai/docs/getting-started/pricing) at $5 per 1,000 requests ($1 with Fast Search), and its Agent API offers a `finance_search` tool at $5 per 1,000 invocations. More detail is in [Perplexity Search API vs. Parallel](/articles/perplexity-search-api-vs-parallel-search-api).

### OpenAI native search

OpenAI's built-in web search came within 0.6 points of Parallel Advanced on PWS-Finance, the closest any competitor got on that benchmark. It costs more per answer (30% more on PWS-Finance) and only works inside OpenAI's API with OpenAI models, so it's a fit for teams already committed to that stack. OpenAI charges [$10 per 1,000 web search calls](https://platform.openai.com/docs/pricing), plus search content tokens at the model's rates.

### Tavily

Tavily stayed within 2.7 points of the leader on T2 but finished last on T3 and FrontierFinance, and it was the most expensive arm on T3, T2, and FrontierFinance in our runs. Tavily bills by credit: a basic search costs 1 credit and an advanced search costs 2, at [$0.008 per credit](https://docs.tavily.com/documentation/api-credits) on pay-as-you-go. It fits simple lookups in stacks already built on Tavily. See [Tavily vs. Parallel](/articles/tavily-vs-parallel-search).

## Search APIs vs. finance research APIs

Some vendors publish higher FinSearchComp numbers than our charts show, from a different kind of product measured a different way.

[You.com's Finance Research API](https://you.com/resources/introducing-the-finance-research-api-agentic-research-no-infra-required), launched Sep 21, 2026, runs multi-step agentic research over the web plus licensed structured data from S&P Global and others, and returns a cited report. You.com reports 87.29% on FinSearchComp T2 at $110 per 1,000 queries (Deep tier), "more than 14 points ahead of the next best system," and 58.33% on T3 for the Deep tier, on English-only queries. In its tables, Parallel's Task API (Ultra) scores 73.11% on T2 and 46.43% on T3.

[Linkup](https://www.linkup.so/benchmarks) reports that "Linkup research is 1st on both tiers (T2 82.4% and T3 58.3%)," using each provider's best research or deep configuration. Its T2 list places Parallel Ultra at 73.1%, Perplexity at 72.3%, Exa research_pro at 42.0%, and Tavily research_pro at 40.3%.

These results answer a different question. They measure end-to-end research APIs, each with its own model and orchestration, in the vendor's own harness, with different question subsets and graders. Our charts hold the agent and model fixed and swap only the search layer. Both are legitimate measurements, but they can't share a table. Our comparisons of [You.com](/articles/you-com-vs-parallel) and [Linkup](/articles/linkup-vs-parallel) with Parallel go further into each product.

A finished-report research API is the better choice when you want one call to return a cited answer, you don't need to control the agent, and a response time of minutes is acceptable (You.com's own table shows a median of about two minutes for its Deep tier on T2). Parallel's equivalent is the [Task API](https://docs.parallel.ai/task-api/task-quickstart), which runs deep research and enrichment with processors from Lite to Ultra8x, and the Responses API for research inside a live workflow. The [Parallel for Finance](/blog/parallel-for-finance) launch includes an open-source [tear-sheet cookbook](https://github.com/parallel-web/parallel-cookbook) that uses the Task API to research a list of tickers and render cited two-page tear sheets. If you build your own agent and choose its model, prompts, and tool budget, compare search APIs.

## How to run your own finance search eval

Public benchmarks narrow the field, and an eval on your own questions settles the choice.

1. **Pin every question to an as-of date.** "Total debt as of FY2025 year-end" has one right answer; "total debt" has a new one every quarter.
2. **Use held-out questions.** If the answers are published online, a search API can find the answer key instead of the source. Write fresh questions from your own research queue.
3. **Score strictly.** Count an answer as correct only if every required fact is right, with units and periods matched.
4. **Hold the agent fixed.** Same model, prompt, and tool budget for every provider, so search is the only variable.
5. **Measure end-to-end cost.** Add model tokens to search and fetch fees, and report cost per 1,000 questions, since results that pad the context window cost money too.
6. **Run it more than once.** Margins under a point need repeated runs before you act on them.

Our [guide to benchmarking web search APIs](/articles/how-to-benchmark-web-search-apis) walks through a harness you can adapt.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

result = client.search(
    mode="advanced",
    objective="Rush Enterprises acquisitions completed in 2025, with dates and prices",
    search_queries=["Rush Enterprises acquisition 2025", "Rush Enterprises 8-K acquisition"],
)
for r in result.results:
    print(r.url, r.publish_date)
```

## Frequently asked questions

**What is the best search API for financial AI agents?**

In our tests with every provider in the same agent loop, Parallel Search in advanced mode was the most accurate search API on FinSearchComp T3 (57.4%), at lower cost than every competitor, and it posted the top or tied-top score on the other three finance benchmarks. Exa Auto led FrontierFinance by 0.4 points in a single run.

**Is Parallel Fast accurate enough for finance?**

For many workloads, yes. Parallel Fast scored 53.7% on T3, second overall and ahead of every competitor, and came within a point of OpenAI's native search on PWS-Finance at 39% lower cost. It costs $1 per 1,000 searches, so it fits high-volume lookups and screening.

**Why do You.com and Linkup report higher FinSearchComp scores?**

They measure finished research APIs, each with its own model and orchestration, in their own harnesses. Our numbers compare search APIs under one fixed agent and model. The two kinds of score aren't comparable.

**Can a web search API replace a financial data terminal?**

No. Licensed feeds remain the right source for real-time prices and standardized fundamentals. A search API covers what they miss, such as regulator registers, local-exchange filings, and private-company news.

**How much does search cost for a finance agent?**

In our runs, end-to-end cost per 1,000 questions ranged from $3.30 (Parallel Fast on T2) to $481.80 (Tavily on T3). That figure includes model tokens as well as search fees, so a search API that returns tighter excerpts can lower the total even at a similar per-call price.

## Get started

Create an API key on the [Parallel Platform](https://platform.parallel.ai/), which includes free credits, and follow the [Search quickstart](https://docs.parallel.ai/search/search-quickstart) to run your first query. For enterprise options such as zero data retention, EU data residency, and SSO, see the [finance solutions page](/solutions/finance).

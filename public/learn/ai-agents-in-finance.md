# AI agents in finance: what they do and how they find facts

AI in finance has moved from scoring models and chatbots to agents that research companies, verify business customers, and watch markets on their own, then hand a cited result to a person who decides. This guide covers the main use cases, why those agents depend on web data, how to evaluate the search layer under them, and how to put the pieces together.

AI agents in finance are software systems that use a large language model to plan and carry out multi-step financial work, such as researching a company, verifying a business customer, or monitoring a portfolio, by calling tools like web search, page extraction, and internal databases. They return a sourced work product that an analyst, banker, or compliance officer reviews before anyone acts on it.

## What are AI agents in finance?

Earlier AI in finance mostly scored or classified structured data. An agent takes a goal ("build a buyer list for this sell-side mandate"), and it decides which sources to consult, reads them, reconciles conflicts, and writes up what it found with citations.

| Generation | What it does | Typical example | Main input |
| --- | --- | --- | --- |
| Rules engines | Applies fixed if/then logic | Sanctions-list exact match | Structured fields |
| Machine learning scoring | Predicts a number from historical data | Credit score, fraud probability | Structured tables |
| Chatbots and copilots | Answers from a fixed knowledge base | Customer service bot | Curated documents |
| AI agents | Plans steps, calls tools, returns a cited work product | Tear sheet, KYB file, buyer list | Live web, filings, registers, internal data |

"Generative AI in finance" usually refers to the third row and the drafting half of the fourth: summarizing a filing or writing a memo. "Agentic AI in finance" adds the loop. The model chooses a search, reads the results, notices a gap, and searches again until it can answer.

In the Bank of England and FCA's [2026 survey of AI in UK financial services](https://www.bankofengland.co.uk/report/2026/artificial-intelligence-in-uk-financial-services-2026), 86% of 196 responding firms use AI, 80% already have AI agents deployed, and a further 14% plan to within 12 months. Autonomy is limited: most deployments are decision support, where the agent recommends and a human decides, and only 2% of firms reported agents with broad autonomy. Agents gather the evidence; people still approve the loan, the trade, or the onboarding.

## What do AI agents do in finance?

Most finance agent work is research: find a fact, check it against a second source, and format it for sign-off.

| Use case | What the agent produces | Data it has to find |
| --- | --- | --- |
| Equity and investment research | Comp set, supply-chain map | Filings, company sites, trade press |
| Tear sheets | Two-page cited company profile | Financials, market data, news |
| Deal sourcing and buyer lists | Ranked acquirers or targets | Buyer portfolios, deal history |
| Due diligence | Findings memo | Litigation, ownership, press |
| KYC, KYB, and adverse media | Verification file | Registers, ownership, sanctions, news |
| Portfolio and market monitoring | Alerts on material changes | Filings, press releases, deal news |
| Regulatory monitoring | Summary of new rules | Regulator sites, enforcement notices |
| Meeting prep | Briefing on a company and attendees | News, filings, executive changes |

### Research, tear sheets, and meeting prep

[Kepler Finance](/blog/case-study-kepler) analyzes public companies across 950K+ SEC filings, 14K+ companies, and 27 markets. It uses Parallel Search as the discovery layer for competitive landscapes, supply-chain mapping, and comp sets. "We built Kepler to be audit-ready at every step," says CEO Vinoo Ganesh. "That standard applies to discovery too."

Tear sheets make a good first project because the format is fixed. Parallel's open-source [tear-sheet cookbook](https://github.com/parallel-web/parallel-cookbook) takes a CSV of tickers and uses the Task API to research each company's profile, four years of financials, market data, news, and a bull and bear case, rendered as a cited two-page sheet.

[Rogo](/blog/case-study-rogo), which builds AI for banks and investors, runs meeting prep briefings, market monitoring, and investment research on Parallel as its primary web search provider. Its agents execute 200,000+ workflows a day for 60,000+ bankers and investors at 450+ financial institutions, and it's live at 7 of the top 8 investment banks. For more on banking workflows, see [AI in investment banking](/articles/ai-in-investment-banking).

### Deal sourcing and due diligence

Rogo also builds buyer lists for sell-side deals, a task that once meant reviewing 50 to 100 private equity firms' websites by hand. The same pattern works in reverse for [finding acquisition targets programmatically](/articles/ai-sourcing-how-to-find-acquisition-targets-programmatically) and for [deal sourcing at investment firms](/articles/how-investment-firms-use-ai-apis-for-deal-sourcing-and-research). Diligence adds depth on one entity; the [automated due diligence pipeline guide](/articles/how-to-build-an-automated-due-diligence-research-pipeline) walks through a full build.

### KYC, KYB, and adverse media

[Bretton](/blog/case-study-bretton-ai) (formerly Greenlite AI) builds agents for bank back offices: KYC and KYB onboarding, enhanced due diligence, screening alerts, and adverse media. About 70% of each investigation runs on web data, all sourced through Parallel. With the Responses API inside each investigator, its end-to-end investigation time dropped from about 20 minutes to about 12, and across banks and platforms such as MVB Bank and Mercury, Bretton has cut compliance review time by as much as 87%.

Taktile, which makes AI decisioning software for banks and lenders, describes the stakes: "You cannot make mistakes in financial services. With Parallel, our banking customers run agents that complete complex KYB checks in minutes, not hours." The [KYB guide](/learn/kyb) covers what a business verification has to establish and how agents check it.

### Monitoring markets, portfolios, and regulation

Monitoring is research on a schedule: the agent checks for new filings, funding rounds, or rule changes and alerts only when something material moved. See the guides on [continuous web monitoring for investment research](/articles/how-to-set-up-continuous-web-monitoring-for-investment-research), [funding round and M&A tracking](/articles/how-to-automate-funding-round-and-ma-tracking-with-apis), and [regulatory change monitoring](/articles/how-to-automate-regulatory-change-monitoring-with-apis).

## Why do finance AI agents need web data?

Licensed datasets cover large listed companies well. The facts that decide a credit file or a diligence memo often sit somewhere else: in regulator registers, filings on local exchanges, and announcements from private companies that data vendors often miss. Questions from Parallel's private finance benchmark show the pattern:

- Is ADCB on the FCA register? (No. It was dissolved on 2 April 2024.)
- What are ArcelorMittal Poland's principal subsidiaries?
- Which companies did Rush Enterprises acquire in 2025? (Leeds Transit, on June 16, 2025, for $25.6M.)
- What was the Banque de France current account for August 2026? (-€1.5bn.)

Each is one fact about one entity as of one date, sitting in a source a terminal may index late or not at all. Freshness matters too, since a monitoring agent that sees a filing a week late has missed it. And registers and exchanges outside the US publish in their own formats and languages.

## What makes finance hard for AI agents?

General web research tolerates approximate answers. Finance doesn't.

- **Exact numbers.** Revenue reported in thousands versus millions, or in the wrong currency, is a wrong answer even when the digits match.
- **As-of dates.** "Who is the CFO?" has different answers in different quarters. The agent has to pin every fact to a date and say which one it used.
- **Restated filings.** Companies amend and restate reports. An agent that finds the original number has found a number that is no longer true.
- **Entity resolution.** A subsidiary, its parent, and a similarly named unrelated company can all appear in one search result page. Identifiers such as the [Legal Entity Identifier](https://www.gleif.org/) help, but many private companies don't have one.
- **Citations and auditability.** Reviewers ask where each fact came from, and an answer without a source gets redone by hand.
- **Data handling and regulation.** Banks ask about data retention, residency, and access controls before any pilot. In the EU, the AI Act classifies AI that evaluates the creditworthiness of individuals as high-risk under [Annex III, point 5(b)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3), which brings documentation and human oversight duties.

On the data-handling point, Parallel offers zero data retention, EU data residency, and SSO as Enterprise options. Rogo serves European banks through Parallel's EU endpoint, which runs against an EU-hosted copy of the index; only the base URL changed. The [data residency guide](/learn/data-residency) explains the setup.

## How do you evaluate the search layer for a finance agent?

Many finance agent errors are retrieval errors, so the useful test holds the agent and model fixed and swaps only the search API. We make Parallel and ran the evaluations below; methodology is on [/benchmarks](/benchmarks).

- **FinSearchComp** ([arXiv 2509.13160](https://arxiv.org/abs/2509.13160), ICLR 2026) has 635 questions written by 70 financial experts. We ran T2 (simple historical lookup, 219 graded questions) and T3 (complex historical investigation, 172). See the [FinSearchComp explainer](/articles/finsearchcomp-benchmark).
- **FrontierFinance** ([arXiv 2608.11683](https://arxiv.org/abs/2608.11683)), from Samaya, has 220 expert-written research queries across the investment workflow, with long-form answers graded by three judges against expert rubrics.
- **PWS-Finance** is Parallel's private benchmark: 174 held-out questions across eight finance workflows, each asking for specific facts about one entity as of one date. An answer counts only if every required fact is right.

Every search API runs in the same agent loop with the same questions and judge. Cost is end to end at list price (model tokens plus every search and fetch call), per 1,000 questions.

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

| Benchmark | Parallel Advanced | Closest other search API | Read |
| --- | --- | --- | --- |
| FinSearchComp T3 | 57.4% at $161.10 per 1,000 | Exa Auto, 51.4% at $226.20 | Parallel leads by 6.0 points at lower cost |
| FinSearchComp T2 | 79.9% at $35.10 per 1,000 | Perplexity Finance + Web, 79.7% at $104.60 | Top score by 0.2; every arm within 2.7 points, so cost decides |
| FrontierFinance | 46.8 at $234.20 per 1,000 | Exa Auto, 47.2 at $376.30 | A tie within 0.4 (single run), at 38% lower cost |
| PWS-Finance | 84.3% at $125.50 per 1,000 | OpenAI native search, 83.7% at $180.70 | Top score by 0.6, at 30% lower cost |

T3 is the clearest result, and its multi-step questions look most like analyst work. Parallel Advanced is the most accurate search API on them: 6.0 points ahead of Exa, 7.4 ahead of Perplexity, 9.1 ahead of OpenAI's native search, and 14.4 ahead of Tavily, at 1.3x to 3x lower cost than each. Parallel Fast scores 53.7% on T3 at $15.20 per 1,000 questions, which also beats every competitor's accuracy at 13x or more lower cost.

The other three margins are small: call them a top score or a tie, with the difference in cost. On FrontierFinance, Parallel beats OpenAI, Perplexity, and Tavily on both accuracy and cost, and on PWS-Finance it beats Exa and Perplexity by 8.4 and 10.0 points.

Research products publish higher end-to-end numbers on FinSearchComp. You.com [reports](https://you.com/resources/introducing-the-finance-research-api-agentic-research-no-infra-required) 87.29% on T2 for its Finance Research API, and [Linkup reports](https://www.linkup.so/benchmarks) 82.4% on T2 and 58.3% on T3 for its research mode. Those figures measure complete research systems in each vendor's own harness; ours measure the search layer under one fixed agent. Both are legitimate answers to different questions. For a buyer's view, see [the best search API for financial AI agents](/articles/best-search-api-for-financial-ai-agents). To run your own test, see [how to benchmark web search APIs](/articles/how-to-benchmark-web-search-apis), and borrow the PWS rules: explicit as-of dates, questions kept off the public web, strict scoring, and full cost per answer.

## How to build an AI agent for finance

A finance agent is a model plus a small set of tools, each matched to one job, so cost stays predictable and each fact traces to the call that produced it.

| Job | Parallel API | Example |
| --- | --- | --- |
| Find sources inside an agent loop | [Search](https://docs.parallel.ai/) (turbo ~200ms or fast ~700ms at $1 per 1,000; basic ~1s or advanced ~3s at $5 per 1,000) | Kepler's comp-set discovery |
| Read specific pages and PDFs | Extract ($1 per 1,000 URLs, up to 20 per request) | Pulling a filing or a register entry |
| Research or enrich many entities | Task (processors Lite through Ultra8x) | The tear-sheet cookbook |
| Run research inside a live workflow | Responses | Bretton's KYB investigations |
| Find every entity that fits a description | FindAll | Building a buyer universe |
| Watch for changes on a schedule | Monitor | Funding, filing, and regulatory alerts |

1. Pick the Search mode per step. Fast or turbo suits quick lookups in a chat flow; advanced suits the hard multi-hop questions where T3-style accuracy matters.
2. Attach a source URL and an as-of date to every fact the agent writes, and keep them through to the final output.
3. Use deep research ([what deep research is](/articles/what-is-deep-research)) for batch jobs that can wait minutes, and Search plus Extract for anything a user is waiting on.
4. Keep a person on the decision, as most firms in the BoE survey already do.

At peak, Rogo makes hundreds of thousands of Parallel requests a day with error rates under 0.002%. For the research layer in depth, see [company research](/learn/company-research) and [the best API for company research](/articles/best-api-for-company-research).

## Frequently asked questions

**What is an AI agent in finance?**

It's a language-model program that completes a financial task, such as profiling a company, by searching, reading sources, and assembling a cited answer for a person to review.

**What is the difference between generative AI and agentic AI in finance?**

Generative AI writes or summarizes content from what it's given, such as a draft memo from a filing. Agentic AI decides what information it needs, calls tools like search and extraction to get it, and repeats until the task is done.

**Can AI agents make financial decisions on their own?**

Rarely, in practice. In the Bank of England and FCA's 2026 survey, 80% of respondents used agents for decision support and only 2% reported agents with broad autonomy. In the EU, AI used to score the creditworthiness of individuals is classed as high-risk and needs human oversight.

**What data do AI agents in finance use?**

Internal data and licensed feeds, plus web sources such as company sites, filings, regulator registers, court records, and news. The web fills gaps on private companies, non-US entities, and recent events.

**Which search API is best for financial AI agents?**

In our tests with the same agent and model, Parallel Advanced was the most accurate search API on FinSearchComp T3 (57.4%) at lower cost than every alternative, and posted the top score or a tie on T2, FrontierFinance, and PWS-Finance. The [full comparison](/articles/best-search-api-for-financial-ai-agents) covers trade-offs by use case.

## Start building

[Parallel for Finance](/blog/parallel-for-finance) upgrades the index and ranking behind every Parallel API for financial agents, with no new plan to buy. Create an API key on the [Parallel platform](https://platform.parallel.ai/) to get free credits, read the [docs](https://docs.parallel.ai/) for Search, Extract, and Task, or see [Parallel for financial services](/solutions/finance) for enterprise options like zero data retention and EU data residency.

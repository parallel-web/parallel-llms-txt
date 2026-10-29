# Parallel: Unmatched SOTA web search for Finance AI Agents

Parallel for Finance is a universal upgrade to our index and ranking for financial agents. On FinSearchComp's hardest tier, Parallel is the most accurate search API, at up to 2x lower cost than Exa and Perplexity, and on our private finance benchmark, it matches OpenAI's native search for 30% to 40% less.

Finance agents need today's filings, registers, and news at inference time, and the facts that matter most often sit outside licensed datasets: in regulator registers, local-exchange filings, and private-company announcements.

Today we're launching Parallel for Finance, a definitive upgrade to our index and ranking for financial agents across all of Parallel's APIs, with no new plan or subscription. Key takeaways:

- On [FinSearchComp](https://arxiv.org/abs/2509.13160)'s hardest tier (T3), Parallel is the most accurate search API at up to **2x lower cost than Exa and Perplexity**. Parallel Fast comes second, at 10x lower cost than the** others.**
- On Samaya's [FrontierFinance](https://arxiv.org/abs/2608.11683), Parallel ties for the top score at **38% lower cost than Exa**, and **beats OpenAI, Perplexity, and Tavily on both accuracy and cost.**
- On our private PWS-Finance benchmark, Parallel leads, **beating OpenAI's native search at 30% lower cost**. [Rogo](https://parallel.ai/blog/case-study-rogo), [Kepler](https://parallel.ai/blog/case-study-kepler), [Bretton](https://parallel.ai/blog/case-study-bretton-ai), and Taktile already run Parallel in production.

## Defining the cost-accuracy frontier for finance

We ran every search API in the same agent loop with the same questions and the same judge, so the search layer is the only thing that changes. Cost is end-to-end at list price: the answer model's tokens plus every search and fetch the agent makes. The charts cover FinSearchComp, Samaya's [FrontierFinance](https://arxiv.org/abs/2608.11683) for long-form investment research, and PWS-Finance, our private benchmark. Methodology for each is in the notes under its chart.

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

### FinSearchComp:

[FinSearchComp](https://arxiv.org/abs/2509.13160) has 635 questions written by 70 financial experts to reproduce analyst work across global and Greater China markets. We ran its two historical tiers: simple lookups (T2) and complex multi-step investigations (T3).

On T3, Parallel Advanced is the most accurate search API and cheaper than every competitor, at 1.3x to 3x lower cost. Parallel Fast beats every competitor at 13x+ lower cost. On T2, Parallel Advanced posts the top score at half the cost of the cheapest alternative, and Parallel Fast comes within half a point of it at 20x lower cost.

### PWS-Finance private benchmark: Beats OpenAI at 30% lower cost

Public benchmarks and their answers end up online and in training data. To account for "benchmaxxing" bias, we gathered 174 private questions across eight finance workflows informed by real financial AI uses currently in production.

Parallel Advanced posts the top score, beating OpenAI's native search at 30% lower cost and Exa and Perplexity by 8 to 10 points. Parallel Fast comes within a point of OpenAI at 39% lower cost.

## How we built the benchmark

Vendor benchmarks tend to favor the vendor that builds them. To avoid that, we sourced every question from real research demand rather than Parallel's strengths, gold-labeled answers using each competitor's highest agentic mode, and ran every provider through the same harness with its published best practices, so only the search provider changes.

Each question asks for specific facts about one entity as of one date.

- **Detailed questions.** The eight workflows are company profiles, funding and investors, deals, ownership and leadership, public financials, regulation and compliance, markets and macro, and recent developments.
- **Global coverage.** The question set is global. There are 65 questions about the US, 34 about Europe, 24 about Greater China, and the rest cover Asia-Pacific, the Middle East, Africa and Latin America.
- **Challenging questions.** Most questions carry a trap that a quick search gets wrong. The facts may be spread across several sources, published months after the period they cover, or different depending on which version of a filing you read.
- **Verified answers.** Each answer key draws on several independent research agents, competitors' as well as our own. Critics and a verifier then check the results, and these checks catch 93% to 100% of deliberately planted errors.

Here are four sample questions and answers from the set:

| Workflow | Question | Answer |
| --- | --- | --- |
| Regulation and compliance | As of 22 October 2026, which banking legal entities in the Abu Dhabi Commercial Bank PJSC group held an active authorisation shown on the UK Financial Conduct Authority's Financial Services Register? Give the count and, for each entity, its legal name, firm reference number, authorisation or permission type, and status. | None. No entity in the ADCB group holds an active FCA authorisation. The group's former UK representative office was dissolved in April 2024, and a representative office is not an authorised firm in any case. |
| Ownership and people | As of 21 October 2026, how many subsidiaries does ArcelorMittal's 2025 annual report list under Poland, and what are up to five of their names? | One: ArcelorMittal Poland S.A., held at 100%, in the list of principal operating subsidiaries in the 2025 Form 20-F. |
| Deals and transactions | As of October 23, 2026, which acquisitions of businesses did Rush Enterprises, Inc. complete during calendar year 2025, excluding stand-alone asset purchases? For each, give the target, closing date, and disclosed purchase price, or “not disclosed” if no price was disclosed. | One: Leeds Transit, Inc., a Canadian bus dealership group, closed June 16, 2025, for about US$25.6 million. The price appears in note 15 of the FY2025 Form 10-K; the June 2025 press release did not disclose it. |
| Markets and macro | As of 22 October 2026, what reference month and release date did Banque de France's latest monthly balance-of-payments release give, and what were France's seasonally and working-day adjusted current-account balance for that month and its revised balance for the preceding month, in EUR billions? | August 2026, released October 7, 2026. Current-account deficit of EUR 1.5 billion for August; July revised to a EUR 3.9 billion deficit, from the EUR 4.7 billion first published. |

## How teams deploy Parallel for Finance in production

Agents built on Parallel already produce tear sheets, run diligence and KYB checks, and monitor portfolios across private companies, funds, and non-US markets. They cover everything from a quick lookup to deep investigations. Here is how teams run Parallel in production today.

### Rogo

![How Rogo brings real-time web intelligence into financial workflows](https://cdn.sanity.io/images/5hzduz3y/production/38a8cd8bb69026b3f46512a6bd490da8829c633b-2400x1350.png)

> **Hundreds of thousands of requests a day**
>
> Rogo runs its agents on Parallel Search and Extract across filings, earnings calls and market sources. At peak, that's hundreds of thousands of requests a day.
>
> “Of all the providers we tested, Parallel delivered the highest quality results at the best price.” Gabriel Stengel, CEO, Rogo
>
> [Read the Rogo case study](https://parallel.ai/blog/case-study-rogo)

### Kepler

![How Parallel helped Kepler build AI that finance professionals can actually trust](https://cdn.sanity.io/images/5hzduz3y/production/a3459b4fe908a7c88a4ba22b7c6d1a52ad1fc9ba-3600x2025.jpg)

> **Discovery that took analysts days now runs in minutes**
>
> Kepler Finance helps investment professionals analyze public companies with citations down to the page and line item. Parallel's Search API is the discovery layer at the top of its pipeline: when an analyst asks a landscape-level question, Parallel finds the relevant companies, private and international players included, and Kepler's deterministic pipeline takes it from there.
>
> “We built Kepler to be audit-ready at every step. That standard applies to discovery too. Parallel's accuracy and coverage are what made it the only search API we trusted in that role.” Vinoo Ganesh, CEO, Kepler
>
> [Read the Kepler case study](https://parallel.ai/blog/case-study-kepler)

### Bretton

![How Bretton runs AI compliance, fraud and risk investigations with Parallel](https://cdn.sanity.io/images/5hzduz3y/production/a8ba05143687988a7709f25f931567bbe4350ef1-1920x1080.png)

> **Investigations cut from about 20 minutes to about 12**
>
> Bretton runs AI agents for KYC and KYB onboarding, due diligence and adverse media reviews at banks including MVB Bank and Coastal Community Bank. About 70% of each investigation is web research, all through Parallel, and every material finding comes with a cited source.
>
> Moving to Parallel's Responses API cut investigations from about 20 minutes to about 12, with the same research quality.
>
> [Read the Bretton case study](https://parallel.ai/blog/case-study-bretton-ai)

## Build your first tear sheet

Our open-source cookbook shows how to use Parallel's APIs to generate end-to-end tear sheets outlining investment cases for a dataset of companies. From a CSV of tickers, the recipe runs the Task API to research each company's profile, four years of financials, market data, recent news, and a bull and bear case, then renders a cited two-page tear sheet plus a research basis page listing every source. It's intended as a lightweight illustration of the workflows we have seen work well in production. The code is in [our open-source repo](https://github.com/parallel-web/parallel-cookbook/tree/claude/finance-tear-sheet-pparallel-8ec9b7/python-recipes/parallel-tear-sheets).

![Sample Parallel tear sheet for NVIDIA: page 1 with the investment summary and financials, page 2 with market data and the bull and bear case, and the research basis page listing every source](https://cdn.sanity.io/images/5hzduz3y/production/0249d40b08f17a314c7ecd84731405d1d5a6c9b0-2640x1152.png)

## Get started

[Start building for free](https://platform.parallel.ai) or dive into our [docs](https://docs.parallel.ai/getting-started/overview).

[Contact us](https://contact.parallel.ai/) to learn more about enterprise plans with ZDR, EU data residency, SSO, and more.

# Parallel for Legal: Setting the new standard for Legal AI Search

Today we’re launching **Parallel for Legal**, an upgrade to our search index and ranking built for legal agents. With this upgrade, Parallel finds hard-to-reach primary sources across jurisdictions and returns trustworthy evidence agents can cite. Parallel for Legal is available across all Parallel APIs, with no new plan or subscription required.

Legal AI agents need current and authoritative sources to answer accurately. However the critical evidence that is needed is scattered across multiple different sources including court dockets, state codes, agency guidance, and government publications, and more. Finding and extracting the correct responses often requires teams to build and maintain their own crawling pipelines.

Key takeaways:

- On PWS-Legal, Parallel’s custom benchmark built around legal questions, Parallel leads in accuracy and holds the entire Pareto frontier, **beating every other provider at up to 2.3× lower cost**.
- On [LegalBench Citation](https://arxiv.org/abs/2308.11462), Parallel leads every other search API on accuracy, at the same or lower cost. On [Legal Hallucinations](https://arxiv.org/abs/2401.01301), Parallel matches OpenAI and Exa’s accuracy at **2.6× lower cost**.
- Leading legal AI companies, including [Harvey AI](https://parallel.ai/blog/case-study-harvey), [GC AI](https://parallel.ai/blog/case-study-gc-ai), and [Finch](https://parallel.ai/blog/case-study-finch) already use Parallel in production.

## Defining the cost-accuracy frontier for legal

We tested three legal benchmarks with the same agent, questions, and grader, changing only the search provider on each of the runs. The cost metric includes model tokens, search, and fetch at list price. You can find more details on the methodology below each chart.

### PWS-Legal (Parallel for Legal, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 230.1, "y": 85.4},
  {"label": "Parallel Advanced", "x": 194.2, "y": 83.1}
]
```

```
[
  {"label": "OpenAI", "x": 440.8, "y": 80.5},
  {"label": "Firecrawl", "x": 314.4, "y": 77.3},
  {"label": "Exa Auto", "x": 318.9, "y": 75.6},
  {"label": "Tavily", "x": 425.7, "y": 75.4},
  {"label": "Perplexity", "x": 248.0, "y": 73.4}
]
```

### Legal Hallucinations (Parallel for Legal, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 20.01, "y": 96.5},
  {"label": "Parallel Advanced", "x": 21.69, "y": 96.8}
]
```

```
[
  {"label": "Exa Auto", "x": 28.12, "y": 96.8},
  {"label": "OpenAI", "x": 43.79, "y": 97.5},
  {"label": "Perplexity", "x": 20.11, "y": 94.0},
  {"label": "Firecrawl", "x": 22.47, "y": 95.4},
  {"label": "Tavily", "x": 86.64, "y": 90.1}
]
```

### LegalBench Citation (Parallel for Legal, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 15.02, "y": 93.6},
  {"label": "Parallel Advanced", "x": 16.54, "y": 93.8}
]
```

```
[
  {"label": "Perplexity", "x": 16.52, "y": 87.2},
  {"label": "Exa Auto", "x": 23.17, "y": 79.7},
  {"label": "Tavily", "x": 27.92, "y": 74.7},
  {"label": "Firecrawl", "x": 8.05, "y": 63.1}
]
```

### LegalBench: Finding the right case law with a single search

Legal AI needs to support its answers with the right case law. To test how well each search provider retrieves that evidence, we ran [LegalBench](https://arxiv.org/abs/2308.11462), a benchmark of 162 legal reasoning tasks designed by legal professionals at Stanford and other institutions. We evaluated 161 questions from its citation tasks, which ask an agent to find the case that supports a legal statement.

### Legal Hallucinations: Grounding legal answers in verifiable facts

Finding the right case is only part of the challenge. Legal AI also needs to answer questions about that case accurately. Stanford RegLab built [this benchmark](https://arxiv.org/abs/2401.01301) around verifiable questions about real federal court cases. The original study found that LLMs answering without search hallucinated 58–88% of the time. We evaluated 284 questions to test how well search helps agents get those facts right.

### PWS-Legal: Highest accuracy at up to 2.3× lower cost

Evaluating whether a model can handle a specific task is one of the hardest parts of building AI applications. Legal AI adds its own requirements for accurate search results. To help developers evaluate performance on legal tasks, we built PWS-Legal: 238 legal-specific questions, with 98 generated questions and 140 drawn from a specialized crawl of legal sources.

## How we reduce bias in the PWS-Legal benchmark

Vendor benchmarks tend to favor the vendor that builds them. To avoid that, we sourced every question from real research demand rather than Parallel's strengths, verified each answer through independent research routes, and ran every provider through the same harness with its published best practices, so only the search provider changes.

- **Detailed questions.** 98 questions cover the companies, laws, regulations and IP rights legal researchers look up, across patents and IP, company records, regulation, legislation, court procedure and contracts.
- **Global coverage.** 60 of those 98 questions are about jurisdictions outside the US, and 33 are in 12 languages other than English.
- **Hard-to-reach sources.** 140 more questions cover court decisions and legal documents on sites that general web search reaches poorly.
- **Verified answers.** Independent research routes, critics and a verifier build each answer. We drop any question that every search API already answers, Parallel included.

Here are five sample questions in the style of the set. They illustrate the question types; none are from the held-out set.

| Type | Question | Answer |
| --- | --- | --- |
| Court procedure (US) | Under the Federal Rules of Appellate Procedure, how long does a party in a federal civil case have to file a notice of appeal? | 30 days after entry of the judgment or order; 60 days if the United States, a US agency, or a US officer or employee is a party (FRAP 4(a)(1)). |
| Patents and IP (US) | As of 3 November 2026, how long is the term of a US utility patent on an application filed today? | 20 years from the US filing date, or from the earliest non-provisional US or PCT application it claims. Term adjustment or extension can lengthen it; it ends early if maintenance fees lapse (35 U.S.C. 154). |
| Company records (US) | What is Apple Inc.'s SEC Central Index Key, and in which state is it incorporated? | CIK 0000320193; incorporated in California. |
| Regulation (EU) | As of 3 November 2026, when did the EU AI Act enter into force, and from when do its bans on prohibited AI practices apply? | In force 1 August 2024. The original bans apply from 2 February 2025; two bans added in 2026 apply from 2 December 2026. |
| Legislation (India) | Which law replaced the Indian Penal Code, and when did it take effect? | The Bharatiya Nyaya Sanhita, 2023, in force 1 July 2024 (except section 106(2)). |

## Legal responses depend on high quality sources

Legal teams need authoritative citations to verify search results and use them to inform decisions. A page that mentions the right words isn’t enough, and the agent needs the specific case or an opinion that cites it for the relevant legal rule. The two LegalBench examples below show this scenario in practice.

### Exa vs. Parallel Search on finding the case the Third Circuit cited

LegalBench question: Which case did the Third Circuit cite for "our role in interpreting an insurance policy is to 'ascertain the intent of the parties...'"? Correct answer: Am. Auto. Ins. Co. v. Murray. One search call per question, GPT-6 Sol answering, three runs each. Exa: 1 of 3 runs right. Its 8 results were all copies of the 2023 opinion that quotes the rule, so the model named that opinion instead of Murray. Parallel Search: 3 of 3 runs right. Its 10 results included Murray itself, two Third Circuit opinions citing Murray for this rule, and 7 other related documents, so the model could see Murray was the original source.

[Open interactive demo](https://decisions-api-illustrations.vercel.app/embed/legal-cite)

### Exa vs. Parallel Search on checking a quote against Murray

LegalBench question: Does Murray stand for "One element of the case-or-controversy requirement is that [plaintiffs]... must establish that they have standing to sue"? Correct answer: No. One search call per question, GPT-6 Sol answering, three runs each. Exa: 0 of 3 runs right. Its 9 results were mostly district-court opinions, none of them Murray, so the model had no copy of Murray to check the quote against. Parallel Search: 3 of 3 runs right. It returned Am. Auto. Ins. Co. v. Murray and Raines v. Byrd, the Supreme Court case the quote comes from, so the model could see the quote belongs to Raines, not Murray.

[Open interactive demo](https://decisions-api-illustrations.vercel.app/embed/legal-quote)

## How teams deploy Parallel for Legal in production

Agents built on Parallel already research case law across jurisdictions, answer legal questions from trusted legal and medical sources, and enrich case records for plaintiff firms. Here is how teams run Parallel in production today.

### Harvey

![How Harvey is expanding legal AI internationally with Parallel](https://cdn.sanity.io/images/5hzduz3y/production/43f263b6a1fe9cb7d31e2c54c8cf58463fba306c-3600x2025.jpg)

> **Reaching legal sources across 60+ countries**
>
> Harvey uses Parallel Search and Extract to power web search across its platform, plus a specialized private index for hard-to-reach international sources, such as court rulings from Brazil's state tribunals and regulatory codes from Argentina.
>
> “Court rulings, regulatory codes, and legislation in dozens of countries are published on sites that no search engine has ever indexed. Parallel is solving that for us at a scale we couldn't build in-house.” Gabe Pereyra, President & Co-Founder, Harvey
>
> [Read the Harvey case study](https://parallel.ai/blog/case-study-harvey)

### Eve

![How Eve brings trusted research directly into plaintiff casework, powered by Parallel](https://cdn.sanity.io/images/5hzduz3y/production/d264e665f6766eb58ac10ccd3e2ca369b8908b80-2048x1152.png)

> **Research for 1,200+ law firms every month**
>
> Parallel's Search and Extract APIs power every web search in Eve Research, pulling cited, current information from firm-approved legal, medical, regulatory, and benefits sources directly into plaintiff casework.
>
> “Accuracy is paramount. The stakes are high when someone with serious medical issues and medical debt needs help. Whether it’s medical research or guidelines from the VA or the Social Security Administration, attorneys need accurate information from sources they trust, with citations as proof.” Mauricio Wulfovich, Staff Machine Learning Engineer, Eve
>
> [Read the Eve case study](https://parallel.ai/blog/case-study-eve)

### GC AI

![GC AI uses Parallel for web search, supporting 2,200+ in-house legal teams](https://cdn.sanity.io/images/5hzduz3y/production/998f5dfe5b8bc8d81dd332c43cb947b2c437d8d9-2048x1152.png)

> **A specialized index for in-house counsel**
>
> Parallel precrawls the ~450 domains GC AI's in-house legal users rely on most, for quality and speed.
>
> “Research has always taken a lot of time. Traditional legal research tools can be thorough, but you can’t give them a goal and have them come back with an answer. GC AI applies a lawyer’s research methodology, with Parallel’s Search API finding the sources, so you can get to an answer and advise the business.” Christine Yan, R&D Attorney, GC AI
>
> [Read the GC AI case study](https://parallel.ai/blog/case-study-gc-ai)

### Finch

![How Finch is scaling plaintiff law with AI agents that research like associates](https://cdn.sanity.io/images/5hzduz3y/production/fab7555a64dd1351fb12e59dc03ab659936a1726-3600x2025.jpg)

> **90% lower cost per task**
>
> Finch replaced a three-step search, extract and validate pipeline with a single Task API call, with zero 5xx errors or timeouts across three-plus months in production.
>
> “The Task API gives us structured outputs with citations in a single call, which is exactly what production legal AI needs.” Ben Weems, CTO, Finch
>
> [Read the Finch case study](https://parallel.ai/blog/case-study-finch)

## Build your first jurisdiction survey

Our open-source cookbook shows how to use Parallel's APIs to compare one legal question across many jurisdictions. From a CSV of states and a question, such as the statute of limitations for a motor vehicle personal injury claim, the recipe runs Search with Source Policy limited to official legislature and court sites. The cookbook then takes these sources, and runs the Task API to produce a cited comparison table and a research basis page listing every source.

It's intended as a lightweight illustration of workflows we've seen work well in production. The code is in [our open-source repo](https://github.com/parallel-web/parallel-cookbook/pull/80).

## Get started

[Start building for free](https://platform.parallel.ai) or dive into our [docs](https://docs.parallel.ai/getting-started/overview).

[Contact us](https://contact.parallel.ai/) to learn more about enterprise plans with SOC 2 Type 2, zero data retention, a BAA for HIPAA, EU data residency, SSO, and specialized indexes for legal domains.

# Parallel for Healthcare: Best-in-class search for healthcare and life sciences agents

Today we’re launching **Parallel for Healthcare**, an upgrade to our search index and ranking for healthcare and life sciences agents. Agents can find and cite evidence from primary sources including FDA drug labels, ClinicalTrials.gov records, CMS registries and recent research papers indexed in PubMed. The upgrade is available across all Parallel APIs with no new plan or subscription required.

Drug discovery and provider research both depend on evidence scattered across many different public sources. In drug discovery, agents can use Parallel to find compounds that act on a target and check how far each has progressed in clinical trials. For provider research, agents can enrich a list from the NPI Registry with each provider’s research interests and publications relevant to a drug in development. Teams can now verify each finding against the original paper or record without maintaining their own crawling pipelines.

Key takeaways:

- Parallel delivers top accuracy across four different healthcare benchmarks: PWS-Health, LitQA3, TrialQA and MedBrowseComp.
- On PWS-Health, Parallel’s new healthcare-focused benchmark, Parallel delivers **1.4× more correct answers per dollar** than the next-best engine.
- On LitQA3, Parallel is the most accurate engine, with **1.7× more correct answers per dollar** than the next-best engine.
- [AcuityMD](https://parallel.ai/blog/case-study-acuitymd) verified 574K records at 1/5 the cost of a frontier model

## Defining the cost-accuracy frontier for healthcare

We tested six healthcare benchmarks with the same agent, questions and grader, changing only the search provider. The answer model is Claude Opus 5.5 (high effort), and each engine ran three times. The cost metric includes answer-model tokens and search fees at list price. Before scoring, we audited every public answer key and fixed stale or wrong golds for all engines alike. You can find more details on the methodology below each chart.

### PWS-Health (Parallel for Healthcare, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 104.0, "y": 85.2},
  {"label": "Parallel Advanced", "x": 85.3, "y": 83.7}
]
```

```
[
  {"label": "Exa", "x": 124.6, "y": 82.5},
  {"label": "Perplexity", "x": 116.2, "y": 80.5},
  {"label": "Tavily", "x": 154.3, "y": 77.2},
  {"label": "Claude native search", "x": 646.0, "y": 66.9}
]
```

### LitQA3 (Parallel for Healthcare, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 58.8, "y": 86.7},
  {"label": "Parallel Advanced", "x": 48.8, "y": 86.7}
]
```

```
[
  {"label": "Exa", "x": 126.3, "y": 81.0},
  {"label": "Tavily", "x": 117.7, "y": 79.2},
  {"label": "Perplexity", "x": 73.7, "y": 79.0},
  {"label": "Claude native search", "x": 352.3, "y": 78.2}
]
```

### TrialQA (Parallel for Healthcare, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 57.7, "y": 96.3},
  {"label": "Parallel Advanced", "x": 46.9, "y": 95.2}
]
```

```
[
  {"label": "Perplexity", "x": 69.3, "y": 95.2},
  {"label": "Exa", "x": 66.1, "y": 94.1},
  {"label": "Tavily", "x": 146.8, "y": 91.2},
  {"label": "Claude native search", "x": 498.7, "y": 79.7}
]
```

### MedBrowseComp (Parallel for Healthcare, Nov 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 131.9, "y": 78.8},
  {"label": "Parallel Advanced", "x": 107.9, "y": 79.3}
]
```

```
[
  {"label": "Perplexity", "x": 141.2, "y": 76.6},
  {"label": "Exa", "x": 118.9, "y": 74.3},
  {"label": "Tavily", "x": 187.2, "y": 72.7},
  {"label": "Claude native search", "x": 703.3, "y": 66.7}
]
```

### PWS-Health: Top accuracy on real healthcare questions at 6× lower cost

Healthcare and life sciences teams often search for highly specific information. Developers evaluating search engines for these workloads may need to test whether they can find the latest drug label or pinpoint a result in a clinical trial table. To help developers measure how well search engines handle healthcare work, we built PWS-Health, a benchmark of 133 questions with verifiable answers. We adapted 83 from questions healthcare teams ask Parallel across 10 workflows and drew the other 50 from recent open-access clinical trials and meta-analyses. Parallel delivered 9.8 correct answers per dollar, 1.4× more than the next-best engine and 6× cheaper than built-in search.

### LitQA3: Top accuracy on biomedical literature at 2.6× lower cost

Biomedical use cases depend on many specific details, such as an effect size reported in a results table. These kinds of details can be hard to find in an abstract or summary. LitQA3, part of FutureHouse’s LAB-Bench 2, tests whether search engines can find the right paper and pinpoint the answer across 168 questions about recent research. Parallel answered more of LitQA3’s biomedical research questions correctly than any other search engine tested, at the lowest cost per question.

### TrialQA: Clinical trial details at a ninth of the cost

When a trial changes its enrollment target or adds a study arm, healthcare agents need a reference they can trust. In existing workflows, ClinicalTrials.gov holds the latest trial updates, and a search engine needs to keep up with it. TrialQA, also from LAB-Bench 2, covers specific details teams look up in the ClinicalTrials.gov registry: a study’s control arm, its primary endpoint or how many patients it plans to enroll. Across the benchmark’s 118 questions, Parallel delivered top-tier accuracy at about a ninth of built-in search costs.

### MedBrowseComp: Frontier accuracy on hard FDA research

MedBrowseComp asks multi-hop questions about FDA drug approvals. Each question takes several searches to answer because what the engine finds in one source guides what it looks for next. For example, to identify which company holds the most recent approval for a drug, the engine first finds the approval in FDA records, then checks company filings to confirm the holder. The benchmark tests this kind of reasoning across regulatory, clinical and corporate sources. Parallel produced top-tier accuracy with up to 7.8× lower cost per correct answer compared to built-in search.

## How we built the PWS-Health benchmark

Vendor benchmarks tend to favor the vendor that builds them. To avoid that, we sourced the question mix from real healthcare demand, built each answer from official records, and ran every provider through the same harness, so only the search provider changes. The benchmark was built on the following pillars:

- **Grounded in healthcare workflows.** We sourced patterns of typical healthcare questions and used them to approximate the kinds of workflows we've prioritized in production use cases for healthcare and life sciences.
- **Research difficulty and language.** We chose a difficult question set to get a stronger evaluation of a search provider’s true capabilities. Of the 83 questions, 49 depend on a specific date, 22 require reading tables or PDFs, and 14 involve conflicting sources. The benchmark also includes 14 questions in languages other than English.
- **Recent studies to test data freshness.** We drew 50 more questions from open-access randomized trials and meta-analyses in PubMed Central to make sure the benchmark reflects current information.
- **Answer verification.** We checked each answer against official records and dropped any question that all search providers, including Parallel, answered correctly to keep the benchmark from getting saturated.

Here are five sample questions in the style of the set. They illustrate the question types; none are from the held-out set.

| Type | Question | Answer |
| --- | --- | --- |
| Device regulatory | What 510(k) number and decision date did FDA give Boston Scientific's LUX-Dx II and LUX-Dx II+ insertable cardiac monitors in 2025, and what type of 510(k) was it? | K252593, decided Sep 12, 2025. Special 510(k), substantially equivalent; Class II, product code MXD. |
| Clinical trials | In Arcus Biosciences' Phase 3 trial of casdatifan plus cabozantinib in advanced clear cell renal cell carcinoma, what is the control arm, the primary endpoint and the planned enrollment? | Placebo plus cabozantinib; progression-free survival by blinded independent central review (RECIST 1.1); 720 patients (NCT07011719). |
| Drug labels | For which conditions is Novartis's remibrutinib (RHAPSIDO) indicated on its current US label, and when did FDA first approve it? | Chronic spontaneous urticaria and symptomatic dermographism in adults still symptomatic on H1 antihistamines. First approved Sep 30, 2025 (NDA 218436). |
| Pipelines | Regeneron is testing REGN7508 in a Phase 3 trial to prevent blood clots after total knee replacement. What does it compare against, and what is the primary endpoint? | Apixaban and enoxaparin. Primary endpoint: venous thromboembolism, including VTE-related death, through about day 12 (NCT07015905). |
| Published evidence | In the 2025 Nutrients trial of 8-hour time-restricted eating vs 25% calorie restriction in adults with type 2 diabetes, how much weight did each group lose vs controls by month 6? | Time-restricted eating: −3.38% (p = 0.008). Calorie restriction: −1.80% (p = 0.32, not significant). |

## Healthcare answers depend on high quality sources

Accuracy is critical in healthcare because an outdated drug label can mislead a clinician making a treatment decision. To trust a healthcare agent’s answer, clinicians and researchers need to see the specific label, guideline or trial result that supports it. Citations from a search provider give these teams a record they can use to investigate errors and verify claims during clinical and compliance reviews. Parallel ranked first for accuracy on all four healthcare search benchmarks, with its largest lead on LitQA3, where it scored 5.7 percentage points ahead of Exa.

![Accuracy on four healthcare search benchmarks with Claude Opus 5.5: Parallel Fast leads on PWS-Health, MedBrowseComp, LitQA3, and TrialQA.](https://cdn.sanity.io/images/5hzduz3y/production/9525af4be05b37b2da517e266cfa0fc3bc4c4d6d-3000x1688.png)

Healthcare answers often sit deep in a paper, in a methods section or a safety table. They’re rarely in the abstract. To show the difference search makes, we ran questions from LitQA3 (LAB-Bench 2) through the same agent and answer model, Claude Opus 5.5. Only the search engine changed.

![](https://cdn.sanity.io/images/5hzduz3y/production/4d349042784573465b8ffa35168632f176c4e021-1200x675.gif)

![](https://cdn.sanity.io/images/5hzduz3y/production/beb36cfcd70cf5f223ae850310e68588384faa5c-1200x675.gif)

## How teams deploy Parallel for Healthcare in production

Healthcare teams use Parallel to track drug and device approvals, monitor clinical trials, and keep provider and facility records up to date.

### AcuityMD verified 574,000 records in five months at ⅕ the cost of a frontier model

More than 500 medtech companies use AcuityMD to see where procedures take place and which surgeons perform them. To keep that data current, AcuityMD’s data team runs Parallel’s Search, Extract, and Task APIs in batches. The team checks whether clinics are still open, identifies which health systems their offices belong to, and looks up where physicians completed their fellowships.

In five months, AcuityMD verified 574,000 records at about one-fifth the cost of using a frontier model alone. Every link Parallel returned was live. [Read the AcuityMD case study](https://parallel.ai/blog/case-study-acuitymd).

> “Accuracy and cost at scale were non-negotiable for us. Parallel confirms every URL it returns is live, its cost holds up across hundreds of thousands of records, and it gives us more breadth and recall than a frontier model on its own. That’s why every new data project on our team starts with Parallel.”
>
> — Greg Davis, Senior Data Program Manager, AcuityMD

****

### A global pharmaceutical company cut launch replanning from months to days

A global pharmaceutical company is using Parallel to keep its drug launch planning in step with a fast-moving market. With years of investment riding on each launch plan, its teams need research that is current, accurate, and traceable to the original source. The company’s launch teams handle some of their research themselves and also work with specialist agencies for the rest. With Parallel’s Task API, the research they run comes back in days instead of months, with every finding linked to its primary source so a person can verify it before making a call. Parallel’s Monitor API keeps watching for changes, so teams can test scenarios as the market moves.

> “Our team has always done research ourselves, and we rely on external agencies to help supplement it. Now, Parallel helps us get there faster. Research that used to take months now comes back in days, and every insight links back to the original source, so we can verify it and see the full picture before we make a call.”
>
> — AI product leader, a global pharmaceutical company

## How your healthcare agent can use Parallel’s APIs for drug discovery and provider research

With Parallel, an agent can track how far a drug candidate has progressed, add relevant publications to a provider’s profile, or check whether a provider has run a clinical trial. Pick the workflow that matches your agent's problem, and every response will come with a cited source.

![](https://cdn.sanity.io/images/5hzduz3y/production/cc3522ad1f097589d322c75a111f08267624ee09-2880x1700.png)

## Build your first drug asset profile

We built an open-source cookbook recipe so you can turn a CSV of drugs into cited asset profiles with Parallel’s APIs. It runs the Task API with Source Policy limited to regulator sites like FDA and EMA, plus free ClinicalTrials.gov and PubMed Data Connectors. Then it checks every trial and paper ID against its public registry. The output is a PDF profile per drug, with a research basis page listing every source.

It’s a lightweight starting point based on workflows we’ve seen work well in production. Clone it from [our open-source repo](https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/parallel-drug-profiles) and adapt it to your own drugs.

## Get started

[Start building for free](https://platform.parallel.ai) or dive into our [docs](https://docs.parallel.ai/getting-started/overview).

[Contact us](https://contact.parallel.ai/) to learn more about enterprise plans with SOC 2 Type 2, zero data retention, a BAA for HIPAA, EU data residency, SSO, and specialized indexes for healthcare domains.

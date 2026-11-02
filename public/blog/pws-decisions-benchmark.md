# Introducing PWS-Decisions: A benchmark for web-grounded decisions

A benchmark of 300 decision questions whose answers depend on the live web.

Today we’re open-sourcing PWS-Decisions, a benchmark of 300 questions whose answers depend on the live web. On PWS-Decisions, the [Parallel Decisions API ](https://parallel.ai/blog/decisions-api)outscores the closest competitor by 1.5X.

Every day, businesses answer thousands of small classification questions about the world: _Does this vendor support SSO? Is this the same company we already have in the CRM?_  _Is this lead a fit? _The [Parallel Decisions API](https://parallel.ai/blog/decisions-api) is the fastest way to act on that information: it checks the live web and returns a typed, cited answer in under a second, for a tenth of a cent.

Run the benchmark on your own model with the code on [GitHub](https://github.com/parallel-web/pws-decisions-benchmark) and the dataset on [Hugging Face](https://huggingface.co/datasets/parallel-web/pws-decisions-benchmark), or try the Decisions API free in the [playground](https://platform.parallel.ai/play/decisions) with 5,000 free requests.

## Real Decisions need Web Grounding

In [our post a couple weeks ago](https://parallel.ai/blog/are-all-system-one-models-created-equal), we benchmarked System One models on real, human-labeled tasks from our own production pipelines instead of public leaderboards. Traditional decision benchmarks check what is already in the prompt from a system-one model, not whether an answer is grounded in live web data, so we built PWS-Decisions to test that.

PWS-Decisions is 300 closed-ended questions modeled on the decisions developers use the Decisions API for: qualifying accounts, checking product capabilities, confirming policy rules and tracking fast-moving events. Every question depends on facts that are current, niche, or scattered across the web. Each answer is confirmed by independent web research and a direct source, and every system is scored by exact match under the same rules.

Run PWS-Decisions on any decision model, including your own.

![Chart showing accuracy benchmarks](https://cdn.sanity.io/images/5hzduz3y/production/2ec0967c666914b355b12f345177f251cdac20f7-2000x1383.png)

### Testing on live web questions

Benchmarks like JevBench can’t tell you how a model will perform when the answer depends on the live web. Which is why traditional models like OpenAI Decisions and Jev do far worse on PWS-Decisions than on a generic decisions benchmark like JevBench. OpenAI Decisions scores 2.2x lower (41.7% vs. 90.0%), and Jev scores 2.6x lower (33.4% vs. 88.3%). 

| Benchmark | What it tests | Parallel Decisions | OpenAI Decisions | TypeSafe Jev |
| --- | --- | --- | --- | --- |
| PWS-Decisions (300 questions) | Questions whose answers depend on current web facts | 76.2% | 41.7% | 33.4% |
| JevBench (231 questions) | Classic decision tasks answerable from the input | 89.6% | 90.0% | 88.3% |

## Cost per decision should include search

The way you measure cost is critical in determining what the true cost efficiency is. A low-cost model plus a separate search call ends up costing more than one Decisions API call, which includes both. For 1,000 requests that answer closed-ended questions about one entity using current web evidence:

![](https://cdn.sanity.io/images/5hzduz3y/production/b5143074cf9e7108fc9a4855701f23a6dec10f22-2000x1591.png)

For scale: See some of the examples from our Decisions API launch demos including: [rechecking 426 public companies for KYB changes cost $0.85](https://perpetualkyb.paralleldemos.com/), and [routing 500 inbound leads cost about $0.50](https://parallel.ai/blog/decisions-api).

## Where the Decisions API fits

Many search requests are really decisions: one value for a spreadsheet cell, a form field or an agent’s next step.

Use the Decisions API when:

- You need a single, structured answer, such as a yes/no, one option from a list you define, or a score on a scale. This value can be integrated directly into your agent or downstream data without an expensive LLM.
- The response depends on information that changes often, like a company’s funding, headcount, pricing or policies, so it has to come from the live web rather than a model’s memory.
- You’re making the same kind of decision across thousands of records in a pipeline, where each request can carry up to 100 questions and costs $1 per 1,000 requests.

There are many different usecases where Decisions API can be useful.

| Use case | What it does | Example question |
| --- | --- | --- |
| Fact-checking | Checks a claim against current sources, in any language | Did this supplier get ISO 27001 certification this year, as its German press release claims? |
| Content moderation | Screens every new listing before it goes live | Does this seller listing impersonate a known brand? |
| Vendor validation | Confirms vendor meets your security requirements, using the latest information | Does this vendor support SAML SSO and EU data residency? |
| Entity matching | Decides whether two CRM records are from the same company, a subsidiary, or unrelated. | Are “Acme Robotics Inc.” and “Acme Robotics GmbH” the same company? |
| Lead qualification | Scores accounts on hiring activity, funding stage and fit. | How many roles is this firm hiring for: none, 1–4, 5–19, or 20+? |

Not sure where the Decisions API fits for your team? [Try this demo: ](https://webjev-use-cases.paralleldemos.com/)enter your company and see which of your workflows could run on web-grounded decisions.

### Which Parallel API should I use?

The Decisions API works best when you need a quick, typed answer (yes/no, a choice, or a score) to a question that depends on what’s happening on the web right now. For everything else, another Parallel API may serve you better.

| Use case | Returns | When to use it over Decisions API |
| --- | --- | --- |
| Search | Ranked pages, and LLM-ready excerpts | When you want the evidence itself and will reason over it with your own model |
| Extract | Clean markdown from a URL, including JavaScript pages and PDFs | When you need a page’s full contents, not one fact from it |
| Response | A researched, open-ended answer to one question | When the answer is a sentence or paragraph, not a fixed option |
| Task | Cited, structured research that runs from seconds to hours | When the question needs multi-step research that one search can’t cover or open-ended fields |
| FindAll | A verified list of entities that match your criteria | When you need to find the records first, rather than decide about ones you already have |
| Monitor | Alerts when something changes | When you want to know the moment an answer changes, instead of re-checking on a schedule |

## Run PWS-Decisions and try the Decisions API free

Run PWS-Decisions on your own model with the code on [GitHub](https://github.com/parallel-web/pws-decisions-benchmark) and the data on [Hugging Face](https://huggingface.co/datasets/parallel-web/pws-decisions-benchmark). Then try the Decisions API with 5,000 free requests in the [playground](https://platform.parallel.ai/play/decisions), or jump into the [docs](https://docs.parallel.ai/decisions/decisions-quickstart). Agents can use it free as the `web_decisions`  tool in the Parallel MCP server. Running decisions at scale? [Talk to us](https://contact.parallel.ai/) about building an eval set from your own traffic.

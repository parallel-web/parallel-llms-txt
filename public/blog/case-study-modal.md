Human Machine

# \# How Modal saves tens of thousands annually by building in-house GTM pipelines with Parallel

Modal creates custom, code-first GTM pipelines using Parallel's Task and Monitor APIs to automate account research, segmentation, and enrichment at a fraction of the cost of traditional providers.

Tags: Case Study

Reading time: 4 min

## \## About Modal

Modal provides cloud infrastructure for compute-intensive AI applications, managing GPU and CPU resources so teams can build and deploy without provisioning hardware. The company serves some of the fastest-growing AI companies in the world, from frontier model labs to consumer coding agents, across workloads spanning inference, training, and sandboxed code execution.

## \## Key highlights

* \- **\*\* 88\.9% coverage \*\*** on capital raised and valuation data, the highest of any provider evaluated
* \- **\*\* 6 to 31x cost savings \*\*** versus other agentic search providers for fundraising-focused enrichment ($0.025/record)
* \- **\*\* $7,600 saved per 10,000 records \*\*** compared to using all evaluated sources
* \- **\*\* Tens of thousands saved annually \*\*** on firmographic and fundraising data versus traditional enrichment providers
* \- **\*\* Automated prospect discovery \*\*** via Monitor API, feeding newly funded AI companies directly into the CRM
* \- **\*\* Version-controlled, code-first architecture \*\*** with prompt versioning and structured output schemas piped into Snowflake

## \## The problem

Chris Prinz, Modal's GTM Engineering Lead, owns the data platform, CRM, and automations that enable Modal's sellers. Before Parallel, his team needed to answer two questions for every prospect: what workload would drive the most value on Modal, and how much could that prospect spend in a year? Answering those questions required understanding what each company actually builds, how their product works, and which part of Modal's stack fits.

Account enrichment at scale can be costly. Basic firmographic and fundraising data from traditional enrichment providers ran tens of thousands of dollars a year for Modal. The data quality varied, and coverage gaps forced analysts to fill in blanks by hand. Modal needed something custom that offered the right profile of data quality and flexibility.

> > "One of the failure modes I often see working in no-code tools is that when you build these very complex workflows, you often lose sight of where logic lives, of what triggers what, and it generally becomes a huge mess to maintain. We decided to build all of our workflows in code to take advantage of coding agents, version control, and CI/CD."
> 
>

> > — Chris Prinz, GTM Engineering Lead, Modal
> 
>

## \## The solution

Modal built critical go-to-market data pipelines on Parallel and Modal’s own infrastructure. The Parallel Task API powers account research, segmentation, and enrichment. The Monitor API feeds new AI companies into the CRM as they raise funding, keeping Modal's prospect universe current without manual sourcing.

Parallel's state-of-the-art research quality and [flexible pricing architecture](https://docs.parallel.ai/task-api/guides/choose-a-processor) [[flexible pricing architecture] (https://docs.parallel.ai/task-api/guides/choose-a-processor)](https://docs.parallel.ai/task-api/guides/choose-a-processor) made it the clear choice. The Task API accepts natural language research objectives alongside explicit JSON output schemas, so Prinz's team can define exactly what they need without post-processing or parsing. Higher quality research per query means fewer retries and less manual correction, which compounds into lower cost per record at scale.

![Modal built a custom CRM pipeline using Parallel's Monitor and Task API](https://cdn.sanity.io/images/5hzduz3y/production/fd321ba37917e88ccd5e6df01370058e60a1ac28-5460x3240.jpg)

The core integration is a research agent that segments every prospect along two dimensions: the primary workload type (sandboxes, inference, training) and a bottoms-up spend estimation based on that workload. A company building a consumer-facing coding agent gets classified differently from one training foundation models, and the spend estimate adjusts accordingly. This lets Modal's sales team prioritize accounts by revenue potential rather than headcount.

Prinz's team built a Parallel client that batch-processes enrichment requests using Pydantic-style output schemas, piping structured JSON into Snowflake. Every enrichment record carries a prompt version tag, so the team can iterate on research prompts without losing historical data or rebuilding the pipeline.

Monitor API runs on a continuous schedule, tracking fundraising activity across the AI landscape. When a company raises a round, Monitor triggers a CRM update and feeds the new prospect into the enrichment pipeline for segmentation. The result is a prospect universe that grows and refreshes on its own.

## \## The impact

Prinz's team evaluated Parallel against other agentic search providers for fundraising-focused company enrichment. Parallel's Core Processor at $0.025 per record delivered 88.9% coverage on capital raised and valuation, the highest accuracy on fundraising dates and stages, and complete investor data. The cost savings ranged from 6 to 31 times cheaper than alternatives, saving $7,600 per 10,000 records. For firmographic and fundraising data overall, Modal saves tens of thousands of dollars a year.

The segmentation agent changed how Modal's sales team prioritizes accounts. Bottoms-up spend estimates surface high-value prospects that headcount-based scoring would miss: a small frontier lab with massive compute needs, or a mid-size company whose product roadmap points toward GPU-intensive workloads.

Parallel's API-first design fits Modal's code-first philosophy. All workflows live in a single version-controlled repo with CI/CD, hosted on Modal's own infrastructure.

By Parallel

March 30, 2026
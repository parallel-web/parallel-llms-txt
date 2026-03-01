[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Auto Mode for the Parallel Task API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 1 min

Starting today, the Parallel Task API supports **\*\* Auto Mode \*\*** , enabling one-off web research queries without requiring explicit output schemas. Simply ask a research question and let our processors handle the rest.

Previously, creating a Task required both an input and a structured output schema. This **\*\* Schema Mode \*\*** remains ideal for systematic research operations requiring consistent data structures across thousands of queries - like enriching CRM data or conducting due diligence workflows at scale.

But, sometimes you just want to ask a research question and get an answer. Auto Mode makes this possible.

## \## **\*\* How Auto Mode Works \*\***

With Auto Mode, you can create a Task by passing in a research question as input. No output schema is required. Our processors automatically determine the optimal response structure based on your query and output results with the generated output schema.

\### Send a Task API request with Auto Mode enabled

```
1

2

3

4

5

6

7

8

9

10

11

12

curl -X POST  "https://api.parallel.ai/v1/tasks/runs"  \
  -H  "x-api-key: YOUR_API_KEY"  \
  -H  'content-type: application/json'  \
  --data  '{
  "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
  "processor": "ultra",
  "task_spec": {
    "output_schema": {
      "type": "auto"
    }
  }
}' ```  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \ -H "x-api-key: YOUR_API_KEY" \ -H 'content-type: application/json' \ --data '{ "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.", "processor": "ultra", "task_spec": { "output_schema": { "type": "auto" } } }' ```
```

Auto Mode leverages the same state-of-the-art web research capabilities that power Schema Mode, with all the verification tools you expect from Basis: comprehensive citations, detailed reasoning, relevant excerpts, and calibrated confidence scores.

## \## **\*\* Start Building \*\***

Auto Mode is available today on high compute processors (Pro, Ultra, and beyond). Try it out in our [Developer Platform](https://platform.parallel.ai/play/deep-research) [Developer Platform]($https://platform.parallel.ai/play/deep-research) or dive directly into our [documentation](https://docs.parallel.ai/task-api/features/task-deep-research) [ documentation]($https://docs.parallel.ai/task-api/features/task-deep-research) .

By Parallel

August 4, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service) [Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

Parallel Web Systems Inc. 2025

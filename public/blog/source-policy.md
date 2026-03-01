[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Source Policy

Tags: [Product Release](/blog?tag=product-release)

Reading time: 1 min

Starting today, Source Policy is available for both the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) [Parallel Task API]($https://parallel.ai/blog/parallel-task-api) and [Search API](https://parallel.ai/blog/parallel-search-api) [Search API]($https://parallel.ai/blog/parallel-search-api) \- giving you granular control over which sources your AI agents access and how results are prioritized.

## \## **\*\* What is Source Policy? \*\***

Source Policy lets you define exactly which domains your research should include and exclude. With two simple parameters, you can shape how Parallel crawls and reasons over the web:

* \- **\*\* include\_domains \*\*** : Restrict queries to specific trusted domains
* \- **\*\* exclude\_domains \*\*** : Block unreliable or irrelevant sources

\### Configure your source policy

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

13

14

curl -X POST  "https://api.parallel.ai/v1/tasks/runs"  \
  -H  "x-api-key: YOUR_API_KEY"  \
  -H  "Content-Type: application/json"  \
  -H  "parallel-beta: source-policy-2025-07-03"  \
  -d  '{
      "task_spec": {
        "output_schema": "How many employees are there in the company"
      },
      "input": "Parallel Web Systems",
      "processor": "core",
      "source_policy": {
        "include_domains": ["linkedin.com"]
      }
    }' ```  curl -X POST "https://api.parallel.ai/v1/tasks/runs" \ -H "x-api-key: YOUR_API_KEY" \ -H "Content-Type: application/json" \ -H "parallel-beta: source-policy-2025-07-03" \ -d '{ "task_spec": { "output_schema": "How many employees are there in the company" }, "input": "Parallel Web Systems", "processor": "core", "source_policy": { "include_domains": ["linkedin.com"] } }' ```
```

## \## **\*\* Why Source Policy matters \*\***

Production AI applications demand reliable, verifiable sources. Whether you're conducting due diligence that requires SEC filings, sales research that needs company websites, or competitive analysis that excludes certain unreliable publishers - Source Policy ensures your agents access exactly the right information.

Instead of post-processing results to filter sources, you can now constrain the Parallel web research pipeline from the start. This reduces noise, improves accuracy, and gives you confidence that outputs stem from sources you trust.

## \## **\*\* Start building \*\***

Source Policy is available today across all Task API and Search API processors. Get started in our [Developer Platform](https://platform.parallel.ai) [Developer Platform]($https://platform.parallel.ai) or dive into the [documentation](https://docs.parallel.ai/features/source-policy) [documentation]($https://docs.parallel.ai/features/source-policy) .

By Parallel

July 8, 2025

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

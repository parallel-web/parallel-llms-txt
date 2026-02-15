[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Webhooks for the Parallel Task API

Get notified when Tasks complete with webhooks

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Starting today, webhooks are available for all Task Runs on the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) [Parallel Task API]($https://parallel.ai/blog/parallel-task-api) \- including [Deep Research](https://parallel.ai/blog/introducing-parallel) [Deep Research]($https://parallel.ai/blog/introducing-parallel) . Get notified when your tasks complete instead of continuously checking their status.

## \## **\*\* Create tasks, receive results when ready \*\***

When you're orchestrating hundreds or thousands of web research tasks, webhooks push real-time notifications to your endpoint as tasks complete - eliminating the need for constant polling. This is especially valuable for long-running or research-intensive tasks.

Common use cases include:

* \- **\*\* Data enrichment: \*\*** Enriching thousands of entities in your database
* \- **\*\* Deep research: \*\*** Running complex, research-intensive queries that can take 10-30 minutes
* \- **\*\* Chained workflows: \*\*** Building workflows where one task's output triggers the next
* \- **\*\* Batch processing: \*\*** Managing any system that creates many tasks at once

With webhooks - your orchestration code stays clean, error handling becomes straightforward, and results naturally flow into your existing queue-based architectures.

## \## **\*\* Adding webhooks to your API calls \*\***

Setting up webhooks requires minimal changes to your existing integration. Simply include a webhook configuration alongside your task specification:

[\### Configure webhooks for a Task API request ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 curl --request POST \ --url https://api.parallel.ai/v1/tasks/runs \ --header "Content-Type: application/json" \ --header "parallel-beta: webhook-2025-08-12" \ --header "x-api-key: $PARALLEL_API_KEY " \ --data '{ "task_spec": { "output_schema": "Find the GDP of the specified country and year" }, "input": "France (2023)", "processor": "core", "webhook": { "url": "https://your-domain.com/webhooks/parallel", "event_types": ["task_run.status"] } }' ``` curl --request POST \ --url https://api.parallel.ai/v1/tasks/runs \ --header "Content-Type: application/json" \ --header "parallel-beta: webhook-2025-08-12" \ --header "x-api-key: $PARALLEL_API_KEY" \ --data '{ "task_spec": { "output_schema": "Find the GDP of the specified country and year" }, "input": "France (2023)", "processor": "core", "webhook": { "url": "https://your-domain.com/webhooks/parallel", "event_types": ["task_run.status"] } }' ``` ```]( )

When your task completes, we POST the full result to your endpoint.

For security, webhooks follow [standard conventions](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md) [standard conventions]($https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md) including signature verification. You can manage your webhook secret keys in [Settings->Webhooks](https://platform.parallel.ai/settings?tab=webhook) [Settings->Webhooks]($https://platform.parallel.ai/settings?tab=webhook) on our Developer Platform.

## \## **\*\* Start using webhooks today \*\***

Webhooks are available today for all Task API processors. Get started with our [documentation](https://docs.parallel.ai/task-api/features/webhooks) [documentation]($https://docs.parallel.ai/task-api/features/webhooks) .

By Parallel

August 21, 2025

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

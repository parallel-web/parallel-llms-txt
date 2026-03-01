[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Search](/products/search) [Search](https://parallel.ai/products/search) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Latency improvements on the Parallel Task API

Reading time: 3 min

At Parallel, we’ve focused on offering state-of-the-art web research agents via our [Task API,](https://docs.parallel.ai/task-api/task-quickstart) [Task API,]($https://docs.parallel.ai/task-api/task-quickstart) along the Pareto frontier of accuracy and cost for every compute budget. From a fraction of a cent for simple research tasks to higher-cost, long-running agents that search deep and wide.

Task API Processors are asynchronous by design to allow for background agents that can deeply research anything on the web. However, through customer feedback, we’ve discovered that for some, latency matters even with asynchronous tasks.

Today, we’re announcing significant latency improvements to the Parallel Task API, available via a new suite of Lower-latency [Processors](https://docs.parallel.ai/task-api/guides/choose-a-processor) [Processors]($https://docs.parallel.ai/task-api/guides/choose-a-processor) . These latency improvements enable high-quality structured web research across a broad range of price points, compute levels, _\_ and \__ speed.

## \## **\*\* How we reduced latency \*\***

We’ve improved the speed of our Task API Processors by creating faster variants that prioritize latency constraints and pull directly from our proprietary web index, with significantly fewer real-time crawls.

By contrast, our standard Processors (also powered by our web index) bias towards waiting for real-time information and live crawling to achieve maximum freshness and coverage across edge cases.

The result of the latency improvements is meaningfully (3-5x) faster variants for every Processor, while maintaining cost and comparable accuracy for a wide range of use cases.

## \## **\*\* When to use lower latency Processors \*\***

We’ve designed our lower-latency Processors for web research queries where information needs aren’t as sensitive to extreme freshness of data, or where end-user experience is highly contingent on speed. For example:

* \- Subagent calls: An agent that calls the Task API and needs low-latency responses
* \- Interactive applications: Table UIs where users actively run tasks
* \- Testing agents: Rapid iteration during development

## \## **\*\* Best-in-class accuracy with Basis verification \*\***

Every lower latency Processor variant continues to include the Basis framework: citations, reasoning, excerpts, and calibrated confidence scores. These ensure visibility into the verifiability and provenance of every atomic fact.

## \## **\*\* Get started with lower-latency Processors on the Task API \*\***

[\### Creating a Task Run ``` 1 2 3 4 5 6 7 8 9 task_run = client .task_run .create ( input= "Parallel Web Systems (parallel.ai)" , task_spec={ "output_schema" : "The founding date of the company in the format MM-YYYY" }, processor= "lite-fast" ) print (f "Run ID: {task_run.run_id}" ) run_result = client .task_run .result (task_run .run_id , api_timeout= 3600 ) print (run_result.output) ``` task_run = client.task_run.create( input="Parallel Web Systems (parallel.ai)", task_spec={"output_schema":"The founding date of the company in the format MM-YYYY"}, processor="lite-fast" ) print(f"Run ID: {task_run.run_id}") run_result = client.task_run.result(task_run.run_id, api_timeout=3600) print(run_result.output) ``` ```]( )

Lower-latency Processors are available today for the Parallel Task API. Start building in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/) [documentation]($https://docs.parallel.ai/) .

## \## **\*\* About Parallel Web Systems \*\***

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. Our solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel’s web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses such as Starbridge, Amp (Sourcegraph), and Day AI use Parallel to support core features including public-sector contract monitoring, documentation lookup, and GTM operations.

By Parallel

December 10, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Products

* [Search API](/products/search) [Search API](https://parallel.ai/products/search)
* [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Extract API](https://docs.parallel.ai/extract/extract-quickstart)
* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [Task API](https://docs.parallel.ai/task-api/task-quickstart)
* [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart)
* [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)
* [Monitor API](https://platform.parallel.ai/play/monitor) [Monitor API](https://platform.parallel.ai/play/monitor)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms of Service](/terms-of-service) [Terms of Service](https://parallel.ai/terms-of-service)
* [Customer Terms](/customer-terms) [Customer Terms](https://parallel.ai/customer-terms)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Acceptable Use](/acceptable-use-policy) [Acceptable Use](https://parallel.ai/acceptable-use-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2025

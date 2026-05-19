[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Search](/products/search) [Search](https://parallel.ai/products/search) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Parallel Monitor

Tags: [Product Release](/blog?tag=product-release)

Reading time: 3 min

Today, we released the [**\*\* Parallel Monitor API \*\***](https://docs.parallel.ai/monitor-api/monitor-quickstart) [ **\*\* Parallel Monitor API \*\*** ]($https://docs.parallel.ai/monitor-api/monitor-quickstart) , the newest addition to our [**\*\* Web Agents API \*\***](https://docs.parallel.ai/task-api/task-quickstart) [ **\*\* Web Agents API \*\*** ]($https://docs.parallel.ai/task-api/task-quickstart) suite.

**\*\* Parallel Monitor \*\*** can be thought of as a web search that’s always on: you define a query that kicks off an ongoing stream of updates every time new related information appears on the web.

It’s available now to try for free in the Parallel [Developer Platform](https://platform.parallel.ai/play/monitor) [Developer Platform]($https://platform.parallel.ai/play/monitor) .

[](https://cdn.sanity.io/images/5hzduz3y/production/2f7d820de18102db9e9d5e7127dd418121b208ad-1610x1060.jpg?w=2000&fit=max&auto=format&dpr=2)

![An example of the Monitor API in the Parallel developer platform](https://cdn.sanity.io/images/5hzduz3y/production/2f7d820de18102db9e9d5e7127dd418121b208ad-1610x1060.jpg)

## \## The web is built on retrieval

For over 30 years, the web has operated on a _\_ pull \__ model. At the protocol level, every interaction begins with a request to retrieve information. An HTTP GET request is sent to a server, which responds with the current state of a resource, and each time you want an update, you must send a new request. This pattern exists everywhere:

* \- Browsers: You navigate to a URL, and a server sends back HTML
* \- Search engines: You input a query, and a server responds with results
* \- APIs: Your application makes a request, and a server sends back information

Most of Parallel's APIs follow this pattern. When an agent needs information, it calls the [**\*\* Parallel Search \*\***](https://parallel.ai/products/search) [ **\*\* Parallel Search \*\*** ]($https://parallel.ai/products/search) or **\*\* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [Task API]($https://docs.parallel.ai/task-api/task-quickstart) \*\*** with a query and some parameters.

The trigger is always upstream— a human asking a question, a workflow step executing, or a cron job firing. The agent is fundamentally reactive. It waits to be asked, then pulls what it needs.

## \## From pull to push

The **\*\* Parallel Monitor API \*\*** flips the model from _\_ pull \__ to _\_ push \__ . Instead of triggering a request with a query, you can now create queries that themselves trigger notifications when new information is published to the web.

You can think of this like a webhook for the entire web.

[](https://cdn.sanity.io/images/5hzduz3y/production/f3c715d83a9aaf7143990cea1782c60572bb0235-2316x2000.jpg?w=2000&fit=max&auto=format&dpr=2)

![Traditional info retrieval vs. Monitor API](https://cdn.sanity.io/images/5hzduz3y/production/f3c715d83a9aaf7143990cea1782c60572bb0235-2316x2000.jpg)

Instead of asking for the latest state from the web, with **\*\* Monitor \*\*** , agents can now passively watch for state changes as they appear.

## \## Monitor tasks in practice

There are three key usage patterns for using **\*\* Monitor \*\*** tasks in production:

* \- **\*\* As a proactive sub-agent \*\***

Create a proactive agent that is invoked when a change on the web is detected. For example, a market intelligence agent that tracks competitor launches and feature releases. When a competitor publishes a blog post, the agent reads the information, performs additional searches with the Parallel **\*\* Search API \*\*** , and sends an open-ended report to a human reviewer in Slack.

* \- **\*\* As a workflow trigger \*\***

Create workflows that trigger when new information is surfaced. For example, a sales team monitors for multiple qualifying signals that could identify a potential buyer. Each match gets enriched via the Parallel **\*\* Task API \*\*** and added to their CRM automatically.

* \- **\*\* As a continuous intelligence feed \*\***

Create always-up-to-date data feeds. For example, a hedge fund creates monitors for each component of its investment thesis. When supporting or contradicting evidence appears, it triggers deeper research agents or alerts the analyst.

## \## Get started

Create a new monitor in just a few lines of code:

[\### Python Request ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 import requests url = "https://api.parallel.ai/v1alpha/monitors" payload = { "query" : "Extract recent news about AI" , "cadence" : "daily" } headers = { "x-api-key" : "<api-key>" , "Content-Type" : "application/json" } response = requests.post(url, json=payload, headers=headers) print (response.json()) ``` import requests url = "https://api.parallel.ai/v1alpha/monitors" payload = { "query": "Extract recent news about AI", "cadence": "daily" } headers = { "x-api-key": "<api-key>", "Content-Type": "application/json" } response = requests.post(url, json=payload, headers=headers) print(response.json()) ``` ```]( )

Get started for free in our [developer playground](https://platform.parallel.ai/) [developer playground]($https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/monitor-api/monitor-quickstart) [documentation]($https://docs.parallel.ai/monitor-api/monitor-quickstart) .

## \## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took weeks into agentic tasks that now take just minutes.

Fortune 100 companies in insurance, finance, and retail, as well as AI-first businesses like Clay, Starbridge, and Sourcegraph, use Parallel’s APIs to give their agents access to the best data from the web.

By Parallel

November 13, 2025

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

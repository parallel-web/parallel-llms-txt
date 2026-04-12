[Parallel](/)

Products

[Pricing](/pricing)

[Benchmarks](/benchmarks)

[Blog](/blog)

[Docs](https://docs.parallel.ai/home)

Products: [Search API](https://parallel.ai/products/search) [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Task API](https://parallel.ai/products/task) [FindAll API](https://parallel.ai/products/findall) [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)

[Pricing](https://parallel.ai/pricing) [Benchmarks](https://parallel.ai/benchmarks) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home)

[Contact C](https://form.fillout.com/t/rv6fubdwwuus) [Contact] (https://form.fillout.com/t/rv6fubdwwuus) [Log In / Sign Up P](https://platform.parallel.ai/) [Log In / Sign Up] (https://platform.parallel.ai/)

Menu [Menu]

Human Machine

# \# Introducing structured outputs for the Monitor API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 3 min

Today, we're releasing structured outputs for the Monitor API, giving you precise control over what information you receive when new events appear on the web.

When we launched the Monitor API last year, it introduced a fundamentally new pattern for web intelligence: instead of pulling information on demand, you could create queries that push notifications when relevant content appears. But the output format was limited; each match returned a URL and unstructured text, leaving downstream processing to your application.

With Structured Outputs, you now define exactly what fields you want extracted from each event. A monitor tracking competitor launches can return structured objects with product name, release date, key features, and pricing, ready for direct integration into your workflows without additional parsing or extraction steps.

## \## **\*\* How structured outputs works \*\***

[](https://cdn.sanity.io/images/5hzduz3y/production/68b8ba537ff8eda970b4e148a7586029c0623618-5396x3240.jpg?w=2000&fit=max&auto=format&dpr=2)

![](https://cdn.sanity.io/images/5hzduz3y/production/68b8ba537ff8eda970b4e148a7586029c0623618-5396x3240.jpg)

Previously, a monitor tracking industry news would return matches as raw URL and text pairs. Your agent/application would need to parse, extract, and structure the relevant information before it could be used in downstream systems.

With structured outputs enabled, you can now define a schema specifying exactly what you want to know about each event. The Monitor API does the work of extracting and validating these fields automatically, returning structured objects that match your specification.

For example, a monitor that tracks funding announcements might define:

* \- **\*\* company\_name \*\*** : The company that raised funding
* \- **\*\* round\_type \*\*** : Series A, B, C, or other round designation
* \- **\*\* amount \*\*** : Funding amount in USD
* \- **\*\* lead\_investors \*\*** : List of lead investors in the round
* \- **\*\* announced\_date \*\*** : When the funding was announced

Each match now returns a validated object with these fields populated.

## \## How to enable it

Define your output schema when creating a monitor:

\### Define the output schema for your monitor

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

15

16

17

18

19

20

21

22

23

24

25

26

27

28

curl --request POST \
  --url https://api.parallel.ai/v1alpha/monitors \
  --header  'Content-Type: application/json'  \
  --header  "x-api-key: $PARALLEL_API_KEY"  \
  --data  '{
    "query": "monitor ai news",
    "cadence": "daily",
    "output_schema": {
      "type": "json",
      "json_schema": {
        "type": "object",
        "properties": {
          "company_name": {
            "type": "string",
            "description": "Name of the company the news is about, NA if not company-specific"
          },
          "sentiment": {
            "type": "string",
            "description": "Sentiment of the news: positive or negative"
          },
          "description": {
            "type": "string",
            "description": "Brief description of the news"
          }
        }
      }
    }
  }' ```  curl --request POST \ --url https://api.parallel.ai/v1alpha/monitors \ --header 'Content-Type: application/json' \ --header "x-api-key: $PARALLEL_API_KEY" \ --data '{ "query": "monitor ai news", "cadence": "daily", "output_schema": { "type": "json", "json_schema": { "type": "object", "properties": { "company_name": { "type": "string", "description": "Name of the company the news is about, NA if not company-specific" }, "sentiment": { "type": "string", "description": "Sentiment of the news: positive or negative" }, "description": { "type": "string", "description": "Brief description of the news" } } } } }' ```
```

Each event delivered by the monitor will now conform to your schema.

## \## **\*\* Start building \*\***

Structured outputs is available today for the Monitor API. Get started in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/monitor-api/monitor-structured-outputs) [documentation]($https://docs.parallel.ai/monitor-api/monitor-structured-outputs) .

**\*\* About Parallel Web Systems \*\***

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

By Parallel

January 21, 2026

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

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0) [GitHub](https://github.com/parallel-web) [GitHub] (https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2026

# Introducing structured outputs for the Monitor API

Today, we're releasing structured outputs for the Monitor API, giving you precise control over what information you receive when new events appear on the web.

When we launched the Monitor API last year, it introduced a fundamentally new pattern for web intelligence: instead of pulling information on demand, you could create queries that push notifications when relevant content appears. But the output format was limited; each match returned a URL and unstructured text, leaving downstream processing to your application.

With structured outputs, you now define exactly what fields you want extracted from each event. A monitor tracking competitor launches can return structured objects with product name, release date, key features, and pricing, ready for direct integration into your workflows without additional parsing or extraction steps.

## **How structured outputs works**

![](https://cdn.sanity.io/images/5hzduz3y/production/68b8ba537ff8eda970b4e148a7586029c0623618-5396x3240.jpg)

Previously, a monitor tracking industry news would return matches as raw URL and text pairs. Your agent/application would need to parse, extract, and structure the relevant information before it could be used in downstream systems.

With structured outputs enabled, you can now define a schema specifying exactly what you want to know about each event. The Monitor API does the work of extracting and validating these fields automatically, returning structured objects that match your specification.

For example, a monitor that tracks funding announcements might define:

- **company_name**: The company that raised funding
- **round_type**: Series A, B, C, or other round designation
- **amount**: Funding amount in USD
- **lead_investors**: List of lead investors in the round
- **announced_date**: When the funding was announced

Each match now returns a validated object with these fields populated. 

## How to enable it

Define your output schema when creating a monitor:

```python
curl --request POST \
  --url https://api.parallel.ai/v1/monitors \
  --header 'Content-Type: application/json' \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "type": "event_stream",
    "frequency": "1d",
    "settings": {
      "query": "monitor ai news",
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
    }
  }'
```


Each event delivered by the monitor will now conform to your schema.

## **Start building**

Structured outputs is available today for the Monitor API. Get started in our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/monitor-api/monitor-structured-outputs).



**About Parallel Web Systems**

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

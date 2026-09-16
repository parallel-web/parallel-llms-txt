# Introducing Parallel FindAll

Parallel's new FindAll API turns natural language queries into custom datasets from the web. It finds entities like companies, people, or locations based on your criteria, then enriches them with structured data—all with citations. FindAll Pro achieves 61% recall, 3x better than competitors.

Today, we're announcing the newest product in our suite of **Web Agent APIs**: the **FindAll API**.

**FindAll** is the best way to create your own custom database from the web, with just a simple natural language query. It’s available now to try in the Parallel [Developer Platform](https://platform.parallel.ai/play/monitor).

## Turn the web into your own structured dataset

**FindAll** finds any set of entities (companies, people, events, locations, houses, etc.) based on a set of match criteria. For example, with **FindAll, **you can run a natural language query like “Find all dental practices located in Ohio that have 4+ star Google reviews.”

![Find all dental practicies in ohio with a 4+ star rating on google](https://cdn.sanity.io/images/5hzduz3y/production/69fdb0f405893405132f44fd83130f721ee5b7c8-3278x1948.png)

This is a powerful way to discover the complete long tail of interesting entities from the web and filter them down with match criteria that are personalized to your unique use case. The result is an extensible tool that can produce high-quality datasets on demand, as opposed to buying static, stale, and generic datasets.

## How FindAll works

FindAll executes a three-stage pipeline optimized for both coverage and efficiency:

**1. Generate candidates from web data: FindAll** searches across our proprietary web index to identify potential entities matching your query. Unlike traditional search, which returns a fixed result set, **FindAll** generates candidates dynamically based on your specific criteria.

**2. Evaluate against match conditions: **Each candidate is evaluated against your match conditions using multi-hop reasoning across web sources. Only candidates which satisfy all conditions reach matched status and are included in the results. This staged approach means you only pay to process entities that actually matter.

**3. Extract Structured Enrichments: **For matched entities, **FindAll** automatically orchestrates our **[Task API](https://docs.parallel.ai/task-api/task-quickstart)** to extract any additional fields you've specified— from basic attributes like revenue and employee count to complex data points like the strategic initiatives a company is prioritizing.

![](https://cdn.sanity.io/images/5hzduz3y/production/3ef8b555150213bf564e8d57f6d24b25e6cb49bc-1066x1718.png)


Every data point returned includes comprehensive verification through our **[Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis)**— citations linking to source materials, detailed reasoning for match decisions, relevant excerpts from web pages, and calibrated confidence scores. This granular attribution enables human-in-the-loop workflows for verifiability and provenance.

## State-of-the-art performance

To test the performance of **FindAll**, we created our own benchmark of 40 complex multi-criteria queries covering public companies, startups, SMBs, specialized entities, and people (e.g., executives, researchers, and professionals). Recall measures the proportion of all correct matches within the entire competitive set of successfully identified entities.

Some sample questions:



- "Find all former McKinsey & Company consultants who are currently employed in C-level or VP positions at healthcare technology startups with Series A or later funding" — combines employment history, current role level, industry focus, and funding stage.
- "Find all wedding venues in Florida with capacity between 150-300 guests that offer both indoor and outdoor ceremony options, provide in-house catering, and have availability in 2025" — combines location, capacity range, facility features, service offerings, and temporal availability.
- "Find all climate technology startups that have active pilot programs with Fortune 500 companies, raised pre-Series A funding, and focus on carbon capture or renewable energy storage" — combines industry focus, corporate partnerships, funding stage, and specific technology areas.

****

**FindAll Pro** achieves state-of-the-art results with 61% recall, ~3X higher than OpenAI Deep Research, Anthropic Deep Research, and Exa. Higher recall means that Parallel **FindAll **finds more correct matches for a given query.** FindAll** **Base** also achieves 30% recall while being the lowest cost on the market, making it the most cost-effective yet performant option.

### Parallel-FindAll

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "FindAll Base",
    "x": 60,
    "y": 30.3
  },
  {
    "label": "FindAll Core",
    "x": 230,
    "y": 52.5
  },
  {
    "label": "FindAll Pro",
    "x": 1430,
    "y": 61.3
  }
]
```

```
[
  {
    "label": "OpenAI Deep Research",
    "x": 250,
    "y": 19.5,
    "yDisplay": 21
  },
  {
    "label": "Anthropic Deep Research",
    "x": 1140,
    "y": 15.3,
    "xDisplay": 1000
  },
  {
    "label": "Exa",
    "x": 110,
    "y": 19.2
  }
]
```

> **FindAll can be used to find a broad set of entities across a range of criteria. There are many powerful and diverse use cases we’ve seen:**
>
> - **Finding sales leads that match your ICP**: “Find all F500 companies with a senior AI leader that joined the company in the last 6 months”
> - **Finding acquisition targets as a hedge fund**: "Find all residential roofing companies in Charlotte, NC with 10-50 employees"
> - **Finding public companies to invest in**: "Find all S&P 500 companies that cited tariffs as a key risk in their latest 10-K"
> - **Finding competitors to keep track of**: "Find all productivity tools targeting remote teams that launched in the last year"
> - **Creating market maps**: "Find all AI infrastructure providers that raised Series B in the last 6 months"
> - **Finding potential suppliers and factories**: "Find all semiconductor equipment manufacturers with facilities in Southeast Asia."
> - **Researching regulatory environments: **“Find all environmental lawsuits in the United States where a court ruling was reached in 2025”

## Get started creating entire datasets from the web

The **FindAll** API is available today. Get started with our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/findall-api/findall-quickstart).

```python
import requests

url = "https://api.parallel.ai/v1beta/findall/runs"

payload = {
    "objective": "<string>",
    "entity_type": "<string>",
    "match_conditions": [
        {
            "name": "<string>",
            "description": "Company must have SOC2 Type II certification (not Type I). Look for evidence in: trust centers, security/compliance pages, audit reports, or press releases specifically mentioning 'SOC2 Type II'. If no explicit SOC2 Type II mention is found, consider requirement not satisfied."
        }
    ],
    "generator": "base",
    "match_limit": 123
}
headers = {
    "x-api-key": "<api-key>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel’s web intelligence APIs in insurance, finance, and retail, as well as AI-first businesses like Clay, Starbridge, and Sourcegraph.

# Introducing Parallel Image Search

Today we're launching the [Parallel Images API](https://docs.parallel.ai/image-search/image-search-quickstart), the first image search engine for agents.

Pricing starts at $1 per 1,000 requests (20 images per request) and is available today via the Parallel [API](https://docs.parallel.ai/image-search/image-search-quickstart) and [MCP](https://parallel.ai/mcp).

## New modalities for agentic web search

As agentic work evolves, AI experiences limited to text-only input/output feel increasingly archaic. Agents can now produce rich artifacts: presentations, documents, images, videos, and apps, but to get the most out of these new abilities, they need reliable, affordable, and high-quality access to a wider range of media.

Image Search is the first step we're taking to broaden AI access to web content beyond text, and the first image search API designed from the ground up for agents.

## What teams are building with Parallel Image Search

The Images API has been in beta with select customers since early October. Here's how AI-powered image sourcing is being used in production today:

- Adding the right headshots and company logos to research briefs, memos, and presentations
- Bulk gathering headshots and logos for CRMs and company databases
- Finding current product and merchant photos for shopping and delivery apps
- Pulling visual references so app-building agents can pick colors and style before they build
- Sourcing real-world reference photos for image and video generation

## How it works

The hard part isn't finding an image. It's finding the right one. Like the Parallel Search API, Image Search takes two inputs:

- **Keyword queries** define what to look for.
- An optional **objective** says, in natural language, what a good result looks like and what to leave out.

The objective helps steer the API to surface the right image for the given context.

![Keywords (required): short search terms such as "ramp logo" and "ramp fintech logo". Objective (optional): a plain-English description such as "The current logo of Ramp, the corporate card company. Not wheelchair or skate ramps."](https://cdn.sanity.io/images/5hzduz3y/production/7641e2fb41cac5b0d3d8559b39cbb458d9ce6ae4-2048x1152.png)

A sample request for product images:

```python
import os, requests

response = requests.post(
    "https://api.parallel.ai/v1/images/search",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json={
        "objective": "Product photos of the white Nike Air Force 1 '07 (CW2288-111) "
                     "from multiple angles: side, top, back and outsole. Clean catalog shots.",
        "search_queries": ["Nike Air Force 1 '07 white CW2288-111", "Air Force 1 '07 outsole"],
        "mode": "fast",
    },
)

for image in response.json()["results"]:
    print(image["title"], image["image_url"], image["source_page_url"])

```

## Two Image Search modes: fast and advanced

Modes determine the speed, cost, and depth of the search:

| Mode | Typical speed | Price | Best for |
| --- | --- | --- | --- |
| Fast | ~1 second | $1 per 1,000 requests | Live chat, shopping answers, high-volume workloads |
| Advanced (default) | ~3 seconds | $5 per 1,000 requests | Briefs, catalog enrichment, anything where the exact image matters |

## Get started

Image Search is available today. Get an API key and try it live in the [Parallel Platform](https://platform.parallel.ai/play/images). Use of Image Search, including any images it returns, is subject to the [Parallel Customer Terms](https://parallel.ai/customer-terms).



Follow our [quickstart](https://docs.parallel.ai/image-search/image-search-quickstart) documentation, [writing objectives and queries](https://docs.parallel.ai/image-search/best-practices), and [choosing a mode](https://docs.parallel.ai/image-search/modes).

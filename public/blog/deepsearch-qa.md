# Parallel Task API achieves state-of-the-art accuracy on DeepSearchQA

The Parallel Task API achieves industry-leading accuracy of 72.6% on the new DeepSearchQA benchmark from Google, surpassing their own Gemini Deep Research and OpenAI o1 Pro at up to 6x lower cost.

## About DeepSearchQA

Last week, Google released [DeepSearchQA](https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA_benchmark_paper.pdf), a new evaluation set for benchmarking 900 difficult multi-step deep research tasks across 17 fields of expertise. The release coincides with the launch of Google’s [Gemini Deep Research API](https://blog.google/technology/developers/deep-research-agent-gemini-api/), which, until the release of this post, led the market with a score of [66.1%](https://www.kaggle.com/benchmarks/google/dsqa/leaderboard).

![Parallel Task Ultra2x, Gemini Deep Research API, ChatGPT 5.2 Pro, Exa Research Pro, Perplexity Sonar Deep Research ](https://cdn.sanity.io/images/5hzduz3y/production/e4d91fc96d52ba10eeb5091a605f7747bb4931e3-5396x3240.jpg)

Research tasks are structured as part of a “causal-chain”, where answers to each step are dependent on successful resolution of the previous step. The benchmark is designed to address three key areas that have previously been under-evaluated:

1. Systematic collation of fragmented information from disparate sources
2. De-duplication and entity resolution to ensure precision
3. The ability to reason about stopping criteria within an open-ended search space

## Parallel scores state-of-the-art at one sixth the price of the next best alternative

### DeepSearchQA Task API

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Pro",
    "x": 100,
    "y": 62
  },
  {
    "label": "Ultra",
    "x": 300,
    "y": 68.5
  },
  {
    "label": "Ultra2x",
    "x": 600,
    "y": 72.6
  }
]
```

```
[
  {
    "label": "Gemini Deep Research",
    "x": 3680,
    "y": 64.3,
    "yDisplay": 64.3,
    "xDisplay": 2500
  },
  {
    "label": "OpenAI GPT 5.2 Pro",
    "x": 1830,
    "y": 61
  },
  {
    "label": "Exa",
    "x": 740,
    "y": 27,
    "yDisplay": 30
  },
  {
    "label": "Perplexity Deep Research",
    "x": 1540,
    "y": 26.9,
    "yDisplay": 25
  }
]
```

In addition to setting the new standard for deep research ability, Ultra2x is up to six times cheaper than the second best, Gemini Deep Research API. Compared with deep research offerings outside OpenAI and Google, Parallel delivers both significantly higher accuracy and cost savings:

- Parallel Ultra2x is 91% more accurate and 21% cheaper than Exa Research Pro
- Parallel Ultra2x is 91% more accurate and 88% cheaper than Perplexity Sonar Deep Research

## How Parallel achieves state-of-the-art web research

**A web index with billions of pages**

Our proprietary web index is growing rapidly, on pace to be among the largest in the world. The breadth and depth of our index mean that we can access information from pages not typically seen by traditional search engines.

**Token-efficient search made for LLMs**

[Parallel Search](https://parallel.ai/products/search), a key ingredient in the Task API, is purpose-built around the needs of LLMs. Our search ranks pages by content relevance, with an emphasis on token efficiency.

**Live crawling and extraction for fresh data**

Our innovations in crawling and extraction enable us to access hard-to-reach pages and content like JavaScript heavy pages and PDFs.

## About the Parallel Task API

The Parallel Task API is a powerful, general-purpose web agent API that transforms manual workflows into programmable and repeatable operations at scale. It combines best-in-class web search with fine-tuned AI models to deliver outputs ranging from short text summaries to comprehensive reports and structured data. [Learn more about the Task API](https://docs.parallel.ai/task-api/task-quickstart).

## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel’s web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations. [Learn more about Parallel](https://parallel.ai/about).

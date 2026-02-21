> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> A high-level introduction to Parallel's APIs for web research, data enrichment, and intelligent automation

Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows. Whether you need to search the web, extract content from pages, enrich datasets, discover entities, or monitor changes—Parallel handles the complexity so you can focus on building.

## API products

Parallel offers two categories of APIs: **Web Tools** for direct web access and **Web Agents** for AI-powered research workflows.

### Web Tools

Low-latency, synchronous APIs for direct web access.

<CardGroup cols={2}>
  <Card title="Search API" icon="magnifying-glass" href="/search/search-quickstart">
    Execute natural language web searches and retrieve LLM-optimized excerpts. Replace multiple keyword searches with a single call for broad or complex queries.
  </Card>

  <Card title="Extract API" icon="file-export" href="/extract/extract-quickstart">
    Convert any public URL into clean, LLM-optimized markdown. Handles JavaScript-heavy pages and PDFs with focused excerpts or full page content.
  </Card>
</CardGroup>

### Web Agents

AI-powered APIs that combine inference with web research for complex workflows.

<CardGroup cols={2}>
  <Card title="Task API" icon="list-check" href="/task-api/task-quickstart">
    Transform complex research tasks into programmable, repeatable operations. Define what you need in plain language or JSON, and get structured outputs with citations and confidence levels.
  </Card>

  <Card title="Chat API" icon="comment" href="/chat-api/chat-quickstart">
    Build low-latency web research applications with OpenAI-compatible streaming chat completions. Choose from speed-optimized or research-grade models.
  </Card>

  <Card title="FindAll API" icon="database" href="/findall-api/findall-quickstart">
    Discover and enrich entities from the web using natural language queries. Turn queries like "FindAll AI companies that raised Series A" into structured, enriched databases.
  </Card>

  <Card title="Monitor API" icon="bell" href="/monitor-api/monitor-quickstart">
    Track web changes continuously with scheduled queries and webhook notifications. Set up once and receive updates when relevant changes occur.
  </Card>
</CardGroup>

## Choosing the right API

| Use case                                      | Recommended API                                | Why                                                    |
| --------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| Search the web for information                | [Search API](/search/search-quickstart)        | Fast, synchronous results with LLM-optimized excerpts  |
| Extract content from specific URLs            | [Extract API](/extract/extract-quickstart)     | Clean markdown from any page, including JS-heavy sites |
| Enrich CRM or database records                | [Task API](/task-api/task-enrichment)          | Structured input/output with web research              |
| Generate research reports                     | [Task API](/task-api/task-deep-research)       | Deep research with citations and confidence levels     |
| Build a grounded chatbot                      | [Chat API](/chat-api/chat-quickstart)          | OpenAI-compatible with web-grounded responses          |
| Build lists of companies, people, or products | [FindAll API](/findall-api/findall-quickstart) | Entity discovery with automatic validation             |
| Track news or changes over time               | [Monitor API](/monitor-api/monitor-quickstart) | Scheduled monitoring with webhook delivery             |

## Getting started

### Step 1: Get your API key

Sign up at [platform.parallel.ai](https://platform.parallel.ai) to generate your API key.

### Step 2: Install the SDK

Use our Python or TypeScript SDK for the best developer experience.

<CodeGroup>
  ```bash Python theme={"system"}
  pip install parallel-web
  export PARALLEL_API_KEY="your-api-key"
  ```

  ```bash TypeScript theme={"system"}
  npm install parallel-web
  export PARALLEL_API_KEY="your-api-key"
  ```
</CodeGroup>

### Step 3: Make your first request

Try a simple search to verify your setup.

<CodeGroup>
  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel()

  search = client.beta.search(
      objective="What is Parallel Web Systems?",
      search_queries=["Parallel Web Systems company"],
      max_results=5,
  )

  print(search.results)

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel();

  const search = await client.beta.search({
      objective: "What is Parallel Web Systems?",
      search_queries: ["Parallel Web Systems company"],
      max_results: 5,
  });

  console.log(search.results);
  ```
</CodeGroup>

## Next steps

* **[Pricing](/getting-started/pricing)**: Understand costs for each API
* **[Rate limits](/getting-started/rate-limits)**: Default quotas and how to request increases
* **[Glossary](/getting-started/glossary)**: Key terms and concepts used throughout the docs

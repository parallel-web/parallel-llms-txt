# Web Search for Browserbase is now powered by Parallel

Parallel is now the default search provider for the Browserbase Search API and Browserbase Agents, so agents can navigate the web end to end, from discovery and research to action.

Starting today, Parallel is the default search provider for the Browserbase Search API and Browserbase Agents, so agents can navigate the web end to end, from discovery and research to action.

## Why search comes before the browser

Most agent tasks start before the agent knows which page to open. It has to find sources, read the useful ones, and then open a browser for the steps that need one, such as logging in to a portal or working through a complex page. Browserbase’s docs describe this order as search, then fetch, then browsers. Search finds the starting points, fetch pulls content from most pages quickly, and a browser session handles the hard-to-reach data.

Search is the first step, so the later steps depend on its results. When search returns the right URLs, your agent opens fewer browser sessions and spends fewer tokens reading pages that don’t answer the question.

## What changes for Browserbase users

- By default, requests to /v1/search and bb.search.web now use Parallel unless you choose another provider.
  - You can set provider on each request.
  - A mode parameter accepts [advanced or fast](https://docs.parallel.ai/search/modes).
- Parallel is also now the search provider behind Browserbase’s Agents products.

## Getting started

Use your existing Browserbase API key:

```sh
curl https://api.browserbase.com/v1/search \
  -H "Content-Type: application/json" \
  -H "x-bb-api-key: $BROWSERBASE_API_KEY" \
  -d '{
    "query": "headless browser infrastructure",
    "numResults": 5,
    "mode": "advanced"
  }'

```

```typescript
import Browserbase from "@browserbasehq/sdk";

const bb = new Browserbase();

const res = await bb.search.web({
  query: "headless browser infrastructure",
  numResults: 5,
  mode: "fast" // or "advanced"
});

```

Read Browserbase’s [announcement](https://www.browserbase.com/blog/browserbase-and-parallel-search) and the [Search docs](https://docs.browserbase.com/platform/search/overview) for more information. 

To use Parallel Search directly, start at [docs.parallel.ai](https://docs.parallel.ai/search/search-quickstart).

### About Browserbase

Browserbase is the complete platform to build and deploy agents that browse the web like humans. One API key gives agents Browsers, Search, Fetch, and Agent Identity to act where APIs can't.

### About Parallel

Parallel Web Systems builds web search and research APIs for AI agents. Developers and enterprises use Parallel to give their agents accurate, fresh, and verifiable information from the open web, through one API suite that covers search, extraction, deep research, entity discovery, and continuous monitoring. Parallel runs its own web-scale index and returns token-efficient outputs designed for LLMs, with citations, reasoning, and confidence scores on every research result.

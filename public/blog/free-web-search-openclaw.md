# OpenClaw now has free, LLM-optimized web search by default powered by Parallel

## Free out of the box

New installs of OpenClaw run web searches through Parallel by default. For personal use, the included limits are generous enough to cover everyday research, coding lookups, and agent runs. 

Power users of OpenClaw with significant search volumes can still add a Parallel API key for pay-as-you-go usage.

## How to turn it on

### New installs

Fresh installs of OpenClaw come with Parallel Web Search by default. Ask your agent something that needs the web, and it searches and returns grounded answers with sources.

### Existing installs

Already running OpenClaw with a different search provider? You have two ways to switch.

- The easy way: just tell your agent to switch to Parallel free web search
- Alternatively, run this command: 

```
openclaw config set tools.web.search.provider parallel
```

## What else you can do with Parallel and OpenClaw

Once your OpenClaw has default search, you can extend its capabilities further by installing the [Parallel CLI](https://docs.parallel.ai/integrations/cli). The CLI gives OpenClaw more ways to make the web work for you:

- **Deep research with the ****[Task API](https://docs.parallel.ai/task-api/task-quickstart)****.** Have your OpenClaw hand off complex web research questions to a subagent. 
- **Always-on web monitoring with the ****[Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart)****.** Track news, product prices, or competitor moves, and get notified the moment something relevant appears.
- **Clean content extraction with the ****[Extract API](https://docs.parallel.ai/extract/extract-quickstart)****.** Turn any public page, including JavaScript-heavy sites and PDFs, into clean markdown your agent can read.

Each one runs through the same Parallel key, so you can compose them into a single workflow: monitor for an event, extract the page, research the context, all from OpenClaw.

## Why Parallel

We built our web index to serve AI, not human clicks. Results come back as dense, ranked excerpts sized for an agent's context window, so OpenClaw gets more signal per token and makes fewer round trips to find an answer. 

In summary, Parallel Search is:

- Easy to set up
- Free by default, with pay-as-you-go available for heavy use
- High-quality with fresh results that go deeper
- Token-efficient, which means saving on input tokens

## Web search vs. browser use vs. headless browsers

With browser use, your agent drives a real browser the way a person would: load the page, render the JavaScript, read what's on screen, and click to the next step. It's the most flexible approach, but it’s the slowest and most wasteful. 

With a headless browser, you drop the visible window but keep the navigation of website content. Your code still loads and renders each page, then parses the HTML to pull out what matters. That's faster than full browser use, but only marginally and still extremely inefficient. Both browsing options can be useful for navigating a page on the user’s behalf to perform actions like filling out forms, but for information-seeking queries, using a browser is extremely wasteful.

With a search API, your agent simply declares what it's looking for, and Parallel returns the relevant ranked page excerpts in ready-to-read JSON. 

## Get started

Install OpenClaw and set your web search provider to “Parallel Search (free)”. 

To go further with deep research, monitoring, and extraction, grab a Parallel API key at [platform.parallel.ai](https://platform.parallel.ai/) and explore the CLI and APIs in our [docs](https://docs.parallel.ai/).

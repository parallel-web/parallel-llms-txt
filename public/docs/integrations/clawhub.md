> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# ClawHub

> Install Parallel skills for OpenClaw from ClawHub — the skill registry for AI agents

[ClawHub](https://clawhub.ai) is the public skill registry for [OpenClaw](https://openclaw.ai), an open-source AI agent that runs locally on your machine. Parallel publishes four official skills on ClawHub that give OpenClaw access to web search, content extraction, deep research, and data enrichment via the [Parallel CLI](/integrations/cli).

<Note>ClawHub does not currently support verified or "official" publisher accounts. The Parallel skills are published under [@NormallyGaussian](https://clawhub.ai/u/normallygaussian).</Note>

## Available Skills

| Skill                                                                                | Description                                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [parallel-search](https://clawhub.ai/normallygaussian/parallel-search)               | AI-powered web search with domain filtering and date ranges  |
| [parallel-extract](https://clawhub.ai/normallygaussian/parallel-extract)             | Extract clean markdown from URLs, PDFs, and JS-heavy sites   |
| [parallel-deep-research](https://clawhub.ai/normallygaussian/parallel-deep-research) | Multi-source deep research with configurable processor tiers |
| [parallel-enrichment](https://clawhub.ai/normallygaussian/parallel-enrichment)       | Bulk data enrichment for companies, people, or products      |

## Prerequisites

<Steps>
  <Step title="Install the Parallel CLI">
    Install the [Parallel CLI](/integrations/cli):

    ```bash theme={"system"}
    curl -fsSL https://parallel.ai/install.sh | bash
    ```

    See the [CLI docs](/integrations/cli) for other installation methods.
  </Step>

  <Step title="Authenticate">
    ```bash theme={"system"}
    parallel-cli login
    # or
    export PARALLEL_API_KEY="your_api_key"
    ```

    See the [CLI docs](/integrations/cli#authentication) for other authentication methods.
  </Step>
</Steps>

## Installation

First, install OpenClaw and ClawHub if you haven't already:

```bash theme={"system"}
# Install OpenClaw (recommended: run locally for security)
npm install -g openclaw@latest
openclaw gateway --port 18789 --bind loopback
openclaw dashboard  # start the chat interface

# Install ClawHub CLI
npm install -g clawhub
```

Then install the Parallel skills:

```bash theme={"system"}
clawhub install parallel-search
clawhub install parallel-extract
clawhub install parallel-deep-research
clawhub install parallel-enrichment
```

## Usage

Once installed, the skills are automatically available to OpenClaw. The agent will invoke them based on your messages:

* **Search** — "Search the web for the latest AI funding news"
* **Extract** — "Read this URL and summarize it: `<paste-url-here>`"
* **Deep Research** — "Do a thorough investigation of the EV battery market"
* **Enrichment** — "Find the CEO and annual revenue for each company in this list"

All skills use the [Parallel CLI](/integrations/cli) under the hood and support `--json` output for structured results.

## Learn More

* [Parallel CLI documentation](/integrations/cli) for full command reference
* [Agent Skills](/integrations/agent-skills) for Cursor, Cline, Copilot, and other coding agents
* [Claude Code](/integrations/claude-code-marketplace) for the Claude Code plugin

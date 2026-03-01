> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Code Plugin Marketplace

> Add Parallel web search, extraction, deep research, and data enrichment to Claude Code

The Parallel plugin for Claude Code gives your coding agent access to live web search, content extraction, deep research, and data enrichment — all available as slash commands and automatic skills directly inside Claude Code.

<Tip>View the complete repository for this plugin [here](https://github.com/parallel-web/parallel-agent-skills)</Tip>

## Features

* **Web Search**: Fast, real-time search for current events, documentation lookups, and fact-checking
* **Content Extraction**: Clean content extraction from any URL, including JavaScript-heavy sites and PDFs
* **Deep Research**: Exhaustive, multi-source research reports with configurable depth and processing power
* **Data Enrichment**: Bulk enrichment of companies, people, or products with web-sourced fields like CEO names, funding, and contact info

## Prerequisites

<Steps>
  <Step title="Install the Parallel CLI">
    ```bash  theme={"system"}
    curl -fsSL https://parallel.ai/install.sh | bash
    ```
  </Step>

  <Step title="Get your API key">
    Get your API key from [Parallel](https://platform.parallel.ai) and set it as an environment variable:

    ```bash  theme={"system"}
    export PARALLEL_API_KEY="your-api-key"
    ```
  </Step>
</Steps>

## Installation

Install the plugin from the Claude Code Plugin Marketplace:

```bash  theme={"system"}
/plugin marketplace add parallel-web/parallel-agent-skills
/plugin install parallel
```

Then run the setup command to verify the CLI is installed and authenticated:

```
/parallel:setup
```

## Slash Commands

Once installed, the following commands are available in Claude Code:

| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `/parallel:search <query>`   | Search the web for current information       |
| `/parallel:extract <url>`    | Extract content from a URL                   |
| `/parallel:research <topic>` | Run a deep research task                     |
| `/parallel:enrich <data>`    | Enrich a list of entities with web data      |
| `/parallel:status <run_id>`  | Check the status of a research task          |
| `/parallel:result <run_id>`  | Get the results of a completed research task |
| `/parallel:setup`            | Install CLI and authenticate                 |

## Usage

Beyond slash commands, the plugin also installs skills that Claude Code uses automatically based on context:

* Ask a question that needs current information and Claude will search the web
* Paste a URL and ask Claude to read it — it will extract the content
* Ask for exhaustive research on a topic and Claude will run a deep research task
* Give Claude a list of companies and ask it to find their CEOs — it will use data enrichment

## Learn More

For detailed documentation, skill definitions, and contribution guidelines, see the [parallel-agent-skills repository on GitHub](https://github.com/parallel-web/parallel-agent-skills).

For Agent Skills support with other coding agents (Cursor, Cline, Copilot, etc.), see the [Agent Skills](/integrations/agent-skills) integration.

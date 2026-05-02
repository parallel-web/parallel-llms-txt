> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Skills

> Add Parallel web search, extraction, deep research, and data enrichment to any AI coding agent

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

Agent Skills let you add Parallel's capabilities to AI coding agents like Cursor, Cline, GitHub Copilot, Windsurf, and 30+ other tools via the [Agent Skills CLI](https://github.com/agentskills/agentskills). Skills are lightweight, declarative integrations that give your agent access to live web data without writing any code.

<Tip>View the complete repository for this integration [here](https://github.com/parallel-web/parallel-agent-skills)</Tip>

## Available Skills

| Skill                      | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `parallel-web-search`      | Fast web search for current events, fact-checking, and lookups             |
| `parallel-web-extract`     | Extract clean content from URLs, including JavaScript-heavy sites and PDFs |
| `parallel-deep-research`   | Exhaustive, multi-source research reports with configurable depth          |
| `parallel-data-enrichment` | Bulk enrichment of companies, people, or products with web-sourced data    |

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

Install all skills globally so they're available in every project:

```bash theme={"system"}
npx skills add parallel-web/parallel-agent-skills --all --global
```

Or install a specific skill:

```bash theme={"system"}
npx skills add parallel-web/parallel-agent-skills --skill parallel-web-search
```

To see all available skills before installing:

```bash theme={"system"}
npx skills add parallel-web/parallel-agent-skills --list
```

## Usage

Once installed, skills are automatically available to your agent. No additional configuration is needed — your agent will use them when appropriate based on your prompts.

* **Web search** is used by default for any research, lookup, or question needing current information
* **Extract** is used when your agent needs to fetch content from a specific URL
* **Deep research** is triggered when you explicitly request exhaustive or comprehensive research
* **Data enrichment** is used for bulk enrichment of lists of companies, people, or products

## Supported Agents

Agent Skills work with any tool that supports the Vercel Skills CLI, including:

* Cursor
* Cline
* GitHub Copilot
* Windsurf
* And [30+ other agents](https://github.com/agentskills/agentskills)

For Claude Code, you can also use the [Claude Code Plugin Marketplace](/integrations/claude-code-marketplace) integration.

## Learn More

For detailed skill documentation, configuration options, and local development instructions, see the [parallel-agent-skills repository on GitHub](https://github.com/parallel-web/parallel-agent-skills).

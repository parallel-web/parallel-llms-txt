> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Cursor Plugin

> Add Parallel web search, extraction, deep research, and data enrichment to Cursor

Give Cursor an advanced suite of web search tools for harder tasks that standard search struggles with — available as slash commands and automatic skills directly inside Cursor.

<Tip>
  Parallel is available in the [Cursor Plugin Marketplace](https://cursor.com/marketplace/parallel). View the source on [GitHub](https://github.com/parallel-web/parallel-cursor-plugin).
</Tip>

## Features

| Capability             | Skill                      | Command                      |
| ---------------------- | -------------------------- | ---------------------------- |
| **Web Search**         | `parallel-web-search`      | `/parallel-search <query>`   |
| **Content Extraction** | `parallel-web-extract`     | `/parallel-extract <url>`    |
| **Deep Research**      | `parallel-deep-research`   | `/parallel-research <topic>` |
| **Data Enrichment**    | `parallel-data-enrichment` | `/parallel-enrich <data>`    |

Additional commands: `/parallel-setup`, `/parallel-status <run_id>`, `/parallel-result <run_id>`

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

Install the plugin from the [Cursor Plugin Marketplace](https://cursor.com/marketplace/parallel), or run in Cursor's chat:

```
/add-plugin parallel
```

Then run the setup command to verify the CLI is installed and authenticated:

```
/parallel-setup
```

### Manual CLI Setup

If you prefer to set up the CLI manually:

```bash theme={"system"}
curl -fsSL https://parallel.ai/install.sh | bash
parallel-cli login
```

Or via pipx:

```bash theme={"system"}
pipx install "parallel-web-tools[cli]"
parallel-cli login
```

## Quick Start

**Search the web:**

```
/parallel-search latest developments in AI chip manufacturing
```

**Extract a webpage:**

```
/parallel-extract https://example.com/article
```

**Deep research (slower, more thorough):**

```
/parallel-research comprehensive analysis of React vs Vue in 2026
```

**Enrich data:**

```
/parallel-enrich companies.csv with CEO name, funding amount, and headquarters
```

## Usage

Beyond slash commands, the plugin also installs skills that Cursor uses automatically based on context:

* Ask a question that needs current information and Cursor will search the web
* Paste a URL and ask Cursor to read it — it will extract the content
* Ask for exhaustive research on a topic and Cursor will run a deep research task
* Give Cursor a list of companies and ask it to find their CEOs — it will use data enrichment

## Learn More

* [Parallel CLI documentation](/integrations/cli) for full command reference
* [Agent Skills](/integrations/agent-skills) for other coding agents (Cline, Copilot, Windsurf, etc.)
* [Claude Code](/integrations/claude-code-marketplace) for the Claude Code plugin

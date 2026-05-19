> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenCode Plugin

> Add Parallel web search and content extraction to OpenCode

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

The Parallel plugin for [OpenCode](https://opencode.ai) adds `parallel-search` and `parallel-fetch` tools to your coding agent. Once configured, any requests to search the web or fetch a webpage will automatically use Parallel.

**Why use Parallel tools?**

* More accurate and relevant search results
* Intelligent content extraction that understands page structure
* Extended excerpts optimized for LLM context windows
* Faster and more reliable than built-in alternatives

## Setup

<Steps>
  <Step title="Add the plugin to your OpenCode config">
    Add `@parallel-web/opencode-plugin` to the `plugin` array in your OpenCode configuration file:

    ```json theme={"system"}
    {
      "$schema": "https://opencode.ai/config.json",
      "plugin": ["@parallel-web/opencode-plugin"]
    }
    ```
  </Step>

  <Step title="Authenticate">
    Choose one of the following authentication methods:

    **Option A: Parallel CLI login (recommended)**

    1. Run `opencode auth login`
    2. Select **"Parallel"** then **"Login with Parallel CLI"** or **"Input API key from platform.parallel.ai"**
    3. Complete authorization in your browser

    **Option B: Environment variable**

    ```bash theme={"system"}
    export PARALLEL_API_KEY=your_api_key
    ```

    Get your API key at [platform.parallel.ai](https://platform.parallel.ai).
  </Step>
</Steps>

## Tools

Once configured, OpenCode gains two Parallel-powered tools:

| Tool              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `parallel-search` | Web search with high-quality, LLM-optimized results |
| `parallel-fetch`  | Intelligent content extraction from any URL         |

Any subsequent requests to search the web or fetch a webpage will automatically use these tools.

## Learn more

* [Developer Tools overview](/integrations/developer-quickstart) for all integration options
* [Agent Skills](/integrations/agent-skills) for other coding agents (Cursor, Cline, Copilot, etc.)
* [Claude Code Plugin](/integrations/claude-code-marketplace) for the Claude Code integration

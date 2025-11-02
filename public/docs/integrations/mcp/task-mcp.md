# Task MCP

> Learn about the Task MCP and how to use it

The Task MCP Server provides two core capabilities: deep research tasks that generate comprehensive reports, and enrichment tasks that transform existing datasets with web intelligence. Built on the same infrastructure that powers our [Task API](/task-api/task-quickstart), it delivers the highest quality at every price point while eliminating complex integration work.

The Task MCP is comprised of the following three tools:

* **Create Deep Research Task** - Initiates a [deep research](/task-api/task-deep-research) task, returns details to view progress
* **Create Task Group** - Initiates a [task group](/task-api/group-api) to enrich multiple items in parallel.
* **Get Result** - Retrieves the results of both deep research as well as task groups in an LLM friendly format.

The Task MCP Server uses an async architecture that lets agents start research tasks and continue executing other work without blocking. This allows spawning any amount of tasks in parallel, while continuing the conversation while waiting for results. It is important to note that, due to current MCP / LLM Client limitations, the user needs to request the result tool-call in an additional turn after results are in.

The Task MCP is best used following the following process in one way or another:

1. **Choose a data source** to start with - See [Enrichment Data Sources and Destinations](#enrichment-data-sources-and-destinations)
2. **Initiate your tasks** - After you have your initial data the MCP can initiate the deep research or task group(s). See these [Use Cases](#use-cases) for inspiration.
3. **Analyze the results** - The LLM will provide a link to view the progress of the spawned work as results come in. After everything is completed, prompt the LLM to analyze the results to review the work done and answer your questions.

## Enrichment Data Sources and Destinations

The task group tool can be used directly from LLM memory, but is often used in combination with a data source. We've identified the following data sources that work well with the Task Group tool:

* **Upload Tabular Files** - You can use the Task MCP with Excel sheets or CSVs you can upload. Some LLM clients (such as ChatGPT) may allow uploading Excel or CSV files and working with them. Availability differs per client.
* **Connect with databases** - There are several MCPs available that allow your LLM to retrieve data from your database. For example, [Supabase MCP](https://supabase.com/docs/guides/getting-started/mcp) and [Neon MCP](https://neon.com/docs/ai/neon-mcp-server).
* **Connect with documents** - Documents may contain vital initial information to start a task group [Notion MCP](https://developers.notion.com/docs/mcp), [Linear MCP](https://linear.app/docs/mcp)
* **Connect with web search data** - [Parallel WebTools MCP](/integrations/mcp/getting-started) or other WebTools MCPs or features can be used to get an initial list of items, which is often a great starting point for a Task Group.

## Use Cases

We see two main use-cases for the Task MCP. On the one hand it makes Parallel APIs accessible for anyone requiring more reliable and deeper research or enrichment without any coding skills, lowering the barrier to using our product significantly. On the other hand, it's a great tool for developers to get to know our product by experimenting with different use-cases, seeing output quality for different configurations before writing a single line of code.

Below are some examples of using the Task MCP (sometimes in combination with the WebTools MCP and/or other MCPs) for both of these use-cases.

A) Day to day data enrichment and research:

* [Sentiment analysis for ecommerce products](https://claude.ai/share/4ac5f253-e636-4009-8ade-7c6b08f7a135)
* [Improving product listings for a web store](https://claude.ai/share/f4d6e523-3c7c-4354-8577-1c953952a360)
* [Fact checking](https://claude.ai/share/9ec971ec-89dd-4d68-8515-2f037b88db38)
* [Deep research every major MCP client creating a Matrix of the results](https://claude.ai/share/0841e031-a8c4-408d-9201-e1b8a77ff6c9)
* [Reddit Sentiment analysis](https://claude.ai/share/39d98320-fc3e-4bbb-b4d5-da67abac44f2)

B) Assisting development with Parallel APIs:

* [Comparing the output quality between 2 processors](https://claude.ai/share/f4d6e523-3c7c-4354-8577-1c953952a360)
* [Testing and iterating on entity resolution for social media profiles](https://claude.ai/share/198db715-b0dd-4325-9e2a-1dfab531ba41)
* [Performing 100 deep researches and analyzing results quality](https://claude.ai/share/39d98320-fc3e-4bbb-b4d5-da67abac44f2)

This is just the tip of the iceberg, and we are still uncovering what's possible and truly useful for the Task MCP. Please share your most compelling use-cases with us to grow this list of examples and inspire others!

## Best Practices

### Chose enabled MCPs carefully

Be careful which tools and features you have enabled in your MCP client. When using Parallel in combination with many other tools, the increased context window may cause a degradation in output quality. Additionally, the LLM may prefer standard web search or deep research over Parallel if it has both enabled, so it is recommended to turn off other web or deep-research tools, or explicitly mention you want to use Parallel MCPs.

### Ensure to limit data source context size

The task MCP can be a powerful tool for doing batch deep research, but it is still constrained by the size of the context window and max output tokens of the used LLM. Design your prompts and tool calls in a way that they do not overflow either of these limitations, or you may experience failure, degraded performance, or lower output quality. If you want to use Parallel with large datasets, it is recommended to use the API or other no-code integrations. The Task MCP is designed for smaller parallel tasks and experimentation, and only works with smaller datasets.

### Ensure to follow up

Currently, the Task MCP only allows initiating Deep Research and Task Groups, it does not wait for these tasks to complete. The status and/or results can be fetched using a follow up tool call by the user after research is complete. The asynchronous nature of the Task MCP allows initiating several deep researches and task groups without overflowing the context window. To perform multiple tasks or batches in a workflow, you need to reply each time to verify the task is complete and initiate the next step. We are working on improving this.

### Use with larger models only

While our WebTools MCP is designed to work well with smaller models as well (such as GPT OSS 20B), our Task MCP requires strong reasoninig capability when using it's tools, so it is recommended for use with larger models only (such as GPT-5 or Claude Sonnet 4.5). Smaller models may result in degraded output quality.

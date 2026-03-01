> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Zapier

> Use Parallel in Zapier workflows

Integrate Parallel's AI-powered web research into your Zapier workflows with our official app.

## Installation

Search for "Parallel Web Systems" when adding a step to your Zap,
or use [this link](https://zapier.com/apps/parallel-web-systems/integrations) to get started.

<Note>Version 1.1.0 and later supports OAuth.</Note>

## Available Actions

| Name                            | Key                        | Description                             | Use Cases                                                    |
| ------------------------------- | -------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| **Create Async Web Enrichment** | `async_web_enrichment`     | Create an asynchronous Task Run.        | Lead enrichment, competitive analysis, content research      |
| **Fetch Result for Async Runs** | `process_async_completion` | Retrieve results for an async Task Run. | Complex multi-source research, deep competitive intelligence |

## Common Use Cases

* **Sales**: Lead scoring, account research, contact discovery
* **Marketing**: Content research, trend analysis, competitor monitoring
* **Operations**: Vendor research, risk assessment, due diligence
* **Support**: Real-time information lookup, documentation generation

For detailed configuration and advanced features, see the [Task API quickstart](../task-api/task-quickstart).

## Best Practices

* **Use webhooks**: Let your workflow continue automatically when results are ready, without continuously polling.
* **Choose processors appropriately**: Use the right processors for your workflow to ensure the best results.
  For more information on choosing processors, see our [guide](/task-api/guides/choose-a-processor).

## Migration Guide

If you're already using Parallel version 1.0.3 or earlier with Zapier, you can easily migrate to the latest version.

1. Open any existing Zap and click `Edit Zap`.
2. In `Setup`, click `Change` under `Account`, then reconnect or create a new account.
3. Update the account connection for all Zaps that use Parallel.

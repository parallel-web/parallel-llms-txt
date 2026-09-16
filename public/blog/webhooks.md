# Webhooks for the Parallel Task API

Get notified when Tasks complete with webhooks

Starting today, webhooks are available for all Task Runs on the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) - including [Deep Research](https://parallel.ai/blog/introducing-parallel). Get notified when your tasks complete instead of continuously checking their status.

## **Create tasks, receive results when ready**

When you're orchestrating hundreds or thousands of web research tasks, webhooks push real-time notifications to your endpoint as tasks complete - eliminating the need for constant polling. This is especially valuable for long-running or research-intensive tasks.

Common use cases include:

- **Data enrichment:** Enriching thousands of entities in your database
- **Deep research:** Running complex, research-intensive queries that can take 10-30 minutes
- **Chained workflows:** Building workflows where one task's output triggers the next
- **Batch processing:** Managing any system that creates many tasks at once



With webhooks - your orchestration code stays clean, error handling becomes straightforward, and results naturally flow into your existing queue-based architectures.

## **Adding webhooks to your API calls**

Setting up webhooks requires minimal changes to your existing integration. Simply include a webhook configuration alongside your task specification:

```sh
curl --request POST \
  --url https://api.parallel.ai/v1/tasks/runs \
  --header "Content-Type: application/json" \
  --header "x-api-key: $PARALLEL_API_KEY" \
  --data '{
    "task_spec": {
      "output_schema": "Find the GDP of the specified country and year"
    },
    "input": "France (2023)",
    "processor": "core",
    "webhook": {
      "url": "https://your-domain.com/webhooks/parallel",
      "event_types": ["task_run.status"]
    }
  }'

```

When your task completes, we POST the full result to your endpoint.

For security, webhooks follow [standard conventions](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md) including signature verification. You can manage your webhook secret keys in [Settings->Webhooks](https://platform.parallel.ai/settings?tab=webhook) on our Developer Platform.

## **Start using webhooks today**

Webhooks are available today for all Task API processors. Get started with our [documentation](https://docs.parallel.ai/task-api/features/webhooks).

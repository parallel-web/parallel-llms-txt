> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits

> Default API rate limits for Search, Extract, Tasks, Chat, FindAll, and Monitor endpoints

The following table shows the default rate limits for each Parallel API product:

| Product          | Default Quota | What Counts as a Request                                                                     |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------- |
| Search           | 600 per min   | Each POST to `/v1beta/search`                                                                |
| Extract          | 600 per min   | Each POST to `/v1beta/extract`                                                               |
| Tasks/TaskGroups | 2,000 per min | Each POST to `/v1/tasks/runs` or `/v1beta/tasks/groups/{taskgroup_id}/runs` (creating tasks) |
| Chat             | 300 per min   | Each POST to `/v1beta/chat/completions`                                                      |
| FindAll          | 300 per hour  | Each POST to `/v1beta/findall/runs` (creating a generator)                                   |
| Monitor          | 300 per min   | Each POST to `/v1alpha/monitors`                                                             |

<Note>
  **Rate limits apply to POST requests that create new resources.** GET requests
  (retrieving results, checking status) do not count against these limits. For
  example, polling a task's status with `GET /v1/tasks/runs/{run_id}` does not
  consume your Tasks rate limit—only creating new tasks does.
</Note>

## Pricing

Rate limits are separate from pricing. For cost information, see [Pricing](https://parallel.ai/pricing).

## Need Higher Limits?

If you need to expand your rate limits, please contact **[support@parallel.ai](mailto:support@parallel.ai)** with your use case and requirements.

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Supabase

> Enrich your Supabase data with live web intelligence using Edge Functions and Parallel

Enrich your Supabase data with live web intelligence using [Supabase Edge Functions](https://supabase.com/docs/guides/functions) and Parallel's Task API.

<Tip>
  Check out the [Parallel integration on Supabase](https://supabase.com/partners/integrations/parallel) for more information.
</Tip>

## Getting Started

We provide a complete cookbook with Supabase Edge Functions, a Next.js frontend, and step-by-step setup instructions.

<Card title="Supabase + Parallel Cookbook" icon="github" href="https://github.com/parallel-web/parallel-cookbook/tree/main/typescript-recipes/parallel-supabase-enrichment">
  Complete working example showing how to build a data enrichment pipeline with Supabase and Parallel.
</Card>

The cookbook includes:

* **Supabase Edge Functions** that call Parallel's Task API
* **Next.js frontend** with live updates via Supabase Realtime
* **SQL schemas** for storing enrichment data
* **Polling pattern** for handling long-running enrichments

## Example Usage

The Edge Function uses the `parallel-web` SDK to call Parallel's Task API:

```typescript  theme={"system"}
import Parallel from "npm:parallel-web@0.2.4";

const parallel = new Parallel({ apiKey: Deno.env.get("PARALLEL_API_KEY") });

const taskRun = await parallel.taskRun.create({
  input: {
    company_name: "Stripe",
    website: "stripe.com",
  },
  processor: "base-fast",
  task_spec: {
    output_schema: {
      type: "json",
      json_schema: {
        type: "object",
        properties: {
          industry: { type: "string" },
          employee_count: { type: "string" },
          headquarters: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
});

const result = await parallel.taskRun.result(taskRun.run_id, { timeout: 30 });
```

For detailed configuration and advanced features, see the [Task API Quickstart](/task-api/task-quickstart).

**Links:**

* [Supabase + Parallel Cookbook](https://github.com/parallel-web/parallel-cookbook/tree/main/typescript-recipes/parallel-supabase-enrichment)
* [Parallel on Supabase Integrations](https://supabase.com/partners/integrations/parallel)
* [parallel-web npm package](https://www.npmjs.com/package/parallel-web)

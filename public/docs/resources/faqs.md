> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQs

> Frequently asked questions about Parallel APIs, billing, security, and platform features

## Platform

<Accordion title="Where do I get an API key?">
  A default API key is generated when you signup to
  [Platform](https://platform.parallel.ai). You can create and manage keys via
  Settings.
</Accordion>

<Accordion title="How can I track usage and costs?">
  Go to **Platform > Usage** for real-time request counts, and spend.
</Accordion>

<Accordion title="How do I add teammates?">
  Owners can invite users under **Settings** in
  [Platform](https://platform.parallel.ai). Choose "Admin" or "Member" roles.
</Accordion>

<Accordion title="Can I use Parallel for commercial use?">
  Subject to our [Terms of Service](https://www.parallel.ai/customer-terms) -
  you own the output you create with Parallel, including the right to reprint,
  sell, and merchandise.
</Accordion>

## APIs

<Accordion title="Can I chain several Tasks together in the Task API?">
  Yes -- Task Run Results from one execution can map to Task Run Input fields in
  another execution. For example, in one Task Run, you can identify the address
  of a business using a simple processor. Then, in the next Task Run you
  identify additional details about the business, given business name and
  address.
</Accordion>

<Accordion title="Can I limit my query to specific sources only?">
  Yes, you can do this with [Source Policy](/search/source-policy). This is
  available for the Task API and the Search API today.
</Accordion>

<Accordion title="Can Parallel fetch data that sits behind a login?">
  Parallel is focused on reasoning and retrieval over the public web. For now,
  we only access what can be reached on the public web without authentication
  (e.g. signing in with credentials).
</Accordion>

<Accordion title="Is Parallel multi‑modal?">
  Our strength is reasoning and retrieval over text. We can recognize some
  on‑page images (e.g. detect customer logos), but we don't accept images as
  inputs or return them as outputs yet.
</Accordion>

<Accordion title="Are there rate limits?">
  | **API**   | **Default Rate Limit** |
  | --------- | ---------------------- |
  | Tasks     | 2000 per min           |
  | Web Tools | 600 per min            |
  | Chat      | 300 per min            |
  | FindAll   | 300 per hour           |
  | Monitor   | 300 per min            |
</Accordion>

<Accordion title="How recent is the web research you provide?">
  With the Task API, our web research is up to date to the current day. We are
  able to access live web links at the time of your query to ensure data is as
  real time as possible. For lower end processors in the Search API and Chat
  API, our systems prioritize reduced latency over freshness.
</Accordion>

<Accordion title="Can you include data from internal sources as part of your search?">
  Parallel focuses on public web information. You can pass private data into a
  task as an input variable or post‑process the output on your side, but we
  don't pull it natively.
</Accordion>

## Billing & Payments

<Accordion title="How is pricing calculated?">
  Parallel Processors incorporate usage-based pricing. All pricing details for
  API and Processor are available [here](https://parallel.ai/pricing).
</Accordion>

## Security & Compliance

<Accordion title="Are you SOC-II compliant?">
  Yes. Parallel is SOC-II Type 1 and Type II certified as of April 2025. Email
  us at [partnerships@parallel.ai](mailto:partnerships@parallel.ai) to request
  access to our full report in Trust Center.
</Accordion>

<Accordion title="Where is Parallel data stored?">
  All data is encrypted in transit (TLS 1.2+) and at rest in US-based data
  centers.
</Accordion>

<Accordion title="Do you access or store my private data?">
  No. Parallel focuses on public web information. You can pass private data into
  a task as an input variable or post‑process the output on your side, but we
  don't pull it natively. In the future we plan on building tools that will
  allow you to more easily point Parallel to your own sources.
</Accordion>

<Accordion title="Can I run Parallel inside my VPC?">
  Private‑cloud and on‑prem options are available for qualified enterprise
  customers—ask our team at
  [partnerships@parallel.ai](mailto:partnerships@parallel.ai).
</Accordion>

<Accordion title="Will you train models on my data?">
  Never. Inputs and outputs remain yours. We do not use customer data to train
  any models. See our [Terms of Service](https://www.parallel.ai/customer-terms)
  for details.
</Accordion>

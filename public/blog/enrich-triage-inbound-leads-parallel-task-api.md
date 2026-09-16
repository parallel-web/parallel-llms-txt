# How we enrich & triage inbound leads using the Parallel Task API



![](https://cdn.sanity.io/images/5hzduz3y/production/d758bf1ea34f13083edcf0ca18caf53706c90843-1700x716.gif)

As a small go-to-market team, we want to spend less time on repetitive lead research and more time with people who are likely to benefit from Parallel.

Recently, we started using our own Task API to enrich and triage every inbound before a person decides on the best response. It gives us the baseline context we would otherwise have to look up manually: what the company does, how large it is, whether it appears to be a priority account, and why.

![](https://cdn.sanity.io/images/5hzduz3y/production/313923f82490199ed13e12e9cea850fe93bd2a96-2880x1440.png)

## What the Task API does for a lead

The [Parallel Task API](https://parallel.ai/products/task) turns open-ended research tasks into structured, repeatable workflows by combining AI inference with web search and live crawling. For lead enrichment, that means you can send the fields from a contact form and get back a structured response: company description, funding raised, a tier label that maps to your sales motion, and any other field that would help your team route and follow up with the lead.

To make that work, you define the shape of the output up front: which fields should be returned, what type each field should be, and how the model should interpret them. You can then pair that structured output with lightweight business logic that decides what action should be taken with the lead based on that information.

For example, you might ask the Task API to classify a lead as “Strategic Enterprise,” “AI-Native,” “Mid-Market,” then use that value to route the lead, update your CRM, and customize the right first-touch email. Normally, this kind of research is repetitive and time-consuming, even for experienced SDRs. The Task API can perform this in under a minute.

## How it fits into our stack

For the lead submitting your form, nothing changes. They hit submit and get an instant confirmation. The Task API call happens in the background while they are still reading your “thanks, we’ll be in touch” page. By the time someone on your team looks at the lead, the research is done, the CRM is updated, and the first response is on its way.

We make that happen with five components, many of which may already be part of your pipeline:

- **Next.js on **[**Vercel**](https://vercel.com/) hosts the contact form and serverless routes
  - `/api/contact` for form intake
  - `/api/task-webhook` for the Task API callback
  - `/api/qualify` for inline classification when we want to stream progress directly to the form.
- **The Parallel Task API** does the research and returns the structured classification.
- [`**Attio**`](https://attio.com/) is our CRM and system of record. Every inbound request creates or updates a person and company record before the Task API call returns.
- **Slack** is where the inbound leads are routed, so an AE sees the enriched lead with the model’s reasoning attached.

[**Resend**](https://resend.com/)** and **[**Cal.com**](https://cal.com/)[ ](https://cal.com/)handle the first-touch email, with copy varying by tier and a booking link for priority leads.

The whole workflow is webhook-driven so the form submission can return immediately. Here is what happens step by step:

1. A lead submits your contact form. The form route creates a person and company record in Attio, captures the Attio Person ID, and returns success to the user.
2. The same route POSTs to the Task API with the form fields as input, your output schema, and a webhook URL pointing to /api/task-webhook. The Attio Person ID is passed through metadata, which the Task API returns unchanged when the run completes.
3. When the run completes, the Task API posts to /api/task-webhook. The handler fetches the full result, including the basis array with per-field reasoning and citations, then updates Attio, sends the Slack alert, and triggers the tier-aware Resend email.
4. By the time anyone reads the Slack alert, the lead has been classified, the first email has gone out, and Attio is up to date. The alert links back to the Attio record, the Task run page, and the lead’s LinkedIn profile.

The same workflow works for any inbound channel. As the classification rules evolve, we update one definition, and every channel inherits the change.

![](https://cdn.sanity.io/images/5hzduz3y/production/caf91d5e194d5be3cddd6d4d86ddc70df97ad4f6-1920x2380.png)

## Output schema as the contract

The Task API output schema is a JSON definition that lists every field you want the Task API to return, the type of data each field should contain, and the instructions the model should follow when populating it.

For lead routing, two parts matter most: the first is the tier itself, defined as a list of allowed values with a description that defines the criteria for each one. Because the classification field is constrained to a fixed enum, downstream systems can rely on a predictable set of tier values instead of handling arbitrary labels.

The second is your enrichment fields: company description, headcount, funding, or anything else you want returned with the classification. In our workflow, we show those fields in Slack so an AE can see “Series B AI-native, 80 employees, $40M raised” without leaving Slack. You could also route on those fields directly.

A minimal version looks like this:

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "classification": {
      "type": "string",
      "enum": ["Strategic Enterprise", "AI-Native", "Mid-Market", "Disqualified"],
      "description": "Strategic Enterprise: public companies in financial services, consulting, or insurance with >5,000 employees. AI-Native: seed-to-Series-B startups building AI-first products. Mid-Market: everything else with a clear commercial use case. Disqualified: students, job seekers, competitors."
    },
    "simple_company_description": { "type": "string" },
    "employee_count": { "type": "integer" },
    "amount_raised": { "type": "string" },
    "company_website_url": { "type": "string" },
    "linkedin_url": { "type": "string" }
  },
  "required": ["classification", "simple_company_description"]
}

```

## Try it yourself

The workflow above is our production system. For a simpler starting point, the prompt below builds just the classification piece as a self-contained Python CLI.

Paste it into Claude Code, Cursor, or your coding agent of choice. It uses Parallel’s agent onboarding to guide setup and authentication.

The generated tool runs in two phases. First, an interactive setup asks about your tiers, criteria, input fields, and enrichment fields, then saves a config. After that, you can classify one lead from CLI flags, or classify a batch from CSV/JSONL. Results are streamed, written to disk, and linked back to the Task run so you can audit the reasoning.

The README also explains how to extend the CLI into the full inbound-routing system: wrap it in serverless routes, pass a CRM record ID through metadata, and fan out from the webhook to your CRM, Slack, and email tool.

If you try this on your own pipeline, we would love to hear how it goes: what you put in your schema, what your tiers look like, and what broke. Reach out at [https://contact.parallel.ai/](https://contact.parallel.ai/).

```json
Build me a single-file Python CLI that classifies inbound leads using the Parallel Task API. Use curl to read parallel.ai/agents.md and perform the setup to install Parallel. The tool should run in two phases.
Phase 1 — first-run setup (interactive). When the script is run with no config present, or with a --reconfigure flag, interview me at the terminal:
Ask how many lead tiers I want and what to name each (e.g., "Strategic Enterprise", "AI-Native", "Mid-Market", "Disqualified").
For each tier, ask me to describe the criteria in plain English (e.g., "Public companies in financial services with >5,000 employees" or "Seed-to-Series-B AI-native startups with a technical founder"). These descriptions become field-level instructions in the Task spec so the model has the routing rules baked in.
Ask which enrichment fields to return alongside the tier. Default set: simple_company_description, employee_count, amount_raised, company_website_url, linkedin_url. Let me add or remove, and let me set the type and description for each.
Ask which form fields will be passed in at classification time. Defaults: name, email, domain, job_title, use_case.
Save the resulting config (tiers, criteria, enrichment fields, input fields) to lead_classifier_config.json in the working directory.
Phase 2 — classify leads. On every subsequent run:
Load lead_classifier_config.json.
Accept input in two modes: Single lead: form fields as CLI flags (--name, --email, --domain, ...) or a JSON object piped to stdin. Batch: --input leads.csv or --input leads.jsonl, where each row is one lead's form fields.
Build a Parallel Task spec from the config:
processor: "core"
task_spec.output_schema is a JSON schema with additionalProperties: false. The classification property is a string enum constrained to my tier names, and its description enumerates the tier criteria so the model picks the right one. Each enrichment field is included with its type and user-supplied description.
input is each lead's form fields as a JSON object (the SDK accepts dict directly).
Pass each lead's email (and optionally a CRM record ID) through metadata — Parallel returns it unchanged in the result, so a webhook handler can route back to the record without a database lookup.
Stream results via the Task Group SSE endpoint (GET /v1/tasks/groups/{taskgroup_id}/events):
Create a Task Group, then create one Task Run per lead inside the group.
Consume events with client.task_group.events(taskgroup_id).
Handle three event types: task_group_status (update a progress bar — task_run_status_counts gives queued/running/completed/failed counts), task_run.state (a run finished — render its result), and error (log and continue).
For each task_run.state event with event.run.status == "completed", render the lead's classification + enriched fields + per-field basis reasoning + citations.
Pass last_event_id on reconnect so the stream resumes cleanly if the connection drops.
Use this same code path for the single-lead case — just a group of one.
Output formatting. Use rich (with a plain-text fallback if it isn't installed):
A live progress bar at the top showing queued/running/completed/failed counts from task_group_status.
As each run completes, append a panel: tier name in a colored header, a table of enrichment fields, and a collapsible section with each field's basis.reasoning and basis.citations[].url.
At the end, print the Task run URL for each lead so I can audit the run, and write the raw JSON results to runs/<group_id>/<run_id>.json.
Constraints:
Single Python file. Standard library + parallel-web + rich only.
Read PARALLEL_API_KEY from env. Fail loudly with a clear message if missing.
Handle SSE disconnects with one automatic resume using last_event_id. Surface terminal failures (failed, cancelled) with the error message from the run.
Include a --dry-run flag that prints the generated Task spec and the parsed input rows without submitting.
Then, write a README.md that documents:
How to install and run the CLI (single lead and batch CSV).
How to extend it into the full inbound-routing system described in Enrich and triage inbound leads using the Parallel Task API: wrap the classifier in serverless routes (/api/contact for form intake, /api/task-webhook for the async result), pass a CRM record ID through the Task metadata field so the webhook can reconnect to the record without a database lookup, and fan out from the webhook to your CRM, Slack, and email tool. Note that the Task spec is portable: the same call works for contact-form submissions, PLG signups, and any other inbound channel — and that the Task Group + SSE pattern in this script is what you'd use to reclassify a backlog of historical signups in one go.
Generate the script, the config wizard, and the README now.
```

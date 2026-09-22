# How to use Grok Bot for competitive research

Connect Parallel to Grok Bot, build a sourced competitor comparison, and turn a reviewed research process into a weekly routine.

You can use Grok Bot and the Parallel plugin to research competitors, compare their products, and prepare a brief with links to the evidence. Start with a defined question, connect Parallel through the plugin marketplace, and ask your Bot to collect current sources before it draws conclusions.

A useful first assignment is a comparison of three competitors’ pricing and product changes. You can review that report, save the process as a skill, and schedule a weekly update.

This guide covers Grok Bot, the persistent agent product, with setup details checked on September 22, 2026. You’ll use the plugin interface in Grok Bot; we include the separate Cursor installation commands below.

## Set the scope of your competitive research

Give your Bot a decision to support. “Research our competitors” leaves it to choose the companies, time period, and level of detail. You’ll get a more useful report if you supply those inputs.

For example, you might need to decide whether to change your pricing page after a competitor launches a new plan. Ask for the plan’s billing terms, usage limits, and target customer, then compare those details with your own offer.

Use this brief to start:

> Research [Competitor A], [Competitor B], and [Competitor C] for our product marketing team. We sell [product] to [customer type]. Compare public pricing, core capabilities, and product releases from the past 30 days. Prioritize official pricing pages, documentation, and changelogs. Include a source URL for each factual claim. Separate facts from your interpretation, and label information you cannot verify.

Keep the first run small enough to check. Three companies and a few comparison fields will expose gaps in the instructions before you schedule a larger job.

## Connect Parallel in Grok Bot

Grok Bot gives your agents a persistent computer and access to connected services. Our [Parallel plugin](https://cursor.com/marketplace/parallel) provides web search, page extraction, deep research, and data enrichment through the Parallel CLI.

Follow Grok Bot’s [plugin connection flow](https://cursor.com/help/grok-bot/connect-plugins):

1. Open **Plugins** in the sidebar, or use an in-chat **Connect** card. On mobile, open your avatar menu and select **Plugins**.
2. Search for **Parallel** and add the plugin.
3. Complete the setup and authentication steps the plugin presents.
4. Confirm that Parallel appears in your installed plugins, then ask your Bot to check its connection.

The Parallel package needs an installed, authenticated CLI. Ask your Bot to follow the plugin’s setup instructions and report whether it can run a search. Complete any sign-in through the provided authentication flow. If your team disables the plugin, ask your Cursor team admin to enable it.

### Installing from Cursor

If you’re working in Cursor, our [installation guide](https://docs.parallel.ai/integrations/cursor-marketplace) documents these two chat commands. Run them one at a time:

`/add-plugin parallel`

`/parallel-setup`

Use Grok Bot’s plugin connection flow for the Bot setup. The commands above describe installation in Cursor.

### Check the connection with a narrow task

Before requesting a report, send:

> Use Parallel to find [Competitor A]’s official pricing page. Read the page and return its URL, public plan names, and billing terms. Mark custom pricing as “contact sales.” Tell me if you cannot access the source.

Check the result against the pricing page. If the Bot cannot retrieve it, resolve the connection or source-access problem before continuing.

## Build a comparison you can audit

Ask for a row for each material finding. A table makes it easier to spot an unsupported claim than a long narrative does.

| Field | What to request |
| --- | --- |
| Competitor | Company and product name |
| Finding | One factual claim about a plan, capability, or release |
| Evidence | Source URL and a short supporting excerpt |
| Dates | Source publication date, if available, and date checked |
| Status | Confirmed, conflicting, or not found |
| Implication | The Bot’s interpretation, kept separate from the fact |

Publication date and date checked answer different questions. You might read a pricing page today without knowing when the vendor changed it. Ask the Bot to preserve that uncertainty.

A focused research prompt:

> Use Parallel to compare the three competitors in our brief. Find each company’s official pricing page, product documentation, and changelog. Extract the evidence needed for our comparison. Return a table with competitor, finding, evidence URL, supporting excerpt, source date, date checked, verification status, and implication. For pricing, include currency, billing interval, usage allowance, and whether the price requires an annual commitment. If sources conflict, show both claims and explain which source you used.

For product capabilities, ask the Bot to distinguish a launch announcement from documentation that confirms availability. A preview announcement doesn’t establish that a customer can use the feature in production.

## Choose search, extraction, or deep research

You can ask for the operation you need in natural language. In Cursor, the Parallel plugin also exposes these [commands](https://docs.parallel.ai/integrations/cursor-marketplace):

| Operation | Use it for | Cursor command |
| --- | --- | --- |
| Search | Find relevant pages and answer a focused question | /parallel-search <query> |
| Extract | Read a known pricing, documentation, or changelog URL | /parallel-extract <url> |
| Deep research | Investigate a question across multiple sources in depth | /parallel-research <topic> |
| Enrichment | Add web-sourced fields to a company list | /parallel-enrich <data> |

Start with search for a pricing check or product lookup. Request deep research for a broader assignment, such as comparing how several vendors serve enterprise buyers. The plugin’s deep research skill uses more time and costs more than a standard search, so reserve it for work that needs the extra investigation.

For example:

> Use Parallel for deep research on how [Competitor A] and [Competitor B] position their enterprise plans. Compare deployment options, support terms, security documentation, and public customer examples. Cite primary sources and flag anything that requires a sales conversation to confirm.

## Review the first report

Open the sources behind the findings that could change a decision. Check the exact price, billing period, and feature availability. A citation helps you locate evidence; you still need to confirm that the evidence supports the claim.

Watch for a few recurring mistakes:

- A Bot compares annual-commitment pricing with month-to-month pricing.
- It treats a missing feature mention as proof that the feature doesn’t exist.
- It presents a vendor’s performance claim as an independent measurement.
- It interprets a new customer logo as a dated contract announcement.

Correct the report and ask the Bot to incorporate those corrections into its research instructions. If you use internal win/loss notes, identify them as internal sources. Readers can then distinguish customer feedback from public evidence.

## Turn the report into a weekly routine

Once you’ve reviewed the first run, ask Grok Bot to save the process as a skill. Then create a routine with an owner, schedule, time zone, and destination. Grok Bot’s [skills and routines documentation](https://docs.x.ai/grok-bot/skills-routines-and-automations) describes how to save the instructions, create a schedule, and inspect runs.

Use this prompt after you’ve approved the method:

> Save our reviewed competitive-research process as a skill. Keep the competitor list, comparison fields, source requirements, and corrections. Every Monday at 9:00 a.m. America/Los_Angeles, use that skill to check the same sources. Compare the results with the previous dated report. Return changes and unresolved questions in this conversation, with evidence links. If a source fails, flag the gap. Keep the previous report so we can compare versions.

Use **Test run** and review the result before relying on the schedule. For the first run, have the Bot create a baseline. On later runs, it should distinguish a confirmed change from a fact it has found for the first time.

For example, if the Bot discovers a security certification today, it should report “first observed in this run” unless it finds evidence of the announcement date. That prevents old information from appearing as a new competitive move.

You can keep reports in the conversation or connect a destination such as Notion. Specify the page or database and the write action you want. Our [Grok Bot plugin guide](https://parallel.ai/articles/best-grok-bot-plugins) covers the tools for collecting internal context and organizing the output.

For a custom application with programmatic monitoring and event handling, see our guide to [automating competitive intelligence with APIs and AI agents](https://parallel.ai/articles/how-to-automate-competitive-intelligence-with-apis-and-ai-agents).

Start by [adding Parallel](https://cursor.com/marketplace/parallel) and running one pricing comparison you can verify against its sources.

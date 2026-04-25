Human Machine

# \# How to build an AI lead generation pipeline using live web data

Most AI lead generation tools promise automation but deliver disappointment. The pitch sounds compelling: an AI that finds, qualifies, and routes leads while you sleep. The reality? A thin LLM wrapper sitting on top of the same stale contact databases that powered outbound sales a decade ago.

Tags: Guides

Reading time: 14 min

The bottleneck isn't intelligence. It's data. Apollo, Clearbit, and similar vendors refresh their records on quarterly cycles. Job changes, funding rounds, and leadership hires can take weeks to appear. By the time your "AI-powered" tool surfaces a lead, three competitors have already reached out.

Real AI lead generation requires live access to the open web. An agent that can discover companies from today's press releases, extract context from a pricing page updated this morning, and trigger outreach the moment a target raises funding. This infrastructure layer is what separates tools that work from tools that frustrate.

Below, you'll learn the three-phase framework (discover, enrich, monitor), the APIs that power each phase, and what a working pipeline looks like in practice.

## \## Key takeaways

* \- AI lead generation works best when it runs on live web data rather than static contact databases
* \- The most durable pipelines combine three phases: discovery, enrichment, and monitoring, each automatable with the right APIs
* \- Natural language queries let AI agents find leads that match behavioral and firmographic signals, not just job titles
* \- Trigger-based workflows built on web monitoring enable continuous lead generation without manual research
* \- Teams that build their own infrastructure own their data, their schema, and their competitive edge

## \## What AI lead generation actually means (and what it doesn't)

AI lead generation is the use of [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) [[AI agents] (/articles/what-is-an-ai-agent)](/ai/articles/what-is-an-ai-agent) to automate the discovery, qualification, enrichment, and monitoring of potential customers. The key word is _\_ automate \__ . Not assist. Not accelerate. Fully automate, end to end.

This excludes most products marketed as "AI-powered lead generation." Auto-sending cold emails isn't AI lead generation. Scoring leads inside a CRM based on engagement history isn't either. Adding a chatbot to your website captures demand; it doesn't generate it. Research shows [58% of sales teams now use AI for prospect research](https://sopro.io/resources/blog/ai-sales-and-marketing-statistics/) [[58% of sales teams now use AI for prospect research] (https://sopro.io/resources/blog/ai-sales-and-marketing-statistics/)](https://sopro.io/resources/blog/ai-sales-and-marketing-statistics/) , but most still rely on static data sources that limit what AI can actually do.

A genuine AI lead generation pipeline covers three phases:

**\*\* 1\. Discovery \*\*** finds net-new leads matching a target profile. This requires semantic search and entity-finding capabilities that go beyond filtering a static list by industry and headcount.

**\*\* 2\. Enrichment \*\*** fills in company and contact data from authoritative sources. Real-time extraction from company websites delivers fields no database vendor offers: current pricing models, open headcount by department, recent product launches.

**\*\* 3\. Monitoring \*\*** tracks signals that indicate a lead is ready to act. Funding announcements, leadership changes, hiring spikes. When a qualifying event fires, the pipeline triggers enrichment and routes the lead to sales.

Each phase has a corresponding infrastructure need. Discovery needs search and entity-finding APIs. Enrichment needs structured extraction. Monitoring needs change detection across the open web. SaaS tools handle phases one and two adequately for simple ICPs, but phase three and custom enrichment schemas require API-level access.

## \## Phase 1: Discovering leads with natural language queries

Your discovery process determines everything downstream. The quality of your queries sets the ceiling for the pipeline's output.

### \### Moving beyond ICP filters to intent-based discovery

Traditional prospecting works by filtering: industry, headcount, location, and job title. Pull a list from Apollo or LinkedIn Sales Navigator, export to CSV, and start sequencing.

The problem: every competitor runs the same filters. You all reach out to the same VP of Sales at the same 500 companies.

Natural language discovery changes the query itself. Instead of selecting from predefined filters, you describe what you're looking for:

_\_ ``` "Find all Series B SaaS companies that recently hired a VP of Revenue Operations and are actively expanding their sales team." ``` \__

This query encodes intent, not just firmographics. A company hiring aggressively in sales represents a different conversation than one maintaining headcount. An AI agent can run this query against the live web and return structured results: company name, website, relevant signal, and contact data.

Parallel's [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [[FindAll API] (https://docs.parallel.ai/findall-api/findall-quickstart)](https://docs.parallel.ai/findall-api/findall-quickstart) handles exactly this use case. You pass a natural language description of your target entities, and the API returns a structured dataset with citations and confidence scores.

\### Python

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

import  requests

response = requests.post(
     "https://api.parallel.ai/v1beta/findall/runs" ,
    headers={ "x-api-key" :  "your-api-key" },
    json={
         "query" :  "Series B SaaS companies that hired a VP of Revenue Operations in Q1 2025 and posted 5+ sales roles in the last 60 days" ,
         "generator" :  "core" ,
         "enrichments" : [
            { "field" :  "website" ,  "type" :  "url" },
            { "field" :  "recent_funding" ,  "type" :  "text" },
            { "field" :  "sales_headcount_growth" ,  "type" :  "text" }
        ]
    }
) ```  import requests   response = requests.post( "https://api.parallel.ai/v1beta/findall/runs", headers={"x-api-key": "your-api-key"}, json={ "query": "Series B SaaS companies that hired a VP of Revenue Operations in Q1 2025 and posted 5+ sales roles in the last 60 days", "generator": "core", "enrichments": [ {"field": "website", "type": "url"}, {"field": "recent_funding", "type": "text"}, {"field": "sales_headcount_growth", "type": "text"} ] } ) ```
```

The API searches the web for matching entities, validates each candidate against your criteria, and returns structured fields with source citations.

### \### Using semantic search to prospect across the open web

Semantic search treats the entire internet as a lead database. Any company that has published relevant content, job postings, press releases, or product pages becomes discoverable.

Consider a founder building fleet management software. She wants to find logistics companies actively building AI features. No vendor database covers this with recency. The signal lives in job postings mentioning "machine learning," blog posts about automation initiatives, and press releases announcing AI partnerships.

Queries like "B2B logistics software companies expanding into the EU market" return results no static database would surface because they reflect real-time publishing activity.

Parallel's Search API handles semantic prospecting at scale:

\### Python

```
1

2

3

4

5

6

7

8

9

10

11

response = requests.post(
     "https://api.parallel.ai/v1beta/search" ,
    headers={ "x-api-key" :  "your-api-key" },
    json={
         "objective" :  "Find companies in fleet management or logistics software that are actively building AI or machine learning features" ,
         "keywords" : [ "fleet management AI" ,  "logistics automation ML" ],
         "max_results" :  50 
    }
)

 # Returns: ranked URLs, page titles, publish dates, compressed excerpts ```  response = requests.post( "https://api.parallel.ai/v1beta/search", headers={"x-api-key": "your-api-key"}, json={ "objective": "Find companies in fleet management or logistics software that are actively building AI or machine learning features", "keywords": ["fleet management AI", "logistics automation ML"], "max_results": 50 } )   # Returns: ranked URLs, page titles, publish dates, compressed excerpts ```
```

Agents can run hundreds of queries in parallel, deduplicate results by company domain, and route discovered leads into enrichment workflows automatically.

The advantages: volume (thousands of queries, no rate limits based on seat count), freshness (results from pages indexed today), and schema flexibility (you define what fields matter for your ICP).

Specific signals to target include job postings on LinkedIn and Indeed, press releases on company newsrooms, product launch announcements, and G2 review activity spikes. Each signal type tells a different story about the company's current priorities.

## \## Phase 2: Enriching leads with real-time web data

Discovery surfaces companies. Enrichment fills in the context you need to qualify and personalize outreach. Understanding how [data enrichment](https://parallel.ai/articles/what-is-data-enrichment) [[data enrichment] (/articles/what-is-data-enrichment)](/ai/articles/what-is-data-enrichment) works is foundational to building this phase well.

### \### Extracting structured data from company websites

Most enrichment databases offer the same fields: company name, industry, headcount range, revenue estimate, tech stack detection. These fields have become commoditized and update slowly.

Real-time extraction from a company's own website gives you fields that matter more for qualification:

* \- Actual product descriptions (not a third-party categorization)
* \- Current pricing model and tiers
* \- Open job postings by department
* \- Recent blog posts and company news
* \- Leadership names and roles from the team page
* \- Technology mentions in page source code

A company's pricing page tells you more about their segment than a headcount estimate. A company with usage-based pricing and a self-serve free tier operates differently than one with enterprise-only annual contracts.

Parallel's Extract API pulls structured content from any URL:

\### Python

```
1

2

3

4

5

6

7

8

9

10

response = requests.post(
     "https://api.parallel.ai/v1beta/extract" ,
    headers={ "x-api-key" :  "your-api-key" },
    json={
         "urls" : [ "https://example.com/pricing" ,  "https://example.com/about" ],
         "objective" :  "Extract pricing model, target customer segment, company founding date, and leadership team names" 
    }
)

 # Returns: clean markdown excerpts with requested fields ```  response = requests.post( "https://api.parallel.ai/v1beta/extract", headers={"x-api-key": "your-api-key"}, json={ "urls": ["https://example.com/pricing", "https://example.com/about"], "objective": "Extract pricing model, target customer segment, company founding date, and leadership team names" } )   # Returns: clean markdown excerpts with requested fields ```
```

You define the schema. The API returns structured JSON. No parsing code to maintain, no site-specific selectors to update when layouts change.

Fields unavailable in traditional enrichment databases: open headcount by department, pricing tier structure, exact product description, recent funding language from press sections, and technology partnerships mentioned on integration pages. For a deeper look at how web enrichment transforms sales workflows, see how [AI-powered sales tools transform CRM data intelligence](https://parallel.ai/articles/ai-web-enrichment-for-sales) [[AI-powered sales tools transform CRM data intelligence] (/articles/ai-web-enrichment-for-sales)](/ai/articles/ai-web-enrichment-for-sales) .

### \### Building custom enrichment schemas with AI agents

Some enrichment fields can't be extracted from a single URL. They require reasoning across multiple sources.

"Is this company a good fit for enterprise sales?" requires synthesizing data from their website (pricing, customer logos), recent news (funding, expansion announcements), LinkedIn (org structure, hiring velocity), and product reviews (G2, Capterra).

AI agents handle multi-step research well when given a structured task definition:

* \- **\*\* Inputs: \*\*** company name, website URL
* \- **\*\* Outputs: \*\*** qualification score, fit rationale, recommended outreach angle

Parallel's [Task API](https://parallel.ai/products/task) [[Task API] (/products/task)](/ai/products/task) runs this kind of structured research:

\### Python

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

response = requests.post(
     "https://api.parallel.ai/v1beta/task_runs" ,
    headers={ "x-api-key" :  "your-api-key" },
    json={
         "processor" :  "core" ,
         "input" : {
             "company_name" :  "Acme Corp" ,
             "website" :  "https://acme.com" 
        },
         "output_schema" : {
             "has_dedicated_revops" :  "boolean" ,
             "estimated_sales_team_size" :  "string" ,
             "qualification_score" :  "number" ,
             "outreach_angle" :  "string" 
        }
    }
) ```  response = requests.post( "https://api.parallel.ai/v1beta/task_runs", headers={"x-api-key": "your-api-key"}, json={ "processor": "core", "input": { "company_name": "Acme Corp", "website": "https://acme.com" }, "output_schema": { "has_dedicated_revops": "boolean", "estimated_sales_team_size": "string", "qualification_score": "number", "outreach_angle": "string" } } ) ```
```

No static database captures a qualification rationale or a suggested outreach hook. Only an agent that reads and reasons across sources can produce these fields. [Gumloop built AI automation workflows with web intelligence as a core node](https://parallel.ai/blog/case-study-gumloop) [[Gumloop built AI automation workflows with web intelligence as a core node] (/blog/case-study-gumloop)](/ai/blog/case-study-gumloop) , using this exact pattern for lead qualification at scale.

Pipeline integration is straightforward: enrichment outputs feed directly into CRM fields (Salesforce, HubSpot), email personalization templates (Outreach, Salesloft), or sales prioritization queues.

## \## Phase 3: Triggering lead gen workflows from live web events

Discovery and enrichment run once per lead. Monitoring runs continuously, surfacing leads the moment they become ready to buy.

### \### What signals indicate a company is ready to engage

High-value trigger events cluster around budget availability, strategic change, and active vendor evaluation. Research shows [intent data can deliver 3x higher conversion rates](https://www.marketsandmarkets.com/AI-sales/intent-data-for-b2b-sales) [[intent data can deliver 3x higher conversion rates] (https://www.marketsandmarkets.com/AI-sales/intent-data-for-b2b-sales)](https://www.marketsandmarkets.com/AI-sales/intent-data-for-b2b-sales) when used to prioritize outreach timing.

**\*\* Funding announcements: \*\*** Series A and B companies have budget and urgency. They're actively building teams and buying tools. A company that just raised $20M will make decisions in the next 90 days that shape their stack for years.

**\*\* Leadership changes: \*\*** A new VP of Sales or CTO is three to six times more likely to evaluate new vendors in their first 90 days. They're building their team, establishing processes, and have permission to change the status quo.

**\*\* Job posting spikes: \*\*** A company hiring five or more sales reps in a quarter is scaling GTM and likely buying supporting tools. Hiring patterns visible on [LinkedIn](https://www.linkedin.com) [[LinkedIn] (https://www.linkedin.com)](https://www.linkedin.com) and Indeed predict tool purchases months in advance.

**\*\* Product launches or pricing changes: \*\*** Signals of market expansion or strategic shift. A company launching a new pricing tier is rethinking their customer segments.

**\*\* Technology adoption signals: \*\*** A company adding Salesforce, Snowflake, or a specific stack element to their job postings indicates readiness for adjacent tools.

**\*\* Press and media mentions: \*\*** Companies featured in vertical trade press are often in an investment or expansion phase.

Sources for these signals include [Crunchbase](https://www.crunchbase.com) [[Crunchbase] (https://www.crunchbase.com)](https://www.crunchbase.com) for funding data, LinkedIn for job postings and leadership changes, company newsrooms for press releases, [G2](https://www.g2.com) [[G2] (https://www.g2.com)](https://www.g2.com) for review activity, and SEC filings for public companies.

### \### Building a monitor-and-trigger pipeline

A monitor-and-trigger pipeline has three components:

1. **\*\* Watch list: \*\*** Target URLs or domains to track
2. **\*\* Change detection: \*\*** Checks for new content matching defined criteria
3. **\*\* Action layer: \*\*** Routes qualifying events to downstream workflows

Example workflow:

Monitor 500 target company websites and newsrooms. Detect new funding announcement or leadership hire. Trigger enrichment task. Push qualified lead to CRM with context. Notify sales rep with outreach draft.

This architecture transforms one-time prospecting into continuous lead generation. The pipeline runs indefinitely, surfacing new leads as they become ready.

Parallel's [Monitor API](https://parallel.ai/blog/monitor-api) [[Monitor API] (/blog/monitor-api)](/ai/blog/monitor-api) watches URLs for changes and returns structured events via [webhooks](https://parallel.ai/blog/webhooks) [[webhooks] (/blog/webhooks)](/ai/blog/webhooks) :

\### Python

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

# Create a monitor 
response = requests.post(
     "https://api.parallel.ai/v1beta/monitors" ,
    headers={ "x-api-key" :  "your-api-key" },
    json={
         "query" :  "New funding announcements or executive hires at Series A-C fintech companies" ,
         "cadence" :  "daily" ,
         "webhook_url" :  "https://your-app.com/webhooks/lead-events" 
    }
)

 # Webhook payload when event fires: # { #   "event_type": "funding_announcement", #   "company": "Acme Fintech", #   "summary": "Raised $15M Series B led by...", #   "source_url": "https://techcrunch.com/...", #   "event_date": "2025-04-10" # } ```  # Create a monitor response = requests.post( "https://api.parallel.ai/v1beta/monitors", headers={"x-api-key": "your-api-key"}, json={ "query": "New funding announcements or executive hires at Series A-C fintech companies", "cadence": "daily", "webhook_url": "https://your-app.com/webhooks/lead-events" } )   # Webhook payload when event fires: # { #   "event_type": "funding_announcement", #   "company": "Acme Fintech", #   "summary": "Raised $15M Series B led by...", #   "source_url": "https://techcrunch.com/...", #   "event_date": "2025-04-10" # } ```
```

Watch lists can be built from prior discovery outputs. Phase 1 results feed Phase 3 targets, creating a self-reinforcing loop.

Latency matters. The fastest path from "company becomes ready" to "sales rep knows about it" wins. Days versus weeks is competitive advantage. Leads are [21 times more likely to convert if contacted within five minutes](https://verse.ai/blog/speed-to-lead-statistics) [[21 times more likely to convert if contacted within five minutes] (https://verse.ai/blog/speed-to-lead-statistics)](https://verse.ai/blog/speed-to-lead-statistics) , and a [Harvard Business Review study](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) [[Harvard Business Review study] (https://hbr.org/2011/03/the-short-life-of-online-sales-leads)](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) found that 47% of businesses fail to respond to leads within 24 hours. The monitor-and-trigger architecture closes this gap.

Downstream routing options include Zapier, Make (formerly Integromat), and direct webhook integrations to Slack, HubSpot, or Salesforce.

## \## A complete AI lead generation pipeline: how the phases connect

A working end-to-end pipeline for a specific ICP connects all three phases.

**\*\* Target: \*\*** Fintech companies with 50 to 200 employees that have recently raised Series A or B funding and are hiring for growth roles.

**\*\* Step 1: Discovery \*\***

Run natural language queries via FindAll or Search API. Query: "Fintech companies, 50-200 employees, Series A or B funding in the last 6 months, actively hiring sales or customer success roles."

Returns: 300 matching companies with websites, funding details, and hiring signals.

**\*\* Step 2: Enrichment \*\***

Extract API pulls structured fields from each company website: pricing model, product description, customer segment indicators, open sales headcount.

Task API runs qualification assessment: "Based on this company's website, recent news, and hiring patterns, rate their fit for enterprise sales software (1-10) and suggest an outreach angle."

Output: Enriched lead list with qualification scores and personalized outreach rationales.

**\*\* Step 3: Monitoring \*\***

Top 150 qualified companies added to monitor list. Monitor API watches for funding news, job posting changes, and leadership hires.

When a qualifying event fires: trigger enrichment refresh, update CRM record, push notification to assigned sales rep.

**\*\* Step 4: Action \*\***

Qualified and triggered leads pushed to HubSpot or Salesforce with enrichment context. Sales rep receives Slack alert with draft outreach personalized to the trigger event. For a real-world example of this pattern, see how [Day AI merges private and public data for business intelligence](https://parallel.ai/blog/case-study-day-ai) [[Day AI merges private and public data for business intelligence] (/blog/case-study-day-ai)](/ai/blog/case-study-day-ai) using Parallel's APIs.

**\*\* The loop: \*\*** Phase 3 outputs can seed new Phase 1 discovery. When a deal closes, run "find similar companies to [won account]" to expand the target list. Each closed deal feeds better discovery queries, compounding the pipeline's effectiveness over time.

The architecture looks like this:

\### Shell

```
1

2

3

4

5

6

7

8

9

10

11

ICP Definition
     ↓
[FindAll/Search] → Candidate list
     ↓
[Extract/Task] → Enriched + qualified leads
     ↓
[Monitor] → Trigger events
     ↓
CRM + Slack/Email → Sales action
     ↓
Won accounts → Feed back into discovery ```  ICP Definition ↓ [FindAll/Search] → Candidate list ↓ [Extract/Task] → Enriched + qualified leads ↓ [Monitor] → Trigger events ↓ CRM + Slack/Email → Sales action ↓ Won accounts → Feed back into discovery ```
```

Optional orchestration tools like Clay or n8n can coordinate these steps, but the core capability lives in the APIs themselves.

## \## Build vs. buy: when to use APIs vs. SaaS lead gen tools

SaaS tools and API infrastructure serve different needs. Choosing the wrong one wastes either money or engineering time. With [over 300,000 companies worldwide specializing in lead generation](https://martal.ca/lead-generation-statistics-lb/) [[over 300,000 companies worldwide specializing in lead generation] (https://martal.ca/lead-generation-statistics-lb/)](https://martal.ca/lead-generation-statistics-lb/) , the landscape is crowded and the right choice depends on your specific situation.

**\*\* Use SaaS tools (Apollo, Clay, Lusha) when: \*\***

* \- Your ICP is standard: enterprise SaaS, mid-market, specific industries with clear firmographic filters
* \- Volume is moderate: hundreds of leads per month, not thousands
* \- Your team has no engineering capacity to maintain integrations
* \- Time to value matters more than customization

These tools work fine for common use cases. Apollo's database covers millions of contacts. Clay's enrichment waterfall pulls from multiple sources. For straightforward outbound, the setup time is minutes.

**\*\* Use API infrastructure when: \*\***

* \- Your ICP is niche or requires behavioral signals (hiring patterns, product launches, technology adoption)
* \- Enrichment schema is custom: you need fields no database vendor offers
* \- Data freshness is competitive advantage: you need to act on signals within hours, not weeks
* \- The pipeline needs to run autonomously at scale: thousands of companies, continuous monitoring, no manual intervention

**\*\* Hidden costs of SaaS tools: \*\***

* \- Per-seat licensing that scales with team size, not usage
* \- Data export limits that constrain downstream integrations
* \- Schema rigidity that forces you to work within their field definitions
* \- Dependency on the vendor's data refresh cycle

**\*\* Benefits of building: \*\***

* \- You own the data, the schema, the refresh cadence, and the integration logic
* \- Pay for what you use, not per-seat
* \- Customize enrichment fields to match your actual qualification criteria
* \- Combine monitoring with enrichment for trigger-based workflows no SaaS tool offers

**\*\* The middle path: \*\*** Many teams use both. SaaS tools for initial outreach and volume plays. API infrastructure for continuous monitoring, deep enrichment, and the leads that matter most.

Apollo's data refresh lag can cost you deals when timing matters. Per-seat pricing on traditional platforms becomes expensive at scale. But if your ICP fits their data well and your team moves fast on leads, they're a reasonable starting point.

## \## Frequently asked questions about AI lead generation

**\*\* What is AI lead generation? \*\***

AI lead generation is the use of AI agents and machine learning to automate the discovery, qualification, enrichment, and monitoring of potential customers. Unlike traditional lead generation, which relies on manual research or static databases, AI-powered approaches use live web data and natural language processing to find and qualify leads continuously.

**\*\* How do I use AI for B2B lead generation? \*\***

Start by defining your ICP in natural language terms: behavioral signals like hiring patterns, funding stage, or technology adoption, not just firmographics. Then build a three-phase pipeline: discovery (using semantic search or entity-finding APIs to surface matching companies), enrichment (using extraction and reasoning to fill custom fields), and monitoring (using web change detection to trigger outreach when a qualifying event occurs).

**\*\* What web data signals work best for AI lead generation? \*\***

The highest-converting signals are: new funding announcements, leadership hires (especially VP-level GTM roles), job posting spikes in sales or engineering, product launches, and technology stack changes visible in job descriptions. These signals indicate budget availability, strategic change, or active vendor evaluation, all of which increase response rates significantly.

**\*\* Is it better to build an AI lead gen pipeline or use a SaaS tool? \*\***

SaaS tools work well for standard ICPs and moderate volume. API-based infrastructure is better when you need custom enrichment schemas, real-time data, niche ICP targeting, or a pipeline that runs autonomously at scale. Many teams use both: SaaS for broad outreach and APIs for continuous monitoring and deep enrichment.

## \## Start building your AI lead generation pipeline

AI lead generation delivers durable results when it runs on live web data, not recycled database records. The three-phase framework outlined here (discover, enrich, monitor) is the foundation of any pipeline that runs continuously.

The infrastructure exists today. Parallel's APIs ( [Search](https://docs.parallel.ai/search/search-quickstart) [[Search] (https://docs.parallel.ai/search/search-quickstart)](https://docs.parallel.ai/search/search-quickstart) , Extract, Task, FindAll, Monitor) handle each phase: finding companies from natural language queries, extracting custom fields from any website, running multi-step qualification research, and triggering workflows when leads become ready.

The question is whether to assemble it or stay dependent on tools that constrain your schema and your data.

[Start Building](https://docs.parallel.ai/home) [[Start Building] (https://docs.parallel.ai/home)](https://docs.parallel.ai/home)

By Parallel

April 17, 2026
# How to find companies that match your ideal customer profile using an API

Deep research APIs let you describe an ideal customer profile in plain language and get structured, verifiable company matches from the live web, including the behavioral criteria static databases can't filter on. This guide covers what an ICP defines, why B2B databases fall short on complex criteria, how to turn ICP criteria into a FindAll call, how to enrich the results, and the common automation mistakes.

## Key takeaways

- An _ideal customer profile_ defines the company-level attributes that predict your best customers: firmographic, technographic, and behavioral signals.
- Traditional B2B data providers like Apollo, ZoomInfo, and Clearbit offer static databases with fixed schemas, useful for basic firmographic filtering but limited for complex or signal-based criteria.
- You can discover companies from the live web using deep research APIs with natural language queries and multi-hop reasoning, handling criteria that static databases miss.
- You can turn ICP criteria into a single API call with Parallel's FindAll API by describing your ideal customer in plain English and receiving structured results.
- Combining discovery (FindAll) with enrichment (Task API) gives you a complete pipeline from ICP definition to qualified lead list.

## What an ideal customer profile actually defines

An _ideal customer profile_ is a company-level description of the organization most likely to buy your product, succeed with it, and expand over time. This is different from a _buyer persona_, which profiles the individual decision-maker within that company. Your ICP answers "which companies should we target?" while your buyer persona answers "who at those companies should we talk to?" [Gartner's guide to defining your ICP](https://www.gartner.com/en/digital-markets/insights/b2b-ideal-customer-profile) covers the strategic foundations in detail.

Most ICP definitions include three categories of attributes:

**[Firmographic data](https://pipeline.zoominfo.com/sales/difference-between-firmographic-and-technographic-data)** covers the basics: industry vertical, employee headcount, annual revenue, geographic footprint, and company structure. These attributes form the foundation of any ICP. A typical firmographic filter might specify "B2B SaaS companies with 50 to 200 employees headquartered in the United States." A [firmographic data guide](https://www.contentful.com/blog/firmographic-data/) from Contentful provides a useful breakdown of these attribute types.

**Technographic data** describes the tools, platforms, and infrastructure a company uses. If you sell a Salesforce integration, you need companies running Salesforce. If your product requires Kubernetes, you need companies with Kubernetes in production. Technographic signals help you qualify technical fit before the first conversation.

**Behavioral signals** capture what a company is doing right now: hiring velocity in specific departments, recent funding rounds, product launches, expansion into new markets, or leadership changes. These signals indicate timing and intent. A company that just raised a Series B and is hiring five sales development reps has different needs than one that has been static for two years.

Specificity determines ICP effectiveness. "Mid-market tech companies" describes millions of organizations. "Series A SaaS companies with 50 to 200 employees focused on HR technology" describes hundreds. The narrower your ICP, the higher your conversion rates and the more efficient your sales team's time allocation.

Most teams stop at firmographics and miss the behavioral signals that separate good-fit accounts from great-fit accounts. The challenge is not defining these criteria but finding companies that match them.

## Why static databases fall short for complex ICP matching

Traditional B2B data providers query pre-built databases with fixed schemas. Apollo, ZoomInfo, Clearbit, and People Data Labs maintain large repositories of company records with standardized fields: industry, headcount, revenue, location, and a set of technographic tags. When you query these platforms, you filter against existing records. [Forbes identifies data quality as a top B2B challenge](https://www.forbes.com/councils/forbesagencycouncil/2024/03/26/the-top-10-marketing-data-challenges-for-b2b-businesses-in-2024/), noting that 80% of contact data at many organizations comes from tools like ZoomInfo, with significant freshness and accuracy gaps.

This approach works well for basic firmographic filtering. If you need "all SaaS companies with 100 to 500 employees in California," a static database delivers that list in seconds. The data exists in a normalized format, indexed and ready to query.

The limitations emerge when your ICP criteria go beyond fixed fields:

**Dynamic signals are invisible.** A company that announced SOC 2 certification last week, launched a new product line yesterday, or promoted a new CTO this month will not have those events reflected in a quarterly database refresh. If your ICP includes "companies that recently achieved compliance certifications," static databases cannot help.

**Multi-hop criteria require inference.** If you need "companies whose founders previously worked at Google" or "startups backed by investors who also funded Stripe," you are asking for relationships that span multiple data sources. Static databases store records, not reasoning chains.

**Niche and new companies fall through the cracks.** A startup founded three months ago may not appear in databases built from annual data aggregation. If your ICP targets emerging players in a specific vertical, static providers will undercount your total addressable market.

**Data freshness degrades over time.** Monthly or quarterly refresh cycles mean that headcount, funding status, and even company existence can be stale. [Forrester reports](https://www.forrester.com/blogs/b2b-marketers-expect-to-do-more-with-more-but-its-not-as-good-as-it-sounds/) that poor data quality and accessibility remain persistent challenges blocking B2B marketing progress. You end up with records for companies that no longer exist and miss companies that launched after the last refresh.

Sales teams need live signals; static providers deliver snapshots. Teams either over-filter and miss opportunities, or under-filter and waste cycles on poor-fit accounts. Neither outcome helps pipeline. For a deeper look at how [AI-powered sales enrichment](https://parallel.ai/articles/ai-web-enrichment-for-sales) addresses these gaps, see our guide.

## How deep research APIs change ICP discovery

With [deep research](https://parallel.ai/articles/what-is-deep-research) APIs, you take a different approach. Instead of querying a pre-indexed database, you search the live web in real time through an API that applies multi-hop reasoning to find entities matching your criteria.

You describe your ideal customer in natural language and hand off discovery, validation, and structuring to the API. It searches across company websites, press releases, SEC filings, job boards, LinkedIn profiles, and platforms like [Crunchbase](https://www.crunchbase.com/) to find candidates, then evaluates each one against your stated criteria.

The sources matter. Through a deep research API, you synthesize information from public filings, press coverage, job postings, and social profiles. You read the hiring page to understand growth trajectory, check [Crunchbase](https://www.crunchbase.com/) for funding history, and scan LinkedIn for team composition. You get a complete picture of each candidate company, triangulated across sources. [Day AI uses Parallel to merge private and public data](https://parallel.ai/blog/case-study-day-ai) for exactly this kind of sales intelligence workflow.

This architecture unlocks criteria that static databases cannot handle:

**Natural language input.** You specify "Series A fintech companies with 20 to 100 employees that offer APIs for payment processing" rather than constructing Boolean filters across fixed fields. The API interprets your intent and searches accordingly.

**Live web coverage.** Results reflect what exists on the web right now, not what existed at the last database refresh. A company that announced funding yesterday can appear in today's results.

**Multi-source synthesis.** You combine information from a company's website, their LinkedIn page, a TechCrunch article, and a job posting to evaluate a single match condition. This is multi-hop reasoning applied to entity discovery.

**Structured output.** Results come back as typed fields, not raw web pages. You get company names, URLs, match confidence scores, and citations showing where each data point originated.

Parallel's [FindAll API](https://parallel.ai/products/findall) is the concrete example of this approach. You submit a natural language objective with structured match conditions, and you discover entities from the live web that satisfy those conditions. The three-stage pipeline (Generate, Evaluate, Enrich) handles the full workflow from candidate discovery through validation to structured output.

## Turning ICP criteria into an API call with FindAll

Translating your ICP into a FindAll API call requires four steps:

**Step 1: Define match conditions.** Each ICP attribute becomes a match condition with a name and description. The name is a label; the description is a natural language statement that FindAll uses for evaluation.

For example, if your ICP specifies "Series A SaaS companies in HR tech with 50 to 200 employees," you create match conditions like:

- **Funding stage**: "The company has raised Series A funding"
- **Product focus**: "The company sells HR software or HR technology products"
- **Company size**: "The company has between 50 and 200 employees"

**Step 2: Set the entity type and objective.** The entity type is usually "company" for ICP matching. The objective is a natural language description of what you are looking for, which guides the Generate stage.

**Step 3: Choose a Generator tier.** FindAll offers four tiers based on query complexity. See the [Generator tier documentation](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing) for full details and [pricing](https://parallel.ai/pricing):

| Tier | Cost | Best for |
| --- | --- | --- |
| preview | $0.10 fixed | Testing queries against roughly 10 candidates before committing |
| base | $0.25 plus $0.03 per match | Broad queries with many expected matches |
| core | $2.00 plus $0.15 per match | Specific queries with moderate expected matches |
| pro | $10.00 plus $1.00 per match | Analyst-grade research for rare or hard-to-find matches |

For most ICP discovery work, Core or Pro delivers the best balance of coverage and accuracy.

**Step 4: Submit the request and retrieve results.** FindAll runs asynchronously. You poll for status, stream results via SSE, or receive webhook notifications when the run completes. The [FindAll quickstart guide](https://docs.parallel.ai/findall-api/findall-quickstart) walks through the full implementation.

Here is a Python example using the Parallel SDK:

```python
from parallel import Parallel

client = Parallel()

run = client.beta.findall.create(
    objective="Find Series A SaaS companies in the US focused on HR technology",
    entity_type="company",
    match_conditions=[
        {"name": "Funding stage", "description": "Raised Series A funding"},
        {"name": "Product focus", "description": "Sells HR software or HR tech"},
        {"name": "Employee count", "description": "Has 50 to 200 employees"},
        {"name": "Geography", "description": "Headquartered in the United States"}
    ],
    generator="core",
    match_limit=50
)
```

This call initiates discovery. The API searches the web, identifies candidate companies, evaluates each against your match conditions, and returns structured results with confidence scores and source citations.

The three-stage pipeline operates as follows:

1. **Generate**: FindAll searches the web to identify potential matches based on your objective
2. **Evaluate**: Each candidate is validated against your match conditions using multi-hop reasoning
3. **Enrich**: Matched entities receive additional structured fields based on your schema (optional)

Every match includes the _[Basis](https://docs.parallel.ai/task-api/guides/access-research-basis)_[ framework](https://docs.parallel.ai/task-api/guides/access-research-basis) output: per-field citations showing where each data point originated, reasoning explaining how the match was evaluated, and calibrated confidence scores. Your sales team can click through to the source and verify any data point before outreach.

The citation structure looks like this: if FindAll reports that a company "raised Series A funding," the result includes the source URL (a TechCrunch article, a Crunchbase page, or an SEC filing), the relevant excerpt, and a confidence score. You can trace every claim back to its source, turning opaque API output into verifiable intelligence.

## Enriching discovered companies with deeper ICP signals

Discovery is step one. After FindAll returns a list of ICP-matching companies, you need deeper context for prioritization and outreach: decision-maker contacts, technology stack details, recent funding history, and competitive positioning.

You handle [data enrichment](https://parallel.ai/articles/what-is-data-enrichment) through Parallel's [Task API](https://parallel.ai/products/task). You define a custom schema specifying the exact fields your sales team needs, then run enrichment across your discovered list.

Here is a Python example that enriches a discovered company:

```python
from parallel import Parallel

client = Parallel()

task = client.beta.task_runs.create(
    objective="Enrich this company for sales outreach",
    context={"company_name": "Acme HR", "company_url": "https://acmehr.com"},
    output_schema={
        "cto_name": "string",
        "cto_linkedin": "string",
        "current_ats_provider": "string",
        "last_funding_round": "string",
        "last_funding_amount": "string"
    },
    processor="core"
)
```

This call returns the CTO's name and LinkedIn profile, the company's current ATS provider (useful for competitive positioning), and their most recent funding details. Each field includes citations and confidence scores via the Basis framework. The [Task API quickstart](https://docs.parallel.ai/task-api/task-quickstart) covers implementation details.

The Task API supports custom schemas, so you request the exact fields relevant to your sales motion. Unlike traditional enrichment providers with fixed output fields, you define what you need. If your team cares about compliance certifications, technology partnerships, or expansion plans, you add those to the schema.

Processor tiers let you match AI compute to task complexity:

| Tier | Price | Output |
| --- | --- | --- |
| lite | $5 per 1,000 runs | Basic metadata and fallback |
| base | $10 per 1,000 runs | Standard enrichments |
| core | $25 per 1,000 runs | Cross-referenced, moderately complex outputs |
| pro | $100 per 1,000 runs | Exploratory web research |

Combining FindAll with Task API creates a complete pipeline: discover companies matching your ICP, then enrich each one with the context your sales team needs. You end up with a qualified lead list where every data point traces back to a source.

The workflow in practice: FindAll returns 50 companies matching your ICP criteria. You pipe those results into Task API with a schema requesting CTO contact information, current tech stack, and recent funding details. Task API enriches each company in parallel, returning structured data with citations. Your sales team receives a prioritized list with the context they need to personalize outreach.

## Comparing approaches: static databases vs. deep research APIs

The choice between static databases and deep research APIs depends on your ICP complexity and workflow requirements. The [Salesforce State of Sales report](https://www.salesforce.com/resources/research-reports/state-of-sales/) found that teams using enriched CRM data generate 44% more sales-qualified leads than those relying on base contact data alone.

| Dimension | Static databases | Deep research APIs |
| --- | --- | --- |
| Data freshness | Monthly/quarterly refresh | Live web, real-time |
| Query flexibility | Fixed field filters | Natural language criteria |
| Criteria complexity | Firmographic filters | Multi-hop reasoning, behavioral signals |
| Schema customization | Fixed output fields | Custom schemas per request |
| New/niche company coverage | Limited by ingestion lag | Discovers from live web |
| Pricing model | Subscription + per-record | Per-query + per-match |

**When static databases work well:**

Apollo, ZoomInfo, Clearbit, and People Data Labs excel at high-volume firmographic filtering with standard criteria. If your ICP is "all marketing agencies with 10 to 50 employees in New York," a static database delivers that list quickly and cheaply. The criteria map directly to indexed fields.

**When deep research APIs add value:**

FindAll addresses the cases static databases miss: multi-criteria discovery with behavioral signals, niche or emerging company identification, and custom data points not captured in standard schemas. If your ICP includes "companies that recently hired a VP of Data" or "startups that integrate with Snowflake," you need live web research.

**Hybrid approach:**

Many teams use both. Static databases provide bulk firmographic filtering for initial list building. Deep research APIs handle complex validation, net-new discovery in underserved segments, and custom enrichment. The tools complement rather than replace each other.

The decision criteria: if your ICP fits standard firmographic fields and you prioritize volume, start with a static provider. If you need behavioral signals, multi-hop criteria, or custom data points, a deep research API fills the gap.

Consider your sales motion. High-velocity outbound with simple targeting criteria benefits from static database speed and scale. Account-based selling with complex qualification criteria benefits from deep research precision. Enterprise deals where each target requires custom research justify the additional depth. Match your tooling to your go-to-market strategy.

## Common mistakes when automating ICP discovery

Four patterns undermine ICP discovery effectiveness:

**Defining criteria too broadly.** "Technology companies" matches millions of organizations. "Series B developer tools companies with 20 to 100 employees using Kubernetes in production" matches hundreds. Broad criteria waste compute and deliver low-signal results. Invest time upfront in specificity.

**Ignoring data provenance.** API results without citations are claims without evidence. If you cannot trace a data point to its source, you cannot verify accuracy. The Basis framework addresses this by providing per-field citations, reasoning, and confidence scores. Build workflows that surface provenance to your sales team.

**Treating discovery as a one-time event.** Markets shift. Companies raise funding, get acquired, hire, and expand. An ICP-matching list from six months ago misses new entrants and includes companies that no longer fit. Schedule periodic refreshes aligned with your sales cycle.

**Over-relying on firmographics.** Headcount and revenue are easy to filter but weak predictors of fit. Behavioral signals (hiring velocity, funding activity, product launches, technology adoption) indicate timing and intent. A 100-person company that just raised Series B and is hiring five account executives has different urgency than a static 100-person company. Build behavioral signals into your ICP criteria.

## FAQs

### What is an ideal customer profile?

An ICP is a company-level description of the organization most likely to buy and succeed with your product, defined by firmographic, technographic, and behavioral attributes. It answers "which companies should we target?" rather than "who should we talk to at those companies."

### How is an ICP different from a buyer persona?

An ICP targets the company; a buyer persona profiles the individual decision-maker within that company. You use ICP for account selection and buyer personas for messaging and outreach.

### What API can help me find companies matching my ICP?

Deep research APIs like Parallel's FindAll accept natural language ICP criteria and discover matching companies from the live web with structured output, citations, and confidence scores.

### Can I use natural language to describe my ideal customer in an API call?

FindAll accepts plain-English objectives and match conditions, then runs multi-hop web research to find entities matching those criteria. No Boolean query syntax required.

### What is the difference between a company data API and a deep research API?

Company data APIs query pre-built databases with fixed schemas and refresh cycles. Deep research APIs query the live web in real time and handle complex, multi-criteria discovery using reasoning.

Explore the FindAll API documentation and run your first ICP discovery query: [Start Building](https://docs.parallel.ai/home)

[](https://parallel.ai/blog/decisions-api)

Introducing Parallel Decisions API: the first decision engine with world knowledge built in. [Learn more.](https://parallel.ai/blog/decisions-api) [[Learn more.] (https://parallel.ai/blog/decisions-api)](https://parallel.ai/ai/blog/decisions-api) Introducing Parallel Decisions API. [Learn more.](https://parallel.ai/blog/decisions-api)

Human Machine

April 20, 2026

# \# How Finch is scaling plaintiff law with AI agents that research like associates

Finch replaced a three-step search-extract-validate pipeline with a single Parallel Task API call, cutting per-query costs by 96% and eliminating the defensive engineering overhead that came with an unreliable vendor.

Parallel Web Systems avatar

Author: By Parallel Web Systems

Tags: [Customers](https://parallel.ai/blog?tag=customers)

How Finch is scaling plaintiff law with AI agents that research like associates

## \## **\*\* Key highlights \*\***

* \- **\*\* 90% cost reduction: \*\*** per-query cost dropped after migrating to the Task API
* \- **\*\* Zero 5xx errors or timeouts \*\*** across three-plus months in production
* \- **\*\* Single-call structured outputs \*\*** replaced a three-step search, extract, and validate chain

**\*\* Tiered processing \*\*** lets Finch match cost and accuracy to query complexity at the individual task level

## \## **\*\* About Finch \*\***

Finch builds the back office that plaintiff law firms never had. The company pairs an in-house legal team with AI agents to handle the research, case preparation, and administrative work that bogs down attorneys. Lawyers focus on settlements and litigation; Finch handles everything upstream. Their current focus is personal injury pre-litigation, with plans to expand into other plaintiff law areas.

The problem Finch targets is a supply-side bottleneck: 75% of Americans who need legal help can't get it. Law firms hit capacity limits and refer cases out rather than hiring more staff to handle the work.

## \## **\*\* The problem \*\***

Finch's AI agents run structured research workflows at scale, pulling case-relevant facts from the web, enriching records, and feeding structured outputs into the firm's data models. Before Parallel, Finch powered these workflows through another search API provider.

That vendor's API contract was unreliable. Fields appeared and disappeared between responses with no warning. Finch's engineers wrote defensive validation layers and permissive schemas to keep production from breaking. The search quality compounded the problem: results came back as free text that required a second extraction pass before the data could enter Finch's structured pipelines. Every query became a three-step chain: search, extract, validate.

The engineering overhead of maintaining defensive wrappers around an inconsistent API consumed time that should have gone toward Finch's core product.

## \## **\*\* The solution \*\***

Finch migrated to Parallel's Task API in November and now runs all web research through it. They break these two into two key workflows:

* \- **\*\* Deterministic workflows. \*\*** These are repeatable queries with versioned schemas, the bread-and-butter of legal back-office research. The same categories of questions run against different cases, pushing structured data directly into Finch's data models with a stable output contract. Finch started here because the work is high-volume, well-defined, and predictable, which made the Lite Processor a clean fit for cost and latency.
* \- **\*\* Production agents that write their own Task API specs. \*\*** These agents construct their own structured output schemas at runtime with variable depths, depending on the complexity of the research question in front of them.

Finch is also exploring Parallel's Monitor API for passive web monitoring as a future addition to their pipeline, so that agents can kick off research themselves, without human intervention.

## \## **\*\* The impact \*\***

A 90% drop in per-task cost. Finch now runs higher volumes than before at a fraction of the spend.

> > **\*\* "We went from spending engineering cycles on defensive validation to spending them on product. The Task API gives us structured outputs with citations in a single call, which is exactly what production legal AI needs." \*\***
> 
> 

> > **\*\* — Ben Weems, CTO, Finch \*\***
> 
>

After three-plus months in production, Finch has seen zero 5xx errors or timeouts from Parallel. The team that previously built defensive validation layers around an unreliable API now builds product features instead.

Parallel's tiered pricing lets Finch match compute to complexity across their entire operation. Deterministic workflows run on Lite. Production agents use Core. The tradeoffs between speed, accuracy, and cost are explicit at each tier, so Finch's engineers can make informed decisions at the query level rather than paying a flat rate for capabilities they don't always need

## \## Ready to get started?

[Start building for free](https://platform.parallel.ai/home) [[Start building for free] (https://platform.parallel.ai/home)](https://platform.parallel.ai/home) [Contact us](https://contact.parallel.ai/) [[Contact us] (https://contact.parallel.ai/)](https://contact.parallel.ai/)

[[Are you an agent? Read this to onboard Parallel] (https://parallel.ai/agents.md)](https://parallel.ai/ai/agents.md)

## Ready to get started?

[Start building for free](https://platform.parallel.ai/home) [[Start building for free] (https://platform.parallel.ai/home)](https://platform.parallel.ai/home) [Contact us](https://contact.parallel.ai/) [[Contact us] (https://contact.parallel.ai/)](https://contact.parallel.ai/)

[Are you an agent? Read this to onboard Parallel](https://parallel.ai/agents.md)

### \## Related Posts 115

[An abstract image of the Parallel eval harness Nov 17, 2026 ### \- [ Open-sourcing the Parallel Search Eval Harness ] (https://parallel.ai/blog/parallel-search-eval-harness) Tags: [Developers](https://parallel.ai/blog?tag=developers) , [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Authors: By James Liounis, Vlad Shulman and Lukas Levert](https://parallel.ai/blog/parallel-search-eval-harness)

[AcuityMD uses Parallel to keep medtech market data accurate at scale Nov 16, 2026 ### \- [ AcuityMD uses Parallel to keep medtech market data accurate at scale ] (https://parallel.ai/blog/case-study-acuitymd) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-acuitymd)

[Introducing the Parallel Images API Nov 14, 2026 ### \- [ Introducing Parallel Image Search ] (https://parallel.ai/blog/parallel-images-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-images-api)

[Parallel for Startups: Build your next big thing with the live web. Isometric drawing of a vintage computer showing the Parallel logo, a pencil, and city blocks on graph paper. Nov 12, 2026 ### \- [ Announcing Parallel for Startups ] (https://parallel.ai/blog/parallel-for-startups) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-for-startups)

[Parallel Search is now available in AWS Marketplace Nov 11, 2026 ### \- [ Parallel Search is now available in AWS Marketplace ] (https://parallel.ai/blog/aws-marketplace-parallel-search) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/aws-marketplace-parallel-search)

[Introducing the Scale plan for Parallel Nov 11, 2026 ### \- [ Introducing the Scale plan for Parallel ] (https://parallel.ai/blog/scale-plan) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/scale-plan)

[Parallel for Legal: Setting the new standard for Legal AI Search Nov 6, 2026 ### \- [ Parallel for Legal: Setting the new standard for Legal AI Search ] (https://parallel.ai/blog/parallel-for-legal) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-for-legal)

[Parallel Decisions is now on OpenRouter Nov 6, 2026 ### \- [ Parallel Decisions is now on OpenRouter ] (https://parallel.ai/blog/decisions-openrouter) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/decisions-openrouter)

[GC AI uses Parallel for web search, supporting 2,200+ in-house legal teams Nov 6, 2026 ### \- [ GC AI uses Parallel for web search, supporting 2,200+ in-house legal teams ] (https://parallel.ai/blog/case-study-gc-ai) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-gc-ai)

[How Eve brings trusted research directly into plaintiff casework, powered by Parallel Nov 5, 2026 ### \- [ How Eve brings trusted research directly into plaintiff casework, powered by Parallel ] (https://parallel.ai/blog/case-study-eve) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-eve)

[Parallel MCP 2.0 Nov 5, 2026 ### \- [ Introducing Parallel MCP 2.0: all-in-one web research tools for every agent ] (https://parallel.ai/blog/parallel-mcp-2) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-mcp-2)

[Introducing PWS-Decisions: A benchmark for web-grounded decisions Nov 1, 2026 ### \- [ Introducing PWS-Decisions: A benchmark for web-grounded decisions ] (https://parallel.ai/blog/pws-decisions-benchmark) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Authors: By Devin Gupta and Leela Karumbunathan](https://parallel.ai/blog/pws-decisions-benchmark)

[Parallel Slack agent posting web monitor alerts in a Slack channel Oct 29, 2026 ### \- [ Introducing Parallel in Slack: web intelligence where your team works ] (https://parallel.ai/blog/parallel-slack-agent) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-slack-agent)

[Parallel: Unmatched SOTA web search for Finance AI Agents Oct 29, 2026 ### \- [ Parallel: Unmatched SOTA web search for Finance AI Agents ] (https://parallel.ai/blog/parallel-for-finance) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-for-finance)

[How Bretton runs AI compliance, fraud, and risk investigations with 3x faster web research using Parallel Oct 27, 2026 ### \- [ How Bretton runs AI compliance, fraud, and risk investigations with 3x faster web research using Parallel ] (https://parallel.ai/blog/case-study-bretton-ai) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-bretton-ai)

[Parallel Decisions API: decisions grounded in the live web. A dotted globe in orange and light blue. Oct 25, 2026 ### \- [ Introducing the Parallel Decisions API: fast classification grounded in live web data ] (https://parallel.ai/blog/decisions-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/decisions-api)

[Introducing data residency in Europe Oct 22, 2026 ### \- [ Introducing data residency in Europe ] (https://parallel.ai/blog/eu-data-residency) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/eu-data-residency)

[How Rogo brings real-time web intelligence into financial workflows Oct 22, 2026 ### \- [ How Rogo brings real-time web intelligence into financial workflows ] (https://parallel.ai/blog/case-study-rogo) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-rogo)

[Grid of torn-paper artifacts from the See the whole picture campaign: photographs, maps, documents, and handwritten notes Oct 20, 2026 ### \- [ See the whole picture: A brand campaign built with Parallel ] (https://parallel.ai/blog/see-the-whole-picture) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Yang You](https://parallel.ai/blog/see-the-whole-picture)

[Parallel and Browserbase co-brand card: search code beside a Browserbase agent session chart. Oct 14, 2026 ### \- [ Web Search for Browserbase is now powered by Parallel ] (https://parallel.ai/blog/browserbase-search-powered-by-parallel) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/browserbase-search-powered-by-parallel)

[Are all System One models created equal? Oct 14, 2026 ### \- [ Are all System One models created equal? ] (https://parallel.ai/blog/are-all-system-one-models-created-equal) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) , [Developers](https://parallel.ai/blog?tag=developers) Authors: By Tim Neumann, Vlad Shulman and Ethan Kam](https://parallel.ai/blog/are-all-system-one-models-created-equal)

[Abstract illustration: a scattered field of dark dots with a tangled orange path on the left, beside an orderly grid of dots with a clean orange line on the right. Oct 13, 2026 ### \- [ Using specialized data to improve research agent accuracy ] (https://parallel.ai/blog/specialized-data-labbench2) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) , [Developers](https://parallel.ai/blog?tag=developers) Author: By Ethan Kam](https://parallel.ai/blog/specialized-data-labbench2)

[Parallel and Lovable lockup Sep 28, 2026 ### \- [ Connect Lovable apps to the live web with Parallel ] (https://parallel.ai/blog/lovable-parallel) Author: By Parallel Web Systems](https://parallel.ai/blog/lovable-parallel)

[The outside world is the new infrastructure Sep 28, 2026 ### \- [ The outside world is the new infrastructure ] (https://parallel.ai/blog/the-outside-world-is-the-new-infrastructure) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Liam Mulcahy](https://parallel.ai/blog/the-outside-world-is-the-new-infrastructure)

[Enriching company, people, and product data with Gemini and Parallel Web Search Sep 28, 2026 ### \- [ Enriching company, people, and product data with Gemini and Parallel Web Search ] (https://parallel.ai/blog/cookbook-gemini-parallel-enrichment) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By George Pickett](https://parallel.ai/blog/cookbook-gemini-parallel-enrichment)

[LangChain's Managed Deep Agents ships with built-in web search from Parallel Sep 24, 2026 ### \- [ LangChain's Managed Deep Agents ships with built-in web search from Parallel ] (https://parallel.ai/blog/langchain-managed-deep-agents-parallel-search) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/langchain-managed-deep-agents-parallel-search)

[Bring trusted data into Parallel with Data Connectors Sep 23, 2026 ### \- [ Bring trusted data into Parallel with Data Connectors ] (https://parallel.ai/blog/data-connectors) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/data-connectors)

[Testing out Jev: real-world developer experience Sep 18, 2026 ### \- [ Testing out Jev: real-world developer experience ] (https://parallel.ai/blog/testing-jev) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Vlad Shulman](https://parallel.ai/blog/testing-jev)

[Introducing the Search Capability Leaderboard Sep 15, 2026 ### \- [ Introducing the Search Capability Leaderboard ] (https://parallel.ai/blog/search-leaderboard) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) , [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/search-leaderboard)

[Merge launches Universal Context Layer with Parallel Search as its default web search provider Sep 10, 2026 ### \- [ Merge launches Universal Context Layer with Parallel Search as its default web search provider ] (https://parallel.ai/blog/merge-universal-context-layer) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Parallel Web Systems](https://parallel.ai/blog/merge-universal-context-layer)

[How to evaluate web search for AI Aug 31, 2026 ### \- [ How to evaluate web search for AI ] (https://parallel.ai/blog/how-to-eval-web-search) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Vlad Shulman](https://parallel.ai/blog/how-to-eval-web-search)

[Building an apartment discovery tool with Parallel Aug 29, 2026 ### \- [ Building an apartment discovery tool with Parallel ] (https://parallel.ai/blog/apartment-finder) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Elijah Jacob](https://parallel.ai/blog/apartment-finder)

[Full Parallel API suite is now available on Google Cloud Marketplace Aug 25, 2026 ### \- [ Full Parallel API suite is now available on Google Cloud Marketplace ] (https://parallel.ai/blog/gcp-marketplace-full-api-suite) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/gcp-marketplace-full-api-suite)

[Introducing Fast mode for Parallel Search Aug 21, 2026 ### \- [ Introducing Fast mode for Parallel Search ] (https://parallel.ai/blog/parallel-search-fast) Tags: [Product](https://parallel.ai/blog?tag=product) , [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-search-fast)

[Parallel ranks #1 on the Artificial Analysis Search Index, defining the Pareto frontier of quality, cost, and speed Aug 19, 2026 ### \- [ Parallel ranks #1 on the Artificial Analysis Search Index, defining the Pareto frontier of quality, cost, and speed ] (https://parallel.ai/blog/artificial-analysis-best-search-api) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/artificial-analysis-best-search-api)

[Always-on web monitoring research with Parallel Monitors and Hermes Agent Aug 13, 2026 ### \- [ Always-on web monitoring research with Parallel Monitors and Hermes Agent ] (https://parallel.ai/blog/always-on-agents-monitor-api) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Charles Martin](https://parallel.ai/blog/always-on-agents-monitor-api)

[Building an always-on background agent to proactively support customers Jul 30, 2026 ### \- [ Building an always-on background agent to proactively support customers ] (https://parallel.ai/blog/customer-watch-background-agent) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Khushi Shelat](https://parallel.ai/blog/customer-watch-background-agent)

[Introducing the Parallel Responses API Jul 21, 2026 ### \- [ Introducing the Parallel Responses API ] (https://parallel.ai/blog/responses-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/responses-api)

[Building a vendor intelligence system with Parallel Jul 20, 2026 ### \- [ Building a vendor intelligence system with Parallel ] (https://parallel.ai/blog/vendor-intelligence-system) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Sahith Jagarlamudi](https://parallel.ai/blog/vendor-intelligence-system)

[Parallel and Google Cloud Announce Partnership for Agentic Web Search on Gemini Enterprise Agent Platform Jul 16, 2026 ### \- [ Parallel and Google Cloud Announce Partnership for Agentic Web Search on Gemini Enterprise Agent Platform ] (https://parallel.ai/blog/google-cloud-partnership) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/google-cloud-partnership)

[$5 in free Parallel credits, every month Jul 15, 2026 ### \- [ $5 in free Parallel credits, every month ] (https://parallel.ai/blog/free-tier-parallel) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/free-tier-parallel)

[Introducing Turbo mode for Parallel Search Jul 13, 2026 ### \- [ Introducing Turbo mode for Parallel Search ] (https://parallel.ai/blog/parallel-search-turbo) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-search-turbo)

[Building a realtime voice agent with GPT-Realtime-2.1 and Parallel Search Turbo Jul 12, 2026 ### \- [ Building a realtime voice agent with GPT-Realtime-2.1 and Parallel Search Turbo ] (https://parallel.ai/blog/gpt-realtime-parallel-turbo) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By George Pickett](https://parallel.ai/blog/gpt-realtime-parallel-turbo)

[How Nooks cut web search costs 70.5% by switching to Parallel Jul 10, 2026 ### \- [ How Nooks cut web search costs 70.5% by switching to Parallel ] (https://parallel.ai/blog/case-study-nooks) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-nooks)

[How Build created live geofenced alerts powered by Parallel for institutional real estate Jul 8, 2026 ### \- [ How Build created live geofenced alerts powered by Parallel for institutional real estate ] (https://parallel.ai/blog/case-study-build) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-build)

[OpenClaw now has free, LLM-optimized web search by default powered by Parallel Jun 9, 2026 ### \- [ OpenClaw now has free, LLM-optimized web search by default powered by Parallel ] (https://parallel.ai/blog/free-web-search-openclaw) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/free-web-search-openclaw)

[Introducing real-time Entity Search Jun 5, 2026 ### \- [ Introducing real-time Entity Search ] (https://parallel.ai/blog/entity-search-company) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/entity-search-company)

[How we enrich & triage inbound leads using the Parallel Task API Jun 4, 2026 ### \- [ How we enrich & triage inbound leads using the Parallel Task API ] (https://parallel.ai/blog/enrich-triage-inbound-leads-parallel-task-api) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Khushi Shelat](https://parallel.ai/blog/enrich-triage-inbound-leads-parallel-task-api)

[How AirOps creates citation-worthy content at scale, powered by Parallel May 20, 2026 ### \- [ How AirOps creates citation-worthy content at scale, powered by Parallel ] (https://parallel.ai/blog/case-study-airops) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-airops)

[Introducing Index by Parallel May 19, 2026 ### \- [ Introducing Index by Parallel ] (https://parallel.ai/blog/introducing-index-by-parallel) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/introducing-index-by-parallel)

[Parallel Monitor API: New processor tiers, snapshots and event streams, and Basis on every event May 7, 2026 ### \- [ Parallel Monitor API: New processor tiers, snapshots and event streams, and Basis on every event ] (https://parallel.ai/blog/monitor-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/monitor-api)

[How we built parallelmpp.dev May 5, 2026 ### \- [ How we built parallelmpp.dev ] (https://parallel.ai/blog/parallel-mpp-dev) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Son Do](https://parallel.ai/blog/parallel-mpp-dev)

[Actively + Parallel Apr 29, 2026 ### \- [ How Actively's Per Account Agents use Parallel to turn the entire web into a proactive sales intelligence layer ] (https://parallel.ai/blog/case-study-actively) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-actively)

[Parallel Raises at $2 Billion Valuation to Scale Web Infrastructure for Agents Apr 29, 2026 ### \- [ Parallel Raises at $2 Billion Valuation to Scale Web Infrastructure for Agents ] (https://parallel.ai/blog/series-b) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Parallel Web Systems](https://parallel.ai/blog/series-b)

[Fully Free CLI with Pi, Ollama, Gemma 4, Parallel Apr 24, 2026 ### \- [ Building a free CLI agent with Pi, Ollama, Gemma 4, and Parallel ] (https://parallel.ai/blog/free-CLI-agent) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Matt Harris](https://parallel.ai/blog/free-CLI-agent)

[Parallel Search is now free via MCP Apr 23, 2026 ### \- [ Parallel Search is now free for agents via MCP ] (https://parallel.ai/blog/free-web-search-mcp) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/free-web-search-mcp)

[Search & Extract Benchmarks Apr 21, 2026 ### \- [ Upgrades to the Parallel Search & Extract APIs ] (https://parallel.ai/blog/parallel-search-api) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-search-api)

[Genpact and Parallel Web Systems Partner to Drive Tangible Efficiency from AI Systems Apr 8, 2026 ### \- [ Genpact and Parallel Web Systems Partner to Drive Tangible Efficiency from AI Systems ] (https://parallel.ai/blog/genpact-parallel-partnership) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Parallel Web Systems](https://parallel.ai/blog/genpact-parallel-partnership)

[Genpact & Parallel Apr 8, 2026 ### \- [ How Genpact helps top US insurers cut contents claims processing times in half with Parallel ] (https://parallel.ai/blog/case-study-genpact) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-genpact)

[DeepSearchQA: Parallel Task API benchmarks deepresearch Apr 7, 2026 ### \- [ A new deep research frontier on DeepSearchQA with the Task API Harness ] (https://parallel.ai/blog/deep-research) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/deep-research)

[How Modal saves tens of thousands annually by building in-house GTM pipelines with Parallel Mar 30, 2026 ### \- [ How Modal saves tens of thousands annually by building in-house GTM pipelines with Parallel ] (https://parallel.ai/blog/case-study-modal) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-modal)

[Opendoor and Parallel Case Study Mar 25, 2026 ### \- [ How Opendoor uses Parallel as the enterprise grade web research layer powering its AI-native real estate operations ] (https://parallel.ai/blog/case-study-opendoor) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-opendoor)

[Introducing stateful web research agents with multi-turn conversations Mar 19, 2026 ### \- [ Introducing stateful web research agents with multi-turn conversations ] (https://parallel.ai/blog/task-api-interactions) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/task-api-interactions)

[Parallel is now live on Tempo via the Machine Payments Protocol (MPP) Mar 18, 2026 ### \- [ Parallel is live on Tempo, now available natively to agents with the Machine Payments Protocol ] (https://parallel.ai/blog/tempo-stripe-mpp) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Parallel Web Systems](https://parallel.ai/blog/tempo-stripe-mpp)

[Kepler | Parallel Case Study Mar 17, 2026 ### \- [ How Parallel helped Kepler build AI that finance professionals can actually trust ] (https://parallel.ai/blog/case-study-kepler) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-kepler)

[Introducing the Parallel CLI Mar 10, 2026 ### \- [ Introducing the Parallel CLI ] (https://parallel.ai/blog/parallel-cli) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-cli)

[Profound + Parallel Web Systems Mar 4, 2026 ### \- [ How Profound helps brands win AI Search with high-quality web research and content creation powered by Parallel ] (https://parallel.ai/blog/case-study-profound) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-profound)

[How Harvey is expanding legal AI internationally with Parallel Mar 2, 2026 ### \- [ How Harvey is expanding legal AI internationally with Parallel ] (https://parallel.ai/blog/case-study-harvey) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-harvey)

[Tabstack + Parallel Case Study Feb 23, 2026 ### \- [ How Tabstack by Mozilla enables agents to navigate the web with Parallel’s best-in-class web search ] (https://parallel.ai/blog/case-study-tabstack) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-tabstack)

[Parallel | Vercel Feb 4, 2026 ### \- [ Parallel Web Tools and Agents now available across Vercel AI Gateway, AI SDK, and Marketplace ] (https://parallel.ai/blog/vercel) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/vercel)

[Product release: Authenticated page access for the Parallel Task API Jan 28, 2026 ### \- [ Authenticated page access for the Parallel Task API ] (https://parallel.ai/blog/authenticated-page-access) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/authenticated-page-access)

[Introducing structured outputs for the Monitor API Jan 21, 2026 ### \- [ Introducing structured outputs for the Monitor API ] (https://parallel.ai/blog/structured-outputs-monitor) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/structured-outputs-monitor)

[Product release: Research Models with Basis for the Parallel Chat API Jan 15, 2026 ### \- [ Introducing research models with Basis for the Parallel Chat API ] (https://parallel.ai/blog/research-models-chat) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/research-models-chat)

[Parallel + Cerebras Jan 8, 2026 ### \- [ Build a real-time fact checker with Parallel and Cerebras ] (https://parallel.ai/blog/cerebras-fact-checker) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Parallel Web Systems](https://parallel.ai/blog/cerebras-fact-checker)

[DeepSearch QA: Task API Dec 17, 2025 ### \- [ Parallel Task API achieves state-of-the-art accuracy on DeepSearchQA ] (https://parallel.ai/blog/deepsearch-qa) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/deepsearch-qa)

[Product release: Granular Basis Dec 16, 2025 ### \- [ Introducing Granular Basis for the Task API ] (https://parallel.ai/blog/granular-basis-task-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/granular-basis-task-api)

[How Amp’s coding agents build better software with Parallel Search Dec 11, 2025 ### \- [ How Amp’s coding agents build better software with Parallel Search ] (https://parallel.ai/blog/case-study-amp) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-amp)

[Latency improvements on the Parallel Task API Dec 10, 2025 ### \- [ Latency improvements on the Parallel Task API ] (https://parallel.ai/blog/task-api-latency) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/task-api-latency)

[Product release: Extract Nov 20, 2025 ### \- [ Introducing Parallel Extract ] (https://parallel.ai/blog/introducing-parallel-extract) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/introducing-parallel-extract)

[FindAll API - Product Release Nov 18, 2025 ### \- [ Introducing Parallel FindAll ] (https://parallel.ai/blog/introducing-findall-api) Tags: [Product](https://parallel.ai/blog?tag=product) , [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/introducing-findall-api)

[Product release: Monitor API Nov 13, 2025 ### \- [ Introducing Parallel Monitor ] (https://parallel.ai/blog/monitor-api-beta) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/monitor-api-beta)

[Parallel raises $100M Series A to build web infrastructure for agents Nov 12, 2025 ### \- [ Parallel raises $100M Series A to build web infrastructure for agents ] (https://parallel.ai/blog/series-a) Tags: [Company](https://parallel.ai/blog?tag=company) Author: By Parallel Web Systems](https://parallel.ai/blog/series-a)

[How Macroscope reduced code review false positives with Parallel Nov 11, 2025 ### \- [ How Macroscope reduced code review false positives with Parallel ] (https://parallel.ai/blog/case-study-macroscope) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-macroscope)

[Product release - Parallel Search API Nov 6, 2025 ### \- [ Introducing Parallel Search ] (https://parallel.ai/blog/parallel-search-api-beta) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-search-api-beta)

[Benchmarks: SealQA: Task API Nov 3, 2025 ### \- [ Parallel processors set new price-performance standard on SealQA benchmark ] (https://parallel.ai/blog/benchmarks-task-api-sealqa) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/benchmarks-task-api-sealqa)

[Introducing LLMTEXT, an open source toolkit for the llms.txt standard Oct 30, 2025 ### \- [ Introducing LLMTEXT, an open source toolkit for the llms.txt standard ] (https://parallel.ai/blog/LLMTEXT-for-llmstxt) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/LLMTEXT-for-llmstxt)

[Starbridge + Parallel Oct 23, 2025 ### \- [ How Starbridge powers public sector GTM with state-of-the-art web research ] (https://parallel.ai/blog/case-study-starbridge) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-starbridge)

[Building a market research platform with Parallel Deep Research Oct 22, 2025 ### \- [ Building a market research platform with Parallel Deep Research ] (https://parallel.ai/blog/cookbook-market-research-platform-with-parallel) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Parallel Web Systems](https://parallel.ai/blog/cookbook-market-research-platform-with-parallel)

[How Lindy brings state-of-the-art web research to automation flows Oct 17, 2025 ### \- [ How Lindy brings state-of-the-art web research to automation flows ] (https://parallel.ai/blog/case-study-lindy) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-lindy)

[Introducing the Parallel Task MCP Server Oct 16, 2025 ### \- [ Introducing the Parallel Task MCP Server ] (https://parallel.ai/blog/parallel-task-mcp-server) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-task-mcp-server)

[Introducing the Core2x Processor for improved compute control on the Task API Oct 9, 2025 ### \- [ Introducing the Core2x Processor for improved compute control on the Task API ] (https://parallel.ai/blog/core2x-processor) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/core2x-processor)

[How Day AI merges private and public data for business intelligence Oct 8, 2025 ### \- [ How Day AI merges private and public data for business intelligence ] (https://parallel.ai/blog/case-study-day-ai) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-day-ai)

[Full Basis framework for all Task API Processors Oct 7, 2025 ### \- [ Full Basis framework for all Task API Processors ] (https://parallel.ai/blog/full-basis-framework-for-task-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/full-basis-framework-for-task-api)

[Building a real-time streaming task manager with Parallel Oct 6, 2025 ### \- [ Building a real-time streaming task manager with Parallel ] (https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Parallel Web Systems](https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel)

[How Gumloop built a new AI automation framework with web intelligence as a core node Sep 30, 2025 ### \- [ How Gumloop built a new AI automation framework with web intelligence as a core node ] (https://parallel.ai/blog/case-study-gumloop) Tags: [Customers](https://parallel.ai/blog?tag=customers) Author: By Parallel Web Systems](https://parallel.ai/blog/case-study-gumloop)

[Introducing the TypeScript SDK Sep 16, 2025 ### \- [ Introducing the TypeScript SDK ] (https://parallel.ai/blog/typescript-sdk) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/typescript-sdk)

[Building a serverless competitive intelligence platform with MCP + Task API Sep 12, 2025 ### \- [ Building a serverless competitive intelligence platform with MCP + Task API ] (https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Parallel Web Systems](https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp)

[Introducing Parallel Deep Research reports Sep 11, 2025 ### \- [ Introducing Parallel Deep Research reports ] (https://parallel.ai/blog/deep-research-reports) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/deep-research-reports)

[BrowseComp / DeepResearch: Task API Sep 9, 2025 ### \- [ A new pareto-frontier for Deep Research price-performance ] (https://parallel.ai/blog/deep-research-benchmarks) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/deep-research-benchmarks)

[Building a Full-Stack Search Agent with Parallel and Cerebras Sep 5, 2025 ### \- [ Building a Full-Stack Search Agent with Parallel and Cerebras ] (https://parallel.ai/blog/cookbook-search-agent) Tags: [Developers](https://parallel.ai/blog?tag=developers) Author: By Parallel Web Systems](https://parallel.ai/blog/cookbook-search-agent)

[Webhooks for the Parallel Task API Aug 21, 2025 ### \- [ Webhooks for the Parallel Task API ] (https://parallel.ai/blog/webhooks) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/webhooks)

[Introducing Parallel: Web Search Infrastructure for AIs Aug 14, 2025 ### \- [ Introducing Parallel: Web Search Infrastructure for AIs ] (https://parallel.ai/blog/introducing-parallel) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) , [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/introducing-parallel)

[Introducing SSE for Task Runs Aug 7, 2025 ### \- [ Introducing SSE for Task Runs ] (https://parallel.ai/blog/sse-for-tasks) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/sse-for-tasks)

[A new line of advanced Processors: Ultra2x, Ultra4x, and Ultra8x Aug 5, 2025 ### \- [ A new line of advanced Processors: Ultra2x, Ultra4x, and Ultra8x ] (https://parallel.ai/blog/new-advanced-processors) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/new-advanced-processors)

[Introducing Auto Mode for the Parallel Task API Aug 4, 2025 ### \- [ Introducing Auto Mode for the Parallel Task API ] (https://parallel.ai/blog/task-api-auto-mode) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/task-api-auto-mode)

[A linear dithering of a search interface for agents Jul 31, 2025 ### \- [ A state-of-the-art search API purpose-built for agents ] (https://parallel.ai/blog/search-api-benchmark) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/search-api-benchmark)

[Parallel Search MCP Server in Devin Jul 31, 2025 ### \- [ Parallel Search MCP Server in Devin ] (https://parallel.ai/blog/parallel-search-mcp-in-devin) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-search-mcp-in-devin)

[Introducing Tool Calling via MCP Servers Jul 28, 2025 ### \- [ Introducing Tool Calling via MCP Servers ] (https://parallel.ai/blog/mcp-tool-calling) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/mcp-tool-calling)

[Starting today, Source Policy is available for both the Parallel Task API and Search API - giving you granular control over which sources your AI agents access and how results are prioritized. Jul 8, 2025 ### \- [ Introducing Source Policy ] (https://parallel.ai/blog/source-policy) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/source-policy)

[The Parallel Task Group API Jul 2, 2025 ### \- [ The Parallel Task Group API ] (https://parallel.ai/blog/task-group-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/task-group-api)

[State of the Art Deep Research APIs Jun 17, 2025 ### \- [ State of the Art Deep Research APIs ] (https://parallel.ai/blog/deep-research-browsecomp) Tags: [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/deep-research-browsecomp)

[Introducing the Parallel Search API Jun 10, 2025 ### \- [ Parallel Search API is now available in alpha ] (https://parallel.ai/blog/search-api-alpha) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/search-api-alpha)

[Introducing the Parallel Chat API - a low latency web research API for web based LLM completions. The Parallel Chat API returns completions in text and structured JSON format, and is OpenAI Chat Completions compatible. May 30, 2025 ### \- [ Introducing the Parallel Chat API ] (https://parallel.ai/blog/chat-api) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/chat-api)

[Parallel Web Systems introduces Basis with calibrated confidences - a new verification framework for AI web research and search API outputs that sets a new industry standard for transparent and reliable deep research. May 16, 2025 ### \- [ Introducing Basis with Calibrated Confidences ] (https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) Tags: [Product](https://parallel.ai/blog?tag=product) Author: By Parallel Web Systems](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences)

[The Parallel Task API is a state-of-the-art system for automated web research that delivers the highest accuracy at every price point. Apr 24, 2025 ### \- [ Introducing the Parallel Task API ] (https://parallel.ai/blog/parallel-task-api) Tags: [Product](https://parallel.ai/blog?tag=product) , [Benchmarks](https://parallel.ai/blog?tag=benchmarks) Author: By Parallel Web Systems](https://parallel.ai/blog/parallel-task-api)
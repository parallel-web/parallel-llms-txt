Human Machine

# \# How Opendoor uses Parallel as the enterprise grade web research layer powering its AI-native real estate operations

Opendoor (NASDAQ: OPEN), the leading digital platform for residential real estate, uses Parallel's web research APIs to automate accuracy-critical investigations across its core operations. Starting with an HOA research workflow, Parallel transforms a 10-minute manual process into a two-minute verification step, ensuring every transaction is backed by production grade web data.

Tags: Case Study

Reading time: 6 min

## \## Key impact

* \- Parallel serves as the web research layer within Opendoor's AI-native operations, handling the open-ended web investigation tasks that are central to buying and selling thousands of homes
* \- The flagship integration, automated HOA research, uses Parallel's Task API to autonomously determine HOA status, identify management companies, and surface county court records from a single API call
* \- HOA research time dropped from approximately 10 minutes of manual work to roughly 2 minutes of verification
* \- Parallel delivers reliable high accuracy results that hold in production across messy, real-world web workflows, not just controlled benchmarks

## \## Real estate runs on the web, and Parallel helps Opendoor conduct the hardest real estate web research at unprecedented scale

Residential real estate is, at its core, a web-intensive industry. Buying and selling homes requires constant interaction with fragmented online data: government portals, county records, HOA filings, listing databases, title documents, and regulatory disclosures spread across thousands of state, county, and municipal websites with no standardization between them.

For a company operating at Opendoor's scale, this creates a compounding problem. Every transaction generates dozens of small research tasks, each requiring someone to navigate unfamiliar web infrastructure, synthesize information from multiple sources, and produce a structured assessment. The research is complex, time-consuming, repetitive, and difficult to automate with traditional tools because the web sources vary so widely from state to state and county to county.

Parallel's Web Agent APIs are purpose-built for exactly this kind of complex and accuracy critical work. Rather than requiring Opendoor to build and maintain scrapers for every government portal across the country, Parallel's Task API handles open-ended web investigation autonomously: it identifies the right sources, navigates to them, extracts the relevant data, and returns structured verifiable outputs that fit directly into Opendoor's existing systems.

## \## Web intelligence in production: accurate and automated HOA research

### \### **\*\* The problem \*\***

Every real estate transaction involving a homeowners association requires the same set of deceptively difficult questions answered: Does this property have an HOA? Which one? Who manages it? Are there any active lawsuits?

Before Parallel, Opendoor researchers answered these questions manually. The process involved Googling property addresses, cross-referencing listing sites, searching for nearby homes that may have recently sold for clues about HOA membership, and then hunting down the management company through a maze of state-specific portals and association websites.

The hardest part wasn't any single step. It was the cumulative ambiguity. A property might have two HOAs. The management company might only appear in a Secretary of State filing. Active litigation might be buried in a county court system that requires knowing the right jurisdiction to search.

Each property was a small research project, and the answers mattered: in title and escrow, an undetected HOA or active lawsuit can directly affect financial decisions made at closing. Accuracy isn’t optional.

The workflow averaged around 10 minutes per property. Across thousands of transactions, that represented a significant operational cost.

![](https://cdn.sanity.io/images/5hzduz3y/production/0331238623524ba4676f23e2309b2953391d4b28-3240x3240.jpg)

## \## Why Parallel

Opendoor needed more than a web search API. The HOA research workflow isn't a simple lookup. It requires navigating state-specific government portals, cross-referencing multiple sources, and synthesizing findings into a structured assessment. For a public company operating at this scale, the stakes of a missed HOA or an undetected lawsuit are real, which meant accuracy wasn't a differentiator, it was the requirement.

The team ran a bake-off across multiple providers. Parallel's Task API with the ultra processor was the only solution that consistently met their accuracy bar on real-world HOA queries—not on synthetic benchmarks, but on the hard, ambiguous cases that appear in production every day. Parallel also met Opendoor's enterprise requirements: SOC-II Type 2 certification, SSO support, granular user permissions, and the data protection standards expected of a company managing sensitive transaction data at scale.

> > "We've done a bake-off on this particular use case. Parallel is by far the most accurate."
> 
>

> > — Yan Lhert, Software Engineer, Opendoor
> 
>

## \## How it works

**\*\* Structured HOA investigation from a single API call. \*\*** For every property that enters Opendoor's pipeline, an API call kicks off a Task API research job using Parallel's ultra processor. The prompt includes the property address and any available context from the real estate contract. Parallel returns structured JSON covering HOA existence, association names, management companies, contact information, and relevant filings, which Opendoor compiles into an internal report and attaches to the transaction file as a PDF.

![](https://cdn.sanity.io/images/5hzduz3y/production/e372dac03463ae8f7f9876fd33995897db360843-3240x3240.jpg)

**\*\* Autonomous navigation of government infrastructure. \*\*** What distinguishes this workflow is Parallel's ability to navigate complex, state-specific web systems without any explicit training on those portals. Given only a property address, Parallel identifies the relevant state's Secretary of State website, enters the address into the search portal, and extracts registration details about the HOA. The same applies to county court systems: Parallel determines the correct jurisdiction, queries for the HOA name, and returns structured details about any active litigation.

> > "We're just giving it a property address. Parallel goes to the Secretary of State website for that state, enters the property address into the portal, finds the results, and pulls out the information. We never trained it to do this."
> 
>

## \## **\*\* The impact \*\***

The integration changed the nature of the work. Opendoor researchers no longer start from scratch on every property. Instead, they review and verify Parallel's findings, following up by phone only when a property has no online presence or when the results need human confirmation. The team now allocates roughly two minutes per property for what was previously a 10-minute task.

![](https://cdn.sanity.io/images/5hzduz3y/production/20e977f8bd24678b8f5689d43cffc7c66eea6703-1926x1796.png)

What makes this meaningful isn't just the time savings, it's that the accuracy holds on the hardest cases. HOA research isn't difficult because the questions are complex; it's difficult because the answers are buried in inconsistent, jurisdiction-specific sources where a wrong result has real consequences. Parallel's performance on those edge cases is what made production deployment viable.

> > "The fact that it can find the right county court system, pull the relevant cases, and structure that into usable data is genuinely mind-blowing. It surfaces things we never would have found on our own."
> 
>

## \## What's next

HOA research is the first production workflow, but it represents a broader theme. Across Opendoor, teams are identifying use cases where structured web research can replace manual processes, from property-level due diligence to regulatory compliance checks that vary by jurisdiction. Parallel's role as the web research layer positions it to support these mission-critical workflows, with the highest possible bar of enterprise-grade quality and verifiability.

By Parallel

March 25, 2026

### \## Related Posts 64

[### \- [ How Actively's Per Account Agents use Parallel to turn the entire web into a proactive sales intelligence layer ] (https://parallel.ai/blog/case-study-actively) Tags: Case Study Reading time: 6 min](/blog/case-study-actively)

[### \- [ Parallel Raises at $2 Billion Valuation to Scale Web Infrastructure for Agents ] (https://parallel.ai/blog/series-b) Tags: Fundraise Reading time: 2 min](/blog/series-b)

[### \- [ Building a free CLI agent with Pi, Ollama, Gemma 4, and Parallel ] (https://parallel.ai/blog/free-CLI-agent) Tags: Cookbook Reading time: 4 min](/blog/free-CLI-agent)

[### \- [ Parallel Search is now free for agents via MCP ] (https://parallel.ai/blog/free-web-search-mcp) Reading time: 2 min](/blog/free-web-search-mcp)

[### \- [ Upgrades to the Parallel Search & Extract APIs ] (https://parallel.ai/blog/parallel-search-extract-ga) Tags: Benchmarks Reading time: 5 min](/blog/parallel-search-extract-ga)

[### \- [ How Finch is scaling plaintiff law with AI agents that research like associates ] (https://parallel.ai/blog/case-study-finch) Tags: Case Study Reading time: 3 min](/blog/case-study-finch)

[### \- [ Genpact and Parallel Web Systems Partner to Drive Tangible Efficiency from AI Systems ] (https://parallel.ai/blog/genpact-parallel-partnership) Tags: Partnership Reading time: 4 min](/blog/genpact-parallel-partnership)

[### \- [ How Genpact helps top US insurers cut contents claims processing times in half with Parallel ] (https://parallel.ai/blog/case-study-genpact) Tags: Case Study Reading time: 4 min](/blog/case-study-genpact)

[### \- [ A new deep research frontier on DeepSearchQA with the Task API Harness ] (https://parallel.ai/blog/deepsearchqa-taskapi-harness) Tags: Benchmarks Reading time: 7 min](/blog/deepsearchqa-taskapi-harness)

[### \- [ How Modal saves tens of thousands annually by building in-house GTM pipelines with Parallel ] (https://parallel.ai/blog/case-study-modal) Tags: Case Study Reading time: 4 min](/blog/case-study-modal)

[### \- [ Introducing stateful web research agents with multi-turn conversations ] (https://parallel.ai/blog/task-api-interactions) Tags: Product Release Reading time: 3 min](/blog/task-api-interactions)

[### \- [ Parallel is live on Tempo, now available natively to agents with the Machine Payments Protocol ] (https://parallel.ai/blog/tempo-stripe-mpp) Tags: Partnership Reading time: 4 min](/blog/tempo-stripe-mpp)

[### \- [ How Parallel helped Kepler build AI that finance professionals can actually trust ] (https://parallel.ai/blog/case-study-kepler) Tags: Case Study Reading time: 5 min](/blog/case-study-kepler)

[### \- [ Introducing the Parallel CLI ] (https://parallel.ai/blog/parallel-cli) Tags: Product Release Reading time: 3 min](/blog/parallel-cli)

[### \- [ How Profound helps brands win AI Search with high-quality web research and content creation powered by Parallel ] (https://parallel.ai/blog/case-study-profound) Tags: Case Study Reading time: 4 min](/blog/case-study-profound)

[### \- [ How Harvey is expanding legal AI internationally with Parallel ] (https://parallel.ai/blog/case-study-harvey) Tags: Case Study Reading time: 3 min](/blog/case-study-harvey)

[### \- [ How Tabstack by Mozilla enables agents to navigate the web with Parallel’s best-in-class web search ] (https://parallel.ai/blog/case-study-tabstack) Tags: Case Study Reading time: 5 min](/blog/case-study-tabstack)

[### \- [ Parallel Web Tools and Agents now available across Vercel AI Gateway, AI SDK, and Marketplace ] (https://parallel.ai/blog/vercel) Tags: Product Release Reading time: 3 min](/blog/vercel)

[### \- [ Authenticated page access for the Parallel Task API ] (https://parallel.ai/blog/authenticated-page-access) Tags: Product Release Reading time: 3 min](/blog/authenticated-page-access)

[### \- [ Introducing structured outputs for the Monitor API ] (https://parallel.ai/blog/structured-outputs-monitor) Tags: Product Release Reading time: 3 min](/blog/structured-outputs-monitor)

[### \- [ Introducing research models with Basis for the Parallel Chat API ] (https://parallel.ai/blog/research-models-chat) Tags: Product Release Reading time: 2 min](/blog/research-models-chat)

[### \- [ Build a real-time fact checker with Parallel and Cerebras ] (https://parallel.ai/blog/cerebras-fact-checker) Tags: Cookbook Reading time: 5 min](/blog/cerebras-fact-checker)

[### \- [ Parallel Task API achieves state-of-the-art accuracy on DeepSearchQA ] (https://parallel.ai/blog/deepsearch-qa) Tags: Benchmarks Reading time: 3 min](/blog/deepsearch-qa)

[### \- [ Introducing Granular Basis for the Task API ] (https://parallel.ai/blog/granular-basis-task-api) Tags: Product Release Reading time: 3 min](/blog/granular-basis-task-api)

[### \- [ How Amp’s coding agents build better software with Parallel Search ] (https://parallel.ai/blog/case-study-amp) Tags: Case Study Reading time: 3 min](/blog/case-study-amp)

[### \- [ Latency improvements on the Parallel Task API ] (https://parallel.ai/blog/task-api-latency) Tags: Product Release Reading time: 3 min](/blog/task-api-latency)

[### \- [ Introducing Parallel Extract ] (https://parallel.ai/blog/introducing-parallel-extract) Tags: Product Release Reading time: 2 min](/blog/introducing-parallel-extract)

[### \- [ Introducing Parallel FindAll ] (https://parallel.ai/blog/introducing-findall-api) Tags: Product Release , Benchmarks Reading time: 4 min](/blog/introducing-findall-api)

[### \- [ Introducing Parallel Monitor ] (https://parallel.ai/blog/monitor-api) Tags: Product Release Reading time: 3 min](/blog/monitor-api)

[### \- [ Parallel raises $100M Series A to build web infrastructure for agents ] (https://parallel.ai/blog/series-a) Tags: Fundraise Reading time: 3 min](/blog/series-a)

[### \- [ How Macroscope reduced code review false positives with Parallel ] (https://parallel.ai/blog/case-study-macroscope) Reading time: 2 min](/blog/case-study-macroscope)

[### \- [ Introducing Parallel Search ] (https://parallel.ai/blog/introducing-parallel-search) Tags: Benchmarks Reading time: 7 min](/blog/introducing-parallel-search)

[### \- [ Parallel processors set new price-performance standard on SealQA benchmark ] (https://parallel.ai/blog/benchmarks-task-api-sealqa) Tags: Benchmarks Reading time: 3 min](/blog/benchmarks-task-api-sealqa)

[### \- [ Introducing LLMTEXT, an open source toolkit for the llms.txt standard ] (https://parallel.ai/blog/LLMTEXT-for-llmstxt) Tags: Product Release Reading time: 7 min](/blog/LLMTEXT-for-llmstxt)

[### \- [ How Starbridge powers public sector GTM with state-of-the-art web research ] (https://parallel.ai/blog/case-study-starbridge) Tags: Case Study Reading time: 4 min](/blog/case-study-starbridge)

[### \- [ Building a market research platform with Parallel Deep Research ] (https://parallel.ai/blog/cookbook-market-research-platform-with-parallel) Tags: Cookbook Reading time: 4 min](/blog/cookbook-market-research-platform-with-parallel)

[### \- [ How Lindy brings state-of-the-art web research to automation flows ] (https://parallel.ai/blog/case-study-lindy) Tags: Case Study Reading time: 3 min](/blog/case-study-lindy)

[### \- [ Introducing the Parallel Task MCP Server ] (https://parallel.ai/blog/parallel-task-mcp-server) Tags: Product Release Reading time: 4 min](/blog/parallel-task-mcp-server)

[### \- [ Introducing the Core2x Processor for improved compute control on the Task API ] (https://parallel.ai/blog/core2x-processor) Tags: Product Release Reading time: 2 min](/blog/core2x-processor)

[### \- [ How Day AI merges private and public data for business intelligence ] (https://parallel.ai/blog/case-study-day-ai) Tags: Case Study Reading time: 4 min](/blog/case-study-day-ai)

[### \- [ Full Basis framework for all Task API Processors ] (https://parallel.ai/blog/full-basis-framework-for-task-api) Tags: Product Release Reading time: 2 min](/blog/full-basis-framework-for-task-api)

[### \- [ Building a real-time streaming task manager with Parallel ] (https://parallel.ai/blog/cookbook-sse-task-manager-with-parallel) Tags: Cookbook Reading time: 5 min](/blog/cookbook-sse-task-manager-with-parallel)

[### \- [ How Gumloop built a new AI automation framework with web intelligence as a core node ] (https://parallel.ai/blog/case-study-gumloop) Tags: Case Study Reading time: 3 min](/blog/case-study-gumloop)

[### \- [ Introducing the TypeScript SDK ] (https://parallel.ai/blog/typescript-sdk) Tags: Product Release Reading time: 1 min](/blog/typescript-sdk)

[### \- [ Building a serverless competitive intelligence platform with MCP + Task API ] (https://parallel.ai/blog/cookbook-competitor-research-with-reddit-mcp) Tags: Cookbook Reading time: 6 min](/blog/cookbook-competitor-research-with-reddit-mcp)

[### \- [ Introducing Parallel Deep Research reports ] (https://parallel.ai/blog/deep-research-reports) Tags: Product Release Reading time: 2 min](/blog/deep-research-reports)

[### \- [ A new pareto-frontier for Deep Research price-performance ] (https://parallel.ai/blog/deep-research-benchmarks) Tags: Benchmarks Reading time: 4 min](/blog/deep-research-benchmarks)

[### \- [ Building a Full-Stack Search Agent with Parallel and Cerebras ] (https://parallel.ai/blog/cookbook-search-agent) Tags: Cookbook Reading time: 5 min](/blog/cookbook-search-agent)

[### \- [ Webhooks for the Parallel Task API ] (https://parallel.ai/blog/webhooks) Tags: Product Release Reading time: 2 min](/blog/webhooks)

[### \- [ Introducing Parallel: Web Search Infrastructure for AIs ] (https://parallel.ai/blog/introducing-parallel) Tags: Benchmarks , Product Release Reading time: 6 min](/blog/introducing-parallel)

[### \- [ Introducing SSE for Task Runs ] (https://parallel.ai/blog/sse-for-tasks) Tags: Product Release Reading time: 2 min](/blog/sse-for-tasks)

[### \- [ A new line of advanced Processors: Ultra2x, Ultra4x, and Ultra8x ] (https://parallel.ai/blog/new-advanced-processors) Tags: Product Release Reading time: 2 min](/blog/new-advanced-processors)

[### \- [ Introducing Auto Mode for the Parallel Task API ] (https://parallel.ai/blog/task-api-auto-mode) Tags: Product Release Reading time: 1 min](/blog/task-api-auto-mode)

[### \- [ A state-of-the-art search API purpose-built for agents ] (https://parallel.ai/blog/search-api-benchmark) Tags: Benchmarks Reading time: 3 min](/blog/search-api-benchmark)

[### \- [ Parallel Search MCP Server in Devin ] (https://parallel.ai/blog/parallel-search-mcp-in-devin) Tags: Product Release Reading time: 2 min](/blog/parallel-search-mcp-in-devin)

[### \- [ Introducing Tool Calling via MCP Servers ] (https://parallel.ai/blog/mcp-tool-calling) Tags: Product Release Reading time: 2 min](/blog/mcp-tool-calling)

[### \- [ Introducing the Parallel Search MCP Server ] (https://parallel.ai/blog/search-mcp-server) Tags: Product Release Reading time: 2 min](/blog/search-mcp-server)

[### \- [ Introducing Source Policy ] (https://parallel.ai/blog/source-policy) Tags: Product Release Reading time: 1 min](/blog/source-policy)

[### \- [ The Parallel Task Group API ] (https://parallel.ai/blog/task-group-api) Tags: Product Release Reading time: 1 min](/blog/task-group-api)

[### \- [ State of the Art Deep Research APIs ] (https://parallel.ai/blog/deep-research) Tags: Benchmarks Reading time: 3 min](/blog/deep-research)

[### \- [ Parallel Search API is now available in alpha ] (https://parallel.ai/blog/parallel-search-api) Tags: Product Release Reading time: 2 min](/blog/parallel-search-api)

[### \- [ Introducing the Parallel Chat API ] (https://parallel.ai/blog/chat-api) Tags: Product Release Reading time: 1 min](/blog/chat-api)

[### \- [ Introducing Basis with Calibrated Confidences ] (https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) Tags: Product Release Reading time: 4 min](/blog/introducing-basis-with-calibrated-confidences)

[### \- [ Introducing the Parallel Task API ] (https://parallel.ai/blog/parallel-task-api) Tags: Product Release , Benchmarks Reading time: 4 min](/blog/parallel-task-api)

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* hello@parallel.ai [[hello@parallel.ai] (mailto:hello@parallel.ai)](mailto:hello@parallel.ai)

### Products

* [Search API](https://docs.parallel.ai/search/search-quickstart) [[Search API] (https://docs.parallel.ai/search/search-quickstart)](https://docs.parallel.ai/search/search-quickstart)
* [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [[Extract API] (https://docs.parallel.ai/extract/extract-quickstart)](https://docs.parallel.ai/extract/extract-quickstart)
* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [[Task API] (https://docs.parallel.ai/task-api/task-quickstart)](https://docs.parallel.ai/task-api/task-quickstart)
* [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [[FindAll API] (https://docs.parallel.ai/findall-api/findall-quickstart)](https://docs.parallel.ai/findall-api/findall-quickstart)
* [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [[Chat API] (https://docs.parallel.ai/chat-api/chat-quickstart)](https://docs.parallel.ai/chat-api/chat-quickstart)
* [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) [[Monitor API] (https://docs.parallel.ai/monitor-api/monitor-quickstart)](https://docs.parallel.ai/monitor-api/monitor-quickstart)

### Resources

* About [[About] (https://parallel.ai/about)](/ai/about)
* Pricing [[Pricing] (https://parallel.ai/pricing)](/ai/pricing)
* [Docs](https://docs.parallel.ai) [[Docs] (https://docs.parallel.ai)](https://docs.parallel.ai)
* Blog [[Blog] (https://parallel.ai/blog)](/ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [[Changelog] (https://docs.parallel.ai/resources/changelog)](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [[Careers] (https://jobs.ashbyhq.com/parallel)](https://jobs.ashbyhq.com/parallel)

### Info

* Terms of Service [[Terms of Service] (https://parallel.ai/terms-of-service)](/ai/terms-of-service)
* Customer Terms [[Customer Terms] (https://parallel.ai/customer-terms)](/ai/customer-terms)
* Privacy [[Privacy] (https://parallel.ai/privacy-policy)](/ai/privacy-policy)
* Acceptable Use [[Acceptable Use] (https://parallel.ai/acceptable-use-policy)](/ai/acceptable-use-policy)
* [Trust Center](https://trust.parallel.ai/) [[Trust Center] (https://trust.parallel.ai/)](https://trust.parallel.ai/)
* Report Security Issue [[Report Security Issue] (mailto:security@parallel.ai)](mailto:security@parallel.ai)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [[LinkedIn] (https://www.linkedin.com/company/parallel-web/about/)](https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [[Twitter] (https://x.com/p0)](https://x.com/p0) [GitHub](https://github.com/parallel-web) [[GitHub] (https://github.com/parallel-web)](https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

Parallel Web Systems Inc. 2026
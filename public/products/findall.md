Human Machine

FindAll API

# \# Find the best data for your

\## Discover and catalogue any set of entities from a single natural language web query

[Try FindAll F](https://platform.parallel.ai/play/find-all) [[Try FindAll] (https://platform.parallel.ai/play/find-all)](https://platform.parallel.ai/play/find-all) [Contact us C](https://form.fillout.com/t/rv6fubdwwuus) [[Contact us] (https://form.fillout.com/t/rv6fubdwwuus)](https://form.fillout.com/t/rv6fubdwwuus)

Find all

## \## Stop buying stale data

Create dynamic datasets on demand

FindAll discovers and structures any set of entities: companies, people, properties, or events, from a single natural language query

Build lead lists, source deals, map markets, and create custom datasets in minutes instead of weeks

[Get started](https://platform.parallel.ai/play/find-all) [[Get started] (https://platform.parallel.ai/play/find-all)](https://platform.parallel.ai/play/find-all)

F

Find all companies with that do

ID

1

5

6

2

Entity

## \## Effortlessly extend your datasets

Use the FindAll API to discover entities based on your specified criteria

Then use the Task API to enrich your data with new columns that expand the depth of your database

[Get started](https://platform.parallel.ai/play/find-all) [[Get started] (https://platform.parallel.ai/play/find-all)](https://platform.parallel.ai/play/find-all)

F

ID

Entities

Product releases

SOC 2 status

1

2

3

4

5

6

7

## Match compute budget with query difficulty

Not every dataset requires the same depth. FindAll offers tiered [Processors and Generators](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing) [[Processors and Generators] (https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing)](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing) that let you match AI compute to research complexity, optimizing for cost, speed, and thoroughness.

The best recall at every price point. From simple lookups to analyst-grade research.

[See more benchmarks P](https://parallel.ai/benchmarks) [[See more benchmarks] (https://parallel.ai/benchmarks)](/ai/benchmarks)

WISER-FindAll

[COST (CPM) RECALL (%) Loading chart...](https://docs.parallel.ai/findall-api/findall-quickstart)

CPM: USD per 1000 requests. Cost is shown on a Log scale.

Parallel

Others

BrowseComp benchmark analysis: CPM: USD per 1000 requests. Cost is shown on a Log scale. . Evaluation shows Parallel's enterprise deep research API for AI agents achieving up to 48% accuracy, outperforming GPT-4 browsing (1%), Claude search (6%), Exa (14%), and Perplexity (8%). Enterprise-grade structured deep research performance across Cost (CPM) and Recall (%). State-of-the-art enterprise deep research API with structured data extraction built for ChatGPT deep research and complex multi-hop AI agent workflows.

### \### Benchmark

This benchmark, created by Parallel, contains 40 complex multi-criteria queries covering public companies, startups, SMBs, specialized entities, and people (e.g., executives, researchers, professionals).

### \### Methodology

To measure recall we take the number of correct matches / total entities in the ground truth dataset. The ground truth dataset is created by taking the union of all correct matches across the competitor set. Cost is calculated as the average cost to find 1000 correct matches.

### \### Testing dates

Nov 13th-17th, 2025

## \## Match compute budget with query difficulty

Not every dataset requires the same depth. FindAll offers tiered [Processors and Generators](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing) [[Processors and Generators] (https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing)](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing) that let you match AI compute to research complexity, optimizing for cost, speed, and thoroughness.

The best recall at every price point. From simple lookups to analyst-grade research.

[See more benchmarks P](https://parallel.ai/benchmarks) [[See more benchmarks] (https://parallel.ai/benchmarks)](/ai/benchmarks)

## \### Parallel-FindAll

```
| Series   | Model                   | Cost (CPM) | Recall (%) |
| -------- | ----------------------- | ---------- | ---------- |
| Parallel | FindAll Base            | 60         | 30.3       |
| Parallel | FindAll Core            | 230        | 52.5       |
| Parallel | FindAll Pro             | 1430       | 61.3       |
| Others   | OpenAI Deep Research    | 250        | 21         |
| Others   | Anthropic Deep Research | 1000       | 15.3       |
| Others   | Exa                     | 110        | 19.2       |
```

CPM: USD per 1000 requests. Cost is shown on a Log scale.

### \### Benchmark

This benchmark, created by Parallel, contains 40 complex multi-criteria queries covering public companies, startups, SMBs, specialized entities, and people (e.g., executives, researchers, professionals).

### \### Methodology

To measure recall we take the number of correct matches / total entities in the ground truth dataset. The ground truth dataset is created by taking the union of all correct matches across the competitor set. Cost is calculated as the average cost to find 1000 correct matches.

### \### Testing dates

Nov 13th-17th, 2025

## Apply FindAll to a broad range of business needs

FindAll powers any workflow that starts with "Find all the..."

Find all companies that are GDPR-compliant and operate in more than three countries

Find all companies in California which are SOC-2 compliant

Find all residential roofing companies in Palo Alto

Find all companies that increased their market cap by more than 20% in the past year

Find all companies founded after 2020, and whose founders are former Google researchers

Find all dental practices in California that are currently accepting new patients

Find all companies that hired a new CFO in the past 6 months and are based in USA

Example queries

### 1\. Build hyper-targeted lead lists

Go beyond firmographics. Find companies based on signals that actually matter—recent leadership changes, technology adoption, expansion announcements, or any criteria specific to your ICP.

### 2\. Find acquisition or investment opportunities

Identify acquisition targets, investment opportunities, and market entrants based on precise criteria—funding stage, employee count, geography, partnerships, or competitive positioning.

### 3\. Map markets in real time

Track new entrants, monitor competitor movements, and build comprehensive market landscapes. Update your maps continuously as the market evolves.

### 4\. Find suppliers that meet your exact requirements

Discover manufacturers, service providers, and partners filtered by location, capacity, certifications, or any other criteria critical to your operations.

### 5\. Monitor regulatory and legal landscapes

Track litigation, enforcement actions, regulatory filings, and compliance-relevant events across jurisdictions and industries.

### Build hyper-targeted lead lists

Go beyond firmographics. Find companies based on signals that actually matter—recent leadership changes, technology adoption, expansion announcements, or any criteria specific to your ICP.

1/5

# \# Get started

with just a few lines of code

[Try FindAll F](https://platform.parallel.ai/play/find-all) [[Try FindAll] (https://platform.parallel.ai/play/find-all)](https://platform.parallel.ai/play/find-all) [Docs](https://docs.parallel.ai/findall-api/findall-quickstart) [[Docs] (https://docs.parallel.ai/findall-api/findall-quickstart)](https://docs.parallel.ai/findall-api/findall-quickstart)

cURL Python TypeScript

Copy

```
from  parallel  import  Parallel

client = Parallel(api_key= "YOUR_API_KEY" )

findall_run = client.beta.findall.create(
    objective= "FindAll portfolio companies of Khosla Ventures founded after 2020" ,
    entity_type= "companies" ,
    match_conditions=[
        {
             "name" :  "khosla_ventures_portfolio_check" ,
             "description" :  "Company must be a portfolio company of Khosla Ventures." 
        },
        {
             "name" :  "founded_after_2020_check" ,
             "description" :  "Company must have been founded after 2020." 
        }
    ],
    generator= "core" ,
    match_limit= 5 
)
```

## \## FAQ

\+ − How much does it cost to use FindAll?

FindAll pricing combines a fixed cost per run with a per-match cost, both determined by your chosen _\_ Generator. \__ If you add enrichments to extract additional data from matches, those add per-match costs based on the Task API processor tier you select.

Learn more about Generators here: <https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing> [[https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing] (https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing)](https://docs.parallel.ai/findall-api/core-concepts/findall-generator-pricing)

\+ − What is the FindAll API?

FindAll is an API that discovers and returns structured datasets of entities—companies, people, properties, events, and more—from across the web based on natural language queries with multi-criteria filters. It transforms the web into an on-demand database tailored to your specific requirements.

\+ − What types of entities can FindAll discover?

FindAll can find virtually any type of entity that exists on the web: companies (public, private, startups, SMBs), people (executives, researchers, professionals), real estate properties, events, products, legal cases, academic papers, and more. If information about it exists on the web, FindAll can discover and structure it.

\+ − How is FindAll different from traditional data providers?

Traditional data providers sell pre-built, static datasets that become stale quickly and may not match your specific criteria. FindAll generates datasets on demand based on your exact requirements, sourced from the live web. Your criteria can be as specific or complex as needed, and you can regenerate datasets whenever you need fresh data.

\+ − How is FindAll different from web scraping?

Web scraping requires you to identify target sites, build and maintain extraction code, handle anti-bot measures, and structure the output yourself. FindAll handles all of this automatically—you simply describe what you're looking for in natural language, and receive structured, verified results. No infrastructure to maintain, no code to update when sites change.

\+ − Does FindAll support complex, compound queries?

Yes, Parallel supports “multi-hop” reasoning. This means FindAll can evaluate match criteria that require synthesizing information from multiple web sources. For example, to match "healthcare startups with Series A funding and FDA-approved products," FindAll might need to verify the company's industry from one source, funding status from another, and FDA approval from a third. This enables complex, compound queries that simple keyword search cannot handle.

\+ − How accurate is FindAll?

In benchmarks against OpenAI Deep Research, Anthropic Deep Research, and Exa, FindAll Pro achieved 61% recall—approximately 3× higher than alternatives. Recall measures the proportion of all correct matches that FindAll successfully identifies. Every result includes citations, source excerpts, and confidence scores so you can verify accuracy for your use case.

\+ − What are citations and confidence scores?

Every entity FindAll returns includes the sources used to verify it matches your criteria, excerpts from those sources, the reasoning behind the match decision, and a confidence score indicating how certain the match is. This enables human-in-the-loop verification workflows and provides full provenance for compliance-sensitive applications.

\+ − Can I extract additional data about matched entities?

Yes. FindAll includes an enrichment capability that extracts additional structured fields from matched entities—revenue, employee count, technology stack, recent news, strategic initiatives, or any other attribute you specify. Enrichments are powered by the Parallel Task API and can be made to run automatically on every match.

\+ − What's the difference between FindAll Base, Core, and Pro?

FindAll offers multiple tiers optimized for different use cases. Base is the most cost-effective option for broad queries with many expected matches. Core balances cost and thoroughness for moderately specific queries. Pro provides the most comprehensive search for highly specific queries with rare or hard-to-find matches. See our documentation for detailed guidance on choosing the right tier.

\+ − How do I get started with FindAll?

You can test FindAll immediately in our Playground without writing any code. When you're ready to integrate, our documentation provides complete API references, code examples, and best practices for production use.

\+ − Is there a way to test queries before running a full search?

Yes. FindAll offers a Preview mode that runs your query against approximately 10 candidates so you can validate your approach and estimate match volume before committing to a full run.

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

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [[LinkedIn] (https://www.linkedin.com/company/parallel-web/about/)](https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [[Twitter] (https://x.com/p0)](https://x.com/p0) [GitHub](https://github.com/parallel-web) [[GitHub] (https://github.com/parallel-web)](https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2026
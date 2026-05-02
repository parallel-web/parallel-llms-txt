Human Machine

# \# Exa Websets vs. Parallel FindAll API: A comprehensive comparison

Entity discovery and data enrichment are becoming critical capabilities for AI-native applications. Two APIs have emerged as leading options: Parallel's FindAll API and Exa's Websets with Enrichments. This article breaks down how they compare across architecture, features, pricing, and ideal use cases.

Tags: Comparison

Reading time: 6 min

## \## **\*\* What each product does \*\***

### \### **\*\* Parallel FindAll API \*\***

Parallel FindAll API is a web-scale entity discovery system that turns natural language queries into structured, enriched datasets. You describe what you're looking for in plain English ("Find all dental practices in Ohio with 4+ star Google reviews") and FindAll returns a structured table of matching entities, complete with citations and confidence scores.

FindAll is part of Parallel's broader Web Agent API suite, which also includes the Task API (for enrichment), Search API, and Monitor API. It launched in late 2025 and is currently in public beta.

### \### **\*\* Exa Websets \*\***

Exa Websets is Exa's high-compute web search product designed for complex queries that return hundreds or thousands of results. Built on top of Exa's embeddings-based search engine, Websets finds entities matching your criteria and then allows you to layer on enrichments: additional columns of data that an AI agent researches and fills in for each result.

Exa is used by companies like Databricks, Flatfile, OpenRouter, and StackAI for its core Search API. Cursor integrates Exa as a plugin in its marketplace. Websets is the newer, higher-level product built on that foundation.

## \## **\*\* Architecture and how they work \*\***

### \### **\*\* Parallel FindAll: three-stage pipeline \*\***

FindAll executes a structured three-stage pipeline:

**\*\* Candidate generation. \*\*** Searches Parallel's proprietary web index to identify potential entities matching your query. Unlike traditional search, it generates candidates dynamically based on your specific criteria.

**\*\* Match evaluation. \*\*** Each candidate is evaluated against your match conditions using multi-hop reasoning across web sources. Candidates that satisfy all conditions reach "matched" status; the rest are marked "unmatched."

**\*\* Structured enrichment. \*\*** Matched entities can be enriched with additional fields via Parallel's Task API. Enrichments can be added at creation time or retroactively, even on completed runs.

This separation between match conditions (boolean/filterable criteria that determine inclusion) and enrichments (arbitrary data extraction that doesn't affect matching) is a key architectural choice. You filter first, then enrich only the matches, which keeps costs down.

### \### **\*\* Exa Websets: search + enrichment columns \*\***

Exa Websets works differently:

**\*\* Search. \*\*** A natural language query is processed through Exa's embeddings-based search engine, which finds web pages matching your criteria. Results are returned as items in a "Webset."

**\*\* Enrichment. \*\*** You define enrichment columns (text, date, number, options, email, phone, or URL) that an AI agent researches and populates for each item. Enrichments can be created via the API or through the dashboard's chat interface.

Exa's approach is more tightly coupled. There isn't an explicit "match evaluation" stage with multi-hop reasoning. The search engine finds candidates, and enrichments add data. Filtering happens primarily at the search level, with criteria used to verify matches.

## \## **\*\* Key feature comparison \*\***

|Feature |Parallel FindAll |Exa Websets + Enrichments |
| --- | --- | --- |
|Input |Natural language query |Natural language query |
|Entity discovery |Three-stage pipeline with explicit match evaluation |Embeddings-based search with criteria verification |
|Match conditions |Boolean criteria with multi-hop reasoning |Search query filters + criteria |
|Output formats |Structured JSON with citations, reasoning, confidence |Structured data with multiple format types |
|Citations Full |Basis framework: citations, reasoning, excerpts, calibrated confidence |Source-backed results |
|Async processing |Yes, polling-based with status updates |Yes, webhook support |
|Post-hoc enrichment |Can add enrichments to completed runs |Can add enrichment columns anytime |
|Monitoring |Separate Monitor API for ongoing tracking |Built-in Monitor feature for web tracking |
|Dashboard/UI Developer |Platform with playground |Full dashboard with chat-based enrichment creation |
|SDK support |Python SDK, TypeScript SDK, REST API, MCP Server, Vercel AI SDK tools |Python SDK, JS SDK, OpenAI-compatible endpoint, MCP Server |

## \## **\*\* Recall and accuracy \*\***

Parallel publishes specific recall benchmarks for FindAll via its self-reported WISER benchmark (40 complex multi-criteria queries, tested November 2025):

* \- **\*\* FindAll Pro: \*\*** 61% recall at $1,430 CPM, described as ~3x better than alternatives
* \- **\*\* FindAll Core: \*\*** 52\.5% recall at $230 CPM
* \- **\*\* FindAll Base: \*\*** 30% recall at $60 CPM, the lowest-cost option

For comparison, Parallel's benchmark reports OpenAI Deep Research at 21% recall, Anthropic Deep Research at 15.3%, and Exa at 19.2%.

Exa does not publish comparable recall figures for Websets specifically, though independent benchmarks have evaluated both products. A March 2026 third-party benchmark by NewsCatcher (32 queries focused on real-world event discovery) showed Exa Websets achieving 19.6% recall with 83.7% precision, while Parallel AI Core reached 5.5% recall with 77.7% precision on that particular query set. Different benchmarks test different query types, so results vary depending on the workload.

The difference in transparency here is notable. Parallel stakes a claim with published numbers on its own benchmark; Exa lets its product reputation and third-party evaluations speak for themselves. When evaluating either product, run tests on queries that match your actual use case.

## \## **\*\* Developer experience \*\***

### \### **\*\* Parallel \*\***

Parallel offers a REST API, Python SDK (parallel-web on PyPI), TypeScript SDK (parallel-web on npm), and Vercel AI SDK tools, with detailed documentation at [docs.parallel.ai](https://docs.parallel.ai/) [[docs.parallel.ai] (https://docs.parallel.ai/)](https://docs.parallel.ai/) . The Developer Platform includes a playground for testing queries. Parallel also integrates with Cloudflare AI Gateway, enabling observability, caching, and rate limiting at the infrastructure level. An MCP Server is available for agent integrations.

\### findall shell

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

# Create a FindAll run 

curl -X POST  "https://api.parallel.ai/v1beta/findall/runs"  \

-H  "x-api-key:  $PARALLEL_API_KEY "  \

-H  "Content-Type: application/json"  \

-d  '{

"query": "Find all AI companies that raised Series A in the last 3 months",

"generator": "core"

}' ```  # Create a FindAll run   curl -X POST "https://api.parallel.ai/v1beta/findall/runs" \   -H "x-api-key: $PARALLEL_API_KEY" \   -H "Content-Type: application/json" \   -d '{   "query": "Find all AI companies that raised Series A in the last 3 months",   "generator": "core"   }' ```
```

### \### **\*\* Exa \*\***

Exa provides SDKs for both Python and JavaScript, plus OpenAI-compatible endpoints and an MCP Server. The Websets product includes a full dashboard UI with a chat interface for creating and managing enrichments, a more accessible entry point for non-developers. Exa lists 30+ integrations including LangChain, CrewAI, LlamaIndex, Vercel AI SDK, Google Sheets, and many others.

\### exa webset

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

# Create a Webset enrichment from  exa_py  import  Exa

exa = Exa( 'YOUR_EXA_API_KEY' )

enrichment = exa.websets.enrichments.create( 'webset_id' , params={

 'description' :  'Company revenue information' ,

 'format' :  'text' 

}) ```  # Create a Webset enrichment   from exa_py import Exa   exa = Exa('YOUR_EXA_API_KEY')   enrichment = exa.websets.enrichments.create('webset_id', params={   'description': 'Company revenue information',   'format': 'text'   }) ```
```

Exa's dashboard-first approach with chat-based enrichment creation makes it more accessible for business users. Parallel leans more heavily toward the developer/API-first experience, though both now offer comparable SDK coverage.

## \## **\*\* Use case fit \*\***

### \### **\*\* Choose Parallel FindAll when: \*\***

**\*\* You need high recall on specific entity discovery. \*\*** FindAll Pro's 61% recall (on Parallel's WISER benchmark) and multi-hop match evaluation make it strong for exhaustive searches where missing entities has real cost: competitive intelligence, market mapping, compliance screening.

**\*\* You want pay-as-you-go pricing. \*\*** No monthly commitment means you can run one-off research queries without subscription overhead.

**\*\* You need deep, multi-hop reasoning for match criteria. \*\*** FindAll's explicit match evaluation stage with multi-hop reasoning across sources is purpose-built for complex boolean criteria ("Has raised Series A AND is in healthcare AND was founded after 2020").

**\*\* You're building programmatic pipelines. \*\*** The API-first design, Cloudflare AI Gateway integration, and separation of match conditions from enrichments make it well-suited for automated data pipelines.

### \### **\*\* Choose Exa Websets + Enrichments when: \*\***

**\*\* You want a dashboard experience. \*\*** Exa's Websets UI with chat-based enrichment creation is significantly more accessible for non-technical users or quick ad-hoc research.

**\*\* You need contact information enrichment. \*\*** Exa has first-class support for email and phone number extraction as enrichment types, priced at 5 credits per contact.

**\*\* You're already in the Exa ecosystem. \*\*** If you use Exa's Search API or other products, Websets is a natural extension that shares the same account, credits, and SDKs.

**\*\* You need the broadest integration support. \*\*** Exa offers 30+ integrations including LangChain, CrewAI, LlamaIndex, Vercel AI SDK, Google Sheets, and OpenAI-compatible endpoints.

**\*\* You have predictable, recurring enrichment needs. \*\*** The subscription model with monthly credits works well when you have a steady cadence of enrichment work.

## \## **\*\* Head-to-head summary \*\***

|Dimension |Parallel FindAll |Exa Webset |
| --- | --- | --- |
|Core strength |Entity discovery with high recall |Embeddings-powered search with enrichment |
|Best published recall |61% (Pro tier, self-reported WISER benchmark) |Not published |
|Pricing model |Pay-per-query + per-match |Monthly subscription + credits |
|Lowest entry point |$0.10 (preview) |Free (1,000 credits), $49/mo (Core) |
|SDK support |Python, TypeScript, MCP Server |Python, JS, OpenAI-compatible, MCP Server |
|Integrations |Cloudflare AI Gateway, Vercel AI SDK |30+ including LangChain, CrewAI, LlamaIndex, Vercel AI SDK |
|Contact enrichment |Via Task API |Native (email, phone) |
|Match evaluation |Explicit multi-hop reasoning |Criteria-based verification |
|Citation quality |Basis framework (citations, reasoning, confidence) |Source-backed |

## \## **\*\* Conclusion \*\***

Parallel FindAll and Exa Websets solve overlapping problems with distinct approaches. FindAll is purpose-built for entity discovery at scale with a rigorous match evaluation pipeline and published recall benchmarks. It's the stronger choice when you need confidence that you've found everything meeting your criteria. Exa Websets brings a more accessible, dashboard-driven experience with rich SDK support and the broadest ecosystem of integrations. It's the better fit when you want a versatile enrichment platform that business users can operate directly.

For teams building automated data pipelines where recall and precision matter most, Parallel FindAll has the edge. For teams that want an all-in-one platform with a polished UI and flexible enrichment types, Exa Websets is the more complete package. Both products are actively evolving.

By Parallel

April 14, 2026
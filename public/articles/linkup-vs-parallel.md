# Linkup vs. Parallel: comparing two accuracy-first search APIs

Linkup and Parallel are unusually similar: both run their own index, both sell search, extraction, and asynchronous deep research, and both lead with benchmark accuracy. This comparison covers the product suites, search and output shapes, the competing accuracy claims and the first independent head-to-head, deep research, the deployment modes where Linkup goes further, pricing, reliability, and compliance.

## **The product suites**

Linkup exposes five endpoints, each placed at a different point on the latency and quality curve:

- Search (synchronous web search, with fast, standard, and deep settings)
- Fetch (retrieve the content of a web page, with optional JavaScript rendering)
- Research (asynchronous multi-source synthesis returning a report or a precise answer with inline citations; currently in beta)
- Tasks (batch up to 100 Search, Fetch, or Research calls into one asynchronous job)
- Extract (seed URL plus a query, returning repeated structured rows such as products or job listings; in closed beta)

Parallel exposes seven:

- Search API (synchronous, four modes from ~200ms to ~3s)
- Extract API (URLs to clean markdown, including JS-heavy pages and PDFs)
- Task API (asynchronous deep research against a typed schema, nine processor tiers)
- Responses API (OpenAI-compatible agentic research with cited answers)
- FindAll API (verified entity list building)
- Entity Search API (real-time people and company search)
- Monitor API (scheduled change tracking)

The first three lines match almost exactly. Parallel goes wider into entity discovery, monitoring, and web-grounded answers. Linkup's Tasks endpoint has no direct Parallel equivalent: it batches a hundred mixed calls into a single asynchronous job, which is a clean fit for scheduled or overnight work.

## **Search**

Linkup's Search takes a query and a depth. Standard returns faster; deep runs a more thorough multi-step search. You can restrict results with includeDomains (up to 100) or excludeDomains, bound them with fromDate and toDate, and ask for images alongside text. Linkup's documentation describes standard search as sub-second; its pricing page lists the Search endpoint at 1 to 3 seconds, so plan against your own measurements rather than either figure.

Parallel's Search takes a natural-language objective, optionally with explicit search queries, and returns ranked URLs with excerpts sized by max_chars_per_result and max_chars_total. Four modes set the trade: Turbo at ~200ms and $1 per 1,000 requests, Fast at under a second and the same $1 per 1,000, Basic at ~1s and $5 per 1,000, Advanced at ~3s and $5 per 1,000 and the default. A Source Policy handles domains and freshness; a Fetch Policy chooses between the index and a live crawl.

## **Output shapes**

This is the cleanest functional difference at the search layer. Linkup's outputType parameter gives you three shapes from the same endpoint: searchResults returns raw entries with URLs and content, sourcedAnswer returns a written answer with the sources behind it and optional inline citations, and structured returns data conforming to a JSON schema you supply.

Parallel keeps those separate. Search returns results and excerpts only. Synthesized answers come from the Responses API; typed structured output comes from the Task API, where every field arrives with a Basis attached: the citations behind it, the reasoning that produced it, the excerpts it was drawn from, and a confidence rating of low, medium, or high.

Which you prefer depends on how you like to build. One endpoint with a mode switch is fewer moving parts. Separate endpoints give you independent pricing, independent rate limits, and per-field provenance on the structured path.

## **The competing accuracy claims**

Both companies lead with benchmark numbers, and the numbers do not line up cleanly enough to declare a winner.

Linkup reports that Search ranks first among sub-second web search APIs on SimpleQA Verified with a 92% F-score, and that Research ranks first on SEAL-0 with 61% accuracy. Linkup publishes its SimpleQA evaluation harness as open source, which is worth crediting; few providers in this category do. On [Openbenchmarks' independent speed boards](https://openbenchmarks.com/web-search/fastest-search-api) (September 2026), Linkup fast measured 1.57s mean request latency on factual lookup and Linkup standard 2.55s, against 348ms for Parallel turbo and 942ms for Parallel fast, so the sub-second label depends on how and where latency is measured.

Parallel's current Search results on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026) come from a multi-step agentic setup: a GPT-5.6 Sol agent with Advanced and Basic, a cheaper GPT-5.6 Luna agent with Fast and Turbo, search and extract tools, and an LLM judge on a 100-question sample of SimpleQA Verified. There Advanced and Basic score 97%, Fast 94%, and Turbo 91%. Linkup isn't in those runs, and Parallel has no current published SealQA result.

Those are not comparable measurements. Linkup's 92% is an F-score from its own sub-second search setup; Parallel's figures are an agent's accuracy on a sample of the same dataset, with room to search more than once. SimpleQA Verified is a curated 1,000-prompt subset, not the full 4,326-question SimpleQA set, and an F-score is not the same statistic as accuracy. Linkup's SEAL-0 result has no current Parallel counterpart to set beside it. Every one of these figures is vendor-produced on a vendor-chosen harness.

One independent head-to-head now exists. [Openbenchmarks](https://openbenchmarks.com/multi-turn-company-search) publishes its harness, its scoring code, and every raw vendor response, and its multi-turn company search board (first published August 22, 2026, last run August 28) includes both Linkup depths and all four Parallel modes. A fixed research agent running gpt-5.6-sol answers 45 hand-labelled questions, each combining three or four constraints such as investor backing, accelerator participation, headquarters, and founding period, with its native web search swapped for the vendor's API. Every configuration ran each question three times, and answers are scored against a frozen gold set of companies, so precision and recall are measured directly rather than inferred from an accuracy score.

| Configuration (search only) | F1 | Precision | Recall | Cost per agent run |
| --- | --- | --- | --- | --- |
| Parallel Basic | 46.5 | 88.7 | 34.4 | $0.98 |
| Parallel Advanced | 44.2 | 87.6 | 32.0 | $0.57 |
| Linkup Fast | 41.1 | 82.8 | 30.3 | $0.84 |
| Linkup Standard | 40.6 | 84.0 | 29.7 | $0.84 |
| Parallel Fast | 38.0 | 79.9 | 27.5 | $0.44 |
| Parallel Turbo | 34.7 | 80.0 | 24.8 | $0.40 |

On the search-only board, ranked by F1, Parallel Basic and Advanced finish first and third of the thirteen configurations tested, ahead of both Linkup depths. Parallel Fast and Turbo finish behind both at about half Linkup's cost per agent run. With page fetching enabled, Linkup Standard's precision rises to 90.7, the highest on that board, and its F1 of 42.0 sits within a point of Parallel Basic and Advanced. The trial-to-trial spread is one to two points, so adjacent rows are close, but the five-point gap between Parallel's premium modes and Linkup is larger than the noise, and so is the gap between Linkup and Parallel's two cheap modes.

Both are accuracy-first products with credible results. The one independent measurement covers a single task, multi-constraint company discovery, with a single agent, and on that task it favours Parallel's Basic and Advanced modes over Linkup, and Linkup over Parallel's Fast and Turbo. Running both against a sample of your own production queries takes about a day of work and answers the question for your workload.

## **Deep research**

Linkup's Research endpoint runs asynchronously over 2 to 20 minutes and returns either a detailed report or a precise answer with inline citations. It is priced at $0.25 to $2.50 per request, which is $250 to $2,500 per 1,000. It is in beta, and Linkup notes that behaviour and parameters may change.

Parallel's Task API covers the same job with nine processor tiers spanning a much wider range: lite at $5 per 1,000 runs and 10 to 60 seconds, through core at $25, pro at $100, ultra at $300, and up to ultra8x at $2,400 per 1,000 and as long as two hours. Fast variants of each trade some depth for tighter latency at the same price. The range matters because a lot of enrichment work does not need a twenty-minute research run; at $5 per 1,000, lite makes per-row enrichment viable at a volume that a $250 floor does not.

Parallel also offers the Responses API for synchronous research, OpenAI-compatible and priced by reasoning effort at $10, $50, or $250 per 1,000 requests with latencies from about 5 seconds to about a minute. Linkup's Research is asynchronous only.

## **Deployment, where Linkup goes further**

Linkup offers two enterprise deployment modes that Parallel does not match. A Private Index builds a dedicated, access-controlled index over your proprietary data, so retrieval spans your own corpus without exposing it. Bring Your Own Cloud runs the full indexing layer inside your own infrastructure, which keeps queries inside your environment.

For a bank, a government department, or a legal AI product working under strict data sovereignty rules, that is a decisive capability, and it shows in Linkup's customer list. Parallel is a hosted API. It offers zero data retention on Enterprise plans and a contractual commitment not to train on customer data, but the queries do go to Parallel's infrastructure.

## **Pricing**

Both charge per request with no plan to commit to, which makes the comparison unusually direct.

Linkup:

| Product | Price |
| --- | --- |
| Search | $5 to $6 per 1,000 requests depending on depth |
| Fetch | $1 per 1,000 without JavaScript rendering, $5 per 1,000 with it |
| Research | $250 to $2,500 per 1,000 |
| Free tier | 4,000 queries a month, framed as a $20 monthly credit |

Parallel:

| Product | Price |
| --- | --- |
| Search | $1 per 1,000 in Turbo, $5 per 1,000 in Basic and Advanced, 10 results with excerpts included |
| Extract | $1 per 1,000 URLs, JavaScript rendering and PDFs included |
| Task API | $5 to $2,400 per 1,000 runs |
| Responses API | $10 to $250 per 1,000, by reasoning effort |
| Monitor | $3 per 1,000 executions |
| Entity Search | $5 per 1,000 |
| FindAll | Fixed cost plus $0.03 to $1.00 per match |
| Free tier | $5 in credits a month, applied automatically, covering up to 5,000 Turbo searches |

At the search layer, Parallel's Turbo and Fast modes are five to six times cheaper than Linkup Search, and Fast holds near-premium quality at that price (73 against advanced's 75 in Artificial Analysis's September 8, 2026 data); against Basic and Advanced the two are at parity. Extraction is level at $1 per 1,000 for plain pages, but Parallel does not charge extra for JavaScript rendering where Linkup charges five times as much for it. On deep research, Parallel's floor of $5 per 1,000 sits well below Linkup's $250, while the ceilings are comparable.

Linkup's $20 monthly credit is four times Parallel's $5, but because Turbo costs a fifth of Linkup Search, the free tiers end up closer than that: Parallel's credit buys roughly 5,000 searches against Linkup's 4,000.

_Check official documentation for current pricing._

## **Reliability and rate limits**

Linkup commits to 99.9% uptime backed by an SLA. Parallel publishes default rate limits of 600 requests per minute for Search, Extract, and Entity Search, 300 for Monitor, and 25 per hour for FindAll runs, with GET polling excluded and custom limits on enterprise plans. Linkup does not publish default per-endpoint quotas, so ask during evaluation if throughput matters to your design.

## **Compliance**

Linkup includes SOC 2 Type II on all plans and states that it does not train on user data. Zero data retention is available with the Enterprise plan, alongside IP whitelisting, a dedicated index refresh rate, and a private environment.

Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention on Enterprise plans, and commits contractually to not training on customer data, with a public status page and trust center.

Both hold the certification, so the substantive difference is the deployment envelope: Linkup will run inside your cloud, and Parallel will not.

## **Developer experience**

Both are easy to adopt. Linkup publishes a public OpenAPI spec, ships Python and Node clients, and is wired into LangChain, CrewAI, LiteLLM, Haystack, and an OpenAI SDK wrapper. Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, and its Responses API is OpenAI SDK-compatible, so an existing integration usually needs only a new base URL, key, and model name.

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="turbo",
)
```

## **When to use each**

Choose Linkup when the deployment model is the constraint. Bring Your Own Cloud and Private Index are real capabilities that Parallel has no answer to, and if your data cannot leave your VPC, nothing else in this comparison matters. The outputType switch is a nice piece of design if you want search results, a written answer, and structured JSON from one endpoint. The batch Tasks endpoint suits scheduled bulk work, the open-source evaluation harness suggests a company confident in being checked, and SOC 2 Type II on every plan is a lower bar to clear than an enterprise contract.

Choose Parallel when unit economics and breadth decide it. Turbo runs at 200ms and Fast at under a second, both $1 per 1,000 requests, a fifth to a sixth of Linkup Search, which changes what you can afford to do inside an agent loop. Nine research processors starting at $5 per 1,000 make per-row enrichment practical at volumes where a $250 floor does not, and the Basis on every Task field gives you per-field citations, reasoning, and confidence rather than document-level sources. FindAll, Entity Search, and Monitor cover list building and change tracking that Linkup does not sell.

These two are close enough that published benchmarks will not decide it for you. The independent Artificial Analysis Search Index (September 2026 data) scores Parallel Search (advanced) at 75, behind Perplexity Search (medium) at 80 and Octen Search at 77, and its displayed leaderboard doesn't include Linkup. The Openbenchmarks company search board puts Parallel's premium modes ahead of Linkup and Linkup ahead of Parallel's cheap ones. The questions that will decide it: does your data need to stay in your own cloud, and how much of your workload sits at the cheap, high-volume end of the curve rather than the deep-research end?

**Related reading: **[Exa vs. Parallel](https://parallel.ai/compare/exa-vs-parallel) · [You.com vs. Parallel](https://parallel.ai/articles/you-com-vs-parallel) · [Perplexity Search API vs. Parallel Search API](https://parallel.ai/articles/perplexity-search-api-vs-parallel-search-api).

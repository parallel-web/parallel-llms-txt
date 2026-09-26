# How to switch from Serper to Parallel Search API

Serper is cheaper per search than Parallel at volume, so the reason to switch is the stage after the search call: turning titles, links, and one-line snippets into something a model can reason from. This guide covers the honest cost comparison, how each parameter maps, what you give up, and the code change.

You are not migrating to save money on the search line. Serper sells Google results from $1.00 down to $0.30 per 1,000 queries, and Parallel Search Turbo is $1 per 1,000. At volume, Serper is cheaper.

The reason to switch is the stage that comes after the search call. A Serper response gives your agent a title, a link, a position, and Google's description snippet, one or two lines written to earn a click. To reason from that, you fetch the pages, strip the boilerplate, chunk what is left, and pay input tokens for whatever survives. This guide is about deleting that stage.

## **The honest cost comparison**

Serper sells prepaid credit packs: $50 for 50,000 credits at $1.00 per 1,000 and 50 QPS, $375 for 500,000 at $0.75, $1,250 for 2.5 million at $0.50, and $3,750 for 12.5 million at $0.30. Credits are valid six months from purchase, one credit covers up to 10 results, and 11 to 100 results costs two credits. New accounts get 2,500 free queries.

Parallel Search is $1 per 1,000 requests on Turbo or Fast and $5 per 1,000 on Basic and Advanced, with 10 results and excerpts included and additional results at $1 per 1,000 results. No pack, no expiry, and $5 in free credits applied automatically every month.

So the comparison is only meaningful once you price the whole step:

| Per 1,000 agent searches | Serper + your own fetch layer | Parallel Turbo |
| --- | --- | --- |
| Search call | $0.30 to $1.00 | $1.00 |
| Fetching 5 pages per search | 5,000 page fetches, priced by your scraper | Included as excerpts |
| Boilerplate stripping and chunking | Your code, your maintenance | Included |
| Input tokens for retrieved content | Full page text unless you trim it | Excerpt-sized by default |
| Credit expiry | 6 months from purchase | None |

The token line is usually the largest of these and the one people forget. Feeding a frontier model five full pages per search costs multiples of any per-query rate on this page.

_Note: For the latest pricing, always check official documentation._

## **Parameter mapping**

| Serper | Parallel |
| --- | --- |
| q | objective (natural language), or search_queries to keep your existing strings |
| num | 10 results included; more at $1 per 1,000 results |
| page | no pagination concept; request more results instead |
| X-API-KEY header | Bearer token |
| organic[].snippet | excerpts, drawn from the page body rather than the SERP |
| your separate scrape step | Extract API at $1 per 1,000 URLs, when excerpts are not enough |

If you have keyword queries you have already tuned against Google, keep them: pass them as search_queries alongside a natural-language objective rather than rewriting everything at once.

## **What you lose**

If any of the following are load-bearing, keep Serper for those calls:

- Ranked positions. Parallel does not reproduce Google's SERP, so rank tracking has no equivalent
- gl and hl, no country and language parameters; use a Source Policy and state the locale in the objective
- answerBox, knowledgeGraph, peopleAlsoAsk, relatedSearches. These are Google SERP features and have no counterpart
- The vertical endpoints. Images, Maps, Places, Shopping, Scholar, and Patents have no Parallel equivalent
- Throughput on default limits. Serper gives 50 to 300 QPS depending on pack; Parallel's default is 600 requests per minute, with custom limits on enterprise plans

A hybrid works well: Serper for the vertical and rank-tracking calls, Parallel on the agent path where the model reads the output.

## **The code change**

```python
import requests

res = requests.post(
    "https://google.serper.dev/search",
    headers={"X-API-KEY": os.environ["SERPER_API_KEY"]},
    json={"q": "vendor X enterprise pricing", "num": 10},
).json()

# then: fetch each organic[].link, strip boilerplate,
# chunk, and decide what goes in the prompt
```

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="find current enterprise pricing for vendor X",
    search_queries=["vendor X enterprise pricing"],
    mode="turbo",
)

# excerpts are already in the response
```

## **Get started**

Take a sample of production questions, run your current Serper-plus-fetch pipeline against them, and record three numbers: end-to-end latency, total input tokens sent to the model, and answer accuracy. Then run the same questions through Turbo and compare. If the search line goes up slightly and the token line drops by more, the migration pays for itself, and if it does not, you have learned that cheaply. The $5 monthly free credit covers 5,000 Turbo searches, which is enough to run the test.

Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention, and commits contractually to not training on customer data.

**Related reading: **[Serper vs. Parallel](https://parallel.ai/articles/serper-vs-parallel) · [SerpApi vs. Parallel](https://parallel.ai/articles/serpapi-vs-parallel) · [Switching from Firecrawl](https://parallel.ai/articles/firecrawl-to-parallel-search-api).

# Web scraper vs. web extraction: what's the difference?

A web scraper and web extraction are often treated as one thing, but they solve different problems: one gets a page, the other gets the values you want out of it. This guide covers what each term means, where the two overlap, how failures differ, how LLM-based extraction changed the economics, and how to decide which layer your pipeline is missing.

## Two words, two jobs

A web scraper is a program that requests web pages and pulls data out of the HTML. Web extraction is the step that turns page content into the specific values, fields, or passages a downstream system needs. A scraper almost always includes an extraction step, which is why the words get swapped. Extraction does not require a scraper. It runs just as well on a PDF, an API response, a saved HTML file, or a database export.

The distinction sounds academic until a job fails. A pipeline can reach every URL it was given and still write the wrong price into every row. Another pipeline can map fields perfectly on the 60 percent of pages it managed to load. Both report success. They failed in different layers, and you fix them with different tools.

## What a web scraper does

A scraper handles the mechanics of getting a page and getting data off it. The classic loop has four steps, and [our guide to web scraping](https://parallel.ai/articles/what-is-web-scraping) walks through each in detail:

- **Request.** Send an HTTP request for a URL, or drive a headless browser when the page builds itself with JavaScript.
- **Parse.** Load the response into a DOM tree so it can be queried.
- **Select.** Point CSS selectors or XPath expressions at the elements that hold the data.
- **Store.** Clean the matched strings and write them to a file or a database.

Scrapers are usually written per site. The selector that finds a product price on one retailer means nothing on another. Frameworks like Scrapy bundle request scheduling, link following, and selector-based extraction into one "spider," which is why the Scrapy documentation describes spiders that generate requests, follow links, and extract structured data all at once. In that framing, scraping is the umbrella and extraction is one stage inside it.

Scraping also carries the operational baggage: rotating IPs, handling rate limits, retrying timeouts, keeping browser binaries current. None of that depends on which fields you want.

## What web extraction means

Extraction answers a narrower question: which values should come out of this source, and in what shape? The source can be a rendered DOM, embedded JSON, a table, a PDF, or a plain text file. The output is a set of fields or a clean body of text that a person or a model can use directly.

In practice, extraction comes in two flavors:

- **Content extraction** strips navigation, ads, cookie banners, and footers, and returns the article or document body as clean text or markdown. Reader modes and "LLM-ready markdown" endpoints do this.
- **Structured extraction** maps values into a schema: `price_amount: 1299.00`, `currency: "USD"`, `in_stock: true`. Rules, regular expressions, or a model do the mapping.

Extraction rules used to be handwritten. A selector pointed at a `<span class="price">`. That approach breaks the moment the class name changes, and it cannot tell a current price from a crossed-out one unless someone writes that rule too. Model-based extraction reads the page more like a person would. Diffbot's Extract API, for example, describes itself as using computer vision and natural language processing to return structured JSON with no per-site configuration. The trade is cost and latency for resilience to layout changes.

## Side by side

| Dimension | Web scraper | Web extraction |
| --- | --- | --- |
| Core question | How do I collect this page's content? | Which values do I take from it, and in what shape? |
| Input | URLs, or a crawl that discovers them | HTML, DOM, JSON, PDF, text, API responses |
| Output | Raw HTML, rendered page state, or parsed records | Fields, records, or clean text for a model |
| Typical tooling | Requests, Playwright, Scrapy, scraping APIs | Selectors, parsers, LLM prompts, schema-based extractors |
| What breaks it | Blocks, CAPTCHAs, JavaScript rendering, rate limits | Layout drift, ambiguous fields, wrong semantics |
| Success metric | Pages retrieved | Field-level correctness |
| Runs without the other? | Yes, if you only need raw pages | Yes, on any source you already hold |

## Why the terms blur

Most commercial tools sell both layers under one name. A "scraping API" fetches a page through its proxy pool, renders JavaScript, and returns markdown or JSON. A "data extraction platform" typically includes crawling and fetching so it has something to extract from. Vendors also price the two layers differently even when they bundle them. Firecrawl charges one credit for a basic scrape and adds four credits per page for its JSON, Question, and Highlight formats, which is a plain admission that structured extraction costs more than retrieval.

The usage also differs by audience. Data engineers say "scraper" and mean the whole pipeline. Document-processing teams say "extraction" and may never touch a website at all. When two teams argue about whether a project is scraping or extraction, they are usually describing the same job from different ends.

## How LLMs changed the split

Large language models moved extraction from rules to intent. Instead of a selector per field per site, you describe what you want. That shift has three consequences for anyone building pipelines.

First, extraction got portable across sites. One prompt that asks for "the current sale price and whether the item ships today" works on retailers that have never been seen before. Second, extraction got more expensive per page than retrieval, because a model has to read the content. Third, the interesting unit of output changed. For an agent, the right output is often not a schema at all. It is the two or three passages on the page that answer the question, in as few tokens as possible.

For agents, the third point matters most. The agent does not need the whole page or a rigid schema, only the relevant content, cleaned, with a source URL attached.

## Where Parallel Extract fits

The [Parallel Extract API](https://parallel.ai/products/extract) collapses the two layers into one call. You pass up to 20 URLs and, optionally, a plain-language `objective`. The API fetches each page, including JavaScript-rendered pages and PDFs, and returns clean markdown. With an objective, it returns ranked excerpts aligned to that goal instead of the whole page. Without one, or with `full_content: true`, you get the full page as markdown.

```python
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

extract = client.extract(
    urls=["https://www.un.org/en/about-us/history-of-the-un"],
    objective="When was the United Nations established, and by how many countries?",
)

for result in extract.results:
    print(result.title, result.url)
    for excerpt in result.excerpts:
        print(excerpt)
```

Pricing is $1 per 1,000 URLs, and each call returns in roughly 1 to 20 seconds. The default rate limit is 600 requests per minute. Each result carries the page title and a publish date when one is available, and URLs that could not be returned show up in an `errors` array rather than failing the whole request. A `fetch_policy` setting lets you force a live fetch or accept older cached content when speed matters more than freshness.

Extract is not a scraper in the classic sense. There are no selectors to write and no proxy pool to manage. It also does not produce a rigid schema by itself. If you need typed fields, pair it with a model that reads the excerpts, or use the [Task API](https://docs.parallel.ai/task/task-quickstart) when the job is research across many sources rather than one page. For the discovery step, the [Search API](https://parallel.ai/products/search) finds the URLs first, and Extract pulls the detail only where an agent needs it. Our [guide to AI data extraction at scale](https://parallel.ai/articles/ai-data-extraction-how-to-extract-structured-data-from-websites-at-scale) covers the full pipeline.

## Which one are you missing?

Ask where your pipeline breaks, then buy or build for that layer.

- **Pages fail to load, or come back blocked or empty.** Your problem is retrieval. Look at rendering, proxies, or a managed fetch API before touching your parsers.
- **Pages load, but the wrong values land in the database.** Your problem is extraction. Move from selectors to model-based extraction, or add field-level validation.
- **Pages load and fields are right, but a model still gets the whole page.** Your problem is token cost. Objective-driven excerpts cut the input without losing the answer.
- **You already hold the documents.** You do not need a scraper at all. Run extraction over the files you have.

Measure the layers separately. Track URL coverage and page retrieval as one number and field accuracy as another. A record count on its own hides both kinds of failure.

## FAQ

### Is web extraction the same as web scraping?

No. Scraping collects content from websites and usually includes an extraction step. Extraction structures values from any source, including PDFs, APIs, and files you already have, so it is the wider term and also the narrower stage.

### Is a web crawler a scraper?

A crawler discovers pages by following links. A scraper collects content from pages. Many tools do both, but crawling is about coverage and scraping is about content. See [what a web crawler is](https://parallel.ai/articles/what-is-a-web-crawler) for the full picture.

### Do I need a scraper if I use an LLM for extraction?

You still need to fetch the page, so something has to do the scraper's retrieval job. Managed APIs such as Parallel Extract take on the fetching and return markdown a model can read, which removes the need to run your own scraping infrastructure.

### Which is more expensive, scraping or extraction?

Per page, extraction with a model costs more than plain retrieval, because a model reads the content. Vendors that bundle both usually charge a multiple for structured output. Parallel Extract prices retrieval and objective-focused excerpts together at $1 per 1,000 URLs.

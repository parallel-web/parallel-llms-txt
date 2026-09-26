# Gemini's Google Search grounding vs. Parallel: the best index, with strings attached

Grounding with Google Search puts Google's web index inside a Gemini model turn, on both the Gemini Developer API and Gemini Enterprise Agent Platform (formerly Vertex AI), with per-query billing and strict usage terms attached. This guide covers what grounding costs at scale, where it can and can't run alongside your own tools, and what the terms let you do with results.

## **How grounding works**

Google sells grounding on two surfaces: the self-serve Gemini Developer API, with keys from Google AI Studio, and Gemini Enterprise Agent Platform, the name Google Cloud gave Vertex AI at Cloud Next in April 2026. Pricing, tool support, and terms differ between them in places.

You add the Google Search tool to a Gemini request, and the model decides whether to search, writes its own queries, and answers from what it finds, with grounding metadata attached. The API doesn't return a result list as data: you get the model's answer plus the sources it leaned on. A companion URL context tool lets the model read up to 20 URLs you pass in, billed as input tokens.

Parallel's Search API is a standalone endpoint. Send a natural-language objective, optionally with explicit search queries, and get ranked URLs with excerpts pulled from the page bodies. Four modes set the trade: Turbo at ~200ms and $1 per 1,000 requests, Fast at ~700ms and the same $1 per 1,000, Basic at ~1s and $5 per 1,000, and Advanced at ~3s and $5 per 1,000, which is the default.

## **Pricing, and the billing change that matters**

Grounding prices differently depending on which model generation you are on, and the two schemes are not the same shape:

| Grounding type | Free allowance | Paid rate |
| --- | --- | --- |
| Google Search, Gemini 3 | 5,000 queries a month on paid projects, shared across Gemini 3 models | $14 per 1,000 queries |
| Google Search, Gemini 2.5 | 1,500 prompts a day on Flash and Flash-Lite; 10,000 on 2.5 Pro (Agent Platform) | $35 per 1,000 prompts |
| Web Grounding for Enterprise | Gemini 3: shares the 5,000 monthly queries | $14 per 1,000 queries (Gemini 3); $45 per 1,000 prompts (2.5) |
| Google Maps | Gemini 3: 5,000 a month; 2.5: 1,500 a day (10,000 on Pro) | $14 per 1,000 queries (Gemini 3); $25 per 1,000 prompts (2.5) |

The billing unit changed with Gemini 3. On Gemini 2.5 you're billed per grounded prompt, however many searches the model ran. On Gemini 3 you're billed per search query the model executes, so a prompt that searches three things is three billable uses. The headline rate dropped from $35 to $14, but the multiplier is set by the model rather than by you. In Google's favor, retrieved web content isn't charged as input tokens, and on Agent Platform grounding is billed only when a response returns at least one web source.

At scale that compounds. A hypothetical agent handling 100,000 prompts a month at three searches each runs 300,000 billable Gemini 3 queries, about $4,130 in grounding fees after the free 5,000. The same searches cost $300 on Parallel Turbo or Fast and $1,500 on Basic or Advanced, before model tokens on either side (with Parallel, your model also bills for the excerpts it reads).

Parallel charges $1 per 1,000 requests on Turbo and Fast and $5 per 1,000 on Basic and Advanced, with 10 results and excerpts included and additional results at $1 per 1,000. The count is whatever your code decides to call, so you can compute the bill in advance. Extract is $1 per 1,000 URLs, and there's $5 in free credits every month, applied automatically.

The free allowances are roughly a tie: 5,000 grounded queries a month against $5 of credit that buys 5,000 Turbo or Fast searches. But Gemini 3 grounding needs a billing-enabled project (the Developer API's unpaid tier only lets you test it in AI Studio), and Google now limits the more generous Gemini 2.5 allowance to accounts that already used 2.5.

_Check official documentation for current pricing._

## **Tools, models, and display rules to check first**

Combining search with your own functions now depends on the surface. On the Gemini Developer API, Gemini 3 models can mix Google Search, URL context, and Maps with your function declarations in one request, a feature still in Preview; Gemini 2.5 can't. On Agent Platform, the grounding docs still say the Gemini API doesn't support combining search tools such as googleSearch with non-search tools such as function calling in the same generateContent request, so an agent there needs a separate retrieval call to search and call your functions in one turn.

The second check is display. Both surfaces require you to show Google's Search Suggestions with a grounded answer, exactly as provided, and the terms say grounded results go only to the end user who submitted the prompt, with any non-Google results shown separately. That fits a consumer chat product and sits awkwardly with a backend pipeline or an agent whose output no person reads. On Agent Platform, Google's [pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) lets customers under 1 million grounded prompts a day skip the Search Suggestions at standard pricing.

Grounding works on current Gemini 3 text models, including Gemini 3.8 Flash (Google's newest stable model), 3.5 Flash-Lite, and 3.1 Pro, which is still in preview, as well as the 2.5 family. Check the current model support table rather than assuming.

## **Results in a model turn versus results as data**

Grounding binds retrieval to inference. You can't hand the results to a different model or run a retrieval-only job without paying for a model turn. The terms narrow things further: both the Gemini API terms and Google Cloud's service terms bar caching, analyzing, training on, or syndicating grounded results, or collecting the links to build an index or pick pages to crawl. You may store the text for up to two years only to evaluate your display or show users their chat history, and you can't intersperse other content with grounded results. Our explainer on [why AI agents can’t just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search) covers those terms.

A standalone API is model-agnostic by construction: the same Parallel call feeds Gemini today and something else next quarter, results come back as raw ranked URLs and excerpts rather than a finished answer, and your application can re-rank or route them before the model sees anything. Retrieval-only workloads cost only retrieval; if you want a synthesized, cited answer, that's a separate Responses or Task API call.

## **On index quality**

Google's index is the most comprehensive and freshest in the world, and for long-tail queries, obscure sources, and very recent events that advantage is real. No independent index matches its coverage.

What that advantage doesn't settle is how much of it survives the trip into a model's context window. Coverage isn't the same as the right passage arriving in the prompt, which is the problem excerpt-based retrieval is built around. Parallel's current results on [parallel.ai/benchmarks](https://parallel.ai/benchmarks) (September 2026) cover SimpleQA Verified, BrowseComp, and WideSearch against Exa, Tavily, and Perplexity. Google grounding isn't in those runs and Google publishes no retrieval benchmarks for it, so measure both on your own queries.

## **Developer experience**

Grounding is a tool declaration on a request you were already making, which is about as low-friction as integration gets if you're on Gemini. Agent Platform adds enterprise controls, a limit of one million grounding queries a day, and Web Grounding for Enterprise, a no-logging variant for regulated industries that searches a curated subset of the index, refreshed at least daily.

Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, with default rate limits of 600 requests per minute on Search and Extract, and the Responses API OpenAI SDK-compatible:

```python
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.search(
    objective="your goal",
    search_queries=["your keyword query"],
    mode="turbo",
)
```

Parallel is SOC 2 Type 2 certified, offers a Data Processing Addendum and zero data retention on Enterprise plans, and commits contractually to not training on customer data, with a public status page and trust center.

## **When to use each**

Use Google Search grounding when you're building a Gemini-based answering product with a user-facing interface. You get Google's index, 5,000 free queries a month on a paid project, retrieved content that isn't billed as input tokens, and a one-line integration. If you can display Search Suggestions, don't need to keep the results, and either run Gemini 3 on the Developer API or don't need function calling in the same turn, the constraints cost you little.

Use Parallel when results need to be data rather than context: stored, re-ranked, mixed with other sources, fed to another model, or processed in a pipeline with no end user. It also fits search plus your own tools in one turn on Agent Platform or a non-Gemini model. Turbo and Fast at $1 per 1,000 requests are a fourteenth of the Gemini 3 per-query rate, Basic and Advanced about a third, and neither multiplies with the model's search appetite. Extract, Task ($5 to $2,400 per 1,000 runs), Responses, FindAll, Entity Search, and Monitor cover extraction, deep research, list building, and change tracking on the same key.

Read the grounding terms first. The function-calling limit now depends on the surface, but the display, storage, and no-analysis rules apply on both, and they decide whether grounding can sit behind an agent whose results you need to keep.

**Related reading: **[Claude's web search tool vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) · [OpenAI web search vs. Parallel vs. Exa vs. Tavily](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose) · [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel) · [Why AI agents can’t just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search).

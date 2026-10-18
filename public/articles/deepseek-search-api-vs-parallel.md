# DeepSeek Search API vs. Parallel: pricing, data handling, and model lock-in

DeepSeek’s Search and Fetch APIs cost $0.75 per 1,000 successful requests, which is less than Parallel’s $1 per 1,000 on Turbo and Fast. Parallel’s case is model independence: it works with any model, including DeepSeek’s, from an account you hold separately from your model vendor. Every DeepSeek claim here comes from DeepSeek’s own documentation, and where the docs are silent we write “not documented.” We compare pricing, model lock-in, data handling, output format, rate limits, and controls.

## Quick answer

DeepSeek’s Search API is the cheaper option at list price. DeepSeek charges $0.75 per 1,000 successful requests for Search and the same for Fetch. Parallel Search costs $1 per 1,000 requests on Turbo and Fast and $5 per 1,000 on Basic and Advanced, according to [Parallel’s pricing page](https://parallel.ai/pricing) on October 17, 2026. We make Parallel, and at list price Parallel costs more.

The reason to pay more is model independence. Parallel is a REST API, an SDK, and a free hosted MCP server that any model can call, including DeepSeek’s own models. DeepSeek’s endpoints are plain REST too and take no model parameter, but you need a DeepSeek account with a prepaid balance to call them, and DeepSeek’s built-in server-side search runs only with DeepSeek models.

Data handling differs as well. DeepSeek’s privacy policy says it stores personal data in China and may use personal data, including inputs, to train its models, and it doesn’t mention Search or Fetch. Parallel stores data in US data centers by default, offers zero data retention under an enterprise agreement, and offers optional EU data residency for Search API requests in Basic mode sent to its EU endpoint. EU residency doesn’t cover Extract, and Parallel is a US company, so it doesn’t change Parallel’s jurisdiction.

We ran no authenticated DeepSeek calls, so we make no claim about which API returns better results. We found no independent benchmark of DeepSeek’s Search API.

## What each call costs

These are list prices checked on October 17, 2026. They cover the search call only and exclude model tokens.

| Item | DeepSeek | Parallel |
| --- | --- | --- |
| Search | $0.75 per 1,000 successful requests | $1 per 1,000 on Turbo or Fast, $5 per 1,000 on Basic or Advanced |
| Page content | Fetch: $0.75 per 1,000 successful requests | Extract: $1 per 1,000 URLs |
| Results per search | 1 to 50, same price at any count | 10 included, extra results $1 per 1,000 |
| Free allowance | Not documented for direct calls | Up to $80 at signup, plus $5 in credits a month |

At 100,000 searches, DeepSeek costs $75, Parallel Fast costs $100, and Parallel Advanced costs $500.

DeepSeek bills a Search request only when it returns HTTP 200 with a non-empty results array, and a Fetch request only when it returns page content. Failed requests, empty results, and timeouts are free. The `count` parameter doesn’t change the price, so asking for 50 results costs the same as asking for 1. Charges come out of a topped-up or granted balance, and the granted balance is used first.

Request price is only part of an agent’s bill. [One r/DeepSeek user](https://www.reddit.com/r/DeepSeek/comments/1x8dpnu/new_deepseek_searchfetch_api_vs_the_old_search) analyzed a week of their own DeepSeek Harness logs and reported that 353 searches cost $0.64 of a $9.90 weekly bill, or 6.4%. They also reported that model output tokens alone cost 6.5 times more than all the searches combined. Those searches ran on DeepSeek’s older search tool, which bills in model tokens, and the post says it benchmarked no production system.

### The free window on DeepSeek’s side

Search and Fetch calls made through DeepSeek Harness, Claude Code, or Codex are free for now. DeepSeek’s [pricing page](https://api-docs.deepseek.com/quick_start/pricing/) and [release notes](https://api-docs.deepseek.com/news/news261017) say billing starts at 00:00 Beijing time on November 1, 2026, which is 16:00 UTC and 9:00 a.m. Pacific time on October 31. The [Search & Fetch guide](https://api-docs.deepseek.com/guides/search) gives a different rule. It says Search requests through Claude Code and Codex are free for the first two weeks after launch and that the billing start date will be announced separately, and it doesn’t mention Harness. The pages disagree as of October 17, so confirm the date before you budget. DeepSeek’s documentation doesn’t describe a free allowance for direct calls to the endpoints.

## Model independence is the reason to choose Parallel

### What “server-side tools” means in DeepSeek’s announcement

DeepSeek’s announcement says Search and Fetch are available “via server-side tools” in DeepSeek Harness, Claude Code, and Codex. In each case DeepSeek runs the search for a client that talks to a DeepSeek model:

- **Claude Code.** Point Claude Code at DeepSeek’s Anthropic-compatible endpoint, and its built-in Web Search tool performs the search through DeepSeek’s API. DeepSeek’s guide says each use also generates extra model requests to summarize what was retrieved, so you pay model tokens on top of the search fee.
- **Codex.** Codex’s `web_search` feature works only with `deepseek-v4-pro`. The setup script disables it, and you enable it with `web_search = "live"` in `~/.codex/config.toml`. The Responses API ignores `web_search` for `deepseek-flash`.
- **DeepSeek Harness.** DeepSeek’s pricing page says Harness server-side tool calls already hit the Search and Fetch APIs. We haven’t tested Harness against the new endpoints. [Our October 11 guide to Harness search](https://parallel.ai/articles/deepseek-harness-web-search) predates them and describes the older built-in tool, which spent a full model call per search.

These integrations work only with DeepSeek models. The raw endpoints take no model parameter, so a function-calling loop with any model can call them. The tie to DeepSeek is the account: a missing or invalid key returns HTTP 401, and an empty balance returns HTTP 402. The Search & Fetch guide doesn’t address storing results or using them with other vendors’ models. The [Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html) say you can use the Inputs and Outputs of DeepSeek’s services for purposes that include training other models, but they don’t say whether that covers search results, which contain third-party web content.

### Parallel works with whichever model you pick

Parallel Search is an HTTP API with Python and TypeScript SDKs and a [hosted Search MCP server](https://docs.parallel.ai/integrations/mcp/search-mcp) at `https://search.parallel.ai/mcp`. The MCP server is free, needs no API key, and exposes `web_search` and `web_fetch` tools. The search call doesn’t depend on which model reads the results, so changing models leaves your search integration untouched. Our guide to [adding web search to Kimi K3 and other open-weight models](https://parallel.ai/articles/kimi-k3-web-search) walks through the same loop on any chat-completions endpoint.

That includes DeepSeek’s models. On October 17, 2026, we ran DeepSeek-V4.1-Flash-1017 through OpenRouter with Parallel Search as a function tool and asked it for DeepSeek’s Search API price and the billing start date for Claude Code calls. The model issued one `web_search` call, the script ran Parallel Search in `fast` mode, and the model answered from the results. It reported $0.75 per 1,000 successful requests and a billing start of 16:00 UTC on October 31, and it cited DeepSeek’s pricing page and the Search & Fetch guide. It credited the date to the guide, but the date comes from the pricing page, so check citations either way. OpenRouter’s usage report put the two model turns at about $0.0007. That was a single run, so treat it as a smoke test.

```python
import json
import os
from openai import OpenAI
from parallel import Parallel

llm = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=os.environ["OPENROUTER_API_KEY"])
search_client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

tools = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Search the web and return ranked URLs with excerpts.",
            "parameters": {
                "type": "object",
                "properties": {
                    "objective": {"type": "string"},
                    "search_queries": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["objective", "search_queries"],
            },
        },
    }
]

messages = [
    {"role": "user", "content": "What is the per-request price of DeepSeek's Search API, and when does billing start for calls made through Claude Code? Cite URLs."}
]

for turn in range(4):
    resp = llm.chat.completions.create(model="deepseek/deepseek-v4.1-flash-1017", messages=messages, tools=tools)
    msg = resp.choices[0].message
    messages.append(msg.model_dump(exclude_none=True))
    if not msg.tool_calls:
        break
    for tc in msg.tool_calls:
        args = json.loads(tc.function.arguments)
        result = search_client.search(objective=args["objective"], search_queries=args["search_queries"], mode="fast")
        text = "\n\n".join(f"{r.title} {r.url}\n" + "\n".join(r.excerpts)[:2500] for r in result.results[:5])
        messages.append({"role": "tool", "tool_call_id": tc.id, "content": text})

print(messages[-1].get("content"))
```

To call DeepSeek directly, change the base URL to `https://api.deepseek.com` and the model to `deepseek-flash`. We tested only the OpenRouter route.

## Data handling: where queries go and who can see them

A search API sees every query your agent writes, and a fetch call shows which URLs it reads. This section summarizes what each vendor documents publicly and says “not documented” where the documents are silent. It is not legal advice.

### DeepSeek

- **Who runs it.** Hangzhou DeepSeek Artificial Intelligence Co., Ltd., registered in China, is the data controller named in the [privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html).
- **Where data is stored.** The privacy policy says DeepSeek collects, processes, and stores personal data in the People’s Republic of China. A Search- or Fetch-specific location is not documented.
- **Retention.** The policy says input data is kept for as long as you have an account, and longer where needed for legal obligations or legitimate business interests. A retention period for Search queries or fetched content is not documented. Neither is a zero-retention option.
- **Training.** The policy says DeepSeek uses personal data, including inputs, to train and improve its models, and it lists a right to opt out of that use. The [Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html) say you keep your rights in the Inputs you submit. A training policy specific to API, Search, or Fetch traffic is not documented.
- **Third parties.** The privacy policy says DeepSeek integrates third-party APIs to provide search services and shares input keywords with them. Both documents were last modified on July 15, 2026, before the launch, and describe DeepSeek’s services in general. Whether Search API queries reach third parties is not documented. DeepSeek says the API runs on its in-house search engine.
- **Law and disclosure.** The Open Platform Terms are governed by the laws of mainland China, with disputes heard in the court where DeepSeek’s registered office is. The privacy policy says DeepSeek may share data with law enforcement and public authorities as required.
- **Your role.** The Open Platform Terms make you the controller for your end users’ personal data and ask you to disclose your own privacy policy to them. Processor terms or a data processing addendum for API customers are not documented. The privacy policy says the services aren’t designed to process sensitive personal data and asks you not to provide it.

### Parallel

- **Who runs it.** Parallel Web Systems Inc., a Delaware corporation. The [Customer Terms](https://parallel.ai/customer-terms) are governed by California law.
- **Where data is stored.** Parallel’s [FAQ](https://docs.parallel.ai/resources/faqs) says data is encrypted in transit with TLS 1.2 or later and at rest in US-based data centers. EU data residency is an optional feature with its own limits, covered in the next section.
- **Retention and zero data retention.** The retention period for standard Search requests is not documented in the public pages we reviewed. Parallel’s [glossary](https://docs.parallel.ai/getting-started/glossary) defines zero data retention (ZDR) as a mode in which Parallel does not retain request or response data after a run completes. ZDR is offered under an enterprise agreement (contact sales@parallel.ai), through a separate ZDR listing on Google Cloud Marketplace for Gemini grounding, and by default on the EU endpoint. The docs we reviewed don’t list it as a self-serve setting. Under ZDR, features that depend on retained context, such as Task API Interactions and Responses API `previous_response_id`, are unavailable. For the Search MCP server, Parallel’s docs point ZDR setups to the authenticated `/mcp-oauth` endpoint instead of the anonymous one.
- **Training.** The FAQ says Parallel does not use customer data to train models. The agreement text varies. The Google Cloud Marketplace [Master Customer Agreement](https://assets.parallel.ai/gcp/parallel_gcp_master_customer_agreement.pdf) (v2026.10) says Parallel won’t use Customer Content to train foundation or general-purpose large language models, while allowing processing to operate and improve the services. The standard Customer Terms on parallel.ai say Parallel may use Customer Inputs and Outputs to train and improve the machine learning models it uses to provide the Services. Read the agreement you will sign.
- **Personal data.** Parallel acts as a processor for business customers under a Data Processing Addendum, and the Customer Terms require you to sign it before processing personal data.

### EU data residency at Parallel

Parallel offers EU data residency as an optional feature, with the commitments set out in the customer’s DPA. It covers Search API requests in basic mode sent to the EU endpoint. For those requests, the endpoint, the full search index, and inference run in the EU, and EU traffic has zero data retention by default. Parallel routes traffic to the United States unless you use the dedicated EU endpoint and have a separate written agreement with Parallel. The limits are:

- Only minimal billing metadata, such as IDs, the SKU, and a timestamp, goes to the US. It never includes inputs or outputs.
- Live fetch, which retrieves public pages at request time, runs globally. It’s optional and can be turned off.
- The Extract API isn’t covered and runs on the default endpoint.
- Your model call runs wherever your model provider hosts it.
- Parallel is a US company, so EU residency doesn’t change its jurisdiction. A US company can offer EU residency but stays subject to US law, including the US CLOUD Act.

Our guides to [web search APIs with EU data residency](https://parallel.ai/articles/best-web-search-apis-eu-data-residency), [building an EU research agent](https://parallel.ai/articles/build-eu-research-agent-parallel-search), and [data residency vs. data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty) have the details, and the [data residency entry](https://parallel.ai/learn/data-residency) defines the terms.

### DeepSeek on location and jurisdiction

DeepSeek documents one location. Its privacy policy says it collects, processes, and stores personal data in the People’s Republic of China, and it says it will use appropriate safeguards for transfers “where required.” The Open Platform Terms are governed by mainland China law. A region choice or EU endpoint for Search and Fetch is not documented, and neither is a data residency commitment.

### What this means in practice

Whichever search API you use, the model vendor sees your prompts and any search results you pass back to it. With a DeepSeek model, DeepSeek sees them under its terms. Adding Parallel for search adds a second party that sees the queries the model writes. If you need documented zero retention or an EU processing option for Search, Parallel documents them and DeepSeek doesn’t. Parallel’s EU option has the limits listed above, and a US company remains subject to US law. If you need documented terms for Search and Fetch traffic specifically, neither the privacy policy nor the Open Platform Terms covers them yet, so ask DeepSeek before you send sensitive queries.

## Technical differences

| Dimension | DeepSeek Search and Fetch | Parallel Search |
| --- | --- | --- |
| Endpoints | POST /v1/tools/search and /v1/tools/fetch | POST /v1/search, plus /v1/extract for page content |
| Input | Query of 1 to 128 characters, with operators | Natural language objective up to 5,000 characters, plus optional keyword queries |
| Output | Title, URL, snippet, summary, optional content, date, rerank score, authority | URL, title, publish date, excerpts |
| Rate limit | 5 requests per second per endpoint, per account | 600 requests per minute for Search and Extract |
| Domain and date controls | site:, -site:, lang:, after:, before: in the query | include_domains, exclude_domains, after_date |
| Location | localization, an IP address | location, an ISO country code |
| Authentication | Authorization: Bearer with a DeepSeek key | x-api-key header, or the keyless MCP server |

### Output format and excerpts

Each DeepSeek Search result carries a title, URL, date, site name, and four fields an agent will read. `snippet` runs 100 to 200 characters and is meant for a UI. `summary` runs 600 to 800 characters and is meant for a model. `content` holds full page text and stays empty unless you set `need_content` to `true`, and it can be empty even then when the page is unavailable. `rerank_score` runs from 0 to 3 and combines relevance, authority, and freshness, and DeepSeek treats 1.5 and above as high quality. `authority` is a tier from 0 to 4, with -1 for unknown. How these signals are computed is not documented.

Fetch returns the title and a Markdown body for one URL per request. It returns 404 when no usable content can be extracted and 403 when DeepSeek’s security policy rejects the request, and it is subject to the target site’s access policies.

Parallel Search returns ranked URLs, titles, publish dates where known, and excerpts selected against your objective. You size the output with `max_chars_per_result` and `max_chars_total`, so the token cost of a call is a setting. The response has no per-result score or authority field. Extract returns page content as Markdown for a list of URLs.

### Freshness

DeepSeek supports `after:` and `before:` with a year or a full date, and each result carries a `date` in UTC that is null when unknown. Index recrawl frequency, whether Search can serve a live-fetched page, and how Fetch caches are not documented.

Parallel’s `after_date` limits results to content published on or after a date. It has no before-date filter, so DeepSeek is the better fit if you need to exclude recent pages. By default Parallel returns cached content from its index. A fetch policy with `max_age_seconds` (minimum 600) triggers a live fetch when the cached copy is older, and Parallel’s docs say live fetching significantly increases latency.

### Controls

DeepSeek puts its controls in the query string: `site:` with `OR` for several sites, `-site:`, exact phrases, excluded terms, `lang:` with comma-separated codes, `after:`, and `before:`. The query is capped at 128 characters, which means an agent that passes a long user prompt has to shorten it first. The optional `ori_question` field carries the original question and has the same cap. `localization` takes an IP address. An explicit country parameter and a limit on `site:` clauses are not documented.

Parallel’s `include_domains` accepts plain domains, domain and path prefixes such as `docs.python.org/3`, and bare top-level domains such as `.gov`. `exclude_domains` takes the same forms and applies only when `include_domains` is empty, and the two lists share a 200-entry cap. `location` takes an ISO 3166-1 alpha-2 country code. Turbo supports English and Japanese queries only, so use Basic or Advanced for other languages. DeepSeek’s docs show `lang:zh,en` but don’t list the languages it supports.

### Rate limits and errors

DeepSeek limits Search and Fetch to 5 requests per second each, counted per account across all API keys, with separate quotas for the two. Fetch also has a per-domain limit whose value is not documented. Going over returns HTTP 429. That is 300 requests per minute per endpoint. Parallel’s default for Search and Extract is 600 requests per minute each, with custom limits on enterprise plans. For one agent, 5 per second is plenty. For a pool of workers that each fan out several queries, it is the first limit you’ll hit. DeepSeek’s capacity expansion form covers model concurrency, and the guide doesn’t describe a way to raise search limits.

DeepSeek’s errors follow the OpenAI-compatible format. Retry 408, 429, and 5xx after a wait, top up on 402, and change the request before retrying other 4xx errors.

### Authentication

DeepSeek uses `Authorization: Bearer <key>` with a key from the DeepSeek platform. We sent requests with no key and with an invalid key to both endpoints, and each returned HTTP 401 with an `authentication_error`, which matches the documented behavior. Parallel uses an `x-api-key` header, and the hosted Search MCP server works without a key.

## What independent evidence exists

Parallel publishes quality numbers with methods. We found none for DeepSeek’s Search API. On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (data dated September 28, 2026, before DeepSeek’s launch), Parallel Search Advanced scores 75 and Basic scores 73 out of 100, behind Perplexity Search (medium) at 80 and Octen Search (highlights) at 77. The index runs the same answer model and harness for every provider and varies only the search API, and its [methodology](https://artificialanalysis.ai/methodology/search-api) is public. Parallel’s [benchmarks page](https://parallel.ai/benchmarks) reports SimpleQA Verified, BrowseComp, and WideSearch results from runs on September 9, 2026 that pair a GPT-5.6 agent with each provider. DeepSeek is in neither. Until someone runs DeepSeek’s Search API through the same harness, any statement about its answer quality relative to Parallel is a guess, and we aren’t making one.

## When to pick DeepSeek

- You want the lowest list price: $0.75 per 1,000 for Search and for Fetch, with failed and empty requests unbilled.
- You already run DeepSeek models and want one account and one balance, plus the native Claude Code, Codex, and Harness integrations, which are free until the billing date above.
- You need `before:` date filtering, up to 50 results per request, or a `summary` and `rerank_score` in the same response.
- Your workload fits under 5 requests per second per endpoint.
- Your data policy allows DeepSeek’s documented terms, including storage in China.

## When to pick Parallel

- You want one search integration that works with any model, including DeepSeek’s, and keeps working when you change models.
- You want published benchmark numbers with methodology, such as the Artificial Analysis index and Parallel’s own evals.
- You need documented zero data retention, optional EU data residency for Search in Basic mode (not Extract), or US-based storage under a Data Processing Addendum.
- You need higher default throughput (600 requests per minute), domain and path allowlists, or an ISO country code for location.
- You want Extract, Task, Responses, Monitor, or FindAll on the same API key.

## How to run your own comparison

1. Sample 50 to 100 questions from your real traffic, including some that need pages published in the last week.
2. Fix the model, prompt, and tool loop, and change only the search call.
3. Give both sides a similar amount of text per call. Set `need_content` or call Fetch on the DeepSeek side, and set `max_chars_total` on the Parallel side.
4. Record correctness against a reference answer, searches per question, tokens, seconds, and failed calls.
5. Compare cost per correct answer including model tokens, not price per call.
6. Re-run at your real concurrency to see whether you hit HTTP 429.

Parallel’s [evaluation guide](https://docs.parallel.ai/search/evaluating-search) covers the method in more detail.

## FAQ

### Is DeepSeek’s Search API free?

No. DeepSeek prices Search and Fetch at $0.75 per 1,000 successful requests each. Calls made through DeepSeek Harness, Claude Code, and Codex are free until billing starts at 00:00 Beijing time on November 1, 2026, according to DeepSeek’s pricing page. The Search & Fetch guide describes a shorter window for Claude Code and Codex, so confirm the date.

### Is Parallel cheaper than DeepSeek’s Search API?

No. At list price DeepSeek is cheaper: $0.75 per 1,000 against Parallel’s $1 on Turbo and Fast and $5 on Basic and Advanced. Price per call excludes model tokens and retries, so the cost per correct answer depends on your workload.

### Can I use DeepSeek’s Search API with models other than DeepSeek’s?

The endpoints are documented as standalone JSON APIs with no model parameter, so any model you connect through function calling can use them, and you need a DeepSeek API key and balance. The built-in search in Claude Code, Codex, and the Responses API runs only with DeepSeek models, and Codex search needs `deepseek-v4-pro`.

### Can I use Parallel with DeepSeek models?

Yes. Parallel Search is a REST API and a keyless MCP server with no model coupling. We ran DeepSeek-V4.1-Flash-1017 with Parallel Search as a function tool on October 17, 2026, and the model completed the search and answered from the results.

### Where does DeepSeek store search queries?

DeepSeek’s privacy policy says it collects, processes, and stores personal data in the People’s Republic of China, and its Open Platform Terms are governed by mainland China law. Search and Fetch are not mentioned in either document, so a Search-specific location and an EU option are not documented.

### Does Parallel offer EU data residency?

Yes, as an optional feature with commitments set out in the customer’s DPA. It covers Search API requests in basic mode sent to the EU endpoint, where the endpoint, the full search index, and inference run in the EU and zero data retention is the default. Billing metadata such as IDs, the SKU, and a timestamp goes to the US, live fetch runs globally unless turned off, Extract isn’t covered, and Parallel is a US company, so its jurisdiction doesn’t change.

### Does Parallel offer zero data retention?

Yes, under an enterprise agreement, through a ZDR listing on Google Cloud Marketplace for Gemini grounding, and by default on its EU endpoint. Parallel’s docs define it as not retaining request or response data after a run completes. It isn’t listed as a self-serve setting, so contact sales@parallel.ai.

### How many requests per second does DeepSeek’s Search API allow?

5 per second for Search and 5 per second for Fetch, counted per account, with HTTP 429 above that. The Search & Fetch guide doesn’t describe a way to raise the limit.

### Which API returns better results?

We don’t know. We made no authenticated DeepSeek calls, and no independent benchmark covers DeepSeek’s Search API yet.

**Related reading: **[The best DeepSeek Search API alternatives](https://parallel.ai/articles/deepseek-search-api-alternatives) · [Web search APIs with EU data residency](https://parallel.ai/articles/best-web-search-apis-eu-data-residency) · [Data residency vs. data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty) · [How to add better web search to DeepSeek Harness](https://parallel.ai/articles/deepseek-harness-web-search) · [Claude’s web search tool vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) · [Gemini’s Google Search grounding vs. Parallel](https://parallel.ai/articles/gemini-google-search-grounding-vs-parallel) · [Brave Search API vs. Parallel](https://parallel.ai/articles/brave-search-api-vs-parallel).

## Sources

- [DeepSeek Search & Fetch guide](https://api-docs.deepseek.com/guides/search), [Search API reference](https://api-docs.deepseek.com/api/search), [Fetch API reference](https://api-docs.deepseek.com/api/fetch)
- [DeepSeek models and pricing](https://api-docs.deepseek.com/quick_start/pricing/), [release notes, October 17, 2026](https://api-docs.deepseek.com/news/news261017), [announcement on X](https://x.com/deepseek_ai/status/2111375650414309859)
- [DeepSeek Claude Code guide](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code), [Codex guide](https://api-docs.deepseek.com/quick_start/agent_integrations/codex), [Responses API guide](https://api-docs.deepseek.com/guides/responses_api/)
- [DeepSeek privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html), [Open Platform Terms of Service](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [Parallel pricing](https://parallel.ai/pricing), [docs pricing](https://docs.parallel.ai/getting-started/pricing), [Search modes](https://docs.parallel.ai/search/modes), [rate limits](https://docs.parallel.ai/getting-started/rate-limits)
- [Parallel FAQ](https://docs.parallel.ai/resources/faqs), [glossary](https://docs.parallel.ai/getting-started/glossary), [Customer Terms](https://parallel.ai/customer-terms), [Google Cloud Marketplace agreement](https://assets.parallel.ai/gcp/parallel_gcp_master_customer_agreement.pdf), [privacy policy](https://parallel.ai/privacy-policy), [Trust Center](https://trust.parallel.ai), [web search APIs with EU data residency](https://parallel.ai/articles/best-web-search-apis-eu-data-residency), [build an EU research agent](https://parallel.ai/articles/build-eu-research-agent-parallel-search), [data residency vs. data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty), [data residency](https://parallel.ai/learn/data-residency)
- [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api), [Parallel benchmarks](https://parallel.ai/benchmarks)
- [Reddit: new DeepSeek Search/Fetch API vs the old search tool](https://www.reddit.com/r/DeepSeek/comments/1x8dpnu/new_deepseek_searchfetch_api_vs_the_old_search)

DeepSeek facts and all prices checked October 17, 2026.

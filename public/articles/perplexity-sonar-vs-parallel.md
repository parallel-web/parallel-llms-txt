# Perplexity Sonar vs. Parallel (and what replaces Sonar)

Perplexity retires its Sonar models on September 27, 2026, so comparing Sonar with Parallel now means comparing Perplexity's Agent API with Parallel's Task and Responses APIs. The split is still an answer engine you prompt versus a research pipeline you point at a schema. This guide covers what replaces Sonar, how each side bills and structures output, and where each wins on current benchmarks.

## **What replaces Sonar**

Perplexity [announced on August 13, 2026](https://www.perplexity.ai/hub/blog/agent-api-one-place-to-build-with-llms-the-web-and-agents) that the Sonar chat completions API retires on September 27, 2026, and that Sonar calls stop working after that date unless they move to the [Agent API](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview). Customers with existing Sonar contracts are covered through the end of their current term. Each Sonar model maps to an Agent API [preset](https://docs.perplexity.ai/docs/agent-api/presets):

| Sonar model (retiring) | Agent API preset | What Perplexity recommends it for |
| --- | --- | --- |
| Sonar | `fast` | Single-fact lookups, definitions, quick summaries |
| Sonar Pro | `low` | Everyday research and light multi-step lookups |
| Sonar Reasoning Pro | `medium` | Multi-hop browsing and wide aggregation across sources |
| Sonar Deep Research | `high` | Expert-level reasoning and exhaustive source coverage |
| No Sonar equivalent | `xhigh` and `wide-research` | Open-ended agentic work with code, and large cited collections |

The Agent API bills model tokens plus tool calls. [Web search](https://docs.perplexity.ai/docs/agent-api/tools/web-search) is $2.50 per 1,000 calls, or $1 with the `fast` search type, URL fetches are $0.50 per 1,000, finance and people search are $5 per 1,000, and a code sandbox is $0.03 per session. Presets pair a third-party model (currently OpenAI models: GPT-6 Luna for `fast`, GPT-5.6 Luna for `low` and `medium`, GPT-5.6 Sol for `high` and `xhigh`) with a system prompt, tools, and step budget, and Perplexity retunes them as new models ship while aiming to hold each preset's cost band. Perplexity's pricing page prices a representative `low` run at about $0.007. The Sonar model itself survives as `perplexity/sonar` inside the Agent API, at [$0.25 input and $2.50 output per million tokens](https://docs.perplexity.ai/docs/agent-api/models).

The Agent API is one endpoint for models from OpenAI, Anthropic, Google, xAI, and others, with web search, URL fetching, a sandbox, MCP connections, and JSON-schema structured output, and it follows the Open Responses format. Alongside it, Perplexity sells a raw [Search API](https://docs.perplexity.ai/docs/getting-started/pricing) at $5 per 1,000 requests, or [$1 per 1,000 with Fast Search](https://docs.perplexity.ai/docs/search/fast-search). Picking your own frontier model with search attached is a real strength, and Parallel has no equivalent model marketplace.

## **Parallel's research surface**

Parallel splits the same territory in two.

The Responses API is the closer analogue to Sonar and the presets that replace it: OpenAI-compatible, synchronous, returning a synthesized answer with citations from one model, `parallel`. It is priced by reasoning effort rather than by token: $10 per 1,000 requests at low with roughly 5 to 10 seconds of latency, $50 at medium for 15 to 20 seconds, and $250 at high for 30 to 60 seconds. It supports streaming, structured outputs, and stateful multi-turn conversations through the standard OpenAI Responses interface.

The Task API is the part with no direct Perplexity counterpart. You define a typed output schema, pick one of nine processors, and get back structured results. Pricing runs from lite at $5 per 1,000 runs and 10 to 60 seconds, through base at $10, core at $25, core2x at $50, pro at $100, ultra at $300, and up to ultra8x at $2,400 per 1,000 runs and as long as two hours. `-fast` variants exist at the same prices, though we don't recommend them for new workloads.

## **Structured output and provenance**

Sonar returned prose with citations, and the Agent API keeps that as its default: inline citation markers in the text plus a list of search results for the run. It also accepts a [JSON schema through ](https://docs.perplexity.ai/docs/agent-api/output-control)`[response_format](https://docs.perplexity.ai/docs/agent-api/output-control)`, and the `[wide-research](https://docs.perplexity.ai/docs/agent-api/wide-research)`[ preset](https://docs.perplexity.ai/docs/agent-api/wide-research) writes cited records to a JSONL file for large list-building jobs. That covers a lot of structured work. The citations still belong to the run or the record you asked for, rather than to each field.

Every field of a Task API result carries a Basis: the citations behind that specific value, the reasoning that produced it, the excerpts it was drawn from, and a confidence rating of low, medium, or high, so the citations attach to each value rather than to the answer as a whole. Per-field provenance is why the Task API tends to show up in finance, healthcare, and legal workflows where someone eventually has to defend a number.

Say you are enriching 50,000 companies with headcount, funding stage, and CEO name. On Parallel that is a Task run per row against a schema, at $5 to $25 per 1,000 rows depending on the processor, with per-field confidence you can threshold on. On the Agent API you can pass the same schema, but you would write your own checks to gate low-quality rows, since no per-field confidence comes back.

## **Accuracy per dollar on current benchmarks**

We run Perplexity in two places on [parallel.ai/benchmarks](https://parallel.ai/benchmarks): its high research setting against the Task API (August 2026), and its Search API against ours inside the same agent (September 2026). Costs are USD per 1,000 questions, including LLM tokens and tool calls.

| Benchmark and setup | Perplexity | Parallel |
| --- | --- | --- |
| BrowseComp, research API (Aug 2026) | High: 86% at $441.50 | Lite: 88% at $5; Ultra: 92% at $300 |
| DeepSearchQA, research API (Aug 2026) | High: 68% at $371.90 | Lite: 76% at $5; Pro: 83% at $100 |
| BrowseComp, Search API, frontier tier (Sep 2026) | 74% at $275 | Advanced: 74% at $399 |
| BrowseComp, Search API, low-cost tier (Sep 2026) | 46% at $37.10 | Fast: 44% at $11.80 |

The Search results split. At the frontier tier, with a GPT-5.6 Sol agent, Parallel Advanced ties Perplexity on BrowseComp at 74% but costs more, and leads on SimpleQA Verified (97% vs. 95%) and WideSearch (57.6 vs. 53.5). At the low-cost tier, with a GPT-5.6 Luna agent, Perplexity edges Parallel Fast on BrowseComp and on WideSearch (47.0 vs. 45.5), while Fast matches it on SimpleQA Verified at 94% for $2.00 per 1,000 against $5.50. Perplexity was search-only in these runs, and Parallel had search and extract. On the independent [Artificial Analysis Search Index](https://artificialanalysis.ai/agents/search-api) (September 2026), Perplexity Search medium leads at 80, ahead of Parallel advanced at 75.

These are our runs on our harness. Perplexity's own [migration benchmarks](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/benchmarks) report its `high` preset at about 86% on BrowseComp, in line with our number, but near 90% on DeepSearchQA, well above the 68% we measured. Sampling and grading differ between harnesses, so run both on your own questions before you commit.

## **Cost predictability**

An Agent API request bills model tokens plus every tool call the agent decides to make, and the preset sets how many steps it may take: one on `fast`, five on `low`, 15 on `medium` and `high`, and 100 on `xhigh`. You can cap steps and token budgets, and each response reports its cost, but the price per request still moves with how hard the agent works. Presets called by name also change as Perplexity retunes them, so to hold cost and behavior steady you copy a preset's current values into a frozen configuration.

Parallel bills a fixed amount per run at each processor tier. A pro Task run is $0.10 whether it searched twice or two hundred times, and whether it reasoned briefly or at length. You choose the depth by choosing the tier, and the cost of a million enrichments is arithmetic you can do before you write the code.

Neither model is inherently better. Token billing means you pay less for the easy questions, which suits variable workloads. Fixed CPM means you know the number, which suits anything with a budget attached to it. But the difference is large enough that it should be an explicit decision rather than something you discover on an invoice.

_Note: For the latest pricing, always check official documentation._

## **Where Perplexity is ahead**

The Agent API is still model-shaped, which means you already know how to use it. It follows the Open Responses format, so an OpenAI SDK integration moves over with a new base URL and a switch to `responses.create`, and you get grounded answers, streaming, and citations with no schema to design and no polling loop for async results. For a chat product, that is a shorter path.

Model choice is the bigger advantage. The Agent API runs OpenAI, Anthropic, Google, and xAI models at Perplexity's published per-model token rates, with search at $2.50 per 1,000 calls, so you are not betting on one vendor's model choices. Perplexity's search quality also holds up on the numbers: it leads the Artificial Analysis Search Index and matches or beats Parallel on BrowseComp in both of our Search tiers. Finance search, people search, and a sandbox sit in the same request.

If you are still on Sonar, migration is not optional: calls stop working after September 27, 2026. Perplexity says most teams finish in minutes, since each model maps to a preset, but the presets run a different underlying model, so re-check output quality and cost on your own traffic after the switch.

## **Developer experience and compliance**

Both are easy to adopt. The Agent API has Python and TypeScript SDKs and follows the Open Responses format. Parallel ships Python and TypeScript SDKs, an MCP server, and a playground, and Responses is OpenAI SDK-compatible, so an existing integration usually needs only a new base URL, key, and model name. Parallel's rate limits default to 600 requests per minute for Search and Extract, 2,000 task creations per minute for Task, and 300 for Responses and Monitor, with GET polling excluded.

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

Choose Perplexity's Agent API when a person reads the output. Chat assistants, research copilots, and anything conversational fit the model-shaped abstraction naturally, and the integration cost is close to zero if you are already calling an LLM. It is also the right answer if you want your own choice of frontier model with search attached, and its search quality leads on the independent AA index.

Choose Parallel when a system consumes the output. Typed schemas mean no parsing prose to recover fields, and the per-field Basis gives you citations, reasoning, and a confidence rating you can threshold on before writing a row. Nine processor tiers at fixed CPM from $5 to $2,400 per 1,000 runs let you set depth per workload and forecast the cost exactly, and in our August 2026 Task runs even Lite at $5 per 1,000 outscored Perplexity high on BrowseComp and DeepSearchQA. The Responses API covers the synchronous, conversational case at $10 to $250 per 1,000 requests when you want that shape too.

Perplexity's Agent API is a model runtime that searches, and Parallel is a pipeline that researches. If your output goes on a screen, Perplexity is less work. If it goes into a table, Parallel saves you from building the missing half yourself.

**Related reading: **[Perplexity Search API vs. Parallel Search API](https://parallel.ai/articles/perplexity-search-api-vs-parallel-search-api) · [Claude's web search tool vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel) · [Exa vs. Parallel](https://parallel.ai/compare/exa-vs-parallel).

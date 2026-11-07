# Decision model pricing compared: per token vs. per request (Jev, OpenAI, Perplexity, Parallel and more)

Jev pricing, OpenAI Decisions API pricing, and most decision model pricing comes down to one choice between billing per input token and billing per request. This guide lists the current price of every major hosted decision model, works through two real workloads with the arithmetic shown, and flags the billing details that change your bill more than the headline rate does.

Most decision models bill per input token with free output: TypeSafe Jev costs $0.042 per 1M input tokens, OpenAI's Decisions API $0.10 per 1M uncached ($0.01 cached), and Perplexity's Decider $0.02 per 1M (Flash: $0.01). Parallel's Decisions API bills per request instead: $1 per 1,000 requests, up to 100 questions each, with live web search included. For decisions over text you already have, token-priced models cost 9 to 220 times less in our routing example below. For decisions that need current facts from the web, the search is the expensive part, and per-request pricing usually comes out ahead.

We build Parallel's Decisions API, so weigh that. The first scenario below is one where Parallel is the wrong choice on price, and we show the numbers.

## Decision model prices at a glance

Prices are list prices checked on November 6, 2026. "Unit" is what one charge buys. None of the token-priced models below search the web unless the row says so.

| Model | Price | Output | Caching | What a unit includes | Web search |
| --- | --- | --- | --- | --- | --- |
| TypeSafe Jev 1.14 | $0.042 / 1M input tokens | Free | Not listed | Input tokens; 64K per request, 32K per question | No |
| OpenAI Decisions API (gpt-6-luna) | $0.10 / 1M uncached input | No charge | $0.01 / 1M cached; cache writes at 2.5x input | Input tokens; up to 400 questions per request | No; pass your own search results as input |
| Perplexity pplx-decider-v1.2 (27B) | $0.02 / 1M input tokens | Free | Not listed | Input tokens; state billed once per group of questions | Optional, $0.001 per search or URL fetch |
| Perplexity pplx-decider-flash-v1.2 (4B) | $0.01 / 1M input tokens | Free | Not listed | Input tokens; state billed once per question | Optional, $0.001 per search or URL fetch |
| Liquid d1 | $0.02 / 1M input (OpenRouter) | Not listed | Not listed | Input tokens; 66K context | No |
| Liquid d1-ultra | $0.042 / 1M input | Not listed | Not listed | Input tokens | No |
| Microsoft-Decision-1 (Foundry) | $0.042 / 1M input | Not listed | Not listed | Input tokens, US and EU Data Zones | No |
| Cloudflare Clef 27B | $0.24 / 1M input | Free | Not listed | Input tokens; 65,536 context | No |
| Cloudflare Clef-flash 9B | $0.038 / 1M input | Free | Not listed | Input tokens | No |
| Baseten mammoth-1 (27B) | $0.10 / 1M input | Free (OpenRouter) | None listed | Input tokens; 16K context | No |
| Baseten elephant-1 (9B) | $0.035 / 1M input | Free (OpenRouter) | None listed | Input tokens; 16K context | No |
| Laya via Laya Studio | $0.0357 / 1M input, pay as you go | Not listed | Not listed | Input tokens; hosted open-weight model | No |
| Laya self-hosted | Free weights, your hardware | None | n/a | Your GPU time | No |
| Parallel Decisions API | $1 / 1,000 requests | None | n/a | One request, 1 to 100 questions, search included | Yes, always |

Sources: [TypeSafe docs](https://docs.typesafe.ai), [OpenAI's Decisions guide](https://developers.openai.com/api/docs/guides/decisions), [Perplexity pricing](https://docs.perplexity.ai/docs/getting-started/pricing), [Liquid's decision model docs](https://docs.liquid.ai/lfm/models/decision-models), [Baseten's pricing changelog](https://www.baseten.co/resources/changelog/elephant-1-and-mammoth-1-pricing/), [Laya Studio](https://laya.studio), and [Parallel pricing](https://parallel.ai/pricing). Microsoft's price is from its October 9, 2026 Foundry announcement, and Cloudflare's from Workers AI. We left out decision models whose hosted price we couldn't confirm today, including Upstage Solar Decide, Inception Mercury Decide, Fastino GLiDE, and Nace.AI Drex.

## Jev pricing

Jev is billed at $0.042 per 1M input tokens ($42 per billion), and output is free, on both jev-1.14.0 and jev-1.13.0. There's no per-request fee and no fixed cap on questions per request, as long as the request fits in 64K tokens and each question fits in 32K. A 500-token decision costs $0.000021, so 1M of them cost $21. Jev answers from the `state` you send; it doesn't search the web. Liquid d1-ultra and Microsoft-Decision-1 list the same $0.042 rate, and Laya Studio's hosted Laya prices itself at $0.0357, which it describes as 15% below Jev.

## OpenAI Decisions API pricing

OpenAI's Decisions API runs on gpt-6-luna and bills $0.10 per 1M uncached input tokens and $0.01 per 1M cached tokens, with no charge for output. Prompt caching lasts up to 12 hours, and cache writes bill at 2.5x the input price. A request can carry up to 400 questions. The endpoint has no built-in web search; you can pass tool-call outputs, such as your own search results, as `input`. At $0.10 uncached, OpenAI's list price is about 2.4x Jev's; with a high cache hit rate on a shared prefix, the effective rate moves toward $0.01.

## Perplexity Decisions API pricing

Perplexity bills $0.02 per 1M input tokens on pplx-decider-v1.2 and $0.01 on pplx-decider-flash-v1.2, with free output and no per-request fee. The original model launched at $0.04 and was cut to $0.02. With `mode: "web_grounding"`, each question gets one Fast Search at $0.001, and each successful URL fetch costs another $0.001; search results then count as input tokens. AIMultiple's System One Index lists Decider Flash as the cheapest model it tracks, at $0.007 per 1,000 decisions on its workload.

## Scenario A: ticket routing, no web needed

One million support tickets a month, one `choice` question each ("billing, shipping, technical, or other?"). Assume a 400-token ticket plus 50 tokens of question: 450 input tokens per decision, or 450M tokens a month. Everything the model needs is in the ticket.

| Model | Arithmetic | Monthly cost |
| --- | --- | --- |
| Perplexity Decider Flash | 450 x $0.01 | $4.50 |
| Perplexity Decider v1.2 | 450 x $0.02 | $9.00 |
| Liquid d1 | 450 x $0.02 | $9.00 |
| Baseten elephant-1 | 450 x $0.035 | $15.75 |
| Laya Studio | 450 x $0.0357 | $16.07 |
| Cloudflare Clef-flash | 450 x $0.038 | $17.10 |
| Jev, d1-ultra, Microsoft-Decision-1 | 450 x $0.042 | $18.90 |
| OpenAI Decisions, uncached | 450 x $0.10 | $45.00 |
| Baseten mammoth-1 | 450 x $0.10 | $45.00 |
| Cloudflare Clef 27B | 450 x $0.24 | $108.00 |
| Parallel Decisions API | 1,000,000 x $0.001 | $1,000.00 |

Parallel costs $1,000 here, between 9 and 222 times more than the token-priced options, and its web search adds nothing because the answer is in the ticket. Use a token-priced model for this job. Price isn't the only axis, of course: accuracy differs between these models, so check a labeled sample before picking the cheapest.

## Scenario B: CRM refresh that needs current web facts

100,000 company records, 10 questions each, refreshed monthly: has a public API, SOC 2, SAML SSO, a free plan, a mobile app, headquarters country, and so on. None of the answers are in your CRM row, so something has to search.

**Parallel.** One request per company with all 10 questions: 100,000 x $0.001 = **$100**. On November 6, 2026 we ran this exact shape for Linear. One 10-question request returned in 676 ms with 10 citations and answered the security questions with confidence above 0.98, but the free-plan and mobile-app questions came back uncertain (0.46 and 0.34; both are true), because the shared evidence leaned toward Linear's security pages. Splitting the product questions into a second request fixed both (0.999 and 0.9997, citing Linear's download page and the App Store) in 504 ms. If your questions span different topics like this, budget two requests per company: **$200**.

**A token-priced model plus your own search call.** Run one search per company and pass the results as `state`. Using Parallel's Search API Fast mode ($1 per 1,000 requests for 10 results) as the stand-in, search costs 100,000 x $0.001 = $100. Assume 5,000 tokens of search excerpts plus 500 tokens of questions: 5,500 tokens per company, or 550M tokens.

- With Jev: $100 + 550 x $0.042 = $100 + $23.10 = **$123.10**
- With OpenAI Decisions, uncached: $100 + 550 x $0.10 = **$155.00**
- With Perplexity v1.2, no grounding: $100 + 550 x $0.02 = **$111.00**
- At a $5 per 1,000 search price instead: add $400 to each.

This lands close to Parallel's price. The difference is the work: you choose the search query, pick which excerpts go into `state`, keep inputs under each model's context limit, and store your own sources.

**Perplexity with web grounding.** Ten questions means ten searches per company: 1,000,000 x $0.001 = $1,000. Tokens, assuming about 3,800 per company on v1.2 (10 results of about 320 tokens each, plus questions and state): 380M x $0.02 per 1M = $7.60. Total: **about $1,008**. On Flash, evidence is billed once per question, so 3.8B tokens x $0.01 per 1M = $38, for **about $1,038**. Questions that produce the same query share one search, so these are upper bounds.

**An LLM with native web search.** In Parallel's PWS-Decisions harness, GPT-6 Luna through the Responses API with required web search cost $16.52 per 1,000 questions, and Claude Haiku 5.5 with native web search cost $27.43 to $28.79. For 1M questions: **$16,520** and **$27,430 to $28,790**. The harness asked one question per call; batching 10 questions into one agent call would cost less, and we haven't measured that.

Price isn't the whole story here either. On the same 300 questions, Luna with search scored 97.3% and Parallel 76.2%, with p50 latency of 7.42 s versus 0.56 s. Parallel built that benchmark, curated it for difficulty, and its random-guess baseline is 42.4%. When a single hard answer matters more than speed and cost, an LLM research agent (or Parallel's Task API) is the better tool. When the decision runs on every record, the per-request price is the case for Parallel.

## Cost formulas

```text
Token-priced, no web:
  cost = decisions x (state_tokens + question_tokens) / 1,000,000 x price_per_1M

Perplexity Flash (state billed per question):
  cost = decisions x questions x (state_tokens + evidence_tokens) / 1,000,000 x $0.01
       + searches x $0.001        (with web_grounding; up to one per question)

Token-priced + your own search:
  cost = entities x search_price
       + entities x (evidence_tokens + question_tokens) / 1,000,000 x price_per_1M

Parallel Decisions API:
  cost = requests x $0.001        (1 to 100 questions per request, search included)
```

## Billing traps that change the bill

- **Perplexity Flash bills the state once per question.** Perplexity's docs give the example directly: three questions about a 10,000-token state bill about 30,000 tokens. For three or more questions about the same state, v1.2 usually costs less despite twice the rate.
- **Perplexity v1.2 bills per group.** If the state plus all questions exceeds the input limit, the API splits questions into groups and counts the state and any search evidence once per group.
- **OpenAI caching helps only on repeats.** Cached input is a tenth of the price, but cache writes cost 2.5x, and the cache lasts up to 12 hours. A prefix that's written once and rarely reused costs more, not less.
- **Jev's 64K/32K limits split long inputs.** A state that doesn't fit with your questions has to be sent across several requests, and each one bills the state again.
- **Parallel bills per request, so question count is free and request count isn't.** Ten questions in one request cost $0.001; ten requests with one question each cost $0.01. Group questions about the same entity, and split by topic only when the shared evidence comes back thin, as it did in our Linear test.

## Frequently asked questions

**How much does Jev cost?** Jev costs $0.042 per 1M input tokens, with free output and no per-request fee, on both jev-1.14.0 and jev-1.13.0. At 500 tokens per decision, that's $21 per million decisions. Web search isn't included because Jev answers from the input you send.

**How much does the OpenAI Decisions API cost?** OpenAI's Decisions API bills $0.10 per 1M uncached input tokens and $0.01 per 1M cached tokens on gpt-6-luna, with no output charge. Cache writes bill at 2.5x the input price, and a request can include up to 400 questions.

**What is the cheapest decision model?** For decisions over text you already have, Perplexity Decider Flash at $0.01 per 1M input tokens is the lowest list price we found among hosted models, and self-hosting open weights like Laya costs only your hardware. Check accuracy on your own data first; the cheapest model on price may not be the cheapest per correct answer.

**Why does Parallel charge per request instead of per token?** Each Parallel request includes a live web retrieval, and that search costs the same whether you ask one question or 100. Per-request pricing makes the cost known before you send the call: $0.001 for up to 100 questions.

**Is per-request pricing cheaper than per-token pricing?** Only when the request does work a token model can't do on its own, such as searching the web. For 1M one-question routing decisions, Parallel costs $1,000 against $4.50 to $45 for token-priced models. For 100,000 companies with 10 web-dependent questions each, Parallel costs $100 to $200 against about $1,008 for per-question web grounding.

## Try it

The [Decisions playground](https://platform.parallel.ai/play/decisions) includes 5,000 free requests, enough to price a sample of your own records before committing. The [docs](https://docs.parallel.ai/decisions/decisions-quickstart) cover grouping and limits, and `parallel/decisions-fast` is free for seven days on [OpenRouter](https://parallel.ai/blog/decisions-openrouter) if you already route models there.

Related reading: [Perplexity Decisions API vs. Parallel](https://parallel.ai/articles/perplexity-decisions-api-vs-parallel) / [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [OpenAI Decisions API vs. Jev vs. Parallel](https://parallel.ai/articles/openai-decisions-api-vs-jev-vs-parallel) / [Cloudflare Clef vs. Parallel](https://parallel.ai/articles/cloudflare-clef-vs-parallel)

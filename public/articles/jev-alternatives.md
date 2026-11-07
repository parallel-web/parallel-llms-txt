# Jev alternatives: 8 decision models and APIs compared

Looking for a Jev alternative usually means one of three things: a cheaper or faster decision model, one you can host yourself, or one that can answer questions your input doesn't contain. This guide ranks eight options, compares their endpoints, prices, and limits in one table, and summarizes what independent decision benchmarks say about them.

The best Jev alternative depends on where the answer lives. If the answer is in the text you send, the closest swaps are Perplexity Decisions ($0.02 per 1M input tokens), Liquid d1-ultra and Microsoft-Decision-1 (both $0.042, the same as Jev), OpenAI's Decisions API (up to 400 questions per request), and open-weight models from Cloudflare, Baseten, and Laya. If the answer is on the web, you need a decision API that retrieves evidence: Parallel's Decisions API searches the live web and returns cited answers for $1 per 1,000 requests, and Perplexity offers a per-question `web_grounding` mode.

We build Parallel's Decisions API, so weigh that. We rank it first for one job only: questions that need current facts from the web. For decisions over text you already have, it's not the cheapest option on this list by a wide margin, and we say so in its entry.

## How to choose a Jev alternative

TypeSafe launched Jev on September 15, 2026, and coined "System One models" for decision models that return typed answers with probabilities (yes/no `noul`, multiple choice, and ordered scores) instead of text. If you're replacing the Jev AI model, ask four questions, in this order.

1. **Is the answer in your input or out on the web?** Jev and most models below read only the `state` you pass. A support ticket works; "Does this vendor support SAML SSO today?" doesn't, unless you fetch the evidence first.
2. **Hosted or self-hosted?** Cloudflare Clef, Baseten's models, and Laya publish weights. The rest are API-only.
3. **Price shape.** Most bill input tokens only. Parallel bills per request with search included.
4. **Limits.** Context length and questions per request vary by an order of magnitude.

## Jev alternatives at a glance

Prices are list prices for input tokens unless noted; decision models don't charge for output. Checked November 6, 2026.

| Model | Endpoint shape | Price | Web grounding | Open weights | Notable limit |
| --- | --- | --- | --- | --- | --- |
| TypeSafe Jev 1.14 (baseline) | POST /v1/systemone, state + named questions | $0.042 / 1M tokens | No | No | 64K context per request, 32K per question |
| Parallel Decisions API | POST /v1/decisions, state + named questions | $1 / 1,000 requests, search included | Yes, one shared retrieval per request | No | 100 questions per request; citations cover the whole call |
| OpenAI Decisions API | POST /v1/decisions, input + questions array | $0.10 / 1M uncached, $0.01 cached | No, but accepts your own tool outputs as evidence | No | gpt-6-luna only; up to 400 questions |
| Perplexity Decisions | POST /v1/decisions, state + named questions | $0.02 / 1M (v1.2), $0.01 / 1M (Flash) | Optional, one search per question at $0.001 each | No | 100 questions per request with web grounding |
| Liquid d1-ultra and d1 | Liquid API, OpenRouter, Vercel AI Gateway | $0.042 / 1M (d1-ultra), $0.02 / 1M (d1 on OpenRouter) | No | Smaller d1 variants only | d1 context 66K |
| Cloudflare Clef and Clef-flash | Workers AI, System One compatible | $0.24 / 1M (Clef), $0.038 / 1M (Clef-flash) | No | Yes, Apache 2.0 | Up to 64 questions; hosted Clef-flash context 24K |
| Baseten elephant-1 and mammoth-1 | POST /v1/systemone on Baseten | $0.035 / 1M (elephant-1), $0.10 / 1M (mammoth-1) | No | Yes, MIT | 16K context |
| Microsoft-Decision-1 | Foundry resource, /providers/microsoft/v1/systemone | $0.042 / 1M (US and EU Data Zones) | No | No | Text only; 32,768 context; deploy first |
| Laya (Convai Innovations) | Python SDK or self-hosted POST /v1/systemone | Free to self-host; third-party hosting from $0.031 / 1M | No | Yes, Apache 2.0 | 512 to 1,024 tokens by default; base checkpoints weak zero-shot |

## The 8 best Jev alternatives

### 1. Parallel Decisions API

Parallel's Decisions API (launched October 25, 2026) searches the live web before it answers. You send `POST https://api.parallel.ai/v1/decisions` with a `state` (a company, URL, JSON, or text) and named questions of Jev's three types. It retrieves evidence once, answers every question against it, and returns typed answers plus citations with URLs and excerpts.

- **Price:** $1 per 1,000 requests, up to 100 questions per request, search included. 5,000 free requests in the playground.
- **Limits:** 1 to 100 questions per request, 32,000 estimated input tokens per question, 600 requests per minute by default. Latency is 200 ms to 1 s.
- **Where it beats Jev:** questions whose answer isn't in your input. In a demo in Parallel's launch post, jev-1.14.0 was asked whether Parallel supports EU data residency, a feature that launched October 14, 2026. Reading only the question, it said no (p 0.86, no sources); the Decisions API answered yes at p 1.00 and cited the announcement.
- **Where Jev is better:** decisions over text you already have. At $0.042 per 1M tokens, a Jev call on a 1,000-token ticket costs about $0.00004, about 24 times less than a Parallel request, and Jev adds no retrieval step. On a 231-question JevBench set Parallel ran with the answer in the input, Parallel scored 89.6%, OpenAI 90.0%, and Jev 88.3%: within two points, with OpenAI highest.
- **Best for:** enrichment, vendor checks, KYB, and agent steps that need a current fact with a source.

### 2. OpenAI Decisions API

OpenAI's Decisions API reached general availability on October 22, 2026, and runs on `gpt-6-luna` only. It takes `input` (a string, messages, tool outputs, `input_json`, or images) and a `questions` array of `predicate`, `choice`, and `score` questions.

- **Price:** $0.10 per 1M uncached input tokens, $0.01 cached, no output charge. Prompt caching lasts up to 12 hours.
- **Limits:** 1 to 400 questions per request.
- **Where it beats Jev:** the largest question batch here, cheap cached input for repeated long contexts, and tool outputs as evidence. It scored highest on the 231-question JevBench set above.
- **Where Jev is better:** uncached input costs about 2.4 times Jev's rate. TechCrunch reported that OpenAI built the endpoint by reconfiguring Luna, while TypeSafe trained Jev specifically for calibrated decisions with a method it calls RLCD.
- **Best for:** teams already on the OpenAI platform that run many questions against one long context.

### 3. Perplexity Decisions

Perplexity's Decisions API (`POST https://api.perplexity.ai/v1/decisions`) uses Jev-style named `noul`, `choice`, and `score` questions. Two models: pplx-decider-v1.2 (27B, $0.02 per 1M input tokens) and pplx-decider-flash-v1.2 (4B, $0.01 per 1M). Both read text and images with a 256K context.

Its distinguishing feature is `mode: "web_grounding"`, which runs one Perplexity Fast Search per question, adds the top results to the state, and returns them as `search_results`. Each search costs $0.001 on top of tokens, with up to 100 questions per request.

- **Where it beats Jev:** half Jev's token price, a 256K context, and optional web evidence.
- **Where Jev is better:** Jev answers grouped questions in one model with no mode to manage. If you pick Flash for price, note that it answers each question separately and bills the state once per question.
- **Versus Parallel on web questions:** ten web-grounded questions cost ten searches ($0.01 plus tokens) on Perplexity and one request ($0.001) on Parallel. Per-question search can pull evidence aimed at each question, which helps when your questions are about different things.
- **Best for:** the lowest token price for in-input decisions, plus web grounding when questions in a batch cover unrelated topics.

### 4. Liquid d1-ultra and d1

Liquid AI's d1 family includes hosted models (d1-ultra and d1.1 on the Liquid API) and open-weight models from 587M to 2.2B parameters under the LFM Open License. d1-ultra costs $0.042 per 1M input tokens and is also on OpenRouter and Vercel AI Gateway; the earlier d1 is $0.02 per 1M on OpenRouter with a 66K context.

- **Where it beats Jev:** d1-ultra leads the Artificial Analysis Decision Index (November 5, 2026 snapshot) at 65.2, against 57.1 for Jev 1.14. The open d1 variants add typed answers such as numbers, dates, and bounding boxes, plus audio input on the omni models.
- **Where Jev is better:** d1-ultra matches Jev's price rather than beating it, and Liquid's docs page doesn't list d1-ultra's context length, while Jev documents 64K per request.
- **Best for:** the top-scoring hosted model on the AA index, or a small open model you can run on your own hardware.

### 5. Cloudflare Clef and Clef-flash

Cloudflare's Clef models run on Workers AI and follow the System One API, so switching from Jev means changing the endpoint and model. Clef is 27B at $0.24 per 1M tokens with a 64K context. Clef-flash is 9B at $0.038 per 1M; Cloudflare lists zero data retention for the Clef models, and Clef-flash's hosted context dropped to 24K with an October 9 price cut. Weights are Apache 2.0. Our [Clef vs. Parallel comparison](https://parallel.ai/articles/cloudflare-clef-vs-parallel) goes deeper.

- **Where it beats Jev:** Clef-flash is slightly cheaper, you can self-host either model, and Clef reads images (Clef-omni adds audio and video).
- **Where Jev is better:** a larger hosted context than Clef-flash, and Clef costs about 5.7 times Jev per token. On the AA index, Clef scores 48.6 and Clef-flash 45.8.
- **Best for:** apps on Cloudflare Workers that may self-host later.

### 6. Baseten elephant-1 and mammoth-1

Base Labs, Baseten's research team, trained elephant-1 (9B) and mammoth-1 (27B) from Qwen3.5. Both run at `POST https://inference.baseten.co/v1/systemone` with the Jev request shape, under the MIT license. After a free launch period, Baseten's October 28 changelog set paid pricing at $0.035 per 1M input tokens for elephant-1 and $0.10 for mammoth-1. A 2B sibling, joey-1, costs $0.01 per 1M.

- **Where it beats Jev:** elephant-1 ranks fourth on the AA Decision Index at 64.7, and you can fine-tune elephant-1 and joey-1 on Baseten.
- **Where Jev is better:** a 64K context against 16K.
- **Best for:** teams that want open weights, fine-tuning, and a hosted endpoint from the same vendor.

### 7. Microsoft-Decision-1

Microsoft-Decision-1 is a text-only decision model in Microsoft Foundry. You deploy it to your Foundry resource, then call `<your-resource>/providers/microsoft/v1/systemone`. It costs $0.042 per 1M input tokens in the US and EU Data Zones, with a 32,768-token context.

- **Where it beats Jev:** Microsoft Entra ID authentication and deployment inside US or EU Data Zones.
- **Where Jev is better:** twice the context, experimental image input, and no deployment step. Jev also scores higher on the AA index (57.1 against 53.8).
- **Best for:** Azure shops that need decisions inside their existing compliance boundary.

### 8. Laya

Laya, from Convai Innovations, is an Apache 2.0 encoder model (421M parameters in English, 322M multilingual). `pip install laya` runs it in process, and `laya-serve` exposes a Jev-compatible `POST /v1/systemone`. The vendor reports 32.8 ms per question on a Tesla T4.

- **Where it beats Jev:** free to self-host, millisecond latency, and multilingual coverage. Its fine-tuned typed-decisions checkpoint scored 0.766 against Jev's published 0.727 on that benchmark.
- **Where Jev is better:** zero-shot decisions. Laya's model card puts the base checkpoints at 0.362 on that benchmark, below a 0.461 majority-class baseline, and calls Laya "a fast base to specialise, not a zero-shot decision engine." Jev also leads on many-option questions (Banking77: 0.870 against 0.425).
- **Best for:** latency-critical decisions on data that can't leave your infrastructure, where you can fine-tune. See [Laya vs. Jev vs. Parallel](https://parallel.ai/articles/laya-vs-jev-vs-parallel).

Also worth a look: Upstage Solar Decide, Inception Mercury Decide, Fastino GLiDE, and Nace.AI Drex.

## What independent benchmarks say

Three public boards rank decision models. All of them measure answer-from-input decisions, so none includes Parallel's Decisions API, which retrieves its own evidence.

- **Artificial Analysis Decision Index** (23 models, November 5, 2026): a weighted mix of AA-Omniscience-Decision accuracy and non-hallucination, HLE-MultiChoice, When2Call, and WildGuardTest. Top four: d1-ultra 65.2, GLiDE v1.2 65.0, SubQ Snap 1.1 65.0, elephant-1 64.7. Jev 1.13 scores 57.5 and Jev 1.14 57.1; Perplexity Decider v1.2 56.2; Microsoft-Decision-1 53.8; Clef 48.6; GPT-6 Luna (Decisions) 48.5.
- **AIM System One Index** (AIMultiple, 62 models): d1-ultra first; Laya fastest at 30 ms but last overall; Decider Flash cheapest at $0.007 per 1,000 decisions.
- **Benchmark Heaven JevBench** (independent of TypeSafe): Jev 1.13.0 is an unranked reference at 77.1 Capability and Jev 1.14.0 scores 75.0. Several projects use the JevBench name, and their scores don't carry across.

For web questions, the closest public evidence is PWS-Decisions, a 300-question set Parallel built and curated for difficulty. Parallel scored 76.2%, against a 42.4% random-guess baseline; the other decision APIs ran without web context, and Perplexity ran without its `web_grounding` mode, so no web-grounded Perplexity result exists. An LLM agent did better on accuracy: GPT-6 Luna with native web search scored 97.3%, while Parallel was about 13 times faster at the median and cost about 1/16 as much. Use an agent for one hard question and a decision API for checks on every record ([write-up](https://parallel.ai/blog/pws-decisions-benchmark)).

## A web-grounded decision in practice

We ran this request on November 6, 2026. None of the answers is in the state, so a model that reads only its input can't answer them.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {
      "vendor": "Baseten",
      "products": "Base Labs decision models on Baseten Model APIs: joey-1, elephant-1, mammoth-1"
    },
    "questions": {
      "launch_period_over": {
        "type": "noul",
        "instructions": "Have elephant-1 and mammoth-1 moved from a free launch period to paid usage on Baseten Model APIs?"
      },
      "joey_open_weights": {
        "type": "noul",
        "instructions": "Are joey-1 weights published openly on Hugging Face?"
      },
      "mammoth_size": {
        "type": "choice",
        "instructions": "What is mammoth-1 parameter count?",
        "criteria": {
          "2b": "About 2B parameters",
          "9b": "About 9B parameters",
          "27b": "About 27B parameters",
          "unknown": "The sources do not say"
        }
      }
    }
  }'
```

It returned in 614 ms with ten citations, including Baseten's model library and the mammoth-1 README on Hugging Face. `mammoth_size` came back `27b` at 0.9997 and `joey_open_weights` at 0.997, both correct. `launch_period_over` came back at 0.66: right in direction (Baseten's changelog confirms paid pricing from October 27), but the evidence mixed Baseten's pages with third-party listings still labeled "free." A probability in that range should send the record to review.

## Frequently asked questions

**What is the best Jev alternative?** It depends on where the answer is. For decisions over text you already have, Perplexity Decisions is the cheapest hosted option per token, Liquid d1-ultra tops the Artificial Analysis Decision Index, and Cloudflare Clef, Baseten, and Laya give you open weights. For questions that need current facts from the web, Parallel's Decisions API retrieves evidence and returns citations for $1 per 1,000 requests.

**Is there an open-source Jev alternative?** Yes. Cloudflare Clef and Laya are Apache 2.0, Baseten's elephant-1, mammoth-1, and joey-1 are MIT, and Liquid publishes small d1 models under the LFM Open License. Several expose a Jev-compatible `/v1/systemone` endpoint.

**Can Jev search the web?** No. Jev answers from the `state` you send. To ground a Jev call, fetch the evidence yourself and pass it in, or use a decision API that retrieves evidence, such as Parallel's Decisions API or Perplexity's `web_grounding` mode.

## Try it

Run a decision in the [playground](https://platform.parallel.ai/play/decisions) with 5,000 free requests, or read the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). To test without an account, add the [Parallel MCP](https://parallel.ai/mcp) server to your agent and ask it to "use Parallel Decisions to check whether" a fact holds. On OpenRouter, the model is `parallel/decisions-fast`.

Related reading: [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [Laya vs. Jev vs. Parallel](https://parallel.ai/articles/laya-vs-jev-vs-parallel) / [Decision model pricing](https://parallel.ai/articles/decision-model-pricing) / [Cloudflare Clef vs. Parallel](https://parallel.ai/articles/cloudflare-clef-vs-parallel)

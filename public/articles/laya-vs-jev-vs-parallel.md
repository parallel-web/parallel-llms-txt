# Laya vs. Jev vs. Parallel Decisions: open weights, hosted, or web-grounded

Laya vs. Jev is a choice between an open-weight decision model you run yourself and a hosted one you call, and Parallel's Decisions API adds a third option for questions whose answer lives on the web. This comparison covers what each one is, how the published accuracy and speed numbers line up, and how to combine them in one pipeline.

Laya is an open-weight encoder you self-host for millisecond decisions on text you already have, and it does best once you fine-tune it. Jev is TypeSafe's hosted decision model at $0.042 per 1M input tokens, built for zero-shot decisions on long inputs with up to 255 options per question. Parallel's Decisions API searches the live web and returns cited answers for $1 per 1,000 requests, for questions the input can't answer. Laya and Jev both read only what you send, while Parallel retrieves evidence from the web first.

We build Parallel's Decisions API, so weigh that. For decisions over text you already hold, Laya and Jev are faster and 10 to 100 times cheaper per question than Parallel, and nothing below argues otherwise.

## Laya vs. Jev vs. Parallel at a glance

| Feature | Laya | Jev | Parallel Decisions API |
| --- | --- | --- | --- |
| Maker | Convai Innovations | TypeSafe AI | Parallel Web Systems |
| What it is | Open-weight encoder (421M English, 322M multilingual) | Hosted System One model (jev-1.14.0) | Hosted decision model with web retrieval |
| Access | pip install laya, or self-hosted POST /v1/systemone | POST /v1/systemone on api.typesafe.ai | POST /v1/decisions on api.parallel.ai |
| Price | Free on your hardware; third-party hosting from $0.031 / 1M tokens | $0.042 / 1M input tokens | $1 / 1,000 requests, search included |
| Reported latency | 32.8 ms per question on a T4 GPU, in process (vendor) | 236 to 276 ms p50 over HTTP (third-party) | 200 ms to 1 s (vendor) |
| Context | 512 or 1,024 tokens by default; up to 8,192 multilingual | 64K per request, 32K per question | 32,000 tokens per question |
| Options per choice | Up to 100 on the server; accuracy drops past about 20 | Up to 255 | 2 to 255 |
| Web evidence | No | No | Yes, with citations |
| Weights | Apache 2.0 | Closed | Closed |
| Strongest fit | Fine-tuned, self-hosted, multilingual, high volume | Zero-shot decisions on long input | Questions about the outside world |

## What each one is

### Laya

Laya is an Apache 2.0 "non-autoregressive System 1 decision model" from Convai Innovations, first published on GitHub on September 18, 2026. It isn't an LLM. The checkpoints are encoders: `laya` (ModernBERT-large, 421M parameters, 512 tokens), `laya-multilingual` (mmBERT-base, 322M, 1,024 tokens and up to 8,192, 100+ languages), and `laya-typed-decisions`, fine-tuned on one benchmark's training split. A Router picks a checkpoint by detected language, and `laya-serve` exposes the same `POST /v1/systemone` wire format as Jev, so a Jev client can point at it by changing its base URL.

If you'd rather not run GPUs, independent services host it: Laya Studio charges $0.0357 per 1M input tokens pay-as-you-go, which it describes as 15% below Jev, and layahost offers a `jev-latest` alias for drop-in use. Neither is affiliated with Convai or TypeSafe.

### Jev

Jev is the hosted decision model TypeSafe AI launched on September 15, 2026, when it coined the term "System One models." The current release is jev-1.14.0 (alias `jev-latest`). It takes a `state` and named questions of three types (`noul`, `choice`, `score`), plus an image `box` type in 1.14. TypeSafe trains it with a method it calls RLCD (Reinforcement Learning for Calibrated Decisions) and doesn't fine-tune it per customer. Output is free; input costs $0.042 per 1M tokens. It's also available on OpenRouter and Cloudflare Workers AI.

### Parallel Decisions API

Parallel's Decisions API launched on October 25, 2026. The request shape is close to Jev's (`state` plus named `noul`, `choice`, and `score` questions), but before answering it searches the live web, answers every question in the request against one shared set of evidence, and returns citations with URLs and excerpts. A request holds up to 100 questions and costs $0.001.

## How the published numbers compare

Most Laya vs. Jev comparisons quote one row from Laya's model card: 0.766 for Laya against 0.727 for Jev 1.13 on a 2,000-decision typed-decisions benchmark. That row is real, and it needs three qualifiers that the card itself states.

- **The 0.766 is the fine-tuned checkpoint.** It was trained on that benchmark's own training split. The base checkpoints score 0.362 (English) and 0.352 (multilingual) zero-shot, below the 0.461 majority-class baseline. The card's words: "Laya is a fast base to specialise, not a zero-shot decision engine."
- **Jev wins on many options.** On Banking77, Jev scores 0.870 and Laya 0.425, because Laya's options share a fixed token budget. Laya's README advises keeping choice questions under about 20 options or raising the budget.
- **The Jev figures are third-party.** Laya never measured Jev itself (no API access), so sample sizes and prompts differ.

Laya does lead on several shared datasets: AG News (0.950 vs. 0.910) and DAIR Emotion (0.595 vs. 0.480). Its calibration error is 0.081 after fitting a temperature on your data, against 0.466 for the checkpoint as shipped. Its weakest primitive is ordered scores (0.372 on SST-5).

Independent boards point the same way. The AIM System One Index (62 models) ranks Laya fastest at 30 ms per decision and last on accuracy, and Opper's JevMan benchmark ranks it 18th of 18. On the Artificial Analysis Decision Index, Jev 1.14 scores 57.1 and Jev 1.13 57.5. These boards measure decisions from input, so Parallel isn't on them.

Speed figures aren't like-for-like. Laya's 32.8 ms is a model call inside your process on a GPU. Jev's 236 to 276 ms is an HTTP round trip to a hosted API. Parallel's 200 ms to 1 s includes a web search. If you self-host, Laya Studio quotes about 1,000 decisions per second on one RTX 4090.

On answer-in-input tasks, Parallel is not ahead. On a 231-question JevBench set Parallel ran, Parallel scored 89.6%, OpenAI's Decisions API 90.0%, and Jev 88.3%: within two points, with OpenAI highest. Laya wasn't in that run.

## Which one fits your job

**Choose Laya** when decisions are high volume and latency-critical, the data can't leave your infrastructure, inputs are short or multilingual, and you have labeled examples to fine-tune with. Routing tickets in many languages on your own GPUs, guardrails at the edge, and email triage are good fits. The fine-tuning notebook takes about 4 to 5 hours on two T4 GPUs.

**Choose Jev** when you want accurate zero-shot decisions without training anything, inputs are long (up to 64K tokens), or a question has dozens of options. Invoice routing with 70 categories, or scoring a long contract against a rubric, suits Jev better than an untuned Laya checkpoint.

**Choose Parallel** when the answer isn't in the input: whether a vendor offers a feature today, whether a company changed its pricing, whether a claim in a press release holds up. Each answer comes with the sources it used, which matters when someone has to audit the decision later.

## How they work together

The three compose well because they cover different questions about the same record. A typical pipeline for an inbound procurement ticket:

1. Laya (self-hosted) or Jev reads the ticket and routes it: billing, technical support, or security review. The answer is in the text, so this takes milliseconds and costs about two cents per thousand 500-token tickets on Jev, or only your hardware on Laya.
2. For tickets routed to security review, Parallel checks the outside-world facts the ticket asks about: the vendor's data retention policy and current limits.
3. High-confidence answers go straight to the customer; mid-range probabilities go to a person with the citations attached.

Here's step 2, run live on November 6, 2026. The ticket asks about Cloudflare's Clef-flash decision model. Nothing in the ticket says what Cloudflare's policy or limits are, and Clef-flash's hosted context changed on October 9, 2026, so older pages still show the earlier figure.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {
      "vendor": "Cloudflare",
      "product": "Clef-flash decision model on Workers AI (@cf/cloudflare/clef-flash)",
      "ticket": "Before we route EU support tickets through Clef-flash, confirm data retention and how much text fits in one hosted request."
    },
    "questions": {
      "zero_data_retention": {
        "type": "noul",
        "instructions": "Does Cloudflare list Clef-flash on Workers AI as zero data retention?"
      },
      "hosted_context_window": {
        "type": "choice",
        "instructions": "What is the context window of the hosted Clef-flash model on Workers AI today?",
        "criteria": {
          "24k": "About 24K tokens (24,576)",
          "64k": "About 64K tokens (65,536)",
          "256k": "About 256K tokens",
          "unknown": "The sources do not say"
        }
      },
      "cheaper_than_jev": {
        "type": "noul",
        "instructions": "Is the Clef-flash Workers AI price per million input tokens lower than TypeSafe Jev at $0.042 per million input tokens?"
      }
    }
  }'
```

```json
{
  "mode": "fast",
  "answers": {
    "zero_data_retention": { "type": "noul", "noul": 0.991 },
    "hosted_context_window": {
      "type": "choice",
      "choice": "24k",
      "probabilities": { "24k": 0.884, "64k": 0.112, "256k": 0.001, "unknown": 0.004 },
      "confidence": 0.845
    },
    "cheaper_than_jev": { "type": "noul", "noul": 0.127 }
  },
  "usage": { "input_tokens": 3330, "output_tokens": 0 },
  "citations": [
    { "url": "https://developers.cloudflare.com/workers-ai/models/clef-flash/" },
    { "url": "https://developers.cloudflare.com/changelog/post/2026-10-01-clef-workers-ai/" },
    { "url": "https://blog.cloudflare.com/clef-decision-models/" },
    { "url": "https://overpayingforai.com/compare/jev-vs-clef" }
  ],
  "decision_id": "decisions_5b8f6a38595b5beb8293047465096490"
}
```

It took 838 ms and cited ten pages. Two answers are right: Cloudflare's model page lists Clef-flash as zero data retention, and the hosted context is 24,576 tokens after the October 9 change (Cloudflare's October 1 launch post, also among the citations, still says 64K). The third is wrong. Clef-flash costs $0.038 per 1M tokens against Jev's $0.042, so the answer should be yes, yet it came back at 0.13 even though a cited page lists both prices. Numeric comparisons are a weak spot for decision models. Ask for the value itself as a choice, compare it in your code, and keep the review step for anything that isn't near 0 or 1.

Neither Laya nor Jev could answer these three from the ticket alone. Both would still return probabilities unless they refused, which is why the routing model shouldn't be the one answering the vendor questions.

To run step 1 on your own hardware, Laya's server accepts the same request shape:

```bash
pip install "laya[serve]"
LAYA_DEVICE=cuda LAYA_PRELOAD=1 laya-serve   # binds 0.0.0.0:8000

curl http://localhost:8000/v1/systemone \
  -H "Content-Type: application/json" \
  -d '{
    "state": "Before we route EU support tickets through Clef-flash, confirm data retention and how much text fits in one hosted request.",
    "questions": {
      "route": {
        "type": "choice",
        "instructions": "Which team should handle this ticket?",
        "criteria": {
          "billing": "Charges, invoices, refunds",
          "support": "Technical troubleshooting",
          "security_review": "Vendor, privacy, and data-handling questions"
        }
      }
    }
  }'
```

Set `LAYA_API_KEY` before exposing the server; without it, `laya-serve` accepts requests with no authentication.

## Frequently asked questions

**Is Laya better than Jev?** It depends on whether you fine-tune. Laya's fine-tuned checkpoint scored 0.766 against Jev's published 0.727 on one 2,000-decision benchmark, but its base checkpoints scored 0.362 there, below the majority-class baseline. Laya is faster and free to self-host; Jev is the stronger zero-shot model and handles longer inputs and many-option questions.

**Is Laya compatible with the Jev API?** Yes. `laya-serve` exposes `POST /v1/systemone` with the same request and response shape as TypeSafe's hosted Jev API, so existing Jev clients work by changing the base URL. Third-party hosts such as layahost also offer a `jev-latest` alias.

**Can Laya or Jev search the web?** No. Both answer from the text you pass in. To ground them, fetch the evidence first and include it in the state, or send the question to a decision API that retrieves evidence, such as Parallel's Decisions API.

**How much do Laya, Jev, and Parallel cost?** Laya is free on your own hardware, and Laya Studio hosts it for $0.0357 per 1M input tokens. Jev costs $0.042 per 1M input tokens with free output. Parallel costs $1 per 1,000 requests, with up to 100 questions per request and the web search included.

## Try it

Test the web-grounded half of the pipeline in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests, or follow the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). Agents can call it without a key through the `web_decisions` tool on the [Parallel MCP](https://parallel.ai/mcp) server.

Related reading: [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [Testing Jev](https://parallel.ai/blog/testing-jev) / [What is a System One model?](https://parallel.ai/learn/system-one-model) / [Are all System One models created equal?](https://parallel.ai/blog/are-all-system-one-models-created-equal)

# What is a Decisions API? How decision models give software answers instead of text

A Decisions API puts a model inside application logic. You define a bounded question, and the model returns a probability your code can branch on, with no text to parse. More than 15 vendors offer one, from OpenAI and TypeSafe AI to Cloudflare and Upstage. Each judges only the input you send, so most workflows retrieve web data first.

**Quick answer.** A Decisions API is an endpoint that takes your input and a set of questions with fixed answer options, then returns a probability for each option. The input can be a support ticket, a product photo, a JSON record, or a web page. Because the result is always one of the options you listed, your code can compare it with a threshold and act on it without parsing text.

Vendors call the model behind the endpoint a _decision model_. TypeSafe AI released the first one and calls the category _System One models_, after Daniel Kahneman’s split between fast, intuitive judgment and slow, deliberate reasoning. Sorting a ticket into one of five queues is a System One task. Writing the reply belongs to the slow kind.

## The three question types

Almost every vendor uses TypeSafe’s System One request shape, which asks noul, choice, and score questions. OpenAI supports the same three types and calls the yes-or-no type predicate.

| Question type | OpenAI name | System One name (Jev, Perplexity, and most others) | What comes back | Example |
| --- | --- | --- | --- | --- |
| Yes or no | predicate | noul | The probability, from 0 to 1, that the condition is true | Does this ticket ask for a refund? |
| Pick one | choice | choice | The most likely option, a probability for every option, and a confidence value | Which team should handle it? |
| Rate on a rubric | score | score | A probability for each ordered level and their weighted average | How severe is the issue, from cosmetic to fully blocked? |

The score type returns a weighted average, so its result can fall between levels. In [OpenAI’s documentation example](https://developers.openai.com/api/docs/guides/decisions), probabilities of 0.1, 0.7, and 0.2 across three severity levels, numbered 0, 1, and 2, produce a score of 1.1. Use choice when the options have no order, such as departments, and score when they do, such as severity.

## What a request and response look like

In OpenAI’s routing example, the `input` field holds the evidence, and each question carries a `name` that the response echoes back.

```json
{
  "model": "gpt-6-luna",
  "input": "I was charged twice for my order.",
  "questions": [{
    "type": "choice",
    "name": "department",
    "instructions": "Which department should handle this complaint?",
    "choices": [
      {"value": "billing", "description": "Payments, invoices, and refunds."},
      {"value": "technical", "description": "Problems using the product."},
      {"value": "shipping", "description": "Delivery and tracking."},
      {"value": "other", "description": "Requests outside these categories."}
    ]
  }]
}
```

```json
{
  "answers": [{
    "type": "choice",
    "name": "department",
    "choice": "billing",
    "probabilities": [
      {"value": "billing", "probability": 0.95},
      {"value": "technical", "probability": 0.02},
      {"value": "shipping", "probability": 0.01},
      {"value": "other", "probability": 0.02}
    ],
    "confidence": 0.93
  }]
}
```

One request can carry many independent questions about the same input: up to 400 on OpenAI and up to 128 on Perplexity. You can check a product photo for damage and classify its category in one call. Questions that depend on an earlier answer need a second request.

## Why decision APIs appeared in 2026

Applications and agents make many small calls between the big ones: classify this input, route this request, decide whether to continue, retry, or ask for clarification. Teams have made those calls with general-purpose LLMs, which means generating tokens, parsing a string, validating it, and retrying when the format breaks. Each call costs little, but at millions a day the latency and cost add up, and an agent loop waits on each one.

A decision model skips generation. TypeSafe says Jev produces every probability in one pass over the input instead of generating one token at a time. Its docs put most queries at about 100 ms. Because the model generates nothing, OpenAI, TypeSafe, Perplexity, and Liquid AI charge only for input tokens, and output is free.

The first launches came within six weeks of each other:

- **September 15, 2026.** TypeSafe AI [launched Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) and named the category System One models.
- **Early October.** Perplexity launched its Decisions API with the pplx-decider models, and Liquid AI [introduced d1](https://www.liquid.ai/blog/d1-decision-model) on October 5.
- **October 6.** OpenAI opened its Decisions API, built on GPT-6 Luna, as a public beta.
- **October 14.** TypeSafe released Jev 1.14.
- **October 22.** OpenAI made the Decisions API [generally available](https://openai.com/index/decisions-api) and added prompt caching, JSON input, a native GPT-Live integration, and a limit of 400 questions per request.

In OpenAI’s launch post, Sierra says it picks the next action in live customer conversations in under 280 ms at p95, meaning 95% of calls finish faster than that. Sierra puts this at about three times faster and 90% cheaper per call than its previous approach. Datadog scores the risk of agent-generated shell commands before it runs them and reports p95 latency 40 times faster than frontier models at comparable accuracy. Both figures are vendor-published, so test on your own workload before you rely on them.

## Decisions API vs. an LLM call vs. a trained classifier

A decision model sits between two tools most teams use. It’s more flexible than a classifier you train yourself and more constrained than an LLM.

|  | LLM with structured outputs | Decisions API | Fine-tuned classifier |
| --- | --- | --- | --- |
| Output | Generated JSON that follows your schema, which can include free text | One of your predefined answers, with probabilities | Scores over a fixed label set |
| Changing the task | Edit the prompt or schema | Edit the question and options in the request | Collect labels and retrain |
| Confidence | Not a primary output | A probability for every answer, by design | Scores, with calibration that varies by model |
| Billing | Input and output tokens | Input tokens only | Your own training and serving costs |
| Good for | Extracting fields, writing explanations, tool calls with arguments | Routing, filtering, triage, gating, reranking | High-volume decisions where you already have labels |

OpenAI draws the same line in its docs. It recommends Decisions when you need a probability, a choice, or a score. For a generated object, such as extracted fields or a written explanation, it recommends Structured Outputs. For a tool call with arguments, it points to function calling.

TypeSafe markets Jev as unable to hallucinate. The claim holds for the format, because the answer is always one of your options. A decision model can still put 0.9 on the wrong answer, and TypeSafe publishes a list of Jev’s known weaknesses. For Jev 1.13, the list includes arithmetic, counting, and reading dates as text rather than as ordered quantities.

## Which providers offer a Decisions API

As of October 25, 2026, more than 15 first-party vendors offer a hosted decision model. Prices are per million input tokens.

| Provider | Endpoint | Models | Input price per 1M tokens | Notes |
| --- | --- | --- | --- | --- |
| OpenAI | POST /v1/decisions | gpt-6-luna | $0.10 uncached, $0.01 cached | Up to 400 questions per request. Text, image, and JSON input |
| Perplexity | POST /v1/decisions | pplx-decider-v1.2 (27B), pplx-decider-flash-v1.2 (4B) | $0.02 and $0.01 | Up to 128 questions, 256K-token context, and 10 requests per second by default |
| TypeSafe AI | POST /v1/systemone | Jev 1.14 (latest), Jev 1.13 | $0.042 | 64K-token request context and up to 255 options per choice |
| Liquid AI | POST /decisions/v1/systemone | d1.1, d1-ultra | $0.02 and $0.042 | Text and image input. d1 and d1-ultra are also on OpenRouter and Vercel AI Gateway |
| Microsoft | POST /providers/microsoft/v1/systemone on your Foundry resource | Microsoft-Decision-1 | Not stated by Microsoft | Text and JSON input. You deploy the model to your own Foundry resource first |
| Baseten | POST /v1/systemone | elephant-1, mammoth-1 | Not stated by Baseten | 16,384-token context. Text, structured data, and image input |
| Cloudflare | Workers AI model @cf/cloudflare/clef | Clef, Clef-flash, Clef-omni | $0.24, $0.038, and $0.15 | Runs on Workers AI. Prices are from Cloudflare’s own pricing page |
| Upstage | POST /v1/systemone | Solar Decide (beta), Solar Decide Flash | $0.10 | Solar Decide is in beta |
| Inception | POST /v1/decisions | Mercury Decide | $0.02 promotional, normally $0.04 | Not stated |

Perplexity lists its prices in [its Decisions API docs](https://docs.perplexity.ai/docs/decisions/quickstart) and notes a billing detail there. The Flash model answers each question separately and bills the input again for every question. Once you ask three or more questions about the same input, the 27B model is usually cheaper. Perplexity cut its price once, from $0.04 at launch, so check current rates before you budget.

Other first-party vendors include Nace.AI, Fastino, Mouse, Respan, ScaleDown, and Bevel, which runs inference in Germany. vLLM Semantic Router and Scira offer free decision models, and Kev-4B and Convai Innovations’ Laya ship as open weights. OpenRouter serves about 30 decision models, and Vercel AI Gateway, DeepInfra, Fireworks, and SiliconFlow host models from other vendors. You can also self-host a `/v1/systemone` endpoint with vLLM or SGLang. Hugging Face lists more than 200 open-weight decision models.

There are two main request shapes. OpenAI’s API takes `input` and a `questions` array and calls its yes-or-no type `predicate`. Jev’s System One API takes `state` and a map of named questions and calls the same type `noul`. Perplexity uses Jev’s naming at its own `/v1/decisions` path. Liquid AI, Microsoft, Baseten, and Upstage use Jev’s request schema at paths ending in `/v1/systemone`, and OpenRouter serves Jev and d1 with the same schema. Switching vendors means rewriting the request mapping and rechecking your thresholds, because a probability of 0.7 from one model doesn’t mean the same thing as 0.7 from another. Perplexity tells you in its docs to revalidate thresholds whenever its own model version changes.

## What Parallel found when it tested decision models

Parallel trains its own classifiers for search, but each one needs a labeled dataset and rounds of training, so many smaller decisions go without one. Decision models could cover that long tail without training. Parallel’s research team tested them on four real decision tasks from its production pipelines and scored each model against human labels. The team published the results in [Are all System One models created equal?](https://parallel.ai/blog/are-all-system-one-models-created-equal) on October 14, 2026. The tasks were search result reranking, deciding whether a re-crawled page changed enough to re-index, filtering low-quality pages, and routing each query to the right index.

- **Jev was the most consistent.** With starting prompts, it had the best average rank across the four tasks (1.75, where a rank of 1 is best), ahead of pplx-decider-v1 at 2.00 and Liquid d1 at 3.00. Jev also had the lowest and most consistent latency of the models tested.
- **The models differed most on hard tasks.** On page change classification, scored by AUPRC (area under the precision-recall curve), results ranged from 93.3 for pplx-decider-v1 and 87.9 for Jev down to 23.5 for the smallest open-weight model. On easier tasks, most models landed in a narrow band.
- **Prompt tuning narrowed the gaps.** Five rounds of automated prompt rewriting on 800 labeled examples lifted OpenAI’s Decisions API on page change from 79.0 to 88.8, past an untuned Jev.
- **A trained model still won on reranking.** Parallel’s fine-tuned reranker scored 75.2 on top-K overlap, against 71.5 for Jev, the best decision model, at about a quarter of Jev’s per-token cost.

These runs used pplx-decider-v1 and OpenAI’s Decisions API during its public beta. Both vendors have shipped updates since: Perplexity is on v1.2, and OpenAI’s API is generally available. To choose a model, label a few hundred examples of your own task and test candidates on them. In Parallel’s runs, a model’s rank on one task didn’t predict its rank on another. In an earlier [hands-on test of Jev](https://parallel.ai/blog/testing-jev), Parallel found the same pattern. Jev matched one of Parallel’s internal rerankers but trailed the specialized models on topic classification with a large label set and on classifying query freshness.

## Decision models judge evidence but don’t fetch it

A decision model answers from the input you send. Perplexity’s API never fetches a URL, and none of the vendors in this article ground answers in live web data or return citations. Ask whether a company has raised a Series B, and the model can weigh only the text in front of it. If the funding announcement isn’t in the input, the probability reflects a guess. In most real workflows, retrieval comes before the decision. Every task in Parallel’s evaluation was a decision about web content: which result is relevant, whether a page changed, and whether a page is worth keeping.

A search API returns candidate pages with excerpts. A decision model scores each one against your criterion in a single request, and your code keeps the pages that clear the threshold. This example uses [Parallel Search](https://docs.parallel.ai/search/modes) in Fast mode and OpenAI’s Decisions API to check which search results come from an official EU source.

```python
import os

from openai import OpenAI
from parallel import Parallel

parallel = Parallel(api_key=os.environ["PARALLEL_API_KEY"])
openai = OpenAI()

# 1. Retrieve: Parallel Search returns ranked pages with excerpts.
search = parallel.search(
    objective="When do the EU AI Act obligations for general-purpose AI models start to apply?",
    search_queries=["EU AI Act GPAI obligations August 2025 explained"],
    mode="fast",
)
results = search.results[:8]

# 2. Decide: one predicate question per result, all in one request.
questions = [
    {
        "type": "predicate",
        "name": f"result_{i}",
        "instructions": (
            "Was this page published by an official EU body, such as the European "
            "Commission, Parliament, Council, or EUR-Lex, rather than a third party?\n\n"
            f"URL: {r.url}\nTitle: {r.title}\nExcerpt: {' '.join(r.excerpts)[:1500]}"
        ),
    }
    for i, r in enumerate(results)
]

decision = openai.decisions.create(
    model="gpt-6-luna",
    input="Each question describes one web search result. Judge who published it.",
    questions=questions,
)

# 3. Act: keep official sources above a threshold you set from labeled examples.
probability = {a.name: a.probability for a in decision.answers if a.type == "predicate"}
for i, r in enumerate(results):
    p = probability.get(f"result_{i}", 0.0)
    print(f"{p:.2f}  {'KEEP' if p >= 0.7 else 'drop'}  {r.url}")
```

Swap the predicate for a relevance check, a freshness check, or a choice question that routes each page to a different extraction path, and the rest of the code stays the same. Search costs $1 per 1,000 requests in Fast mode. New accounts get up to $80 in free credits, plus $5 a month with a card on file.

## When to use a Decisions API

A Decisions API fits when the answer is bounded, the call happens often, and latency or cost per call matters:

- Routing tickets, requests, or queries to a team, a tool, or a model
- Filtering content by quality, relevance, policy, or source type
- Deciding an agent’s next step: continue, retry, ask for clarification, or escalate
- Scoring severity, urgency, or risk before a person or a program acts
- Reranking candidates by asking the same yes-or-no question about each one

It’s the wrong tool when you need the model to produce something: extracted fields, a summary, an explanation, or code. Use an LLM for those. If one decision runs at high volume and you can collect labels, a small fine-tuned classifier may still beat the decision models on accuracy and cost, as it did for Parallel’s reranker. You can combine all three: an LLM for writing, decision models for the long tail of judgments, and trained models for the few decisions that justify training one.

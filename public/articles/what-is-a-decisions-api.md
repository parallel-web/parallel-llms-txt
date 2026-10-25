# What is a Decisions API? How decision models give software answers instead of text

A Decisions API is the newest way to put a model inside application logic: you define a bounded question, and the model returns a probability your code can branch on, with no text to parse. This guide covers how the request and response work, how it compares with LLM calls and trained classifiers, which providers sell one and at what price, what Parallel learned testing them, and why decision models still need web data.

A Decisions API is an endpoint that answers questions you define with answers you define. You send some input, such as a support ticket, a product photo, a JSON record, or a web page, along with one or more questions, and the API returns a probability for each allowed answer. It writes no text. The result is always one of the options you listed, so your code can compare it against a threshold and act without parsing anything.

The model behind the endpoint is called a decision model. TypeSafe AI, which released the first one, calls the category System One models, after Daniel Kahneman's split between fast, intuitive judgment and slow, deliberate reasoning. Sorting a ticket into one of five queues is a System One task. Writing the reply is not.

## The three question types

Every Decisions API on the market supports the same three kinds of question, though the names differ by vendor.

| Question type | OpenAI name | Jev and Perplexity name | What comes back | Example |
| --- | --- | --- | --- | --- |
| Yes or no | predicate | noul | The probability, from 0 to 1, that the condition is true | Does this ticket ask for a refund? |
| Pick one | choice | choice | The most likely option, a probability for every option, and a confidence value | Which team should handle it? |
| Rate on a rubric | score | score | A probability for each ordered level and their weighted average | How severe is the issue, from cosmetic to fully blocked? |

The score type returns an average, so its result can fall between levels. In [OpenAI's documentation example](https://developers.openai.com/api/docs/guides/decisions), probabilities of 0.1, 0.7, and 0.2 across three severity levels (numbered 0, 1, and 2) produce a score of 1.1. Use choice when the options have no order, such as departments, and score when they do, such as severity.

## What a request and response look like

This is OpenAI's routing example. The `input` holds the evidence, and each question carries a `name` that the response echoes back.

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

One request can carry many independent questions about the same input: up to 400 on OpenAI and up to 128 on Perplexity. Checking a product photo for damage and classifying its category is one call, not two. Questions that depend on an earlier answer need a second request.

## Why decision APIs appeared in 2026

Applications and agents make many small calls between the big ones: classify this input, route this request, decide whether to continue, retry, or ask for clarification. Teams have been making those calls with general-purpose LLMs, which means generating tokens, parsing a string, validating it, and retrying when the format breaks. Each call is cheap on its own. At millions a day, the latency and cost add up, and an agent loop waits on every one of them.

A decision model skips generation. TypeSafe says Jev reads the input and produces every probability in a single pass instead of one token at a time, and claims 70 to 500ms end to end. The billing model follows from that design: every vendor in this article charges for input tokens only, and output is free.

The category moved quickly once it existed:

- **September 15, 2026.** TypeSafe AI [launched Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) and named the category System One models.
- **Early October.** Perplexity launched its Decisions API with the pplx-decider models, and Liquid AI [introduced d1](https://www.liquid.ai/blog/d1-decision-model) on October 5.
- **October 6.** OpenAI opened its Decisions API, built on GPT-6 Luna, as a public beta.
- **October 22.** OpenAI made the Decisions API [generally available](https://openai.com/index/decisions-api), adding prompt caching, JSON input, a native GPT-Live integration, and a limit of 400 questions per request.

OpenAI's launch post includes customer reports. Sierra says it picks the next action in live customer conversations at under 280ms p95, about three times faster and 90% cheaper per call than its previous approach. Datadog scores the risk of agent-generated shell commands before running them and reports 40x faster p95 than frontier models at comparable accuracy. These are vendor-published figures, not independent measurements.

## Decisions API vs. an LLM call vs. a trained classifier

A decision model sits between two tools most teams already use. It is more flexible than a classifier you train yourself and more constrained than an LLM.

|  | LLM with structured outputs | Decisions API | Fine-tuned classifier |
| --- | --- | --- | --- |
| Output | Generated JSON that follows your schema, which can include free text | One of your predefined answers, with probabilities | Scores over a fixed label set |
| Changing the task | Edit the prompt or schema | Edit the question and options in the request | Collect labels and retrain |
| Confidence | Not a primary output | A probability for every answer, by design | Scores, with calibration that varies by model |
| Billing | Input and output tokens | Input tokens only | Your own training and serving costs |
| Good for | Extracting fields, writing explanations, tool calls with arguments | Routing, filtering, triage, gating, reranking | High-volume decisions where you already have labels |

OpenAI draws the same line in its docs: use Decisions when you need a probability, a choice, or a score, use Structured Outputs when you need to generate an object such as extracted fields or a written explanation, and use function calling when the model has to request a tool call with arguments.

TypeSafe markets Jev as unable to hallucinate. That holds for the format, since the answer is always one of your options. It does not hold for the judgment. A decision model can still put 0.9 on the wrong answer, and TypeSafe publishes a list of known weaknesses for each version. For Jev 1.13, that list includes arithmetic, counting, and reading dates as text rather than ordered quantities.

## Which providers offer a Decisions API

As of October 25, 2026, four vendors sell a hosted decision model with published pricing. Prices are list prices per million input tokens.

| Provider | Endpoint | Models | Input price per 1M tokens | Notable limits |
| --- | --- | --- | --- | --- |
| OpenAI | POST /v1/decisions | gpt-6-luna | $0.10 uncached, $0.01 cached | Up to 400 questions per request; text, images, and JSON input |
| Perplexity | POST /v1/decisions | pplx-decider-v1.2 (27B), pplx-decider-flash-v1.2 (4B) | $0.02 and $0.01 | Up to 128 questions; 256K-token context; 10 requests per second by default |
| TypeSafe AI | POST /v1/systemone | Jev 1.13 | $0.042 | 64K-token request context; up to 255 options per choice |
| Liquid AI | Liquid API and OpenRouter | d1, d1-ultra | $0.02 for d1 on OpenRouter | Text and image input |

Perplexity's prices come from [its Decisions API docs](https://docs.perplexity.ai/docs/decisions/quickstart), which also flag a billing detail: the Flash model answers each question separately and bills the input again for every question, so the 27B model is usually cheaper once you ask three or more questions about the same input. Perplexity has already cut its price once, from $0.04 at launch, so check current rates before you budget.

There are two request shapes. OpenAI's API takes `input` and a `questions` array, and calls its yes-or-no type `predicate`. Jev's API takes `state` and a map of named questions, and calls the same type `noul`. Perplexity's request follows Jev's naming at its own `/v1/decisions` path, and OpenRouter serves Jev and d1 with Jev's request schema. Switching vendors means rewriting the request mapping. It also means re-checking your thresholds, because a probability of 0.7 from one model does not mean the same thing as 0.7 from another. Perplexity's docs tell you to revalidate thresholds even when its own model version changes.

## What Parallel found when it tested decision models

Parallel trains its own classifiers for search, but each one needs a labeled dataset and rounds of training, so many smaller decisions never get one. Decision models promise to cover that long tail without training. Parallel's research team tested them on four real decision tasks from its production pipelines, scored against human labels, and published the results in [Are all System One models created equal?](https://parallel.ai/blog/are-all-system-one-models-created-equal) on October 14, 2026. The tasks were search result reranking, deciding whether a re-crawled page changed enough to re-index, filtering low-quality pages, and routing each query to the right index.

The findings worth knowing before you pick one:

- **Jev was the most consistent.** With starting prompts it had the best average rank across the four tasks (1.75), followed by pplx-decider-v1 (2.00) and Liquid d1 (3.00). Jev also had the lowest and most consistent latency of the models tested.
- **Hard tasks separate the models.** On page change classification, scored by AUPRC, results ranged from 93.3 for pplx-decider-v1 and 87.9 for Jev down to 23.5 for the smallest open-weight model. On easier tasks, most models landed in a narrow band.
- **Prompt tuning closes gaps cheaply.** Five rounds of automated prompt rewriting on 800 labeled examples lifted OpenAI's Decisions API on page change from 79.0 to 88.8, past an untuned Jev.
- **A trained model can still win.** On reranking, Parallel's own fine-tuned reranker scored 75.2 on top-K overlap against 71.5 for Jev, the best decision model, at about a quarter of Jev's per-token cost.

These runs used pplx-decider-v1 and OpenAI's Decisions API during its public beta, and newer versions have shipped since. The conclusion that lasts is the method: label a few hundred examples of your own task and test candidates on them before choosing, because rankings on one task did not predict rankings on another. Parallel's earlier [hands-on test of Jev](https://parallel.ai/blog/testing-jev) found the same pattern: Jev matched one of Parallel's internal rerankers but trailed the specialized models on topic classification with a large label set and on classifying query freshness.

## Decision models judge evidence; they don't fetch it

A decision model answers from the input you send. Perplexity's API never fetches a URL, and the other decision APIs work on the content in the request. Ask whether a company has raised a Series B and the model can only weigh the text in front of it, so if the funding announcement isn't in the input, the probability reflects a guess. That makes retrieval the step before the decision in most real workflows. Every task in Parallel's evaluation was a decision about web content: which result is relevant, whether a page changed, whether a page is worth keeping.

The pattern is retrieve, then decide, then act. A search API returns candidate pages with excerpts, a decision model scores each one against your criterion in a single request, and your code keeps what clears the threshold. Here is that loop with [Parallel Search](https://docs.parallel.ai/search/modes) in Fast mode and OpenAI's Decisions API, checking which results come from an official EU source:

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

Swap the predicate for a relevance check, a freshness check, or a choice question that routes each page to a different extraction path, and the shape stays the same. Search costs $1 per 1,000 requests in Fast mode, and new accounts get up to $80 in free credits plus $5 a month with a card on file.

## When to use a Decisions API

A Decisions API fits when the answer is bounded, the call happens often, and latency or cost per call matters:

- routing tickets, requests, or queries to a team, a tool, or a model
- filtering content by quality, relevance, policy, or source type
- gating an agent's next step: continue, retry, ask for clarification, or escalate
- scoring severity, urgency, or risk before a person or a program acts
- reranking candidates by asking the same yes-or-no question about each one

It's the wrong tool when you need the model to produce something: extracted fields, a summary, an explanation, or code. Use an LLM for those. If one decision runs at very high volume and you can collect labels, a small fine-tuned classifier may still beat every decision model on accuracy and cost, as it did for Parallel's reranker. Many teams will end up with all three: an LLM for writing, decision models for the long tail of judgments, and trained models for the few decisions that justify the investment.

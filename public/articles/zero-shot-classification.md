# Zero-shot classification in 2026: from NLI models to decision models

Zero-shot classification lets you sort text into labels you name at runtime, without collecting a single labeled training example first. This guide covers how the NLI approach behind Hugging Face's pipeline works, where embeddings and LLM prompts fit, what the 2026 decision models changed, and what to do when the right label depends on facts that aren't in the text.

Zero-shot classification assigns a text to one of a set of labels that the model never saw during training, so you can change the label set without retraining. The classic recipe, from Yin, Hay, and Roth (2019), turns each label into a hypothesis like "This example is about sports." and asks a natural language inference (NLI) model whether the text entails it; `facebook/bart-large-mnli` in the transformers `zero-shot-classification` pipeline is the implementation Hugging Face's own docs use. In 2026 you can also use embedding similarity, a prompted LLM, or a decision model (System One model) that returns a probability for every label in one pass. When the label depends on facts outside the text, such as "is this company publicly traded?", you need a model that can look them up.

## What zero-shot classification means

In supervised classification you collect labeled examples for a fixed set of classes, train a model, and retrain whenever the classes change. Zero-shot classification skips the labeled examples. You give the model the input and a list of candidate labels at inference time, and it scores how well each label fits.

The term covers two setups that are easy to mix up. In Yin et al.'s "label-partially-unseen" setting, a model trains on some labels and is tested on all of them. In the stricter "label-fully-unseen" setting, the model sees no task-specific training data at all. Most people searching for zero-shot classification today mean the second: an off-the-shelf model, a list of labels you made up this morning, and no training run.

Zero-shot is different from few-shot, where you supply a handful of labeled examples (in a prompt or for a light fine-tune). Many production systems start zero-shot, log the cases a person corrects, and move to few-shot or fine-tuning once they have a few hundred labels.

## The NLI approach behind the Hugging Face pipeline

Wenpeng Yin, Jamaal Hay, and Dan Roth published "[Benchmarking Zero-shot Text Classification: Datasets, Evaluation and Entailment Approach](https://aclanthology.org/D19-1404/)" at EMNLP-IJCNLP 2019 ([arXiv 1909.00161](https://arxiv.org/abs/1909.00161)). Their contribution was to unify zero-shot classification across topics, emotions, and situations under one textual-entailment formulation, and to standardize datasets and evaluation so results could be compared.

The method works like this:

1. Treat the text you want to classify as the NLI premise.
2. Turn each candidate label into a hypothesis with a template, such as "This example is {label}."
3. Run each premise-hypothesis pair through a model trained on an NLI dataset like MultiNLI.
4. Use the entailment score as the score for that label.

The [transformers documentation](https://huggingface.co/docs/transformers/main/en/main_classes/pipelines) describes `ZeroShotClassificationPipeline` the same way: each sequence and label pair is posed as a premise and hypothesis, and the entailment logit becomes the label's score. Any NLI model works as long as its config maps an entailment label. The default `hypothesis_template` is `"This example is {}."`. With `multi_label=False`, scores are normalized across labels so they sum to 1; with `multi_label=True`, each label gets an independent softmax of entailment versus contradiction.

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

result = classifier(
    "The checkout page times out every time I apply a discount code.",
    candidate_labels=["billing", "bug report", "feature request", "shipping"],
    hypothesis_template="This support ticket is a {}.",
)
print(result["labels"][0], result["scores"][0])

# Labels that can co-occur: score each one independently
classifier(
    "one day I will see the world",
    candidate_labels=["travel", "cooking", "dancing", "exploration"],
    multi_label=True,
)
```

On the `facebook/bart-large-mnli` [model card](https://huggingface.co/facebook/bart-large-mnli), the second call returns travel at 0.9945 and exploration at 0.9384, with dancing and cooking below 0.01. The model has about 0.4B parameters.

Three things to know before you ship it:

- Cost grows with the label count. The pipeline runs one forward pass per label, so 50 labels means 50 passes per input. The transformers docs call it slower than a fixed-class classifier but more flexible.
- The template matters. "This example is {}." works for topics, but intent, tone, and policy labels often score better with a template written for the task, like "The customer wants {}."
- Normalized scores are relative. With `multi_label=False` the top label always gets a share of the probability even when none of the labels fits, so add a "none of these" label or use `multi_label=True` and a threshold.

## Embedding similarity

The second common approach embeds the input and a short description of each label with a sentence-embedding model, then picks the label with the highest cosine similarity. It's cheap: you embed the label descriptions once, and each input costs one embedding call plus a dot product per label, so thousands of labels are practical.

The trade-off is that similarity measures topical closeness, which isn't the same as "this label is true of this text." A complaint about a refund and a question about the refund policy can land close together. Similarity scores also aren't probabilities, so you have to pick thresholds per label from data. Embeddings work well for routing into many topical buckets and for deduplication, and less well for yes/no policy questions.

## LLM prompting

You can also put the labels in a prompt and ask a general-purpose LLM to pick one, usually with structured outputs so the reply parses. This handles nuance well: long label definitions, edge-case rules, and multi-step reasoning about the text. It costs more per call than the options above, adds latency from generating tokens, and returns a label without a probability you can threshold. Asking the model to state its confidence in text gives you a number, but not a calibrated one.

## Decision models: calibrated probabilities in one pass

Decision models, also called System One models, are the 2026 answer to "I want an LLM's understanding with a classifier's output." TypeSafe launched Jev on September 15, 2026 and coined the System One name; OpenAI, Perplexity, Liquid AI, Cloudflare, Microsoft, Baseten, and others shipped their own within weeks. They share a shape: you send a `state` (the text or data) and named, typed questions, and get back structured answers with probabilities and no generated text. The common question types are:

- `choice`: pick one of up to 255 named options (Jev's and Perplexity's limit) and return a probability for each.
- `noul` (OpenAI calls it `predicate`): the probability that a statement about the state is true.
- `score`: a probability over an ordered scale of up to 10 levels.

For zero-shot classification, a `choice` question is the direct replacement for the NLI pipeline: the option keys are your labels, the values are short definitions, and every label gets a probability in one call. Here's TypeSafe's documented Python SDK pattern for Jev:

```python
from typesafe_sdk import Choice, TypeSafeClient

with TypeSafeClient() as client:
    response = client.system_one(
        state="My running shoes arrived in the wrong size. Can I swap them for a size 10?",
        questions={
            "department": Choice(
                instructions="Which team should handle this?",
                criteria={
                    "returns": "Exchanges, wrong or damaged items",
                    "shipping": "Delivery status, delays, lost packages",
                    "billing": "Charges, invoices, payment problems",
                },
            ),
        },
    )
    answer = response.answers["department"]
    print(answer.choice, answer.probabilities)
```

Per [TypeSafe's docs](https://docs.typesafe.ai/primitives/choice.md), every question in a request is evaluated in parallel and in isolation against the same state, so adding labels or questions barely changes response time. Jev is trained with RLCD (Reinforcement Learning for Calibrated Decisions) and is priced at $0.042 per 1M input tokens with free output. OpenAI's Decisions API (`gpt-6-luna`) costs $0.10 per 1M uncached input tokens and takes up to 400 questions per request; Perplexity's `pplx-decider-v1.2` costs $0.02 per 1M and reads up to 256K tokens of context.

A note on Laya, because it shows up in every "Jev alternatives" search. Laya is an open-weights (Apache-2.0) decision model from Convai Innovations built on encoders (ModernBERT-large, 421M parameters, for English), not an LLM. It's fast, around 30 to 40 ms per question on a T4 GPU in the vendor's tests, and you can self-host and fine-tune it. Its own model card is candid that the base checkpoints are weak zero-shot: on a 2,000-decision typed-decisions benchmark they scored 0.362 and 0.352, below the 0.461 majority-class baseline, while the fine-tuned checkpoint scored 0.766. The card's own summary: "Laya is a fast base to specialise, not a zero-shot decision engine." The card also reports calibration error (ECE) of 0.466 as shipped and 0.081 after refitting the temperature. If you have labeled data and need millisecond decisions on your own hardware, Laya is a strong option; for zero-shot labels out of the box, the hosted LLM-based decision models are the better fit.

## Comparison of zero-shot approaches

| Approach | Needs labeled data | Output | Calibration | Latency | Cost | When to use |
| --- | --- | --- | --- | --- | --- | --- |
| NLI pipeline (bart-large-mnli) | No | Score per label | Relative scores; not calibrated | One forward pass per label | Free to self-host | Offline batches, a few to a few dozen labels |
| Embedding similarity | No (label descriptions) | Similarity per label | None; thresholds set per label | One embedding per input | Very low | Many topical buckets, routing, dedup |
| Prompted LLM | No | Generated label | None by default | Seconds | Highest per call | Long policy definitions, rare nuanced cases |
| Decision model (Jev, OpenAI, Perplexity) | No | Typed answer plus per-label probabilities | Trained or tuned to be calibrated | About 100-300 ms | $0.02-$0.10 per 1M input tokens | Production labeling of text you already have |
| Laya (open-weights decision model) | Yes, to perform well | Typed answer plus probabilities | Needs temperature refit | Tens of ms on a GPU | Self-host or about $0.036 per 1M hosted | Fine-tuned, on-prem, multilingual, high volume |
| Web-grounded decision model (Parallel) | No | Typed answer plus probabilities and citations | Probabilities from live evidence | Under 1 s typical | $1 per 1,000 requests | Labels that depend on facts outside the input |

Latency figures are vendor or third-party numbers and aren't measured on the same hardware: OpenAI cites 100-180 ms for Decisions, third parties measured Jev at 236-276 ms p50 over HTTP, and Laya's numbers are in-process GPU timings.

## When the label depends on facts outside the text

Every approach above classifies what's in the input. Some labels aren't in the input at all:

- "Is this company publicly traded, private, or acquired?"
- "Is this product still sold, or discontinued?"
- "Is this vendor on the brand's authorized list?"
- "Does this supplier hold the certification it claims?"

Given only the name "Figma," an NLI model or an answer-from-input decision model can only guess from whatever its training data held, and that goes stale. Figma, for example, has traded on the NYSE under FIG since July 31, 2025 ([Figma 10-K](https://www.sec.gov/Archives/edgar/data/1579878/000162828026009228/fig-20251231.htm)), which a model trained earlier wouldn't know. TypeSafe's own docs say Jev answers from the state only, and the same holds for OpenAI's Decisions endpoint unless you pass in your own search results. Perplexity's decision API has a `web_grounding` mode that runs one search per question for this case.

Parallel's [Decisions API](https://parallel.ai/products/decisions) (we build it, so weigh that) takes the same `state` plus typed questions, searches the live web once, and answers every question in the request against that shared evidence, returning citations for the call. A `choice` question with an `unknown` option is how you ask a zero-shot question about the world and get an honest abstention when the evidence is thin. We ran this request on November 6, 2026:

```python
import os, requests

request = {
    "state": {"company": "Figma", "website": "https://www.figma.com"},
    "questions": {
        "listing_status": {
            "type": "choice",
            "instructions": "What is this company's ownership status today?",
            "criteria": {
                "public": "Its shares trade on a public stock exchange",
                "private": "Privately held, not listed on any exchange",
                "acquired": "Acquired by another company and no longer independent",
                "unknown": "The evidence does not establish its status",
            },
        },
        "segment": {
            "type": "choice",
            "instructions": "Which category best describes the company's main product?",
            "criteria": {
                "design_tools": "Software for interface and product design",
                "fintech": "Payments, banking, or financial software",
                "devtools": "Developer infrastructure and coding tools",
                "other": "None of the above",
            },
        },
    },
}

r = requests.post(
    "https://api.parallel.ai/v1/decisions",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json=request,
)
print(r.json()["answers"])
```

```json
{
  "mode": "fast",
  "answers": {
    "listing_status": {
      "type": "choice",
      "choice": "public",
      "probabilities": {"public": 0.993, "private": 0.002, "acquired": 0.005, "unknown": 0.001},
      "confidence": 0.990
    },
    "segment": {
      "type": "choice",
      "choice": "design_tools",
      "probabilities": {"design_tools": 0.997, "fintech": 0.0002, "devtools": 0.002, "other": 0.0002},
      "confidence": 0.996
    }
  },
  "citations": [
    {"url": "https://investor.figma.com/news-events/news/news-details/2025/Figma-Announces-Pricing-of-Initial-Public-Offering/default.aspx"},
    {"url": "https://www.sec.gov/edgar/browse/?CIK=1579878"},
    {"url": "https://www.nytimes.com/2025/07/31/technology/figma-ipo.html"}
  ],
  "decision_id": "decisions_be62e972da69a68be8556eedfdba2a70"
}
```

The call took 541 ms end to end from our client and cost $0.001. A second request asking whether Microsoft's consumer Skype is active or discontinued returned `discontinued` at 0.990 in 577 ms, citing Microsoft's lifecycle pages; Microsoft retired Skype on May 5, 2025. Note that `segment` didn't need the web, so it rode along on the same request at no extra cost.

This isn't the right tool for every label. If the answer is in the text, an answer-from-input decision model is 10 to 100 times cheaper per question and faster. And on a hard, Parallel-built benchmark of web questions ([PWS-Decisions](https://parallel.ai/blog/pws-decisions-benchmark), random-guess baseline 42.4%), GPT-6 Luna with native web search scored 97.3% against Parallel Decisions' 76.2%, while running about 13 times slower at about 16 times the cost. Use web-grounded decisions where the label runs on every record or inside an agent loop and sub-second matters; use a research agent when one hard answer matters more than speed.

## How to choose

- Prototype with the NLI pipeline. It's free, local, and good enough to learn whether your label set makes sense.
- Use embeddings when you have hundreds of topical labels and need low cost per input.
- Use an answer-from-input decision model for production labeling of text you already have, where you want probabilities to threshold and route on.
- Fine-tune Laya (or another encoder) once you have labeled data and need on-prem or millisecond inference.
- Use a web-grounded decision model when the label is a fact about the world that changes.

## Frequently asked questions

**What is zero-shot classification?** It's classifying inputs into labels the model wasn't trained on, by supplying the label names (and often short definitions) at inference time. No task-specific labeled examples are needed, so you can change labels without retraining.

**Which model is best for zero-shot classification on Hugging Face?** `facebook/bart-large-mnli` is the model the transformers docs use for the `zero-shot-classification` pipeline and a sensible default for English. Any model fine-tuned on an NLI dataset works, including multilingual NLI checkpoints for other languages.

**Why is the zero-shot pipeline slow with many labels?** The pipeline runs one NLI forward pass for each candidate label, so cost and latency grow linearly with the label count. Embedding similarity or a decision model that scores every option in one call scales better.

**Are zero-shot classification scores probabilities?** Not calibrated ones. With `multi_label=False` the pipeline normalizes scores to sum to 1 across your labels, so the top label gets probability mass even when none fits. Decision models are trained or tuned for calibrated probabilities, and Laya's card recommends a temperature refit before trusting its scores.

**Can zero-shot classification use information that isn't in the text?** Only if the model can fetch it. NLI models, embeddings, and answer-from-input decision models classify what's in the input. For labels like "publicly traded" or "discontinued," use a web-grounded decision API such as Parallel's Decisions API or Perplexity's `web_grounding` mode.

## Try it

Run your own label set in the [Decisions playground](https://platform.parallel.ai/play/decisions) (5,000 free requests), or read the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). In Claude, Cursor, or another MCP client, the keyless `web_decisions` tool in [Parallel MCP](https://parallel.ai/mcp) works without an account: "Use Parallel Decisions to check whether Figma is publicly traded."

Related reading: [What is a System One model?](https://parallel.ai/learn/system-one-model) / [Laya vs. Jev vs. Parallel](https://parallel.ai/articles/laya-vs-jev-vs-parallel) / [Entity matching with decision models](https://parallel.ai/articles/entity-matching) / [Content moderation API options](https://parallel.ai/articles/content-moderation-api)

# Are all System One models created equal?

At Parallel, we train a lot of our own classifiers. But for every classifier we train, there are use cases we can’t prioritize, because each classifier requires curating a labeled dataset, then iterating through rounds of training and evaluation. That's why we're excited about System One models: decision models that answer a yes/no or multiple-choice question about any input, with no training.

![Jevxplosion, Jev adoption since launch: cumulative decision calls by days since release. Jev 1.13 reaches 3.27B calls, GPT-6 Luna 845M and MiMo-V2.6-Flash 365M.](https://cdn.sanity.io/images/5hzduz3y/production/fe2c0c363215d9af87a5d9219a7d60753595cb3d-1936x1344.png)

[When we first evaluated Jev, ](https://parallel.ai/blog/testing-jev)TypeSafe’s decision model, its zero-shot performance impressed us. Since its release, we’ve seen an explosion of these Jev-like “decision” models, many claiming to meet or beat it on accuracy. We wanted to know whether open models have caught up, so we tested multiple trending decision models on real, human-labeled tasks from our production pipelines.

Here's what we found:

- Jev generalizes well across all four tasks, and its hosted API offers the best combination of cost and latency among the models we tested.
- Open source models can be quality competitive with Jev on zero shot tasks, but self-hosting adds operational complexity that can erase their cost and latency advantage. We include serving details in the appendix.
- Automated prompt tuning added up to ~10 points of AUPRC on our hardest task, with no training.
- **On tasks sensitive to cost, latency, or quality, consider fine-tuning your own model.** Our small fine-tuned reranker scored 3.8 percentage points above the best decision model, and a model that size costs far less to serve than any decision model we tested.

## The Evaluation

### Models

We tested three hosted models ([Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), [OpenAI's Decisions API](https://developers.openai.com/api/docs/guides/decisions) and [Liquid's d1](https://www.liquid.ai/blog/d1-decision-model)) and five open-weight models ([pplx-decider-v1-27b](https://huggingface.co/perplexity-ai/pplx-decider-v1-27b), [Rune 26B-A4B](https://huggingface.co/surogate/rune-26b-a4b-GGUF), [Bespoke Nimble 9B](https://ollama.com/library/nimble), [Kev-4B](https://huggingface.co/jaredpalmer/kev-4b) and [GLiNER2.5-Decide](https://fastino.ai/blog/gliner-2-5-decide-open-weight-decision-model)). Hosted models were called through their public APIs. Open-weight models used their public Hugging Face checkpoints, using each release's own inference code where one was provided. The exception is pplx-decider-v1-27b, which we called through Perplexity's API.

![](https://cdn.sanity.io/images/5hzduz3y/production/4962974a4ef2c4ca2c8b445661ff12a1a3d53084-1764x1299.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/69ca9498c8c0b97f9ce4c5866ba6f387e065d0d5-1764x1074.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/8e965df6f26878be218ba1b8ea12931b736b74b2-1764x1260.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/6b197dd14390e4544698980769797cce62564e18-1764x1275.png)

### Tasks

We used four decision tasks from our production pipelines:

- **Search result reranking:** order a search query's candidate results by relevance to the query.
- **Page change classification:** decide whether a page’s content changed in a way that warrants re-processing.
- **Low-quality content filter:** flag “low quality” web pages that should be downranked or omitted.
- **Query routing:** find the right index for each query.

The chart below shows how each model ranked on every one of the tasks. We also look closely at two specific tasks: reranking, where the models were most closely matched, and page change classification, where results diverged in favor of closed and larger open-source models.

![Classification performance across System One models, starting prompts: Jev ranks first (average rank 1.75), then pplx-decider-v1 (2.00), d1 (3.00), Rune 26B (4.25), Decisions API (5.00), Nimble 9B and Kev-4B (6.00) and GLiNER2.5-Decide (8.00). API latency ranks: Jev 1, Decisions API 2, pplx-decider-v1 3.](https://cdn.sanity.io/images/5hzduz3y/production/97267d19b25d28d3aa3e8a2784dfb265ce54221b-1936x1036.png)

## Reranking

Given a search query and a set of candidate results, a reranker orders the candidates so the most relevant results come first. To evaluate reranking, we asked each model a yes/no question per candidate result ("Is this **result** relevant to the **query**?"), sorted the candidates by each model’s probability of answering yes, and measured top-K overlap: the share of each model’s top K results that also appear in the human-labeled top K.

![Search reranking, decision models vs. our fine-tuned reranker, top-K overlap: Parallel fine-tuned reranker 75.21, Jev 71.45, Perplexity 70.68, Liquid d1 70.51, Rune 26B 68.97, OpenAI Decisions 68.38, Nimble 9B 68.21, Kev 4B 67.35, GLiNER2.5-Decide 60.94.](https://cdn.sanity.io/images/5hzduz3y/production/52f871b98effaecda5ead86a235e63ef5ce1d516-1936x940.png)

Most models land in a narrow band because our data set consists of representative ranking tasks, which often include obvious cases. The gaps, then, reflect truly “difficult” scenarios, where weaker models often fail. Jev (71.5), pplx-decider-v1 (70.7) and Liquid d1 (70.5) are effectively tied at the top. GLiNER, the smallest model of the bunch, trails far enough behind that it isn't competitive here. Our fine-tuned reranker scores 75.2, 3.8 percentage points above Jev, a gap well outside the margin of error.

That is why we still train specialized models for our most important decisions. This lets us achieve competitive results with smaller models, and, at high utilization, serve them at a fraction of Jev's cost. The cost is development: collecting labels, training, and serving dedicated models. For reranking, that investment is worth it for us. For the many use cases we haven't trained a model for, decision models let us test and ship new product features much faster.

## Page change classification: A difficult task

When we re-crawl a page, we need to know whether its contents changed enough to warrant a full update of our index. This task is a magnet for edge cases: a job listing reordering two requirements may not qualify as a meaningful change, while a leaderboard shuffling its entries is extremely meaningful. Here we gave each model the old and new versions of a page, asked if the page changed in a meaningful way, and scored the answers with AUPRC, which measures how well the model's probability separates material changes from cosmetic ones across every threshold.

![Page change classification before prompt tuning, AUPRC: pplx-decider-v1 93.3, Jev 87.9, d1 80.8, Decisions API 79.0, Rune 26B 74.1, Nimble 9B 65.1, Kev-4B 56.7, GLiNER2.5-Decide 23.5.](https://cdn.sanity.io/images/5hzduz3y/production/e8b624f3bba99103bfd6bb8699509924cd75c907-1936x958.png)

Unlike reranking, here we observe substantial divergence in model accuracy across models. Closed models and larger open source models perform better on this type of task. Before choosing a model on third-party benchmarks, consider testing it on a labeled sample of your own task.

## Prompt tuning

Another benefit of decision models is that they can be flexibly prompted. A fine-tuned classifier is fixed by inference time. When it gets a category of question wrong, the only solution is more labels and another training run. A decision model, meanwhile, takes its instructions as input, so its behavior can be tuned.

We show here the impact of a simple prompt tuning experiment – a bare-bones version of the automatic prompt optimization that libraries like DSPy can perform, to demonstrate the benefits of this technique:

```python
prompt = starting_prompt
best = evaluate(model, prompt, calibration_set)

for _ in range(5):
    misses = wrong_answers(model, prompt, calibration_set)
    candidate = claude.rewrite(prompt, misses)  # one new rule per kind of miss
    score = evaluate(model, candidate, calibration_set)
    if score > best:
        prompt, best = candidate, score

final = evaluate(model, prompt, held_out_set)  # scored once

```

![Prompt tuning on a calibration set: prompt, score, find misses, rewrite, repeated five times. Rune 26B on page change goes from 79.8 to 89.1 AUPRC on the calibration set (+9.3 points), and from 74.1 to 83.9 on the held-out set.](https://cdn.sanity.io/images/5hzduz3y/production/90450e2b5aeed79712883b751d766c1c149c6d7a-1764x1236.png)

We tuned each model across 5 rounds on a small labeled calibration set (800 examples for page change), and scored the winning prompt once on a held-out set. Each rewrite turns a batch of mistakes into explicit rules, which works a little like adding few-shot examples to the prompt, compressed into instructions.

![Mean AP lift from prompt tuning over query routing, page change and content quality: Perplexity 97.6 (+0.3), Jev 96.5 (+1.0), OpenAI Decisions 95.1 (+6.4), Rune 26B 94.2 (+4.0), Liquid d1 94.1 (+2.3), Nimble 9B 89.7 (+5.0), Kev 4B 86.4 (+4.5), GLiNER2.5-Decide 44.4 (+13.4).](https://cdn.sanity.io/images/5hzduz3y/production/13d1293ce394b6961164630c6ef161c30ab089b8-1936x948.png)

Prompt tuning improves these models cheaply: all that is required is a small labeled set and a few thousand model calls, and no training. The cost is a small increase in input token count. On page change, our hardest task, Nimble 9B, Rune 26B-A4B and OpenAI’s Decisions API each gained about 10 points.

## Conclusion

It’s exciting that in a short time, we are seeing a thriving ecosystem of open and closed models in a category of models that did not exist as such until four weeks ago.

Accuracy isn’t everything, though, and we still find Jev a strong default for most use cases. Along with `pplx-decider-v1`, it was the most consistent model across all four production tasks when considering accuracy, and as a serverless API it avoids the complexity of self-hosting an open-weight model. Jev also had both the lowest and most consistent latency of the models we’ve tried, and with a generous rate limit and competitive cost, it’s hard to beat as a starting point. However, there are a number of use cases where we recommend considering other options:

- **For tasks where latency, cost or quality matter most, it may still be worth it to fine-tune a custom classifier.** On reranking, our fine-tuned reranker scored 3.8 percentage points above the best decision model, at about a quarter of Jev’s per-token cost.
- **Tuning the prompt can save you from paying for a bigger model.** On page change – our hardest task – five rounds of prompt tuning on 800 examples lifted Nimble 9B (75.3) past an untuned Rune 26B (74.1). It also lifted OpenAI’s Decisions API (88.8) past an untuned Jev (87.9).
- **On easy tasks, a small model may be enough.** On query routing and content quality, Kev-4B and Nimble 9B both score above 91 out of the box, and each runs on a single small GPU (an L4 and an A10G, respectively).

Decision models are improving quickly, and we expect some of these results to change as new models are released. We’re excited about this category of model and will continue to follow new releases closely. If you have results from your own production tasks, let us know at [@p0](https://x.com/p0?lang=en).

---

### Serving details

| Model | Checkpoint (pinned) | Inference code | Precision / GPU | Max tokens per question | Calibration |
| --- | --- | --- | --- | --- | --- |
| pplx-decider-v1-27b | Perplexity API | n/a (hosted) | n/a (hosted) | 8,192 | n/a |
| Rune 26B-A4B | michaelfeil/rune-26b-a4b @ d9507c3 (Baseten's mirror of Surogate's Rune v3 @ c6b360d) | Baseten's BEI engine (TensorRT-LLM), deployed by Baseten | BF16 / 2× H100 | Not set (supports up to 262k context) | Baseten default |
| Bespoke Nimble 9B | bespokelabs/Bespoke-Nimble-9B release v3-12026 (545864f; same weights as main @ bd792f4) | Release’s own inference.py | BF16 / 1× A10G | 8,192 | T=1 |
| Kev-4B | Kev 1.0 (v1.0) on Qwen/Qwen3.5-4B-Base (1001bb4), kev code @ 952ce9d | Kev’s own server, which batches concurrent requests | BF16 / 1× L4 | 8,192 | Checkpoint’s temperature (2.41) |
| GLiNER2.5-Decide | fastino/GLiNER2.5-Decide @ 5a7adf7 | gliner2 2.0.0 | FP32 / 1× A10G | 2,048 (middle of the input trimmed) | Softmax over labels, no temperature |

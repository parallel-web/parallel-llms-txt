# JevBench explained: how decision models are benchmarked, and what it can't measure

JevBench is the name most people search when they want to know how decision models like TypeSafe's Jev are compared, but the name covers several unrelated projects. This explainer covers which JevBench is which, how the main leaderboard scores intelligence, calibration, speed, and cost, where Jev 1.13 and 1.14 land, and why questions that depend on current web facts need a different test.

JevBench usually means Benchmark Heaven's independent leaderboard for decision models (also called System One models): each system answers 1,500 typed decisions, 300 public and 1,200 sealed, and is scored on Intelligence, Calibration, Speed, and Cost. On board v1.8.7 (Nov 3, 2026), baselabs mammoth-1 leads the open-weights Capability ranking at 85.2 and Super Decider leads the hosted-API Composite ranking at 78.5. TypeSafe's Jev 1.13.0 and 1.14.0 score 77.1 and 75.0 Capability. TypeSafe doesn't run it, and every item carries its answer in the input, so it doesn't test questions that depend on current facts from the web.

## Which JevBench? Five projects share the name

Search for "JevBench" and you'll find at least five projects. None of them is run by TypeSafe AI, and their scores don't carry across.

| Project | Run by | What it measures | Size |
| --- | --- | --- | --- |
| JevBench by Benchmark Heaven (benchmarkheaven.com/jev-models) | Florian Standhartinger, independent | Typed decision accuracy, calibration, latency, and cost; the main leaderboard | 1,500 decisions per system (300 open, 1,200 sealed), method v1.8 |
| BenchLM's JevBench page (benchlm.ai) | BenchLM | Republishes Benchmark Heaven's v1.5.4 release | 1,624 decisions (904 open, 720 sealed) |
| LeanMCP JevBench (leanmcp.github.io/jevbench) | LeanMCP | Open framework and index for typed decision models; anyone can submit datasets or models | Varies by dataset |
| JevBench coherence tests (jevbench.github.io) | Chen Feng, ML Lab, Queen's University Belfast | Whether related answers are consistent (a question and its negation, merged options); no gold labels | 1,200 tests on 240 cases (JevBench-mini) |
| jevbench.dev | Independent | Decision models playing games such as StarCraft II, scored by verified wins | 105 published runs |

The rest of this article is about the Benchmark Heaven board, since that's what most people mean. BenchLM's numbers come from an older Benchmark Heaven release and use a different scoring protocol, so don't compare them with v1.8 scores.

## How Benchmark Heaven's JevBench works

Benchmark Heaven describes the format as "state and rubric in, typed answer out." Every system sees the same state, instructions, rubric, and exact label set, sent through whatever interface its author published (TypeSafe's `/v1/systemone` wire format, an OpenAI-compatible endpoint, or local weights).

### What a task looks like

Here is one of the MIT-licensed public items from the GitHub repo, a yes/no ("noul") policy check:

```json
{
  "state": "Policy: refunds require a receipt and purchase within 30 days. A customer bought 12 days ago but has no receipt. Issue a refund.",
  "question": {
    "type": "noul",
    "instructions": "Under the stated policy, is the requested action permitted? Treat unproved required conditions as not satisfied.",
    "criteria": {
      "true": "Every required condition is established and no prohibition applies.",
      "false": "A condition is missing or a prohibition applies."
    }
  },
  "labels": ["no", "yes"],
  "expected": "no"
}
```

The sealed release draw has 1,200 items (600 choice, 300 noul, 300 score) and the public set has 300 (150, 75, 75). Items span easy, standard, hard, and judge tiers, weighted 0.1, 0.2, 0.4, and 0.3. The largest topic group is rules, policy, and law, followed by coding and math. Sealed items rotate: each is scored in at most three releases, and once two different providers have received an item, it's retired for everyone.

### How the four axes are scored

- **Intelligence:** chance-corrected accuracy, half from public items and half from sealed. If a system's public score beats its sealed score by more than the field median gap plus 8 points, it loses Intelligence points.
- **Calibration:** checks the full probability distribution, not just whether confident answers were right. It combines top-label error with distribution distance for choice questions and ranked-probability error for score questions.
- **Speed:** measured latency. Hosted APIs are timed end to end with the network included. Self-hosted models are timed on Benchmark Heaven's own GPUs and then estimated as 2 x measured p50 + 150 ms, an assumption the maintainer labels as such.
- **Cost:** dollars per 1,000 decisions, not per 1,000 tokens. Self-hosted open weights have been priced on rented GPU time since v1.8.0 (Oct 29, 2026); APIs keep their list prices.

Two headline scores sit on top. **Capability** is the mean of Intelligence and Calibration, and it ranks only systems that are within twice Jev 1.13.0's cost and median latency as measured in v1.5: $0.0646 per 1,000 decisions and 1.23 seconds. **Composite** is a weighted harmonic mean of all four axes, with squared penalties when Intelligence falls below 50 or Speed or Cost falls below 50.

### The 10-second rule and the two boards

Since method v1.7, any decision that takes longer than 10 seconds counts as a wrong answer and zero calibration for that item. The maintainer's reasoning: a decision model runs inside live software, and a median latency can hide a slow tail.

There are two boards. The open-weights board ranks models Benchmark Heaven runs on its own hardware and leads with Capability. The hosted-API board ranks vendor endpoints and leads with Composite, because API prices are set by the vendor and readers can't reproduce them.

## Where Jev and other models rank

Jev 1.13.0 is the reference row: it defines the cost and latency caps and is shown unranked on the open-weights board. Both Jev versions are ranked on the API board. Numbers below are from board v1.8.7, updated Nov 3, 2026.

| System | Board | Capability | Composite | Rank |
| --- | --- | --- | --- | --- |
| baselabs mammoth-1 (27B) | Open weights | 85.2 | 75.4 | #1 by Capability |
| Torchcast Decision 4B (v1.3) | Open weights | 77.5 | 80.5 | #1 by Composite |
| Super Decider | Hosted API | 84.9 | 78.5 | #1 by Composite |
| d1-ultra (Liquid AI) | Hosted API | 80.5 | 76.0 | #5 by Composite |
| Jev 1.13.0 (TypeSafe) | Hosted API | 77.1 | 71.4 | #15 by Composite |
| Jev 1.14.0 (TypeSafe) | Hosted API | 75.0 | 70.2 | #18 by Composite |
| OpenAI Decisions (gpt-6-luna) | Hosted API | 73.5 | 62.4 | #24 by Composite |
| GPT-6 Luna, medium reasoning | Hosted API | 98.4 | 39.1 | #32 by Composite, outside caps |

Jev 1.13.0 breaks down to Intelligence 63.6 and Calibration 90.6; Jev 1.14.0 is 59.9 and 90.1. OpenAI Decisions was measured on a 600-item subset and equated to the full scale.

The last row is worth a second look. A general reasoning model scores the highest Capability on the board, but it costs 3.5 times as much as Jev and takes 3.1 times as long, so it falls outside the caps and its Composite collapses. That's the tradeoff JevBench is built to expose: decision models aim to be nearly as accurate for a fraction of the cost and time.

## Other leaderboards for decision models

Two other boards also score answer-from-input decisions:

- **Artificial Analysis Decision Index** (23 models, Nov 5, 2026 snapshot) weights AA-Omniscience-Decision accuracy and non-hallucination at 12.5% each and HLE-MultiChoice, When2Call, and WildGuardTest at 25% each. d1-ultra leads at 65.2; Jev 1.13 is 9th at 57.5 and Jev 1.14 is 10th at 57.1.
- **AIM System One Index** from AIMultiple covers 62 models. d1-ultra is first with a score of 60. Laya is the fastest at 30 ms per decision, and Perplexity's Decider Flash is the cheapest at $0.007 per 1,000 decisions.

Parallel isn't on any of these boards, because all of them put the answer in the input.

## What answer-in-input benchmarks measure, and what they don't

In every JevBench item, the facts needed to answer are in the state. The refund example above is a clean case: the policy and the customer's situation are both given, and the model has to apply one to the other. That tests reading, rule application, calibration, latency, and price, which is exactly what you need to know when choosing a model to route tickets, triage claims, or guard an agent's tool calls.

What it can't test is a question whose answer lives outside the input and changes over time. "Does this vendor support SAML SSO today?" "Did this supplier get ISO 27001 certified this year?" "Is this company still hiring for 20+ roles?" A decision model without retrieval answers those from whatever it learned in training. In Parallel's launch demo, jev-1.14.0 was asked whether Parallel supports EU data residency, which launched Oct 14, 2026. It said no with probability 0.86 and no sources. Parallel's Decisions API said yes with probability 1.00, citing Parallel's blog and docs. Neither JevBench nor the AA or AIM indexes would catch that kind of miss, because none of their items need the web.

## PWS-Decisions: a complementary test for web-dependent decisions

We build Parallel's Decisions API, so weigh what follows with that in mind. Parallel built PWS-Decisions to fill this gap: 300 English multiple-choice questions (2 to 5 options) about dated public-web facts, 100 public with answers and 200 private, scored by exact match. Three caveats matter:

- The questions were chosen for difficulty. Questions that every tested provider got right were removed, so this is a development challenge set, not an estimate of average accuracy.
- The uniform random-guess baseline is 42.4%, because most questions have two options.
- The other decision APIs ran without supplied web context. Perplexity ran through OpenRouter without its `web_grounding` mode, and no web-grounded Perplexity result has been published.

| System (Oct 29, 2026, mean of 3 runs) | Accuracy, 300 questions | p50 latency | Cost per 1,000 questions |
| --- | --- | --- | --- |
| GPT-6 Luna + native web search (Responses API) | 97.3% | 7.42 s | $16.52 |
| Claude Haiku 5.5 + native web search | 96.6% | 6.38 s | $27.43 to $28.79 |
| Parallel Decisions API (fast) | 76.2% | 0.56 s | $1.00 |
| Perplexity Decisions, no web grounding | 50.9% | n/a | $0.0042 |
| OpenAI Decisions API (gpt-6-luna) | 41.7% | n/a | $0.0228 |
| TypeSafe Jev 1.14 | 33.4% | n/a | $0.0185 |

An LLM agent with web search is more accurate on this set. Parallel's case is speed and cost: about 13 times faster than GPT-6 Luna with search at the median, at about 1/16 the cost. That fits decisions that run on every record or inside an agent loop. When one hard question matters more than speed and cost, use a research agent or Parallel's Task API instead. Several systems land near or below random guessing because they answered from the question alone, which is the point of the comparison.

Parallel also ran a 231-question JevBench set, answer in input, on three systems: OpenAI Decisions scored 90.0%, Parallel 89.6%, and Jev 88.3%. All three are within two points, with OpenAI highest. On answer-in-input decisions, Jev, OpenAI, and Perplexity also cost 10 to 100 times less per question than Parallel, because they don't run a web search.

## Run a web-dependent decision yourself

Here's a question JevBench can't ask: what's the newest Jev release and its price? The answer has to come from the web. We ran this request on Nov 6, 2026:

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {"product": "Jev, the decision model from TypeSafe AI", "docs": "https://docs.typesafe.ai"},
    "questions": {
      "latest_jev_version": {"type": "choice", "instructions": "Which is the newest Jev model version TypeSafe AI has released?",
        "criteria": {"jev_1_13": "jev-1.13.0", "jev_1_14": "jev-1.14.0", "jev_1_15_or_later": "jev-1.15 or a later version", "unknown": "Not enough evidence to tell"}},
      "jevbench_run_by_typesafe": {"type": "noul", "instructions": "Is the JevBench leaderboard at benchmarkheaven.com run by TypeSafe AI itself?"},
      "jev_price_per_million": {"type": "choice", "instructions": "What does TypeSafe charge per 1M input tokens for jev-1.14.0?",
        "criteria": {"usd_0_042": "$0.042", "usd_0_10": "$0.10", "usd_1_00": "$1.00", "other": "Some other price"}}
    }
  }'
```

The response, trimmed to the answers and the first three of ten citations:

```json
{
  "mode": "fast",
  "answers": {
    "latest_jev_version": {"type": "choice", "choice": "jev_1_14", "confidence": 0.96},
    "jevbench_run_by_typesafe": {"type": "noul", "noul": 0.019},
    "jev_price_per_million": {"type": "choice", "choice": "usd_0_042", "confidence": 0.99}
  },
  "usage": {"input_tokens": 3220, "output_tokens": 0},
  "citations": [
    {"url": "https://docs.typesafe.ai/models", "title": "Models - TypeSafe docs"},
    {"url": "https://typesafe.ai/blog/jev-1-14", "title": "Jev: For the builders AND dreamers - TypeSafe AI Blog"},
    {"url": "https://benchmarkheaven.com/jev-models", "title": "JevBench - AI decision model benchmark & leaderboard"}
  ]
}
```

All three answers match the primary sources, and the call cost $0.001. The round trip from our client took 1.8 seconds, slower than the sub-second typical figure Parallel publishes.

## Frequently asked questions

**Who runs JevBench?** The main JevBench leaderboard at benchmarkheaven.com is run by Florian Standhartinger under the Benchmark Heaven name, as a one-person project independent of TypeSafe AI. The harness is MIT-licensed on GitHub at fstandhartinger/jevbench. Other projects use the same name: BenchLM republishes an older Benchmark Heaven release, LeanMCP runs an open typed-decision framework, Queen's University Belfast runs a coherence benchmark, and jevbench.dev ranks models by game wins.

**Is JevBench run by TypeSafe?** No. TypeSafe AI makes Jev, but every project called JevBench is independent of TypeSafe. Benchmark Heaven uses Jev 1.13.0 only as a reference row that sets its cost and latency caps.

**Which model is #1 on JevBench?** It depends on the board. On Benchmark Heaven's board v1.8.7 (Nov 3, 2026), baselabs mammoth-1 is #1 on the open-weights board by Capability (85.2), Torchcast Decision 4B v1.3 is #1 on the open-weights board by Composite (80.5), and Super Decider is #1 on the hosted-API board by Composite (78.5). Rankings change with almost every release, so check the live board before you cite one.

**Can I run JevBench myself?** Partly. The harness and the public items are on GitHub under the MIT license, and the README shows how to run them against TypeSafe's API or any endpoint that speaks the same `/v1/systemone` format. The sealed items aren't published, so you can't reproduce an official score. To get on the board, submit your model at benchmarkheaven.com/submit.

## Try web-grounded decisions

If your decisions depend on facts that aren't in your input, test them in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests. The [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers question types and limits, and the `web_decisions` tool in the [free Parallel MCP](https://parallel.ai/mcp) lets an agent call it with no key.

Related reading: [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [System One model](https://parallel.ai/learn/system-one-model) / [The PWS-Decisions benchmark](https://parallel.ai/blog/pws-decisions-benchmark) / [BrowseComp explained](https://parallel.ai/articles/browsecomp-benchmark)

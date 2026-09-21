[](https://parallel.ai/blog/parallel-search-fast)

Introducing Parallel Search Fast: A web search API for agents that’s fast, cheap, and accurate. [Learn more.](https://parallel.ai/blog/parallel-search-fast) [[Learn more.] (https://parallel.ai/blog/parallel-search-fast)](https://parallel.ai/ai/blog/parallel-search-fast) Introducing Parallel Search Fast. [Learn more.](https://parallel.ai/blog/parallel-search-fast)

Contents

* What a model remembers
* Retrieval by default
* Agents don't think in web pages
* The context tax
* Built for the median question
* Past, present & future of retrieval

# \# The web as ground truth

The next decade of AI belongs to agents with always-on access to relevant, up-to-date information.

Contents

* What a model remembers
* Retrieval by default
* Agents don't think in web pages
* The context tax
* Built for the median question
* Past, present & future of retrieval

Thesis

The context layer is how AI systems and agents pull relevant information from the web. LLMs can't do that on their own. The system that turns the web into dense, reasoning-ready context at scale is the infrastructure the agentic era will run on.

For a decade, the AI industry scaled one axis: model size. Each generation of language model got smarter by growing bigger. Bigger meant more training data and more compute, packing more of the world's knowledge into the model weights. Researchers bet that these scaling laws would continue making models more capable.

The bet paid off for a long time, until it [began to plateau](https://techcrunch.com/2024/11/20/ai-scaling-laws-are-showing-diminishing-returns-forcing-ai-labs-to-change-course/) . Model size alone stopped being enough. To get around it, models got better by using "test-time compute," or reasoning: thinking longer before they answer. This paradigm supercharged model intelligence, but meant better answers required far more tokens. Intelligence stopped getting cheaper by default.

Models also remained bottlenecked by something more basic: access to accurate and up-to-date knowledge of the world. Ask a frontier model who is headlining Coachella and it will tell you about last year's event. This is a grounding problem. We've spent ten years improving general model intelligence, and far less making sure models have access to timely, accurate facts.

Two years ago the major assistants answered most questions from their weights alone; today Claude, ChatGPT, and Gemini all opt to use live web search on more and more of their queries. But they're far from great at it. Increasingly, a model's ability to reason from grounded data plays a larger part in its effectiveness than its size, its compute budget, or even its training data. And this trend is only beginning.

## \## What a model remembers

A language model has two kinds of memory.

**Parametric memory** lives in the weights, and is created during training: broad knowledge, patterns, associations, a rough impression of everything the model has seen.

**Contextual memory** is part of the model prompt: the specific documents, facts, and history the model is given as evidence to produce a specific answer.

The two systems have complementary properties.

Query

What was San Francisco's population in the 2020 Census?

Parametric memory

Confident guess No source Often wrong

Contextual memory

Live retrieval Cited Exact

Figure 1 — The two memory systems have complementary properties. Parametric memory is broad and frozen in time. Contextual memory can be exact and timely.

Parametric memory is broad, fast, and useful, but lossy.

Weights are a form of compression. Training preserves patterns and loses detail, often the details that become valuable later: a specific legal precedent, a precise figure in a chart, or anything too obscure to be well represented in the training run.

A frontier model can explain how a new class of cancer drugs works, but ask it for the overall survival figure from a Phase 3 readout reported last month, and it cannot. It also cannot reliably tell you whether a number came from the trial's primary endpoint or from a secondary analysis someone summarized on X.

Parametric memory is also stale. Retraining a frontier model costs tens of millions of dollars and takes many months. A model's weights cannot keep up with a world that changes daily. The richest training data can't help a model tell what affected the price of oil yesterday or what amendment a European regulator certified an hour ago.

Parametric memory alone falls short for work that demands recency and precision, which is most work that drives action in the real world.

Contextual memory can invert these properties. Given the right content, it can be exact, current, and traceable to its source.

But it has a challenge of its own: finding the right content, extracting the relevant parts, and presenting them in a form the model can use without overwhelming its limited context window. Retrieval is becoming the central bottleneck in AI.

## \## Retrieval by default: Harnessing the web for intelligence

The open web is the largest, freshest, broadest record of human knowledge in existence. Scientists, regulators, journalists, and companies all publish to the web before any other medium. Without it, a model is capped at whatever it memorized before its training cutoff.

All knowledge work depends on it. The best employees look things up: they check current prices, read recent filings, compare sources, and stay current in their field. Their raw intellect matters, but their impact depends on access to the world's information.

The same logic applies to AI. A model cut off from the web is a knowledge worker with vast intellect but no internet access. The model cannot learn new things, verify a claim, or look up the veracity of a source. You wouldn't impose that constraint on an employee. The same standard should apply to the AI systems used throughout your company.

Retrieval belongs in the default architecture of any AI system that handles real-world decisions.

## \## Agents don't think in web pages

Retrieval augmentation for AI systems began as little more than the human web search that preceded it: ten blue links, fetched by a thin wrapper around a search engine and dropped into the model's context for it to sort out.

Decades of the web shaped search into a form optimized for human consumption. For every bit of pure information, there are thousands of bits of scaffolding designed around how humans find and view content. But for models, anything that isn't information is overhead: tokens to sift through, pay for, and discard before arriving at the kernel of knowledge they need.

Even a trivial query like "who won the French Open yesterday" surfaces 99% discardable content: HTML markup, SEO filler, navigational headers, and breathless tournament coverage. Retrieve full pages of this and you quickly run out of the model's precious context budget.

A phenomenon called "context rot" makes this worse: the performance and accuracy of models degrade as their context fills up. The larger the haystack, the more likely you are to find something that resembles, but isn't, the needle you're looking for.

Across these workflows, the atomic unit of retrieval is the snippet of pertinent evidence: the sentence, paragraph, table row, chart in a PDF, or code block that nudges the model closer to a correct answer. The webpage is too coarse a unit for the job.

Because the atomic unit can be as small as a single figure traced back to its source, retrieving snippets instead of full pages unlocks a tremendous leap in the amount of reasoning that can be performed for any question, freeing up context space for more snippets and additional reasoning. Producing those snippets at web scale is a prerequisite for a context layer that can ground agents at scale.

What is the company's exposure to supply-chain disruption in China?

Whole document Dense snippets

Retrieved · whole 10-K filing

1\. Business Overview

2\. Risk Factors

3\. MD&A

4\. Supply Chain — China Exposure

5\. Financial Statements

6\. Executive Compensation

Signal Boilerplate 5 of 28 lines relevant · ~9% signal

Figure 2 — When retrieval returns whole pages, the model spends most of its attention budget on content the query never asked for. Snippet-level retrieval spends that same budget on signal, leaving more room for evidence and reasoning.

## \## The context tax: paid in cost, latency, and accuracy

A page full of SEO is a minor annoyance for a single user. But at the scale we expect AIs to operate, that overhead becomes an existential limit on how capable agents can become. One employee may run hundreds of coding agents; a single CRM may enrich millions of records overnight. An agent doing deep analysis can easily encounter over a thousand pages as it works. Every "junk" token in that loop becomes a tax.

It is a cost tax, because the model has to process tokens that don't help the answer. It is a latency tax, because longer context slows inference. And it is an accuracy tax, because of finite context windows and context rot.

Attention, the mechanism LLMs use to process contextual information, creates a steep cost curve as context grows. When engineers say attention has a "quadratic" cost, they mean the compute and memory required rise _far faster_ than the number of context tokens themselves. It is 100 times more expensive to process a 10,000-token document than a 1,000-token one.

### The Quadratic Cost of Attention

Context length 40k

16 times as much compute as 10k baseline

Figure 3 — The quadratic cost of attention is intrinsic to how transformer models, the architecture used by most LLMs, process tokens.

Reasoning-heavy models already spend tokens planning, checking, and synthesizing before they answer. Make them grind through entire web pages on top of that and they slow to a trickle.

Ask a frontier model to play to its strengths instead: help it find the right pages, strip them to the relevant passages, and let it operate on information-dense snippets. That density becomes an order-of-magnitude multiplier on the efficiency of every LLM call.

With a capable retrieval layer, agents can spend their reasoning budget on the work itself rather than on cleaning up the input. They complete tasks faster, more accurately, and at a fraction of the cost, cheap enough that reaching for the web becomes the default for every agent.

Level 01, Raw HTML: 50k tok at 5% signal. Documents on the web carry highlighted anatomy, the selection that fills the model's context window: everything is ingested, including hero images and footers. The attention budget bar fills brown with consumed context; the free run stays orange as room for reasoning: 08% reasoning, 92% context. Useful work then accumulates orange at about 24 tasks per minute, roughly $0.49 per task. Levels auto-advance every few seconds; selecting a level restarts its timer.

01 01: Raw HTML 50k tok · 5% signal 02 02: Content Only 14k tok · 20% signal 03 03: Relevant Sections 3\.5k tok · 55% signal 04 04: Focused Snippets 400 tok · 95% signal

Retrieval layer

Frontier model attention budget 50k tok

**92%** context **08%** reasoning

Useful work

24

Tasks completed ≈ 24 / min

Figure 4 — Feeding agents distilled, accurate data shifts their budget from cleanup to high-value synthesis. Step through the levels to compare.

## \## Built for the median question

If grounding matters this much, why aren't the web search capabilities offered by model labs sufficient?

The web search the labs offer is a great form factor for plenty of use cases. But it's tuned for the median question: speed, common queries, and surface-level insight, the kind that comes up in everyday chat use. Labs hill-climb on user feedback, which rewards a fast response over a thorough one.

There's also no financial incentive for the labs to make that search token-efficient. A frontier model can extract the answer from a raw web page, but that's a [staggeringly expensive use of frontier intelligence](https://arxiv.org/pdf/2606.18947) . And for a lab deciding whether to improve compression or intelligence, a token saved is revenue given up. As enterprises wake up to the cost of inference, deciding when those tokens are worth it falls to them, not the labs.

A one-size-fits-most product can only offer so much control. Standardization trades away the ability to preserve provenance from index to snippet, or to decide which parts of the web to trust more or less.

Serious enterprise and specialized agentic workloads demand more: multi-step research where missing a single source can invert the conclusion of a drug trial, and agents that inspect hundreds or thousands of pages without drowning the model in tokens.

## \## The past, present, and future of retrieval

With each generation, models and grounding grow more interconnected. ChatGPT launched without web search and with its training data behind by 14 months. Soon entire product categories appeared specializing in combining chat with search, often at the cost of latency or a weaker underlying model. Labs now train models on knowing how and when to search. And retrieval itself is evolving, from dense snippets to agentic task execution: subagents specialized in long-horizon retrieval that run dozens of lookups to finish a single task.

### Tool-call RAG

2023–24 2025–26 Frontier

The model decides it needs help, fires one search, gets a few documents stuffed back into context, then answers.

Many retrievals per task. The model plans, fans out across sources, reads, refines, and loops.

The model hands the task to a dedicated research agent, which runs its own cloud of searches and reports back.

The model decides it needs help, fires one search, gets a few documents stuffed back into context, then answers.

ONE RETRIEVAL · DOCUMENTS IN CONTEXT

MANY RETRIEVALS · FAN OUT AND REFINE

THE MODEL DELEGATES · A CLOUD OF SEARCHES

ONE RETRIEVAL · DOCUMENTS IN CONTEXT

Figure 5 — Retrieval and LLMs have co-evolved at every step: from no external access, to a single search, to agents that run their own search clouds.

The step after agentic retrieval is still on the research frontier, and no architecture has won yet. But the retrieval layer's properties are already clear: its latency, density, fidelity, and provenance. These will set the ceiling on every AI system built on top of them.

## \## Quality, cost, latency, and scale move together.

Dense retrieval gives the model less noise and more evidence. When an agent receives the exact passages it needs instead of entire documents, it spends fewer tokens processing irrelevant text and more of its context window reasoning over useful information. That improves quality, cost, latency, and scale at once.

01

#### Higher quality output

Models reason better over dense, relevant chunks than over sparse, noisy documents. Signal-to-noise at the input governs quality at the output. Agents produce more accurate answers because they attend to more relevant information per unit of attention budget.

02

#### Fewer tokens, lower cost

An order-of-magnitude compression at retrieval cuts tokens by an order of magnitude on every downstream call, which at scale results in dramatic cost savings.

03

#### More work per step

When each retrieved source is dense, agents can explore more sources within the same compute budget. Research that could only afford five documents now fits fifty. Cross-referencing and synthesis become economically viable at scales that were previously prohibitive.

04

#### Lower end-to-end latency

Less context means faster inference; faster retrieval means faster time-to-first-token. The savings matter for user-facing apps and accumulate across long-running autonomous workflows.

05

#### Provenance and auditability by default

When models are provided snippets with source URLs, every claim an agent makes carries a citation by default, providing an audit trail and unlocking use cases that require rigorous traceability.

06

#### A system that improves with use

When instrumented for user and agentic feedback, retrieval systems get better over time. The results you get today beat the ones you got six months ago.
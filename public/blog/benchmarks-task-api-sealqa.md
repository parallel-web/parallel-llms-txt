# Parallel processors set new price-performance standard on SealQA benchmark

Parallel scores state-of-the-art on SEAL-0 and SEAL-HARD benchmarks, designed to challenge search-augmented LLMs on real-world research queries.

The Parallel Task API achieves state-of-the-art performance on [SealQA (Search-Augmented LLM Evaluation, a.k.a SEAL)](https://arxiv.org/abs/2506.01062), a benchmark that evaluates web search systems against conflicting, noisy, and ambiguous information.

We deliver 42% to 57% accuracy on SEAL-0 and 60% to 70% on SEAL-HARD across our [Processor architecture](https://docs.parallel.ai/task-api/guides/choose-a-processor), measuring price points from $25 to $2400 CPM, establishing the highest accuracy at every price tier.

## The real web is messy

SEAL represents a fundamentally different class of web research challenge. Previous benchmarks we’ve evaluated, like [BrowseComp](https://parallel.ai/blog/deep-research-benchmarks), test multi-hop reasoning and persistence in finding obscure facts; SEAL tests whether systems can navigate the inherent contradictions and noise of real web data. SEAL’s questions are intentionally crafted so that search results are ambiguous, conflicting, or noisy, forcing systems to reconcile evidence rather than skim top links.

The benchmark includes two splits: SEAL-0 and SEAL-HARD. Questions generate search results that conflict, contradict, or mislead. SEAL-0 queries are curated through iteration until multiple strong models repeatedly fail, creating a more effective stress test for production web research systems.

These queries demand systems that detect when sources disagree, prioritize credible evidence over noise, and synthesize defensible answers from conflicting information. In the real world, businesses face these same challenges when using agents to perform due diligence, competitive intelligence, and compliance verification, where a single overlooked contradiction can derail critical decisions.

## Parallel achieves state-of-the-art performance on both splits

The Parallel Task API Processors outperform commercially available alternatives on both SEAL splits while offering transparent and deterministic per-query pricing.

### SealQA-SEAL-0

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Core",
    "x": 25,
    "y": 42.3
  },
  {
    "label": "Core2x",
    "x": 50,
    "y": 49.5
  },
  {
    "label": "Pro",
    "x": 100,
    "y": 52.3
  },
  {
    "label": "Ultra",
    "x": 300,
    "y": 55.9
  },
  {
    "label": "Ultra8x",
    "x": 2400,
    "y": 56.8
  }
]
```

```
[
  {
    "label": "Perplexity DR",
    "x": 1258.2,
    "y": 38.7
  },
  {
    "label": "Exa Research Pro",
    "x": 2043.2,
    "y": 45
  },
  {
    "label": "GPT-5",
    "x": 189,
    "y": 48.6
  }
]
```

**On SEAL-0**, Parallel's Ultra8x Processor achieves 56.8% accuracy at $2400 CPM, the highest accuracy among commercially available APIs. At the value tier, our Pro Processor achieves 52.3% accuracy at $100 CPM, compared to 38.7% for Perplexity's deep research at 10x lower cost.

### SealQA-SEAL-HARD

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Core",
    "x": 25,
    "y": 60.6
  },
  {
    "label": "Core2x",
    "x": 50,
    "y": 65.7
  },
  {
    "label": "Pro",
    "x": 100,
    "y": 66.9
  },
  {
    "label": "Ultra",
    "x": 300,
    "y": 68.5
  },
  {
    "label": "Ultra8x",
    "x": 2400,
    "y": 70.1
  }
]
```

```
[
  {
    "label": "Perplexity DR",
    "x": 1221.5,
    "y": 50.1
  },
  {
    "label": "Exa Research Pro",
    "x": 2192.4,
    "y": 59.1
  },
  {
    "label": "GPT-5",
    "x": 161.7,
    "y": 64.6
  }
]
```

**On SEAL-HARD**, Parallel's Ultra8x Processor achieves 70.1% accuracy at $2400 CPM, the highest accuracy among commercially available APIs. At the value tier, our Pro Processor achieves 66.9% accuracy at $100 CPM, better than Exa Research Pro's accuracy (59.1%) at 20x lower cost.

Parallel’s consistent accuracy gains across Processor tiers demonstrate our leading ability to scale performance with compute budget, flexibility that other systems can't match.

## Built for web complexity at scale

Parallel's infrastructure handles the disagreement and noise inherent in real-world web research through systematic capabilities:

**Conflict detection across sources**: Our systems identify when authoritative sources disagree and surface these conflicts rather than selecting convenient answers.

**Credibility scoring**: We prioritize primary sources, official documentation, and domain authority over secondary reporting and aggregator sites.

**High-fanout research with disciplined pruning**: Systems explore broadly to capture diverse perspectives while managing compute costs through intelligent pruning strategies.

Every response includes comprehensive verification through our [Basis framework](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences), which features citations linking to source materials, detailed reasoning for each output field, relevant excerpts from cited sources, and calibrated confidence scores that reflect uncertainty. These features make Parallel Processors production-ready for workflows where defensibility and auditability matter.

## Build with Parallel web research

Start with the [Parallel Task API](https://platform.parallel.ai/home) in our Developer Platform or explore the [documentation](https://docs.parallel.ai/home).

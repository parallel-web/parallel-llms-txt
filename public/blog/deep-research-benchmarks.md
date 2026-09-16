# A new pareto-frontier for Deep Research price-performance

Expanded results that demonstrate Parallel's complete price-performance advantage in Deep Research. 

We [previously released benchmarks](https://parallel.ai/blog/introducing-parallel) for Parallel Deep Research that demonstrated superior accuracy and win rates against leading AI models. Today, we're publishing expanded results that showcase our complete price-performance advantage - delivering the highest accuracy across every price point.

## **Parallel leads in accuracy at every price point**

We evaluated Parallel against all available deep research APIs on two industry-standard benchmarks. Our processors consistently deliver the highest accuracy at each price tier.

### **BrowseComp Benchmark**

OpenAI's BrowseComp tests deep research capabilities through 1,266 complex questions requiring multi-hop reasoning, creative search strategies, and synthesis across scattered sources.

### New Browsecomp 

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "Pro",
      "x": 100,
      "y": 34
    }, 
    {
      "label": "Ultra",
      "x": 300,
      "y": 45
    }, 
    {
      "label": "Ultra2x",
      "x": 600,
      "y": 51
    }, 
    {
      "label": "Ultra4x",
      "x": 1200,
      "y": 56
    }, 
    {
      "label": "Ultra8x",
      "x": 2400,
      "y": 58
    }
]
```

```
[
    {
      "label": "GPT-5",
      "x": 488,
      "y": 38
    },
    {
      "label": "Anthropic",
      "x": 5194,
      "y": 7
    },
    {
      "label": "Exa",
      "x": 402,
      "y": 14
    }, 
    {
      "label": "Perplexity", 
      "x": 709,
      "y": 6
    }
]
```

Our results demonstrate clear price-performance leadership, with our Ultra processor achieving 45% accuracy at $300 CPM at up to 17X lower cost compared to alternatives. Our newly available high-compute processors push accuracy even further for critical research tasks, with Ultra8x reaching 58%.


**DeepResearch Bench**

DeepResearch Bench evaluates the quality of long-form deep research reports across 22 fields including Business & Finance, Science & Technology, and Software Development. The benchmark consists of 100 PhD-level tasks and assesses the multistep web exploration, targeted retrieval, and higher-order synthesis capabilities of deep research agents.

### RACER

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "Ultra",
      "x": 300,
      "y": 82
    }, 
    {
      "label": "Ultra2x",
      "x": 600,
      "y": 86
    }, 
    {
      "label": "Ultra4x",
      "x": 1200,
      "y": 92
    }, 
    {
      "label": "Ultra8x",
      "x": 2400,
      "y": 96
    }
  
]
```

```
[
    {
      "label": "GPT-5",
      "x": 628,
      "y": 66
    }, 
    {
      "label": "O3 Pro",
      "x": 4331,
      "y": 30
    }, 
    {
      "label": "O3",
      "x": 605,
      "y": 26
    }, 
    {
      "label": "Perplexity",
      "x": 538,
      "y": 6
    }
]
```

Parallel Ultra achieves an 82% win rate against reference reports at $300 CPM, compared to GPT-5's 66% win rate at $628 CPM - delivering superior quality at half the cost. Our highest compute processor, Ultra8x, reaches a 96% win rate, representing a significant improvement from our previously published 82% benchmark.

We also measured win rate against GPT-5 directly by comparing the RACE scores of Parallel processors vs GPT-5. The results demonstrate that Ultra8x achieves an 88% win rate against GPT-5. 

### DeepResearch Bench against GPT-5

```
[
    {
      "label": "Ultra8x",
      "Win Rate": {
        "value": 88
      }
    }, 
    {
      "label": "Ultra4x",
      "Win Rate": {
        "value": 84
      }
    },
    {
      "label": "Ultra2x",
      "Win Rate": {
        "value": 80
      }
    }, 
    {
      "label": "Ultra",
      "Win Rate": {
        "value": 74
      }
    }
]
```

## **Beyond benchmarks: Flexible outputs, fully verifiable**

These benchmark results translate directly to production value. Parallel Deep Research delivers the same high accuracy in whichever format you need - human-readable reports for strategic analysis or structured JSON for machine consumption and database ingestion.

Every output, regardless of format, includes our comprehensive Basis framework:

- **Citations**: Direct links to source materials
- **Reasoning**: Explanations for each finding
- **Confidence**: Calibrated scores (low/medium/high) for intelligent routing
- **Excerpts**: Relevant text snippets from cited sources



This complete verification layer means the accuracy demonstrated in our benchmarks comes with the audibility and transparency required for production workflows where every detail matters.

## **Built for scale: 1000x more research, predictably priced**

Our price-performance advantage unlocks new possibilities. At these price points, you can run 1000x the number of queries compared to token-based alternatives - transforming deep research from an occasional tool to core infrastructure.

Consider the possibilities:

- **Build research databases**: Run thousands of queries, store structured results, and query them downstream
- **Continuous intelligence**: Monitor competitors, [markets](https://github.com/parallel-web/parallel-cookbook/blob/main/python-recipes/Deep_Research_Recipe.ipynb), and trends with daily deep research updates
- **Pipeline integration**: Use research outputs as inputs for downstream analysis, decision-making, or automation
- **Parallel processing**: Research hundreds of entities simultaneously for large-scale enrichment



Our per-query pricing model ensures complete cost predictability. Unlike token-based systems where a single complex query can unexpectedly consume your budget, every Parallel query costs exactly what you expect. This predictability enables confident scaling - whether you're running 10 queries or 10,000.

## **Start building with Deep Research**

Parallel Deep Research is available today through our Task API. Choose the processor that matches your accuracy and budget requirements, from Pro for simpler deep research to Ultra8x for the most demanding deep research tasks.

Get started in our [Developer Platform](https://platform.parallel.ai/) or explore our [documentation](https://docs.parallel.ai/task-api/task-deep-research).



## **Notes on Methodology**

_Benchmark Dates_: Benchmarks were run from Aug 11 to Aug 29. 

_DeepResearchBench Evaluation_**: **We evaluated all available DeepResearch API solutions on the 50 English-language tasks in the benchmark, measuring both RACE and FACT scores for generated reports. Given that RACE is a relative scoring metric benchmarked against reference materials, we calculated win-rates by comparing each vendor's performance to the human reference reports included in the dataset. A candidate report achieves a "win" when its RACE score exceeds that of the corresponding human reference report.

_BrowseComp Evaluation_**: **For the BrowseComp benchmark, we tested our processors alongside other APIs on a random 100-question subset of the original 1,266-question dataset. All systems were evaluated using the same standard LLM evaluator with consistent evaluation criteria, comparing agent responses against verified ground truth answers.

_Cost Calculation_: Token-based pricing is normalized to cost per thousand queries (CPM) based on actual usage in benchmarks.

# Introducing the Core2x Processor for improved compute control on the Task API

Starting today, a new Processor, Core2x, is available in the Parallel Task API to offer developers finer control over the compute budget they wish to allocate for a given web research task. 

As AI systems begin to query the web orders of magnitude beyond regular human usage patterns, compute allocation becomes a fundamental infrastructure challenge.

Our belief is that there is dramatic variance in computational requirements across different research tasks. A routine data enrichment query should not consume the same resources as a complex multi-hop investigation requiring extensive validation and synthesis.

Parallel's [Processor](https://parallel.ai/pricing) architecture addresses this challenge through granular compute allocation, spanning from Lite Processors at 5 CPM to Ultra8x at 2,400 CPM. Today, we're introducing Core2x at 50 CPM—filling a critical gap between Core and Pro Processors for moderately complex research tasks that require more depth than basic enrichment but less compute than full exploratory analysis.

## **Why Core2x?**

![](https://cdn.sanity.io/images/5hzduz3y/production/459fe3b19a9212057cca2aaadc6b459b4c484344-1200x675.png)

The jump from Core ($25 CPM) to Pro ($100 CPM) represented a 4x increase in cost for 4x increase in compute budget. For many production workflows, this previously meant that Core Processors occasionally lacked the depth for multi-hop workflows that require complex synthesis, while Pro Processors over-allocated compute for tasks that didn't require as much extensive exploration.

Core2x sits precisely in this gap. At $50 CPM with 2-5 minute latency, it delivers 2x the compute of Core while maintaining efficient turnaround times for moderate-complexity research tasks.

## **When to use Core2x**

Core2x is optimized for research tasks that require:

- Cross-validation across multiple sources without deep research level exploration
- Moderately complex synthesis where Core might fall short
- Structured outputs with 10 fields requiring verification
- Production workflows where Pro's compute budget exceeds requirements

Consider Core2x when your task demands more rigor than standard enrichment but doesn't require the multi-source deep research capabilities of Pro or Ultra+ Processors.

Get started in our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/task-api/guides/choose-a-processor).

# Introducing real-time Entity Search

Today we're launching real-time [Entity Search](https://platform.parallel.ai/play/entity-search): a fast way to find companies on the web with higher precision and at a fraction of the cost of comparable offerings. The new endpoint is designed for real-time workflows and latency-sensitive agentic use cases.

Describe what you need in plain language, “New York-based AI infrastructure startups that raised a Series B,” and get a structured set of matching results in seconds.

![](https://cdn.sanity.io/images/5hzduz3y/production/67e83e030ed79f4e5abd8801a8b1b610c188b156-1120x1006.png)

Entity Search is built for real-time workflows and agentic systems that prioritize latency, like when producing a set of candidate matches to evaluate, enrich, or pass into deeper research. Use it inside a product interface, a chat experience, or an automation with a human in the loop. Use it standalone, or composed with Parallel’s other products as part of a multi-step data pipeline.

Pricing starts at $0.005 per request ($5 CPM), including 100 results by default.

## Optimized for precision

We benchmarked Entity Search on 250 company-search queries from our internal benchmark suite. Each query was designed to be highly challenging by specifying several constraints at once: sector, funding stage, geography, investors, revenue, team composition.

These examples test the system beyond the demands of most applications that rely on fast retrieval. Each query is further constructed to minimize the probability that the answer set can be reconstructed from a language model's training data, isolating retrieval quality from memorization.

For each query, every provider returned its top 10 candidates, and each candidate was graded for relevance to the objective by an LLM judge (GPT-5.4-mini). We report precision: the fraction of a provider's returned candidates graded relevant, averaged across queries.

![](https://cdn.sanity.io/images/5hzduz3y/production/85b3aab64c80608c73c990557949cab5f4649aea-3600x2025.png)

Example Entity Search queries

- Series B fintech companies in Latin America that raised in 2025–2026
- Cybersecurity companies in North America, and their VPs of Sales
- AI-focused VC firms in the US, and their venture partners

```python
client.beta.findall.entity-search (
    objective="New York-based AI infrastructure startups that raised a Series B",
    entity_type="companies"
)

```

## When to use Entity Search over other Parallel products

Parallel customers already use [Search](https://parallel.ai/products/search) and [FindAll](https://parallel.ai/products/findall) for complex outbound work: sales teams scoping target accounts, VCs sourcing investments, M&A teams running screens, equity researchers mapping suppliers and competitors, recruiters finding hard-to-source candidates.

Focused Entity Search is adding another tool to their arsenal for cases where there’s a human in the loop or cost is a major consideration.

| Product | Best for | Type | Scope | Latency | Cost |
| --- | --- | --- | --- | --- | --- |
| Entity Search  | Fast list building of people or companies on standard attributes (stage, sector, etc.) to show in UI or hand downstream.  Example: "Series B fintech companies in Latin America that raised in 2025–2026." | Synchronous | Companies & People | 1s to 3s | $ |
| Search | Grounding an agent or chatbot's answer with live web pages and excerpts.   Example: "Recent US regulatory changes to stablecoin payments." | Synchronous | Whole web | 500ms - 10s | $ |
| FindAll | Comprehensive list building with strict match criteria and validation for any entity type.  Example: “Find all hyperscaler data center projects announced in the US since 2024 planned to be over 500MW.” | Asynchronous | Whole web | 10s - 30m  | $ - $$$ |
| Task | Comprehensive research and data enrichment tasks.  Example: “Compare all FDA drug recalls that cite nitrosamine contamination between 2020-2025 and include each NDC code. Explain which recall involved the largest patient population.” | Asynchronous | Whole web | 10s -  2h | $ - $$$ |

## Get started with Entity Search

Real-time Entity Search is available today across our platform:

- [Playground](https://platform.parallel.ai/play/entity-search)
- [Docs](https://docs.parallel.ai/findall-api/entity-search)
- [API Reference](https://docs.parallel.ai/api-reference/findall/fast-entity-search)
- [Parallel CLI](https://docs.parallel.ai/integrations/cli)

```
Use curl to read parallel.ai/agents.md and perform the setup to install Parallel
```

# Processors

> Choosing the right Processor for your use case

Processors control how each search query is executed. They determine how results are retrieved, ranked, and compressed,
and each has different performance and quality characteristics.
Pricing per request is based on the processor used—independent of the number of inputs or outputs. Each query must specify exactly one processor.

The Search API currently supports two processors, each optimized for different workloads.
Use `base` for fast responses to general web queries, ideal for latency-sensitive applications.
Use `pro` for more complex or open-ended queries where freshness, and content quality are critical.

Each processor varies in its performance characteristics and optimal use cases. Use the table below for reference.

| Processor | Strengths                         | p90 Latency | Cost (\$/1000) | Max Results Supported |
| --------- | --------------------------------- | ----------- | -------------- | --------------------- |
| `base`    | Lowest cost and fastest retrieval | 4-5s        | 4              | 40                    |
| `pro`     | Excerpt quality, freshness        | 45-70s      | 9              | 40                    |

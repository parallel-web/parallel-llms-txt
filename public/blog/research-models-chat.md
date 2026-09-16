# Introducing research models with Basis for the Parallel Chat API

Starting today, the Parallel Chat API supports three new research models, bringing research-grade web intelligence with full [Basis verification](https://docs.parallel.ai/task-api/guides/access-research-basis) to interactive AI applications.

The Chat API now offers two modes: the speed model for low-latency responses across a broad range of use cases, and research models (Lite, Base, Core) for deeper outputs where comprehensive verification matters more than milliseconds. Both return OpenAI ChatCompletions-compatible streaming text and JSON.

```python
from openai import OpenAI

client = OpenAI(

api_key="PARALLEL_API_KEY",

base_url="https://api.parallel.ai"

)

response = client.chat.completions.create(

model="core", # Research model with full Basis support

messages=[

{"role": "user", "content": "What are the key risk factors for Acme Corp?"}

],

)

print(response.choices[0].message.content)

print(response.basis) # Citations, reasoning, confidence scores
```

## More models for different needs

The speed model delivers ~3-second time-to-first-token for chat interfaces and interactive tools. Research models trade latency for depth, running the same processors that power our Task API, now accessible through an OpenAI-compatible interface.

![Model
Best For
Basis Support
Latency
speed
Low latency across a broad range of use cases
No
~3s
lite
Simple lookups, basic metadata
Yes
10-60s
base
Standard enrichments, factual queries
Yes
15-100s
core
Complex research, multi-source synthesis
Yes
60s-5min](https://cdn.sanity.io/images/5hzduz3y/production/96e5986ed7f75251c01f6da6122cbd51761d733e-3606x2109.jpg)

## Research-grade verification with Basis

Every response from research models includes Basis, the same verification framework trusted in production workflows across insurance, finance, and sales intelligence.

Basis provides four components for every output: citations linking to source URLs, reasoning explaining how conclusions were reached, excerpts containing relevant text from sources, and calibrated confidence scores classified as low, medium, or high.

```json
{

"field": "risk_factors",

"citations": [

{

"url": "https://sec.gov/filings/acme-10k-2024",

"excerpts": ["The company faces significant supply chain concentration risk..."]

}

],

"reasoning": "Multiple SEC filings and analyst reports corroborate supply chain dependencies...",

"confidence": "high"

}
```

These confidence scores are calibrated against real-world datasets. High-confidence outputs have 2-3x lower error rates than overall dataset averages. Low-confidence flags identify exactly where human review adds value, enabling efficient workflows that focus attention only where it matters.

## **Why research models matter**

Research models give the Chat API flexibility to think more deeply and search the web more widely. When a question requires multi-hop reasoning, synthesis across scattered sources, or verification from primary documents, research models allocate the compute and retrieval budget to get the best answer, not just the fastest one.

## **Start building**

Research models are available today in the Parallel Chat API. Get started in our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/).

## **About Parallel Web Systems**

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

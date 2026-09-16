# Citations API

A citations API returns citations, references to the source documents or web pages behind a result, alongside a generated answer, extracted data, or metadata, so each claim traces to its origin.

## What is a citations API?

A citations API attaches source references to an output so you can verify where each fact came from. Each reference points to the document or web page that supports a claim, and it carries the source URL plus a short excerpt.

Two flavors are common. Citation APIs for AI responses tie a large language model (LLM) or agent answer to verifiable web sources. Scholarly data citation APIs connect research papers to the datasets behind them.

Citations matter because models can invent facts. Citations give you a way to check every claim, and they power the reliable web access that [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) depend on. Google defines [grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/grounding) as the ability to connect model output to verifiable sources. That connection reduces the chances of inventing content.

## Key characteristics

- **Source references per claim:** Parallel defines a Citation as a reference to a web source that contributed to an output field, and it includes the URL and relevant excerpts.
- **Structured, machine-readable output:** [Amazon Bedrock’s Citation object](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Citation.html) is “An object containing a segment of the generated response that is based on a source in the knowledge base, alongside information about the source,” with two key fields, generatedResponsePart and retrievedReferences.
- **Paired with confidence and reasoning:** Parallel’s [Task API](https://parallel.ai/products/task) returns citations with reasoning and calibrated confidence for each output field through the [Basis framework](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences).
- **Access and usage limits:** [Crossref’s data citation endpoint](https://www.crossref.org/documentation/retrieve-metadata/data-citations) requires no authentication and caps at 3 requests per second, with up to 3 concurrent requests.

## Example

Picture an AI agent answering a research question. The agent calls a research or search API that returns each fact with its source. A person can click through and verify every claim against the original page.

The scholarly world works the same way. Crossref links a published paper to the dataset behind it, so a reader can trace the finding to its underlying data.

![Parallel Quality Benchmarks showing web search accuracy against Exa, Tavily, Brave, and SerpAPI](https://cdn.sanity.io/images/5hzduz3y/production/50aa4294bd61a539e76907fcb537c7db5266ebd7-1920x1080.png)

_Parallel’s quality benchmarks measure how well search and research APIs answer prompts. Source: __[Parallel benchmarks](https://parallel.ai/benchmarks)__._

## Related terms

- [grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/grounding) connects model output to verifiable sources.
- [deep research API](https://parallel.ai/articles/what-is-deep-research) produces cited answers from web research across many steps.
- [web search API](https://parallel.ai/articles/what-is-a-web-search-api) returns ranked sources and excerpts that feed citations.
- [Basis framework](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) delivers citations, reasoning, and confidence for each Parallel output field.

## FAQ

**What is the difference between a citations API and grounding?**
Grounding connects a model’s output to verifiable sources, and a citations API is how those sources come back to you, as structured references you can display or check.

**Do citations APIs stop AI models from making things up?**
They don’t eliminate errors, but they let you verify claims against sources. A [2024 study](https://www.jmir.org/2024/1/e53164) found that when models generated systematic review references without source grounding, hallucination rates ran from 28.6% for GPT-4 to 91.4% for Bard, in a medical reference task that used 2023-era models.

**What does a citation contain?**
A citation includes the source URL and the relevant excerpt or metadata that supports the part of the output it’s attached to.

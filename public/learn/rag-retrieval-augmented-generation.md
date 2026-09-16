# RAG (Retrieval-Augmented Generation)

Retrieval-augmented generation (RAG) is a technique that connects a language model to an external knowledge source and grounds answers in facts retrieved at query time.

## What is RAG?

A RAG system pairs an information retrieval step with a generative large language model (LLM), so its answers stay grounded in external data. A standard LLM can't reach past its training data, so the system fetches current, relevant information first and hands it to the model as context.

Researchers introduced the term in [the 2020 paper that coined RAG](https://arxiv.org/pdf/2005.11401.pdf), where they defined it as combining pre-trained parametric and non-parametric memory for language generation.

## Key characteristics

- **Two steps:** The technique first retrieves external data, then uses the LLM to generate an answer grounded in that context.
- **Fresh information:** It reaches past the model's training cutoff to pull current sources at query time.
- **Fewer hallucinations:** Grounding answers in retrieved facts cuts made-up output, which helps [reduce LLM hallucinations](https://parallel.ai/articles/how-to-reduce-llm-hallucinations-by-connecting-your-app-to-real-time-web-search); [as IBM notes](https://www.ibm.com/think/topics/retrieval-augmented-generation), RAG can't make a model error-proof.
- **Source attribution:** These systems return passages with source URLs, so users can cite where each fact came from.
- **Varied retrieval methods:** The system can draw from a static vector database or from live web search, depending on the freshness you need.

## Example

Picture a customer support chatbot built as an AI agent. When a user asks a question, the agent searches a live knowledge source at query time and answers from the retrieved excerpts. Teams often use [Parallel's Search API](https://parallel.ai/products/search) as that retrieval layer.

Demand for this pattern keeps climbing. Databricks reports that vector databases supporting retrieval augmented generation (RAG) applications [grew 377% year over year](https://www.databricks.com/blog/state-ai-enterprise-adoption-growth-trends).

![Parallel Search API product page](https://cdn.sanity.io/images/5hzduz3y/production/fc8dfd289d2c8761fc5e90ef8eb0122481abe486-1920x1080.png)

_Parallel's __[Search API](https://parallel.ai/products/search)__ returns ranked, source-linked excerpts an LLM can use as retrieval context._

## Related terms

- [semantic search](https://parallel.ai/articles/what-is-semantic-search): how vector based retrieval finds passages by meaning.
- [web search API](https://parallel.ai/articles/what-is-a-web-search-api): one way RAG retrieves current context at query time.
- [AI agents](https://parallel.ai/articles/what-is-an-ai-agent): systems that rely on RAG to ground their decisions.
- [deep research](https://parallel.ai/articles/what-is-deep-research): extends retrieval across many sources beyond a single lookup.

## FAQ

**How is RAG different from a standard LLM?**
A standard LLM answers from its training data alone. It retrieves external, current facts and grounds its answer in them.

**Does RAG stop AI hallucinations?**
It reduces them by grounding output in retrieved sources, though it doesn't eliminate them.

**What is the difference between RAG and fine-tuning?**
Fine-tuning retrains the model's weights on new data. RAG leaves the model unchanged and supplies relevant facts at query time.

**[Start Building](https://docs.parallel.ai/home)**

# RAG (Retrieval-Augmented Generation)

Retrieval-augmented generation (RAG) is a technique that connects a language model to an external knowledge source and grounds answers in facts retrieved at query time.

RAG (retrieval-augmented generation) is a technique that improves a large language model’s answers by retrieving relevant information from an external source at query time and adding it to the prompt, so the model answers from that evidence instead of from training data alone.

**End-to-end RAG pipeline (index, retrieve, augment, generate)**

```text
OFFLINE (or live web index)
  Docs ──▶ [Chunk] ──▶ [Embed + BM25] ──▶ [Search / Vector Index]
                                                    │
QUERY TIME                                          ▼ top-k hits
  Query ─▶ [Hybrid Search + Rerank] ──▶ [Relevant Passages + URLs]
                                                    │
                                                    ▼ augment prompt
                       [Query + Passages] ──▶ [LLM] ──▶ Cited Answer
```

## What is RAG?

A RAG system pairs an information retrieval step with a generative large language model (LLM), so its answers stay grounded in external data. A standard LLM can't reach past its training data, so the system fetches current, relevant information first and hands it to the model as context.

Researchers introduced the term in [the 2020 paper that coined RAG](https://arxiv.org/pdf/2005.11401.pdf), where they defined it as combining pre-trained parametric and non-parametric memory for language generation. In that paper the parametric memory was a pre-trained sequence-to-sequence model, and the non-parametric memory was a dense vector index of Wikipedia searched by a neural retriever.

In plain terms, the model’s weights hold what it learned in training, and the retrieval step hands it a small, relevant slice of outside knowledge for each question. RAG is the most common way to achieve [grounding](https://parallel.ai/learn/grounding-llm), where every claim in an answer can be traced to a source.

## How RAG works

A RAG pipeline has a preparation stage and a query-time loop.

1. **Index the knowledge:** documents are split into chunks, converted into embeddings, and stored in a vector database or search index. Systems that retrieve from live web search skip this step and query an existing index instead.
2. **Retrieve:** when a question arrives, the system searches the index for the passages most relevant to it, using [semantic search](https://parallel.ai/learn/semantic-search), keyword search, or both.
3. **Augment:** the top passages, with their source URLs or document IDs, are inserted into the prompt alongside the user’s question.
4. **Generate:** the LLM writes an answer from the supplied passages.
5. **Cite:** the application returns the answer with links to the passages it used, so a reader can check each claim.

## Key characteristics

- **Two steps:** The technique first retrieves external data, then uses the LLM to generate an answer grounded in that context.
- **Fresh information:** It reaches past the model's training cutoff to pull current sources at query time.
- **Fewer hallucinations:** Grounding answers in retrieved facts cuts made-up output, which helps [reduce LLM hallucinations](https://parallel.ai/articles/how-to-reduce-llm-hallucinations-by-connecting-your-app-to-real-time-web-search); [as IBM notes](https://www.ibm.com/think/topics/retrieval-augmented-generation), RAG can't make a model error-proof.
- **Source attribution:** These systems return passages with source URLs, so users can cite where each fact came from.
- **Varied retrieval methods:** The system can draw from a static vector database or from live web search, depending on the freshness you need.

## Types of RAG

RAG has grown from one architecture into a family of patterns. The main difference between them is where retrieval happens and who decides when to retrieve.

- **Vector RAG:** the classic setup. Private documents are embedded and stored in a vector database, and every question triggers a similarity search. It suits stable internal knowledge such as product docs or policies.
- **Hybrid search RAG:** combines keyword and vector retrieval, then reranks the results. It helps when exact terms, such as part numbers or legal citations, matter as much as meaning.
- **Web search RAG:** retrieval runs against a live [web index](https://parallel.ai/learn/web-index) through a search API, so answers can cover events after the model’s training cutoff without maintaining your own crawler. See how to [build a RAG pipeline with live web data](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-live-web-data).
- **Agentic RAG:** the model decides when to retrieve, what to search for, and whether the results are good enough, using [tool calling](https://parallel.ai/learn/tool-calling) inside an agent loop. It can run several searches for one question, which helps on multi-hop questions. Related: [agentic search](https://parallel.ai/learn/agentic-search).

## RAG vs. fine-tuning vs. long context

Teams usually weigh RAG against two other ways of giving a model new knowledge.

| Approach | How it adds knowledge | Best for | Trade-off |
| --- | --- | --- | --- |
| RAG | Retrieves relevant passages at query time and adds them to the prompt | Facts that change often, large or private document sets, answers that need citations | Answer quality depends on retrieval quality |
| Fine-tuning | Retrains the model’s weights on new examples | Teaching a format, tone, or domain-specific behavior | Knowledge is frozen at training time and has no built-in citations |
| Long context | Places whole documents in the prompt | A small set of documents you already know are relevant | Cost and latency grow with prompt length, and models can miss details in the middle of long inputs |

The approaches combine well. A common production setup fine-tunes for output style and uses RAG to supply facts.

## Example

Picture a customer support chatbot built as an AI agent. When a user asks a question, the agent searches a live knowledge source at query time and answers from the retrieved excerpts. Teams often use [Parallel's Search API](https://parallel.ai/products/search) as that retrieval layer.

Demand for this pattern keeps climbing. Databricks reports that vector databases supporting retrieval augmented generation (RAG) applications [grew 377% year over year](https://www.databricks.com/blog/state-ai-enterprise-adoption-growth-trends).

```python
import os
import requests

def retrieve_context(question: str, k: int = 5) -> str:
    res = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={
            "objective": question,
            "max_results": k,
            "excerpts": {"max_chars_per_result": 1200},
        },
        timeout=30,
    ).json()
    return "\n\n".join(
        f"Source [{i}]: {r['url']}\n" + "\n".join(r.get("excerpts", []))
        for i, r in enumerate(res["results"], start=1)
    )
```

## Limitations of RAG

RAG reduces errors, but it adds its own failure points.

- **Retrieval misses:** if the right passage isn’t retrieved, the model either guesses or says it can’t answer.
- **Stale or wrong sources:** a RAG system is only as current as its index. A vector database that hasn’t been re-embedded will return last quarter’s facts.
- **Position effects:** the [MedRAG benchmark study](https://aclanthology.org/2024.findings-acl.372/) reported “lost-in-the-middle” effects, where models use information at the start and end of the context more reliably than information in the middle.
- **Security:** [IBM notes](https://www.ibm.com/think/topics/retrieval-augmented-generation) that if a vector database is breached, attackers may be able to reverse the embeddings and recover the original data, especially when the store is unencrypted.

Benchmarks such as [FRAMES](https://parallel.ai/articles/frames-benchmark) test how well retrieval systems handle multi-hop questions where a single lookup is not enough.

## Related terms

- [semantic search](https://parallel.ai/learn/semantic-search): how vector based retrieval finds passages by meaning.
- [web search API](https://parallel.ai/learn/web-search-api): one way RAG retrieves current context at query time.
- [AI agents](https://parallel.ai/learn/ai-agent): systems that rely on RAG to ground their decisions.
- [deep research](https://parallel.ai/learn/deep-research): extends retrieval across many sources beyond a single lookup.
- [grounding (LLM)](https://parallel.ai/learn/grounding-llm): the goal RAG serves, tying every claim to a source.
- [source grounding](https://parallel.ai/learn/source-grounding): retrieving documents at answer time and citing them.
- [tool calling](https://parallel.ai/learn/tool-calling): how agents trigger retrieval on their own in agentic RAG.

## FAQ

**What does RAG stand for?**

RAG stands for retrieval-augmented generation. The model’s generation step is augmented with information retrieved from an external source.

**How is RAG different from a standard LLM?**

A standard LLM answers from its training data alone. A RAG system retrieves external, current facts and grounds the model’s answer in them.

**Does RAG stop AI hallucinations?**

It reduces them by grounding output in retrieved sources, though it doesn’t eliminate them.

**What is the difference between RAG and fine-tuning?**

Fine-tuning retrains the model’s weights on new data. RAG leaves the model unchanged and supplies relevant facts at query time.

**Is RAG still useful with long context windows?**

Yes. Even when a model can read very long prompts, retrieval keeps costs and latency down by sending only the relevant passages, and it lets the system draw from document sets far larger than any context window.

**What is agentic RAG?**

Agentic RAG lets the model decide when and what to retrieve through tool calls, often running several searches and checking the results before it answers, rather than retrieving once per question.

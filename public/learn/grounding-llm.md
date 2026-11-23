# Grounding in AI (LLM grounding)

Grounding in AI means connecting a model’s answer to specific sources it was given, such as documents, databases, or live web results, instead of relying on memory from training. The academic definition states that every claim in the response can be attributed to a document in the user-specified knowledge base.

Grounding in AI is the practice of connecting a model’s output to specific, verifiable sources of information, so each claim in an answer can be traced to evidence the model was given at answer time.

**Grounded generation vs. ungrounded generation**

```text
UNGROUNDED
  Question ──▶ [LLM Weights Only] ──▶ Answer (risk of hallucination)

GROUNDED
  Question ──▶ [Retriever: Web / KB / DB]
                      │ passages + URLs / doc IDs
                      ▼
               [Prompt Context + Question]
                      │
                      ▼
               [LLM Constrained to Evidence]
                      │
                      ▼
          Answer + Claim-Level Citations + Verification
```

## What is grounding in AI?

Grounding in LLMs means the model connects each answer to specific sources instead of relying on memory from training. The [academic definition of grounding](https://arxiv.org/html/2407.12858v1) states that every claim in the response can be attributed to a document in the user-specified knowledge base.

This sets grounding apart from factuality. Grounding ties each claim to a source you specify, while factuality checks a claim against commonly agreed world knowledge.

Grounding matters because ungrounded models can sound confident while inventing facts. A Stanford [legal hallucination study](https://academic.oup.com/jla/article/16/1/64/7699227), published in 2024 and run on GPT-4-era models, found LLMs hallucinate at least 58% of the time on specific legal questions about U.S. federal court cases.

In practice, AI grounding means giving the model the right evidence before it writes. That evidence can come from a company’s internal documents, a database, a set of tool results, or the live web. The model is then instructed to answer from that material and to say where each claim came from.

This page covers grounding as a broad concept: what it is, how it works, and which kinds of sources it uses. For the narrower mechanics of retrieving documents at answer time and attaching citations to them, see [source grounding](https://parallel.ai/learn/source-grounding).

## How AI grounding works

Most grounded systems follow the same sequence, whether they run inside a chat product or an agent loop.

1. **Decide what to look up:** the application or the model turns the user’s question into one or more search queries or lookups.
2. **Retrieve evidence:** a retriever pulls relevant passages from a knowledge base, a search index, or an API.
3. **Add the evidence to the prompt:** the passages go into the model’s context, often with their URLs or document IDs.
4. **Generate from the evidence:** the model writes an answer that is constrained to the retrieved material.
5. **Attribute and check:** the response links each claim to its source, and some systems run a second pass to flag claims no source supports.

The most common way to build this is [retrieval-augmented generation (RAG)](https://parallel.ai/learn/rag-retrieval-augmented-generation). Agents often ground through [tool calling](https://parallel.ai/learn/tool-calling) instead, where the model decides for itself when to call a search or data tool.

## Types of grounding

Grounding is usually described by where the evidence comes from.

- **Web grounding:** the model reads current pages from the public web through a search engine or a [web search API](https://parallel.ai/learn/web-search-api). This suits questions about recent events, prices, people, and companies.
- **Enterprise data grounding:** the model answers from a private knowledge base, such as product docs, tickets, contracts, or a vector database of internal files.
- **Structured data grounding:** the model reads rows from a database, a spreadsheet, or an internal API, so numbers come from the system of record.
- **Geospatial grounding:** the model uses map and place data to answer location questions.

Grounding with Google Search in the Gemini API is one of the best-known examples of web grounding. When the `google_search` tool is enabled, Gemini decides whether a search would improve the answer, runs one or more queries, and returns a response with inline citations to the pages it used, according to [Google’s Gemini API documentation](https://ai.google.dev/gemini-api/docs/google-search). Google’s [grounding overview for Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) lists several sources side by side, including Google Search, Google Maps, Elasticsearch, your own search API, and Parallel web search.

## Key characteristics

- **Source attribution:** every claim traces back to a document, and you can check the citation yourself.
- **Retrieved or real-time context:** the model reads fresh facts at answer time, so it doesn’t rely on memory alone.
- **Retrieval-augmented generation:** RAG is the leading grounding technique. It retrieves relevant passages, then adds them to the prompt before generation.
- **Hallucination reduction:** grounding reduces unsupported answers. Research on [RAG accuracy in medicine](https://aclanthology.org/2024.findings-acl.372/) shows MedRAG improves the accuracy of six LLMs by up to 18% in medical question answering.

## Example

Imagine a support agent that gets a question about a product launched after the model’s training cutoff. Without grounding, the agent guesses and may invent a spec.

With grounding, the agent calls the [Parallel Search API](https://parallel.ai/products/search), retrieves the current spec sheet, and answers with a cited source. The reader can open that source and confirm the answer.

```python
import os
import requests

resp = requests.post(
    "https://api.parallel.ai/v1/search",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json={
        "objective": "Find the current rate limits for Parallel Search API",
        "max_results": 5,
        "excerpts": {"max_chars_per_result": 1500},
    },
    timeout=30,
).json()

evidence = "\n\n".join(
    f"[{i}] {r['title']} ({r['url']})\n" + "\n".join(r.get("excerpts", []))
    for i, r in enumerate(resp["results"], start=1)
)
prompt = f"Answer using only the sources below and cite [n].\n\n{evidence}"
```

Teams building on Gemini can use the same pattern through [Grounding with Parallel Web Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-parallel) on Gemini Enterprise Agent Platform, which connects Gemini models to Parallel’s web index and returns the sources in the response’s grounding metadata.

## Limits of grounding

Grounding raises the floor on accuracy, but it depends on the evidence it is given. If retrieval misses the right document, the model has nothing correct to ground on. If the source is outdated or wrong, the answer will be grounded and still wrong. A citation also shows where a claim came from, not that the source supports it, so production systems often check that each cited passage actually contains the claim.

These limits are why retrieval quality, freshness, and source attribution get as much attention as the model itself. For a practical walkthrough, see how to [build a RAG pipeline with web search instead of a vector database](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-web-search-instead-of-vector-databases).

## Related terms

- Learn to [reduce LLM hallucinations](https://parallel.ai/articles/how-to-reduce-llm-hallucinations-by-connecting-your-app-to-real-time-web-search) by connecting your model to real-time data.
- Build a [live-data RAG pipeline](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-live-web-data) that grounds answers in fresh sources.
- Understand what a [web search API](https://parallel.ai/learn/web-search-api) does for grounding.
- Explore [semantic search](https://parallel.ai/learn/semantic-search) and how it finds relevant passages.
- See how [AI agents](https://parallel.ai/learn/ai-agent) use grounded context to act.
- Compare grounding with [source grounding](https://parallel.ai/learn/source-grounding), the retrieval and citation step that produces grounded answers.
- Read how [RAG (retrieval-augmented generation)](https://parallel.ai/learn/rag-retrieval-augmented-generation) works step by step.
- See how a [citations API](https://parallel.ai/learn/citations-api) returns the sources behind each claim.

## FAQ

**What is grounding in AI in simple terms?**

It means making an AI model answer from evidence you hand it, such as documents or search results, and show where each claim came from, instead of relying only on what it memorized during training.

**What is the difference between grounding and factuality?**

Grounding attributes a claim to a knowledge source you specify, while factuality checks a claim against shared world knowledge. A claim can be true and still ungrounded if the knowledge base you specified doesn’t support it.

**Does grounding stop hallucinations completely?**

It reduces them, but not to zero, and even strong models leave some claims ungrounded, so you still need verification.

**How is grounding related to RAG?**

RAG is the most common way to ground an LLM, since it retrieves relevant documents and adds them to the prompt so the model answers from real sources.

**What is the difference between grounding and source grounding?**

Grounding is the overall goal of tying model output to evidence, and it covers many kinds of sources. Source grounding describes the specific step of retrieving documents when a question is asked and citing them in the answer.

**What is Grounding with Google Search?**

It is a tool in the Gemini API that connects Gemini to real-time web content from Google Search. The model decides when to search, runs the queries, and returns an answer with citations to its sources.

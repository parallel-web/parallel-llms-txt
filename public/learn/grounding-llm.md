# Grounding (LLM)

Grounding in LLMs means the model connects each answer to specific sources instead of relying on memory from training. The academic definition of grounding states that every claim in the response can be attributed to a document in the user-specified knowledge base.

Grounding is the practice of connecting a large language model’s answers to specific, verifiable sources, so its claims rest on real evidence.

## What is grounding?

Grounding in LLMs means the model connects each answer to specific sources instead of relying on memory from training. The [academic definition of grounding](https://arxiv.org/html/2407.12858v1) states that every claim in the response can be attributed to a document in the user-specified knowledge base.

This sets grounding apart from factuality. Grounding ties each claim to a source you specify, while factuality checks a claim against commonly agreed world knowledge.

Grounding matters because ungrounded models can sound confident while inventing facts. A Stanford [legal hallucination study](https://academic.oup.com/jla/article/16/1/64/7699227) found LLMs hallucinate at least 58% of the time on specific legal questions about U.S. federal court cases.

## Key characteristics

- **Source attribution:** every claim traces back to a document, and you can check the citation yourself.
- **Retrieved or real-time context:** the model reads fresh facts at answer time, so it doesn’t rely on memory alone.
- **Retrieval-augmented generation:** RAG is the leading grounding technique. It retrieves relevant passages, then adds them to the prompt before generation.
- **Hallucination reduction:** grounding reduces unsupported answers. Research on [RAG accuracy in medicine](https://aclanthology.org/2024.findings-acl.372/) shows MedRAG improves the accuracy of six LLMs by up to 18% in medical question answering.

![Parallel’s web search API accuracy benchmarks](https://cdn.sanity.io/images/5hzduz3y/production/50aa4294bd61a539e76907fcb537c7db5266ebd7-1920x1080.png)

_Parallel’s published __[accuracy benchmarks](https://parallel.ai/benchmarks)__._

## Example

Imagine a support agent that gets a question about a product launched after the model’s training cutoff. Without grounding, the agent guesses and may invent a spec.

With grounding, the agent calls the [Parallel Search API](https://parallel.ai/products/search), retrieves the current spec sheet, and answers with a cited source. The reader can open that source and confirm the answer.

## Related terms

- Learn to [reduce LLM hallucinations](https://parallel.ai/articles/how-to-reduce-llm-hallucinations-by-connecting-your-app-to-real-time-web-search) by connecting your model to real-time data.
- Build a [live-data RAG pipeline](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-live-web-data) that grounds answers in fresh sources.
- Understand what a [web search API](https://parallel.ai/articles/what-is-a-web-search-api) does for grounding.
- Explore [semantic search](https://parallel.ai/articles/what-is-semantic-search) and how it finds relevant passages.
- See how [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) use grounded context to act.

## FAQ

**What is the difference between grounding and factuality?**
Grounding attributes a claim to a knowledge source you specify, while factuality checks a claim against shared world knowledge.

**Does grounding stop hallucinations completely?**
It reduces them, but not to zero, and even strong models leave some claims ungrounded, so you still need verification.

**How is grounding related to RAG?**
RAG is the most common way to ground an LLM, since it retrieves relevant documents and adds them to the prompt so the model answers from real sources.

[Start Building](https://docs.parallel.ai/home)

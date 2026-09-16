# How to build a RAG pipeline with web search instead of vector databases

You can build a RAG pipeline without a vector database by searching the live web at query time, which removes the ingestion and maintenance burden most tutorials assume. This guide covers why vector databases are the wrong default for most pipelines, the three layers of a web RAG pipeline (search, extract, and context assembly), a full implementation, hybrid routing, and production considerations.

**Key takeaways:**

- Vector databases impose ingestion, maintenance, and staleness costs that most RAG pipelines don't need.
- Web RAG searches the live web at query time, eliminating the ingestion pipeline and keeping data current.
- A web search RAG pipeline has three layers: search, extract, and context assembly.
- Hybrid architectures route between vector and web retrieval based on query freshness signals and confidence thresholds.
- Parallel's Search API delivers web RAG in a single API call, with 98% accuracy on SimpleQA at $0.005/request, plus a Turbo mode at $0.001/request with roughly 200ms median latency.

## Why vector databases are the wrong default for most RAG pipelines

Most RAG tutorials follow the same pattern: spin up a vector database, choose an embedding model, build an ingestion pipeline, chunk your documents, and embed them. Developers adopt this approach because the tooling defaults to it. But this default carries real costs that teams discover too late.

Vector databases work well for **stable, internal corpora**. Product documentation, internal knowledge bases, and compliance archives change on predictable schedules. You can re-embed them weekly and accept the drift. The problems start when your RAG pipeline needs to answer questions about the moving world.

**The staleness problem compounds.** Your vector-indexed content decays the moment its source changes. A competitor ships a new API version on Tuesday. Your vector store still contains Monday's docs. Developers build re-ingestion schedules to fight this decay, but those schedules create their own maintenance burden and leave gaps between crawls.

**Coverage gaps hurt worse than stale data.** A vector store can only answer questions about content you've already indexed. When a user asks about a breaking change published an hour ago or a competitor's pricing update from this morning, you get nothing back from the retrieval layer. The LLM either hallucinates or admits it doesn't know.

**Teams undercount the total cost.** Hosting a vector database, running embedding models, maintaining ingestion pipelines, debugging chunking strategies, and monitoring index freshness adds up. A recent analysis of [vector database pricing and architecture tradeoffs](https://www.marktechpost.com/2026/05/10/best-vector-databases-in-2026-pricing-scale-limits-and-architecture-tradeoffs-across-nine-leading-systems/) shows managed instances starting at $70/month and scaling into thousands. Most teams spend more engineering hours on their retrieval infrastructure than on the actual generation logic. If your team spends more time on retrieval infrastructure than generation logic, the architecture is the problem. Researchers exploring approaches [beyond vector databases for RAG](https://itnext.io/beyond-vector-databases-choosing-the-right-data-store-for-rag-972a6c4a07dd) have reached similar conclusions.

The question worth asking: does your use case require a vector database, or have you adopted one because the tutorial told you to?

## Web RAG: use the live web as your retrieval layer

_Web RAG_ replaces the vector database with a [web search API](https://parallel.ai/articles/what-is-a-web-search-api) call. At query time, you search the live web, retrieve relevant pages with structured excerpts, and pass those excerpts to the LLM as context. No ingestion pipeline. No embedding model. No stale index.

The core architecture looks like this:

**User Query → Search API → Ranked URLs + Excerpts → LLM Context → Grounded Answer**

You send the user's question (or a refined version of it) to a search API that understands natural-language objectives. The API returns ranked results with **token-dense excerpts** optimized for LLM context windows. You assemble those excerpts into a prompt, call your model, and get a grounded answer with source citations.

Researchers have found that agentic keyword search achieves over 90% of vector-RAG performance without a standing vector database. Web RAG builds on this insight by making the entire public web your retrieval corpus.

**Web RAG wins when your pipeline needs:**

- Real-time information (news, pricing, and competitive intelligence)
- Broad coverage beyond a fixed corpus
- Research [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) that explore topics without pre-indexed boundaries
- Queries where freshness determines answer quality

**Vector RAG still wins when you need:**

- Sub-100ms retrieval latency on a known corpus
- Answers from private internal documents
- Compliance-controlled retrieval over a fixed document set

**Most production systems need both.** The practical answer for teams building real applications is a _hybrid RAG_ architecture: vector search for owned content that changes on known schedules, web search for queries that need current data or fall outside the indexed corpus. The routing logic between them doesn't need to be complex. A few signals (freshness keywords, confidence thresholds, topic classification) handle the decision.

The relevance, density, and freshness of your retrieved context set the ceiling for what the LLM can produce. Evaluate your search API with the same rigor you'd apply to your LLM selection: accuracy, excerpt density, latency, and cost.

## Architecture of a web search RAG pipeline

A web search RAG pipeline has three layers. You replace each component from the traditional vector pipeline with something simpler.

### Layer 1: Search

In a vector RAG pipeline, retrieval means calling `vectordb.similarity_search(query)`. In a web RAG pipeline, you replace that call with a search API request.

Modern search APIs built for AI applications accept **natural-language objectives**, not keyword queries. You describe what you're looking for in plain English and receive ranked results with excerpts optimized for LLM context windows. Traditional search engines return snippets designed for humans scanning a results page. AI-native search APIs return **compressed, token-dense excerpts** that pack more relevant information into fewer tokens.

A [Search API](https://parallel.ai/products/search) request sends a natural-language objective to Parallel:

```python
import requests

response = requests.post(
    "https://api.parallel.ai/v1/search",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "objective": "How do companies implement RAG pipelines with web search instead of vector databases?",
        "num_results": 10
    }
)
results = response.json()["results"]
```

You send an **objective** describing your information need. The Search API returns ranked URLs with structured excerpts. Each result includes the page URL, title, and token-dense text excerpts that capture the most relevant content.

Key capabilities that matter for RAG: **domain include/exclude lists** let you control which sources your pipeline trusts. **Freshness policies** ensure you retrieve recent content. And the excerpts themselves save you from building a separate scraping and parsing step.

### Layer 2: Extract (when you need more than excerpts)

Search API excerpts handle most RAG use cases. You get relevant, compressed text ready for your LLM context window. But some pages require full content: technical documentation, specification sheets, long-form research reports, or pages where the answer spans multiple sections.

For those cases, add an extraction step using the Extract API:

```python
extract_response = requests.post(
    "https://api.parallel.ai/v1/extract",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "url": "https://example.com/technical-documentation",
        "objective": "Extract the authentication setup guide and code examples"
    }
)
clean_markdown = extract_response.json()["content"]
```

The Extract API converts any URL to clean, AI-ready markdown. You pass an **objective**, and the API returns only the relevant portions of the page. This handles the hard parts of web content extraction: JavaScript-rendered single-page applications, CAPTCHAs, dynamically loaded content, and PDFs.

With this two-step pattern (Search API finds pages, Extract API pulls content), you skip the multi-step pipeline that other approaches require: search, scrape, parse HTML, handle rendering, chunk text, and clean output.

### Layer 3: context assembly and generation

With search results and extracted content in hand, you assemble the LLM prompt. The goal: give the model enough context to answer accurately while preserving source attribution for citations. Google DeepMind researchers found in their [FACTS Grounding benchmark](https://deepmind.google/blog/facts-grounding-a-new-benchmark-for-evaluating-the-factuality-of-large-language-models/) that grounding LLM outputs in retrieved sources reduces hallucinations and improves factual accuracy.

```python
def build_prompt(query, search_results):
    context_blocks = []
    for i, result in enumerate(search_results, 1):
        excerpts = "\n".join(result.get("excerpts", []))
        context_blocks.append(
            f"[Source {i}] {result['url']}\n{excerpts}"
        )

    context = "\n\n".join(context_blocks)
    return f"""Answer the following question using only the provided sources.
Cite sources using [Source N] notation. If the sources don't contain
enough information, say so.

Sources:
{context}

Question: {query}"""
```

Two things matter here. First, **source attribution**: each context block carries its URL, so the model can cite specific sources in its answer. Second, **token efficiency**: because the Search API compresses excerpts before delivery, you spend fewer tokens on context and more on generation. A typical search returning 10 results fits in 4,000-6,000 tokens of context, leaving ample room for the model's response.

You instruct the model to cite sources, admit gaps when context falls short, and stay within the provided material. This grounding step turns web search results into verifiable, cited answers.

## Complete implementation: web RAG with Parallel

You can run the full pipeline in a single function. Search, assemble context, generate a grounded answer with citations:

```python
import requests
import openai

def web_rag(query: str) -> str:
    # Layer 1: Search the web with a natural-language objective
    search_resp = requests.post(
        "https://api.parallel.ai/v1/search",
        headers={"x-api-key": PARALLEL_API_KEY},
        json={"objective": query, "search_queries": [query],
              "advanced_settings": {"max_results": 10}}
    )
    results = search_resp.json()["results"]

    # Layer 3: Assemble context with source attribution
    sources = []
    for i, r in enumerate(results, 1):
        excerpts = "\n".join(r.get("excerpts", []))
        sources.append(f"[Source {i}] {r['url']}\n{excerpts}")

    prompt = f"""Answer this question using only the sources below.
Cite each claim with [Source N]. If sources are insufficient, say so.

Sources:
{chr(10).join(sources)}

Question: {query}"""

    # Generate a grounded answer
    completion = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return completion.choices[0].message.content
```

Call `web_rag("What are the latest best practices for LLM function calling?")` and you get a grounded answer with inline citations pointing to live web sources.

This implementation needs no embedding model, no vector database, no document chunking logic, no ingestion pipeline, and no index refresh schedule. A single API call returns LLM-ready context. For a more complete example with streaming and a frontend, see the [full-stack search agent cookbook](https://parallel.ai/blog/cookbook-search-agent).

For queries that need deeper page content, add the Extract API as Layer 2. You can parallelize fetches across multiple sources using `asyncio` or `concurrent.futures` to reduce total latency on multi-source queries.

The Search API returns structured excerpts at [$0.005 per request](https://parallel.ai/pricing) with 10 results included on the Basic and Advanced modes, or from $0.001 per request with Turbo mode. Compare that to the blended cost of vector database hosting, embedding API calls, and the engineering time your team spends maintaining ingestion infrastructure.

## When to go hybrid: combining vector and web retrieval

Production RAG systems rarely use one retrieval pattern for all queries. A _hybrid RAG_ architecture routes each query to the retrieval layer most likely to produce a good answer. The Applied AI team documents this pattern as the production standard in their [enterprise RAG architecture guide](https://www.applied-ai.com/briefings/enterprise-rag-architecture/).

The routing logic doesn't need machine learning. A simple function handles most cases:

```python
def route_query(query: str, vector_results) -> str:
    freshness_signals = ["latest", "current", "today", "recent",
                         "new", "update", "announce"]

    # Freshness signals → web RAG
    if any(signal in query.lower() for signal in freshness_signals):
        return "web"

    # Low-confidence vector results → web fallback
    if vector_results and vector_results[0].score < 0.65:
        return "web"

    # High-confidence vector match → use it
    if vector_results and vector_results[0].score >= 0.65:
        return "vector"

    # No vector results → web search
    return "web"
```

Three routing signals cover most production needs. First, freshness keywords ("latest," "current," "today") indicate the user wants recent information that a static index can't provide. Second, low confidence scores from your vector store suggest the indexed corpus doesn't cover the query well. Third, you route queries with no vector results to web search as a fallback.

Cost and latency tradeoffs shape the hybrid design. Vector retrieval costs fractions of a cent at sub-50ms latency. Web RAG costs \~$0.001 per query at roughly 200ms median latency with Parallel's Turbo mode, or \~$0.005 per query at 1-3 seconds with the Basic and Advanced modes. Most queries in a typical application go to the vector store, so your blended cost stays low. Web search handles the long tail of queries where vector retrieval falls short. For complex multi-source research queries, you can escalate to Parallel's Task API for [deep research](https://parallel.ai/articles/what-is-deep-research) with built-in citations and confidence scoring.

## Production considerations

Building a demo takes an afternoon. Deploying a reliable web RAG system requires attention to five areas. You'll find these patterns documented in depth in [production RAG infrastructure](https://introl.com/blog/rag-infrastructure-production-retrieval-augmented-generation-guide).

**Latency.** Web retrieval adds 1-3 seconds compared to vector search with the Basic and Advanced modes; Turbo mode cuts that to roughly 200ms. Three techniques reduce perceived latency: parallelize URL fetches when you need content from multiple sources, cache high-traffic queries, and stream the LLM response so users see output before generation completes.

**Caching.** Cache web RAG results with TTLs matched to your use case. Competitive intelligence might need 15-minute expiry. News summaries work with 1-hour caches. Product comparisons can tolerate 4-6 hours. Your cache hit rate determines your effective cost per query.

**Cost at scale.** At [$0.005 per request](https://parallel.ai/pricing), 100,000 daily queries cost $500/month for the retrieval layer, or $100/month with Turbo mode at $0.001 per request. Compare that to the combined cost of vector database hosting (managed instances start at $70/month and scale), embedding API calls ($0.0001 per 1K tokens adds up at volume), and the engineering hours your team spends on ingestion pipeline maintenance.

**Reliability.** Handle search API errors with graceful fallbacks. Return cached results when the API is unavailable. Fall back to vector search if you run a hybrid setup. Implement rate-limit-aware retry logic with exponential backoff.

**Security.** For applications handling sensitive queries, Parallel holds [SOC 2 Type 2 certification](https://trust.parallel.ai/) with zero data retention. Your search queries and retrieved content don't persist on Parallel's infrastructure after the response completes.

## FAQ

**Can I build a RAG pipeline without a vector database?**
Yes. You use a search API as the retrieval layer, searching the web at query time instead of querying pre-indexed embeddings.

**What is web RAG?**
Web RAG retrieves content from the live web at inference time rather than from a static vector index, trading some latency for data that's current.

**What is the difference between agentic RAG and web RAG?**
Agentic RAG gives an AI agent tools (including search) to gather information iteratively. Web RAG is the specific retrieval pattern where web search replaces vector search. An agentic system often uses web RAG as one of its tools.

**Which search API should I use for a RAG pipeline?**
Choose based on accuracy, excerpt quality, latency, and cost. Parallel's Search API delivers 98% accuracy on SimpleQA ([Search API benchmark](https://parallel.ai/blog/search-api-benchmark)) at $0.005/request with structured, LLM-ready excerpts, or its Turbo mode at $0.001/request with roughly 200ms median latency. You can [switch from OpenAI web search](https://parallel.ai/articles/openai-to-parallel-search-api) in minutes.

**How do I handle stale data in RAG?**
Replace or supplement your vector store with web retrieval for time-sensitive queries, using a hybrid routing pattern that detects freshness signals.

Parallel's Search API gives you the retrieval layer for web RAG in a single API call. The [documentation](https://docs.parallel.ai/home) covers authentication, endpoint details, and advanced features. The free tier includes $5 in credits each month (up to 5,000 Turbo requests) to get your pipeline running.

[Start Building](https://docs.parallel.ai/home)

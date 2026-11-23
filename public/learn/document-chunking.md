# Document chunking

Document chunking splits long source files into smaller, coherent segments before indexing for RAG and semantic search so embeddings stay sharp and retrieved passages fit inside an LLM context window.

Document chunking splits long source documents (HTML pages, PDFs, markdown docs, transcripts) into smaller, self-contained segments before indexing them for [RAG](/learn/rag-retrieval-augmented-generation) and [semantic search](/learn/semantic-search). Chunking exists because [vector embeddings](/learn/vector-embeddings) dilute meaning when forced to summarize thousands of words into a single vector, and stuffing entire raw documents into an LLM's [context window](/learn/context-window) burns tokens and degrades attention.

**How chunking shapes retrieval granularity**

```text
┌─────────────────────────── Source Doc ───────────────────────────┐
│ # Pricing   ## Limits (table)   ## Auth (code)   ## SLA (prose)  │
└─────────────────────────────────┬────────────────────────────────┘
                                  ▼ split by structure + token cap
  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
  │ Chunk 1 (Pricing) │ │ Chunk 2 (Limits)  │ │ Chunk 3 (Auth)    │
  │ + parent heading  │ │ + parent heading  │ │ + parent heading  │
  └─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
            └─────────────────────┼─────────────────────┘
                                  ▼ index (BM25 + vectors)
                   Retrieve only the chunks that match
```

## Five chunking strategies compared

The right splitter depends on document structure. Naive fixed-character splitting regularly slices straight through markdown tables, code blocks, and pronoun references.

| Strategy | How it splits | Pros | Cons |
| --- | --- | --- | --- |
| Fixed-token + overlap | Every `N` tokens (e.g., 512) with 10%–15% overlap | Simple, predictable sizes | Cuts mid-sentence, breaks tables and code |
| Recursive / structural | Splits by `h2` → `h3` → paragraph → sentence within a token cap | Preserves headings, code blocks, and tables | Uneven chunk lengths across sparse docs |
| Semantic chunking | Splits where cosine similarity between adjacent sentences drops | Groups topically coherent spans | Extra embedding cost at ingest; sensitive to threshold |
| Parent-child (small-to-big) | Indexes small chunks for matching, returns parent section to LLM | Sharp retrieval + full surrounding context | Requires storing parent-child mapping |
| Contextual chunking | Prepends document title + section breadcrumbs (or short LLM summary) | Fixes orphaned pronouns ("it", "the company") | Adds ingest tokens / storage overhead |

```python
import re

def chunk_markdown(md: str, max_chars: int = 1600) -> list[dict]:
    sections = re.split(r"(?m)^(?=#{1,3}\s)", md.strip())
    chunks = []
    for sec in sections:
        lines = sec.strip().splitlines()
        if not lines:
            continue
        heading = lines[0].lstrip("# ").strip() if lines[0].startswith("#") else "Intro"
        body = "\n".join(lines[1:]).strip() if lines[0].startswith("#") else sec.strip()
        if not body:
            continue

        # Sub-split oversized sections on paragraph boundaries while keeping heading context
        buf = ""
        for para in body.split("\n\n"):
            if buf and len(buf) + len(para) + 2 > max_chars:
                chunks.append({"heading": heading, "text": f"{heading}\n\n{buf}"})
                buf = para
            else:
                buf = f"{buf}\n\n{para}" if buf else para
        if buf:
            chunks.append({"heading": heading, "text": f"{heading}\n\n{buf}"})
    return chunks
```

## Static chunking vs. query-focused web excerpts

Static chunking works well for a private corpus you index ahead of time, but it has an inherent limitation: chunk boundaries are frozen before you know what the user will ask. A 512-token boundary might separate a table's column headers from row 18, or separate an entity's name in paragraph 1 from its revenue figure in paragraph 4.

For open-web retrieval, AI-native [web search APIs](/learn/web-search-api) like [Parallel Search](/products/search) and [Extract](/products/extract) bypass static pre-chunking at the client layer—extracting **query-focused excerpts** dynamically around the passages that actually answer the agent's `objective`, already stripped of navigation chrome and sized for multi-turn [agentic search](/learn/agentic-search).

## Practical defaults for RAG teams

- **Start with 400–800 tokens and structural boundaries** (headings, paragraphs, table integrity) before reaching for complex semantic splitters.
- **Always prepend metadata breadcrumbs** (`doc_title`, `section_heading`, `url`, `publish_date`) into the indexed text so both [lexical search](/learn/lexical-search) and dense embeddings know which entity a chunk belongs to.
- **Pair smaller chunks with **[**reranking**](/learn/reranking)**:** Retrieve top 40–80 compact chunks via [hybrid search](/learn/hybrid-search), then rerank and pass the top 5–8 to the LLM.

## Frequently asked questions

**How much chunk overlap should I use?**

For fixed-size splitters, 10%–15% overlap (roughly 50–100 tokens) reduces boundary cuts without inflating index size heavily. Structure-aware splitters that break on headings and paragraphs often need zero overlap if each chunk carries its parent heading breadcrumb.

**Do larger context windows make chunking unnecessary?**

No. Even with 200K+ token [context windows](/learn/context-window), retrieving focused chunks cuts latency, token cost, and attention noise compared to dumping entire multi-page PDFs into every prompt.

**Why do markdown tables break in naive chunkers?**

Splitting a table mid-row strips the header row from the lower rows, leaving numbers without column names. Keep tables whole when possible, or repeat the table header row at the top of each split segment.

# Source grounding

Source grounding constrains an LLM to answer strictly from verified external evidence retrieved at query time and binds each claim to the specific document and excerpt that supports it.

Source grounding is the practice of constraining a language model to answer strictly from verified external evidence supplied at inference time—and binding every claim in the output back to the exact source document or passage that supports it. While general [grounding in AI](/learn/grounding-llm) covers any connection to external reality (APIs, calculators, sensors, databases), _source grounding_ focuses specifically on document-level and passage-level attribution so an engineer, compliance officer, or automated checker can verify every sentence against an inspectable source.

**Source-grounded generation and verification flow**

```text
Query ──▶ [Search / Retrieval API] ──▶ Source Passages [S1, S2, S3]
                                              │
                                              ▼
                                ┌───────────────────────────┐
                                │ Constrained Generator LLM │
                                │ (answer only from S1..S3; │
                                │  abstain if unsupported)  │
                                └─────────────┬─────────────┘
                                              ▼
                                 Draft Claims + Source IDs
                                              │
                                              ▼ (optional check)
                                ┌───────────────────────────┐
                                │ Attribution / NLI Check   │
                                │ Does Si entail Claim i?   │
                                └─────────────┬─────────────┘
                                              ▼
                                  Grounded Answer + Basis
```

## Attributable vs. merely plausible answers

In _[Evaluating Attribution in Dialogue Systems](https://arxiv.org/abs/2104.07567)_[ (Rashkin et al., 2021)](https://arxiv.org/abs/2104.07567), researchers introduced **AIS** (Attributable to Identified Sources)—a clear test for source grounding: _would a human reader looking only at the cited source conclude that the claim is true?_ A fluent answer that happens to be right from training memory fails AIS if the cited passage does not actually state it.

Source grounding therefore requires three distinct properties:

1. **Retrieval precision:** The right primary documents (filings, official docs, live web pages) must actually enter the [context window](/learn/context-window)—powered by [hybrid search](/learn/hybrid-search), [reranking](/learn/reranking), or a live [web search API](/learn/web-search-api).
2. **Closed-world generation:** The prompt and decoding setup instruct the model to derive claims exclusively from the supplied passages and return `"unknown"` or abstain when the passages do not contain the answer.
3. **Verifiable claim-to-source mapping:** Each output sentence or JSON field carries a pointer to the specific URL and excerpt that backs it (the exact contract implemented by a [citations API](/learn/citations-api)).

```python
GROUNDED_SCHEMA = {
    "type": "object",
    "properties": {
        "value": {"type": ["string", "null"], "description": "Null if not explicitly stated in sources."},
        "source_url": {"type": ["string", "null"]},
        "supporting_quote": {"type": ["string", "null"], "description": "Exact substring from the cited source."},
        "status": {"type": "string", "enum": ["grounded", "insufficient_evidence", "conflicting_sources"]},
    },
    "required": ["value", "source_url", "supporting_quote", "status"],
    "additionalProperties": False,
}
```

## Source grounding vs. RAG vs. fact-checking

| Concept | Primary mechanism | Guarantees claim-level attribution? | Failure mode if misconfigured |
| --- | --- | --- | --- |
| [RAG](/learn/rag-retrieval-augmented-generation) | Retrieves passages and appends them to the prompt | No (model may still blend parametric memory) | Ignores context or cites loosely related chunks |
| Source grounding | Restricts claims to retrieved evidence + maps each claim to its source | Yes (when paired with excerpt binding / verification) | False abstention if retrieval misses the answer |
| Post-hoc fact-checking | Verifies an already-generated draft against external sources | Only after a second retrieval + NLI pass | Adds latency; misses subtle framing shifts |

## How production platforms implement source grounding

Cloud and web-research platforms expose source grounding at different layers of the stack:

- **Integrated model grounding:** Google Cloud's [Vertex AI / Gemini grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) connects Gemini responses to web or enterprise search and attaches `groundingChunks` and `groundingSupports` span metadata.
- **Model-agnostic retrieval and basis:** [Parallel Search](/products/search) supplies dense, attributable web excerpts for any model you run, while Parallel's [Task API](/products/task) returns per-field citations, verbatim excerpts, reasoning, and calibrated confidence through the [Basis framework](/blog/introducing-basis-with-calibrated-confidences).

## Frequently asked questions

**How is source grounding different from RAG?**

[RAG](/learn/rag-retrieval-augmented-generation) is the architectural pattern of fetching documents and putting them in the prompt. Source grounding is the stricter output standard: every claim must be entailed by the supplied passages, carry a verifiable pointer to its source, and abstain when evidence is absent.

**Why do grounded models still occasionally cite the wrong source?**

Without exact quote verification or entailment checking, a model can attach a nearby URL from the prompt to a claim it recalled from pretraining. Requiring a verbatim `supporting_quote` substring (and checking programmatically that the substring appears in the fetched source) catches most misattributions cheaply.

**Where is source grounding mandatory?**

Regulated and high-stakes workflows—[AI agents in finance](/learn/ai-agents-in-finance), [KYB](/learn/kyb) compliance, legal research, and medical summaries—require source grounding so every number and decision survives audit review.

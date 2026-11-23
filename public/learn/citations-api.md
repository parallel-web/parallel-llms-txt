# Citations API

A citations API returns structured, machine-readable references to the exact source URLs, passages, and metadata supporting a generated answer or extracted field so every claim can be verified programmatically.

A citations API returns structured, machine-readable references to the exact source documents, URLs, and text passages that support a generated answer or extracted field. Instead of returning bare prose that a reader has to trust on faith, a citations API binds individual claims (or structured JSON fields) to verifiable evidence—turning [source grounding](/learn/source-grounding) into a contract your UI and audit logs can render and verify programmatically.

**Claim-level citation binding**

```text
┌──────────────────────────────┐     ┌──────────────────────────────┐
│ Output Field / Claim         │     │ Basis / Citation Record      │
│ "hq_city": "San Francisco"   │ ──▶ │ url: sec.gov/Archives/...    │
│ "employees": 1420            │ ──▶ │ excerpts: ["...1,420 full-   │
│                              │     │   time employees as of..."]  │
│                              │     │ confidence: "high"           │
└──────────────────────────────┘     └──────────────────────────────┘
```

## Two meanings of "citations API"

Engineers encounter the term in two different domains:

1. **AI grounding & attribution APIs:** Endpoints that attach source URLs, character offsets, and supporting excerpts to LLM outputs—for example, [Amazon Bedrock's ](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Citation.html)`[Citation](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Citation.html)`[ object](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Citation.html) (`generatedResponsePart` + `retrievedReferences`), Google Cloud's [grounding metadata](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/grounding) (`groundingChunks` + `groundingSupports`), and Parallel's [Task API](/products/task) and [Basis framework](/blog/introducing-basis-with-calibrated-confidences), which return per-field citations, reasoning, and calibrated confidence levels.
2. **Scholarly citation-graph APIs:** Bibliographic services such as [Crossref's data citations endpoint](https://www.crossref.org/documentation/retrieve-metadata/data-citations), OpenAlex, and Semantic Scholar that resolve DOIs, paper-to-paper citation graphs, and paper-to-dataset links.

## What a good AI citation payload contains

A list of URLs pasted at the bottom of a response is weak attribution: it does not tell a reviewer which URL backed which sentence, or whether the page actually says what the model claimed. Production citation schemas bind four elements together:

- **Target pointer:** Either character/span indices (`start_index`, `end_index`) in prose, or an exact JSON field path (`field: "latest_funding_usd"`) in structured outputs.
- **Source identifier:** Canonical `url` (or document ID + page number for PDFs and filings) plus `title`.
- **Supporting excerpt:** The verbatim quote or passage extracted from the source so a reviewer can verify the claim without opening ten tabs.
- **Reasoning and confidence:** Why the source supports the field and how strong the evidence is—essential for automated review queues in [finance](/learn/ai-agents-in-finance) and [KYB](/learn/kyb).

```json
{
  "output": {
    "legal_name": "Acme Robotics Inc.",
    "incorporated_state": "Delaware"
  },
  "basis": [
    {
      "field": "incorporated_state",
      "citations": [
        {
          "url": "https://www.sec.gov/Archives/edgar/data/0000000000/10k.htm",
          "title": "Acme Robotics Inc. — Form 10-K",
          "excerpts": [
            "Acme Robotics Inc., a Delaware corporation, was incorporated in March 2019."
          ]
        }
      ],
      "reasoning": "The cover page of the FY2025 Form 10-K explicitly states Delaware incorporation.",
      "confidence": "high"
    }
  ]
}
```

## Citation verification: avoiding "citation theater"

Attaching a real URL does not guarantee the cited page actually supports the claim. Models frequently exhibit two citation bugs when asked to cite via prompting alone:

- **URL-claim mismatch:** The URL is real and topically related, but the specific number or date in the generated sentence does not appear on that page.
- **Fabricated or stale links:** A model cites a URL from training memory that 404s or has since changed.

Reliable pipelines solve this by restricting citations strictly to sources fetched during the current run (via a [web search API](/learn/web-search-api) or [knowledge retrieval API](/learn/knowledge-retrieval-api)), mapping claims directly to retrieved excerpts, and optionally running an entailment or post-hoc verification pass to check that every cited excerpt entails the claim it backs.

## Frequently asked questions

**How is a citations API different from a web search API?**

A [web search API](/learn/web-search-api) returns ranked source documents and excerpts _before_ generation. A citations API returns synthesized answers or structured fields _with_ explicit links tying each claim back to the retrieved sources.

**Why prefer field-level or span-level citations over a bibliography at the end?**

A flat bibliography forces a human reviewer to read every source to audit one number. Field-level and span-level citations let your UI highlight the exact supporting quote inline and let code automatically flag any ungrounded field.

**Can citations eliminate hallucinations?**

Citations do not stop a model from misreading a passage, so they are necessary but not sufficient. Pairing citations with verbatim excerpts, calibrated confidence, and strict [grounding](/learn/grounding-llm) makes errors immediately auditable instead of silent.

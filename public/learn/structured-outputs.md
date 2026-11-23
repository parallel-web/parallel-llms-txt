# Structured outputs

Structured outputs use grammar-constrained decoding to restrict an LLM's token sampling to a declared JSON Schema, guaranteeing syntactically valid, typed payloads for downstream code.

Structured outputs constrain a language model to emit data conforming strictly to a declared schema—most commonly JSON Schema—rather than free-form prose. Instead of asking a model in English to _"please return valid JSON with no markdown fences"_ and hoping `json.loads()` does not crash, structured outputs enforce schema compliance directly during token sampling so downstream code, databases, and [data enrichment](/learn/data-enrichment) pipelines receive predictable, typed objects.

**Grammar-constrained decoding for structured outputs**

```text
JSON Schema ──▶ [Compile Grammar / FSM]
                        │ allowed token mask at step t
                        ▼
Prompt ─▶ [LLM Logits] ─▶ [Mask] ─▶ [Sample] ─▶ Valid JSON
                            ▲           │
                            └─ advance ◀┘
```

## How constrained decoding works under the hood

At every generation step, an LLM produces a probability distribution (logits) over its entire vocabulary (50K–200K tokens). Without constraints, the model can emit trailing commas, unescaped quotes, extra keys, or conversational preambles like `"Sure! Here is the JSON:"`.

With **constrained decoding** (also called grammar-guided or FSM-guided decoding):

1. Before generation starts, the inference engine compiles your JSON Schema into a finite-state machine (FSM) or context-free grammar (CFG) tracking which characters and tokens are syntactically legal at the current parse position.
2. At each token step, every token in the vocabulary that would violate the grammar has its logit set to `-infinity` (probability `0`).
3. The model samples only from schema-valid continuations until the closing `}` is reached.

First-request compilation adds brief overhead (often cached server-side per schema hash), after which per-token masking runs in microseconds on CPU alongside GPU sampling.

## Designing schemas that keep models accurate

Schema adherence guarantees **valid syntax**, not **true facts**. If a schema forces a non-nullable string for a field that does not exist in the retrieved web evidence, constrained decoding will literally force the model to invent a value to satisfy the grammar. Good schemas design for uncertainty:

- **Allow **`**null**`** or explicit **`**"unknown"**`** enums** on any field sourced from the outside world so [source grounding](/learn/source-grounding) can abstain cleanly.
- **Put reasoning before verdict fields** when a classification or extraction requires multi-step judgment—because autoregressive models generate left to right, emitting `reasoning` before `label` lets the final label attend to the reasoning tokens.
- **Constrain categorical fields with **`**enum**` instead of free strings to prevent casing/synonym drift (`"US"`, `"USA"`, `"United States"`).
- **Set **`**additionalProperties: false**` and explicit `required` arrays so strict-mode compilers accept the schema across providers.

```python
from typing import Literal, Optional
from pydantic import BaseModel, Field

class CompanyVerification(BaseModel):
    reasoning: str = Field(
        description="Brief explanation grounded strictly in retrieved evidence."
    )
    status: Literal["active", "dissolved", "acquired", "unknown"]
    jurisdiction: Optional[str] = Field(
        default=None,
        description="Incorporation state or country; null if not stated in sources.",
    )
    source_url: Optional[str] = Field(
        default=None,
        description="Exact URL of the primary registry or filing.",
    )
```

## Structured outputs vs. tool calling vs. JSON mode

| Mode | Guarantees valid JSON? | Enforces exact JSON Schema? | Primary use case |
| --- | --- | --- | --- |
| Prompt-only JSON | No | No | Legacy models without API support |
| JSON mode (`response_format: json_object`) | Yes | No (keys/types can drift) | Loose prototyping |
| Structured outputs (`json_schema`, `strict: true`) | Yes | Yes (constrained decoding) | Data extraction, [entity matching](/learn/entity-matching), [KYB](/learn/kyb), UI rendering |
| [Tool calling](/learn/tool-calling) (`strict: true`) | Yes | Yes (on tool arguments) | Invoking external functions/APIs inside an agent loop |

When extracting structured records directly from the live web—such as turning a company name into verified filings, pricing tiers, or ownership fields—endpoints like Parallel's [Task API](/products/task) pair structured output schemas with autonomous web research and per-field [citations](/learn/citations-api) in one call.

## Frequently asked questions

**Does constrained decoding hurt a model's reasoning quality?**

Forcing raw JSON with no scratchpad can hurt accuracy on hard classification or math tasks because the model has nowhere to work through intermediate steps. Including a `reasoning` field before the final answer field—or using a model's built-in reasoning tokens—preserves accuracy while keeping the final payload strictly typed.

**Why do some JSON Schema keywords fail in strict mode?**

Recursive references, arbitrary `patternProperties`, complex regexes, or `minLength`/`maximum` bounds can explode FSM state space. Most providers support a well-defined subset (`object`, `array`, `string`, `number`, `integer`, `boolean`, `null`, `enum`, `anyOf`, `required`, `additionalProperties: false`).

**Do I still need runtime validation if I use structured outputs?**

Yes for semantic checks. Constrained decoding guarantees the JSON parses and matches declared types, but your application should still validate business invariants (valid ISO dates, URLs belonging to retrieved sources, non-empty required citations).

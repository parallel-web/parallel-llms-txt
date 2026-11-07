# OpenAI Decisions API alternatives: 7 options compared

Looking for an OpenAI Decisions API alternative usually means one of five things: a lower token price, answers grounded in the live web, a choice of model, open weights, or a specific hosting region. This guide explains what OpenAI's endpoint does well, compares seven alternatives with their prices and limits, maps the request fields, and shows a migration you can run.

The OpenAI Decisions API (GA October 22, 2026) is a fast, inexpensive way to get typed answers from gpt-6-luna about input you already have, at $0.10 per million input tokens with up to 400 questions per request. The main alternatives are TypeSafe Jev, Perplexity Decisions, Liquid d1-ultra, Cloudflare Clef-flash, Microsoft-Decision-1, Laya, and Parallel's Decisions API. Pick a token-priced model when the evidence is already in your request; pick Parallel, which searches the live web and cites sources for $1 per 1,000 requests, when the evidence isn't.

We build Parallel's Decisions API, so weigh that. Every competitor fact below comes from the vendor's own documentation or announcement, checked on November 6, 2026.

## What the OpenAI Decisions API is

OpenAI announced the Decisions API at DevDay on September 29, 2026, opened a public beta on October 6, and made it generally available on October 22. You call `POST https://api.openai.com/v1/decisions` with the model `gpt-6-luna`, an `input`, and a `questions` array. Each question is a `predicate` (probability that a statement is true), a `choice` (one value from a fixed set), or a `score` (a probability-weighted position on ordered levels). Answers come back in question order, and any question can return a refusal.

It does several things well:

- **Scale per call.** 1 to 400 questions per request, doubled from 200 during the beta.
- **Price.** $0.10 per million uncached input tokens and no charge for output. Prompt caching discounts a repeated shared prefix of 1,024 tokens or more, and cache writes are charged.
- **Rich input.** `input` takes a string or an ordered array of messages, function calls and their outputs, and custom tool calls and outputs. An `input_json` content part passes structured data without stringifying it, and images can go in the shared input or in an individual question's instructions.
- **Bring-your-own evidence.** Because tool-call outputs are valid input, you can run your own search tool and pass its results in as evidence.
- **Voice.** GPT-Live has native Decisions integration, so voice apps can react while someone is still speaking.
- **Speed.** OpenAI says decisions return about 10x faster than the Responses API. In TechCrunch's launch coverage, OpenAI's Nikunj Handa described going "from one to three seconds to 100, 120, 180 milliseconds", and trial customer Speak cut time between actions from 1.4 s to 0.13 s.

OpenAI also documents Zero Data Retention and HIPAA eligibility for the endpoint, plus regional processing in the US and Europe, with regional premiums.

## Why teams look for alternatives

These are design choices that suit some workloads better than others.

- **Token price.** $0.10 per million input tokens is cheap, but several decision models charge less: Jev at $0.042, Perplexity's Decider at $0.02 (Flash at $0.01), and Cloudflare's Clef-flash at $0.038.
- **No built-in web lookup.** The endpoint answers from what you send. If the question is about a company, a product, or a regulation that changed last month, you have to fetch the evidence yourself first.
- **One model.** `gpt-6-luna` is the only supported model, and TechCrunch reported that OpenAI built the endpoint by reconfiguring Luna rather than training a separate decision model. Teams that want to compare models, or prefer a model trained only for calibrated decisions, look elsewhere.
- **Open weights.** Some teams need to run the model on their own hardware or fine-tune it.
- **Where the data lives.** OpenAI supports US and European regional processing. Teams already standardized on Azure Data Zones or on self-hosting may prefer a model that runs there.

## The seven alternatives at a glance

| Alternative | Vendor | Searches the web | Input price | Best fit |
| --- | --- | --- | --- | --- |
| Parallel Decisions API | Parallel | Yes, one shared retrieval per request | $1 per 1,000 requests, up to 100 questions each | Questions about the outside world, with citations |
| Jev 1.14 | TypeSafe | No | $0.042 per 1M input tokens | Calibrated decisions on your own data, many-option choices |
| Perplexity Decisions | Perplexity | Optional, one search per question | $0.02 per 1M (Flash $0.01) plus $0.001 per search | Long context, per-question search |
| d1-ultra | Liquid AI | No | $0.042 per 1M | Top of the AA Decision Index |
| Clef-flash | Cloudflare | No | $0.038 per 1M | Workers AI apps, open weights, zero data retention |
| Microsoft-Decision-1 | Microsoft | No | $0.042 per 1M | Azure customers who want US or EU Data Zones |
| Laya | Convai Innovations | No | Free to self-host | Millisecond, self-hosted, multilingual routing |

## Each alternative and when it fits

### Parallel Decisions API

Parallel's Decisions API launched on October 25, 2026. You send a `state` (a company, a URL, JSON, or text) and named `questions`; Parallel searches the live web, answers every question against one shared set of retrieved evidence, and returns typed answers plus request-level citations with URLs and the excerpts it used. It costs $1 per 1,000 requests with up to 100 questions per request and search included, with typical latency under one second.

It fits when the answer isn't in your input: vendor validation, KYB rechecks, lead qualification, fact-checking a claim against current sources. It costs more per question than every token-priced model here when your input already holds the answer, so don't use it for classifying text you already have.

### TypeSafe Jev

TypeSafe launched Jev on September 15, 2026 and coined the term "System One model". The current model is `jev-1.14.0` (October 14, 2026). It costs $0.042 per million input tokens with free output, takes 64K tokens per request and 32K per question, and supports up to 255 options per choice and 10 score levels. TypeSafe trains Jev with RLCD (Reinforcement Learning for Calibrated Decisions). Jev 1.14 also adds a `box` question type for locating objects in images. It answers from the state only. Jev ranks 10th on the Artificial Analysis Decision Index (November 5 snapshot) at 57.1; GPT-6 Luna (Decisions) ranks 21st at 48.5.

### Perplexity Decisions

Perplexity's Decisions API offers `pplx-decider-v1.2` (27B, $0.02 per million input tokens) and `pplx-decider-flash-v1.2` (4B, $0.01), with a 256K context and up to 255 options per choice. It's the one alternative here besides Parallel with a web option: `mode: "web_grounding"` runs one Perplexity search per question and adds the results to the state, at $0.001 per search on top of tokens. Per-question search can target evidence to each question, which helps when the questions in a request are about different things. See [Perplexity Decisions API vs Parallel](https://parallel.ai/articles/perplexity-decisions-api-vs-parallel).

### Liquid d1-ultra

Liquid AI's d1-ultra costs $0.042 per million input tokens and leads the Artificial Analysis Decision Index November 5 snapshot at 65.2. It's available through Liquid's API, OpenRouter, and Vercel AI Gateway. The smaller d1 costs $0.02 per million on OpenRouter. Pick it if you want the highest-scoring answer-from-input model on that index.

### Cloudflare Clef-flash

Clef-flash is a 9B model on Workers AI at $0.038 per million input tokens with zero data retention, and its weights are on Hugging Face. The larger Clef costs $0.24 per million with a 65,536-token context. It fits teams already building on Cloudflare who want decisions at the edge, with the option to self-host later.

### Microsoft-Decision-1

Microsoft-Decision-1 runs in Microsoft Foundry at $0.042 per million input tokens in both the US and EU Data Zones. You deploy it to your own Foundry resource first, then call `/providers/microsoft/v1/systemone` on that resource. It fits organizations that already run their AI workloads in Azure and want decisions inside the same tenancy and Data Zone.

### Laya

Laya is an Apache-2.0 open-weights decision model from Convai Innovations. It uses encoder models (ModernBERT-large for English, mmBERT-base for 100+ languages), so it's much smaller than an LLM, and `laya-serve` exposes a Jev-compatible `POST /v1/systemone`. Convai reports about 33 to 40 ms per question on a Tesla T4 and about 7 ms per question batched. The model card says plainly that Laya is "a fast base to specialise, not a zero-shot decision engine": base checkpoints score below the majority-class baseline on its typed-decisions set until fine-tuned. Pick it for high-volume routing or guardrails on data that can't leave your infrastructure. Hosted options exist too, such as Laya Studio at $0.0357 per million tokens. See [Laya vs Jev vs Parallel](https://parallel.ai/articles/laya-vs-jev-vs-parallel).

## Accuracy when the answer needs the web

Parallel built a benchmark for this case, PWS-Decisions: 300 closed-ended questions about dated public-web facts, curated for difficulty. Questions every tested provider got right were removed, so it's a development challenge set and not an estimate of average accuracy. A uniform random guess scores 42.4%. The non-Parallel decision APIs ran on their native endpoints with the same state and choices but no supplied web context, so they answered from the question alone.

| System | PWS-Decisions accuracy (300 questions, mean of 3 runs) | Configuration |
| --- | --- | --- |
| Parallel Decisions API | 76.2% | Live web search included |
| Perplexity Decisions v1.2 | 50.9% | Without web_grounding mode |
| Baseten Mammoth 27B | 45.0% | No web context |
| OpenAI Decisions API (gpt-6-luna) | 41.7% | No web context |
| TypeSafe Jev 1.14 | 33.4% | No web context |

Read this as "decision models without search can't know recent facts", not as a ranking of the models themselves. Perplexity's web-grounded mode wasn't tested, and no web-grounded Perplexity result has been published.

The fairer comparison is against an LLM agent with search. On the same 300 questions, GPT-6 Luna through the Responses API with required web search scored 97.3%, against Parallel's 76.2%. It took 7.42 s at p50 and cost $16.52 per 1,000 questions; Parallel took 0.56 s and cost $1.00. Luna with search is more accurate. Parallel is about 13x faster at p50 for about 1/16 the cost, which matters when the decision runs on every record or inside an agent loop. For one hard question where accuracy matters more than latency, use an LLM research agent or Parallel's Task API.

On answer-in-input tasks, the picture is different. On a 231-question JevBench set Parallel ran, OpenAI Decisions scored 90.0%, Parallel 89.6%, and Jev 88.3%: all within two points, with OpenAI highest.

## Mapping OpenAI requests to Parallel

Parallel uses the same request shape as Jev and the other System One models. Here is how the fields line up.

| OpenAI Decisions API | Parallel Decisions API | Notes |
| --- | --- | --- |
| POST api.openai.com/v1/decisions | POST api.parallel.ai/v1/decisions | Parallel auth uses the x-api-key header |
| model: gpt-6-luna | mode: fast (optional) | No model field; fast is the default and only mode |
| input (string, messages, tool outputs) | state (string, URL, or JSON object) | Parallel adds web evidence it retrieves |
| questions array with a name on each | questions object keyed by name | Names become keys |
| type: predicate | type: noul | Both return a probability from 0 to 1 |
| choice with choices list of value and description | choice with criteria object of key to description | 2 to 255 options on Parallel |
| score with levels list of label and description | score with criteria list of level descriptions | 2 to 10 levels on Parallel |
| answers array in question order | answers object keyed by name | Read answers by name |
| 1 to 400 questions | 1 to 100 questions | Split larger sets into several requests |
| No citations | citations list for the whole request | URL, title, and excerpts used |

## Migrating one question

Say you validate vendors and want to know whether Linear supports SAML SSO and offers an EU data region. With OpenAI, you first fetch Linear's docs yourself and pass the text in as evidence:

```bash
curl https://api.openai.com/v1/decisions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-luna",
    "input": "<text you fetched from linear.app/docs/saml-and-access-control and linear.app/docs/workspace-region>",
    "questions": [
      {"type": "predicate", "name": "supports_saml_sso",
       "instructions": "Does Linear support SAML single sign-on for workspaces?"},
      {"type": "choice", "name": "data_residency",
       "instructions": "Where can customers choose to host Linear workspace data?",
       "choices": [
         {"value": "us_only", "description": "Linear hosts workspace data in the US only."},
         {"value": "eu_available", "description": "Linear offers an EU data region customers can choose."},
         {"value": "unknown", "description": "The evidence does not establish where data can be hosted."}
       ]}
    ]
  }'
```

With Parallel, you name the company and let the API find the evidence:

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {"company": "Linear", "website": "https://linear.app"},
    "questions": {
      "supports_saml_sso": {"type": "noul",
        "instructions": "Does Linear support SAML single sign-on for workspaces?"},
      "data_residency": {"type": "choice",
        "instructions": "Where can customers choose to host Linear workspace data?",
        "criteria": {
          "us_only": "Linear hosts workspace data in the US only.",
          "eu_available": "Linear offers an EU data region customers can choose.",
          "unknown": "The evidence does not establish where data can be hosted."
        }}
    }
  }'
```

We ran the Parallel request on November 6, 2026. It returned in 626 ms (decision_id `decisions_a002486057ca025be9d8e4f85f7ed447`), with citations trimmed here from ten to three:

```json
{
  "mode": "fast",
  "answers": {
    "supports_saml_sso": {"type": "noul", "noul": 0.9957},
    "data_residency": {
      "type": "choice",
      "choice": "eu_available",
      "probabilities": {"us_only": 0.0010, "eu_available": 0.9989, "unknown": 0.0001},
      "confidence": 0.9983
    }
  },
  "usage": {"input_tokens": 2253, "output_tokens": 0},
  "citations": [
    {"url": "https://linear.app/docs/saml-and-access-control"},
    {"url": "https://linear.app/docs/workspace-region"},
    {"url": "https://linear.app/changelog/2024-05-23-european-union-data-hosting"}
  ]
}
```

Both answers match Linear's docs: SAML is available on the Enterprise plan, and new workspaces can choose a US or EU region. The noul answer only covers whether SAML exists; if the plan matters, ask a separate choice question.

If you have many OpenAI question definitions, a short function converts them:

```python
def to_parallel(openai_questions):
    out = {}
    for q in openai_questions:
        if q["type"] == "predicate":
            out[q["name"]] = {"type": "noul", "instructions": q["instructions"]}
        elif q["type"] == "choice":
            out[q["name"]] = {
                "type": "choice",
                "instructions": q["instructions"],
                "criteria": {c["value"]: c.get("description", c["value"]) for c in q["choices"]},
            }
        elif q["type"] == "score":
            out[q["name"]] = {
                "type": "score",
                "instructions": q["instructions"],
                "criteria": [
                    f'{lvl["label"]}: {lvl["description"]}' if lvl.get("description") else lvl["label"]
                    for lvl in q["levels"]
                ],
            }
    return out
```

This handles text instructions only. Questions with images in their instructions, or more than 100 questions per request, need restructuring.

## Frequently asked questions

**Does the OpenAI Decisions API search the web?** No. It answers from the `input` you send. You can run your own search tool and pass the tool-call outputs in as evidence, or use an API that retrieves evidence itself, such as Parallel's Decisions API or Perplexity's `web_grounding` mode.

**What is the cheapest alternative to the OpenAI Decisions API?** For answer-from-input decisions, self-hosted Laya has no per-token charge, and among hosted APIs Perplexity's Decider Flash is lowest at $0.01 per million input tokens. These are far cheaper per question than Parallel when no web lookup is needed. Parallel's $1 per 1,000 requests only makes sense when it saves you running a search pipeline yourself.

**Is the OpenAI Decisions API more accurate than Jev?** On a 231-question JevBench set Parallel ran, OpenAI scored 90.0% and Jev 88.3%. On the Artificial Analysis Decision Index (November 5 snapshot), Jev 1.14 ranks 10th at 57.1 and GPT-6 Luna (Decisions) ranks 21st at 48.5. Results depend on the benchmark, so test on your own data. See [OpenAI Decisions API vs Jev vs Parallel](https://parallel.ai/articles/openai-decisions-api-vs-jev-vs-parallel).

**Can I keep OpenAI and add Parallel?** Yes, and many workloads should. Use OpenAI or another token-priced model for questions about text you already hold, and send only the questions that need current outside facts to Parallel. Both return probabilities, so the same thresholds and review queues work for both.

## Try it

You can run the Linear example above in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests, or follow the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). To try it from an AI assistant with no key, add [Parallel MCP](https://parallel.ai/mcp) and ask "Use Parallel Decisions to check whether Linear offers an EU data region." It's also on OpenRouter as `parallel/decisions-fast`, free for seven days.

Related reading: [What is a Decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [Decision model pricing](https://parallel.ai/articles/decision-model-pricing) / [PWS-Decisions benchmark](https://parallel.ai/blog/pws-decisions-benchmark)

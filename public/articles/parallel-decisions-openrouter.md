# How to use Parallel Decisions on OpenRouter (parallel/decisions-fast)

Parallel Decisions on OpenRouter gives agents that already run through OpenRouter a way to ask typed questions about the live web with the API key they use for every other model. This guide covers the endpoint and free trial, working cURL, TypeScript, and Python calls, refusals and citations, guardrail thresholds, swapping decision models, and when calling Parallel directly is the better fit.

To use Parallel Decisions on OpenRouter, send `POST https://openrouter.ai/api/alpha/decisions` with your OpenRouter key and `"model": "parallel/decisions-fast"`. The model searches the live web, answers up to 100 typed questions about one shared `state` from a single retrieval, and returns probabilities plus sources for the whole request. OpenRouter lists its p50 latency at 0.60 seconds, and Parallel offers it free on OpenRouter for 7 days with no separate Parallel account.

We build Parallel's Decisions API, so weigh that. Everything below was checked against OpenRouter's model page, its API reference, and Parallel's docs on Nov 6, 2026, the day the model launched on OpenRouter.

## What parallel/decisions-fast is

`parallel/decisions-fast` is Parallel's web-grounded decision model, sometimes called a [System One model](https://parallel.ai/learn/system-one-model). It doesn't generate text. You pass context as `state` (a string, an object, or an array), name your questions, and get back one typed answer per question: a probability for a yes/no `noul`, a pick with per-option probabilities for a `choice`, or a position on an ordered rubric for a `score`. Unlike most decision models on OpenRouter, it looks up current web evidence before it answers, so it can decide things that aren't in the input, like whether a vendor supports SAML SSO or whether a runtime is still patched.

| Detail | Value on OpenRouter (Nov 6, 2026) |
| --- | --- |
| Model ID | parallel/decisions-fast (dated build parallel/decisions-fast-20261106) |
| Endpoint | POST https://openrouter.ai/api/alpha/decisions |
| Auth | Authorization: Bearer with your OpenRouter key |
| Question types | noul, choice (2 to 255 options), score (2 to 10 levels) |
| Questions per request | Up to 100, all sharing one web retrieval |
| Input per question | 32,000 tokens, including the shared state |
| Media inputs | Text only; image, audio, and video parts are rejected with a 400 |
| p50 latency | 0.60 s, as listed by OpenRouter |
| Price | $0 per 1,000 requests during the 7-day trial |
| Sources | Request-level, in an annotations array |
| EU in-region routing | Not available |

Two things trip people up. First, the model runs on OpenRouter's Decisions API, not the OpenAI-compatible chat endpoint, so chat completions SDKs won't work with it. Second, the multimodal guide lists Parallel's adapter as text only, while some other decision models on OpenRouter accept images.

## The 7-day free trial

Parallel's [launch post](https://parallel.ai/blog/decisions-openrouter) says you can try Parallel Decisions free for 7 days on OpenRouter with the key you already have and no separate Parallel account. On launch day the [model page](https://openrouter.ai/parallel/decisions-fast) listed the price as $0 per 1,000 requests, and OpenRouter's model catalog also listed a `parallel/decisions-fast:free` variant.

Neither page says what the per-request price will be after the trial. For reference, Parallel's direct price is $1 per 1,000 requests with up to 100 questions in each. Check the model page before you plan production volume.

## Make your first request with cURL

The example below is a guardrail check an agent might run before acting. The agent wants to pin a CI image to Python 3.9, and the question is whether that version still gets security fixes. That fact lives on the web, not in the agent's context.

```bash
curl https://openrouter.ai/api/alpha/decisions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "parallel/decisions-fast",
    "state": {
      "agent_task": "Upgrade the CI pipeline for a Python service",
      "proposed_action": "Pin the CI base image to Python 3.9 because it is the version the service was last tested on"
    },
    "questions": {
      "py39_supported": {
        "type": "noul",
        "instructions": "Is Python 3.9 still receiving security fixes from the Python core developers today?",
        "criteria": {
          "true": "Python 3.9 is in its security-fix phase and has not reached end of life.",
          "false": "Python 3.9 has reached end of life and no longer receives security fixes."
        }
      },
      "py39_status": {
        "type": "choice",
        "instructions": "What is the current support status of Python 3.9?",
        "criteria": {
          "bugfix": "Python 3.9 still receives regular bug-fix releases.",
          "security_only": "Python 3.9 receives security fixes only.",
          "end_of_life": "Python 3.9 has reached end of life.",
          "unknown": "The evidence does not establish the support status."
        }
      }
    }
  }'
```

The optional `HTTP-Referer` and `X-Title` headers only attribute your app on OpenRouter's leaderboards.

## What the answer looks like

We didn't have an OpenRouter key when we wrote this, so we won't show an OpenRouter response we didn't get. The JSON below is a real response from Parallel's direct endpoint (`POST https://api.parallel.ai/v1/decisions`) with the same `state` and `questions`, run on Nov 6, 2026. OpenRouter forwards `parallel/decisions-fast` requests to Parallel, which is the model's only provider, so the answers come from the same model. Citations are trimmed to three of ten.

```json
{
  "mode": "fast",
  "answers": {
    "py39_supported": { "type": "noul", "noul": 0.011860992356435538 },
    "py39_status": {
      "type": "choice",
      "choice": "end_of_life",
      "probabilities": {
        "bugfix": 0.0003177363606413566,
        "security_only": 0.011967545364939549,
        "end_of_life": 0.987456787416018,
        "unknown": 0.0002579308584010371
      },
      "confidence": 0.9832757165546906
    }
  },
  "usage": { "input_tokens": 3377, "output_tokens": 0 },
  "citations": [
    { "url": "https://devcenter.heroku.com/changelog-items/3527", "title": "Python 3.9 is no longer supported | Heroku Dev Center", "excerpts": ["Python 3.9 reached its upstream end-of-life on 31st October 2025 and so no longer receives upstream bug or security fixes."] },
    { "url": "https://www.ibm.com/support/pages/python-39-end-support-guidance-aix", "title": "Python 3.9 End of Support Guidance on AIX", "excerpts": ["Python 3.9 reached End of Life (EOL) on October 31, 2025."] },
    { "url": "https://www.python.org/downloads/latest/python3.9", "title": "Python Release Python 3.9.25 | Python.org", "excerpts": ["Python 3.9 is now in the \"security fixes only\" stage of its life cycle..."] }
  ],
  "decision_id": "decisions_0a6780ebdfb80d8fa24a112e73dc7c20"
}
```

The model put a 1.2% probability on Python 3.9 still getting fixes and picked `end_of_life` at 98.7%. That's correct: Python 3.9 reached end of life on Oct 31, 2025. Note the python.org release page in the evidence still describes the security-fix stage; the model weighed it against newer sources. Keeping the full source list is how you'd catch a case where it weighed them the other way.

Through OpenRouter, the answers keep this shape, but the envelope is OpenRouter's: you get `id`, `model` (the exact build that answered), `provider`, `answers`, and `usage` with a `cost` field. Sources arrive in an `annotations` array instead of `citations`, and there's no `decision_id`.

## Call it from TypeScript with @openrouter/sdk

The OpenRouter TypeScript SDK exposes the Decisions API as `openrouter.alpha.decisions.create`, with the body under `decisionsRequest`. This follows the example on OpenRouter's model page.

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY ?? "" });

const decision = await openrouter.alpha.decisions.create({
  decisionsRequest: {
    model: "parallel/decisions-fast",
    state: {
      company: "Linear",
      website: "https://linear.app",
    },
    questions: {
      supports_saml_sso: {
        type: "noul",
        instructions: "Does Linear support SAML single sign-on for workspaces?",
      },
    },
  },
});

const answer = decision.answers.supports_saml_sso;
if (answer.type === "refusal") {
  console.log("No answer returned; send this check to a person.");
} else if (answer.type === "noul") {
  console.log("Probability Linear supports SAML SSO:", answer.noul);
}
```

The SDK's Decisions docs describe the endpoint as alpha, so the shape may change. Pin your SDK version.

## Call it from Python

OpenRouter's Python SDK documents the same operation as `open_router.alpha.decisions.create(model=..., state=..., questions=...)`. If you'd rather not add a dependency, plain HTTP works, and it's what we show here because it maps one to one onto the cURL call.

```python
import os

import requests

response = requests.post(
    "https://openrouter.ai/api/alpha/decisions",
    headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
    json={
        "model": "parallel/decisions-fast",
        "state": {"company": "Linear", "website": "https://linear.app"},
        "questions": {
            "supports_saml_sso": {
                "type": "noul",
                "instructions": "Does Linear support SAML single sign-on for workspaces?",
            }
        },
    },
    timeout=30,
)
response.raise_for_status()
decision = response.json()

answer = decision["answers"]["supports_saml_sso"]
if answer["type"] == "refusal":
    print("No answer returned; send this check to a person.")
else:
    print("Probability:", answer["noul"])

for source in decision.get("annotations", []):
    print(source["url_citation"]["url"])
```

## Read answers and handle refusals

Check `type` before you read any other field. Any question can come back as `{"type": "refusal"}`, and that's a successful response with HTTP 200, not an error. Parallel's docs say to handle a refusal as its own outcome: don't turn it into a `false`, the first choice, or a zero score. Other questions in the same request can still have answers.

A few other rules from the docs and OpenRouter's schema:

- A `noul` is a probability, not a boolean. 0.99 means "very likely true", and you pick the cutoff.
- A low `noul` can mean the web evidence is thin, not that the statement is false. If you need an explicit "don't know", ask a `choice` with an `unknown` option, as the `py39_status` question does.
- OpenRouter's schema marks `probabilities`, `confidence`, and `legend` as optional, so read them behind a presence check.
- A `score` is the probability-weighted mean of zero-indexed levels, so 1.7 on a three-level rubric is a real answer.

## Keep the citations

Sources cover the whole request, not individual answers. That's a consequence of the design: every question in a call is answered from one shared retrieval. OpenRouter returns them as `annotations`, each with `type: "url_citation"` and a `url_citation` object holding `url`, `title`, and `content`. The direct Parallel API returns `citations` with `url`, `title`, and an `excerpts` array.

Store the sources next to each stored answer, along with the response's `model` field. When an answer looks wrong later, you can see what the model read, and when a new build ships, you can tell which answers came from which build.

## Use it as an agent guardrail

The playground on OpenRouter's model page includes an "Agent guardrail" preset. It asks a `noul`, "Is this action safe to run without a human approving it first?", with `true` meaning reversible or low-impact and within the task, and `false` meaning destructive, irreversible, or broader than the task. Its example threshold auto-executes the tool call when the yes-probability is at or above 80%.

That preset can be answered from the state alone. Web grounding earns its cost when the guard depends on outside facts: is this API version deprecated, is this package still maintained, does this vendor still offer this plan. In practice you want two cutoffs and an explicit path for refusals:

```python
AUTO_EXECUTE = 0.80  # at or above: act without asking
BLOCK = 0.20         # at or below: refuse and explain


def route(answer: dict) -> str:
    if answer["type"] == "refusal":
        return "escalate"
    p = answer["noul"]
    if p >= AUTO_EXECUTE:
        return "execute"
    if p <= BLOCK:
        return "block"
    return "escalate"
```

Pick the numbers on a labeled sample of your own cases. Parallel's launch demo did the same thing: one request about Vercel returned an `employee_band` answer at confidence 0.55, so that answer was routed to review instead of being written to the record.

## Swap decision models by changing one field

Every decision model on OpenRouter takes the same Decisions API body, so trying another one is a change to `model`. We confirmed these IDs in OpenRouter's live catalog (`GET /api/v1/models?output_modalities=decisions`) on Nov 6, 2026:

| Model ID | Vendor | Looks up the web | Listed price on OpenRouter |
| --- | --- | --- | --- |
| parallel/decisions-fast | Parallel | Yes, one retrieval per request | $0 per 1,000 requests during trial |
| typesafe/jev-1.14 | TypeSafe | No, answers from state | $0.042 per 1M input tokens |
| liquid/d1 | Liquid AI | No, answers from state | $0.02 per 1M input tokens |
| openai/gpt-6-luna-decisions | OpenAI | No, answers from state | $0.10 per 1M input tokens |
| perplexity/pplx-decider-v1.2 | Perplexity | No, answers from state | $0.02 per 1M input tokens |

Perplexity's own API also has an optional `web_grounding` mode that searches once per question; the table describes the OpenRouter model as listed.

When the answer is already in the input, the token-priced models are the better buy. They cost 10 to 100 times less per question, and on a 231-question JevBench set Parallel ran, where answers are in the input, Parallel (89.6%), OpenAI (90.0%), and Jev (88.3%) landed within two points of each other, with OpenAI highest. The reason to pick `parallel/decisions-fast` is a question whose answer is somewhere on today's web. Many agents end up using both: a token-priced model for routing and triage on text they already have, and Parallel for checks against the outside world.

Two habits make swaps safe. Pin a dated build or versioned ID rather than an alias such as `~typesafe/jev-latest`, and re-check your thresholds on the new model, because probabilities from one model don't map onto another.

On accuracy versus agent-style research: on PWS-Decisions, a 300-question benchmark Parallel built and curated for difficulty (random-guess baseline 42.4%), Parallel Decisions scored 76.2% at a p50 of 0.56 s and $1.00 per 1,000 questions. GPT-6 Luna with native web search scored 97.3% at a p50 of 7.42 s and $16.52 per 1,000. That's the source of the "13x faster at 1/16 the cost" line in Parallel's OpenRouter post. When one hard question needs the best possible answer, an LLM with search is more accurate. When a check runs on every step of an agent loop, speed and cost decide it.

## When to call Parallel directly instead

OpenRouter is the shortest path if your stack already runs there: one key, one bill, and model swaps by config. Calling `https://api.parallel.ai/v1/decisions` with an `x-api-key` header makes more sense in these cases:

| Need | Through OpenRouter | Parallel direct |
| --- | --- | --- |
| EU data handling | Not available through OpenRouter EU in-region routing | Parallel offers EU data residency |
| Search location and excerpt controls | Not in OpenRouter's request schema | advanced_settings.location and include_excerpts |
| Source excerpts | annotations with url, title, content | citations with url, title, excerpts array |
| Rate limit | OpenRouter account limits | 600 requests per minute by default |
| Free usage | 7-day trial | 5,000 free playground requests, plus up to $80 in free credits and $5 a month with a card on file |
| Other Parallel APIs | Decisions only | Search, Extract, Task, FindAll, and Monitor on the same key |

The last row matters once a question outgrows a decision. If the answer is a paragraph rather than a fixed option, or needs several rounds of research, Parallel's [Task API](https://docs.parallel.ai/task-api/task-quickstart) or Search API fits better than any decision model.

## Frequently asked questions

**Is Parallel Decisions free on OpenRouter?** For now, yes. Parallel says it's free for 7 days on OpenRouter with no separate Parallel account, and on Nov 6, 2026 the model page listed $0 per 1,000 requests. Neither page states the post-trial price; Parallel's direct price is $1 per 1,000 requests with up to 100 questions each.

**Can I call parallel/decisions-fast through OpenRouter's chat completions endpoint?** No. It runs only on `POST /api/alpha/decisions`, and OpenRouter's model page says chat completions SDKs won't work with it. Use `@openrouter/sdk` (`openrouter.alpha.decisions.create`), the Python SDK's `alpha.decisions.create`, or plain HTTP.

**Does parallel/decisions-fast accept images on OpenRouter?** No. OpenRouter's multimodal decisions guide lists Parallel's adapter as supporting `noul`, `choice`, and `score` with no media parts, and requests with image, audio, or video parts fail with a 400 before anything is sent to Parallel.

**Where are the citations in an OpenRouter response?** In the top-level `annotations` array. Each entry is a `url_citation` with `url`, `title`, and `content`, and the sources apply to the whole request, not to a single answer.

**How do I switch from Jev to Parallel Decisions on OpenRouter?** Change `model` from `typesafe/jev-1.14` to `parallel/decisions-fast` and re-check your thresholds on a labeled sample. Keep Jev for questions answered from the text you pass, and send questions that need current web facts to Parallel.

## Try it

Open [parallel/decisions-fast on OpenRouter](https://openrouter.ai/parallel/decisions-fast) and run the guardrail preset in the playground, or paste the cURL call above with your key. To compare against the direct API, Parallel's [Decisions playground](https://platform.parallel.ai/play/decisions) includes 5,000 free requests, and the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers the full schema.

Related reading: [Parallel Decisions is now on OpenRouter](https://parallel.ai/blog/decisions-openrouter) / [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [PWS-Decisions benchmark](https://parallel.ai/blog/pws-decisions-benchmark)

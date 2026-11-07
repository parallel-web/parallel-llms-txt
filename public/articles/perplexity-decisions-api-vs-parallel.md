# Perplexity Decisions API vs. Parallel Decisions API: two ways to ground a decision in the web

The Perplexity Decisions API and Parallel's Decisions API can both check a typed decision against the live web, but they retrieve evidence in different ways and bill for it differently. This guide covers how each one grounds a question, what 1, 10, and 50 questions about one company cost, where Perplexity is the better fit, and how to test both on your own labeled data.

Perplexity's Decisions API grounds each question separately: with `mode: "web_grounding"` it runs one Fast Search per question at $0.001 per search, on top of $0.02 per 1M input tokens (or $0.01 on Flash). Parallel's Decisions API runs one retrieval per request and answers up to 100 questions from that shared evidence for a flat $0.001. For one question the two cost about the same; for 50 questions about one company, Perplexity's search fees come to about $0.05 and Parallel's request stays at $0.001. Without web grounding, Perplexity is far cheaper than either, and no published benchmark compares the two in web-grounded mode.

We build Parallel's Decisions API, so weigh that. We've tried to describe Perplexity's design from its own documentation and to say plainly where it's the better choice.

## Two decision models that can use the web

Both products are decision models, sometimes called System One models: you send a `state` and a set of named questions, and you get back typed answers with probabilities instead of generated text. Both use the same three question types: `noul` (yes/no, returned as a probability), `choice` (pick one option, with per-option probabilities), and `score` (a level on an ordered rubric). Any question can come back as a refusal.

The difference is where the evidence comes from.

**Perplexity** answers from your `state` by default. Its [web grounding mode](https://docs.perplexity.ai/docs/decisions/quickstart), added in November 2026 according to its changelog, turns each question into its own search query: the question text plus the start of your `state`, up to 256 bytes. Each search returns up to five results, and the API keeps up to 10 results overall (or one per query when there are more than 10 queries) and appends them to the `state`. Questions that produce the same query share one search. The response adds a `search_results` array with title, URL, a snippet of up to 2,000 characters, and dates. If the `state` is a single URL, the API fetches the page first (up to 40,000 characters of text), and `max_staleness` sets how old a stored copy can be, in seconds.

**Parallel** always searches. It retrieves one set of evidence for the request, answers every question against it, and returns request-level citations: the URLs and excerpts the answers drew on. Citations cover the whole call, not each answer. Parallel's docs recommend grouping questions about the same entity in one request and sending separate requests for unrelated entities.

| Feature | Perplexity Decisions API | Parallel Decisions API |
| --- | --- | --- |
| Endpoint | POST api.perplexity.ai/v1/decisions | POST api.parallel.ai/v1/decisions |
| Auth | Authorization: Bearer | x-api-key |
| Models | pplx-decider-v1.2 (27B), pplx-decider-flash-v1.2 (4B) | One mode, fast |
| Web evidence | Optional, one Fast Search per question | Always, one shared retrieval per request |
| Search price | $0.001 per search or URL fetch | Included |
| Token price | $0.02 / 1M input (v1.2), $0.01 / 1M (Flash) | None; $0.001 per request |
| Questions per request | Up to 100 with web grounding | 1 to 100 |
| Context | 256K tokens | 32,000 estimated tokens per question, including state |
| Evidence returned | search_results per request | citations per request |
| Images in state | Yes, up to 8 per question | Not in the docs; text, JSON, or a URL |
| Typical latency | Searches capped at 3 s total, then inference | 200 ms to 1 s |

## Request examples

Here's a web-grounded Perplexity request. The Python and TypeScript SDKs don't have a `mode` parameter yet, so Perplexity's docs send it in the body (`extra_body` in Python). With raw HTTP it's just another field:

```bash
curl -X POST https://api.perplexity.ai/v1/decisions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "pplx-decider-latest",
    "mode": "web_grounding",
    "state": "Company: Datadog (datadoghq.com)",
    "questions": {
      "is_public": {"type": "noul", "instructions": "Is Datadog a publicly traded company?"},
      "fedramp": {"type": "noul", "instructions": "Does Datadog have a FedRAMP authorization for any of its offerings?"}
    }
  }'
```

That request runs two searches, one per question, and bills $0.002 in search fees plus input tokens.

The same idea against Parallel. There's no `mode` to set because search is always on:

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {"company": "Datadog", "website": "https://www.datadoghq.com"},
    "questions": {
      "is_public": {"type": "noul", "instructions": "Is Datadog a publicly traded company?"},
      "exchange": {"type": "choice", "instructions": "On which stock exchange is Datadog listed?",
        "criteria": {"nasdaq": "Nasdaq", "nyse": "New York Stock Exchange", "other": "Another exchange", "not_listed": "Not publicly listed"}},
      "eu_site": {"type": "noul", "instructions": "Does Datadog offer a data center site in the EU for customer data?"},
      "employee_band": {"type": "choice", "instructions": "How many employees does Datadog have?",
        "criteria": {"under_1000": "Fewer than 1,000", "1000_4999": "1,000 to 4,999", "5000_plus": "5,000 or more"}},
      "fedramp": {"type": "noul", "instructions": "Does Datadog have a FedRAMP authorization for any of its offerings?"}
    }
  }'
```

## What a real Parallel call returned

We ran that five-question Parallel request on November 6, 2026. It returned in 646 ms, used 3,247 input tokens of retrieved evidence, cost $0.001, and cited 10 sources (decision ID `decisions_d6d80c70b7bb5d9df3379458d69bcd27`). Answers, with citations trimmed to three:

```json
{
  "mode": "fast",
  "answers": {
    "is_public": {"type": "noul", "noul": 0.9937},
    "exchange": {"type": "choice", "choice": "nasdaq", "confidence": 0.9992},
    "eu_site": {"type": "noul", "noul": 0.9133},
    "employee_band": {"type": "choice", "choice": "1000_4999", "confidence": 0.5849,
      "probabilities": {"under_1000": 0.0368, "1000_4999": 0.7233, "5000_plus": 0.2400}},
    "fedramp": {"type": "noul", "noul": 0.9893}
  },
  "citations": [
    {"url": "https://investors.datadoghq.com/shareholder-services/investor-faqs"},
    {"url": "https://investors.datadoghq.com/news-releases/news-release-details/datadog-government-achieves-fedrampr-high-certification"},
    {"url": "https://www.datadoghq.com/about/latest-news/press-releases/datadog-plans-to-launch-new-uk-data-centre/"}
  ]
}
```

Four answers held up. The employee band did not: Datadog's [10-K for 2025](https://www.sec.gov/Archives/edgar/data/1561550/000162828026008819/ddog-20251231.htm) reports about 8,100 employees, so the right answer is `5000_plus`. The shared evidence leaned toward investor FAQs, data center announcements, and FedRAMP news, and none of the excerpts contained the headcount line. The low confidence (0.58) is the signal to act on: route answers under a threshold you choose to review. A follow-up request with only the headcount question retrieved the 10-K pages but still missed (confidence 0.42), because the excerpts didn't include that sentence.

That miss is the honest case for Perplexity's design. When questions about one entity pull toward different evidence, a search per question can target each one. We haven't tested whether Perplexity's grounded mode gets this particular question right, and we don't have a published result that says either way.

## What 1, 10, and 50 questions about one company cost

Perplexity's cost is searches plus input tokens. To estimate tokens, we used Perplexity's own documented example: one short claim plus five search results came to 1,663 input tokens, or roughly 320 tokens per result. We assume about 50 tokens per question and 100 tokens of state. Evidence is capped at 10 results for up to 10 queries, and one result per query above that. On v1.2, the evidence is billed once per group of questions; on Flash, it's billed once per question.

| Questions | Perplexity searches | Perplexity v1.2 tokens | Perplexity v1.2 total | Perplexity Flash total | Parallel total |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 x $0.001 = $0.001 | ~1,750 = $0.000035 | about $0.00104 | about $0.00102 | $0.001 |
| 10 | 10 x $0.001 = $0.010 | ~3,800 = $0.000076 | about $0.0101 | about $0.0104 | $0.001 |
| 50 | 50 x $0.001 = $0.050 | ~18,600 = $0.00037 | about $0.0504 | about $0.0593 | $0.001 |

The arithmetic behind the rows:

- **1 question:** 5 results x 320 + 50 + 100 = 1,750 tokens, or $0.000035 at $0.02 per 1M ($0.0000175 on Flash).
- **10 questions:** 10 results x 320 + 10 questions x 50 + 100 state = 3,800 tokens. At $0.02 per 1M that's $0.000076. On Flash, each question is billed the state and evidence again: 10 x 3,800 = 38,000 tokens at $0.01 per 1M = $0.00038.
- **50 questions:** 50 results x 320 + 50 x 50 + 100 = 18,600 tokens, or $0.00037 on v1.2. On Flash, 50 x 18,600 = 930,000 tokens at $0.01 per 1M = $0.0093.

Search fees dominate Perplexity's grounded cost; tokens are a rounding error. At 10,000 companies with 10 questions each, that's about $101 on Perplexity v1.2 and $10 on Parallel. If questions share a query, Perplexity bills fewer searches, so treat these as upper bounds on search fees. And if Parallel's shared retrieval misses a topic, as it did on headcount above, splitting into two requests doubles Parallel's cost to $0.002.

## Where Perplexity is the better fit

- **Questions that need different evidence.** One targeted search per question can beat one shared retrieval when the questions are about different facets or different entities.
- **Decisions over text you already have.** Without `mode`, Perplexity answers from `state` for $0.02 per 1M input tokens (v1.2) or $0.01 (Flash). A 500-token decision on v1.2 costs $0.00001, a hundredth of a Parallel request. For routing tickets or labeling text, use a token-priced model; Parallel isn't built for that.
- **Long inputs.** 256K tokens of context versus Parallel's 32,000 estimated tokens per question.
- **Images.** Up to eight images per question in `state`.
- **Two model sizes.** A 27B model for nuanced rubrics and a 4B Flash model for high-volume, one-question requests.
- **URL fetch with freshness control.** Pass a URL as `state` and set `max_staleness` to force a recent crawl.

Parallel fits when many questions about one entity can share evidence (enrichment, KYB rechecks, lead qualification), when you want a fixed price per request regardless of question count, and when you want citations with excerpts you can store next to the answer. Parallel runs about 200 ms to 1 s per request; in its launch demo, one request answered four questions about Vercel from 10 sources in 681 ms.

## What the benchmarks do and don't say

No published benchmark compares the two in web-grounded mode.

**PWS-Decisions** is a 300-question benchmark Parallel built, curated for difficulty, with a random-guess baseline of 42.4%. Parallel scored 76.22%. The Perplexity row, pplx-decider-v1.2 via OpenRouter, scored 50.89%, but it ran without `web_grounding`, at a recorded cost of $0.0042 per 1,000 questions. Every non-Parallel decision API in that run answered from the question alone. That row measures Perplexity's answer-from-input mode on questions that need web facts, so it isn't a head-to-head on grounding. The evaluation ran on October 29, 2026, before web grounding appeared in Perplexity's changelog.

**The Artificial Analysis Decision Index** (November 5 snapshot) measures answer-from-input decisions. Perplexity Decider v1.2 scored 56.2 (#11 of 23) and Decider Flash v1.2 scored 50.2 (#19). Parallel isn't on the index.

## How to test both on your own data

Take 100 to 300 real decisions from your workload, label them by hand, and run them through both APIs with the same questions. Track accuracy at the threshold you plan to use, refusals, p50/p95 latency, and cost from each response. A minimal harness:

```python
import json, os, time, requests

PPLX = ("https://api.perplexity.ai/v1/decisions",
        {"Authorization": f"Bearer {os.environ['PERPLEXITY_API_KEY']}"})
PARALLEL = ("https://api.parallel.ai/v1/decisions",
            {"x-api-key": os.environ["PARALLEL_API_KEY"]})

def run(endpoint, body):
    url, headers = endpoint
    t = time.time()
    r = requests.post(url, headers=headers, json=body, timeout=60).json()
    return r, time.time() - t

def predicted(answer):
    if answer["type"] == "refusal":
        return None
    return answer.get("choice", answer.get("noul", 0) >= 0.5)

rows = [json.loads(line) for line in open("labeled.jsonl")]  # {state, questions, labels}
for row in rows:
    base = {"state": row["state"], "questions": row["questions"]}
    p, p_s = run(PPLX, {**base, "model": "pplx-decider-latest", "mode": "web_grounding"})
    q, q_s = run(PARALLEL, base)
    for name, label in row["labels"].items():
        print(name, label,
              predicted(p["answers"][name]), round(p_s, 2), p["usage"]["input_tokens"], len(p.get("search_results", [])),
              predicted(q["answers"][name]), round(q_s, 2))
```

Cost per row on Perplexity is $0.001 per search (one per distinct question query) plus `usage.input_tokens` times the model's rate; on Parallel it's $0.001 per request. Run each set more than once; Perplexity notes that identical requests occasionally differ in the second decimal place.

## Frequently asked questions

**Does the Perplexity Decisions API search the web?** Only when you ask it to. Set `mode: "web_grounding"` and it runs one Fast Search per question, adds the top results to `state`, and returns them in `search_results`. Without `mode`, it answers from your `state` alone.

**How much does Perplexity's web grounding cost?** Each search or successful URL fetch costs $0.001, on top of $0.02 per 1M input tokens on pplx-decider-v1.2 or $0.01 on Flash. A grounded request with 100 questions has at most $0.10 in search fees, and search evidence counts as input tokens.

**Is Parallel more accurate than Perplexity's web-grounded mode?** We don't know, and nobody has published a test. Parallel's PWS-Decisions benchmark ran Perplexity without web grounding, so its 50.89% score reflects answer-from-input mode only. Test both on your own labeled sample.

**When should I use Perplexity Decider Flash?** Perplexity recommends it for high-volume decisions with clear criteria and one question per request. Flash answers each question separately and bills the `state` once per question, so for three or more questions about the same `state`, v1.2 usually costs less.

**Can I use Parallel's Decisions API without a Parallel account?** Yes. The `web_decisions` tool in [Parallel MCP](https://parallel.ai/mcp) works without an account or key at lower limits, and if you already use OpenRouter, `parallel/decisions-fast` works with your OpenRouter key.

## Try it

Run the same five Datadog questions in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests, then move to the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) once you have a labeled sample to compare.

Related reading: [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [Decision model pricing compared](https://parallel.ai/articles/decision-model-pricing) / [The PWS-Decisions benchmark](https://parallel.ai/blog/pws-decisions-benchmark) / [Jev alternatives](https://parallel.ai/articles/jev-alternatives)

# AI lead qualification with live web data: score and route every inbound lead

AI lead qualification decides, for every inbound lead, whether the company fits your ideal customer profile and where the lead should go next, using what is true about that company today rather than what a CRM field said last year. This guide covers the signals worth checking, a question pattern built on typed answers, review thresholds, and a live test on three real companies.

To qualify inbound leads with AI, ask the same short set of typed questions about every company (segment, headcount band, hiring, recent funding, ICP fit, disqualifiers), answer them against current web evidence, auto-route the answers that clear a confidence threshold, and send the rest to a person. With Parallel's Decisions API that is one request per lead at $0.001, typically under a second. In a demo Parallel ran at launch, 500 inbound leads were routed in under 9 seconds for about $0.50, and 97% of the leads it routed on its own landed in the right segment.

We build Parallel's Decisions API, so weigh our examples with that in mind. Everything below that shows API output comes from calls we made on Nov 6, 2026, including the answers it got wrong.

## What lead qualification needs to know

Qualification is a sorting problem. A form fill arrives with a name, an email domain, and maybe a company field. Before a rep sees it, someone or something has to decide which segment it belongs to, how big the account is, whether it matches the ideal customer profile (ICP), and whether anything rules it out. The useful signals are mostly facts about the company, not about the person who filled in the form.

| Signal | Why it matters | Question shape |
| --- | --- | --- |
| Segment or industry | Picks the team, playbook, and pricing motion | choice with an unknown option |
| Employee band | Separates self-serve, mid-market, and enterprise routing | choice with fixed bands |
| Hiring activity | Growth and budget signal; engineering hiring suggests build capacity | choice with count bands |
| Recent funding | New budget and urgency | noul (yes/no probability) |
| Tech or product fit | Whether they can use what you sell | noul or choice |
| Overall ICP fit | One number for prioritization | score on an ordered rubric |
| Disqualifiers | Public sector, competitors, sanctioned regions, students | noul per rule |

Most teams already have these as CRM fields. The problem is how old the values are.

## Why CRM fields go stale

Company data decays in ordinary ways. Startups double headcount in a year. A company raises a round, gets acquired, renames itself, or moves into a new market. Enrichment snapshots were accurate on the day they were pulled and then sit unchanged until someone refreshes them. Self-reported form fields are often blank or guessed.

Our own test shows the effect. Harvey's August 2025 blog post said its team "now includes 350 employees." Third-party workforce trackers put it above 1,000 in 2026 (Revelio Labs estimated about 1,130 as of March 2026). A routing rule that reads a year-old headcount field sends that lead to the wrong team. Re-checking the facts at the moment the lead arrives is the fix, and it only works if the check is cheap and fast enough to run on every lead.

## The decision pattern: choice, score, and noul

A web-grounded decision API takes shared context (the `state`, here the company name and website) and a map of named questions, retrieves evidence once, and returns a typed answer per question plus request-level citations. Three question types cover qualification:

- **choice** for categories: segment, employee band, hiring band. Give each option a concrete description and include an `unknown` option so the model has somewhere to go when the evidence is thin. Parallel's docs recommend this: a missing-evidence yes/no answer is not proof of "no."
- **score** for ICP fit: an ordered list of 2 to 10 levels, each described in words. The API returns a probability-weighted mean of the zero-indexed levels, so 2.7 on a 0 to 3 rubric means "mostly strong fit, some chance of good fit."
- **noul** for disqualifiers and binary facts: "Is this a public-sector body?" returns the probability that the statement is true.

Any question can come back as `{"type": "refusal"}`. The request itself still succeeds. Treat a refusal as "send to review," never as a no.

Group the questions about one company in one request (they share one retrieval and one price) and send a separate request per company. A single request can hold up to 100 questions.

## A live run on three real companies

We wrote one qualification request with seven questions against a sample ICP ("B2B software companies that build AI agents or AI features into their product and need live web data; best fit is 200+ employees and actively hiring engineers") and ran it on Harvey (legal AI), Ramp (spend management), and Sweetgreen (restaurants). Here is the request for Harvey, shortened to four of the seven questions:

```bash
curl -s https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "company": "Harvey",
      "website": "https://www.harvey.ai",
      "our_icp": "B2B software companies that build AI agents or AI features into their product and need live web data; best fit is 200+ employees and actively hiring engineers."
    },
    "questions": {
      "segment": {
        "type": "choice",
        "instructions": "Which segment best describes the company'"'"'s main business?",
        "criteria": {
          "ai_native_software": "Software company whose core product is built around AI models or agents.",
          "software_other": "Software company whose core product is not primarily AI.",
          "financial_services": "Bank, lender, insurer, or fintech whose core business is financial services.",
          "non_software": "Retail, restaurants, manufacturing, or other non-software business.",
          "unknown": "The evidence does not establish the company'"'"'s main business."
        }
      },
      "employee_band": {
        "type": "choice",
        "instructions": "How many employees does the company have today?",
        "criteria": {
          "1_50": "1 to 50 employees", "51_200": "51 to 200 employees",
          "201_1000": "201 to 1,000 employees", "1001_plus": "More than 1,000 employees",
          "unknown": "The evidence does not establish headcount."
        }
      },
      "icp_fit": {
        "type": "score",
        "instructions": "How well does the company match our ICP (in state)?",
        "criteria": [
          "No fit: not a software company or no AI product.",
          "Weak fit: software company, but AI is peripheral or company is very small.",
          "Good fit: software company with real AI features and meaningful scale.",
          "Strong fit: AI-native B2B software company with 200+ employees that is actively hiring engineers."
        ]
      },
      "disqualified_public_sector": {
        "type": "noul",
        "instructions": "Is this organization a government agency or public-sector body?"
      }
    }
  }'
```

The full seven-question request for Harvey returned in 648 ms. This is the response, with probabilities rounded, the score legend removed, and citations cut to three of ten:

```json
{
  "answers": {
    "segment": {"type": "choice", "choice": "ai_native_software",
      "probabilities": {"ai_native_software": 0.992, "software_other": 0.007, "financial_services": 0.0, "non_software": 0.0, "unknown": 0.0}},
    "employee_band": {"type": "choice", "choice": "201_1000",
      "probabilities": {"1_50": 0.0, "51_200": 0.0, "201_1000": 0.968, "1001_plus": 0.027, "unknown": 0.004}},
    "engineering_hiring": {"type": "choice", "choice": "1_4",
      "probabilities": {"none": 0.019, "1_4": 0.667, "5_19": 0.054, "20_plus": 0.008, "unknown": 0.253}},
    "raised_last_12_months": {"type": "noul", "noul": 0.985},
    "ships_ai_agents": {"type": "noul", "noul": 0.856},
    "icp_fit": {"type": "score", "score": 2.71,
      "probabilities": {"0": 0.008, "1": 0.011, "2": 0.244, "3": 0.737}},
    "disqualified_public_sector": {"type": "noul", "noul": 0.001}
  },
  "citations": [
    {"url": "https://www.harvey.ai/blog/built-by-lawyers-tailored-by-you"},
    {"url": "https://www.harvey.ai/blog/harvey-raises-at-dollar11-billion-valuation-to-scale-agents-across-law-firms-and-enterprises"},
    {"url": "https://harvey.ai/company"}
  ],
  "decision_id": "decisions_217b4417a9589d7c810a2aa6ac3116c0"
}
```

Across the three companies, top answers and their probabilities were:

| Question | Harvey | Ramp | Sweetgreen |
| --- | --- | --- | --- |
| segment | ai_native_software 0.99 | financial_services 0.48 | non_software 1.00 |
| employee_band | 201_1000 0.97 | unknown 0.68 | 1001_plus 1.00 |
| engineering_hiring | 1_4 0.67 | unknown 0.95 | unknown 0.64 |
| raised_last_12_months | 0.98 | 0.56 | 0.04 |
| icp_fit (0 to 3) | 2.71 | 2.09 | 0.01 |
| disqualified_public_sector | 0.00 | 0.00 | 0.00 |
| Latency | 648 ms | 884 ms | 629 ms |

What it got right: Sweetgreen is cleanly out (restaurant chain, no AI product, fit 0.01). Harvey's segment, its 2026 funding (it raised in March and September 2026), and its strong ICP fit are correct and well cited.

What it got wrong or left open:

- **Harvey's employee band is probably wrong at high confidence.** It picked 201 to 1,000 with 0.97, likely anchored on Harvey's own older "350 employees" figure, while third-party trackers put Harvey above 1,000 in 2026. High probability is not the same as correct, which is why you audit a sample of auto-routed leads.
- **Harvey's engineering hiring was wrong at low confidence.** It picked 1 to 4 with 0.67. When we asked that one question in its own request with Harvey's careers URL in the state, it answered 20 or more with 0.98 (604 ms), citing Harvey's job listings. The shared retrieval for seven questions favored company and funding pages over the job board.
- **Ramp came back uncertain on most questions,** which is the behavior you want when evidence is mixed. Segment split between financial_services (0.48) and software_other (0.45), headcount went to unknown, and the funding answer was 0.56 even though Ramp announced a $750 million round in June 2026. A threshold sends this lead to a person.

## Confidence thresholds and a review queue

The routing logic is a few lines. Auto-route only when every question that drives routing clears a threshold; everything else goes to a review queue with the citations attached.

```python
import os
import requests

ROUTING_KEYS = ("segment", "employee_band", "icp_fit", "disqualified_public_sector")


def qualify(company: str, website: str, questions: dict) -> dict:
    r = requests.post(
        "https://api.parallel.ai/v1/decisions",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={"state": {"company": company, "website": website}, "questions": questions},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def route(decision: dict, min_choice: float = 0.8) -> str:
    a = decision["answers"]
    if any(a[k]["type"] == "refusal" for k in ROUTING_KEYS):
        return "review"
    if a["disqualified_public_sector"]["noul"] >= 0.9:
        return "disqualified"
    for k in ("segment", "employee_band"):
        top = a[k]["choice"]
        if top == "unknown" or a[k]["probabilities"][top] < min_choice:
            return "review"
    fit = a["icp_fit"]["score"]  # 0 = no fit, 3 = strong fit
    if fit >= 2.5:
        return f"ae:{a['segment']['choice']}:{a['employee_band']['choice']}"
    if fit <= 0.5:
        return "nurture"
    return "review"
```

On our three leads, that rule auto-routes Harvey (to the wrong size band, see above), disqualifies nobody, sends Sweetgreen to nurture, and sends Ramp to review. Practical settings that follow from the run:

- Start strict (0.8 or higher on routing choices) and loosen only after you've labeled a few hundred reviewed leads.
- Ask questions that need a specific source, like hiring counts, in their own request and pass the source URL in `state`.
- Write headcount and hiring questions with a time anchor ("today," "as of 2026") and still spot-check them. They are the fields most likely to rest on stale pages.
- Store the `decision_id` and citations with the CRM record so a rep can see why a lead was routed.

## Cost and speed at inbound volume

Pricing is per request, not per question: $1 per 1,000 requests with search included, up to 100 questions each. A team with 20,000 inbound leads a month pays about $20 to qualify every one, or $40 if hiring gets its own request. Latency on our runs was 604 to 884 ms, in line with the 200 ms to 1 s Parallel publishes, so the check can run inline on form submit rather than in a nightly batch. The default rate limit is 600 requests per minute.

## Alternatives and when to use them

| Approach | Good at | Trade-off |
| --- | --- | --- |
| Enrichment providers (Clay, Apollo, ZoomInfo) | Contact data, firmographic databases, CRM integrations | Fields reflect the provider's last refresh; categories are theirs, not yours |
| LLM agent per lead with web search | Open-ended research and nuance | Seconds per lead and more per lead; harder to threshold |
| Parallel Task API | Multi-field structured research when you need values, not just categories | Asynchronous; built for depth over speed |
| Web-grounded decision API | Your own categories and rubric, sub-second, cited, $0.001 per lead | Answers only what you ask in fixed options; shared retrieval can miss niche facts |

These combine well. Many teams keep an enrichment provider for contacts and use decisions to re-check the routing facts at the moment a lead arrives. For a strategic account where one wrong answer is expensive, an LLM research agent or Parallel's [Task API](https://parallel.ai/products/task) is the better tool: on Parallel's own 300-question PWS-Decisions set (curated for difficulty; random guessing scores 42.4%), GPT-6 Luna with native web search scored 97.3% against Decisions' 76.2%, while Decisions ran about 13x faster at p50 and at about 1/16 the cost. Parallel built that benchmark. The trade is speed and price on every lead versus accuracy on a few.

## Frequently asked questions

**What is AI lead qualification?** AI lead qualification uses a model to decide whether an inbound lead fits your ideal customer profile and where to route it, based on facts about the company such as segment, size, hiring, and funding. Web-grounded versions check those facts against current sources instead of relying only on stored CRM fields.

**How is AI lead scoring different from rules-based lead scoring?** Rules-based scoring adds points for fields that already exist in your CRM, so it inherits whatever is missing or stale there. An AI scoring step can answer a rubric question ("strong, good, weak, or no fit") from current evidence and return probabilities you can threshold, which lets uncertain leads go to a person instead of a guess. The [AI lead scoring](https://parallel.ai/articles/ai-lead-scoring) guide compares scoring tools and builds a full fit score.

**How much does it cost to qualify leads with the Decisions API?** It costs $0.001 per request, and one request can hold up to 100 questions about the same company. Parallel's launch demo routed 500 leads for about $0.50. The playground includes 5,000 free requests.

**How accurate is it?** In Parallel's 500-lead demo, 97% of the leads it routed on its own landed in the right segment; the rest went to review. In our three-company test, segment, funding, and fit answers were right, one headcount answer was confidently wrong, and the uncertain answers were correctly flagged for review. Audit a sample of auto-routed leads.

**Where will Parallel use this itself?** Parallel says this lead-routing setup will power contact.parallel.ai, its inbound contact flow.

## Try it

Paste one of your recent inbound leads into the [Decisions playground](https://platform.parallel.ai/play/decisions) (5,000 free requests) with your own segment and ICP rubric, then wire the request into your form handler using the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). To see which go-to-market workflows could run on web-grounded decisions for your company, try the [use-case demo](https://webjev-use-cases.paralleldemos.com/).

Related reading: [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [AI lead scoring](https://parallel.ai/articles/ai-lead-scoring) / [AI lead routing](https://parallel.ai/articles/ai-lead-routing) / [Entity matching](https://parallel.ai/articles/entity-matching)

# AI lead scoring: how it works, the tools, and how to build a fit score on live web data

AI lead scoring ranks every lead by how likely it is to buy, but the tools that do it learn from different evidence: your own conversion history, third-party intent data, or what the web says about the company right now. This guide covers how scores are calculated, how seven popular tools compare, and how to build an ICP fit score you can run on brand-new leads.

AI lead scoring uses a model to estimate how likely each lead is to become a customer, usually as two numbers: a fit score (does this company match your ideal customer profile) and an engagement or intent score (is anyone there showing buying behavior). Predictive tools such as Salesforce Einstein and HubSpot's AI scores learn both from your past conversions, so they need history first: Einstein's own model needs at least 1,000 leads and 120 conversions in the last 200 days. A web-grounded decision model scores fit from current public evidence instead, so it works on a lead you've never seen before, in about half a second, for $0.001.

We build Parallel's Decisions API, which appears in the second half of this guide, so weigh that. The tool descriptions come from each vendor's own documentation, checked on Nov 6, 2026, and every API response shown here is one we got that day, including the answers it got wrong.

## Fit, intent, and engagement: the three things a lead score measures

Most lead scoring confusion comes from mixing three questions into one number. Vendors split them: HubSpot builds separate fit and engagement scores, MadKudu combines "Customer Fit" with "Likelihood to Buy," and 6sense separates account profile fit from intent and buying stage.

| Score | Question it answers | Typical inputs | Where the data lives |
| --- | --- | --- | --- |
| Fit | Does this company and person match our ICP? | Industry, headcount, revenue, tech stack, region, job title | Firmographic databases, the company's own website, public filings |
| Intent | Is the account researching what we sell? | Topic research across the web, review-site visits, keyword surges | Third-party intent networks |
| Engagement | Is this lead interacting with us? | Email clicks, page views, form fills, product usage, meetings | Your CRM, marketing automation, and product analytics |

Fit changes slowly and is mostly public. Engagement is private to you and changes daily. Keep them as separate fields and combine them at routing time, so a rep can tell a perfect-fit account that hasn't engaged from an active visitor that will never buy.

## How a lead score is calculated: rules, predictive models, and live evidence

There are three common ways to turn those inputs into a score.

| Method | How the score is produced | Needs | Good at | Weak at |
| --- | --- | --- | --- | --- |
| Rules-based | Points per attribute or action, summed (for example +20 for 200 to 5,000 employees, +10 per demo-page visit) | A person to write and maintain the rules | Transparent, easy to explain | Drifts as your market changes; inherits stale or blank CRM fields |
| Predictive (machine learning on CRM history) | A model learns which fields and behaviors preceded past conversions and scores new leads by similarity | Hundreds to thousands of historical leads with outcomes | Engagement and intent patterns specific to your funnel | New segments, new products, and leads with sparse records |
| Decision model on live web evidence | A model answers your rubric questions about the company against current web sources and returns probabilities | A written ICP rubric; no training data | Fit facts that are missing or out of date in the CRM; brand-new leads | Anything private to you, such as engagement and product usage |

Predictive scoring is the right default once you have volume, and it's the only approach of the three that learns from what actually closed for you. Its blind spot is the cold lead: a company filling in a form for the first time, with an email domain and little else.

## AI lead scoring tools compared

Seven widely used tools, described from their own documentation. Pricing is listed only where the vendor publishes it.

| Tool | Scoring approach | What it scores on | Data requirements | Published pricing |
| --- | --- | --- | --- | --- |
| HubSpot lead scoring | Manual fit and engagement scores; AI-built contact scores on Marketing Hub Enterprise | Contact, company, and deal properties and actions; letter-number grades (A1 to C3) | AI scores need at least 50 contacts, 25 converted and 25 not | Lead scoring on Marketing or Sales Hub Professional and Enterprise; Marketing Hub Enterprise from $3,600/mo |
| Salesforce Einstein Lead Scoring | Predictive model on your lead history; falls back to a global model built from anonymized data across Salesforce customers | Most standard and custom lead fields; reanalyzed every 10 days | 1,000 leads created and 120 converted in the last 200 days for your own model | Included in Performance and Unlimited; extra cost on Enterprise |
| Apollo | AI auto-scores plus custom scores | Your website, account information, and prospecting activity; Excellent, Good, Fair, Not a fit | Works from Apollo's database and your activity | AI scoring on paid plans; Basic from $49 per seat/mo billed yearly |
| Clay | Formula columns or a Claygent scoring agent that returns 1 to 100 with a rationale | Any enriched field, fit and engagement | Your tables plus enrichment providers | Launch from $167/mo billed yearly ($185 monthly) |
| 6sense | Predictive models (Predictive add-on) | Account profile fit from firmographics and technographics, intent, buying stage | Historical opportunity data | Quote-only |
| Demandbase | Machine-learning Qualification and Pipeline Predict scores | Firmographics, CRM and email activity, intent, website visits | Pipeline Predict needs opportunities from at least 50 distinct accounts in the past 12 months | Platform fee plus per-user fee; no list price |
| MadKudu | Fit and Likelihood to Buy combined into a Lead Grade (A to E) | Firmographic, demographic, and technographic data plus behavior across channels | Your CRM and engagement data | Not listed |

If you already run one of these, keep it for engagement and intent. The gap most teams feel is narrower: the fit fields that feed every one of these models (headcount, industry, who the buyer is, whether they're hiring) come from [enrichment](https://parallel.ai/articles/what-is-data-enrichment) snapshots that can be months old, and for a new lead they're often blank.

## Build an ICP fit score with the Decisions API

Parallel's [Decisions API](https://parallel.ai/products/decisions) takes shared context (the `state`, here a company and your ICP) and a map of named questions, searches the web once, and answers every question against that one set of evidence with citations. A `score` question is the natural shape for fit: you write an ordered rubric of 2 to 10 levels, and the API returns a probability for each level plus `score`, the probability-weighted mean of the zero-indexed levels. A Datadog `score` of 1.72 on a 0 to 3 rubric means "mostly partial fit, with a real chance of weak."

Pair the score with `choice` questions for the facts you route on, and give each one an `unknown` option. Parallel's docs recommend this because missing evidence isn't proof of "no." Any question can also come back as `{"type": "refusal"}`; the request still succeeds, and you should treat that answer as "needs review."

Our example ICP: "B2B SaaS company with 200 to 5,000 employees that sells primarily to software engineering teams and is hiring engineers in the United States."

```bash
curl -s https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "company": "Datadog",
      "website": "https://www.datadoghq.com",
      "our_icp": "B2B SaaS company with 200 to 5,000 employees that sells primarily to software engineering teams and is hiring engineers in the United States."
    },
    "questions": {
      "icp_fit": {
        "type": "score",
        "instructions": "How well does this company match our ideal customer profile (our_icp in state)?",
        "criteria": [
          "No fit: not a B2B software company.",
          "Weak fit: B2B software, but sells mainly to non-engineering buyers, or is far outside the size range.",
          "Partial fit: sells to engineering teams but misses the size range or US hiring, or sells to engineers only as a secondary buyer.",
          "Strong fit: B2B SaaS selling primarily to engineering teams, 200 to 5,000 employees, hiring engineers in the US."
        ]
      },
      "employee_band": {
        "type": "choice",
        "instructions": "How many employees does the company have today?",
        "criteria": {
          "under_200": "Fewer than 200 employees",
          "200_1000": "200 to 1,000 employees",
          "1001_5000": "1,001 to 5,000 employees",
          "over_5000": "More than 5,000 employees",
          "unknown": "The evidence does not establish current headcount."
        }
      },
      "primary_buyer": {
        "type": "choice",
        "instructions": "Who is the primary buyer of the company'"'"'s main product?",
        "criteria": {
          "engineering": "Software engineering, developer, DevOps, or platform teams",
          "sales_marketing": "Sales, marketing, or customer success teams",
          "hr_finance_ops": "HR, finance, or operations teams",
          "consumers": "Individual consumers",
          "unknown": "The evidence does not establish the primary buyer."
        }
      },
      "us_engineering_hiring": {
        "type": "choice",
        "instructions": "Is the company currently advertising software engineering roles based in the United States?",
        "criteria": {
          "yes": "Yes, it currently lists one or more US-based (or US-remote) software engineering roles.",
          "no": "No, it lists no US-based software engineering roles right now.",
          "unknown": "The evidence does not establish current US engineering openings."
        }
      }
    }
  }'
```

That request returned in 591 ms. Here's the response with probabilities rounded, the score `legend` removed, and citations cut to three of ten:

```json
{
  "answers": {
    "icp_fit": {"type": "score", "score": 1.72,
      "probabilities": {"0": 0.007, "1": 0.316, "2": 0.632, "3": 0.045}},
    "employee_band": {"type": "choice", "choice": "over_5000",
      "probabilities": {"under_200": 0.0, "200_1000": 0.0, "1001_5000": 0.014, "over_5000": 0.984, "unknown": 0.002}},
    "primary_buyer": {"type": "choice", "choice": "engineering",
      "probabilities": {"engineering": 0.968, "sales_marketing": 0.005, "hr_finance_ops": 0.007, "consumers": 0.0, "unknown": 0.019}},
    "us_engineering_hiring": {"type": "choice", "choice": "yes",
      "probabilities": {"yes": 0.606, "no": 0.045, "unknown": 0.348}}
  },
  "citations": [
    {"url": "https://finance.yahoo.com/quote/DDOG/profile/"},
    {"url": "https://investors.datadoghq.com/news-releases/news-release-details/datadog-joins-sp-500-index"},
    {"url": "https://en.wikipedia.org/wiki/Datadog"}
  ],
  "decision_id": "decisions_14c361f3cd1772a991ff270865e8ef01"
}
```

The score is the expected value of the rubric: 0 × 0.007 + 1 × 0.316 + 2 × 0.632 + 3 × 0.045 = 1.72. Datadog sells to engineers but reported about 8,100 employees at the end of 2025 in its 10-K, above our 5,000 cap, so "partial fit" is the right top level.

## A live run on seven companies

We sent the same four questions for Sentry, LaunchDarkly, PostHog, Datadog, Gusto, and Sweetgreen (company name and website in `state`), plus Linear twice: once with only its email domain and once with its name and website. Top answers and probabilities:

| Company | icp_fit (0 to 3) | employee_band | primary_buyer | us_engineering_hiring | Latency |
| --- | --- | --- | --- | --- | --- |
| Sentry | 2.96 | 200_1000 1.00 | engineering 0.99 | yes 0.98 | 566 ms |
| LaunchDarkly | 2.88 | 200_1000 1.00 | engineering 0.99 | unknown 0.56 | 611 ms |
| PostHog | 2.80 | 200_1000 0.89 | engineering 0.99 | yes 0.98 | 566 ms |
| Datadog | 1.72 | over_5000 0.98 | engineering 0.97 | yes 0.61 | 591 ms |
| Linear | 1.75 | under_200 0.99 | engineering 0.98 | unknown 0.71 | 536 ms |
| Gusto | 1.27 | 1001_5000 0.99 | hr_finance_ops 0.90 | yes 0.89 | 693 ms |
| Sweetgreen | 0.03 | over_5000 0.98 | consumers 0.99 | yes 0.51 | 584 ms |

The ranking is what a person would produce from this ICP: three developer-tool companies in the size range on top, Datadog and Linear in the middle for missing on size, Gusto lower because it sells to HR and finance, and a restaurant chain at zero. Headcount bands for Sentry, LaunchDarkly, Datadog, Gusto, and Sweetgreen match public filings or third-party trackers.

What it missed or overstated:

- **LaunchDarkly's hiring came back `unknown`.** Its Greenhouse board lists US-remote engineering roles. When we asked that single question with the board URL in `state`, it answered `yes` at 1.00 in 527 ms, citing the job postings. Hiring is the kind of fact to ask in its own request with a careers URL.
- **Linear's headcount band is overconfident.** It answered `under_200` at 0.99, but published estimates range from about 141 (PitchBook) to about 303 (LinkedIn). The sources disagree, and the model picked a side. Its `unknown` on US hiring was also cautious: Linear lists remote engineering roles open across North America.
- **Domain-only state pulled in noise.** With only `linear.app` and the ICP text in `state`, half the citations were generic articles about ICP frameworks and `primary_buyer` dropped to 0.84. Adding the company name and website fixed the retrieval. Pass the company name whenever you have it, and resolve ambiguous domains first (see [entity matching](https://parallel.ai/articles/entity-matching)).
- **PostHog sits on a boundary.** Trackers put it at roughly 213 to 234 people, so `200_1000` at 0.89 is right but close to the line. Rubric levels with hard numeric edges will always have leads near the edge.

## Combine the fit score with your engagement score

A web-grounded fit score doesn't know who opened your emails, and your engagement score doesn't know the company tripled in size. Keep both and combine them at routing time. This sketch maps the 0 to 3 fit score to letters, your existing 0 to 100 engagement score to numbers, and sends uncertain fit answers to review instead of guessing:

```python
def fit_grade(decision: dict) -> str:
    a = decision["answers"]
    fit = a["icp_fit"]
    if fit["type"] == "refusal":
        return "review"
    band = a["employee_band"]
    if band["type"] == "refusal" or band["choice"] == "unknown":
        return "review"
    top_level_p = max(fit["probabilities"].values())
    if top_level_p < 0.6:  # rubric is split between levels
        return "review"
    s = fit["score"]  # 0 = no fit, 3 = strong fit
    return "A" if s >= 2.5 else "B" if s >= 1.5 else "C"


def engagement_tier(engagement: int) -> str:
    # engagement: 0-100 from your CRM or predictive model
    return "1" if engagement >= 70 else "2" if engagement >= 30 else "3"


def route(decision: dict, engagement: int) -> str:
    g = fit_grade(decision)
    if g == "review":
        return "review"
    grade = g + engagement_tier(engagement)
    if grade in ("A1", "A2", "B1"):
        return "sales_now"
    if grade.startswith("A"):
        return "outbound_target"  # strong fit, not engaged yet
    if grade == "B2":
        return "nurture_sales_assist"
    return "nurture"
```

On our run, Sentry, LaunchDarkly, and PostHog grade A; Datadog and Linear grade B; Gusto and Sweetgreen grade C. An A3 lead (strong fit, no engagement) is the case predictive scoring tends to bury, because nothing about it looks like past converters yet.

Store the `decision_id` and citations next to the fit score so a rep can see why a lead got an A, re-score fit when a lead re-engages, and audit a sample of auto-routed leads every month. High probability is not the same as correct.

## Cost, speed, and when to use something else

Pricing is $1 per 1,000 requests with search included and up to 100 questions per request, so scoring 20,000 new leads a month costs about $20, or $40 if hiring gets its own request. Our nine calls returned in 527 to 693 ms, inside the 200 ms to 1 s Parallel publishes, and the default rate limit is 600 requests per minute, which is enough to score inline on form submit.

For a single strategic account where one wrong answer is expensive, use an LLM research agent or Parallel's [Task API](https://parallel.ai/products/task) instead. On PWS-Decisions, a 300-question set Parallel built and curated for difficulty (random guessing scores 42.4%), GPT-6 Luna with native web search scored 97.3% against the Decisions API's 76.2%, while Decisions ran about 13x faster at p50 for about 1/16 the cost. For a deeper qualify-and-route pattern on one inbound lead, see [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification).

## Frequently asked questions

**How do you use AI for lead scoring?** You use AI for lead scoring by splitting the score into fit and engagement, letting a predictive model learn engagement from your own conversion history, and scoring fit from current company facts. For new leads with no history, write your ICP as a 3 to 5 level rubric and have a decision model answer it against live web evidence, then route on both scores with a review queue for low-confidence answers.

**How is a lead score calculated?** A lead score is calculated either by summing points for attributes and actions (rules-based), by a machine-learning model that measures similarity to leads that converted before (predictive), or by a model that assigns probabilities to rubric levels from evidence (decision models). In the last case the score is the expected value: each level's index times its probability, summed.

**What is the best software for lead scoring?** The best software for lead scoring depends on your data. With thousands of historical leads in Salesforce or HubSpot, their built-in predictive scores learn from your own funnel. 6sense and Demandbase specialize in account-level intent. Clay and Apollo let you build custom scores on enriched data, and a web-grounded decision API scores fit on leads with no history.

**What is predictive lead scoring?** Predictive lead scoring is a machine-learning approach that analyzes your past leads, finds the fields and behaviors that preceded conversion, and scores new leads by how closely they resemble past converters. It needs volume: Salesforce Einstein needs 1,000 leads and 120 conversions in 200 days for an org-specific model, and HubSpot's AI scores need at least 50 contacts with 25 conversions.

**What is ICP scoring?** ICP scoring is a fit score that rates how closely a company matches your ideal customer profile on attributes like industry, size, buyer, region, and tech stack, independent of whether anyone there has engaged with you yet.

## Try it

Write your ICP as a four-level rubric and test it on ten recent leads in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests. The [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers the request format, and the [enrich and triage inbound leads cookbook](https://parallel.ai/blog/enrich-triage-inbound-leads-parallel-task-api) shows the deeper Task API version when you need full company profiles rather than scores.

Related reading: [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification) / [AI lead routing](https://parallel.ai/articles/ai-lead-routing) / [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [How to build an AI lead generation pipeline](https://parallel.ai/articles/how-to-build-an-ai-lead-generation-pipeline)

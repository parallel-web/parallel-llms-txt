# AI vendor validation: check security and compliance claims against the live web

AI vendor validation means checking what a supplier says about itself, such as SAML SSO, EU data residency, or a SOC 2 report, against current public sources before a reviewer spends time on it. This guide covers where AI fits in third-party risk management, what public evidence can and can't prove, a cited question pattern for the audit trail, and a live test on three SaaS vendors.

AI vendor validation checks a vendor's public claims (SAML SSO, EU data residency, SOC 2 or ISO 27001, a published subprocessor list, breach history) against current web sources, keeps the citations for the audit trail, and routes anything uncertain to a reviewer. It can't read the SOC 2 report itself, which vendors share under NDA, so a public claim is a screening signal, not proof that controls work. In our Nov 6, 2026 test, Parallel's Decisions API answered six requirement checks per vendor in 623 to 730 ms for $0.001 a request.

We build Parallel's Decisions API, so read the examples with that in mind. All outputs below are from live calls on Nov 6, 2026, including one it got wrong.

## Where AI fits in a third-party risk workflow

Third-party risk management (TPRM) follows roughly the same steps in most companies:

1. **Intake.** Someone wants to buy a tool. Procurement records the vendor, the data it will touch, and the business owner.
2. **Tiering.** The vendor gets an inherent risk tier based on data sensitivity, access, and spend. Low-tier vendors get a light check; high-tier vendors get full due diligence.
3. **Due diligence.** The security team sends a questionnaire (often a standard one like the Shared Assessments SIG or the CSA CAIQ), requests the SOC 2 report or ISO certificate, and reviews the answers.
4. **Remediation and contract.** Gaps become contract terms, compensating controls, or a rejection.
5. **Monitoring.** The vendor gets re-reviewed on a schedule, and someone is supposed to notice breaches, acquisitions, and changes in between.

AI helps most at the edges of that process. At intake and tiering, a quick check of public facts tells you whether a vendor can meet hard requirements before anyone sends a 200-question questionnaire. During due diligence, it lets a reviewer compare questionnaire answers with what the vendor publishes. In monitoring, it re-asks the same questions on a schedule so changes surface between annual reviews.

## What public sources can and can't tell you

Most enterprise SaaS vendors publish a trust center, security page, help-center articles, and a subprocessor list. Those are good evidence of what a vendor claims and offers. They are weak evidence of how well its controls operate.

| Requirement | Public evidence | What it shows | What it doesn't show |
| --- | --- | --- | --- |
| SAML SSO | Help-center setup guides, pricing pages | The feature exists and which plan includes it | Whether it works with your identity provider configuration |
| EU data residency | Data residency docs, region selection guides | An EU region exists and what data it covers | Exceptions, backups, support access, and AI subprocessors unless documented |
| SOC 2 Type II | Trust center badge, report request link, sometimes a public SOC 3 | The vendor says it has an attestation | Scope, period, exceptions, and the auditor's opinion, which are in the NDA report |
| ISO/IEC 27001 | Certificate on the trust center, certification body registry | A certificate was issued | Whether your service is in scope, unless you read the certificate |
| Subprocessors | Published subprocessor list | Who processes data and where | Whether the list is current |
| Breach history | Vendor disclosures, regulator actions, security press | Incidents that were reported | Incidents that weren't |

The table sets the job. A web-grounded check answers "what does the vendor publicly say, and where," with a link for each answer. A human still reads the report.

## The decision pattern: one question per requirement

A decision API fits this because the requirements are fixed and the answers are categorical:

- Use **noul** (a yes/no probability) for each binary requirement: "Does the vendor support SAML SSO?"
- Use **choice with an `unknown` option** whenever "we couldn't find it" must stay separate from "no." Parallel's docs are explicit that a low noul probability on missing evidence isn't proof of false. For EU residency we used eu_available, us_only, and unknown; for SOC 2 we used type_ii, type_i_only, no_claim, and unknown.
- Treat a **refusal** (`{"type": "refusal"}`) as a review item, never as a fail or a pass.
- Keep the **citations**. The Decisions API returns request-level citations (URLs plus the excerpts used) that cover all answers in the call, not one citation per answer. Store them with the decision ID so an auditor can see what the system read.
- Send every low-probability answer, every `unknown`, and every high-tier vendor to **human review**.

## A live run on three SaaS vendors

We sent one request per vendor with six questions and the same state: an enterprise buyer in Germany that needs SAML SSO, EU data residency, and a SOC 2 Type II report. Here is the request, cut to three of the six questions:

```bash
curl -s https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "vendor": "Miro",
      "website": "https://miro.com",
      "requirements": "Enterprise buyer in Germany needs SAML SSO, EU data residency, and a SOC 2 Type II report."
    },
    "questions": {
      "saml_sso": {"type": "noul", "instructions": "Does Miro support SAML single sign-on?"},
      "eu_data_residency": {
        "type": "choice",
        "instructions": "Can a customer choose to store Miro customer content in the EU?",
        "criteria": {
          "eu_available": "The vendor documents an EU data residency or EU hosting option customers can choose.",
          "us_only": "The vendor states customer data is hosted only outside the EU.",
          "unknown": "The evidence does not establish where customer data can be hosted."
        }
      },
      "soc2_claim": {
        "type": "choice",
        "instructions": "What does Miro publicly claim about SOC 2?",
        "criteria": {
          "type_ii": "The vendor publicly states it has a SOC 2 Type II report or attestation.",
          "type_i_only": "The vendor publicly states only a SOC 2 Type I report.",
          "no_claim": "The vendor makes no SOC 2 claim or says it has none.",
          "unknown": "The evidence does not establish what the vendor claims."
        }
      }
    }
  }'
```

The other three questions asked whether the vendor states ISO/IEC 27001 certification, whether it publishes a subprocessor list, and whether it has disclosed a security incident affecting customer data since January 2022. Results, with the top answer and its probability:

| Question | Notion | Miro | LastPass |
| --- | --- | --- | --- |
| saml_sso (noul) | 1.00 | 1.00 | 1.00 |
| eu_data_residency | eu_available 1.00 | eu_available 1.00 | eu_available 0.97 |
| soc2_claim | type_ii 1.00 | type_ii 1.00 | type_ii 1.00 |
| iso_27001_claim (noul) | 1.00 | 0.95 | 1.00 |
| subprocessor_list (noul) | 1.00 | 0.97 | 0.99 |
| security_incident_since_2022 | no_known_incident 0.50 | unknown 0.60 | unknown 0.55 |
| Latency | 623 ms | 730 ms | 644 ms |

The documentation questions came back confident and cited the right pages: Notion's security page, SAML configuration guide, trust center, and its ISO 27001 announcement; Miro's SSO and data residency help articles and trust center; LastPass's SSO product page and trust center. Two details a reviewer would add: Notion's data residency help page describes residency as an Enterprise plan option arranged through the account team, and Miro's help center lists the EU as its default region with data centers in Ireland and Germany. Plan and scope details like these are why the check feeds a reviewer rather than replacing one.

The incident question is where the run went wrong. LastPass disclosed in December 2022 that an attacker copied a backup of customer vault data, and the UK Information Commissioner's Office fined LastPass UK £1.2 million for that breach in 2025. The six-question request answered unknown at 0.55. All six questions shared one retrieval, and that retrieval went to LastPass's product and trust pages, which is right for five questions and wrong for the sixth.

When we asked the incident question in its own request, it answered yes_disclosed with 0.999 in 663 ms, citing LastPass's own incident notices, the ICO fine coverage, and a June 2026 TechCrunch report of a separate incident involving support-case data. Two lessons follow. Split news and incident questions from documentation questions, because they need different sources. And never read "no known incident" as "no incident": Notion's answer was a near coin flip between no_known_incident and unknown, which belongs in review.

## A public SOC 2 claim isn't proof

A trust-center badge tells you the vendor says it has a SOC 2 report. It doesn't tell you what the report says. A SOC 2 Type II report is an auditor's opinion on whether controls were designed and operated effectively over a period, commonly six to twelve months; a Type I report covers design at a single point in time. The details that matter for risk (which systems are in scope, the audit period, the exceptions the auditor found, and the complementary controls the customer is expected to run) are only in the full report, which vendors share under NDA, typically through a trust-center request.

What a web check can do is narrow the field: confirm the vendor claims a Type II report, find the request link, and flag vendors that make no claim at all. A reviewer still has to obtain and read the report, check that the audit period is recent, and note exceptions. ISO/IEC 27001 is similar: confirm the certificate's scope and validity with the certification body rather than trusting the logo.

## Building the audit trail

For each vendor check, store enough to answer an auditor's question months later: what was asked, what came back, what the system read, and who signed off.

```python
import datetime
import json
import os

import requests


def check_vendor(vendor: str, website: str, questions: dict) -> dict:
    r = requests.post(
        "https://api.parallel.ai/v1/decisions",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={"state": {"vendor": vendor, "website": website}, "questions": questions},
        timeout=30,
    )
    r.raise_for_status()
    d = r.json()
    needs_review = []
    for name, a in d["answers"].items():
        if a["type"] == "refusal":
            needs_review.append(name)
        elif a["type"] == "choice":
            top = a["choice"]
            if top == "unknown" or a["probabilities"][top] < 0.9:
                needs_review.append(name)
        elif a["type"] == "noul" and 0.1 < a["noul"] < 0.9:
            needs_review.append(name)
    return {
        "vendor": vendor,
        "checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "decision_id": d["decision_id"],
        "questions": questions,
        "answers": d["answers"],
        "citations": [c["url"] for c in d["citations"]],
        "needs_review": needs_review,
        "reviewed_by": None,
    }


if __name__ == "__main__":
    docs_questions = json.load(open("vendor_questions.json"))
    print(json.dumps(check_vendor("Miro", "https://miro.com", docs_questions), indent=2))
```

Run the documentation questions and the incident question as two requests per vendor, and write both records to the vendor's file.

## Cost and cadence

At $0.001 per request, two requests per vendor (documentation and incidents) cost $0.002. A portfolio of 2,000 vendors re-checked monthly costs $4 a month. That makes it reasonable to re-check every vendor every month instead of only the top tier once a year, and to alert the owner when an answer changes. For alerting on change without polling, Parallel's Monitor API is built for that pattern.

## Alternatives and when to use them

| Approach | Good at | Trade-off |
| --- | --- | --- |
| TPRM platforms and questionnaire exchanges | Workflow, questionnaires, report collection, approvals | Vendor-supplied answers; public facts still need checking |
| Security rating services | Outside-in scans of internet-facing infrastructure | Measures exposure, not documented features or claims |
| LLM agent with web search | Open-ended research on one vendor | Seconds to minutes per vendor; harder to threshold consistently |
| Parallel Task API | Structured research with many fields per vendor | Asynchronous, more per vendor |
| Web-grounded decision API | Fixed requirements, cited, sub-second, $0.001 per request | Only answers the questions you ask; shared retrieval can miss niche evidence |

For a single high-stakes vendor, an LLM research agent is the more accurate choice. On Parallel's 300-question PWS-Decisions set, which Parallel built and curated for difficulty (random guessing scores 42.4%), GPT-6 Luna with native web search scored 97.3% against Decisions' 76.2%; Decisions was about 13x faster at p50 and about 1/16 the cost. Use decisions for the hundreds or thousands of vendors you need to screen and re-check, and deeper research for the few that matter most.

## Frequently asked questions

**What is AI vendor validation?** AI vendor validation is the use of AI to check a supplier's claims (security features, certifications, data residency, breach history) against public sources before or alongside a human security review. Web-grounded versions cite the pages they relied on, which makes the result usable in an audit trail.

**Can AI verify a vendor's SOC 2 compliance?** No. AI can confirm that a vendor publicly claims a SOC 2 Type II report and find where to request it, but the report's scope, period, and exceptions are only in the document itself, which vendors share under NDA. A reviewer has to read it.

**How does AI help third-party risk management?** AI helps at intake (screening hard requirements before a questionnaire goes out), during due diligence (comparing questionnaire answers with public documentation), and in monitoring (re-asking the same questions on a schedule so changes and incidents surface between reviews). It doesn't replace the risk decision.

**What should happen when the answer is unknown?** Send it to a person. Unknown means the evidence the system found doesn't settle the question. In our test, "no known incident" for a vendor with a well-documented 2022 breach was the clearest example of why.

## Try it

Pick three vendors from your current review queue and run your hard requirements in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests. The [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers question types and refusals, and the free `web_decisions` tool in [Parallel MCP](https://parallel.ai/mcp) lets you try a check from an AI assistant without an account: "Use Parallel Decisions to check whether Miro supports SAML SSO and EU data residency."

Related reading: [AI fact-checking API](https://parallel.ai/articles/ai-fact-checking-api) / [KYB](https://parallel.ai/learn/kyb) / [Citations API](https://parallel.ai/learn/citations-api) / [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api)

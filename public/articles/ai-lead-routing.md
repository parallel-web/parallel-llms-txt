# AI lead routing: fill the fields your lead routing software routes on

Lead routing software decides which rep gets each inbound lead, but it can only route on the region, segment, and account fields it is given, and those are often blank or out of date when a new lead arrives. This guide covers routing methods, how the main routing tools compare, where AI fits, and a working lead routing API step tested on six real companies.

AI lead routing works best as a step before your routing tool, not a replacement for it. Lead routing software (LeanData, Chili Piper, Default (default.com), RevenueHero, LeadAngel, or native Salesforce and HubSpot assignment) handles matching, territories, round robin, scheduling, and audit logs, but it routes on fields like region, employee band, and parent account, which are often empty or stale for a new inbound lead. A web-grounded decision call can fill those fields from current sources when the lead arrives, in about 0.6 seconds for $0.001 per lead, and hand anything uncertain to a review queue.

Parallel isn't a lead routing tool, and this article doesn't pitch it as one. We build Parallel's Decisions API, the step that fills routing fields, so weigh our examples with that in mind. Every API result below comes from calls we ran on Nov 6, 2026.

## What is lead routing?

Lead routing assigns each new lead to the right owner, team, or queue by consistent rules. Inbound lead routing covers form fills, demo requests, chat, and signups, where response time matters most. The common methods:

- **Round robin.** Leads rotate evenly across a pool of reps. Simple and fair, blind to fit.
- **Weighted round robin.** Same rotation, but some reps get a larger share, for example senior reps or reps with open capacity.
- **Territory-based.** Leads go to the rep who owns a region, country, or state, often combined with segment (SMB, mid-market, enterprise).
- **Account-based.** A lead that belongs to an account you already own or target goes to that account's owner. This depends on lead-to-account matching.
- **Skill-based.** Leads go to reps with a matching skill: language, product line, or industry.

Most teams stack these: existing account first, then territory and segment, then round robin inside the team.

## What lead routing software does

Native CRM tools cover the basics. Salesforce lead assignment rules evaluate rule entries in order against fields on the lead and assign the first match to a user or queue; only one lead assignment rule can be active at a time. HubSpot's "Rotate record to owner" workflow action rotates records across users or teams and requires Sales Hub or Service Hub Professional or Enterprise.

Dedicated lead routing software adds lead-to-account matching, visual builders, capacity rules, SLA tracking, scheduling on the form, and audit logs. Here is how five tools and two native options describe themselves, checked against each vendor's own pages on Nov 6, 2026:

| Tool | What it routes on | CRMs | Published pricing |
| --- | --- | --- | --- |
| LeanData | Lead-to-account matching; round robin, territory, and account-based assignment; SLA tracking and escalations on higher tiers; runs as a managed package inside Salesforce | Salesforce | Not published; based on features, objects, and number of Salesforce users or queues |
| Chili Piper | Form, chat, and handoff routing; territories in one assignment table; round robin with weighting, caps, and meeting limits; matches visiting companies to Salesforce accounts | Salesforce, HubSpot | Growth from $15,000 a year (15 seats); Scale from $42,000 a year (30 seats) |
| Default (default.com) | Queues with round robin, availability, recency, or capacity policies; person and company matching; built-in enrichment waterfall; versioned rule changes | Salesforce, HubSpot | Growth $12,000 a year plus $540 per routing seat a year; Enterprise $25,000 a year |
| RevenueHero | Qualification on form and enriched values; round robin or custom logic; domain-based matching, with fuzzy and custom-property matching on Enterprise | HubSpot, Salesforce, Zoho, Attio | From $25 per user a month plus a $79 monthly platform fee |
| LeadAngel | Two-way lead-to-account matching; round robin and weighted round robin; parent or ultimate parent account lookup; SLA re-routing | Salesforce, Microsoft Dynamics 365, HubSpot | Not published |
| Salesforce assignment rules | Field criteria on the lead record, evaluated in order; assigns to a user or queue | Salesforce | Built into Salesforce |
| HubSpot Rotate record to owner | Round robin across selected users or teams inside a workflow | HubSpot | Requires Sales Hub or Service Hub Professional or Enterprise |

Several of these tools also enrich leads from data providers before routing (Default, RevenueHero, and LeanData list enrichment), and many expose APIs or webhooks: LeanData documents a Matching and Round Robin API, and Default routes product signups by API or webhook. Pick one on how it handles your territories, CRM, and scheduling. The rest of this article is about the fields those tools read.

## Where routing breaks: missing and stale inputs

Routing rules are deterministic. If the lead says Germany and 2,000+ employees, the rule sends it to the EMEA enterprise team every time. The failures come from the inputs:

- **Blank fields.** Short forms ask for an email and little else. Country, headcount, and industry are empty unless something fills them.
- **Stale fields.** Enrichment snapshots age. Companies grow, shrink, rename, and change owners.
- **Hidden relationships.** A lead from audi.de or github.com doesn't share a domain with the Volkswagen Group or Microsoft account in your CRM, so a domain match misses that it belongs to an existing customer.
- **Regional entities.** Toyota Motor North America sits in Plano, Texas, while its parent is in Japan. Route on the wrong entity and the lead lands in the wrong territory.

All four are data problems, and none of them requires changing your routing rules.

## Where AI fits in lead routing

There are two places to put a model. One is the assignment logic, letting a model pick the rep, which makes routing harder to audit, and for most teams the rules were never the weak part. The other is the routing inputs: ask a model a small set of fixed questions about the company, get typed answers with probabilities, write those to CRM fields, and let your existing rules assign the lead. That keeps routing explainable, because every field has a value, a probability, and the sources behind it.

A web-grounded decision API such as [Parallel's Decisions API](https://parallel.ai/products/decisions) fits the second job. You send shared context (the `state`, here the company name and email domain) and a few named questions; it searches the live web once, answers every question against the same evidence, and returns typed answers plus request-level citations. Each `choice` question returns the picked option and a probability for every option, so low-confidence answers are easy to catch. If you also need to decide whether a lead is worth routing at all, that is qualification, covered in [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification), and prioritizing among qualified leads is [AI lead scoring](https://parallel.ai/articles/ai-lead-scoring). For building the list of target accounts in the first place, see [how to build an AI lead generation pipeline](https://parallel.ai/articles/how-to-build-an-ai-lead-generation-pipeline).

## A lead routing API step you can run

This script asks three routing questions in one request (headquarters region, employee band, and whether the company belongs to one of your existing customer accounts) and returns a queue name your routing tool can act on. Auto-route only when the answers clear a floor; otherwise send the lead to a review queue.

```python
import json, os, sys
import requests

# Accounts you already sell to. Keys become owner queues in your routing tool.
CUSTOMER_ACCOUNTS = {
    "microsoft": "Microsoft Corporation and its subsidiaries",
    "volkswagen_group": "Volkswagen AG (Volkswagen Group) and its brands and subsidiaries",
    "unilever": "Unilever PLC and its brands and subsidiaries",
    "toyota": "Toyota Motor Corporation and its regional subsidiaries",
}

QUESTIONS = {
    "region": {
        "type": "choice",
        "instructions": "Where is the company named in state headquartered? If it is a regional subsidiary, use that subsidiary's own headquarters, not its parent's.",
        "criteria": {
            "north_america": "United States or Canada",
            "emea": "Europe, Middle East, or Africa",
            "apac": "Asia-Pacific, including Australia, Japan, and India",
            "latam": "Mexico, Central or South America",
            "unknown": "The evidence does not establish where it is headquartered",
        },
    },
    "employee_band": {
        "type": "choice",
        "instructions": "How many employees does the company named in state have today? Count the named company itself, not its parent group.",
        "criteria": {
            "under_200": "Fewer than 200 employees",
            "200_1999": "200 to 1,999 employees",
            "2000_plus": "2,000 or more employees",
            "unknown": "The evidence does not establish headcount",
        },
    },
    "existing_customer_parent": {
        "type": "choice",
        "instructions": "Is the company named in state currently owned by, or a brand or division of, one of our existing customer accounts? Answer for ownership as of today.",
        "criteria": {
            **CUSTOMER_ACCOUNTS,
            "none": "Not owned by, and not a brand or division of, any account listed above",
            "unknown": "The evidence does not establish ownership",
        },
    },
}

SEGMENTS = {"under_200": "smb", "200_1999": "mid_market", "2000_plus": "enterprise"}


def top(answer, floor):
    """Top choice if it clears the floor and isn't 'unknown'; refusals return None."""
    if answer["type"] != "choice":
        return None
    pick = answer["choice"]
    if pick == "unknown" or answer["probabilities"][pick] < floor:
        return None
    return pick


def route_fields(company, email_domain):
    r = requests.post(
        "https://api.parallel.ai/v1/decisions",
        headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
        json={"state": {"company": company, "email_domain": email_domain}, "questions": QUESTIONS},
        timeout=10,
    )
    r.raise_for_status()
    d = r.json()
    a = d["answers"]

    parent = top(a["existing_customer_parent"], 0.9)
    region = top(a["region"], 0.8)
    band = top(a["employee_band"], 0.8)

    if parent and parent != "none":
        queue = f"account_owner:{parent}"  # existing account team
    elif top(a["existing_customer_parent"], 0.8) == "none" and region and band:
        queue = f"{region}:{SEGMENTS[band]}"  # e.g. emea:mid_market
    else:
        queue = "routing_review"  # a person checks the citations

    return {
        "routing_queue": queue,
        "region": region,
        "segment": SEGMENTS.get(band),
        "customer_parent": a["existing_customer_parent"].get("choice"),
        "decision_id": d["decision_id"],
        "evidence_urls": [c["url"] for c in d.get("citations", [])][:5],
    }


if __name__ == "__main__":
    print(json.dumps(route_fields(sys.argv[1], sys.argv[2]), indent=2))
```

Run it with `python3 route_inbound.py Pleo pleo.io`. On Nov 6, 2026 that returned `emea:mid_market` in 540 ms, citing Pleo's own site and legal pages. The thresholds are deliberately asymmetric: claiming a lead for an existing account team takes 0.9, because a wrong account match sends a stranger to an account executive who will notice; territory routing takes 0.8.

## How to wire it into inbound routing

The pattern is the same in any stack:

1. **Trigger on form submit.** Your form tool, CRM workflow, or routing tool calls a webhook with the company name and email domain. Skip free email domains and known accounts that already have clean data.
2. **Call the Decisions API.** One request per lead with your routing questions. Latency on our runs was 540 to 739 ms, so it fits inline before the lead reaches a rep.
3. **Write the fields to the CRM.** Store region, segment, customer parent, the routing queue, the `decision_id`, and the evidence URLs on the lead record.
4. **Let the routing tool assign.** Your existing rules read the new fields and assign the owner.
5. **Audit a sample.** Check a few auto-routed leads a week against the citations and tune the floors.

## Live results on six inbound leads

We ran the three questions above on six real companies, with six customer accounts in the list (the four in the script plus LVMH and Nestlé). Top answers and the queue the script would assign:

| Lead | Region | Employee band | Customer parent | Queue | Latency |
| --- | --- | --- | --- | --- | --- |
| GitHub (github.com) | north_america 1.00 | 2000_plus 0.96 | microsoft 0.98 | account_owner:microsoft | 739 ms |
| Audi (audi.de) | emea 1.00 | 2000_plus 0.86 | volkswagen_group 0.96 | account_owner:volkswagen_group | 572 ms |
| Toyota Motor North America (toyota.com) | north_america 0.99 | 2000_plus 0.84 | toyota 0.96 | account_owner:toyota | 601 ms |
| Ben & Jerry's (benjerry.com) | north_america 1.00 | 200_1999 0.90 | none 0.82 | north_america:mid_market | 596 ms |
| Canva (canva.com) | apac 0.92 | 2000_plus 0.43 | none 0.90 | routing_review | 688 ms |
| Pleo (pleo.io) | emea 0.98 | 200_1999 0.98 | none 0.82 | emea:mid_market | 591 ms |

Ben & Jerry's is the case that matters. Unilever owned it for years, so a parent-account field set in 2024 would send this lead to the Unilever team. Unilever completed the demerger of its ice cream business, now The Magnum Ice Cream Company, on Dec 6, 2025, keeping a 19.85% minority stake. The API answered "none" with 0.82 and put 0.16 on Unilever, citing Magnum's own brand page. Here is that response, trimmed to the ownership answer and three of its ten citations:

```json
{
  "answers": {
    "existing_customer_parent": {
      "type": "choice",
      "choice": "none",
      "probabilities": {"microsoft": 0.001, "volkswagen_group": 0.001, "unilever": 0.156, "lvmh": 0.001, "toyota": 0.0, "nestle": 0.001, "none": 0.817, "unknown": 0.024}
    }
  },
  "citations": [
    {"url": "https://corporate.magnumicecream.com/en/brands/ben-jerrys.html", "title": "Ben & Jerry's | The Magnum Ice Cream Company"},
    {"url": "https://www.reuters.com/sustainability/boards-policy-regulation/ben-jerrys-co-founder-expects-corporate-conflict-continue-under-new-ownership-2025-10-08"},
    {"url": "https://www.bcorporation.net/en-us/find-a-b-corp/company/ben-and-jerrys/"}
  ],
  "decision_id": "decisions_b6a097b6e57cdd06bda36041f1496f3c",
  "_elapsed_ms": 596
}
```

We also passed the stale value in on purpose, adding `"crm_parent_account": "Unilever (last enriched 2024)"` to the state. The answer held: none at 0.86, Unilever 0.12 (609 ms).

What didn't go cleanly:

- **Canva's headcount came back uncertain.** It picked 2,000+ at only 0.43, with 0.41 on unknown, so the lead went to review. Every estimate we found puts Canva well over 2,000. Asking the headcount question alone with Canva's about page in the state returned 2,000+ at 0.90 (605 ms). Questions that need a specific source do better in their own request.
- **Ben & Jerry's employee band is unconfirmed.** It picked 200 to 1,999 at 0.90, and we couldn't find a current company-reported figure to check it against. That lead auto-routed to a mid-market queue on an answer we can't verify, which is why the audit step exists.
- **"None" answers carry lower probabilities.** The three subsidiaries matched at 0.96 to 0.98; the three non-customers came back at 0.82 to 0.90.

## Lead to account matching with web evidence

Lead to account matching connects a new lead to an account already in your CRM, so account-based routing can send it to the owner. Routing tools use domain matching, fuzzy name matching, and parent-account lookups, which handle most leads. The cases it can't settle are the ones where the relationship isn't in your data: a brand with its own domain (GitHub and Microsoft), a regional entity (Toyota Motor North America), or an ownership change (Ben & Jerry's).

A `choice` question with your customer accounts as options settles those directly, and a choice question accepts up to 255 options. For larger account lists, narrow first: use your routing tool's fuzzy match or a domain lookup to pull a short list of candidate accounts, then ask about those. For pairwise checks ("is company X a subsidiary or brand of account Y?") and how to treat parents versus subsidiaries in your data model, see [entity matching](https://parallel.ai/articles/entity-matching).

## When rules are enough

If the lead matches an account already in your CRM with clean, recent data, skip the API call. Rules on known fields are free, instant, and deterministic. Use the decision step for missing or stale fields, unfamiliar domains, and periodic re-checks of parent-account fields.

Cost is per request: $1 per 1,000 requests with search included, up to 100 questions per request. A team with 5,000 net-new inbound leads a month pays about $5 to fill routing fields for every one. In a demo Parallel ran at launch, 500 inbound leads were routed in under 9 seconds for about $0.50, and 97% of the leads routed without review landed in the right segment.

## Frequently asked questions

**What is lead routing?** Lead routing is the process of assigning each new lead to the right rep, team, or queue based on rules such as territory, company size, existing account ownership, or round robin. It's usually automated with CRM assignment rules or dedicated lead routing software.

**What is the best lead routing software?** The best lead routing software depends on your CRM and motion. LeanData runs inside Salesforce and centers on lead-to-account matching; Chili Piper, Default, and RevenueHero pair routing with scheduling and support HubSpot and Salesforce; LeadAngel also supports Microsoft Dynamics 365; native rules cover simple cases. All of them route on the fields you give them.

**What is a lead routing API?** A lead routing API is an endpoint you call from a form handler or workflow to get a routing answer back. Some routing tools expose one for matching and assignment, such as LeanData's Matching and Round Robin API. A decisions API like Parallel's plays a different role: it fills the routing inputs (region, segment, customer parent) from live web evidence, and your routing tool then assigns the owner.

**How does AI lead routing handle uncertain answers?** It shouldn't guess. Each answer comes with probabilities, so you set a floor (we used 0.8 for territory and 0.9 for existing-account matches) and send anything below it, plus any refusal, to a review queue with the citations attached. In our six-lead run, one lead went to review, and a focused follow-up question resolved it.

## Try it

Run your last ten inbound leads through the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests, with your own regions, segments, and customer accounts as options. The [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers the request format. To test from an AI assistant first, the free `web_decisions` tool in [Parallel MCP](https://parallel.ai/mcp) needs no key: ask it to "use Parallel Decisions to check whether Ben & Jerry's is owned by Unilever today."

Related reading: [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification) / [Entity matching](https://parallel.ai/articles/entity-matching) / [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [Enrich and triage inbound leads with the Task API](https://parallel.ai/blog/enrich-triage-inbound-leads-parallel-task-api)

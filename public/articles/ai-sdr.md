# AI SDR: what it does, what it costs, and how to build one on live web data

An AI SDR takes over the prospecting half of a sales development rep's job, and buyers and builders both find that its results depend on the research underneath the emails. This guide covers what AI SDRs do, what packaged tools cost, and how to build the five research steps yourself with Parallel's APIs, using outputs from a real run.

An AI SDR is software that does the prospecting work of a sales development representative: it finds accounts that fit your ideal customer profile, checks whether they qualify, researches what's happening at each one, and drafts the first message. Most products also send the email and handle replies. Done well, it gives a human seller a short list of accounts with a reason to reach out now. Done badly, it sends thousands of templated emails that nobody answers.

We build Parallel's web APIs, which power the build section of this guide, so weigh that. Vendor prices come from each vendor's own pricing page, checked on Nov 22, 2026. Every API output shown below comes from a run we did the same day, including the result it got wrong.

## What an AI SDR does

An SDR's day splits into research work and conversation work. AI SDR products automate both, but the research work decides whether the conversations happen at all.

| SDR task | What the AI SDR does | Parallel API for the step |
| --- | --- | --- |
| Build a target list | Finds companies that match the ICP from public sources | FindAll (or Entity Search for a fast first pass) |
| Qualify accounts | Checks each account against rubric questions | Decisions |
| Research before reaching out | Writes a short, cited brief per account | Task |
| Watch for timing | Flags funding, hires, launches, and expansions as they happen | Monitor |
| Write the first touch | Drafts an email from the brief | Any LLM, with the brief as context |
| Send, follow up, book | Runs sequences, handles replies, books meetings | Your sequencing tool or a packaged AI SDR |

Users who have tried the packaged tools tend to say the same thing. In a [widely read r/SaaS thread](https://www.reddit.com/r/SaaS/comments/1iea3x3/has_anyone_found_an_ai_sdr_that_actually_works/) on whether any AI SDR works, the top replies describe most tools as "fancy email writers" and say the value is upstream: lead sourcing, timing, and knowing who to talk to before writing anything. The first four rows of the table are that upstream work, and they're the part this guide shows you how to build.

## What AI SDR tools cost

Pricing models differ enough that list prices are hard to compare. Two vendors publish a number you can plan around:

| Product | Published price | What the price covers |
| --- | --- | --- |
| AiSDR | $1.50 per person prospected, pay as you go; fully managed service $2,500 a month | Lead research, list building, AI-written multichannel sequences, mailbox warmup and deliverability monitoring |
| Salesforce Agentforce | $2 per conversation, or $500 per 100,000 Flex Credits | Agentforce agents, including the SDR agent, inside Salesforce |

Other vendors size plans through sales. Artisan, for example, describes credit-based plans scoped to lead volume, mailboxes, and dialer seats. AiSDR's pricing page gives a useful benchmark for expectations: 1 to 3 meetings per 100 cold prospects, based on its customers' history.

**Buy** a packaged AI SDR when you want sending infrastructure, mailbox warmup, and reply handling in one product and your ICP is easy to describe with standard filters. **Build** the research layer when your targeting depends on facts a contact database doesn't hold (a specific hiring pattern, a regulatory filing, a technology migration), when you already run sequences in Outreach, Salesloft, or HubSpot and want better inputs, or when you sell an AI SDR yourself and need the data layer.

## The build: five steps on live web data

The pipeline below is the one we ran. The example ICP is a vendor selling to companies that are building out an outbound team: US B2B software companies that raised a Series B in 2026 and have an open SDR or BDR role.

1. Find accounts that match the ICP with FindAll.
2. Qualify each one against a rubric with Decisions.
3. Research the accounts that pass with the Task API.
4. Watch qualified accounts for trigger events with Monitor.
5. Draft outreach from the brief, and keep a person on the send button.

All five calls use the same `x-api-key` header. Get a key from the [Parallel platform](https://platform.parallel.ai/); new accounts get up to $80 in free credits plus $5 a month with a card on file.

## Step 1: find accounts with FindAll

[FindAll](https://docs.parallel.ai/findall-api/findall-quickstart) takes a plain-language objective and a list of match conditions, generates candidates from the web, and checks every candidate against every condition. Each match comes back with the evidence it used.

```python
import os, time, requests

API = "https://api.parallel.ai"
HEADERS = {"x-api-key": os.environ["PARALLEL_API_KEY"]}

run = requests.post(f"{API}/v1beta/findall/runs", headers=HEADERS, json={
    "objective": "FindAll US B2B software companies that announced a Series B "
                 "round in 2026 and currently have open SDR or BDR job postings",
    "entity_type": "companies",
    "match_conditions": [
        {"name": "series_b_2026",
         "description": "Company announced a Series B funding round in 2026."},
        {"name": "b2b_software_us",
         "description": "Company sells B2B software and is headquartered in the United States."},
        {"name": "hiring_sdrs",
         "description": "Company currently has an open job posting for a Sales "
                        "Development Representative (SDR) or Business Development "
                        "Representative (BDR)."},
    ],
    "generator": "base",
    "match_limit": 10,
}).json()

run_id = run["findall_id"]
while requests.get(f"{API}/v1beta/findall/runs/{run_id}",
                   headers=HEADERS).json()["status"]["is_active"]:
    time.sleep(15)

result = requests.get(f"{API}/v1beta/findall/runs/{run_id}/result", headers=HEADERS).json()
accounts = [c for c in result["candidates"] if c["match_status"] == "matched"]
```

Our run took about 16 minutes and returned nine matches: DOSS, Miter, Spade, RemotePass, Mintlify, Kalepa, Warp, Ivo, and Vendelux. On the `base` generator that cost $0.25 per run plus $0.03 per match, so $0.52. Each condition came back with a value, citations, and a confidence level. For Warp, the hiring condition returned "Sales Development Representative, open; posted 2026-11-03" with a link to the Ashby posting, and the funding condition returned "2026-06-25, Series B." Both match Warp's $60 million Series B, [reported by Axios on June 25](https://www.axios.com/pro/all-deals/2026/06/25/warp-60-million-workday-rippling).

One match was wrong. RemotePass passed the US-headquarters condition, but its [own Series B announcement](https://newsroom.remotepass.com/265841-remotepass-raises-17-4m-series-b-led-by-ebrd-venture-capital-as-global-employment-and-fintech-converge) is datelined London, and the role FindAll found is a BDR for the UK and Ireland. FindAll marked that condition "medium" confidence. Route medium-confidence matches to a person, or add a second check in step 2, before anyone writes to the account.

If you only need a rough list in seconds, [Entity Search](https://docs.parallel.ai/findall-api/entity-search) returns up to 1,000 ranked companies or people per request for $5 per 1,000 requests, without the per-condition checks.

## Step 2: qualify each account with Decisions

The [Decisions API](https://docs.parallel.ai/decisions/decisions-quickstart) answers named questions about one entity from web evidence and returns typed answers: a probability for a yes/no question, a pick from your options, or a score on your rubric. Up to 100 questions share one request at $1 per 1,000 requests.

```python
QUESTIONS = {
    "segment": {
        "type": "choice",
        "instructions": "Who does this company mainly sell to? "
                        "Select unknown when evidence is insufficient.",
        "criteria": {
            "smb": "Mostly small businesses under 50 employees.",
            "mid_market": "Mostly companies with 50 to 1,000 employees.",
            "enterprise": "Mostly companies with over 1,000 employees.",
            "unknown": "The evidence does not establish the customer segment.",
        },
    },
    "outbound_motion": {
        "type": "score",
        "instructions": "How mature is this company's outbound sales motion today?",
        "criteria": [
            "No evidence of a sales development team.",
            "One to three SDRs or BDRs, or the first SDR hire is open now.",
            "An established SDR or BDR team with a manager or multiple open roles.",
        ],
    },
    "crm": {
        "type": "choice",
        "instructions": "Which CRM does this company's sales team use? "
                        "Select unknown when public evidence is insufficient.",
        "criteria": {
            "salesforce": "Public evidence shows the sales team uses Salesforce.",
            "hubspot": "Public evidence shows the sales team uses HubSpot.",
            "other": "Public evidence shows another CRM.",
            "unknown": "Public evidence does not establish the CRM.",
        },
    },
}

for account in accounts:
    decision = requests.post(f"{API}/v1/decisions", headers=HEADERS, json={
        "state": {"company": account["name"], "website": account["url"]},
        "questions": QUESTIONS,
    }).json()
    account["qualification"] = decision["answers"]
    account["sources"] = [c["url"] for c in decision["citations"]]
```

Each call took between 0.48 and 0.87 seconds. Here's what came back for the nine accounts:

| Account | Segment | Outbound maturity (0 to 2) | CRM (probability) |
| --- | --- | --- | --- |
| Warp | Mid-market | 1.64 | Salesforce (0.80) |
| Miter | Mid-market | 1.42 | Salesforce (0.62) |
| Kalepa | Enterprise | 1.32 | HubSpot (0.99) |
| Ivo | Enterprise | 1.67 | Unknown |
| Mintlify | Enterprise | 1.35 | Unknown |
| DOSS | Enterprise | 1.30 | Unknown |
| RemotePass | Mid-market | 1.23 | Unknown |
| Vendelux | Mid-market | 1.21 | Unknown |
| Spade | Enterprise | 1.19 | Unknown |

The CRM question taught us something. Our first version asked a yes/no question, "Does this company use Salesforce?", and every account came back between 0.08 and 0.42. Read as a yes/no, that says none of them use Salesforce. The choice version with an `unknown` option showed what was really going on: two accounts have public evidence of Salesforce, one of HubSpot, and six have no public evidence either way. A low probability on a yes/no question often means missing evidence, not a "no." When the difference matters for routing, give the model an `unknown` option.

Each answer type maps straight to a rule. A seller targeting mid-market Salesforce teams would work Warp and Miter first, put the six unknowns in a lower tier, and skip Kalepa. For more on rubric design, see our guides to [AI lead scoring](https://parallel.ai/articles/ai-lead-scoring) and [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification).

## Step 3: research each account with the Task API

A qualified account still needs a reason to reach out. The [Task API](https://docs.parallel.ai/task-api/task-quickstart) researches across many pages and returns the fields you define in a JSON schema, with citations for each field.

```python
BRIEF_SCHEMA = {
    "type": "object",
    "properties": {
        "what_they_sell": {"type": "string",
            "description": "One sentence on the product and who buys it"},
        "recent_trigger": {"type": "string",
            "description": "The most recent concrete event (funding, launch, exec hire, "
                           "expansion) in the last 120 days, with its date"},
        "sales_team_signal": {"type": "string",
            "description": "What public job postings or announcements say about their "
                           "sales development team right now"},
        "likely_priority": {"type": "string",
            "description": "The go-to-market priority these facts suggest for the next two quarters"},
        "opening_line": {"type": "string",
            "description": "A one-sentence, factual opening line for a cold email to their "
                           "VP of Sales that cites the trigger. No flattery."},
    },
    "required": ["what_they_sell", "recent_trigger", "sales_team_signal",
                 "likely_priority", "opening_line"],
    "additionalProperties": False,
}

task = requests.post(f"{API}/v1/tasks/runs", headers=HEADERS, json={
    "input": {"company": "Kalepa", "website": "https://kalepa.com/"},
    "processor": "core",
    "task_spec": {"output_schema": {"type": "json", "json_schema": BRIEF_SCHEMA}},
}).json()

brief = requests.get(f"{API}/v1/tasks/runs/{task['run_id']}/result",
                     headers=HEADERS, params={"timeout": 600}).json()
print(brief["output"]["content"])
for field in brief["output"]["basis"]:
    print(field["field"], [c["url"] for c in field["citations"]])
```

Here's the brief our run returned for Kalepa, after 3 minutes on the `core` processor:

| Field | Output | Confidence |
| --- | --- | --- |
| what_they_sell | Kalepa sells professional-grade AI software that automates and orchestrates insurance workflows and decisions for carriers, MGAs, reinsurers, and program administrators. | High |
| recent_trigger | On November 17, 2026, Kalepa announced a five-year partnership with Columbia Insurance to apply its AI platform across Columbia's underwriting operations. | High |
| sales_team_signal | A public Greenhouse posting seeks a Business Development Representative for Kalepa's Sales organization to develop and qualify territory-based opportunities, grow presence with insurance carriers, MGAs, and mutual insurers, and generate new business through target-account plans and outreach. | Medium |
| likely_priority | Accelerate commercial expansion: Kalepa says the Series B will fund a broader AI product suite, entry into new markets, and a doubled workforce in 2027; its BDR posting points to building qualified pipeline across carriers, MGAs, and mutual insurers. | Medium |
| opening_line | On November 17, Kalepa announced a five-year partnership with Columbia Insurance for its underwriting operations; is expanding your insurer pipeline a priority as you build on that momentum? | Medium |

We checked the trigger against [Kalepa's announcement](https://kalepa.com/news-posts/columbia-insurance-selects-kalepa-professional-grade-ai), and it's accurate. The brief also picked the Columbia deal over Kalepa's $75 million Series B on Nov 5, because we asked for the most recent event. The first half of the opening line is specific and checkable. The second half is a generic question, and that's where a person's edit adds the most.

Core runs can take several minutes, and one of our two briefs outlasted a 10-minute blocking request. In production, register a [webhook](https://docs.parallel.ai/task-api/webhooks) for task completion instead of holding a connection open.

The `core` processor costs $25 per 1,000 runs, so 2.5 cents per brief. `base` ($10 per 1,000) is enough for simpler briefs; test both on 20 of your own accounts and compare.

## Step 4: watch accounts for trigger events with Monitor

Research goes stale. The [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) runs a query on a schedule and sends a webhook when something new matches it, so the agent reaches out when a trigger happens instead of on a fixed cadence.

```python
monitor = requests.post(f"{API}/v1/monitors", headers=HEADERS, json={
    "type": "event_stream",
    "frequency": "1d",
    "processor": "lite",
    "settings": {"query": "Warp (warp.co, AI-native payroll and HR software) announces "
                          "a new VP or head of sales, a new sales office, a pricing "
                          "change, or a major customer win"},
    "webhook": {"url": "https://your-app.example.com/hooks/parallel",
                "event_types": ["monitor.event.detected"]},
    "metadata": {"account": "warp.co", "owner": "sdr-agent"},
}).json()
```

Monitors are priced per check, from $3 per 1,000 on `lite`, so a daily monitor on one account costs about 9 cents a month. Write one narrow monitor per account and per trigger rather than a broad query across your whole market. When an event fires, pass its content and `event_id` to a new Task run as `previous_interaction_id`, and the [follow-up task](https://docs.parallel.ai/monitor-api/monitor-task) refreshes the brief with the event's context carried forward. Our guide to [sales trigger events](https://parallel.ai/articles/how-to-monitor-sales-trigger-events-that-actually-convert) covers which triggers tend to convert.

This is the pattern [Actively](https://parallel.ai/blog/case-study-actively) runs in production. Its per-account agents use the Task API for an account's slow-changing facts and set narrow, account-specific monitors for the facts that would change the account's status, across hundreds of thousands of accounts. Actively's customers report 23% higher win rates and 2x conversion rates.

## Step 5: draft the email, and keep a person on send

By this point the drafting is the easy part. Give any LLM the brief, the citations, and your rules, and ask for a short first touch.

```python
DRAFT_PROMPT = """Write a cold email of under 90 words to the VP of Sales at {company}.
Use only facts from the brief below, and don't state anything the brief doesn't support.
Open with the trigger. Connect it to one problem we solve: {value_prop}.
End with a single, low-effort question. No flattery, no exclamation marks.

Brief (JSON, with sources):
{brief}
"""
```

Two rules keep this from turning into the templated email users complain about. First, the model can only use facts that carry a citation, so a reviewer can check any claim in one click. Second, a person approves the first touch on every high-value account. Lower tiers can go straight into a sequence once the reviewer trusts the output.

Parallel doesn't supply email addresses or phone numbers. Pair the pipeline with your contact data provider for the last mile, or use Entity Search to find people by role in a professional context and look up their contact details elsewhere.

## What the run cost

| Step | Unit price | Our run |
| --- | --- | --- |
| FindAll, `base` generator | $0.25 per run + $0.03 per match | $0.52 for 9 accounts |
| Decisions | $1 per 1,000 requests | $0.009 for 9 accounts, 3 questions each |
| Task API, `core` processor | $25 per 1,000 runs | $0.025 per brief |
| Monitor, `lite` | From $3 per 1,000 checks | About $0.09 per account per month, checked daily |

The research layer for an account comes to well under a dollar. That number isn't comparable to a packaged AI SDR's per-contact price, which also covers contact data, sending infrastructure, deliverability, and reply handling. The comparison that matters is between the research your current tool does and the research your ICP needs.

## FAQ

### What is an AI SDR?

An AI SDR is software that automates a sales development rep's prospecting work: building target lists, qualifying accounts, researching them, writing first-touch outreach, and often sending sequences and handling replies.

### Will AI replace SDRs?

AI SDRs replace much of the research and first-draft writing. Teams that use them well still put people on qualification calls, high-value accounts, and anything that needs judgment. One setup that works is a person reviewing and approving what an agent prepares, across far more accounts than they could research alone.

### How much does an AI SDR cost?

Published prices include AiSDR at $1.50 per person prospected and Salesforce Agentforce at $2 per conversation. Many vendors quote annual plans sized by contact volume. Building the research layer yourself costs well under a dollar per account in API usage, but you still need contact data and a way to send.

### Do AI SDRs work?

They work when the research underneath is specific to your ICP and current. Most complaints describe generic, templated emails. AiSDR's own benchmark is 1 to 3 meetings per 100 cold prospects.

### Can I build my own AI SDR?

Yes. The research steps (find, qualify, research, monitor) are API calls, as shown above. Most teams keep their existing sequencing tool for sending and feed it accounts and briefs from the pipeline.

Related reading: [How to automate prospecting with AI search and research APIs](https://parallel.ai/articles/how-to-automate-prospecting-with-ai-search-and-research-apis) / [AI lead generation pipeline](https://parallel.ai/articles/how-to-build-an-ai-lead-generation-pipeline) / [AI lead routing](https://parallel.ai/articles/ai-lead-routing) / [How we enrich and triage inbound leads](https://parallel.ai/blog/enrich-triage-inbound-leads-parallel-task-api)

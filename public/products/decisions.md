Decisions API

# Decisions grounded in the live web

Fast classification grounded in live web data. Ask about your own context or anything on the web, and every answer comes back with citations.

[Get started](https://platform.parallel.ai/play/decisions)[View docs](https://docs.parallel.ai/decisions/decisions-quickstart)

100

: max questions per call, all from one search

<1s

: typical response time

$1

: per 1,000 requests

### Better decisions grounded in the live web

The Decisions API searches the web in real-time to answer questions training data alone can’t.

### Batch up to 100 questions in a single call

Batch up to 100 related questions with shared context in a single request. Get an answer to each for the cost of one call, helping you scale enrichment and other high-volume workflows.

### Automate with confidence backed by evidence

Every answer carries a probability, and every response carries its citations. Automate above a threshold you choose and send the rest to a person with the evidence attached.

Benchmarks

## Best-in-class accuracy on web-grounded decisions

PWS-Decisions is an open-source benchmark composed of 300 closed-ended questions whose answers depend on current, niche, or scattered facts on the web. Every answer is confirmed by independent research and a direct source, and every system is scored by exact match. On JevBench, where the answer sits in the input, all three systems score about the same.

[Learn more](https://parallel.ai/blog/pws-decisions-benchmark)[Dataset](https://huggingface.co/datasets/parallel-web/pws-decisions-benchmark)[Code](https://github.com/parallel-web/pws-decisions-benchmark)

| Benchmark | Parallel Decisions | OpenAI Decisions | TypeSafe Jev |
| --- | --- | --- | --- |
| PWS-Decisions (300 questions, live web) | 76.2% | 41.7% | 33.4% |
| JevBench (231 questions, answer in input) | 89.6% | 90% | 88.3% |

Exact-match accuracy. Source: PWS-Decisions benchmark, November 2026.

Use Cases

## Turn everyday decisions into automated workflows

Finance

## Perpetual KYB

A bank rechecked 426 public companies for changes to addresses, officers, and status in under 10 seconds for $0.85\. 98% of the flags held up on review.

[Try it free](https://platform.parallel.ai/play/decisions)

GTM

## Lead routing

500 inbound leads were classified by segment in under 9 seconds for about $0.50\. 97% of the auto-routed leads landed in the right segment.

[Try it free](https://platform.parallel.ai/play/decisions)

Not sure where the Decisions API fits for your team? [Try this demo](https://webjev-use-cases.paralleldemos.com/)

Quickstart

## Try one call

Send state and named questions with your API key in the x-api-key header. Each answer comes back typed, with a probability, and the response lists the citations behind it.

state: 

Shared context for every question, such as a page or a company

questions: 

Up to 100 named questions that share one retrieval

type: 

noul for yes or no, choice for a fixed set of options, score for an ordered rubric

instructions: 

The question itself, in plain language

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "page": "https://parallel.ai/blog/decisions-api",
      "note": "Thinking fast, but checking first."
    },
    "questions": {
      "is_this_real": {
        "type": "noul",
        "instructions": "Has Parallel announced a Decisions API?"
      },
      "has_anyone_noticed": {
        "type": "noul",
        "instructions": "Has this blog post been submitted to Hacker News?"
      }
    }
  }'
```

```python
import os
import requests

r = requests.post(
    "https://api.parallel.ai/v1/decisions",
    headers={"x-api-key": os.environ["PARALLEL_API_KEY"]},
    json={
        "state": {"company": "Clay", "website": "https://www.clay.com"},
        "questions": {
            "has_cli": {
                "type": "noul",
                "instructions": "Does the company offer an official CLI?",
            }
        },
    },
    timeout=30,
)
r.raise_for_status()
answer = r.json()["answers"]["has_cli"]
print("refusal" if answer["type"] == "refusal" else answer["noul"])
```

```typescript
const res = await fetch("https://api.parallel.ai/v1/decisions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.PARALLEL_API_KEY!,
  },
  body: JSON.stringify({
    state: { company: "Clay", website: "https://www.clay.com" },
    questions: {
      has_cli: {
        type: "noul",
        instructions: "Does the company offer an official CLI?",
      },
    },
  }),
});
if (!res.ok) throw new Error(`${res.status}`);
const answer = (await res.json()).answers.has_cli;
console.log(answer.type === "refusal" ? "refusal" : answer.noul);
```

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

Pricing

## $1 per 1,000 requests

A request can carry up to 100 questions, and they all share one retrieval, so a CRM row costs the same whether you fill one column or ten. Start with 5,000 free requests in the playground.

Per request: 

$0.001

Questions per request: 

Up to 100

Free to start: 

5,000 requests

## FAQs

* **What counts as a request?**  
One request is one state and the questions you send with it, up to 100\. However many questions you batch, it’s billed as one request at $1 per 1,000.
* **What question types are there?**  
Each question has a name you choose, a type, and instructions in plain language. noul answers yes or no with a probability, choice picks one option from a fixed set, and score rates against an ordered rubric. See [question types](https://docs.parallel.ai/decisions/question-types).
* **How do citations work?**  
Every response lists the sources behind it, each with a URL and the excerpts used, so you can audit any result before you act on it.
* **What happens when the web doesn’t have an answer?**  
A question can come back as a refusal instead of a guess. It’s still a successful response, so check each answer’s type before you read its value.
* **Can I use it from an agent?**  
Yes. It’s the web\_decisions tool in the [Parallel MCP server](https://docs.parallel.ai/integrations/mcp/quickstart#web%5Fdecisions), free to use without an account. Sign in or add an API key for higher limits.
* **When should I use the Task API instead?**  
Use the [Task API](/products/task) for open-ended research or long-form output. The Decisions API is for closed questions with a fixed answer space, answered in under a second.

## Start building

Get 5,000 free requests in the Developer Platform or dive into the documentation.

[Developer Platform](https://platform.parallel.ai/play/decisions) [Docs](https://docs.parallel.ai/decisions/decisions-quickstart)

Agent onboarding prompt:

Use curl or web fetch to read parallel.ai/agents.md and follow it to set up Parallel

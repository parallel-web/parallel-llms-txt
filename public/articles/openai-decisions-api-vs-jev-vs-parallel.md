# OpenAI Decisions API vs Jev vs Parallel: a head-to-head comparison

OpenAI Decisions API vs Jev comes down to price, limits, and how each model was built, and Parallel adds a third option that searches the web before it decides. This comparison covers launch dates, endpoints, question types, limits, a worked cost example, benchmark results with their caveats, calibration, and a live call.

OpenAI's Decisions API and TypeSafe's Jev both answer typed questions about input you supply, and both are cheap: Jev costs $0.042 per million input tokens and OpenAI $0.10, with no output charge on either. OpenAI allows up to 400 questions per request and adds prompt caching, JSON input, and GPT-Live integration; Jev offers up to 255 options per choice and a model trained specifically for calibrated decisions. Parallel's Decisions API is the one of the three that searches the live web and cites sources, at $1 per 1,000 requests with up to 100 questions each.

We build Parallel's Decisions API, so weigh that. Facts about OpenAI and TypeSafe come from their documentation and announcements, checked on November 6, 2026.

## Side-by-side specs

| Feature | OpenAI Decisions API | TypeSafe Jev | Parallel Decisions API |
| --- | --- | --- | --- |
| Launch | Preview Sep 29, beta Oct 6, GA Oct 22, 2026 | Sep 15, 2026 (1.14 on Oct 14) | Oct 25, 2026 |
| Endpoint | POST api.openai.com/v1/decisions | POST api.typesafe.ai/v1/systemone | POST api.parallel.ai/v1/decisions |
| Auth | Bearer token | Bearer token | x-api-key header |
| Models | gpt-6-luna only | jev-1.14.0 (jev-latest), jev-1.13.0 | No model choice; mode fast |
| Input field | input: text, messages, tool outputs, JSON, images | state: text, object, or images | state: text, JSON, or a URL |
| Question types | predicate, choice, score | noul, choice, score, box | noul, choice, score |
| Question naming | Array, name on each, answers in order | Object keyed by name | Object keyed by name |
| Questions per request | 1 to 400 | No fixed cap within context limits | 1 to 100 |
| Options per choice | Not stated in the guide | Up to 255 | 2 to 255 |
| Score levels | Not stated in the guide | Up to 10 | 2 to 10 |
| Context | Long-context pricing applies; no limit stated in the guide | 64K per request, 32K per question | 32K estimated tokens per question, including state |
| Web search | No (pass your own tool outputs) | No | Yes, one shared retrieval per request |
| Citations | No | No | Yes, URL and excerpts per request |
| Price | $0.10 per 1M input tokens | $0.042 per 1M input tokens | $1 per 1,000 requests |
| Output tokens | Free | Free | Not billed |
| Caching | Prompt caching, cache writes charged | Not documented | Not applicable |
| Also on | OpenRouter | OpenRouter, Cloudflare Workers AI | OpenRouter (parallel/decisions-fast) |

A few differences in that table matter more than they look.

**Naming.** OpenAI calls a yes/no question a `predicate` and takes the questions as an array; Jev and Parallel call it a `noul` and take an object keyed by the names you choose. Jev and Parallel share a request shape, so moving between them is mostly a matter of swapping the endpoint and adding or removing the `model` field. Moving from OpenAI means renaming fields: `choices` with `value` and `description` become a `criteria` object, and score `levels` become a `criteria` list.

**Images.** OpenAI's image support is part of the GA API, including images inside individual question instructions. Jev supports images in 1.13 and 1.14 behind an experimental header, and 1.14 adds the `box` type for locating objects.

**Where evidence comes from.** OpenAI and Jev answer from what you send. OpenAI's design makes it easy to pass your own search results in as tool outputs. Parallel fetches the evidence itself and tells you which pages it used.

## Pricing with a worked example

Take 1,000 company records. For each one you ask 5 questions, and each record comes with a 1,500-token state (a company profile from your CRM). Assume each question's instructions and options are about 60 tokens.

On OpenAI and Jev, you send one request per record with all 5 questions. The state is billed once per request, so each request is 1,500 + (5 x 60) = 1,800 input tokens, and 1,000 requests total 1.8M input tokens.

- **Jev:** 1.8M x $0.042 per 1M = **$0.076**
- **OpenAI:** 1.8M x $0.10 per 1M = **$0.18**. Prompt caching wouldn't help here, because each record's state is different and caching discounts a repeated prefix.
- **Parallel:** 1,000 requests x $0.001 = **$1.00**. The 5 questions share one request and one retrieval, so token counts don't change the price.

If the answers are in the CRM record, Jev is about 13x cheaper than Parallel and OpenAI about 5.6x cheaper. Use them.

Now suppose the questions need current outside facts, such as whether the company is hiring or has added a product. With OpenAI or Jev, you run your own search and fetch for each record and pass the text in. If that adds 8,000 tokens of page text per record, each request becomes 9,800 tokens, or 9.8M tokens in total:

- **Jev:** 9.8M x $0.042 per 1M = **$0.41**, plus your search and fetch costs
- **OpenAI:** 9.8M x $0.10 per 1M = **$0.98**, plus your search and fetch costs
- **Parallel:** still **$1.00**, with search included and citations returned

One mistake to avoid on token-priced models: sending one request per question. Five requests of one question each bill the 1,500-token state five times. Group questions about the same record into one request. Parallel's docs give the same advice for a different reason: grouped questions share one set of evidence.

## Accuracy: it depends on where the answer lives

### When the answer is in the input

On a 231-question JevBench set Parallel ran (answer in the input, no web lookup needed), the three systems landed within two points of each other:

| System | JevBench set (231 questions, answer in input) |
| --- | --- |
| OpenAI Decisions API | 90.0% |
| Parallel Decisions API | 89.6% |
| TypeSafe Jev | 88.3% |

OpenAI is highest. The name "JevBench" is used by several independent projects whose scores don't carry across, and Parallel hasn't documented which release or subset these 231 questions come from, so treat it as a rough parity check.

Third-party leaderboards measure the same answer-from-input skill and don't include Parallel. On the Artificial Analysis Decision Index (November 5, 2026 snapshot of 23 models), Jev 1.14 ranks 10th at 57.1 and GPT-6 Luna (Decisions) ranks 21st at 48.5. The index averages five evaluations, including hallucination resistance and tool-calling decisions, so it measures something broader than the JevBench set above.

### When the answer is on the web

Parallel built PWS-Decisions to test this case: 300 closed-ended questions about dated public-web facts, curated for difficulty by removing questions that every tested provider answered correctly. A uniform random guess scores 42.4%. OpenAI and Jev ran on their native endpoints with the same state and choices but no supplied web context, which is how those endpoints work by default.

| System | PWS-Decisions (300 questions, mean of 3 runs) | p50 latency | Cost per 1,000 questions |
| --- | --- | --- | --- |
| Parallel Decisions API | 76.2% | 0.56 s | $1.00 |
| OpenAI Decisions API, no web context | 41.7% | not reported | $0.023 |
| TypeSafe Jev 1.14, no web context | 33.4% | not reported | $0.019 |
| GPT-6 Luna with native web search (Responses API) | 97.3% | 7.42 s | $16.52 |

Both decision models score near or below the random-guess baseline, which says they can't know facts that postdate their training rather than that they reason badly. The last row is the fair comparison: GPT-6 Luna with required web search scored 97.3% against Parallel's 76.2%. Parallel was about 13x faster at p50 and cost about 1/16 as much. Choose Parallel when a decision runs on every record or inside an agent loop where latency and cost add up; choose an LLM research agent, or Parallel's Task API, when a single hard question needs the highest accuracy.

## Calibration

All three return probabilities, so you can set thresholds and route uncertain cases to review. How each gets there differs.

**Jev** is trained with RLCD (Reinforcement Learning for Calibrated Decisions), and TypeSafe doesn't fine-tune it per customer. Its docs list known weak spots for 1.13: arithmetic, counting, and reading dates written as text. Calibration only covers what the model can know, though. In Parallel's launch demo, asked whether Parallel supports EU data residency (launched October 14, 2026), `jev-1.14.0` said no with probability 0.86 and no sources. Parallel's Decisions API said yes with probability 1.00, citing Parallel's announcement and docs.

**OpenAI** built the endpoint by reconfiguring GPT-6 Luna rather than training a separate calibrated decision model, according to TechCrunch's October 22 coverage. Choice and score answers include a `confidence` field next to the probability distribution.

**Parallel** returns a probability for each answer plus the evidence it used. Its docs warn that a low `noul` on missing evidence is not proof the statement is false; if you need an explicit "unknown", use a choice question with an `unknown` option. The live call below shows what that looks like.

## A live call: a fact that changed in October

We asked Parallel's Decisions API two questions about the OpenAI Decisions API itself. Both answers changed on October 22, 2026, when OpenAI moved the API from public beta to GA and raised the limit from 200 to 400 questions per request.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {"product": "OpenAI Decisions API", "vendor": "OpenAI",
              "endpoint": "POST https://api.openai.com/v1/decisions"},
    "questions": {
      "is_generally_available": {"type": "noul",
        "instructions": "Is the OpenAI Decisions API generally available today, rather than in limited preview or public beta?"},
      "max_questions_per_request": {"type": "choice",
        "instructions": "What is the current maximum number of questions per request in the OpenAI Decisions API?",
        "criteria": {
          "up_to_100": "Up to 100 questions per request.",
          "up_to_200": "Up to 200 questions per request.",
          "up_to_400": "Up to 400 questions per request.",
          "unknown": "The evidence does not establish the current limit."
        }}
    }
  }'
```

It returned in 617 ms (decision_id `decisions_41c050414e9e2c325c1fecb9a61ab9fb`). Citations are trimmed from nine to four:

```json
{
  "mode": "fast",
  "answers": {
    "is_generally_available": {"type": "noul", "noul": 0.8408},
    "max_questions_per_request": {
      "type": "choice",
      "choice": "up_to_400",
      "probabilities": {"up_to_100": 0.0043, "up_to_200": 0.0078, "up_to_400": 0.9774, "unknown": 0.0105},
      "confidence": 0.9698
    }
  },
  "usage": {"input_tokens": 3078, "output_tokens": 0},
  "citations": [
    {"url": "https://searchenginewatch.com/openai-decisions-api-general-availability-400-questions/"},
    {"url": "https://x.com/OpenAIDevs/status/2113346645463081418"},
    {"url": "https://x.com/OpenAIDevs/status/2105003318917697873"},
    {"url": "https://www.sanity.io/glossary/openai-decisions-api"}
  ]
}
```

Both answers are right. The limit answer is confident because every recent source says 400. The GA answer is less certain, 0.84, because the retrieved evidence mixes the October GA coverage with older pages from September and early October that still describe a limited preview. That's the behavior you want from a calibrated decision: with a 0.9 threshold this record would go to review, and the citations show a reviewer why. A model answering from training data alone couldn't know about either change.

## Which one to pick

| Pick | When |
| --- | --- |
| OpenAI Decisions API | You already have the evidence, you want up to 400 questions per call, you reuse a long shared prefix that caching can discount, or you need images, JSON input, conversation history, or GPT-Live voice integration |
| TypeSafe Jev | You already have the evidence, cost per token is the main driver, you need many-option choices or the box type, or you want a model trained only for calibrated decisions |
| Parallel Decisions API | The answer depends on current facts on the public web, you need citations for review or audit, and the decision runs at volume or inside an agent loop where sub-second latency matters |

The choice isn't exclusive. A common pattern is to answer in-input questions with OpenAI or Jev, then send only the questions about the outside world to Parallel. All three return probabilities, so one set of thresholds can route the results.

## Frequently asked questions

**Is Jev cheaper than the OpenAI Decisions API?** Yes. Jev costs $0.042 per million input tokens and OpenAI $0.10, so the same workload costs about 2.4x more on OpenAI before caching. OpenAI's prompt caching can narrow that gap when many requests share a long identical prefix.

**Can the OpenAI Decisions API or Jev search the web?** No. Both answer from the input you send. OpenAI accepts tool-call outputs as input, so you can run a search tool and pass the results in. Parallel's Decisions API runs the search itself and returns citations.

**Are the OpenAI and Jev request formats compatible?** Not directly. OpenAI uses `input` and a `questions` array with `predicate`, `choice`, and `score` types. Jev uses `state` and a `questions` object keyed by name, with `noul` for yes/no questions. Parallel uses Jev's shape, so code written for Jev moves to Parallel with an endpoint and header change.

**Which is most accurate?** It depends on the task. With the answer in the input, OpenAI, Parallel, and Jev scored within two points on a 231-question JevBench set Parallel ran, with OpenAI highest. On questions about recent web facts, Parallel scored 76.2% on Parallel's own PWS-Decisions set, while the other two, without web context, scored 41.7% and 33.4%. An LLM agent with web search scored higher than all three, at higher latency and cost.

## Try it

Rerun the call above in the [Decisions playground](https://platform.parallel.ai/play/decisions), which comes with 5,000 free requests, or start from the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). Developers already on OpenRouter can call `parallel/decisions-fast` next to OpenAI and Jev models with one key.

Related reading: [OpenAI Decisions API alternatives](https://parallel.ai/articles/openai-decisions-api-alternatives) / [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [Testing Jev](https://parallel.ai/blog/testing-jev) / [Decision model pricing](https://parallel.ai/articles/decision-model-pricing)

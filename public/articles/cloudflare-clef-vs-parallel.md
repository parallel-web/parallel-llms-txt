# Cloudflare Clef vs. Parallel Decisions: edge decisions or web-grounded answers

Cloudflare Clef and Parallel's Decisions API both return typed, probability-scored answers, but one decides from the input you send and the other checks the live web first. This comparison covers Clef's models, prices, and limits, how Clef stacks up against Jev, whether Clef can use web search, and a Workers pattern that runs Clef and Parallel in the same request.

Cloudflare Clef is a family of open-weight decision models on Workers AI that answer from the state you pass in: Clef (27B) costs $0.24 per 1M input tokens, Clef-flash (9B) costs $0.038, and Clef-omni adds audio and video at $0.15. Parallel's Decisions API searches the live web for every request and returns cited answers for $1 per 1,000 requests, with up to 100 questions per request. Use Clef when the answer is already in your data. Use Parallel when it has to come from the web, and call both from the same Worker when a workflow needs each.

We build Parallel's Decisions API, so weigh that. For decisions over text, images, or recordings you already have, Clef is faster, cheaper, and self-hostable, and nothing below argues otherwise. Facts here come from Cloudflare's docs, changelog, and Hugging Face model cards as of November 6, 2026.

## What Cloudflare Clef is

Cloudflare launched Clef and Clef-flash on [October 1, 2026](https://developers.cloudflare.com/changelog/post/2026-10-01-clef-workers-ai/), the first models trained by its Workers AI team. Like TypeSafe's Jev, they don't generate text. You send a `state` and named questions of three types (`noul` for yes/no, `choice` for one option from a set, `score` for an ordered rubric), and Clef returns a probability for every allowed answer.

On [October 9](https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/), Cloudflare added Clef-omni, cut Clef-flash from $0.090 to $0.038 per 1M input tokens, reduced Clef-flash's hosted context from 64K to 24K tokens, and said Clef now returns decisions up to 2x faster. On October 19 it added [Clairic](https://developers.cloudflare.com/changelog/post/2026-10-19-clairic-workers-ai/), a preview extraction model that returns values such as totals and dates rather than choosing among options.

- **Clef** (`@cf/cloudflare/clef`): post-trained from Qwen3.8-27B, 65,536-token context, $0.24 per 1M input tokens.
- **Clef-flash** (`@cf/cloudflare/clef-flash`): post-trained from Qwen3.5-9B, 24,576-token hosted context (the weights support 256K if you self-host), $0.038 per 1M input tokens.
- **Clef-omni** (`@cf/cloudflare/clef-omni`): a 30B mixture-of-experts model with 3B active parameters, 64,000-token context, $0.15 per 1M input tokens, and audio and video input.

All three model pages list zero data retention and no charge for output tokens. Each request takes 1 to 64 questions, 2 to 255 options per `choice`, and 2 to 10 levels per `score`, according to the [input schema](https://developers.cloudflare.com/workers-ai/models/clef/). Clef and Clef-flash accept up to four embedded images; Clef-omni adds up to four audio clips and two videos. You call them through the Workers AI binding (`env.AI.run()`) or the REST API at `/ai/run`, optionally through AI Gateway. The Clef and Clef-flash weights are on Hugging Face under Apache 2.0, and their model cards show an SGLang server that answers Jev-style `POST /v1/systemone` requests.

Workers AI bills in Neurons and includes 10,000 Neurons per day at no charge on both Free and Paid plans. At Cloudflare's listed conversion of 3,455 Neurons per 1M Clef-flash tokens, that's roughly 2.9M Clef-flash input tokens a day, or about 458K on Clef ([pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)).

## Clef vs. Jev vs. Parallel Decisions at a glance

|  | Clef-flash | Clef | Jev (TypeSafe) | Parallel Decisions |
| --- | --- | --- | --- | --- |
| Where the answer comes from | Your input | Your input | Your input | Live web search per request |
| Price | $0.038 / 1M input tokens | $0.24 / 1M input tokens | $0.042 / 1M input tokens | $1 / 1,000 requests, search included |
| Cost of 1,000 requests at 1,000 tokens | $0.038 | $0.24 | $0.042 | $1.00 |
| Questions per request | 1-64 | 1-64 | No fixed cap within context | 1-100 |
| Options per choice | 2-255 | 2-255 | Up to 255 | 2-255 |
| Hosted context | 24,576 tokens | 65,536 tokens | 64K per request, 32K per question | 32,000 tokens per question |
| Inputs | Text, JSON, up to 4 images | Text, JSON, up to 4 images | Text, JSON, experimental images | Text, JSON, URLs |
| Citations | No | No | No | Yes, URLs and excerpts per request |
| Open weights | Yes, Apache 2.0 | Yes, Apache 2.0 | No | No |
| Runs on | Workers AI or your GPUs | Workers AI or your GPUs | TypeSafe API, OpenRouter, Workers AI | Parallel API, MCP, OpenRouter |
| Vendor latency figure | 38.8 ms median | 209.3 ms median at launch | 524.1 ms median in Cloudflare's test | 200 ms to 1 s |

The Clef and Jev latencies are from Cloudflare's October 1 changelog. Jev's number is a round trip over the internet from Cloudflare's lab to TypeSafe's API, while Clef ran on Cloudflare's own serving stack, so the comparison isn't like-for-like. Parallel's range is from its pricing page and includes the web search.

## Where Clef is the better choice

Most decisions in a Worker don't need the web. Is this ticket urgent, which team owns it, does this upload violate policy, should the agent call this tool? The answer is in the request, and Clef wins on every axis that matters there.

- **Price.** At 1,000 tokens per request, Clef-flash costs $0.038 per 1,000 requests, about 26 times less than Parallel's $1. The free daily allocation covers small workloads entirely.
- **Latency.** Clef-flash's published median is 38.8 ms, and Clef-omni text requests take about 20 ms per Cloudflare. A web search can't come back that fast.
- **Edge placement.** Clef runs on GPUs across Cloudflare's network, so a Worker can put a decision in the request path without leaving Cloudflare.
- **Open weights.** Apache 2.0 weights mean you can self-host, run Clef-flash at 256K context on your own hardware, or keep data inside your infrastructure. Cloudflare also offers RL fine-tuning through a design-partner program.
- **Media.** Clef reads images, and Clef-omni reads audio and video directly. Parallel's Decisions API takes text, JSON, and URLs.

## Where Parallel Decisions fits

Clef has no web access. Ask it whether a vendor holds SOC 2, which plan includes SSO, or whether a company changed its pricing this month, and it returns a probability based only on the text you sent. Parallel's Decisions API retrieves one shared set of web evidence per request, answers every question against it, and returns the URLs and excerpts it used. That's the job for procurement checks, KYB refreshes, lead qualification, and fact-checking claims against current sources.

Here's a vendor check of the kind a Worker would hand off after Clef routes a ticket, run live on November 6, 2026. Each question uses a `choice` with an `unknown` option, so a missing fact comes back as "unknown" rather than a low probability.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {
      "vendor": "Supabase",
      "website": "https://supabase.com",
      "request": "Procurement intake: a team wants to store EU customer data in this vendor'\''s hosted database."
    },
    "questions": {
      "soc2_type2": { "type": "choice", "instructions": "Does the vendor publicly state it has a SOC 2 Type 2 report?",
        "criteria": { "yes": "Yes, SOC 2 Type 2", "no": "No", "unknown": "The sources don'\''t say" } },
      "eu_region": { "type": "choice", "instructions": "Can customers host their project in an EU region?",
        "criteria": { "yes": "Yes, at least one EU region", "no": "No EU region", "unknown": "The sources don'\''t say" } },
      "hipaa": { "type": "choice", "instructions": "Does the vendor offer HIPAA compliance with a BAA?",
        "criteria": { "yes": "Yes", "no": "No", "unknown": "The sources don'\''t say" } },
      "sso_plan": { "type": "choice", "instructions": "On which plan does the vendor first offer SAML SSO for its dashboard?",
        "criteria": { "free": "Free", "pro": "Pro", "team": "Team", "enterprise": "Enterprise only", "unknown": "The sources don'\''t say" } }
    }
  }'
```

```json
{
  "mode": "fast",
  "answers": {
    "soc2_type2": { "type": "choice", "choice": "yes", "confidence": 0.998 },
    "eu_region": { "type": "choice", "choice": "yes", "confidence": 0.995 },
    "hipaa": { "type": "choice", "choice": "yes", "confidence": 0.996 },
    "sso_plan": {
      "type": "choice",
      "choice": "unknown",
      "probabilities": { "free": 0.002, "pro": 0.017, "team": 0.126, "enterprise": 0.039, "unknown": 0.816 },
      "confidence": 0.77
    }
  },
  "usage": { "input_tokens": 2430, "output_tokens": 0 },
  "citations": [
    { "url": "https://supabase.com/security" },
    { "url": "http://supabase.com/docs/guides/security/soc-2-compliance" },
    { "url": "https://supabase.com/docs/guides/security/hipaa-compliance" },
    { "url": "https://supabase.com/docs/guides/security/gdpr-compliance" }
  ],
  "decision_id": "decisions_b67f73164d248feeec8668eac9a9e631"
}
```

The first three answers match Supabase's security page, which states SOC 2 Type 2, HIPAA with a BAA, and EU regions. The SSO answer is a fair "unknown": Supabase's pricing page lists "SSO for Supabase Dashboard" under the Team plan, while its comparison table marks SSO as "Contact Us" for Team and Enterprise. A mid-confidence answer like that is the one to send to a person, with the ten cited pages attached.

Two habits help. First, one request shares one search, so keep questions about the same topic together and split unrelated ones. In a test the same morning, we asked about Clef-flash's price, question limit, output billing, and license in one request. The first three came back right, but the search pulled pricing pages that didn't mention the license, and the license question returned 0.26 for "Apache 2.0." Asked alone as a `choice`, it returned Apache 2.0 at 1.00, citing the Hugging Face LICENSE file. Second, for numbers, ask for the value as a `choice` and compare it in code; a [sibling test](https://parallel.ai/articles/laya-vs-jev-vs-parallel) shows why.

## Clef vs. Jev

Clef is a drop-in alternative to Jev: same question types, same request shape, and Cloudflare says switching takes a new endpoint, key, and `model` value. Over REST, Cloudflare wraps the answers in a `result` object, so code written for TypeSafe's API needs one extra step. Cloudflare also hosts Jev 1.13 itself as `typesafe/jev`, listed at $0.042 per 1M input tokens and a 32,000-token context, so you can compare both from one Worker.

- **Choose Clef-flash** for the lowest price and latency on Workers AI, image inputs, or open weights.
- **Choose Clef** for more context (64K) and the strongest Clef scores on intent-classification sets.
- **Choose Jev** for reasoning-heavy questions. On Cloudflare's own model card, Jev beats Clef on GPQA Diamond (78.3 vs. 48.0), MMLU-Pro (82.7 vs. 65.9), and BBH (92.9 vs. 73.7), and it leads both Clef models on the Artificial Analysis Decision Index.

Cloudflare's benchmarks favor Clef on its chosen sets: BANKING77 macro-F1 is 94.2 for Clef against 79.7 for Jev. They are vendor-run. On the independent [Artificial Analysis Decision Index](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index) (November 5, 2026, 23 models), Jev 1.13 scores 57.5 and Jev 1.14 57.1, Clef 48.6, and Clef-Flash 45.8. That index measures decisions from the input, so Parallel isn't on it.

## Can Clef use web search?

Not on its own, but you can feed it search results. Cloudflare's [Web Search API](https://parallel.ai/articles/cloudflare-web-search-api), in open beta since October 2, 2026, runs a query through Ceramic.ai ($0.25 per 1,000 requests), Linkup ($5), or Exa ($7) and returns up to 10 results. A Worker can call `env.AI.websearch()`, put the titles, URLs, and descriptions into Clef's `state`, and ask its questions. Cloudflare's own launch post describes a similar pattern for threat intelligence, where Clef paired with Browser Run fetched, rendered, and classified a domain in 2.2 seconds.

On cost, that pattern can come in under Parallel. A Ceramic search plus a 10,000-token state on Clef-flash is about $0.0006 per request, against Parallel's $0.001. What you take on:

- You write the search query. Ceramic matches keywords literally, so a question usually needs rewriting first.
- Clef-flash's hosted context is 24,576 tokens, and Cloudflare truncates the text state to fit, so you choose which results go in.
- Clef doesn't return citations, so mapping an answer back to a source is your code.
- The search returns titles and descriptions, not full pages, and there's no fetch endpoint.

Parallel isn't one of the Web Search API's providers. You can call it from a Worker with `fetch`, as below, or route it through AI Gateway's [Parallel provider proxy](https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/), which forwards any Parallel path with your own key. We haven't tested the proxy with `/v1/decisions`.

## A Worker that uses both

This Worker routes a support ticket with Clef-flash, then calls Parallel only when the ticket asks about a vendor. The model ID and request shape come from Cloudflare's Clef-flash page. Add `"ai": { "binding": "AI" }` to your Wrangler config and store the key with `wrangler secret put PARALLEL_API_KEY`.

```typescript
export interface Env {
  AI: Ai;
  PARALLEL_API_KEY: string;
}

type Ticket = { text: string; vendor?: string };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ticket = await request.json<Ticket>();

    // 1. Answer-in-input decision at the edge: Clef-flash reads only the ticket.
    const triage: any = await env.AI.run("@cf/cloudflare/clef-flash", {
      model: "clef-flash",
      state: ticket.text,
      questions: {
        route: {
          type: "choice",
          instructions: "Which team should handle this ticket?",
          criteria: {
            billing: "Charges, invoices, and refunds",
            support: "Bugs, outages, and configuration",
            vendor_review: "Security, compliance, or data handling at a third-party vendor",
          },
        },
      },
    });

    if (triage.answers.route.choice !== "vendor_review" || !ticket.vendor) {
      return Response.json({ route: triage.answers.route });
    }

    // 2. The answer isn't in the ticket, so ask Parallel to check the live web.
    const res = await fetch("https://api.parallel.ai/v1/decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.PARALLEL_API_KEY,
      },
      body: JSON.stringify({
        state: { vendor: ticket.vendor, request: ticket.text },
        questions: {
          soc2_type2: {
            type: "choice",
            instructions: "Does the vendor publicly state it has a SOC 2 Type 2 report?",
            criteria: { yes: "Yes, SOC 2 Type 2", no: "No", unknown: "The sources don't say" },
          },
          eu_region: {
            type: "choice",
            instructions: "Can customers host their data in an EU region?",
            criteria: { yes: "Yes, at least one EU region", no: "No EU region", unknown: "The sources don't say" },
          },
        },
      }),
    });
    if (!res.ok) return new Response(await res.text(), { status: res.status });

    const facts: any = await res.json();
    return Response.json({
      route: triage.answers.route,
      facts: facts.answers,
      sources: facts.citations.map((c: any) => c.url),
    });
  },
} satisfies ExportedHandler<Env>;
```

We don't have Cloudflare credentials in our test setup, so we ran this handler in Node 22 with the `AI` binding stubbed to return `vendor_review`, against the live Parallel API, on November 6, 2026. The Parallel step returned "yes" for both Supabase questions at 0.999 with ten source URLs, and the whole handler took 599 ms. Every ticket pays for Clef-flash; only vendor tickets pay Parallel's $0.001.

## Frequently asked questions

**What is Cloudflare Clef?** Clef is Cloudflare's family of open-weight decision models on Workers AI, launched October 1, 2026. Clef (27B), Clef-flash (9B), and Clef-omni (30B MoE with audio and video) take a state and typed questions and return a probability for every allowed answer, priced per input token with no output charge.

**How much does Clef-flash cost?** Clef-flash costs $0.038 per 1M input tokens on Workers AI since October 9, 2026, down from $0.090, with no charge for output tokens. Clef costs $0.24 and Clef-omni $0.15. Workers AI's free allocation of 10,000 Neurons a day covers roughly 2.9M Clef-flash input tokens.

**Is Clef better than Jev?** It depends on the task. Clef-flash is cheaper ($0.038 vs. $0.042 per 1M tokens), faster in Cloudflare's tests, reads images, and has open weights. Jev scores higher on the Artificial Analysis Decision Index (57.5 for Jev 1.13 vs. 48.6 for Clef) and on reasoning-heavy sets such as GPQA Diamond.

**Can Cloudflare Clef search the web?** No. Clef answers from the state you send. You can add results from Cloudflare's Web Search API or a page fetched with Browser Run to the state yourself, or call Parallel's Decisions API from the same Worker when you want the search and citations handled for you.

**When should I use Parallel instead of Clef?** Use Parallel when the answer depends on current facts outside your input, such as a vendor's certifications, a company's pricing, or whether a public claim holds up, and you need the sources. Use Clef when the input already holds the answer and you want the lowest cost and latency.

## Try it

Run your own vendor or company questions in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests, then copy the Worker above with the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) open. To try it from an agent first, the `web_decisions` tool on [Parallel MCP](https://parallel.ai/mcp) works without a key. More on the product is on the [Decisions page](https://parallel.ai/products/decisions).

Related reading: [Jev alternatives](https://parallel.ai/articles/jev-alternatives) / [Decision model pricing](https://parallel.ai/articles/decision-model-pricing) / [Cloudflare Web Search API](https://parallel.ai/articles/cloudflare-web-search-api) / [What is a System One model?](https://parallel.ai/learn/system-one-model)

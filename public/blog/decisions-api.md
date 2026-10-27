# Introducing the Parallel Decisions API: fast classification grounded in live web data

A decision engine with world knowledge built in.

Today we're launching the [Parallel Decisions API](https://platform.parallel.ai/play/decisions): a decision engine with world knowledge built in. The new API combines the speed and convenience of models like Jev with the collective knowledge of the live web. Developers can now ask questions about anything: not just what is in their context, but the web as a whole. Web grounding significantly expands the usefulness of decision models in agent workflows that need fast answers.

System One models like Jev are powerful ([we are fans](https://parallel.ai/blog/are-all-system-one-models-created-equal)), but they share a severe limitation with LLMs: they lack real-time context, and only know the data they were trained on and the input they are given. A model like Jev can't answer whether to lock your mortgage rate today, because it doesn’t know where rates closed yesterday. The Decisions API grounds every decision in real-time web context, so builders get more accurate answers fast enough for agent workflows that depend on answers in real-time.

From qualifying accounts to screening vendors, the Decisions API gives your workflows and agents the values they need in a single call. Batch several questions about the same company, product or policy into one request, and they all share a single call. This single API call replaces the multi-step pipeline your team might be building by hand today, at 10x lower cost than a standalone model and just $1 per 1,000 calls.

[Get started with 5,000 free requests →](https://platform.parallel.ai)

## Grounded in the web. Built for better decisions.

We tried a few questions that resemble use cases we often see at Parallel. Many of these questions rely on specific, up-to-date knowledge that changes quickly, where a model answering from memory would often get the answer wrong.

### Four questions answered by the Decisions API

Four single calls to the Decisions API, each returning a typed answer with its probability, latency, and source. Which one of the major venture firms has invested in Anysphere? a16z (p 1.00, 582 ms, techcrunch.com). Is California's SB 253 climate-disclosure requirement still scheduled to apply in 2026? yes (p 0.97, conf 0.93, 879 ms, ww2.arb.ca.gov). Which employee band is Clay in: 11 to 100, 101 to 500, or 501+? 101_500 (p 0.99, 517 ms, zoominfo.com). Has Parallel announced data residency in Europe? yes (conf 1.00, 563 ms, parallel.ai).

[Open interactive demo](https://decisions-api-illustrations.vercel.app/embed/questions)

We ran an experiment to compare the output of the Decisions API to an output from Jev. In this example, we used Parallel’s recent announcement [on support for data residency in Europe](https://parallel.ai/blog/eu-data-residency). This support was launched on October 14, 2026. We asked Jev if Parallel supports data residency in Europe. Jev responded with no, and a probability of 0.86.

### Jev vs. the Decisions API on data residency in Europe

Question: Has Parallel announced data residency in Europe? Model memory (jev-1.14.0): no, p 0.86, conf 0.72, with no sources because it answers from training data only. Live web (Decisions API): yes, p 1.00, conf 1.00, citing parallel.ai/blog/eu-data-residency and docs.parallel.ai/resources/eu-data-residency.

[Open interactive demo](https://decisions-api-illustrations.vercel.app/embed/memory-vs-web)

The response from the Decisions API provided an accurate response and probability. One broad limitation of decision models is that they do not "justify" their answers, and don’t know how to respond with “I don’t know”. As with all Parallel products, the Decisions API returns citations with every answer, so every result can be audited.

## Batching multiple questions for the cost of one API call

Developers often use decision models in batch workflows, such as enrichment, where speed and cost are critical. To enable this workflow, the Decisions API supports batching multiple questions in a single request. To batch questions, you specify a shared context and submit multiple questions that would benefit from that context. Batching returns multiple answers for the cost of a single call. For example, to enrich a CRM column, you might need to answer multiple questions about Vercel:

### Four questions about Vercel in one Decisions API call

One request with shared context (company: Vercel, domain: vercel.com) and four questions, answered from one retrieval of 10 sources in 681 ms for $0.001. employee_band: 501_plus (confidence 0.55, routed to review). has_public_api: yes (confidence 1.00). has_enterprise_plan: yes (confidence 1.00). is_agent_product: no (confidence 1.00).

[Open interactive demo](https://decisions-api-illustrations.vercel.app/embed/one-call)

## What we built with the Decisions API

Before launch, we built a few projects using the Decisions API.

- [Finance Perpetual KYB Engine](https://cdn.sanity.io/files/5hzduz3y/production/9c56f6c6b82b1e0186e5e1362c74bed3312f04bb.mp4): Banks re-review business customers every one to five years, and the file can go stale any time in between given executive/funding changes. We rechecked 426 public companies against the live web with the Parallel Decisions API in under ten seconds for 85 cents, and 98% of its flags held up.
- [GTM Lead Routing](https://cdn.sanity.io/files/5hzduz3y/production/7de66653ba4a1e52d957d7f386cc9e39e08963fb.mp4): Inbound leads go cold fast, but the facts that decide where one should go (funding, headcount, what the company does) often require current web context. We ran 500 inbound leads through the Parallel Decisions API in under nine seconds for about 50 cents, and 97% of the leads it routed on its own landed in the right segment. We will use Decisions to power our own contact.parallel.ai.

We built a few more fun demos, including: [an archive tracker](https://archivetracker.paralleldemos.com/), [a SF restaurant finder](https://everytable.paralleldemos.com/), and [a YC company status checker](https://ycstillactive.paralleldemos.com/).

## Get started

The Web Decisions API is live today. Here is one API call you can try:

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

**Try it free from your agent.** The Decisions API is also available as a tool in the Parallel MCP server, `web_decisions`, free to use with no account or API key. Add the server to your MCP client and ask your agent to use Parallel Decisions. For example, "Use Parallel Decisions to check whether Parallel supports data residency in Europe." Sign in or add an API key for higher limits.

```bash
claude mcp add --transport http parallel https://mcp.parallel.ai/mcp
```

## Start Building

Get started in our [Developer Platform](https://platform.parallel.ai/play/decisions) or dive into the [documentation](https://docs.parallel.ai/decisions/decisions-quickstart).

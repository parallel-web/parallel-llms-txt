# AI fact-checking API: check claims against the live web with typed, cited answers

AI fact checking only helps if software can take a claim, find current evidence for it, and return a verdict a person can audit later. This guide covers how automated fact-checking pipelines work, how LLM agents, fact-check lookups, and decision APIs compare, a claim-verification recipe with thresholds and human review, live results on six claims in four languages, and the limits to plan for.

An AI fact-checking API takes a claim, retrieves evidence about it, and returns a verdict. A web-grounded decision API does the retrieval and the verdict in one call: you send the claim and a `choice` question with `supported`, `contradicted`, and `not_enough_evidence` options, and get back per-option probabilities and the sources it read, in under a second for $0.001 per request. In our Nov 6, 2026 test, Parallel's Decisions API got five of six claims right across English, Spanish, German, and French. The miss was a price that had changed, and its lower probability would have sent it to a reviewer.

We build Parallel's Decisions API, so weigh that. The comparison below includes approaches that beat it on accuracy, and the results table includes the claim it got wrong.

## How automated fact checking works

Research surveys and working fact-checkers describe the same pipeline:

1. **Claim detection.** Find the sentences that make a checkable factual assertion, and rank them by how much they matter. "The government invested more than 10 billion in education last year" is worth checking; "my friend had a coffee" isn't.
2. **Claim matching.** See whether someone has already checked this claim or a paraphrase of it.
3. **Evidence retrieval.** Find current sources that bear on the claim.
4. **Verdict.** Decide whether the evidence supports the claim, contradicts it, or doesn't settle it. The research literature uses those three labels, written as support, contradiction, and not enough information.

[Full Fact](https://fullfact.org/ai), the UK fact-checking charity, builds tools for the first two steps and says they're used by over 40 fact-checking organizations in 30 countries. Its journalists still research the claims and write the verdicts.

A decision API sits at steps 3 and 4. It doesn't find claims in a transcript for you; an LLM or a classifier does that. It takes one claim and returns a typed verdict grounded in what it just retrieved. That's the slowest part of the pipeline to run at volume, and the one where an auditable output matters most.

## Who uses AI fact checking

| Team | Typical claim | What they need from the output |
| --- | --- | --- |
| Newsrooms and fact-checkers | A statistic in a politician's speech | Sources to cite and a flag for human review |
| Trust and safety | A viral post about a product recall | A verdict fast enough to act on before it spreads |
| Compliance and procurement | A supplier's press release claiming ISO 27001 certification | An audit trail of what was checked and when |
| Content and SEO teams | Facts in a draft article or AI-written copy | Checks across many claims per page at low cost |
| Agent builders | A fact an agent is about to act on | A probability it can branch on, inside the loop |

## Three ways to automate the verdict

| Approach | What you get back | Speed | Cost | Best fit |
| --- | --- | --- | --- | --- |
| LLM with native web search | A researched answer, parsed into a verdict | About 6 to 7 s at p50 | $16.52 to $28.79 per 1,000 questions | Hard single claims where accuracy matters most |
| Fact-check lookup (Google Fact Check Tools API) | Existing fact-checks with publisher, rating, and article URL | One search request | Requires a Google API key | Claims that professional fact-checkers have already reviewed |
| Web-grounded decision API (Parallel) | A typed verdict, per-option probabilities, and sources | About 0.56 s at p50 | $1 per 1,000 requests | High-volume checks, pipelines, and agent loops |

Speed and cost for the first and third rows come from PWS-Decisions, described below.

### LLM with web search

An LLM agent that searches, reads, and reasons is the most accurate option on hard claims. On PWS-Decisions, a 300-question benchmark of closed-ended questions about dated public-web facts that Parallel built and curated for difficulty (questions every tested system answered correctly were removed, and a random guess scores 42.4%), GPT-6 Luna with required web search scored 97.3% at a p50 of 7.42 s and $16.52 per 1,000 questions. Claude Haiku 5.5 with native web search scored 96.6% at 6.38 s and $27.43 to $28.79 per 1,000. Parallel's Decisions API scored 76.2% at 0.56 s and $1.00.

For one contested claim in a story, an LLM with search is the better tool, and it can write the explanation too. The decision API's case is volume: checking every claim in every article, every listing, or every agent step, where 13 times faster at about 1/16 the cost changes what you can afford to check.

### Fact-check lookups

Google's [Fact Check Tools API](https://developers.google.com/fact-check/tools/api) includes a Claim Search API that queries the same set of fact checks as Google's Fact Check Explorer. Those fact checks come from publishers that mark up their articles with schema.org ClaimReview. You send `GET https://factchecktools.googleapis.com/v1alpha1/claims:search` with a `query` and optional filters for `languageCode`, `reviewPublisherSiteFilter`, and `maxAgeDays`, and get back the claim text, the claimant, and one or more reviews with the publisher, article URL, review date, and a textual rating such as "Mostly false".

It's designed for claim matching, step 2 of the pipeline: when a claim has been reviewed by a professional fact-checker, you get a human-written verdict and an article to link. A claim that nobody has written up yet, such as a new supplier certification or a price change last week, won't have an entry. The two approaches combine well: look the claim up first, and send it to a web-grounded verdict when there's no existing fact check.

### Web-grounded decision API

Most decision models, such as TypeSafe's Jev or OpenAI's Decisions API, answer only from the text you pass in. That works for fact checking if you've already gathered the evidence. Parallel's [Decisions API](https://parallel.ai/products/decisions) retrieves the evidence itself: it searches the live web once per request, answers every question in the request against that evidence, and returns the sources with the answers.

## A claim-verification recipe

### 1. Ask a choice question with an explicit unknown

A yes/no `noul` question returns the probability that a statement is true, and that's tempting for fact checking. The problem is what a low number means. Parallel's docs say not to treat missing evidence as proof that a statement is false, and to use a `choice` question with an `unknown` option when your application needs an explicit insufficient-evidence outcome. For fact checking, that distinction is the whole job: "we found nothing" and "we found a source that says otherwise" lead to different actions.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -d '{
    "state": {
      "claim": "The Eiffel Tower was completed in 1899.",
      "claim_language": "en"
    },
    "questions": {
      "verdict": {
        "type": "choice",
        "instructions": "Based on current public web evidence, what is the status of the claim? Choose not_enough_evidence when the sources found do not settle it.",
        "criteria": {
          "supported": "Reliable sources confirm the claim as stated, including its dates and numbers.",
          "contradicted": "Reliable sources show the claim is false or that a key detail (date, number, name) is wrong.",
          "not_enough_evidence": "The evidence found does not confirm or refute the claim."
        }
      }
    }
  }'
```

On Nov 6, 2026, that request returned `contradicted` at 0.988 in 688 ms. The first two sources were the Eiffel Tower's official history page ("On March 31, 1889, the Tower was completed in record time") and Britannica.

### 2. Send one claim per request

All questions in a request share one set of retrieved evidence, and Parallel's docs recommend separate requests for unrelated topics. For fact checking, that means one claim per request unless the claims are about the same entity, such as several numbers from one company's earnings release. The limits section below shows what happens when you mix them.

### 3. Route by probability, not just by label

Accept confident verdicts automatically and send everything else to a person. Treat a refusal as its own outcome; the docs say not to turn it into a negative answer or the first option.

```python
ACCEPT = 0.90


def route(answer: dict) -> str:
    if answer["type"] == "refusal":
        return "human_review"
    label = answer["choice"]
    p = answer["probabilities"][label]
    if label == "not_enough_evidence":
        return "unverified"  # publish nothing, or queue for research
    if p >= ACCEPT:
        return label  # "supported" or "contradicted"
    return "human_review"
```

Tune the 0.90 on a labeled sample of your own claims. A newsroom that publishes verdicts wants it high; a content team that only flags drafts for an editor can set it lower.

### 4. Keep the citations for audit

Every response includes a `citations` array with each source's URL, title, and the excerpts the model read, plus a `decision_id`. Store them with the claim, the verdict, the full probability map, and the date you checked. When someone challenges a verdict, you can show what the model saw, and when the claim is time-sensitive, you know how old the check is.

### 5. Handle claims that change over time

Prices, rankings, office holders, and product limits are true until they aren't. Add the date of the check to `state`, ask whether the claim is true as of that date, and add an `outdated` option. Our results below show why, and also why this step doesn't remove the need for review.

## Results: six real claims, Nov 6, 2026

We ran six claims through the recipe above, one request each, on Nov 6, 2026: two older facts, three recent ones, and three in languages other than English. Parallel's PWS-Decisions benchmark is English-only, so the non-English rows are the only multilingual evidence here, and six claims are a spot check, not a benchmark. Latency was 602 to 718 ms per request.

| Claim as sent | Language | What's true | Verdict returned | Top probability | Correct |
| --- | --- | --- | --- | --- | --- |
| The Eiffel Tower was completed in 1899. | English | False: completed March 31, 1889 | contradicted | 0.99 | Yes |
| OpenAI made its Decisions API generally available on October 22, 2026. | English | True | supported | 0.98 | Yes |
| Perplexity's pplx-decider-v1.2 decision model costs $0.04 per million input tokens. | English | False: $0.02 per million now; the API launched at $0.04 | supported | 0.79 | No |
| TypeSafe lanzó Jev 1.14.0 el 14 de octubre de 2026. | Spanish | True | supported | 0.78 | Yes, at low confidence |
| Die Acme Robotics GmbH hat 2026 die ISO-27001-Zertifizierung erhalten. | German | No public evidence | not_enough_evidence | 0.98 | Yes |
| Microsoft-Decision-1 coûte 0,10 $ par million de tokens d'entrée dans Microsoft Foundry. | French | False: $0.042 per million | contradicted | 0.97 | Yes |

With the 0.90 threshold from step 3, four claims resolve automatically and all four are right. The other two go to a reviewer: the Spanish Jev claim, which was correct but uncertain, and the Perplexity price, which was wrong.

The miss is worth reading closely. The retrieved evidence included Perplexity's launch announcement pricing its decision model at $0.04 per million input tokens and a later post from Perplexity's CEO giving $0.02. The model sided with the older number. When we re-ran the claim with a `check_date` in `state` and an `outdated` option, it picked `outdated`, a defensible answer given the price history, but with nearly flat probabilities (0.28 outdated, 0.24 supported, 0.26 not enough evidence, 0.22 contradicted). That's a model telling you it isn't sure, and the threshold sends it to a person either way. For prices and other values that change, plan on review or check the vendor's own page with a tool built for reading it, such as Parallel's Extract API.

The German row shows the unknown option doing its job. Acme Robotics GmbH is a placeholder name with no public certification record, and a bare `noul` would have returned a low probability that looks like "false". The `choice` question returned `not_enough_evidence` at 0.98 instead.

## Limits to plan for

**Shared evidence across questions.** In one extra request we put the Eiffel Tower claim and the OpenAI claim in the same call as two questions. The Eiffel verdict held (`contradicted`, 0.99), but the OpenAI verdict, `supported` at 0.98 when checked alone, dropped to `not_enough_evidence` at 0.74. One retrieval had to cover two unrelated topics and found less about each. Send unrelated claims separately.

**Request-level citations.** Sources cover the whole call, not each answer, so you can't tell which source drove which verdict in a multi-question request. One claim per request keeps the audit trail clean, since every source belongs to that claim.

**Refusals.** Any question can return `{"type": "refusal"}`, including because of safety filtering downstream. None of our six claims were refused, but sensitive health or political claims are where you'd expect it. Route refusals to a person.

**Three labels are coarse.** Professional fact-checkers use ratings like "half true" and "missing context". You can add options such as `misleading` to the choice, but test them on labeled examples first; the more options share similar descriptions, the flatter the probabilities get.

## Frequently asked questions

**What is AI fact checking?** AI fact checking uses software to find factual claims, retrieve evidence about them, and reach a verdict such as supported, contradicted, or not enough evidence. Newsrooms usually keep people on the final call; high-volume uses such as content review automate the verdict and review low-confidence cases.

**Is there a free AI fact-checking API?** Parallel's Decisions playground includes 5,000 free requests, and the `web_decisions` tool in the [Parallel MCP server](https://parallel.ai/mcp) is free to use with no account or key; ask your agent to "use Parallel Decisions to check whether" a claim is true. Google's Fact Check Tools API needs a Google API key and is subject to Google's API terms; it returns existing fact checks rather than new verdicts.

**Can AI fact-check claims in other languages?** Yes, with caveats. In our Nov 6, 2026 spot check, Parallel's Decisions API handled claims in Spanish, German, and French correctly, one of them at low confidence. Six claims aren't a benchmark, and Parallel's published benchmark is English-only, so test on claims in your own languages.

**How accurate is AI fact checking?** It depends on the claim and the approach. On PWS-Decisions, a hard 300-question set Parallel built, LLMs with native web search scored about 97% and Parallel's Decisions API 76.2%, with the decision API about 13 times faster and 1/16 the cost. Accuracy on routine claims is higher than on a set curated for difficulty, and claims about changing values such as prices are the hardest.

**Can a fact-checking API replace human fact-checkers?** No. It can check far more claims than a team can, flag the ones that look wrong, and hand reviewers the sources. Deciding what a misleading claim means for readers, and writing the correction, stays with people.

## Try it

The fastest test is the free `web_decisions` tool: connect your agent to [Parallel MCP](https://parallel.ai/mcp) and ask it to "use Parallel Decisions to check whether" a claim from your own work is true. For a pipeline, start in the [Decisions playground](https://platform.parallel.ai/play/decisions) with the choice question above, then follow the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). If your stack runs on OpenRouter, the same model is available as `parallel/decisions-fast`.

Related reading: [Build a real-time fact checker with Parallel and Cerebras](https://parallel.ai/blog/cerebras-fact-checker) / [What is source grounding?](https://parallel.ai/learn/source-grounding) / [Content moderation API](https://parallel.ai/articles/content-moderation-api) / [Parallel Decisions on OpenRouter](https://parallel.ai/articles/parallel-decisions-openrouter)

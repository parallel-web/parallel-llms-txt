# Entity matching: how to tell if two company records are the same, a subsidiary, or unrelated

Entity matching is the step in a data pipeline that decides whether two records describe the same real-world thing, and for company records the hardest pairs turn on facts about the outside world, not on how similar the names look. This guide covers how entity resolution pipelines work, which cases need outside knowledge, and a web-grounded decision step tested live on six real company pairs.

Entity matching, also called entity resolution or record linkage, decides whether two records refer to the same entity. A typical pipeline standardizes fields, uses blocking to limit which pairs get compared, scores each candidate pair with string similarity and a statistical or machine-learned model, and clusters the matches. That settles most pairs. The ambiguous remainder for company data (renames, parent and subsidiary, regional entities, acquisitions) needs facts that aren't in either record, and a web-grounded decision step can answer "same entity, parent or subsidiary, unrelated, or unknown" for $0.001 a pair, so 100,000 hard pairs cost about $100.

We build Parallel's Decisions API, which we use for that last step below. The results are from live calls on Nov 6, 2026, reported as they came back.

## How an entity matching pipeline works

The same five stages show up in most implementations, whether it's a SQL job, an open-source library, or a vendor platform:

1. **Standardize.** Lowercase, strip punctuation and legal suffixes into a separate field (Inc., LLC, GmbH, AG, Ltd.), normalize addresses and URLs, extract the website domain.
2. **Block.** Comparing every record with every other is quadratic, so you only compare pairs that share a cheap key: the same domain, the same first token of the name, the same postcode. Blocking rules trade recall for speed, and the pairs you never compare can never match.
3. **Compare.** For each candidate pair, compute per-field similarity: exact match on domain, Jaro-Winkler or Levenshtein distance on names, token overlap, geographic distance.
4. **Score.** Combine those comparisons into a match probability. Classic systems use the Fellegi-Sunter probabilistic model; others train a classifier on labeled pairs; newer ones ask an LLM.
5. **Cluster.** Turn pairwise matches into entities, usually with a threshold and connected components, so A=B and B=C put all three in one cluster.

Two widely used open-source Python libraries cover these stages. [Splink](https://moj-analytical-services.github.io/splink/), built by the UK Ministry of Justice's data linking team, implements the Fellegi-Sunter model, can estimate its parameters without labels using expectation maximisation, and runs its computations as SQL on a backend you choose (DuckDB by default, or Spark, PostgreSQL, and SQLite). [dedupe](https://github.com/dedupeio/dedupe), from DataMade, learns blocking rules and a pairwise classifier from human labels through active learning: it shows you the pairs it is least sure about and learns from your answers.

## Matching approaches compared

| Approach | How it decides | Strength | Where it fails |
| --- | --- | --- | --- |
| Deterministic rules | Exact keys such as domain, tax ID, LEI | Fast, explainable, no false positives on good keys | Misses anything without a shared key |
| String similarity | Jaro-Winkler, Levenshtein, token overlap on names | Catches typos and formatting differences | Siemens AG and Siemens Corporation look identical; Facebook and Meta look unrelated |
| Probabilistic (Fellegi-Sunter) | Weighs agreement and disagreement per field | Works without labels; calibrated match weights | Only knows what is in the records |
| Supervised ML or active learning | Classifier trained on labeled pairs | Adapts to your data's quirks | Needs labels; still record-only |
| LLM matcher | Model reads both records and judges | Handles messy free text and context | Answers from training data, which can be out of date |
| Web-grounded decision | Retrieves current evidence and picks a relationship | Knows about renames, deals, and subsidiaries | Costs a request per pair and adds latency; can still be wrong |

Everything above the last row decides from the two records alone, plus whatever a model memorized. That covers most of the work. It can't cover a company that changed its name after your data was collected.

## The hard cases need outside knowledge

These are the pairs that land in the middle band of a match score, or worse, get confidently mismatched:

- **Renames.** Facebook, Inc. became Meta Platforms, Inc. in 2021. The names share no tokens, so similarity says unrelated. Same entity.
- **Acquisitions.** Slack Technologies is now part of Salesforce. Different names, different legal entities, one corporate group. Whether that counts as a match depends on your use case, which is why the answer should be a relationship, not a yes or no.
- **Regional entities.** Siemens Aktiengesellschaft (Germany) and Siemens Corporation (US) share a name and a group but are separate legal entities. Similarity says match; a credit or KYB process may need to keep them apart.
- **Spin-offs and shared history.** Kraft Foods Inc. renamed itself Mondelēz International in 2012 when it spun off Kraft Foods Group, which later merged with Heinz to form The Kraft Heinz Company. The two companies today share a history and a brand but have no ownership link.
- **Name collisions.** Delta Air Lines and Delta Faucet share a first token and nothing else. Small companies collide even more often, and there may be no public evidence to separate them.

## The web-grounded decision step

The decision step takes the two records as `state` and asks a `choice` question whose options are the relationships you care about. Include `unknown` so the model isn't forced to guess. A second `noul` question checks for a former name.

```bash
curl -s https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "record_a": {"name": "Siemens Aktiengesellschaft", "city": "Munich, Germany"},
      "record_b": {"name": "Siemens Corporation", "city": "Washington, DC, USA"}
    },
    "questions": {
      "relationship": {
        "type": "choice",
        "instructions": "Based on current public information, what is the relationship between the company in record_a and the company in record_b?",
        "criteria": {
          "same_entity": "Both records refer to the same legal entity or the same company under an old and a new name.",
          "parent_or_subsidiary": "One company owns or controls the other (parent, subsidiary, or acquired business), or both are entities of the same corporate group.",
          "unrelated": "The companies are separate with no ownership relationship.",
          "unknown": "The evidence does not establish the relationship."
        }
      },
      "former_name": {
        "type": "noul",
        "instructions": "Is one of the two names a former name of the other company?"
      }
    }
  }'
```

The response holds the chosen key, a probability per option, and request-level citations (URLs plus the excerpts used). For the Siemens pair, those included Siemens' FY2025 annual report, the US entity's financial statements, and LEI records.

## Results on six real pairs

We ran the request above on six pairs, one request per pair, on Nov 6, 2026. "Ground truth" is what we verified from primary sources (SEC filings and company announcements); the last pair has no single right answer because several unrelated companies use the name.

| Pair | Ground truth | Answer | Top probability | former_name | Latency |
| --- | --- | --- | --- | --- | --- |
| Facebook, Inc. / Meta Platforms, Inc. | Same company, renamed 2021 | same_entity | 0.99 | 0.99 | 991 ms |
| Slack Technologies, LLC / Salesforce, Inc. | Acquired by Salesforce in 2021 | parent_or_subsidiary | 0.95 | 0.15 | 920 ms |
| Siemens AG / Siemens Corporation | US subsidiary of Siemens AG | parent_or_subsidiary | 0.89 | 0.14 | 665 ms |
| Delta Air Lines, Inc. / Delta Faucet Company | Unrelated | unrelated | 0.92 | 0.01 | 726 ms |
| Mondelēz International / The Kraft Heinz Company | No ownership link; shared Kraft history | unrelated | 0.81 | 0.53 | 547 ms |
| Acme Robotics Inc. (US) / Acme Robotics GmbH (Germany) | Several unrelated firms share the name | unrelated | 0.65 (unknown 0.31) | not asked | 604 ms |

The first four are correct with high probability, including the two that string similarity gets backwards (Facebook and Meta, Delta and Delta). Mondelēz and Kraft Heinz is correct on the relationship at a lower 0.81, and the former-name question sat at 0.53, which reflects a question that has no clean yes or no: Mondelēz was once Kraft Foods Inc., but Kraft Heinz descends from the spun-off Kraft Foods Group, not from that entity. For the Acme pair the retrieval found several different Acme Robotics companies; the answer leaned unrelated with 0.31 on unknown. At a 0.8 threshold, that pair goes to a person, which is the right outcome when the records hold nothing but a name and a country.

Six pairs show the pattern; they say little about accuracy. Before you trust the step in production, label a few hundred of your own ambiguous pairs and measure.

## Where it fits in the pipeline

Use the decision step only on the ambiguous middle band, after the cheap stages have done their work:

1. Block and score every candidate pair with your existing matcher (Splink, dedupe, or SQL rules).
2. Auto-accept pairs above a high match threshold and auto-reject pairs below a low one.
3. Send the pairs in between, plus any pair where a cheap signal disagrees (different domains but near-identical names, or the same domain with different names), to the decision step.
4. Accept `same_entity` and `unrelated` answers at or above your threshold. Map `parent_or_subsidiary` to whatever your use case needs: merge for a sales account hierarchy, keep separate for credit or KYB.
5. Send `unknown`, refusals, and low-probability answers to review, and feed the reviewed labels back into your matcher's training data.
6. Cache answers by pair key, and re-check periodically, because renames and acquisitions keep happening.

One request per pair is the right shape: the pair is the entity, and Parallel's docs recommend separate requests for unrelated entities.

## Lead-to-account matching in a CRM

Lead-to-account matching is the same problem inside a sales stack: a form fill arrives as `jane@instagram.com`, and the router has to decide whether it belongs to the existing Meta account. Routing tools match on domain and fuzzy company name, which handles most leads. The misses are the cases above: a brand domain owned by a parent, a recent acquisition, or a regional entity. Run the decision step only on leads that miss the domain match, then write the parent account back to the CRM before assignment. The [AI lead routing](https://parallel.ai/articles/ai-lead-routing) guide shows the full flow.

## Cost math

Say you have 2 million company records and blocking produces 10 million candidate pairs. If your matcher settles 98% of them, 200,000 pairs fall in the middle band.

| Option for the middle band | Cost for 200,000 pairs | Time per pair |
| --- | --- | --- |
| Web-grounded decision at $0.001 per request | $200 | 547 to 991 ms in our run |
| LLM agent with native web search | about $3,300 at $16.52 per 1,000 questions | 7.42 s median |
| Manual review at 30 seconds a pair | about 1,670 hours | 30 s |

The LLM agent row uses GPT-6 Luna with native web search from Parallel's PWS-Decisions run. Parallel built that 300-question benchmark and curated it for difficulty (random guessing scores 42.4%). On that set the agent was more accurate, 97.3% against 76.2% for Decisions, so it's worth its price on the handful of pairs where a wrong merge is costly. At the default limit of 600 requests per minute, 200,000 decision requests take about five and a half hours; ask for a higher limit if you need it sooner.

## Frequently asked questions

**What is entity matching?** Entity matching is the process of deciding whether two or more records refer to the same real-world entity, such as a company, person, or product, even when names, formats, or identifiers differ. It is also called entity resolution, record linkage, or deduplication when applied within one dataset.

**What is the difference between entity matching and entity resolution?** The terms are often used interchangeably. Entity matching usually refers to the pairwise decision (do these two records match?), while entity resolution often includes the full pipeline from blocking through clustering into canonical entities.

**Can string similarity tell if two companies are the same?** Only when the names are close and the companies really are the same. Similarity fails on renames (Facebook and Meta), on unrelated companies with shared names (Delta Air Lines and Delta Faucet), and on regional entities of one group (Siemens AG and Siemens Corporation), because the answer depends on facts that aren't in the strings.

**How do you match a parent company and its subsidiary?** Ask for the relationship instead of a yes or no. A choice question with same_entity, parent_or_subsidiary, unrelated, and unknown lets you decide downstream whether a subsidiary should merge into the parent's account or stay separate. Corporate registries and LEI records help, and a web-grounded decision can cite them.

**Should I use an LLM for entity matching?** An LLM can judge messy records well, but without retrieval it answers from training data, which misses recent renames and deals. Use an LLM or a web-grounded decision only on the ambiguous pairs your cheaper matcher can't settle, and measure it on your own labeled pairs first.

## Try it

Take a few pairs from your own review queue and run them in the [Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests. The [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) covers the request format, and if you'd rather try it from an AI assistant first, the free `web_decisions` tool in [Parallel MCP](https://parallel.ai/mcp) needs no account: ask it to "use Parallel Decisions to check whether Slack Technologies and Salesforce are the same company, a subsidiary, or unrelated."

Related reading: [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api) / [KYB](https://parallel.ai/learn/kyb) / [Source grounding](https://parallel.ai/learn/source-grounding) / [AI lead qualification](https://parallel.ai/articles/ai-lead-qualification)

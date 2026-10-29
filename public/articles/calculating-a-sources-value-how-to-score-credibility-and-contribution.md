# Calculating a source’s value: how to score credibility and contribution

Calculating a source’s value tells you how much weight a source deserves before you, or an AI agent, rely on it. This guide compares CRAAP, SIFT, and other evaluation frameworks, walks through the credibility criteria and a uniqueness test, and shows a weighted scoring method, how agents measure contribution with Shapley values, and a reusable checklist.

## What does calculating a source’s value mean?

Calculating a source’s value means estimating how much a source should shape your conclusion. You judge it on two questions: can you trust it (credibility), and what does it add that you couldn’t get anywhere else (contribution, or irreplaceability)? A source earns high value when it scores well on both.

We use _source valuation_ to mean the practice of giving a source a weight before you rely on it. Library frameworks such as CRAAP and SIFT answer the credibility question with checklists, and none of them includes arithmetic. AI researchers now answer the contribution question by measuring what an answer loses when a source leaves the model’s context.

Parallel’s research team separated these two measurements in its [Visibility-Value Gap research](https://index.parallel.ai/the-visibility-value-gap). The team ranked domains two ways, by how often they surface in AI results (visibility) and by Shapley value. Shapley value is each domain’s attributed share of value based on its _marginal contribution_, or what an answer loses without it.

The two rankings overlap less than you might expect, so the number of times you see a source tells you little about its worth.

## Why source evaluation matters more when AI does the reading

People struggle to judge sources. The Digital Inquiry Group, once called the Stanford History Education Group, tested a national sample of US high school students between June 2018 and May 2019.

In the group’s [Stanford study of 3,446 students](https://www.inquirygroup.org/students-civic-online-reasoning), 52% rated a ballot video filmed in Russia as “strong evidence” of US voter fraud. Ninety percent of the students received no credit on four of six tasks.

AI tools struggle too. In February 2025, the Tow Center for Digital Journalism asked eight AI search tools to name the original article behind pasted news excerpts across 1,600 queries. In the [Tow Center’s AI citation study](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php), published in March 2025, the tools gave incorrect answers to more than 60% of queries.

More than half of Gemini and Grok 3 responses in that test cited fabricated or broken URLs. An agent reads far more pages per task than you do, so it needs source weighting built into its pipeline.

We argue in [The Web as Ground Truth](https://parallel.ai/the-web-as-ground-truth) that retrieval quality sets the ceiling on an agent’s answer. Serious research also needs control over which parts of the web to trust. In multistep research, missing a single source can invert a conclusion, such as the result of a drug trial.

## CRAAP vs. SIFT vs. other source evaluation frameworks

Source evaluation frameworks are mnemonics for the same underlying questions about who made a source, when, and for what purpose. In its story on the [CRAAP test from CSU Chico](https://today.csuchico.edu/how-to-craap-test/), Chico State Today reports that librarian Sarah Blakeslee of Meriam Library coined the acronym in 2004. CRAAP stands for Currency, Relevance, Authority, Accuracy, and Purpose, and it works as a list of questions with no scoring attached.

With a checklist, you evaluate a page in isolation. SIFT sends you off the page to see what others say about it. Digital literacy researcher Mike Caulfield proposed it as an alternative to checklists.

| Framework | Letters | Best for | Limitation |
| --- | --- | --- | --- |
| CRAAP | Currency, Relevance, Authority, Accuracy, Purpose | First screening of a single document | Judges the page in isolation and assigns no scores |
| SIFT | Stop, Investigate the source, Find better coverage, Trace claims | Checking online claims and media before you read on | Offers moves to follow, with no way to rank sources |
| CAPPS | Currency, Authority, Publisher, Point of view, Sources | Separating the author from the publisher | Has no letter for relevance to your question |
| SCAAN | Source type, Currency, Accuracy, Authority, Neutrality | Classifying the source type before judging content | Neutrality can mark down advocacy sources that still hold evidence |
| CARS | Credibility, Accuracy, Reasonableness, Support | Judging the quality of an argument and its evidence | Has no letter for relevance to your question |
| RADAR | Rationale, Authority, Date, Accuracy, Relevance | Putting a purpose check first | Assigns no weights to its criteria |

### The SIFT method, step by step

[Mike Caulfield’s SIFT method](https://hapgood.us/2019/06/19/sift-the-four-moves/) names four moves: Stop, Investigate the source, Find better coverage, and Trace claims, quotes, and media to the original context. Caulfield taught these “Four Moves” starting in 2017 and published the SIFT acronym on his Hapgood blog in 2019.

1. **Stop:** Before you read or share, ask whether you know the site. If you don’t, use the other moves first.
2. **Investigate the source:** Learn who published the page and what they gain before you spend time reading it.
3. **Find better coverage:** Look for trusted reporting on the same claim. If you find it, set the original page aside.
4. **Trace claims, quotes, and media to the original context:** Follow a blog’s statistic to the study it cites. You may find a narrower finding.

The trace move ties SIFT to source value. The original record holds detail that paraphrases drop, which makes it the hardest version of a claim to replace. At scale, an agent can run the Search API to find candidate pages and the [Extract API](https://parallel.ai/products/extract) to pull the relevant passage from each URL.

## Scholarly, popular, and trade sources

Publication type gives you a first estimate of value. The [UTSA guide to scholarly, popular, and trade sources](https://libguides.utsa.edu/scholarly) says scholarly articles carry specialized vocabulary and extensive citations, and most go through peer review. By the same UTSA Libraries definitions, trade articles report industry news, trends, and opinions without peer review, and popular sources address a general audience.

| Feature | Scholarly | Popular | Trade |
| --- | --- | --- | --- |
| Author | Researchers and subject experts | Journalists and staff writers | Industry practitioners and journalists |
| Audience | Scholars and specialists | General public | Professionals in one field |
| Purpose | Report original research | Inform, entertain, or persuade | Share industry news, trends, and opinions |
| Citations | Extensive | Few or none | Some |
| Review process | Peer reviewed in most cases | Edited by staff | Edited by staff, without peer review |
| Best use | Evidence and analysis | Background facts and events | Current practice in an industry |

Treat venue as a starting estimate that you update as you read. Peer review applies to research articles, and journals with peer review also publish editorials that skip it, so check the article type. Popular sources tell you who did what and when, and scholarly sources answer “so what.”

## The five criteria behind a source’s value

Underneath the acronyms, the frameworks above share five credibility criteria: authority, currency, accuracy, objectivity, and relevance.

For each one, you get the question to ask, the signals to check, and the agent’s version of the same test. With uniqueness added, they become the scored inputs for the weighted method.

### Authority: who created the source?

Check the author’s credentials, publishing history, and institutional affiliation, then look at the publisher’s reputation and any financial interest in the topic. Use _lateral reading_, which means leaving the page and opening new tabs to see what others say about the author or publisher.

Sam Wineburg and Sarah McGrew watched 45 people evaluate websites: 10 historians, 10 professional fact checkers, and 25 Stanford undergraduates. In [Wineburg and McGrew’s lateral reading study](https://cor.inquirygroup.org/research/lateral-reading-and-the-nature-of-expertise/), published in Teachers College Record in 2019, historians and students fell for logos and domain names that looked official. The fact checkers’ habit of lateral reading became the model for teaching the skill.

Agents face the same trap with polished pages that hold little evidence. We train crawl models to identify authoritative sources, and the [Parallel Search API](https://parallel.ai/products/search) gives you source control to include or exclude specific domains. For a measurement standard, you might include nist.gov and keep the agent inside the official record.

### Currency: is the source up to date?

Check the publication date, the last update, the age of the works the source cites, and whether its links still resolve. Recency standards vary by field, so a 2015 history monograph can still be current while a 2015 pricing page can’t.

For agents, the Search API’s freshness policies set page-age triggers for live crawls, with timeout thresholds that cap latency, so your agent reads today’s version of a page when the task needs it. Currency depends on the task, which is why it carries its own weight in the scoring method.

### Accuracy: can the information be verified?

Look for citations, a stated methodology, internal consistency, and corroboration from independent sources. Trace each number to the original study and confirm the source reports it with the same sample and scope.

Checking each claim by hand doesn’t scale for an agent that reads hundreds of pages. [Basis with calibrated confidences](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) attaches citations, reasoning, excerpts, and a calibrated confidence rating (low, medium, or high) to each output field from the Task API. We’ve found that reviewing only the outputs rated low confidence tends to produce about a 2x reduction in error rate.

### Bias and objectivity: whose point of view is this?

Identify the interests of the author, the publisher, and any sponsor. Separate fact from opinion and check whether the source acknowledges other viewpoints. Ask whether it exists to inform you or to sell you something.

A biased source still has uses. An advocacy group’s report works as evidence of the group’s position, even if you’d look elsewhere for neutral figures. Test your own bias as well by asking whether you’d accept the source if it reached the opposite conclusion.

### Relevance: does the source serve your question?

A strong source can still be worthless for your question. Check that it addresses your exact question at the right depth, for the right population and time period.

Skip sources that repeat what you’ve already cited. If three sources say the same thing, the third adds little to your conclusion. The sixth criterion, uniqueness, measures that redundancy.

## How to calculate a source’s value with a weighted score

The [Meriam Library CRAAP handout](https://library.csuchico.edu/sites/default/files/craap-test.pdf) says “different criteria will be more or less important depending on your situation or need.” It assigns no weights. The university library guides we reviewed stop at questions too, and none of them scores uniqueness.

We propose the method below as a starting point. It’s Parallel’s own rubric, nobody has validated it as a standard, and we’d like you to test it on your sources and adjust it.

```sh
Source value = Σ (weight × score) ÷ 5
```

### 1. Set weights for your task

Assign a percentage to each of six criteria: authority, currency, accuracy, objectivity, relevance, and uniqueness. The weights sum to 100 and encode what the task needs. A literature review puts weight on authority and accuracy, while an agent looking up a current price puts weight on currency.

| Criterion | Literature review weight | Agent pricing lookup weight |
| --- | --- | --- |
| Authority | 25 | 15 |
| Accuracy | 25 | 20 |
| Relevance | 20 | 15 |
| Uniqueness | 15 | 15 |
| Objectivity | 10 | 5 |
| Currency | 5 | 30 |
| Total | 100 | 100 |

### 2. Score each criterion from 1 to 5

Write anchor definitions for scores of 1, 3, and 5 so two reviewers give the same source the same score. These anchors work as a default you can edit.

| Criterion | Score of 1 | Score of 3 | Score of 5 |
| --- | --- | --- | --- |
| Authority | Anonymous, or no relevant expertise | Credible publisher, unclear author expertise | Recognized expert or official body on the topic |
| Currency | Outdated for the task | Dated but usable | Current for the task |
| Accuracy | Fabricated, unverifiable, or contradicted by the original record | Plausible, with some sourcing | Cited, with methods, and corroborated |
| Objectivity | Undisclosed sponsor or sales intent | Disclosed point of view | Balanced, with other views acknowledged |
| Relevance | Off topic, or the wrong population | Related but partial | Answers your exact question |
| Uniqueness | Ten other sources say the same thing | Adds some new detail | Holds information found nowhere else |

Add a knockout rule. An accuracy score of 1 disqualifies the source whatever its total, so a source with strong authority and a wrong number can’t pass.

### 3. Run the uniqueness test

Imagine removing the source and ask whether your conclusion would change or lose evidence. Score 5 when the source holds information you can’t find elsewhere, such as original data or the primary record. Score 1 when ten other sources say the same thing.

This manual test approximates marginal contribution, the change in an outcome when you add or remove one input. AI agents can compute that change with Shapley values.

### 4. Calculate the score and decide

Take an agent pricing lookup and apply the pricing weights. Source A is a retailer’s product page, and Source B is an aggregator blog repeating a price from three months ago.

| Criterion | Weight | Retailer page score | Retailer weighted | Aggregator blog score | Aggregator weighted |
| --- | --- | --- | --- | --- | --- |
| Currency | 30 | 5 | 150 | 2 | 60 |
| Accuracy | 20 | 5 | 100 | 3 | 60 |
| Authority | 15 | 4 | 60 | 2 | 30 |
| Relevance | 15 | 5 | 75 | 4 | 60 |
| Uniqueness | 15 | 5 | 75 | 1 | 15 |
| Objectivity | 5 | 3 | 15 | 3 | 15 |
| Sum | 100 |  | 475 |  | 240 |
| Source value (sum ÷ 5) |  |  | 95 |  | 48 |

The retailer page scores (150 + 100 + 60 + 75 + 75 + 15) ÷ 5 = 95. The aggregator blog scores (60 + 60 + 30 + 60 + 15 + 15) ÷ 5 = 48. A source with a 5 on each criterion would earn 100, and the lowest possible total is 20.

- **75 or higher:** Use the source as is.
- **50 to 74:** Use the source once another source corroborates it.
- **Under 50:** Discard the source.
- **Accuracy score of 1:** Discard the source, whatever its total.

Treat these thresholds as starting points and calibrate them against sources you’ve already judged. In this example, the retailer page goes into context and you discard the aggregator blog.

## How AI agents calculate a source’s value

Agents can measure contribution in a way a human reviewer can’t, because they can rerun the same answer with and without a source. That turns the uniqueness test into a calculation.

We keep credibility and contribution separate, because a source can have a large effect on an answer that turns out wrong. You have to decide how to combine contribution scores with credibility scores, since neither one alone captures the full value.

### Shapley value: what a source adds at the margin

The _Shapley value_ comes from game theory. [Lloyd Shapley’s 1953 paper](https://www.degruyterbrill.com/document/doi/10.1515/9781400829156-012/html), “A Value for n-Person Games,” introduced it to measure each player’s value in a game.

We frame the idea as one question for any source: if you removed this player from the team, how much worse would the outcome be? Contributions aren’t additive, because one player’s impact depends on who else is on the team.

A fair calculation averages each player’s marginal contribution across all possible orderings, and the number of orderings grows so fast that exact computation gets expensive.

In [Data Shapley research](https://proceedings.mlr.press/v97/ghorbani19c.html) presented at ICML 2019, Amirata Ghorbani and James Zou proposed a metric for each training datum’s value to a model’s predictive performance. [MIT’s ContextCite method](https://arxiv.org/abs/2409.00729) tests a source in a model’s context by removing it and measuring how much the response changes. The method costs about 32 times the original inference.

ContextCite measures what drove the response, and its authors note that a source supporting a statement can still receive a low attribution score.

In _retrieval-augmented generation_ (RAG), a model answers from documents it retrieves at query time. Nematov and colleagues’ [2025 study of RAG source attribution](https://arxiv.org/abs/2507.04480), an arXiv preprint, found that exact Shapley values over retrieved documents require 2ⁿ model calls. The attribution methods they tested favored the document holding the direct answer and undervalued documents needed for synthesis.

With the [Index by Parallel launch](https://parallel.ai/blog/introducing-index-by-parallel), we began estimating each source’s Shapley value at the moment of inference and compensating content owners for that contribution.

![Introducing Index by Parallel](https://cdn.sanity.io/images/5hzduz3y/production/c7473cfb2369d422b0d8b53d90108e7c7eddfe8d-480x360.jpg)

_Watch Parallel Web Systems introduce Index by Parallel and its approach to paying sources by contribution._

### The Visibility-Value Gap: frequency isn’t value

For the Visibility-Value Gap study, Parallel’s research team ranked every domain by visibility and by Shapley value. The lists overlap less than you’d think, and the domains fall into four groups.

- **Expected winners:** High visibility and high value.
- **Overexposed:** High visibility and low value, because agents cite them a lot and other pages can replace them.
- **Underrated:** Low visibility and high value, because the answer depends on them when agents do cite them.
- **Long tail:** Low visibility and low value.

The study covers one week of Index activity, and its chart shows the week of May 25, 2026. Parallel’s research team published it on July 31, 2026, and the data skews toward enterprise use cases, so read the rankings as a snapshot of that workload.

Parallel’s research team reports each domain’s value rank and the size of its gap between the two rankings.

| Group | Domain | Value rank | Gap |
| --- | --- | --- | --- |
| Underrated | arxiv.org | 37 | 98 |
| Underrated | homedepot.com | 56 | 64 |
| Underrated | fda.gov | 64 | 51 |
| Underrated | census.gov | 49 | 41 |
| Overexposed | ziprecruiter.com | 90 | 67 |
| Overexposed | scribd.com | 122 | 60 |
| Overexposed | medium.com | 108 | 57 |
| Overexposed | whitepages.com | 135 | 56 |

Uniqueness explains the split. In the report’s words, “Visibility rewards ubiquity, while Shapley value rewards irreplaceability,” so if a hundred sites report the same fact, each one earns little.

Agents rely on arxiv.org for the original finding and on fda.gov for the official record. A retailer like homedepot.com answers narrow product tasks that no other site can.

![Index by Parallel domain check: see what your content is worth to AI agents](https://cdn.sanity.io/images/5hzduz3y/production/8c86b9af97afbc9e65bc8e51ee01ea961b375f6f-3042x1848.png)

The [Pew study of AI summaries](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) tracked Google searches by 900 US adults in March 2025. Users clicked a traditional result link in 8% of visits that showed an AI summary and in 15% of visits without one. Pew’s data shows an association and doesn’t prove the summaries caused the drop.

Many publishers have responded by blocking crawlers. [BuzzStream’s analysis of news sites](https://www.buzzstream.com/blog/publishers-block-ai-study/) checked robots.txt files at 100 top US and UK news sites. It found that 79% block at least one AI training bot.

The Visibility-Value Gap points publishers toward a better target. Original reporting and proprietary data outperform syndicated content in the study, and you should weight uniqueness in your own scoring for the same reason.

### Automating source evaluation in agent pipelines

Research agents weigh hundreds of sources per task, so you need the five criteria and the uniqueness test built into the pipeline. Each human check maps to an API setting or an output field.

- **Retrieval constraints for authority and currency:** Use Search API source control and freshness policies to keep weak domains and stale pages out of context.
- **Extraction for tracing:** Use the Search API to find candidate pages and the Extract API to retrieve focused content from the primary record.
- **Deduplication for uniqueness:** Compare excerpts across results and score down sources that repeat what another source already says.
- **Provenance per field for accuracy:** Have the [Task API](https://parallel.ai/products/task) return structured output with Basis citations, reasoning, excerpts, and calibrated confidence for each field.
- **Confidence routing for review:** Send fields rated low confidence to a human reviewer and let fields rated high pass.

![Basis output in the Parallel platform showing a High confidence rating, reasoning, and cited sources for a field](https://cdn.sanity.io/images/5hzduz3y/production/1785b1aa407618cd2afe07a6c31e46d5ad3a1e64-1280x852.png)

In the screenshot, Basis pairs the “competitors” field with a High confidence rating, its reasoning, and numbered sources with excerpts.

## Quick-reference checklist for calculating a source’s value

| Criterion | Question to ask | Red flag |
| --- | --- | --- |
| Source type | Is it scholarly, popular, or trade, and what is the article type? | You assume peer review from the journal name |
| Authority | Who created it, and what do others say about them? | A polished logo and no record you can verify |
| Currency | Is it current for this task? | No date, or a date too old for the question |
| Accuracy | Can you trace each claim to the original? | Numbers with no source, or broken links |
| Objectivity | Whose interests does it serve? | An undisclosed sponsor or sales intent |
| Relevance | Does it answer your exact question? | Right topic, wrong population or period |
| Uniqueness | Would your conclusion change without it? | Ten other sources say the same thing |
| Final score | Does it clear your threshold? | An accuracy score of 1, or a total under 50 |

## Pricing sources by contribution

For two decades, the web priced content by attention. Agents make it possible to price content by contribution, because you can measure what an answer loses without a source.

Researchers can weight irreplaceable sources in their own scoring. Builders can make agents carry provenance and confidence for each claim, and publishers can aim for uniqueness over reach.

We’re building the Programmatic Web around _transparent attribution_, where agents track and credit each source they use. Publishers who stay open then get paid for what they add.

## Ready to get started?

Build agents that weigh sources and cite each claim with Parallel’s APIs. [Try Parallel](https://platform.parallel.ai/) and run your first search in the platform.

[Contact sales](https://contact.parallel.ai/) to plan an enterprise rollout. [Start building](https://docs.parallel.ai/getting-started/overview) with the documentation.

[Are you an agent? Read this to onboard Parallel](https://parallel.ai/agents.md)

## FAQs about calculating a source’s value

### What is the value of a source in history?

Historians weigh a source’s provenance (who created it, when, and for whom), its proximity to events, its purpose, and its limitations. A biased primary source can still carry value as evidence of its creator’s view. The [Library of Congress primary source guidance](https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/) calls primary sources “incomplete snippets of history,” so each one should send you looking for more evidence.

### How do you evaluate primary sources differently from secondary sources?

For a primary source, check authenticity, origin, creator bias, intended audience, and whether someone edited or translated it. For a secondary source, check how the author uses evidence and citations, and how the interpretation compares with other scholars’ work. Primary sources often score high on uniqueness, and secondary sources tend to add value through synthesis.

### Is Wikipedia a credible source?

Wikipedia works for background reading. [Harvard’s guidance on Wikipedia](https://usingsources.fas.harvard.edu/what%E2%80%99s-wrong-wikipedia), from the Harvard College Writing Program, advises you to rely on the sources Wikipedia cites for research papers instead of Wikipedia itself. Apply SIFT’s trace move and follow each citation to the original.

### How can publishers see what their content is worth to AI agents?

You can [check your domain on Index](https://index.parallel.ai/) to see which queries your content answers, how often agents reference it, and how unique its contribution is. We calculate compensation from each source’s estimated Shapley value, so content that’s unique and hard to replace earns more.

By Parallel / October 12, 2026

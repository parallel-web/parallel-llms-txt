# What makes a source irreplaceable?

A source is irreplaceable when removing it makes the answer worse, because it holds information no other source can supply. Trust alone doesn’t get a source there, since a reliable page that repeats a fact from a hundred other pages adds little. This guide covers the four traits of an irreplaceable source, how AI agents measure them, and a four-step test you can run on your own sources.

_Irreplaceability_ means non-substitutability, and you measure it by _marginal contribution_, the change in an outcome when you add or remove one contributor. Our research frames this as a removal test: “If you removed this player from the team, how much worse would the outcome be?” We borrowed the question from the Shapley value, a game theory method for dividing credit within a team.

The test became practical once _AI agents_, software that reads the web on a person’s behalf, began consulting sources at a scale you can log. Our research sums up the result: “Visibility rewards ubiquity, while Shapley value rewards irreplaceability.” We drew that finding from one week of Index by Parallel activity, and the data skews toward enterprise use cases.

## Why popularity stopped measuring source value

For two decades, publishers priced content by attention, counting pageviews and impressions. The implicit bargain with search engines, in our words, was “let me crawl your pages, and I will return readers.” In our essay on [why the traffic bargain broke](https://index.parallel.ai/about), we argue that an agent can extract value from a page without generating a pageview.

Pew Research Center tracked 900 U.S. adults across 68,879 Google searches in March 2025. In [Pew Research Center’s click analysis](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/), users who saw an AI summary clicked a traditional result in 8% of visits, versus 15% without one. They clicked a link inside the summary in 1% of visits. We read the data as an association, since it doesn’t establish that AI summaries cause fewer clicks.

According to [Cloudflare’s crawl-to-click data](https://blog.cloudflare.com/crawlers-click-ai-bots-training/), training drives nearly 80% of AI bot activity. Cloudflare counted 38,000 crawls by Anthropic for every visitor Anthropic referred in July 2025. Exposure no longer converts into traffic, so traffic can’t price a source’s contribution.

Some sources appear in a large share of answers and add little, while others appear in a handful and decide the outcome. Agents log what they read, so you can measure each source’s contribution.

## Reliable vs. visible vs. irreplaceable sources

Reliability asks whether you can trust a source, and visibility asks how many answers it appears in. Irreplaceability asks whether the answer suffers without it.

| Lens | Question it answers | How you measure it | Example of a high score that’s replaceable |
| --- | --- | --- | --- |
| Reliability | Can you trust this source? | Criteria such as currency and authority | A reputable outlet restating a fact that a hundred other outlets carry |
| Visibility | How many answers does this source appear in? | Citation or retrieval counts | An aggregator cited across many answers for content that exists elsewhere |
| Irreplaceability | Does the answer get worse without this source? | Marginal contribution, such as a Shapley value | Doesn’t apply, since a high score means no substitute exists |

A reliable source can be replaceable when a hundred other reliable sources say the same thing. Our research agrees: “If a hundred sites report the same fact, each earns very little, even if all hundred are cited often.” Treat reliability as the entry requirement, then put the removal question to each source that clears it.

## What makes a source reliable

Reliability is the baseline each irreplaceable source has to clear. [Meriam Library’s CRAAP test](https://library.csuchico.edu/sites/default/files/craap-test.pdf) from California State University, Chico, scores a source on Currency, Relevance, Authority, Accuracy, and Purpose.

The University of Chicago Library teaches [the SIFT method](https://guides.lib.uchicago.edu/c.php?g=1241077&p=9082322), developed by digital literacy expert Mike Caulfield. You stop, investigate the source, find better coverage, and trace claims back to their original context.

Both tests ask whether you can trust a source and stop there. None of the current source evaluation guides we reviewed ask whether an answer degrades when you remove the source.

Agents need reliable sources because a model’s _parametric memory_, the knowledge it absorbed in training, is lossy and stale. Our essay on [the web as ground truth](https://parallel.ai/the-web-as-ground-truth) explains that retrieved context can be exact and current, with a source you can trace.

## The four traits of an irreplaceable source

Our research names uniqueness as the mechanic behind the gap between visibility and value. Marginal contribution collapses when information is substitutable, so a source earns credit for what other sources lack. We see four routes to uniqueness, and one source can take several of them.

### It’s the origin of the information

The [Library of Congress definition of primary sources](https://ask.loc.gov/faq/303148) calls them first-hand records made by participants in an event or witnesses to it. Secondary sources summarize and interpret those records after the fact.

In our data, arxiv.org ranked 37th by value, and its visibility rank trailed by 98 places, the largest gap in the underrated group. ArXiv is the original location of a finding, in some cases months or years before other outlets restate it. An agent that needs the actual number, instead of “a paraphrase of a paraphrase,” has one place to get it.

### It’s the authoritative record

Plenty of sites describe a drug approval, but the FDA’s own record settles what the agency decided. Our research calls that record “the fact rather than a report about the fact,” and fda.gov “wins almost every dispute about what’s actually true.”

[FDA’s approved drug resources](https://www.fda.gov/drugs/drug-approvals-and-databases/resources-information-approved-drugs) list what Drugs@FDA holds, including regulatory history, current prescribing information and labeling, and FDA staff reviews. In our data, fda.gov (value rank 64, gap 51) and census.gov (value rank 49, gap 41) sit in the underrated group. We read that as agents turning to the record when sources conflict.

### It carries live, specific data

Our research uses homedepot.com to show the third route. An agent might need a specific refrigerator’s price today, or whether a SKU (stock keeping unit) is in stock. Those tasks form a small share of agent work, and we call them “a kind of task nothing else can answer.”

In our data, homedepot.com ranked 56th by value with a gap of 64, and target.com ranked 44th with a gap of 36. Only the retailer’s own page has today’s price.

### It adds first-hand expertise or proprietary data

Our research recommends uniqueness as the target for creators: “original reporting, proprietary data, and first-hand expertise outperform syndicated content.” We saw local news punch above global news on the agentic web, and niche Substack categories outcompete traditional outlets.

In [Medill’s State of Local News findings](https://www.medill.northwestern.edu/news/2025/news-deserts-hit-new-high-and-50-million-have-limited-access-to-local-news-study-finds.html), Northwestern’s Medill Local News Initiative counted 213 U.S. news desert counties in 2025. Another 1,524 counties had one remaining source, and in total about 50 million Americans had limited or no access to local news.

Two publisher perspectives make the same case, and both come from organizations with a commercial stake in original reporting. In [A.G. Sulzberger’s essay on AI and journalism](https://www.nytco.com/press/a-i-journalism-and-the-uncertain-future-of-the-public-square/), The New York Times publisher writes that “original reporting is very often how you know what you know.”

Kristin Heitmann, Chief Revenue Officer at AP, makes [AP’s case for eyewitness journalism](https://www.ap.org/the-definitive-source/speaker-spotlights/powering-the-ai-information-era-with-factual-journalism/) from the same stakeholder position. “We are often the first on the ground as eyewitness journalists to report on something,” she says.

## How AI agents measure irreplaceability

The _Shapley value_ is a game theory method that credits each player by its average marginal contribution across every combination of the team. Lloyd Shapley introduced it in “A Value for n-person Games,” and [Lloyd Shapley’s Nobel profile](https://www.nobelprize.org/prizes/economic-sciences/2012/shapley/facts/) notes his share of the 2012 Prize in Economic Sciences. The prize honored “the theory of stable allocations and the practice of market design,” and the application to web content is ours.

In our application, a source is valuable to the degree that answer quality would suffer without it. In [Parallel’s visibility-value gap research](https://index.parallel.ai/the-visibility-value-gap), we ranked every domain two ways, by visibility and by Shapley value. Visibility counts the times a domain’s pages surface when an AI system looks for answers.

The two lists overlap less than you’d expect. For the week of May 25, 2026, we tracked 381 domains and plotted 219 of them in the chart.

![Parallel scatter plot of domains by AI visibility versus Shapley value for the week of May 25, 2026, divided into expected winners, overexposed, underrated, and long-tail quadrants](https://cdn.sanity.io/images/5hzduz3y/production/c14aa8665054193bfdc2f4b96a288a01ee7cc5d3-2716x1962.png)

_Source: Parallel’s research team, “The Visibility-Value Gap,” July 31, 2026._

We sorted the plotted domains into four quadrants.

| Quadrant | Visibility | Value | What we observed |
| --- | --- | --- | --- |
| Expected winners | High | High | Domains that surface in many answers and carry weight in them |
| Overexposed | High | Low | Domains that surface in many answers and add little marginal value |
| Underrated | Low | High | “When they are cited, the answer depends on them” |
| Long tail | Low | Low | Domains with limited reach and limited contribution in the sample week |

The most underrated domains, with value rank and the gap to visibility rank:

- arxiv.org (value rank 37, gap 98)
- homedepot.com (value rank 56, gap 64)
- fda.gov (value rank 64, gap 51)
- fsri.org (value rank 70, gap 43)
- census.gov (value rank 49, gap 41)
- target.com (value rank 44, gap 36)

The most overexposed domains, on the same measures:

- ziprecruiter.com (value rank 90, gap 67)
- scribd.com (value rank 122, gap 60)
- medium.com (value rank 108, gap 57)
- whitepages.com (value rank 135, gap 56)
- investing.com (value rank 107, gap 52)
- globaldata.com (value rank 117, gap 51)

Those numbers describe one week of agent behavior in an enterprise sample. We read them as evidence that popularity and value diverge in measurable ways, and more weeks of data would show whether each quadrant holds.

Publishers can’t see their contribution to agent work in pageview reports. Index by Parallel pays participating content owners by estimated Shapley value at the moment of inference, so content that’s hard to replace earns more. For the method, see [how Index calculates compensation](https://parallel.ai/blog/introducing-index-by-parallel).

## How to test whether a source is irreplaceable

You can run this four-step test on the sources your agent relies on or on your own content.

### 1. Run the removal test

Ask what the answer loses if this source disappears. If the answer stays the same, the source is replaceable for that question. Our research notes that “a player might appear redundant in one coalition and indispensable in another,” so test each source against each question.

### 2. Trace every claim to its origin

Follow each fact back to the page where it first appeared. If the source cites someone else for its key claims, the original is the irreplaceable one. AI search tools misattribute copies, which makes the original harder to find and more important to verify.

In [Tow Center’s citation accuracy study](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php), Columbia’s Tow Center for Digital Journalism ran 1,600 queries across eight AI search tools in March 2025. The tools failed to identify the correct source article, publisher, or URL more than 60% of the time. The study covered only news citations, but it’s a reason to trace a citation before you trust it.

### 3. Search for substitutes

Look for other pages that carry the same fact. Many matches mark the information as a commodity, and few or none mark the source as a candidate for irreplaceability.

With [Parallel’s Search API](https://parallel.ai/products/search), you state the claim as a natural language objective and get ranked URLs with dense excerpts. You then use [the Extract API](https://parallel.ai/products/extract) to pull each page’s content, including PDFs and JavaScript pages, and compare what each page adds. Treat a low substitute count as a hypothesis until you’ve checked it against the origin.

Guides we reviewed on what makes content valuable to AI list originality as a pillar without counting the sources that carry each claim. We think a per-claim count of substitute pages is worth pursuing as a research direction.

### 4. Verify with citations and confidence

If you build agents, you need them to show which source each claim came from. Basis gives each Task API output [citations with calibrated confidence](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences), plus the reasoning and excerpts behind them. If you review the Low confidence outputs alone, you can expect about a 2x reduction in error rate in typical cases.

Source Policy works in the Search API and Task API. You can use it to [control which sources agents use](https://parallel.ai/blog/source-policy) by including or excluding domains, for example to keep agents on primary and authoritative sources.

## Signs a source is replaceable

- **Syndicated or rewritten content:** The page restates what the origin already published.
- **Aggregation without new data:** Lists and roundups repackage primary information and add none of their own.
- **Stale data:** The origin has updated the information, and the copy hasn’t caught up.
- **Locked away from the readers that matter:** Agents can’t draw on content they can’t access, which limits what the source contributes.

Several overexposed domains in our research, such as scribd.com, medium.com, and whitepages.com, host or aggregate content that exists elsewhere. We describe the group as “cited constantly, but easily substituted.”

Our research observes that domains behind heavy paywalls can see their Shapley values collapse while their visibility grows.

## How to become an irreplaceable source

If you want agents to depend on your content, aim for uniqueness: publish original findings first, own the record for your domain, keep specific data current, and add first-hand expertise.

Google asks the same of publishers. [Google’s people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks, “Does the content provide original information, reporting, research, or analysis?” Google’s May 15, 2026 resource, [Google’s guidance for generative AI features](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing), stresses “valuable, unique, non-commodity content.”

Make your content easy for AI systems to reach and parse. Our explainer on [what llms.txt does](https://parallel.ai/articles/llms-txt) covers a plain text file that gives language models a map of your key pages.

You can [check your domain on Index](https://index.parallel.ai/) to see which queries your content answers and how unique its contribution is. The same check counts the times agents reference your content.

Participating publishers earn based on contribution, and you can [join Index as a publisher](https://index.parallel.ai/join).

## The path forward for source value on the agentic web

Agents make contribution measurable, and we’re building infrastructure that credits and pays sources for what they add to an answer. An irreplaceable source originates findings, holds the authoritative record, carries live and specific data, or adds first-hand expertise. You can confirm which of your sources qualify with the removal test, origin tracing, a substitute search, and cited confidence.

Ready to get started? [Start building](https://docs.parallel.ai/getting-started/overview) with Parallel’s APIs and ground your agents in the sources their answers depend on.

## FAQs about irreplaceable sources

### What makes a source not reliable?

A source fails reliability when it’s out of date, lacks a clear author or institution, contains errors, or exists to sell or persuade without disclosure. Those are the CRAAP criteria in reverse.

### Does blocking AI crawlers make content more irreplaceable?

Blocking controls access, and it leaves the uniqueness of the information unchanged. In [Press Gazette’s AI bot blocking analysis](https://pressgazette.co.uk/platforms/eight-in-ten-of-worlds-biggest-news-websites-now-block-ai-training-bots/), Press Gazette found that 79% of almost 100 top UK and US news websites blocked at least one AI training crawler in January 2026. We read blocking as an access trade-off, since the data shows no causal loss of value.

An agent can’t credit a source it can’t read, so each publisher weighs access against control. If you publish, you can set rules for Parallel’s crawler in robots.txt, and our guide explains [how publishers manage ShapBot access](https://parallel.ai/parallel-web-systems-bots).

### Can a source stay irreplaceable forever?

Irreplaceability depends on what else exists, so a source can lose it. Other outlets can restate a finding that started on arXiv, and live data goes stale. Repeat the test on a schedule, and if you build agents, the Monitor API can track when sources change and send webhook alerts.

### What makes a person irreplaceable, and does it apply to sources?

Career advice on irreplaceable people centers on a unique contribution that others struggle to replicate. The same logic applies to sources: measure what the answer loses without them.

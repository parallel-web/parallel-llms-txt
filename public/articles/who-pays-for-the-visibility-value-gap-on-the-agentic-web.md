# Who pays for the visibility-value gap on the agentic web

The visibility-value gap on the agentic web is the difference between how often AI systems surface a source and how much that source adds to their answers. This article covers who pays for that gap, why citation counts can’t close it, how Index by Parallel prices contribution, and how to find where your own site sits.

_Parallel’s research team measured how often AI agents surface each source and how much each one adds. See who pays for the visibility-value gap and how to close it._

## Who pays for the visibility-value gap?

The visibility-value gap is the distance between how often a domain appears in AI results and how much value it adds, measured as Shapley value. Underrated sources pay through lost credit, publishers through lost traffic, and agent builders through worse answers as sources close off. [The visibility-value gap study by Parallel’s research team](https://index.parallel.ai/the-visibility-value-gap), published July 31, 2026, measured that gap, and the fix is to pay each source for its contribution.

The _agentic web_ is the web as AI agents read and use it for people who never open the page. _Shapley value_ is a method from game theory that gives each player a share of a team’s outcome based on marginal contribution. Applied to content, it asks how much worse an answer gets if you remove one source.

We ranked every domain two ways, by how often it shows up in AI results and by how much value it contributes to them. The two lists overlap less than you’d think, so exposure alone can mislead you about a domain’s worth to an agent.

## Two questions the web never had to separate

For two decades, pageviews, rankings, and impressions set the price of content. That model worked because a crawler’s visit came before a human’s visit, and publishers earned their money from the human. Agents read the page and answer the question, and the human never arrives, which is [why the traffic bargain broke](https://index.parallel.ai/about).

Our research notes that most measurement of the open web “has only ever asked one question: how much attention did the content get?” Agents make a second question measurable, which is how much a source contributed to the answer.

We define _visibility_ as how often a domain’s pages surface when an AI system looks for answers. _Value_ is the domain’s Shapley value, its share of the value created based on marginal contribution. The Shapley method asks of each player, “If you removed this player from the team, how much worse would the outcome be?”

Agents pick sources for what a page says, so we can measure contribution apart from exposure. Matthew Prince, co-founder and CEO of Cloudflare, wrote in [Cloudflare’s Content Independence Day post](https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/) that “traffic was always a poor proxy for value.” His July 1, 2025 post doesn’t mention Shapley value, but our data shows the two metrics diverging where pricing goes wrong.

## What the visibility-value gap looks like

Parallel’s research team plotted each domain by AI visibility and by value in dollars per week. The plot splits domains into four groups:

- **Expected winners:** High visibility and high value. Agents surface these sources and depend on them.
- **Overexposed:** High visibility and low value. These sites are “cited constantly, but easily substituted.”
- **Underrated:** Low visibility and high value. Agents surface them less, but “when they are cited, the answer depends on them.”
- **Long tail:** Low visibility and low value. These domains surface for few queries and contribute little.

![Scatter chart from Index by Parallel plotting domains by AI visibility exposure versus value in dollars per week, divided into four quadrants: expected winners, overexposed, underrated, and long tail. Week of May 25, 2026.](https://cdn.sanity.io/images/5hzduz3y/production/f7ac7b35fcde66a59a20f81a0dc953e9d5d1f982-2972x2024.png)

_Source: Index by Parallel, The Visibility-Value Gap (week of May 25, 2026)_

The table lists the six most underrated and the six most overexposed domains in the study. For underrated domains, the gap is how many places the value rank outruns the visibility rank. For overexposed domains, it’s how many places the visibility rank outruns the value rank.

| Domain | Group | Value rank | Gap |
| --- | --- | --- | --- |
| arxiv.org | Underrated | 37 | 98 |
| homedepot.com | Underrated | 56 | 64 |
| fda.gov | Underrated | 64 | 51 |
| fsri.org | Underrated | 70 | 43 |
| census.gov | Underrated | 49 | 41 |
| target.com | Underrated | 44 | 36 |
| ziprecruiter.com | Overexposed | 90 | 67 |
| scribd.com | Overexposed | 122 | 60 |
| medium.com | Overexposed | 108 | 57 |
| whitepages.com | Overexposed | 135 | 56 |
| investing.com | Overexposed | 107 | 52 |
| globaldata.com | Overexposed | 117 | 51 |

Specific findings often appear first on arxiv.org, which gives the site priority. The FDA publishes its records directly on fda.gov, and no summary elsewhere carries the same authority.

Home Depot’s site holds the live price and stock of a specific SKU (stock keeping unit), which no other page can answer. In our data, primary records and live inventory carry outsized value, and sites such as scribd.com and medium.com carry outsized visibility.

The study draws on one week of recent Index activity, and the chart covers the week of May 25, 2026. The data skews toward enterprise use cases, and we expect the picture to broaden toward consumer interest.

## Who pays, and how

If you price content on visibility, value flows to the sites agents see most and away from the sites they need most. Underrated sources, publishers, and agent builders each absorb part of that cost.

### Underrated sources pay first

Under attention pricing, overexposed sites capture value that underrated sites create. In our data, that underrated group includes primary research, government records, and specialist sources such as fsri.org. Parallel’s research team found that local news punches above global news on the agentic web, and some niche Substack categories outcompete traditional outlets.

Survey data suggests bilateral licensing reaches local and smaller publishers least. The [Reuters Institute’s 2026 trends report](https://reutersinstitute.politics.ox.ac.uk/journalism-media-and-technology-trends-and-predictions-2026) surveyed 280 digital leaders in 51 countries. Of those, 20%, led by upmarket publishers, expect substantial AI licensing revenue.

Another 20%, a group dominated by local publishers, public broadcasters, and publishers in smaller countries, expect no income from AI deals. Those figures describe expectations, and the Reuters Institute reports that deal terms remain opaque.

The [Tow Center’s Journalism Zero report](https://www.cjr.org/tow_center_reports/journalism-zero-how-platforms-and-publishers-are-navigating-ai.php) found that as of May 2025, Meta and Google had each signed one AI deal with a news publisher. Reported deals cluster among large publishers, and in our view that concentration mirrors the concentration of visibility.

### Publishers pay when traffic stops coming back

Google users who see an AI summary click fewer links than users who don’t see one. [Pew Research Center’s browsing study](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) tracked the Google searches of 900 US adults in March 2025. Users who saw an AI summary clicked a traditional result in 8% of visits, compared with 15% of visits without one.

Those users clicked a link inside the summary in 1% of visits. Pew’s study is observational, so the fair reading is that AI summaries are associated with fewer clicks to sources.

A _crawl-to-refer ratio_ compares the pages an AI platform’s crawlers request with the visits that platform sends back to sites. [Cloudflare’s crawl-to-refer breakdown](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/) put the ratio at nearly 50,000:1 for Anthropic, 887:1 for OpenAI, and 118:1 for Perplexity. Cloudflare took those figures from a snapshot of the first week of August 2025, and news sites showed lower ratios.

TollBit uses a different sample and definition. [TollBit data reported by Digiday](https://digiday.com/media/european-publishers-are-getting-hit-harder-by-ai-bot-scraping-report-finds/) shows European publishers got one AI app referral for every 179 AI bot visits in the first half of 2026. That ratio comes from European publishers on TollBit’s network, so it doesn’t describe other regions.

In our Index essay, we wrote that “increasingly, a crawler is the visit.” Those ratios show AI platforms sending back a small fraction of the visits their bots request.

### Agent builders and their users pay when sources close

Publishers respond with the tools they have. [BuzzStream’s analysis of news sites](https://www.buzzstream.com/blog/publishers-block-ai-study/) found that 79% of about 100 top US and UK news sites block at least one AI training bot. The same vendor study of robots.txt files found 71% block at least one retrieval bot, though robots.txt states a request and doesn’t enforce it.

Paywalls create a second problem. Parallel’s research team found that domains with heavy paywalls can see their Shapley values collapse while their visibility keeps rising. We expect agents that can’t reach these sources to lean on substitutable ones, which weakens answers for the developers and end users who rely on them.

Blocking is rational without a value exchange, and everyone downstream pays for it. We include [Index Partner data in Parallel](https://parallel.ai/blog/data-connectors) retrieval by default, so your agents reach licensed sources that blocking would take away. We pay Index Partners through a model based on Shapley value.

## Why citation counts can’t close the gap

Swapping pageviews for citation counts or crawl counts keeps the same flaw. Each one counts an event, and none measures what changed in the answer.

The gap comes from uniqueness. Parallel’s research team found that “if a hundred sites report the same fact, each earns very little, even if all hundred are cited often.” Visibility rewards a source for appearing everywhere, while Shapley value rewards a source that’s hard to replace.

Cloudflare reached a similar conclusion. In a July 1, 2026 post on [Cloudflare’s Pay Per Use experiments](https://blog.cloudflare.com/making-ai-search-smarter/), the company called crawling “a crude measure of value.” Cloudflare noted that a crawler might fetch a page once while thousands of answers cite it.

Patel, Zhou, and Fanti’s [MaxShapley attribution research](https://arxiv.org/abs/2512.05958), a December 2025 preprint, calls for “fair mechanisms to attribute and compensate content providers.” The authors note that exact Shapley values carry an exponential compute cost. MaxShapley, a special case of the Shapley value, computes attributions in polynomial time in the number of documents. The authors report up to a 9x cut in resource use over prior methods at the same attribution accuracy.

Contributions are entangled and depend on order, so the Shapley method averages each source’s marginal contribution across combinations of sources. Payment based on counts favors the sites that appear everywhere, the overexposed quadrant.

As a research direction, we propose worked examples that split one answer’s value across its sources and compare Shapley value with citation counts.

## The missing layer is contribution accounting

We treat the gap as an infrastructure problem, because policy and intent can’t price a source without a measurement. Standards for licensing terms and content monetization have started to appear.

The RSL Technical Steering Committee calls the [RSL 1.0 licensing standard](https://rslstandard.org/press/rsl-1-specification-2025) “an industry-first, open web standard” for publishers and creators to define licensing terms. The group published version 1.0 on December 10, 2025.

IAB Tech Lab finalized CoMP (Content Monetization Protocols) v1 on April 28, 2026, according to [IAB Tech Lab’s CoMP framework](https://iabtechlab.com/comp/) page. IAB says CoMP isn’t a marketplace and doesn’t define the economic models for value exchange. Neither the RSL 1.0 specification nor IAB’s CoMP v1 materials mention Shapley value.

Our inference, and it’s ours alone, is that valuation per source remains the open layer. Publishers can set terms and systems can transact, but nothing in these standards says what each source is worth.

Contribution accounting needs provenance that connects retrieval with the final answer. You need to know which sources shaped an output and by how much, with a confidence attached to each. Our [Basis verification framework](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) attaches citations, reasoning, excerpts, and calibrated confidences to outputs, so you can trace the sources behind an answer.

We build for [the web’s second user](https://parallel.ai/about), the AI agent. We think transparent attribution and open markets based on value serve that user and the publishers it depends on.

## How Index changes who pays

We [launched Index by Parallel](https://parallel.ai/blog/introducing-index-by-parallel) on May 19, 2026. Any site owner can enter a domain to see which queries their content answers, how often agents reference it, and how unique its contribution is.

Index bases compensation on each source’s Shapley value at the moment of inference, so content that’s unique or hard to replace earns more. Our launch release says Index considers “the value of the agent work and each source’s contribution” instead of paying for access, crawls, or citations alone.

We built Index from the demand side. Parallel serves over 100,000 developers, and Index turns their agents’ activity into a transparent market. We designed the platform to be open to agents built outside Parallel. We plan to open self-serve participation, so a source won’t need the scale to negotiate a bilateral deal.

Parag Agrawal, Parallel’s founder and CEO, made the case in the [Index launch announcement](https://www.prnewswire.com/news-releases/parallel-launches-index-a-new-model-for-compensating-content-owners-302775367.html). “If that value can be measured and shared based on contribution in an open and transparent way, AI can expand the market for high-quality content rather than diminish it,” Agrawal said.

Launch partners include The Atlantic, Fortune, and independent creators such as Azeem Azhar of Exponential View. The Index homepage lists monetization as “Coming Soon,” and any site owner can check a domain today.

You can watch the launch walkthrough below.

![Introducing Index by Parallel](https://cdn.sanity.io/images/5hzduz3y/production/c7473cfb2369d422b0d8b53d90108e7c7eddfe8d-480x360.jpg)

## How to find out where your site sits

You can place your site on the visibility-value chart with a few checks. Traffic and citation dashboards show exposure alone, so start with contribution data to learn whether agents depend on your content.

1. Check your domain on Index to [see what your content is worth](https://index.parallel.ai/). The dashboard shows the queries you answer, agent references, and uniqueness.
2. Compare your visibility signals with your value signals. High citations with low uniqueness point to overexposure, and low impressions with high value point to an underrated site.
3. Audit which of your facts exist on your site and nowhere else. Facts that repeat across many pages are substitutable. The [Parallel Search API](https://parallel.ai/products/search) finds the pages that cover your topic for an objective you write in plain language. The [Extract API](https://parallel.ai/products/extract) returns their content as clean markdown. Compare those pages with yours to see which claims repeat everywhere.
4. Invest in what’s irreplaceable. Our research found that “original reporting, proprietary data, and first-hand expertise outperform syndicated content.”

As an example, [arxiv.org’s public Index preview](https://index.parallel.ai/preview/arxiv.org) shows April 2026 scores of 73 for impressions, 74 for citations, 100 for value, and 76 for uniqueness.

![Index by Parallel preview dashboard for arxiv.org showing April 2026 scores: impressions 73, citations 74, value 100, and uniqueness 76.](https://cdn.sanity.io/images/5hzduz3y/production/b05d65a7582f491d1b56064637809c3b685587e8-1100x820.png)

_arxiv.org’s public Index preview, April 2026_

Parallel’s research team states that “on the agentic web, uniqueness is a better target.” To leave the overexposed quadrant, publish facts other sites don’t have.

## Should you block AI crawlers?

Block agents that take your content with no value exchange, and keep access open to agents that pay on contribution. Blocking a free rider is rational, but it also removes you from the measurement that would show your value.

Parallel’s crawler, ShapBot, respects robots.txt, and you can read [how ShapBot accesses content](https://parallel.ai/parallel-web-systems-bots). Restricting ShapBot removes your content from Parallel’s index and can reduce your visibility through Parallel’s APIs.

Before you block specific agents, compare that choice with a market that pays on contribution. We recommend sorting agents into those that pay for contribution and those that don’t, then setting robots.txt rules for each group.

## The path forward: pay for what the answer needed

Publishers and agent builders face the same two questions: can you see what agents do with your work between visits, and who pays when you can’t?

The web has priced content on attention. We’re building toward pricing on contribution, where agents pay sources for what each answer needed and staying open is the better economic choice for publishers.

**Ready to get started?**

- **Content owners:** [Join the Index](https://index.parallel.ai/join) to see how agents use your work.
- **Teams evaluating Parallel:** [Try Parallel](https://platform.parallel.ai/) in the developer platform.
- **Enterprise buyers:** [Contact sales](https://contact.parallel.ai/) to discuss your use case.
- **Developers:** [Start building](https://docs.parallel.ai/getting-started/overview) with Parallel’s APIs.
- **AI agents:** [Are you an agent? Read this to onboard Parallel](https://parallel.ai/agents.md) to set up access.

## FAQs about the visibility-value gap

### Is the visibility-value gap the same as the “visibility gap” in comp plans or value-based care?

In [Dolfin’s post on comp plan visibility](https://www.heydolfin.com/blog/comp-plan-visibility-gap-assessment), the compensation software company uses “visibility gap” for employees who can’t see, trust, or predict how a sound pay plan applies to them. CareAlly CEO Ernie Ianace uses it in [CareAlly’s post on value-based care](https://www.careally.ai/post/the-visibility-gap-in-value-based-care) for healthcare organizations that must show outcomes they can’t observe over time. Our term compares how often AI surfaces a source with how much that source contributes. The shared idea is value that the people who must act on it can’t see.

### Does a high AI visibility score mean my content is valuable to agents?

A high visibility score can sit alongside low value. In the study by Parallel’s research team, the overexposed quadrant holds sites with high visibility and low value, which agents cite at a high rate and replace with ease. Your value depends on how much worse an answer would be without your content.

### Who should be responsible for closing the visibility-value gap?

Both sides of the market share the job. Agent builders and their infrastructure providers control the provenance that measures contribution, and content owners control access and what they publish. A shared, transparent attribution layer lets the two sides meet without a bilateral meeting for every deal.

### Can small publishers and independent creators earn under a contribution model?

Small publishers and independent creators can earn if their content is hard to replace, and Index lists monetization as “Coming Soon.” The Index homepage states that “the Shapley math doesn’t care about brand size.” A writer with unique, authoritative expertise can earn more per citation than a large publication with commodity coverage.

By Parallel, October 12, 2026

# How Eve brings trusted research directly into plaintiff casework, powered by Parallel

Eve brings current, cited research from firm-approved sources into plaintiff casework for 1,200+ law firms, powered by Parallel.

## Key highlights

- **Research embedded in casework:** Eve combines access to current legal, medical, regulatory, and benefits information with live case context
- **Proven adoption:** 1,200+ law firms use Eve Research every month, with Parallel’s Search and Extract APIs powering every web search
- **Trusted, secure sources:** Zero data retention and SOC 2 Type 2 certification, with curated source collections that prioritize reputable domains like PubMed and Mayo Clinic

## About Eve

Eve is the AI operating system that plaintiff law firms use across the entire case lifecycle to handle more cases, reduce time on desk, and increase settlement values. Over 1,700 firms work on Eve, and Eve’s AI has been used in 350,000+ cases to help recover $3.5B+ in settlements and verdicts. Eve is headquartered in San Francisco and raised a $103M Series B led by Spark Capital, with Andreessen Horowitz, Lightspeed Venture Partners, and Menlo Ventures.

## The strongest cases start with the full picture

Building a strong plaintiff case requires connecting information across disciplines. Legal precedent matters, but so do medical findings, regulatory guidance, benefits requirements, and the facts of the individual case. Attorneys need to bring all of that information together to build compelling arguments and move cases forward.

That’s why research is most valuable when it’s connected to the work itself. Eve operates within the context of each case, bringing together firm documents, medical records, police reports, and other matter-specific information. By embedding research directly into that workflow, Eve helps attorneys access trusted information and put it to use without moving between disconnected tools.

The challenge is that much of the information attorneys need lives outside the case file and is constantly changing. For example, the VA updates its M21-1 claims manual throughout the year. Social Security adjusts its disability earnings limits every January. States like California reset workers’ comp benefit rates every year, and California revises its civil jury instructions at least twice a year.

Attorneys used to download these resources and keep their own copies, which went stale. And an AI model alone can’t reliably fill that gap: its training data has a cutoff, and it can’t independently establish the current primary source behind an answer.



![](https://cdn.sanity.io/images/5hzduz3y/production/f59beb4cfde655b315530102ef1177ff9de856c4-2240x1192.png)

> “Accuracy is paramount. The stakes are high when someone with serious medical issues and medical debt needs help. Whether it’s medical research or guidelines from the VA or the Social Security Administration, attorneys need accurate information from sources they trust, with citations as proof.”
>
> — Mauricio Wulfovich, Staff Machine Learning Engineer

## Building Eve Research on Parallel

Mauricio built an early version of Eve Research at an internal company hackathon. He then teamed up with attorney Peter Bales and engineer Austin Hwang to turn it into a product and roll it out to Eve’s customers. Eve Research has two parts. A dedicated database covers case law, statutes, and regulations, and Parallel powers Eve’s access to the open web.

**Choosing a web layer.** Eve chose Parallel’s Search and Extract APIs, since it had already built its own agent and chat interface. Search finds the right pages, and Extract pulls the relevant sections from them, so answers reflect what the source actually says. The team also weighed the built-in web search from model providers. Ultimately, Eve wanted a model-agnostic web layer it could use across providers, plus control over which sources its agent reads, and Parallel supported both.

**Collections of firm-approved sources.** Attorneys need to know an answer came from a source they would cite themselves. Eve organizes its web research into collections of firm-approved sources, so every answer draws on domains attorneys already rely on, and firms trust the results from the first search.

Eve builds these collections on Parallel’s [Source Policy](https://parallel.ai/blog/source-policy) controls:

- **Pre-built collections** include Medical Research, Academic Literature, Business Filings, and Civil Jury Instructions. A medical question draws on sources like PubMed, Mayo Clinic, and Cleveland Clinic instead of general health sites.
- **Custom collections** work like bookmark folders for the sources a firm relies on. A firm handling veterans’ benefits claims can build a collection around the VA’s M21-1 claims manual, so every benefits question draws on the current version.

Attorneys pick a collection, or Eve suggests one based on the question. The answer comes back with links to the official sources behind it, and the attorney can open each one to confirm what it says.

## Trusted with privileged data: security and compliance at every layer

Firms trust Eve with attorney-client privileged information and medical records, so every vendor behind Eve has to meet the same bar. Parallel runs with zero data retention for every Eve customer, and Parallel’s SOC 2 Type 2 certification was part of Eve’s vendor review.

> “Our customers depend on us to keep their data secure and compliant, and zero data retention is critical for the firms we serve. We can rely on Parallel to uphold the same standards we hold ourselves to.”
>
> — Mauricio Wulfovich, Staff Machine Learning Engineer

## The impact

Eve rolled web search powered by Parallel out to its full customer base in June 2026. Today, 1,200+ law firms, about 7 in 10 Eve customers, use Eve Research every month.

With research embedded directly into Eve, attorneys spend less time searching for information and moving between tools, and more time putting that information to work. Whether supporting an argument with medical literature or applying the latest benefits guidance, they can build stronger cases and move work forward faster, with trusted sources they can verify.

And because Parallel sits underneath as one web layer, Eve can adopt new models without rebuilding its research.

> “Attorneys don’t ask Eve for medical research for its own sake. They’re evaluating a case, proving causation, valuing a claim or preparing for a deposition, and the research is what makes that work hold up. With Parallel, Eve pulls it from the sources firms trust as part of the work itself.”
>
> — Mauricio Wulfovich, Staff Machine Learning Engineer

## What’s next

Eve’s Auditor and Agents already work in the background, flagging new medical records that point to a traumatic brain injury or drafting a demand letter once a client finishes treatment and the records and bills are in.

As Eve makes Eve Research more proactive, Parallel remains Eve’s connection to the live web.

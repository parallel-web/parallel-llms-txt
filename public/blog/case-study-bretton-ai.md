# How Bretton runs AI compliance, fraud, and risk investigations with 3x faster web research using Parallel

Bretton grounds every AI compliance investigation in Parallel, making cases 40% faster with a cited source for every finding.

## Key highlights

- **40% faster** end-to-end investigations after moving to the Responses API
- **About 70%** of each investigation runs on web data, all sourced through Parallel
- **Cited findings** for every material claim, giving the [Bretton Evaluator](https://www.bretton.com/blog/how-we-scale-quality-assurance-for-our-agents) the source it requires

## About Bretton

Bretton, formerly Greenlite AI, builds AI agents for the back office of banks and financial institutions. Its agents handle KYC/KYB onboarding, enhanced due diligence, screening alerts, and adverse media reviews inside existing compliance systems. Bretton’s agents run inside OCC-, FDIC-, and Federal Reserve–regulated institutions and platforms including MVB Bank, Coastal Community Bank, and Mercury, where they’ve helped cut compliance review time by as much as 87%.

## Financial-crime investigations rely on evidence from the open web

Before a bank onboards a business, its compliance team has to establish who owns it, confirm it’s properly registered, and screen it and every related party for lawsuits, fraud, and negative news. Nearly all of that evidence is on the open web. For Bretton, web research makes up about 70% of every investigation, and it’s where the most important findings come from.

Bretton holds every investigation to the standard a regulator would expect: complete coverage, the right identity, and fully auditable. Its earliest agents used frontier models’ built-in web search, which is designed to find a good answer, not to show that nothing was missed. As Bretton scaled, it needed search that could guarantee full adverse media coverage, cite a verifiable source for every claim, and pull the enrichment data that reliable entity resolution depends on.

In compliance, those gaps matter. A missed lawsuit can mean onboarding a business that should have been flagged, and a finding without a reliable source can’t be used in a case file. Bretton needed a web research layer built to the same standard as its investigations.

> “Every investigation starts with one question: who is this, really? If our agent misses a lawsuit or confuses two people with the same name, the bank makes the wrong call, and a finding without a source can’t go in the case file at all. Web research is the foundation of every case we run. We needed a solution that would find what other searches missed and give us a clear source for every finding.”
>
> — Rohan Saini, Product Engineer

## Grounding every Bretton investigation in Parallel, from Search and Extract to Task to Responses

Bretton’s Applied AI team built a dataset with ground-truth answers and tested the leading web search APIs against frontier-model built-in search. Parallel came out ahead on quality, and Bretton standardized on it. When Bretton [later rebuilt its product around agents](https://www.bretton.com/blog/the-importance-of-architectural-reinvention-for-financial-services-ai), it kept Parallel as its web research layer, so the team could rebuild the architecture on a search foundation it had already validated.



**Search API and Extract API as agent tools.** Bretton first replaced its built-in web search with Parallel’s Search API and Extract API, called as tools inside the agent loop. Agents could search, open pages, and follow evidence across turns. As investigations got deeper, agents made more and more Extract calls, and latency became the next problem to solve.

**Task API inside every skill.** On the Parallel team’s recommendation, Bretton moved each research skill onto the Task API, which handles querying, retrieval, and synthesis in a single call and returns citations with every output. Quality scores improved, and Task powered enrichment, due diligence, adverse media, and website and terms checks across about 26 concurrent skills per case. But Task is built for deep background research, and some calls took up to 7 minutes.

**Responses API inside each investigator.** For Bretton’s second-generation agents, Parallel recommended the Responses API, which is built for research inside a live workflow. Rahul Mohankumar, who led the migration, found that Responses matched Task’s quality at 30–40% of the latency, about a minute or two per call. Each investigator calls it 7 to 8 times per case, so the savings add up quickly.

The Parallel team also helped Bretton tune how its agents use Responses. Swapping Markdown output for a structured schema gave each subtask exactly the fields it files as findings. Tighter tool descriptions taught investigators to ask targeted questions instead of pulling whole websites. To find a company’s founding year, for example, an agent now asks Responses for the founding year and gets just that.

The partnership runs both ways. When Bretton needed to show end users the search queries behind each finding, Parallel added new fields to Responses within about a week so Bretton’s agents could surface them directly. Features like SSE streaming came out of Bretton’s compliance needs in the same way.

## The impact

With Responses inside each investigator, Bretton’s end-to-end investigation time dropped from about 20 minutes to about 12, with research quality unchanged.

> “Each move from one Parallel product to the next, working closely with the Parallel team, has given us higher quality first, then better latency. The faster we process cases, the more our customers can process, and the more value we show them.”
>
> — Rohan Saini, Product Engineer

Faster cases change how analysts spend their day. Reviews reach them sooner, so they can focus on the decisions that need human judgment, like whether to escalate a case. Every material finding also arrives with a source attached, so reviewers and regulators can trace each conclusion to the page behind it. As Bretton runs full back-office operations with its AI-native service for banks like MVB, faster investigations mean more capacity for every customer. Parallel also gives Bretton room to keep moving. Bretton upgrades to new frontier models as they ship, and Parallel stays constant underneath as the web research layer, so every model upgrade still runs on the same sourced retrieval.

## What’s next

Bretton is extending its AI-native operations across the financial back office, from compliance and fraud to risk and operations. Its goal is to become the default place financial institutions build and run agents. In Rohan’s words, the aim is for a bank’s first thought to be, “Bretton can do it. Let me build my agent in Bretton.” As those agents take on more of the back office, Parallel remains the web research layer that keeps every finding grounded in a source.

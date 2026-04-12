Human Machine

# \# How Parallel helped Kepler build AI that finance professionals can actually trust

Tags: Case Study

Reading time: 5 min

Kepler is building AI for work where the answer can't just be plausible; it has to be right.

Its first product, [Kepler Finance](https://www.kepler.ai/) [[Kepler Finance] (https://www.kepler.ai/)](https://www.kepler.ai/) , helps investment professionals analyze public companies with institutional depth and AI speed. Analysts ask complex questions in natural language and receive answers backed by financial filings, computed metrics, and citations down to the page and line item.

Achieving that level of reliability requires a different architecture from most AI systems. Kepler integrates [Parallel's Search AP](https://parallel.ai/products/search) [[Parallel's Search AP] (/products/search)](/ai/products/search) I as the discovery layer at the top of its analytical pipeline, combining AI's ability to understand open-ended questions with deterministic infrastructure that guarantees accuracy and auditability on the back end.

## \## **\*\* Key impact \*\***

* \- **\*\* Landscape discovery in minutes: \*\*** Preliminary research that once took analysts days now runs as an automated pipeline step
* \- **\*\* Expanded product capability: \*\*** Kepler now supports competitive landscape and sector-level analysis, not just single-company research
* \- **\*\* Global coverage: \*\*** Discovery across private companies, international players, and niche sectors beyond curated databases
* \- **\*\* Fully automated workflows: \*\*** Parallel search results feed directly into Kepler's deterministic pipeline without manual extraction

## \## **\*\* In finance, reliability is architectural \*\***

Language models are excellent at interpreting questions, understanding context, and structuring answers. They're far less reliable at retrieving precise data or producing the same answer twice. In many applications, that tradeoff is acceptable. In finance, it isn't. A wrong number can mean a blown deal, a compliance issue, or reputational damage that lasts years.

Kepler's team built the platform around that constraint. The architecture enforces a strict separation between two layers: an AI layer that interprets questions and structures answers, and a deterministic layer that retrieves financial data, computes metrics, and generates citations tracing every number to its source. The two communicate through structured interfaces, but they never blend.

Today, [Kepler Finance](https://www.kepler.ai/) [[Kepler Finance] (https://www.kepler.ai/)](https://www.kepler.ai/) covers 950K+ SEC filings, 14K+ companies, and 27 global markets. But even this architecture has a gap at the very top of the funnel.

![](https://cdn.sanity.io/images/5hzduz3y/production/ea4f42cb04509e67a7d8ae98d2b780d50437ceb1-2174x1180.png)

## \## **\*\* Every analysis starts with discovery, and that requires the open web \*\***

Most financial analysis doesn't start with a known list of companies. An analyst working on a deal typically starts with a question:

* \- What does the competitive landscape look like around this company?
* \- Which international players matter that a US coverage list might miss?
* \- Which upstream suppliers could influence risk?

There's no filing to retrieve yet; the analyst first has to determine what the analysis should even cover. Traditionally, that means scanning industry reports, asking colleagues, and searching the web before the real work begins. It's slow, inconsistent, and impossible to scale.

Discovery is the only place in Kepler's architecture where the system permits probabilistic outputs. That makes the quality bar unusually high: if discovery surfaces the wrong companies, the entire downstream pipeline operates on incomplete context.

## \## **\*\* Parallel's [Search API](https://parallel.ai/products/search) [[Search API] (/products/search)](/ai/products/search) met the bar: relevant, broad, and built for machines \*\***

Kepler evaluated discovery solutions across three requirements.

1. **\*\* Relevance: \*\*** Discovery has to be accurate enough that the downstream pipeline is always pointed at the right material.
2. **\*\* Breadth of index: \*\*** Kepler's customers increasingly work across areas curated datasets struggle to cover: private companies, international competitors, niche industry segments. Parallel's coverage across the open web lets Kepler discover entities well beyond traditional financial databases.
3. **\*\* Programmatic design: \*\*** Most search products are designed for humans. Kepler needed structured outputs that route directly into its pipeline without manual extraction.

> > **\*\* "We built Kepler to be audit-ready at every step. That standard applies to discovery too. Parallel's accuracy and coverage are what made it the only search API we trusted in that role." \*\***
> 
>

> > **\*\* — Vinoo Ganesh, CEO, Kepler \*\***
> 
>

When an analyst asks a landscape-level question, Parallel performs entity discovery using real-time information from the open web. Those results flow directly into Kepler's deterministic pipeline. From that handoff forward, no probabilistic system touches the data. Parallel identifies who matters. Kepler determines what the data says about them.

## \## **\*\* What this unlocked \*\***

Before Parallel, Kepler was a research tool that needed to be provided an explicit list of companies: powerful, but limited to situations where analysts already knew which companies to analyze.

* \- **\*\* Competitive landscape analysis. \*\*** Analysts can now start with broad questions like "What does the competitive landscape look like in this sector?" Parallel identifies the relevant companies; Kepler analyzes them.
* \- **\*\* Supply chain and sector mapping. \*\*** For an analyst researching EV battery manufacturers, the most relevant upstream suppliers (cathode material producers across South Korea or China) often don't appear clearly in US filings. Parallel surfaces these entities so Kepler's pipeline can incorporate them.
* \- **\*\* Comp set construction in unfamiliar sectors. \*\*** Investment professionals are frequently staffed on deals outside their primary coverage. Parallel enables Kepler to generate structured company sets dynamically, helping analysts understand the ecosystem around a target much faster.

## \## **\*\* The architecture scales beyond finance \*\***

Kepler started in finance, but the architecture is domain-agnostic. Legal research, regulatory compliance, healthcare analysis, procurement intelligence: anywhere professionals need defensible decisions from verified information, the same problems exist. Discovery at the top of the funnel. Verifiability at every step downstream.

We're partnering with Kepler to bring this architecture to every domain where auditability is essential.

By Parallel

March 17, 2026
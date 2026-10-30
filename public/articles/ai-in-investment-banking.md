# AI in investment banking: what analyst agents do and what they need

AI in investment banking now means analyst agents that draft company profiles, build comp sets, assemble buyer lists, and watch coverage names, with a banker reviewing every output. This guide covers the tasks banks hand to agents today, what JPMorgan, Goldman Sachs, and Rogo's users actually run, the data stack an analyst agent depends on, and the risks that keep a human in the loop.

Investment banks use AI mostly for the first draft of analyst work: company profiles, comparable-company sets, buyer lists, meeting briefs, and document review. The systems that work in production pull from three places (licensed market data, the bank's own documents, and the open web) and cite every figure so a banker can check it before it reaches a client.

The rest of this page walks through the banking workflow task by task, then looks at the data and controls an analyst agent needs. For the broader picture across asset management, research, and compliance, see [AI agents in finance](/learn/ai-agents-in-finance).

## How is AI used in investment banking today?

Most deployments sit inside the analyst and associate layer of a deal team. The agent gathers and structures information, and the banker decides what goes in front of a client.

| Task | What the agent does | Where the data comes from |
| --- | --- | --- |
| Pitch books and tear sheets | Drafts a company profile: business description, segments, management, recent news, key financials | Filings, market data, company website, press |
| Comps and precedent transactions | Proposes a peer set and a list of past deals with announced terms | Market data, deal databases, press releases, local-exchange filings |
| Sell-side buyer lists | Screens strategic and financial buyers against a target's profile | PE firm websites, portfolio pages, fund announcements |
| Meeting prep | Writes a one-page briefing on a company and the people in the room | News, filings, executive bios, internal CRM notes |
| Coverage and market monitoring | Flags deals, leadership changes, filings, and rating actions on covered names | News, regulator and exchange feeds, company announcements |
| CIM and data-room review | Summarizes a confidential information memorandum and pulls out figures and risks | Internal documents only |
| Diligence | Checks claims in a CIM against public sources: litigation, customers, ownership | Court records, registries, press, filings |
| KYC and KYB on counterparties | Verifies a counterparty's registration, owners, and adverse media | Corporate registries, sanctions lists, regulator registers, news |

### Pitch books, company profiles, and tear sheets

A pitch book starts with a page on the client and pages on each company that matters to the story. Goldman Sachs CEO David Solomon said in January 2025 that AI can now produce 95% of an S-1 draft "in a few minutes," and that the remaining 5% is where a bank earns its edge ([Business Insider, Jan. 17, 2025](https://www.businessinsider.com/goldman-sachs-ceo-david-solomon-ai-ipo-investment-bank-analyst-2025-1)). Company profiles follow the same pattern: an agent assembles the facts, a banker writes the angle.

### Comps and precedent transactions

Picking peers is judgment, but finding candidates is search. Kepler Finance, which covers 950K+ SEC filings, 14K+ companies, and 27 markets, uses Parallel Search as the discovery layer for comp sets, competitive landscapes, and supply-chain mapping ([Kepler case study](https://parallel.ai/blog/case-study-kepler)). Its CEO, Vinoo Ganesh, put the requirement plainly: "We built Kepler to be audit-ready at every step. That standard applies to discovery too."

### Buyer lists for sell-side deals

A sell-side mandate needs a list of plausible acquirers. For financial buyers, that once meant an analyst reviewing 50 to 100 private equity firms' websites by hand to check strategy, fund size, and portfolio overlap. Rogo's agents now do that screen from the web ([Rogo case study](https://parallel.ai/blog/case-study-rogo)). For the sourcing side of the same problem, see [how investment firms use AI APIs for deal sourcing](/articles/how-investment-firms-use-ai-apis-for-deal-sourcing-and-research).

### Meeting prep and coverage monitoring

Before a client meeting, an agent can write a briefing that covers the company's last quarter, recent deals, and the backgrounds of the attendees. Between meetings, the same agent watches covered names for filings, leadership changes, and deal announcements. Morgan Stanley's AskResearchGPT, rolled out to its institutional securities division in October 2024, became popular because staff could ask it questions instead of calling or emailing the research department ([CNBC, Oct. 23, 2024](https://www.cnbc.com/2024/10/23/morgan-stanley-rolls-out-openai-powered-chatbot-for-wall-street-division.html)).

### CIM review, diligence, and counterparty checks

A confidential information memorandum is internal data, so an agent can summarize it without touching the web. Diligence is the opposite: the job is to test the CIM's claims against outside sources such as court dockets, corporate registries, and press coverage. Our guide to an [automated due diligence research pipeline](/articles/how-to-build-an-automated-due-diligence-research-pipeline) walks through that build. Counterparty KYC and KYB checks follow the same verify-against-public-records logic; [our KYB explainer](/learn/kyb) covers how agents run them.

## What are the big banks actually deploying?

Adoption at the largest banks is broad, though most of it is general-purpose assistants rather than autonomous deal agents.

- **JPMorgan.** LLM Suite reached 200,000 onboarded users within eight months of its summer 2024 release ([JPMorganChase, June 3, 2025](https://www.jpmorgan.com/technology/news/llmsuite-ab-award)). The firm's 2025 shareholder letters report more than 65,000 colleagues in the Commercial & Investment Bank actively using it ([JPMorganChase, April 2026](https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/line-of-business-ceo-letters-to-shareholders-2025.pdf)). In May 2026, its Asia investment banking head said the bank was rolling out AI tools across investment banking globally ([Reuters, May 21, 2026](https://www.reuters.com/world/asia-pacific/jpmorgan-rolls-out-ai-tools-investment-banking-globally-senior-banker-says-2026-05-21)).
- **Goldman Sachs.** The GS AI Assistant went to about 10,000 employees in January 2025 ([CNBC, Jan. 21, 2025](https://www.cnbc.com/2025/01/21/goldman-sachs-launches-ai-assistant.html)) and launched firmwide in June 2025 ([Reuters via Yahoo Finance, June 23, 2025](https://finance.yahoo.com/news/goldman-sachs-launches-ai-assistant-140930862.html)), with versions tailored to investment bankers and research analysts ([Fox Business, June 23, 2025](https://www.foxbusiness.com/technology/goldman-sachs-announces-firmwide-launch-ai-assistant)).
- **Morgan Stanley.** AskResearchGPT answers questions from the firm's research library for bankers and traders ([CNBC, Oct. 23, 2024](https://www.cnbc.com/2024/10/23/morgan-stanley-rolls-out-openai-powered-chatbot-for-wall-street-division.html)).

Internal assistants mostly read the bank's own content. The task-specific work in the table above, especially anything that needs fresh outside facts, usually runs on specialist platforms.

## Rogo: analyst agents at 7 of the top 8 investment banks

Rogo builds AI infrastructure for financial services. More than 60,000 bankers and investors at 450+ financial institutions use it, it's live at 7 of the top 8 investment banks, and its agents execute more than 200,000 workflows a day ([Rogo case study](https://parallel.ai/blog/case-study-rogo)). Typical workflows are meeting prep briefings, market monitoring, investment research, and sell-side buyer lists.

Parallel is Rogo's primary web search provider, with the Search and Extract APIs powering those research workflows. At peak, Rogo makes hundreds of thousands of Parallel requests a day with error rates under 0.002%. For European banks, Rogo uses Parallel's EU endpoint, which serves an EU-hosted copy of the index; the only integration change was the base URL.

Other finance teams report similar results from their own testing. James Clough, Head of AI at ModelML, said: "In our internal evaluations we found Parallel to be the fastest and most accurate web search tool we tested."

## What does an analyst agent stack look like?

A working analyst agent has three data layers, a citation layer, and a set of controls.

1. **Licensed data.** Filings, market data, estimates, and deal databases. These are accurate and structured, and the bank already pays for them.
2. **Internal documents.** Past pitch books, models, CIMs, CRM notes, and research. This is where a bank's own view lives, and it stays behind the firewall.
3. **Web search for everything else.** Regulator registers, local-exchange filings, private-company announcements, PE portfolio pages, and news. Many of the facts that decide a deal page sit here and nowhere else, which is the gap [Parallel for Finance](/blog/parallel-for-finance) targets.

On top of the data, the agent needs **citations and an audit trail**: every number in the output links to a source URL or document, and the run logs which sources the agent read. Without that, a reviewer has to redo the research to trust it.

The controls depend on the bank. Common requirements are zero data retention on queries, EU data residency for European clients, and SSO. Parallel offers ZDR, EU residency, and SSO as Enterprise options; [our data residency page](/learn/data-residency) explains how the EU deployment works.

## Where does web search accuracy show up?

When an agent gets a deal page wrong, the cause is usually the search layer: it found a stale page, the wrong entity, or nothing at all. That makes search quality measurable. We make Parallel and ran these evaluations; methodology is on [/benchmarks](/benchmarks). Every search API ran inside the same agent loop with the same answer model and judge, so the search layer was the only variable.

**PWS-Finance** is Parallel's private benchmark of 174 held-out questions across eight finance workflows, including deals, ownership and leadership, and public financials. Each question asks for specific facts about one entity as of one date, such as Rush Enterprises' 2025 acquisitions (Leeds Transit, June 16, 2025, $25.6M), and an answer counts only if every required fact is right. Parallel Advanced posted the top score at 84.3%, 0.6 points ahead of OpenAI native search (83.7%) at 30% lower cost, and 8 to 10 points ahead of Exa (75.9%) and Perplexity (74.3%).

**FinSearchComp T3** is the hardest tier of a public benchmark written by 70 financial experts ([arXiv 2509.13160](https://arxiv.org/abs/2509.13160)). Among search APIs in the same agent loop, Parallel Advanced scored 57.4% at $161.10 per 1,000 questions, 6.0 points ahead of Exa Auto (51.4%) and 9.1 ahead of OpenAI native search (48.3%), at 1.3x to 3x lower cost than every competitor. Parallel Fast scored 53.7% at $15.20 per 1,000, which still beats every competitor's accuracy at 13x+ lower cost. Research products that return a finished answer publish higher end-to-end numbers; those measure a different thing, and [our FinSearchComp explainer](/articles/finsearchcomp-benchmark) compares the two.

### FinSearchComp T3 (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {"label": "Parallel Fast", "x": 15.2, "y": 53.7},
  {"label": "Parallel Advanced", "x": 161.1, "y": 57.4}
]
```

```
[
  {"label": "Exa Auto", "x": 226.2, "y": 51.4},
  {"label": "OpenAI native search", "x": 204.3, "y": 48.3},
  {"label": "Perplexity Finance + Web", "x": 347.0, "y": 50.0},
  {"label": "Tavily", "x": 481.8, "y": 43.0}
]
```

### PWS-Finance (Parallel for Finance, Oct 2026)

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Parallel Fast",
    "x": 110.3,
    "y": 83.0
  },
  {
    "label": "Parallel Advanced",
    "x": 125.5,
    "y": 84.3
  }
]
```

```
[
  {
    "label": "Exa Auto",
    "x": 197.6,
    "y": 75.9
  },
  {
    "label": "OpenAI native search",
    "x": 180.7,
    "y": 83.7
  },
  {
    "label": "Perplexity Search API",
    "x": 121.9,
    "y": 74.3
  }
]
```

For a side-by-side of providers on these and other finance tests, see [the best search API for financial AI agents](/articles/best-search-api-for-financial-ai-agents).

## A hands-on starting point: the tear-sheet cookbook

The fastest way to see an analyst agent work is to run one. Parallel's open-source [tear-sheet cookbook](https://github.com/parallel-web/parallel-cookbook) takes a CSV of tickers and uses the Task API to research each company's profile, four years of financials, market data, news, and a bull and bear case. It renders a cited two-page tear sheet plus a research-basis page that lists the sources behind each figure.

It's a good template for a pitch-book profile page. Swap the ticker list for a coverage universe, change the output schema to match your bank's format, and keep the research-basis page so reviewers can trace every number.

## What are the limits and risks?

**Hallucinated numbers.** A language model will produce a plausible revenue figure if it can't find the real one. FINRA's 2026 oversight report names hallucinations, along with agent autonomy, auditability, and data sensitivity, as risks firms should supervise ([FINRA, Dec. 9, 2025](https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm)). Require a citation for every figure and reject outputs that lack one.

**Stale data.** An index that hasn't seen last week's 8-K will answer with last quarter's numbers. Ask for as-of dates in the output and check them against the deal timeline.

**MNPI and confidentiality.** Deal data is often material nonpublic information. Skadden warned in July 2026 that AI agents ingesting data from several live matters into a shared knowledge base can cause "cross-deal contamination," and that models must respect information barriers between banking and research ([Skadden, July 21, 2026](https://www.skadden.com/insights/publications/2026/07/when-ai-models-access-nonpublic-information)). Keep internal deal documents in permissioned stores, and send only public-facing queries to outside search APIs. FINRA's [Regulatory Notice 24-09](https://www.finra.org/rules-guidance/notices/24-09) reminds broker-dealers that existing rules apply to generative AI use.

**Model risk management.** US banks long anchored model governance on the Federal Reserve's SR 11-7. On April 17, 2026, the Fed, OCC, and FDIC replaced it with revised guidance, issued by the Fed as [SR 26-2](https://www.federalreserve.gov/supervisionreg/srletters/sr2602.htm). The revised guidance places generative and agentic AI models outside its scope and says a bank's broader risk management and governance practices should set the controls for them. The [OCC](https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-29.html) says the agencies plan a request for information on AI, including agentic AI, so banks currently govern analyst agents under their own frameworks.

## Frequently asked questions

**Will AI replace investment banking analysts?**

Not wholesale, but it is shrinking how many a bank needs. McKinsey's QuantumBlack told Fortune in June 2026 that some banks are cutting junior analyst classes by as much as two-thirds ([Fortune, June 7, 2026](https://fortune.com/2026/06/07/banks-mass-workforce-cuts-ai-entry-level-jobs-junior-analysts/)), and Jamie Dimon said in May 2026 that JPMorgan would hire more AI specialists and fewer traditional bankers ([Reuters, May 21, 2026](https://www.reuters.com/world/asia-pacific/jpmorgan-rolls-out-ai-tools-investment-banking-globally-senior-banker-says-2026-05-21)). Data reported by The Banker in August 2026 showed investment banking junior hiring holding steady while the wider industry cut, though experts expect that to change ([The Banker, Aug. 27, 2026](https://www.thebanker.com/content/738ee75e-cb99-496f-a961-2fbe7d13d5c8)). The analyst job is moving from gathering data to checking it and building the argument.

**What AI tools do investment banks use?**

Large banks run internal assistants such as JPMorgan's LLM Suite, the GS AI Assistant, and Morgan Stanley's AskResearchGPT. For task-specific analyst work, many use specialist platforms such as Rogo, which runs at 7 of the top 8 investment banks. Those platforms in turn sit on licensed data providers and web search APIs such as Parallel.

**Is AI accurate enough for financial models?**

For gathering inputs, often yes, provided every number carries a citation and a reviewer checks it. For the model itself, no agent should be trusted without review. Even the best search APIs in our tests miss a meaningful share of hard multi-step finance questions, as the FinSearchComp T3 results above show.

**Can banks use AI with confidential deal data?**

Yes, if the architecture separates private and public data. Internal documents stay in permissioned systems; only public queries go to external APIs. Ask vendors about zero data retention, data residency, and access controls, and map the setup to your information barriers.

**How do I build an AI analyst agent?**

Start with one workflow, such as company profiles, and a fixed output schema. Combine your licensed data with a web search API for everything else, require citations, and test against questions your analysts have already answered. The tear-sheet cookbook above is a working example.

## Start building

Get an API key and free credits at [platform.parallel.ai](https://platform.parallel.ai/), read the [Search API docs](https://docs.parallel.ai/), or see how banks and research platforms use Parallel on the [finance solutions page](/solutions/finance).

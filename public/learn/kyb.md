# KYB (know your business): verification steps and automation

Know your business (KYB) is how financial institutions confirm that a business customer exists, is in good standing, and is owned and controlled by the people it names. This guide covers the US, EU, UK, and FATF rules behind KYB, each verification step and where its evidence lives, and how AI agents and web research APIs automate the work.

KYB (know your business) is the process a bank, fintech, or payments company uses to confirm that a business customer is real, legally registered, and owned and controlled by the people it says. A KYB check verifies the company in an official registry, identifies its beneficial owners and control persons, screens them against sanctions and adverse media, and keeps watching for changes after onboarding.

## What is KYB?

KYB is customer due diligence applied to legal entities: corporations, LLCs, partnerships, trusts, and foundations. A business has no passport, so you prove it exists through registry entries, filings, and licenses. The question a KYB review answers is who you are really dealing with, which means tracing ownership through layers of holding companies until you reach natural persons, then checking those people too.

## KYB vs. KYC: what's the difference?

KYC (know your customer) verifies an individual. KYB verifies an organization, and it contains KYC: once you identify a company's beneficial owners and control person, you run identity checks on each of them.

|  | KYC | KYB |
| --- | --- | --- |
| Subject | An individual | A legal entity and the people behind it |
| Core evidence | Government ID, selfie or liveness check, address | Registry record, formation documents, ownership chart, licenses |
| Key question | Is this person who they claim to be? | Does this company exist, who owns and controls it, and what does it do? |
| Typical sources | ID documents, credit bureaus | Company registries, regulator registers, filings, court records, news, the company's website |
| Hard part | Document fraud, synthetic identities | Layered ownership, foreign entities, stale or conflicting records |

## Which regulations require KYB?

There is no single "KYB law." The obligation comes from anti-money-laundering rules that require financial institutions to identify legal entity customers and their beneficial owners. The main ones:

- **FATF Recommendations 10 and 24.** The [FATF Recommendations](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html) are the global AML standard. Recommendation 10 covers customer due diligence, including identifying beneficial owners and, for legal persons, understanding the ownership and control structure. Recommendation 24 requires countries to ensure authorities can get accurate, current beneficial ownership information on companies. FATF [tightened R.24 in March 2022](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-Beneficial-Ownership-Legal-Persons.html).
- **US: the FinCEN Customer Due Diligence (CDD) Rule.** [31 CFR 1010.230](https://www.ecfr.gov/current/title-31/section-1010.230) requires covered financial institutions to identify and verify the beneficial owners of legal entity customers. A beneficial owner is each individual who owns 25 percent or more of the equity (the ownership prong) plus a single individual with significant responsibility to control, manage, or direct the entity, such as a CEO or managing member (the control prong). In February 2026, FinCEN [granted exceptive relief](https://www.fincen.gov/news/news-releases/fincen-issues-exceptive-relief-streamline-customer-due-diligence-requirements) so banks no longer have to re-identify owners each time an existing customer opens another account.
- **US: the Corporate Transparency Act (CTA).** The CTA required companies to report beneficial ownership information (BOI) to FinCEN. A March 2025 interim final rule exempted US companies, and on August 11, 2026, FinCEN [made that exemption permanent](https://www.fincen.gov/news/news-releases/fincen-permanently-ends-beneficial-ownership-reporting-requirements-millions) in a [final rule](https://www.federalregister.gov/documents/2026/08/14/2026-16576/beneficial-ownership-information-reporting-requirement-revision) effective August 14, 2026. As of October 2026, only certain foreign companies registered to do business in the US must file, and they don't report US-person owners. For KYB teams, that means no federal registry to check US company owners against; the CDD Rule and your own research carry the load.
- **EU: the AML package.** The [Anti-Money Laundering Regulation (EU) 2024/1624](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng) applies from July 10, 2027 and sets a single EU rulebook, including a 25 percent ownership threshold for beneficial owners. The companion [Directive (EU) 2024/1640](https://eur-lex.europa.eu/EN/legal-content/summary/preventing-abuse-of-the-financial-system-for-money-laundering-and-terrorism-purposes-from-2027-member-states-mechanisms.html) covers national beneficial ownership registers, and the new EU authority, AMLA, based in Frankfurt, [will directly supervise up to 40](https://www.amla.europa.eu/document/download/5aa923cc-eece-4cff-a9dd-4f687e88962b_en?filename=Explainer%20-%20Direct%20Supervision%20by%20AMLA.pdf) large cross-border financial groups, selected by risk, from 2028.
- **UK: the Money Laundering Regulations 2017 (MLR 2017).** [Regulation 5](https://www.legislation.gov.uk/uksi/2017/692/regulation/5) defines a beneficial owner of a body corporate as an individual owning or controlling more than 25 percent of shares or voting rights, or otherwise controlling it. [Regulation 28](https://www.gov.uk/hmrc-internal-manuals/economic-crime-supervision-handbook/ecsh33328) requires firms to obtain and verify the company's name, registration number, and registered address and to understand its ownership and control structure. Under regulation 30A, firms must report discrepancies between what a customer tells them and the Companies House PSC register, [as HMRC's guidance explains](https://www.gov.uk/hmrc-internal-manuals/economic-crime-supervision-handbook/ecsh33385).

## KYB verification steps

Most programs follow this sequence, with depth set by the customer's risk rating.

1. **Collect the basics.** Legal name, trade names, registration number, jurisdiction of incorporation, registered and operating addresses, and a description of the business.
2. **Confirm registration and good standing.** Find the entity in the official registry for its jurisdiction. Check that it's active (not dissolved, struck off, or in liquidation) and that the name, number, address, and officers match the application.
3. **Identify ultimate beneficial owners (UBOs).** Map ownership through every intermediate entity until you reach natural persons over the applicable threshold (25 percent in the US CDD Rule and EU AMLR, more than 25 percent under MLR 2017).
4. **Identify control persons.** Name the individual with significant management control, and in the UK and EU, check directors and anyone who exercises control by other means.
5. **Verify the individuals.** Run KYC on each beneficial owner and control person.
6. **Screen for sanctions and PEPs.** Check the entity and its people against sanctions lists such as OFAC's SDN list and politically exposed person databases. Under OFAC's [50 Percent Rule](https://ofac.treasury.gov/faqs/topic/1521), an entity owned 50 percent or more in the aggregate by blocked persons is itself blocked, even if it isn't listed by name.
7. **Search adverse media.** Look for fraud, enforcement actions, litigation, insolvency, and investigations involving the company or its principals.
8. **Check business activity.** Confirm that the website, products, licenses, and physical presence match the stated business and the expected account activity.
9. **Assess risk and decide.** Rate the customer, apply enhanced due diligence where warranted, and record the evidence behind the decision.
10. **Monitor continuously.** Re-check ownership, officers, licenses, and news on a schedule and on triggers.

## Where KYB evidence lives

A single review can touch:

- **Company registries:** Companies House in the UK, US secretary of state business searches (one per state), the Handelsregister in Germany, and national registries elsewhere.
- **Beneficial ownership registers:** the UK PSC register and EU national registers where access is allowed. The US no longer has one for domestic companies.
- **Regulator registers:** the [FCA Financial Services Register](https://register.fca.org.uk/), the SEC's EDGAR and IAPD, NMLS Consumer Access for US money transmitters and lenders, and their equivalents in other countries.
- **Court records and insolvency notices:** dockets, judgments, and official gazettes.
- **News and trade press:** the main source for adverse media and for ownership changes that haven't reached a registry yet.
- **The company's own website:** what it sells, where it operates, who runs it, and whether that matches the application.

Most of these sources are public web pages. KYB data vendors license and normalize much of it, but coverage thins out for small private companies, many non-US jurisdictions, and recent changes. As Parallel's [finance launch post](/blog/parallel-for-finance) puts it, facts that matter often sit outside licensed datasets, in regulator registers, local filings, and company announcements.

A typical register question looks like this: _Is ADCB on the FCA register?_ The answer is no. The UK entity, Abu Dhabi Commercial Bank (UK Representative Office) Limited, was dissolved on April 2, 2024, per its [Companies House record](https://find-and-update.company-information.service.gov.uk/company/06655421). An agent has to find the right entity and read its current status; a stale answer gets it wrong.

## How KYB automation and AI agents work

Older KYB automation pairs a registry data API with a rules engine. It clears simple cases and sends the rest to an analyst queue: foreign subsidiaries, mismatched addresses, a director with a common name.

Agent-based KYB works that queue. The agent plans the checks, searches registries and regulator registers, reads the company's website, runs adverse media queries on each principal, reconciles conflicting records, and writes up findings with a source for every claim. A human reviews the file and decides.

Two Parallel customers show what this looks like in production. [Bretton](https://parallel.ai/blog/case-study-bretton-ai) (formerly Greenlite AI) builds AI agents for bank back offices: KYC and KYB onboarding, enhanced due diligence, screening alerts, and adverse media. About 70 percent of each investigation runs on web data, all of it sourced through Parallel. With Parallel's Responses API inside each investigator, Bretton's end-to-end investigation time fell from about 20 minutes to about 12. Across customers such as MVB Bank, Coastal Community Bank, and Mercury, Bretton has cut compliance review time by as much as 87 percent. [Taktile](https://taktile.com/), which builds AI decisioning for banks and lenders, says:

> "You cannot make mistakes in financial services. With Parallel, our banking customers run agents that complete complex KYB checks in minutes, not hours." (Maik Taro Wehmeyer, Co-Founder and CEO, Taktile)

For where agents fit across banking and investing, see [AI agents in finance](/learn/ai-agents-in-finance). The same pattern applies to [regulatory change monitoring](/articles/how-to-automate-regulatory-change-monitoring-with-apis).

## What a KYB API does, and where a web research API fits

"KYB API" covers several kinds of product, and production stacks usually combine them:

| Layer | What it does | Examples of what it returns |
| --- | --- | --- |
| KYB data and registry APIs | Query licensed, normalized company and ownership data | Registration status, officers, filings, ownership records |
| Identity verification | Verify the individuals behind the business | ID document checks, liveness, watchlist hits |
| Screening | Match names against sanctions, PEP, and watchlists | Scored matches for review |
| Web research API | Search and read the open web for an agent | Cited excerpts from registries, regulator registers, news, and company websites |
| Orchestration and case management | Run the workflow and record the decision | Risk score, audit trail, case file |

Parallel sits in the web research layer. It is not a KYB data vendor, an identity verification provider, or a sanctions screening list. Agents use it to check a registry entry, read a regulator register, find adverse media, and confirm what a company's website says, with a citation for each fact. Teams run it next to their data and screening vendors to fill coverage gaps and confirm vendor records are still current.

PWS-Finance, Parallel's private benchmark, has 174 held-out questions across eight finance workflows, including a regulation-and-compliance workflow (the FCA register question above is one of its samples). An answer counts only if every required fact is right. With every search API running in the same agent loop and answer model, Parallel Advanced posted the top score at 84.3 percent, 0.6 points above OpenAI's native search at 30 percent lower cost, and 8 to 10 points above Exa and Perplexity. We make Parallel and ran these evaluations; methodology is on [/benchmarks](/benchmarks).

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

Here is a register check with the Search API, limited to the FCA register and Companies House through a source policy:

```python
from parallel import Parallel

client = Parallel()  # reads PARALLEL_API_KEY

search = client.search(
    mode="advanced",
    objective=(
        "Is Abu Dhabi Commercial Bank (ADCB) on the UK FCA register? "
        "Give its current status and any dissolution date."
    ),
    search_queries=["ADCB FCA register status", "Abu Dhabi Commercial Bank UK dissolved"],
    advanced_settings={
        "source_policy": {
            "include_domains": [
                "register.fca.org.uk",
                "find-and-update.company-information.service.gov.uk",
            ]
        }
    },
)

for result in search.results:
    print(result.url)
    print(result.excerpts[0][:300] if result.excerpts else "")
```

When we ran this, the top result was the Companies House record showing the entity dissolved on April 2, 2024. For multi-step investigations, the [Task API](https://docs.parallel.ai/) returns structured fields with citations, and the Responses API (what Bretton uses) runs research inside a live workflow. For pulling broader company profiles, see [company research](/learn/company-research).

## Frequently asked questions

**What does KYB stand for?**

KYB stands for "know your business." It's the business-customer version of KYC (know your customer): verifying that a company is legitimate and identifying the people who own and control it.

**What's the difference between KYB and KYC?**

KYC verifies an individual's identity. KYB verifies a legal entity, its registration, ownership, control, and activity, and then runs KYC on the beneficial owners and control person it finds.

**What documents are needed for KYB?**

Usually the certificate of incorporation or registry extract, formation documents (articles, bylaws, or operating agreement), proof of address, an ownership chart down to individuals, identity documents for beneficial owners and the control person, and any required licenses.

**How long does KYB take?**

A clean domestic company with a simple ownership structure can clear in minutes with automated registry checks. Cases with foreign entities, layered ownership, or adverse media take longer, often days when analysts do the research by hand. Agent-based workflows shrink that research time: Bretton's investigations went from about 20 minutes to about 12.

**Can KYB be automated?**

Most of it can. Registry lookups, ownership mapping, screening, adverse media, and website checks can all run automatically, and AI agents now handle many of the messy cases. The final risk decision on high-risk customers usually stays with a compliance analyst.

**Do US companies still have to file beneficial ownership reports?**

No. Under FinCEN's final rule effective August 14, 2026, US companies and US persons are exempt from BOI reporting under the Corporate Transparency Act. Banks still have to collect beneficial ownership information from legal entity customers under the CDD Rule.

## Start building

Get an API key and free credits at [platform.parallel.ai](https://platform.parallel.ai/), and read the Search, Task, and Responses guides at [docs.parallel.ai](https://docs.parallel.ai/). For KYB and other compliance workflows at a bank or fintech, see [Parallel for finance](/solutions/finance).

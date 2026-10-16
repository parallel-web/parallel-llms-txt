# Data residency vs data sovereignty for AI agents

Data residency is about where data is stored and processed. Data sovereignty is about whose laws govern that data and who can compel access to it. An EU data center gives you residency. It doesn't give you sovereignty if the provider is subject to another country's laws. For AI agents, both questions apply to every tool call.

This article isn't legal advice. It explains the two terms and how they apply to agents that search the web.

## What data residency is

Data residency is where data is stored and processed. A residency commitment says, for example, that requests to a service are processed in the EU. It's a property of a provider's architecture, so an engineer can check it. Our glossary has a short definition of [data residency](https://parallel.ai/learn/data-residency).

## What data sovereignty is

Data sovereignty is the principle that data is governed by the laws of a particular jurisdiction. A sovereignty requirement asks who controls the provider, which courts it answers to, and which governments can order it to hand over data. It's a legal and corporate question as much as a technical one.

## How they differ

|  | Data residency | Data sovereignty |
| --- | --- | --- |
| The question it answers | Where data is processed and stored | Whose laws govern it |
| What decides it | The provider's infrastructure | The provider's ownership and legal obligations |
| Can a US company offer it in the EU | Yes | Not on its own |

Requirements often use the words loosely. A form that asks for "sovereign" hosting may only need residency, and a form that asks for "EU hosting" may really be asking about jurisdiction. Settle which one is meant before you shortlist vendors, because the two lead to different answers.

## The GDPR doesn't require data residency

The [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) allows personal data to leave the EU under the transfer rules in Chapter V, for example with an adequacy decision or Standard Contractual Clauses. Teams choose residency anyway when a customer contract or sector rule requires it, or when keeping data in the region is simpler than documenting a transfer.

## Why European buyers ask about sovereignty

Two public sources come up most. The US CLOUD Act, [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713), requires covered US providers to disclose data in their possession, custody, or control regardless of where it's stored. And the Court of Justice invalidated the earlier EU-US Privacy Shield in [Schrems II](https://curia.europa.eu/juris/liste.jsf?num=C-311/18) in 2020. Its replacement, the [EU-US Data Privacy Framework](https://ec.europa.eu/commission/presscorner/detail/en/ip_23_3721), was adopted in 2023 and is under legal challenge. That history is why some buyers want more than a valid transfer mechanism.

## What changes for AI agents

A database sits in one place. An agent calls many services to answer one request, including a model provider, a web search API, a page extraction API, and logging tools. Residency and sovereignty have to be checked for each of them.

Web search is the call teams overlook. Agents write search queries from user tasks, so those queries can contain names, companies, and other details the user typed. Where those queries go matters as much as where the database sits.

## Where Parallel fits

Parallel offers EU data residency as an optional feature, with the commitments set out in the customer's DPA. It covers [Search API](https://parallel.ai/products/search) requests in basic mode sent to the EU endpoint. For those requests, the endpoint, the full search index, and inference run in the EU, and EU traffic has zero data retention by default. That is a residency offering, not a sovereignty one, and we'd rather say so plainly.

Parallel is a US company, as its [privacy policy](https://parallel.ai/privacy-policy) states, so EU residency doesn't change its jurisdiction. Only minimal billing metadata, such as IDs, the SKU, and a timestamp, goes to the US. It never includes inputs or outputs. Live fetch, which retrieves public pages at request time, runs globally. It's optional and can be turned off. The Extract API isn't covered. If your requirement is residency for web search, the EU endpoint is built for it. If your requirement is sovereignty, our [guide to EU search APIs](https://parallel.ai/articles/best-web-search-apis-eu-data-residency) covers other options. More detail is at [parallel.ai/europe](https://parallel.ai/europe).

## FAQ

### Is data residency the same as data sovereignty?

No. Data residency is where data is stored and processed. Data sovereignty is whose laws govern the data and who can compel access to it.

### Does the GDPR require data to stay in the EU?

No. The GDPR allows transfers outside the EU under Chapter V, for example with an adequacy decision or Standard Contractual Clauses.

### What is sovereign AI?

Sovereign AI usually means AI systems whose models, compute, data, or operators are controlled within a particular country or region. The term has no single legal definition, so ask which parts a requirement covers.

### Is Parallel's EU endpoint a sovereign deployment?

No. It provides EU data residency for Search API requests in basic mode. Parallel is a US company, minimal billing metadata goes to the US, and optional live fetch runs globally.

## Sources

All accessed October 14, 2026.

- [Regulation (EU) 2016/679 (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), Chapter V
- [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713)
- [CJEU, Case C-311/18 (Schrems II)](https://curia.europa.eu/juris/liste.jsf?num=C-311/18)
- [European Commission press release IP/23/3721](https://ec.europa.eu/commission/presscorner/detail/en/ip_23_3721)
- [Parallel Privacy Policy](https://parallel.ai/privacy-policy)

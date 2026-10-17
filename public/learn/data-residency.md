# Data residency

Data residency describes where data is stored and processed, such as the EU. This entry covers how it differs from data sovereignty and data retention, and what it means for an AI agent that sends its inputs to outside services like web search.

Data residency is the location where an organization's data is stored and processed, usually stated as a country or region such as the EU.

## What is data residency?

Data residency is a commitment about geography. A provider that offers EU residency is saying that the requests you send are processed, and any data it keeps is stored, on infrastructure in the EU. Because it describes where infrastructure runs, an engineer can check it: which endpoint you call, where the servers sit, and which parts of a request leave the region.

It's often confused with [data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty), which asks whose laws govern the data and who can compel access to it. A US company can run servers in the EU and offer EU residency, but it stays subject to US law. The [US CLOUD Act, 18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713), requires covered US providers to disclose data in their possession, custody, or control regardless of where it's stored.

## Key characteristics

- **Location, not law:** residency settles where data is processed. It doesn't change which country's courts can reach the provider.
- **Often contractual:** the [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) allows personal data to leave the EU under the transfer rules in Chapter V, for example with an adequacy decision or Standard Contractual Clauses. Teams choose residency when a customer contract, a sector rule, or a security review asks for it, or when keeping data in the region is simpler than documenting a transfer.
- **Scoped, not all or nothing:** regional offerings usually keep the main request in the region and send a small amount of data elsewhere, such as billing records. A clear provider says which products, modes, and data flows the commitment covers.
- **Separate from retention:** where data is kept and how long it's kept are different questions. Zero data retention means nothing is stored after a request completes, wherever it was processed.
- **Per service:** for an AI agent, residency isn't only about the model. Every tool the agent calls, including web search, page fetching, and storage, receives the agent's inputs and needs its own answer.

## Example

An AI agent serves users in Europe and searches the web to answer their questions. The team runs its model on an EU-hosted deployment, but every query the agent writes also goes to a search API. For the whole pipeline to have EU residency, the search service has to process those queries in the EU too.

Parallel offers EU data residency as an optional feature, with the commitments set out in the customer's DPA. It covers [Search API](https://parallel.ai/products/search) requests in basic mode sent to the EU endpoint. For those requests, the endpoint, the full search index, and inference run in the EU, and EU traffic has zero data retention by default. Only minimal billing metadata, such as IDs, the SKU, and a timestamp, goes to the US, and it never includes inputs or outputs. Live fetch, which retrieves public pages at request time, runs globally. It's optional and can be turned off. The Extract API isn't covered. For a working setup, see [how to build an EU research agent with the Parallel Search API](https://parallel.ai/articles/build-eu-research-agent-parallel-search).

## Related terms

- [data residency vs. data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty): why location and jurisdiction lead to different vendor answers.
- [GDPR and AI agents](https://parallel.ai/articles/gdpr-ai-agents-web-search-extraction): what web search and extraction change for compliance.
- [web search APIs with EU data residency](https://parallel.ai/articles/best-web-search-apis-eu-data-residency): which providers document an EU processing option.
- [AI search API](https://parallel.ai/learn/ai-search-api): the search layer an agent calls for live web data.

## FAQ

**Does the GDPR require data residency?**

No. The GDPR allows transfers outside the EU under Chapter V, for example with an adequacy decision or Standard Contractual Clauses. Residency is usually chosen because a contract or sector rule requires it.

**What is the difference between data residency and data sovereignty?**

Data residency is where data is stored and processed. Data sovereignty is whose laws govern the data and who can compel access to it.

**Does data residency mean zero data retention?**

No. Residency is about where data is processed and stored, and retention is about how long it's kept. A provider can offer one without the other, so ask about both.

**Which Parallel products support EU data residency?**

Search API requests in basic mode sent to the EU endpoint. The Extract API isn't covered and runs on the default endpoint.

[Start Building](https://docs.parallel.ai/home)

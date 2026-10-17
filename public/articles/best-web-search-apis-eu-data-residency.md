# Best web search APIs with EU data residency (2026)

Few web search APIs document a way to process requests in the EU. As of October 14, 2026, Staan hosts its service in Europe, Linkup offers guaranteed local processing on enterprise agreements, and Parallel offers EU data residency for Search API requests in basic mode. Brave, Exa, Tavily, Perplexity, Firecrawl, and SerpApi don't document an EU processing option.

Parallel makes one of the products in this guide. We held every vendor, including ourselves, to the same rule. A claim goes in only if the vendor states it in its own public documentation. Vendor pages change, so treat each fact as true on the date we checked it, and ask vendors directly about anything that matters to you.

## What EU data residency should mean for a search API

Data residency means your requests are processed, and any stored data is kept, in the EU. For a search API, that applies to the whole request, not only the server that receives it. Ask where queries are processed, where the index lives, where inference runs, where pages are fetched from, and what leaves the region.

Two things often get mistaken for residency. A country or location setting changes which results you get back, not where your request runs. And residency is a different question from sovereignty, which is about whose laws apply to the provider. Our explainer on [data residency vs data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty) covers the difference.

## Search APIs that offer EU data residency

| Vendor | Documented EU option (October 14, 2026) | What to know |
| --- | --- | --- |
| Parallel | Search API requests in basic mode sent to the EU endpoint, as an optional feature | Minimal billing metadata goes to the US. Live fetch is global and can be turned off. Extract isn't covered |
| Linkup | Guaranteed local processing on enterprise agreements, and Bring Your Own Cloud for selected deployments | By default, queries may be processed in several regions |
| Staan | Infrastructure hosted in Europe | A US fallback supplements some results unless you ask Staan to turn it off |
| Brave | None documented | Provided by a US company |
| Exa | None documented | Offers zero data retention on Enterprise plans |
| Tavily | None documented | Relies on Standard Contractual Clauses for transfers to the US |
| Perplexity | None documented | Hosted in North America |
| Firecrawl | None documented for its cloud service | Its open-source version can be self-hosted on EU servers |
| SerpApi | None documented | A US company. ZeroTrace mode stops search data being stored |

## Parallel

Parallel offers EU data residency as an optional feature, with the commitments set out in the customer's DPA. It covers [Search API](https://parallel.ai/products/search) requests in basic mode sent to the EU endpoint. For those requests, the endpoint, the full search index, and inference all run in the EU. EU traffic has zero data retention by default.

**Our concessions.** Only minimal billing metadata goes to the US. That means IDs, the SKU, and a timestamp, never the inputs you send or the outputs we return. Live fetch, which retrieves public pages at request time, runs globally because pages are hosted all over the world. It's optional and can be turned off. The Extract API isn't covered and runs on the default endpoint. Parallel is a US company, so EU residency doesn't change its jurisdiction.

## Linkup

Linkup's [data processing documentation](https://docs.linkup.so/pages/security-and-privacy/data-processing-privacy) says it runs infrastructure in several regions, and that by default queries may be processed across them. Under an enterprise agreement, Linkup can guarantee local processing in a chosen geography.

**In Linkup's favor.** Its [security documentation](https://docs.linkup.so/pages/security-and-privacy/security-compliance) describes Bring Your Own Cloud for selected high-tier deployments, where processing runs inside the customer's environment. No other vendor here documents that level of isolation.

## Staan

Staan's [FAQ](https://www.staan.ai/faq) says its infrastructure is hosted in Europe and is subject to European law. It also describes a US fallback that supplements some results when needed, which customers can ask to disable.

**In Staan's favor.** If you need a European provider on European infrastructure, Staan makes the strongest claim of any vendor here.

## Brave, Exa, Tavily, Perplexity, Firecrawl, and SerpApi

None of these six documents an EU processing option. Each offers other privacy controls.

- **Brave.** Its [API privacy notice](https://api-dashboard.search.brave.com/documentation/resources/privacy-notice) says the service is provided by Brave Software Inc. in the US, with zero data retention for enterprise customers. Brave runs its [own index](https://brave.com/search/api/).
- **Exa.** Its docs offer [zero data retention](https://exa.ai/docs/admin/security/zero-data-retention) on Enterprise plans.
- **Tavily.** Its [privacy policy](https://docs.tavily.com/documentation/privacy) names a US company and says transfers to US service providers rely on Standard Contractual Clauses.
- **Perplexity.** Its [FAQ](https://docs.perplexity.ai/docs/resources/faq) says compute is hosted on AWS in North America.
- **Firecrawl.** Its [privacy policy](https://www.firecrawl.dev/privacy-policy) tells users in Europe that their information is transferred to the United States. Firecrawl is open source, and its [self-hosting guide](https://docs.firecrawl.dev/contributing/self-host) lets a team run it on its own servers, which puts data location in the team's hands along with the operations.
- **SerpApi.** Its [privacy policy](https://serpapi.com/legal) names a Texas company and says international transfers rely on safeguards such as Standard Contractual Clauses. Its ZeroTrace mode stops search data from being stored.

## How to choose an EU search API

Start with the requirement your legal or security team wrote down.

- **"Requests must be processed in the EU."** Parallel, Linkup on an enterprise agreement, and Staan all document an option. Ask each one what still leaves the region.
- **"The provider must be European."** Staan is the only vendor here that is.
- **"Queries can't leave our own cloud."** Linkup's Bring Your Own Cloud is the documented option.
- **"Nothing may be stored."** That's zero data retention, which is a separate question from location. Most vendors here offer it on some plans, and Parallel applies it to EU traffic by default.

Then test with your own queries, in your users' languages, before you commit.

To use Parallel in the EU, see [parallel.ai/europe](https://parallel.ai/europe) or [talk to sales](https://parallel.ai/pricing).

## FAQ

### Which web search APIs offer EU data residency?

As of October 14, 2026, Parallel, Linkup, and Staan document a way to process search requests in the EU. Brave, Exa, Tavily, Perplexity, Firecrawl, and SerpApi don't document one.

### Does Parallel's EU endpoint keep all data in the EU?

For Search API requests in basic mode, the endpoint, the full search index, and inference run in the EU, with zero data retention by default. Minimal billing metadata goes to the US and never includes inputs or outputs. Live fetch is global and can be turned off.

### Does Parallel's EU data residency cover the Extract API?

No. It covers Search API requests in basic mode sent to the EU endpoint. Extract runs on the default endpoint.

### Is zero data retention the same as data residency?

No. Zero data retention is about whether a vendor stores your data. Data residency is about where it's processed and stored.

### Does a country setting keep my search requests in the EU?

No. A country or location setting changes which results come back. It doesn't change where the request is processed.

## Sources

All accessed October 14, 2026, except Firecrawl and SerpApi, accessed October 16, 2026.

- Parallel: [Privacy Policy](https://parallel.ai/privacy-policy)
- Linkup: [Data processing and privacy](https://docs.linkup.so/pages/security-and-privacy/data-processing-privacy), [Security and compliance](https://docs.linkup.so/pages/security-and-privacy/security-compliance)
- Staan: [FAQ](https://www.staan.ai/faq)
- Brave: [Search API privacy notice](https://api-dashboard.search.brave.com/documentation/resources/privacy-notice), [Brave Search API](https://brave.com/search/api/)
- Exa: [Zero data retention](https://exa.ai/docs/admin/security/zero-data-retention)
- Tavily: [Privacy policy](https://docs.tavily.com/documentation/privacy)
- Perplexity: [FAQ](https://docs.perplexity.ai/docs/resources/faq)
- Firecrawl: [Privacy policy](https://www.firecrawl.dev/privacy-policy), [Self-hosting Firecrawl](https://docs.firecrawl.dev/contributing/self-host)
- SerpApi: [Legal documents and privacy policy](https://serpapi.com/legal)

# GDPR and AI agents: what web search and extraction change

Web search and extraction raise three GDPR questions for an AI agent: whether its queries contain personal data, how to treat personal data in the pages it reads, and where each service it calls runs, which decides whether the GDPR's transfer rules apply. This guide answers each question, lists the habits that shorten a privacy review, and explains how Parallel handles them.

This article isn't legal advice. It's written for you if you need to explain an agent's web access to a privacy reviewer.

## Agent search queries can contain personal data

They often do. The [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) defines personal data in Article 4(1) as any information relating to an identified or identifiable person. An agent turns a task like "prepare a briefing on our supplier's new CFO" into search queries that name that person. That makes the search provider part of your data processing, usually as a processor that needs a contract under Article 28.

Search vendors take different positions on this in their terms. Read the DPA before you integrate, and check whether it covers the queries you send.

## The pages an agent reads

Public web pages name people who never interacted with you. When your agent reads a page and keeps what it found, the usual GDPR principles apply to that content. You need a lawful basis under Article 6, and Article 5 asks you to keep only what the task needs, for only as long as it needs it.

## Where each call runs

Chapter V of the GDPR governs transfers of personal data outside the EU. For an agent, every service it calls is a place data can go, including the model, search, extraction, and logging. Running those services in the EU reduces how much personal data leaves the region. It doesn't settle every question on its own, so ask your data protection officer how it applies to your setup.

## What teams usually build in

These habits make a privacy review shorter.

- **Keep identifiers out of tool calls.** Strip email addresses, phone numbers, and internal IDs before the agent searches.
- **Read only what the task needs.** Prefer focused excerpts over whole pages.
- **Set retention on your side.** Expire cached pages and agent memory on a schedule.
- **Choose providers with a DPA and clear retention terms.**
- **Choose where your web access runs.** If your requirement is EU processing, pick services that offer it, and check which endpoints and modes are covered.

## How Parallel handles this

For API customers, Parallel acts as a processor under its Data Processing Addendum, according to its [privacy policy](https://parallel.ai/privacy-policy). Under its standard [Customer Terms](https://parallel.ai/customer-terms), Parallel may use inputs and outputs, not linked to any individual, to train and improve the models behind its services. Enterprise plans with zero data retention and Search API traffic sent to the EU endpoint are excluded from that use.

For teams that need EU residency, Parallel offers it as an optional feature, with the commitments set out in the customer's DPA. It covers [Search API](https://parallel.ai/products/search) requests in basic mode sent to the EU endpoint. The endpoint, the full search index, and inference run in the EU, and EU traffic has zero data retention by default. Only minimal billing metadata, such as IDs, the SKU, and a timestamp, goes to the US, and it never includes inputs or outputs. Live fetch, which retrieves public pages at request time, runs globally, but it's optional and you can turn it off. The Extract API isn't covered and runs on the default endpoint. Parallel is a US company, so read [data residency vs data sovereignty](https://parallel.ai/articles/data-residency-vs-data-sovereignty) if jurisdiction matters to you. More detail is at [parallel.ai/europe](https://parallel.ai/europe).

## FAQ

### Are AI agent search queries personal data?

They often are. Agents write queries from user tasks, and those queries can include names of people and the companies they work for.

### Do I need a DPA with my search API provider?

If the provider processes personal data on your behalf, Article 28 of the GDPR requires a contract that sets out its duties as a processor.

### Does using an EU endpoint mean no international transfer?

Not necessarily. It reduces how much data leaves the EU, but other parts of a service, such as billing records or live page fetches, can involve other countries. Ask each provider exactly what leaves the region.

### Does Parallel train on the queries my agent sends?

It may. Under the standard [Customer Terms](https://parallel.ai/customer-terms), Parallel may use inputs and outputs, not linked to any individual, to train and improve the models behind its services. Enterprise plans with zero data retention and Search API traffic sent to the EU endpoint are excluded from that use.

## Sources

All accessed October 14, 2026.

- [Regulation (EU) 2016/679 (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), Articles 4, 5, 6, 28, and Chapter V
- [Parallel Privacy Policy](https://parallel.ai/privacy-policy)
- [Parallel API FAQs](https://docs.parallel.ai/resources/faqs)

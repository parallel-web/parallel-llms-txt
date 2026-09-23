# Bring trusted data into Parallel with Data Connectors

Parallel is expanding how customers put trusted, specialized data to work in their agentic workflows. Starting today, we're rolling out Data Connectors, which you can use to reach a growing network of data providers.

Parallel is expanding how customers put trusted, specialized data to work in their agentic workflows. Starting today, we're rolling out **Data Connectors**, which you can use to reach a growing network of data providers.

When set up, Data Connectors enable third-party data sources in Parallel's [Task ](https://parallel.ai/products/task)and [Responses](https://parallel.ai/products/responses) APIs.

## How it works

There are three different access models for Data Connectors:

- **[Index](https://index.parallel.ai/)**** Partners **— included by default. Partner data is available automatically through the Parallel Index. Ask your question normally, and Parallel retrieves relevant partner data as part of its research. Index Partners are paid through a Shapley-based model, so higher-value content earns more.
- **Pay-Per-Use** — explicitly invoke and pay by the request. Add a provider under `advanced_settings.additional_data_providers` when a workflow needs it. Parallel runs it alongside its default web research, and you pay only for successful invocations.
- **Bring Your Own License** — connect a source you already license. Pass your provider's remote MCP server and credentials under `mcp_servers`, and Parallel uses those tools whenever they help. The licenses you already hold carry straight into your agent workflows.

## Partners & Supported MCPs

Access data across all three models from our initial group of partners and supported MCPs:

- **Index Partners:**
  - [Particle](https://particle.news/) — AI native news summarization
  - [Pensa Systems](https://pensasystems.com/) — retail shelf intelligence via drones
- **Pay-Per-Use:**
  - [Baselayer](https://baselayer.com/) — business identity and risk intelligence
  - [Carbon Arc](https://www.carbonarc.co/welcome) — alternative data for investors
- **Bring Your Own License:**
  - [Allium](https://www.allium.so/) — blockchain data and analytics
  - [Apollo](https://www.apollo.io/) — contact and company data
  - [Crunchbase](https://www.crunchbase.com/) — private company and funding database
  - [Faraday](https://faraday.ai/) — consumer prediction and audience data
  - [Harmonic](https://harmonic.ai/) — startup and investor intelligence
  - [Middesk](https://www.middesk.com/) — business identity and KYB
  - [Polymarket](https://polymarket.com/) — real-time prediction market data
  - [SimilarWeb](https://www.similarweb.com/) — website traffic metrics

We've also added support for the [bioRxiv](https://www.biorxiv.org/), [ClinicalTrials.gov](https://clinicaltrials.gov/), [ChEMBL](https://www.ebi.ac.uk/chembl/), [CMS Coverage](https://www.cms.gov/medicare-coverage-database/search.aspx), [medRxiv](https://www.medrxiv.org/), [NPI Registry](https://npiregistry.cms.hhs.gov/), and [PubMed](https://pubmed.ncbi.nlm.nih.gov/) MCPs as free providers under the Pay Per Use explicit invocation model. More [providers](https://parallel.ai/data-connectors) across company, financial, and web data are coming online every week in the [Data Connectors](https://parallel.ai/data-connectors) directory.

## Why it matters

Better agentic work starts with better data. Data Connectors give agents access to the trusted, specialized information they need to do better work. And flexible access models help customers bring the right data into each workflow, while giving providers a new distribution channel and compensation tied to the value their data creates.

## Get started

Browse available connectors in our developer platform. Select which connectors to turn on and follow the instructions to set up the integrations.

Once connected, Data Connectors will be available to use in the [Responses](https://platform.parallel.ai/play/responses) and [Task](https://platform.parallel.ai/play/task) API playgrounds. You can also toggle any connected source off for a given task or response. To learn more, read our [documentation](https://docs.parallel.ai/resources/data-sources) for Data Connectors.

Browse [Data Connectors](https://parallel.ai/data-connectors) to see what's available and how to access each source, or request one that isn't listed yet.

Index is becoming a broad, fair access layer for the agent-era web — where the best data reaches the workflows that need it, and the providers behind it share in the value they create.

## About Parallel and Index by Parallel

Parallel builds web search and research APIs for AI agents. Search and Extract return live, cited web context in one call. Task, FindAll, and Monitor handle the longer research and monitoring workloads.

Index by Parallel helps content owners see how agents use their work and earn compensation tied to that contribution. Register your domain at [index.parallel.ai](https://index.parallel.ai) to track citations and get paid when agents rely on your content.

# How Rogo brings real-time web intelligence into financial workflows

Parallel powers the web grounding behind Rogo's financial workflows, from meeting prep to investment analysis and market monitoring.

## Key highlights

- Parallel is the primary web search provider for Rogo's agents, with the [Search](https://parallel.ai/products/search) and [Extract](https://parallel.ai/products/extract) APIs powering research workflows across the platform.
- Hundreds of thousands of Parallel requests a day at peak, supporting growing traffic with error rates under 0.002%.
- Rogo is expanding across EMEA and APAC, partnering with Parallel to meet local requirements as it scales globally.

## About Rogo

Rogo is the leading AI infrastructure for global financial services. Its agents execute more than 200,000 workflows a day for professionals across banking, investing, equity research, and asset management, and 86% of monthly active users return to the platform each week. More than 60,000 bankers and investors at 450+ financial institutions, including the majority of bulge bracket banks, use Rogo, and it is live at 7 of the top 8 investment banks in the world. Headquartered in New York, Rogo has offices in San Francisco, London, Paris, Singapore, and Sydney, and its strategic investors include J.P. Morgan, Citi Ventures, Barclays, BNP Paribas, and Société Générale.

## Web search is a core input to financial work

The work financial professionals run on Rogo combines proprietary financial data, institutional knowledge, and timely public information from the web. Web search is a critical data source in the Rogo platform. A few examples of how it supports Rogo's workflows:

**Meeting preparation.** Thousands of professionals use Rogo agents to prepare for their daily meetings. Drawing on conversations captured in Rogo Notes, agents build personalized briefings that combine a firm's relationship history with the latest news, company developments, and market activity, so professionals go into every conversation with up-to-date context.

**Market monitoring.** Financial professionals need to stay current on the people, companies, and markets they follow. From stock movements and earnings announcements to M&A activity and regulatory developments, Rogo agents use web search to proactively surface insights.

**Investment research and financial analysis.** Whether evaluating an investment, building a model, or preparing an investment committee memo, Rogo agents combine current public information with licensed datasets and internal firm knowledge. Even building a buyer list for a sell-side deal, which once meant reviewing 50 to 100 private equity firms' websites by hand, now runs on web research, which drastically speeds up the process.

The quality of those results also matters. Many of the sites Rogo's users depend on are heavy on JavaScript and hard to read.

> "Details matter in high-stakes financial decisions. When our agents query the open web for information, what comes back needs to be factual and relevant. Of all the providers we tested, Parallel delivered the highest quality results at the best price."
>
> — Gabriel Stengel, CEO, Rogo

## Choosing Parallel

Curt Janssen, Software Engineer at Rogo, built a set of evals to benchmark search and retrieval providers. The evals focused on what matters most for financial work:

- **Accuracy and speed.** Results feed directly into financial analysis inside live workflows, so they had to be factual, relevant, up to date, and fast.
- **Hard-to-read sites.** Many of the company and financial sites Rogo's users depend on are heavy on JavaScript, and a provider has to handle them reliably.
- **Token efficiency.** Clean, focused page content keeps agents fast and keeps costs down at Rogo's scale.
- **Reliability and cost.** A platform running hundreds of thousands of workflows needs consistent performance at a sustainable price.

Parallel meets Rogo's bar on quality while improving reliability, freshness, latency, and cost. Today, Rogo's agents use Parallel's Search API to find sources and its Extract API to pull content from them, often extracting several pages in one call. Rogo runs hundreds of thousands of requests a day, and growing, with stable latency and error rates under 0.002%.

For Rogo, one of Parallel's key differentiators has been its willingness to build alongside the Rogo team while meeting the performance, reliability, and cost-efficiency requirements of a platform operating at Rogo's scale. That responsiveness, including support for Rogo's European infrastructure requirements, has made Parallel a critical partner.

## Meeting European banks' requirements with EU data residency

As Rogo expanded its presence in Europe, it saw early demand from some of the largest banks in the region. To serve them, Rogo needed to meet the security and compliance standards European customers expect, including processing data in the EU, while holding the same quality bar its US customers rely on.

[Parallel's EU endpoint](https://parallel.ai/blog/eu-data-residency) met those requirements without trading off security, compliance, quality, or latency. Requests for European clients are processed in the EU against an EU-hosted copy of Parallel's search index. Because the two teams already worked closely together, Rogo was up and running quickly. It kept the same API and changed only the base URL, so it didn't need a second vendor or a separate integration.

> "We work with the largest financial institutions on earth, and those institutions are always multinational. Data residency is very top of mind for our clients outside the US. Parallel's EU endpoint lets us serve them with the same technology our US customers rely on, allowing us to meet a common requirement from our European customers to process requests within the EU. Working with Parallel also feels like a real partnership. Their team builds alongside us, so our clients get timely, accurate web research in every workflow, wherever they operate."
>
> — Strib Walker, Head of Product, Rogo

## What's next

Deploying AI across global markets means navigating complex, jurisdiction-specific regulatory requirements. As Rogo expands rapidly across EMEA and APAC, it is investing in a meaningful on-the-ground presence to serve financial institutions in each market. Partners like Parallel are critical to that effort, helping Rogo meet customers where they are and adapt to local requirements as it scales globally.

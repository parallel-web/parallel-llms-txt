# The outside world is the new infrastructure

The last infrastructure cycle made companies smarter about their own infrastructure. The next one is turning everything outside the firewall into machine infrastructure.

For most of the last decade, infrastructure was the safest bet in software. That was true for the people who built careers in it and for the investors who funded it. A second infrastructure cycle has started, and I think it will be larger than the first.

The last generation of infrastructure made a company’s own data easier for its people to use. The new generation turns everything outside the company, the live web included, into something AI systems can use directly.

AI has already done this twice. Training turned the public web into models. Reasoning turned those models into products that do the work of lawyers, analysts, and engineers. The third step is retrieval: giving AI agents (software that carries out tasks on its own) a fast, checkable way to read the live web every time they act. That’s the layer we’re building at Parallel.

## The last infrastructure decade looked inward

I used Parallel’s [Task API](https://parallel.ai/products/task), our research product, to study the 34 infrastructure companies that defined 2015 to 2021, from Snowflake and Databricks to Datadog, GitHub, and Tableau.

![The 2015 to 2021 infrastructure cohort: 34 companies, $812B of combined value, $39B of venture capital raised.](https://cdn.sanity.io/images/5hzduz3y/production/51310288582966b7a89b11708ef3665e1798cefa-2395x685.png)

![Bar chart of current or exit value by category for the 34-company cohort. Warehouses and lakes lead at $312B, followed by network, edge, and APIs at $167B and observability at $158B.](https://cdn.sanity.io/images/5hzduz3y/production/2f1f03cb9b64413b3004c4d96c447b950cd6ff14-2395x1258.png)

The winners did very well. Cloudflare closed its first trading day in September 2019 worth about $5.3B and is worth about $124B today, roughly 24x. MongoDB went from $1.6B to about $33B.

For each company, I asked the Task API whether the product mainly works with the customer’s own data and systems or brings in information from outside. It came back internal for all 34. Snowflake stores your data, Fivetran moves it, Datadog watches your systems, and Tableau charts your numbers.

That decade was about helping companies understand themselves. It created enormous value, and it had a ceiling. Internal data can’t tell a company what a competitor launched this morning or what a regulator changed last week. People still had to read the world outside the firewall (i.e., by Googling it), interpret it, and manually bring it back inside.

## AI points infrastructure outward

The most valuable new companies of this cycle take information that lives outside any one company (the open web, filings, case law, research, code, and news) and turn it into a service that software or agents can call. The shift is happening in layers, and each layer builds on the last.

### Training

Training is how a model learns: it reads a huge share of the public web and compresses it into a model. Counting xAI at the [$250B value SpaceX put on it](https://x.ai/news/xai-joins-spacex) in February 2026, the eight leading labs are worth about $2.17T on $404B raised. Anthropic leads at $965B after its [May funding round](https://www.anthropic.com/news/series-h), and OpenAI is at $852B after its [March round](https://openai.com/index/accelerating-the-next-phase-ai/). Training rewards a handful of companies with enormous balance sheets, which is why the next layers matter so much to everyone else.

### Reasoning

Reasoning is where outside knowledge becomes specialized work: a contract reviewed, a diligence memo drafted, a software change shipped. We researched 50 leading AI companies that each serve one industry. The 47 with a disclosed valuation are worth about $291B on $32B raised, and most were founded in 2021 or later.

![Bar chart of the latest valuation by industry for 47 industry-focused AI companies. Software engineering leads at $136B, followed by healthcare at $26.7B and media and creative at $26.2B.](https://cdn.sanity.io/images/5hzduz3y/production/ebe2814d446951944e156e98f0fb400d0bbfb72c-2395x1824.png)

Datadog took nine years to reach an $11B stock market debut. [Harvey](https://www.harvey.ai/blog/harvey-raises-dollar550m-at-a-dollar155b-valuation-to-help-legal-teams-own-their-intelligence), Sierra, and OpenEvidence each passed $15B within about five years of founding, and Cursor [joined SpaceX](https://cursor.com/blog/joining-spacex) in a $60B deal four years in. Every one of these companies depends on information from outside its customers’ walls.

### Inference

Every time someone asks an AI a question, a computer has to run the model to produce the answer. That step is called inference, and companies like Fireworks, Baseten, and Together sell it by the token (a token is on average three-quarters of a word).

The price of inference has collapsed. [Epoch AI](https://epoch.ai/publications/the-plunging-price-of-thought) estimates that the cost of a given level of AI performance has fallen about 13x a year since 2023. GPT-6 Luna, which OpenAI released on September 22, [beats GPT-5.6 Sol, released in July and run at medium effort, on a computer-use test at a tenth of the cost](https://openai.com/index/introducing-gpt-6-sol-and-luna). Inference companies are still among the fastest-growing businesses in software. [OpenRouter](https://openrouter.ai/announcements/series-b), which routes requests between AI models, saw its weekly volume grow from 5 trillion to 25 trillion tokens in the six months to May 2026, and eight inference platforms and chipmakers are now worth about $112B. A falling price and a booming market can coexist when usage grows faster than the price falls.

### Retrieval

A model is a snapshot of what it read during training. Recent frontier models have shipped two to six months after that reading stopped, and the gap widens every month a model stays in service. An agent doing real work needs to know what’s true now, where it came from, and how confident to be. Without retrieval, it’s working from a plane with no Wi-Fi.

Retrieval demand also grows differently from the last cycle. Human search grows with the number of people and the hours in their day. Agent retrieval grows with the number of agents and the steps each one takes, and a single agent task can call it dozens of times.

Google organized the world’s information for people and became where they go to find answers. We’re doing the same for agents: organizing the live web so it becomes where agents go to find answers. Our [Search](https://parallel.ai/products/search), [Task](https://parallel.ai/products/task), and [Monitor](https://parallel.ai/products/monitor) APIs let agents find, research, and watch the web, with sources and a confidence level behind every answer.

## Why agents need the live web

When a model’s training is missing the answer, it rarely says so. On Artificial Analysis’ [AA-Omniscience](https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier) test, OpenAI’s newest GPT-6 Sol, when it doesn’t know an answer, still guesses wrong 60% of the time instead of saying so. That’s down from 92% for its predecessor, and it’s still most of its misses. Pasting more documents into the prompt doesn’t fix it either, because models [lose track of long inputs](https://arxiv.org/abs/2502.05167) well before they reach their limit.

What helps is handing the model the right few facts from a live source. On SimpleQA Verified, a separate test of short factual questions, an agent using Parallel Search answered 97% correctly in [our own September 9 runs](https://parallel.ai/benchmarks).

## Volume beats price

The usual objection is that retrieval is a race to the bottom on price. But revenue is price times volume, and the two biggest query businesses show how much volume can carry.

![Column chart of Google advertising revenue from $67B in 2015 to $295B in 2025, with its share of Alphabet revenue falling from 90% to 73%.](https://cdn.sanity.io/images/5hzduz3y/production/44cbf3a959978af04567688ca338796a3a69472d-2395x1271.png)

Google earned $224.5B from Search and related products in 2025 on [more than 5 trillion searches](https://searchengineland.com/google-5-trillion-searches-per-year-452928), about $45 per thousand searches at human scale. [Snowflake](https://www.snowflake.com/en/company/overview/about-snowflake/) earns roughly $2 per thousand queries, more than 20 times less, and still built one of the largest businesses of the last cycle on machine-scale volume.

|  | Google Search | Snowflake | Agent retrieval today |
| --- | --- | --- | --- |
| Annual volume | 5T+ searches | about 2.3T queries | not disclosed |
| Revenue per 1,000 | about $45 | about $2 | $1 to $16 list price |
| Who is asking | people | software | agents |

Agents already bring that volume. A single AI answer that searches can pull dozens of pages; [AirOps](https://www.airops.com/report/influence-of-retrieval-fanout-and-google-serps-in-chatgpt) counted about 37 per query. In July 2025, OpenAI said ChatGPT handled about [2.5 billion prompts a day](https://techcrunch.com/2025/07/21/chatgpt-users-send-2-5-billion-prompts-a-day). At the search rates third-party studies measure, that’s roughly 7 trillion page retrievals a year from one product, more than Google’s 5 trillion annual searches.

Put simply: if the price per lookup falls tenfold while usage grows a thousandfold, the market still grows a hundredfold. Price pressure is real, and volume growth is even bigger.

## Retrieval is becoming a bigger share of the bill

An AI model bills for the words it reads and writes, measured in tokens, while tools like web search bill per lookup. An agent looks things up over and over, so as models get cheaper, lookups take a larger share of what each task costs.

![Stacked bar chart of cost per task split into search and page reads, reasoning, and inference at GPT-6 prices. On a cheap model, search is 85% of a chat question and 65% to 87% of a 20-step agent task.](https://cdn.sanity.io/images/5hzduz3y/production/68f08a436025d53428869d7bd388bc26fe6268f6-2395x1244.png)

On a cheap model, retrieval is already two thirds or more of the cost of an agent task, and models keep getting cheaper at the 13x-a-year pace Epoch measures. The model still matters, but the retrieval layer increasingly decides both what an agent costs to run and how often it gets the answer right.

## Why retrieval becomes its own layer

Why won’t the AI labs simply own retrieval? Three things point the other way.

**Customers want a layer that works with every model.** In a [Dataiku survey](https://www.dataiku.com/blog/ai-switching-problem) of 600 CIOs, 81% said they expect to rely on two or more AI model providers in 2026. An independent retrieval layer lets a company swap models and keep the same trusted source of truth underneath.

**The leading labs source retrieval from outside.** Anthropic’s web search [runs on an outside supplier](https://simonwillison.net/2025/Mar/21/anthropic-use-brave/), and OpenAI still [relies partly on outside providers](https://searchengineland.com/openai-chatgpt-serpapi-google-search-results-461226) for ChatGPT’s results. Since July 2026, Google Cloud customers can [connect Gemini to Parallel’s web search](https://developers.googleblog.com/expanding-choice-in-gemini-enterprise-agent-platform-introducing-grounding-with-parallel-web-search).

**The open web is putting up gates.** Cloudflare, which sits in front of [about a quarter of websites](https://w3techs.com/technologies/details/cn-cloudflare), has [blocked AI crawlers by default](https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/) since July 2025 and is building ways for publishers to get paid for AI access. A retrieval layer that handles access and payment at scale becomes the practical way through.

## Who is adopting the retrieval layer

Three groups are reaching the same conclusion from different starting points:

- **Enterprises** are moving from internal AI to agents that combine their own data with what’s happening outside the firewall.
- **Software companies** are turning AI features into full agents, which need checkable access to the live web to do useful work.
- **Agent-native companies** like Town and Instinct launch with retrieval at the core of the product.

Each of these shifts adds agents to the web and raises how often each one calls it. We expect human use of the internet to end up a footnote next to agent use.

## What this means if you’re buying AI

If you’re choosing AI tools for your company, treat retrieval as its own decision. Ask vendors how their agents get information from the web, and whether every answer comes with sources you can check. Budget for lookups as well as model usage, because lookups are the part of the bill that grows as your agents do more. And keep retrieval separate from your model provider, so you can change models later without rebuilding the source of truth underneath.

## Why I’ve never been more bullish

![Bar chart of combined value by layer: training (8 labs) $2,170B, last infrastructure cycle (34 companies) $812B, reasoning (47) $291B, inference (8) $112B, and retrieval (5) $28.6B.](https://cdn.sanity.io/images/5hzduz3y/production/f1148c8e68e0efdfe3cb6f0b3c3eb025d5ad4144-2395x1036.png)

These totals mix stock-market values, acquisition prices, and private funding rounds, so read them as orders of magnitude rather than precise comparisons. Even so, the gap is large. Eight AI labs are worth about 2.7x all 34 winners of the last infrastructure cycle. Industry-focused AI companies, mostly three to five years old, are worth more than a third of that cohort. The five retrieval companies we tracked are worth about $28.6B combined, which is where the other layers were a few years ago: small, early, and underpriced relative to how much the rest of the stack depends on them.

Inference is the closest comparison for where retrieval goes next. Eight inference platforms and chipmakers, most of them only a few years old, are already worth about $112B because every model call runs through them. If retrieval ends up paired with inference on every agent task, and lookups keep taking a larger share of each task’s cost, I’d expect retrieval to follow a similar growth curve.

The last infrastructure cycle made companies smarter about themselves and produced about $800B of value. This one is making machines fluent in everything outside the firewall. That’s why I joined Parallel, and why I’m more bullish today than the day I walked in. If you’re working out how your agents should read the web, [talk to our team](https://contact.parallel.ai/).

> **How we did the research**
>
> All company figures come from Parallel Task API research run in September 2026, except where a source is linked.
>
> **The 2015 to 2021 infrastructure cohort** is 34 companies/ Values are current market value for the 11 public companies, the deal price for the 12 acquired, and the latest disclosed valuation for the 11 still private.
>
> **Internal vs external:** for each company, we asked the Task API whether its product primarily works with the customer’s own data and systems or brings in information from outside.
>
> **The other layers:** training is eight AI labs, with xAI at its $250B February 2026 merger value. Reasoning is 50 industry-focused AI companies, 47 with a disclosed valuation. Inference is eight platforms and chipmakers. Retrieval is five companies.

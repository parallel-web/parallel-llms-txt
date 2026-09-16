# Where agents find answers

Web infrastructure for AI to search, extract, monitor, and reason over the world's information

[Start building for free](https://platform.parallel.ai/)

## Join the teams building the AI frontier

Trusted by category-defining startups & Fortune 500 enterprises

* Harvey
* Formation Bio
* Attio
* Starbridge
* Granola
* Pfizer
* Manus
* Hex
* Modal
* Dropbox
* Owner
* Greptile
* Rogo
* Profound
* Opendoor

## Put the web to work across every industry

* Monitor portfolios, signals, and pricing  
Watch the things your business runs on: portfolio companies, target accounts, competitor pricing, regulations. Get a structured alert the moment something material changes, so you only hear what matters to you.  
Example query: Find the latest funding rounds for AI infrastructure startups
* Answer with fresh facts, inside your product  
Give your assistant, copilot, or coding agent current, cited answers fast enough for a chat thread: live docs, real-world context, breaking news. Your users get the answer that's relevant today, not at training time.  
Example query: What changed in the EU AI Act this month?
* Automate research on any account, market, or thesis at scale  
Hand over an objective and get back hundreds of finished, cited reports in minutes: an account brief before the call, an investment memo, a competitive landscape. Analyst-grade work, embedded in your workflow.  
Example query: Build a cited brief on the industrial robotics market
* Enrich companies, people, and accounts  
Drop in a list or describe who you're looking for. Get back live, structured profiles: target accounts, investment candidates, vendors, or the long tail. Every field cited and confidence-scored, ready for your CRM or pipeline.  
Example query: Enrich these 50 accounts with headcount and funding

## Better answers start with better web search

Parallel gives agents real-time access to fresh and relevant context from the web. Search billions of pages, extract key information, monitor changes, and do complex research with cited outputs you can trust in production.

[API Playground](https://platform.parallel.ai/)

What do I need to know for my meeting tomorrow?

### With Parallel retrieval

The company closed a $40M Series B last week and has been hiring aggressively in enterprise sales since, a signal they're moving upmarket. The lead contact joined as VP of Product in January, previously led product at a direct competitor, and published a piece last week flagging retrieval quality as their biggest infrastructure gap.

High confidence

### LLM only

The company is an enterprise SaaS business focused on workflow automation, backed by Sequoia and Index Ventures. The lead contact is a senior product leader who previously worked at Salesforce. They've been growing their enterprise segment and expanding internationally.

## Designed to compose

With Parallel, agents can find quick answers, watch the web for changes, enrich databases, and do deep research across the deepest corners of the web, all through a single API.

[API Playground](https://platform.parallel.ai/)

* EXTRACT: Find the latest news on my competitors
* MONITOR: Alert me when any of them raises a new round
* DEEP RESEARCH: Build a cited funding report

## Production-grade trust

Parallel's Web Agents use [Basis](https://docs.parallel.ai/task-api/guides/access-research-basis) to attach provenance and calibrated confidence scoring to every output, for trusted use and auditability in production. Every score can be fed back into retrieval to continuously improve results over time.

[API Playground](https://platform.parallel.ai/)

## More signal per token

Reduce your inference spend while improving quality with more context-efficient retrieval. Every query is served by Parallel’s web index, purpose-built for agents.

[Onboard your agent](https://docs.parallel.ai/getting-started/overview#onboard-your-agent)

Our products

## Retrieval, built from the ground up

Parallel makes the web programmable, bringing the world's information to agents, grounding them in better facts, helping them do complex knowledge work, and even keeping them pro-actively informed. Everything runs on Parallel's proprietary web search stack, built for the scale AI demands.

* [Task API](https://parallel.ai/products/task)  
Deep research and analysis at enterprise scale. Give it an objective, get back structured, cited answers
* [Monitor API](https://parallel.ai/products/monitor)  
Track changes and act on what matters, with structured alerts via webhook.
* [FindAll API](https://parallel.ai/products/findall)  
Build structured datasets with real-time enrichment. Describe what you want, get a live list.
* [Search API](https://parallel.ai/products/search)  
The highest-accuracy web search for your AI. Fresh, fast, and affordable grounding in one call.
* [Extract API](https://parallel.ai/products/extract)  
Get full or excerpted contents from the public web, including PDFs, JS-heavy pages, and government sites
* [Parallel Web Index](https://index.parallel.ai)  
Real-time access to the web's most valuable sources, built from the ground up for AIs.

## Better, faster, cheaper at every price point

From sub-second lookups to hour-long research, state of the art at every tier

[Start building for free](#start)[View all benchmarks](https://parallel.ai/benchmarks)

### SimpleQA Verified

__SimpleQA Verified — Accuracy (%) vs Cost (CPM).__
| Provider            | Accuracy (%) | Cost (CPM) |
| ------------------- | ------------ | ---------- |
| Parallel Fast       | 94           | 2          |
| Parallel Turbo      | 91           | 2          |
| Parallel Advanced   | 97           | 28.3       |
| Parallel Basic      | 97           | 45         |
| Exa Auto (low-cost) | 91           | 7.9        |
| Tavily (low-cost)   | 94           | 17.4       |
| Exa Auto (frontier) | 91           | 35.7       |
| Tavily (frontier)   | 92           | 61.3       |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[SimpleQA Verified](https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified), created by Google DeepMind, is a 1,000-question refinement of OpenAI's SimpleQA with corrected labels and balanced topics, covering short, fact-seeking questions. Results are reported on a sample of 100 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

### BrowseComp

__BrowseComp — Accuracy (%) vs Cost (CPM).__
| Provider            | Accuracy (%) | Cost (CPM) |
| ------------------- | ------------ | ---------- |
| Parallel Fast       | 44           | 11.8       |
| Parallel Turbo      | 32           | 13.2       |
| Parallel Advanced   | 74           | 399        |
| Parallel Basic      | 72           | 612        |
| Exa Auto (low-cost) | 36           | 53.4       |
| Tavily (low-cost)   | 32           | 176        |
| Tavily (frontier)   | 66           | 935        |
| Exa Auto (frontier) | 70           | 971        |

CPM: USD per 1000 requests, log scale. Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[BrowseComp](https://openai.com/index/browsecomp/), created by OpenAI, contains 1,266 questions that require persistent browsing to locate hard-to-find, entangled information on the web. Results are reported on a sample of 50 questions.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

Cost includes LLM token costs and tool call costs, averaged per question and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

### WideSearch

__WideSearch — Score (%) vs Cost (CPM).__
| Provider            | Score (%) | Cost (CPM) |
| ------------------- | --------- | ---------- |
| Parallel Turbo      | 44        | 10.1       |
| Parallel Fast       | 45.5      | 10.5       |
| Parallel Advanced   | 57.6      | 692        |
| Parallel Basic      | 55.3      | 965        |
| Exa Auto (low-cost) | 53        | 41.2       |
| Tavily (low-cost)   | 47.9      | 107        |
| Exa Auto (frontier) | 55.9      | 1061       |
| Tavily (frontier)   | 55.9      | 1072       |

CPM: USD per 1000 requests, log scale. Score is item-level correctness averaged across tasks (partial credit). Frontier tier uses a GPT-5.6 Sol agent; low-cost tier uses a GPT-5.6 Luna agent.

**Dataset**

[WideSearch](https://arxiv.org/abs/2508.07999), created by ByteDance Seed, contains 200 broad information-seeking tasks that require collecting many verifiable facts from across the web and assembling them into a structured table. Results are reported on a sample of 100 tasks.

**Evaluation methodology**

Multi-step agentic evaluation at two price tiers. In the frontier tier a GPT-5.6 Sol agent (reasoning: high) is paired with Parallel Basic and Parallel Advanced; in the low-cost tier a GPT-5.6 Luna agent (reasoning: low) is paired with Parallel Fast and Parallel Turbo. Exa and Tavily are run at both tiers with the same agent. The agent calls each provider's search tool and extract tool. Answers are graded by an LLM judge.

WideSearch is scored with partial credit: each task's score reflects the share of required items collected correctly, averaged across tasks, so it is not directly comparable to the exact-match accuracy on the other benchmarks.

Cost includes LLM token costs and tool call costs, averaged per task and shown on a log scale.

**Testing dates**

Evals were run on September 9, 2026.

## Pioneers of the agentic web are building with Parallel

> “Authoritative legal data across dozens of countries lives on sites no search engine has ever indexed. Parallel solves that at a scale we couldn't build ourselves.”
> 
> Gabe Pereyra, President & Co-Founder, Harvey

> “The best agentic search isn't just the fastest or the cheapest. It's net new information that language models don't already know. Parallel delivers that.”
> 
> Sarah Sacks, AI Lead, Notion

> “Parallel provided us with a big upgrade in speed and index coverage. Combined with a 5x improvement in cost efficiency, it was an easy decision to build our agents with them.”
> 
> Vikas Velagapudi, Founder, Convoke

> “You cannot make mistakes in financial services. With Parallel, our banking customers run agents that complete complex KYB checks in minutes, not hours.”
> 
> Maik Taro Wehmeyer, Co-Founder & CEO, Taktile

> “In our internal evaluations we found Parallel to be the fastest and most accurate web search tool we tested. That speed together with its fine-grained control over web search means our agents can iteratively search, view results and refine search terms to get the answers users need.”
> 
> James Clough, Head of AI, ModelML

> “We benchmarked providers on web research across entity types (companies, people, vessels), geographies, and data richness. Parallel topped every dimension on both breadth of findings and accuracy.”
> 
> James Rogers, Product Manager, Bretton AI

> “Parallel is core infrastructure for our agents. It outperformed every alternative on quality and cost, pulling from the whole web instead of prepackaged datasets.”
> 
> Mihir Garimella, CEO, Actively

> “Parallel is the highest accuracy API on the market. It handled the edge cases other providers simply couldn't: obscure companies, ambiguous names, conflicting sources.”
> 
> Max Brodeur-Urbas, CEO, Gumloop

> “Parallel's Monitor API lets Poke track anything our users care about: their team, their neighborhood, the news that matters to them. It helps make Poke more proactive in their daily lives, which ultimately makes for a better companion.”
> 
> Marvin Von Hagen, CEO, Interaction

> “Parallel consistently delivered the highest quality results at the best price, and handled the complex government websites every other provider struggled with.”
> 
> Sweyn Venderbush, CEO, Starbridge

> “Parallel's team was incredibly helpful as we designed how Amp would use their APIs: tool names, params, UI, and other thoughtful guidance. They get it, and they care.”
> 
> Quinn Slack, CEO, Amp

> “We chose Parallel as our preferred search API because of the comprehension and accuracy of their outputs: structured, well-sourced, and ready to feed straight into our content generation agents.”
> 
> Dylan Babbs, Co-founder, Profound

> “Our partnership with Parallel replaces repetitive human effort with continuous agentic research that integrates seamlessly into enhanced decision-making systems.”
> 
> Sanjeev Vohra, CTIO, Genpact

> “We tested every major web search provider. Parallel's outputs came back structured, well-cited, and dense with the right information.”
> 
> Amr Shafik, VP Product, Airops

Trust

## Built for enterprise, secure by design

Build trust with the [Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis), unique to Parallel: calibrated confidence scores, citations, source excerpts, and reasoning traces.

* SOC 2 Type 2
* Zero data retention available
* HIPAA-ready offering
* GDPR Compliance
* Single sign-on (SSO/SAML)

## Pay for answers, not tokens

Every Parallel API flexes to fit your needs. Dial speed, depth, and cost to what each workflow is worth, set a budget cap, and hold to it. Per-request pricing means you pay for answers, not tokens, so there’s no incentive to burn context and no surprise bill at the end of the month.

[Pricing](https://parallel.ai/pricing)

## Start building for free

Get started with our APIs in seconds. Run up to 5,000 requests per month for free.

[API Playground](https://platform.parallel.ai/) [Docs](https://docs.parallel.ai/getting-started/overview#onboard-your-agent)

Agent onboarding prompt:

Use curl to read parallel.ai/agents.md and perform the setup to install Parallel

Available everywhere you build

* Google Cloud
* OpenRouter
* Vercel
* LangChain
* Supabase
* Google Sheets
* Snowflake
* Gemini
* Hermes Agent
* OpenClaw
* n8n
* MPP

## FAQs

* **What does Parallel do?**  
Parallel builds web search and research APIs purpose-built for AI agents and agentic workflows. We run our own web-scale index with billions of pages and millions more added and updated daily. Our product suite spans the full range of knowledge work agents are helping automate for businesses: Search and Extract for real-time retrieval, Task and FindAll for deep research and entity discovery, and Monitor for continuous tracking. If your agent needs to read, research, or watch the web, Parallel is the unified platform that makes it as easy as an API call.
* **How is Parallel different from other web search APIs (like Exa, Tavily, or Perplexity)?**  
Most search APIs retro-fit traditional search engines for AI, but Parallel’s Index was designed for LLMs and programmatic use from the start. Our products are powered by innovations in crawling, indexing, and retrieval applied for efficient use of LLM context windows and software pipelines. By rebuilding the stack for the agentic software market, Parallel makes AI viable for high-stakes sectors like law, finance, and healthcare where accuracy is paramount.
* **Why does AI need the web?**  
Large language models are trained on past information, which means their knowledge of the present is out of date as soon as a training run begins. LLM knowledge cutoffs are often many months or even years behind present day facts. Web search APIs ground LLMs in real-world news published across the open (and in some cases, closed) web to ensure that AI always has the most up-to-date information needed to answer a query or task.
* **Which Parallel API should I use?**  
Start with the job you need done:

  * Search API returns ranked URLs and dense excerpts in real time. Use it to ground an agent or assistant in fresh, cited web context or to find the most relevant pages (URLs).
  * Extract API turns any public URL, including hosted PDFs and JavaScript-heavy pages, into clean markdown context. Use it to pull content from public URLs you already have or recently surfaced with a web search.
  * Responses API returns synthesized, cited answers from the live web in seconds. Use it for latency-sensitive research in products or as a web research subagent — same quality as Task, purpose-built for conversational speed.
  * Task API runs structured deep research and data enrichment with citations and confidence scoring. Use it for reports, account briefs, due diligence, or enriching records at scale — best cost-to-quality for async or background work.
  * FindAll API discovers and structures entity datasets from a natural language query. Use it to build a live list of anything, including but not limited to events, people, and companies.
  * Monitor API tracks the web continuously and sends webhook alerts when something appears or changes. Use it to watch prices, news, competitors, or regulations.  
The general rule: Search and Extract when latency matters and you need raw context, Responses when you need synthesized answers at conversational latency, Task and FindAll when you need deeper synthesis and structure (best cost-to-quality for async or background work), Monitor when the work never stops (ambient agents that proactively do work when triggered by new information).
* **How much does Parallel cost? Is there a free plan?**  
Parallel is pay-as-you-go, priced per request rather than per token, so you know what a call costs before it runs. Web search starts as low as $1 per 1,000 requests.  
New accounts get a signup credit, and every account gets a recurring free monthly allowance of $5\. Free credit is always spent before any paid balance, so you only pay once you’ve used it up. Parallel Search is also available via a free hosted MCP server, which is suitable for personal/hobbyist use.  
See [parallel.ai/pricing](/pricing) for the full breakdown. For higher rate limits and bespoke agreements, speak with [our sales team](https://contact.parallel.ai/).
* **What is the Parallel Web Index?**  
The Parallel Web Index is our proprietary, web-scale index of the open web, designed from the ground up to power the scale that AI web search demands. Our index contains billions of pages, and millions are added or updated daily, keeping it fresh and far-reaching.
* **What is Index by Parallel?**  
[Index by Parallel](https://index.parallel.ai/) is a platform that helps content owners understand how AI agents use their work and earn compensation tied to the value they contribute. Compensation is calculated by estimating each source’s Shapley value, its marginal contribution to the work an agent performs at the moment of inference. Content that’s uniquely valuable, hard to replace, or used in high-value agent work earns more.
* **How fresh is Parallel's data?**  
Parallel adds millions of pages to the Parallel Web Index daily, and you can force a live crawl for time-sensitive queries. Set freshness controls to require recent pages or trigger a fresh fetch, so your agent always reads what’s true today.
* **How does Parallel cite its sources?**  
Search and Extract APIs include source URLs.  
On Parallel’s agentic APIs (Web Agents), every output supports [Basis](https://docs.parallel.ai/task-api/guides/access-research-basis), our verifiability framework, which attaches citations, the reasoning behind a result, and a calibrated confidence score to each fact. You can trust an answer in production and audit it afterward, tracing any claim back to the page it came from. Those confidence scores also feed back into retrieval, so results improve over time.
* **Is Parallel secure and compliant?**  
Yes. Parallel is SOC 2 Type II certified, HIPAA compliant, and offers zero data retention. For teams with stricter requirements, enterprise controls are available. See our [terms of service](/customer-terms) for more information.
* **How do I connect Parallel to my agent or existing stack?**  
You have a few options. Call the REST API directly, or use the Python (parallel-web) or TypeScript SDK. For agent frameworks, the Parallel Search MCP server drops in through Cursor, Claude Code, and other MCP-compatible tools. If you already use the OpenAI SDK, point your base URL at the Chat API and swap your key; everything else works the same. Parallel also integrates with LangChain, the Vercel AI SDK, and Google Vertex AI, and delivers async results over webhooks. Start at [docs.parallel.ai](https://docs.parallel.ai).

## Where agents find answers

[Start building for free](https://platform.parallel.ai/) [Contact us](https://contact.parallel.ai/)

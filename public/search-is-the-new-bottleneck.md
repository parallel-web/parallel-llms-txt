[](https://artificialanalysis.ai/agents/search-api)

Parallel ranks #1 on the Artificial Analysis Search Index. [See the leaderboard.](https://artificialanalysis.ai/agents/search-api) [[See the leaderboard.] (https://artificialanalysis.ai/agents/search-api)](https://artificialanalysis.ai/agents/search-api) Parallel ranks #1 on the Artificial Analysis Search Index. [See the leaderboard.](https://artificialanalysis.ai/agents/search-api)

Contents

1. Search spend grows with every call
2. From prompts to production scale
3. The search call changes what happens next
4. What this looks like in production
5. Compare the cost of a correct answer

# Search is the new bottleneck for AI Agents

As token prices fall, web search can account for more of the cost of running an agent. A better model costs more per call, but better search can lower the cost per correct answer.

When an agent gets expensive or gives a poor answer, teams usually look at the model first. They compare providers, try a smaller model, or tune the prompt. Search deserves the same scrutiny because it determines which facts the model sees. You pay for each search call and for the tokens the model uses to read the results. To understand the cost of an answer, you need to count both.

Say your agent needs to check which of a vendor’s plans include single sign-on. If search returns a long product page that mentions the feature but leaves out the plan details, the agent spends tokens reading it and still needs another search. If the first search returns the relevant row from the vendor’s pricing table, the agent can answer correctly with fewer tool calls and fewer tokens.

[**Parallel Search**](https://parallel.ai/products/search) is web search built for agents. Your agent describes what it needs in natural language and gets back ranked URLs with the most relevant excerpts from each page. The model you already use can answer from those excerpts without fetching full pages. When the first search surfaces the evidence, the agent can answer correctly with fewer tool calls and fewer tokens.

## Search spend grows with every call

A few searches per task can add up to hundreds of millions of requests a year as agent usage scales to production workloads. At that scale, even a small difference in the price per search can make search the second or third largest expense in your AI stack, after inference.

**Parallel Search Fast** matches or exceeds the quality of other search providers at one-seventh the price. At 200 million searches a year, that is $200K instead of $1.4M. At a billion searches, it is $1M instead of $7M, a saving of $6M a year on search alone.

Annual search fees by volume

**Parallel Search Fast** costs one-seventh as much at every volume: $1M against $7M at 1B searches a year.

Other search provider Parallel Search Fast

$2M

$4M

$6M

$8M

$0

_$1.4M_ _$200K_ 200M _$2.8M_ _$400K_ 400M _$4.2M_ _$600K_ 600M _$5.6M_ _$800K_ 800M _$7M_ _$1M_ 1B

Searches per year

**Figure 1:** Equal or better search quality at one-seventh the price. Annual search fees for other search providers and **Parallel Search Fast** . Built on **Parallel** ’s own index and infrastructure for greater efficiency at scale. Token-efficient results reduce LLM costs too, adding savings beyond the search bill.

The $6M in savings covers search costs alone. Every search also adds text for the model to read, so fewer searches and more relevant results can reduce token spend on top of those savings.

Estimate your search bill

At the default workload, search passes inference in month 4 and reaches 99.8% of the bill in three years.

Your workload

Workload type

Occasional Grounded Deep research

Model $3.60 / 1M blended Edit

GPT-6 Astra GPT-6.1 Sol GPT-6.1 Terra GPT-6 Luna Claude Fable 5.2 Claude Opus 5.5 Claude Sonnet 5.5 Claude Haiku 5.5 Gemini 4 Argon Gemini 3.1 Pro Gemini 3.8 Flash Gemini 3.5 Flash-Lite Grok 4.7 DeepSeek V4 Pro DeepSeek V4.1 Flash Qwen3.8 Max Qwen3.6 Plus Qwen3.8 Flash Kimi K3 Kimi K3.1 Pro Kimi K2.6 GLM-5.3 GLM-5.3-Flash MiniMax M3 Custom

Tokens / month M

Searches / 1M i Google’s Deep Research estimate: about 80 searches per 310K tokens.

Each year, for three years

Reset

Token price falls Token price falls, 10× a year , edit exact value

Token volume grows Token volume grows, 3× a year , edit exact value

Search price changes Search price changes, \+0% , edit exact value

Run this comparison by provider

Parallel Search Fast Parallel Search Advanced Exa (Lite) Exa (Auto) Exa (Deep) Tavily Brave Search Perplexity Search Linkup Firecrawl $ / 1K

Compared with

* Parallel Search Fast $1 / 1K
* Tavily $8 / 1K ×
* Brave Search $5 / 1K ×

Add provider

Claude Sonnet 5.5 · Exa (Auto) $7 / 1K Edit

Your search forecast

At this workload, search is 34% of the bill today, 99\.8% in three years, and passes inference in month 4 .

On Parallel Search Fast, the same workload costs **$846K** less over three years.

At this workload, search is 34% of the bill today, 99.8% in three years, and passes inference in month 4. On Parallel Search Fast, the same workload costs $846K less over three years.

### Monthly spend, next 36 months

Inference and search on Exa (Auto). The share of the bill that is search sits under each year.

Dollars Share of bill

Show as table

* Search **$98K**
* Inference **$194**
* at year 3

Both lines ride the same token growth (×3.0 a year). Inference also gets the token price drop (÷10), so it nets ×0.30 a year. Search price stays flat, so search nets ×3.0 a year.

### Search spend by provider, next 36 months

Monthly search cost for the same workload. Hover or tap a month to read the saving, or a provider to single it out.

4 of 10 providers shown

* Tavily **$112K**
* Exa (Auto) **$98K**
* Brave Search **$70K**
* Parallel Search Fast **$14K**
* Inference **$194**

### The same workload on other models, today

Search costs the same whichever model runs the agent, so a more efficient model makes search a larger share of the bill.

Model Per month Search

Claude Sonnet 5.5 $10.8K 34%

GPT-6.1 Terra $7,240 50% ×

Gemini 3.8 Flash $6,340 57% ×

DeepSeek V4.1 Flash $4,600 79% ×

Qwen3.8 Flash $4,068 89% ×

Inference Search API

Add a model to compare \+ Add a model to compare GPT-6 Astra GPT-6.1 Sol GPT-6 Luna Claude Fable 5.2 Claude Opus 5.5 Claude Haiku 5.5 Gemini 4 Argon Gemini 3.1 Pro Gemini 3.5 Flash-Lite Grok 4.7 DeepSeek V4 Pro Qwen3.8 Max Qwen3.6 Plus Kimi K3 Kimi K3.1 Pro Kimi K2.6 GLM-5.3 GLM-5.3-Flash MiniMax M3

### The same workload on each provider, today

Search cost per month at today’s volume.

1. \# Provider Per month × Fast
2. 1 Tavily $4,160 8\.0×
3. 2 Exa (Auto) $3,640 7\.0×
4. 3 Brave Search $2,600 5\.0×
5. 4 Parallel Search Fast $520
6. _Inference $7,200_

Parallel Search Fast costs **$3,120** less a month than Exa (Auto) today.

**Calculator:** Estimates use list prices as of 11 Nov 2026 and the assumptions shown. Change any input to see your own bill. [Model the same workload on every provider in the full Search Tax Calculator.](https://searchcost.vercel.app/)

### Switching search tools cut a research agent’s token usage by 3.5×

An agent answering a research question needs to find evidence it can use to support its answer. We tested how much this kind of agent work costs when only the search tool changes.

**Before, with model-native search:** The agent reads through pages to find relevant information and searches again to fill gaps. Each search adds a fee and more text for the model to process as it works.

**After, with Parallel:** The agent gets relevant excerpts with source URLs, so it can build its answer with less reading and fewer searches.

Using our internal enterprise search benchmark, which includes questions requiring one source or information from multiple sources, we measured **3\.5× fewer tokens** after switching this particular research agent from model-native search to **Parallel** . Token usage fell from 67.1K to 19.1K per question, and total cost dropped by about two thirds with the same model and agent workflow.

What one research question costs

The same agent and model read 67.1K tokens per question with model-native search and 19.1K with **Parallel Search** : 3.5× fewer.

With model-native search

1. User query
2. Model
3. Model-native search $$$
4. Reasoning $$$
5. Final answer

Searches again

With

1. User query
2. Model
3. Search
4. Reasoning
5. Final answer

Tokens per question

67\.1K Model-native search

19\.1K _3\.5× fewer_ Parallel Search

Model-native search 67\.1K

Parallel Search 19\.1K

**Figure 2:** Denser excerpts and fewer searches cut end-to-end cost per question by two thirds. The same research agent and model on **Parallel** ’s internal enterprise search benchmark, with questions that need one source or several, and only the search tool changed: 3.5× fewer tokens per question.

## From prompts to production scale

Many workflows start by asking a model a question and refining the prompt based on its answer. This works well when the input already contains the information the model needs. When a question depends on something that changed yesterday, the agent workflow needs current evidence.

The first solution is often manual: search **Google** , open the sources, and paste the relevant passages into the model. A person manually handles the retrieval and verification. This process is a useful way to learn what the workflow needs, but every new research task requires more human effort and time.

Next, teams may connect a search tool. Some use the model provider’s built-in search. Other agent builders assemble a manual pipeline including a search API, page fetching, extraction, and validation. As volume grows, teams start asking why the agent keeps searching and how much of the retrieved text it uses.

In the next stage, teams evaluate retrieval as part of the system. They measure the tokens the agent consumes and whether it reaches a supported answer. At production scale, those measurements turn into quality targets and latency budgets for each workload.

You can adopt search designed for agents whether you’re starting with a basic prompt or already running a custom search pipeline. To optimize your model and search workflow, start by understanding the tasks your agent needs to handle.

The search maturity curve

Each stage changes how many calls an agent makes per question and what a correct answer costs.

Correct answers per dollar

04 Qualified answers at volume

Parallel Search returns cited excerpts on the first pass

Developer search maturity

Tool calls per question

Cost

Speed

Manual and emerging search

Search at scale

What changes at each stage

01 Unsourced answers The model answers from what it already knows

**0 tool calls** The model answers only from what is already in the prompt

**Model tokens only** No search fees, but no sources to check the answer against

**Instant** One model call, no retrieval

02 Manual answers A person searches and pastes in sources

**Every search done by hand** A person runs each query, opens tab after tab and copies passages into the prompt

**People’s time** A person’s work for every question researched

**Minutes to hours** Per question, depending on the research

03 Costly answers Built-in search or a SERP API, with retries

**Up to 20 tool calls** The agent searches, fetches pages and retries until the answer turns up

**$10 to $25 per 1,000 calls** Plus every fetched page billed as model tokens

**Seconds per call** Every retry adds more time

04 Qualified answers at volume Parallel Search returns cited excerpts on the first pass

**1 to 2 tool calls** Cited excerpts come back on the first pass, so the agent rarely searches again

**$1 to $5 per 1,000 calls** 35% fewer model tokens

**200ms to 3s per call** Depending on the search mode

05 Research at scale Parallel **Task** and **Decisions** add deeper context

**1 to 2 tool calls** Plus one **Task** call, only when a question needs deeper research

**Budgeted per workload** Search price for most calls, research price only where needed

**Set per workload** Deeper research takes longer. [**Bretton** cut investigations from about 20 to 12 minutes](https://parallel.ai/blog/case-study-bretton-ai)

13×

13× lower cost per question with **Parallel** , and about 15× more correct answers per dollar. **Parallel** answered 53.7% correctly for $15.20 per 1,000 questions. **OpenAI** ’s built-in search answered 48.3% for $204.30.

Source: parallel.ai/benchmarks · FinSearchComp T3, Parallel Search Fast vs OpenAI native search · same agent, questions and judge · Oct 22, 2026 · cost is end to end per question; cost per correct answer derived as cost ÷ accuracy

**Figure 3:** The search maturity curve, shown for illustration. Evaluate sources, token use, and answer accuracy at each step. Hover or tap a stage to compare it.

The questions an agent answers change as a company grows. Find the questions your team asks today, and the ones it will likely ask next.

What each company stage asks of search

The questions stay simple, but the number of answers they need keeps growing.

| |Ask once A person needs one answer, now and then |Ask for every user Your product asks on each user’s behalf, all day |Ask across a list One question, every row, run as a batch |Ask on a schedule The list, rechecked weekly or daily |
| --- | --- | --- | --- | --- |
|Questions | | | | |
|Vendor checks |“Does Acme have a SOC 2 report?” |“Does this new vendor have a SOC 2 report?” |“Which of our 400 vendors have SOC 2?” |“Alert us when a vendor’s SOC 2 expires.” |
|Account research |“Who is the CFO at Acme?” |“Who is the CFO at this rep’s next call?” |“Who is the CFO at each of our 2,000 accounts?” |“Flag any account that names a new CFO.” |
|Pricing |“What does Acme charge per seat?” |“What does this buyer’s shortlisted tool charge?” |“What do our 50 competitors charge?” |“Tell us when a competitor changes its price.” |

| |Ask once A person needs one answer, now and then |Ask for every user Your product asks on each user’s behalf, all day |Ask across a list One question, every row, run as a batch |Ask on a schedule The list, rechecked weekly or daily |
| --- | --- | --- | --- | --- |
|What changes for search | | | | |
|What matters most |**Getting it right** A person checks the answer |**Speed** A user is waiting |**Consistency** The same fields, each with a source |**Change** Catch what moved since the last run |
|Where the cost goes |**People’s time** Reading pages and pasting passages |**Every request** Fees and tokens on each call |**Every row** A wasted search repeats down the list |**Every run** Rereading pages that haven’t changed |

**Figure 4:** Each stage asks more of search than the last. The questions stay simple, but the number of answers they need keeps growing. **Decisions** is built for asking across a list, where one question is asked of every company on it. Illustrative examples.

## The search call changes what happens next

Search results determine what the model reads next. A relevant passage can provide enough evidence to answer, while a collection of pages requires more reading, more tokens, and often more searches.

**Parallel Search** returns relevant excerpts with source URLs, reducing unnecessary reading and follow-up searches. Missing evidence can lead a model to invent a plausible answer (aka Hallucinate), while irrelevant text increases token spend. By making the evidence easy to check with citations, **Parallel** helps teams in regulated industries verify claims and build trust in their agents’ answers.

A new filing or leadership change can make last week’s information outdated. **Parallel Search** provides freshness for your agents. With **Parallel** , you can set how recent a page must be, down to 10 minutes. If the cached copy is older than that, **Parallel** fetches the page in real-time. For evidence in PDFs, such as filings and court records, or websites that require JavaScript, **Parallel** ’s **Extract API** converts the content into clean text the model can read.

### Search has the same trade-offs as models

Developers already weigh quality, cost, and latency when they choose a model. A frontier model with high reasoning effort gives the best answers, but it costs more and responds slowly. A smaller model is cost efficient and faster, and good enough for routing, classification, or simple extraction. Most production systems use more than one model, and each step gets the lowest cost model that meets its quality bar.

Search works the same way. A lookup inside a chat reply has to return in a few hundred milliseconds. A background agent checking a vendor’s compliance history can wait several seconds for deeper results. Running the deepest search on every call spends money where it isn’t needed, and running the fastest search on every call can miss evidence on hard questions. Most agents need both kinds of call, often within the same task.

Four modes, three priorities

**Turbo** and **Fast** cost $1 per 1,000 requests. **Basic** and **Advanced** cost $5.

All three Quality and cost Speed and cost Quality and speed

Best corner

Best corner

Best corner

Better quality

Faster speed

Higher cost

$5

$10

$25

200 ms

1 s

3 s

$1

Turbo

~200 ms, $1 per 1K

Fast

~700 ms, $1 per 1K

Basic

~1 s, $5 per 1K

Advanced

~3 s, $5 per 1K

Native search

$10 to 25 per 1K

The best mode for a call sits high on quality, far along speed and close to the low-cost wall. **Parallel** ’s four modes cluster there, and native search sits out along the cost axis.

Parallel Search modes Native search

**Figure 5:** **Parallel Search** has a mode for each priority. Every workload weighs quality, speed and cost differently. Flatten the space to the two that matter most for a call, and one mode leads. Illustrative positions. Latency and price are the published figures for each mode. Quality is ordinal and does not show a benchmark score.

**Parallel Search** has four modes, each with a different balance of quality, cost, and latency.

|Mode |When to use it |Approx. latency |Price per 1,000 requests |
| --- | --- | --- | --- |
|Turbo |When speed matters most: voice agents, chat, and high-volume lookups. |200 ms |$1 |
|Fast |For high-quality results in interactive assistants and agents that make repeated search calls. |700 ms |$1 |
|Basic |When the model needs longer passages from each source, with more context in a single search. |1 second |$5 |
|Advanced |For complex questions that require finding and connecting evidence across sources, such as background research and deep reasoning. |3 seconds |$5 |

## What this looks like in production

**Nooks** initially used **OpenAI** ’s built-in web search for its sales research agents, but reconsidered as research volume grew, token spend increased, and results missed recent leadership changes and security certifications. Switching to **Parallel** ’s **Search API** cut web search spend by **70\.5%** while improving accuracy on time-sensitive facts. [Read the Nooks case study](https://parallel.ai/blog/case-study-nooks)

**Modal** built its go-to-market data pipelines in code on **Parallel** , using research agents to segment and enrich every prospect. **Modal** compared **Parallel** with other agentic search providers. **Parallel** had the highest coverage on fundraising data, at 88.9%, and cost up to 31 times less, saving $7,600 per 10,000 records. [Read the Modal case study](https://parallel.ai/blog/case-study-modal)

## Compare the cost of a correct answer

The next time you evaluate a model, evaluate your search too. Use real questions from your product, keep the model and agent loop fixed, and compare answer accuracy, citation support, token spend, latency, and total cost.

Evaluate search at the same time you evaluate the model. Your model determines how your agent reasons, and your choice helps determine what information your agent has to reason with. Measure cost per correct answer, including the cost of failed attempts. Then test whether better search lets a cost efficient model at scale meet your quality bar.

## Benchmark Parallel on the questions your agents answer every day

[Start building with Parallel](https://platform.parallel.ai/) [Contact us](https://contact.parallel.ai/)
Human Machine

# \# How to switch from OpenAI web search to Parallel Search API

Reading time: 5 min

OpenAI charges **\*\* $25 per 1,000 web search calls \*\*** for non-reasoning models like GPT-4o and GPT-4.1, and $10 per 1,000 calls for reasoning models like GPT-5. Parallel's Search API costs **\*\* $5 per 1,000 requests \*\*** , with compressed excerpts included in every result. That's an 80% cost reduction on the standard tier and 50% on the reasoning tier, with higher accuracy across four major benchmarks.

This guide covers why the switch makes sense, what changes in your codebase, and how to migrate in Python and TypeScript.

**\*\* What OpenAI charges for web search \*\***

OpenAI's web search pricing splits into two tiers based on the model you're calling:

|Model tier |Cost per 1,000 search calls |
| --- | --- |
|Non-reasoning (GPT-4o, GPT-4.1) |$25 |
|Reasoning (GPT-5) |$10 |

Two details make the effective cost higher than it looks. First, OpenAI's model can trigger multiple search calls per API request, so a single /v1/responses call might generate two or three billable searches. Second, you pay for the search context tokens on top of the per-call fee (at the model's standard token rate). The bill adds up fast in production.

OpenAI's marketing pricing page shows only the $25 figure. The $10 reasoning-model tier appears on the developer pricing page. If you've seen conflicting numbers, that's why.

**\*\* What Parallel charges \*\***

Parallel's Search API costs **\*\* $5 per 1,000 requests \*\*** . Each request returns up to 10 results with compressed, query-relevant excerpts included at no extra charge. Additional results beyond 10 cost $1 per 1,000.

No token fees on top. No per-model pricing tiers. One price.

| |OpenAI (reasoning) |OpenAI (non-reasoning) |Parallel |
| --- | --- | --- | --- |
|Per 1,000 search calls |$25 |$10 |$5 |
|Excerpts/content included |Included |Token fees apply |Included |
|Rate limit |Varies |Varies |600 req/min |

## \## What 10,000 searches actually cost

Here's what a realistic monthly workload costs across three configurations: an AI agent making 10,000 web search calls per month, using GPT-4.1 ($2/1M input, $8/1M output) for reasoning. Each query retrieves roughly 4,000 tokens of search context and generates a 500-token response.

| |OpenAI web search (GPT-4.1) |OpenAI web search (GPT-5) |Parallel Search API + GPT-4.1 |
| --- | --- | --- | --- |
|Search calls |10,000 × $0.01 = $100 |10,000 × $0.025 = $250 |10,000 × $0.005 = $50 |
|Search context tokens |40M tokens × $2/1M = $80 |Free (included in $25 tier) |25M tokens × $2/1M = $50 |
|Output tokens |5M tokens × $8/1M = $40 |5M tokens × $10/1M = $50 |5M tokens × $8/1M = $40 |
|Monthly total |$220 |$300 |$140 |

A few things to note in the math.

OpenAI's GA web search tool costs **\*\* $10 per 1,000 calls \*\*** with GPT-4o and GPT-4.1. The search content tokens (web results injected into the model's context) get billed at the model's input rate on top of that. With GPT-5, search calls jump to **\*\* $25 per 1,000 \*\*** , though the search content tokens are free. Either way, you don't control how much content the model retrieves per search.

Parallel's Search API costs **\*\* $5 per 1,000 calls \*\*** regardless of which LLM you pair it with. Excerpts are included. The search context column is lower (25M vs. 40M tokens) because Parallel returns compressed, query-relevant excerpts rather than raw page content. You set the excerpt length with max\_chars\_per\_result, so you control exactly how many tokens reach your LLM.

At minimum, Parallel saves you **\*\* 36% over the GPT-4.1 configuration \*\*** and **\*\* 53% over the GPT-5 configuration \*\*** . The savings scale linearly: at 100,000 searches per month, the gap between OpenAI + GPT-5 ($3,000) and Parallel + GPT-4.1 ($1,400) is $1,600.

**\*\* Why the cost gap reflects a design difference \*\***

OpenAI treats web search as a tool bolted onto its language models. You send a prompt, the model decides whether to search, and the search results get injected into the model's context window as raw tokens you pay for. You don't control how many searches the model runs, what context it retrieves, or how many tokens it consumes.

Parallel built its Search API as standalone infrastructure. You call the endpoint, define your search objective in natural language, and get back structured JSON with ranked URLs and dense excerpts. You control what goes into your LLM's context window, how many results you retrieve, and how many characters each excerpt contains.

The practical difference: Parallel returns token-efficient excerpts compressed around your query's intent, not raw page content. Every token in the response earns its place in your context window.

**\*\* Parallel scores higher on every major benchmark \*\***

We tested Parallel's Search API against OpenAI GPT-5 (with web search enabled) across four public benchmarks, using 100-question samples from each. GPT-5 served as the search-calling agent, and GPT-4.1 judged the answers.

|Benchmark |Parallel |OpenAI GPT-5 |Parallel Cost (Per 1K) |OpenAI Cost (Per 1K) |
| --- | --- | --- | --- | --- |
|SimpleQA (factual Q&A) |98% |98% |$17 |$37 |
|FRAMES (multi-hop reasoning) |92% |90% |$42 |$68 |
|BrowseComp (complex web browsing) |58% |53% |$156 |$253 |
|HLE (expert-level questions) |47% |45% |$82 |$143 |

_\_ Note: Despite our best efforts, these figures may not always be up to date. For the latest benchmarks, visit our [benchmarks hub](https://parallel.ai/benchmarks) [[benchmarks hub] (/benchmarks)](/ai/benchmarks) . \__

Parallel matches or beats OpenAI on accuracy across all four benchmarks. The cost column includes both the search API fees and LLM inference costs. On FRAMES, Parallel leads by 2 points at 38% lower total cost. On BrowseComp, the hardest benchmark in this set, Parallel leads by 5 points at 38% less.

These benchmarks are self-reported. We've published the methodology, competitor configurations, and judge model for transparency, and we use standardized public benchmark question sets.

## \## Migrate from OpenAI's web search to Parallel's Search API

Get your API key at [platform.parallel.ai](https://platform.parallel.ai/) [[platform.parallel.ai] (https://platform.parallel.ai/)](https://platform.parallel.ai/) . The free tier includes credits (up to 16,000 searches) with no credit card required.

With this approach, you don't control how many searches the model runs, what content it retrieves, or how many tokens it consumes. The model decides all of that.

You now control the search objective, keyword queries, result count, and excerpt length. The response comes back as structured JSON with ranked URLs, page titles, publish dates, and compressed excerpts ready to inject into any LLM's context window.

\### Feeding Parallel results into your LLM

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

import  os
 from  openai  import  OpenAI  as  OpenAIClient
 from  parallel  import  Parallel

parallel = Parallel(api_key=os.environ[ "PARALLEL_API_KEY" ])
openai = OpenAIClient()

 # Step 1: Search with Parallel 
search = parallel.beta.search(
    objective= "Recent Federal Reserve statements on interest rate policy" ,
    search_queries=[ "Fed interest rate decision March 2026" ],
    mode= "one-shot" ,
    max_results= 5 ,
    excerpts={ "max_chars_per_result" :  4000 },
)

 # Step 2: Build context from search results 
context =  "\n\n" .join(
     f"Source:  {r.title}  ( {r.url} )\n { chr ( 10 ).join(r.excerpts)} " for  r  in  search.results
)

 # Step 3: Pass context to your LLM 
response = openai.chat.completions.create(
    model= "gpt-4o" ,
    messages=[
        { "role" :  "system" ,  "content" :  "Answer using only the provided sources. " "Cite URLs for each claim." },
        { "role" :  "user" ,  "content" :  f"Context:\n {context} \n\n" f"Question: What did the Fed announce about " f"interest rates this month?" },
    ],
)

 print (response.choices[ 0 ].message.content) ```  import os from openai import OpenAI as OpenAIClient from parallel import Parallel   parallel = Parallel(api_key=os.environ["PARALLEL_API_KEY"]) openai = OpenAIClient()   # Step 1: Search with Parallel search = parallel.beta.search( objective="Recent Federal Reserve statements on interest rate policy", search_queries=["Fed interest rate decision March 2026"], mode="one-shot", max_results=5, excerpts={"max_chars_per_result": 4000}, )   # Step 2: Build context from search results context = "\n\n".join( f"Source: {r.title} ({r.url})\n{chr(10).join(r.excerpts)}" for r in search.results )   # Step 3: Pass context to your LLM response = openai.chat.completions.create( model="gpt-4o", messages=[ {"role": "system", "content": "Answer using only the provided sources. " "Cite URLs for each claim."}, {"role": "user", "content": f"Context:\n{context}\n\n" f"Question: What did the Fed announce about " f"interest rates this month?"}, ], )   print(response.choices[0].message.content) ```
```

Parallel's Search API is model-agnostic. You call it for search, then pass the results into whatever LLM you use for reasoning. A typical pattern:

This pattern gives you the best of both: Parallel's search accuracy and excerpt quality, with your choice of LLM for reasoning. You also avoid paying OpenAI's $25 per 1,000 web search surcharge, since the LLM call contains no search tool.

## \## Get started

1. Sign up at [platform.parallel.ai](https://platform.parallel.ai/) [[platform.parallel.ai] (https://platform.parallel.ai/)](https://platform.parallel.ai/) with a work email. You'll get free credits, no credit card required.
2. Install the SDK: pip install parallel-web or npm install parallel-web.
3. Set your API key: export PARALLEL\_API\_KEY="your\_key".
4. Run your first search or swap your Chat API base URL.

Full documentation is at [docs.parallel.ai](https://docs.parallel.ai/) [[docs.parallel.ai] (https://docs.parallel.ai/)](https://docs.parallel.ai/) . If you have questions about migrating a production workload, reach out at support@parallel.ai.

By Parallel

March 27, 2026
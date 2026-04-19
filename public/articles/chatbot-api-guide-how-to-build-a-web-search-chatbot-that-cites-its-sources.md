Human Machine

# \# Chatbot API guide: how to build a web search chatbot that cites its sources

Most chatbot APIs produce fluent answers that sound confident but lack grounding in reality. Large language models hallucinate facts, quote outdated prices, and reference deprecated API endpoints. The knowledge cutoff baked into any LLM means answers about recent events, current regulations, or live product updates are stale at best, wrong at worst.

Tags: Guides

Reading time: 14 min

The fix: integrate live [web search API](https://parallel.ai/articles/what-is-a-web-search-api) [[web search API] (/articles/what-is-a-web-search-api)](/ai/articles/what-is-a-web-search-api) capabilities at the chatbot API layer. Instead of relying on frozen training data, a web-grounded chatbot retrieves current information from the open web, synthesizes it into a response, and cites its sources. Users get accurate, verifiable answers.

This guide covers what to look for in a chatbot API with web search, how the top providers compare, and how to ship a web-grounded chatbot with working Python code.

## \## Key takeaways

* \- A chatbot API with built-in web search eliminates the need to stitch together separate LLM and search services.
* \- Citation support is non-negotiable; users and compliance teams need to verify every claim.
* \- OpenAI-compatible endpoints let you swap providers without rewriting your application code.
* \- Latency, cost predictability, and source quality matter more than raw model size when choosing an API.
* \- You can stand up a web-grounded chatbot in under 20 lines of Python using the Parallel Chat API.

## \## What is a chatbot API?

A chatbot API is a programmatic interface for sending user messages and receiving AI-generated responses without managing model infrastructure. You send a prompt, the API returns a completion. No GPUs to provision, no model weights to download, no inference stack to maintain.

Modern chatbot APIs go beyond simple request-response cycles. They support conversation history so the model understands context across multiple turns. They stream tokens as they're generated so users see responses building in real time. Many expose function calling or tool use, letting the model invoke external services mid-conversation, a pattern central to how [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) [[AI agents] (/articles/what-is-an-ai-agent)](/ai/articles/what-is-an-ai-agent) interact with the world.

Most chatbot APIs wrap a large language model behind a REST or WebSocket interface. OpenAI's Chat Completions API set the pattern; Anthropic, Google, and others followed. The core abstraction is the same: an array of messages in, a message out.

A chatbot API differs from a raw text completion API in one key way: it's conversation-oriented. The interface expects structured turns (user, assistant, system) rather than arbitrary text blobs. This structure makes building chat products simpler and enables features like system prompts and multi-turn memory.

## \## Why web search matters for chatbots

Large language models have a knowledge cutoff. GPT-4's training data ends in late 2023. Claude's cuts off earlier. Anything that happened after the cutoff date is invisible to the model. Ask about a product launched last month, a law passed last quarter, or an API deprecated last week, and the model either refuses to answer or invents something plausible-sounding but false.

Hallucination rates spike for recent events, niche topics, and precise factual claims. A 2024 study on [Vectara's hallucination leaderboard](https://github.com/vectara/hallucination-leaderboard) [[Vectara's hallucination leaderboard] (https://github.com/vectara/hallucination-leaderboard)](https://github.com/vectara/hallucination-leaderboard) found that even the best LLMs hallucinate on 3-10% of responses when generating summaries, with rates climbing higher for open-domain questions. For technical documentation, pricing pages, and regulatory text, that error rate is unacceptable.

Users expect current information. A developer asking about the latest version of a framework needs the current docs, not a stale snapshot. A researcher tracking a breaking news story needs today's coverage, not last year's. A compliance team verifying a regulation needs the text currently in force.

Web search gives chatbots access to live data and source citations. The model can retrieve current information, ground its response in that information, and tell users exactly where the answer came from. This transparency builds trust. Users can click through to the source, verify the claim, and build confidence in the system.

Retrieval-augmented generation (RAG) over a static corpus helps for internal documentation but doesn't solve freshness for open-domain questions. If the corpus isn't updated in real time, the same staleness problem persists. Web search is the only way to ground answers in the current state of the internet. For complex research tasks, teams are turning to [deep research](https://parallel.ai/articles/what-is-deep-research) [[deep research] (/articles/what-is-deep-research)](/ai/articles/what-is-deep-research) workflows that chain multiple searches together.

The real-world consequences of ungrounded answers are severe. A chatbot that returns a wrong API endpoint breaks a developer's integration. A chatbot that quotes an old price point erodes customer trust. A chatbot that misrepresents a regulation exposes the business to compliance risk. Every incorrect answer chips away at credibility.

## \## What to look for in a chatbot API with web search

Choosing the right chatbot API requires evaluating five dimensions: accuracy, latency, citations, pricing, and compatibility.

### \### Accuracy and source quality

The quality of the search backend determines the quality of the final answer. A chatbot can only synthesize what it retrieves. If the search results are irrelevant, outdated, or low-authority, the response inherits those flaws.

Look for APIs that let you inspect retrieved URLs. Transparency into what sources the model used helps you debug bad answers and tune prompts. Some APIs return structured metadata (URL, title, snippet, publish date) alongside the response. Others bury citations in prose or omit them entirely.

Search index freshness matters too. An API pulling from a stale index produces stale answers regardless of model capability. Ask providers how often they recrawl, how large their index is, and whether they can fetch live pages on demand.

### \### Latency and streaming

Two latency components add up in a web-grounded chatbot: retrieval time and generation time. The search step fetches and ranks relevant pages. The generation step synthesizes retrieved content into a response. Both take time.

Streaming masks latency for users. Instead of waiting five seconds for a complete response, users see tokens appear as they're generated. The perceived wait time drops from "time to complete" to "time to first token." This matters for chat interfaces where responsiveness shapes user experience.

Ask whether the API streams tokens during generation. Ask what the typical time-to-first-token is. If the API batches retrieval and generation sequentially without streaming, users stare at a spinner. That experience feels slow even if the total latency is reasonable.

### \### Citation and attribution

Citations let users verify claims. A chatbot that says "the API costs $5 per 1,000 requests" should link to the pricing page so users can confirm. Without citations, users either trust blindly or spend time hunting for the source themselves.

Structured citation metadata beats inline URLs. A response with a separate citations array (URL, title, snippet, position in response) is easier to render in a UI than a response with raw links scattered through prose. Structured metadata also makes programmatic verification possible.

For compliance-heavy industries (finance, healthcare, legal), citation support isn't optional. Auditors and regulators want to trace every claim back to its source. A chatbot that can't produce citations can't meet those requirements.

### \### Pricing and cost predictability

Chatbot API pricing models vary widely. Some charge per token (input and output separately). Some charge per API call. Some add separate fees for web search on top of generation costs. The combinations make cost forecasting difficult.

Per-completion pricing is easier to forecast than per-token-plus-search-fee. If you know each chat completion costs a fixed amount, you can multiply by projected volume and budget accordingly. With per-token pricing, cost depends on conversation length, which you don't control.

Watch for hidden fees. Some APIs charge for search separately from generation. Some charge for embedding or re-ranking. Some have minimum monthly commitments. Read the pricing page carefully and model your expected usage before committing.

Free tiers help you prototype before committing budget. Most APIs offer a limited free tier or trial credits. Use them to validate that the API meets your accuracy and latency requirements before scaling up.

### \### OpenAI compatibility

The OpenAI Chat Completions API became a de facto standard. Thousands of applications, SDKs, and frameworks target it. [LangChain](https://python.langchain.com/docs/introduction/) [[LangChain] (https://python.langchain.com/docs/introduction/)](https://python.langchain.com/docs/introduction/) , LlamaIndex, [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) [[Vercel AI SDK] (https://sdk.vercel.ai/docs/introduction)](https://sdk.vercel.ai/docs/introduction) , and countless internal tools expect OpenAI-compatible endpoints.

A chatbot API with OpenAI-compatible interface lets you swap providers without rewriting application code. Point the SDK at a different base URL, change the API key, and you're running on a new backend. This portability reduces lock-in and makes migration painless.

Compatibility also means inheriting the ecosystem. Libraries that work with OpenAI work with any compatible provider. Tutorials written for OpenAI translate directly. The mental model carries over. You spend time on your product, not on learning a new SDK.

## \## Top chatbot APIs for web-grounded conversations

Five providers stand out for building chatbots with web search capabilities. Each takes a different approach to integrating search with generation. For a broader comparison of search API providers, see our [Bing API alternatives](https://parallel.ai/articles/bing-api-comparison) [[Bing API alternatives] (/articles/bing-api-comparison)](/ai/articles/bing-api-comparison) guide.

### \### OpenAI Chat Completions with web search

OpenAI's Chat Completions API is the incumbent. It powers ChatGPT and millions of integrations worldwide. OpenAI added [web search as a tool](https://developers.openai.com/api/docs/guides/tools-web-search) [[web search as a tool] (https://developers.openai.com/api/docs/guides/tools-web-search)](https://developers.openai.com/api/docs/guides/tools-web-search) in 2024, allowing models to retrieve current information during conversations.

Web search works as a tool call. The model decides when to search, issues a query, receives results, and synthesizes a response. This approach gives the model control over when to search but adds latency for the tool-call round trip.

Pricing combines per-token costs with a separate search fee. Input tokens, output tokens, and search invocations all carry charges. Costs can be unpredictable for search-heavy workloads.

**\*\* Pros: \*\*** Largest ecosystem, most capable models, extensive documentation, broad tool support.

**\*\* Cons: \*\*** Search is an add-on rather than native; pricing complexity; latency from tool-call pattern.

### \### Parallel Chat API

Parallel Chat API is a web-powered chat completions API with citations built in from the ground up. Every response comes grounded in Parallel's proprietary web index, updated continuously with millions of pages daily.

The API is OpenAI-compatible. You use the same SDK, same message format, same parameters. Point your existing code at Parallel's base URL and responses come back with structured citations by default. Teams already on OpenAI can [switch from OpenAI web search to Parallel](https://parallel.ai/articles/openai-to-parallel-search-api) [[switch from OpenAI web search to Parallel] (/articles/openai-to-parallel-search-api)](/ai/articles/openai-to-parallel-search-api) without rewriting application code.

Pricing is flat: [$5 per 1,000 chat completions](https://parallel.ai/pricing) [[$5 per 1,000 chat completions] (/pricing)](/ai/pricing) . No per-token charges, no separate search fees. You know exactly what each conversation costs regardless of length or how many sources the model retrieves.

**\*\* Pros: \*\*** Built-in web search, structured citations by default, OpenAI-compatible, predictable pricing, proprietary web index.

**\*\* Cons: \*\*** Smaller ecosystem than OpenAI; fewer model variants.

### \### Google Dialogflow CX with Custom Search

[Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs) [[Dialogflow CX] (https://docs.cloud.google.com/dialogflow/cx/docs)](https://docs.cloud.google.com/dialogflow/cx/docs) is Google's enterprise-grade conversational AI platform. It handles complex multi-turn conversations with branching flows, state management, and integrations into Google Cloud services.

Web search isn't native to Dialogflow. You add it by integrating Google Custom Search through webhooks or Cloud Functions. This approach offers control but requires significant setup and maintenance.

Pricing is complex, combining Dialogflow session fees with Custom Search API charges. Enterprise customers can negotiate custom terms. The platform suits large organizations already invested in Google Cloud.

**\*\* Pros: \*\*** Enterprise features, Google Cloud integration, robust state management, compliance certifications.

**\*\* Cons: \*\*** Complex setup for web search; high configuration overhead; pricing complexity.

### \### Anthropic Claude with tool use

Anthropic's Claude models excel at nuanced reasoning and long-context tasks. Claude supports [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) [[tool use] (https://docs.anthropic.com/en/docs/build-with-claude/tool-use)](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) , letting the model call external functions including web search APIs you provide.

Web search requires bringing your own search service. You define a search tool, Claude invokes it when needed, and you handle the retrieval. This flexibility lets you choose your search provider but adds integration work.

Pricing is per-token for input and output. Search costs depend on whichever provider you integrate. Claude doesn't include native web search, so you're managing two vendor relationships.

**\*\* Pros: \*\*** Strong reasoning, long context window, excellent instruction following, flexible tool use.

**\*\* Cons: \*\*** No native web search; requires external search integration; two-vendor management.

### \### Perplexity API

Perplexity built its product around search-augmented generation. The [Perplexity API](https://docs.perplexity.ai) [[Perplexity API] (https://docs.perplexity.ai)](https://docs.perplexity.ai) (pplx-api) provides answer-engine capabilities where every response draws from web sources.

The API is search-native, designed for answer-engine use cases rather than general chat. It excels at answering factual questions with citations but offers less flexibility for general conversation or tool use.

Pricing is per-request with different tiers based on model capability. The focus on search means you're locked into Perplexity's retrieval approach with limited customization.

**\*\* Pros: \*\*** Search-native design, strong for factual Q&A, citations included.

**\*\* Cons: \*\*** Limited customization; focused on answer-engine use case; less general-purpose than alternatives.

### \### Comparison table

|Provider |Built-in web search |Citation support |OpenAI compatible |Pricing model |Streaming |
| --- | --- | --- | --- | --- | --- |
|OpenAI |Yes (tool) |Optional |Yes |Per-token + search fee |Yes |
|Parallel |Yes (native) |Yes (structured) |Yes |$5/1K completions |Yes |
|Dialogflow CX |Via integration |Via integration |No |Session + search fees |Yes |
|Claude |No (BYOS) |Via tool output |No |Per-token |Yes |
|Perplexity |Yes (native) |Yes |Partial |Per-request |Yes |

## \## How to build a web search chatbot with the Parallel Chat API

You can build a web-grounded chatbot with citations in under 20 lines of Python. Here's how. For a more advanced implementation, check out how to [build a web research agent](https://parallel.ai/blog/cookbook-search-agent) [[build a web research agent] (/blog/cookbook-search-agent)](/ai/blog/cookbook-search-agent) with streaming search results.

### \### Prerequisites

* \- Python 3.8 or later
* \- The OpenAI Python SDK ( ``` pip install openai ``` )
* \- A Parallel API key (sign up at parallel.ai)

### \### Code

\### Python

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

from  openai  import  OpenAI

 # Initialize client pointing to Parallel's API 
client = OpenAI(
    api_key= "your-parallel-api-key" ,
    base_url= "https://api.parallel.ai/v1" 
)

 # Send a message requiring live web data 
response = client.chat.completions.create(
    model= "parallel" ,
    messages=[
        { "role" :  "user" ,  "content" :  "What is the current price of OpenAI's GPT-4 API?" }
    ]
)

 # Print the response print (response.choices[ 0 ].message.content)

 # Print cited sources if hasattr (response,  'citations' ):
     print ( "\nSources:" )
     for  citation  in  response.citations:
         print ( f"-  {citation.url} " ) ```  from openai import OpenAI   # Initialize client pointing to Parallel's API client = OpenAI( api_key="your-parallel-api-key", base_url="https://api.parallel.ai/v1" )   # Send a message requiring live web data response = client.chat.completions.create( model="parallel", messages=[ {"role": "user", "content": "What is the current price of OpenAI's GPT-4 API?"} ] )   # Print the response print(response.choices[0].message.content)   # Print cited sources if hasattr(response, 'citations'): print("\nSources:") for citation in response.citations: print(f"- {citation.url}") ```
```

### \### Step-by-step explanation

**\*\* Line 1: \*\*** Import the OpenAI SDK. Because Parallel is OpenAI-compatible, you use the same library you'd use for OpenAI.

**\*\* Lines 4-7: \*\*** Create a client instance. Set ``` base_url ``` to Parallel's endpoint instead of OpenAI's default. Your Parallel API key goes in ``` api_key ``` .

**\*\* Lines 10-14: \*\*** Call ``` chat.completions.create ``` with a message that requires current web data. The model searches the web, retrieves relevant sources, and generates a grounded response.

**\*\* Line 17: \*\*** Print the response content. This is the model's answer, synthesized from web sources.

**\*\* Lines 20-23: \*\*** Print the cited URLs. Parallel returns structured citation data so you can display sources in your UI or log them for compliance.

The question asks about current API pricing, information that changes frequently. A model relying on training data would return stale numbers. Parallel's web search retrieves the current pricing page and grounds the response in live data.

You can extend this pattern to support streaming, conversation history, and system prompts. The OpenAI SDK handles all of these; Parallel's compatibility means they work identically. See the [Chat API quickstart](https://docs.parallel.ai/chat-api/chat-quickstart) [[Chat API quickstart] (https://docs.parallel.ai/chat-api/chat-quickstart)](https://docs.parallel.ai/chat-api/chat-quickstart) for the full reference.

## \## Common mistakes when choosing a chatbot API

Developers make predictable mistakes when selecting a chatbot API. Avoid these five.

### \### Optimizing for model size over answer quality

Bigger models don't guarantee better answers. A smaller model with high-quality retrieval often outperforms a larger model with poor or no retrieval. Benchmark on your actual use cases, not parameter counts. Accuracy on your domain matters more than performance on generic benchmarks.

### \### Ignoring citation support until launch

Citation support feels like a nice-to-have during prototyping. Then you launch, users ask "where did you get that?", and you realize you can't answer. Adding citations retroactively means rearchitecting your prompts and UI. Build with citations from day one.

### \### Underestimating search latency

Web search adds latency. A chatbot that took 500ms now takes 2 seconds. If your API doesn't stream, users stare at a loading spinner the entire time. Enable streaming from the start. Test perceived latency (time to first token), not just total latency.

### \### Locking into a vendor-specific SDK

Proprietary SDKs create switching costs. When the vendor raises prices or degrades quality, you're stuck rewriting. Choose APIs with OpenAI-compatible interfaces. Use the standard SDK. Keep your options open.

### \### Skipping cost modeling

Prototype usage patterns differ from production patterns. A chatbot that costs pennies in testing can cost thousands at scale if you haven't modeled your expected volume, average conversation length, and search frequency. Build a cost model before launch. Set up alerts. Monitor spend daily.

## \## Frequently asked questions

### \### What is the best free chatbot API?

Most providers offer free tiers with limited requests. Parallel offers 16,000 free search requests. OpenAI provides trial credits for new accounts. The "best" depends on your use case; evaluate accuracy and features, not just free volume.

### \### Can I use the OpenAI SDK with other chatbot APIs?

Yes, if the API is OpenAI-compatible. Set the ``` base_url ``` parameter to the provider's endpoint. Parallel, Together, Groq, and others support this pattern.

### \### How do chatbot APIs handle web search citations?

Approaches vary. Some return structured citation arrays with URL, title, and snippet. Others embed links inline in the response text. Some require you to integrate your own search and parse results yourself.

### \### What is the difference between a chatbot API and a web search API?

A chatbot API generates conversational responses from prompts. A web search API returns ranked URLs and snippets matching a query. A web-grounded chatbot API combines both: it searches the web, retrieves sources, and generates a response that cites them.

## \## Start building

The Parallel Chat API gives you web-grounded chat with citations in a single, OpenAI-compatible endpoint. Flat pricing, structured citations, and a proprietary web index mean you can build accurate, verifiable chatbots without stitching together multiple services.

[Start building](https://docs.parallel.ai/home) [[Start building] (https://docs.parallel.ai/home)](https://docs.parallel.ai/home) .

By Parallel

April 17, 2026
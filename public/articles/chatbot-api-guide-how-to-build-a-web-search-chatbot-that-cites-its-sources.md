# Chatbot API guide: how to build a web search chatbot that cites its sources

A chatbot that cites its sources needs retrieval in the request path, which is a design decision at the API layer rather than a prompt you add later. This guide covers what to look for in a chatbot API with web search, how five providers compare on accuracy, latency, citations, and cost predictability, and how to ship a web-grounded chatbot in under 20 lines of Python.

A chatbot API with live [web search API](https://parallel.ai/articles/what-is-a-web-search-api) capabilities retrieves current information from the open web instead of relying on frozen training data, synthesizes it into a response, and cites its sources.

## Key takeaways

- A chatbot API with built-in web search eliminates the need to stitch together separate LLM and search services.
- Users and compliance teams need citations to verify claims, so treat citation support as a requirement.
- OpenAI-compatible endpoints let you swap providers without rewriting your application code.
- Latency, cost predictability, and source quality matter more than raw model size when choosing an API.
- You can stand up a web-grounded chatbot in under 20 lines of Python using the Parallel Responses API.

## What is a chatbot API?

A chatbot API is a programmatic interface for sending user messages and receiving AI-generated responses without managing model infrastructure. You send a prompt and the API returns a completion, with no GPUs to provision, model weights to download, or inference stack to maintain.

Modern chatbot APIs also support conversation history, so the model understands context across multiple turns. They stream tokens as they're generated so users see responses building in real time. Many expose function calling or tool use, letting the model invoke external services mid-conversation, a pattern central to how [AI agents](https://parallel.ai/articles/what-is-an-ai-agent) interact with the world.

Most chatbot APIs wrap a large language model behind a REST or WebSocket interface. OpenAI's Chat Completions API set the pattern; Anthropic, Google, and others followed. The core abstraction is the same: an array of messages in, a message out.

Unlike a raw text completion API, a chatbot API is conversation-oriented. The interface expects structured turns (user, assistant, system) rather than arbitrary text blobs, which makes building chat products simpler and enables features like system prompts and multi-turn memory.

## Why web search matters for chatbots

Large language models have a knowledge cutoff. Each model's training data stops at a fixed date, often months before the model ships. Anything that happened after the cutoff date is invisible to the model. Ask about a product launched last month, a law passed last quarter, or an API deprecated last week, and the model either refuses to answer or invents something plausible-sounding but false.

Hallucination rates spike for recent events, niche topics, and precise factual claims. [Vectara's hallucination leaderboard](https://github.com/vectara/hallucination-leaderboard) measures how often models add unsupported claims when summarizing a short document they're given. As of September 2026, the best-scoring model hallucinates on 1.8% of summaries, and many widely used frontier models land between 5% and 12%. For technical documentation, pricing pages, and regulatory text, that error rate is unacceptable.

Users expect current information. A developer asking about the latest version of a framework needs the current docs, a researcher tracking a breaking news story needs today's coverage, and a compliance team verifying a regulation needs the text currently in force.

Web search gives chatbots access to live data and source citations. The model can retrieve current information, ground its response in that information, and tell users exactly where the answer came from, so they can click through to the source and verify the claim.

Retrieval-augmented generation (RAG) over a static corpus helps for internal documentation but doesn't solve freshness for open-domain questions. If the corpus isn't updated in real time, the same staleness problem persists. Web search is the only way to ground answers in the current state of the internet. For complex research tasks, teams are turning to [deep research](https://parallel.ai/articles/what-is-deep-research) workflows that chain multiple searches together.

A chatbot that returns a wrong API endpoint breaks a developer's integration. One that quotes an old price point erodes customer trust, and one that misrepresents a regulation exposes the business to compliance risk.

## What to look for in a chatbot API with web search

Evaluate chatbot APIs on accuracy, latency, citations, pricing, and compatibility.

### Accuracy and source quality

The quality of the search backend determines the quality of the final answer. A chatbot can only synthesize what it retrieves. If the search results are irrelevant, outdated, or low-authority, the response inherits those flaws.

Look for APIs that let you inspect retrieved URLs. Transparency into what sources the model used helps you debug bad answers and tune prompts. Some APIs return structured metadata (URL, title, snippet, publish date) alongside the response. Others bury citations in prose or omit them entirely.

Search index freshness matters too. An API pulling from a stale index produces stale answers regardless of model capability. Ask providers how often they recrawl, how large their index is, and whether they can fetch live pages on demand.

### Latency and streaming

Two latency components add up in a web-grounded chatbot: retrieval time and generation time. The search step fetches and ranks relevant pages, and the generation step synthesizes retrieved content into a response.

Streaming masks latency for users. Instead of waiting five seconds for a complete response, users see tokens appear as they're generated, so the perceived wait drops from "time to complete" to "time to first token."

Ask whether the API streams tokens during generation, and what the typical time-to-first-token is. If the API batches retrieval and generation sequentially without streaming, users stare at a spinner, which feels slow even when total latency is reasonable.

### Citation and attribution

Citations let users verify claims. A chatbot that says "the API costs $5 per 1,000 requests" should link to the pricing page so users can confirm. Without citations, users either trust blindly or spend time hunting for the source themselves.

Structured citation metadata beats inline URLs. A response with a separate citations array (URL, title, snippet, position in response) is easier to render in a UI than a response with raw links scattered through prose. Structured metadata also makes programmatic verification possible.

Compliance-heavy industries (finance, healthcare, legal) require citations, because auditors and regulators want to trace every claim back to its source.

### Pricing and cost predictability

Chatbot API pricing models vary widely. Some charge per token (input and output separately). Some charge per API call. Some add separate fees for web search on top of generation costs. The combinations make cost forecasting difficult.

Per-completion pricing is easier to forecast than per-token-plus-search-fee. If you know each chat completion costs a fixed amount, you can multiply by projected volume and budget accordingly. With per-token pricing, cost depends on conversation length, which you don't control.

Watch for hidden fees. Some APIs charge for search separately from generation. Some charge for embedding or re-ranking. Some have minimum monthly commitments. Read the pricing page carefully and model your expected usage before committing.

Free tiers help you prototype before committing budget. Most APIs offer a limited free tier or trial credits. Use them to validate that the API meets your accuracy and latency requirements before scaling up.

### OpenAI compatibility

The OpenAI Chat Completions API became a de facto standard. Thousands of applications, SDKs, and frameworks target it. [LangChain](https://python.langchain.com/docs/introduction/), LlamaIndex, [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction), and countless internal tools expect OpenAI-compatible endpoints.

A chatbot API with an OpenAI-compatible interface lets you swap providers without rewriting application code. Point the SDK at a different base URL, change the API key, and you're running on a new backend, which reduces lock-in.

Compatibility also means inheriting the ecosystem: libraries that work with OpenAI work with any compatible provider, and tutorials written for OpenAI translate directly.

## Top chatbot APIs for web-grounded conversations

The five providers below each take a different approach to integrating search with generation. For a broader comparison of search API providers, see our [Bing API alternatives](https://parallel.ai/articles/bing-api-comparison) guide.

### OpenAI API with web search

OpenAI's API is the incumbent, running the same models that power ChatGPT across millions of integrations worldwide. OpenAI added [web search as a tool](https://developers.openai.com/api/docs/guides/tools-web-search) in March 2025, as a built-in tool in the Responses API and through dedicated search models in Chat Completions, allowing models to retrieve current information during conversations.

Web search works as a tool call. The model decides when to search, issues a query, receives results, and synthesizes a response. This approach gives the model control over when to search but adds latency for the tool-call round trip.

Pricing combines per-token costs with a separate search fee: $10 per 1,000 web search calls, plus the retrieved search content billed as input tokens. Input tokens, output tokens, and search invocations all carry charges. Costs can be unpredictable for search-heavy workloads.

**Pros:** Largest ecosystem, most capable models, extensive documentation, broad tool support.

**Cons:** Search is an add-on rather than native; pricing complexity; latency from tool-call pattern.

### Parallel Responses API

The Parallel Responses API answers questions with live web research and built-in citations. Responses are grounded in Parallel's proprietary web index, updated continuously with millions of pages daily.

The API is OpenAI-compatible, following the OpenAI Responses format. You use the same SDK and the same request shape. Point your existing code at Parallel's base URL and responses come back with structured citations by default. Teams already on OpenAI can [switch from OpenAI web search to Parallel](https://parallel.ai/articles/openai-to-parallel-search-api) without rewriting application code.

Pricing is a fixed rate per request, starting at [$10 per 1,000 requests](https://parallel.ai/pricing) at low reasoning effort ($50 per 1,000 at medium, $250 per 1,000 at high), charged only for successful responses. There are no per-token charges or separate search fees, so each request costs the same regardless of conversation length or how many sources the model retrieves.

**Pros:** Built-in web search, structured citations by default, OpenAI-compatible, predictable pricing, proprietary web index.

**Cons:** Smaller ecosystem than OpenAI; fewer model variants.

### Google Dialogflow CX with Custom Search

[Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs) is Google's enterprise-grade conversational AI platform. It handles complex multi-turn conversations with branching flows, state management, and integrations into Google Cloud services.

Web search isn't native to Dialogflow. You add it by integrating Google Custom Search through webhooks or Cloud Functions. This approach offers control but requires significant setup and maintenance.

Pricing is complex, combining Dialogflow session fees with Custom Search API charges. Enterprise customers can negotiate custom terms. The platform suits large organizations already invested in Google Cloud.

**Pros:** Enterprise features, Google Cloud integration, mature state management, compliance certifications.

**Cons:** Complex setup for web search; high configuration overhead; pricing complexity.

### Anthropic Claude with tool use

Anthropic's Claude models excel at nuanced reasoning and long-context tasks. Claude supports [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use), letting the model call external functions including web search APIs you provide.

Web search requires bringing your own search service. You define a search tool, Claude invokes it when needed, and you handle the retrieval. This flexibility lets you choose your search provider but adds integration work.

Pricing is per-token for input and output. Search costs depend on whichever provider you integrate. Claude doesn't include native web search, so you're managing two vendor relationships.

**Pros:** Strong reasoning, long context window, excellent instruction following, flexible tool use.

**Cons:** No native web search; requires external search integration; two-vendor management.

### Perplexity API

Perplexity built its product around search-augmented generation. The [Perplexity API](https://docs.perplexity.ai) (pplx-api) provides answer-engine capabilities where every response draws from web sources.

The API is search-native, designed for answer-engine use cases rather than general chat. It excels at answering factual questions with citations but offers less flexibility for general conversation or tool use.

Pricing is per-request with different tiers based on model capability. The focus on search means you're locked into Perplexity's retrieval approach with limited customization.

**Pros:** Search-native design, strong for factual Q&A, citations included.

**Cons:** Limited customization; focused on answer-engine use case; less general-purpose than alternatives.

### Comparison table

| Provider | Built-in web search | Citation support | OpenAI compatible | Pricing model | Streaming |
| --- | --- | --- | --- | --- | --- |
| OpenAI | Yes (tool) | Optional | Yes | Per-token + search fee | Yes |
| Parallel | Yes (native) | Yes (structured) | Yes | From $10/1K requests | Yes |
| Dialogflow CX | Via integration | Via integration | No | Session + search fees | Yes |
| Claude | No (BYOS) | Via tool output | No | Per-token | Yes |
| Perplexity | Yes (native) | Yes | Partial | Per-request | Yes |

## How to build a web search chatbot with the Parallel Responses API

You can build a web-grounded chatbot with citations in under 20 lines of Python. For a more advanced implementation, check out how to [build a web research agent](https://parallel.ai/blog/cookbook-search-agent) with streaming search results.

### Prerequisites

- Python 3.8 or later
- The OpenAI Python SDK (`pip install openai`)
- A Parallel API key (sign up at parallel.ai)

### Code

```python
from openai import OpenAI

# Initialize client pointing to Parallel's API
client = OpenAI(
    api_key="your-parallel-api-key",
    base_url="https://api.parallel.ai/v1"
)

# Ask a question requiring live web data
response = client.responses.create(
    model="parallel",
    input="What is the current price of OpenAI's GPT-6 Sol API?",
    reasoning={"effort": "low"}
)

# Print the response
print(response.output_text)

# Print cited sources
print("\nSources:")
for item in response.output:
    if item.type == "message":
        for part in item.content:
            if part.type == "output_text":
                for citation in part.annotations:
                    print(f"- {citation.url}")
```

### Step-by-step explanation

**Line 1:** Import the OpenAI SDK. Because Parallel is OpenAI-compatible, you use the same library you'd use for OpenAI.

**Lines 4-7:** Create a client instance. Set `base_url` to Parallel's endpoint instead of OpenAI's default. Your Parallel API key goes in `api_key`.

**Lines 10-14:** Call `responses.create` with a question that requires current web data. Set the reasoning effort to low for fast, simple lookups; medium and high handle harder multi-hop and deep-research questions. The model searches the web, retrieves relevant sources, and generates a grounded response.

**Line 17:** Print the response content. This is the model's answer, synthesized from web sources.

**Lines 20-26:** Print the cited URLs. Parallel returns source annotations with each response, carrying the URL, title, and the span of answer text each source supports, so you can display sources in your UI or log them for compliance.

The question asks about current API pricing, information that changes frequently. A model relying on training data would return stale numbers. Parallel's web search retrieves the current pricing page and grounds the response in live data.

You can extend this pattern to support streaming, multi-turn conversations (pass previous_response_id), and structured outputs. The OpenAI SDK handles all of these; Parallel's compatibility means they work identically. See the [Responses API quickstart](https://docs.parallel.ai/responses-api/responses-quickstart) for the full reference.

## Common mistakes when choosing a chatbot API

### Optimizing for model size over answer quality

Bigger models don't guarantee better answers. A smaller model with high-quality retrieval often outperforms a larger model with poor or no retrieval. Benchmark on your actual use cases: accuracy on your domain matters more than parameter counts or generic benchmark scores.

### Ignoring citation support until launch

Citation support feels like a nice-to-have during prototyping. Then you launch, users ask "where did you get that?", and you realize you can't answer. Adding citations retroactively means rearchitecting your prompts and UI. Build with citations from day one.

### Underestimating search latency

Web search adds latency. A chatbot that took 500ms now takes 2 seconds. If your API doesn't stream, users stare at a loading spinner the entire time. Enable streaming from the start. Test perceived latency (time to first token), not just total latency.

### Locking into a vendor-specific SDK

Proprietary SDKs create switching costs. When the vendor raises prices or degrades quality, you're stuck rewriting. An API with an OpenAI-compatible interface, called through the standard SDK, keeps that switch cheap.

### Skipping cost modeling

Prototype usage patterns differ from production patterns. A chatbot that costs pennies in testing can cost thousands at scale if you haven't modeled your expected volume, average conversation length, and search frequency. Build a cost model before launch, set up alerts, and monitor spend daily.

## Frequently asked questions

### What is the best free chatbot API?

Most providers offer free tiers with limited requests. Parallel offers $5 in free credits every month, enough for up to 5,000 Turbo searches. OpenAI provides trial credits for new accounts. Beyond free volume, compare accuracy and features on your own use case.

### Can I use the OpenAI SDK with other chatbot APIs?

Yes, if the API is OpenAI-compatible. Set the `base_url` parameter to the provider's endpoint. Parallel, Together, Groq, and others support this pattern.

### How do chatbot APIs handle web search citations?

Approaches vary. Some return structured citation arrays with URL, title, and snippet. Others embed links inline in the response text. Some require you to integrate your own search and parse results yourself.

### What is the difference between a chatbot API and a web search API?

A chatbot API generates conversational responses from prompts. A web search API returns ranked URLs and snippets matching a query. A web-grounded chatbot API combines both: it searches the web, retrieves sources, and generates a response that cites them.

## Start building

The Parallel Responses API gives you web-grounded, cited answers in a single, OpenAI-compatible endpoint. Fixed per-request pricing, structured citations, and a proprietary web index let you build chatbots that cite their sources without stitching together multiple services.

[Start building](https://docs.parallel.ai/home).

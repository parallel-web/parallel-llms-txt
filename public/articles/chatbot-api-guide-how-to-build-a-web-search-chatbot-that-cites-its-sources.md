# Chatbot API: how to choose one and build a web search chatbot that cites its sources

Choosing a chatbot API in 2026 comes down to which model you build on, how the API gets current facts, and whether every answer cites a source. This guide covers what a chatbot API is, five APIs with built-in web search and their November 2026 prices, how to call one in Python, and the mistakes to avoid.

The right chatbot API depends mostly on where your model comes from and how you want to pay for search. If you already build on OpenAI, Claude, or Gemini, each one offers a built-in web search tool that adds cited answers for $10 to $14 per 1,000 searches plus tokens (checked November 22, 2026). If you want every reply grounded at a fixed price per request, an answer API such as the Parallel Responses API ($10 per 1,000 requests at low effort) or Perplexity’s Agent API fits better. Calling any of them takes a few lines: send the user’s message, read the reply text, and render the citations.

A chatbot API with live [web search API](https://parallel.ai/learn/web-search-api) capabilities retrieves current information from the open web instead of relying on frozen training data, synthesizes it into a response, and cites its sources. Parallel, which builds web search and research APIs for AI agents, offers one such API: the Parallel Responses API, an OpenAI-compatible endpoint that this guide’s code example uses.

## Key takeaways

- A chatbot API with built-in web search eliminates the need to stitch together separate LLM and search services.
- Users and compliance teams need citations to verify claims, so treat citation support as a requirement.
- OpenAI-compatible endpoints let you swap providers without rewriting your application code.
- Latency, cost predictability, and source quality matter more than raw model size when choosing an API.
- You can stand up a web-grounded chatbot in under 20 lines of Python using the Parallel Responses API.

## Chatbot APIs with web search compared

Five APIs cover most chatbot builds that need current facts. Three are model APIs with a search tool the model can call, and two ground every answer by default.

| Chatbot API | Built-in web search | Citation support | OpenAI compatible | Price (checked Nov 22, 2026) | Streaming |
| --- | --- | --- | --- | --- | --- |
| OpenAI Responses API | Yes (web_search tool) | url_citation annotations when it searches | Yes | Tokens + $10 per 1,000 searches | Yes |
| Parallel Responses API | Yes (every request) | url_citation annotations tied to text spans | Yes | $10 / $50 / $250 per 1,000 requests (low / medium / high effort) | Yes |
| Gemini API with Grounding with Google Search | Yes (google_search tool) | url_citation annotations tied to text spans | Partial | Tokens + $14 per 1,000 search queries after 5,000 free a month (Gemini 3 and newer) | Yes |
| Anthropic Claude API | Yes (web search tool) | Yes | No | Tokens + $10 per 1,000 searches | Yes |
| Perplexity Agent API | Yes (web_search tool) | Yes | Partial | Tokens + $2.50 per 1,000 web_search calls ($1 with Fast Search) | Yes |

Prices come from the [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool), [Google](https://aistudio.google.com/docs/pricing), [Perplexity](https://docs.perplexity.ai/docs/getting-started/pricing), and [Parallel](https://docs.parallel.ai/getting-started/pricing) pricing pages, checked November 22, 2026. Token costs come on top for every provider except Parallel, which charges per request.

## What is a chatbot API?

A chatbot API is a programmatic interface for sending user messages and receiving AI-generated responses without managing model infrastructure. You send a prompt and the API returns a completion, with no GPUs to provision, model weights to download, or inference stack to maintain.

Modern chatbot APIs also support conversation history, so the model understands context across multiple turns. They stream tokens as they're generated so users see responses building in real time. Many expose function calling or tool use, letting the model invoke external services mid-conversation, a pattern central to how [AI agents](https://parallel.ai/learn/ai-agent) interact with the world.

Most chatbot APIs wrap a large language model behind a REST or WebSocket interface. OpenAI's Chat Completions API set the pattern; Anthropic, Google, and others followed. The core abstraction is the same: an array of messages in, a message out.

Unlike a raw text completion API, a chatbot API is conversation-oriented. The interface expects structured turns (user, assistant, system) rather than arbitrary text blobs, which makes building chat products simpler and enables features like system prompts and multi-turn memory.

The term also covers chatbot platform APIs from vendors such as Zendesk, Intercom, and Tidio, which host a bot trained on your help content and expose an API for sending messages in and pulling conversations out. This guide is about the other kind: model APIs you call from your own code, where you control the prompt, the retrieval, and the UI.

## Why web search matters for chatbots

Large language models have a knowledge cutoff. Each model's training data stops at a fixed date, often months before the model ships. Anything that happened after the cutoff date is invisible to the model. Ask about a product launched last month, a law passed last quarter, or an API deprecated last week, and the model either refuses to answer or invents something plausible-sounding but false.

Hallucination rates spike for recent events, niche topics, and precise factual claims. [Vectara's hallucination leaderboard](https://github.com/vectara/hallucination-leaderboard) measures how often models add unsupported claims when summarizing a short document they're given. As of its October 22, 2026 update, the best-scoring model hallucinates on 1.8% of summaries, and many widely used frontier models land between 5% and 12%. For technical documentation, pricing pages, and regulatory text, that error rate is unacceptable.

Users expect current information. A developer asking about the latest version of a framework needs the current docs, a researcher tracking a breaking news story needs today's coverage, and a compliance team verifying a regulation needs the text currently in force.

Web search gives chatbots access to live data and source citations. The model can retrieve current information, ground its response in that information, and tell users exactly where the answer came from, so they can click through to the source and verify the claim.

Retrieval-augmented generation (RAG) over a static corpus helps for internal documentation but doesn't solve freshness for open-domain questions. If the corpus isn't updated in real time, the same staleness problem persists. Web search is the only way to ground answers in the current state of the internet. For complex research tasks, teams are turning to [deep research](https://parallel.ai/learn/deep-research) workflows that chain multiple searches together.

A chatbot that returns a wrong API endpoint breaks a developer's integration. One that quotes an old price point erodes customer trust, and one that misrepresents a regulation exposes the business to compliance risk.

## Two approaches to web-grounded chatbot APIs

You have two architectural options, and the one you pick sets your cost structure, response latency, citation quality, and scaling economics.

### Approach 1: LLM + web search tool call

Major LLM providers now offer web search as a tool the model can invoke during generation. OpenAI's `web_search` tool, Google's Grounding with Google Search, and Anthropic's web search feature follow this pattern.

The model receives a user query and decides whether to search the web. If it searches, the API fetches results from a [search engine](https://parallel.ai/articles/bing-api-comparison), injects them into the context, and generates a response. You pay token costs plus a per-search fee.

Because the LLM controls when to search, costs are unpredictable. A query that seems simple might trigger multiple searches. Complex queries might trigger none. You can't guarantee citations in every response.

OpenAI and Anthropic each charge $10 per 1,000 web searches on top of token costs, so 100K monthly searches cost about $1,000 in search fees before tokens.

### Approach 2: Natively web-grounded APIs

Natively grounded APIs build web retrieval into every response. You send a query and get a cited answer, with no separate tool call and no decision about whether to search. Every response includes source URLs by default.

Parallel's Responses API takes this approach and owns its retrieval infrastructure, a proprietary web-scale index with billions of pages. Perplexity's Agent API sits close to it: its presets pair Perplexity's own search stack with a system prompt that requires citations, though the model still runs an agent loop and billing follows the tool calls it makes.

Tool-call approaches also add latency (the model must decide to search, then wait for results) and make billing unpredictable. Native approaches bundle web access into every response, which keeps latency and cost consistent for real-time chat applications serving thousands of users.

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

APIs provide three tiers of citation granularity:

1. **Span-level mapping**: Google Grounding, OpenAI web_search, and Parallel return url_citation annotations whose start and end indexes tie each source to a span of the answer. Highest precision, more work to render.
2. **Response-level source lists**: some APIs return one list of sources for the whole answer. Clean UX, sufficient for most applications.
3. **Search-dependent citations**: with OpenAI’s web_search and tool_choice set to auto, the model may skip the search, so a reply can come back without citations. Tool-based search from Anthropic and Google works the same way.

For applications requiring audit trails or regulatory compliance, span-level citations provide the strongest provenance. For consumer chat products, response-level source lists balance accuracy with UX simplicity.

### Pricing and cost predictability

Chatbot API pricing models vary widely. Some charge per token (input and output separately). Some charge per API call. Some add separate fees for web search on top of generation costs. The combinations make cost forecasting difficult.

Per-completion pricing is easier to forecast than per-token-plus-search-fee. If you know each chat completion costs a fixed amount, you can multiply by projected volume and budget accordingly. With per-token pricing, cost depends on conversation length, which you don't control.

Watch for hidden fees. Some APIs charge for search separately from generation. Some charge for embedding or re-ranking. Some have minimum monthly commitments. Read the pricing page carefully and model your expected usage before committing.

Free tiers help you prototype before committing budget. Most APIs offer a limited free tier or trial credits, and our [free search API comparison](https://parallel.ai/articles/best-free-web-search-api) lists them for web search. Use them to validate that the API meets your accuracy and latency requirements before scaling up.

### OpenAI compatibility

The OpenAI Chat Completions API became a de facto standard. Thousands of applications, SDKs, and frameworks target it. [LangChain](https://python.langchain.com/docs/introduction/), LlamaIndex, [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction), and countless internal tools expect OpenAI-compatible endpoints.

A chatbot API with an OpenAI-compatible interface lets you swap providers without rewriting application code. Point the SDK at a different base URL, change the API key, and you're running on a new backend, which reduces lock-in.

Compatibility also means inheriting the ecosystem: libraries that work with OpenAI work with any compatible provider, and tutorials written for OpenAI translate directly.

## Top chatbot APIs for web-grounded conversations

The five providers below each take a different approach to integrating search with generation. For a broader comparison of search API providers, see our [Bing API alternatives](https://parallel.ai/articles/bing-api-comparison) guide.

### OpenAI API with web search

OpenAI's API is the incumbent, running the same models that power ChatGPT across millions of integrations worldwide. OpenAI added [web search as a tool](https://developers.openai.com/api/docs/guides/tools-web-search) in March 2025, as a built-in tool in the Responses API and through dedicated search models in Chat Completions, allowing models to retrieve current information during conversations.

Web search works as a tool call. The model decides when to search, issues a query, receives results, and synthesizes a response. This approach gives the model control over when to search but adds latency for the tool-call round trip. With tool_choice set to auto, search is optional; set it to required when every answer must search.

Pricing combines per-token costs with a separate search fee: [$10 per 1,000 web search calls](https://developers.openai.com/api/docs/pricing), plus the retrieved search content billed as input tokens (checked November 22, 2026). Input tokens, output tokens, and search invocations all carry charges. Costs can be unpredictable for search-heavy workloads.

**Pros:** Largest ecosystem, most capable models, extensive documentation, broad tool support.

**Cons:** Search is an add-on rather than native; pricing complexity; latency from tool-call pattern.

### Parallel Responses API

The Parallel Responses API answers questions with live web research and built-in citations. Responses are grounded in Parallel's proprietary web index, updated continuously with millions of pages daily.

The API is OpenAI-compatible, following the OpenAI Responses format. You use the same SDK and the same request shape. Point your existing code at Parallel's base URL and responses come back with structured citations by default. Teams already on OpenAI can [switch from OpenAI web search to Parallel](https://parallel.ai/articles/openai-to-parallel-search-api) without rewriting application code.

Pricing is a fixed rate per request, starting at [$10 per 1,000 requests](https://parallel.ai/pricing) at low reasoning effort ($50 per 1,000 at medium, $250 per 1,000 at high), charged only for successful responses. There are no per-token charges or separate search fees, so each request costs the same regardless of conversation length or how many sources the model retrieves.

Three reasoning-effort tiers serve different latency and depth requirements:

| Effort | Use case | Latency | Price/1K |
| --- | --- | --- | --- |
| low | Simple fact retrieval | ~5–10s | $10 |
| medium (default) | Multi-hop questions | ~15–20s | $50 |
| high | Deep research | ~30–60s | $250 |

**Pros:** Built-in web search, structured citations by default, OpenAI-compatible, predictable pricing, proprietary web index.

**Cons:** Smaller ecosystem than OpenAI; fewer model variants.

### Google Gemini API with Grounding with Google Search

Google offers web grounding through the Gemini API, available via Google AI Studio, Firebase AI Logic, and Vertex AI. It connects Gemini models to real-time content from Google Search, works across all available languages, and returns sources users can verify.

Responses include `searchEntryPoint` (the search query used), `groundingChunks` (source URLs and titles), and `groundingSupports` (character-level citation mapping that links specific response segments to specific sources).

Google’s current [grounding documentation](https://aistudio.google.com/docs/google-search) also describes inline url_citation annotations on the answer text, each with start and end indexes, plus google_search_call and google_search_result steps that record the queries the model ran.

Grounded responses also include search suggestions, an HTML snippet for showing Google Search suggestions in your UI, and the terms for [Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search) explain how to display it, so plan a place for it in your chat layout.

Google’s older route, a Dialogflow CX agent calling the Custom Search JSON API, is closed to new customers, and Google ends it for existing ones on January 1, 2027.

On Gemini 3 and newer models, [Grounding with Google Search](https://aistudio.google.com/docs/pricing) includes 5,000 free search requests a month shared across models, then costs $14 per 1,000 search queries the model runs. The Gemini Developer API applies a default cap of 1,500 grounded requests per day per project, and Vertex AI offers a default quota of 1,000,000 search queries per day (checked November 22, 2026). Model tokens are billed on top.

Pros: Google Search as the grounding source, 5,000 free grounded searches a month, inline citations tied to text spans, deep Google Cloud integration.

Trade-offs: Google-specific SDKs, a search-suggestions element to place in your UI, and per-query billing that grows when the model runs several searches for one prompt.

### Anthropic Claude with tool use

Anthropic's Claude models excel at nuanced reasoning and long-context tasks. Claude supports [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use), letting the model call external functions including web search APIs you provide.

Claude can search the web through Anthropic’s server-side web search tool, which returns results with citations. You can also bring your own search service: you define a search tool, Claude invokes it when needed, and you handle the retrieval. This flexibility lets you choose your search provider but adds integration work.

Pricing is per-token for input and output. Anthropic’s web search tool adds $10 per 1,000 searches, plus tokens for the retrieved content. With your own search tool, search costs depend on whichever provider you integrate, and you’re managing two vendor relationships.

**Pros:** Strong reasoning, long context window, excellent instruction following, flexible tool use.

**Cons:** Built-in search adds a per-search fee on top of tokens; a custom search provider requires external integration and two-vendor management.

### Perplexity API

Perplexity built its product around search-augmented generation. The [Perplexity API](https://docs.perplexity.ai) now centers on the Agent API, which replaced Sonar Chat Completions on September 27, 2026 and returns cited answers from models by several providers through a built-in web search tool.

The API is search-native, designed for answer-engine use cases rather than general chat. It excels at answering factual questions with citations, and the Agent API adds tools such as URL fetching, a code sandbox, and MCP servers.

Agent API pricing is per token at each model’s rate, plus tool fees such as $2.50 per 1,000 standard web_search calls or $1 per 1,000 with Fast Search ([pricing](https://docs.perplexity.ai/docs/getting-started/pricing), checked November 22, 2026). Search runs on Perplexity’s own stack, so you get fewer controls over the retrieval backend than with a bring-your-own-search setup.

**Pros:** Search-native design, strong for factual Q&A, citations included.

**Cons:** Limited customization; focused on answer-engine use case; less general-purpose than alternatives.

## How to build a web search chatbot with the Parallel Responses API

You can build a web-grounded chatbot with citations in under 20 lines of Python. For a more advanced implementation, check out how to [build a web research agent](https://parallel.ai/blog/cookbook-search-agent) with streaming search results.

### Prerequisites

- Python 3.10 or later
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

To call the same chatbot API without an SDK, send the request over HTTP:

```bash
curl https://api.parallel.ai/v1/responses \
  -H "Authorization: Bearer $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "parallel",
    "input": "Who is the current CEO of the largest cloud provider by revenue?",
    "reasoning": {"effort": "low"}
  }'
```

## Which chatbot API should you choose?

All five ground replies in web results; our explainer on [LLM grounding](https://parallel.ai/learn/grounding-llm) covers the pattern in more depth. The scenario usually decides it:

- **You already run OpenAI models:** use the Responses API with web_search, and set tool_choice to required for answers that must cite. Our [OpenAI web search comparison](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose) covers when to swap in another backend.
- **You build on Claude:** use Claude’s web search tool, or define your own search tool if you want to choose the backend. See [Claude web search vs. Parallel](https://parallel.ai/articles/claude-web-search-vs-parallel).
- **You build on Gemini or Google Cloud:** Grounding with Google Search gives Gemini Google Search as its source, 5,000 free searches a month, and span-level citations.
- **You want many models behind one search-first API:** Perplexity’s Agent API.
- **You want every reply grounded at a fixed price per request:** the Parallel Responses API, $10 per 1,000 requests at low effort, called through the OpenAI SDK.

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

### Which chatbot API should I use?

Start from the model you already use. OpenAI, Anthropic, and Google each add web search as a tool billed per search on top of tokens, which suits chatbots that only sometimes need current facts. If most questions need live data and you want one price per answer, use an answer API such as the Parallel Responses API or Perplexity’s Agent API.

### What is the best free chatbot API?

Most providers offer free tiers with limited requests. Parallel offers $5 in free credits every month with a card on file, enough for up to 5,000 Turbo searches, plus up to $80 at signup. Google includes 5,000 free grounded searches a month on Gemini 3 and newer models. OpenAI doesn’t give new API accounts trial credits, though since October 28, 2026 eligible ChatGPT Pro and Business subscribers can claim up to $500 a month in API credits. Beyond free volume, compare accuracy and features on your own use case.

### Can I use the OpenAI SDK with other chatbot APIs?

Yes, if the API is OpenAI-compatible. Set the `base_url` parameter to the provider's endpoint. Parallel, Together, Groq, and others support this pattern.

### How do chatbot APIs handle web search citations?

Approaches vary. Some return structured citation arrays with URL, title, and snippet. Others embed links inline in the response text. Some require you to integrate your own search and parse results yourself.

### What is the difference between a chatbot API and a web search API?

A chatbot API generates conversational responses from prompts. A web search API returns ranked URLs and snippets matching a query. A web-grounded chatbot API combines both: it searches the web, retrieves sources, and generates a response that cites them.

### How much does it cost to add web search to a chatbot?

Parallel’s Responses API charges a fixed $10 per 1,000 requests at low effort, with no token or search fees. OpenAI and Anthropic charge $10 per 1,000 web searches on top of token costs, Google charges $14 per 1,000 search queries after 5,000 free a month on Gemini 3 and newer models, and Perplexity’s Agent API bills tokens plus $2.50 per 1,000 web searches. With tool-based pricing, total spend depends on how often the model searches.

### Is the Perplexity Sonar API still available?

Perplexity ended support for Sonar Chat Completions on September 27, 2026. Synchronous and streaming Sonar requests keep working because Perplexity rewrites them as Agent API requests, rolling out by model, while asynchronous Sonar requests are no longer supported. Perplexity recommends the Agent API for new projects ([migration guide](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview)), and our [Perplexity Sonar vs. Parallel](https://parallel.ai/articles/perplexity-sonar-vs-parallel) comparison covers the alternatives.

## Start building

The Parallel Responses API gives you web-grounded, cited answers in a single, OpenAI-compatible endpoint. Fixed per-request pricing, structured citations, and a proprietary web index let you build chatbots that cite their sources without stitching together multiple services.

[Start building](https://docs.parallel.ai/home).

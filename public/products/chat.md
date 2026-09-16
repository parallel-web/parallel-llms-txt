Chat API

# Web-powered chat completions API

The easiest way to implement fast AI answers with web citations

[Try Chat](https://platform.parallel.ai/play/chat)[View docs](https://docs.parallel.ai/chat-api/chat-quickstart)

## Priced per request, not by tool calls

Leading inference APIs bundle in web search price on tool calls, which means fluctuating costs when agents make multiple tool calls. Parallel’s fixed $5 per 1,000 requests is not only 50% cheaper, it’s also consistent.

| Provider               | Cost model                                |
| ---------------------- | ----------------------------------------- |
| OpenAI Web Search Tool | $10 per 1,000 searches + inference tokens |
| Claude Web Search Tool | $10 per 1,000 searches + inference tokens |
| Parallel Search API    | $5 per 1,000 searches + inference tokens  |
| Parallel Chat API      | $5 per 1,000 chat completion              |

## Features

* **OpenAI compatible:** Same SDK, same format. Point your base URL at Parallel and you’re live.
* **Citations by default:** Every response includes verifiable sources. No hallucinations without receipts.
* **Structured output ready:** Request JSON schema responses for clean integration into your product.

# Powered by our own proprietary web scale index

With innovations in retrieval, crawling, indexing, and reasoning

* Billions of pages covering the full depth and breadth of the public web
* Millions of pages added daily
* Recrawled constantly to keep data fresh

## Try Parallel for free

[Get started](https://platform.parallel.ai/)[Contact us](https://form.fillout.com/t/sL37Ja5wWKus)

## FAQ

+−How is this different from OpenAI or Anthropic's built-in web search?

We own our index. That means faster responses, better citation quality, and pricing that doesn't penalize you for grounding every query. Built-in provider search is a black box bolted onto an LLM — we built search-first.

+−How fresh is the data?

The Chat API answers from Parallel's continuously updated web index. For queries requiring the absolute freshest data or deep crawling, use the Task API.

+−What models power the responses?

Chat API uses our own optimized inference stack tuned for speed and accuracy on web-grounded queries. You don't need to choose a model, but you can specify a processor to tune the cost, speed, and depth to your unique needs.

+−Can I use my existing OpenAI SDK?

Yes. Change your base URL to https://api.parallel.ai and swap in your Parallel API key. Everything else, streaming, JSON schema, message format, works the same.

+−What are the rate limits?

300 requests per minute by default. Contact us for production capacity.

+−When should I use Chat API vs. Task API?

Chat is fast and simple, ideal for simple chat assistant UX where latency matters. Task is thorough, it combines our index with real-time crawling and extra reasoning for complex research that needs maximum accuracy and freshness.

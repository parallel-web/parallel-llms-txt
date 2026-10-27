[Integrations](https://parallel.ai/integrations)

# Use Parallel with Baseten

Ground open-source models on Baseten with Parallel web search through Baseten Hosted Tools.

[Use Parallel on Baseten](https://www.baseten.co/blog/introducing-baseten-hosted-tools/)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Ground open-source model responses in current web data without client-side orchestration.
* Let a hosted model decide when to search and iterate until it is confident in the answer.

## How it works

Baseten Hosted Tools runs web search server-side inside the Baseten Inference Stack, with Parallel as a selectable provider for Baseten Grounded Inference.

Add the Parallel web-search tool to a standard Messages, Chat Completions, or Responses request and Baseten interleaves model inference with Parallel search in a server-side loop, streaming tool-use progress until the model produces a grounded response.

## Set up in three steps

1. 1\. Enable Hosted Tools on a Baseten Model APIs request with the server-tools header.
2. 2\. Add the Parallel web-search tool to the request's tools array and optionally tune tool settings such as the iteration budget.
3. 3\. Send a test request and verify the streamed tool-use blocks and the grounded final response.

[Use Parallel on Baseten](https://www.baseten.co/blog/introducing-baseten-hosted-tools/)

Category

[Model Platforms](https://parallel.ai/integrations?category=model-platforms)

Available as

Native or built-inMarketplace listing

Product surface

Baseten Hosted Tools — web search provider

Quick links

* [Setup and documentation](https://www.baseten.co/blog/introducing-baseten-hosted-tools/)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 28 September 2026

## Related integrations

### [OpenRouter](https://parallel.ai/integrations/openrouter)

Select Parallel as the web search engine behind OpenRouter requests.

Model Platforms

### [Merge AI Gateway](https://parallel.ai/integrations/merge-ai-gateway)

Route web search through Parallel from Merge AI Gateway.

Model Platforms

### [Ollama](https://parallel.ai/integrations/ollama)

Give local Ollama models access to the live web by exposing Parallel as a callable tool.

Model Platforms

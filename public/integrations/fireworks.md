[Integrations](https://parallel.ai/integrations)

# Use Parallel with Fireworks

Ground Fireworks-hosted open models in live web results with Parallel Search tool calling.

[Add Parallel to Fireworks](https://docs.parallel.ai/integrations/fireworks)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Let Fireworks-hosted open models search the web with Parallel when a question needs current information.
* Return answers that cite the source URLs from Parallel Search results.

## How it works

Fireworks serves open models through an OpenAI-compatible chat completions API. Give the model a web\_search tool backed by Parallel Search, and it returns a tool call with a search objective and a few keyword queries when it needs fresh information.

Your code sends the objective and queries to Parallel Search and returns the results to the model as a tool message. The model can search more than once, then writes a final answer from the results and lists the URLs it used.

## Set up in three steps

1. 1\. Export a Fireworks API key as FIREWORKS\_API\_KEY and a Parallel API key as PARALLEL\_API\_KEY.
2. 2\. Point the OpenAI SDK at the Fireworks base URL and define a web\_search tool that sends its objective and search queries to Parallel Search.
3. 3\. Ask a question with a Fireworks model that supports function calling, return each search result to the model, and verify the answer lists its source URLs.

[Add Parallel to Fireworks](https://docs.parallel.ai/integrations/fireworks)

Category

[Model Platforms](https://parallel.ai/integrations?category=model-platforms)

Available as

API / tool calling

Product surface

Fireworks chat completions tool calling

Quick links

* [Setup and documentation](https://docs.parallel.ai/integrations/fireworks)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 27 October 2026

## Related integrations

### [Baseten](https://parallel.ai/integrations/baseten)

Ground open-source models on Baseten with Parallel web search through Baseten Hosted Tools.

Model Platforms

### [OpenAI](https://parallel.ai/integrations/openai)

Add current web search and research to OpenAI-powered applications with Parallel tool calling.

Model Platforms

### [Ollama](https://parallel.ai/integrations/ollama)

Give local Ollama models access to the live web by exposing Parallel as a callable tool.

Model Platforms

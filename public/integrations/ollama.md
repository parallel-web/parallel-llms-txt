[Integrations](https://parallel.ai/integrations)

# Use Parallel with Ollama

Give local Ollama models access to the live web by exposing Parallel as a callable tool.

[Add Parallel to Ollama](https://docs.parallel.ai/integrations/ollama-tool-calling)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Combine local models with current web search and research.
* Let an Ollama model invoke Parallel only when a prompt needs live information.

## How it works

Expose Parallel as a callable tool through Ollama's tool-calling interface: the local model emits a tool call when a prompt needs live information, your code executes the Parallel request, and the sourced result goes back to the model for its final response.

Local inference stays local; only the web research round-trips to Parallel.

## Set up in three steps

1. 1\. Define the Parallel operation as a tool available to the Ollama model.
2. 2\. Map the tool arguments to a Parallel request and configure credentials.
3. 3\. Execute requested calls and return the sourced result to the model for its final response.

[Add Parallel to Ollama](https://docs.parallel.ai/integrations/ollama-tool-calling)

Category

[Model Platforms](https://parallel.ai/integrations?category=model-platforms)

Available as

API / tool calling

Product surface

Ollama tool calling

Quick links

* [Setup and documentation](https://docs.parallel.ai/integrations/ollama-tool-calling)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 4 August 2026

## Related integrations

### [OpenAI](https://parallel.ai/integrations/openai)

Add current web search and research to OpenAI-powered applications with Parallel tool calling.

Model Platforms

### [Anthropic](https://parallel.ai/integrations/anthropic)

Give Anthropic-powered applications live web research through tool calling, or connect Parallel to Claude Desktop over MCP.

Model Platforms

### [OpenRouter](https://parallel.ai/integrations/openrouter)

Select Parallel as the web search engine behind OpenRouter requests.

Model Platforms

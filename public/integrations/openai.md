[Integrations](https://parallel.ai/integrations)

# Use Parallel with OpenAI

Add current web search and research to OpenAI-powered applications with Parallel tool calling.

[Add Parallel to OpenAI](https://docs.parallel.ai/integrations/openai-tool-calling)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Let OpenAI models call Parallel when a task needs live web information.
* Return sourced search or research results for the model to synthesize.

## How it works

Define Parallel Search as an OpenAI function tool: the model outputs structured JSON when a task needs live web information, your application executes the Parallel call, and the sourced result goes back for the model to synthesize.

This is the standard function-calling loop, with Parallel providing the web layer and source URLs for citations.

## Set up in three steps

1. 1\. Define the Parallel operation as a tool available to the OpenAI model.
2. 2\. Map tool arguments to a Parallel request and configure credentials.
3. 3\. Execute requested calls and return the result to the model for its final response.

[Add Parallel to OpenAI](https://docs.parallel.ai/integrations/openai-tool-calling)

Category

[Model Platforms](https://parallel.ai/integrations?category=model-platforms)

Available as

API / tool calling

Product surface

OpenAI API tool calling

Quick links

* [Setup and documentation](https://docs.parallel.ai/integrations/openai-tool-calling)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 4 August 2026

## Related integrations

### [Anthropic](https://parallel.ai/integrations/anthropic)

Give Anthropic-powered applications live web research through tool calling, or connect Parallel to Claude Desktop over MCP.

Model Platforms

### [Ollama](https://parallel.ai/integrations/ollama)

Give local Ollama models access to the live web by exposing Parallel as a callable tool.

Model Platforms

### [Vercel AI SDK](https://parallel.ai/integrations/vercel-ai-sdk)

Add Parallel web search and research to AI SDK apps through the Parallel toolkit, AI Gateway, or Vercel Marketplace integration.

Agent Frameworks

[Integrations](https://parallel.ai/integrations)

# Use Parallel with Anthropic

Give Anthropic-powered applications live web research through tool calling, or connect Parallel to Claude Desktop over MCP.

[Add Parallel to Anthropic](https://docs.parallel.ai/integrations/anthropic-tool-calling)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Let Anthropic models decide when to search or research the web.
* Return Parallel results to the model with source context for synthesis.

## How it works

Register Parallel Search as a tool in Anthropic's Messages API: Claude emits a tool\_use block when a prompt needs current information, your application executes the Parallel call, and the sourced result goes back for Claude to synthesize.

For Claude Desktop, the documented MCP path connects Parallel directly without writing the loop yourself.

## Set up in three steps

1. 1\. Choose Anthropic API tool calling or the documented Claude Desktop MCP path.
2. 2\. Configure Parallel as a tool and provide the required credentials.
3. 3\. Send a test prompt, execute the requested Parallel call, and return its result to the model.

[Add Parallel to Anthropic](https://docs.parallel.ai/integrations/anthropic-tool-calling)

Category

[Model Platforms](https://parallel.ai/integrations?category=model-platforms)

Available as

API / tool callingMCP

Product surface

Anthropic API tool calling; Claude Desktop manual MCP

Quick links

* [Setup and documentation](https://docs.parallel.ai/integrations/anthropic-tool-calling)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 4 August 2026

## Related integrations

### [OpenAI](https://parallel.ai/integrations/openai)

Add current web search and research to OpenAI-powered applications with Parallel tool calling.

Model Platforms

### [Ollama](https://parallel.ai/integrations/ollama)

Give local Ollama models access to the live web by exposing Parallel as a callable tool.

Model Platforms

### [Vercel AI SDK](https://parallel.ai/integrations/vercel-ai-sdk)

Add Parallel web search and research to AI SDK apps through the Parallel toolkit, AI Gateway, or Vercel Marketplace integration.

Agent Frameworks

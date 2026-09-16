# Tool calling

Tool calling lets a large language model decide when to use an external tool. The model outputs the tool name and arguments as structured data, then uses the returned result to answer. Another name for this is function calling.

Tool calling is a large language model's ability to invoke external functions, APIs (application programming interfaces), or systems through a structured request that your code runs.

## What is tool calling?

Tool calling lets a large language model decide when to use an external tool. The model outputs the tool name and arguments as structured data, then uses the returned result to answer. Another name for this is function calling. 

A model on its own predicts text from what it saw during training. It can't check today's news, query your database, or send an email. Tool calling gives it a path to those systems.

This step turns a simple input and output into an agent capable of performing multiple actions between the input and output. The model reaches live data and takes real actions to complete real tasks.

Tools are defined with a schema. The schema lists a name, a short description, and each parameter with its type. The model reads these definitions and matches a request to the right tool at inference time. 

Consider a weather tool. You give it the name get_weather, a description, and one parameter for the city. The model fills in the city and calls it when a user asks about conditions.

Clear tool descriptions matter here. Sharp names and parameter notes help the model pick the right tool.

The flow stays easy to follow. You describe the tools, the model picks one and fills in the arguments, and your code runs the request. Your code then returns the output to the model.

Most real tasks need more than one call. The model reads each result, updates its plan, then chooses the next move. Teams call this exchange an action and observation loop.

Some models can request several tools at once. They batch independent calls, read the results together, then merge them into one answer.

The value grows with the tools you connect. A model with search, a calculator, and a calendar can research, compute, and book in one session. This pattern now anchors most production AI applications, including support bots and research agents.

## Key characteristics

These traits define how tool calling works across models and providers.

- **Model decides, code executes:** The model outputs a structured call, your code runs the action, then returns the result to the model.
- **Structured, schema-based requests:** Each tool has a name, description, and typed parameters. The model returns arguments as JSON (JavaScript Object Notation), a pattern [introduced by OpenAI in 2023](https://openai.com/index/function-calling-and-other-api-updates/).
- **A loop of actions and observations:** The model calls a tool, reads the result, then decides whether to call another tool or answer.
- **Provider-neutral pattern:** OpenAI, Anthropic, and others expose the same idea, including function calling and [tool use with Claude](https://docs.parallel.ai/integrations/anthropic-tool-calling).

## Example

Picture an agent asked for a company's most recent funding round. The model's training ended months ago, so it can't know last week's news. It calls a web search tool to get the latest result.

Here is the sequence in practice. The agent sees it needs a fact it doesn't hold, so it selects the search tool. It writes a clear objective and waits for your code to return results.

Parallel's [web search tool for agents](https://parallel.ai/products/search) fits this job. The agent sends a plain-language objective, and Search returns ranked URLs with compact excerpts.

Your code passes those excerpts back to the model. The model reads them, then writes the funding figure with a source.

You can validate the arguments before you run the tool. If the JSON is malformed, you return an error and let the model try again.

A single question can trigger several calls. The agent might search, read one page in detail, then search again to confirm a number.

Good error handling keeps the loop stable. A call that returns nothing useful lets the agent retry, pick another tool, or tell you it can't find the answer.

Grounding answers this way cuts invented facts. The agent reports what it found rather than guessing from memory.

Parallel maintains its own web index of billions of pages and adds millions each day. Fresh sources give the agent current facts to work from.

The payoff shows up in research. [The Toolformer research](https://arxiv.org/abs/2302.04761), a 2023 study, found that allowing the model to make API calls more than doubles performance for all tasks in its math benchmark set.

![Parallel Search used as a tool with OpenAI's function calling](https://cdn.sanity.io/images/5hzduz3y/production/6beaad48f409e8e3cf17567ef51a434bbfde95ed-1920x1080.png)

_Parallel's guide to using __[Search as a tool in OpenAI's function calling](https://docs.parallel.ai/integrations/openai-tool-calling)__._

## Related terms

- [MCP servers](https://parallel.ai/articles/mcp-vs-skills-vs-clis): the Model Context Protocol for exposing tools to a model.
- [Agent harness](https://parallel.ai/articles/what-is-an-agent-harness): the runtime loop that manages an agent's tool calls.
- [AI agents](https://parallel.ai/articles/what-is-an-ai-agent): systems that use tools to plan and complete multi-step tasks.
- [Agent skills](https://parallel.ai/articles/what-are-agent-skills): packaged capabilities an agent can load and use.

## FAQ

**Is tool calling the same as function calling?**

Yes, the terms name the same capability, and different providers use different labels for the same pattern.

**Does the model run the tool itself?**

No, the model only generates the structured call with the arguments. Your application runs the function, then passes the result back for the model to use.

**Why do tool calls sometimes fail?**

Most failures come from malformed arguments or the model picking the wrong tool. That is why multi turn tool use stays harder than single turn calls on benchmarks like the Berkeley Function Calling Leaderboard.

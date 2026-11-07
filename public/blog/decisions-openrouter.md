# Parallel Decisions is now on OpenRouter

Give your agents answers grounded in the live web with your existing OpenRouter API key.

Starting today, Parallel Decisions API is available on OpenRouter, bringing fast, web-grounded decisions directly into your existing workflows. Give your agents live web answers with the tools and API key you already use.

Does this vendor support SAML SSO? Does this API still support the feature your agent needs? [Parallel Decisions API](https://parallel.ai/blog/decisions-api) checks the live web and returns structured answers with probabilities and citations in under a second. It combines the speed of system-one models like Jev with real-time web data, so your agents can make decisions beyond what’s in their context. Ask up to 100 related questions in a single request, all sharing one search call.

**Try Parallel Decisions free for 7 days on ****[OpenRouter](https://openrouter.ai/parallel/decisions-fast)****. Bring your existing API key and your next idea, and start building with ****`parallel/decisions-fast:free`****.**

## The best decisions solution for web-grounded data

Parallel Decisions API is the best decisions model for questions that depend on web-grounded data. On [PWS-Decisions](https://parallel.ai/blog/pws-decisions-benchmark), our open benchmark whose answers depend on the live web, it answers 92.0% of the 100 public questions.

![Chart showing Parallel Decisions accuracy on the PWS-Decisions benchmark](https://cdn.sanity.io/images/5hzduz3y/production/596426633d0a352cf8804d3ff6a5644e093c973d-2000x1158.png)

PWS-Decisions is open source, so you can check these numbers yourself. Run it on any decision model with the code on [GitHub](https://github.com/parallel-web/pws-decisions-benchmark) and the dataset on [Hugging Face](https://huggingface.co/datasets/parallel-web/pws-decisions-benchmark).

This state of the art accuracy also comes with speed and cost savings: Parallel Decisions returns web-grounded answers 13× faster at 1/16 the cost of OpenAI’s GPT Luna with native web search.

![Chart comparing Parallel Decisions speed and cost with GPT Luna with native web search](https://cdn.sanity.io/images/5hzduz3y/production/c9f7984d7deda18e2dcd5ecae356b317e66951f1-2000x1590.png)

## Built for agent loops

Agent builders on OpenRouter often need information from today's web before making a decision about the next step. Without a decision model, that means a search call, a model call and code to parse the answer. With the Decisions API it is one call that returns a value your agent can act on, at $1 per 1,000 requests with search included.

Teams use it for:

- **Coding agents:** Does this API still support the parameter my agent is about to use?
- **Model selection:** Which models on this shortlist support both tool calling and structured outputs?
- **Integration screening:** Does this open-source project expose an MCP server my agent can connect to?
- **Dependency checks:** Is this package version affected by a publicly disclosed vulnerability?
- **Vendor validation:** Does this model provider offer zero data retention for API requests?
- **Account qualification:** Is this company building an AI product, and is it hiring engineers to work on agents?

Not sure where the Decisions API fits for your team? [Try this demo](https://webjev-use-cases.paralleldemos.com/): enter your company and see which of your workflows could run on web-grounded decisions.

## Get started

Bring your OpenRouter API key and see what you can build. Try Parallel Decisions free for 7 days, with no separate account required.

Select [**Parallel: Decisions Fast**](https://openrouter.ai/parallel/decisions-fast) in the model list, or set your model ID to `parallel/decisions-fast:free`.

For more on the Decisions API, explore the [Quickstart](https://docs.parallel.ai/decisions/decisions-quickstart) and [API reference](https://docs.parallel.ai/api-reference/decisions/make-web-grounded-typed-decisions).

Need help getting started? Contact us.

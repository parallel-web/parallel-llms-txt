# How to create custom integrations with Meta Muse: connect any API or MCP server

Meta Muse reaches outside services through built-in connectors, Custom Connectors it writes for itself, and, in Muse Code, MCP servers listed in a settings file. This guide covers how each route works, what happens when you hand Muse an MCP server URL, a copy-paste prompt that works in one message, and the security controls that apply to custom connectors.

Meta launched Muse, its personal AI agent, on September 8, 2026. It runs on a dedicated cloud computer and acts inside the apps you connect to it. Its connector list is curated by Meta and has grown since launch, and developers can now submit connectors for review through the [Muse Connector Platform](https://platform.muse.ai/). The list still covers only a slice of the services people use, which has led to a common assumption that if a service is not in the list, Muse cannot use it. In fact, Muse can write and run its own integration code on its virtual machine, and Meta documents this as a supported feature called a Custom Connector.

We tested this by asking Muse to connect to our own hosted MCP server. It took one message and a little under a minute, and the result was a working, reusable integration. What follows is what Muse does when you hand it an API or an MCP server, the prompt that gets the cleanest result, and what to know before you grant it credentials.

## The three ways Muse connects to a service

Muse reaches outside services in three ways, and it will usually pick the right one on its own. Knowing which one it is using tells you why it asks the questions it does.

**Built-in connectors.** Meta builds these with the service provider. At launch the list included Gmail, Google Calendar and Google Workspace, Ticketmaster, OpenTable, Spotify, Apple Health, Function Health, Peloton, and Plaid, plus Facebook, Instagram, and Threads, which connect automatically through Accounts Center. At Connect on September 24, Meta added work connectors for [Notion, Granola, GitHub, and Box](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/) alongside new shopping and travel partners, and the [Muse for Small Business launch](https://about.fb.com/news/2026/09/introducing-muse-small-business/) on September 29 added Slack, Asana, Dropbox, Canva, Figma, Stripe, and more. You turn them on under Settings and then Connectors, or by asking Muse to "connect my Gmail." Each one comes with skills that Meta wrote and iterated on, and its code runs in a privilege-separated worker outside the agent's own runtime, so the agent never touches the OAuth token.

**Custom connectors.** Meta's [safety write-up](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) says it plainly: "Muse can also write its own custom connectors for other services you care about if they have their own APIs or CLIs." The [Meta Help Center](https://www.meta.com/help/artificial-intelligence/1687253048996149/) adds that you simply ask Muse to create a Custom Connector, that it may need to retrieve API information from the service, and that any keys go into its Secure Credentials Store. It also warns that Meta does not review custom connectors, so you are trusting the service provider directly.

**The browser.** For a site with no API at all, Muse drives a Chromium browser on its VM with a dedicated browser sub-agent. This works for almost anything and is the most fragile of the three, because it breaks when the site changes and every page costs far more tokens than an API call.

| Path | Who writes the code | Where credentials live | Best for |
| --- | --- | --- | --- |
| Built-in connector | Meta, with the provider | Secure Credentials Store, outside the agent runtime | Email, calendar, work tools like Notion and GitHub, and other listed partners |
| Custom connector | Muse, on its own VM | Secure Credentials Store, injected at the network edge | Any service with a public API, CLI, or MCP server |
| Browser | Nobody; Muse navigates live | Filled by the credential store into the page | Sites with no API |

The reason custom connectors are possible at all is the machine Muse runs on. Meta describes each Muse Secure VM as "an isolated linux box with a browser and enough storage, CPU, and memory to do real work, like compiling code the agent writes, developing custom skills and handling concurrent sub-agents and crons." Meta's Vishal Shah put the consequence to [Engadget](https://www.engadget.com/2253133/meta-reveals-its-ai-agent-that-can-shop-send-emails-and-plan-trips-on-your-behalf) this way: "Because it is a very capable AI product that can also build its own software, it isn't really limited in what it can do."

## What Muse does when you give it an MCP server

The Muse app has no "add MCP server" setting. When we asked it to connect to a [Model Context Protocol](https://parallel.ai/articles/what-is-mcp) server, it said so directly: it does not have a one-click integration the way Claude Desktop does, but it could build a small bridge on its machine that connects to the server as a client and then call the server's tools whenever needed.

It then asked two questions. Is the server reachable over HTTP at a URL, or does it run over stdio as a command it would need to launch? And does it need any auth, such as an API key or a header? Those are the only two things you have to know about a server before you start.

Given a URL, Muse wrote a client using the official MCP SDK, connected over streamable HTTP, listed the server's tools, called each of them end to end, and reported the results. It then saved the integration as a reusable skill, which means it is available in future conversations without repeating the setup.

Where Muse runs decides which servers it can reach. Remote servers over streamable HTTP are the easy case, because a cloud VM can reach them the same way any other client does. A stdio server has to be installable on a Debian box with `npm` or `pip`, which most published servers are. A server running on your own laptop is not reachable, since the VM is in Meta's cloud and not on your network. Our guide to [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers the distinction.

Meta's release notes for Muse Spark 1.1 say the model "zero-shot generalizes to new native tools, MCP servers, and custom skills," and the safety post describes training on zero-shot tool calling through CLIs and skills.

Muse Code, Meta's terminal coding agent, is the exception: it supports MCP servers directly. It reads them from the `mcpServers` block of `~/.config/muse/settings.json`, which must include `"schema_version": 1`, supports both stdio and streamable HTTP, and handles OAuth 2.1 sign-in with `muse mcp login <server>`. [Meta's docs](https://dev.meta.ai/docs/muse-code/extending) note that MCP tools run outside Muse Code's sandbox, so connect only servers you trust.

```json
{
  "schema_version": 1,
  "mcpServers": {
    "parallel": {
      "url": "https://mcp.parallel.ai/mcp"
    }
  }
}
```

## Step by step: connect Muse to a new service

1. **Find the technical entry point.** For an MCP server that is the server URL. For a REST API it is the OpenAPI document or the docs page. For a CLI it is the package name. Muse can go find these itself, and the exchange is shorter if you paste the link.
2. **Send one message that names the service, the entry point, and what you want out of it.** Tell Muse to build a custom integration, test it, and save it as a skill. The template below works for any of the three.
3. **Answer the transport and auth questions if it asks.** For a hosted MCP server the answers are usually "HTTP" and either "none" or "bearer token."
4. **Hand over credentials through the credential prompt, not the chat.** When Muse needs a key, it triggers a secure entry flow. What you type there goes to the VM's credential daemon and is swapped into requests at the network boundary by Sentinel, so the agent itself only ever holds a surrogate token. Pasting a key into the conversation defeats that design and leaves it in your history.
5. **Ask for a test and a skill.** Muse will call each tool and show you the output. Confirm it saved the skill, then try it from a fresh conversation.
6. **Set the approval policy.** Under Settings you can hold a connector to read-only, require approval for every action, or allow it. For a search server there is nothing to write, so allow is reasonable. For anything that sends, posts, or spends, keep approval on.

```text
Build a custom integration to [SERVICE]. Its [MCP server URL / OpenAPI document / CLI package] is [LINK]. I want you to be able to [WHAT YOU WANT DONE] from any future conversation. Connect to it, test every capability end to end, show me the results, and save the integration as a reusable skill. If it needs credentials, ask me for them through the secure credential flow.
```

## Worked example: web search in one message

Muse can already browse the web with its browser sub-agent, but browsing is the expensive way to answer a factual question. The browser agent loads a results page, picks a link, loads that page, reads it, and repeats, and every step is a screenshot-scale chunk of context that counts against your usage meter. A search MCP returns ranked results with excerpts in one tool call, and a fetch tool returns a page as compact markdown. Research that would take Muse a dozen browser steps takes one or two calls.

We make Parallel, so our example is [Parallel MCP](https://parallel.ai/mcp). It is a hosted server at `https://mcp.parallel.ai/mcp`, and its `web_search`, `web_fetch`, and `web_decisions` tools are free to use with no account or API key. When we ran this test in September, the server had only `web_search` and `web_fetch`. This is the prompt we used, updated for the current tool set:

```text
Build a custom integration to the Parallel MCP server at https://mcp.parallel.ai/mcp. It is a remote MCP server over streamable HTTP. Without authentication it offers three tools: web_search, web_fetch, and web_decisions. Connect to it with the official MCP SDK, test web_search and web_fetch end to end, and save the integration as a reusable skill so you can use it for web research in any future conversation. If I later give you a Parallel API key, add it as an Authorization: Bearer header; that also adds a fourth tool, web_research, for cited answers to harder questions.
```

Muse came back with both tools working and a note that it would reach for the skill automatically whenever it needed current web information. It also offered, unprompted, to wire in a Parallel API key as a bearer token if we wanted higher rate limits. The anonymous endpoint runs at lower limits, and a free account at [platform.parallel.ai](https://platform.parallel.ai) comes with up to $80 in free credits plus $5 a month with a card on file. A key also adds `web_research`. Organizations that want every request attributed to an account can point Muse at `https://mcp.parallel.ai/mcp?login` instead, which signs in with a Parallel account over OAuth and also adds `web_research`. We haven't tested that sign-in flow inside Muse.

For a single research question, the `web_research` tool on the same server covers it once you add a key. For deep research and batch enrichment that run as asynchronous jobs, the same shape works for Parallel's [Task MCP](https://docs.parallel.ai/integrations/mcp/task-mcp) at `https://task-mcp.parallel.ai/mcp`, which requires an API key from the start. Our list of the [best MCP servers and connectors for Meta Muse](https://parallel.ai/articles/best-mcp-servers-for-meta-muse) covers what else is worth adding.

## What makes a service easy for Muse to integrate

If you build software and want Muse users to be able to reach it, you have two routes. Meta's [Muse Connector Platform](https://platform.muse.ai/) takes submissions of API and MCP connectors, reviews them for functional, security, and legal requirements with end-to-end testing, and lists approved ones in Settings > Connectors. A listing isn't required, though: Muse can build a custom integration to any public API or hosted MCP server, so users can reach your service today.

What makes that integration smooth is what makes any agent integration smooth:

- **A public, linkable spec.** An OpenAPI document or an MCP server URL that Muse can read without logging in. Gated docs turn a one-message setup into a browser session.
- **Token authentication.** Bearer tokens and API-key headers fit the credential-store flow directly. Muse's own question is "an API key or header," which tells you what it expects. OAuth-only services may still work through Muse's browser, but expect more back and forth.
- **A hosted MCP server over streamable HTTP.** This is the shortest path of all, because Muse already knows the protocol and the transport. Servers that require a local process on the user's own hardware are unreachable from the VM.
- **A CLI on npm or PyPI.** Meta says Muse Spark was trained on zero-shot tool calling through CLIs, and the VM can install packages. A CLI is often the better surface when the work involves files on the VM. Our piece on [MCP servers vs. skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis) weighs the three.
- **Errors that say what went wrong.** A 429 with a clear message lets Muse back off and tell the user. A generic 403 sends it down a debugging path on your dime.

## Security and limits to know about

Meta does not review custom connectors. The Help Center says so and tells you to check the provider's privacy policy before granting access. In practice that means you are trusting whoever runs the API or MCP server with whatever Muse sends it, so connect services you would be comfortable giving a browser extension the same access to.

Custom connector code runs inside Muse's own runtime cell, which does not get the extra privilege separation Meta applies to built-in connectors. Two of Meta's protections still apply, though. Every outbound request passes through Sentinel, a separate agent on the same VM that is "the sole permission authority for connector actions and network egress," and any request that needs a secret has the real credential inserted by Sentinel at the network boundary, so the agent's code only ever sees a surrogate. Approvals are shown in a dialog that is separate from the conversation, and you can scope them to one action, one task, a time window, or permanently.

Muse is available in the US only and to adults only at launch, on iOS, Android, the web at muse.ai, and inside WhatsApp. Most of it is free, with Power at $20 a month and Maximum at $100 a month for heavier usage, and Meta requires a payment card on file even for the free tier. Custom connectors consume the same usage meter as everything else, which is one more reason to prefer an API call over a browser session for anything you do often.

## Frequently asked questions

**Can Meta Muse use MCP servers?** Yes. In the Muse app it's not a settings menu: Muse builds an MCP client on its own VM using the official SDK, connects to the server over streamable HTTP, and saves the integration as a skill. Remote servers work best, and a server on your own laptop is not reachable from Meta's cloud. Muse Code, Meta's coding agent, supports MCP servers directly through `~/.config/muse/settings.json`, including OAuth sign-in with `muse mcp login`.

**How do I add a custom connector to Meta Muse?** Ask it. Tell Muse the service, give it the API docs or MCP URL, and say what you want to be able to do. It will build the integration, test it, and store any credentials in its Secure Credentials Store. Meta documents this in its Help Center under Custom connectors.

**Does Muse see my API keys?** Meta says no. Keys entered through the credential flow are stored by a daemon outside the agent's runtime, and Sentinel swaps a surrogate token for the real one when a request leaves the VM. That protection only applies if you enter the key through the secure prompt rather than typing it into the chat.

**How do I get my product listed as a Muse connector?** Submit it through Meta's [Muse Connector Platform](https://platform.muse.ai/), which accepts API and MCP connectors, reviews each one, and lists approved connectors in Settings > Connectors. Meta publishes the [submission guidelines](https://platform.muse.ai/docs). You don't need a listing for Muse users to reach you, though: build a good public API or a hosted MCP server, document it, and users can connect to it today as a Custom Connector.

**Does Meta Muse have an API?** Not for the agent itself. There is no public API for driving your Muse or reading its skills from outside, and connector listings go through the review process on the Muse Connector Platform rather than an API. What Meta does sell is the [Meta Model API](https://ai.developer.meta.com/docs/getting-started/overview), which exposes the Muse Spark models that power Muse through OpenAI- and Anthropic-compatible endpoints for developers building their own agents. Integration with the Muse consumer agent runs the other way: your service exposes an API, and Muse connects to it.

**Is a custom connector the same as a skill?** No. A connector is the code and credentials that talk to a service. A skill is the saved instructions that tell Muse when and how to use it. When Muse finishes a custom integration it usually saves a skill so the connector is available in later conversations.

_Note: Muse is new and Meta is changing it quickly. Check Meta's Help Center for the current connector list and settings._

Related reading: [The best MCP servers and connectors for Meta Muse in 2026](https://parallel.ai/articles/best-mcp-servers-for-meta-muse) / [What is MCP: Model Context Protocol fundamentals](https://parallel.ai/articles/what-is-mcp) / [Remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) / [MCP servers vs. agent skills vs. CLIs](https://parallel.ai/articles/mcp-vs-skills-vs-clis)

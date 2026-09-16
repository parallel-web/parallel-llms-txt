# How Amp’s coding agents build better software with Parallel Search

Amp is a frontier coding agent designed for the future of software development.

## Software standards and docs are always changing

The software ecosystem moves fast. Libraries release breaking changes, APIs deprecate endpoints, and best practices evolve. A coding agent working from static training data will inevitably give outdated or incorrect guidance.

Amp's team identified three critical scenarios where real-time web access would dramatically improve their agent's performance:

1. **Documentation lookup**: Retrieving current documentation for libraries and APIs relevant to the user's coding task
2. **Design research**: Reading specs, user feedback, and technical resources to help the agent design the right solution
3. **Complex debugging**: Finding information about obscure bugs, edge cases, and workarounds that only exist scattered across the web

## With Parallel, Amp stays up to date and digs deeper

Amp integrated Parallel's Search and Extract APIs to give their coding agent reliable, real-time web intelligence:

**Web search tool**— Powered by Parallel's Search API, Amp can search the web for information relevant to any coding task, returning fast, fresh, and comprehensive results.

**Web fetch tool**— Powered by Parallel's Extract API, Amp can retrieve and process details from any web page, including JavaScript-rendered documentation sites that traditional scrapers can't handle.

## Why does Amp choose Parallel for web search?

_"Parallel's team was incredibly helpful as we designed how Amp would use their APIs: tool names, params, UI, and other thoughtful guidance. They get it, and they care." _

_- Quinn Slack, CEO Amp_

Amp's team evaluated their options and found that Parallel delivered on the specific requirements that matter most for agentic coding workflows:

**Fast, fresh, relevant results** — When a developer is waiting on their agent to debug a production issue, latency matters. Parallel's Search API returns comprehensive results quickly, with the freshness needed to surface recent library releases and documentation updates.

**Token-compressed excerpts** — Parallel's objective parameter lets Amp request excerpts focused on what the agent actually needs, reducing context window bloat and keeping costs down.

**JavaScript rendering** — Modern documentation sites are often client-side rendered. Parallel's Extract API handles these seamlessly, ensuring Amp can access the same content a human developer would see.

**Developer experience** — A well-designed API and responsive team meant Amp could integrate quickly and get expert guidance on optimizing their implementation.

## Less time spent on search, more time spent building the best coding agent

By replacing their in-house web search and extraction with Parallel’s web search API, Amp was able to focus on their core product. Parallel is capable of handling the edge cases, rate limits, and rendering challenges that previously plagued their in-house solutions.

Anecdotal feedback from users consistently shows that Amp's web-powered features now deliver more accurate and helpful results.

# Merge launches Universal Context Layer with Parallel Search as its default web search provider

Merge is launching Universal Context Layer in Merge for Workforce today, a governed AI experience for employees that connects company knowledge, tools, permissions, and models in one place. Merge is launching it with Parallel Search as its default web search provider.

## Private data only answers half the questions

Most workforce AI deployments start with the data a company already has, like internal docs, support tickets, CRM records, or wikis. That makes for a good internal knowledge base, but is a limited view of the real world.

For questions like “how does our pricing compare to the tier a competitor announced this morning?” or “what changed in the EU AI Act guidance last week?” Agents need the ability to call upon the open web.

Merge for Workforce is made to handle both sides. Merge's Universal Context Layer governs the private side: which knowledge sources an employee can see, which tools they can call, which models run underneath, and what controls apply. Parallel Search supplies the public side, returning current market, customer, competitive, regulatory, and industry information as dense excerpts the model can cite.

## Why Merge picked Parallel Search

Merge needed web search that balances three key dimensions: grounding quality, cost, and latency.

**Grounding quality. **Low-quality context can derail an entire agentic task. Parallel Search returns ranked URLs with compressed, query-relevant excerpts instead of blue links. Results come from our own web index, and we scope each excerpt to the agent’s objective so the model only reads the most relevant passages.

**Cost.** Across thousands of employees using generative AI every working hour, agents can perform hundreds of thousands of web searches to achieve their goals. Parallel Search is priced for scale, starting at $1 per 1,000 requests.

**Latency.** Speed can be critical for human-in-the-loop agents and large tasks requiring thousands of concurrent searches. Parallel Search has four modes, ranging from median latency of 200ms (Turbo) to 3s (Advanced).

The same bar applies to the AI that Merge customers ship to their own users. Parallel Search is also the default web search provider in Merge for Products, so teams building customer-facing AI get the same grounding without integrating search themselves.

> Without live web access, the model falls back on training data, or the employee pastes in results from Google and the grounding lands outside anything IT can see.
>
> Parallel returns passages scoped to the question instead of links the model still has to read, at a cost and latency that hold up across an entire workforce and inside the products our customers ship. That's why it's the default in Merge.
>
> — Gil Feig, CTO & Co-Founder

## Availability

Universal Context Layer in Merge for Workforce is available starting today. [merge.dev/workforce](https://www.merge.dev/workforce)

## About Merge

Merge is the connectivity layer for AI. It brings MCP access, model routing, and business data to your people and products. Merge helps IT expand AI across the workforce and product teams ship faster.

## About Parallel Web Systems

Parallel develops web infrastructure for AI agents. Our tools offer agents fresh, deep, and efficient context from the web from billions of pages and data providers, delivering the high-quality information agents need to perform real-world knowledge work. [Get started with Parallel](https://platform.parallel.ai/).

# How Nooks cut web search costs 70.5% by switching to Parallel

Nooks is the AI sales workspace that go-to-market teams use to research accounts, run live calls, and sequence outreach. Parallel grounds its agents in current information about every prospect and account.

## Key highlights

- Nooks cut web grounding spend by 70.5% after moving from built-in LLM web search to Parallel's Search API, with better accuracy on time-sensitive facts.
- Nooks agents pull facts licensed sales data misses: current leadership, compliance posture, and security certifications.
- The agent decides when a question needs the live web and queries Parallel inline, so reps never leave their workflow.

## About Nooks

Nooks is the Agent Workspace for intelligent outbound, where AI agents and reps work together end-to-end. Instead of juggling prospecting, sequencing, enrichment, and calling across tools, agents surface the right prospects, draft signal-driven outreach, and keep sequences fresh, all in one workflow.

## Reliable account data, without the cost curve

Building a product has gotten cheaper and faster. Selling one hasn't. Most companies building AI for sales are solving the easy problem: making reps faster. Nooks is after the harder one: AI that develops judgment— how a company prioritizes accounts, navigates buying committees, and handles objections. The bet is that reps can sell as fast as their companies ship without losing the judgment that comes from years of live deals. For that to work, Nooks' agents have to walk into every call already knowing the account.

Nooks ran that research on OpenAI's built-in web search at first. Cost climbed with volume, and accuracy on fresh facts didn't hold up.

> "A rep opens with the CEO's name, and the email is dead if that name is six months old. The question was who could search the web accurately at our volume without the bill getting away from us."
>
> —  Etienne Denis, ML Engineer, Nooks, Nooks

## Switching from OpenAI to Parallel Search

Parallel's Search API is the web data layer that Nooks's agents call whenever they need the live web. When the account assistant or the email agent hits a question that internal data can't answer, it queries Parallel and gets dense, source-backed results inline. Reps stay in the workflow.

Two patterns carry most of the value. **Freshest-fact retrieval**: current leadership, recent news, anything that shifts between data-provider refreshes. **Gap-filling**: compliance posture, certifications, regulatory standing, facts that no sales database holds. Parallel pulls both into the assistant and the email agent alongside everything Nooks already knows about the account.

Before switching, Nooks compared OpenAI's web search against Parallel on the queries its agents run in production, then standardized on Parallel.

> "We evaluated multiple providers on questions our agents actually get asked. Parallel came back cheaper and was right more often on the stuff that changes. Our customers noticed before we told them anything had changed."

## The impact

Nooks cut web grounding spend by 70.5% by switching from OpenAI's built-in web search to Parallel, and accuracy on time-sensitive facts went up at the same time. The same budget now covers far more agent research.

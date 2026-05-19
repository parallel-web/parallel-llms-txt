Human Machine

# \# Parallel Monitor API: New processor tiers, snapshots and event streams, and Basis on every event

Tags: Product Release

Reading time: 7 min

Parallel Monitor API: New processor tiers, snapshots and event streams, and Basis on every event

We first launched the Parallel Monitor API [last November](https://parallel.ai/blog/monitor-api) [[last November] (/blog/monitor-api)](/ai/blog/monitor-api) . Since then, the reception has far exceeded our expectations and imagination. Users are monitoring everything from drug commercialization pipelines to new government RFPs. We’re honored that pioneering companies like Gumloop, Poke by The Interaction Company, Actively, Formation Bio, Rocket, and Garnett Station Partners are already building on top of our monitoring infrastructure.

From the start, we’ve believed that as agents become primary users of the web, more knowledge work will move into the background. [These agents are here and they are online](https://parallel.ai/blog/series-b) [[These agents are here and they are online] (/blog/series-b)](/ai/blog/series-b) . And now, they’re becoming increasingly proactive as the web shifts from pull to push. Instead of agents asking the web for information, the web is evolving to automatically push new updates as they happen.

Today marks a major step in that direction. The Monitor API is now generally available, with significant upgrades, bringing us closer to a web that continuously pushes changes to power proactive agents.

This GA release introduces two processor tiers (Lite and Base), two run types (snapshot and event stream), Basis on every event, advanced controls like source policy and geo settings, and seamless chaining with our APIs via [Interactions](https://parallel.ai/blog/task-api-interactions) [[Interactions] (/blog/task-api-interactions)](/ai/blog/task-api-interactions) .

Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features

![](https://cdn.sanity.io/images/5hzduz3y/production/bec5ad0f75b3436d796d5112beaaecd070349d61-1200x676.gif)

## \## **\*\* The web should push to your agent, not wait to be pulled from \*\***

Proactive agents depend on fresh information. But until now, getting that meant constantly pulling from the web. Developers had to rerun the same queries on a schedule, stitch together results over time, and build their own logic to detect what actually changed.

Monitor changes the model. Define a query once, and Monitor continuously watches for updates, surfacing only what’s new and relevant as it happens. No cron jobs. No manual triggers. No custom deduplication pipelines.

Your agent doesn’t check the web on a loop, it reacts when something changes.

Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features

![](https://cdn.sanity.io/images/5hzduz3y/production/b1b3a2608be947a72fe9f4dff67529c64701e1d4-5396x3240.jpg)

## \## **\*\* Two processor tiers to match the precision and recall your monitor query needs \*\***

Monitoring needs vary in scope. Some queries are tightly defined, tracking a single company, person, or signal. Others are broader, spanning many entities, topics, or regions.

With two Monitor processors, you can choose the right level of depth for the job:

* \- **\*\* Lite \*\*** is optimized for more focused queries. It delivers Task API Core–level quality at roughly a tenth of the cost, ideal for tracking specific entities or well-bounded signals.
* \- **\*\* Base \*\*** is designed for broader, more complex queries. It applies deeper reasoning across a larger search space, maintaining higher recall, and delivering Task API Pro–level quality at roughly a tenth of the cost.

Both tiers maintain high precision. As your queries expand in scope, Base helps ensure you don’t miss what matters.

Together, these processor tiers make it viable to monitor at scale across hundreds of thousands of entities or signals.

## \## **\*\* Snapshots track state changes; event streams surface new events \*\***

Processors govern how Monitor evaluates the web. Run types govern what comes back. Monitoring workflows generally fall into one of two shapes:

* \- **\*\* A feed of events \*\*** : a new VP hire, a new RFP, a new clinical trial result. The unit of work is the event itself.
* \- **\*\* A current view of state \*\*** : **\*\* \*\*** is this person still in this role, what's the current vendor list, what are the active clinical trials for this drug. The unit of work is the diff against the last snapshot, with an alert when any field changes.

Tracking state diffs used to require significant plumbing: run a Task on a cron, store the result, diff against the prior run, and route changed fields downstream. Or fragment one Task into a dozen disconnected monitors, one per field. Snapshot collapses that into a single primitive.

To support both shapes, Monitor offers two run types:

* \- **\*\* type=event\_stream \*\*** returns a discrete event each time new matching information appears, with structured fields (event\_date, event\_description, event\_url,basis). The right shape for news watchers and signal feeds.
* \- **\*\* type=snapshot \*\*** accepts a Task Run ID, re-runs it on the configured cadence, and returns all output fields when any have changed. One monitor covers every field of the underlying Task.

Both monitor types semantically dedupe events to minimize noise.

Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features

![](https://cdn.sanity.io/images/5hzduz3y/production/3520677269ef2ccb7fdad9beb32db645c18dcb8b-5396x3240.jpg)

## \## **\*\* Chain monitor events into deeper research, with Basis on every event \*\***

The most capable Monitor workflows don't end at notification; they chain into [deeper research](https://docs.parallel.ai/task-api/examples/task-deep-research) [[deeper research] (https://docs.parallel.ai/task-api/examples/task-deep-research)](https://docs.parallel.ai/task-api/examples/task-deep-research) . A procurement signal triggers a vendor analysis. A role change kicks off a rediscovery task. A new entity in the universe gets enriched. Two things have historically made following up with deeper research hard.

The first is context-passing. Without it, every chained step starts cold: the downstream agent receives the event description but loses everything upstream. Why the signal matters, which entity hierarchy it sits in, which investigation thread it's part of. Teams end up rebuilding context manually inside each call's prompt, which is expensive and lossy. To make this easier, every Monitor event now carries an interaction\_id. Pass it to the Task API and the follow-up run inherits the originating event's full context, with provenance preserved through every link in the chain.

The second is confidence. A false positive at the trigger doesn't just waste compute, it cascades into hours of human review or a bad downstream action. We've designed Monitor to be very precise, but to ensure verification, every event ships with full Basis: citations, excerpts, reasoning, and calibrated confidence scores. The same verification framework that powers the Task API, applied to the web's push layer.

Together, [Interactions](https://docs.parallel.ai/task-api/guides/interactions) [[Interactions] (https://docs.parallel.ai/task-api/guides/interactions)](https://docs.parallel.ai/task-api/guides/interactions) and [Basis](https://docs.parallel.ai/monitor-api/monitor-events) [[Basis] (https://docs.parallel.ai/monitor-api/monitor-events)](https://docs.parallel.ai/monitor-api/monitor-events) make Monitor → Task chaining a first-class production pattern.

## \## **\*\* Advanced settings: source policy and location controls \*\***

Two retrieval controls round out the API. [**\*\* Source policy \*\***](https://docs.parallel.ai/resources/source-policy) [[ **\*\* Source policy \*\*** ] (https://docs.parallel.ai/resources/source-policy)](https://docs.parallel.ai/resources/source-policy) restricts or prioritizes specific domains, eliminating false positives from low-authority sources where signal validity depends on origin (SEC filings, government procurement portals, specific trade publications). [**\*\* Location parameters \*\***](https://docs.parallel.ai/api-reference/search/search) [[ **\*\* Location parameters \*\*** ] (https://docs.parallel.ai/api-reference/search/search)](https://docs.parallel.ai/api-reference/search/search) scope retrieval to specific regions, surfacing the long tail of regional sources.

## \## **\*\* What you can build with Monitor \*\***

Monitor enables a new class of proactive workflows, where agents react to the world as it changes.

Teams are already using it to power:

* \- **\*\* Sales and GTM agents: \*\*** Watch target accounts for buying signals like new VP level hires, international office openings, strategic GTM initiatives, AI productivity investments, or job postings tied to internal AI adoption. These signals can immediately trigger enrichment, account research, or outreach.
* \- **\*\* Market intelligence agents: \*\*** Track personalized news across industries, companies, competitors, and regions, from healthcare in Hungary to construction in India. These agents continuously research and synthesize what new developments mean for a given market, competitive landscape, or strategy.
* \- **\*\* Life sciences agents: \*\*** Monitor clinical trial updates, regulatory changes, and drug pipeline signals. When something changes, chain into deeper analysis to understand the impact on commercialization timelines and competitive positioning.
* \- **\*\* Investment and private markets agents: \*\*** Track fund commitments, allocations, new investments, and M&A activity. Each new signal can kick off research into firms, deals, and broader market dynamics.
* \- **\*\* Compliance and regulatory agents: \*\*** Monitor authoritative sources for changes in payroll, tax, wage, reporting, cross-border employment, and enforcement rules. Then extract structured summaries and interpret what those changes mean for compliance workflows.

Across these use cases, the pattern is the same: define what matters once, the web pushes changes to you, and your agent follows up with the best next step whether its deeper research or taking an action.

Illustration demonstrating deep research API concepts, web search capabilities, or AI agent integration features

![](https://cdn.sanity.io/images/5hzduz3y/production/fceb41de45afad4d4899f9c37fd31b7481e5ce5f-1798x1080.gif)

## \## **\*\* Get started \*\***

Monitor is generally available today. Lite and Base processors, snapshot and event-stream run types, Basis, source policy, location parameters, and Interactions chaining are all live.

Get started in our [Developer Platform](https://platform.parallel.ai/play/monitor) [[ Developer Platform] (https://platform.parallel.ai/play/monitor)](https://platform.parallel.ai/play/monitor) or dive into the [documentation](https://docs.parallel.ai/monitor-api/monitor-quickstart) [[ documentation] (https://docs.parallel.ai/monitor-api/monitor-quickstart)](https://docs.parallel.ai/monitor-api/monitor-quickstart) .

Parallel avatar

By Parallel

May 6, 2026
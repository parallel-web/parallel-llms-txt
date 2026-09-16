Monitor API

# Automated web monitoring for news, products, research, filings, events, corporate development

Create always-on web searches that notify you when new results become available

[Try Monitor](https://platform.parallel.ai/play/monitor)[Contact us](https://contact.parallel.ai/)

## If it can be searched, it can be monitored

The Parallel Monitor API is like a web search that’s always on. Define a query that kicks off an ongoing stream of updates every time new related information appears on the web.

The Parallel Monitor API is like a web search that’s always on. Define a query that kicks off an ongoing stream of updates every time new related information appears on the web.

# Natural language in, structured events out

Describe what you want to track. Set a schedule. Receive webhooks with structured event data and source URLs, ready for your agents and workflows.

[Try Monitor](https://platform.parallel.ai/play/monitor)[View docs](https://docs.parallel.ai/monitor-api/monitor-quickstart#monitor-api-quickstart)

## Patterns for proactive systems

### 1\. Ambient sub-agents

Invoke an agent when something changes on the web. A market intelligence agent watches for competitor blog posts. When one appears, it pulls content, runs searches for context, and delivers a synthesized report to Slack without anyone asking.

Competitive analysisNews summarizationResearch alertsContent aggregation

### 2\. Workflow triggers

Use web events as the starting signal for automation. A sales team monitors for funding announcements in their ICP, each match triggers enrichment, scores the lead, and pushes qualified prospects to the CRM.

Lead generationDeal sourcingOpportunity alertsAccount monitoring

### 3\. Continuous intelligence feeds

Maintain always-current data streams for your application. A research team can create monitors for each component of their thesis supporting evidence, contradicting signals, and material changes flow into a unified feed.

Investment researchRegulatory trackingMarket surveillanceMedia monitoring

## FAQ

+−What's the difference between Monitor and Search API? 

Search API returns results for a query at a single point in time. Monitor API runs that query on a schedule and notifies you only when new, relevant information appears. Use Search for on-demand lookups; use Monitor for ongoing tracking.

+−How does the API detect "new" information? 

The Monitor API tracks what's been surfaced in previous runs and filters duplicates automatically. You receive each relevant event once, even if the underlying content remains indexed across multiple runs.

+−What cadence should I choose? 

Match the cadence to your domain. Hourly for fast-moving signals like news or social. Daily for product launches, funding announcements, or regulatory updates. Weekly for slower-moving changes like market reports or policy shifts.

+−Can I monitor specific websites or domains?

Yes. Include domain constraints in your natural language query (e.g., "New blog posts from competitor.com" or "SEC filings mentioning \[company\]"). The API respects these scoping instructions.

+−Can I update a monitor after creating it? 

Yes. Update the cadence, webhook URL, or metadata at any time. You can also pause or delete monitors to stop future runs.

+−What's included in each event notification? 

Each event includes: a summary of what was detected, the event date, source URLs, and an event group ID for retrieving related events. All data arrives as structured JSON.

+−How does Monitor compose with other Parallel APIs? 

Chain Monitor events into downstream API calls. When an event triggers, use Extract API to pull full page content, Search API to gather additional context, or Task API to run structured enrichment—all programmatically.

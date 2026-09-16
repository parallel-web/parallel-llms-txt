# Introducing Parallel Monitor

Today, we released the **[Parallel Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart)**, the newest addition to our **[Web Agents API](https://docs.parallel.ai/task-api/task-quickstart)** suite.

**Parallel Monitor **can be thought of as a web search that’s always on: you define a query that kicks off an ongoing stream of updates every time new related information appears on the web.

It’s available now to try for free in the Parallel [Developer Platform](https://platform.parallel.ai/play/monitor).

![An example of the Monitor API in the Parallel developer platform](https://cdn.sanity.io/images/5hzduz3y/production/2f7d820de18102db9e9d5e7127dd418121b208ad-1610x1060.jpg)

## The web is built on retrieval

For over 30 years, the web has operated on a _pull_ model. At the protocol level, every interaction begins with a request to retrieve information. An HTTP GET request is sent to a server, which responds with the current state of a resource, and each time you want an update, you must send a new request. This pattern exists everywhere:



- Browsers: You navigate to a URL, and a server sends back HTML
- Search engines: You input a query, and a server responds with results
- APIs: Your application makes a request, and a server sends back information



Most of Parallel's APIs follow this pattern. When an agent needs information, it calls the [**Parallel Search**](https://parallel.ai/products/search) or [**Task API**](https://docs.parallel.ai/task-api/task-quickstart)** **with a query and some parameters. 

The trigger is always upstream— a human asking a question, a workflow step executing, or a cron job firing. The agent is fundamentally reactive. It waits to be asked, then pulls what it needs.

## From pull to push

The **Parallel Monitor API** flips the model from _pull_ to _push_. Instead of triggering a request with a query, you can now create queries that themselves trigger notifications when new information is published to the web. 

You can think of this like a webhook for the entire web.

![Traditional info retrieval vs. Monitor API](https://cdn.sanity.io/images/5hzduz3y/production/f3c715d83a9aaf7143990cea1782c60572bb0235-2316x2000.jpg)

Instead of asking for the latest state from the web, with **Monitor**, agents can now passively watch for state changes as they appear. 

## Monitor tasks in practice

There are three key usage patterns for using **Monitor **tasks in production:



- **As a proactive sub-agent**

Create a proactive agent that is invoked when a change on the web is detected. For example, a market intelligence agent that tracks competitor launches and feature releases. When a competitor publishes a blog post, the agent reads the information, performs additional searches with the Parallel **Search API**, and sends an open-ended report to a human reviewer in Slack.



- **As a workflow trigger**

Create workflows that trigger when new information is surfaced. For example, a sales team monitors for multiple qualifying signals that could identify a potential buyer. Each match gets enriched via the Parallel **Task API** and added to their CRM automatically.



- **As a continuous intelligence feed**

Create always-up-to-date data feeds. For example, a hedge fund creates monitors for each component of its investment thesis. When supporting or contradicting evidence appears, it triggers deeper research agents or alerts the analyst.

## Get started

Create a new monitor in just a few lines of code:

```python
import requests 

url = "https://api.parallel.ai/v1/monitors"

payload = {
   "type": "event_stream",
   "frequency": "1d",
   "processor": "lite",
   "settings": {
     "query": "Extract recent news about AI"
   }
}
headers = {
   "x-api-key": "<api-key>",
   "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

Get started for free in our [developer playground](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/monitor-api/monitor-quickstart).

## About Parallel Web Systems

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took weeks into agentic tasks that now take just minutes.

Fortune 100 companies in insurance, finance, and retail, as well as AI-first businesses like Clay, Starbridge, and Sourcegraph, use Parallel’s APIs to give their agents access to the best data from the web.

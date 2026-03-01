> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Slack Integration

> Set up Monitor in Slack to receive real-time web updates directly in your channels

The Parallel Slack app brings [Monitor](/monitor-api/monitor-quickstart) directly into your Slack workspace. Create monitors with slash commands and receive updates in dedicated threads.

## Installation

1. Go to [platform.parallel.ai](https://platform.parallel.ai) and navigate to the Integrations section
2. Click **Add to Slack** to begin the OAuth flow
3. Authorize the Parallel app in your workspace
4. Invite the bot to any channel where you want to use monitoring: `/invite @Parallel`

<Note>
  Your Parallel API key is securely linked during the OAuth flow. All monitors created via Slack use your account's quota and billing.
</Note>

## Commands

### /monitor

Create a **daily** monitor:

```
/monitor latest AI research papers
```

The bot posts your query and replies in a thread when changes are detected.

### /hourly

Create an **hourly** monitor for fast-moving topics:

```
/hourly breaking news about OpenAI
```

### /help

View available commands:

```
/help
```

### Cancel a Monitor

Reply to the monitoring thread with:

```
cancelmonitor
```

The bot will cancel the monitor and confirm in the thread.

## Pricing

Monitors created via Slack use the same pricing as the Monitor API. See [Pricing](/resources/pricing) for details.

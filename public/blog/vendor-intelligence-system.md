# Building a vendor intelligence system with Parallel

As more software is built and delivered through third-party vendors, having the right mix of vendors becomes increasingly important to mitigate security, compliance, and operational risks. That’s why large enterprises have invested in vendor intelligence programs to detect changes in a vendor’s risk profile early enough to reduce exposure, seek remediation, or start searching for alternatives. Historically, these programs have involved hiring a team of humans researching these vendors online across different risk areas, such as security incidents, regulatory actions, or financial stability.

With AI, a company of any size can monitor vendor risk, just like an enterprise. Using AI agents, they can build a system to monitor the web for changes in a vendor’s risk profile. But relying on this system requires getting trustworthy, actionable intelligence, which isn’t straightforward. For one, judging risk is nuanced; there’s a big difference between a company under regulatory scrutiny and one where regulators are threatening legal action. Additionally, the web often contains outdated, inaccurate, and incomplete information. If an agent uses simple keyword matching to identify relevant signals, it can produce a lot of noise because it doesn’t consider the credibility or context of the underlying event. To build a reliable system, you need a reasoning layer that helps agents distinguish signal from noise.

At Parallel Web Systems, we’ve built agents with these reasoning capabilities. Using Parallel [Task](https://docs.parallel.ai/task-api/task-quickstart) and [Monitors](https://parallel.ai/blog/monitor-api), you can build a vendor intelligence system that surfaces relevant signals and conducts in-depth research across multiple sources. In this cookbook, we’ll walk you through a sample implementation with these capabilities.

## What the vendor intelligence system does

Our vendor intelligence system takes a list of vendors (via a JSON file) and creates a [Task](https://docs.parallel.ai/task-api/task-quickstart) to produce a comprehensive, structured baseline report for each vendor across six predefined risk dimensions (which can be configured):

- Financial health: Any signs of financial instability, including funding, solvency, and layoff challenges.
- Legal and regulatory: Material litigation, sanctions, regulatory restrictions, or compliance failures.
- Operational resilience: Service outages, supply chain disruptions, or any other business continuity concerns.
- Leadership governance: Any executive or ownership changes, as well as governance failures or leadership instability.
- ESG and reputation: Environmental, ethical, labor, or reputational issues.
- Cybersecurity: Security incidents, privacy failures, or exploited vulnerabilities.

After the report is created, the system creates a [snapshot Monitor](https://parallel.ai/blog/monitor-api) to watch it for any changes (e.g., a new security incident or increased signs of financial distress). When the Monitor detects a change, the system rebuilds the report with this new information and passes it to the risk assessment layer, which uses a deterministic risk policy to assign a risk level to the change. If the risk level meets the configured review threshold, the system launches a follow-up Task to conduct follow-up research and return evidence for human review.

Here’s a flow diagram that explains how this system works:

![](https://cdn.sanity.io/images/5hzduz3y/production/816308d67e1c5f369d24ae8a3de4bf84ac84a89e-1672x941.png)

Note that the whole system is set up to run locally to minimize infrastructure setup, but it could be extended to integrate with your infrastructure and workflows.

## How we built the vendor intelligence system.

There are four main components of the system: baseline research, snapshot monitoring, risk assessment, and follow-up research. Let’s take a closer look at each.

Note: This cookbook relies on a simple TypeScript CLI hosted [here](https://github.com/parallel-web/parallel-cookbook/tree/main/typescript-recipes/parallel-vendor-intelligence). We’ll share code samples throughout this cookbook, but if you want the full implementation, clone the repository and follow the README.

### Baseline research

Baseline research runs as a simple Task to research the vendor’s risk profile against the six risk dimensions described above. It also returns any adverse events, which are discrete events supported by current public evidence, such as a breach or lawsuit. These events are tracked separately from the six risk dimensions, but their severity is still taken into account in the deterministic risk assessment (which we’ll discuss later).

To get started, you first need to put together a list of vendors in a configuration JSON file, like the one below:

```typescript
[
  {
    "name": "Cloudflare",
    "domain": "cloudflare.com",
    "riskFloor": "MEDIUM"
  }
]
```

Each vendor is a JSON object with three fields:

- `name`: Name of the vendor, so we know who they are (required)
- `domain`: Vendor’s primary website domain, used to correctly identify the company during research (required)
- `riskFloor`: The minimum risk level assigned to the vendor, regardless of the system’s findings; helpful for distinguishing vendors that are especially critical to operations (optional).

Once the vendor list is set, you can kick off research with the bootstrap CLI command:

```typescript
npm run --silent bootstrap | jq
```

Once executed, the command reads your vendor file and, for each vendor, creates a Parallel Task whose output is pinned to the `VendorReportSchema`. Note that you can configure which [processor](https://docs.parallel.ai/task-api/guides/choose-a-processor) the Task should use based on your computational and latency requirements. Here’s an abridged output of the command:

```typescript
{
  "vendors": 1,
  "baselinesCreated": 1,
  "monitorsCreated": 1,
  "results": [
    {
      "vendor": { "name": "Cloudflare", "domain": "cloudflare.com" },
      "baseline": { "action": "created", "runId": "trun_..." },
      "monitor": {
        "action": "created",
        "monitorId": "monitor_...",
        "frequency": "1d",
        "processor": "lite"
      },
      "assessment": {
        "risk": {
          "level": "MEDIUM",
          "requiresHumanReview": true,
          "guidance": "analyst_review"
        }
      }
    }
  ]
}

```

### Snapshot monitoring

Once the baseline report is created, Parallel instantiates a snapshot Monitor to watch for any changes to the report. Rather than monitoring a set of keyword queries, the Monitor watches the entire baseline report for changes over time. This allows you to detect relevant changes across all six predefined risk dimensions at once without having to write and run separate queries for each possible risk signal.

You can configure how often the Monitor checks for updates via the `MONITOR_FREQUENCY` field, which ranges from 1 hour to 30 days. This allows you to use your monitoring capacity efficiently.

If the Monitor identifies a new event, you can use the check-updates command to pull down the list of changed events from Parallel’s servers, identify which risk field(s) have changed, and print them out in your CLI. For instance, here’s a sample output if there are no changes:

```typescript
{
"monitorsChecked": 1,
"newEvents": 0,
"followUpDecisions": 0,
"followUpTasksCreated": 0,
"followUpsCompleted": 0,
"humanReviewsRequired": 0,
"changes": [],
"warnings": [],
"errors": []
}

```

In this case, the system checked one of the monitors and reported no changes. But in the case of the output below:

```typescript
{
  "changes": [
    {
      "vendor": { "name": "Cloudflare", "domain": "cloudflare.com" },
      "event": {
        "monitorId": "monitor_...",
        "eventId": "mevt_...",
        "eventDate": "2026-07-14",
        "changedFields": ["cybersecurity"]
      },...
  ],
  "warnings": [],
  "errors": []
} 

```

The system has detected a credible, high-risk event in the cybersecurity category and needs to determine its risk, which is handled by the risk assessment layer.

### Risk assessment

We use a deterministic risk policy to produce two outputs: a risk level for the change itself and the suggested next step. Parallel supplies the evidence (e.g., a severity for each risk dimension and a list of adverse events), but the code, not the model, decides both the level and the recommended action.

The first step is to determine the risk level. In our version, the system determines the final risk level by taking the highest severity across the report’s six dimensions, adverse events, and the vendor’s configured `riskFloor` (if set). Here’s a simplified version of our code:

```typescript
// Levels are ordered so every decision is a "take the max" over evidence.
const RISK_ORDER = { LOW: 0, MEDIUM: 1, HIGH: 2, CRITICAL: 3 } as const;
type RiskLevel = keyof typeof RISK_ORDER;

const maxRisk = (levels: RiskLevel[]): RiskLevel =>
  levels.reduce((hi, l) => (RISK_ORDER[l] > RISK_ORDER[hi] ? l : hi), "LOW");

function assess(report: VendorReport, riskFloor?: RiskLevel) {
  // ── Step 1: determine the risk level ────────────────────────────
  const dimensionLevels = RISK_DIMENSIONS.map((d) => report[d.key].severity);
  const adverseLevels =report.adverse_events.map((e) => e.severity);

  const evidenceLevel = maxRisk([...dimensionLevels, ...adverseLevels]);

  // The optional per-vendor riskFloor acts as a lower bound.
  const level = maxRisk([evidenceLevel, riskFloor ?? "LOW"]);
```

For instance, let’s say a vendor baseline report has six dimensions with low risk, but the vendor’s `riskFloor` is medium; the overall risk level would still be medium. On the other hand, if the baseline report has six dimensions with critical risk but the riskFloor is medium, the overall risk level would be critical.

Next, we map this risk level to a recommended action. This is primarily done through a `const` that maps levels to an action. The only exception is if there are any adverse events. Even if it’s low in severity, we suggest a human review as the next step. Here’s a snippet of the simplified version of this code:

```typescript
  // ── Step 2: map the level to a recommended action ───────────────
  const adverseDetected = report.adverse_events.length > 0;
  const requiresHumanReview = RISK_ORDER[level] >= RISK_ORDER.MEDIUM || adverseDetected;

// Level → recommended action.
const GUIDANCE = {
  LOW: "continue_monitoring",
  MEDIUM: "analyst_review",
  HIGH: "urgent_human_review",
  CRITICAL: "immediate_human_escalation",
} as const;

  // A LOW level with an adverse event is bumped up to analyst_review.
  const guidance =
    adverseDetected && level === "LOW" ? "analyst_review" : GUIDANCE[level];

  return { level, evidenceLevel, requiresHumanReview, guidance };
}

Example — one CRITICAL dimension drives the whole assessment, and the floor c

assess({
  cybersecurity:          { severity: "CRITICAL", /* … */ },
  financial_health:       { severity: "LOW", /* … */ },
  legal_regulatory:       { severity: "LOW", /* … */ },
  operational_resilience: { severity: "LOW", /* … */ },
  leadership_governance:  { severity: "LOW", /* … */ },
  esg_reputation:         { severity: "LOW", /* … */ },
  adverse_events: [],
});
// → { level: "CRITICAL", evidenceLevel: "CRITICAL",
//     requiresHumanReview: true, guidance: "immediate_human_escalation" }

```

Note that in this recipe, we’re using simple heuristics to determine the risk assessment, but it can be easily configured to suit your needs and workflows by changing risk-policy.ts in the cookbook. 

### Follow-up research

Based on the change's risk level, the system makes a final decision on whether to create a Task to investigate it further. It makes this decision using an environment variable called `FOLLOW_UP_RISK_THRESHOLD`, which defines the minimum risk level that triggers a follow-up investigation Task. This allows you to make your follow-ups more efficient, as you don’t need to run expensive research Tasks for minor updates.

For instance, if the threshold is `HIGH`, a follow-up Task would only run if the changed risk dimension or adverse event is rated `HIGH` or `CRITICAL`, or if the vendor has a `riskFloor` set to `HIGH` or `CRITICAL`.

Each follow-up investigation contains the following components:

- What’s changed: A summary of the event
- Confirmed facts: The facts of the event, based on credible sources
- Business impact: Potential business impact of the event, based on the confirmed facts.
- Open questions: What we still don’t know yet
- Supporting citations: The list of sources used in the research.

Given the depth of analysis required, all follow-up research Tasks are set using the pro processor, which offers greater computational capacity (though with a latency of 2-10 minutes per Task).

Here’s an example of the output for the decision to run follow-up research and the report itself:

```typescript
{
  "decision": {
    "runFollowUp": true,
    "threshold": "HIGH",
    "previousLevel": "MEDIUM",
    "currentLevel": "HIGH"
  },
  "followUp": {
    "status": "completed",
    "runId": "trun_...",
    "investigation": {
      "what_changed": "A newly reported security incident changed the assessment.",
      "confirmed_facts": ["The incident was confirmed in public reporting."],
      "business_impact": "Review exposure and contingency plans.",
      "open_questions": ["Does the incident affect shared data?"]
    }
  }
} 

```

## Try it yourself

With Parallel’s Task and Monitors, businesses of any size can access the monitoring and research firepower to build their own custom vendor intelligence system.

If you’re ready to give it a shot, feel free to clone the [repository](https://github.com/parallel-web/parallel-cookbook) and refer to the README for more detailed instructions on customizing the setup. And if you do end up creating something, we’d love to hear from you. Share what you’ve built by [contacting us](https://contact.parallel.ai/?_gl=1*1luw6p4*_gcl_aw*R0NMLjE3ODM2MjE0NDQuQ2owS0NRandqYjNTQmhEZ0FSSXNBTUtpV3pnaVhWYjZ4UmpWMllFU0xRSmIzMmdCLXJRcE9CMnIyazYxMmY0U1hmWjZTa1VMNlBjUEtoQWFBdUhtRUFMd193Y0I.*_gcl_au*MTE2NzA3OTYxMy4xNzgyODU4NDU5).

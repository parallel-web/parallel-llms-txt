# Introducing the Scale plan for Parallel

Today we're launching Scale, a self-serve plan that gives teams, taking agents into production, higher rate limits, Zero Data Retention (ZDR) without an enterprise contract. 

Teams told us they needed production limits and ZDR before they were ready to commit to an enterprise agreement. Scale sits between Build (pay-as-you-go) and Enterprise to fill that gap.

## What's included

Here's how Scale compares with Build:

|  | Build | Scale |
| --- | --- | --- |
| Price | Pay as you go | $1,000/month for $1,000 in credits<br>or<br>$10,000/year for $12,000 in credits |
| Search and Extract | 600 requests/min | 1,500 requests/min* |
| Decisions | 600 requests/min | 600 requests/min |
| Task | 2,000 requests/min | 2,000 requests/min |
| Zero Data Retention | Not included | ZDR, with a signed agreement |
| SOC 2 Type II | Yes | Yes |

*Turbo Search requests are excluded from the higher Scale limit.

## Zero Data Retention

ZDR is one of the most common reasons teams upgrade to an enterprise plan. With the new Scale plan, teams simply sign the agreement in Platform to enable Hybrid ZDR:

- Synchronous APIs, such as Search and Extract, keep no request content.
- Asynchronous APIs, such as Task, keep request content for up to 8 days.

While ZDR is on, live calls to data partners that don't offer ZDR terms aren't available. [See our docs](https://docs.parallel.ai/resources/data-connectors#zero-data-retention-zdr) for which data connectors work with ZDR. Teams that need Strict ZDR (where asynchronous APIs like Task keep request content for up to 60 seconds, not 8 days) or a custom retention period can get it with an Enterprise plan.

## Your subscription becomes credits

The $1,000 a month isn't a platform fee. It's added to your organization as $1,000 in credits, which you can spend on any Parallel API at standard rates. Monthly credits cover that month and don't roll over.

Once you've used a month's credits, you can pay for additional usage by topping up your balance with the card on file. You can top up manually, or turn on automatic top-ups that reload your balance when it drops below a specified threshold.

Scale is monthly by default, and you can cancel anytime. Plan benefits are kept for any months in which you’ve been charged.

## Pay annually, get two months free

Teams that would rather commit for the year can pay $10,000 upfront and get $12,000 in credits to use over the year, representing a 17% discount compared to the monthly subscription. Annual credits apply to the full year.

## Scale or Enterprise

Scale is for teams that want higher limits and ZDR without an enterprise contract. Enterprise adds SSO (SAML), custom rate limits and data retention, a custom MSA and DPA, a HIPAA BAA, invoicing or marketplace billing, an uptime SLA, a forward-deployed engineer, and a dedicated Slack channel. Teams can start on Scale and move to Enterprise as their needs grow.

To learn more about Enterprise, [contact our team](https://contact.parallel.ai/).

## Get started with Scale

In Parallel Platform, [open Billing](https://platform.parallel.ai/settings?tab=billing), choose Change plan, and select Scale. Complete payment to add your credits, then sign the ZDR agreement to turn on ZDR. You can compare every plan on the [pricing page](https://parallel.ai/pricing).

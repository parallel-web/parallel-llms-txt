# Point-in-time search

Point-in-time search returns web results as a search index stood at a chosen moment in the past, so nothing captured later can appear. This entry covers how it differs from a publication-date filter, its key characteristics, and where it's used, from backtesting forecasts to building evals.

Point-in-time search is a web search that answers from the index as it existed at a chosen past moment, leaving out every page, and every version of a page, captured after that moment.

**Date-filtered search vs. point-in-time search**

```text
Cutoff t0 (e.g. 2025-06-01)
──────────────────────────────┼─────────────────────────────▶ time
                              │
PUBLICATION-DATE FILTER       │
  "published <= t0" ──▶ LIVE page (leaks post-t0 edits/links)
                              │
POINT-IN-TIME SEARCH          │
  "captured <= t0"  ──▶ ARCHIVED version as of t0
  (pages & edits after t0 are invisible to the query)
```

## What is point-in-time search?

A normal search answers from the index as it stands today. A point-in-time search adds a cutoff, often called the query time or as-of time, and treats anything the index acquired after that cutoff as if it doesn't exist. The results approximate what an agent could have found on that date. Teams use it to backtest forecasting and trading research, replay past agent runs, and build evals that a model can't pass by reading later reporting.

It's stricter than a publication-date filter. A date filter keeps pages by the publish date they claim but reads the current version of each one, so an old article that was edited after the event, or a sidebar linking to newer stories, can still leak the answer. A [2026 ACL paper](https://aclanthology.org/2026.acl-short.65) found that date-filtered results on two major search engines revealed the answer outright for 41% and 55% of forecasting questions, and that a model given the leaky pages looked far more accurate than it was (Brier score 0.10 against 0.24).

## Key characteristics

- Bounded by capture time: the cutoff applies to when the index stored a page, not only to its stated publish date.
- Versioned content: the index keeps earlier copies of each page and serves the newest one from at or before the cutoff, so later edits stay hidden.
- No lower bound: it isn't a recency filter. Pair it with a publication-date range to ask what was recent at that time.
- Limited by capture history: a page the index hadn't stored by the cutoff can't come back, and how far back a search can go depends on how long old versions are kept and how often pages were recrawled.

## Example

A team wants to know whether its research agent could have predicted the outcome of a shareholder vote held on March 12. They set the cutoff to 09:00 UTC on March 11. Pages reporting the result are excluded, and so are later edits to older pages that mention it, so the agent's forecast is scored on what it could have seen.

## Related terms

- [Web index](https://parallel.ai/learn/web-index): the stored copy of the web that a search API answers from.
- [Web crawler](https://parallel.ai/learn/web-crawler): the system that captures pages and decides how often to revisit them.
- [AI search API](https://parallel.ai/learn/web-search-api): the search layer an agent calls for web data.
- [How to benchmark web search APIs](https://parallel.ai/articles/how-to-benchmark-web-search-apis): building evals for search, including keeping answers out of reach.

## FAQ

**How is point-in-time search different from a date filter?**

A date filter keeps pages by their stated publish date but reads the current version of each one. Point-in-time search excludes everything captured after the cutoff, including later edits to old pages.

**What is look-ahead bias?**

Look-ahead bias is when a backtest or evaluation uses information that wasn't available at the time being simulated. It makes a strategy or model look better than it would have performed.

[**Start Building**](https://docs.parallel.ai/home)

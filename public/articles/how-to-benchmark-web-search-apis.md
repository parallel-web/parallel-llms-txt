# How to benchmark web search APIs on your own queries

Vendor benchmark tables, ours included, tell you how a fixed test scored on a fixed day. This guide is the full method for settling the question on your own traffic: a query set with correctness criteria, a fixed harness, an LLM judge you spot-check, and scoring with error bars. It takes about a day, most of it unattended.

Every vendor in this category publishes benchmark numbers, and we're one of them. A benchmark table tells you how a fixed set of tools scored on a fixed dataset during one testing window, on a harness the vendor chose. It cannot tell you how any of those tools will perform on your workload. The only test that settles which [web search API](https://parallel.ai/articles/what-is-a-web-search-api) belongs in your stack runs your real production queries through each candidate and measures whether your agent finished the job.

This guide is that test, written out end to end: the query set, the harness, the judge, and the scoring, including the statistics that tell you when a gap is real. It takes about a day, most of it unattended. We make the [Parallel Search API](https://parallel.ai/products/search), we run evals of our own, and we want you to choose us, so treat our tables the way you'd treat any vendor's: as a starting point, not a verdict.

## Why your own queries beat any leaderboard

A public benchmark measures average performance on general questions, and your workload isn't general questions. It's your domains, your query patterns, your freshness needs, and your definition of a correct answer. A tool that wins on the aggregate can lose on the slice you actually run, and the reverse happens too.

Rankings also move with the task. When we tested the same engines on different datasets in the same week, the order shifted. An engine that leads a multi-hop browsing suite can trail on single-hop lookups, so a leaderboard built on someone else's task mix tells you little about yours.

And most accuracy claims in this category are vendor-run, ours included. The closest thing to a neutral referee arrived in August 2026, when Artificial Analysis published its Search Index: an independent benchmark of 15 search API products on a fixed agent harness, on which Parallel Search ranks first. Use it as your external baseline. But the numbers that should decide your choice are still the ones you generate yourself, on your own workload.

## What you need before you start

An API key for every candidate, most of which have free tiers that cover an evaluation. A model to run the agent loop and a model to judge, which can be the same one. A repository for the harness, because you'll rerun this next quarter and diff the results. And a budget: most of the spend is LLM tokens for the agent loop and the judge rather than the search calls themselves, so the model you pick sets the price of the eval more than the search providers do, and free tiers pull the search side toward zero.

## Step 1: Build the query set

Pull queries from your production logs, not from your imagination. Synthetic prompts flatter every vendor equally and tell you nothing. For a single-hop workload, 50 to 100 queries give a quick, credible read. For a fuller bake-off, 200 to 500 reflect your true traffic mix. For deep research, 30 to 50 questions weighted toward the hard multi-hop cases that break systems will separate the field faster than a thousand easy lookups.

For every query, write one line describing what a correct outcome looks like. This is the piece most teams skip, and it's the piece that makes grading possible. If you can't state what correct means for a query, the query can't score, and it belongs in a demo, not an eval. Keep the whole set in one JSONL file:

```json
{"id": "q001", "query": "Which version of the EU AI Act's GPAI obligations applied as of August 2025?", "correct_looks_like": "Cites the Aug 2, 2025 application date for GPAI obligations"}
{"id": "q002", "query": "What did <competitor> ship in their last three changelog entries?", "correct_looks_like": "Names the three most recent entries with dates"}
{"id": "q003", "query": "Find the CFO of <portfolio company> and their start date", "correct_looks_like": "Correct current CFO with start month and year"}
```

Two practical notes. First, answers on the live web change, so record the date you built the set and expect to refresh time-sensitive entries when you rerun. Second, hold out any query you used while building or tuning your agent. If the agent's prompt was written while staring at a query, that query is training data, not eval data.

## Step 2: Run every candidate through the same loop

The harness is a loop, and the discipline is holding everything constant except the search tool. Same model, same system prompt, same temperature, same tool-call budget, same result count. In our own evals the agent gets up to 20 tool calls per question; whatever budget you pick, give every provider the same one.

```py
import json, time

MAX_TOOL_CALLS = 20  # same budget for every provider

def run_one(provider, item, agent):
    """One query through one provider. Returns a result row."""
    t0 = time.monotonic()
    search_latencies = []

    def tool(objective: str):
        s = time.monotonic()
        results = provider.search(objective)   # the only line that varies
        search_latencies.append(time.monotonic() - s)
        return results

    answer, usage = agent.run(
        query=item["query"],
        search_tool=tool,
        max_tool_calls=MAX_TOOL_CALLS,
    )
    return {
        "provider": provider.name,
        "id": item["id"],
        "answer": answer,
        "wall_secs": time.monotonic() - t0,
        "search_calls": len(search_latencies),
        "search_latencies": search_latencies,
        "tokens_in": usage.input_tokens,
        "tokens_out": usage.output_tokens,
    }

queries = [json.loads(l) for l in open("queries.jsonl")]
with open("results.jsonl", "a") as out:
    for provider in PROVIDERS:
        for item in queries:
            row = run_one(provider, item, agent)
            out.write(json.dumps(row) + "\n")
```

Each provider gets an adapter that maps its API onto the same `search(objective)` interface. Run each one with its default configuration on the first pass: per-vendor tuning hides the out-of-the-box behavior your team will live with, and you can tune the winner later. Here's what an adapter looks like for our API; the shape is similar for the others:

```py
import os
from parallel import Parallel  # pip install parallel-web

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

class ParallelProvider:
    name = "parallel"

    def search(self, objective: str):
        search = client.search(
            objective=objective,
            mode="turbo",  # or omit for the default "advanced"; record which
        )
        return [
            {"url": r.url, "title": r.title, "excerpts": r.excerpts}
            for r in search.results
        ]
```

Record everything the scoring step needs while you're in the loop: the final answer, wall-clock time, per-search-call latency, tool-call count, and token usage. Latency measured this way is client-side and includes your network path, which is what your users will experience; note the region you ran from, because it matters when you compare against anyone else's numbers.

## Step 3: Judge end-task success

Grade whether the agent completed the job, not whether a relevant URL appeared somewhere in the results. Retrieval scores help you debug a failure, and they don't decide the choice.

Use an LLM judge with a strict prompt, one grade per query per provider:

```text
You are grading whether an AI agent completed a research task.

Question: {query}
What a correct outcome looks like: {correct_looks_like}
The agent's answer: {answer}

Grade CORRECT only if the answer fully satisfies the correctness criterion.
Partial answers, hedged answers, and answers that are right about some
entities but wrong about others are all INCORRECT. Do not reward confident
tone. Reply with one line of JSON:
{"grade": "CORRECT" | "INCORRECT", "reason": "<one sentence>"}
```

Grade with no partial credit. A response that identifies four of five entities correctly still failed the task, and partial credit hides exactly the errors that break downstream workflows. Then spot-check: hand-grade 20 random judgments yourself. If you disagree with the judge more than once or twice, fix the judge prompt and regrade everything before you trust any totals.

## Step 4: Score it, including the error bars

Three numbers per provider: accuracy, p50 search latency, and cost per successful task. That last one is total spend divided by the number of tasks that succeeded, and it's the unit that matters, because a cheap request that fails and forces three more calls costs more than one accurate call.

```py
import json, math
from collections import defaultdict
from statistics import median

rows = [json.loads(l) for l in open("results.jsonl")]
grades = {(g["provider"], g["id"]): g["grade"] == "CORRECT"
          for g in map(json.loads, open("grades.jsonl"))}

by_provider = defaultdict(list)
for r in rows:
    r["correct"] = grades[(r["provider"], r["id"])]
    by_provider[r["provider"]].append(r)

for name, rs in by_provider.items():
    n = len(rs)
    p = sum(r["correct"] for r in rs) / n
    ci95 = 1.96 * math.sqrt(p * (1 - p) / n)      # binomial 95% CI
    lat = median(l for r in rs for l in r["search_latencies"])
    spend = sum(cost(r) for r in rs)               # your token + tool pricing
    per_success = spend / max(1, sum(r["correct"] for r in rs))
    print(f"{name}: {p:.0%} +/- {ci95:.0%} | p50 search {lat*1000:.0f}ms "
          f"| ${per_success:.2f} per successful task")
```

The confidence interval is the part most vendor tables omit, ours included. At 100 queries, a measured 50% accuracy carries a 95% interval of about plus or minus 10 points. Two providers three points apart at that sample size are tied, whatever the headline order says. When you need to separate two close candidates, don't reach for more decimal places; reach for a paired comparison on the same queries, which is far more sensitive at the same sample size:

```py
# Paired comparison: more sensitive than comparing two headline accuracies.
# Count queries where exactly one provider succeeded.
a_only = sum(1 for q in ids if ok["A", q] and not ok["B", q])
b_only = sum(1 for q in ids if ok["B", q] and not ok["A", q])
# If a_only and b_only are within a few counts of each other, it's a tie
# on this query set, whatever the headline percentages say.
print(f"A wins {a_only} queries B loses; B wins {b_only} queries A loses")
```

Two more honesty rules. Run-to-run variance is real, so rerun a surprising result before you believe it. And decide before you start whether you report first-run numbers or best-of-N, then apply the same rule to every provider. In our own published benchmarks we ran multiple sessions and reported the best observed score per provider, applied uniformly; whichever convention you pick, write it down next to the results.

## Step 5: Read the results, then keep them honest

Pick on accuracy for your hard slice first, then cost and latency per successful task, then operational fit: rate limits, concurrency, compliance requirements like SOC 2 and data retention. A tie on accuracy at different latencies isn't a tie, and neither is one at different costs per successful task.

Then treat the harness as a product. Keep it in version control with the query set and the results. Rerun quarterly, and after any provider ships a major model or index change, and compare against your previous run before reacting to a vendor announcement. Every benchmark ages, including yours, and including the ones on our site.

## Scaffolding that speeds this up

You don't need to build the harness from nothing. Our cookbook shows how to [build a search agent](https://parallel.ai/blog/cookbook-search-agent) end to end, and our notes on [structuring search objectives](https://parallel.ai/articles/openclaw-best-practices-web-search) help you get comparable results across tools. If you wire the search step through the [Parallel Search MCP server](https://parallel.ai/blog/search-mcp-server), swapping engines takes minutes instead of a rewrite. For deep research evaluations, [run tasks concurrently in batches](https://parallel.ai/blog/task-group-api) rather than one at a time. Our published [benchmark results](https://parallel.ai/benchmarks) document the datasets and harness we use, if you want a reference point for your own.

## Questions that come up

### Should I test the free tier or the paid path?

Evaluate on the path you'll ship. Free tiers are throttled below paid tiers, so check the mode, rate limits, and concurrency you'll actually run in production, and confirm whether requirements like SOC 2 and zero data retention are included or an enterprise upsell.

### How many queries do I need?

Enough that the gap you care about clears the error bars. As a rule of thumb, 100 queries resolve gaps of about 15 points or more; separating a 5-point gap takes several hundred, or a paired comparison on the set you have. If your candidates are that close, the practical answer is usually that either will do, and cost and latency should decide.

### Can I use one model as both agent and judge?

Yes, and it's common. The judge isn't being asked to know the answer, it's being asked to compare the agent's answer against the correctness criterion you wrote. The spot-check exists to catch the cases where that trust is misplaced.

### How often should I re-evaluate?

Quarterly is a reasonable cadence, plus a rerun whenever a provider announces a major model or index change. A tool that lost by a point last quarter may lead this one.

## Run it against us

Parallel's free tier covers up to 5,000 free monthly searches with no credit card required, enough for a full evaluation on your own traffic. Get started with the [Search API quickstart](https://docs.parallel.ai/search/search-quickstart).

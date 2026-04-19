Human Machine

# \# Introducing stateful web research agents with multi-turn conversations

The Parallel Task API now supports the ability to chain together context between sequential API calls.

Tags: Product Release

Reading time: 3 min

[Try it in platform](https://platform.parallel.ai/play/interactions) [View docs](https://docs.parallel.ai/task-api/guides/interactions)

Stateful web research conversations are now available with [Task API](https://parallel.ai/products/task) [[Task API] (/products/task)](/ai/products/task) interaction IDs, enabling multi-turn, iterative web research across sequential tasks that retain full context and history.

Previously, every Task API call was an independent and contained query. Complex web research questions would return precise, structured responses with full [Basis verification](https://docs.parallel.ai/task-api/guides/access-research-basis) [[Basis verification] (https://docs.parallel.ai/task-api/guides/access-research-basis)](https://docs.parallel.ai/task-api/guides/access-research-basis) , but had no concept of persistent sessions. Now, previous Task API runs can be referenced in subsequent calls, enabling more sophisticated and stateful chains of reasoning on deep web research tasks.

## \## The power of persistent context

Consider a competitive intelligence workflow. For your first task query, you ask: “Map the competitive landscape of autonomous vehicle companies”. The Task API returns well-researched outputs with citations and confidence scores.

#### An example initial query with the interactions showcase in the Parallel developer platform

![](https://cdn.sanity.io/images/5hzduz3y/production/49eddc803ac8c9d0d8af187486f883e50a9cbc89-3094x1700.png)

Next, you’ll follow up: “ _\_ Do a side-by-side comparison of the top two competitors on their technology, product strategy, main suppliers, and major risks.” \__

Previously, you'd have needed to input all prior context into the next request yourself, essentially copy-pasting it by re-specifying the relevant inputs and outputs from the last task. With multi-turn, the Task API retains the full research context for a more conversational form-factor.

#### An example follow-up where the first Task API run is used as context to fulfill the sequential query

![](https://cdn.sanity.io/images/5hzduz3y/production/2c3f7a764bd6353c9b2c3a4835d97648ab6d2d73-3118x1718.png)

With Task API Interactions, your follow-up query can now resolve against everything the system already knows from the prior task, producing deeper, more targeted results without the extra work.

_\_ "This new feature makes the Task API both more efficient and capable than before. Agents that use the Task API can now better manage context on deep, long-running queries with multiple threads. We're excited to see how our customers and developer community come up with more difficult tasks for their agents to take on with Parallel." \__

_\_ — Utkarsh Srivastava, Head of Engineering \__

## \## Enabling more stateful sub-agents

Statefulness transforms the Task API from an independent tool into a stateful web research sub-agent for your broader agentic system.

Your orchestration agent can delegate an entire research thread to the Task API, asking initial questions, evaluating results, requesting clarification or deeper investigation, and branching into new directions. All within a single persistent context. The Task API handles feedback loops, follow-up queries, and multi-step investigations while your agent focuses on decision-making and workflow logic.

#### Claude Code using the Parallel CLI and Deep Research Skills together with Task API Interactions

![](https://cdn.sanity.io/images/5hzduz3y/production/045c55e81a77937feebfddd37e8048b2d84dfff5-1688x1080.gif)

## \## How stateful interactions work

Every task now returns an **\*\* _\_ interaction\_id \__ \*\*** . Pass this ID into your next task request, and the new task inherits the full tree of context and history from all prior tasks in that thread.

#### An example Task API session with sequential Chat API and Task API calls

![The image depicts three rounds of API requests chained together to persist important context with each step.](https://cdn.sanity.io/images/5hzduz3y/production/7ad1217d6e9a35ae086974fd3e0910cea86273fc-5400x3240.jpg)

Each task in a thread builds on the full research tree, not just the immediately prior task, but the entire accumulated context. And because you can switch processors between turns, you can allocate compute precisely where it matters: run your initial research on Ultra8x for maximum depth, then follow up on core-fast for fast, targeted refinement. This is especially powerful for human-in-the-loop workflows where a researcher kicks off deep foundational research, reviews the results, and iterates quickly from there.

## \## How to use stateful interactions in practice

\### Using the Parallel Python SDK to make multi-turn Task API calls

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

import  os
 from  parallel  import  Parallel
 from  parallel.types  import  TaskSpecParam, TextSchemaParam

client = Parallel(api_key=os.environ[ "PARALLEL_API_KEY" ])

 # Turn 1: Initial question 
run1 = client.task_run.create(
     input = "Which country won the most Winter Olympics gold medals in 2026?" ,
    processor= "lite" ,
    task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
)
result1 = client.task_run.result(run1.run_id, api_timeout= 3600 )
 print ( f"Turn 1:  {result1.output.content} " )

 # Turn 2: Follow-up — "they" refers to the country from Turn 1 
run2 = client.task_run.create(
     input = "How many medals did they win?" ,
    processor= "lite" ,
    previous_interaction_id=run1.interaction_id,
    task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
)
result2 = client.task_run.result(run2.run_id, api_timeout= 3600 )
 print ( f"Turn 2:  {result2.output.content} " ) ```  import os from parallel import Parallel from parallel.types import TaskSpecParam, TextSchemaParam   client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])   # Turn 1: Initial question run1 = client.task_run.create( input="Which country won the most Winter Olympics gold medals in 2026?", processor="lite", task_spec=TaskSpecParam(output_schema=TextSchemaParam()), ) result1 = client.task_run.result(run1.run_id, api_timeout=3600) print(f"Turn 1: {result1.output.content}")   # Turn 2: Follow-up — "they" refers to the country from Turn 1 run2 = client.task_run.create( input="How many medals did they win?", processor="lite", previous_interaction_id=run1.interaction_id, task_spec=TaskSpecParam(output_schema=TextSchemaParam()), ) result2 = client.task_run.result(run2.run_id, api_timeout=3600) print(f"Turn 2: {result2.output.content}") ```
```

## \## Start building stateful web research agents with Parallel Task API Interactions

Try it now under the **\*\* Interactions \*\*** showcase in Parallel’s [developer platform](https://platform.parallel.ai/play/interactions) [[developer platform] (https://platform.parallel.ai/play/interactions)](https://platform.parallel.ai/play/interactions) .

Learn more in Parallel’s Task API [Interactions documentation](https://docs.parallel.ai/task-api/guides/interactions) [[Interactions documentation] (https://docs.parallel.ai/task-api/guides/interactions)](https://docs.parallel.ai/task-api/guides/interactions) .

By Parallel

March 19, 2026
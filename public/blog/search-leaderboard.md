# Introducing the Search Capability Leaderboard

Today, we’re launching the [Search Capability Leaderboard](http://parallel.ai/leaderboard) to help developers choose a language model for applications that use web search. At launch, we’re evaluating 24 popular open- and closed-source models from leading labs, comparing answer accuracy, cost, and cost efficiency.

At Parallel, we're constantly evaluating how model intelligence interacts with search to build and tune our APIs. While our proprietary and public evals suites are substantially more comprehensive than what we’re sharing today, we hope this release encourages developers to further explore the interaction between model intelligence and web search. For more on that, read [How to evaluate web search for AI](https://parallel.ai/blog/how-to-eval-web-search).

## Comparing models with and without search

![](https://cdn.sanity.io/images/5hzduz3y/production/7926f8f50f644a516d00532e45a1aa5d6da311d6-2450x1204.png)

Using search well requires models to coordinate several distinct tasks: formulate effective queries, recognize when more evidence is needed, drill down into the right URLs, and synthesize the results into a correct answer. By holding search constant, we can compare how different models handle those decisions and the tradeoffs developers face when choosing between them.



In our experience, model labs don’t consistently include dedicated web-search evaluations in model reports, while search provider comparisons focus on showcasing the capabilities of different search products. Developers choosing a model for search-heavy applications need to understand how accuracy and cost vary across models.

## What we measure

We focus on two measures to help developers compare models paired with search. The **Search Intelligence Score** looks at model accuracy across three existing public benchmark suites. The **Search Efficiency ranking** orders models by cost among those that meet or exceed the median accuracy score. Developers can use the accompanying data to compare models against their own accuracy requirements and budget.

## What our initial results show

![](https://cdn.sanity.io/images/5hzduz3y/production/9e7b07a79742108d06ea71a6df4de6893a5417b5-2450x1380.png)

Today’s snapshot surfaces a few insights that developers may find interesting and actionable. Most results track the general capability rankings reported elsewhere, but a few show models gaining outsized benefit from search.  Some takeaways:

- **DeepSeek V4.1 Flash** gains 45 points with search, the most of any model; it ranks third for intelligence (65.3) and second for efficiency at $44.8 per 1,000 tasks.
- **GPT-6 (Astra)** has the highest Search Intelligence Score, 70.3, at $301 per 1,000 tasks.
- **GPT-5.6 Luna **leads on Search Efficiency, scoring 55.0 at $23.0 per 1,000 tasks, or 13x lower than Astra's cost.

Whether higher accuracy justifies the additional cost depends on the application. These results make the tradeoff visible, helping developers decide which models deserve a closer look.

## Where we go from here

We hope the leaderboard is a helpful tool that will help developers in selecting models for their applications. We plan to extend the coverage and methodology based on what developers find useful, and welcome feedback on the models, tasks, and comparisons that would help you make better decisions.

[Visit the leaderboard](https://parallel.ai/leaderboard)

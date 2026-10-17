# Search Capability Leaderboard

Updated October 16, 2026

What's the best model for agentic search?

Large language models rely on web search to find information that isn't available in the model weights, but not all models benefit equally. We use standard and proprietary benchmarks to evaluate how well top models orchestrate searches and synthesize results into correct answers. See the Methodology section below.

Insights

* Average lift from search across all models: +33.7 points
* [Claude Opus 5.5](/leaderboard/claude-opus-5-5) (Gold, Search Intelligence): Highest Search Intelligence Score (75.4). Great for tasks that require complex reasoning and maximum accuracy.
* [MiMo v2.6 Pro](/leaderboard/mimo-v2-6-pro) (Gold, Search Efficiency): Most cost-efficient model ($76.5 per 1K tasks). Great for most queries, at 12× lower cost than the top model.
* [Grok 4.7 Medium](/leaderboard/grok-4-7): Largest lift from search (+44.8). Most improved when paired with search.

## Search Intelligence Leaderboard

| Rank | Model                                                            | Score with Search | Score without Search | Lift  | Cost per 1K tasks | Time per task |
| ---- | ---------------------------------------------------------------- | ----------------- | -------------------- | ----- | ----------------- | ------------- |
| 1    | [Claude Opus 5.5](/leaderboard/claude-opus-5-5)                  | 75.4              | 44.2                 | +31.2 | $949              | 512s          |
| 2    | [Claude Sonnet 5.5](/leaderboard/claude-sonnet-5-5)              | 74.1              | 33.2                 | +40.9 | $796              | 500s          |
| 3    | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)                | 73.4              | 46.8                 | +26.5 | $1,762            | 416s          |
| 4    | [Pareto 26.9](/leaderboard/pareto-26-9)                          | 72.5              | 39.7                 | +32.8 | $184              | 211s          |
| 5    | [Gemini 4 Argon](/leaderboard/gemini-4-argon)                    | 72.2              | 34.9                 | +37.2 | $270              | 206s          |
| 6    | [Muse Wonder 1.0](/leaderboard/muse-wonder-1-0)                  | 71.3              | 35.3                 | +36.0 | $709              | 287s          |
| 7    | [GPT-6 Astra](/leaderboard/gpt-6-astra)                          | 70.8              | 43.0                 | +27.9 | $401              | 83.7s         |
| 8    | [GPT-6.1 Sol](/leaderboard/gpt-6-1-sol)                          | 70.4              | 39.8                 | +30.6 | $130              | 353s          |
| 9    | [Claude Opus 5](/leaderboard/claude-opus-5)                      | 70.0              | 37.2                 | +32.8 | $1,012            | 342s          |
| 10   | [Pareto 26.10](/leaderboard/pareto-26-10)                        | 68.6              | 34.8                 | +33.8 | $116              | 436s          |
| 11   | [Ember-1](/leaderboard/ember-1)                                  | 67.9              | 29.9                 | +38.0 | $335              | 487s          |
| 12   | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)                          | 67.7              | 41.4                 | +26.3 | $269              | 107s          |
| 13   | [Muse Spark Open](/leaderboard/muse-spark-open)                  | 67.2              | 35.5                 | +31.8 | $171              | 360s          |
| 14   | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)                | 66.8              | 39.4                 | +27.4 | $130              | 229s          |
| 15   | [GPT-6 Sol](/leaderboard/gpt-6-sol)                              | 66.6              | 37.9                 | +28.7 | $183              | 260s          |
| 16   | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)                  | 66.6              | 22.8                 | +43.8 | $688              | 846s          |
| 17   | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)                    | 66.1              | 30.3                 | +35.8 | $142              | 274s          |
| 18   | [Grok 4.7 Medium](/leaderboard/grok-4-7)                         | 66.0              | 21.1                 | +44.8 | $252              | 521s          |
| 19   | [Gemini 3.8 Flash](/leaderboard/gemini-3-8-flash)                | 65.1              | 39.0                 | +26.1 | $177              | 317s          |
| 20   | [Hy4 Preview](/leaderboard/hy4-preview)                          | 64.6              | 30.6                 | +33.9 | $93.2             | 722s          |
| 21   | [Mistral Large 4.0](/leaderboard/mistral-large-4-0)              | 64.4              | 21.4                 | +43.0 | $136              | —             |
| 22   | [MiMo v2.6 Pro](/leaderboard/mimo-v2-6-pro)                      | 64.4              | 29.7                 | +34.7 | $76.5             | —             |
| 23   | [Kimi K3](/leaderboard/kimi-k3)                                  | 64.2              | 30.6                 | +33.6 | $266              | 432s          |
| 24   | [Claude Haiku 5.5](/leaderboard/claude-haiku-5-5)                | 62.9              | 23.5                 | +39.4 | $24.3             | 162s          |
| 25   | [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash)          | 62.7              | 27.0                 | +35.7 | $35.8             | 549s          |
| 26   | [GLM 5.3](/leaderboard/glm-5-3)                                  | 62.7              | 21.9                 | +40.8 | $78.5             | 308s          |
| 27   | [GPT-6 Luna](/leaderboard/gpt-6-luna)                            | 61.9              | 28.0                 | +33.9 | $33.1             | 391s          |
| 28   | [Step 5 Preview](/leaderboard/step-5-preview)                    | 61.1              | 27.8                 | +33.3 | $118              | 387s          |
| 29   | [MiMo v2.6 Flash](/leaderboard/mimo-v2-6-flash)                  | 60.9              | 22.4                 | +38.5 | $25.2             | 1323s         |
| 30   | [GLM 5.3 Flash](/leaderboard/glm-5-3-flash)                      | 60.8              | 20.4                 | +40.4 | $16.6             | 99.1s         |
| 31   | [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna)                        | 60.7              | 26.9                 | +33.9 | $36.2             | 98.0s         |
| 32   | [DeepSeek V4 Flash (0731)](/leaderboard/deepseek-v4-flash-0731)  | 59.2              | 24.0                 | +35.2 | $13.6             | 292s          |
| 33   | [Nemotron 3.5 Super VL](/leaderboard/nemotron-3-5-super-vl)      | 59.1              | 17.0                 | +42.2 | $93.9             | 181s          |
| 34   | [Gemini 3 Flash](/leaderboard/gemini-3-flash-preview)            | 58.6              | 34.1                 | +24.5 | $114              | 276s          |
| 35   | [DeepSeek V4 Pro](/leaderboard/deepseek-v4-pro)                  | 58.4              | 30.5                 | +27.9 | $110              | 383s          |
| 36   | [Hunyuan 3](/leaderboard/hy3)                                    | 58.2              | 22.6                 | +35.6 | $28.4             | 363s          |
| 37   | [GLM-5.2](/leaderboard/glm-5-2)                                  | 54.3              | 18.4                 | +35.9 | $66.6             | 301s          |
| 38   | [DeepSeek V4 Pro (0813)](/leaderboard/deepseek-v4-pro-0813)      | 53.5              | 33.1                 | +20.4 | $234              | 394s          |
| 39   | [DeepSeek V4 Flash](/leaderboard/deepseek-v4-flash)              | 53.1              | 19.5                 | +33.7 | $24.4             | 358s          |
| 40   | [Nemotron 3 Ultra 550B](/leaderboard/nemotron-3-ultra-550b-a55b) | 53.0              | 15.3                 | +37.7 | $113              | 328s          |
| 41   | [MiniMax M3](/leaderboard/minimax-m3)                            | 52.6              | 23.1                 | +29.5 | $41.1             | 291s          |
| 42   | [MiMo v2.5](/leaderboard/mimo-v2-5)                              | 49.5              | 13.4                 | +36.1 | $23.5             | 894s          |
| 43   | [Laguna S 2.1](/leaderboard/laguna-s-2-1)                        | 39.5              | 12.3                 | +27.2 | $21.4             | 459s          |
| 44   | [Nemotron 3.5 Lightning](/leaderboard/nemotron-3-5-lightning)    | 37.9              | 9.8                  | +28.0 | $12.1             | 176s          |
| 45   | [Command A Plus](/leaderboard/command-a-plus)                    | 34.8              | 5.0                  | +29.8 | $40.1             | 149s          |

## Search Efficiency Leaderboard

Most cost-efficient models scoring at or above the median Search Intelligence Score (64.2), cheapest first. Costs are per 1,000 tasks.

| Rank | Model                                               | Cost per 1K tasks | Score with Search |
| ---- | --------------------------------------------------- | ----------------- | ----------------- |
| 1    | [MiMo v2.6 Pro](/leaderboard/mimo-v2-6-pro)         | $76.5             | 64.4              |
| 2    | [Hy4 Preview](/leaderboard/hy4-preview)             | $93.2             | 64.6              |
| 3    | [Pareto 26.10](/leaderboard/pareto-26-10)           | $116              | 68.6              |
| 4    | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)   | $130              | 66.8              |
| 5    | [GPT-6.1 Sol](/leaderboard/gpt-6-1-sol)             | $130              | 70.4              |
| 6    | [Mistral Large 4.0](/leaderboard/mistral-large-4-0) | $136              | 64.4              |
| 7    | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)       | $142              | 66.1              |
| 8    | [Muse Spark Open](/leaderboard/muse-spark-open)     | $171              | 67.2              |
| 9    | [Gemini 3.8 Flash](/leaderboard/gemini-3-8-flash)   | $177              | 65.1              |
| 10   | [GPT-6 Sol](/leaderboard/gpt-6-sol)                 | $183              | 66.6              |
| 11   | [Pareto 26.9](/leaderboard/pareto-26-9)             | $184              | 72.5              |
| 12   | [Grok 4.7 Medium](/leaderboard/grok-4-7)            | $252              | 66.0              |
| 13   | [Kimi K3](/leaderboard/kimi-k3)                     | $266              | 64.2              |
| 14   | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)             | $269              | 67.7              |
| 15   | [Gemini 4 Argon](/leaderboard/gemini-4-argon)       | $270              | 72.2              |
| 16   | [Ember-1](/leaderboard/ember-1)                     | $335              | 67.9              |
| 17   | [GPT-6 Astra](/leaderboard/gpt-6-astra)             | $401              | 70.8              |
| 18   | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)     | $688              | 66.6              |
| 19   | [Muse Wonder 1.0](/leaderboard/muse-wonder-1-0)     | $709              | 71.3              |
| 20   | [Claude Sonnet 5.5](/leaderboard/claude-sonnet-5-5) | $796              | 74.1              |
| 21   | [Claude Opus 5.5](/leaderboard/claude-opus-5-5)     | $949              | 75.4              |
| 22   | [Claude Opus 5](/leaderboard/claude-opus-5)         | $1,012            | 70.0              |
| 23   | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)   | $1,762            | 73.4              |

## Methodology

Our goal here is to measure how effective models are at using search. For simplicity, we combine publicly accepted benchmark datasets with our own WISER benchmark into a composite score. This is not meant to reflect the comprehensive evaluations Parallel runs internally. We use the following evaluation datasets: [DeepSearchQA](https://www.kaggle.com/benchmarks/google/dsqa) (DSQA): Google's benchmark of multi-step research questions. [Humanity's Last Exam](https://lastexam.ai) (HLE): Expert-written questions that need web-grounded reasoning. [WISER](https://parallel.ai/blog/search-api-benchmark) (WISER): Parallel's own benchmark of real-world business research queries.

### Example questions

Shortened examples from public benchmark materials. The scored sample may differ.

* DSQA  
#### Research across sources  
Using Macrotrends for NVIDIA’s stock performance and Worldometer for U.S. GDP, identify years from 2020 through 2023 when annual stock gains exceeded 125% and GDP growth exceeded 2.5%.  
Find both data series, align the years, and return every year that meets both thresholds.  
[DeepSearchQA paper, Table 3](https://storage.googleapis.com/deepmind-media/DeepSearchQA/DeepSearchQA%5Fbenchmark%5Fpaper.pdf)
* HLE  
#### Specialist knowledge  
In hummingbirds, how many tendon pairs does the sesamoid bone within the m. depressor caudae insertion support?  
Interpret specialist anatomy terms and establish the precise count from relevant evidence.  
[Humanity’s Last Exam examples](https://lastexam.ai/)
* WISER  
#### Business research  
For Salesforce’s FY2024, calculate the share of subscription and support revenue from Tableau’s reporting segment. Compare it with Salesforce’s 2023 CRM market share.  
Identify the reporting segment, calculate its revenue share, and compare it with a separate market estimate.  
[Parallel’s WISER examples](https://parallel.ai/blog/search-api-benchmark)

Each model answers the same 100 questions per benchmark, with and without Parallel Search Fast mode and Extract. Tool budgets are fixed; code execution is disabled. Once the tool budget is exhausted, we request a final answer with tools disabled. Reasoning settings and token limits may vary by model to reflect provider recommendations, when provided.

DSQA answers are extracted without access to the reference answer, then graded. HLE and WISER use correct-or-incorrect grading.

Search Intelligence Score: DSQA F1, HLE accuracy, and WISER accuracy, weighted equally on a 0–100 scale. F1 allows partial credit for incomplete answers and penalizes incorrect items. Scores use all 100 questions per benchmark; failed and pending tasks count as zero. Lift: the difference between a model's score with search and without. Search Efficiency Leaderboard: models at or above the median score (64.2), ranked by cost per 1,000 tasks, cheapest first. Costs include inference and estimated Search and Extract usage, excluding grading. Cost records are incomplete and may omit recovery attempts. Time per task: average seconds from question to final answer across available records, with equal weight for each benchmark. Pareto frontier: no other model is both cheaper and higher scoring.

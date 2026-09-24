# Search Capability Leaderboard

Updated September 22, 2026

What's the best model for agentic search?

Large language models rely on web search to find information that isn't available in the model weights, but not all models benefit equally. We use standard and proprietary benchmarks to evaluate how well top models orchestrate searches and synthesize results into correct answers. See the Methodology section below.

Insights

* [Claude Opus 5.5](/leaderboard/claude-opus-5-5) (Gold, Search Intelligence): Highest Search Intelligence Score (75.5). Great for tasks that require complex reasoning and maximum accuracy.
* [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash) (Gold, Search Efficiency): Most cost-efficient model ($35.8 per 1K tasks). Great for most queries, at 46× lower cost than the top model.
* [GLM 5.3](/leaderboard/glm-5-3) (Bronze, Search Efficiency): Largest lift from search (+40.8). Most improved when paired with search.

## Search Intelligence Leaderboard

| Rank | Model                                                            | Score with Search | Score without Search | Lift  | Cost per 1K tasks | Time per task |
| ---- | ---------------------------------------------------------------- | ----------------- | -------------------- | ----- | ----------------- | ------------- |
| 1    | [Claude Opus 5.5](/leaderboard/claude-opus-5-5)                  | 75.5              | 42.7                 | +32.9 | $1,656            | 525s          |
| 2    | [Claude Opus 5](/leaderboard/claude-opus-5)                      | 71.2              | 40.4                 | +30.8 | $1,437            | 492s          |
| 3    | [GPT-6 Astra](/leaderboard/gpt-6-astra)                          | 70.8              | 43.0                 | +27.9 | $401              | 83.7s         |
| 4    | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)                | 69.3              | 44.6                 | +24.7 | $3,101            | 536s          |
| 5    | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)                          | 67.7              | 41.4                 | +26.3 | $269              | 107s          |
| 6    | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)                | 66.8              | 39.4                 | +27.4 | $130              | 229s          |
| 7    | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)                    | 66.1              | 30.3                 | +35.8 | $142              | 274s          |
| 8    | [Gemini 3.8 Flash](/leaderboard/gemini-3-8-flash)                | 65.1              | 39.0                 | +26.1 | $177              | 317s          |
| 9    | [Kimi K3](/leaderboard/kimi-k3)                                  | 64.2              | 30.6                 | +33.6 | $266              | 432s          |
| 10   | [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash)          | 62.7              | 27.0                 | +35.7 | $35.8             | 549s          |
| 11   | [GLM 5.3](/leaderboard/glm-5-3)                                  | 62.7              | 21.9                 | +40.8 | $78.5             | 308s          |
| 12   | [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna)                        | 60.7              | 26.9                 | +33.9 | $36.2             | 98.0s         |
| 13   | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)                  | 60.4              | 22.3                 | +38.1 | $1,000            | 775s          |
| 14   | [DeepSeek V4 Flash (0731)](/leaderboard/deepseek-v4-flash-0731)  | 59.2              | 24.0                 | +35.2 | $13.6             | 292s          |
| 15   | [Gemini 3 Flash](/leaderboard/gemini-3-flash-preview)            | 58.6              | 34.1                 | +24.5 | $114              | 276s          |
| 16   | [DeepSeek V4 Pro](/leaderboard/deepseek-v4-pro)                  | 58.4              | 30.5                 | +27.9 | $110              | 383s          |
| 17   | [Hunyuan 3](/leaderboard/hy3)                                    | 58.2              | 22.6                 | +35.6 | $28.4             | 363s          |
| 18   | [GLM-5.2](/leaderboard/glm-5-2)                                  | 54.3              | 18.4                 | +35.9 | $66.6             | 301s          |
| 19   | [DeepSeek V4 Pro (0813)](/leaderboard/deepseek-v4-pro-0813)      | 53.5              | 33.1                 | +20.4 | $234              | 394s          |
| 20   | [DeepSeek V4 Flash](/leaderboard/deepseek-v4-flash)              | 53.1              | 19.5                 | +33.7 | $24.4             | 358s          |
| 21   | [Nemotron 3 Ultra 550B](/leaderboard/nemotron-3-ultra-550b-a55b) | 53.0              | 15.3                 | +37.7 | $113              | 328s          |
| 22   | [MiniMax M3](/leaderboard/minimax-m3)                            | 52.6              | 23.1                 | +29.5 | $41.1             | 291s          |
| 23   | [MiMo v2.5](/leaderboard/mimo-v2-5)                              | 49.5              | 11.6                 | +37.9 | $23.5             | 894s          |
| 24   | [Laguna S 2.1](/leaderboard/laguna-s-2-1)                        | 39.5              | 12.3                 | +27.2 | $21.4             | 459s          |
| 25   | [Nemotron 3.5 Lightning](/leaderboard/nemotron-3-5-lightning)    | 37.9              | 9.8                  | +28.0 | $12.1             | 176s          |

## Search Efficiency Leaderboard

Most cost-efficient models scoring at or above the median Search Intelligence Score (60.4), cheapest first. Costs are per 1,000 tasks.

| Rank | Model                                                   | Cost per 1K tasks | Score with Search |
| ---- | ------------------------------------------------------- | ----------------- | ----------------- |
| 1    | [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash) | $35.8             | 62.7              |
| 2    | [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna)               | $36.2             | 60.7              |
| 3    | [GLM 5.3](/leaderboard/glm-5-3)                         | $78.5             | 62.7              |
| 4    | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)       | $130              | 66.8              |
| 5    | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)           | $142              | 66.1              |
| 6    | [Gemini 3.8 Flash](/leaderboard/gemini-3-8-flash)       | $177              | 65.1              |
| 7    | [Kimi K3](/leaderboard/kimi-k3)                         | $266              | 64.2              |
| 8    | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)                 | $269              | 67.7              |
| 9    | [GPT-6 Astra](/leaderboard/gpt-6-astra)                 | $401              | 70.8              |
| 10   | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)         | $1,000            | 60.4              |
| 11   | [Claude Opus 5](/leaderboard/claude-opus-5)             | $1,437            | 71.2              |
| 12   | [Claude Opus 5.5](/leaderboard/claude-opus-5-5)         | $1,656            | 75.5              |
| 13   | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)       | $3,101            | 69.3              |

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

Search Intelligence Score: DSQA F1, HLE accuracy, and WISER accuracy, weighted equally on a 0–100 scale. F1 allows partial credit for incomplete answers and penalizes incorrect items. Scores use all 100 questions per benchmark; failed and pending tasks count as zero. Lift: the difference between a model's score with search and without. Search Efficiency Leaderboard: models at or above the median score (60.4), ranked by cost per 1,000 tasks, cheapest first. Costs include inference and estimated Search and Extract usage, excluding grading. Cost records are incomplete and may omit recovery attempts. Time per task: average seconds from question to final answer across available records, with equal weight for each benchmark. Pareto frontier: no other model is both cheaper and higher scoring.

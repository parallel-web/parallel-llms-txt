# Search Capability Leaderboard

Updated September 14, 2026

What's the best model for agentic search?

Large language models rely on web search to find information that isn't available in the model weights, but not all models benefit equally. We use standard and proprietary benchmarks to evaluate how well top models orchestrate searches and synthesize results into correct answers. See the Methodology section below.

Insights

* [GPT-6 (Astra)](/leaderboard/gpt-6-astra) (Gold, Search Intelligence): Highest Search Intelligence Score (70.3). Great for tasks that require complex reasoning and maximum accuracy.
* [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna) (Gold, Search Efficiency): Most cost-efficient model ($23.0 per 1K tasks). Great for most queries, at 13× lower cost than the top model.
* [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash) (Silver, Search Efficiency) (Bronze, Search Intelligence): Largest lift from search (+45.0). Most improved when paired with search.

## Search Intelligence Leaderboard

| Rank | Model                                                            | Score with Search | Score without Search | Lift  | Cost per 1K tasks | Time per task |
| ---- | ---------------------------------------------------------------- | ----------------- | -------------------- | ----- | ----------------- | ------------- |
| 1    | [GPT-6 (Astra)](/leaderboard/gpt-6-astra)                        | 70.3              | 35.0                 | +35.3 | $301              | 34.7s         |
| 2    | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)                          | 66.7              | 31.3                 | +35.3 | $217              | 52.9s         |
| 3    | [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash)          | 65.3              | 20.3                 | +45.0 | $44.8             | 124s          |
| 4    | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)                    | 65.3              | 31.0                 | +34.3 | $98.2             | 66.2s         |
| 5    | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)                | 61.0              | 31.9                 | +29.1 | $455              | 81.5s         |
| 6    | [Claude Opus 5](/leaderboard/claude-opus-5)                      | 59.3              | 34.0                 | +25.3 | $235              | 74.5s         |
| 7    | [Kimi K3](/leaderboard/kimi-k3)                                  | 56.3              | 24.0                 | +32.3 | $209              | 198s          |
| 8    | [GLM 5.3](/leaderboard/glm-5-3)                                  | 55.3              | 20.0                 | +35.3 | $110              | 147s          |
| 9    | [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna)                        | 54.7              | 22.3                 | +32.3 | $23.0             | 59.4s         |
| 10   | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)                | 54.3              | 29.0                 | +25.3 | $61.1             | 79.7s         |
| 11   | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)                  | 53.7              | 20.3                 | +33.3 | $223              | 83.3s         |
| 12   | [GLM-5.2](/leaderboard/glm-5-2)                                  | 51.7              | 17.0                 | +34.7 | $122              | 118s          |
| 13   | [Gemini 3.8 Flash](/leaderboard/gemini-3-8-flash)                | 50.7              | 28.7                 | +22.0 | $166              | 123s          |
| 14   | [DeepSeek V4 Pro (0813)](/leaderboard/deepseek-v4-pro-0813)      | 50.3              | 23.3                 | +27.0 | $108              | 213s          |
| 15   | [DeepSeek V4 Flash](/leaderboard/deepseek-v4-flash)              | 50.0              | 15.0                 | +35.0 | $18.8             | 150s          |
| 16   | [DeepSeek V4 Pro](/leaderboard/deepseek-v4-pro)                  | 50.0              | 22.0                 | +28.0 | $102              | 205s          |
| 17   | [MiniMax M3](/leaderboard/minimax-m3)                            | 49.0              | 20.0                 | +29.0 | $39.9             | 156s          |
| 18   | [Hunyuan 3](/leaderboard/hy3)                                    | 49.0              | 14.3                 | +34.7 | $41.0             | 239s          |
| 19   | [Gemini 3 Flash](/leaderboard/gemini-3-flash-preview)            | 45.3              | 24.3                 | +21.0 | $199              | 116s          |
| 20   | [MiMo v2.5](/leaderboard/mimo-v2-5)                              | 45.0              | 12.7                 | +32.3 | $26.2             | 203s          |
| 21   | [DeepSeek V4 Flash (0731)](/leaderboard/deepseek-v4-flash-0731)  | 43.7              | 22.7                 | +21.0 | $9.45             | 88.0s         |
| 22   | [Nemotron 3 Ultra 550B](/leaderboard/nemotron-3-ultra-550b-a55b) | 42.7              | 16.3                 | +26.3 | $155              | 109s          |
| 23   | [Nemotron 3.5 Lightning](/leaderboard/nemotron-3-5-lightning)    | 35.0              | 6.0                  | +29.0 | $17.1             | 169s          |
| 24   | [Laguna S 2.1](/leaderboard/laguna-s-2-1)                        | 33.0              | 6.0                  | +27.0 | $28.3             | 364s          |

## Search Efficiency Leaderboard

Most cost-efficient models scoring at or above the median Search Intelligence Score (51.2), cheapest first. Costs are per 1,000 tasks.

| Rank | Model                                                   | Cost per 1K tasks | Score with Search |
| ---- | ------------------------------------------------------- | ----------------- | ----------------- |
| 1    | [GPT-5.6 Luna](/leaderboard/gpt-5-6-luna)               | $23.0             | 54.7              |
| 2    | [DeepSeek V4.1 Flash](/leaderboard/deepseek-v4-1-flash) | $44.8             | 65.3              |
| 3    | [Gemini 3.7 Flash](/leaderboard/gemini-3-7-flash)       | $61.1             | 54.3              |
| 4    | [Muse Spark 1.3](/leaderboard/muse-spark-1-3)           | $98.2             | 65.3              |
| 5    | [GLM 5.3](/leaderboard/glm-5-3)                         | $110              | 55.3              |
| 6    | [GLM-5.2](/leaderboard/glm-5-2)                         | $122              | 51.7              |
| 7    | [Kimi K3](/leaderboard/kimi-k3)                         | $209              | 56.3              |
| 8    | [GPT-5.6 Sol](/leaderboard/gpt-5-6-sol)                 | $217              | 66.7              |
| 9    | [Claude Sonnet 5](/leaderboard/claude-sonnet-5)         | $223              | 53.7              |
| 10   | [Claude Opus 5](/leaderboard/claude-opus-5)             | $235              | 59.3              |
| 11   | [GPT-6 (Astra)](/leaderboard/gpt-6-astra)               | $301              | 70.3              |
| 12   | [Claude Fable 5.1](/leaderboard/claude-fable-5-1)       | $455              | 61.0              |

## Methodology

Our goal here is to measure how effective models are at using search. For simplicity, we combine publicly accepted benchmark datasets with our own WISER benchmark into a composite score. This is not meant to reflect the comprehensive evaluations Parallel runs internally. We use the following evaluation datasets: [DeepSearchQA](https://www.kaggle.com/benchmarks/google/dsqa) (DSQA): Google's benchmark of multi-step research questions. [Humanity's Last Exam](https://lastexam.ai) (HLE): Expert-written questions that need web-grounded reasoning. [WISER](https://parallel.ai/blog/search-api-benchmark) (WISER): Parallel's own benchmark of real-world business research queries.

Every model is presented with the same question twice: once, it is asked to answer without relying on search; the second time, we give it access to Parallel Search Fast mode. The harness and other parameters are held constant.

Search Intelligence Score: accuracy on the three evals, averaged with equal weight, 0–100\. Lift: the difference between a model's score with search and without. Search Efficiency Leaderboard: models at or above the median score (51.2), ranked by cost per 1,000 tasks, cheapest first. Time per task: average seconds from question to answer. Pareto frontier: no other model is both cheaper and higher scoring.

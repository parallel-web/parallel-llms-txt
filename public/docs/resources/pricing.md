> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

## Summary

| API     | Price       | Use case                                   | Reasoning | Type         | Latency   |
| ------- | ----------- | ------------------------------------------ | --------- | ------------ | --------- |
| Search  | \$          | Page and excerpt retrieval                 | -         | Synchronous  | 1-3s      |
| Extract | \$          | Page content retrieval                     | -         | Synchronous  | 1-20s     |
| Chat    | \$          | Grounded chat completions                  | Low       | Synchronous  | 1-3s      |
| Task    | \$-\$\$\$\$ | Deep research, enrichment, custom research | Low-High  | Asynchronous | 10s - 2hr |
| FindAll | \$-\$\$\$\$ | List / database building                   | Low-High  | Asynchronous | 10s - 2hr |
| Monitor | \$          | Always-on web monitoring                   | Low       | Asynchronous | Ambient   |

## Web Tools

### Search API

By default, the Search API returns 10 page results and their excerpts per request.

| Component                                    | Cost (\$/1000) |
| -------------------------------------------- | -------------- |
| Per 1,000 requests (default 10 results)      | 5              |
| Per 1,000 additional page results & excerpts | 1              |

**Cost formula:**

$$
\text{total cost} = 0.005 + (0.001 \times \text{additional results \& excerpts})
$$

### Extract API

| Component      | Cost (\$/1000) |
| -------------- | -------------- |
| Per 1,000 URLs | 1              |

## Web Agents

### Chat API

Chat API pricing is based on the model you select.

| Model   | Type               | Cost (\$/1000) |
| ------- | ------------------ | -------------- |
| `speed` | Simple completions | 5              |
| `lite`  | Research           | 5              |
| `base`  | Research           | 10             |
| `core`  | Research           | 25             |

### Task API

Task API pricing is based on the [processor](/task-api/guides/choose-a-processor) you select. Cost is per 1,000 Task Runs. Fast processors have the same pricing as their standard counterparts.

<Tabs>
  <Tab title="Standard">
    | Processor | Cost (\$/1000) | Latency      | Strengths                                    |
    | --------- | -------------- | ------------ | -------------------------------------------- |
    | `lite`    | 5              | 10s - 60s    | Basic metadata, fallback, low latency        |
    | `base`    | 10             | 15s - 100s   | Reliable standard enrichments                |
    | `core`    | 25             | 60s - 5min   | Cross-referenced, moderately complex outputs |
    | `core2x`  | 50             | 60s - 10min  | High complexity cross referenced outputs     |
    | `pro`     | 100            | 2min - 10min | Exploratory web research                     |
    | `ultra`   | 300            | 5min - 25min | Advanced multi-source deep research          |
    | `ultra2x` | 600            | 5min - 50min | Difficult deep research                      |
    | `ultra4x` | 1200           | 5min - 90min | Very difficult deep research                 |
    | `ultra8x` | 2400           | 5min - 2hr   | The most difficult deep research             |
  </Tab>

  <Tab title="Fast">
    | Processor      | Cost (\$/1000) | Latency      | Strengths                                    |
    | -------------- | -------------- | ------------ | -------------------------------------------- |
    | `lite-fast`    | 5              | 10s - 20s    | Basic metadata, fallback, lowest latency     |
    | `base-fast`    | 10             | 15s - 50s    | Reliable standard enrichments                |
    | `core-fast`    | 25             | 15s - 100s   | Cross-referenced, moderately complex outputs |
    | `core2x-fast`  | 50             | 15s - 3min   | High complexity cross referenced outputs     |
    | `pro-fast`     | 100            | 30s - 5min   | Exploratory web research                     |
    | `ultra-fast`   | 300            | 1min - 10min | Advanced multi-source deep research          |
    | `ultra2x-fast` | 600            | 1min - 20min | Difficult deep research                      |
    | `ultra4x-fast` | 1200           | 1min - 40min | Very difficult deep research                 |
    | `ultra8x-fast` | 2400           | 1min - 1hr   | The most difficult deep research             |
  </Tab>
</Tabs>

<Note>
  Pricing is per Task Run (row), not per output field (cell). A single Task Run can populate many output fields—whether you request 1 field or 20 fields, the cost is the same.
</Note>

### FindAll API

FindAll API pricing is based on the [generator](/findall-api/core-concepts/findall-generator-pricing) you select, with a fixed cost plus a per-match cost.

| Generator | Fixed Cost | Per Match | Best For                                                  |
| --------- | ---------- | --------- | --------------------------------------------------------- |
| `preview` | \$0.10     | \$0.00    | Testing queries (\~10 candidates)                         |
| `base`    | \$0.25     | \$0.03    | Broad, common queries where you expect many matches       |
| `core`    | \$2.00     | \$0.15    | Specific queries with moderate expected matches           |
| `pro`     | \$10.00    | \$1.00    | Highly specific queries with rare or hard-to-find matches |

**Cost formula:**

$$
\text{total cost} = \text{fixed cost} + (\text{cost per match} \times \text{\# matches})
$$

If you add [enrichments](/findall-api/features/findall-enrich), each enrichment adds its own per-match cost based on the Task API processor you choose (see Task API pricing above).

### Monitor API

Monitor requests are priced on a per thousand (CPM) basis for each execution. Execution frequency is defined by the cadence of your monitors: hourly, daily, weekly.

| Component                      | Cost (\$/1000) |
| ------------------------------ | -------------- |
| Per 1,000 requests per cadence | 3              |

**Cost formula:**

$$
\text{total cost} = 0.003 \times \text{number of executions}
$$

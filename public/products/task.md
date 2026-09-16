Task API

# Automate structured web research, prospecting, analysis, exploration, retrieval

Transform manual workflows into programmable and repeatable operations powered by AI web search

[Create a task](https://platform.parallel.ai/play)[Contact us](https://contact.parallel.ai/)

## Save human hours

with structured web search tasks

## The Task API combines AI inference with state-of-the-art web search and live crawling

Turn complex knowledge work that previously took weeks into repeatable workflows that take just minutes

## Automate complex web research workflows

with specialized sub-agents

## Create specialized web research agents to enhance human workflows or extend agent capabilities

Parallel steps in to complete your most tedious web tasks, offering greater speed and accuracy than humans, other LLMs, or custom search stacks

## The highest accuracy at every price point

Parallel achieves best-in-class accuracy across the Pareto frontier of cost and latency, so you can find the right balance of trade-offs for each task. Parallel’s unique Processor architecture lets you match AI compute to complexity, optimizing for cost, speed, and thoroughness.

[See more benchmarks](https://parallel.ai/benchmarks)

## BrowseComp Agentic Web Research (2026)

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Lite                | 5          | 88           |
| Parallel | Core                | 25         | 91           |
| Parallel | Ultra               | 300        | 92           |
| Parallel | Ultra2x             | 600        | 93           |
| Parallel | Ultra4x             | 1200       | 94           |
| Others   | Perplexity high     | 441.5      | 86           |
| Others   | Exa Agent Max       | 1043.5     | 78           |
| Others   | Gemini 3.1 Pro high | 194.4      | 72           |
| Others   | GPT-5.6 Sol PTC max | 791.1      | 85           |

CPM: USD per 1000 queries. Cost is shown on a log scale.

### Methodology

**Evaluation sample**

We ran this benchmark on a fixed 100-question subset of BrowseComp. The same subset was held constant across every Parallel Task API configuration and every competitor.

**Cost**

Cost is reported as CPM: measured end-to-end spend for the run divided by the number of questions, multiplied by 1,000\. It is plotted on a log scale.

**Experiment setup**

The Parallel Task API is evaluated across nine configurations, from Task Lite through Task Ultra8x. Competitors are evaluated in their highest-quality configurations: Perplexity high, Perplexity xhigh, Exa Agent Max, Gemini 3.1 Pro high, GPT-5.6 Sol PTC max.

**Benchmark dates**

All testing was conducted on August 26, 2026.

## DeepSearchQA Agentic Web Research (2026)

| Series   | Model               | Cost (CPM) | Accuracy (%) |
| -------- | ------------------- | ---------- | ------------ |
| Parallel | Lite                | 5          | 76           |
| Parallel | Base                | 10         | 77           |
| Parallel | Core2x              | 50         | 81           |
| Parallel | Pro                 | 100        | 83           |
| Parallel | Ultra2x             | 600        | 85           |
| Parallel | Ultra4x             | 1200       | 86           |
| Others   | Perplexity high     | 371.9      | 68           |
| Others   | Exa Agent Max       | 1506.5     | 65           |
| Others   | Gemini 3.1 Pro high | 123.9      | 77           |
| Others   | GPT-5.6 Sol PTC max | 1047.8     | 85           |

CPM: USD per 1000 queries. Cost is shown on a log scale.

### Methodology

**Evaluation sample**

We ran this benchmark on a fixed 100-question subset of DeepSearchQA. The same subset was held constant across every Parallel Task API configuration and every competitor.

**Cost**

Cost is reported as CPM: measured end-to-end spend for the run divided by the number of questions, multiplied by 1,000\. It is plotted on a log scale.

**Experiment setup**

The Parallel Task API is evaluated across nine configurations, from Task Lite through Task Ultra8x. Competitors are evaluated in their highest-quality configurations: Perplexity high, Perplexity xhigh, Exa Agent Max, Gemini 3.1 Pro high, GPT-5.6 Sol PTC max.

**Benchmark dates**

All testing was conducted on August 26, 2026.

## Build web agents

with unrivaled flexibility and research power

## 

Parallel Tasks are designed for maximum extensibility. Create a task spec for any research need

# Program, run, repeat

Think of the Task API like a team of skilled web researchers that you can program to scour the web for the most important data that matters to your business.

Define a task in plain language or JSON, validate the outputs with some tests, then scale it up to achieve unprecedented productivity.

[Create a task](https://platform.parallel.ai/play)[Docs](https://docs.parallel.ai/task-api/)

## Verifiability and provenance

for every atomic fact

Every output includes Parallel’s [Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis), a proprietary solution for verifiability that includes citations, rationale, and calibrated confidence levels to offer unrivaled transparency.

Every output includes Parallel’s [Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis), a proprietary solution for verifiability that includes citations, rationale, and calibrated confidence levels to offer unrivaled transparency.

* **Field:** Name of the corresponding output field
* **Citations:** List of web sources supporting the output field
* **Confidence:** Reliability rating for each output field
* **Reasoning:** Explanation of how the system processed the information

* **Field:** Name of the corresponding output field
* **Citations:** List of web sources supporting the output field
* **Confidence:** Reliability rating for each output field
* **Reasoning:** Explanation of how the system processed the information

## FAQ

+−Do I have to have an input schema to use the Task API?

No, input schema is optional. You have several options:

* Plain text input (simplest): Just pass a string like `"United Nations"` or `"Parallel Web Systems Task API"` as your input—no schema needed.
* Output schema only: Define just the output structure you want back. The system will use your text input to research and populate those fields.
* Full input + output schemas: Use JSON schemas for both when you need precise control over structured inputs (e.g., passing `company_name` and `company_website` together to help disambiguate).
* Auto mode: For Deep Research, you can use `"output_schema": {"type": "auto"}` and let the processor determine the optimal response structure automatically.

+−What's the difference between Enrichment and Deep Research?

Enrichment starts with structured data you already have (like a company name and website) and adds specific fields to it (like employee count or funding history). Deep Research starts with a question or topic and returns a comprehensive report. Use Enrichment when you're enhancing existing records; use Deep Research when you're exploring a subject.

+−How accurate are the results?

Parallel strives for the highest accuracy across all price points. Thus, accuracy depends on the processor tier and the availability of information online. Higher-tier processors (pro, ultra) cross-reference more sources and spend more time validating findings. Every output includes confidence levels so you can programmatically handle uncertain results.

+−How do I know which Processor to use?

Start with the complexity of your output. Simple fact lookups (1-2 fields) work well with Lite or Base. Multi-field enrichments (5-10 fields) typically need Core. Open-ended research questions benefit from Pro or Ultra. You can always test different processors on the same task to find the optimal balance. Parallel also offers a range of Fast Processors that optimize for speed by eliminating live crawling.

  
[Visit our Processors page for more information.](https://docs.parallel.ai/task-api/guides/choose-a-processor)

+−What happens when information isn't available?

You can specify fallback behavior in your output schema descriptions (e.g., "If unavailable, return 'Not Found'"). The basis will reflect low confidence and explain why the information couldn't be verified.

+−Can I run tasks in bulk?

Yes. Task Groups let you execute multiple Task Runs concurrently with batch tracking and aggregated results. Ideal for enriching spreadsheets or processing lists.

+−How do I handle long-running tasks?

For pro and ultra processors, tasks can take several minutes. Use webhooks for HTTP callbacks when tasks complete, or server-sent events (SSE) for streaming real-time progress.

+−What sources does the Task API use?

The system searches the open web, prioritizing authoritative sources relevant to your query. Every output includes citations so you can verify the sources used.

+−Is there an SLA for response times?

Response times vary by processor tier and task complexity. See the processor documentation for typical latency ranges. For production workloads with specific latency requirements, contact our team.

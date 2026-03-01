Human Machine

Task API

# \# Automate structured web

\## Transform manual workflows into programmable and repeatable operations powered by AI web search

[Create a task T](https://platform.parallel.ai/play) [[Create a task] (https://platform.parallel.ai/play)](https://platform.parallel.ai/play) [Contact us C](https://form.fillout.com/t/rv6fubdwwuus) [[Contact us] (https://form.fillout.com/t/rv6fubdwwuus)](https://form.fillout.com/t/rv6fubdwwuus)

## \## Save human hours

with structured web search tasks

## \## The Task API combines AI inference with state-of-the-art web search and live crawling

Turn complex knowledge work that previously took weeks into repeatable workflows that take just minutes

[Get started T](https://platform.parallel.ai/play) [[Get started T ] (https://platform.parallel.ai/play)](https://platform.parallel.ai/play)

Parallel

## \## Automate complex web research workflows

with specialized sub-agents

## \## Create specialized web research agents to enhance human workflows or extend agent capabilities

Parallel steps in to complete your most tedious web tasks, offering greater speed and accuracy than humans, other LLMs, or custom search stacks

[Get started T](https://platform.parallel.ai/play) [[Get started T ] (https://platform.parallel.ai/play)](https://platform.parallel.ai/play)

Parallel

vs Human

## The highest accuracy at every price point

Parallel achieves best-in-class accuracy across the Pareto frontier of cost and latency, so you can find the right balance of trade-offs for each task. Parallel’s unique Processor architecture lets you match AI compute to complexity, optimizing for cost, speed, and thoroughness.

[See more benchmarks P](https://parallel.ai/benchmarks) [[See more benchmarks] (https://parallel.ai/benchmarks)](/ai/benchmarks)

DeepSearchQA

COST (CPM) ACCURACY (%) Loading chart...

CPM: USD per 1000 requests. Cost is shown on a Log scale.

Parallel

Others

BrowseComp benchmark analysis: CPM: USD per 1000 requests. Cost is shown on a Log scale. . Evaluation shows Parallel's enterprise deep research API for AI agents achieving up to 48% accuracy, outperforming GPT-4 browsing (1%), Claude search (6%), Exa (14%), and Perplexity (8%). Enterprise-grade structured deep research performance across Cost (CPM) and Accuracy (%). State-of-the-art enterprise deep research API with structured data extraction built for ChatGPT deep research and complex multi-hop AI agent workflows.

### \### Benchmark

This benchmark, created by researchers at Google, consists of 900 prompts for evaluating agents on difficult multi-step information-seeking tasks across 17 different fields.

### \### Methodology

Accuracy refers to answers that are “Fully Correct”: A response is fully correct if and only if the submitted set is semantically identical to the ground-truth set. The agent must identify all correct answers while including zero incorrect answers.

For Exa, Perplexity, GPT 5.2-pro, and Gemini Deep Research API, we evaluate them on their highest thinking and search context settings.

### \### Testing dates

December 15-18, 2025

## \## The highest accuracy at every price point

Parallel achieves best-in-class accuracy across the Pareto frontier of cost and latency, so you can find the right balance of trade-offs for each task. Parallel’s unique Processor architecture lets you match AI compute to complexity, optimizing for cost, speed, and thoroughness.

[See more benchmarks P](https://parallel.ai/benchmarks) [[See more benchmarks] (https://parallel.ai/benchmarks)](/ai/benchmarks)

## \### DeepSearchQA Task API

```
| Series   | Model                    | Cost (CPM) | Accuracy (%) |
| -------- | ------------------------ | ---------- | ------------ |
| Parallel | Pro                      | 100        | 62           |
| Parallel | Ultra                    | 300        | 68.5         |
| Parallel | Ultra2x                  | 600        | 72.6         |
| Others   | Gemini Deep Research     | 2500       | 64.3         |
| Others   | OpenAI GPT 5.2 Pro       | 1830       | 61           |
| Others   | Exa                      | 740        | 30           |
| Others   | Perplexity Deep Research | 1540       | 25           |
```

CPM: USD per 1000 requests. Cost is shown on a Log scale.

### \### Benchmark

This benchmark, created by researchers at Google, consists of 900 prompts for evaluating agents on difficult multi-step information-seeking tasks across 17 different fields.

### \### Methodology

Accuracy refers to answers that are “Fully Correct”: A response is fully correct if and only if the submitted set is semantically identical to the ground-truth set. The agent must identify all correct answers while including zero incorrect answers.

For Exa, Perplexity, GPT 5.2-pro, and Gemini Deep Research API, we evaluate them on their highest thinking and search context settings.

### \### Testing dates

December 15-18, 2025

## \## Build web agents

with unrivaled flexibility and research power

Parallel Tasks are designed for maximum extensibility. Create a task spec for any research need

Deep Research

Database Building

Financial Reports

Enrichment

Deep Research

Database Building

Financial Reports

Enrichment

Deep Research

Database Building

Financial Reports

Enrichment

Deep Research

Database Building

Financial Reports

Enrichment

Deep Research

Database Building

Financial Reports

Enrichment

Deep Research

Database Building

Financial Reports

Enrichment

# \# Program, run, repeat

Think of the Task API like a team of skilled web researchers that you can program to scour the web for the most important data that matters to your business.

Define a task in plain language or JSON, validate the outputs with some tests, then scale it up to achieve unprecedented productivity.

[Create a task T](https://platform.parallel.ai/play) [[Create a task] (https://platform.parallel.ai/play)](https://platform.parallel.ai/play) [Docs](https://docs.parallel.ai/task-api/) [[Docs] (https://docs.parallel.ai/task-api/)](https://docs.parallel.ai/task-api/)

Python

Copy

```
task_run = client.task_run.create(
     input ={ "company_name" :  "Acme Corp" ,  "website" :  "acme.com" },
    task_spec={
         "output_schema" : {
             "type" :  "json" ,
             "json_schema" : {
                 "type" :  "object" ,
                 "properties" : {
                     "founded_year" : { "type" :  "string" },
                     "employee_count" : { "type" :  "string" },
                     "latest_funding" : { "type" :  "string" }
                },
                 "required" : [ "founded_year" ,  "employee_count" ,  "latest_funding" ]
            }
        }
    },
    processor= "core" 
)
```

## \## Verifiability and provenance

for every atomic fact

Every output includes Parallel’s [Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis) [[Basis framework] (https://docs.parallel.ai/task-api/guides/access-research-basis)](https://docs.parallel.ai/task-api/guides/access-research-basis) , a proprietary solution for verifiability that includes citations, rationale, and calibrated confidence levels to offer unrivaled transparency.

Every output includes Parallel’s [Basis framework](https://docs.parallel.ai/task-api/guides/access-research-basis) [[Basis framework] (https://docs.parallel.ai/task-api/guides/access-research-basis)](https://docs.parallel.ai/task-api/guides/access-research-basis) , a proprietary solution for verifiability that includes citations, rationale, and calibrated confidence levels to offer unrivaled transparency.

* \- **Field:** Name of the corresponding output field
* \- **Citations:** List of web sources supporting the output field
* \- **Confidence:** Reliability rating for each output field
* \- **Reasoning:** Explanation of how the system processed the information

* \- **Field:** Name of the corresponding output field
* \- **Citations:** List of web sources supporting the output field
* \- **Confidence:** Reliability rating for each output field
* \- **Reasoning:** Explanation of how the system processed the information

* Enrichment
* Deep Research
* Database expansion
* Price intelligence
* Product research

Start with structured data you already have, a list of companies, contacts, or products, and enhance it with web intelligence. The Task API researches each record and populates the fields you specify.

CRM enrichment Lead scoring Account qualification Compliance checks Vendor due diligence

## \## FAQ

\+ − Do I have to have an input schema to use the Task API?

No, input schema is optional. You have several options:

* Plain text input (simplest): Just pass a string like `"United Nations"` or `"Parallel Web Systems Task API"` as your input—no schema needed.
* Output schema only: Define just the output structure you want back. The system will use your text input to research and populate those fields.
* Full input + output schemas: Use JSON schemas for both when you need precise control over structured inputs (e.g., passing `company_name` and `company_website` together to help disambiguate).
* Auto mode: For Deep Research, you can use `"output_schema": {"type": "auto"}` and let the processor determine the optimal response structure automatically.

\+ − What's the difference between Enrichment and Deep Research?

Enrichment starts with structured data you already have (like a company name and website) and adds specific fields to it (like employee count or funding history). Deep Research starts with a question or topic and returns a comprehensive report. Use Enrichment when you're enhancing existing records; use Deep Research when you're exploring a subject.

\+ − How accurate are the results?

Parallel strives for the highest accuracy across all price points. Thus, accuracy depends on the processor tier and the availability of information online. Higher-tier processors (pro, ultra) cross-reference more sources and spend more time validating findings. Every output includes confidence levels so you can programmatically handle uncertain results.

\+ − How do I know which Processor to use?

Start with the complexity of your output. Simple fact lookups (1-2 fields) work well with Lite or Base. Multi-field enrichments (5-10 fields) typically need Core. Open-ended research questions benefit from Pro or Ultra. You can always test different processors on the same task to find the optimal balance. Parallel also offers a range of Fast Processors that optimize for speed by eliminating live crawling.

[Visit our Processors page for more information.](https://docs.parallel.ai/task-api/guides/choose-a-processor) [[Visit our Processors page for more information.] (https://docs.parallel.ai/task-api/guides/choose-a-processor)](https://docs.parallel.ai/task-api/guides/choose-a-processor)

\+ − What happens when information isn't available?

You can specify fallback behavior in your output schema descriptions (e.g., "If unavailable, return 'Not Found'"). The basis will reflect low confidence and explain why the information couldn't be verified.

\+ − Can I run tasks in bulk?

Yes. Task Groups let you execute multiple Task Runs concurrently with batch tracking and aggregated results. Ideal for enriching spreadsheets or processing lists.

\+ − How do I handle long-running tasks?

For pro and ultra processors, tasks can take several minutes. Use webhooks for HTTP callbacks when tasks complete, or server-sent events (SSE) for streaming real-time progress.

\+ − What sources does the Task API use?

The system searches the open web, prioritizing authoritative sources relevant to your query. Every output includes citations so you can verify the sources used.

\+ − Is there an SLA for response times?

Response times vary by processor tier and task complexity. See the processor documentation for typical latency ranges. For production workloads with specific latency requirements, contact our team.
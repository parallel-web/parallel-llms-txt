# Introducing Auto Mode for the Parallel Task API

Starting today, the Parallel Task API supports **Auto Mode**, enabling one-off web research queries without requiring explicit output schemas. Simply ask a research question and let our processors handle the rest.

Previously, creating a Task required both an input and a structured output schema. This **Schema Mode** remains ideal for systematic research operations requiring consistent data structures across thousands of queries - like enriching CRM data or conducting due diligence workflows at scale.

But, sometimes you just want to ask a research question and get an answer. Auto Mode makes this possible.

## **How Auto Mode Works**

With Auto Mode, you can create a Task by passing in a research question as input. No output schema is required. Our processors automatically determine the optimal response structure based on your query and output results with the generated output schema.

```sh
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: YOUR_API_KEY" \
  -H 'content-type: application/json' \
  --data '{
  "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
  "processor": "ultra",
  "task_spec": {
    "output_schema": {
      "type": "auto"
    }
  }
}'
```

Auto Mode leverages the same state-of-the-art web research capabilities that power Schema Mode, with all the verification tools you expect from Basis: comprehensive citations, detailed reasoning, relevant excerpts, and calibrated confidence scores.

## **Start Building**

Auto Mode is available today on high compute processors (Pro, Ultra, and beyond). Try it out in our [Developer Platform](https://platform.parallel.ai/play/deep-research) or dive directly into our[ documentation](https://docs.parallel.ai/task-api/task-deep-research).

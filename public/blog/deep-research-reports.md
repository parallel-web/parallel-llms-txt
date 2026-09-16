# Introducing Parallel Deep Research reports

The Parallel Task API now supports comprehensive markdown Deep Research report generation with in-line citations and relevant excerpts. 

Starting today, the Parallel Task API supports comprehensive markdown report generation - transforming complex web research into publication-ready documents with in-line citations and source excerpts.

Previously, developers using our Task API for Deep Research automatically received [structured JSON outputs](https://parallel.ai/blog/task-api-auto-mode) that required additional processing to create readable reports. Now, with our new text schema mode, the same state-of-the-art web research that powers our Task API automatically generates comprehensive markdown-formatted reports, complete with in-line citations and relevant source excerpts.

## **From structured data to publication-ready reports**

With the new text schema mode, instead of parsing JSON fields and manually constructing narratives, users can now specify output_schema: text to receive reports that synthesize findings across multiple sources into coherent, citable documents.

Consider this market research request:

```sh
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: PARALLEL_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",
  "processor": "ultra",
  "task_spec": {
    "output_schema": {
      "type": "text"
    }
  }
}'
```

The response delivers a self-contained markdown report with in-line citations, and the list of all websites/URLs/documents with excerpts that were used as part of the research process - all formatted for immediate use in presentations, strategic planning documents, academic reports, or further LLM processing.

The text schema also supports an optional description field, allowing users to specify report parameters such as preferred length, focus areas, or formatting requirements - providing granular control over outputs.

## **Use Parallel as your Deep Research node**

Organizations across domains can now integrate sophisticated web research directly into their workflows: investment firms generating due diligence reports, consulting teams producing competitive intelligence, or product teams creating comprehensive market analyses. The Deep Research Report API collapses what traditionally required teams of researchers and hours of synthesis into a single API call that delivers publication-quality output.

Every report maintains complete verification through in-line citations and source excerpts, providing transparency into how conclusions were reached and enabling readers to verify findings directly from source materials.

## **Start building**

Get started with comprehensive deep research reports in our[ Developer Platform](https://platform.parallel.ai/) or dive directly into our [documentation](https://docs.parallel.ai/task-api/task-deep-research).

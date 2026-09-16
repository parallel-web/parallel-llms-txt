# Introducing Source Policy

Starting today, Source Policy is available for both the [Parallel Task API](https://parallel.ai/blog/parallel-task-api) and [Search API](https://parallel.ai/products/search) - giving you granular control over which sources your AI agents access and how results are prioritized.

## **What is Source Policy?**

Source Policy lets you define exactly which domains your research should include and exclude. With two simple parameters, you can shape how Parallel crawls and reasons over the web:

- **include_domains**: Restrict queries to specific trusted domains
- **exclude_domains**: Block unreliable or irrelevant sources

```sh
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "task_spec": {
        "output_schema": "How many employees are there in the company"
      },
      "input": "Parallel Web Systems",
      "processor": "core",
      "source_policy": {
        "include_domains": ["linkedin.com"]
      }
    }'
```

## **Why Source Policy matters**

Production AI applications demand reliable, verifiable sources. Whether you're conducting due diligence that requires SEC filings, sales research that needs company websites, or competitive analysis that excludes certain unreliable publishers - Source Policy ensures your agents access exactly the right information.

Instead of post-processing results to filter sources, you can now constrain the Parallel web research pipeline from the start. This reduces noise, improves accuracy, and gives you confidence that outputs stem from sources you trust.

## **Start building**

Source Policy is available today across all Task API and Search API processors. Get started in our [Developer Platform](https://platform.parallel.ai) or dive into the [documentation](https://docs.parallel.ai/resources/source-policy).

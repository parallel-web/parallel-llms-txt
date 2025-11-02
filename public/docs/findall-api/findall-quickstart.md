# Quickstart

> Get Started with Parallel FindAll

Parallel FindAll enables you to discover and research entities from across the web using natural language. It turns questions like "Find all AI companies that raised Series A funding recently" into structured, enriched databases with verified information.

<Note>
  **Beta Notice**: Parallel FindAll is currently in public beta. Endpoints and request/response formats are subject to change. We will provide 30 days' notice before any breaking changes. For production access, contact [support@parallel.ai](mailto:support@parallel.ai).
</Note>

## Key Features

FindAll excels at entity discovery and research tasks that require both breadth and depth:

* **Natural Language Input**: Express complex search criteria in plain English
* **Intelligent Entity Discovery**: Automatically generates and validates potential matches
* **Structured Enrichment**: Extract specific attributes for each discovered entity
* **Citation-backed Results**: Every data point includes reasoning and source citations
* **Asynchronous Processing**: Handle large-scale searches without blocking your application

### Common Use Cases

* **Market Mapping**: "Find all fintech companies offering earned-wage access in Brazil"
* **Competitive Intelligence**: "Find all AI infrastructure providers that raised Series B funding in the last 6 months"
* **Lead Generation**: "Find all residential roofing companies in Charlotte, NC"
* **Financial Research**: "Find all S\&P 500 stocks that dropped X% in last 30 days and listed tariffs as a key risk"

## How It Works

Parallel FindAll follows a three-step asynchronous workflow:

1. **Ingest**: Convert your natural language query into a structured FindAllSpec
2. **Run**: Execute the FindAllSpec to start the discovery process
3. **Poll**: Check status and retrieve results as they become available

```text  theme={"system"}
Natural Language Query → FindAllSpec → findall_id → Structured Results
```

## Authentication

All requests require an API key in the header:

```bash  theme={"system"}
x-api-key: PARALLEL_API_KEY
```

## Step 1: Ingest Your Query

Convert your natural language question into a structured FindAllSpec:

```python  theme={"system"}
import requests

API_KEY = "PARALLEL_API_KEY"
BASE_URL = "https://api.parallel.ai"

query = "Find all AI companies that raised Series A funding in 2024"

ingest_response = requests.post(
    f"{BASE_URL}/v1beta/findall/ingest",
    headers={"x-api-key": API_KEY},
    json={"query": query}
)

findall_spec = ingest_response.json()
print(f"Generated spec with {len(findall_spec['columns'])} columns")
```

**Sample Response:**

```json  theme={"system"}
{
  "name": "funded_companies",
  "columns": [
    {
      "name": "entity_name",
      "description": "Name of the funded company",
      "type": "enrichment",
      "order_direction": null
    },
    {
      "name": "ai_product_development_check",
      "description": "Company must be developing products or services in the field of artificial intelligence (AI).",
      "type": "constraint",
      "order_direction": null
    },
    {
      "name": "series_a_2024_funding_check",
      "description": "Company must have received Series A funding in 2024.",
      "type": "constraint",
      "order_direction": null
    }
  ],
  "query": "Find all companies developing AI products that raised Series A funding in 2024",
  "title": "AI companies with 2024 Series A"
}
```

## Step 2: Start Your FindAll Run

Execute the FindAllSpec to begin discovering companies:

```python  theme={"system"}
run_response = requests.post(
    f"{BASE_URL}/v1beta/findall/runs",
    headers={"x-api-key": API_KEY},
    json={
        "findall_spec": findall_spec,
        "processor": "base",
        "result_limit": 50
    }
)

findall_id = run_response.json()["findall_id"]
print(f"Started FindAll run: {findall_id}")
```

**Sample Response:**

```json  theme={"system"}
{
  "findall_id": "findall_de9bbbed-1021-48fe-af79-2faca7177230_339277cf-b70e-4b49-9711-5bd91f803cad",
  "status": "queued"
}
```

## Step 3: Poll for Results

Check the status and retrieve your results:

```python  theme={"system"}
import time

while True:
    poll_response = requests.get(
        f"{BASE_URL}/v1beta/findall/runs/{findall_id}",
        headers={"x-api-key": API_KEY}
    )

    result = poll_response.json()

    print(f"Status: {result['status']}, Results: {len(result['results'])}")

    if not result["is_active"] and not result["are_enrichments_active"]:
        break

    time.sleep(15)  # Poll every 15 seconds

# Process results
print(f"\nFound {len(result['results'])} companies:")
for entity in result['results'][:3]:  # Show first 3
    print(f"- {entity['name']} (Score: {entity['score']})")
```

**Sample Response:**

```json  theme={"system"}
{
  "is_active": false,
  "status": "completed",
  "results": [
    {
      "entity_id": "6d5f6411-9554-4168-b4ad-75b0439f03b7",
      "name": "Cognition AI",
      "url": "cognition.ai",
      "description": "",
      "filter_results": [
        {
          "key": "ai_product_development_check",
          "value": "yes",
          "reasoning": "Cognition AI is described as an applied AI lab that is building the future of software engineering and the makers of Devin, an AI software developer.",
          "citations": "https://cognition.ai/blog/introducing-devin, https://research.contrary.com/company/cognition",
          "confidence": "high"
        },
        {
          "key": "series_a_2024_funding_check",
          "value": "yes",
          "reasoning": "Multiple sources confirm that Cognition AI received Series A funding in 2024.",
          "citations": "https://www.crunchbase.com/funding_round/cognition-5bd7-series-a--d0b08732",
          "confidence": "high"
        }
      ],
      "enrichment_results": [],
      "score": 100.0
    }
  ],
  "candidates": [
    {
      "entity_id": "0b330c38-0034-4f37-b4fe-bdda3e1bdb5c",
      "name": "Abridge"
    }
  ],
  "max_results": 20,
  "pages_read": 307,
  "pages_considered": 1784
}
```

## Complete Example

Here's the full workflow in one script:

```python  theme={"system"}
import requests
import time

# Configuration
API_KEY = "PARALLEL_API_KEY"
BASE_URL = "https://api.parallel.ai"

def run_findall_query(query):
    # Step 1: Ingest the query
    ingest_response = requests.post(
        f"{BASE_URL}/v1beta/findall/ingest",
        headers={"x-api-key": API_KEY},
        json={"query": query}
    )
    findall_spec = ingest_response.json()
    print(f"✓ Generated spec with {len(findall_spec['columns'])} columns")

    # Step 2: Run FindAll
    run_response = requests.post(
        f"{BASE_URL}/v1beta/findall/runs",
        headers={"x-api-key": API_KEY},
        json={
            "findall_spec": findall_spec,
            "processor": "base",
            "result_limit": 50
        }
    )
    findall_id = run_response.json()["findall_id"]
    print(f"✓ Started FindAll run: {findall_id}")

    # Step 3: Poll for results
    while True:
        poll_response = requests.get(
            f"{BASE_URL}/v1beta/findall/runs/{findall_id}",
            headers={"x-api-key": API_KEY}
        )
        result = poll_response.json()

        print(f"Status: {result['status']}, Results: {len(result['results'])}")

        if not result["is_active"] and not result["are_enrichments_active"]:
            break
        time.sleep(15)

    # Display results
    print(f"\n✓ Found {len(result['results'])} companies:")
    for entity in result['results'][:5]:
        print(f"  • {entity['name']} (Score: {entity['score']})")

    return result

# Run the example
if __name__ == "__main__":
    query = "Find all AI companies that raised Series A funding in 2024"
    results = run_findall_query(query)
```

## Best Practices

1. **Start with Clear Queries**: Be specific about your criteria and desired attributes
2. **Use Appropriate Processors**: Choose `base` for a balance of cost and quality, `pro` for maximum accuracy
3. **Set Reasonable Limits**: Balance between coverage and cost
4. **Poll Efficiently**: Check every 15-30 seconds to avoid rate limits
5. **Handle Partial Results**: Process results as they arrive for better UX

## Rate Limits

* Contact [support@parallel.ai](mailto:support@parallel.ai) for production limits

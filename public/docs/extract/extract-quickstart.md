# Quickstart

> Get started with Extract

The **Extract API** converts any public URL into clean markdown, including
JavaScript-heavy pages and PDFs. It returns focused excerpts aligned to your objective,
or full page content if requested.

<Note>
  {" "}

  **Beta Notice**: The Web Tools APIs are currently in beta and subject to change. Usage is
  limited to 600 requests per minute. For production access or higher capacity, contact
  [support@parallel.ai](mailto:support@parallel.ai).{" "}
</Note>

## Extract API Example

Extract clean markdown content from specific URLs. This example retrieves content from
the UN's history page with excerpts focused on the founding:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1beta/extract \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: search-extract-2025-10-10" \
    -d '{
      "urls": ["https://www.un.org/en/about-us/history-of-the-un"],
      "objective": "When was the United Nations established?",
      "excerpts": true,
      "full_content": false
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  extract = client.beta.extract(
      urls=["https://www.un.org/en/about-us/history-of-the-un"],
      objective="When was the United Nations established?",
      excerpts=True,
      full_content=False,
      betas=["search-extract-2025-10-10"]
  )

  print(extract.results)

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: "PARALLEL_API_KEY" });

  const extract = await client.beta.extract({
      urls: ["https://www.un.org/en/about-us/history-of-the-un"],
      objective: "When was the United Nations established?",
      excerpts: true,
      fullContent: false,
      betas: ["search-extract-2025-10-10"]
  });

  console.log(extract.results);
  ```
</CodeGroup>

## Sample Response

```json  theme={"system"}
{
  "extract_id": "extract_8a911eb27c7a4afaa20d0d9dc98d07c0",
  "results": [
    {
      "url": "https://www.un.org/en/about-us/history-of-the-un",
      "title": "History of the United Nations",
      "excerpts": [
        "As World War II was about to end in 1945, nations were in ruins, and the world wanted peace. Representatives of 50 countries gathered at the United Nations Conference on International Organization in San Francisco, California from 25 April to 26 June 1945.",
        "Four months after the San Francisco Conference ended, the United Nations officially began, on 24 October 1945, when it came into existence after its Charter had been ratified by China, France, the Soviet Union, the United Kingdom, the United States and by a majority of other signatories."
      ],
      "full_content": null,
    }
  ],
  "errors": []
}
```

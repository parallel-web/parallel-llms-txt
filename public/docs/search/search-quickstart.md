# Quickstart

> Get started with Search

The **Search API** takes a natural language objective and returns relevant excerpts
optimized for LLMs, replacing multiple keyword searches with a single call for broad or
complex queries.

<Note>
  **Beta Notice**: These APIs are currently in beta and subject to change. Usage is
  limited to 600 requests per minute. For production access or higher capacity, contact
  [support@parallel.ai](mailto:support@parallel.ai).
</Note>

## Example Usage

### Sample Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl https://api.parallel.ai/v1beta/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "parallel-beta: search-extract-2025-10-10" \
    -d '{
      "objective": "When was the United Nations established? Prefer UN'\''s websites.",
      "search_queries": [
        "Founding year UN",
        "Year of founding United Nations"
      ],
      "max_results": 10,
      "max_chars_per_result": 10000
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="PARALLEL_API_KEY")

  search = client.beta.search(
      objective="When was the United Nations established? Prefer UN's websites.",
      search_queries=[
          "Founding year UN",
          "Year of founding United Nations"
      ],
      max_results=10,
      max_chars_per_result=10000,
      betas=["search-extract-2025-10-10"],
  )

  print(search.results)

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: "PARALLEL_API_KEY" });

  const search = await client.beta.search({
      objective: "When was the United Nations established? Prefer UN's websites.",
      search_queries: [
          "Founding year UN",
          "Year of founding United Nations"
      ],
      max_results: 10,
      max_chars_per_result: 10000,
      betas: ["search-extract-2025-10-10"],
  });

  console.log(search.results);
  ```
</CodeGroup>

### Sample Response

```json [expandable] theme={"system"}
{
  "search_id": "search_ce42c6a9-7e1e-afb3-4e42-2e5f1efdf819",
  "results": [
    {
      "url": "https://www.un.org/en/about-us/history-of-the-un",
      "title": "History of the United Nations",
      "excerpts": [
        "As World War II was about to end in 1945, nations were in ruins, and the world wanted peace.",
        "Representatives of 50 countries gathered at the United Nations Conference on International ",
        "Organization in San Francisco, California from 25 April to 26 June 1945. For the next two ",
        "months, they proceeded to draft and then sign the UN Charter, which created a new international ",
        "organization, the United Nations, which, it was hoped, would prevent another world war like the ",
        "one they had just lived through.",
        "Four months after the San Francisco Conference ended, the United Nations officially began, on ",
        "24 October 1945, when it came into existence after its Charter had been ratified by China, France, ",
        "the Soviet Union, the United Kingdom, the United States and by a majority of other signatories.",
        "Now, more than 75 years later, the United Nations is still working to maintain international peace ",
        "and security, give humanitarian assistance to those in need, protect human rights, and uphold ",
        "international law."
      ]
    },
    {
      "url": "https://en.wikipedia.org/wiki/United_Nations",
      "title": "United Nations - Wikipedia",
      "excerpts": [
        "The United Nations (UN) is the global intergovernmental organization established by the signing ",
        "of the UN Charter on 26 June 1945 with the stated purpose of maintaining international peace and ",
        "security, to develop friendly relations among states, to promote international cooperation, and to ",
        "serve as a centre for harmonizing the actions of states in achieving those goals.",
        "The United Nations headquarters is located in New York City, with several other offices located in ",
        "Geneva, Nairobi, and Vienna."
      ]
    },
    {
      "url": "https://history.state.gov/milestones/1937-1945/un",
      "title": "The Formation of the United Nations, 1945 - Office of the Historian",
      "excerpts": [
        "The Charter provided for an 18-member Economic and Social Council, an International Court of ",
        "Justice, a Trusteeship Council to oversee certain colonial territories, and a Secretariat under a ",
        "Secretary General. The United Nations came into existence on October 24, 1945, after 29 nations ",
        "had ratified the Charter."
      ]
    },
    {
      "url": "https://www.un.org/en/video/founding-united-nations-1945",
      "title": "Founding of the United Nations 1945",
      "excerpts": [
        "In the summer of 1945, leaders from 50 countries gathered in San Francisco to agree upon an ",
        "international treaty to enshrine the equal rights of all people ..."
      ]
    },
    {
      "url": "https://www.un.org/en/model-united-nations/history-united-nations",
      "title": "History of the United Nations",
      "excerpts": [
        "On 24 October 1945, this condition was fulfilled and the UN officially came into existence. Four ",
        "years of planning and the hope of many years had materialized ..."
      ]
    }
  ]
}
```

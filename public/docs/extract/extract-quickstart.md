# Quickstart

> Get started with Extract

The **Extract API** converts any public URL into clean markdown, including
JavaScript-heavy pages and PDFs. It returns focused excerpts aligned to your objective,
or full page content if requested.

<Note>
  {" "}

  **Beta Notice**: The Search and Extract APIs are currently in beta and subject to change. Usage is
  limited to 600 requests per minute.
</Note>

## 1. Set up Prerequisites

Generate your API key on [Platform](https://platform.parallel.ai). Then, set up with the TypeScript SDK, Python SDK or with cURL:

<CodeGroup>
  ```bash cURL theme={"system"}
  echo "Install curl and jq via brew, apt, or your favorite package manager"
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash Python theme={"system"}
  pip install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```

  ```bash TypeScript theme={"system"}
  npm install parallel-web
  export PARALLEL_API_KEY="PARALLEL_API_KEY"
  ```
</CodeGroup>

## 2. Extract API Example

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
  import os
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  extract = client.beta.extract(
      urls=["https://www.un.org/en/about-us/history-of-the-un"],
      objective="When was the United Nations established?",
      excerpts=True,
      full_content=False,
  )

  print(extract.results)

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  const extract = await client.beta.extract({
      urls: ["https://www.un.org/en/about-us/history-of-the-un"],
      objective: "When was the United Nations established?",
      excerpts: true,
      fullContent: false,
  });

  console.log(extract.results);
  ```
</CodeGroup>

## Sample Response

```json  theme={"system"}
{
  "extract_id": "extract_470002358ec147e8a40cb70d0d82627e",
  "results": [
    {
      "url": "https://www.un.org/en/about-us/history-of-the-un",
      "title": "History of the United Nations | United Nations",
      "publish_date": "2001-01-01",
      "excerpts": [
        "[Skip to main content]()\nToggle navigation [Welcome to the United Nations](/)\n[العربية](/ar/about-us/history-of-the-un \"تاريخ الأمم المتحدة\")\n[中文](/zh/about-us/history-of-the-un \"联合国历史\")\nNederlands\n[English](/en/about-us/history-of-the-un \"History of the United Nations\")\n[Français](/fr/about-us/history-of-the-un \"L'histoire des Nations Unies\")\nKreyòl\nहिन्दी\nBahasa Indonesia\nPolski\nPortuguês\n[Русский](/ru/about-us/history-of-the-un \"История Организации Объединенных Наций\")\n[Español](/es/about-us/history-of-the-un \"Historia de las Naciones Unidas\")\nKiswahili\nTürkçe\nУкраїнська\n[](/en \"United Nations\") Peace, dignity and equality  \non a healthy planet\n\nSection Title: History of the United Nations\nContent:\nThe UN Secretariat building (at left) under construction in New York City in 1949. At right, the Secretariat and General Assembly buildings four decades later in 1990. UN Photo: MB (L) ; UN Photo (R)\nAs World War II was about to end in 1945, nations were in ruins, and the world wanted peace. Representatives of 50 countries gathered at the United Nations Conference on International Organization in San Francisco, California from 25 April to 26 June 1945. For the next two months, they proceeded to draft and then sign the UN Charter, which created a new international organization, the United Nations, which, it was hoped, would prevent another world war like the one they had just lived through.\nFour months after the San Francisco Conference ended, the United Nations officially began, on 24 October 1945, when it came into existence after its Charter had been ratified by China, France, the Soviet Union, the United Kingdom, the United States and by a majority of other signatories.\nNow, more than 75 years later, the United Nations is still working to maintain international peace and security, give humanitarian assistance to those in need, protect human rights, and uphold international law.\n\nSection Title: History of the United Nations\nContent:\nAt the same time, the United Nations is doing new work not envisioned for it in 1945 by its founders. The United Nations has set [sustainable development goals](http://www.un.org/sustainabledevelopment/sustainable-development-goals/) for 2030, in order to achieve a better and more sustainable future for us all. UN Member States have also agreed to [climate action](http://www.un.org/en/climatechange) to limit global warming.\nWith many achievements now in its past, the United Nations is looking to the future, to new achievements.\nThe history of the United Nations is still being written.\n\nSection Title: History of the United Nations > [Milestones in UN History](https://www.un.org/en/about-us/history-of-the-un/1941-1950)\nContent:\n[](https://www.un.org/en/about-us/history-of-the-un/1941-1950)\nTimelines by decade highlighting key UN milestones\n\nSection Title: History of the United Nations > [The San Francisco Conference](https://www.un.org/en/about-us/history-of-the-un/san-francisco-conference)\nContent:\n[](https://www.un.org/en/about-us/history-of-the-un/san-francisco-conference)\nThe story of the 1945 San Francisco Conference\n\nSection Title: History of the United Nations > [Preparatory Years: UN Charter History](https://www.un.org/en/about-us/history-of-the-un/preparatory-years)\nContent:\n[](https://www.un.org/en/about-us/history-of-the-un/preparatory-years)\nThe steps that led to the signing of the UN Charter in 1945\n\nSection Title: History of the United Nations > [Predecessor: The League of Nations](https://www.un.org/en/about-us/history-of-the-un/predecessor)\nContent:\n[](https://www.un.org/en/about-us/history-of-the-un/predecessor)\nThe UN's predecessor and other earlier international organizations\n[](https://www.addtoany.com/share)\n"
      ],
      "full_content": null
    }
  ],
  "errors": [],
  "warnings": null,
  "usage": [
    {
      "name": "sku_extract_excerpts",
      "count": 1
    }
  ]
}
```

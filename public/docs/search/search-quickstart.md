> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Search API Quickstart

> Execute natural language web searches and retrieve LLM-optimized excerpts with the Parallel Search API

The **Search API** takes a natural language objective and returns relevant excerpts
optimized for LLMs, replacing multiple keyword searches with a single call for broad or
complex queries.

<Tip>
  {" "}

  **Available via MCP**: Search is available as a tool as part of the Parallel Search MCP. Our MCP is optimized for best practices on Search and Extract usage. [Start here](/integrations/mcp/search-mcp) with MCP for your use case. If you're interested in direct use of the API, follow the steps below.
</Tip>

<Note>
  See [Pricing](/getting-started/pricing) for a detailed schedule of rates.
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

## 2. Execute your First Search

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
      "excerpts": {
        "max_chars_per_result": 10000
      }
    }'
  ```

  ```python Python theme={"system"}
  import os
  from parallel import Parallel

  client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

  search = client.beta.search(
      objective="When was the United Nations established? Prefer UN's websites.",
      search_queries=[
          "Founding year UN",
          "Year of founding United Nations"
      ],
      max_results=10,
      excerpts={"max_chars_per_result": 10000},
  )

  for result in search.results:
      print(f"{result.title}: {result.url}")
      for excerpt in result.excerpts:
          print(excerpt[:200])

  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from "parallel-web";

  const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

  async function main() {
      const search = await client.beta.search({
          objective: "When was the United Nations established? Prefer UN's websites.",
          search_queries: [
              "Founding year UN",
              "Year of founding United Nations"
          ],
          max_results: 10,
          excerpts: { max_chars_per_result: 10000 },
      });

      for (const result of search.results) {
          console.log(`${result.title}: ${result.url}`);
          for (const excerpt of result.excerpts) {
              console.log(excerpt.slice(0, 200));
          }
      }
  }

  main().catch(console.error);
  ```
</CodeGroup>

<Note>
  `max_results` is an upper bound, not a guaranteed count. The actual number of results may be fewer depending on query specificity and available sources.
</Note>

### Sample Response

The API returns a JSON response with the following structure. The SDK examples above iterate over `results` to print each result's title, URL, and excerpts.

```json [expandable] theme={"system"}
{
  "search_id": "search_e749586f-00f0-43a0-9f33-730a574d32b9",
  "results": [
    {
      "url": "http://un.org/",
      "title": "Welcome to the United Nations",
      "publish_date": null,
      "excerpts": [
        "Last updated before: 2025-06-10\nUNICEF/UNI510119/Truong Viet Hung\n儿基会/UNI510119/Truong Viet Hung\nUNICEF/UNI510119/Truong Viet Hung\nUNICEF/UNI510119/Truong Viet Hung\nЮНИСЕФ/UNI510119/Труонг Вьет Хонг\nUNICEF/UNI510119/Truong Viet Hung\n[اليوم الدولي للّعب - 11 حزيران/ يونيه](https://www.un.org/ar/observances/international-day-of-play)\n[国际游玩日 - 6月11日](https://www.un.org/zh/observances/international-day-of-play)\n[International Day of Play - 11 June](https://www.un.org/en/observances/international-day-of-play)\n[Journée internationale du jeu - 11 juin](https://www.un.org/fr/observances/international-day-of-play)\n[Международный день игры — 11 июня](https://www.un.org/ru/observances/international-day-of-play)\n[Día Internacional del Juego – 11 de junio](https://www.un.org/es/observances/international-day-of-play)\nUNICEF/UNI510119/Truong Viet Hung\n儿基会/UNI510119/Truong Viet Hung\nUNICEF/UNI510119/Truong Viet Hung\nUNICEF/UNI510119/Truong Viet Hung\nЮНИСЕФ/UNI510119/Труонг Вьет Хонг\nUNICEF/UNI510119/Truong Viet Hung\nاليوم الدولي للّعب - 11 حزيران/ يونيه\n国际游玩日 - 6月11日\nInternational Day of Play - 11 June\nJournée internationale du jeu - 11 juin\nМеждународный день игры — 11 июня\nDía Internacional del Juego – 11 de junio\n[عربي](/ar/)\n[中文](/zh/)\n[English](/en/)\n[Français](/fr/)\n[Русский](/ru/)\n[Español](/es/)\n"
      ]
    },
    {
      "url": "https://www.un.org/en/about-us/history-of-the-un",
      "title": "History of the United Nations",
      "publish_date": "2001-01-01",
      "excerpts": [
        "Last updated: 20010101\n[Skip to main content]()\n\nToggle navigation [Welcome to the United Nations](/)\n\n+ [العربية](/ar/about-us/history-of-the-un \"تاريخ الأمم المتحدة\")\n    + [中文](/zh/about-us/history-of-the-un \"联合国历史\")\n    + Nederlands\n    + [English](/en/about-us/history-of-the-un \"History of the United Nations\")\n    + [Français](/fr/about-us/history-of-the-un \"L'histoire des Nations Unies\")\n    + Kreyòl\n    + हिन्दी\n    + Bahasa Indonesia\n    + Polski\n    + Português\n    + [Русский](/ru/about-us/history-of-the-un \"История Организации Объединенных Наций\")\n    + [Español](/es/about-us/history-of-the-un \"Historia de las Naciones Unidas\")\n    + Kiswahili\n    + Türkçe\n    + Українська\n\n... (truncated for brevity)"
      ]
    },
    {
      "url": "https://research.un.org/en/unmembers/founders",
      "title": "UN Founding Members - UN Membership",
      "publish_date": "2018-11-08",
      "excerpts": [
        "Last updated: 20181108\n[Skip to Main Content]()\n\nToggle navigation [Welcome to the United Nations](https://www.un.org/en)\n\n... (content omitted for brevity)"
      ]
    },
    {
      "url": "https://www.un.org/en/about-us/un-charter",
      "title": "UN Charter | United Nations",
      "publish_date": "2025-01-01",
      "excerpts": [
        "Last updated: 20250101\n[Skip to main content]()\n\n... (content omitted for brevity)"
      ]
    },
    {
      "url": "https://www.un.org/en/video/founding-united-nations-1945",
      "title": "Founding of the United Nations 1945",
      "publish_date": "2023-11-01",
      "excerpts": [
        "Last updated: 20231101\n[Skip to main content]()\n\n... (content omitted for brevity)"
      ]
    },
    {
      "url": "https://www.un.org/en/about-us",
      "title": "About Us | United Nations",
      "publish_date": "2017-01-01",
      "excerpts": [
        "Last updated: 20170101\n[Skip to main content]()\n\n... (content omitted for brevity)"
      ]
    },
    {
      "url": "https://www.facebook.com/unitednationsfoundation/posts/eighty-years-of-the-united-nations-on-this-day-in-1945-the-un-charter-came-into-/1404295104587053/",
      "title": "Eighty years of the United Nations. On this day in 1945, the UN ...",
      "publish_date": "2025-10-24",
      "excerpts": [
        "The United Nations officially came into existence on 24 October 1945, when the Charter had been ratified by China, France, the Soviet Union, the United Kingdom, the United States and by a majority of other signatories."
      ]
    },
    {
      "url": "https://www.un.org/en/model-united-nations/history-united-nations",
      "title": "History of the United Nations",
      "publish_date": null,
      "excerpts": [
        "Last updated before: 2025-11-05\nThe purpose of this conference was ..."
      ]
    },
    {
      "url": "https://en.wikipedia.org/wiki/United_Nations",
      "title": "United Nations - Wikipedia",
      "publish_date": "2025-11-03",
      "excerpts": [
        "Last updated: 20251103\nIt took the [conference at Yalta] ... (content truncated)"
      ]
    },
    {
      "url": "https://www.un.org/en/about-us/history-of-the-un/preparatory-years",
      "title": "Preparatory Years: UN Charter History | United Nations",
      "publish_date": "2001-01-01",
      "excerpts": [
        "Last updated: 20010101\n[Skip to main content]()\n\n... (content truncated)"
      ]
    }
  ],
  "warnings": null,
  "usage": [
    {
      "name": "sku_search",
      "count": 1
    }
  ]
}
```

## Next Steps

* **[Best Practices](/search/best-practices)** — learn how to craft effective objectives and search queries
* **[Search Modes](/search/modes)** — explore mode presets for different use cases
* **[API Reference](/api-reference/search-beta/search)** — full parameter specifications, constraints, and response schema
* **[Rate Limits](/getting-started/rate-limits)** — default quotas per product

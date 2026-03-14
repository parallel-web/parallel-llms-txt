> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Product updates from the Parallel team

<Update label="February 18, 2026">
  ## Parallel in the Cursor Marketplace

  Parallel is now available in the Cursor [marketplace](https://cursor.com/marketplace/parallel). Use Parallel's APIs with Cursor to improve web search and page extraction capabilities, especially for 3rd party libraries.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/iLPhjDHUMFDDkZ6K/images/cursor_marketplace.jpg?fit=max&auto=format&n=iLPhjDHUMFDDkZ6K&q=85&s=eb4bbf0d3594ea485fb05471952b1053" width="5394" height="3237" data-path="images/cursor_marketplace.jpg" />
  </Frame>
</Update>

<Update label="February 12, 2026">
  ## Introducing fast mode for the Parallel Search API

  Run searches in 1s. Whether your AI is optimizing for accuracy, cost, or latency, Parallel Search now covers the full spectrum of web search needs. Get started [here](/search/modes).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/lwCr_QsW_mbGT6hi/images/fastmode.gif?s=f0c9d73ef590b3de31a488c896809811" width="800" height="578" data-path="images/fastmode.gif" />
  </Frame>
</Update>

<Update label="February 9, 2026">
  ## Parallel Skills

  Parallel Skills are now available so agents can easily know the best way to use Parallel's APIs.

  Use Parallel skills for:

  1. Web Search: Searches for the best context
  2. Web Extract: Turns URLs into context
  3. Data Enrichment: Enriches text lists/CSVs
  4. Deep Research: Performs comprehensive research

  ```bash  theme={"system"}
  npx skills add parallel-web/parallel-agent-skills --all --global
  ```

  Get started [here](https://github.com/parallel-web/parallel-agent-skills/).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/vaXGA1s9nQRIDso2/images/Skills.sh.jpg?fit=max&auto=format&n=vaXGA1s9nQRIDso2&q=85&s=7e35168cf03d6d18fbd02f6e435b94d6" width="5394" height="3237" data-path="images/Skills.sh.jpg" />
  </Frame>
</Update>

<Update label="February 5, 2026">
  ## Simulate a Monitor

  You can now simulate monitor events, allowing you to test what a sample monitor response will look like, without waiting for a scheduled run.

  Learn more [here](/api-reference/monitor/simulate-event).

  ```bash  theme={"system"}
  POST /v1alpha/monitors/{monitor_id}/simulate_event
  ```
</Update>

<Update label="February 4, 2026">
  ## Parallel in the Vercel AI SDK, AI Gateway, and Marketplace

  Parallel is now available in the Vercel AI SDK, AI Gateway, and Marketplace.

  This offers a convenient way to access Parallel's Search, Extract, Task, FindAll, Monitor, and Chat API in Vercel - with billing built in. Learn more [here](https://parallel.ai/blog/vercel).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/vaXGA1s9nQRIDso2/images/Vercel.png?fit=max&auto=format&n=vaXGA1s9nQRIDso2&q=85&s=3722eb90fd2a1c6354ff507508fab724" width="7192" height="4316" data-path="images/Vercel.png" />
  </Frame>
</Update>

<Update label="February 3, 2026">
  ## Exclude entities from a FindAll run

  You can now exclude entities from a FindAll run to ensure there are no duplicates against prior runs or private data sources. Learn more [here](/findall-api/core-concepts/findall-candidates#excluding-candidates).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/iLPhjDHUMFDDkZ6K/images/exclude_findall_entities.png?fit=max&auto=format&n=iLPhjDHUMFDDkZ6K&q=85&s=ded613bcfc2c0529966faface6e3e762" width="4800" height="2700" data-path="images/exclude_findall_entities.png" />
  </Frame>
</Update>

<Update label="January 28, 2026">
  ## Authenticated page access for the Parallel Task API

  The Parallel Task API can now conduct web research over private data that is hidden behind logins, via our integration with browser agents like Browser Use.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/qsLQwULZ6dPrgEDM/images/browser_use.jpg?fit=max&auto=format&n=qsLQwULZ6dPrgEDM&q=85&s=86f70811077622c376963922f333aa83" width="5396" height="3240" data-path="images/browser_use.jpg" />
  </Frame>

  Learn more about combining public web research with [login gated private data](/integrations/browseruse).
</Update>

<Update label="January 21, 2026">
  ## Structured Outputs in the Monitor API

  Monitors can now return structured outputs with predefined schema for each event, allowing for standard responses and easy consumption by downstream systems.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/rnolEc_KrXpodUJB/images/monitor_structured_outputs.jpg?fit=max&auto=format&n=rnolEc_KrXpodUJB&q=85&s=8b9e4c224757c842d4a6d64dff01ad7f" width="5396" height="3240" data-path="images/monitor_structured_outputs.jpg" />
  </Frame>

  Learn more about [Monitor with Structured Outputs](/monitor-api/monitor-structured-outputs).
</Update>

<Update label="January 15, 2026">
  ## Research Models in the Chat API

  In addition to the speed model, the Parallel Chat API now supports three research models: Lite, Base, and Core. These models provide research-grade web intelligence with full Basis (citations, reasoning, excerpts, calibrated confidence scores) verification.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/8qIio1FI8GIybh_C/images/chat_research_models.jpg?fit=max&auto=format&n=8qIio1FI8GIybh_C&q=85&s=ec990ef357c04819f05329d890f1ed66" width="3606" height="2109" data-path="images/chat_research_models.jpg" />
  </Frame>

  Learn more about [Chat API Research Models](/chat-api/chat-quickstart#choosing-the-right-model).
</Update>

<Update label="January 6, 2026">
  ## After date filter for Search API

  Queries to the Parallel Search API can now be modified with a new “after\_date” parameter in "source\_policy", for limiting results to pages published after a specific date provided as an RFC 3339 date string (YYYY-MM-DD).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/oS_d6IyK6aJ4ryZe/images/Search_api_after_date.png?fit=max&auto=format&n=oS_d6IyK6aJ4ryZe&q=85&s=bc0eff15a0fa8ef45bd42a75bb1f8d3c" width="2424" height="1290" data-path="images/Search_api_after_date.png" />
  </Frame>

  Learn more about [Source Policy](/resources/source-policy#configuration).
</Update>

<Update label="December 16, 2025">
  ## Granular Basis now available for the Task API

  The Basis verification framework now offers granular depth for fields with arrays.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/w93JKHUT1jwqYstk/images/Granular-basis.jpg?fit=max&auto=format&n=w93JKHUT1jwqYstk&q=85&s=480b65f54c704808b6b656d95033eed8" width="5396" height="3240" data-path="images/Granular-basis.jpg" />
  </Frame>

  Previously, Basis verified arrays as a whole: one set of citations, reasoning, excerpts, and calibrated confidences score for an entire list.

  Now every item within the array gets its own complete verification.

  Learn more about [Basis](/task-api/guides/access-research-basis#basis).
</Update>

<Update label="December 10, 2025">
  ## Latency improvements for the Parallel Task API

  Fast Processors trade-off data freshness for speed, for situations where information recency isn’t as critical as latency.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/8bfHBJVDcNepRUSJ/images/Fast-processors.png?fit=max&auto=format&n=8bfHBJVDcNepRUSJ&q=85&s=3afd0e12eb1eadc3e9c9a3d3b946187c" width="1502" height="1242" data-path="images/Fast-processors.png" />
  </Frame>

  With these new processors, you can expect 3-5x faster response times compared to standard processors for the same tier. This makes fast processors ideal for interactive applications where users are waiting for results vs. truly asynchronous or autonomous applications.

  Learn more about [Processors](/task-api/guides/choose-a-processor).
</Update>

<Update label="December 5, 2025">
  ## New integrations

  Parallel now integrates with popular AI frameworks and automation platforms:

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/Y3TblzTpcZkMUA6L/images/integration_logos_2025_12_05.jpg?fit=max&auto=format&n=Y3TblzTpcZkMUA6L&q=85&s=6f5e9b3eb4b21fd761276dee0bd408ad" width="2400" height="1350" data-path="images/integration_logos_2025_12_05.jpg" />
  </Frame>

  * **LangChain**: Build AI agents with Parallel's web research capabilities using the LangChain framework
  * **Vercel AI SDK**: Add real-time web research to your Next.js and React applications
  * **Zapier**: Connect Parallel to 6,000+ apps with no-code automation workflows
  * **n8n**: Self-host automation workflows with Parallel's APIs
  * **Google Sheets**: Import web research results directly into spreadsheets

  Get started with our [integration guides](/integrations/gsuite).
</Update>

<Update label="November 20, 2025">
  ## Parallel Extract API

  Parallel Extract is now available in beta. Enter URLs and get back LLM-ready page extractions in markdown format.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zpPSWtPX3x1I-iGV/images/ExtractAPI.png?fit=max&auto=format&n=zpPSWtPX3x1I-iGV&q=85&s=c8785ce6dcbe4b38a1cc71f5d0d30165" width="2914" height="1912" data-path="images/ExtractAPI.png" />
  </Frame>

  By granting agents access to Parallel Extract, they gain the option to view entire page contents as needed when conducting research, or if explicitly requested by an end user.

  Extract supports two modes:

  * Compressed excerpts: Semantically filtered content based on search objective
  * Full content extraction: Complete page contents in markdown format

  To learn more about Extract, read the launch [blog](https://parallel.ai/blog/introducing-parallel-extract).
</Update>

<Update label="November 18, 2025">
  ## Parallel FindAll API

  Parallel FindAll is now available in beta. Use it to create custom datasets from the web using natural language queries.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zpPSWtPX3x1I-iGV/images/FindAllAPI.png?fit=max&auto=format&n=zpPSWtPX3x1I-iGV&q=85&s=a14f3fd750e94b909a9581c0af8d84bd" width="3278" height="1948" data-path="images/FindAllAPI.png" />
  </Frame>

  FindAll finds any set of entities (companies, people, events, locations, houses, etc.) based on a set of match criteria. For example, with FindAll, you can run a natural language query like "Find all dental practices located in Ohio that have 4+ star Google reviews."

  Here's how it works:

  * Finds entities (companies, people, events, locations) matching specified criteria
  * Evaluates candidates against match conditions using multi-hop reasoning
  * Enriches matched entities with structured data via Task API
  * Returns results with citations, reasoning, excerpts, and confidence scores via Basis framework

  To learn more about FindAll, read the launch [blog](https://parallel.ai/blog/introducing-findall-api).
</Update>

<Update label="November 13, 2025">
  ## Parallel Monitor API alpha

  The Parallel Monitor API is now available in public alpha. Monitor flips traditional web search from pull to push. Instead of repeatedly querying for updates, you define a query once and receive notifications whenever new related information appears online.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/UtZ_GwfSXpAoohI8/images/MonitorAPI.jpg?fit=max&auto=format&n=UtZ_GwfSXpAoohI8&q=85&s=b3be52fab48cb793958b0800b6fa4aa1" width="1610" height="1060" data-path="images/MonitorAPI.jpg" />
  </Frame>

  Parallel Monitor allows you track changes on the web 24/7, with flexible frequency settings (e.g., `"1h"`, `"1d"`, `"1w"`). The Monitor API currently supports:

  * **Webhooks**: Receive updates when events are detected or when monitors finish a scheduled run
  * **Events history**: Retrieve updates from recent runs or via a lookback window (e.g., 10d)
  * **Lifecycle management**: Update frequency, webhook, or metadata; delete to stop future runs

  Learn more in the announcement [blog](https://parallel.ai/blog/monitor-api).
</Update>

<Update label="November 6, 2025">
  ## Parallel Search API now generally available

  The Parallel Search API, built on our proprietary web index, is now generally available. It's the only web search tool designed from the ground up for AI agents: engineered to deliver the most relevant, token-efficient web data at the lowest cost. The result is more accurate answers, fewer round-trips, and lower costs for every agent.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/Yt3f4D5_zf7G3aSt/images/SearchAPI-Launch-11-25.jpg?fit=max&auto=format&n=Yt3f4D5_zf7G3aSt&q=85&s=035e2d432cfcbfbb295ed026d4c2d3a3" width="2400" height="1350" data-path="images/SearchAPI-Launch-11-25.jpg" />
  </Frame>

  Parallel Search achieves state-of-the-art scoring on benchmarks as a result of LLM-first design and feature-set:

  * **Semantic objectives** that capture intent beyond keyword matching, so agents can specify what they need to accomplish rather than guessing at search terms
  * **Token-relevance ranking** to prioritize webpages most directly relevant to the objective, not pages optimized for human engagement metrics
  * **Information-dense excerpts** compressed and prioritized for reasoning quality, so LLMs have the highest-signal tokens in their context window
  * **Single-call resolution** for complex queries that normally require multiple search hops

  To see the full benchmarks and learn more, read the announcement [blog](https://parallel.ai/blog/introducing-parallel-search).
</Update>

<Update label="November 3, 2025">
  ## Parallel Task API scores SOTA on SealQA

  Parallel has achieved state-of-the-art performance on the SEAL-0 and SEAL-HARD benchmarks, which evaluate how well search-augmented language models handle conflicting, noisy, and ambiguous real-world web data.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/Yt3f4D5_zf7G3aSt/images/Task-SealQA-11-25.jpg?fit=max&auto=format&n=Yt3f4D5_zf7G3aSt&q=85&s=9cdffedf99ed94c12fef36f47eadb71c" width="1868" height="1568" data-path="images/Task-SealQA-11-25.jpg" />
  </Frame>

  The Parallel Task API Processors outperformed commercial alternatives across all price tiers, with the Ultra8x Processor achieving 56.8% accuracy on SEAL-0 at 2400 CPM and 70.1% accuracy on SEAL-HARD at the same cost. At the value tier, the Pro Processor delivered 52.3% accuracy on SEAL-0 at 100 CPM, significantly outperforming competitors like Perplexity and Exa Research.

  For more information on SealQA or the Task API, read the [blog](https://parallel.ai/blog/benchmarks-task-api-sealqa).
</Update>

<Update label="October 16, 2025">
  ## Parallel Task MCP Server

  The Task MCP Server uses a first-of-its-kind async architecture that lets agents start research tasks and continue executing other work without blocking.
  This is critical for production agents handling complex workflows— start a deep research task on competitor analysis, move on to enriching a prospect list, then retrieve the research results when complete.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=526e971190b822f84a90e219b50dff03" width="1754" height="1334" data-path="images/TaskMCP.png" />
  </Frame>

  The Task MCP Server can be useful for professionals who want to bring the power of Parallel's Tasks to their preferred MCP client, or for developers who are building with Parallel Tasks.

  Learn more in the release [blog](https://parallel.ai/blog/parallel-task-mcp-server).
</Update>

<Update label="October 12, 2025">
  ## Core2x Processor

  The new Core2x processor is now available for the task API. Core2x bridges the gap between Core and Pro processors for better cost control on Task runs.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=66bea977ba0cd07ae391f8460b0d6499" width="2400" height="1350" data-path="images/Core2x.jpg" />
  </Frame>

  Use Core2x for:

  * Cross-validation across multiple sources without deep research level exploration
  * Moderately complex synthesis where Core might fall short
  * Structured outputs with 10 fields requiring verification
  * Production workflows where Pro's compute budget exceeds requirements

  Learn more in the release [blog](https://parallel.ai/blog/core2x-processor).
</Update>

<Update label="October 6, 2025">
  ## Enhanced Basis features across all Processors

  All Task API processors now provide complete basis verification with Citations, Reasoning, Confidence scores, and Excerpts. Previously, `lite` and `base` processors only included Citations and Reasoning, while `core` and higher tiers provided the full feature set. This enhancement enables comprehensive verification and transparency across all processor tiers, making it easier to validate research quality regardless of which processor you choose.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=b345352053cc65fd0aefb1a6b4fa9efd" width="1200" height="675" data-path="images/BasisOnEveryProcessor.png" />
  </Frame>

  With this update, even the most cost-effective `lite` processor now returns:

  * **Citations**: Web URLs linking to source materials
  * **Reasoning**: Detailed explanations for each output field
  * **Confidence**: Calibrated reliability ratings (high/medium/low)
  * **Excerpts**: Relevant text snippets from citation sources

  This improvement supports more effective hybrid AI/human review workflows at every price point.

  Learn more in the release [blog](https://parallel.ai/blog/full-basis-framework-for-task-api).
</Update>

<Update label="September 16, 2025">
  ## TypeScript SDK

  The Parallel TypeScript SDK is now generally available for the Task and Search API - providing complete type definitions, built in retries, timeouts, and error handling, and custom fetch client support. Learn more in our latest [blog](https://parallel.ai/blog/typescript-sdk).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=1bcca7327530a0c7300bffe437730acd" width="4800" height="2700" data-path="images/typescript_sdk.png" />
  </Frame>
</Update>

<Update label="September 11, 2025">
  ## Deep Research Reports

  Parallel Tasks now support comprehensive markdown Deep Research report generation. Every Deep Research report generated by Parallel comes with in-line citations and relevant source excerpts for full verifiability. Simply enable `output_schema: text` to get started. Learn more in our latest [blog](https://parallel.ai/blog/deep-research-reports).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=78b6a232db017cdf70151404bec13285" width="4800" height="2700" data-path="images/text_schema_mode.png" />
  </Frame>
</Update>

<Update label="September 9, 2025">
  ## Expanded Deep Research Benchmarks

  Today we are releasing expanded results that demonstrate the complete price-performance advantage of Parallel Deep Research - delivering the highest accuracy across every price point.

  On Browsecomp:

  * Parallel Ultra achieves 45% accuracy at up to 17X lower cost
  * Ultra8x achieves state-of-the-art results at 58% accuracy

  On DeepResearch Bench:

  * Parallel Ultra achieves an 82% win rate against reference compared to GPT-5 at 66%, while being half the cost
  * Ultra8x achieves a 96% win rate

  Learn more in our latest [blog](https://parallel.ai/blog/deep-research-benchmarks).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=3b0f7c236944d06bcf020b7d9c33bcbd" width="1634" height="1242" data-path="images/deepresearch_bench_09092025.png" />
  </Frame>
</Update>

<Update label="August 21, 2025">
  ## Webhooks for Tasks

  Webhooks are now available for Parallel Tasks. When you're orchestrating hundreds or thousands of long-running web research tasks, webhooks push real-time notifications to your endpoint as tasks complete. This eliminates the need for constant polling. Learn more in our latest [blog](https://parallel.ai/blog/webhooks).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=21e6632bbd36365a1a23d0df9e34ccc3" width="4800" height="2700" data-path="images/webhooks.png" />
  </Frame>
</Update>

<Update label="August 14, 2025">
  ## Deep Research Benchmarks

  Today, we’re announcing that Parallel is the only AI system to outperform both humans and leading AI models like GPT-5 on the most rigorous benchmarks for deep web research. Our APIs are now broadly available, bringing production-grade web intelligence to any AI agent, application, or workflow. Learn more in our latest [blog](https://parallel.ai/blog/introducing-parallel).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.gif?s=33ba91406cb233f9b08d28de86a268ee" width="1154" height="812" data-path="images/browsecomp.gif" />
  </Frame>
</Update>

<Update label="August 7, 2025">
  ## Server-Sent Events for Tasks

  Server-Sent Events are now available for Parallel Task API runs. SSE delivers live progress updates, model reasoning, and status changes as tasks execute. Learn more in our latest [blog](https://parallel.ai/blog/sse-for-tasks).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3f3608a67712ce78a6fa43193dd1d9ce" width="4800" height="2700" data-path="images/SSE.png" />
  </Frame>
</Update>

<Update label="August 5, 2025">
  ## New advanced deep research Processors

  New advanced processors are now available with Parallel Tasks, giving you granular control over compute allocation for critical research workflows. Last month, we demonstrated that accuracy scales consistently with compute budget on BrowseComp, achieving 39% and 48% accuracy with 2x and 4x compute respectively. These processors are now available as `ultra2x` and `ultra4x`, alongside our most advanced processor yet - `ultra8x`. Learn more in our latest [blog](https://parallel.ai/blog/new-advanced-processors).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=acadd44852d80dbfb3d6376be9c10ab6" width="4800" height="2700" data-path="images/advanced_processors_image.png" />
  </Frame>
</Update>

<Update label="August 4, 2025">
  ## Auto Mode in Parallel Tasks

  Parallel Tasks now support Auto Mode, enabling one-off web research queries without requiring explicit output schemas. Simply ask a question. Our processors will then conduct research and generate a structured output schema for you. Learn more in our latest [blog](https://parallel.ai/blog/task-api-auto-mode).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=54c7eb1e71ebffcd7fb7c332afc3838e" width="4800" height="2700" data-path="images/auto_mode_image.png" />
  </Frame>
</Update>

<Update label="July 31, 2025">
  ## State-of-the-art Search API benchmarks

  The Parallel Web Tools MCP Server, built on the same infrastructure as the Parallel Search API, demonstrates superior performance on the WISER-Search benchmark while being up to 50% cheaper. Learn more in our latest [blog](https://parallel.ai/blog/search-api-benchmark).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=efe86fb372fcf7e6a78d77d64817eb13" width="1535" height="1230" data-path="images/search_eval.png" />
  </Frame>

  ## Parallel Web Tools MCP server in Devin

  The Parallel Web Tools MCP Server is now live in [Devin’s MCP Marketplace](https://docs.devin.ai/work-with-devin/mcp), bringing high quality web research capabilities directly to the AI software engineer. With a web-aware Devin, you can ask Devin to search online forums to debug code, linear from online codebases, and research APIs. Learn more in our latest [blog](https://parallel.ai/blog/parallel-search-mcp-in-devin).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ca6a7703dd5b14e8f348d4c917138167" width="2276" height="1280" data-path="images/devin.png" />
  </Frame>
</Update>

<Update label="July 28, 2025">
  ## Tool calling via MCP servers

  Parallel Tasks now support Tool Calling via MCP Servers. With a single API call, you can choose to expose tools hosted on external MCP-compatible servers and invoke them through the Task API. This allows Parallel agents to reach out to private databases, code execution sandboxes, or proprietary APIs - without custom orchestrators or standalone MCP clients. Learn more in our latest [blog](https://parallel.ai/blog/mcp-tool-calling).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=61bf69221d5956b70762ab6581660d87" width="4800" height="2880" data-path="images/tool_calling.png" />
  </Frame>
</Update>

<Update label="July 14, 2025">
  ## The Parallel Web Tools MCP Server

  The Parallel Web Tools MCP Server is now generally available, making our Search API instantly accessible to any MCP-aware model as a drop-in tool. This hosted endpoint takes flexible natural language objectives as inputs and provides AI-native search results with extended webpage excerpts. Built on Parallel's proprietary web infrastructure, it offers plug-and-play compatibility with OpenAI, Anthropic, and other MCP clients at production scale. [Learn More](https://parallel.ai/blog/search-mcp-server).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/searchmcp.gif?s=02d19a6f6b819caa441f901c7e627f2c" width="1708" height="1080" data-path="images/searchmcp.gif" />
  </Frame>
</Update>

<Update label="July 8, 2025">
  ## Source Policy for Task API and Search API

  Source Policy is now available for both Parallel Tasks and Search API - giving you granular control over which sources your AI agents access and how results are prioritized. Source Policy lets you define exactly which domains your research should include or exclude. Learn more in our latest [blog](https://parallel.ai/blog/source-policy).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3f47641fcc29fa88085b0fdee6b86a07" width="1200" height="675" data-path="images/source_policy.png" />
  </Frame>
</Update>

<Update label="July 2, 2025">
  ## Task Group API in beta

  Today we're launching the Task Group API in public beta for large-scale web research workloads. When your pipeline needs hundreds or thousands of independent Parallel Tasks, the new Group API wraps operations into a single batch with unified monitoring, intelligent failure handling, and real-time results streaming. These batch operations are ideal for bulk CRM enrichment, due diligence, or competitive intelligence workflows. Learn more in our latest [blog](https://parallel.ai/blog/task-group-api).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7c46da0757b8e781460cb2a8c17c440b" width="1200" height="675" data-path="images/task_group.png" />
  </Frame>
</Update>

<Update label="June 17, 2025">
  ## State of the art Deep Research APIs

  Parallel Task API processors achieve state-of-the-art performance on [BrowseComp](https://openai.com/index/browsecomp/), a challenging benchmark built by OpenAI to test web search agents' deep research capabilities. Our best processor (`ultra`) reaches 27% accuracy, outperforming human experts and all commercially available web search and deep research APIs - while being significantly cheaper. Learn more in our latest [blog](https://parallel.ai/blog/deep-research).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8595423625a7a4d21b3bd1f690de7216" width="1480" height="1180" data-path="images/browsecomp.png" />
  </Frame>
</Update>

<Update label="August 05, 2025">
  ## Search API in beta

  The Parallel Search API is now available in beta - providing a tool for AI agents to search, rank, and extract information from the public web. Built on Parallel’s custom web crawler and index, the Search API takes flexible inputs (search objective and/or search queries) and returns LLM-ready ranked URLs with extended webpage excerpts. Learn more in our latest [blog](https://parallel.ai/blog/parallel-search-api).

  ```bash  theme={"system"}
  curl https://api.parallel.ai/v1beta/search \
    -H "Content-Type: application/json" \
    -H "x-api-key: ${PARALLEL_API_KEY}" \
    -d '{
      "objective": "When was the United Nations established? Prefer UN'\''s websites.",
      "search_queries": [
        "Founding year UN",
        "Year of founding United Nations"
      ],
      "processor": "base",
      "max_results": 5,
      "max_chars_per_result": 1500
    }'

  ```

  <Accordion title="Bugs (1)">
    * \[Platform] Fixed an issue where copy paste URL actions were incorrectly identified as copy paste CSV actions.
  </Accordion>
</Update>

<Update label="May 30, 2025">
  ## Chat API in beta

  Parallel Chat is now generally available in beta. The Chat API utilizes our rapidly growing web index to bring real-time low latency web research to interactive AI applications. It returns OpenAI ChatCompletions compatible streaming text and JSON outputs, and easily drops in to new and existing web research workflows. Learn more in our latest [blog](https://parallel.ai/blog/chat-api).

  ```python  theme={"system"}
  from openai import OpenAI

  client = OpenAI(
      api_key="PARALLEL_API_KEY",  # Your Parallel API key
      base_url="https://api.parallel.ai"  # Parallel's API endpoint
  )

  response = client.chat.completions.create(
      model="speed", # Parallel model name
      messages=[
          {"role": "user", "content": "What does Parallel Web Systems do?"}
      ],
      response_format={
          "type": "json_schema",
          "json_schema": {
              "name": "reasoning_schema",
              "schema": {
                  "type": "object",
                  "properties": {
                      "reasoning": {
                          "type": "string",
                          "description": "Think step by step to arrive at the answer",
                      },
                      "answer": {
                          "type": "string",
                          "description": "The direct answer to the question",
                      },
                      "citations": {
                          "type": "array",
                          "items": {"type": "string"},
                          "description": "Sources cited to support the answer",
                      },
                  },
              },
          },
      },
  )

  print(response.choices[0].message.content)
  ```

  <Accordion title="Bugs (1)">
    * \[Task API] Fixed an issue where the Task API was returning malformed schema formats.
  </Accordion>
</Update>

<Update label="May 21, 2025">
  ## Basis with Calibrated Confidences

  Basis is a comprehensive suite of verification tools for understanding and validating Task API outputs through four core components.

  1. **Citations**: Web URLs linking directly to source materials.
  2. **Reasoning**: Detailed explanations justifying each output field.
  3. **Excerpts**: Relevant text snippets from citation URLs.
  4. **Confidences:** A calibrated measure of confidence classified into low, medium, or high categories.

  Use Basis with Calibrated Confidences to power hybrid AI/human review workflows focused on low confidence outputs -  significantly increasing leverage, accuracy, and time efficiency. Read more in our latest [blog post](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences).

  ```json  theme={"system"}
  {
   "field": "revenue",
   "citations": [
     {
       "url": "https://www.microsoft.com/en-us/Investor/earnings/FY-2023-Q4/press-release-webcast",
       "excerpts": ["Microsoft reported fiscal year 2023 revenue of $211.9 billion, an increase of 7% compared to the previous fiscal year."]
     },
     {
       "url": "https://www.sec.gov/Archives/edgar/data/789019/000095017023014837/msft-20230630.htm",
       "excerpts": ["Revenue was $211.9 billion for fiscal year 2023, up 7% compared to $198.3 billion for fiscal year 2022."]
     }
   ],
   "reasoning": "The revenue figure is consistent across both the company's investor relations page and their official SEC filing. Both sources explicitly state the fiscal year 2023 revenue as $211.9 billion, representing a 7% increase over the previous year.",
   "confidence": "high"
  }
  ```

  ## Billing Upgrades

  We’ve made several improvements to help you more seamlessly manage and monitor Billing. This includes:

  * **Auto-reload**: Avoid service interruptions by automatically adding to your balance when configured thresholds are met.
  * **Billing History**: View prior Invoices and Receipts. Track status, amount charged, and timestamp of charges.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8164f2d96f40be59f26011ef2a55885e" width="810" height="461" data-path="images/billing_new.png" />
  </Frame>

  <br />

  <Accordion title="Bugs (1)">
    * \[Task API] Top-level output fields now correctly return null when appropriate, rather than lower-level fields returning empty string.
  </Accordion>

  <Accordion title="Improvements (2)">
    * \[Task API] Improved `pro` and `ultra` responses for length list-style responses.
    * \[Platform] The improved Parallel playground is now available by default at platform.parallel.ai/play instead of platform.parallel.ai/playground.
  </Accordion>
</Update>

<Update label="April 24, 2025">
  ## Task API for web research

  Parallel Tasks enables state-of-the-art web research at scale, with the highest quality at every price point. State your research task in natural language and Parallel will do the rest of the heavy lifting - generating input/output schemas, finding relevant URLs, extracting data in a structured format.

  ```bash  theme={"system"}
  from parallel import Parallel
  from pydantic import BaseModel, Field

  class ProductInfo(BaseModel):
      use_cases: str = Field(
          description="A few use cases for the product."
      )
      differentiators: str = Field(
          description="3 unique differentiators for the product as a bullet list."
      )
      benchmarks: str = Field(
          description="Detailed benchmarks of the product reported by the company."
      )

  client = Parallel()
  result = client.task_run.execute(
      input="Parallel Web Systems Task API",
      output=ProductInfo,
      processor="core"
  )

  print(f"Product info: {result.output.parsed.model_dump_json(indent=2)}\n")
  print(f"Basis: {'\n'.join([b.model_dump_json(indent=2) for b in result.output.basis])}")
  ```

  ## Python SDK

  Our SDK is now available for Python, making it easy to implement Parallel into your applications. The Python SDK is at parity with our Task API endpoints and simplifies request construction and response parsing.

  ## Flexible Processors

  When running Tasks with Parallel, choose between 5 processors - `lite`, `base`, `core`, `pro`, and `ultra`. We've built distinct processor options so that you can optimize price, latency, and quality per task.

  ## Self-Serve Developer Platform

  Platform is the home for Playground, API Keys, Docs, Billing, Usage, and more.

  * Run a research task from scratch or using a template from Task Library
  * Generate and manage API keys for secure integration
  * Manage billing details, auto-reload settings, and usage analytics
  * Access comprehensive guides to learn how to use the API

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=1ad32ba4ff5885fc5fa37245534dc8e6" width="1662" height="444" data-path="images/playground_textbar.png" />
  </Frame>
</Update>

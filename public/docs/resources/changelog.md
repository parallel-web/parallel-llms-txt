# Changelog

> Product updates from the Parallel team

<Update label="October 16, 2025">
  ## Parallel Task MCP Server

  The Task MCP Server uses a first-of-its-kind async architecture that lets agents start research tasks and continue executing other work without blocking.
  This is critical for production agents handling complex workflows— start a deep research task on competitor analysis, move on to enriching a prospect list, then retrieve the research results when complete.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=526e971190b822f84a90e219b50dff03" data-og-width="1754" width="1754" data-og-height="1334" height="1334" data-path="images/TaskMCP.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=280&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=db8da9d43fe781989672bc1736e802cc 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=560&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=a435701faf84df8c1da7bbbc3512935c 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=840&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=bf506b562ba47feb4dd857dc9c0f3bc3 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=1100&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=5002835a31475e44a0fa47fb0007e34a 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=1650&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=6c3abaeec6e657d684b2c7534b2f9282 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/TaskMCP.png?w=2500&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=08f9234a549d631ef52b7a2384fc8cf3 2500w" />
  </Frame>

  The Task MCP Server can be useful for professionals who want to bring the power of Parallel's Tasks to their preferred MCP client, or for developers who are building with Parallel Tasks.

  Learn more in the release [blog](https://parallel.ai/blog/parallel-task-mcp-server).
</Update>

<Update label="October 12, 2025">
  ## Core2x Processor

  The new Core2x processor is now available for the task API. Core2x bridges the gap between Core and Pro processors for better cost control on Task runs.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=66bea977ba0cd07ae391f8460b0d6499" data-og-width="2400" width="2400" data-og-height="1350" height="1350" data-path="images/Core2x.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=280&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=cb6cc7c8558451952afdd45a4507c579 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=560&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=378060010642a7938174ada58610a692 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=840&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=f0716b5bba63a080ac335ced738abc30 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=1100&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=7f96cd247635db6ec2772eac6df78c29 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=1650&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=f68431159c0df8cf143e338c00b80299 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/Core2x.jpg?w=2500&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=cb08b44da8df7b98b583f4f278176396 2500w" />
  </Frame>

  Use Core2x for:

  * Cross-validation across multiple sources without deep research level exploration
  * Moderately complex synthesis where Core might fall short
  * Structured outputs with 10 fields requiring verification
  * Production workflows where Pro's compute budget exceeds requirements

  Learn more in the release [blog](https://parallel.ai/blog/core2x-processor).
</Update>

<Update label="October 6, 2025">
  ## Enhanced Basis Features Across All Processors

  All Task API processors now provide complete basis verification with Citations, Reasoning, Confidence scores, and Excerpts. Previously, `lite` and `base` processors only included Citations and Reasoning, while `core` and higher tiers provided the full feature set. This enhancement enables comprehensive verification and transparency across all processor tiers, making it easier to validate research quality regardless of which processor you choose.

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=b345352053cc65fd0aefb1a6b4fa9efd" data-og-width="1200" width="1200" data-og-height="675" height="675" data-path="images/BasisOnEveryProcessor.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=280&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=739af4644dfdabd86d0e0a896c57580f 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=560&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=2f5457473e37cbf93a26c925ec967d6b 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=840&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=b092abdb3a4eddf1404b6207b33c137f 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=1100&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=219b2a30c4d691c4c404a8013fc9c1fa 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=1650&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=986354c74930f7231ecff9fcd3ec2fe4 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/aH1woOKNQFjy0w-h/images/BasisOnEveryProcessor.png?w=2500&fit=max&auto=format&n=aH1woOKNQFjy0w-h&q=85&s=c9288133eb0f0b02e56bc371b9c5ef2c 2500w" />
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
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=1bcca7327530a0c7300bffe437730acd" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/typescript_sdk.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=280&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=29eb7f4840e2b63d4a2c1caa2293161f 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=560&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=deedede391f8e08d30614afbdc516729 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=840&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=61b92873f71561016841b8c9127f5837 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=1100&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=d5c03eea227e709d427a580ca6590533 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=1650&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=b74e78dcb52f57fb3efc4c6805f85aa7 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/LhJmXxhdkc-MMUPF/images/typescript_sdk.png?w=2500&fit=max&auto=format&n=LhJmXxhdkc-MMUPF&q=85&s=0d0a858aa2c1048752529ca2dc6f63b3 2500w" />
  </Frame>
</Update>

<Update label="September 11, 2025">
  ## Deep Research Reports

  Parallel Tasks now support comprehensive markdown Deep Research report generation. Every Deep Research report generated by Parallel comes with in-line citations and relevant source excerpts for full verifiability. Simply enable `output_schema: text` to get started. Learn more in our latest [blog](https://parallel.ai/blog/deep-research-reports).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=78b6a232db017cdf70151404bec13285" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/text_schema_mode.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=280&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=ddcdc2ed52d47527fbb38c8623ba2dc1 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=560&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=66aae3d875833504f3ede7bb436aaf17 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=840&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=d4a81cec22d7a58fe651ab2ebd929b5b 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=1100&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=f19cc9c47719f13a239c293422b2b23b 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=1650&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=5a6a886a1bdb5fcd4a00efef5cc675aa 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/text_schema_mode.png?w=2500&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=6cb351b7e256ae5a6a181f2a1f75e200 2500w" />
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
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=3b0f7c236944d06bcf020b7d9c33bcbd" data-og-width="1634" width="1634" data-og-height="1242" height="1242" data-path="images/deepresearch_bench_09092025.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=280&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=ccfdd581b8641298cdea7e27c3cd637d 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=560&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=47764a90b2cc6ef03ba3cefce48d8e30 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=840&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=b25e05c0400f062d0b38efb4b1557d48 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=1100&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=7e27f8c281e7e1d2e45686cef98621de 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=1650&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=d9563d2c7dad6b86d321b293d8206e7e 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/ztwz6BC2b9L2XNUC/images/deepresearch_bench_09092025.png?w=2500&fit=max&auto=format&n=ztwz6BC2b9L2XNUC&q=85&s=f1313422aeb0e9aed05bfbbbe2a577f6 2500w" />
  </Frame>
</Update>

<Update label="August 21, 2025">
  ## Webhooks for Tasks

  Webhooks are now available for Parallel Tasks. When you're orchestrating hundreds or thousands of long-running web research tasks, webhooks push real-time notifications to your endpoint as tasks complete. This eliminates the need for constant polling. Learn more in our latest [blog](https://parallel.ai/blog/webhooks).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=21e6632bbd36365a1a23d0df9e34ccc3" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/webhooks.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7d8e9386f460b673f6682d65cad94048 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ec116091866e948e9e392787f29e5509 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=2a2f9b6f801809ab1c80f8726549a5f7 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=2371208f7bad1b36aabf95ab5e34ae3d 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=67413853bd757927865315ac28303580 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/webhooks.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=c3193aaedbb0ec36e62ee5b73b6ac90e 2500w" />
  </Frame>
</Update>

<Update label="August 14, 2025">
  ## Deep Research Benchmarks

  Today, we’re announcing that Parallel is the only AI system to outperform both humans and leading AI models like GPT-5 on the most rigorous benchmarks for deep web research. Our APIs are now broadly available, bringing production-grade web intelligence to any AI agent, application, or workflow. Learn more in our latest [blog](https://parallel.ai/blog/introducing-parallel).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.gif?s=33ba91406cb233f9b08d28de86a268ee" data-og-width="1154" width="1154" data-og-height="812" height="812" data-path="images/browsecomp.gif" data-optimize="true" data-opv="3" />
  </Frame>
</Update>

<Update label="August 7, 2025">
  ## Server-Sent Events for Tasks

  Server-Sent Events are now available for Parallel Task API runs. SSE delivers live progress updates, model reasoning, and status changes as tasks execute. Learn more in our latest [blog](https://parallel.ai/blog/sse-for-tasks).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3f3608a67712ce78a6fa43193dd1d9ce" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/SSE.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=071c3482e53905d7871e04fbf96a678d 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=b7804276e8865ce0666a42ee07ae5646 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7dfe5c53ac4bccc4a6b7645033512702 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=f8aaa3b0837ef9b85861b232c3037689 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=0c7031d010b713c7a1fafa9c872c614c 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/SSE.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=80ffa7eb776171878e396da37565c904 2500w" />
  </Frame>
</Update>

<Update label="August 5, 2025">
  ## New advanced deep research processors

  New advanced processors are now available with Parallel Tasks, giving you granular control over compute allocation for critical research workflows. Last month, we demonstrated that accuracy scales consistently with compute budget on BrowseComp, achieving 39% and 48% accuracy with 2x and 4x compute respectively. These processors are now available as `ultra2x` and `ultra4x`, alongside our most advanced processor yet - `ultra8x`. Learn more in our latest [blog](https://parallel.ai/blog/new-advanced-processors).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=acadd44852d80dbfb3d6376be9c10ab6" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/advanced_processors_image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=b1d8406f3cb7179b85ee45c081374ff4 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=86bd615a29283eca8ef73abe536d407d 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=9032753f8a55e7d3214f62d7c648ff24 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=c19d40d4f0e8ac4d7b6c6f5b34a70584 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=34d098bc3266f898f32c3e2629acbc28 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/advanced_processors_image.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=75ba0fcf73beaf137e5f74aae173e95d 2500w" />
  </Frame>
</Update>

<Update label="August 4, 2025">
  ## Auto Mode in Parallel Tasks

  Parallel Tasks now support Auto Mode, enabling one-off web research queries without requiring explicit output schemas. Simply ask a question. Our processors will then conduct research and generate a structured output schema for you. Learn more in our latest [blog](https://parallel.ai/blog/task-api-auto-mode).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=54c7eb1e71ebffcd7fb7c332afc3838e" data-og-width="4800" width="4800" data-og-height="2700" height="2700" data-path="images/auto_mode_image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3a508b21961b5c0e8ce6a776871d5720 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=fc9ba85752fa9c6d5c12b99cdfccfe50 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ca425a72e4b5b0911c56764b6b049fcc 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=e02b3a3992f8d4fce32bb12fc40c5536 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=44000fcbadc9feb4f6ba6366ef7709b6 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/auto_mode_image.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=0702be294eb251f05ec76ef7cf6f0da6 2500w" />
  </Frame>
</Update>

<Update label="July 31, 2025">
  ## State-of-the-art Search API benchmarks

  The Parallel WebTools MCP Server, built on the same infrastructure as the Parallel Search API, demonstrates superior performance on the WISER-Search benchmark while being up to 50% cheaper. Learn more in our latest [blog](https://parallel.ai/blog/search-api-benchmark).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=efe86fb372fcf7e6a78d77d64817eb13" data-og-width="1535" width="1535" data-og-height="1230" height="1230" data-path="images/search_eval.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=e11bb251ba712bed5b27219f81cdf903 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=f8a58272390d3d287e8d5aa13449dbe4 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=48c14137b9e61433a9b3d5898bbc93fe 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=f8e31be5e336fa43d5597f80befdfe9a 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=fec40ea2155a8addb9fd6f7a570e6c11 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/search_eval.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=a28a840f661a570f69d124c516977ddc 2500w" />
  </Frame>

  ## Parallel WebTools MCP Server in Devin

  The Parallel WebTools MCP Server is now live in [Devin’s MCP Marketplace](https://docs.devin.ai/work-with-devin/mcp), bringing high quality web research capabilities directly to the AI software engineer. With a web-aware Devin, you can ask Devin to search online forums to debug code, linear from online codebases, and research APIs. Learn more in our latest [blog](https://parallel.ai/blog/parallel-search-mcp-in-devin).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ca6a7703dd5b14e8f348d4c917138167" data-og-width="2276" width="2276" data-og-height="1280" height="1280" data-path="images/devin.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ba8c86f6b2211679200c5086493bc198 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=fadd865d97b14d8e7328a300db63337c 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ddd1351b7c5a6a9c119a9ffe55b645a1 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=edae6840d2d4354fd2aa3f18c940c1bc 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=5bb96f89acb095afc15f1c3b9a1e4c04 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/devin.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=175ae787abda603d7567209da03d6b77 2500w" />
  </Frame>
</Update>

<Update label="July 28, 2025">
  ## Tool Calling via MCP Servers

  Parallel Tasks now support Tool Calling via MCP Servers. With a single API call, you can choose to expose tools hosted on external MCP-compatible servers and invoke them through the Task API. This allows Parallel agents to reach out to private databases, code execution sandboxes, or proprietary APIs - without custom orchestrators or standalone MCP clients. Learn more in our latest [blog](https://parallel.ai/blog/mcp-tool-calling).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=61bf69221d5956b70762ab6581660d87" data-og-width="4800" width="4800" data-og-height="2880" height="2880" data-path="images/tool_calling.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=5f7be89840834bf5fe4531a5d8bf89dc 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=107b5a7f5880154d0dae61f2b9456082 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=25f3019a6a654c73e3785943f9bded69 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=9e40333d5e3840ba8732a0f32a4bb257 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=4f190f4f023f08a759de0be395f79ee0 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/tool_calling.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8201d5141cca6f46a93f2e71accc949a 2500w" />
  </Frame>
</Update>

<Update label="July 14, 2025">
  ## The Parallel WebTools MCP Server

  The Parallel WebTools MCP Server is now generally available, making our Search API instantly accessible to any MCP-aware model as a drop-in tool. This hosted endpoint takes flexible natural language objectives as inputs and provides AI-native search results with extended webpage excerpts. Built on Parallel's proprietary web infrastructure, it offers plug-and-play compatibility with OpenAI, Anthropic, and other MCP clients at production scale. [Learn More](https://parallel.ai/blog/search-mcp-server).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/searchmcp.gif?s=02d19a6f6b819caa441f901c7e627f2c" data-og-width="1708" width="1708" data-og-height="1080" height="1080" data-path="images/searchmcp.gif" data-optimize="true" data-opv="3" />
  </Frame>
</Update>

<Update label="July 8, 2025">
  ## Source Policy for Task API and Search API

  Source Policy is now available for both Parallel Tasks and Search API - giving you granular control over which sources your AI agents access and how results are prioritized. Source Policy lets you define exactly which domains your research should include or exclude. Learn more in our latest [blog](https://parallel.ai/blog/source-policy).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3f47641fcc29fa88085b0fdee6b86a07" data-og-width="1200" width="1200" data-og-height="675" height="675" data-path="images/source_policy.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=07a4efa44af2b8c34ad161ae16c4384d 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7e061be915205ea14125282d2cf41866 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=048ac5534cd9e3fb509a58f9fd73be44 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=46629dc103dd0ebca1b091045db33be1 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=02b50b12bf8d261b44c6c3179ad1a7e7 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/source_policy.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=49fc22075ecd4d35c1115b2a7f03387b 2500w" />
  </Frame>
</Update>

<Update label="July 2, 2025">
  ## Task Group API in beta

  Today we're launching the Task Group API in public beta for large-scale web research workloads. When your pipeline needs hundreds or thousands of independent Parallel Tasks, the new Group API wraps operations into a single batch with unified monitoring, intelligent failure handling, and real-time results streaming. These batch operations are ideal for bulk CRM enrichment, due diligence, or competitive intelligence workflows. Learn more in our latest [blog](https://parallel.ai/blog/task-group-api).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7c46da0757b8e781460cb2a8c17c440b" data-og-width="1200" width="1200" data-og-height="675" height="675" data-path="images/task_group.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8238d7dbd3377054b20fffded94b7902 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=768a1e0a3265bebf51dcb367e2226b2e 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=6d4cf2ab450959264d08731221340e81 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7d88dd91a17beccf383ffe1f7fdedfbd 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=b88ff77bc50d8b3b554c618e2dcf2633 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/task_group.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=783656904d86c957d34986f207bf4f24 2500w" />
  </Frame>
</Update>

<Update label="June 17, 2025">
  ## State of the Art Deep Research APIs

  Parallel Task API processors achieve state-of-the-art performance on [BrowseComp](https://openai.com/index/browsecomp/), a challenging benchmark built by OpenAI to test web search agents' deep research capabilities. Our best processor (`ultra`) reaches 27% accuracy, outperforming human experts and all commercially available web search and deep research APIs - while being significantly cheaper. Learn more in our latest [blog](https://parallel.ai/blog/deep-research).

  <Frame>
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8595423625a7a4d21b3bd1f690de7216" data-og-width="1480" width="1480" data-og-height="1180" height="1180" data-path="images/browsecomp.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=3b5473afad1c61b1c89d7a84ac4bd341 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=ff6d972abb3e98d76a0c534160834d61 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=bbbfcd41adfd2b739b3638637efe605e 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=01a235fbbf14622505cf78693eeb4969 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=70eeb28870e60b1140a92c5d75a4d7cb 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/browsecomp.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=4cd8638282c2fcbf0e2eb7500aeef382 2500w" />
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
      base_url="https://api.parallel.ai"  # Parallel's API beta endpoint
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
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=8164f2d96f40be59f26011ef2a55885e" data-og-width="810" width="810" data-og-height="461" height="461" data-path="images/billing_new.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=6e794df43cb528e2cff32307fd9a7d5b 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=d9e67c31d88cf77f3e516e2198165ba7 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=0bd23fbf8442cb9bc99c7e4d709c780e 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=5414ef8ed24cbba456767ad98d738d8e 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=e80781b643624040f9154f020027e1d2 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/billing_new.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=35365a15df55e52bc1ec591046abd913 2500w" />
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
    <img src="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=1ad32ba4ff5885fc5fa37245534dc8e6" data-og-width="1662" width="1662" data-og-height="444" height="444" data-path="images/playground_textbar.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=280&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7f07859c0873dcd3e5892123fba0cd0a 280w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=560&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=7f8ad031bc17ccb5d6697a9d27ce945b 560w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=840&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=578d272b13c9de4e7d3dd5a795c9deaa 840w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=1100&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=224a5f09710a2dfdc8d37f52e3e5c9ad 1100w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=1650&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=e2a527552a80c4d86271bb022f4ddc01 1650w, https://mintcdn.com/parallel-6fabab31-mtje7p526we/zU3cvKYkKDRRiF_P/images/playground_textbar.png?w=2500&fit=max&auto=format&n=zU3cvKYkKDRRiF_P&q=85&s=116e92ffb6e599dfd1f7f2c3b9962e17 2500w" />
  </Frame>
</Update>

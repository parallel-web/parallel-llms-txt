> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Explore Parallel's web API products for building intelligent applications.

export const PanelHeader = ({panelId}) => {
  const META = {
    search: {
      filename: "search-api-quickstart",
      viewDocsHref: "/search/search-quickstart",
      viewDocsLabel: "View search docs"
    },
    extract: {
      filename: "extract-api-quickstart",
      viewDocsHref: "/extract/extract-quickstart",
      viewDocsLabel: "View extract docs"
    },
    research: {
      filename: "deep-research-quickstart",
      viewDocsHref: "/task-api/examples/task-deep-research",
      viewDocsLabel: "View deep research docs"
    },
    enrich: {
      filename: "enrichment-quickstart",
      viewDocsHref: "/task-api/task-quickstart",
      viewDocsLabel: "View enrichment docs"
    },
    monitor: {
      filename: "monitor-api-quickstart",
      viewDocsHref: "/monitor-api/monitor-quickstart",
      viewDocsLabel: "View monitor docs"
    },
    findall: {
      filename: "findall-quickstart",
      viewDocsHref: "/findall-api/findall-quickstart",
      viewDocsLabel: "View findall docs"
    }
  };
  const meta = META[panelId];
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (typeof document === 'undefined' || !navigator.clipboard) return;
    const panel = document.getElementById(`panel-${panelId}`);
    if (!panel) return;
    const pre = panel.querySelector('pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  if (!meta) return null;
  return <div className="flex items-center justify-between gap-3 bg-[#f6f6f6] dark:bg-[#1a1a1a] px-3 sm:px-4 py-2">
      <span className="hidden sm:inline font-mono text-[13px] text-[#181818] dark:text-gray-200 truncate">
        {meta.filename}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        <a href={meta.viewDocsHref} className="inline-flex items-center justify-center rounded-md border border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-transparent px-3 py-2 text-[13px] font-medium text-[#181818] dark:text-gray-200 transition hover:border-[#FB631B] hover:text-[#FB631B]">
          {meta.viewDocsLabel}
        </a>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-md bg-[#434343] hover:bg-[#2a2a2a] px-3 py-2 text-[13px] font-medium text-white transition">
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <rect x="3.5" y="3.5" width="6" height="6" rx="0.8" />
            <path d="M2 7.5V3.2A1.2 1.2 0 0 1 3.2 2h4.3" strokeLinecap="round" />
          </svg>
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
    </div>;
};

export const MCPInstallSection = () => {
  const [copied, setCopied] = useState(null);
  const tiles = [{
    id: 'claude-code',
    name: 'Claude Code',
    kind: 'Run in terminal',
    command: 'claude mcp add --transport http parallel-search https://search.parallel.ai/mcp',
    icon: <img src="/images/logos/claude-code-color-logo.svg" alt="Claude Code" className="h-8 w-8" />
  }, {
    id: 'codex',
    name: 'Codex',
    kind: 'Run in terminal',
    command: 'codex mcp add parallel-search --url https://search.parallel.ai/mcp',
    icon: <img src="/images/logos/codex-color-logo.svg" alt="Codex" className="h-8 w-8" />
  }, {
    id: 'cursor',
    name: 'Cursor',
    kind: 'One-click install',
    actionLabel: 'Add to Cursor',
    href: 'https://cursor.com/en/install-mcp?name=Parallel%20Search%20MCP&config=eyJ1cmwiOiJodHRwczovL3NlYXJjaC5wYXJhbGxlbC5haS9tY3AifQ==',
    icon: <>
          <img src="/images/logos/cursor-color-logo.svg" alt="Cursor" className="h-8 w-8 block dark:hidden" />
          <img src="/images/logos/cursor-color-logo-white.svg" alt="Cursor" className="h-8 w-8 hidden dark:block" />
        </>
  }, {
    id: 'vscode',
    name: 'VS Code',
    kind: 'One-click install',
    actionLabel: 'Add to VS Code',
    href: 'https://insiders.vscode.dev/redirect/mcp/install?name=Parallel%20Search%20MCP&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsearch.parallel.ai%2Fmcp%22%7D',
    icon: <img src="/images/logos/vscode-color-logo.svg" alt="VS Code" className="h-8 w-8" />
  }];
  const copy = (id, value) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1400);
    });
  };
  return <div className="pt-4 pb-12">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-200">
          Set up Parallel Search via MCP
        </h2>
        <div className="mt-1 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-base text-gray-600 dark:text-gray-400">
            Free. No account, no API key. Works in every major coding agent.
          </p>
          <a href="/integrations/mcp/quickstart" style={{
    fontWeight: 400
  }} className="text-base text-gray-600 hover:text-[#FB631B] dark:text-gray-400 dark:hover:text-[#FB631B] whitespace-nowrap">
            See all install options {'→'}
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-transparent overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => {
    const isDeepLink = Boolean(t.href);
    const borderClasses = [i < tiles.length - 1 ? 'border-b border-gray-200 dark:border-[#2a2a2a]' : '', 'lg:border-b-0', i < tiles.length - 1 ? 'lg:border-r lg:border-gray-200 lg:dark:border-[#2a2a2a]' : ''].join(' ');
    const header = <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-gray-900 dark:text-gray-200">
                  {t.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.name}</span>
                  <span className="text-[13px] font-normal text-gray-500 dark:text-gray-400">{t.kind}</span>
                </div>
              </div>;
    if (isDeepLink) {
      return <a key={t.id} href={t.href} className={`group flex flex-col p-4 transition hover:bg-gray-50/60 dark:hover:bg-white/[0.02] ${borderClasses}`}>
                  {header}
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#FB631B]">
                    {t.actionLabel} <span aria-hidden>{'→'}</span>
                  </div>
                </a>;
    }
    return <div key={t.id} className={`group flex flex-col p-4 transition ${borderClasses}`}>
                {header}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <code className="truncate font-mono text-[12px] text-gray-600 dark:text-gray-400">
                    {t.command}
                  </code>
                  <button type="button" onClick={() => copy(t.id, t.command)} className="shrink-0 rounded-md border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-transparent px-2 py-1 text-[11px] font-medium text-gray-700 dark:text-gray-300 transition hover:border-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    {copied === t.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>;
  })}
        </div>
      </div>
    </div>;
};

export const ExampleButtons = () => {
  const examples = [{
    id: 'search',
    title: 'Search the web',
    tagline: 'Fresh, cited excerpts for grounding answers'
  }, {
    id: 'extract',
    title: 'Extract web page',
    tagline: 'Clean markdown from a specific URL'
  }, {
    id: 'research',
    title: 'Run deep research',
    tagline: 'Multi-step research with a written report'
  }, {
    id: 'enrich',
    title: 'Enrich with web data',
    tagline: 'Add web-sourced fields to companies or people'
  }, {
    id: 'monitor',
    title: 'Monitor the web',
    tagline: 'Fire a webhook when the web changes'
  }, {
    id: 'findall',
    title: 'Generate web dataset',
    tagline: 'Build a fresh dataset from a brief'
  }];
  const handleClick = id => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.example-panel').forEach(p => {
      p.style.display = 'none';
    });
    const panel = document.getElementById(`panel-${id}`);
    if (panel) panel.style.display = 'block';
    document.querySelectorAll('.example-tab').forEach(t => {
      t.classList.remove('example-tab-active');
    });
    const activeTab = document.getElementById(`tab-${id}`);
    if (activeTab) activeTab.classList.add('example-tab-active');
  };
  useEffect(() => {
    handleClick('search');
  }, []);
  return <ul className="example-tab-list flex flex-col list-none p-0 m-0">
      {examples.map(ex => <li key={ex.id} className="list-none">
          <button id={`tab-${ex.id}`} type="button" onClick={() => handleClick(ex.id)} className={`example-tab w-full text-left px-4 py-3 rounded transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03] ${ex.id === 'search' ? 'example-tab-active' : ''}`}>
            <div className="example-tab-title text-[13px] font-medium text-gray-900 dark:text-gray-100">
              {ex.title}
            </div>
            <div className="mt-0.5 text-[12px] leading-snug text-gray-500 dark:text-gray-400">
              {ex.tagline}
            </div>
          </button>
        </li>)}
    </ul>;
};

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

<div className="px-2 sm:px-6 md:px-12 lg:px-16 xl:px-20">
  <div className="min-h-[260px]">
    <MCPInstallSection />
  </div>

  <div className="pt-4 pb-12">
    <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-200">
          Build with Parallel APIs
        </h2>

        <p className="text-base text-gray-600 dark:text-gray-400">
          Pick a product, copy the setup prompt, and paste it into your coding agent.
        </p>
      </div>

      <a href="https://platform.parallel.ai" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 400 }} className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[#FB631B] px-4 py-2 font-mono text-[13px] text-white transition hover:bg-[#e35712]">
        Create an API key
      </a>
    </div>

    <div className="w-full rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-transparent overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left: vertical tab list (flush left, no top padding now that
                          the right panel has its own header bar) */}

        <div className="lg:w-[262px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#2a2a2a] p-1">
          <ExampleButtons />
        </div>

        {/* Right: active prompt panel */}

        <div className="flex-1 min-w-0">
          <div id="panel-search" className="example-panel">
            <PanelHeader panelId="search" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel Search API — Setup Prompt

              You're integrating the **Parallel Search API**: a natural-language web search that returns LLM-optimized excerpts.

              ## When to use it

              Use Search when the model needs current facts, specific entities, or web data to ground a response. One round-trip: natural-language objective + 2-3 keyword queries → LLM-optimized excerpts (pre-compressed, citation-aware) ready to feed into model context. Faster than multi-hop research; better than raw keyword search because the excerpts arrive shaped for the model.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # Both objective and search_queries are required — they play distinct roles:
              # objective = natural-language research goal (task context, full sentences OK);
              # search_queries = 2-3 diverse 3-6-word keyword queries (vary entities/angles, no sentences).
              # Mode and other tuning (max_results, max_chars_total) are handler-side levers —
              # keep them OUT of the tool schema your agent sees (exposing them often hurts quality).
              # Mode defaults to "advanced" (slower, highest-quality — background agents, complex queries).
              # Pass mode="basic" in your handler for lower latency in real-time / foreground agents.
              # See https://docs.parallel.ai/search/modes and https://docs.parallel.ai/integrations/tool-definition.
              search = client.search(
                  objective="Find recent benchmarks and cost comparisons between major vector databases (pgvector, Pinecone, Weaviate, Qdrant).",
                  search_queries=[
                      "pgvector Pinecone benchmark 2025",
                      "vector database cost comparison",
                      "Weaviate Qdrant performance review",
                  ],
              )

              for result in search.results:
                  print(f"{result.title}: {result.url}")
                  for excerpt in result.excerpts:
                      print(excerpt[:200])
              ```

              ## Tool definition (for agent function-calling)

              Register this in your agent's tool list (OpenAI function-calling format):

              ```json
              {
                "type": "function",
                "function": {
                  "name": "search_web",
                  "description": "Searches the live web using a natural-language objective plus keyword queries, returning LLM-optimized excerpts (pre-compressed, citation-aware) ready to feed into model context. Use whenever the model needs current facts, specific named entities, recent events, or information that likely isn't in training data. Prefer over repeated keyword searches — one call covers the ground of 2-3 traditional queries with better relevance.",
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "objective": {
                        "type": "string",
                        "description": "A concise, self-contained search query. Must include the key entity or topic being searched for."
                      },
                      "search_queries": {
                        "type": "array",
                        "description": "2-3 diverse keyword search queries, each 3-6 words. Must be diverse — vary entity names, synonyms, and angles. Each query must include the key entity or topic. NEVER write sentences, instructions, or use site: operators.",
                        "items": { "type": "string" },
                        "minItems": 2,
                        "maxItems": 3
                      }
                    },
                    "required": ["objective", "search_queries"]
                  }
                }
              }
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export, not `import { Parallel }`).
              - Request/response fields stay snake_case: `search_queries`, `search.results[].url`. Don't camelCase them — your linter may try.
              - Wrap the call in an `async` function and `await` it.
              - Need Anthropic-format tools instead of OpenAI? Drop the `"type": "function"` envelope, rename `parameters` → `input_schema`, and lift `name` / `description` to the top level.

              ## Links

              - [Search API Reference](https://docs.parallel.ai/api-reference/search/search) — full parameter specs
              - [Search Quickstart](https://docs.parallel.ai/search/search-quickstart) + [Best Practices](https://docs.parallel.ai/search/best-practices)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>

          <div id="panel-extract" className="example-panel" style={{ display: 'none' }}>
            <PanelHeader panelId="extract" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel Extract API — Setup Prompt

              You're integrating the **Parallel Extract API**: converts any public URL into clean, LLM-optimized markdown.

              ## When to use it

              Use Extract when you already know which URL(s) to read — typically after Search has narrowed the list, or when the user hands the agent a URL directly. Handles JavaScript-rendered pages and PDFs, not just static HTML. Pass a `target_content` objective to get focused excerpts; omit it for a full-page markdown dump. Up to 20 URLs per call.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # Provide an objective to focus extraction on relevant content.
              # Up to 20 URLs per request. Pages that fail to fetch appear in extract.errors.
              extract = client.extract(
                  urls=["https://arxiv.org/pdf/1706.03762"],
                  objective="Explain the multi-head self-attention mechanism and why it replaces recurrence.",
              )

              for result in extract.results:
                  print(f"{result.title}: {result.url}")
                  for excerpt in result.excerpts:
                      print(excerpt[:200])

              # Don't silently drop failed URLs — inspect extract.errors[].url / .error_type.
              for err in extract.errors:
                  print(f"FAILED {err.url}: {err.error_type}")
              ```

              ## Tool definition (for agent function-calling)

              Register this in your agent's tool list (OpenAI function-calling format). In your tool handler, map `target_content` → the Extract API `objective` field when the model provides it.

              ```json
              {
                "type": "function",
                "function": {
                  "name": "web_fetch",
                  "description": "Fetches one or more URLs and returns clean LLM-optimized markdown — handles JavaScript-rendered pages and PDFs, not just static HTML. When target_content is provided, narrows the response to excerpts most relevant to that target; otherwise returns the full page. Use after search_web to pull the contents of a specific page the model decided it needs to read in depth, or when the user hands the agent a URL directly.",
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "urls": {
                        "type": "array",
                        "description": "The URLs to fetch content from.",
                        "items": { "type": "string" }
                      },
                      "target_content": {
                        "type": "string",
                        "description": "The content to target from the page. For example, information about a certain method or a class in a page. If not provided, the entire page is fetched."
                      }
                    },
                    "required": ["urls"]
                  }
                }
              }
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export, not `import { Parallel }`).
              - Method: `await client.extract({ urls, objective })` — top-level on the client, not `client.extractions.*`.
              - Response fields stay snake_case: `result.publish_date`, `result.full_content`, `err.error_type`, `err.http_status_code`. Don't camelCase them.
              - Wrap the call in an `async` function and `await` it.
              - PDF handling is server-side — no TS-side parsing needed for the arxiv example above.

              ## Links

              - [Extract API Reference](https://docs.parallel.ai/api-reference/extract/extract) — full parameter specs
              - [Extract Quickstart](https://docs.parallel.ai/extract/extract-quickstart) + [Best Practices](https://docs.parallel.ai/extract/best-practices)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>

          <div id="panel-research" className="example-panel" style={{ display: 'none' }}>
            <PanelHeader panelId="research" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel Task API (Deep Research) — Setup Prompt

              You're integrating the **Parallel Task API** for deep research: a single API call that takes a plain-language input and returns comprehensive, cited results.

              ## When to use it

              Use the Task API for multi-hop research that needs minutes (not seconds) and citations — questions a single Search call can't answer because they require synthesis across many sources. Plain-language input, structured cited output in `result.output.basis`. For `pro` (~10 min), blocking is fine; for `ultra`/`ultra8x` (up to 2hr), use webhooks. If you only need one search pass, use Search instead.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # For deep research, use the "pro" or "ultra" processors.
              # Append "-fast" for lower latency (e.g. "pro-fast", "ultra-fast").
              # For "ultra" / "ultra8x" (up to ~2hr), don't block — use webhooks instead.
              # See https://docs.parallel.ai/task-api/webhooks. Blocking is only a good pattern for "pro" (<10 min).
              task_run = client.task_run.create(
                  input="Research the latest developments in AI search technology",
                  processor="pro",
              )

              # Block until the task completes (appropriate for "pro"; avoid for ultra-tier).
              result = client.task_run.result(task_run.run_id, api_timeout=3600)

              # result.output.content is the research answer.
              # result.output.basis is a list of per-field citations + reasoning.
              print(result.output.content)
              for field in result.output.basis:
                  print(f"- {field.field}: {len(field.citations)} citations")
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export).
              - Methods are camelCase (`client.taskRun.create`), but body/response fields stay snake_case (`task_run.run_id`, `result.output.basis`). Mixed casing is load-bearing — don't let your linter normalize it.
              - **For `pro` runs (<10 min, blocking is fine):** Python's `api_timeout=3600` has no TS equivalent. Use `{ timeout: 25 }` (per-request seconds) inside a poll loop, retrying ~144 times for a 1-hour budget. `catch` generic errors and rethrow on the last iteration. See the TypeScript tab at [/task-api/examples/task-deep-research](https://docs.parallel.ai/task-api/examples/task-deep-research).
              - Strict-flow note: `let runResult` isn't proven defined after the poll loop, so reference it as `runResult!` (or guard with `if (!runResult) throw ...`) when accessing `.output.content` / `.output.basis`.
              - **For `ultra` / `ultra8x` runs (up to 2hr), don't poll — use webhooks.** Blocking an HTTP connection for hours is not the design. Register a webhook at create time: `client.beta.taskRun.create({ webhook: { url, event_types: ["task_run.status"] }, betas: ["webhook-2025-08-12"] })`. See [/task-api/webhooks](https://docs.parallel.ai/task-api/webhooks).

              ## Links

              - [Task API Reference](https://docs.parallel.ai/api-reference/tasks/create-task-run) — full parameter specs
              - [Deep Research Example](https://docs.parallel.ai/task-api/examples/task-deep-research) + [Task Quickstart](https://docs.parallel.ai/task-api/task-quickstart)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>

          <div id="panel-enrich" className="example-panel" style={{ display: 'none' }}>
            <PanelHeader panelId="enrich" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel Task API (Enrichment) — Setup Prompt

              You're integrating the **Parallel Task API** for data enrichment: populate structured fields about an entity (company, person, product) from live web data.

              ## When to use it

              Use the Task API with a JSON output schema when you already have a list of entities and need to populate structured fields about each — founding date, funding, employee count, whatever. Per-field citations come back in `result.output.basis` for audit trails. For many records in one go, use the Group API. If you don't have the list yet, use FindAll to discover first.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # Enrich a record with structured web data.
              # Processors: lite (~2 fields), base (~5 fields), core (~10 fields), core2x (~10 fields, complex),
              #   pro (~20 fields, exploratory), ultra/ultra2x/ultra4x/ultra8x (~20-25 fields, deep research).
              # Append "-fast" for lower latency (e.g. "core-fast"). See https://docs.parallel.ai/task-api/guides/choose-a-processor.
              # Tip: structured input (dict) grounds the run better than a bare string.
              task_run = client.task_run.create(
                  input={"company": "Stripe", "website": "stripe.com"},
                  task_spec={
                      "output_schema": {
                          "type": "json",
                          "json_schema": {
                              "type": "object",
                              "properties": {
                                  "founding_date": {
                                      "type": "string",
                                      "description": "Founding date in MM-YYYY format"
                                  },
                                  "employee_count": {
                                      "type": "string",
                                      "description": "Estimated number of employees"
                                  },
                                  "funding_sources": {
                                      "type": "string",
                                      "description": "Description of funding sources and amounts"
                                  }
                              },
                              "required": ["founding_date", "employee_count", "funding_sources"],
                              "additionalProperties": False
                          }
                      }
                  },
                  processor="base",  # ~5 fields. Use "core" for ~10, "pro" for ~20+.
              )

              # Block until the enrichment completes. For many records, use the Group API: https://docs.parallel.ai/task-api/group-api
              result = client.task_run.result(task_run.run_id, api_timeout=3600)

              # result.output.content is the populated JSON dict.
              # result.output.basis carries per-field citations + reasoning (auditable provenance).
              print(result.output.content)
              for field in result.output.basis:
                  print(f"- {field.field}: {len(field.citations)} citations")
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export).
              - Methods camelCase (`client.taskRun.create`), body fields snake_case (`task_spec`, `output_schema`, `json_schema`, `additional_properties` stays as JSON-Schema `additionalProperties: false`). Your linter may try to camelCase body fields — the call will fail if it does.
              - **Python's `api_timeout=3600` has no TS equivalent.** Use `{ timeout: 25 }` in a poll loop, retrying ~144 times for a 1-hour budget. `catch` generic errors and rethrow on the last iteration (don't try to match a specific status code — any non-`break` outcome means "not ready yet"). See the TypeScript tab at [/task-api/examples/task-enrichment](https://docs.parallel.ai/task-api/examples/task-enrichment).
              - For batch enrichment, the Group API at [/task-api/group-api](https://docs.parallel.ai/task-api/group-api) uses the same snake_case body convention — drop-in familiar.

              ## Links

              - [Task API Reference](https://docs.parallel.ai/api-reference/tasks/create-task-run) — full parameter specs
              - [Enrichment Example](https://docs.parallel.ai/task-api/examples/task-enrichment) + [Task Quickstart](https://docs.parallel.ai/task-api/task-quickstart)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>

          <div id="panel-monitor" className="example-panel" style={{ display: 'none' }}>
            <PanelHeader panelId="monitor" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel Monitor API — Setup Prompt

              You're integrating the **Parallel Monitor API** (alpha): continuously track the web for changes relevant to a natural-language query, on a schedule you control. Updates are delivered via webhook.

              ## When to use it

              Use Monitor when you need to track something continuously — not ask-and-forget. Your NL query runs on a cadence you set (1h to 30d); when material changes are detected, Parallel POSTs events to your webhook. Good for news tracking, regulatory watch, competitor pricing, or anything you'd otherwise build with a cron job plus diff logic. Don't include dates in the query — Monitor handles freshness automatically.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              from httpx import Response
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # Monitor is alpha — the Python SDK uses the low-level client.post().
              # High-level client.monitors.* methods are not yet available.
              # frequency: "1h" to "30d" (e.g. "1h", "6h", "1d", "1w", "30d").
              # Don't bake dates into the query — Monitor tracks new updates automatically.
              res = client.post(
                  "/v1alpha/monitors",
                  cast_to=Response,
                  body={
                      "query": "Notable news, funding, product launches, or regulatory events about OpenAI and Anthropic.",
                      "frequency": "1d",
                      "webhook": {
                          "url": "https://your-app.example.com/parallel-webhook",
                          "event_types": ["monitor.event.detected"],
                      },
                      "metadata": {"source": "docs-home"},
                  },
              ).json()

              print(f"Monitor created: {res['monitor_id']} (status={res['status']})")

              # Events are POSTed to your webhook URL when changes are detected.
              # You can also pull recent events via GET /v1alpha/monitors/{monitor_id}/events
              # — pass params={"lookback_period": "10d"} for a lookback window.
              # For webhook-delivered events, look up GET /v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}.
              # See https://docs.parallel.ai/monitor-api/monitor-events.
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export).
              - The same `client.post("/v1alpha/monitors", { body: {...} })` low-level pattern applies. Return type is `any` — cast explicitly: `as { monitor_id: string; status: string }`.
              - Body/response fields stay snake_case: `event_types`, `frequency`, `monitor_id`. Don't camelCase.
              - Wrap in `async` function; await `client.post(...)`.
              - **Signature verification is production hardening, not required to prototype.** For a first integration you can trust the payload and skip verification. Before you ship to prod: verify the HMAC-SHA256 of `${webhook_id}.${webhook_timestamp}.${raw_body}` using your account webhook secret (get it at **Settings → Webhooks** on platform.parallel.ai; convention: `process.env.PARALLEL_WEBHOOK_SECRET`). The `webhook-signature` header is `v1,<base64>` (RFC 4648, space-delimited if rotating). Use the **raw request body** (not parsed JSON) for the HMAC. See [/resources/webhook-setup](https://docs.parallel.ai/resources/webhook-setup) for a ready-to-copy Node.js verifier.

              ## Links

              - [Monitor API Reference](https://docs.parallel.ai/api-reference/monitor/create-monitor) — full parameter specs
              - [Monitor Quickstart](https://docs.parallel.ai/monitor-api/monitor-quickstart) + [Events model](https://docs.parallel.ai/monitor-api/monitor-events)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>

          <div id="panel-findall" className="example-panel" style={{ display: 'none' }}>
            <PanelHeader panelId="findall" />

            <div className="bg-white dark:bg-[#0e0e0e] p-2">
              ````markdown theme={"system"}
              # Parallel FindAll API — Setup Prompt

              You're integrating the **Parallel FindAll API** (beta): discover and verify entities matching criteria you describe in plain language.

              ## When to use it

              Use FindAll to build a list from scratch — you describe what you're looking for in natural language, it searches the web, evaluates candidates against your match conditions, and returns verified matches. If you already have the list and just need to populate fields about each entity, use the Task API (enrichment) instead.

              ## Setup

              ```bash
              pip install "parallel-web>=0.5.0"    # Python SDK — package is "parallel-web", import as `from parallel import Parallel`
              # or: npm install parallel-web             # TypeScript SDK

              # Treat PARALLEL_API_KEY like a password — load from .env or a secrets manager, don't commit it.
              export PARALLEL_API_KEY="your-api-key"
              ```

              ## Example (Python — adapt to my codebase's language)

              ```python
              import time
              from parallel import Parallel

              client = Parallel()  # reads PARALLEL_API_KEY from env

              # Tip: start with generator="preview" to test your query (~10 candidates, low cost).
              # Generators: preview (test), base (broad/common matches), core (specific),
              #             pro (rare/hard-to-find matches, most thorough)
              # match_limit must be between 5 and 1000.
              # Write match_conditions as concrete, testable predicates (not tautologies).
              findall_run = client.beta.findall.create(
                  objective="Find all AI startups that raised Series A in 2024",
                  entity_type="companies",
                  match_conditions=[
                      {
                          "name": "ai_core_product_check",
                          "description": "Company's core product or platform must be AI-focused (not merely AI-adjacent).",
                      },
                      {
                          "name": "series_a_2024_check",
                          "description": "Company must have announced a Series A funding round between 2024-01-01 and 2024-12-31.",
                      },
                  ],
                  generator="core",
                  match_limit=20,
              )

              # Poll until the run is no longer active, then fetch results.
              # For a production integration, prefer SSE or webhooks — see https://docs.parallel.ai/findall-api/features/findall-sse.
              while client.beta.findall.retrieve(findall_id=findall_run.findall_id).status.is_active:
                  time.sleep(5)

              result = client.beta.findall.result(findall_id=findall_run.findall_id)

              for candidate in result.candidates:
                  print(f"{candidate.name}: {candidate.url}")
                  print(f"  {candidate.description}")
              ```

              ## TypeScript notes

              - Import: `import Parallel from "parallel-web"` (default export).
              - Methods live under `client.beta.findall.*` (four-deep). Request/response fields stay snake_case: `entity_type`, `match_conditions`, `match_limit`, `findall_id`, `status.is_active`, `candidate.name` / `.url` / `.description`.
              - `retrieve()` and `result()` take a **positional string** id, not an object param: `await client.beta.findall.retrieve(findallId)`.
              - The `parallel-beta: findall-2025-09-15` header is set automatically by the SDK — don't add it manually.
              - **Prefer SSE over polling** for production: `const stream = await client.beta.findall.events(findallId); for await (const event of stream) { ... }`. Events are a discriminated union keyed on `event.type` (`"findall.candidate.matched"` carries `event.candidate`; `"findall.status"` carries the run status; terminal states set `status.is_active: false` — break the loop there). Full shape at [/findall-api/features/findall-sse](https://docs.parallel.ai/findall-api/features/findall-sse).

              ## Links

              - [FindAll API Reference](https://docs.parallel.ai/api-reference/findall/create-findall-run) — full parameter specs
              - [FindAll Quickstart](https://docs.parallel.ai/findall-api/findall-quickstart)
              - [OpenAPI Spec](https://docs.parallel.ai/public-openapi.json) — machine-readable schema
              - [Python SDK (PyPI)](https://pypi.org/project/parallel-web/) · [TypeScript SDK (npm)](https://www.npmjs.com/package/parallel-web)
              - [Cookbook](https://github.com/parallel-web/parallel-cookbook) · [Platform (get API key)](https://platform.parallel.ai)

              ## Other Parallel APIs

              | API | Shape | Use when |
              |-----|-------|----------|
              | **Search** | One round-trip; natural-language objective + keyword queries → LLM-optimized excerpts | The model needs current facts or specific entities to ground a response |
              | **Extract** | URL → clean markdown (handles JS pages and PDFs) | Pulling the contents of a specific page, usually after narrowing via Search |
              | **Task** | Multi-hop research agent; runs seconds to hours (webhooks for long tiers) | Deep research with cited structured output; answers you can't get in one search |
              | **FindAll** | NL criteria → verified list of matching entities | Building a list from scratch (lead gen, competitive mapping, datasets) |
              | **Monitor** | Scheduled NL query + webhook notifications on change | Continuous tracking (news, regulatory, competitive watchlists) |
              ````
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

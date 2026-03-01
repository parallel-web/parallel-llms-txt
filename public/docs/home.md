> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Parallel Documentation

> Explore Parallel's web API products for building intelligent applications.

export const SocialFooter = () => {
  return <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-7xl mx-auto">
      <div className="mt-16 pt-8 pb-12 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-6 items-center">
            <a href="https://x.com/p0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="X (Twitter)">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a href="https://github.com/parallel-web/parallel-cookbook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="https://www.linkedin.com/company/parallel-web/about/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <a href="https://parallel.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
            Parallel Web Systems
          </a>
        </div>
      </div>
    </div>;
};

export const LinksGrid = () => {
  const columns = [{
    title: "Web Tools",
    links: [{
      href: "/search/search-quickstart",
      label: "Search"
    }, {
      href: "/extract/extract-quickstart",
      label: "Extract"
    }]
  }, {
    title: "Web Agents",
    links: [{
      href: "/task-api/task-quickstart",
      label: "Task"
    }, {
      href: "/monitor-api/monitor-quickstart",
      label: "Monitor"
    }, {
      href: "/findall-api/findall-quickstart",
      label: "FindAll"
    }, {
      href: "/chat-api/chat-quickstart",
      label: "Chat"
    }]
  }, {
    title: "MCP",
    links: [{
      href: "/integrations/mcp/search-mcp",
      label: "Search MCP"
    }, {
      href: "/integrations/mcp/task-mcp",
      label: "Task MCP"
    }, {
      href: "/task-api/mcp-tool-call",
      label: "MCP Tool Calling"
    }]
  }, {
    title: "Features",
    links: [{
      href: "/resources/source-policy",
      label: "Source Policy"
    }, {
      href: "/task-api/webhooks",
      label: "Webhooks"
    }, {
      href: "/task-api/group-api",
      label: "Task Groups"
    }]
  }, {
    title: "Resources",
    links: [{
      href: "/api-reference/search-beta/search",
      label: "API Reference",
      external: true
    }, {
      href: "https://github.com/parallel-web/parallel-cookbook",
      label: "Cookbook",
      external: true
    }, {
      href: "https://parallel.ai/pricing",
      label: "Pricing",
      external: true
    }]
  }];
  return <div className="pt-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {columns.map(col => <div key={col.title}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map(link => <li key={link.href}>
                  <a href={link.href} {...link.external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {}} className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>)}
      </div>
    </div>;
};

export const HeroSection = () => {
  const quickstartLinks = [{
    href: "/search/search-quickstart",
    label: "Start with Web Tools"
  }, {
    href: "/task-api/task-quickstart",
    label: "Start with Web Agents"
  }, {
    href: "https://parallel.ai/llms.txt",
    label: "LLM Quickstart",
    external: true
  }, {
    href: "/integrations/mcp/quickstart",
    label: "MCP Quickstart"
  }];
  return <div className="w-full flex flex-col">
      <div className="flex flex-col items-start justify-center w-full max-w-4xl text-left">
        <h1 className="text-4xl sm:text-5xl tracking-tight font-medium flex items-center flex-nowrap text-gray-900 dark:text-white">
          <span className="whitespace-nowrap">Build with Parallel</span>
        </h1>
        <h3 className="text-xl text-left mt-3 mb-6 text-gray-600 dark:text-gray-300">
          Get started with Parallel's Web Tools and Web Agents
        </h3>

        {}
        <div className="flex flex-wrap gap-4 mt-2">
          {quickstartLinks.map(link => <a key={link.href} href={link.href} {...link.external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {}} className="inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
              <span>{link.label}</span>
              <span className="ml-2">{'\u2192'}</span>
            </a>)}
        </div>

        {}
        <div className="mt-6 mb-4 w-full block md:hidden">
          <a href="https://platform.parallel.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 text-white bg-black hover:bg-gray-800 rounded-full transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" style={{
    touchAction: 'manipulation'
  }}>
            <span className="text-sm font-medium mr-2">API Playground</span>
            <span className="text-lg font-light">{'>'}</span>
          </a>
        </div>
      </div>
    </div>;
};

export const ExampleButtons = () => {
  const handleClick = exampleId => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.example-panel').forEach(panel => {
      panel.style.display = 'none';
    });
    const activePanel = document.getElementById(`panel-${exampleId}`);
    if (activePanel) {
      activePanel.style.display = 'block';
    }
    document.querySelectorAll('.example-button').forEach(btn => {
      btn.classList.remove('text-white', 'border-orange-600');
      btn.classList.add('text-gray-600', 'dark:text-gray-400', 'border-gray-300');
      btn.style.backgroundColor = '';
      btn.style.color = '';
    });
    const activeButton = document.getElementById(`btn-${exampleId}`);
    if (activeButton) {
      activeButton.classList.remove('text-gray-600', 'dark:text-gray-400', 'border-gray-300');
      activeButton.classList.add('text-white', 'border-orange-600');
      activeButton.style.backgroundColor = '#fb631b';
      activeButton.style.color = 'white';
    }
  };
  useEffect(() => {
    handleClick('search');
  }, []);
  const examples = [{
    id: 'search',
    title: 'SEARCH THE WEB'
  }, {
    id: 'extract',
    title: 'EXTRACT WEB PAGE'
  }, {
    id: 'research',
    title: 'START DEEP RESEARCH'
  }, {
    id: 'chat',
    title: 'CHAT WITH THE WEB'
  }, {
    id: 'enrich',
    title: 'ENRICH WITH WEB DATA'
  }, {
    id: 'findall',
    title: 'GENERATE WEB DATASET'
  }];
  return <div className="flex flex-col gap-4">
      {examples.map((ex, index) => <button key={ex.id} id={`btn-${ex.id}`} type="button" onClick={() => handleClick(ex.id)} className={`example-button py-2 px-4 flex items-center justify-center rounded-md text-xs font-mono uppercase transition-colors border bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#333] hover:text-white hover:border-orange-600`} style={{
    transition: 'all 0.2s ease-in-out'
  }} onMouseEnter={e => {
    if (!e.currentTarget.classList.contains('text-white')) {
      e.currentTarget.style.backgroundColor = '#fb631b';
      e.currentTarget.style.color = 'white';
    }
  }} onMouseLeave={e => {
    const isActive = e.currentTarget.classList.contains('text-white');
    if (!isActive) {
      e.currentTarget.style.backgroundColor = '';
      e.currentTarget.style.color = '';
    }
  }}>
          {ex.title}
        </button>)}
    </div>;
};

<div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-7xl mx-auto">
  <div className="py-12">
    <HeroSection />
  </div>

  <div className="pt-4 pb-12">
    <h2 className="text-xl sm:text-2xl font-normal text-gray-900 dark:text-white mb-4">
      Execute your first API call in minutes
    </h2>

    <div className="w-full p-4 lg:p-5 rounded-md border border-gray-200 dark:border-transparent bg-white dark:bg-transparent flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Left: Button Navigation */}

      <div className="flex flex-col lg:w-1/4 lg:min-w-[240px] lg:justify-center">
        <ExampleButtons />
      </div>

      {/* Right: Code Examples */}

      <div className="flex-1 rounded-xl relative overflow-hidden min-h-[400px]">
        <div id="panel-search" className="example-panel">
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl https://api.parallel.ai/v1beta/search \
              -H "Content-Type: application/json" \
              -H "x-api-key: $PARALLEL_API_KEY" \
              -H "parallel-beta: search-extract-2025-10-10" \
              -d '{
                "objective": "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
                "search_queries": [
                  "Parallel Web Systems products",
                  "Parallel Web Systems announcements"
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
                objective="Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
                search_queries=[
                    "Parallel Web Systems products",
                    "Parallel Web Systems announcements"
                ],
                max_results=10,
                excerpts={"max_chars_per_result": 10000}
            )

            print(search.results)
            ```

            ```typescript TypeScript theme={"system"}
            import Parallel from "parallel-web";

            const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

            async function main() {
                const search = await client.beta.search({
                    objective: "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
                    search_queries: [
                        "Parallel Web Systems products",
                        "Parallel Web Systems announcements"
                    ],
                    max_results: 10,
                    excerpts: { max_chars_per_result: 10000 }
                });

                console.log(search.results);
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/search/search-quickstart" className="home-panel-link">
              View Search Docs →
            </a>
          </div>
        </div>

        <div id="panel-research" className="example-panel" style={{ display: 'none' }}>
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
              -H "x-api-key: $PARALLEL_API_KEY" \
              -H 'Content-Type: application/json' \
              --data-raw '{
              "input": "Create a research report on the most recent academic research advancements in web search for LLMs.",
              "processor": "ultra"
            }'
            ```

            ```python Python theme={"system"}
            import os
            from parallel import Parallel

            client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

            task_run = client.task_run.create(
                input="Create a research report the most recent academic research advancements in web search for LLMs.",
                processor="ultra"
            )
            print(f"Task Created. Run ID: {task_run.run_id}")

            run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
            print(run_result.output)
            ```

            ```typescript TypeScript theme={"system"}
            import Parallel from "parallel-web";

            const client = new Parallel({
              apiKey: process.env.PARALLEL_API_KEY,
            });

            async function main() {
              const taskRun = await client.taskRun.create({
                input:
                  "Create a research report the most recent academic research advancements in web search for LLMs.",
                processor: "ultra",
              });

              console.log(`Task Created. Run ID: ${taskRun.run_id}`);

              // Poll for results
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/task-api/task-deep-research" className="home-panel-link">
              View Deep Research Docs →
            </a>
          </div>
        </div>

        <div id="panel-chat" className="example-panel" style={{ display: 'none' }}>
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl -N https://api.parallel.ai/chat/completions \
              -H "Content-Type: application/json" \
              -H "Authorization: Bearer $PARALLEL_API_KEY" \
              -d '{
                "model": "speed",
                "messages": [
                  { "role": "user", "content": "What does Parallel Web Systems do?" }
                ],
                "stream": false
              }'
            ```

            ```python Python theme={"system"}
            import os
            from openai import OpenAI

            client = OpenAI(
                api_key=os.environ["PARALLEL_API_KEY"],  # Your Parallel API key
                base_url="https://api.parallel.ai"  # Parallel's API endpoint
            )

            response = client.chat.completions.create(
                model="speed", # Parallel model name
                messages=[
                    {"role": "user", "content": "What does Parallel Web Systems do?"}
                ]
            )

            print(response.choices[0].message.content)
            ```

            ```typescript TypeScript theme={"system"}
            import OpenAI from 'openai';

            const client = new OpenAI({
              apiKey: process.env.PARALLEL_API_KEY, // Your Parallel API key
              baseURL: 'https://api.parallel.ai', // Parallel's API endpoint
            });

            async function main() {
              const response = await client.chat.completions.create({
                model: 'speed', // Parallel model name
                messages: [
                  { role: 'user', content: 'What does Parallel Web Systems do?' }
                ],
              });

              console.log(response.choices[0].message.content);
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/chat-api/chat-quickstart" className="home-panel-link">
              View Chat Docs →
            </a>
          </div>
        </div>

        <div id="panel-extract" className="example-panel" style={{ display: 'none' }}>
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl https://api.parallel.ai/v1beta/extract \
              -H "Content-Type: application/json" \
              -H "x-api-key: $PARALLEL_API_KEY" \
              -H "parallel-beta: search-extract-2025-10-10" \
              -d '{
                "urls": ["https://parallel.ai/blog/search-api-benchmark"],
                "objective": "How does Parallel perform on search benchmarks?",
                "excerpts": true,
                "full_content": false
              }'
            ```

            ```python Python theme={"system"}
            import os
            from parallel import Parallel

            client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

            extract = client.beta.extract(
                urls=["https://parallel.ai/blog/search-api-benchmark"],
                objective="How does Parallel perform on search benchmarks?",
                excerpts=True,
                full_content=False
            )

            print(extract.results)
            ```

            ```typescript TypeScript theme={"system"}
            import Parallel from "parallel-web";

            const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

            async function main() {
                const extract = await client.beta.extract({
                    urls: ["https://parallel.ai/blog/search-api-benchmark"],
                    objective: "How does Parallel perform on search benchmarks?",
                    excerpts: true,
                    full_content: false
                });

                console.log(extract.results);
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/extract/extract-quickstart" className="home-panel-link">
              View Extract Docs →
            </a>
          </div>
        </div>

        <div id="panel-enrich" className="example-panel" style={{ display: 'none' }}>
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
              -H "x-api-key: $PARALLEL_API_KEY" \
              -H "Content-Type: application/json" \
              -d '{
                "processor": "base",
                "input": "Extract key company information including recent product announcements, CEO profile, and funding details. Company name: Parallel Web Systems. Company website: parallel.ai",
                "task_spec": {
                  "output_schema": {
                    "type": "json",
                    "json_schema": {
                      "type": "object",
                      "properties": {
                        "product_announcements": {
                          "type": "string",
                          "description": "Most recent product announcements."
                        },
                        "ceo_profile": {
                          "type": "string",
                          "description": "Summary of the CEO's background and profile."
                        },
                        "funding_summary": {
                          "type": "string",
                          "description": "Summary of the company's funding history and current funding status"
                        }
                      },
                      "required": ["product_announcements", "ceo_profile", "funding_summary"],
                      "additionalProperties": false
                    }
                  }
                }
              }'
            ```

            ```python Python theme={"system"}
            import os
            from parallel import Parallel
            from parallel.types import TaskSpecParam

            client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

            task_run = client.task_run.create(
                input="Extract key company information including recent product announcements, CEO profile, and funding details. Company name: Parallel Web Systems. Company website: parallel.ai",
                task_spec=TaskSpecParam(
                    output_schema={
                        "type": "json",
                        "json_schema": {
                            "type": "object",
                            "properties": {
                                "product_announcements": {
                                    "type": "string",
                                    "description": "Most recent product announcements."
                                },
                                "ceo_profile": {
                                    "type": "string",
                                    "description": "Summary of the CEO's background and profile."
                                },
                                "funding_summary": {
                                    "type": "string",
                                    "description": "Summary of the company's funding history and current funding status"
                                }
                            },
                            "required": ["product_announcements", "ceo_profile", "funding_summary"],
                            "additionalProperties": False
                        }
                    }
                ),
                processor="base"
            )

            print(f"Task Created. Run ID: {task_run.run_id}")
            run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
            print(run_result.output)
            ```

            ```typescript TypeScript theme={"system"}
            import Parallel from "parallel-web";

            const client = new Parallel({
              apiKey: process.env.PARALLEL_API_KEY,
            });

            async function main() {
              const taskRun = await client.taskRun.create({
                input: "Extract key company information including recent product announcements, CEO profile, and funding details. Company name: Parallel Web Systems. Company website: parallel.ai",
                task_spec: {
                  output_schema: {
                    type: "json",
                    json_schema: {
                      type: "object",
                      properties: {
                        product_announcements: {
                          type: "string",
                          description: "Most recent product announcements."
                        },
                        ceo_profile: {
                          type: "string",
                          description: "Summary of the CEO's background and profile."
                        },
                        funding_summary: {
                          type: "string",
                          description: "Summary of the company's funding history and current funding status"
                        }
                      },
                      required: ["product_announcements", "ceo_profile", "funding_summary"],
                      additionalProperties: false
                    }
                  }
                },
                processor: "base",
              });

              console.log(`Task Created. Run ID: ${taskRun.run_id}`);

              // Poll for results
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/task-api/task-quickstart" className="home-panel-link">
              View Enrichment Docs →
            </a>
          </div>
        </div>

        <div id="panel-findall" className="example-panel" style={{ display: 'none' }}>
          <CodeGroup>
            ```bash cURL theme={"system"}
            curl -X POST https://api.parallel.ai/v1beta/findall/runs \
              -H "x-api-key: $PARALLEL_API_KEY" \
              -H "Content-Type: application/json" \
              -H "parallel-beta: findall-2025-09-15" \
              -d '{
                "objective": "Find all startups in SF",
                "entity_type": "startups",
                "match_conditions": [
                  {
                    "name": "san_francisco_location_check",
                    "description": "Startup must be located in San Francisco."
                  }
                ],
                "generator": "core",
                "match_limit": 100
              }'
            ```

            ```python Python theme={"system"}
            # pip install parallel-web
            import os
            from parallel import Parallel

            client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

            # Create FindAll Run
            findall_run = client.beta.findall.create(
                objective="Find all startups in SF",
                entity_type="startups",
                match_conditions=[
                    {
                        "name": "san_francisco_location_check",
                        "description": "Startup must be located in San Francisco."
                    }
                ],
                generator="core",
                match_limit=100,
            )

            print(f"Created findall run with ID: {findall_run.findall_id}")
            ```

            ```typescript TypeScript theme={"system"}
            // npm install parallel-web
            import Parallel from "parallel-web";

            const client = new Parallel({
              apiKey: process.env.PARALLEL_API_KEY,
            });

            async function main() {
              const run = await client.beta.findall.create({
                objective: "Find all startups in SF",
                entity_type: "startups",
                match_conditions: [
                  {
                    name: "san_francisco_location_check",
                    description: "Startup must be located in San Francisco."
                  }
                ],
                generator: "core",
                match_limit: 100
              });

              console.log(`Findall run created: ${run.findall_id}`);
            }

            main().catch(console.error);
            ```
          </CodeGroup>

          <div className="mt-4 flex justify-end">
            <a href="/findall-api/findall-quickstart" className="home-panel-link">
              View FindAll Docs →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <LinksGrid />
</div>

<SocialFooter />

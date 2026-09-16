# What is WebMCP?

WebMCP lets websites expose tools to AI agents. See how the browser API works, how it differs from MCP, and how to implement JavaScript and HTML examples.

WebMCP (Web Model Context Protocol) is a proposed browser API that lets websites expose functions as tools for AI agents. A site describes what a tool does, which inputs it accepts, and how to run it. An agent can then call that tool instead of figuring out the same task through clicks and form fields. The [WebMCP specification](https://webmachinelearning.github.io/webmcp/) defines the browser-facing interface.

Consider an API dashboard. A developer asks an assistant, "How many requests did this account make in the past seven days?" The dashboard could expose a `get_api_usage` tool that returns the answer directly. The assistant would no longer need to find the right chart, change its date range, and interpret the result.

The name invites an obvious question: **is WebMCP just MCP in a browser?** Not quite. They share a tool-oriented approach, but WebMCP is a separate web-platform proposal, not an extension or replacement of the Model Context Protocol. [Chrome's comparison](https://developer.chrome.com/docs/ai/webmcp/compare-mcp) makes that distinction explicit.

_Technical details checked September 5, 2026. WebMCP is still evolving. Its _[_September 4 draft_](https://webmachinelearning.github.io/webmcp/)_ is a Community Group Report, not a W3C Standard or a specification on the W3C Standards Track._

## How WebMCP works

A website registers a tool with a name, a description, an input schema, and an execution handler. The browser makes that tool available to an authorized agent. When the agent selects it and supplies arguments, the browser invokes the site's code and returns the result. The [official explainer](https://github.com/webmachinelearning/webmcp/blob/main/README.md) describes this registration, discovery, invocation, execution, and response cycle.

The tool runs in the page's environment. It can reuse application code, inspect relevant client-side state, call the site's backend, and update the interface. The site still owns the implementation; the agent is choosing among capabilities the developer deliberately exposes.

For an interactive application, that shared state matters. A tool that changes a report's filters should update the report the user is looking at. Chrome's [workflow design guidance](https://developer.chrome.com/docs/ai/webmcp/build-tools) treats the application's initial state and expected interface updates as part of tool design.

WebMCP offers two authoring approaches: the **imperative API**, which registers JavaScript functions, and the **declarative API**, which adds tool annotations to HTML forms. Chrome introduced both approaches in its [WebMCP announcement](https://developer.chrome.com/blog/webmcp-epp).

## WebMCP vs. MCP: similarities and differences

Both approaches give an agent an explicit description of a capability. Tool names, descriptions, and JSON Schema inputs help the agent decide which action to request and which arguments to provide. MCP's [tools specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) uses this same basic vocabulary.

The difference is where those capabilities are exposed and how the agent reaches them.

| Area | WebMCP | MCP |
| --- | --- | --- |
| Integration surface | A running web page | An MCP server, running locally or remotely |
| Tool implementation | Page-owned JavaScript or an annotated HTML form | A server implementation that can call APIs, query data, or operate local tools |
| Communication | Browser-mediated web APIs | JSON-RPC; standard transports include stdio and Streamable HTTP |
| Available primitives | Tools | Tools, resources, and prompts |
| Application context | Can use the page's current state and normal authenticated application requests | Receives context and credentials through its own integration; it does not automatically inherit a tab's state |
| Lifetime | Registered tools belong to the document's lifecycle | Server availability is independent of a particular web page |
| Typical fit | Helping a user work inside an existing website | Giving agents access to services across desktop, web, and server environments |

Sources: [MCP architecture](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture) and [Chrome's WebMCP comparison](https://developer.chrome.com/docs/ai/webmcp/compare-mcp).

### Similar tool descriptions do not mean protocol compatibility

Registering a WebMCP tool does not create a remote MCP endpoint. You cannot assume an ordinary MCP client will discover it by connecting to the website's URL.

The WebMCP draft deliberately leaves the browser-to-agent representation open. A browser may expose tools through MCP, another function-calling interface, or a different mechanism. The page-facing API and the agent-facing integration are separate concerns. That flexibility is stated in the specification's [interaction with agents section](https://webmachinelearning.github.io/webmcp/#interaction-with-agents).

For an existing MCP service, keep its integration unless you have a reason to change it. WebMCP can provide another way into the same underlying application functionality.

### MCP is not limited to remote backend services

MCP servers can be local processes as well as hosted services. Our guide to [remote vs. local MCP servers](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers that deployment choice.

MCP can also support browser automation. Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp), for example, exposes browser capabilities through an MCP server. That is different from a website publishing its own WebMCP tools: the former gives an agent a browser automation interface; the latter gives it application-specific functions chosen by the site author.

There is also a separate [MCP Apps extension](https://modelcontextprotocol.io/extensions/apps/overview) for interactive interfaces rendered inside an MCP host. WebMCP works with an existing website; MCP Apps bring an interface into the agent's application. Neither should be confused with the other.

## WebMCP examples: JavaScript and HTML

The examples below follow Chrome's current [imperative](https://developer.chrome.com/docs/ai/webmcp/imperative-api) and [declarative](https://developer.chrome.com/docs/ai/webmcp/declarative-api) documentation. Older tutorials may use `navigator.modelContext`; the current API is `**document.modelContext**`. Check the browser build you are targeting, because this API is still changing.

### Example 1: expose API usage through a JavaScript tool

Suppose your dashboard already has an authenticated `/api/usage` endpoint. It accepts a reporting period and returns `{ "requestCount": 12345 }` for the signed-in account. The following module registers a read-only tool around that endpoint using the [imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api):

```javascript
// Run in a module script on a supporting page.
// /api/usage is an example application route, not a WebMCP endpoint.
if (typeof document.modelContext?.registerTool === "function") {
  await document.modelContext.registerTool({
    name: "get_api_usage",
    description: "Return API request totals for the signed-in account.",
    inputSchema: {
      type: "object",
      properties: {
        period: {
          type: "string",
          enum: ["past_7_days", "past_30_days"],
          description: "The reporting period for request totals."
        }
      },
      required: ["period"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true },
    async execute({ period }, { signal }) {
      if (!["past_7_days", "past_30_days"].includes(period)) {
        throw new Error("Choose past_7_days or past_30_days.");
      }

      const response = await fetch(`/api/usage?period=${period}`, {
        credentials: "same-origin",
        signal
      });
      if (!response.ok) {
        throw new Error(`Usage lookup failed (${response.status}).`);
      }

      const { requestCount } = await response.json();
      if (!Number.isSafeInteger(requestCount) || requestCount < 0) {
        throw new Error("The usage service returned an invalid count.");
      }
      return JSON.stringify({ period, requestCount });
    }
  });
}
```

For a seven-day report, the agent supplies `{"period":"past_7_days"}`. The handler validates that value, forwards cancellation to `fetch`, and returns the count as a JSON string, such as `{"period":"past_7_days","requestCount":12345}`. No MCP connection is opened; the tool calls the dashboard's existing endpoint.

The backend still needs to authorize the account on every request. The `readOnlyHint` describes the tool's intended behavior; it does not enforce permissions. Runtime checks are deliberate: Chrome's [best practices](https://developer.chrome.com/docs/ai/webmcp/best-practices) advise validating in application code rather than treating a schema as an enforcement mechanism.

### Example 2: turn a documentation search form into a tool

For an existing form, the declarative approach needs less code. Add `toolname` and `tooldescription`, then describe any fields that need extra context:

```html
<form
  action="/docs/search"
  method="get"
  toolname="search_documentation"
  tooldescription="Search this product's documentation by keyword."
  toolautosubmit
>
  <label for="docs-query">Search documentation</label>
  <input
    id="docs-query"
    name="q"
    type="search"
    required
    maxlength="200"
    toolparamdescription="The feature, API, or error to look up."
  >
  <button type="submit">Search</button>
</form>
```

Here, `/docs/search` is the site's existing search route. The browser derives a tool schema from the form controls. The `toolautosubmit` attribute allows the agent's invocation to submit this read-only search. Without that attribute, the documented flow requires the user to click Submit. See the [declarative API documentation](https://developer.chrome.com/docs/ai/webmcp/declarative-api).

For a purchase, deletion, or account change, do not copy the auto-submit choice from this search example. Keep the necessary review and confirmation steps. On browsers without WebMCP, this remains a conventional HTML search form.

## When should you use WebMCP instead of MCP?

**Choose WebMCP when the open application is important to the task.** A support agent could prepare a ticket in the form the user is viewing. A developer assistant could retrieve diagnostic information for the selected project. An analytics assistant could change a report's filters and show the result. Chrome's [user-journey examples](https://developer.chrome.com/docs/ai/webmcp/use-cases) describe this kind of collaboration between users, agents, and websites.

**Choose MCP when the capability should be available outside that page.** A service that searches documents, reads a database, or runs an overnight enrichment job should not depend on someone keeping a tab open. MCP's local and remote server model fits that requirement. For the underlying concepts, see [what MCP is and how it works](https://parallel.ai/articles/what-is-mcp).

**Use both when the product has both kinds of interaction.** Consider a CRM: a backend integration could support scheduled account research, while a WebMCP tool prepares an update in the account page for a salesperson to review. This is an architectural example, not a claim that a particular CRM already supports WebMCP.

Before adding tools, identify the step that makes the workflow difficult. A single action that retrieves the selected project's diagnostics may be more useful than a catalog of every function in the dashboard.

## Does WebMCP replace browser automation or web search?

No. It addresses a narrower problem: how an agent can use capabilities a website has intentionally exposed.

A browser agent still needs another method when a site provides no WebMCP tools or when a task falls outside them. The proposal explicitly allows conventional browser automation as a fallback. A useful page tool can replace several low-level browser operations, but that does not guarantee a faster or error-free result. See the explainer's [discussion of existing automation techniques](https://github.com/webmachinelearning/webmcp/blob/main/README.md#existing-web-actuation-techniques).

Web search operates earlier in many workflows: the agent needs to find relevant websites and retrieve evidence before it can decide where to act. WebMCP does not provide a web-wide index of sites or tools. Chrome's [WebMCP overview](https://developer.chrome.com/docs/ai/webmcp) documents the discovery limitation: a client must visit a site to learn which tools it exposes.

For example, an agent researching a prospect might use **Parallel Search MCP** to find the company's technical documentation and read relevant pages. Our server exposes `web_search` for discovery and `web_fetch` for retrieving specific URLs. A separate, WebMCP-enabled CRM could then let the agent prepare the researched update in its interface. Each integration would still require its own support and permissions. The [Search MCP documentation](https://docs.parallel.ai/integrations/mcp/search-mcp) covers the search and retrieval side.

## Browser support and getting started

As of September 5, 2026, the project's [implementation tracker](https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md) lists origin trials in Chrome 149 and Edge 150. This is experimental availability, not a reason to assume every browser and agent supports the same API surface.

For local Chrome development, the official setup uses `chrome://flags/#enable-webmcp-testing`. Enable the flag and relaunch Chrome. The [getting-started documentation](https://developer.chrome.com/docs/ai/webmcp) also describes the origin trial and the Model Context Tool Inspector extension for inspecting registered tools and invoking them during testing.

Feature-detect the API, as the JavaScript example does, and keep the normal user interface working without it. The current Chrome documentation also requires an origin-isolated document and applies the `tools` Permissions Policy. Secure deployment and iframe configuration need attention; finding a browser flag is not the entire integration.

Start with one read-only task users already struggle to complete. Test ordinary requests, ambiguous wording, invalid inputs, expired sessions, and unavailable services. Measure successful completion, latency, and user corrections against your existing approach. Chrome's [tool-building guide](https://developer.chrome.com/docs/ai/webmcp/build-tools) recommends evaluations and production telemetry; registering a tool is not evidence that it improves the task.

## Security: a tool description is not a permission check

Treat WebMCP tools as another way to reach application functionality, not as a trusted caller.

Authentication and authorization still belong in your application. Restrict the records a tool can read, preserve tenant boundaries, and keep service credentials out of client-side code. A request coming from an agent should not gain privileges an equivalent user action lacks. MCP's [tool security requirements](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations) likewise require input validation and access controls.

WebMCP's annotations communicate intent: `readOnlyHint` identifies tools intended not to change state, `untrustedContentHint` flags output containing untrusted material, and `consequentialHint` marks significant or irreversible actions. These are useful signals, but your application should enforce its own approval rules. A tool named `preview_change` should not silently commit it. Chrome's [tool security guidance](https://developer.chrome.com/docs/ai/webmcp/secure-tools) covers these annotations and the risks of exposing tools across origins.

Read-only also does not mean harmless: a tool can reveal private information without modifying anything. Return only what the task needs and review any cross-origin exposure. Tool outputs containing external or user-written text need special care: a structured response can still carry malicious instructions. Chrome's [agent security guidance](https://developer.chrome.com/docs/agents/security) discusses these risks and the need for multiple defenses.

## Frequently asked questions

### Do I need an MCP server to use WebMCP?

No. A website can register WebMCP tools in its frontend without implementing an MCP server. Those tools may still call ordinary backend APIs, as the usage example does. The browser-specific integration is separate from MCP's client-server protocol.

### Can WebMCP run headlessly?

Headless use is possible, but a browser document still has to run the page and its tools. Chrome's [overview](https://developer.chrome.com/docs/ai/webmcp) describes WebMCP as primarily designed for local browser workflows with a human involved. It is not a replacement for a server integration that must work without a page lifecycle.

### Should I replace an existing MCP integration?

Not just to adopt WebMCP. Keep MCP for clients and workflows that need it. Add WebMCP where direct access to the website's current state and interface makes a user task easier. The two can share application logic without being interchangeable protocols.

## Make the next action explicit

WebMCP gives site authors a way to replace guesswork about an interface with named, testable actions. It is worth evaluating where an agent and a user need to work in the same application, while keeping MCP integrations that serve clients outside that page.

When the task begins with finding information across the web, start with [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp). It supplies web search and page retrieval. A participating site's WebMCP tools can handle the next step inside its application.

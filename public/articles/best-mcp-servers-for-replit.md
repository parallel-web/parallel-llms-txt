# Replit MCP: the best MCP servers for Replit Agent in 2026

Replit MCP support lets you plug outside tools into Replit Agent itself, from a one-click catalog or any HTTPS endpoint. This guide covers setup and auth, seven servers worth installing from Parallel and Stripe to Supabase, Sentry, and PostHog, hosting your own server on Replit, and a side-by-side table.

Replit Agent builds, runs, and deploys full-stack apps from a chat, and it reaches outside services in two ways. **Connectors** are first-party integrations Replit maintains, like the Stripe payments connector or Google Workspace, that your app's code uses. **MCP servers** give the agent itself new tools: it fetches each server's tool list and calls those tools while it works, in every project on your account.

The two overlap more than they used to. Replit's catalog at [replit.com/integrations](https://replit.com/integrations) now lists both, and a few services, Stripe among them, appear as a connector and as an MCP server. Everything below is about the MCP side. Disclosure: we make Parallel, pick #1. The rest are vendors' own hosted servers from Replit's curated list.

## How MCP works in Replit Agent

**Pre-listed servers.** Go to [replit.com/integrations](https://replit.com/integrations), select **Discover integrations**, and filter **All types** to **MCP**. Click **Sign in** next to a server and finish the vendor's OAuth screen ([Connect via MCP](https://docs.replit.com/build/connect-via-mcp)). Replit's [MCP list](https://docs.replit.com/features/mcp/overview) shows each server with an **Add to Replit** button; as of November 2026 it includes Airtable, Amplitude, Apollo, Atlassian, Granola, Linear, Miro, Mixpanel, Notion, PostHog, Sanity, Sentry, Stripe, Supabase, Twilio, You.com, Zapier, and more than a dozen others. Figma is built in differently: paste a Figma link in the chat.

**Custom servers.** Open **Settings → Integrations → Your integrations** and choose **Add custom → Add personal MCP server**. Give it a display name (Agent uses it in chat logs), paste the HTTPS endpoint, and open **Advanced settings** if the server wants a header such as `Authorization` or `X-API-Key`. **Test & save** connects and runs any OAuth flow the server needs. Replit handles OAuth dynamic client registration automatically, which is how most pre-listed servers sign in.

Workspace admins get a second option, **Add workspace MCP server**, and choose whether members share one connection or each sign in. Replit notes that custom MCP options depend on feature availability and permissions for your account or workspace; if they're missing, the admin is the person to ask.

**Using a server.** Once connected, a server's tools are available across all your projects. Agent picks tools on its own, and you can steer it by name: "Use the Notion MCP server to find the most recent meeting notes." Tools that need confirmation prompt before they run.

**Security scanning.** Replit runs all MCP traffic through a security scanner that evaluates tool definitions and planned calls and blocks ones it considers unsafe. If a tool gets rejected, Agent tells you. That's a backstop, and Replit still warns to connect only servers you trust.

**Install links.** Any server can be shared as a one-click link: base64-encode `{"displayName": ..., "baseUrl": ..., "headers": [...]}` and append it to `https://replit.com/integrations?mcp=`. Vendors use these as "Add to Replit" badges in their READMEs.

**Plans.** Replit's paid plans are Core at $20 a month ($18 billed annually) and Pro from $100 a month ($90 billed annually), with Enterprise priced by contract, per [replit.com/pricing](https://replit.com/pricing) checked November 22, 2026. Replit's docs also describe a free Starter plan. Most first-party connectors need Core, Pro, or Enterprise, and the catalog in your workspace marks what your plan can use.

## The best MCP servers for Replit

### 1. Parallel MCP

Replit Agent already searches the web. Its built-in [Web Search](https://docs.replit.com/features/agent/web-search) is on by default, fetches pages, and shows citations, and it does a good job of the everyday build-time questions: which charting library is maintained, what the current version of an SDK looks like. You don't need a server for that.

[Parallel MCP](https://parallel.ai/mcp) adds a different set of tools to the same agent. `web_search` returns ranked results with excerpts dense enough to answer from, `web_fetch` reads up to 20 URLs per call as clean markdown (PDFs and JavaScript-heavy pages included), `web_decisions` answers a typed question such as a probability, a pick among options, or a score, with sources, and `image_search` finds images by description. Those four are free with no key at lower rate limits. That's useful when Agent is building something that needs a lot of real data on day one, like seeding a directory app with 40 real vendors and their pricing pages.

Parallel isn't in Replit's pre-listed catalog, so add it as a custom server:

```text
Display name: Parallel
MCP Server URL: https://mcp.parallel.ai/mcp
Advanced settings: leave empty for keyless use
```

Or use this [Add to Replit install link](https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IlBhcmFsbGVsIiwiYmFzZVVybCI6Imh0dHBzOi8vbWNwLnBhcmFsbGVsLmFpL21jcCJ9), built with Replit's documented link format. To add `web_research`, which researches one question and returns a cited answer, and to raise rate limits, put `Authorization` with the value `Bearer YOUR_PARALLEL_API_KEY` in Advanced settings, using a key from [platform.parallel.ai](https://platform.parallel.ai). Signed-in calls bill at the API rates (Search fast mode is $1 per 1,000 requests), and new accounts get up to $80 in free credits plus $5 a month with a card on file.

The MCP server covers the agent. If the app you're building should search the web for its own users, ask Agent to call [Parallel's Search API](https://parallel.ai/products/search) from your backend and store the key in Replit's Secrets; the [Parallel docs](https://docs.parallel.ai) have the request shapes. Replit's catalog also lists You.com's MCP server for web search, if you want to compare. Our [web search MCP comparison](https://parallel.ai/articles/best-web-search-mcp) covers the field.

### 2. Stripe

Stripe is in Replit twice, and the distinction is the clearest example of connector versus MCP. The **Stripe connector** wires payments into your app: checkout, subscriptions, webhooks. The **Stripe MCP server** at `https://mcp.stripe.com` lets Agent look things up and act in your Stripe account while it builds, through tools like `stripe_api_search`, `stripe_api_read`, and `stripe_api_write`, which cover most of the API without flooding the context ([Stripe MCP docs](https://docs.stripe.com/mcp)).

Use the MCP server to have Agent create the products and prices your pricing page needs, or check why a test subscription failed. OAuth consent lets you grant access to sandboxes and live accounts separately, so give it a sandbox first. Two dates to know: OAuth refresh tokens expire 14 days after you authorize, and from January 11, 2027, Stripe MCP stops accepting full-access secret keys and non-agent restricted keys, so header-based setups should move to an agent API key.

### 3. Supabase

Replit provisions its own managed database for apps Agent builds, so most projects don't need this one. Add Supabase when your data already lives in a Supabase project, or when a Replit app is the new front end for an existing backend. The server lists tables, runs SQL, applies migrations, and generates TypeScript types.

The pre-listed entry connects to `https://mcp.supabase.com/mcp` with your whole account. For anything near production, add it as a custom server instead, with Supabase's URL parameters: `?project_ref=<id>&read_only=true` scopes it to one project and runs every query as a read-only Postgres user ([Supabase MCP docs](https://supabase.com/docs/guides/getting-started/mcp)). Supabase also says plainly that the server runs with your developer permissions and shouldn't be exposed to your app's end users.

### 4. Sentry

Once a Replit app has users, Sentry is how Agent sees what broke. Paste an issue URL into the chat and the server pulls the stack trace and event details, and its Seer tool can analyze the root cause before Agent edits code. The endpoint is `https://mcp.sentry.dev/mcp` with OAuth. To keep Agent inside one project, add `/your-org/your-project` to the URL path as a custom server. Sentry labels its MCP server beta.

### 5. PostHog

PostHog's hosted server at `https://mcp.posthog.com/mcp` gives Agent your product analytics, session replay, feature flags, and error tracking. The useful loop on Replit: ask Agent which step of the signup funnel loses the most users, then have it change that screen and put the change behind a flag. Connecting and calling tools is free, though some AI-powered tools bill as PostHog AI usage and only appear when AI data processing is on for your organization ([PostHog MCP docs](https://posthog.com/docs/model-context-protocol)). PostHog also publishes a [Replit-specific setup guide](https://posthog.com/docs/integrations/replit) for instrumenting the app itself.

### 6. Linear

Linear lets Agent create and update issues: file the bugs it finds while testing, or pick up the next ticket and build it. One detail: Replit's pre-listed entry points at `https://mcp.linear.app/sse`, which [Linear's docs](https://linear.app/docs/mcp) call a deprecated fallback. If the listing gives you trouble, add `https://mcp.linear.app/mcp` as a custom server, or `https://mcp.linear.app/mcp/readonly` if Agent should read tickets but never change them. Each OAuth session covers one Linear workspace.

### 7. Zapier

Zapier is the catch-all. Replit's listing describes it as reaching 9,000+ apps, so one connection covers services with no MCP server of their own: post to a Slack channel when Agent finishes a deploy, log a row in a Google Sheet, or create a CRM record. After you sign in at `https://mcp.zapier.com/api/v1/connect`, Zapier provisions your server with actions for the apps you've already connected there. Each successful tool call uses two tasks from your Zapier plan, so heavy use shows up on that bill.

Notion, Granola, Mixpanel, Airtable, and Atlassian are also one click away in Replit's catalog. They're good choices when your specs, notes, or data live there; we picked the seven above for building and running apps.

## Building and hosting your own MCP server on Replit

Replit is also a place to run MCP servers, which is the right answer when your internal API has no server yet. The [xmcp Replit template](https://replit.com/@matt/MCP-on-Replit-TS) scaffolds a TypeScript server: remix it, ask Agent to add the tools you want, then select **Publish**. The xmcp docs recommend an Autoscale deployment for stateless HTTP servers, and your server lands at `https://<your-app>.replit.app/mcp` ([xmcp Replit guide](https://xmcp.dev/docs/deployment/replit)). Add it back to Replit as a custom server, share it with an install link, or connect it from Claude Code or Cursor.

The opposite direction exists too. The [Replit MCP server](https://docs.replit.com/platforms/mcp-server) at `https://mcp.replit.com/server/mcp` lets other clients create, search, update, and publish Replit Apps over OAuth. Replit has native integrations for ChatGPT, Claude, and Slack, and documents direct setup for Codex and Claude Code. Our guides to [Claude Code](https://parallel.ai/articles/best-mcp-servers-for-claude-code) and [Codex CLI](https://parallel.ai/articles/best-mcp-servers-for-codex-cli) cover those clients' own server lists.

## The picks side by side

| Server | What Agent gets | Endpoint | Auth | In Replit's catalog |
| --- | --- | --- | --- | --- |
| Parallel MCP | Web search, page fetch, decisions, image search, research | mcp.parallel.ai/mcp | None, or API key header | No, add as custom |
| Stripe | Stripe API method search, read, and write | mcp.stripe.com | OAuth or agent API key | Yes, plus a separate Stripe connector |
| Supabase | Tables, SQL, migrations, types | mcp.supabase.com/mcp | OAuth or access token | Yes |
| Sentry | Issues, stack traces, root-cause analysis | mcp.sentry.dev/mcp | OAuth | Yes |
| PostHog | Analytics, replays, flags, errors | mcp.posthog.com/mcp | OAuth | Yes |
| Linear | Issues and projects | mcp.linear.app/mcp | OAuth or API key | Yes (SSE endpoint) |
| Zapier | Actions across 9,000+ apps | mcp.zapier.com/api/v1/connect | OAuth | Yes |

## Which should you choose

- **You're building a SaaS app with billing:** Stripe MCP pointed at a sandbox, alongside the Stripe connector for the app's own payments.
- **Your app already has a Supabase backend:** Supabase, scoped with `project_ref` and `read_only`.
- **The app is live and you're fixing things:** Sentry for errors, PostHog for what users actually do.
- **The app needs real-world data or research while Agent builds it:** Parallel MCP, keyless to start.
- **You want Agent to file and close its own tickets:** Linear on the `/mcp` endpoint.
- **You need one integration for many small services:** Zapier, with an eye on task usage.

Start with two. Every server adds tool descriptions Agent has to read, and a short list keeps it choosing the right tool.

Building in Lovable instead? Our [Lovable MCP guide](https://parallel.ai/articles/best-mcp-servers-for-lovable) covers chat connectors, app connectors, and custom MCP servers.

## FAQ

### Does Replit support MCP servers?

Yes. Replit Agent connects to remote MCP servers from a curated catalog at replit.com/integrations, or to any HTTPS server you add under Settings → Integrations → Your integrations → Add custom. Connected servers are available in all your projects.

### How do I add a custom MCP server to Replit?

Choose Add custom → Add personal MCP server, enter a display name and the server's HTTPS URL, add any auth headers under Advanced settings, and click Test & save. Replit runs the OAuth flow if the server uses one.

### What's the difference between a Replit connector and an MCP server?

A connector is a first-party integration Replit maintains so your app can use a service, like taking Stripe payments. An MCP server gives Replit Agent tools to use while it builds. Some services, Stripe included, offer both.

### Do I need a paid Replit plan to use MCP servers?

Replit's docs say custom MCP options depend on feature availability and permissions for your account or workspace, and most first-party connectors need Core ($20 a month), Pro, or Enterprise. Your workspace's Integrations page shows what your plan includes.

### Can I host my own MCP server on Replit?

Yes. Remix the xmcp Replit template, have Agent add your tools, and publish it as an Autoscale deployment; the server is served at your-app.replit.app/mcp.

### Does Replit have its own MCP server?

Yes, at https://mcp.replit.com/server/mcp. It lets clients like Claude Code and Codex create, update, and publish Replit Apps after an OAuth sign-in.

## Add your first server

Add `https://mcp.parallel.ai/mcp` as a custom MCP server with no headers, then ask Agent to research something your app needs before it writes code. Setup for other clients is on [parallel.ai/mcp](https://parallel.ai/mcp), and our [remote vs. local MCP explainer](https://parallel.ai/articles/remote-vs-local-mcp-servers) covers why Replit only takes remote servers.

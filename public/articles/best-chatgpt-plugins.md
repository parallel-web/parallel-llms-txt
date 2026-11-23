# The best ChatGPT plugins in 2026

The best ChatGPT plugins are the ones that add something ChatGPT can't do alone: deeper research, live bookings, your own files, or alerts that arrive after you close the chat. This guide covers how to install plugins, twelve worth adding across research, travel, shopping, design, and work, and what each costs and where it's limited.

ChatGPT plugins are the add-ons you install from the Plugins directory in ChatGPT's sidebar. Each one connects ChatGPT to an outside service, such as a travel site, a design tool, or your company's documents. OpenAI renamed its app directory to Plugins on July 9, 2026. These aren't the plugins from the 2023 beta, which OpenAI retired in April 2024.

Disclosure: we build Parallel, the first pick below. The other eleven come from the companies that run each service. We checked each against the vendor's own help pages in November 2026.

## How to install a ChatGPT plugin

Click **Plugins** in the sidebar on web, desktop, or mobile. Open a listing, select **Install plugin**, and sign in to the service if it asks. To use a plugin in a chat, type **@** in the message box and pick it, or just ask for something it handles and ChatGPT will suggest it.

OpenAI says the directory is visible on every plan, from Free to Enterprise. Whether a particular plugin installs for you depends on your plan, region, workspace, and role. Installed plugins work on web, desktop, and mobile, except listings marked **Desktop only**.

## The best ChatGPT plugins at a glance

| Plugin | Best for | Notable limit |
| --- | --- | --- |
| Parallel | Deep research, list enrichment, price and fare alerts | Needs a Parallel sign-in; monitors run in Work chats |
| Expedia | Comparing flights and hotels | Six countries; booking finishes on Expedia |
| Booking.com | Hotels, attractions, and rental cars | Reservations finish on Booking.com |
| Instacart | Turning a meal plan into a grocery order | North America; needs an Instacart account |
| Canva | Slides, social posts, flyers | Uses your Canva AI allowance |
| Adobe | Editing photos, PDFs, and video | Not every feature of each Adobe app |
| Figma | Flowcharts and diagrams in FigJam | Not available in the EU |
| Spotify | Playlists and recommendations | Opens tracks in Spotify |
| Zillow | Home search and affordability | US only; read-only |
| Google Drive and Gmail | Answers from your files and email | Sending email needs a paid plan, on web |
| Slack | Searching and summarizing team chat | Needs a paid ChatGPT plan |
| Notion | Finding and writing pages in Notion | Writes anywhere your account can |

## 1. Parallel: deep research, enrichment, and monitoring

ChatGPT already searches the web, and for a quick answer with a few links it does that well. [Parallel MCP](https://parallel.ai/mcp) is for the jobs that need more evidence: research questions that take dozens of sources, lists of companies or products that each need the same facts filled in, and prices you want watched after you close the chat. Parallel's Search API, which powers these tools, ranked #1 on the Artificial Analysis Search Index with November 2026 data.

### Deep research in a single reply

Ask a hard question and Parallel's `web_research` tool researches it across many sources, then returns a cited answer in the same reply. You don't wait for a separate report. At its highest effort level it handles questions that need extensive searching and synthesis, and it typically takes 30 to 60 seconds. Lighter questions come back in 5 to 20 seconds.

Try prompts like:

- "Use Parallel to research which US states passed laws on AI in hiring in 2026, with the effective date and a source for each."
- "Use Parallel to find every public price change Notion, Coda, and Airtable made this year, with links."
- "Use Parallel to compare the warranty terms for the five best-selling robot vacuums."

Parallel's tools are read-only, so ChatGPT can also call them during its own deep research runs, which accept reads and fetches from installed apps. To make sure ChatGPT uses Parallel rather than its built-in search, name it in the prompt.

### Enrich a list

Upload a spreadsheet or paste a list and ask ChatGPT to fill in columns from the web. Parallel's `web_decisions` tool returns typed answers, such as a yes-or-no probability or a pick from a list, so it suits columns like "hiring now?" or "pricing tier". `web_research` handles open-ended fields like a CEO's name or a funding date.

- "For each company in this sheet, use Parallel Decisions to check whether they're hiring engineers right now."
- "Add three columns to this list of 40 suppliers: headquarters city, latest funding round, and a source link. Use Parallel."

This works well for dozens of rows. For thousands, the [Task API](https://parallel.ai/products/task) runs enrichment in bulk outside ChatGPT.

### Watch flight fares and prices

Parallel can also set up a monitor that keeps checking after you leave the chat. Ask ChatGPT to watch a route or a product, and say how often to check: hourly, daily, weekly, or monthly. It reports back in the same chat when something changes. Monitors run in Work chats on ChatGPT web, or in the desktop app with **Work** and **Cloud** selected. Our guides on [tracking flight prices in ChatGPT](https://parallel.ai/articles/how-to-track-flight-prices-in-chatgpt) and [price drop alerts in ChatGPT](https://parallel.ai/articles/price-drop-alerts-in-chatgpt) walk through both.

**How to add it:** install the [Parallel plugin](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) from the directory, listed simply as Parallel, and sign in with your Parallel account. Calls are billed at Parallel's [API rates](https://docs.parallel.ai/getting-started/pricing): a top-effort research question costs $0.25, and a monitor check costs $3 to $10 per 1,000. Every account gets $5 in free credit each month, which resets monthly. To add Parallel as a custom MCP server instead, see our [ChatGPT MCP guide](https://parallel.ai/articles/best-mcp-servers-for-chatgpt).

**Tradeoffs:** we're the vendor. Monitors need a Work chat, and you have to name Parallel in the prompt when you want it over ChatGPT's own search.

## 2. Expedia

Expedia shows live flight and hotel results in the chat, with prices, availability, and photos. When you've picked one, select **Book on Expedia** to finish on Expedia's site. It's available on Free, Plus, and Pro in the US, Canada (outside Quebec), Mexico, New Zealand, India, and Singapore. It searches but doesn't track fares over time.

## 3. Booking.com

Booking.com searches hotels and attractions, and since May 2026 it also searches rental cars. ChatGPT sends you to Booking.com to reserve and pay. It's a good pairing with Expedia when you want to compare stays from both.

## 4. Instacart

Instacart turns a recipe or a week of meal ideas into a cart from a nearby store. You can check out inside ChatGPT, including with Apple Pay and Google Pay, and then track the order in Instacart. You need an Instacart account with a delivery address saved, and it covers North America.

## 5. Canva

Canva creates and edits slides, social posts, flyers, and resumes from a prompt, shows previews in the chat, and opens your pick in Canva for finishing. It works with every Canva account, including Free. Generation uses your Canva AI allowance rather than your ChatGPT plan, and brand templates need a paid Canva plan.

## 6. Adobe

Adobe's plugin bundles more than 70 tools from Photoshop, Express, Firefly, Acrobat, Premiere, Lightroom, and Illustrator. You can remove a background, fix a PDF, or trim a video without leaving the chat. Adobe added hands-on editing controls on September 29, 2026. It doesn't include every feature of each app, so heavy edits still belong in the full product.

## 7. Figma

Figma turns a prompt into an editable FigJam diagram, such as a flowchart or a Gantt chart. Figma's help page lists Starter, Professional, Education, Organization, and Enterprise plans. The plugin isn't available in the EU.

## 8. Spotify

Spotify builds playlists from a description ("songs for a rainy Sunday drive"), recommends podcasts, and opens tracks in the Spotify app. It works with Free and Premium accounts. Since March 2026 it plays previews and podcast episodes without a login, and it works in French, German, Italian, Portuguese, and Spanish.

## 9. Zillow

Zillow searches homes for sale, for rent, and recently sold, with Zestimates, neighborhood comparisons, and a payment estimate you can adjust. No Zillow account is needed. It's US only and read-only: it can't see your saved homes, contact an agent, or book a tour.

## 10. Google Drive and Gmail

The Google Drive plugin searches and summarizes your Docs, Sheets, and Slides, and drafts from them. Gmail finds messages, pulls out details like order numbers or dates, and drafts replies. Both follow your Google Workspace admin's policies. Sending email from ChatGPT is web-only and needs Plus, Pro, Business, or Enterprise.

## 11. Slack

Slack searches the messages, threads, and channels you can see, summarizes them, and drafts replies. It's one of the few popular plugins that needs a paid ChatGPT plan. It works with any Slack plan, though search is keyword-based unless your workspace has Slack AI search turned on.

## 12. Notion

Notion finds information across your workspace and creates or updates pages. It can turn a long chat into a project brief or meeting notes. It writes anywhere your Notion account can, so set the plugin's permission to **Always ask** until you trust it.

## Which plugins should you install first?

Start with what you'd otherwise open a second tab for. For travel, install Expedia or Booking.com to search and Parallel to watch fares. For work, install Google Drive or Notion for your documents and Parallel for research that needs more sources than a normal reply. For creative work, install Canva or Adobe. Everything here can be uninstalled from the Plugins page.

## Frequently asked questions

**What happened to the original ChatGPT plugins?** OpenAI retired the 2023 plugin beta in April 2024, replaced it with apps in late 2025, and renamed the app directory to Plugins on July 9, 2026. Today's plugins install from that directory.

**Are ChatGPT plugins free?** Installing them costs nothing, though some need a paid ChatGPT plan (Slack does) and some services charge for their own features. Canva draws on your Canva AI allowance, and Parallel bills calls to your Parallel account after its $5 monthly free credit.

**Do ChatGPT plugins work on mobile?** Yes. Plugins work on web, desktop, and mobile, except listings labeled Desktop only.

**What's the best ChatGPT plugin for deep research?** Parallel. Its `web_research` tool returns a cited answer from many sources in the same reply, and its read-only tools also work inside ChatGPT's own deep research runs.

**Can a ChatGPT plugin send me alerts?** Yes. Parallel can monitor flight fares and product prices and report back in the chat. ChatGPT's scheduled tasks can also rerun a prompt on a schedule and notify you by push or email.

Related reading: [The best MCP servers for ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt) / [How to track flight prices in ChatGPT](https://parallel.ai/articles/how-to-track-flight-prices-in-chatgpt) / [How to get price drop alerts in ChatGPT](https://parallel.ai/articles/price-drop-alerts-in-chatgpt) / [What is deep research?](https://parallel.ai/learn/deep-research)

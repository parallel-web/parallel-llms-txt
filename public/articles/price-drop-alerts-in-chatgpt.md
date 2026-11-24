# How to get price drop alerts in ChatGPT

Price drop alerts in ChatGPT let you name a product and a target price once, then hear back when a store hits it or restocks. This guide covers how to compare prices across stores with Parallel, how to set up alerts with a scheduled task, how to word the request, what discounts to expect around Black Friday 2026, and the dedicated price trackers worth comparing.

ChatGPT's shopping research will compare products and prices for you, but it reports what things cost today. OpenAI's help page describes saving products to your Library, not tracking their prices. To get an alert when a price drops or an item comes back in stock, you need something that keeps checking. In ChatGPT that's a scheduled task, and a product search plugin like Parallel helps you find the price worth waiting for.

## Compare prices across stores with Parallel

[Parallel](https://parallel.ai/mcp) is a ChatGPT plugin for web research, and it now searches products across stores. Results arrive as structured fields (price, seller, image, availability, and a link), so ChatGPT can compare them against your rules instead of reading store pages.

1. Install the [Parallel plugin](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) from **Plugins** in the ChatGPT sidebar, and sign in with your Parallel account when asked.
2. Name the product, the stores you'd buy from, and your price, and name Parallel in the prompt so ChatGPT uses it over its own search.

Prompts that work:

- "Use Parallel to find Sony WH-1000XM5 headphones under $300 at major US retailers."
- "Use Parallel to check which stores have the LEGO Bonsai Tree in stock."
- "Use Parallel to find the lowest current price on a 65-inch LG C5 OLED, with the store and shipping cost."

Searches are billed to your Parallel account at [API rates](https://docs.parallel.ai/getting-started/pricing), $5 per 1,000 product searches. Every account gets $5 in free credit each month, and it resets monthly, which covers 1,000 searches.

A search shows today's prices. To hear when one drops, set a scheduled task to recheck it.

## Set up a ChatGPT scheduled task

Scheduled tasks rerun a prompt on a timer and notify you by push, email, or both. ChatGPT describes monitoring tasks as checks that notify you only when there's a relevant update, which suits price watching:

"Every day at 9 a.m., check the price of the Dyson V15 Detect at Best Buy, Target, and Amazon. Only notify me if one of them is under $550."

Every plan includes tasks: 3 active tasks on Free and Go, 5 on Plus, 10 on Business and Edu, and 15 on Pro and Enterprise. Free tasks run at most once a day in a broad window like "morning", while paid plans can run hourly at exact times. Each run uses your plan's usage even when the price hasn't moved. Details are on [OpenAI's scheduled tasks help page](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt).

## How to write a price-alert prompt

The more specific the prompt, the fewer false alarms:

- **The exact product.** Model number, size, color, and generation. "AirPods Pro" matches several products; "AirPods Pro 3" matches one.
- **Condition.** New only, or open-box and refurbished too.
- **Stores.** Any retailer, or only the ones you trust for returns.
- **The trigger.** A price ceiling, a percentage drop, or back in stock.
- **What to send.** Store, price, shipping, and a link.

## What to expect this holiday season

Adobe's [2026 holiday forecast](https://news.adobe.com/news/2026/09/adobe-us-holiday-shopping-season-to-hit-record) expects US online discounts to build through November: up to 14% early in the month, up to 21% before Thanksgiving, and around 30% at the peak during Cyber Week. By category, Adobe expects the deepest Black Friday discounts on TVs, toys, apparel, and appliances, and the deepest Cyber Monday discounts on electronics. Black Friday is November 27 and Cyber Monday is November 30, 2026.

Adobe also forecasts that traffic to retail sites from AI services will grow 130% year over year, with the biggest jump on Thanksgiving. A daily task set now catches the drops as they happen across that week.

## Other price trackers outside ChatGPT

Plenty of dedicated tools do price alerts well:

| Tool | Stores | How it alerts you |
| --- | --- | --- |
| [Google Shopping price tracking](https://support.google.com/googleshopping/answer/13971184) | Many stores, in the US, Canada, Australia, Japan, and India | Push through the Google app, plus email, when the price falls below your target |
| [Chrome price tracking](https://support.google.com/chrome/answer/11625545) | Product pages you visit | Notifications, with price history in the browser |
| [camelcamelcamel](https://camelcamelcamel.com/) | Amazon | Email when the price hits your threshold |
| [Keepa](https://keepa.com/) | Amazon, in 11 countries | Email, Telegram, web push, or app |
| [PayPal Honey Droplist](https://help.joinhoney.com/article/79-what-is-droplist) | Supported stores | Email when the price drops below your amount |

Google's tools also show whether a price is high, low, or typical compared with the past three months, which helps you decide if a "sale" is a real one. If you only shop on Amazon, camelcamelcamel and Keepa have years of price history. ChatGPT fits best when you're already researching there and want one set of rules across stores.

## Building a shopping agent?

Parallel's [Shopping API](https://docs.parallel.ai/getting-started/pricing), in early access, returns up to 40 products per request, linked to store product pages, for $5 per 1,000 requests, and any MCP client can reach it through `https://mcp.parallel.ai/mcp`. When thousands of users ask an agent to find prices on the same day, each search is one API call, not a browser session.

## Frequently asked questions

**Can ChatGPT track prices?** Its shopping research and plugins like Parallel compare current prices but don't track them over time. Set up a scheduled task to get alerts.

**Can ChatGPT tell me when something is back in stock?** Yes, with a scheduled task. Ask for an alert when the item shows as available, and name the stores you'd buy from.

**Is ChatGPT good at finding deals?** It's good at comparing options and explaining tradeoffs. OpenAI notes that prices come from third parties and may lag, so check the price on the store's page before you buy.

**Can ChatGPT buy the item for me?** Usually not. In 2026 most ChatGPT shopping purchases finish on the merchant's own website or app.

Related reading: [The best ChatGPT plugins in 2026](https://parallel.ai/articles/best-chatgpt-plugins) / [How to track flight prices in ChatGPT](https://parallel.ai/articles/how-to-track-flight-prices-in-chatgpt) / [The best MCP servers for ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt)

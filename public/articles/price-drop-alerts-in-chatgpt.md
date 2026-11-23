# How to get price drop alerts in ChatGPT

Price drop alerts in ChatGPT let you name a product and a target price once, then hear back when a store hits it or restocks. This guide covers two ways to set alerts up, a Parallel monitor and a scheduled task, how to word the request, what discounts to expect around Black Friday 2026, and the dedicated price trackers worth comparing.

ChatGPT's shopping research will compare products and prices for you, but it reports what things cost today. OpenAI's help page describes saving products to your Library, not tracking their prices. To get an alert when a price drops or an item comes back in stock, you need something that keeps checking. In ChatGPT that's a Parallel monitor or a scheduled task.

## Option 1: Set up a price monitor with Parallel

[Parallel](https://parallel.ai/mcp) is a ChatGPT plugin for web research. It can now search products across stores and monitor them after you close the chat. When the price or stock status changes, Parallel sends an update back into the same conversation. Results arrive as structured fields (price, seller, image, availability, and a link), so ChatGPT can compare them against your rules instead of reading store pages.

1. Install the [Parallel plugin](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) from **Plugins** in the ChatGPT sidebar, and sign in with your Parallel account when asked.
2. Start a **Work** chat on ChatGPT web, or select **Work** and **Cloud** in the desktop app. Monitors use a ChatGPT feature called MCP events, which runs in those chats.
3. Name the product, how often to check, the price or condition you care about, and what ChatGPT should do when it happens.
4. Ask ChatGPT to stop monitoring when you've bought it.

Monitors can check hourly, daily, weekly, or monthly (any interval from 1 hour to 30 days), so say how often you want the price checked. Each check is billed to your Parallel account at the [Monitor API rates](https://docs.parallel.ai/getting-started/pricing), $3 to $10 per 1,000 checks. Every account gets $5 in free credit each month, and it resets monthly. That covers at least 500 checks: an hourly monitor for about three weeks, or a dozen daily monitors for a month.

Prompts that work:

- "Tell me when Sony WH-1000XM5 headphones drop below $300 at any major US retailer."
- "Let me know when the LEGO Bonsai Tree is back in stock."
- "Watch the price of a 65-inch LG C5 OLED through Cyber Monday. Tell me the store and price each time a new low appears."

## Option 2: Use a ChatGPT scheduled task

Scheduled tasks rerun a prompt on a timer and notify you by push, email, or both. ChatGPT describes monitoring tasks as checks that notify you only when there's a relevant update, which suits price watching:

"Every day at 9 a.m., check the price of the Dyson V15 Detect at Best Buy, Target, and Amazon. Only notify me if one of them is under $550."

Every plan includes tasks: 3 active tasks on Free and Go, 5 on Plus, 10 on Business and Edu, and 15 on Pro and Enterprise. Free tasks run at most once a day in a broad window like "morning", while paid plans can run hourly at exact times. Each run uses your plan's usage even when the price hasn't moved. Details are on [OpenAI's scheduled tasks help page](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt).

|  | Parallel monitor | Scheduled task |
| --- | --- | --- |
| Where results arrive | The same chat | Push notification or email |
| What it checks | Structured product results across stores | Whatever ChatGPT finds when it reruns your prompt |
| Runs when nothing changed | Stays quiet | Still uses a run |
| How often | Hourly, daily, weekly, or monthly | Up to hourly on paid plans, daily on Free |
| Cost | $3 to $10 per 1,000 checks, after $5 free credit each month | Included in your ChatGPT plan |
| Best for | Several items, or alerts only on real changes | One or two items on any plan |

## How to write a price-alert prompt

The more specific the prompt, the fewer false alarms:

- **The exact product.** Model number, size, color, and generation. "AirPods Pro" matches several products; "AirPods Pro 3" matches one.
- **Condition.** New only, or open-box and refurbished too.
- **Stores.** Any retailer, or only the ones you trust for returns.
- **The trigger.** A price ceiling, a percentage drop, or back in stock.
- **What to send.** Store, price, shipping, and a link.

## What to expect this holiday season

Adobe's [2026 holiday forecast](https://news.adobe.com/news/2026/09/adobe-us-holiday-shopping-season-to-hit-record) expects US online discounts to build through November: up to 14% early in the month, up to 21% before Thanksgiving, and around 30% at the peak during Cyber Week. By category, Adobe expects the deepest Black Friday discounts on TVs, toys, apparel, and appliances, and the deepest Cyber Monday discounts on electronics. Black Friday is November 27 and Cyber Monday is November 30, 2026.

Adobe also forecasts that traffic to retail sites from AI services will grow 130% year over year, with the biggest jump on Thanksgiving. A monitor set now catches the drops as they happen across that week.

## Other price trackers outside ChatGPT

Plenty of dedicated tools do price alerts well:

| Tool | Stores | How it alerts you |
| --- | --- | --- |
| [Google Shopping price tracking](https://support.google.com/googleshopping/answer/13971184) | Many stores, in the US, Canada, Australia, Japan, and India | Push through the Google app, plus email, when the price falls below your target |
| [Chrome price tracking](https://support.google.com/chrome/answer/11625545) | Product pages you visit | Notifications, with price history in the browser |
| [camelcamelcamel](https://camelcamelcamel.com/) | Amazon | Email when the price hits your threshold |
| [Keepa](https://keepa.com/) | Amazon, in 11 countries | Email, Telegram, web push, or app |
| [PayPal Honey Droplist](https://help.joinhoney.com/article/79-what-is-droplist) | Supported stores | Email when the price drops below your amount |

Google's tools also show whether a price is high, low, or typical compared with the past three months, which helps you decide if a "sale" is a real one. If you only shop on Amazon, camelcamelcamel and Keepa have years of price history. The ChatGPT options fit best when you want one place to set rules across stores and get the answer in the chat where you were already researching.

## Building a shopping agent?

Parallel's [Shopping API](https://docs.parallel.ai/getting-started/pricing) returns up to 40 products per request, linked to store product pages, for $5 per 1,000 requests. The [Monitor API](https://parallel.ai/products/monitor) runs scheduled checks and posts changes to a webhook, and any MCP client can reach both through `https://mcp.parallel.ai/mcp`. When thousands of users ask an agent to watch prices on the same day, each check is one API call, not a browser session.

## Frequently asked questions

**Can ChatGPT track prices?** Its shopping research compares current prices but doesn't track them over time. Add a Parallel monitor or set up a scheduled task to get alerts.

**Can ChatGPT tell me when something is back in stock?** Yes, with a Parallel monitor or a scheduled task. Ask for an alert when the item shows as available, and name the stores you'd buy from.

**Is ChatGPT good at finding deals?** It's good at comparing options and explaining tradeoffs. OpenAI notes that prices come from third parties and may lag, so check the price on the store's page before you buy.

**Can ChatGPT buy the item for me?** Usually not. In 2026 most ChatGPT shopping purchases finish on the merchant's own website or app.

Related reading: [The best ChatGPT plugins in 2026](https://parallel.ai/articles/best-chatgpt-plugins) / [How to track flight prices in ChatGPT](https://parallel.ai/articles/how-to-track-flight-prices-in-chatgpt) / [The best MCP servers for ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt)

# How to track flight prices in ChatGPT

Tracking flight prices in ChatGPT means having it recheck a route for you and speak up when the fare drops, rather than searching again every morning yourself. This guide covers how to find fares in the chat with Parallel, how to set up a scheduled task to recheck them, how to write the prompt, when fares tend to bottom out, and the dedicated fare trackers worth knowing.

ChatGPT can find flights on its own and through plugins like Expedia, Skyscanner, and Parallel. Those searches show the fare right now. Tracking means checking the same route again and again and telling you when the price moves. Inside ChatGPT, the built-in way to do that is a scheduled task, and a flight search plugin helps you pick the fare to watch.

## Search fares in the chat with Parallel

[Parallel](https://parallel.ai/mcp) is a ChatGPT plugin for web research, and it now searches flights. Describe the trip in plain language and Parallel returns itineraries as structured results (fare, airline, departure and arrival times, and stops), so ChatGPT can compare them against your rules instead of reading airline sites.

1. Install the [Parallel plugin](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) from **Plugins** in the ChatGPT sidebar, and sign in with your Parallel account when asked.
2. Describe the route, dates, and anything you won't compromise on, and name Parallel in the prompt so ChatGPT uses it over its own search.

Prompts that work:

- "Use Parallel to find round-trip flights from SFO to JFK, December 20 to January 3, under $400."
- "Use Parallel to find the cheapest nonstop fare from Chicago to Lisbon for the week after Christmas, with the airline and departure times."
- "Use Parallel to compare economy fares from Boston to Denver for every Friday-to-Sunday weekend in February."

Searches are billed to your Parallel account at [API rates](https://docs.parallel.ai/getting-started/pricing), $5 per 1,000 flight searches. Every account gets $5 in free credit each month, and it resets monthly, which covers 1,000 searches.

A search shows today's fares. Once you know what a good fare looks like for your route, set a scheduled task to recheck it.

## Set up a ChatGPT scheduled task

Scheduled tasks rerun a prompt on a timer and notify you by push, email, or both. They replaced ChatGPT Pulse in June 2026. Pair one with a flight search:

"Every morning at 8, check round-trip economy fares from Seattle to Honolulu, March 14 to 21. Only notify me if the cheapest fare is under $450 or has dropped since yesterday."

Tasks are easy to set up, and every plan has them, with limits that matter for fare tracking:

| Plan | Active tasks at once |
| --- | --- |
| Free and Go | 3 |
| Plus | 5 |
| Business and Edu | 10 |
| Pro and Enterprise | 15 |

On the Free plan a task runs at most once a day, in a broad window like "morning". Paid plans can run tasks as often as hourly, at exact times. Each run counts against your plan's usage even when nothing has changed, and OpenAI may pause tasks you don't interact with. Manage them from the **Scheduled** page in the sidebar. Source: [OpenAI's scheduled tasks help page](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt).

## How to write a fare-tracking prompt

Vague prompts produce vague alerts. Include:

- **Route and airports.** "NYC" can mean JFK, LaGuardia, and Newark. Say which ones you'll accept.
- **Dates and flexibility.** Exact dates, a range ("any Thursday in March"), or a trip length ("five to seven nights").
- **Constraints.** Nonstop only, cabin class, number of travelers, bags.
- **A trigger.** A price ceiling ("under $400") or a drop size ("falls by $50 or more").
- **What to send back.** Airline, times, stops, and a link, so you can book without searching again.

## When fares tend to be lowest

Two datasets are worth knowing before you set a target price:

- **Google Flights** analyzed five years of US departures for its [2026 holiday travel report](https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/). Domestic fares were lowest 39 days before departure on average. For Christmas, the low point was 56 days out, and international fares were lowest about 89 days out. Flying on a weekday saved about 14%.
- **Expedia's** [2026 Air Hacks report](https://www.expedia.com/newsroom/expedia-2026-air-hacks/) found domestic fares cheapest 15 to 30 days before departure, about $130 less than booking more than six months out.

The two datasets measure different windows, so treat them as ranges. Start tracking a month or two ahead, and set the trigger near the lowest fare you've seen in the first few days.

## Other fare trackers outside ChatGPT

Dedicated travel apps have had price alerts for years, and they're good at it:

| Tool | How it alerts you | Good for |
| --- | --- | --- |
| [Google Flights](https://support.google.com/travel/answer/6235879) | Email and mobile notifications | Specific dates, or "any dates" on a route over the coming months |
| Google AI Mode | Email | Asking in plain language to track prices you found in a conversation |
| [Hopper](https://help.hopper.com/en_us/how-to-watch-a-trip-for-price-notifications-HJGMLt_Tv) | Push notifications | Buy-or-wait predictions on a watched trip |
| [Kayak](https://www.kayak.com/c/help/pricing) | Email or push, usually a daily digest | Unlimited alerts with a Kayak account |
| Skyscanner | Price alerts on saved flights | Flexible searches across many airlines |

If you already plan trips in one of these, its alerts will serve you well. ChatGPT makes more sense when you're already planning the trip there and want your own rules for what counts as a deal.

## Building a travel agent?

The same flight search is available to developers. Parallel's [Flights API](https://docs.parallel.ai/getting-started/pricing), in early access, returns up to 20 itineraries with fares per request for $5 per 1,000 requests, and any MCP client can reach it through `https://mcp.parallel.ai/mcp`. When thousands of users ask an agent to find fares on the same day, each search is one API call, not a browser session.

## Frequently asked questions

**Can ChatGPT track flight prices?** Not with travel plugins alone. Expedia, Skyscanner, and Parallel search current fares. To track one, set up a scheduled task that reruns the search.

**Does ChatGPT have flight price alerts?** It can, through scheduled tasks that rerun a search and notify you by push or email.

**Is tracking flights in ChatGPT free?** Scheduled tasks are included on every plan, within the limits above. Parallel flight searches bill per request, and the $5 in free credit Parallel gives every account each month covers 1,000 searches.

**Can ChatGPT book the flight for me?** Expedia's plugin shows bookable results, then sends you to Expedia to pay. ChatGPT doesn't complete airline bookings itself.

Related reading: [The best ChatGPT plugins in 2026](https://parallel.ai/articles/best-chatgpt-plugins) / [How to get price drop alerts in ChatGPT](https://parallel.ai/articles/price-drop-alerts-in-chatgpt) / [The best MCP servers for ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt)

# How to track flight prices in ChatGPT

Tracking flight prices in ChatGPT means having it recheck a route for you and speak up when the fare drops, rather than searching again every morning yourself. This guide covers two ways to set that up, a Parallel monitor and a scheduled task, plus how to write the prompt, when fares tend to bottom out, and the dedicated fare trackers worth knowing.

ChatGPT can find flights on its own and through travel plugins like Expedia and Skyscanner. Those searches show the fare right now. Tracking means checking the same route again and again and telling you when the price moves, and ChatGPT's travel plugins don't do that inside the chat. You have two ways to add it: a Parallel monitor, or a scheduled task.

## Option 1: Set up a fare monitor with Parallel

[Parallel](https://parallel.ai/mcp) is a ChatGPT plugin for web research. It can now search flights and set up monitors that keep checking a fare after you close the chat. When the price changes, Parallel sends an update back into the same conversation, and ChatGPT follows whatever instructions you gave it.

1. Install the [Parallel plugin](https://chatgpt.com/plugins/plugin_asdk_app_69fb9378663481919a68e8a2109644e5) from **Plugins** in the ChatGPT sidebar, and sign in with your Parallel account when asked.
2. Start a **Work** chat on ChatGPT web. In the desktop app, select **Work** and **Cloud**. Monitors rely on a ChatGPT feature called MCP events, which runs in those chats.
3. Describe the trip, how often to check, the price you'd act on, and what ChatGPT should do when it changes.
4. To stop, ask ChatGPT to stop monitoring that route.

Prompts that work:

- "Watch round-trip flights from SFO to JFK, December 20 to January 3, and tell me if one drops under $400."
- "Track the cheapest nonstop fare from Chicago to Lisbon for the week after Christmas. Message me when it falls by more than $75, and include the airline and departure times."
- "Monitor economy fares from Boston to Denver for any Friday-to-Sunday weekend in February. Tell me the cheapest weekend each time it changes."

Each check is a single search on Parallel's side, so ChatGPT doesn't open airline sites or wake up to re-run your prompt. You hear back only when the fare actually moves.

Monitors can check hourly, daily, weekly, or monthly (any interval from 1 hour to 30 days), so say how often you want the fare checked. Each check is billed to your Parallel account at the [Monitor API rates](https://docs.parallel.ai/getting-started/pricing), $3 to $10 per 1,000 checks. Every account gets $5 in free credit each month, and it resets monthly. That covers at least 500 checks: an hourly monitor for about three weeks, or a dozen daily monitors for a month.

## Option 2: Use a ChatGPT scheduled task

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

## Which option to pick

|  | Parallel monitor | Scheduled task |
| --- | --- | --- |
| Where results arrive | The same chat | Push notification or email |
| How it checks | A flight search on Parallel's side | ChatGPT reruns your whole prompt |
| Runs when nothing changed | Stays quiet | Still uses a run |
| How often | Hourly, daily, weekly, or monthly | Up to hourly on paid plans, daily on Free |
| Cost | $3 to $10 per 1,000 checks, after $5 free credit each month | Included in your ChatGPT plan |
| Setup | Install a plugin, sign in, use a Work chat | Built in, any plan |

A scheduled task is enough for one route on a free account. If you're watching several routes, or want an alert only when the fare moves, use a Parallel monitor.

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

If you already plan trips in one of these, its alerts will serve you well. The ChatGPT options make more sense when you want the alert in the chat where you're planning, with your own rules for what counts as a deal.

## Building a travel agent?

The same tools are available to developers. Parallel's [Flights API](https://docs.parallel.ai/getting-started/pricing) returns up to 20 itineraries with fares per request for $5 per 1,000 requests, and the [Monitor API](https://parallel.ai/products/monitor) runs scheduled checks and posts changes to a webhook. Any MCP client can reach both through `https://mcp.parallel.ai/mcp`. When thousands of users ask an agent to watch fares on the same day, each check is one API call, not a browser session.

## Frequently asked questions

**Can ChatGPT track flight prices?** Not with its travel plugins alone. Expedia and Skyscanner search current fares. To track them, add a Parallel monitor or set up a scheduled task that reruns the search.

**Does ChatGPT have flight price alerts?** It can, through Parallel monitors that report in the chat or scheduled tasks that notify you by push or email.

**Is tracking flights in ChatGPT free?** Scheduled tasks are included on every plan, within the limits above. Parallel monitors bill per check, and the $5 in free credit Parallel gives every account each month covers at least 500 checks.

**Can ChatGPT book the flight for me?** Expedia's plugin shows bookable results, then sends you to Expedia to pay. ChatGPT doesn't complete airline bookings itself.

Related reading: [The best ChatGPT plugins in 2026](https://parallel.ai/articles/best-chatgpt-plugins) / [How to get price drop alerts in ChatGPT](https://parallel.ai/articles/price-drop-alerts-in-chatgpt) / [The best MCP servers for ChatGPT](https://parallel.ai/articles/best-mcp-servers-for-chatgpt)

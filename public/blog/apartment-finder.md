# Building an apartment discovery tool with Parallel

How and why I built ApartmentFinder, an agentic discovery tool for the hyper-competitive San Francisco rental market.

When I joined Parallel as a deployed engineer, I ran into a dilemma many people moving to California know well: finding a decent apartment sucks. Luckily, working at Parallel (the company) meant I had Parallel (the product) to solve it. The trick was thinking beyond search, reconceptualizing the apartment hunt as a discovery problem rather than a search box to toss keyword variations into.

What resulted was [ApartmentFinder](https://apartment-finder-web.vercel.app), a lightweight app that lets you describe the apartment you want in plain language and returns a list of real, hyperlinked listings that match your criteria. Each item is enriched with information to help you choose the ideal listing, and it can even run a fraud check to make sure a listing is legitimate.

This is what Parallel's FindAll API is built for: continuously scouring the open web and evaluating candidate results. Through the build, I found an effective way to address a common, complex problem, but I also found an example that helps demonstrate why Parallel exists in the first place.

## Where existing sites (and paradigms) fall short

The usual sites have the same problems: you filter, scroll, and open dozens of tabs, only to find that half the listings are stale, duplicated across aggregators, or not actually available. And yet, you still have to use every site, including Craigslist, Facebook groups, and vibe-coded throwaway sites, because no one site contains every option. Renters spend a lot of time manually searching, clicking, and experimenting with different keywords.

This is the kind of problem Parallel exists to solve: users are trying to solve web-scale issues with human-scale strategies. For apartment-finding, this doesn't work today (and it didn't really work yesterday either). But it's going to work even less well in the coming years.

Cloudflare CFO Thomas Seifert said, in a [recent earnings call](https://www.theregister.com/networks/2026/08/07/humans-will-be-a-rounding-error-on-the-internet-says-cloudflare-exec/5284429), "If the current trends continue, we think in five years, non-human traffic will be as much as 1,000 times as much as human traffic." This isn't because humans will use the internet _less_; it's the result of non-human traffic, of agents running in ever-increasing numbers. According to Seifert, "Humans will be a rounding error on the internet."

We agree. A rounding error, armed only with a search box, won't find an apartment, much less thrive in a world overrun with non-human traffic.

## Discovery, not search

I started ApartmentFinder from a different first principle than the typical one: the tool should discover on an ongoing basis, not just search at a moment in time.

When you search, you enter keywords into a curated index. You have to trust that the particular index you're working with includes all the results you might want to see, and you have to hope that every entry includes the metadata your keywords are meant to tap.

When you discover, your starting point is the open web. Instead of making a limited query into a limited index, you give an agent an objective. The open web is wide, so you need to cast a wide net.

Despite this breadth, setting an objective is simple. Let's say your basic parameters are: 2-bedroom in the Mission under $4,600 with in-unit laundry.

The app turns that into a single Parallel FindAll API call. This isn't a keyword search. FindAll uses the objective and a set of match conditions to iteratively discover candidates, then runs checks on each one before passing the results back to the user.

```json
{
  "objective": "Find 2 bedroom apartments for rent under 4600 dollars per month in San Francisco, CA. 2 bedroom in the Mission",
  "entity_type": "apartment rental listings",
  "match_conditions": [
    {
      "name": "is_rental_listing",
      "description": "The page is ONE individual rental unit's listing, showing that specific unit's own street address. Do NOT match search-results pages, category/index pages, or building-overview pages."
    },
    {
      "name": "fits_budget",
      "description": "The asking monthly rent is at or below $4600. If the rent is not shown, treat this as matched."
    }
  ],
  "enrichments": [
    { "name": "street_address", "description": "The exact street address as written on the page..." },
    { "name": "monthly_rent_usd", "description": "The listed monthly rent as an integer in USD..." },
    { "name": "bedrooms", "description": "The bedroom count of the unit (0 for studio)..." }
    // ...14 more: bathrooms, sqft, available_date, pet_policy, parking, laundry, etc.
  ],
  "generator": "base",
  "match_limit": 10
}
```

FindAll runs are asynchronous. The app is a single Next.js project deployed to Vercel, with no backend server storing state. The browser drives each search through short serverless calls:

```shell
create run  ->  poll status  ->  kick off enrichment  ->  poll  ->  finalize (geocode + score)
```

POST /v1beta/findall/runs creates the run and returns a findall_id. The client then polls GET /v1beta/findall/runs/{id} for status and matched candidates.

Then, without a scraper or parser in sight, ApartmentFinder can use Parallel's Task API to enrich the results. Once the client polls for its matched candidates, it calls /enrich to run the Task-powered enrichment pass, polls again, and finally geocodes and scores everything for the map and the ranked list.

Every step is a fast serverless invocation. The only thing that persists is the user's saved shortlist, which lives in their browser's localStorage.

Between the two APIs, users receive a list of candidates that meet the match conditions (e.g., must be under $X/month), which are then enriched with additional information (e.g., address, pet policy, square footage).

## Good discovery requires good verification

In the initial build, the discovery process was effective at finding candidates that met the established conditions. But that doesn't mean every result was actually a link a user could click, or that every result was a real apartment a user could rent.

The candidates that passed the conditions but were useless to a renter tended to fall into a few categories:

- **Category and search pages.** A page listing 40 units in a neighborhood technically "describes rentals," but you cannot rent it. I tightened the match conditions to explicitly reject index and building-overview pages.
- **Aggregators with dead outbound links.** Some large aggregators bot-wall the actual listing, so the link looks fine and then doesn't work. Rather than send users to a wall, I blocked these aggregators outright.
- **The wrong link when several are cited.** A candidate sometimes carries several URLs, which can be confusing. Typically, the first URL is a browse page and a deeper one is the actual unit. ApartmentFinder now scores each candidate URL for specificity and then selects the most specific listing.

But there's one more kind of candidate I need to be even more careful with: fraudulent listings.

FindAll, supported by the guardrails above, handles discovery, but for fraud I bring back the Parallel Task API. This is the same API that powers FindAll's enrichments, but I call it again, separately, with a fact-based schema:

```json
{
  "input": { "title": "...", "body": "...", "price": 2200, "address": "...", "source": "craigslist.org" },
  "task_spec": { "output_schema": { "type": "json", "json_schema": { /* 5 fact-based scam signals */ } } },
  "processor": "base"
}
```

The schema asks for concrete signals of fraud:

- Off-platform payment
- 555 phone numbers
- Claims that the owner is abroad
- Withheld addresses
- No viewings offered, and unusual move-in incentives

This gives me a concrete signal rather than a vague "is this a scam" score. In use cases like these, fact-based booleans are much more reliable than asking a model for a subjective verdict, and Parallel allows you to build for both. And because the Task API uses an agent to reason on top of the facts, the agent can sometimes catch signals that we, as humans, might miss. After all, we have arrived at the age where it may not even be a human posting a scam listing, but AI instead.

## Setting user experience expectations

As of now, ApartmentFinder is still a demo, but it works, and I want the user experience to communicate the right expectations.

For example, the results expose the verification scoring, allowing users to see how ApartmentFinder ranks candidates. Scoring is currently fixed, weighted based on location proximity and number of bedrooms, and ApartmentFinder exposes the scoring on a 1-100 scale. The threshold for good candidates is at least 50-70, but listings below the threshold are still surfaced if users want to dig into them.

Unlike search, which is relatively fast but significantly limited, I set discovery expectations with users up front: this task runs more comprehensively but needs more time. Up to 5 minutes per query are required, so I show users the elapsed time and the progress made.

Enrichment ripens gradually, so the client displays what is ready as enrichment settles, rather than waiting on a single slow straggler.

Users can watch progress as it's made, or run the task in the background while they do something else. In a sense, it's like a real estate agent reviewing the whole web, in real time, for high-signal websites.

By the end, users have a useful, actionable set of leads, whether or not it results in a secured apartment.

## ApartmentFinder is a natural expression of the Parallel thesis

As [we've written](https://parallel.ai/about), the web is changing, and agents will eventually use the web far more than humans ever have. ApartmentFinder is one instance of putting this theory into practice.

In this build, Parallel APIs handled the parts that would otherwise have consumed the whole project: crawling the open web, evaluating each candidate against criteria and with citations, and extracting dozens of structured fields per match to enrich the final results. But with Parallel, I didn't have to write a scraper, a parser, or a ranking model.

What I built was the product layer: turning verified matches into openable listings, handling discovery variance, and tuning the fraud check. But that split, using Parallel for discovery and verification and building a thin app for the experience, is why I could build this alone in just a couple of weeks.

I'm still iterating, and I'm building in public. If there's more traction, I might make a version for New York City. **Also, feel free to fork and make one yourself for the city of your choice!**

I'm always looking to learn from others, whether you have thoughts on the system as it stands today or whether the discovery framework as a whole resonates. If you're building in similar ways and want to compare notes, [reach out](https://contact.parallel.ai/)!

Check out the code in the [repo](https://github.com/parallel-web/parallel-cookbook/tree/main/typescript-recipes/parallel-apartment-finder), and [test ApartmentFinder yourself](https://apartment-finder-web.vercel.app).

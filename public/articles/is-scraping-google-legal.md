# Is scraping Google legal? What the 2026 court rulings say

Is scraping Google legal? The answer depends on which law you ask about: the CFAA mostly doesn’t reach public pages, Google’s terms forbid automated access, and the DMCA claims in Google v. SerpApi and Reddit v. SerpApi are where the question is being litigated now. This guide covers each legal theory, the 2026 rulings, the rules outside the US, and how to lower your risk.

## Five legal theories decide the answer

No single US statute says “scraping is legal” or “scraping is illegal.” Courts decide scraping cases under several different laws, and a Google search scraper can succeed under one and fail under another. These are the theories that matter as of September 2026.

| Legal theory | What it asks | How it applies to scraping Google | Key authority |
| --- | --- | --- | --- |
| Computer Fraud and Abuse Act (CFAA) | Did you access a computer without authorization? | Weak claim for public pages; Google hasn’t relied on it | Van Buren v. United States (2021); hiQ v. LinkedIn (9th Cir. 2022) |
| Contract (terms of service) | Did you agree to terms that forbid automated access? | Google’s terms forbid it; whether they bind a logged-out scraper is untested for Google | Meta v. Bright Data (N.D. Cal. 2024); hiQ v. LinkedIn (N.D. Cal. 2022) |
| DMCA Section 1201 | Did you circumvent a measure that controls access to copyrighted works? | The live battleground: Google v. SerpApi and Reddit v. SerpApi | Google v. SerpApi (N.D. Cal. 2026); Reddit v. SerpApi (S.D.N.Y. 2026) |
| Copyright | Did you copy and reuse protected expression? | Results link to third-party works, and some panels hold licensed images | Case by case |
| EU database, contract, and privacy law | Did you extract a protected database, breach terms, or process personal data? | Terms can forbid scraping; meta-search can re-utilize a database; GDPR applies to personal data | Ryanair v. PR Aviation (CJEU 2015); Innoweb v. Wegener (CJEU 2013) |

## The CFAA mostly doesn’t reach public pages

The Computer Fraud and Abuse Act makes it a federal offense to access a computer “without authorization.” For years, companies used it against scrapers. In [Van Buren v. United States](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf) (2021), the Supreme Court narrowed the statute to a “gates-up-or-down” question: either you’re allowed into a part of a system or you aren’t.

The Ninth Circuit applied that reasoning to scraping in [hiQ Labs v. LinkedIn](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf) in April 2022. It held that a public website has no gate to lift, so collecting data anyone can view with a browser is likely not access “without authorization,” even after the site sends a cease-and-desist letter. Google’s search results pages are public in that sense, and Google’s lawsuit against SerpApi doesn’t include a CFAA claim.

hiQ also shows why the CFAA ruling isn’t a general green light. The same opinion listed the claims that remain available against scrapers: breach of contract, copyright infringement, trespass to chattels, misappropriation, and others. hiQ went on to lose a breach of contract ruling in November 2022 and settled in December 2022, agreeing to delete the LinkedIn data it had collected.

## Google’s terms forbid it, and robots.txt says so

The [Google Terms of Service](https://policies.google.com/terms), effective July 30, 2026, prohibit “using automated means to access content from any of our services in violation of the machine-readable instructions on our web pages (for example, robots.txt files that disallow crawling, training, or other activities).” Google’s own [robots.txt](https://www.google.com/robots.txt) disallows /search for all user agents. The terms also bar “bypassing our systems or protective measures” and “hiding or misrepresenting who you are in order to violate these terms.”

Whether those terms bind a scraper that never signs in is a separate question, and no court has answered it for Google. The closest precedent points the other way. In [Meta v. Bright Data](https://www.fbm.com/publications/major-decision-affects-law-of-scraping-and-online-data-collection-meta-platforms-v-bright-data) (January 2024), Judge Edward Chen held that Facebook’s and Instagram’s terms governed “your use” of those products and didn’t cover Bright Data’s logged-off scraping of public data. Google’s terms are worded differently, and a scraper that also holds a Google account, or uses one while scraping, is in a weaker position. A breach of terms is generally a civil matter, where the possible consequences include account termination, an injunction, and damages.

## DMCA Section 1201 is where the fight is now

Section 1201 of the Digital Millennium Copyright Act prohibits circumventing a technological measure that “effectively controls access” to a copyrighted work, and trafficking in tools that do so. It’s the theory both Google and Reddit chose. Both argue that SearchGuard, the JavaScript challenge Google deployed on Search in January 2025, is an access control of that kind.

Google sued SerpApi on December 19, 2025. On July 20, 2026, Chief Judge Yvonne Gonzalez Rogers dismissed both DMCA claims, but the order split in two:

- **Results with no copyrighted content** were dismissed without leave to amend. The court reasoned that Section 1201 protects access to copyrighted works, which a page of links and facts isn’t, so Google can’t replead those claims.
- **Results containing a copyrighted component**, such as a licensed image in a Knowledge Panel, were dismissed with leave to amend. The statute requires the access control to operate “with the authority of the copyright owner,” and Google hadn’t alleged any license terms that gave it that authority.

The order went against SerpApi on two points. The court held that any person injured by a violation can sue, so Google has standing even though it doesn’t own most of the content. It also found that Google had adequately alleged circumvention, based on Google’s allegations about spoofed browser fingerprints, rotating IPs, and CAPTCHA solving. SerpApi disputes Google’s claims, and the court hasn’t decided whether those allegations are true.

Google filed an [amended complaint](https://www.courtlistener.com/docket/72059948/google-llc-v-serpapi-llc/) on August 10, 2026. According to [Search Engine Journal](https://www.searchenginejournal.com/google-amends-serpapi-suit-with-content-licensing-terms/585505/), it describes a licensing deal that since 2017 has required Google to make commercially reasonable efforts to protect licensed content, another provider’s requirement that its material not be downloadable by third parties, and Reddit’s request for technical measures against resellers. [SerpApi moved to dismiss again](https://serpapi.com/blog/google-tried-again-were-moving-to-dismiss-their-claims-a-second-time) on August 25, arguing that Google hasn’t filed any of those agreements or quoted their terms. The court denied SerpApi’s motion to compel production of the licenses, and a hearing on the new motion to dismiss is set for October 13, 2026.

## Reddit’s case also names a buyer of search data

A second case raises questions for companies that buy search data: [Reddit v. SerpApi](https://www.courtlistener.com/docket/71720563/reddit-inc-v-serpapi-llc), filed in October 2025 against SerpApi, Oxylabs, AWMProxy, and Perplexity. Reddit alleges that the scraping companies bypassed SearchGuard to collect Reddit content from Google results pages, which it puts at nearly three billion pages in two weeks of July 2025, and that Perplexity used that data to answer questions. The defendants dispute the claims.

On July 31, 2026, Judge Paul Engelmayer of the Southern District of New York largely denied SerpApi’s and Perplexity’s motions to dismiss. He allowed these claims to proceed:

- circumvention under Section 1201(a)(1)(A), against both SerpApi and Perplexity
- trafficking in circumvention tools under Section 1201(a)(2), against SerpApi
- civil conspiracy under New York law, against both

He dismissed the Section 1201(b) claim against SerpApi and the unjust enrichment and unfair competition claims, which the Copyright Act preempts. The ruling distinguished Google’s case: Reddit alleged specific license restrictions and requirements to guard against unauthorized access, which Google’s original complaint lacked. As [Loeb & Loeb summarized it](https://www.jdsupra.com/legalnews/reddit-inc-v-serpapi-llc-8674256/), the court found that Reddit had plausibly alleged Perplexity was a direct circumventor, based on allegations that it set the parameters for the scraping and conducted the queries itself.

Both rulings came at the motion-to-dismiss stage, where a court assumes the complaint’s factual allegations are true and decides only whether the claims can go forward. Neither court has found that SerpApi, Perplexity, or anyone else broke the law, and either case could still end in dismissal, settlement, or a verdict for the defendants. For companies building on a SERP API, the Reddit ruling suggests that a customer who sends the queries can be named in a lawsuit alongside the vendor, at least at the pleading stage.

## Copyright in what you collect

Facts aren’t copyrightable, and a list of URLs and titles is mostly facts. What you do with the data after collecting it matters more than the collection. Search results point to third-party pages, snippets excerpt other people’s writing, and Knowledge Panels can carry licensed photos. Storing and republishing that material raises ordinary copyright questions, separate from the DMCA claims about how you got past SearchGuard. Using scraped content to train a model adds another layer of questions that courts are still working through.

## Outside the United States

European law gives website operators more tools. In [Ryanair v. PR Aviation](https://eur-lex.europa.eu/legal-content/EN/TXT?uri=celex%3A62014CJ0030) (January 15, 2015), the Court of Justice of the European Union held that when a database isn’t protected by copyright or the database right, the operator can still forbid scraping through its terms and conditions. In Innoweb v. Wegener (C-202/12, December 2013), the same court held that a meta-search engine that forwards queries to another site’s database in real time and displays the results re-utilizes that database, whether or not it stores the data permanently. No court has applied that reasoning to scraping Google’s results, though the facts are similar.

The EU’s text and data mining exception, in Article 4 of the Digital Single Market Directive, lets anyone mine lawfully accessible works unless the rights holder has reserved its rights in a machine-readable way, and robots.txt instructions are one recognized way to do that. If the scraped data includes personal information, the GDPR applies on its own terms. The Dutch data protection authority fined Clearview AI €30.5 million in September 2024 over images it collected for a facial recognition database; Clearview has argued that the GDPR doesn’t apply to it.

## Google also enforces through technology and contracts

Most scrapers will never see a courtroom. They’ll see SearchGuard, the September 2025 removal of the num=100 parameter, and the google.com/goto redirect links Google rolled out in August 2026. Around September 13, 2026, rank-tracking vendors reported losing most of their Google data to new blocking. Our explainer on [why AI agents can’t just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search) covers that timeline.

Google also writes the restriction into its own contracts. The [Google Cloud Marketplace product terms](https://cloud.google.com/terms/marketplace-product-terms) require sellers of a “Web Search Product” to warrant that they don’t use automated means against Google services in violation of robots.txt, bypass technical access restrictions, or circumvent measures that control access to copyrighted content.

## How to lower your risk

Legal exposure depends on who runs the scraper, what they bypass, and what happens to the data. A few choices reduce it:

- **Use a licensed source.** Google’s Grounding with Google Search and its partner-only Web Search Service API are the sanctioned routes, each with its own terms.
- **Use an independent index.** Search APIs that crawl the web themselves, such as Brave Search or our Search API, don’t touch google.com.
- **If you need Google’s actual rankings**, for rank tracking or ad monitoring, pick a SERP vendor that indemnifies you. SerpApi’s U.S. Legal Shield covers up to $2 million on its Production plan and above, provided your use of the data is lawful. Ask how the vendor collects its data, since Reddit’s case named a customer as well as vendors.
- **Don’t republish what you collect.** Keep scraped snippets and images out of your product’s output unless you have rights to them.
- **Treat personal data as regulated.** Names, photos, and profiles in results bring privacy law with them, especially for EU residents.

We built our Search API on our own crawl and index, so agents get ranked URLs with excerpts from each page without anyone scraping a search engine. Our [SerpApi vs. Parallel comparison](https://parallel.ai/articles/serpapi-vs-parallel) covers where each approach fits, and [web unlocker vs. scraper vs. fetch](https://parallel.ai/articles/web-unlocker-vs-scraper-vs-fetch) explains the unblocking layer SERP vendors run.

This article is general information about public court records and terms of service as of September 26, 2026, not legal advice. Talk to a lawyer about your own situation.

## Frequently asked questions

### Is it illegal to scrape Google search results?

The law is unsettled. The CFAA, the federal anti-hacking statute, likely doesn’t apply to public pages after Van Buren and hiQ. Automated access that ignores Google’s robots.txt conflicts with Google’s terms of service, and courts are still deciding whether circumventing SearchGuard supports a DMCA claim when results contain copyrighted works Google is licensed to protect. Both of the leading cases, Google v. SerpApi and Reddit v. SerpApi, were still pending in September 2026.

### Can I get sued for using a SERP API?

It’s possible. In Reddit v. SerpApi, the court allowed DMCA and conspiracy claims to proceed against Perplexity, which Reddit describes as a SerpApi customer, finding that Reddit had plausibly alleged Perplexity set the scraping parameters and ran the queries. That’s a pleading-stage ruling, not a finding of liability. Vendor indemnities, such as SerpApi’s U.S. Legal Shield, shift some of that risk back to the vendor.

### Does robots.txt make scraping illegal?

Not by itself. Robots.txt is a voluntary protocol, but Google’s terms of service incorporate it, which turns ignoring it into a possible breach of contract. In the EU, a robots.txt disallow can also serve as a machine-readable opt-out from the text and data mining exception.

### What did the court decide in Google v. SerpApi?

On July 20, 2026, the court dismissed Google’s DMCA claims. Claims about results with no copyrighted content can’t be refiled; claims about licensed content, such as Knowledge Panel images, can. The court also found that Google had standing to sue and had adequately alleged circumvention, without deciding whether those allegations are true. Google refiled on August 10, and a hearing on SerpApi’s second motion to dismiss is set for October 13, 2026.

**Related reading: **[Why AI agents can’t just use Google Search](https://parallel.ai/articles/why-ai-agents-cant-just-use-google-search) · [What is web scraping?](https://parallel.ai/articles/what-is-web-scraping) · [SerpApi vs. Parallel](https://parallel.ai/articles/serpapi-vs-parallel) · [Web crawling vs. web scraping](https://parallel.ai/articles/web-crawling-vs-web-scraping)

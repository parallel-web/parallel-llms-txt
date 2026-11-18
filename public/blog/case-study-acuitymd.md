# AcuityMD uses Parallel to keep medtech market data accurate at scale

AcuityMD’s data team runs Parallel in production to research and verify more than 570,000 records, with the accuracy and cost it needs at scale.

## Key highlights

- **Challenge:** Before Parallel, frontier models cost about 5x more and left 5 to 10% of URLs broken
- **Solution:** Parallel’s Search, Extract, and Task APIs in batch pipelines
- **Results:** 574,000 records in five months at about a fifth of a frontier model’s cost

## About AcuityMD

[AcuityMD](https://www.acuitymd.com) gives medical device companies a map of their market: where medical procedures happen, and which surgeons and facilities perform them. For example, a company launching a new heart valve can see which cardiac surgeons to call on first, or a sales rep can find doctors treating patients with medications that often lead to a procedure their device supports.

More than 500 medtech companies use AcuityMD, including 16 of the 20 largest device makers, such as Becton Dickinson, Olympus, and Teleflex. They make sales decisions on AcuityMD’s data, so that data has to be right.

## Challenge: Keeping healthcare data accurate and up to date at scale

Healthcare data is always changing. A surgeon who operated at one hospital last year may now work for a different health system, and AcuityMD’s customers won’t know about it until the data catches up. Wrong data means wasted time and resources: a rep drives to an office that shut down last spring, or a sales leader builds next quarter’s territory plan on affiliations that no longer exist.

AcuityMD’s core platform runs on claims data, which shows medtech companies which doctors and hospitals to target. Greg Davis, Senior Data Program Manager, leads data acquisitions and partnerships, and his team finds the data that adds to those decisions across the US. Much of it is public but scattered across thousands of health network sites, clinic directories, state permitting systems, and equipment RFPs. One project can mean confirming that hundreds of thousands of clinics are still open at the addresses on file. Doing that by hand would take his team several months to complete. So the team tried a frontier model first.

Greg’s team estimates that running its full stack through a frontier model would cost about 5x more, and that 5 to 10% of the URLs it returned wouldn’t work. At AcuityMD’s volume, that’s tens of thousands of broken links for someone to review by hand.

> “We started with a frontier model, and at scale the gaps showed up fast. It hallucinated websites, returned dead links, couldn’t reach enough sources, and got expensive once we passed a few hundred records. We knew we needed something that met our accuracy bar and kept costs in check at production scale.”
>
> — Greg Davis, Senior Data Program Manager

## Solution: Automating healthcare research at scale with verified web sources

Greg’s team put Parallel to work on health networks first. AcuityMD tracks thousands of them and needed the right website for each one to map their locations. When Greg asked a frontier model for those links, many came back wrong or made up. With Parallel, every link came back live, so dead pages never reached QA.

The team now runs Search, Extract, and Task in batch pipelines, with its own QA on top. Search finds sources, Extract pulls what each page says and confirms it’s live, and Task handles research that needs reasoning across sources. Each record keeps the source URL it came from, so reviewers can trace any data point back to the page.

From June to October 2026, the team ran multiple projects powered by Parallel, including:

- **Office and clinic affiliations:** mapping which offices and clinics belong to which health systems, so reps know the health system behind each account.
- **Office and clinic updates:** checking whether facilities are still open and their details are current, so reps don’t show up at a closed door.
- **Fellowship information:** gathering details on physician fellowship and residency programs, which help map physician networks.

The team has also used Parallel for building permits, equipment RFPs, and medtech device contracts. Each runs to hundreds of thousands of records, and each one starts with Parallel.

## Results: More accurate healthcare data, faster research, and predictable costs at scale

To keep up with how fast healthcare changes, the AcuityMD team re-tests its tools every few months. Across those tests, Parallel has led on accuracy, cost, and latency. AcuityMD now uses Parallel as the starting point for every new project. Greg estimates Parallel runs at about a fifth of the cost of a frontier model, without the 5 to 10% of broken links.

The impact comes down to three core advantages:

- **Better Quality Cited Answers:** Live and verified URLs give the AcuityMD teams back time to spend on checking real data, instead of checking broken links
- **Pipeline velocity:** AcuityMD uses Parallel inside its batch workflows to produce better quality answers faster
- **Predictable costs at scale:** Per-request pricing makes it easy to estimate costs, whether you’re processing hundreds of records or hundreds of thousands.

> “Accuracy and cost at scale were non-negotiable for us. Parallel confirms every URL it returns is live, its cost holds up across hundreds of thousands of records, and it gives us more breadth and recall than a frontier model on its own. That’s why every new data project on our team starts with Parallel.”
>
> — Greg Davis, Senior Data Program Manager

AcuityMD’s customers need data that’s right on the day a rep uses it. Greg plans to grow his team and take on more data projects in 2027, each starting with Parallel. The team is also exploring Parallel’s Monitor API to flag when a clinic closes or a health network changes its website, so customers plan territories on a current map.

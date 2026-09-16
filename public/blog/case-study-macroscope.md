# How Macroscope reduced code review false positives with Parallel

Macroscope, an AI-powered code review platform, faced a critical problem: LLMs reviewing code against third-party libraries were working from outdated knowledge, causing false positives and missed issues. By integrating Parallel's Search and Task APIs directly into their review pipeline, Macroscope can now query current documentation in real-time during reviews. The result: a 55% reduction in review comments related to third-party libraries.

Macroscope is an AI-powered understanding engine for codebases. Their platform analyzes code alongside project management tools like Linear and Jira to deliver high-signal code reviews, real-time development summaries, AI-powered codebase Q&A, and productivity insights.

Teams, including ours at Parallel, use Macroscope to answer critical questions like "What did we ship this week?" and "How is the codebase evolving?" without relying on status meetings or interrupting engineers.

## Code standards and documentation are always changing

AI code review tools face a fundamental limitation: LLMs have static knowledge. So, when reviewing code that references third-party libraries and packages, models can’t access the web to check the latest documentation (e.g. recent API changes).

This creates two critical failures. First, LLMs can flag false positives, falsely identifying issues that are actually correct according to current documentation. Second, LLMs can miss real issues because they are operating on outdated information. Both outcomes compromise code review quality and erode developer trust.

For Macroscope, this translated to a specific problem: a major source of false positives in the code review pipeline related to code from third-party libraries— which the Macroscope team thought was often due to the LLMs not having the latest knowledge.

## **With Parallel, Macroscope is always up-to-date**

![](https://cdn.sanity.io/images/5hzduz3y/production/6f850926ca971c54c750e4456e7374079d1cb706-2898x2328.png)

Macroscope integrated Parallel's Search and Task APIs directly into its code review pipeline. When the system needs to verify technical claims during review related to third-party libraries and packages, it queries Parallel’s APIs to retrieve current documentation for the referenced libraries and packages.

The integration uses three key capabilities:

**Domain filtering** lets Macroscope restrict searches to authoritative sources like official documentation sites, ensuring accuracy over breadth.

**Citations** provide transparency into which sources inform each review comment, giving developers confidence in the feedback and enabling quicker verification.

**Processor tiers** allow Macroscope to optimize between speed and depth based on the complexity of each lookup, keeping costs efficient across thousands of daily reviews.

## **Results**

> "By grounding reviews in authoritative, up-to-date sources, Macroscope reduces false positives during code review. Developers can trust the feedback, knowing it's based on the latest and greatest documentation."

— Kayvon Beykpour, CEO, Macroscope

Access to the web solved Macroscope's outdated knowledge problem. In cases where a code review comment involved a third-party library, Macroscope was able to reduce review comments by 55% by querying Parallel’s APIs.

By grounding reviews in authoritative, up-to-date sources, Macroscope dramatically reduced false positives when reviewing code that references third-party libraries. The outcome is that developers trust the feedback, knowing it's based on the latest documentation. By reducing comment noise, Macroscope continues to offer the best signal-to-noise ratio for their customers.

# Introducing Parallel: Web Search Infrastructure for AIs 

The Parallel Deep Research API outperforms humans and all leading AI models


## **The web’s second user**

AIs will use the web far more than humans ever have. As much as we might anthropomorphise AIs, they operate differently from humans on the web. They can retrieve and consume thousands of documents in a call, or want just one discrete fact. The infrastructure designed for human use can’t serve the needs of AIs.

At Parallel, we are building for the web's [second user](http://parallel.ai/about). We are creating systems and infrastructure for AIs to use the web effectively for completing complex tasks. Our suite of products include low-level search tools and deep research APIs that can complete hours of human work on the web in minutes.

## **State-of-the-art deep web research, available to all as an API**

Today, we’re announcing the** only AI system to outperform both humans and leading AI models like GPT-5 on the most rigorous benchmarks for deep web research**. Our APIs are now broadly available, bringing production-grade web intelligence to any AI agent, application, or workflow.

**Parallel already powers millions of research tasks daily, across ambitious startups and public enterprises.** Some of the fastest growing AI companies use Parallel to bring web intelligence directly into their platform and agents. Public enterprises automate traditionally-human workflows exceeding human-level accuracy with Parallel. Coding agents rely on our search to find docs and debug issues.

## **We outperform humans and all leading AI models on deep research tasks**

Two of the hardest independent benchmarks in AI web research, [BrowseComp](https://openai.com/index/browsecomp/) (built by OpenAI) and [DeepResearch Bench](https://github.com/Ayanami0730/deep_research_bench), show Parallel outperforms humans and all leading AI models. 

### Browsecomp

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "Ultra8x",
      "Accuracy": {
        "value": 58
      }
    }, 
    {
      "label": "Ultra",
      "Accuracy": {
        "value": 45
      }
    },
    {
      "label": "Pro",
      "Accuracy": {
        "value": 34
      }
    }
]
```

```
[
    {
      "label": "GPT-5",
      "Accuracy": {
        "value": 41
      }
    },
    {
      "label": "Exa",
      "Accuracy": {
        "value": 14
      }
    }, 
    {
      "label": "Anthropic",
      "Accuracy": {
        "value": 7
      }
    }, 
    {
      "label": "Perplexity", 
      "Accuracy": {
        "value": 6
      }
    }
]
```

### DeepResearch Bench

[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
    {
      "label": "Ultra8x",
      "Win Rate": {
        "value": 82
      }
    }, 
    {
      "label": "Ultra",
      "Win Rate": {
        "value": 74
      }
    }
]
```

```
[
    {
      "label": "GPT-5",
      "Win Rate": {
        "value": 66
      }
    }
]
```

_**BrowseComp **_tests how well a system can navigate the live web to answer complex, open-ended questions, as opposed to just retrieval from memory.

_The results:_

- _**Human baseline:**__ 25% accuracy. Human participants had up to two hours per task. _
- _**GPT-5:**__ 41% accuracy, the highest score among public AI models. _
- _**Parallel:**__ _**_58% accuracy_**_, a new state-of-the-art._



Additionally, Parallel exceeds the accuracy of humans working for 2 hours for just** $0.10 per task.** 

While BrowseComp is a challenging benchmark that demonstrates our capabilities, we also wanted to test our ability to perform wide-ranging research on specific topics that are more representative of queries in the real-world. That's why we tested on a second benchmark:

---

_**DeepResearch Bench **_consists of 100 expert-level research tasks, meticulously crafted by domain experts across 22 distinct fields (such as science, finance & business, and software development). This benchmark evaluates the quality, depth, and rigor of long-form research reports on complex topics requiring synthesis across domains: measuring an AI deep research system against a reference.

_The results:_

- _**GPT-5**__: 66% win rate vs. reference, the highest among public AI models_
- _**Parallel**__: _**_82% win rate vs. reference. 74% win rate vs GPT-5 with Ultra8x, 64% with Ultra. _**

---

We are able to achieve these state-of-the-art results because we’ve spent the past year building web-scale infrastructure from the ground up specifically for AI agents. Every layer - crawl, index, query processing, and ranking - is engineered for how machines consume information, not how humans browse. A core part of our infrastructure is exposed through our [Search API](https://parallel.ai/blog/parallel-search-api), built on our proprietary index and available today to any developer. It gives AI agents fast, accurate, and always-fresh web search capabilities, delivering AI agents exactly the context they need.

The sample queries below, comparing Parallel with leading alternatives, showcase the clear quality advantages this purpose-built infrastructure enables.

### Timeline of chip fab openings

![](https://cdn.sanity.io/images/5hzduz3y/production/47f4c2b5ca393830e8c28c93291f8d9b6b59b017-2000x1600.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/862bc4fbe594583184277abe682044c230d94536-2000x1600.png)

### Hospital ransomware attacks

![](https://cdn.sanity.io/images/5hzduz3y/production/196dd1021c56ba57f0d2520f41f49bd75a28ccf7-2000x1600.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/dd8758e57954ddc37f928f53948d8eba47213a1c-2000x1600.png)

### Most expensive domain sales

![](https://cdn.sanity.io/images/5hzduz3y/production/d592be233d109297dfe7442266c0a6f8e932bfd2-2000x1600.png)

![](https://cdn.sanity.io/images/5hzduz3y/production/f5b76c34257c5c8be69e87b4d0e425d504bd7147-2000x1600.png)

## **A new parallel web for AIs, powered by our production-grade APIs **

Today, our API powers millions of research tasks daily for some of the most advanced AI companies and enterprises. Developers are building AI sales agents that research leads, coding agents that synthesize context from docs, and investment tools that find alpha in nice parts of the web and SEC filings. Insurance companies are automating claims with web-sourced verification.

Every AI system needs structured, accurate web intelligence through a single API call. Our APIs enable companies to use the web differently with AI:

**Fewer hallucinations with attribution and confidence scoring. **Every fact comes with verifiable sources, reasoning chains, and confidence ratings. A global BPO processing insurance claims uses these to intelligently route tasks - high-confidence results flow through automatically while edge cases get human review, dramatically increasing efficiency while maintaining quality standards. AI researchers chain additional compute on low-confidence outputs for better leverage.

**Variable compute budgets to balance cost and depth. **Specify compute budgets from cents to dollars based on task value to predict costs for any workload. Our system delivers maximum quality within your constraints. A private equity fund might invest heavily to analyze market segments for acquisition targets. Sales teams enriching thousands of CRM records operate at fractions of a cent per record. Same infrastructure, intelligently allocated.

**Machine-ready outputs. **We deliver structured data in any schema you define, not just documents for human consumption. One customer built a proprietary database by defining their schema and letting our system populate it from the web, transforming the internet into their data warehouse. AI coding agents pull from API docs directly into their environment's format. Repeatable, structured outputs enable true automation and composability to build on top.

**Declarative interfaces for machine-to-machine efficiency and more reliable abstractions. **Agents specify what they need, not how to get it. An AI analyst requests "a market map of the top 50 global semiconductor ecosystem players beyond chip designers and fabs" without needing to specify more detail. This abstraction enables true composability: agents building on agents, each focused on their core capability while we handle the web infrastructure to deliver the highest quality results.

## **Unlocking the next frontier**

The use cases above are just the beginning. Future systems will need two essential capabilities: intelligence and web access.

We're building for what's next and hope to help our customers unlock an entirely new frontier of use-cases:

- Long-horizon agents that complete the work of entire teams in hours
- Continuous monitoring systems that track the web for signals that matter
- Event-driven architectures where agents trigger on web changes
- SQL-style queries over the web - structured, precise, and programmable
- APIs that allow you to not only read the web, but write to it



We’re excited to see how developers push the frontier with our APIs.

## **Towards a programmatic web for AIs**

At Parallel, we're creating the interfaces, infrastructure, and economic models for AI agents to thrive on the open web. Our API is the first step toward that vision.

Our founding team previously built the infrastructure and markets that powered the human web at Twitter, early Google, Stripe, Airbnb, Chime and applied ML on the most ambitious bets at Waymo and Kitty Hawk. 

[Now we have a new user to build for](https://parallel.ai/about). We're backed by Khosla Ventures, First Round Capital, Index Ventures, Terrain, and visionary angels who share our beliefs in what’s needed for the future of the web built for AIs.

**Our APIs are available today.** Start building in our [Developer Platform](https://platform.parallel.ai/home) or reach out to partnerships@parallel.ai for enterprise deployments.



---

_The web's greatest chapter is just beginning. _[_Join us in building it_](https://jobs.ashbyhq.com/parallel)_. _

[Parallel](/)

Products

[Pricing](/pricing)

[Benchmarks](/benchmarks)

[Blog](/blog)

[Docs](https://docs.parallel.ai/home)

Products: [Search API](https://parallel.ai/products/search) [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Monitor API](https://docs.parallel.ai/monitor-api/monitor-quickstart) [Task API](https://docs.parallel.ai/task-api/task-quickstart) [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)

[Pricing](https://parallel.ai/pricing) [Benchmarks](https://parallel.ai/benchmarks) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home)

[Contact Sales](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ12pcl2vHJKlBaB2zZoFWhc4Q1VopGRyNwm4mKJFQiWmJPS3839IqrDQQzfSr028FVCAgKY4gt2) [Contact Sales] (https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ12pcl2vHJKlBaB2zZoFWhc4Q1VopGRyNwm4mKJFQiWmJPS3839IqrDQQzfSr028FVCAgKY4gt2) [Log In / Sign Up P](https://platform.parallel.ai/) [Log In / Sign Up] (https://platform.parallel.ai/)

Menu [Menu]

Human Machine

# \# Introducing research models with Basis for the Parallel Chat API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 2 min

Starting today, the Parallel Chat API supports three new research models, bringing research-grade web intelligence with full [Basis verification](https://docs.parallel.ai/task-api/guides/access-research-basis) [Basis verification]($https://docs.parallel.ai/task-api/guides/access-research-basis) to interactive AI applications.

The Chat API now offers two modes: the speed model for low-latency responses across a broad range of use cases, and research models (Lite, Base, Core) for deeper outputs where comprehensive verification matters more than milliseconds. Both return OpenAI ChatCompletions-compatible streaming text and JSON.

\### Example request

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

from  openai  import  OpenAI

client = OpenAI(

api_key= "PARALLEL_API_KEY" ,

base_url= "https://api.parallel.ai" 

)

response = client.chat.completions.create(

model= "core" ,  # Research model with full Basis support 

messages=[

{ "role" :  "user" ,  "content" :  "What are the key risk factors for Acme Corp?" }

],

)

 print (response.choices[ 0 ].message.content)

 print (response.basis)  # Citations, reasoning, confidence scores ```  from openai import OpenAI   client = OpenAI(   api_key="PARALLEL_API_KEY",   base_url="https://api.parallel.ai"   )   response = client.chat.completions.create(   model="core", # Research model with full Basis support   messages=[   {"role": "user", "content": "What are the key risk factors for Acme Corp?"}   ],   )   print(response.choices[0].message.content)   print(response.basis) # Citations, reasoning, confidence scores ```
```

## \## More models for different needs

The speed model delivers ~3-second time-to-first-token for chat interfaces and interactive tools. Research models trade latency for depth, running the same processors that power our Task API, now accessible through an OpenAI-compatible interface.

[](https://cdn.sanity.io/images/5hzduz3y/production/96e5986ed7f75251c01f6da6122cbd51761d733e-3606x2109.jpg?w=2000&fit=max&auto=format&dpr=2)

![Model Best For Basis Support Latency speed Low latency across a broad range of use cases No ~3s lite Simple lookups, basic metadata Yes 10-60s base Standard enrichments, factual queries Yes 15-100s core Complex research, multi-source synthesis Yes 60s-5min](https://cdn.sanity.io/images/5hzduz3y/production/96e5986ed7f75251c01f6da6122cbd51761d733e-3606x2109.jpg)

## \## Research-grade verification with Basis

Every response from research models includes Basis, the same verification framework trusted in production workflows across insurance, finance, and sales intelligence.

Basis provides four components for every output: citations linking to source URLs, reasoning explaining how conclusions were reached, excerpts containing relevant text from sources, and calibrated confidence scores classified as low, medium, or high.

\### Basis Verification

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

{ "field" : "risk_factors" , "citations" : [ { "url" : "https://sec.gov/filings/acme-10k-2024" , "excerpts" : [ "The company faces significant supply chain concentration risk..." ] } ] , "reasoning" : "Multiple SEC filings and analyst reports corroborate supply chain dependencies..." , "confidence" : "high" } ```  {   "field": "risk_factors",   "citations": [   {   "url": "https://sec.gov/filings/acme-10k-2024",   "excerpts": ["The company faces significant supply chain concentration risk..."]   }   ],   "reasoning": "Multiple SEC filings and analyst reports corroborate supply chain dependencies...",   "confidence": "high"   } ```
```

These confidence scores are calibrated against real-world datasets. High-confidence outputs have 2-3x lower error rates than overall dataset averages. Low-confidence flags identify exactly where human review adds value, enabling efficient workflows that focus attention only where it matters.

## \## **\*\* Why research models matter \*\***

Research models give the Chat API flexibility to think more deeply and search the web more widely. When a question requires multi-hop reasoning, synthesis across scattered sources, or verification from primary documents, research models allocate the compute and retrieval budget to get the best answer, not just the fastest one.

## \## **\*\* Start building \*\***

Research models are available today in the Parallel Chat API. Get started in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/) [documentation]($https://docs.parallel.ai/) .

## \## **\*\* About Parallel Web Systems \*\***

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.

Fortune 100 and 500 companies use Parallel's web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

By Parallel

January 15, 2026

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Products

* [Search API](/products/search) [Search API](https://parallel.ai/products/search)
* [Extract API](https://docs.parallel.ai/extract/extract-quickstart) [Extract API](https://docs.parallel.ai/extract/extract-quickstart)
* [Task API](https://docs.parallel.ai/task-api/task-quickstart) [Task API](https://docs.parallel.ai/task-api/task-quickstart)
* [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart) [FindAll API](https://docs.parallel.ai/findall-api/findall-quickstart)
* [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart)
* [Monitor API](https://platform.parallel.ai/play/monitor) [Monitor API](https://platform.parallel.ai/play/monitor)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms of Service](/terms-of-service) [Terms of Service](https://parallel.ai/terms-of-service)
* [Customer Terms](/customer-terms) [Customer Terms](https://parallel.ai/customer-terms)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Acceptable Use](/acceptable-use-policy) [Acceptable Use](https://parallel.ai/acceptable-use-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0) [GitHub](https://github.com/parallel-web) [GitHub] (https://github.com/parallel-web)

[All Systems Operational](https://status.parallel.ai/)

Parallel Web Systems Inc. 2026

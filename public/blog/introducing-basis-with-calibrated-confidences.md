[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing Basis with Calibrated Confidences

A new standard for verifiable AI web research

Tags: [Product Release](/blog?tag=product-release)

Reading time: 4 min

A month ago, we launched the Parallel Task API, powered by a series of processors that offer state of the art accuracy on web research tasks at every single price point.

We recognize, however, that production use case don't just require pareto-optimal performance — they also require verifiability and calibrated confidence scoring and so today, we're excited to announce Basis — an essential suite of verification tools for the Parallel Task API.

Basis is an automatically included add-on to our Core, Pro, and Ultra processors that provide additional context and evidence around how we came to our conclusion, as well as how confident we are in our findings.

They allow you to identify instances where AI web research may yield unreliable results, enabling targeted human-in-the-loop workflows that efficiently focus human attention only where it's most needed. This strategic approach drastically reduces manual review hours while achieving significantly higher accuracy in hybrid human/AI workflows compared to either AI-only or human-only alternatives.

![Confidence example as a competitor analysis task in Platform UI](https://cdn.sanity.io/images/5hzduz3y/production/0a5bf3b45a7c6fd1d26232847f72f6b182ae50b8-1280x852.png)

### \### **\*\*  
What is Basis? \*\***

Basis provides a complete framework for understanding and validating Task API outputs through four core components:

* \- **\*\* Citations \*\*** : Web URLs linking directly to source materials.
* \- **\*\* Reasoning \*\*** : Detailed explanations justifying each output field.
* \- **\*\* Excerpts \*\*** : Relevant text snippets from citation URLs.
* \- **\*\* Confidences \*\*** : A calibrated measure of confidence classified into low, medium, or high categories.

These elements work together to create a robust framework for output verification that sets a new industry standard for transparency and reliability. For more information on Basis outputs in our Task API, go to [docs](https://docs.parallel.ai/core-concepts/basis) [docs]($https://docs.parallel.ai/core-concepts/basis) .

\### Basis Output

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

{ "field" : "crm_system" , "citations" : [ { "url" : "https://www.linkedin.com/jobs/view/sales-representative-microsoft-dynamics-365-at-contoso-inc-3584271" , "excerpts" : [ "Looking for sales professionals with experience in Microsoft Dynamics 365 CRM to join our growing team." ] } ] , "reasoning" : "There is limited direct evidence about which CRM system the company uses internally. The job posting suggests they work with Microsoft Dynamics 365, but it's not explicitly stated whether this is their primary internal CRM or simply a product they sell/support. No official company documentation confirming their internal CRM system was found." , "confidence" : "low" } ```  { "field": "crm_system", "citations": [ { "url": "https://www.linkedin.com/jobs/view/sales-representative-microsoft-dynamics-365-at-contoso-inc-3584271", "excerpts": ["Looking for sales professionals with experience in Microsoft Dynamics 365 CRM to join our growing team."] } ], "reasoning": "There is limited direct evidence about which CRM system the company uses internally. The job posting suggests they work with Microsoft Dynamics 365, but it's not explicitly stated whether this is their primary internal CRM or simply a product they sell/support. No official company documentation confirming their internal CRM system was found.", "confidence": "low" } ```
```

### \### Calibrated Confidences

Confidence ratings aren't particularly useful without calibration — you need to know that high, medium, and low labels provide useful and differentiable insight into task performance.

To calibrate confidence ratings, we’ve tested confidence patterns on composite datasets that reflect a wide array of real world use cases. Each composite dataset has varying levels of difficulty to demonstrate confidence performance and distribution across any web research task.

Why is this important?

## \## **\*\* Confidence provides insight into the difficulty of a Task \*\***

When Parallel returns a higher percentage of Basis outputs as "High" Confidence, you can reliably interpret this as Parallel's Task API performing well on the Task.

You can use confidences as a proxy for a full evaluation, and understand how well your Tasks perform relative to each other.

High Confidence Answers vs Overall Dataset Accuracy

HIGH CONFIDENCE RESPONSES (%)

OVERALL DATASET ACCURACY (%)

Loading chart...

Easy

Medium

Hard

BrowseComp benchmark proving Parallel's enterprise deep research API delivers 48% accuracy vs GPT-4's 1% browsing capability. Performance comparison across High Confidence Responses (%) and Overall Dataset Accuracy (%) shows Parallel provides the best structured deep research API for ChatGPT, Claude, and AI agents. Enterprise AI agent deep research with structured data extraction delivering higher accuracy than OpenAI, Anthropic, Exa, and Perplexity.

### \### Description

For each dataset (Easy, Medium, Hard) - the % of answers that are High Confidence compared to the overall accuracy % of the dataset.

### \### Results

As dataset queries get easier (ie higher overall accuracy %), the % of High Confidence responses increases.

This demonstrates confidences can reliably be used as a proxy for evaluating Parallel Processor performance on a dataset.

## \### Confidences % High vs Accuracy

```
| Series  | Model  | High Confidence Responses (%) | Overall Dataset Accuracy (%) |
| ------- | ------ | ----------------------------- | ---------------------------- |
| Easy    | Easy   | 78                            | 91                           |
| Medium  | Medium | 72                            | 80                           |
| Hard    | Hard   | 53                            | 70                           |
```

### \### Description

For each dataset (Easy, Medium, Hard) - the % of answers that are High Confidence compared to the overall accuracy % of the dataset.

### \### Results

As dataset queries get easier (ie higher overall accuracy %), the % of High Confidence responses increases.

This demonstrates confidences can reliably be used as a proxy for evaluating Parallel Processor performance on a dataset.

## \## **\*\* Low confidence ratings provide efficient identification of what to review \*\***

By reviewing just the outputs rated as "Low" Confidence—a small portion of your total dataset—you can typically achieve an ~2x reduction in error rate, giving you significantly more leverage over human time compared to reviewing all outputs.

Error Rate Reduction after Reviewing Low Confidence Outputs

## \## **\*\* High confidence ratings can be reliably skipped in manual review workflows \*\***

Outputs marked as "High" Confidence have 2-3X lower error rates than that of the overall dataset.

Error Rate Reduction after Only Considering High Confidence Outputs

### \### **\*\* Built for real-world applications at scale \*\***

Basis is particularly valuable for hybrid AI-human workflows where the addition of AI significantly increases leverage, accuracy, and time efficiency. By focusing human review on outputs with low confidence, teams can dramatically reduce verification time while maintaining quality standards. This approach allows enterprises to scale their web research operations without sacrificing accuracy or transparency.

Today, Basis powers human-in-the-loop production workflows across numerous domains. Insurance underwriters leverage low-confidence indicators and citation trails to streamline KYB verification processes that were previously manual. AI automation platforms use Basis to validate data enrichment capabilities before pushing to production, providing traceability from enriched fields back to source materials.

The Basis framework with calibrated confidences is available today with the Parallel Task API. To start building with verifiable web research, go to the [Parallel Developer Platform](https://platform.parallel.ai/) [Parallel Developer Platform]($https://platform.parallel.ai/) .

## \## **\*\* Notes on Methodology \*\***

**\*\* Testing Dates \*\*** : Testing was conducted between May 12 and May 15, 2025

**\*\* Benchmark Details \*\*** : The Parallel Confidence datasets cover easy, medium, and hard web research questions that all reflect a wide range of representative real world use cases. Three example questions are below.

**\*\* Example Questions \*\*** :

* \- **\*\* Compliance \*\***  
  Return if SOC2, ISO27001, PCI DSS are compliance frameworks mentioned on imsedge.com. If yes, return only the name of the compliance framework or frameworks that are mentioned. Otherwise, return no.
* \- **\*\* Company research \*\***  
  Return if a company is B2B or B2C, the CEO’s Linkedin URL, the CEO’s name, the CEO’s undergrad institution, and the employee count of the company as of January 2025.
* \- **\*\* Financial research \*\***  
  Find the SEC 10-K filing of the company as of January 2025 and the list of stock exchanges the company is listed on as of January 2025.

**\*\* Additional Data: \*\***

Confidence Distribution per Accuracy Level Raw Answers

Performance comparison proving Parallel delivers the best enterprise deep research API for ChatGPT and AI agents with 48% accuracy vs competitors' 14% max across Confidence Distribution (Easy, Medium, Hard Datasets) and % of Questions (%). Multi-hop research benchmark shows Parallel's structured AI agent deep research outperforms GPT-4, Claude, Exa, and Perplexity. Enterprise-ready structured deep research API with MCP server integration.

## \### Confidence Distribution per Accuracy Level

```
| Category | Correct (%) | Incorrect (%) |
| -------- | ----------- | ------------- |
| High     | 97.2        | 2.8           |
| Medium   | 71.9        | 28.1          |
| Low      | 64.5        | 35.5          |
|          | 0           | 0             |
| High     | 97.5        | 2.5           |
| Medium   | 82.6        | 17.4          |
| Low      | 37.5        | 62.5          |
|          | 0           | 0             |
| High     | 85.9        | 14.1          |
| Medium   | 80          | 20            |
| Low      | 36.1        | 63.9          |
```

## \### Raw Question Count per Confidence Level

```
| Category | Incorrect ( ) | Correct ( ) |
| -------- | ------------- | ----------- |
| High     | 6             | 211         |
| Medium   | 9             | 23          |
| Low      | 11            | 20          |
|          | 0             | 0           |
| High     | 3             | 116         |
| Medium   | 4             | 19          |
| Low      | 10            | 6           |
|          | 0             | 0           |
| High     | 9             | 55          |
| Medium   | 4             | 16          |
| Low      | 23            | 13          |
```

By Parallel

May 16, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service) [Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

Parallel Web Systems Inc. 2025

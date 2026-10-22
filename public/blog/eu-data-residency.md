# Introducing data residency in Europe

Run Parallel Search and Extract requests in the European Union.

We’re introducing data residency in Europe for the Parallel Search and Extract APIs.

Businesses can now use Parallel to serve European customers whose vendor reviews or contracts require EU processing. When you send a request to our EU endpoint, we process and serve it in the European Union, and we don’t retain the request or response content. 

## Data residency in Europe for Search and Extract

With EU data residency, you send Search and Extract requests to `eu.parallel.ai `instead of `api.parallel.ai`. 

```python
from parallel import Parallel

client = Parallel(base_url="https://eu.parallel.ai")

search = client.search(
    objective="...",
    search_queries=["...", "..."],
    mode="basic",
)
```

As of Oct 19, our European endpoint supports a foundational set of features on our Search and Extract APIs, with more planned. 

## What leaves the EU

We process billing, metrics, and edge logs in the US. None of them contain request or response content. For Extract, the URL lookup against the public page cache also happens outside the EU.

## Privacy and security

EU traffic runs with zero data retention by default and is excluded from model training. Your DPA with Parallel reflects your EU data residency commitments. Outside the EU endpoint, our standard [Customer Terms](https://parallel.ai/customer-terms) let us use inputs and outputs, not linked to any individual, to train and improve the models behind our services; Enterprise plans with zero data retention exclude that use. Parallel is SOC 2 Type I and Type II certified. You can review our subprocessor list and security documentation at [trust.parallel.ai](http://trust.parallel.ai).



Parallel routes traffic to the US by default. Requests go to the EU only when you call the EU endpoint under a separate written agreement with us.

> We work with the largest financial institutions on earth, and those institutions are always multinational. Data residency is very top of mind for our clients outside the US. Parallel’s EU endpoint lets us serve them with the same technology our US customers rely on, allowing us to meet a common requirement from our European customers to process requests within the EU. Working with Parallel also feels like a real partnership. Their team builds alongside us, so our clients get timely, accurate web research in every workflow, wherever they operate.
>
> — Strib Walker, Head of Product, Rogo

Learn more about how [Rogo delivers best-in-class financial AI with Parallel](https://parallel.ai/blog/case-study-rogo).

## Get started

EU data residency is available through an enterprise agreement, and it works with your existing API keys. To set up an agreement, contact your Parallel account team or [talk to sales](https://contact.parallel.ai/).



For detailed instructions and examples, read the [EU data residency docs](https://docs.parallel.ai/resources/eu-data-residency).



## FAQ

**What does European data residency mean for Parallel?**

It means we can offer certain services to European customers whose vendor reviews or contracts require EU processing.



**Who can access EU data residency for Parallel?**

Enterprise customers with a DPA.



**Which of Parallels products are available with EU data residency?**

Parallel Search API in "Basic" mode and Parallel Extract. Expansion to more products is planned.



**How much do Parallel products with EU data residency cost?**

[Pricing](https://parallel.ai/pricing) is the same as non-EU products.



**Are there rate limits?**

Yes, the EU endpoint has our [standard rate limits.](https://docs.parallel.ai/getting-started/rate-limits)

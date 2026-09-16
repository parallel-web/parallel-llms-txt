# Introducing Granular Basis for the Task API

Granular Basis offers greater depth for the Basis framework in situations where outputs contain multiple entities. 

Today, we're officially releasing **Granular Basis**, extending factuality verification to every atomic element in your [Task API outputs](https://docs.parallel.ai/task-api/task-quickstart).



[Basis](https://docs.parallel.ai/task-api/guides/access-research-basis#basis) is a proprietary, fine-tuned model that provides verifiability and provenance for every output returned by Parallel’s Task API. The model consists of citations, reasoning, excerpts, and calibrated confidence scores. When we [launched Basis](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences), along with calibration benchmarks, earlier this year, every production use case powered by Parallel APIs was able to enable efficient human-in-the-loop workflows where reviewers could focus attention only where it mattered most.

But it was limited. If you asked for an array (e.g., a list of company objects, executive names, or risk factors), Basis verified the array as a whole, not for each element in the array. This meant less visibility for workflows that rely on verifying every individual field, not just top-level fields.

## **How Granular Basis works**

![Basis (Original) vs. Granular Basis (New) - displays a comparison between an earlier version of Basis and Granular Basis to highlight the deeper level of verification for each item in an array.](https://cdn.sanity.io/images/5hzduz3y/production/49e0274f4dc896cc9a0a56a5ae8e4a64c260e683-5396x3240.jpg)

Previously, a task returning an array of _competitors _would include a single Basis entry for the entire competitors field. You'd get one set of citations and excerpts, one confidence score, and one reasoning block covering all items collectively.

With Granular Basis enabled, the array as a whole _and_ each element in that array now receives its own complete Basis entry. A query returning five competitors produces six distinct Basis objects, each with:

- Citations: Web URLs linking directly to source materials.
- Reasoning: Detailed explanations justifying each output field.
- Excerpts: Relevant text snippets from citation URLs.
- Confidences: A calibrated measure of confidence classified into low, medium, or high categories.

The_ field _property uses pydash-style dot notation to identify each element: _competitors.0_, _competitors.1_, and so on.

## **Why Basis matters**

Consider a due diligence workflow extracting key executives from a target company. With top-level Basis only, a single low-confidence flag would require reviewing the entire list. With Granular Basis, you can identify exactly which executive needs verification, perhaps one with limited public information, while trusting the high-confidence entries.

This precision improves the efficacy of human-in-the-loop review. Instead of binary accept/reject decisions on entire arrays, reviewers can directly address only the elements that warrant attention.

![An example of Deep Research in the Parallel Developer Platform, which highlights Granular Basis in an array.](https://cdn.sanity.io/images/5hzduz3y/production/ed74a57f821853365809e0bd7c303491f66faecf-2478x1856.jpg)

## **How to enable it**

Add the beta header to your task creation requests:

```
parallel-beta: field-basis-2025-11-25
```

No schema changes required. The basis array in your response will automatically expand to include per-element entries alongside top-level field entries.

## **Start building**

Granular Basis is available today for all Task API processors. Get started in our [Developer Platform](https://platform.parallel.ai/) or dive into the [documentation](https://docs.parallel.ai/).

## **About Parallel Web Systems**

Parallel develops critical web search infrastructure for AI. Our suite of web search and agent APIs is built on a rapidly growing proprietary index of the global internet. These solutions transform human tasks that previously took days and weeks into agentic tasks that now take seconds and minutes.



Fortune 100 and 500 companies use Parallel’s web intelligence APIs in insurance, finance, and retail workflows to automate critical business functions. Leading AI-native businesses like Starbridge, Amp, and Day AI use Parallel to support core features like public sector contract monitoring, documentation lookup, and GTM operations.

# Full Basis framework for all Task API Processors

Starting today, Lite and Base Task API processors include the complete Basis framework—citations, reasoning, excerpts, and calibrated confidence scores.

Previously, the full [Basis framework](https://parallel.ai/blog/introducing-basis-with-calibrated-confidences) with excerpts and calibrated confidences was available only for Core, Pro, and Ultra+ processors, but not Lite and Base. Now, every processor provides complete verification tools, making Parallel outputs auditable and reliable at every price point.


**What is Basis?**

![](https://cdn.sanity.io/images/5hzduz3y/production/267befc2817d37b705994c9679207f238bb35a8e-2672x1512.webp)

Basis provides a complete framework for understanding and validating Task API outputs through four core components:

**Citations**: Web URLs linking directly to source materials.

**Reasoning**: Detailed explanations justifying each output field.

**Excerpts**: Relevant text snippets extracted from citation URLs.

**Confidences**: Calibrated measure of certainty classified into low, medium, or high categories.

These elements work together to create a robust verification framework that sets a new industry standard for transparency and reliability in web research APIs. In other words, Basis provides a reliable signal of trustworthiness for outputs of the Task API.

```json
{
  "field": "revenue",
  "citations": [
    {
      "url": "https://www.microsoft.com/en-us/Investor/earnings/FY-2023-Q4/press-release-webcast",
      "excerpts": ["Microsoft reported fiscal year 2023 revenue of $211.9 billion, an increase of 7% compared to the previous fiscal year."]
    },
    {
      "url": "https://www.sec.gov/Archives/edgar/data/789019/000095017023014837/msft-20230630.htm",
      "excerpts": ["Revenue was $211.9 billion for fiscal year 2023, up 7% compared to $198.3 billion for fiscal year 2022."]
    }
  ],
  "reasoning": "The revenue figure is consistent across both the company's investor relations page and their official SEC filing. Both sources explicitly state the fiscal year 2023 revenue as $211.9 billion, representing a 7% increase over the previous year.",
  "confidence": "high"
}
```

## **Built for hybrid AI-human workflows at scale**

Basis enables efficient human-in-the-loop workflows where AI significantly increases leverage, accuracy, and time efficiency. By focusing human review on low-confidence outputs, teams can dramatically reduce verification time while maintaining quality standards.

For example, insurance underwriters use low-confidence indicators and citation trails to streamline KYB verification processes. Another common use is with AI automation platforms, which leverage Basis to validate data enrichment capabilities before pushing to production, providing complete traceability from enriched fields back to source materials.

To learn more and start building with verifiable web research at every price point, check out our [documentation](https://docs.parallel.ai/) or visit our [Developer Platform](https://platform.parallel.ai/).

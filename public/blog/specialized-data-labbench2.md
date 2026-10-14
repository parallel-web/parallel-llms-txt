# Using specialized data to improve research agent accuracy

Measuring how biomedical databases change research agent accuracy on LABBench2

Research agents are built on the open web, but in many fields the most authoritative data is curated in specialized databases. Some of that data is also available on the web, but unevenly. A direct connection to a specialized database offers three hypothetical benefits. First, the connection provides data that is unavailable or difficult to locate on the public web. Second, a connector provides programmatic access through the database’s own search and retrieval interface, in place of a general web index. Third, a connector returns highly structured records in place of web pages.

For this test, we wanted to know whether access to specialized data via tools improves accuracy when the same data is also available on the web. We evaluated our Task API on 288 questions from LABBench2, Edison Scientific's public benchmark for AI agents performing biology research.

We ran each question twice with the same agent and model: one run had access only to the public web, and the other also had access to PubMed and ClinicalTrials.gov through [Parallel data connectors](https://parallel.ai/data-connectors). In our tests, connector access improved overall results by reducing the error rate from 11.8% to 7.6%, providing 12 additional correct answers.

## Evaluation process

LABBench2 groups its tasks into five categories. We used two subtasks from the literature retrieval and understanding category: LitQA3, 168 questions that require retrieving a specific research paper and reasoning over its full text, and TrialQA, 120 questions that require retrieving information from clinical trial records. The loader, prompts, rubric, and scoring provided with the benchmark were unchanged.

![Example LitQA3 question: the question describes a paper on the NLRP3 inhibitor usnoflast without naming it, and the agent must find the paper, read two details from its methods, and compute the expected answer of 76.8 mg/kg per mouse.](https://cdn.sanity.io/images/5hzduz3y/production/70dd631e5a26cc862a429d9529fdf599151f4c8c-1999x746.png)

We ran each question twice on Parallel’s Task API’s **Pro** processor ($0.10 per question):

- **Open web:** web search and page extraction only.
- **Open web + connectors:** The same agent, with PubMed and [ClinicalTrials.gov](https://clinicaltrials.gov) available as tools (via Parallel MCP Connectors).

The agent was free to use or ignore the connectors based on their tool descriptions. We checked the traces to confirm when the agent used connectors. With connectors available, the agent made 245 connector calls across 167 of the 168 LitQA3 questions. On TrialQA, the agent made 294 calls across all 120 questions.

On LitQA3, 95% of calls went to PubMed, which the agent queried on 166 questions. On TrialQA, 93% went to ClinicalTrials.gov, queried on 116 questions, usually as a registry search followed by a lookup of the full trial record.

## Accuracy with and without connectors

Connector access improved accuracy on LitQA3 from 87.5% to 92.9% and on TrialQA from 89.2% to 91.7%.

![Bar chart of accuracy with and without connectors. LitQA3: Parallel Pro 87.5% (21 wrong of 168) versus Parallel Pro + connectors 92.9% (12 wrong of 168). TrialQA: 89.2% (13 wrong of 120) versus 91.7% (10 wrong of 120).](https://cdn.sanity.io/images/5hzduz3y/production/277f96fae6a257569101aeb70c2b47cf68dfaa2c-1950x1036.png)

_Questions changed from incorrect to correct with connector access: 10 on LitQA3 (1 changed in the opposite direction), 5 on TrialQA (2 in the opposite direction)._

Connector access also changed the agent’s search behavior. On TrialQA, the agent replaced some web searches with registry lookups, so total lookups per question rose only marginally from 5.1 to 5.8. On LitQA3, the agent ran a similar number of web searches, so PubMed queries were largely incremental.

![Stacked bar chart of tool calls per question, split into connector calls, web searches, and page extractions. LitQA3 rises from 3.37 to 4.83 lookups per question with connectors; TrialQA rises from 5.12 to 5.81.](https://cdn.sanity.io/images/5hzduz3y/production/b1375da4a87c7cae3f70d40467cbb74672fc6182-1950x1041.png)

Task API pricing is fixed per processor, so each configuration cost $0.10 per question. Median latency was similar across configurations: 35s to 38s on LitQA3, and 42s to 38s on TrialQA.

## Where do external data sources help?

We read the traces for the 15 questions that toggled from wrong to right, and three patterns stood out:

**Constrained search space.** Trial names are often very similar. With the whole web as the search space, similarly named trials were often hard to tell apart. Asked how long the CANAL trial follows patients for its primary outcome, the open-web agent retrieved a nalbuphine study in pulmonary fibrosis. The agent suspected the match was wrong because the nalbuphine trial’s endpoint is measured in days, not months, but did not find the correct trial in 20 searches. With ClinicalTrials.gov, a single acronym search returned every trial called CANAL, including the canakinumab lung cancer trial the question references.

![Two trials called CANAL: the open-web agent retrieved a nalbuphine pulmonary fibrosis trial and answered about 2 months (wrong), while the agent with ClinicalTrials.gov found the canakinumab lung cancer trial NCT05725343 and answered 48 months (correct).](https://cdn.sanity.io/images/5hzduz3y/production/f4c0882986bf747f1cb2ca69cdff8e97d22e9cfd-1999x1112.png)

Some trials are difficult to find on the open web altogether. For the AUSTRAAL trial, the open-web agent couldn’t find any related study and gave up after 22 searches. A registry search found it immediately, allowing the agent to answer correctly.

One LitQA3 question describes a phase 2 ulcerative colitis trial without naming it. The open-web agent identified the drug, mirikizumab, but answered with phase 3 numbers. Searching PubMed by drug, phase, and first author turned up the phase 2 paper, and the agent correctly reported 31 patients in remission.

**Structured records.** The open-web and connector agents both cited the same CheckMate 743 entry on [ClinicalTrials.gov](https://clinicaltrials.gov). On the web page, the **secondary outcomes** are presented in a long table with a long description in each row, and the open-web agent missed two secondary outcomes. The connector returned the entry as a structured record with each outcome as its own field, and the agent counted all six.

REMIND-ORTHO showed the same gap between web page and record. The open-web agent read a copy of the listing on a third-party site and found two sedation drugs, while the registry record listed three.

![Same trial, different reading: for CheckMate 743 the open-web agent counted four secondary outcome measures (wrong), while the agent using the ClinicalTrials.gov connector retrieved the structured record and counted six (correct).](https://cdn.sanity.io/images/5hzduz3y/production/0c4926445616f61ba6b36413391322e8cbaea753-1999x764.png)

**Web and connectors together.** PubMed and ClinicalTrials.gov are also indexed on the open web, and ClinicalTrials.gov and PubMed Central were the domains most frequently cited by the open-web agent. Often, the agent used web search for open-ended retrieval, followed by the connector APIs for structured lookups. For CheckMate 743, for example, a ClinicalTrials.gov search for the trial name returned no match, so the agent identified the trial ID through freeform web search and then retrieved the full record through the ClinicalTrials.gov connector. A similar pattern was observed on 25 of 120 TrialQA questions.

## The data that's still locked up

Biomedicine is a favorable case for the open web. PubMed and ClinicalTrials.gov are free and well indexed, and were the domains most frequently cited by the open-web agent. In law and finance, authoritative data is primarily held in licensed databases, and web copies are partial or absent. We expect direct database access to have a larger effect in these domains.

The connectors from this post are live in Parallel today, alongside sources like PitchBook, Tracxn, and more. [Try them today](https://parallel.ai/data-connectors).

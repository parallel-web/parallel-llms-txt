# Testing out Jev: real-world developer experience

We got kind of tired of seeing all the Jev hype around [people organizing their inboxes](https://minutes.substack.com/p/tool-shaped-objects), so we decided to test how it would perform on tasks we run billions of times a day. Overall, we were surprised to see Jev deliver impressive zero-shot performance across a range of tasks.

## First, if you’re not perennially online: what is Jev?

Jev is a [new model from TypeSafe AI](https://docs.typesafe.ai/introduction), marketed as a “[System One](https://docs.typesafe.ai/concepts/system-one)” model for fast, structured decisions. You give it context and questions; it returns categories, scores, and probabilities instead of generating text.

If you’ve used BERT with a classification head, the idea should feel familiar: feed in text, and get scores over labels. Jev lets you specify the question and labels at request time, without fine-tuning a separate classifier for each task.

![](https://cdn.sanity.io/images/5hzduz3y/production/648f7baea6d0fed94ae7b0cfea2890fe6c3a5795-2880x1200.png)

## Tests we ran

We mainly tested Jev on search reranking: ordering candidate documents by their relevance to a query. Reranking is one of the core problems in search. We wanted to see how Jev would perform against the fine-tuned rerankers we operate internally.

![](https://cdn.sanity.io/images/5hzduz3y/production/61cdf8a6a56f934f0cc69459bde61e0e03926594-2880x1200.png)



Impressively, Jev matched at least one of our custom rerankers on NDCG@10, which measures how well the top 10 results prioritize relevant documents according to our human labels. It also performed competitively on latency against our larger models. Jev had a materially higher cost per document, but we own and maintain much of the inference infrastructure our rerankers run on, giving us meaningful economies of scale. For teams without that infrastructure or scale, Jev is much more likely to be cost competitive once serving costs are included.

We also tested Jev on two common tasks: topic classification (is this document about sports, news, finance, and so on) and query freshness classification (does a search query require recent information?). In both cases, Jev performed less well than our specialized internal models. Topic classification requires choosing from a large set of labels, which was a weakness in our tests. We suspect the freshness task is relatively out of distribution of Jev’s training data.

---

| Task | What it tests | Performance vs. internal systems |
| --- | --- | --- |
| Search reranking | Query–document relevance | NDCG@10 of 0.7: comparable to internal system |
| Topic classification | Choosing from a large label set | Internal “wins” |
| Query freshness classification | Whether a query requires recent information | Internal “wins” |

---

Overall, we were impressed by how close Jev came without task-specific tuning. For teams without a trained classifier, it’s a very strong starting point.

## What we liked about Jev

If you need a classifier and haven’t already collected data and trained one for your use case, this model is worth a try. It might even be the best place to start. You will still need to check quality on your own examples, but if it works for you, you get to skip model selection, training, hosting, and scaling a model yourself. This is a big win.

Overall, we are excited for Jev. Despite all the talk about LLMs, plenty of useful AI work still comes down to classification and scoring. Those tasks don’t always get much attention. It’s good to see Jev getting people interested in them again.


**TL;DR**

- Jev’s strength is useful zero-shot classification and scoring, without task-specific training. It matched or exceeded our trained models in some cases.
- The headline cost and speed comparisons are against autoregressive LLMs, not dedicated classifiers. Specialized classifiers will still often outperform Jev on cost and speed.
- Getting useful results out of the box is valuable. Collecting data, training, and serving your own model is real work.

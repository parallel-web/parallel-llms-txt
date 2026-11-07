# System One model

A System One model is an AI model that answers typed questions about an input with probabilities instead of generated text. The term, also written as "decision model," comes from TypeSafe AI and is used for fast, structured judgments that software acts on directly.

A System One model is a machine learning model that reads a state, such as a support ticket, a record, or a web page, and returns calibrated probabilities over answers you define in advance.

## What is a System One model?

TypeSafe AI coined the term when it launched Jev on Sep 15, 2026, calling Jev "the first System One model." The name comes from Daniel Kahneman's _Thinking, Fast and Slow_, which contrasts fast, intuitive System 1 thinking with slow, deliberate System 2 reasoning. Many developers now use "decision model" for the same category.

Like a large language model (LLM), a System One model understands natural-language input. Unlike an LLM, it doesn't write anything. You send a state and a set of named questions, and you get back typed answers: a probability that a statement is true, a pick from a list of options with a probability for each, or a position on an ordered scale. Because the output is a number or an option key, your code can branch on it without parsing text.

TypeSafe's Jev came first. OpenAI's Decisions API (gpt-6-luna), Perplexity's Decider models, Liquid AI's d1 family, Cloudflare's Clef models on Workers AI, Microsoft-Decision-1 in Microsoft Foundry, and Baseten's elephant-1 and mammoth-1 followed. Laya from Convai Innovations is an open-weights option you can host yourself. Third-party leaderboards such as Benchmark Heaven's JevBench, the Artificial Analysis Decision Index, and the AIM System One Index compare them.

## Key characteristics

- **Typed answers:** Every answer is a probability, an option key, or a score. There's no free text to parse or validate.
- **Three question types:** A yes/no question (TypeSafe calls it `noul`) returns the probability that a statement is true. A `choice` question picks one option from a list you define (up to 255 on Jev). A `score` question places the input on an ordered rubric of up to 10 levels.
- **Calibrated probabilities:** The probabilities are trained to match how often the answer is right, so a 0.9 should be correct about 90% of the time. TypeSafe trains Jev with a method it calls Reinforcement Learning for Calibrated Decisions (RLCD).
- **Speed and price:** Answers usually arrive in well under a second. Most vendors charge only for input tokens, with output free; Jev costs $0.042 per million input tokens.
- **Many questions per request:** You can ask several questions about one state in a single call. OpenAI's Decisions API allows up to 400 per request.
- **Answers come from the input:** Most System One models judge only the text you send. A few can retrieve web evidence first. Perplexity's Decisions API has a `web_grounding` mode that runs a search per question, and Parallel's Decisions API searches the live web and answers every question against one shared set of cited sources.

## Example

A procurement team checks every new vendor before signing. Instead of asking an LLM to write a paragraph about each one, it sends one request per vendor with three questions: does the vendor support SAML SSO (yes/no), can customers store data in the EU (yes/no), and what SOC 2 status does it publish (choice: Type 2, Type 1 only, none, or unknown).

Code then routes each vendor: anything above 0.9 on both yes/no questions with a Type 2 report goes straight through, and anything else goes to a reviewer. When we ran these three questions about Notion through Parallel's Decisions API on Nov 6, 2026, it returned 0.997 for SAML SSO, 0.997 for EU data residency, and SOC 2 Type 2 at 0.999 confidence, citing Notion's help center and security pages, in 573 ms. An answer-from-input model would need those pages pasted into the state first.

## System One vs. System Two models

A System Two model is the usual reasoning LLM: it thinks step by step and writes its answer out. The two fit different jobs, and many teams use both, with the System One model handling the bulk and escalating low-confidence cases.

|  | System One model | System Two model (reasoning LLM) |
| --- | --- | --- |
| Output | Probabilities over predefined options | Generated text |
| Typical latency | Under a second | Several seconds or more |
| Best for | High-volume routing, classification, and checks | Open-ended or multi-step questions |
| Examples | Jev, OpenAI Decisions, Perplexity Decider, Liquid d1 | GPT-6 Luna, Claude Opus 5.5 |

## Related terms

- [Decisions API](https://parallel.ai/articles/what-is-a-decisions-api): the HTTP interface many vendors use to serve System One models.
- [Grounding](https://parallel.ai/learn/grounding-llm): connecting a model's answer to external evidence.
- [Source grounding](https://parallel.ai/learn/source-grounding): tying each answer to the documents it came from.
- [JevBench](https://parallel.ai/articles/jevbench-benchmark): the best-known benchmark for comparing decision models.

## Frequently asked questions

**Who coined the term "System One model"?**

TypeSafe AI introduced it with the launch of Jev on Sep 15, 2026. The company says it borrowed the idea from Daniel Kahneman's distinction between fast System 1 and slow System 2 thinking.

**Is a System One model an LLM?**

It's closely related. Many System One models are built on LLM backbones and read natural language the same way, but they return probabilities over fixed options instead of generating text.

**Can a System One model answer questions about current events?**

Only if it can retrieve evidence. Most answer from the input you send plus what they learned in training, so they can't see facts that changed after that. The few with web retrieval look up current evidence before they answer.

**What's the difference between a System One model and a decision model?**

Nothing. They're two names for the same category. TypeSafe uses "System One model," while many other vendors and writers say "decision model."

Start building: try web-grounded decisions in the [Parallel Decisions playground](https://platform.parallel.ai/play/decisions), which includes 5,000 free requests.

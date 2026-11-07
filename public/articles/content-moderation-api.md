# Content moderation API options in 2026, and when moderation needs the live web

Picking a content moderation API in 2026 starts with one question: is the harm visible in the post itself, or does judging it require facts from somewhere else? This guide covers the main moderation APIs and what each is designed for, decision models for custom policies, and how to check listings for recalls, impersonation, and fake reseller claims against live web evidence.

A content moderation API scores user content against harm categories so your app can block, hold, or publish it. OpenAI's moderation endpoint (`omni-moderation-latest`) is free and covers 13 text and image categories; Azure AI Content Safety returns 0-7 severity levels for hate, sexual, violence, and self-harm; AWS splits the job between Rekognition (images and video) and Comprehend (text toxicity); Hive, renamed Deploy in October 2026, covers text, image, video, and audio. These tools judge what's in the content. Policies like "is this product recalled?" or "is this seller authorized?" depend on facts outside the post, and for those you need a check grounded in live web evidence.

## What a content moderation API does

Most moderation APIs are classifiers with a fixed taxonomy. You send text or an image, and you get back a score or severity for each category: hate, harassment, sexual content, violence, self-harm, and so on. Your code compares those scores to thresholds and decides what happens next.

That design has three practical consequences. Categories are set by the vendor, so a policy that isn't in the taxonomy needs custom training or a different tool. Scores are signals, not verdicts; OpenAI's docs say to treat them "as signals for your application's policy, not as an automatic blocking decision." And the model only sees what you send it, which is the right scope for toxicity and nudity and the wrong scope for claims about the world.

## The main content moderation APIs in 2026

### OpenAI moderation endpoint

OpenAI's [moderation guide](https://developers.openai.com/api/docs/guides/moderation) documents `omni-moderation-latest`, which accepts text and images (not audio) and is free to use. It returns `flagged`, per-category booleans, and `category_scores` from 0 to 1 for 13 categories: harassment, harassment/threatening, hate, hate/threatening, illicit, illicit/violent, self-harm, self-harm/intent, self-harm/instructions, sexual, sexual/minors, violence, and violence/graphic. Some categories are text only. You can call `POST /v1/moderations` on its own or attach `moderation: {"model": "omni-moderation-latest"}` to a Responses API request to score both input and output. OpenAI notes it upgrades the underlying model over time, so custom thresholds on `category_scores` may need recalibration.

### Perspective API

[Perspective API](https://perspectiveapi.com/), from Jigsaw at Google, scores comment text for attributes such as toxicity, insult, and threat. It's designed for publishers and comment platforms and is built into tools like Vox Media's Coral and a Discourse plugin. Jigsaw has announced that Perspective is sunsetting: the service remains active until December 31, 2026, quota requests were accepted until February 2026, and Jigsaw isn't offering direct migration support. Laya-based hosts now offer a compatible endpoint (see below).

### Azure AI Content Safety

[Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) analyzes text and images for hate, sexual, violence, and self-harm, with severity levels on a 0-7 scale (or a trimmed 0, 2, 4, 6 scale). Microsoft's FAQ recommends starting new projects at a severity threshold of 4 and adjusting from there. Beyond the core categories, it offers Prompt Shields for prompt injection, protected-material detection, groundedness detection (preview), and custom categories (preview) that you train from your own examples. Billing is per text record and per image, with F0 (free) and S0 tiers. The core text classifiers are trained and tested on eight languages.

### AWS: Rekognition and Comprehend

On AWS, images and video go to [Amazon Rekognition content moderation](https://aws.amazon.com/rekognition/content-moderation/), which detects explicit and suggestive content, violence, drugs, tobacco, alcohol, hate symbols, gambling, and disturbing content using a three-level label taxonomy with confidence scores. You can add custom adapters and route uncertain images to human review. Stored-video moderation is priced at $0.10 per minute in AWS's us-east-1 example. Text goes to Amazon Comprehend's [trust and safety features](https://docs.aws.amazon.com/comprehend/latest/dg/trust-safety.html): toxicity detection (labels such as PROFANITY and GRAPHIC plus an overall toxicity score), prompt safety classification, and PII detection, billed in 100-character units with a 300-character minimum per request.

### Hive (now Deploy)

Hive rebranded as Deploy on [October 26, 2026](https://thehive.ai/blog/hive-is-now-deploy); existing logins are unchanged, and the content safety models stay part of the product line. Its visual moderation model returns 90+ subclasses across NSFW, violence, drugs, hate imagery, and more, and it also moderates text, audio, and text inside images. Self-serve pricing lists text moderation at $0.50 and visual moderation at $3.00 per 1,000 requests, with a default limit of 100 requests a day before you contact sales. Hive's vision language model checks images, video, and text against a policy you write in a prompt, and Hive markets it for marketplace use cases like spotting counterfeit or prohibited goods.

### Decision models for custom policies

Decision models (System One models) let you write your own policy as typed questions and get calibrated probabilities back, without training a classifier. A question like "Does this post ask users to move payment off-platform?" becomes a `noul` (yes/no probability), and "Which policy does this violate?" becomes a `choice` over your policy names.

- TypeSafe's Jev answers from the content you send, supports up to 255 options per choice, and costs $0.042 per 1M input tokens.
- OpenAI's Decisions API (`gpt-6-luna`) takes up to 400 questions per request at $0.10 per 1M uncached input tokens, with prompt caching for repeated policy text.
- Laya is an open-weights (Apache-2.0) encoder model you can self-host and fine-tune. layahost, an independent host not affiliated with Google, Jigsaw, Convai, or TypeSafe, [implements Perspective's `comments:analyze` method](https://layahost.com/docs/perspective) so existing Perspective code can switch hosts and keys; it charges $15 per million decisions (one per requested attribute), says the model is English-first, and tells users to re-check thresholds because the scores come from a different model. Laya's own card says the base checkpoints are weak zero-shot, so expect to fine-tune for custom policies.

All three answer from the input only. Perplexity's decision API adds a `web_grounding` mode that runs one search per question.

## Comparison of content moderation APIs

| API | Inputs | Output | Custom policies | Price (published) | Designed for |
| --- | --- | --- | --- | --- | --- |
| OpenAI omni-moderation-latest | Text, images | 13 category scores 0-1 plus flagged | No (fixed categories) | Free | Fast first-pass screening of user input and model output |
| Perspective API (Jigsaw) | Comment text | Attribute scores 0-1 | No | Service ends after Dec 31, 2026 | Comment sections and publisher tooling |
| Azure AI Content Safety | Text, images | Severity 0-7 per category | Yes, custom categories (preview) | Per text record and per image | Apps on Azure, gen AI guardrails, prompt injection |
| AWS Rekognition and Comprehend | Images, video, text | Labels with confidence, toxicity score | Custom adapters (Rekognition) | $0.10 per video minute; text per 100 characters | Media-heavy platforms on AWS |
| Hive (Deploy) | Text, images, video, audio | Class scores, 90+ visual subclasses | Yes, prompt-defined VLM policy | $0.50 text, $3.00 visual per 1,000 | Social, gaming, dating, and marketplace trust and safety |
| Decision models (Jev, OpenAI, Laya) | Text, some images | Typed answers with probabilities | Yes, you write the questions | $0.042-$0.10 per 1M tokens; layahost $15 per 1M decisions | Your own policy wording on content you already have |
| Parallel Decisions API | Text, URLs, JSON | Typed answers with probabilities and citations | Yes | $1 per 1,000 requests, up to 100 questions | Policies that depend on facts outside the content |

## Moderation that depends on facts outside the post

Some of the costliest policy violations on marketplaces and ad platforms look clean to a content classifier, because nothing in the text is toxic or explicit:

- Brand impersonation: a storefront named "Official DREO Store" that DREO doesn't run.
- Counterfeit and unauthorized listings: a seller claiming to be an authorized reseller who isn't on the brand's published list.
- Scam domains: a "recall refund center" URL that isn't the official recall channel.
- Fake partner claims: "Certified Shopify Plus Partner" from a company that isn't in Shopify's partner directory.
- Recalled products: a used heater resold after a federal recall.

Each one is a yes/no question about the world. A rule that hardcodes the answer goes stale, and the evidence lives on brand sites, regulator pages, and partner directories that change weekly. Parallel's use-case table lists this exact pattern: "Does this seller listing impersonate a known brand?"

## A live recall check on a marketplace listing

Parallel's [Decisions API](https://parallel.ai/products/decisions) (we build it, so weigh that) takes the listing as `state`, searches the live web once, and answers every question in the request against the same evidence, with citations for the whole call. We ran this request on November 6, 2026, against a real recall: on October 29, 2026, the CPSC announced a recall of about 338,800 DREO DR-HSH015 space heaters manufactured from April 2025 through January 2026, with a free replacement as the remedy and recallrtr.com/spaceheater as one of the listed contact channels ([CPSC notice](https://www.cpsc.gov/Recalls/2027/DREO-Recalls-DR-HSH015-Space-Heaters-Due-to-Fire-and-Burn-Hazards)). The listing and the refund domain are made up for the test.

```bash
curl https://api.parallel.ai/v1/decisions \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "state": {
      "marketplace": "US secondhand marketplace listing, submitted Nov 6, 2026",
      "title": "DREO ceramic space heater DR-HSH015 with remote, like new",
      "description": "Used one winter. Label on the bottom says model DR-HSH015, manufactured 2025/08. Works great, 1500W. Any recall refund can be claimed at dreo-refund-center.com.",
      "price_usd": 45
    },
    "questions": {
      "unit_under_recall": {
        "type": "noul",
        "instructions": "Is this specific unit (model DR-HSH015, manufactured 2025/08) covered by an active U.S. CPSC recall?"
      },
      "recall_remedy": {
        "type": "choice",
        "instructions": "If the unit is recalled, what remedy does the recall notice offer consumers?",
        "criteria": {
          "refund": "A refund",
          "replacement": "A free replacement heater",
          "repair": "A repair kit or repair",
          "not_recalled": "The unit is not under recall",
          "unknown": "The evidence does not say"
        }
      },
      "refund_domain_official": {
        "type": "noul",
        "instructions": "Is dreo-refund-center.com one of the official contact channels listed for this recall by CPSC or DREO?"
      }
    }
  }'
```

```json
{
  "mode": "fast",
  "answers": {
    "unit_under_recall": {"type": "noul", "noul": 0.998},
    "recall_remedy": {
      "type": "choice",
      "choice": "replacement",
      "probabilities": {"refund": 0.002, "replacement": 0.997, "repair": 0.0002, "not_recalled": 0.0004, "unknown": 0.001},
      "confidence": 0.996
    },
    "refund_domain_official": {"type": "noul", "noul": 0.006}
  },
  "citations": [
    {"url": "https://www.cpsc.gov/Recalls/2027/DREO-Recalls-DR-HSH015-Space-Heaters-Due-to-Fire-and-Burn-Hazards"},
    {"url": "https://www.dreo.com/pages/safety-rc"},
    {"url": "https://www.cpsc.gov/Recall-Products/Electric-Heaters"}
  ],
  "decision_id": "decisions_92f26a3f25f3cf3a508505e84dd99243"
}
```

All three answers match the CPSC notice, in 839 ms from our client, for $0.001. As a control we changed only the manufacture date to 2026/03, which is outside the recalled range. `unit_under_recall` dropped to 0.076, and the refund domain stayed at 0.001 (715 ms). The model read the date window, not just the model number. One quirk: `recall_remedy` still chose `replacement` in the control, because the question was phrased "if the unit is recalled"; ask unconditional questions when you want `not_recalled` to win.

## Where it got an authorized-reseller check wrong

We also asked whether ASICS's published [list of Amazon authorized retailers](https://www.asics.com/us/en-us/customer-service/amazon-authorized-retailers) includes the storefront "Tennis Warehouse," with options `listed`, `not_listed`, and `unknown`. Tennis Warehouse is on the list. The API answered `not_listed` at 0.75, citing the right ASICS page (`decisions_046df36c68bc72c657ba685901fb7c56`). The excerpt it retrieved skipped the middle of the table, rows that included Tennis Warehouse. Adding the list URL to `state` made it worse: `not_listed` at 0.96. For a made-up storefront, "Court Kings Outlet," it correctly answered `not_listed` at 0.99.

The lesson is about tool choice, not just this example. Exact membership in a long published list is a lookup, and a lookup should be deterministic: fetch the page with an extraction API (Parallel's Extract returns the full page as markdown), normalize names or seller IDs, and string-match. Use a decision model for the judgment calls around the lookup, like whether a storefront name is a close imitation of a listed one or whether a listing's claims match the brand's terms.

## Thresholds and human review

Every API in this guide returns a score, not a verdict. A workable pattern for marketplace and ad review:

1. Run the cheap in-content checks first (OpenAI's free endpoint or your existing classifier) and block clear violations.
2. Send listings in risky categories (recall-prone products, high-counterfeit brands, financial claims) to a web-grounded check.
3. Act automatically only at the extremes: hold above about 0.9, publish below about 0.1, and send everything in between to a person with the citations attached.
4. Use `choice` questions with an `unknown` option for facts that may not be published. Parallel's docs warn that a low `noul` on missing evidence isn't proof the statement is false.
5. Log the `decision_id`, the answer, and the reviewer's ruling, and tune thresholds per question from that data.

## Latency budget for pre-publication checks

If a check runs before a post goes live, it sits in the user's submit flow. Answer-from-input checks are quicker (OpenAI cites 100-180 ms for its Decisions endpoint). Parallel's Decisions API is typically under 1 second, including the web search; our five calls in this article took 715-839 ms measured from the client. That fits a synchronous check on a listing form. For higher volumes, run the web check right after submission and keep the listing in a short pending state, or publish and re-check asynchronously for low-risk categories.

## What it costs

Published prices for 100,000 listings a month, one request each:

- OpenAI moderation endpoint: free.
- Hive text moderation: $0.50 per 1,000 requests, so $50 (self-serve tier).
- layahost Perspective-compatible endpoint: $15 per million decisions, so $1.50 for one attribute per listing.
- Parallel Decisions API: $1 per 1,000 requests with up to 100 questions each, search included, so $100 for the recall, refund-domain, and remedy checks together.

Answer-from-input decision models are 10 to 100 times cheaper per question than a web-grounded check, and OpenAI's moderation endpoint is free, so use them for everything they can see in the content. Spend the web check on the questions they can't answer.

## Frequently asked questions

**Is the OpenAI moderation API free?** Yes. OpenAI's docs say the moderation endpoint is free to use with `omni-moderation-latest`, which classifies text and images (up to 20 MB) across 13 categories.

**Is Perspective API being retired?** Jigsaw has announced that Perspective API remains active until December 31, 2026 and won't be in service after 2026, without direct migration support. Hosts such as layahost offer a `comments:analyze`-compatible endpoint backed by a different model, so thresholds need re-checking.

**Can a content moderation API detect counterfeit or impersonation listings?** Partly. Image and VLM-based tools like Hive's can flag visual signs of counterfeits, and decision models can judge suspicious wording. Whether a seller is authorized, or a product is recalled, depends on outside sources, so those checks need web evidence or a direct lookup against the brand's list.

**What threshold should I use for moderation scores?** There's no universal number. Start conservative, automate only at the extremes, send the middle band to human review, and tune per category from reviewed outcomes. Microsoft recommends starting Azure AI Content Safety at severity 4.

**How fast is a web-grounded moderation check?** Parallel's Decisions API typically answers in under 1 second with the web search included; our calls on November 6, 2026 took 715-839 ms. Answer-from-input decision models are quicker; OpenAI cites 100-180 ms for its Decisions endpoint.

## Try it

Paste one of your own listings into the [Decisions playground](https://platform.parallel.ai/play/decisions) (5,000 free requests) and ask the policy questions your reviewers ask, or start from the [quickstart](https://docs.parallel.ai/decisions/decisions-quickstart). To check whether a web-grounded check fits your workflows, the [use-case demo](https://webjev-use-cases.paralleldemos.com/) maps them for your company.

Related reading: [AI fact-checking API](https://parallel.ai/articles/ai-fact-checking-api) / [Vendor validation with AI](https://parallel.ai/articles/vendor-validation-ai) / [Zero-shot classification in 2026](https://parallel.ai/articles/zero-shot-classification) / [What is a decisions API?](https://parallel.ai/articles/what-is-a-decisions-api)

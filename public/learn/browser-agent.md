# Browser agent

A browser agent pairs a language model with a real browser engine (typically headless Chromium via Playwright or CDP) so the model can navigate pages, click controls, fill forms, and read rendered content dynamically.

A browser agent pairs a language model with a real browser engine (typically Chromium controlled via Playwright, Puppeteer, or the Chrome DevTools Protocol) so the model can navigate web pages, click buttons, fill forms, and read rendered output from a natural-language goal. Unlike a deterministic scraper that hard-codes CSS selectors, a browser agent inspects each page state in a loop and decides the next UI action dynamically.

**Browser agent perception-action loop**

```text
┌──────────────────┐  DOM / a11y tree / screenshot   ┌───────────────┐
│   Real Browser   │ ──────────────────────────────▶ │   LLM Agent   │
│ (Chromium + CDP  │                                 │ (plans next   │
│  / Playwright)   │ ◀────────────────────────────── │  UI action)   │
└────────┬─────────┘  click / type / scroll / goto   └───────────────┘
         │
         ▼ rendered mutations, auth cookies, redirects
   [Live Website]
```

## How a browser agent perceives a page

Raw HTML for a modern single-page app is noisy and too large for an LLM's [context window](/learn/context-window). Browser agents rely on three perception representations—often combining two of them:

1. **Accessibility tree (a11y snapshot):** A compact semantic tree of interactive roles (`button`, `textbox`, `link`), accessible labels, and temporary element refs (`@e14`). Fast, token-light, and resistant to CSS class churn.
2. **Screenshots (vision / computer use):** Rendered viewport pixels passed to a multimodal model that predicts `(x, y)` click coordinates (sometimes overlaid with numbered Set-of-Mark bounding boxes). Necessary for `<canvas>`, custom widgets, and visual layout checks, at higher latency and token cost.
3. **Distilled DOM:** Pruned HTML keeping only visible interactive nodes and main text, stripped of `<script>`, `<style>`, and hidden subtrees.

```python
async def execute_browser_action(page, action: dict) -> dict:
    kind = action["type"]
    if kind == "goto":
        await page.goto(action["url"], wait_until="domcontentloaded", timeout=15_000)
    elif kind == "click":
        await page.locator(action["selector"]).first.click(timeout=5_000)
    elif kind == "fill":
        await page.locator(action["selector"]).first.fill(action["value"])
    elif kind == "press":
        await page.keyboard.press(action["key"])
    else:
        return {"error": f"Unsupported action: {kind}"}

    return {
        "url": page.url,
        "title": await page.title(),
        "a11y_snapshot": await page.accessibility.snapshot(),
    }
```

## Browser agent vs. web search API vs. headless browser API

Browser agents are expensive and slow compared to direct retrieval: a 10-step browsing session requires 10 LLM round-trips plus full page renders. Use a browser agent only when the task genuinely requires stateful UI interaction—logging in, clicking multi-step filters, or submitting forms where no API exists.

| Approach | Latency | Token cost | Handles logins & form writes | Best fit |
| --- | --- | --- | --- | --- |
| [Web search API](/learn/web-search-api) | ~200 ms–3 s | Low (compact excerpts) | No (read-only public web) | Live research, [agentic search](/learn/agentic-search), grounding |
| [Headless browser API](/learn/headless-browser-api) | 1–5 s | Medium | Scripted only | Rendering known JS URLs with deterministic code |
| Browser agent | 10–90+ s | High (multi-turn DOM/vision) | Yes (adaptive UI clicks/forms) | Portals without APIs, checkout/booking, QA workflows |

On read-heavy research tasks, calling a [web search API](/learn/web-search-api) like [Parallel Search](/products/search) or [Extract](/products/extract) skips browser startup, rendering overhead, and visual-grounding errors altogether. Where sites explicitly expose structured actions in the browser, emerging standards like [WebMCP](/learn/webmcp) aim to replace brittle DOM clicking with typed page tools.

## Failure modes in production

- **Write-heavy UI fragility:** Benchmarks such as Skyvern's [Web Bench](https://www.skyvern.com/blog/web-bench-a-new-way-to-compare-ai-browser-agents/) show agents struggle most on write tasks—authentication flows, multi-field forms, date pickers, and validation pop-ups—compared to read-only lookups.
- **Anti-bot defenses and session state:** Headless browsers trigger TLS/fingerprint checks and CAPTCHAs on protected sites (the domain of [web unlockers](/learn/web-unlocker)).
- **Prompt injection via page content:** Malicious text hidden on a visited web page can instruct the agent to exfiltrate session cookies or submit unintended forms. Isolate browser profiles and gate irreversible actions (payments, deletes, external submits) behind human approval.

## Frequently asked questions

**How is a browser agent different from Playwright or Selenium scripts?**

Playwright and Selenium execute fixed instructions written by a developer and break when a selector or flow changes. A browser agent uses those engines underneath, but lets an LLM inspect the live page and choose each step dynamically.

**When should an AI agent avoid using a browser?**

Skip the browser whenever you are reading public web information rather than mutating a UI. A [web search API](/learn/web-search-api) or extraction endpoint returns clean, citable text orders of magnitude faster and cheaper than driving Chromium turn by turn.

**What is the difference between a browser agent and a computer-use agent?**

A browser agent operates inside the web browser (DOM, accessibility tree, tabs). A computer-use agent operates at the OS desktop level over screenshots, mouse coordinates, and keyboard events across any native application.

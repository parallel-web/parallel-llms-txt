# Build an EU research agent with the Parallel Search API

To build a research agent for European users, point Parallel's Python SDK at the EU endpoint and search the web with the Search API in basic mode. This tutorial builds that agent in about 40 lines of Python. It strips obvious personal data from queries and returns numbered sources your model can cite.

EU data residency at Parallel covers Search API requests in basic mode sent to the EU endpoint. The API is the same as on the default endpoint, so the only changes from a US integration are the host and the mode.

## What you need

- A Parallel API key with EU data residency turned on. It's an optional feature, and its commitments are set out in your DPA.
- Python 3.9 or later and the Parallel SDK.

```bash
pip install parallel-web
export PARALLEL_API_KEY="your-api-key"
```

## Connect to the EU endpoint

Pass the EU host as `base_url` when you create the client.

```python
import os
from parallel import Parallel

client = Parallel(
    api_key=os.environ["PARALLEL_API_KEY"],
    base_url="https://eu.parallel.ai",
)
```

## Step 1: Keep personal data out of queries

Agents write search queries from user tasks, so personal details can end up in tool calls. A small redaction step removes the obvious ones before anything leaves your system.

```python
import re

EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
PHONE = re.compile(r"\+?\d[\d\s().-]{7,}\d")


def minimise(text):
    return PHONE.sub("[phone]", EMAIL.sub("[email]", text))
```

This is a starting point, not a full personal data filter. Decide with your privacy team what your use case needs.

## Step 2: Search in basic mode

The agent sends the question to [Search](https://docs.parallel.ai/search/search-quickstart) with `mode="basic"`, the mode EU data residency covers. Each result comes back with excerpts focused on the objective, so the agent doesn't need a separate call to read the pages.

```python
def research(question, queries, top=5):
    found = client.search(
        objective=minimise(question),
        search_queries=[minimise(q) for q in queries],
        mode="basic",
    )
    return [
        {"url": r.url, "title": r.title, "excerpts": r.excerpts}
        for r in found.results[:top]
    ]
```

The Extract API isn't covered by EU data residency. If you add Extract to this agent, it runs on the default endpoint, outside the EU residency commitment.

## Step 3: Build a prompt with numbered sources

The agent hands the sources to a model with instructions to cite them. Use a model hosted where your residency requirement says it should be.

```python
def build_prompt(question, sources):
    blocks = [
        f"[{i}] {s['title']}\n{s['url']}\n" + "\n".join(s["excerpts"])
        for i, s in enumerate(sources, start=1)
    ]
    return (
        "Answer using only the sources below and cite them by number.\n\n"
        f"Question: {question}\n\n" + "\n\n".join(blocks)
    )
```

## Step 4: Run it

```python
if __name__ == "__main__":
    question = "What does the EDPB say counts as an international data transfer under the GDPR?"
    sources = research(
        question,
        queries=["EDPB guidelines international transfer", "GDPR Chapter V transfer definition"],
    )
    for s in sources:
        print("-", s["title"], "|", s["url"])
    print("prompt characters:", len(build_prompt(question, sources)))
```

The agent prints the European Data Protection Board pages it found, then the size of the prompt it built for the model.

## What stays in the EU

For Search API requests in basic mode sent to the EU endpoint, the endpoint, the full search index, and inference run in the EU. EU traffic has zero data retention by default. Only minimal billing metadata, such as IDs, the SKU, and a timestamp, goes to the US, and it never includes your inputs or outputs. Live fetch, which retrieves public pages at request time, runs globally. It's optional and can be turned off for your account. Your model call runs wherever your model provider hosts it. More detail is at [parallel.ai/europe](https://parallel.ai/europe).

## What to add before production

- A data processing agreement with each provider.
- A decision on live fetch. Turn it off if you need strict in-region processing.
- Retention rules for anything the agent stores.
- Tests with your own queries in your users' languages.

For more on the API, see the [Search](https://parallel.ai/products/search) product page.

## FAQ

### How do I use Parallel's EU endpoint?

Once EU data residency is turned on for your account, send Search API requests in basic mode to the EU endpoint. In the Python SDK, pass the EU host as `base_url` when you create the client.

### Does the EU endpoint keep all data in the EU?

For Search API requests in basic mode, the endpoint, the full index, and inference run in the EU. Minimal billing metadata goes to the US without inputs or outputs. Live fetch is global and can be turned off.

### Can I use the Extract API on the EU endpoint?

Extract isn't covered by EU data residency. It runs on the default endpoint.

### Can I use any LLM with this agent?

Yes. The agent produces a prompt with numbered sources, so any model works. Pick one whose hosting matches your residency requirement.

## Sources

All accessed October 14, 2026.

- [Parallel: Search API Quickstart](https://docs.parallel.ai/search/search-quickstart)
- [parallel-web Python SDK on PyPI](https://pypi.org/project/parallel-web/)

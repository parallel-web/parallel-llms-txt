Human Machine

# \# Building a free CLI agent with Pi, Ollama, Gemma 4, and Parallel

Tags: Cookbook

Reading time: 4 min

When building software, I’ve often focused on different outcomes: speed, quality, ease of use. In the age of AI, cost is often overlooked. Now, in 2026, I wanted to see: could I vibe-code a CLI that uses AI completely for free? No LLM subscription, no per-token API bills, no hosted inference. Just a local model, a local agent harness, and [Parallel's Free Search MCP](https://parallel.ai/blog/free-web-search-mcp) [[Parallel's Free Search MCP] (/blog/free-web-search-mcp)](/ai/blog/free-web-search-mcp) .

The result: ``` brief ``` , a single-file CLI that takes a topic and prints a morning-coffee summary with sources. It was _\_ written by \__ a local agent (Pi + gemma4:26b on Ollama) using the Parallel Search MCP to pull docs into context, and it _\_ runs on \__ the same free building blocks at runtime, ``` gemma4:e4b ``` on local Ollama for summarization and Parallel Search MCP for the news lookup. Full stack, on one machine, at my desk — $0 in API charges, zero API keys in my shell history. (Cost of the laptop not included.)

Here's how it went and where the rough edges were.

## \## The development stack

* \- **\*\* Agent harness: \*\*** [Pi](https://github.com/badlogic/pi-mono) [[Pi] (https://github.com/badlogic/pi-mono)](https://github.com/badlogic/pi-mono) ( ``` @mariozechner/pi-coding-agent ``` ). Billed as a _\_ minimal terminal coding harness \__ — four built-in tools ( ``` read ``` , ``` write ``` , ``` edit ``` , ``` bash ``` ), everything else via extensions. "Adapt pi to your workflows, not the other way around." MCP support comes from a third-party extension, [``` pi-mcp-adapter ```](https://github.com/nicobailon/pi-mcp-adapter) [[ ``` pi-mcp-adapter ``` ] (https://github.com/nicobailon/pi-mcp-adapter)](https://github.com/nicobailon/pi-mcp-adapter) .
* \- **\*\* Model runtime: \*\*** [Ollama](https://ollama.com/) [[Ollama] (https://ollama.com/)](https://ollama.com/)
* \- **\*\* Model: \*\*** ``` gemma4:26b ``` — the 26B Mixture-of-Experts variant with 4B active parameters from Google DeepMind's Gemma 4 family (Apache 2.0 license).
* \- **\*\* Search: \*\*** [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) [[Parallel Search MCP] (https://docs.parallel.ai/integrations/mcp/search-mcp)](https://docs.parallel.ai/integrations/mcp/search-mcp) at ``` https://search.parallel.ai/mcp ``` . Two tools: ``` web_search ``` and ``` web_fetch ``` . No auth required.

## \## Getting it running

Four files end up on disk — two in the project, two global:

\### File structure

```
1

2

3

4

5

6

7

pi_coder/
├──  .mcp.json # Parallel Search MCP endpoint 
└──  .pi/ 
    └── settings.json   # pointer to the Ollama provider 

~ /.pi/agent/ 
└── models.json         # defines the Ollama provider itself ```  pi_coder/ ├── .mcp.json          # Parallel Search MCP endpoint └── .pi/ └── settings.json  # pointer to the Ollama provider   ~/.pi/agent/ └── models.json        # defines the Ollama provider itself ```
```

### \### Adding MCP support to Pi

Pi intentionally doesn't ship with MCP support. To use MCP, install the following:

\### Install the Pi MCP adapter

```
1

pi install npm:pi-mcp-adapter ```  pi install npm:pi-mcp-adapter ```
```

### \### Adding the Parallel Search MCP to Pi

There's nothing to set up server-side — [Parallel](https://parallel.ai/) [[Parallel] (/)](/ai/) hosts the endpoint. Drop the URL into ``` .mcp.json ``` :

\### Parallel Search Free MCP Server

```
1

2

3

4

5

6

7

8

{ "mcpServers" : { "parallel-search" : { "url" : "https://search.parallel.ai/mcp" , "directTools" : [ "web_search" , "web_fetch" ] } } } ```  { "mcpServers": { "parallel-search": { "url": "https://search.parallel.ai/mcp", "directTools": ["web_search", "web_fetch"] } } } ```
```

That's the whole add. ``` directTools ``` registers ``` web_search ``` and ``` web_fetch ``` as first-class Pi tools alongside ``` read ``` / ``` write ``` / ``` edit ``` / ``` bash ``` — roughly 300–600 tokens of system-prompt overhead for the pair.

To verify it's wired up: ``` /mcp ``` inside Pi opens a panel showing every configured server, its connection status, and its tools. You should see ``` parallel-search ``` connected with ``` web_search ``` and ``` web_fetch ``` available.

### \### Pointing Pi at Ollama

Pi resolves providers globally, so the Ollama definition goes in ``` ~/.pi/agent/models.json ``` :

\### Point Pi at Ollama

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

{ "providers" : { "ollama" : { "baseUrl" : "http://localhost:11434/v1" , "api" : "openai-completions" , "apiKey" : "ollama" , "models" : [ { "id" : "gemma4:26b" } ] } } } ```  { "providers": { "ollama": { "baseUrl": "http://localhost:11434/v1", "api": "openai-completions", "apiKey": "ollama", "models": [{ "id": "gemma4:26b" }] } } } ```
```

Then the project-local .pi/settings.json just picks it:

\### Default provider settings

```
1

2

3

4

{ "defaultProvider" : "ollama" , "defaultModel" : "gemma4:26b" } ```  { "defaultProvider": "ollama", "defaultModel": "gemma4:26b" } ```
```

Full install:

\### Installation

```
1

2

3

4

5

6

7

8

npm install -g @mariozechner/ pi -coding-agent
 pi  install npm: pi -mcp-adapter
ollama pull gemma4: 26 b
ollama pull gemma4:e4b
ollama serve &
# write ~/. pi /agent/ models .json (see above)
cd pi_coder # contains .mcp.json + . pi /settings.json
 pi ```  npm install -g @mariozechner/pi-coding-agent pi install npm:pi-mcp-adapter ollama pull gemma4:26b ollama pull gemma4:e4b ollama serve & # write ~/.pi/agent/models.json (see above) cd pi_coder # contains .mcp.json + .pi/settings.json pi ```
```

## \## What I asked it to build

I gave Pi a detailed spec for a CLI called ``` brief ``` :

\### Spec for Pi

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

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

51

52

53

54

55

56

57

58

59

60

61

62

63

64

65

66

67

68

69

70

71

72

73

74

# `brief` — a terminal news briefing CLI 

A tiny CLI that turns a topic into a morning-coffee briefing in your terminal. You type a topic, it fetches what happened recently, and prints a short summary with sources.

 ## Usage ```bash
brief "ai agents"
brief "openai" --since 24h
brief "rust web frameworks" --bullets 5
``` 

Output (stdout, plain text with minimal ANSI):

 ```
🗞  ai agents — last 24h

• Anthropic shipped Opus 4.7 with 1M-token context…  [1]
• LangChain released v1.0 with a rewritten runtime…  [2]
• Researchers at CMU published a paper on…           [3]

Sources
[1] https://…
[2] https://…
[3] https://…
``` ## Flags 

| Flag | Default | Purpose |
| --- | --- | --- |
|  `--since <duration>`  |  `24h`  | Recency window ( `6h` ,  `24h` ,  `7d` ) |
|  `--bullets <n>`  |  `5`  | Number of bullets |
|  `--json`  | off | Emit structured JSON instead of prose |

 ## How it works 

Three steps, one file:

 1. **Search**  — use  `@modelcontextprotocol/sdk`  with  `StreamableHTTPClientTransport`  to connect to  `https://search.parallel.ai/mcp` , then  `client.callTool({ name: "web_search", arguments: { ... } })` . Do  **not**  hand-roll JSON-RPC over  `fetch`  — the Streamable HTTP transport has an initialize handshake, session headers, and SSE framing that the SDK handles. When developing, run await client.listTools() once and log the web _search input schema before the first callTool — don't guess argument names; also log the results so you know the shape of the response. Pass `--since` in the search objective.
2.  **Summarize**  — hand the results to an LLM with a tight prompt: "Return N bullets. One sentence each. Cite each bullet with `[n]` matching the source index. No fluff." The LLM only produces text — it does not call tools, so any Ollama chat model works regardless of its tool-calling maturity.
3.  **Print**  — render bullets + a numbered source list. In `--json` mode, skip rendering and dump the structured object, e.g.:

```json
{
  "topic": "ai agents",
  "since": "24h",
  "bullets": [
    { "text": "Anthropic shipped Opus 4.7…", "source": 1 }
  ],
  "sources": [
    { "n": 1, "url": "https://…", "title": "…" }
  ]
}
```

## Stack

-  **Language:**  TypeScript (Node), single file, `npx`-runnable.
-  **Search:**  Parallel Search MCP. Docs: `https://docs.parallel.ai/integrations/mcp/search-mcp`. No API key required.
-  **LLM:**  Use ollama + gemma4:e4b (already installed).
-  **Config:**  No config required.
-  **Install** : installable as a brief command on PATH (e.g. via npm link)

## Non-goals

- No caching, no database, no daemon. Run it, read it, close it.
- No scheduling or delivery (cron + `brief ... | mail` is the user's job).
- No multi-topic dashboards. One topic per invocation keeps the code tiny.

## Tips
-  **Parallel Search MCP**  Use Parallel Search MCP yourself to find the latest documentation for any packages. Use it to look up anything you have a question on.
-  **No tool-calling from the LLM**  The CLI code orchestrates: it calls the MCP, then passes results as plain text to the LLM for summarization. The LLM never calls tools, so Ollama's tool-call parsing quirks are irrelevant here.
-  **Test**  You have all that you need to do a full end-to-end test on your own. Do this before marking as complete. After fixing any bugs, test again until you have determined `brief` is working well. ```  # `brief` — a terminal news briefing CLI   A tiny CLI that turns a topic into a morning-coffee briefing in your terminal. You type a topic, it fetches what happened recently, and prints a short summary with sources.   ## Usage   ```bash brief "ai agents" brief "openai" --since 24h brief "rust web frameworks" --bullets 5 ```   Output (stdout, plain text with minimal ANSI):   ``` 🗞  ai agents — last 24h   • Anthropic shipped Opus 4.7 with 1M-token context…  [1] • LangChain released v1.0 with a rewritten runtime…  [2] • Researchers at CMU published a paper on…           [3]   Sources [1] https://… [2] https://… [3] https://… ```   ## Flags   | Flag | Default | Purpose | | --- | --- | --- | | `--since <duration>` | `24h` | Recency window (`6h`, `24h`, `7d`) | | `--bullets <n>` | `5` | Number of bullets | | `--json` | off | Emit structured JSON instead of prose |   ## How it works   Three steps, one file:   1. **Search** — use `@modelcontextprotocol/sdk` with `StreamableHTTPClientTransport` to connect to `https://search.parallel.ai/mcp`, then `client.callTool({ name: "web_search", arguments: { ... } })`. Do **not** hand-roll JSON-RPC over `fetch` — the Streamable HTTP transport has an initialize handshake, session headers, and SSE framing that the SDK handles. When developing, run await client.listTools() once and log the web_search input schema before the first callTool — don't guess argument names; also log the results so you know the shape of the response. Pass `--since` in the search objective. 2. **Summarize** — hand the results to an LLM with a tight prompt: "Return N bullets. One sentence each. Cite each bullet with `[n]` matching the source index. No fluff." The LLM only produces text — it does not call tools, so any Ollama chat model works regardless of its tool-calling maturity. 3. **Print** — render bullets + a numbered source list. In `--json` mode, skip rendering and dump the structured object, e.g.:   ```json { "topic": "ai agents", "since": "24h", "bullets": [ { "text": "Anthropic shipped Opus 4.7…", "source": 1 } ], "sources": [ { "n": 1, "url": "https://…", "title": "…" } ] } ```   ## Stack   - **Language:** TypeScript (Node), single file, `npx`-runnable. - **Search:** Parallel Search MCP. Docs: `https://docs.parallel.ai/integrations/mcp/search-mcp`. No API key required. - **LLM:** Use ollama + gemma4:e4b (already installed). - **Config:** No config required. - **Install**: installable as a brief command on PATH (e.g. via npm link)   ## Non-goals   - No caching, no database, no daemon. Run it, read it, close it. - No scheduling or delivery (cron + `brief ... | mail` is the user's job). - No multi-topic dashboards. One topic per invocation keeps the code tiny.   ## Tips - **Parallel Search MCP** Use Parallel Search MCP yourself to find the latest documentation for any packages. Use it to look up anything you have a question on. - **No tool-calling from the LLM** The CLI code orchestrates: it calls the MCP, then passes results as plain text to the LLM for summarization. The LLM never calls tools, so Ollama's tool-call parsing quirks are irrelevant here. - **Test** You have all that you need to do a full end-to-end test on your own. Do this before marking as complete. After fixing any bugs, test again until you have determined `brief` is working well. ```
```

## \## Where the rough edges were

There were a few issues I ran into when doing this setup.

1. **\*\* Errors from Ollama’s tool-call parser. \*\*** I ran into several issues where Pi stopped making progress. Looking at the ``` ollama ``` logs, I found there was a parsing error when trying to read a file. Politely asking Pi to continue resolved the issue.
2. **\*\* Infinite Thinking loops. \*\*** Late in a session, after a lot of back-and-forth and a few file reads, the model's thinking stream would occasionally collapse into spamming the same token. Starting a fresh session fixed it every time.
3. **\*\* Some sessions weren’t productive \*\*** . \*\*\*\*The model sometimes went down the wrong path and got stuck. Updating the spec with specific packages we found using Parallel Search helped. Restarting from scratch with the updated spec worked.
4. **\*\* Models biased not to look up information. \*\*** I needed to add some extra prompts to use the search MCP to look up package information and/or documentation to ensure the code followed best practices and used the latest packages.

## \## Takeaways

* \- **\*\* Pi is a good fit when you want a minimal harness. \*\*** Four tools, extensions for everything else, and a documented event system.
* \- **\*\* The Parallel Search MCP is a genuinely nice shape for this. \*\*** Free, no auth, two tools, clean interface, and the results are already concise enough for local-model context windows. Drop in for any MCP-aware client. This is a great way to make smaller models smarter by providing updated context from the web.
* \- **\*\* The whole stack is $0. \*\*** Local inference on hardware you already own, a free and open-source agent harness, and a free search endpoint. For solo projects, prototyping, or any workflow where you don't want a metered API hanging over every keystroke, this is hard to beat.

By Matt Harris

April 24, 2026
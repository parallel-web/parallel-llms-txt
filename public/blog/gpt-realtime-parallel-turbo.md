# Building a realtime voice agent with GPT-Realtime-2.1 and Parallel Search Turbo

A concise tutorial for building a realtime voice agent that uses GPT-Realtime-2.1 for conversation and Parallel Search Turbo when a question needs current web context.

Voice agents are most useful when they can answer questions about what is happening now. The hard part is adding web search without turning every turn into a slow, opaque research job.

This demo uses GPT-Realtime-2.1 for conversation and Parallel Search Turbo for current web context. The model decides whether a turn needs research. If it does, the app runs one Turbo search, shows the returned sources, and asks Realtime to answer from that evidence. Greetings and clarification questions can skip search entirely.

Try asking about tomorrow’s weather, the latest box office results, or planning a summer trip.

### GPT-Realtime-2.1 voice research demo

Interactive GPT-Realtime-2.1 voice research demo. In non-interactive or machine-readable contexts, try it at https://turbo-voice-research.vercel.app/embed.

[Open interactive demo](https://turbo-voice-research.vercel.app/embed)

## How the handoff works

Realtime handles the conversation, Turbo searches the web, and the app controls the handoff between them.

1. The user speaks. Semantic voice activity detection decides when the turn is complete.
2. Realtime makes a routing decision: search the web, respond directly, or wait for clearer input.
3. For a substantive factual question, `search_web` creates a self-contained question and a few targeted search queries. The server sends one request to Parallel Search Turbo.
4. The app shows the returned sources and passes what Turbo found back into the same Realtime session.
5. The app turns tools off and requests one short audio answer grounded in that evidence.

The two-pass design keeps the first decision silent, prevents the model from speaking before research finishes, and avoids unnecessary searches for conversational turns.

Reference docs:

- [OpenAI Realtime and audio](https://developers.openai.com/api/docs/guides/realtime)
- [OpenAI Realtime with WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc)
- [GPT-Realtime-2.1](https://developers.openai.com/api/docs/models/gpt-realtime-2.1)
- [Parallel Search API](https://docs.parallel.ai/api-reference/search/search)

## 1. Create a short-lived Realtime session

Create the Realtime client secret on your server. The standard OpenAI API key should never reach the browser.

```typescript
export async function POST(request: Request) {
  const response = await fetch(
    "https://api.openai.com/v1/realtime/client_secrets",
    {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": hashUser(request),
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-realtime-2.1",
          instructions:
            "Wait for the client session configuration before responding.",
          reasoning: { effort: "low" },
          tools: [],
          tool_choice: "auto",
          audio: {
            input: {
              noise_reduction: { type: "far_field" },
              transcription: {
                language: "en",
                model: "gpt-realtime-whisper",
              },
              turn_detection: {
                type: "semantic_vad",
                eagerness: "medium",
                interrupt_response: true,
                create_response: true,
              },
            },
            output: { voice: "marin" },
          },
        },
      }),
    },
  );

  const data = await response.json();
  return Response.json({ value: data.value }, { status: response.status });
}
```

The browser gives the agent and tool config after it receives this credential. The first automatic response is configured as a required, text-only routing pass, so Realtime can choose what to do without speaking too early.

## 2. Connect with WebRTC

In the browser, request microphone access, create the Agents SDK WebRTC transport, and connect with the short-lived token.

```typescript
import {
  OpenAIRealtimeWebRTC,
  RealtimeAgent,
  RealtimeSession,
} from "@openai/agents/realtime";

async function connectRealtime() {
  const media = await navigator.mediaDevices.getUserMedia({ audio: true });
  const token = await fetch("/api/realtime-token", { method: "POST" })
    .then((response) => response.json());

  const audio = document.createElement("audio");
  audio.autoplay = true;

  const transport = new OpenAIRealtimeWebRTC({
    mediaStream: media,
    audioElement: audio,
  });

  const agent = new RealtimeAgent({
    name: "Parallel voice assistant",
    instructions: voiceAgentInstructions(),
    tools: [searchWebTool, respondDirectlyTool, waitForUserTool],
  });

  const session = new RealtimeSession(agent, {
    model: "gpt-realtime-2.1",
    transport,
    config: {
      toolChoice: "required",
      parallelToolCalls: false,
      outputModalities: ["text"],
      reasoning: { effort: "low" },
    },
  });

  await session.connect({
    apiKey: token.value,
    model: "gpt-realtime-2.1",
  });

  return session;
}
```

Only `search_web` starts web research. The other routes handle simple conversational responses or ignore audio that was not directed at the assistant.

## 3. Search with Parallel Turbo

The search route turns the user’s request into a self-contained question and one to three searches. The server includes the resolved question in the final query list, adds the current date and time zone to the objective, and calls the Search API in turbo mode.

```typescript
async function searchParallelTurbo(
  question: string,
  generatedQueries: string[],
) {
  const searchQueries = unique([
    question,
    ...generatedQueries,
  ]).slice(0, 3);

  const response = await fetch("https://api.parallel.ai/v1/search", {
    method: "POST",
    signal: AbortSignal.timeout(8_000),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.PARALLEL_API_KEY!,
    },
    body: JSON.stringify({
      objective: buildSearchObjective(question),
      search_queries: searchQueries,
      mode: "turbo",
      max_chars_total: 10_000,
      advanced_settings: {
        max_results: 20,
        excerpt_settings: { max_chars_per_result: 1_000 },
      },
    }),
  });

  if (!response.ok) throw new Error("Parallel Search failed.");
  return response.json();
}
```

The demo retrieves broadly, then passes a smaller, bounded evidence packet to Realtime. That gives the model enough context to answer without stuffing the full search response into the latency-sensitive audio turn.

Conversation history helps create better follow-ups. If someone asks about San Francisco weather and then says “what about tomorrow?”, Realtime carries the location forward and resolves the date before searching.

## 4. Speak the grounded answer

When the search tool finishes, the app explicitly requests an audio response with tools disabled. The immediately preceding Turbo result is the evidence for factual claims in that answer.

```typescript
session.on(
  "agent_tool_end",
  (_context, _agent, toolDefinition) => {
    if (toolDefinition.name !== "search_web") return;

    session.transport.requestResponse({
      tools: [],
      tool_choice: "none",
      output_modalities: ["audio"],
      max_output_tokens: 800,
      reasoning: { effort: "low" },
      instructions: [
        "Answer directly from the preceding Parallel Search output.",
        "Use one or two complete spoken sentences under 60 words.",
        "Do not mention tools, snippets, JSON, citations, or URLs.",
        "Start with the answer.",
      ].join("\n"),
    });
  },
);
```

The sources appear in the UI as soon as search completes. Realtime then speaks the answer; the demo does not render a separate written answer transcript.

## Latency notes

We don’t label the whole voice interaction as search latency. The full turn also includes voice activity detection, routing, answer generation, and audio playback.

- **Search latency: **research request → Parallel response
- **Voice latency: **speech stopped → first audio

The app records more detailed timings for debugging, but keeping these two numbers separate is enough to explain where users are waiting.

## When to use this stack

This tech works well when a voice experience benefits from fast, sourced web context: current events, explainers, weather, travel planning, product research, and conversational follow-ups.

Turbo is a fast grounding step, not a full research pipeline. Use a specialized feed for authoritative live prices or scores, and a deeper research mode when the question needs broad retrieval or multi-hop reasoning.

## Before you ship

- Keep OpenAI and Parallel API keys on the server.
- Use short-lived Realtime client secrets in the browser.
- Resolve follow-up references and relative dates before search.
- Measure search latency separately from time to first audio.

The pattern is simple: Realtime decides how to handle the turn, Turbo grounds factual answers in current web sources, and the app controls the boundary between search and speech.

# Introducing the TypeScript SDK

The Parallel TypeScript SDK is generally available - bringing strongly typed interfaces to all Parallel APIs.

Starting today, the Parallel TypeScript SDK is generally available - bringing strongly typed interfaces to all Parallel APIs.

The TypeScript SDK provides a unified interface for the Task API and Search API with full type safety, built-in error handling, and support for modern JavaScript runtimes including Node.js, Deno, and browser-based environments.

## **Seamless integration with the TypeScript SDK**

The SDK simplifies integration while maintaining the full power of Parallel's web research infrastructure.

Key features include:

- Complete type definitions for all API requests and responses
- Support for all processors from Lite through Ultra8x
- Built-in retries, timeouts, and error handling
- Custom fetch client support for advanced authentication
- Compatibility with both server-side and client-side projects

```typescript
import Parallel from 'parallel-web';
const client = new Parallel({
  apiKey: process.env.PARALLEL_API_KEY,
});
const run = await client.taskRun.create({
  input: "Summarize the latest developments in quantum computing",
  processor: "lite",
});

```

## **Start Building**

Install the TypeScript SDK:

```typescript
npm install parallel-web
```

Full documentation for the TypeScript SDK is available [here](https://www.npmjs.com/package/parallel-web). The SDK is open source - contributions, feedback, and issue reports are welcome via [GitHub](https://github.com/parallel-web/parallel-sdk-typescript).

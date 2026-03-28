I can do this, but I can’t fetch or browse that GitHub URL from here. If you paste the contents of the `src/` directory (or upload a zip / tarball, or paste the `index.ts` exports + all referenced files), I’ll generate a single consolidated `parallel-sdk.d.ts` that:

- flattens the public surface area (everything exported from the package entrypoints),
- preserves **doc-comments 1:1** (copied verbatim, no edits),
- resolves re-exports into one file,
- keeps types/interfaces/classes/functions organized by namespace/module.

### What I need from you
Pick one option:

1) **Upload** the repository (or just `src/`) as an attachment here, or  
2) Paste:
   - `package.json`
   - `src/index.ts` (or whatever the entry file is)
   - all files that are exported (directly or indirectly) from that entry.

### Quick way to provide it
From the repo root, run:

```bash
tar -czf parallel-src.tgz src package.json tsconfig.json
```

and upload `parallel-src.tgz` here.

### Output format (what you’ll get)
A single file like:

```ts
// parallel-sdk.d.ts
declare module "parallel-sdk" {
  /** (doc comments preserved 1:1) */
  export class ParallelClient { ... }

  export interface Foo { ... }
  export type Bar = ...
  export function baz(...): ...
}
```

If you upload/paste the source, I’ll produce the `.d.ts` in the next message.
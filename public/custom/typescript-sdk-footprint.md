I can do this, but I can’t directly fetch the contents of that GitHub URL from here. If you paste (or upload) the `src` directory contents (or a zip), I’ll generate a single consolidated `index.d.ts` that preserves **all doc-comments 1:1**.

In the meantime, here’s the exact way to do it quickly on your side, plus the format I’ll output.

## Option A (fastest): paste a tar/zip
From the repo root:

```bash
git clone https://github.com/parallel-web/parallel-sdk-typescript.git
cd parallel-sdk-typescript
tar -czf src.tgz src
```

Upload `src.tgz` here.

## Option B: paste files as text
Paste the contents of all `src/**/*.ts` (and any existing `*.d.ts`) files.

## Option C: I generate via a local script you run
If you prefer, run this and paste me the generated `parallel-sdk.d.ts`:

### 1) Install
```bash
cd parallel-sdk-typescript
npm i
npm i -D typescript
```

### 2) Create `tsconfig.types.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationMap": false,
    "stripInternal": false,
    "outFile": "parallel-sdk.d.ts",
    "baseUrl": ".",
    "rootDir": "src",
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### 3) Emit a single `.d.ts`
```bash
npx tsc -p tsconfig.types.json
```

Then paste `parallel-sdk.d.ts` here and I’ll:
- ensure it’s a **single-file footprint**
- **keep doc comments exactly as emitted / available**
- optionally **flatten/re-export** symbols so an LLM sees a clean API surface

---

## What I will deliver (once I have the source)
A single file, e.g. `parallel-sdk.d.ts`, that:
- includes all exported types/classes/functions/interfaces from `src`
- preserves doc comments **verbatim**
- resolves barrel exports (`index.ts`) so the surface area is easy to read
- avoids implementation details (types only)

---

### Quick questions (so I match your intent)
1) Do you want the footprint to reflect **public exports only** (what consumers can import), or **everything in `src`** even if not exported?
2) Should I include `node_modules`/dependency types? (Usually: no.)

Send the `src` archive or file contents and I’ll produce the consolidated `.d.ts`.
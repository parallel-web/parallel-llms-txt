I can do this, but I can’t directly fetch that GitHub URL from here. If you paste the contents of `src/` (or upload a zip / the key `.ts` files), I’ll generate a single consolidated `parallel-sdk.d.ts` that preserves doc-comments 1:1.

Meanwhile, here’s the exact approach and a ready-to-run script you can use locally to produce a **single rolled-up `.d.ts`** from that repo; then you can paste the generated output back here and I’ll verify/clean it for “LLM-readability” (while still keeping doc comments unchanged).

---

## Option A (recommended): Generate a single `.d.ts` locally via API Extractor

### 1) Install tooling
From the repo root:

```bash
npm i -D typescript @microsoft/api-extractor
```

### 2) Create `tsconfig.build.json`
(Adjust paths if the package already has a build config.)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationMap": false,
    "stripInternal": false,
    "outDir": "./temp-types",
    "rootDir": "./src",
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

### 3) Create `api-extractor.json`
This will roll everything into one `.d.ts`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "projectFolder": ".",
  "mainEntryPointFilePath": "<projectFolder>/temp-types/index.d.ts",
  "bundledPackages": [],
  "compiler": {
    "tsconfigFilePath": "<projectFolder>/tsconfig.build.json"
  },
  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "<projectFolder>/parallel-sdk.d.ts"
  },
  "apiReport": {
    "enabled": false
  },
  "docModel": {
    "enabled": false
  },
  "messages": {
    "compilerMessageReporting": {
      "default": { "logLevel": "none" }
    },
    "extractorMessageReporting": {
      "default": { "logLevel": "none" }
    }
  }
}
```

### 4) Ensure you have an entrypoint
API Extractor needs `temp-types/index.d.ts`. That usually comes from `src/index.ts`. If your entry is different, set it accordingly. If there’s no `src/index.ts`, create one that re-exports the public API (only if appropriate).

### 5) Build declarations + roll up
```bash
npx tsc -p tsconfig.build.json
npx api-extractor run --local
```

This writes:
- `parallel-sdk.d.ts` (single-file footprint)

### 6) Paste `parallel-sdk.d.ts` here
Then I can:
- ensure it’s a good “LLM-readable surface area”
- optionally re-order sections (without altering doc comments)
- remove private/internal types if you want (only if they aren’t needed for comprehension)

---

## Option B: If you want me to do it purely in-chat
Paste either:
1) the entire `src/` directory contents, **or**
2) at minimum: `src/index.ts` plus every referenced module (anything exported), plus any `types.ts` / `client.ts` / `resources/*` etc.

Once you paste them, I will:
- follow exports transitively
- produce one `declare module "parallel-sdk"` (or the package name you specify)
- preserve **all JSDoc blocks 1:1**
- include function/class/type signatures, namespaces, enums, and interface docs

---

## Two quick questions (so the final `.d.ts` matches what you want)
1) What is the **package name / import path** you want the module declared as? (e.g. `"parallel-sdk"` vs `"@parallel-web/sdk"` etc.)
2) Do you want the `.d.ts` to include **all internal/exported symbols**, or only the “public” entrypoint exports?

Send either the generated `parallel-sdk.d.ts` from Option A or paste the `src/` files, and I’ll produce the final single-file `.d.ts`.
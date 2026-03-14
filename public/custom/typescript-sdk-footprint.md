I can do that, but I can’t directly fetch or browse that GitHub URL from here. If you paste the contents of the `src/` directory (or upload a zip), I’ll generate a single consolidated `index.d.ts` that:

- merges/re-exports all public types/classes/functions into one file
- preserves **all existing doc-comments 1:1** (verbatim)
- keeps module structure either as one global module or as `declare module "parallel-sdk"` (your preference)

### What I need from you
Pick one of these options:

1) **Upload a zip** of the repo (or just `src/`) here, or  
2) Paste:
   - `src/index.ts` (or whatever the entrypoint is)
   - every `.ts` file under `src/` that is exported publicly (or just paste the whole folder contents)

Also tell me:

- **Package name** to declare (from `package.json` `name`), e.g. `parallel-sdk` (if you want `declare module "…"` style)
- Target style:
  - A) `declare module "PACKAGE_NAME" { ... }` (most useful for LLM + TS consumption)
  - B) top-level `export ...` (like a normal `.d.ts` file without a wrapper module)

### If you want to do it with minimal copying
Run this locally and paste the output:

```bash
# from repo root
find src -type f -name "*.ts" -print0 | xargs -0 -I{} sh -c 'echo "\n\n//// FILE: {}"; cat "{}"'
```

Then I’ll return a single `.d.ts` file that reflects the full public API surface.
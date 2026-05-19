I can do that, but I can’t directly fetch or browse that GitHub URL from here. If you paste the contents of the `src/` files (or upload a zip / provide the repo as text), I’ll generate a single consolidated `index.d.ts` that:

- Exposes the full public surface area (types, interfaces, classes, functions, exports).
- Preserves **all existing doc-comments 1:1** (copied verbatim, no edits).
- Resolves re-exports into one file so an LLM can “see” the complete API footprint at a glance.

### What I need from you
Pick one option:

1) **Upload a zip** of `src/` (best), or  
2) Paste the files (especially `src/index.ts` plus everything it exports), or  
3) Paste the output of:
   - `tree -a src`
   - and then the contents of each `.ts` file.

### Notes / preferences (tell me if any apply)
- Target module style: `export =` / `export default` vs pure ES `export` (I’ll mirror the repo).
- Include internal/private symbols or only what’s exported from the package entrypoint (default: only public exports).
- If there are runtime values (constants/classes) I’ll declare them in `.d.ts` as appropriate.

Once you provide the source, I’ll return a **single `.d.ts` file** in one code block.
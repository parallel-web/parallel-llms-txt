import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { processLLMTextConfig } from 'extract-from-sitemap';

test('generated SDK index links point to the deployed mirror, while extraction uses original sources', async t => {
  const config = JSON.parse(await readFile(new URL('../llmtext.json', import.meta.url), 'utf8'));
  const source = config.sources.find(source => source.type === 'custom');
  const requested = [];
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    const url = JSON.parse(options.body).urls[0];
    requested.push(url);
    return new Response(JSON.stringify({ results: [{ url, full_content: 'SDK fixture content' }] }), { status: 200 });
  });
  const result = await processLLMTextConfig({ ...config, sources: [source] }, 'fixture-key');
  assert.deepEqual(requested.sort(), source.customUrls.map(page => page.url).sort());
  const links = [...result.files[`${config.outDir}/llms.txt`].content.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(match => match[1]);
  assert.deepEqual(links.sort(), source.customUrls.map(page => `https://llm.parallel.ai/custom/${page.filename}.md`).sort());
  for (const link of links) {
    assert.ok(result.files[`${config.outDir}${new URL(link).pathname}`]?.content);
  }
});

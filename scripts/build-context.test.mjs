import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { writeSnapshot } from './build-context.mjs';

const config = { outDir: './public', sources: [{ title: 'Docs' }] };
const fixture = () => ({
  stats: { totalErrors: 0 },
  sources: [{ title: 'Docs', files: { 'current.md': { content: 'Current docs' } } }],
  files: {
    './public/llms.txt': { content: '# Current index' },
    './public/docs/current.md': { content: 'Current docs' },
  },
});

async function checkout(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'context-fixture-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'public'));
  await writeFile(path.join(root, 'public/obsolete.md'), 'Old snapshot');
  await writeFile(path.join(root, 'public/_redirects'), '/ /llms.txt 302');
  return root;
}

test('successful snapshot removes obsolete files and writes fresh nested content', async t => {
  const root = await checkout(t);
  await writeSnapshot(config, fixture(), root);
  assert.deepEqual((await readdir(path.join(root, 'public'))).sort(), ['_redirects', 'docs', 'llms.txt']);
  assert.equal(await readFile(path.join(root, 'public/docs/current.md'), 'utf8'), 'Current docs');
  assert.equal(await readFile(path.join(root, 'public/_redirects'), 'utf8'), '/ /llms.txt 302');
  assert.deepEqual(await readdir(root), ['public']);
});

for (const [name, change] of [
  ['aggregate errors', r => { r.stats.totalErrors = 1; }],
  ['file error despite zero aggregate errors', r => { r.sources[0].files['current.md'].error = 'fetch failed'; }],
  ['missing source', r => { r.sources = []; }],
  ['empty source', r => { r.sources[0].files = {}; }],
  ['empty content', r => { r.files['./public/docs/current.md'].content = ''; }],
  ['missing index', r => { delete r.files['./public/llms.txt']; }],
  ['generated routing overwrite', r => { r.files['./public/_redirects'] = { content: '/ /wrong 302' }; }],
  ['outside output path', r => { r.files['./README.md'] = { content: 'escape' }; }],
]) {
  test(`${name} fails and preserves the existing corpus`, async t => {
    const root = await checkout(t);
    const result = fixture();
    change(result);
    await assert.rejects(writeSnapshot(config, result, root));
    assert.deepEqual((await readdir(path.join(root, 'public'))).sort(), ['_redirects', 'obsolete.md']);
    assert.equal(await readFile(path.join(root, 'public/obsolete.md'), 'utf8'), 'Old snapshot');
  });
}

test('staging write failure preserves existing corpus', async t => {
  const root = await checkout(t);
  const result = fixture();
  result.files['./public/docs'] = { content: 'Conflicts with nested directory' };
  await assert.rejects(writeSnapshot(config, result, root));
  assert.equal(await readFile(path.join(root, 'public/obsolete.md'), 'utf8'), 'Old snapshot');
});

test('real extractor result with mocked network: success accepted, source failure rejected', async t => {
  const { processLLMTextConfig } = await import('extract-from-sitemap');
  const root = await checkout(t);
  const customConfig = { outDir: './public', title: 'Fixture', origin: 'https://example.com', sources: [
    { type: 'custom', title: 'Custom', outDir: './public/custom', customUrls: [
      { filename: 'current', url: 'https://example.com/current', title: 'Current' },
    ] },
  ] };
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ results: [
    { url: 'https://example.com/current', full_content: 'Fresh fixture content' },
  ] }), { status: 200 }));
  await writeSnapshot(customConfig, await processLLMTextConfig(customConfig, 'fixture-key'), root);
  assert.equal(await readFile(path.join(root, 'public/custom/current.md'), 'utf8'), 'Fresh fixture content');
  t.mock.method(globalThis, 'fetch', async () => new Response('Unavailable', { status: 503 }));
  const failed = await processLLMTextConfig(customConfig, 'fixture-key');
  await assert.rejects(writeSnapshot(customConfig, failed, root));
  assert.equal(await readFile(path.join(root, 'public/custom/current.md'), 'utf8'), 'Fresh fixture content');
});

test('missing maintained routing file fails without replacing existing content', async t => {
  const root = await checkout(t);
  await rm(path.join(root, 'public/_redirects'));
  await assert.rejects(writeSnapshot(config, fixture(), root), { code: 'ENOENT' });
  assert.equal(await readFile(path.join(root, 'public/obsolete.md'), 'utf8'), 'Old snapshot');
});

test('reported custom URL failure cannot disappear from a partially successful source', async t => {
  const { processLLMTextConfig } = await import('extract-from-sitemap');
  const root = await checkout(t);
  const customConfig = { ...config, title: 'Fixture', sources: [
    { type: 'custom', title: 'SDKs', outDir: './public/custom', customUrls: [
      { filename: 'first', url: 'https://example.com/first', title: 'First' },
      { filename: 'second', url: 'https://example.com/second', title: 'Second' },
    ] },
  ] };
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    const url = JSON.parse(options.body).urls[0];
    return new Response(JSON.stringify(url.endsWith('/first')
      ? { results: [{ url, full_content: 'Fresh first page' }], errors: [] }
      : { results: [], errors: [{ url, message: 'Extraction failed' }] }), { status: 200 });
  });
  const result = await processLLMTextConfig(customConfig, 'fixture-key');
  assert.equal(result.stats.totalErrors, 0);
  assert.equal(Object.keys(result.sources[0].files).length, 1);
  await assert.rejects(writeSnapshot(customConfig, result, root), /Missing custom output/);
  assert.equal(await readFile(path.join(root, 'public/obsolete.md'), 'utf8'), 'Old snapshot');
});

import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Validate the extractor's structured result, not its CLI exit code. Some
// failures are recorded per source/file even when the CLI exits successfully.
export async function writeSnapshot(config, result, root = process.cwd()) {
  if (config.outDir !== './public') throw new Error('Expected output directory ./public');
  if (result.stats?.totalErrors !== 0) throw new Error('Extraction reported errors');
  if (!result.sources?.length || result.sources.length !== config.sources.length) {
    throw new Error('Missing configured sources');
  }
  for (const [index, source] of result.sources.entries()) {
    // The extractor can omit custom URLs when a 200 response contains only
    // errors. These URLs are explicitly configured, so require every output.
    const configuredSource = config.sources[index];
    if (configuredSource.type === 'custom') {
      for (const { filename } of configuredSource.customUrls ?? []) {
        if (!Object.hasOwn(source.files, `${filename}.md`)) {
          throw new Error(`Missing custom output: ${filename}`);
        }
      }
    }
    const files = Object.values(source.files);
    if (!files.length || files.some(file => file.error || !file.content?.trim())) {
      throw new Error(`Incomplete source: ${source.title}`);
    }
  }
  const publicDir = path.join(root, 'public');
  const files = Object.entries(result.files).map(([filename, file]) => {
    const relative = path.relative(publicDir, path.resolve(root, filename));
    if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new Error(`Output outside public/: ${filename}`);
    }
    if (file.error || typeof file.content !== 'string' || !file.content.trim()) {
      throw new Error(`Incomplete output: ${filename}`);
    }
    return [relative, file.content];
  });
  if (!files.some(([name]) => name === 'llms.txt')) throw new Error('Missing llms.txt');

  // This routing file is maintained in Git, not emitted by the extractor.
  // Preserve only this explicit asset; never carry over old generated pages.
  if (files.some(([name]) => name === '_redirects')) {
    throw new Error('Generated output must not overwrite maintained _redirects');
  }
  files.push(['_redirects', await readFile(path.join(publicDir, '_redirects'))]);

  // Write a fresh tree before replacing the old one. Pages absent from the
  // successful rebuild disappear, and validation/write failures preserve it.
  const staging = await mkdtemp(path.join(root, '.context-build-'));
  const snapshot = path.join(staging, 'snapshot');
  const previous = path.join(staging, 'previous');
  await mkdir(snapshot);
  let hadPrevious = false;
  try {
    for (const [filename, content] of files) {
      const destination = path.join(snapshot, filename);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, content, { flag: 'wx' });
    }
    try {
      await rename(publicDir, previous);
      hadPrevious = true;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    try {
      await rename(snapshot, publicDir);
    } catch (error) {
      if (hadPrevious) await rename(previous, publicDir);
      throw error;
    }
  } catch (error) {
    // Leave staging available for recovery if the filesystem failed mid-swap.
    throw new Error(`Snapshot not published; inspect ${staging}`, { cause: error });
  }
  await rm(staging, { recursive: true, force: true });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.env.PARALLEL_API_KEY) throw new Error('PARALLEL_API_KEY is required');
  const config = JSON.parse(await readFile('llmtext.json', 'utf8'));
  const { processLLMTextConfig } = await import('extract-from-sitemap');
  const result = await processLLMTextConfig(config, process.env.PARALLEL_API_KEY);
  await writeSnapshot(config, result);
  console.log(`Validated snapshot: ${Object.keys(result.files).length} files`);
}

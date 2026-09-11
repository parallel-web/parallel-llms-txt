import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./publish-context.sh', import.meta.url));
function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'publish-fixture-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo');
  const remote = path.join(root, 'remote.git');
  mkdirSync(repo);
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '--bare', remote);
  git('init', '-b', 'main');
  git('config', 'user.name', 'Fixture');
  git('config', 'user.email', 'fixture@example.com');
  git('config', 'commit.gpgsign', 'false');
  git('remote', 'add', 'origin', remote);
  const write = (name, content) => writeFileSync(path.join(repo, name), content);
  mkdirSync(path.join(repo, 'public'));
  write('public/llms.txt', 'Old index');
  write('public/removed.md', 'Old page');
  write('public/_redirects', '/ /llms.txt 302');
  write('README.md', 'Maintained');
  git('add', '.');
  git('commit', '-m', 'Baseline');
  git('push', 'origin', 'main');
  const base = git('rev-parse', 'HEAD');
  const publish = () => spawnSync('bash', [script], { cwd: repo, encoding: 'utf8' });
  const published = () => git('--git-dir=' + remote, 'rev-parse', 'main');
  return { repo, git, write, base, publish, published };
}

test('unchanged output creates no commit', t => {
  const f = fixture(t);
  assert.equal(f.publish().status, 0);
  assert.equal(f.git('rev-parse', 'HEAD'), f.base);
  assert.equal(f.published(), f.base);
});

test('publishes document additions, updates and removals with linear history', t => {
  const f = fixture(t);
  f.write('public/llms.txt', 'Fresh index');
  f.write('public/new.md', 'Fresh page');
  rmSync(path.join(f.repo, 'public/removed.md'));
  f.write('README.md', 'Unrelated work');
  assert.equal(f.publish().status, 0);
  assert.equal(f.published(), f.git('rev-parse', 'HEAD'));
  assert.equal(f.git('rev-parse', 'HEAD^'), f.base);
  assert.deepEqual(f.git('diff', '--name-only', f.base, 'HEAD').split('\n'), ['public/llms.txt', 'public/new.md', 'public/removed.md']);
  assert.equal(f.git('status', '--short'), 'M README.md');
  assert.equal(readFileSync(path.join(f.repo, 'public/_redirects'), 'utf8'), '/ /llms.txt 302');
});

for (const filename of ['public/_redirects', 'public/code.js']) {
  test(`refuses maintained or non-document output: ${filename}`, t => {
    const f = fixture(t);
    f.write(filename, 'Unexpected output');
    assert.notEqual(f.publish().status, 0);
    assert.equal(f.published(), f.base);
    assert.equal(f.git('rev-parse', 'HEAD'), f.base);
  });
}

test('refuses unrelated staged work', t => {
  const f = fixture(t);
  f.write('README.md', 'Unrelated staged work');
  f.git('add', 'README.md');
  f.write('public/llms.txt', 'Fresh index');
  assert.notEqual(f.publish().status, 0);
  assert.equal(f.published(), f.base);
});

test('refuses publication from a feature branch', t => {
  const f = fixture(t);
  f.git('switch', '-c', 'feature');
  f.write('public/llms.txt', 'Fresh index');
  assert.notEqual(f.publish().status, 0);
  assert.equal(f.published(), f.base);
});

test('concurrent main update rejects push without rewriting published history', t => {
  const f = fixture(t);
  f.write('README.md', 'Concurrent change');
  f.git('add', 'README.md');
  f.git('commit', '-m', 'Concurrent main change');
  f.git('push', 'origin', 'main');
  const concurrent = f.published();
  f.git('reset', '--hard', f.base); // This disposable fixture simulates an older checkout.
  f.write('public/llms.txt', 'Fresh index');
  const result = f.publish();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /rejected/);
  assert.equal(f.published(), concurrent);
});

test('unchanged snapshot cannot deploy after main advanced', t => {
  const f = fixture(t);
  f.write('README.md', 'Concurrent change');
  f.git('add', 'README.md');
  f.git('commit', '-m', 'Concurrent main change');
  f.git('push', 'origin', 'main');
  const concurrent = f.published();
  f.git('reset', '--hard', f.base); // Simulate an unchanged build from an older checkout.
  const result = f.publish();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /rejected/);
  assert.equal(f.published(), concurrent);
  assert.equal(f.git('rev-parse', 'HEAD'), f.base);
});

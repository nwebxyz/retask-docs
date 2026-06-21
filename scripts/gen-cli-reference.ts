import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderAll, type Manifest } from './lib/render.ts';

const here = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(here, '..', 'src', 'content', 'docs', 'cli', 'reference');

function getManifest(): Manifest {
  const raw = execFileSync('retask', ['help-llm'], { encoding: 'utf8' });
  return JSON.parse(raw) as Manifest;
}

function main(): void {
  const manifest = getManifest();
  const pages = renderAll(manifest);
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });
  for (const [key, content] of pages) {
    writeFileSync(join(OUT_DIR, `${key}.md`), content, 'utf8');
  }
  console.log(`Generated ${pages.size} CLI reference pages in ${OUT_DIR}`);
}

main();

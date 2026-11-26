// Iceland in Numbers — entry program (Node 22, standard library only).
//
// The site is this directory's app/ folder: plain static files a browser opens
// at app/index.html (hand-written CSS, vanilla ES modules, inline SVG charts,
// data baked into app/data/*.js). Nothing it runs, styles or shows loads over
// the network. The program hands the entry in: it copies app/ and screenshots/
// from beside this file into the output directory and writes
// output/dossier.json — the summary the judge reads (screenshots, first-load
// files and bytes, and the source outline) — using make.fun's own vendored
// library, vendor/makefun-frontend.ts, which must be left exactly as shipped:
// the scorer requires dossier.json to be byte for byte what its own copy of
// that library writes.
//
// Run it outside the grader's container with MAKEFUN_OUTPUT_DIR standing in
// for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse — more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files (app/ counts beside /output's own 1000-entry
// cap, its screenshots/ and dossier.json).
const DOSSIER_OPTIONS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

function countFiles(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    n += statSync(p).isDirectory() ? countFiles(p) : 1;
  }
  return n;
}

mkdirSync(out, { recursive: true });
copyTree(join(here, 'app'), join(out, 'app'));
const shotDir = join(here, 'screenshots');
if (!existsSync(shotDir)) {
  throw new Error('screenshots/ is missing: take the 4 screenshots before running main.ts');
}
copyTree(shotDir, join(out, 'screenshots'));

const appFiles = countFiles(join(out, 'app'));
const shotFiles = existsSync(join(out, 'screenshots')) ? readdirSync(join(out, 'screenshots')).length : 0;
console.log(`Iceland in Numbers: ${appFiles} app files, ${shotFiles} screenshots -> ${out}`);

writeFileSync(join(out, 'dossier.json'), buildDossier(out, DOSSIER_OPTIONS));
console.log('dossier.json written');
// Surface the judge's first-load line so a bad Totals is spotted at once.
const dossierText = JSON.parse(readFileSync(join(out, 'dossier.json'), 'utf8')).text;
const totalsLine = dossierText.split('\n').find((line) => line.startsWith('Totals:'));
if (totalsLine) console.log(totalsLine);

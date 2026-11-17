import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const site = path.join(root, '_site');

for (const file of [
  'index.html', '404.html', '.nojekyll',
  'assets/index-Y7lMokl3.js', 'assets/index-BXcgnZ7x.css',
  'explore/index.html', 'goods/index.html', 'launch/index.html',
  'ledger/index.html', 'earnings/index.html', 'docs/index.html'
]) {
  const target = path.join(site, file);
  if (!fs.existsSync(target) || (file !== '.nojekyll' && fs.statSync(target).size === 0)) {
    throw new Error(`Missing Pages output: ${file}`);
  }
}

const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
const bundle = fs.readFileSync(path.join(site, 'assets/index-Y7lMokl3.js'), 'utf8');
if (!html.includes('/BAWSAQ/assets/index-Y7lMokl3.js')) throw new Error('Homepage asset base was not rewritten');
if (!html.includes('/BAWSAQ/fonts/')) throw new Error('Homepage font base was not rewritten');
if (!bundle.includes('basename:"/BAWSAQ"')) throw new Error('Router basename is missing');
if (bundle.includes('src:"/assets/')) throw new Error('Root-relative bundle assets remain');

console.log('PASS: BAWSAQ Pages bundle, assets, router base, fallback and seven subpages verified.');


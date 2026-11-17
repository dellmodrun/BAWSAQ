import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, 'site');
const output = path.join(root, '_site');
const base = `/${process.env.GITHUB_REPOSITORY?.split('/').at(-1) || 'BAWSAQ'}`;
if (!fs.existsSync(path.join(source, 'index.html'))) throw new Error('site/index.html is missing');
fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(source, output, { recursive: true });
const assetTarget = path.join(output, 'assets');
fs.mkdirSync(assetTarget, { recursive: true });
for (const name of ['bawsaq-logo-transparent-clean.png', 'bawsaq-boot-scene.webp']) {
  fs.copyFileSync(path.join(root, 'mirror', 'assets', 'platform', name), path.join(assetTarget, name));
}
const html = fs.readFileSync(path.join(source, 'index.html'), 'utf8').replaceAll('__BASE__', base);
for (const route of ['', 'goods', 'explore', 'launch', 'ledger', 'earnings', 'docs', 'index-methodology']) {
  const directory = route ? path.join(output, route) : output;
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}
fs.writeFileSync(path.join(output, '404.html'), html);
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`BAWSAQ AI 8 Pages bundle created with base ${base}/`);

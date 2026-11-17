import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, 'mirror');
const output = path.join(root, '_site');
const repository = process.env.GITHUB_REPOSITORY?.split('/').at(-1) || 'BAWSAQ';
const base = `/${repository}`;

if (!fs.existsSync(path.join(source, 'index.html'))) {
  throw new Error('mirror/index.html is missing');
}

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(source, output, { recursive: true });

const textExtensions = new Set(['.html', '.css', '.js', '.json', '.svg']);
let routerPatched = false;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      let contents = fs.readFileSync(target, 'utf8');
      const before = contents;
      contents = contents
        .replaceAll('"/assets/', `"${base}/assets/`)
        .replaceAll("'/assets/", `'${base}/assets/`)
        .replaceAll('`/assets/', `\`${base}/assets/`)
        .replaceAll('"/fonts/', `"${base}/fonts/`)
        .replaceAll("'/fonts/", `'${base}/fonts/`)
        .replaceAll('`/fonts/', `\`${base}/fonts/`);

      if (entry.name === 'index-Y7lMokl3.js' && contents.includes('YO=Fk(P_);')) {
        contents = contents.replace('YO=Fk(P_);', `YO=Fk(P_,{basename:"${base}"});`);
        routerPatched = true;
      }
      if (contents !== before) fs.writeFileSync(target, contents);
    }
  }
}

walk(output);
if (!routerPatched) throw new Error('Unable to configure the BAWSAQ router basename');

fs.copyFileSync(path.join(output, 'index.html'), path.join(output, '404.html'));
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`GitHub Pages bundle created at ${output} with base ${base}/`);


import fs from 'node:fs';
import path from 'node:path';

const textExtensions = new Set(['.html', '.css', '.js', '.json', '.svg']);

export function applyCustomDomain(site, domain) {
  if (!domain) return;
  const origin = `https://${domain}`;
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(target);
        continue;
      }
      if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      const before = fs.readFileSync(target, 'utf8');
      const after = before
        .replaceAll('https://dellmodrun.github.io/BAWSAQ', origin)
        .replaceAll('https://bawsaq.fund', origin)
        .replaceAll('basename:"/BAWSAQ"', 'basename:"/"')
        .replace(/\/BAWSAQ(?=\/|["'`?#])/g, '');
      if (after !== before) fs.writeFileSync(target, after);
    }
  }
  walk(site);
}

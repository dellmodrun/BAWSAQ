import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export function versionAssets(site) {
  const assets = path.join(site, 'assets');
  const filenames = fs.readdirSync(assets).filter(name => name.endsWith('.js') || name.endsWith('.css')).sort();
  const digest = crypto.createHash('sha256');
  for (const name of filenames) digest.update(name).update(fs.readFileSync(path.join(assets, name)));
  const revision = digest.digest('hex').slice(0, 12);

  function visit(directory) {
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) { visit(file); continue; }
      if (!item.name.endsWith('.html') && !item.name.endsWith('.js')) continue;
      let source = fs.readFileSync(file, 'utf8');
      for (const name of filenames) source = source.replaceAll(name, `${name}?v=${revision}`);
      fs.writeFileSync(file, source);
    }
  }
  visit(site);
  return revision;
}

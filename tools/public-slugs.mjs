import fs from 'node:fs';
import path from 'node:path';

export const slugPairs = [
  ['maze-bank', 'chatgta'],
  ['fleeca-bank', 'clawde'],
  ['burger-shot', 'geminight'],
  ['cluckin-bell', 'grockstar'],
  ['up-n-atom', 'deepstreet'],
  ['sprunk', 'la-llama']
];

export function applyPublicSlugs(site) {
  const assets = path.join(site, 'assets');
  for (const name of fs.readdirSync(assets)) {
    if (!name.endsWith('.js')) continue;
    const file = path.join(assets, name);
    let source = fs.readFileSync(file, 'utf8');
    source = source.replaceAll('sprunk:', '"la-llama":');
    for (const [oldSlug, newSlug] of slugPairs) {
      source = source.replaceAll(oldSlug, newSlug);
    }
    if (name === 'index-Y7lMokl3.js') {
      source = source.replaceAll('https://bawsaq.fund', 'https://dellmodrun.github.io/BAWSAQ');
      source = source.replaceAll('leonida:motion-preference', 'bawsaq:motion-preference');
    }
    fs.writeFileSync(file, source);
  }

  for (const route of ['', 'goods', 'explore', 'launch', 'ledger', 'earnings', 'docs']) {
    const file = path.join(site, route, 'index.html');
    if (!fs.existsSync(file)) continue;
    let source = fs.readFileSync(file, 'utf8');
    source = source.replaceAll('https://bawsaq.fund', 'https://dellmodrun.github.io/BAWSAQ');
    source = source.replaceAll('leonida:motion-preference', 'bawsaq:motion-preference');
    source = source.replaceAll('leonida-boot-start', 'bawsaq-boot-start');
    fs.writeFileSync(file, source);
  }
}

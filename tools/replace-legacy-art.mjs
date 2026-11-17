import fs from 'node:fs';
import path from 'node:path';

const replacements = new Map([
  ['exchange-poster-portrait-640.webp','hero-nine-mobile.webp'],
  ['exchange-poster-portrait.webp','hero-nine-mobile.webp'],
  ['exchange-poster-wide-960.webp','hero-nine-wide.webp'],
  ['exchange-poster-wide.webp','hero-nine-wide.webp'],
  ['exchange-poster-960.webp','hero-nine-wide.webp'],
  ['exchange-poster.webp','hero-nine-wide.webp'],
  ['exchange-sunset-800.webp','hero-wide.webp'],
  ['exchange-sunset.webp','hero-wide.webp'],
  ['financial-district-800.webp','district.webp'],
  ['financial-district.webp','district.webp'],
  ['trading-floor-800.webp','market.webp'],
  ['trading-floor.webp','market.webp'],
  ['settlement-desk.webp','activity.webp'],
  ['settlement-desk-800.webp','activity.webp'],
  ['vice-vault-320.webp','vault.webp'],
  ['vice-vault-800.webp','vault.webp'],
  ['vice-vault.webp','vault.webp'],
  ['signal-coast-320.webp','docs.webp'],
  ['signal-coast-800.webp','docs.webp'],
  ['tape-palms.webp','ticker-palms.webp'],
  ['boardwalk-market-320.webp','la-llama-garage.webp'],
  ['boardwalk-market-800.webp','la-llama-garage.webp'],
  ['cluckin-bell-320.webp','grockstar-news.webp'],
  ['cluckin-bell-800.webp','grockstar-news.webp'],
  ['ocean-drive-diner-320.webp','geminight-media.webp'],
  ['ocean-drive-diner-800.webp','geminight-media.webp'],
  ['up-n-atom-320.webp','deepstreet-lab.webp'],
  ['up-n-atom-800.webp','deepstreet-lab.webp'],
  ['ammu-nation-320.webp','deepstreet-lab.webp'],
  ['ammu-nation-800.webp','deepstreet-lab.webp'],
  ['bean-machine-320.webp','chatgta-studio.webp'],
  ['bean-machine-800.webp','chatgta-studio.webp'],
  ['ecola-320.webp','la-llama-garage.webp'],
  ['ecola-800.webp','la-llama-garage.webp'],
  ['motor-mile-320.webp','district.webp'],
  ['motor-mile-800.webp','district.webp'],
  ['pisswasser-320.webp','grockstar-news.webp'],
  ['pisswasser-800.webp','grockstar-news.webp']
]);

export function replaceLegacyArt(site) {
  const textExtensions = new Set(['.html','.js','.css','.json','.svg']);
  const visit = directory => {
    for (const item of fs.readdirSync(directory,{withFileTypes:true})) {
      const file = path.join(directory,item.name);
      if (item.isDirectory()) { visit(file); continue; }
      if (!textExtensions.has(path.extname(item.name))) continue;
      let source = fs.readFileSync(file,'utf8');
      let next = source;
      for (const [oldName,newName] of replacements) next = next.replaceAll(`leonida/${oldName}`,`ai-city/${newName}`);
      next = next.replaceAll('leonida/apple-touch-icon.png','platform/bawsaq-logo-transparent-clean.png')
        .replaceAll('platform/bawsaq-brand-art.png','ai-city/share-nine.jpg')
        .replaceAll('leonida/exchange-share.jpg','ai-city/share-nine.jpg');
      if (next !== source) fs.writeFileSync(file,next);
    }
  };
  visit(site);
}

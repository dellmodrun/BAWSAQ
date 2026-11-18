import fs from 'node:fs';
import path from 'node:path';

const textExtensions = new Set(['.html', '.css', '.js', '.json', '.svg']);

export function applyRebrand(site, domain) {
  const origin = domain ? `https://${domain}` : 'https://dellmodrun.github.io/__site_repo_path__';
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) { visit(target); continue; }
      if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      const source = fs.readFileSync(target, 'utf8');
      let next = (domain ? source : source.replaceAll('/BAWSAQ', '/__site_repo_path__'))
        .replaceAll('bawsaq-logo-transparent-clean.png', 'baiwsaq-logo.png')
        .replaceAll('https://bawsaqai.fund', origin)
        .replaceAll('https://bawsaq.fund', origin)
        .replaceAll('BAWSAQ', 'BAIWSAQ');
      if (entry.name.endsWith('.html')) {
        next = next
          .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${origin}/assets/platform/baiwsaq-logo.png$2`)
          .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${origin}/assets/platform/baiwsaq-logo.png$2`)
          .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, '$1BAIWSAQ logo$2');
      }
      if (!domain) next = next.replaceAll('/__site_repo_path__', '/BAWSAQ');
      if (next !== source) fs.writeFileSync(target, next);
    }
  }
  visit(site);
  fs.rmSync(path.join(site, 'assets', 'platform', 'bawsaq-logo-transparent-clean.png'), { force: true });
  if (domain) fs.writeFileSync(path.join(site, 'CNAME'), `${domain}\n`);
}

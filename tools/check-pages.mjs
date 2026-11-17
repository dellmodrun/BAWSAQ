import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const site = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), '_site');
for (const file of ['index.html','404.html','assets/ai8.css','assets/ai8.js','assets/bawsaq-logo-transparent-clean.png','assets/bawsaq-boot-scene.webp','goods/index.html','explore/index.html','launch/index.html','ledger/index.html','earnings/index.html','docs/index.html','index-methodology/index.html']) {
  const target = path.join(site, file);
  if (!fs.existsSync(target) || fs.statSync(target).size === 0) throw new Error(`Missing Pages file: ${file}`);
}
const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(site, 'assets/ai8.js'), 'utf8');
if (!html.includes('/BAWSAQ/assets/ai8.js') || !html.includes('/BAWSAQ/assets/ai8.css')) throw new Error('Incorrect Pages base');
if (!js.includes('ChatGTA') || !js.includes('Misstral') || !js.includes('Prelaunch')) throw new Error('AI 8 content is incomplete');
if (js.includes('$TKNIZD') || js.includes('Maze Bank') || js.includes('12 fictional')) throw new Error('Legacy stock narrative remains');
console.log('PASS: BAWSAQ AI 8 pages and core assets verified.');

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const site = path.join(root, '_site');

for (const file of [
  'index.html', '404.html', '.nojekyll',
  'assets/index-Y7lMokl3.js', 'assets/index-BXcgnZ7x.css',
  'assets/bawsaq-brand.css',
  'assets/platform/bawsaq-logo-transparent-clean.png',
  'assets/ai-city/hero-wide.webp',
  'assets/ai-city/hero-nine-wide.webp', 'assets/ai-city/hero-nine-mobile.webp',
  'assets/ai-city/share-nine.jpg',
  'assets/ai-city/chatgta-studio.webp', 'assets/ai-city/la-llama-garage.webp',
  'assets/platform/bawsaq-boot-scene.webp',
  'assets/CommodityDetail-B_zrO4xK.js',
  'assets/ai8-sidebar.js', 'assets/ai8-sidebar.css',
  'explore/index.html', 'goods/index.html', 'launch/index.html',
  'ledger/index.html', 'earnings/index.html', 'docs/index.html', 'adminPanel/index.html'
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
if (!bundle.includes('R.jsx(gA,{basename:"/BAWSAQ",children:R.jsx(QO,{})})')) throw new Error('BrowserRouter basename is missing');
if (bundle.includes('YO=Fk(P_,{basename:')) throw new Error('Basename was applied to the route matcher instead of BrowserRouter');
if (!bundle.includes('window.setTimeout(c,550)')) throw new Error('Splash cleanup timeout is missing');
if (bundle.includes('f.finished.then(c,c)')) throw new Error('Splash still waits for an infinite logo animation');
if (!bundle.includes('M8=function(r){return"/BAWSAQ/"+r}')) throw new Error('Dynamic module preload base is missing');
if (bundle.includes('M8=function(r){return"/"+r}')) throw new Error('Dynamic modules still preload from the domain root');
if (bundle.includes('src:"/assets/')) throw new Error('Root-relative bundle assets remain');
if (bundle.includes(', /assets/')) throw new Error('Root-relative responsive image candidates remain');
const css = fs.readFileSync(path.join(site, 'assets/index-BXcgnZ7x.css'), 'utf8');
if (css.includes('url(/assets/')) throw new Error('Root-relative CSS assets remain');
if (css.includes('url(/fonts/')) throw new Error('Root-relative CSS fonts remain');
if (!html.includes('/BAWSAQ/assets/bawsaq-brand.css')) throw new Error('BAWSAQ brand stylesheet is missing');
if (!html.includes('/BAWSAQ/assets/platform/bawsaq-logo-transparent-clean.png')) throw new Error('Transparent BAWSAQ boot logo is missing');
if (!html.includes('/BAWSAQ/assets/platform/bawsaq-boot-scene.webp')) throw new Error('BAWSAQ boot scene preload is missing');
if(fs.existsSync(path.join(site,'assets/leonida'))) throw new Error('Legacy scene assets are still being published');
if (bundle.includes('leonida/exchange-mark.svg')) throw new Error('Legacy BAWSAQ icon references remain');
if (!bundle.includes('platform/bawsaq-logo-transparent-clean.png')) throw new Error('New transparent BAWSAQ logo is not used by the app');
if (!bundle.includes('className:"ai-city-wordmark"')) throw new Error('Homepage project-name wordmark is missing');
if (!bundle.includes('hero-nine-wide.webp') || !bundle.includes('hero-nine-mobile.webp')) throw new Error('Nine-panel homepage art is missing');
if (!html.includes('/assets/ai-city/share-nine.jpg')) throw new Error('Nine-panel share preview is missing');
if (!bundle.includes('Six AI stocks. One Vice City market.')) throw new Error('Project introduction is missing');
if (!bundle.includes('BAWSAQ live price chart')) throw new Error('Future live chart block is missing');
if (!html.includes('class="ai8-sidebar"') || !html.includes('/BAWSAQ/assets/ai8-sidebar.css')) throw new Error('Left navigation is missing');
if (!html.includes('6 AI STOCKS')) throw new Error('BAWSAQ 6 AI STOCKS branding is missing');
for (const slug of ['maze-bank','fleeca-bank','burger-shot','cluckin-bell','up-n-atom','sprunk']) {
  if (!fs.existsSync(path.join(site,'goods',slug,'index.html'))) throw new Error(`Six-stock detail route missing: ${slug}`);
}
for (const name of ['ChatGTA','Clawde','Geminight','Grockstar','DeepStreet','La Llama']) {
  if (!bundle.includes(`"name":${JSON.stringify(name)}`)) throw new Error(`Six-stock company missing: ${name}`);
}
for (const name of ['Qwence','Misstral']) {
  if (bundle.includes(`"name":${JSON.stringify(name)}`)) throw new Error(`Removed company remains: ${name}`);
}
if (bundle.includes('name:"Maze Bank"') || bundle.includes('name:"Fleeca Bank"')) throw new Error('Old company roster remains');
if (!bundle.includes('/assets/stocks/gta-six/chatgta.png') || !bundle.includes('/assets/stocks/gta-six/la-llama.png')) throw new Error('New AI stock logo references missing');
if (!bundle.includes('chatgta-studio.webp') || !bundle.includes('la-llama-garage.webp') || !bundle.includes('/assets/ai-city/')) throw new Error('New AI company scenes are missing');
if (bundle.includes('chatgta-scene.webp') || bundle.includes('la-llama-scene.webp')) throw new Error('Generic AI company scenes remain');
for(const file of ['assets/index-Y7lMokl3.js','assets/index-BXcgnZ7x.css','assets/Coins-CA1CFPin.js','assets/Commodities-BqprS4wm.js','assets/Activity-DZ9x3HFI.js','assets/Launch-C2Z7OZxC.js']) {
  if(fs.readFileSync(path.join(site,file),'utf8').includes('assets/leonida/')) throw new Error(`Legacy scene reference remains in ${file}`);
}
if (!bundle.includes('https://x.com/bawsaqaiindex') || bundle.includes('https://x.com/bawsaqfund')) throw new Error('BAWSAQ X account is outdated');
if (!bundle.includes('children:"$"+A.symbol')) throw new Error('Stock ticker prefix is missing');
const market=fs.readFileSync(path.join(site,'assets/Coins-CA1CFPin.js'),'utf8');
if (!market.includes('OFFICIAL / PINNED') || !market.includes('Six AI stocks. One city.')) throw new Error('Market preview is missing');
const directory=fs.readFileSync(path.join(site,'assets/Commodities-BqprS4wm.js'),'utf8');
if (directory.includes('M2 21h20 M4 18h16') || !directory.includes('M7 7h10v10H7z')) throw new Error('Legacy sector icons remain');
const admin=fs.readFileSync(path.join(site,'adminPanel/index.html'),'utf8');
if (!admin.includes('NOT CONFIGURED ON GITHUB PAGES')) throw new Error('Admin status page is missing');

console.log('PASS: BAWSAQ Pages bundle, assets, router base, fallback and seven subpages verified.');


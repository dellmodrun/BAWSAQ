import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const site = path.join(root, '_site');
const base = process.env.BAWSAQ_DOMAIN ? '' : '/BAWSAQ';
const routerBase = base || '/';

for (const file of [
  'index.html', '404.html', '.nojekyll',
  'assets/index-Y7lMokl3.js', 'assets/index-BXcgnZ7x.css',
  'assets/bawsaq-brand.css',
  'assets/platform/baiwsaq-logo.png',
  'assets/platform/baiwsaq-logo-transparent.png',
  'assets/ai-city/hero-wide.webp',
  'assets/ai-city/hero-lucia-jason-wide.webp', 'assets/ai-city/hero-lucia-jason-mobile.webp',
  'assets/ai-city/share-lucia-jason.jpg',
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
if (fs.existsSync(path.join(site,'.query-cache'))) throw new Error('Old public query cache is still published');

const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
const bundle = fs.readFileSync(path.join(site, 'assets/index-Y7lMokl3.js'), 'utf8');
if (!html.includes(`${base}/assets/index-Y7lMokl3.js`)) throw new Error('Homepage asset base was not rewritten');
if (!/index-Y7lMokl3\.js\?v=[a-f0-9]{12}/.test(html)) throw new Error('Homepage script does not bypass stale Pages caches');
if (!html.includes(`${base}/fonts/`)) throw new Error('Homepage font base was not rewritten');
if (!bundle.includes(`R.jsx(gA,{basename:"${routerBase}",children:R.jsx(QO,{})})`)) throw new Error('BrowserRouter basename is missing');
if (bundle.includes('YO=Fk(P_,{basename:')) throw new Error('Basename was applied to the route matcher instead of BrowserRouter');
if (!bundle.includes('window.setTimeout(c,550)')) throw new Error('Splash cleanup timeout is missing');
if (bundle.includes('f.finished.then(c,c)')) throw new Error('Splash still waits for an infinite logo animation');
if (!bundle.includes(`M8=function(r){return"${base}/"+r}`)) throw new Error('Dynamic module preload base is missing');
if (!bundle.includes('const b=g.split("?")[0].endsWith(".css")')) throw new Error('Versioned page stylesheets are not loaded as CSS');
if (!bundle.includes('bawsaq_public_platform_reward_token') || !bundle.includes('bawsaq_public_commodities_v2')) throw new Error('Independent CA views are not connected');
if (bundle.includes('e("/api/public-read?"+f')) throw new Error('Pages bundle still calls the retired public read endpoint');
if (!bundle.includes('queryKey:["platform-token"],queryFn:Y4,enabled:sr,staleTime:0,refetchInterval:1e3')) throw new Error('Official CA does not refresh every second');
if (!bundle.includes('queryKey:["commodities"],queryFn:Q4,enabled:sr,refetchInterval:1e3,staleTime:0')) throw new Error('Six-stock CAs do not refresh every second');
if (!bundle.includes('this.publish({wallet:e,account:h,session:null,connecting:!1,stage:"idle",error:""})')) throw new Error('Wallet Standard connection is not independent of the retired auth backend');
if (bundle.includes('this.request({action:"nonce",wallet:h.address,purpose:"developer"})')) throw new Error('Wallet connection still calls retired authentication');
if (base && bundle.includes('M8=function(r){return"/"+r}')) throw new Error('Dynamic modules still preload from the domain root');
if (base && bundle.includes('src:"/assets/')) throw new Error('Root-relative bundle assets remain');
if (base && bundle.includes(', /assets/')) throw new Error('Root-relative responsive image candidates remain');
const css = fs.readFileSync(path.join(site, 'assets/index-BXcgnZ7x.css'), 'utf8');
if (base && css.includes('url(/assets/')) throw new Error('Root-relative CSS assets remain');
if (base && css.includes('url(/fonts/')) throw new Error('Root-relative CSS fonts remain');
if (!html.includes(`${base}/assets/bawsaq-brand.css`)) throw new Error('BAWSAQ brand stylesheet is missing');
if (!fs.readFileSync(path.join(site,'assets/bawsaq-brand.css'),'utf8').includes('.cm-art .cm-art-source{background:transparent}')) throw new Error('Stock logos still have a solid backing');
if (!html.includes(`${base}/assets/platform/baiwsaq-logo-transparent.png`)) throw new Error('Transparent BAIWSAQ boot logo is missing');
if (!html.includes(`${base}/assets/platform/bawsaq-boot-scene.webp`)) throw new Error('BAWSAQ boot scene preload is missing');
if(fs.existsSync(path.join(site,'assets/leonida'))) throw new Error('Legacy scene assets are still being published');
if (bundle.includes('leonida/exchange-mark.svg')) throw new Error('Legacy BAWSAQ icon references remain');
if (!bundle.includes('platform/baiwsaq-logo-transparent.png')) throw new Error('Transparent BAIWSAQ logo is not used by the app');
if (!bundle.includes('className:"ai-city-wordmark"')) throw new Error('Homepage project-name wordmark is missing');
if (!bundle.includes('hero-lucia-jason-wide.webp') || !bundle.includes('hero-lucia-jason-mobile.webp')) throw new Error('Lucia and Jason AI poster is missing');
if (bundle.includes('hero-nine-wide.webp') || bundle.includes('hero-nine-mobile.webp')) throw new Error('Regular grid poster remains');
if (!html.includes('/assets/platform/baiwsaq-logo.png')) throw new Error('BAIWSAQ share preview is missing');
if (!bundle.includes('Six AI stocks. One Vice City market.')) throw new Error('Project introduction is missing');
if (!bundle.includes('BAIWSAQ live price chart')) throw new Error('Future live chart block is missing');
if (!html.includes('class="ai8-sidebar"') || !html.includes(`${base}/assets/ai8-sidebar.css`)) throw new Error('Left navigation is missing');
if (!html.includes('6 AI STOCKS')) throw new Error('BAWSAQ 6 AI STOCKS branding is missing');
for (const slug of ['chatgta','clawde','geminight','grockstar','deepstreet','la-llama']) {
  if (!fs.existsSync(path.join(site,'goods',slug,'index.html'))) throw new Error(`Six-stock detail route missing: ${slug}`);
}
if (bundle.includes('maze-bank') || bundle.includes('fleeca-bank') || bundle.includes('burger-shot') || bundle.includes('cluckin-bell') || bundle.includes('up-n-atom') || bundle.includes('sprunk')) throw new Error('Old company slugs remain in the public bundle');
if (bundle.includes('https://bawsaq.fund') || html.includes('https://bawsaq.fund')) throw new Error('Old domain remains in the public site');
if (process.env.BAWSAQ_DOMAIN) {
  if (fs.readFileSync(path.join(site, 'CNAME'), 'utf8').trim() !== process.env.BAWSAQ_DOMAIN) throw new Error('Custom-domain CNAME is missing');
  if (!html.includes(`href="https://${process.env.BAWSAQ_DOMAIN}/"`)) throw new Error('Custom domain canonical URL is missing');
  if (html.includes('/BAWSAQ/') || bundle.includes('/BAWSAQ/')) throw new Error('Repository path remains in custom-domain bundle');
}
if (!bundle.includes('"CA PUBLISHED":"PRELAUNCH / CA TBA"')) throw new Error('Platform market status is not driven by the live official CA');
if (!bundle.includes('Official CA published. The chart will show live data')) throw new Error('Platform market copy does not change after CA publication');
if (fs.readFileSync(path.join(site,'assets/Activity-DZ9x3HFI.js'),'utf8').includes('0.15 SOL')) throw new Error('Unverified old treasury reserve remains');
if (fs.readFileSync(path.join(site,'assets/Docs-cpmzG5VI.js'),'utf8').includes('Why does wallet access depend on the backend?')) throw new Error('Old wallet documentation remains');
if (!fs.readFileSync(path.join(site,'assets/ai8-sidebar.js'),'utf8').includes('Wallet ${short')) throw new Error('Sidebar does not reflect wallet state');
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
if (html.replaceAll('/BAWSAQ', '').includes('BAWSAQ') || bundle.replaceAll('/BAWSAQ', '').includes('BAWSAQ') || html.includes('bawsaqai.fund') || bundle.includes('bawsaqai.fund')) throw new Error('Old public brand or domain remains');
if (!bundle.includes('children:"$"+A.symbol')) throw new Error('Stock ticker prefix is missing');
const market=fs.readFileSync(path.join(site,'assets/Coins-CA1CFPin.js'),'utf8');
if (!market.includes('OFFICIAL / PINNED') || !market.includes('Six AI stocks. One city.')) throw new Error('Market preview is missing');
const directory=fs.readFileSync(path.join(site,'assets/Commodities-BqprS4wm.js'),'utf8');
if (directory.includes('M2 21h20 M4 18h16') || !directory.includes('M7 7h10v10H7z')) throw new Error('Legacy sector icons remain');
const admin=fs.readFileSync(path.join(site,'adminPanel/index.html'),'utf8');
if (!admin.includes('NOT CONFIGURED ON GITHUB PAGES')) throw new Error('Admin status page is missing');

console.log('PASS: BAIWSAQ Pages bundle, assets, router base, fallback and seven subpages verified.');


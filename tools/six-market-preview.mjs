import fs from 'node:fs';
import path from 'node:path';
import { roster } from './ai8-copy.mjs';

const scenes = {
  'maze-bank': 'chatgta-scene.webp',
  'fleeca-bank': 'clawde-scene.webp',
  'burger-shot': 'geminight-scene.webp',
  'cluckin-bell': 'grockstar-scene.webp',
  'up-n-atom': 'deepstreet-scene.webp',
  sprunk: 'la-llama-scene.webp'
};

function replaceExact(value, from, to) {
  if (!value.includes(from)) throw new Error(`Market preview anchor missing: ${from.slice(0, 70)}`);
  return value.replace(from, to);
}

export function applySixMarketPreview(site, base) {
  const file = path.join(site, 'assets', 'Coins-CA1CFPin.js');
  let source = fs.readFileSync(file, 'utf8');
  source = replaceExact(source, 'import{e as w,r as n,j as e', 'import{u as lg,e as w,r as n,j as e');

  const stocks = roster.map(([slug, name, symbol, , , image]) => ({
    slug, name, symbol,
    logo: `${base}/assets/stocks/${image}`,
    scene: `${base}/assets/ai-city/${scenes[slug]}`
  }));
  const component = `
function sixPublishedMint(value){return typeof value==="string"&&/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)?value:null}
function SixMarketPreview({platformMint}){
  const catalog=lg();
  const rows=catalog.rows??[];
  const official=sixPublishedMint(platformMint);
  const stocks=${JSON.stringify(stocks)};
  return e.jsxs("section",{className:"six-market", "aria-labelledby":"six-market-title",children:[
    e.jsxs("div",{className:"six-market-heading",children:[e.jsxs("div",{children:[e.jsx("span",{className:"six-market-kicker",children:"THE OFFICIAL LINEUP"}),e.jsx("h2",{id:"six-market-title",children:"Six AI stocks. One city."})]}),e.jsx("p",{children:"Explore the official $BAWSAQ token and six fictional AI stocks before trading opens."})]}),
    e.jsxs("article",{className:"six-market-official",children:[
      e.jsx("img",{src:"${base}/assets/platform/bawsaq-logo-transparent-clean.png",alt:"",width:72,height:72}),
      e.jsxs("div",{className:"six-market-official-name",children:[e.jsx("span",{className:"six-market-badge",children:"OFFICIAL / PINNED"}),e.jsx("h3",{children:"$BAWSAQ"}),e.jsx("p",{children:"BAWSAQ platform token"})]}),
      e.jsxs("div",{className:"six-market-address",children:[e.jsx("small",{children:"Contract address"}),official?e.jsx("a",{href:"https://solscan.io/token/"+encodeURIComponent(official),target:"_blank",rel:"noopener noreferrer",title:official,children:official}):e.jsx("strong",{children:"TBA"})]})
    ]}),
    e.jsx("div",{className:"six-market-grid",children:stocks.map(stock=>{
      const listed=rows.find(row=>row.slug===stock.slug);
      const mint=sixPublishedMint(listed?.mint);
      return e.jsxs(p,{className:"six-market-card",to:"/goods/"+stock.slug,children:[
        e.jsx("span",{className:"six-market-card-scene",style:{backgroundImage:"linear-gradient(0deg,#170915d9,#17091539),url('"+stock.scene+"')"}}),
        e.jsx("img",{src:stock.logo,alt:"",width:52,height:52,loading:"lazy"}),
        e.jsxs("span",{className:"six-market-card-copy",children:[e.jsx("strong",{children:stock.name}),e.jsx("small",{children:"$"+stock.symbol+" · Fictional AI stock"})]}),
        e.jsx("span",{className:"six-market-card-status",children:mint?"CA PUBLISHED":"CA TBA"}),
        e.jsx("span",{className:"six-market-card-arrow","aria-hidden":"true",children:"↗"})
      ]},stock.slug)
    })}),
    e.jsx("p",{className:"six-market-note",children:"Names are fictional satire. No price, chart or trading status is shown until verified on-chain data is available."})
  ]})
}
`;
  source = replaceExact(source, 'function V(){', component + 'function V(){');
  source = replaceExact(source,
    'e.jsxs("section",{className:"surface cr-directory directory-panel"',
    'e.jsx(SixMarketPreview,{platformMint:s.platformMint}),e.jsxs("section",{className:"surface cr-directory directory-panel"');
  source = replaceExact(source,
    'title:"Coin directory",description:"Explore coins launched on the exchange, their markets and their holder rewards."',
    'title:"BAWSAQ market",description:"One official token, six fictional AI stocks and a community coin register."');
  source = replaceExact(source, 'children:["Launched on ",h]', 'children:"Community coin register"');
  source = replaceExact(source, '["stock","Stock pairs"],["legacy","Legacy markets"]', '["stock","Six-stock pairs"]');
  fs.writeFileSync(file, source);
}

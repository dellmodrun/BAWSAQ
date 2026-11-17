import fs from 'node:fs';
import path from 'node:path';

const roster = [
  ['maze-bank','ChatGTA','CGTA','banking','Vice City’s conversational AI. It writes plans, answers questions and knows more about this city than it should.','MAZE.png'],
  ['fleeca-bank','Clawde','CLAW','banking','A careful reasoning lab for the city’s contracts, research and inconvenient fine print.','FLEECA.png'],
  ['burger-shot','Geminight','GEMI','food','A multimodal network that connects the city’s words, images, maps and cameras.','BURGER.png'],
  ['cluckin-bell','Grockstar','GROK','food','A real-time intelligence terminal tuned to the city’s fastest feeds and loudest rumors.','CLUCK.png'],
  ['up-n-atom','DeepStreet','DEEP','food','An accessible reasoning lab bringing big ideas out of the deepest corners of the city.','ATOM.png'],
  ['bean-machine','Qwence','QWEN','food','A multilingual model family translating signs, code and cross-town deals.','BEAN.png'],
  ['sprunk','La Llama','LLMA','drinks','An open model network that runs in garages, storefronts and servers across the coast.','SPRUNK.png'],
  ['ecola','Misstral','MIST','drinks','An efficient model lab with a small footprint and a city-sized ambition.','ECOLA.png']
];
const main = 'index-Y7lMokl3.js';
const preset = 'const Ao=';
const presetEnd = ',ap=45e3;';
function replaceExact(value, from, to) { if (!value.includes(from)) throw new Error(`AI 8 copy anchor missing: ${from.slice(0,60)}`); return value.replaceAll(from,to); }
function rewrite(file, transform) { const target=path.join(file); fs.writeFileSync(target,transform(fs.readFileSync(target,'utf8'))); }
export function applyAi8Copy(site) {
  const assets=path.join(site,'assets');
  const base=`/${process.env.GITHUB_REPOSITORY?.split('/').at(-1)||'BAWSAQ'}`;
  rewrite(path.join(assets,main),s=>{
    const start=s.indexOf(preset),end=s.indexOf(presetEnd,start);
    if(start<0||end<0) throw new Error('AI 8 preset catalog not found');
    const objects=roster.map(([slug,name,symbol,category,description,image],i)=>({slug,name,symbol,category,description,image_source_url:`${base}/assets/stocks/${image}`,sort_order:i+1}));
    s=s.slice(0,start)+preset+JSON.stringify(objects)+s.slice(end);
    s=replaceExact(s,'const T_=[{id:"banking",label:"Banking",count:2},{id:"food",label:"Food",count:4},{id:"drinks",label:"Drinks",count:3},{id:"retail",label:"Retail",count:1},{id:"tech",label:"Tech",count:1},{id:"auto",label:"Auto",count:1}]','const T_=[{id:"banking",label:"Foundation AI",count:2},{id:"food",label:"AI Systems",count:4},{id:"drinks",label:"Open Models",count:2}]');
    s=replaceExact(s,'const CO=["maze-bank","burger-shot","vapid"]','const CO=["maze-bank","burger-shot","sprunk"]');
    const copy=[
      ['Official stocks and their last reported 24-hour price changes','AI 8 companies and their last reported market changes'],
      ['Explore stocks','Meet the AI 8'],['Market spotlight','AI 8 spotlight'],['View all ",op.length," stocks','View all ",op.length," companies'],
      [' stocks"]',' AI companies"]'],[' stock"]',' AI company"]'],
      ['Launch a coin','Create a coin'],['Official stocks','The AI 8'],['official stocks','AI 8 companies'],['official stock','AI 8 company'],
      ['fictional companies','fictional AI companies'],['fictional company','fictional AI company'],['Stock sectors','AI fields'],
      ['All sectors','All AI fields'],['All stocks','All AI companies'],['Search official stocks','Search AI companies'],
      ['Dealing in Vice City’s ups and downs.','Eight minds. One volatile city.'],['Dealing in Vice City\'s ups and downs.','Eight minds. One volatile city.']
    ];
    for(const [a,b] of copy)s=s.replaceAll(a,b);
    return s;
  });
  for(const name of ['Commodities-BqprS4wm.js','Launch-C2Z7OZxC.js','Coins-CA1CFPin.js','Activity-DZ9x3HFI.js','Earnings-CO_PrL-7.js']){
    rewrite(path.join(assets,name),s=>s
      .replaceAll('Official stocks','The AI 8').replaceAll('official stocks','AI 8 companies')
      .replaceAll('official stock','AI 8 company').replaceAll('fictional companies','fictional AI companies')
      .replaceAll('Stock sectors','AI fields').replaceAll('All sectors','All AI fields')
      .replaceAll('Launch a coin','Create a coin').replaceAll('12 fictional companies across 6 sectors','8 fictional AI companies across 3 fields')
      .replaceAll('The stock directory contains','The AI 8 directory contains'));
  }
  rewrite(path.join(assets,'Commodities-BqprS4wm.js'),s=>s
    .replaceAll('All stocks','All AI companies')
    .replaceAll('Official token markets','AI 8 markets')
    .replaceAll('sectors in Leonida','AI fields in Vice City')
    .replaceAll('Show previous sectors','Show previous AI fields')
    .replaceAll('Show more sectors','Show more AI fields'));
  const docs=[
    {id:'overview',group:'Start here',title:'Welcome to BAWSAQ AI 8',summary:'Eight original AI companies in a fictional Vice City market.',sections:[{id:'what-it-is',title:'What is BAWSAQ AI 8?',paragraphs:['BAWSAQ AI 8 imagines eight recognizable AI model archetypes as original companies in a Vice City inspired economy. ChatGTA, Clawde, Geminight, Grockstar, DeepStreet, Qwence, La Llama and Misstral are fictional businesses, not real company listings.','Their names and stories are satire. They are not affiliated with the AI products they reference, Rockstar Games, or any real company.']},{id:'status',title:'Current status',paragraphs:['The eight-company catalog is available to browse. No official AI 8 constituent mint addresses, live index value, trading route or reward payouts are verified on this public frontend.','A matching token name or ticker is not proof that an asset belongs to BAWSAQ.']}]},
    {id:'assets',group:'Start here',title:'The eight companies',summary:'Meet the fictional AI businesses and their fields.',action:{label:'Browse the AI 8',to:'/goods'},sections:[{id:'roster',title:'One city. Eight AI archetypes.',paragraphs:['ChatGTA explores conversational AI. Clawde focuses on careful reasoning. Geminight covers multimodal systems. Grockstar follows live signals. DeepStreet and Qwence represent accessible and multilingual models. La Llama reflects open deployment. Misstral is built around efficiency.']},{id:'ownership',title:'What a token would represent',paragraphs:['Any future AI 8 themed token would be a Solana crypto asset, not a share in a company, a claim on revenue, or ownership of an AI model.']}]},
    {id:'index',group:'Start here',title:'Index methodology',summary:'What must exist before AI 8 can show a live value.',sections:[{id:'requirements',title:'An index needs a public formula',paragraphs:['The AI 8 name describes a curated lineup today. A live index requires verified constituent addresses, a public pricing source, weighting rules, a base value and a rebalancing policy.','Until those rules and data are available, BAWSAQ does not publish a calculated index level or performance history.']}]},
    {id:'launch',group:'For creators',title:'Create a coin',summary:'The creation flow is planned but not currently available.',action:{label:'Open creation page',to:'/launch'},sections:[{id:'availability',title:'Creation is not live',paragraphs:['The public frontend does not include the private transaction preparation and verification backend needed to launch safely. Do not treat a visible form or wallet button as proof that a market is active.','When available, the flow should show the exact token identity, trading pair, costs and transaction before wallet approval, then provide confirmation and recovery.']}]},
    {id:'vice-rewards',group:'Rewards',title:'Holder rewards',summary:'Rewards require verified fee flows and completed transfers.',sections:[{id:'availability',title:'No active payout program is verified',paragraphs:['Any future reward rules must define eligibility, fee allocation, timing, operating costs and public transaction receipts. BAWSAQ currently makes no income or fixed payout promise.','Only a confirmed on-chain transfer counts as a completed payment.']}]},
    {id:'troubleshooting',group:'Start here',title:'Frequently asked questions',summary:'Answers about names, markets and availability.',sections:[{id:'names',title:'Are these real AI companies?',paragraphs:['No. The eight names are original fictional satire inspired by AI culture. They do not represent stock in OpenAI, Anthropic, Google, xAI, DeepSeek, Qwen, Meta or Mistral.']},{id:'market',title:'Can I trade them today?',paragraphs:['No verified official AI 8 token addresses or active markets are currently configured. The catalog is a concept showcase until live status is published.']},{id:'wallet',title:'Why does wallet access depend on the backend?',paragraphs:['Wallet connection alone does not create a safe market. Transactions require working preparation, simulation, confirmation and recovery services.']}]}
  ];
  rewrite(path.join(assets,'Docs-cpmzG5VI.js'),s=>{
    const start=s.indexOf('const K='),end=s.indexOf('function Z(',start);
    if(start<0||end<0)throw new Error('Docs content block missing');
    s=s.slice(0,start)+`const K=[],l=${JSON.stringify(docs)},I=["Start here","For creators","Rewards"];`+s.slice(end);
    return s.replaceAll('official stock','AI 8 company').replaceAll('Official assets','The AI 8').replaceAll('5 min','Prelaunch');
  });
  for(const route of ['','goods','explore','launch','ledger','earnings','docs','adminPanel']){
    const file=path.join(site,route,'index.html');
    if(!fs.existsSync(file))continue;
    rewrite(file,s=>s.replaceAll('Explore BAWSAQ’s fictional company stocks and launch coins on Solana.','Meet the eight original AI companies in BAWSAQ’s fictional Vice City market.')
      .replaceAll('Explore fictional company stocks, launch a coin, and follow its rewards on Solana.','Explore eight original AI companies in a Vice City inspired market.')
      .replaceAll('Sunset over the Leonida financial district','Vice City AI 8 market'));
  }
}

import fs from 'node:fs';
import path from 'node:path';

export const roster = [
  ['maze-bank','ChatGTA','CGTA','banking','Vice City’s conversational AI. It writes plans, answers questions and knows more about this city than it should.','gta-six/chatgta.png'],
  ['fleeca-bank','Clawde','CLAW','banking','A careful reasoning lab for the city’s contracts, research and inconvenient fine print.','gta-six/clawde.png'],
  ['burger-shot','Geminight','GEMI','food','A multimodal network that connects the city’s words, images, maps and cameras.','gta-six/geminight.png'],
  ['cluckin-bell','Grockstar','GROK','food','A real-time intelligence terminal tuned to the city’s fastest feeds and loudest rumors.','gta-six/grockstar.png'],
  ['up-n-atom','DeepStreet','DEEP','food','An accessible reasoning lab bringing big ideas out of the deepest corners of the city.','gta-six/deepstreet.png'],
  ['sprunk','La Llama','LLMA','drinks','An open model network that runs in garages, storefronts and servers across the coast.','gta-six/la-llama.png']
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
    s=replaceExact(s,`R.jsx("img",{src:"${base}/assets/leonida/exchange-poster-title.svg",alt:Rr,fetchPriority:"high"})`,'R.jsx("span",{className:"ai-city-wordmark",children:"BAWSAQ"})');
    s=replaceExact(s,'https://x.com/bawsaqfund','https://x.com/bawsaqaiindex');
    s=replaceExact(s,'return r.thumbnail&&i.unshift(n+"-96.webp"),{sources:i,original:e}','return{sources:i,original:e}');
    s=replaceExact(s,'R.jsx("strong",{children:A.symbol}),C&&R.jsx("span",{className:"stock-marquee-change"','R.jsx("strong",{children:"$"+A.symbol}),C&&R.jsx("span",{className:"stock-marquee-change"');
    s=replaceExact(s,'[A.name,A.symbol,C?.text].filter(Boolean).join(", ")','[A.name,"$"+A.symbol,C?.text].filter(Boolean).join(", ")');
    s=replaceExact(s,'media:"(max-aspect-ratio: 1/1)",srcSet:"/BAWSAQ/assets/leonida/exchange-poster-portrait-640.webp','media:"(max-width: 767px) and (max-aspect-ratio: 1/1)",srcSet:"/BAWSAQ/assets/leonida/exchange-poster-portrait-640.webp');
    s=replaceExact(s,'media:"(min-aspect-ratio: 9/4), (max-width: 767px) and (min-aspect-ratio: 2/1), (max-height: 590px) and (orientation: landscape)"','media:"(min-width: 768px), (max-width: 767px) and (min-aspect-ratio: 2/1), (max-height: 590px) and (orientation: landscape)"');
    s=replaceExact(s,'prelaunch:"Available at launch",checking:"Checking address…",unavailable:"Address unavailable"','prelaunch:"TBA",checking:"TBA",unavailable:"TBA"');
    s=replaceExact(s,',R.jsxs(At,{to:E_,onClick:V,children:["Operator workspace ",R.jsx(Yt,{name:"arrow",size:25})]})','');
    s=replaceExact(s,'const S=r.map(k=>({stock:k,movement:sO(k,e)}));return R.jsxs("aside",{className:"stock-marquee","aria-label":"Official stocks and their last reported 24-hour price changes",children:[R.jsx("span",{className:"stock-marquee-period",title:"24-hour price change",children:"24H"})','const S=r.map(k=>({stock:k,movement:sO(k,e)})),P=S.some(({movement:k})=>k&&k.direction!=="unquoted");return R.jsxs("aside",{className:"stock-marquee","aria-label":P?"Six fictional AI stocks and their 24-hour market changes":"Browse the six fictional AI stocks",children:[R.jsx("span",{className:"stock-marquee-period",title:P?"24-hour price change":"Six fictional AI stocks",children:P?"24H":"6 AI STOCKS"})');
    const start=s.indexOf(preset),end=s.indexOf(presetEnd,start);
    if(start<0||end<0) throw new Error('AI 8 preset catalog not found');
    const objects=roster.map(([slug,name,symbol,category,description,image],i)=>({slug,name,symbol,category,description,image_source_url:`${base}/assets/stocks/${image}`,sort_order:i+1}));
    s=s.slice(0,start)+preset+JSON.stringify(objects)+s.slice(end);
    const sceneStart=s.indexOf('const OO='),sceneEnd=s.indexOf('const CO=',sceneStart);
    if(sceneStart<0||sceneEnd<0)throw new Error('Legacy stock scene map missing');
    const stockScenes={'maze-bank':'chatgta-scene.webp','fleeca-bank':'clawde-scene.webp','burger-shot':'geminight-scene.webp','cluckin-bell':'grockstar-scene.webp','up-n-atom':'deepstreet-scene.webp',sprunk:'la-llama-scene.webp'};
    s=s.slice(0,sceneStart)+`const AI_SCENES=${JSON.stringify(stockScenes)};function U_(slug){return"${base}/assets/ai-city/"+(AI_SCENES[slug]??"district.webp")}`+s.slice(sceneEnd);
    s=replaceExact(s,'const T_=[{id:"banking",label:"Banking",count:2},{id:"food",label:"Food",count:4},{id:"drinks",label:"Drinks",count:3},{id:"retail",label:"Retail",count:1},{id:"tech",label:"Tech",count:1},{id:"auto",label:"Auto",count:1}]','const T_=[{id:"banking",label:"Foundation AI",count:2},{id:"food",label:"AI Systems",count:3},{id:"drinks",label:"Open Models",count:1}]');
    s=replaceExact(s,'const CO=["maze-bank","burger-shot","vapid"]','const CO=["maze-bank","burger-shot","sprunk"]');
    s=replaceExact(s,'{to:"/goods",label:"Stocks",scene:"district"}','{to:"/goods",label:"The 6 AI Stocks",scene:"district"}');
    s=replaceExact(s,'{to:"/explore",label:"Explore coins",scene:"district"}','{to:"/explore",label:"Market",scene:"district"}');
    const copy=[
      ['Official stocks and their last reported 24-hour price changes','Six fictional AI stocks and their last reported market changes'],
      ['Explore stocks','Explore the six stocks'],['Market spotlight','Six-stock spotlight'],
      ['Stock registry','Six-stock registry'],['Showing the stock catalog.','Showing the six-stock catalog.'],
      ['Search stocks and coins','Search six AI stocks and coins'],['children:"Stocks"','children:"6 AI Stocks"'],
      ['Each coin’s treasury checks for rewards every five minutes. Eligible holders share the available $BAWSAQ.','The six fictional AI stocks are ready to explore. Markets and holder rewards open only after their on-chain systems are verified.'],
      ['Each coin\'s treasury checks for rewards every five minutes. Eligible holders share the available $BAWSAQ.','The six fictional AI stocks are ready to explore. Markets and holder rewards open only after their on-chain systems are verified.'],
      ['Holder minimum','Market status'],['100,000','Prelaunch'],['Reward cycle','Index value'],['5 min','Not live'],
      ['Stock tokens represent fictional AI companies. Holding a token does not confer company ownership.','These six stocks are fictional. Any future tokens would not confer ownership in real AI companies.'],
      ['Browse the asset registry','Browse the six stocks'],['Launch coin','Create coin'],
      ['Launch a coin','Create a coin'],['Official stocks','The 6 AI Stocks'],['official stocks','six fictional AI stocks'],['official stock','fictional AI stock'],
      ['fictional companies','fictional AI companies'],['fictional company','fictional AI company'],['Stock sectors','AI fields'],
      ['All sectors','All AI fields'],['All stocks','All six stocks'],['Search official stocks','Search six stocks'],
      ['Dealing in Vice City’s ups and downs.','Six minds. One volatile city.'],['Dealing in Vice City\'s ups and downs.','Six minds. One volatile city.']
    ];
    for(const [a,b] of copy)s=s.replaceAll(a,b);
    const homeAnchor='R.jsx(IO,{}),R.jsx(UO,{assets:r.rows';
    const extra=`R.jsxs("section",{className:"ai8-about",children:[R.jsx("p",{className:"ai8-eyebrow",children:"01 / THE PROJECT"}),R.jsx("h2",{children:"Six AI stocks. One Vice City market."}),R.jsx("p",{children:"BAWSAQ imagines six familiar AI model archetypes as fictional stocks in a GTA VI inspired Vice City market: ChatGTA, Clawde, Geminight, Grockstar, DeepStreet and La Llama."}),R.jsx("p",{children:"Each name is an original satire, not a listing of a real AI company. Explore the six-stock catalog now; token markets and any index value will appear only after their addresses and pricing rules are verified."}),R.jsx(At,{to:"/docs?guide=overview",children:"Read how BAWSAQ works ↗"})]}),R.jsxs("section",{className:"ai8-chart",children:[R.jsxs("div",{className:"ai8-chart-head",children:[R.jsxs("div",{children:[R.jsx("p",{className:"ai8-eyebrow",children:"02 / PLATFORM MARKET"}),R.jsx("h2",{children:"$BAWSAQ market"}),R.jsx("p",{children:"The official token chart and trading route will appear here when the verified contract address is published."})]}),R.jsx("span",{className:"ai8-chart-status",children:/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(e.platformMint??"")?"LIVE MARKET":"PRELAUNCH / CA TBA"})]}),/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(e.platformMint??"")?R.jsxs(R.Fragment,{children:[R.jsx("iframe",{className:"ai8-chart-frame",title:"BAWSAQ live price chart",loading:"lazy",src:"https://dexscreener.com/solana/"+encodeURIComponent(e.platformMint)+"?embed=1&theme=dark",referrerPolicy:"no-referrer"}),R.jsx("a",{className:"ai8-trade-link",href:"https://pump.fun/coin/"+encodeURIComponent(e.platformMint),target:"_blank",rel:"noopener noreferrer",children:"Open $BAWSAQ trading page ↗"})]}):R.jsxs("div",{className:"ai8-chart-wait",children:[R.jsx("span",{children:"NO LIVE CHART YET"}),R.jsx("strong",{children:"Market opens after the official CA is verified."}),R.jsx("p",{children:"No simulated candles, volume or price data."})]})]}),`;
    s=replaceExact(s,homeAnchor,extra+homeAnchor);
    s=replaceExact(s,'import("./CommodityDetail-B_zrO4xK.js").then(r=>r.a),__vite__mapDeps([5,6,7,8])','import("./CommodityDetail-B_zrO4xK.js").then(r=>r.a),__vite__mapDeps([])');
    return s;
  });
  for(const name of ['Commodities-BqprS4wm.js','Launch-C2Z7OZxC.js','Coins-CA1CFPin.js','Activity-DZ9x3HFI.js','Earnings-CO_PrL-7.js']){
    rewrite(path.join(assets,name),s=>s
      .replaceAll('Official stocks','The 6 AI Stocks').replaceAll('official stocks','six fictional AI stocks')
      .replaceAll('official stock','fictional AI stock').replaceAll('fictional companies','fictional AI companies')
      .replaceAll('Stock sectors','AI fields').replaceAll('All sectors','All AI fields')
      .replaceAll('Launch a coin','Create a coin').replaceAll('12 fictional companies across 6 sectors','6 fictional AI stocks across 3 AI fields')
      .replaceAll('The stock directory contains','The six-stock directory contains'));
  }
  rewrite(path.join(assets,'Commodities-BqprS4wm.js'),s=>{
    s=s.replaceAll('All stocks','All six stocks')
      .replaceAll('Official token markets','Six-stock markets')
      .replaceAll('sectors in Leonida','AI fields in Vice City')
      .replaceAll('Show previous sectors','Show previous AI fields')
      .replaceAll('Show more sectors','Show more AI fields');
    const start=s.indexOf('const I={'),end=s.indexOf(';function W(',start);
    if(start<0||end<0)throw new Error('Category icon map is missing');
    const icons={
      all:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
      banking:'M7 7h10v10H7z M10 10h4v4h-4z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4',
      food:'M12 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6z M5 16a3 3 0 1 0 0 6a3 3 0 0 0 0-6z M19 16a3 3 0 1 0 0 6a3 3 0 0 0 0-6z M10 8 6 16 M14 8l4 8 M8 19h8',
      drinks:'M6 10V7a6 6 0 0 1 11-3 M4 10h16v11H4z M12 14v3'
    };
    return s.slice(0,start)+'const I='+JSON.stringify(icons)+s.slice(end);
  });
  const docs=[
    {id:'overview',group:'Start here',title:'Welcome to BAWSAQ',summary:'Six fictional AI stocks in a GTA VI inspired Vice City market.',sections:[{id:'what-it-is',title:'What is BAWSAQ?',paragraphs:['BAWSAQ imagines six recognizable AI model archetypes as fictional stocks in Vice City: ChatGTA, Clawde, Geminight, Grockstar, DeepStreet and La Llama. The GTA VI connection is the setting and the number six; these are original satirical names, not real company listings.','BAWSAQ is not affiliated with the AI products it references, Rockstar Games, or any real company.']},{id:'status',title:'Current status',paragraphs:['The six-stock catalog is available to browse. No constituent mint addresses, live index value, trading route or reward payouts are verified on this public frontend.','A matching token name or ticker is not proof that an asset belongs to BAWSAQ.']}]},
    {id:'assets',group:'Start here',title:'The six AI stocks',summary:'Meet the six fictional AI businesses and their fields.',action:{label:'Browse the six AI stocks',to:'/goods'},sections:[{id:'roster',title:'One city. Six AI archetypes.',paragraphs:['ChatGTA explores conversational AI. Clawde focuses on careful reasoning. Geminight connects words, images and maps. Grockstar follows live signals. DeepStreet brings accessible reasoning to the city. La Llama reflects open model deployment.']},{id:'ownership',title:'What a token would represent',paragraphs:['Any future stock-themed token would be a Solana crypto asset, not a share in a real company, a claim on revenue, or ownership of an AI model.']}]},
    {id:'index',group:'Start here',title:'Index methodology',summary:'What must exist before a six-stock index can show a live value.',sections:[{id:'requirements',title:'An index needs a public formula',paragraphs:['The six stocks form a fictional catalog today. A live index requires verified constituent addresses, a public pricing source, weighting rules, a base value and a rebalancing policy.','Until those rules and data are available, BAWSAQ does not publish a calculated index level or performance history.']}]},
    {id:'launch',group:'For creators',title:'Create a coin',summary:'The creation flow is planned but not currently available.',action:{label:'Open creation page',to:'/launch'},sections:[{id:'availability',title:'Creation is not live',paragraphs:['The public frontend does not include the private transaction preparation and verification backend needed to launch safely. Do not treat a visible form or wallet button as proof that a market is active.','When available, the flow should show the exact token identity, trading pair, costs and transaction before wallet approval, then provide confirmation and recovery.']}]},
    {id:'vice-rewards',group:'Rewards',title:'Holder rewards',summary:'Rewards require verified fee flows and completed transfers.',sections:[{id:'availability',title:'No active payout program is verified',paragraphs:['Any future reward rules must define eligibility, fee allocation, timing, operating costs and public transaction receipts. BAWSAQ currently makes no income or fixed payout promise.','Only a confirmed on-chain transfer counts as a completed payment.']}]},
    {id:'troubleshooting',group:'Start here',title:'Frequently asked questions',summary:'Answers about names, markets and availability.',sections:[{id:'names',title:'Are these real AI companies?',paragraphs:['No. These six names are fictional satire inspired by AI culture. They do not represent stock in OpenAI, Anthropic, Google, xAI, DeepSeek or Meta.']},{id:'market',title:'Can I trade them today?',paragraphs:['No verified official six-stock token addresses or active markets are currently configured. The catalog is a concept showcase until live status is published.']},{id:'wallet',title:'Why does wallet access depend on the backend?',paragraphs:['Wallet connection alone does not create a safe market. Transactions require working preparation, simulation, confirmation and recovery services.']}]}
  ];
  rewrite(path.join(assets,'Docs-cpmzG5VI.js'),s=>{
    const start=s.indexOf('const K='),end=s.indexOf('function Z(',start);
    if(start<0||end<0)throw new Error('Docs content block missing');
    s=s.slice(0,start)+`const K=[],l=${JSON.stringify(docs)},I=["Start here","For creators","Rewards"];`+s.slice(end);
    return s.replaceAll('official stock','fictional stock').replaceAll('Official assets','The six stocks')
      .replaceAll(' manual. From your first launch to the last receipt.',' guide to six fictional AI stocks, markets and status.')
      .replaceAll('" presets"','" stocks"').replaceAll('" categories"','" AI fields"')
      .replaceAll('" reward rounds"','" market status"').replaceAll('5 min','Prelaunch');
  });
  for(const route of ['','goods','explore','launch','ledger','earnings','docs','adminPanel']){
    const file=path.join(site,route,'index.html');
    if(!fs.existsSync(file))continue;
    const links=[['/','Home','exchange-sunset.webp'],['/goods','The 6 AI Stocks','financial-district.webp'],['/explore','Market','trading-floor.webp'],['/ledger','Activity','settlement-desk.webp'],['/earnings','Earnings','vice-vault.webp'],['/docs','Documentation','signal-coast-800.webp']];
    const sidebar=`<aside class="ai8-sidebar" aria-label="Site navigation"><a class="ai8-side-brand" href="${base}/">BAWSAQ <small>6 STOCKS</small></a><nav aria-label="Main pages">${links.map(([href,label,image],i)=>`<a class="ai8-side-card" href="${base}${href}" style="background-image:linear-gradient(90deg,#1c0919e8,#1c09198a),url('${base}/assets/leonida/${image}')"><span>0${i+1} / ${label}</span><b aria-hidden="true">↗</b></a>`).join('')}</nav><div class="ai8-side-extras"><a href="${base}/#market-search">Search market ↗</a><a href="${base}/docs?guide=vice-rewards">$BAWSAQ rewards ↗</a></div><div class="ai8-side-bottom"><a class="ai8-side-launch" href="${base}/launch/">+ Launch a coin</a><button type="button" class="ai8-side-wallet">Connect wallet</button><a href="https://x.com/bawsaqfund" target="_blank" rel="noopener noreferrer" aria-label="BAWSAQ on X"><svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.299l13.312 17.403Z"/></svg> X</a></div></aside><script src="${base}/assets/ai8-sidebar.js" defer></script>`;
    const completeSidebar=sidebar.replace('>BAWSAQ <small>6 STOCKS</small></a>','><img src="'+base+'/assets/platform/bawsaq-logo-transparent-clean.png" alt="" width="34" height="34"><span class="ai8-brand-copy"><strong>BAWSAQ</strong><small>6 AI STOCKS</small></span></a>').replace('</svg> X</a>','</svg></a>').replace('https://x.com/bawsaqfund','https://x.com/bawsaqaiindex');
    rewrite(file,s=>s.replaceAll('Explore BAWSAQ’s fictional company stocks and launch coins on Solana.','Explore six fictional AI stocks in BAWSAQ’s GTA VI inspired Vice City market.')
      .replaceAll('Explore fictional company stocks, launch a coin, and follow its rewards on Solana.','Discover six fictional AI stocks in a Vice City inspired market.')
      .replaceAll('Sunset over the Leonida financial district','Vice City six-stock market')
      .replace('</head>',`<link rel="stylesheet" href="${base}/assets/ai8-sidebar.css"></head>`)
      .replace('</body>',completeSidebar+'</body>'));
  }
}

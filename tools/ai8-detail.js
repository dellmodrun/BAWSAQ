import { j as React, L as Link, b as companies, u as useCatalog } from './index-Y7lMokl3.js';

const references = {
  'maze-bank':['ChatGPT','Conversational AI','A citywide assistant for writing, planning and asking better questions.'],
  'fleeca-bank':['Claude','Reasoning and research','A careful model lab that takes its time with difficult documents and fine print.'],
  'burger-shot':['Gemini','Multimodal AI','An intelligence network connecting text, images, maps and screens.'],
  'cluckin-bell':['Grok','Real-time context','A fast-moving signal reader tuned to the city’s public conversation.'],
  'up-n-atom':['DeepSeek','Accessible reasoning','A research lab building capable models outside the usual waterfront towers.'],
  sprunk:['Llama','Open deployment','An adaptable model network that can run wherever the city builds.']
};

function Page(){
  const catalog=useCatalog();
  const slug=location.pathname.split('/').filter(Boolean).at(-1);
  const item=companies.find(x=>x.slug===slug);
  if(!item)return React.jsx('main',{className:'ai8-detail',children:React.jsx(Link,{to:'/goods',children:'← Explore the six stocks'})});
  const listed=catalog.rows?.find(x=>x.slug===slug);
  const mint=typeof listed?.mint==='string'&&/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(listed.mint)?listed.mint:null;
  const [reference,field,story]=references[slug];
  document.title=`${item.name} · BAWSAQ`;
  return React.jsxs('main',{className:'ai8-detail',children:[
    React.jsx(Link,{className:'ai8-detail-back',to:'/goods',children:'← THE SIX AI STOCKS'}),
    React.jsxs('section',{className:'ai8-detail-hero',children:[
      React.jsxs('div',{children:[React.jsx('p',{className:'ai8-eyebrow',children:'BAWSAQ / FICTIONAL AI STOCK'}),React.jsx('h1',{children:item.name}),React.jsx('p',{className:'ai8-detail-lead',children:item.description}),React.jsxs('p',{className:'ai8-detail-tag',children:['$'+item.symbol,' · ',field,' · PRELAUNCH']})]}),
      React.jsx('img',{src:item.image_source_url,alt:`${item.name} temporary catalog emblem`,width:230,height:230})
    ]}),
    React.jsxs('section',{className:'ai8-detail-body',children:[
      React.jsxs('article',{children:[React.jsx('p',{className:'ai8-eyebrow',children:'THE CITY STORY'}),React.jsx('h2',{children:'A new kind of company in Vice City.'}),React.jsx('p',{children:story}),React.jsx('p',{children:`${item.name} is an original fictional business inspired by ${reference}. It is not affiliated with that product or its maker.`})]}),
      React.jsxs('aside',{children:[React.jsx('h2',{children:'Market status'}),mint?React.jsxs(React.Fragment,{children:[React.jsx('p',{children:'A token address has been published for this fictional stock. Check the on-chain record before trading.'}),React.jsx('code',{className:'ai8-detail-mint',children:mint}),React.jsx('a',{href:'https://solscan.io/token/'+encodeURIComponent(mint),target:'_blank',rel:'noopener noreferrer',children:'View on Solscan ↗'})]}):React.jsx('p',{children:'Prelaunch. No token address, price or live trading route is available for this stock.'}),React.jsx('p',{children:'A token would not represent ownership in the real AI company, its models or its revenue.'}),React.jsx(Link,{to:'/docs?guide=index',children:'How a six-stock index would work ↗'})]})
    ]})
  ]});
}
export const a={default:Page};

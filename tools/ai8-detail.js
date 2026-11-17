import { j as React, L as Link, b as companies } from './index-Y7lMokl3.js';

const references = {
  'maze-bank':['ChatGPT','Conversational AI','A citywide assistant for writing, planning and asking better questions.'],
  'fleeca-bank':['Claude','Reasoning and research','A careful model lab that takes its time with difficult documents and fine print.'],
  'burger-shot':['Gemini','Multimodal AI','An intelligence network connecting text, images, maps and screens.'],
  'cluckin-bell':['Grok','Real-time context','A fast-moving signal reader tuned to the city’s public conversation.'],
  'up-n-atom':['DeepSeek','Accessible reasoning','A research lab building capable models outside the usual waterfront towers.'],
  'bean-machine':['Qwen','Multilingual models','A model family that connects languages, code and local commerce.'],
  sprunk:['Llama','Open deployment','An adaptable model network that can run wherever the city builds.'],
  ecola:['Mistral','Efficient models','A compact, fast-moving lab with a large ambition.']
};

function Page(){
  const slug=location.pathname.split('/').filter(Boolean).at(-1);
  const item=companies.find(x=>x.slug===slug);
  if(!item)return React.jsx('main',{className:'ai8-detail',children:React.jsx(Link,{to:'/goods',children:'← Explore the AI 8'})});
  const [reference,field,story]=references[slug];
  document.title=`${item.name} · BAWSAQ AI 8`;
  return React.jsxs('main',{className:'ai8-detail',children:[
    React.jsx(Link,{className:'ai8-detail-back',to:'/goods',children:'← THE AI 8'}),
    React.jsxs('section',{className:'ai8-detail-hero',children:[
      React.jsxs('div',{children:[React.jsx('p',{className:'ai8-eyebrow',children:'BAWSAQ AI 8 / FICTIONAL COMPANY'}),React.jsx('h1',{children:item.name}),React.jsx('p',{className:'ai8-detail-lead',children:item.description}),React.jsxs('p',{className:'ai8-detail-tag',children:['$'+item.symbol,' · ',field,' · PRELAUNCH']})]}),
      React.jsx('img',{src:item.image_source_url,alt:`${item.name} temporary catalog emblem`,width:230,height:230})
    ]}),
    React.jsxs('section',{className:'ai8-detail-body',children:[
      React.jsxs('article',{children:[React.jsx('p',{className:'ai8-eyebrow',children:'THE CITY STORY'}),React.jsx('h2',{children:'A new kind of company in Vice City.'}),React.jsx('p',{children:story}),React.jsx('p',{children:`${item.name} is an original fictional business inspired by ${reference}. It is not affiliated with that product or its maker.`})]}),
      React.jsxs('aside',{children:[React.jsx('h2',{children:'Market status'}),React.jsx('p',{children:'Prelaunch. No verified token address, price or live trading route is available for this company.'}),React.jsx('p',{children:'A future token would not represent ownership in the real AI company, its models or its revenue.'}),React.jsx(Link,{to:'/docs?guide=index',children:'How the AI 8 index would work ↗'})]})
    ]})
  ]});
}
export const a={default:Page};

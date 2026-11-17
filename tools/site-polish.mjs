import fs from 'node:fs';
import path from 'node:path';

function edit(site, name, edits) {
  const file = path.join(site, 'assets', name);
  let source = fs.readFileSync(file, 'utf8');
  for (const [from, to] of edits) {
    if (!source.includes(from)) throw new Error(`Site polish anchor missing in ${name}: ${from.slice(0, 65)}`);
    source = source.replaceAll(from, to);
  }
  fs.writeFileSync(file, source);
}

export function applySitePolish(site) {
  edit(site, 'index-Y7lMokl3.js', [
    [
      'R.jsx("p",{children:"The official token chart and trading route will appear here when the verified contract address is published."})',
      'R.jsx("p",{children:/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(e.platformMint??"")?"Official CA published. The chart will show live data when a Solana trading pair is available.":"The official CA will appear here as soon as it is published."})'
    ],
    ['?"LIVE MARKET":"PRELAUNCH / CA TBA"', '?"CA PUBLISHED":"PRELAUNCH / CA TBA"'],
    ['?R.jsxs(R.Fragment,{children:[R.jsx("iframe",{className:"ai8-chart-frame"',
      '?R.jsxs(R.Fragment,{children:[R.jsxs("div",{className:"ai8-chart-ca",children:[R.jsx("span",{children:"Official CA"}),R.jsx("code",{children:e.platformMint})]}),R.jsx("iframe",{className:"ai8-chart-frame"'],
    ['className:"ai8-trade-link",href:"https://pump.fun/coin/"+encodeURIComponent(e.platformMint)',
      'className:"ai8-trade-link",href:(/pump$/i.test(e.platformMint)?"https://pump.fun/coin/":"https://solscan.io/token/")+encodeURIComponent(e.platformMint)'],
    ['Open $BAWSAQ trading page', 'Open official token'],
    ['Activity feed unavailable.', 'Activity begins when the production market opens.']
  ]);

  edit(site, 'Coins-CA1CFPin.js', [
    ['Coin register unavailable', 'Community coin register opens at launch']
  ]);

  edit(site, 'Docs-cpmzG5VI.js', [
    ['No constituent mint addresses, live index value, trading route or reward payouts are verified on this public frontend.',
      'Official and stock CA status updates live in the market. A published address alone does not establish a live trading pair, index value or reward payout.'],
    ['No verified official six-stock token addresses or active markets are currently configured. The catalog is a concept showcase until live status is published.',
      'Check the market for each official CA. A published CA identifies the token; price data and trading availability require a separate verified market.'],
    ['Why does wallet access depend on the backend?', 'What does connecting a wallet enable today?'],
    ['Wallet connection alone does not create a safe market. Transactions require working preparation, simulation, confirmation and recovery services.',
      'You can connect a Solana wallet and see its address. Coin launches and trading require separate preparation, simulation, confirmation and recovery services.']
  ]);

  edit(site, 'Activity-DZ9x3HFI.js', [
    ['children:"Protocol treasury"', 'children:"Planned treasury"'],
    ['children:"Buybacks & burns"', 'children:"Buybacks & burns (planned)"'],
    ['children:"Cycle"', 'children:"Cycle"'],
    ['children:"5 min"', 'children:"TBA"'],
    ['children:"Minimum reserve"', 'children:"Reserve policy"'],
    ['children:"0.15 SOL"', 'children:"TBA"'],
    ['$BAWSAQ rewards paid to the protocol wallet in SOL fund buybacks. The treasury keeps its SOL reserve, covers network costs and burns the $BAWSAQ it buys. Asset fees received in $BAWSAQ are burned directly.',
      'No buyback or burn schedule is active. Rules, funding sources and transaction receipts will be published before this feature opens.'],
    ['Events are unavailable', 'Prelaunch — no events yet'],
    ['The registry could not load the event feed.', 'Activity will appear here after the production market opens.'],
    ['Records unavailable', 'Prelaunch'],
    ['Buyback records could not be loaded.', 'No buybacks are active.']
  ]);

  edit(site, 'Earnings-CO_PrL-7.js', [
    ['description:`Look up the tokens ${T} has sent you. No connection or signature required.`',
      'description:"Reward lookup will use verified on-chain transfers when the BAWSAQ reward service opens. No wallet signature is needed."'],
    ['children:"Find your reward history"', 'children:"Reward lookup is coming"'],
    ['children:"Enter a wallet to explore its lifetime rewards, asset totals, and transfer history."',
      'children:"No reward payouts are active or verified yet. Future transfers will be searchable by public wallet address."']
  ]);

  edit(site, 'Launch-C2Z7OZxC.js', [
    ['e.jsx("p",{children:"Create a market against $BAWSAQ or an fictional AI stock."})',
      'e.jsx("p",{children:"Preview a market against $BAWSAQ or one of the six fictional AI stocks."}),e.jsx("p",{className:"launch-prelaunch-note",children:"PRELAUNCH PREVIEW / Coin creation is not active until BAWSAQ launches its production backend."})'],
    ['className:"ls-launch-form",onSubmit:n=>{n.preventDefault(),Ct()}',
      'className:"ls-launch-form",onSubmit:n=>{n.preventDefault()}'],
    ['className:"ls-launch-submit",disabled:!Ye', 'className:"ls-launch-submit",disabled:!0'],
    ['children:"0.02 SOL"', 'children:"TBA"'],
    ['" Every 5 min"', '" Rules TBA"'],
    ['All creator fees go to this coin’s rewards treasury. Your wallet shows the launch costs and any initial buy before you sign.',
      'Reward allocation and launch costs will be published before creation opens. This preview does not submit transactions.']
  ]);

  fs.appendFileSync(path.join(site, 'assets', 'bawsaq-brand.css'),
    '\n.launch-prelaunch-note{margin:12px 0 0;padding:11px 14px;border:1px solid #ff82b955;background:#321128;color:#ffe7f1;font-size:13px;font-weight:700;letter-spacing:.025em}\n.ai8-chart-ca{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 14px;border:1px solid #ff83b850;background:#2b1022;color:#ffe5f0}.ai8-chart-ca span{font-size:11px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:#ff83ba}.ai8-chart-ca code{font-size:12px;overflow-wrap:anywhere}\n');
}

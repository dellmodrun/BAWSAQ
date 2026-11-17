import fs from 'node:fs';
import path from 'node:path';

// This is a public, read-only Supabase publishable key. Writes use a service key
// kept outside the repository by tools/update-ca.mjs.
const liveOrigin = 'https://snwthyespgghvvlktyyu.supabase.co';
const publishableKey = 'sb_publishable_lok_cbkXwfsPKEpOTTCl4Q_6aqpNf0v';

function replaceOnce(source, oldText, newText, label) {
  if (!source.includes(oldText)) throw new Error(`BAWSAQ live CA patch anchor missing: ${label}`);
  if (source.indexOf(oldText) !== source.lastIndexOf(oldText)) throw new Error(`BAWSAQ live CA patch anchor is ambiguous: ${label}`);
  return source.replace(oldText, newText);
}

export function applyLiveCa(site) {
  const file = path.join(site, 'assets', 'index-Y7lMokl3.js');
  let source = fs.readFileSync(file, 'utf8');

  // The original app routes all public reads through a server endpoint that
  // GitHub Pages cannot serve. Send only the two CA resources to the independent
  // BAWSAQ views, leaving the rest of the application unchanged.
  const fetchAnchor = 'return f.set("resource",a.pathname.slice(9))';
  const bridge = `if(a.pathname==="/rest/v1/public_platform_reward_token"||a.pathname==="/rest/v1/public_commodities"){
    const resource=a.pathname.endsWith("public_platform_reward_token")?"bawsaq_public_platform_reward_token":"bawsaq_public_commodities";
    const liveUrl=new URL("${liveOrigin}/rest/v1/"+resource);
    liveUrl.search=a.search;
    const headers=new Headers({apikey:"${publishableKey}",accept:c.get("accept")||"application/json"});
    return e(liveUrl,{method:l,headers,cache:"no-store",signal:i?.signal??(n instanceof Request?n.signal:void 0)})
  }`;
  source = replaceOnce(source, fetchAnchor, bridge + fetchAnchor, 'CA fetch bridge');

  source = replaceOnce(source,
    'queryKey:["platform-token"],queryFn:Y4,enabled:sr,staleTime:15e3,refetchInterval:3e4,refetchOnWindowFocus:"always",refetchOnReconnect:"always"',
    'queryKey:["platform-token"],queryFn:Y4,enabled:sr,staleTime:0,refetchInterval:1e3,refetchOnWindowFocus:"always",refetchOnReconnect:"always"',
    'official CA polling');
  source = replaceOnce(source,
    'queryKey:["commodities"],queryFn:Q4,enabled:sr,refetchInterval:3e4,staleTime:15e3,refetchOnWindowFocus:!1,refetchOnReconnect:!0',
    'queryKey:["commodities"],queryFn:Q4,enabled:sr,refetchInterval:1e3,staleTime:0,refetchOnWindowFocus:"always",refetchOnReconnect:"always"',
    'six-stock CA polling');

  fs.writeFileSync(file, source);
}

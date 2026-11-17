import fs from 'node:fs';
import path from 'node:path';

function replaceOnce(source, from, to, label) {
  if (!source.includes(from) || source.indexOf(from) !== source.lastIndexOf(from)) {
    throw new Error(`Wallet patch anchor missing or ambiguous: ${label}`);
  }
  return source.replace(from, to);
}

export function applyWalletConnect(site) {
  const file = path.join(site, 'assets', 'index-Y7lMokl3.js');
  let source = fs.readFileSync(file, 'utf8');

  // The mirrored wallet flow tried to authenticate against an old backend that
  // rejects this site's origin. Keep Wallet Standard discovery and the wallet's
  // own connect/disconnect methods, but make account connection independent of
  // that unavailable authentication service. Launch actions still require a
  // separately configured production backend and must say so.
  const start = 'const g=await this.request({action:"nonce",wallet:h.address,purpose:"developer"})';
  const end = 'this.expiry=setTimeout(()=>this.check(),Math.min(A-Date.now()+1,2147483647))';
  const first = source.indexOf(start);
  const last = source.indexOf(end, first);
  if (first < 0 || last < 0 || source.indexOf(start, first + 1) >= 0) {
    throw new Error('Wallet authentication splice anchor missing or ambiguous');
  }
  source = source.slice(0, first)
    + 'this.publish({wallet:e,account:h,session:null,connecting:!1,stage:"idle",error:""})'
    + source.slice(last + end.length);

  source = replaceOnce(source,
    'Connect your wallet and sign the authentication message first.',
    'Wallet connected. Coin launches require the BAWSAQ production backend, which is not active yet.',
    'launch prerequisite');
  source = replaceOnce(source,
    'Sign in securely. No transaction or funds transfer.',
    'Connect your Solana wallet. No signature or transaction is requested.',
    'wallet safety note');
  source = replaceOnce(source,
    'children:f?"Authenticating":e',
    'children:f?"Connecting":e',
    'wallet button state');

  fs.writeFileSync(file, source);
}

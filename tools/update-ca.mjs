import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRef = 'snwthyespgghvvlktyyu';
const projectUrl = `https://${projectRef}.supabase.co`;
const publicKey = 'sb_publishable_lok_cbkXwfsPKEpOTTCl4Q_6aqpNf0v';
const aliases = new Map([
  ['official', 'official'], ['bawsaq', 'official'],
  ['chatgta', 'maze-bank'], ['cgta', 'maze-bank'], ['maze-bank', 'maze-bank'],
  ['clawde', 'fleeca-bank'], ['claw', 'fleeca-bank'], ['fleeca-bank', 'fleeca-bank'],
  ['geminight', 'burger-shot'], ['gemi', 'burger-shot'], ['burger-shot', 'burger-shot'],
  ['grockstar', 'cluckin-bell'], ['grok', 'cluckin-bell'], ['cluckin-bell', 'cluckin-bell'],
  ['deepstreet', 'up-n-atom'], ['deep', 'up-n-atom'], ['up-n-atom', 'up-n-atom'],
  ['la llama', 'sprunk'], ['lallama', 'sprunk'], ['llma', 'sprunk'], ['sprunk', 'sprunk']
]);

function validMint(value) {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) return false;
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let number = 0n;
  for (const char of value) number = number * 58n + BigInt(alphabet.indexOf(char));
  let bytes = 0;
  while (number > 0n) { bytes++; number >>= 8n; }
  return value.match(/^1*/)[0].length + bytes === 32;
}

const slug = aliases.get(String(process.argv[2] || '').trim().toLowerCase());
const input = String(process.argv[3] || '').trim();
const mint = input.toLowerCase() === 'tba' ? null : input;
if (!slug || (mint !== null && !validMint(mint))) {
  console.error('Usage: npm run update:ca -- <official|ChatGTA|Clawde|Geminight|Grockstar|DeepStreet|La Llama> <Solana CA|tba>');
  process.exit(1);
}

// Retrieve the service key only in memory. The local Windows vault avoids a
// Supabase CLI round trip on every CA update; the key is never written to git.
const vaultResource = 'BAWSAQ CA updater vault';
function vault(script) {
  return spawnSync('powershell.exe', ['-NoProfile', '-Command', '-'], {
    input: script, encoding: 'utf8', windowsHide: true,
    stdio: ['pipe', 'pipe', 'pipe']
  });
}
let serviceKey = '';
if (process.platform === 'win32') {
  const result = vault(`$ErrorActionPreference='Stop'\n$type=[Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime]\n$credential=([Windows.Security.Credentials.PasswordVault]::new()).Retrieve('${vaultResource}','bawsaq')\n$credential.RetrievePassword()\n[Console]::Out.Write($credential.Password)`);
  if (result.status === 0) serviceKey = result.stdout.trim();
}
if (!serviceKey) {
  const cli = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/c', `npx --yes supabase@latest projects api-keys --remote=${projectRef} --output json`], { encoding: 'utf8', windowsHide: true })
    : spawnSync('npx', ['--yes', 'supabase@latest', 'projects', 'api-keys', `--remote=${projectRef}`, '--output', 'json'], { encoding: 'utf8' });
  if (cli.status !== 0) throw new Error('Supabase credentials are unavailable on this computer.');
  const keys = JSON.parse(cli.stdout.slice(cli.stdout.indexOf('['), cli.stdout.lastIndexOf(']') + 1));
  serviceKey = keys.find(key => key.id === 'service_role')?.api_key || '';
  if (!serviceKey) throw new Error('Supabase service role key is unavailable.');
  if (process.platform === 'win32') {
    const encoded = Buffer.from(serviceKey).toString('base64');
    vault(`$ErrorActionPreference='Stop'\n$type=[Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime]\n$secret=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded}'))\n$vault=[Windows.Security.Credentials.PasswordVault]::new()\n$credential=[Windows.Security.Credentials.PasswordCredential]::new('${vaultResource}','bawsaq',$secret)\n$vault.Add($credential)`);
  }
}

function http(url, method, headers, body) {
  const helper = fileURLToPath(new URL('./ca-http.py', import.meta.url));
  const result = spawnSync('python', [helper], {
    input: JSON.stringify({ url, method, headers, body }),
    encoding: 'utf8', windowsHide: true,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  if (result.status !== 0) throw new Error('CA HTTPS helper failed.');
  return JSON.parse(result.stdout);
}

const response = http(`${projectUrl}/rest/v1/bawsaq_ca?slug=eq.${encodeURIComponent(slug)}`, 'PATCH', {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    'content-type': 'application/json',
    prefer: 'return=representation'
  }, { mint, updated_at: new Date().toISOString() });
if (response.status !== 200) throw new Error(`CA update failed: HTTP ${response.status}`);
const updated = response.data;
if (updated.length !== 1 || updated[0].mint !== mint) throw new Error('CA update did not affect exactly one record.');

const view = slug === 'official' ? 'bawsaq_ca' : 'bawsaq_public_commodities';
const query = slug === 'official' ? 'slug=eq.official&select=slug,mint' : `slug=eq.${encodeURIComponent(slug)}&select=slug,mint`;
let verified = false;
for (let attempt = 0; attempt < 5; attempt++) {
  const check = http(`${projectUrl}/rest/v1/${view}?${query}`, 'GET', { apikey: publicKey, accept: 'application/json', 'cache-control': 'no-store' });
  if (check.status === 200) {
    const rows = check.data;
    if (rows.length === 1 && rows[0].mint === mint) { verified = true; break; }
  }
  await new Promise(resolve => setTimeout(resolve, 300));
}
if (!verified) throw new Error('Database was updated, but public read verification failed.');
console.log(`${slug}: ${mint || 'TBA'} (independent database update verified; no Pages deploy)`);

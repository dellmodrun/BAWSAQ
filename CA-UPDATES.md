# BAWSAQ CA updates

The official $BAWSAQ token and six AI stocks have separate rows in the
`bawsaq_ca` table. They are read from Supabase, independently of GitHub Pages.
The visible market page polls the public CA views once per second while open.

From this repository, update one address at a time:

```powershell
npm run update:ca -- official <Solana CA|tba>
npm run update:ca -- ChatGTA <Solana CA|tba>
npm run update:ca -- Clawde <Solana CA|tba>
npm run update:ca -- Geminight <Solana CA|tba>
npm run update:ca -- Grockstar <Solana CA|tba>
npm run update:ca -- DeepStreet <Solana CA|tba>
npm run update:ca -- "La Llama" <Solana CA|tba>
```

Each command writes just that row and verifies the public read. It does not
commit, rebuild or redeploy the site. Until a CA is supplied, its row remains
TBA. This computer keeps the database write credential in Windows Password
Vault; only the public read key is included in the frontend.

The database schema is in `supabase/migrations/20261118120000_bawsaq_live_ca.sql`.
The production project is `snwthyespgghvvlktyyu` (shared infrastructure with
other sites, but BAWSAQ has its own table and views).

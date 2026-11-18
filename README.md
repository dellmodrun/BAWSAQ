# BAIWSAQ

BAIWSAQ is a fictional Vice City inspired market for six AI model themed stocks. The public site is deployed to `https://baiwsaqindex.fun/` from this repository's `main` branch through GitHub Pages.

## Build and verify

```powershell
$env:BAWSAQ_DOMAIN='baiwsaqindex.fun'
npm run check
npm run build:pages
npm run check:pages
```

The build creates `_site/` and includes the public homepage, stock pages, market, launch preview, activity, earnings, documentation, and admin status route. The project name and public logo are applied during the Pages build. The GitHub repository path remains `/BAWSAQ/` because the repository itself has not been renamed.

## Contract address updates

The official token and six stock addresses are separate public records in Supabase. See `CA-UPDATES.md` for the one-row updater. An address update does not rebuild or redeploy the frontend. Internal database table and command names retain `bawsaq` to preserve the existing CA integration.

## Current availability

Wallet connection is available. Coin creation, payouts, and buybacks remain a prelaunch preview until their production services are available. See `SITE-STATUS.md` for details.

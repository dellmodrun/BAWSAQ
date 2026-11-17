# BAWSAQ AI 8

BAWSAQ AI 8 is a public-facing fictional market concept set in a Vice City inspired world. Its eight original AI companies are creative references to real AI products; they are not those companies, shares in them, or verified tradable tokens.

The public GitHub Pages site is built from `site/`. The older read-only capture remains in `mirror/` as a source archive only and is not part of the published bundle. `tools/build-pages.mjs` copies the site, injects the GitHub Pages base path, and includes only the current brand assets. The old frontend has no deployable private backend, so market, wallet, launch and reward features truthfully show their prelaunch state.

Run `npm run build:pages` and `npm run check:pages` to build and validate the public site. Run `npm run check` to verify the archived mirror separately.

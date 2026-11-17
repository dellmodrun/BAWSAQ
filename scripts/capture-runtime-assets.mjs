import { execFile } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "mirror");
const PROFILE = path.join(ROOT, ".runtime-capture-profile");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const LOCAL = "http://127.0.0.1:4176";
const ORIGIN = "https://bawsaq.fund";
const pages = ["/", "/goods", "/explore", "/ledger", "/earnings", "/docs", "/launch"];
const assets = new Set();
const routes = new Set();

await rm(PROFILE, { recursive: true, force: true });
for (const page of pages) {
  const { stdout } = await run(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=12000",
    `--user-data-dir=${PROFILE}-${page.replace(/[^a-z]/gi, "_") || "home"}`,
    "--dump-dom", `${LOCAL}${page}`
  ], { maxBuffer: 64 * 1024 * 1024, encoding: "utf8" });
  for (const match of stdout.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^\/(?:assets|fonts)\//.test(value) || /^\/(?:dexscreener|pump-fun)\.svg/.test(value)) assets.add(value.split("?")[0]);
    if (/^\/(?:explore|goods)(?:\/[^?#"]+)?/.test(value)) routes.add(value.split(/[?#]/)[0]);
  }
  console.log(`CAPTURE ${page} ${stdout.length} chars`);
}

for (const asset of assets) {
  const response = await fetch(`${ORIGIN}${asset}`);
  if (!response.ok) { console.warn(`SKIP ${response.status} ${asset}`); continue; }
  const file = path.join(OUT, ...asset.split("/").filter(Boolean));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}
await writeFile(path.join(ROOT, "runtime-routes.json"), JSON.stringify([...routes].sort(), null, 2) + "\n");
for (const suffix of pages.map((page) => `-${page.replace(/[^a-z]/gi, "_") || "home"}`)) {
  await rm(`${PROFILE}${suffix}`, { recursive: true, force: true });
}
console.log(`Captured ${assets.size} rendered assets and ${routes.size} dynamic routes.`);

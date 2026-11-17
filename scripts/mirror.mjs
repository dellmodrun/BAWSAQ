import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "mirror");
const ORIGIN = "https://bawsaq.fund";
const routes = ["/", "/explore", "/goods", "/launch", "/ledger", "/earnings", "/docs", "/adminPanel"];
const seeds = [
  "/assets/index-Y7lMokl3.js", "/assets/index-BXcgnZ7x.css",
  "/fonts/dm-sans-latin-variable.woff2", "/dexscreener.svg", "/pump-fun.svg",
  "/assets/leonida/exchange-share.jpg", "/assets/leonida/exchange-poster-portrait.webp",
  "/assets/leonida/exchange-poster-wide.webp"
];
const queued = new Set(seeds.map((item) => `${ORIGIN}${item}`));
const completed = new Set();

function destination(url, isPage = false) {
  const parsed = new URL(url, ORIGIN);
  const pathname = decodeURIComponent(parsed.pathname);
  if (isPage) return pathname === "/" ? path.join(OUT, "index.html") : path.join(OUT, ...pathname.split("/").filter(Boolean), "index.html");
  const parts = pathname.split("/").filter(Boolean);
  if (parts.some((part) => part === "..")) throw new Error(`Unsafe path: ${pathname}`);
  return path.join(OUT, ...parts);
}

function discover(text, baseUrl) {
  const values = new Set();
  const patterns = [
    /(?:href|src)=["']([^"'#]+)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi,
    /["'`](\/assets\/[^"'`,\s)]+|\/fonts\/[^"'`,\s)]+|\/(?:dexscreener|pump-fun)\.svg)["'`,\s)]/gi
  ];
  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(text))) values.add(match[1]);
  }
  for (let value of values) {
    value = value.replace(/\\/g, "").trim();
    try {
      const found = new URL(value, baseUrl);
      if (found.origin !== ORIGIN) continue;
      if (!/\.(?:js|css|woff2?|png|jpe?g|gif|svg|webp|ico|avif)$/i.test(found.pathname)) continue;
      found.hash = "";
      queued.add(found.href);
    } catch {}
  }
}

async function download(url, isPage = false) {
  const key = `${url}|${isPage}`;
  if (completed.has(key)) return;
  completed.add(key);
  const response = await fetch(url, { headers: { "user-agent": "BAWSAQLocalMirror/1.0" }, redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const file = destination(url, isPage);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, bytes);
  const type = response.headers.get("content-type") || "";
  if (type.includes("text/") || type.includes("javascript") || /\.(?:js|css)$/i.test(file)) discover(bytes.toString("utf8"), url);
  console.log(`${isPage ? "PAGE " : "ASSET"} ${new URL(url).pathname} -> ${path.relative(ROOT, file)}`);
}

await mkdir(OUT, { recursive: true });
for (const route of routes) await download(`${ORIGIN}${route}`, true);
while (true) {
  const pending = [...queued].filter((url) => !completed.has(`${url}|false`));
  if (!pending.length) break;
  for (let index = 0; index < pending.length; index += 8) {
    await Promise.all(pending.slice(index, index + 8).map((url) => download(url).catch((error) => console.warn(`SKIP ${error.message}`))));
  }
}
console.log(`Mirrored ${routes.length} routes and ${completed.size - routes.length} resources.`);

import http from "node:http";
import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const MIRROR = path.join(ROOT, "mirror");
const ORIGIN = "https://bawsaq.fund";
const PORT = Number(process.env.PORT || 4176);
const routes = new Set(["/", "/explore", "/goods", "/launch", "/ledger", "/earnings", "/docs", "/adminPanel"]);
const mime = new Map([
  [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"], [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"], [".svg", "image/svg+xml"],
  [".png", "image/png"], [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"],
  [".webp", "image/webp"], [".avif", "image/avif"], [".woff2", "font/woff2"], [".ico", "image/x-icon"]
]);

function diskPath(parsed) {
  const pathname = decodeURIComponent(parsed.pathname);
  if (pathname.includes("\0") || pathname.split("/").includes("..")) return null;
  if (pathname.startsWith("/api/") && parsed.search) {
    const key = createHash("sha256").update(parsed.search).digest("hex");
    return path.join(MIRROR, ".query-cache", ...pathname.split("/").filter(Boolean), `${key}.bin`);
  }
  if (pathname === "/") return path.join(MIRROR, "index.html");
  if (routes.has(pathname)) return path.join(MIRROR, ...pathname.split("/").filter(Boolean), "index.html");
  return path.join(MIRROR, ...pathname.split("/").filter(Boolean));
}

async function serve(file, req, res) {
  try {
    if (!(await stat(file)).isFile()) return false;
    const body = await readFile(file);
    const isApi = file.startsWith(path.join(MIRROR, "api") + path.sep) || file.startsWith(path.join(MIRROR, ".query-cache") + path.sep);
    res.statusCode = 200;
    res.setHeader("content-type", isApi ? "application/json; charset=utf-8" : (mime.get(path.extname(file).toLowerCase()) || "application/octet-stream"));
    res.setHeader("x-bawsaq-local", "mirror");
    res.end(req.method === "HEAD" ? undefined : body);
    return true;
  } catch { return false; }
}

async function proxyRead(req, res, parsed, file) {
  try {
    const upstream = await fetch(`${ORIGIN}${parsed.pathname}${parsed.search}`, {
      headers: { accept: req.headers.accept || "*/*", "user-agent": "BAWSAQLocalMirror/1.0" }, redirect: "manual"
    });
    const body = Buffer.from(await upstream.arrayBuffer());
    res.statusCode = upstream.status;
    for (const name of ["content-type", "cache-control", "etag", "last-modified", "location"]) {
      const value = upstream.headers.get(name); if (value) res.setHeader(name, value);
    }
    res.setHeader("x-bawsaq-local", "upstream-read-only");
    if (upstream.ok && file) {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, body);
    }
    res.end(req.method === "HEAD" ? undefined : body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Upstream unavailable", detail: error.message }));
  }
}

http.createServer(async (req, res) => {
  const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (!new Set(["GET", "HEAD"]).has(req.method)) {
    res.statusCode = 403;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "本地前端镜像为只读模式，不会广播交易、启动代币或修改远端数据。" }));
    return;
  }
  const file = diskPath(parsed);
  if (!file) { res.statusCode = 400; res.end("Bad request"); return; }
  if (await serve(file, req, res)) return;
  if (!path.extname(parsed.pathname) && !parsed.pathname.startsWith("/api/")) {
    if (await serve(path.join(MIRROR, "index.html"), req, res)) return;
  }
  await proxyRead(req, res, parsed, file);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`BAWSAQ local mirror: http://127.0.0.1:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});

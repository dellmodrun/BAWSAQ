import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const port = 44000 + (process.pid % 1000);
const child = spawn(process.execPath, ["server.mjs"], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  env: { ...process.env, PORT: String(port) }, stdio: ["ignore", "pipe", "pipe"]
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 30 && !ready; attempt++) {
    await delay(100);
    ready = await fetch(`http://127.0.0.1:${port}/`, { method: "HEAD" }).then(() => true, () => false);
  }
  if (!ready) throw new Error("local server did not start");
  for (const route of ["/", "/explore", "/goods", "/launch", "/ledger", "/earnings", "/docs", "/adminPanel", "/assets/index-Y7lMokl3.js", "/assets/index-BXcgnZ7x.css"]) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!response.ok || !bytes.length) throw new Error(`${route}: HTTP ${response.status}, ${bytes.length} bytes`);
    console.log(`OK ${route} ${bytes.length} bytes ${response.headers.get("x-bawsaq-local") || ""}`);
  }
  const runtimeRoutes = JSON.parse(await readFile(new URL("../runtime-routes.json", import.meta.url), "utf8"));
  for (const route of runtimeRoutes) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
    if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);
  }
  console.log(`OK ${runtimeRoutes.length} dynamic routes`);
  const blocked = await fetch(`http://127.0.0.1:${port}/api/broadcast`, { method: "POST" });
  if (blocked.status !== 403) throw new Error(`write guard: expected 403, got ${blocked.status}`);
  console.log("OK write guard 403");
} finally { child.kill(); }

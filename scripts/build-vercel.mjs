// Assembles Vercel's Build Output API tree (.vercel/output) so Git-imported
// projects deploy correctly: static frontend + one Node serverless function.
// Vercel ignores legacy `builds`/`routes` in vercel.json for Git imports and
// collects whatever this script produces.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

rmSync(out, { recursive: true, force: true });

// 1. Static frontend (vite already built into dist/public)
mkdirSync(join(out, "static"), { recursive: true });
cpSync(join(root, "dist", "public"), join(out, "static"), { recursive: true });

// 2. Serverless function wrapping the bundled Hono server (dist/boot.js)
const fnDir = join(out, "functions", "api", "index.func");
mkdirSync(fnDir, { recursive: true });
cpSync(join(root, "dist", "boot.js"), join(fnDir, "index.js"));
writeFileSync(
  join(fnDir, ".vc-config.json"),
  JSON.stringify({ runtime: "nodejs20.x", handler: "index.js" }, null, 2),
);

// 3. Routing: /api/* -> function, static files, SPA fallback
writeFileSync(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: "^/api/(.*)$", dest: "/api/index" },
        { handle: "filesystem" },
        { src: "^/(.*)$", dest: "/index.html" },
      ],
    },
    null,
    2,
  ),
);

console.log("vercel output: .vercel/output assembled");

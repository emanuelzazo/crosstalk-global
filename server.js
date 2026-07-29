#!/usr/bin/env node
/* CrossTalk Global — zero-dependency static dev server.
   Run with:  npm run dev   (or: node server.js)
   Serves the project root so the multi-page static site works exactly
   as it will when dropped onto Hostinger. No build step, no installs. */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";

    // Resolve safely inside ROOT (prevent path traversal)
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403); return res.end("Forbidden");
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isDirectory()) filePath = path.join(filePath, "index.html");

      fs.readFile(filePath, (err2, data) => {
        if (err2) {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          return res.end("<h1>404 — Not Found</h1><p>" + urlPath + "</p>");
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          "Content-Type": MIME[ext] || "application/octet-stream",
          "Cache-Control": "no-cache",
        });
        res.end(data);
      });
    });
  } catch (e) {
    res.writeHead(500); res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log("\n  CrossTalk Global — dev server running");
  console.log("  ▸ http://localhost:" + PORT + "\n");
});

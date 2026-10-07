// Servidor local mínimo para pré-visualizar dist/. Uso: node tools/serve.mjs
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); res.writeHead(200, { 'Content-Type': T[extname(p)] || 'application/octet-stream' }); res.end(await readFile(p)); }
  catch { res.writeHead(404, { 'Content-Type': T['.html'] }); res.end(await readFile('dist/404.html')); }
}).listen(4324, () => console.log('http://localhost:4324'));

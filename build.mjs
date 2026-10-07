// Gera o site estático em dist/. Uso: node build.mjs
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { business, categories } from './src/data.mjs';
import { homePage, categoryPage, deliveryPage, notFoundPage } from './src/templates.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const pages = [];
const write = (path, html, priority = '0.7') => {
  const file = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, html);
  if (!path.endsWith('.html')) pages.push({ path, priority });
};

write('/', homePage(), '1.0');
for (const c of categories) write(`/produtos/${c.slug}/`, categoryPage(c), '0.8');
write('/delivery/', deliveryPage(), '0.9');
write('/404.html', notFoundPage());

cpSync('public', OUT, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${business.siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${business.siteUrl}/sitemap.xml\n`);
console.log(`${pages.length} páginas geradas em ${OUT}/`);

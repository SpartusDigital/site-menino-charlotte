// Ícones Lucide (ISC) e logos Simple Icons (CC0), embutidos como SVG inline.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), 'icons');
const BRANDS = new Set(['whatsapp', 'instagram', 'google', 'facebook']);
const cache = {};

for (const f of readdirSync(dir)) {
  if (!f.endsWith('.svg')) continue;
  const name = f.replace('.svg', '');
  let svg = readFileSync(join(dir, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
  if (BRANDS.has(name)) {
    svg = svg.replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg fill="currentColor" ');
  } else {
    svg = svg.replace(/ class="[^"]*"/, '').replace(/ width="24"/, '').replace(/ height="24"/, '').replace('stroke-width="2"', 'stroke-width="1.75"');
  }
  cache[name] = svg.replace('<svg ', `<svg class="i i--${name}" aria-hidden="true" focusable="false" `);
}

export function icon(name) {
  if (!cache[name]) throw new Error(`Ícone não encontrado: ${name}`);
  return cache[name];
}

# Site Pet Shop Menino & Charllote (Trobogy, Salvador/BA)

Site estático gerado por Node, sem dependências. Publicado em https://petshopmeninoecharllote.com.br (deploy automático na branch master).

- `npm run build`: gera `dist/`
- `npm run dev`: gera e abre em http://localhost:4324

## Onde editar
- `src/data.mjs`: telefone, endereço, horário, categorias de produtos e FAQ
- `src/templates.mjs`: HTML das páginas
- `src/art.mjs`: ilustrações SVG (marca, balança, pet do enxoval)
- `public/assets/styles.css` e `public/assets/main.js`: visual e interações (balança de ração, enxoval)
- `public/img/`: fotos reais otimizadas. Originais em `tools/originais/`

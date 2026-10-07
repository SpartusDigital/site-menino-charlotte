import { business as B, categories, homeFaq, wa, mapsLink, mapsEmbed } from './data.mjs';
import { icon } from './icons.mjs';
import { mark, scaleArt, scoopArt, dressArt } from './art.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (path) => B.siteUrl + path;
const WA_DEFAULT = 'Olá, Menino & Charllote! Vim pelo site e quero fazer um pedido.';
const hoursText = (h) => `${h.open.replace(':00', 'h')} às ${h.close.replace(':00', 'h')}`;
const pic = (name, sizes, alt, w, h, { eager = false, cls = '' } = {}) =>
  `<img class="${cls}" src="/img/${name}-${sizes[sizes.length - 1]}.webp" srcset="${sizes.map((s) => `/img/${name}-${s}.webp ${s}w`).join(', ')}" sizes="(max-width: 760px) 92vw, 560px" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

// ---------------------------------------------------------------------------
// Schema.org
// ---------------------------------------------------------------------------
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'PetStore'],
    '@id': url('/#business'),
    name: B.name,
    alternateName: B.alternateName,
    description: 'Pet shop no Trobogy, em Salvador: ração para cães e gatos (também a granel), petiscos, brinquedos, coleiras, comedouros, casinhas, higiene e antipulgas, com delivery pelo WhatsApp.',
    url: url('/'),
    telephone: B.phoneE164,
    image: [url('/img/og-fachada.jpg'), url('/img/fachada-1000.webp')],
    logo: url('/icon-512.png'),
    priceRange: '$',
    address: { '@type': 'PostalAddress', streetAddress: B.address.street, addressLocality: B.address.city, addressRegion: B.address.state, postalCode: B.address.zip, addressCountry: B.address.country },
    geo: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng },
    hasMap: mapsLink,
    openingHoursSpecification: B.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => `https://schema.org/${d}`), opens: h.open, closes: h.close })),
    areaServed: [{ '@type': 'Place', name: 'Trobogy, Salvador' }, { '@type': 'City', name: 'Salvador, BA' }],
    sameAs: [B.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produtos para cães e gatos',
      itemListElement: categories.map((c) => ({ '@type': 'OfferCatalog', name: c.title, url: url(`/produtos/${c.slug}/`) })),
    },
  };
}
const breadcrumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url(path) })) });
const faqSchema = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export function layout({ title, desc, path, body, schemas = [], waText = WA_DEFAULT, noindex = false }) {
  const canonical = url(path);
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#fffbf2">
<meta name="geo.region" content="BR-BA">
<meta name="geo.placename" content="${B.address.city}">
<meta name="geo.position" content="${B.geo.lat};${B.geo.lng}">
<meta name="ICBM" content="${B.geo.lat}, ${B.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(B.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${url('/img/og-fachada.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${header()}
<main id="conteudo">
${body}
</main>
${footer()}
${mobileBar(waText)}
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}

function logo() {
  return `<a class="logo" href="/" aria-label="${esc(B.name)}, página inicial">
  ${mark('logo__mark')}
  <span class="logo__word"><small>Pet Shop</small><span>Menino <i>&amp;</i> Charllote</span></span>
</a>`;
}

function header() {
  return `<header class="nav" data-nav>
  <div class="nav__inner">
    ${logo()}
    <nav class="nav__links" aria-label="Principal" id="menu">
      <a href="/#produtos">Produtos</a>
      <a href="/#balanca">Calculadora de ração</a>
      <a href="/#enxoval">Monte o enxoval</a>
      <a href="/delivery/">Delivery</a>
      <a href="/#contato">Contato</a>
    </nav>
    <a class="btn btn--sm btn--primary nav__cta" href="${wa(WA_DEFAULT)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Pedir</span></a>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu" data-menu>${icon('menu')}${icon('x')}</button>
  </div>
</header>`;
}

function footer() {
  return `<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      ${logo()}
      <p>Ração, petiscos, acessórios e cuidado para cães e gatos, no Trobogy, em Salvador. Pediu no WhatsApp, chega em casa.</p>
      <div class="footer__social">
        <a href="${B.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
        <a href="${wa(WA_DEFAULT)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
        <a href="${B.googleProfile}" target="_blank" rel="noopener" aria-label="Google">${icon('google')}</a>
      </div>
    </div>
    <div>
      <h2 class="footer__h">Produtos</h2>
      <ul>${categories.map((c) => `<li><a href="/produtos/${c.slug}/">${c.short}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer__h">Loja</h2>
      <address>${B.address.street}<br>${B.address.district}, ${B.address.city} - ${B.address.state}<br>CEP ${B.address.zip}<br><a href="tel:${B.phoneE164}">${B.phoneDisplay}</a></address>
      <ul class="footer__hours">${B.hours.map((h) => `<li><span>${h.label}</span><span>${hoursText(h)}</span></li>`).join('')}</ul>
      <p class="footer__links"><a href="/delivery/">Delivery de ração no Trobogy</a></p>
    </div>
  </div>
  <div class="wrap footer__base">
    <span>&copy; ${new Date().getFullYear()} ${esc(B.name)}</span>
    <span>Salvador, Bahia.</span>
  </div>
</footer>`;
}

function mobileBar(waText) {
  return `<div class="mbar" aria-label="Atalhos de contato">
  <a class="mbar__btn" href="${mapsLink}" target="_blank" rel="noopener">${icon('navigation')}<span>Como chegar</span></a>
  <a class="mbar__btn mbar__btn--wa" href="${wa(waText)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Pedir no WhatsApp</span></a>
</div>`;
}

// ---------------------------------------------------------------------------
// Blocos
// ---------------------------------------------------------------------------
const stars = () => `<span class="stars" aria-hidden="true">${icon('star').repeat(5)}</span>`;
function proof() {
  return `<ul class="proof">
  <li>${icon('bike')}<span>Delivery pelo WhatsApp</span></li>
  <li>${icon('clock')}<span>Aberto todos os dias</span></li>
  <li><a href="${B.googleProfile}" target="_blank" rel="noopener">${icon('google')}<span><b>${B.rating.value}</b> ${stars()}</span></a></li>
</ul>`;
}
function crumbs(items) {
  return `<nav class="crumbs" aria-label="Você está em"><ol>${items.map(([n, p], i) => (i === items.length - 1 ? `<li aria-current="page">${n}</li>` : `<li><a href="${p}">${n}</a></li>`)).join('')}</ol></nav>`;
}

function scaleWidget() {
  const seg = (name, opts) => `<div class="seg" role="radiogroup">${opts.map(([v, l], i) => `<label><input type="radio" name="${name}" value="${v}"${i === (name === 'idade' ? 1 : 0) ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>`;
  return `<div class="scale" id="balanca" data-scale>
  <div class="scale__head">
    <p class="scale__title">${icon('scale')} Quanto seu pet come por dia?</p>
    ${seg('pet', [['cao', 'Cão'], ['gato', 'Gato']])}
  </div>
  <div class="scale__stage" aria-hidden="true">
    <div class="scoop-wrap" data-scoop>${scoopArt}</div>
    <div class="kibbles" data-kibbles></div>
    <div class="pile" data-pile></div>
    ${scaleArt}
    <div class="lcd"><span data-lcd>0</span><small>g/dia</small></div>
  </div>
  <div class="scale__ctrls">
    <div class="field">
      <div class="field__top"><label for="peso">Peso do pet</label><output for="peso" data-peso-out>10 kg</output></div>
      <input id="peso" type="range" min="1" max="45" step="1" value="10" data-peso>
    </div>
    <div class="field">
      <span class="field__label" id="idade-l">Fase da vida</span>
      ${seg('idade', [['filhote', 'Filhote'], ['adulto', 'Adulto'], ['idoso', 'Idoso']])}
    </div>
  </div>
  <div class="scale__result" aria-live="polite">
    <p data-result>Cerca de <b>170 g por dia</b>, divididos em 2 refeições.</p>
    <div class="bags">
      <span class="field__label">Com um saco de</span>
      <div class="seg seg--bags" role="radiogroup">${[1, 3, 10, 15].map((k, i) => `<label><input type="radio" name="saco" value="${k}"${i === 3 ? ' checked' : ''}><span>${k} kg</span></label>`).join('')}</div>
    </div>
    <p class="scale__last" data-last>dura uns <b>88 dias</b>. Acaba por volta de <b>—</b>.</p>
    <a class="btn btn--primary btn--block" data-scale-wa href="${wa(WA_DEFAULT)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Pedir essa ração no WhatsApp</span></a>
    <p class="scale__note">Estimativa para ração seca premium. Siga a tabela da embalagem e a orientação do veterinário.</p>
  </div>
</div>`;
}

const ACC = [
  ['coleira', 'Coleira', ['#1f6fb2', '#e5483d', '#f7c843', '#ef7aa1', '#16202c']],
  ['plaquinha', 'Plaquinha', null],
  ['bandana', 'Bandana', ['#e5483d', '#1f6fb2', '#2f9e6b', '#f7c843']],
  ['laco', 'Laço', ['#ef7aa1', '#e5483d', '#1f6fb2', '#f7c843']],
  ['guia', 'Guia', ['#1f6fb2', '#e5483d', '#16202c']],
  ['bolinha', 'Bolinha', null],
  ['comedouro', 'Comedouro', null],
  ['caminha', 'Caminha', ['#e5483d', '#1f6fb2', '#f7c843']],
];
function dressWidget() {
  return `<div class="dress" data-dress>
  <div class="dress__stage">
    <div class="seg seg--pet" role="radiogroup" aria-label="Escolha o pet">
      <label><input type="radio" name="dpet" value="dog" checked><span>${icon('dog')}Cão</span></label>
      <label><input type="radio" name="dpet" value="cat"><span>${icon('cat')}Gato</span></label>
    </div>
    ${dressArt}
    <p class="dress__count"><b data-count>0</b> itens no enxoval</p>
  </div>
  <div class="dress__panel">
    <ul class="dress__list">
      ${ACC.map(([k, label, colors]) => `<li class="acc-row" data-row="${k}">
        <button type="button" class="acc-btn" data-toggle="${k}" aria-pressed="false"><span class="acc-btn__box">${icon('check')}</span>${label}</button>
        ${colors ? `<div class="swatches" role="radiogroup" aria-label="Cor da ${label.toLowerCase()}">${colors.map((c, i) => `<button type="button" class="sw${i === 0 ? ' is-on' : ''}" data-color="${k}" data-value="${c}" style="--sw:${c}" aria-label="Cor ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div>` : ''}
      </li>`).join('')}
    </ul>
    <div class="dress__actions">
      <button type="button" class="chip-btn" data-dress-all>${icon('sparkles')}<span>Vestir tudo</span></button>
      <button type="button" class="chip-btn" data-dress-clear>${icon('rotate-ccw')}<span>Limpar</span></button>
    </div>
    <a class="btn btn--primary btn--block" data-dress-wa href="${wa('Olá! Montei um enxoval no site e quero consultar os itens.')}" target="_blank" rel="noopener" aria-disabled="true">${icon('whatsapp')}<span>Consultar esses itens</span></a>
    <p class="dress__note">Modelos e cores variam conforme o estoque. A gente mostra as opções pelo WhatsApp.</p>
  </div>
</div>`;
}

function catCards(exclude = '') {
  return `<div class="cats">${categories.filter((c) => c.slug !== exclude).map((c, i) => `<a class="cat reveal" style="--d:${i % 3}" href="/produtos/${c.slug}/">
    <span class="cat__icon">${icon(c.icon)}</span>
    <h3>${c.short}</h3>
    <p>${c.lead.split('. ')[0].replace(/\.$/, '')}.</p>
    <span class="cat__go">${icon('arrow-right')}</span>
  </a>`).join('')}</div>`;
}

function faqBlock(faq, heading = 'Perguntas frequentes') {
  return `<section class="section faq" aria-labelledby="faq-h">
  <div class="wrap wrap--narrow">
    <h2 id="faq-h" class="h2 reveal">${heading}</h2>
    <div class="faq__list">${faq.map(([q, a]) => `<details class="faq__item reveal"><summary><span>${esc(q)}</span>${icon('chevron-down')}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  </div>
</section>`;
}

function deliveryBand() {
  return `<section class="delivery" aria-labelledby="dl-h">
  <div class="wrap delivery__grid">
    <div class="reveal">
      <p class="eyebrow eyebrow--light">${icon('bike')} Delivery</p>
      <h2 id="dl-h" class="h2">Acabou a ração? Chama no zap.</h2>
      <p>Entregamos no Trobogy e região. Você manda o pedido, a gente separa e leva até a sua porta.</p>
      <a class="btn btn--light" href="/delivery/">Como funciona o delivery ${icon('arrow-right')}</a>
    </div>
    <ol class="steps reveal">
      <li><span>1</span><div><b>Manda a mensagem</b><small>Diga a ração, o tamanho do saco e o endereço.</small></div></li>
      <li><span>2</span><div><b>A gente separa</b><small>Confirmamos o pedido e o valor pelo WhatsApp.</small></div></li>
      <li><span>3</span><div><b>Chega em casa</b><small>Entrega no Trobogy e bairros próximos.</small></div></li>
    </ol>
  </div>
</section>`;
}

function locationBlock() {
  return `<section class="section location" id="contato" aria-labelledby="loc-h">
  <div class="wrap location__grid">
    <div class="reveal">
      <p class="eyebrow">Loja</p>
      <h2 id="loc-h" class="h2">Na Rua Mocambo, no Trobogy.</h2>
      <p class="status" data-open-status="${esc(JSON.stringify(B.hours.map((h) => [h.days, h.open, h.close])))}"><span class="status__dot"></span><span>Horário de atendimento</span></p>
      <address class="location__addr">${icon('map-pin')}<span>${B.address.street}<br>${B.address.district}, ${B.address.city} - ${B.address.state}<br>CEP ${B.address.zip}</span></address>
      <ul class="hours">${B.hours.map((h) => `<li><span>${h.label}</span><span>${hoursText(h)}</span></li>`).join('')}</ul>
      <div class="btns">
        <a class="btn btn--primary" href="${wa(WA_DEFAULT)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${B.phoneDisplay}</span></a>
        <a class="btn btn--ghost" href="${mapsLink}" target="_blank" rel="noopener">${icon('navigation')}<span>Como chegar</span></a>
      </div>
    </div>
    <div class="location__media reveal">
      ${pic('fachada', [600, 1000], 'Fachada do Pet Shop Menino & Charllote na Rua Mocambo, no Trobogy', 1000, 1333, { cls: 'location__facade' })}
      <iframe title="Mapa do Pet Shop Menino & Charllote" src="${mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;
}

function reviewBlock() {
  return `<section class="section review" aria-labelledby="rv-h">
  <div class="wrap review__inner reveal">
    <div class="review__score"><span>${B.rating.value}</span>${stars()}</div>
    <div>
      <h2 id="rv-h" class="review__t">Já comprou com a gente?</h2>
      <p>Sua avaliação no Google ajuda outros tutores do Trobogy a encontrar a loja. Leva um minuto.</p>
      <a class="btn btn--ghost" href="${B.googleProfile}" target="_blank" rel="noopener">${icon('google')}<span>Avaliar no Google</span></a>
    </div>
  </div>
</section>`;
}

function ctaBand(text = WA_DEFAULT) {
  return `<section class="cta-band" aria-label="Pedido">
  <div class="wrap cta-band__inner reveal">
    ${mark('cta-band__mark')}
    <h2 class="h2">Tudo que seu pet precisa, pertinho de você.</h2>
    <a class="btn btn--primary btn--lg" href="${wa(text)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Pedir no WhatsApp</span></a>
  </div>
</section>`;
}

const SIGN = ['Rações', 'Petiscos', 'Brinquedos', 'Medicações', 'Higiene', 'Comedouros', 'Casinhas', 'Coleiras', 'Acessórios'];

// ---------------------------------------------------------------------------
// Páginas
// ---------------------------------------------------------------------------
export function homePage() {
  const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <h1 id="hero-h"><span class="hero__kicker">${icon('map-pin')} Pet shop no Trobogy, Salvador</span><span class="hero__big">Ração, petisco e carinho. <em>Entregue em casa.</em></span></h1>
      <p class="lead">Ração para cães e gatos em saco ou a granel, petiscos, brinquedos, coleiras, higiene e antipulgas. Peça pelo WhatsApp e receba no Trobogy e região.</p>
      <div class="btns">
        <a class="btn btn--primary btn--lg" href="${wa(WA_DEFAULT)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Pedir no WhatsApp</span></a>
        <a class="btn btn--ghost btn--lg" href="#produtos"><span>Ver produtos</span></a>
      </div>
      ${proof()}
    </div>
    <div class="hero__play">${scaleWidget()}</div>
  </div>
</section>

<div class="sign" aria-label="O que você encontra na loja">
  <div class="sign__track">${SIGN.concat(SIGN).map((s, i) => `<span${i >= SIGN.length ? ' aria-hidden="true"' : ''}>${s}</span>${icon('paw-print')}`).join('')}</div>
</div>

<section class="section" id="produtos" aria-labelledby="pr-h">
  <div class="wrap">
    <div class="section__head reveal">
      <p class="eyebrow">Produtos</p>
      <h2 id="pr-h" class="h2">Tudo para cães e gatos, em um lugar só.</h2>
      <p>A lista do nosso letreiro, uma por uma. Não achou o que procura? Pergunte no WhatsApp.</p>
    </div>
    ${catCards()}
  </div>
</section>

<section class="section granel" aria-labelledby="gr-h">
  <div class="wrap granel__grid">
    <div class="granel__photos reveal">
      ${pic('interior', [640], 'Interior da loja com dispensers de ração a granel', 640, 800, { cls: 'granel__a' })}
      ${pic('parede-racoes', [480], 'Parede de sacos de ração na entrada do pet shop', 480, 1080, { cls: 'granel__b' })}
    </div>
    <div class="reveal">
      <p class="eyebrow">A granel</p>
      <h2 id="gr-h" class="h2">Ração pesada na hora.</h2>
      <p class="lead">Quer testar uma ração nova antes de levar o saco fechado? Ou só precisa de um pouco até o fim do mês? Leve a quantidade que quiser, pesada na sua frente.</p>
      <ul class="ticks">
        <li>${icon('check')}<span>Experimente antes de comprar o saco inteiro</span></li>
        <li>${icon('check')}<span>Sacos fechados de várias marcas e tamanhos</span></li>
        <li>${icon('check')}<span>Linhas para filhote, adulto, idoso e castrado</span></li>
      </ul>
      <a class="link" href="#balanca">${icon('scale')} Calcule quanto seu pet come por dia</a>
    </div>
  </div>
</section>

<section class="section enxoval" id="enxoval" aria-labelledby="ex-h">
  <div class="wrap">
    <div class="section__head section__head--center reveal">
      <p class="eyebrow">Monte o enxoval</p>
      <h2 id="ex-h" class="h2">Vista o seu pet.</h2>
      <p>Escolha coleira, bandana, laço, guia e o que mais quiser. No fim, mande a lista para a gente ver o que tem na loja.</p>
    </div>
    ${dressWidget()}
  </div>
</section>

${deliveryBand()}

<section class="section higiene" aria-labelledby="hg-h">
  <div class="wrap higiene__grid">
    <div class="reveal">
      <p class="eyebrow">Higiene e banho</p>
      <h2 id="hg-h" class="h2">O banho em casa também é com a gente.</h2>
      <p class="lead">Shampoos e condicionadores, linha para filhotes, sabonetes, gel dental e escovas. E os produtos de uso veterinário que o seu pet precisa.</p>
      <div class="btns">
        <a class="btn btn--ghost" href="/produtos/higiene-e-banho/">Ver higiene e banho ${icon('arrow-right')}</a>
      </div>
    </div>
    <div class="higiene__photos reveal">
      ${pic('shampoos', [640, 1200], 'Shampoos para cães e gatos à venda no Pet Shop Menino & Charllote', 1200, 655, { cls: 'higiene__a' })}
      ${pic('higiene', [640, 1200], 'Prateleira com sabonetes, gel dental e produtos de higiene pet', 1200, 900, { cls: 'higiene__b' })}
    </div>
  </div>
</section>

${reviewBlock()}
${faqBlock(homeFaq)}
${locationBlock()}
${ctaBand()}
`;
  return layout({
    title: 'Pet Shop no Trobogy, Salvador | Ração com Delivery | Menino & Charllote',
    desc: 'Pet shop no Trobogy, Salvador: ração para cães e gatos em saco ou a granel, petiscos, brinquedos, coleiras e higiene. Delivery pelo WhatsApp.',
    path: '/',
    body,
    schemas: [businessSchema(), faqSchema(homeFaq), { '@context': 'https://schema.org', '@type': 'WebSite', name: B.name, url: url('/'), inLanguage: 'pt-BR' }],
  });
}

export function categoryPage(c) {
  const path = `/produtos/${c.slug}/`;
  const waText = `Olá, Menino & Charllote! Vim pelo site e quero saber sobre ${c.short.toLowerCase()}.`;
  const trail = [['Início', '/'], ['Produtos', '/#produtos'], [c.short, path]];
  const visual = c.photo
    ? `<figure class="page-hero__photo">${pic(c.photo, [640, 1200], `${c.title} no Pet Shop Menino & Charllote`, 1200, c.photo === 'shampoos' ? 655 : 900, { eager: true })}</figure>`
    : `<div class="page-hero__icon" aria-hidden="true">${icon(c.icon)}${mark('page-hero__mark')}</div>`;
  const body = `
<section class="page-hero" aria-labelledby="ph-h">
  <div class="wrap page-hero__grid">
    <div>
      ${crumbs(trail)}
      <p class="eyebrow">${icon(c.icon)} Produtos</p>
      <h1 id="ph-h" class="h1">${c.title} <span>no Trobogy, Salvador</span></h1>
      <p class="lead">${c.lead}</p>
      <div class="btns">
        <a class="btn btn--primary btn--lg" href="${wa(waText)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Consultar no WhatsApp</span></a>
        <a class="btn btn--ghost btn--lg" href="${mapsLink}" target="_blank" rel="noopener">${icon('navigation')}<span>Como chegar</span></a>
      </div>
      ${proof()}
    </div>
    ${visual}
  </div>
</section>

<section class="section section--paper" aria-labelledby="it-h">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Na loja</p>
      <h2 id="it-h" class="h2">O que você encontra.</h2>
      <ul class="ticks">${c.items.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
      <p class="note">${icon('message-circle')}<span>Marcas e tamanhos variam conforme o estoque. Pergunte pelo WhatsApp antes de vir ou peça com entrega.</span></p>
    </div>
    <aside class="tip reveal">
      <p class="eyebrow">${icon('sparkles')} Dica</p>
      <h2 class="tip__t">${c.tip[0]}</h2>
      <p>${c.tip[1]}</p>
    </aside>
  </div>
</section>

${c.slug.startsWith('racao') ? `<section class="section" aria-labelledby="cl-h"><div class="wrap calc-cta reveal"><div><p class="eyebrow">Calculadora</p><h2 id="cl-h" class="h2">Quanto dura um saco de ração?</h2><p class="lead">Coloque o peso e a idade do seu pet na balança e veja quantos dias o saco dura.</p></div><a class="btn btn--primary btn--lg" href="/#balanca">${icon('scale')}<span>Abrir a calculadora</span></a></div></section>` : ''}

${faqBlock(c.faq, `Dúvidas sobre ${c.short.toLowerCase()}`)}

<section class="section" aria-labelledby="ot-h">
  <div class="wrap">
    <div class="section__head reveal"><p class="eyebrow">Mais produtos</p><h2 id="ot-h" class="h2">Aproveite e leve junto.</h2></div>
    ${catCards(c.slug)}
  </div>
</section>

${deliveryBand()}
${locationBlock()}
${ctaBand(waText)}
`;
  return layout({
    title: c.metaTitle,
    desc: c.metaDesc,
    path,
    body,
    waText,
    schemas: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${c.title} no Trobogy, Salvador`, description: c.metaDesc, url: url(path), about: c.title, isPartOf: { '@id': url('/#business') } },
      businessSchema(),
      breadcrumbSchema(trail),
      faqSchema(c.faq),
    ],
  });
}

export function deliveryPage() {
  const path = '/delivery/';
  const waText = 'Olá, Menino & Charllote! Quero fazer um pedido com entrega. Meu endereço é: ';
  const trail = [['Início', '/'], ['Delivery', path]];
  const faq = [
    ['Vocês entregam no meu bairro?', 'Entregamos no Trobogy e região. Mande seu endereço pelo WhatsApp e confirmamos na hora.'],
    ['Como pago o pedido?', 'Combinamos a forma de pagamento pelo WhatsApp quando confirmamos o pedido.'],
    ['Posso pedir ração a granel com entrega?', 'Pode. Diga a ração e a quantidade, e a gente pesa e embala para você.'],
  ];
  const body = `
<section class="page-hero" aria-labelledby="ph-h">
  <div class="wrap page-hero__grid">
    <div>
      ${crumbs(trail)}
      <p class="eyebrow">${icon('bike')} Delivery</p>
      <h1 id="ph-h" class="h1">Delivery de ração <span>no Trobogy, Salvador</span></h1>
      <p class="lead">Acabou a ração, a areia ou o petisco? Mande uma mensagem e receba em casa, no Trobogy e região.</p>
      <div class="btns">
        <a class="btn btn--primary btn--lg" href="${wa(waText)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>Fazer pedido</span></a>
      </div>
      ${proof()}
    </div>
    <figure class="page-hero__photo">${pic('parede-racoes', [480], 'Sacos de ração prontos para entrega no Pet Shop Menino & Charllote', 480, 1080, { eager: true })}</figure>
  </div>
</section>
${deliveryBand()}
<section class="section section--paper" aria-labelledby="dp-h">
  <div class="wrap wrap--narrow prose reveal">
    <h2 id="dp-h" class="h2">Pedido rápido, sem sair de casa</h2>
    <p>Para agilizar, mande na primeira mensagem: o nome da ração ou do produto, o tamanho do saco (ou a quantidade, se for a granel) e o endereço de entrega com um ponto de referência.</p>
    <p>Se não lembra a marca, mande uma foto da embalagem antiga. A gente encontra a mesma ração ou sugere uma equivalente.</p>
    <p>Quer saber quanto tempo o saco vai durar? Use a <a href="/#balanca">calculadora de ração</a> e já peça a reposição antes de acabar.</p>
  </div>
</section>
${faqBlock(faq, 'Dúvidas sobre o delivery')}
${locationBlock()}
${ctaBand(waText)}
`;
  return layout({ title: 'Delivery de Ração no Trobogy, Salvador | Menino & Charllote', desc: 'Delivery de ração, petiscos e produtos pet no Trobogy, Salvador. Peça pelo WhatsApp (71) 99627-1403 e receba em casa.', path, body, waText, schemas: [businessSchema(), breadcrumbSchema(trail), faqSchema(faq)] });
}

export function notFoundPage() {
  return layout({
    title: 'Página não encontrada | Menino & Charllote',
    desc: 'A página que você procurou não existe.',
    path: '/404.html',
    noindex: true,
    body: `<section class="page-hero"><div class="wrap wrap--narrow" style="text-align:center">
  ${mark('nf-mark')}
  <h1 class="h1">Essa página fugiu de casa.</h1>
  <p class="lead" style="margin-inline:auto">Mas a ração do seu pet a gente entrega.</p>
  <div class="btns" style="justify-content:center"><a class="btn btn--primary btn--lg" href="/">Voltar ao início</a></div>
</div></section>`,
  });
}

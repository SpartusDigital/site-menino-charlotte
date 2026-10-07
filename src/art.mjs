// Ilustrações em SVG no traço do logo (linha azul, manchas amarelas).

// Marca: gato + cachorro ligados por uma linha contínua
let markN = 0;
export const mark = (cls = 'mark') => { const n = ++markN; return `<svg class="${cls}" viewBox="0 0 132 64" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="mk-c${n}"><circle cx="34" cy="36" r="18"/></clipPath>
    <clipPath id="mk-d${n}"><circle cx="96" cy="36" r="18"/></clipPath>
  </defs>
  <circle cx="34" cy="36" r="18" fill="#fff"/>
  <path d="M34 18 H54 V54 H34 Z" fill="var(--yellow)" clip-path="url(#mk-c${n})" opacity=".9"/>
  <circle cx="96" cy="36" r="18" fill="#fff"/>
  <ellipse cx="104" cy="30" rx="10" ry="11" fill="var(--yellow)" clip-path="url(#mk-d${n})" opacity=".9"/>
  <g fill="none" stroke="var(--mark, #1f6fb2)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 24 L17 8 L33 18"/>
    <path d="M33 18 A18 18 0 1 1 20.6 23.6"/>
    <path d="M48 47 C 58 60, 72 58, 79 44"/>
    <path d="M79 44 A18 18 0 1 1 111 46"/>
    <path d="M104 20 C 118 22, 124 40, 116 54 C 112 58, 106 54, 108 46"/>
  </g>
  <g fill="var(--mark, #1f6fb2)">
    <circle cx="28" cy="34" r="2.4"/><circle cx="40" cy="34" r="2.4"/>
    <path d="M31.5 40 h5 l-2.5 3 z"/>
    <circle cx="89" cy="32" r="2.4"/><circle cx="101" cy="32" r="2.4"/>
  </g>
  <path d="M89 41 q3.5 4 7 0 q3.5 4 7 0" fill="none" stroke="var(--mark, #1f6fb2)" stroke-width="2.6" stroke-linecap="round"/>
</svg>` };

// Balança com tigela (a concha e os grãos são HTML animado por cima)
export const scaleArt = `<svg class="scale__art" viewBox="0 0 360 250" aria-hidden="true" focusable="false">
  <ellipse cx="180" cy="238" rx="150" ry="10" fill="rgba(18,62,102,.10)"/>
  <!-- base -->
  <path d="M46 160 Q46 150 56 150 H304 Q314 150 314 160 L300 226 Q298 234 290 234 H70 Q62 234 60 226 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <rect x="122" y="172" width="116" height="42" rx="9" fill="#16202c"/>
  <circle cx="86" cy="192" r="9" fill="none" stroke="var(--ink)" stroke-width="2.6"/>
  <circle cx="274" cy="192" r="9" fill="var(--red)" stroke="var(--ink)" stroke-width="2.6"/>
  <!-- prato -->
  <rect x="70" y="138" width="220" height="12" rx="6" fill="var(--yellow)" stroke="var(--ink)" stroke-width="3"/>
  <!-- tigela -->
  <path d="M92 86 H268 Q262 138 214 138 H146 Q98 138 92 86 Z" fill="var(--blue)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M104 98 Q118 128 150 130" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="180" cy="86" rx="88" ry="9" fill="#0e3558" stroke="var(--ink)" stroke-width="3"/>
</svg>`;

export const scoopArt = `<svg class="scoop" viewBox="0 0 120 80" aria-hidden="true" focusable="false">
  <path d="M8 22 L78 22 Q80 58 46 62 Q12 58 8 22 Z" fill="#e9eef3" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="43" cy="22" rx="35" ry="6" fill="#c9a06a" stroke="var(--ink)" stroke-width="3"/>
  <path d="M78 26 L114 12" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>
  <path d="M78 26 L114 12" stroke="var(--red)" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;

// Pet para o "enxoval": cachorro e gato com pescoço e patas na mesma posição,
// para os acessórios servirem nos dois.
const INK = 'var(--ink)';
export const dressArt = `<svg class="dress__art" viewBox="0 0 320 360" role="img" aria-labelledby="dress-t">
  <title id="dress-t">Ilustração de um pet que você pode vestir com acessórios</title>
  <g class="acc acc--caminha" data-acc="caminha">
    <ellipse cx="160" cy="322" rx="132" ry="28" fill="var(--c-caminha, #e5483d)" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="160" cy="316" rx="104" ry="17" fill="#fff4d6" stroke="${INK}" stroke-width="2.5"/>
  </g>
  <g class="acc acc--guia" data-acc="guia">
    <path d="M186 192 C 230 196, 262 150, 300 96" fill="none" stroke="var(--c-guia, #1f6fb2)" stroke-width="6" stroke-linecap="round"/>
    <rect x="290" y="70" width="22" height="34" rx="9" fill="var(--c-guia, #1f6fb2)" stroke="${INK}" stroke-width="3"/>
  </g>

  <g class="pet pet--dog">
    <path d="M206 286 C 236 282, 246 250, 236 232" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <ellipse cx="108" cy="290" rx="30" ry="22" fill="#fff" stroke="${INK}" stroke-width="3.2"/>
    <ellipse cx="212" cy="290" rx="30" ry="22" fill="#fff" stroke="${INK}" stroke-width="3.2"/>
    <path d="M114 304 C 104 236, 110 172, 160 168 C 210 172, 216 236, 206 304 Z" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="176" cy="240" rx="18" ry="24" fill="var(--yellow)" opacity=".85"/>
    <path d="M138 248 V300 M182 248 V300" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="136" cy="306" rx="15" ry="9" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="184" cy="306" rx="15" ry="9" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="160" cy="132" rx="56" ry="50" fill="#fff" stroke="${INK}" stroke-width="3.2"/>
    <ellipse cx="182" cy="120" rx="20" ry="18" fill="var(--yellow)"/>
    <path d="M110 108 C 88 118, 86 168, 102 176 C 114 180, 120 160, 118 140" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M210 108 C 232 118, 234 168, 218 176 C 206 180, 200 160, 202 140" fill="var(--yellow)" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="140" cy="126" r="6" fill="${INK}"/><circle cx="180" cy="126" r="6" fill="${INK}"/>
    <circle cx="142" cy="124" r="1.8" fill="#fff"/><circle cx="182" cy="124" r="1.8" fill="#fff"/>
    <ellipse cx="160" cy="154" rx="24" ry="17" fill="#fff" stroke="${INK}" stroke-width="2.8"/>
    <ellipse cx="160" cy="146" rx="8.5" ry="6" fill="${INK}"/>
    <path d="M148 160 q6 7 12 0 q6 7 12 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
  </g>

  <g class="pet pet--cat is-off">
    <path d="M200 300 C 252 300, 262 250, 232 236 C 220 232, 214 246, 226 252" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M120 304 C 112 240, 118 174, 160 170 C 202 174, 208 240, 200 304 Z" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M140 196 C 150 220, 170 220, 180 196" fill="var(--yellow)" opacity=".85"/>
    <path d="M142 250 V300 M178 250 V300" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="140" cy="306" rx="13" ry="8" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="180" cy="306" rx="13" ry="8" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <path d="M112 112 L106 62 L146 90" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M208 112 L214 62 L174 90" fill="var(--yellow)" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="160" cy="134" rx="54" ry="46" fill="#fff" stroke="${INK}" stroke-width="3.2"/>
    <path d="M160 88 C 190 88, 212 104, 213 128 C 196 130, 176 118, 170 92 Z" fill="var(--yellow)" opacity=".9"/>
    <ellipse cx="140" cy="128" rx="5.5" ry="7" fill="${INK}"/><ellipse cx="180" cy="128" rx="5.5" ry="7" fill="${INK}"/>
    <circle cx="141.5" cy="125" r="1.8" fill="#fff"/><circle cx="181.5" cy="125" r="1.8" fill="#fff"/>
    <path d="M155 146 h10 l-5 6 z" fill="${INK}"/>
    <path d="M160 152 v4 M152 160 q8 6 16 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M116 146 L92 140 M116 154 L92 158 M204 146 L228 140 M204 154 L228 158" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g class="acc acc--bandana" data-acc="bandana">
    <path d="M122 182 L198 182 L160 230 Z" fill="var(--c-bandana, #e5483d)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#fff" opacity=".8"><circle cx="146" cy="194" r="3"/><circle cx="170" cy="192" r="3"/><circle cx="158" cy="210" r="3"/><circle cx="182" cy="200" r="2.4"/><circle cx="138" cy="186" r="2.4"/></g>
  </g>
  <g class="acc acc--coleira" data-acc="coleira">
    <path d="M118 176 Q160 198 202 176" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
    <path d="M118 176 Q160 198 202 176" fill="none" stroke="var(--c-coleira, #1f6fb2)" stroke-width="9" stroke-linecap="round"/>
    <rect x="152" y="182" width="16" height="9" rx="2" fill="#d9dee5" stroke="${INK}" stroke-width="2"/>
  </g>
  <g class="acc acc--plaquinha" data-acc="plaquinha">
    <path d="M160 191 v8" stroke="${INK}" stroke-width="2.4"/>
    <path d="M160 198 l9 8 l-9 12 l-9 -12 z" fill="var(--yellow)" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
  </g>
  <g class="acc acc--laco" data-acc="laco">
    <path d="M160 82 L134 68 L136 98 Z M160 82 L186 68 L184 98 Z" fill="var(--c-laco, #ef7aa1)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="160" cy="83" r="7" fill="var(--c-laco, #ef7aa1)" stroke="${INK}" stroke-width="3"/>
  </g>
  <g class="acc acc--bolinha" data-acc="bolinha">
    <circle cx="52" cy="300" r="21" fill="var(--yellow)" stroke="${INK}" stroke-width="3"/>
    <path d="M34 292 Q52 304 70 292 M36 310 Q52 298 68 310" fill="none" stroke="#fff" stroke-width="3"/>
  </g>
  <g class="acc acc--comedouro" data-acc="comedouro">
    <path d="M238 296 H300 Q296 326 278 326 H260 Q242 326 238 296 Z" fill="var(--blue)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="269" cy="296" rx="31" ry="6" fill="#c9a06a" stroke="${INK}" stroke-width="3"/>
  </g>
</svg>`;

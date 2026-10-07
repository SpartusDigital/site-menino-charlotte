(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const WA = 'https://wa.me/5571996271403?text=';

  // Menu mobile ---------------------------------------------------------------
  const nav = $('[data-nav]');
  const toggle = $('[data-menu]');
  if (nav && toggle) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    $$('.nav__links a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
  }

  // Balança: quanto o pet come por dia ---------------------------------------
  // Necessidade energética de manutenção: 70 × peso^0,75 × fator da fase da vida,
  // dividida pela densidade média de uma ração seca premium (~3,7 kcal/g).
  const scale = $('[data-scale]');
  if (scale) {
    const FACTOR = { cao: { filhote: 2.2, adulto: 1.6, idoso: 1.4 }, gato: { filhote: 2.5, adulto: 1.2, idoso: 1.1 } };
    const peso = $('[data-peso]', scale);
    const pesoOut = $('[data-peso-out]', scale);
    const lcd = $('[data-lcd]', scale);
    const pile = $('[data-pile]', scale);
    const scoop = $('[data-scoop]', scale);
    const kibbles = $('[data-kibbles]', scale);
    const result = $('[data-result]', scale);
    const last = $('[data-last]', scale);
    const waBtn = $('[data-scale-wa]', scale);
    const val = (n) => $(`input[name="${n}"]:checked`, scale).value;
    let shown = 0, timer = 0, numRaf = 0, started = false;

    const grams = () => {
      const kg = Number(peso.value);
      const kcal = 70 * Math.pow(kg, 0.75) * FACTOR[val('pet')][val('idade')];
      return Math.round(kcal / 3.7 / 5) * 5;
    };

    const countTo = (to) => {
      cancelAnimationFrame(numRaf);
      if (reduced) { lcd.textContent = to; shown = to; return; }
      const from = shown, t0 = performance.now(), D = 700;
      const step = (t) => {
        const k = clamp((t - t0) / D);
        const v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
        lcd.textContent = v;
        if (k < 1) numRaf = requestAnimationFrame(step);
        else shown = to;
      };
      numRaf = requestAnimationFrame(step);
    };

    const pour = (n) => {
      if (reduced || n <= 0) return;
      scoop.classList.add('is-pouring');
      const W = kibbles.clientWidth, top = 60, stageH = kibbles.clientHeight - top;
      const sx = W * 0.74, sy = top - 6;
      const rimY = top + stageH * 0.33;
      const cat = val('pet') === 'gato';
      const tones = ['#b07a3e', '#9c6a34', '#c48a4a', '#8a5a2b'];
      for (let i = 0; i < n; i++) {
        const k = document.createElement('i');
        k.className = 'kibble';
        k.style.setProperty('--k', tones[i % tones.length]);
        if (cat) { k.style.width = '7px'; k.style.height = '6px'; }
        kibbles.appendChild(k);
        const ex = W * (0.36 + Math.random() * 0.28), ey = rimY - Math.random() * 6;
        const rot = (Math.random() - 0.5) * 540;
        k.animate(
          [
            { transform: `translate(${sx}px, ${sy}px) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${(sx + ex) / 2}px, ${sy - 14}px) rotate(${rot / 2}deg)`, opacity: 1, offset: 0.25 },
            { transform: `translate(${ex}px, ${ey}px) rotate(${rot}deg)`, opacity: 1 },
          ],
          { duration: 520 + Math.random() * 260, delay: i * 28, easing: 'cubic-bezier(.45,0,.9,.6)', fill: 'forwards' }
        ).onfinish = () => k.remove();
      }
      setTimeout(() => scoop.classList.remove('is-pouring'), 360 + n * 28);
    };

    const update = (animate = true) => {
      const pet = val('pet');
      const kg = Number(peso.value);
      const g = grams();
      const idade = val('idade');
      const meals = idade === 'filhote' ? '3 a 4 refeições' : '2 refeições';
      pesoOut.textContent = `${kg} kg`;
      result.innerHTML = `Cerca de <b>${g} g por dia</b>, divididos em ${meals}.`;
      const bag = Number(val('saco'));
      const days = Math.floor((bag * 1000) / g);
      const end = new Date(Date.now() + days * 864e5).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      last.innerHTML = days < 2 ? `dura só <b>${days} dia</b>. Vale um saco maior.` : `dura uns <b>${days} dias</b>. Acaba por volta de <b>${end}</b>.`;
      const who = `${pet === 'gato' ? 'gato' : 'cão'} de ${kg} kg (${idade})`;
      waBtn.href = WA + encodeURIComponent(`Olá, Menino & Charllote! Fiz a conta na balança do site: meu ${who} come uns ${g} g de ração por dia. Quero um saco de ${bag} kg. Quais opções vocês têm?`);
      pile.classList.toggle('is-cat', pet === 'gato');
      pile.style.setProperty('--h', `${(3 + 12 * Math.sqrt(Math.min(g, 700) / 700)).toFixed(1)}%`);
      const delta = g - shown;
      countTo(g);
      if (animate && delta > 0) pour(Math.round(clamp(delta / 9, 5, 30)));
    };

    const sched = () => {
      clearTimeout(timer);
      timer = setTimeout(() => update(true), 160);
    };
    scale.addEventListener('input', (e) => (e.target === peso ? (pesoOut.textContent = `${peso.value} kg`, sched()) : null));
    scale.addEventListener('change', (e) => {
      if (e.target.name === 'pet') {
        const cat = e.target.value === 'gato';
        peso.max = cat ? 10 : 45;
        peso.value = cat ? 4 : 10;
        shown = 0;
      }
      sched();
    });

    // primeira "servida" quando a balança aparece na tela
    const first = () => {
      if (started) return;
      started = true;
      setTimeout(() => update(true), reduced ? 0 : 500);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => en.some((x) => x.isIntersecting) && (first(), io.disconnect()), { threshold: 0.4 });
      io.observe(scale);
    } else first();
  }

  // Enxoval: vestir o pet --------------------------------------------------------
  const dress = $('[data-dress]');
  if (dress) {
    const art = $('.dress__art', dress);
    const count = $('[data-count]', dress);
    const waBtn = $('[data-dress-wa]', dress);
    const NAMES = { '#1f6fb2': 'azul', '#e5483d': 'vermelha', '#f7c843': 'amarela', '#ef7aa1': 'rosa', '#16202c': 'preta', '#2f9e6b': 'verde' };
    const LABEL = { coleira: 'coleira', plaquinha: 'plaquinha de identificação', bandana: 'bandana', laco: 'laço', guia: 'guia', bolinha: 'bolinha', comedouro: 'comedouro', caminha: 'caminha' };
    const color = {};
    const on = new Set();

    const render = () => {
      $$('[data-acc]', art).forEach((g) => g.classList.toggle('is-on', on.has(g.dataset.acc)));
      $$('[data-toggle]', dress).forEach((b) => b.setAttribute('aria-pressed', String(on.has(b.dataset.toggle))));
      count.textContent = on.size;
      const pet = $('input[name="dpet"]:checked', dress).value === 'cat' ? 'gato' : 'cachorro';
      const items = [...on].map((k) => (color[k] ? `${LABEL[k]} ${NAMES[color[k]] || ''}`.trim() : LABEL[k]));
      waBtn.setAttribute('aria-disabled', String(!items.length));
      waBtn.href = WA + encodeURIComponent(`Olá, Menino & Charllote! Montei um enxoval no site para o meu ${pet}: ${items.join(', ')}. Quais modelos vocês têm?`);
    };

    const bounce = () => {
      if (reduced) return;
      art.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)' }, { transform: 'translateY(0)' }], { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    };

    dress.addEventListener('click', (e) => {
      const t = e.target.closest('[data-toggle]');
      if (t) {
        const k = t.dataset.toggle;
        on.has(k) ? on.delete(k) : (on.add(k), bounce());
        render();
        return;
      }
      const sw = e.target.closest('[data-color]');
      if (sw) {
        const k = sw.dataset.color;
        color[k] = sw.dataset.value;
        art.style.setProperty(`--c-${k}`, sw.dataset.value);
        $$(`[data-color="${k}"]`, dress).forEach((b) => {
          b.classList.toggle('is-on', b === sw);
          b.setAttribute('aria-pressed', String(b === sw));
        });
        if (!on.has(k)) { on.add(k); bounce(); }
        render();
        return;
      }
      if (e.target.closest('[data-dress-all]')) {
        $$('[data-toggle]', dress).forEach((b) => on.add(b.dataset.toggle));
        bounce();
        render();
      }
      if (e.target.closest('[data-dress-clear]')) {
        on.clear();
        render();
      }
    });
    dress.addEventListener('change', (e) => {
      if (e.target.name !== 'dpet') return;
      const cat = e.target.value === 'cat';
      $('.pet--dog', art).classList.toggle('is-off', cat);
      $('.pet--cat', art).classList.toggle('is-off', !cat);
      bounce();
      render();
    });

    // cor inicial de cada item = primeira amostra
    $$('[data-color]', dress).forEach((b) => b.classList.contains('is-on') && (color[b.dataset.color] = b.dataset.value));
    on.add('coleira');
    render();
  }

  // Aberto agora ------------------------------------------------------------------
  const status = $('[data-open-status]');
  if (status) {
    try {
      const hours = JSON.parse(status.dataset.openStatus);
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', { timeZone: 'America/Bahia', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
          .formatToParts(new Date())
          .map((p) => [p.type, p.value])
      );
      const now = `${parts.hour}:${parts.minute}`;
      const today = hours.find(([days]) => days.includes(parts.weekday));
      const label = $('span:last-child', status);
      if (today && now >= today[1] && now < today[2]) {
        status.classList.add('is-open');
        label.textContent = `Aberto agora · até ${today[2].replace(':00', 'h')}`;
      } else {
        status.classList.add('is-closed');
        label.textContent = today && now < today[1] ? `Fechado agora · abre às ${today[1].replace(':00', 'h')}` : 'Fechado agora · peça pelo WhatsApp';
      }
    } catch { /* mantém o texto padrão */ }
  }

  // Revelar ao rolar --------------------------------------------------------------
  const items = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('in'));
})();

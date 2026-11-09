// Metinler i18n.js dosyasında. Burada sadece görseller, linkler ve renkler var.
const ASSETS = 'https://afmcoding.com/assets/';
const SHOTS = 'assets/tscan/';

const DOORS = [
  {
    id: 'web', color: '#2C6BD6',
    cards: [
      { img: 'sites/sark-kosesi.webp', url: 'https://sarkkosesi.online/', link: 'sarkkosesi.online' },
      { img: 'sites/sirac-koleji.webp', url: 'https://18martsirackoleji.k12.tr/', link: '18martsirackoleji.k12.tr' },
      { img: 'sites/martisoor-hotel.webp', url: 'https://martisoorhotel.com/', link: 'martisoorhotel.com' },
      { img: 'sites/faro-perform.webp', url: 'https://ahmetfarah22.github.io/faroperfom/', link: 'ahmetfarah22.github.io/faroperfom' },
      { img: 'sites/marifet-menu.webp', url: 'https://ahmetfarah22.github.io/Yamek-listy/', link: 'ahmetfarah22.github.io/Yamek-listy' },
    ],
  },
  {
    id: 'app', color: '#6A3FC4',
    cards: [
      { phoneSrc: SHOTS + 'focus.jpg', tech: ['Flutter', 'Dart', 'Android', 'iOS', 'Windows'], url: 'https://github.com/AHMETfarah22/qr_cd', code: true },
    ],
    screens: [SHOTS + 'quest.jpg', SHOTS + 'stats.jpg', SHOTS + 'account.jpg'],
  },
  {
    id: 'sys', color: '#2F8F68',
    cards: [
      { img: 'hotel-app.webp', tech: ['C#', '.NET', 'HTML', 'CSS', 'JavaScript'], url: 'https://github.com/AHMETfarah22/PMS-Y-NETIM-', code: true },
      { img: 'sites/sirac-koleji.webp', url: 'https://18martsirackoleji.k12.tr/', link: '18martsirackoleji.k12.tr' },
    ],
  },
  {
    id: 'skill', color: '#DE7428',
    langs: ['Python', 'C#', 'C++', 'PHP', 'Dart & Flutter', 'HTML, CSS, JavaScript', 'Go'],
  },
  {
    id: 'me', color: '#C2436B',
    shots: [
      'gallery/afm-coding-ahmed-farah-mohamed.webp',
      'gallery/ahmed-farah-mohamed-mode-academy.webp',
      'gallery/ahmed-farah-mohamed-kod-yazarken.webp',
      'gallery/ahmed-farah-mohamed-yazilim-gelistirici.webp',
    ],
  },
];

const PAST_LINKS = [
  { url: 'https://modeacademy.tr/', link: 'modeacademy.tr' },
  {},
  { url: 'https://18martsirackoleji.k12.tr/', link: '18martsirackoleji.k12.tr' },
  {},
];

const LANGS = ['tr', 'en', 'so'];
let lang = 'tr';
try {
  const saved = localStorage.getItem('afm-lang');
  if (LANGS.includes(saved)) lang = saved;
} catch (e) {}
const t = () => I18N[lang];

// Bir kapının görsel/link bilgisini seçili dilin metinleriyle birleştirir
function doorData(i) {
  const base = DOORS[i];
  const text = t().doors[base.id];
  const d = { ...base, ...text };
  if (base.cards) {
    d.cards = base.cards.map((c, k) => {
      const card = { ...c, ...text.cards[k] };
      if (c.code) card.link = t().ui.code;
      if (c.phoneSrc) card.phone = { src: c.phoneSrc, alt: text.cards[k].phoneAlt };
      return card;
    });
  }
  if (base.screens) d.screens = base.screens.map((src, k) => ({ src, ...text.screens[k] }));
  if (base.langs) d.langs = base.langs.map((name, k) => [name, text.langs[k]]);
  if (base.shots) d.shots = base.shots.map((src, k) => [src, text.shots[k]]);
  return d;
}

// Yardımcılar
const $ = (s) => document.querySelector(s);
const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

// Unvan defteri
const pad = $('#pad');
let roleIndex = 0;
function renderPad() {
  roleIndex = 0;
  pad.innerHTML = t().roles.map((r, i) => `<span class="${i ? '' : 'cur'}">${r}</span>`).join('');
}
if (!reduce) {
  setInterval(() => {
    if (document.hidden) return;
    const sheets = pad.children;
    const old = sheets[roleIndex];
    roleIndex = (roleIndex + 1) % sheets.length;
    old.className = 'out';
    sheets[roleIndex].className = 'cur';
    old.addEventListener('animationend', () => { old.className = ''; }, { once: true });
  }, 2400);
}

// Lamba ipi ile tema
const cord = $('#cord');
function applyTheme(next) {
  html.dataset.theme = next;
  try { localStorage.setItem('afm-theme', next); } catch (e) {}
}
function swingCord() {
  if (reduce) return;
  cord.animate(
    [{ rotate: '0deg' }, { rotate: '8deg' }, { rotate: '-6deg' }, { rotate: '3.5deg' }, { rotate: '-1.5deg' }, { rotate: '0deg' }],
    { duration: 1500, easing: 'ease-out' }
  );
}
function toggleTheme() {
  swingCord();
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  if (reduce || !document.startViewTransition) return applyTheme(next);
  const r = cord.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = 120;
  const radius = Math.hypot(Math.max(x, innerWidth - x), innerHeight);
  const vt = document.startViewTransition(() => applyTheme(next));
  vt.ready.then(() => {
    html.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.5,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}
let dragStart = null;
let pulled = 0;
cord.addEventListener('pointerdown', (e) => {
  dragStart = e.clientY;
  pulled = 0;
  cord.setPointerCapture(e.pointerId);
  cord.classList.add('dragging');
});
cord.addEventListener('pointermove', (e) => {
  if (dragStart === null) return;
  pulled = clamp(e.clientY - dragStart, 0, 90);
  cord.style.setProperty('--pull', `${pulled}px`);
});
function releaseCord() {
  if (dragStart === null) return;
  dragStart = null;
  cord.classList.remove('dragging');
  cord.style.setProperty('--pull', '0px');
  if (pulled > 30 || pulled < 4) toggleTheme();
}
cord.addEventListener('pointerup', releaseCord);
cord.addEventListener('pointercancel', () => { pulled = 10; releaseCord(); });
cord.addEventListener('click', (e) => { if (e.detail === 0) toggleTheme(); }); // klavye

// Kapılar
const INTRO = 0.14;
const doorsEl = $('#kapilar');
const rail = $('#rail');
const infos = $('#infos');
const navLinks = $('#nav-links');
const n = DOORS.length;

// Kapı kanadının çizimi: yarım daire pencere, iki panel, menteşeler ve pirinç simge
const ICONS = {
  web: '<circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="18"/><path d="M6 24h36"/>',
  app: '<rect x="14" y="5" width="20" height="38" rx="4"/><path d="M21 37h6"/>',
  sys: '<rect x="6" y="8" width="36" height="12" rx="2"/><rect x="6" y="28" width="36" height="12" rx="2"/><path d="M12 14h.01M12 34h.01"/>',
  skill: '<path d="M24 5l5.5 13.5L43 24l-13.5 5.5L24 43l-5.5-13.5L5 24l13.5-5.5z"/>',
  me: '<circle cx="24" cy="16" r="9"/><path d="M7 43c2-10 9-15 17-15s15 5 17 15"/>',
};
const PEEK = {
  web: ASSETS + 'sites/sark-kosesi.webp',
  app: SHOTS + 'focus.jpg',
  sys: ASSETS + 'hotel-app.webp',
  me: ASSETS + 'gallery/ahmed-farah-mohamed-mode-academy.webp',
};

function doorArt(id, icon) {
  const arch = 'M0 500V140A140 140 0 0 1 280 140V500Z';
  const spokes = [150, 120, 90, 60, 30].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return `M${140 + 30 * Math.cos(a)} ${130 - 30 * Math.sin(a)}L${140 + 90 * Math.cos(a)} ${130 - 90 * Math.sin(a)}`;
  }).join('');
  const panel = (y, h) => `
    <rect x="50" y="${y}" width="180" height="${h}" rx="6" fill="#000" fill-opacity=".16" stroke="#000" stroke-opacity=".32" stroke-width="2"/>
    <rect x="60" y="${y + 10}" width="160" height="${h - 20}" rx="4" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".2" stroke-width="1.5"/>`;
  return `<svg class="leaf-art" viewBox="0 0 280 500" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="shade${id}" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".2" stop-color="#000" stop-opacity=".04"/>
        <stop offset=".7" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity=".24"/>
      </linearGradient>
      <radialGradient id="glass${id}" cx=".5" cy="1" r="1">
        <stop offset="0" stop-color="#FFF4C9"/><stop offset=".6" stop-color="#F2C65A"/><stop offset="1" stop-color="#B97A18"/>
      </radialGradient>
      <pattern id="grain${id}" width="7" height="500" patternUnits="userSpaceOnUse">
        <rect width="1.2" height="500" fill="#fff" fill-opacity=".05"/><rect x="3.5" width="1.2" height="500" fill="#000" fill-opacity=".07"/>
      </pattern>
    </defs>
    <path d="${arch}" style="fill:var(--c)"/>
    <path d="${arch}" fill="url(#grain${id})"/>
    <path d="M50 130A90 90 0 0 1 230 130Z" fill="url(#glass${id})" stroke="#000" stroke-opacity=".4" stroke-width="4"/>
    <path d="${spokes}" stroke="#2a1d08" stroke-opacity=".6" stroke-width="3"/>
    <path d="M110 130A30 30 0 0 1 170 130Z" fill="#FFF8DF" stroke="#2a1d08" stroke-opacity=".6" stroke-width="3"/>
    ${panel(158, 170)}${panel(350, 122)}
    <g transform="translate(140 243) scale(1.75) translate(-24 -24)" fill="none" stroke="#EBCB68" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
    <rect x="-1" y="190" width="11" height="36" rx="2" fill="#D9B44A"/><rect x="-1" y="404" width="11" height="36" rx="2" fill="#D9B44A"/>
    <path d="${arch}" fill="url(#shade${id})"/>
  </svg>`;
}

rail.innerHTML = DOORS.map((d, i) => `
  <div class="door" style="--c:${d.color};--d:${i}" data-i="${i}">
    <span class="wash" aria-hidden="true"></span>
    <button class="door-btn" type="button">
      <span class="aperture">
        <span class="keystone"></span>
        <span class="inside"${PEEK[d.id] ? ` style="--peek:url('${PEEK[d.id]}')"` : ''}></span>
        <span class="leaf">${doorArt(i, ICONS[d.id])}<span class="plaque"></span><span class="plate"></span><span class="handle"></span></span>
        <span class="sill"></span>
        <span class="leak"></span>
      </span>
    </button>
  </div>`).join('');

infos.innerHTML = DOORS.map((d, i) => `
  <div class="info" style="--c:${d.color}" data-i="${i}">
    <h3></h3>
    <p></p>
    <ul></ul>
    <button class="open-door" type="button"></button>
  </div>`).join('');

const homeLink = navLinks.children[0];
homeLink.insertAdjacentHTML('afterend', DOORS.map((d, i) =>
  `<a href="#kapilar" class="door-link" data-door="${i}" style="--on:${d.color}"></a>`).join(''));

const doorEls = [...rail.children];
const infoEls = [...infos.children];
const doorLinks = [...navLinks.querySelectorAll('.door-link')];

function doorScrollY(i) {
  const span = doorsEl.offsetHeight - innerHeight;
  return doorsEl.offsetTop + span * (INTRO + (1 - INTRO) * (i / (n - 1)));
}
function goToDoor(i) { scrollTo({ top: doorScrollY(i), behavior: reduce ? 'auto' : 'smooth' }); }

let cur = 0;
let overview = 1;
let active = 0;
let stageTint = '';
const stageEl = $('#stage');

function drawDoors(force) {
  if ($('#room').open) return;
  const rect = doorsEl.getBoundingClientRect();
  const span = doorsEl.offsetHeight - innerHeight;
  const target = clamp(-rect.top / span);
  if (!force && Math.abs(target - cur) < 0.00015) return;
  cur = reduce || force ? target : cur + (target - cur) * 0.14;

  overview = 1 - ease(clamp(cur / INTRO));
  const t = clamp((cur - INTRO) / (1 - INTRO)) * (n - 1);
  const base = Math.min(Math.floor(t), n - 2);
  const f = base + ease(t - base);
  active = Math.round(f);

  const W = doorsEl.clientWidth;
  const small = W < 860;
  const dw = doorEls[0].offsetWidth;
  const cx = lerp(small ? W * 0.5 : W * 0.31, W * 0.5, overview);
  const overviewScale = W >= 1200 ? 0.76 : 0.62;
  const spacing = lerp(small ? W * 0.85 : W * 0.42, dw * overviewScale + (small ? 16 : 40), overview);
  const centre = lerp(f, (n - 1) / 2, overview);

  doorEls.forEach((el, i) => {
    const d = Math.abs(i - f);
    const x = cx + (i - centre) * spacing;
    const s = lerp(1 - 0.2 * Math.min(d, 1), overviewScale, overview);
    const o = lerp(clamp(1 - d * 1.6), 1, overview);
    el.style.transform = `translate3d(${x}px,0,0) scale(${s})`;
    el.style.opacity = o;
    el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
    el.classList.toggle('active', i === active && overview < 0.3);
  });

  infoEls.forEach((el, i) => {
    const o = (1 - overview) * clamp(1 - Math.abs(i - f) * 2.6);
    el.style.opacity = o;
    el.style.transform = `translateY(${(i - f) * 40}px)`;
    el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
  });

  const inScene = rect.top < innerHeight * 0.5 && rect.bottom > innerHeight * 0.5 && overview < 0.5;
  doorLinks.forEach((a, i) => a.classList.toggle('on', inScene && i === active));

  // Duvar, öndeki kapının rengini alır
  const tint = overview < 0.3 ? DOORS[active].color : 'transparent';
  if (tint !== stageTint) {
    stageTint = tint;
    stageEl.style.setProperty('--door-c', tint);
  }
}

// Oda açma / kapatma
const room = $('#room');
const roomBody = $('#room-body');
const FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';
let busy = false;
let openDoorEl = null;

const img = (src, alt, w, h) => `<img src="${ASSETS}${src}" alt="${alt}" loading="lazy" width="${w}" height="${h}">`;

const phoneFrame = (p) => `<div class="phone"><img src="${p.src}" alt="${p.alt}" width="785" height="1600"></div>`;

function roomContent(d) {
  let body = '';
  if (d.cards) {
    body = d.cards.map((c, i) => `
      <article class="card${d.screens ? ' solo' : ''}" style="--n:${i}">
        <div>
          <p class="card-tag">${c.tag}</p>
          <h3>${c.title}</h3>
          ${c.sub ? `<p class="card-sub">${c.sub}</p>` : ''}
          <p class="card-desc">${c.desc}</p>
          ${c.bullets ? `<ul>${c.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : ''}
          ${c.tech ? `<div class="card-tech">${c.tech.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}
          <a class="card-link" href="${c.url}" target="_blank" rel="noopener">${c.link}</a>
        </div>
        ${c.phone ? phoneFrame(c.phone) : `<img class="card-img" src="${ASSETS}${c.img}" alt="${c.title} ${t().ui.shot}" loading="lazy" width="1280" height="800">`}
      </article>`).join('');
  }
  if (d.screens) {
    body += `<ul class="screens">${d.screens.map((s) => `
      <li>${phoneFrame(s)}<h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
    </ul>`;
  }
  if (d.skills) {
    body = `
      <div class="skills">${d.skills.map((s) => `
        <section class="skill"><h3>${s.title}</h3><ul>${s.items.map((x) => `<li>${x}</li>`).join('')}</ul></section>`).join('')}
      </div>
      <h3 class="langs-title">${t().ui.langsTitle}</h3>
      <ul class="langs">${d.langs.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>`;
  }
  if (d.bio) {
    body = `
      <div class="bio">${d.bio.map((p) => `<p>${p}</p>`).join('')}</div>
      <dl class="facts">${d.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
      <div class="shots">${d.shots.map(([s, a]) => img(s, a, 800, 600)).join('')}</div>`;
  }
  return `<div class="room-wrap">
    <header class="room-head"><h2 id="room-title" class="words">${d.title}</h2><p>${d.lead}</p></header>
    ${body}
  </div>`;
}

function clipFrom(el) {
  const r = el.getBoundingClientRect();
  const R = r.width / 2;
  const W = innerWidth;
  const H = innerHeight;
  return `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round ${R}px ${R}px 0px 0px)`;
}

function openRoom(i) {
  if (busy || room.open) return;
  busy = true;
  const d = doorData(i);
  openDoorEl = doorEls[i];
  openDoorEl.classList.add('open');
  doorsEl.classList.add('opening');
  roomBody.innerHTML = roomContent(d);
  prepareRoom();
  setTimeout(() => {
    room.style.transition = 'none';
    room.style.clipPath = clipFrom(openDoorEl.querySelector('.aperture'));
    room.style.setProperty('--c', d.color);
    html.classList.add('locked');
    room.showModal();
    room.scrollTop = 0;
    room.getBoundingClientRect();
    room.style.transition = '';
    room.style.clipPath = FULL;
    startRoomMotion();
    busy = false;
  }, reduce ? 0 : 600);
}

function closeRoom() {
  if (busy || !room.open) return;
  busy = true;
  stopRoomMotion();
  room.style.clipPath = clipFrom(openDoorEl.querySelector('.aperture'));
  setTimeout(() => {
    room.close();
    html.classList.remove('locked');
    doorsEl.classList.remove('opening');
    openDoorEl.classList.remove('open');
    openDoorEl.querySelector('.door-btn').focus({ preventScroll: true });
    busy = false;
  }, reduce ? 0 : 620);
}

$('#back').addEventListener('click', closeRoom);
room.addEventListener('cancel', (e) => { e.preventDefault(); closeRoom(); });

doorEls.forEach((el, i) => {
  el.querySelector('.door-btn').addEventListener('click', () => {
    if (overview > 0.3 || i !== active) goToDoor(i);
    else openRoom(i);
  });
});
infoEls.forEach((el, i) => el.querySelector('.open-door').addEventListener('click', () => openRoom(i)));
doorLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); goToDoor(i); }));
$('#see-sites').addEventListener('click', () => goToDoor(0));

// Zaman tüneli
const pastEl = $('#deneyim');
const pastBig = $('#past-big');
const pastList = $('#past-list');
let pastActive = -1;

function renderPast() {
  const past = t().past;
  pastBig.style.setProperty('--len', Math.max(...past.map((p) => [...p.big].length)));
  pastBig.innerHTML = past.map((p) =>
    `<span>${[...p.big].map((c, i) => `<i style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</i>`).join('')}</span>`).join('');
  pastList.innerHTML = past.map((p, i) => {
    const l = PAST_LINKS[i];
    return `
    <li class="past-item">
      <h3>${p.title}</h3>
      <div class="past-more"><div>
        <p class="past-role">${p.role}</p>
        ${p.desc ? `<p class="past-desc">${p.desc}</p>` : ''}
        ${l.url ? `<a href="${l.url}" target="_blank" rel="noopener">${l.link}</a>` : ''}
      </div></div>
    </li>`;
  }).join('');
  pastActive = -1;
}

const night = $('.night');
function drawPast() {
  const rect = pastEl.getBoundingClientRect();
  const span = pastEl.offsetHeight - innerHeight;
  const p = clamp(-rect.top / span);
  const count = t().past.length;
  const i = Math.min(count - 1, Math.floor(p * count));
  pastList.style.setProperty('--fill', `${Math.round(p * 100)}%`);
  if (!reduce) night.style.setProperty('--stars', `${Math.round(p * -160)}px`);
  if (i !== pastActive) {
    pastActive = i;
    night.dataset.step = i;
    [...pastBig.children].forEach((el, k) => el.classList.toggle('on', k === i));
    [...pastList.children].forEach((el, k) => el.classList.toggle('on', k === i));
  }
}

// Animasyonlar
function splitWords(el) {
  let i = Number(el.dataset.start || 0);
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w"><span style="--i:${i++}">${w}</span></span>`).join(' ');
  el.classList.add('ready');
}

const reveal = (el) => { el.classList.add('in'); };
const onSeen = (margin, root = null) => new IntersectionObserver((entries, io) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    reveal(e.target);
    io.unobserve(e.target);
  });
}, { root, rootMargin: margin });

// Odanın içindeki kartlar
let roomSeen = null;
let roomTimer = 0;

function prepareRoom() {
  if (reduce) return;
  roomBody.querySelectorAll('.words').forEach(splitWords);
  roomBody.querySelectorAll('.card, .room-head p, .langs-title').forEach((el) => el.classList.add('rv'));
  roomBody.querySelectorAll('.skills, .langs, .facts, .shots, .bio, .screens').forEach((group) => {
    [...group.children].forEach((el, i) => {
      el.classList.add('rv');
      el.style.setProperty('--d', i);
    });
  });
}

function startRoomMotion() {
  if (reduce) return;
  roomTimer = setTimeout(() => {
    roomSeen = onSeen('0px 0px -6% 0px', room);
    roomBody.querySelectorAll('.rv, .words').forEach((el) => roomSeen.observe(el));
  }, 320);
}

function stopRoomMotion() {
  clearTimeout(roomTimer);
  if (roomSeen) roomSeen.disconnect();
  roomSeen = null;
}

// Üstüne gelen kart alttakini geriye iter
function stackCards() {
  const cards = [...roomBody.querySelectorAll('.card')];
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const a = card.getBoundingClientRect();
    const overlap = clamp((a.bottom - next.getBoundingClientRect().top) / a.height);
    card.style.scale = 1 - 0.05 * overlap;
    card.style.filter = overlap ? `brightness(${1 - 0.3 * overlap})` : '';
  });
}
if (!reduce) room.addEventListener('scroll', stackCards, { passive: true });

// Giriş kapısı: fareye eğilir, sayfadan çıkarken kapanır
const heroEl = $('.hero');
const heroArch = $('.hero-arch');
const heroLeaf = $('.hero-leaf');
heroLeaf.insertAdjacentHTML('afterbegin', doorArt('hero', ICONS.me));
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

function drawHero() {
  const r = heroArch.getBoundingClientRect();
  if (r.bottom < -40 || r.top > innerHeight + 40) return;
  const closing = clamp((70 - r.top) / (r.height * 0.8));
  heroLeaf.style.transform = `rotateY(${112 * (1 - closing)}deg)`;
  tilt.x += (tilt.tx - tilt.x) * 0.08;
  tilt.y += (tilt.ty - tilt.y) * 0.08;
  heroArch.style.transform = `perspective(900px) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 8}deg)`;
}

// Yıldızlı gökyüzü
const sky = document.createElement('canvas');
sky.className = 'sky';
sky.setAttribute('aria-hidden', 'true');
const skyCtx = sky.getContext('2d');
const stars = Array.from({ length: 110 }, () => ({
  x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 1.3,
  speed: 0.4 + Math.random() * 1.6, phase: Math.random() * 6.28,
  gold: Math.random() < 0.18,
}));
let shooter = null;
let nextShooter = 2500;

function sizeSky() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  sky.width = sky.clientWidth * ratio;
  sky.height = sky.clientHeight * ratio;
  skyCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawSky(now) {
  const r = pastEl.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  const W = sky.clientWidth;
  const H = sky.clientHeight;
  const day = html.dataset.theme === 'light';
  skyCtx.clearRect(0, 0, W, H);
  stars.forEach((s) => {
    skyCtx.globalAlpha = (day ? 0.55 : 1) * (0.2 + 0.8 * Math.abs(Math.sin(now * 0.001 * s.speed + s.phase)));
    skyCtx.fillStyle = s.gold ? (day ? '#A87B0C' : '#E5BF45') : (day ? '#FFFFFF' : '#FFFFFF');
    skyCtx.beginPath();
    skyCtx.arc(s.x * W, s.y * H, s.r, 0, 6.29);
    skyCtx.fill();
  });
  if (!shooter && now > nextShooter) {
    shooter = { x: W * (0.3 + Math.random() * 0.7), y: H * Math.random() * 0.4, born: now };
  }
  if (shooter) {
    const age = (now - shooter.born) / 900;
    if (age >= 1) {
      shooter = null;
      nextShooter = now + 2800 + Math.random() * 3500;
    } else {
      const hx = shooter.x - age * 420;
      const hy = shooter.y + age * 210;
      const gradient = skyCtx.createLinearGradient(hx, hy, hx + 130, hy - 65);
      gradient.addColorStop(0, day ? '#A87B0C' : '#FFF3C4');
      gradient.addColorStop(1, 'transparent');
      skyCtx.globalAlpha = 1 - age;
      skyCtx.strokeStyle = gradient;
      skyCtx.lineWidth = 2;
      skyCtx.beginPath();
      skyCtx.moveTo(hx, hy);
      skyCtx.lineTo(hx + 130, hy - 65);
      skyCtx.stroke();
    }
  }
  skyCtx.globalAlpha = 1;
}

function startMotion() {
  const title = $('#contact-title');
  const seen = onSeen('0px 0px -12% 0px');
  const stageSeen = onSeen('0px 0px -45% 0px');
  stageSeen.observe($('.stage h2'));
  seen.observe($('.past-left h2'));
  seen.observe(title);
  document.querySelectorAll('.contact > p, .contact .pill, .socials li, .contact-links li').forEach((el, i) => {
    el.classList.add('rv');
    el.style.setProperty('--d', i);
    seen.observe(el);
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.hero .words').forEach(reveal);
  }));

  $('#past-stage').prepend(sky);
  sizeSky();
  addEventListener('resize', sizeSky);

  if (finePointer) {
    heroEl.addEventListener('pointermove', (e) => {
      tilt.tx = (e.clientX / innerWidth - 0.5) * 2;
      tilt.ty = (e.clientY / innerHeight - 0.5) * 2;
    });
    heroEl.addEventListener('pointerleave', () => { tilt.tx = 0; tilt.ty = 0; });
    doorEls.forEach((el) => {
      const leaf = el.querySelector('.leaf');
      el.addEventListener('pointermove', (e) => {
        const r = leaf.getBoundingClientRect();
        leaf.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        leaf.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
    document.querySelectorAll('.pill').forEach((pill) => {
      pill.addEventListener('pointermove', (e) => {
        const r = pill.getBoundingClientRect();
        pill.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.16}px ${(e.clientY - r.top - r.height / 2) * 0.28}px`;
      });
      pill.addEventListener('pointerleave', () => { pill.style.translate = '0 0'; });
    });
  }
}
// Sosyal hesaplar: adresi boş olan düğme görünmez
const SOCIALS = [
  {
    name: 'Instagram', url: 'https://www.instagram.com/ahmett_kr12/',
    icon: '<g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/>',
  },
  {
    name: 'LinkedIn', url: '',
    icon: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  },
  {
    name: 'Facebook', url: '',
    icon: '<path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  },
];
$('#socials').innerHTML = SOCIALS.filter((s) => s.url).map((s) => `
  <li><a href="${s.url}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${s.icon}</svg>${s.name}</a></li>`).join('');

// Dil
function renderContactTitle() {
  const { contactA, contactB } = t().ui;
  const title = $('#contact-title');
  title.setAttribute('aria-label', `${contactA} ${contactB}`);
  if (reduce) {
    title.innerHTML = `${contactA}<span class="l2">${contactB}</span>`;
    return;
  }
  let c = 0;
  const chars = (text) => text.trim().split(/\s+/).map((w) =>
    `<span class="cw">${[...w].map((ch) => `<span class="ch" style="--i:${c++}">${ch}</span>`).join('')}</span>`).join(' ');
  title.innerHTML = `${chars(contactA)}<span class="l2">${chars(contactB)}</span>`;
}

const langBox = $('#lang');
const langButtons = [...langBox.children];

function applyLang(next) {
  lang = next;
  try { localStorage.setItem('afm-lang', next); } catch (e) {}
  html.lang = next;
  const { ui, meta } = t();
  document.title = meta.title;
  $('meta[name="description"]').content = meta.desc;

  const shown = [...document.querySelectorAll('main .words.in, #contact-title.in')];
  shown.forEach((el) => el.classList.remove('in'));

  $('.hero-am').dataset.start = ui.hi.trim().split(/\s+/).length;
  document.querySelectorAll('[data-t]').forEach((el) => {
    el.textContent = ui[el.dataset.t];
    if (!reduce && el.classList.contains('words')) splitWords(el);
  });
  document.querySelectorAll('[data-t-aria]').forEach((el) => el.setAttribute('aria-label', ui[el.dataset.tAria]));
  document.querySelectorAll('[data-t-alt]').forEach((el) => { el.alt = ui[el.dataset.tAlt]; });

  DOORS.forEach((door, i) => {
    const text = t().doors[door.id];
    doorEls[i].querySelector('.plaque').textContent = text.plaque;
    doorEls[i].querySelector('.door-btn').setAttribute('aria-label', ui.openAria.replace('{t}', text.title));
    infoEls[i].querySelector('h3').textContent = text.title;
    infoEls[i].querySelector('p').textContent = text.lead;
    infoEls[i].querySelector('ul').innerHTML = text.points.map((p) => `<li>${p}</li>`).join('');
    infoEls[i].querySelector('.open-door').textContent = ui.openDoor;
    doorLinks[i].textContent = text.nav;
  });

  renderPad();
  renderPast();
  renderContactTitle();

  langButtons.forEach((b, i) => {
    const on = b.dataset.lang === next;
    b.setAttribute('aria-pressed', on);
    if (on) langBox.style.setProperty('--at', i);
  });

  requestAnimationFrame(() => requestAnimationFrame(() => shown.forEach(reveal)));
}
langButtons.forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

applyLang(lang);
if (!reduce) startMotion();

// Menünün altındaki ilerleme çizgisi
const navEl = $('#nav');
let lastProgress = -1;
function drawProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.round((scrollY / max) * 1000) / 1000 : 0;
  if (p !== lastProgress) {
    lastProgress = p;
    navEl.style.setProperty('--progress', p);
  }
}

function tick(now) {
  drawDoors(false);
  drawPast();
  drawProgress();
  if (!reduce && !room.open) {
    drawHero();
    drawSky(now);
  }
  requestAnimationFrame(tick);
}
drawDoors(true);
drawPast();
requestAnimationFrame(tick);
addEventListener('resize', () => drawDoors(true));

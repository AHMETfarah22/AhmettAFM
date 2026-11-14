// Yıldızın Somali'den Türkiye'ye yolculuğu. Metinler i18n.js dosyasında.
const ASSETS = 'https://afmcoding.com/assets/';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const html = document.documentElement;
if (!reduce) html.classList.add('anim');

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

// Boylam, enlem. Deniz yolu izler: Aden Körfezi, Kızıldeniz, Süveyş, Akdeniz.
const WAY = [
  [48.48, 8.40], [49.8, 11.2], [46.5, 12.9], [43.4, 12.6], [38.6, 20.0], [34.4, 27.4],
  [32.6, 30.4], [32.6, 33.0], [33.4, 36.3], [34.17, 39.14], [31.0, 40.6], [26.41, 40.15],
  [27.7, 40.75], [28.98, 41.01],
];
const CITIES = [
  { lonlat: WAY[0], key: 'garowe' },
  { lonlat: WAY[9], key: 'kirsehir' },
  { lonlat: WAY[11], key: 'canakkale' },
  { lonlat: WAY[13], key: 'istanbul' },
];
const STOP_WAY = { garowe: 0, road: 4, kirsehir: 9, canakkale: 11, istanbul: 13 };
const COORD = {
  garowe: '8.40° N, 48.48° E',
  road: '20.00° N, 38.60° E',
  kirsehir: '39.14° N, 34.17° E',
  canakkale: '40.15° N, 26.41° E',
  istanbul: '41.01° N, 28.98° E',
};

const SKY = [
  [0, [42, 111, 201]],
  [0.3, [24, 62, 140]],
  [0.58, [38, 28, 92]],
  [0.82, [128, 18, 48]],
  [1, [200, 16, 28]],
];

// Dil
const LANGS = ['tr', 'en', 'so'];
let lang = 'tr';
try {
  const saved = localStorage.getItem('afm-lang');
  if (LANGS.includes(saved)) lang = saved;
} catch (e) {}
const t = () => I18N[lang];

// İçerik
const SITES = {
  martisoor: { img: 'sites/martisoor-hotel.webp', url: 'https://martisoorhotel.com/', link: 'martisoorhotel.com' },
  hotel: { img: 'hotel-app.webp', url: 'https://github.com/AHMETfarah22/PMS-Y-NETIM-', code: true },
  faro: { img: 'sites/faro-perform.webp', url: 'https://ahmetfarah22.github.io/faroperfom/', link: 'ahmetfarah22.github.io/faroperfom' },
  sirac: { img: 'sites/sirac-koleji.webp', url: 'https://18martsirackoleji.k12.tr/', link: '18martsirackoleji.k12.tr' },
  marifet: { img: 'sites/marifet-menu.webp', url: 'https://ahmetfarah22.github.io/Yamek-listy/', link: 'ahmetfarah22.github.io/Yamek-listy' },
  sark: { img: 'sites/sark-kosesi.webp', url: 'https://sarkkosesi.online/', link: 'sarkkosesi.online' },
  mode: { img: 'sites/mode-academy.jpg', url: 'https://modeacademy.tr/', link: 'modeacademy.tr' },
};

function card(id) {
  const s = SITES[id];
  const x = t().cards[id];
  return `<article class="card rv">
    <div class="shot"><img src="${ASSETS}${s.img}" alt="${x.title} ${t().shot}" loading="lazy" width="1280" height="800"${s.pos ? ` style="object-position:${s.pos}"` : ''}></div>
    <div class="card-body">
      <p class="tag">${x.tag}</p><h3>${x.title}</h3><p class="desc">${x.desc}</p>
      <a class="go" href="${s.url}" target="_blank" rel="noopener">${s.code ? t().code : s.link}</a>
    </div>
  </article>`;
}

function tscanCard() {
  const x = t().cards.tscan;
  return `<article class="card tscan rv">
    <div class="phones">
      <img src="${ASSETS}tscan/focus.jpg" alt="TScan Focus Timer" loading="lazy" width="782" height="1600">
      <img src="${ASSETS}tscan/quest.jpg" alt="TScan AI Quest" loading="lazy" width="785" height="1600">
    </div>
    <div class="card-body">
      <p class="tag">${x.tag}</p><h3>${x.title}</h3><p class="desc">${x.desc}</p>
      <a class="go" href="https://github.com/AHMETfarah22/qr_cd" target="_blank" rel="noopener">${t().code}</a>
    </div>
  </article>`;
}

const STOPS = ['garowe', 'road', 'kirsehir', 'canakkale', 'istanbul'];
const stopHTML = (key, cards, wide) => {
  const s = t()[key];
  const side = STOPS.indexOf(key) % 2 ? ' right' : '';
  return `<section class="stop${side}" data-stop="${key}" data-place="${s.place}">
    <div class="panel${wide ? ' wide' : ''}">
      <p class="meta rv"><span class="step">${STOPS.indexOf(key) + 1} / ${STOPS.length}</span>${lang === 'tr' ? COORD[key].replace('N', 'K').replace('E', 'D') : COORD[key]}</p>
      <h2 class="city rv">${s.title || s.place}</h2>
      <p class="lede rv">${s.lede}</p>
      ${cards ? `<div class="cards${wide ? ' bento' : ''}">${cards}</div>` : ''}
    </div>
  </section>`;
};
const WHATSAPP = 'https://wa.me/905416264074';
// Örnek site talep formu: Google Apps Script otomasyonuna gönderir (profil/otomasyon klasörü)
const AUTOMATION_URL = 'https://script.google.com/macros/s/AKfycbzZRbjUFljFFcwcXFsPXRhw-F0cEgtmdSO5BB8e3lM6akFaS1mg3NHzbUFqcBxGjz3e/exec';
const DEMO_BASE = 'https://ahmetfarah22.github.io/ornek-siteler/';
const demoLink = (type) => (type && type !== 'diger' ? `${DEMO_BASE}${type}/` : DEMO_BASE);
function showLeadPopup(L, first, url, wa) {
  let dlg = document.getElementById('lead-pop');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'lead-pop';
    dlg.setAttribute('aria-labelledby', 'lead-pop-title');
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
  }
  dlg.innerHTML = `
    <div class="pop">
      <svg class="pop-tick" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg>
      <h3 id="lead-pop-title">${escapeHtml(L.done)}</h3>
      <p>${escapeHtml(L.ok.replace('{n}', first))}</p>
      <a class="pop-main" href="${url}" target="_blank" rel="noopener">${escapeHtml(L.open)} →</a>
      <a class="pop-wa" href="${wa}" target="_blank" rel="noopener">${escapeHtml(L.wa)}</a>
      <button type="button" class="pop-close" data-close>${escapeHtml(L.close)}</button>
    </div>`;
  dlg.showModal();
}
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function render() {
  const x = t();
  html.lang = lang;
  document.querySelector('meta[name="description"]').content = x.desc;
  const i = x.intern;
  document.getElementById('stops').innerHTML = `
    <section class="hero" id="top" data-stop="hero" data-place="${x.start}">
      <p class="chip"><img src="${ASSETS}ahmed-farah-mohamed-afm-coding.jpg" alt="" width="896" height="1195"><span class="chip-text">Ahmed Farah Mohamed <i>${x.open}</i></span></p>
      <h1>${x.tagline}</h1>
      <p class="role">${x.role}</p>
      <form class="ask" id="ask">
        <label for="ask-text">${x.askLabel}</label>
        <div class="ask-row">
          <textarea id="ask-text" rows="2" placeholder="${x.examples[0]}"></textarea>
          <button class="ask-send" type="submit" aria-label="${x.askAria}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>
        </div>
      </form>
      <div class="chips">${x.askChips.map(([label], i) => `<button type="button" data-chip="${i}">${label}</button>`).join('')}</div>
    </section>
    <div id="garowe">${stopHTML('garowe', card('martisoor'))}</div>
    ${stopHTML('road', tscanCard() + card('hotel') + card('faro') + card('sirac') + card('marifet'), true)}
    ${stopHTML('kirsehir', card('sark'))}
    ${stopHTML('canakkale', `<article class="card rv"><div class="card-body"><p class="tag">${i.tag}</p><h3>${i.title}</h3><p class="desc">${i.desc}</p></div></article>`)}
    ${stopHTML('istanbul', card('mode'))}
    <section class="stop final right" data-stop="today" data-place="${x.today.place}" id="iletisim">
      <div class="panel">
        <h2 class="city rv">${x.today.title}</h2>
        <p class="lede rv">${x.today.lede}</p>
        <div class="cards">
          <article class="card rv">
            <div class="me"><img src="${ASSETS}ahmed-farah-mohamed-afm-coding.jpg" alt="${x.portrait}" width="896" height="1195"><h3>Ahmed Farah Mohamed</h3></div>
            <div class="card-body">
              <dl class="facts">${x.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
            </div>
          </article>
          <article class="card rv"><div class="card-body"><h3>${x.skills.title}</h3><p class="desc">${x.skills.desc}</p></div></article>
          <article class="card contact-card rv">
            <div class="card-body">
              <h3>${x.contactTitle}</h3>
              <p class="desc">${x.contactDesc}</p>
              <form class="lead" id="lead" novalidate>
                <p class="lead-title">${x.lead.title}</p>
                <div class="lead-grid">
                  <label>${x.lead.name}<input name="name" required maxlength="80" autocomplete="name"></label>
                  <label>${x.lead.phone}<input name="phone" type="tel" required maxlength="20" inputmode="tel" autocomplete="tel" placeholder="05xx xxx xx xx"></label>
                  <label>${x.lead.email}<input name="email" type="email" maxlength="120" autocomplete="email"></label>
                  <label>${x.lead.type}<select name="type">${Object.entries(x.lead.types).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
                  <label class="full">${x.lead.msg}<textarea name="message" rows="2" maxlength="1000"></textarea></label>
                  <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
                </div>
                <button class="wa lead-send" type="submit">${x.lead.send}</button>
                <div class="lead-status" id="lead-status" role="status" aria-live="polite"></div>
              </form>
              <ul class="links icon-links">
                <li><a href="tel:+905416264074"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg><span>+90 541 626 4074</span></a></li>
                <li><a href="tel:+252907554481"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg><span>+252 90 755 4481</span></a></li>
                <li><a href="https://www.instagram.com/ahmett_kr12/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg><span>Instagram</span></a></li>
                <li><a href="https://github.com/AHMETfarah22" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg><span>GitHub</span></a></li>
              </ul>
            </div>
          </article>
        </div>
        <p class="fine">© 2026 Ahmed Farah Mohamed, AFM-CODING</p>
      </div>
    </section>`;
  if (!reduce) {
    const seen = new IntersectionObserver((entries, io) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach((el) => seen.observe(el));
  }
  document.getElementById('bar-cta').textContent = x.cta;
  document.getElementById('route-nav').innerHTML = [...STOPS, 'today'].map((k) =>
    `<button type="button" data-go="${k}">${x[k].place}</button>`).join('');
  document.querySelectorAll('#lang button').forEach((b, k) => {
    const on = b.dataset.lang === lang;
    b.setAttribute('aria-pressed', on);
    if (on) document.getElementById('lang').style.setProperty('--at', k);
  });
}

// Rota geometrisi
const hasGeo = typeof d3 !== 'undefined' && d3.geoMercator;
const projection = hasGeo ? d3.geoMercator().scale(1800).translate([0, 0]) : null;
function project(ll) {
  if (projection) return projection(ll);
  const k = 1800 * Math.PI / 180;
  return [ll[0] * k, -1800 * Math.log(Math.tan(Math.PI / 4 + (ll[1] * Math.PI) / 360))];
}

const anchors = WAY.map(project);
function catmull(p0, p1, p2, p3, u) {
  const f = (a, b, c, d) => 0.5 * (2 * b + (c - a) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (3 * b - a - 3 * c + d) * u * u * u);
  return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
}
const SAMPLES = 40;
const points = [];
for (let i = 0; i < anchors.length - 1; i++) {
  const p0 = anchors[Math.max(0, i - 1)];
  const p3 = anchors[Math.min(anchors.length - 1, i + 2)];
  for (let k = 0; k < SAMPLES; k++) points.push(catmull(p0, anchors[i], anchors[i + 1], p3, k / SAMPLES));
}
points.push(anchors[anchors.length - 1]);

const lengths = [0];
for (let i = 1; i < points.length; i++) {
  lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
}
const total = lengths[lengths.length - 1];
const fractionOfWay = (w) => lengths[Math.min(w * SAMPLES, points.length - 1)] / total;

function pointAt(f) {
  const target = clamp(f) * total;
  let lo = 0;
  let hi = lengths.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (lengths[mid] <= target) lo = mid; else hi = mid;
  }
  const span = lengths[hi] - lengths[lo] || 1;
  const u = (target - lengths[lo]) / span;
  return { x: lerp(points[lo][0], points[hi][0], u), y: lerp(points[lo][1], points[hi][1], u), index: lo };
}

const bounds = points.reduce((b, [x, y]) => ({
  x0: Math.min(b.x0, x), x1: Math.max(b.x1, x), y0: Math.min(b.y0, y), y1: Math.max(b.y1, y),
}), { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity });

// Tuval
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
let W = 0;
let H = 0;
let small = false;
let land = null;
let home = null;
let somalia = null;

function resize() {
  W = canvas.clientWidth;
  H = canvas.clientHeight;
  const ratio = Math.min(devicePixelRatio || 1, W < 860 ? 1.5 : 2);
  canvas.width = Math.round(W * ratio);
  canvas.height = Math.round(H * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  small = W < 860;
}

async function loadLand() {
  if (!hasGeo || typeof topojson === 'undefined') return;
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json');
    const topo = await res.json();
    const features = topojson.feature(topo, topo.objects.countries).features.filter((f) => {
      const [[a, b], [c, d]] = d3.geoBounds(f);
      return c > 5 && a < 80 && d > -15 && b < 62;
    });
    const path = d3.geoPath(projection);
    const HOME = ['Somalia', 'Somaliland', 'Turkey', 'Türkiye'];
    land = new Path2D(features.map((f) => path(f) || '').join(''));
    home = new Path2D(features.filter((f) => HOME.includes(f.properties.name)).map((f) => path(f) || '').join(''));
    somalia = new Path2D(features.filter((f) => ['Somalia', 'Somaliland'].includes(f.properties.name)).map((f) => path(f) || '').join(''));
    dirty = true;
  } catch (e) {
    // Harita gelmezse rota ve içerik yine çalışır.
  }
}

// Kaydırma anahtar kareleri
let frames = [];
function measure() {
  // Son karede rotanın tamamı, hilal dahil, menünün altında ve yazıların üstünde kalsın
  const topEdge = 84 + (small ? 62 : 76);
  const bottomEdge = small ? H * 0.56 : H - 40;
  const fit = Math.min((W * (small ? 0.78 : 0.42)) / (bounds.x1 - bounds.x0), (bottomEdge - topEdge) / (bounds.y1 - bounds.y0));
  const fitY = (topEdge + bottomEdge) / 2 / H;
  const ax = small ? 0.5 : 0.71;
  const stops = [...document.querySelectorAll('[data-stop]')];
  const maxY = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  frames = stops.map((el) => {
    const key = el.dataset.stop;
    const top = el.getBoundingClientRect().top + scrollY;
    const y = key === 'hero' ? 0 : key === 'today'
      ? Math.min(maxY, top + 80)
      : clamp(top + el.offsetHeight / 2 - innerHeight / 2 - (small ? innerHeight * 0.25 : 0), 0, maxY);
    if (key === 'hero') return { y, key, f: 0, k: fit * (small ? 1.5 : 1.15), fit: 0, ax: 0.5, ay: small ? 0.9 : 0.92, lift: 1, place: el.dataset.place };
    if (key === 'today') return { y, key, f: 1, k: fit, fit: 1, ax: !small && el.classList.contains('right') ? 1 - ax : ax, ay: fitY, place: el.dataset.place };
    const zoom = key === 'road' ? 1.7 : 3.4;
    const sax = small ? ax : el.classList.contains('right') ? 1 - ax : ax;
    return { y, key, f: fractionOfWay(STOP_WAY[key]), k: fit * zoom, fit: 0, ax: sax, ay: small ? 0.27 : 0.5, place: el.dataset.place };
  }).sort((a, b) => a.y - b.y);
}

function stateAt(y) {
  if (!frames.length) return null;
  let i = 0;
  while (i < frames.length - 2 && frames[i + 1].y < y) i++;
  const a = frames[i];
  const b = frames[Math.min(i + 1, frames.length - 1)];
  const u = b.y > a.y ? ease(clamp((y - a.y) / (b.y - a.y))) : 0;
  return {
    f: lerp(a.f, b.f, u), k: Math.exp(lerp(Math.log(a.k), Math.log(b.k), u)),
    fit: lerp(a.fit, b.fit, u), ax: lerp(a.ax, b.ax, u), ay: lerp(a.ay, b.ay, u),
    lift: lerp(a.lift || 0, b.lift || 0, u),
    transit: b.f !== a.f ? Math.sin(Math.PI * clamp((y - a.y) / (b.y - a.y))) : 0,
    place: u < 0.5 ? a.place : b.place,
    key: u < 0.5 ? a.key : b.key,
  };
}

// Bulutlar: duraklarda açılır, yolculukta yıldız içinden geçer
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let v = s;
    v = Math.imul(v ^ (v >>> 15), v | 1);
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61);
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}
function makeCloud(seed) {
  const r = seeded(seed);
  const c = document.createElement('canvas');
  c.width = 720;
  c.height = 380;
  const g = c.getContext('2d');
  for (let i = 0; i < 90; i++) {
    const a = r() * Math.PI * 2;
    const q = Math.sqrt(r());
    const x = 360 + Math.cos(a) * q * 260;
    const y = 200 + Math.sin(a) * q * 96;
    const rad = 34 + r() * 74;
    const grad = g.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, 'rgba(255,255,255,.34)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  return c;
}
const sprites = [11, 29, 47, 83].map(makeCloud);
const cloudRandom = seeded(2026);
const clouds = Array.from({ length: 16 }, (_, i) => ({
  sprite: sprites[i % sprites.length],
  x: cloudRandom(), y: cloudRandom(),
  depth: 0.55 + cloudRandom() * 0.95,
}));

function drawClouds(s) {
  const flight = Math.pow(clamp(s.transit), 2.4);
  if (flight < 0.01 && s.lift < 0.01) return;
  const span = H + 700;
  clouds.forEach((c) => {
    const scale = c.depth * (small ? 0.9 : 1.35);
    const w = 720 * scale;
    const h = 380 * scale;
    const x = ((c.x * (W + w) + s.f * 520 * c.depth) % (W + w)) - w;
    const y = ((c.y * span + s.f * 5200 * c.depth) % span) - 350;
    // Açılışta bulutlar yalnızca alt kenarda, başlığın altında kalır
    const bottom = clamp(((y + h / 2) / H - 0.56) / 0.26);
    // Uçuşta bulutlar yazıların olduğu alanı kapatmaz
    const clear = small
      ? clamp((0.62 - (y + h / 2) / H) / 0.2)
      : s.ax >= 0.5 ? clamp(((x + w / 2) / W - 0.46) / 0.18) : clamp((0.54 - (x + w / 2) / W) / 0.18);
    ctx.globalAlpha = Math.max(flight * 0.82 * Math.max(clear, 0.12), s.lift * bottom * 0.95);
    ctx.drawImage(c.sprite, x, y, w, h);
  });
  ctx.globalAlpha = 1;
}

function skyAt(f) {
  let i = 0;
  while (i < SKY.length - 2 && SKY[i + 1][0] < f) i++;
  const u = clamp((f - SKY[i][0]) / (SKY[i + 1][0] - SKY[i][0]));
  return SKY[i][1].map((c, n) => Math.round(lerp(c, SKY[i + 1][1][n], u)));
}

function starPath(x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const q = i % 2 ? r * 0.382 : r;
    const px = x + Math.cos(a) * q;
    const py = y + Math.sin(a) * q;
    if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
  }
  ctx.closePath();
}

const here = document.getElementById('here');
let lastPlace = '';
let lastKey = '';
let lastSky = '';

function draw(y) {
  const s = stateAt(y);
  if (!s) return;
  const star = pointAt(s.f);
  const cx = lerp(star.x, (bounds.x0 + bounds.x1) / 2, s.fit);
  const cy = lerp(star.y, (bounds.y0 + bounds.y1) / 2, s.fit);
  const k = s.k;
  const tx = W * s.ax - cx * k;
  const ty = H * s.ay - cy * k;
  const toX = (x) => x * k + tx;
  const toY = (v) => v * k + ty;

  const PALE = [205, 229, 250];
  const sky = skyAt(s.f).map((c, n) => Math.round(lerp(c, PALE[n], s.lift)));
  const labelColor = s.lift > 0.5 ? '#10233C' : '#FFFFFF';
  ctx.fillStyle = `rgb(${sky})`;
  ctx.fillRect(0, 0, W, H);
  const skyKey = sky.join(' ');
  if (skyKey !== lastSky) {
    lastSky = skyKey;
    html.style.background = `rgb(${sky})`;
    html.style.setProperty('--sky', skyKey);
  }

  const sx = toX(star.x);
  const sy = toY(star.y);
  const arrive = ease(clamp((s.f - 0.97) / 0.03));
  const R = (small ? 24 : 34) + arrive * (small ? 10 : 16);

  if (land) {
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(k, k);
    ctx.fillStyle = `rgba(${Math.round(lerp(255, 52, s.lift))},${Math.round(lerp(255, 112, s.lift))},${Math.round(lerp(255, 170, s.lift))},${lerp(0.13, 0.2, s.lift)})`;
    ctx.fill(land);
    ctx.fillStyle = 'rgba(255,255,255,.2)';
    ctx.fill(home);
    if (s.lift > 0) {
      ctx.fillStyle = `rgba(42,111,201,${0.95 * s.lift})`;
      ctx.fill(somalia);
    }
    ctx.strokeStyle = 'rgba(255,255,255,.6)';
    ctx.lineWidth = 1.1 / k;
    ctx.stroke(home);
    ctx.restore();
  }

  // Gidilecek yol
  ctx.setLineDash([3, 8]);
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = s.lift > 0.5 ? 'rgba(16,35,60,.4)' : 'rgba(255,255,255,.5)';
  ctx.beginPath();
  ctx.moveTo(toX(star.x), toY(star.y));
  for (let i = star.index + 1; i < points.length; i++) ctx.lineTo(toX(points[i][0]), toY(points[i][1]));
  ctx.stroke();
  ctx.setLineDash([]);

  // Gidilen yol
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(toX(points[0][0]), toY(points[0][1]));
  for (let i = 1; i <= star.index; i++) ctx.lineTo(toX(points[i][0]), toY(points[i][1]));
  ctx.lineTo(toX(star.x), toY(star.y));
  ctx.strokeStyle = 'rgba(255,255,255,.18)';
  ctx.lineWidth = 14;
  ctx.stroke();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  drawClouds(s);

  // Şehirler
  ctx.font = `600 ${small ? 13 : 15}px "Inter Tight", sans-serif`;
  ctx.textBaseline = 'middle';
  CITIES.forEach((c) => {
    if (s.lift > 0.5 && c.key !== 'garowe') return; // açılışta yazılara karışmasın
    const p = project(c.lonlat);
    const px = toX(p[0]);
    const py = toY(p[1]);
    ctx.fillStyle = labelColor;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, 6.3);
    ctx.fill();
    const name = t()[c.key].place;
    const gap = Math.hypot(px - sx, py - sy) < R * 1.6 ? R * (1.3 + arrive * 0.9) + 8 : 13;
    if (c.key === 'canakkale' && px - gap - ctx.measureText(name).width < 8) {
      ctx.textAlign = 'left';
      ctx.fillText(name, Math.max(8, px - 40), py + R + 14);
    } else {
      ctx.textAlign = c.key === 'canakkale' ? 'right' : 'left';
      ctx.fillText(name, px + (c.key === 'canakkale' ? -gap : gap), py - 1);
    }
  });

  // Yıldız, sonda hilalle buluşur
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.16)';
  ctx.beginPath();
  ctx.arc(sx, sy, R * 1.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  const offset = arrive * R * 1.15;
  starPath(sx + offset, sy, R * (1 - arrive * 0.45));
  ctx.fill();
  ctx.restore();

  if (arrive > 0) {
    ctx.save();
    ctx.globalAlpha = arrive;
    ctx.beginPath();
    ctx.rect(sx - R * 3, sy - R * 3, R * 6, R * 6);
    ctx.arc(sx + R * 0.28, sy, R * 0.8, 0, Math.PI * 2, true);
    ctx.clip('evenodd');
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(sx, sy, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (s.place !== lastPlace) {
    lastPlace = s.place;
    here.textContent = s.place;
  }
  if (s.key !== lastKey) {
    lastKey = s.key;
    document.querySelectorAll('[data-go]').forEach((b) => b.classList.toggle('on', b.dataset.go === s.key));
  }
}

// Döngü
let curY = scrollY;
let dirty = true;
function tick() {
  const target = scrollY;
  if (Math.abs(target - curY) > 0.25 || dirty) {
    curY = reduce ? target : curY + (target - curY) * 0.12;
    if (Math.abs(target - curY) <= 0.25) curY = target;
    dirty = false;
    draw(curY);
  }
  requestAnimationFrame(tick);
}

function layout() {
  resize();
  measure();
  dirty = true;
}

document.querySelectorAll('#lang button').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.lang === lang) return;
  const y = scrollY;
  const ratio = y / Math.max(1, html.scrollHeight);
  lang = b.dataset.lang;
  try { localStorage.setItem('afm-lang', lang); } catch (e) {}
  html.style.scrollBehavior = 'auto';
  render();
  document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
  scrollTo(0, ratio * html.scrollHeight);
  html.style.scrollBehavior = '';
  lastKey = '';
  exampleIndex = 0;
  exampleLength = 0;
  layout();
}));

// Soru kutusu: yazılan istek WhatsApp mesajı olarak açılır
const stopsEl = document.getElementById('stops');
stopsEl.addEventListener('submit', async (e) => {
  if (e.target.id !== 'lead') return;
  e.preventDefault();
  const form = e.target;
  const L = t().lead;
  const status = form.querySelector('#lead-status');
  const f = form.elements;
  const data = { action: 'lead', name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), type: f.type.value, message: f.message.value.trim(), website: f.website.value, lang };
  const phoneOk = data.phone.replace(/\D/g, '').length >= 10;
  f.name.setAttribute('aria-invalid', !data.name);
  f.phone.setAttribute('aria-invalid', !phoneOk);
  if (!data.name || !phoneOk) { status.innerHTML = `<p class="err">${escapeHtml(L.bad)}</p>`; return; }
  const btn = form.querySelector('.lead-send');
  btn.disabled = true;
  btn.textContent = L.sending;
  let saved = false;
  try {
    const res = await fetch(AUTOMATION_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) });
    saved = !!(await res.json()).ok;
  } catch (err) { saved = false; }
  const url = demoLink(data.type);
  const waText = `Merhaba, ben ${data.name}. Örnek site istiyorum: ${L.types[data.type]}.\n${data.message ? data.message + '\n' : ''}Numaram: ${data.phone}\nGördüğüm örnek: ${url}`;
  status.innerHTML = '';
  showLeadPopup(L, data.name.split(' ')[0], url, `${WHATSAPP}?text=${encodeURIComponent(waText)}`);
  btn.disabled = false;
  btn.textContent = L.send;
  if (saved) form.reset();
});
stopsEl.addEventListener('submit', (e) => {
  if (e.target.id !== 'ask') return;
  e.preventDefault();
  const box = document.getElementById('ask-text');
  const text = box.value.trim();
  if (!text) { box.focus(); return; }
  window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
stopsEl.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-chip]');
  if (!chip) return;
  const box = document.getElementById('ask-text');
  box.value = t().askChips[Number(chip.dataset.chip)][1];
  box.focus();
});
document.getElementById('route-nav').addEventListener('click', (e) => {
  const button = e.target.closest('[data-go]');
  if (!button) return;
  const frame = frames.find((f) => f.key === button.dataset.go);
  if (frame) scrollTo({ top: frame.y, behavior: reduce ? 'auto' : 'smooth' });
});

// Örnek istekler yazılır gibi akar
let exampleIndex = 0;
let exampleLength = 0;
let examplePause = 0;
if (!reduce) {
  setInterval(() => {
    const box = document.getElementById('ask-text');
    if (!box || document.hidden || box.value) return;
    if (examplePause > 0) { examplePause--; return; }
    const list = t().examples;
    exampleLength++;
    box.placeholder = list[exampleIndex].slice(0, exampleLength);
    if (exampleLength >= list[exampleIndex].length) {
      exampleIndex = (exampleIndex + 1) % list.length;
      exampleLength = 0;
      examplePause = 45;
    }
  }, 42);
}

render();
layout();
addEventListener('resize', layout);
addEventListener('load', layout);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
loadLand();
requestAnimationFrame(tick);

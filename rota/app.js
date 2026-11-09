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
  mode: { img: 'gallery/ahmed-farah-mohamed-mode-academy.webp', url: 'https://modeacademy.tr/', link: 'modeacademy.tr', pos: 'center 88%' },
};

function card(id) {
  const s = SITES[id];
  const x = t().cards[id];
  return `<article class="card rv">
    <img src="${ASSETS}${s.img}" alt="${x.title} ${t().shot}" loading="lazy" width="1280" height="800"${s.pos ? ` style="object-position:${s.pos}"` : ''}>
    <div class="card-body">
      <p class="tag">${x.tag}</p><h3>${x.title}</h3><p class="desc">${x.desc}</p>
      <a class="go" href="${s.url}" target="_blank" rel="noopener">${s.code ? t().code : s.link}</a>
    </div>
  </article>`;
}

function tscanCard() {
  const x = t().cards.tscan;
  return `<article class="card rv">
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

const stopHTML = (key, cards) => {
  const s = t()[key];
  return `<section class="stop" data-stop="${key}" data-place="${s.place}">
    <div class="panel">
      <p class="coord rv">${lang === 'tr' ? COORD[key].replace('N', 'K').replace('E', 'D') : COORD[key]}</p>
      <h2 class="city rv">${s.title || s.place}</h2>
      <p class="lede rv">${s.lede}</p>
      ${cards ? `<div class="cards">${cards}</div>` : ''}
    </div>
  </section>`;
};

function render() {
  const x = t();
  html.lang = lang;
  document.querySelector('meta[name="description"]').content = x.desc;
  const i = x.intern;
  document.getElementById('stops').innerHTML = `
    <section class="hero" id="top" data-stop="hero" data-place="${x.start}">
      <h1 class="name" aria-label="Ahmed Farah Mohamed"><span>Ahmed</span><span>Farah</span><span>Mohamed</span></h1>
      <p class="tagline">${x.tagline}</p>
      <p class="role">${x.role}</p>
      <a class="cue" href="#garowe">${x.cue}</a>
    </section>
    <div id="garowe">${stopHTML('garowe', card('martisoor'))}</div>
    ${stopHTML('road', tscanCard() + card('hotel') + card('faro') + card('sirac') + card('marifet'))}
    ${stopHTML('kirsehir', card('sark'))}
    ${stopHTML('canakkale', `<article class="card rv"><div class="card-body"><p class="tag">${i.tag}</p><h3>${i.title}</h3><p class="desc">${i.desc}</p></div></article>`)}
    ${stopHTML('istanbul', card('mode'))}
    <section class="stop final" data-stop="today" data-place="${x.today.place}" id="iletisim">
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
              <a class="wa" href="https://wa.me/905416264074" target="_blank" rel="noopener">${x.whatsapp}</a>
              <ul class="links">
                <li><a href="tel:+905416264074">+90 541 626 4074</a></li>
                <li><a href="tel:+252907554481">+252 90 755 4481</a></li>
                <li><a href="https://www.instagram.com/ahmett_kr12/" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://github.com/AHMETfarah22" target="_blank" rel="noopener">GitHub</a></li>
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

function resize() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  W = canvas.clientWidth;
  H = canvas.clientHeight;
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
    dirty = true;
  } catch (e) {
    // Harita gelmezse rota ve içerik yine çalışır.
  }
}

// Kaydırma anahtar kareleri
let frames = [];
function measure() {
  // Son karede rotanın tamamı, hilal dahil, menünün altında ve yazıların üstünde kalsın
  const topEdge = 64 + (small ? 62 : 76);
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
    if (key === 'hero') return { y, key, f: 0, k: fit * 1.5, fit: 0, ax, ay: small ? 0.74 : 0.5, place: el.dataset.place };
    if (key === 'today') return { y, key, f: 1, k: fit, fit: 1, ax, ay: fitY, place: el.dataset.place };
    const zoom = key === 'road' ? 1.7 : 3.4;
    return { y, key, f: fractionOfWay(STOP_WAY[key]), k: fit * zoom, fit: 0, ax, ay: small ? 0.27 : 0.5, place: el.dataset.place };
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
    place: u < 0.5 ? a.place : b.place,
  };
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

  const sky = skyAt(s.f);
  ctx.fillStyle = `rgb(${sky})`;
  ctx.fillRect(0, 0, W, H);
  html.style.background = `rgb(${sky})`;
  html.style.setProperty('--sky', sky.join(' '));

  const sx = toX(star.x);
  const sy = toY(star.y);
  const arrive = ease(clamp((s.f - 0.97) / 0.03));
  const R = (small ? 24 : 34) + arrive * (small ? 10 : 16);

  if (land) {
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(k, k);
    ctx.fillStyle = 'rgba(255,255,255,.13)';
    ctx.fill(land);
    ctx.fillStyle = 'rgba(255,255,255,.2)';
    ctx.fill(home);
    ctx.strokeStyle = 'rgba(255,255,255,.55)';
    ctx.lineWidth = 1.1 / k;
    ctx.stroke(home);
    ctx.restore();
  }

  // Gidilecek yol
  ctx.setLineDash([3, 8]);
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,.5)';
  ctx.beginPath();
  ctx.moveTo(toX(star.x), toY(star.y));
  for (let i = star.index + 1; i < points.length; i++) ctx.lineTo(toX(points[i][0]), toY(points[i][1]));
  ctx.stroke();
  ctx.setLineDash([]);

  // Gidilen yol
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(toX(points[0][0]), toY(points[0][1]));
  for (let i = 1; i <= star.index; i++) ctx.lineTo(toX(points[i][0]), toY(points[i][1]));
  ctx.lineTo(toX(star.x), toY(star.y));
  ctx.stroke();

  // Şehirler
  ctx.font = `600 ${small ? 13 : 15}px "DM Sans", sans-serif`;
  ctx.textBaseline = 'middle';
  CITIES.forEach((c) => {
    const p = project(c.lonlat);
    const px = toX(p[0]);
    const py = toY(p[1]);
    ctx.fillStyle = '#FFFFFF';
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
  ctx.shadowColor = 'rgba(255,255,255,.75)';
  ctx.shadowBlur = 24;
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
  layout();
}));

render();
layout();
addEventListener('resize', layout);
addEventListener('load', layout);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
loadLand();
requestAnimationFrame(tick);

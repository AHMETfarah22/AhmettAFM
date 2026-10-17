// Live sites browser, experience timeline, languages grid and scroll effects.
// Content comes from content.js; UI strings are merged into the i18n dictionary.

Object.keys(AFM_UI).forEach(lang => Object.assign(i18n[lang], AFM_UI[lang]));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeSite = 0;
let urlTyper = null;

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function siteHost(url) {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/$/, '');
}

function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || i18n.tr[key] || '';
}

// ---------- Live sites ----------

function renderSites() {
    const list = document.getElementById('site-list');
    const view = document.getElementById('site-view');
    if (!list || !view) return;

    document.querySelectorAll('[data-site-count]').forEach(el => { el.textContent = AFM_SITES.length; });
    list.setAttribute('aria-label', t('sites.listLabel'));

    list.innerHTML = AFM_SITES.map((site, i) => `
        <button type="button" role="tab" id="site-tab-${i}" class="site-item" aria-controls="site-panel"
            aria-selected="${i === activeSite}" tabindex="${i === activeSite ? 0 : -1}" data-index="${i}">
            <span class="site-item-name">${escapeHTML(site.name)}</span>
            <span class="site-item-meta">${escapeHTML(site.category[currentLang] || site.category.tr)}</span>
        </button>`).join('');

    if (!view.children.length) {
        view.innerHTML = AFM_SITES.map((site, i) => `
            <img src="${site.image}" alt="${escapeHTML(site.name)}" width="1280" height="800"
                class="site-shot${i === activeSite ? ' is-active' : ''}" decoding="async" ${i === 0 ? '' : 'loading="lazy"'}>`).join('');
    }

    renderSiteDetails(false);
}

function renderSiteDetails(animateUrl) {
    const site = AFM_SITES[activeSite];
    const caption = document.getElementById('site-caption');
    const tabLabel = document.getElementById('site-tab-label');
    const tabMark = document.getElementById('site-tab-mark');
    const open = document.getElementById('site-open');
    const panel = document.getElementById('site-panel');

    tabLabel.textContent = site.name;
    tabMark.textContent = site.name.charAt(0);
    open.href = site.url;
    panel.setAttribute('aria-labelledby', `site-tab-${activeSite}`);

    caption.innerHTML = `
        <div class="site-caption-text">
            <h3 class="site-caption-name">${escapeHTML(site.name)}</h3>
            <p class="site-caption-desc">${escapeHTML(site.desc[currentLang] || site.desc.tr)}</p>
        </div>
        <ul class="site-caption-tech" aria-label="Tech">
            ${site.tech.map(x => `<li>${escapeHTML(x)}</li>`).join('')}
        </ul>`;

    setUrl(siteHost(site.url), animateUrl && !reduceMotion);
}

function setUrl(host, animate) {
    const el = document.getElementById('site-url');
    clearInterval(urlTyper);
    if (!animate) { el.textContent = host; return; }
    let n = 0;
    el.textContent = '';
    const step = Math.max(1, Math.ceil(host.length / 14));
    urlTyper = setInterval(() => {
        n = Math.min(host.length, n + step);
        el.textContent = host.slice(0, n);
        if (n >= host.length) clearInterval(urlTyper);
    }, 24);
}

function selectSite(index, focus) {
    if (index === activeSite) return;
    activeSite = (index + AFM_SITES.length) % AFM_SITES.length;

    document.querySelectorAll('#site-list .site-item').forEach((btn, i) => {
        const on = i === activeSite;
        btn.setAttribute('aria-selected', on);
        btn.tabIndex = on ? 0 : -1;
        if (on && focus) btn.focus();
        if (on) btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    document.querySelectorAll('#site-view .site-shot').forEach((img, i) => {
        img.classList.toggle('is-active', i === activeSite);
    });
    renderSiteDetails(true);
}

function initSiteEvents() {
    const list = document.getElementById('site-list');
    if (!list) return;
    list.addEventListener('click', e => {
        const btn = e.target.closest('.site-item');
        if (btn) selectSite(Number(btn.dataset.index), false);
    });
    list.addEventListener('keydown', e => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (keys[e.key]) { e.preventDefault(); selectSite(activeSite + keys[e.key], true); }
        if (e.key === 'Home') { e.preventDefault(); selectSite(0, true); }
        if (e.key === 'End') { e.preventDefault(); selectSite(AFM_SITES.length - 1, true); }
    });
}

// ---------- Experience ----------

function renderExperience() {
    const list = document.getElementById('exp-list');
    if (!list) return;
    list.innerHTML = AFM_EXPERIENCE.map(item => {
        const pick = field => item[field] ? (item[field][currentLang] || item[field].tr) : '';
        const role = pick('role');
        const desc = pick('desc');
        return `
        <li class="tl-item">
            <span class="tl-dot" aria-hidden="true"></span>
            <div class="tl-head">
                <span class="tl-period">${escapeHTML(pick('period'))}</span>
                <h3 class="tl-org">${escapeHTML(item.org)}</h3>
            </div>
            ${role ? `<p class="tl-role">${escapeHTML(role)}</p>` : ''}
            ${desc ? `<p class="tl-desc">${escapeHTML(desc)}</p>` : ''}
            ${item.url ? `<a class="tl-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(siteHost(item.url))}<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11 3a1 1 0 100 2h2.59l-6.3 6.3a1 1 0 101.42 1.4L15 6.42V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg></a>` : ''}
        </li>`;
    }).join('');
    updateTimeline();
}

function updateTimeline() {
    const list = document.getElementById('exp-list');
    if (!list) return;
    const r = list.getBoundingClientRect();
    const mark = window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
    list.style.setProperty('--tl-progress', p.toFixed(3));
    list.querySelectorAll('.tl-item').forEach(li => {
        li.classList.toggle('is-reached', li.getBoundingClientRect().top + 14 < mark);
    });
}

// ---------- Languages ----------

function renderLanguages() {
    const grid = document.getElementById('lang-grid');
    if (!grid) return;
    grid.innerHTML = AFM_LANGUAGES.map(l => `
        <li class="lang-item">
            <span class="lang-mark" style="--lang-bg:${l.color};--lang-ink:${l.ink}" aria-hidden="true">${escapeHTML(l.mark)}</span>
            <span class="lang-text">
                <span class="lang-name">${escapeHTML(l.name)}</span>
                <span class="lang-use">${escapeHTML(l.use[currentLang] || l.use.tr)}</span>
            </span>
        </li>`).join('');
}

// ---------- Scroll progress ----------

function updateScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}

// ---------- Wiring ----------

document.addEventListener('afm:language', () => {
    renderSites();
    renderExperience();
    renderLanguages();
});

document.addEventListener('DOMContentLoaded', () => {
    let saved = null;
    try { saved = localStorage.getItem('afm-lang'); } catch (e) { /* storage blocked */ }
    setLanguage(i18n[saved] ? saved : 'tr', true);

    initSiteEvents();

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateTimeline();
            ticking = false;
        });
    }, { passive: true });
    window.addEventListener('resize', updateTimeline);
    updateScrollProgress();
});

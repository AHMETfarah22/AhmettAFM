// Live sites list (behind one button), experience timeline, languages grid and scroll effects.
// Content comes from content.js; UI strings are merged into the i18n dictionary.

Object.keys(AFM_UI).forEach(lang => Object.assign(i18n[lang], AFM_UI[lang]));

const EXTERNAL_ICON = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11 3a1 1 0 100 2h2.59l-6.3 6.3a1 1 0 101.42 1.4L15 6.42V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>';

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

function pick(obj) {
    return obj ? (obj[currentLang] || obj.tr) : '';
}

// TScan details for the project modal (replaces the old AI study app entry)
Object.keys(AFM_TSCAN_MODAL).forEach(lang => {
    const m = AFM_TSCAN_MODAL[lang];
    const items = AFM_TSCAN_FEATURES[lang].map(([name, text]) => `
        <li class="flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
            <span><b>${escapeHTML(name)}:</b> ${escapeHTML(text)}</span>
        </li>`).join('');
    modalData[lang].ai = {
        title: m.title,
        subtitle: m.subtitle,
        badge: m.badge,
        image: 'assets/tscan.webp',
        techs: ['Flutter', 'Dart', 'Android', 'iOS', 'Windows', 'AI'],
        body: `
            <p class="text-sm text-slate-600 leading-relaxed">${escapeHTML(m.intro)}</p>
            <div class="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <h4 class="text-xs font-extrabold text-emerald-800 mb-3">${escapeHTML(m.heading)}</h4>
                <ul class="text-xs text-slate-700 space-y-2.5 font-medium">${items}</ul>
            </div>
            <p class="mt-3 text-xs text-slate-500">${escapeHTML(m.platforms)}</p>`
    };
});

// ---------- Live sites ----------

function renderSites() {
    const list = document.getElementById('site-list');
    if (!list) return;

    document.querySelectorAll('[data-site-count]').forEach(el => { el.textContent = AFM_SITES.length; });

    const peek = document.getElementById('sites-peek');
    if (peek && !peek.children.length) {
        peek.innerHTML = AFM_SITES.slice(0, 4).map(site => `<img src="${site.image}" alt="" width="52" height="36" loading="lazy" decoding="async">`).join('');
    }

    list.innerHTML = AFM_SITES.map((site, i) => `
        <li style="--i:${i}">
            <a class="site-card" href="${site.url}" target="_blank" rel="noopener noreferrer">
                <span class="site-thumb" aria-hidden="true">
                    <span class="site-thumb-bar"><i></i><i></i><i></i><span>${escapeHTML(siteHost(site.url))}</span></span>
                    <span class="site-thumb-img"><img src="${site.image}" alt="" width="1280" height="800" loading="lazy" decoding="async"></span>
                </span>
                <span class="site-card-body">
                    <span class="site-card-top">
                        <span class="site-card-name">${escapeHTML(site.name)}</span>
                        <span class="site-card-cat">${escapeHTML(pick(site.category))}</span>
                    </span>
                    <span class="site-card-desc">${escapeHTML(pick(site.desc))}</span>
                    <span class="site-card-link">${escapeHTML(siteHost(site.url))}${EXTERNAL_ICON}</span>
                </span>
            </a>
        </li>`).join('');

    updateSitesToggle();
}

function sitesOpen() {
    const panel = document.getElementById('sites-panel');
    return !!panel && panel.classList.contains('is-open');
}

function updateSitesToggle() {
    const label = document.getElementById('sites-toggle-label');
    if (label) label.textContent = t(sitesOpen() ? 'sites.hide' : 'sites.show');
}

function setSitesOpen(open) {
    const panel = document.getElementById('sites-panel');
    const toggle = document.getElementById('sites-toggle');
    if (!panel || !toggle) return;
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
    toggle.setAttribute('aria-expanded', open);
    updateSitesToggle();
}

function initSites() {
    const toggle = document.getElementById('sites-toggle');
    if (!toggle) return;
    setSitesOpen(location.hash === '#sites');
    toggle.addEventListener('click', () => setSitesOpen(!sitesOpen()));
    // Header and hero "my sites" buttons jump to the section and open the list
    document.querySelectorAll('a[href="#sites"]').forEach(a => a.addEventListener('click', () => setSitesOpen(true)));
}

// ---------- Experience ----------

function renderExperience() {
    const list = document.getElementById('exp-list');
    if (!list) return;
    list.innerHTML = AFM_EXPERIENCE.map(item => {
        const role = pick(item.role);
        const desc = pick(item.desc);
        return `
        <li class="tl-item">
            <span class="tl-dot" aria-hidden="true"></span>
            <div class="tl-head">
                <span class="tl-period">${escapeHTML(pick(item.period))}</span>
                <h3 class="tl-org">${escapeHTML(item.org)}</h3>
            </div>
            ${role ? `<p class="tl-role">${escapeHTML(role)}</p>` : ''}
            ${desc ? `<p class="tl-desc">${escapeHTML(desc)}</p>` : ''}
            ${item.url ? `<a class="tl-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(siteHost(item.url))}${EXTERNAL_ICON}</a>` : ''}
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
                <span class="lang-use">${escapeHTML(pick(l.use))}</span>
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

    initSites();

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

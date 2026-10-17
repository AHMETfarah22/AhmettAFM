# AhmettAFM

Personal portfolio for Ahmed Farah Mohamed, published as a static site with GitHub Pages.

## Publish

Changes pushed to `main` are deployed automatically by the GitHub Actions workflow.

The custom domain is `afmcoding.com`. To connect it, configure DNS at the provider hosting the domain's nameservers:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `AHMETfarah22.github.io` |

Remove any conflicting A, AAAA, or CNAME records for `@` and `www`. DNS changes can take time to propagate. After the domain resolves to GitHub Pages, enable **Enforce HTTPS** under the repository's **Settings > Pages**.

## Styles

Tailwind CSS is compiled to `assets/tailwind.css` (config: `tailwind.config.js`). The deploy workflow rebuilds it on every push, so new Tailwind classes in `index.html` or `script.js` work on the live site automatically. To preview new classes locally, rebuild once:

```bash
npx tailwindcss@3.4.17 -i ./tailwind.input.css -o ./assets/tailwind.css --minify
```

## Content

Live sites, work experience and programming languages live in `content.js`:

- `AFM_SITES` — one entry per live site (name, URL, screenshot, tech, category and description in tr/en/so). Put the screenshot in `assets/sites/` (1280×800 WebP).
- `AFM_EXPERIENCE` — newest first; `role`, `desc` and `url` are optional.
- `AFM_LANGUAGES` — the language cards in the skills section.

`showcase.js` renders them and re-renders when the language changes. The chosen language is remembered in the browser.

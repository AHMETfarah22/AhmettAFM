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
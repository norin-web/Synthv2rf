# Syntx — promo site

Promo site for the Syntx iOS app (AI image and video generator, App Store ID 6821891250).
Design source: Paper file “Syntx v1 RF”, page Promo (desktop + mobile artboards, Handoff).

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173/Synthv2rf/
pnpm build      # → dist/
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`
(pnpm, build, `404.html` = copy of `index.html` so deep links load the app).
Repo settings → Pages → Source must be **GitHub Actions**.

### `base` and the custom domain trap

There is no custom domain yet, so `vite.config.ts` has `base: "/Synthv2rf/"` and the site
lives at https://norin-web.github.io/Synthv2rf/. When a domain is attached, in the **same commit**:

1. `base: "/"` in `vite.config.ts`
2. `public/CNAME` with the bare domain
3. update `og:image` / `og:url` in `index.html`

Otherwise every asset 404s and the page goes blank.

## Where things live

- `src/app/content/site.ts` — every fact: brand, email, operator, App Store link, models, FAQ…
  Unknown store data is `PLACEHOLDER` (the app is not live yet).
- `src/app/content/legal.ts` — Privacy Policy and Terms of Use. Paste the owner’s texts
  **verbatim** (only `## ` headings and `- ` lists); until then the pages show a placeholder.
- `src/styles/index.css` — tokens in `:root` (mirror Paper), all layout.
- Images: `public/images/*.webp` (sources in `../File/materials`). Always reference them through
  `img()` from `src/app/utils/img.ts`, never a bare `"/images/…"` string.

## Rules

- No smooth / inertia scroll; the header is sticky and never hides.
- Reveals are CSS transitions driven by `useReveal`; hidden states apply only under `html.js`
  and every fallback is gated on real geometry, so content is never left invisible.

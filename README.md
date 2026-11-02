# LIHDAY (德運實業) Website

The official website of LIHDAY Co., Ltd. (德運實業有限公司). Founded in Taoyuan, Taiwan in 1986, LIHDAY plans, installs and maintains surveillance and security systems, and sells CCTV products under its own brand, 立岱 (Lihday Digital Surveillance).

The content was migrated from the company's previous WordPress site and rebuilt with Vite and Vue 3. The site itself is in Traditional Chinese.

## Tech stack

- [Vite](https://vite.dev/) + [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vue Router](https://router.vuejs.org/) in history mode
- [GSAP](https://gsap.com/) + ScrollTrigger for scroll and entrance animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Fonts: Noto Sans TC and Archivo, self-hosted through Fontsource (no Google Fonts requests)

## Getting started

Requires Node.js 20.19 or 22.12 and above (Vite 8's requirement).

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173 by default.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally |

## Pages

| URL | Page |
|---|---|
| `/` | Home: services, solutions, process, 立岱 products, partners, about, contact |
| `/products` | All products, with category tabs and model search |
| `/products/category/:id` | One category: `ahd`, `ip`, `recorder` or `intercom` |
| `/products/:slug` | Product detail, e.g. `/products/ld-209hrv` |

Any other URL shows the 404 page. Standalone About, Solutions, Brands, News and Contact pages are not built yet; those menu items link to the matching section of the home page.

## Project structure

```
src/
├─ App.vue            Header, footer, router outlet, page loader
├─ main.js            Entry point
├─ router.js          Routes
├─ motion.js          Smooth scrolling and per-page scroll/entrance animations
├─ loader.js          Page loader progress and reveal transition
├─ data.js            Company info, navigation, services, solutions, brands, clients
├─ data/
│  ├─ products.json   45 products exported from the old site's database
│  └─ catalog.js      Product categories and lookup helpers
├─ pages/             Home, product list, product detail, 404
├─ components/        Page sections and shared components
└─ styles/base.css    Design tokens (colour, type, spacing) and base styles
public/
├─ img/               Logo, distributor brands, clients, product photos
└─ docs/              Product catalogue PDFs
```

## Editing content

Most text and data live in two files, so you rarely need to touch the components:

- **Company info, navigation, services, solutions, distributor brands, clients**: `src/data.js`
- **Products**: `src/data/products.json`. Each product has these fields:

  | Field | Meaning |
  |---|---|
  | `model` | Model number |
  | `slug` | URL segment |
  | `category` | One of `ahd`, `ip`, `recorder`, `intercom` |
  | `group` | Series within the category |
  | `summary` | One-line description |
  | `features` | Feature list |
  | `specs` | Spec table; each row is an array whose first cell is the label |
  | `img` | Product photo path |
  | `pdf` | Catalogue PDF path |

  Put product photos in `public/img/products/` and catalogues in `public/docs/`, named after the lowercase model number (e.g. `ld-209hrv.jpg`, `ld-209hrv.pdf`).

- **Colours and fonts**: the CSS variables at the top of `src/styles/base.css`. The brand red is `#c30d23`. See [DESIGN.md](DESIGN.md) for the full design system and [PRODUCT.md](PRODUCT.md) for the product and brand record.

## Replace before launch

- **Solution venue photos**: currently placeholder images hot-linked from Unsplash. Replace them with real photos: put the files in `public/img/` and update each venue's `img` in `src/data.js`.
- **Facebook link**: `company.facebook` in `src/data.js` points to the Facebook home page. Replace it with LIHDAY's page URL.
- **Missing product files**: these were not in the old site's backup, so the affected products show no download button or a "圖片準備中" (image coming soon) placeholder:
  - Catalogue PDFs for 22 products
  - Photos of the LD-ADR8108HE, LD-ADR8216HE and LD-ADR8416HE recorders

## Motion

- When the system "reduce motion" setting is on, smooth scrolling, entrance animations and the page loader are all disabled.
- Add `?static` to any URL (e.g. `/products?static`) to see the page with every animation already settled, useful for screenshots and layout checks.

## Deployment

This is a single-page app using history-mode routing. On any static host, rewrite unknown paths to `index.html`; otherwise opening a URL like `/products/ld-209hrv` directly returns a 404.

- **Netlify**: add a `_redirects` file to `public/` containing `/*  /index.html  200`
- **Vercel**: add a `vercel.json` at the project root with a `rewrites` rule sending every path to `/index.html`
- **Apache**: set `FallbackResource /index.html` in `.htaccess`
- **Nginx**: add `try_files $uri $uri/ /index.html;` inside `location /`

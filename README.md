# NexForge Frontend

A clean, minimalist technology marketplace for PC components, peripherals, and developer / AI hardware. Built with React, Vite, React Router, Lucide icons, Context API, and localStorage. Styled with plain CSS (no framework) for a professional, responsive look.

Final-year B.Tech Artificial Intelligence and Data Science portfolio project.

## Tech stack

- React 18 + Vite 5 + JSX
- React Router DOM (routes below)
- Lucide React icons
- Context API + localStorage (cart, wishlist, theme, profile)
- Local product data (no backend)
- Light / dark theme via CSS variables (`ThemeContext`, persisted, respects OS preference)
- Local demo account page (`/account`): profile, orders placeholder, preferences

## Routes

| Route | Page |
|---|---|
| `/` | Home (hero, collections, featured + category sections, why NexForge) |
| `/products` | All products with search, filters, sorting |
| `/products/:id` | Product details with specs + related products |
| `/category/:category` | Reusable page for `pc-components`, `peripherals`, `ai-hardware` |
| `/cart` | Cart with quantity controls, persisted in localStorage |
| `/wishlist` | Wishlist with move-to-cart, persisted in localStorage |
| `/account` | Local profile, order history placeholder, theme + data controls |

## Project structure

See `src/` for `components/`, `data/`, `context/`, `pages/`, `utils/` as specified in the project prompt.

Product data in `src/data/` preserves the original fields (`_id.$oid`, `name`, `brand`, `category`, `subcategory`, `description`, `price`, `stock`, `images`, `specifications`, `rating`, `reviewCount`, `isFeatured`, `isActive`). The `images` arrays are empty upstream, so `src/data/imageMap.js` + `src/utils/getProductImage.js` provide local images with category fallback and a safe placeholder.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```
<<<<<<< HEAD
=======

## Deploy to Vercel

Option A — dashboard (recommended):
1. Push this `frontend/` folder to a GitHub repo (it has a `.gitignore` for `node_modules/` and `dist/`).
2. In Vercel, import the repo and set **Root Directory** to `frontend/` (framework preset: Vite).
3. Build command: `npm run build`, output directory: `dist`. No environment variables required.

Option B — CLI:
```bash
cd frontend
npx vercel
```

Client-side routing (`/products/:id`, `/category/*`, `/cart`, …) works on refresh and
direct links via the SPA fallback in `vercel.json`.
>>>>>>> ffff5a7 (Update project files)

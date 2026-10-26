<div align="center">

# 🥬 FreshCart

**A modern, responsive grocery storefront built with React, TypeScript and Vite.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-educational-lightgrey)

*Fresh finds. Better living.*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Architecture Notes](#architecture-notes)
- [Data Source](#data-source)
- [Limitations](#limitations)
- [Roadmap](#roadmap)

---

## Overview

FreshCart is a single-page e-commerce frontend for an online grocery store. It lets users browse a food-only catalog, search and filter products, view product details, and manage a shopping cart and a favorites list. The interface is fully responsive and supports light and dark themes.

The project is a frontend demo: product data is loaded from the public [DummyJSON](https://dummyjson.com/docs/products) API, and no backend or payment processing is involved.

## Features

**Catalog**
- Food-only catalog sourced from the DummyJSON `groceries` category; pet food and all non-food items are filtered out.
- Six food sections generated from the product list: *Dairy & Eggs*, *Meat & Fish*, *Fruits & Berries*, *Vegetables*, *Drinks* and *Pantry*.
- Product detail pages with a list of related products.

**Search & navigation**
- Full-text search across title, description, section and brand.
- Filtering by section and by "on sale" (discount of 10% or more).
- Sorting: recommended, price (ascending / descending), name (A–Z), top rated.
- Pagination, 12 products per page.

**Shopping**
- Shopping cart with quantity controls, persisted in `localStorage`.
- Favorites list, persisted in `localStorage`.
- Demo checkout flow (no payment is collected).

**UX**
- Light / dark theme with saved preference and system-theme detection.
- Skeleton loading states and retryable error states.
- Smooth animations powered by Framer Motion.
- Responsive layout for mobile, tablet and desktop.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI library | [React 18](https://react.dev/) |
| Language | [TypeScript 5.6](https://www.typescriptlang.org/) (strict mode) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + custom CSS (`src/index.css`) |
| Routing | [React Router 6](https://reactrouter.com/) |
| HTTP client | [Axios](https://axios-http.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Data | [DummyJSON Products API](https://dummyjson.com/docs/products) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)
- Internet connection (required for API data and remote product images)

### Installation

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd FreshCart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local URL printed by Vite (by default `http://localhost:5173`).

### Production build

```bash
npm run build     # type-check and build into dist/
npm run preview   # serve the production build locally
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Runs the TypeScript compiler (`tsc -b`) and creates an optimized build in `dist/` |
| `npm run preview` | Serves the production build locally for verification |

## Project Structure

```text
FreshCart/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Providers and route definitions
    ├── index.css                # Global styles and theme tokens
    ├── api/
    │   └── productsApi.ts       # API client, filtering, sections, caching
    ├── components/
    │   ├── layout/              # Header, Footer, MainLayout
    │   └── products/            # ProductCard, ProductSkeleton, Pagination
    ├── context/
    │   ├── CartContext.tsx      # Cart state + localStorage persistence
    │   ├── FavoritesContext.tsx # Favorites state + localStorage persistence
    │   └── ThemeContext.tsx     # Light/dark theme
    ├── pages/                   # Route-level pages
    └── types/
        └── product.ts           # Shared TypeScript types
```

## Application Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | Home | Hero, categories, featured products, promo blocks |
| `/shop` | Shop | Search, filters, sorting and pagination |
| `/categories` | Categories | All food sections |
| `/category/:slug` | Category | Products of a single section |
| `/product/:id` | Product details | Product info and related products |
| `/cart` | Cart | Cart items, quantities and order summary |
| `/favorites` | Favorites | Saved products |
| `/about` | About | About the store |
| `*` | Not found | 404 page |

## Architecture Notes

- **State management.** Global state (cart, favorites, theme) lives in React Context providers composed in `App.tsx`. No external state library is used.
- **Persistence.** Cart, favorites and theme are stored in `localStorage` under the keys `freshcart-cart`, `freshcart-favorites` and `freshcart-theme`. Stored cart items are re-validated on load, so non-food items can never appear in the cart.
- **API layer.** `productsApi.ts` loads the whole `groceries` category once and caches the request promise (the cache is reset on failure to allow retries). Search, filtering, sorting and pagination are then performed on the client, which keeps navigation instant.
- **Section mapping.** DummyJSON has no food subcategories, so sections are derived from product titles with ordered regular expressions; unmatched items fall into *Pantry*.

## Data Source

All product data comes from [DummyJSON](https://dummyjson.com/). Prices, ratings and discounts are sample values and do not reflect real grocery prices. Product images are loaded from remote URLs.

## Limitations

- The checkout is a frontend demo: no orders are created and no payments are processed.
- No user accounts or authentication.
- Cart and favorites are stored per browser and are not synced between devices.
- The app requires an internet connection.

## Roadmap

- [ ] User authentication and order history
- [ ] Real backend and payment integration
- [ ] Automated tests (unit and end-to-end)
- [ ] Localization (e.g. Ukrainian)
- [ ] Deployment (Vercel / Netlify / GitHub Pages) with a live demo link

---

<div align="center">

Made with 💚 and fresh ingredients.

</div>

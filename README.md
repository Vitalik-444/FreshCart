# FreshCart 🥬

A modern grocery storefront built with React, TypeScript, Vite, Tailwind CSS, React Router, Axios, Lucide React, Framer Motion, and the DummyJSON Products API.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Features

- Food-only catalog: data comes from the `groceries` category of [DummyJSON](https://dummyjson.com/docs/products); pet food and every non-food category are excluded
- Food sections (Dairy & Eggs, Meat & Fish, Fruits & Berries, Vegetables, Drinks, Pantry) built from the product list
- Search, section filtering, sorting, sale-only filtering, and pagination (12 products per page)
- Product detail pages with related products
- Persistent shopping cart and favorites via localStorage
- Light and dark themes with saved preference and system-theme detection
- Responsive navigation, skeleton loading states, and retryable API error states
- Demo checkout only; no payment is collected

## Notes

An internet connection is required to load API data and remote product images. The checkout is a frontend demo and does not process payments. All pricing is the API's sample catalog pricing, not a live grocery price quote.

# The Duel Homepage

Premium responsive homepage for `www.theduel.in`, built with Next.js, Tailwind CSS, TypeScript, and Framer Motion.

## Structure

```text
src/
|-- app/
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- motion/
|   |-- sections/
|   `-- ui/
`-- lib/
    |-- data.ts
    `-- utils.ts
```

## Catalog

The product category system lives in `src/app/products`, `src/components/catalog`, and `src/lib/catalog.ts`.

See `docs/catalog-architecture.md` for route structure, reusable components, and data shape.

## Jersey Customizer

The customizer system lives in `src/app/customizer`, `src/components/customizer`, and `src/lib/customizer`.

See `docs/jersey-customizer-architecture.md` for state, layer, React Konva, and ERP export architecture.

## Customer Dashboard

The customer dashboard lives in `src/app/dashboard`, `src/components/dashboard`, and `src/lib/dashboard`.

See `docs/customer-dashboard-architecture.md` for routes, modules, and API integration architecture.

## ERP Production Tracking

The factory production tracking dashboard lives in `src/app/erp/production`, `src/components/erp/production`, and `src/lib/erp`.

See `docs/production-tracking-dashboard.md` for UI structure and Laravel API integration points.

## Production Deployment

Docker, NGINX, SSL, CI/CD, backup scripts, and hosting architecture live in `docker/`, `scripts/`, `.github/workflows/`, and `docs/production-deployment-architecture.md`.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

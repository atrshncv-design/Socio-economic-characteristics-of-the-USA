# Socio-economic Characteristics of the USA

`Socio-economic Characteristics of the USA` is an interactive analytical dashboard built with Next.js for presenting key socio-economic patterns of the United States in a visual and compact format. The app combines charts, comparison tables, and short analytical conclusions in a single interface aimed at coursework, presentations, and exploratory study.

## What the application includes

- A resource tab with comparative data on coal, oil, gas, iron ore, copper, zinc, lead, and lithium
- A Zipf-law tab for the largest US cities, including rank-size comparison and multi-year population dynamics
- A Lorenz-curve tab for population concentration by macroregion and area share
- A summary tab with condensed conclusions and development factors
- A mobile-friendly tabbed interface built with reusable UI components and Recharts visualizations

## Analytical scope

The dashboard focuses on three core dimensions of the US socio-economic profile:

- `Resource availability`: reserves, annual extraction, world ranking, and estimated years of sufficiency
- `Urban system structure`: comparison of actual city-size hierarchy with the ideal Zipf distribution
- `Population concentration`: imbalance between area and population across major US macroregions

The current version is a presentation-oriented dashboard: the data is embedded directly in the frontend for fast loading and predictable rendering.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Recharts
- Prisma + SQLite scaffold included for future backend expansion

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Run the app:

```bash
npm run dev
```

The project will be available at `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:push
npm run db:generate
npm run db:migrate
npm run db:reset
```

## Project structure

- `src/app/page.tsx` - the full dashboard interface and embedded analytical datasets
- `src/app/layout.tsx` - app metadata and shell
- `src/components/ui/` - reusable UI primitives
- `public/` - static assets
- `prisma/schema.prisma` - backend schema scaffold
- `.zscripts/` - helper scripts for local install, build, and start flows

## Current implementation notes

- The dashboard itself is already functional as a client-rendered analytical app
- `src/app/api/route.ts` and Prisma are present as scaffolding, but the main dashboard does not depend on a live backend yet
- The repository is structured so it can evolve from a static analytical presentation into a richer data application later

## Use case

This project is well suited for:

- geography and economics coursework,
- interactive presentation of statistical findings,
- rapid prototyping of country profile dashboards,
- adaptation to other countries or regions using the same visualization structure.

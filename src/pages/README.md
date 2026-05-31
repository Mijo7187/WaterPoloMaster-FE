# Pages

Page-level components — one per route.

## What belongs here

Each page corresponds to a route defined in `src/router/`. A page composes reusable components from `src/components/` and connects to module stores/services from `src/modules/`.

## Structure

```
pages/
├── Home/
│   ├── Home.tsx
│   ├── Home.module.scss
│   └── index.ts
├── Users/
│   ├── Users.tsx
│   ├── Users.module.scss
│   ├── components/           # Page-specific components (not reusable elsewhere)
│   │   └── UserCard.tsx
│   └── index.ts
└── ...
```

## Guidelines

- **One page per route** — Each top-level folder here maps to a route.
- **Page-specific components** — Components used only within a single page live in a `components/` sub-folder inside that page. If they start being used on other pages, move them to `src/components/`.
- **Data flow** — Pages call module `.service` or `.store` for data. They never call `.repo` directly.
- **Naming** — PascalCase folder and file names matching the page/route name.
- **Barrel exports** — Use `index.ts` for clean imports.

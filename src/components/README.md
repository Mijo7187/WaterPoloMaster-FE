# Components

Reusable UI components shared across multiple pages.

## When to add a component here

A component belongs in this folder **only if** it is used on **more than one page**. If a component is specific to a single page, keep it inside that page's folder in `src/pages/`.

## Structure

Each component gets its own folder:

```
components/
├── Input/
│   ├── Input.tsx
│   ├── Input.module.scss   (optional)
│   ├── Input.types.ts      (optional — if props are complex)
│   └── index.ts            (barrel export)
├── Select/
│   ├── Select.tsx
│   ├── Select.module.scss
│   └── index.ts
├── Table/
│   ├── Table.tsx
│   ├── Table.module.scss
│   └── index.ts
└── ...
```

## Guidelines

- **Naming** — PascalCase folder and file names matching the component name.
- **Barrel exports** — Every component folder should have an `index.ts` that re-exports the component for clean imports:
  ```tsx
  // components/Input/index.ts
  export { Input } from "./Input";
  ```
- **Props** — Define prop types in the same file or in a separate `.types.ts` if they are large.
- **Styling** — Use SCSS Modules (`.module.scss`) scoped to the component.
- **No business logic** — Components here are presentational. Data fetching and state management belong in `src/modules/`.
- **Composability** — Keep components small and composable. Prefer props over internal state.

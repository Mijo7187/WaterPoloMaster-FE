# Conventions

## TypeScript

- Strict mode is ON — no `any`, use `unknown` + type guard if shape is unclear
- All props interfaces defined in the same file as the component, above it
- Prefer `interface` for object shapes, `type` for unions/intersections
- Export all types from `{name}.types.ts` — never define types inline in components or stores
- Use `enum` only for truly fixed sets; prefer `as const` objects otherwise

## Component Rules

- Functional components only — no class components
<!-- - One component per file; filename matches the exported component name (PascalCase) -->
- Named exports for all components; default export only for page-level components
<!-- - Keep components under ~250 lines — extract sub-components if longer -->
- No business logic inside JSX — extract to a variable, hook, or service
- No direct API calls inside components — always go through a service or store

## File Naming

| What       | Convention                        | Example             |
| ---------- | --------------------------------- | ------------------- |
| Components | PascalCase                        | `UserCard.tsx`      |
| Hooks      | camelCase, `use` prefix           | `useUserList.ts`    |
| Stores     | camelCase, `.store.ts` suffix     | `user.store.ts`     |
| Services   | camelCase, `.service.ts` suffix   | `user.service.ts`   |
| Repos      | camelCase, `.repo.ts` suffix      | `user.repo.ts`      |
| Types      | camelCase, `.types.ts` suffix     | `user.types.ts`     |
| Constants  | camelCase, `.constants.ts` suffix | `user.constants.ts` |

## Imports Order

1. React and React ecosystem
2. Third-party libraries (antd, mobx, axios, etc.)
3. Internal absolute imports (`src/...`)
4. Relative imports (`./`, `../`)
5. Types (import type)

## Styling

- Use Ant Design components as the base — avoid reimplementing what antd provides
- Global styles in `src/styles/`
- Component-level styles: CSS modules or inline style objects, never global class names
<!-- - Do not override antd styles with `!important` — use the antd theme token system -->

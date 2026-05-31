# Utils

Pure helper / utility functions used across the application.

## What belongs here

- **Formatters** — Date formatting, number formatting, string manipulation.
- **Validators** — Input validation helpers, regex patterns.
- **Helpers** — General-purpose functions: debounce, throttle, deep clone, array utilities.
- **Type guards** — TypeScript type-narrowing functions.

## Structure

```
utils/
├── date.utils.ts         # Date formatting & manipulation
├── string.utils.ts       # String helpers (capitalize, truncate, slug, etc.)
├── validation.utils.ts   # Validation functions
├── storage.utils.ts      # LocalStorage / SessionStorage wrappers
└── ...
```

## Guidelines

- **Pure functions** — Utils must be pure (no side effects, no API calls, no state mutations). Given the same input they always return the same output.
- **No React** — No hooks, no components, no JSX. If it needs React, it's a component or a hook, not a util.
- **Naming** — Use `<domain>.utils.ts` naming pattern. Export named functions, not default exports.
- **Testable** — Every util should be easy to unit test. Keep functions small and focused.
- **No duplication** — Before adding a new util, check if a similar one already exists.

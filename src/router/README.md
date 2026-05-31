# Router

React Router configuration and route definitions.

## What belongs here

- **Route definitions** — All application routes declared in one place.
- **Route guards / wrappers** — Auth-protected route wrappers, role-based access components.
- **Router instance** — The `createBrowserRouter` (or equivalent) setup.
- **Route constants** — Path strings exported as constants to avoid magic strings.

## Structure

```
router/
├── router.tsx          # Router instance & route tree
├── routes.ts           # Route path constants
├── ProtectedRoute.tsx  # Auth guard wrapper (if needed)
└── ...
```

## Guidelines

- **Single source of truth** — All routes are defined here. Pages never define their own routing.
- **Path constants** — Export route paths as constants and use them in both the router config and navigation:
  ```ts
  export const ROUTES = {
    HOME: "/",
    USERS: "/users",
    USER_DETAIL: "/users/:id",
  } as const;
  ```
- **Lazy loading** — Use `React.lazy()` for page components to enable code splitting.
- **No business logic** — Route guards only check auth/role state. Actual logic lives in `src/modules/`.

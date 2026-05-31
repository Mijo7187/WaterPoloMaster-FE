# Router (`src/router/`)

## Structure
```
src/router/
├── router.types.ts       # RoutePathsEnum + IRouteConfig, IRoutesType, IMenuType interfaces
├── router.constants.tsx  # Lazy page imports, route configs, role-based route maps
├── router.service.ts     # RouterService class — getRouterConfig, getMenuConfig
└── RoutesList.tsx        # Observer component — renders <Routes> based on auth roles
```

## router.types.ts
Route paths defined as `RoutePathsEnum`. All route-related interfaces live here.

```ts
export enum RoutePathsEnum {
  HOME_PAGE = "home",
  LOGIN = "login",
  USERS_LIST = "users",
}

export interface IRoutesType {
  key: RoutePathsEnum;
  path: string;
  element: ReactNode;
}

export interface IMenuType {
  icon?: ReactNode;
  label?: string;
  children?: IRouteConfig[];
  hideInMenu?: boolean;
  subPath?: RoutePathsEnum[];
  path: string;
  key: RoutePathsEnum;
}

export type IRouteConfig = IRoutesType & IMenuType;
```

## router.constants.tsx
Lazy-loaded page components + `IRouteConfig` objects + role-based route maps.
Page components use named exports — use `.then(m => ({ default: m.ComponentName }))`.

```tsx
import { lazy, Suspense } from "react";

const HomePage = lazy(() =>
  import("@pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);

const ROUTE_HOME: IRouteConfig = {
  key: RoutePathsEnum.HOME_PAGE,
  label: "Početna",
  path: RoutePathsEnum.HOME_PAGE,
  element: (
    <Suspense>
      <HomePage />
    </Suspense>
  ),
};

export const ALL_ROUTE_CONFIG: Record<...> = { ... };
export const ROUTES_BY_ROLE: Record<UserRolesEnum, AuthenticatedRoutePathsEnum[]> = { ... };
export const REDIRECT_ROUTES_MAP: Record<UserRolesEnum, `/${RoutePathsEnum}`> = { ... };
```

## router.service.ts
`RouterService` class with two methods — `getRouterConfig` and `getMenuConfig`.
Reads from `ALL_ROUTE_CONFIG` and `ROUTES_BY_ROLE`. No state, no async.

## RoutesList.tsx
MobX `observer` component. Reads `authStore.getAuthUserRoles`, calls `routerService.getRouterConfig`.
Renders a `<Routes>` tree with `AppLayout` as the layout wrapper and role-based redirect.

## Rules (IMPORTANT)
- NEVER hardcode a path string like `'/users'` anywhere — always use `RoutePathsEnum`
- All page components must be lazy-loaded with `React.lazy()` in `router.constants.tsx`
- Named exports require `.then(m => ({ default: m.ComponentName }))` in the lazy import
- Each lazy component is wrapped in `<Suspense>` directly in the route config `element`
- Navigation uses `useNavigate()` from react-router-dom — never `window.location.href`
- Route guards / auth checks go in `RoutesList.tsx`, not inside page components
- `getMenuConfig` filters out routes with `hideInMenu: true` — use that flag for detail pages

import { lazy, Suspense } from "react";

import { UserRolesEnum } from "@modules/auth/auth.types";

import { IRouteConfig, RoutePathsEnum } from "./router.types";

const HomePage = lazy(() =>
  import("@pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);
const UsersListPage = lazy(() =>
  import("@pages/UsersListPage/UsersListPage").then((m) => ({
    default: m.UsersListPage,
  })),
);
const UserProfilePage = lazy(() =>
  import("@pages/UserProfilePage/UserProfilePage").then((m) => ({
    default: m.UserProfilePage,
  })),
);
const CompaniesListPage = lazy(() =>
  import("@pages/CompaniesListPage/CompaniesListPage").then((m) => ({
    default: m.CompaniesListPage,
  })),
);
const CompanyPage = lazy(() =>
  import("@pages/CompanyPage/CompanyPage").then((m) => ({
    default: m.CompanyPage,
  })),
);
const TrainingsPage = lazy(() =>
  import("@pages/TrainingsPage/TrainingsPage").then((m) => ({
    default: m.TrainingsPage,
  })),
);
const SifarniciPage = lazy(() =>
  import("@pages/SifarniciPage/SifarniciPage").then((m) => ({
    default: m.SifarniciPage,
  })),
);

// ------------------------------
// App Layout routes configuration
// ------------------------------

const ROUTE_HOME: IRouteConfig = {
  key: RoutePathsEnum.HOME_PAGE,
  label: "Početna",
  path: RoutePathsEnum.HOME_PAGE,
  // icon: <HomeIcon />,
  element: (
    <Suspense>
      <HomePage />
    </Suspense>
  ),
};
const ROUTE_USERS_LIST: IRouteConfig = {
  key: RoutePathsEnum.USERS_LIST,
  label: "Korisnici",
  path: RoutePathsEnum.USERS_LIST,
  // icon: <UsersIcon />,
  element: (
    <Suspense>
      <UsersListPage />
    </Suspense>
  ),
};
const ROUTE_USER_PROFILE: IRouteConfig = {
  key: RoutePathsEnum.USER_PROFILE,
  label: "Korisnik",
  path: `/${RoutePathsEnum.USER_PROFILE}/:id`,
  // icon: <UserIcon />,
  element: (
    <Suspense>
      <UserProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
};

const ROUTE_COMPANY_LIST_PAGE: IRouteConfig = {
  key: RoutePathsEnum.COMPANY_LIST,
  label: "Kompanije",
  path: RoutePathsEnum.COMPANY_LIST,
  // icon: <CompanyIcon />,
  element: (
    <Suspense>
      <CompaniesListPage />
    </Suspense>
  ),
};
const ROUTE_COMPANY: IRouteConfig = {
  key: RoutePathsEnum.COMPANY,
  label: "Klub",
  path: RoutePathsEnum.COMPANY,
  // icon: <CompanyIcon />,
  element: (
    <Suspense>
      <CompanyPage />
    </Suspense>
  ),
};

const ROUTE_CALENDAR: IRouteConfig = {
  key: RoutePathsEnum.CALENDAR,
  label: "Kalendar",
  path: RoutePathsEnum.CALENDAR,
  element: (
    <Suspense>
      <TrainingsPage />
    </Suspense>
  ),
};
const ROUTE_SIFARNICI: IRouteConfig = {
  key: RoutePathsEnum.SIFARNICI,
  label: "Šifarnici",
  path: RoutePathsEnum.SIFARNICI,
  element: (
    <Suspense>
      <SifarniciPage />
    </Suspense>
  ),
};

export const ALL_ROUTE_CONFIG: Record<
  Exclude<RoutePathsEnum, RoutePathsEnum.LOGIN>,
  IRouteConfig
> = {
  [RoutePathsEnum.HOME_PAGE]: ROUTE_HOME,
  [RoutePathsEnum.USERS_LIST]: ROUTE_USERS_LIST,
  [RoutePathsEnum.USER_PROFILE]: ROUTE_USER_PROFILE,
  [RoutePathsEnum.COMPANY]: ROUTE_COMPANY,
  [RoutePathsEnum.CALENDAR]: ROUTE_CALENDAR,
  [RoutePathsEnum.COMPANY_LIST]: ROUTE_COMPANY_LIST_PAGE,
  [RoutePathsEnum.SIFARNICI]: ROUTE_SIFARNICI,
};

export type AuthenticatedRoutePathsEnum = Exclude<
  RoutePathsEnum,
  RoutePathsEnum.LOGIN
>;

const ADMIN_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.USERS_LIST,
  RoutePathsEnum.USER_PROFILE,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.CALENDAR,
  RoutePathsEnum.COMPANY_LIST,
  RoutePathsEnum.SIFARNICI,
];

const SUPER_ADMIN_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.USERS_LIST,
  RoutePathsEnum.USER_PROFILE,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.CALENDAR,
  RoutePathsEnum.SIFARNICI,
];

const COACH_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.USERS_LIST,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.CALENDAR,
];

const PLAYER_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.CALENDAR,
];

export const ROUTES_BY_ROLE: Record<
  UserRolesEnum,
  AuthenticatedRoutePathsEnum[]
> = {
  [UserRolesEnum.ADMIN]: ADMIN_ROUTES,
  [UserRolesEnum.COACH]: COACH_ROUTES,
  [UserRolesEnum.SUPER_ADMIN]: SUPER_ADMIN_ROUTES,
  [UserRolesEnum.PLAYER]: PLAYER_ROUTES,
  [UserRolesEnum.USER]: ADMIN_ROUTES,
};

export const REDIRECT_ROUTES_MAP: Record<UserRolesEnum, `/${RoutePathsEnum}`> =
  {
    [UserRolesEnum.ADMIN]: `/${RoutePathsEnum.HOME_PAGE}`,
    [UserRolesEnum.COACH]: `/${RoutePathsEnum.HOME_PAGE}`,
    [UserRolesEnum.SUPER_ADMIN]: `/${RoutePathsEnum.HOME_PAGE}`,
    [UserRolesEnum.PLAYER]: `/${RoutePathsEnum.HOME_PAGE}`,
    [UserRolesEnum.USER]: `/${RoutePathsEnum.HOME_PAGE}`,
  };

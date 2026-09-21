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

const CompaniesProfilePage = lazy(() =>
  import("@pages/CompaniesProfilePage/CompaniesProfilePage").then((m) => ({
    default: m.CompaniesProfilePage,
  })),
);

const CompanyPage = lazy(() =>
  import("@pages/CompanyPage/CompanyPage").then((m) => ({
    default: m.CompanyPage,
  })),
);
const TrainingsListPage = lazy(() =>
  import("@pages/TrainingsListPage/TrainingsListPage").then((m) => ({
    default: m.TrainingsListPage,
  })),
);
const TrainingProfilePage = lazy(() =>
  import("@pages/TrainingProfilePage/TrainingProfilePage").then((m) => ({
    default: m.TrainingProfilePage,
  })),
);
const SifarniciPage = lazy(() =>
  import("@pages/SifarniciPage/SifarniciPage").then((m) => ({
    default: m.SifarniciPage,
  })),
);
const PaymentsListPage = lazy(() =>
  import("@pages/PaymentsListPage/PaymentsListPage").then((m) => ({
    default: m.PaymentsListPage,
  })),
);
const ContractListPage = lazy(() =>
  import("@pages/ContractListPage/ContractListPage").then((m) => ({
    default: m.ContractListPage,
  })),
);
const ContractProfilePage = lazy(() =>
  import("@pages/ContractProfilePage/ContractProfilePage").then((m) => ({
    default: m.ContractProfilePage,
  })),
);
const SeasonListPage = lazy(() =>
  import("@pages/SeasonListPage/SeasonListPage").then((m) => ({
    default: m.SeasonListPage,
  })),
);
const SeasonProfilePage = lazy(() =>
  import("@pages/SeasonProfilePage/SeasonProfilePage").then((m) => ({
    default: m.SeasonProfilePage,
  })),
);
const TournamentListPage = lazy(() =>
  import("@pages/TournamentListPage/TournamentListPage").then((m) => ({
    default: m.TournamentListPage,
  })),
);
const TournamentProfilePage = lazy(() =>
  import("@pages/TournamentProfilePage/TournamentProfilePage").then((m) => ({
    default: m.TournamentProfilePage,
  })),
);
const MembershipListPage = lazy(() =>
  import("@pages/MembershipListPage/MembershipListPage").then((m) => ({
    default: m.MembershipListPage,
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
  path: `/${RoutePathsEnum.USER_PROFILE}/:userId`,
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
const ROUTE_COMPANY_PROFILE_PAGE: IRouteConfig = {
  key: RoutePathsEnum.COMPANY_PROFILE,
  path: `/${RoutePathsEnum.COMPANY_PROFILE}/:id`,
  // icon: <CompanyIcon />,
  element: (
    <Suspense>
      <CompaniesProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
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

const ROUTE_TRAINING: IRouteConfig = {
  key: RoutePathsEnum.TRAINING,
  label: "Trening",
  path: RoutePathsEnum.TRAINING,
  element: (
    <Suspense>
      <TrainingsListPage />
    </Suspense>
  ),
};
const ROUTE_TRAINING_PROFILE: IRouteConfig = {
  key: RoutePathsEnum.TRAINING_PROFILE,
  path: `/${RoutePathsEnum.TRAINING_PROFILE}/:trainingId`,
  element: (
    <Suspense>
      <TrainingProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
};
// const ROUTE_CALENDAR: IRouteConfig = {
//   key: RoutePathsEnum.CALENDAR,
//   label: "Kalendar",
//   path: RoutePathsEnum.CALENDAR,
//   element: (
//     <Suspense>
//       <TrainingsPage />
//     </Suspense>
//   ),
// };
const ROUTE_PAYMENTS: IRouteConfig = {
  key: RoutePathsEnum.PAYMENTS,
  label: "Plaćanja",
  path: RoutePathsEnum.PAYMENTS,
  element: (
    <Suspense>
      <PaymentsListPage />
    </Suspense>
  ),
};

const ROUTE_CONTRACT: IRouteConfig = {
  key: RoutePathsEnum.CONTRACT,
  label: "Ugovori",
  path: RoutePathsEnum.CONTRACT,
  element: (
    <Suspense>
      <ContractListPage />
    </Suspense>
  ),
};
const ROUTE_CONTRACT_PROFILE: IRouteConfig = {
  key: RoutePathsEnum.CONTRACT_PROFILE,
  path: `/${RoutePathsEnum.CONTRACT_PROFILE}/:contractId`,
  element: (
    <Suspense>
      <ContractProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
};

const ROUTE_SEASON: IRouteConfig = {
  key: RoutePathsEnum.SEASON,
  label: "Sezone",
  path: RoutePathsEnum.SEASON,
  element: (
    <Suspense>
      <SeasonListPage />
    </Suspense>
  ),
};
const ROUTE_SEASON_PROFILE: IRouteConfig = {
  key: RoutePathsEnum.SEASON_PROFILE,
  path: `/${RoutePathsEnum.SEASON_PROFILE}/:seasonId`,
  element: (
    <Suspense>
      <SeasonProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
};

const ROUTE_TOURNAMENT: IRouteConfig = {
  key: RoutePathsEnum.TOURNAMENT,
  label: "Turniri",
  path: RoutePathsEnum.TOURNAMENT,
  element: (
    <Suspense>
      <TournamentListPage />
    </Suspense>
  ),
};
const ROUTE_TOURNAMENT_PROFILE: IRouteConfig = {
  key: RoutePathsEnum.TOURNAMENT_PROFILE,
  path: `/${RoutePathsEnum.TOURNAMENT_PROFILE}/:tournamentId`,
  element: (
    <Suspense>
      <TournamentProfilePage />
    </Suspense>
  ),
  hideInMenu: true,
};

const ROUTE_MEMBERSHIP: IRouteConfig = {
  key: RoutePathsEnum.MEMBERSHIP,
  label: "Članarine",
  path: RoutePathsEnum.MEMBERSHIP,
  element: (
    <Suspense>
      <MembershipListPage />
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
  // [RoutePathsEnum.CALENDAR]: ROUTE_CALENDAR,
  [RoutePathsEnum.COMPANY_LIST]: ROUTE_COMPANY_LIST_PAGE,
  [RoutePathsEnum.COMPANY_PROFILE]: ROUTE_COMPANY_PROFILE_PAGE,
  [RoutePathsEnum.SIFARNICI]: ROUTE_SIFARNICI,
  [RoutePathsEnum.TRAINING]: ROUTE_TRAINING,
  [RoutePathsEnum.TRAINING_PROFILE]: ROUTE_TRAINING_PROFILE,
  [RoutePathsEnum.PAYMENTS]: ROUTE_PAYMENTS,
  [RoutePathsEnum.CONTRACT]: ROUTE_CONTRACT,
  [RoutePathsEnum.CONTRACT_PROFILE]: ROUTE_CONTRACT_PROFILE,
  [RoutePathsEnum.SEASON]: ROUTE_SEASON,
  [RoutePathsEnum.SEASON_PROFILE]: ROUTE_SEASON_PROFILE,
  [RoutePathsEnum.TOURNAMENT]: ROUTE_TOURNAMENT,
  [RoutePathsEnum.TOURNAMENT_PROFILE]: ROUTE_TOURNAMENT_PROFILE,
  [RoutePathsEnum.MEMBERSHIP]: ROUTE_MEMBERSHIP,
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
  RoutePathsEnum.TRAINING,
  RoutePathsEnum.TRAINING_PROFILE,
  RoutePathsEnum.PAYMENTS,
  RoutePathsEnum.COMPANY_LIST,
  RoutePathsEnum.COMPANY_PROFILE,
  RoutePathsEnum.SIFARNICI,
  RoutePathsEnum.CONTRACT,
  RoutePathsEnum.CONTRACT_PROFILE,
  RoutePathsEnum.SEASON,
  RoutePathsEnum.SEASON_PROFILE,
  RoutePathsEnum.TOURNAMENT,
  RoutePathsEnum.TOURNAMENT_PROFILE,
  RoutePathsEnum.MEMBERSHIP,
];

const SUPER_ADMIN_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.USERS_LIST,
  RoutePathsEnum.USER_PROFILE,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.TRAINING,
  RoutePathsEnum.TRAINING_PROFILE,
  RoutePathsEnum.PAYMENTS,
  RoutePathsEnum.COMPANY_LIST,
  RoutePathsEnum.COMPANY_PROFILE,
  RoutePathsEnum.SIFARNICI,
  RoutePathsEnum.CONTRACT,
  RoutePathsEnum.CONTRACT_PROFILE,
  RoutePathsEnum.SEASON,
  RoutePathsEnum.SEASON_PROFILE,
  RoutePathsEnum.TOURNAMENT,
  RoutePathsEnum.TOURNAMENT_PROFILE,
  RoutePathsEnum.MEMBERSHIP,
];

const COACH_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.USERS_LIST,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.TRAINING,
  RoutePathsEnum.TRAINING_PROFILE,
  RoutePathsEnum.PAYMENTS,
  RoutePathsEnum.CONTRACT,
  RoutePathsEnum.CONTRACT_PROFILE,
  RoutePathsEnum.SEASON,
  RoutePathsEnum.SEASON_PROFILE,
  RoutePathsEnum.TOURNAMENT,
  RoutePathsEnum.TOURNAMENT_PROFILE,
];

const PLAYER_ROUTES: AuthenticatedRoutePathsEnum[] = [
  RoutePathsEnum.HOME_PAGE,
  RoutePathsEnum.COMPANY,
  RoutePathsEnum.TRAINING,
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

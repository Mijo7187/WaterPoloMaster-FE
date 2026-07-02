import { ReactNode } from "react";

export enum RoutePathsEnum {
  HOME_PAGE = "home",
  LOGIN = "login",
  USERS_LIST = "user",
  USER_PROFILE = "user-profile",
  COMPANY_LIST = "companies",
  COMPANY_PROFILE = "companies-profile",
  COMPANY = "company",
  TRAINING = "training",
  TRAINING_PROFILE = "training-profile",
  PAYMENTS = "payments",
  // CALENDAR = "calendar",
  SIFARNICI = "sifarnici",
  QUARTER = "quarter",
  QUARTER_PROFILE = "quarter-profile",
  TOURNAMENT = "tournament",
  TOURNAMENT_PROFILE = "tournament-profile",
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

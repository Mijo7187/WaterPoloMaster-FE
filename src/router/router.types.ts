import { ReactNode } from "react";

export enum RoutePathsEnum {
  HOME_PAGE = "home",
  LOGIN = "login",
  USERS_LIST = "users",
  USER_PROFILE = "user-profile",
  COMPANY_LIST = "company-list",
  COMPANY = "company",
  // TRAININGS = "trainings",
  CALENDAR = "calendar",
  SIFARNICI = "sifarnici",
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
